//=============================================================================
// NRP_WordWrap.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.02 Automatically wraps text by words.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/521244368.html
 *
 * @help Detects word boundaries at half-width spaces and automatically
 * wraps text to fit the width of the window.
 * This plugin is mainly intended for languages that use alphabets,
 * such as English.
 * 
 * Full-width characters, such as Japanese characters, are also
 * automatically wrapped when they exceed the window width.
 * 
 * -------------------------------------------------------------------
 * [Support for External Plugins]
 * -------------------------------------------------------------------
 * Register a window class name in the "Additional Windows" plugin
 * parameter to apply word wrapping to windows added by other plugins.
 * 
 * To find a window class name, search the target plugin for "Window_"
 * and locate the class that displays the relevant text.
 * 
 * If the target plugin uses a custom text-rendering implementation,
 * this plugin may replace that processing.
 * 
 * Additionally, depending on how the external plugin is implemented,
 * this plugin may not be able to support it.
 * 
 * -------------------------------------------------------------------
 * [About Beginning Prohibited Characters]
 * -------------------------------------------------------------------
 * One of the rules for writing in Japanese is that
 * certain characters—such as punctuation marks (。、)—should be
 * positioned so they do not appear at the beginning of a line.
 * 
 * ◆Reference: Explanation of Prohibited Characters, Final Push, and Eviction
 * https://note.morisawa.co.jp/n/nc9e6aac69336
 * 
 * You can designate characters set in "BeginningProhibitedCharacters"
 * as targets for "Eviction" or "Final Push.""
 * However, when using “Final Push,” the text will look unnatural
 * unless there is a certain amount of space at the end of the line.
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
 * @param <Scope of Application>
 * @text <Scope of Application>
 * 
 * @param AllWindows
 * @parent <Scope of Application>
 * @text All Windows
 * @type boolean
 * @default false
 * @desc Applies word wrapping to all windows.
 * When enabled, the parameters below are ignored.
 * 
 * @param Window_Message
 * @parent <Scope of Application>
 * @text Message Window
 * @type boolean
 * @default false
 * @desc Applies word wrapping to the message window.
 * 
 * @param Window_Help
 * @parent <Scope of Application>
 * @text Help Window
 * @type boolean
 * @default false
 * @desc Applies word wrapping to the help window.
 * 
 * @param Window_ScrollText
 * @parent <Scope of Application>
 * @text Scrolling Text
 * @type boolean
 * @default false
 * @desc Applies word wrapping to scrolling text.
 * 
 * @param AddWindowList
 * @parent <Scope of Application>
 * @text Additional Windows
 * @type string[]
 * @desc Adds window class names to the wrapping targets.
 * Example: Window_Glossary
 * 
 * @param <Prohibited Characters>
 * 
 * @param BeginingProhibitedType
 * @parent <Prohibited Characters>
 * @type select
 * @option Disabled @value 0
 * @option Eviction @value 1
 * @option Final Push @value 2
 * @default 0
 * @desc Here's how to handle leading characters. For “Final Push,” you need to leave some space at the right edge of the window.
 * 
 * @param BeginingProhibitedCharacters
 * @parent <Prohibited Characters>
 * @type string
 * @desc These are characters that are prohibited from appearing at the beginning of a line.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.02 文章を単語単位で自動改行する。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/521244368.html
 *
 * @help 半角スペースで単語の区切りを判定し、
 * 文章をウィンドウの幅に合わせて適切に改行します。
 * 主に英語などのアルファベットを使用した言語を想定しています。
 * 
 * 日本語などの全角文字についても、
 * ウィンドウ幅を越えた文字については自動で改行を行います。
 * 
 * -------------------------------------------------------------------
 * ■外部プラグイン対応について
 * -------------------------------------------------------------------
 * プラグインパラメータの『追加ウィンドウ』にウィンドウ名を登録すれば、
 * 外部プラグインで追加されたウィンドウへも対応できます。
 * 
 * ウィンドウ名を調べたい場合は対象プラグイン内を「Window_」で検索して、
 * それっぽい名称を見つけてください。
 * 
 * 注意点として、対象プラグインが文字列の描画について、
 * 独自の実装をしている場合は、処理を上書きしてしまう可能性があります。
 * 
 * また、外部プラグインの実装内容によっては、
 * このプラグインでは対応できないこともあります。
 * 
 * -------------------------------------------------------------------
 * ■行頭禁則文字について
 * -------------------------------------------------------------------
 * 日本語の文章ルールとして句読点（。、）を始めとした一部の文字は、
 * 行頭に来ないように調整するというものがあります。
 * 
 * ◆参考：禁則文字・追い込み・追い出しを解説 
 * https://note.morisawa.co.jp/n/nc9e6aac69336
 * 
 * 行頭禁則文字に設定した文字を「追い出し」または「追い込み」の対象に
 * することができます。無効にすることも可能です。ただし「追い込み」を使用する場合は、
 * 行末にある程度のスペースがないと不自然になります。
 * 
 * ※初期設定では「。、」のみ対象にしています。
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
 * @param <Scope of Application>
 * @text ＜有効範囲＞
 * 
 * @param AllWindows
 * @parent <Scope of Application>
 * @text 全てのウィンドウ
 * @type boolean
 * @default false
 * @desc 全てのウィンドウを対象にします。
 * オンにすると以降のパラメータは無視されます。
 * 
 * @param Window_Message
 * @parent <Scope of Application>
 * @text メッセージウィンドウ
 * @type boolean
 * @default false
 * @desc メッセージウィンドウを対象にします。
 * 
 * @param Window_Help
 * @parent <Scope of Application>
 * @text ヘルプウィンドウ
 * @type boolean
 * @default false
 * @desc ヘルプウィンドウを対象にします。
 * 
 * @param Window_ScrollText
 * @parent <Scope of Application>
 * @text スクロール文章
 * @type boolean
 * @default false
 * @desc スクロール文章を対象にします。
 * 
 * @param AddWindowList
 * @parent <Scope of Application>
 * @text 追加ウィンドウ
 * @type string[]
 * @desc 対象となるウィンドウ名を追加します。
 * 例：Window_Glossary
 * 
 * @param <Prohibited Characters>
 * @text ＜禁則文字＞
 * 
 * @param BeginingProhibitedType
 * @parent <Prohibited Characters>
 * @text 行頭禁則の方法
 * @type select
 * @option 無効 @value 0
 * @option 追い出し @value 1
 * @option 追い込み @value 2
 * @default 0
 * @desc 行頭文字の対処方法です。
 * 追い込みの場合はウィンドウ右端に余白が必要です。
 * 
 * @param BeginingProhibitedCharacters
 * @parent <Prohibited Characters>
 * @text 行頭禁則文字
 * @type string
 * @default 。、
 * @desc 行頭への使用を禁止する文字です。
 */

