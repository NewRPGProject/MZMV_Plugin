//=============================================================================
// NRP_TraitsPlus.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.02 Change the traits (regular parameter and element rate) to an additive method.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/483215411.html
 *
 * @help Change the calculation of each item set
 * as a feature to an additive method.
 * While you're at it, you can also fix the specification
 * that gives priority to evasion rate over hit rate.
 * 
 * ------------------------------------------
 * [Explanation of plugin parameters]
 * ------------------------------------------
 * ◆RegularParameterPlus
 * In the standard, the regular parameter correction is calculated
 * by simply multiplying the settings
 * for all of the actors, classes, equips, and states.
 * 
 * For example, suppose you set the following corrections for each piece of equipment.
 * 
 * - Sword: 200% attack power
 * - Armor: 200% attack power
 * - Helmet: 200% attack power
 * 
 * In this case, the total correction will be 800%.
 * Due to the large inflation, it is difficult to adjust the balance.
 * 
 * When this parameter is turned on, the correction is changed to an additive method.
 * A 200% attack power will be interpreted as +100% and added to it.
 * This means that in the above case, the correction will be +300% (original 400%).
 * 
 * Note that the exact calculation is as follows.
 * 
 * "Actor & class additive total" * "Equipment additive total" *
 * "State additive total" * "Buff"
 * 
 * It will only be added to the same category.
 * 
 * ◆ElementRatePlus
 * Change the element rate to an additive method.
 * This allows for a negative element rate,
 * which is not normally possible.
 * 
 * Points below 0% will be reversed positive and negative.
 * This means that you can achieve behaviors such as absorbing element attacks,
 * or undead taking damage from healing magic.
 * 
 * To set a negative element rate, set multiple lines to traits.
 * 
 * e.g.: A combination of 0% element rate and 60% element rate
 *       will result in an element rate of -40%.
 *       This means 40% absorption.
 * 
 * The traits you set are valid for Actor, Class, Enemy, and Equipment.
 * A combination of different items, such as "Actor and Equipment",
 * will work the same way if the addition brings the value below 0%.
 * 
 * ◆StateRatePlus
 * ◆DebuffRatePlus
 * ◆SpParameterPlus
 * Change the calculation method of each to an additive method.
 * The gist is the same as for element rate.
 * 
 * Be careful about "SpParameter", because there are some items
 * that will cause balance collapse if you do it carelessly.
 * (e.g.: "MP consumption rate" becomes 0%.)
 * 
 *  * Incidentally, "Ex-Parameters" that are not listed here
 * are additive from the beginning.
 * 
 * ◆FixHitFormula
 * According to the previous specification of RPG Maker MV & MZ,
 * evade rate and hit rate are calculated separately.
 * In other words, even if you equip a weapon with +200% to hit,
 * you will never be able to hit an enemy with 100% evasion.
 * 
 * If this parameter is turned on, the judgment
 * will be based on the hit rate minus the evasion rate.
 * (It is also possible to distinguish between 'attack missed' and 'evaded'.)
 * 
 * ------------------------------------------
 * [Terms]
 * ------------------------------------------
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 * 
 * @param RegularParameterPlus
 * @type boolean
 * @default false
 * @desc Change the regular parameter to an additive method.
 * 
 * @param Battler&ClassPlus
 * @parent RegularParameterPlus
 * @type boolean
 * @default true
 * @desc Change the regular parameter of battler and class to additive.
 * 
 * @param EquipPlus
 * @parent RegularParameterPlus
 * @type boolean
 * @default true
 * @desc Change the regular parameter of equipment to an additive method.
 * 
 * @param StatePlus
 * @parent RegularParameterPlus
 * @type boolean
 * @default true
 * @desc Change the state's regular parameter to an additive one.
 * 
 * @param ElementRatePlus
 * @type boolean
 * @default false
 * @desc Change the element rate to an additive method.
 * Damage reversal, such as absorption, will also be possible.
 * 
 * @param ElementRateMax
 * @parent ElementRatePlus
 * @type number
 * @max 999 @decimals 2
 * @desc The maximum Element Rate. 1.0 equals 100%.
 * If -2.0, the maximum damage is double the normal value.
 * 
 * @param ElementRateMin
 * @parent ElementRatePlus
 * @type number
 * @min -999 @decimals 2
 * @desc The minimum Element Rate. 1.0 equals 100%.
 * If -2.0, then the minimum damage will be minus two times normal.
 * 
 * @param StateRatePlus
 * @type boolean
 * @default false
 * @desc Change the state rate to an additive method.
 * 
 * @param DebuffRatePlus
 * @type boolean
 * @default false
 * @desc Change the debuff rate to an additive method.
 * 
 * @param SpParameterPlus
 * @type boolean
 * @default false
 * @desc Changes SpParameter to an additive method.
 * 
 * @param FixHitFormula
 * @type boolean
 * @default false
 * @desc Changed the hit formula to address the issue of hit and evade being judged separately.
 * 
 * @param ConsiderNegativeEva
 * @parent FixHitFormula
 * @type boolean
 * @default true
 * @desc If the evasion rate is negative, modify it so that it has a higher chance of hitting than it should.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.02 特徴（能力補正や属性有効度）を加算方式に変更する。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/483215411.html
 *
 * @help 特徴に設定する各項目の計算を加算方式に変更します。
 * ついでに、命中率より回避率が優先される仕様も修正できます。
 * 
 * ------------------------------------------
 * ■プラグインパラメータの解説
 * ------------------------------------------
 * ◆通常能力値を加算
 * 標準では、通常能力値の補正はアクター、職業、装備、ステートの
 * 全てに設定したものを単純に乗算して計算を行います。
 * 
 * 例えば、各装備に対して以下のように補正を設定したとします。
 * 
 * ・剣：攻撃力２００％
 * ・鎧：攻撃力２００％
 * ・兜：攻撃力２００％
 * 
 * この場合、合計で８００％の補正になります。
 * 大きなインフレが起こるため、バランス調整が困難です。
 * 
 * このパラメータをオンにすると、補正を加算方式に変更します。
 * 攻撃力２００％は＋１００％として解釈し、それを加算します。
 * つまり、上記の場合は＋３００％（元の４００％）の補正となります。
 * 
 * なお、正確には以下のように計算されます。
 * 
 * 「アクター＆職業の加算合計」×「装備の加算合計」×「ステートの加算合計」×「能力値強化」
 * 
 * 加算するのは、あくまで同一の分類内に対してとなります。
 * 
 * ◆属性有効度を加算
 * 属性有効度を加算方式に変更します。
 * これにより通常は不可能なマイナスの属性有効度も可能となります。
 * 
 * 0%を下回った分のポイントは正負が反転します。
 * つまり、属性攻撃を吸収したり、アンデッドが
 * 回復魔法を受けてダメージを受けるといった挙動を実現できます。
 * 
 * マイナスの属性有効度を設定するには、複数行を特徴に設定してください。
 * 
 * 例：属性有効度0%と属性有効度60%の組ならば、-40%の属性有効度
 * 　　つまり40%の吸収となります。
 * 
 * 設定する特徴はアクター、職業、敵キャラ、装備などいずれも有効です。
 * 「アクターと装備」など異なる項目の組み合わせでも、
 * 加算によって0%を下回った場合は同じように機能します。
 * 
 * ◆ステート有効度を加算
 * ◆弱体有効度を加算
 * ◆特殊能力値を加算
 * それぞれの計算方法を加算方式に変更します。
 * 要領は属性有効度と同じです。
 * 
 * このうち『特殊能力値』については、
 * 迂闊にやるとバランス崩壊を起こす項目もあるので注意です。
 * ※例：『MP消費率』が0%になるなど。
 * 
 * ちなみに、ここに挙がっていない『追加能力値』は最初から加算方式です。
 * 
 * ◆命中計算式を変更
 * ツクールＭＶ～ＭＺの従来の仕様では、回避率と命中率は別々に計算されます。
 * つまり、命中＋２００％の武器を装備していても、
 * 回避１００％の敵には、絶対に攻撃が当たらない仕様です。
 * 
 * このパラメータをオンにすると、
 * 命中率から回避率を引いた値で判定を行うようになります。
 * ※『攻撃を外した』か『回避された』かの区別も可能です。
 * 
 * ------------------------------------------
 * ■利用規約
 * ------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param RegularParameterPlus
 * @text 通常能力値を加算
 * @type boolean
 * @default false
 * @desc 通常能力値を加算方式に変更します。
 * 
 * @param Battler&ClassPlus
 * @parent RegularParameterPlus
 * @text バトラー＆職業補正を加算
 * @type boolean
 * @default true
 * @desc バトラーおよび職業の通常能力値を加算方式に変更します。
 * 
 * @param EquipPlus
 * @parent RegularParameterPlus
 * @text 装備補正を加算
 * @type boolean
 * @default true
 * @desc 装備の通常能力値を加算方式に変更します。
 * 
 * @param StatePlus
 * @parent RegularParameterPlus
 * @text ステート補正を加算
 * @type boolean
 * @default true
 * @desc ステートの通常能力値を加算方式に変更します。
 * 
 * @param ElementRatePlus
 * @text 属性有効度を加算
 * @type boolean
 * @default false
 * @desc 属性有効度を加算方式に変更します。
 * 吸収などのダメージ反転も可能となります。
 * 
 * @param ElementRateMax
 * @parent ElementRatePlus
 * @text 属性有効度の最大値
 * @type number
 * @max 999 @decimals 2
 * @desc 属性有効度の最大値です。1.0が100%に相当します。
 * 2.0ならば、通常の二倍がダメージの最大値になります。
 * 
 * @param ElementRateMin
 * @parent ElementRatePlus
 * @text 属性有効度の最小値
 * @type number
 * @min -999 @decimals 2
 * @desc 属性有効度の最小値です。1.0が100%に相当します。
 * -2.0ならば、通常のマイナス二倍がダメージの最小値になります。
 * 
 * @param StateRatePlus
 * @text ステート有効度を加算
 * @type boolean
 * @default false
 * @desc ステート有効度を加算方式に変更します。
 * 
 * @param DebuffRatePlus
 * @text 弱体有効度を加算
 * @type boolean
 * @default false
 * @desc 弱体有効度を加算方式に変更します。
 * 
 * @param SpParameterPlus
 * @text 特殊能力値を加算
 * @type boolean
 * @default false
 * @desc 特殊能力値を加算方式に変更します。
 * 
 * @param FixHitFormula
 * @text 命中計算式を変更
 * @type boolean
 * @default false
 * @desc 命中計算式を変更し、命中と回避が別々に判定される問題に対処します。
 * 
 * @param ConsiderNegativeEva
 * @parent FixHitFormula
 * @text マイナスの回避率を考慮
 * @type boolean
 * @default true
 * @desc 回避率がマイナスの場合、本来の命中率よりも高確率で命中するように修正します。
 */

