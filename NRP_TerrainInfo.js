//=============================================================================
// NRP_TerrainInfo.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.02 Set detailed settings for battleback and encounter rates.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/481820874.html
 *
 * @help Set detailed settings for battleback and encounter rates.
 *
 * You can change the battleback and encounter rate by using terrain tags,
 * region IDs, tile IDs, and auto tile types as conditions.
 * Since terrain tags are limited in number and regions
 * are hard to set, auto tile type is useful.
 * 
 * ※Please use the included NRP_DebugTile.js to check the auto tile type.
 * ※Changing the battleback only available when the tileset is world type.
 * 
 * In addition, RPG Maker MV to MZ includes
 * the following hidden specifications by default.
 *
 * - The encounter rate in the bushes is doubled.
 * - The encounter rate is halved while on a ship.
 *
 * In some cases, this may be a nuisance.
 * It is possible to change these specifications.
 * 
 * ■Usage
 * Enter the condition, encounter rate, and battlebacks
 * in the plugin parameter SettingList.
 * You can set the registered Id in the note field of the tileset.
 * 
 * <TerrainSetting:?>
 * 
 * The ? is the Id registered in the setting list.
 * You can also specify multiple settings
 * by separating them with commas.
 * <TerrainSetting:A,B,C>
 * 
 * The sample is registered in the setting list from the beginning.
 * The content is tailored to Maker's default fields,
 * so please refer to it.
 * 
 * ■Detailed specifications
 * Tile IDs and auto tile types are determined in order from the top layer.
 * Tiles on layers with no settings will be ignored.
 * 
 * For example, if you set up the following.
 *
 * - Layer 1 Plains: Encounter rate is 100%.
 * - Layer 2 forest: Encounter rate is 200%.
 * - Layer 3 town: No setting
 * 
 * The layer 2 forest encounter rate (200%) will be enabled.
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 * 
 * @param BushEncounterRate
 * @type number
 * @default 200
 * @desc The encounter rate on the bushes, and should be set to 100. The initial value is 200.
 * 
 * @param ShipEncounterRate
 * @type number
 * @default 50
 * @desc The encounter rate on the ship, and should be set to 100. The initial value is 50.
 * 
 * @param SettingList
 * @type struct<Setting>[]
 * @default ["{\"Id\":\"sample\",\"Memo\":\"Plain\",\"ValidAllTilesets\":\"false\",\"<Condition>\":\"\",\"TerrainTag\":\"\",\"RegionId\":\"\",\"AutotileType\":\"16\",\"TileId\":\"\",\"<Contents>\":\"\",\"EncounterRate\":\"100\",\"Battleback1\":\"\",\"Battleback2\":\"\"}","{\"Id\":\"sample\",\"Memo\":\"Forest\",\"ValidAllTilesets\":\"false\",\"<Condition>\":\"\",\"TerrainTag\":\"\",\"RegionId\":\"\",\"AutotileType\":\"20,21\",\"TileId\":\"\",\"<Contents>\":\"\",\"EncounterRate\":\"200\",\"Battleback1\":\"\",\"Battleback2\":\"\"}","{\"Id\":\"sample\",\"Memo\":\"Mountain\",\"ValidAllTilesets\":\"false\",\"<Condition>\":\"\",\"TerrainTag\":\"\",\"RegionId\":\"\",\"AutotileType\":\"22\",\"TileId\":\"\",\"<Contents>\":\"\",\"EncounterRate\":\"200\",\"Battleback1\":\"\",\"Battleback2\":\"\"}","{\"Id\":\"sample\",\"Memo\":\"Beach\",\"ValidAllTilesets\":\"false\",\"<Condition>\":\"\",\"TerrainTag\":\"\",\"RegionId\":\"\",\"AutotileType\":\"32\",\"TileId\":\"\",\"<Contents>\":\"\",\"EncounterRate\":\"150\",\"Battleback1\":\"\",\"Battleback2\":\"\"}","{\"Id\":\"sample\",\"Memo\":\"Desert\",\"ValidAllTilesets\":\"false\",\"<Condition>\":\"\",\"TerrainTag\":\"\",\"RegionId\":\"\",\"AutotileType\":\"33\",\"TileId\":\"\",\"<Contents>\":\"\",\"EncounterRate\":\"150\",\"Battleback1\":\"\",\"Battleback2\":\"\"}","{\"Id\":\"sample\",\"Memo\":\"Snow Field\",\"ValidAllTilesets\":\"false\",\"<Condition>\":\"\",\"TerrainTag\":\"\",\"RegionId\":\"\",\"AutotileType\":\"40\",\"TileId\":\"\",\"<Contents>\":\"\",\"EncounterRate\":\"150\",\"Battleback1\":\"\",\"Battleback2\":\"\"}","{\"Id\":\"sample\",\"Memo\":\"Snow Forest\",\"ValidAllTilesets\":\"false\",\"<Condition>\":\"\",\"TerrainTag\":\"\",\"RegionId\":\"\",\"AutotileType\":\"44\",\"TileId\":\"\",\"<Contents>\":\"\",\"EncounterRate\":\"200\",\"Battleback1\":\"\",\"Battleback2\":\"\"}","{\"Id\":\"sample\",\"Memo\":\"Snow Mountain\",\"ValidAllTilesets\":\"false\",\"<Condition>\":\"\",\"TerrainTag\":\"\",\"RegionId\":\"\",\"AutotileType\":\"47\",\"TileId\":\"\",\"<Contents>\":\"\",\"EncounterRate\":\"200\",\"Battleback1\":\"\",\"Battleback2\":\"\"}","{\"Id\":\"sample\",\"Memo\":\"Wasteland\",\"ValidAllTilesets\":\"false\",\"<Condition>\":\"\",\"TerrainTag\":\"\",\"RegionId\":\"\",\"AutotileType\":\"24,25\",\"TileId\":\"\",\"<Contents>\":\"\",\"EncounterRate\":\"150\",\"Battleback1\":\"\",\"Battleback2\":\"\"}","{\"Id\":\"sample\",\"Memo\":\"Wasteland Forest\",\"ValidAllTilesets\":\"false\",\"<Condition>\":\"\",\"TerrainTag\":\"\",\"RegionId\":\"\",\"AutotileType\":\"28\",\"TileId\":\"\",\"<Contents>\":\"\",\"EncounterRate\":\"200\",\"Battleback1\":\"\",\"Battleback2\":\"\"}","{\"Id\":\"sample\",\"Memo\":\"Plain Road\",\"ValidAllTilesets\":\"false\",\"<Condition>\":\"\",\"TerrainTag\":\"\",\"RegionId\":\"\",\"AutotileType\":\"17\",\"TileId\":\"\",\"<Contents>\":\"\",\"EncounterRate\":\"100\",\"Battleback1\":\"\",\"Battleback2\":\"\"}","{\"Id\":\"sample\",\"Memo\":\"Sandy Road\",\"ValidAllTilesets\":\"false\",\"<Condition>\":\"\",\"TerrainTag\":\"\",\"RegionId\":\"\",\"AutotileType\":\"29\",\"TileId\":\"\",\"<Contents>\":\"\",\"EncounterRate\":\"100\",\"Battleback1\":\"\",\"Battleback2\":\"\"}","{\"Id\":\"sample\",\"Memo\":\"Road\",\"ValidAllTilesets\":\"false\",\"<Condition>\":\"\",\"TerrainTag\":\"\",\"RegionId\":\"\",\"AutotileType\":\"37\",\"TileId\":\"\",\"<Contents>\":\"\",\"EncounterRate\":\"100\",\"Battleback1\":\"\",\"Battleback2\":\"\"}","{\"Id\":\"sample\",\"Memo\":\"Shallow Sea\",\"ValidAllTilesets\":\"false\",\"<Condition>\":\"\",\"TerrainTag\":\"\",\"RegionId\":\"\",\"AutotileType\":\"0\",\"TileId\":\"\",\"<Contents>\":\"\",\"EncounterRate\":\"100\",\"Battleback1\":\"\",\"Battleback2\":\"\"}","{\"Id\":\"sample\",\"Memo\":\"Deep Sea\",\"ValidAllTilesets\":\"false\",\"<Condition>\":\"\",\"TerrainTag\":\"\",\"RegionId\":\"\",\"AutotileType\":\"1\",\"TileId\":\"\",\"<Contents>\":\"\",\"EncounterRate\":\"100\",\"Battleback1\":\"\",\"Battleback2\":\"\"}","{\"Id\":\"sample\",\"Memo\":\"Poison Swamp\",\"ValidAllTilesets\":\"false\",\"<Condition>\":\"\",\"TerrainTag\":\"\",\"RegionId\":\"\",\"AutotileType\":\"4\",\"TileId\":\"\",\"<Contents>\":\"\",\"EncounterRate\":\"200\",\"Battleback1\":\"\",\"Battleback2\":\"\"}","{\"Id\":\"sample\",\"Memo\":\"Lava\",\"ValidAllTilesets\":\"false\",\"<Condition>\":\"\",\"TerrainTag\":\"\",\"RegionId\":\"\",\"AutotileType\":\"35\",\"TileId\":\"\",\"<Contents>\":\"\",\"EncounterRate\":\"200\",\"Battleback1\":\"\",\"Battleback2\":\"\"}","{\"Id\":\"sample\",\"Memo\":\"Stone Bridge\",\"ValidAllTilesets\":\"false\",\"<Condition>\":\"\",\"TerrainTag\":\"\",\"RegionId\":\"\",\"AutotileType\":\"\",\"TileId\":\"24\",\"<Contents>\":\"\",\"EncounterRate\":\"\",\"Battleback1\":\"Cobblestones4\",\"Battleback2\":\"Bridge\"}"]
 * @desc This is a list of settings for the encounter rate.
 */
