//=============================================================================
// NRP_BattleEventEX.js
//=============================================================================
/*:
 * @plugindesc v1.05 Extends the functionality of battle events.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 *
 * @help The following enhancements have been made to the battle Event.
 * 1. Fixed a bug that causes an error
 *    when executing "Force Action" while all targets are destroyed.
 * 2. In "Force Action", consider action abnormalities and MP depletion.
 * 3. The function to omit the staging of skill activation has been implemented.
 *    (Specify <NoStartAction> in note.)
 * 4. The plug-in command to operate the subject and target is implemented.
 *
 * The purpose of this plugin is to bring out the true value of battle events.
 * The plugin itself doesn't have much in the way of features.
 * For more information on what you can do in a battle event specifically,
 * please see the details below.
 * http://newrpg.seesaa.net/article/473072095.html
 *
 * [Plugin command]
 * > NRP.forceAction [true or false]
 *  true:  Force Action is performed regardless of the parameter setting.
 *  false: Regardless of the setting of parameters,
 *         the action is judged on "Force Action".
 *
 * > NRP.forceSubject [battler]
 * Overrides the subject that does "Force Action".
 * This overrides the subject of the instruction on the editor.
 *
 * > NRP.forceTarget [battler]
 * Override the target in "Force Action".
 * This overrides the subject of the instruction on the editor.
 *
 * > NRP.forceTargetLimit [battler]
 * Override the target in "Force Action".
 * This one doesn't act without a target.
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
 * @param forceValid
 * @type boolean
 * @default true
 * @desc "Force Action" will also determine if the MP is running out, etc.
 * The default value is true; the original behavior of MV is false.
 * 
 * @param adjustCommonEventActionEnd
 * @type boolean
 * @default true
 * @desc Adjusts the timing of the end process when a common event is invoked by the effect of a skill.
 */

/*:ja
 * @plugindesc v1.05 バトルイベントの機能を拡張します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 *
 * @help 以下の調整によって、バトルイベントの機能を拡張します。
 * ①対象が全滅した状態で『戦闘行動の強制』を実行するとエラーになるバグの修正
 * ②『戦闘行動の強制』にて、行動異常やＭＰ枯渇を考慮できるよう対応
 * ③スキル発動時の演出省略機能を実装（メモ欄に<NoStartAction>を指定）
 * ④行動主体・対象の操作を行うプラグインコマンドを実装
 *
 * バトルイベントの真価を引き出すことが目的であり、
 * このプラグイン自体には、さほど大きな機能はありません。
 * 具体的にバトルイベントで何ができるかは、以下の詳細をご覧ください。
 * http://newrpg.seesaa.net/article/473072095.html
 *
 * 【プラグインコマンド】
 * ◆NRP.forceAction [true or false]：
 *  true : パラメータの設定に関わらず『戦闘行動の強制』で強制行動を実行します。
 *  false: パラメータの設定に関わらず『戦闘行動の強制』で行動判定を実行します。
 *
 * ◆NRP.forceSubject [バトラー]：
 *  『戦闘行動の強制』を行う行動主体を上書きします。
 *  エディタ上の表示より優先されます。
 *
 * ◆NRP.forceTarget [バトラー]：
 *  『戦闘行動の強制』の対象を上書きします。
 *  エディタ上の表示より優先されます。
 *
 * ◆NRP.forceTargetLimit [バトラー]：
 *  『戦闘行動の強制』の対象を上書きします。
 *  こちらは対象がなければ行動しません。
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
 * @param forceValid
 * @text 強制行動時のスキル使用判定
 * @type boolean
 * @default true
 * @desc 戦闘行動の強制時もMP切れや行動異常による使用判定を行います。
 * 初期値はtrue。MVの元の挙動はfalseです。
 * 
 * @param adjustCommonEventActionEnd
 * @text ｺﾓﾝｲﾍﾞﾝﾄ時の終了処理を調整
 * @type boolean
 * @default true
 * @desc スキルの使用効果でコモンイベントを呼び出した際、
 * 行動終了処理のタイミングを調整するようにします。
 */

