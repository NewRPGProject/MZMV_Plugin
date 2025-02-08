//=============================================================================
// NRP_ProjectSwitch.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Switch on/off at game startup.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/499770407.html
 *
 * @help Turns on/off the specified switch at game startup.
 * ※Continue is included at startup.
 * 
 * Mainly intended to switch the process by project.
 * 
 * For example, you can create a switch that is only turned on
 * for the trial version and display a dedicated navigation message.
 * The corresponding switch can also be turned off when the saved data
 * from the trial version is transferred to the product version.
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
 * @ Plugin Parameters
 * @-----------------------------------------------------
 * 
 * @param OnSwitches
 * @type switch[]
 * @desc Switches that are turned on when the game is started.
 * 
 * @param OffSwitches
 * @type switch[]
 * @desc Switches that are turned off when the game is started.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 ゲーム起動時にスイッチをオン・オフする。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/499770407.html
 *
 * @help ゲーム起動時に指定したスイッチをオン・オフします。
 * ※起動時にはコンティニューも含みます。
 * 
 * 主にプロジェクト毎による処理の切替を想定しています。
 * 
 * 例えば、体験版の場合だけオンになるスイッチを作成し、
 * 体験版専用のナビゲーションメッセージを表示できます。
 * また、体験版のセーブデータを製品版に引き継いだ際に、
 * 該当のスイッチをオフにするようにできます。
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
 * @param OnSwitches
 * @text オンにするスイッチ
 * @type switch[]
 * @desc ゲーム起動時にオンにするスイッチです。
 * 
 * @param OffSwitches
 * @text オフにするスイッチ
 * @type switch[]
 * @desc ゲーム起動時にオフにするスイッチです。
 */

(function() {
"use strict";

function toNumber(str, def) {
    if (str == undefined || str == "") {
        return def;
    }
    return isNaN(str) ? def : +(str || def);
}

const PLUGIN_NAME = "NRP_ProjectSwitch";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pOnSwitches = parameters["OnSwitches"];
const pOffSwitches = parameters["OffSwitches"];

//-----------------------------------------------------------------------------
// DataManager
//-----------------------------------------------------------------------------

/**
 * ●ニューゲーム時のセットアップ
 */
const _DataManager_setupNewGame = DataManager.setupNewGame;
DataManager.setupNewGame = function() {
    _DataManager_setupNewGame.apply(this, arguments);
    setupSwitches();
};

/**
 * ●セーブデータの展開
 */
const _DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    _DataManager_extractSaveContents.apply(this, arguments);
    setupSwitches();
};

/**
 * ●スイッチをオン／オフにする。
 */
function setupSwitches() {
    // スイッチオン
    if (pOnSwitches) {
        const onSwitches = JSON.parse(pOnSwitches);
        for (const onSwitch of onSwitches) {
            $gameSwitches.setValue(toNumber(onSwitch), true);
        }
    }
    // スイッチオフ
    if (pOffSwitches) {
        const offSwitches = JSON.parse(pOffSwitches);
        for (const offSwitch of offSwitches) {
            $gameSwitches.setValue(toNumber(offSwitch), false);
        }
    }
}

})();