/*~struct~Setting:
 * @param Id
 * @type string
 * @desc @desc Identifier used to call from the note field of a tileset. This is not required if "ValidAllTilesets" is on.
 * 
 * @param Memo
 * @type string
 * @desc This is a memo for identification.
 * It is not used for processing.
 * 
 * @param ValidAllTilesets
 * @type boolean
 * @default false
 * @desc Enables the setting for all tilesets. If turned off, the setting can be applied to individual tilesets.
 * 
 * @param <Condition>
 * 
 * @param TerrainTag
 * @parent <Condition>
 * @type string
 * @desc Specify the Terrain Tag (1~7) to be targeted.
 * Multiple tags can be specified. (Example: 1,3~5)
 * 
 * @param RegionId
 * @parent <Condition>
 * @type string
 * @desc Specify the Region Id (1~255) to be targeted.
 * Multiple ids can be specified. (Example: 1,3~5)
 * 
 * @param AutotileType
 * @parent <Condition>
 * @type string
 * @desc Specify the Autotile Type to be targeted.
 * Multiple types can be specified. (Example: 1,3~5)
 * 
 * @param TileId
 * @parent <Condition>
 * @type string
 * @desc Specify the Tile Id to be targeted.
 * Multiple ids can be specified. (Example: 1,3~5)
 * 
 * @param VehicleType
 * @parent <Condition>
 * @type select
 * @option walk @value
 * @option boat
 * @option ship
 * @option airship
 * @desc The type of vehicle to be covered.
 * 
 * @param <Contents>
 * 
 * @param EncounterRate
 * @parent <Contents>
 * @type number
 * @desc This is the encounter rate when the condition is met.
 * Set it based on 100.
 * 
 * @param Battleback1
 * @parent <Contents>
 * @type file
 * @dir img/battlebacks1
 * @desc This is the Battleback (below) when the conditions are met.
 * Valid only if the tileset is world type.
 * 
 * @param Battleback2
 * @parent <Contents>
 * @type file
 * @dir img/battlebacks2
 * @desc This is the Battleback (above) when the conditions are met.
 * Valid only if the tileset is world type.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.02 戦闘背景やエンカウント率を詳細設定。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/481820874.html
 *
 * @help 戦闘背景やエンカウント率を詳細な条件で設定します。
 *
 * 地形タグやリージョンＩＤ、タイルＩＤやオートタイルタイプを
 * 条件にして戦闘背景やエンカウント率を変更できます。
 * 地形タグは数が限られているし、リージョンは設定が大変なので、
 * オートタイルタイプが便利です。
 * 
 * ※オートタイルタイプの確認には、
 * 　付属のNRP_DebugTile.jsをご活用ください。
 * ※戦闘背景の変更はフィールドタイプのタイルセットのみ有効です。
 * 
 * また、ツクールＭＶ～ＭＺには、
 * デフォルトで以下の隠し仕様が含まれています。
 * 
 * ・茂み属性のエンカウント率は二倍
 * ・乗船（大型船）中のエンカウント率は半減
 * 
 * 場合によっては、ありがた迷惑になりかねません。
 * これらの仕様を変更することも可能です。
 * 
 * ■使用方法
 * プラグインパラメータの設定リストに、
 * 条件、エンカウント率、戦闘背景を入力してください。
 * 登録した『設定ＩＤ』をタイルセットのメモ欄に設定すればＯＫです。
 * 
 * <TerrainSetting:?>
 * 
 * ?の部分が設定リストに登録した『設定ＩＤ』となります。
 * また、カンマ区切りによって複数指定も可能です。
 * <TerrainSetting:A,B,C>
 * 
 * 設定リストには最初からサンプルが登録されています。
 * ツクールのデフォルトのフィールドに合わせた内容になっているので、
 * 参考にしてください。
 * 
 * ■細かい仕様
 * タイルＩＤやオートタイルタイプは、上のレイヤーから順番に判定されます。
 * 設定がないレイヤーのタイルは無視される仕様です。
 * 
 * 例えば、以下のように設定した場合、
 * 
 * ・レイヤー１の平原：エンカウント率１００％
 * ・レイヤー２の森　：エンカウント率２００％
 * ・レイヤー３の町　：設定なし
 * 
 * レイヤー２の森のエンカウント率（２００％）が有効になります。
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param BushEncounterRate
 * @text 茂みのエンカウント率
 * @type number
 * @default 200
 * @desc 茂み上でのエンカウント率です。
 * 100を基準に設定してください。初期値は200。
 * 
 * @param ShipEncounterRate
 * @text 大型船のエンカウント率
 * @type number
 * @default 50
 * @desc 大型船に乗っている時のエンカウント率です。
 * 100を基準に設定してください。初期値は50。
 * 
 * @param SettingList
 * @text 設定リスト
 * @type struct<Setting>[]
 * @default ["{\"Id\":\"sample\",\"Memo\":\"平原\",\"ValidAllTilesets\":\"false\",\"<Condition>\":\"\",\"TerrainTag\":\"\",\"RegionId\":\"\",\"AutotileType\":\"16\",\"TileId\":\"\",\"<Contents>\":\"\",\"EncounterRate\":\"100\",\"Battleback1\":\"DemonCastle2\",\"Battleback2\":\"Lava\"}","{\"Id\":\"sample\",\"Memo\":\"森\",\"ValidAllTilesets\":\"false\",\"<Condition>\":\"\",\"TerrainTag\":\"\",\"RegionId\":\"\",\"AutotileType\":\"20,21\",\"TileId\":\"\",\"<Contents>\":\"\",\"EncounterRate\":\"200\",\"Battleback1\":\"\",\"Battleback2\":\"\"}","{\"Id\":\"sample\",\"Memo\":\"山\",\"ValidAllTilesets\":\"false\",\"<Condition>\":\"\",\"TerrainTag\":\"\",\"RegionId\":\"\",\"AutotileType\":\"22\",\"TileId\":\"\",\"<Contents>\":\"\",\"EncounterRate\":\"200\",\"Battleback1\":\"\",\"Battleback2\":\"\"}","{\"Id\":\"sample\",\"Memo\":\"浜辺\",\"ValidAllTilesets\":\"false\",\"<Condition>\":\"\",\"TerrainTag\":\"\",\"RegionId\":\"\",\"AutotileType\":\"32\",\"TileId\":\"\",\"<Contents>\":\"\",\"EncounterRate\":\"150\",\"Battleback1\":\"\",\"Battleback2\":\"\"}","{\"Id\":\"sample\",\"Memo\":\"砂漠\",\"ValidAllTilesets\":\"false\",\"<Condition>\":\"\",\"TerrainTag\":\"\",\"RegionId\":\"\",\"AutotileType\":\"33\",\"TileId\":\"\",\"<Contents>\":\"\",\"EncounterRate\":\"150\",\"Battleback1\":\"\",\"Battleback2\":\"\"}","{\"Id\":\"sample\",\"Memo\":\"雪原\",\"ValidAllTilesets\":\"false\",\"<Condition>\":\"\",\"TerrainTag\":\"\",\"RegionId\":\"\",\"AutotileType\":\"40\",\"TileId\":\"\",\"<Contents>\":\"\",\"EncounterRate\":\"150\",\"Battleback1\":\"\",\"Battleback2\":\"\"}","{\"Id\":\"sample\",\"Memo\":\"雪の森\",\"ValidAllTilesets\":\"false\",\"<Condition>\":\"\",\"TerrainTag\":\"\",\"RegionId\":\"\",\"AutotileType\":\"44\",\"TileId\":\"\",\"<Contents>\":\"\",\"EncounterRate\":\"200\",\"Battleback1\":\"\",\"Battleback2\":\"\"}","{\"Id\":\"sample\",\"Memo\":\"雪山\",\"ValidAllTilesets\":\"false\",\"<Condition>\":\"\",\"TerrainTag\":\"\",\"RegionId\":\"\",\"AutotileType\":\"47\",\"TileId\":\"\",\"<Contents>\":\"\",\"EncounterRate\":\"200\",\"Battleback1\":\"\",\"Battleback2\":\"\"}","{\"Id\":\"sample\",\"Memo\":\"荒野\",\"ValidAllTilesets\":\"false\",\"<Condition>\":\"\",\"TerrainTag\":\"\",\"RegionId\":\"\",\"AutotileType\":\"24,25\",\"TileId\":\"\",\"<Contents>\":\"\",\"EncounterRate\":\"150\",\"Battleback1\":\"\",\"Battleback2\":\"\"}","{\"Id\":\"sample\",\"Memo\":\"荒野の森\",\"ValidAllTilesets\":\"false\",\"<Condition>\":\"\",\"TerrainTag\":\"\",\"RegionId\":\"\",\"AutotileType\":\"28\",\"TileId\":\"\",\"<Contents>\":\"\",\"EncounterRate\":\"200\",\"Battleback1\":\"\",\"Battleback2\":\"\"}","{\"Id\":\"sample\",\"Memo\":\"平原の道\",\"ValidAllTilesets\":\"false\",\"<Condition>\":\"\",\"TerrainTag\":\"\",\"RegionId\":\"\",\"AutotileType\":\"17\",\"TileId\":\"\",\"<Contents>\":\"\",\"EncounterRate\":\"100\",\"Battleback1\":\"\",\"Battleback2\":\"\"}","{\"Id\":\"sample\",\"Memo\":\"砂の道\",\"ValidAllTilesets\":\"false\",\"<Condition>\":\"\",\"TerrainTag\":\"\",\"RegionId\":\"\",\"AutotileType\":\"29\",\"TileId\":\"\",\"<Contents>\":\"\",\"EncounterRate\":\"100\",\"Battleback1\":\"\",\"Battleback2\":\"\"}","{\"Id\":\"sample\",\"Memo\":\"街道\",\"ValidAllTilesets\":\"false\",\"<Condition>\":\"\",\"TerrainTag\":\"\",\"RegionId\":\"\",\"AutotileType\":\"37\",\"TileId\":\"\",\"<Contents>\":\"\",\"EncounterRate\":\"100\",\"Battleback1\":\"\",\"Battleback2\":\"\"}","{\"Id\":\"sample\",\"Memo\":\"浅い海\",\"ValidAllTilesets\":\"false\",\"<Condition>\":\"\",\"TerrainTag\":\"\",\"RegionId\":\"\",\"AutotileType\":\"0\",\"TileId\":\"\",\"<Contents>\":\"\",\"EncounterRate\":\"100\",\"Battleback1\":\"\",\"Battleback2\":\"\"}","{\"Id\":\"sample\",\"Memo\":\"深い海\",\"ValidAllTilesets\":\"false\",\"<Condition>\":\"\",\"TerrainTag\":\"\",\"RegionId\":\"\",\"AutotileType\":\"1\",\"TileId\":\"\",\"<Contents>\":\"\",\"EncounterRate\":\"100\",\"Battleback1\":\"\",\"Battleback2\":\"\"}","{\"Id\":\"sample\",\"Memo\":\"毒沼\",\"ValidAllTilesets\":\"false\",\"<Condition>\":\"\",\"TerrainTag\":\"\",\"RegionId\":\"\",\"AutotileType\":\"4\",\"TileId\":\"\",\"<Contents>\":\"\",\"EncounterRate\":\"200\",\"Battleback1\":\"\",\"Battleback2\":\"\"}","{\"Id\":\"sample\",\"Memo\":\"溶岩\",\"ValidAllTilesets\":\"false\",\"<Condition>\":\"\",\"TerrainTag\":\"\",\"RegionId\":\"\",\"AutotileType\":\"35\",\"TileId\":\"\",\"<Contents>\":\"\",\"EncounterRate\":\"200\",\"Battleback1\":\"\",\"Battleback2\":\"\"}","{\"Id\":\"sample\",\"Memo\":\"石橋\",\"ValidAllTilesets\":\"false\",\"<Condition>\":\"\",\"TerrainTag\":\"\",\"RegionId\":\"\",\"AutotileType\":\"\",\"TileId\":\"24\",\"<Contents>\":\"\",\"EncounterRate\":\"\",\"Battleback1\":\"Cobblestones4\",\"Battleback2\":\"Bridge\"}"]
 * @desc エンカウント率の設定の一覧です。
 */
