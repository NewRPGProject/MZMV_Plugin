//=============================================================================
// NRP_PutRandomEvents.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.00 Randomly place events on the map.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @base TemplateEvent
 * @base EventReSpawn
 * @url http://newrpg.seesaa.net/article/486255548.html
 *
 * @help Randomly place events on the map.
 * Placement can be conditioned on passage information,
 * region, terrain tag, tile ID, and auto-tile type.
 * 
 * Basically, it is intended for
 * automatic placement of enemy events in symbol encounters and ARPGs.
 * 
 * The following official launch plugins are required to use this plugin.
 * 
 * - TemplateEvent.js
 * - EventReSpawn.js
 * 
 * Both are available from.
 * [RPG Maker MZ]\dlc\BasicResources\plugins\launch
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * 1. Create a template event following
 *    the instructions in TemplateEvent.js.
 * 2. Execute each plugin command and specify the template event ID
 *    and other information.
 *    ※See the following plugin commands for details.
 * 
 * Note that the behavior of placed events follows
 * the specifications of TemplateEvent.js and EventReSpawn.js.
 * 
 * -------------------------------------------------------------------
 * [Plugin Commands]
 * -------------------------------------------------------------------
 * ◆PutEventsByPassage
 * Randomly place events based on map passage information.
 * 
 * ◆PutEventsByRegion
 * Randomly place events in the specified region ID.
 * 
 * ◆PutEventsByTerrain
 * Randomly places events on the specified terrain tag.
 * 
 * ◆PutEventsByTile
 * Randomly places events on the specified tiles.
 * Can also be specified by Autotile Type.
 * 
 * -------------------------------------------------------------------
 * In common with both commands, the event will not be placed
 * at coordinates where an event has already been placed.
 * ※Duplicate placement is allowed only in the case of Through.
 * Placement will be stopped when all coordinates become unplaceable.
 * 
 * For Region ID, Terrain Tag, Tile ID, and Autotile Type,
 * you can use formulas or specify multiple (e.g.1: 1,2,3 e.g.2: 1~3).
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
 * @ Plugin Commands
 * @------------------------------------------------------------------
 * 
 * @command PutEventsByPassage
 * @desc Randomly place events based on map passage information.
 * 
 * @arg TemplateId
 * @type string
 * @desc Template ID of the event to be placed.
 * Specify the event name/ID for TemplateEvent.js.
 * 
 * @arg NumberOfEvents
 * @type number
 * @default 1
 * @desc The number of events to place.
 * 
 * @arg PassageType
 * @type select
 * @option All @value ALL
 * @option Passable Only @value ON
 * @option Impassable Only @value OFF
 * @default ALL
 * @desc This is a passage type of event placement.
 * 
 * @------------------------------------------------------------------
 * 
 * @command PutEventsByRegion
 * @desc Randomly place events in the specified region ID.
 * 
 * @arg TemplateId
 * @type string
 * @desc Template ID of the event to be placed.
 * Specify the event name/ID for TemplateEvent.js.
 * 
 * @arg NumberOfEvents
 * @type number
 * @default 1
 * @desc The number of events to place.
 * 
 * @arg RegionId
 * @type string
 * @desc The ID of the region where the event will be placed.
 * 
 * @------------------------------------------------------------------
 * 
 * @command PutEventsByTerrain
 * @desc Randomly places events on the specified terrain tag.
 * 
 * @arg TemplateId
 * @type string
 * @desc Template ID of the event to be placed.
 * Specify the event name/ID for TemplateEvent.js.
 * 
 * @arg NumberOfEvents
 * @type number
 * @default 1
 * @desc The number of events to place.
 * 
 * @arg TerrainTag
 * @type string
 * @desc This is the terrain tag where the event will be placed.
 * 
 * @------------------------------------------------------------------
 * 
 * @command PutEventsByTile
 * @desc Randomly places events on the specified tiles.
 * Can also be specified by Auto-tile Type.
 * 
 * @arg TemplateId
 * @type string
 * @desc Template ID of the event to be placed.
 * Specify the event name/ID for TemplateEvent.js.
 * 
 * @arg NumberOfEvents
 * @type number
 * @default 1
 * @desc The number of events to place.
 * 
 * @arg TileId
 * @type string
 * @desc Tile ID where the event will be placed.
 * 
 * @arg AutotileType
 * @type string
 * @desc Autotile ID where the event will be placed.
 * 
 * @------------------------------------------------------------------
 * @ Plugin Parameters
 * @------------------------------------------------------------------
 * 
 * @param KeepPlayerDistance
 * @type number
 * @default 0
 * @desc The placement of events is prohibited at coordinates within a specified range from the player.
 * 
 * @param ProhibitedRegion
 * @type number
 * @desc Regions where placement is prohibited.
 * 
 * @param CheckOpenDistance
 * @type number
 * @default 0
 * @desc Confirms that the event's placement coordinates are in an open area to the extent specified.
 * 
 * @param PassableOnly
 * @type boolean
 * @default true
 * @desc Place only at points where the event is passable.
 * See also the setting by other plugins (e.g. NRP_ChangePassage).
 * 
 * @param IgnoreStarTile
 * @type boolean
 * @default false
 * @desc When specifying tiles, ignore ☆ tiles (upper layer).
 * That is, it will place them on the hidden lower tiles.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.00 イベントをランダム配置します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @base TemplateEvent
 * @base EventReSpawn
 * @url http://newrpg.seesaa.net/article/486255548.html
 *
 * @help マップ上にイベントをランダム配置します。
 * 通行情報、リージョン、地形タグ、タイルＩＤ、オートタイルタイプを
 * 条件にして配置することができます。
 * 
 * 基本的には、シンボルエンカウントやＡＲＰＧなどにおける、
 * 敵イベントの自動配置を目的としています。
 * 
 * このプラグインの使用には以下の公式ローンチプラグインが必須です。
 * 
 * ・TemplateEvent.js
 * ・EventReSpawn.js
 * 
 * いずれも以下から入手できます。
 * [RPG Maker MZ]\dlc\BasicResources\plugins\launch
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * 1. TemplateEvent.jsの説明に従い、テンプレートイベントを作成します。
 * 2. 各プラグインコマンドを実行し、
 *    テンプレートイベントのＩＤ等の情報を指定してください。
 *    ※詳細は以下のプラグインコマンドをご覧ください。
 * 
 * なお、配置されたイベントの挙動は『TemplateEvent.js』
 * および『EventReSpawn.js』の仕様に従います。
 * 
 * -------------------------------------------------------------------
 * ■プラグインコマンド
 * -------------------------------------------------------------------
 * ◆イベントの配置(通行)
 * マップの通行情報を元にイベントをランダム配置します。
 * 
 * ◆イベントの配置(リージョン)
 * 指定したリージョンＩＤにイベントをランダム配置します。
 * 
 * ◆イベントの配置(地形タグ)
 * 指定した地形タグにイベントをランダム配置します。
 * 
 * ◆イベントの配置(タイル)
 * 指定したタイルにイベントをランダム配置します。
 * オートタイルタイプでの指定も可能です。
 * 
 * -------------------------------------------------------------------
 * いずれのコマンドでも共通して、
 * 既にイベントが配置されている座標には配置されません。
 * ※すり抜けの場合のみ重複配置を許可します。
 * 全ての座標が配置不可となった時点で配置は停止されます。
 * 
 * リージョンＩＤ、地形タグ、タイルＩＤ、オートタイルタイプについては、
 * 数式の使用や複数指定（例１：1,2,3　例２：1~3）も可能です。
 * 
 * -------------------------------------------------------------------
 * ■利用規約
 * -------------------------------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @------------------------------------------------------------------
 * @ プラグインコマンド
 * @------------------------------------------------------------------
 * 
 * @command PutEventsByPassage
 * @text イベントの配置(通行)
 * @desc マップの通行情報を元にイベントをランダム配置します。
 * 
 * @arg TemplateId
 * @text テンプレートＩＤ
 * @type string
 * @desc 配置するイベントのテンプレートＩＤです。
 * TemplateEvent.js用のイベント名／ＩＤを指定してください。
 * 
 * @arg NumberOfEvents
 * @text 配置する数
 * @type number
 * @default 1
 * @desc イベントを配置する数です。
 * 
 * @arg PassageType
 * @text 通行タイプ
 * @type select
 * @option 全て @value ALL
 * @option 通行可のみ @value ON
 * @option 通行不可のみ @value OFF
 * @default ALL
 * @desc イベントの配置を行う通行タイプです。
 * 
 * @------------------------------------------------------------------
 * 
 * @command PutEventsByRegion
 * @text イベントの配置(リージョン)
 * @desc 指定したリージョンにイベントをランダム配置します。
 * 
 * @arg TemplateId
 * @text テンプレートＩＤ
 * @type string
 * @desc 配置するイベントのテンプレートＩＤです。
 * TemplateEvent.js用のイベント名／ＩＤを指定してください。
 * 
 * @arg NumberOfEvents
 * @text 配置する数
 * @type number
 * @default 1
 * @desc イベントを配置する数です。
 * 
 * @arg RegionId
 * @text リージョンＩＤ
 * @type string
 * @desc イベントを配置するリージョンのＩＤです。
 * 
 * @------------------------------------------------------------------
 * 
 * @command PutEventsByTerrain
 * @text イベントの配置(地形タグ)
 * @desc 指定した地形タグにイベントをランダム配置します。
 * 
 * @arg TemplateId
 * @text テンプレートＩＤ
 * @type string
 * @desc 配置するイベントのテンプレートＩＤです。
 * TemplateEvent.js用のイベント名／ＩＤを指定してください。
 * 
 * @arg NumberOfEvents
 * @text 配置する数
 * @type number
 * @default 1
 * @desc イベントを配置する数です。
 * 
 * @arg TerrainTag
 * @text 地形タグ
 * @type string
 * @desc イベントを配置する地形タグです。
 * 
 * @------------------------------------------------------------------
 * 
 * @command PutEventsByTile
 * @text イベントの配置(タイル)
 * @desc 指定したタイルにイベントをランダム配置します。
 * 
 * @arg TemplateId
 * @text テンプレートＩＤ
 * @type string
 * @desc 配置するイベントのテンプレートＩＤです。
 * TemplateEvent.js用のイベント名／ＩＤを指定してください。
 * 
 * @arg NumberOfEvents
 * @text 配置する数
 * @type number
 * @default 1
 * @desc イベントを配置する数です。
 * 
 * @arg TileId
 * @text タイルＩＤ
 * @type string
 * @desc イベントを配置するタイルＩＤです。
 * 
 * @arg AutotileType
 * @text オートタイルタイプ
 * @type string
 * @desc イベントを配置するオートタイルタイプです。
 * 
 * @------------------------------------------------------------------
 * @ プラグインパラメータ
 * @------------------------------------------------------------------
 * 
 * @param KeepPlayerDistance
 * @text プレイヤーと離す距離
 * @type number
 * @default 0
 * @desc プレイヤーから指定範囲内のマスにはイベントの配置を禁止します。
 * 
 * @param ProhibitedRegion
 * @text 配置禁止リージョン
 * @type number
 * @desc 配置を禁止するリージョンです。
 * 
 * @param CheckOpenDistance
 * @text 開放確認範囲
 * @type number
 * @default 0
 * @desc イベントの設置座標が開けた場所であることを数値分だけ確認。
 * 値が大きいと処理が重くなります。
 * 
 * @param PassableOnly
 * @text 通行可能な地点のみ配置
 * @type boolean
 * @default true
 * @desc イベントが通行可能な地点にのみ配置します。
 * 別プラグイン（NRP_ChangePassageなど）による設定も参照。
 * 
 * @param IgnoreStarTile
 * @text ☆タイルを除外
 * @type boolean
 * @default false
 * @desc タイル指定時、☆タイル（上層）を無視します。
 * つまり、上層に隠れた下層タイルにも配置を行います。
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

