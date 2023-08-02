//=============================================================================
// NRP_ChainSkill.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.02 Chain skills together.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @orderAfter SimpleMsgSideViewMZ
 * @orderAfter NRP_CountTimeBattle
 * @orderAfter NRP_MotionSetting
 * @url https://newrpg.seesaa.net/article/498285406.html
 *
 * @help After the execution of a skill,
 * another skill is chained and activated.
 * 
 * They can be activated as separate skills
 * or can be made to look like one skill.
 * 
 * In addition, by setting equipment, classes, and states to.
 * 
 * ◆Example
 * - Skills that deal continuous damage with different elements.
 * - Skills that heal at the same time as attacking.
 * - Skills that have different effects depending
 *   on whether they hit or miss.
 * - Weapons that activate magic after the attack.
 * 
 * -------------------------------------------------------------------
 * [Note (actor, enemy, class, equipment, state, skill, item)]
 * -------------------------------------------------------------------
 * <ChainSkill:100>
 * After the skill is completed, the skill number 100 is chained
 * and activated.
 * If described in the skill itself,
 * it will be activated after that skill.
 * If it is described in an occupation or class,
 * it will be invoked after any skill.
 * 
 * <ChainSkillHit:100>
 * Only when the skill is hit, the skill number 100 is chained
 * and activated.
 * 
 * <ChainSkillMiss:100>
 * Only when the skill fails, the skill No. 100 is chained
 * and activated.
 * 
 * <ChainSkillPercent:50>
 * 50% chance of activating the skill.
 * 100% if omitted. Formula use is allowed.
 * 
 * <ChainSkillType:0,2>
 * Skill type 0,2 skills are targeted for the chaining.
 * With standard, 0: Normal Attack, 2: Special.
 * If omitted, the plugin parameter setting is used.
 * 
 * <ChainSkillDisplayName:[0~2]>
 * Change the display method of chained skill names.
 * 0: Hide, 1: Individually, 2: Continue First Skill
 * If omitted, the plugin parameter setting is used.
 * 
 * <ChainSkillAbortDeath> / <ChainSkillAbortDeath:false>
 * Stops the chained skills when the target dies. (false turns it off).
 * If omitted, the plugin parameter setting is used.
 * 
 * <ChainSkillAbortResist> / <ChainSkillAbortResist:false>
 * If the target has full elemental resistance,
 * the chained skills are stopped.
 * If omitted, the plugin parameter setting is used.
 * 
 * -------------------------------------------------------------------
 * [Note (skill, item)]
 * -------------------------------------------------------------------
 * <ChainSkillPassive>
 * When a skill is used, it enables the chaining of skills
 * by the above objects (actor ~ skill).
 * 
 * <ChainSkillPassive:false>
 * Disables the chaining of skills.
 * 
 * <ChainSkillNoResult>
 * Hides the results of the skills used.
 * 
 * -------------------------------------------------------------------
 * [About Passive Skills]
 * -------------------------------------------------------------------
 * If the Occasion of a skill is set to "Never",
 * the skill functions as a passive skill.
 * 
 * You can create a skill that, just by learning it,
 * activates additional magic,
 * for example, when you use a normal attack or another skill.
 * 
 * -------------------------------------------------------------------
 * [Change the direction depending on hit or miss]
 * -------------------------------------------------------------------
 * The function of this plugin can be applied
 * to change the direction depending on the hit or miss of the skill.
 * ※Note that I do not take into account if the scope is the All, etc.
 * ※Also, three skills are required.
 * 
 * First, set the skill's damage type to None.
 * Then, in the note field, enter the following.
 * 
 * <ChainSkillHit:1>
 * <ChainSkillMiss:2>
 * <ChainSkillNoResult>
 * 
 * This will invoke Skill 1 on a hit and Skill 2 on a miss.
 * For Skill 1, set Hit Type to Certain Hit and enter the actual effect.
 * For Skill 2, set Success to 0%.
 * 
 * -------------------------------------------------------------------
 * [Other Details]
 * -------------------------------------------------------------------
 * - The target of a linked skill is the last target.
 *   If the range is the All, the last one is the target.
 * 
 * - When skills with a range of "User" or "Ally All"
 *   are chained together, the target is automatically switched.
 *   Skills that heal themselves at the same time as attacking, etc.
 *   can be created.
 * 
 * - The effect is only during battle.
 *   It will be invalid if used on the menu screen.
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
 * @param TargetSkillType
 * @type string
 * @default 0,2
 * @desc Skill type to be activated. Multiple are allowed.
 * With standard, 0: Normal Attack, 2: Special.
 * 
 * @param DisplayNameStyle
 * @type select
 * @option 0:Hide @value 0
 * @option 1:Individually @value 1
 * @option 2:Continue First Skill @value 2
 * @default 1
 * @desc How to display the name of the activated skill.
 * If 2, the first skill name is displayed continuously.
 * 
 * @param NoStartMotion
 * @type boolean
 * @default true
 * @desc When activating a chained skill, the start motion is not executed.
 * 
 * @param NoStepBack
 * @type boolean
 * @default true
 * @desc When a connected skill is activated, backtracking is prohibited to smooth the direction.
 * 
 * @param NoMpTpCost
 * @type boolean
 * @default true
 * @desc No MP & TP is consumed when activating a linked skill.
 * 
 * @param IgnoreSkillConditions
 * @type boolean
 * @default true
 * @desc Ignore skill use decisions (e.g., silence state).
 * 
 * @param AbortTargetDeath
 * @type boolean
 * @default false
 * @desc When the target dies, subsequent chained skills are not activated.
 * 
 * @param AbortTargetResist
 * @type boolean
 * @default false
 * @desc If the target is completely resistant to the elements, the chained skills are not triggered.
 * 
 * @param DisableSameSkill
 * @type boolean
 * @default true
 * @desc Duplicate linkage of the same skill is prohibited.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.02 スキルを連結する。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @orderAfter SimpleMsgSideViewMZ
 * @orderAfter NRP_CountTimeBattle
 * @orderAfter NRP_MotionSetting
 * @url https://newrpg.seesaa.net/article/498285406.html
 *
 * @help スキルの実行後に別のスキルを連結して発動します。
 * 別々のスキルとして発動してもよいし、
 * 一つのスキルに見せかけることもできます。
 * 
 * また、装備品や職業、ステートに設定することも可能です。
 * 
 * ◆設定例
 * ・属性の異なる連続ダメージを与えるスキル。
 * ・攻撃と同時に回復するスキル。
 * ・命中か失敗で演出の異なるスキル。
 * ・攻撃後に魔法が発動する武器。
 * 
 * -------------------------------------------------------------------
 * ■アクター、エネミー、職業、装備、ステート、スキル、アイテムのメモ欄
 * -------------------------------------------------------------------
 * <ChainSkill:100>
 * スキル終了後にスキル１００番を連結して発動します。
 * スキル自身に記述すれば、そのスキルの後に発動します。
 * 職業や装備に記述すれば、何らかのスキルの後に発動します。
 * 
 * <ChainSkillHit:100>
 * スキル命中時のみ、スキル１００番を連結して発動します。
 * 
 * <ChainSkillMiss:100>
 * スキル失敗時のみ、スキル１００番を連結して発動します。
 * 
 * <ChainSkillPercent:50>
 * スキルを５０％の確率で発動します。
 * 省略すると１００％になります。数式使用可です。
 * 
 * <ChainSkillType:0,2>
 * スキルタイプ0,2のスキルを連結の対象にします。
 * 通常だと0は通常攻撃、2:必殺技です。
 * 省略時はプラグインパラメータの設定を使用します。
 * 
 * <ChainSkillDisplayName:[0~2]>
 * 連結スキル名の表示方式を変更します。
 * 0:非表示, 1:個別表示, 2:最初のスキルを継続表示
 * 省略時はプラグインパラメータの設定を使用します。
 * 
 * <ChainSkillAbortDeath> / <ChainSkillAbortDeath:false>
 * 対象死亡時に連結スキルを停止します。（falseでオフになります。）
 * 省略時はプラグインパラメータの設定を使用します。
 * 
 * <ChainSkillAbortResist> / <ChainSkillAbortResist:false>
 * 対象に完全な属性耐性がある場合は連結スキルを停止します。
 * 省略時はプラグインパラメータの設定を使用します。
 * 
 * -------------------------------------------------------------------
 * ■スキル、アイテムのメモ欄
 * -------------------------------------------------------------------
 * <ChainSkillPassive>
 * スキルを使用した際、上記のオブジェクト（アクター～スキル）
 * による連結スキルを有効にします。
 * 
 * <ChainSkillPassive:false>
 * 連結スキルを無効にします。
 * 
 * <ChainSkillNoResult>
 * 使用したスキルの結果を非表示にします。
 * 
 * -------------------------------------------------------------------
 * ■パッシブスキルについて
 * -------------------------------------------------------------------
 * スキルの使用可能時を『使用不可』にした場合、
 * そのスキルはパッシブスキルとして機能します。
 * 
 * 習得しているだけで、通常攻撃や他のスキルを使用した場合に、
 * 魔法が追加発動するスキルなどを作成できます。
 * 
 * -------------------------------------------------------------------
 * ■命中・失敗で演出を変更する
 * -------------------------------------------------------------------
 * 当プラグインの機能を応用すれば、スキルの命中・失敗によって、
 * 演出を変更することもできます。
 * ※なお、範囲が全体の場合などは考慮していません。
 * ※また、スキルが３つ必要になります。
 * 
 * まず、スキルのダメージタイプを「なし」にします。
 * そして、メモ欄に以下のように記載します。
 * 
 * <ChainSkillHit:1>
 * <ChainSkillMiss:2>
 * <ChainSkillNoResult>
 * 
 * これによって、命中時にスキル1、失敗時にスキル2が呼び出されます。
 * スキル1は命中タイプを必中にして実際の効果を入力してください。
 * スキル2は成功率を0%にしてください。
 * 
 * -------------------------------------------------------------------
 * ■その他詳細
 * -------------------------------------------------------------------
 * ・連結したスキルの対象は直前に対象となった相手です。
 * 　範囲が全体の場合は最後の一体が対象となります。
 * 
 * ・範囲が『使用者』や『味方全体』のスキルを連結すると、
 * 　自動で対象が切り替わります。
 * 　攻撃と同時に自身を回復するスキルなどが作成できます。
 * 
 * ・効果はあくまで戦闘時のみです。
 * 　メニュー画面で使用した場合は無効となります。
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
 * @param TargetSkillType
 * @text 対象のスキルタイプ
 * @type string
 * @default 0,2
 * @desc 発動対象とするスキルタイプ（パッシブ用）です。複数可。
 * 標準だと0で通常攻撃、2で必殺技が対象になります。
 * 
 * @param DisplayNameStyle
 * @text スキル名の表示法
 * @type select
 * @option 0:非表示 @value 0
 * @option 1:個別表示 @value 1
 * @option 2:継続表示 @value 2
 * @default 1
 * @desc 発動したスキル名の表示方法です。
 * 2ならば、最初のスキル名を継続表示します。
 * 
 * @param NoStartMotion
 * @text 開始モーションの無効化
 * @type boolean
 * @default true
 * @desc 連結スキル発動時の開始モーションを実行しません。
 * 
 * @param NoStepBack
 * @text 後退を禁止
 * @type boolean
 * @default true
 * @desc 連結スキル発動時の後退を禁止し、演出をスムーズにします。
 * 
 * @param NoMpTpCost
 * @text ＭＰＴＰを消費しない
 * @type boolean
 * @default true
 * @desc 連結スキル発動時にＭＰＴＰを消費しません。
 * 
 * @param IgnoreSkillConditions
 * @text スキルの使用判定を無視
 * @type boolean
 * @default true
 * @desc スキルの使用判定（沈黙ステートなど）を無視します。
 * 
 * @param AbortTargetDeath
 * @text 対象死亡時は中断
 * @type boolean
 * @default false
 * @desc 対象死亡時は以降の連結スキルを発動しません。
 * 
 * @param AbortTargetResist
 * @text 対象耐性時は中断
 * @type boolean
 * @default false
 * @desc 対象が属性に対する完全耐性を持つ場合は連結スキルを発動しません。
 * 
 * @param DisableSameSkill
 * @text 同一スキルの重複禁止
 * @type boolean
 * @default true
 * @desc 同一スキルを重複して連結することを禁止します。
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