/*~struct~Setting:ja
 * @param Id
 * @text 設定ＩＤ
 * @type string
 * @desc タイルセットのメモ欄からの呼び出しに使う識別子です。
 * 『全タイルセットで有効』がオンの場合は不要です。
 * 
 * @param Memo
 * @text メモ
 * @type string
 * @desc 判別用のメモです。
 * 分かりやすい名前を付けてください。
 * 
 * @param ValidAllTilesets
 * @text 全タイルセットで有効
 * @type boolean
 * @default false
 * @desc 設定を全てのタイルセットで有効にします。
 * オフにした場合は、個別のタイルセットに設定できます。
 * 
 * @param <Condition>
 * @text ＜条件＞
 * 
 * @param TerrainTag
 * @text 地形タグ
 * @parent <Condition>
 * @type string
 * @desc 対象とする地形タグ（1~7）を指定します。
 * 複数指定も可能です。（例：1,3~5）
 * 
 * @param RegionId
 * @text リージョンＩＤ
 * @parent <Condition>
 * @type string
 * @desc 対象とするリージョン（1~255）を指定します。
 * 複数指定も可能です。（例：1,3~5）
 * 
 * @param AutotileType
 * @text オートタイルタイプ
 * @parent <Condition>
 * @type string
 * @desc 対象とするオートタイルタイプを指定します。
 * 複数指定も可能です。（例：1,3~5）
 * 
 * @param TileId
 * @text タイルＩＤ
 * @parent <Condition>
 * @type string
 * @desc 対象とするタイルＩＤを指定します。
 * 複数指定も可能です。（例：1,3~5）
 * 
 * @param VehicleType
 * @text 乗物タイプ
 * @parent <Condition>
 * @type select
 * @option 歩行 @value
 * @option 小型船 @value boat
 * @option 大型船 @value ship
 * @option 飛行船 @value airship
 * @desc 対象とする乗物のタイプを指定します。
 * 
 * @param <Contents>
 * @text ＜内容＞
 * 
 * @param EncounterRate
 * @text エンカウント率
 * @parent <Contents>
 * @type number
 * @desc 条件を満たした場合のエンカウント率です。
 * 100を基準に設定してください。
 * 
 * @param Battleback1
 * @text 戦闘背景１
 * @parent <Contents>
 * @type file
 * @dir img/battlebacks1
 * @desc 条件を満たした場合の戦闘背景（下）です。
 * タイルセットがフィールドタイプの場合のみ有効です。
 * 
 * @param Battleback2
 * @text 戦闘背景２
 * @parent <Contents>
 * @type file
 * @dir img/battlebacks2
 * @desc 条件を満たした場合の戦闘背景（上）です。
 * タイルセットがフィールドタイプの場合のみ有効です。
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
    if (str == undefined || str == "") {
        return def;
    }
    return str;
}

/**
 * ●構造体（二重配列）をJSで扱えるように変換
 */
