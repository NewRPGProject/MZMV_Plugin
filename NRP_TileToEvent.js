//=============================================================================
// NRP_TileToEvent.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.06 Automatically generate events on tiles.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/481496398.html
 *
 * @help Automatically generate events on tiles.
 * You can automatically generate specified events on top of them,
 * conditioned on TileID, AutotileType, TerrainTag, and RegionID.
 * 
 * It is also possible to erase tiles and replace them with events.
 * ※Only when TileID or AutotileType is a condition.
 * 
 * ■Usage
 * First, prepare the event you want to generate.
 * 
 * 1. Create a map for the template and create the events.
 *    Name the events for clarity.
 * 2. Register the map ID in the TemplateMapId of the plugin parameter.
 * 
 * In short, it's almost the same as
 * the official launch plugin TemplateEvent.js (by Triacontane).
 * 
 * Next, specify the conditions in the "SettingsList" of the plugin parameters,
 * and enter the "EventId Or Name" of the event to be generated.
 * In this case, set the "SettingId" for reference.
 * 
 * ※If you want to refer to TileIDs or AutotileTypes,
 * the optional "NRP_DebugTile.js" is useful.
 * 
 * Finally, register the "SettingId" in the note of the tileset,
 * and you are done.
 * Enter a value in part ? below.
 * 
 * <TileToEvent:?>
 * 
 * ■Plugin Command (MZ)
 * >CallId
 * If SettingId is specified, the process will be executed.
 * The contents are the same as
 * when the SettingId is registered to the tileset.
 * 
 * ■Plugin Command (MV)
 * > NRP.TileToEvent.CallId [SettingId]
 * The process is the same as the MZ version.
 * 
 * ■Notice
 * Due to Maker's specifications, the mere existence of an event
 * will gradually increase the load on the map.
 * For example, if you generate a large number of events,
 * over a thousand. the system may become sluggish.
 * 
 * This plugin includes a process to stop drawing
 * when the generated event is outside the screen range.
 * This can reduce the load to some extent.
 * 
 * Also, due to the specification of checking & processing tiles
 * one square at a time, generating a large number of events
 * on a large map will take a little bit of time.
 * ※However, unless you do a lot of processing, it will only take a moment.
 * 
 * ■Acknowledgment
 * This plugin refers to and uses processing
 * from the following plugins by Triacontane.
 * 
 * - TemplateEvent.js
 * - EventReSpawn.js
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 * 
 * @command CallId
 * @desc Generate events based on the registered SettingId.
 * 
 * @arg SettingId
 * @desc This is the SettingId of the process to be executed.
 * You can specify multiple IDs separated by commas.
 * @type string
 * 
 * 
 * @param TemplateMapId
 * @desc The map ID where the tile replacement event will be placed.
 * @type number
 * 
 * @param SettingList
 * @type struct<Setting>[]
 * @desc The following is a list of settings.
 * 
 * @param InitEventOnLoad
 * @desc Initializes the events when the game loads.
 * The position of the events will no longer be saved.
 * @type boolean
 * @default true
 * 
 * @param ApplyChangeTileset
 * @desc The process is also executed when the tileset is changed.
 * @type boolean
 * @default false
 * 
 * @param <SpeedUpProcessing>
 * 
 * @param StopOutOfRange
 * @parent <SpeedUpProcessing>
 * @desc Stops drawing events outside the screen range.
 * This will result in a significant reduction in processing.
 * @type boolean
 * @default true
 * 
 * @param OutOfRangeMargin
 * @parent <SpeedUpProcessing>
 * @desc The width of the margin to be considered out of range.
 * It will not stop even if it is slightly outside the screen.
 * @type number
 * @default 100
 */

