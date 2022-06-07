﻿//=============================================================================
// NRP_CountTimeBattle.js
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc v1.13 Change the battle system to CTB.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @base NRP_VisualTurn
 * @orderBefore NRP_VisualTurn
 * @url http://newrpg.seesaa.net/article/472859369.html
 *
 * @help This is a so-called CTB (Count Time Battle).
 * One by one, the actions will be turned in proportion to the agility.
 * With that, each battler will possess a turn individually.
 * 
 * This plugin does not display order by itself.
 * Please use it in combination with NRP_VisualTurn.js.
 * http://newrpg.seesaa.net/article/472840225.html
 * 
 * -------------------------------------------------------------------
 * [Notice]
 * -------------------------------------------------------------------
 *  * If the state "Auto-removal Timing" is "Action End",
 * the effect will expire at the individual's turn.
 * In the case of "Turn End," the effect
 * is determined in everyone's turn.
 * Basically, "Action End" is easier to use.
 *
 * Speed values entered from the editor are in %.
 * Speed100 technique is +100%. This means twice as fast.
 * Speed -50 is 1/2 times faster.
 * Below -100, the turn will be almost no turn.
 *
 * Be sure to change the Guard Skill setting that is in the default.
 * If Speed is left at 2000, it will be "my turn all the time".
 * Also, "Action End" is recommended for Auto-removal of guard state.
 * 
 * The fight and escape party commands are not initially displayed.
 * They are displayed when Cancel is pressed.
 * 
 * For more information, please see below.
 * http://newrpg.seesaa.net/article/472859369.html
 * 
 * -------------------------------------------------------------------
 * [Note of States]
 * -------------------------------------------------------------------
 * You can change the target's waiting time
 * by entering the following in the note field of the state.
 * A value of 100 is the waiting time for one turn of the target.
 * Negative values are also possible.
 * 
 * ◆<SetWt:[Number]>
 * Change the target waiting time.
 * 
 * ◆<AddWt:[Number]>
 * Add up the waiting time for the target.
 * 
 * ◆例
 * <AddWt:50>
 * Delays the target's action for 1/2 turn.
 * This is the so-called delay attack.
 * 
 * <SetWt:0>
 * The target's waiting time is reduced to 0
 * and the action is taken immediately.
 * However, it is meaningless even
 * if it is applied to the user of the skill,
 * because the turn will elapse immediately after this.
 * If you want the user to perform continuous action,
 * set the Speed of the skill to 2000.
 * (※Refer to: Continuous action skill)
 * 
 * <SetWt:-500>
 * Changes the target's waiting time to -5 turns.
 * In other words, you will be able to move unilaterally about 5 times.
 * 
 * Note that these effects occur only when a state is applied.
 * Therefore, they cannot be applied on top of each other
 * if the same state is still applied.
 * If "Auto-removal Timing" is set to "Turn End" for a single turn,
 * the stacking can be done instantly.
 *
 * Conversely, if "Auto-removal Timing"
 * is set to one turn of "Action End",
 * an anomaly such as "delay that cannot be stacked
 * until the enemy acts once" can be created for the purpose.
 * 
 * -------------------------------------------------------------------
 * [Continuous action skill]
 * -------------------------------------------------------------------
 * If the Speed of a skill is set to 2000 (MAX),
 * it will perform a series of actions without time elapsing.
 * This is useful for creating auxiliary skills, etc.,
 * that trigger instantaneous effects.
 * 
 * -------------------------------------------------------------------
 * [Conflict Information]
 * -------------------------------------------------------------------
 * Because it is fundamentally changing the flow of battle,
 * it will conflict with plug-ins that touch that area.
 * For reference, plugins with larger impact tend to move more easily
 * if they are placed on the upper side.
 * ※This is just a trend. It is not certain.
 * 
 * Overrides the following functions. Please be careful of conflicts.
 * I think it's more stable if you put it on top as much as possible.
 * - Scene_Battle.prototype.commandFight
 * - BattleManager.startInput()
 * - BattleManager.selectNextCommand
 * - BattleManager.selectPreviousCommand
 * - BattleManager.makeActionOrders
 * - BattleManager.startTurn
 * - BattleManager.processTurn
 * - BattleManager.endTurn
 * - BattleManager.updateTurnEnd
 * - BattleManager.getNextSubject
 * - BattleManager.processEscape
 * - Game_Battler.prototype.onAllActionsEnd
 * - Game_Battler.prototype.performActionEnd()
 * - Game_Enemy.prototype.meetsTurnCondition
 * - Game_Action.prototype.speed
 * - Window_BattleLog.prototype.startTurn
 * (The following are MZ only)
 * - Game_Battler.prototype.turnCount
 * - BattleManager.endAction
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
 * @ [Plugin Parameters]
 * @------------------------------------------------------------------
 *
 * @param <Basic>
 *
 * @param number
 * @parent <Basic>
 * @type number
 * @default 9
 * @desc The number of battler to calculate the turn order.
 * This is the number of battler to be displayed. default 9.
 *
 * @param <Battle Start>
 *
 * @param showPartyCommand
 * @parent <Battle Start>
 * @type select
 * @option 0:None @value 0
 * @option 1:Display @value 1
 * @option 2:OnlyEnemyFirst @value 2
 * @default 0
 * @desc How to display party commands at the start of a battle.
 * 
 * @param actorStartRandomWt
 * @parent <Battle Start>
 * @type number
 * @default 0
 * @desc Distribute the actors' initial wait time by the numerical %.
 * Example: 20 distributes 90-110%. 0 if not specified.
 *
 * @param enemyStartRandomWt
 * @parent <Battle Start>
 * @type number
 * @default 20
 * @desc Distribute the enemys' initial wait time by the numerical %.
 * Example: 20 distributes 90-110%. 0 if not specified.
 *
 * @param preemptiveAdvantage
 * @parent <Battle Start>
 * @type number
 * @default 50
 * @desc Advantage to actors during a preemptive attack.
 * Speed up their turn by the % of the specified number.
 *
 * @param surpriseAdvantage
 * @parent <Battle Start>
 * @type number
 * @default 50
 * @desc Advantage to enemys during a surprise attack.
 * Speed up their turn by the % of the specified number.
 *
 * @param startTurn
 * @parent <Battle Start>
 * @type select
 * @option 0
 * @option 1
 * @default 1
 * @desc Sets the number of turns at the start of battle.
 * It is used to determine the enemy's action. default 1. MV's default 0.
 *
 * @param <Escape>
 *
 * @param escapePenalty
 * @parent <Escape>
 * @type number
 * @default 25
 * @desc Penalty for failure to escape.
 * Delays the actor's turn by the % of the specified number.
 * 
 * @param <State&Buf>
 * 
 * @param selfStatePlusTurn
 * @parent <State&Buf>
 * @type boolean
 * @default true
 * @desc The state put on self has a +1 continuation turn.
 * The timing of the automatic cancellation must be "Action End".
 * 
 * @param selfBufPlusTurn
 * @parent <State&Buf>
 * @type boolean
 * @default true
 * @desc The buf put on self has a +1 continuation turn.
 * How to deal with a problem whose effect on self quickly disappears.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.13 戦闘システムをＣＴＢへ変更します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @base NRP_VisualTurn
 * @orderBefore NRP_VisualTurn
 * @url http://newrpg.seesaa.net/article/472859369.html
 *
 * @help いわゆるＣＴＢ（カウントタイムバトル）です。
 * 敏捷性に比例して、一人ずつ行動が回ってくるようになります。
 * それに伴い、各バトラーは個別にターンを保有するようになります。
 * 
 * このプラグイン単体では順序の表示を行いません。
 * NRP_VisualTurn.jsと組み合わせて使用してください。
 * http://newrpg.seesaa.net/article/472840225.html
 * 
 * -------------------------------------------------------------------
 * ■注意点
 * -------------------------------------------------------------------
 * ステートの自動解除のタイミングが『行動終了時』の場合は
 * 個人のターンで効果が切れます。
 * 『ターン終了時』の場合は全員のターンで判定されます。
 * 基本的には『行動終了時』のほうが使いやすいです。
 *
 * エディタ上から入力する速度補正の値は％にしています。
 * 速度補正100の技は+100%。つまり二倍速ということです。
 * 速度補正-50で1/2倍速です。-100以下だとターンがほぼ回らなくなります。
 *
 * デフォルトにある防御の設定は必ず変えてください。
 * 速度補正が2000のままだと「ずっと俺のターン」になります。
 * また、防御ステートの自動解除は『行動終了時』を推奨します。
 * 
 * 戦う、逃げるのパーティコマンドは初期表示しません。
 * キャンセルを押すと表示するようになっています。
 * 
 * その他、詳細は以下をご覧ください。
 * http://newrpg.seesaa.net/article/472859369.html
 *
 * -------------------------------------------------------------------
 * ■ステートのメモ欄
 * -------------------------------------------------------------------
 * ステートのメモ欄に以下を記入することで、対象の待ち時間を変更できます。
 * 数値は100で対象の１ターン分の待ち時間となります。マイナス値も可能です。
 * 
 * ◆<SetWt:[数値]>
 * 対象の待ち時間を変更します。
 * 
 * ◆<AddWt:[数値]>
 * 対象の待ち時間を加算します。
 * 
 * ◆例
 * <AddWt:50>
 * 1/2ターン分、相手の行動を遅らせます。
 * いわゆるディレイアタックですね。
 * 
 * <SetWt:0>
 * 対象の待ち時間を０にし、即時行動させます。
 * ただし、行動者自身にかけても、この直後にターン経過するので無意味です。
 * 連続行動をさせたい場合は、スキルの速度補正を2000に設定してください。
 * （※参照：連続行動技）
 * 
 * <SetWt:-500>
 * 対象の待ち時間を－５ターンに変更します。
 * つまり、一方的に５回程度動けるようになります。
 * 
 * なお、これらはステートがかかった際にのみ発生する効果となります。
 * そのため、同一のステートがかかったままだと重ねがけできません。
 * これは自動解除のタイミングを『ターン終了時』の1ターンにしておけば、
 * 即座に重ねられるようになります。
 *
 * 逆に言えば、自動解除のタイミングを『行動終了時』の1ターンにしておけば、
 * 「敵が一度行動するまで重ねられないディレイ」のような異常を狙って作れます。
 * 
 * -------------------------------------------------------------------
 * ■連続行動技
 * -------------------------------------------------------------------
 * スキルの速度補正を2000（MAX）にしておくと、
 * 時間経過なしで連続行動を行います。
 * 瞬時に効果を発動する補助スキルなどの作成に便利です。
 * 
 * -------------------------------------------------------------------
 * ■競合情報
 * -------------------------------------------------------------------
 * 戦闘の流れを根本的に変えているため、
 * その辺に触れるプラグインとは競合しまくります。
 * 参考までにこういった影響の大きなプラグインほど
 * 上側に配置したほうが、動きやすい傾向にあります。
 * ※あくまで傾向です。確実ではありません。
 * 
 * 以下の関数を上書きしています。競合にご注意ください。
 * なるべく上側に配置したほうが安定すると思います。
 * ・Scene_Battle.prototype.commandFight
 * ・BattleManager.startInput()
 * ・BattleManager.selectNextCommand
 * ・BattleManager.selectPreviousCommand
 * ・BattleManager.makeActionOrders
 * ・BattleManager.startTurn
 * ・BattleManager.processTurn
 * ・BattleManager.endTurn
 * ・BattleManager.updateTurnEnd
 * ・BattleManager.getNextSubject
 * ・BattleManager.processEscape
 * ・Game_Battler.prototype.onAllActionsEnd
 * ・Game_Battler.prototype.performActionEnd()
 * ・Game_Enemy.prototype.meetsTurnCondition
 * ・Game_Action.prototype.speed
 * ・Window_BattleLog.prototype.startTurn
 * (以下はMZのみ)
 * ・Game_Battler.prototype.turnCount
 * ・BattleManager.endAction
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
 * @param <Basic>
 * @text ＜基本設定＞
 * @desc 見出しです。
 *
 * @param number
 * @text 計算人数（表示人数）
 * @parent <Basic>
 * @type number
 * @default 9
 * @desc ターン順序の計算を行う人数。これが表示される人数になります。
 * 指定なしなら9。
 *
 * @param <Battle Start>
 * @text ＜戦闘開始関連＞
 * @desc 見出しです。
 * 
 * @param showPartyCommand
 * @text パーティコマンドの表示
 * @parent <Battle Start>
 * @type select
 * @option 0:非表示 @value 0
 * @option 1:表示 @value 1
 * @option 2:敵先制時のみ表示 @value 2
 * @default 0
 * @desc 戦闘開始時にパーティコマンドを表示する方法です。
 * 
 * @param actorStartRandomWt
 * @text 味方の始動時間バラツキ
 * @parent <Battle Start>
 * @type number
 * @default 0
 * @desc 味方の初期待ち時間を数値％分だけ分散させます。
 * 例：20ならば、90～110%に分散。指定なしは0。
 *
 * @param enemyStartRandomWt
 * @text 敵の始動時間バラツキ
 * @parent <Battle Start>
 * @type number
 * @default 20
 * @desc 敵の初期待ち時間を数値％分だけ分散させます。
 * 例：20ならば、90～110%に分散。指定なしは20。
 *
 * @param preemptiveAdvantage
 * @text 先制時の始動時間ボーナス
 * @parent <Battle Start>
 * @type number
 * @default 50
 * @desc 先制攻撃時の特典。
 * 指定した数値の％分だけ仲間のターンを早めます。
 *
 * @param surpriseAdvantage
 * @text 奇襲時の始動時間ボーナス
 * @parent <Battle Start>
 * @type number
 * @default 50
 * @desc 奇襲時の敵特典。
 * 指定した数値の％分だけ敵のターンを早めます。
 *
 * @param startTurn
 * @text 開始ターン数
 * @parent <Battle Start>
 * @type select
 * @option 0
 * @option 1
 * @default 1
 * @desc 戦闘開始時のターン数（敵の行動判定用）を設定します。
 * 初期値は1。MVのデフォルトの仕様だと0です。
 *
 * @param <Escape>
 * @text ＜逃走関連＞
 * @desc 見出しです。
 *
 * @param escapePenalty
 * @text 逃走時のペナルティ時間
 * @parent <Escape>
 * @type number
 * @default 25
 * @desc 逃走失敗時のペナルティ。
 * 指定した数値の％分だけ味方のターンを遅らせます。
 * 
 * @param <State&Buf>
 * @text ＜ステート／能力変化＞
 * @desc 見出しです。
 * 
 * @param selfStatePlusTurn
 * @text 自身へのステートターン+1
 * @parent <State&Buf>
 * @type boolean
 * @default true
 * @desc 自分にかけたステートは継続ターンを+1します。
 * 自動解除のタイミングが『行動終了時』のものが対象です。
 * 
 * @param selfBufPlusTurn
 * @text 自身への強化弱体ターン+1
 * @parent <State&Buf>
 * @type boolean
 * @default true
 * @desc 自分にかけた強化弱体は継続ターンを+1します。
 * 自分にかけた変化が即切れする問題への対処です。
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
    return isNaN(str) ? def : +(str || def);
}

