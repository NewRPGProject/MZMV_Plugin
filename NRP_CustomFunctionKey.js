//=============================================================================
// NRP_CustomFunctionKey.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.01 Customize function key functions.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/503167830.html
 *
 * @help Customize function key functions.
 * As a prerequisite,
 * the standard features of RPG Maker MZ are as follows
 * 
 * - F1 : 
 * - F2 : FPS Display
 * - F3 : Switch Stretch
 * - F4 : Full Screen Switching
 * - F5 : Reload
 * - F6 : 
 * - F7 : 
 * - F8 : Developer Tools (during development only)
 * - F9 : Debug Menu (during development only)
 * - F10: 
 * - F11: 
 * - F12: Developer Tools (during development only)
 * 
 * You can change these functions at will.
 * 
 * You can also set other functions such as "Return to Title Scene".
 * The operation is faster than normal reloading,
 * and the window size is retained.
 * 
 * Common event invocation is supported from ver1.01.
 * Up to two common events can be set.
 * It can be a debug-only function.
 * 
 * Keys for which plugin parameters
 * were not set will be left as they were.
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
 * @ Plugin Parameters
 * @-----------------------------------------------------
 * 
 * @param F1
 * @type select
 * @option
 * @option Disabled
 * @option ReturnTitle
 * @option Reload
 * @option FullScreen
 * @option SwitchStretch
 * @option FPS
 * @option Debug
 * @option DevTools
 * @option CommonEvent1
 * @option CommonEvent2
 * @desc This function is called up when the F1 key is pressed.
 * 
 * @param F2
 * @type select
 * @option
 * @option Disabled
 * @option ReturnTitle
 * @option Reload
 * @option FullScreen
 * @option SwitchStretch
 * @option FPS
 * @option Debug
 * @option DevTools
 * @option CommonEvent1
 * @option CommonEvent2
 * @desc This function is called up when the F2 key is pressed.
 * 
 * @param F3
 * @type select
 * @option
 * @option Disabled
 * @option ReturnTitle
 * @option Reload
 * @option FullScreen
 * @option SwitchStretch
 * @option FPS
 * @option Debug
 * @option DevTools
 * @option CommonEvent1
 * @option CommonEvent2
 * @desc This function is called up when the F3 key is pressed.
 * 
 * @param F4
 * @type select
 * @option
 * @option Disabled
 * @option ReturnTitle
 * @option Reload
 * @option FullScreen
 * @option SwitchStretch
 * @option FPS
 * @option Debug
 * @option DevTools
 * @option CommonEvent1
 * @option CommonEvent2
 * @desc This function is called up when the F4 key is pressed.
 * 
 * @param F5
 * @type select
 * @option
 * @option Disabled
 * @option ReturnTitle
 * @option Reload
 * @option FullScreen
 * @option SwitchStretch
 * @option FPS
 * @option Debug
 * @option DevTools
 * @option CommonEvent1
 * @option CommonEvent2
 * @desc This function is called up when the F5 key is pressed.
 * 
 * @param F6
 * @type select
 * @option
 * @option Disabled
 * @option ReturnTitle
 * @option Reload
 * @option FullScreen
 * @option SwitchStretch
 * @option FPS
 * @option Debug
 * @option DevTools
 * @option CommonEvent1
 * @option CommonEvent2
 * @desc This function is called up when the F6 key is pressed.
 * 
 * @param F7
 * @type select
 * @option
 * @option Disabled
 * @option ReturnTitle
 * @option Reload
 * @option FullScreen
 * @option SwitchStretch
 * @option FPS
 * @option Debug
 * @option DevTools
 * @option CommonEvent1
 * @option CommonEvent2
 * @desc This function is called up when the F7 key is pressed.
 * 
 * @param F8
 * @type select
 * @option
 * @option Disabled
 * @option ReturnTitle
 * @option Reload
 * @option FullScreen
 * @option SwitchStretch
 * @option FPS
 * @option Debug
 * @option DevTools
 * @option CommonEvent1
 * @option CommonEvent2
 * @desc This function is called up when the F8 key is pressed.
 * 
 * @param F9
 * @type select
 * @option
 * @option Disabled
 * @option ReturnTitle
 * @option Reload
 * @option FullScreen
 * @option SwitchStretch
 * @option FPS
 * @option Debug
 * @option DevTools
 * @option CommonEvent1
 * @option CommonEvent2
 * @desc This function is called up when the F9 key is pressed.
 * 
 * @param F10
 * @type select
 * @option
 * @option Disabled
 * @option ReturnTitle
 * @option Reload
 * @option FullScreen
 * @option SwitchStretch
 * @option FPS
 * @option Debug
 * @option DevTools
 * @option CommonEvent1
 * @option CommonEvent2
 * @desc This function is called up when the F10 key is pressed.
 * 
 * @param F11
 * @type select
 * @option
 * @option Disabled
 * @option ReturnTitle
 * @option Reload
 * @option FullScreen
 * @option SwitchStretch
 * @option FPS
 * @option Debug
 * @option DevTools
 * @option CommonEvent1
 * @option CommonEvent2
 * @desc This function is called up when the F11 key is pressed.
 * 
 * @param F12
 * @type select
 * @option
 * @option Disabled
 * @option ReturnTitle
 * @option Reload
 * @option FullScreen
 * @option SwitchStretch
 * @option FPS
 * @option Debug
 * @option DevTools
 * @option CommonEvent1
 * @option CommonEvent2
 * @desc This function is called up when the F12 key is pressed.
 * 
 * @param <CommonEvent>
 * 
 * @param CommonEvent1
 * @parent <CommonEvent>
 * @type common_event
 * @desc The number of the CommonEvent1 to call.
 * Associate with a function key.
 * 
 * @param Common1Debug
 * @parent CommonEvent1
 * @type boolean
 * @default false
 * @desc Make CommonEvent1 a debug-only function.
 * 
 * @param CommonEvent2
 * @parent <CommonEvent>
 * @type common_event
 * @desc The number of the CommonEvent2 to call.
 * Associate with a function key.
 * 
 * @param Common2Debug
 * @parent CommonEvent2
 * @type boolean
 * @default false
 * @desc Make CommonEvent2 a debug-only function.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.01 ファンクションキーの機能をカスタマイズ。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/503167830.html
 *
 * @help ファンクションキーの機能をカスタマイズします。
 * 前提として、ツクールＭＺの標準機能は以下の通りです。
 * 
 * ・Ｆ１：
 * ・Ｆ２：ＦＰＳ表示
 * ・Ｆ３：画面サイズ固定
 * ・Ｆ４：フルスクリーン切替
 * ・Ｆ５：リロード
 * ・Ｆ６：
 * ・Ｆ７：
 * ・Ｆ８：開発者ツール（開発時のみ）
 * ・Ｆ９：デバッグ（開発時のみ）
 * ・Ｆ10：
 * ・Ｆ11：
 * ・Ｆ12：開発者ツール（開発時のみ）
 * 
 * これらの機能を自由に変更できます。
 * 
 * また、その他に『タイトル画面へ戻る』機能も設定できます。
 * 通常のリロードよりも動作が速く、
 * ウィンドウサイズも保持されるメリットがあります。
 * 
 * ver1.01よりコモンイベントの呼び出しに対応しました。
 * ２つまでコモンイベントを設定できます。
 * デバッグ専用の機能にすることもできます。
 * 
 * プラグインパラメータを設定しなかった箇所は元のままになります。
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
 * @param F1
 * @text Ｆ１
 * @type select
 * @option
 * @option 無効 @value Disabled
 * @option タイトル画面へ @value ReturnTitle
 * @option リロード @value Reload
 * @option フルスクリーン切替 @value FullScreen
 * @option 画面サイズ固定 @value SwitchStretch
 * @option ＦＰＳ表示 @value FPS
 * @option デバッグ @value Debug
 * @option 開発者ツール @value DevTools
 * @option コモンイベント１ @value CommonEvent1
 * @option コモンイベント２ @value CommonEvent2
 * @desc Ｆ１キーを押した時に呼び出す機能です。
 * 
 * @param F2
 * @text Ｆ２
 * @type select
 * @option
 * @option 無効 @value Disabled
 * @option タイトル画面へ @value ReturnTitle
 * @option リロード @value Reload
 * @option フルスクリーン切替 @value FullScreen
 * @option 画面サイズ固定 @value SwitchStretch
 * @option ＦＰＳ表示 @value FPS
 * @option デバッグ @value Debug
 * @option 開発者ツール @value DevTools
 * @option コモンイベント１ @value CommonEvent1
 * @option コモンイベント２ @value CommonEvent2
 * @desc Ｆ２キーを押した時に呼び出す機能です。
 * 
 * @param F3
 * @text Ｆ３
 * @type select
 * @option
 * @option 無効 @value Disabled
 * @option タイトル画面へ @value ReturnTitle
 * @option リロード @value Reload
 * @option フルスクリーン切替 @value FullScreen
 * @option 画面サイズ固定 @value SwitchStretch
 * @option ＦＰＳ表示 @value FPS
 * @option デバッグ @value Debug
 * @option 開発者ツール @value DevTools
 * @option コモンイベント１ @value CommonEvent1
 * @option コモンイベント２ @value CommonEvent2
 * @desc Ｆ３キーを押した時に呼び出す機能です。
 * 
 * @param F4
 * @text Ｆ４
 * @type select
 * @option
 * @option 無効 @value Disabled
 * @option タイトル画面へ @value ReturnTitle
 * @option リロード @value Reload
 * @option フルスクリーン切替 @value FullScreen
 * @option 画面サイズ固定 @value SwitchStretch
 * @option ＦＰＳ表示 @value FPS
 * @option デバッグ @value Debug
 * @option 開発者ツール @value DevTools
 * @option コモンイベント１ @value CommonEvent1
 * @option コモンイベント２ @value CommonEvent2
 * @desc Ｆ４キーを押した時に呼び出す機能です。
 * 
 * @param F5
 * @text Ｆ５
 * @type select
 * @option
 * @option 無効 @value Disabled
 * @option タイトル画面へ @value ReturnTitle
 * @option リロード @value Reload
 * @option フルスクリーン切替 @value FullScreen
 * @option 画面サイズ固定 @value SwitchStretch
 * @option ＦＰＳ表示 @value FPS
 * @option デバッグ @value Debug
 * @option 開発者ツール @value DevTools
 * @option コモンイベント１ @value CommonEvent1
 * @option コモンイベント２ @value CommonEvent2
 * @desc Ｆ５キーを押した時に呼び出す機能です。
 * 
 * @param F6
 * @text Ｆ６
 * @type select
 * @option
 * @option 無効 @value Disabled
 * @option タイトル画面へ @value ReturnTitle
 * @option リロード @value Reload
 * @option フルスクリーン切替 @value FullScreen
 * @option 画面サイズ固定 @value SwitchStretch
 * @option ＦＰＳ表示 @value FPS
 * @option デバッグ @value Debug
 * @option 開発者ツール @value DevTools
 * @option コモンイベント１ @value CommonEvent1
 * @option コモンイベント２ @value CommonEvent2
 * @desc Ｆ６キーを押した時に呼び出す機能です。
 * 
 * @param F7
 * @text Ｆ７
 * @type select
 * @option
 * @option 無効 @value Disabled
 * @option タイトル画面へ @value ReturnTitle
 * @option リロード @value Reload
 * @option フルスクリーン切替 @value FullScreen
 * @option 画面サイズ固定 @value SwitchStretch
 * @option ＦＰＳ表示 @value FPS
 * @option デバッグ @value Debug
 * @option 開発者ツール @value DevTools
 * @option コモンイベント１ @value CommonEvent1
 * @option コモンイベント２ @value CommonEvent2
 * @desc Ｆ７キーを押した時に呼び出す機能です。
 * 
 * @param F8
 * @text Ｆ８
 * @type select
 * @option
 * @option 無効 @value Disabled
 * @option タイトル画面へ @value ReturnTitle
 * @option リロード @value Reload
 * @option フルスクリーン切替 @value FullScreen
 * @option 画面サイズ固定 @value SwitchStretch
 * @option ＦＰＳ表示 @value FPS
 * @option デバッグ @value Debug
 * @option 開発者ツール @value DevTools
 * @option コモンイベント１ @value CommonEvent1
 * @option コモンイベント２ @value CommonEvent2
 * @desc Ｆ８キーを押した時に呼び出す機能です。
 * 
 * @param F9
 * @text Ｆ９
 * @type select
 * @option
 * @option 無効 @value Disabled
 * @option タイトル画面へ @value ReturnTitle
 * @option リロード @value Reload
 * @option フルスクリーン切替 @value FullScreen
 * @option 画面サイズ固定 @value SwitchStretch
 * @option ＦＰＳ表示 @value FPS
 * @option デバッグ @value Debug
 * @option 開発者ツール @value DevTools
 * @option コモンイベント１ @value CommonEvent1
 * @option コモンイベント２ @value CommonEvent2
 * @desc Ｆ９キーを押した時に呼び出す機能です。
 * 
 * @param F10
 * @text Ｆ１０
 * @type select
 * @option
 * @option 無効 @value Disabled
 * @option タイトル画面へ @value ReturnTitle
 * @option リロード @value Reload
 * @option フルスクリーン切替 @value FullScreen
 * @option 画面サイズ固定 @value SwitchStretch
 * @option ＦＰＳ表示 @value FPS
 * @option デバッグ @value Debug
 * @option 開発者ツール @value DevTools
 * @option コモンイベント１ @value CommonEvent1
 * @option コモンイベント２ @value CommonEvent2
 * @desc Ｆ１０キーを押した時に呼び出す機能です。
 * 
 * @param F11
 * @text Ｆ１１
 * @type select
 * @option
 * @option 無効 @value Disabled
 * @option タイトル画面へ @value ReturnTitle
 * @option リロード @value Reload
 * @option フルスクリーン切替 @value FullScreen
 * @option 画面サイズ固定 @value SwitchStretch
 * @option ＦＰＳ表示 @value FPS
 * @option デバッグ @value Debug
 * @option 開発者ツール @value DevTools
 * @option コモンイベント１ @value CommonEvent1
 * @option コモンイベント２ @value CommonEvent2
 * @desc Ｆ１１キーを押した時に呼び出す機能です。
 * 
 * @param F12
 * @text Ｆ１２
 * @type select
 * @option
 * @option 無効 @value Disabled
 * @option タイトル画面へ @value ReturnTitle
 * @option リロード @value Reload
 * @option フルスクリーン切替 @value FullScreen
 * @option 画面サイズ固定 @value SwitchStretch
 * @option ＦＰＳ表示 @value FPS
 * @option デバッグ @value Debug
 * @option 開発者ツール @value DevTools
 * @option コモンイベント１ @value CommonEvent1
 * @option コモンイベント２ @value CommonEvent2
 * @desc Ｆ１２キーを押した時に呼び出す機能です。
 * 
 * @param <CommonEvent>
 * @text ＜コモンイベント＞
 * 
 * @param CommonEvent1
 * @parent <CommonEvent>
 * @text コモンイベント１
 * @type common_event
 * @desc 呼び出すコモンイベント１の番号です。
 * ファンクションキーと紐づけてください。
 * 
 * @param Common1Debug
 * @parent CommonEvent1
 * @text コモン１をデバッグ用に
 * @type boolean
 * @default false
 * @desc コモンイベント１をデバッグ専用の機能にします。
 * 
 * @param CommonEvent2
 * @parent <CommonEvent>
 * @text コモンイベント２
 * @type common_event
 * @desc 呼び出すコモンイベント２の番号です。
 * ファンクションキーと紐づけてください。
 * 
 * @param Common2Debug
 * @parent CommonEvent2
 * @text コモン２をデバッグ用に
 * @type boolean
 * @default false
 * @desc コモンイベント２をデバッグ専用の機能にします。
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

