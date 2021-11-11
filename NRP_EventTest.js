//=============================================================================
// NRP_EventTest.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Extends event acceleration feature.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/484313722.html
 *
 * @help Extends the functionality of event test.
 * 
 * RPG Maker MV/MZ has a feature to test the event
 * you are editing on the event editor.
 * (This can be done by selecting the range > right click > Test)
 * 
 * However, this feature has a major limitation and is not very useful.
 * 
 * Because it runs without loading any map data,
 * it does not display the map, nor the images of events.
 * Therefore, you can only test very limited elements,
 * such as the timing of messages.
 * 
 * Also, if you want to adjust the state of member subscriptions,
 * switches, etc., when testing, there is no mechanism to set them.
 * 
 * And because it runs without loading the map data,
 * plugins that don't take that into account will fail across the board.
 * 
 * Therefore, I will make the following improvements
 * so that you can check the display and behavior of maps and events.
 * 
 * - Load an appropriate map at the start of the test to avoid errors.
 * 　※This is a dummy to avoid errors, so it can be really appropriate.
 * 
 * - Enable to set the initialization process
 *   to be executed only at the time of the event test,
 *   so that the state of the members and switches can be adjusted.
 * 
 * - In the initial setup process, the required map and event data
 *   can be loaded by specifying the Transfer Player.
 * 　※Normally, when you move the map with the Transfer Player,
 *     commands to subsequent events are ignored,
 *     but I will improve this so that commands are accepted.
 * 
 * ------------------------------------------
 * [Usage]
 * ------------------------------------------
 * Open the event you want to test in an editor
 * and make the initial settings for event testing.
 * 

 * If you use "TestSwitch" to make a conditional branch,
 * you can set up a special process for event test execution.
 * ※"TestSwitch" is specified by a plugin parameter.
 * 
 * If you run Transfer Player in the branch,
 * the map data will be loaded and each image will be displayed.
 * ※If the event originally calls Transfer Player
 *   at the beginning, it can be omitted.
 * 
 * Make other changes to the status of members joining,
 * switches, etc. as needed.
 * 
 * Also, commands targeted at "This Event" will be ignored by default.
 * It is necessary to set the ID
 * in the plugin parameter "ThisEventIdVariable".
 * ※Be sure to set it before Transfer Player.
 * 
 * Now you can select a range of commands in the event editor
 * and right-click to Test (or Ctrl+R).
 * If the event is executed as expected, you have succeeded.
 * 
 * ------------------------------------------
 * [Terms]
 * ------------------------------------------
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 * 
 * @param DefaultMapId
 * @type number
 * @default 1
 * @desc This is the initial map ID at the start of the event test.
 * Please set an appropriate map.
 * 
 * @param TestSwitch
 * @type switch
 * @desc This is the switch that is turned on during event testing.
 * Same as DataManager.isEventTest() in the script.
 * 
 * @param ThisEventIdVariable
 * @type variable
 * @desc This variable is used to set the event ID for "this event.
 * 
 * @param StartCommonEvent
 * @type common_event
 * @desc This is a common event that is called when the event test starts.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 イベントテストの機能を拡張します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/484313722.html
 *
 * @help イベントテストの機能を拡張します。
 * 
 * ツクールＭＶ～ＭＺにはイベントエディタ上で
 * 編集中のイベントのテストを行う機能があります。
 * （範囲選択＞右クリック＞テストで実行可能です。）
 * 
 * ただこの機能には大きな制約があって、
 * 今ひとつ使い勝手がよくないのが実情です。
 * 
 * マップデータを一切読み込まずに実行するため、
 * マップは愚か、イベントの画像なども表示されません。
 * そのため、メッセージのタイミングなど
 * ごく限られた要素をテストすることしかできません。
 * 
 * また、テストを行う際に、メンバーの加入や
 * スイッチなどの状態を調整したいことがあるかと思いますが、
 * それらを設定する仕組みがありません。
 * 
 * そして、マップデータを読み込まずに実行するため、
 * その点を考慮していないプラグインは軒並みエラーになります。
 * 
 * そこで以下のように改善することで、
 * マップやイベントの表示・動作を確認できるようにします。
 * 
 * ・適当なマップをテスト開始時に読み込むことでエラーを回避する。
 * 　※エラー回避用のダミーなので、本当に適当で構いません。
 * 
 * ・イベントテスト時のみ実行される初期設定を可能にして、
 * 　メンバーやスイッチの状態を調整可能に。
 * 
 * ・初期設定時に場所移動を指定し、マップ＆イベントデータを読み込む。
 * 　※通常、場所移動でマップを移動すると、
 * 　　以降のイベントへの命令は無視される仕様ですが、
 * 　　命令を受けつけるように改善します。
 * 
 * ------------------------------------------
 * ■使用方法
 * ------------------------------------------
 * テストしたいイベントをエディタで開き、
 * イベントテスト用の初期設定をしてください。
 * 
 * テスト判定用スイッチで条件分岐させれば、
 * イベントテスト実行時専用の処理を設定できます。
 * ※テスト判定用スイッチはプラグインパラメータで指定
 * 
 * 分岐内で場所移動を実行すれば、
 * マップデータが読み込まれ、各画像が表示されるようになります。
 * ※元から冒頭で場所移動を呼ぶイベントなら省略可
 * 
 * 他にも、メンバーの加入やスイッチなどの状態を
 * 必要に応じて変更してください。
 * 
 * また『このイベント』が対象になっているコマンドは
 * 初期状態では無視されてしまいます。
 * プラグインパラメータの『このイベントＩＤの変数』に
 * ＩＤを設定しておく必要があります。
 * ※必ず場所移動より前に設定してください。
 * 
 * あとはイベントエディタでコマンドを範囲選択し、
 * 右クリックでテスト（またはCtrl+R）を実行します。
 * 想定通りにイベントが実行されれば成功です。
 * 
 * ------------------------------------------
 * ■利用規約
 * ------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param DefaultMapId
 * @text 初期マップＩＤ
 * @type number
 * @default 1
 * @desc イベントテスト開始時の初期マップＩＤです。
 * 適当なマップを設定してください。
 * 
 * @param TestSwitch
 * @text テスト判定用スイッチ
 * @type switch
 * @desc イベントテスト時にオンになるスイッチです。
 * ※スクリプトのDataManager.isEventTest()と同じです。
 * 
 * @param ThisEventIdVariable
 * @text このイベントＩＤの変数
 * @type variable
 * @desc 『このイベント』のイベントＩＤを設定する変数です。
 * 
 * @param StartCommonEvent
 * @text 開始時コモンイベント
 * @type common_event
 * @desc イベントテスト開始時に呼び出されるコモンイベントです。
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

