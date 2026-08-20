//=============================================================================
// NRP_WindowKeep.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Do not close the window while the switch is on.
 * @author Takeshi Sunagawa (https://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/501568108.html
 *
 * @help Prevents the message window or choice window
 * from closing while the specified switch is on.
 * 
 * For message windows,
 * the primary purpose is to prevent the window from closing even
 * if other processing occurs while options are being displayed.
 * 
 * If you set “\^” at the end of the message,
 * you can display the message and the choices almost simultaneously.
 * 
 * For options windows,
 * the primary purpose is to reduce flickering when the window
 * is closed after options are redisplayed within a loop.
 * 
 * Both windows will close when the switch is turned off.
 * 
 * Also, if you enable “ConnectMessageChoice,” the text and choices
 * can be displayed simultaneously, even if there are intermediate steps
 * such as annotations or the end of a conditional branch.
 * This makes things easier since you won’t need to use KeepMessageSwitch.
 * 
 * However, it does not support operations on switches or variables,
 * label jumps, or displaying choices from messages within common events.
 * In such cases, please simply use the KeepMessageSwitch.
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
 * @param KeepMessageSwitch
 * @type switch
 * @desc The message window is not closed while the switch is on.
 * 
 * @param KeepChoiceSwitch
 * @type switch
 * @desc The choice window is not closed while the switch is on.
 *
 * @param ConnectMessageChoice
 * @type boolean
 * @default false
 * @desc This allows messages and choices to be displayed simultaneously, even if some processing occurs in between.
 *
 * @param ConnectOnlyDuringSwitch
 * @parent ConnectMessageChoice
 * @type boolean
 * @default false
 * @desc Enable concatenation only when KeepMessageSwitch is turned on.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 スイッチがオンの間はウィンドウを閉じない
 * @author 砂川赳（https://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/501568108.html
 *
 * @help 指定したスイッチがオンの間、
 * メッセージウィンドウまたは選択肢ウィンドウを閉じないようにします。
 * 
 * メッセージウィンドウについては、選択肢を表示する際、間に処理が
 * 挟まってもメッセージウィンドウを閉じないようにするのが主な用途です。
 * 
 * メッセージの末尾に『\^』を設定すれば、
 * メッセージと選択肢をほぼ同時に表示させることも可能です。
 * 
 * 選択肢ウィンドウについては、ループ内で選択肢を再表示した際に、
 * ウィンドウを閉じた際のチラつきを抑えるのが主な用途です。
 * 
 * いずれのウィンドウもスイッチをオフにしたタイミングで閉じられます。
 * 
 * また『文章と選択肢をなるべく連結』をオンにすると、
 * 注釈や条件分岐終了などの処理を挟んでも、文章と選択肢を同時表示できます。
 * こちらならメッセージ維持スイッチを使う必要もなくなるのでお手軽です。
 * 
 * ただし、スイッチや変数の操作、ラベルジャンプ、
 * コモンイベント内のメッセージ表示からの選択肢表示などは対応できません。
 * この場合は、素直にメッセージ維持スイッチを使用してください。
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
 * @param KeepMessageSwitch
 * @text メッセージ維持スイッチ
 * @type switch
 * @desc スイッチがオンの間はメッセージウィンドウを閉じません。
 * 
 * @param KeepChoiceSwitch
 * @text 選択肢維持スイッチ
 * @type switch
 * @desc スイッチがオンの間は選択肢ウィンドウを閉じません。
 *
 * @param ConnectMessageChoice
 * @text 文章と選択肢をなるべく連結
 * @type boolean
 * @default false
 * @desc 注釈や条件分岐終了などの処理を挟んでも、文章と選択肢を同時表示できるようにします。
 *
 * @param ConnectOnlyDuringSwitch
 * @text スイッチ中のみ有効
 * @parent ConnectMessageChoice
 * @type boolean
 * @default false
 * @desc メッセージ維持スイッチがオンの場合のみ連結を有効にします。
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

const PLUGIN_NAME = "NRP_WindowKeep";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pKeepMessageSwitch = toNumber(parameters["KeepMessageSwitch"]);
const pKeepChoiceSwitch = toNumber(parameters["KeepChoiceSwitch"]);
const pConnectMessageChoice = toBoolean(parameters["ConnectMessageChoice"], false);
const pConnectOnlyDuringSwitch = toBoolean(parameters["ConnectOnlyDuringSwitch"], false);

// ----------------------------------------------------------------------------
// Game_Interpreter
// ----------------------------------------------------------------------------

/**
 * ●文章の表示
 */
const _Game_Interpreter_command101 = Game_Interpreter.prototype.command101;
Game_Interpreter.prototype.command101 = function(params) {
    let connection = null;
    if (isMessageChoiceConnectEnabled() && !$gameMessage.isBusy()) {
        connection = findChoiceConnection(this);
    }

    const result = _Game_Interpreter_command101.apply(this, arguments);
    if (result && connection && !$gameMessage.isChoice()) {
        this._index = connection.index;
        this._indent = connection.command.indent;
        this.setupChoices(connection.command.parameters);
    }
    return result;
};

/**
 * 文章と選択肢の連結が有効かどうか。
 */
function isMessageChoiceConnectEnabled() {
    if (!pConnectMessageChoice) {
        return false;
    }
    if (!pConnectOnlyDuringSwitch) {
        return true;
    }
    return pKeepMessageSwitch && $gameSwitches.value(pKeepMessageSwitch);
}

/**
 * 文章の後から実行経路をたどり、連結可能な選択肢を探す。
 */
function findChoiceConnection(startInterpreter) {
    let interpreter = startInterpreter;
    let index = interpreter._index + 1;
    let extended = false;
    const visited = new Set();

    // 文章データは標準処理でも読み飛ばされるため、拡張経路には数えない。
    while (interpreter._list && interpreter._list[index] &&
            interpreter._list[index].code === 401) {
        index++;
    }

    for (let count = 0; count < 100; count++) {
        if (visited.has(index)) {
            return null;
        }
        visited.add(index);

        const list = interpreter._list;
        const command = list && list[index];
        if (!command || command.code === 0) {
            return null;
        }

        switch (command.code) {
            case 102: // 選択肢の表示
                return extended ? {
                    index: index,
                    command: command
                } : null;
            case 401: // 文章
            case 108: // 注釈
            case 408: // 注釈の続き
            case 412: // 条件分岐終了
            case 118: // ラベル
            case 112: // ループ開始
                index++;
                extended = true;
                break;
            case 113: { // ループの中断
                const breakIndex = findLoopEndIndex(interpreter, index);
                if (breakIndex < 0) {
                    return null;
                }
                index = breakIndex + 1;
                extended = true;
                break;
            }
            case 413: { // ループ終端
                const loopIndex = findLoopStartIndex(interpreter, index, command.indent);
                if (loopIndex < 0) {
                    return null;
                }
                index = loopIndex + 1;
                extended = true;
                break;
            }
            default:
                return null;
        }
    }
    return null;
}

/**
 * ループ終端から対応するループ開始位置を取得する。
 */
function findLoopStartIndex(interpreter, index, indent) {
    const list = interpreter._list || [];
    for (let i = index - 1; i >= 0; i--) {
        if (list[i].code === 112 && list[i].indent === indent) {
            return i;
        }
    }
    return -1;
}

/**
 * ループの中断から対応するループ終端位置を取得する。
 */
function findLoopEndIndex(interpreter, index) {
    const list = interpreter._list || [];
    let depth = 0;
    for (let i = index + 1; i < list.length; i++) {
        if (list[i].code === 112) {
            depth++;
        } else if (list[i].code === 413) {
            if (depth > 0) {
                depth--;
            } else {
                return i;
            }
        }
    }
    return -1;
}

// ----------------------------------------------------------------------------
// Window_Message
// ----------------------------------------------------------------------------

/**
 * ●メッセージの終了
 */
const _Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
Window_Message.prototype.terminateMessage = function() {
    // スイッチがオンの場合はウィンドウを閉じず、メッセージだけ終了する。
    if (pKeepMessageSwitch && $gameSwitches.value(pKeepMessageSwitch)) {
        // 他プラグインの終了処理は実行し、ウィンドウのクローズだけを抑止する。
        const hasOwnClose = Object.prototype.hasOwnProperty.call(this, "close");
        const close = this.close;
        this.close = function() {};
        try {
            _Window_Message_terminateMessage.apply(this, arguments);
        } finally {
            if (hasOwnClose) {
                this.close = close;
            } else {
                delete this.close;
            }
        }
        return;
    }
    _Window_Message_terminateMessage.apply(this, arguments);
};

// ----------------------------------------------------------------------------
// Window_ChoiceList
// ----------------------------------------------------------------------------

// Window_ChoiceList.prototype.closeが未定義の場合は事前に定義
defineInheritedMethod(Window_ChoiceList, "close");

/**
 * ●ウィンドウを閉じる
 */
const _Window_ChoiceList_close = Window_ChoiceList.prototype.close;
Window_ChoiceList.prototype.close = function() {
    // スイッチがオンの場合はクローズしない。
    if (pKeepChoiceSwitch && $gameSwitches.value(pKeepChoiceSwitch)) {
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
    if (pKeepMessageSwitch && switchId == pKeepMessageSwitch && value == false) {
        // メッセージウィンドウが有効ならクローズ
        const scene = SceneManager._scene;
        const messageWindow = scene && scene._messageWindow;
        if (messageWindow && messageWindow.isOpen()) {
            messageWindow.close();
        }
    }

    // 維持スイッチ番号がオフになった場合
    if (pKeepChoiceSwitch && switchId == pKeepChoiceSwitch && value == false) {
        // 選択肢ウィンドウが有効ならクローズ
        const scene = SceneManager._scene;
        const choiceWindow = scene && scene._choiceListWindow;
        if (choiceWindow && choiceWindow.isOpen()) {
            choiceWindow.close();
        }
    }
};

// ----------------------------------------------------------------------------
// 共通関数
// ----------------------------------------------------------------------------

/**
 * 継承しているメソッドを対象クラス自身にも定義する。
 * 親クラス側に後から加えられた変更も反映されようになる。
 */
function defineInheritedMethod(windowClass, methodName) {
    const prototype = windowClass.prototype;

    if (!Object.prototype.hasOwnProperty.call(prototype, methodName)) {
        const superPrototype = Object.getPrototypeOf(prototype);
        prototype[methodName] = function(...args) {
            return superPrototype[methodName].apply(this, args);
        };
    }
}

})();
