//=============================================================================
// NRP_TriggerSetting.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Disable starting with Action Button on Touch type trigger events.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/489139124.html
 *
 * @help Disables starting with the Action Button
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
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 接触系トリガーのイベントで決定ボタンでの起動を禁止。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/489139124.html
 *
 * @help トリガーが『プレイヤーから接触』『イベントから接触』の
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
 * ■使用法
 * -------------------------------------------------------------------
 * プラグインを有効にするだけでＯＫです。
 * 
 * -------------------------------------------------------------------
 * ■利用規約
 * -------------------------------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
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

// ----------------------------------------------------------------------------
// Game_Player
// ----------------------------------------------------------------------------

/**
 * ●前方のイベント起動確認
 */
const _Game_Player_checkEventTriggerThere = Game_Player.prototype.checkEventTriggerThere;
Game_Player.prototype.checkEventTriggerThere = function(triggers) {
    // トリガーを『決定ボタン』だけに限定
    _Game_Player_checkEventTriggerThere.call(this, [0]);
};

})();
