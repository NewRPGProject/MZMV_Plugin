//=============================================================================
// NRP_ForgetLowerSkill.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Forget lower level skills when learning higher level skills.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @orderAfter NRP_AdditionalClasses
 * @url http://newrpg.seesaa.net/article/483693029.html
 *
 * @help Forget lower level skills when learning higher level skills.
 * Also, the message when learning a skill will be changed.
 * This will make it act like a skill that ranks up.
 * 
 * ------------------------------------------
 * ■Usage
 * ------------------------------------------
 * In the note field of the skill to be treated
 * as a higher-level skill, specify the following.
 * Delete the skill with the ID specified in the ?. 
 * 
 * <ForgetSkill:?>
 * 
 * Also, the message at the time of learning will be changed.
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 * 
 * @param RankUpMessage
 * @type string
 * @default %1 has been enhanced to %2!
 * @desc This is the message when you rank up a skill.
 * %1 is the skill you forget, %2 is the skill you learn.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 上位スキル習得時に下位スキルを消去。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @orderAfter NRP_AdditionalClasses
 * @url http://newrpg.seesaa.net/article/483693029.html
 *
 * @help 上位スキル習得時に下位スキルを消去します。
 * また、スキル習得時のメッセージを変更します。
 * これにより、ランクアップするスキルのような演出を行います。
 * 
 * ------------------------------------------
 * ■使用方法
 * ------------------------------------------
 * 上位スキルとして扱うスキルのメモ欄に、以下を指定してください。
 * ?に指定したＩＤのスキルを削除します。
 * 
 * <ForgetSkill:?>
 * 
 * また、習得時のメッセージも変更されます。
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param RankUpMessage
 * @text ランクアップ文章
 * @type string
 * @default %1が%2へと強化された！
 * @desc ランクアップ時のメッセージです。
 * %1が忘れるスキル、%2が覚えるスキルです。
 */
(function() {
"use strict";

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
function toNumber(str, def) {
    return isNaN(str) ? def : +(str || def);
}
function setDefault(str, def) {
    return str ? str : def;
}

const PLUGIN_NAME = "NRP_ForgetLowerSkill";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pRankUpMessage = parameters["RankUpMessage"];

// スキルの配列
let mlastSkills = [];

/**
 * ●経験値の増減
 */
const _Game_Actor_changeExp = Game_Actor.prototype.changeExp;
Game_Actor.prototype.changeExp = function(exp, show) {
    mlastSkills = this.skills();
    _Game_Actor_changeExp.apply(this, arguments);
};

/**
 * ●スキルの習得
 */
const _Game_Actor_learnSkill = Game_Actor.prototype.learnSkill;
Game_Actor.prototype.learnSkill = function(skillId) {
    // 忘却指定のあるスキルを取得
    const forgetSkillId = toNumber($dataSkills[skillId].meta.ForgetSkill);
    // 既に習得済みのスキルの場合、忘却処理を行う。
    if (forgetSkillId && this.isLearnedSkill(forgetSkillId)) {
        this.forgetSkill(forgetSkillId);
    }

    _Game_Actor_learnSkill.apply(this, arguments);
};

/**
 * ●レベルアップの表示
 */
const _Game_Actor_displayLevelUp = Game_Actor.prototype.displayLevelUp;
Game_Actor.prototype.displayLevelUp = function(newSkills) {
    // メッセージが存在しない場合は元のまま
    if (!pRankUpMessage) {
        _Game_Actor_displayLevelUp.apply(this, arguments);
        return;
    }

    // 一旦、newSkillsを空にしてメッセージを作成
    _Game_Actor_displayLevelUp.call(this, []);

    // スキル習得メッセージの表示
    displayObtainSkills(this, newSkills);
};

/**
 * ●忘却したスキルＩＤの配列を取得する。
 */
function findForgotSkillIds(actor, lastSkills) {
    // 元の配列を壊さないようディープコピー
    // const forgetSkills = [...lastSkills];
    // 以前のスキルの配列から、新しいスキルの配列を除去する。
    const newSkills = actor.skills();
    for (const newSkill of newSkills) {
        lastSkills.remove(newSkill);
    }
    return lastSkills.map(skill => skill.id);
};

/**
 * ●スキル習得メッセージの表示
 */
function displayObtainSkills(actor, newSkills) {
    // 新スキルの習得メッセージを再作成
    const forgetSkillIds = findForgotSkillIds(actor, mlastSkills);
    for (const skill of newSkills) {
        // 忘却指定のあるスキルを取得
        const forgetSkillId = toNumber(skill.meta.ForgetSkill);
        // 忘れたスキルが一致した場合、ランクアップメッセージを表示
        if (forgetSkillId && forgetSkillIds.includes(forgetSkillId)) {
            $gameMessage.add(pRankUpMessage.format($dataSkills[forgetSkillId].name, skill.name));
            continue;
        }

        $gameMessage.add(TextManager.obtainSkill.format(skill.name));
    }
}

//----------------------------------------
// 多重職業プラグインへも対応
//----------------------------------------

/**
 * NRP_AdditionalClasses.jsが登録されている場合
 */
const hasAdditionalClasses = PluginManager._scripts.some(function(scriptName) {
    return scriptName == "NRP_AdditionalClasses";
});

if (hasAdditionalClasses) {
    /**
     * ●経験値の増減
     */
    const _AdditionalClass_changeExp = AdditionalClass.prototype.changeExp;
    AdditionalClass.prototype.changeExp = function(exp, show) {
        mlastSkills = this.actor().skills();
        _AdditionalClass_changeExp.apply(this, arguments);
    };

    /**
     * ●レベルアップメッセージの表示
     */
    const _AdditionalClass_displayLevelUp = AdditionalClass.prototype.displayLevelUp;
    AdditionalClass.prototype.displayLevelUp = function(newSkills) {
        // メッセージが存在しない場合は元のまま
        if (!pRankUpMessage) {
            _AdditionalClass_displayLevelUp.apply(this, arguments);
            return;
        }

        // 一旦、newSkillsを空にしてメッセージを作成
        _AdditionalClass_displayLevelUp.call(this, []);

        // スキル習得メッセージの表示
        displayObtainSkills(this.actor(), newSkills);
    };
}

/**
 * 【ＭＶ対応】ＭＺにしか存在しない関数なので追加
 */
if (!Array.prototype.remove) {
    Array.prototype.remove = function(element) {
        for (;;) {
            const index = this.indexOf(element);
            if (index >= 0) {
                this.splice(index, 1);
            } else {
                return this;
            }
        }
    };
}

})();
