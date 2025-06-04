//=============================================================================
// NRP_GameWindowSize.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.051 Resize the entire game window & add to the options.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @orderBefore StartUpFullScreen
 * @url http://newrpg.seesaa.net/article/475413177.html
 *
 * @help Change the window size of the entire game.
 * It also adds the ability to change the window size to the options screen.
 * 
 * ◆Main features
 * - Window size can be set independently from resolution.
 * - Window size change function can be added to the options screen.
 *   If changed, the change will be reflected at startup thereafter.
 * 
 * Note that it does not make sense on mobile or browser activation.
 * This plugin is automatically disabled.
 * 
 * -------------------------------------------------------------------
 * [Notice (for MZ)]
 * -------------------------------------------------------------------
 * ◆About the window size immediately after starting the game
 * The window size at the moment the game is launched
 * cannot be changed by this plugin.
 * Normally, the window size should switch after a beat.
 * 
 * In MZ, the window size immediately after startup is determined
 * by the "Screen Width" and "Screen Height" in "System 2".
 * These are values shared with the pixel size handled in the game.
 * 
 * ※It is somewhat odd that pixel size and window size are determined
 *   by the same item, but there is currently no way around this.
 * 
 * There is no perfect solution, but the following is a tentative one.
 * 
 * If you set the "screenWidth" and "screenHeight" in the plugin parameters,
 * you can change only the pixel size of the game,
 * independently of the "System 2" setting values.
 * In this case, set the window size to the "System 2" setting value.
 * 
 * However, since the System 2 configuration values are also referenced
 * in the editor, the display area of the Troop screen in the database
 * is reduced as a side effect.
 * This is not a problem if the Troop screen is not used
 * at the end of development or in ARPGs.
 * 
 * In addition, the horizontal scroll bar may appear
 * when the screen size is reduced, but this can be suppressed
 * by adding the following three lines to "[Project]\css\game.css"
 * 
 * body::-webkit-scrollbar {
 *    display:none;
 * }
 * 
 * ※Please note that game.css is a file
 *   that may be overwritten when the main unit is upgraded.
 * 
 * -------------------------------------------------------------------
 * [Notice (for MV)]
 * -------------------------------------------------------------------
 * ◆About the window size immediately after starting the game
 * In MV, the window size at the moment of startup can be set
 * in "package.json" directly under the project.
 * If you want to change the standard window size,
 * it is better to set this value as well.
 * This can suppress the behavior of the window size
 * switching immediately after startup.
 * 
 * ◆Conflict with YEP_CoreEngine.
 * YEP_CoreEngine has a specification
 * that forces the window size to match the resolution.
 * By placing this plugin underneath the YEP_CoreEngine,
 * you can only resize the window appropriately.
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
 * @param windowWidth
 * @type string
 * @default Graphics.width
 * @desc The width of the window (exclude frame) as the standard.
 * The default value is the same as the resolution.
 * 
 * @param windowHeight
 * @type string
 * @default Graphics.height
 * @desc The height of the window (exclude frame) as the standard.
 * The default value is the same as the resolution.
 * 
 * @param screenWidth
 * @type string
 * @desc Screen width.
 * Overrides the value of System2 only when entered.
 * 
 * @param screenHeight
 * @type string
 * @desc Screen height.
 * Overrides the value of System2 only when entered.
 * 
 * @param <option>
 * 
 * @param useOption
 * @parent <option>
 * @type boolean
 * @default true
 * @desc Add the ability to change the window size to the options screen.
 * 
 * @param optionPosition
 * @parent <option>
 * @type number
 * @default 2
 * @desc The position to insert an item into the options screen.
 * The default value is 2, which is under Command Remember.
 * 
 * @param optionName
 * @parent <option>
 * @type string
 * @default Window Size
 * @desc Set the display name on the options screen.
 * 
 * @param optionDispType
 * @parent <option>
 * @type select
 * @option % Style @value percent
 * @option Width*Heigth Style @value size
 * @default percent
 * @desc Set the display type on the options screen.
 * 
 * @param windowSizeMin
 * @parent <option>
 * @type string
 * @default 50
 * @desc The minimum window size that can be changed.
 * The default value is 50(%).
 * 
 * @param windowSizeMax
 * @parent <option>
 * @type string
 * @default 150
 * @desc The maximum window size that can be changed.
 * The default value is 150(%).
 * 
 * @param windowSizeOffset
 * @parent <option>
 * @type string
 * @default 25
 * @desc The unit of change in window size.
 * The default value is 25(%).
 * 
 * @param <cooperation>
 * 
 * @param overWriteSceneManagerRun
 * @parent <cooperation>
 * @type boolean
 * @default false
 * @desc Override the SceneManager.run function. This function is used to disable window resizing by YEP_CoreEngine.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.051 ゲーム全体のウィンドウサイズを変更＆オプションに追加
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @orderBefore StartUpFullScreen
 * @url http://newrpg.seesaa.net/article/475413177.html
 *
 * @help ゲーム全体のウィンドウサイズを変更します。
 * また、オプション画面にウィンドウサイズの変更機能を追加します。
 * 
 * ◆主な特徴
 * ・解像度とは別に独立してウィンドウサイズを設定可能。
 * ・オプション画面にウィンドウサイズの変更機能を追加可能。
 * 　変更すると以降、起動時にも反映されます。
 *
 * なお、モバイルやブラウザ起動では意味がないので、
 * このプラグインは自動で無効化されます。
 * 
 * -------------------------------------------------------------------
 * ■注意点（ＭＺ向け）
 * -------------------------------------------------------------------
 * ◆起動直後のウィンドウサイズについて
 * ゲームを起動した瞬間のウィンドウサイズは、このプラグインでは変更できません。
 * 通常は一拍遅れて、ウィンドウサイズが切り替わるはずです。
 * 
 * ＭＺでは起動直後のウィンドウサイズは、
 * システム2にある『画面の幅』『画面の高さ』によって決定されます。
 * これらはゲーム内で処理する解像度（ピクセルサイズ）と共有する値です。
 * 
 * ※ピクセルサイズとウィンドウサイズが同じ項目で決定されるのは、
 * 　少々おかしな仕様なのですが、現状ではどうにもなりません。
 * 
 * 完璧な対処法はありませんが、以下は一応の対処法です。
 * 
 * プラグインパラメータで『画面の幅』と『画面の高さ』の設定をすれば、
 * システム2の設定値とは別に、ゲームのピクセルサイズだけを変更できます。
 * この場合、システム2の設定値にはウィンドウサイズを設定しておきます。
 * 
 * ただし、システム2の設定値はエディタでも参照しているため、
 * 副作用としてデータベースの敵グループ画面の表示領域が狭まってしまいます。
 * 開発終盤やＡＲＰＧなどで敵グループ画面を使わないなら問題ありません。
 * 
 * また、画面サイズを縮めた場合に横スクロールバーが表示される場合がありますが、
 * [プロジェクト]\css\game.css
 * に以下の三行を追記することで抑制できます。
 * 
 * body::-webkit-scrollbar {
 *    display:none;
 * }
 * 
 * ※なお、game.cssは本体のバージョンアップ時に、
 * 　上書きされる可能性があるファイルなのでご注意ください。
 * 
 * -------------------------------------------------------------------
 * ■注意点（ＭＶ向け）
 * -------------------------------------------------------------------
 * ◆起動直後のウィンドウサイズについて
 * ＭＶでは起動した瞬間のウィンドウサイズを、
 * プロジェクト直下の『package.json』で設定できます。
 * 標準のウィンドウサイズを変更する場合は、こちらの値も合わせておくとベターです。
 * 起動直後にウィンドウサイズが切り替わる挙動を抑制できます。
 *
 * ◆YEP_CoreEngineとの競合について
 * YEP_CoreEngineには、強制的にウィンドウサイズを解像度に合わせる仕様があります。
 * このプラグインをYEP_CoreEngineの下へ配置すれば、
 * 適切にウィンドウサイズだけを変更できます。
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
 * @param windowWidth
 * @text ウィンドウ横幅
 * @type string
 * @default Graphics.width
 * @desc 標準とするウィンドウの横幅（枠除く）です。
 * 初期値は解像度と同じです。
 * 
 * @param windowHeight
 * @text ウィンドウ縦幅
 * @type string
 * @default Graphics.height
 * @desc 標準とするウィンドウの縦幅（枠除く）です。
 * 初期値は解像度と同じです。
 * 
 * @param screenWidth
 * @text 画面の幅
 * @type string
 * @desc 画面の横幅です。
 * 入力時のみシステム2の値を上書きします。
 * 
 * @param screenHeight
 * @text 画面の高さ
 * @type string
 * @desc 画面の縦幅です。
 * 入力時のみシステム2の値を上書きします。
 * 
 * @param <option>
 * @text ＜オプション＞
 * 
 * @param useOption
 * @text オプションに表示
 * @parent <option>
 * @type boolean
 * @default true
 * @desc ウィンドウサイズの変更機能をオプション画面に追加します。
 * 
 * @param optionPosition
 * @text オプション挿入位置
 * @parent <option>
 * @type number
 * @default 2
 * @desc オプション画面に項目を挿入する位置です。
 * 初期値は2。コマンド記憶の下になります。
 * 
 * @param optionName
 * @text オプション表示名
 * @parent <option>
 * @type string
 * @default ウィンドウサイズ
 * @desc オプション画面での表示名を設定します。
 * 
 * @param optionDispType
 * @text オプション表示形式
 * @parent <option>
 * @type select
 * @option ％表示 @value percent
 * @option 横*縦表示 @value size
 * @default percent
 * @desc オプション画面での表示形式を設定します。
 * 
 * @param windowSizeMin
 * @text 最小ウィンドウサイズ
 * @parent <option>
 * @type string
 * @default 50
 * @desc 変更可能な最小のウィンドウサイズです。
 * 初期値は50(%)です。
 * 
 * @param windowSizeMax
 * @text 最大ウィンドウサイズ
 * @parent <option>
 * @type string
 * @default 150
 * @desc 変更可能な最大のウィンドウサイズです。
 * 初期値は150(%)です。
 * 
 * @param windowSizeOffset
 * @text 変更単位
 * @parent <option>
 * @type string
 * @default 25
 * @desc ウィンドウサイズの変更単位です。
 * 初期値は25(%)です。
 * 
 * @param <cooperation>
 * @text ＜外部連携＞
 * 
 * @param overWriteSceneManagerRun
 * @text SceneManager.runを上書
 * @parent <cooperation>
 * @type boolean
 * @default false
 * @desc SceneManager.run関数を上書きします。YEP_CoreEngineのウィンドウサイズ変更を無効化するための機能です。
 */

