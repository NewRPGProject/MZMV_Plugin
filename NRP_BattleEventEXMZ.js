//=============================================================================
// NRP_BattleEventEXMZ.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.10 Extends the functionality of battle events.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @orderBefore NRP_ChargeSkill
 * @orderBefore NRP_DynamicAnimationMZ
 * @orderAfter NRP_EnemyRoutineKai
 * @url http://newrpg.seesaa.net/article/477489099.html
 *
 * @help The following enhancements have been made to the battle Event.
 * 1. In "Force Action", consider action abnormalities and MP depletion.
 * 2. The function to omit the staging of skill activation has been implemented.
 *    (Specify <NoStartAction> in note.)
 * 3. The plugin command to operate the subject and target is implemented.
 *
 * The purpose of this plugin is to bring out the true value of battle events.
 * The plugin itself doesn't have much in the way of features.
 * For more information on what you can do in a battle event specifically,
 * please see the details below.
 * http://newrpg.seesaa.net/article/477489099.html
 *
 * [Plugin command]
 * > forceSubject
 * Overrides the subject that does "Force Action".
 * This overrides the subject of the instruction on the editor.
 *
 * > forceTargetFilter
 * The filtered targets are overwritten as "Force Action" targets.
 * This overrides the target of the instruction on the editor.
 * 
 * > forceTargetMost
 * Overrides the targets that does "Force Action".
 * Find the objects with maximum and minimum values by comparison.
 * This overrides the target of the instruction on the editor.
 * 
 * > setConditionSwitch
 * It searches for targets that match the condition
 * and stores the results in a switch.
 * 
 * > superForce
 * true:  "Force Action" is performed regardless of the parameter setting.
 * false: Regardless of the setting of parameters,
 *        the action is judged on "Force Action".
 *
 * [Note Of Skills]
 * The following statements are valid.
 * 
 * <NoStartAction>
 * 
 * Omit the start performance when activating a skill.
 * Allows you to avoid showing the performance
 * when calling a common event with the effect of using a skill.
 * 
 * <NoCommonEventActionEnd:true or false>
 * 
 * Toggles whether or not to adjust the timing of the end-of-action process
 * when calling a common event with the use effect of a skill.
 * The default value can be set in the plugin parameter.
 * 
 * If set to true, it will cause the end of action process
 * to be executed only once at the termination of the common event.
 * This will address the problem that states
 * with a release timing of "at the end of the action"
 * will be released immediately after the common event is activated.
 * 
 * The target condition is when the damage type is "None"
 * and the only effect used is Common Event.
 * Please note that it will not work if any settings are made.
 * 
 * Note that this control is not necessary for CTB.
 * It is already taken into account
 * in the control in NRP_CountTimeBattle.js.
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 * 
 * @------------------------------------------------------------------
 * @ Plugin Commands
 * @------------------------------------------------------------------
 * 
 * @command forceSubject
 * @desc Overrides the subject that does "Force Action".
 * This overrides the subject of the instruction on the editor.
 * 
 * @arg subject
 * @desc Select the user of the skill to be overwritten.
 * @type combo
 * @default subject
 * @option
 * @option subject
 * 
 * @------------------------------------------------------------------
 * 
 * @command forceTargetFilter
 * @desc The filtered targets are overwritten as "Force Action" targets.
 * 
 * @arg targetCondition
 * @desc The conditions under which the skill is targeted.
 * Example1: b.hp < 100, Example2: b.actorId() == 1
 * @type combo
 * @option
 * @option b.hpRate() <= 0.5
 * @option b._actorId == 1
 * @option b._enemyId == 1
 * @option b.isStateAffected(1) #State no
 * @option b.isDead()
 * @option b.index() == targets.length - 1 #Last in line.
 * @option b.hp < a.hp #Lower HP than the subject.
 * 
 * @arg option
 * @type struct<Option>
 * 
 * @------------------------------------------------------------------
 * 
 * @command forceTargetMost
 * @desc Overrides the targets that does "Force Action".
 * Find the objects with maximum and minimum values by comparison.
 * 
 * @arg compareCondition
 * @desc Enter the comparison conditions you want to target.
 * Example: b1.hpRate() < b2.hpRate() #Most HP% loss.
 * @type combo
 * @option b1.hpRate() < b2.hpRate() #Most HP% loss.
 * @option b1.hpRate() > b2.hpRate() #Highest HP%.
 * 
 * @arg option
 * @type struct<Option>
 * 
 * @------------------------------------------------------------------
 * 
 * @command setConditionSwitch
 * @desc It searches for targets that match the condition and stores the results in a switch.
 * 
 * @arg switchNo
 * @desc This is a switch to store the search results.
 * If there is a matching battler, ON, else OFF.
 * @type switch
 * @default 1
 * 
 * @arg targetSide
 * @desc The side that is target to the condition.
 * "b" changes the battler referred to.
 * @type select
 * @default opponents
 * @option opponents
 * @option friends
 * @option all
 * 
 * @arg condition
 * @desc Enter the condition. You can refer to the target side's battler with b and the subject with a.
 * @type combo
 * @option
 * @option b.hpRate() <= 0.5
 * @option b._actorId == 1
 * @option b._enemyId == 1
 * @option b.isStateAffected(1) #State no
 * @option b.isDead()
 * @option b.hp < a.hp #Lower HP than the subject.
 * @option $gameTroop.turnCount() % 3 == 0
 * 
 * @arg includeDead
 * @desc Dead battlers are included in the search.
 * @type boolean
 * 
 * @------------------------------------------------------------------
 * 
 * @command superForce
 * @desc When you do "Force Action", it ignores MP and state.
 * In essence, revert to the original "Force Action" behavior.
 * 
 * @arg forceMode
 * @desc Change whether the action is enforced or not.
 * @type select
 * @default true
 * @option Clear @value
 * @option Force @value true
 * @option Don't Force @value false
 * 
 * @------------------------------------------------------------------
 * 
 * @command randomSkills
 * @desc Set the skill and run it at random.
 * 
 * @arg skills
 * @desc Set the skills to be executed at random.
 * @type skill[]
 * 
 * @------------------------------------------------------------------
 * @ Plugin Parameters
 * @------------------------------------------------------------------
 * 
 * @param forceValid
 * @type boolean
 * @default true
 * @desc "Force Action" will also determine if the MP is running out, etc.
 * The default value is true; the original behavior of MZ is false.
 * 
 * @param actionAtFailure
 * @parent forceValid
 * @type select
 * @option None @value 0
 * @option Normal Attack @value 1
 * @default 0
 * @desc This action is taken when force action fail due to silence or lack of MP.
 * 
 * @param forceValidFlexible
 * @parent forceValid
 * @type boolean
 * @default true
 * @desc Even if forceValid is on, it should have no effect except for execution by event commands.
 * 
 * @param aIsSubject
 * @text "a" to refer to subject.
 * @type boolean
 * @default true
 * @desc Always refer to the subject with "a" on the battle event.
 * This value can be referenced from the script.
 * 
 * @param adjustCommonEventActionEnd
 * @type boolean
 * @default true
 * @desc Adjusts the timing of the end process when a common event is invoked by the effect of a skill.
 * 
 * @param stopForceActionHp0
 * @type boolean
 * @default false
 * @desc If the player is an immortal state and has 0 HP, the force action will be stopped.
 * 
 * @param targetImmortalStates
 * @parent stopForceActionHp0
 * @type state[]
 * @desc Immortal states that stop force action when the battler's HP reaches 0.
 */

 /*~struct~Option:
 * @param targetLimit
 * @desc If no target meets the requirements, the action is aborted.
 * @type boolean
 * 
 * @param sideChange
 * @desc Changes the target side from the original function of the skill.
 * For example, an enemy can attack the friend.
 * @type select
 * @option opponents
 * @option friends
 * @option all
 */

