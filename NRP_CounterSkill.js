//=============================================================================
// NRP_CounterSkill.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.032 Create counter skill.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @orderBefore NRP_ChainSkill
 * @url https://newrpg.seesaa.net/article/500432213.html
 *
 * @help Create counter skill.
 * 
 * You can set each actor, enemy, class, equipment,
 * state, and skill as a trait that will counterattack.
 * For skills, they are passive skills
 * that counterattack just by remembering them.
 * 
 * -------------------------------------------------------------------
 * [Note (actor, enemy, class, equipment, state, skill)]
 * -------------------------------------------------------------------
 * <CounterSkill:100>
 * Skill ID 100 will be executed as a counter.
 * If the number is omitted (<CounterSkill>),
 * it will counterattack with a normal attack.
 * 
 * <CounterRate:50>
 * 50% chance of activating the counter skill.
 * 100% if omitted.
 * 
 * <CounterDamageType:1,5>
 * Damage type 1,5 skills are subject to counter.
 * 0:None, 1:HP Damage, 2:MP Damage, 3:HP Recover,
 * 4:MP Recover, 5:HP Drain, 6:MP Drain
 * If omitted, the plugin parameter settings are used.
 * If left blank, all are valid.
 * 
 * <CounterHitType:1>
 * Targets skills of hit type 1 for counter.
 * 0:Certain Hit, 1:Physical Attack, 2:Magic Attack
 * If omitted, the plugin parameter settings are used.
 * If left blank, all are valid.
 * 
 * <CounterSkillType:0,2>
 * Skill type 0,2 skills are subject to counter.
 * Skill types can be set in the database.
 * Normally, 1 is Magic, 2:Special.
 * Also, 0 is treated as a normal attack.
 * If omitted, the plugin parameter settings are used.
 * If left blank, all are valid.
 * 
 * <CounterEvadeCondition:0>
 * Sets the conditions under which
 * the counter skill is triggered by hit/evade.
 * 0: Always Counter, 1: Counter Only Hit, 2: Counter Only Evade
 * If omitted, the plugin parameter settings are used.
 * 
 * <CounterGroupInclude:attack>
 * The skill counterattacks when the counter group name is "attack".
 * For counter groups, see below.
 * 
 * <CounterGroupExcept:attack>
 * It does not counterattack
 * when the skill's counter group name is "attack".
 * 
 * <CounterItem> / <CounterItem:false>
 * Executes a counter against the item as well. (Off with false)
 * If omitted, the plugin parameter settings are used.
 * 
 * <CounterAbortDeath> / <CounterAbortDeath:false>
 * Stops the counter skill upon target death. (Off with false)
 * If omitted, the plugin parameter settings are used.
 * 
 * ※Formulas can also be used for each item.
 * 
 * -------------------------------------------------------------------
 * [Note (skill, item)]
 * -------------------------------------------------------------------
 * <CounterGroup:attack>
 * Set the counter group to "attack".
 * 
 * <CounterDisabled>
 * This skill will ensure that you do not get counterattacks.
 * 
 * -------------------------------------------------------------------
 * [Note (state]
 * -------------------------------------------------------------------
 * <CounterIgnoreRestrict>
 * Normally, battlers in a restriction state
 * will not execute counterattacks, but they will be able to
 * execute counterattacks in exceptional cases.
 * Only attacking restrictions are valid.
 * 
 * -------------------------------------------------------------------
 * [Counter Group]
 * -------------------------------------------------------------------
 * If you want to have detailed counter judgment for each skill,
 * counter groups are useful.
 * For example, if you want to make bow skills immune to counter
 * by spiked states, you can set up the following.
 * 
 * Set the note for the bow skill and the counter group to 'bow'.
 * <CounterGroup:bow>
 * 
 * Next, set the note of the spike state
 * and disable the counter group "bow".
 * <CounterGroupExcept:bow>
 * 
 * Conversely, if you wish to create a state in which only bow skills
 * are subject to counter, set the note as follows
 * <CounterGroupInclude:bow>
 * 
 * Please note that even if you set up a counter group,
 * the skill type and other conditions will remain in effect.
 * 
 * -------------------------------------------------------------------
 * [Cooperation with DynamicAnimation & Motion]
 * -------------------------------------------------------------------
 * By specifying the following condition in the note of the skill,
 * you can insert a special performance only when a counter is made.
 * 
 * <D-Animation:self&wait>
 * condition = BattleManager.isInCounter(); // Condition for counter
 * id = 52 // Animation ID
 * </D-Animation>
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
 * @param TargetDamageType
 * @type string
 * @default 1,5
 * @desc Damage type to be counterattacked. 0:None, 1:HP Damage, 2:MP Damage, 3:HP Recover, 4:MP Recover, 5:HP Drain, 6:MP Drain
 * 
 * @param TargetHitType
 * @type string
 * @default 1
 * @desc The hit type of the skill that is targeted for counter.
 * 0:Certain Hit, 1:Physical Attack, 2:Magic Attack
 * 
 * @param TargetSkillType
 * @type string
 * @default 0,2
 * @desc Skill type to be targeted for counter.
 * With standard, 0: Normal Attack, 2: Special.
 * 
 * @param CounterEvadeCondition
 * @type select
 * @option Always Counter @value 0
 * @option Counter Only Hit @value 1
 * @option Counter Only Evade @value 2
 * @default 0
 * @desc It is the decision to execute a counter skill when a skill is hit/evaded.
 * 
 * @param CounterItem
 * @type boolean
 * @default false
 * @desc Execute counter on items as well.
 * 
 * @param ComboJudgeType
 * @type select
 * @option Every @value 0
 * @option Once @value 1
 * @default 0
 * @desc How to judge when you receive a combo. Every will increase the rate of counter by the number of times.
 * 
 * @param NoMpTpCost
 * @type boolean
 * @default true
 * @desc No MP & TP is consumed when activating a counter skill.
 * 
 * @param IgnoreSkillConditions
 * @type boolean
 * @default false
 * @desc Ignore skill use decisions (e.g., silence state).
 * 
 * @param AbortTargetDeath
 * @type boolean
 * @default true
 * @desc When the target dies, subsequent counter skills are not activated.
 * 
 * @param CounterFriendSkill
 * @type boolean
 * @default false
 * @desc It is whether or not to counter to the skills of a fellow worker. NRP_PartyAttack.js is required for counter.
 * 
 * @param CoverDefaultCounter
 * @type boolean
 * @default false
 * @desc The default Counter Attack Rate is also overridden to be handled by this plugin.
 * 
 * @param DefaultCounterGroup
 * @parent CoverDefaultCounter
 * @type string
 * @desc The effective counter group for the default counter process.
 * 
 * @param DefaultCounterGroupNG
 * @parent CoverDefaultCounter
 * @type string
 * @desc This is an invalid counter group for the default counter process.
 * 
 * @param SupportOver100
 * @parent CoverDefaultCounter
 * @type boolean
 * @default false
 * @desc If the Counter Attack Rate exceeds 100%, the counterattack is executed multiple times.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.032 反撃スキルを作成する。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @orderBefore NRP_ChainSkill
 * @url https://newrpg.seesaa.net/article/500432213.html
 *
 * @help 反撃スキルを作成します。
 * 
 * アクター、エネミー、職業、装備、ステート、スキルのそれぞれに対して、
 * 反撃を行う特徴として設定できます。
 * スキルについては覚えているだけで、反撃するパッシブスキルとなります。
 * 
 * -------------------------------------------------------------------
 * ■アクター、エネミー、職業、装備、ステート、スキルのメモ欄
 * -------------------------------------------------------------------
 * <CounterSkill:100>
 * スキル１００番を反撃として実行するようになります。
 * 数値を省略（<CounterSkill>）した場合は通常攻撃で反撃します。
 * 
 * <CounterRate:50>
 * 反撃スキルを５０％の確率で発動します。
 * 省略すると１００％になります。
 * 
 * <CounterDamageType:1,5>
 * ダメージタイプ1,5のスキルを反撃の対象にします。
 * 0:なし, 1:HPダメージ, 2:MPダメージ, 3:HP回復,
 * 4:MP回復, 5:HP吸収, 6:MP吸収です。
 * 省略時はプラグインパラメータの設定を使用します。
 * 空欄にした場合は全て有効となります。
 * 
 * <CounterHitType:1>
 * 命中タイプ1のスキルを反撃の対象にします。
 * 0:必中, 1:物理攻撃, 2:魔法攻撃です。
 * 省略時はプラグインパラメータの設定を使用します。
 * 空欄にした場合は全て有効となります。
 * 
 * <CounterSkillType:0,2>
 * スキルタイプ0,2のスキルを反撃の対象にします。
 * スキルタイプはデータベースで設定できます。
 * 通常だと1は魔法、2:必殺技です。
 * また、0は通常攻撃として扱われます。
 * 省略時はプラグインパラメータの設定を使用します。
 * 空欄にした場合は全て有効となります。
 * 
 * <CounterEvadeCondition:0>
 * スキルの、命中／回避による反撃発動条件を設定します。
 * 0:常に反撃, 1:命中時のみ反撃, 2:回避時のみ反撃
 * 省略時はプラグインパラメータの設定を使用します。
 * 
 * <CounterGroupInclude:attack>
 * スキルの反撃グループ名が『attack』の場合に反撃します。
 * ※反撃グループに対しては後述します。
 * 
 * <CounterGroupExcept:attack>
 * スキルの反撃グループ名が『attack』の場合に反撃しません。
 * 
 * <CounterItem> / <CounterItem:false>
 * アイテムに対しても反撃を実行します。（falseでオフ）
 * 省略時はプラグインパラメータの設定を使用します。
 * 
 * <CounterAbortDeath> / <CounterAbortDeath:false>
 * 対象死亡時に反撃スキルを停止します。（falseでオフ）
 * 省略時はプラグインパラメータの設定を使用します。
 * 
 * ※各項目は数式も使用可です。
 * 
 * -------------------------------------------------------------------
 * ■スキル、アイテムのメモ欄
 * -------------------------------------------------------------------
 * <CounterGroup:attack>
 * 反撃グループを『attack』に設定します。
 * 
 * <CounterDisabled>
 * このスキルでは反撃を受けないようにします。
 * 
 * -------------------------------------------------------------------
 * ■ステートのメモ欄
 * -------------------------------------------------------------------
 * <CounterIgnoreRestrict>
 * 通常、行動制約ステートにかかっているバトラーは反撃を実行しませんが、
 * 例外的に反撃を実行できるようになります。
 * 攻撃系の行動制約のみが有効です。
 * 
 * -------------------------------------------------------------------
 * ■反撃グループ
 * -------------------------------------------------------------------
 * スキル毎の詳細な反撃判定を行いたい場合は反撃グループが有効です。
 * 例えば、弓スキルはトゲステートによる反撃を受けないといった場合は
 * 次のように設定すればＯＫです。
 * 
 * 弓スキルのメモ欄を設定し、反撃グループを『bow』にする。
 * <CounterGroup:bow>
 * 
 * 次にトゲステートのメモ欄を設定し、反撃グループ『bow』を無効にする。
 * <CounterGroupExcept:bow>
 * 
 * 逆に弓スキルのみ反撃対象とするステートを作成したい場合は、
 * メモ欄に以下のように設定します。
 * <CounterGroupInclude:bow>
 * 
 * なお、反撃グループを設定した場合でも、
 * スキルタイプなどの条件は有効なままです。ご注意ください。
 * 
 * -------------------------------------------------------------------
 * ■DynamicAnimation & Motionとの連携
 * -------------------------------------------------------------------
 * スキルのメモ欄に以下のように条件を指定すれば、
 * 反撃時のみ専用の演出を挿入できます。
 * 
 * <D-Animation:self&wait>
 * condition = BattleManager.isInCounter(); // 反撃用の条件
 * id = 52 // アニメーションＩＤ
 * </D-Animation>
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
 * @param TargetDamageType
 * @text 対象のダメージタイプ
 * @type string
 * @default 1,5
 * @desc 反撃対象とするダメージタイプ。複数可。0:なし, 1:HPﾀﾞﾒｰｼﾞ, 2:MPﾀﾞﾒｰｼﾞ, 3:HP回復, 4:MP回復, 5:HP吸収, 6:MP吸収
 * 
 * @param TargetHitType
 * @text 対象の命中タイプ
 * @type string
 * @default 1
 * @desc 反撃対象とするスキルの命中タイプです。複数可。
 * 0:必中, 1:物理攻撃, 2:魔法攻撃
 * 
 * @param TargetSkillType
 * @text 対象のスキルタイプ
 * @type string
 * @default 0,2
 * @desc 反撃対象とするスキルタイプです。複数可。
 * 標準だと0で通常攻撃、2で必殺技が対象になります。
 * 
 * @param CounterEvadeCondition
 * @text 回避時の反撃判定
 * @type select
 * @option 常に反撃 @value 0
 * @option 命中時のみ反撃 @value 1
 * @option 回避時のみ反撃 @value 2
 * @default 0
 * @desc スキルが命中／回避された際に、反撃スキルを実行するかの判定です。
 * 
 * @param CounterItem
 * @text アイテムにも反撃
 * @type boolean
 * @default false
 * @desc アイテムにも反撃を実行します。
 * 
 * @param ComboJudgeType
 * @text 連撃時の判定
 * @type select
 * @option 毎回 @value 0
 * @option １回 @value 1
 * @default 0
 * @desc 連撃を受けた際の判定方法です。
 * 毎回なら連撃回数だけ反撃率が上がります。
 * 
 * @param NoMpTpCost
 * @text ＭＰＴＰを消費しない
 * @type boolean
 * @default false
 * @desc 反撃スキル発動時にＭＰＴＰを消費しません。
 * 
 * @param IgnoreSkillConditions
 * @text スキルの使用判定を無視
 * @type boolean
 * @default false
 * @desc 反撃時にスキルの使用判定（沈黙ステートなど）を無視します。
 * 
 * @param AbortTargetDeath
 * @text 対象死亡時は中断
 * @type boolean
 * @default true
 * @desc 対象死亡時は以降の反撃スキルを発動しません。
 * 
 * @param CounterFriendSkill
 * @text 仲間のスキルにも反撃
 * @type boolean
 * @default false
 * @desc 仲間のスキルへ反撃するかどうかです。
 * 反撃にはNRP_PartyAttack.jsが必要です。
 * 
 * @param CoverDefaultCounter
 * @text デフォルトの反撃処理を上書
 * @type boolean
 * @default false
 * @desc デフォルトの反撃（追加能力値の反撃率）も当プラグインで処理するように上書きします。
 * 
 * @param DefaultCounterGroup
 * @parent CoverDefaultCounter
 * @text 反撃有効グループ
 * @type string
 * @desc デフォルトの反撃処理の有効な反撃グループです。
 * 
 * @param DefaultCounterGroupNG
 * @parent CoverDefaultCounter
 * @text 反撃無効グループ
 * @type string
 * @desc デフォルトの反撃処理の無効な反撃グループです。
 * 
 * @param SupportOver100
 * @parent CoverDefaultCounter
 * @text 100%超えに対応
 * @type boolean
 * @default false
 * @desc 反撃率が１００％を超えた場合に、反撃を複数回実行します。
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

const PLUGIN_NAME = "NRP_CounterSkill";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pTargetDamageType = textToArray(parameters["TargetDamageType"]);
const pTargetHitType = textToArray(parameters["TargetHitType"]);
const pTargetSkillType = textToArray(parameters["TargetSkillType"]);
const pCounterEvadeCondition = toNumber(parameters["CounterEvadeCondition"], 0);
const pCounterItem = toBoolean(parameters["CounterItem"]);
const pComboJudgeType = toNumber(parameters["ComboJudgeType"], 0);
const pNoMpTpCost = toBoolean(parameters["NoMpTpCost"], true);
const pIgnoreSkillConditions = toBoolean(parameters["IgnoreSkillConditions"], true);
const pAbortTargetDeath = toBoolean(parameters["AbortTargetDeath"], false);
const pCounterFriendSkill = toBoolean(parameters["CounterFriendSkill"], false);
const pCoverDefaultCounter = toBoolean(parameters["CoverDefaultCounter"], false);
const pDefaultCounterGroup = setDefault(parameters["DefaultCounterGroup"]);
const pDefaultCounterGroupNG = setDefault(parameters["DefaultCounterGroupNG"]);
const pSupportOver100 = toBoolean(parameters["SupportOver100"], false);

// ----------------------------------------------------------------------------
// 共通変数
// ----------------------------------------------------------------------------

// 反撃予約リスト
let mCounterList = [];
// 元の行動主体
let mOriginalSubject = null;
// 元のアクション
let mOriginalAction = null;
// 元のカウンター実行者のアクションステート
let mOriginalCounterActionState = null;
// カウンター実行中フラグ
let mInCounter = false;
// 対象となったバトラー
let mTargetBattlers = [];
// 速度記憶用
let mOriginalSpeed = null;
// 反撃追加回数
let mAddCount = 0;

// ----------------------------------------------------------------------------
// BattleManager
// ----------------------------------------------------------------------------

/**
 * 【独自】反撃実行中
 */
BattleManager.isInCounter = function() {
    return mInCounter;
};

/**
 * ●ターン開始
 */
const _BattleManager_startTurn = BattleManager.startTurn;
BattleManager.startTurn = function() {
    // 変数初期化
    mCounterList = [];
    mOriginalSubject = null;
    mOriginalAction = null;
    mOriginalCounterActionState = null;
    mInCounter = false;
    mTargetBattlers = [];

    _BattleManager_startTurn.apply(this, arguments);
};

/**
 * ●アクション更新
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
    //--------------------------------------------------
    // 大元の行動主体とアクションを保持
    if (!mOriginalSubject) {
        mOriginalSubject = this._subject;
        mOriginalAction = this._action;
        mOriginalSpeed = this._subject.speed();
    }

    // カウンタースキルの終了処理を実行
    if (mInCounter) {
        // Window_BattleLogのendActionだけを呼び出す。
        this._logWindow.endAction(this._subject);
        // アクションステートを元に戻す。
        this._subject.setActionState(mOriginalCounterActionState);
    }

    // 反撃予約リストに登録がない場合　→　終了処理を実行
    if (mCounterList.length == 0) {
        mTargetBattlers = [];

        // 反撃によって変化した行動主体とアクションを戻す。
        if (mInCounter && mOriginalSubject) {
            this._subject = mOriginalSubject;
            this._action = mOriginalAction;
            // ＣＴＢ用に速度再設定
            this._subject._speed = mOriginalSpeed;
        }

        mInCounter = false;
        mOriginalSubject = null;
        mOriginalAction = null;
        mOriginalCounterActionState = null;

        // endActionを呼び出し、本来のアクションの終了処理を実行する。
        _BattleManager_updateAction.apply(this, arguments);
        return;
    }

    // 反撃情報を取得
    const counterData = mCounterList.shift();
    const counterSubject = counterData.subject;
    const counterTarget = counterData.target;
    const skillId = counterData.skillId;
    const abortDeath = counterData.abortDeath;
    // 反撃追加回数
    mAddCount = counterData.addCount;

    // 対象戦闘不能時に停止する場合
    if (abortDeath && counterTarget.isDeathStateAffected()) {
        return;
    }

    // 行動主体が行動異常＆戦闘不能時は終了
    // 演出時の不死身ステート用にＨＰ０でも終了
    if (counterSubject.isCounterRestricted() || counterSubject.isDead() || counterSubject.hp == 0) {
        return;
    }

    // 行動主体がスキルの使用条件に合致しない場合は終了
    // ※やや冗長になっているが、競合なども考慮してこのまま。
    if (!counterSubject.meetsSkillConditions($dataSkills[skillId])) {
        return;
    }

    // 戦闘行動の強制を実行
    goCounterSkill(counterSubject, counterTarget, skillId);
};

/**
 * ●反撃スキルを実行
 */
function goCounterSkill(subject, target, skillId) {
    // 戦闘行動の強制を実行
    const counterOk = subject.counterForceAction(skillId, target);

    // 不発の場合は終了
    if (!counterOk) {
        return;
    }

    // カウンター実行フラグオン
    mInCounter = true;

    BattleManager.forceAction(subject);
    BattleManager.processForcedAction();

    // 【ＭＶ】強制実行フラグを解除
    // ※強制フラグが立っていると、ステートのターン経過が行われないため。
    if (BattleManager.isForcedTurn && BattleManager.isForcedTurn()) {
        BattleManager._turnForced = false;
    }
}

if (pCoverDefaultCounter) {
    /**
     * 【独自】反撃率によるカウンター実行
     */
    BattleManager.invokeCounterAttack = function(subject, target) {
        // カウンター処理を潰して通常のアクション処理で上書き
        BattleManager.invokeNormalAction(subject, target);
    };
}

// ----------------------------------------------------------------------------
// Game_Battler
// ----------------------------------------------------------------------------

/**
 * 【独自】カウンタースキルを実行する。
 */
Game_Battler.prototype.counterForceAction = function(skillId, target) {
    const action = new Game_Action(this, true);
    action.setSkill(skillId);

    // 対象が本来の対象サイドと異なる場合
    if (isAnotherSide(action, this, target)) {
        // 対象サイドを反転
        // ※NRP_PartyAttack.jsのメソッド
        if (action.setReverseTargetSide) {
            action.setReverseTargetSide();
        // それ以外は不発にする。
        } else {
            return false;
        }
    }

    const targetIndex = target.index();
    if (targetIndex === -2) {
        action.setTarget(this._lastTargetIndex);
    } else if (targetIndex === -1) {
        action.decideRandomTarget();
    } else {
        action.setTarget(targetIndex);
    }

    // カウンター実行前のアクションステートを保持
    if (!mOriginalCounterActionState) {
        mOriginalCounterActionState = this._actionState;
    }

    // カウンタースキルを次のアクションとして実行するため、
    // push（末尾）ではなくunshift（先頭）で追加
    this._actions.unshift(action);

    // ログウィンドウをクリア
    BattleManager._logWindow.clear();

    // アクター位置の自動設定を禁止解除（DynamicMotion）
    BattleManager._noUpdateTargetPosition = false;

    // 反撃有効と判定
    return true;
};

/**
 * ●対象が本来の対象サイドと異なるかどうか？
 */
function isAnotherSide(action, subject, target) {
    // 範囲が敵なのに味方が対象
    if (action.isForOpponent() && subject.isActor() === target.isActor()) {
        return true;
    // 範囲が味方なのに敵が対象
    } else if (action.isForFriend() && subject.isActor() !== target.isActor()) {
        return true;
    }
    return false;
}

// ----------------------------------------------------------------------------
// Game_BattlerBase
// ----------------------------------------------------------------------------

/**
 * 【独自】反撃時の行動制約判定
 */
Game_BattlerBase.prototype.isCounterRestricted = function() {
    if (this.isAppeared()) {
        // ステートのメモ欄に<CounterIgnoreRestrict>がある場合は、
        // 行動制約の判定から除外する。
        const restrictions = this.states().map(state =>
            state.restriction && !state.meta.CounterIgnoreRestrict);
        return Math.max(0, ...restrictions) > 0;
    }
    return Game_BattlerBase.prototype.isRestricted.apply(this, arguments);
};

/**
 * ●混乱判定
 */
const _Game_BattlerBase_isConfused = Game_BattlerBase.prototype.isConfused;
Game_BattlerBase.prototype.isConfused = function() {
    // カウンター時は処理しない。
    if (mInCounter) {
        return;
    }
    return _Game_BattlerBase_isConfused.apply(this, arguments);
};

/**
 * ●スキルは有効か？
 */
const _Game_BattlerBase_meetsSkillConditions = Game_BattlerBase.prototype.meetsSkillConditions;
Game_BattlerBase.prototype.meetsSkillConditions = function(skill) {
    // 反撃スキルかつ有効判定を無視するなら常に有効
    if (mInCounter && pIgnoreSkillConditions) {
        return true;
    }
    return _Game_BattlerBase_meetsSkillConditions.apply(this, arguments);
};

/**
 * ●スキルの消費が有効か？
 */
const _Game_BattlerBase_canPaySkillCost = Game_BattlerBase.prototype.canPaySkillCost;
Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
    // 反撃スキルかつ無消費なら常に有効
    if (mInCounter && pNoMpTpCost) {
        return true;
    }
    return _Game_BattlerBase_canPaySkillCost.apply(this, arguments);
};

