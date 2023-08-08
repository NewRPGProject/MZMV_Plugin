//=============================================================================
// NRP_BenchMembersExp.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Changed EXP rate for reserve members.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/500297653.html
 *
 * @help Changed EXP rate for reserve members.
 * In addition, you can change
 * whether the level-up indicator is displayed or not.
 * 
 * Note that "EXP for Reserve Members" in System 1 of the database
 * will be ignored and the settings of this plugin will take precedence.
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
 * @-----------------------------------------------------
 * @ [Plugin Parameters]
 * @-----------------------------------------------------
 * 
 * @param BenchMembersExpRate
 * @type number
 * @decimals 2
 * @default 1.00
 * @desc The experience rate of the reserve member.
 * 1.00 means 100%.
 * 
 * @param NoLevelUpMessage
 * @type boolean
 * @default false
 * @desc Hide level-up messages for reserve members.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 控えメンバーの経験値獲得率を変更。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/500297653.html
 *
 * @help 控えメンバーの経験値獲得率を変更します。
 * さらにレベルアップ表示の有無も変更できます。
 * 
 * なお、データベースのシステム1にある『控えメンバーも経験値を獲得』は、
 * 無視されて当プラグインの設定が優先されるようになります。
 * 
 * -------------------------------------------------------------------
 * ■利用規約
 * -------------------------------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @-----------------------------------------------------
 * @ プラグインパラメータ
 * @-----------------------------------------------------
 * 
 * @param BenchMembersExpRate
 * @text 控えの経験値獲得率
 * @type number
 * @decimals 2
 * @default 1.00
 * @desc 控えメンバーの経験値獲得率です。
 * 1.00が１００％の意味になります。
 * 
 * @param NoLevelUpMessage
 * @text 控えのレベルアップ非表示
 * @type boolean
 * @default false
 * @desc 控えメンバーのレベルアップメッセージを非表示にします。
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
function toNumber(str, def) {
    if (str == undefined || str == "") {
        return def;
    }
    return isNaN(str) ? def : +(str || def);
}
function setDefault(str, def) {
    if (str == undefined || str == "") {
        return def;
    }
    return str;
}

const PLUGIN_NAME = "NRP_BenchMembersExp";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pBenchMembersExpRate = toNumber(parameters["BenchMembersExpRate"]);
const pNoLevelUpMessage = toBoolean(parameters["NoLevelUpMessage"], false);

//-----------------------------------------------------------------------------
// Game_Actor
//-----------------------------------------------------------------------------

if (pBenchMembersExpRate != null) {
    /**
     * 【上書】控えメンバーの経験値獲得率
     */
    Game_Actor.prototype.benchMembersExpRate = function() {
        return pBenchMembersExpRate;
    };
}

/**
 * ●レベルアップ表示を行うか？
 */
const _Game_Actor_shouldDisplayLevelUp = Game_Actor.prototype.shouldDisplayLevelUp;
Game_Actor.prototype.shouldDisplayLevelUp = function() {
    // 非表示設定かつ控えメンバーの場合
    if (pNoLevelUpMessage && !this.isBattleMember()) {
        return false;
    }
    return _Game_Actor_shouldDisplayLevelUp.apply(this, arguments);
};

})();
