//=============================================================================
// NRP_ChargeSkill.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.041 Create a charge skill.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/474413155.html
 *
 * @help Create a charge skill.
 * The charge time and other settings can also be set
 * in conjunction with the CTB plugin.
 * You can also use the normal turn system.
 * 
 * -------------------------------------------------------------------
 * [How to use]
 * -------------------------------------------------------------------
 * 1. Create the state for charging. (Example settings below)
 *  - Action constraints: any of the 'attacks'
 *  - Release condition: Cancel after the battle is over
 *  - Automatic cancellation: at the end of the action
 *  - Continuation turn: 1
 * 2. create a skill for execution.
 * Enter the following into note and specify the ID of the created state.
 * <ChargeState:[ID]>
 * 
 * The charge skill will now work.
 * If you want to set up more detailed settings, please see below.
 * 
 * [Items available for skills note]
 * <ChargeState:[ID]>
 * Sets the ID of the state for charging. (Required)
 * 
 * <ChargeSkill:[ID]>
 * Set the ID of the skill to start charging.
 * 
 * <ChargeName:[Name]>
 * Sets the display name at the start of a charge.
 * 
 * <ChargeSpeed:[number]>
 * Sets the speed compensation at the start of charging.
 * (In CTB, the length of the charge time.)
 * 
 * <ChargeSpeed:+100> or <ChargeSpeed:*2>
 * Set the value with a sign as shown above.
 * Calculate the original speed as 100(%).
 * 
 * <ChargeActionSkill:[ID]>
 * Specify if you want to perform a skill with a different ID.
 * 
 * <ChargeTurnException>
 * At the start of a charge, ignore the passage of turns, such as states.
 * 
 * <ChargeCost>
 * Change to consume MP/TP at the start of a charge.
 * 
 * <IfNoCharge>
 * If the specified formula is satisfied, it is triggered immediately.
 * 
 * <NoStartAction>
 * Do not step forward or display skill names when using skills.
 * 
 * <NoResult>
 * Do not display the result of using a skill.
 * 
 * [Items available for equips/states note]
 * <ChargeSpeed:[Number]]>
 * The charge speed is compensated by the equipment/state.
 * 
 * <ChargeSkillType:[Number]>
 * Applies speed compensation only to specific skill types.
 * You can specify multiple skill types separated by commas.
 * 
 * [Items available for states note]
 * <RemoveState:[ID]>
 * When a state is added, this unstates the specified number.
 * 
 * <StateMotion:[Motion]>
 * Set the waiting motion during state.
 *
 * -------------------------------------------------------------------
 * [Terms]
 * -------------------------------------------------------------------
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but we will respond to defects as far as possible.
 * 
 * @-----------------------------------------------------
 * @ [Plugin Parameters]
 * @-----------------------------------------------------
 * 
 * @param chargeTurnException
 * @type boolean
 * @default false
 * @desc At the start of a charge skill, ignore some turn-over processes.
 * Subject to state & ability change turnover, poison damage, etc.
 * 
 * @param adjustStateTiming
 * @type boolean
 * @default true
 * @desc Adjust the timing of the charge state so that it is added after the animation.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.041 ため技作成用の機能を提供します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/474413155.html
 *
 * @help ため技を作成します。
 * CTBプラグインとの連携によって、チャージタイムなどの設定も可能です。
 * ※通常のターン制でも使用できます。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * １．ため状態用ステートを作成します。（以下、設定例）
 *   ・行動制約：『～を攻撃』のいずれか
 *   ・解除条件：戦闘終了後に解除
 *   ・自動解除：行動終了時
 *   ・継続ターン：1
 * ２．実行用スキルを作成。
 *     メモ欄へ以下を記入し、作成したステートのIDを指定します。
 *   ・<ChargeState:[ID]>
 * 
 * これだけでため技が機能します。
 * より詳細な設定をしたい場合は以下を参照してください。
 * 
 * ◆スキルのメモ欄に使用可能な項目
 * <ChargeState:[ID]>  ：ため状態用ステートのIDを設定する。（必須）
 * <ChargeSkill:[ID]>  ：ため開始演出用スキルのIDを設定する。
 * <ChargeName:[名称]> ：ため開始時の表示名を設定する。
 * <ChargeSpeed:[数値]>：ため開始時の速度補正を設定する。
 *                       （CTBにおいてはため時間の長さ）
 *                       <ChargeSpeed:+100>または<ChargeSpeed:*2>
 *                       というように、符号付きで値を設定してください。
 *                       元の速度を100(%)として計算します。
 * <ChargeActionSkill:[ID]>：他のＩＤのスキルを実行したい場合に指定する。
 * <ChargeTurnException>：ため開始時、ステートなどのターン経過を無視します。
 * <ChargeCost>        ：MP･TPをため開始時に消費するよう変更する。
 * <IfNoCharge>        ：指定した式を満たす場合、即時発動する。
 * <NoStartAction>     ：スキル使用時の一歩前進や技名表示を行わない。
 * <NoResult>          ：スキル使用時の結果表示を行わない。
 * 
 * ◆装備・ステートのメモ欄に使用可能な項目
 * <ChargeSpeed:[数値]]>：装備、ステート時のため速度に補正をかける。
 * <ChargeSkillType:[数値]>：特定のスキルタイプのみ速度補正をかけます。
 *                          カンマ区切りで複数指定可。
 * 
 * ◆ステートのメモ欄に使用可能な項目
 * <RemoveState:[ID]> ：ステートが追加された際、指定番号のステートを解除する。
 * <StateMotion:[モーション名]> ：ステート中の待機モーションを設定する。
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
 * @param chargeTurnException
 * @text チャージターンの経過無効
 * @type boolean
 * @default false
 * @desc ため技の開始時、一部ターン経過処理を無視します。
 * ステート＆能力変化のターン経過、毒のダメージ効果などが対象。
 * 
 * @param adjustStateTiming
 * @text ステート付加のタイミング調整
 * @type boolean
 * @default true
 * @desc ため状態用ステートを付加するタイミングが、アニメーションの後になるように調整します。
 */

