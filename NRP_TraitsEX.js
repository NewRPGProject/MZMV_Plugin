//=============================================================================
// NRP_TraitsEX.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.04 Create special traits.
 * @orderAfter NRP_TraitsPlus
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/488957733.html
 *
 * @help Create special traits.
 * 
 * For each object (actor, enemy, class, equipment, state, and skill),
 * special traits can be assigned.
 * As for skills, they are passive skills
 * that only need to be learned to be effective.
 * 
 * For example, the following traits can be set
 * 
 * - Change the damage inflicted and damage received multiplier.
 * - Change the duration turn of the state.
 * - Become invincible and immune to all effects.
 * 
 * -------------------------------------------------------------------
 * [Change in Damage Multiplier]
 * -------------------------------------------------------------------
 * Specify the following in the notes field of the state.
 * 
 * <InflictedDamageRate:1.5>
 * 1.5 times the damage it inflicts.
 * 1.0 corresponds to 100%.
 * 
 * Formulas are also valid.
 * 
 * ◆e.g.: Damage inflicted increases as HP decreases (up to 200%)
 * <InflictedDamageRate:1 + 1*(1 - a.hp/a.mhp)>
 * 
 * <ReceivedDamageRate:1.5>
 * 1.5 times the damage received.
 * 1.0 corresponds to 100%.
 * 
 * The following are conditions for determining
 * the skill that changes the damage rate.
 * Use in combination.
 * 
 * <DamageRateDamageType:1,5>
 * Change the damage rate for damage type 1,5 skills.
 * 1:HP Damage, 2:MP Damage, 3:HP Recover, 4:MP Recover,
 * 5:HP Drain, 6:MP Drain
 * If omitted, the plugin parameter settings are used.
 * If left blank, all are valid.
 * 
 * <DamageRateHitType:1>
 * Change the damage rate for hit type 1 skills.
 * 0:Certain Hit, 1:Physical Attack, 2:Magic Attack
 * If omitted, the plugin parameter settings are used.
 * If left blank, all are valid.
 * 
 * <DamageRateSkillType:0,2>
 * Change the damage rate for skill type 0,2 skills.
 * Skill types can be set in the database.
 * Normally, 1 is Magic, 2:Special.
 * Also, 0 is treated as a normal attack.
 * If omitted, the plugin parameter settings are used.
 * If left blank, all are valid.
 * 
 * <InflictedDamageScript:[Script]>
 * Scripts are executed according to the damage multiplier to be inflicted.
 * Use with <InflictedDamageRate>.
 * 
 * ◆e.g.: Performs a flush when the damage multiplier is 1.5 or greater.
 * <InflictedDamageScript:1.5 <= rate ? $gameScreen.startFlash([255,255,255,128], 10) : null>
 * 
 * -------------------------------------------------------------------
 * [Change of state's duration in turns]
 * -------------------------------------------------------------------
 * Specify the following in the note of the object.
 * 
 * <InflictedStateTurn:1>
 * Extends the duration turn of the state inflicted by the battler by 1.
 * 
 * <ReceivedStateTurn:-1>
 * Decreases the duration turn of states received by the battler by 1.
 * 
 * <TargetStateTurnType:test>
 * Set the state turn type to "test".
 * This is used in combination with the above-mentioned duration turn
 * when you want to limit the states that are affected.
 * 
 * Specify the following in the note of the state
 * for which you wish to extend the turn further
 * <StateTurnType:test>
 * 
 * ※Multiple items can be specified, separated by commas.
 * (e.g.: <StateTurnType:test1,test2>)
 * 
 * ◆e.g.: Classes with traits
 *   that prolong the state of the poison inflicted.
 * 
 * Specify the following two items in the class note.
 * <InflictedStateTurn:1>
 * <TargetStateTurnType:poison>
 * 
 * Specify the following in the note for the poison state.
 * <StateTurnType:poison>
 * 
 * -------------------------------------------------------------------
 * [Invincible]
 * -------------------------------------------------------------------
 * Specify the following in the notes field of the state.
 * 
 * <Invincible:1>
 * It becomes invincible and immune to all skills.
 * If the number is 0, the result is hidden; if it is 1,
 * it is treated as a miss; if it is 2, it is treated as an evade.
 * 
 * You can also create a skill that ignores invincibility and hits
 * by specifying the following in the note field of the skill
 * 
 * <IgnoreInvincible>
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
 * 
 * @param <DamageRate>
 * 
 * @param DR_DamageType
 * @parent <DamageRate>
 * @type string
 * @default 1,5
 * @desc Damage type targeted for damage rate. 0:None, 1:HP Damage, 2:MP Damage, 3:HP Recover, 4:MP Recover, 5:HP Drain, 6:MP Drain
 * 
 * @param DR_HitType
 * @parent <DamageRate>
 * @type string
 * @desc The hit type of the skill targeted for damage rate.
 * 0:Certain Hit, 1:Physical Attack, 2:Magic Attack
 * 
 * @param DR_SkillType
 * @parent <DamageRate>
 * @type string
 * @desc Skill type to be targeted for damage rate.
 * With standard, 0: Normal Attack, 1: Magic, 2: Special.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.04 特殊な特徴を実現します。
 * @orderAfter NRP_TraitsPlus
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/488957733.html
 *
 * @help 特殊な特徴を実現します。
 * 
 * 各オブジェクト（アクター、エネミー、職業、装備、ステート、スキル）
 * に対して、特殊な特徴を設定できます。
 * スキルについては覚えているだけで、発揮するパッシブスキルとなります。
 * 
 * 例えば、以下のような特徴を設定できます。
 * 
 * ・与えるダメージ、受けるダメージ倍率を変更する。
 * ・ステートの継続ターンを変更する。
 * ・無敵になってあらゆる効果を受けなくする。
 * 
 * -------------------------------------------------------------------
 * ■ダメージ倍率の変更
 * -------------------------------------------------------------------
 * オブジェクトのメモ欄に以下を指定してください。
 * 
 * <InflictedDamageRate:1.5>
 * 与えるダメージを１．５倍にします。
 * 1.0が100%に相当します。
 * 
 * また、数式も有効です。
 * 
 * ◆例：ＨＰが減るほど与ダメージ増加（最大２００％）
 * <InflictedDamageRate:1 + 1*(1 - a.hp/a.mhp)>
 * 
 * <ReceivedDamageRate:1.5>
 * 受けるダメージを１．５倍にします。
 * 1.0が100%に相当します。
 * 
 * 以降はダメージ倍率の変更を行うスキルを判定するための条件です。
 * 組み合わせて使用してください。
 *
 * <DamageRateDamageType:1,5>
 * ダメージタイプ1,5のスキルのダメージ倍率を変更します。
 * 1:HPダメージ, 2:MPダメージ, 3:HP回復, 4:MP回復, 5:HP吸収, 6:MP回復です。
 * 省略時はプラグインパラメータの設定を使用します。
 * 空欄にした場合は全て有効となります。
 * 
 * <DamageRateHitType:1>
 * 命中タイプ1のスキルのダメージ倍率を変更します。
 * 0:必中, 1:物理攻撃, 2:魔法攻撃です。
 * 省略時はプラグインパラメータの設定を使用します。
 * 空欄にした場合は全て有効となります。
 * 
 * <DamageRateSkillType:0,2>
 * スキルタイプ0,2のスキルのダメージ倍率を変更します。
 * スキルタイプはデータベースで設定できます。
 * 通常だと1は魔法、2:必殺技です。
 * また、0は通常攻撃として扱われます。
 * 省略時はプラグインパラメータの設定を使用します。
 * 空欄にした場合は全て有効となります。
 * 
 * <InflictedDamageScript:[Script]>
 * 与えるダメージ倍率によってスクリプトを実行します。
 * <InflictedDamageRate>とセットで使用してください。
 * 
 * ◆例：ダメージ倍率が１．５以上の場合にフラッシュを実行します。
 * <InflictedDamageScript:1.5 <= rate ? $gameScreen.startFlash([255,255,255,128], 10) : null>
 * 
 * -------------------------------------------------------------------
 * ■ステート継続ターンの変更
 * -------------------------------------------------------------------
 * オブジェクトのメモ欄に以下を指定してください。
 * 
 * <InflictedStateTurn:1>
 * 与えたステートの継続ターンを1延長します。
 * 
 * <ReceivedStateTurn:-1>
 * 受けたステートの継続ターンを1減らします。
 * 
 * <TargetStateTurnType:test>
 * ステートターンタイプを"test"に設定します。
 * 上述の継続ターンを影響させるステートを限定させたい場合に
 * 組み合わせて使用します。
 * 
 * さらにターンを延長したいステートのメモ欄に以下を指定してください。
 * <StateTurnType:test>
 * 
 * ※カンマ区切りで複数指定も可能です。
 * （例：<StateTurnType:test1,test2>）
 * 
 * ◆例：与えた毒ステートを延長する特徴を持った職業
 * 職業のメモ欄に以下２つを指定
 * <InflictedStateTurn:1>
 * <TargetStateTurnType:poison>
 * 
 * 毒ステートのメモ欄に以下を指定
 * <StateTurnType:poison>
 * 
 * -------------------------------------------------------------------
 * ■無敵
 * -------------------------------------------------------------------
 * オブジェクトのメモ欄に以下を指定してください。
 * 
 * <Invincible:1>
 * 無敵になってあらゆるスキルを受けつけなくなります。
 * 数値が0なら結果非表示, 1ならミス、2なら回避として扱います。
 * 
 * また、スキルのメモ欄に以下を指定すると、
 * 無敵状態を無視して命中するスキルを作成できます。
 * 
 * <IgnoreInvincible>
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
 * @param <DamageRate>
 * @text ＜ダメージ倍率関連＞
 * 
 * @param DR_DamageType
 * @parent <DamageRate>
 * @text 対象のダメージタイプ
 * @type string
 * @default 1,5
 * @desc ダメージ倍率を変更するダメージタイプ。複数可。0:なし, 1:HPﾀﾞﾒｰｼﾞ, 2:MPﾀﾞﾒｰｼﾞ, 3:HP回復, 4:MP回復, 5:HP吸収, 6:MP吸収
 * 
 * @param DR_HitType
 * @parent <DamageRate>
 * @text 対象の命中タイプ
 * @type string
 * @desc ダメージ倍率を変更するスキルの命中タイプ。複数可。
 * 0:必中, 1:物理攻撃, 2:魔法攻撃
 * 
 * @param DR_SkillType
 * @parent <DamageRate>
 * @text 対象のスキルタイプ
 * @type string
 * @desc ダメージ倍率を変更するスキルタイプ。複数可。
 * 標準だと0:通常攻撃. 1:魔法, 2:必殺技となります。
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

const PLUGIN_NAME = "NRP_TraitsEX";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pDR_DamageType = textToArray(parameters["DR_DamageType"]);
const pDR_HitType = textToArray(parameters["DR_HitType"]);
const pDR_SkillType = textToArray(parameters["DR_SkillType"]);

// ----------------------------------------------------------------------------
// Game_Action
// ----------------------------------------------------------------------------

// 対象保持用
let mTarget = null;

/**
 * ●アクション効果適用
 */
const _Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    mTarget = target;

    // 無敵無効スキルなら以降を処理しない。
    if (this.item().meta.IgnoreInvincible) {
        _Game_Action_apply.apply(this, arguments);
        return;
    }

    for (const object of getTraitObjects(target)) {
        // 無敵ステートがあれば無効化
        const invincible = object.meta.Invincible;
        if (invincible != null) {
            const result = target.result();
            this.subject().clearResult();
            result.clear();

            // 命中状況を確定（※NRP_TraitsPlus.jsとの競合対策）
            if (result._isHitConfirm === false) {
                result._isHitConfirm = true;
            }

            // 0:非表示
            if (invincible == 0 || invincible === true) {
                // 何もしない。
            // 1:ミス
            } else if (invincible == 1) {
                result.used = this.testApply(target);
                result.missed = true;
                result.evaded = false;
                result.physical = this.isPhysical();
                result.drain = this.isDrain();
            // 2:回避
            } else if (invincible == 2) {
                result.used = this.testApply(target);
                result.missed = false;
                result.evaded = true;
                result.physical = this.isPhysical();
                result.drain = this.isDrain();
            }

            // ラストターゲット更新
            // ※ＭＶには存在しない関数
            if (this.updateLastTarget) {
                this.updateLastTarget(target);
            }
            return;
        }
    }
    
    _Game_Action_apply.apply(this, arguments);
};