const parameters = PluginManager.parameters("NRP_CountTimeBattle");
    
const pNumber = toNumber(parameters["number"], 9);
const pShowPartyCommand = toNumber(parameters["showPartyCommand"], 0);
const pActorStartRandomWt = toNumber(parameters["actorStartRandomWt"], 0);
const pEnemyStartRandomWt = toNumber(parameters["enemyStartRandomWt"], 20);
const pEscapePenalty = toNumber(parameters["escapePenalty"], 25);
const pPreemptiveAdvantage = toNumber(parameters["preemptiveAdvantage"], 50);
const pSurpriseAdvantage = toNumber(parameters["surpriseAdvantage"], 50);
const pStartTurn = toNumber(parameters["startTurn"], 1);
const pSelfStatePlusTurn = toBoolean(parameters["selfStatePlusTurn"], true);
const pSelfBufPlusTurn = toBoolean(parameters["selfBufPlusTurn"], true);

//-----------------------------------------------------------------------------
// Scene_Battle
//-----------------------------------------------------------------------------

/**
 * ●戦闘開始シーン制御
 */
const _Scene_Battle_start = Scene_Battle.prototype.start;
Scene_Battle.prototype.start = function() {
    _Scene_Battle_start.apply(this);
    
    // MZ対応
    if (Utils.RPGMAKER_NAME == "MV") {
        // 表示更新（これがないとＴＰの初期値が表示されない）
        this.refreshStatus();
    }
};

