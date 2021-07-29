//=============================================================================
// NRP_TransferCommonEvent.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Call common events before and after the Transfer Player.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/482680388.html
 *
 * @help Call common events before and after the Transfer Player.
 * 
 * This is useful, for example,
 * for creating your own fade-out/fade-in process.
 * Of course, it is also useful if you want to set up a common process
 * after the Transfer Player.
 * 
 * [Usage]
 * Set the plugin parameter to the common event you want to call.
 * Once set, it will be enabled for any Transfer Player.
 * 
 * You can also force the fade type to change via the plug-in command.
 * For example, if you add your own fade process in the middle of production,
 * you will have to waste a wait if the default fade is still 'Black'.
 * In such a case, you can change the fade to "None"
 * in the "BeforeCommonEvent".
 * 
 * Alternatively, you may want to revert to normal fade processing.
 * In that case, too, you can use a switch or
 * something just before the Transfer Player
 * to switch within the "BeforeCommonEvent".
 * 
 * [Plugin Command (MZ)]
 * ◆ChangeTransferInfo
 * You can change the fade-in type.
 * Specify it in BeforeCommonEvent, etc.
 * Note that once transferred, the setting will be cleared.
 * 
 * [Plugin Command (MV)]
 * ※No distinction is made between individual capital letters. Also, do not include [].
 * 
 * ◆ChangeTransferInfo
 * NRP.TransferCommonEvent.ChangeTransferInfo [Fade Type]
 * 
 * Specify the fade type as a number.
 * 0 = Black, 1 = white, 2 = None
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 * 
 * @command ChangeTransferInfo
 * @desc Change the information about Transfer Player.
 * 
 * @arg FadeType
 * @desc Change the fade type.
 * @type select
 * @option Black @value 0
 * @option White @value 1
 * @option None @value 2
 * 
 * 
 * @param BeforeCommonEvent
 * @type common_event
 * @desc A common event to be executed before the transfer.
 * To be precise, it will be executed before the default fade-out.
 * 
 * @param AfterCommonEvent
 * @type common_event
 * @desc A common event to be executed after the transfer.
 * To be precise, it will be executed before the default fade-in.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 場所移動前後にコモンイベントを実行
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/482680388.html
 *
 * @help 場所移動前後にコモンイベントを実行します。
 * 
 * 例えば、独自のフェードアウト／フェードイン処理の作成などに便利です。
 * もちろん、場所移動後の共通処理を設定したい場合にも有効です。
 * 
 * ■使用方法
 * プラグインパラメータに実行したいコモンイベントを設定してください。
 * 設定すると、あらゆる場所移動に対して有効になります。
 * 
 * また、プラグインコマンドによって、フェード方法を強制的に変更できます。
 * 例えば、制作の途中で独自のフェード処理を追加した場合、
 * デフォルトのフェードが『黒』のままだと無駄なウェイトが発生してしまいます。
 * そういった場合は、移動前コモンイベント内で
 * フェードを『なし』に変更すればＯＫです。
 * 
 * あるいは、通常のフェード処理に戻したいということもあるかもしれません。
 * その場合も、場所移動の直前にスイッチなどを使って、
 * 移動前コモンイベント内で切り替えればＯＫです。
 * 
 * ■プラグインコマンド（ＭＺ）
 * ◆場所移動情報の変更
 * フェードインの方法を変更できます。
 * 移動前コモンイベントなどで指定してください。
 * なお、一度場所移動すると設定はクリアされます。
 * 
 * ■プラグインコマンド（ＭＶ）
 * ※大文字個別は区別しません。また[]は含まないでください。
 * 
 * ◆場所移動情報の変更
 * NRP.TransferCommonEvent.ChangeTransferInfo [フェード方法]
 * 
 * フェード方法を数値で指定してください。
 * 　0 = 黒, 1 = 白, 2 = なし
 * となります。
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @command ChangeTransferInfo
 * @text 場所移動情報の変更
 * @desc 場所移動に関する情報を変更します。
 * 
 * @arg FadeType
 * @text フェード
 * @desc フェード方法を変更します。
 * @type select
 * @option 黒 @value 0
 * @option 白 @value 1
 * @option なし @value 2
 * 
 * 
 * @param BeforeCommonEvent
 * @text 移動前コモンイベント
 * @type common_event
 * @desc 場所移動前に実行するコモンイベントです。
 * 正確にはデフォルトのフェードアウト前に実行されます。
 * 
 * @param AfterCommonEvent
 * @text 移動後コモンイベント
 * @type common_event
 * @desc 場所移動後に実行するコモンイベントです。
 * 正確にはデフォルトのフェードイン後に実行されます。
 */