/**
 * ●対象の評価
 */
const _Game_Action_evaluateWithTarget = Game_Action.prototype.evaluateWithTarget;
Game_Action.prototype.evaluateWithTarget = function(target) {
    mTarget = target;
    
    return _Game_Action_evaluateWithTarget.apply(this, arguments);
};

/**
 * ●ダメージ分散
 * ※処理の都合で各種ダメージ補正をここで行う。
 */
const _Game_Action_applyVariance = Game_Action.prototype.applyVariance;
Game_Action.prototype.applyVariance = function(damage, variance) {
    let value = _Game_Action_applyVariance.apply(this, arguments);

    const subject = this.subject();
    const target = mTarget;

    // eval計算用
    const a = subject;
    const b = target;

    // 行動主体の与ダメージ倍率の計算
    for (const object of getTraitObjects(subject)) {
        const inflictedDamageRate = object.meta.InflictedDamageRate;
        if (inflictedDamageRate != null && isValidDamageRate(this.item(), object)) {
            const rate = eval(inflictedDamageRate);

            // スクリプトを実行
            const inflictedDamageScript = object.meta.InflictedDamageScript;
            if (inflictedDamageScript) {
                eval(inflictedDamageScript);
            }

            value *= rate;
        }
    }

    // 対象者の被ダメージ倍率の計算
    if (target) {
        for (const object of getTraitObjects(target)) {
            const receivedDamageRate = object.meta.ReceivedDamageRate;
            if (receivedDamageRate != null && isValidDamageRate(this.item(), object)) {
                value *= eval(receivedDamageRate);
            }
        }
    }

    return value;
};

