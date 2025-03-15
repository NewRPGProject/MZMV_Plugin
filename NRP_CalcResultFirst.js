//=============================================================================
// NRP_CalcResultFirst.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.00 Perform the result calculation for the skill first.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @orderBefore NRP_TraitsPlus
 * @orderBefore NRP_TraitsEX
 * @url https://newrpg.seesaa.net/article/511767481.html
 *
 * @help Skill result calculations are performed prior to animation.
 * This allows for the following processing
 * 
 * - Multiple attacks with random range are not wasted.
 * - DynamicAnimation&Motion can be used to determine
 *   whether or not a hit has been made.
 * 
 * -------------------------------------------------------------------
 * [For DynamicAnimation & Motion]
 * -------------------------------------------------------------------
 * ◆Judgment of Success
 * From NRP_DynamicAnimationMZ.js and NRP_DynamicMotionMZ.js,
 * the following scripts can be called to determine the success.
 * 
 * BattleManager.isReservedSuccess(targetNo)
 * 
 * ◆Example: Show animation only when success.
 * <D-Animation>
 * condition = BattleManager.isReservedSuccess(targetNo)
 * </D-Animation>
 * 
 * ※If it is a one-hit, single skill, targetNo can be omitted.
 * Incidentally, “targetNo” refers to
 * how many attacks the current animation is.
 * You can specify a number, but if you specify the string “targetNo”
 * as it is, it should be fine most of the time.
 * 
 * ◆Obtaining Calculation Results
 * You can get the result of damage calculation with the following script.
 * The content is an object of type Game_ActionResult.
 * 
 * BattleManager.reservedResult(targetNo)
 * 
 * ◆Example: Animation is performed only if damage > 0
 * <D-Animation>
 * condition = BattleManager.reservedResult(targetNo).hpDamage > 0
 * </D-Animation>
 * 
 * -------------------------------------------------------------------
 * [Notice]
 * -------------------------------------------------------------------
 * Please place this plugin as far above the plugin list as possible.
 * Please be aware of conflicts,
 * especially since it overwrites the following functions.
 * Must be placed above the plugin
 * to be appended to the function in question.
 * 
 * - Game_Action.prototype.apply
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
 * @param CorrectRandomTarget
 * @type boolean
 * @default false
 * @desc If a target is defeated by a skill with a random range, subsequent targets are modified to survivors.
 * 
 * @param StateResistToFailure
 * @type boolean
 * @default false
 * @desc If the state is resisted, it is treated as a failure and is not judged success.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.00 スキルの結果計算を演出より先に実行する。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @orderBefore NRP_TraitsPlus
 * @orderBefore NRP_TraitsEX
 * @url https://newrpg.seesaa.net/article/511767481.html
 *
 * @help スキルの結果計算を演出より先に実行します。
 * これにより、以下のような処理が可能になります。
 * 
 * ・対象がランダムな複数回攻撃の無駄打ちを停止。
 * ・DynamicAnimation&Motionにて、命中の有無を判定可能に。
 * 
 * -------------------------------------------------------------------
 * ■DynamicAnimation & Motion
 * -------------------------------------------------------------------
 * ◆成功判定
 * NRP_DynamicAnimationMZ.jsおよびNRP_DynamicMotionMZ.jsから、
 * 以下のスクリプトを呼び出すことで成功判定を使用できます。
 * 
 * BattleManager.isReservedSuccess(targetNo)
 * 
 * ◆例：成功時のみアニメーションを実行
 * <D-Animation>
 * condition = BattleManager.isReservedSuccess(targetNo)
 * </D-Animation>
 * 
 * ※１ヒットの単体スキルならtargetNoは省略可
 * ちなみに『targetNo』は現在のアニメーションが何番目の攻撃かを指しています。
 * 数字を指定しても構いませんが、
 * そのまま『targetNo』の文字列を指定しておけば、大抵は問題ないはずです。
 * 
 * ◆計算結果の取得
 * 以下のスクリプトでダメージ計算の結果を取得できます。
 * 中身はGame_ActionResult型のオブジェクトです。
 * 
 * BattleManager.reservedResult(targetNo)
 * 
 * ◆例：ダメージ > 0 の場合のみアニメーションを実行
 * <D-Animation>
 * condition = BattleManager.reservedResult(targetNo).hpDamage > 0
 * </D-Animation>
 * 
 * -------------------------------------------------------------------
 * ■注意点
 * -------------------------------------------------------------------
 * このプラグインはなるべくプラグイン一覧の上側に配置してください。
 * 特に以下の関数を上書きしていますので、競合にご注意ください。
 * 該当の関数に追記するプラグインより上に配置する必要があります。
 * 
 * Game_Action.prototype.apply
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
 * @param CorrectRandomTarget
 * @text ランダム対象を修正
 * @type boolean
 * @default false
 * @desc 範囲がランダムのスキルで対象を撃破できた場合は、対象を生存者へと修正します。
 * 
 * @param StateResistToFailure
 * @text ステート無効は失敗
 * @type boolean
 * @default false
 * @desc ステートが無効な場合は失敗として扱い、成功判定しません。
 * 
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
function setDefault(str, def) {
    if (str == undefined || str == "") {
        return def;
    }
    return str;
}

