//=============================================================================
// NRP_ForgetLowerSkill.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.02 Forget lower level skills when learning higher level skills.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @orderAfter NRP_AdditionalClasses
 * @url http://newrpg.seesaa.net/article/483693029.html
 *
 * @help Forget lower level skills when learning higher level skills.
 * Also, the message when learning a skill will be changed.
 * This will make it act like a skill that ranks up.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * In the note field of the skill to be treated
 * as a higher-level skill, specify the following.
 * When a skill is learned, the skill of the ID specified
 * in ? will be automatically deleted.
 * 
 * <ForgetSkill:?>
 * 
 * Also, the message at the time of learning will be changed.
 * 
 * -------------------------------------------------------------------
 * [Extra Feature]
 * -------------------------------------------------------------------
 * After applying this plugin, you will be able to use icons
 * in the skill acquisition text in the database terms.
 * %2 will be the icon number。
 * 
 * "%1 learns \i[%2]%2!"
 * 
 * Specify as above.
 * 
 * The same applies to rank-up messages.
 * "\i[%3]%1 has been enhanced to \i[%4]%2!"
 * Specify as above.
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
 * @param RankUpMessage
 * @type string
 * @default %1 has been enhanced to %2!
 * @desc This is the message when you rank up a skill. %1: Forget Skill, %2: Learn SKill, %3: Icon No(F), %3: Icon No(L)
 * 
 * @param AddDescription
 * @type boolean
 * @default false
 * @desc Add a description when obtaining a skill.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.02 上位スキル習得時に下位スキルを消去。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @orderAfter NRP_AdditionalClasses
 * @url http://newrpg.seesaa.net/article/483693029.html
 *
 * @help 上位スキル習得時に下位スキルを消去します。
 * また、スキル習得時のメッセージを変更することで、
 * ランクアップするスキルのような演出が可能です。
 * スキルの数を無闇に増やしたくない――なんて場合に便利です。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * 上位スキルとして扱うスキルのメモ欄に、以下を指定してください。
 * スキルの習得時、?に指定したＩＤのスキルを自動で削除します。
 * 
 * <ForgetSkill:?>
 * 
 * また、習得時のメッセージも変更されます。
 * 
 * -------------------------------------------------------------------
 * ■おまけ機能
 * -------------------------------------------------------------------
 * 当プラグインを適用すると、データベースの用語にある
 * スキル習得のテキストにアイコンを使用できるようになります。
 * %2がアイコン番号となります。
 * 
 * 「\i[%2]%1を覚えた！」
 * 
 * というように指定してください。
 * 
 * ランクアップメッセージについても同様です。
 * 「\i[%3]%1が\i[%4]%2へと強化された！」
 * というようになります。
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
 * @param RankUpMessage
 * @text ランクアップメッセージ
 * @type string
 * @default %1が%2へと強化された！
 * @desc ランクアップ時のメッセージです。%1:忘れるスキル, %2:覚えるスキル, %3:アイコンNo(忘), %4:アイコンNo(覚) 
 * 
 * @param AddDescription
 * @text 説明文を追加
 * @type boolean
 * @default false
 * @desc スキル習得時に説明文を追加します。
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
const pAddDescription = toBoolean(parameters["AddDescription"]);

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
            const forgetSkill = $dataSkills[forgetSkillId];
            // %1:忘れるスキル, %2:覚えるスキル, %3:忘れるスキルのアイコン番号, %4:覚えるスキルのアイコン番号
            $gameMessage.add(pRankUpMessage.format(forgetSkill.name, skill.name, forgetSkill.iconIndex ,skill.iconIndex));
            continue;
        }

        // 通常のメッセージ（おまけ機能で%2にアイコン番号を追加）
        $gameMessage.add(TextManager.obtainSkill.format(skill.name, skill.iconIndex));
        // 説明追加
        if (pAddDescription) {
            $gameMessage.add(skill.description);
        }
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
