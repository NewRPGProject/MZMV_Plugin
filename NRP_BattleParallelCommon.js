//=============================================================================
// NRP_BattleParallelCommon.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.021 Enables parallel common events, even during battle.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/477740800.html
 *
 * @help Enables parallel common events, even during battle
 * Register the target common events in the plugin parameter.
 * If the configured switch is on at that time, it will be executed in parallel.
 * 
 * Conversely, you can also disable registered common events on the map.
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but we will respond to defects as far as possible.
 * 
 * @param commonEventsWhiteList
 * @type common_event[]
 * @default []
 * @desc Register a parallel common event to be enabled in battle.
 * 
 * @param invalidOnMap
 * @type boolean
 * @default false
 * @desc Disables registered parallel common events on the map.
 * 
 * @param validAllCommon
 * @type boolean
 * @default false
 * @desc Enables parallel common events in battle.
 * The above registration common events will be meaningless.
 * 
 * @param alwaysMonitorChange
 * @type boolean
 * @default false
 * @desc It always monitors changes in variables and switches.
 * It can handle variable operations by external plugins.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.021 コモンイベントの並列処理を戦闘中も有効にします。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/477740800.html
 *
 * @help コモンイベントの並列処理を戦闘中も有効にします。
 * プラグインパラメータに、対象とするコモンイベントを登録します。
 * その状態で設定したスイッチがオンになっていれば、並列実行されます。
 * 
 * 逆に登録したコモンイベントをマップ上で無効にすることも可能です。
 * これにより、戦闘中だけ有効なコモンイベントを作成できます。
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param commonEventsWhiteList
 * @text 登録コモンイベント
 * @type common_event[]
 * @default []
 * @desc 戦闘で有効とする並列コモンイベントを登録します。
 * 
 * @param invalidOnMap
 * @text マップ上で無効化
 * @type boolean
 * @default false
 * @desc 登録したコモンイベントの並列処理をマップ上で無効化します。
 * 
 * @param validAllCommon
 * @text 全てを有効化
 * @type boolean
 * @default false
 * @desc 全コモンイベントの並列処理を戦闘で有効化します。
 * 上記の登録コモンイベントは無意味となります。
 * 
 * @param alwaysMonitorChange
 * @text 変化を常に監視
 * @type boolean
 * @default false
 * @desc 戦闘中、変数やスイッチの変化を常に監視します。
 * 外部プラグインによる変数操作などに対応できます。
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

/**
 * ●JSON用数値リストをJS用に変換
 */
function parseNumberList(param) {
    if (!param) {
        return [];
    }
    return JSON.parse(param).map(val => Number(val));
}

const PLUGIN_NAME = "NRP_BattleParallelCommon";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pWhiteList = parseNumberList(parameters["commonEventsWhiteList"]);
const pInvalidOnMap = toBoolean(parameters["invalidOnMap"], false);
const pValidAllCommon = toBoolean(parameters["validAllCommon"], false);
const pAlwaysMonitorChange = toBoolean(parameters["alwaysMonitorChange"], false);

/**
 * ●戦闘開始
 */
const _BattleManager_startBattle = BattleManager.startBattle;
BattleManager.startBattle = function() {
    _BattleManager_startBattle.apply(this, arguments);

    // 戦闘用コモンイベントの作成
    $gameMap.setupBattleCommonEvents();
};

/**
 * 【独自】戦闘用コモンイベントの作成
 */
Game_Map.prototype.setupBattleCommonEvents = function() {
    // 戦闘テスト時は並列コモンイベントを作成
    // ※通常はマップを経由しないと生成できないため
    if (DataManager.isBattleTest()) {
        this._commonEvents = [];
        for (const commonEvent of this.parallelCommonEvents()) {
            this._commonEvents.push(new Game_CommonEvent(commonEvent.id));
        }
    }

    // 全コモンイベントを有効化する場合
    if (pValidAllCommon) {
        this._battleCommonEvents = this._commonEvents;
        return;
    }

    // ホワイトリストに含まれるコモンイベントだけを抽出する。
    this._battleCommonEvents = this._commonEvents.filter(function(commonEvent) {
        return pWhiteList.includes(commonEvent._commonEventId);
    });

    // リフレッシュ
    this.refreshBattleCommonEvent();
};

/**
 * ●更新処理
 */
const _Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    _Scene_Battle_update.apply(this, arguments);

    $gameMap.updateBattleCommonEvents();
};

/**
 * ●リフレッシュ処理のリクエスト
 */
const _Game_Map_requestRefresh = Game_Map.prototype.requestRefresh;
Game_Map.prototype.requestRefresh = function(mapId) {
    _Game_Map_requestRefresh.apply(this, arguments);

    // 戦闘用のリフレッシュ処理を設定
    if (pAlwaysMonitorChange) {
        this._needsRefreshOnBattle = true;
    }
};

/**
 * 【独自】戦闘中の並列処理実行
 */
Game_Map.prototype.updateBattleCommonEvents = function() {
    // 戦闘用のリフレッシュ処理を実行
    if (this._needsRefreshOnBattle) {
        if ($gameParty.inBattle()) {
            this._needsRefreshOnBattle = false;
            $gameMap.refreshBattleCommonEvent();
        }
    }

    // 並列処理実行
    for (const commonEvent of this._battleCommonEvents) {
        commonEvent.update();
    }
};

/**
 * 【独自】コモンイベントの更新
 */
Game_Map.prototype.refreshBattleCommonEvent = function() {
    for (const commonEvent of this._battleCommonEvents) {
        commonEvent.refresh();
    }
};

/**
 * 【独自】並列コモンイベントが有効かどうかの判定
 */
const _Game_CommonEvent_isActive = Game_CommonEvent.prototype.isActive;
Game_CommonEvent.prototype.isActive = function() {
    // 全コモンイベントが有効なら元のまま
    if (pValidAllCommon) {
        return _Game_CommonEvent_isActive.apply(this, arguments);
    }

    // 非戦闘中はホワイトリスト登録分を無効化する。
    if (pInvalidOnMap && !$gameParty.inBattle()) {
        if (pWhiteList.includes(this._commonEventId)) {
            return false;
        }
    }

    return _Game_CommonEvent_isActive.apply(this, arguments);
};

/**
 * ●スイッチが変更された場合
 */
const _Game_Switches_onChange = Game_Switches.prototype.onChange;
Game_Switches.prototype.onChange = function() {
    _Game_Switches_onChange.apply(this, arguments);

    if ($gameParty.inBattle()) {
        $gameMap.refreshBattleCommonEvent();
    }
};

/**
 * ●マップ切替時
 */
const _Scene_Map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
    _Scene_Map_start.apply(this, arguments);

    // 全コモンイベントが有効なら元のまま
    if (pValidAllCommon) {
        return;
    }

    // 非戦闘中はホワイトリスト登録分を無効化する。
    if (pInvalidOnMap) {
        for (const event of $gameMap._commonEvents) {
            if (pWhiteList.includes(event._commonEventId)) {
                event.refresh();
            }
        }
    }
};

})();
