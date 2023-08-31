﻿//=============================================================================
// NRP_SkillEX.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Extend the effect of the skill.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/500569896.html
 *
 * @help Extend the effect of the skill.
 * 
 * -------------------------------------------------------------------
 * [Note (skill, item)]
 * -------------------------------------------------------------------
 * All of the following can use formulas.
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
 * Unlike those in effects, states can be changed by formulas.
 * ※If <AddStateRate> is omitted, the rate is 100%.
 * 
 * For example, the formula below adds 4, 5, and 6 states at random.
 * <AddState:4 + Math.randomInt(3)>
 * ※Math.randomInt(3) means 0 to 2.
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
 * @plugindesc v1.00 スキルの効果を拡張します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/500569896.html
 *
 * @help スキルの効果を拡張します。
 * 
 * -------------------------------------------------------------------
 * ■スキル、アイテムのメモ欄
 * -------------------------------------------------------------------
 * 以下はいずれも数式が使用できます。
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
 * 使用効果のものとは異なり、ステートを数式で操作できます。
 * ※<AddStateRate>を省略すると１００％になります。
 * 
 * 例えば、以下は4,5,6のステートをランダムで付加します。
 * <AddState:4 + Math.randomInt(3)>
 * ※Math.randomInt(3)は0~2の意味です。
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
// Game_Action
// ----------------------------------------------------------------------------

/**
 * ●成功率計算
 */
const _Game_Action_itemHit = Game_Action.prototype.itemHit;
Game_Action.prototype.itemHit = function(/*target*/) {
    // 成功率の指定がある場合は優先
    const metaSuccessRate = this.item().meta.SuccessRate;
    if (metaSuccessRate != null) {
        // eval計算
        const a = this.subject();
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
    _Game_Action_apply.apply(this, arguments);

    // eval計算用
    const a = this.subject();
    const b = target;

    // 追加ステートの指定がなければ終了
    const addState = this.item().meta.AddState;
    if (!addState) {
        return;
    }
    const stateId = eval(addState);

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
        // 一時的にステート付加率を書き換え
        effect.value1 = eval(stateRate);
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

})();