(function() {
"use strict";

function setDefault(str, def) {
    return str ? str : def;
}
function toNumber(str, def) {
    return isNaN(str) ? def : +(str || def);
}
function toBoolean(str) {
    if (str == true) {
        return true;
    }
    return (str == "true") ? true : false;
}

const parameters = PluginManager.parameters("NRP_GameWindowSize");
// 基本項目
const pWindowWidth = parameters["windowWidth"];
const pWindowHeight = parameters["windowHeight"];
const pScreenWidth = parameters["screenWidth"];
const pScreenHeight = parameters["screenHeight"];
// オプション
const pUseOption = toBoolean(parameters["useOption"]);
const pOptionName = parameters["optionName"];
const pOptionPosition = toNumber(parameters["optionPosition"], 2);
const pOptionDispType = parameters["optionDispType"];
const pWindowSizeMin = setDefault(parameters["windowSizeMin"], 50);
const pWindowSizeMax = setDefault(parameters["windowSizeMax"], 150);
const pWindowSizeOffset = setDefault(parameters["windowSizeOffset"], 25);
// 外部連携
const pOverWriteSceneManagerRun = toBoolean(parameters["overWriteSceneManagerRun"]);

// 識別子
const WINDOW_SIZE_SYMBOL = "windowSize";

/**
 * 上書きの場合
 */
if (pOverWriteSceneManagerRun) {
    SceneManager.run = function(sceneClass) {
        try {
            this.initialize();
            this.goto(sceneClass);

            // MVの場合
            if (Utils.RPGMAKER_NAME == "MV") {
                this.requestUpdate();
            // MZの場合
            } else {
                Graphics.startGameLoop();
            }
        } catch (e) {
            this.catchException(e);
        }
    };
}

/**
 * ●ゲーム起動時
 */
const _Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
    _Scene_Boot_start.apply(this, arguments);

    // ウィンドウサイズを設定値へ変更
    changeWindowSize();

    // 強制的に画面サイズを変更
    if (pScreenWidth && pScreenHeight) {
        Graphics.width = eval(pScreenWidth);
        Graphics.height = eval(pScreenHeight);
    }
};

/**
 * ●ウィンドウサイズの変更
 */
function changeWindowSize() {
    // ローカル実行以外では機能無効
    if (!Utils.isNwjs()) {
        return;
    }

    if (pWindowWidth || pWindowHeight) {
        const dw = getWindowWidth() - window.innerWidth;
        const dh = getWindowHeight() - window.innerHeight;
        window.resizeBy(dw, dh);
        window.moveBy(-dw / 2, -dh / 2);
    }
}

/**
 * ●ウィンドウの横幅取得
 */
function getWindowWidth() {
    var width = Graphics.width;
    if (pWindowWidth) {
        width = eval(pWindowWidth);
    }
    return Math.round(width * getWindowSizeRate());
}

/**
 * ●ウィンドウの縦幅取得
 */
function getWindowHeight() {
    var height = Graphics.height;
    if (pWindowHeight) {
        height = eval(pWindowHeight);
    }
    return Math.round(height * getWindowSizeRate());
}

/**
 * ●ウィンドウサイズのレートを取得
 */
function getWindowSizeRate() {
    var windowSizeRate = 1;
    // オプションを使用しない場合は1
    if (!pUseOption) {
        return windowSizeRate;
    }

    if (ConfigManager.windowSize) {
        windowSizeRate = ConfigManager.windowSize / 100;
    }

    return windowSizeRate;
}

// ローカル実行以外では機能無効
if (!Utils.isNwjs()) {
    return;
}

/**
 * オプションを使用しない場合はここで処理終了
 */
if (!pUseOption) {
    return;
}

/**
 * ●オプション用ウィンドウサイズの最小値
 */
function windowSizeMin() {
    return eval(pWindowSizeMin);
}

/**
 * ●オプション用ウィンドウサイズの最大値
 */
function windowSizeMax() {
    return eval(pWindowSizeMax);
}

/**
 * ●オプション用ウィンドウサイズの変更単位
 */
function windowSizeOffset() {
    return eval(pWindowSizeOffset);
}

// ウィンドウサイズの初期値
ConfigManager.windowSize = 100;

/**
 * ●オプション画面の項目生成
 */
var _ConfigManager_makeData = ConfigManager.makeData;
ConfigManager.makeData = function() {
    var config = _ConfigManager_makeData.apply(this, arguments);

    config.windowSize = this.windowSize;
    return config;
};

/**
 * ●オプション画面の項目生成
 */
var _ConfigManager_applyData = ConfigManager.applyData;
ConfigManager.applyData = function(config) {
    _ConfigManager_applyData.apply(this, arguments);

    this.windowSize = this.readWindowSize(config, WINDOW_SIZE_SYMBOL);
};

/**
 * 【独自】ウィンドウサイズをコンフィグから読込
 */
ConfigManager.readWindowSize = function(config, name) {
    var value = config[name];
    if (value !== undefined) {
        return Number(value).clamp(windowSizeMin(), windowSizeMax());
    } else {
        return 100;
    }
};

/**
 * ●表示状態取得
 */
var _Window_Options_statusText = Window_Options.prototype.statusText;
Window_Options.prototype.statusText = function(index) {
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);

    if (isWindowsSizeSymbol(symbol)) {
        return windowSizeStatusText(value);
    }

    return _Window_Options_statusText.apply(this, arguments);
};

