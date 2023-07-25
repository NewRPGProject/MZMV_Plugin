//=============================================================================
// NRP_MessageWindow.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.011 Adjust the message window.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/492543897.html
 *
 * @help Make various adjustments to the message window.
 * For example, you can adjust the size and position of the window.
 * 
 * -------------------------------------------------------------------
 * [3-line Message Display]
 * -------------------------------------------------------------------
 * For example, a larger font and a 3-line display of the message
 * will make the text easier to read.
 * 
 * As you can find out, most JRPGs and ADVs nowadays
 * have a style of 2 to 3 lines plus a name field.
 * The MZ default style of 4 lines + name field is quite a lot of text,
 * and the text tends to be small, making it difficult to read.
 * It is not recommended to follow the default style without thinking.
 * 
 * The key to this is to make the "LineHeight" wider.
 * 
 * -------------------------------------------------------------------
 * [Variable Window Size]
 * -------------------------------------------------------------------
 * Formulas can be used for most items.
 * For example, if "WindowHeight" is set to "$gameVariables.value(1)",
 * the height of the message window will change according to
 * the value of variable 1.
 * 
 * This is useful, for example, when you want to have
 * two lines of text in a scene displaying a large image.
 * 
 * -------------------------------------------------------------------
 * [Mask Image Function]
 * -------------------------------------------------------------------
 * By setting "MaskImage",
 * you can finely adjust the transparency of the window.
 * For example, you can increase
 * the transparency only on the right side of the window.
 * White areas of the mask image
 * are opaque and black areas are transparent.
 * ※See the sample image for details.
 * 
 * Note that this does not work in RPG Maker MV for some reason,
 * so it is for MZ only.
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
 * @param <MessageWindow>
 * 
 * @param WindowWidth
 * @parent <MessageWindow>
 * @default Graphics.boxWidth
 * @desc The width of the message window.
 * Default: Graphics.boxWidth
 * 
 * @param WindowHeight
 * @parent <MessageWindow>
 * @default this.fittingHeight(4) + 8
 * @desc The height of the message window.
 * Default: this.fittingHeight(4) + 8
 * 
 * @param WindowX
 * @parent <MessageWindow>
 * @desc X coordinate for displaying the message window.
 * 
 * @param WindowY
 * @parent <MessageWindow>
 * @default (this._positionType * (Graphics.boxHeight - this.height)) / 2
 * @desc Y coordinate for displaying the message window.
 * Default: (this._positionType * (Graphics.boxHeight - this.height)) / 2
 * 
 * @param LineHeight
 * @parent <MessageWindow>
 * @desc The height per line of the message.
 * Default: 36
 * 
 * @param AdjustMessageX
 * @parent <MessageWindow>
 * @type number
 * @desc Adjust the X coordinate of the message.
 * 
 * @param AdjustMessageY
 * @parent <MessageWindow>
 * @type number
 * @desc Adjust the Y coordinate of the message.
 * 
 * @param MessageFontSize
 * @parent <MessageWindow>
 * @desc The font size of the message.
 * 
 * @param WindowOpacity
 * @parent <MessageWindow>
 * @desc Opacity of the message window.
 * 255 makes it completely opaque.
 * 
 * @param MaskImage
 * @parent <MessageWindow>
 * @type file
 * @dir img/system
 * @desc A mask image that applies semi-transparent processing to the window. For MZ only.
 * 
 * @param NoMaskOpacity
 * @parent MaskImage
 * @desc The opacity of the message window if the mask could not be applied to it.
 * 
 * @param FixIconY
 * @parent <MessageWindow>
 * @type boolean
 * @default true
 * @desc Fix a problem in which the Y coordinate of an icon is misaligned when the height of a line is changed.
 * 
 * @param <NameBoxWindow>
 * @desc This item is related to the name field.
 * This field is invalid because it does not exist in RPG Maker MV.
 * 
 * @param NameBoxAdjustX
 * @parent <NameBoxWindow>
 * @desc X-coordinate correction value for the name field.
 * 
 * @param NameBoxAdjustY
 * @parent <NameBoxWindow>
 * @desc Y-coordinate correction value for the name field.
 * 
 * @param NameBoxFontSize
 * @parent <NameBoxWindow>
 * @desc The font size of the name field.
 * 
 * @param NameBoxOpacity
 * @parent <NameBoxWindow>
 * @desc Opacity of the name field.
 * 255 makes it completely opaque.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.011 メッセージウィンドウを調整する。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/492543897.html
 *
 * @help メッセージウィンドウに対して様々な調整を行います。
 * 例えば、ウィンドウのサイズや位置を調整できます。
 * 
 * -------------------------------------------------------------------
 * ■メッセージ表示の３行化
 * -------------------------------------------------------------------
 * 例えば、フォントを大きくしてメッセージを３行表示にすれば、
 * 文章を読みやすくすることができます。
 * 
 * 調べてみれば分かりますが、今時のＪＲＰＧやＡＤＶは
 * ２～３行＋名前欄というスタイルが主流です。
 * ＭＺデフォルトの４行＋名前欄というスタイルは、
 * かなり文章量が多く、文字も小さくなりがちなので読みづらいです。
 * 何も考えず初期状態を踏襲することはあまりオススメしません。
 * 
 * この際、『一行の縦幅』を広くすることがポイントです。
 * 特に漢字にルビを振るプラグインと併用する場合は、
 * 行間を広めに取ることをオススメします。
 * 
 * -------------------------------------------------------------------
 * ■ウィンドウサイズの可変化
 * -------------------------------------------------------------------
 * ほとんどの項目で数式が使用可能です。
 * 例えば『ウィンドウの縦幅』を「$gameVariables.value(1)」にすれば、
 * 変数１の値によって、メッセージウィンドウの縦幅が変化するようになります。
 * 
 * 例えば「一枚絵を表示するシーンでは文章を２行にしたい」
 * といった場合に便利です。
 * 
 * -------------------------------------------------------------------
 * ■マスク画像機能
 * -------------------------------------------------------------------
 * 『マスク画像』を設定することで、ウィンドウの透明度を細かく設定できます。
 * 例えば、ウィンドウの右側だけ透明度を上げるといった調整ができます。
 * マスク画像の白い部分が不透明で黒い部分が透明となります。
 * ※詳細はサンプル画像をご覧ください。
 * 
 * なお、ＲＰＧツクールＭＶではなぜか機能しないのでＭＺ専用です。
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
 * @param <MessageWindow>
 * @text ＜メッセージウィンドウ＞
 * 
 * @param WindowWidth
 * @parent <MessageWindow>
 * @text ウィンドウの横幅
 * @default Graphics.boxWidth
 * @desc メッセージウィンドウの横幅です。
 * 初期値は「Graphics.boxWidth」です。
 * 
 * @param WindowHeight
 * @parent <MessageWindow>
 * @text ウィンドウの縦幅
 * @default this.fittingHeight(4) + 8
 * @desc メッセージウィンドウの縦幅です。
 * 初期値は「this.fittingHeight(4) + 8」です。
 * 
 * @param WindowX
 * @parent <MessageWindow>
 * @text ウィンドウのＸ座標
 * @desc メッセージウィンドウを表示するＸ座標です。
 * 
 * @param WindowY
 * @parent <MessageWindow>
 * @text ウィンドウのＹ座標
 * @default (this._positionType * (Graphics.boxHeight - this.height)) / 2
 * @desc メッセージウィンドウを表示するＹ座標です。
 * 初期値：(this._positionType * (Graphics.boxHeight - this.height)) / 2
 * 
 * @param LineHeight
 * @parent <MessageWindow>
 * @text 一行の縦幅
 * @desc 文章の一行当たりの縦幅です。
 * 初期値は36です。
 * 
 * @param AdjustMessageX
 * @parent <MessageWindow>
 * @text 文章のＸ座標調整
 * @type number
 * @desc 文章のＸ座標を調整します。
 * 
 * @param AdjustMessageY
 * @parent <MessageWindow>
 * @text 文章のＹ座標調整
 * @type number
 * @desc 文章のＹ座標を調整します。
 * 
 * @param MessageFontSize
 * @parent <MessageWindow>
 * @text 文章のフォントサイズ
 * @desc 文章のフォントサイズです。
 * 
 * @param WindowOpacity
 * @parent <MessageWindow>
 * @text ウィンドウの不透明度
 * @desc メッセージウィンドウの不透明度です。
 * 255で完全な不透明になります。
 * 
 * @param MaskImage
 * @parent <MessageWindow>
 * @text マスク画像
 * @type file
 * @dir img/system
 * @desc ウィンドウに半透明処理を施すマスク画像です。
 * この機能はＭＺ専用です。
 * 
 * @param NoMaskOpacity
 * @parent MaskImage
 * @text マスク対象外の不透明度
 * @desc メッセージウィンドウにマスクを適用できなかった場合の不透明度です。
 * 
 * @param FixIconY
 * @parent <MessageWindow>
 * @text アイコンのＹ座標修正
 * @type boolean
 * @default true
 * @desc 一行の縦幅を変更した時に、アイコンのＹ座標がズレる問題を修正します。
 * 
 * @param <NameBoxWindow>
 * @text ＜名前欄＞
 * @desc 名前欄に関する項目です。
 * ツクールＭＶでは存在しないため無効です。
 * 
 * @param NameBoxAdjustX
 * @parent <NameBoxWindow>
 * @text 名前欄のＸ座標補正
 * @desc 名前欄のＸ座標補正値です。
 * 
 * @param NameBoxAdjustY
 * @parent <NameBoxWindow>
 * @text 名前欄のＹ座標補正
 * @desc 名前欄のＹ座標補正値です。
 * 
 * @param NameBoxFontSize
 * @parent <NameBoxWindow>
 * @text 名前欄のフォントサイズ
 * @desc 名前欄のフォントサイズです。
 * 
 * @param NameBoxOpacity
 * @parent <NameBoxWindow>
 * @text 名前欄の不透明度
 * @desc 名前欄の不透明度です。
 * 255で完全な不透明になります。
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

