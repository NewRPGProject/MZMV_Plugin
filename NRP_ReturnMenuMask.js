//=============================================================================
// NRP_ReturnMenuMask.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Eliminate the seam when closing the menu.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/484101737.html
 *
 * @help Eliminate the seam when closing the menu.
 * 
 * When using plug-ins such as DynamicAnimation for maps,
 * elements may not be displayed for a moment when the menu screen is closed.
 * This is due to the fact that when you switch scenes from the map screen
 * to the menu screen to the map screen, each element is recreated.
 * 
 * This tends to happen with plugins that rewrite animations or map tiles.
 * 
 * This plugin eliminates the momentary break by covering the screen
 * with a "captured image of the screen just before opening the menu"
 * when the menu is closed.
 * 
 * ------------------------------------------
 * [Usage]
 * ------------------------------------------
 * You can simply apply it.
 * The plugin parameters are also basically fine
 * with the default settings.
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
 * @param MaskFrame
 * @type number
 * @default 1
 * @desc The number of frames to hide the seam when the menu is closed.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 メニューを閉じた際の継ぎ目をなくす。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/484101737.html
 *
 * @help メニューを閉じた際の継ぎ目をなくします。
 * 
 * マップ版DynamicAnimationなどのプラグインを使用している際、
 * メニュー画面を閉じた時に、一瞬要素が表示されないことがあります。
 * これはマップ画面　→　メニュー画面　→　マップ画面と
 * シーンを切り替えた際に、各要素を作り直しているために発生する仕様です。
 * 
 * ※傾向としてはアニメーションやマップタイルを
 * 　書き換えるプラグインで起こりやすいと思われます。
 * 
 * そこでメニュー画面を閉じた際に
 * 「メニューを開く直前の画面のキャプチャ画像」をかぶせることで、
 * 一瞬の切れ目をなくすのがこのプラグインです。
 * 
 * ------------------------------------------
 * ■使用方法
 * ------------------------------------------
 * 適用するだけでＯＫです。
 * プラグインパラメータも基本的には、
 * 初期設定のままで問題ないと思われます。
 * 
 * ------------------------------------------
 * ■利用規約
 * ------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param MaskFrame
 * @text マスクするフレーム数
 * @type number
 * @default 1
 * @desc メニューを閉じた時の継ぎ目を隠すフレーム数です。
 */
(function() {
"use strict";

function toNumber(str, def) {
    if (str == undefined || str == "") {
        return def;
    }
    return isNaN(str) ? def : +(str || def);
}

const PLUGIN_NAME = "NRP_ReturnMenuMask";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pMaskFrame = toNumber(parameters["MaskFrame"], 1);

/**
 * ●シーン開始時
 */
const _Scene_Map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
    _Scene_Map_start.apply(this, arguments);

    // メニューから戻った際
    if (SceneManager.isPreviousScene(Scene_Menu)) {
        this.createReturnMenuMask();
    }
};

/**
 * 【独自】メニューから戻った際に元画面をキャプチャーした画像でマスク
 */
Scene_Map.prototype.createReturnMenuMask = function() {
    this._returnMenuMaskSprite = new Sprite();
    this._returnMenuMaskSprite.bitmap = SceneManager.backgroundBitmap();
    this.addChild(this._returnMenuMaskSprite);
    this._returnMenuMaskSprite.opacity = 255;
    this._returnMenuMaskSprite.count = 0;
};

/**
 * ●更新
 */
const _Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _Scene_Map_update.apply(this, arguments);

    // マスクが存在する場合
    if (this._returnMenuMaskSprite) {
        this._returnMenuMaskSprite.count++;
        // 指定のカウント数が過ぎれば削除
        if (this._returnMenuMaskSprite.count >= pMaskFrame) {
            this.removeChild(this._returnMenuMaskSprite);
        }
    }
}

})();
