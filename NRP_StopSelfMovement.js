//=============================================================================
// NRP_StopSelfMovement.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Stops the self-movement during event execution.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/486149145.html
 *
 * @help Stops self-movement for each event during event execution.
 * 
 * If an event is running in parallel, it is not eligible.
 * However, only message display processing is exceptionally eligible.
 * 
 * This function is equivalent to
 * the existing "StopSelfMovementWithPlayer.js",
 * but addresses the problem that the load increases dramatically
 * in proportion to the square of the number of events.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Just apply the plugin and it will take effect.
 * 
 * If you want to switch depending on the situation,
 * specify the plugin parameter "StopSwitch".
 * Only when the switch is on,
 * self-movement during event execution will stop.
 * 
 * -------------------------------------------------------------------
 * [Note of Events]
 * -------------------------------------------------------------------
 * <ForceSelfMovement>
 * Forces self-movement to be performed regardless of the situation.
 * This is applicable, for example, to objects that are animated
 * by self-movement and would feel uncomfortable
 * if stopped during an event.
 * 
 * -------------------------------------------------------------------
 * [Reference]
 * -------------------------------------------------------------------
 * The following plugin was used as references
 * in the creation of this plugin.
 * 
 * StopSelfMovementWithPlayer.js (Sasuke KANNAZUKI)
 * https://forum.tkool.jp/index.php?threads/189/
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
 * @------------------------------------------------------------------
 * @ [Plugin Parameters]
 * @------------------------------------------------------------------
 * 
 * @param StopSwitch
 * @type switch
 * @desc Switch to stop self-movement during event execution.
 * Always enabled if not specified.
 * 
 * @param StopParallelMessage
 * @type boolean
 * @default true
 * @desc Self-movement is also stopped during message display by parallel processing.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 イベント実行中の自律移動を停止します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/486149145.html
 *
 * @help イベント実行中に、各イベントの自律移動を停止します。
 * 
 * 並列処理でイベントが実行されている場合は、対象外となります。
 * ただし、メッセージ表示処理のみ例外的に対象となります。
 * 
 * 既存の『StopSelfMovementWithPlayer.js』と同等の機能ですが、
 * イベント数の二乗に比例して負荷が激増する問題に対処しています。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * プラグインを適用するだけで有効になります。
 * 
 * 状況によって切り替えたい場合は、
 * プラグインパラメータの『停止スイッチ』を指定してください。
 * スイッチがオンの場合のみ、イベント実行中の自律移動が停止します。
 * 
 * -------------------------------------------------------------------
 * ■イベントのメモ欄
 * -------------------------------------------------------------------
 * <ForceSelfMovement>
 * 状況に関わらず、強制的に自律移動を実行させます。
 * 例えば、自律移動でアニメーションさせているオブジェクトなど、
 * イベント中に停止しては違和感があるものに活用できます。
 * 
 * -------------------------------------------------------------------
 * ■参考
 * -------------------------------------------------------------------
 * このプラグインの制作に当たって、
 * 以下のプラグインを参考にさせていただきました。
 * 
 * StopSelfMovementWithPlayer.js（神無月サスケ様）
 * https://forum.tkool.jp/index.php?threads/189/
 * 
 * -------------------------------------------------------------------
 * ■利用規約
 * -------------------------------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @------------------------------------------------------------------
 * @ プラグインパラメータ
 * @------------------------------------------------------------------
 * 
 * @param StopSwitch
 * @text 停止スイッチ
 * @type switch
 * @desc イベント実行中の自律移動を停止するスイッチです。
 * 未指定の場合は常に有効とします。
 * 
 * @param StopParallelMessage
 * @text 並列メッセージ中も停止
 * @type boolean
 * @default true
 * @desc 並列処理によるメッセージ表示中も自律移動を停止します。
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

const PLUGIN_NAME = "NRP_StopSelfMovement";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pStopSwitch = toNumber(parameters["StopSwitch"]);
const pStopParallelMessage = toBoolean(parameters["StopParallelMessage"], true);

// イベントを停止するかどうかの判定
let mIsEventsStop = false;

// ----------------------------------------------------------------------------
// Game_Map
// ----------------------------------------------------------------------------

/**
 * ●イベントの更新
 */
const _Game_Map_updateEvents = Game_Map.prototype.updateEvents;
Game_Map.prototype.updateEvents = function() {
    // 動作軽量化のため判定は一度だけ
    // ※特に$gameMap.isEventRunning()は非常に重いので毎回実行しない。
    mIsEventsStop = isStop();

    _Game_Map_updateEvents.apply(this, arguments);
};

// ----------------------------------------------------------------------------
// Game_Event
// ----------------------------------------------------------------------------

/**
 * ●初期化
 */
const _Game_Event_initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function(mapId, eventId) {
    _Game_Event_initialize.apply(this, arguments);

    // 強制実行フラグ
    this._forceSelfMovement = this.event().meta.ForceSelfMovement;
};

/**
 * ●自律移動更新
 */
const _Game_Event_updateSelfMovement = Game_Event.prototype.updateSelfMovement;
Game_Event.prototype.updateSelfMovement = function() {
    // 停止条件を満たしている。
    // かつ、イベントが強制実行状態ではない。
    if (mIsEventsStop && !this._forceSelfMovement) {
        return;
    }
    _Game_Event_updateSelfMovement.apply(this, arguments);
};

// ----------------------------------------------------------------------------
// 共通関数
// ----------------------------------------------------------------------------

/**
 * ●停止判定
 */
function isStop() {
    // イベント実行中またはメッセージ表示中の場合が対象
    if ($gameMap.isEventRunning() || isMessage()) {
        // 停止スイッチが未指定、または停止スイッチを満たしている。
        return !pStopSwitch || $gameSwitches.value(pStopSwitch);
    }
}

/**
 * ●メッセージ表示中かつ停止処理を行うかどうか？
 */
function isMessage() {
    // メッセージウィンドウが開かれているかどうか？
    return pStopParallelMessage && SceneManager._scene._messageWindow.isOpen();
}

})();