/*~struct~Setting:
 * @param SettingId
 * @type string
 * @desc The identifier used for calls from a note in the tilesets.
 * This is not required if "ValidAllTilesets" is on.
 * 
 * @param ValidAllTilesets
 * @type boolean
 * @default false
 * @desc Enables the setting for all tilesets. If turned off, the setting can be applied to individual tilesets.
 * 
 * @param <Condition>
 * 
 * @param TileId
 * @parent <Condition>
 * @type string
 * @desc Specify the tile ID to be targeted.
 * You can specify multiple tile IDs. (Example: 1,3~5)
 * 
 * @param AutotileType
 * @parent <Condition>
 * @type string
 * @desc Specify the AutotileType to be targeted.
 * You can specify multiple AutotileTypes. (Example: 1,3~5)
 * 
 * @param TerrainTag
 * @parent <Condition>
 * @type string
 * @desc Specify the terrain tag (1~7) to be targeted.
 * Multiple tags can be specified. (Example: 1,3~5)
 * 
 * @param RegionId
 * @parent <Condition>
 * @type string
 * @desc Specify the region (1~255) to be targeted.
 * You can specify multiple regions. (Example: 1,3~5)
 * 
 * @param <ReplaceSetting>
 * 
 * @param EventId
 * @text EventId Or Name
 * @parent <ReplaceSetting>
 * @type string
 * @desc This is the event to be replaced; both ID and name are valid.
 * 
 * @param Replace
 * @parent <ReplaceSetting>
 * @type boolean
 * @default true
 * @desc Erase the original tile.
 * Valid only if TileId or AutotileType is a condition.
 * 
 * @param AdjustX
 * @parent <ReplaceSetting>
 * @type number @max 99 @min -99
 * @desc Corrects the X coordinate to generate events.
 * 
 * @param AdjustY
 * @parent <ReplaceSetting>
 * @type number @max 99 @min -99
 * @desc Corrects the Y coordinate to generate events.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.06 タイル上に自動でイベントを生成します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/481496398.html
 *
 * @help タイル上に自動でイベントを生成します。
 * タイルＩＤ、オートタイルタイプ、地形タグ、リージョンＩＤを条件にして、
 * その上に自動で指定のイベントを生成します。
 * 
 * また、タイルを消去してイベントに置き換えることも可能です。
 * ※タイルＩＤ、オートタイルタイプが条件の場合のみ
 * 
 * ■使用方法
 * まずは生成したいイベントを準備します。
 * 
 * １．テンプレート用のマップを作成し、イベントを作成する。
 * 　　分かりやすくイベント名を付けておく。
 * ２．プラグインパラメータのテンプレートマップＩＤに
 * 　　先程のマップＩＤを登録。
 * 
 * 要するに公式ローンチプラグインのTemplateEvent.js
 * （トリアコンタン様）とほぼ同じです。
 * 
 * 次にプラグインパラメータの『設定リスト』に条件を指定し、
 * 生成するイベントの『イベントID／名前』を入力します。
 * この際、参照用に『設定ＩＤ』を設定しておきます。
 * 
 * ※タイルＩＤやオートタイルタイプを参照したい場合は、
 * 付属の『NRP_DebugTile.js』が便利です。
 * 
 * 最後にタイルセットのメモ欄に、先程の『設定ＩＤ』を登録すれば完了です。
 * 以下の?の部分に入力してください。
 * 
 * <TileToEvent:?>
 * 
 * ■プラグインコマンド（ＭＺ）
 * 『ＩＤを指定して実行』
 * 設定ＩＤを指定すれば処理が実行されます。
 * 内容はタイルセットに設定ＩＤを登録した場合と同様です。
 * 
 * ■プラグインコマンド（ＭＶ）
 * > NRP.TileToEvent.CallId [設定ＩＤ]
 * 処理内容はＭＺ版と同じです。
 * ※>や[]は含めないでください。
 * 
 * ■注意点
 * ツクールの仕様上、イベントが存在するだけで、
 * 少しずつマップ上での負荷が上昇します。
 * 例えば、千を超えるような大量のイベントを生成すると、
 * 動作が重くなる可能性があります。
 * 
 * 当プラグインには生成したイベントが
 * 画面範囲外の場合に、描画を停止する処理が含まれています。
 * これによってある程度負荷を軽減できます。
 * 
 * また、１マスずつタイルを確認＆処理する仕様上、
 * 大きなマップに大量のイベントを生成すると、少しだけ時間がかかります。
 * ※とはいえ、よほどの処理をしない限り一瞬で終わりますが。
 * 
 * ■謝辞
 * このプラグインはトリアコンタン様の
 * 以下のプラグインの処理を参照＆流用しています。
 * ・TemplateEvent.js
 * ・EventReSpawn.js
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @command CallId
 * @text ＩＤを指定して実行
 * @desc 登録されている設定ＩＤを元にイベントを生成。
 * 
 * @arg SettingId
 * @text 設定ＩＤ
 * @desc 実行する処理の設定ＩＤです。
 * カンマ区切りで複数指定も可能です。
 * @type string
 * 
 * 
 * @param TemplateMapId
 * @text テンプレートマップＩＤ
 * @desc タイルを置き換えるイベントを配置するマップＩＤです。
 * @type number
 * 
 * @param SettingList
 * @text 設定リスト
 * @type struct<Setting>[]
 * @desc 設定内容の一覧です。
 * 
 * @param InitEventOnLoad
 * @text ロード時にイベント初期化
 * @desc ゲームロード時にイベントを初期化します。
 * イベントの位置が保存されなくなります。
 * @type boolean
 * @default true
 * 
 * @param ApplyChangeTileset
 * @text タイルセット変更時も処理
 * @desc タイルセットの変更時も処理を実行します。
 * @type boolean
 * @default false
 * 
 * @param <SpeedUpProcessing>
 * @text ＜処理高速化＞
 * 
 * @param StopOutOfRange
 * @parent <SpeedUpProcessing>
 * @text 画面外のイベント描画停止
 * @desc 画面範囲外のイベントの描画を停止します。
 * これにより、大幅な処理の軽量化が見込めます。
 * @type boolean
 * @default true
 * 
 * @param OutOfRangeMargin
 * @parent <SpeedUpProcessing>
 * @text 範囲外の余裕幅
 * @desc 範囲外と見なす余裕の幅です。
 * 数値分だけ画面外にはみ出していても停止しません。
 * @type number
 * @default 100
 */

