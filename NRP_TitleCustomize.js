//=============================================================================
// NRP_TitleCustomize.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.00 Customize the title scene.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @orderAfter NRP_N_TitleMap
 * @url https://newrpg.seesaa.net/article/501426741.html
 *
 * @help Customize the title scene.
 * 
 * - Change the size of the command window
 * - Enable control characters for commands.
 * - Do not fade out BGM at the beginning of the game.
 * 
 * Note that the placement of the command window can be changed
 * in System 1 of the database.
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
 * @param UseControlCharacter
 * @type boolean
 * @default true
 * @desc Enables control characters in command names.
 * Note that character reduction is disabled.
 * 
 * @param TextAlign
 * @type select
 * @option left
 * @option center
 * @default center
 * @desc Command name placement.
 * 
 * @param WindowWidth
 * @type number
 * @default 240
 * @desc The width of the title window.
 * The default value is 240.
 * 
 * @param WindowLineHeight
 * @type number
 * @desc The height of a single line of the window.
 * If blank, the original setting is used.
 * 
 * @param OptionName
 * @type string
 * @desc Optional display name.
 * Can be specified separately from the menu scene.
 * 
 * @param NoBgmFadeOut
 * @type boolean
 * @default false
 * @desc Don't fade out the BGM at the start of the game.
 * If you want to take over the title music as it is.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.00 タイトル画面をカスタマイズします。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @orderAfter NRP_N_TitleMap
 * @url https://newrpg.seesaa.net/article/501426741.html
 *
 * @help タイトル画面をカズタマイズします。
 * 
 * ・コマンドウィンドウのサイズ調整
 * ・コマンドの制御文字の有効化
 * ・ゲーム開始時のＢＧＭをフェードアウトさせない。
 * 
 * なお、コマンドウィンドウの配置は、
 * データベースのシステム1で変更できます。
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
 * @param UseControlCharacter
 * @text 制御文字を有効に
 * @type boolean
 * @default true
 * @desc コマンド名に制御文字を有効にします。
 * なお、副作用で文字の縮小が無効になります。
 * 
 * @param TextAlign
 * @text 文字の配置
 * @type select
 * @option 左 @value left
 * @option 中央 @value center
 * @default center
 * @desc コマンド名の配置です。
 * 
 * @param WindowWidth
 * @text ウィンドウの横幅
 * @type number
 * @default 240
 * @desc タイトルウィンドウの横幅です。
 * 初期値は240です。
 * 
 * @param WindowLineHeight
 * @text ウィンドウの一行の幅
 * @type number
 * @desc ウィンドウの一行の縦幅です。
 * 空欄なら元の設定を使用します。
 * 
 * @param OptionName
 * @text オプション名
 * @type string
 * @desc オプションの表示名です。
 * メニュー画面とは別に指定できます。
 * 
 * @param NoBgmFadeOut
 * @text BGMをフェードアウトしない
 * @type boolean
 * @default false
 * @desc ゲーム開始時にＢＧＭをフェードアウトさせません。
 * タイトル画面の音楽をそのまま引き継ぎたい場合に。
 */

(function() {
"use strict";

/**
 * ●構造体（二重配列）をJSで扱えるように変換
 */
function parseStruct2(arg) {
    var ret = [];

    JSON.parse(arg).forEach(function(str) {
        ret.push(JSON.parse(str));
    });

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

const PLUGIN_NAME = "NRP_TitleCustomize";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pUseControlCharacter = toBoolean(parameters["UseControlCharacter"], false);
const pTextAlign = setDefault(parameters["TextAlign"], "center");
const pWindowWidth = toNumber(parameters["WindowWidth"]);
const pWindowLineHeight = toNumber(parameters["WindowLineHeight"]);
const pOptionName = setDefault(parameters["OptionName"]);
const pNoBgmFadeOut = toBoolean(parameters["NoBgmFadeOut"], false);

// ----------------------------------------------------------------------------
// Scene_Title
// ----------------------------------------------------------------------------

if (pNoBgmFadeOut) {
    let mNoFadeOut = false;

    /**
     * 【上書】画面＆音声のフェードアウト
     * ※Scene_Base.prototype.fadeOutAllをオーバライド
     */
    const _Scene_Title_fadeOutAll = Scene_Title.prototype.fadeOutAll;
    Scene_Title.prototype.fadeOutAll = function() {
        mNoFadeOut = true;
        _Scene_Title_fadeOutAll.apply(this, arguments);
        mNoFadeOut = false;
    };

    /**
     * ●ＢＧＭのフェードアウト
     */
    const _AudioManager_fadeOutBgm = AudioManager.fadeOutBgm;
    AudioManager.fadeOutBgm = function(duration) {
        // ゲーム開始時はフェードアウトしない。
        if (mNoFadeOut) {
            return;
        }
        _AudioManager_fadeOutBgm.apply(this, arguments);
    };
}

/**
 * 【上書】コマンドウィンドウの横幅
 */
Scene_Title.prototype.mainCommandWidth = function() {
    return eval(pWindowWidth);
};

//-----------------------------------------------------------------------------
// Window_TitleCommand
//-----------------------------------------------------------------------------

if (pUseControlCharacter) {
    /**
     * 【上書】コマンド名の描画
     */
    Window_TitleCommand.prototype.drawItem = function(index) {
        const rect = this.itemLineRect(index);
        const align = this.itemTextAlign();
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));

        const text = this.commandName(index);
        let x = rect.x;
        // 中央寄せの場合はＸ座標を調整
        if (align !== "left") {
            const textWidth = this.textSizeEx(text).width;
            x += (rect.width - textWidth) / (align === "center" ? 2 : 1);
        }
        this.drawTextEx(text, x, rect.y, rect.width);
    };

    /**
     * 【上書】文字列描画処理
     * ※Window_Base.prototype.drawTextExとほぼ同じだがフォントリセットしない。
     */
    Window_TitleCommand.prototype.drawTextEx = function(text, x, y, width) {
        const textState = this.createTextState(text, x, y, width);
        this.processAllText(textState);
        return textState.outputWidth;
    };
}

/**
 * 【上書】文字の配置
 */
Window_TitleCommand.prototype.itemTextAlign = function() {
    return pTextAlign;
};

if (pOptionName) {
    /**
     * ●コマンドの生成
     */
    const _Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
    Window_TitleCommand.prototype.makeCommandList = function() {
        // オプションの文字列が格納されているＩＤ
        const OPTIONS_ID = 11;

        const keepOptions = $dataSystem.terms.commands[OPTIONS_ID];
        $dataSystem.terms.commands[OPTIONS_ID] = pOptionName;
        _Window_TitleCommand_makeCommandList.apply(this, arguments);
        $dataSystem.terms.commands[OPTIONS_ID] = keepOptions;
    };
}

if (pWindowLineHeight) {
    /**
     * 【上書】項目の縦幅
     */
    Window_TitleCommand.prototype.itemHeight = function() {
        return pWindowLineHeight;
    };

    /**
     * 【上書】ウィンドウの高さ計算
     */
    Scene_Title.prototype.calcWindowHeight = function(numLines, selectable) {
        // Window_TitleCommandを参照するように変更
        return Window_TitleCommand.prototype.fittingHeight(numLines);
    };
}

})();