const PLUGIN_NAME = "NRP_MessageWindow";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pWindowWidth = setDefault(parameters["WindowWidth"]);
const pWindowHeight = setDefault(parameters["WindowHeight"]);
const pWindowX = setDefault(parameters["WindowX"]);
const pWindowY = setDefault(parameters["WindowY"]);
const pLineHeight = setDefault(parameters["LineHeight"]);
const pAdjustMessageX = toNumber(parameters["AdjustMessageX"], 0);
const pAdjustMessageY = toNumber(parameters["AdjustMessageY"], 0);
const pMessageFontSize = setDefault(parameters["MessageFontSize"]);
const pWindowOpacity = setDefault(parameters["WindowOpacity"]);
const pMaskImage = setDefault(parameters["MaskImage"]);
const pNoMaskOpacity = setDefault(parameters["NoMaskOpacity"]);
const pFixIconY = toBoolean(parameters["FixIconY"]);
const pNameBoxAdjustX = setDefault(parameters["NameBoxAdjustX"]);
const pNameBoxAdjustY = setDefault(parameters["NameBoxAdjustY"]);
const pNameBoxFontSize = setDefault(parameters["NameBoxFontSize"]);
const pNameBoxOpacity = setDefault(parameters["NameBoxOpacity"]);

// ----------------------------------------------------------------------------
// Scene_Message
// ----------------------------------------------------------------------------

