//=============================================================================
// NRP_CounterExtension.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Extends the effective range of the counter attribute.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/483969944.html
 *
 * @help Extends the effective range of the counter attribute.
 * 
 * In RPG Maker MV or MZ, even if you add the counter attribute to a tile,
 * the player can only talk to someone one square away.
 * In the old Maker, such as RPG Maker 2000,
 * players could talk to someone much further away...
 * 
 * So, I extended the effective range of the counter attribute.
 * 
 * [Usage]
 * Just install it.
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 * 
 * @param PassageIgnoreTerrain
 * @type string
 * @desc Specify the terrain tag (1~7) to ignore the passage judgment. Multiple tags can be specified. (e.g.:1,3)
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 カウンター属性の有効範囲を延長する。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/483969944.html
 *
 * @help カウンター属性の有効範囲を延長します。
 * 
 * ツクールＭＶ～ＭＺではタイルにカウンター属性を付加しても、
 * １マス離れた相手にしか話しかけられません。
 * ツクール２０００など昔のツクールでは、
 * もっと遠くの相手とも会話できたのになぜ……。
 * 
 * というわけで、カウンター属性の有効範囲を延長します。
 * 
 * ■使用方法
 * 導入するだけでＯＫです。
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 */
(function() {
"use strict";
    
const PLUGIN_NAME = "NRP_CounterExtension";
const parameters = PluginManager.parameters(PLUGIN_NAME);

const _Game_Player_checkEventTriggerThere = Game_Player.prototype.checkEventTriggerThere;
Game_Player.prototype.checkEventTriggerThere = function(triggers) {
    _Game_Player_checkEventTriggerThere.apply(this, arguments);

    // イベントを起動できる、かつイベントを開始していない。
    if (this.canStartLocalEvents() && !$gameMap.isAnyEventStarting()) {
        const direction = this.direction();
        const x1 = this.x;
        const y1 = this.y;

        // プレイヤーの１マス先の座標を確認
        let tmpX = $gameMap.roundXWithDirection(x1, direction);
        let tmpY = $gameMap.roundYWithDirection(y1, direction);
        // 元の処理で既に１マス先は確認済みのため、
        // さらに１マス先の座標を確認
        tmpX = $gameMap.roundXWithDirection(tmpX, direction);
        tmpY = $gameMap.roundYWithDirection(tmpY, direction);

        // カウンター属性が続く限りループ
        while ($gameMap.isCounter(tmpX, tmpY)) {
            tmpX = $gameMap.roundXWithDirection(tmpX, direction);
            tmpY = $gameMap.roundYWithDirection(tmpY, direction);

            this.startMapEvent(tmpX, tmpY, triggers, true);
            // イベントが起動されたなら終了
            if ($gameMap.isAnyEventStarting()) {
                return;
            }
        }
    }
};

})();
