//=============================================================================
// NRP_DynamicReturningAction.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.002 Action during the return of DynamicMotion
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @base NRP_DynamicMotionMZ
 * @url https://newrpg.seesaa.net/article/499269749.html
 *
 * @help Even during the return action by DynamicMotion,
 * the next action should be executed.
 * Recommended for those who want to make battle as speedy as possible.
 * 
 * Note that if the returning battler becomes the target
 * and user of the skill, the wait is executed
 * until the battler returns.
 * This is to avoid unnatural behavior.
 * 
 * Due to the specification, it is difficult to realize the effect
 * if the battle is not combined with NRP_DamageTiming.js
 * and others to speed up the battle.
 * For the same reason, it does not work well with message display.
 * 
 * -------------------------------------------------------------------
 * [Note of Skill]
 * -------------------------------------------------------------------
 * <ReturningWait>
 * Wait for the battler's return while performing the skill.
 * This can be used to emphasize special skills, etc.
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
 * @param WaitIfTarget
 * @type boolean
 * @default true
 * @desc Wait for the returning battler when he is the target of a skill.
 * 
 * @param WaitIfUser
 * @type boolean
 * @default true
 * @desc Wait for the returning battler when he becomes the user of the skill.
 * 
 * @param KeepReturningMotion
 * @type boolean
 * @default true
 * @desc Maintains motion during return and disables motion upon command input.
 * 
 * @param WaitBattleEnd
 * @type boolean
 * @default true
 * @desc Wait for the return of the battler at the end of battle.
 * 
 * @param WaitTurnEnd
 * @type boolean
 * @default false
 * @desc Wait for the return of the battler at the end of turn.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.002 DynamicMotionの帰還中に行動
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @base NRP_DynamicMotionMZ
 * @url https://newrpg.seesaa.net/article/499269749.html
 *
 * @help DynamicMotionの帰還動作中にも
 * 次の行動を実行できるようにします。
 * 戦闘をとことんスピーディにしたい方にオススメです。
 * 
 * なお、不自然な挙動を避けるため帰還中のバトラーが
 * スキルの対象者および使用者になった場合は、
 * 帰還するまでウェイトを実行します。
 * 
 * 仕様上、NRP_DamageTiming.js（ダメージタイミングの調整）などと
 * 組み合わせて戦闘を高速化していないと効果が実感しづらいです。
 * 同様の理由でメッセージ表示との相性もよくありません。
 * 
 * -------------------------------------------------------------------
 * ■スキルのメモ欄
 * -------------------------------------------------------------------
 * <ReturningWait>
 * スキル実行中にバトラーの帰還を待つようになります。
 * 大技などを強調したい場合にどうぞ。
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
 * @param WaitIfTarget
 * @text 対象ならウェイト
 * @type boolean
 * @default true
 * @desc 帰還中のバトラーがスキルの対象となった際、ウェイトを実行します。
 * 
 * @param WaitIfUser
 * @text 使用者ならウェイト
 * @type boolean
 * @default true
 * @desc 帰還中のバトラーがスキルの使用者となった際、ウェイトを実行します。
 * 
 * @param KeepReturningMotion
 * @text 帰還中はモーション維持
 * @type boolean
 * @default true
 * @desc 帰還中はモーションを維持し、コマンド入力時のモーションを無効化します。
 * 
 * @param WaitBattleEnd
 * @text 戦闘終了時はウェイト
 * @type boolean
 * @default true
 * @desc 戦闘終了時にバトラーの帰還を待ちます。
 * 
 * @param WaitTurnEnd
 * @text ターン終了時はウェイト
 * @type boolean
 * @default false
 * @desc ターン終了時にバトラーの帰還を待ちます。
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

const PLUGIN_NAME = "NRP_DynamicReturningAction";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pWaitIfTarget = toBoolean(parameters["WaitIfTarget"]);
const pWaitIfUser = toBoolean(parameters["WaitIfUser"]);
const pKeepReturningMotion = toBoolean(parameters["KeepReturningMotion"]);
const pWaitBattleEnd = toBoolean(parameters["WaitBattleEnd"]);
const pWaitTurnEnd = toBoolean(parameters["WaitTurnEnd"]);