/*~struct~Setting:ja
 * @param SettingId
 * @text 設定ＩＤ
 * @type string
 * @desc タイルセットのメモ欄からの呼び出しに使う識別子です。
 * 『全タイルセットで有効』がオンの場合は不要です。
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
 * @param TileId
 * @text タイルＩＤ
 * @parent <Condition>
 * @type string
 * @desc 対象とするタイルＩＤを指定します。
 * 複数指定も可能です。（例：1,3~5）
 * 
 * @param AutotileType
 * @text オートタイルタイプ
 * @parent <Condition>
 * @type string
 * @desc 対象とするオートタイルタイプを指定します。
 * 複数指定も可能です。（例：1,3~5）
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
 * @param <ReplaceSetting>
 * @text ＜タイル置換設定＞
 * 
 * @param EventId
 * @text イベントID／名前
 * @parent <ReplaceSetting>
 * @type string
 * @desc 置換先のイベントです。ＩＤ／名前の両方が有効です。
 * 
 * @param Replace
 * @text タイルを置換する
 * @parent <ReplaceSetting>
 * @type boolean
 * @default true
 * @desc 元々のタイルを消去します。
 * タイルＩＤまたはオートタイルタイプが条件の場合のみ有効。
 * 
 * @param AdjustX
 * @text Ｘ座標補正
 * @parent <ReplaceSetting>
 * @type number @max 99 @min -99
 * @desc イベントを生成するＸ座標を補正します。
 * 
 * @param AdjustY
 * @text Ｙ座標補正
 * @parent <ReplaceSetting>
 * @type number @max 99 @min -99
 * @desc イベントを生成するＹ座標を補正します。
 */

// テンプレートイベント格納用
let $dataTileEventTemplateEvents = null;

/**
 * 【独自】タイルイベントを扱うクラス
 * @constructor
 */
function Game_TileEvent() {
    this.initialize.apply(this, arguments);
}

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