/**
 * ●スキルの消費実行
 */
const _Game_BattlerBase_paySkillCost = Game_BattlerBase.prototype.paySkillCost;
Game_BattlerBase.prototype.paySkillCost = function(skill) {
    // 反撃スキルかつ無消費なら終了
    if (mInCounter && pNoMpTpCost) {
        return;
    }
    _Game_BattlerBase_paySkillCost.apply(this, arguments);
};

/**
 * ●通常攻撃の追加回数
 */
const _Game_BattlerBase_attackTimesAdd = Game_BattlerBase.prototype.attackTimesAdd;
Game_BattlerBase.prototype.attackTimesAdd = function() {
    let ret = _Game_BattlerBase_attackTimesAdd.apply(this, arguments);

    // 反撃スキルかつ追加回数が設定されているなら
    if (mInCounter && mAddCount) {
        ret += mAddCount;
    }

    return ret;
};

// ----------------------------------------------------------------------------
// Game_Action
// ----------------------------------------------------------------------------

/**
 * ●有効判定
 */
const _Game_Action_isValid = Game_Action.prototype.isValid;
Game_Action.prototype.isValid = function() {
    // 反撃スキルかつ有効判定を無視しない場合
    if (mInCounter && !pIgnoreSkillConditions) {
        // 一時的に強制フラグを解除してから戻す。
        this._forcing = false;
        const ret = _Game_Action_isValid.apply(this, arguments);
        this._forcing = true;
        return ret;
    }
    return _Game_Action_isValid.apply(this, arguments);
};

