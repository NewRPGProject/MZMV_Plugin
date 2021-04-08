//=============================================================================
// NRP_PassageIgnoreTile.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Ignore the traffic judgment of a specific tile.
 * @orderBefore NRP_PassageAutoTileTop
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/480883215.html
 *
 * @help Ignore the traffic judgment of a specific tile.
 * 
 * Normally, in RPG Maker MV/MZ,
 * when multiple tiles are placed on top of each other,
 * the traffic judgment of the upper layer takes priority.
 * The only exception is the ☆ tile.
 * As for the ☆ tiles, even if they are placed on the upper layer,
 * the traffic judgment is ignored,
 * and the judgment of the lower layer is left behind.
 * 
 * This plugin allows you to make the same kind of traffic judgment
 * as for ☆ tiles, but only for specific tiles.
 * ※The tiles are specified in the terrain tag.
 * 
 * [Usage]
 * Set the target terrain tag in the plugin parameters.
 * Set the corresponding terrain tag in the tileset and you are good to go.
 * 
 * [Notes Settings]
 * It is also possible to specify the method in the notes of the tilesets.
 * The following is a sample configuration.
 * 
 * <PassageIgnoreTerrain:1,2,5>
 * Target tiles with terrain tags 1, 2, and 5.
 * 
 * [Notice]
 * The following functions are overwritten.
 * Please be aware of conflicts.
 * It will be more stable
 * if you place it on the top side as much as possible.
 * 
 * ・Game_Map.prototype.checkPassage
 * 
 * In line with this,
 * if you want to use it together with NRP_PassageAutoTileTop.js
 * Please place this plugin first.
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
 * @plugindesc v1.00 特定タイルの通行判定を無視します。
 * @orderBefore NRP_PassageAutoTileTop
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/480883215.html
 *
 * @help 特定タイルの通行判定を無視します。
 * 
 * 通常、ツクールＭＶ～ＭＺでは、複数のタイルを重ねて配置すると、
 * 上のレイヤーの通行判定が優先される仕様になっています。
 * 唯一の例外は☆タイルです。
 * ☆タイルに関しては、上のレイヤーに配置した場合でも、
 * 通行判定が無視されるため、下のレイヤーの判定が残される仕様になっています。
 * 
 * このプラグインでは特定のタイルに限って、
 * ☆タイルと同じような通行判定にすることができます。
 * ※タイルの指定は地形タグで行います。
 * 
 * ■使用方法
 * プラグインパラメータで対象とする地形タグを設定してください。
 * タイルセットで該当の地形タグを設定すればＯＫです。
 * 
 * ■メモ欄の指定
 * タイルセットのメモ欄に指定する方法も可能です。
 * 以下は設定例です。
 * 
 * <PassageIgnoreTerrain:1,2,5>
 * 地形タグ1,2,5を設定したタイルを対象とします。
 * 
 * ■注意点
 * 以下の関数を上書きしています。競合にご注意ください。
 * なるべく上側に配置したほうが安定すると思います。
 * ・Game_Map.prototype.checkPassage
 * 
 * それに伴い、NRP_PassageAutoTileTop.jsと併用する場合は、
 * こちらのプラグインを先に配置してください。
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param PassageIgnoreTerrain
 * @text 対象とする地形タグ
 * @type string
 * @desc 通行判定を無視する地形タグ（1~7）を指定します。
 * 複数指定も可能です。（例：1,3）
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

const PLUGIN_NAME = "NRP_PassageIgnoreTile";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pPassageIgnoreTerrains = makeArray(parameters["PassageIgnoreTerrain"]);

/**
 * ●引数を元に配列を取得する。
 */
 function makeArray(values) {
    const results = [];
    if (!values) {
        return undefined;
    }

    // カンマ区切りでループ
    for (let value of values.split(",")) {
        // 空白除去
        value = value.trim();
        // 1~5というように範囲指定の場合
        // ※~が存在する。
        if (value.indexOf("~") >= 0) {
            const range = value.split("~");
            const rangeStart = eval(range[0]);
            const rangeEnd = eval(range[1]);

            // 指定範囲で実行
            // 開始のほうが終了より大きい場合は反対に実行
            if (rangeEnd < rangeStart) {
                for (let i = rangeStart; i >= rangeEnd; i--) {
                    results.push(eval(i));
                }
            } else {
                for (let i = rangeStart; i <= rangeEnd; i++) {
                    results.push(eval(i));
                }
            }
            
        // 通常時
        } else {
            // 数値変換するためeval
            results.push(eval(value));
        }
    }
    return results;
}

/**
 * ●マップ情報の設定
 */
const _Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    _Game_Map_setup.apply(this, arguments);
    
    setTilesetInfo();
};

/**
 * ●タイルセットの変更
 */
const _Game_Map_changeTileset = Game_Map.prototype.changeTileset;
Game_Map.prototype.changeTileset = function(tilesetId) {
    _Game_Map_changeTileset.apply(this, arguments);

    setTilesetInfo();
};

/**
 * ●タイルセットに情報を設定
 */
 function setTilesetInfo() {
    // 対象とする地形ＩＤの配列を設定
    const tileset = $gameMap.tileset();

    // 個別の指定があるなら、そちらを優先
    if (tileset.meta.PassageIgnoreTerrain) {
        tileset.passageIgnoreTerrains = makeArray(tileset.meta.PassageIgnoreTerrain);
        return;
    }

    // 標準のパラメータ
    tileset.passageIgnoreTerrains = pPassageIgnoreTerrains;
}

/**
 * ●移動判定チェック
 * ※ほぼ上書き
 */
const _Game_Map_checkPassage = Game_Map.prototype.checkPassage;
Game_Map.prototype.checkPassage = function(x, y, bit) {
    const tileset = $gameMap.tileset();

    if (tileset.passageIgnoreTerrains) {
        const flags = this.tilesetFlags();
        const tiles = this.allTiles(x, y);
        for (const tile of tiles) {
            const flag = flags[tile];

            // タイルが存在しない
            if ((flag & 0x10) !== 0) {
                // [*] No effect on passage
                continue;
            }

            // 地形タグを取得
            const tag = flag >> 12;
            // 対象の地形タグならば無視して次へ
            if (tag > 0 && tileset.passageIgnoreTerrains.includes(tag)) {
                // ※タイルが存在しない場合と同じ処理
                continue;
            }

            if ((flag & bit) === 0) {
                // [o] Passable
                return true;
            }
            if ((flag & bit) === bit) {
                // [x] Impassable
                return false;
            }
        }
        return false;
    }

    // 設定がない場合は元の結果
    return _Game_Map_checkPassage.apply(this, arguments);
};

})();
