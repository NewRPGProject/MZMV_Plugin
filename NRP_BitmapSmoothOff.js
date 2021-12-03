//=============================================================================
// NRP_BitmapSmoothOff.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.00 Removes image noise from SV actors and state icons.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/484654081.html
 *
 * @help Removes image noise from SV actors and state icons.
 * 
 * When you move SV actors or state icons in RPG Maker MZ,
 * the image may have noise-like lines.
 * 
 * This is caused by an internal fractional number calculation
 * that shifts the image cropping position by one pixel.
 * ※The identity of the line seems to be the edge of the adjacent pattern.
 * This problem can be solved by switching the settings for the image.
 * 
 * ------------------------------------------
 * [Usage]
 * ------------------------------------------
 * Just apply it.
 * You can switch between them for each image,
 * but the default state is usually fine.
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
 * @param SvActorSmoothOff
 * @type boolean
 * @default true
 * @desc Apply the process to the SV actor image.
 * 
 * @param StateIconSmoothOff
 * @type boolean
 * @default true
 * @desc Apply the process to the state icon image.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.00 ＳＶアクターやステートアイコンの画像ノイズを除去
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/484654081.html
 *
 * @help ＳＶアクターやステートアイコンの画像ノイズを除去します。
 * 
 * ツクールＭＺにて、ＳＶアクターやステートアイコンを移動させた場合、
 * 画像に線のようなノイズが入ることがあります。
 * 
 * これは内部的な処理における小数値の計算により、
 * 画像を切り抜く位置が１ピクセルズレることによって発生します。
 * ※線の正体は隣のパターンの端と思われます。
 * 画像に対する設定を切り替えることによって、この問題を解決します。
 * 
 * ------------------------------------------
 * ■使用方法
 * ------------------------------------------
 * 適用するだけでＯＫです。
 * 画像毎に切り替えられるようになっていますが、
 * 通常は初期状態でも問題ないと思います。
 * 
 * ------------------------------------------
 * ■利用規約
 * ------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param SvActorSmoothOff
 * @text ＳＶアクターに適用
 * @type boolean
 * @default true
 * @desc ＳＶアクター画像に処理を適用します。
 * 
 * @param StateIconSmoothOff
 * @text ステートアイコンに適用
 * @type boolean
 * @default true
 * @desc ステートアイコン画像に処理を適用します。
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

const PLUGIN_NAME = "NRP_BitmapSmoothOff";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pSvActorSmoothOff = toBoolean(parameters["SvActorSmoothOff"]);
const pStateIconSmoothOff = toBoolean(parameters["StateIconSmoothOff"]);

if (pSvActorSmoothOff) {
    /**
     * ●ＳＶアクターの読込
     * ※Sprite_Actor.prototype.updateBitmapでもよいが、
     * 　あちらは常駐処理なので、こちらで対応
     */
    const _ImageManager_loadSvActor = ImageManager.loadSvActor;
    ImageManager.loadSvActor = function(filename) {
        const bitmap = _ImageManager_loadSvActor.apply(this, arguments);
        bitmap.smooth = false;
        return bitmap;
    };
}

if (pStateIconSmoothOff) {
    /**
     * ●ステートアイコンの読込
     */
    const _Sprite_StateIcon_loadBitmap = Sprite_StateIcon.prototype.loadBitmap;
    Sprite_StateIcon.prototype.loadBitmap = function() {
        _Sprite_StateIcon_loadBitmap.apply(this, arguments);
        this.bitmap.smooth = false;
    };
}

})();
