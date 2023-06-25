//=============================================================================
// NRP_FastBattleEvent.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.00 Fastest execution of battle events before fade-in.
 * @author Takeshi Sunagawa (https://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/499824342.html
 *
 * @help Fastest execution of battle events before fade-in.
 * 
 * If combined with Tint Screen, etc,
 * The performance can be executed from the moment the battle begins.
 * 
 * In addition, additional enemies can be added by plugin commands.
 * If combined with NRP_TroopRandomFormation.js,
 * it is also possible to randomly generate & place Troops.
 * 
 * ※However, show messages, wait, etc. do not work
 *   because there is no stop control for event commands.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Battle events that meet the following conditions
 * are eligible for the fastest execution.
 * 
 * - It must be the first page.
 * - The conditions must be "Don't Run".
 * - The span must be "Battle".
 * 
 * The above can be disabled by setting.
 * 
 * In other cases, the following can be entered in the comment
 * at the beginning of the event command for the fastest execution.
 * 
 * <FastBattleEvent>
 * 
 * -------------------------------------------------------------------
 * [Plugin Commands]
 * -------------------------------------------------------------------
 * ◆AddEnemy
 * Add the specified enemies.
 * 
 * If you specify more than one, you can select randomly.
 * - e.g.1: If 1~3, add randomly from enemies with IDs 1~3.
 * - e.g.2: If 1,3,5, add randomly from enemies with IDs 1, 3, and 5.
 * 
 * ◆AddEnemyDetail
 * The main point is the same as "AddEnemy" above,
 * but coordinates can be specified.
 * 
 * However, please note that the coordinates will be overwritten
 * if the random placement of NRP_TroopRandomFormation.js is enabled.
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
 * @-----------------------------------------------------
 * @ [Plugin Commands]
 * @-----------------------------------------------------
 * 
 * @command AddEnemy
 * @desc Add the specified enemy.
 * 
 * @arg EnemyId
 * @type string
 * @desc The ID of the enemy to be added. Random selection possible with multiple designations (e.g., 1~3,5)
 * 
 * @-----------------------------------------------------
 * 
 * @command AddEnemyDetail
 * @desc Add the specified enemy and set the coordinates.
 * 
 * @arg EnemyId
 * @type string
 * @desc The ID of the enemy to be added. Random selection possible with multiple designations (e.g., 1~3,5)
 * 
 * @arg X
 * @type string
 * @desc X coordinate to add an enemy.
 * 
 * @arg Y
 * @type string
 * @desc Y coordinate to add an enemy.
 * 
 * @-----------------------------------------------------
 * @ [Plugin Parameters]
 * @-----------------------------------------------------
 * 
 * @param AutoFastEvent
 * @type boolean
 * @default true
 * @desc Execute the fastest battle event that meets the conditions.
 * 
 * @param CommonCommonEvent
 * @type common_event
 * @desc The common event always executed fastest at the start of battle. Runs later than the Troop event.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.00 バトルイベントをフェードイン前に最速実行。
 * @author 砂川赳（https://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/499824342.html
 *
 * @help バトルイベントをフェードイン前に最速実行します。
 * 
 * 画面の色調変更などと組み合わせれば、
 * 戦闘が始まった瞬間から演出を実行することができます。
 * 
 * さらにプラグインコマンドによって敵キャラの追加が可能です。
 * NRP_TroopRandomFormation.jsと組み合わせれば、
 * 敵グループをランダム生成＆配置することも可能です。
 * 
 * ※ただし、イベントコマンドの停止制御はしていないため、
 * 　文章の表示やウェイトなどはうまくいきません。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * 以下を満たすバトルイベントが最速実行の対象になります。
 * 
 * ・１ページ目であること。
 * ・条件が『実行しない』であること。
 * ・スパンが『バトル』であること。
 * 
 * 上記は設定によって、無効化できます。
 * 
 * それ以外の場合でも、イベントコマンドの先頭の注釈に
 * 以下を記入すれば最速実行の対象になります。
 * 
 * <FastBattleEvent>
 * 
 * -------------------------------------------------------------------
 * ■プラグインコマンド
 * -------------------------------------------------------------------
 * ◆敵キャラを追加
 * 指定した敵キャラを追加します。
 * 
 * 複数指定すれば、ランダム選択もできます。
 * ・例１：1~3ならば、ＩＤ１～３の敵からランダムに追加。
 * ・例２：1,3,5ならば、ＩＤ１、３、５の敵からランダムに追加。
 * 
 * ◆敵キャラを追加（詳細）
 * 要領は上の『敵キャラを追加』と同じですが、座標の指定が可能です。
 * 
 * ただし、NRP_TroopRandomFormation.jsのランダム配置が有効な場合は、
 * 座標が上書きされてしまうので、ご注意ください。
 * 
 * -------------------------------------------------------------------
 * ■利用規約
 * -------------------------------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @-----------------------------------------------------
 * @ プラグインコマンド
 * @-----------------------------------------------------
 * 
 * @command AddEnemy
 * @text 敵キャラを追加
 * @desc 指定した敵キャラを追加します。
 * 
 * @arg EnemyId
 * @text 敵キャラのＩＤ
 * @type string
 * @desc 追加する敵キャラのＩＤです。
 * 複数指定でランダム選択可（例：1~3,5）
 * 
 * @-----------------------------------------------------
 * 
 * @command AddEnemyDetail
 * @text 敵キャラを追加（詳細）
 * @desc 指定した敵キャラを追加し、座標を設定します。
 * 
 * @arg EnemyId
 * @text 敵キャラのＩＤ
 * @type string
 * @desc 追加する敵キャラのＩＤです。
 * 複数指定でランダム選択可（例：1~3,5）
 * 
 * @arg X
 * @text Ｘ座標
 * @type string
 * @desc 敵キャラを追加するＸ座標です。
 * 
 * @arg Y
 * @text Ｙ座標
 * @type string
 * @desc 敵キャラが追加するＹ座標です。
 * 
 * @-----------------------------------------------------
 * @ プラグインパラメータ
 * @-----------------------------------------------------
 * 
 * @param AutoFastEvent
 * @text 自動で最速実行
 * @type boolean
 * @default true
 * @desc 『１ページ目』かつ『実行しない』かつ『バトル』のイベントを最速実行します。
 * 
 * @param CommonCommonEvent
 * @text 共通コモンイベント
 * @type common_event
 * @desc 戦闘開始時に常に最速実行されるコモンイベントです。
 * 敵グループのイベントより後で実行されます。
 */

(function() {
"use strict";

/**
 * ●構造体（二重配列）をJSで扱えるように変換
 */
function parseStruct2(arg) {
    const ret = [];
    if (arg) {
        for (const str of JSON.parse(arg)) {
            ret.push(JSON.parse(str));
        }
    }
    return ret;
}
function toNumber(str, def) {
    if (str == undefined || str == "") {
        return def;
    }
    return isNaN(str) ? def : +(str || def);
}
function toBoolean(str, def) {
    if (str === true || str === "true") {
        return true;
    } else if (str === false || str === "false") {
        return false;
    }
    return def;
}
function setDefault(str, def) {
    if (str == undefined || str == "") {
        return def;
    }
    return str;
}

const PLUGIN_NAME = "NRP_FastBattleEvent";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pAutoFastEvent = toBoolean(parameters["AutoFastEvent"]);
const pCommonCommonEvent = toNumber(parameters["CommonCommonEvent"]);

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
                    if (evalId) {
                        targets.push(evalId);
                    }
                }
            } else {
                for (let i = idRangeStart; i <= idRangeEnd; i++) {
                    const evalId = eval(i);
                    if (evalId) {
                        targets.push(evalId);
                    }
                }
            }
            
        // 通常時
        } else {
            const evalId = eval(id);
            if (evalId) {
                targets.push(evalId);
            }
        }
    }
    return targets;
}

