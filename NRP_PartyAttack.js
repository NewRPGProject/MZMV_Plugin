//=============================================================================
// NRP_PartyAttack.js
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc v1.00 Realize changes in the target side (such as friendly fire).
 * @orderAfter NRP_BattleTargetCursor
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/482791611.html
 *
 * @help Allows you to use attacks, skills,
 * and items on a different target side than normal during battle.
 * 
 * For example, you can attack an ally or heal an enemy.
 * 
 * ■Usage
 * Just by installing it, switching the target side will be enabled.
 * In the initial state, the target side is switched by PageUp/Down.
 * (This is equivalent to the LR button on a gamepad.)
 * 
 * ■Note on skills (items)
 * You can disable or enable changes to the target side for each skill.
 * Please specify the following in the note field of the skill
 * 
 * <PermitSideChange:true>  : Enable ("true" can be omitted)
 * <PermitSideChange:false> : Disable
 * 
 * ※The item's note field is valid as well.
 * ※If not specified, it will follow the setting
 *   of "EnableAllSkills" in the plugin parameters.
 * 
 * ■Notice
 * Depending on the plugin parameters,
 * you can set the left/right key (assuming side view)
 * or up/down key (assuming front view) to switch the target side.
 * 
 * However, even if you turn on "ChangeSideByLeftRight" or "ChangeSideByUpDown",
 * the behavior will be uncomfortable by itself.
 * This is because it is supposed to be used
 * in combination with NRP_BattleTargetCursor.
 * 
 * For example, if you turn on "ChangeSideByLeftRight",
 * you should be able to switch the target up and down.
 * If you want to turn on "ChangeSideByUpDown", please do the opposite.
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 * 
 * @param EnableAllSkills
 * @type boolean
 * @default true
 * @desc Enable target side change for all skills.
 * You can specify exceptions in the Notes field.
 * 
 * @param ChangeSideByPageUpDown
 * @type boolean
 * @default true
 * @desc The target side can be switched by PageUp/Down.
 *
 * @param ChangeSideByLeftRight
 * @type boolean
 * @default false
 * @desc The target side can be switched by Left/Right.
 * Combination with NRP_BattleTargetCursor is recommended.
 *
 * @param ChangeSideByUpDown
 * @type boolean
 * @default false
 * @desc The target side can be switched by Up/Down.
 * Combination with NRP_BattleTargetCursor is recommended.
 * 
 * @param KeepWindow
 * @type boolean
 * @default false
 * @desc Keeps the window visible.
 * In other words, do not hide the Actor/Enemy window.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 対象サイドの変更（パーティアタックなど）を実現します。
 * @orderAfter NRP_BattleTargetCursor
 * @author 砂川赳 (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/482791611.html
 *
 * @help 戦闘時、通常とは異なる対象サイドへ、
 * 攻撃やスキル、アイテムを使用できるようにします。
 * 
 * 例えば、味方を攻撃したり、敵を回復したりできます。
 * 
 * ■使用法
 * 導入するだけで対象サイドの切替が有効となります。
 * 初期状態ではPageUp/Downで対象サイドを切り替えます。
 * （ゲームパッドではいわゆるＬＲボタンに相当）
 * 
 * ■スキル（アイテム）のメモ欄
 * スキル毎に対象サイドの変更を無効化または有効化できます。
 * スキルのメモ欄に以下を指定してください。
 * 
 * <PermitSideChange:true>  : 有効化（trueは省略可）
 * <PermitSideChange:false> : 無効化
 * 
 * ※アイテムのメモ欄も同様に有効です。
 * ※指定がない場合はプラグインパラメータにある
 * 　『全スキルを有効化』の設定に従います。
 * 
 * ■注意点
 * プラグインパラメータによって、左右キー（サイドビューを想定）や
 * 上下キー（フロントビューを想定）で、
 * 対象サイドを切り替えられるように設定できます。
 * 
 * ただし『左右でサイド切替』および『上下でサイド切替』をオンにしても、
 * それだけでは違和感のある挙動になります。
 * これはNRP_BattleTargetCursorとの組み合わせを想定しているためです。
 * 
 * 例えば『左右でサイド切替』をオンにする場合は、
 * 上下で対象を切り替えられるようにしてください。
 * 『上下でサイド切替』をオンにする場合はその逆です。
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param EnableAllSkills
 * @text 全スキルを有効化
 * @type boolean
 * @default true
 * @desc 全てのスキルで対象サイドの変更を有効とします。
 * メモ欄で例外を指定できます。
 * 
 * @param ChangeSideByPageUpDown
 * @text PageUp/Downでサイド切替
 * @type boolean
 * @default true
 * @desc PageUp/Downによって対象サイドの切り替えを行います。
 *
 * @param ChangeSideByLeftRight
 * @text 左右でサイド切替
 * @type boolean
 * @default false
 * @desc 左右キーによって対象サイドの切り替えを行います。
 * NRP_BattleTargetCursorとの組み合わせを推奨します。
 *
 * @param ChangeSideByUpDown
 * @text 上下でサイド切替
 * @type boolean
 * @default false
 * @desc 上下キーによって対象サイドの切り替えを行います。
 * NRP_BattleTargetCursorとの組み合わせを推奨します。
 * 
 * @param KeepWindow
 * @text ウィンドウ表示を維持
 * @type boolean
 * @default false
 * @desc ウィンドウの表示を維持します。
 * つまり、アクター・エネミーウィンドウを非表示にしません。
 */

(function() {
"use strict";

/**
 * バージョン互換対応
 */
if (!Array.prototype.find) {
    Array.prototype.find = function (predicate) {
        if (this === null) {
            throw new TypeError('Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return value;
            }
        }
        return undefined;
    };
}

function toBoolean(val, def) {
    // 空白なら初期値を返す
    if (val === "" || val === undefined) {
        return def;
        
    // 既にboolean型なら、そのまま返す
    } else if (typeof val === "boolean") {
        return val;
    }
    // 文字列ならboolean型に変換して返す
    return val.toLowerCase() == "true";
}
function toNumber(str, def) {
    if (str == undefined || str == "") {
        return def;
    }
    return isNaN(str) ? def : +(str || def);
}
function setDefault(str, def) {
    return str ? str : def;
}

const parameters = PluginManager.parameters("NRP_PartyAttack");

const pEnableAllSkills = toBoolean(parameters["EnableAllSkills"], true);
const pChangeSideByPageUpDown = toBoolean(parameters["ChangeSideByPageUpDown"], true);
const pChangeSideByLeftRight = toBoolean(parameters["ChangeSideByLeftRight"], false);
const pChangeSideByUpDown = toBoolean(parameters["ChangeSideByUpDown"], false);
const pKeepWindow = toBoolean(parameters["KeepWindow"], false);

//----------------------------------------
// 共通処理（Scene_Battle）
//----------------------------------------

let mNoUpdateStatusWindowPosition = false;

/**
 * 【独自】敵からアクターへ対象サイド変更
 */
Scene_Battle.prototype.targetSideChangeToActor = function() {
    const action = BattleManager.inputtingAction();

    // 対象サイドの変更禁止ならば処理しない
    if (!action.isTargetSideChangeOk()) {
        // そのままウィンドウを有効化して操作継続
        this._enemyWindow.activate();
        return;
    }

    // 対象サイドを反転
    action.setReverseTargetSide();

    this._enemyWindow.hide();
    this._enemyWindow.select(null);
    this._enemyWindow.deactivate();

    // ＭＺの場合
    if (this.startActorSelection) {
        this.startActorSelection();
    // ＭＶの場合
    } else if (this.selectActorSelection) {
        this.selectActorSelection();
    }

    // ウィンドウ表示を保持する場合
    if (pKeepWindow && action.isReverseTargetSide()) {
        this._enemyWindow.show();
        this._enemyWindow.deselect();
        this._actorWindow.x = Graphics.width * 2;
    }
}

/**
 * 【独自】アクターから敵へ対象サイド変更
 */
Scene_Battle.prototype.targetSideChangeToEnemy = function() {
    const action = BattleManager.inputtingAction();

    // 対象サイドの変更禁止ならば処理しない
    if (!action.isTargetSideChangeOk()) {
        // そのままウィンドウを有効化して操作継続
        this._actorWindow.activate();
        return;
    }

    // 対象サイドを反転
    action.setReverseTargetSide();

    this._actorWindow.hide();
    this._actorWindow.select(null);
    this._actorWindow.deactivate();

    // ＭＺとＭＶで関数名が異なるので考慮
    if (this.startEnemySelection) {
        this.startEnemySelection();
    } else if (this.selectEnemySelection) {
        this.selectEnemySelection();
    }

    // ウィンドウ表示を保持する場合
    if (pKeepWindow && action.isReverseTargetSide()) {
        this._actorWindow.show();
        this._actorWindow.deselect();
        this._enemyWindow.x = Graphics.width * 2;
    }
}

// ウィンドウ表示を保持する場合
if (pKeepWindow) {
    // ＭＺ用の関数
    if (Scene_Battle.prototype.startActorSelection) {
        const _Scene_Battle_startActorSelection = Scene_Battle.prototype.startActorSelection;
        Scene_Battle.prototype.startActorSelection = function() {
            _Scene_Battle_startActorSelection.apply(this, arguments);

            const rect = this.actorWindowRect();
            this._actorWindow.x = rect.x;
        };
    }
    // ＭＺ用の関数
    if (Scene_Battle.prototype.startEnemySelection) {
        const _Scene_Battle_startEnemySelection = Scene_Battle.prototype.startEnemySelection;
        Scene_Battle.prototype.startEnemySelection = function() {
            _Scene_Battle_startEnemySelection.apply(this, arguments);

            const rect = this.enemyWindowRect();
            this._enemyWindow.x = rect.x;
        };
    }
}

/**
 * ●アクターの選択をキャンセル
 */
const _Scene_Battle_onActorCancel = Scene_Battle.prototype.onActorCancel;
Scene_Battle.prototype.onActorCancel = function() {
    // 対象サイドの反転をクリア
    const action = BattleManager.inputtingAction();
    action.clearReverseTargetSide();

    _Scene_Battle_onActorCancel.apply(this, arguments);

    // ウィンドウの移動を停止
    // ※パーティコマンド用の処理の影響で、わずかな移動が発生するので制御
    mNoUpdateStatusWindowPosition = true;
};

/**
 * ●エネミーの選択をキャンセル
 */
const _Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel = function() {
    const action = BattleManager.inputtingAction();

    // 対象サイドが反転されている場合、アクターウィンドウを非表示
    if (pKeepWindow && action.isReverseTargetSide()) {
        this._actorWindow.hide();
    }

    // 対象サイドの反転をクリア
    action.clearReverseTargetSide();

    _Scene_Battle_onEnemyCancel.apply(this, arguments);
};

/**
 * ●【ＭＺ】ステータスウィンドウの位置更新
 * ※ＭＶでは不要な制御
 */
if (Scene_Battle.prototype.updateStatusWindowPosition) {
    const _Scene_Battle_updateStatusWindowPosition = Scene_Battle.prototype.updateStatusWindowPosition;
    Scene_Battle.prototype.updateStatusWindowPosition = function() {
        // ウィンドウを移動しない。
        if (mNoUpdateStatusWindowPosition) {
            return;
        }

        _Scene_Battle_updateStatusWindowPosition.apply(this, arguments);
    }
}

/**
 * ●アクターコマンド入力開始
 */
const _Scene_Battle_startActorCommandSelection = Scene_Battle.prototype.startActorCommandSelection;
Scene_Battle.prototype.startActorCommandSelection = function() {
    _Scene_Battle_startActorCommandSelection.apply(this, arguments);

    // ウィンドウの移動禁止を解除
    mNoUpdateStatusWindowPosition = false;
};

//----------------------------------------
// 共通処理（Game_Action）
//----------------------------------------

/**
 * 【独自】対象の反転
 */
Game_Action.prototype.setReverseTargetSide = function() {
    this._isReverseTargetSide = !this._isReverseTargetSide;
};

/**
 * 【独自】対象が反転されているか？
 */
Game_Action.prototype.isReverseTargetSide = function() {
    return !!this._isReverseTargetSide;
};

/**
 * 【独自】対象の反転をクリア
 */
Game_Action.prototype.clearReverseTargetSide = function() {
    this._isReverseTargetSide = false;
};

/**
 * 【独自】対象サイドを変更できるか？
 */
Game_Action.prototype.isTargetSideChangeOk = function() {
    // スキル（アイテム）のメモ欄にある<PermitSideChange>を参照
    const permitSideChange = toBoolean(this.item().meta.PermitSideChange);
    if (permitSideChange === true) {
        return true;
    } else if (permitSideChange === false) {
        return false;
    }

    // 指定がない場合はプラグインパラメータの設定
    return pEnableAllSkills;
};

// 無限循環阻止用のフラグ
let noReverse = false;

/**
 * ●対象が敵
 */
const _Game_Action_isForOpponent = Game_Action.prototype.isForOpponent;
Game_Action.prototype.isForOpponent = function() {
    // 対象サイド反転
    if (this.isReverseTargetSide() && !noReverse) {
        // isForFriendと同じ値を返す。
        noReverse = true;
        const ret = this.isForFriend();
        noReverse = false;
        return ret;
    }

    return _Game_Action_isForOpponent.apply(this, arguments);;
};

/**
 * ●対象が味方
 */
const _Game_Action_isForFriend = Game_Action.prototype.isForFriend;
Game_Action.prototype.isForFriend = function() {
    // 対象サイド反転
    if (this.isReverseTargetSide() && !noReverse) {
        // isForOpponentと同じ値を返す。
        noReverse = true;
        const ret = this.isForOpponent();
        noReverse = false;
        return ret;
    }

    return _Game_Action_isForFriend.apply(this, arguments);
};

/**
 * ●対象が味方の生存者
 */
const _Game_Action_isForAliveFriend = Game_Action.prototype.isForAliveFriend;
Game_Action.prototype.isForAliveFriend = function() {
    // 対象サイド反転
    if (this.isReverseTargetSide() && !noReverse) {
        // isForOpponentと同じ値を返す。
        // ※isForAliveOpponentは存在しない。
        noReverse = true;
        const ret = this.isForOpponent();
        noReverse = false;
        return ret;
    }

    return _Game_Action_isForAliveFriend.apply(this, arguments);
};

//----------------------------------------
// PageUp/Downによる切替
//----------------------------------------

if (pChangeSideByPageUpDown) {
    /**
     * ●敵ウィンドウの生成
     */
    const _Scene_Battle_createEnemyWindow = Scene_Battle.prototype.createEnemyWindow;
    Scene_Battle.prototype.createEnemyWindow = function() {
        _Scene_Battle_createEnemyWindow.apply(this, arguments);

        this._enemyWindow.setHandler("pageup", this.targetSideChangeToActor.bind(this));
        this._enemyWindow.setHandler("pagedown", this.targetSideChangeToActor.bind(this));
    };

    /**
     * ●アクターウィンドウの生成
     */
    const _Scene_Battle_createActorWindow = Scene_Battle.prototype.createActorWindow;
    Scene_Battle.prototype.createActorWindow = function() {
        _Scene_Battle_createActorWindow.apply(this, arguments);

        this._actorWindow.setHandler("pageup", this.targetSideChangeToEnemy.bind(this));
        this._actorWindow.setHandler("pagedown", this.targetSideChangeToEnemy.bind(this));
    };
}

//----------------------------------------
// カーソル左右による切替
//----------------------------------------

if (pChangeSideByLeftRight) {
    /**
     * 【独自】カーソル右移動
     */
    Window_BattleEnemy.prototype.cursorRight = function(wrap) {
        // 対象サイドを変更
        SceneManager._scene.targetSideChangeToActor();
    };

    /**
     * 【独自】カーソル左移動
     */
    Window_BattleActor.prototype.cursorLeft = function(wrap) {
        // 対象サイドを変更
        SceneManager._scene.targetSideChangeToEnemy();
    };
}

//----------------------------------------
// カーソル上下による切替
//----------------------------------------

if (pChangeSideByUpDown) {
    /**
     * 【上書】カーソル下移動
     */
    Window_BattleEnemy.prototype.cursorDown = function() {
        // 対象サイドを変更
        SceneManager._scene.targetSideChangeToActor();
    };

    /**
     * 【上書】カーソル上移動
     */
    Window_BattleActor.prototype.cursorUp = function() {
        // 対象サイドを変更
        SceneManager._scene.targetSideChangeToEnemy();
    };
}

})();