function parseStruct2(arg) {
    var ret = [];

    if (arg) {
        JSON.parse(arg).forEach(function(str) {
            ret.push(JSON.parse(str));
        });
    }

    return ret;
}

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

const PLUGIN_NAME = "NRP_TerrainInfo";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pBushEncounterRate = toNumber(parameters["BushEncounterRate"]);
const pShipEncounterRate = toNumber(parameters["ShipEncounterRate"]);
const pSettingList = parseStruct2(parameters["SettingList"]);

/**
 * ●効率化のため事前変換
 */
for (const setting of pSettingList) {
    setting.settingId = setting.Id;
    setting.validAllTilesets = toBoolean(setting.ValidAllTilesets, false);
    setting.terrainTags = makeArray(setting.TerrainTag);
    setting.regionIds = makeArray(setting.RegionId);
    setting.autotileTypes = makeArray(setting.AutotileType);
    setting.tileIds = makeArray(setting.TileId);
    setting.vehicleType = setDefault(setting.VehicleType);
    setting.encounterRate = toNumber(setting.EncounterRate);
    setting.battleback1 = setDefault(setting.Battleback1);
    setting.battleback2 = setDefault(setting.Battleback2);
}

/**
 * ●エンカウント率補正
 * ※競合を避けるため、やや回りくどい実装になっています。
 */
