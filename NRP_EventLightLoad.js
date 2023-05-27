//=============================================================================
// NRP_EventLightLoad.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v0.9 
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/485838070.html
 *
 * @help 
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * 
 * 
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
 */

/*:ja
 * @target MZ
 * @plugindesc v0.9 イベントの処理を軽量化します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/485838070.html
 *
 * @help 
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * 
 * -------------------------------------------------------------------
 * ■注意点
 * -------------------------------------------------------------------
 * 画面外のイベントの描画処理を停止しているため、
 * 処理の内容によっては想定通りに動作しなくなることもあります。
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
 * @text 画面外の描画停止
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
 * @text イベントの起動情報を保持
 * @type boolean
 * @default true
 * @desc イベントの起動情報を保持し、不要な再取得処理を抑制します。
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
// $gameMap.isEventRunningのキャッシュ化
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
