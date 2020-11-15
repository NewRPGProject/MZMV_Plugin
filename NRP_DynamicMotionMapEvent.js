//=============================================================================
// NRP_DynamicMotionMapEvent.js
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc v1.00 Motion the event with DynamicMotionMap.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/477913000.html
 *
 * @help Causes events to perform
 * side-view battle-like motions from a DynamicMotionMap.
 * Use the foot-stepping pattern of the character material for the motions.
 * 
 * The following plugins are required
 * ・NRP_DynamicMotionMap.js
 * ・DRQ_EventMotions.js
 * 
 * ※Please register this plugin below the above plugins.
 * 
 * ■Usage
 * Register motion information in the DRQ_EventMotions.js plugin parameters.
 * The name of the registered motion
 * is used to call it from the DynamicMotion side.
 * The method is almost the same as in side-view battle.
 * 
 * Example1:
 * <D-Motion/>
 * motion = skill
 * </D-Motion>
 * 
 * Example2:
 * <D-Motion:attack/>
 * 
 * ※The second method can only be used
 * if the motion is registered in the DynamicMotion template.
 * 
 * ■Note
 * If you specify a loop motion, it will remain the same afterwards.
 * To cancel, call "clear" as shown below.
 * <D-Motion:clear/>
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 DynamicMotionMapでイベントにモーションさせる。
 * @author 砂川赳 (http://newrpg.seesaa.net/)
 * @base NRP_DynamicMotionMap
 * @base DRQ_EventMotions
 * @orderAfter NRP_DynamicMotionMap
 * @orderAfter DRQ_EventMotions
 * @url http://newrpg.seesaa.net/article/477913000.html
 *
 * @help DynamicMotionMapからイベントに
 * サイドビュー戦闘のようなモーションを実行させます。
 * モーションにはキャラクター素材の足踏みパターンを使用します。
 * 
 * 動作には以下のプラグインが必要です。
 * ・NRP_DynamicMotionMap.js
 * ・DRQ_EventMotions.js
 * 
 * ※上記のプラグインよりも当プラグインを下に登録してください。
 * 
 * ■使い方
 * DRQ_EventMotions.jsのプラグインパラメータからモーション情報を登録します。
 * 登録したモーションの名前を使ってDynamicMotion側から呼び出します。
 * 方法はサイドビュー戦闘時とほぼ同じです。
 * 
 * 例１：
 * <D-Motion/>
 * motion = skill
 * </D-Motion>
 * 
 * 例２：
 * <D-Motion:attack/>
 * 
 * ※例２の方法は該当のモーションを
 * DynamicMotionのテンプレートに登録していなければ使えません。
 * 
 * ■注意点
 * ループモーションを指定すると、以降はずっとそのままの状態になります。
 * 解除する際は、以下のように『clear』を呼び出してください。
 * <D-Motion:clear/>
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 */

(function() {
"use strict";

function toBoolean(str) {
    if (str == true) {
        return true;
    }
    return (str == "true") ? true : false;
}

const parameters = PluginManager.parameters("NRP_DynamicMotionMapEvent");

/**
 * ●SVキャラクターモーションの実行
 * ※NRP_DynamicMotionの関数
 */
const _Sprite_Character_startDynamicSvMotion = Sprite_Character.prototype.startDynamicSvMotion;
Sprite_Character.prototype.startDynamicSvMotion = function(dynamicMotion) {
    // Game_CharacterBase側で処理する。
    this._character.startDynamicSvMotion(dynamicMotion);
};

/**
 * ●SVキャラクターモーションの実行
 */
Game_CharacterBase.prototype.startDynamicSvMotion = function(dynamicMotion) {
    const bm = dynamicMotion.baseMotion;
    const dm = dynamicMotion;

    // モーションが取得できなければ終了
    if (dm.motion == undefined) {
        return;
    // モーションのクリア
    } else if (dm.motion === "") {
        this.clearMotion();
        return;
    }

    // eval参照用
    const a = dm.referenceSubject;
    const subject = bm.getReferenceSubject();
    const b = dm.referenceTarget;
    const repeat = dm.repeat;
    const r = dm.r;

    // モーションリセット
    this._pattern = 0;

    // モーションパターン
    this._motionPattern = dm.motionPattern;
    // モーション開始パターン
    if (dm.motionStartPattern != undefined) {
        this._motionStartPattern = eval(dm.motionStartPattern);
    }

    // DRQ_EventMotionを呼び出し
    this.playMotion(dm.motion, dm.motionDuration);
};

/**
 * ●モーション実行
 * ※DRQ_EventMotionsの関数
 */
const _Game_CharacterBase_playCustomMotion = Game_CharacterBase.prototype.playCustomMotion;
Game_CharacterBase.prototype.playCustomMotion = function(motionData, wait) {
    _Game_CharacterBase_playCustomMotion.apply(this, arguments);

    if (this._motion) {
        // モーション開始パターンの変更
        if (this._motionStartPattern) {
            this._pattern = this._motionStartPattern;
            this._motionStartPattern = undefined;
        }
    }
};

/**
 * ●モーションパターンの更新
 */
const _Game_CharacterBase_updatePattern = Game_CharacterBase.prototype.updatePattern;
Game_CharacterBase.prototype.updatePattern = function() {
    const motion = this.motion();
    if (motion) {
        // モーションパターンの指定がある場合
        if (this._motionPattern != undefined) {
            // 指定式でパターン制御
            this._pattern = eval(this._motionPattern);
            // 値がマイナスになった場合はクリア
            if (this._pattern < 0) {
                this.clearMotion();
                this._motionPattern = undefined;
            }
            return;
        }
    }

    _Game_CharacterBase_updatePattern.apply(this, arguments);
};

})();
