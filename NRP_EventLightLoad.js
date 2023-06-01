//=============================================================================
// NRP_EventLightLoad.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Lightweight event processing.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/499543048.html
 *
 * @help The following actions will lighten the processing of events
 * 
 * 1. Stop Draw Out of Screen
 * Reduces the load by stopping unnecessary
 * drawing processing for off-screen events.
 * 
 * 2. Cache Event Running
 * Cache the process of checking the running status of events,
 * so that it is executed only once every 1/60th of a second.
 * This can be especially effective when used in conjunction
 * with StopSelfMovementWithPlayer.js, etc.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Just apply and it will take effect.
 * 
 * Each feature has been verified to not cause problems
 * in the author's environment,
 * but can be turned on or off in case problems arise.
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
 * @param StopDrawOutOfScreen
 * @type boolean
 * @default true
 * @desc Stops the drawing process for off-screen events.
 * 
 * @param OutOfScreenMargin
 * @parent StopDrawOutOfScreen
 * @type number
 * @default 100
 * @desc The margin width (in pixels) that is considered off-screen.
 * 
 * @param CacheEventRunning
 * @type boolean
 * @default true
 * @desc Caches the running status of events and suppresses unnecessary reacquisition processing.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 イベントの処理を軽量化します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/499543048.html
 *
 * @help 以下の対応によってイベントの処理を軽量化します。
 * 
 * １．画面外のイベント描画停止
 * 画面外のイベントに対する不要な描画処理を
 * 停止することで負荷を軽減します。
 * 
 * ２．起動状況をキャッシュ
 * イベントの起動状況の確認処理をキャッシュし、
 * 1/60秒に一度のみに限定して実行するようにします。
 * 特にStopSelfMovementWithPlayer.jsなどとの
 * 併用時は大きな効果が見込めます。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * 適用するだけで有効になります。
 * 
 * 各機能は作者環境で問題が起きないことを確認していますが、
 * 問題が起きた時のためにオンオフできるようにしています。
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
 * @param StopDrawOutOfScreen
 * @text 画面外のイベント描画停止
 * @type boolean
 * @default true
 * @desc 画面外のイベントの描画処理を停止します。
 * 
 * @param OutOfScreenMargin
 * @parent StopDrawOutOfScreen
 * @text 画面外の余裕幅
 * @type number
 * @default 100
 * @desc 画面外と見なす余裕の幅（ピクセル）です。
 * 数値分だけ画面外にはみ出していても停止しません。
 * 
 * @param CacheEventRunning
 * @text 起動状況をキャッシュ
 * @type boolean
 * @default true
 * @desc イベントの起動状況をキャッシュし、不要な再取得処理を抑制します。
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

const PLUGIN_NAME = "NRP_EventLightLoad";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pStopDrawOutOfScreen = toBoolean(parameters["StopDrawOutOfScreen"], false);
const pOutOfScreenMargin = toNumber(parameters["OutOfScreenMargin"], 0);
const pCacheEventRunning = toBoolean(parameters["CacheEventRunning"], false);

// ----------------------------------------------------------------------------
// 画面外イベントの描画停止
// ----------------------------------------------------------------------------
if (pStopDrawOutOfScreen) {
    const _Sprite_Character_update = Sprite_Character.prototype.update;
    Sprite_Character.prototype.update = function() {
        // 移動命令中は除外、画面外なら最小限の情報だけを更新
        if (!this._character.isMoveRouteForcing() && isOutOfScreenSprite(this)) {
            this.setFrame(0, 0, 0, 0);
            this.updatePosition();
            return;
        }

        _Sprite_Character_update.apply(this, arguments);
    };

    /**
     * ●スプライトの位置が画面内かどうか？
     */
    function isOutOfScreenSprite(sprite) {
        const x = sprite.x;
        const y = sprite.y;

        // 画像の幅を考慮
        let halfWidth = 0;
        let height = 0;
        if (sprite.bitmap) {
            halfWidth = sprite.bitmap.width / 2 * sprite.scale.x;
            height = sprite.bitmap.height * sprite.scale.y;
        }

        // Ｘ座標は中央、Ｙ座標は足元が基準なのでそこも考慮
        // ズームアウト処理も考慮
        if (x + halfWidth + pOutOfScreenMargin < 0
            || x - halfWidth - pOutOfScreenMargin > (Graphics.width / $gameScreen.zoomScale())
            || y + pOutOfScreenMargin < 0
            || y - height - pOutOfScreenMargin > (Graphics.height / $gameScreen.zoomScale())) {
            return true;
        }
        return false;
    }
}

// ----------------------------------------------------------------------------
// 起動状況をキャッシュ
// ※$gameMap.isEventRunningのキャッシュ化
// ----------------------------------------------------------------------------
if (pCacheEventRunning) {
    // イベントの実行判定
    let mIsEventRunning = null;

    /**
     * ●更新
     */
    const _Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function() {
        // 毎フレームクリア
        mIsEventRunning = null;

        _Scene_Map_update.apply(this, arguments);
    };

    /**
     * ●イベントの実行判定
     */
    const _Game_Map_isEventRunning = Game_Map.prototype.isEventRunning;
    Game_Map.prototype.isEventRunning = function() {
        // 最初の１回だけ実行する。
        if (mIsEventRunning === null) {
            mIsEventRunning = _Game_Map_isEventRunning.apply(this, arguments);
        }
        return mIsEventRunning;
    };
}

})();
