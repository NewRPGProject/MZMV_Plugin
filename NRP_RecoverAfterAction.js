//=============================================================================
// NRP_RecoverAfterAction.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.002 Implemented a system of recovery after action.
 * @author Takeshi Sunagawa (https://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/498761194.html
 *
 * @help Implement a system in which HP, MP, and TP
 * are recovered after an action.
 * 
 * You can set the conditions under
 * which recovery takes place in detail.
 * In addition, the amount of recovery can be displayed
 * when selecting a skill.
 * 
 * Note that this plug-in was created to implement the
 * "MP recovery when using weapons" and "TP recovery when using magic"
 * systems in the author's own work,
 * so the specifications are slightly maniacal.
 * 
 * -------------------------------------------------------------------
 * [Note (Actor, Enemy, Class, Equipment, State, and Passive Skill)]
 * -------------------------------------------------------------------
 * <RecoverActionHpAdd:?>
 * <RecoverActionMpAdd:?>
 * <RecoverActionTpAdd:?>
 * Recovers HP, MP, and TP by the specified value after an action.
 * Duplicate addition by multiple equipment etc. is also possible.
 * 
 * Also, formulas can be used.
 * "a.mhp / 2" will be half of the maximum HP.
 * 
 * -------------------------------------------------------------------
 * [About Passive Skills]
 * -------------------------------------------------------------------
 * If the Occasion of a skill is set to "Never",
 * the skill functions as a passive skill.
 * If the above settings are to be used, they should be passive skills.
 * 
 * -------------------------------------------------------------------
 * [Note (Skill, Item)]
 * -------------------------------------------------------------------
 * <RecoverActionHp:true/false>
 * <RecoverActionMp:true/false>
 * <RecoverActionTp:true/false>
 * Enables/Disables recovery of HP, MP, and TP
 * when that skill (item) is used.
 * These take precedence over the plugin parameter settings.
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
 * @param <HPRecover>
 * @desc HP recovery-related settings.
 * 
 * @param BasicHpRecover
 * @parent <HPRecover>
 * @type string
 * @desc This is the basic HP recovery amount.
 * 
 * @param HpRecoverSkillType
 * @parent <HPRecover>
 * @type string
 * @default 0,1,2
 * @desc Skill type to recover HP. Multiple possible.
 * Standard is 0:attack or guard, 1:magic, 2:special
 * 
 * @param HpRecoverUseItem
 * @parent <HPRecover>
 * @type boolean
 * @default false
 * @desc Recovers the user's HP when the item is used.
 * 
 * @param DisplayHpRecover
 * @parent <HPRecover>
 * @type boolean
 * @default false
 * @desc Displays the amount of HP recovery in damage.
 * 
 * @param HpRecoverLabel
 * @parent <HPRecover>
 * @type string
 * @default HP+
 * @desc The notation for displaying the amount of HP recovery in the window.
 * 
 * @param <MPRecover>
 * @desc MP recovery-related settings.
 * 
 * @param BasicMpRecover
 * @parent <MPRecover>
 * @type string
 * @desc This is the basic MP recovery amount.
 * 
 * @param MpRecoverSkillType
 * @parent <MPRecover>
 * @type string
 * @default 0,1,2
 * @desc Skill type to recover MP. Multiple possible.
 * Standard is 0:attack or guard, 1:magic, 2:special
 * 
 * @param MpRecoverUseItem
 * @parent <MPRecover>
 * @type boolean
 * @default false
 * @desc Recovers the user's MP when the item is used.
 * 
 * @param DisplayMpRecover
 * @parent <MPRecover>
 * @type boolean
 * @default false
 * @desc Displays the amount of MP recovery in damage.
 * 
 * @param MpRecoverLabel
 * @parent <MPRecover>
 * @type string
 * @default MP+
 * @desc The notation for displaying the amount of MP recovery in the window.
 * 
 * @param <TPRecover>
 * @desc TP recovery-related settings.
 * 
 * @param BasicTpRecover
 * @parent <TPRecover>
 * @type string
 * @desc This is the basic TP recovery amount.
 * 
 * @param TpRecoverSkillType
 * @parent <TPRecover>
 * @type string
 * @default 0,1,2
 * @desc Skill type to recover TP. Multiple possible.
 * Standard is 0:attack or guard, 1:magic, 2:special
 * 
 * @param TpRecoverUseItem
 * @parent <TPRecover>
 * @type boolean
 * @default false
 * @desc Recovers the user's TP when the item is used.
 * 
 * @param DisplayTpRecover
 * @parent <TPRecover>
 * @type boolean
 * @default false
 * @desc Displays the amount of TP recovery in damage.
 * 
 * @param TpRecoverLabel
 * @parent <TPRecover>
 * @type string
 * @default TP+
 * @desc The notation for displaying the amount of TP recovery in the window.
 * 
 * @param <RecoverWindow>
 * @desc This is a window setting for displaying recovery values.
 * 
 * @param UseRecoverWindow
 * @parent <RecoverWindow>
 * @type boolean
 * @default true
 * @desc The amount of recovery is displayed in a window when selecting a skill.
 * 
 * @param CommandType
 * @parent <RecoverWindow>
 * @type select
 * @option
 * @option command
 * @option target
 * @desc How the recovery window is displayed when a command (normal attack or guard) is selected.
 * 
 * @param HorizontalPosition
 * @parent <RecoverWindow>
 * @type select
 * @option left
 * @option right
 * @default left
 * @desc Recovery window placement (horizontal).
 * 
 * @param NumberWidth
 * @parent <RecoverWindow>
 * @type number
 * @default 30
 * @desc The width of the numeric display in the recovery window.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.002 行動後に回復するシステムを実装。
 * @author 砂川赳（https://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/498761194.html
 *
 * @help 行動後にＨＰ、ＭＰ、ＴＰが回復するシステムを実装します。
 * 
 * 回復を行う条件を細かく設定可能な他、
 * スキル選択時に回復量を表示することもできます。
 * 
 * なお、作者の自作品にある「武器を使った時はＭＰ回復」
 * 「魔法を使った時はＴＰ回復」というシステムを実現するために
 * 作成したプラグインなので、仕様が微妙にマニアックです。
 * 
 * -------------------------------------------------------------------
 * ■アクター、エネミー、職業、装備、ステート、パッシブスキルのメモ欄
 * -------------------------------------------------------------------
 * <RecoverActionHpAdd:?>
 * <RecoverActionMpAdd:?>
 * <RecoverActionTpAdd:?>
 * 行動後にＨＰ、ＭＰ、ＴＰを指定した数値分だけ回復します。
 * 複数の装備品などによる重複加算も可能です。
 * 
 * また、数式も使用可能です。
 * "a.mhp / 2"ならば、最大ＨＰの半分になります。
 * 
 * -------------------------------------------------------------------
 * ■パッシブスキルについて
 * -------------------------------------------------------------------
 * スキルの使用可能時を『使用不可』にした場合、
 * そのスキルはパッシブスキルとして機能します。
 * 上記の設定を行う場合は、パッシブスキルにしてください。
 * 
 * -------------------------------------------------------------------
 * ■スキル、アイテムのメモ欄
 * -------------------------------------------------------------------
 * <RecoverActionHp:true/false>
 * <RecoverActionMp:true/false>
 * <RecoverActionTp:true/false>
 * そのスキル（アイテム）を使用した際、
 * ＨＰ、ＭＰ、ＴＰの回復を有効／無効にします。
 * これらはプラグインパラメータの設定より優先されます。
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
 * @param <HPRecover>
 * @text ＜ＨＰ回復関連＞
 * @desc ＨＰ回復関連の設定です。
 * 
 * @param BasicHpRecover
 * @text 基本ＨＰ回復量
 * @parent <HPRecover>
 * @type string
 * @desc 基本となるＨＰ回復量です。
 * 
 * @param HpRecoverSkillType
 * @text ＨＰ回復するスキルタイプ
 * @parent <HPRecover>
 * @type string
 * @default 0,1,2
 * @desc ＨＰ回復を行うスキルタイプ。複数可。
 * 標準だと0:通常攻撃や防御, 1:魔法, 2:必殺技
 * 
 * @param HpRecoverUseItem
 * @text アイテム使用時にＨＰ回復
 * @parent <HPRecover>
 * @type boolean
 * @default false
 * @desc アイテム使用時にＨＰ回復を行います。
 * 
 * @param DisplayHpRecover
 * @text ＨＰ回復をダメージ表示
 * @parent <HPRecover>
 * @type boolean
 * @default false
 * @desc ＨＰ回復量をダメージ表示します。
 * 
 * @param HpRecoverLabel
 * @text ＨＰ回復の表記
 * @parent <HPRecover>
 * @type string
 * @default HP+
 * @desc ＨＰ回復量をウィンドウに表示する際の表記です。
 * 
 * @param <MPRecover>
 * @text ＜ＭＰ回復関連＞
 * @desc ＭＰ回復関連の設定です。
 * 
 * @param BasicMpRecover
 * @text 基本ＭＰ回復量
 * @parent <MPRecover>
 * @type string
 * @desc 基本となるＭＰ回復量です。
 * 
 * @param MpRecoverSkillType
 * @text ＭＰ回復するスキルタイプ
 * @parent <MPRecover>
 * @type string
 * @default 0,1,2
 * @desc ＭＰ回復を行うスキルタイプ。複数可。
 * 標準だと0:通常攻撃や防御, 1:魔法, 2:必殺技
 * 
 * @param MpRecoverUseItem
 * @text アイテム使用時にＭＰ回復
 * @parent <MPRecover>
 * @type boolean
 * @default false
 * @desc アイテム使用時にＭＰ回復を行います。
 * 
 * @param DisplayMpRecover
 * @text ＭＰ回復をダメージ表示
 * @parent <MPRecover>
 * @type boolean
 * @default false
 * @desc ＭＰ回復量をダメージ表示します。
 * 
 * @param MpRecoverLabel
 * @text ＭＰ回復の表記
 * @parent <MPRecover>
 * @type string
 * @default MP+
 * @desc ＭＰ回復量をウィンドウに表示する際の表記です。
 * 
 * @param <TPRecover>
 * @text ＜ＴＰ回復関連＞
 * @desc ＴＰ回復関連の設定です。
 * 
 * @param BasicTpRecover
 * @text 基本ＴＰ回復量
 * @parent <TPRecover>
 * @type string
 * @desc 基本となるＴＰ回復量です。
 * 
 * @param TpRecoverSkillType
 * @text ＴＰ回復するスキルタイプ
 * @parent <TPRecover>
 * @type string
 * @default 0,1,2
 * @desc ＴＰ回復を行うスキルタイプ。複数可。
 * 標準だと0:通常攻撃や防御, 1:魔法, 2:必殺技
 * 
 * @param TpRecoverUseItem
 * @text アイテム使用時にＴＰ回復
 * @parent <TPRecover>
 * @type boolean
 * @default false
 * @desc アイテム使用時にＴＰ回復を行います。
 * 
 * @param DisplayTpRecover
 * @text ＴＰ回復をダメージ表示
 * @parent <TPRecover>
 * @type boolean
 * @default false
 * @desc ＴＰ回復量をダメージ表示します。
 * 
 * @param TpRecoverLabel
 * @text ＴＰ回復の表記
 * @parent <TPRecover>
 * @type string
 * @default TP+
 * @desc ＴＰ回復量をウィンドウに表示する際の表記です。
 * 
 * @param <RecoverWindow>
 * @text ＜回復ウィンドウ関連＞
 * @desc 回復値を表示するためのウィンドウの設定です。
 * 
 * @param UseRecoverWindow
 * @text 回復ウィンドウを表示
 * @parent <RecoverWindow>
 * @type boolean
 * @default true
 * @desc スキル選択時に回復量をウィンドウに表示します。
 * 
 * @param CommandType
 * @text コマンド時の表示方法
 * @parent <RecoverWindow>
 * @type select
 * @option 非表示 @value
 * @option コマンド選択時 @value command
 * @option 対象選択時 @value target
 * @desc コマンド（通常攻撃や防御）選択時の回復ウィンドウの表示方法です。
 * 
 * @param HorizontalPosition
 * @text 配置（横）
 * @parent <RecoverWindow>
 * @type select
 * @option 左 @value left
 * @option 右 @value right
 * @default left
 * @desc 回復ウィンドウの配置（横）です。
 * 
 * @param NumberWidth
 * @text 数値の表示幅
 * @parent <RecoverWindow>
 * @type number
 * @default 30
 * @desc 回復ウィンドウに数値を表示する幅です。
 */
(function() {
"use strict";

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

const PLUGIN_NAME = "NRP_RecoverAfterAction";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pBasicHpRecover = setDefault(parameters["BasicHpRecover"], 0);
const pHpRecoverSkillType = textToArray(parameters["HpRecoverSkillType"]);
const pHpRecoverUseItem = toBoolean(parameters["HpRecoverUseItem"], false);
const pDisplayHpRecover = toBoolean(parameters["DisplayHpRecover"], false);
const pHpRecoverLabel = setDefault(parameters["HpRecoverLabel"]);
const pBasicMpRecover = setDefault(parameters["BasicMpRecover"], 0);
const pMpRecoverSkillType = textToArray(parameters["MpRecoverSkillType"]);
const pMpRecoverUseItem = toBoolean(parameters["MpRecoverUseItem"], false);
const pDisplayMpRecover = toBoolean(parameters["DisplayMpRecover"], false);
const pMpRecoverLabel = setDefault(parameters["MpRecoverLabel"]);
const pBasicTpRecover = setDefault(parameters["BasicTpRecover"], 0);
const pTpRecoverSkillType = textToArray(parameters["TpRecoverSkillType"]);
const pTpRecoverUseItem = toBoolean(parameters["TpRecoverUseItem"], false);
const pDisplayTpRecover = toBoolean(parameters["DisplayTpRecover"], false);
const pTpRecoverLabel = setDefault(parameters["TpRecoverLabel"]);
const pUseRecoverWindow = toBoolean(parameters["UseRecoverWindow"], true);
const pCommandType = setDefault(parameters["CommandType"]);
const pHorizontalPosition = setDefault(parameters["HorizontalPosition"]);
const pNumberWidth = toNumber(parameters["NumberWidth"], 30);

// ----------------------------------------------------------------------------
// Game_Battler
// ----------------------------------------------------------------------------

/**
 * ●ＨＰ再生
 */
const _Game_Battler_regenerateHp = Game_Battler.prototype.regenerateHp;
Game_Battler.prototype.regenerateHp = function() {
    _Game_Battler_regenerateHp.apply(this, arguments);

    if (!BattleManager._action) {
        return;
    }

    const item = BattleManager._action.item();
    const value = this.recoverAfterActionHp(item);
    if (value) {
        if (pDisplayHpRecover) {
            this.gainHp(value);
        } else {
            this.setHp(this.hp + value);
        }
    }
};

/**
 * ●ＭＰ再生
 */
const _Game_Battler_regenerateMp = Game_Battler.prototype.regenerateMp;
Game_Battler.prototype.regenerateMp = function() {
    _Game_Battler_regenerateMp.apply(this, arguments);

    if (!BattleManager._action) {
        return;
    }

    const item = BattleManager._action.item();
    const value = this.recoverAfterActionMp(item);
    if (value) {
        if (pDisplayMpRecover) {
            this.gainMp(value);
        } else {
            this.setMp(this.mp + value);
        }
    }
};

/**
 * ●ＴＰ再生
 */
const _Game_Battler_regenerateTp = Game_Battler.prototype.regenerateTp;
Game_Battler.prototype.regenerateTp = function() {
    _Game_Battler_regenerateTp.apply(this, arguments);

    if (!BattleManager._action) {
        return;
    }

    const item = BattleManager._action.item();
    const value = this.recoverAfterActionTp(item);
    if (value) {
        if (pDisplayTpRecover) {
            this.gainTp(value);
        } else {
            this.setTp(this.tp + value);
        }
    }
};

/**
 * 【独自】行動後のＨＰ回復量
 */
Game_Battler.prototype.recoverAfterActionHp = function(item) {
    // 回復を行うかの判定
    if (!isRecoverHp(item)) {
        return 0;
    }

    let value = 0;
    // eval参照用
    const a = this;
    if (pBasicHpRecover) {
        value = eval(pBasicHpRecover);
    }
    // メモ欄を参照するオブジェクトを全取得
    let traitObjects = this.traitObjects();
    // スキルが有効な場合はパッシブスキルとして連結
    // ※通常はアクターのみ
    if (this.skills) {
        traitObjects = traitObjects.concat(passiveSkills(this));
    }

    for (const object of traitObjects) {
        const recoverAfterActionAddHp = object.meta.RecoverActionHpAdd;
        if (recoverAfterActionAddHp) {
            value += Math.round(eval(recoverAfterActionAddHp));
        }
    }

    return value;
};

/**
 * 【独自】行動後のＭＰ回復量
 */
Game_Battler.prototype.recoverAfterActionMp = function(item) {
    // 回復を行うかの判定
    if (!isRecoverMp(item)) {
        return 0;
    }

    let value = 0;
    // eval参照用
    const a = this;
    if (pBasicMpRecover) {
        value = eval(pBasicMpRecover);
    }
    // メモ欄を参照するオブジェクトを全取得
    let traitObjects = this.traitObjects();
    // スキルが有効な場合はパッシブスキルとして連結
    // ※通常はアクターのみ
    if (this.skills) {
        traitObjects = traitObjects.concat(passiveSkills(this));
    }

    for (const object of traitObjects) {
        const recoverAfterActionAddMp = object.meta.RecoverActionMpAdd;
        if (recoverAfterActionAddMp) {
            value += Math.round(eval(recoverAfterActionAddMp));
        }
    }

    return value;
};

/**
 * 【独自】行動後のＴＰ回復量
 */
Game_Battler.prototype.recoverAfterActionTp = function(item) {
    // 回復を行うかの判定
    if (!isRecoverTp(item)) {
        return 0;
    }

    let value = 0;
    // eval参照用
    const a = this;
    if (pBasicTpRecover) {
        value = eval(pBasicTpRecover);
    }
    // メモ欄を参照するオブジェクトを全取得
    let traitObjects = this.traitObjects();
    // スキルが有効な場合はパッシブスキルとして連結
    // ※通常はアクターのみ
    if (this.skills) {
        traitObjects = traitObjects.concat(passiveSkills(this));
    }

    for (const object of traitObjects) {
        const recoverAfterActionAddTp = object.meta.RecoverActionTpAdd;
        if (recoverAfterActionAddTp) {
            value += Math.round(eval(recoverAfterActionAddTp));
        }
    }

    return value;
};

/**
 * 【独自】ＨＰ回復を行うかどうか？
 */
function isRecoverHp(item) {
    // スキル個別の設定を優先
    const recoverActionHp = toBoolean(item.meta.RecoverActionHp);
    if (recoverActionHp === true) {
        return true;
    } else if (recoverActionHp === false) {
        return false;
    }

    // アイテムのチェック
    if (DataManager.isItem(item) && pHpRecoverUseItem) {
        return true;
    }

    // スキルタイプのチェック
    if (pHpRecoverSkillType.length && !pHpRecoverSkillType.includes(item.stypeId)) {
        return false;
    }
    return true;
};

/**
 * 【独自】ＭＰ回復を行うかどうか？
 */
function isRecoverMp(item) {
    // スキル個別の設定を優先
    const recoverActionMp = toBoolean(item.meta.RecoverActionMp);
    if (recoverActionMp === true) {
        return true;
    } else if (recoverActionMp === false) {
        return false;
    }

    // アイテムのチェック
    if (DataManager.isItem(item) && pMpRecoverUseItem) {
        return true;
    }

    // スキルタイプのチェック
    if (pMpRecoverSkillType.length && !pMpRecoverSkillType.includes(item.stypeId)) {
        return false;
    }
    return true;
};

/**
 * 【独自】ＴＰ回復を行うかどうか？
 */
function isRecoverTp(item) {
    // スキル個別の設定を優先
    const recoverActionTp = toBoolean(item.meta.RecoverActionTp);
    if (recoverActionTp === true) {
        return true;
    } else if (recoverActionTp === false) {
        return false;
    }

    // アイテムのチェック
    if (DataManager.isItem(item) && pTpRecoverUseItem) {
        return true;
    }

    // スキルタイプのチェック
    if (pTpRecoverSkillType.length && !pTpRecoverSkillType.includes(item.stypeId)) {
        return false;
    }
    return true;
};

/**
 * 【独自】パッシブ用の連結スキルを取得
 */
function passiveSkills(battler) {
    // 使用不可のスキルのみ対象
    return battler.skills().filter(skill => skill.occasion == 3);
};

// ----------------------------------------------------------------------------
// Scene_Battle
// ----------------------------------------------------------------------------

/**
 * ●各ウィンドウの作成
 */
const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
    _Scene_Battle_createAllWindows.apply(this, arguments);

    if (pUseRecoverWindow) {
        this.createRecoverActionWindow();
    }
};

/**
 * 【独自】回復表示ウィンドウの作成
 */
Scene_Battle.prototype.createRecoverActionWindow = function() {
    const rect = this.recoverActionWindowRect();
    const window = new Window_RecoverAction(rect);
    this.addWindow(window);
    window.hide();
    this._recoverActionWindow = window;
    // スキルウィンドウ、アイテムウィンドウ、アクターコマンドウィンドウにセット
    this._skillWindow.setRecoverActionWindow(this._recoverActionWindow);
    this._itemWindow.setRecoverActionWindow(this._recoverActionWindow);
    this._actorCommandWindow.setRecoverActionWindow(this._recoverActionWindow);
};

/**
 * 【独自】回復ウィンドウの表示領域
 */
Scene_Battle.prototype.recoverActionWindowRect = function() {
    const ww = 380;
    const wh = this.calcWindowHeight(1, false);
    const wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;
    const wy = this._statusWindow.y - wh;
    return new Rectangle(wx, wy, ww, wh);
};

/**
 * ●対象選択時にウィンドウを表示する場合
 */
if (pUseRecoverWindow && pCommandType == "target") {
    /**
     * ●アクターの選択開始
     */
    const _Scene_Battle_startActorSelection = Scene_Battle.prototype.startActorSelection;
    Scene_Battle.prototype.startActorSelection = function() {
        _Scene_Battle_startActorSelection.apply(this, arguments);

        if (this._recoverActionWindow) {
            const action = BattleManager.inputtingAction();
            this._recoverActionWindow.setItem(action.item());
            this._recoverActionWindow.refresh();
        }
    };

    /**
     * ●敵キャラの選択開始
     */
    const _Scene_Battle_startEnemySelection = Scene_Battle.prototype.startEnemySelection;
    Scene_Battle.prototype.startEnemySelection = function() {
        _Scene_Battle_startEnemySelection.apply(this, arguments);

        if (this._recoverActionWindow) {
            const action = BattleManager.inputtingAction();
            this._recoverActionWindow.setItem(action.item());
            this._recoverActionWindow.refresh();
        }
    };

    /**
     * ●アクターのキャンセル時
     */
    const _Scene_Battle_onActorCancel = Scene_Battle.prototype.onActorCancel;
    Scene_Battle.prototype.onActorCancel = function() {
        _Scene_Battle_onActorCancel.apply(this, arguments);

        if (this._recoverActionWindow) {
            this._recoverActionWindow.hide();
        }
    };

    /**
     * ●敵キャラのキャンセル時
     */
    const _Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
    Scene_Battle.prototype.onEnemyCancel = function() {
        _Scene_Battle_onEnemyCancel.apply(this, arguments);

        if (this._recoverActionWindow) {
            this._recoverActionWindow.hide();
        }
    };
}

// ----------------------------------------------------------------------------
// 【独自】Window_RecoverAction
// ※回復値を表示するウィンドウ
// ----------------------------------------------------------------------------

function Window_RecoverAction() {
    this.initialize(...arguments);
}

Window_RecoverAction.prototype = Object.create(Window_Base.prototype);
Window_RecoverAction.prototype.constructor = Window_RecoverAction;

Window_RecoverAction.prototype.initialize = function(rect) {
    Window_Base.prototype.initialize.call(this, rect);
    this.refresh();
};

Window_RecoverAction.prototype.refresh = function() {
    this.contents.clear();

    this._actor = BattleManager.actor();
    if (this._actor) {
        this.drawItem();
    }
};

Window_RecoverAction.prototype.drawItem = function(index) {
    if (!this._item) {
        // 非表示
        this.hide();
        return;
    }
    const hpValue = this._actor.recoverAfterActionHp(this._item);
    const mpValue = this._actor.recoverAfterActionMp(this._item);
    const tpValue = this._actor.recoverAfterActionTp(this._item);

    let x = this.itemPadding();
    const numberWidth = pNumberWidth;
    const align = "right";

    let windowWidth = 0;

    // HP
    if (hpValue && pHpRecoverLabel) {
        const textWidth = this.textSizeEx(pHpRecoverLabel).width;
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(pHpRecoverLabel, x, 0, textWidth);
        this.resetTextColor();
        x += textWidth + this.itemPadding();
        this.drawText(hpValue, x, 0, numberWidth, align);
        x += numberWidth + this.itemPadding() * 2;
        windowWidth += textWidth + numberWidth + this.itemPadding() * 3;
    }
    // MP
    if (mpValue && pMpRecoverLabel) {
        const textWidth = this.textSizeEx(pMpRecoverLabel).width;
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(pMpRecoverLabel, x, 0, textWidth);
        this.resetTextColor();
        x += textWidth + this.itemPadding();
        this.drawText(mpValue, x, 0, numberWidth, align);
        x += numberWidth + this.itemPadding() * 2;
        windowWidth += textWidth + numberWidth + this.itemPadding() * 3;
    }
    // TP
    if (tpValue && pTpRecoverLabel) {
        const textWidth = this.textSizeEx(pTpRecoverLabel).width;
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(pTpRecoverLabel, x, 0, textWidth);
        this.resetTextColor();
        x += textWidth + this.itemPadding();
        this.drawText(tpValue, x, 0, numberWidth, align);
        x += numberWidth + this.itemPadding() * 2;
        windowWidth += textWidth + numberWidth + this.itemPadding() * 3;
    }

    this.width = windowWidth + this.itemPadding() * 3;

    // 右表示の場合
    if (pHorizontalPosition == "right") {
        this.x = Graphics.boxWidth - this.width;
    }

    // 該当がある場合は表示
    if (hpValue || mpValue || tpValue) {
        this.show();
    }
};

Window_RecoverAction.prototype.maxCols = function() {
    return 1;
};

Window_RecoverAction.prototype.maxRows = function() {
    return 1;
};

Window_RecoverAction.prototype.maxItems = function() {
    return 0;
};

Window_RecoverAction.prototype.setItem = function(item) {
    this._item = item;
    this.refresh();
};

// ----------------------------------------------------------------------------
// Window_SkillList
// ----------------------------------------------------------------------------

/**
 * 【独自】回復表示ウィンドウを設定
 */
Window_SkillList.prototype.setRecoverActionWindow = function(window) {
    this._recoverActionWindow = window;
};

/**
 * ●ヘルプ更新
 */
const _Window_SkillList_updateHelp = Window_SkillList.prototype.updateHelp;
Window_SkillList.prototype.updateHelp = function() {
    _Window_SkillList_updateHelp.apply(this, arguments);

    if (this._recoverActionWindow) {
        this._recoverActionWindow.setItem(this.item());
    }
};

// ----------------------------------------------------------------------------
// Window_BattleItem
// ----------------------------------------------------------------------------

/**
 * 【独自】回復表示ウィンドウを設定
 */
Window_BattleItem.prototype.setRecoverActionWindow = function(window) {
    this._recoverActionWindow = window;
};

/**
 * Window_BattleItem.prototype.updateHelpが未定義の場合は事前に定義
 * ※これをしておかないと以後のWindow_ItemList側への追記が反映されない。
 */
if (Window_BattleItem.prototype.updateHelp == Window_ItemList.prototype.updateHelp) {
    Window_BattleItem.prototype.updateHelp = function() {
        Window_ItemList.prototype.updateHelp.apply(this, arguments);
    }
}

/**
 * ●ヘルプ更新
 */
const _Window_BattleItem_updateHelp = Window_BattleItem.prototype.updateHelp;
Window_BattleItem.prototype.updateHelp = function() {
    _Window_BattleItem_updateHelp.apply(this, arguments);

    if (this._recoverActionWindow) {
        this._recoverActionWindow.setItem(this.item());
    }
};

// ----------------------------------------------------------------------------
// Window_ActorCommand
// ----------------------------------------------------------------------------

/**
 * Window_ActorCommand.prototype.selectが未定義の場合は事前に定義
 * ※これをしておかないと以後のWindow_Selectable側への追記が反映されない。
 */
if (Window_ActorCommand.prototype.select == Window_Selectable.prototype.select) {
    Window_ActorCommand.prototype.select = function() {
        Window_Selectable.prototype.select.apply(this, arguments);
    }
}

/**
 * ●選択時
 */
const _Window_ActorCommand_select = Window_ActorCommand.prototype.select;
Window_ActorCommand.prototype.select = function() {
    _Window_ActorCommand_select.apply(this, arguments);

    if (!this._recoverActionWindow || pCommandType != "command") {
        return;
    }

    let skillId;

    // コマンドに対応するスキルＩＤを取得
    if (this.currentSymbol() == "attack") {
        skillId = 1;
    } else if (this.currentSymbol() == "guard") {
        skillId = 2;
    }

    if (skillId) {
        this._recoverActionWindow.setItem($dataSkills[skillId]);
    } else {
        this._recoverActionWindow.setItem(null);
    }
};

/**
 * 【独自】回復表示ウィンドウを設定
 */
Window_ActorCommand.prototype.setRecoverActionWindow = function(window) {
    this._recoverActionWindow = window;
};

// ----------------------------------------------------------------------------
// Window_Selectable
// ----------------------------------------------------------------------------

/**
 * ●ヘルプウィンドウの非表示
 */
const _Window_Selectable_hideHelpWindow = Window_Selectable.prototype.hideHelpWindow;
Window_Selectable.prototype.hideHelpWindow = function() {
    _Window_Selectable_hideHelpWindow.apply(this, arguments);

    // 回復表示ウィンドウの非表示
    if (this._recoverActionWindow) {
        this._recoverActionWindow.hide();
    }
};

// ----------------------------------------------------------------------------
// 共通関数
// ----------------------------------------------------------------------------

/**
 * ●文字列を分解して配列に変換する。
 * ※例１："1,2,3" -> [1,2,3]
 * ※例２："1~3" -> [1,2,3]
 */
function textToArray(textArr) {
    const array = [];
    
    // 無効なら処理しない。
    if (textArr === undefined || textArr === null || textArr === "") {
        return array;
    }

    // カンマ区切りでループ
    for (let text of textArr.split(",")) {
        // 空白除去
        text = text.trim();
        // 1~5というように範囲指定の場合
        // ※~が存在する。
        if (text.indexOf("~") >= 0) {
            const rangeVal = text.split("~");
            const rangeStart = eval(rangeVal[0]);
            const rangeEnd = eval(rangeVal[1]);

            // IDの指定範囲で実行
            // 開始のほうが終了より大きい場合は反対に実行
            if (rangeEnd < rangeStart) {
                for (let i = rangeStart; i >= rangeEnd; i--) {
                    array.push(eval(i));
                }
            } else {
                for (let i = rangeStart; i <= rangeEnd; i++) {
                    array.push(eval(i));
                }
            }
            
        // 通常時
        } else {
            try {
                array.push(eval(text));
            // 数式評価できない場合はそのままpush
            } catch (e) {
                array.push(text);
            }
        }
    }
    return array;
}

})();
