//=============================================================================
// NRP_EnhanceSkill.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Change the performance of the skill.
 * @author Takeshi Sunagawa (https://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/498025725.html
 *
 * @help The performance of a skill (damage, consume,
 * success rate, and state-added rate) can be changed based on actor,
 * enemy, class, equipment, state, and skill.
 * 
 * ■Examples
 * - Actors who are good at flame magic
 * - Classes with low success rate in ice skills
 * - Equipment that increases the rate of state addition
 * - Passive skills that reduce special TP consumption to 0
 * 
 * can be created, such as.
 * 
 * -------------------------------------------------------------------
 * [Note (actor, enemy, class, equipment, state, and skill)]
 * -------------------------------------------------------------------
 * ◆Specify target skill range
 * You can specify a range of skills to be enhanced
 * by specifying one of the following in note.
 * ※You can also specify only the contents of the enhancement
 *   by omitting it.
 * ※Settings depend on the type of database.
 * ※Multiple Allowed (e.g.：<EnhanceTargetElement:2,3,4>
 *   or <EnhanceTargetSkillType:2~4>)
 * 
 * <EnhanceTargetElement:2>
 * Elements 02 (Fire) is subject to enhancement.
 * ※When omitted, all elements,
 *   including "None" and so on, are covered.
 * 
 * <EnhanceTargetSkillType:1>
 * Skill Types 01 (Magic) is subject to enhancement.
 * ※When omitted, the skill type set
 *   in the plugin parameter is applied.
 * 
 * ◆Specify enhancements
 * You can specify the enhancements individually below.
 * If omitted, the default values of the plugin parameters
 * will be applied.
 * If you enter even one, the initial value will not be applied.
 * 
 * <EnhanceDamageRate:150>
 * 1.5 times the damage when enhanced.
 * 
 * <EnhanceMpCostRateRate:50>
 * 0.5 times the consume MP when enhanced.
 * 
 * <EnhanceTpCostRateRate:50>
 * 0.5 times the consume TP when enhanced.
 * 
 * <EnhanceSuccessRate:150>
 * 1.5 times the success rate when enhanced.
 * 
 * <EnhanceStateRate:150>
 * 1.5 times the state rate when enhanced.
 * 
 * -------------------------------------------------------------------
 * [Note (skill and item)]
 * -------------------------------------------------------------------
 * <EnhanceElement:2>
 * The skill is judged as elements 02 (flame).
 * This allows skills with the damage type
 * "None" to be targeted for enhancement.
 * ※Multiple Allowed (e.g.：<EnhanceTargetElement:2,3,4>
 *   or <EnhanceTargetSkillType:2~4>)
 * 
 * Works if at least one value matches the <EnhanceTargetElement:?>
 * above and at least one value matches.
 * Values can be strings as well as numbers.
 * 
 * You can also make a condition other than an element
 * by setting your own value.
 * For example, you can create equipment
 * that enhances only certain skills by doing the following
 * 
 * - Note of Skills: <EnhanceElement:A>
 * - Note of Equipments: <EnhanceTargetElement:A>
 * 
 * -------------------------------------------------------------------
 * [Other Details]
 * -------------------------------------------------------------------
 * This plugin supports passive skills.
 * Simply enter the skill in the note as you would any other
 * and have the actor learn it.
 * Please be careful not to confuse the skill of the user
 * with the setting in the note field.
 * 
 * One object (actor, enemy, class, equipment, state, skill)
 * cannot have multiple different effects on it.
 * (For example, an actor who is good at fire magic
 *  but bad at ice magic.)
 * In such a case, you can still split the effect
 * by utilizing passive skills and state.
 * 
 * This is not supported
 * when the element of the skill is "Normal Attack".
 * According to RPG Maker specifications, the "Attack Element"
 * of the equipment is reflected in the skill, but specifying
 * the element to be enhanced with <EnhanceTargetElement> is not valid.
 * 
 * The use effects "Recover HP" and "Recover MP" are not supported.
 * If you want to target recovery, please use the calculation formula.
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
 * @param EnhanceSkillType
 * @type string
 * @desc Enter the target skill type numerically. Comma-separated multiple (e.g., 1,2,3), all valid with blank.
 * 
 * @param EnhanceItem
 * @type boolean
 * @default false
 * @desc Items are also subject to enhancement.
 * 
 * @param OverlaySettings
 * @type select
 * @option 0:Overwrite @value 0
 * @option 1:Ovarlay @value 1
 * @default 1
 * @desc The behavior when reinforcement is stacked. If Overwrite, the maximum damage multiplier is given priority.
 * 
 * @param <DefaultEnhance>
 * @desc Initial value at the time of enhancement.
 * 
 * @param EnhanceDamageRate
 * @parent <DefaultEnhance>
 * @type number
 * @default 150
 * @desc Damage multiplier when enhanced. 1.5x for 150.
 * 
 * @param EnhanceMpCostRate
 * @parent <DefaultEnhance>
 * @type number
 * @desc MP consume multiplier when enhanced. 0.5x for 50.
 * 
 * @param EnhanceTpCostRate
 * @parent <DefaultEnhance>
 * @type number
 * @desc TP consume multiplier when enhanced. 0.5x for 50.
 * 
 * @param EnhanceSuccessRate
 * @parent <DefaultEnhance>
 * @type number
 * @desc Success rate multiplier when enhanced. 1.5x for 150.
 * 
 * @param EnhanceStateRate
 * @parent <DefaultEnhance>
 * @type number
 * @desc State rate multiplier when enhanced. 1.5x for 150.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 スキルの性能を変化させる。
 * @author 砂川赳（https://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/498025725.html
 *
 * @help アクター、エネミー、職業、装備、ステート、スキルを条件にして、
 * スキルの性能（ダメージ、消費、成功率、ステート付加率）を変更できます。
 * 
 * ■例
 * ・炎の魔法のダメージが高いアクター
 * ・氷のスキルの成功率が低い職業
 * ・ステート付加率を上昇させる装備
 * ・必殺技の消費ＴＰを０にするパッシブスキル
 * 
 * などが作成可能です。
 * 
 * -------------------------------------------------------------------
 * ■アクター、エネミー、職業、装備、ステート、スキルのメモ欄
 * -------------------------------------------------------------------
 * ◆対象スキルの範囲を指定
 * 以下のいずれかをメモ欄に指定すれば、強化するスキルの範囲を指定できます。
 * ※省略して強化内容だけを指定することも可能です。
 * ※設定はデータベースのタイプに依存します。
 * ※複数指定可（例：<EnhanceTargetElement:2,3,4>
 * 　または<EnhanceTargetSkillType:2~4>）
 * 
 * <EnhanceTargetElement:2>
 * 属性02（炎）を強化の対象とします。
 * ※省略時は「なし」なども含めた全ての属性が対象となります。
 * 
 * <EnhanceTargetSkillType:1>
 * スキルタイプ01（魔法）を強化の対象とします。
 * ※省略時はプラグインパラメータで設定したスキルタイプが対象となります。
 * 
 * ◆強化内容を指定
 * 以下で強化内容を個別に指定できます。
 * 省略した場合は、プラグインパラメータの初期値が適用されます。
 * 一つでも入力すると初期値は適用されなくなります。
 * 
 * <EnhanceDamageRate:150>
 * 強化時のダメージを１．５倍にします。
 * 
 * <EnhanceMpCostRateRate:50>
 * 強化時の消費ＭＰを０．５倍にします。
 * 
 * <EnhanceTpCostRateRate:50>
 * 強化時の消費ＴＰを０．５倍にします。
 * 
 * <EnhanceSuccessRate:150>
 * 強化時の成功率を１．５倍にします。
 * 
 * <EnhanceStateRate:150>
 * 強化時のステート付加率を１．５倍にします。
 * 
 * -------------------------------------------------------------------
 * ■スキル、アイテムのメモ欄
 * -------------------------------------------------------------------
 * <EnhanceElement:2>
 * スキルを属性02（炎）として判定します。
 * これによって、ダメージタイプ「なし」のスキルも強化対象にできます。
 * ※複数指定可（例：<EnhanceElement:2,3,4>または<EnhanceElement:2~4>）
 * 
 * 上述の<EnhanceTargetElement:?>と値が一つでも一致すれば機能します。
 * 値には数値だけではなく、文字列も有効です。
 * 
 * 独自の値を設定すれば、属性以外を条件にすることもできます。
 * 例えば、以下のようにすれば、
 * 特定のスキルだけを強化する装備が作成できます。
 * 
 * ・スキルのメモ欄に<EnhanceElement:A>を記入
 * ・装備のメモ欄に<EnhanceTargetElement:A>を記入
 * 
 * -------------------------------------------------------------------
 * ■その他詳細
 * -------------------------------------------------------------------
 * 当プラグインはパッシブスキルに対応しています。
 * 他と同じようにメモ欄に記入したスキルを、
 * アクターに習得させるだけでＯＫです。
 * 使用する側のスキルとメモ欄の設定を混同しないようにご注意ください。
 * 
 * 一つのオブジェクト（アクター、エネミー、職業、装備、ステート、スキル）
 * に複数の異なる効果を付けることはできません。
 * （例えば、炎魔法は得意だが氷魔法は苦手なアクターなど。）
 * そのような場合も、パッシブスキルやステートを活用して
 * 効果を分割すればＯＫです。
 * 
 * スキルの属性が『通常攻撃』の場合には対応していません。
 * ツクールの仕様では装備の『攻撃時属性』がスキルに反映されるのですが、
 * <EnhanceTargetElement>で強化する属性を指定しても有効にはなりません。
 * 
 * 使用効果の『HP回復』『MP回復』には対応していません。
 * 回復を対象にしたい場合は計算式を使用してください。
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
 * @param EnhanceSkillType
 * @text 対象スキルタイプ
 * @type string
 * @desc 対象とするスキルタイプを数値で入力してください。
 * カンマ区切りで複数指定（例：1,2,3）、空欄で全て有効。
 * 
 * @param EnhanceItem
 * @text アイテムも対象
 * @type boolean
 * @default false
 * @desc アイテムも強化の対象にします。
 * 
 * @param OverlaySettings
 * @text 重複時の設定
 * @type select
 * @option 0:重複無効 @value 0
 * @option 1:重複有効 @value 1
 * @default 1
 * @desc 強化を重ねた場合の挙動です。
 * 重複無効の場合はダメージ倍率の最大値が優先されます。
 * 
 * @param <DefaultEnhance>
 * @text ＜強化の初期値＞
 * @desc 強化時の初期値です。
 * 
 * @param EnhanceDamageRate
 * @parent <DefaultEnhance>
 * @text ダメージ倍率
 * @type number
 * @default 150
 * @desc 強化時のダメージ倍率です。150なら1.5倍。
 * 
 * @param EnhanceMpCostRate
 * @parent <DefaultEnhance>
 * @text 消費ＭＰ倍率
 * @type number
 * @desc 強化時の消費ＭＰ倍率です。50なら0.5倍。
 * 
 * @param EnhanceTpCostRate
 * @parent <DefaultEnhance>
 * @text 消費ＴＰ倍率
 * @type number
 * @desc 強化時の消費ＴＰ倍率です。50なら0.5倍。
 * 
 * @param EnhanceSuccessRate
 * @parent <DefaultEnhance>
 * @text 成功率倍率
 * @type number
 * @desc 強化時の成功率倍率です。150なら1.5倍。
 * 
 * @param EnhanceStateRate
 * @parent <DefaultEnhance>
 * @text ステート付加率倍率
 * @type number
 * @desc 強化時のステート付加率倍率です。150なら1.5倍。
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

const PLUGIN_NAME = "NRP_EnhanceSkill";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pEnhanceSkillType = textToArray(parameters["EnhanceSkillType"]);
const pEnhanceItem = toBoolean(parameters["EnhanceItem"], false);
const pOverlaySettings = toNumber(parameters["OverlaySettings"], 0);
const pEnhanceDamageRate = toNumber(parameters["EnhanceDamageRate"]);
const pEnhanceMpCostRate = toNumber(parameters["EnhanceMpCostRate"]);
const pEnhanceTpCostRate = toNumber(parameters["EnhanceTpCostRate"]);
const pEnhanceSuccessRate = toNumber(parameters["EnhanceSuccessRate"]);
const pEnhanceStateRate = toNumber(parameters["EnhanceStateRate"]);

// Game_Action保持用
let mAction = null;

//-----------------------------------------------------------------------------
// Game_Action
//-----------------------------------------------------------------------------

/**
 * ●ダメージ計算
 */
const _Game_Action_makeDamageValue = Game_Action.prototype.makeDamageValue;
Game_Action.prototype.makeDamageValue = function(target, critical) {
    // 元の計算結果を取得
    let ret = _Game_Action_makeDamageValue.apply(this, arguments);

    // 属性が通常攻撃の場合は対象外
    if (this.item().damage.elementId < 0) {
        return ret;
    }

    // 強化有の場合
    const objects = this.subject().enhanceObjects(this.item());
    if (objects.length > 0) {
        for (const object of objects) {
            // 優先レートを取得
            const rate = getRate(object, object.meta.EnhanceDamageRate, pEnhanceDamageRate);
            // 属性強化率を計算
            if (rate != null) {
                ret *= rate / 100;
            }
        }
        // 四捨五入
        ret = Math.round(ret);
    }

    return ret;
};

// ※こちらでの実装も検討したけど、対象の耐性を参照するプラグインと競合するので保留
// /**
//  * ●属性計算
//  */
// const _Game_Action_calcElementRate = Game_Action.prototype.calcElementRate;
// Game_Action.prototype.calcElementRate = function(target) {
//     const ret = _Game_Action_calcElementRate.apply(this, arguments);

//     // 設定がない場合は対象外
//     if (!pEnhanceDamageRate) {
//         return ret;
//     }

//     // 属性が通常攻撃の場合
//     if (this.item().damage.elementId < 0) {
//         // そのまま
//         return ret;
//     }

//     // 属性一致の場合
//     const object = this.subject().enhanceObjects(this.item());
//     if (object) {
//         // 属性強化率を計算
//         return ret * pEnhanceDamageRate / 100;
//     }

//     // そのまま
//     return ret;
// };

/**
 * ●命中計算
 */
const _Game_Action_itemHit = Game_Action.prototype.itemHit;
Game_Action.prototype.itemHit = function(/*target*/) {
    let ret =_Game_Action_itemHit.apply(this, arguments);

    // 強化有の場合
    const objects = this.subject().enhanceObjects(this.item());
    for (const object of objects) {
        // 優先レートを取得
        const rate = getRate(object, object.meta.EnhanceSuccessRate, pEnhanceSuccessRate);
        // 成功率を計算
        if (rate != null) {
            ret *= rate / 100;
        }
    }

    return ret;
};

/**
 * ●通常攻撃のステート付加
 */
const _Game_Action_itemEffectAddAttackState = Game_Action.prototype.itemEffectAddAttackState;
Game_Action.prototype.itemEffectAddAttackState = function(target, effect) {
    // Game_Actionを保持して、Game_BattlerBase.prototype.attackStatesRateで参照する。
    mAction = this;
    _Game_Action_itemEffectAddAttackState.apply(this, arguments);
    mAction = null;
};

/**
 * ●スキル、アイテム使用時のステート付加
 */
const _Game_Action_itemEffectAddNormalState = Game_Action.prototype.itemEffectAddNormalState;
Game_Action.prototype.itemEffectAddNormalState = function(target, effect) {
    // 強化有の場合
    const objects = this.subject().enhanceObjects(this.item());
    if (objects.length > 0) {
        // 複製して別オブジェクトにする。
        const newEffect = {...effect};
        for (const object of objects) {
            // 優先レートを取得
            const rate = getRate(object, object.meta.EnhanceStateRate, pEnhanceStateRate);
            // ステート付加率（effect.value1）を補正
            if (rate != null) {
                newEffect.value1 *= rate / 100;
            }
        }
        _Game_Action_itemEffectAddNormalState.call(this, target, newEffect);
        return;
    }

    // そのまま
    _Game_Action_itemEffectAddNormalState.apply(this, arguments);
};

//-----------------------------------------------------------------------------
// Game_BattlerBase
//-----------------------------------------------------------------------------

/**
 * ●通常攻撃のステート付加率
 */
const _Game_BattlerBase_attackStatesRate = Game_BattlerBase.prototype.attackStatesRate;
Game_BattlerBase.prototype.attackStatesRate = function(stateId) {
    let ret =_Game_BattlerBase_attackStatesRate.apply(this, arguments);

    // Game_Action.prototype.itemEffectAddAttackStateから引き継ぎ
    if (mAction) {
        // 強化有の場合
        const objects = this.enhanceObjects(mAction.item());
        for (const object of objects) {
            // 優先レートを取得
            const rate = getRate(object, object.meta.EnhanceStateRate, pEnhanceStateRate);
            // ステート付加率を補正
            if (rate != null) {
                ret *= rate / 100;
            }
        }
    }

    return ret;
};

/**
 * ●消費ＭＰ
 */
const _Game_BattlerBase_skillMpCost = Game_BattlerBase.prototype.skillMpCost;
Game_BattlerBase.prototype.skillMpCost = function(skill) {
    // 強化有の場合
    const objects = this.enhanceObjects(skill);
    if (objects.length > 0) {
        // 複製して別オブジェクトにする。
        const newSkill = {...skill};
        for (const object of objects) {
            // 優先レートを取得
            const rate = getRate(object, object.meta.EnhanceMpCostRate, pEnhanceMpCostRate);
            // 消費ＭＰを補正
            if (rate != null) {
                newSkill.mpCost *= rate / 100;
            }
        }
        // 元の処理を呼び出し（切捨も実行される。）
        return _Game_BattlerBase_skillMpCost.call(this, newSkill);
    }

    // 一致がない場合はそのまま
    return _Game_BattlerBase_skillMpCost.apply(this, arguments);
};

/**
 * ●消費ＴＰ
 */
const _Game_BattlerBase_skillTpCost = Game_BattlerBase.prototype.skillTpCost;
Game_BattlerBase.prototype.skillTpCost = function(skill) {
    // 強化有の場合
    const objects = this.enhanceObjects(skill);
    if (objects.length > 0) {
        // 複製して別オブジェクトにする。
        const newSkill = {...skill};
        for (const object of objects) {
            // 優先レートを取得
            const rate = getRate(object, object.meta.EnhanceTpCostRate, pEnhanceTpCostRate);
            // 消費ＴＰを補正
            if (rate != null) {
                newSkill.tpCost *= rate / 100;
            }
        }
        // ＭＰと異なり切捨処理がないので、ここで実行する。
        newSkill.tpCost = Math.floor(newSkill.tpCost);
        // 元の処理を呼び出し
        return _Game_BattlerBase_skillTpCost.call(this, newSkill);
    }

    // 一致がない場合はそのまま
    return _Game_BattlerBase_skillTpCost.apply(this, arguments);
};

/**
 * 【独自】強化の対象オブジェクトを取得する。
 */
Game_BattlerBase.prototype.enhanceObjects = function(item) {
    const objects = [];

    // アイテムの場合
    if (DataManager.isItem(item)) {
        // 対象外なら終了
        if (!pEnhanceItem) {
            return objects;
        }
    }

    // 属性ＩＤを配列で定義（複数属性も考慮）
    let elementIds = [];
    // スキルのダメージタイプの属性を取得
    elementIds[0] = item.damage.elementId;
    // 属性の指定がある場合は上書き
    if (item.meta.EnhanceElement) {
        elementIds = textToArray(item.meta.EnhanceElement);
    }

    // スキルの所属するスキルタイプを取得
    const skilltype = item.stypeId;

    // メモ欄を参照するオブジェクトを全取得
    let traitObjects = this.traitObjects();
    // スキルが有効な場合はパッシブスキルとして連結
    // ※通常はアクターのみ
    if (this.skills) {
        traitObjects = traitObjects.concat(this.skills());
    }

    for (const object of traitObjects) {
        // スキルの場合
        if (DataManager.isSkill(item)) {
            // 有効とするスキルタイプを取得
            let enhanceSkillType = pEnhanceSkillType;
            // スキルタイプの指定がある場合は上書き
            if (object.meta.EnhanceTargetSkillType) {
                enhanceSkillType = textToArray(object.meta.EnhanceTargetSkillType);
            }
            // スキルタイプが不一致の場合は対象外なので次へ
            if (enhanceSkillType.length > 0 && !enhanceSkillType.includes(skilltype)) {
                continue;
            }
        }

        // 属性指定があれば、配列変換して取得
        if (object.meta.EnhanceTargetElement) {
            const enhanceTargetElementArray = textToArray(object.meta.EnhanceTargetElement);

            // 属性一致した！
            if (enhanceTargetElementArray.some(e => elementIds.includes(e))) {
                // 重複無効の場合、かつ二つ目以降の場合
                if (pOverlaySettings == 0 && objects.length > 0) {
                    // より優先度が高いオブジェクトかどうかを判定
                    if (isPriorityObject(object, objects)) {
                        objects.pop();
                    } else {
                        continue;
                    }
                }
                // 該当のオブジェクトを追加
                objects.push(object);
            }

        // スキルタイプの指定があれば、配列変換して取得
        } else if (object.meta.EnhanceTargetSkillType) {
            const enhanceTargetSkillTypeArray = textToArray(object.meta.EnhanceTargetSkillType);

            // スキルタイプが一致した！
            if (enhanceTargetSkillTypeArray.includes(item.stypeId)) {
                // 重複無効の場合、かつ二つ目以降の場合
                if (pOverlaySettings == 0 && objects.length > 0) {
                    const oldObject = objects[0];
                    // 旧レートを取得
                    const oldRate = getRate(oldObject.meta.EnhanceDamageRate, pEnhanceDamageRate);
                    // 新レートを取得
                    const newRate = getRate(object.meta.EnhanceDamageRate, pEnhanceDamageRate);
                    // 新レートのほうが高い場合は現在の要素を削除して入替
                    if (newRate > oldRate) {
                        objects.pop();
                    // 現在値のほうが高い場合は何もせず次へ
                    } else {
                        continue;
                    }
                }
                // 該当のオブジェクトを追加
                objects.push(object);
            }
            
        // それ以外は全対象として反映
        } else if (isEnhanceDetail(object)) {
            objects.push(object);
        }
    }

    return objects;
};

// ----------------------------------------------------------------------------
// 共通関数
// ----------------------------------------------------------------------------

/**
 * ●優先度の高いオブジェクトかどうかを判定する。
 */
function isPriorityObject(newObject, oldObjects) {
    // 旧レートを取得
    const oldObject = oldObjects[0];
    const oldRate = getRate(oldObject.meta.EnhanceDamageRate, pEnhanceDamageRate);
    // 新レートを取得
    const newRate = getRate(newObject.meta.EnhanceDamageRate, pEnhanceDamageRate);
    // 新レートのほうが高い場合
    if (newRate > oldRate) {
        return true;
    }
    return false;
}

/**
 * ●オブジェクトが強化対象かどうかの判定
 */
function isEnhanceDetail(object) {
    // いずれかの設定がある場合、強化対象として判定
    if (object.meta.EnhanceDamageRate
            || object.meta.EnhanceMpCostRate
            || object.meta.EnhanceTpCostRate
            || object.meta.EnhanceSuccessRate
            || object.meta.EnhanceStateRate) {
        return true;
    }
    return false;
}

/**
 * ●優先して使用する値を取得する。
 */
function getRate(object, metaValue, defaultValue) {
    // 指定値が有効な場合はそちらを使用
    if (metaValue != null) {
        return metaValue
    // その他の指定値も存在しない場合はデフォルト値を使用
    } else if (!isEnhanceDetail(object)) {
        return defaultValue;
    }
    // それ以外はnull
    return null;
}

/**
 * ●文字列を分解して配列に変換する。
 * ※例１："1,2,3" -> [1,2,3]
 * ※例２："1~3" -> [1,2,3]
 */
function textToArray(textArr) {
    const array = [];
    
    // 無効なら処理しない。
    if (textArr === undefined || textArr === null || textArr === "") {
        return array;
    }

    // カンマ区切りでループ
    for (let text of textArr.split(",")) {
        // 空白除去
        text = text.trim();
        // 1~5というように範囲指定の場合
        // ※~が存在する。
        if (text.indexOf("~") >= 0) {
            const rangeVal = text.split("~");
            const rangeStart = eval(rangeVal[0]);
            const rangeEnd = eval(rangeVal[1]);

            // IDの指定範囲で実行
            // 開始のほうが終了より大きい場合は反対に実行
            if (rangeEnd < rangeStart) {
                for (let i = rangeStart; i >= rangeEnd; i--) {
                    array.push(eval(i));
                }
            } else {
                for (let i = rangeStart; i <= rangeEnd; i++) {
                    array.push(eval(i));
                }
            }
            
        // 通常時
        } else {
            try {
                array.push(eval(text));
            // 数式評価できない場合はそのままpush
            } catch (e) {
                array.push(text);
            }
        }
    }
    return array;
}

})();
