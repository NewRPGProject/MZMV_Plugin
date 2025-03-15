//=============================================================================
// NRP_SkillEX.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.071 Extend the effect of the skill.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/500569896.html
 *
 * @help Extend the effect of the skill.
 * For example, the following skills can be created
 * 
 * - High critical rate skills.
 * - Skills that have a success rate greater than 100.
 * - Skills that add states at random.
 * - Skills that change elements or scope depending on conditions.
 * - Skills that consume all MP.
 * 
 * -------------------------------------------------------------------
 * [Note (skill, item)]
 * -------------------------------------------------------------------
 * All of the following can use formulas.
 * 
 * ◆Add Critical Rate
 * <AddCriticalRate:50>
 * Add 50% to the critical rate.
 * 
 * ◆Change Success Rate
 * <SuccessRate:150>
 * Set the skill success rate at 150%.
 * (Original value is ignored.)
 * 
 * For example, the hit rate will increase as the level increases
 * if you do the following
 * <SuccessRate:100 + a.level>
 * 
 * ◆Change State Rate
 * <StateRate:150>
 * Set the State Rate of the effects to 150%.
 * (Original value is ignored.)
 * 
 * ◆Add State
 * <AddState:4>
 * <AddStateRate:50>
 * Add state number 4 50% of the time.
 * ※If <AddStateRate> is omitted, the rate is 100%.
 * 
 * For example, the formula below adds 4, 5, and 6 states at random.
 * <AddState:4 + Math.randomInt(3)>
 * ※Math.randomInt(3) means 0 to 2.
 * 
 * ◆Add State To The User
 * <AddSelfState:4>
 * Adds state number 4 to the user of the skill.
 * 
 * ◆Change Element
 * <ChangeElement:2>
 * Change the element to 2:Flame.
 * 
 * ◆Change Scope
 * <ChangeScope:1>
 * Changes the scope to the specified value.
 * 0:None, 1:One Enemy, 2:All Enemies, 3:Enemy Random 1,
 * 4:Enemy Random 2, 5:Enemy Random 3, 6:Enemy Random 4,
 * 7:One Ally, 8:All Allies, 9:One Ally(Dead),
 * 10:All Allies(Dead), 11:User, 12:One Ally(Unconditional),
 * 13:All Allies(Unconditional), 14:Everyone
 * 
 * Example: If you remember skill 100,
 * the all enemies. Otherwise, one enemy.
 * <ChangeScope:a.isLearnedSkill(100) ? 2 : 1>
 * 
 * ◆Change Damage Type
 * <ChangeDamageType:3>
 * Changes the damage type to the specified value.
 * 1:HP Damage, 2:MP Damage, 3:HP Recover, 4:MP Recover,
 * 5:HP Drain, 6:MP Drain
 * 
 * Example: Restores the HP of all allies, but the user takes damage.
 * <ChangeDamageType:a == b ? 1 : 3>
 * 
 * ◆Change Number of Repeats
 * <ChangeNumRepeats:2>
 * Changes the number of repeats to the specified value.
 * 
 * ◆Change Number of Random Times
 * <ChangeNumRandom:5>
 * Changes the number of targets to the specified value
 * when scope is random.
 * It is valid for more than 5 times, which is normally not possible.
 * 
 * Example: Randomly run 2-4 times.
 * <ChangeNumRandom:2 + Math.randomInt(3)>
 * 
 * ◆Recover TP
 * <RecoverTp:100>
 * Recovers 100 TP.
 * If it is negative, it will be damage.
 * 
 * Example: It heals TP by a value equal to the user's mat.
 * <RecoverTp:a.mat>
 * 
 * ◆Damage To User
 * <SelfDamage:a.mhp / 10>
 * It damages the user for 1/10 of the maximum HP.
 * 
 * ◆Change Mp Cost
 * <ChangeMpCost:100>
 * Changes the MP cost to the specified value.
 * 
 * Example: Consume all MP.
 * <ChangeMpCost:a.mp>
 * 
 * Note that the Mp Cost Rate will be ignored.
 * If you wish to include it,
 * please incorporate Mp Cost Rate (mcr) into the formula.
 * Example: <ChangeMpCost:a.mp * a.mcr>
 * 
 * If you want to use the MP before consumption in the damage formula,
 * you can refer to it below.
 * a.startMp()
 * 
 * ◆Change Tp Cost
 * <ChangeTpCost:100>
 * Changes the TP cost to the specified value.
 * 
 * If you want to use the MP before consumption in the damage formula,
 * you can refer to it below.
 * a.startTp()
 * 
 * ◆Ignore Guard State
 * <IgnoreGuard>
 * Ignores guard state and deals damage without being halved.
 * 
 * -------------------------------------------------------------------
 * ■Formula Variables
 * -------------------------------------------------------------------
 * The plugin's formulas can use the following variables
 * 
 * ◆targetNo
 * For example, if the range was "Random 4 Enemies",
 * it can be distinguished by the numbers 0,1,2,3.
 * The following will be fire element only for the 4th shot,
 * and physical element for the rest.
 * 
 * <ChangeElement:targetNo == 3 ? 2 : 1>
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
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.071 スキルの効果を拡張します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/500569896.html
 *
 * @help スキルの効果に対して様々な拡張を行います。
 * 例えば、以下のようなスキルが作成できます。
 * 
 * ・会心率の高いスキル
 * ・成功率が１００を超えるスキル
 * ・ランダムでステートを付加するスキル
 * ・条件によって属性や範囲が変化するスキル
 * ・全てのＭＰを消費するスキル
 * 
 * -------------------------------------------------------------------
 * ■スキル、アイテムのメモ欄
 * -------------------------------------------------------------------
 * 以下はいずれも数式が使用できます。
 * 
 * ◆会心率を加算
 * <AddCriticalRate:50>
 * 会心率を５０％加算します。
 * 
 * ◆成功率を変更
 * <SuccessRate:150>
 * スキルの成功率を１５０％にします。
 * （元の値は無視されます。）
 * 
 * 例えば、以下のようにすればレベルが上がるに従い命中率が上がります。
 * <SuccessRate:100 + a.level>
 * 
 * ◆ステート付加率を変更
 * <StateRate:150>
 * 使用効果のステート付加率を１５０％にします。
 * （元の値は無視されます。）
 * 
 * ◆追加ステートを付与
 * <AddState:4>
 * <AddStateRate:50>
 * ４番のステートを５０％の確率で付加します。
 * ※<AddStateRate>を省略すると１００％になります。
 * 
 * 例えば、以下は4,5,6のステートをランダムで付加します。
 * <AddState:4 + Math.randomInt(3)>
 * ※Math.randomInt(3)は0~2の意味です。
 * 
 * ◆自身にステートを付与
 * <AddSelfState:4>
 * スキルの使用者に４番のステートを付加します。
 * 
 * ◆属性を変更
 * <ChangeElement:2>
 * 属性を2:炎に変更します。
 * 
 * ◆範囲を変更
 * <ChangeScope:1>
 * 範囲を指定した値へ変更します。
 * 0:なし, 1:敵単体, 2:敵全体, 3:敵1体ランダム, 4:敵2体ランダム,
 * 5:敵3体ランダム, 6:敵4体ランダム, 7:味方単体, 8:味方全体,
 * 9:味方単体(戦闘不能), 10:味方全体(戦闘不能), 11:使用者,
 * 12:味方単体(無条件), 13:味方全体(無条件), 14:敵味方全体
 * 
 * 例：スキル100を覚えている場合は敵全体。それ以外は敵単体
 * <ChangeScope:a.isLearnedSkill(100) ? 2 : 1>
 * 
 * ◆ダメージタイプを変更
 * <ChangeDamageType:3>
 * ダメージタイプを指定した値へ変更します。
 * 1:HPダメージ, 2:MPダメージ, 3:HP回復, 4:MP回復, 5:HP吸収, 6:MP回復
 * 
 * 例：味方全体のＨＰを回復するが、自分はダメージを受ける。
 * <ChangeDamageType:a == b ? 1 : 3>
 * 
 * ◆連続回数を変更
 * <ChangeNumRepeats:2>
 * 連続回数を指定した値へ変更します。
 * 
 * ◆ランダム回数を変更
 * <ChangeNumRandom:5>
 * 範囲がランダムの場合の対象数を指定した値へ変更します。
 * 通常は不可能な５回以上も有効です。
 * 
 * 例：２～４回、ランダムに実行する。
 * <ChangeNumRandom:2 + Math.randomInt(3)>
 * 
 * ◆ＴＰ回復
 * <RecoverTp:100>
 * ＴＰを１００回復します。
 * マイナスならダメージになります。
 * 
 * 例：使用者の魔力分だけＴＰを回復。
 * <RecoverTp:a.mat>
 * 
 * ◆自身にダメージ
 * <SelfDamage:a.mhp / 10>
 * 自身に最大ＨＰの1/10のダメージを与えます。
 * 
 * ◆消費ＭＰを変更
 * <ChangeMpCost:100>
 * 消費ＭＰを指定した値へ変更します。
 * 
 * 例：全ＭＰを消費
 * <ChangeMpCost:a.mp>
 * 
 * なお、ＭＰ消費率は無視されるようになります。
 * もし、含みたい場合は数式にＭＰ消費率（mcr）を組み込んでください。
 * 例：<ChangeMpCost:a.mp * a.mcr>
 * 
 * ダメージ計算式に消費前のＭＰを使用したい場合は以下で参照できます。
 * a.startMp()
 * 
 * ◆消費ＴＰを変更
 * <ChangeTpCost:100>
 * 消費ＴＰを指定した値へ変更します。
 * 
 * ダメージ計算式に消費前のＴＰを使用したい場合は以下で参照できます。
 * a.startTp()
 * 
 * ◆防御ステートを無視
 * <IgnoreGuard>
 * 防御ステートを無視して、半減されずにダメージを与えます。
 * 
 * -------------------------------------------------------------------
 * ■数式用の変数
 * -------------------------------------------------------------------
 * 当プラグインの数式では以下の変数を使用できます。
 * 
 * ◆targetNo（対象番号）
 * 例えば、範囲が『敵4体 ランダム』だった場合、0,1,2,3の数値で区別できます。
 * 以下は４撃目のみ炎属性、それ以外は物理属性となります。
 * 
 * <ChangeElement:targetNo == 3 ? 2 : 1>
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
function setDefault(str, def) {
    if (str == undefined || str == "") {
        return def;
    }
    return str;
}

