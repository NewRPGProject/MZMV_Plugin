//=============================================================================
// NRP_AutoTileAnimationConfigMZ.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.01 Changes the animation speed of auto tiles (water, falls, etc.).
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/480713311.html
 *
 * @help Changes the animation speed of auto tiles (water, falls, etc.).
 * This plugin is for MZ only.
 * 
 * [Usage]
 * First, please change the BaseWait of the animation.
 * This is the display time for one pattern of auto tiles (A1).
 * The default value of 30 corresponds to 0.5 seconds.
 * The smaller the value, the faster the animation will be.
 * 
 * However, this value affects all auto tile animations,
 * including water/falls.
 * 
 * For example, if you want only the water to maintain its original speed,
 * adjust the individual magnification settings by increasing them.
 * 
 * [Note on Tilesets]
 * It is possible to change the magnification
 * for each tileset by writing the following.
 * 
 * <WaterMagnification:X>: Change the magnification of the water animation to X.
 * <FallsMagnification:X> : Change the magnification of the falls animation to X.
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 * 
 * @param BaseWait
 * @type number
 * @default 30
 * @desc This is the basic time to display one pattern of animation. The default is 30 (0.5 seconds).
 * 
 * @param WaterMagnification
 * @type number
 * @default 1
 * @desc The magnification of the water animation display time.
 * The base wait time multiplied by this value will be used.
 * 
 * @param FallsMagnification
 * @type number
 * @default 1
 * @desc The magnification of the falls animation display time.
 * The base wait time multiplied by this value will be used.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.01 オートタイル（水、滝など）のアニメーション速度を変更します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/480713311.html
 *
 * @help 水、滝などオートタイル（Ａ１）のアニメーション速度を変更します。
 * このプラグインはＭＺ専用です。
 * 
 * ■使い方
 * まずはアニメーションの基本ウェイト時間を変更してください。
 * これがオートタイル（Ａ１）の１パターンの表示時間です。
 * 標準の30は0.5秒に相当します。
 * 値を小さくするほどアニメーションが高速化します。
 * 
 * ただし、この値は水／滝など、
 * オートタイルのアニメーション全てに影響します。
 * 
 * 例えば、水だけは元の速さを維持したいという場合は、
 * 個別の倍率設定を大きくして調整してください。
 * 
 * ■タイルセットのメモ欄
 * 以下を記述すれば、タイルセット毎に倍率の変更が可能です。
 * 
 * <WaterMagnification:X> ： 水アニメーションの倍率をXに変更
 * <FallsMagnification:X> ： 滝アニメーションの倍率をXに変更
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param BaseWait
 * @text 基本ウェイト時間
 * @type number
 * @default 30
 * @desc アニメーションの１パターンを表示する基本時間です。
 * 標準は30（0.5秒）です。
 * 
 * @param WaterMagnification
 * @text 水の倍率
 * @type number
 * @default 1
 * @desc 水アニメーションの表示時間に対する倍率です。
 * 基本ウェイト時間にこれをかけた値が使用されます。
 * 
 * @param FallsMagnification
 * @text 滝の倍率
 * @type number
 * @default 1
 * @desc 滝アニメーションの表示時間に対する倍率です。
 * 基本ウェイト時間にこれをかけた値が使用されます。
 */