const PLUGIN_NAME = "NRP_TileToEvent";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pTemplateMapId = toNumber(parameters["TemplateMapId"]);
const pSettingList = parseStruct2(parameters["SettingList"]);
const pInitEventOnLoad = toBoolean(parameters["InitEventOnLoad"], false);
const pApplyChangeTileset = toBoolean(parameters["ApplyChangeTileset"], false);

const pStopOutOfRange = toBoolean(parameters["StopOutOfRange"], true);
const pOutOfRangeMargin = toNumber(parameters["OutOfRangeMargin"], 100);

/**
 * ●効率化のため事前変換
 */
for (const setting of pSettingList) {
    setting.settingId = setting.SettingId;
    setting.validAllTilesets = toBoolean(setting.ValidAllTilesets, false);
    setting.tileIds = makeArray(setting.TileId);
    setting.autotileTypes = makeArray(setting.AutotileType);
    setting.terrainTags = makeArray(setting.TerrainTag);
    setting.regionIds = makeArray(setting.RegionId);

    setting.eventId = setting.EventId;
    setting.replace = toBoolean(setting.Replace, true);
    setting.adjustX = toNumber(setting.AdjustX, 0);
    setting.adjustY = toNumber(setting.AdjustY, 0);

    // タイルＩＤまたはオートタイルタイプの両方が条件にない場合、
    // 置換は行わない。
    if (!setting.tileIds && !setting.autotileTypes) {
        setting.replace = false;
    }
}

//----------------------------------------
// ＭＺ用プラグインコマンド
//----------------------------------------

// MVには存在しないため、空で定義しておかないとエラーになる。
if (!PluginManager.registerCommand) {
    PluginManager.registerCommand = function() {}
}

/**
 * ●ＩＤを指定して実行
 */
PluginManager.registerCommand(PLUGIN_NAME, "CallId", function(args) {
    const settingId = args.SettingId;

    makeTileEventsById(settingId, true);

    // スプライト作成
    getSpriteset().makeTileEventSprites();
});

//----------------------------------------
// ＭＶ用のプラグインコマンド
//----------------------------------------

/**
 * ●ＩＤを指定して実行
 */
const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);

    // 小文字化してから判定
    const lowerCommand = command.toLowerCase();
    
    // 実行
    if (lowerCommand === "nrp.tiletoevent.callid") {
        const settingId = args[0];

        if (settingId) {
            makeTileEventsById(settingId, true);
            // スプライト作成
            getSpriteset().makeTileEventSprites();
        }
    }
};

//----------------------------------------
// マップ切替時
//----------------------------------------

// 消去するタイルのインデックスを保持する配列
let mHiddenTiles = [];

/**
 * ●マップ情報の設定
 * ※マップ開始時
 */
const _Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    _Game_Map_setup.apply(this, arguments);
    
    // タイルイベントの生成
    makeTileEvents(true);
    // タイルイベントをスプライト作成済みに変更する。
    setSpritePreparedTileEvents();
};

/**
 * ●タイルイベントをスプライト作成済みに変更する。
 */
function setSpritePreparedTileEvents() {
    // スプライトを作成済のフラグを立てておく。
    // ※マップ開始時は普通にスプライトが作成されるので特に処理せず、
    // 　フラグだけ立てておく。
    for (const event of $gameMap.getTileEvents()) {
        event.setSpritePrepared();
    }
}

if (pApplyChangeTileset) {
    /**
     * ●タイルセットの変更
     */
    const _Game_Map_changeTileset = Game_Map.prototype.changeTileset;
    Game_Map.prototype.changeTileset = function(tilesetId) {
        _Game_Map_changeTileset.apply(this, arguments);

        // タイルイベントの生成
        makeTileEvents(true);
        // スプライト作成
        getSpriteset().makeTileEventSprites();
    };
}

/**
 * ●タイル情報を元にイベントを生成する。
 * ※createFlgがオフの場合はタイル消去のみを実行
 */
