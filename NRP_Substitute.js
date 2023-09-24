//=============================================================================
// NRP_Substitute.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.01 Extends the substitute effect.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @orderAfter NRP_DynamicAnimationMZ
 * @url https://newrpg.seesaa.net/article/500482565.html
 *
 * @help Extends the substitute effect.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Plugin parameters allow you
 * to adjust the standard substitution behavior.
 * You can also insert a direction when the substitution is triggered.
 * ※The direction to the actor cannot be displayed in the front view.
 * 
 * In addition, the flow of the performance
 * by the substitute will be changed.
 * Normally, only damage and other effects are substituted,
 * but this plug-in changes the target of the skill itself.
 * In other words, the animation will be displayed for the battler
 * who performs the substitution.
 * 
 * If you want to be even more particular,
 * you can set up a substitution effect for objects with traits.
 * 
 * For example, you can create separate
 * "states that only protect against physical attacks" and
 * "states that only protect against magical attacks".
 * 
 * -------------------------------------------------------------------
 * [Note (actor, enemy, class, equipment, state, skill, item)]
 * -------------------------------------------------------------------
 * ※As for skills, they are passive skills
 *   that only need to be learned to be effective.
 * ※Formulas can also be used for each item.
 * 
 * ◆Required
 * <Substitute:50>
 * 50% chance to execute the substitute.
 * When omitted (<Substitute>), it is activated at 100%.
 * 
 * ◆Performance
 * <SubstituteAnimationId:100>
 * The number 100 animation is displayed
 * to the activator of the substitution.
 * 
 * <SubstituteDynamicId:100>
 * In conjunction with DynamicAnimation & Motion,
 * a substitute activator executes the production of Skill ID. 100.
 * ※It takes precedence over the animation described above.
 * 
 * <SubstituteWait:30>
 * The waiting time (in 1/60 second increments)
 * when the substitute is activated.
 * 
 * ◆Condition
 * <SubstituteHpRate:50>
 * Protects fellow members with less than 50% HP.
 * 
 * <SubstituteDamageType:1,5>
 * Damage type 1,5 skills are targeted for substitution.
 * 1:HP Damage, 2:MP Damage, 3:HP Recover, 4:MP Recover,
 * 5:HP Drain, 6:MP Drain
 * If omitted, the plugin parameter settings are used.
 * If left blank, all are valid.
 * 
 * <SubstituteHitType:1>
 * Targets skills of hit type 1 for substitution.
 * 0:Certain Hit, 1:Physical Attack, 2:Magic Attack
 * If omitted, the plugin parameter settings are used.
 * If left blank, all are valid.
 * 
 * <SubstituteSkillType:0,2>
 * Skill type 0,2 skills are targeted for substitution.
 * Skill types can be set in the database.
 * Normally, 1 is Magic, 2:Special.
 * Also, 0 is treated as a normal attack.
 * If omitted, the plugin parameter settings are used.
 * If left blank, all are valid.
 * 
 * <SubstituteForOne>
 * Only skills with a single (& random) range
 * are targeted for substitution.
 * <SubstituteForOne:false> for all.
 * If omitted, the plugin parameter settings are used.
 * 
 * <SubstituteItem> / <SubstituteItem:false>
 * Performs substitution for items as well. (Off with false)
 * If omitted, the plugin parameter settings are used.
 * 
 * ◆Counter Group
 * <CounterGroupInclude:attack>
 * It takes the place of the skill's counter group name "attack".
 * For counter groups, see below.
 * 
 * <CounterGroupExcept:attack>
 * It does not substitute
 * when the skill's counter group name is "attack"
 * 
 * -------------------------------------------------------------------
 * [Note (skill, item)]
 * -------------------------------------------------------------------
 * <SubstituteDisabled>
 * This skill is not to be taken as a substitute.
 * 
 * <CounterGroup:attack>
 * Set the counter group to "attack".
 * 
 * -------------------------------------------------------------------
 * [Note (state]
 * -------------------------------------------------------------------
 * <SubstituteDisabled>
 * Prohibits substitution while this state is in effect.
 * 
 * Note that battlers who are in the "Cannot Move" restriction state
 * will not execute the substitution from the beginning.
 * 
 * -------------------------------------------------------------------
 * [Counter Group]
 * -------------------------------------------------------------------
 * Supports integration with the counter plugin (NRP_CounterSkill.js),
 * allowing counter skills
 * and substitutes to share counter group settings.
 * ※This plugin is also effective on its own.
 * 
 * The counter group is useful when you want
 * to make detailed judgments for each skill.
 * For example, if you want to set up that bow skills
 * cannot be substituted, you can do so as follows
 * 
 * Set the note for the bow skill and the counter group to 'bow'.
 * <CounterGroup:bow>
 * 
 * Next, set the note for the substitute state
 * and disable the counter group "bow".
 * <CounterGroupExcept:bow>
 * 
 * Conversely, if you wish to create a state in which only
 * the bow skill is the target of the substitution,
 * set the following in the note.
 * <CounterGroupInclude:bow>
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
 * @param CoverDefaultSubstitute
 * @type boolean
 * @default true
 * @desc The default substitution should also be handled by this plugin.
 * 
 * @param SubstituteHpRate
 * @type number
 * @default 25
 * @desc Performs a substitution if a fellow member's HP falls below this percentage.
 * 
 * @param TargetDamageType
 * @type string
 * @default 1,5
 * @desc Damage type targeted for substitution. 0:なし, 1:HP Damage, 2:MP Damage, 3:HP Recover, 4:MP Recover, 5:HP Drain, 6:MP Drain
 * 
 * @param TargetHitType
 * @type string
 * @default 1,2
 * @desc The hit type of the skill targeted for substitution.
 * 0:Certain Hit, 1:Physical Attack, 2:Magic Attack
 * 
 * @param TargetSkillType
 * @type string
 * @default 0,1,2
 * @desc Skill type to be targeted for substitution.
 * With standard, 0: Normal Attack, 1: Magic, 2: Special.
 * 
 * @param TargetForOneSkill
 * @type boolean
 * @default false
 * @desc Only skills with a single range are targeted for substitution.
 * 
 * @param SubstituteItem
 * @type boolean
 * @default false
 * @desc It also executes a substitution for the item.
 * 
 * @param AnimationId
 * @type animation
 * @desc This is an animation that is executed when a substitute is activated.
 * 
 * @param DynamicSkill
 * @type skill
 * @desc A DynamicAnimation&Motion skill that is executed when a substitute is activated. It has a higher priority than AnimationId.
 * 
 * @param SvMotionDuration
 * @parent DynamicSkill
 * @type number
 * @desc Priority display of SV motion at the time of substitution for a specified time. If blank, use Wait.
 * 
 * @param Wait
 * @type numer
 * @default 10
 * @desc The waiting time when the substitution is activated, in 1/60 second increments.
 * 
 * @param <Counter Skill>
 * 
 * @param CounterGroup
 * @parent <Counter Skill>
 * @type string
 * @desc This is a counter group where substitution becomes effective.
 * 
 * @param CounterGroupNG
 * @parent <Counter Skill>
 * @type string
 * @desc This is a counter group for which the substitution is invalid.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.01 身代わりの効果を拡張する。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @orderAfter NRP_DynamicAnimationMZ
 * @url https://newrpg.seesaa.net/article/500482565.html
 *
 * @help 身代わりの効果を拡張します。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * プラグインパラメータによって、標準の身代わりの挙動を調整できます。
 * 身代わりを発動した際の演出も挿入することができます。
 * ※フロントビューではアクターへの演出は表示できません。
 * 
 * また、身代わりによる演出の流れが変更されます。
 * 通常はダメージなどの効果だけを肩代わりする仕様なのですが、
 * 当プラグインではスキルの対象そのものを変化させます。
 * つまり、アニメーションも身代わりするバトラーに対して表示されます。
 * 
 * さらにこだわるならば、特徴を持つオブジェクトに対して、
 * 身代わりの効果を持った設定をすることができます。
 * 
 * 例えば、「物理攻撃だけをかばうステート」と
 * 「魔法攻撃だけをかばうステート」を別々に作成できます。
 * 
 * -------------------------------------------------------------------
 * ■アクター、エネミー、職業、装備、ステート、スキルのメモ欄
 * -------------------------------------------------------------------
 * ※スキルについては覚えているだけで、発動するパッシブスキルとなります。
 * ※各項目は数式も使用可です。
 * 
 * ◆必須項目
 * <Substitute:50>
 * ５０％の確率で身代わりを実行します。
 * 省略時（<Substitute>）は１００％で発動します。
 * 
 * ◆演出
 * <SubstituteAnimationId:100>
 * １００番のアニメーションを身代わり実行者に表示します。
 * 
 * <SubstituteDynamicId:100>
 * DynamicAnimation & Motionと連携し、
 * スキル１００番の演出を身代わり実行者が実行します。
 * ※上述のアニメーションより優先されます。
 * 
 * <SubstituteWait:30>
 * 身代わり発動時のウェイト（1/60秒単位）です。
 * 
 * ◆発動条件
 * <SubstituteHpRate:50>
 * ＨＰが５０％以下の仲間をかばいます。
 * 
 * <SubstituteDamageType:1,5>
 * ダメージタイプ1,5のスキルを身代わりの対象にします。
 * 1:HPダメージ, 2:MPダメージ, 3:HP回復, 4:MP回復, 5:HP吸収, 6:MP回復です。
 * 省略時はプラグインパラメータの設定を使用します。
 * 空欄にした場合は全て有効となります。
 * 
 * <SubstituteHitType:1>
 * 命中タイプ1のスキルを身代わりの対象にします。
 * 0:必中, 1:物理攻撃, 2:魔法攻撃です。
 * 省略時はプラグインパラメータの設定を使用します。
 * 空欄にした場合は全て有効となります。
 * 
 * <SubstituteSkillType:0,2>
 * スキルタイプ0,2のスキルを身代わりの対象にします。
 * スキルタイプはデータベースで設定できます。
 * 通常だと1は魔法、2:必殺技です。
 * また、0は通常攻撃として扱われます。
 * 省略時はプラグインパラメータの設定を使用します。
 * 空欄にした場合は全て有効となります。
 * 
 * <SubstituteForOne>
 * 範囲が単体（＋ランダム）のスキルだけを身代わりの対象にします。
 * <SubstituteForOne:false>で全てを対象にします。
 * 省略時はプラグインパラメータの設定を使用します。
 * 
 * <SubstituteItem> / <SubstituteItem:false>
 * アイテムに対しても身代わりを実行します。（falseでオフ）
 * 省略時はプラグインパラメータの設定を使用します。
 * 
 * ◆反撃グループ
 * <CounterGroupInclude:attack>
 * スキルの反撃グループ名が『attack』の場合に身代わりをします。
 * ※反撃グループに対しては後述します。
 * 
 * <CounterGroupExcept:attack>
 * スキルの反撃グループ名が『attack』の場合に身代わりしません。
 * 
 * -------------------------------------------------------------------
 * ■スキル、アイテムのメモ欄
 * -------------------------------------------------------------------
 * <SubstituteDisabled>
 * このスキルを身代わりで受けられないようにします。
 * 
 * <CounterGroup:attack>
 * 反撃グループを『attack』に設定します。
 * 
 * -------------------------------------------------------------------
 * ■ステートのメモ欄
 * -------------------------------------------------------------------
 * <SubstituteDisabled>
 * このステートにかかっている間、身代わりを禁止します。
 * 
 * なお、『行動できない』の行動制約ステートに
 * かかっているバトラーは元から身代わりを実行しません。
 * 
 * -------------------------------------------------------------------
 * ■反撃グループ
 * -------------------------------------------------------------------
 * 反撃プラグイン（NRP_CounterSkill.js）との連携に対応し、
 * 反撃スキルと身代わりで、反撃グループの設定を共有できます。
 * ※このプラグイン単独でも有効です。
 * 
 * 反撃グループはスキル毎の詳細な判定を行いたい場合に有効です。
 * 例えば、弓スキルは身代わりできないといった設定にしたい場合は
 * 次のように設定すればＯＫです。
 * 
 * 弓スキルのメモ欄を設定し、反撃グループを『bow』にする。
 * <CounterGroup:bow>
 * 
 * 次に身代わり用ステートのメモ欄を設定し、反撃グループ『bow』を無効にする。
 * <CounterGroupExcept:bow>
 * 
 * 逆に弓スキルのみ身代わりの対象とするステートを作成したい場合は、
 * メモ欄に以下のように設定します。
 * <CounterGroupInclude:bow>
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
 * @param CoverDefaultSubstitute
 * @text デフォルトの身代わりに対応
 * @type boolean
 * @default true
 * @desc デフォルトの身代わりも当プラグインで処理するようにします。
 * 
 * @param SubstituteHpRate
 * @text 身代わりするＨＰ％
 * @type number
 * @default 25
 * @desc 仲間のＨＰがこの％以下になった場合に身代わりを実行します。
 * 
 * @param TargetDamageType
 * @text 対象のダメージタイプ
 * @type string
 * @default 1,5
 * @desc 身代わり対象とするダメージタイプ。複数可。0:なし, 1:HPﾀﾞﾒｰｼﾞ, 2:MPﾀﾞﾒｰｼﾞ, 3:HP回復, 4:MP回復, 5:HP吸収, 6:MP吸収
 * 
 * @param TargetHitType
 * @text 対象の命中タイプ
 * @type string
 * @default 1,2
 * @desc 身代わり対象とするスキルの命中タイプ。複数可。
 * 0:必中, 1:物理攻撃, 2:魔法攻撃
 * 
 * @param TargetSkillType
 * @text 対象のスキルタイプ
 * @type string
 * @default 0,1,2
 * @desc 身代わり対象とするスキルタイプ。複数可。
 * 標準だと0:通常攻撃. 1:魔法, 2:必殺技となります。
 * 
 * @param TargetForOneSkill
 * @text 単体スキルのみ身代わり
 * @type boolean
 * @default false
 * @desc 範囲が単体のスキルのみ身代わり対象とします。
 * 
 * @param SubstituteItem
 * @text アイテムにも身代わり
 * @type boolean
 * @default false
 * @desc アイテムにも身代わりを実行します。
 * 
 * @param AnimationId
 * @text アニメーション
 * @type animation
 * @desc 身代わり発動時に実行するアニメーションです。
 * 
 * @param DynamicSkill
 * @text Dynamic用スキル
 * @type skill
 * @desc 身代わり発動時に実行するDynamicAnimation&Motionのスキルです。アニメーションより優先度が高いです。
 * 
 * @param SvMotionDuration
 * @parent DynamicSkill
 * @text SVモーション優先時間
 * @type number
 * @desc 身代わり発動時のSVモーションを指定時間（1/60秒単位）だけ優先して実行します。空欄ならウェイトを使用。
 * 
 * @param Wait
 * @text ウェイト
 * @type numer
 * @default 10
 * @desc 身代わり発動時のウェイトです。1/60秒単位。
 * 
 * @param <Counter Skill>
 * @text ＜反撃プラグイン連携＞
 * 
 * @param CounterGroup
 * @parent <Counter Skill>
 * @text 反撃有効グループ
 * @type string
 * @desc 身代わり処理の有効な反撃グループです。
 * 
 * @param CounterGroupNG
 * @parent <Counter Skill>
 * @text 反撃無効グループ
 * @type string
 * @desc 身代わり処理の無効な反撃グループです。
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

const PLUGIN_NAME = "NRP_Substitute";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pCoverDefaultSubstitute = toBoolean(parameters["CoverDefaultSubstitute"], false);
const pTargetDamageType = textToArray(parameters["TargetDamageType"]);
const pTargetHitType = textToArray(parameters["TargetHitType"]);
const pTargetSkillType = textToArray(parameters["TargetSkillType"]);
const pTargetForOneSkill = toBoolean(parameters["TargetForOneSkill"]);
const pSubstituteItem = toBoolean(parameters["SubstituteItem"]);
const pAnimationId = toNumber(parameters["AnimationId"]);
const pDynamicSkill = toNumber(parameters["DynamicSkill"]);
const pSvMotionDuration = toNumber(parameters["SvMotionDuration"]);
const pWait = toNumber(parameters["Wait"], 0);
const pSubstituteHpRate = toNumber(parameters["SubstituteHpRate"], 999);
const pCounterGroup = setDefault(parameters["CounterGroup"]);
const pCounterGroupNG = setDefault(parameters["CounterGroupNG"]);

// ----------------------------------------------------------------------------
// 共通変数
// ----------------------------------------------------------------------------
// 追加ウェイト
let mAddWait = 0;
// 身代わり演出中のバトラー
let mSubstituteBattler = null;
// 身代わり演出中のＳＶモーション優先時間
// ※身代わり演出を実行するバトラーは同時に敵のスキルの対象にもなるため、
//   同時に２つのモーションの対象になってしまう可能性がある。
//   そこで時間を制限して優先順位を付けている。
let mSvMotionDuration = 0;
// メッセージ表示用の構造体
let mSubstituteLogData = [];

// ----------------------------------------------------------------------------
// BattleManager
// ----------------------------------------------------------------------------

/**
 * ●アクション開始
 */
const _BattleManager_startAction = BattleManager.startAction;
BattleManager.startAction = function() {
    // 変数クリア
    mSubstituteBattler = null;
    mAddWait = 0;
    mSubstituteLogData = [];

    _BattleManager_startAction.apply(this, arguments);

    // 演出実行用のウェイトを追加
    const win = BattleManager._logWindow;
    win._waitCount = mAddWait;

    // かばう用のメッセージ表示
    for (const data of mSubstituteLogData) {
        win.displaySubstitute(data.battler, data.target);
    }
};

/**
 * 【上書】標準の身代わり処理は実行しない。
 */
if (pCoverDefaultSubstitute) {
    BattleManager.applySubstitute = function(target) {
        return target;
    };
}

// ----------------------------------------------------------------------------
// Game_Battler
// ----------------------------------------------------------------------------

/**
 * 【独自】指定のアクションに対して、身代わりを実行できるかを判定し、
 * さらに身代わりデータを取得する。
 */
Game_Battler.prototype.getSubstituteData = function(action, targets) {
    // スキルの行動主体と一致なら終了
    const subject = action.subject();
    if (this == subject) {
        return null;
    }

    // 自分はかばえないので、ターゲットから自分は除く
    const newTargets = targets.filter(target => this != target);

    // かばう対象がいなければ終了
    if (newTargets.length == 0) {
        return null;
    }

    // 禁止ステートなら終了
    if (this._states.some(stateId => $dataStates[stateId].meta.SubstituteDisabled)) {
        return null;
    }

    // 行動不能なら終了
    if (!this.canMove()) {
        return null;
    }

    // eval参照用
    const a = this;

    const actionItem = action.item();

    // 特徴を取得する。
    for (const object of getTraitObjects(this)) {
        let metaSubstitute = object.meta.Substitute;
        // かばう状態でないなら次へ
        if (!metaSubstitute) {
            continue;
        }

        // 身代わり無効なら次へ
        if (!isValidSubstitute(action, actionItem, newTargets, object)) {
            continue;
        }

        // 確率を取得
        let rate = 0;
        // 未指定の場合は１００％
        if (metaSubstitute === true) {
            rate = 1;
        } else {
            rate = eval(metaSubstitute) / 100;
        }

        // 確率計算
        if (Math.random() >= rate) {
            continue;
        }

        // かばう実行！
        return makeSubstituteData(this, object)
    }

    // 通常の身代わり
    if (pCoverDefaultSubstitute && this.isSubstitute()) {
        // 身代わり無効なら終了
        if (!isValidSubstitute(action, actionItem, newTargets, null)) {
            return null;
        }

        // かばう実行！
        return makeSubstituteData(this, null);
    }

    return null;
};

/**
 * ●かばうデータを生成
 */
function makeSubstituteData(battler, object) {
    // eval参照用
    const a = battler;

    const substituteData = {};
    substituteData.battler = battler;
    substituteData.dynamicId = eval(checkMeta(pDynamicSkill, object, "SubstituteDynamicId"));
    substituteData.animationId = eval(checkMeta(pAnimationId, object, "SubstituteAnimationId"));
    substituteData.wait = eval(checkMeta(pWait, object, "SubstituteWait"));
    substituteData.hpRate = eval(checkMeta(pSubstituteHpRate, object, "SubstituteHpRate"));
    return substituteData;
}

/**
 * ●身代わりが有効かどうかの判定
 */
function isValidSubstitute(action, actionItem, targets, object) {
    // アイテムかつ無効なら終了
    if (!isSubstituteItem(action, object)) {
        return false;
    // 有効なダメージタイプでなければ終了
    } else if (!isTargetDamageType(actionItem, object)) {
        return false;
    // 有効な命中タイプでなければ終了
    } else if (!isTargetHitType(actionItem, object)) {
        return false;
    // 有効なスキルタイプでなければ終了
    } else if (!isTargetSkillType(actionItem, object)) {
        return false;
    }

    // eval参照用
    const a = action.subject();

    // 単体対象かつ、アクションが単体＆ランダム以外なら終了
    const forOneSkill = eval(checkMeta(pTargetForOneSkill, object, "SubstituteForOne"));
    if (forOneSkill && !action.isForOne() && !action.isForRandom()) {
        return false;
    }

    // 反撃有効グループが存在する場合
    const counterGroupInclude = checkMeta(pCounterGroup, object, "CounterGroupInclude")
    if (counterGroupInclude) {
        // グループ名が一致しなかった場合は終了
        if (counterGroupInclude != actionItem.meta.CounterGroup) {
            return false;
        }
    }

    // 反撃無効グループが存在する場合
    const counterGroupExcept = checkMeta(pCounterGroupNG, object, "CounterGroupExcept")
    if (counterGroupExcept) {
        // グループ名が一致した場合は終了
        if (counterGroupExcept == actionItem.meta.CounterGroup) {
            return false;
        }
    }

    // 全員が指定のＨＰ％以上なら終了
    const substituteHpRate = eval(checkMeta(pSubstituteHpRate, object, "SubstituteHpRate"));
    if (targets.every(target => target.hpRate() * 100 > substituteHpRate)) {
        return false;
    }

    // ここまで到達すれば有効
    return true;
}

// ----------------------------------------------------------------------------
// Game_Action
// ----------------------------------------------------------------------------

/**
 * ●対象の生成
 */
const _Game_Action_makeTargets = Game_Action.prototype.makeTargets;
Game_Action.prototype.makeTargets = function() {
    let targets = _Game_Action_makeTargets.apply(this, arguments);

    const actionItem = this.item();

    // 対象がなければ終了
    if (targets.length == 0) {
        return targets;
    // 身代わり無効なら終了
    } else if (actionItem.meta.SubstituteDisabled) {
        return targets;
    }

    // 身代わりとなるバトラーデータが存在するか？
    const data = this.getSubstituteData(targets);
    if (data) {
        const substituteBattler = data.battler;
        const hpRate = data.hpRate;

        let substituteCount = 0;

        // 身代わり実行　→　対象を変更する
        for (let i = 0; i < targets.length; i++) {
            const target = targets[i];
            // 自分以外、かつ指定のＨＰ％以下ならかばう
            if (target != substituteBattler && target.hpRate() * 100 <= hpRate) {
                // メッセージ表示用に保持（重複対象は登録しない。）
                if (!mSubstituteLogData.some(data => data.target == target)) {
                    mSubstituteLogData.push({battler: substituteBattler, target: target});
                }
                // 対象変更
                targets.splice(i, 1, substituteBattler);
                substituteCount++;
            }
        }

        // NRP_SkillRangeEX.jsとの連携用
        const rangeEx = actionItem.meta.RangeEx;
        if (rangeEx) {
            // アクションの本来の対象が単体の場合は、対象を再設定
            if (BattleManager.rangeEx && this.isForOne()) {
                targets = BattleManager.rangeEx(this, [substituteBattler]);
            }
            // 主対象を更新する。
            BattleManager._mainTarget = substituteBattler;
        }

        // まずないと思うが、一応カウントして身代わりが一人でも有効だった場合に処理を実行
        if (substituteCount) {
            // ウェイトを設定
            if (data.wait) {
                mAddWait = data.wait;
            }

            // 身代わり演出を実行
            if (data.dynamicId) {
                // SVモーション優先時間を設定
                mSvMotionDuration = pSvMotionDuration ? pSvMotionDuration : mAddWait;
                if (mSvMotionDuration) {
                    // 演出実行中のバトラーを保持
                    mSubstituteBattler = substituteBattler;
                }

                // DynamicAnimation呼び出し
                callDynamic(substituteBattler, data.dynamicId);
            } else if (data.animationId) {
                callAnimation(substituteBattler, data.animationId, 0)
            }
        }
    }

    return targets;
};

/**
 * 【独自】アクションに対応する身代わりデータを取得
 */
Game_Action.prototype.getSubstituteData = function(targets) {
    // 範囲が敵味方全体の時は無効
    // （どうしたらいいのかよく分からない……。）
    if (this.isForEveryone && this.isForEveryone()) {
        return null;
    }
    
    // 対象と同サイドのユニットを取得
    const unit = targets[0].friendsUnit();

    for (const battler of unit.members()) {
        // バトラー毎に身代わりを実行できるか判定し、データを取得する。
        const substituteData = battler.getSubstituteData(this, targets);
        if (substituteData) {
            return substituteData;
        }
    }

    // 誰も身代わりできない場合
    return null;
}

/**
 * ●アイテムが有効かどうか？
 */
function isSubstituteItem(action, object) {
    // アイテムでない場合は有効
    if (!action.isItem()) {
        return true;
    }

    // 個別の指定がある場合は取得
    const metaSubstituteItem = object ? toBoolean(object.meta.SubstituteItem) : null;
    if (metaSubstituteItem != null) {
        return metaSubstituteItem;
    }
    return pSubstituteItem;
}

/**
 * ●有効なダメージタイプかどうか？
 */
function isTargetDamageType(actionItem, object) {
    // チェック対象のダメージタイプ
    let targetDamageType = pTargetDamageType;
    // 個別の指定がある場合は取得
    const metaDamageType = object ? object.meta.SubstituteDamageType : null;
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
    const metaHitType = object ? object.meta.SubstituteHitType : null;
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
    const metaSkillType = object ? object.meta.SubstituteSkillType : null;
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
// Sprite_Actor
// ----------------------------------------------------------------------------

/**
 * ●モーションのリフレッシュ
 */
const _Sprite_Actor_refreshMotion = Sprite_Actor.prototype.refreshMotion;
Sprite_Actor.prototype.refreshMotion = function() {
    // 身代わり演出中のアクターについてはリフレッシュ停止
    const actor = this._actor;
    if (mSubstituteBattler == actor) {
        return;
    }
    _Sprite_Actor_refreshMotion.apply(this, arguments);
};

// ----------------------------------------------------------------------------
// Spriteset_Battle
// ----------------------------------------------------------------------------

/**
 * ●更新
 */
const _Spriteset_Battle_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
    _Spriteset_Battle_update.apply(this, arguments);

    // 身代わり演出中の時間経過
    if (mSvMotionDuration) {
        mSvMotionDuration--;
        // ０になった場合は身代わり演出中のバトラー解除
        if (mSvMotionDuration <= 0) {
            mSubstituteBattler = null;
        }
    }
};

// ----------------------------------------------------------------------------
// アニメーション呼出用の共通処理
// ----------------------------------------------------------------------------

/**
 * ●アニメーション呼び出しを行う。
 * MV, MZの両方に対応
 */
function callAnimation(battler, animationId, delay) {
    const battlerSprite = BattleManager._spriteset.findTargetSprite(battler);

    // MVの場合
    if (Utils.RPGMAKER_NAME == "MV") {
        var animation = $dataAnimations[animationId];
        var sprite = new Sprite_Animation();
        sprite.setup(battlerSprite._effectTarget, animation, battler.isActor(), delay);
        battlerSprite.parent.addChild(sprite);
        battlerSprite._animationSprites.push(sprite);
        for (const tmpSprite of battlerSprite._animationSprites) {
            tmpSprite.visible = battler.isSpriteVisible();
        }

    // MZの場合
    } else {
        const animation = getAnimation(animationId);
        if (animation) {
            createAnimationSprite([battler], animation, false, delay);
        }
    }
}

/**
 * ●ＭＶアニメーションかどうかの判定
 */
function isMVAnimation(animation) {
    return animation && !!animation.frames;
};

/**
 * ●MZアニメーションの情報が空かどうかの判定
 * ※AnimationMv.jsから移植
 */
function isEmptyAnimation(animation) {
    return animation &&
        !animation.effectName &&
        animation.flashTimings.length === 0 &&
        animation.soundTimings.length === 0;
}

/**
 * MZ用のアニメーション呼び出し
 */
function createAnimationSprite(targets, animation, mirror, delay) {
    const spriteSet = BattleManager._spriteset;

    const mv = spriteSet.isMVAnimation(animation);
    const sprite = new (mv ? Sprite_AnimationMV : Sprite_Animation)();
    const targetSprites = spriteSet.makeTargetSprites(targets);
    const baseDelay = spriteSet.animationBaseDelay();
    const previous = delay > baseDelay ? spriteSet.lastAnimationSprite() : null;
    if (spriteSet.animationShouldMirror(targets[0])) {
        mirror = !mirror;
    }
    sprite.targetObjects = targets;
    sprite.setup(targetSprites, animation, mirror, delay, previous);
    spriteSet._effectsContainer.addChild(sprite);
    spriteSet._animationSprites.push(sprite);

    // ウェイトしないためのフラグ
    sprite._noWait = true;
}

/**
 * ●アニメーションを取得
 */
function getAnimation(animationId) {
    let animation = $dataAnimations[animationId];

    // MZの場合
    if (Utils.RPGMAKER_NAME != "MV") {
        // ＭＺエディタでＭＶアニメーションが設定されている。
        if (isMVAnimation(animation)) {
            return animation;

        // MZ用アニメーションが空ならMV用アニメーションを取得
        // ※ただし$dataMvAnimationsが有効な場合のみ
        } else if (isEmptyAnimation(animation) && typeof $dataMvAnimations !== 'undefined') {
            animation = $dataMvAnimations[animationId];
        }
    }

    return animation;
}

// ----------------------------------------------------------------------------
// DynamicAnimation & Motion用
// ----------------------------------------------------------------------------

/**
 * 【独自】アニメーションの再生
 */
const _Window_BattleLog_showDynamicAnimation = Window_BattleLog.prototype.showDynamicAnimation;
Window_BattleLog.prototype.showDynamicAnimation = function (targets, action, mirror, mapAnimation) {
    _Window_BattleLog_showDynamicAnimation.apply(this, arguments);

    // かばう演出用なら、一歩前進禁止フラグを解除
    // ※こうしないと攻撃スキルの前進がなくなってしまうため。
    if (action._isDynamicSubstitute) {
        BattleManager._noUpdateTargetPosition = false;
    }
}

// ----------------------------------------------------------------------------
// 共通関数
// ----------------------------------------------------------------------------

/**
 * ●DynamicAnimation&Motionを呼び出し
 */
function callDynamic(battler, dynamicId) {
    // 戦闘時以外は処理しない。
    if (!$gameParty.inBattle()) {
        return;
    }

    // 実行するDynamicAnimation情報を持ったアクション
    const dynamicAction = makeAction(dynamicId, battler);
    // かばう演出フラグを立てる。
    dynamicAction._isDynamicSubstitute = true;
    // バトラーを対象にする。
    const targets = [battler];
    // 引き継ぎたい情報をセット
    const mapAnimation = [];
    // バトラーを行動主体にする。
    // ※これがないと行動主体を取得できない。
    mapAnimation.subject = battler;
    // 空のWindow_BattleLogを作成し、DynamicAnimationを起動
    const win = new Window_BattleLog(new Rectangle());
    win.showDynamicAnimation(targets, dynamicAction, false, mapAnimation);
}

/**
 * ●アクション情報の作成
 */
function makeAction(itemId, battleSubject, isItem) {
    // 適当に先頭のキャラを行動主体にしてアクションを作成
    // ※行動主体の情報は基本的に使わないので実際はほぼダミー
    let subject = $gameParty.members()[0];
    if (battleSubject) {
        subject = battleSubject;
    }
    const action = new Game_Action(subject);
    // アイテムかスキルかで分岐
    if (isItem) {
        action.setItem(itemId);
    } else {
        action.setSkill(itemId);
    }
    return action;
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
 * ●フラグを満たしているか？
 * @param {boolean} commonParam プラグインパラメータの共通設定
 * @param {object} item オブジェクトデータ
 * @param {string} metaName 参照するメタ名
 */
function checkMeta(commonParam, item, metaName) {
    if (item && item.meta[metaName]) {
        return item.meta[metaName];
    }
    return commonParam;
}

})();
