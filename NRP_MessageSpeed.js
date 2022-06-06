//=============================================================================
// NRP_MessageSpeed.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.011 Changes the message speed.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/485101364.html
 *
 * @help Changes the message speed.
 * You can also add an item
 * for changing the message speed in the options.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Set the "DefaultSpeed" to your preference.
 * 100 is the normal message speed.
 * For example, 150 is 1.5 times the normal speed.
 * If you set a large number such as 99999,
 * instantaneous display is also possible.
 * 
 * If you want to add an item to the option screen,
 * please set a numerical value to "OptionPosition".
 * ※In the initial state (blank), the item will be hidden.
 * 
 * Also, the value set in "MessageSpeedList" will be displayed
 * as a candidate for the option.
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
 * @param DefaultSpeed
 * @type number
 * @default 100
 * @desc Set the message speed with 100 as the standard.
 * For example, 150 is 1.5 times the normal speed.
 * 
 * @param SpeedVariable
 * @type variable
 * @desc This variable controls the message speed.
 * It takes precedence over "DefaultSpeed" and optional settings.
 * 
 * @param DisableShowFastSwitch
 * @type switch
 * @desc Disables instantaneous message display while the switch is on.
 * Always disabled if 0 (none) is specified. Disabled if blank (DEL).
 * 
 * @param <Option>
 * @desc Option-related items.
 * 
 * @param OptionPosition
 * @parent <Option>
 * @type number
 * @desc The position where the item is inserted into the option screen.
 * 0 for top, blank (DEL) for hidden.
 * 
 * @param OptionName
 * @parent <Option>
 * @type string
 * @default Message Speed
 * @desc Set the display name in the option screen.
 * 
 * @param MessageSpeedList
 * @parent <Option>
 * @type struct<MessageSpeed>[]
 * @default ["{\"Name\":\"50%\",\"MessageSpeed\":\"50\"}","{\"Name\":\"75%\",\"MessageSpeed\":\"75\"}","{\"Name\":\"100%\",\"MessageSpeed\":\"100\"}","{\"Name\":\"150%\",\"MessageSpeed\":\"150\"}","{\"Name\":\"200%\",\"MessageSpeed\":\"200\"}","{\"Name\":\"Instant\",\"MessageSpeed\":\"99999\"}"]
 * @desc Candidate message speeds that can be selected as options.
 */

/*~struct~MessageSpeed:
 * @param Name
 * @type text
 * @desc The display name of the message speed.
 * 
 * @param MessageSpeed
 * @type number
 * @default 100
 * @desc Set the message speed with 100 as the standard.
 * For example, 150 is 1.5 times the normal speed.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.011 メッセージ速度を変更します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/485101364.html
 *
 * @help メッセージ速度を変更します。
 * さらに、オプションにメッセージ速度変更用の項目を追加できます。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * 『標準メッセージ速度』をお好みで設定してください。
 * 100が通常のメッセージ速度です。
 * 例えば、150なら通常の1.5倍速になります。
 * 99999など大きな数字を設定すれば、瞬間表示も可能です。
 * 
 * オプション画面へ項目を追加する場合は、
 * 『オプション挿入位置』に数値を設定してください。
 * ※初期状態（空白）では非表示となります。
 * 
 * また、『メッセージ速度の候補』に設定した値が、
 * オプションの候補として表示されます。
 * 
 * -------------------------------------------------------------------
 * ■利用規約
 * -------------------------------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param DefaultSpeed
 * @text 標準メッセージ速度
 * @type number
 * @default 100
 * @desc 100を標準としてメッセージ速度を設定してください。
 * 例えば、150なら通常の1.5倍速となります。
 * 
 * @param SpeedVariable
 * @text メッセージ速度変数
 * @type variable
 * @desc メッセージ速度を制御する変数です。
 * 『標準メッセージ速度』やオプション設定より優先されます。
 * 
 * @param DisableShowFastSwitch
 * @text 瞬間表示禁止スイッチ
 * @type switch
 * @desc スイッチがオンの間、キー押下時の瞬間表示を禁止します。
 * 0（なし）を指定すると常に禁止。空白（DEL）なら無効。
 * 
 * @param <Option>
 * @text ＜オプション関連＞
 * @desc オプション関連の項目です。
 * 
 * @param OptionPosition
 * @text オプション挿入位置
 * @parent <Option>
 * @type number
 * @desc オプション画面に挿入する位置です。
 * 0が先頭、空白（DEL）なら非表示。
 * 
 * @param OptionName
 * @text オプション表示名
 * @parent <Option>
 * @type string
 * @default メッセージ速度
 * @desc オプション画面での表示名を設定します。
 * 
 * @param MessageSpeedList
 * @text メッセージ速度の候補
 * @parent <Option>
 * @type struct<MessageSpeed>[]
 * @default ["{\"Name\":\"50%\",\"MessageSpeed\":\"50\"}","{\"Name\":\"75%\",\"MessageSpeed\":\"75\"}","{\"Name\":\"100%\",\"MessageSpeed\":\"100\"}","{\"Name\":\"150%\",\"MessageSpeed\":\"150\"}","{\"Name\":\"200%\",\"MessageSpeed\":\"200\"}","{\"Name\":\"瞬間\",\"MessageSpeed\":\"99999\"}"]
 * @desc オプションとして選択できるメッセージ速度の候補です。
 */

