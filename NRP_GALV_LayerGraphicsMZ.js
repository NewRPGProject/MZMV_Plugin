//=============================================================================
// NRP_GALV_LayerGraphicsMZ.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.01 Resolved conflict with GALV_LayerGraphicsMZ & added functions.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @base GALV_LayerGraphicsMZ
 * @orderAfter GALV_LayerGraphicsMZ
 * @url http://newrpg.seesaa.net/article/482187330.html
 *
 * @help Resolve conflicts between NRP plugins and GALV_LayerGraphicsMZ.
 * In addition, I've added a few features, such as support for loop maps.
 * 
 * ※Operation has been confirmed with GALV_LayerGraphicsMZ ver1.2.
 * ※Galv's terms of use prohibit the modification and distribution of plugins & scripts.
 *   For this reason, we have created plugins
 *   using a method that does not reuse the original source.
 * 
 * ■Additional explanation of plugin parameters
 * ◆ForDynamicMotion
 * Resolve conflicts with NRP_DynamicMotionMZ and NRP_TroopRandomFormation.
 * If not applied, enemies may appear to overlap unnaturally.
 * 
 * When this is applied, the Z coordinate of the enemy will be changed
 * from the GALV_LayerGraphicsMZ setting (which cannot be changed).
 * Set value of GALV_LayerGraphicsMZ = 2
 * → Default value of NRP_DynamicMotionMZ = 3.
 * 
 * This value refers to the "battlerZ" plugin parameter
 * of NRP_DynamicMotionMZ, so it can be changed.
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 * 
 * @param SupportLoopMap
 * @desc Makes LayerGraphics compatible with loop maps. This will prevent the display from shifting when crossing loops.
 * @type boolean
 * @default true
 * 
 * @param SupportStaticLayerDefaultMap
 * @desc When creating a static layer, if the map ID is not specified, the current map will be referenced.
 * @type boolean
 * @default true
 * 
 * @param ForDynamicMotion
 * @desc Resolve conflicts with NRP_DynamicMotionMZ and NRP_TroopRandomFormation.
 * @type boolean
 * @default true
 */

/*:ja
 * @target MZ
 * @plugindesc v1.01 GALV_LayerGraphicsMZとの競合を解消＆機能追加
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @base GALV_LayerGraphicsMZ
 * @orderAfter GALV_LayerGraphicsMZ
 * @url http://newrpg.seesaa.net/article/482187330.html
 *
 * @help NRP系プラグインとGALV_LayerGraphicsMZ（Galv様）との競合を解消します。
 * ついでにループマップへの対応など、ちょっとした機能追加を行います。
 * 
 * ※GALV_LayerGraphicsMZ ver1.2で動作確認しています。
 * ※Galv様の利用規約ではプラグイン＆スクリプトを改変して配布するのは禁止となっています。
 * 　そのため、元のソースは流用しない方式でプラグインを作成しています。
 * 
 * ■プラグインパラメータの補足説明
 * ◆DynamicMotionとの競合解消
 * NRP_DynamicMotionMZおよびNRP_TroopRandomFormationとの競合を解消します。
 * 適用しない場合、敵が不自然に重なって表示されることがあります。
 * 
 * 適用すると敵のＺ座標が、
 * GALV_LayerGraphicsMZの設定値（変更不可）から変更されます。
 * GALV_LayerGraphicsMZの設定値=2 → NRP_DynamicMotionMZの既定値=3となります。
 * 
 * この値はNRP_DynamicMotionMZの『バトラーのＺ座標』の
 * プラグインパラメータを参照していますので変更も可能です。
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param SupportLoopMap
 * @text ループマップに対応
 * @desc LayerGraphicsをループマップに対応させます。
 * ループをまたぐ際に表示がズレないようになります。
 * @type boolean
 * @default true
 * 
 * @param SupportStaticLayerDefaultMap
 * @text 静的レイヤーの既定マップ
 * @desc 静的レイヤー作成時、マップＩＤの指定がない場合は現在のマップを参照するようにします。
 * @type boolean
 * @default true
 * 
 * @param ForDynamicMotion
 * @text DynamicMotionとの競合解消
 * @desc NRP_DynamicMotionMZおよびNRP_TroopRandomFormationとの競合を解消します。
 * @type boolean
 * @default true
 */