const PLUGIN_NAME = "NRP_EventTest";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pDefaultMapId = toNumber(parameters["DefaultMapId"], 1);
const pTestSwitch = toNumber(parameters["TestSwitch"]);
const pThisEventIdVariable = toNumber(parameters["ThisEventIdVariable"]);
const pStartCommonEvent = toNumber(parameters["StartCommonEvent"]);

/**
 * ●イベントテストの設定
 */
const _DataManager_setupEventTest = DataManager.setupEventTest;
DataManager.setupEventTest = function() {
    _DataManager_setupEventTest.apply(this, arguments);

    // 仮のマップＩＤを設定しておく。
    if (pDefaultMapId) {
        $gamePlayer._newMapId = pDefaultMapId;
    }

    // テスト用スイッチをオン
    if (pTestSwitch) {
        $gameSwitches.setValue(pTestSwitch, true);
    }
};

/**
 * ●マップシーンの開始時
 */
const _Scene_Map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
    _Scene_Map_start.apply(this, arguments);

    // 場所移動時かつイベントテストの場合
    if (this._transfer && DataManager.isEventTest()) {
        // マップが有効な場合
        if ($gameMap.mapId()) {
            const interpreter = $gameMap._interpreter;

            // 実行中イベントのマップＩＤが未設定の場合、
            // またはデフォルト値の場合
            // ※最初の場所移動とみなす
            if (interpreter._mapId <= 0 || interpreter._mapId == pDefaultMapId) {
                // マップＩＤを設定
                interpreter._mapId = $gameMap.mapId();
                // イベントＩＤを取得
                if (pThisEventIdVariable) {
                    interpreter._eventId = $gameVariables.value(pThisEventIdVariable);
                }
            }
        }
    }
};

/**
 * ●イベントテストの設定
 */
const _Game_Map_setupTestEvent = Game_Map.prototype.setupTestEvent;
Game_Map.prototype.setupTestEvent = function() {
    const result = _Game_Map_setupTestEvent.apply(this, arguments);
    // result = trueならイベントテスト開始時なので、
    // コモンイベントを実行
    if (result && pStartCommonEvent) {
        const commonEvent = $dataCommonEvents[pStartCommonEvent];
        this._interpreter.setupChild(commonEvent.list);
    }

    return result;
};

})();
