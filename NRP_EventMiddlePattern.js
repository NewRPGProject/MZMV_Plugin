//=============================================================================
// NRP_EventMiddlePattern.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Middle the pattern of events where no image exists.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/484023583.html
 *
 * @help Middle the pattern of events where no image exists.
 * 
 * Normally, the pattern is set to the left for events with no image set.
 * If you change the image later,
 * you will have trouble with the pattern not being in the middle.
 * This is a plugin to deal with such a situation.
 * 
 * ------------------------------------------
 * [Terms]
 * ------------------------------------------
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 画像の存在しないイベントはパターンを中央に
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/484023583.html
 *
 * @help 画像の存在しないイベントはパターンを中央に変更します。
 * 
 * 通常、画像未設定のイベントはパターンが左になっています。
 * 後で画像変更した場合、パターンが中央になってなくて困る。
 * そんな状況に対処するプラグインです。
 * 
 * ------------------------------------------
 * ■利用規約
 * ------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 */
(function() {
"use strict";

const PLUGIN_NAME = "NRP_EventMiddlePattern";
const parameters = PluginManager.parameters(PLUGIN_NAME);

/***********************************************************
 * ■画像の存在しないイベントはパターンを中央に
 ***********************************************************/
const _Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
    _Game_Event_setupPageSettings.apply(this, arguments);

    const page = this.page();
    const image = page.image;
    // 画像の設定が存在しない場合
    if (image.tileId == 0 && !image.characterName) {
        // パターンを中央に変更
        this._originalPattern = 1;
        this.setPattern(this._originalPattern);
    }
};

})();