/*:ja
 * @target MZ
 * @plugindesc v1.10 バトルイベントの機能を拡張します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @orderBefore NRP_ChargeSkill
 * @orderBefore NRP_DynamicAnimationMZ
 * @orderAfter NRP_EnemyRoutineKai
 * @url http://newrpg.seesaa.net/article/477489099.html
 *
 * @help 以下の調整によって、バトルイベントの機能を拡張します。
 * ②『戦闘行動の強制』にて、行動異常やＭＰ枯渇を考慮できるよう対応
 * ③スキル発動時の演出省略機能を実装（メモ欄に<NoStartAction>を指定）
 * ④行動主体・対象の操作を行うプラグインコマンドを実装
 *
 * バトルイベントの真価を引き出すことが目的であり、
 * このプラグイン自体には、さほど大きな機能はありません。
 * 具体的にバトルイベントで何ができるかは、以下の詳細をご覧ください。
 * http://newrpg.seesaa.net/article/477489099.html
 *
 * 【プラグインコマンド】
 * ◆スキル使用者設定
 * 『戦闘行動の強制』を行う行動主体を上書きします。
 * エディタ上の表示より優先されます。
 *
 * ◆スキル対象設定（絞込）
 * 『戦闘行動の強制』の対象を指定条件で絞り込んだ上で上書きします。
 * エディタ上の表示より優先されます。
 *
 * ◆スキル対象設定（最大最小）
 * 『戦闘行動の強制』の対象を上書きします。
 * 比較によって最大、最小値を持つ対象を求めます。
 * エディタ上の表示より優先されます。
 * 
 * ◆対象検索→スイッチに格納
 * 条件を満たす対象がいるか検索し、結果をスイッチに格納します。
 * 
 * ◆行動判定の無効化
 * true : パラメータの設定に関わらず『戦闘行動の強制』で強制行動を実行します。
 * false: パラメータの設定に関わらず『戦闘行動の強制』で行動判定を実行します。
 *
 * 【スキルのメモ欄】
 * 以下の記述が有効です。
 * 
 * <NoStartAction>
 * スキル発動時の開始演出を省略します。
 * スキルの使用効果でコモンイベントを呼び出す際に、
 * 演出を見せないようにできます。
 * 
 * <AdjustCommonEventActionEnd:true or false>
 * スキルの使用効果でコモンイベントを呼び出す際、
 * 行動終了処理のタイミング調整をするかどうかを切り替えます。
 * ※プラグインパラメータでデフォルト値を設定可能。
 * 
 * trueにすると、コモンイベントの終了時に、
 * 一度だけ行動終了処理を実行するようにします。
 * これにより、解除のタイミングが『行動終了時』のステートが、
 * コモンイベントを起動した直後に解除されてしまう問題に対処します。
 * 
 * 対象となる条件はダメージタイプが『なし』、
 * かつ、使用効果がコモンイベントのみの場合です。
 * 何らかの設定がされていると機能しないのでご注意ください。
 * 
 * なお、この制御はＣＴＢでは不要です。
 * ※NRP_CountTimeBattle.js内の制御で考慮済み。
 * 
 * 【利用規約】
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @------------------------------------------------------------------
 * @ プラグインコマンド
 * @------------------------------------------------------------------
 * 
 * @command forceSubject
 * @text スキル使用者設定
 * @desc 『戦闘行動の強制』を行うスキル使用者を上書きします。
 * エディタ上の表示より優先されます。
 * 
 * @arg subject
 * @text スキル使用者
 * @desc 上書きするスキル使用者を選択します。
 * @type combo
 * @default subject #行動主体
 * @option
 * @option subject #行動主体
 * 
 * @------------------------------------------------------------------
 * 
 * @command forceTargetFilter
 * @text スキル対象設定（絞込）
 * @desc 『戦闘行動の強制』の対象を絞り込んだ条件で上書きします。
 * エディタ上の表示より優先されます。
 * 
 * @arg targetCondition
 * @text 対象条件
 * @desc 上書きするスキル対象の条件を入力します。
 * 例1: b.hp < 100, 例2: b.actorId() == 1
 * @type combo
 * @option
 * @option b.hpRate() <= 0.5 #HP割合
 * @option b._actorId == 1 #アクターID
 * @option b._enemyId == 1 #エネミーID
 * @option b.isStateAffected(1) #ステート
 * @option b.isDead() #戦闘不能
 * @option b.index() == targets.length - 1 #並びが最後尾
 * @option b.hp < a.hp #行動主体よりHPが低い
 * 
 * @arg option
 * @text オプション
 * @type struct<Option>
 * 
 * @------------------------------------------------------------------
 * 
 * @command forceTargetMost
 * @text スキル対象設定（最大最小）
 * @desc 『戦闘行動の強制』の対象を上書きします。
 * 比較によって最大、最小値を持つ対象を求めます。
 * 
 * @arg compareCondition
 * @text 比較条件
 * @desc 対象を求める比較条件を入力します。
 * 例: b1.hpRate() < b2.hpRate() #最もHP%が低い
 * @type combo
 * @option b1.hpRate() < b2.hpRate() #最もHP%が低い
 * @option b1.hpRate() > b2.hpRate() #最もHP%が高い
 * 
 * @arg option
 * @text オプション
 * @type struct<Option>
 * 
 * @------------------------------------------------------------------
 * 
 * @command setConditionSwitch
 * @text 対象検索→スイッチに格納
 * @desc 条件を満たす対象がいるか検索し、結果をスイッチに格納します。
 * 
 * @arg switchNo
 * @text スイッチ
 * @desc 検索結果を格納するスイッチです。
 * 該当者が存在すればON、存在しなければOFFとなります。
 * @type switch
 * @default 1
 * 
 * @arg targetSide
 * @text 対象サイド
 * @desc 条件の対象となるサイドです。bで参照される対象が変化します。
 * @type select
 * @default opponents #相手
 * @option opponents #相手
 * @option friends #自軍
 * @option all #敵味方無差別
 * 
 * @arg condition
 * @text 条件
 * @desc 条件を入力します。
 * bで対象サイドのバトラー、aで行動主体を参照できます。
 * @type combo
 * @option
 * @option b.hpRate() <= 0.5 #対象のHP割合
 * @option b._actorId == 1 #対象のアクターID
 * @option b._enemyId == 1 #対象のエネミーID
 * @option b.isStateAffected(1) #対象のステート
 * @option b.isDead() #戦闘不能
 * @option b.hp < a.hp #行動主体より対象のHPが低い
 * @option $gameTroop.turnCount() % 3 == 0 #ターン
 * 
 * @arg includeDead
 * @text 戦闘不能者を含む
 * @desc 戦闘不能者を検索対象に含みます。
 * @type boolean
 * 
 * @------------------------------------------------------------------
 * 
 * @command superForce
 * @text 行動判定の無効化
 * @desc 戦闘行動の強制時、ＭＰや異常などを無視して行動させます。
 * つまり、本来の戦闘行動の強制の動作に戻します。
 * 
 * @arg forceMode
 * @text 強制モード
 * @desc 行動を強制するかどうかを切替します。
 * @type select
 * @default true
 * @option 指定解除 @value
 * @option 強制する @value true
 * @option 強制しない @value false
 * 
 * @------------------------------------------------------------------
 * 
 * @command randomSkills
 * @text スキルのランダム実行
 * @desc スキルを設定し、ランダムで実行します。
 * 
 * @arg skills
 * @text スキル
 * @desc ランダムで実行するスキルを設定します。
 * @type skill[]
 * 
 * @------------------------------------------------------------------
 * @ プラグインパラメータ
 * @------------------------------------------------------------------
 * 
 * @param forceValid
 * @text 強制行動時のスキル使用判定
 * @type boolean
 * @default true
 * @desc 戦闘行動の強制時もMP切れや行動異常による使用判定を行います。
 * 初期値はtrue。MZの元の挙動はfalseです。
 * 
 * @param actionAtFailure
 * @parent forceValid
 * @text 失敗時の行動
 * @type select
 * @option 何もしない @value 0
 * @option 通常攻撃 @value 1
 * @default 0
 * @desc 沈黙やＭＰ不足などで強制行動に失敗した時の行動です。
 * 
 * @param forceValidFlexible
 * @parent forceValid
 * @text スキル使用判定の影響軽減
 * @type boolean
 * @default true
 * @desc 強制行動時のスキル使用判定がオンの場合でも、イベントコマンドによる実行以外には影響を与えないようにします。
 * 
 * @param aIsSubject
 * @text aで行動主体を参照
 * @type boolean
 * @default true
 * @desc バトルイベント上で常に『a』で行動主体を参照します。
 * この値はスクリプトから参照可能です。
 * 
 * @param adjustCommonEventActionEnd
 * @text ｺﾓﾝｲﾍﾞﾝﾄ時の終了処理を調整
 * @type boolean
 * @default true
 * @desc スキルの使用効果でコモンイベントを呼び出した際、
 * 行動終了処理のタイミングを調整するようにします。
 * 
 * @param stopForceActionHp0
 * @text ＨＰ０でスキル停止
 * @type boolean
 * @default false
 * @desc 不死身ステートかつＨＰが０ならば強制行動時のスキルを停止します。
 * 
 * @param targetImmortalStates
 * @parent stopForceActionHp0
 * @text 対象となる不死身ステート
 * @type state[]
 * @desc ＨＰが０ならば強制行動時のスキルを停止する不死身ステートです。
 */

