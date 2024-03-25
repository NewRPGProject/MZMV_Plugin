//=============================================================================
// NRP_OptionCustomize.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.00 Customize the display of the options scene.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/502777639.html
 *
 * @help Customize the display of the options scene.
 * 
 * ◆Main functions
 * - Insert a separator.
 * - Change window width.
 * - Change the number of items displayed.
 * - Change the amount of volume increase/decrease. (Default:20)
 * 
 * -------------------------------------------------------------------
 * [Notice]
 * -------------------------------------------------------------------
 * Separators are also counted internally as items.
 * Note that if multiple separators are inserted,
 * the other separators will also affect the insertion position.
 * 
 * In the list of plugins,
 * it would be better to place them below the plugins
 * that add items to the options to reduce the effect of conflicts.
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
 * @param SeparateList
 * @type struct<Separate>[]
 * @desc Defines a separator.
 * 
 * @param SeparateCenter
 * @type boolean
 * @default false
 * @desc Center the separator.
 * 
 * @param MaxVisibleCommands
 * @type number
 * @desc The number of optional commands to be displayed in the window. Default value is 12
 * 
 * @param WindowWidth
 * @type number
 * @desc Width of the options window.
 * Default value is 400.
 * 
 * @param WindowBackgroundType
 * @type select
 * @option Normal @value 0
 * @option Dimmer @value 1
 * @option Transparency @value 2
 * @default 0
 * @desc The background of the options window.
 * 
 * @param VolumeOffset
 * @type number @min 1 @max 100
 * @desc The amount by which the volume item is to be increased or decreased at one time. Default is 20.
 * 
 * @param MagnifiedVolume
 * @type number @min 1 @max 100
 * @desc Multiply the volume display only; at 5, 100% will be displayed as 500%.
 */

/*~struct~Separate:
 * @param SeparateText
 * @type string
 * @desc The content to be displayed as a separator. Control characters are also valid. (e.g.: \c[1]Separate)
 * 
 * @param Position
 * @type number
 * @default 0
 * @desc The position at which the separator is to be inserted.
 * Set 0 as the beginning.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.00 オプション画面の表示をカスタマイズ
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/502777639.html
 *
 * @help オプション画面の表示をカスタマイズします。
 * 
 * ◆主な機能
 * ・区切りを挿入
 * ・ウィンドウのサイズを変更
 * ・表示項目数を変更
 * ・音量の増減量（標準は20）を変更
 * 
 * -------------------------------------------------------------------
 * ■注意点
 * -------------------------------------------------------------------
 * 区切りも内部的には項目としてカウントされます。
 * 複数の区切りを挿入した場合は、
 * 他の区切りも挿入位置に影響するのでご注意ください。
 * 
 * プラグイン一覧では、オプションに項目を追加するプラグインよりも、
 * 下に配置したほうが競合の影響を抑えられると思います。
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
 * @param SeparateList
 * @text 区切りリスト
 * @type struct<Separate>[]
 * @desc 区切りを定義します。
 * 
 * @param SeparateCenter
 * @text 区切りを中央寄せ
 * @type boolean
 * @default false
 * @desc 区切りを中央寄せします。
 * 
 * @param MaxVisibleCommands
 * @text 表示項目数
 * @type number
 * @desc ウィンドウ内に表示するオプションのコマンド数です。
 * 初期値は12
 * 
 * @param WindowWidth
 * @text ウィンドウの横幅
 * @type number
 * @desc オプションウィンドウの横幅です。
 * 初期値は400
 * 
 * @param WindowBackgroundType
 * @text ウィンドウ背景
 * @type select
 * @option 0:ウィンドウ @value 0
 * @option 1:暗くする @value 1
 * @option 2:透明 @value 2
 * @default 0
 * @desc オプションウィンドウの背景です。
 * 
 * @param VolumeOffset
 * @text 音量の増減量
 * @type number @min 1 @max 100
 * @desc 音量項目を一度に増減させる量です。デフォルトは20です。
 * 
 * @param MagnifiedVolume
 * @text 音量表示を倍増
 * @type number @min 1 @max 100
 * @desc 音量の表示だけを倍増させます。5にすると100%が500%として表示されるようになります。
 */

/*~struct~Separate:ja
 * @param SeparateText
 * @text 区切りの文字
 * @type string
 * @desc 区切りとして表示する内容です。
 * 制御文字も有効です。（例：\c[1]区切り）
 * 
 * @param Position
 * @text 挿入位置
 * @type number
 * @default 0
 * @desc 区切りを挿入する位置です。
 * 0を先頭として設定してください。
 */

