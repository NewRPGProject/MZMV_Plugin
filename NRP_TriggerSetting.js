//=============================================================================
// NRP_TriggerSetting.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v2.01 Adjusted the behavior of event triggers.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/489139124.html
 * @orderAfter NRP_EventCollisionEX
 *
 * @help Adjusted the behavior of event triggers.
 * 
 * The two functions are as follows.
 * Switching by plugin parameters is also possible.
 * 
 * -------------------------------------------------------------------
 * [Strict Event Touch]
 * -------------------------------------------------------------------
 * When the trigger is "Event Touch",
 * the event is strictly judged to be activated for the moving player.
 * 
 * The purpose of this function is to have the foot event run
 * before the touch event.
 * 
 * This addresses the problem of foot events not being properly
 * executed in symbol-encountered works.
 * 
 * Set a number for this item.
 * 
 * - If the value is 0, touch is made only when the player is
 *   at the target coordinates, at the moment player reaches
 *   them completely or when player is stationary.
 * - If the value is 0.5, touch is made only
 *   when the player is within 0.5 tiles of the target coordinates.
 * 
 * If not needed, use the DEL key to leave blank.
 * 
 * ※Plug-ins such as half-step movement
 *   are not supported due to specifications.
 * 
 * -------------------------------------------------------------------
 * [Disable Decision Touch]
 * -------------------------------------------------------------------
 * Disables starting with the Action Button
 * for events whose trigger is "Player Touch" or "Event Touch".
 * 
 * It is rather difficult to notice
 * that the above event can be started by the Action Button.
 * However, if the event is designed for touch,
 * it tends to behave unnaturally.
 * 
 * In addition, there is no way to determine
 * that the conditional branching of the Event Command
 * was started by the Action Button.
 * There is a judgment that "Action Button Pressed," but it includes
 * the case where the button is left pressed and touched.
 * 
 * Therefore, I have made it possible
 * to prohibit activation by Action Button.
 * 
 * -------------------------------------------------------------------
 * [Disable Through Collision]
 * -------------------------------------------------------------------
 * Fix a behavior where an event with priority “Normal”
 * and trigger “Player Touch” or “Event Touch” could be activated
 * only when it overlapped with other events
 * when the event was set to slip through.
 * 
 * Due to the specifications, it is more natural to turn it
 * on at the same time as “Disable Decision Touch”.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Simply enable the plugin.
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
 * @ Plugin Parameters
 * @-----------------------------------------------------
 * 
 * @param StrictEventTouch
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 0
 * @desc The lower the number, the more limited the timing of touch from the event to a moving player. Disabled by DEL
 * 
 * @param DisableDecisionTouch
 * @type boolean
 * @default true
 * @desc For events whose trigger is "Player Touch" or "Event Touch", activation with the decision button is prohibited.
 * 
 * @param DisableThroughCollision
 * @type boolean
 * @default true
 * @desc For events whose trigger is “Player Touch” or “Event Touch”, collision in the state of slipping through is prohibited.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v2.01 イベントトリガーの挙動を調整。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/489139124.html
 * @orderAfter NRP_EventCollisionEX
 *
 * @help イベントトリガーの挙動を調整します。
 * 
 * 機能は以下の２つです。
 * プラグインパラメータによる切り替えも可能です。
 * 
 * -------------------------------------------------------------------
 * ■イベントから接触を厳密に
 * -------------------------------------------------------------------
 * トリガーが『イベントから接触』の際、移動中のプレイヤーに対して、
 * イベントが起動する判定を厳しくします。
 * 
 * この機能の目的は、足元のイベントを
 * 接触イベントより先に実行させることです。
 * 
 * これにより、シンボルエンカウントの作品において、
 * 足元のイベントが適切に実行されない問題に対処できます。
 * 
 * この項目には数値を設定してください。
 * 
 * ・値が0ならば、プレイヤーが目的の座標に、完全に到達した瞬間、
 * 　もしくは静止した時のみ接触の対象になります。
 * ・値が0.5ならば、プレイヤーが目的の座標から0.5タイル以内に
 * 　位置している時のみ接触の対象になります。
 * 
 * 不要な場合はＤＥＬキーで空白にしてください。
 * 
 * ※仕様上、半歩移動などのプラグインには対応していません。
 * 
 * -------------------------------------------------------------------
 * ■決定ボタンによる接触無効
 * -------------------------------------------------------------------
 * トリガーが『プレイヤーから接触』『イベントから接触』の
 * イベントに対して、決定ボタンでの起動を禁止します。
 * 
 * 上記のイベントを決定ボタンで起動できるのは、わりと気づきにくい仕様です。
 * しかしながら、接触を前提にしてイベントを組んでいる場合は、
 * 不自然な挙動になりがちです。
 * 
 * 加えて、イベントコマンドの条件分岐では
 * 決定ボタンで起動されたことを判定する方法はありません。
 * 「決定が押されている」という判定はありますが、
 * ボタンを押しっぱなしで接触した場合も含まれてしまいます。
 * 
 * というわけで、決定ボタンでの起動を禁止できるようにしました。
 * 
 * -------------------------------------------------------------------
 * ■すり抜け衝突の禁止
 * -------------------------------------------------------------------
 * プライオリティが『通常キャラと同じ』かつトリガーが
 * 『プレイヤーから接触』『イベントから接触』のイベントをすり抜けにした際、
 * 他のイベントと重なっているときのみ起動できてしまう挙動を修正します。
 * 
 * 仕様上、決定ボタンによる接触無効と同時にオンにしたほうが自然です。
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
 * @param StrictEventTouch
 * @text イベントから接触を厳密に
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @default 0
 * @desc 数字が小さいほど移動中のプレイヤーに対して、イベントから接触できるタイミングが限定されます。DELで無効化
 * 
 * @param DisableDecisionTouch
 * @text 決定ボタンによる接触無効
 * @type boolean
 * @default true
 * @desc トリガーが『プレイヤーから接触』『イベントから接触』のイベントに対して、決定ボタンでの起動を禁止します。
 * 
 * @param DisableThroughCollision
 * @text すり抜け衝突の禁止
 * @type boolean
 * @default true
 * @desc トリガーが『プレイヤーから接触』『イベントから接触』のイベントに対して、すり抜け状態での衝突を禁止します。
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