//-----------------------------------------------------------------------------
// ＭＺ用プラグインコマンド
//-----------------------------------------------------------------------------

// MVには存在しないため、空で定義しておかないとエラーになる。
if (!PluginManager.registerCommand) {
    PluginManager.registerCommand = function() {}
}

/**
 * ●敵キャラを追加
 */
PluginManager.registerCommand(PLUGIN_NAME, "AddEnemy", function(args) {
    const argsEnemyId = args.EnemyId;

    // 複数指定に対応するため配列変換
    const enemyIds = makeTargets(argsEnemyId);
    // 候補の中からランダムに一つを取得
    const enemyId = enemyIds[Math.randomInt(enemyIds.length)];
    // 敵を追加
    $gameTroop._enemies.push(new Game_Enemy(enemyId, 0, 0));
});

/**
 * ●敵キャラを追加（詳細）
 */
PluginManager.registerCommand(PLUGIN_NAME, "AddEnemyDetail", function(args) {
    const argsEnemyId = args.EnemyId;
    const x = eval(args.X);
    const y = eval(args.Y);

    // 複数指定に対応するため配列変換
    const enemyIds = makeTargets(argsEnemyId);
    // 候補の中からランダムに一つを取得
    const enemyId = enemyIds[Math.randomInt(enemyIds.length)];
    // 敵を追加
    $gameTroop._enemies.push(new Game_Enemy(enemyId, x, y));
});