/**
 * ●効果適用
 */
const _Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    _Game_Action_apply.apply(this, arguments);

    // カウンター実行中は終了
    // 自分を対象にした場合は終了
    if (mInCounter || target == this.subject()) {
        return;
    }

    //---------------------------------------
    // 以下、カウンターを実行するかどうかの判定
    //---------------------------------------
    const actionItem = this.item();

    // カウンター無効の場合は終了
    if (actionItem.meta.CounterDisabled) {
        return;
    }

    // 対象が行動異常＆戦闘不能時は終了
    if (target.isCounterRestricted() || target.isDead()) {
        return;
    }

    // 連撃時の判定が１回の場合
    // かつ、既に対象となった場合は終了
    if (pComboJudgeType == 1 && mTargetBattlers.includes(target)) {
        return;
    }

    // 対象になったバトラーを保持
    mTargetBattlers.push(target);

    // デフォルトの反撃処理
    if (pCoverDefaultCounter) {
        // 反撃率100%超えに対応する場合
        if (pSupportOver100) {
            // 例：反撃率250%ならば、反撃２回＋さらに５０％でもう１回
            let count = 0;
            let itemCnt = this.itemCnt(target);
            while (itemCnt > 1) {
                itemCnt--;
                count++;
            }
            if (Math.random() < itemCnt) {
                count++;
            }

            // 反撃回数が１回以上なら反撃を設定
            if (count) {
                // -1して追加の反撃回数に変換
                const addCount = count - 1;
                // 反撃リストへ通常攻撃を登録
                this.applyCounter(null, target, addCount, true);
            }

        // 通常時
        } else {
            if (Math.random() < this.itemCnt(target)) {
                // 反撃リストへ通常攻撃を登録
                this.applyCounter(null, target, 0, true);
            }
        }
    }

    // メモ欄を参照するオブジェクトを全取得
    let traitObjects = target.traitObjects();
    // パッシブスキルが有効な場合は連結
    // ※通常はアクターのみ
    if (target.skills) {
        traitObjects = traitObjects.concat(target.skills());
    }

    // 反撃スキルが設定されているオブジェクトのみが対象
    traitObjects = traitObjects.filter(object => object.meta.CounterSkill);

    // オブジェクト単位でループ
    for (const object of traitObjects) {
        this.applyCounter(object, target, 0);
    }
};