/**
 * 【上書】パーティコマンドの戦うを選択
 */
Scene_Battle.prototype.commandFight = function() {
    const subject = BattleManager._subject;
    // アクターのコマンドを呼び出し
    if (subject && subject.isActor() && subject.canInput()) {
        BattleManager.startInputActor();
        return;
    }
    // 有効なアクターが取得できない場合は次へ
    this.selectNextCommand();
};

/**
 * ●味方選択キャンセル
 */
const _Scene_Battle_prototype_onActorCancel = Scene_Battle.prototype.onActorCancel;
Scene_Battle.prototype.onActorCancel = function() {
    _Scene_Battle_prototype_onActorCancel.call(this);
    
    // 行動予測を戻すために行動順序再計算
    BattleManager.makeActionOrders();
};

/**
 * ●敵選択キャンセル
 */
const _Scene_Battle_prototype_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel = function() {
    _Scene_Battle_prototype_onEnemyCancel.call(this);
    
    // 行動予測を戻すために行動順序再計算
    BattleManager.makeActionOrders();
};

//-----------------------------------------------------------------------------
// BattleManager
//-----------------------------------------------------------------------------

/*
 * ●初期化処理
 */
const _BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
    _BattleManager_initMembers.call(this);
    
    // CTTB判定フラグ
    this._isCtb = true;
};