/**
 * ●ダメージ倍率の変更が有効かどうかの判定
 */
function isValidDamageRate(actionItem, object) {
    // 有効なダメージタイプでなければ終了
    if (!isTargetDamageType(actionItem, object)) {
        return false;
    // 有効な命中タイプでなければ終了
    } else if (!isTargetHitType(actionItem, object)) {
        return false;
    // 有効なスキルタイプでなければ終了
    } else if (!isTargetSkillType(actionItem, object)) {
        return false;
    }
    // ここまで到達すれば有効
    return true;
}

/**
 * ●有効なダメージタイプかどうか？
 */
function isTargetDamageType(actionItem, object) {
    // チェック対象のダメージタイプ
    let targetDamageType = pDR_DamageType;
    // 個別の指定がある場合は取得
    const metaDamageType = object ? object.meta.DamageRateDamageType : null;
    if (metaDamageType) {
        // 空欄の場合は空配列
        if (metaDamageType === true) {
            targetDamageType = [];
        // それ以外は配列化して取得
        } else {
            targetDamageType = textToArray(metaDamageType);
        }
    }
    // ダメージタイプのチェック
    if (targetDamageType.length && !targetDamageType.includes(actionItem.damage.type)) {
        return false;
    }
    return true;
}

/**
 * ●有効な命中タイプかどうか？
 */
