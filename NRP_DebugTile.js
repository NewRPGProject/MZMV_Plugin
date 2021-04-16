//=============================================================================
// NRP_DebugTile.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Displays tile information in debug mode.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/481013577.html
 *
 * @help Displays tile information in debug mode.
 * 
 * Displays the TileId and AutotileType,
 * which are usually difficult to verify.
 * 
 * In particular, AutotileType is used to determine the background of the battle.
 * This item is not usually checked.
 * It is useful for setting up other plugins.
 * 
 * ※This plugin is a rush job.
 *   I may organize it soon.
 * ※I have made it so that it does not work in production,
 *   but just in case, you might want to turn off the plugin
 *   when you no longer need it.
 * 
 * [Usage]
 * After running the game, use F2 to display the FPS.
 * Next to it, the TileId and AutotileType
 * of the player's current location are displayed.
 * Also, the target is the uppermost layer,
 * except for tiles with a ☆ traffic rating.
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
 * @plugindesc v1.00 タイル情報をデバッグ表示します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/481013577.html
 *
 * @help タイル情報をデバッグ表示します。
 * 
 * 通常、確認が困難なタイルＩＤとオートタイルタイプを表示します。
 * 
 * 特にオートタイルタイプは戦闘背景の判定に用いられていますが、
 * 通常は確認できない項目です。
 * 他のプラグインでの設定に役立ててください。
 * 
 * ※このプラグインはやっつけ仕事です。
 * 　そのうち整理するかもしれません。
 * ※一応、本番では動作しないようにしていますが、
 * 　念のため不要になったら、プラグインをオフにしたほうがよいかも？
 * 
 * ■使用方法
 * ゲーム実行後、Ｆ２でＦＰＳを表示してください。
 * その隣に、プレイヤーの現在地のタイルＩＤとオートタイルタイプが表示されます。
 * また、対象となるのは通行判定が☆のタイルを除いた最も上のレイヤーです。
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 */
(function() {
"use strict";
    
const PLUGIN_NAME = "NRP_DebugTile";
const parameters = PluginManager.parameters(PLUGIN_NAME);

/**
 * ●テスト実行かどうか？
 */
 function isPlaytest() {
    // ブラウザ実行時は常に本番と判定
    if (isBrowserMode()) {
        return false;

    // ※この段階では$gameTemp.isPlaytest()は有効にならないため、こちらで判定。
    } else if (Utils.isOptionValid("test")) {
        return true;
    }
    return false;
}

/**
 * ●ブラウザ実行かどうか？
 */
function isBrowserMode() {
    if (!Utils.isNwjs()) {
        return true;
    }
    return false;
}

/**
 * ●ＭＺの場合
 */
if (Utils.RPGMAKER_NAME == "MZ") {
    /**
     * ●ＦＰＳの表示更新
     */
    const _Graphics_FPSCounter__update = Graphics.FPSCounter.prototype._update;
    Graphics.FPSCounter.prototype._update = function() {
        _Graphics_FPSCounter__update.apply(this, arguments);

        // テスト時以外は終了
        if (!isPlaytest()) {
            return;

        // 表示中以外は終了
        } else if (this._boxDiv.style.display === "none") {
            return;
        }

        // まだ準備できていない場合があるのでチェック
        if (this._boxDiv && $dataMap && $gamePlayer) {
            // 表示領域を拡張
            this._boxDiv.style.width = "500px";

            // 対象とするレイヤーを取得
            const layerNo = getStepLayer($gamePlayer.x, $gamePlayer.y);
            if (layerNo >= 0) {
                this._numberDiv.textContent +=
                    " TileID:" + $gameMap.tileId($gamePlayer.x, $gamePlayer.y, layerNo);
                this._numberDiv.textContent +=
                    " AutotileType:" + $gameMap.autotileType($gamePlayer.x, $gamePlayer.y, layerNo);
            }
        }
    };
}

/**
 * ●ＭＶの場合
 */
if (Utils.RPGMAKER_NAME == "MV") {
    const _Spriteset_Map_update = Spriteset_Map.prototype.update;
    Spriteset_Map.prototype.update = function() {
        _Spriteset_Map_update.apply(this, arguments);

        // テスト時以外は終了
        if (!isPlaytest()) {
            return;
        }

        const modeBox = Graphics._modeBox;

        // まだ準備できていない場合があるのでチェック
        if ($dataMap && $gamePlayer) {
            // 表示領域を拡張
            modeBox.style.width = "170px";
            modeBox.style.height = "90px";

            // 対象とするレイヤーを取得
            const layerNo = getStepLayer($gamePlayer.x, $gamePlayer.y);
            if (layerNo >= 0) {
                const modeText = document.getElementById('modeText');
                modeText.style.fontSize = '20px';
                modeText.style.fontWeight = 'bold';

                modeText.textContent =
                    " TileID:" + $gameMap.tileId($gamePlayer.x, $gamePlayer.y, layerNo);
                modeText.textContent +=
                    " AutotileType:" + $gameMap.autotileType($gamePlayer.x, $gamePlayer.y, layerNo);
            }
        }
    };
}

/**
 * ●☆を除いた有効な最大レイヤー番号
 * ※要するに足を踏みしめるレイヤー
 */
 function getStepLayer(x, y) {
    // 各タイルが保有するフラグ情報
    const flags = $gameMap.tilesetFlags();
    // 上のレイヤーから順番にループ
    const tiles = $gameMap.layeredTiles(x, y);
    for (let i = 0; i < 4; i++) {
        const tileId = tiles[i];
        const layerNo = 3 - i;

        // 通行判定☆（0x10）を除く最初のタイルが対象
        if ((flags[tileId] & 0x10) === 0) {
            return layerNo;
        }
    }
    // 無効の場合は-1
    return -1;
}

})();
