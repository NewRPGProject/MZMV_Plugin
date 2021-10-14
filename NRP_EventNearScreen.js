//=============================================================================
// NRP_EventNearScreen.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Extends event acceleration feature.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/483801702.html
 *
 * @help Extends event acceleration feature.
 * 
 * RPG Maker MV~MZ has a feature
 * that allows you to double the speed of an event
 * by holding down the decision key while the event is running.
 * I will make some extensions to that feature.
 * 
 * ◆Main features.
 * - Change of keys to be used
 * - Change of execution speed
 * - Change the time to hold down the key before execution
 * - Touch UI side setting can be specified separately.
 * 
 * For example, it is possible to speed up the entire event
 * by combining the key with a message skipping plugin.
 * 
 * ■Acknowledgements
 * This plugin is inspired
 * by FastForwardCustomize.js created by Triacontane.
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 * 
 * @param FastKey
 * @default ok
 * @type select
 * @option ok
 * @option cancel
 * @option shift
 * @option menu
 * @option pageup
 * @option pagedown
 * @option control
 * @option tab
 * @desc The key to perform event acceleration.
 * 
 * @param SpeedMultiply
 * @type number
 * @default 2
 * @desc This is the event speed multiplier for speedup.
 * If 1 or less, the acceleration will be disabled.
 * 
 * @param SpeedVariableId
 * @type variable
 * @desc Variable to set the event acceleration multiplier. If 1 or less, acceleration is disabled. Precedence over SpeedMultiply.
 * 
 * @param PressWait
 * @type number
 * @default 24
 * @desc This is the wait time before starting the acceleration.
 * Specify in units of 1/60th of a second.
 * 
 * @param <Touch>
 * @desc This is the event acceleration setting for touch operations.
 * If not specified, the same settings as above will be used.
 * 
 * @param TouchSpeedMultiply
 * @parent <Touch>
 * @type number
 * @desc This is the event speed multiplier for speedup.
 * If 1 or less, the acceleration will be disabled.
 * 
 * @param TouchSpeedVariableId
 * @parent <Touch>
 * @type variable
 * @desc Variable to set the event acceleration multiplier. If 1 or less, acceleration is disabled. Precedence over SpeedMultiply.
 * 
 * @param TouchPressWait
 * @parent <Touch>
 * @type number
 * @desc This is the wait time before starting the acceleration.
 * Specify in units of 1/60th of a second.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 画面外イベントの自律移動を有効化。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/483801702.html
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
 * ◆画面外の自立移動
 * イベントに対して画面外の自立移動を有効にします。
 * オフにすることも可能です。
 * 全てのイベントが対象となります。
 * 
 * 設定は画面を切り替えても有効なままです。
 * ただし、セーブデータには引き継がれません。
 * 
 * ------------------------------------------
 * ■プラグインコマンド（ＭＶ）
 * ------------------------------------------
 * ◆NRP.ExceptNearScreen [TRUE/FALSE]
 * 機能はＭＺ版と同じです。
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @command ExceptNearScreen
 * @text 画面外の自立移動
 * @desc イベントに対して画面外の自立移動を有効にします。
 * オフにすることも可能です。
 * 
 * @arg ExceptNearScreen
 * @text 画面外の自立移動
 * @desc イベントに対して画面外の自立移動を有効にします。
 * @type boolean
 * @default true
 * 
 * 
 * 
 * @param AlwaysSelfMovement
 * @text 常に自立移動を有効
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