/**
 * 【上書】コマンド入力開始
 * ※一度だけ呼び出される部分
 */
BattleManager.startInput = function() {
    let callPartyCommand = false;

    // パーティコマンドの表示を行う場合
    // ※戦闘開始時かつ奇襲ではない場合が条件
    if (pShowPartyCommand && this._phase == "start" && !this._surprise) {
        callPartyCommand = true;
    }

    this._phase = 'input';

    // MZ対応
    this._inputting = true;
    this._currentActor = null;

    // 行動順序計算
    this.makeActionOrders();
    // 時間経過
    this.timeGoesBy();
    // 次の行動者を取得する。
    this._subject = this.getNextSubject();

    // 行動者の個別ターン加算
    this._subject._turnCount++;
    
    // 行動設定
    // ※敵なら行動設定、味方なら行動回数などの領域設定
    this._subject.makeActions();
    
    // 入力中のアクターをクリアし、パーティコマンドを呼び出す。
    if (callPartyCommand) {
        // 通常表示の場合
        // または、敵先制時のみ表示の条件を満たしている場合
        if (pShowPartyCommand == 1
                || pShowPartyCommand == 2 && this._subject.isEnemy()) {
            this._actorIndex = -1;
            this._currentActor = null;
            return;
        }
    }

    // 敵の場合、または味方が入力不可ならターン開始
    if (!this._subject.isActor() || !this._subject.canInput()) {
        this._actorIndex = -1;
        this.startTurn();
        return;
    }
    
    this.startInputActor();
};

/**
 * 【独自】コマンド入力開始（続）
 * ※パーティコマンドから戻ってくる際と共有
 */
BattleManager.startInputActor = function() {
    // MZ対応
    // パーティコマンドから戻った際は空なので再設定
    if (!this._currentActor) {
        this._currentActor = this._subject;
    }

    // 先頭の行動者を入力対象に設定
    this._actorIndex = this._subject.index();

    // 入力可能状態のみ
    if (this._subject.canInput()) {
        /*
        * 【参考情報】
        * undecided(未定),inputting(コマンド入力中),waiting(待機中),acting(行動中),done(行動終了)
        */
        this._subject.setActionState("inputting"); // ポーズを入力中に変更
    }
};

/**
 * 【上書】次のコマンド入力へ
 */
