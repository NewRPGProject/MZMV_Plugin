//=============================================================================
// NRP_MessageShadow.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.02 Add shadows to messages.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/491354306.html
 *
 * @help Add shadows to messages.
 * 
 * For example, when combined with NRP_MessagePicture.js,
 * it is intended to make it easier to see messages
 * that are displayed above the picture.
 * 
 * Note that the standard message outline is used to draw the shadows.
 * 
 * -------------------------------------------------------------------
 * [About the Targets]
 * -------------------------------------------------------------------
 * You can change the range of shadows applied to the message.
 * Please note that by default, it is applied to all characters.
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
 * @param DrawDefaultOutline
 * @type boolean
 * @default true
 * @desc Leave the outline of the message present in the default.
 * 
 * @param ShadowAdjustSize
 * @type number
 * @default 0
 * @desc The size of the shadow of the character. 0 is the same as the character itself.
 * 
 * @param ShadowAdjustX
 * @type number @min -99 @max 99
 * @default 4
 * @desc The difference value of the X coordinate of the character shadow.
 * 
 * @param ShadowAdjustY
 * @type number @min -99 @max 99
 * @default 4
 * @desc The difference value of the Y coordinate of the character shadow.
 * 
 * @param ShadowColor
 * @type string
 * @default #00000080
 * @desc The RGBA values (red, green, blue, opacity) of the shadow color of the character. Input in hexadecimal(00~FF).
 * 
 * @param <Target>
 * 
 * @param All
 * @parent <Target>
 * @type boolean
 * @default true
 * @desc Shadow all characters. If this is on, all subsequent items are also treated as on.
 * 
 * @param AllWindows
 * @parent <Target>
 * @type boolean
 * @default true
 * @desc Shadows the message in all windows.
 * However, some status systems are not reflected.
 * 
 * @param MessageWindow
 * @parent <Target>
 * @type boolean
 * @default true
 * @desc Shadows the message in the message window.
 * 
 * @param NameWindow
 * @parent <Target>
 * @type boolean
 * @default true
 * @desc Shadow the message in the name window.
 * Note that this is not meaningful in MV.
 * 
 * @param StatusName
 * @parent <Target>
 * @type boolean
 * @default true
 * @desc Shadow the status actor name.
 * 
 * @param StatusGauges
 * @parent <Target>
 * @type boolean
 * @default true
 * @desc Shadow the status gauge items (labels).
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.02 文章に影をつける。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/491354306.html
 *
 * @help 文章に影をつけます。
 * 
 * 例えば、立ち絵プラグイン（NRP_MessagePicture.js）と組み合わせた際に、
 * ピクチャより上に表示されている文字を
 * 見やすくするといった使い方を想定しています。
 * 
 * なお、影の描画には標準に存在する文字の縁取りを利用しています。
 * 
 * -------------------------------------------------------------------
 * ■対象について
 * -------------------------------------------------------------------
 * 文字に影をつける範囲を変更可能です。
 * 初期状態では全ての文字に適用されますので、ご注意ください。
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
 * @param DrawDefaultOutline
 * @text 標準の縁取りを残す
 * @type boolean
 * @default true
 * @desc 標準に存在する文字の縁取りを残します。
 * 
 * @param ShadowAdjustSize
 * @text 影のサイズ調整
 * @type number
 * @default 0
 * @desc 文字の影のサイズです。0で文字本体と同じになります。
 * 
 * @param ShadowAdjustX
 * @text 影のＸ座標調整
 * @type number @min -99 @max 99
 * @default 4
 * @desc 文字の影のＸ座標の差分値です。
 * 
 * @param ShadowAdjustY
 * @text 影のＹ座標調整
 * @type number @min -99 @max 99
 * @default 4
 * @desc 文字の影のＹ座標の差分値です。
 * 
 * @param ShadowColor
 * @text 影の色
 * @type string
 * @default #00000080
 * @desc 文字の影色のＲＧＢＡ値（赤、緑、青、不透明度）です。
 * 各色を00~FFまでの16進数で入力してください。
 * 
 * @param <Target>
 * @text ＜対象＞
 * 
 * @param All
 * @parent <Target>
 * @text 全て
 * @type boolean
 * @default true
 * @desc 全ての文字に影をつけます。
 * これがオンの場合は以降の項目も全てオンとして扱います。
 * 
 * @param AllWindows
 * @parent <Target>
 * @text 全ウィンドウ
 * @type boolean
 * @default true
 * @desc 全ウィンドウの文字に影をつけます。
 * ただし、ステータス系には反映されないものがあります。
 * 
 * @param MessageWindow
 * @parent <Target>
 * @text メッセージウィンドウ
 * @type boolean
 * @default true
 * @desc メッセージウィンドウの文字に影をつけます。
 * 
 * @param NameWindow
 * @parent <Target>
 * @text 名前ウィンドウ
 * @type boolean
 * @default true
 * @desc 名前ウィンドウの文字に影をつけます。
 * なお、ＭＶでは意味がありません。
 * 
 * @param StatusName
 * @parent <Target>
 * @text ステータスの名前
 * @type boolean
 * @default true
 * @desc ステータスのアクター名に影をつけます。
 * 
 * @param StatusGauges
 * @parent <Target>
 * @text ステータスのゲージ項目
 * @type boolean
 * @default true
 * @desc ステータスのゲージ項目（ラベル）に影をつけます。
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