/**
 * 【独自】オブジェクト毎の反撃判定
 */
Game_Action.prototype.applyCounter = function(object, target, addCount, isDefaultCounter) {
    const metaCounterSkill = object ? object.meta.CounterSkill : null;

    // eval判定用
    const a = target;
    const b = this.subject();

    let skillId = eval(metaCounterSkill);

    // スキルが取得できない場合は通常攻撃を設定
    if (skillId == null || skillId === true) {
        skillId = target.attackSkillId();
    // ID=0の場合は終了
    } else if (skillId == 0) {
        return;
    }

    // 命中判定
    const result = target.result();
    const actionItem = this.item();

    // 命中回避判定による分岐
    const evadeCondition = checkMeta(pCounterEvadeCondition, object, "CounterEvadeCondition")
    // 命中時以外は反撃しない場合、かつ外れた場合は次へ
    if (evadeCondition == 1 && !result.isHit()) {
        return;
    // 回避以外は反撃しない場合、かつ命中した場合は次へ
    } else if (evadeCondition == 2 && result.isHit()) {
        return;
    }

    // アイテムかつ無効なら次へ
    if (!isCounterItem(this, object)) {
        return;
    // 有効なダメージタイプでなければ次へ
    } else if (!isTargetDamageType(actionItem, object)) {
        return;
    // 有効な命中タイプでなければ次へ
    } else if (!isTargetHitType(actionItem, object)) {
        return;
    // 有効なスキルタイプでなければ次へ
    } else if (!isTargetSkillType(actionItem, object)) {
        return;
    }

    // 仲間のスキルかどうか？
    if ((target.isActor() && this.subject().isActor()) || (target.isEnemy() && this.subject().isEnemy())) {
        // 仲間のスキルに反撃しない場合は次へ
        if (!pCounterFriendSkill) {
            return;
        }
    }

    // 反撃グループを取得
    const counterGroup = checkMeta(null, actionItem, "CounterGroup");

    // 通常の反撃処理の場合のみ反撃グループの初期設定を有効とする。
    let defaultCounterGroup = null;
    let defaultCounterGroupNG = null;
    if (isDefaultCounter) {
        defaultCounterGroup = pDefaultCounterGroup;
        defaultCounterGroupNG = pDefaultCounterGroupNG;
    }

    // 反撃有効グループが存在する場合
    const counterGroupInclude = checkMeta(defaultCounterGroup, object, "CounterGroupInclude");
    if (counterGroupInclude) {
        // グループ名が一致しなかった場合は次へ
        if (counterGroupInclude != counterGroup) {
            return;
        }
    }

    // 反撃無効グループが存在する場合
    const counterGroupExcept = checkMeta(defaultCounterGroupNG, object, "CounterGroupExcept");
    if (counterGroupExcept) {
        // グループ名が一致した場合は次へ
        if (counterGroupExcept == counterGroup) {
            return;
        }
    }

    // 確率判定
    const rate = object ? object.meta.CounterRate : null;
    if (rate && Math.randomInt(100) >= eval(rate)) {
        return;
    }

    // 反撃リストへ登録
    resistCounter(target, this.subject(), skillId, object, addCount);
}