const PLUGIN_NAME = "NRP_ChainSkill";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pTargetSkillType = textToArray(parameters["TargetSkillType"]);
const pDisplayNameStyle = toNumber(parameters["DisplayNameStyle"], 0);
const pNoStartMotion = toBoolean(parameters["NoStartMotion"], true);
const pNostepBack = toBoolean(parameters["NoStepBack"], true);
const pNoMpTpCost = toBoolean(parameters["NoMpTpCost"], true);
const pIgnoreSkillConditions = toBoolean(parameters["IgnoreSkillConditions"], true);
const pAbortTargetDeath = toBoolean(parameters["AbortTargetDeath"], false);
const pAbortTargetResist = toBoolean(parameters["AbortTargetResist"], false);
const pDisableSameSkill = toBoolean(parameters["DisableSameSkill"], false);

// ----------------------------------------------------------------------------
// 共通変数
// ----------------------------------------------------------------------------

// 元のアクション
let mOriginalAction = null;
// 発動済スキル
let mChainedObjects = []; // 連結元スキル
let mChainedSkillIds = []; // 連結先スキル
// スキル名非表示
let mIsNotDisplay = false;
// 連結実行判定
let mIsChain = false;
// 最終対象保持用
let mLastTargetIndex = 0;
// 命中記憶用
let mKeepHit = null;