BattleManager.selectNextCommand = function() {
    do {
        /*
         * 以下のいずれかの場合はターン開始
         * アクターが取得できない。
         * アクターではなく敵である。
         * アクターのコマンドは全て入力済み。（複数行動を考慮）
         */
        if (!this.actor() || !this.actor().isActor() || !this.actor().selectNextCommand()) {
            this.startTurn();
            break;
        }
    } while (!this.actor() || !this.actor().isActor() || !this.actor().canInput());
};

/**
 * 【上書】前のコマンド入力へ
 */
BattleManager.selectPreviousCommand = function() {
    do {
        var actor = this.actor();
        if (!actor || !actor.selectPreviousCommand()) {
            // 入力中のアクターをクリアし、パーティコマンドを呼び出す。
            this._actorIndex = -1;
            this._currentActor = null; // MZ対応
            this._subject.setActionState("undecided");
            return;
        }
    } while (!this.actor().canInput());
};

/**
 * 【独自】行動順序の作成
 */
BattleManager.makeActionOrders = function() {
    // WTとバトラーの組のリスト
    const wtBattlers = []
    // 一時バトラーリスト
    let battlers = [];
    
    /*
     * 敵味方全員の生存者リストを作成し、基本WTを計算する。
     */
    this.allBattleMembers().forEach(function(battler) {
        // 生存者のみに絞る
        if (battler.isAlive()) {
            // 現在の敏捷性で基本WTを設定する。
            battler.makeBaseWt();
            // 格納
            battlers.push(battler);
        }
    });
    
    /*
     * CTB用の行動順リストを作成していく。
     */
    for (const battler of battlers) {
        // バトラーをリストが埋まるまで登録していく。
        for (let i = 0; i < pNumber; i++) {
            // 現在のWTに、次の行動までのWTを加算する。
            const tmpWt = battler.wt + (battler.baseWt * i);

            /*
             * 以下の条件を満たす場合は登録終了。
             * １．現在の行動順リストが埋まっている。
             * ２．かつ、末尾のバトラーよりもWTが大きい場合。
             */
            if (wtBattlers.length >= pNumber
                && tmpWt >= wtBattlers[pNumber - 1][0]) {
                // forループを終了して、次のバトラーへ
                break;
            }
            
            // 行動順リストの末尾にWTとバトラーの組を追加
            wtBattlers.push([tmpWt, battler]);

            // WT順でソート実行
            wtBattlers.sort((a, b) => a[0] - b[0]);
            
            // 押し出された要素（最後の要素）を削除
            if (wtBattlers.length > pNumber) {
                wtBattlers.pop();
            }
        }
    }
    
    /*
     * 変更前との互換性を保つため、WTを除いたリストも作成
     */
    battlers = [];
    wtBattlers.forEach(function(wtBattler) {
        battlers.push(wtBattler[1]);
    });

    this._actionBattlers = battlers;
};

/**
 * 【独自】行動者の速度補正を考慮した上で、行動順序を再計算する。（予測用）
 */
BattleManager.reMakeActionOrders = function() {
    const subject = BattleManager._subject;
    // 行動者のWTを一時的に保持
    const tmpWt = subject.wt;
    // 速度補正を元にWTを一時的に書き換える。
    subject.makeSpeed();
    // 速度補正後のWTを加算する。
    subject.setWt(subject.wt + subject.getAddWt());

    // 行動順序再計算
    BattleManager.makeActionOrders();

    // ＷＴを元に戻す。
    subject.setWt(tmpWt);
}

/**
 * 【独自】時間経過処理
 */
BattleManager.timeGoesBy = function() {
    const topWt = this._actionBattlers[0].wt;
    if (topWt > 0) {
        // 先頭行動者のWTが0になるように、全バトラーのWTを減算。
        for (const battler of this.allBattleMembers()) {
            // 生存者のみに絞る
            if (battler.isAlive()) {
                battler.setWt(battler.wt - topWt);
            }
        }
    }
}

/**
 * 【上書】ターン開始処理
 */
BattleManager.startTurn = function() {
    this._phase = 'turn';

    // 不要につき削除（余計なモーション変更が入る）
    // this.clearActor();

    $gameTroop.increaseTurn();
    
    // 不要につき削除
    // this.makeActionOrders();
    
    $gameParty.requestMotionRefresh();
    
    this._logWindow.startTurn();

    // MZ対応
    this._inputting = false;
};

/**
 * 【上書】戦闘行動の処理
 */
BattleManager.processTurn = function() {
    var subject = this._subject;
    var action = subject.currentAction();
    if (action) {
        action.prepare();
        if (action.isValid()) {
            this.startAction();
        }
        subject.removeCurrentAction();
        
    } else {
// BattleManager.endTurnで行うため不要
//        subject.onAllActionsEnd();
//        this.refreshStatus();
//        this._logWindow.displayAutoAffectedStatus(subject);
//        this._logWindow.displayCurrentState(subject);
//        this._logWindow.displayRegeneration(subject);
//        this._subject = this.getNextSubject();
        // CTBなので即ターン終了
        this.endTurn();
    }
};

/**
 * ●行動開始
 */
const _BattleManager_startAction = BattleManager.startAction;
BattleManager.startAction = function() {
    // 元の処理
    _BattleManager_startAction.apply(this);
    
    // 実行した行動の速度を計算する。
    this._subject.makeSpeed();
};