const PLUGIN_NAME = "NRP_PutRandomEvents";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pKeepPlayerDistance = toNumber(parameters["KeepPlayerDistance"]);
const pProhibitedRegion = toNumber(parameters["ProhibitedRegion"]);
const pCheckOpenDistance = toNumber(parameters["CheckOpenDistance"]);
const pPassableOnly = toBoolean(parameters["PassableOnly"], false);
const pIgnoreStarTile = toBoolean(parameters["IgnoreStarTile"], false);

// 通行情報を保持する構造体
let $dataPassageTable = null;
// リージョン情報を保持する構造体
let $dataRegionTable = null;
// 地形タグ情報を保持する構造体
let $dataTerrainTagTable = null;
// タイル情報を保持する構造体
let $dataTileTable = null;
// オートタイル情報を保持する構造体
let $dataAutotileTable = null;

/**
 * ●引数を元に対象の配列を取得する。
 * ※bindによってinterpreterをthisに渡して用いる。
 */
function makeTargets(targetId) {
    const targets = [];

    // 無効なら処理しない。
    if (targetId === undefined || targetId === null || targetId === "") {
        return targets;
    }

    // カンマ区切りでループ
    for (let id of targetId.split(",")) {
        // 空白除去
        id = id.trim();
        // 1~5というように範囲指定の場合
        // ※~が存在する。
        if (id.indexOf("~") >= 0) {
            const idRange = id.split("~");
            const idRangeStart = eval(idRange[0]);
            const idRangeEnd = eval(idRange[1]);

            // IDの指定範囲で実行
            // 開始のほうが終了より大きい場合は反対に実行
            if (idRangeEnd < idRangeStart) {
                for (let i = idRangeStart; i >= idRangeEnd; i--) {
                    const evalId = eval(i);
                    if (evalId != null) {
                        targets.push(evalId);
                    }
                }
            } else {
                for (let i = idRangeStart; i <= idRangeEnd; i++) {
                    const evalId = eval(i);
                    if (evalId != null) {
                        targets.push(evalId);
                    }
                }
            }
            
        // 通常時
        } else {
            const evalId = eval(id);
            if (evalId != null) {
                targets.push(evalId);
            }
        }
    }
    return targets;
}

