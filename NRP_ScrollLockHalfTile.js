//=============================================================================
// NRP_ScrollLockHalfTile.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Lock scrolling when the screen drawing width is halfway across the screen.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/491567097.html
 *
 * @help Lock scrolling when the screen drawing width
 * is halfway across the screen.
 * Specifically, I am assuming an even number of tiles corresponding
 * to the screen width.
 * 
 * For example, if the screen width is 960 pixels,
 * the default 48-pixel tile is equivalent
 * to 20 The default 48-pixel tile is equivalent to 20 tiles.
 * 
 * In this case, if the player is placed in the center of the screen
 * with the scroll type not looping,
 * the leftmost and rightmost tiles are only half visible.
 * 
 * In this situation, if you want to make a map that fits on one screen,
 * you can set the number of horizontal tiles on the map to 21.
 * However, if the player moves left or right,
 * there will be scrolling in the middle of the map.
 * 
 * Therefore, this plugin automatically fixes scrolling.
 * In doing so, the scroll position is also fixed
 * at the center of the screen.
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
 * @ Plugin Parameters
 * @------------------------------------------------------------------
 * 
 * @param HorizontalScrollLock
 * @type boolean
 * @default true
 * @desc Fix horizontal scrolling when conditions are met.
 * 
 * @param VerticalScrollLock
 * @type boolean
 * @default true
 * @desc Fix vertical scrolling when conditions are met.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 画面の描画幅が半端な場合にスクロールを固定。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/491567097.html
 *
 * @help 画面の描画サイズが半端な場合にスクロールを固定します。
 * 具体的には画面幅に対応するタイル数が偶数の場合を想定しています。
 * 
 * 例えば、画面の横幅を９６０ピクセルとした場合、
 * デフォルトの４８ピクセルのタイルでは２０個分に相当します。
 * 
 * この際、スクロールタイプがループしない状態で、
 * プレイヤーキャラクターを画面中央に配置すると、
 * 左端と右端のタイルが半分だけ見えている状況になります。
 * 
 * この状況で、１画面に収まるマップを作りたい場合は
 * マップの横方向のタイル数を２１にすればよいのですが、
 * プレイヤーが左右に移動すると、中途半端なスクロールが発生してしまいます。
 * 
 * そこで、このプラグインでは自動でスクロールを固定します。
 * その際、スクロール位置も画面中央に固定します。
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
 * @param HorizontalScrollLock
 * @text 横スクロールを固定
 * @type boolean
 * @default true
 * @desc 条件を満たした際に横スクロールを固定します。
 * 
 * @param VerticalScrollLock
 * @text 縦スクロールを固定
 * @type boolean
 * @default true
 * @desc 条件を満たした際に縦スクロールを固定します。
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
    return str ? str : def;
}

const PLUGIN_NAME = "NRP_ScrollLockHalfTile";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pHorizontalScrollLock = toBoolean(parameters["HorizontalScrollLock"], false);
const pVerticalScrollLock = toBoolean(parameters["VerticalScrollLock"], false);

// ----------------------------------------------------------------------------
// Game_Map
// ----------------------------------------------------------------------------

/**
 * 【独自】横スクロールのロック条件を満たしているか？
 */
Game_Map.prototype.isHorizontalScrollLock = function() {
    // 横ループではない。
    // かつ、タイル数がちょうど画面に収まる。
    if (pHorizontalScrollLock
            && !this.isLoopHorizontal()
            && Graphics.width / this.tileWidth() + 1 == this.width()) {
        return true;
    }
    return false;
};

/**
 * 【独自】縦スクロールのロック条件を満たしているか？
 */
Game_Map.prototype.isVerticalScrollLock = function() {
    // 縦ループではない。
    // かつ、タイル数がちょうど画面に収まる。
    if (pVerticalScrollLock
            && !this.isLoopVertical()
            && Graphics.height / this.tileHeight() + 1 == this.height()) {
        return true;
    }
    return false;
};

/**
 * ●左スクロール
 */
const _Game_Map_scrollLeft = Game_Map.prototype.scrollLeft;
Game_Map.prototype.scrollLeft = function(distance) {
    if (this.isHorizontalScrollLock()) {
        return;
    }

    _Game_Map_scrollLeft.apply(this, arguments);
};

/**
 * ●右スクロール
 */
const _Game_Map_scrollRight = Game_Map.prototype.scrollRight;
Game_Map.prototype.scrollRight = function(distance) {
    if (this.isHorizontalScrollLock()) {
        return;
    }

    _Game_Map_scrollRight.apply(this, arguments);
};

/**
 * ●下スクロール
 */
const _Game_Map_scrollDown = Game_Map.prototype.scrollDown;
Game_Map.prototype.scrollDown = function(distance) {
    if (this.isVerticalScrollLock()) {
        return;
    }

    _Game_Map_scrollDown.apply(this, arguments);
};

/**
 * ●上スクロール
 */
const _Game_Map_scrollUp = Game_Map.prototype.scrollUp;
Game_Map.prototype.scrollUp = function(distance) {
    if (this.isVerticalScrollLock()) {
        return;
    }

    _Game_Map_scrollUp.apply(this, arguments);
};

/**
 * ●表示位置の設定
 */
const _Game_Map_setDisplayPos = Game_Map.prototype.setDisplayPos;
Game_Map.prototype.setDisplayPos = function(x, y) {
    _Game_Map_setDisplayPos.apply(this, arguments);

    // 中央となるＸ座標を固定
    if (this.isHorizontalScrollLock()) {
        this._displayX = 0.5;
        this._parallaxX = this._displayX;
    }
    // 中央となるＹ座標を固定
    if (this.isVerticalScrollLock()) {
        this._displayY = 0.5;
        this._parallaxY = this._displayY;
    }
};

})();