// ----------------------------------------------------------------------------
// BattleManager
// ----------------------------------------------------------------------------

/**
 * ●アクション更新
 * ※一つのアクションの終了時を判別するためここに実装
 * 　複数回行動に対応するため、
 * 　BattleManager.endActionより前に実装する必要がある。
 */
const _BattleManager_updateAction = BattleManager.updateAction;
BattleManager.updateAction = function() {
    const target = this._targets[0];
    // 対象が存在する場合はアクションが続いているのでそのまま
    if (target) {
        _BattleManager_updateAction.apply(this, arguments);
        return;
    }

    //--------------------------------------------------
    // 対象がなくなった＝アクションが終了した。
    // →このタイミングで連結スキルを実行する。
    //--------------------------------------------------
    const subject = this._subject;
    const item = this._action.item();

    // 大元のアクションを保持
    if (!mOriginalAction) {
        mOriginalAction = this._action;
        // 対象も保持（連結スキルによって対象変更される場合があるため）
        mLastTargetIndex = subject._lastTargetIndex;
    }

    // 連結実行判定
    mIsChain = true;

    // 発動済みのオブジェクトは除外
    if (!mChainedObjects.includes(item)) {
        // つなげるスキルがあれば、割込実行
        if (goChainSkill(item)) {
            return;
        }
    }

    // メモ欄を参照するオブジェクトを全取得
    let traitObjects = subject.traitObjects();
    // パッシブスキルが有効な場合は連結
    // ※通常はアクターのみ
    if (subject.passiveChainSkills) {
        traitObjects = traitObjects.concat(subject.passiveChainSkills());
    }

    for (const object of traitObjects) {
        // 発動済みのオブジェクトは除外
        if (mChainedObjects.includes(object)) {
            continue;
        }

        // つなげるスキルがあれば、割込実行
        if (goChainSkill(object, true)) {
            return;
        }
    }

    // 終了した場合は初期化
    mOriginalAction = null;
    mIsNotDisplay = false;
    mChainedObjects = [];
    mChainedSkillIds = [];
    mIsChain = false;

    // ここでendActionが呼び出されることで終了処理は実行される。
    _BattleManager_updateAction.apply(this, arguments);
};

