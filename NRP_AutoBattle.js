//=============================================================================
// NRP_AutoBattle.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.001 Add an auto-battle command.
 * @author Takeshi Sunagawa (https://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/498941158.html
 *
 * @help Add an auto-battle command.
 * The battle will be executed automatically
 * until the cancel key is pressed.
 * 
 * Initially, it behaves like an auto-battle
 * with special flag of traits,
 * but it is also possible to have it only normal attack.
 * 
 * Can be turn-based, TPB, or CTB.
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
 * @param CommandName
 * @type string
 * @default Auto Battle
 * @desc The name of the auto-battle command.
 * 
 * @param PartyCommandPosition
 * @type number
 * @default 1
 * @desc The position when inserted into a party command.
 * Delete with the DEL key when not needed.
 * 
 * @param ActorCommandPosition
 * @type number
 * @desc The position when inserted into an actor command.
 * Delete with the DEL key when not needed.
 * 
 * @param NormalAttackOnly
 * @type boolean
 * @default false
 * @desc Only normal attacks are made during the battle.
 * 
 * @param TargetFrontOnly
 * @parent NormalAttackOnly
 * @type boolean
 * @default false
 * @desc If only the normal attack is on, only the first enemy is targeted.
 * 
 * @param <TurnBased>
 * @desc This item is for turn-base only.
 * 
 * @param Only1Turn
 * @parent <TurnBased>
 * @type boolean
 * @default false
 * @desc Always disengage the auto-battle in one turn.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.001 自動戦闘コマンドを追加します。
 * @author 砂川赳（https://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/498941158.html
 *
 * @help 自動戦闘コマンドを追加します。
 * キャンセルキーを押すまで自動で戦闘を実行するようになります。
 * 
 * 初期状態では特徴の特殊フラグの自動戦闘と同様の挙動を取りますが、
 * 通常攻撃だけをさせることも可能です。
 * 
 * ターン制、ＴＰＢ、ＣＴＢのいずれにも対応しています。
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
 * @param CommandName
 * @text コマンド名
 * @type string
 * @default 自動戦闘
 * @desc 自動戦闘のコマンド名です。
 * 
 * @param PartyCommandPosition
 * @text パーティコマンド挿入位置
 * @type number
 * @default 1
 * @desc パーティコマンドに挿入する際の位置です。
 * 不要な場合はDELキーで削除。
 * 
 * @param ActorCommandPosition
 * @text アクターコマンド挿入位置
 * @type number
 * @desc アクターコマンドに挿入する際の位置です。
 * 不要な場合はDELキーで削除。
 * 
 * @param NormalAttackOnly
 * @text 通常攻撃のみ
 * @type boolean
 * @default false
 * @desc 自動戦闘時に通常攻撃のみを行います。
 * 
 * @param TargetFrontOnly
 * @text 先頭のみを狙う
 * @parent NormalAttackOnly
 * @type boolean
 * @default false
 * @desc 通常攻撃のみがオンの場合、先頭の敵のみを対象とします。
 * 
 * @param <TurnBased>
 * @text ＜ターン制＞
 * @desc ターン制専用の項目です。
 * 
 * @param Only1Turn
 * @text １ターンのみ実行
 * @parent <TurnBased>
 * @type boolean
 * @default false
 * @desc 自動戦闘を常に１ターンで解除します。
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

const PLUGIN_NAME = "NRP_AutoBattle";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pCommandName = setDefault(parameters["CommandName"]);
const pPartyCommandPosition = toNumber(parameters["PartyCommandPosition"]);
const pActorCommandPosition = toNumber(parameters["ActorCommandPosition"]);
const pNormalAttackOnly = toBoolean(parameters["NormalAttackOnly"], false);
const pTargetFrontOnly = toBoolean(parameters["TargetFrontOnly"], false);
const pOnly1Turn = toBoolean(parameters["Only1Turn"], false);

const SYMBOL_NAME = "autoBattle";

// ----------------------------------------------------------------------------
// Scene_Battle
// ----------------------------------------------------------------------------

/**
 * ●パーティコマンドの作成
 */
const _Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
Scene_Battle.prototype.createPartyCommandWindow = function() {
    _Scene_Battle_createPartyCommandWindow.apply(this, arguments);

    // 自動戦闘
    this._partyCommandWindow.setHandler(SYMBOL_NAME, this.commandAutoBattle.bind(this));
};

/**
 * ●アクターコマンドの作成
 */
const _Scene_Battle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
Scene_Battle.prototype.createActorCommandWindow = function() {
    _Scene_Battle_createActorCommandWindow.apply(this, arguments);

    // 自動戦闘
    this._actorCommandWindow.setHandler(SYMBOL_NAME, this.commandAutoBattle.bind(this));
};

/**
 * 【独自】自動戦闘コマンド
 */
Scene_Battle.prototype.commandAutoBattle = function() {
    BattleManager.setAutoBattleMode(true);
    this.changeInputWindow();
    // パーティコマンドの選択は解除
    this._partyCommandWindow.deselect();
};

/**
 * ●パーティコマンドの選択
 */
const _Scene_Battle_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;
Scene_Battle.prototype.startPartyCommandSelection = function() {
    // 自動戦闘時
    if (BattleManager.isAutoBattleMode()) {
        BattleManager.setAutoBattleActions();
        this.endCommandSelection();
        return;
    }

    _Scene_Battle_startPartyCommandSelection.apply(this, arguments);
};

/**
 * ●アクターコマンドの選択
 */
const _Scene_Battle_startActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
Scene_Battle.prototype.startActorCommandSelection = function() {
    // 自動戦闘時
    if (BattleManager.isAutoBattleMode()) {
        BattleManager.setAutoBattleActions();
        this.endCommandSelection();
        return;
    }

    _Scene_Battle_startActorCommandSelection.apply(this, arguments);
};

/**
 * ●更新
 */
const _Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    // 自動戦闘中の場合、かつキャンセル押下時
    if (BattleManager.isAutoBattleMode() && Input.isPressed("cancel")) {
        // 自動戦闘解除
        BattleManager.setAutoBattleMode(false);
        // キャンセルの効果音
        // ※１ターンのみ実行の場合は効果音不要
        if (!pOnly1Turn) {
            SoundManager.playCancel();
        }
    }

    _Scene_Battle_update.apply(this, arguments);
};