function makeTileEvents(createFlg) {
    if (!$dataMap) {
        return;
    }

    const tileset = $gameMap.tileset();
    // イベントテスト時は存在しないので終了
    if (!tileset) {
        return;
    }

    // 設定リスト
    const settingList = [];
    // 非表示タイルのリストをクリア
    mHiddenTiles = [];

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

    // 設定が取得できなければ終了
    if (!settingList.length) {
        return;
    }

    tileToEventSearch(settingList, createFlg);
}

/**
 * ●設定ＩＤを元にイベントを生成する。（プラグインコマンド時）
 */
function makeTileEventsById(settingId, createFlg) {
    if (!$dataMap) {
        return;
    }

    // 設定リスト
    const settingList = [];

    // 条件に一致する設定を抽出する。
    for (const setting of pSettingList) {
        // 有効な設定ＩＤかどうかを確認
        if (isValidSettingById(setting.settingId, settingId)) {
            // 追加して次へ
            settingList.push(setting);
        }
    }

    // 設定が取得できなければ終了
    if (!settingList.length) {
        return;
    }

    tileToEventSearch(settingList, createFlg);
}

/**
 * ●全Ｚ座標の確認が不要ならtrueにする。
 * ※タイルＩＤとオートタイルタイプが条件に含まれていない場合
 */
function checkNoZFlg(settingList) {
    return settingList.every(function(setting) {
        return !setting.tileIds && !setting.autotileTypes;
    });
}

/**
 * ●タイルをイベントへ置換する。
 * ※全タイルを調査
 */
function tileToEventSearch(settingList, createFlg) {
    // 全Ｚ座標の確認が不要かどうかのフラグ
    const noZFlg = checkNoZFlg(settingList);

    // $dataMapを書き換え

    const width = $dataMap.width;
    const height = $dataMap.height;

    // デバッグ用の時間計測処理
    // const startTime = performance.now(); // 開始時間

    // 全てのタイルを確認＆処理
    for (let z = 0; z < 4; z++) {
        // 全Ｚ座標の確認が不要なら0以外は処理不要
        // これにより処理時間を１／４にする。
        // ※対象がリージョン＆地形タグだけの場合
        if (noZFlg && z > 0) {
            break;
        }

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                // 処理実行
                tileToEvent(x, y, z, settingList, createFlg);
            }
        }
    }

    // const endTime = performance.now(); // 終了時間
    // console.log(endTime - startTime); // 何ミリ秒かかったかを表示する
}

/**
 * ●タイルをイベントへ置換する。
 * ※タイル毎の置換処理
 */
function tileToEvent(x, y, z, settingList, createFlg) {
    const width = $dataMap.width;
    const height = $dataMap.height;

    // $dataMap中のタイル情報を保持する位置を計算
    const index = (z * height + y) * width + x;

    // 一致する設定の有無を確認
    const setting = getMatchSetting(index, x, y, settingList);
    // 該当の設定がなければ終了
    if (!setting) {
        return;
    }

    // 置換を行う場合はタイル消去
    if (setting.replace) {
        $dataMap.data[index] = 0;

        // 非表示タイルを保持
        // ※既に含まれているならば追加しない。
        if (!mHiddenTiles.includes(index)) {
            mHiddenTiles.push(index);
        }
    }

    // イベントＩＤがあれば、イベント生成
    // ※ただし、生成フラグがオンの場合のみ
    if (createFlg && setting.eventId) {
        // 座標補正
        const eventX = x + setting.adjustX;
        const eventY = y + setting.adjustY;
        $gameMap.spawnTileEvent(getEventIdForTileEvent(setting.eventId), eventX, eventY);
    }
}

/**
 * ●現在のキャラクター位置に一致する茂み設定を取得する。
 */