const PLUGIN_NAME = "NRP_calcResultFirst";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pCorrectRandomTarget = toBoolean(parameters["CorrectRandomTarget"]);
const pStateResistToFailure = toBoolean(parameters["StateResistToFailure"]);

//-----------------------------------------------------------------------------
// BattleManager
//-----------------------------------------------------------------------------

/**
 * 【独自】予測結果をクリアする。
 */
BattleManager.clearReservedResults = function() {
    this._reservedResults = [];
};

/**
 * 【独自】命中予定かどうかの判定。
 */
BattleManager.isReservedHit = function(targetNo = 0) {
    const result = this._reservedResults[targetNo];
    // 取得できない場合はとりあえず命中扱い
    if (!result) {
        return true;
    }
    return result.isHit();
};

/**
 * 【独自】成功予定かどうかの判定。
 */
BattleManager.isReservedSuccess = function(targetNo = 0) {
    const result = this._reservedResults[targetNo];
    // 取得できない場合はとりあえず成功扱い
    if (!result) {
        return true;
    }
    return result.success;
};

/**
 * 【独自】予測結果（配列）を取得する。
 */
BattleManager.reservedResults = function() {
    return this._reservedResults;
};

/**
 * 【独自】予測結果を取得する。
 */
BattleManager.reservedResult = function(targetNo = 0) {
    return this._reservedResults[targetNo];
};

/**
 * 【独自】予測結果を格納する。
 */
BattleManager.pushReservedResults = function(result) {
    this._reservedResults.push(result);
};

//-----------------------------------------------------------------------------
// Game_Action
//-----------------------------------------------------------------------------

// 予約フラグ
let mReservedResult = false;

/**
 * ●スキルの対象決定
 * ※この段階で対象毎のダメージ計算を行う。
 */
const _Game_Action_makeTargets = Game_Action.prototype.makeTargets;
Game_Action.prototype.makeTargets = function() {
    // 予約結果をクリア
    BattleManager.clearReservedResults();
    BattleManager._action = this;

    let targets = _Game_Action_makeTargets.apply(this, arguments);

    // かばう判定は先に実行する。
    // ※NRP_Substitute.jsとの連携用
    if (this.makeSubstituteTargets) {
        targets = this.makeSubstituteTargets(targets);
    }

    // 重複ターゲットを削除して再作成
    for (const member of BattleManager.allBattleMembers()) {
        // ダメージ情報を初期化する。
        member._reservedResults = [];
        member._isDeadReserved = false;
        member._reservedHp = member.hp;
    }

    // 効果を与える回数
    const targetsLength = targets.length;
    // 新しい対象を格納する配列
    const newTargets = [];

    // 予約フラグをオンにする。
    mReservedResult = true;

    // 対象の数でループ
    for (let i = 0; i < targetsLength; i++) {
        const target = targets[i];

        // 範囲がランダムかつ対象が戦闘不能見込の場合、対象を変更する。
        if (pCorrectRandomTarget && this.isForRandom() && this.isForOpponent() && target._isDeadReserved) {
            // 対象グループの中で生存者を取得
            const newTarget = this.opponentsUnit().randomTarget();
            if (newTarget) {
                // ダメージ計算を実行
                this.calcResultFirst(newTarget);
                newTargets.push(newTarget);
                continue;
            }
        }

        // ダメージの事前計算を実行
        this.calcResultFirst(target);
        newTargets.push(target);
    }

    // 予約フラグを解除
    mReservedResult = false;

    return newTargets;
};

/**
 * 【独自】効果の事前計算を行う
 * ※本来の計算処理（Game_Action.prototype.apply）は、
 * 　結果の反映まで実行されるが、こちらは結果を保持するに留める。
 */
Game_Action.prototype.calcResultFirst = function(target) {
    const result = new Game_ActionResult();
    result.used = this.testApply(target);
    result.missed = result.used && Math.random() >= this.itemHit(target);
    result.evaded = !result.missed && Math.random() < this.itemEva(target);
    result.physical = this.isPhysical();
    result.drain = this.isDrain();

    // 計算用に対象を複製
    const tmpTarget = JsonEx.makeDeepCopy(target);

    // 計算のために一旦targetに格納。
    tmpTarget._result = result;

    if (result.isHit()) {
        if (this.item().damage.type > 0) {
            result.critical = Math.random() < this.itemCri(tmpTarget);
            const value = this.makeDamageValue(target, result.critical);
            // ダメージ結果を格納する。
            this.executeDamageFast(tmpTarget, value);
            // 戦闘不能判定を引継
            if (tmpTarget._isDeadReserved) {
                target._isDeadReserved = true;
            }
        }
        // 使用効果を格納
        for (const effect of this.item().effects) {
            this.applyItemEffectFast(tmpTarget, effect);
        }
    }

    // 結果を格納する。
    target._reservedResults.push(result);
    BattleManager.pushReservedResults(result);
};

/**
 * 【独自】ダメージ結果を格納する。
 */
