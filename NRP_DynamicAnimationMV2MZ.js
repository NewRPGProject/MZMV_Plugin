//=============================================================================
// NRP_DynamicAnimationMV2MZ.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.023 It makes MV animations correspond to DynamicAnimationMZ.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @base NRP_DynamicAnimationMZ
 * @orderAfter NRP_DynamicAnimationMZ
 * @url http://newrpg.seesaa.net/article/477285411.html
 *
 * @help It makes MV animations correspond to DynamicAnimationMZ.
 * It is a simple 2D animation,
 * which has the advantage of being light in operation.
 * 
 * -------------------------------------------------------------------
 * [Introduction procedure for MV animations]
 * -------------------------------------------------------------------
 * With the update of MZ ver1.4.0,
 * you can now use MV Animation on the MZ Editor.
 *
 * - Copy the images under "img/animations"
 *   in the MV to the same folder in MZ.
 *   Naturally, if there are any sound effects you need,
 *   you will need to copy them.
 * - Right-click on the MZ animation editor
 *   and select "Create MV-compatible data".
 * - Create animations for MV in the MZ editor.
 *
 * This is all you need to do. After that,
 * just call DynamicAnimation in a very normal way to enable it.
 * 
 * In addition, if you want to transfer data already created in MV to MZ,
 * you can do so by directly copying
 * and pasting the contents of "data/Animation.json".
 * ※Make sure to back up Animation.json first, just in case.
 * 
 * -------------------------------------------------------------------
 * [Introduction procedure for MV animations (Old)]
 * -------------------------------------------------------------------
 * ※This step is no longer necessary,
 *   but I'm leaving it in for compatibility.
 *   The function itself is still valid.
 * 
 * Copy the animation data of the MV
 * as follows according to the official AnimationMv.js.
 * 
 * - Create the animation on MV.
 * - Copy the "data/Animation.json" of MV to the "data/mv" folder in MZ.
 *   Please make a new data/mv folder.
 * - Copy the images under "img/animations" in MV to the same folder in MZ.
 * 
 * [How to write skills in the note]
 * If you write the following, all of the animations
 * for the relevant skills will be MV animations.
 * <D-Setting:mv>
 * 
 * You can also set this for each individual animation.
 * <D-Animation:mv/>
 * Or.
 * <D-Animation>
 * mv = true
 * id = XXX
 * </D-Animation>
 * 
 * Write as above.
 * 
 * Unlike AnimationMv.js, it is possible to use the same ID together.
 * Also, just like AnimationMv.js,
 * even if you leave the Particle Effect, Sound Effect
 * and Flash of the animation empty, the MV animation will still play.
 * Choose your preferred method.
 * 
 * This plugin uses the source code of AnimationMv.js (by triacontane).
 * Therefore, you do not need to register AnimationMv.js to make it work.
 * 
 * For more information about DynamicAnimationMZ, please refer to the following
 * http://newrpg.seesaa.net/article/477190310.html
 * 
 * -------------------------------------------------------------------
 * [Terms]
 * -------------------------------------------------------------------
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.023 ＭＶ用アニメーションをDynamicAnimationMZに対応させます。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @base NRP_DynamicAnimationMZ
 * @orderAfter NRP_DynamicAnimationMZ
 * @url http://newrpg.seesaa.net/article/477285411.html
 *
 * @help 旧来のＭＶ用アニメーションをDynamicAnimationMZに対応させます。
 * 単純な２Ｄアニメーションであるため、動作が軽いなどの利点があります。
 * 
 * -------------------------------------------------------------------
 * ■ＭＶアニメーションの導入手順
 * -------------------------------------------------------------------
 * ＭＺ ver1.4.0の更新により、ＭＺエディタ上で
 * ＭＶアニメを使用できるようになりました。
 *
 * ・ＭＶのimg/animations以下の画像をＭＺの同フォルダにコピー。
 * 　当然ながら、必要な効果音があればコピーが必要です。
 * ・ＭＺのアニメーションエディタ上で右クリックし『MV互換データの作成』を選択。
 * ・ＭＺエディタ上でＭＶ用アニメーションを作成。
 *
 * これだけでＯＫです。
 * 後はごく普通にDynamicAnimationを呼び出せば有効になります。
 * 
 * また、ＭＶで既に作成したデータをＭＺへ移行したい場合は
 * data/Animation.jsonの中身を直接コピペすれば可能です。
 * ※念のため先にAnimation.jsonのバックアップを取るようにしてください。
 * 
 * -------------------------------------------------------------------
 * ■ＭＶアニメーションの導入手順（旧）
 * -------------------------------------------------------------------
 * ※こちらの手順は不要になりましたが、互換のため残しておきます。
 * 　機能自体は引き続き有効です。
 * 
 * 公式のAnimationMv.jsに従って、
 * 以下の通りＭＶのアニメーションデータをコピーします。
 * 
 * ・ＭＶ上でアニメーションを作成。
 * ・ＭＶのdata/Animation.jsonをＭＺのdata/mvフォルダへコピー。
 * 　※mvフォルダは新規作成してください。
 * ・ＭＶのimg/animations以下の画像をＭＺの同フォルダにコピー。
 * 
 * ■スキルのメモ欄への記述方法
 * 以下のように一度記述すれば、該当スキルの全アニメがＭＶ化します。
 * <D-Setting:mv>
 * 
 * 個別のアニメ毎にも設定できます。
 * <D-Animation:mv/>
 * あるいは、
 * <D-Animation>
 * mv = true
 * id = XXX
 * </D-Animation>
 * 
 * のように記述します。
 * 
 * AnimationMv.jsとは異なり同一ＩＤでの併用も可能です。
 * また、AnimationMv.jsと同じく、
 * アニメーションの『パーティクルエフェクト』『効果音』『フラッシュ』を
 * 空にしても、ＭＶアニメの再生が行われます。
 * お好みの方法を選んでください。
 * 
 * ※当プラグインはAnimationMv.js（トリアコンタン様）のソースを流用しています。
 * 　そのため、AnimationMv.jsを登録しなくとも動作するようになっています。
 * 
 * DynamicAnimationMZについての詳細は以下をご覧ください。
 * http://newrpg.seesaa.net/article/477190310.html
 * 
 * -------------------------------------------------------------------
 * ■利用規約
 * -------------------------------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 */

 /**
  * AnimationMv.jsから流用
  */
