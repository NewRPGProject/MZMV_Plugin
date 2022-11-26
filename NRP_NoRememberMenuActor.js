//=============================================================================
// NRP_NoRememberMenuActor.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Actor's position is not memorized during menu operation.
 * @author Takeshi Sunagawa (https://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/494008821.html
 *
 * @help Do not memorize the actor's position
 * when operating the menu screen.
 * 
 * RPG Maker MV/MZ's menu specifications force it to remember
 * the position of the actor you manipulated.
 * 
 * 1. Subject of skill, equipment, and status.
 * 2. Target of skill and item.
 * 
 * The above two types of specifications are retained.
 * This does not matter if the option "Command Remember" is turned off.
 * 
 * Also, the memory of a skill's subject will be shared
 * with the subject of its equipment and status.
 * Since information that is inherently unrelated is shared,
 * it This tends to confuse players.
 * 
 * Furthermore, this information is permanently stored
 * whether the menu screen is closed or the data is loaded.
 * I believe that memorizing operations that the player
 * does not already remember is more likely to confuse him or her.
 * 
 * This plugin improves such problems.
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
 * @param NoRememberSubject
 * @type boolean
 * @default true
 * @desc It does not remember the subject of skills, equipment, or status.
 * 
 * @param NoRememberTarget
 * @type boolean
 * @default true
 * @desc It does not remember the target of the item or skill.
 * 
 * @param ClearMenuOpen
 * @type boolean
 * @default false
 * @desc Clears the memory state when the menu is opened.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 メニュー操作時にアクターの位置を記憶しない。
 * @author 砂川赳（https://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/494008821.html
 *
 * @help メニュー画面の操作時に、
 * アクターの位置を記憶しないようにします。
 * 
 * ツクールＭＶ／ＭＺのメニューの仕様では、
 * 操作したアクターの位置を強制的に記憶してしまいます。
 * 
 * １．スキルの使用者および装備、ステータスの対象者
 * ２．スキル、アイテムの対象者
 * 
 * 上記の二種類が保持される仕様です。
 * これはオプションの『コマンド記憶』がオフでも関係ありません。
 * 
 * また、スキルの使用者の記憶は、装備やステータスの対象者と共有されます。
 * 本来関連性の薄い情報が共有されてしまうので、
 * プレイヤーを戸惑わせてしまいがちです。
 * 
 * さらに、これらの情報はメニュー画面を閉じようが、
 * データをロードしようが、永続的に記憶されます。
 * プレイヤーも既に覚えていないような操作を記憶されても、
 * かえって、戸惑わせる可能性のほうが大きいと考えます。
 * 
 * そういった問題を改善するのが、当プラグインです。
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
 * @param NoRememberSubject
 * @text 使用者を記憶しない
 * @type boolean
 * @default true
 * @desc スキルや装備、ステータスの利用者を記憶しません。
 * 
 * @param NoRememberTarget
 * @text 対象を記憶しない
 * @type boolean
 * @default true
 * @desc アイテムやスキルの対象者を記憶しません。
 * 
 * @param ClearMenuOpen
 * @text メニューを開くとクリア
 * @type boolean
 * @default false
 * @desc メニューを開いた際に記憶状態をクリアします。
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

const PLUGIN_NAME = "NRP_NoRememberMenuActor";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pNoRememberSubject = toBoolean(parameters["NoRememberSubject"], true);
const pNoRememberTarget = toBoolean(parameters["NoRememberTarget"], true);
const pClearMenuOpen = toBoolean(parameters["ClearMenuOpen"], false);

// ----------------------------------------------------------------------------
// Scene_Map
// ----------------------------------------------------------------------------

/**
 * ●メニューを開くとクリア
 */
if (pClearMenuOpen) {
    /**
     * ●メニュー呼出
     */
    const _Scene_Map_callMenu = Scene_Map.prototype.callMenu;
    Scene_Map.prototype.callMenu = function() {
        _Scene_Map_callMenu.apply(this, arguments);

        // 記憶状態をクリア
        // ※外部プラグインなどから直接メニューが呼び出された場合は、
        //   ここは通らないこともあるので注意。
        $gameParty._menuActorId = 0;
        $gameParty._targetActorId = 0;
    };
}

// ----------------------------------------------------------------------------
// Window_MenuStatus
// ----------------------------------------------------------------------------

/**
 * ●使用者を記憶しない
 */
if (pNoRememberSubject) {
    Window_MenuStatus.prototype.selectLast = function() {
        if (this.smoothSelect) {
            this.smoothSelect(0);
        } else {
            this.select(0);
        }
        // this.smoothSelect($gameParty.menuActor().index() || 0);
    };
}

// ----------------------------------------------------------------------------
// Window_MenuActor
// ----------------------------------------------------------------------------

/**
 * ●対象を記憶しない
 */
if (pNoRememberTarget) {
    Window_MenuActor.prototype.selectLast = function() {
        if (this.forceSelect) {
            this.forceSelect(0);
        } else {
            this.select(0);
        }
        // this.forceSelect($gameParty.targetActor().index() || 0);
    };
}

})();
