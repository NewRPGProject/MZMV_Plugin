//=============================================================================
// NRP_DeadSkill.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Activate the skill at dead time.
 * @orderAfter NRP_TraitsPlus
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/488957733.html
 *
 * @help Activate the skill at dead time.
 * It can be used for final attack on dead or automatic resuscitation.
 * 
 * For each object (actor, enemy, class, equipment, state, skill),
 * you can set traits that trigger skills when dead.
 * For skills, they are passive skills
 * that only need to be learned to be effective.
 * 
 * -------------------------------------------------------------------
 * [Note (actor, enemy, class, equipment, state, skill)]
 * -------------------------------------------------------------------
 * Specify the following in the note of the object.
 * 
 * <DeadSkill:100>
 * When dead, the 100th skill is activated.
 * If the scope is single, the target is the attacker.
 * 
 * -------------------------------------------------------------------
 * [Note (skill, item)]
 * -------------------------------------------------------------------
 * ◆Targeting Dead
 * <TargetDead>
 * Skills will now hit dead targets.
 * ※Required if you want to do automatic resuscitation
 * by setting the scope to yourself
 * Without it, the skill will not hit.
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
 * @param SkillBeforeCollapse
 * @type boolean
 * @default true
 * @desc The skill at dead is activated before the dead direction.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 戦闘不能時にスキルを発動します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/488957733.html
 *
 * @help 戦闘不能時にスキルを発動します。
 * 死に際のファイナルアタックや自動蘇生（リレイズ）などに使えます。
 * 
 * 各オブジェクト（アクター、エネミー、職業、装備、ステート、スキル）
 * に対して、戦闘不能時にスキルを発動する特徴を設定できます。
 * スキルについては覚えているだけで、発揮するパッシブスキルとなります。
 * 
 * -------------------------------------------------------------------
 * ■オブジェクトのメモ欄
 * -------------------------------------------------------------------
 * オブジェクトのメモ欄に以下を指定してください。
 * 
 * <DeadSkill:100>
 * 戦闘不能時に１００番のスキルを発動します。
 * 範囲が単体の場合、対象は攻撃してきた相手になります。
 * 
 * -------------------------------------------------------------------
 * ■スキル／アイテムのメモ欄
 * -------------------------------------------------------------------
 * ◆戦闘不能者を対象化
 * <TargetDead>
 * 戦闘不能者を対象として、スキルが命中するようになります。
 * ※範囲を自身にして、自動蘇生をやりたい場合は必須です。
 * 　これがないとスキルが命中しません。
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
 * @param SkillBeforeCollapse
 * @text 死亡スキルを先に発動
 * @type boolean
 * @default true
 * @desc 戦闘不能時のスキルを戦闘不能演出より前に発動します。
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

const PLUGIN_NAME = "NRP_DeadSkill";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pSkillBeforeCollapse = toBoolean(parameters["SkillBeforeCollapse"]);

// ----------------------------------------------------------------------------
// 戦闘不能時にスキル発動
// ----------------------------------------------------------------------------

// 戦闘不能スキルリスト
let mDeadSkillList = [];
// 戦闘不能スキルユーザリスト
let mDeadSkillUserList = [];
// 元の行動主体
let mOriginalSubject = null;

// ----------------------------------------------------------------------------
// Window_BattleLog
// ----------------------------------------------------------------------------

/**
 * ●ステートの追加を表示
 */
const _Window_BattleLog_displayAddedStates = Window_BattleLog.prototype.displayAddedStates;
Window_BattleLog.prototype.displayAddedStates = function(target) {
    if (pSkillBeforeCollapse) {
        const result = target.result();
        const states = result.addedStateObjects();

        // 戦闘不能に該当した場合
        if (states.some(state => state.id === target.deathStateId())) {
            // 戦闘不能スキルを登録
            target.resistDeadSkill();
            // 戦闘不能スキルの実行者なら終了し、死亡演出を実行しない。
            if (mDeadSkillUserList.includes(target)) {
                return;
            }
        }
    }

    _Window_BattleLog_displayAddedStates.apply(this, arguments);
};

