//=============================================================================
// NRP_ExpCurve.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.00 Set up a formula for the EXP Curve.
 * @author Takeshi Sunagawa (https://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/498685311.html
 *
 * @help Set up a formula for the EXP Curve.
 * 
 * RPG Maker MZ and MV allow you to adjust the EXP curve
 * for occupations, but do not give you fine control.
 * 
 * This plugin allows the creator to achieve the desired balance
 * by freely setting the formulas.
 * 
 * Note that the standard is "the EXP required
 * for the specified level".
 * The standard cannot be set to
 * "EXP required for the next level".
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Enter the following in the note field of the class.
 * 
 * <ExpForLevel:[Formula]>
 * 
 * For example, the following.
 * 
 * <ExpForLevel:5*level**3>
 * 
 * This means that the cumulative EXP required
 * for a given level is "5 x the cube of the level.
 * 
 * I think it is difficult to get an image even
 * if you try to think of a formula out of the blue,
 * so I recommend that you actually try it out
 * in a spreadsheet software such as EXCEL.
 * 
 * Note that in EXCEL formulas, the cube of 2 is written as 2^3,
 * but in Maker (JavaScript) formulas, it is written as 2**3.
 * Basically, it would be nice to create a formula
 * using powers of magnitude.
 * 
 * If you do not mind having the same default value for all classes,
 * you can also specify a default value in a plugin parameter.
 * 
 * -------------------------------------------------------------------
 * [Sample]
 * -------------------------------------------------------------------
 * <ExpForLevel:5*level**3>
 * This is the formula also introduced above.
 * It is a fairly simple formula,
 * but it gives an EXP curve that looks like it.
 * 
 * <ExpForLevel:0.2*level**4 + 15*level - 15>
 * Formula using quadrature.
 * This gives a Dragon Quest-like EXP curve.
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
 * @param DefaultExpForLevel
 * @type string
 * @desc This is the default value of EXP required for the level.
 * 例：5*level**3
 */

/*:ja
 * @target MZ MV
 * @plugindesc v1.00 経験値曲線の数式を設定します。
 * @author 砂川赳（https://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/498685311.html
 *
 * @help 経験値曲線の数式を設定します。
 * 
 * ＲＰＧツクールＭＺおよびＭＶでは、職業の経験値曲線を調整できますが、
 * 細かい制御はできません。
 * 
 * 特に高レベル帯の曲線の上昇がゆるやかなのが悩みのタネです。
 * 最も急な設定にしたとしても、
 * 
 * ・レベル30 -> 31の必要経験値が30612
 * ・レベル40 -> 41の必要経験値が51736
 * ・変化倍率は約1.69倍
 * 
 * ……が精一杯です。
 * ドラクエシリーズならこの期間で３～４倍に変化することを考えると、
 * かなりゆるやかなのが分かると思います。
 * 
 * そのため、レベルの上昇速度を一定に保とうとすると、
 * 長編の後半では
 * 「強敵と戦うよりも弱い敵をたくさん倒したほうが楽」
 * 「強敵を倒しても経験値が低く達成感がない」
 * なんて状況になってしまいがちです。
 * 
 * このプラグインでは自由に数式を設定することで、
 * 製作者の望むバランスを実現できます。
 * 
 * なお、基準とするのは「指定のレベルに必要な経験値」です。
 * 「次のレベルに必要な経験値」を基準に設定することはできません。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * 職業のメモ欄に以下のように記入してください。
 * 
 * <ExpForLevel:[数式]>
 * 
 * 例えば、以下のようになります。
 * 
 * <ExpForLevel:5*level**3>
 * 
 * これはあるレベルに必要な累計経験値が「5 × レベルの3乗」
 * であることを意味しています。
 * 
 * いきなり数式を考えようにもイメージが湧きにくいと思うので、
 * EXCELなどの表計算ソフトで実際に試してみることをオススメします。
 * 
 * なお、EXCELの数式では2の3乗は2^3と表記しますが、
 * ツクール（JavaScript）の数式では2**3という表記になります。
 * 基本的には累乗を使った数式を作るといい感じになると思います。
 * 
 * 全ての職業で共通で構わないという場合は、
 * プラグインパラメータで既定値を指定することもできます。
 * 
 * -------------------------------------------------------------------
 * ■サンプル
 * -------------------------------------------------------------------
 * <ExpForLevel:5*level**3>
 * 上記でも紹介した数式です。
 * かなりシンプルな式ですが、それっぽい経験値曲線になります。
 * 
 * <ExpForLevel:0.2*level**4 + 15*level - 15>
 * 4乗を使った数式です。
 * ドラクエっぽい経験値曲線になります。
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
 * @param DefaultExpForLevel
 * @text 必要経験値（既定）
 * @type string
 * @desc レベルに必要な経験値の既定値です。
 * 例：5*level**3
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

const PLUGIN_NAME = "NRP_ExpCurve";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pDefaultExpForLevel = setDefault(parameters["DefaultExpForLevel"]);

//-----------------------------------------------------------------------------
// Game_Actor
//-----------------------------------------------------------------------------

/**
 * ●指定レベルに必要な累計経験値を求める。
 */
const _Game_Actor_expForLevel = Game_Actor.prototype.expForLevel;
Game_Actor.prototype.expForLevel = function(level) {
    const c = this.currentClass();

    // eval計算用
    const basis = c.expParams[0];
    const extra = c.expParams[1];
    const acc_a = c.expParams[2];
    const acc_b = c.expParams[3];

    const expForLevel = c.meta.ExpForLevel;
    // 職業毎の設定値
    if (expForLevel) {
        return Math.round(eval(expForLevel));
    // 既定値
    } else if (pDefaultExpForLevel) {
        return Math.round(eval(pDefaultExpForLevel));
    }

    return _Game_Actor_expForLevel.apply(this, arguments);
};

})();