(function() {
"use strict";

function toBoolean(val, def) {
    // 空白なら初期値を返す
    if (val == "") {
        return def;
        
    // 既にboolean型なら、そのまま返す
    } else if (typeof val === "boolean") {
        return val;
    }
    // 文字列ならboolean型に変換して返す
    return val.toLowerCase() == "true";
}

const parameters = PluginManager.parameters("NRP_BattleEventEX");
    
const paramForceValid = toBoolean(parameters["forceValid"], true);
const paramAdjustCommonEventActionEnd = toBoolean(parameters["adjustCommonEventActionEnd"], true);

var plSuperForce = undefined;
var plForceSubject = undefined;
var plForceTarget = undefined;
var plForceTargetLimit = undefined;

var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);
    // 小文字化してから判定
    var lowerCommand = command.toLowerCase();
    
    // 行動強制フラグ
    if (lowerCommand === "nrp.forceaction") {
        plSuperForce = eval(args[0]);
        
    // 行動主体の上書き
    } else if (lowerCommand === "nrp.forcesubject") {
        // 引数が空白で区切られていた時のため連結しておく。
        plForceSubject = eval(args.join(" "));
        
    // 対象の上書き
    } else if (lowerCommand === "nrp.forcetarget") {
        plForceTarget = eval(args.join(" "));
        
    // 限定対象の上書き
    } else if (lowerCommand === "nrp.forcetargetlimit") {
        plForceTargetLimit = eval(args.join(" "));
        // undefinedの場合は空集合にしておく（対象なし、行動不能と判断）
        // undefinedのままでは初期状態と判別できないため。
        if (plForceTargetLimit == undefined) {
            plForceTargetLimit = [];
        }
    }
};

/**
 * ●変数初期化
 */
const _BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
    _BattleManager_initMembers.apply(this);

    // 強制行動実行フラグ
    // true,falseと区別するため、あえてundefinedで初期化
    plSuperForce = undefined;
    // 強制行動行動主体
    plForceSubject = undefined;
    // 強制行動ターゲット
    plForceTarget = undefined;
    plForceTargetLimit = undefined;

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
 * ●行動開始
 */
var _BattleManager_startAction = BattleManager.startAction;
BattleManager.startAction = function() {
    var subject = this._subject;
    var action = subject.currentAction();
    
    // 行動が取得できなかったり、敵味方が全滅していれば終了
    // ※戦闘行動の強制などで味方の全滅後に敵が行動した場合など
    // （これがないと落ちる）
    if (!action.item() || $gameParty.isAllDead() || $gameTroop.isAllDead()) {
        this._phase = "action";
        return;
    }

    // 強制状態でなければ、有効判定を行う。
    if (!this.isForceEX()) {
        // かつ、戦闘行動の強制状態ならば、混乱処理を行う。
        // ※戦闘行動の強制では、この処理を飛ばしているため。
        if (this.isForcedTurn() && subject.isConfused()) {
            action.setConfusion();
        }
        // 実行不能なら終了
        if (!action.isForceValid()) {
            this._phase = "action";
            return;
        }
    }
    
    // 元処理実行
    _BattleManager_startAction.apply(this);
};

/**
 * 超強制フラグを考慮した強制状態の判定
 * 元々のisForcedTurnなどの値を極力変えず、この関数で判定する。
 */
BattleManager.isForceEX = function() {
    // 戦闘行動の強制の場合
    if (this.isForcedTurn()) {
        // 超強制フラグがtrueならば
        if (plSuperForce == true) {
            return true;
            
        // 超強制フラグがfalseならば
        } else if (plSuperForce == false) {
            return false;
            
        // 超強制フラグがundefinedのままなら、
        } else if (plSuperForce == undefined) {
            // パラメータの設定に従って判定を行う
            if (paramForceValid) {
                return false;
            }
        }
    }
};

/**
 * ●【独自関数】戦闘行動の強制専用の有効判定
 * ※元のisValid()と異なり、強制時でも使用判定を行う。
 */
