//=============================================================================
// NRP_ChoiceWindowKeep.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Choice window is not closed while the switch is on.
 * @author Takeshi Sunagawa (https://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/501568108.html
 *
 * @help Do not close the choices window
 * while the specified switch is on.
 * 
 * The main purpose is to suppress flickering when the window
 * is closed when the choices are redisplayed in a loop.
 * 
 * The choice window is closed when the switch is turned off.
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
 * @param KeepSwitch
 * @type switch
 * @desc The choice window is not closed while the switch is on.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 スイッチがオンの間は選択肢ウィンドウを閉じない
 * @author 砂川赳（https://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/501568108.html
 *
 * @help 指定したスイッチがオンの間、
 * 選択肢ウィンドウを閉じないようにします。
 * 
 * ループ内で選択肢を再表示した際に、
 * ウィンドウを閉じた際のチラつきを抑えるのが主な目的です。
 * 
 * 選択肢ウィンドウはスイッチをオフにしたタイミングで閉じられます。
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
 * @param KeepSwitch
 * @text 維持スイッチ番号
 * @type switch
 * @desc スイッチがオンの間は選択肢ウィンドウを閉じません。
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

const PLUGIN_NAME = "NRP_ChoiceWindowKeep";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pKeepSwitch = toNumber(parameters["KeepSwitch"]);

// ----------------------------------------------------------------------------
// Window_ChoiceList
// ----------------------------------------------------------------------------

/*
 * Window_ChoiceList.prototype.closeが未定義の場合は事前に定義
 * ※これをしておかないと以後のWindow_Base側への追記が反映されない。
 */
if (Window_ChoiceList.prototype.close == Window_Base.prototype.close) {
    Window_ChoiceList.prototype.close = function() {
        Window_Base.prototype.close.apply(this, arguments);
    }
}

/**
 * ●ウィンドウを閉じる
 */
const _Window_ChoiceList_close = Window_ChoiceList.prototype.close;
Window_ChoiceList.prototype.close = function() {
    // スイッチがオンの場合はクローズしない。
    if (pKeepSwitch && $gameSwitches.value(pKeepSwitch)) {
        return;
    }
    _Window_ChoiceList_close.apply(this, arguments);
};

// ----------------------------------------------------------------------------
// Game_Switches
// ----------------------------------------------------------------------------

/**
 * ●スイッチの設定
 */
const _Game_Switches_setValue = Game_Switches.prototype.setValue;
Game_Switches.prototype.setValue = function(switchId, value) {
    _Game_Switches_setValue.apply(this, arguments);

    // 維持スイッチ番号がオフになった場合
    if (pKeepSwitch && switchId == pKeepSwitch && value == false) {
        // 選択肢ウィンドウが有効ならクローズ
        const choiceWindow = SceneManager._scene._choiceListWindow;
        if (choiceWindow && choiceWindow.isOpen()) {
            choiceWindow.close();
        }
    }
};

})();