/**
 * ●スキル連携を実行
 */
function goChainSkill(object, passiveFlg) {
    // 対象が自分の場合は無効
    if (mOriginalAction.isForUser()) {
        return false;
    }

    const actionItem = mOriginalAction.item();

    // パッシブスキルによる連結効果の場合
    if (passiveFlg) {
        // 使用スキルの連結有効指定があるか？
        if (actionItem.meta.ChainSkillPassive) {
            // 無効な場合
            if (!toBoolean(actionItem.meta.ChainSkillPassive)) {
                return false;
            }

        // 連結有効の指定がない場合はデフォルト
        } else {
            // アクションがスキルでない場合は無効
            if (!DataManager.isSkill(actionItem)) {
                return false;
            }
            
            // チェック対象のスキルタイプ
            let targetSkillType = pTargetSkillType;
            // 個別の指定がある場合は取得
            if (object.meta.ChainSkillType) {
                // 空欄の場合は空配列
                if (object.meta.ChainSkillType === true) {
                    targetSkillType = [];
                // それ以外は
                } else {
                    targetSkillType = textToArray(object.meta.ChainSkillType);
                }
            }
            // スキルタイプのチェック
            if (targetSkillType.length && !targetSkillType.includes(actionItem.stypeId)) {
                return false;
            }
        }
    }

    // 行動主体と対象を取得
    const subject = BattleManager._subject;
    const target = getOriginalTarget();

    // eval参照用
    const a = subject;
    const b = target;

    // 連結スキルをチェック
    const chainSkillId = getChainSkillId(object, target)
    // 連結対象外なら終了
    if (!chainSkillId) {
        return false;
    // 既に発動済みなら終了
    } else if (mChainedSkillIds.includes(chainSkillId)) {
        return false;
    }

    // 行動主体が死亡時は終了
    if (subject.isDeathStateAffected()) {
        return false;
    }

    if (target) {
        // 対象死亡時に停止する場合
        if (checkMeta(pAbortTargetDeath, object, "ChainSkillAbortDeath")) {
            if (target.isDeathStateAffected()) {
                return false;
            }
        }
        // 対象耐性時に停止する場合
        if (checkMeta(pAbortTargetResist, object, "ChainSkillAbortResist")) {
            // 計算用に仮のアクションを生成
            const tmpAction = new Game_Action(subject);
            tmpAction.setSkill(chainSkillId);
            // 属性有効度が０以下ならば中断
            if (tmpAction.calcElementRate(target) <= 0) {
                return false;
            }
        }
    }

    // 確率判定
    const percent = object.meta.ChainSkillPercent;
    if (percent && Math.randomInt(100) > eval(percent)) {
        return false;
    }

    // 発動したオブジェクトを保持
    mChainedObjects.push(object);
    if (pDisableSameSkill) {
        mChainedSkillIds.push(chainSkillId);
    }

    // スキル名の表示制御
    const displayNameStyle = getDisplayNameStyle(object);
    // 非表示
    if (displayNameStyle == 0) {
        mIsNotDisplay = true;
        SceneManager._scene._logWindow.clear();
    // 個別表示
    } else if (displayNameStyle == 1) {
        mIsNotDisplay = false;
        SceneManager._scene._logWindow.clear();
    // 継続表示
    } else if (displayNameStyle == 2) {
        mIsNotDisplay = true;
    }

    // 戦闘行動の強制を実行
    subject.chainForceAction(chainSkillId, mLastTargetIndex);
    // 生成したアクションを再取得
    const newAction = subject.currentAction();
    // NRP_PartyAttack.jsとの連携
    // ※対象サイドが反転されているなら引き継ぎ。
    if (mOriginalAction.isReverseTargetSide && mOriginalAction.isReverseTargetSide()) {
        newAction.setReverseTargetSide();
    }

    BattleManager.forceAction(subject);
    BattleManager.processForcedAction();

    // 【ＭＶ】強制実行フラグを解除
    // ※強制フラグが立っていると、ステートのターン経過が行われないため。
    if (BattleManager.isForcedTurn && BattleManager.isForcedTurn()) {
        BattleManager._turnForced = false;
    }
    return true;
}