// ----------------------------------------------------------------------------
// BattleManager
// ----------------------------------------------------------------------------

/**
 * ●ターン終了
 */
const _BattleManager_updateTurnEnd = BattleManager.updateTurnEnd;
BattleManager.updateTurnEnd = function() {
    // １ターンのみの場合
    if (pOnly1Turn) {
        // 自動戦闘解除
        BattleManager.setAutoBattleMode(false);
    }

    _BattleManager_updateTurnEnd.apply(this, arguments);
};

/**
 * 【独自】自動戦闘の行動を設定
 */
BattleManager.setAutoBattleActions = function() {
    // ＴＰＢは即時ターン開始
    if (this.isTpb && this.isTpb()) {
        return;
    }

    // ＣＴＢの場合
    if (this._isCtb) {
        this._subject.makeAutoBattleActions();
        this.startTurn();
        return;
    }

    // ターン制の場合
    for (const member of $gameParty.members()) {
        member.makeAutoBattleActions();
    }
    this.startTurn();
};

/**
 * 【独自】自動戦闘モードの設定
 */
BattleManager.setAutoBattleMode = function(mode) {
    this._autoBattleMode = mode;
};

/**
 * 【独自】自動戦闘モードの判定
 */
BattleManager.isAutoBattleMode = function() {
    return this._autoBattleMode;
};

/**
 * ●アクターの入力キャンセル時
 */
const _BattleManager_cancelActorInput = BattleManager.cancelActorInput;
BattleManager.cancelActorInput = function() {
    // ＴＰＢかつ自動戦闘時は詠唱ポーズを解除してしまうので処理しない
    if (this.isTpb && this.isTpb() && BattleManager.isAutoBattleMode()) {
        return;
    }

    _BattleManager_cancelActorInput.apply(this, arguments);
};

// ----------------------------------------------------------------------------
// Game_BattlerBase
// ----------------------------------------------------------------------------

/**
 * ●自動戦闘かどうかの判定
 */
const _Game_BattlerBase_isAutoBattle = Game_BattlerBase.prototype.isAutoBattle;
Game_BattlerBase.prototype.isAutoBattle = function() {
    return _Game_BattlerBase_isAutoBattle.apply(this, arguments) || BattleManager.isAutoBattleMode();
};

// ----------------------------------------------------------------------------
// Game_Actor
// ----------------------------------------------------------------------------

/**
 * ●自動戦闘の行動設定
 */
const _Game_Actor_makeAutoBattleActions = Game_Actor.prototype.makeAutoBattleActions;
Game_Actor.prototype.makeAutoBattleActions = function() {
    // 元々、自動戦闘の場合、または通常時
    if (_Game_BattlerBase_isAutoBattle.apply(this, arguments) || !pNormalAttackOnly) {
        _Game_Actor_makeAutoBattleActions.apply(this, arguments);
        return;
    }

    // 通常攻撃のみ
    for (let i = 0; i < this.numActions(); i++) {
        const attackAction = new Game_Action(this);
        attackAction.setAttack();
        // 対象が先頭のみの場合
        if (pTargetFrontOnly) {
            attackAction.setTarget(0);
        // 通常時
        } else {
            attackAction.evaluate();
        }
        this.setAction(i, attackAction);
    }
    this.setActionState("waiting");
};

// ----------------------------------------------------------------------------
// Window_PartyCommand
// ----------------------------------------------------------------------------

/**
 * 【上書】パーティコマンドの生成
 */
const _Window_PartyCommand_makeCommandList = Window_PartyCommand.prototype.makeCommandList;
Window_PartyCommand.prototype.makeCommandList = function() {
    _Window_PartyCommand_makeCommandList.apply(this, arguments);

    // コマンド追加
    if (pPartyCommandPosition != null) {
        this._list.splice(pPartyCommandPosition, 0, { name: pCommandName, symbol: SYMBOL_NAME, enabled: true, ext: null});
    }
};

// ----------------------------------------------------------------------------
// Window_ActorCommand
// ----------------------------------------------------------------------------

/**
 * 【上書】アクターコマンドの生成
 */
const _Window_ActorCommand_makeCommandList = Window_ActorCommand.prototype.makeCommandList;
Window_ActorCommand.prototype.makeCommandList = function() {
    _Window_ActorCommand_makeCommandList.apply(this, arguments);

    if (this._actor) {
        // コマンド追加
        if (pActorCommandPosition != null) {
            this._list.splice(pActorCommandPosition, 0, { name: pCommandName, symbol: SYMBOL_NAME, enabled: true, ext: null});
        }
    }
};

})();