/*~struct~MessageSpeed:ja
 * @param Name
 * @text 表示名
 * @type text
 * @desc メッセージ速度の表示名です。
 * 
 * @param MessageSpeed
 * @text メッセージ速度
 * @type number
 * @default 100
 * @desc 100を標準としてメッセージ速度を設定してください。
 * 例えば、150なら通常の1.5倍速となります。
 */

(function() {
"use strict";

/**
 * ●構造体（二重配列）をJSで扱えるように変換
 */
function parseStruct2(arg) {
    const ret = [];
    if (arg) {
        for (const str of JSON.parse(arg)) {
            ret.push(JSON.parse(str));
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

const PLUGIN_NAME = "NRP_MessageSpeed";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pDefaultSpeed = toNumber(parameters["DefaultSpeed"], 100);
const pSpeedVariable = toNumber(parameters["SpeedVariable"]);
const pDisableShowFastSwitch = toNumber(parameters["DisableShowFastSwitch"]);
const pOptionPosition = toNumber(parameters["OptionPosition"]);
const pOptionName = parameters["OptionName"];
const pMessageSpeedList = parseStruct2(parameters["MessageSpeedList"]);

// 識別子
const MESSAGE_SPEED_SYMBOL = "messageSpeed";

let mMessageCount = 0;
let mDisableShowFast = false;

/**
 * ●メッセージ開始
 */
const _Window_Message_startMessage = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
    // カウント初期化
    mMessageCount = 0;

    _Window_Message_startMessage.apply(this, arguments);
}

/**
 * ●メッセージの更新
 */
const _Window_Message_updateMessage = Window_Message.prototype.updateMessage;
Window_Message.prototype.updateMessage = function() {
    // メッセージがない場合は終了
    if (!this._textState) {
        return false;
    }

    // 瞬間表示するかどうか？
    mDisableShowFast = isDisabledShowFast();
    // 出力する文字数を蓄積
    mMessageCount += getMessageSpeed() / 100;

    // 出力する文字がない場合は終了
    if (mMessageCount < 1) {
        return true;
    }

    let outputFlg = false;

    // 蓄積した文字数を出力
    while (mMessageCount >= 1) {
        mMessageCount--;

        // 本来の処理を呼び出し
        const ret = _Window_Message_updateMessage.apply(this, arguments);
        // 出力がなければループ脱出
        if (!ret) {
            break;
        }
        // １文字でも出力があればtrue
        outputFlg = true;
    }

    mDisableShowFast = false;

    return outputFlg;
};

/**
 * ●決定キーによるメッセージの瞬間表示制御
 */
const _Window_Message_updateShowFast = Window_Message.prototype.updateShowFast;
Window_Message.prototype.updateShowFast = function() {
    if (mDisableShowFast && isTriggered()) {
        return;
    }
    _Window_Message_updateShowFast.apply(this, arguments);
};

// ----------------------------------------------------------------------------
// 共通関数
// ----------------------------------------------------------------------------

/**
 * ●メッセージ速度を取得
 */
function getMessageSpeed() {
    // 変数指定がある場合はそちらを優先
    if (pSpeedVariable && $gameVariables.value(pSpeedVariable)) {
        return $gameVariables.value(pSpeedVariable);

    // オプション指定がある場合
    } else if (ConfigManager.messageSpeed) {
        return ConfigManager.messageSpeed;
    }
    // それ以外はデフォルト値を使用
    return pDefaultSpeed;
}

/**
 * ●瞬間表示を禁止するかどうか？
 */
function isDisabledShowFast() {
    // 0なら常に禁止
    if (pDisableShowFastSwitch === 0) {
        return true;
    }
    // それ以外はスイッチがオンの場合のみ禁止
    return $gameSwitches.value(pDisableShowFastSwitch);
};

/**
 * ●Window_Message.prototype.isTriggeredの本来の処理。
 * ※MessageSkip.jsとの併用に対応するため別途定義
 */
function isTriggered() {
    return (
        Input.isRepeated("ok") ||
        Input.isRepeated("cancel") ||
        TouchInput.isRepeated()
    );
};

// ----------------------------------------------------------------------------
// オプション関連
// ----------------------------------------------------------------------------

/**
 * オプションを使用しない場合はここで処理終了
 */
if (pOptionPosition == undefined) {
    return;
}

/**
 * ●オプション候補の最小値
 */
function messageSpeedMin() {
    return toNumber(pMessageSpeedList[0].MessageSpeed);
}

/**
 * ●オプション候補の最大値
 */
function messageSpeedMax() {
    return toNumber(pMessageSpeedList[pMessageSpeedList.length - 1].MessageSpeed);
}

// メッセージ速度の初期値
ConfigManager.messageSpeed = pDefaultSpeed;

/**
 * ●オプション画面の項目生成
 */
const _ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
    const config = _ConfigManager_makeData.apply(this, arguments);

    config.messageSpeed = this.messageSpeed;
    return config;
};

/**
 * ●オプション画面の項目生成
 */
const _ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
    _ConfigManager_applyData.apply(this, arguments);

    this.messageSpeed = this.readMessageSpeed(config, MESSAGE_SPEED_SYMBOL);
};

/**
 * 【独自】メッセージ速度をコンフィグから読込
 */
ConfigManager.readMessageSpeed = function(config, name) {
    const value = config[name];
    if (value !== undefined) {
        return Number(value).clamp(messageSpeedMin(), messageSpeedMax());
    } else {
        return pDefaultSpeed;
    }
};

/**
 * ●表示状態取得
 */
const _Window_Options_statusText = Window_Options.prototype.statusText;
Window_Options.prototype.statusText = function(index) {
    const symbol = this.commandSymbol(index);
    const value = this.getConfigValue(symbol);

    if (isMessageSpeedSymbol(symbol)) {
        return messageSpeedStatusText(value);
    }

    return _Window_Options_statusText.apply(this, arguments);
};

/**
 * ●メッセージ速度の表示名
 */
function messageSpeedStatusText(value) {
    const messageSpeed = pMessageSpeedList.find(messageSpeed => messageSpeed.MessageSpeed == value);
    if (messageSpeed) {
        return messageSpeed.Name;
    }
    return "";
}

/**
 * ●決定キー
 */
const _Window_Options_processOk = Window_Options.prototype.processOk;
Window_Options.prototype.processOk = function() {
    const index = this.index();
    const symbol = this.commandSymbol(index);
    const value = this.getConfigValue(symbol);

    if (isMessageSpeedSymbol(symbol)) {
        this.changeMessageSpeedValue(symbol, nextMessageSpeed(value), true);
        return;
    }
    
    _Window_Options_processOk.apply(this, arguments);
};

/**
 * ●カーソル右
 */
const _Window_Options_cursorRight = Window_Options.prototype.cursorRight;
Window_Options.prototype.cursorRight = function(wrap) {
    const index = this.index();
    const symbol = this.commandSymbol(index);
    const value = this.getConfigValue(symbol);

    if (isMessageSpeedSymbol(symbol)) {
        this.changeMessageSpeedValue(symbol, nextMessageSpeed(value), false);
        return;
    }

    _Window_Options_cursorRight.apply(this, arguments);
};

/**
 * ●カーソル左
 */
const _Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
Window_Options.prototype.cursorLeft = function(wrap) {
    const index = this.index();
    const symbol = this.commandSymbol(index);
    const value = this.getConfigValue(symbol);

    if (isMessageSpeedSymbol(symbol)) {
        this.changeMessageSpeedValue(symbol, preMessageSpeed(value), false);
        return;
    }

    _Window_Options_cursorLeft.apply(this, arguments);
};

/**
 * 【独自】メッセージ速度の値を変更
 */
Window_Options.prototype.changeMessageSpeedValue = function(symbol, value, wrap) {
    // 現在値が最大の状態で決定を押した場合
    if (wrap && this.getConfigValue(symbol) == messageSpeedMax()) {
        this.changeValue(symbol, messageSpeedMin());
        return;
    }

    value = value.clamp(messageSpeedMin(), messageSpeedMax());
    this.changeValue(symbol, value);
};

/**
 * ●次のメッセージ速度を取得
 */
function nextMessageSpeed(value) {
    let messageSpeed = pMessageSpeedList.find(messageSpeed => messageSpeed.MessageSpeed == value);
    const index = pMessageSpeedList.indexOf(messageSpeed);
    // 次の値を取得できれば返す
    if (pMessageSpeedList[index + 1]) {
        messageSpeed =  toNumber(pMessageSpeedList[index + 1].MessageSpeed);
        return messageSpeed;
    }
    // それ以外は最大値
    return messageSpeedMax();
}

/**
 * ●前のメッセージ速度を取得
 */
function preMessageSpeed(value) {
    let messageSpeed = pMessageSpeedList.find(messageSpeed => messageSpeed.MessageSpeed == value);
    const index = pMessageSpeedList.indexOf(messageSpeed);
    // 前の値を取得できれば返す
    if (pMessageSpeedList[index - 1]) {
        messageSpeed =  toNumber(pMessageSpeedList[index - 1].MessageSpeed);
        return messageSpeed;
    }
    // それ以外は最小値
    return messageSpeedMin();
}

/**
 * ●メッセージ速度の項目追加
 */
const _Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
Window_Options.prototype.makeCommandList = function() {
    _Window_Options_makeCommandList.apply(this, arguments);

    this._list.splice(pOptionPosition, 0, { name: pOptionName, symbol: MESSAGE_SPEED_SYMBOL, enabled: true, ext: null});

    // Mano_InputConfig.jsとの競合対処
    if (this._gamepadOptionIndex >= pOptionPosition) {
        this._gamepadOptionIndex++;
    }
    if (this._keyboardConfigIndex >= pOptionPosition) {
        this._keyboardConfigIndex++;
    }
};

/**
 * ●設定値を反映
 */
const _Window_Options_setConfigValue = Window_Options.prototype.setConfigValue;
Window_Options.prototype.setConfigValue = function(symbol, volume) {
    _Window_Options_setConfigValue.apply(this, arguments);

    if (isMessageSpeedSymbol(symbol)) {
        // メッセージ速度を反映
        ConfigManager.messageSpeed = volume;
    }
};

/**
 * ●メッセージ速度のオプションか？
 */
function isMessageSpeedSymbol(symbol) {
    if (symbol == MESSAGE_SPEED_SYMBOL) {
        return true;
    }
    return false;
}

/**
 * ●コマンド数を加算
 */
const _Scene_Options_maxCommands = Scene_Options.prototype.maxCommands;
Scene_Options.prototype.maxCommands = function() {
    return _Scene_Options_maxCommands.apply(this, arguments) + 1;
};

})();
