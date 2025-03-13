//=============================================================================
// NRP_StateIcon.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.01 Adjust the display of state icons during battle.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/484023583.html
 *
 * @help Adjust the display of state icons during battle.
 * 
 * Currently, only the following minor fixes are available.
 * 
 * - Fixes a bug where the icon line would remain
 *   when an unstated enemy moved.
 * - Position adjustment when using DynamicMotion together.
 * - Set the upper Y coordinate of the enemy's icon.
 * 
 * You can turn it on/off for each item, so please adjust it.
 * 
 * ------------------------------------------
 * [Terms]
 * ------------------------------------------
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 * 
 * @param FixIconLine
 * @default true
 * @type boolean
 * @desc Fixes a bug where the icon line would remain when an unstated enemy moved.
 * 
 * @param ForDynamicMotion
 * @default false
 * @type boolean
 * @desc Position adjustment when using DynamicMotion together.
 * Adjusting the position of icons when expanding & jumping enemies, etc.
 * 
 * @param IconLimitY
 * @type number
 * @desc Y-coordinate for the upper limit of icon display. Default 20
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.01 戦闘時のステートアイコンの表示を調整する。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/484023583.html
 *
 * @help 戦闘時のステートアイコンの表示を調整します。
 * 
 * 現状は以下のちょっとした修正のみです。
 * 
 * ・ステートにかかっていない敵キャラが移動した際、
 * 　アイコンの線が残る不具合を修正します。
 * ・DynamicMotion併用時の位置調整
 * ・敵のアイコン上限Ｙ座標の設定。
 * 
 * 項目毎にオン／オフできるので調整してください。
 * 
 * ------------------------------------------
 * ■利用規約
 * ------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param FixIconLine
 * @text アイコンの線が残るバグ修正
 * @default true
 * @type boolean
 * @desc ステートにかかっていない敵キャラが移動した際、アイコンの線が残る不具合を修正します。
 * 
 * @param ForDynamicMotion
 * @text DynamicMotionに対応
 * @default false
 * @type boolean
 * @desc DynamicMotionとの併用時、アイコンの位置を調整します。
 * 敵キャラの拡大＆ジャンプ時に位置が狂う不具合対応など。
 * 
 * @param IconLimitY
 * @text アイコン上限Ｙ座標
 * @type number
 * @desc アイコンの表示上限となるＹ座標です。初期値20
 * 敵が上側に配置された際も画面内に収まるようにします。
 */
(function() {
"use strict";

function toNumber(str, def) {
    if (str == undefined || str == "") {
        return def;
    }
    return isNaN(str) ? def : +(str || def);
}
function toBoolean(str, def) {
    if (str === true || str === "true") {
        return true;
    } else if (str === false || str === "false") {
        return false;
    }
    return def;
}

const PLUGIN_NAME = "NRP_StateIcon";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pFixIconLine = toBoolean(parameters["FixIconLine"], true);
const pForDynamicMotion = toBoolean(parameters["ForDynamicMotion"], false);
const pIconLimitY = toNumber(parameters["IconLimitY"]);

// アイコンの線が残るバグ修正
if (pFixIconLine) {
    /**
     * ●アイコン描画更新
     */
    const _Sprite_StateIcon_updateFrame = Sprite_StateIcon.prototype.updateFrame;
    Sprite_StateIcon.prototype.updateFrame = function() {
        // アイコン指定がない場合は非表示
        if (!this._iconIndex) {
            this.setFrame(0, 0, 0, 0);
            return;
        }
        
        _Sprite_StateIcon_updateFrame.apply(this, arguments);
    };
}


/**
 * ●ステートアイコンの位置更新
 */
const _Sprite_Enemy_updateStateSprite = Sprite_Enemy.prototype.updateStateSprite;
Sprite_Enemy.prototype.updateStateSprite = function() {
    // DynamicMotionに対応
    if (pForDynamicMotion) {
        this._stateIconSprite.y = -Math.round((this.bitmap.height + 40) * 0.9);

        // DynamicMotion実行中は補正処理を行わない。
        if (this.isMotionPlaying && this.isMotionPlaying()) {
            return;
        }
    }

    // アイコン上限Ｙ座標
    if (pIconLimitY != null) {
        this._stateIconSprite.y = -Math.round((this.bitmap.height + 40) * 0.9);
        if (this._stateIconSprite.y < pIconLimitY - this.y) {
            this._stateIconSprite.y = pIconLimitY - this.y;
        }
    // 設定がない場合は元の処理を使用
    } else {
        _Sprite_Enemy_updateStateSprite.apply(this, arguments);
    }
};

})();