function isTargetHitType(actionItem, object) {
    // チェック対象のスキルタイプ
    let targetHitType = pDR_HitType;
    // 個別の指定がある場合は取得
    const metaHitType = object ? object.meta.DamageRateHitType : null;
    if (metaHitType) {
        // 空欄の場合は空配列
        if (metaHitType === true) {
            targetHitType = [];
        // それ以外は
        } else {
            targetHitType = textToArray(metaHitType);
        }
    }
    // スキルタイプのチェック
    if (targetHitType.length && !targetHitType.includes(actionItem.hitType)) {
        return false;
    }
    return true;
}

/**
 * ●有効なスキルタイプかどうか？
 */
function isTargetSkillType(actionItem, object) {
    // アイテムの場合は有効
    if (DataManager.isItem(actionItem)) {
        return true;
    }

    // チェック対象のスキルタイプ
    let targetSkillType = pDR_SkillType;
    // 個別の指定がある場合は取得
    const metaSkillType = object ? object.meta.DamageRateSkillType : null;
    if (metaSkillType) {
        // 空欄の場合は空配列
        if (metaSkillType === true) {
            targetSkillType = [];
        // それ以外は
        } else {
            targetSkillType = textToArray(metaSkillType);
        }
    }
    // スキルタイプのチェック
    if (targetSkillType.length && !targetSkillType.includes(actionItem.stypeId)) {
        return false;
    }
    return true;
}

