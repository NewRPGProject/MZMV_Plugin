//=============================================================================
// NRP_FixLoadCharacter.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.00 Address the issue of characters not appearing after switching screens.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/482550157.html
 *
 * @help Addresses the issue where character images
 * are not displayed after switching screens.
 * 
 * In RPG Maker MZ, the character image may not be displayed for a short time
 * after moving to a new location or loading the save data.
 * ※This does not seem to happen in Maker MV.
 * 
 * This phenomenon becomes more pronounced the more character images
 * you use in a single map.
 * For example, if you load about 30 images in one map,
 * the character images may not be displayed for about 0.2 to 0.3 seconds.
 * 
 * In normal location movement,
 * the fade process is not noticeable because it exists.
 * However, if you move to a new location without fading,
 * or if you load the save data, the player can clearly see it.
 * 
 * The cause of this phenomenon is that the timing of the character image
 * drawing process is not stable.
 * 
 * This plugin changes the drawing process of the character to ensure
 * that the character is drawn after switching screens.
 * This will improve the display of the map screen
 * and character images at the same time.
 * 
 * [Usage]
 * Just apply it.
 * There are no parameters or anything.
 * 
 * In addition, there is no negative impact on the loading time.
 * This is because the character image loading process itself
 * is performed from the initial state.
 * (The problem lies in the subsequent drawing process.)
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.00 画面切替後、キャラクター画像が表示されない問題に対応
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/482550157.html
 *
 * @help 画面切替後、キャラクター画像が表示されない問題に対応します。
 * 
 * ＲＰＧツクールＭＺでは、場所移動後やセーブデータのロード後に、
 * キャラクター画像がわずかな時間だけ表示されないことがあります。
 * ※ツクールＭＶでは発生しない模様です。
 * 
 * この現象は一つのマップで多くのキャラクター画像を
 * 使用するほど顕著になります。
 * 例えば、１マップで３０程度の画像を読み込ませた場合、
 * 0.2～0.3秒程度の間、キャラクター画像が表示されないこともありえます。
 * 
 * 通常の場所移動ではフェード処理があるので目立ちません。
 * ですが、フェードなしで場所移動した場合や、セーブデータのロードをした場合は、
 * はっきりとプレイヤーにも分かってしまいます。
 * 
 * 現象が起こる原因は、キャラクター画像の
 * 描画処理のタイミングが安定していないことにあります。
 * 
 * このプラグインでは画面切替後、確実にキャラクターの描画処理を行うことで、
 * マップ画面とキャラクター画像が同時に表示されるように改善します。
 * 
 * ■使用方法
 * 適用するだけでＯＫです。
 * パラメータも何もありません。
 * 
 * なお、ロード時間に悪影響を与えることも恐らくありません。
 * というのも、キャラクター画像の
 * ロード完了自体は元から実施されているためです。
 * （問題はその後の描画処理にあります。）
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 */
(function() {
"use strict";
    
const PLUGIN_NAME = "NRP_FixLoadCharacter";
const parameters = PluginManager.parameters(PLUGIN_NAME);

/***********************************************************
 * ■マップの表示開始時にキャラクター画像を描画
 ***********************************************************/

const _Scene_Map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
    for (const sprite of this._spriteset._characterSprites) {
        sprite.update();
    }

    _Scene_Map_start.apply(this, arguments);
};

})();
