//=============================================================================
// NRP_LearnSkillListReserve.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.00 A list-style skill learning system reservation functionality.
 * @author Takeshi Sunagawa (https://newrpg.seesaa.net/)
 * @base NRP_LearnSkillList
 * @orderAfter NRP_LearnSkillList
 * @orderAfter NRP_ForgetLowerSkill
 * @url https://newrpg.seesaa.net/article/503945159.html
 *
 * @help Add a reservation function
 * to the list-style skill learning system plugin (NRP_LearnSkillList.js).
 * 
 * It is assumed that NRP_LearnSkillList.js
 * in the main body is registered.
 *
 * ◆Function
 * You can reserve a skill for which you do not have enough SP
 * by selecting it on the Skill Learning scene.
 * Reserved skills are automatically learned
 * when SP meets the requirements.
 * In addition, the skill learning scene will be opened automatically.
 * ※The skill learning screen opens
 *   after the end of a battle or an event.
 *   It can also be called up immediately
 *   during an event with a plugin command.
 * ※If more than one actor learns a skill at the same time,
 *   the skill learning scene is opened for the actor closest
 *   to the front of the party.
 * 
 * -------------------------------------------------------------------
 * [Plugin Command]
 * -------------------------------------------------------------------
 * ◆CallReserveSkillScene
 * Executing this command after learning a reserved skill
 * calls up the skill learning scene.
 * If there is no applicable skill, it will be ignored.
 * 
 * -------------------------------------------------------------------
 * [Notice]
 * -------------------------------------------------------------------
 * ◆Learning text at level up
 * In addition to "NormalLearnText", there is a separate
 * "LevelUpLearnText" message when a reserved skill is learned.
 * 
 * This is due to the specification that the skill learning text
 * at level-up usually omits the actor's name.
 * 
 * Example: Reid is now 2 Level!
 *          Heal learned!
 * 
 * When a reserved skill is acquired at the same time as level-up
 * by "LevelUpSkillPoint" in NRP_LearnSkillList.js,
 * this message will be displayed.
 * 
 * ◆About the Icon Index
 * Icon indexes can be used for reserved skill learning messages.
 * 
 * \i[%3]%2 learned!
 * 
 * If set as above, the icon will be displayed.
 * 
 * Note that by default, icons cannot be set
 * for "Obtain Skill" in the terms.
 * Please refer to the Extra Feature in NRP_ForgetLowerSkill.js.
 * https://newrpg.seesaa.net/article/483693029.html
 * 
 * ◆Gaining skill points through items
 * Skill points gained by items (<AddSkillPoint>) are not supported.
 * 
 * There is no major hindrance, but skill points may remain
 * in a reserved status even though they meet the requirements.
 * 
 * ◆Reserve Members
 * If the setting is set to not display the level-up of reserve members,
 * the reserved skill learning message will also not be displayed.
 * In that case, it would be safer to exclude the reserve members
 * from learning the skill, or to allow them
 * to learn the skill but not to call the learning scene.
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
 * @ [Plugin Commands]
 * @-----------------------------------------------------
 * 
 * @command CallReserveSkillScene
 * @desc When executed after a reserved skill has been learned, it calls up the learning scene. If there is no applicable skill, it will be ignored.
 * 
 * @-----------------------------------------------------
 * @ [Plugin Parameters]
 * @-----------------------------------------------------
 * 
 * @param LearnTimingBattle
 * @type boolean
 * @default true
 * @desc Allow the process of learning reserved skills during battle.
 *
 * @param LearnTimingNotBattle
 * @type boolean
 * @default true
 * @desc Allow the process of acquiring reserved skills outside of battle.
 *
 * @param ReserveSkillColor
 * @type string
 * @default #ffff00
 * @desc Specify the text color (color code) of the skill being reserved.
 * 
 * @param ReserveSkillOpacity
 * @type number
 * @default 255
 * @desc Specify the opacity (0~255) of the text of the skill being reserved. If blank, it will be 160.
 *
 * @param ReserveSkillSe
 * @type file
 * @dir audio/se
 * @default Switch2
 * @desc The file name of the SE to be played when the skill is reserved.
 *
 * @param ReserveConfirmText
 * @type multiline_string
 * @default Not enough %2.
Would you like to reserve %3?
 * @desc Confirmation message for reserving a skill. %1:Consume SP, %2:SP Name, %3:Skill Name
 *
 * @param ReserveYesText
 * @type string
 * @default OK
 * @desc Specify text for reserving skills.
 *
 * @param ReserveNoText
 * @type string
 * @default Cancel
 * @desc Specify text if you do not want to reserve the skill.
 *
 * @param ReserveCancelConfirmText
 * @type multiline_string
 * @default %3 is reserved.
Would you like to cancel?
 * @desc A confirmation text for canceling a reservation for a skill. %1:Consume SP, %2:SP Name, %3:Skill Name
 *
 * @param ReserveCancelYesText
 * @type string
 * @default Cancel Reservation
 * @desc Specify text for canceling a skill reservation.
 *
 * @param ReserveCancelNoText
 * @type string
 * @default No Change
 * @desc The text for not canceling a reservation for a skill.
 *
 * @param NormalLearnText
 * @type string
 * @default %1 learned %2!
 * @desc The text when the reservation skill is normally learned.。
 * %1:Actor Name, %2:Skill Name, %3:Icon Index
 * 
 * @param NormalLearnTextChangePage
 * @parent NormalLearnText
 * @type select
 * @option 0:No Page Break @value 0
 * @option 1:First Page Break @value 1
 * @option 2:All Page Break @value 2
 * @default 2
 * @desc A page break system for the normal skill learning text.
 * It's assumed when several actos learn a skill at the same time.
 * 
 * @param NormalLearnTextBackground
 * @parent NormalLearnText
 * @type select
 * @option Normal @value 0
 * @option Dimmer @value 1
 * @option Transparency @value 2
 * @default 0
 * @desc The background of the message window for the normal skill learning text.
 * 
 * @param LevelUpLearnText
 * @type string
 * @default %2 learned!
 * @desc The text when the reservation skills are learned at a level up.
 * %1:Actor Name, %2:Skill Name, %3:Icon Index
 * 
 * @param <BenchMember>
 * 
 * @param BenchMemberNotTarget
 * @parent <BenchMember>
 * @type boolean
 * @default false
 * @desc The reserve member does not learn reservation skills.
 * 
 * @param BenchMemberNotCallScene
 * @parent <BenchMember>
 * @type boolean
 * @default false
 * @desc In the case of reserved members, the learning scene is not called when learning reserved skills.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.00 リスト形式のスキル習得システムの予約機能。
 * @author 砂川赳（https://newrpg.seesaa.net/）
 * @base NRP_LearnSkillList
 * @orderAfter NRP_LearnSkillList
 * @orderAfter NRP_ForgetLowerSkill
 * @url https://newrpg.seesaa.net/article/503945159.html
 *
 * @help リスト形式のスキル習得システムプラグイン（NRP_LearnSkillList.js）に
 * 予約機能を追加します。
 * 
 * 本体のNRP_LearnSkillList.jsが登録されていることが前提です。
 *
 * ◆機能
 * スキル習得画面でＳＰが足りないスキルを選択すると、予約できます。
 * 予約したスキルはＳＰが条件を満たした時点で、自動的に習得されます。
 * さらにスキル習得画面が自動で開かれます。
 * ※スキル習得画面が開くタイミングは戦闘終了後またはイベント終了後です。
 * 　イベント途中でもプラグインコマンドで強制的に呼び出すこともできます。
 * ※同時に複数のアクターがスキルを習得した場合は、
 * 　最も先頭に近いアクターのスキル習得画面が開かれます。
 * 
 * -------------------------------------------------------------------
 * ■プラグインコマンド
 * -------------------------------------------------------------------
 * ◆予約スキル習得後に画面呼出
 * 予約スキル習得後にこのコマンドを実行すると、スキル習得画面を呼び出します。
 * 該当スキルがない場合は無視されます。
 * 
 * -------------------------------------------------------------------
 * ■注意点
 * -------------------------------------------------------------------
 * ◆レベルアップ時の習得文
 * 予約スキルを覚えた時のメッセージには『通常時の習得文』の他に、
 * 『レベルアップ時の習得文』が別途存在します。
 * 
 * これはレベルアップ時のスキル習得文は通常、
 * アクターの名前を省略する仕様のためです。
 * 
 * 例：リードはレベル 2 に上がった！
 * 　　ヒールⅠを覚えた！
 * 
 * NRP_LearnSkillList.jsの『レベルアップ時のSP』によって、
 * レベルアップと同時に予約スキルを習得した場合は、
 * こちらのメッセージが表示されます。
 * 
 * ◆アイコン番号について
 * 予約スキルの習得メッセージにはアイコン番号が使用できます。
 * 
 * \i[%3]%2を覚えた！
 * 
 * というように設定すれば、アイコンが表示されます。
 * 
 * なお、通常だと用語にあるスキル習得文には、
 * アイコンは設定できませんが、NRP_ForgetLowerSkill.jsの
 * おまけ機能で使えるので参考にしてください。
 * https://newrpg.seesaa.net/article/483693029.html
 * 
 * ◆アイテムによるスキルポイントの獲得
 * アイテム（<AddSkillPoint>）によって、
 * スキルポイントを加算した場合には対応していません。
 * 
 * 特に大きな支障はありませんが、スキルポイントが条件を
 * 満たしているのに予約状態のままになることがあります。
 * 
 * ◆控えメンバー
 * 控えメンバーのレベルアップを表示しない設定になっている場合は、
 * 予約スキルの習得メッセージも表示できなくなります。
 * その場合は控えメンバーはスキル習得の対象外にするか、
 * もしくは習得はできても習得画面を呼ばなようにしたほうが無難だと思います。
 * 
 * -------------------------------------------------------------------
 * ■利用規約
 * -------------------------------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @-----------------------------------------------------
 * @ プラグインコマンド
 * @-----------------------------------------------------
 *
 * @command CallReserveSkillScene
 * @text 予約スキル習得後に画面呼出
 * @desc 予約スキル習得後に実行すると、習得画面を呼び出します。
 * 該当スキルがない場合は無視されます。
 *
 * @-----------------------------------------------------
 * @ プラグインパラメータ
 * @-----------------------------------------------------
 * 
 * @param LearnTimingBattle
 * @text 戦闘時に習得
 * @type boolean
 * @default true
 * @desc 戦闘時に予約スキルの習得処理を行います。
 *
 * @param LearnTimingNotBattle
 * @text 非戦闘時に習得
 * @type boolean
 * @default true
 * @desc 非戦闘時に予約スキルの習得処理を行います。
 *
 * @param ReserveSkillColor
 * @text 予約スキルの文字色
 * @type string
 * @default #ffff00
 * @desc 予約中のスキルの文字色（カラーコード）を指定します。
 * 
 * @param ReserveSkillOpacity
 * @text 予約スキルの不透明度
 * @type number
 * @default 255
 * @desc 予約中のスキルの文字の不透明度（0~255）を指定します。
 * 空欄なら習得不可のスキルと同じ不透明度（160）になります。
 *
 * @param ReserveSkillSe
 * @text スキル予約時の効果音名
 * @type file
 * @dir audio/se
 * @default Switch2
 * @desc スキルを予約したときに再生するSEのファイル名を指定します。
 *
 * @param ReserveConfirmText
 * @text 予約時の文章（確認）
 * @type multiline_string
 * @default %2が不足しています。
%3を予約しますか？
 * @desc スキルを予約する際の確認用文章です。%1:消費するSP値, %2:SP名, %3:取得するスキル名
 *
 * @param ReserveYesText
 * @text 予約時の文章（はい）
 * @type string
 * @default 予約する
 * @desc スキルを予約する場合のテキストを指定します。
 *
 * @param ReserveNoText
 * @text 予約時の文章（いいえ）
 * @type string
 * @default 予約しない
 * @desc スキルを予約しない場合のテキストを指定します。
 *
 * @param ReserveCancelConfirmText
 * @text 予約取消時の文章（確認）
 * @type multiline_string
 * @default %3は予約中です。
取り消しますか？
 * @desc スキルの予約を取り消す際の確認用文章です。%1:消費するSP値, %2:SP名, %3:取得するスキル名
 *
 * @param ReserveCancelYesText
 * @text 予約取消時の文章（はい）
 * @type string
 * @default 取り消す
 * @desc スキルの予約を取り消す場合のテキストを指定します。
 *
 * @param ReserveCancelNoText
 * @text 予約取消時の文章（いいえ）
 * @type string
 * @default 取り消さない
 * @desc スキルの予約を取り消さない場合のテキストを指定します。
 *
 * @param NormalLearnText
 * @text 通常時の習得文
 * @type string
 * @default %1は%2を覚えた！
 * @desc 予約スキルを通常習得した際の文章です。
 * %1:アクター名, %2:取得するスキル名, %3:アイコン番号
 * 
 * @param NormalLearnTextChangePage
 * @parent NormalLearnText
 * @text 通常習得文の改ページ方式
 * @type select
 * @option 0:改ページしない @value 0
 * @option 1:最初だけ改ページ @value 1
 * @option 2:全員改ページ @value 2
 * @default 2
 * @desc 通常時のスキル習得文の改ページ方式です。
 * 複数人が同時にスキルを習得した際を想定しています。
 * 
 * @param NormalLearnTextBackground
 * @parent NormalLearnText
 * @text 習得文のウィンドウ背景
 * @type select
 * @option 0:ウィンドウ @value 0
 * @option 1:暗くする @value 1
 * @option 2:透明 @value 2
 * @default 0
 * @desc 通常時のスキル習得文のメッセージウィンドウの背景です。
 * 
 * @param LevelUpLearnText
 * @text レベルアップ時の習得文
 * @type string
 * @default %2を覚えた！
 * @desc 予約スキルをレベルアップで習得した際の文章です。
 * %1:アクター名, %2:取得するスキル名, %3:アイコン番号
 * 
 * @param <BenchMember>
 * @text ＜控えメンバー関連＞
 * 
 * @param BenchMemberNotTarget
 * @parent <BenchMember>
 * @text 控えﾒﾝﾊﾞｰは対象外
 * @type boolean
 * @default false
 * @desc 控えメンバーは予約スキルの習得を行いません。
 * 
 * @param BenchMemberNotCallScene
 * @parent <BenchMember>
 * @text 控えﾒﾝﾊﾞｰは画面を呼ばない
 * @type boolean
 * @default false
 * @desc 控えメンバーの場合は予約スキル習得時に習得画面を呼びません。
 */

(function() {
"use strict";

/**
 * ●構造体をJSで扱えるように変換
 */
function parseStruct1(arg) {
    var ret = [];

    JSON.parse(arg).forEach(function(str) {
        ret.push(str);
    });

    return ret;
}
/**
 * ●構造体（二重配列）をJSで扱えるように変換
 */
function parseStruct2(arg) {
    const ret = [];
    if (arg) {
        for (const str of JSON.parse(arg)) {
            ret.push(JSON.parse(str));
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

const PLUGIN_NAME = "NRP_LearnSkillListReserve";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pLearnTimingBattle = toBoolean(parameters["LearnTimingBattle"], false);
const pLearnTimingNotBattle = toBoolean(parameters["LearnTimingNotBattle"], false);
const pReserveSkillColor = setDefault(parameters["ReserveSkillColor"]);
const pReserveSkillOpacity = toNumber(parameters["ReserveSkillOpacity"]);
const pReserveSkillSe = setDefault(parameters["ReserveSkillSe"]);
const pReserveConfirmText = setDefault(parameters["ReserveConfirmText"]);
const pReserveYesText = setDefault(parameters["ReserveYesText"]);
const pReserveNoText = setDefault(parameters["ReserveNoText"]);
const pReserveCancelConfirmText = setDefault(parameters["ReserveCancelConfirmText"]);
const pReserveCancelYesText = setDefault(parameters["ReserveCancelYesText"]);
const pReserveCancelNoText = setDefault(parameters["ReserveCancelNoText"]);
const pNormalLearnText = setDefault(parameters["NormalLearnText"]);
const pNormalLearnTextChangePage = toNumber(parameters["NormalLearnTextChangePage"], 0);
const pNormalLearnTextBackground = toNumber(parameters["NormalLearnTextBackground"], 0);
const pLevelUpLearnText = setDefault(parameters["LevelUpLearnText"]);
const pBenchMemberNotTarget = toBoolean(parameters["BenchMemberNotTarget"], false);
const pBenchMemberNotCallScene = toBoolean(parameters["BenchMemberNotCallScene"], false);

const PLUGIN_NAME_BASE = "NRP_LearnSkillList";
const baseParameters = PluginManager.parameters(PLUGIN_NAME_BASE);
const pSkillPointName = setDefault(baseParameters["SkillPointName"], "");
const pSkillPointType = setDefault(parameters["SkillPointType"]);
const pSkillPointVariable = setDefault(baseParameters["SkillPointVariable"]);

// 定数
const SKILL_POINT_KEY = "skillPoint";

// 予約習得後にスキル習得画面を開くアクターＩＤ
let mReserveSkillActorId = null;
// 強制呼び出しフラグ
let mForceCallFlg = false;

//-----------------------------------------------------------------------------
// ＭＺ用プラグインコマンド
//-----------------------------------------------------------------------------

// MVには存在しないため、空で定義しておかないとエラーになる。
if (!PluginManager.registerCommand) {
    PluginManager.registerCommand = function() {}
}

/**
 * ●予約スキル習得後画面呼出
 */
PluginManager.registerCommand(PLUGIN_NAME, "CallReserveSkillScene", function(args) {
    // 予約スキルを習得した場合はスキル習得画面呼び出し
    if (mReserveSkillActorId) {
        // メッセージ表示を行う場合
        if ($gameMessage.hasText()) {
            // 一旦、強制呼び出しフラグをオンにしてメッセージ終了後に呼び出し
            mForceCallFlg = true;

        // それ以外は普通に呼び出し
        } else {
            // アクターをセット
            $gameParty.setMenuActor($gameActors.actor(mReserveSkillActorId));
            // スキル習得画面呼び出し
            SceneManager.push(Scene_LearnSkillList);
        }
    }
});

//-----------------------------------------------------------------------------
// Scene_LearnSkillList
//-----------------------------------------------------------------------------

/**
 * ●ウィンドウの生成
 */
const _Scene_LearnSkillList_create = Scene_LearnSkillList.prototype.create;
Scene_LearnSkillList.prototype.create = function() {
    _Scene_LearnSkillList_create.apply(this, arguments);

    // 予約確認ウィンドウ
    this.createReserveConfirmWindow();
    // 予約キャンセルウィンドウ
    this.createReserveCancelConfirmWindow();
};

/**
 * ●予約確認ウィンドウの作成
 */
Scene_LearnSkillList.prototype.createReserveConfirmWindow = function() {
    const rect = this.confirmWindowRect();
    this._reserveConfirmWindow = new Window_LearnSkillReserveConfirm(rect);
    this._reserveConfirmWindow.setHandler("ok", this.reseveConfirmLearnOk.bind(this));
    this._reserveConfirmWindow.setHandler("cancel", this.reserveConfirmLearnCancel.bind(this));
    // addWindowだと下が見えなくなるのでaddChildで追加する。
    this.addChild(this._reserveConfirmWindow);

    this._reserveConfirmWindow.hide();
    this._reserveConfirmWindow.close();
};

/**
 * ●予約キャンセル確認ウィンドウの作成
 */
Scene_LearnSkillList.prototype.createReserveCancelConfirmWindow = function() {
    const rect = this.confirmWindowRect();
    this._reserveCancelConfirmWindow = new Window_LearnSkillReserveCancelConfirm(rect);
    this._reserveCancelConfirmWindow.setHandler("ok", this.reseveCancelConfirmLearnOk.bind(this));
    this._reserveCancelConfirmWindow.setHandler("cancel", this.reserveCancelConfirmLearnCancel.bind(this));
    // addWindowだと下が見えなくなるのでaddChildで追加する。
    this.addChild(this._reserveCancelConfirmWindow);

    this._reserveCancelConfirmWindow.hide();
    this._reserveCancelConfirmWindow.close();
};

/**
 * ●予約確認確定
 */
Scene_LearnSkillList.prototype.reseveConfirmLearnOk = function() {
    // 予約スキルを取得
    const learnSkillData = this._reserveConfirmWindow.item();
    const skillPoint = eval(learnSkillData.SkillPoint);
    const skillId = eval(learnSkillData.Skill);

    // 予約スキル情報をアクターに設定
    this._actor.setReserveSkill(skillId, skillPoint);

    // 効果音を演奏
    if (pReserveSkillSe) {
        AudioManager.playSe({"name":pReserveSkillSe, "volume":90, "pitch":100, "pan":0})
    }

    // 予約確認ウィンドウを閉じる
    this._reserveConfirmWindow.close();
    // スキルリストに戻る
    this._skillListWindow.activate();
    // リフレッシュ
    this._skillListWindow.refresh();
};

/**
 * ●予約確認キャンセル
 */
Scene_LearnSkillList.prototype.reserveConfirmLearnCancel = function() {
    // 予約確認ウィンドウを閉じる
    this._reserveConfirmWindow.close();
    // スキルリストに戻る
    this._skillListWindow.activate();
};

/**
 * ●予約キャンセル確認確定
 */
Scene_LearnSkillList.prototype.reseveCancelConfirmLearnOk = function() {
    // 予約スキルをクリア
    this._actor.clearReserveSkill();
    // 予約キャンセル確認ウィンドウを閉じる
    this._reserveCancelConfirmWindow.close();
    // スキルリストに戻る
    this._skillListWindow.activate();
    // リフレッシュ
    this._skillListWindow.refresh();
};

/**
 * ●予約キャンセル確認キャンセル
 */
Scene_LearnSkillList.prototype.reserveCancelConfirmLearnCancel = function() {
    // 予約確認ウィンドウを閉じる
    this._reserveCancelConfirmWindow.close();
    // スキルリストに戻る
    this._skillListWindow.activate();
};

/**
 * ●スキルリスト選択時
 */
const _Scene_LearnSkillList_onSkillListOk = Scene_LearnSkillList.prototype.onSkillListOk;
Scene_LearnSkillList.prototype.onSkillListOk = function() {
    const item = this._skillListWindow.item();

    // 予約中の場合は予約キャンセルウィンドウを表示
    if (this._actor.reserveSkillId() == eval(item.Skill)) {
        // 予約キャンセルウィンドウにスキルデータを設定
        this._reserveCancelConfirmWindow.setSkillData(item);
        // 予約キャンセルウィンドウを表示
        this._reserveCancelConfirmWindow.show();
        this._reserveCancelConfirmWindow.open();
        this._reserveCancelConfirmWindow.activate();
        this._reserveCancelConfirmWindow.select(0);
        return;
    }

    // ＳＰが足りない場合は予約確認ウィンドウを表示
    const skillPoint = eval(item.SkillPoint);
    if (this._actor.currentSkillPoint() < skillPoint) {
        // 予約確認ウィンドウにスキルデータを設定
        this._reserveConfirmWindow.setSkillData(item);
        // 予約確認ウィンドウを表示
        this._reserveConfirmWindow.show();
        this._reserveConfirmWindow.open();
        this._reserveConfirmWindow.activate();
        this._reserveConfirmWindow.select(0);
        return;
    }

    _Scene_LearnSkillList_onSkillListOk.apply(this, arguments);
};

/**
 * ●終了処理
 */
const _Scene_LearnSkillList_terminate = Scene_LearnSkillList.prototype.terminate;
Scene_LearnSkillList.prototype.terminate = function() {
    _Scene_LearnSkillList_terminate.apply(this, arguments);

    // 予約から呼び出された場合はマップ画面へ戻る。
    if (mReserveSkillActorId) {
        mReserveSkillActorId = null;
        SceneManager.goto(Scene_Map);
    }
}

// ----------------------------------------------------------------------------
// Scene_Map
// ----------------------------------------------------------------------------

/**
 * ●マップ開始
 */
const _Scene_Map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
    // 予約スキルを習得した場合はスキル周到画面呼び出し
    if (mReserveSkillActorId) {
        // アクターをセット
        $gameParty.setMenuActor($gameActors.actor(mReserveSkillActorId));
        // 一瞬マップが表示されてしまうため黒くする。
        this._fadeOpacity = 255;
        this.updateColorFilter();
        // スキル習得画面呼び出し
        SceneManager.push(Scene_LearnSkillList);
        return;
    }

    _Scene_Map_start.apply(this, arguments);
};

//-----------------------------------------------------------------------------
// Window_LearnSkillList
//-----------------------------------------------------------------------------

/**
 * 【上書】現在の項目が有効かどうか？
 */
Window_LearnSkillList.prototype.isCurrentItemEnabled = function() {
    const item = this.item();

    // 覚えられるスキルが一つもない場合
    if (!item) {
        return false;
    }
    // 習得済の場合
    const skillId = eval(item.Skill);
    if (this._actor.isLearnedSkill(skillId)) {
        return false;
    }
    // 条件を満たしていない
    if (!this.isMatchSkillData(item)) {
        return false;
    }

    // ＳＰが足りない場合でも予約のために有効と判定
    return true;
};

/**
 * ●項目を描画
 */
const _Window_LearnSkillList_drawItem = Window_LearnSkillList.prototype.drawItem;
Window_LearnSkillList.prototype.drawItem = function(index) {
    const learnSkillData = this.itemAt(index);
    const skillId = eval(learnSkillData.Skill)

    // 予約スキルの場合は色を変更
    if (learnSkillData && this._actor.reserveSkillId() == skillId) {
        const costWidth = this.costWidth();
        const rect = this.itemLineRect(index);
        // 習得不可かつ不透明度の指定がある場合
        // ※基本的に予約スキルは習得不可の想定だが、
        // 　他の経路からＳＰが加算された結果、習得可能なまま予約されている状態も想定。
        if (!this.isEnabled(learnSkillData) && pReserveSkillOpacity) {
            this.contents.paintOpacity = pReserveSkillOpacity;
        // それ以外は既定の不透明度を設定
        } else {
            this.changePaintOpacity(this.isEnabled(learnSkillData));
        }
        this.changeTextColor(pReserveSkillColor);
        this.drawItemName(learnSkillData, rect.x, rect.y, rect.width - costWidth);
        this.resetTextColor();
        this.changePaintOpacity(this.isEnabled(learnSkillData));
        this.drawSkillCost(learnSkillData, rect.x, rect.y, rect.width);
        this.changePaintOpacity(1);
        return;
    }

    _Window_LearnSkillList_drawItem.apply(this, arguments);
};

//-----------------------------------------------------------------------------
// Window_LearnSkillReserveConfirm
//
// 予約確認用のウィンドウ
// ※Window_LearnSkillConfirmを流用

function Window_LearnSkillReserveConfirm() {
    this.initialize(...arguments);
}

Window_LearnSkillReserveConfirm.prototype = Object.create(Window_LearnSkillConfirm.prototype);
Window_LearnSkillReserveConfirm.prototype.constructor = Window_LearnSkillReserveConfirm;

Window_LearnSkillReserveConfirm.prototype.makeCommandList = function() {
    this.addCommand(pReserveYesText, "ok");
    this.addCommand(pReserveNoText, "cancel");
};

Window_LearnSkillReserveConfirm.prototype.drawAllItems = function() {
    const paramSkill = this._skillData;
    const dataSkill = this.dataSkill();
    if (!dataSkill) {
        return;
    }

    // 文字列の最大長を求める。
    let maxWidth = 0;
    // 行数カウント用
    let lineCount = 0;

    let skillPoint = 0;
    if (paramSkill.SkillPoint) {
        skillPoint = eval(paramSkill.SkillPoint);
    }

    for (const line of pReserveConfirmText.split("\n")) {
        // %1:消費するSP値, %2:SP名, %3:取得するスキル名, %4:アイコン番号
        const message = line.format(skillPoint, pSkillPointName, dataSkill.name, dataSkill.iconIndex);
        // 文字列の最大長を保持しておく。
        const newWidth = this.textSizeEx(message).width + this.itemPadding() * 4;
        maxWidth = Math.max(maxWidth, newWidth);

        // 一行ずつ描画
        this.drawTextEx(message, this.itemPadding(), this.itemPadding() + lineCount * this.lineHeight());
        lineCount++;
    }
    lineCount++;

    // ウィンドウの幅と座標を文字列に合わせて調整
    this.width = maxWidth;
    this.height = this.lineHeight() * lineCount + this.fittingHeight(2);
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = (Graphics.boxHeight - this.height) / 2;

    const topIndex = this.topIndex();
    for (let i = 0; i < this.maxVisibleItems(); i++) {
        const index = topIndex + i;
        if (index < this.maxItems()) {
            this.drawItemBackground(index);
            this.drawItem(index);
        }
    }
};

/**
 * ●ウィンドウの領域設定
 */
Window_LearnSkillReserveConfirm.prototype.itemRect = function(index) {
    const rect = Window_Selectable.prototype.itemRect.apply(this, arguments);
    const lineCount = pReserveConfirmText.split("\n").length;
    rect.y += lineCount * this.lineHeight() + this.itemPadding() * 4;
    return rect;
};

//-----------------------------------------------------------------------------
// Window_LearnSkillReserveCancelConfirm
//
// 予約確認キャンセル用のウィンドウ
// ※Window_LearnSkillConfirmを流用

function Window_LearnSkillReserveCancelConfirm() {
    this.initialize(...arguments);
}

Window_LearnSkillReserveCancelConfirm.prototype = Object.create(Window_LearnSkillConfirm.prototype);
Window_LearnSkillReserveCancelConfirm.prototype.constructor = Window_LearnSkillReserveCancelConfirm;

Window_LearnSkillReserveCancelConfirm.prototype.makeCommandList = function() {
    this.addCommand(pReserveCancelYesText, "ok");
    this.addCommand(pReserveCancelNoText, "cancel");
};

Window_LearnSkillReserveCancelConfirm.prototype.drawAllItems = function() {
    const paramSkill = this._skillData;
    const dataSkill = this.dataSkill();
    if (!dataSkill) {
        return;
    }

    // 文字列の最大長を求める。
    let maxWidth = 0;
    // 行数カウント用
    let lineCount = 0;

    let skillPoint = 0;
    if (paramSkill.SkillPoint) {
        skillPoint = eval(paramSkill.SkillPoint);
    }

    for (const line of pReserveCancelConfirmText.split("\n")) {
        // %1:消費するSP値, %2:SP名, %3:取得するスキル名, %4:アイコン番号
        const message = line.format(skillPoint, pSkillPointName, dataSkill.name, dataSkill.iconIndex);
        // 文字列の最大長を保持しておく。
        const newWidth = this.textSizeEx(message).width + this.itemPadding() * 4;
        maxWidth = Math.max(maxWidth, newWidth);

        // 一行ずつ描画
        this.drawTextEx(message, this.itemPadding(), this.itemPadding() + lineCount * this.lineHeight());
        lineCount++;
    }
    lineCount++;

    // ウィンドウの幅と座標を文字列に合わせて調整
    this.width = maxWidth;
    this.height = this.lineHeight() * lineCount + this.fittingHeight(2);
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = (Graphics.boxHeight - this.height) / 2;

    const topIndex = this.topIndex();
    for (let i = 0; i < this.maxVisibleItems(); i++) {
        const index = topIndex + i;
        if (index < this.maxItems()) {
            this.drawItemBackground(index);
            this.drawItem(index);
        }
    }
};

/**
 * ●ウィンドウの領域設定
 */
Window_LearnSkillReserveCancelConfirm.prototype.itemRect = function(index) {
    const rect = Window_Selectable.prototype.itemRect.apply(this, arguments);
    const lineCount = pReserveCancelConfirmText.split("\n").length;
    rect.y += lineCount * this.lineHeight() + this.itemPadding() * 4;
    return rect;
};

//-----------------------------------------------------------------------------
// BattleManager
//-----------------------------------------------------------------------------

// 最初のスキル習得かどうか？
let mFirstLearn = false;

/**
 * ●報酬の獲得
 */
const _BattleManager_gainRewards = BattleManager.gainRewards;
BattleManager.gainRewards = function() {
    mFirstLearn = true;
    _BattleManager_gainRewards.apply(this, arguments);
    mFirstLearn = false;
};

//-----------------------------------------------------------------------------
// Game_Action
//-----------------------------------------------------------------------------

// 予約機能を対象外にするためのフラグ
let mAddSkillPoint = false;

/**
 * ●効果適用
 */
const _Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    // スキルポイントを加算する設定があるかどうか？
    const addSkillPoint = this.item().meta.AddSkillPoint;
    if (addSkillPoint) {
        // 予約機能は対象外にする。
        mAddSkillPoint = true;
    }
    _Game_Action_apply.apply(this, arguments);
    mAddSkillPoint = false;
};

//-----------------------------------------------------------------------------
// Game_Actor
//-----------------------------------------------------------------------------

/**
 * 【独自】予約スキルの設定
 */
Game_Actor.prototype.setReserveSkill = function(skillId, needSp) {
    this._reserveSkillId = skillId;
    this._reserveSkillSp = needSp;
};

/**
 * 【独自】予約スキルのクリア
 */
Game_Actor.prototype.clearReserveSkill = function() {
    this._reserveSkillId = null;
    this._reserveSkillSp = null;
};

/**
 * 【独自】予約スキルの取得
 */
Game_Actor.prototype.reserveSkillId = function() {
    return this._reserveSkillId;
};

// レベルアップ時判定用
let mIsLevelUp = false;
// スキル習得のメッセージ表示用
let mDisplayLearnSkillId = false;

/**
 * ●レベルアップ時
 */
const _Game_Actor_levelUp = Game_Actor.prototype.levelUp;
Game_Actor.prototype.levelUp = function() {
    mIsLevelUp = true;
    _Game_Actor_levelUp.apply(this, arguments);
    mIsLevelUp = false;
};

/**
 * ●スキルポイントの変更
 */
const _Game_Actor_changeSkillPoint = Game_Actor.prototype.changeSkillPoint;
Game_Actor.prototype.changeSkillPoint = function(changePoint) {
    _Game_Actor_changeSkillPoint.apply(this, arguments);

    // 予約機能は対象外。
    if (mAddSkillPoint) {
        return;
    }

    // 控えメンバーの場合は処理しない。
    if (pBenchMemberNotTarget && !this.isBattleMember()) {
        return;
    }

    // タイミングが有効で、かつ予約スキルが存在する場合
    if (isLearnSkillConditionOK() && this._reserveSkillId) {
        // 現在のスキルポイント
        const currentSp = this.currentSkillPoint();

        // 必要ＳＰを満たした場合、スキルを習得する。
        if (currentSp >= this._reserveSkillSp) {
            // ＳＰを減算して反映
            const newSp = currentSp - this._reserveSkillSp;
            // パーティ共有の場合
            if (pSkillPointType == "party") {
                const variableNo = eval(pSkillPointVariable);
                // 変数に反映
                $gameVariables.setValue(variableNo, newSp);
            // アクター毎の場合
            } else {
                this[SKILL_POINT_KEY] = newSp;
            }

            // スキル習得
            this.learnSkill(this._reserveSkillId);

            // レベルアップ時のＳＰ獲得で予約スキルを習得した場合
            if (mIsLevelUp) {
                // ＳＰの入手メッセージよりも予約スキルの習得文を後で表示したい。
                // displayLevelUpで習得文を表示するためにＩＤだけを設定
                mDisplayLearnSkillId = this._reserveSkillId;

            // それ以外
            // ・プラグインコマンドでＳＰを獲得した場合
            // ・または、敵キャラに設定したＳＰを獲得した場合
            } else {
                // 最初の一人目の場合
                if (mFirstLearn) {
                    mFirstLearn = false;
                    // 最初の一人目のみ改行または常に改行
                    if (pNormalLearnTextChangePage >= 1) {
                        $gameMessage.newPage();
                    }
                // 常に改行の場合
                } else if (pNormalLearnTextChangePage == 2) {
                    $gameMessage.newPage();
                }

                const dataSkill = $dataSkills[this._reserveSkillId];
                $gameMessage.add(pNormalLearnText.format(this.name(), dataSkill.name, dataSkill.iconIndex));
                // ウィンドウ背景の設定
                $gameMessage.setBackground(pNormalLearnTextBackground);
            }

            // 予約状態初期化
            this.clearReserveSkill();

            // 控えメンバーの場合は習得画面を呼ばない。
            if (pBenchMemberNotCallScene && !this.isBattleMember()) {
                return;
            }

            // スキル習得画面を開くアクターＩＤ
            if (mReserveSkillActorId) {
                // 既に値が存在する場合は、先頭寄りのアクターの番号を優先
                if (this.index() >= 0
                        && this.index() < $gameActors.actor(mReserveSkillActorId).index()) {
                    mReserveSkillActorId = this.actorId();
                }
            } else {
                mReserveSkillActorId = this.actorId();
            }
        }
    }
};

/**
 * ●レベルアップメッセージの表示
 */
const _Game_Actor_displayLevelUp = Game_Actor.prototype.displayLevelUp;
Game_Actor.prototype.displayLevelUp = function(newSkills) {
    if (mDisplayLearnSkillId) {
        // 習得スキルの一覧から予約スキルを除去
        // ※通常の習得スキルに表示しないため。
        newSkills.remove($dataSkills[mDisplayLearnSkillId]);

        // 本来の処理
        // ※ここで通常の習得スキルを表示
        // 　レベルアップ時のＳＰ表示もここで行われる。
        _Game_Actor_displayLevelUp.apply(this, arguments);

        // 独自の習得メッセージを追加で表示する。
        const dataSkill = $dataSkills[mDisplayLearnSkillId];
        $gameMessage.add(pLevelUpLearnText.format(this.name(), dataSkill.name, dataSkill.iconIndex));

        mDisplayLearnSkillId = null;
        return;
    }

    _Game_Actor_displayLevelUp.apply(this, arguments);
};

/**
 * ●スキル習得のタイミングが有効か？
 */
function isLearnSkillConditionOK() {
    if ($gameParty.inBattle() && pLearnTimingBattle) {
        return true;
    } else if (!$gameParty.inBattle() && pLearnTimingNotBattle) {
        return true;
    }
    return false;
}

// ----------------------------------------------------------------------------
// Game_Interpreter
// ----------------------------------------------------------------------------

/**
 * ●処理終了
 */
const _Game_Interpreter_terminate = Game_Interpreter.prototype.terminate;
Game_Interpreter.prototype.terminate = function() {
    _Game_Interpreter_terminate.apply(this, arguments);

    // 予約スキルを習得した場合はスキル終了画面呼び出し
    // 対象は現在実行中のイベントのみ
    // ただし、メッセージ表示を行う場合は待つ（下のWindow_Messageへ）
    if (mReserveSkillActorId
            && $gameMap._interpreter == this
            && !$gameMessage.hasText()) {
        // アクターをセット
        $gameParty.setMenuActor($gameActors.actor(mReserveSkillActorId));
        // スキル習得画面呼び出し
        SceneManager.push(Scene_LearnSkillList);
    }
};

// ----------------------------------------------------------------------------
// Window_Message
// ----------------------------------------------------------------------------

/**
 * ●メッセージ終了時
 */
const _Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
Window_Message.prototype.terminateMessage = function() {
    _Window_Message_terminateMessage.apply(this, arguments);

    // 強制呼び出しフラグがオンの場合
    if (mForceCallFlg) {
        mForceCallFlg = false;
        // アクターをセット
        $gameParty.setMenuActor($gameActors.actor(mReserveSkillActorId));
        // スキル習得画面呼び出し
        SceneManager.push(Scene_LearnSkillList);
    }
};

/**
 * ●メッセージを閉じる際の確認
 * イベントコマンドでＳＰを獲得し、予約スキルを習得した際、
 * イベント終了時にスキル習得画面を呼び出す処理。
 * ※Game_Interpreter.prototype.terminateに実装した場合は、
 * 　スキル習得メッセージより前に呼び出されてしまうためここに実装する。
 */
const _Window_Message_checkToNotClose = Window_Message.prototype.checkToNotClose;
Window_Message.prototype.checkToNotClose = function() {
    _Window_Message_checkToNotClose.apply(this, arguments);

    // 予約スキルを習得した場合はスキル習得画面呼び出し
    // この時点でもisClosingならば、メッセージ終了と判断
    // さらにイベントが終了していることを確認する。
    if (mReserveSkillActorId && this.isClosing() && !$gameMap._interpreter.isRunning()) {
        // アクターをセット
        $gameParty.setMenuActor($gameActors.actor(mReserveSkillActorId));
        // スキル習得画面呼び出し
        SceneManager.push(Scene_LearnSkillList);
    }
};

})();