// ----------------------------------------------------------------------------
// ステート関連
// ----------------------------------------------------------------------------

// ステートを付加するアクション保持用
let mStateAction = null;

/**
 * ●スキルによるステートの付加
 */
const _Game_Action_itemEffectAddState = Game_Action.prototype.itemEffectAddState;
Game_Action.prototype.itemEffectAddState = function(target, effect) {
    mStateAction = this;
    _Game_Action_itemEffectAddState.apply(this, arguments);
    mStateAction = null;
};

/**
 * ●ステート継続ターンの再設定
 */
const _Game_BattlerBase_resetStateCounts = Game_BattlerBase.prototype.resetStateCounts;
Game_BattlerBase.prototype.resetStateCounts = function(stateId) {
    _Game_BattlerBase_resetStateCounts.apply(this, arguments);

    let subject = null;
    if (mStateAction) {
        subject = mStateAction.subject();
    }

    // eval計算用
    const a = subject;
    const b = this;

    // 付加するステートのターンタイプを取得
    const stateTurnTypes = $dataStates[stateId].meta.StateTurnType;

    // 受けたステートの継続ターンを延長
    for (const object of getTraitObjects(this)) {
        const receivedStateTurn = object.meta.ReceivedStateTurn;
        if (receivedStateTurn != null && isMatchStateTurnType(stateTurnTypes, object)) {
            this._stateTurns[stateId] += eval(receivedStateTurn);
            // 最低でも１ターン
            this._stateTurns[stateId] = Math.max(this._stateTurns[stateId], 1);
        }
    }

    // 与えたステートの継続ターンを延長
    if (subject) {
        for (const object of getTraitObjects(subject)) {
            const inflictedStateTurn = object.meta.InflictedStateTurn;
            if (inflictedStateTurn != null && isMatchStateTurnType(stateTurnTypes, object)) {
                this._stateTurns[stateId] += eval(inflictedStateTurn);
                // 最低でも１ターン
                this._stateTurns[stateId] = Math.max(this._stateTurns[stateId], 1);
            }
        }
    }
};

/**
 * ●ステートターンタイプが一致するかどうか？
 */
function isMatchStateTurnType(stateTurnTypes, object) {
    const targetStateTurnType = object.meta.TargetStateTurnType;
    // タイプの指定がない場合は常に有効
    if (!targetStateTurnType) {
        return true;
    }

    if (stateTurnTypes) {
        // タイプが一つでも一致した場合は有効
        const stateTurnTypeArray = stateTurnTypes.split(",");
        if (stateTurnTypeArray.some(t => t == targetStateTurnType)) {
            return true;
        }
    }

    // それ以外は無効
    return false;
}

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
