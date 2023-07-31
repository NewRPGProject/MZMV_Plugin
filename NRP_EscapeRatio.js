//=============================================================================
// NRP_EscapeRatio.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Change the success rate of escape.
 * @author Takeshi Sunagawa (https://newrpg.seesaa.net/)
 * @orderAfter NRP_CountTimeBattle
 * @url https://newrpg.seesaa.net/article/500211133.html
 *
 * @help Change the formula for calculating the escape success rate.
 * 
 * - Calculation can be changed to luck or level calculation
 * - Minimum escape rate can be set.
 * - Can be changed to compensate for unsuccessful escape attempts
 * - Able to set traits that make escape more likely to succeed.
 * 
 * -------------------------------------------------------------------
 * [Default Formula]
 * -------------------------------------------------------------------
 * The assumption is that
 * RPG Maker MZ has the following success rates for escapes.
 * 
 * Rate = (0.5 * $gameParty.agility()) / $gameTroop.agility()
 * 
 * It means
 * (0.5 * average of actor agility) / average of enemy agility.
 * 
 * For example
 * 
 * - If the actor's agility is equal to the enemy's agility,
 *   the probability is 50%.
 * - If the actor's agility is twice the enemy's agility,
 *   the probability is 100%.
 * 
 * In addition, the success rate is increased by +10%
 * for each failed escape attempt.
 * 
 * -------------------------------------------------------------------
 * [Change Formula]
 * -------------------------------------------------------------------
 * Change the plugin parameter
 * "EscapeFormula" with reference to the above.
 * 
 * The plugin's functionality also allows
 * the following parameters to be used in the calculation
 * 
 * $gameParty.luck() | $gameTroop.luck() : Average of luck
 * $gameParty.level() | $gameTroop.level() : Average of Level
 * $gameParty.maxAgility() | $gameTroop.maxAgility() : Max of agility
 * $gameParty.maxLuck() | $gameTroop.maxLuck() : Max of luck
 * $gameParty.maxLevel() | $gameTroop.maxLevel() : Max of Level
 * 
 * Only agility, luck and level are supported.
 * Enemy levels do not exist by default
 * and must be set by an external plugin.
 * 
 * -------------------------------------------------------------------
 * [Note (actor, class, equipment, state, and skill)]
 * -------------------------------------------------------------------
 * You can create a trait that increases your escape success rate
 * by filling in the following.
 * For skills, the effect occurs only when they are learned.
 * 
 * <EscapeBonus:0.1>
 * The escape success rate is increased by 10%.
 * Note that the effect is duplicated.
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
 * @param EscapeFormula
 * @type string
 * @default (0.5 * $gameParty.agility()) / $gameTroop.agility()
 * @desc Formula for determining the escape rate. Default: (0.5 * average of actor agility) / average of enemy agility
 * 
 * @param EscapeFailBonus
 * @type number
 * @decimals 2
 * @default 0.1
 * @desc Upon an failed escape, the following success rates are added. The initial value is 0.1 (10%).
 * 
 * @param EscapeMinRate
 * @type number
 * @decimals 2
 * @desc This is the minimum guaranteed escape rate.
 * 
 * @param LimitAlive
 * @type boolean
 * @default false
 * @desc Limit the calculation of the escape rate to the survivor's ability to escape only.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 逃走成功率を変更する。
 * @author 砂川赳（https://newrpg.seesaa.net/）
 * @orderAfter NRP_CountTimeBattle
 * @url https://newrpg.seesaa.net/article/500211133.html
 *
 * @help 逃走成功率の計算式を変更します。
 * 
 * ・運やレベルでの計算に変更可能
 * ・最低逃走率を設定可能
 * ・逃走失敗時の補正を変更可能
 * ・逃走に成功しやすくなる特徴を設定可能
 * 
 * -------------------------------------------------------------------
 * ■既定の計算式
 * -------------------------------------------------------------------
 * 前提として、ツクールＭＺの逃走成功率は以下の通りです。
 * 
 * 逃走成功率 = (0.5 * $gameParty.agility()) / $gameTroop.agility()
 * 
 * 意味は『(0.5 * 味方の敏捷性の平均値) / 敵の敏捷性の平均値』となります。
 * 
 * 例えば、以下のようになります。
 * 
 * ・味方の敏捷性と敵の敏捷性が等しい場合は確率５０％。
 * ・味方の敏捷性が敵の敏捷性のニ倍の場合は確率１００％。
 * 
 * さらに逃走に失敗する度に成功率が＋１０％されます。
 * 
 * -------------------------------------------------------------------
 * ■計算式の変更
 * -------------------------------------------------------------------
 * 上記を参考にプラグインパラメータの『逃走計算式』を変更してください。
 * 
 * また、当プラグインの機能により、以下のパラメータを計算に使用できます。
 * 
 * $gameParty.luck() | $gameTroop.luck()：運の平均値
 * $gameParty.level() | $gameTroop.level()：レベルの平均値
 * $gameParty.maxAgility() | $gameTroop.maxAgility()：敏捷性の最大値
 * $gameParty.maxLuck() | $gameTroop.maxLuck()：運の最大値
 * $gameParty.maxLevel() | $gameTroop.maxLevel()：レベルの最大値
 * 
 * 対応しているのは敏捷性と運とレベルだけです。
 * 敵のレベルは標準では存在しないため、外部プラグインで設定してください。
 * 
 * -------------------------------------------------------------------
 * ■アクター、職業、装備、ステート、スキルのメモ欄
 * -------------------------------------------------------------------
 * 以下を記入すれば、逃走成功率が上昇する特徴を作成できます。
 * スキルについては、習得しているだけで効果が発生します。
 * 
 * <EscapeBonus:0.1>
 * 逃走成功率が10%上昇します。
 * なお、効果は重複します。
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
 * @param EscapeFormula
 * @text 逃走計算式
 * @type string
 * @default (0.5 * $gameParty.agility()) / $gameTroop.agility()
 * @desc 逃走率を決める計算式です。
 * 既定値：(0.5 * 味方の敏捷性の平均) / 敵の敏捷性の平均
 * 
 * @param EscapeFailBonus
 * @text 逃走失敗時のボーナス
 * @type number
 * @decimals 2
 * @default 0.1
 * @desc 逃走失敗時、次の成功率が指定数値分だけ上昇します。
 * 初期値は0.1（10%）です。
 * 
 * @param EscapeMinRate
 * @text 最低逃走率
 * @type number
 * @decimals 2
 * @desc 最低限保証される逃走率です。
 * 
 * @param LimitAlive
 * @text 生存者に限定
 * @type boolean
 * @default false
 * @desc 逃走率の計算を生存者の能力だけに限定します。
 * なお、先制＆奇襲率の計算も生存者が対象になります。
 * 
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

const PLUGIN_NAME = "NRP_EscapeRatio";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pEscapeFormula = setDefault(parameters["EscapeFormula"]);
const pEscapeFailBonus = toNumber(parameters["EscapeFailBonus"]);
const pEscapeMinRate = toNumber(parameters["EscapeMinRate"]);
const pLimitAlive = toBoolean(parameters["LimitAlive"], false);

// ----------------------------------------------------------------------------
// BattleManager
// ----------------------------------------------------------------------------

const _BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
    _BattleManager_initMembers.apply(this, arguments);

    // 逃走失敗回数
    this._escapeFailureCount = 0;
};