/**
 * ●連結スキル名の表示方式を取得
 */
function getDisplayNameStyle(item) {
    // 指定がある場合はそちらを優先
    if (item.meta.ChainSkillDisplayName) {
        return eval(item.meta.ChainSkillDisplayName);
    }
    return pDisplayNameStyle;
}

/**
 * ●フラグを満たしているか？
 * @param {boolean} commonParam プラグインパラメータの共通設定
 * @param {object} item スキルデータ
 * @param {string} metaName 参照するメタ名
 */
function checkMeta(commonParam, item, metaName) {
    if (item.meta[metaName]) {
        return eval(item.meta[metaName]);
    }
    return commonParam;
}

/**
 * ●連結スキルのＩＤを取得
 */
function getChainSkillId(object, target) {
    // eval参照用
    const a = BattleManager._subject;
    const b = target;

    const chainSkillHit = object.meta.ChainSkillHit;
    const chainSkillMiss = object.meta.ChainSkillMiss;
    const chainSkill = object.meta.ChainSkill;

    // 命中時
    if (mKeepHit) {
        if (chainSkillHit) {
            return eval(chainSkillHit);
        }
    // 失敗時
    } else if (chainSkillMiss) {
        return eval(chainSkillMiss);
    }
    // 通常
    if (chainSkill) {
        return eval(chainSkill);
    }
    // 連結対象外
    return null;
}