(function() {
"use strict";

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

const PLUGIN_NAME = "NRP_TraitsPlus";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pRegularParameterPlus = toBoolean(parameters["RegularParameterPlus"], false);
const pBattlerClassPlus = toBoolean(parameters["Battler&ClassPlus"], true);
const pEquipPlus = toBoolean(parameters["EquipPlus"], true);
const pStatePlus = toBoolean(parameters["StatePlus"], true);
const pElementRatePlus = toBoolean(parameters["ElementRatePlus"], false);
const pElementRateMax = toNumber(parameters["ElementRateMax"]);
const pElementRateMin = toNumber(parameters["ElementRateMin"]);
const pStateRatePlus = toBoolean(parameters["StateRatePlus"], false);
const pDebuffRatePlus = toBoolean(parameters["DebuffRatePlus"], false);
const pSpParameterPlus = toBoolean(parameters["SpParameterPlus"], false);
const pFixHitFormula = toBoolean(parameters["FixHitFormula"], false);
const pConsiderNegativeEva = toBoolean(parameters["ConsiderNegativeEva"], true);

//----------------------------------------
// 通常能力値を加算
//----------------------------------------
if (pRegularParameterPlus) {
    /**
     * 【独自】特徴を保有するバトラー系オブジェクトの取得
     * ※バトラー本体と職業を合わせたオブジェクト
     */
    Game_Actor.prototype.traitBattlerObjects = function() {
        let objects = [];
        // アクター＆通常職業
        objects.push(this.actor(), this.currentClass());
        // SimplePassiveSkillMZ.jsに対応
        if (this.passiveSkills) {
            objects = objects.concat(this.passiveSkills());
        }
        return objects;
    };

    /**
     * 【独自】特徴を保有するバトラー系オブジェクトの取得
     * ※バトラー本体のみ
     */
    Game_Enemy.prototype.traitBattlerObjects = function() {
        const objects = [];
        objects.push(this.enemy());
        return objects;
    };

    /**
     * ●パラメータの取得
     */
    Game_BattlerBase.prototype.param = function(paramId) {
        // 基本値
        let value = this.paramBasePlus(paramId);
        // バトラー＆職業補正
        if (pBattlerClassPlus) {
            value *= this.paramPlusRateAtObjects(paramId, this.traitBattlerObjects());
        } else {
            value *= this.paramRateAtObjects(paramId, this.traitBattlerObjects());
        }
        // 装備補正（アクターのみ）
        if (this.equips) {
            if (pEquipPlus) {
                value *= this.paramPlusRateAtObjects(paramId, this.equips().filter(equip => equip));
            } else {
                value *= this.paramRateAtObjects(paramId, this.equips().filter(equip => equip));
            }
        }
        // ステート補正
        if (pStatePlus) {
            value *= this.paramPlusRateAtObjects(paramId, this.states());
        } else {
            value *= this.paramRateAtObjects(paramId, this.states());
        }
        // バフ補正
        value *= this.paramBuffRate(paramId);

        const maxValue = this.paramMax(paramId);
        const minValue = this.paramMin(paramId);
        return Math.round(value.clamp(minValue, maxValue));
    };

    /**
     * 【独自】オブジェクト配列を指定して、その倍率を取得（乗算方式）
     */
    Game_BattlerBase.prototype.paramRateAtObjects = function(paramId, traitObjects) {
        return this.traitsAtObjects(Game_BattlerBase.TRAIT_PARAM, paramId, traitObjects);
    };

    /**
     * 【独自】オブジェクト配列、コード、ＩＤを指定して、その特徴の値を乗算
     */
    Game_BattlerBase.prototype.traitsAtObjects = function(code, id, traitObjects) {
        const traits = this.traitsWithIdAtObjects(code, id, traitObjects);

        // 乗算
        return traits.reduce((r, trait) => r * trait.value, 1);
    };

    /**
     * 【独自】オブジェクト配列を指定して、その倍率を取得（加算方式）
     */
    Game_BattlerBase.prototype.paramPlusRateAtObjects = function(paramId, traitObjects) {
        return this.traitsPlusAtObjects(Game_BattlerBase.TRAIT_PARAM, paramId, traitObjects);
    };

    /**
     * 【独自】オブジェクト配列、コード、ＩＤを指定して、その特徴の値を加算
     */
    Game_BattlerBase.prototype.traitsPlusAtObjects = function(code, id, traitObjects) {
        const traits = this.traitsWithIdAtObjects(code, id, traitObjects);

        // 加算
        return traits.reduce((r, trait) => r - (1 - trait.value), 1);
    };

    /**
     * 【独自】オブジェクト配列、コード、ＩＤを指定して、その特徴を取得
     */
    Game_BattlerBase.prototype.traitsWithIdAtObjects = function(code, id, traitObjects) {
        return this.allTraitsAtObjects(traitObjects).filter(
            trait => trait.code === code && trait.dataId === id
        );
    };

    /**
     * 【独自】オブジェクト配列を指定して、その特徴を取得
     */
    Game_BattlerBase.prototype.allTraitsAtObjects = function(traitObjects) {
        // 空白除去
        const newTraitObjects = traitObjects.filter(obj => obj);
        return newTraitObjects.reduce((r, obj) => r.concat(obj.traits), []);
    };

    /**
     * ●ＭＺにのみ存在する関数を追加
     */
    if (!Game_BattlerBase.prototype.paramBasePlus) {
        Game_BattlerBase.prototype.paramBasePlus = function(paramId) {
            return Math.max(0, this.paramBase(paramId) + this.paramPlus(paramId));
        };
    }
}

//----------------------------------------
// 属性有効度を加算
//----------------------------------------
if (pElementRatePlus) {
    /**
     * 【上書】対象の属性有効度
     */
    Game_BattlerBase.prototype.elementRate = function(elementId) {
        // 指定属性の特徴を取得
        const traits = this.traitsWithId(Game_BattlerBase.TRAIT_ELEMENT_RATE, elementId);

        /**
         * 初期値1.0（100%）から耐性分だけ減算していく。
         * 例：属性有効度が30%なら、70%の耐性とみなす。
         * 　　演算結果は0.3となる。
         * 
         * また、複数の耐性を重複登録することで100%超の耐性（＝吸収）を獲得可
         * 例：属性有効度0%＋属性有効度60%ならば、140%の耐性
         * 　　演算結果は-0.4、つまり40%の吸収となる。
         */
        let rate = traits.reduce((r, trait) => r - (1 - trait.value), 1);

        // 最大値を越えた場合
        if (pElementRateMax !== undefined && rate > pElementRateMax) {
            rate = pElementRateMax;

        // 最小値を下回った場合
        } else if (pElementRateMin !== undefined && rate < pElementRateMin) {
            rate = pElementRateMin;
        }

        return rate;
    };
}

//----------------------------------------
// ステート有効度を変更
//----------------------------------------
if (pStateRatePlus) {
    /**
     * 【上書】対象のステート有効度
     */
    Game_BattlerBase.prototype.stateRate = function(stateId) {
        // 指定属性の特徴を取得
        const traits = this.traitsWithId(Game_BattlerBase.TRAIT_STATE_RATE, stateId);
        // ステート耐性を加算して、ステート有効度を求める
        return traits.reduce((r, trait) => r - (1 - trait.value), 1);
    };
}

//----------------------------------------
// 弱体有効度を変更
//----------------------------------------
if (pDebuffRatePlus) {
    /**
     * 【上書】対象の弱体有効度
     */
    Game_BattlerBase.prototype.debuffRate = function(paramId) {
        // 指定属性の特徴を取得
        const traits = this.traitsWithId(Game_BattlerBase.TRAIT_DEBUFF_RATE, paramId);
        // 弱体有効度を求める
        return traits.reduce((r, trait) => r - (1 - trait.value), 1);
    };
}

//----------------------------------------
// 特殊能力値を変更
//----------------------------------------
if (pSpParameterPlus) {
    /**
     * 【上書】対象の特殊能力値
     */
    Game_BattlerBase.prototype.sparam = function(sparamId) {
        // 指定属性の特徴を取得
        const traits = this.traitsWithId(Game_BattlerBase.TRAIT_SPARAM, sparamId);
        // 特殊能力値を求める
        const value = traits.reduce((r, trait) => r - (1 - trait.value), 1);
        // 最低でも0を返す。
        return Math.max(value, 0);
    };
}

//----------------------------------------
// 命中計算式を変更
//----------------------------------------
if (pFixHitFormula) {
    let mApplyTarget;
    let mAction;

    /**
     * ●効果適用
     */
    const _Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function(target) {
        // result.isHit()内で参照するための変数を設定
        mApplyTarget = target;
        mAction = this;

        _Game_Action_apply.apply(this, arguments);
    };

    /**
     * ●アクション結果の初期化
     */
    const _Game_ActionResult_clear = Game_ActionResult.prototype.clear;
    Game_ActionResult.prototype.clear = function() {
        _Game_ActionResult_clear.apply(this, arguments);

        // 命中状況確定フラグ
        this._isHitConfirm = false;
    };

    /**
     * ●命中判定
     * ※本来の命中計算はGame_Action.prototype.applyだが、
     * 　上書を避けるため、そちらは無視してこちらで処理する。
     */
    const _Game_ActionResult_isHit = Game_ActionResult.prototype.isHit;
    Game_ActionResult.prototype.isHit = function() {
        // 命中状況が確定していない初回のみ実施
        if (!this._isHitConfirm) {
            let target = mApplyTarget;
            let action = mAction;
            let result = this;

            // ミス乱数
            let missValue = Math.random();
            // 命中率
            let hitValue = action.itemHit(target);
            // ミス乱数 >= 命中率の場合はミス
            let missed = (result.used && missValue >= hitValue);
            // 命中率からミス乱数を減算
            hitValue -= missValue;
            // 残りの命中率 < 回避値なら回避
            let evaded = (result.used && hitValue < action.itemEva(target));

            // ミス＆回避ならば、ミスのみ有効
            if (missed && evaded) {
                evaded = false;

            // ミスなのに回避失敗ならば、ミスも解除
            // ※マイナスの回避補正によって発生
            // ※マイナスの回避率を考慮がオンの場合のみ
            } else if (pConsiderNegativeEva && missed && !evaded) {
                missed = false;
            }

            result.missed = missed;
            result.evaded = evaded;


            // 命中状況を確定
            this._isHitConfirm = true;
        }

        return _Game_ActionResult_isHit.apply(this, arguments);
    };
}

})();
