//=============================================================================
// NRP_TitleCustomize.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.01 Customize the title scene.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @orderAfter NRP_N_TitleMap
 * @url https://newrpg.seesaa.net/article/501426741.html
 *
 * @help Customize the title scene.
 * 
 * - Adding custom commands.
 * - Change the size of the command window
 * - Enable control characters for commands.
 *   ※Icon and font size changes are enabled.
 * - Do not fade out BGM at the beginning of the game.
 * 
 * Note that the placement of the command window can be changed
 * in System 1 of the database.
 * 
 * -------------------------------------------------------------------
 * [Adding Custom Commands]
 * -------------------------------------------------------------------
 * You can add custom commands to the title scene.
 * You can execute scripts or call URLs.
 * 
 * ◆Script Sample
 * SceneManager.push(Scene_Options);
 * ※This is a script to call the options scene.
 *   Please modify it according to the scene name.
 * 
 * ◆Script Sample (SceneGlossary.js)
 * $gameParty.clearGlossaryIndex(); $gameParty.setSelectedGlossaryType(null, 0); SceneManager.push(Scene_Glossary);
 * ※Calls the in-game terminology dictionary plugin (SceneGlossary.js).
 * 
 * ◆URL Sample (Web)
 * https://newrpg.seesaa.net/article/501426741.html
 * ※Call up an article about this plugin.
 *   Links to official websites and similar sites are assumed.
 * 
 * ◆URL Sample (Local File)
 * .\\Manual\\index.html
 * ※Open the index.html file located in the Manual folder
 *   at the same layer as the .exe file.
 * ※Note that you must use double backslashes (\\)
 *   instead of forward slashes (/).
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
 * @param UseControlCharacter
 * @type boolean
 * @default true
 * @desc Enables control characters in command names.
 * Note that character reduction is disabled.
 * 
 * @param TextAlign
 * @type select
 * @option left
 * @option center
 * @default center
 * @desc Command name placement.
 * 
 * @param WindowWidth
 * @type number
 * @default 240
 * @desc The width of the title window.
 * The default value is 240.
 * 
 * @param WindowLineHeight
 * @type number
 * @desc The height of a single line of the window.
 * If blank, the original setting is used.
 * 
 * @param OptionName
 * @type string
 * @desc Optional display name.
 * Can be specified separately from the menu scene.
 * 
 * @param NoBgmFadeOut
 * @type boolean
 * @default false
 * @desc Don't fade out the BGM at the start of the game.
 * If you want to take over the title music as it is.
 */
//-------------------------------------------------------------
// Command
//-------------------------------------------------------------
/*~struct~Command:
 * @param CommandName
 * @type string
 * @desc The name of the command to add.
 * 
 * @param Position
 * @type number
 * @default 0
 * @desc The position at which the command is to be inserted. Set 0 as the beginning.
 * 
 * @param Script
 * @type string
 * @desc This is a script that runs when a command is selected.
 * 
 * @param Url
 * @type string
 * @desc When a command is selected, the browser opens and the URL is called.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.01 タイトル画面をカスタマイズします。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @orderAfter NRP_N_TitleMap
 * @url https://newrpg.seesaa.net/article/501426741.html
 *
 * @help タイトル画面をカスタマイズします。
 * 
 * ・独自コマンドの追加
 * ・コマンドウィンドウのサイズ調整
 * ・コマンドの制御文字の有効化
 * 　※アイコンやフォントサイズの変更が有効になります。
 * ・ゲーム開始時のＢＧＭをフェードアウトさせない。
 * 
 * なお、コマンドウィンドウの配置は、
 * データベースのシステム1で変更できます。
 * 
 * -------------------------------------------------------------------
 * ■独自コマンドの追加
 * -------------------------------------------------------------------
 * タイトル画面に独自のコマンドを追加できます。
 * スクリプトの実行やＵＲＬの呼び出しが可能です。
 * 
 * ◆スクリプトの例
 * SceneManager.push(Scene_Options);
 * ※オプション画面を呼ぶスクリプトです。
 * 　シーン名に応じて変更してください。
 * 
 * ◆スクリプトの例（SceneGlossary.js）
 * $gameParty.clearGlossaryIndex(); $gameParty.setSelectedGlossaryType(null, 0); SceneManager.push(Scene_Glossary);
 * ※ゲーム内用語辞典プラグイン（SceneGlossary.js）を呼び出します。
 * 
 * ◆ＵＲＬの例（外部）
 * https://newrpg.seesaa.net/article/501426741.html
 * ※このプラグインの記事です。
 * 　実際には公式サイトなどへのリンクを想定しています。
 * 
 * ◆ＵＲＬの例（ローカルファイル）
 * .\\Manual\\index.html
 * ※exeファイルと同じ階層にあるManualフォルダの下のindex.htmlを開きます。
 * 　/ではなく\\で区切る必要があることに注意してください。
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
 * @param AddCommandList
 * @text 追加コマンドリスト
 * @type struct<Command>[]
 * @desc コマンドを追加します。
 * 
 * @param UseControlCharacter
 * @text 制御文字を有効に
 * @type boolean
 * @default true
 * @desc コマンド名に制御文字を有効にします。
 * なお、副作用で文字の縮小が無効になります。
 * 
 * @param TextAlign
 * @text 文字の配置
 * @type select
 * @option 左 @value left
 * @option 中央 @value center
 * @default center
 * @desc コマンド名の配置です。
 * 
 * @param WindowWidth
 * @text ウィンドウの横幅
 * @type number
 * @default 240
 * @desc タイトルウィンドウの横幅です。
 * 初期値は240です。
 * 
 * @param WindowLineHeight
 * @text ウィンドウの一行の幅
 * @type number
 * @desc ウィンドウの一行の縦幅です。
 * 空欄なら元の設定を使用します。
 * 
 * @param OptionName
 * @text オプション名
 * @type string
 * @desc オプションの表示名です。
 * メニュー画面とは別に指定できます。
 * 
 * @param NoBgmFadeOut
 * @text BGMをフェードアウトしない
 * @type boolean
 * @default false
 * @desc ゲーム開始時にＢＧＭをフェードアウトさせません。
 * タイトル画面の音楽をそのまま引き継ぎたい場合に。
 */
