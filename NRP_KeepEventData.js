//=============================================================================
// NRP_KeepEventData.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Remembers & restores the event location when transferring from the map.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/484830899.html
 *
 * @help Remembers & restores the event location
 * when transferring from the map.
 * Restore them when you go back to a previous map.
 * 
 * For example, in the case of a reminiscence event,
 * where the player is temporarily transferred to a different map
 * and then back to the previous map.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Please execute the plug-in command "SaveEvents"
 * before doing "Transfer Player".
 * When you come back to the previous map,
 * the event information will be restored automatically.
 * 
 * In this case, the stored event information will be deleted.
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
 * -------------------------------------------------------------------
 * [Plugin Commands MZ]
 * -------------------------------------------------------------------
 * ◆SaveEvents
 * Save the position and direction of events.
 * 
 * ◆RestoreEvents
 * Restore the position and direction of the saved events.
 * No need to specify as it is automatically executed by default.
 * 
 * ◆RemoveSaveEvents
 * Remove the location and direction of the saved events.
 * If the map ID is left blank, all information will be removed.
 * 
 * -------------------------------------------------------------------
 * [Plugin Commands MV]
 * -------------------------------------------------------------------
 * Since the functions are the same as the MZ version,
 * I will not explain them.
 * ※No distinction is made between individual capital letters.
 *   Also, do not include [].
 * 
 * ◆SaveEvents
 * NRP.KeepEventData.SaveEvents
 * 
 * ◆RestoreEvents
 * NRP.KeepEventData.RestoreEvents
 * 
 * ◆RemoveSaveEvents
 * NRP.KeepEventData.RemoveSaveEvents [MapID (optional)]
 * 
 * @------------------------------------------------------------------
 * @ Plugin Commands
 * @------------------------------------------------------------------
 * @command SaveEvents
 * @desc Save the position and direction of events.
 * 
 * @------------------------------------------------------------------
 * 
 * @command RestoreEvents
 * @desc Restore the position and direction of the saved events.
 * No need to specify as it is automatically executed by default.
 * 
 * @------------------------------------------------------------------
 * 
 * @command RemoveSaveEvents
 * @desc Remove the location and direction of the saved events.
 * 
 * @arg MapId
 * @type number
 * @desc Map ID to remove the saved information.
 * If blank, all saved information will be removed.
 * 
 * @------------------------------------------------------------------
 * @ Plugin Parameters
 * @------------------------------------------------------------------
 * 
 * @param UseSaveData
 * @type boolean
 * @default false
 * @desc Writes event information to saved data.
 * When off, the information will not be retained.
 * 
 * @param AutoRestore
 * @type boolean
 * @default true
 * @desc If the events information of the transfer destination has been saved, it will be restored automatically.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 マップ移動時にイベントの位置を記憶＆復元します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/484830899.html
 *
 * @help マップ移動前にイベントの位置や向きを記憶します。
 * 元のマップへ戻った際に、それらの情報を復元します。
 * 
 * 例えば、回想イベントのように一時的に別マップへ移動して、
 * 再び元のマップに戻るような場合を想定しています。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * 場所移動を行う前にプラグインコマンドの
 * 『イベント情報を記憶』を実行してください。
 * 元のマップに戻ってきた際、自動でイベント情報が復元されます。
 * 
 * この際、記憶したイベント情報は削除されます。
 * 
 * -------------------------------------------------------------------
 * ■プラグインコマンド（ＭＺ）
 * -------------------------------------------------------------------
 * ◆イベント情報を記憶
 * イベントの位置や向きを記憶します。
 * 
 * ◆イベント情報を復元
 * 記憶したイベントの位置や向きを復元します。
 * ※初期設定では自動実行されるので指定は不要です。
 * 
 * ◆記憶したイベント情報を消去
 * 記憶したイベントの位置や向きを削除します。
 * マップＩＤを空欄にした場合、全情報を削除します。
 * 
 * -------------------------------------------------------------------
 * ■ＭＶ版プラグインコマンド（ＭＶ）
 * -------------------------------------------------------------------
 * 機能はＭＺ版と同じため、説明は割愛します。
 * ※大文字個別は区別しません。また[]は含まないでください。
 * 
 * ◆イベント情報を記憶
 * NRP.KeepEventData.SaveEvents
 * 
 * ◆イベント情報を復元
 * NRP.KeepEventData.RestoreEvents
 * 
 * ◆記憶したイベント情報を消去
 * NRP.KeepEventData.RemoveSaveEvents [マップＩＤ（省略可）]
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
 * @command SaveEvents
 * @text イベント情報を記憶
 * @desc イベントの位置や向きを記憶します。
 * 
 * @------------------------------------------------------------------
 * 
 * @command RestoreEvents
 * @text イベント情報を復元
 * @desc 記憶したイベントの位置や向きを復元します。
 * ※初期設定では自動実行されるので指定は不要です。
 * 
 * @------------------------------------------------------------------
 * 
 * @command RemoveSaveEvents
 * @text 記憶したイベント情報を消去
 * @desc 記憶したイベントの位置や向きを削除します。
 * 
 * @arg MapId
 * @text 対象マップＩＤ
 * @type number
 * @desc 記憶情報の削除を行うマップＩＤです。
 * 空欄なら全ての記憶情報を削除します。
 * 
 * @------------------------------------------------------------------
 * @ プラグインパラメータ
 * @------------------------------------------------------------------
 * 
 * @param UseSaveData
 * @text セーブデータに書き込む
 * @type boolean
 * @default false
 * @desc セーブデータにイベントの記憶情報を書き込みます。
 * オフの場合、記憶情報が保持されなくなります。
 * 
 * @param AutoRestore
 * @text 場所移動時に自動復元
 * @type boolean
 * @default true
 * @desc 場所移動先のイベント記憶情報が存在していた場合、
 * 自動的にイベント情報の復元を行います。
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

