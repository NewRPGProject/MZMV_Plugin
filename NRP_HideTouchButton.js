//=============================================================================
// NRP_HideTouchButton.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.00 Hide buttons and areas for touch UI.
 * @author Takeshi Sunagawa (https://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/502758965.html
 *
 * @help Hide buttons and areas for touch UI.
 * 
 * In RPG Maker MZ, buttons for touch UI are displayed as standard
 * and can be used with mouse or phone controls.
 * 
 * If you plan to publish your work for smartphones,
 * this feature is useful, but otherwise there are several problems.
 * 
 * - If keyboard or gamepad operation is assumed, it will get in the way.
 * - The touch UI can be turned off in the options,
 *   but it leaves an unnatural blank space.
 * - If mouse operation is assumed, the cancel button is unnecessary
 *   because it can be substituted by right-clicking.
 * 　※However, a page switching button might be useful?
 * - On the other hand, if the touch UI is turned off,
 *   numerical input (including shop) and its confirmation
 *   will not be possible at all, even with the mouse.
 * 
 * Fine-tuning addresses those issues.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * By default, the Cancel, Page Switch, and Menu buttons will be hidden,
 * and the margins for them will not be displayed.
 * On the other hand, the buttons for numeric input can be used
 * without any problem as they are.
 * The touch UI items on the options screen will also be hidden
 * as they are no longer needed.
 * 
 * If you wish to leave the page switching button in place
 * in anticipation of mouse operation,
 * you can leave it displayed or adjust its position.
 * However, it may be a bit difficult to handle with just this plugin.
 * 
 * -------------------------------------------------------------------
 * [Notice]
 * -------------------------------------------------------------------
 * The optional touch UI is forced on to prevent accidents
 * when applied to save data in progress.
 * 
 * The purpose of this plugin is not to disable the touch UI,
 * but to preserve the minimum necessary functionality,
 * so it is not good if it is turned off.
 * 
 * Also, when "HideOption" is turned on, be careful not to duplicate
 * a similar function with another plugin (CustomizeConfigDefault.js).
 * The number of lines displayed for options may be out of order.
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
 * @-----------------------------------------------------
 * @ [Plugin Parameters]
 * @-----------------------------------------------------
 * 
 * @param HideCancelButton
 * @type boolean
 * @default true
 * @desc Hide the Cancel button.
 * 
 * @param HidePageButton
 * @type boolean
 * @default true
 * @desc Hide the page switching (actor switching) button.
 * 
 * @param HideMenuButton
 * @type boolean
 * @default true
 * @desc Hide the menu call button.
 * 
 * @param HideNumberButton
 * @type boolean
 * @default false
 * @desc Hides the numeric input buttons.
 * It is recommended to leave them off as they are.
 * 
 * @param HideTouchArea
 * @type boolean
 * @default true
 * @desc Hides the area for the touch UI, eliminating extra white space.
 * 
 * @param HideOption
 * @type boolean
 * @default true
 * @desc Remove touch UI from option items.
 * 
 * @param OptionForceOn
 * @type boolean
 * @default true
 * @desc Force on touch UI for optional items. Prevents accidents caused by applying during the process.
 * 
 * @param PageButtonAdjustX
 * @type number @min -999 @max 999
 * @default 0
 * @desc Adjust the X coordinate of the page switching button.
 * 
 * @param PageButtonAdjustY
 * @type number @min -999 @max 999
 * @default 0
 * @desc Adjust the Y coordinate of the page switching button.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.00 タッチＵＩ用ボタンと領域を非表示にする。
 * @author 砂川赳（https://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/502758965.html
 *
 * @help タッチＵＩ用ボタンと領域を非表示にします。
 * 
 * ＲＰＧツクールＭＺでは、タッチＵＩ用のボタンが標準で表示され、
 * マウスやスマホの操作で使用できるようになっています。
 * 
 * 作品をスマホ向けに公開する予定なら、この機能は便利ですが、
 * それ以外ではいくつかの問題があります。
 * 
 * ・キーボードやゲームパッドの操作を前提とするなら邪魔になる。
 * ・オプションでタッチＵＩをオフにできるが、不自然な空白が残ってしまう。
 * ・マウス操作を前提とするなら、
 * 　右クリックで代用できるためキャンセルボタンは不要。
 * 　※ただし、ページ切替（アクター切替）ボタンはあると便利かも？
 * ・一方でタッチＵＩをオフにした場合は、
 * 　数値入力（ショップ含む）とその確定がマウスでも一切できなくなってしまう。
 * 
 * 細かい調整によって、それらの問題に対処します。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * 初期設定でキャンセルボタン、ページ切替（アクター切替）ボタン、
 * メニューボタンが非表示になり、その分の余白も表示されなくなります。
 * 一方で数値入力用のボタンはそのまま問題なく使えます。
 * 不要となるため、オプション画面のタッチＵＩ項目も非表示になります。
 * 
 * もし、マウス操作を想定してページ切替ボタンを残しておきたい場合は、
 * 表示を残したり、位置調整することもできます。
 * ただし、このプラグインだけで対応するのはちょっと大変かもしれません。
 * 
 * -------------------------------------------------------------------
 * ■注意点
 * -------------------------------------------------------------------
 * 途中セーブデータに適用した際の事故防止のため、
 * オプションのタッチＵＩは強制的にオンとなります。
 * 
 * 当プラグインの目的はタッチＵＩを無効にするのではなく、
 * 必要最低限の機能を残すことなので、オフでは困るためです。
 * 
 * また『オプションから削除』をオンにする場合、
 * 同様の機能を他のプラグイン（CustomizeConfigDefault.js）と
 * 重複してやらないように注意してください。
 * オプションの表示行数が狂ってしまう可能性があります。
 * 
 * -------------------------------------------------------------------
 * ■利用規約
 * -------------------------------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @-----------------------------------------------------
 * @ プラグインパラメータ
 * @-----------------------------------------------------
 * 
 * @param HideCancelButton
 * @text キャンセルを非表示
 * @type boolean
 * @default true
 * @desc キャンセルボタンを非表示にします。
 * 
 * @param HidePageButton
 * @text ページ切替を非表示
 * @type boolean
 * @default true
 * @desc ページ切替（アクター切替）ボタンを非表示にします。
 * 
 * @param HideMenuButton
 * @text メニュー呼出を非表示
 * @type boolean
 * @default true
 * @desc メニュー呼出ボタンを非表示にします。
 * 
 * @param HideNumberButton
 * @text 数値入力を非表示
 * @type boolean
 * @default false
 * @desc 数値入力ボタンを非表示にします。
 * そのままオフにしておくことを推奨します。
 * 
 * @param HideTouchArea
 * @text タッチ領域を非表示
 * @type boolean
 * @default true
 * @desc タッチＵＩ用の領域を非表示にし、余分な空白をなくします。
 * 
 * @param HideOption
 * @text オプションから削除
 * @type boolean
 * @default true
 * @desc オプション項目からタッチＵＩを削除します。
 * 
 * @param OptionForceOn
 * @text オプションを強制オン
 * @type boolean
 * @default true
 * @desc オプション項目のタッチＵＩを強制的にオンにしておきます。途中適用による事故防止用の項目です。
 * 
 * @param PageButtonAdjustX
 * @text ページボタンのＸ座標調整
 * @type number @min -999 @max 999
 * @default 0
 * @desc ページ切替ボタンのＸ座標を調整します。
 * 
 * @param PageButtonAdjustY
 * @text ページボタンのＹ座標調整
 * @type number @min -999 @max 999
 * @default 0
 * @desc ページ切替ボタンのＹ座標を調整します。
 */
(function() {
"use strict";

function toNumber(str, def) {
    if (str == undefined || str == "") {
        return def;
    }
    return isNaN(str) ? def : +(str || def);
}
function toBoolean(str, def) {
    if (str === true || str === "true") {
        return true;
    } else if (str === false || str === "false") {
        return false;
    }
    return def;
}
function setDefault(str, def) {
    if (str == undefined || str == "") {
        return def;
    }
    return str;
}

const PLUGIN_NAME = "NRP_HideTouchButton";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pHideCancelButton = toBoolean(parameters["HideCancelButton"], false);
const pHidePageButton = toBoolean(parameters["HidePageButton"], false);
const pHideMenuButton = toBoolean(parameters["HideMenuButton"], false);
const pHideNumberButton = toBoolean(parameters["HideNumberButton"], false);
const pHideTouchArea = toBoolean(parameters["HideTouchArea"], false);
const pHideOption = toBoolean(parameters["HideOption"], false);
const pOptionForceOn = toBoolean(parameters["OptionForceOn"], false);
const pPageButtonAdjustX = toNumber(parameters["PageButtonAdjustX"], 0);
const pPageButtonAdjustY = toNumber(parameters["PageButtonAdjustY"], 0);

// ----------------------------------------------------------------------------
// Scene_Base
// ----------------------------------------------------------------------------

if (pHideTouchArea) {
    /**
     * 【上書】タッチＵＩ領域を消去
     */
    Scene_Base.prototype.buttonAreaHeight = function() {
        return 0;
    };
}

// ----------------------------------------------------------------------------
// Sprite_Button
// ※汎用性を考慮し、SceneやWindowsではなくこちらで制御する。
// ----------------------------------------------------------------------------

/**
 * ●ボタンの生成
 */
const _Sprite_Button_setupFrames = Sprite_Button.prototype.setupFrames;
Sprite_Button.prototype.setupFrames = function() {
    // cancel:キャンセルボタン
    // pageup:前のアクター
    // pagedown:次のアクター
    // 
    // down:数値１減らす
    // up:数値１増やす
    // down2:数値１０減らす
    // up2:数値１０増やす
    // ok:数値の確定
    // 
    // menu:メニューの表示

    const hideButtonTypes = [];

    // キャンセルボタン非表示
    if (pHideCancelButton) {
        hideButtonTypes.push("cancel");
    }

    // ページ切替ボタン非表示
    if (pHidePageButton) {
        hideButtonTypes.push("pageup");
        hideButtonTypes.push("pagedown");
    }

    // メニューボタン非表示
    if (pHideMenuButton) {
        hideButtonTypes.push("menu");
    }

    // 数値入力ボタン非表示
    if (pHideNumberButton) {
        hideButtonTypes.push("down");
        hideButtonTypes.push("up");
        hideButtonTypes.push("down2");
        hideButtonTypes.push("up2");
        hideButtonTypes.push("ok");
    }

    // 無効なボタンの場合はボタンタイプをnullで上書きする。
    if (hideButtonTypes.includes(this._buttonType)) {
        this._buttonType = null;
    }

    _Sprite_Button_setupFrames.apply(this, arguments);
};

/**
 * ●ボタンの配置と幅の設定
 */
const _Sprite_Button_buttonData = Sprite_Button.prototype.buttonData;
Sprite_Button.prototype.buttonData = function() {
    // ボタンタイプがnullの場合は幅を0に。
    if (!this._buttonType) {
        return { x: 0, w: 0};
    }
    return _Sprite_Button_buttonData.apply(this, arguments);
};

/**
 * ●ボタン更新
 */
const _Sprite_Button_update = Sprite_Button.prototype.update;
Sprite_Button.prototype.update = function() {
    // ボタンタイプがnullの場合は制御しない。
    if (!this._buttonType) {
        return;
    }
    _Sprite_Button_update.apply(this, arguments);
};

// ----------------------------------------------------------------------------
// Scene_MenuBase
// ----------------------------------------------------------------------------

/**
 * ●ページボタンの生成
 */
const _Scene_MenuBase_createPageButtons = Scene_MenuBase.prototype.createPageButtons;
Scene_MenuBase.prototype.createPageButtons = function() {
    _Scene_MenuBase_createPageButtons.apply(this, arguments);

    // 座標調整
    this._pageupButton.x += pPageButtonAdjustX;
    this._pageupButton.y += pPageButtonAdjustY;
    this._pagedownButton.x += pPageButtonAdjustX;
    this._pagedownButton.y += pPageButtonAdjustY;
};

// ----------------------------------------------------------------------------
// オプションの設定
// ----------------------------------------------------------------------------

if (pHideOption) {
    /**
     * ●オプション項目の登録
     */
    const _Window_Options_addGeneralOptions = Window_Options.prototype.addGeneralOptions;
    Window_Options.prototype.addGeneralOptions = function() {
        _Window_Options_addGeneralOptions.apply(this, arguments);

        // タッチＵＩを除去する。
        for (let i = 0; i < this._list.length; i++) {
            if (this._list[i].symbol === "touchUI") {
                this._list.splice(i, 1);
                break;
            }
        }
    };

    /**
     * ●最大コマンド数
     */
    const _Scene_Options_maxCommands = Scene_Options.prototype.maxCommands;
    Scene_Options.prototype.maxCommands = function() {
        // コマンド数を-1する。
        return _Scene_Options_maxCommands.apply(this, arguments) - 1;
    };
}

/**
 * ●途中適用による事故防止のため、タッチＵＩを強制的にオンにしておく。
 */
if (pOptionForceOn) {
    /**
     * ●コンフィグの反映
     */
    const _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        _ConfigManager_applyData.apply(this, arguments);
        this.touchUI = true;
    };
}

})();
