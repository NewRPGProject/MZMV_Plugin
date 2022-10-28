//=============================================================================
// NRP_RememberSkillTypes.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Retain cursor position for each skill type.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/492931243.html
 *
 * @help In the standard functionality of RPG Maker MV - MZ,
 * using Special after Magic resets
 * the memory of the cursor position of the selected Magic.
 * 
 * This plugin allows the cursor position to be remembered
 * for each Magic and Special by maintaining
 * the cursor position for each skill type.
 * 
 * -------------------------------------------------------------------
 * [Terms]
 * -------------------------------------------------------------------
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 * 
 * @------------------------------------------------------------------
 * @ Plugin Parameters
 * @------------------------------------------------------------------
 * 
 * @param ApplyBattle
 * @type boolean
 * @default true
 * @desc During battle, the position of the skill is retained for each skill type.
 * 
 * @param ApplyMenu
 * @type boolean
 * @default true
 * @desc During menu, the position of the skill is retained for each skill type.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 カーソル位置をスキルタイプ毎に保持する。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/492931243.html
 *
 * @help ツクールＭＶ～ＭＺの標準機能では、
 * 魔法の後に必殺技を使用すると、選択していた魔法スキルの
 * カーソル位置の記憶がリセットされてしまいます。
 * 
 * 当プラグインでは、カーソル位置をスキルタイプ毎に保持することで、
 * 魔法や必殺技それぞれに対して、カーソル位置を記憶できるようにします。
 * 
 * -------------------------------------------------------------------
 * ■利用規約
 * -------------------------------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @------------------------------------------------------------------
 * @ プラグインパラメータ
 * @------------------------------------------------------------------
 * 
 * @param ApplyBattle
 * @text 戦闘時に適用
 * @type boolean
 * @default true
 * @desc 戦闘時にスキルの位置をスキルタイプ毎に保持します。
 * 
 * @param ApplyMenu
 * @text メニュー時に適用
 * @type boolean
 * @default true
 * @desc メニュー時にスキルの位置をスキルタイプ毎に保持します。
 */

(function() {
"use strict";

function toBoolean(str, def) {
    if (str === true || str === "true") {
        return true;
    } else if (str === false || str === "false") {
        return false;
    }
    return def;
}

const PLUGIN_NAME = "NRP_RememberSkillTypes";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pApplyBattle = toBoolean(parameters["ApplyBattle"], true);
const pApplyMenu = toBoolean(parameters["ApplyMenu"], true);

// ----------------------------------------------------------------------------
// Game_Actor
// ----------------------------------------------------------------------------

/**
 * ●変数初期化
 */
const _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
    _Game_Actor_initMembers.apply(this, arguments);

    // スキルタイプ毎の最終使用スキル
    this._lastBattleSkillBySkilltype = [];
    this._lastMenuSkillBySkilltype = [];
};

/**
 * ●最終使用スキルを設定（戦闘）
 */
const _Game_Actor_setLastBattleSkill = Game_Actor.prototype.setLastBattleSkill;
Game_Actor.prototype.setLastBattleSkill = function(skill) {
    _Game_Actor_setLastBattleSkill.apply(this, arguments);

    // 未設定の場合は初期化
    if (!this._lastBattleSkillBySkilltype) {
        this._lastBattleSkillBySkilltype = [];
    }

    // スキルの所属するスキルタイプを取得
    const skilltype = skill.stypeId;
    // スキルタイプ毎にスキルを設定
    this._lastBattleSkillBySkilltype[skilltype] = new Game_Item();
    this._lastBattleSkillBySkilltype[skilltype].setObject(skill);
};

/**
 * ●最終使用スキルを設定（メニュー）
 */
const _Game_Actor_setLastMenuSkill = Game_Actor.prototype.setLastMenuSkill;
Game_Actor.prototype.setLastMenuSkill = function(skill) {
    _Game_Actor_setLastMenuSkill.apply(this, arguments);

    // 未設定の場合は初期化
    if (!this._lastMenuSkillBySkilltype) {
        this._lastMenuSkillBySkilltype = [];
    }

    // スキルの所属するスキルタイプを取得
    const skilltype = skill.stypeId;
    // スキルタイプ毎にスキルを設定
    this._lastMenuSkillBySkilltype[skilltype] = new Game_Item();
    this._lastMenuSkillBySkilltype[skilltype].setObject(skill);
};

/**
 * 【独自】スキルタイプ毎の最終使用スキルを取得
 */
Game_Actor.prototype.lastSkillBySkilltype = function(skilltype) {
    if ($gameParty.inBattle()) {
        if (pApplyBattle) {
            return this.lastBattleSkillBySkilltype(skilltype);
        }
    } else {
        if (pApplyMenu) {
            return this.lastMenuSkillBySkilltype(skilltype);
        }
    }
    // それ以外は通常の処理を呼出
    return Game_Actor.prototype.lastSkill.call(this);
};

/**
 * 【独自】スキルタイプ毎の最終使用スキルを取得（戦闘）
 */
Game_Actor.prototype.lastBattleSkillBySkilltype = function(skilltype) {
    if (this._lastBattleSkillBySkilltype && this._lastBattleSkillBySkilltype[skilltype]) {
        return this._lastBattleSkillBySkilltype[skilltype].object();
    }
    return null;
};

/**
 * 【独自】スキルタイプ毎の最終使用スキルを取得（メニュー）
 */
Game_Actor.prototype.lastMenuSkillBySkilltype = function(skilltype) {
    if (this._lastMenuSkillBySkilltype && this._lastMenuSkillBySkilltype[skilltype]) {
        return this._lastMenuSkillBySkilltype[skilltype].object();
    }
    return null;
};

// ----------------------------------------------------------------------------
// Window_SkillList
// ----------------------------------------------------------------------------

/**
 * 【上書】最後に使用したスキルを取得
 */
Window_SkillList.prototype.selectLast = function() {
    // スキルタイプを参照して取得
    const index = this._data.indexOf(this._actor.lastSkillBySkilltype(this._stypeId));
    // const index = this._data.indexOf(this._actor.lastSkill());

    this.forceSelect(index >= 0 ? index : 0);
};

})();