(function() {
"use strict";

function toBoolean(val, def) {
    // 空白なら初期値を返す
    if (val === "" || val === undefined) {
        return def;
        
    // 既にboolean型なら、そのまま返す
    } else if (typeof val === "boolean") {
        return val;
    }
    // 文字列ならboolean型に変換して返す
    return val.toLowerCase() == "true";
}
function toNumber(str, def) {
    return isNaN(str) ? def : +(str || def);
}
function setDefault(str, def) {
    return str ? str : def;
}

const PLUGIN_NAME = "NRP_GALV_LayerGraphicsMZ";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pSupportLoopMap = toBoolean(parameters["SupportLoopMap"], true);
const pSupportStaticLayerDefaultMap = toBoolean(parameters["SupportStaticLayerDefaultMap"], true);
const pForDynamicMotion = toBoolean(parameters["ForDynamicMotion"], true);

//--------------------------------------------------------
// ループ対応
//--------------------------------------------------------
if (pSupportLoopMap) {
    let mBeforeDisplayScreenX = 0;
    let mBeforeDisplayScreenY = 0;

    /**
     * 現在位置ではなくスクロール量を参照するよう変更
     */
    const _Sprite_LayerGraphic_updatePosition = Sprite_LayerGraphic.prototype.updatePosition;
    Sprite_LayerGraphic.prototype.updatePosition = function() {
        // 元の処理で変更される前のcurrentx, currentyを保持
        const preCurrentx = this.lValue().currentx;
        const preCurrenty = this.lValue().currenty;

        // 元の処理
        _Sprite_LayerGraphic_updatePosition.apply(this, arguments);

        // スクロール量を取得
        this.scrollX = (this.scrollX ?? 0) + moveScreenX.bind($gameMap)();
        this.scrollY = (this.scrollY ?? 0) + moveScreenY.bind($gameMap)();

        // 原点に加算
        this.origin.x = 0 + this.scrollX + preCurrentx + this.xOffset();
        this.origin.y = 0 + this.scrollY + preCurrenty + this.yOffset();
    };

    /**
     * 【独自】１フレームでスクロールしたスクリーンＸ座標
     * ※NRP_DynamicAnimationMapMZとほぼ同じ関数
     */
    function moveScreenX() {
        // 現在の座標と前回の座標を比較し差分を求める。
        const displayScreenX = this.displayX() * this.tileWidth();
        let moveScreenX = displayScreenX - mBeforeDisplayScreenX;

        // マップ全体の横幅（ピクセル）
        const mapWidth = this.width() * this.tileWidth();
        // 全体座標の半分以上を移動した（ループ）
        if (moveScreenX > mapWidth / 2) {
            moveScreenX -= mapWidth;
        } else if (moveScreenX < mapWidth / 2 * -1) {
            moveScreenX += mapWidth;
        }

        return moveScreenX;
    };

    /**
     * 【独自】１フレームでスクロールしたスクリーンＹ座標
     * ※NRP_DynamicAnimationMapMZとほぼ同じ関数
     */
    function moveScreenY() {
        // 現在の座標と前回の座標を比較し差分を求める。
        const displayScreenY = this.displayY() * this.tileHeight();
        let moveScreenY = displayScreenY - mBeforeDisplayScreenY;

        // マップ全体の縦幅（ピクセル）
        const mapHeight = this.height() * this.tileHeight();
        // 全体座標の半分以上を移動した（ループ）
        if (moveScreenY > mapHeight / 2) {
            moveScreenY -= mapHeight;
        } else if (moveScreenY < mapHeight / 2 * -1) {
            moveScreenY += mapHeight;
        }

        return moveScreenY;
    };

    /**
     * ●初期化
     */
    const _Game_Map_initialize = Game_Map.prototype.initialize;
    Game_Map.prototype.initialize = function() {
        _Game_Map_initialize.apply(this, arguments);

        mBeforeDisplayScreenX = this.displayX() * this.tileWidth();
        mBeforeDisplayScreenY = this.displayY() * this.tileHeight();
    };

    /**
     * ●更新処理
     */
    const _Game_Map_update = Game_Map.prototype.update;
    Game_Map.prototype.update = function(sceneActive) {
        // 画面座標を保持
        mBeforeDisplayScreenX = this.displayX() * this.tileWidth();
        mBeforeDisplayScreenY = this.displayY() * this.tileHeight();
        
        _Game_Map_update.apply(this, arguments);
    };
}

//--------------------------------------------------------
// 静的レイヤーの作成時、マップＩＤ＝０を有効
//--------------------------------------------------------
if (pSupportStaticLayerDefaultMap) {
    const _Galv_LG_createLayerS = Galv.LG.createLayerS;
    Galv.LG.createLayerS = function(config) {
        let mapid = Galv.LG.num(config[0]);
        // マップＩＤの指定がない場合
        if (!mapid) {
            // 現在のマップＩＤを設定
            config[0] = $gameMap.mapId();
        }

        _Galv_LG_createLayerS.call(this, config);
    }
}

//--------------------------------------------------------
// DynamicMotion向け
//--------------------------------------------------------
const PLUGIN_NAME_DYNAMIC_MOTION = "NRP_DynamicMotionMZ";
const isDynamicMotionMZ = PluginManager._scripts.some(function(scriptName) {
    return scriptName == "NRP_DynamicMotionMZ";
});

if (pForDynamicMotion && isDynamicMotionMZ) {
    const parametersDm = PluginManager.parameters(PLUGIN_NAME_DYNAMIC_MOTION);
    const pBattlerZ = toNumber(parametersDm["battlerZ"], 3);

    const _Spriteset_Battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
    Spriteset_Battle.prototype.createLowerLayer = function() {
        _Spriteset_Battle_createLowerLayer.apply(this, arguments);

        // Ｚ座標の書き換えを戻す。
        for (let i = 0; i < this._battleField.children.length; i++) {
            this._battleField.children[i].z = pBattlerZ;
        };
    };
}

})();
