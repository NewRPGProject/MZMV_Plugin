//=============================================================================
// NRP_EventNearScreen.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.01 Allow self-movement of off-screen events.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/483887712.html
 *
 * @help Normally, the behavior set for event self-movement is designed
 * to stop when the event's position is some distance off the screen.
 * 
 * While this specification is useful for reducing processing,
 * it can be troublesome in some cases.
 * For example, if you want to match the timing of multiple events,
 * or if you want to create an event that works off-screen.
 * 
 * This plugin allows the self-moving of events
 * to be performed even when they are off-screen.
 * 
 * There are three ways to set it up.
 * Please use the method you prefer.
 * 
 * - Set in the note field in each events.
 * - Temporarily enabled by plugin command.
 * - Always enabled by plugin parameter.
 * 
 * ------------------------------------------
 * [Note of Events]
 * ------------------------------------------
 * <ExceptNearScreen>
 * Always enable self-moving of event.
 * 
 * ------------------------------------------
 * [Plugin Command MZ]
 * ------------------------------------------
 * ◆ExceptNearScreen
 * Enable off-screen self-movement for events.
 * Can also be turned off.
 * This applies to all events.
 * 
 * Settings will remain valid even if you switch screens.
 * However, they will not be transferred to the saved data.
 * 
 * ------------------------------------------
 * [Plugin Command MV]
 * ------------------------------------------
 * ◆NRP.ExceptNearScreen [true/false]
 * The functions are the same as the MZ version.
 * 
 * ------------------------------------------
 * [Terms]
 * ------------------------------------------
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 * 
 * @------------------------------------------------------------------
 * @ Plugin Command
 * @------------------------------------------------------------------
 * 
 * @command ExceptNearScreen
 * @desc Enable off-screen self-movement for events.
 * Can also be turned off.
 * 
 * @arg ExceptNearScreen
 * @desc Enable off-screen self-movement for events.
 * Can also be turned off.
 * @type boolean
 * @default true
 * 
 * @------------------------------------------------------------------
 * @ Plugin Parameters
 * @------------------------------------------------------------------
 * 
 * @param AlwaysSelfMovement
 * @default false
 * @type boolean
 * @desc Always enable self-movement, even for off-screen events.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.01 画面外イベントの自律移動を許可
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/483887712.html
 *
 * @help 通常、イベントの自律移動に設定された動作は、
 * イベントの位置が画面からある程度外れると停止する仕様になっています。
 * 
 * この仕様は処理を軽減するためには有用ですが、
 * 場合によっては困ることがあります。
 * 例えば、複数のイベントで動作タイミングを合わせたい場合や、
 * 画面外でも動作するイベントを作成したい場合です。
 * 
 * このプラグインではイベントの自律移動を
 * 画面外であっても、実行できるようにします。
 * 
 * 設定方法は以下の三通りです。
 * お好きな方法をお使いください。
 * 
 * ・イベント単位でメモ欄に設定
 * ・プラグインコマンドで一時的に有効化
 * ・プラグインパラメータで常に有効化
 * 
 * ------------------------------------------
 * ■イベントのメモ欄
 * ------------------------------------------
 * <ExceptNearScreen>
 * イベントの自律移動を常に有効にします。
 * 
 * ------------------------------------------
 * ■プラグインコマンド（ＭＺ）
 * ------------------------------------------
 * ◆画面外の自律移動
 * イベントに対して画面外の自律移動を有効にします。
 * オフにすることも可能です。
 * 全てのイベントが対象となります。
 * 
 * 設定は画面を切り替えても有効なままです。
 * ただし、セーブデータには引き継がれません。
 * 
 * ------------------------------------------
 * ■プラグインコマンド（ＭＶ）
 * ------------------------------------------
 * ◆NRP.ExceptNearScreen [true/false]
 * 機能はＭＺ版と同じです。
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @------------------------------------------------------------------
 * @ プラグインコマンド
 * @------------------------------------------------------------------
 * 
 * @command ExceptNearScreen
 * @text 画面外の自律移動
 * @desc イベントに対して画面外の自律移動を有効にします。
 * オフにすることも可能です。
 * 
 * @arg ExceptNearScreen
 * @text 画面外の自律移動
 * @desc イベントに対して画面外の自律移動を有効にします。
 * オフにすることも可能です。
 * @type boolean
 * @default true
 * 
 * @------------------------------------------------------------------
 * @ プラグインパラメータ
 * @------------------------------------------------------------------
 * 
 * @param AlwaysSelfMovement
 * @text 常に自律移動を有効
 * @default false
 * @type boolean
 * @desc 画面外のイベントに対しても常に自律移動を有効にします。
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

const PLUGIN_NAME = "NRP_EventNearScreen";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pAlwaysSelfMovement = toBoolean(parameters["AlwaysSelfMovement"], false);

//----------------------------------------
// ＭＺ用プラグインコマンド
//----------------------------------------

// MVには存在しないため、空で定義しておかないとエラーになる。
if (!PluginManager.registerCommand) {
    PluginManager.registerCommand = function() {}
}

/**
 * ●【ＭＺ用プラグインコマンド】対象キャラクターの変更
 */
PluginManager.registerCommand(PLUGIN_NAME, "ExceptNearScreen", function(args) {
    const exceptNearScreen = toBoolean(args.ExceptNearScreen);
    $gameTemp._isExceptNearScreen = exceptNearScreen;
});

//----------------------------------------
// ＭＶ用プラグインコマンド
//----------------------------------------

const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);

    // 小文字化してから判定
    const lowerCommand = command.toLowerCase();
    if (lowerCommand === "nrp.exceptnearscreen") {
        const exceptNearScreen = toBoolean(args[0]);
        $gameTemp._isExceptNearScreen = exceptNearScreen;
    }
};

//----------------------------------------
// Game_Temp
//----------------------------------------

/**
 * ●変数初期化
 */
const _Game_Temp_initialize = Game_Temp.prototype.initialize;
Game_Temp.prototype.initialize = function() {
    _Game_Temp_initialize.apply(this, arguments);

    this._isExceptNearScreen = pAlwaysSelfMovement;
};

/**
 * 【独自】常に自律移動を有効とするかどうか？
 */
Game_Temp.prototype.isExceptNearScreen = function() {
    return this._isExceptNearScreen;
};

//----------------------------------------
// Game_Event
//----------------------------------------

const _Game_Event_initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function(mapId, eventId) {
    _Game_Event_initialize.apply(this, arguments);

    let exceptNearScreen = this.event().meta.ExceptNearScreen;

    // イベント個別の設定が存在する場合
    if (exceptNearScreen != undefined) {
        exceptNearScreen = toBoolean(exceptNearScreen);
        if (exceptNearScreen === true) {
            this._exceptNearScreen = true;
        } else if (exceptNearScreen === false) {
            this._exceptNearScreen = false;
        }
    }
};

/**
 * ●イベントが画面近辺かどうかの判定
 * ※Game_CharacterBase.prototype.isNearTheScreenのオーバーライド
 */
const _Game_Event_isNearTheScreen = Game_Event.prototype.isNearTheScreen;
Game_Event.prototype.isNearTheScreen = function() {
    // イベント個別の設定が存在する場合
    if (this._exceptNearScreen === true) {
        return true;

    // falseの場合、常に除外の場合でも判定実行
    } else if (this._exceptNearScreen === false) {
        return _Game_Event_isNearTheScreen.apply(this, arguments);
    }

    // 除外設定がされている場合、常に画面内として判定
    if ($gameTemp.isExceptNearScreen()) {
        return true;
    }

    return _Game_Event_isNearTheScreen.apply(this, arguments);
};

})();