/**
 * ●逃走処理
 */
const _BattleManager_processEscape = BattleManager.processEscape;
BattleManager.processEscape = function() {
    // 逃走する度に毎回確率を計算する。
    // ※BattleManager.onEscapeFailureの失敗時補正は消滅する。
    this.makeEscapeRatio();
    const ret = _BattleManager_processEscape.apply(this, arguments);

    // 逃走失敗回数加算
    if (!ret) {
        this._escapeFailureCount++;
    }
    return ret;
};

/**
 * 【上書】逃走成功率を計算する。
 */
const _BattleManager_makeEscapeRatio = BattleManager.makeEscapeRatio;
BattleManager.makeEscapeRatio = function() {
    // 計算式を反映
    if (pEscapeFormula) {
        this._escapeRatio = eval(pEscapeFormula);
    } else {
        _BattleManager_makeEscapeRatio.apply(this, arguments);
    }

    // 最低保証
    if (pEscapeMinRate) {
        this._escapeRatio = Math.max(pEscapeMinRate, this._escapeRatio);
    }

    // メモ欄を参照するオブジェクト（特徴系＋スキル）
    for (const member of $gameParty.escapeMembers()) {
        const objects = member.traitObjects().concat(member.skills());
        for (const object of objects) {
            if (object.meta.EscapeBonus) {
                this._escapeRatio += eval(object.meta.EscapeBonus);
            }
        }
    }

    // 逃走失敗時のボーナスを計算
    if (pEscapeFailBonus) {
        this._escapeRatio += this._escapeFailureCount * pEscapeFailBonus;
    }
};

// ----------------------------------------------------------------------------
// Game_Unit
// ----------------------------------------------------------------------------

/**
 * 【上書】敏捷性の平均値を求める。
 */
Game_Unit.prototype.agility = function() {
    const members = this.escapeMembers();
    const sum = members.reduce((r, member) => r + member.agi, 0);
    return Math.max(1, sum / Math.max(1, members.length));
};

/**
 * 【独自】運の平均値を求める。
 */
Game_Unit.prototype.luck = function() {
    const members = this.escapeMembers();
    const sum = members.reduce((r, member) => r + member.luk, 0);
    return Math.max(1, sum / Math.max(1, members.length));
};

/**
 * 【独自】レベルの平均値を求める。
 */
Game_Unit.prototype.level = function() {
    const members = this.escapeMembers();
    const sum = members.reduce((r, member) => r + member.level, 0);
    return Math.max(1, sum / Math.max(1, members.length));
};

/**
 * 【独自】敏捷性の最大値を求める。
 */
Game_Unit.prototype.maxAgility = function() {
    const member = this.escapeMembers().reduce((a, b) => a.agi > b.agi ? a : b)
    return member.agi;
};

/**
 * 【独自】運の最大値を求める。
 */
Game_Unit.prototype.maxLuck = function() {
    const member = this.escapeMembers().reduce((a, b) => a.luk > b.luk ? a : b)
    return member.luk;
};

/**
 * 【独自】レベルの最大値を求める。
 */
Game_Unit.prototype.maxLevel = function() {
    const member = this.escapeMembers().reduce((a, b) => a.level > b.level ? a : b)
    return member.level;
};

/**
 * 【独自】逃走率の計算に用いる対象を取得する。
 */
Game_Unit.prototype.escapeMembers = function() {
    // 生存者に限定する場合
    if (pLimitAlive) {
        return this.aliveMembers();
    }
    return this.members();
};

})();
