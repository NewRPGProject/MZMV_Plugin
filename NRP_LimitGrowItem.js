//=============================================================================
// NRP_LimitGrowItem.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.01 Set limits on grow items.
 * @author Takeshi Sunagawa (https://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/498340928.html
 *
 * @help Set a limit on the amount of growth for grow items.
 * Prevent unlimited actor enhancements.
 * 
 * Note that this does not set a limit on the parameter.
 * It only sets a limit on the growth value of the parameter.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Set the limit value for each parameter in LimitParamList.
 * 
 * -------------------------------------------------------------------
 * [Integration with other plugins]
 * -------------------------------------------------------------------
 * Can also be used with NRP_LevelGrowTP.js.
 * Please specify the value of "TpParamId"
 * used there as a plugin parameter.
 * 
 * It may be possible to use the same method with other plugins
 * that create other original parameters,
 * but it depends on the implementation and cannot be guaranteed.
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
 * @param LimitParamList
 * @type struct<LimitParam>[]
 * @default ["{\"ParamId\":\"0\",\"Note\":\"Max HP\",\"LimitNumber\":\"\"}","{\"ParamId\":\"1\",\"Note\":\"Max MP\",\"LimitNumber\":\"\"}","{\"ParamId\":\"2\",\"Note\":\"Attack\",\"LimitNumber\":\"\"}","{\"ParamId\":\"3\",\"Note\":\"Defence\",\"LimitNumber\":\"\"}","{\"ParamId\":\"4\",\"Note\":\"M.Attack\",\"LimitNumber\":\"\"}","{\"ParamId\":\"5\",\"Note\":\"M.Defence\",\"LimitNumber\":\"\"}","{\"ParamId\":\"6\",\"Note\":\"Agility\",\"LimitNumber\":\"\"}","{\"ParamId\":\"7\",\"Note\":\"Luck\",\"LimitNumber\":\"\"}"]
 * @desc The parameters to be covered and their limits.
 */

/*~struct~LimitParam:
 * @param ParamId
 * @type number
 * @desc Target parameter ID.
 * 
 * @param Note
 * @type string
 * @desc Parameter Description.
 * These are administrative items that are not used in the game.
 * 
 * @param LimitNumber
 * @type number
 * @desc The limit value for the amount of parameter increase.
 * The rise beyond this value will not be allowed.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.01 成長アイテムに限界値を設定する。
 * @author 砂川赳（https://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/498340928.html
 *
 * @help 成長アイテムの成長量に限界値を設定します。
 * 無制限にアクターを強化されないようにします。
 * 
 * なお、パラメータ自体に限界値を設けるのではなく、
 * パラメータの成長値に限界を設ける方式です。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * パラメータ制限リストに各パラメータの制限値を設定してください。
 * 
 * -------------------------------------------------------------------
 * ■他プラグインとの連携
 * -------------------------------------------------------------------
 * ＴＰをレベル成長させるプラグイン（NRP_LevelGrowTP.js）とも併用できます。
 * あちらで使用した『ＴＰのパラメータＩＤ』の値を
 * プラグインパラメータで指定してください。
 * 
 * その他の独自パラメータを作成するプラグインとも、
 * 同様の方法で併用できるかも知れませんが、実装次第なので保証できません。
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
 * @param LimitParamList
 * @text パラメータ制限リスト
 * @type struct<LimitParam>[]
 * @default ["{\"ParamId\":\"0\",\"Note\":\"最大ＨＰ\",\"LimitNumber\":\"\"}","{\"ParamId\":\"1\",\"Note\":\"最大ＭＰ\",\"LimitNumber\":\"\"}","{\"ParamId\":\"2\",\"Note\":\"攻撃力\",\"LimitNumber\":\"\"}","{\"ParamId\":\"3\",\"Note\":\"防御力\",\"LimitNumber\":\"\"}","{\"ParamId\":\"4\",\"Note\":\"魔法力\",\"LimitNumber\":\"\"}","{\"ParamId\":\"5\",\"Note\":\"魔法防御\",\"LimitNumber\":\"\"}","{\"ParamId\":\"6\",\"Note\":\"敏捷性\",\"LimitNumber\":\"\"}","{\"ParamId\":\"7\",\"Note\":\"運\",\"LimitNumber\":\"\"}"]
 * @desc 対象とするパラメータとその制限値です。
 */

/*~struct~LimitParam:ja
 * @param ParamId
 * @text パラメータＩＤ
 * @type number
 * @desc 対象とするパラメータＩＤです。
 * 
 * @param Note
 * @text 注釈
 * @type string
 * @desc パラメータの説明です。
 * ゲーム内では使用しない管理用の項目です。
 * 
 * @param LimitNumber
 * @text 制限値
 * @type number
 * @desc 上昇量の制限値です。
 * この値を超えた上昇はできなくなります。
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

const PLUGIN_NAME = "NRP_LimitGrowItem";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pLimitParamList = parseStruct2(parameters["LimitParamList"]);

//-----------------------------------------------------------------------------
// Game_Action
//-----------------------------------------------------------------------------

/**
 * ●アイテムの使用確認
 */
const _Game_Action_testItemEffect = Game_Action.prototype.testItemEffect;
Game_Action.prototype.testItemEffect = function(target, effect) {
    // タイプが成長で限界を超える場合
    if (effect.code == Game_Action.EFFECT_GROW && isLimit(target, effect)) {
        // 使用禁止
        return false;
    }
    return _Game_Action_testItemEffect.apply(this, arguments);
};

/**
 * ●成長値が限界かどうかの判定
 */
function isLimit(target, effect) {
    const paramId = effect.dataId;
    // パラメータＩＤに一致するデータ取得
    const limitParam = pLimitParamList.find(p => p.ParamId == paramId);
    // パラメータ成長値の現在値を取得
    const value = target._paramPlus[paramId];
    if (value != null) {
        // 成長後の値を取得
        const newValue = value + Math.floor(effect.value1);
        // 成長後の値が限界値を超えてしまう場合は終了
        if (limitParam.LimitNumber && newValue > limitParam.LimitNumber) {
            return true;
        }
    }
    return false;
}

})();