/**
 * ●ウィンドウサイズの表示名
 */
function windowSizeStatusText(value) {
    // サイズ表示
    if (pOptionDispType == "size") {
        return getWindowWidth() + "*" + getWindowHeight();
    }
    // ％表示
    return Math.round(value * 10) / 10 + '%';
}

/**
 * ●あまり細かい値にならないよう丸める
 */
function windowSizeRound(value) {
    // 最小値、最大値、100と1以内ならそれぞれの値を設定する。
    // （涙ぐましい微調整……）
    if (Math.abs(value - windowSizeMin()) < 1) {
        value = windowSizeMin();
    } else if (Math.abs(value - windowSizeMax()) < 1) {
        value = windowSizeMax();
    } else if (Math.abs(value - 100) < 1) {
        value = 100;
    }

    // 少数第二位まで
    return Math.round(value * 100) / 100;
}

/**
 * ●決定キー
 */
var _Window_Options_processOk = Window_Options.prototype.processOk;
Window_Options.prototype.processOk = function() {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);

    if (isWindowsSizeSymbol(symbol)) {
        value += windowSizeOffset();
        value = windowSizeRound(value);

        if (value > windowSizeMax()) {
            value = windowSizeMin();
        }
        this.changeWindowSizeValue(symbol, value);
        return;
    }
    
    _Window_Options_processOk.apply(this, arguments);
};

