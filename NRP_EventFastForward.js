//=============================================================================
// NRP_EventFastForward.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.02 Extends event acceleration feature.
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
 * - Faster sprite processing (animations, balloons, etc.)
 * - Change of keys to be used
 * - Change of execution speed
 * - Change the time to hold down the key before execution
 * - Touch UI side setting can be specified separately.
 * 
 * For example, it is possible to speed up the entire event
 * by combining the key with a message skipping plugin.
 * 
 * -------------------------------------------------------------------
 * [Acknowledgements]
 * -------------------------------------------------------------------
 * This plugin is inspired
 * by FastForwardCustomize.js created by Triacontane.
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
 * @param FastSprite
 * @type boolean
 * @default false
 * @desc Speeds up sprite drawing.
 * Animations, balloons, etc. are also accelerated.
 * 
 * @param NotCancelMessageWait
 * @type boolean
 * @default false
 * @desc Do not disable message wait when speeding up.
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
 * @plugindesc v1.02 イベント高速化機能を拡張します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/483801702.html
 *
 * @help イベント高速化機能を拡張します。
 * 
 * ツクールＭＶ～ＭＺにはイベント実行中に、
 * 決定キーを押しっぱなしにすると動作が倍速化する機能があります。
 * その機能に対していくつかの拡張を行います。
 * 
 * ◆主な機能
 * ・描画処理（アニメーション、フキダシなど）の高速化
 * ・使用するキーの変更
 * ・実行速度の変更
 * ・実行までの押しっぱなし時間の変更
 * ・タッチＵＩ側の設定も別途指定可
 * 
 * 例えば、メッセージスキップ系のプラグインとキーを合わせることで、
 * イベント全体を高速化することも可能です。
 * 
 * -------------------------------------------------------------------
 * ■謝辞
 * -------------------------------------------------------------------
 * 当プラグインはトリアコンタン様作成の
 * FastForwardCustomize.jsを参考にさせて頂きました。
 * 
 * -------------------------------------------------------------------
 * ■利用規約
 * -------------------------------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param FastKey
 * @text 高速化キー
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
 * @desc イベント高速化を実行するキーです。
 * 
 * @param SpeedMultiply
 * @text 速度倍率
 * @type number
 * @default 2
 * @desc 高速化時のイベント速度の倍率です。
 * 1以下なら高速化は無効になります。
 * 
 * @param SpeedVariableId
 * @text 速度倍率の変数
 * @type variable
 * @desc イベント高速化の倍率を設定する変数です。
 * 値が1以下なら高速化無効。速度倍率より優先されます。
 * 
 * @param PressWait
 * @text 開始プレス時間
 * @type number
 * @default 24
 * @desc 高速化を開始するまでのウェイト時間です。
 * 1/60秒単位で指定してください。
 * 
 * @param FastSprite
 * @text 描画処理を高速化
 * @type boolean
 * @default false
 * @desc 描画処理を高速化します。
 * アニメーションやフキダシなども高速化されます。
 * 
 * @param NotCancelMessageWait
 * @text メッセージウェイトを有効化
 * @type boolean
 * @default false
 * @desc 高速化時にメッセージウェイトを無効化しないようにします。
 * 
 * @param <Touch>
 * @text ＜タッチ関連＞
 * @desc タッチ操作時のイベント高速化設定です。
 * 特に指定しなければ、上記と同じ設定を使用します。
 * 
 * @param TouchSpeedMultiply
 * @parent <Touch>
 * @text 速度倍率（タッチ）
 * @type number
 * @desc 高速化時のイベント速度の倍率です。
 * 1以下なら高速化は無効になります。
 * 
 * @param TouchSpeedVariableId
 * @parent <Touch>
 * @text 速度倍率の変数（タッチ）
 * @type variable
 * @desc イベント高速化の倍率を設定する変数です。
 * 値が1以下なら高速化無効。速度倍率より優先されます。
 * 
 * @param TouchPressWait
 * @parent <Touch>
 * @text 開始プレス時間（タッチ）
 * @type number
 * @desc 高速化を開始するまでの待ち時間です。
 * 1/60秒単位で指定してください。
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