// ＭＺのみのクラスなので存在しない場合は無視
if (typeof Scene_Message !== "undefined") {
    /**
     * ●メッセージウィンドウのサイズ＆配置
     */
    Scene_Message.prototype.messageWindowRect = function() {
        // 横幅
        let ww = Graphics.boxWidth;
        if (pWindowWidth != null) {
            // とりあえず最大領域を確保しておく。
            // ※値が小さいとはみ出した文字が表示されないため。
            ww = Graphics.width;
        }
        // 縦幅
        let wh = this.calcWindowHeight(4, false) + 8;
        if (pWindowHeight != null) {
            // ダミーのウィンドウを定義して計算
            // ※この値は選択肢を呼んだ場合に参照される。
            const dummyWindow = new Window_Message(new Rectangle(0,0,0,0));
            wh = dummyWindow.calcWindowHeight();
        }
        // 座標はそのまま（updatePlacementで処理）
        const wx = (Graphics.boxWidth - ww) / 2;
        const wy = 0;
        return new Rectangle(wx, wy, ww, wh);
    };
}

// /**
//  * ●ウィンドウの生成
//  * ※PicturePriorityCustomize.jsと併用する場合は重複につき注釈化
//  * ※他にも競合するプラグインがあるので保留
//  */
// const _Scene_Message_createAllWindows = Scene_Message.prototype.createAllWindows;
// Scene_Message.prototype.createAllWindows = function() {
//     _Scene_Message_createAllWindows.apply(this, arguments);
//
//     //--------------------------------------------------------------------
//     // 名前欄の位置変更時、下に隠れたメッセージウィンドウが消えないよう調整
//     // ※WindowLayer.prototype.renderの挙動によって、
//     // 　ウィンドウは重ねられない仕様なので、Scene_Message直下に移動する。
//     //--------------------------------------------------------------------
//     // メッセージウィンドウ
//     this.addChild(this._windowLayer.removeChild(this._messageWindow));
//     // 名前ウィンドウ
//     this.addChild(this._windowLayer.removeChild(this._nameBoxWindow));
//     // ＵＩエリアの幅を考慮して加算
//     // this._messageWindow.x += this._windowLayer.x;
//     // this._nameBoxWindow.x += this._windowLayer.x;
// };