/**
 * ●本来の対象を取得
 */
function getOriginalTarget() {
    // 対象を取得
    let target;
    // 対象が敵側
    if (mOriginalAction.isForOpponent()) {
        target = mOriginalAction.opponentsUnit().members().find(t => t.index() == mLastTargetIndex);
    // 対象が味方側
    } else {
        target = mOriginalAction.friendsUnit().members().find(t => t.index() == mLastTargetIndex);
    }
    return target
}

// ----------------------------------------------------------------------------
// Game_BattlerBase
// ----------------------------------------------------------------------------

/**
 * ●スキルは有効か？
 */
const _Game_BattlerBase_meetsSkillConditions = Game_BattlerBase.prototype.meetsSkillConditions;
Game_BattlerBase.prototype.meetsSkillConditions = function(skill) {
    // 連結スキルかつ有効判定を無視するなら常に有効
    if (mIsChain && pIgnoreSkillConditions) {
        return true;
    }
    return _Game_BattlerBase_meetsSkillConditions.apply(this, arguments);
};

/**
 * ●スキルの消費が有効か？
 */
const _Game_BattlerBase_canPaySkillCost = Game_BattlerBase.prototype.canPaySkillCost;
Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
    // 連結スキルかつ無消費なら常に有効
    if (mIsChain && pNoMpTpCost) {
        return true;
    }
    return _Game_BattlerBase_canPaySkillCost.apply(this, arguments);
};

/**
 * ●スキルの消費実行
 */
const _Game_BattlerBase_paySkillCost = Game_BattlerBase.prototype.paySkillCost;
Game_BattlerBase.prototype.paySkillCost = function(skill) {
    // 連結スキルかつ無消費なら終了
    if (mIsChain && pNoMpTpCost) {
        return;
    }
    _Game_BattlerBase_paySkillCost.apply(this, arguments);
};

// ----------------------------------------------------------------------------
// Game_Battler
// ----------------------------------------------------------------------------

/**
 * 【独自】連結スキルを実行する。
 * ※処理はchainAction（戦闘行動の強制）に準じるが、
 * 　複数回行動に対応するためアクションをクリアしない。
 */
