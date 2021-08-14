//=============================================================================
// NRP_ElementEX.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Extended element resistance, absorption, etc.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/482915499.html
 *
 * @help When the plugin is applied,
 * the element resistance is changed to an additive method.
 * This makes it possible to achieve over 100% resistance,
 * which is normally impossible.
 * 
 * Points in excess of 100% are reversed positive and negative.
 * This means that you can achieve behaviors such as absorbing element attacks,
 * or undead taking damage from healing magic.
 * 
 * Element resistance is determined by the "Element Rate" set in the database traits.
 * If the Element Rate is 30%, it will be considered 70% resistant.
 * 
 *  * To set a resistance of exceeding 100%,
 * set the multi-line Element Rate to the traits.
 * 
 * eg. 0% Element Rate + 60% Element Rate would give 140% resistance.
 *     This means 40% absorption.
 * 
 * The traits you set are valid for Actor, Class, Enemy, and Equipment.
 * A combination of different items, such as "Actor and Equipment",
 * will work the same way if they exceed 100% by addition.
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 * 
 * @param ElementRateMax
 * @type number
 * @max 999 @decimals 2
 * @desc The maximum Element Rate. 1.0 equals 100%.
 * If -2.0, the maximum damage is double the normal value.
 * 
 * @param ElementRateMin
 * @type number
 * @min -999 @decimals 2
 * @desc The minimum Element Rate. 1.0 equals 100%.
 * If -2.0, then the minimum damage will be minus two times normal.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 属性耐性を拡張し、吸収などを実現
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/482915499.html
 *
 * @help プラグインを適用すると、属性耐性が加算方式に変更されます。
 * これにより通常は不可能な100%超の耐性を可能とします。
 * 
 * 100%を超過した分のポイントは正負が反転します。
 * つまり、属性攻撃を吸収したり、あるいはアンデッドが
 * 回復魔法を受けてダメージを受けるといった挙動を実現できます。
 * 
 * なお、属性耐性はデータベースの特徴に設定した『属性有効度』により決定されます。
 * 属性有効度が30%なら、70%の耐性とみなします。
 * 
 * 100%超の耐性を設定するには、
 * 複数行の属性有効度を特徴に設定してください。
 * 
 * 例：属性有効度0%＋属性有効度60%ならば、140%の耐性
 * 　　つまり40%の吸収となります。
 * 
 * 設定する特徴はアクター、職業、敵キャラ、装備などいずれも有効です。
 * 「アクターと装備」など異なる項目の組み合わせでも、
 * 加算によって100%を超えた場合は同じように機能します。
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param ElementRateMax
 * @text 属性有効度の最大値
 * @type number
 * @max 999 @decimals 2
 * @desc 属性有効度の最大値です。1.0が100%に相当します。
 * 2.0ならば、通常の二倍がダメージの最大値になります。
 * 
 * @param ElementRateMin
 * @text 属性有効度の最小値
 * @type number
 * @min -999 @decimals 2
 * @desc 属性有効度の最小値です。1.0が100%に相当します。
 * -2.0ならば、通常のマイナス二倍がダメージの最小値になります。
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

const PLUGIN_NAME = "NRP_ElementEX";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pElementRateMax = toNumber(parameters["ElementRateMax"]);
const pElementRateMin = toNumber(parameters["ElementRateMin"]);

/**
 * 【上書】対象の属性有効度
 */
Game_BattlerBase.prototype.elementRate = function(elementId) {
    // for (const traitObject of this.traitObjects()) {}

    // 指定属性の特徴を取得
    const traits = this.traitsWithId(Game_BattlerBase.TRAIT_ELEMENT_RATE, elementId);

    /**
     * 初期値1.0（100%）から耐性分だけ減算していく。
     * 例：属性有効度が30%なら、70%の耐性とみなす。
     * 　　演算結果は0.3となる。
     * 
     * また、複数の耐性を重複登録することで100%超の耐性（＝吸収）を獲得可
     * 例：属性有効度0%＋属性有効度60%ならば、140%の耐性
     * 　　演算結果は-0.4、つまり40%の吸収となる。
     */
    let rate = traits.reduce((r, trait) => r - (1 - trait.value), 1);

    // 最大値を越えた場合
    if (pElementRateMax !== undefined && rate > pElementRateMax) {
        rate = pElementRateMax;

    // 最小値を下回った場合
    } else if (pElementRateMin !== undefined && rate < pElementRateMin) {
        rate = pElementRateMin;
    }

    return rate;
};

})();
