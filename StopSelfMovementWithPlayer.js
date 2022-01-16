//=============================================================================
// StopSelfMovementWithPlayer.js (ver 1.01)
//=============================================================================
// [Change History]
// 2017.Jun     First Release
// 2017.Dec.13  avoid collision with Tsumio's ExpandStatusScene.js

/*:
 * @target MV MZ
 * @plugindesc While an event is running, events stop self movement
 * @author Sasuke KANNAZUKI
 *
 * @param Varidate Switch ID
 * @desc It works only when the id's switch is on. If set 0, always works.
 * @default 0
 *
 * @help
 * This plugin does not provide plugin commands.
 *
 * [Summary]
 * At default system, events do self movement even if any event is running.
 * This plugin stops events' self movent during any event is running.
 *
 * Note:
 * - events don't stop self movement if only parallel events are running.
 * - events also stop self movement when message window is opening
 * (ex. when state removed message is displaying).
 * - You can toggle mode by switch set at parameter "Varidate Switch ID".
 *
 * [License]
 * this plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */

/*:ja
 * @target MV MZ
 * @plugindesc イベント起動中にイベントの自律移動を停止します。
 * @author 神無月サスケ
 *
 * @param Varidate Switch ID
 * @desc このIDのスイッチがONの時に有効になります。0を指定すると常に有効です。
 * @default 0
 *
 * @help
 * このプラグインには、プラグインコマンドはありません。
 *
 * ■概要
 * 通常のシステムでは、イベント起動中も他のイベントは自律移動を続けます。
 * このプラグインは、イベント起動中の自律移動を行わなくします。
 *
 * - 並列イベントのみが起動中の場合は、自律移動はやめません。
 * - イベント起動中以外でも、メッセージウィンドウ表示中は自律移動を行いません。
 * (例：「○○のステートが切れた」というメッセージの表示中)
 * - パラメータ"Varidate Switch ID"のスイッチの操作でゲーム中の機能のON/OFFが
 *  可能です。
 *
 * ■ライセンス表記
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 */

(function() {
  //
  // process parameters
  //
  var parameters = PluginManager.parameters('StopSelfMovementWithPlayer');
  var validateSwitchId = Number(parameters['Varidate Switch ID'] || 0);

  //
  // stop self movement routine
  //
  var isStopWithPlayerMode = function () {
    return validateSwitchId === 0 || $gameSwitches.value(validateSwitchId);
  };

  var shouldStopWithPlayer = function () {
    if (isStopWithPlayerMode()) {
      var mw;
      if ($gameMap.isEventRunning()) {
        // when another event is running, stop moving.
        // ex. when the player is inspecting treasure box or talking with NPC.
        return true;
      } else if ((mw = SceneManager._scene._messageWindow) && mw.isOpen()) {
        // ex. when state removed message is displaying, stop moving.
        return true;
      }
    }
    return false;
  };

  var _Game_CharacterBase_updateStop = Game_CharacterBase.prototype.updateStop;
  Game_CharacterBase.prototype.updateStop = function() {
    if (!shouldStopWithPlayer()) {
      _Game_CharacterBase_updateStop.call(this);
    }
  };

  var _Game_Event_updateSelfMovement = Game_Event.prototype.updateSelfMovement;
  Game_Event.prototype.updateSelfMovement = function() {
    if (!shouldStopWithPlayer()) {
      _Game_Event_updateSelfMovement.call(this);
    }
  };

})();