(function() {
"use strict";

/**
 * ●構造体（二重配列）をJSで扱えるように変換
 */
function parseStruct2(arg) {
    const ret = [];
    if (arg) {
        for (const str of JSON.parse(arg)) {
            ret.push(JSON.parse(str));
        }
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

const PLUGIN_NAME = "NRP_OptionCustomize";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pSeparateList = parseStruct2(parameters["SeparateList"]);
const pSeparateCenter = toBoolean(parameters["SeparateCenter"], false);
const pMaxVisibleCommands = toNumber(parameters["MaxVisibleCommands"]);
const pWindowWidth = toNumber(parameters["WindowWidth"]);
const pWindowBackgroundType = toNumber(parameters["WindowBackgroundType"], 0);
const pVolumeOffset = toNumber(parameters["VolumeOffset"]);
const pMagnifiedVolume = toNumber(parameters["MagnifiedVolume"]);

// 区切り識別用のキー
const SYMBOL_SEPARATE = "separate";

//-----------------------------------------------------------------------------
// Scene_Options
//-----------------------------------------------------------------------------

if (pWindowWidth) {
    /**
     * ●オプションウィンドウの表示領域
     */
    const _Scene_Options_optionsWindowRect = Scene_Options.prototype.optionsWindowRect;
    Scene_Options.prototype.optionsWindowRect = function() {
        const ret = _Scene_Options_optionsWindowRect.apply(this, arguments);
        ret.width = pWindowWidth;
        ret.x = (Graphics.boxWidth - ret.width) / 2;
        return ret;
    };
}

/**
 * ●コマンド数を設定
 */
const _Scene_Options_maxCommands = Scene_Options.prototype.maxCommands;
Scene_Options.prototype.maxCommands = function() {
    // 表示項目数の指定があれば優先
    if (pMaxVisibleCommands) {
        return pMaxVisibleCommands;
    }

    // 追加した区切りの数を加算
    let count = 0;
    if (pSeparateList) {
        count += pSeparateList.length;
    }
    return _Scene_Options_maxCommands.apply(this, arguments) + count;
};

/**
 * ●最大表示数を設定
 */
const _Scene_Options_maxVisibleCommands = Scene_Options.prototype.maxVisibleCommands;
Scene_Options.prototype.maxVisibleCommands = function() {
    // 表示項目数の指定があれば優先
    if (pMaxVisibleCommands) {
        return pMaxVisibleCommands;
    }
    return _Scene_Options_maxVisibleCommands.apply(this, arguments);
};

//-----------------------------------------------------------------------------
// Window_Options
//-----------------------------------------------------------------------------

const _Window_Options_initialize = Window_Options.prototype.initialize;
Window_Options.prototype.initialize = function(rect) {
    _Window_Options_initialize.apply(this, arguments);

    const symbol = this.commandSymbol(this.index());
    // 区切りの場合は次の行を設定
    if (this.isSeparateSymbol(symbol)) {
        this.smoothSelect(this._index + 1);
    }

    // ウィンドウの背景を変更。
    this.setBackgroundType(pWindowBackgroundType);
};

/**
 * ●コマンドの生成
 */
const _Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
Window_Options.prototype.makeCommandList = function() {
    _Window_Options_makeCommandList.apply(this, arguments);

    // 区切りを追加
    for (const separate of pSeparateList) {
        this._list.splice(separate.Position, 0, { name: separate.SeparateText, symbol: SYMBOL_SEPARATE, enabled: true, ext: null});
    }
};

/**
 * 【独自】シンボルが区切りかどうか？
 */
Window_Options.prototype.isSeparateSymbol = function(symbol) {
    return symbol == SYMBOL_SEPARATE;
};

const _Window_Options_statusText = Window_Options.prototype.statusText;
Window_Options.prototype.statusText = function(index) {
    const symbol = this.commandSymbol(index);
    // 区切りの場合は空白
    if (this.isSeparateSymbol(symbol)) {
        return "";
    }
    return _Window_Options_statusText.apply(this, arguments);
};

const _Window_Options_drawItem = Window_Options.prototype.drawItem;
Window_Options.prototype.drawItem = function(index) {
    const symbol = this.commandSymbol(index);
    // 区切りの場合
    if (this.isSeparateSymbol(symbol)) {
        const title = this.commandName(index);
        const rect = this.itemLineRect(index);
        this.resetTextColor();
        this.changePaintOpacity(this.isCommandEnabled(index));

        let x = rect.x;

        // 中央寄せの場合はＸ座標を調整
        if (pSeparateCenter) {
            const textWidth = this.textSizeEx(title).width;
            x += (rect.width - textWidth) / 2;
        }

        // drawTextExによってタイトルを描画（制御文字を使用可能に）
        this.drawTextEx(title, x, rect.y, rect.width);
        return;
    }
    _Window_Options_drawItem.apply(this, arguments);
};

const _Window_Options_processOk = Window_Options.prototype.processOk;
Window_Options.prototype.processOk = function() {
    const symbol = this.commandSymbol(this.index());
    // 区切りの場合は何もしない
    if (this.isSeparateSymbol(symbol)) {
        return;
    }
    _Window_Options_processOk.apply(this, arguments);
};

const _Window_Options_cursorRight = Window_Options.prototype.cursorRight;
Window_Options.prototype.cursorRight = function() {
    const symbol = this.commandSymbol(this.index());
    // 区切りの場合は何もしない
    if (this.isSeparateSymbol(symbol)) {
        return;
    }
    _Window_Options_cursorRight.apply(this, arguments);
};

const _Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
Window_Options.prototype.cursorLeft = function() {
    const symbol = this.commandSymbol(this.index());
    // 区切りの場合は何もしない
    if (this.isSeparateSymbol(symbol)) {
        return;
    }
    _Window_Options_cursorLeft.apply(this, arguments);
};

/*
 * メソッドが未定義の場合は事前に定義
 * ※これをしておかないと以後の親クラスへの追記が反映されない。
 */
if (Window_Options.prototype.cursorDown == Window_Selectable.prototype.cursorDown) {
    Window_Options.prototype.cursorDown = function(wrap) {
        return Window_Selectable.prototype.cursorDown.apply(this, arguments);
    }
}
if (Window_Options.prototype.cursorUp == Window_Selectable.prototype.cursorUp) {
    Window_Options.prototype.cursorUp = function(wrap) {
        return Window_Selectable.prototype.cursorUp.apply(this, arguments);
    }
}

const _Window_Options_cursorDown = Window_Options.prototype.cursorDown;
Window_Options.prototype.cursorDown = function(wrap) {
    const keepIndex = this.index();
    _Window_Options_cursorDown.apply(this, arguments);
    const symbol = this.commandSymbol(this.index());
    // 区切りの場合はスルーして次へ
    if (this.isSeparateSymbol(symbol)) {
        // 先頭の場合はスクロールも先頭に。
        // ※下からループしてきた場合を想定
        if (this.index() == 0) {
            this.scrollTo(this._scrollX, 0);
        }

        let index = this.index() + 1;
        // 一番下へ到達した場合はループ
        if (index >= this._list.length) {
            // 端で停止する場合はインデックスを戻す。
            if (!wrap) {
                this.smoothSelect(keepIndex);
                return;
            }
            index = 0;
        }
        this.smoothSelect(index);
        return;
    }
};

const _Window_Options_cursorUp = Window_Options.prototype.cursorUp;
Window_Options.prototype.cursorUp = function(wrap) {
    const keepIndex = this.index();
    _Window_Options_cursorUp.apply(this, arguments);
    const symbol = this.commandSymbol(this.index());
    // 区切りの場合はスルーして前へ
    if (this.isSeparateSymbol(symbol)) {
        let index = this.index() - 1;
        // 一番上へ到達した場合はループ
        if (index < 0) {
            // 端で停止する場合はインデックスを戻す。
            if (!wrap) {
                this.smoothSelect(keepIndex);
                return;
            }
            index = this._list.length - 1;
        }
        this.smoothSelect(index);
        return;
    }
};

/*
 * メソッドが未定義の場合は事前に定義
 * ※これをしておかないと以後の親クラスへの追記が反映されない。
 */
if (Window_Options.prototype.drawItemBackground == Window_Selectable.prototype.drawItemBackground) {
    Window_Options.prototype.drawItemBackground = function(index) {
        return Window_Selectable.prototype.drawItemBackground.apply(this, arguments);
    }
}

/**
 * ●黒背景の描画
 */
const _Window_Options_drawItemBackground = Window_Options.prototype.drawItemBackground;
Window_Options.prototype.drawItemBackground = function(index) {
    const symbol = this.commandSymbol(index);
    // 区切りの場合は無視
    if (this.isSeparateSymbol(symbol)) {
        return;
    }
    _Window_Options_drawItemBackground.apply(this, arguments);
};

/*
 * メソッドが未定義の場合は事前に定義
 * ※これをしておかないと以後の親クラスへの追記が反映されない。
 */
if (Window_Options.prototype.refreshCursor == Window_Selectable.prototype.refreshCursor) {
    Window_Options.prototype.refreshCursor = function() {
        return Window_Selectable.prototype.refreshCursor.apply(this, arguments);
    }
}

/**
 * ●選択行のカーソル更新
 */
const _Window_Options_refreshCursor = Window_Options.prototype.refreshCursor;
Window_Options.prototype.refreshCursor = function() {
    if (this.index() >= 0) {
        const symbol = this.commandSymbol(this.index());
        // 区切りの場合はクリア
        if (this.isSeparateSymbol(symbol)) {
            this.setCursorRect(0, 0, 0, 0);
            return;
        }
    }
    _Window_Options_refreshCursor.apply(this, arguments);
};

if (pVolumeOffset) {
    /**
     * 【上書】音量の増減単位
     */
    Window_Options.prototype.volumeOffset = function() {
        return pVolumeOffset;
    };
}

if (pMagnifiedVolume) {
    /**
     * 【上書】音量表示の倍増
     */
    Window_Options.prototype.volumeStatusText = function(value) {
        return value * pMagnifiedVolume + "%";
    };
}

})();
