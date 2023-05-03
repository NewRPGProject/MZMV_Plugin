//=============================================================================
// NRP_Y_NoGameover2.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc If you lose in a battle, the game is not over.
 * @author yuwaka (MOD: Takeshi Sunagawa)

 * @param Switch ID
 * @desc The switch ID to turn on when you Dead on the map or in a battle.
 * @default 0
 * @type switch
 *
 * @param Switch ID2
 * @desc The ID of the switch to turn on when lose in a battle.
 * @default 0
 * @type switch
 *
 * @help
 * This plugin is a feature-added version of NoGameover2.js,
 * the RPG Maker MZ launch plugin by Yuwaka,
 * created by Takeshi Sunagawa.
 * 
 * In the original, if a player is wiped out in an event battle,
 * subsequent events are executed as is,
 * but the event is modified to force termination.
 * 
 * -------------------------------------------------------------------
 * [Below is the original explanation]
 * -------------------------------------------------------------------
 * 
 * There are no plugin commands in this plugin.
 *
 *　Allow it to fade out automatically.
 *　Fade in at any time you put into the common event you call by switch.
 *
 *　Automatically "Change Menu Acsess" is "Disable".
 *　(To prevent the menu icon from blinking.)
 *　If necessary, remove the Disable.
 *　Comment out if you don't want to fade out or ban the menu.
 *
 *　If the "Battle Processing" use, if you have a set of defeats, that takes precedence.
 *
 * There are no plug-in commands.
 * This is a plugin for RPG Maker MZ only.
 * Please feel free to modify and use it in accordance with the terms of the RPG Maker.
 * I will not be responsible for any problems that may occur. Please understand.
 *
 * Special Thanks:I used the plugin for the RPG Maker MV sample game "Sea Pirate(Auther Tachi)" as a reference.
 */
/*:ja
 * @target MZ
 * @plugindesc 全滅してもゲームオーバーにならない。
 * @author ゆわか（改造：砂川赳）

 * @param Switch ID
 * @desc マップ上でも戦闘でも全滅したときにONにするスイッチのIDです。
 * @default 0
 * @type switch
 *
 * @param Switch ID2
 * @desc 戦闘で全滅したときにONにするスイッチのIDです。
 * @default 0
 * @type switch
 * 
 * @help
 * このプラグインはゆわか様による
 * ＲＰＧツクールＭＺのローンチプラグインNoGameover2.jsに対して、
 * 砂川赳が機能追加を行ったものです。
 * 
 * オリジナルではイベント戦闘で全滅しても、
 * 後続のイベントがそのまま実行されてしまいますが、
 * イベントを強制終了するように改造しています。
 * 
 * -------------------------------------------------------------------
 * ■以下、オリジナルの解説
 * -------------------------------------------------------------------
 * このプラグインには、プラグインコマンドはありません。
 *
 *　自動的にフェードアウトするようにしています。
 *　フェードインはスイッチで呼び出すコモンイベントへ入れて
 *　好きなタイミングで行ってください。
 *
 *　自動的にメニューを禁止するようにしています。
 *　メニューアイコンの点滅を防ぐためです。
 *　必要に応じて、禁止を解いてください。
 *
 *　（フェードアウトやメニューを禁止したくなければ、コメントアウトしてね）
 *
 *　イベント中の戦闘で、敗北の設定をしている場合は、そちらが優先されます。
 *
 * プラグインコマンドはありません。
 * ＲＰＧツクールＭＺ専用のプラグインです。
 * ツクールの規約に沿って自由に改変、使用してください。
 *
 *　ＲＰＧツクールＭＶサンプルゲーム「シーピラート」のプラグインを
 *　参考にさせて頂きました。
 *　ありがとうございます。
 */

(function() {

    var parameters = PluginManager.parameters('NRP_Y_NoGameover2');
    var switchId = Number(parameters['Switch ID'] || 0);
    var switchId2 = Number(parameters['Switch ID2'] || 0);

//rpg_managers.jsより（戦闘で全滅した場合）
BattleManager.updateBattleEnd = function() {
    if (this.isBattleTest()) {
        AudioManager.stopBgm();
        SceneManager.exit();
    } else if (!this._escaped && $gameParty.isAllDead()) {
        if (this._canLose) {
            $gameParty.reviveBattleMembers();
            SceneManager.pop();
        } else {
            //SceneManager.goto(Scene_Gameover);//ゲームオーバーを表示するぜ
	        $gameSystem.disableMenu()//メニューを禁止するぜ
            $gameScreen.startFadeOut(10); //フェードアウトするぜ
	        $gameSwitches.setValue(switchId, true); //全滅したぜ
	        $gameSwitches.setValue(switchId2, true); //戦闘中に全滅したぜ
            $gameParty.reviveBattleMembers(); //みんな生き返るぜ
            SceneManager.pop(); //マップ画面へ移動するぜ

            // イベントが実行中の場合（ADD Sunagawa）
            if ($gameMap.isEventRunning()) {
                // イベント処理の中断を実行
                $gameMap._interpreter.command115();
            }
        }
    } else {
        SceneManager.pop();
    }
    this._phase = "";
};

//rmmz_scenes.jsより（フィールドで全滅した場合）
Scene_Base.prototype.checkGameover = function() {
    if ($gameParty.isAllDead()) {
//        SceneManager.goto(Scene_Gameover);//ゲームオーバーを表示するぜ
	    $gameSystem.disableMenu()//メニューを禁止するぜ
        $gameScreen.startFadeOut(10); //フェードアウトするぜ
	    $gameSwitches.setValue(switchId, true); //全滅したぜ
        $gameParty.reviveBattleMembers(); //みんな生き返るぜ

        // イベントが実行中の場合（ADD Sunagawa）
        if ($gameMap.isEventRunning()) {
            // イベント処理の中断を実行
            $gameMap._interpreter.command115();
        }
    }
};

})();