const PLUGIN_NAME = "NRP_CustomFunctionKey";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pF1 = setDefault(parameters["F1"]);
const pF2 = setDefault(parameters["F2"]);
const pF3 = setDefault(parameters["F3"]);
const pF4 = setDefault(parameters["F4"]);
const pF5 = setDefault(parameters["F5"]);
const pF6 = setDefault(parameters["F6"]);
const pF7 = setDefault(parameters["F7"]);
const pF8 = setDefault(parameters["F8"]);
const pF9 = setDefault(parameters["F9"]);
const pF10 = setDefault(parameters["F10"]);
const pF11 = setDefault(parameters["F11"]);
const pF12 = setDefault(parameters["F12"]);
const pCommonEvent1 = toNumber(parameters["CommonEvent1"]);
const pCommon1Debug = toBoolean(parameters["Common1Debug"], false);
const pCommonEvent2 = toNumber(parameters["CommonEvent2"]);
const pCommon2Debug = toBoolean(parameters["Common2Debug"], false);

//-----------------------------------------------------------------------------
// SceneManager
//-----------------------------------------------------------------------------

/**
 * ●キー入力検出
 */
const _SceneManager_onKeyDown = SceneManager.onKeyDown;
SceneManager.onKeyDown = function(event) {
    if (!event.ctrlKey && !event.altKey) {
        if (pF1 && event.keyCode == 112) {
            callFunction(pF1);
            return;
        } else if (pF2 && event.keyCode == 113) {
            callFunction(pF2);
            return;
        } else if (pF3 && event.keyCode == 114) {
            callFunction(pF3);
            return;
        } else if (pF4 && event.keyCode == 115) {
            callFunction(pF4);
            return;
        } else if (pF5 && event.keyCode == 116) {
            callFunction(pF5);
            return;
        } else if (pF6 && event.keyCode == 117) {
            callFunction(pF6);
            return;
        } else if (pF7 && event.keyCode == 118) {
            callFunction(pF7);
            return;
        } else if (pF8 && event.keyCode == 119) {
            callFunction(pF8);
            return;
        } else if (pF9 && event.keyCode == 120) {
            callFunction(pF9);
            return;
        } else if (pF10 && event.keyCode == 121) {
            callFunction(pF10);
            return;
        } else if (pF11 && event.keyCode == 122) {
            callFunction(pF11);
            return;
        } else if (pF12 && event.keyCode == 123) {
            callFunction(pF12);
            return;
        }
    }
    _SceneManager_onKeyDown.apply(this, arguments);
};