// ----------------------------------------------------------------------------
// BattleManager
// ----------------------------------------------------------------------------

/**
 * ●ターン開始
 */
const _BattleManager_startTurn = BattleManager.startTurn;
BattleManager.startTurn = function() {
    // 変数初期化
    mDeadSkillList = [];
    mDeadSkillUserList = [];
    _BattleManager_startTurn.apply(this, arguments);
};

/**
 * ●アクション終了
 */
const _BattleManager_endAction = BattleManager.endAction;
BattleManager.endAction = function() {
    // 戦闘不能スキルリストに登録がある場合
    if (mDeadSkillList.length > 0) {
        // データを取り出し
        const skillData = mDeadSkillList.shift();
        // 戦闘行動の強制を実行
        goDeadSkill(skillData.subject, skillData.skillId);
        return;
    }

    // 行動主体が変更されている場合は元に戻す。
    if (mOriginalSubject) {
        BattleManager._subject = mOriginalSubject;
        mOriginalSubject = null;
    }

    // 戦闘不能スキル使用者が存在する場合
    if (pSkillBeforeCollapse) {
        for (const battler of mDeadSkillUserList) {
            // スキルの効果で復活した場合は処理終了。
            if (battler.isAlive()) {
                continue;
            }

            // 改めて死亡処理を実行
            const state = $dataStates[battler.deathStateId()];
            const stateText = battler.isActor() ? state.message1 : state.message2;
            this._logWindow.push("performCollapse", battler);
            if (stateText) {
                this._logWindow.push("popBaseLine");
                this._logWindow.push("pushBaseLine");
                this._logWindow.push("addText", stateText.format(battler.name()));
                this._logWindow.push("waitForEffect");
            }
        }
    }

    // リストをクリア
    mDeadSkillUserList = [];

    _BattleManager_endAction.apply(this, arguments);
};

/**
 * ●戦闘不能時のスキルを実行
 */
function goDeadSkill(subject, skillId) {
    // 元の行動主体を保持
    mOriginalSubject = BattleManager._subject;
    // 戦闘不能スキルの対象を取得
    // （行動主体が取得できればそのインデックス、それ以外はランダム）
    const targetIndex = mOriginalSubject ? mOriginalSubject.index() : -1;

    // 戦闘行動の強制を実行
    subject.deadSkillForceAction(skillId, targetIndex);
    BattleManager.forceAction(subject);
    BattleManager.processForcedAction();

    // 【ＭＶ】強制実行フラグを解除
    // ※強制フラグが立っていると、ステートのターン経過が行われないため。
    if (BattleManager.isForcedTurn && BattleManager.isForcedTurn()) {
        BattleManager._turnForced = false;
    }
    
    return true;
}

// ----------------------------------------------------------------------------
// Game_BattlerBase
// ----------------------------------------------------------------------------

// 戦闘不能判定フラグ
let mDeadFlg = false;

/**
 * ●戦闘不能
 */
const _Game_BattlerBase_die = Game_BattlerBase.prototype.die;
Game_BattlerBase.prototype.die = function() {
    mDeadFlg = true;
    _Game_BattlerBase_die.apply(this, arguments);
    mDeadFlg = false;
};

/**
 * ●ステートの初期化
 */
const _Game_BattlerBase_clearStates = Game_BattlerBase.prototype.clearStates;
Game_BattlerBase.prototype.clearStates = function() {
    // 戦闘不能の場合
    // ※ステートは戦闘不能によって消えてしまうため、消える前にここで処理する。
    if (mDeadFlg) {
        for (let i = 0; i < this._states.length; i++) {
            const stateId = this._states[i];
            // 戦闘不能で発動するステートがあれば追加
            const deadSkill = $dataStates[stateId].meta.DeadSkill
            if (deadSkill) {
                if (deadSkill != null) {
                    const a = this;
                    const skillId = eval(deadSkill);
                    resistDeadSkill(this, skillId);
                }
            }
        }
    }

    _Game_BattlerBase_clearStates.apply(this, arguments);
};

