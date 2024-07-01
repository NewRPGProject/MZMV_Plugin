//=============================================================================
// NRP_OperationDescription.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v0.90
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url
 *
 * @help 
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
 */

/*:ja
 * @target MV MZ
 * @plugindesc v0.90 操作説明を表示します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url
 *
 * @help 操作説明をタイトル画面に追加します。
 * 機能はベタ書きしているので、汎用的な機能はありません。
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
 */

(function() {
"use strict";

/**
 * ●構造体（二重配列）をJSで扱えるように変換
 */
function parseStruct2(arg) {
    var ret = [];

    if (arg) {
        JSON.parse(arg).forEach(function(str) {
            ret.push(JSON.parse(str));
        });
    }
    return ret;
}
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

const PLUGIN_NAME = "NRP_OperationDescription";
const parameters = PluginManager.parameters(PLUGIN_NAME);

//-----------------------------------------------------------------------------
// Scene_Title
//-----------------------------------------------------------------------------

/**
 * ●コマンド作成
 */
const _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
    _Scene_Title_createCommandWindow.apply(this, arguments);
    this._commandWindow.setHandler("operationDescription", this.commandOperationDescription.bind(this));
};

/**
 * 【独自】操作説明を呼び出し
 */
Scene_Title.prototype.commandOperationDescription = function() {
    this._commandWindow.close();

    // SceneGlossary.jsを呼び出し。
    $gameParty.clearGlossaryIndex();
    $gameParty.setSelectedGlossaryType(null, 0);
    SceneManager.push(Scene_Glossary);
};

//-----------------------------------------------------------------------------
// Window_TitleCommand
//-----------------------------------------------------------------------------

/**
 * ●タイトルのコマンド作成
 */
const _Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
    _Window_TitleCommand_makeCommandList.apply(this, arguments);

    // 挿入位置(3)を指定
    this._list.splice(3, 0, { name: "\\i[556]操作説明", symbol: "operationDescription", enabled: true, ext: null});
    // 縦幅を再調整
    this.height = this.fittingHeight(this._list.length);
};

})();
