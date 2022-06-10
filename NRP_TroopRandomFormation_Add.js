//=============================================================================
// NRP_TroopRandomFormation_Add.js
//=============================================================================

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 NRP_TroopRandomFormation.jsの競合対策
 * @author 砂川赳 (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/475049887.html
 *
 * @help NRP_TroopRandomFormation.jsの競合対策です。
 * 現在、以下のプラグインに対応しています。
 * 
 * ・VanguardAndRearguard.js（トリアコンタン様）
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @------------------------------------------------------------------
 * @ プラグインパラメータ
 * @------------------------------------------------------------------
 * 
 * @param ForVanguardAndRearguard
 * @text VanguardAndRearguardとの競合対策
 * @type boolean
 * @default true
 * @desc ForVanguardAndRearguardとの競合対策を行います。
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

const PLUGIN_NAME = "NRP_TroopRandomFormation_Add";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pForVanguardAndRearguard = toBoolean(parameters["ForVanguardAndRearguard"], true);

/**
 * ●VanguardAndRearguard.jsに対応
 */
if (pForVanguardAndRearguard) {
    const _Scene_Battle_start = Scene_Battle.prototype.start;
    Scene_Battle.prototype.start = function() {
        _Scene_Battle_start.call(this);

        // 敵の前衛・後衛を配置設定後に再設定
        for (const enemy of $gameTroop.members()) {
            if (enemy.initFormationState) {
                enemy.initFormationState();
            }
        }
    };
}

})();
