//=============================================================================
// NRP_HealAssist.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.001 Assist in target selection of recovery skills.
 * @author Takeshi Sunagawa (https://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/506049329.html
 *
 * @help When selecting recovery skills (items), the cursor
 * should automatically align with the most appropriate target.
 * 
 * - If recovery skill, select the actor with the lowest HP (%).
 * - If revive skill, select the dead actor.
 * - If remove state/debuff skill, select the appropriate actor.
 * 
 * In addition, the priority levels are as follows
 * 
 * Revive > HP recovery > MP recovery > State & Debuff Remove
 * 
 * For example, if a skill can recover HP and poison at the same time,
 * select the actor with the least amount of HP,
 * not the actor who is poisoned.
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
 * @param ApplyHpHeal
 * @type boolean
 * @default true
 * @desc Apply assist function to HP recovery skills.
 * 
 * @param ApplyMpHeal
 * @type boolean
 * @default true
 * @desc Apply assist function to MP recovery skills.
 * 
 * @param ApplyRevive
 * @type boolean
 * @default true
 * @desc Apply assist function to revive skills.
 * 
 * @param ApplyRemoveState
 * @type boolean
 * @default true
 * @desc Apply assist function to remove state (or debuff) skills.
 * 
 * @param ApplyBattle
 * @type boolean
 * @default true
 * @desc Apply the assist function on the battle scene.
 * 
 * @param ApplyMenu
 * @type boolean
 * @default true
 * @desc Apply the assist function on the menu scene.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.001 回復スキルの対象選択をアシストします。
 * @author 砂川赳（https://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/506049329.html
 *
 * @help 回復系スキル（アイテム）の選択時、
 * 自動的に最適な対象にカーソルが合わさるようにします。
 * 
 * ・回復スキルは最もＨＰ（％）が減っている対象を選択
 * ・蘇生スキルは戦闘不能者を選択
 * ・ステート＆弱体の解除スキルは該当の対象を選択
 * 
 * なお、優先度は以下のようになっています。
 * 
 * 蘇生＞ＨＰ回復＞ＭＰ回復＞ステート＆弱体解除
 * 
 * 例えば、ＨＰと毒を同時に回復できるスキルならば、
 * 毒ステートにかかっている対象ではなく、
 * 最もＨＰが減っている対象を優先して選択します。
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
 * @param ApplyHpHeal
 * @text ＨＰ回復に適用
 * @type boolean
 * @default true
 * @desc ＨＰ回復スキルにアシスト機能を適用します。
 * 
 * @param ApplyMpHeal
 * @text ＭＰ回復に適用
 * @type boolean
 * @default true
 * @desc ＭＰ回復スキルにアシスト機能を適用します。
 * 
 * @param ApplyRevive
 * @text 蘇生に適用
 * @type boolean
 * @default true
 * @desc 蘇生スキルにアシスト機能を適用します。
 * 
 * @param ApplyRemoveState
 * @text ステート解除に適用
 * @type boolean
 * @default true
 * @desc ステート（弱体）解除スキルにアシスト機能を適用します。
 * 
 * @param ApplyBattle
 * @text 戦闘画面に適用
 * @type boolean
 * @default true
 * @desc 戦闘画面にてアシスト機能を適用します。
 * 
 * @param ApplyMenu
 * @text メニュー画面に適用
 * @type boolean
 * @default true
 * @desc メニュー画面にてアシスト機能を適用します。
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

const PLUGIN_NAME = "NRP_HealAssist";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pApplyHpHeal = toBoolean(parameters["ApplyHpHeal"], true);
const pApplyMpHeal = toBoolean(parameters["ApplyMpHeal"], true);
const pApplyRevive = toBoolean(parameters["ApplyRevive"], true);
const pApplyRemoveState = toBoolean(parameters["ApplyRemoveState"], true);
const pApplyBattle = toBoolean(parameters["ApplyBattle"], true);
const pApplyMenu = toBoolean(parameters["ApplyMenu"], true);

//-----------------------------------------------------------------------------
// Scene_Battle
//-----------------------------------------------------------------------------

/**
 * ●アクターの選択開始
 */
const _Scene_Battle_startActorSelection = Scene_Battle.prototype.startActorSelection;
Scene_Battle.prototype.startActorSelection = function() {
    _Scene_Battle_startActorSelection.apply(this, arguments);

    // 戦闘時に適用しない場合
    if (!pApplyBattle) {
        return;
    }

    // スキルデータを取得
    const action = BattleManager.inputtingAction();
    // 対象をアシスト選択
    setAssistTarget(action, this._actorWindow);
};

//-----------------------------------------------------------------------------
// Window_MenuActor
//-----------------------------------------------------------------------------

const _Window_MenuActor_selectForItem = Window_MenuActor.prototype.selectForItem;
Window_MenuActor.prototype.selectForItem = function(item) {
    _Window_MenuActor_selectForItem.apply(this, arguments);

    // メニュー時に適用しない場合
    if (!pApplyMenu) {
        return;
    }

    // スキルデータを取得
    const actor = $gameParty.menuActor();
    const action = new Game_Action(actor);
    action.setItemObject(item);

    // 対象をアシスト選択
    setAssistTarget(action, this);
};

//-----------------------------------------------------------------------------
// 共通関数
//-----------------------------------------------------------------------------

function setAssistTarget(action, win) {
    // 単体かつ仲間が対象以外は処理しない。
    if (action.isForUser() || !action.isForOne() || !action.isForFriend()) {
        return;
    }

    // 蘇生の場合
    if (pApplyRevive && action.isForDeadFriend()) {
        // 先頭の戦闘不能者を取得し、存在すれば選択
        const member = $gameParty.deadMembers()[0];
        if (member) {
            win.select(member.index());
            return;
        }
    }

    // ＨＰ回復の場合
    if (pApplyHpHeal && isHpRecover(action)) {
        // 最もＨＰ％の低い生存メンバーを取得
        const member = getHpRecoverTarget();
        if (member) {
            win.select(member.index());
            return;
        }
    }

    // ＭＰ回復の場合
    if (pApplyMpHeal && isMpRecover(action)) {
        // 最もＭＰ％の低い生存メンバーを取得
        const member = getMpRecoverTarget();
        if (member) {
            win.select(member.index());
            return;
        }
    }

    // ステート（弱体）解除の場合
    if (pApplyRemoveState && isRemoveState(action)) {
        // 該当のステートまたは弱体状態のメンバーを取得
        const member = getRemoveStateTarget(action);
        if (member) {
            win.select(member.index());
            return;
        }
    }
}

/**
 * ●ＨＰ回復の場合
 */
function isHpRecover(action) {
    if (action.isHpRecover()) {
        return true;
    }
    // 使用効果によるＨＰ回復の場合
    return action.item().effects.some(effect => effect.code == Game_Action.EFFECT_RECOVER_HP);
}

/**
 * ●ＨＰ回復対象を取得
 */
function getHpRecoverTarget() {
    // 対象の中で、ＨＰの割合が最も低い者
    const member = $gameParty.aliveMembers().reduce(function(a, b) {
        return a.hpRate() <= b.hpRate() ? a : b;
    });

    // ＨＰが減っている場合のみ返す
    if (member.hpRate() < 1) {
        return member;
    }
    // 全快の場合は対象外
    return null;
}

/**
 * ●ＭＰ回復の場合
 */
function isMpRecover(action) {
    if (action.isMpRecover()) {
        return true;
    }
    // 使用効果によるＭＰ回復の場合
    return action.item().effects.some(effect => effect.code == Game_Action.EFFECT_RECOVER_MP);
}

/**
 * ●ＭＰ回復対象を取得
 */
function getMpRecoverTarget() {
    // 最大ＭＰが１以上のアクターを取得
    const mpMembers = $gameParty.aliveMembers().filter(m => m.mmp > 0);
    if (mpMembers.length > 0) {
        // 対象の中で、ＭＰの割合が最も低い者
        const member = mpMembers.reduce(function(a, b) {
            return a.mpRate() <= b.mpRate() ? a : b;
        });

        // ＭＰが減っている場合のみ返す
        if (member.mpRate() < 1) {
            return member;
        }
    }

    // 全快の場合は対象外
    return null;
}

/**
 * ●ステート（弱体）解除の場合
 */
function isRemoveState(action) {
    // ステート解除または弱体解除の場合
    return action.item().effects.some(effect =>
            effect.code == Game_Action.EFFECT_REMOVE_STATE
            || effect.code == Game_Action.EFFECT_REMOVE_DEBUFF
        );
}

/**
 * ●ステート（弱体）解除対象を取得
 */
function getRemoveStateTarget(action) {
    // 使用効果毎にループ
    for (const effect of action.item().effects) {
        // ステート解除の場合
        if (effect.code == Game_Action.EFFECT_REMOVE_STATE) {
            // 該当ステートのメンバーがいれば返す
            const member = $gameParty.aliveMembers().find(m => m.isStateAffected(effect.dataId));
            if (member) {
                return member;
            }

        // 弱体解除の場合
        } else if (effect.code == Game_Action.EFFECT_REMOVE_DEBUFF) {
            // 該当弱体のメンバーがいれば返す
            const member = $gameParty.aliveMembers().find(m => m.isDebuffAffected(effect.dataId));
            if (member) {
                return member;
            }
        }
    }
    // それ以外
    return null;
}

})();
