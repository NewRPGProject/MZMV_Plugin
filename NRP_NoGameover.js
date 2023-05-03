//=============================================================================
// NRP_NoGameover.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 The game continues even in defeat.
 * @author Takeshi Sunagawa (https://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/499219774.html
 *
 * @help The game continues without game over in the event of defeat.
 * 
 * When defeated, the common event is called
 * with the screen fading in.
 * If you specify a transfer destination in the common event,
 * you can set a destination for resurrection in case of defeat,
 * as in Dragon Quest.
 * 
 * Unlike the MZ launch plugin NoGameover2.js,
 * during an event battle, the event is forced to terminate.
 * The advantage of this is that it eliminates the need
 * for individual control in the event of defeat.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Set up a common event to be called upon defeat.
 * Set the fade-in process manually in the common event,
 * as it is in fade-out state after defeat.
 * 
 * It is recommended that this plugin be placed relatively high up
 * in the plugin list due to potential conflicts.
 * 
 * -------------------------------------------------------------------
 * [Acknowledgements]
 * -------------------------------------------------------------------
 * This plugin is based on NoGameover2.js (by yuwaka)
 * from RPG Maker MZ launch.
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
 * @ [Plugin Parameters]
 * @-----------------------------------------------------
 * 
 * @param CommmonEvent
 * @type common_event
 * @desc This is a common event called in the event of defeat.
 * 
 * @param FadeDuration
 * @type number
 * @default 24
 * @desc Fade-out time on defeat. The default value is 24.
 * 
 * @param DisableMenu
 * @type boolean
 * @default false
 * @desc Automatic menu prohibition upon defeat.
 * This measure prevents the icon from blinking.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 全滅時もゲームを続行する。
 * @author 砂川赳（https://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/499219774.html
 *
 * @help 全滅時にゲームオーバーにせず、ゲームを続行します。
 * 
 * 敗北時は画面をフェードインした状態で、コモンイベントを呼び出します。
 * コモンイベント内で場所移動先を指定すれば、
 * ドラクエのように全滅時の復活先を設定できます。
 * 
 * ＭＺローンチプラグインのNoGameover2.jsと異なり、
 * イベント戦闘時はそのイベントを強制終了します。
 * それによって、全滅時の個別制御が不要となるのが利点です。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * 全滅時に呼び出されるコモンイベントを設定してください。
 * 全滅後はフェードアウト状態になっているため、
 * フェードイン処理をコモンイベント内に手動で設定してください。
 * 
 * このプラグインは競合のおそれがあるため、
 * プラグイン一覧の比較的、上のほうに配置することを推奨します。
 * 
 * -------------------------------------------------------------------
 * ■謝辞
 * -------------------------------------------------------------------
 * このプラグインはＲＰＧツクールＭＺローンチプラグインの
 * NoGameover2.js（ゆわか様）を参考にさせていただきました。
 * 
 * -------------------------------------------------------------------
 * ■利用規約
 * -------------------------------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @-----------------------------------------------------
 * @ プラグインパラメータ
 * @-----------------------------------------------------
 * 
 * @param CommmonEvent
 * @text コモンイベント
 * @type common_event
 * @desc 全滅時に呼び出されるコモンイベントです。
 * 
 * @param FadeDuration
 * @text フェード時間
 * @type number
 * @default 24
 * @desc 全滅時のフェードアウト時間です。初期値は24。
 * 
 * @param DisableMenu
 * @text メニューを禁止
 * @type boolean
 * @default false
 * @desc 全滅時にメニューを自動で禁止します。
 * アイコン点滅を防ぐ措置です。後で解除を忘れずに。
 */
(function() {
"use strict";

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

const PLUGIN_NAME = "NRP_NoGameover";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pCommmonEvent = toNumber(parameters["CommmonEvent"]);
const pFadeDuration = toNumber(parameters["FadeDuration"], 24);
const pDisableMenu = toBoolean(parameters["DisableMenu"]);

// ----------------------------------------------------------------------------
// BattleManager
// ----------------------------------------------------------------------------

/**
 * 【上書】戦闘終了時
 */
BattleManager.updateBattleEnd = function() {
    if (this.isBattleTest()) {
        AudioManager.stopBgm();
        SceneManager.exit();
    } else if (!this._escaped && $gameParty.isAllDead()) {
        if (this._canLose) {
            $gameParty.reviveBattleMembers();
            SceneManager.pop();
        } else {
            // ゲームオーバーにしない。
            // SceneManager.goto(Scene_Gameover);

            // メニューを禁止
            if (pDisableMenu) {
	            $gameSystem.disableMenu();
            }
            // フェードアウト
            $gameScreen.startFadeOut(pFadeDuration);
            // 全員復活
            $gameParty.reviveBattleMembers();
            // マップ画面へ戻る
            SceneManager.pop();

            // イベントが実行中の場合
            if ($gameMap.isEventRunning() && $gameMap._interpreter._list) {
                // イベント処理の中断を実行
                $gameMap._interpreter.command115();
            }

            // コモンイベントを呼び出し
            if (pCommmonEvent) {
                $gameTemp.reserveCommonEvent(pCommmonEvent);
                $gameMap._interpreter.setupReservedCommonEvent();
            }
        }
    } else {
        SceneManager.pop();
    }
    this._phase = "";
};

// ----------------------------------------------------------------------------
// Scene_Base
// ----------------------------------------------------------------------------

/**
 * 【上書】ゲームオーバーの判定
 * ※マップ上
 */
Scene_Base.prototype.checkGameover = function() {
    if ($gameParty.isAllDead()) {
        // ゲームオーバーにしない。
        // SceneManager.goto(Scene_Gameover);

        // メニューを禁止
        if (pDisableMenu) {
            $gameSystem.disableMenu();
        }
        // フェードアウト
        $gameScreen.startFadeOut(pFadeDuration);
        // 全員復活
        $gameParty.reviveBattleMembers();

        // イベントが実行中の場合
        if ($gameMap.isEventRunning() && $gameMap._interpreter._list) {
            // イベント処理の中断を実行
            $gameMap._interpreter.command115();
        }

        // コモンイベントを呼び出し
        if (pCommmonEvent) {
            $gameTemp.reserveCommonEvent(pCommmonEvent);
            $gameMap._interpreter.setupReservedCommonEvent();
        }
    }
};

})();