const PLUGIN_NAME = "NRP_MessageShadow";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pDrawDefaultOutline = toBoolean(parameters["DrawDefaultOutline"], true);
const pShadowAdjustSize = toNumber(parameters["ShadowAdjustSize"], 3);
const pShadowAdjustX = toNumber(parameters["ShadowAdjustX"], 0);
const pShadowAdjustY = toNumber(parameters["ShadowAdjustY"], 0);
const pShadowColor = parameters["ShadowColor"];
// 対象
const pAll = toBoolean(parameters["All"]);
const pAllWindows = toBoolean(parameters["AllWindows"]);
const pMessageWindow = toBoolean(parameters["MessageWindow"]);
const pNameWindow = toBoolean(parameters["NameWindow"]);
const pStatusName = toBoolean(parameters["StatusName"]);
const pStatusGauges = toBoolean(parameters["StatusGauges"]);

// ----------------------------------------------------------------------------
// Bitmap
// ----------------------------------------------------------------------------

/**
 * ●縁取りの描画
 */
const _Bitmap__drawTextOutline = Bitmap.prototype._drawTextOutline;
Bitmap.prototype._drawTextOutline = function(text, tx, ty, maxWidth) {
    // 処理対象外の場合は終了
    if (!this._isMessageShadow) {
        _Bitmap__drawTextOutline.call(this, text, tx, ty, maxWidth);
        return;
    }

    // 標準の縁取りを描画
    if (pDrawDefaultOutline) {
        _Bitmap__drawTextOutline.call(this, text, tx, ty, maxWidth);
    }

    // 変更前の色調と幅を保持
    const keepColor = this.outlineColor;
    const keepWidth = this.outlineWidth;

    // 色調と幅を一時的に変更
    this.outlineColor = pShadowColor;
    this.outlineWidth = pShadowAdjustSize;

    // 変更を反映して描画
    _Bitmap__drawTextOutline.call(this, text, tx + pShadowAdjustX, ty + pShadowAdjustY, maxWidth);

    // 色調と幅を戻す。
    this.outlineColor = keepColor;
    this.outlineWidth = keepWidth;
};

/**
 * 【独自】文字に影を表示するかどうか？
 */
Bitmap.prototype.setMessageShadow = function(flg) {
    this._isMessageShadow = flg;
}

if (pAll) {
    /**
     * ●bitmapへの文字描画
     */
    const _Bitmap_drawText = Bitmap.prototype.drawText;
    Bitmap.prototype.drawText = function(text, x, y, maxWidth, lineHeight, align) {
        // 文字の影表示を設定
        this.setMessageShadow(true);
        _Bitmap_drawText.apply(this, arguments);
    }
}

// ----------------------------------------------------------------------------
// Window_Base
// ----------------------------------------------------------------------------

/**
 * ●描画内容の基盤生成
 * ※文字の影表示を設定
 */
const _Window_Base_createContents = Window_Base.prototype.createContents;
Window_Base.prototype.createContents = function() {
    _Window_Base_createContents.apply(this, arguments);

    // 全てのウィンドウが対象の場合
    if (pAllWindows) {
        this.contents.setMessageShadow(true);

    // それ以外の場合
    } else {
        // メッセージウィンドウ
        if (pMessageWindow && this instanceof Window_Message) {
            this.contents.setMessageShadow(true);

        // 名前ウィンドウ
        } else if (pNameWindow && this instanceof Window_NameBox) {
            this.contents.setMessageShadow(true);
        }
    }
};

// ----------------------------------------------------------------------------
// Sprite_Name (MZ)
// ----------------------------------------------------------------------------

if (pStatusName && typeof Sprite_Name != "undefined") {
    /**
     * ●bitmapの生成
     */
    const _Sprite_Name_createBitmap = Sprite_Name.prototype.createBitmap;
    Sprite_Name.prototype.createBitmap = function() {
        _Sprite_Name_createBitmap.apply(this, arguments);

        // 文字の影表示を設定
        this.bitmap.setMessageShadow(true);
    };
}

// ----------------------------------------------------------------------------
// Sprite_Gauge (MZ)
// ----------------------------------------------------------------------------

if (pStatusGauges && typeof Sprite_Gauge != "undefined") {
    /**
     * ●bitmapの生成
     */
    const _Sprite_Gauge_createBitmap = Sprite_Gauge.prototype.createBitmap;
    Sprite_Gauge.prototype.createBitmap = function() {
        _Sprite_Gauge_createBitmap.apply(this, arguments);

        // 文字の影表示を設定
        this.bitmap.setMessageShadow(true);
    };
}

})();
