//=============================================================================
// NRP_ActorSwitchLR.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.01 Enable actor switching with left/right cursor keys.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/502790367.html
 *
 * @help Enables the actor switching function on each screen,
 * normally performed by Pageup and Pagedown,
 * to be performed by the left and right cursor keys.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Set the target window name.
 * Note that the following windows are registered from the initial state.
 * 
 * Window_EquipCommand : Equip Scene (when command is selected)
 * Window_SkillType    : Skill Scene
 * Window_Status       : Status Scene
 * 
 * ◆The following are not normally required,
 *   but are intended for use with other plugins.
 * 
 * Window_EquipSlot      : NRP_CustomOptimize.js Features
 * Window_LearnSkillList : NRP_LearnSkillList.js Features
 * 
 * Windows with external plug-ins may also be eligible,
 * as long as they do not use the left and right cursor keys
 * and can be switched by Pageup and Pagedown.
 * 
 * If you want to find out the name of the window,
 * search for "Window_" in the plugin and find a name that looks like it.
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
 * @param TargetWindows
 * @type string[]
 * @default ["Window_SkillType","Window_Status","Window_EquipSlot","Window_LearnSkillList"]
 * @desc The name of the target windows.
 * 
 * @param AllowRepeat
 * @type boolean
 * @default true
 * @desc Allows continuous switching by holding down the cursor keys.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.01 アクター切替をカーソルの左右で可能に
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/502790367.html
 *
 * @help 通常はPageup, Pagedownで行う各種画面での
 * アクター切替機能をカーソルの左右で行えるようにします。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * 対象となるウィンドウ名を設定してください。
 * なお、初期状態から以下のウィンドウを登録しています。
 * 
 * Window_SkillType    : スキル画面
 * Window_Status       : ステータス画面
 * 
 * ◆以下は通常は不要ですが、他プラグインとの併用を想定しています。
 * Window_EquipSlot      : NRP_CustomOptimize.jsの機能
 * Window_LearnSkillList : NRP_LearnSkillList.jsの機能
 * 
 * 外部プラグインによるウィンドウでも、カーソルの左右を使わず、
 * かつPageup, Pagedownで切替できるならば、対象にできる可能性があります。
 * 
 * ウィンドウ名を調べたい場合は「Window_」でプラグイン内を検索して、
 * それっぽい名称を見つけてください。
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
 * @param TargetWindows
 * @text 対象ウィンドウ名
 * @type string[]
 * @default ["Window_SkillType","Window_Status","Window_EquipSlot","Window_LearnSkillList"]
 * @desc 対象とするウィンドウ名です。
 * 
 * @param AllowRepeat
 * @text 連続切替を許可
 * @type boolean
 * @default true
 * @desc カーソルキー押しっぱなしによる連続切替を許可します。
 */

(function() {
"use strict";

/**
 * ●構造体をJSで扱えるように変換
 */
function parseStruct1(arg) {
    const ret = [];
    if (arg) {
        for (const str of JSON.parse(arg)) {
            ret.push(str);
        }
    }
    return ret;
}
function toBoolean(str, def) {
    if (str === true || str === "true") {
        return true;
    } else if (str === false || str === "false") {
        return false;
    }
    return def;
}

const PLUGIN_NAME = "NRP_ActorSwitchLR";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pTargetWindows = parseStruct1(parameters["TargetWindows"]);
const pAllowRepeat = toBoolean(parameters["AllowRepeat"], true);

//-----------------------------------------------------------------------------
// Window_Selectable
//-----------------------------------------------------------------------------

/**
 * ●入力制御
 */
const _Window_Selectable_processHandling = Window_Selectable.prototype.processHandling;
Window_Selectable.prototype.processHandling = function() {
    // ウィンドウ名が一致する場合
    if (pTargetWindows.includes(this.constructor.name)) {
        if (this.isOpenAndActive()) {
            // 押しっぱなし許可
            if (pAllowRepeat) {
                // pagedownが有効かつ右を押した場合
                if (this.isHandled("pagedown") && Input.isRepeated("right")) {
                    return this.processPagedown();
                }
                // pageupが有効かつ左を押した場合
                if (this.isHandled("pageup") && Input.isRepeated("left")) {
                    return this.processPageup();
                }
            // 押しっぱなし無効
            } else {
                // pagedownが有効かつ右を押した場合
                if (this.isHandled("pagedown") && Input.isTriggered("right")) {
                    return this.processPagedown();
                }
                // pageupが有効かつ左を押した場合
                if (this.isHandled("pageup") && Input.isTriggered("left")) {
                    return this.processPageup();
                }
            }
        }
    }
    return _Window_Selectable_processHandling.apply(this, arguments);
};

})();