Game_Action.prototype.executeDamageFast = function(target, value) {
    const result = target.result();
    if (value === 0) {
        result.critical = false;
    }

    // 計算結果を予約
    result.reservedValue = value;
    target._reservedHp -= value;

    if (this.isHpEffect()) {
        result.hpDamage = value;
        result.hpAffected = true;
        this.makeSuccess(target);
    }
    if (this.isMpEffect()) {
        result.mpDamage = value;
        this.makeSuccess(target);
    }

    // ＨＰダメージが対象のＨＰを超えた場合
    // ※ただし、不死身は除く
    if (this.isHpEffect()
            && target.isStateAddable(target.deathStateId())
            && target._reservedHp <= 0) {
        // 戦闘不能を予約
        target._isDeadReserved = true;
    }
};

/**
 * 【独自】使用効果を格納する。
 */
Game_Action.prototype.applyItemEffectFast = function(target, effect) {
    // 特殊効果、成長、スキル習得、コモンイベントは実行しない。
    switch (effect.code) {
        case Game_Action.EFFECT_SPECIAL:
            return;
        case Game_Action.EFFECT_GROW:
            return;
        case Game_Action.EFFECT_LEARN_SKILL:
            return;
        case Game_Action.EFFECT_COMMON_EVENT:
            return;
    }
    this.applyItemEffect(target, effect);
};

/**
 * ●スキルの効果反映
 * ※calcResultFirstで計算した結果を反映する。
 */
const _Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    const reservedResults = target.reservedResults();

    // 予約した結果がないなら通常処理
    if (!reservedResults || reservedResults.length == 0) {
        _Game_Action_apply.apply(this, arguments);
        return;
    }

    // 予約した結果を取得＆反映
    const result = target.shiftReservedResult();
    target._result = result;
    this.subject().clearResult();

    if (result.isHit()) {
        if (this.item().damage.type > 0) {
            // 計算には使用しないが処理を実行する。
            // ※NRP_TraitsEX.jsの演出用など。
            this.makeDamageValue(target, result.critical);

            // 重複計算されるのでクリア
            result.hpDamage = 0;
            result.mpDamage = 0;
            result.tpDamage = 0;

            // 計算結果を再取得
            const value = result.reservedValue;
            this.executeDamage(target, value);
        }

        // ステート追加
        for (const state of result.addedStates) {
            target.addState(state);
        }
        // ステート除去
        for (const state of result.removedStates) {
            target.removeState(state);
        }
        // バフ追加
        for (const dataId of result.addedBuffs) {
            const value = this.item().effects.find(effect =>
                effect.code == Game_Action.EFFECT_ADD_BUFF && effect.dataId == dataId).value1;
            target.addBuff(dataId, value);
        }
        // デバフ追加
        for (const dataId of result.addedDebuffs) {
            const value = this.item().effects.find(effect =>
                effect.code == Game_Action.EFFECT_ADD_DEBUFF && effect.dataId == dataId).value1;
            target.addDebuff(dataId, value);
        }
        // バフ除去
        for (const dataId of result.removedBuffs) {
            target.removeBuff(dataId);
        }
        // デバフ除去
        for (const dataId of result.removedDebuffs) {
            target.removeBuff(dataId);
        }

        this.applyItemUserEffect(target);
    }
    this.updateLastTarget(target);
};

/**
 * ●使用効果（ステート追加）
 */
const _Game_Action_itemEffectAddState = Game_Action.prototype.itemEffectAddState;
Game_Action.prototype.itemEffectAddState = function(target, effect) {
    // 成功フラグを保持しておく。
    const keepSuccess = target.result().success;

    _Game_Action_itemEffectAddState.apply(this, arguments);

    // ステート無効の場合は成功フラグの変更を無効化
    if (pStateResistToFailure && target.isStateResist(effect.dataId)) {
        target.result().success = keepSuccess;
    }
};

//-----------------------------------------------------------------------------
// Game_ActionResult
//-----------------------------------------------------------------------------

/**
 * ●初期化
 */
const _Game_ActionResult_clear = Game_ActionResult.prototype.clear;
Game_ActionResult.prototype.clear = function() {
    _Game_ActionResult_clear.apply(this, arguments);
    this.reservedValue = 0;
};

//-----------------------------------------------------------------------------
// Game_Battler
//-----------------------------------------------------------------------------

/**
 * 【独自】予測結果を取得する。
 */
Game_Battler.prototype.reservedResults = function() {
    return this._reservedResults;
};

/**
 * 【独自】予測結果（先頭）を取得する。
 */
Game_Battler.prototype.shiftReservedResult = function() {
    return this._reservedResults.shift();
};

//-----------------------------------------------------------------------------
// Game_BattlerBase
//-----------------------------------------------------------------------------

/**
 * ●生存判定
 */
const _Game_BattlerBase_isAlive = Game_BattlerBase.prototype.isAlive;
Game_BattlerBase.prototype.isAlive = function() {
    // 予約中は判定を変更
    if (mReservedResult) {
        const ret = _Game_BattlerBase_isAlive.apply(this, arguments);
        return ret && !this._isDeadReserved;
    }
    return _Game_BattlerBase_isAlive.apply(this, arguments);
};

})();