// ----------------------------------------------------------------------------
// 共通変数
// ----------------------------------------------------------------------------

// 帰還中のバトラー
let mReturningBattlers = [];
// 前進中のアクター
let mStepForwardActor = null;

// ----------------------------------------------------------------------------
// BattleManager
// ----------------------------------------------------------------------------

/**
 * ●初期化
 */
const _BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
    _BattleManager_initMembers.apply(this, arguments);

    // 帰還中のバトラーを初期化
    mReturningBattlers = [];
    // 前進中のアクターを初期化
    mStepForwardActor = null;
}

/**
 * ●アクション結果処理
 */
const _BattleManager_invokeAction = BattleManager.invokeAction;
BattleManager.invokeAction = function(subject, target) {
    _BattleManager_invokeAction.apply(this, arguments);

    // 次の対象が存在する場合はアクションが続いているのでそのまま
    if (this._targets[0]) {
        return;
    }

    // 対象がなくなったら、アクションが終了と判断
    // 行動主体のスプライトを取得
    const sprite = getBattlerSprite(this._subject);
    // スプライトが既に定位置にいる場合は処理しない。
    if (sprite._offsetX == 0 && sprite._offsetY == 0) {
        return;
    }

    // 帰還中のバトラーを追加
    mReturningBattlers.push(this._subject);
};

// ----------------------------------------------------------------------------
// Sprite
// ----------------------------------------------------------------------------

/**
 * ●DynamicMotion用の移動終了
 */
const _Sprite_onDynamicMoveEnd = Sprite.prototype.onDynamicMoveEnd;
Sprite.prototype.onDynamicMoveEnd = function() {
    _Sprite_onDynamicMoveEnd.apply(this, arguments);

    // バトラーでない場合は終了
    if (!this._battler) {
        return;
    }

    // 移動が終了かつ帰還中のバトラーが存在する場合
    if (this._offsetX == 0 && this._offsetY == 0 && mReturningBattlers) {
        // 配列から除去する。
        mReturningBattlers = mReturningBattlers.filter(battler => battler != this._battler);
    }
};

// ----------------------------------------------------------------------------
// Sprite_Battler
// ----------------------------------------------------------------------------

/**
 * ●移動終了時
 */
const _Sprite_Battler_onMoveEnd = Sprite_Battler.prototype.onMoveEnd;
Sprite_Battler.prototype.onMoveEnd = function() {
    _Sprite_Battler_onMoveEnd.apply(this, arguments);

    // 移動が終了かつ帰還中のバトラーが存在する場合
    if (this._offsetX == 0 && this._offsetY == 0 && mReturningBattlers) {
        // 配列から除去する。
        mReturningBattlers = mReturningBattlers.filter(battler => battler != this._battler);
    }
};

/**
 * ●モーション実行中の判定。
 * ※DynamicMotionの関数
 */
const _Sprite_Battler_isMotionPlaying = Sprite_Battler.prototype.isMotionPlaying;
Sprite_Battler.prototype.isMotionPlaying = function() {
    // アクション可能の場合は除外
    if (this.canReturningAction()) {
        return false;
    }
    return _Sprite_Battler_isMotionPlaying.apply(this, arguments);
};

/**
 * 【独自】帰還中かどうかの判定。
 */
Sprite_Battler.prototype.isReturning = function() {
    // 帰還中のバトラーが存在する場合
    if (mReturningBattlers && mReturningBattlers.length) {
        // 帰還中のバトラーに含まれるなら
        return mReturningBattlers.includes(this._battler);
    }
    return false;
};

/**
 * 【独自】帰還中のアクションができるかどうかの判定。
 */
