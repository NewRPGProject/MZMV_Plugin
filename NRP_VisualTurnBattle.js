//=============================================================================
// NRP_VisalTurnBattle.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.04 Visualize the order of action in turn-based battle.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @base NRP_VisualTurn
 * @orderBefore NRP_VisualTurn
 * @url http://newrpg.seesaa.net/article/474729244.html
 *
 * @help In a turn system, the order is determined before the action is entered.
 * It allows you to visualize the sequence of actions.
 *
 * This plugin does not display order by itself.
 * Please use it in combination with NRP_VisualTurn.js.
 * http://newrpg.seesaa.net/article/472840225.html
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
 * @ Plugin Parameters
 * @-----------------------------------------------------
 * 
 * @param randomSpeed
 * @type text
 * @default 5 + a.agi / 4
 * @desc A formula to determine the degree of speed variation.
 * This value changes the order of actions each turn.
 * 
 * @param removeActedBattler
 * @type boolean
 * @default false
 * @desc A battler who has already acted hides the order.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.04 ターン制戦闘の行動順序を表示できるようにします。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @base NRP_VisualTurn
 * @orderBefore NRP_VisualTurn
 * @url http://newrpg.seesaa.net/article/474729244.html
 *
 * @help ターン制において、行動入力前に順序を決定します。
 * それにより、行動順序を可視化できるようにします。
 *
 * このプラグイン単体では順序の表示を行いません。
 * NRP_VisualTurn.jsと組み合わせて使用してください。
 * http://newrpg.seesaa.net/article/472840225.html
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
 * @param randomSpeed
 * @text 速度分散値
 * @type text
 * @default 5 + a.agi / 4
 * @desc 速度の分散度合を決める数式です。
 * 毎ターンこの値により行動順が変動します。
 * 
 * @param removeActedBattler
 * @text 行動済みで非表示
 * @type boolean
 * @default false
 * @desc 行動済みのバトラーは順序を非表示にします。
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

const parameters = PluginManager.parameters("NRP_VisualTurnBattle");
const pRandomSpeed = parameters["randomSpeed"];
const pRemoveActedBattler = toBoolean(parameters["removeActedBattler"], false);

// 重複処理を排除するための対象index
let mKeepTargetIndex = -1;

/**
 * ●コマンド入力開始
 * ※毎ターン必ず呼び出される。
 */
var _BattleManager_startInput = BattleManager.startInput;
BattleManager.startInput = function() {
    this._phase = 'input';
    
    // 敵味方全員の速度を計算する。
    this.allBattleMembers().forEach(function(a) {
        var agi = a.agi;
        var randomSpeed = agi;
        // ランダム要素を加算
        if (pRandomSpeed) {
            randomSpeed += Math.randomInt(Math.floor(eval(pRandomSpeed)));
        }
        // バトラーに保持させておく
        a._randomSpeed = randomSpeed;
    });

    // 行動順序計算
    this.makeActionOrders();

    // 元処理実行
    _BattleManager_startInput.call(this);
}

/**
 * ●行動順序計算
 */
var _BattleManager_makeActionOrders = BattleManager.makeActionOrders;
BattleManager.makeActionOrders = function() {
    _BattleManager_makeActionOrders.call(this);

    // 生存者だけに絞る
    this._actionBattlers = this._actionBattlers.filter(function(m) {
        return m.isAlive();
    });
};

if (pRemoveActedBattler) {
    /**
     * ●次の行動主体を取得。
     */
    const _BattleManager_getNextSubject = BattleManager.getNextSubject;
    BattleManager.getNextSubject = function() {
        // 行動済みのバトラーは除去していく。
        BattleManager.displayActionOrders();
        return _BattleManager_getNextSubject.apply(this, arguments);
    };
}

/**
 * ●行動速度取得
 */
var _Game_Battler_makeSpeed = Game_Battler.prototype.makeSpeed;
Game_Battler.prototype.makeSpeed = function() {
    // 行動確定前は計算済の速度を取得
    if (this._actions.length == 0) {
        this._speed = this._randomSpeed;
        return;
    }

    _Game_Battler_makeSpeed.call(this);
};

/**
 * ●行動速度の計算
 */
Game_Action.prototype.speed = function() {
    // 計算済の速度を取得
    var speed = this.subject()._randomSpeed;
    
    if (this.item()) {
        speed += this.item().speed;
    }
    if (this.isAttack()) {
        speed += this.subject().attackSpeed();
    }
    return speed;
};

/**
 * ●味方の選択時
 */
var _Window_BattleActor_prototype_select = Window_BattleActor.prototype.select;
Window_BattleActor.prototype.select = function(index) {
    _Window_BattleActor_prototype_select.apply(this, arguments);
    
    // 対象の選択が有効なら、行動予測のために行動順序再計算
    // このselect処理はなぜか重複して呼ばれるので、対象が変わった時のみ実行する
    if (index >= 0 && index != mKeepTargetIndex) {
        mKeepTargetIndex = index; // 対象を保持
        // 速度補正を考慮して順序再計算
        BattleManager.makeActionOrders();
    }
};

/**
 * ●敵の選択時
 */
var _Window_BattleEnemy_prototype_select = Window_BattleEnemy.prototype.select;
Window_BattleEnemy.prototype.select = function(index) {
    _Window_BattleEnemy_prototype_select.apply(this, arguments);
    
    // 対象の選択が有効なら、行動予測のために行動順序再計算
    // このselect処理はなぜか重複して呼ばれるので、対象が変わった時のみ実行する
    if (index >= 0 && index != mKeepTargetIndex) {
        mKeepTargetIndex = index; // 対象を保持
        // 速度補正を考慮して順序再計算
        BattleManager.makeActionOrders();
    }
};

/**
 * ●味方選択決定
 */
var _Scene_Battle_prototype_onActorOk = Scene_Battle.prototype.onActorOk;
Scene_Battle.prototype.onActorOk = function() {
    _Scene_Battle_prototype_onActorOk.call(this);
    
    // 保持対象クリア
    mKeepTargetIndex = -1;
};

/**
 * ●敵選択決定
 */
var _Scene_Battle_prototype_onEnemyOk = Scene_Battle.prototype.onEnemyOk;
Scene_Battle.prototype.onEnemyOk = function() {
    _Scene_Battle_prototype_onEnemyOk.call(this);
    
    // 保持対象クリア
    mKeepTargetIndex = -1;
};

/**
 * ●味方選択キャンセル
 */
var _Scene_Battle_prototype_onActorCancel = Scene_Battle.prototype.onActorCancel;
Scene_Battle.prototype.onActorCancel = function() {
    _Scene_Battle_prototype_onActorCancel.call(this);
    
    // 保持対象クリア
    mKeepTargetIndex = -1;
};

/**
 * ●敵選択キャンセル
 */
var _Scene_Battle_prototype_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel = function() {
    _Scene_Battle_prototype_onEnemyCancel.call(this);
    
    // 保持対象クリア
    mKeepTargetIndex = -1;
};

/**
 * ●アクター切替
 */
var _BattleManager_changeActor = BattleManager.changeActor;
BattleManager.changeActor = function(newActorIndex, lastActorActionState) {
    _BattleManager_changeActor.call(this, newActorIndex, lastActorActionState);

    // 速度補正を考慮して順序再計算
    BattleManager.makeActionOrders();
};

})();