/**
 * 【上書】ターン終了処理
 */
BattleManager.endTurn = function() {
    this._phase = 'turnEnd';
    this._preemptive = false;
    this._surprise = false;
    
    const subject = this._subject;

    // 行動者の現在WTに加算WTを加算する。
    subject.setWt(subject.wt + subject.getAddWt());
    
    // AddWt == 0 の場合は連続行動なのでターン経過なしとする。
    if (subject.getAddWt() > 0) {
        // 個別のターン終了処理
        subject.onTurnEnd();
        // デフォルトと異なりonAllActionsEndをonTurnEndの下に配置する。
        // 自動解除が『行動終了時』となっているステートを１ターン目から処理するため。
        subject.onAllActionsEnd();

        this.refreshStatus();
        this._logWindow.displayAutoAffectedStatus(subject);
        this._logWindow.displayRegeneration(subject);

        // 他のバトラーについても、自動解除が『ターン終了時』となっているステートを処理
        this.allBattleMembers().forEach(function(battler) {
            // 重複しないように行動者は除く
            if (battler != subject) {
                battler.onEveryTurnEnd();

                this.refreshStatus();
                this._logWindow.displayAutoAffectedStatus(battler);
                this._logWindow.displayRegeneration(battler);
            }
        }, this);
    }
    
    if (this.isForcedTurn()) {
        this._turnForced = false;
    }
    
    // BattleManager.startInputへ戻る。
};

/**
 * 【上書】ターン更新
 * ※MZ1.4.0の更新により処理が変更されたため、
 * 　endAllBattlersTurnを呼ばないように上書き。
 */
BattleManager.updateTurnEnd = function() {
    this.startInput();
};

/**
 * 【上書】次の行動主体の取得
 * 行動順序リストの次に来るバトラーを取得する。
 * 現在パーティにいないアクターを取得した場合（index が nil, バトルイベ
 * ントでの離脱直後などに発生）は、それをスキップする。
 */
BattleManager.getNextSubject = function() {
    // MZ対応
    this._currentActor = null;

    for (;;) {
        var battler = this._actionBattlers[0];
        
        if (!battler) {
            return null;
        }
        if (battler.isBattleMember() && battler.isAlive()) {
            // MZ対応
            if (battler.isActor()) {
                this._currentActor = battler;
            }

            return battler;
        }
    }
};

/**
 * 【上書】逃走実行時
 */
BattleManager.processEscape = function() {
    $gameParty.performEscape();
    SoundManager.playEscape();
    var success = this._preemptive ? true : (Math.random() < this._escapeRatio);
    if (success) {
        this.displayEscapeSuccessMessage();
        this._escaped = true;
        this.processAbort();
    } else {
        this.displayEscapeFailureMessage();
        this._escapeRatio += 0.1;
        $gameParty.clearActions();
        
        // 逃走失敗のペナルティを設定
        this.setEscapePenalty();
        
        // 即ターン終了
        this.endTurn();
//        this.startTurn();
    }
    return success;
};

/**
 * 【独自】逃走失敗時のペナルティ
 */
BattleManager.setEscapePenalty = function() {
    // 逃走失敗のペナルティを設定
    $gameParty.aliveMembers().forEach(function(battler) {
        // 失敗した当人以外のWTを加算する。
        if (battler != BattleManager._subject) {
            // 基本ＷＴ * ペナルティ% / 100
            battler.setWt(battler.wt + parseInt(battler.baseWt * pEscapePenalty / 100));
        }
    });
};

//-----------------------------------------------------------------------------
// Game_BattlerBase
//-----------------------------------------------------------------------------

/**
 * ●パラメータの追加
 */
Object.defineProperties(Game_BattlerBase.prototype, {
    // WT（待ち時間）
    wt: { get: function() { return this._wt; }, set: function(val) { this._wt = val; }, configurable: true },
    // 基本WT（基本待ち時間）
    baseWt: { get: function() { return this._baseWt; }, configurable: true },
});

/**
 * 【独自】自動解除が『ターン終了時』となっているステートの効果ターンを経過させる。
 */
Game_BattlerBase.prototype.updateStateEveryTurns = function() {
    this._states.forEach(function(stateId) {
        // 自動解除が『ターン終了時』のステートを対象とする。
        if ($dataStates[stateId].autoRemovalTiming == 2 && this._stateTurns[stateId] > 0) {
            this._stateTurns[stateId]--;
        }
    }, this);
};

/**
 * ●ステート有効ターン初期設定
 */
const _Game_BattlerBase_prototype_resetStateCounts = Game_BattlerBase.prototype.resetStateCounts;
Game_BattlerBase.prototype.resetStateCounts = function(stateId) {
    // 元処理呼び出し
    _Game_BattlerBase_prototype_resetStateCounts.apply(this, arguments);
    
    // 対象者が行動者自身の場合は有効ターン＋１
    // そうしておかないと、行動終了と同時にターン経過してしまうため。
    if (pSelfStatePlusTurn && this == BattleManager._subject) {
        // 自動解除が『行動終了時』のステートを対象とする。
        if ($dataStates[stateId].autoRemovalTiming == 1) {
            this._stateTurns[stateId]++;
        }
    }
};