function getMatchSetting(index, x, y, settingList) {
    const tileId = $dataMap.data[index];

    // なるべく負荷をかけないよう値を一度だけ取得する。
    let terrainTag;
    let regionId;
    let autotileType;

    // 設定を１つずつ確認
    for (const setting of settingList) {
        let match = false;

        // タイルＩＤの一致を確認
        if  (tileId && setting.tileIds && setting.tileIds.length > 0) {
            match = setting.tileIds.find(function(id) {
                return tileId == id;
            });
            // 条件を満たす設定があった。
            if (match) {
                return setting;
            }
        }

        // オートタイルタイプの一致を確認
        if  (tileId && setting.autotileTypes && setting.autotileTypes.length > 0) {
            // 未取得ならオートタイルタイプを取得
            if (autotileType === undefined) {
                autotileType = getAutotileType(tileId);
            }

            match = setting.autotileTypes.find(function(type) {
                return autotileType == type;
            });
            // 条件を満たす設定があった。
            if (match) {
                return setting;
            }
        }

        // 地形タグの一致を確認
        if (setting.terrainTags && setting.terrainTags.length > 0) {
            // 未取得なら地形タグを取得
            if (terrainTag === undefined) {
                terrainTag = $gameMap.terrainTag(x, y);
            }

            match = setting.terrainTags.find(function(tag) {
                return terrainTag == tag;
            });
            // 条件を満たす設定があった。
            if (match) {
                return setting;
            }
        }

        // リージョンの一致を確認
        if (setting.regionIds && setting.regionIds.length > 0) {
            // 未取得ならリージョンＩＤを取得
            if (regionId === undefined) {
                regionId = $gameMap.regionId(x, y);
            }

            match = setting.regionIds.find(function(id) {
                return regionId == id;
            });
            // 条件を満たす設定があった。
            if (match) {
                return setting;
            }
        }
    }

    // なければundefined
    return undefined;
}

/**
 * ●設定が指定のタイルセットで有効か？
 */
function isValidSetting(settingId, tileset) {
    if (settingId === undefined) {
        return false;
    }

    const setting = tileset.meta.TileToEvent;
    if (setting) {
        // カンマ区切りで分解
        const settingArray = setting.split(",");
        // 含まれていればtrue
        return settingArray.includes(settingId);
    }
    return false;
}

/**
 * ●設定が指定のＩＤか？
 */
function isValidSettingById(settingId, id) {
    if (settingId === undefined) {
        return false;
    }

    if (id) {
        // カンマ区切りで分解
        const settingArray = id.split(",");
        // 含まれていればtrue
        return settingArray.includes(settingId);
    }
    return false;
}

/**
 * ●オートタイルタイプの取得
 * ※高速化のためGame_Mapの関数は使わない。
 */
function getAutotileType(tileId) {
    return tileId >= 2048 ? Math.floor((tileId - 2048) / 48) : -1;
};

// ロード時判定フラグ
let mTileToEventLoad = false;

/**
 * ●ロード時のデータ展開
 * ※DataManager.loadGameに書いても、
 * なぜかうまくいかなかったので、とりあえずここで。
 */
const _DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    _DataManager_extractSaveContents.apply(this, arguments);

    // ロード時判定フラグ
    mTileToEventLoad = true;
};

//=============================================================================
// Scene_Boot
//  テンプレートイベントマップをロードしてグローバル変数に保持します。
//=============================================================================
const _Scene_Boot_create = Scene_Boot.prototype.create;
Scene_Boot.prototype.create = function() {
    _Scene_Boot_create.apply(this, arguments);
    this._tileEventTemplateMapGenerator = this.tileEventTemplateMapLoadGenerator();
    $dataMap                   = {};
};

const _Scene_Boot_isReady = Scene_Boot.prototype.isReady;
Scene_Boot.prototype.isReady = function() {
    const isReady = _Scene_Boot_isReady.apply(this, arguments);
    return this._tileEventTemplateMapGenerator.next().done && isReady;
};

Scene_Boot.prototype.tileEventTemplateMapLoadGenerator = function* () {
    while (!DataManager.isMapLoaded()) {
        yield false;
    }
    // Resolve conflict for OnlineAvatar.js
    if (!$gamePlayer) {
        $gamePlayer = {isTransferring: function() {}};
    }
    DataManager.loadMapData(pTemplateMapId);
    $gamePlayer = null;
    while (!DataManager.isMapLoaded()) {
        yield false;
    }
    $dataTileEventTemplateEvents = $dataMap.events;
    $dataMap            = {};
    return true;
};