Sprite_Battler.prototype.canReturningAction = function() {
    // バトラーが帰還中でない場合
    if (!this.isReturning()) {
        // アクション可能
        return true;
    }

    // ターン終了時はウェイト
    if (pWaitTurnEnd && BattleManager.isTurnEnd()) {
        return false;
    }

    // 戦闘終了時はウェイト
    if (pWaitBattleEnd) {
        // アクション終了後
        if (BattleManager.isInTurn() ){
            // ※決着後もここに入ってくるケースがあるので独自に判定

            // 逃走、中断判定
            // ※$gameParty.isEscaped()はＭＺのみ
            if ($gameParty.isEscaped) {
                if ($gameParty.isEscaped()) {
                    return false;
                }
            // こちらはＭＶを想定
            } else if ($gameParty.isEmpty() || BattleManager.isAborting() || BattleManager._escaped) {
                return false;
            }
            
            // 勝利・全滅判定
            if ($gameParty.isAllDead() || $gameTroop.isAllDead()) {
                return false;
            }

        // 戦闘終了時
        } else if (BattleManager.isBattleEnd()) {
            return false;
        }
    }

    // 対象スキルがウェイト対象ならウェイト
    if (BattleManager._action) {
        const item = BattleManager._action.item();
        if (item.meta.ReturningWait) {
            return false;
        }
    }

    const targets = BattleManager._targets;
    // 対象が存在する場合
    // ※つまり、帰還中に次のアクションが実行された。
    if (targets && targets.length) {
        // 対象になった場合はウェイトする。
        if (pWaitIfTarget) {
            if (targets.some(target => target == this._battler)) {
                return false;
            }
        }
        // 行動主体になった場合はウェイトする。
        if (pWaitIfUser) {
            if (this._battler == BattleManager._subject) {
                return false;
            }
        }
    }

    // それ以外はアクション可能
    return true;
};

// ----------------------------------------------------------------------------
// Sprite_Actor
// ----------------------------------------------------------------------------

/**
 * ●前進
 */
const _Sprite_Actor_stepForward = Sprite_Actor.prototype.stepForward;
Sprite_Actor.prototype.stepForward = function() {
    // 前進中のアクターを保持
    mStepForwardActor = this;
    _Sprite_Actor_stepForward.apply(this, arguments);
};

/**
 * ●移動終了
 */
const _Sprite_Actor_onMoveEnd = Sprite_Actor.prototype.onMoveEnd;
Sprite_Actor.prototype.onMoveEnd = function() {
    // 移動終了ならクリア
    if (mStepForwardActor == this) {
        mStepForwardActor = null;
    }
    _Sprite_Actor_onMoveEnd.apply(this, arguments);
};

/**
 * ●帰還中のモーションを維持する場合
 */
if (pKeepReturningMotion) {
    /**
     * ●モーションの更新
     */
    const _Sprite_Actor_refreshMotion = Sprite_Actor.prototype.refreshMotion;
    Sprite_Actor.prototype.refreshMotion = function() {
        const actor = this._actor;
        if (actor) {
            // 帰還中の場合は除外
            if (this.isReturning()) {
                return;
            }
        }

        _Sprite_Actor_refreshMotion.apply(this, arguments);
    };
}

// ----------------------------------------------------------------------------
// Spriteset_Battle
// ----------------------------------------------------------------------------

/**
 * 【上書】移動中判定
 */
const _Spriteset_Battle_isAnyoneMoving = Spriteset_Battle.prototype.isAnyoneMoving;
Spriteset_Battle.prototype.isAnyoneMoving = function() {
    // 戦闘開始時および前進時は移動を待つ。
    if (BattleManager._phase == "start" || mStepForwardActor) {
        return _Spriteset_Battle_isAnyoneMoving.apply(this, arguments);
    }
    // 帰還中は除外する。
    return this.battlerSprites().some(sprite => !sprite.canReturningAction() && sprite.isMoving());
};

// ----------------------------------------------------------------------------
// 共通関数
// ----------------------------------------------------------------------------

/**
 * ●指定したバトラーのスプライトを取得する。
 */
function getBattlerSprite(battler) {
    if (!battler) {
        return undefined;
    }

    const spriteset = getSpriteset();
    const sprites = spriteset.battlerSprites();
    // 一致があれば返す
    return sprites.find(s => s._battler == battler);
}

/**
 * ●現在の画面のSpritesetを取得する。
 */
function getSpriteset() {
    return SceneManager._scene._spriteset;
}

})();
