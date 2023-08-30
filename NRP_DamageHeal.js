//=============================================================================
// NRP_DamageHeal.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Create traits that restore MP and TP when damaged.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/500558062.html
 *
 * @help Create traits that restore MP and TP when damaged.
 * 
 * -------------------------------------------------------------------
 * [Note (actor, enemy, class, equipment, state, skill, item)]
 * -------------------------------------------------------------------
 * In the note of the object that holds the trait,
 * please include the following.
 * For skills, this is a passive skill
 * that only needs to be learned to function.
 * Also, any of the effects can be stacked.
 * 
 * ◆HP recovery when damaged
 * <DamageHealHp:10>
 * HP recovers 10 points when damaged.
 * Note that it will not heal if the HP is reduced to 0 first.
 * 
 * ◆MP recovery when damaged
 * <DamageHealMp:10>
 * MP recovers 10 points when damaged.
 * 
 * ◆TP recovery when damaged
 * <DamageHealTp:10>
 * TP recovers 10 points when damaged.
 * 
 * Formulas are available for all of the above.
 * In addition, you can refer to the damage taken with "damage".
 * You can refer to the information of skills by "skill".
 * 
 * The following is an example
 * 
 * <DamageHealMp:skill.mpCost>
 * When damage is taken,
 * MP is recovered for the consumption of the skill.
 * 
 * <DamageHealTp:damage * 3/100>
 * TP is recovered for 3% of the damage received.
 * Note that the amount of recovery is rounded off.
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
 * @------------------------------------------------------------------
 * @ Plugin Parameters
 * @------------------------------------------------------------------
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 ダメージ時にＭＰやＴＰを回復
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/500558062.html
 *
 * @help ダメージを受けた際にＭＰやＴＰを回復する特徴を作成します。
 * 
 * -------------------------------------------------------------------
 * ■アクター、エネミー、職業、装備、ステート、スキルのメモ欄
 * -------------------------------------------------------------------
 * 特徴を保有するオブジェクトのメモ欄に以下を記載してください。
 * スキルについては覚えているだけで、機能するパッシブスキルとなります。
 * また、いずれの効果も重ねがけ可能です。
 * 
 * ◆ダメージ時にＨＰ回復
 * <DamageHealHp:10>
 * ダメージを受けた際にＨＰが１０回復します。
 * なお、先にＨＰが０になった場合は回復しません。
 * 
 * ◆ダメージ時にＭＰ回復
 * <DamageHealMp:10>
 * ダメージを受けた際にＭＰが１０回復します。
 * 
 * ◆ダメージ時にＴＰ回復
 * <DamageHealTp:10>
 * ダメージを受けた際にＴＰが１０回復します。
 * 
 * さらにいずれも数式が可能です。
 * また、『damage』で受けたダメージを参照できます。
 * 『skill』でスキルの情報を参照できます。
 * 
 * 以下は例です。
 * 
 * <DamageHealMp:skill.mpCost>
 * ダメージを受けた際に、スキルの消費分のＭＰが回復します。
 * 要するにドラクエのマホキテです。
 * 
 * <DamageHealTp:damage * 3/100>
 * 受けたダメージの３％分だけＴＰが回復します。
 * なお、回復量は四捨五入される仕様です。
 * 
 * -------------------------------------------------------------------
 * ■利用規約
 * -------------------------------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @------------------------------------------------------------------
 * @ プラグインパラメータ
 * @------------------------------------------------------------------
 * 
 * @param ShowValue
 * @text 回復量を表示
 * @type boolean
 * @default true
 * @desc 回復量をポップアップ表示します。
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
/**
 * ●構造体（二重配列）をJSで扱えるように変換
 */
function parseStruct2(arg) {
    var ret = [];

    if (arg) {
        JSON.parse(arg).forEach(function(str) {
            ret.push(JSON.parse(str));
        });
    }

    return ret;
}

const PLUGIN_NAME = "NRP_DamageHeal";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pShowValue = toBoolean(parameters["ShowValue"], false);