const _Game_Player_encounterProgressValue = Game_Player.prototype.encounterProgressValue;
Game_Player.prototype.encounterProgressValue = function() {
    let value = _Game_Player_encounterProgressValue.apply(this, arguments);

    // 茂み属性の場合、標準ではエンカウント率二倍になっている。
    if ($gameMap.isBush(this.x, this.y)) {
        // 茂み属性の補正を戻す
        value *= 0.5;
        // さらにプラグインパラメータに従って補正を行う。
        value *= (pBushEncounterRate / 100);
    }

    // 大型船に乗っている場合、標準ではエンカウント率半減になっている。
    if (this.isInShip()) {
        // 船の補正を戻す
        value *= 2;
        // さらにプラグインパラメータに従って補正を行う。
        value *= (pShipEncounterRate / 100);
    }

    const setting = getMatchSetting(this._x, this._y);
    // 条件設定が取得できた場合
    if (setting && setting.encounterRate != undefined) {
        value *= (setting.encounterRate / 100);
    }

    return value;
};

//----------------------------------------
// 戦闘背景
//----------------------------------------

/**
 * ●ＭＺの場合
 */
if (Utils.RPGMAKER_NAME == "MZ") {
    /**
     * ●戦闘背景１
     */
    const _Sprite_Battleback_normalBattleback1Name = Sprite_Battleback.prototype.normalBattleback1Name;
    Sprite_Battleback.prototype.normalBattleback1Name = function() {
        const setting = getMatchSetting($gamePlayer.x, $gamePlayer.y);
        // 条件設定が取得できた場合
        if (setting && setting.battleback1 != undefined) {
            return setting.battleback1;
        }
        
        return _Sprite_Battleback_normalBattleback1Name.apply(this, arguments);
    };

    /**
     * ●戦闘背景２
     */
    const _Sprite_Battleback_normalBattleback2Name = Sprite_Battleback.prototype.normalBattleback2Name;
    Sprite_Battleback.prototype.normalBattleback2Name = function() {
        const setting = getMatchSetting($gamePlayer.x, $gamePlayer.y);
        // 条件設定が取得できた場合
        if (setting && setting.battleback2 != undefined) {
            return setting.battleback2;
        }
        
        return _Sprite_Battleback_normalBattleback2Name.apply(this, arguments);
    };

    /**
     * ●戦闘背景１（乗物）
     */
    const _Sprite_Battleback_shipBattleback1Name = Sprite_Battleback.prototype.shipBattleback1Name;
    Sprite_Battleback.prototype.shipBattleback1Name = function() {
        const setting = getMatchSetting($gamePlayer.x, $gamePlayer.y);
        // 条件設定が取得できた場合
        if (setting && setting.battleback1 != undefined) {
            return setting.battleback1;
        }

        return _Sprite_Battleback_shipBattleback1Name.apply(this, arguments);
    };

    /**
     * ●戦闘背景２（乗物）
     */
    const _Sprite_Battleback_shipBattleback2Name = Sprite_Battleback.prototype.shipBattleback2Name;
    Sprite_Battleback.prototype.shipBattleback2Name = function() {
        const setting = getMatchSetting($gamePlayer.x, $gamePlayer.y);
        // 条件設定が取得できた場合
        if (setting && setting.battleback2 != undefined) {
            return setting.battleback2;
        }

        return _Sprite_Battleback_shipBattleback2Name.apply(this, arguments);
    };

/**
 * ●ＭＶの場合
 */
} else {
    /**
     * ●戦闘背景１
     */
    const _Spriteset_Battle_normalBattleback1Name = Spriteset_Battle.prototype.normalBattleback1Name;
    Spriteset_Battle.prototype.normalBattleback1Name = function() {
        const setting = getMatchSetting($gamePlayer.x, $gamePlayer.y);
        // 条件設定が取得できた場合
        if (setting && setting.battleback1 != undefined) {
            return setting.battleback1;
        }
        
        return _Spriteset_Battle_normalBattleback1Name.apply(this, arguments);
    };

    /**
     * ●戦闘背景２
     */
    const _Spriteset_Battle_normalBattleback2Name = Spriteset_Battle.prototype.normalBattleback2Name;
    Spriteset_Battle.prototype.normalBattleback2Name = function() {
        const setting = getMatchSetting($gamePlayer.x, $gamePlayer.y);
        // 条件設定が取得できた場合
        if (setting && setting.battleback2 != undefined) {
            return setting.battleback2;
        }
        
        return _Spriteset_Battle_normalBattleback2Name.apply(this, arguments);
    };

    /**
     * ●戦闘背景１（乗物）
     */
    const _Spriteset_Battle_shipBattleback1Name = Spriteset_Battle.prototype.shipBattleback1Name;
    Spriteset_Battle.prototype.shipBattleback1Name = function() {
        const setting = getMatchSetting($gamePlayer.x, $gamePlayer.y);
        // 条件設定が取得できた場合
        if (setting && setting.battleback1 != undefined) {
            return setting.battleback1;
        }

        return _Spriteset_Battle_shipBattleback1Name.apply(this, arguments);
    };

    /**
     * ●戦闘背景２（乗物）
     */
    const _Spriteset_Battle_shipBattleback2Name = Spriteset_Battle.prototype.shipBattleback2Name;
    Spriteset_Battle.prototype.shipBattleback2Name = function() {
        const setting = getMatchSetting($gamePlayer.x, $gamePlayer.y);
        // 条件設定が取得できた場合
        if (setting && setting.battleback2 != undefined) {
            return setting.battleback2;
        }

        return _Spriteset_Battle_shipBattleback2Name.apply(this, arguments);
    };
}