(function() {
"use strict";

function toBoolean(str) {
    if (str == true) {
        return true;
    }
    return (str == "true") ? true : false;
}

const parameters = PluginManager.parameters("NRP_ChargeSkill");
const pChargeTurnException = toBoolean(parameters["chargeTurnException"]);
const pAdjustStateTiming = toBoolean(parameters["adjustStateTiming"], false);

/**
 * ●ため技情報を保有する構造体
 */
var ChargeSkill = function() {
    this.skillId = 0;
    this.targetIndex = -1;
};

/**
 * ●ステートクリア
 */
var _Game_BattlerBase_clearStates = Game_BattlerBase.prototype.clearStates;
Game_BattlerBase.prototype.clearStates = function() {
    _Game_BattlerBase_clearStates.call(this);
    
    // ステート毎に保有するため技データ
    this._chargeSkills = {};
};

/**
 * ●アクション開始
 */
const _BattleManager_startAction = BattleManager.startAction;
BattleManager.startAction = function() {
    // ため技開始
    startCharge(this._subject);
    // 行動取得
    const action = this._subject.currentAction();
    // 行動が取得できなければ終了
    // ※ため開始状態（skillId:0）を飛ばすため
    if (!action || !action.item()) {
        return;
    }

    // 元処理実行
    _BattleManager_startAction.call(this);
};

/**
 * ●ため技開始
 */
function startCharge(subject) {
    const a = subject; // eval参照用
    const action = subject.currentAction();

    // スキルが取得できなければ終了
    if (!action.item()) {
        return;
    }
    const item = action.item();

    // ため用ステート
    var chargeStateId = item.meta.ChargeState;

    // ChargeStateの設定がなければ、ため技ではない。
    if (!chargeStateId) {
        return;

    // 既にため状態ならば、普通にスキル実行
    } else if (isSkillCast(item, subject)) {
        // 消費タイミングがため開始時の場合
        var chargeCost = item.meta.ChargeCost;
        if (chargeCost) {
            // 実行時の消費はなし
            item._tmpMpCost = 0;
            item._tmpTpCost = 0;
        } else {
            item._tmpMpCost = undefined;
            item._tmpTpCost = undefined;
        }
        return;
    }

    // eval参照用
    const chargeSpeedRate = getChargeSpeedRate(action);

    // 即時発動条件を満たしているなら、以降処理せず実行
    if (isNoCharge(action, chargeSpeedRate)) {
        return;
    }

    // 数式評価
    chargeStateId = eval(chargeStateId);

    /*
     * ため開始時と判定
     */
    chargeSkill(subject, action, chargeStateId, chargeSpeedRate);
}

/**
 * ●ため技実行時かどうか？
 * ※ため終わったスキルを発動するタイミングかを判定
 */
function isSkillCast(item, subject) {
    const a = subject; // eval参照用

    // ため用ステート
    let chargeStateId = item.meta.ChargeState;
    // ChargeStateの設定がなければ、ため技ではない。
    if (chargeStateId) {
        // 数式評価
        chargeStateId = eval(chargeStateId);
        // 既にため状態ならば、普通にスキル実行
        if (a.isStateAffected(chargeStateId)) {
            return true;
        }
    }
    return false;
}

// 値保持用
let mChargeStateId = null;

/**
 * ●ため開始技の実行
 * ※本来、選択したスキルとは別にため開始スキルを実行する。
 */
function chargeSkill(subject, action, chargeStateId, chargeSpeedRate) {
    const a = subject; // eval参照用
    const item = action.item();
    const keepActions = subject._actions; // アクション保持用

    // ため時の速度補正
    action._chargeSpeedRate = chargeSpeedRate;

    // 行動制約によってアクションが解除されるので再設定
    subject._actions = keepActions;
    action = subject.currentAction();

    // ステート毎のスキルID配列が未定義の場合は初期化
    // ※途中セーブから導入した場合を考慮
    if (subject._chargeSkills == undefined) {
        subject._chargeSkills = {};
    }

    // ため技情報を作成
    const chargeSkill = new ChargeSkill();
    // スキルＩＤの指定があるなら設定
    if (item.meta.ChargeActionSkill) {
        chargeSkill.skillId = item.meta.ChargeActionSkill;
    } else {
        chargeSkill.skillId = item.id;
    }

    // 敵キャラの場合は対象が決まってないので、ここでtargetIndexを更新
    if (subject.isEnemy()) {
        action.decideRandomTarget();
    }

    // 対象を保持
    chargeSkill.targetIndex = action._targetIndex;

    // ため用ステートIDに、ため技情報を紐付け
    subject._chargeSkills[chargeStateId] = chargeSkill;

    // ため技の表示名
    const chargeName = item.meta.ChargeName;

    // 消費タイミングが『ため開始時』の場合
    const chargeCost = item.meta.ChargeCost;
    if (chargeCost) {
        // 消費を求めて減算する。
        subject._mp -= subject.skillMpCost(item);
        subject._tp -= subject.skillTpCost(item);
    }

    // スキルIDをため用に変更
    // ため演出用スキルＩＤを取得する。
    var chargeSkillId = item.meta.ChargeSkill;
    if (chargeSkillId) {
        chargeSkillId = eval(chargeSkillId);
        action.setSkill(chargeSkillId);

        // ステート番号を保持（アクション終了時に設定）
        if (pAdjustStateTiming) {
            mChargeStateId = chargeStateId;
        } else {
            // 行動主体にステートを付加
            subject.addState(chargeStateId);
        }

    // 取得できない場合は0を設定
    } else {
        action.setSkill(0);
        // 行動主体にステートを付加
        subject.addState(chargeStateId);
    }

    // ため開始ターンを状態異常などの処理の対象外とする設定
    const chargeTurnException = item.meta.ChargeTurnException;
    // <ChargeTurnException>の指定がある場合は優先
    if (chargeTurnException != undefined) {
        if (chargeTurnException) {
            subject._isChargeTurnException = true;
        }
    // 指定がない場合はプラグインパラメータの設定
    } else if (pChargeTurnException) {
        subject._isChargeTurnException = true;
    }

    // 表示名変更
    setChargeName(chargeName, action, item, subject);
}

/**
 * ●アクション終了
 */
const _BattleManager_endAction = BattleManager.endAction;
BattleManager.endAction = function() {
    // 行動主体にステートを付加
    if (mChargeStateId) {
        this._subject.addState(mChargeStateId);
        mChargeStateId = null;
    }
    _BattleManager_endAction.apply(this, arguments);
};

/**
 * ●ターン終了時
 */
var _Game_Battler_onTurnEnd = Game_Battler.prototype.onTurnEnd;
Game_Battler.prototype.onTurnEnd = function() {
    // ため技起動時は独自のターン経過処理を行う
    if (this._isChargeTurnException) {
        this._isChargeTurnException = undefined;
        this.clearResult();
        this.updateChargeStateTurns();
        return;
    }

    // 元処理実行
    _Game_Battler_onTurnEnd.call(this);
};

/**
 * 【独自実装】ため技用ステートのみターン更新する。
 */
Game_BattlerBase.prototype.updateChargeStateTurns = function() {
    this._states.forEach(function(stateId) {
        if (this._stateTurns[stateId] > 0 && this._chargeSkills[stateId]) {
            this._stateTurns[stateId]--;
        }
    }, this);
};

/**
 * ●ＭＰ消費処理
 */
var _Game_BattlerBase_skillMpCost = Game_BattlerBase.prototype.skillMpCost;
Game_BattlerBase.prototype.skillMpCost = function(skill) {
    // 一時消費ＭＰが設定されているならそちらを参照
    if (skill._tmpMpCost != undefined) {
        return Math.floor(skill._tmpMpCost * this.mcr);
    }

    // 元処理実行
    return _Game_BattlerBase_skillMpCost.call(this, skill);
};

/**
 * ●ＴＰ消費処理
 */
var _Game_BattlerBase_skillTpCost = Game_BattlerBase.prototype.skillTpCost;
Game_BattlerBase.prototype.skillTpCost = function(skill) {
    // 一時消費ＴＰが設定されているならそちらを参照
    if (skill._tmpTpCost != undefined) {
        return skill._tmpTpCost;
    }

    // 元処理実行
    return _Game_BattlerBase_skillTpCost.call(this, skill);
};

/**
 * ●スキル一覧の消費更新
 */
var _Window_SkillList_drawSkillCost = Window_SkillList.prototype.drawSkillCost;
Window_SkillList.prototype.drawSkillCost = function(skill, x, y, width) {
    skill._tmpMpCost = undefined;
    skill._tmpTpCost = undefined;

    // 元処理実行
    _Window_SkillList_drawSkillCost.call(this, skill, x, y, width);
};

/**
 * ●表示技名変更
 * ・actionの中身は新しいため演出用スキル
 * ・itemの中身は元の実行用スキル
 */
function setChargeName(chargeName, action, item, subject) {
    // eval参照用
    const a = subject;

    // 表示名変更
    if (action.item() && chargeName) {
        // ブランクならメッセージなし
        if (chargeName == true) {
            action.item().name = undefined;
            
        // 表示名設定
        } else {
            try {
                // 式として取得できる場合
                action.item().name = eval(chargeName);
            } catch (e) {
                // 式でない場合はエラーとなるが、普通に文字列で取得
                action.item().name = chargeName;
            }
        }
    }
}

/**
 * ●混乱時の動作（強制攻撃系の行動制約）
 */
var _Game_Action_setConfusion = Game_Action.prototype.setConfusion;
Game_Action.prototype.setConfusion = function() {
    if (this.item()) {
        // ため技情報があれば、実行スキルを設定
        const chargeSkill = getChargeSkill(this.subject());
        if (chargeSkill) {
            var skillId = eval(chargeSkill.skillId);
            this.setSkill(skillId);
            this.setTarget(chargeSkill.targetIndex);
            return;
        }
    }

    _Game_Action_setConfusion.call(this);
};

/**
 * ●ため技情報を取得する。
 */
function getChargeSkill(subject) {
    // ため技情報が存在しない場合は処理終了
    if (!subject._chargeSkills || subject._chargeSkills.length == 0) {
        return;
    }

    // ため技ステートを発見した場合、その情報を取得する。
    for (let i = 0; i < subject.states().length; i++) {
        let state = subject.states()[i];
        if (subject._chargeSkills[state.id]) {
            return subject._chargeSkills[state.id];
        }
    }
}

/**
 * ●ステート追加
 */
var _Game_BattlerBase_prototype_addNewState = Game_BattlerBase.prototype.addNewState;
Game_BattlerBase.prototype.addNewState = function(stateId) {
    // <RemoveState:number>があれば、そのステートを設定
    var removeStateVal = $dataStates[stateId].meta.RemoveState;
    if (removeStateVal) {
        // ","区切りに対応
        var removeStates = removeStateVal.split(",");
        // 対象のステートＩＤを除去していく。
        removeStates.forEach(function(removeStateId) {
            this.removeState(Number(removeStateId));
        }, this);
    }
    
    // 元の処理
    _Game_BattlerBase_prototype_addNewState.apply(this, arguments);
};

var _Game_BattlerBase_canPaySkillCost = Game_BattlerBase.prototype.canPaySkillCost;
Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
    // ため技実行時
    if (isSkillCast(skill, this)) {
        // 消費タイミングがため開始時の場合
        var chargeCost = skill.meta.ChargeCost;
        if (chargeCost) {
            // コストは０として判定
            return true;
        }
    }

    // 元処理実行
    return _Game_BattlerBase_canPaySkillCost.call(this, skill);
};

/**
 * ●対象設定
 */
const _Game_Action_makeTargets = Game_Action.prototype.makeTargets;
Game_Action.prototype.makeTargets = function() {
    // ため技情報があれば、対象を再設定
    const chargeSkill = getChargeSkill(this.subject());
    if (chargeSkill) {
        this.setTarget(chargeSkill.targetIndex);
        let targets = [];

        // MVの場合
        if (Utils.RPGMAKER_NAME == "MV") {
            // 通常の混乱時の挙動は取らない。
            if (this.isForOpponent()) {
                targets = this.targetsForOpponents();
            } else if (this.isForFriend()) {
                targets = this.targetsForFriends();
            }
        // MZの場合
        } else {
            // 通常の混乱時の挙動は取らない。
            if (this.isForEveryone()) {
                targets.push(...this.targetsForEveryone());
            } else if (this.isForOpponent()) {
                targets.push(...this.targetsForOpponents());
            } else if (this.isForFriend()) {
                targets.push(...this.targetsForFriends());
            }
        }
        
        return this.repeatTargets(targets);
    }

    // 元処理実行
    return _Game_Action_makeTargets.call(this);
};

/**
 * 速度補正計算
 */
var _Game_Battler_makeSpeed = Game_Battler.prototype.makeSpeed;
Game_Battler.prototype.makeSpeed = function() {
    _Game_Battler_makeSpeed.call(this);

    // ため速度補正率が取得できれば計算
    var chargeSpeedRate = getChargeSpeedRate(this.currentAction());
    // ただし、即時発動時は除外する。
    if (chargeSpeedRate && !isNoCharge(this.currentAction(), chargeSpeedRate)) {
        this._speed *= chargeSpeedRate / 100;
    }
};

/**
 * ●即時発動かどうか？
 */
function isNoCharge(action, chargeSpeedRate) {
    // eval参照用
    var item = action.item();
    var a = action.subject();
    var chargeSpeed = eval(chargeSpeedRate - 100)

    // 即時発動条件を満たしているなら、以降処理せず実行
    var ifNoCharge = item.meta.IfNoCharge;
    if (ifNoCharge && eval(ifNoCharge)) {
        return true;
    }
    return false;
}

/**
 * ●ため速度率を計算
 */
function getChargeSpeedRate(action) {
    // 無効なスキルおよび即時発動なら終了
    if (!action || !action.item()) {
        return undefined;
    }

    var item = action.item();
    var a = action.subject();

    var chargeStateId = item.meta.ChargeState;
    let chargeSpeed;

    // ため速度が計算済
    if (action._chargeSpeedRate) {
        return action._chargeSpeedRate;

    // ため技に該当
    } else if (chargeStateId) {
        chargeStateId = eval(chargeStateId);

        // 既にため状態ならば処理しない
        if (a.isStateAffected(chargeStateId)) {
            return;
        }

        /*
         * ため技開始時
         * ※CTB用の行動予測計算処理も含む
         */
        // スキルの速度補正
        chargeSpeed = item.meta.ChargeSpeed;
        if (!chargeSpeed) {
            chargeSpeed = "0";
        }
        // 符号補正
        chargeSpeed = addStartPlus(chargeSpeed);
        var chargeSpeedRate = eval("100 " + chargeSpeed);

        // 装備による速度補正加算
        if (a.equips) {
            a.equips().forEach(function(equip) {
                let chargeSpeed = getItemChargeSpeed(equip, item.stypeId);
                if (chargeSpeed) {
                    // 符号補正
                    chargeSpeed = addStartPlus(chargeSpeed);
                    chargeSpeedRate = eval(chargeSpeedRate + " " + chargeSpeed);
                }
            });
        }

        // ステートによる速度補正加算
        a.states().forEach(function(state) {
            let chargeSpeed = getItemChargeSpeed(state, item.stypeId);
            if (chargeSpeed) {
                // 符号補正
                chargeSpeed = addStartPlus(chargeSpeed);
                chargeSpeedRate = eval(chargeSpeedRate + " " + chargeSpeed);
            }
        });

        return chargeSpeedRate;
    }
    
    // ため用ステートが見つからない場合は処理終了
    return undefined;
}

/**
 * ●item（装備およびステート）の溜め速度補正を加算
 */
function getItemChargeSpeed(item, stypeId) {
    if (!item) {
        return undefined;
    }

    let chargeSpeed = item.meta.ChargeSpeed;
    if (chargeSpeed) {
        let chargeSkillType = item.meta.ChargeSkillType;
        if (chargeSkillType) {
            // ","区切りに対応
            var chargeSkillTypes = chargeSkillType.split(",");
            // スキルタイプに一致があれば取得する。
            for (let i = 0; i < chargeSkillTypes.length; i++) {
                if (chargeSkillTypes[i] == stypeId) {
                    return chargeSpeed;
                }
            }
            // 一致がない場合は何も返さない
            return undefined;

        // スキルタイプの指定がない場合は常に取得
        } else {
            return chargeSpeed;
        }
    }
}

/**
 * ●式の先頭に符号がない場合、+を追加する。
 */
function addStartPlus(str) {
    if (!str.startsWith("+")
        && !str.startsWith("-")
        && !str.startsWith("*")
        && !str.startsWith("/")) {
            return "+ " + str;
    }
    return str;
}

/**
 * ●モーション設定
 */
var _Sprite_Actor_refreshMotion = Sprite_Actor.prototype.refreshMotion;
Sprite_Actor.prototype.refreshMotion = function() {
    var actor = this._actor;
    // アクション中は除外
    if (actor && !actor.isActing()) {
        // ステートによって、モーションの指定があれば呼び出す。
        for (let i = 0; i < actor.states().length; i++) {
            let state = actor.states()[i];
            let motionName = state.meta.StateMotion;
            if (motionName) {
                this.startMotion(motionName);
                return;
            }
        }
    }

    // 元処理実行
    _Sprite_Actor_refreshMotion.call(this);
};

/**
 * ●アクション名表示
 */
var _Window_BattleLog_displayAction = Window_BattleLog.prototype.displayAction;
Window_BattleLog.prototype.displayAction = function(subject, item) {
    // アクション名がなければ非表示
    if (!item.name) {
        return;
    }

    // 元処理実行
    _Window_BattleLog_displayAction.call(this, subject, item);
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
        this.push('wait');
        return;
    }
    
    // 元処理実行
    _Window_BattleLog_startAction.apply(this, arguments);
};

/**
 * ●アクション結果表示
 */
var _Window_BattleLog_displayActionResults = Window_BattleLog.prototype.displayActionResults;
Window_BattleLog.prototype.displayActionResults = function(subject, target) {
    if (BattleManager._action) {
        var item = BattleManager._action.item();
        // スキルメモ欄に<NoResult>が設定されているなら結果演出を省略
        if (item.meta.NoResult) {
            return;
        }
    }
    // 元処理実行
    _Window_BattleLog_displayActionResults.apply(this, arguments);
};

})();