Game_Battler.prototype.chainForceAction = function(skillId, targetIndex) {
    const action = new Game_Action(this, true);
    action.setSkill(skillId);
    if (targetIndex === -2) {
        action.setTarget(this._lastTargetIndex);
    } else if (targetIndex === -1) {
        action.decideRandomTarget();
    } else {
        action.setTarget(targetIndex);
    }
    // 連結スキルを次のアクションとして実行するため、
    // push（末尾）ではなくunshift（先頭）で追加
    this._actions.unshift(action);
};

// ----------------------------------------------------------------------------
// Game_Action
// ----------------------------------------------------------------------------

/**
 * ●効果適用
 */
const _Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    _Game_Action_apply.apply(this, arguments);

    // 命中状況を記憶
    mKeepHit = target.result().isHit();
};

// ----------------------------------------------------------------------------
// Game_Actor
// ----------------------------------------------------------------------------

/**
 * 【独自】パッシブ用の連結スキル
 */
Game_Actor.prototype.passiveChainSkills = function() {
    // 使用不可のスキルのみ対象
    return this.skills().filter(skill => skill.occasion == 3);
};

// ----------------------------------------------------------------------------
// Window_BattleLog
// ----------------------------------------------------------------------------

/**
 * ●スキル名表示
 */
const _Window_BattleLog_displayAction = Window_BattleLog.prototype.displayAction;
Window_BattleLog.prototype.displayAction = function(subject, item) {
    // スキル名非表示
    if (mIsNotDisplay) {
        return;
    }
    _Window_BattleLog_displayAction.apply(this, arguments);
};

/**
 * ●開始モーション
 */
const _Window_BattleLog_performAction = Window_BattleLog.prototype.performAction;
Window_BattleLog.prototype.performAction = function(subject, action) {
    // 連結スキルかつ開始モーション無効なら終了
    if (mIsChain && pNoStartMotion) {
        return;
    }
    _Window_BattleLog_performAction.apply(this, arguments);
};

/**
 * ●アクションの結果表示
 */
const _Window_BattleLog_displayActionResults = Window_BattleLog.prototype.displayActionResults;
Window_BattleLog.prototype.displayActionResults = function(subject, target) {
    const action = BattleManager._action;

    // 結果非表示なら終了
    if (target.result().used && action) {
        if (action.item().meta.ChainSkillNoResult) {
            return;
        }
    }
    _Window_BattleLog_displayActionResults.apply(this, arguments);
};

// ----------------------------------------------------------------------------
// Spriteset_Battle
// ----------------------------------------------------------------------------

/**
 * ●処理待ち判定
 */
const _Spriteset_Battle_isBusy = Spriteset_Battle.prototype.isBusy;
Spriteset_Battle.prototype.isBusy = function() {
    // 連結スキル中はアニメーションのリクエストがあれば処理待ちする。
    // ※この指定がないとアニメーションが開始した瞬間にダメージ表示されてしまう。
    if (mIsChain) {
        if (Utils.RPGMAKER_NAME == "MV") {
            for (const battler of BattleManager.allBattleMembers()) {
                if (battler.isAnimationRequested()) {
                    return true;
                }
            }
        } else if ($gameTemp._animationQueue && $gameTemp._animationQueue.length) {
            return true;
        }
    }
    return _Spriteset_Battle_isBusy.apply(this, arguments);
};

// ----------------------------------------------------------------------------
// Sprite_Actor
// ----------------------------------------------------------------------------

/**
 * ●後退
 */
const _Sprite_Actor_stepBack = Sprite_Actor.prototype.stepBack;
Sprite_Actor.prototype.stepBack = function() {
    // 連結スキルかつ後退禁止の場合
    if (mIsChain && pNostepBack) {
        return;
    }
    _Sprite_Actor_stepBack.apply(this, arguments);
};

// ----------------------------------------------------------------------------
// 共通関数
// ----------------------------------------------------------------------------

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