const PLUGIN_NAME = "NRP_SkillEX";
const parameters = PluginManager.parameters(PLUGIN_NAME);

// ----------------------------------------------------------------------------
// BattleManager
// ----------------------------------------------------------------------------

// 対象が何番目か？（eval用の項目）
let targetNo = 0;
// 対象
let mTarget = null;

/**
 * ●アクション開始
 */
const _BattleManager_startAction = BattleManager.startAction;
BattleManager.startAction = function() {
    targetNo = 0;

    _BattleManager_startAction.apply(this, arguments);
};

/**
 * ●アクション結果呼び出し
 */
const _BattleManager_invokeAction = BattleManager.invokeAction;
BattleManager.invokeAction = function(subject, target) {
    _BattleManager_invokeAction.apply(this, arguments);

    // 対象番号加算
    targetNo++;
}

/**
 * ●アクション終了
 */
const _BattleManager_endAction = BattleManager.endAction;
BattleManager.endAction = function() {
    // アクションが取得できない場合は終了
    if (!this._action) {
        _BattleManager_endAction.apply(this, arguments);
        return;
    }

    const a = this._subject;
    const b = a;

    // 自身への反動ダメージ
    const selfDamage = this._action.item().meta.SelfDamage;
    if (selfDamage) {
        const damage = Math.round(eval(selfDamage));
        this._action.executeDamage(this._subject, damage);
        this._subject.result().used = true;
        // メッセージ表示
        this._logWindow.displayActionResults(this._subject, this._subject);
    }

    // 自身への追加ステート
    const addSelfState = this._action.item().meta.AddSelfState;
    if (addSelfState) {
        const stateId = eval(addSelfState);
        this._subject.addState(stateId);
        this._action.makeSuccess(this._subject);
        // メッセージ表示
        this._logWindow.displayAddedStates(this._subject);
    }
    _BattleManager_endAction.apply(this, arguments);
};