// ----------------------------------------------------------------------------
// Window_Message
// ----------------------------------------------------------------------------

let mInitialHeight = 0;

/**
 * ●メッセージウィンドウの初期化
 */
const _Window_Message_initialize = Window_Message.prototype.initialize;
Window_Message.prototype.initialize = function(rect) {
    _Window_Message_initialize.apply(this, arguments);

    // 不透明度
    if (pWindowOpacity != null) {
        this.backOpacity = eval(pWindowOpacity);
    }

    // マスク
    if (pMaskImage != null) {
        this._maskSprite = new Sprite();
        this._maskSprite.bitmap = ImageManager.loadSystem(pMaskImage);
        this.addChild(this._maskSprite);
        this.backSprite().mask = this._maskSprite;
    }

    // メッセージ用スプライトを位置調整
    this.contentsSprite().x += pAdjustMessageX;
    this.contentsSprite().y += pAdjustMessageY;

    mInitialHeight = this.height;
};

/*
 * Window_Message.prototype.createContentsが未定義の場合は事前に定義
 * ※これをしておかないと以後のWindow_Base側への追記が反映されない。
 */
if (Window_Message.prototype.createContents == Window_Base.prototype.createContents) {
    Window_Message.prototype.createContents = function() {
        Window_Base.prototype.createContents.apply(this, arguments);
    }
}

/**
 * ●コンテンツ作成
 */
const _Window_Message_createContents = Window_Message.prototype.createContents;
Window_Message.prototype.createContents = function() {
    _Window_Message_createContents.apply(this, arguments);

    // 縦幅が変更されている場合はマスクの対象外なのでクリアする。
    // ※想定の縦幅以外はうまく表示できないため
    if (this._maskSprite && mInitialHeight != this.height) {
        this.backSprite().mask = null;
        this._maskSprite.visible = false;

        // マスク対象外の不透明度
        if (pNoMaskOpacity != null) {
            this.backOpacity = eval(pNoMaskOpacity);
        }
    }
};

/**
 * ●メッセージウィンドウの配置
 * ※Ｙ座標のみウィンドウ位置で変動するため、ここで制御されている。
 */