const PLUGIN_NAME = "NRP_EventFastForward";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pFastKey = parameters["FastKey"].toLowerCase();
const pSpeedMultiply = toNumber(parameters["SpeedMultiply"], 2);
const pSpeedVariableId = toNumber(parameters["SpeedVariableId"]);
const pPressWait = toNumber(parameters["PressWait"], 24);
const pFastSprite = toBoolean(parameters["FastSprite"], false);
const pNotCancelMessageWait = toBoolean(parameters["NotCancelMessageWait"], false);
const pTouchSpeedMultiply = toNumber(parameters["TouchSpeedMultiply"], pSpeedMultiply);
const pTouchSpeedVariableId = toNumber(parameters["TouchSpeedVariableId"], pSpeedVariableId);
const pTouchPressWait = toNumber(parameters["TouchPressWait"], pPressWait);

/**
 * ●高速化倍率の調整
 */
const _Scene_Map_updateMainMultiply = Scene_Map.prototype.updateMainMultiply;
Scene_Map.prototype.updateMainMultiply = function() {
    _Scene_Map_updateMainMultiply.apply(this, arguments);
    if (this.isFastForward()) {
        this.updateMainForMoreFast();
    }
};

/**
 * 【独自】高速化倍率に応じてupdateMainを呼び出す。
 */
Scene_Map.prototype.updateMainForMoreFast = function() {
    let updateCount;

    // 通常入力の場合
    if (isLongPressed.bind(Input)(pFastKey)) {
        updateCount = getSpeedMultiply();

    // タッチ操作の場合
    } else if (isTouchLongPressed.bind(TouchInput)()) {
        updateCount = getTouchSpeedMultiply();
    }

    // 既に一度updateMainが呼び出されている想定なので、
    // ２を基準とする。
    updateCount -= 2;

    for (let i = 0; i < updateCount; i++) {
        this.updateMain();

        // スプライトセットも更新
        if (pFastSprite) {
            this._spriteset.update();
        }
    }
};

/**
 * 【上書】イベント高速化の実行中かどうか？
 */
Scene_Map.prototype.isFastForward = function() {
    // イベント実行中ではない。
    // または、シーン変更時は無効。
    if (!$gameMap.isEventRunning() || SceneManager.isSceneChanging()) {
        return false;
    }

    // 通常入力の場合
    if (isLongPressed.bind(Input)(pFastKey)) {
        // 速度倍率が２以上なら有効
        return getSpeedMultiply() >= 2;

    // タッチ操作の場合
    } else if (isTouchLongPressed.bind(TouchInput)()) {
        // 速度倍率が２以上なら有効
        return getTouchSpeedMultiply() >= 2;
    }

    return false;
};

if (pNotCancelMessageWait) {
    /**
     * ●メッセージ待ちを飛ばす
     */
    Scene_Message.prototype.cancelMessageWait = function() {
        // キャンセル処理を無効化する。
        // this._messageWindow.cancelWait();
    };
}

/**
 * ●高速化倍率
 */
function getSpeedMultiply() {
    if (pSpeedVariableId) {
        return $gameVariables.value(pSpeedVariableId);
    }
    return pSpeedMultiply;
};

/**
 * ●高速化倍率（タッチＵＩ）
 */
function getTouchSpeedMultiply() {
    if (pTouchSpeedVariableId) {
        return $gameVariables.value(pTouchSpeedVariableId);
    }
    return pTouchSpeedMultiply;
};

/**
 * ●押しっぱなし判定
 * ※coreのInput.isLongPressedを改造
 * ※Inputを渡して使用
 */
function isLongPressed(keyName) {
    if (this._isEscapeCompatible(keyName) && this.isLongPressed("escape")) {
        return true;
    } else {
        return (
            this._latestButton === keyName &&
            this._pressedTime >= pPressWait
        );
    }
};

/**
 * ●タッチＵＩ用の押しっぱなし判定
 * ※coreのTouchInput.isLongPressedを改造
 * ※TouchInputを渡して使用
 */
function isTouchLongPressed() {
    return this.isPressed() && this._pressedTime >= pTouchPressWait;
};

})();