// ----------------------------------------------------------------------------
// Window_BattleLog
// ----------------------------------------------------------------------------

/**
 * ●アクション開始
 * ※NRP_CalcResultFirst.js用の調整
 */
const _Window_BattleLog_startAction = Window_BattleLog.prototype.startAction;
Window_BattleLog.prototype.startAction = function(subject, action, targets) {
    targetNo = 0;
    _Window_BattleLog_startAction.apply(this, arguments);
};

// ----------------------------------------------------------------------------
// Game_Action
// ----------------------------------------------------------------------------

/**
 * ●成功率計算
 */
const _Game_Action_itemHit = Game_Action.prototype.itemHit;
Game_Action.prototype.itemHit = function(target) {
    // 成功率の指定がある場合は優先
    const metaSuccessRate = this.item().meta.SuccessRate;
    if (metaSuccessRate != null) {
        // eval計算
        const a = this.subject();
        const b = target;
        const successRate = eval(metaSuccessRate);
        if (this.isPhysical()) {
            return successRate * 0.01 * this.subject().hit;
        } else {
            return successRate * 0.01;
        }
    }
    return _Game_Action_itemHit.apply(this, arguments);
};

/**
 * ●効果反映
 */
const _Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    // 対象を保持
    mTarget = target;

    _Game_Action_apply.apply(this, arguments);

    // eval計算用
    const a = this.subject();
    const b = target;

    // ＴＰ回復
    const recoverTp = this.item().meta.RecoverTp;
    if (recoverTp) {
        target.gainTp(Math.round(eval(recoverTp)));
        this.makeSuccess(target);
    }

    // 追加ステートの指定がなければ終了
    const addState = this.item().meta.AddState;
    if (!addState) {
        return;
    }
    const stateId = eval(addState);
    // 計算結果が０ならば終了
    if (!stateId) {
        return;
    }

    // AddStateRateの値を100で割ってから計算。
    let chance = this.item().meta.AddStateRate ? this.item().meta.AddStateRate : 100;
    chance = eval(chance) / 100;
    if (!this.isCertainHit()) {
        chance *= target.stateRate(stateId);
        chance *= this.lukEffectRate(target);
    }
    if (Math.random() < chance) {
        target.addState(stateId);
        this.makeSuccess(target);
    }
}

