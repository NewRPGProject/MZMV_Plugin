//=============================================================================
// NRP_AutoState.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.021 Automatically adds the state.
 * @orderAfter NRP_StateEX
 * @author Takeshi Sunagawa (https://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/500375292.html
 *
 * @help Automatically adds the state.
 * It can be implemented as a trait of a class, equipment, enemy, etc.
 * 
 * It can also be set to always be in state
 * or only added at the start of battle.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Specify the following in the notes for
 * actor, class, enemy, skill, equipment, and state.
 * For skills, these are passive skills
 * that function only by being learned.
 * 
 * <AutoState:15>
 * A state with the specified ID is automatically added.
 * 
 * <AutoState:1 + Math.randomInt(10)>
 * Formulas can also be used.
 * The above adds 1 to 10 states at random.
 * Math.randomInt(10) means 0-9.
 * 
 * <AutoState:1,2>
 * Multiple designations are also possible.
 * 
 * <BattleStartState:99>
 * A state with the specified ID is added at the start of battle.
 * Unlike <AutoState>, the effect is interrupted.
 * Numbers and multiple designations can be specified
 * in the same way as <AutoState>.
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
 * 
 * @param AutoStateOnlyBattle
 * @type boolean
 * @default false
 * @desc Limit the effect of auto state to during battle.
 * It will no longer be reflected in the status display.
 * 
 * @param ClearStateOnDead
 * @type boolean
 * @default true
 * @desc During dead, the auto state is suspended.
 * State is re-assigned on revival.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.021 自動でステートを付加する。
 * @orderAfter NRP_StateEX
 * @author 砂川赳（https://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/500375292.html
 *
 * @help 自動的にステートを付加します。
 * 職業や装備、敵キャラなどの特徴として設定できます。
 * 
 * また、常にステートになる設定と、
 * 戦闘開始時のみ付加する設定の二通りが可能です。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * アクター、職業、敵キャラ、スキル、装備、ステートのメモ欄に
 * 以下を指定してください。
 * スキルについては、習得しているだけで機能するパッシブスキルとなります。
 * 
 * <AutoState:15>
 * 自動で指定したＩＤのステートが付加されます。
 * 
 * <AutoState:1 + Math.randomInt(10)>
 * 数式も使用できます。
 * 上記はランダムで１～１０のステートを付加します。
 * Math.randomInt(10)は０～９の意味です。
 * 
 * <AutoState:1,2>
 * 複数指定も可能です。
 * 
 * <BattleStartState:99>
 * 戦闘開始時に指定したＩＤのステートが付加されます。
 * <AutoState>とは異なり効果が途切れます。
 * 数式や複数指定も<AutoState>と同様の記述で可能です。
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
 * 
 * @param AutoStateOnlyBattle
 * @text 自動ステートを戦闘に限定
 * @type boolean
 * @default false
 * @desc 自動ステートの効果を戦闘時に限定します。
 * ステータス表示にも反映されなくなります。
 * 
 * @param ClearStateOnDead
 * @text 戦闘不能時は停止
 * @type boolean
 * @default true
 * @desc 戦闘不能中は自動ステートを停止します。
 * 蘇生時に再びステートが付与されます。
 * 
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

const PLUGIN_NAME = "NRP_AutoState";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pAutoStateOnlyBattle = toBoolean(parameters["AutoStateOnlyBattle"], false);
const pClearStateOnDead = toBoolean(parameters["ClearStateOnDead"], true);

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
// Game_BattlerBase
//-----------------------------------------------------------------------------

/**
 * 【独自】自動ステートの更新
 */
Game_BattlerBase.prototype.updateAutoStates = function() {
    // アクターかつ装備が読み込まれていない段階ではエラーになるので処理しない。
    if (this.equips && !this._equips) {
        return;
    }

    // 戦闘不能時は無効。
    if (pClearStateOnDead) {
        if (this.isDead() || this.hp === 0) {
            return;
        }
    }

    // 変数初期化
    if (!this._autoStateIds) {
        this._autoStateIds = [];
    }
    
    // 特徴を持つオブジェクトを取得
    let traitObjects = this.traitObjects();

    // スキルが有効な場合はパッシブスキルとして連結
    // ※通常はアクターのみ
    if (this.skills) {
        traitObjects = traitObjects.concat(this.skills());
    }

    // ステートチェック用の配列
    const autoStateIds = [];

    // eval用
    const a = this;

    // オブジェクト毎にループ
    for (const object of traitObjects) {
        // 無効なら終了
        if (object == null || !object.meta.AutoState) {
            continue;
        }
        
        // 対象のステートが存在する場合
        const equipStates = makeArray(object.meta.AutoState);
        for (let stateId of equipStates) {
            // 文字列形式なので数値変換
            stateId = eval(stateId);
            autoStateIds.push(stateId);

            // ステートが有効な場合は追加
            // ※循環参照を避けるためaddStateは使わない。
            if (this.isStateAddable(stateId)) {
                if (!this.isStateAffected(stateId)) {
                    this.addNewState(stateId);
                }
                this.resetStateCounts(stateId);
            }
        }
    }

    // 以前の自動ステートをチェック
    for (const stateId of this._autoStateIds) {
        // 解除されたのならステート除去
        if (!autoStateIds.includes(stateId)) {
            this.eraseState(stateId);
        }
    }

    this._autoStateIds = autoStateIds;
};

/**
 * ●ステートのクリア
 */
const _Game_BattlerBase_clearStates = Game_BattlerBase.prototype.clearStates;
Game_BattlerBase.prototype.clearStates = function() {
    _Game_BattlerBase_clearStates.apply(this, arguments);

    // 戦闘時以外は無効の場合
    if (pAutoStateOnlyBattle && !$gameParty.inBattle()) {
        return;
    }

    // 自動ステートの更新
    this.updateAutoStates();
};

//-----------------------------------------------------------------------------
// Game_Battler
//-----------------------------------------------------------------------------

/**
 * ●リフレッシュ
 */
const _Game_Battler_refresh = Game_Battler.prototype.refresh;
Game_Battler.prototype.refresh = function() {
    _Game_Battler_refresh.apply(this, arguments);

    // 戦闘時以外は無効の場合
    if (pAutoStateOnlyBattle && !$gameParty.inBattle()) {
        return;
    }

    // 自動ステートの更新
    this.updateAutoStates();
};

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

    // 戦闘時以外は無効の場合
    if (pAutoStateOnlyBattle) {
        // このタイミングで自動ステートの更新
        this.updateAutoStates();
    }
    
    _Game_Battler_onBattleStart.apply(this, arguments);
};

//-----------------------------------------------------------------------------
// Game_Interpreter
//-----------------------------------------------------------------------------

/**
 * ●スキルの増減
 */
const _Game_Interpreter_command318 = Game_Interpreter.prototype.command318;
Game_Interpreter.prototype.command318 = function(params) {
    const ret = _Game_Interpreter_command318.apply(this, arguments);

    // 戦闘時以外も有効かつ戦闘中以外の場合
    // ※戦闘中は都度refreshが走るので不要
    if (ret && !pAutoStateOnlyBattle && !$gameParty.inBattle()) {
        this.iterateActorEx(params[0], params[1], actor => {
            // 自動ステートの更新
            actor.updateAutoStates();
        });
    }
    return ret;
};

})();