//-----------------------------------------------------------------------------
// ＭＺ用プラグインコマンド（通行情報）
//-----------------------------------------------------------------------------

/**
 * ●イベントを通行情報を元にランダム配置
 */
PluginManager.registerCommand(PLUGIN_NAME, "PutEventsByPassage", function(args) {
    // 通行テーブルが存在しない場合は生成
    if (!$dataPassageTable) {
        makePassageTable();
    }

    const passageTypes = makePassageTypes(args.PassageType);
    const templateId = args.TemplateId;
    const numberOfEvents = eval(args.NumberOfEvents) || 1;

    // 対象となる座標配列を取得
    const coordinates = makeTargetCoordinates($dataPassageTable, passageTypes);

    // イベントの配置を行う
    // ※bindによってthisをメソッドに渡す。
    putEvents.bind(this)(coordinates, templateId, numberOfEvents, true);
});

/**
 * ●通行情報の配列を生成する。
 */
function makePassageTypes(arg) {
    if (arg == "ON") {
        return [true];
    } else if (arg == "OFF") {
        return [false];
    }
    return [true, false];
}

/**
 * ●通行情報テーブルの作成
 */
function makePassageTable() {
    $dataPassageTable = [];
    const width = $dataMap.width;
    const height = $dataMap.height;

    // マップ上の全座標を走査し、通行情報毎に座標を格納する。
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            // プレイヤーに近すぎる場合は対象外
            if (isNearPlayer(x, y)) {
                continue;
            // 禁止リージョンならば対象外
            } else if (isProhibitedRegion(x, y)) {
                continue;
            }

            const passable = $gameMap.checkPassage(x, y, 0x0f);
            putData(x, y, passable, $dataPassageTable);
        }
    }
}