(function() {
"use strict";

function toNumber(str, def) {
    if (str == "") {
        return def;
    }
    return isFinite(str) ? str : def;
}

const PLUGIN_NAME = "NRP_TransferCommonEvent";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pBeforeCommonEvent = toNumber(parameters["BeforeCommonEvent"]);
const pAfterCommonEvent = toNumber(parameters["AfterCommonEvent"]);

// フェード対応の変更用
let changeFadeType = undefined;

//----------------------------------------
// ＭＺ用プラグインコマンド
//----------------------------------------

// MVには存在しないため、空で定義しておかないとエラーになる。
if (!PluginManager.registerCommand) {
    PluginManager.registerCommand = function() {}
}

/**
 * ●【ＭＺ用プラグインコマンド】場所移動情報の変更
 */
PluginManager.registerCommand(PLUGIN_NAME, "ChangeTransferInfo", function(args) {
    changeFadeType = toNumber(args.FadeType);
});

//----------------------------------------
// ＭＶ用プラグインコマンド
//----------------------------------------

const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);

    // 小文字化してから判定
    const lowerCommand = command.toLowerCase();
    
    /**
     * ●場所移動情報の変更
     */
    if (lowerCommand === "nrp.transfercommonevent.changetransferinfo") {
        changeFadeType = toNumber(args[0]);
    }
};

//----------------------------------------
// 場所移動処理
//----------------------------------------

/**
 * ●コマンド実行
 */
const _Game_Interpreter_executeCommand = Game_Interpreter.prototype.executeCommand;
Game_Interpreter.prototype.executeCommand = function() {
    // 場所移動後
    if (this._transferCommonEventMode == 2) {
        // 場所移動後のコモンイベントを実行
        if (pAfterCommonEvent) {
            this.setupChild($dataCommonEvents[pAfterCommonEvent].list, 0);
            // NRP_CallEvent.jsとの連携用
            this._childInterpreter.setCommonEventId(pBeforeCommonEvent);
        }

        // 処理終了のフラグ
        this._transferCommonEventMode = 0;

        return true;
    }

    const command = this.currentCommand();
    if (command) {
        const methodName = "command" + command.code;

        // 場所移動ならば
        if (methodName == "command201") {
            // 場所移動前
            if (!this._transferCommonEventMode) {
                // 場所移動前のコモンイベントを実行
                if (pBeforeCommonEvent) {
                    this.setupChild($dataCommonEvents[pBeforeCommonEvent].list, 0);
                    // NRP_CallEvent.jsとの連携用
                    this._childInterpreter.setCommonEventId(pBeforeCommonEvent);
                }
                // 次の処理へのフラグ
                this._transferCommonEventMode = 1;

                return true;

            // 場所移動処理実行
            } else if (this._transferCommonEventMode == 1) {
                // 次の処理へのフラグ
                this._transferCommonEventMode = 2;
            }
        }
    }

    return _Game_Interpreter_executeCommand.apply(this, arguments);
};

/**
 * ●場所移動（イベントコマンド）
 * ※MVとMZで引数が異なるので制御
 */
// MVの場合
if (Utils.RPGMAKER_NAME == "MV") {
    const _Game_Interpreter_command201 = Game_Interpreter.prototype.command201;
    Game_Interpreter.prototype.command201 = function() {
        // フェードタイプの変更が指定されている場合
        if (changeFadeType !== undefined) {
            this._params[5] = changeFadeType;
            changeFadeType = undefined;
        }

        return _Game_Interpreter_command201.call(this);
    };

// MZの場合
} else {
    const _Game_Interpreter_command201 = Game_Interpreter.prototype.command201;
    Game_Interpreter.prototype.command201 = function(params) {
        // フェードタイプの変更が指定されている場合
        if (changeFadeType !== undefined) {
            params[5] = changeFadeType;
            changeFadeType = undefined;
        }

        return _Game_Interpreter_command201.call(this, params);
    };
}

/**
 * 【独自】コモンイベントＩＤを設定する。
 * ※NRP_CallEvent.jsとの連携用
 */
Game_Interpreter.prototype.setCommonEventId = function(commonEventId) {
    this._commonEventId = commonEventId;
};

})();