Game_Action.prototype.isForceValid = function() {
    return this.subject().canUse(this.item());
};

/**
 * ●ターゲットの決定
 */
var _Game_Action_makeTargets = Game_Action.prototype.makeTargets;
Game_Action.prototype.makeTargets = function() {
    // 強制状態でなければ、混乱処理を行う。
    if (!BattleManager.isForceEX() && this.subject().isConfused()) {
        return this.repeatTargets([this.confusionTarget()]);
    }

    return _Game_Action_makeTargets.apply(this);
};

/**
 * ●次の行動主体を取得
 */
var _BattleManager_getNextSubject = BattleManager.getNextSubject;
BattleManager.getNextSubject = function() {
    // プラグインコマンドから設定した値をクリア（次の行動主体へ引き継がない）
    plSuperForce = undefined;
    plForceSubject = undefined;
    plForceTarget = undefined;
    plForceTargetLimit = undefined;
    
    return _BattleManager_getNextSubject.apply(this);
};

/**
 * ●アクション開始メッセージ＆演出
 */
var _Window_BattleLog_startAction = Window_BattleLog.prototype.startAction;
Window_BattleLog.prototype.startAction = function(subject, action, targets) {
    var item = action.item();
    // スキルメモ欄に<NoStartAction>が設定されているなら開始演出を省略
    if (item.meta.NoStartAction) {
        // アニメーションとウェイトだけを残す
        this.push('showAnimation', subject, targets.clone(), item.animationId);
        var numMethods = this._methods.length;
        if (this._methods.length === numMethods) {
            this.push('wait');
        }
        return;
    }
    
    // 元処理実行
    _Window_BattleLog_startAction.apply(this, arguments);
};

/**
 * ●戦闘行動の強制
 */
var _Game_Interpreter_command339 = Game_Interpreter.prototype.command339;
Game_Interpreter.prototype.command339 = function() {
    // プラグインコマンドで行動主体や対象の上書きが指定されていた場合
    if (plForceSubject || plForceTarget || plForceTargetLimit) {
        var isActor = this._params[0];      // 敵なら0, 味方なら1
        var subjectIndex = this._params[1]; // 行動主体のインデックス
        var targetIndex = this._params[3];  // 対象のインデックス
        
        // 行動主体の上書き
        if (plForceSubject) {
            isActor = plForceSubject.isActor() ? 1 : 0;
            subjectIndex = plForceSubject.index();
        }
        // 強制対象の上書き（ただし、対象が配列なら確定できないため上書きしない）
        if (plForceTarget && !Array.isArray(plForceTarget)) {
            targetIndex = plForceTarget.index();
            
        // 強制限定対象の上書き（ただし、対象が配列なら確定できないため上書きしない）
        } else if (plForceTargetLimit && !Array.isArray(plForceTargetLimit)) {
            targetIndex = plForceTargetLimit.index();
        }
        
        this.iterateBattler(isActor, subjectIndex, function(battler) {
            if (!battler.isDeathStateAffected()) {
                battler.forceAction(this._params[2], targetIndex);
                BattleManager.forceAction(battler);
                this.setWaitMode('action');
            }
        }.bind(this));
        return true;
    }
    
    // 元処理実行
    return _Game_Interpreter_command339.apply(this);
};

/**
 * ●【独自定義】戦闘行動の強制（引数使用）
 */
Game_Interpreter.prototype.forceAction = function(subject, skillId, targetId) {
    var subjectIsActor = subject.isActor() ? 1 : 0;
    
    this.iterateBattler(subjectIsActor, subject.index(), function(battler) {
        if (!battler.isDeathStateAffected()) {
            battler.forceAction(skillId, targetId);
            BattleManager.forceAction(battler);
            this.setWaitMode('action');
        }
    }.bind(this));
    return true;
};

/**
 * ●【独自定義】対象リストが指定されている場合の狙われ率合計を取得する。
 */