const PLUGIN_NAME = "NRP_TriggerSetting";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pStrictEventTouch = toNumber(parameters["StrictEventTouch"]);
const pDisableDecisionTouch = toBoolean(parameters["DisableDecisionTouch"]);
const pDisableThroughCollision = toBoolean(parameters["DisableThroughCollision"]);

// ----------------------------------------------------------------------------
// イベントから接触を厳密に
// ----------------------------------------------------------------------------
if (pStrictEventTouch != null) {
    /**
     * ●イベントから接触のトリガー判定
     */
    const _Game_Event_checkEventTriggerTouch = Game_Event.prototype.checkEventTriggerTouch;
    Game_Event.prototype.checkEventTriggerTouch = function(x, y) {
        if ($gamePlayer.isMoving()) {
            // 現在の実質座標と表示位置の差分を取得
            const difX = Math.abs($gamePlayer._realX - $gamePlayer._x);
            const difY = Math.abs($gamePlayer._realY - $gamePlayer._y);
            // 判定値より大きな場合は停止
            if (difX + difY > pStrictEventTouch) {
                return;
            }
        }
        _Game_Event_checkEventTriggerTouch.apply(this, arguments);
    };
}

// ----------------------------------------------------------------------------
// 決定ボタンによる接触無効
// ----------------------------------------------------------------------------
if (pDisableDecisionTouch) {
    /**
     * ●前方のイベント起動確認
     */
    const _Game_Player_checkEventTriggerThere = Game_Player.prototype.checkEventTriggerThere;
    Game_Player.prototype.checkEventTriggerThere = function(triggers) {
        // トリガーを『決定ボタン』だけに限定
        _Game_Player_checkEventTriggerThere.call(this, [0]);
    };
}

// ----------------------------------------------------------------------------
// すり抜け衝突の禁止
// ----------------------------------------------------------------------------
if (pDisableThroughCollision) {
    /**
     * ●トリガーの一致確認
     * ※通常キャラと同じかつ接触系トリガーのイベントをすり抜けにした際、
     * 　他のイベントと重なっているときのみ起動できてしまう不具合修正。
     */
    const _Game_Event_isTriggerIn = Game_Event.prototype.isTriggerIn;
    Game_Event.prototype.isTriggerIn = function(triggers) {
        // トリガーが接触系の場合
        if (this._trigger == 1 || this._trigger == 2) {
            // イベントが通常キャラと同じかつすり抜けならば対象外
            if (this.isNormalPriority() && this.isThrough()) {
                return false;
            }
        }

        return _Game_Event_isTriggerIn.apply(this, arguments);
    };
}

})();