(function() {
"use strict";

function toNumber(str, def) {
    if (str == "") {
        return def;
    }
    return isFinite(str) ? str : def;
}

const PLUGIN_NAME = "NRP_AutoTileAnimationConfigMZ";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pBaseWait = toNumber(parameters["BaseWait"]);
const pWaterMagnification = toNumber(parameters["WaterMagnification"]);
const pFallsMagnification = toNumber(parameters["FallsMagnification"]);

/**
 * 【上書】オートタイルアニメーションの更新
 */
Tilemap.prototype.update = function() {
    this.animationCount++;

    // this.animationFrame = Math.floor(this.animationCount / 30);
    this.animationFrame = Math.floor(this.animationCount / pBaseWait);

    for (const child of this.children) {
        if (child.update) {
            child.update();
        }
    }
};

/**
 * ●オートタイルの追加
 * ※アニメーションパターンの制御
 */
const _Tilemap__addAutotile = Tilemap.prototype._addAutotile;
Tilemap.prototype._addAutotile = function(layer, tileId, dx, dy) {
    if (Tilemap.isTileA1(tileId)) {
        const kind = Tilemap.getAutotileKind(tileId);
        const shape = Tilemap.getAutotileShape(tileId);
        const tx = kind % 8;
        const ty = Math.floor(kind / 8);
        let setNumber = 0;
        let bx = 0;
        let by = 0;
        let autotileTable = Tilemap.FLOOR_AUTOTILE_TABLE;
        let isTable = false;

        // 現在のタイルセットを取得
        const tileset = $gameMap.tileset();

        // 水タイルの速度調整
        // const waterSurfaceIndex = [0, 1, 2, 1][this.animationFrame % 4];
        const waterSurfaceIndex = [0, 1, 2, 1][Math.floor(this.animationFrame / tileset.waterMagnification) % 4];

        setNumber = 0;

        let editFlg = false;

        if (kind === 0) {
            bx = waterSurfaceIndex * 2;
            by = 0;
            editFlg = true;

        } else if (kind === 1) {
            bx = waterSurfaceIndex * 2;
            by = 3;
            editFlg = true;

        } else if (kind > 3) {
            bx = Math.floor(tx / 4) * 8;
            by = ty * 6 + (Math.floor(tx / 2) % 2) * 3;
            if (kind % 2 === 0) {
                bx += waterSurfaceIndex * 2;
            } else {
                bx += 6;
                autotileTable = Tilemap.WATERFALL_AUTOTILE_TABLE;

                // 滝タイルの速度調整
                // by += this.animationFrame % 3;
                by += Math.floor(this.animationFrame / tileset.fallsMagnification) % 3;
            }
            editFlg = true;
        }

        if (editFlg) {
            const table = autotileTable[shape];
            const w1 = this._tileWidth / 2;
            const h1 = this._tileHeight / 2;
            for (let i = 0; i < 4; i++) {
                const qsx = table[i][0];
                const qsy = table[i][1];
                const sx1 = (bx * 2 + qsx) * w1;
                const sy1 = (by * 2 + qsy) * h1;
                const dx1 = dx + (i % 2) * w1;
                const dy1 = dy + Math.floor(i / 2) * h1;
                if (isTable && (qsy === 1 || qsy === 5)) {
                    const qsx2 = qsy === 1 ? (4 - qsx) % 4 : qsx;
                    const qsy2 = 3;
                    const sx2 = (bx * 2 + qsx2) * w1;
                    const sy2 = (by * 2 + qsy2) * h1;
                    layer.addRect(setNumber, sx2, sy2, dx1, dy1, w1, h1);
                    layer.addRect(setNumber, sx1, sy1, dx1, dy1 + h1 / 2, w1, h1 / 2);
                } else {
                    layer.addRect(setNumber, sx1, sy1, dx1, dy1, w1, h1);
                }
            }
            // 対象の場合は終了
            return;
        }
    }

    // それ以外は元の処理を呼出
    _Tilemap__addAutotile.apply(this, arguments);
};

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
    // 個別倍率を設定
    // ※常駐処理は避けて、極力処理はこちらでやっておく。
    const tileset = $gameMap.tileset();
    tileset.waterMagnification = getWaterMagnification(tileset);
    tileset.fallsMagnification = getFallsMagnification(tileset);
}

/**
 * ●水の倍率を設定
 */
function getWaterMagnification(tileset) {
    const waterMagnification = tileset.meta.WaterMagnification;

    // 個別の指定があれば優先
    if (waterMagnification) {
        return waterMagnification;
    }

    // 指定がなければ設定値
    return pWaterMagnification;
}

/**
 * ●滝の倍率を設定
 */
function getFallsMagnification(tileset) {
    const fallsMagnification = tileset.meta.FallsMagnification;

    // 個別の指定があれば優先
    if (fallsMagnification) {
        return fallsMagnification;
    }

    // 指定がなければ設定値
    return pFallsMagnification;
}

/**
 * ●マップデータのロード完了時にタイルイベントのリンク先を復元
 */
const _DataManager_onLoad = DataManager.onLoad;
DataManager.onLoad = function(object) {
    _DataManager_onLoad.apply(this, arguments);

    if ($gameMap) {
        setTilesetInfo();
    }
};

})();