//-----------------------------------------------------------------------------
// ＭＺ用プラグインコマンド（リージョン）
//-----------------------------------------------------------------------------

/**
 * ●イベントをリージョン上にランダム配置
 */
PluginManager.registerCommand(PLUGIN_NAME, "PutEventsByRegion", function(args) {
    // リージョンテーブルが存在しない場合は生成
    if (!$dataRegionTable) {
        makeRegionTable();
    }

    const regionIds = makeTargets(args.RegionId);
    const templateId = args.TemplateId;
    const numberOfEvents = eval(args.NumberOfEvents) || 1;

    // 対象となる座標配列を取得
    const coordinates = makeTargetCoordinates($dataRegionTable, regionIds);

    // イベントの配置を行う
    // ※bindによってthisをメソッドに渡す。
    putEvents.bind(this)(coordinates, templateId, numberOfEvents, true);
});

/**
 * ●リージョンテーブルの作成
 */
function makeRegionTable() {
    $dataRegionTable = [];
    const width = $dataMap.width;
    const height = $dataMap.height;

    // マップ上の全座標を走査し、リージョン毎に座標を格納する。
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            // プレイヤーに近すぎる場合は対象外
            if (isNearPlayer(x, y)) {
                continue;
            }

            const regionId = $gameMap.regionId(x, y);
            putData(x, y, regionId, $dataRegionTable);
        }
    }
}

