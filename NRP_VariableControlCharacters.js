//=============================================================================
// NRP_VariableControlCharacters.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Allow control characters in character variable display
 * @author Takeshi Sunagawa (https://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/501558898.html
 *
 * @help Enable control characters when displaying character variables.
 * 
 * When doing Control Variables for event commands,
 * you can also assign a string if you specify a script.
 * You can display a string of text by filling in \v[1]
 * when displaying a text or choice.
 * 
 * However, specifying control characters
 * in this character variable does not support displaying them.
 * If you apply this plugin,
 * you will be able to display control characters.
 * 
 * For example, when displaying texts or choices, the actor name,
 * icon, text color, etc. can be changed depending on the situation.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Assign (via script) a string containing control characters
 * to the variable.
 * ※Two \ marks used for control characters must be stacked.
 *   (e.g.: "\\n[1]")
 * 
 * Then use Show Text or Show Choices to output.
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
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 文字変数の表示に制御文字を許可
 * @author 砂川赳（https://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/501558898.html
 *
 * @help 文字変数を表示する際に制御文字を有効にします。
 * 
 * イベントコマンドで変数の操作をする際、
 * スクリプトを指定すれば文字列を代入することもできます。
 * 文章や選択肢を表示する際に\v[1]のように記入すれば、
 * 文字列を表示することが可能です。
 * 
 * しかしながら、この文字変数に制御文字を指定しても、
 * 表示には対応してくれません。
 * そこで、このプラグインを適用すれば、制御文字を表示できるようになります。
 * 
 * 例えば、文章や選択肢を表示する際に、
 * アクター名、アイコン、文字色などを状況によって変更できます。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * 変数に制御文字を含む文字列を代入（スクリプト経由）してください。
 * ※制御文字に使用する\は２つ重ねてください。
 * （例："\\n[1]"）
 * 
 * あとは文章の表示や選択肢の表示で出力すればＯＫです。
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

const PLUGIN_NAME = "NRP_VariableControlCharacters";
const parameters = PluginManager.parameters(PLUGIN_NAME);

// ----------------------------------------------------------------------------
// Window_Base
// ----------------------------------------------------------------------------

/**
 * ●制御文字の変換
 */
const _Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function(text) {
    let text2 = _Window_Base_convertEscapeCharacters.apply(this, arguments);
    // 再度変換する。
    text2 = text2.replace(/\\/g, "\x1b");
    return text2;
};

})();