// ----------------------------------------------------------------------------
// Game_Battler
// ----------------------------------------------------------------------------

/**
 * 【独自】戦闘不能時のスキルを実行する。
 */
Game_Battler.prototype.deadSkillForceAction = function(skillId, targetIndex) {
    const action = new Game_Action(this, true);
    action.setSkill(skillId);
    if (targetIndex === -2) {
        action.setTarget(this._lastTargetIndex);
    } else if (targetIndex === -1) {
        action.decideRandomTarget();
    } else {
        action.setTarget(targetIndex);
    }

    // スキルを次のアクションとして実行するため、
    // push（末尾）ではなくunshift（先頭）で追加
    this._actions.unshift(action);

    // ログウィンドウをクリア
    BattleManager._logWindow.clear();

    // アクター位置の自動設定を禁止解除（DynamicMotion）
    BattleManager._noUpdateTargetPosition = false;
};

/**
 * 【独自】戦闘不能スキルを登録
 */
Game_Battler.prototype.resistDeadSkill = function() {
    // そのターン内に一度実行した行動主体なら終了
    // ※なぜか死亡処理が重複することがあるためその調整
    if (mDeadSkillUserList.includes(this)) {
        return;
    }

    for (const object of getTraitObjects(this)) {
        // 戦闘不能スキルがあれば発動
        const deadSkill = object.meta.DeadSkill;
        if (deadSkill != null) {
            const a = this;
            const skillId = eval(deadSkill);
            resistDeadSkill(this, skillId);
        }
    }
};

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
 * ●戦闘不能スキルリストへ登録する。
 */
function resistDeadSkill(subject, skillId) {
    // 既に登録済の場合は次へ
    const isResisted = mDeadSkillList.some(data => data.subject == subject && data.skillId == skillId);
    if (isResisted) {
        return;
    }

    // 行動主体を登録
    mDeadSkillUserList.push(subject);

    // 反撃データの構造体を作成
    const skillData = {};
    // 行動主体と対象を反転
    skillData.subject = subject;
    skillData.skillId = skillId;
    
    // 戦闘不能スキルリストに登録
    mDeadSkillList.push(skillData);
}

// ----------------------------------------------------------------------------
// Game_Action
// ----------------------------------------------------------------------------

/**
 * ●仲間（戦闘不能）が対象かどうか？
 */
const _Game_Action_isForDeadFriend = Game_Action.prototype.isForDeadFriend;
Game_Action.prototype.isForDeadFriend = function() {
    // 仲間が対象の場合
    // ※isForFriend()と同様の定義。
    // 　循環参照を避けるためメソッドは呼ばない。
    if (this.checkItemScope([7, 8, 9, 10, 11, 12, 13, 14])) {
        // かつ、戦闘不能者を対象化の場合
        const targetDead = this.item().meta.TargetDead;
        if (targetDead) {
            return true;
        }
    }
    return _Game_Action_isForDeadFriend.apply(this, arguments);
};

/**
 * ●生死判定
 */
const _Game_Action_testLifeAndDeath = Game_Action.prototype.testLifeAndDeath;
Game_Action.prototype.testLifeAndDeath = function(target) {
    // 戦闘不能者を対象化の場合
    const targetDead = this.item().meta.TargetDead;
    if (targetDead) {
        return true;
    }
    return _Game_Action_testLifeAndDeath.apply(this, arguments);
};

// ----------------------------------------------------------------------------
// Game_Unit
// ----------------------------------------------------------------------------

/**
 * ●全滅判定
 */
const _Game_Unit_isAllDead = Game_Unit.prototype.isAllDead;
Game_Unit.prototype.isAllDead = function() {
    // 戦闘不能スキル実行中は全滅判定をしない。
    if (mDeadSkillUserList.length > 0) {
        return false;
    }
    return _Game_Unit_isAllDead.apply(this, arguments);
};

})();