(function() {
"use strict";

/**
 * ●構造体をJSで扱えるように変換
 */
function parseStruct1(arg) {
    const ret = [];
    if (arg) {
        for (const str of JSON.parse(arg)) {
            ret.push(str);
        }
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

const PLUGIN_NAME = "NRP_WordWrap";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pAllWindows = toBoolean(parameters["AllWindows"], false);
const pWindow_Message = toBoolean(parameters["Window_Message"], false);
const pWindow_Help = toBoolean(parameters["Window_Help"], false);
const pWindow_ScrollText = toBoolean(parameters["Window_ScrollText"], false);
const pAddWindowList = parseStruct1(parameters["AddWindowList"]);
const pBeginingProhibitedCharacters = setDefault(parameters["BeginingProhibitedCharacters"], "");
const pBeginingProhibitedType = toNumber(parameters["BeginingProhibitedType"], 0);

/**
 * ●ウィンドウが折返し対象かどうか
 */
function isTargetWindow(window) {
    if (pAllWindows) {
        return true;
    }

    const windowName = window.constructor.name;
    return (
        (pWindow_Message && windowName === "Window_Message") ||
        (pWindow_Help && windowName === "Window_Help") ||
        (pWindow_ScrollText && windowName === "Window_ScrollText") ||
        pAddWindowList.includes(windowName)
    );
}

/**
 * ●実際に描画できる横幅を取得
 *
 * 一部の外部プラグインはウィンドウ全体の幅を渡すが、drawTextEx の幅は
 * 描画開始位置 x から右端までの値でなければならない。内容領域を越えない
 * ように制限する。
 */
function drawableTextWidth(window, x, width) {
    const availableWidth = Math.max(0, window.contentsWidth() - x);
    return width > 0 ? Math.min(width, availableWidth) : availableWidth;
}

/**
 * ●エスケープ文字列からコードを取得
 */
function escapeCodeAt(text, index) {
    const regExp = /^[$.|^!><{}\\]|^[A-Z]+/i;
    const match = regExp.exec(text.slice(index));
    return match ? match[0].toUpperCase() : "";
}

/**
 * ●エスケープ文字列から数値引数を取得
 */
function escapeParamAt(text, index) {
    const match = /^\[(\d+)\]/.exec(text.slice(index));
    return match ? { value: Number(match[1]), length: match[0].length } : null;
}

/**
 * ●次の単語の表示幅を取得
 * 制御文字は実際の描画と同じく、アイコンと文字サイズだけ幅へ反映する。
 */
function nextWordWidth(textState) {
    const text = textState.text;
    const originalFontSize = this.contents.fontSize;
    let fontSize = originalFontSize;
    let width = 0;
    let index = textState.index + 1;

    try {
        while (index < text.length) {
            const character = text[index];
            if (character === " " || character === "\n") {
                break;
            }

            if (character === "\x1b") {
                index++;
                const code = escapeCodeAt(text, index);
                if (!code) {
                    continue;
                }
                index += code.length;
                const param = escapeParamAt(text, index);

                if (code === "I" && param) {
                    width += ImageManager.standardIconWidth + 4;
                    index += param.length;
                } else if (code === "FS" && param) {
                    fontSize = param.value;
                    index += param.length;
                } else if (code === "{") {
                    fontSize = Math.min(fontSize + 12, 108);
                } else if (code === "}") {
                    fontSize = Math.max(fontSize - 12, 24);
                } else if (param) {
                    // 標準の色変更など、幅に影響しない数値引数を読み飛ばす。
                    index += param.length;
                }
            } else {
                this.contents.fontSize = fontSize;
                width += this.textWidth(character);
                index++;
            }
        }
    } finally {
        this.contents.fontSize = originalFontSize;
    }

    return width;
}

/**
 * ●現在位置の半角スペースを改行へ置き換えるべきか
 */
function shouldWrapAtSpace(textState) {
    if (
        !isTargetWindow(this) ||
        textState.rtl ||
        textState.width <= 0 ||
        textState.text[textState.index] !== " "
    ) {
        return false;
    }

    const currentWidth = this.textWidth(textState.buffer);
    const currentX = textState.x + currentWidth;
    const lineEndX = textState.startX + textState.width;
    const wordWidth = nextWordWidth.call(this, textState);
    const spaceWidth = this.textWidth(" ");

    // 行頭では折り返さないため、スペースを含まない長い単語はそのまま表示する。
    return (
        currentX > textState.startX &&
        currentX + spaceWidth + wordWidth > lineEndX
    );
}

/**
 * ●日本語など、単語区切りを使わない文字かどうか
 */
function isCjkCharacter(character) {
    return /[\u1100-\u11ff\u2e80-\u9fff\uf900-\ufaff\uff00-\uffef]/.test(character);
}

/**
 * ●行頭禁則文字かどうか
 */
function isBeginingProhibitedCharacter(character) {
    return character && pBeginingProhibitedCharacters.includes(character);
}

/**
 * ●追い込み後、次の表示文字の直前で改行すべきか
 */
function shouldWrapAfterChasingIn(textState) {
    const character = textState.text[textState.index];
    return (
        textState._wordWrapChasingIn &&
        character &&
        character !== "\n" &&
        character !== "\x1b"
    );
}

/**
 * ●追い出し時、禁則文字の直前で改行すべきか
 *
 * 次の文字が行頭禁則文字で、その2文字が行に収まらない場合は、
 * 現在の文字から次行へ送る。これにより禁則文字を行頭に置かない。
 */
function shouldWrapBeforeBeginingProhibitedCharacter(textState) {
    if (
        !isTargetWindow(this) ||
        textState.rtl ||
        textState.width <= 0 ||
        pBeginingProhibitedType !== 1
    ) {
        return false;
    }

    const character = textState.text[textState.index];
    const nextCharacter = textState.text[textState.index + 1];
    if (!isCjkCharacter(character) || !isBeginingProhibitedCharacter(nextCharacter)) {
        return false;
    }

    const currentX = textState.x + this.textWidth(textState.buffer);
    const lineEndX = textState.startX + textState.width;
    const pairWidth = this.textWidth(character) + this.textWidth(nextCharacter);
    return currentX > textState.startX && currentX + pairWidth > lineEndX;
}

/**
 * ●CJK文字を行末で折り返すべきか
 */
function shouldWrapAtCjkCharacter(textState) {
    if (
        !isTargetWindow(this) ||
        textState.rtl ||
        textState.width <= 0 ||
        !isCjkCharacter(textState.text[textState.index])
    ) {
        return false;
    }

    const character = textState.text[textState.index];
    const currentX = textState.x + this.textWidth(textState.buffer);
    const characterWidth = this.textWidth(character);
    const lineEndX = textState.startX + textState.width;
    const exceedsLine = (
        currentX > textState.startX && currentX + characterWidth > lineEndX
    );

    // 追い込みは禁則文字を前行へ残し、その次の文字の直前で改行する。
    // 文字幅・字間は変更しない。
    return !(
        exceedsLine &&
        pBeginingProhibitedType === 2 &&
        isBeginingProhibitedCharacter(character)
    ) && exceedsLine;
}

/**
 * ●単語単位とCJK文字単位の折返しを混在させて処理する。
 */
function processWordWrapText(textState) {
    while (textState.index < textState.text.length) {
        this.processCharacter(textState);
    }
    this.flushTextState(textState);
}

// スペースを読む直前に次の単語を計測し、必要ならスペースを改行へ置き換える。
const _Window_Base_processCharacter = Window_Base.prototype.processCharacter;
Window_Base.prototype.processCharacter = function(textState) {
    if (shouldWrapAfterChasingIn(textState)) {
        textState._wordWrapChasingIn = false;
        this.flushTextState(textState);
        this.processNewLine(textState);
        return;
    }
    if (textState._wordWrapChasingIn && textState.text[textState.index] === "\n") {
        textState._wordWrapChasingIn = false;
    }
    if (shouldWrapBeforeBeginingProhibitedCharacter.call(this, textState)) {
        this.flushTextState(textState);
        this.processNewLine(textState);
        return;
    }
    if (shouldWrapAtCjkCharacter.call(this, textState)) {
        this.flushTextState(textState);
        this.processNewLine(textState);
        return;
    }
    if (shouldWrapAtSpace.call(this, textState)) {
        textState.index++;
        this.flushTextState(textState);
        this.processNewLine(textState);
        return;
    }

    const character = textState.text[textState.index];
    if (
        isTargetWindow(this) &&
        pBeginingProhibitedType === 2 &&
        isBeginingProhibitedCharacter(character) &&
        isCjkCharacter(character)
    ) {
        const currentX = textState.x + this.textWidth(textState.buffer);
        const lineEndX = textState.startX + textState.width;
        if (currentX > textState.startX && currentX + this.textWidth(character) > lineEndX) {
            textState._wordWrapChasingIn = true;
        }
    }
    _Window_Base_processCharacter.apply(this, arguments);
};

// 独自の drawTextEx() を持つ対象ウィンドウでも、幅未指定の描画を折り返せるようにする。
const _Window_Base_createTextState = Window_Base.prototype.createTextState;
Window_Base.prototype.createTextState = function(text, x, y, width) {
    const textState = _Window_Base_createTextState.apply(this, arguments);
    if (
        isTargetWindow(this) &&
        (width === undefined || width === null || width <= 0)
    ) {
        textState.width = Math.max(0, this.contentsWidth() - x);
    }
    return textState;
};

// 幅を省略する外部ウィンドウにも有効幅を渡し、独自の文字単位改行を使わない。
const _Window_Base_drawTextEx = Window_Base.prototype.drawTextEx;
Window_Base.prototype.drawTextEx = function(text, x, y, width) {
    if (!isTargetWindow(this)) {
        return _Window_Base_drawTextEx.apply(this, arguments);
    }

    this.resetFontSettings();
    const textWidth = drawableTextWidth(this, x, width);
    const textState = this.createTextState(text, x, y, textWidth);
    processWordWrapText.call(this, textState);
    return textState.outputWidth;
};

// 描画時と同じ処理で高さを計測し、画像や他の要素との配置を一致させる。
const _Window_Base_textSizeEx = Window_Base.prototype.textSizeEx;
Window_Base.prototype.textSizeEx = function(text) {
    if (!isTargetWindow(this)) {
        return _Window_Base_textSizeEx.apply(this, arguments);
    }

    this.resetFontSettings();
    const textState = this.createTextState(text, 0, 0, this.contentsWidth());
    textState.drawing = false;
    processWordWrapText.call(this, textState);
    return { width: textState.outputWidth, height: textState.outputHeight };
};

// Window_Message は標準で描画幅を textState に渡さないため、本文の有効幅を補う。
const _Window_Message_startMessage = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
    _Window_Message_startMessage.apply(this, arguments);
    if (isTargetWindow(this) && this._textState) {
        this._textState.width = this.innerWidth - this._textState.startX - 4;
    }
};

// Window_ScrollText は高さ計測時に描画幅を渡さないため、表示時と同じ幅を使用する。
const _Window_ScrollText_createTextState = Window_ScrollText.prototype.createTextState;
Window_ScrollText.prototype.createTextState = function(text, x, y, width) {
    const textState = _Window_ScrollText_createTextState.apply(this, arguments);
    if (isTargetWindow(this) && width <= 0) {
        textState.width = this.baseTextRect().width;
    }
    return textState;
};

})();