/**
 * ●効果反映
 * ※NRP_CalcResultFirst.js用
 */
const _Game_Action_calcResultFirst = Game_Action.prototype.calcResultFirst;
Game_Action.prototype.calcResultFirst = function(target) {
    _Game_Action_calcResultFirst.apply(this, arguments);
    // 対象番号加算
    targetNo++;
};

/**
 * ●ステートの付加
 */
const _Game_Action_itemEffectAddNormalState = Game_Action.prototype.itemEffectAddNormalState;
Game_Action.prototype.itemEffectAddNormalState = function(target, effect) {
    // ステート付加率の指定がある場合
    const stateRate = this.item().meta.StateRate;
    if (stateRate != null) {
        // ステート付加率を記憶
        const keepEffectValue1 = effect.value1;
        // eval計算用
        const a = this.subject();
        const b = mTarget;

        // 一時的にステート付加率を書き換え
        effect.value1 = eval(stateRate) / 100;
        // 実行
        _Game_Action_itemEffectAddNormalState.apply(this, arguments);
        // 元に戻す
        effect.value1 = keepEffectValue1;
        return;
    }
    _Game_Action_itemEffectAddNormalState.apply(this, arguments);
};

/**
 * ●属性ダメージの計算
 */
const _Game_Action_calcElementRate = Game_Action.prototype.calcElementRate;
Game_Action.prototype.calcElementRate = function(target) {
    // 属性ＩＤの指定がある場合
    const changeElement = this.item().meta.ChangeElement;
    if (changeElement != null) {
        // 属性ＩＤを記憶
        const keepElementId = this.item().damage.elementId;
        // eval計算用
        const a = this.subject();
        const b = mTarget;

        // 一時的に属性ＩＤを書き換え
        this.item().damage.elementId = Number(eval(changeElement));
        // 実行
        const ret = _Game_Action_calcElementRate.apply(this, arguments);
        // 元に戻す
        this.item().damage.elementId = keepElementId;
        return ret;
    }
    return _Game_Action_calcElementRate.apply(this, arguments);
};