//----------------------------------------
// マップ切替時
//----------------------------------------

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
 * ※常駐処理は避けて、極力処理はこちらでやっておく。
 */
function setTilesetInfo() {
    const tileset = $gameMap.tileset();
    // イベントテスト時は存在しないので終了
    if (!tileset) {
        return;
    }
    
    // 設定リスト
    const settingList = [];

    // 条件に一致する設定を抽出する。
    for (const setting of pSettingList) {
        // どのタイルセットでも常に有効の場合
        if (setting.validAllTilesets) {
            // 追加して次へ
            settingList.push(setting);
            continue;
        }

        // 有効な設定ＩＤかどうかを確認
        if (isValidSetting(setting.settingId, tileset)) {
            // 追加して次へ
            settingList.push(setting);
        }
    }

    // タイルセットに設定
    tileset.terrainSettingList = settingList;
}

/**
 * ●エンカウント率設定が指定のタイルセットで有効か？
 */
function isValidSetting(settingId, tileset) {
    if (settingId === undefined) {
        return false;
    }

    const setting = tileset.meta.TerrainSetting;
    if (setting) {
        // カンマ区切りで分解
        const settingArray = setting.split(",");
        // 含まれていればtrue
        return settingArray.includes(settingId);
    }
    return false;
}

//----------------------------------------
// その他共通関数
//----------------------------------------