//-----------------------------------------------------------------------------
// ＭＺ用プラグインコマンド（地形タグ）
//-----------------------------------------------------------------------------

/**
 * ●イベントを地形タグ上にランダム配置
 */
PluginManager.registerCommand(PLUGIN_NAME, "PutEventsByTerrain", function(args) {
    // リージョンテーブルが存在しない場合は生成
    if (!$dataTerrainTagTable) {
        makeTerrainTagTable();
    }

    const terrainTags = makeTargets(args.TerrainTag);
    const templateId = args.TemplateId;
    const numberOfEvents = eval(args.NumberOfEvents) || 1;

    // 対象となる座標配列を取得
    const coordinates = makeTargetCoordinates($dataTerrainTagTable, terrainTags);

    // イベントの配置を行う
    // ※bindによってthisをメソッドに渡す。
    putEvents.bind(this)(coordinates, templateId, numberOfEvents, true);
});

/**
 * ●地形タグテーブルの作成
 */
function makeTerrainTagTable() {
    $dataTerrainTagTable = [];
    const width = $dataMap.width;
    const height = $dataMap.height;

    // マップ上の全座標を走査し、地形タグ毎に座標を格納する。
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            // プレイヤーに近すぎる場合は対象外
            if (isNearPlayer(x, y)) {
                continue;
            // 禁止リージョンならば対象外
            } else if (isProhibitedRegion(x, y)) {
                continue;
            }

            const terrainTag = $gameMap.terrainTag(x, y);
            putData(x, y, terrainTag, $dataTerrainTagTable);
        }
    }
}

//-----------------------------------------------------------------------------
// ＭＺ用プラグインコマンド（タイル）
//-----------------------------------------------------------------------------

/**
 * ●イベントをタイル上にランダム配置
 */
PluginManager.registerCommand(PLUGIN_NAME, "PutEventsByTile", function(args) {
    // タイルテーブルが存在しない場合は生成
    if (!$dataTileTable && !$dataAutotileTable) {
        makeTileTable();
    }

    const tileIds = makeTargets(args.TileId);
    const autotileTypes = makeTargets(args.AutotileType);
    const templateId = args.TemplateId;
    const numberOfEvents = eval(args.NumberOfEvents) || 1;

    // 対象となる座標配列を取得（タイルＩＤ）
    let coordinates = makeTargetCoordinates($dataTileTable, tileIds);
    // オートタイル分を追加
    coordinates = coordinates.concat(makeTargetCoordinates($dataAutotileTable, autotileTypes));

    // イベントの配置を行う
    // ※bindによってthisをメソッドに渡す。
    putEvents.bind(this)(coordinates, templateId, numberOfEvents, true);
});

/**
 * ●タイルテーブルの作成
 * ※オートタイルタイプと同時に作成
 */
function makeTileTable() {
    $dataTileTable = [];
    $dataAutotileTable = [];
    const width = $dataMap.width;
    const height = $dataMap.height;

    const flags = $gameMap.tilesetFlags();

    // マップ上の全座標を走査し、タイル毎に座標を格納する。
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            // プレイヤーに近すぎる場合は対象外
            if (isNearPlayer(x, y)) {
                continue;
            // 禁止リージョンならば対象外
            } else if (isProhibitedRegion(x, y)) {
                continue;
            }

            let tileId;
            // 通行判定☆（0x10）を除く最上のタイルが対象
            if (pIgnoreStarTile) {
                tileId = $gameMap.allTiles(x, y).find(tileId => (flags[tileId] & 0x10) === 0) || 0;
            // タイルＩＤ=0を除く最上のタイルが対象
            } else {
                tileId = $gameMap.allTiles(x, y).find(tileId => tileId) || 0;
            }

            putData(x, y, tileId, $dataTileTable);
            // オートタイルＩＤに変換
            const autotileType = getAutotileType(tileId);
            putData(x, y, autotileType, $dataAutotileTable);
        }
    }
}