const _Window_Message_updatePlacement = Window_Message.prototype.updatePlacement;
Window_Message.prototype.updatePlacement = function() {
    let changeFlg = false;

    // ※サイズを参照して配置を決めているため、先に設定しておく。
    // 横幅の更新
    if (pWindowWidth != null) {
        const width = eval(pWindowWidth);
        if (this.width != width) {
            this.width = width;
            changeFlg = true;
        }
    }
    // 縦幅の更新
    if (pWindowHeight != null) {
        const height = this.calcWindowHeight();
        if (this.height != height) {
            this.height = height;
            changeFlg = true;
        }
    }

    // いずれかを更新した場合
    if (changeFlg) {
        // 描画領域を更新
        // これをやらないと文字が表示されなくなる。
        this.createContents();
        if (Utils.RPGMAKER_NAME == "MZ") {
            // サイズを文章の表示領域へ反映
            // これをやらないと改ページ判定がおかしくなる。
            this.contents.resize(this.width, this.height);
        }
    }

    // 元の処理
    _Window_Message_updatePlacement.apply(this, arguments);

    // Ｘ座標
    if (pWindowX != null) {
        this.x = eval(pWindowX);
    }

    // Ｙ座標
    if (pWindowY != null) {
        this.y = eval(pWindowY);
    }
};

/**
 * 【独自】ウィンドウの高さを計算する。
 */
Window_Message.prototype.calcWindowHeight = function() {
    return eval(pWindowHeight);
};

if (pLineHeight != null) {
    /**
     * ●メッセージウィンドウの一行当たりの縦幅
     */
    Window_Message.prototype.lineHeight = function() {
        return eval(pLineHeight);
    };
}

// Window_Message.prototype.needsNewPage = function(textState) {
//     alert(textState.y + textState.height + " > " + this.contents.height);

//     return (
//         !this.isEndOfText(textState) &&
//         textState.y + textState.height > this.contents.height
//     );
// };

/**
 * ●アイコンのＹ座標修正
 */
if (pFixIconY) {
    /*
     * Window_Messageのメソッドが未定義の場合は事前に定義
     * ※これをしておかないと以後のWindow_Base側への追記が反映されない。
     */
    if (Window_Message.prototype.processDrawIcon == Window_Base.prototype.processDrawIcon) {
        Window_Message.prototype.processDrawIcon = function(iconIndex, textState) {
            Window_Base.prototype.processDrawIcon.apply(this, arguments);
        }
    }

    /**
     * ●アイコンの描画
     */
    const _Window_Message_processDrawIcon = Window_Message.prototype.processDrawIcon;
    Window_Message.prototype.processDrawIcon = function(iconIndex, textState) {
        // 描画しない場合は処理終了
        if (!textState.drawing) {
            _Window_Message_processDrawIcon.apply(this, arguments);
            return;
        }

        // アイコンのＹ座標の算出に縦幅を考慮
        const iconY = textState.y + (this.lineHeight() - ImageManager.iconHeight) / 2;
        this.drawIcon(iconIndex, textState.x + 2, iconY);
        textState.x += ImageManager.iconWidth + 4;
    };
}

if (pMessageFontSize != null) {
    /*
     * Window_Messageのメソッドが未定義の場合は事前に定義
     * ※これをしておかないと以後のWindow_Base側への追記が反映されない。
     */
    if (Window_Message.prototype.resetFontSettings == Window_Base.prototype.resetFontSettings) {
        Window_Message.prototype.resetFontSettings = function() {
            Window_Base.prototype.resetFontSettings.apply(this, arguments);
        }
    }

    /**
     * ●フォントサイズの設定
     */
    const _Window_Message_resetFontSettings = Window_Message.prototype.resetFontSettings;
    Window_Message.prototype.resetFontSettings = function() {
        _Window_Message_resetFontSettings.apply(this, arguments);

        this.contents.fontSize = eval(pMessageFontSize);
    };
}