const PLUGIN_NAME = "NRP_KeepEventData";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pUseSaveData = toBoolean(parameters["UseSaveData"]);
const pAutoRestore = toBoolean(parameters["AutoRestore"]);

// イベント位置を保持するための構造体
let mEventsRecords = [];

//---------------------------------------------------
// ＭＺ用プラグインコマンド
//---------------------------------------------------

// MVには存在しないため、空で定義しておかないとエラーになる。
if (!PluginManager.registerCommand) {
    PluginManager.registerCommand = function() {}
}

/**
 * ●イベント情報を記憶
 */
PluginManager.registerCommand(PLUGIN_NAME, "SaveEvents", function(args) {
    saveEvents();
});

/**
 * ●イベント情報を復元
 */
PluginManager.registerCommand(PLUGIN_NAME, "RestoreEvents", function(args) {
    restoreEvents();
});

/**
 * ●記憶したイベント情報を消去
 */
PluginManager.registerCommand(PLUGIN_NAME, "RemoveSaveEvents", function(args) {
    const mapId = eval(args.MapId);
    removeSaveEvents(mapId);
});

//---------------------------------------------------
// ＭＶ用プラグインコマンド
//---------------------------------------------------

const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);

    // 小文字化してから判定
    const lowerCommand = command.toLowerCase();
    
    /**
     * ●イベント情報を記憶
     */
    if (lowerCommand === "nrp.keepeventdata.saveevents") {
        saveEvents();

    /**
     * ●イベント情報を復元
     */
    } else if (lowerCommand === "nrp.keepeventdata.restoreevents") {
        restoreEvents();

    /**
     * ●記憶したイベント情報を消去
     */
    } else if (lowerCommand === "nrp.keepeventdata.removesaveevents") {
        const mapId = eval(args[0]);
        removeSaveEvents(mapId);
    }
};

