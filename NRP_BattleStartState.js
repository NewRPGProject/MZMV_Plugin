//=============================================================================
// NRP_BattleStartState.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Adds state at the start of battle.
 * @author Takeshi Sunagawa (https://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/500375292.html
 *
 * @help Adds state at the start of battle.
 * It can be implemented as a trait of a class, equipment, enemy, etc.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Specify the following in the notes for
 * actor, class, enemy, skill, equipment, and state.
 * For skills, these are passive skills
 * that function only by being learned.
 * 
 * <BattleStartState:99>
 * A state with the specified ID is added at the start of battle.
 * 
 * <BattleStartState:1 + Math.randomInt(10)>
 * Formulas can also be used.
 * The above adds 1 to 10 states at random.
 * Math.randomInt(10) means 0-9.
 * 
 * <BattleStartState:1,2>
 * Multiple designations are also possible.
 * 
 * <BattleStartStateRate:50>
 * You can specify the probability of adding a state.
 * If omitted, the probability is 100%.
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
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 戦闘開始時にステートを付加する。
 * @author 砂川赳（https://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/500375292.html
 *
 * @help 戦闘開始時にステートを付加します。
 * 職業や装備、敵キャラなどの特徴として設定できます。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * アクター、職業、敵キャラ、スキル、装備、ステートのメモ欄に
 * 以下を指定してください。
 * スキルについては、習得しているだけで機能するパッシブスキルとなります。
 * 
 * <BattleStartState:99>
 * 戦闘開始時に指定したＩＤのステートが付加されます。
 * 
 * <BattleStartState:1 + Math.randomInt(10)>
 * 数式も使用できます。
 * 上記はランダムで１～１０のステートを付加します。
 * Math.randomInt(10)は０～９の意味です。
 * 
 * <BattleStartState:1,2>
 * 複数指定も可能です。
 * 
 * <BattleStartStateRate:50>
 * ステートを付加する確率を指定できます。
 * 省略時は１００％になります。
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
 */
(function() {
"use strict";

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

const PLUGIN_NAME = "NRP_BattleStartState";
const parameters = PluginManager.parameters(PLUGIN_NAME);

/**
 * ●引数を元に配列を取得する。
 */
function makeArray(values) {
    const results = [];
    if (!values) {
        return undefined;
    }

    // カンマ区切りでループ
    for (let value of values.split(",")) {
        // 空白除去
        value = value.trim();
        // 1~5というように範囲指定の場合
        // ※~が存在する。
        if (value.indexOf("~") >= 0) {
            const range = value.split("~");
            const rangeStart = eval(range[0]);
            const rangeEnd = eval(range[1]);

            // 指定範囲で実行
            // 開始のほうが終了より大きい場合は反対に実行
            if (rangeEnd < rangeStart) {
                for (let i = rangeStart; i >= rangeEnd; i--) {
                    results.push(i);
                }
            } else {
                for (let i = rangeStart; i <= rangeEnd; i++) {
                    results.push(i);
                }
            }
            
        // 通常時
        } else {
            results.push(value);
        }
    }
    return results;
}

//-----------------------------------------------------------------------------
// Game_Battler
//-----------------------------------------------------------------------------

/**
 * ●戦闘開始
 */
const _Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
Game_Battler.prototype.onBattleStart = function(advantageous) {
    // eval用
    const a = this;

    // メモ欄を参照するオブジェクト
    let objects = this.traitObjects();
    // スキルが有効な場合は追加（アクターを想定）
    if (this.skills) {
        objects = objects.concat(this.skills());
    }

    // オブジェクト毎にループ
    for (const object of objects) {
        const battleStartState = object.meta.BattleStartState;
        if (!battleStartState) {
            continue;
        }

        // 確率の指定がある場合は確率計算
        const rate = object.meta.BattleStartStateRate;
        // Math.randomInt(100)は0~99のランダム値
        if (rate && rate <= Math.randomInt(100)) {
            // 不発
            continue;
        }

        // ステートの指定がある場合は配列変換
        const battleStartStatesArray = makeArray(battleStartState);
        // ステートの指定がある場合は追加
        for (const stateId of battleStartStatesArray) {
            this.addState(eval(stateId));
        }
    }

    _Game_Battler_onBattleStart.apply(this, arguments);
};

})();