if (pMaskImage != null) {
    /*
    * Window_Messageのメソッドが未定義の場合は事前に定義
    */
    if (Window_Message.prototype.showBackgroundDimmer == Window_Base.prototype.showBackgroundDimmer) {
        Window_Message.prototype.showBackgroundDimmer = function() {
            Window_Base.prototype.showBackgroundDimmer.apply(this, arguments);
        }
    }

    /**
     * ●暗いウィンドウの表示
     */
    const _Window_Message_showBackgroundDimmer = Window_Message.prototype.showBackgroundDimmer;
    Window_Message.prototype.showBackgroundDimmer = function() {
        this.backSprite().mask = null;
        this._maskSprite.visible = false;

        _Window_Message_showBackgroundDimmer.apply(this, arguments);
    };

    /*
    * Window_Messageのメソッドが未定義の場合は事前に定義
    */
    if (Window_Message.prototype.hideBackgroundDimmer == Window_Base.prototype.hideBackgroundDimmer) {
        Window_Message.prototype.hideBackgroundDimmer = function() {
            Window_Base.prototype.hideBackgroundDimmer.apply(this, arguments);
        }
    }

    /**
     * ●暗いウィンドウの非表示
     */
    const _Window_Message_hideBackgroundDimmer = Window_Message.prototype.hideBackgroundDimmer;
    Window_Message.prototype.hideBackgroundDimmer = function() {
        this.backSprite().mask = this._maskSprite;
        this._maskSprite.visible = true;

        _Window_Message_hideBackgroundDimmer.apply(this, arguments);
    };
}

/**
 * 【独自】文字描画用のスプライトを取得
 */
Window_Message.prototype.contentsSprite = function() {
    // ＭＺ用
    if (this._contentsSprite) {
        return this._contentsSprite;
    // ＭＶ用
    } else if (this._windowContentsSprite) {
        return this._windowContentsSprite;
    }
}

/**
 * 【独自】背景描画用のスプライトを取得
 */
Window_Message.prototype.backSprite = function() {
    // ＭＺ用
    if (this._backSprite) {
        return this._backSprite;
    // ＭＶ用
    } else if (this._windowBackSprite) {
        return this._windowBackSprite;
    }
}

// ----------------------------------------------------------------------------
// Window_NameBox
// ----------------------------------------------------------------------------

// ＭＺのみのクラスなので存在しない場合は無視
if (typeof Window_NameBox !== "undefined") {
    /**
     * ●名前欄の初期化
     */
    const _Window_NameBox_initialize = Window_NameBox.prototype.initialize;
    Window_NameBox.prototype.initialize = function(rect) {
        _Window_NameBox_initialize.apply(this, arguments);

        // 不透明度
        if (pNameBoxOpacity != null) {
            this.backOpacity = eval(pNameBoxOpacity);
        }
    };

    /**
     * ●名前欄の配置
     */
    const _Window_NameBox_updatePlacement = Window_NameBox.prototype.updatePlacement;
    Window_NameBox.prototype.updatePlacement = function() {
        _Window_NameBox_updatePlacement.apply(this, arguments);

        // Ｘ座標補正
        if (pNameBoxAdjustX != null) {
            this.x += eval(pNameBoxAdjustX);
        }
        // Ｙ座標補正
        if (pNameBoxAdjustY != null) {
            this.y += eval(pNameBoxAdjustY);
        }
    };

    if (pNameBoxFontSize != null) {
        /*
        * Window_NameBoxのメソッドが未定義の場合は事前に定義
        * ※これをしておかないと以後のWindow_Base側への追記が反映されない。
        */
        if (Window_NameBox.prototype.resetFontSettings == Window_Base.prototype.resetFontSettings) {
            Window_NameBox.prototype.resetFontSettings = function() {
                Window_Base.prototype.resetFontSettings.apply(this, arguments);
            }
        }

        /**
         * ●フォントサイズの設定
         */
        const _Window_NameBox_resetFontSettings = Window_Message.prototype.resetFontSettings;
        Window_NameBox.prototype.resetFontSettings = function() {
            _Window_NameBox_resetFontSettings.apply(this, arguments);

            this.contents.fontSize = eval(pNameBoxFontSize);
        };
    }
}

})();