//---------------------------------------------------
// DataManager
//---------------------------------------------------

/**
 * ●セーブデータの作成
 */
const _DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    // セーブファイルに記憶する場合は$gameMapに書込
    if (pUseSaveData) {
        $gameMap._eventsRecords = mEventsRecords;
    }

    return _DataManager_makeSaveContents.apply(this, arguments);
}

/**
 * ●ロード時にセーブデータを展開
 */
const _DataManager_extractSaveContents = DataManager.extractSaveContents;
DataManager.extractSaveContents = function(contents) {
    _DataManager_extractSaveContents.apply(this, arguments);

    // セーブファイルに記憶している場合は$gameMapから復元
    if (pUseSaveData) {
        mEventsRecords = $gameMap._eventsRecords;
    }
};

/**
 * ●ゲームオブジェクトの作成
 */
const _DataManager_createGameObjects = DataManager.createGameObjects;
DataManager.createGameObjects = function() {
    _DataManager_createGameObjects.apply(this, arguments);

    // 初期化しておく。
    // ※ここで初期化しないとロード時に別のセーブデータにまで残ってしまう。
    mEventsRecords = [];
};

//---------------------------------------------------
// Game_Map
//---------------------------------------------------

const _Game_Map_setupEvents = Game_Map.prototype.setupEvents;
Game_Map.prototype.setupEvents = function() {
    _Game_Map_setupEvents.apply(this, arguments);

    // 自動復元する設定の場合
    if (pAutoRestore) {
        restoreEvents();
    }
}

//---------------------------------------------------
// 関数
//---------------------------------------------------

/**
 * ●イベントから記憶する情報を抽出する。
 */
function getEventData(event) {
    const keepData = {};
    keepData.eventId = event.eventId();
    keepData.x = event._x;
    keepData.y = event._y;
    keepData.direction = event._direction;
    return keepData;
}

/**
 * ●イベント位置を構造体に保存する。
 */
function setEventsData(record) {
    // 初期化されていない場合は初期化
    if (!mEventsRecords) {
        mEventsRecords = [];
    }
    mEventsRecords.push(record);
}

/**
 * ●イベント情報を保存
 */
function saveEvents() {
    const record = {};
    const eventsData = [];
    for (const event of $gameMap.events()) {
        eventsData.push(getEventData(event));
    }
    record.mapId = $gameMap.mapId();
    record.data = eventsData;
    // 構造体に保持しておく。
    setEventsData(record);
}

/**
 * ●復元実行
 */
function restoreEvents() {
    // マップＩＤの一致するデータを取得
    const data = getEventsRecordData(mEventsRecords, $gameMap.mapId());
    if (data) {
        // 対象のデータが存在する場合は復元実行
        // 記憶したイベント情報を一つずつ復元
        for (const eventData of data) {
            const event = $gameMap.event(eventData.eventId);
            if (event) {
                event.locate(eventData.x, eventData.y);
                event.setDirection(eventData.direction);
            }
        }

        // 復元後、要素を除去する。
        // ※マップＩＤの一致しない要素だけを除去する。
        mEventsRecords = mEventsRecords.filter(record => record.mapId != $gameMap.mapId());
    }
}

/**
 * ●マップＩＤに一致する記録を取得
 */
function getEventsRecordData(eventsRecords, mapId) {
    if (!eventsRecords) {
        return undefined;
    }

    const record = eventsRecords.find(record => record.mapId == mapId);
    // データを取得
    if (record) {
        return record.data;
    }
    return undefined;
}

/**
 * ●記憶したイベント情報を消去
 */
function removeSaveEvents(mapId) {
    // マップＩＤの指定がある場合
    if (mapId) {
        // マップＩＤに一致しない要素だけを残す
        mEventsRecords = mEventsRecords.filter(record => record.mapId != mapId);
    // 指定がない場合は全消去
    } else {
        mEventsRecords = [];
    }
}

})();