// ----------------------------------------------------------------------------
// 共通変数
// ----------------------------------------------------------------------------
let mDamageHealList = [];

// ----------------------------------------------------------------------------
// Game_Action
// ----------------------------------------------------------------------------

/**
 * ●ダメージ処理
 */
const _Game_Action_executeHpDamage = Game_Action.prototype.executeHpDamage;
Game_Action.prototype.executeHpDamage = function(target, value) {
    _Game_Action_executeHpDamage.apply(this, arguments);

    // 値がマイナスの場合は対象外
    if (value < 0) {
        return;
    }

    // eval参照用
    const a = this.subject();
    const b = target;
    const action = this;
    const skill = this.item();
    const damage = value;

    let damageHealHp = 0;
    let damageHealMp = 0;
    let damageHealTp = 0;

    // 各回復量の合計を求める。
    // （最終的に四捨五入するので値をなるべく正確にするため。）
    const traitObjects = getTraitObjects(target);
    for (const object of traitObjects) {
        // ＨＰ回復
        const metaDamageHealHp = object.meta.DamageHealHp;
        if (metaDamageHealHp != null) {
            damageHealHp += eval(metaDamageHealHp);
        }

        // ＭＰ回復
        const metaDamageHealMp = object.meta.DamageHealMp;
        if (metaDamageHealMp != null) {
            damageHealMp += eval(metaDamageHealMp);
        }

        // ＴＰ回復
        const metaDamageHealTp = object.meta.DamageHealTp;
        if (metaDamageHealTp != null) {
            damageHealTp += eval(metaDamageHealTp);
        }
    }

    // ＨＰ回復登録
    if (damageHealHp && target.hp > 0) {
        const healValue = Math.round(damageHealHp);
        mDamageHealList.push({battler:target, type:"hp", value:healValue});
    }

    // ＭＰ回復登録
    if (damageHealMp) {
        const healValue = Math.round(damageHealMp);
        mDamageHealList.push({battler:target, type:"mp", value:healValue});
    }

    // ＴＰ回復登録
    if (damageHealTp) {
        const healValue = Math.round(damageHealTp);
        mDamageHealList.push({battler:target, type:"tp", value:healValue});
    }
};

// ----------------------------------------------------------------------------
// BattleManager
// ----------------------------------------------------------------------------

/**
 * ●アクション終了時
 */
const _BattleManager_endAction = BattleManager.endAction;
BattleManager.endAction = function() {
    _BattleManager_endAction.apply(this, arguments);

    // 対象のバトラーを示す配列
    let damageHealBattlers = [];

    for (const data of mDamageHealList) {
        if (pShowValue) {
            if (data.type == "hp") {
                data.battler.gainHp(data.value);
            } else if (data.type == "mp") {
                data.battler.gainMp(data.value);
            } else if (data.type == "tp") {
                data.battler.gainTp(data.value);
            }
            damageHealBattlers.push(data.battler);
        } else {
            if (data.type == "hp") {
                data.battler.setHp(data.battler.hp + data.value);
            } else if (data.type == "mp") {
                data.battler.setMp(data.battler.mp + data.value);
            } else if (data.type == "tp") {
                data.battler.setTp(data.battler.tp + data.value);
            }
        }
    }

    // 回復量を表示
    if (damageHealBattlers.length > 0) {
        // 重複除去
        damageHealBattlers = Array.from(new Set(damageHealBattlers))
        for (const battler of damageHealBattlers) {
            this._logWindow.displayRegeneration(battler);
        }
    }

    // リストクリア
    mDamageHealList = [];
};

// ----------------------------------------------------------------------------
// 共通関数
// ----------------------------------------------------------------------------

/**
 * ●特徴を保持するオブジェクトを取得
 */
function getTraitObjects(battler) {
    // メモ欄を参照するオブジェクトを全取得
    let traitObjects = battler.traitObjects();
    // パッシブスキルが有効な場合は連結
    // ※通常はアクターのみ
    if (battler.skills) {
        traitObjects = traitObjects.concat(battler.skills());
    }
    return traitObjects;
}

})();