/**
 * ●反撃リストへ登録する。
 */
function resistCounter(target, subject, skillId, object, addCount) {
    // 既に登録済の場合は次へ
    const isResisted = mCounterList.some(data =>
        data.subject == target && data.target == subject && data.skillId == skillId);
    if (isResisted) {
        return;
    }

    // 対象死亡時に停止するかどうか？
    const abortDeath = checkMeta(pAbortTargetDeath, object, "CounterAbortDeath");

    // 確認用のAction
    const dummyAction = new Game_Action(target, false);
    dummyAction.setSkill(skillId);

    // 反撃データの構造体を作成
    const counterData = {};
    // 行動主体と対象を反転
    counterData.subject = target;
    // 範囲が使用者の場合は自分に
    if (dummyAction.isForUser()) {
        counterData.target = target;
    } else {
        counterData.target = subject;
    }
    counterData.skillId = skillId;
    counterData.abortDeath = abortDeath;
    counterData.addCount = addCount; // 追加カウント
    
    // 反撃予約リストに登録
    mCounterList.push(counterData);
}

/**
 * ●アイテムが有効かどうか？
 */
function isCounterItem(action, object) {
    // アイテムでない場合は有効
    if (!action.isItem()) {
        return true;
    }

    // 個別の指定がある場合は取得
    const metaCounterItem = object ? toBoolean(object.meta.CounterItem) : null;
    if (metaCounterItem != null) {
        return metaCounterItem;
    }
    return pCounterItem;
}