//-------------------------------------------------------------
// Command
//-------------------------------------------------------------
/*~struct~Command:ja
 * @param CommandName
 * @text コマンド名
 * @type string
 * @desc コマンド名です。
 * 
 * @param Position
 * @text 挿入位置
 * @type number
 * @default 0
 * @desc コマンドを挿入する位置です。
 * 0を先頭として設定してください。
 * 
 * @param Script
 * @text スクリプト
 * @type string
 * @desc コマンド決定時に実行するスクリプトです。
 * 
 * @param Url
 * @text ＵＲＬ
 * @type string
 * @desc コマンド決定時にブラウザを開き、ＵＲＬを呼び出します。
 */

(function() {
"use strict";

/**
 * ●構造体（二重配列）をJSで扱えるように変換
 */
function parseStruct2(arg) {
    var ret = [];
    if (arg) {
        JSON.parse(arg).forEach(function(str) {
            ret.push(JSON.parse(str));
        });
    }
    return ret;
}
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

const PLUGIN_NAME = "NRP_TitleCustomize";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pAddCommandList = parseStruct2(parameters["AddCommandList"]);
const pUseControlCharacter = toBoolean(parameters["UseControlCharacter"], false);
const pTextAlign = setDefault(parameters["TextAlign"], "center");
const pWindowWidth = toNumber(parameters["WindowWidth"]);
const pWindowLineHeight = toNumber(parameters["WindowLineHeight"]);
const pOptionName = setDefault(parameters["OptionName"]);
const pNoBgmFadeOut = toBoolean(parameters["NoBgmFadeOut"], false);

// ----------------------------------------------------------------------------
// Scene_Title
// ----------------------------------------------------------------------------

if (pNoBgmFadeOut) {
    let mNoFadeOut = false;

    /**
     * 【上書】画面＆音声のフェードアウト
     * ※Scene_Base.prototype.fadeOutAllをオーバライド
     */
    const _Scene_Title_fadeOutAll = Scene_Title.prototype.fadeOutAll;
    Scene_Title.prototype.fadeOutAll = function() {
        mNoFadeOut = true;
        _Scene_Title_fadeOutAll.apply(this, arguments);
        mNoFadeOut = false;
    };

    /**
     * ●ＢＧＭのフェードアウト
     */
    const _AudioManager_fadeOutBgm = AudioManager.fadeOutBgm;
    AudioManager.fadeOutBgm = function(duration) {
        // ゲーム開始時はフェードアウトしない。
        if (mNoFadeOut) {
            return;
        }
        _AudioManager_fadeOutBgm.apply(this, arguments);
    };
}

/**
 * 【上書】コマンドウィンドウの横幅
 */
Scene_Title.prototype.mainCommandWidth = function() {
    return eval(pWindowWidth);
};

/**
 * ●コマンド作成
 */
const _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
Scene_Title.prototype.createCommandWindow = function() {
    _Scene_Title_createCommandWindow.apply(this, arguments);

    // 追加コマンドが存在する場合
    if (pAddCommandList && pAddCommandList.length > 0) {
        let i = 0;
        for (const command of pAddCommandList) {
            const symbol = "addCommand" + i;
            this._commandWindow.setHandler(symbol, this.callAddCommand.bind(this, command));
            i++;
        }
    }
};

/**
 * 【独自】追加コマンドの呼び出し
 */
Scene_Title.prototype.callAddCommand = function(command) {
    // アクティブ状態を維持しておく。
    this._commandWindow.activate();

    // スクリプトの実行
    if (command.Script) {
        eval(command.Script);
    }
    
    // ＵＲＬの呼び出し
    if (command.Url) {
        const url = command.Url;
        window.open(url);

        // 既定ブラウザで起動する場合
        // ※なぜか作者環境では起動が異様に遅いので保留
        // if (Utils.isNwjs()) {
        //     const exec = require("child_process").exec;
        //     switch (process.platform) {
        //         case "win32":
        //             exec("start rundll32.exe url.dll,FileProtocolHandler \"" + url + "\"");
        //             break;
        //         default:
        //             exec("open \"" + url + "\"");
        //             break;
        //     }
        // } else {
        //     window.open(url);
        // }
    }
};

//-----------------------------------------------------------------------------
// Window_TitleCommand
//-----------------------------------------------------------------------------

if (pUseControlCharacter) {
    /**
     * 【上書】コマンド名の描画
     */
    Window_TitleCommand.prototype.drawItem = function(index) {
        const rect = this.itemLineRect(index);
        const align = this.itemTextAlign();
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));

        const text = this.commandName(index);
        let x = rect.x;
        // 中央寄せの場合はＸ座標を調整
        if (align !== "left") {
            const textWidth = this.textSizeEx(text).width;
            x += (rect.width - textWidth) / (align === "center" ? 2 : 1);
        }
        this.drawTextEx(text, x, rect.y, rect.width);
    };

    /**
     * 【上書】文字列描画処理
     * ※Window_Base.prototype.drawTextExとほぼ同じだがフォントリセットしない。
     */
    Window_TitleCommand.prototype.drawTextEx = function(text, x, y, width) {
        const textState = this.createTextState(text, x, y, width);
        this.processAllText(textState);
        return textState.outputWidth;
    };
}

