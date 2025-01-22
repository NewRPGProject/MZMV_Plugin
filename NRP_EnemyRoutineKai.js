//=============================================================================
// NRP_EnemyRoutineKai.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.11 Improve the enemy's action routine.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/473218336.html
 *
 * @help Improve the enemy's action routine as follows.
 * 
 * - Re-select actions not only at the start of the turn
 *   but also just before the action.
 * - Select the target with the least amount of HP & MP recovery.
 * - Do not use the MP drain skill on an opponent with 0 MP.
 * - Do not overlay already active states.
 * - Do not overlay already limited buffs or debuffs.
 * - Do not heal, cure, or revive if there is no valid target.
 * - If there is only one, the substitution skill is not used.
 * 
 * -------------------------------------------------------------------
 * [Individual Settings]
 * -------------------------------------------------------------------
 * You can also make individual settings
 * by entering the following in the note of the enemy.
 * 
 * - Re-select just before action?  : <RoutineReset:[true or false]>
 * - Pointless action or not?       : <RoutineTest:[true or false]>
 * - Control recovery actions?      : <RoutineRecover:[true or false]>
 * - Condition for HP recovery      : <RoutineIfHp:[condition]>.
 * - Condition for MP recovery      : <RoutineIfMp:[condition]>.
 * - Control MP drain               ：<RoutineMpDrain:[true or false]>
 * - Control revival action?        : <RoutineForDead:[true or false]>
 * - Control the effect for actors? : <RoutineActorEffect:[true or false]>
 * - Control the effect for enemys  : <RoutineEnemyEffect:[true or false]>
 * - Watch for state resistance?    : <RoutineWatchResist:[true or false]>
 * ※The [] is not required. If incorrectly included, it will not work.
 * ※> (greater than mark) cannot be used for the condition.
 * 
 * You can also set the conditions of use
 * by entering the following in the note for the skill.
 * 
 * <RoutineCondition:[condition]>
 * 
 * Example: Perform only if there is an enemy in 10:sleep state.
 * <RoutineCondition:$gameTroop.aliveMembers().some(function(m) {return m.isStateAffected(10)})>
 * 
 * -------------------------------------------------------------------
 * [Notes]
 * -------------------------------------------------------------------
 * - Only recovery type skills can be targeted for recovery control.
 * - Effects such as state are only determined by "none" type skills.
 * - Skills that belong to the HP damage/drain type
 *   are not controlled regardless of their effect.
 * - If a speed compensation skill is selected at the start of a turn,
 *   the action will not be reselected.
 * - Also, when you re-select an action,
 *   you will not select a speed compensation skill.
 * - In the case of "Force Action", if the target is "Random",
 *   the control will also be performed.
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
 * @param <Base Setting>
 * 
 * @param resetAction
 * @parent <Base Setting>
 * @type boolean
 * @default false
 * @desc If ON, it will make another action decision just before the action.
 * The action is determined one at a time, even when there are multiple actions.
 * 
 * @param testApply
 * @parent <Base Setting>
 * @type boolean
 * @default true
 * @desc Execute an action judgment.
 * If ON, you will no longer use ineffective skills.
 * 
 * @param <Heal>
 * 
 * @param controlRecover
 * @parent <Heal>
 * @type boolean
 * @default true
 * @desc If it is on, it controls the recovery skill.
 * 
 * @param ifHpRecover
 * @parent <Heal>
 * @type text
 * @default b.hpRate() < 1.0
 * @desc Set the condition for HP recovery.
 * When someone's HP drops below 100% with "b.hpRate() < 1.0".
 * 
 * @param ifMpRecover
 * @parent <Heal>
 * @type text
 * @default b.mpRate() < 1.0
 * @desc Set the condition for MP recovery.
 * When someone's MP drops below 100% with "b.mpRate() < 1.0".
 * 
 * @param controlForDead
 * @parent <Heal>
 * @type boolean
 * @default true
 * @desc If it's on, it gives you control over skills that target the dead.
 * 
 * @param <MP Drain>
 * 
 * @param controlMpDrain
 * @parent <MP Drain>
 * @type boolean
 * @default true
 * @desc If ON, you control related to MP drain/damage skills.
 * 
 * @param <Effect>
 * 
 * @param controlEnemyEffect
 * @parent <Effect>
 * @type boolean
 * @default true
 * @desc If ON, you control the effect skill for the enemy.
 * (e.g. support states)
 * 
 * @param controlActorEffect
 * @parent <Effect>
 * @type boolean
 * @default true
 * @desc If ON, you control the effect skill for the actor.
 * (e.g. abnormal states)
 * 
 * @param watchResist
 * @parent <Effect>
 * @type boolean
 * @default false
 * @desc If ON, the target's resistance is checked
 * and the invalid state is not used.
 * 
 * @param improveSubstitute
 * @parent <Effect>
 * @type boolean
 * @default true
 * @desc If ON, it will not use skills with substitute state with only one.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.11 敵行動ルーチンを改善します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/473218336.html
 *
 * @help 敵の行動ルーチンを以下の通り改善します。
 * 
 * ・ターン開始時だけでなく行動直前にも行動再選択を行う。
 * ・ＨＰ＆ＭＰ回復時に最も減っている対象を選択する。
 * ・ＭＰが０の相手にＭＰ吸収スキルを使わない。
 * ・既にかかっているステートを重ねがけしない。
 * ・既に限界となっている能力変化を重ねがけしない。
 * ・有効な対象が存在しない場合、回復や治療、蘇生を行わない。
 * ・一人しかいない場合、身代わりスキルを使用しない。
 * 
 * -------------------------------------------------------------------
 * ■個別設定
 * -------------------------------------------------------------------
 * 敵キャラのメモ欄に以下を記入すれば個別設定も可能です。
 * 
 * ・行動直前の再設定を行うか？     ：<RoutineReset:[true or false]>
 * ・無意味な行動をしないか？       ：<RoutineTest:[true or false]>
 * ・回復系行動を制御するか？       ：<RoutineRecover:[true or false]>
 * ・HP回復を行う条件              ：<RoutineIfHp:[condition]>
 * ・MP回復を行う条件              ：<RoutineIfMp:[condition]>
 * ・MP吸収を制御するか？          ：<RoutineMpDrain:[true or false]>
 * ・蘇生系行動を制御するか？       ：<RoutineForDead:[true or false]>
 * ・対アクター使用効果を制御するか？：<RoutineActorEffect:[true or false]>
 * ・対エネミー使用効果を制御するか？：<RoutineEnemyEffect:[true or false]>
 * ・ステート耐性を見るか？         ：<RoutineWatchResist:[true or false]>
 * ※[]は不要です。誤って含めると動きません。
 * ※>（大なり）は条件に使えません。
 * 
 * また、スキルのメモ欄に以下を記入すれば、使用条件を設定できます。
 * 
 * <RoutineCondition:[condition]>
 * 
 * 例：10:睡眠の敵がいる場合のみ実行
 * <RoutineCondition:$gameTroop.aliveMembers().some(function(m) {return m.isStateAffected(10)})>
 * 
 * -------------------------------------------------------------------
 * ■注意点
 * -------------------------------------------------------------------
 * ・回復時の対象制御はタイプが回復系のスキルのみ行います。
 * ・ステートなど使用効果の有効判定は、タイプが『なし』のスキルのみ行います。
 * ・タイプがＨＰダメージ・吸収に該当するスキルは使用効果に依らず制御しません。
 * ・ターン制かつターン開始時に速度補正技が選ばれた場合、行動再選択を行いません。
 * ・また、行動再選択時に速度補正技を選ぶこともありません。
 * ・『戦闘行動の強制』を使用した場合も、対象がランダムだと制御が行われます。
 * 
 * -------------------------------------------------------------------
 * ■利用規約
 * -------------------------------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param <Base Setting>
 * @text ＜基本設定＞
 * @desc 見出しです。
 * 
 * @param resetAction
 * @text 行動直前の再設定
 * @parent <Base Setting>
 * @type boolean
 * @default false
 * @desc ONならば、行動直前にも再度の行動決定を行います。
 * 複数回行動時も一回毎に行動決定を行います。
 * 
 * @param testApply
 * @text 行動判定の実行
 * @parent <Base Setting>
 * @type boolean
 * @default true
 * @desc ONならば効果の得られないスキルは使用しなくなります。
 * 
 * @param <Heal>
 * @text ＜回復関連＞
 * @desc 見出しです。
 * 
 * @param controlRecover
 * @text 回復系行動の制御
 * @parent <Heal>
 * @type boolean
 * @default true
 * @desc ONならば回復系スキルの制御を行います。
 * 
 * @param ifHpRecover
 * @text HP回復行動の条件
 * @parent <Heal>
 * @type text
 * @default b.hpRate() < 1.0
 * @desc 指定した条件でHP回復を行います。
 * 『b.hpRate() < 1.0』で誰かのHPが100%未満になった時です。
 * 
 * @param ifMpRecover
 * @text MP回復行動の条件
 * @parent <Heal>
 * @type text
 * @default b.mpRate() < 1.0
 * @desc MP回復系行動を行う条件を設定します。
 * 『b.mpRate() < 1.0』で誰かのMPが100%未満になった時です。
 * 
 * @param controlForDead
 * @text 蘇生系行動の制御
 * @parent <Heal>
 * @type boolean
 * @default true
 * @desc ONならば戦闘不能者を対象にしたスキルの制御を行います。
 * 
 * @param <MP Drain>
 * @text ＜MP吸収関連＞
 * @desc 見出しです。
 * 
 * @param controlMpDrain
 * @text MP吸収の制御
 * @parent <MP Drain>
 * @type boolean
 * @default true
 * @desc ONならばMP吸収／ダメージスキルに関する制御を行います。
 * 
 * @param <Effect>
 * @text ＜使用効果関連＞
 * @desc 見出しです。
 * 
 * @param controlEnemyEffect
 * @text 対エネミーの使用効果制御
 * @parent <Effect>
 * @type boolean
 * @default true
 * @desc ONならば仲間（エネミー）サイドに対する使用効果系スキルの制御を行います。（支援系ステートなど）
 * 
 * @param controlActorEffect
 * @text 対アクターの使用効果制御
 * @parent <Effect>
 * @type boolean
 * @default true
 * @desc ONならば相手（アクター）サイドに対する使用効果系スキルの制御を行います。（異常系ステートなど）
 * 
 * @param watchResist
 * @text ステート耐性を見るか
 * @parent <Effect>
 * @type boolean
 * @default false
 * @desc ONならば対象の耐性を確認し、無効なステートは使用しません。
 * 
 * @param improveSubstitute
 * @text 身代わりを改善
 * @parent <Effect>
 * @type boolean
 * @default true
 * @desc ONならば一人しかいない状態で身代わりステート付きのスキルを使用しません。
 */