/**
 * ●能力変化有効ターンの設定
 */
const _Game_BattlerBase_overwriteBuffTurns = Game_BattlerBase.prototype.overwriteBuffTurns;
Game_BattlerBase.prototype.overwriteBuffTurns = function(paramId, turns) {
    _Game_BattlerBase_overwriteBuffTurns.apply(this, arguments);

    // 対象者が行動者自身の場合は有効ターン＋１
    // そうしておかないと、行動終了と同時にターン経過してしまうため。
    if (pSelfBufPlusTurn && this == BattleManager._subject) {
        // 同じパラメータの多重がけで、
        // 二重にターンが加算されないよう設定ターンの場合のみに限定
        if (this._buffTurns[paramId] == turns) {
            this._buffTurns[paramId]++;
        }
    }
};

/**
 * ●ステート追加（ＷＴ変動の実装）
 */
const _Game_BattlerBase_prototype_addNewState = Game_BattlerBase.prototype.addNewState;
Game_BattlerBase.prototype.addNewState = function(stateId) {
    /*
     * WT設定値を元にWTを変化
     */
    // <SetWt:number>があれば、その値(%)を設定
    if ($dataStates[stateId].meta.SetWt) {
        this.setWt(this.baseWt * $dataStates[stateId].meta.SetWt / 100);
    
    // <AddWt:number>があれば、その値(%)を加算
    } else if ($dataStates[stateId].meta.AddWt) {
        this.setWt(this.wt + this.baseWt * $dataStates[stateId].meta.AddWt / 100);
    }
    
    // 元の処理
    _Game_BattlerBase_prototype_addNewState.apply(this, arguments);
};

/**
 * 【独自】ＷＴの設定
 */
Game_BattlerBase.prototype.setWt = function(wt) {
    this._wt = wt;
};

//-----------------------------------------------------------------------------
// Game_Battler
//-----------------------------------------------------------------------------

/**
 * ●戦闘開始時
 * ※バトラー変数の初期化
 */
const _Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
Game_Battler.prototype.onBattleStart = function() {
    // 元処理実行
    _Game_Battler_onBattleStart.apply(this, arguments);
    // CTBターンの初期化
    this.initCtbTurn();
};

/**
 * 【独自】ＣＴＢターンの初期化
 */
Game_Battler.prototype.initCtbTurn = function() {
    // 初期ターンの設定
    this._turnCount = pStartTurn - 1;

    // 基本WTを設定する。
    this.makeBaseWt();

    // WTの初期値として基本WTを設定する。
    let wt = this._baseWt;
    let startRandomWt = 0;
    
    // アクター
    if (this.isActor()) {
        startRandomWt = pActorStartRandomWt;
        
        // 先制攻撃の場合はWT減算
        if (BattleManager._preemptive) {
            // - WT * 先制攻撃特典％ / 100
            wt -= parseInt(wt * pPreemptiveAdvantage / 100);
        }
        
    // 敵キャラ
    } else {
        startRandomWt = pEnemyStartRandomWt;
            
        // 不意打ちの場合はWT半減
        if (BattleManager._surprise) {
            // - WT * 奇襲特典％ / 100
            wt -= parseInt(wt * pSurpriseAdvantage / 100);
        }
    }
    
    // 初期ＷＴを分散値に従って設定する。
    // 例：分散値が20の場合
    // 100 - (20 / 2) + [0～20未満の乱数] → 90～110未満の乱数を作成
    const r = 100 - (startRandomWt / 2) + Math.random() * startRandomWt;
    wt = parseInt(wt * r / 100);
    
    this.setWt(wt);
};

/**
 * 【上書】アクション終了時
 */
Game_Battler.prototype.performActionEnd = function() {
// 元のターン制ではdoneだが、違和感あるので変える。
//    this.setActionState('done');
    this.setActionState('undecided');
};

/**
 * 【上書】行動終了時
 */
Game_Battler.prototype.onAllActionsEnd = function() {
// onTurnEndと処理がかぶるので注釈化
// 消しておかないと毒などの数値表示が消える。
//    this.clearResult();
    this.removeStatesAuto(1);
    this.removeBuffsAuto();
};

/**
 * 【独自】自動解除が『ターン終了時』となっているステートを処理するためのターン終了処理
 */
Game_Battler.prototype.onEveryTurnEnd = function() {
    this.clearResult();
    this.updateStateEveryTurns();
    this.removeStatesAuto(2);
};

/**
 * 【MZのみ関数上書】
 * ●個別ターン数の取得
 */
Game_Battler.prototype.turnCount = function() {
    return this._turnCount;
};

/**
 * 【独自】基本WTを計算する。
 */
Game_Battler.prototype.makeBaseWt = function() {
    // 100000 / 敏捷性
    this._baseWt = parseInt(100000 / this.agi);
};

/**
 * 【独自】速度補正つき加算WTを取得する。
 */
Game_Battler.prototype.getAddWt = function() {
    let addWt = 100000;

    // speedが有効ならspeed値を使用する。
    if (this._speed > 0) {
        addWt = parseInt(100000 / this._speed);

    // なければagiを参照する。
    } else {
        addWt = parseInt(100000 / this.agi);
    }
    return addWt;
};