/**
 * ●有効なダメージタイプかどうか？
 */
function isTargetDamageType(actionItem, object) {
    // チェック対象のダメージタイプ
    let targetDamageType = pTargetDamageType;
    // 個別の指定がある場合は取得
    const metaDamageType = object ? object.meta.CounterDamageType : null;
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
    let targetHitType = pTargetHitType;
    // 個別の指定がある場合は取得
    const metaHitType = object ? object.meta.CounterHitType : null;
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
    let targetSkillType = pTargetSkillType;
    // 個別の指定がある場合は取得
    const metaCounterType = object ? object.meta.CounterSkillType : null;
    if (metaCounterType) {
        // 空欄の場合は空配列
        if (metaCounterType === true) {
            targetSkillType = [];
        // それ以外は
        } else {
            targetSkillType = textToArray(metaCounterType);
        }
    }
    // スキルタイプのチェック
    if (targetSkillType.length && !targetSkillType.includes(actionItem.stypeId)) {
        return false;
    }
    return true;
}

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

/**
 * ●フラグを満たしているか？
 * @param {boolean} commonParam プラグインパラメータの共通設定
 * @param {object} item オブジェクトデータ
 * @param {string} metaName 参照するメタ名
 */
function checkMeta(commonParam, item, metaName) {
    // eval判定用
    const a = BattleManager._subject;

    if (item && item.meta[metaName]) {
        try {
            return eval(item.meta[metaName]);
        } catch (e) {}

        // エラーになった場合は文字列で返す。
        return item.meta[metaName];
    }
    return commonParam;
}

})();