Game_Map.prototype.spawnTileEvent = function(originalEventId, x, y) {
    if ($dataTileEventTemplateEvents[originalEventId] && $gameMap.isValid(x, y)) {
        const eventId = this._events.length || 1;

        // EventReSpawn.js併用時は連番を加算
        if (this.getEventIdSequence) {
            this.getEventIdSequence();
        }

        const event = new Game_TileEvent(this._mapId, eventId, originalEventId, x, y);
        // event.setPriorityType(-0.5);
        event._tileEventFlg = true;

        this._events[eventId] = event;
    } else {
        throw new Error('無効なイベントIDもしくは座標のためイベントを作成できませんでした。');
    }
};

function getEventIdForTileEvent(idOrName) {
    let id = 0;
    if (!isNaN(idOrName)) {
        id = idOrName;
    } else {
        const dataList = $dataTileEventTemplateEvents;
        const event    = searchDataItem(dataList, 'name', idOrName);
        id             = event ? event.id : 0;
    }
    return id;
};
const searchDataItem = function(dataArray, columnName, columnValue) {
    let result = 0;
    dataArray.some(dataItem => {
        if (dataItem && dataItem[columnName] === columnValue) {
            result = dataItem;
            return true;
        }
        return false;
    });
    return result;
};

//=============================================================================
// Game_TileEvent
//  動的に生成されるイベントオブジェクトです。
//=============================================================================
Game_TileEvent.prototype             = Object.create(Game_Event.prototype);
Game_TileEvent.prototype.constructor = Game_TileEvent;

Game_TileEvent.prototype.initialize = function(mapId, eventId, originalEventId, x, y) {
    this._originalEventId = originalEventId;
    this._eventId         = eventId;
    this.linkEventData();
    Game_Event.prototype.initialize.call(this, mapId, eventId);
    this.locateWithoutStraighten(x, y);
};

Game_TileEvent.prototype.locateWithoutStraighten = function(x, y) {
    this.setPosition(x, y);
    this.refreshBushDepth();
};

Game_TileEvent.prototype.linkEventData = function() {
    $dataMap.events[this._eventId] = $dataTileEventTemplateEvents[this._originalEventId];
};

Game_TileEvent.prototype.unlinkEventData = function() {
    $dataMap.events[this._eventId] = null;
};

Game_TileEvent.prototype.isSpritePrepared = function() {
    return this._spritePrepared;
};

Game_TileEvent.prototype.setSpritePrepared = function() {
    this._spritePrepared = true;
};

Game_TileEvent.prototype.setEventId = function(eventId) {
    this._eventId = eventId;
};

//=============================================================================
// Spriteset_Map
//  タイルイベントのスプライトを管理します。
//=============================================================================

/**
 * 【独自】タイルイベント用のスプライトを作成する。（全体）
 */
Spriteset_Map.prototype.makeTileEventSprites = function() {
    for (const event of $gameMap.getTileEvents()) {
        // スプライトが未作成のイベントがあれば作成する。
        if (!event.isSpritePrepared()) {
            this.makeTileEventSprite(event);
        }
    }
};

/**
 * 【独自】タイルイベント用のスプライトを作成する。
 */
Spriteset_Map.prototype.makeTileEventSprite = function(event) {
    event.setSpritePrepared();
    const sprite = new Sprite_Character(event);
    this._characterSprites.push(sprite);
    this._tilemap.addChild(sprite);
};

//---------------------------------------------------
// シーン切替時の復帰処理
//---------------------------------------------------

/**
 * ●マップデータのロード完了時にタイルイベントのリンク先を復元
 */