/**
 * ●現在のキャラクター位置に一致する地形設定を取得する。
 */
function getMatchSetting(x, y) {
    const tileset = $gameMap.tileset();
    // イベントテスト時は存在しないので終了
    if (!tileset) {
        return;
    }
    // 設定がなければundefined
    if (!tileset.terrainSettingList) {
        return undefined;
    }

    // なるべく負荷をかけないよう値を一度だけ取得する。
    let terrainTag;
    let regionId;
    let autotileType;
    let tileId;

    // 設定を１つずつ確認
    for (const setting of tileset.terrainSettingList) {
        let noMatch = false;

        // 地形タグの一致を確認
        if (setting.terrainTags && setting.terrainTags.length > 0) {
            // 未取得なら地形タグを取得
            if (terrainTag === undefined) {
                terrainTag = $gameMap.terrainTag(x, y);
            }

            noMatch = setting.terrainTags.every(function(tag) {
                return terrainTag != tag;
            });
            if (noMatch) {
                continue;
            }
        }

        // リージョンの一致を確認
        if (setting.regionIds && setting.regionIds.length > 0) {
            // 未取得ならリージョンＩＤを取得
            if (regionId === undefined) {
                regionId = $gameMap.regionId(x, y);
            }

            noMatch = setting.regionIds.every(function(id) {
                return regionId != id;
            });
            if (noMatch) {
                continue;
            }
        }

        // オートタイルタイプの一致を確認
        if  (setting.autotileTypes && setting.autotileTypes.length > 0) {
            // 未取得ならオートタイルタイプを取得
            if (autotileType === undefined) {
                const layerNo = getValidLayer(x, y);
                autotileType = $gameMap.autotileType(x, y, layerNo);
            }

            noMatch = setting.autotileTypes.every(function(type) {
                return autotileType != type;
            });
            if (noMatch) {
                continue;
            }
        }

        // タイルＩＤの一致を確認
        if  (setting.tileIds && setting.tileIds.length > 0) {
            // 未取得ならタイルＩＤを取得
            if (tileId === undefined) {
                const layerNo = getValidLayer(x, y);
                tileId = $gameMap.tileId(x, y, layerNo);
            }

            noMatch = setting.tileIds.every(function(id) {
                return tileId != id;
            });
            if (noMatch) {
                continue;
            }
        }

        // 乗物タイプの一致を確認
        if (setting.vehicleType) {
            // 乗物タイプが不一致なら次へ
            if (setting.vehicleType != $gamePlayer._vehicleType) {
                continue;
            }
        }

        // 条件を満たす設定があった。
        return setting;
    }

    // なければundefined
    return undefined;
}

/**
 * ●有効な最大レイヤー番号を取得
 */
function getValidLayer(x, y) {
    // 各タイルが保有するフラグ情報
    const flags = $gameMap.tilesetFlags();
    // 上のレイヤーから順番にループ
    const tiles = $gameMap.layeredTiles(x, y);
    for (let i = 0; i < 4; i++) {
        const tileId = tiles[i];
        const layerNo = 3 - i;

        // tileIdが存在するレイヤーを取得
        if (tileId) {
            return layerNo;
        }
        // // 通行判定☆（0x10）を除く最初のタイルが対象
        // if ((flags[tileId] & 0x10) === 0) {
        //     return layerNo;
        // }
    }
    // 無効の場合は-1
    return -1;
}

})();
