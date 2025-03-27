//=============================================================================
// NRP_CalcResultFirstAfter.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.00 Perform the result calculation for the skill first.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @base NRP_CalcResultFirst
 * @orderAfter NRP_CalcResultFirst
 * @orderAfter NRP_BattleEventEXMZ
 * @orderAfter NRP_Substitute
 * @url https://newrpg.seesaa.net/article/511767481.html
 *
 * @help This plugin is a split version of the NRP_CalcResultFirst.js
 * process that we want to execute at the bottom of the plugin list.
 * 
 * Therefore, this plugin should be placed
 * at the bottom of the plugin list.
 * In particular, if you do not place it below the plugins
 * that you are adding to the following functions,
 * it will likely not work properly.
 * 
 * Game_Action.prototype.makeTargets
 * 
 * -------------------------------------------------------------------
 * [Terms]
 * -------------------------------------------------------------------
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.00 スキルの結果計算を演出より先に実行する。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @base NRP_CalcResultFirst
 * @orderAfter NRP_CalcResultFirst
 * @orderAfter NRP_BattleEventEXMZ
 * @orderAfter NRP_Substitute
 * @url https://newrpg.seesaa.net/article/511767481.html
 *
 * @help 当プラグインはNRP_CalcResultFirst.jsの処理の中から、
 * プラグイン一覧の後方で実行したい処理を分割したものです。
 * 
 * そのため、このプラグインはプラグイン一覧の下側に配置してください。
 * 特に以下の関数に追記を行っているプラグインよりも下に配置しないと
 * 正しく動作しなくなる可能性が高いです。
 * 
 * Game_Action.prototype.makeTargets
 * 
 * -------------------------------------------------------------------
 * ■利用規約
 * -------------------------------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 */

(function() {
"use strict";

//-----------------------------------------------------------------------------
// Game_Action
//-----------------------------------------------------------------------------

/**
 * ●スキルの対象決定
 */
const _Game_Action_makeTargets = Game_Action.prototype.makeTargets;
Game_Action.prototype.makeTargets = function() {
    // 身代わりなど対象を操作するプラグインの処理が完了してから、改めて計算処理を行う。
    const targets = _Game_Action_makeTargets.apply(this, arguments);
    return this.makeTargetsResultFirst(targets);
};

})();