//-----------------------------------------------------------------------------
// Scene_Battle
//-----------------------------------------------------------------------------

// 実行フラグ
let mFastBattleEventFlg = false;

/**
 * ●初期化
 */
const _Scene_Battle_initialize = Scene_Battle.prototype.initialize;
Scene_Battle.prototype.initialize = function() {
    _Scene_Battle_initialize.apply(this, arguments);

    // フラグ初期化
    mFastBattleEventFlg = false;
};

//-----------------------------------------------------------------------------
// Spriteset_Battle
//-----------------------------------------------------------------------------

/**
 * ●戦闘フィールドの作成
 * ※敵データの設定がされるcreateEnemiesの直前にやりたいため、ここで処理する。
 */
const _Spriteset_Battle_createBattleField = Spriteset_Battle.prototype.createBattleField;
Spriteset_Battle.prototype.createBattleField = function() {
    _Spriteset_Battle_createBattleField.apply(this, arguments)

    // この段階だと通常はセットされてないが仮設定をする。
    // ※NRP_ChangeBackColor.jsなどと併用できるようにするため。
    SceneManager._scene._spriteset = this;

    // バトルイベントを最速実行
    // ※まず実害はないと思うけど、念のために戦闘開始してから初回のみ実行
    if (!mFastBattleEventFlg) {
        $gameTroop.fastBattleEvent();
        mFastBattleEventFlg = true;
    }
};

//-----------------------------------------------------------------------------
// Game_Troop
//-----------------------------------------------------------------------------

Game_Troop.prototype.fastBattleEvent = function() {
    // 先頭ページを取得
    const pages = this.troop().pages;
    const page = pages[0];
    const c = page.conditions;

    // 最速実行フラグ
    let fastEventFlg = false;

    if (pAutoFastEvent) {
        // 条件が実行しない。かつスパンがバトル
        if (
            !c.turnEnding &&
            !c.turnValid &&
            !c.enemyValid &&
            !c.actorValid &&
            !c.switchValid &&
            page.span == 0
        ) {
            fastEventFlg  = true;
        }
    }

    const list = page.list;
    // 処理が存在する場合
    if (list && list.length > 0) {
        for (const line of list) {
            // 108:注釈開始, 408:注釈続き
            if (line.code == 108 || line.code == 408) {
                // 注釈から<FastBattleEvent>を取得
                const noteFastEventFlg = getFastBattleEvent(line.parameters[0]);
                // 指定があれば上書き
                if (noteFastEventFlg != null) {
                    fastEventFlg = noteFastEventFlg;
                }
            // それ以外はループ終了
            } else {
                break;
            }
        }
    }

    if (fastEventFlg) {
        this._interpreter.setup(page.list);
        // 実行済フラグをオンにする。
        this._eventFlags[0] = true;
        // イベント実行
        this.updateInterpreter();
    }

    // 共通コモンイベント
    if (pCommonCommonEvent) {
        $gameTemp.reserveCommonEvent(pCommonCommonEvent);
        this._interpreter.setupReservedCommonEvent();
        this._interpreter.update();
    }
};

/**
 * ●<FastBattleEvent>の指定があれば取得
 */
function getFastBattleEvent(note) {
    note = note.toUpperCase();
    // メモ欄から<FastBattleEvent>を取得
    // 取得できれば返す
    if (note.startsWith("<FASTBATTLEEVENT>")) {
        return true;
    }

    // メモ欄から<FastBattleEvent:*>を取得
    const arr = note.match("<FASTBATTLEEVENT:(TRUE|FALSE)?>");
    // 取得できれば返す
    if (arr) {
        if (arr[1] == "TRUE") {
            return true;

        } else if (arr[1] == "FALSE") {
            return false;
        }
    }
    return null;
}


})();