(() => {
'use strict';

/**
 * AnimationMvが登録されているか？
 */
var existAnimationMv = PluginManager._scripts.some(function(scriptName) {
    return scriptName == "AnimationMv";
});

/**
 * 登録されていなければ、代わりの処理を行う。
 */
if (!existAnimationMv) {
    const variableName = '$dataMvAnimations';
    const variableSrc = 'mv/Animations.json';

    DataManager._databaseFiles.push({ name: variableName, src: variableSrc });

    const _DataManager_loadDataFile = DataManager.loadDataFile;
    DataManager.loadDataFile = function(name, src) {
        // for Test
        if (name === variableName) {
            arguments[1] = variableSrc;
        }
        _DataManager_loadDataFile.apply(this, arguments);
    };
}
})();

 /**
  * ここから開始！
  */
 // 連携用に値を保持
var Nrp = Nrp || {};

(function() {
"use strict";

var parameters = PluginManager.parameters("NRP_DynamicAnimationMV2MZ");

/**
 * ●アニメーションが準備完了かどうか？
 */
var _Sprite_AnimationMV_isReady = Sprite_AnimationMV.prototype.isReady;
Sprite_AnimationMV.prototype.isReady = function() {
    // 既にロード済みのため無条件でtrue
    if (this.dynamicAnimation) {
        return true;
    }

    return _Sprite_AnimationMV_isReady.call(this);
};

/**
 * ●継続時間の設定
 */
var _Sprite_AnimationMV_setupDuration = Sprite_AnimationMV.prototype.setupDuration;
Sprite_AnimationMV.prototype.setupDuration = function() {
    if (!this._animation.frames) {
        return;
    }

    _Sprite_AnimationMV_setupDuration.call(this);

    // 全体の継続時間を保持しておく。
    this._allDuration = this._duration;
};

/**
 * ●アニメーションのスプライト作成
 */
var _Sprite_AnimationMV_createSprites = Sprite_AnimationMV.prototype.createSprites;
Sprite_AnimationMV.prototype.createSprites = function() {
    // 画面アニメーションでも初回（または主対象）は強制スプライト生成
    if (this.dynamicAnimation) {
        // trueとfalseで分岐。undefinedはスルー
        if (this.dynamicAnimation.dispAnimation == true) {
            this.createCellSprites();
            this.createScreenFlashSprite();
            this._duplicated = false;
            Sprite_AnimationMV._checker1[this._animation] = true;
            Sprite_AnimationMV._checker2[this._animation] = true;
            return;

        // 対象外なのでスプライトを作らない
        } else if (this.dynamicAnimation.dispAnimation == false) {
            // 複製フラグ（対象フラッシュだけを行う）
            this._duplicated = true;
            return;
        }
    }

    // 元処理実行
    _Sprite_AnimationMV_createSprites.call(this);
};

/**
 * ●アニメーションのセットアップ
 */
var _Sprite_AnimationMV_setup = Sprite_AnimationMV.prototype.setup;
Sprite_AnimationMV.prototype.setup = function(target, animation, mirror, delay) {
    _Sprite_AnimationMV_setup.call(this, target, animation, mirror, delay);

    if (this._animation && this.dynamicAnimation) {
        // レート指定があれば、それで上書き
        if (this.dynamicAnimation.rate) {
            this._rate = this.dynamicAnimation.rate;
            // アニメーションの継続時間を再計算
            this.setupDuration();
        }
    }
};

/**
 * ●アニメーション更新メイン（ＭＶ版）
 */
var _Sprite_AnimationMV_updateMain = Sprite_AnimationMV.prototype.updateMain;
Sprite_AnimationMV.prototype.updateMain = function() {
    if (this.dynamicAnimation) {
        // 処理開始時
        if (this._allDuration == this._duration) {
            // 実行前に計算
            this.dynamicAnimation.evaluate(this);
        }
    }

    // 元処理実行
    _Sprite_AnimationMV_updateMain.call(this);
};

/**
 * ●アニメーションの描画
 * ※1/60秒ごとに実行される。
 */
var _Sprite_AnimationMV_updatePosition = Sprite_AnimationMV.prototype.updatePosition;
Sprite_AnimationMV.prototype.updatePosition = function() {
    _Sprite_AnimationMV_updatePosition.call(this);

    // 当プラグイン用の更新処理を実行
    if (this.dynamicAnimation && this.dynamicAnimation.dispAnimation) {
        this.updateDynamicAnimation();
    }
};

/**
 * ●動的アニメーションの描画
 * ※1/60秒ごとに実行される。
 */
Sprite_AnimationMV.prototype.updateDynamicAnimation = function() {
    var da = this.dynamicAnimation;
    var a = da.referenceSubject;
    var b = da.referenceTarget;

    var dataA = da.dataA;
    var repeat = da.repeat;
    var no = da.no; // 現在のD-Animation番号
    var r = da.r; // 現在のリピート回数
    var t = this._allDuration - this._duration - 1; // 現在の経過時間
    var et = this._allDuration - 1 // 終了時間

    var position = da.position; // 位置
    var mirroring = da.mirroring; // ミラーリング

    // 標準ターゲット座標取得
    var screenX = da.screenX;
    var screenY = da.screenY;
    var defaultX = da.defaultX;
    var defaultY = da.defaultY;

    var targetNo = da.targetNo;

    // 始点
    var sx = da.sx;
    var sy = da.sy;
    // 終点
    var ex = da.ex;
    var ey = da.ey;
    var arcX = da.arcX;
    var arcY = da.arcY;
    // リアルタイム
    var addX = da.addX;
    var addY = da.addY;
    var dx = da.dx;
    var dy = da.dy;
    var rotation = da.rotation;
    var opacity = da.opacity;
    var arrival = da.arrival;
    var scale = da.scale;
    var scaleX = da.scaleX;
    var scaleY = da.scaleY;
    // リアルタイム円
    var radiusX = da.radiusX;
    var radiusY = da.radiusY;
    var radX = da.radX;
    var radY = da.radY;
    var initRadX = da.initRadX;
    var initRadY = da.initRadY;
    // マップ用項目
    const onScroll = da.onScroll;
    // 前回の位置が存在しない場合は開始地点
    if (this.beforeX == undefined) {
        this.beforeX = sx;
    }
    if (this.beforeY == undefined) {
        this.beforeY = sy;
    }

    // 到着フレーム数の指定がある場合
    if (arrival != undefined) {
        // レート分、倍にしておく。
        // tが0始まりのため、到着時間も-1調整
        arrival = arrival * this._rate - 1;
    // ない場足は終了時間を設定
    } else {
        arrival = et;
    }

    // Ｘ座標の計算式の指定がある場合
    if (dx != undefined) {
        this.x = eval(dx);

    // Ｘ座標の始点・終点が等しい場合
    } else if (sx == ex) {
        this.x = sx;

    // Ｘ座標の始点・終点指定がある場合
    } else if (sx != undefined && ex != undefined) {
        // 到着時間をかけて、終了地点まで移動する。
        this.x = sx + (ex - sx) * Math.min(t, arrival) / arrival;
    }

    // Ｙ座標の計算式の指定がある場合
    if (dy != undefined) {
        this.y = eval(dy);

    // Ｙ座標の始点・終点が等しい場合
    } else if (sy == ey) {
        this.y = sy;

    // Ｙ座標の始点・終点指定がある場合
    } else if (sy != undefined && ey != undefined) {
        // 到着時間をかけて、終点まで移動する。
        this.y = sy + (ey - sy) * Math.min(t, arrival) / arrival;
    }

    // 放物線補正があれば加算
    if (arcX) {
        this.x += (-arcX / Math.pow(arrival/2, 2)) * Math.pow(Math.min(t, arrival) - arrival/2, 2) + arcX;
    }
    if (arcY) {
        this.y += (-arcY / Math.pow(arrival/2, 2)) * Math.pow(Math.min(t, arrival) - arrival/2, 2) + arcY;
    }

    // 円運動
    if (radiusX) {
        if (!radX) {
            radX = 0;
        }
        this.x += eval(radiusX) * Math.cos(initRadX + eval(radX))
    }
    if (radiusY) {
        if (!radY) {
            radY = 0;
        }
        this.y += eval(radiusY) * Math.sin(initRadY + eval(radY))
    }

    // 座標補正があれば加算
    if (addX) {
        this.x += eval(addX);
    }
    if (addY) {
        this.y += eval(addY);
    }

    // 回転率
    if (rotation != undefined) {
        this.rotation = eval(rotation);
    }
    // 不透明度
    if (opacity != undefined) {
        opacity = eval(opacity);
        if (opacity != undefined) {
            this.opacity = opacity;
        }
    }

    // 残像の不透明度計算
    if (da.isAfterimage) {
        if (opacity == undefined) {
            opacity = 255;
        }
        this.opacity = opacity * da.opacityRate;
    }

    // サイズ変更
    if (scale != undefined || scaleX != undefined || scaleY != undefined) {
        let setScaleX = 1;
        let setScaleY = 1;
        // 全体
        if (scale != undefined) {
            setScaleX = eval(scale);
            setScaleY = eval(scale);
        }
        // Ｘ方向
        if (scaleX != undefined) {
            setScaleX = eval(scaleX);
        }
        // Ｙ方向
        if (scaleY != undefined) {
            setScaleY = eval(scaleY);
        }
        this.scale = new PIXI.Point(setScaleX, setScaleY);
    }

    // Ｚ座標
    if (da.z != undefined) {
        this.z = eval(da.z);
    }

    // スクリプト（リアルタイム）
    if (da.scriptRT) {
        eval(da.scriptRT);
    }

    // 前回の位置を保持
    this.beforeX = this.x;
    this.beforeY = this.y;

    // 初期位置からのスクロール差分を加算
    if (onScroll) {
        this.x += da.diffScreenX();
        this.y += da.diffScreenY();
    }
};

/**
 * ●アニメーションセルの更新
 */
var _Sprite_AnimationMV_updateCellSprite = Sprite_AnimationMV.prototype.updateCellSprite;
Sprite_AnimationMV.prototype.updateCellSprite = function(sprite, cell) {
    _Sprite_AnimationMV_updateCellSprite.call(this, sprite, cell);

    var pattern = cell[0];
    if (pattern >= 0 && this.dynamicAnimation) {
        var da = this.dynamicAnimation;
    
        var r = da.r; // 現在のリピート回数
        var t = this._allDuration - this._duration - 1; // 現在の経過時間
        var et = this._allDuration - 1 // 終了時間

        // 色調変更
        if (da.color != undefined) {
            // 色調変更すると合成方法がクリアされるので保持＆再設定
            const blendMode = sprite.blendMode;
            sprite.setBlendColor(eval(da.color));
            sprite.blendMode = blendMode;
        }
    }
};

/**
 * ●フラッシュや効果音などの制御
 */
var _Sprite_AnimationMV_processTimingData = Sprite_AnimationMV.prototype.processTimingData;
Sprite_AnimationMV.prototype.processTimingData = function(timing) {
    // 演出制限フラグが立っているなら処理終了
    if (this.dynamicAnimation && this.dynamicAnimation.isLimitEffect) {
        return;
    }

    // 効果音演奏時
    if (!this._duplicated && timing.se) {
        // 効果音制限フラグが立っているなら、演出処理の呼び出しをして処理終了
        // ※やや冗長だけど競合を極力抑えるため……。
        if (this.dynamicAnimation && this.dynamicAnimation.isLimitSound) {
            var duration = timing.flashDuration * this._rate;
            switch (timing.flashScope) {
            case 1:
                this.startFlash(timing.flashColor, duration);
                break;
            case 2:
                this.startScreenFlash(timing.flashColor, duration);
                break;
            case 3:
                this.startHiding(duration);
                break;
            }
            return;
        }
    }

    // 元処理実行
    _Sprite_AnimationMV_processTimingData.call(this, timing);
};

/**
 * ●対象のフラッシュ
 */
var _Sprite_AnimationMV_startFlash = Sprite_AnimationMV.prototype.startFlash;
Sprite_AnimationMV.prototype.startFlash = function(color, duration) {
    // フラッシュ制限フラグが立っているなら処理終了
    if (this.dynamicAnimation && this.dynamicAnimation.isLimitFlash) {
        return;
    }

    // 元処理実行
    _Sprite_AnimationMV_startFlash.call(this, color, duration);
};

/**
 * ●対象非表示
 */
var _Sprite_AnimationMV_startHiding = Sprite_AnimationMV.prototype.startHiding;
Sprite_AnimationMV.prototype.startHiding = function(duration) {
    // フラッシュ制限フラグが立っているなら処理終了
    if (this.dynamicAnimation && this.dynamicAnimation.isLimitFlash) {
        return;
    }

    // 元処理実行
    _Sprite_AnimationMV_startHiding.call(this, duration);
};

/**
 * アニメーションの削除
 */
Sprite_AnimationMV.prototype.remove = function() {
    if (this.dynamicAnimation && this.parent) {
        this.parent.removeChild(this)
    }
};

/**
 * ●アニメーションの終了＆削除
 */
const _Sprite_AnimationMV_onEnd = Sprite_AnimationMV.prototype.onEnd;
Sprite_AnimationMV.prototype.onEnd = function() {
    // 最終リピートの場合のみ戻し処理を実行
    if (this.dynamicAnimation && this.dynamicAnimation.isLastRepeat) {
        // アニメーションの削除時に色調＆表示状態を戻す
        this._flashDuration = 0;
        this._screenFlashDuration = 0;
        this._hidingDuration = 0;
        for (const target of this._targets) {
            target.setBlendColor([0, 0, 0, 0]);
            target.show();
        }
        return;
    }

    _Sprite_AnimationMV_onEnd.apply(this, arguments);
};

/**
 * ●画面のフラッシュ
 */
var _Sprite_AnimationMV_startScreenFlash = Sprite_AnimationMV.prototype.startScreenFlash;
Sprite_AnimationMV.prototype.startScreenFlash = function(color, duration) {
    // フラッシュ制限フラグが立っているなら処理終了
    if (this.dynamicAnimation && this.dynamicAnimation.isLimitFlash) {
        return;
    }

    // 元処理実行
    _Sprite_AnimationMV_startScreenFlash.call(this, color, duration);
};

/*******************************************************
 * 以下はMVから移植
 * MZではアニメーションを
 * Spriteset_BaseやSpriteset_Battleで主に制御しているが、
 * MVではSprite_Battlerで制御している。
 *******************************************************/

Sprite_Battler.prototype.updateAnimationSprites = function() {
    if (this._animationSprites && this._animationSprites.length > 0) {
        var sprites = this._animationSprites.clone();
        this._animationSprites = [];
        for (var i = 0; i < sprites.length; i++) {
            var sprite = sprites[i];
            if (sprite.isPlaying()) {
                this._animationSprites.push(sprite);
            } else {
                sprite.remove();
            }
        }
    }
};

const _Sprite_Battler_update = Sprite_Battler.prototype.update;
Sprite_Battler.prototype.update = function() {
    this.updateAnimationSprites();

    _Sprite_Battler_update.apply(this, arguments);
};

})();