/**
 * ●機能呼び出し
 */
function callFunction(key) {
    if (key == "Disabled") {
        return;
    } else if (key == "Reload") {
        SceneManager.reloadGame();
    } else if (key == "DevTools") {
        SceneManager.showDevTools();
    } else if (key == "ReturnTitle") {
        SceneManager.goto(Scene_Title);
    } else if (key == "Debug") {
        // テスト時限定
        if ($gameTemp.isPlaytest()) {
            SceneManager.push(Scene_Debug);
        }
    } else if (key == "FPS") {
        Graphics._switchFPSCounter();
    } else if (key == "SwitchStretch") {
        Graphics._switchStretchMode();
    } else if (key == "FullScreen") {
        Graphics._switchFullScreen();
    } else if (key == "CommonEvent1") {
        // テスト時限定かつ本番なら中止
        if (pCommon1Debug && !$gameTemp.isPlaytest()) {
            return;
        }
        callCommonEvent(pCommonEvent1);

    } else if (key == "CommonEvent2") {
        // テスト時限定かつ本番なら中止
        if (pCommon2Debug && !$gameTemp.isPlaytest()) {
            return;
        }
        callCommonEvent(pCommonEvent2);
    }
}

/**
 * ●コモンイベントの呼び出し共通処理
 */
