//=============================================================================
// NRP_TpbCustomize.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.00 Customize time progress battle.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/477425826.html
 *
 * @help Customize time progress battle.
 * It's more for active mode.
 * 
 * The following settings are available.
 * You can also turn on/off each item.
 * 
 * [Common]
 * - The step forward at the time of command input is canceled.
 * - Simplify the speed calculation.
 * 
 * [For Active]
 * - Flash gauges even for actors other than the one being input.
 * - The left and right keys are used to switch actors.
 * 
 * For more information, please see below.
 * http://newrpg.seesaa.net/article/477425826.html
 * 
 * <Terms>
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but we will respond to defects as far as possible.
 * 
 * @param noStepForward
 * @type boolean
 * @default true
 * @desc The step forward at the time of command input is canceled. It improves the unnatural motion of "forward, backward, and forward".
 * 
 * @param simpleSpeedCalc
 * @type boolean
 * @default false
 * @desc Simplify the speed calculation. (Cast included)
 * The actors' charge time is simply proportional to their agility.
 * 
 * @param <For Active>
 * 
 * @param chargedActorFlashGauge
 * @parent <For Active>
 * @type boolean
 * @default true
 * @desc Flashes the gauge of all actionable actors.
 * In contrast to the usual, it also covers actors other than the one being inputted.
 * 
 * @param changeActorLR
 * @parent <For Active>
 * @type boolean
 * @default true
 * @desc The left and right keys are used to switch actors.
 * Also, the Cancel key always opens the party command.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.00 タイムプログレス戦闘をカスタマイズします。
 * @author 砂川赳 (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/477425826.html
 *
 * @help タイムプログレス戦闘をカスタマイズします。
 * どちらかというと、アクティブ向けです。
 * 
 * 以下の設定が可能です。
 * ※項目毎にオンオフも可能です。
 * 
 * [共通]
 * ・コマンド入力時の前進を取りやめる
 * ・スピード計算の単純化
 * 
 * [アクティブ向け]
 * ・操作キャラ以外のゲージもフラッシュ
 * ・左右キーで操作キャラ切替
 * 
 * 詳細は以下をご覧ください。
 * http://newrpg.seesaa.net/article/477425826.html
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param noStepForward
 * @text 入力時に前進しない
 * @type boolean
 * @default true
 * @desc コマンド入力時の前進を取りやめます。
 * これにより『前進→後退→前進』の不自然な動作を改善します。
 * 
 * @param simpleSpeedCalc
 * @text スピード計算の単純化
 * @type boolean
 * @default false
 * @desc スピード計算（キャスト含む）を単純化します。
 * 各キャラのチャージ時間を敏捷性に単純比例させます。
 * 
 * @param <For Active>
 * @text ＜アクティブ用＞
 * @desc アクティブモード向けの項目です。
 * 
 * @param chargedActorFlashGauge
 * @text 操作対象以外もゲージ発光
 * @parent <For Active>
 * @type boolean
 * @default true
 * @desc 行動可能な全アクターのゲージをフラッシュさせます。
 * 通常とは異なり、操作キャラ以外も対象とします。
 * 
 * @param changeActorLR
 * @text 左右で操作キャラ切替
 * @parent <For Active>
 * @type boolean
 * @default true
 * @desc 左右で操作キャラを切り替えられるようにします。
 * また、キャンセルキーで常にパーティコマンドを開きます。
 */

(function() {
"use strict";

function toBoolean(str) {
    if (str == true) {
        return true;
    }
    return (str == "true") ? true : false;
}

var parameters = PluginManager.parameters("NRP_TpbCustomize");
var pNoStepForward = toBoolean(parameters["noStepForward"], true);
var pSimpleSpeedCalc = toBoolean(parameters["simpleSpeedCalc"], false);
var pChargedActorFlashGauge = toBoolean(parameters["chargedActorFlashGauge"], true);
var pChangeActorLR = toBoolean(parameters["changeActorLR"], true);

/**
 * 前進禁止
 */
if (pNoStepForward) {
    /**
     * ●アクターの位置調整
     */
    const _Sprite_Actor_updateTargetPosition = Sprite_Actor.prototype.updateTargetPosition;
    Sprite_Actor.prototype.updateTargetPosition = function() {
        if (this._actor.isInputting()) {
            // 通常は前進処理が呼び出されるが、不要なので何もしない
            // this.stepForward();
            return;
        }

        _Sprite_Actor_updateTargetPosition.apply(this, arguments);
    };
}

/**
 * スピード計算の単純化
 */
if (pSimpleSpeedCalc) {
    /**
     * 【上書】TPBスピード計算
     */
    Game_Battler.prototype.tpbSpeed = function() {
        // 最低でも１
        return Math.max(this.agi, 1);
        //return Math.sqrt(this.agi) + 1;
    };

    /**
     * 【上書】基本スピード計算
     * ※補助などの効果を除いた基本値
     */
    Game_Battler.prototype.tpbBaseSpeed = function() {
        const baseAgility = this.paramBasePlus(6);
        // 最低でも１
        return Math.max(baseAgility, 1);
        // return Math.sqrt(baseAgility) + 1;
    };

    /**
     * 【上書】キャスト時間取得
     */
    Game_Battler.prototype.tpbRequiredCastTime = function() {
        const actions = this._actions.filter(action => action.isValid());
        const items = actions.map(action => action.item());
        const delay = items.reduce((r, item) => r + Math.max(0, -item.speed), 0);

        return delay / this.tpbSpeed();
        // return Math.sqrt(delay) / this.tpbSpeed();
    };
}

/**
 * 入力中のアクター以外もゲージ発光
 */
if (pChargedActorFlashGauge) {
    /**
     * ●ゲージのフラッシュ設定
     */
    const _Sprite_Gauge_updateFlashing = Sprite_Gauge.prototype.updateFlashing;
    Sprite_Gauge.prototype.updateFlashing = function() {
        _Sprite_Gauge_updateFlashing.apply(this, arguments);

        // TPB（アクティブ）以外は処理しない。
        if (!BattleManager.isActiveTpb()) {
            return;
        }

        if (this._statusType === "time") {
            if (this._battler.isTpbCharged()) {
                if (this._flashingCount % 30 < 15) {
                    this.setBlendColor(this.flashingColor1());
                } else {
                    this.setBlendColor(this.flashingColor2());
                }
            } else {
                this.setBlendColor([0, 0, 0, 0]);
            }
        }
    };
}

/**
 * 左右で操作キャラ切替
 */
if (pChangeActorLR) {
    /**
     * 【上書】カーソル右：次のアクターへ
     */
    const _Window_ActorCommand_cursorRight = Window_ActorCommand.prototype.cursorRight;
    Window_ActorCommand.prototype.cursorRight = function(wrap) {
        // TPB（アクティブ）以外は処理しない。
        if (!BattleManager.isActiveTpb()) {
            _Window_ActorCommand_cursorRight.apply(this, arguments);
            return;
        }

        const members = $gameParty.battleMembers();
        // 現在のアクター以外で入力可能なアクターがいれば
        if (members.some(m => m != BattleManager.actor() && m.canInput())) {
            // 現在のアクターをキャンセル
            BattleManager.cancelActorInput();
            // 次のアクターへ移動
            BattleManager.changeCurrentActor(true);
            // 入力アクターが取得できない場合
            if (!BattleManager._currentActor) {
                // 先頭のアクターを取得
                BattleManager._currentActor = members.find(m => m.canInput());
                BattleManager.startActorInput();
            }
        }
    };

    /**
     * 【上書】カーソル左：前のアクターへ
     */
    const _Window_ActorCommand_cursorLeft = Window_ActorCommand.prototype.cursorLeft;
    Window_ActorCommand.prototype.cursorLeft = function(wrap) {
        // TPB（アクティブ）以外は処理しない。
        if (!BattleManager.isActiveTpb()) {
            _Window_ActorCommand_cursorLeft.apply(this, arguments);
            return;
        }

        const members = $gameParty.battleMembers();
        // 現在のアクター以外で入力可能なアクターがいれば
        if (members.some(m => m != BattleManager.actor() && m.canInput())) {
            // 現在のアクターをキャンセル
            BattleManager.cancelActorInput();
            // 前のアクターへ移動
            BattleManager.changeCurrentActor(false);
            // 入力アクターが取得できない場合
            if (!BattleManager._currentActor) {
                // 末尾のアクターを取得
                BattleManager._currentActor = members.filter(m => m.canInput()).pop();
                BattleManager.startActorInput();
            }
        }
    };

    /**
     * 【上書】前のアクターへ
     * ※キャンセルを押した時の動作
     * 　実際にはパーティコマンドへ直行
     */
    const _BattleManager_selectPreviousActor = BattleManager.selectPreviousActor;
    BattleManager.selectPreviousActor = function() {
        // TPB（アクティブ）以外は処理しない。
        if (!BattleManager.isActiveTpb()) {
            _BattleManager_selectPreviousActor.apply(this, arguments);
            return;
        }

        /**
         * 【競合対策】existTPB_Extensionが登録されている場合
         */
        var existTPB_Extension =
            PluginManager._scripts.some(scriptName => scriptName == "TPB_Extension");
        // 処理せずあちら（PgUp, PgDnから呼出）に任せる。
        if (existTPB_Extension) {
            _BattleManager_selectPreviousActor.apply(this, arguments);
            return;
        }

        // 入力中のアクターをクリア
        // ※パーティコマンドが呼び出される。
        this._currentActor = null;
    };
}

})();