/**
 * ●スキル／アイテムの範囲確認
 */
const _Game_Action_checkItemScope = Game_Action.prototype.checkItemScope;
Game_Action.prototype.checkItemScope = function(list) {
    // eval参照用
    const a = this.subject();
    // 範囲を変更する場合
    const changeScope = this.item().meta.ChangeScope;
    if (changeScope) {
        return list.includes(eval(changeScope));
    }
    return _Game_Action_checkItemScope.apply(this, arguments);
};

/**
 * ●会心率を取得
 */
const _Game_Action_itemCri = Game_Action.prototype.itemCri;
Game_Action.prototype.itemCri = function(target) {
    const ret = _Game_Action_itemCri.apply(this, arguments);
    // eval参照用
    const a = this.subject();
    const b = mTarget;

    // 会心率を加算する場合
    const addCriticalRate = this.item().meta.AddCriticalRate;
    if (addCriticalRate) {
        return ret + eval(addCriticalRate) / 100;
    }
    return ret;
};

/**
 * ●対象毎の評価
 */
const _Game_Action_evaluateWithTarget = Game_Action.prototype.evaluateWithTarget;
Game_Action.prototype.evaluateWithTarget = function(target) {
    mTarget = target;
    return _Game_Action_evaluateWithTarget.apply(this, arguments);
};

/**
 * ●ダメージ実行
 */
const _Game_Action_executeDamage = Game_Action.prototype.executeDamage;
Game_Action.prototype.executeDamage = function(target, value) {
    mTarget = target;
    _Game_Action_executeDamage.apply(this, arguments);
};

/**
 * ●ダメージタイプの確認
 */
const _Game_Action_checkDamageType = Game_Action.prototype.checkDamageType;
Game_Action.prototype.checkDamageType = function(list) {
    // eval参照用
    const a = this.subject();
    const b = mTarget;

    // ダメージタイプを記憶
    const keepDamageType = this.item().damage.type;

    try {
        // ダメージタイプの変更
        // ※エラーになった場合はスルー
        const damageType = this.item().meta.ChangeDamageType;
        if (damageType != null) {
            // 一時的にダメージタイプを書き換えて実行
            this.item().damage.type = eval(damageType);
            const ret = _Game_Action_checkDamageType.apply(this, arguments);
            this.item().damage.type = keepDamageType;
            return ret;
        }
    } catch (e) {}

    return _Game_Action_checkDamageType.apply(this, arguments);
};

/**
 * ●ダメージ計算式
 */