const _DataManager_onLoad = DataManager.onLoad;
DataManager.onLoad = function(object) {
    _DataManager_onLoad.apply(this, arguments);

    if (object === $dataMap && $gameMap) {
        // ゲームロード時
        if (mTileToEventLoad) {
            // フラグ初期化
            mTileToEventLoad = false;

            // バージョン変更時は処理しない。
            // ※通常のマップ遷移時と同様の扱い。
            if ($gameSystem.versionId() !== $dataSystem.versionId) {
                return;
            }
            
            // ロード時にイベント初期化する場合
            if (pInitEventOnLoad) {
                // タイルイベントを全削除
                for (const event of $gameMap.getTileEvents()) {
                    // $dataMap.eventsにイベント情報を登録する。
                    // これを先にやらないと安全に削除できない。
                    event.linkEventData();
                    event.erase();
                }
                // イベント作成＆置換対象のタイルを非表示
                makeTileEvents(true);
                setSpritePreparedTileEvents();

            // ロード時にイベント初期化しない場合
            } else {
                $gameMap.restoreLinkTileEvents();

                // 置換対象のタイルを非表示にするだけ
                makeTileEvents(false);
            }

        // メニューを閉じた際や、戦闘終了時など
        } else {
            $gameMap.restoreLinkTileEvents();

            // 非表示タイルがあれば再度非表示
            for (const index of mHiddenTiles) {
                $dataMap.data[index] = 0;
            }
        }
    }
};

/**
 * ●$dataMap.eventsにイベント情報を再登録
 */
Game_Map.prototype.restoreLinkTileEvents = function() {
    if (!this.isSameMapReload()) return;

    for (const event of this.getTileEvents()) {
        // $dataMap.eventsにイベント情報を登録する。
        event.linkEventData();
    }
};

/**
 * ●タイルイベントを取得する。
 */
Game_Map.prototype.getTileEvents = function() {
    return this.events().filter(function(event) {
        return event._tileEventFlg;
    });
};

Game_Map.prototype.isSameMapReload = function() {
    return !$gamePlayer.isTransferring() || this.mapId() === $gamePlayer.newMapId();
};

/**
 * ●マップシーンの作成時
 */
const _Scene_Map_create = Scene_Map.prototype.create;
Scene_Map.prototype.create = function() {
    // 場所移動時（マップＩＤが変化した場合のみ）
    if ($gamePlayer.isTransferring() && $gamePlayer.newMapId() !== $gameMap.mapId()) {
        // 非表示タイルを初期化
        mHiddenTiles = [];
    }
    _Scene_Map_create.apply(this, arguments);
};

/**
 * ●マップリロードを指示
 */
const _Game_Player_requestMapReload = Game_Player.prototype.requestMapReload;
Game_Player.prototype.requestMapReload = function() {
    _Game_Player_requestMapReload.apply(this, arguments);

    // 非表示タイルを初期化
    mHiddenTiles = [];
};

//---------------------------------------------------
// 以下は軽量化対応
//---------------------------------------------------

/**
 * ●描画更新
 */
const _Sprite_Character_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() {
    // 対象のイベント以外はそのまま
    if (!this._character._tileEventFlg) {
        _Sprite_Character_update.apply(this, arguments);
        return;
    }

    // 画面外なら最小限の情報だけを更新
    if (isOutOfRangeSprite(this)) {
        this.setFrame(0, 0, 0, 0);
        this.updatePosition();
        return;
    }

    _Sprite_Character_update.apply(this, arguments);
};

/**
 * ●スプライトの位置が画面内かどうか？
 */
function isOutOfRangeSprite(sprite) {
    // 範囲外処理を行わない場合
    if (!pStopOutOfRange) {
        return false;
    }

    const x = sprite.x;
    const y = sprite.y;

    // 画像の幅も考慮
    const halfWidth = sprite.width / 2;
    const height = sprite.height;

    // Ｘ座標は中央、Ｙ座標は足元が基準なのでそこも考慮
    if (x + halfWidth + pOutOfRangeMargin < 0
        || x - halfWidth - pOutOfRangeMargin > Graphics.width
        || y + pOutOfRangeMargin  < 0
        || y - height - pOutOfRangeMargin > Graphics.height) {
        return true;
    }
    return false;
}

/**
 * ●マップのSpritesetを取得する。
 */
function getSpriteset() {
    return SceneManager._scene._spriteset;
}

})();