/**
 * ●カーソル右
 */
var _Window_Options_cursorRight = Window_Options.prototype.cursorRight;
Window_Options.prototype.cursorRight = function(wrap) {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);

    if (isWindowsSizeSymbol(symbol)) {
        value += windowSizeOffset();
        value = windowSizeRound(value);
        this.changeWindowSizeValue(symbol, value);
        return;
    }

    _Window_Options_cursorRight.apply(this, arguments);
};

/**
 * ●カーソル左
 */
var _Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
Window_Options.prototype.cursorLeft = function(wrap) {
    var index = this.index();
    var symbol = this.commandSymbol(index);
    var value = this.getConfigValue(symbol);

    if (isWindowsSizeSymbol(symbol)) {
        value -= windowSizeOffset();
        value = windowSizeRound(value);
        this.changeWindowSizeValue(symbol, value);
        return;
    }

    _Window_Options_cursorLeft.apply(this, arguments);
};

/**
 * 【独自】ウィンドウサイズの値を変更
 */
Window_Options.prototype.changeWindowSizeValue = function(symbol, value) {
    value = value.clamp(windowSizeMin(), windowSizeMax());
    this.changeValue(symbol, value);

    // MZの場合
    if (Utils.RPGMAKER_NAME != "MV") {
        // タッチによる選択を禁止
        // ウィンドウサイズ変更による選択状態の変更を避けるため
        this._noTouchSelect = true;
    }
};