const _Game_Action_evalDamageFormula = Game_Action.prototype.evalDamageFormula;
Game_Action.prototype.evalDamageFormula = function(target) {
    const damageType = this.item().meta.ChangeDamageType;
    if (damageType != null) {
        // ダメージタイプを記憶
        const keepDamageType = this.item().damage.type;

        // eval参照用
        const a = this.subject();
        const b = target;

        // 一時的にダメージタイプを書き換え
        this.item().damage.type = eval(damageType);
        const ret = _Game_Action_evalDamageFormula.apply(this, arguments);
        this.item().damage.type = keepDamageType;

        return ret;
    }

    return _Game_Action_evalDamageFormula.apply(this, arguments);
};

/**
 * ●連続回数
 */
const _Game_Action_numRepeats = Game_Action.prototype.numRepeats;
Game_Action.prototype.numRepeats = function() {
    const metaChangeNumRepeats = this.item().meta.ChangeNumRepeats;
    if (metaChangeNumRepeats) {
        const keepRepeats = this.item().repeats;
        // eval参照用
        const a = this.subject();
        const action = this;

        // 一時的に連続回数を書き換える。
        this.item().repeats = eval(metaChangeNumRepeats);
        const numRepeats = _Game_Action_numRepeats.apply(this, arguments);
        // 値を戻す。
        this.item().repeats = keepRepeats;

        return numRepeats;
    }
    return _Game_Action_numRepeats.apply(this, arguments);;
};

/**
 * ●範囲がランダムの際の対象数
 */
const _Game_Action_numTargets = Game_Action.prototype.numTargets;
Game_Action.prototype.numTargets = function() {
    const metaChangeNumRandom = this.item().meta.ChangeNumRandom;
    if (metaChangeNumRandom) {
        // 既に設定済みなら取得
        if (this._numTargets != null) {
            return this._numTargets;
        }
        // eval参照用
        const a = this.subject();
        const numTargets = eval(metaChangeNumRandom);
        // actionに設定して記憶する。
        // ※値がランダムの場合に以降の処理を固定させるため
        this._numTargets = numTargets;
        return numTargets;
    }
    return _Game_Action_numTargets.apply(this, arguments);
};

/**
 * ●防御状態を反映
 */
const _Game_Action_applyGuard = Game_Action.prototype.applyGuard;
Game_Action.prototype.applyGuard = function(damage, target) {
    // 防御状態無視の場合
    const ignoreGuard = this.item().meta.IgnoreGuard;
    if (ignoreGuard) {
        return damage;
    }
    return _Game_Action_applyGuard.apply(this, arguments);
};

// ----------------------------------------------------------------------------
// Game_BattlerBase
// ----------------------------------------------------------------------------

/**
 * ●消費ＭＰ
 */
const _Game_BattlerBase_skillMpCost = Game_BattlerBase.prototype.skillMpCost;
Game_BattlerBase.prototype.skillMpCost = function(skill) {
    this._startMp = this.mp;

    const changeMpCost = skill.meta.ChangeMpCost
    if (changeMpCost != null) {
        const a = this;
        return Math.floor(eval(changeMpCost));
    }
    return _Game_BattlerBase_skillMpCost.apply(this, arguments);
};

/**
 * ●消費ＴＰ
 */
const _Game_BattlerBase_skillTpCost = Game_BattlerBase.prototype.skillTpCost;
Game_BattlerBase.prototype.skillTpCost = function(skill) {
    this._startTp = this.tp;

    const changeTpCost = skill.meta.ChangeTpCost;
    if (changeTpCost != null) {
        const a = this;
        return Math.floor(eval(changeTpCost));
    }
    return _Game_BattlerBase_skillTpCost.apply(this, arguments);
};

/**
 * 【独自】スキル使用前のＭＰ
 */
Game_BattlerBase.prototype.startMp = function() {
    return this._startMp;
};

/**
 * 【独自】スキル使用前のＴＰ
 */
Game_BattlerBase.prototype.startTp = function() {
    return this._startTp;
};

})();
