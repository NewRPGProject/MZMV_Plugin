//=============================================================================
// NRP_ReturnMenuMask.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.01 Eliminate the seam when closing the menu.
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
 * In addition, if you specify a scene name as a plugin parameter,
 * it can be applied when returning from a scene other than the menu.
 * 
 * ※For example, you can support external message logging plugin.
 * ※This is for somewhat advanced users,
 *   but all you need to do is open the js of the relevant plugin
 *   and find the name of the scene (usually named Scene_XXXX).
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
 * @param MaskFrame
 * @type number
 * @default 1
 * @desc The number of frames to hide the seam when the menu is closed.
 * 
 * @param SceneList
 * @type string[]
 * @default ["Scene_Menu"]
 * @desc List of scenes for mask processing.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.01 メニューを閉じた際の継ぎ目をなくす。
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
 * さらにプラグインパラメータにシーン名を指定すれば、
 * メニュー以外から戻った際にも適応できます。
 * 
 * ※例えば、外部のメッセージログ系プラグインなどに対応できます。
 * ※やや上級者向けですが、該当のプラグインのjsを開いて
 * 　シーン名（普通はScene_XXXXという名称）を見つければＯＫです。
 * 
 * -------------------------------------------------------------------
 * ■利用規約
 * -------------------------------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param MaskFrame
 * @text マスクするフレーム数
 * @type number
 * @default 1
 * @desc メニューを閉じた時の継ぎ目を隠すフレーム数です。
 * 
 * @param SceneList
 * @text シーン名のリスト
 * @type string[]
 * @default ["Scene_Menu"]
 * @desc マスク処理を行うシーンの一覧です。
 */
(function() {
"use strict";

/**
 * ●構造体をJSで扱えるように変換
 */
function parseStruct1(arg) {
    var ret = [];

    JSON.parse(arg).forEach(function(str) {
        ret.push(str);
    });

    return ret;
}
function toNumber(str, def) {
    if (str == undefined || str == "") {
        return def;
    }
    return isNaN(str) ? def : +(str || def);
}

const PLUGIN_NAME = "NRP_ReturnMenuMask";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pMaskFrame = toNumber(parameters["MaskFrame"], 1);
const pSceneList = parseStruct1(parameters["SceneList"]);

/**
 * ●シーン開始時
 */
const _Scene_Map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
    _Scene_Map_start.apply(this, arguments);

    // 前画面のクラス名を取得
    const previousClassName = SceneManager._previousClass.name;
    for (const sceneName of pSceneList) {
        // 前画面のクラス名と一致するなら
        if (previousClassName == sceneName) {
            this.createReturnMask();
            return;
        }
    }
};

/**
 * 【独自】指定シーンから戻った際に元画面をキャプチャーした画像でマスク
 */
Scene_Map.prototype.createReturnMask = function() {
    this._returnMaskSprite = new Sprite();
    this._returnMaskSprite.bitmap = SceneManager.backgroundBitmap();
    this.addChild(this._returnMaskSprite);
    this._returnMaskSprite.opacity = 255;
    this._returnMaskSprite.count = 0;
};

/**
 * ●更新
 */
const _Scene_Map_update = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _Scene_Map_update.apply(this, arguments);

    // マスクが存在する場合
    if (this._returnMaskSprite) {
        this._returnMaskSprite.count++;
        // 指定のカウント数が過ぎれば削除
        if (this._returnMaskSprite.count >= pMaskFrame) {
            this.removeChild(this._returnMaskSprite);
        }
    }
}

})();
