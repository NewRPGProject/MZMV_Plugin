//=============================================================================
// NRP_AutoSave.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.00 Execute Autosave at will.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/503148042.html
 *
 * @help Execute autosave at will.
 * 
 * RPG Maker MZ's autosave function is executed
 * after transfers and battles, but there may be times when you want
 * to execute it at other times, depending on the work.
 * 
 * This plugin provides functionality to allow autosaving
 * at the developer's preferred timing.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * You can invoke the plugin command to perform an autosave.
 * Autosave in transfer and battle can be disabled
 * with a plugin parameter.
 * 
 * Note that "Enable Autosave" in System 1 must be turned on.
 * Otherwise, the autosave file will not appear on the load screen.
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
 * @ Plugin Commands
 * @------------------------------------------------------------------
 * 
 * @command AutoSave
 * @desc Perform an autosave.
 * 
 * @-----------------------------------------------------
 * @ Plugin Parameters
 * @-----------------------------------------------------
 * 
 * @param DisabledTransferSave
 * @type boolean
 * @default false
 * @desc Disables the autosave function after transfer.
 * 
 * @param DisabledBattleSave
 * @type boolean
 * @default false
 * @desc Disable the autosave function at the end of battle.
 * 
 * @param DisabledSwitch
 * @type switch
 * @desc If the switch is on, auto save is disabled.
 * Only applies to transfers and at the time of battle.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.00 オートセーブを任意に実行する。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/503148042.html
 *
 * @help オートセーブを任意に実行します。
 * 
 * ＲＰＧツクールＭＺのオートセーブ機能は場所移動や戦闘時に実行されますが、
 * 作品によってはそれ以外のタイミングで実行したいこともあるかと思います。
 * 
 * このプラグインでは開発者の好みのタイミングで、
 * オートセーブできるように機能を提供します。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * プラグインコマンドを呼び出せば、オートセーブを実行できます。
 * 場所移動や戦闘でのオートセーブは、
 * プラグインパラメータで無効にすることができます。
 * 
 * なお、システム１の「オートセーブを有効化」はオンにしておいてください。
 * そうしないと、ロード画面にオートセーブのファイルが表示されません。
 * 
 * -------------------------------------------------------------------
 * ■利用規約
 * -------------------------------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @------------------------------------------------------------------
 * @ プラグインコマンド
 * @------------------------------------------------------------------
 * 
 * @command AutoSave
 * @text オートセーブを実行
 * @desc オートセーブを実行します。
 * 
 * @-----------------------------------------------------
 * @ プラグインパラメータ
 * @-----------------------------------------------------
 * 
 * @param DisabledTransferSave
 * @text 場所移動時のセーブを無効
 * @type boolean
 * @default false
 * @desc 場所移動後のオートセーブ機能を無効化します。
 * 
 * @param DisabledBattleSave
 * @text 戦闘時のセーブを無効
 * @type boolean
 * @default false
 * @desc 戦闘終了後のオートセーブ機能を無効化します。
 * 
 * @param DisabledSwitch
 * @text オートセーブ無効スイッチ
 * @type switch
 * @desc スイッチがオンの場合はオートセーブを無効化します。
 * 場所移動後、戦闘後のみが対象です。
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

const PLUGIN_NAME = "NRP_AutoSave";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pDisabledTransferSave = toBoolean(parameters["DisabledTransferSave"], false);
const pDisabledBattleSave = toBoolean(parameters["DisabledBattleSave"], false);
const pDisabledSwitch = toNumber(parameters["DisabledSwitch"]);

//-----------------------------------------------------------------------------
// ＭＺ用プラグインコマンド
//-----------------------------------------------------------------------------

// ＭＶには存在しないため、空で定義しておかないとエラーになる。
if (!PluginManager.registerCommand) {
    PluginManager.registerCommand = function() {}
}

/**
 * ●オートセーブ実行
 */
PluginManager.registerCommand(PLUGIN_NAME, "AutoSave", function(args) {
    Scene_Map.prototype.executeAutosave();
});

//-----------------------------------------------------------------------------
// Scene_Map
//-----------------------------------------------------------------------------

/**
 * ●場所移動時のオートセーブを実行するかどうか？
 */
const _Scene_Map_shouldAutosave = Scene_Map.prototype.shouldAutosave;
Scene_Map.prototype.shouldAutosave = function() {
    if (pDisabledTransferSave) {
        return false;
    }
    // 無効化スイッチ
    if (pDisabledSwitch && $gameSwitches.value(pDisabledSwitch)) {
        return false;
    }
    return _Scene_Map_shouldAutosave.apply(this, arguments);
};

//-----------------------------------------------------------------------------
// Scene_Battle
//-----------------------------------------------------------------------------

/**
 * 【上書】戦闘時のオートセーブを実行するかどうか？
 */
const _Scene_Battle_shouldAutosave = Scene_Battle.prototype.shouldAutosave;
Scene_Battle.prototype.shouldAutosave = function() {
    if (pDisabledBattleSave) {
        return false;
    }
    // 無効化スイッチ
    if (pDisabledSwitch && $gameSwitches.value(pDisabledSwitch)) {
        return false;
    }
    return _Scene_Battle_shouldAutosave.apply(this, arguments);
};

})();