/**
 * 【上書】文字の配置
 */
Window_TitleCommand.prototype.itemTextAlign = function() {
    return pTextAlign;
};

/**
 * ●コマンドの生成
 */
const _Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
Window_TitleCommand.prototype.makeCommandList = function() {
    if (pOptionName) {
        // オプションの文字列が格納されているＩＤ
        const OPTIONS_ID = 11;
        // 一時的に$dataSystemのコマンド名を書き換える
        const keepOptions = $dataSystem.terms.commands[OPTIONS_ID];
        $dataSystem.terms.commands[OPTIONS_ID] = pOptionName;
        _Window_TitleCommand_makeCommandList.apply(this, arguments);
        // 元に戻す
        $dataSystem.terms.commands[OPTIONS_ID] = keepOptions;
    } else {
        _Window_TitleCommand_makeCommandList.apply(this, arguments);
    }

    // 追加コマンドが存在する場合
    if (pAddCommandList && pAddCommandList.length > 0) {
        let i = 0;
        for (const command of pAddCommandList) {
            const symbol = "addCommand" + i;
            this._list.splice(command.Position, 0, { name: command.CommandName, symbol: symbol, enabled: true, ext: null});
            i++;
        }
        // 縦幅を再調整
        this.height = this.fittingHeight(this._list.length);
        // 追加項目を再描画
        this.createContents();
    }
};

if (pWindowLineHeight) {
    /**
     * 【上書】項目の縦幅
     */
    Window_TitleCommand.prototype.itemHeight = function() {
        return pWindowLineHeight;
    };

    /**
     * 【上書】ウィンドウの高さ計算
     */
    Scene_Title.prototype.calcWindowHeight = function(numLines, selectable) {
        // Window_TitleCommandを参照するように変更
        return Window_TitleCommand.prototype.fittingHeight(numLines);
    };
}

})();