//-----------------------------------------------------------------------------
// Sprite_Actor
//-----------------------------------------------------------------------------

/**
 * ●アクターの位置調整
 */
const _Sprite_Actor_updateTargetPosition = Sprite_Actor.prototype.updateTargetPosition;
Sprite_Actor.prototype.updateTargetPosition = function() {
    if (this._actor.isInputting()) {
        // 通常は前進処理が呼び出されるが、不要なので何もしない
        // this.stepForward();
        return;
    }

    _Sprite_Actor_updateTargetPosition.apply(this, arguments);
};

//-----------------------------------------------------------------------------
// Game_Action
//-----------------------------------------------------------------------------

/**
 * 【上書】行動速度の計算
 * 速度補正を％化
 */
Game_Action.prototype.speed = function() {
    const agi = this.subject().agi;
    
    // バラつきをなくす
    let speed = agi;
//    var speed = agi + Math.randomInt(Math.floor(5 + agi / 4));
    
    if (this.item()) {
        // 速度補正MAX(2000)の場合は速度無限に（時間経過がなくなる）
        if (this.item().speed >= 2000) {
            return Infinity;
        }
        
        // 速度補正を％化
        speed += parseInt(speed * this.item().speed / 100);
//        speed += this.item().speed;
    }
    if (this.isAttack()) {
        // 速度補正MAX(2000)の場合は速度無限に（時間経過がなくなる）
        if (this.subject().attackSpeed() >= 2000) {
            return Infinity;
        }
        
        // 速度補正を％化
        speed += parseInt(speed * this.subject().attackSpeed() / 100);
//        speed += this.subject().attackSpeed();
    }

    // 速度が０だと無効扱いになるので最低でも１とする。
    if (speed < 1) {
        speed = 1;
    }

    return speed;
};

/**
 * ●各種効果
 * 効果前後で敏捷性の変化を監視し、変化があればWTを調整する。
 */
const _Game_Action_prototype_applyItemEffect = Game_Action.prototype.applyItemEffect;
Game_Action.prototype.applyItemEffect = function(target, effect) {
    // 効果前の敏捷性を保持
    var beforeAgi = target.agi;
    
    // 元の処理
    _Game_Action_prototype_applyItemEffect.apply(this, arguments);

    if (target.agi != beforeAgi) {
        // 敏捷性が変化したので、WTも変化させる。
        target.setWt(parseInt(target.wt / (target.agi / beforeAgi)));
    }
}

//-----------------------------------------------------------------------------
// Game_Enemy
//-----------------------------------------------------------------------------

/**
 * 【上書】敵の行動条件合致判定［ターン数］
 */
Game_Enemy.prototype.meetsTurnCondition = function(param1, param2) {
    // グループのターンではなく、行動者の個別ターンを参照する。
    var n = this.turnCount();
//    var n = $gameTroop.turnCount();
    
    if (param2 === 0) {
        return n === param1;
    } else {
        return n > 0 && n >= param1 && n % param2 === param1 % param2;
    }
};

//-----------------------------------------------------------------------------
// Window_BattleLog
//-----------------------------------------------------------------------------

/**
 * 【上書】ターン開始
 */
Window_BattleLog.prototype.startTurn = function() {
    // ウェイトをかけているだけなので削除
    // CTBでは全行動がターン開始なのでテンポ悪化を防ぐため。
    // this.push('wait');
};

//-----------------------------------------------------------------------------
// Window_BattleActor
//-----------------------------------------------------------------------------

/**
 * ●味方の選択時
 */
const _Window_BattleActor_prototype_show = Window_BattleActor.prototype.show;
Window_BattleActor.prototype.show = function(index) {
    _Window_BattleActor_prototype_show.apply(this, arguments);
    
    // 対象選択時、行動予測のために行動順序再計算
    BattleManager.reMakeActionOrders();
};

//-----------------------------------------------------------------------------
// Window_BattleEnemy
//-----------------------------------------------------------------------------

/**
 * ●敵の選択時
 */
const _Window_BattleEnemy_show = Window_BattleEnemy.prototype.show;
Window_BattleEnemy.prototype.show = function() {
    _Window_BattleEnemy_show.apply(this, arguments);
    
    // 対象選択時、行動予測のために行動順序再計算
    BattleManager.reMakeActionOrders();
};

//-----------------------------------------------------------------------------
// ＭＺ対応
//-----------------------------------------------------------------------------
if (Utils.RPGMAKER_NAME == "MZ") {
    /**
     * エラーにしないため空の関数を定義
     */
    BattleManager.refreshStatus = function() {
    };

    /**
     * ●MVの関数をそのまま定義
     */
    BattleManager.isForcedTurn = function () {
        return this._turnForced;
    };

    /**
     * 【上書】アクション終了時
     */
    BattleManager.endAction = function() {
        this._logWindow.endAction(this._subject);
        this._phase = "turn";
        
        // 不要な終了処理を注釈化
        // if (this._subject.numActions() === 0) {
        //     this.endBattlerActions(this._subject);
        //     this._subject = null;
        // }
    };
}

})();