// MZの場合
if (Utils.RPGMAKER_NAME != "MV") {
    /**
     * ●タッチ時のセレクト処理
     */
    const _Window_Options_onTouchSelect = Window_Options.prototype.onTouchSelect;
    Window_Options.prototype.onTouchSelect = function(trigger) {
        // タッチ選択を禁止！
        if (this._noTouchSelect) {
            this._noTouchSelect = undefined;
            return;
        }

        _Window_Options_onTouchSelect.apply(this, arguments);
    };
}

/**
 * ●ウィンドウサイズの項目追加
 */
const _Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
Window_Options.prototype.makeCommandList = function() {
    _Window_Options_makeCommandList.apply(this, arguments);

    this._list.splice(pOptionPosition, 0, { name: pOptionName, symbol: WINDOW_SIZE_SYMBOL, enabled: true, ext: null});

    // Mano_InputConfig.jsとの競合対処
    if (this._gamepadOptionIndex >= pOptionPosition) {
        this._gamepadOptionIndex++;
    }
    if (this._keyboardConfigIndex >= pOptionPosition) {
        this._keyboardConfigIndex++;
    }
};

/**
 * ●設定値を反映
 */
var _Window_Options_setConfigValue = Window_Options.prototype.setConfigValue;
Window_Options.prototype.setConfigValue = function(symbol, volume) {
    _Window_Options_setConfigValue.apply(this, arguments);

    if (isWindowsSizeSymbol(symbol)) {
        // ウィンドウサイズを反映
        changeWindowSize();
    }
};

/**
 * ●ウィンドウサイズのオプションか？
 */
function isWindowsSizeSymbol(symbol) {
    if (symbol == WINDOW_SIZE_SYMBOL) {
        return true;
    }
    return false;
}

/**
 * ●コマンド数を加算
 */
const _Scene_Options_maxCommands = Scene_Options.prototype.maxCommands;
Scene_Options.prototype.maxCommands = function() {
    return _Scene_Options_maxCommands.apply(this, arguments) + 1;
};

})();