// ----------------------------------------------------------------------------
// Game_Player
// ----------------------------------------------------------------------------

/**
 * ●場所移動時
 */
const _Game_Player_performTransfer = Game_Player.prototype.performTransfer;
Game_Player.prototype.performTransfer = function() {
    // 各テーブルをクリア
    if (this.isTransferring()) {
        $dataPassageTable = null;
        $dataRegionTable = null;
        $dataTerrainTagTable = null;
        $dataTileTable = null;
        $dataAutotileTable = null;
    }

    _Game_Player_performTransfer.apply(this, arguments);
};

// ----------------------------------------------------------------------------
// 指定位置が開かれた空間かどうかを調べる
// ----------------------------------------------------------------------------

/**
 * ●指定座標が開かれた空間かどうか？
 */
function isOpenSpace(event, x, y) {
    // 移動距離
    const cost = pCheckOpenDistance;
    // 指定がない場合は常に開放と判定
    if (!cost) {
        return true;
    }

    // 二重配列を初期化（現在の座標から移動距離分を確保）
    let coordinates = [];
    for (let i = x - cost; i <= x + cost; i++) {
        coordinates[i] = [];
    }

    // 現在地に最大移動距離を設定
    coordinates[x][y] = cost;

    const originalArgs = [];
    originalArgs.x = x;
    originalArgs.y = y;
    originalArgs.cost = cost;

    // ４方向をサーチ（上右下左）
    const newCost = cost - 1;
    // 走査を行いながら、条件を満たしたら終了
    if (searchGrid(event, x, y - 1, newCost, coordinates, originalArgs)) {
        return true;
    } else if (searchGrid(event, x + 1, y, newCost, coordinates, originalArgs)) {
        return true;
    } else if (searchGrid(event, x, y + 1, newCost, coordinates, originalArgs)) {
        return true;
    } else if (searchGrid(event, x - 1, y, newCost, coordinates, originalArgs)) {
        return true;
    }
    return false;
}

/**
 * ●座標を探索する。
 */
function searchGrid(event, x, y, cost, coordinates, originalArgs) {
    // 既に現在値以上の残コストが入っている場合
    // または-1（移動不可）の場合は終了
    if (coordinates[x][y] >= cost || coordinates[x][y] == -1) {
        return;

    // 移動可能の場合
    } else if (isPassable(event, x, y)) {
        // 既に最大距離に達しているならＯＫ
        // ※基準とする座標から進んだ歩数で判定
        if (Math.abs(x - originalArgs.x) + Math.abs(y - originalArgs.y) >= originalArgs.cost) {
            return true;
        }

        // 残コストを設定
        coordinates[x][y] = cost;
        // 残コストが0ならば終了
        if (cost == 0) {
            return false;
        }
        // まだ探索可能なら、再帰的に次の座標を検索
        const newCost = cost - 1;
        // 走査を行いながら、条件を満たしたら終了
        if (searchGrid(event, x, y - 1, newCost, coordinates, originalArgs)) {
            return true;
        } else if (searchGrid(event, x + 1, y, newCost, coordinates, originalArgs)) {
            return true;
        } else if (searchGrid(event, x, y + 1, newCost, coordinates, originalArgs)) {
            return true;
        } else if (searchGrid(event, x - 1, y, newCost, coordinates, originalArgs)) {
            return true;
        }

    // 移動不可ならば-1を設定
    } else {
        coordinates[x][y] = -1;
    }
    return false;
}

// ----------------------------------------------------------------------------
// 共通関数
// ----------------------------------------------------------------------------

/**
 * ●データを登録
 */
function putData(x, y, value, table) {
    // 値が存在する場合
    if (value != null) {
        // 最初は初期化
        if (!table[value]) {
            table[value] = [];
        }
        // 座標情報を追加
        table[value].push({x: x, y: y});
    }
}