function callCommonEvent(commonEventId) {
    $gameTemp.reserveCommonEvent(commonEventId);
    $gameMap._interpreter.setupReservedCommonEvent();
}

//-----------------------------------------------------------------------------
// Scene_Map
//-----------------------------------------------------------------------------

/**
 * ●デバッグ機能の呼び出し。
 */
const _Scene_Map_updateCallDebug = Scene_Map.prototype.updateCallDebug;
Scene_Map.prototype.updateCallDebug = function() {
    // Ｆ９が設定されている場合は機能を潰す。
    if (pF9) {
        return;
    }
    _Scene_Map_updateCallDebug.apply(this, arguments);
};

//-----------------------------------------------------------------------------
// Graphics
//-----------------------------------------------------------------------------

/**
 * ●キー押下
 */
const _Graphics__onKeyDown = Graphics._onKeyDown;
Graphics._onKeyDown = function(event) {
    // 設定がある場合は本来の機能を無効化する。
    if (!event.ctrlKey && !event.altKey) {
        // ＦＰＳ表示
        if (pF2 && event.keyCode == 113) {
            return;
        // 画面サイズ固定
        } else if (pF3 && event.keyCode == 114) {
            return;
        // フルスクリーン切替
        } else if (pF4 && event.keyCode == 115) {
            return;
        }
    }
    _Graphics__onKeyDown.apply(this, arguments);
};

})();