/*~struct~Option:ja
 * @param targetLimit
 * @text 条件外なら行動しない
 * @desc 条件を満たす対象がいなかった場合、行動を中止します。
 * @type boolean
 * 
 * @param sideChange
 * @text 対象サイドの変更
 * @desc 対象サイドを本来のスキルから変更します。
 * 例えば、味方を攻撃したりできます。
 * @type select
 * @option opponents #相手
 * @option friends #自軍
 * @option all #敵味方無差別
 */

// バトルイベントから使えるように変数定義しておく。
var a;

(function() {
"use strict";

/**
 * ●構造体をJSで扱えるように変換
 */
function parseStruct1(arg) {
    const ret = [];
    if (arg) {
        for (const str of JSON.parse(arg)) {
            ret.push(str);
        }
    }
    return ret;
}
function toNumber(str, def) {
    if (str == undefined || str == "") {
        return def;
    }
    return isNaN(str) ? def : +(str || def);
}
function toBoolean(val, def) {
    // 空白なら初期値を返す
    if (val === "" || val === undefined) {
        return def;
        
    // 既にboolean型なら、そのまま返す
    } else if (typeof val === "boolean") {
        return val;
    }
    // 文字列ならboolean型に変換して返す
    return val.toLowerCase() == "true";
}

const PLUGIN_NAME = "NRP_BattleEventEXMZ";
const parameters = PluginManager.parameters(PLUGIN_NAME);

const pForceValid = toBoolean(parameters["forceValid"], true);
const pActionAtFailure = toNumber(parameters["actionAtFailure"], 0);
const pForceValidFlexible = toBoolean(parameters["forceValidFlexible"], true);
const pAIsSubject = toBoolean(parameters["aIsSubject"], true);
const pAdjustCommonEventActionEnd = toBoolean(parameters["adjustCommonEventActionEnd"], true);
const pStopForceActionHp0 = toBoolean(parameters["stopForceActionHp0"], false);
const pTargetImmortalStates = parseStruct1(parameters["targetImmortalStates"]);

let mForceValid = pForceValid;

// 強制行動時のスキル使用判定がオン
if (pForceValid) {
    // スキル使用判定の影響軽減がオンの場合
    if (pForceValidFlexible) {
        mForceValid = false;
    } else {
        mForceValid = true;
    }
}

var plSuperForce = undefined;
var plForceSubject = undefined;
var plForceTargetsCondition = undefined;
var plForceCompareCondition = undefined;
var plForceTargets = undefined;
var plTargetLimit = undefined;
var plSideChange = undefined;

/**
 * ●変数クリア
 */
function clearParam() {
    // 強制行動実行フラグ
    // true,falseと区別するため、あえてundefinedで初期化
    plSuperForce = undefined;
    // 強制行動行動主体
    plForceSubject = undefined;
    // 強制行動ターゲット
    plForceTargetsCondition = undefined;
    plForceCompareCondition = undefined;
    plForceTargets = undefined;
    // 対象制限
    plTargetLimit = undefined;
    // 対象サイド反転
    plSideChange = undefined;
}

/**
 * ●行動主体を強制上書き
 */
PluginManager.registerCommand(PLUGIN_NAME, "forceSubject", function(args) {
    let subject = BattleManager._subject;
    if (!subject && BattleManager._action){
        subject = BattleManager._action.subject();
    }

    const value = getCommandValue(args.subject);
    plForceSubject = eval(value);

    // aで行動主体を参照できるようにする。
    if (pAIsSubject) {
        a = plForceSubject;
    }
});

/**
 * ●スキル対象設定（絞込）
 */
PluginManager.registerCommand(PLUGIN_NAME, "forceTargetFilter", function(args) {
    const value = getCommandValue(args.targetCondition);
    // 後で評価するため、ここではevalしない。
    plForceTargetsCondition = value;
    // 空白ならtrueにしておく。
    if (!plForceTargetsCondition) {
        plForceTargetsCondition = true;
    }

    // オプション設定
    if (args.option) {
        const option = JSON.parse(args.option);

        plTargetLimit = toBoolean(option.targetLimit);
        plSideChange = getCommandValue(option.sideChange);
    }
});

/**
 * ●スキル対象設定（最大最小）
 */
PluginManager.registerCommand(PLUGIN_NAME, "forceTargetMost", function(args) {
    const value = getCommandValue(args.compareCondition);
    // 後で評価するため、ここではevalしない。
    plForceCompareCondition = value;
    // 空白ならtrueにしておく。
    if (!plForceCompareCondition) {
        plForceCompareCondition = true;
    }

    // オプション設定
    if (args.option) {
        const option = JSON.parse(args.option);

        plTargetLimit = toBoolean(option.targetLimit);
        plSideChange = getCommandValue(option.sideChange);
    }
});

/**
 * ●条件判定をスイッチに格納
 */
PluginManager.registerCommand(PLUGIN_NAME, "setConditionSwitch", function(args) {
    // 条件参照用に行動主体を設定
    let a = BattleManager._subject;
    if (!a){
        a = BattleManager._action.subject();
    }

    const switchNo = getCommandValue(args.switchNo);
    const targetSide = getCommandValue(args.targetSide);
    const condition = getCommandValue(args.condition);
    const includeDead = getCommandValue(args.includeDead);

    let targets;
    // 対象が仲間
    if (targetSide == "friends") {
        // 条件を満たしたアクターでフィルタリング
        targets = a.friendsUnit().members();

    // 対象が敵
    } else if (targetSide == "opponents") {
        targets = a.opponentsUnit().members();

    // 対象が敵味方全員
    } else if (targetSide == "all") {
        targets = BattleManager.allBattleMembers();
    }

    // 戦闘不能者を含まない場合
    if (!includeDead) {
        // 生存者のみに限定
        targets = targets.filter(target => target.isAlive());
    }

    // 条件を満たす対象がいるか評価
    let result = targets.some(b => eval(condition));

    // スイッチにセットする。
    $gameSwitches.setValue(switchNo, result);
});

/**
 * ●行動判定の無効化
 */
PluginManager.registerCommand(PLUGIN_NAME, "superForce", function(args) {
    const value = getCommandValue(args.forceMode);
    plSuperForce = eval(value);
});

/**
 * ●行動判定の無効化
 */
PluginManager.registerCommand(PLUGIN_NAME, "randomSkills", function(args) {
    // 行動主体を設定
    let subject = BattleManager._subject;
    if (plForceSubject) {
        subject = plForceSubject;
    } else if (!subject){
        subject = BattleManager._action.subject();
    }

    const skills = JSON.parse(args.skills);
    const filterSkills = skills.filter(skill => subject.canUse($dataSkills[skill]))

    let skillId = 1;
    // ランダムでスキルを取得
    if (filterSkills.length > 0) {
        skillId = filterSkills[Math.randomInt(filterSkills.length)];
    }

    // 使用不可なら中止
    if (!subject.canUse($dataSkills[skillId])) {
        return;
    }

    // 戦闘行動の強制を実行
    subject.forceAction(skillId, -1);
    BattleManager.forceAction(subject);
    this.setWaitMode('action');
});

/**
 * ●プラグインコマンドの値を取得する。
 */
function getCommandValue(value) {
    // #以降は注釈扱いなので除去
    // さらに前後の空白を除去する。
    return value.split("#")[0].trim();
}

/**
 * ●変数初期化
 */
var _BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
    _BattleManager_initMembers.apply(this);

    // 変数クリア
    clearParam();

    // 終了処理を無視するためのフラグ
    this._ignoreAllActionsEnd = undefined;
};

/**
 * ●コマンド入力開始
 */
var _BattleManager_startInput = BattleManager.startInput;
BattleManager.startInput = function() {
    // 強制行動実行フラグ初期化
    plSuperForce = undefined;

    // 元処理実行
    _BattleManager_startInput.apply(this);
};

/**
 * ●次の行動主体取得
 */
const _BattleManager_getNextSubject = BattleManager.getNextSubject;
BattleManager.getNextSubject = function() {
    // プラグインコマンドから設定した値をクリア（次の行動主体へ引き継がない）
    clearParam();

    const subject = _BattleManager_getNextSubject.apply(this, arguments);

    // aで行動主体を参照できるようにする。
    if (pAIsSubject) {
        a = subject;
    }

    return subject;
};

/**
 * ●行動開始
 */
const _BattleManager_startAction = BattleManager.startAction;
BattleManager.startAction = function() {
    const subject = this._subject;
    // aで行動主体を参照できるようにする。
    if (pAIsSubject) {
        a = subject;
    }

    const action = subject.currentAction();
    
    // 行動が取得できなかったり、対象が全滅していれば終了
    // ※戦闘行動の強制などで味方の全滅後に敵が行動した場合など
    // （これがないと落ちる）
    if (!action.item()) {
        this._phase = "action";
        return;
    // 対象が敵
    } else if (action.isForOpponent() && action.opponentsUnit().isAllDead()) {
        this._phase = "action";
        return;
    // 対象が味方
    } else if (action.isForFriend() && action.friendsUnit().isAllDead()) {
        this._phase = "action";
        return;
    }

    // ＨＰ０以下で停止
    if (pStopForceActionHp0 && subject.hp <= 0) {
        // ステートが一致している場合
        if (matchImmortalStates(subject)) {
            this._phase = "action";
            return;
        }
    }

    // 強制状態でなければ、有効判定を行う。
    if (!this.isForceEX()) {
        // かつ、戦闘行動の強制状態ならば、混乱処理を行う。
        // ※戦闘行動の強制では、この処理を飛ばしているため。
        if (this._turnForced && subject.isConfused()) {
            action.setConfusion();
        }
        // 実行不能なら終了
        if (!action.isForceValid()) {
            // 失敗時の行動が1:通常攻撃の場合
            if (pActionAtFailure == 1) {
                // 通常攻撃が可能なら、そちらを実行
                if (subject.canUse($dataSkills[subject.attackSkillId()])) {
                    action.setAttack();
                    // 元処理実行
                    _BattleManager_startAction.apply(this);
                    return;
                }
            }

            // ターン終了時に戦闘行動の強制が行われた場合
            // ここでphaseを進めないと戻し処理が行われない模様
            this._phase = "action";
            return;
        }
    }
    
    // 元処理実行
    _BattleManager_startAction.apply(this);
};

/**
 * ●不死身ステートに一致するかどうか？
 */
function matchImmortalStates(subject) {
    // 不死身ステートの指定がないなら有効
    if (!pTargetImmortalStates || pTargetImmortalStates.length == 0) {
        return true;
    }
    // 不死身ステートに一致するなら有効
    if (pTargetImmortalStates.some(stateId => subject._states.includes(toNumber(stateId)))) {
        return true;
    }
    return false;
}

/**
 * ●強制アクション実行
 */
const _BattleManager_processForcedAction = BattleManager.processForcedAction;
BattleManager.processForcedAction = function() {
    // 強制ターンフラグ
    // ※元々、ＭＶにあったフラグだが、ＭＺには本来ないフラグ。
    this._turnForced = true;
    _BattleManager_processForcedAction.apply(this, arguments);
    // フラグ解除
    this._turnForced = undefined;

    // スキル使用判定の影響軽減がオンの場合
    if (isForceValidFlexible()) {
        // 行動制約の無視しない設定を解除
        // ※ツクールの標準の挙動に戻す。
        mForceValid = false;
    }
};

/**
 * 超強制フラグを考慮した強制状態の判定
 * this._turnForcedなどの値を極力変えず、この関数で判定する。
 * 
 * true:  行動制約を無視して行動（本来の戦闘行動の強制の挙動）
 * false: 行動制約を受ける。
 */
BattleManager.isForceEX = function() {
    // 戦闘行動の強制の場合
    if (this._turnForced) {
        // 超強制フラグがtrueならば
        if (plSuperForce == true) {
            return true;
            
        // 超強制フラグがfalseならば
        } else if (plSuperForce == false) {
            return false;
            
        // 超強制フラグがundefinedのままなら、
        } else if (plSuperForce == undefined) {
            // パラメータの設定に従って判定を行う
            if (mForceValid) {
                return false;
            }
        }
        // それ以外はtrue
        return true;
    }
};

/**
 * ●【独自】戦闘行動の強制専用の有効判定
 * ※元のisValid()と異なり、強制時でも使用判定を行う。
 */
Game_Action.prototype.isForceValid = function() {
    return this.subject().canUse(this.item());
};

/**
 * ●アクション開始メッセージ＆演出
 */
const _Window_BattleLog_startAction = Window_BattleLog.prototype.startAction;
Window_BattleLog.prototype.startAction = function(subject, action, targets) {
    // 対象制限時
    if (action._forcing && plTargetLimit) {
        // 対象が存在しなければ処理をしない。
        // ただし、範囲が『なし』の場合は除く。
        if (targets.length == 0 && action.item().scope != 0) {
            return;
        }
    }
    const item = action.item();
    // スキルメモ欄に<NoStartAction>が設定されているなら開始演出を省略
    if (item.meta.NoStartAction) {
        // アニメーションが設定されている場合は、アニメーションとウェイトだけを残す
        if (item.animationId) {
            this.push('showAnimation', subject, targets.clone(), item.animationId);
            this.push('wait');
        }
        return;
    }
    
    // 元処理実行
    _Window_BattleLog_startAction.apply(this, arguments);
};

/**
 * ●アクション終了処理
 */
const _Window_BattleLog_endAction = Window_BattleLog.prototype.endAction;
Window_BattleLog.prototype.endAction = function(subject) {
    // aで行動主体を参照できるようにする。
    // ※NRP_CounterSkill.jsの競合対策
    if (pAIsSubject) {
        a = subject;
    }

    const action = BattleManager._action;
    if (action) {
        const item = action.item();
        // スキルメモ欄に<NoStartAction>が設定されているなら終了演出を省略
        // ただし、アニメーションが未設定の場合のみ
        if (item.meta.NoStartAction && !item.animationId) {
            return;
        }
    }

    // 元処理実行
    _Window_BattleLog_endAction.apply(this, arguments);
};

/**
 * ●戦闘行動の強制
 */
const _Game_Interpreter_command339 = Game_Interpreter.prototype.command339;
Game_Interpreter.prototype.command339 = function(params) {
    // スキル使用判定の影響軽減がオンの場合
    if (isForceValidFlexible()) {
        // 行動制約を無視しない
        mForceValid = true;
    }

    // プラグインコマンドで行動主体の上書きが指定されていた場合
    if (plForceSubject) {
        var isActor = params[0];      // 敵なら0, 味方なら1
        var subjectNo = params[1]; // 行動主体のインデックス（アクターならアクターＩＤ）
        var targetIndex = params[3];  // 対象のインデックス

        // 行動主体の上書き
        if (plForceSubject) {
            isActor = plForceSubject.isActor() ? 1 : 0;
            // 敵キャラはインデックス、アクターはＩＤを参照
            if (isActor) {
                subjectNo = plForceSubject.actorId();
            } else {
                subjectNo = plForceSubject.index();
            }
        }

        this.iterateBattler(isActor, subjectNo, function(battler) {
            if (!battler.isDeathStateAffected()) {
                battler.forceAction(params[2], targetIndex);
                BattleManager.forceAction(battler);
                this.setWaitMode('action');
            }
        }.bind(this));
        return true;
    }

    // 元処理実行
    return _Game_Interpreter_command339.apply(this, arguments);
};

/**
 * ●【独自】戦闘行動の強制（引数使用）
 */
Game_Interpreter.prototype.forceAction = function(subject, skillId, targetId) {
    const subjectIsActor = subject.isActor() ? 1 : 0;
    
    // 敵キャラはインデックス、アクターはＩＤを参照
    if (subjectIsActor) {
        subjectNo = subject.actorId();
    } else {
        subjectNo = subject.index();
    }

    this.iterateBattler(subjectIsActor, subjectNo, function(battler) {
        if (!battler.isDeathStateAffected()) {
            battler.forceAction(skillId, targetId);
            BattleManager.forceAction(battler);
            this.setWaitMode('action');
        }
    }.bind(this));
    return true;
};

/**
 * ●バトラーに対する戦闘行動の強制
 */
const Game_Battler_forceAction = Game_Battler.prototype.forceAction;
Game_Battler.prototype.forceAction = function(skillId, targetIndex) {
    // 対象リストの作成
    if (plForceTargetsCondition || plForceCompareCondition) {
        // NRP_EnemyRoutineKaiとの競合対策
        // 対象が-1（ランダム）だとルーチン改善対象となってしまうので、
        // 0に変更して対象から除外しておく。
        if (targetIndex === -1) {
            targetIndex = 0;
        }
    }

    // 元処理実行
    Game_Battler_forceAction.call(this, skillId, targetIndex);
};

/**
 * ●ターゲットの決定
 */
const _Game_Action_makeTargets = Game_Action.prototype.makeTargets;
Game_Action.prototype.makeTargets = function() {
    // 強制状態でなければ、混乱処理を行う。
    if (!BattleManager.isForceEX() && this.subject().isConfused()) {
        return this.repeatTargets([this.confusionTarget()]);
    }

    // 対象リストの作成
    if (plForceTargetsCondition || plForceCompareCondition) {
        let targets;
        let isOpponents = false;
        let isFrineds = false;
        let isAll = false;

        // 対象サイドの変更がある場合は優先
        if (plSideChange == "opponents") {
            isOpponents = true;

        } else if (plSideChange == "friends") {
            isFrineds = true;

        } else if (plSideChange == "all") {
            isAll = true;

        // 対象が敵
        } else if (this.isForOpponent()) {
            isOpponents = true;

        // 対象が仲間
        } else if (this.isForFriend()) {
            isFrineds = true;
        }

        // 対象が仲間
        if (isFrineds) {
            // 条件を満たした仲間でフィルタリング
            targets = this.friendsUnit().members();
    
        // 対象が敵
        } else if (isOpponents) {
            targets = this.opponentsUnit().members();

        // 対象が敵味方
        } else if (isAll) {
            targets = BattleManager.allBattleMembers();

        // 該当がなければ何もしない
        } else {
            return _Game_Action_makeTargets.apply(this);
        }

        // 戦闘不能者が対象の場合
        if (this.isForDeadFriend()) {
            targets = targets.filter(target => target.isDead());

        // 12:無差別以外
        } else if (!this.checkItemScope([12])) {
            // 生存者のみに限定
            targets = targets.filter(target => target.isAlive());
        }

        // この時点で対象がいなければ処理しない
        if (targets.length == 0) {
            return _Game_Action_makeTargets.apply(this);
        }

        // 行動主体を参照できるように設定
        const a = this.subject();

        // 条件を満たした対象でフィルタリング
        if (plForceTargetsCondition) {
            plForceTargets = targets.filter(b => eval(plForceTargetsCondition));
            
        // 最大最小値を求める
        } else if (plForceCompareCondition) {
            // シャッフルして対象をランダム化する。
            shuffleArray(targets);
            plForceTargets = [targets.reduce((b1, b2) => eval(plForceCompareCondition + " ? b1 : b2"))];
        }
    }
    
    return _Game_Action_makeTargets.apply(this);
};

/**
 * ●配列の中身をシャッフルする。
 * ※フィッシャー–イェーツのシャッフル
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var r = Math.floor(Math.random() * (i + 1));
        var tmp = array[i];
        array[i] = array[r];
        array[r] = tmp;
    }
}

/**
 * ●【独自】対象リストが指定されている場合の狙われ率合計を取得する。
 */
Game_Unit.prototype.forceTgrSum = function() {
    if (plForceTargets) {
        return plForceTargets.reduce(function(r, member) {
            return r + member.tgr;
        }, 0);
    }

    // 取得できなければ普通に返す
    return this.tgrSum();
};

/**
 * ●狙われ率を考慮して、ランダムにターゲットを取得する。
 */
const _Game_Unit_randomTarget = Game_Unit.prototype.randomTarget;
Game_Unit.prototype.randomTarget = function() {
    /*
     * 強制対象リストの指定があれば、そちらで判定を行う。
     */
    if (plForceTargets) {
        var tgrRand = Math.random() * this.forceTgrSum();
        var target = null;
            
        plForceTargets.forEach(function(member) {
            tgrRand -= member.tgr;
            if (tgrRand <= 0 && !target) {
                target = member;
            }
        });

        // 対象が取得できた場合だけreturnする。
        // 取得できなければ通常のターゲット処理に移る。
        if (target) {
            return target;

        // 対象制限時は値が空でもそのまま返す
        } else if (plTargetLimit) {
            return target;
        }
    }
    
    // 元処理実行
    return _Game_Unit_randomTarget.apply(this);
};

/**
 * ●ターゲット不能時に補正を行う
 */
const _Game_Unit_smoothTarget = Game_Unit.prototype.smoothTarget;
Game_Unit.prototype.smoothTarget = function(index) {
    /*
     * 強制対象リストの指定があれば、そちらで判定を行う。
     */
    if (plForceTargets) {
        let tgrRand = Math.random() * this.forceTgrSum();
        let target = null;
            
        plForceTargets.forEach(function(member) {
            tgrRand -= member.tgr;
            if (tgrRand <= 0 && !target) {
                target = member;
            }
        });

        // 対象が取得できた場合だけreturnする。
        // 取得できなければ通常のターゲット処理に移る。
        if (target) {
            return target;

        // 対象制限時は値が空でもそのまま返す
        } else if (plTargetLimit) {
            return target;
        }

        // 対象が取得できなければ、ランダムに再取得
        target = this.randomTarget();
        if (target) {
            index = target.index();
        }
    }
    
    // 元処理実行
    return _Game_Unit_smoothTarget.call(this, index);
};

/**
 * ●相手サイドが対象
 */
const _Game_Action_targetsForOpponents = Game_Action.prototype.targetsForOpponents;
Game_Action.prototype.targetsForOpponents = function() {
    // 強制対象リストの指定があれば、通常の処理を行う。
    // ※NRP_EnemyRoutineKai.jsとの競合対策
    if (plForceTargets) {
        const unit = this.opponentsUnit();
        if (this.isForRandom()) {
            return this.randomTargets(unit);
        } else {
            return this.targetsForAlive(unit);
        }
    }
    return _Game_Action_targetsForOpponents.apply(this, arguments);
};

/**
 * ●味方サイドが対象
 */
const _Game_Action_targetsForFriends = Game_Action.prototype.targetsForFriends;
Game_Action.prototype.targetsForFriends = function() {
    // 強制対象リストの指定があれば、通常の処理を行う。
    // ※NRP_EnemyRoutineKai.jsとの競合対策
    if (plForceTargets) {
        const unit = this.friendsUnit();
        if (this.isForUser()) {
            return [this.subject()];
        } else if (this.isForDeadFriend()) {
            return this.targetsForDead(unit);
        } else if (this.isForAliveFriend()) {
            return this.targetsForAlive(unit);
        } else {
            return this.targetsForDeadAndAlive(unit);
        }
    }
    return _Game_Action_targetsForFriends.apply(this, arguments);
};

/**
 * ●生存者向け共通
 */
const _Game_Action_targetsForAlive = Game_Action.prototype.targetsForAlive;
Game_Action.prototype.targetsForAlive = function(unit) {
    // 強制対象リストが指定されている場合
    // かつ、全体対象時
    if (!this.isForOne() && plForceTargets && plForceTargets.length > 0) {
        // シャッフルして対象をランダム化する。
        shuffleArray(plForceTargets);
        // 先頭のバトラーを対象サイドとして取得
        return plForceTargets[0].friendsUnit().aliveMembers();
    }
    
    return _Game_Action_targetsForAlive.apply(this, arguments);
};

/**
 * ●対象無条件共通
 */
const _Game_Action_targetsForDeadAndAlive = Game_Action.prototype.targetsForDeadAndAlive;
Game_Action.prototype.targetsForDeadAndAlive = function(unit) {
    // 強制対象リストが指定されている場合
    // かつ、全体対象時
    if (!this.isForOne() && plForceTargets && plForceTargets.length > 0) {
        // シャッフルして対象をランダム化する。
        shuffleArray(plForceTargets);
        // 先頭のバトラーを対象サイドとして取得
        return plForceTargets[0].friendsUnit().members();
    }

    return _Game_Action_targetsForDeadAndAlive.apply(this, arguments);
};

/**
 * ●全体の効果
 * ※通常はコモンイベントの処理のみ
 */
const _Game_Action_applyGlobal = Game_Action.prototype.applyGlobal;
Game_Action.prototype.applyGlobal = function() {
    // ダメージタイプが『なし』の場合、かつ使用効果が存在
    if (this.item().damage.type == 0 && this.item().effects.length > 0) {
        // かつ、使用効果がコモンイベントのみの場合
        const isCommonEvent = this.item().effects.every(function(effect) {
            return effect.code === Game_Action.EFFECT_COMMON_EVENT;
        });
        if (isCommonEvent) {
            // コモンイベント呼び出し時、終了処理のタイミング調整を行う制御。
            if (getAdjustCommonEventActionEnd(this)) {
                BattleManager._ignoreAllActionsEnd = true;
            }
        }
    }

    _Game_Action_applyGlobal.apply(this, arguments);
};

/**
 * ●コモンイベントの終了処理のタイミング調整を行うかどうか？
 */
function getAdjustCommonEventActionEnd(action) {
    const item = action.item();

    // メモ欄の設定値がある場合は、そちらを優先
    let adjustCommonEventActionEnd = item.meta.AdjustCommonEventActionEnd;
    if (adjustCommonEventActionEnd !== undefined) {
        // 文字列なのでtrue/falseに変換
        return toBoolean(adjustCommonEventActionEnd);
    }

    // それ以外はパラメータから取得
    return pAdjustCommonEventActionEnd;
}

/**
 * ●行動終了時
 */
const _Game_Battler_onAllActionsEnd = Game_Battler.prototype.onAllActionsEnd;
Game_Battler.prototype.onAllActionsEnd = function() {
    // コモンイベントに対する終了処理を行わない。
    if (BattleManager._ignoreAllActionsEnd) {
        // 結果のクリアのみ実行
        this.clearResult();
        return;
    }

    _Game_Battler_onAllActionsEnd.apply(this, arguments);
};

/**
 * ●イベント終了時
 */
const _Game_Interpreter_terminate = Game_Interpreter.prototype.terminate;
Game_Interpreter.prototype.terminate = function() {
    _Game_Interpreter_terminate.apply(this, arguments);

    // 戦闘中のコモンイベントの場合
    if ($gameParty.inBattle() && BattleManager._ignoreAllActionsEnd) {
        // フラグをクリアし、行動終了処理を呼ぶ
        BattleManager._ignoreAllActionsEnd = undefined;

        if (BattleManager._action) {
            // 行動主体を取得し、行動終了処理を実行
            const subject = BattleManager._action.subject();
            if (subject) {
                subject.onAllActionsEnd();
            }
        }
    }
};

/**
 * ●スキル使用判定の影響軽減がオンの場合
 */
function isForceValidFlexible() {
    return pForceValid && pForceValidFlexible;
}

})();