/**
 * ●対象となる座標データを生成する。
 */
function makeTargetCoordinates(table, ids) {
    let coordinates = [];
    // 対象ＩＤの座標データを結合する。
    for (const id of ids) {
        coordinates = coordinates.concat(table[id]);
    }
    return coordinates;
}

/**
 * ●イベントをランダム配置する。（全体制御）
 */
function putEvents(coordinates, templateId, numberOfEvents, isCheckOpen) {
    if (!coordinates) {
        return;
    }

    // 有効な座標に限定
    // ※すり抜け以外のイベントが配置されている場合は無効
    coordinates = coordinates.filter(point => isValidPoint(point));
    // 有効な座標が一つもない場合は終了
    if (coordinates.length == 0) {
        return;
    }

    // 必要数だけ実行
    for (let i = 0; i < numberOfEvents; i++) {
        // ※bindによってthisをメソッドに渡す。
        putEvent.bind(this)(coordinates, templateId, isCheckOpen);
    }
}

/**
 * ●有効な座標かどうかを判定
 */
function isValidPoint(point) {
    // 座標が有効で、かつイベントが存在しない。
    return point && $gameMap.eventsXyNt(point.x, point.y).length == 0;
}

/**
 * ●イベントをランダム配置する。
 */
function putEvent(coordinates, templateId, isCheckOpen) {
    // 有効な座標がなくなれば終了
    if (coordinates.length == 0) {
        return;
    }

    // テンプレートマップ上のイベントＩＤ
    const originalEventId = this.getEventIdForEventReSpawn(templateId, true);

    // ランダムに座標を取得
    let randomIndex = Math.randomInt(coordinates.length);
    let point = coordinates[randomIndex];

    // 判定用に仮のイベントを作成する。
    const templateEvent = new Game_PrefabEvent($gameMap._mapId, null, originalEventId, point.x, point.y, true);

    // 通行可能かどうかを確認する。
    if (pPassableOnly) {
        while(!isPassable(templateEvent, point.x, point.y)) {
            // 対象の座標データを除去
            coordinates.splice(randomIndex, 1);
            // 有効な座標がなくなれば終了
            if (coordinates.length == 0) {
                return;
            }
            // ランダムに座標を再取得
            randomIndex = Math.randomInt(coordinates.length);
            point = coordinates[randomIndex];
        }
    }

    // 座標が開かれた空間かどうかを確認する。
    if (isCheckOpen) {
        while (!isOpenSpace(templateEvent, point.x, point.y)) {
            // 対象の座標データを除去
            coordinates.splice(randomIndex, 1);
            // 有効な座標がなくなれば終了
            if (coordinates.length == 0) {
                return;
            }
            // ランダムに座標を再取得
            randomIndex = Math.randomInt(coordinates.length);
            point = coordinates[randomIndex];
        }
    }

    // 配置実行（EventReSpawn.jsおよびTemplateEvent.jsと連携）
    $gameMap.spawnEvent(originalEventId, point.x, point.y, true);
    // 配置した座標データを除去
    coordinates.splice(randomIndex, 1);
}

/**
 * ●タイルＩＤからオートタイルタイプを取得
 * ※高速化のためGame_Mapの関数は使わない。
 */
function getAutotileType(tileId) {
    return tileId >= 2048 ? Math.floor((tileId - 2048) / 48) : -1;
};

/**
 * ●イベントが通行可能な地点かを確認
 */
function isPassable(event, x, y) {
    return event.isThrough() || event.isMapPassable(x, y);
}

/**
 * ●プレイヤーに近すぎないかを判定
 */
function isNearPlayer(x, y) {
    // 距離の指定がない場合は対象外
    if (!pKeepPlayerDistance) {
        return false;
    }

    const distance = Math.abs($gamePlayer.x - x) + Math.abs($gamePlayer.y - y);
    return distance <= pKeepPlayerDistance;
}

/**
 * ●禁止リージョンかどうかを判定
 */
function isProhibitedRegion(x, y) {
    return pProhibitedRegion
        && $gameMap.regionId(x, y) == pProhibitedRegion;
}

})();