(function() {
"use strict";

function setDefault(str, def) {
    return str ? str : def;
}
function toBoolean(val, def) {
    // 空白なら初期値を返す
    if (val === "" || val === undefined) {
        return def;
    }
    // 文字列ならboolean型に変換して返す
    return val.toLowerCase() == "true";
}

const parameters = PluginManager.parameters("NRP_EnemyRoutineKai");
    
const pResetAction = toBoolean(parameters["resetAction"], true);
const pTestApply = toBoolean(parameters["testApply"], true);

const pControlRecover = toBoolean(parameters["controlRecover"], true);
const pIfHpRecover = setDefault(parameters["ifHpRecover"], "b.hpRate() < 1.0");
const pIfMpRecover = setDefault(parameters["ifMpRecover"], "b.mpRate() < 1.0");
const pControlMpDrain = toBoolean(parameters["controlMpDrain"], true);
const pControlForDead = toBoolean(parameters["controlForDead"], true);

const pControlActorEffect = toBoolean(parameters["controlActorEffect"], true);
const pControlEnemyEffect = toBoolean(parameters["controlEnemyEffect"], true);
const pWatchResist = toBoolean(parameters["watchResist"], true);
const pImproveSubstitute = toBoolean(parameters["improveSubstitute"], true);

/**
 * ●行動再決定を行うか？
 */
function isResetAction(subject) {
    // メモ欄のmeta情報を確認
    var flg = eval(subject.enemy().meta.RoutineReset);
    // 設定がある場合
    if (flg == true || flg == false) {
        return flg;
    }
    // 未定義の場合
    return pResetAction;
}

/**
 * ●行動判定の実行を行うか？
 */
function isTestApply(subject) {
    var flg = eval(subject.enemy().meta.RoutineTest);
    if (flg == true || flg == false) {
        return flg;
    }
    return pTestApply;
}

/**
 * ●回復系行動の制御を行うか？
 */
function isControlRecover(subject) {
    var flg = eval(subject.enemy().meta.RoutineRecover);
    if (flg == true || flg == false) {
        return flg;
    }
    return pControlRecover;
}

/**
 * ●HP回復を行うかを判定する。
 * @param a 行動主体
 * @param b 対象
 */
function isRoutineHpRecover(a, b) {
    var flg = eval(a.enemy().meta.RoutineIfHp);
    if (flg == true || flg == false) {
        return flg;
    }
    return eval(pIfHpRecover);
}

/**
 * ●MP回復を行うかを判定する。
 * @param a 行動主体
 * @param b 対象
 */
function isRoutineMpRecover(a, b) {
    var flg = eval(a.enemy().meta.RoutineIfMp);
    if (flg == true || flg == false) {
        return flg;
    }
    return eval(pIfMpRecover);
}

/**
 * ●MP吸収制御を行うかを判定する。
 */
 function isControlMpDrain(subject) {
    var flg = eval(subject.enemy().meta.RoutineMpDrain);
    if (flg == true || flg == false) {
        return flg;
    }
    return pControlMpDrain;
}

/**
 * ●蘇生系行動の制御を行うか？
 */
function isControlForDead(subject) {
    var flg = eval(subject.enemy().meta.RoutineForDead);
    if (flg == true || flg == false) {
        return flg;
    }
    return pControlForDead;
}

/**
 * ●対エネミーの使用効果制御を行うか？
 */
function isControlEnemyEffect(subject) {
    var flg = eval(subject.enemy().meta.RoutineEnemyEffect);
    if (flg == true || flg == false) {
        return flg;
    }
    return pControlEnemyEffect;
}

/**
 * ●対アクターの使用効果制御を行うか？
 */
function isControlActorEffect(subject) {
    var flg = eval(subject.enemy().meta.RoutineActorEffect);
    if (flg == true || flg == false) {
        return flg;
    }
    return pControlActorEffect;
}

/**
 * ●無効なステートを使用しないか？
 */
function isRoutineWatchResist(subject) {
    var flg = eval(subject.enemy().meta.RoutineWatchResist);
    if (flg == true || flg == false) {
        return flg;
    }
    return pWatchResist;
}

/**
 * ●速度補正技の除外処理を行うか？
 */
function isSpeedException(action) {
    // CTB, CTTB,なら速度補正の意味が異なるので除外しない
    // _cttbCountの有無で判定
    if (BattleManager._cttbCount || BattleManager._isCttb || BattleManager._isCtb) {
        return false;

    // MZのTPBも同じく除外
    } else if (Utils.RPGMAKER_NAME == "MZ" && BattleManager.isTpb()) {
        return false;
    }

    // 以下はターン制
    // 速度補正技なので除外する
    if (action.item().speed != 0) {
        return true;
    }
    return false;
}

/**
 * ●ターン開始入力
 */
var _BattleManager_startInput = BattleManager.startInput;
BattleManager.startInput = function() {
    // 行動確定前にフラグ初期化
    clearFirstActionDone();

    _BattleManager_startInput.apply(this, arguments);
};

/**
 * ●ＴＰＢのアクション生成
 */
const _Game_Battler_makeTpbActions = Game_Battler.prototype.makeTpbActions;
Game_Battler.prototype.makeTpbActions = function() {
    // TPBではstartInputを通らないためこちらでクリア
    // 行動確定前にフラグ初期化
    clearFirstActionDone();

    _Game_Battler_makeTpbActions.apply(this, arguments);
};

/**
 * ●行動確定前にフラグ初期化
 */
function clearFirstActionDone() {
    for (let enemy of $gameTroop.members()) {
        enemy._firstActionDone = undefined;
    }
}

// 行動再設定を判定するフラグ
let mResetActionFlg = false;

/**
 * ●戦闘行動の処理
 */
const _BattleManager_processTurn = BattleManager.processTurn;
BattleManager.processTurn = function() {
    const subject = this._subject;

    // 敵の場合、行動直前の再設定を実行
    if (subject.isEnemy() && isResetAction(subject)) {
        const action = subject.currentAction();
        // 行動前のタイミングでアクション再設定
        if (action) {
            // ただし、速度補正技は除く
            if (!action.item() || !isSpeedException(action)) {
                mResetActionFlg = true;
                subject.makeActions();
                mResetActionFlg = false;
            }

            // 既に一度行動した。
            subject._firstActionDone = true;
        }
    }

    // 元処理実行
    _BattleManager_processTurn.apply(this);
};

/**
 * ●アクション生成
 */
const _Game_Enemy_makeActions = Game_Enemy.prototype.makeActions;
Game_Enemy.prototype.makeActions = function() {
    // クリアする前に行動回数を保持しておく。
    // 下のmakeActionTimesに使うだけの使い捨て
    this._keepActionTimes = this._actions.length;

    _Game_Enemy_makeActions.apply(this, arguments);
};

/**
 * メソッドが未定義の場合は事前に定義
 * ※これをしておかないと以後の親クラスへの追記が反映されない。
 **/
if (Game_Enemy.prototype.makeActionTimes == Game_Battler.prototype.makeActionTimes) {
    Game_Enemy.prototype.makeActionTimes = function() {
        return Game_Battler.prototype.makeActionTimes.apply(this, arguments);
    }
}

/**
 * ●行動回数計算
 */
const _Game_Enemy_makeActionTimes = Game_Enemy.prototype.makeActionTimes;
Game_Enemy.prototype.makeActionTimes = function() {
    // 既に一度行動済の場合は、行動回数を加算しない。
    if (this._firstActionDone) {
        // 現在の残り行動回数をそのまま取得
        return this._keepActionTimes;
    }
    return _Game_Enemy_makeActionTimes.apply(this, arguments);
};

/**
 * ●敵のターン参照
 */
const _Game_Troop_turnCount = Game_Troop.prototype.turnCount;
Game_Troop.prototype.turnCount = function() {
    let turnCount = _Game_Troop_turnCount.apply(this);

    // 行動再設定時はターン-1
    // そうしないとターン最初の行動決定と条件が一致しない
    if (mResetActionFlg) {
        turnCount -= 1;
    }
    return turnCount;
};

/**
 * ●仲間への対象選択
 */
var _Game_Action_targetsForFriends = Game_Action.prototype.targetsForFriends;
Game_Action.prototype.targetsForFriends = function() {
    var subject = this.subject();

    /*
     * 以下の条件を全て満たす場合が対象
     * ・行動主体が敵
     * ・死亡者向けではない
     * ・対象が使用者ではない
     * ・単体が対象
     * ・対象がランダム（敵の単体対象は原則ランダム扱い）
     * ・ダメージ・吸収ではない
     */
    if (subject.isEnemy() && !this.isForDeadFriend() && !this.isForUser() && this.isForOne()
            && this._targetIndex < 0 && !this.isDamage() && !this.isDrain()) {
        var targets = [];
        var target;
        var unit = this.friendsUnit();

        // 回復制御を行う場合
        if (isControlRecover(subject)) {
            // HP回復の場合
            if (this.isHpRecover()) {
                // HPが最も減っている対象を選択
                target = unit.aliveMembers().reduce(function(a, b) {
                    return a.hpRate() < b.hpRate() ? a : b;
                });
                targets.push(target);
                return targets;

            // MP回復の場合
            } else if (this.isMpRecover()) {
                // MPが最も減っている対象を選択
                target = unit.aliveMembers().reduce(function(a, b) {
                    return a.mpRate() < b.mpRate() ? a : b;
                });
                targets.push(target);
                return targets;
            }
        }

        // ダメージタイプがなしで、かつ使用効果がある場合
        if (this.checkDamageType([0]) && this.item().effects.length > 0) {
            // 効果のある対象だけに候補を絞る
            const filterTargets = unit.aliveMembers().filter(function(m) {
                return this.testApplyEnemy(m);
            }, this);

            // 有効な対象が存在する場合
            if (filterTargets.length > 0) {
                // 絞った候補からさらにランダムで選択する。
                targets.push(randomTargetFilter(filterTargets));
                return targets;
            }
        }
    }

    // 条件を満たさない場合は元処理実行
    return _Game_Action_targetsForFriends.apply(this);
};

/**
 * ●相手サイドへの対象選択
 */
var _Game_Action_targetsForOpponents = Game_Action.prototype.targetsForOpponents;
Game_Action.prototype.targetsForOpponents = function() {
    var subject = this.subject();

    /*
     * 以下の条件を全て満たす場合が対象
     * ・行動主体が敵
     * ・単体が対象
     * ・対象がランダム（敵の単体対象は原則ランダム扱い）
     */
    if (subject.isEnemy() && this.isForOne() && this._targetIndex < 0) {
        // 制御対象かどうかの判定
        let controlFlg = false;

        /*
         * ・ダメージタイプがなし
         * ・使用効果が存在する
         */
        if (this.checkDamageType([0]) && this.item().effects.length > 0) {
            controlFlg = true;

        /*
         * ・ダメージタイプがＭＰダメージ／ＭＰ吸収
         */
        } else if (this.isMpEffect() && (this.isDamage() || this.isDrain())) {
            controlFlg = true;
        }

        // 制御対象として処理する。
        if (controlFlg) {
            const targets = [];
            const unit = this.opponentsUnit();

            // 効果のある対象だけに候補を絞る
            const filterTargets = unit.aliveMembers().filter(function(m) {
                return this.testApplyEnemy(m);
            }, this);

            // 有効な対象が存在する場合
            if (filterTargets.length > 0) {
                // 絞った候補からさらにランダムで選択する。
                targets.push(randomTargetFilter(filterTargets));
                return targets;
            }
        }
    }

    // 条件を満たさない場合は元処理実行
    return _Game_Action_targetsForOpponents.apply(this);
};

/**
 * 【独自定義】指定した対象集団の狙われ率合計を求める。
 */
function tgrSumFilter(targets) {
    return targets.reduce(function(r, member) {
        return r + member.tgr;
    }, 0);
}

/**
 * 【独自定義】指定した対象集団から狙われ率に従ってランダムで選択する。
 */
function randomTargetFilter(targets) {
    var tgrRand = Math.random() * tgrSumFilter(targets);
    var target = null;
    targets.forEach(function(member) {
        tgrRand -= member.tgr;
        if (tgrRand <= 0 && !target) {
            target = member;
        }
    });
    return target;
}

/**
 * ●敵の行動有効判定
 * ここで無効にした行動は取らない。
 */
var Game_Enemy_isActionValid = Game_Enemy.prototype.isActionValid;
Game_Enemy.prototype.isActionValid = function(action) {
    // 元処理実行（通常の使用条件判定）
    var ret = Game_Enemy_isActionValid.apply(this, arguments);
    // 使用不可なら、そこで終了
    if (ret == false) {
        return ret;
    }

    // 行動判定の実行を行う場合のみ
    if (isTestApply(this)) {
        // 引数のactionはJSONのパラメータそのままなので、
        // Game_Actionに変換する。
        const gameAction = new Game_Action(this);
        gameAction.setSkill(action.skillId);

        // スキルの独自条件がある場合、かつ条件を満たさない場合
        const skill = gameAction.item();
        const routineCondition = skill.meta.RoutineCondition;
        if (routineCondition && !eval(routineCondition)) {
            return false;
        }

        // 既にターン実行中ならば、速度補正技は使用候補から外す。
        if (isResetAction(this) && BattleManager.isInTurn()) {
            if (gameAction.item() && isSpeedException(gameAction)) {
                return false;
            }
        }

        // 使用者が対象
        if (gameAction.isForUser()) {
            // 効果が無効ならば、使用候補から外す。
            if (!gameAction.testApplyEnemy(this)) {
                return false;
            }
            
        // それ以外
        } else {
            // 対象がアクター向けかつ全員無効ならば、使用候補から外す。
            if (gameAction.isForOpponent()
                    && $gameParty.members().every(function(m){return !gameAction.testApplyEnemy(m);})) {
                return false;

            // 対象がエネミー向けかつ全員無効ならば、使用候補から外す。
            } else if (gameAction.isForFriend()
                    && $gameTroop.members().every(function(m){return !gameAction.testApplyEnemy(m);})) {
                return false;
            }
        }
    }

    // 使用可能と認定
    return true;
};

/**
 * 【独自】敵行動の有効判定
 * ここでtrueを返した場合に使用可能な行動となる。
 */
Game_Action.prototype.testApplyEnemy = function(target) {
    const subject = this.subject();

    // 対象が戦闘不能の仲間向け
    if (this.isForDeadFriend()) {
        // 蘇生制御を行わない場合は常に有効
        if (!isControlForDead(subject)) {
            return true;
        }
        // 対象が戦闘不能なら有効
        if (target.isDead()) {
            return true;
        }
        // それ以外は無効
        return false;

    // それ以外で対象が戦闘不能（逃走も含む）なら無効
    } else if (!target.isAlive()) {
        return false;
    }

    // ダメージまたは吸収
    if (this.isDamage() || this.isDrain()) {
        // ＭＰダメージ／吸収制御を行う場合、
        // ＭＰ効果の場合、対象のＭＰが０なら無効
        if (isControlMpDrain(subject) && this.isMpEffect() && target.mp == 0) {
            return false;
        }
        
        // それ以外は有効
        return true;

    // 回復系の場合
    } else if (this.isRecover()) {
        // 回復制御を行わない場合は常に有効
        if (!isControlRecover(subject)) {
            return true;
        }

        // 効果がHP回復、かつ対象のHPが減っている。
        if (this.isHpRecover() && isRoutineHpRecover(subject, target)) {
            // 回復に耐性があるなら無効
            if (this.calcElementRate(target) <= 0) {
                return false;
            }

            return true;
        // 効果がMP回復、かつ対象のMPが減っている。
        } else if (this.isMpRecover() && isRoutineMpRecover(subject, target)) {
            return true;
        }

    // ダメージタイプがなし
    } else if (this.checkDamageType([0])) {
        // 対象がアクター、かつ使用効果制御を行わない場合は有効
        if (target.isActor() && !isControlActorEffect(subject)) {
            return true;
        // 対象がエネミー、かつ使用効果制御を行わない場合は有効
        } else if (target.isEnemy() && !isControlEnemyEffect(subject)) {
            return true;
        }

        // 使用効果が空（様子を見るなどの何もしない行動）なら有効
        if (this.item().effects.length == 0) {
            return true;
        // 何らかの使用効果が得られるなら有効
        } else if (this.hasItemAnyValidEffects(target)) {
            // ただし、身代わりスキルの場合
            if (pImproveSubstitute && this.isForFriend() && this.isSubstituteSkill()) {
                // 人数が一人だと無効
                if (this.friendsUnit().aliveMembers().length == 1) {
                    return false;
                }
            }
            // それ以外は有効
            return true;
        }
    }

    // それ以外は無効と判定
    return false;
};

/**
 * ●使用効果を得られるか？
 */
var _Game_Action_testItemEffect = Game_Action.prototype.testItemEffect;
Game_Action.prototype.testItemEffect = function(target, effect) {
    // 敵限定
    if (this.subject().isEnemy()) {
        // ステート追加の場合のみ、無効かどうかを判定
        switch (effect.code) {
        case Game_Action.EFFECT_ADD_STATE:
            // 対象の耐性を参照する。
            if (isRoutineWatchResist(this.subject())) {
                // 対象がステート無効である。
                if (target.isStateResist(effect.dataId)) {
                    return false;
                }

                // 行動が必中ではない場合
                if (!this.isCertainHit()) {
                    let stateRate = target.stateRate(effect.dataId);

                    // ステート付加率の指定がある場合
                    // ※NRP_SkillEX.jsと併用時
                    const metaStateRate = this.item().meta.StateRate;
                    if (metaStateRate != null) {
                        // eval計算用
                        const a = this.subject();
                        const b = target;
                        // ステート付加率を書き換え
                        stateRate = eval(metaStateRate) / 100;
                    }

                    // ステート成功率が０以下ならば無効
                    if (stateRate <= 0) {
                        return false;
                    }
                }
            }
        }
    }

    // 元処理実行
    return _Game_Action_testItemEffect.apply(this, arguments);
};

/**
 * 【独自】身代わりスキルかどうか？
 */
Game_Action.prototype.isSubstituteSkill = function() {
    // 使用効果に身代わりステートがあるか確認
    return this.item().effects.some(effect => isEffectSubstitute(effect));
};

/**
 * ●使用効果が身代わりかどうか？
 */
function isEffectSubstitute(effect) {
    // ステート付加である
    if (effect.code == Game_Action.EFFECT_ADD_STATE) {
        // さらにステート情報を確認
        const dataState = $dataStates[effect.dataId];
        if (!dataState) {
            return false;
        }
        // 特徴が特殊フラグかつ身代わりである。
        if (dataState.traits.some(trait => trait.code == Game_BattlerBase.TRAIT_SPECIAL_FLAG
                && trait.dataId == Game_BattlerBase.FLAG_ID_SUBSTITUTE)) {
            return true;
        }
    }
    return false;
}

/**
 * ●エネミーに対する戦闘行動の強制
 */
const Game_Enemy_forceAction = Game_Enemy.prototype.forceAction;
Game_Enemy.prototype.forceAction = function(skillId, targetIndex) {
    // 対象が-1（ランダム）の場合、decideRandomTarget()を経由せず、
    // そのまま返すように修正。
    // ここで確定してしまうと対象の補正を行えなくなる。
    if (targetIndex === -1) {
        this.clearActions();
        var action = new Game_Action(this, true);
        action.setSkill(skillId);
        action.setTarget(targetIndex);
        this._actions.push(action);
        return;
    }

    // 元処理実行
    Game_Enemy_forceAction.apply(this, arguments);
};

})();