Game_Unit.prototype.forceTgrSum = function() {
    if (Array.isArray(plForceTarget)) {
        return plForceTarget.reduce(function(r, member) {
            return r + member.tgr;
        }, 0);
    } else if (plForceTargetLimit) {
        return plForceTargetLimit.reduce(function(r, member) {
            return r + member.tgr;
        }, 0);
    }

    // 取得できなければ普通に返す
    return this.tgrSum();
};

/**
 * ●狙われ率を考慮して、ランダムにターゲットを取得する。
 */
var _Game_Unit_randomTarget = Game_Unit.prototype.randomTarget;
Game_Unit.prototype.randomTarget = function() {
    /*
     * 強制対象リストの指定があれば、そちらで判定を行う。
     */
    if (Array.isArray(plForceTarget) || Array.isArray(plForceTargetLimit)) {
        var tgrRand = Math.random() * this.forceTgrSum();
        var target = null;
            
        // 強制対象限定リストが指定されている場合
        // こちらの場合、該当がなければ対象を返さない。（行動も不発させる）
        if (Array.isArray(plForceTargetLimit)) {
            plForceTargetLimit.forEach(function(member) {
                tgrRand -= member.tgr;
                if (tgrRand <= 0 && !target) {
                    target = member;
                }
            });
            return target;
            
        // 強制対象リストが指定されている場合
        } else if (Array.isArray(plForceTarget)) {
            plForceTarget.forEach(function(member) {
                tgrRand -= member.tgr;
                if (tgrRand <= 0 && !target) {
                    target = member;
                }
            });
            // 対象が取得できた場合だけreturnする。
            // 取得できなければ通常のターゲット処理に移る。
            if (target) {
                return target;
            }
        }
    }
    
    // 元処理実行
    return _Game_Unit_randomTarget.apply(this);
};

/**
 * ●ターゲット不能時に補正を行う
 */
var _Game_Unit_smoothTarget = Game_Unit.prototype.smoothTarget;
Game_Unit.prototype.smoothTarget = function(index) {
    if (index < 0) {
        index = 0;
    }
    
    var member = this.members()[index];
    // 対象者が健在ならそのまま返す
    if (member && member.isAlive()) {
        return member;
    }
    
    // 強制限定対象が指定されている場合
    // 配列とそうでない場合の二通りを想定
    if (plForceTargetLimit) {
        // 配列ならば
        if (Array.isArray(plForceTargetLimit)) {
            // 強制限定対象リストの中から健在な者を対象に変える
            member = plForceTargetLimit.find(function(m) {
                return m.isAlive();
            });

            if (member) {
                return member;
            }
        }
        // 限定された中から対象を取得できなかったので諦める。
        return undefined;
        
    // 強制対象リストが指定されている場合
    } else if (Array.isArray(plForceTarget)) {
        // 強制対象リストの中から健在な者を対象に変える
        member = plForceTarget.find(function(m) {
            return m.isAlive();
        });

        if (member) {
            return member;
        }
        // それも無理なら元処理実行。
    }
    
    // 元処理実行
    return _Game_Unit_smoothTarget.apply(this, arguments);
};

/**
 * ●全体の効果
 * ※通常はコモンイベントの処理のみ
 */
const _Game_Action_applyGlobal = Game_Action.prototype.applyGlobal;
Game_Action.prototype.applyGlobal = function() {
    // ダメージタイプが『なし』の場合
    if (this.item().damage.type == 0) {
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
    return paramAdjustCommonEventActionEnd;
}

/**
 * ●行動終了時
 */
const _Game_Battler_onAllActionsEnd = Game_Battler.prototype.onAllActionsEnd;
Game_Battler.prototype.onAllActionsEnd = function() {
    // コモンイベントに対する終了処理を行わない。
    if (BattleManager._ignoreAllActionsEnd) {
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
    if ($gameParty.inBattle()) {
        // フラグをクリア
        // これにより、イベント終了後に終了処理が一度だけ呼ばれる。
        BattleManager._ignoreAllActionsEnd = undefined;
    }
};

})();
