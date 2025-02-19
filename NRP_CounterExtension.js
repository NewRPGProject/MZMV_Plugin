//=============================================================================
// NRP_CounterExtension.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.02 Extend the functionality of the counter attribute.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/483969944.html
 *
 * @help Extend the functionality of the counter attribute.
 * 
 * In RPG Maker MV or MZ, even if you add the counter attribute to a tile,
 * the player can only talk to someone one square away.
 * In the old Maker, such as RPG Maker 2000,
 * players could talk to someone much further away...
 * 
 * So, I extended the effective range of the counter attribute.
 * 
 * It can also disable Maker's specification that an A2 tile
 * and a tile with a counter attribute is determined as a table
 * and extended by 12 dots in length.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Turn on the required functionality with the plugin parameters.
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
 * @param CounterExtension
 * @type boolean
 * @default true
 * @desc Extend the effective range of the counter attribute so that events more than 2 squares away can be activated.
 * 
 * @param TableImageNotExtension
 * @type boolean
 * @default false
 * @desc Disable the specification to extend table tiles by 12 dots.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.02 カウンター属性の機能を拡張する。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/483969944.html
 *
 * @help カウンター属性の機能を拡張します。
 * 
 * ツクールＭＶ～ＭＺではタイルにカウンター属性を付加しても、
 * １マス離れた相手にしか話しかけられません。
 * ツクール２０００など昔のツクールでは、
 * もっと遠くの相手とも会話できたのになぜ……。
 * 
 * というわけで、カウンター属性の有効範囲を延長します。
 * 
 * また、A2タイルかつカウンター属性のタイルがテーブルとして判定され、
 * 12ドット長さが延長されるツクールの仕様を無効化できます。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * 必要な機能をプラグインパラメータでオンにしてください。
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
 * @param CounterExtension
 * @text カウンターの範囲延長
 * @type boolean
 * @default true
 * @desc カウンター属性の有効範囲を延長し、２マス以上離れたイベントを起動できるようにします。
 * 
 * @param TableImageNotExtension
 * @text テーブル画像を延長しない
 * @type boolean
 * @default false
 * @desc テーブルタイルを12ドット延長する仕様を無効化します。
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

const PLUGIN_NAME = "NRP_CounterExtension";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pCounterExtension = toBoolean(parameters["CounterExtension"], true);
const pTableImageNotExtension = toBoolean(parameters["TableImageNotExtension"], false);

//-----------------------------------------------------------------------------
// Game_Player
//-----------------------------------------------------------------------------

if (pCounterExtension) {
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
}

//-----------------------------------------------------------------------------
// Tilemap
//-----------------------------------------------------------------------------

if (pTableImageNotExtension) {
    /**
     * ●テーブルタイルの判定
     */
    Tilemap.prototype._isTableTile = function(tileId) {
        // 12ドット下に伸ばす仕様を解除する。
        return false;
    };
}

})();
