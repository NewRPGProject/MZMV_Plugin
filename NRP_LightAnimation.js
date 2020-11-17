//=============================================================================
// NRP_LightAnimation.js
//=============================================================================
/*:
 * @plugindesc v2.01 Lightens animation processing.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 *
 * @help The animation processing is reduced
 * by suppressing the creation of unnecessary cells.
 * It also suppresses the number of updates to the target flash.
 * 
 * <Terms>
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but we will respond to defects as far as possible.
 * 
 * @param flashDivide
 * @type number
 * @min 1
 * @default 2
 * @desc Reduces the target flash updates by the specified number.
 * If it's 2, it's 1/2 times.
 */

/*:ja
 * @plugindesc v2.01 アニメーション処理を軽量化します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 *
 * @help 不要なセルの作成を抑制し、アニメーション処理を軽量化します。
 * また、対象のフラッシュの更新回数を抑制します。
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param flashDivide
 * @text フラッシュ更新軽減度
 * @type number
 * @min 1
 * @default 2
 * @desc 指定した数値分だけ対象のフラッシュの更新を減らします。
 * 2なら1/2回となります。
 */
(function() {
"use strict";

var parameters = PluginManager.parameters("NRP_LightAnimation");
var pFlashDivide = parameters["flashDivide"];

/**
 * 【関数上書】セルの作成
 */
Sprite_Animation.prototype.createCellSprites = function() {
    // 使用しているセル番号のＭＡＸを取得（０始まり）
    var maxCell = 0;
    // フレームごとのループ
    this._animation.frames.forEach(function(frame) {
        // セルごとのループ
        frame.forEach(function(cell, index) {
            // 取得済みの最大値よりセル番号が大きく、
            // かつ、パターンが０以上
            if (index > maxCell && cell[0] >= 0) {
                maxCell = index;
            }
        });
    });

    // 常に１６セルを確保していたのを修正し、必要なセルだけを生成する。
    this._cellSprites = [];
    for (var i = 0; i <= maxCell; i++) {
        var sprite = new Sprite();
        sprite.anchor.x = 0.5;
        sprite.anchor.y = 0.5;
        this._cellSprites.push(sprite);
        this.addChild(sprite);
    }
};

/*
 * ●フラッシュ更新軽減度が有効な場合のみ実施
 */
if (pFlashDivide && pFlashDivide >= 2) {
    /**
     * ●アニメーションの更新
     */
    var _Sprite_Battler_updateAnimation = Sprite_Battler.prototype.updateAnimation;
    Sprite_Battler.prototype.updateAnimation = function() {
        _Sprite_Battler_updateAnimation.call(this);

        // フラッシュ用に時間をカウントする。
        // ※対象を共通化するため_effectTargetを指定
        if (this.isAnimationPlaying()) {
            if (!this._effectTarget._flashDurationCount) {
                this._effectTarget._flashDurationCount = 0;
            }
            this._effectTarget._flashDurationCount++;
        } else {
            this._effectTarget._flashDurationCount = 0;
        }
    };

    /**
     * ●フラッシュ開始
     */
    var _Sprite_Animation_startFlash = Sprite_Animation.prototype.startFlash;
    Sprite_Animation.prototype.startFlash = function(color, duration) {
        // 元処理実行
        _Sprite_Animation_startFlash.call(this, color, duration);

        // フラッシュ更新カウント
        this._flashUpdCount = 0;
    };

    /**
     * 【関数上書】対象のフラッシュ更新
     */
    Sprite_Animation.prototype.updateFlash = function() {
        if (this._flashDuration > 0) {
            var d = this._flashDuration--;

            // var target = getTargetSprite(this);

            // 該当のタイミングの場合
            if (this._target._flashDurationCount % pFlashDivide == 1) {
                // 最終更新の場合はフラッシュクリア
                if (this._flashDuration < pFlashDivide && this._flashUpdCount > 0) {
                    this._flashColor[3] = 0;
                    this._target.setBlendColor(this._flashColor);
                // 通常更新
                } else {
                    this._flashColor[3] *= (d - 1) / d;
                    this._target.setBlendColor(this._flashColor);
                }
                // フラッシュ更新カウント+1
                this._flashUpdCount++;
            }
            // タイミング外でもフラッシュ終了時かつ一度しか更新していない場合は対象
            // ※２回以上更新されないフラッシュはここで制御しないと色が戻らないため
            if (this._flashDuration == 0 && this._flashUpdCount == 1) {
                // フラッシュクリア
                this._flashColor[3] = 0;
                this._target.setBlendColor(this._flashColor);
            }
        }
    };
}
})();
