//=============================================================================
// NRP_PartyAttack.js
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc v1.02 Realize changes in the target side (such as friendly fire).
 * @orderAfter NRP_BattleTargetCursor
 * @orderBefore NRP_VisualTurn
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/482791611.html
 *
 * @help Allows you to use attacks, skills,
 * and items on a different target side than normal during battle.
 * 
 * For example, you can attack an ally or heal an enemy.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Just by installing it, switching the target side will be enabled.
 * In the initial state, the target side is switched by PageUp/Down.
 * (This is equivalent to the LR button on a gamepad.)
 * 
 * By default, skills with a range of All or Random will not show
 * the target selection window, so you cannot change the side.
 * By turning on the "AlwaysSelection" parameter,
 * you can make those skills switch the target side as well.
 * 
 * -------------------------------------------------------------------
 * [Note on skills (items)]
 * -------------------------------------------------------------------
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
 * -------------------------------------------------------------------
 * [Notice]
 * -------------------------------------------------------------------
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
 * @param EnableAllSkills
 * @type boolean
 * @default true
 * @desc Enable target side change for all skills.
 * You can specify exceptions in the Notes field.
 * 
 * @param EnableTouch
 * @type boolean
 * @default true
 * @desc Enable to change the target side by touch operation.
 * 
 * @param <Selection>
 * 
 * @param AlwaysSelection
 * @parent <Selection>
 * @type boolean
 * @default false
 * @desc Show the target selection even for skills with a range such as whole. This will enable target side switching.
 * 
 * @param UserSelection
 * @parent <Selection>
 * @type boolean
 * @default false
 * @desc Displays a selection of targets, even for skills with a User range.
 * 
 * @param EveryoneSelection
 * @parent <Selection>
 * @type boolean
 * @default false
 * @desc Displays a selection of targets, even for skills with a range of Everyone.
 * 
 * @param <ChangeSideKey>
 * 
 * @param ChangeSideByPageUpDown
 * @parent <ChangeSideKey>
 * @type boolean
 * @default true
 * @desc The target side can be switched by PageUp/Down.
 *
 * @param ChangeSideByLeftRight
 * @parent <ChangeSideKey>
 * @type boolean
 * @default false
 * @desc The target side can be switched by Left/Right.
 * Combination with NRP_BattleTargetCursor is recommended.
 *
 * @param ChangeSideByUpDown
 * @parent <ChangeSideKey>
 * @type boolean
 * @default false
 * @desc The target side can be switched by Up/Down.
 * Combination with NRP_BattleTargetCursor is recommended.
 * 
 * @param <Other>
 * 
 * @param KeepWindow
 * @parent <Other>
 * @type boolean
 * @default false
 * @desc Keeps the window visible.
 * In other words, do not hide the Actor/Enemy window.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.02 対象サイドの変更（パーティアタックなど）を実現します。
 * @orderAfter NRP_BattleTargetCursor
 * @orderBefore NRP_VisualTurn
 * @author 砂川赳 (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/482791611.html
 *
 * @help 戦闘時、通常とは異なる対象サイドへ、
 * 攻撃やスキル、アイテムを使用できるようにします。
 * 
 * 例えば、味方を攻撃したり、敵を回復したりできます。
 * 
 * -------------------------------------------------------------------
 * ■使用法
 * -------------------------------------------------------------------
 * 導入するだけで対象サイドの切替が有効となります。
 * 初期状態ではPageUp/Downで対象サイドを切り替えます。
 * （ゲームパッドではいわゆるＬＲボタンに相当）
 * 
 * 初期状態では範囲が全体やランダムのスキルは、
 * 対象選択のウィンドウが表示されないため、サイドを変更できません。
 * 『常に選択を表示』のパラメータをオンにすることで、
 * それらのスキルも対象サイドを切り替えられるようにできます。
 * 
 * -------------------------------------------------------------------
 * ■スキル（アイテム）のメモ欄
 * -------------------------------------------------------------------
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
 * -------------------------------------------------------------------
 * ■注意点
 * -------------------------------------------------------------------
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
 * -------------------------------------------------------------------
 * ■利用規約
 * -------------------------------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @------------------------------------------------------------------
 * @ Plugin Parameters
 * @------------------------------------------------------------------
 * @param EnableAllSkills
 * @text 全スキルを有効化
 * @type boolean
 * @default true
 * @desc 全てのスキルで対象サイドの変更を有効とします。
 * メモ欄で例外を指定できます。
 * 
 * @param EnableTouch
 * @text タッチ操作を有効化
 * @type boolean
 * @default true
 * @desc タッチ操作による対象サイドの変更を有効とします。
 * 
 * @param <Selection>
 * @text ＜選択の表示＞
 * 
 * @param AlwaysSelection
 * @parent <Selection>
 * @text 常に選択を表示
 * @type boolean
 * @default false
 * @desc 範囲が全体などのスキルにおいても、対象の選択を表示します。
 * これにより、対象サイドの切替を有効とします。
 * 
 * @param UserSelection
 * @parent <Selection>
 * @text 使用者も選択を表示
 * @type boolean
 * @default false
 * @desc 範囲が使用者のスキルにおいても、対象の選択を表示します。
 * 
 * @param EveryoneSelection
 * @parent <Selection>
 * @text 敵味方全体も選択を表示
 * @type boolean
 * @default false
 * @desc 範囲が敵味方全体のスキルにおいても、対象の選択を表示します。
 * 
 * @param <ChangeSideKey>
 * @text ＜対象サイドの切替キー＞
 * 
 * @param ChangeSideByPageUpDown
 * @parent <ChangeSideKey>
 * @text PageUp/Downでサイド切替
 * @type boolean
 * @default true
 * @desc PageUp/Downによって対象サイドの切り替えを行います。
 *
 * @param ChangeSideByLeftRight
 * @parent <ChangeSideKey>
 * @text 左右でサイド切替
 * @type boolean
 * @default false
 * @desc 左右キーによって対象サイドの切り替えを行います。
 * NRP_BattleTargetCursorとの組み合わせを推奨します。
 *
 * @param ChangeSideByUpDown
 * @parent <ChangeSideKey>
 * @text 上下でサイド切替
 * @type boolean
 * @default false
 * @desc 上下キーによって対象サイドの切り替えを行います。
 * NRP_BattleTargetCursorとの組み合わせを推奨します。
 * 
 * @param <Other>
 * @text ＜その他＞
 * 
 * @param KeepWindow
 * @parent <Other>
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
const pEnableTouch = toBoolean(parameters["EnableTouch"], true);
const pAlwaysSelection = toBoolean(parameters["AlwaysSelection"], false);
const pUserSelection = toBoolean(parameters["UserSelection"], false);
const pEveryoneSelection = toBoolean(parameters["EveryoneSelection"], false);
const pChangeSideByPageUpDown = toBoolean(parameters["ChangeSideByPageUpDown"], true);
const pChangeSideByLeftRight = toBoolean(parameters["ChangeSideByLeftRight"], false);
const pChangeSideByUpDown = toBoolean(parameters["ChangeSideByUpDown"], false);
const pKeepWindow = toBoolean(parameters["KeepWindow"], false);

//-----------------------------------------------------------------------------
// 共通処理（Scene_Battle）
//-----------------------------------------------------------------------------

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
        return false;
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

    // サイド変更成功
    return true;
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
        return false;
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

    // サイド変更成功
    return true;
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

/**
 * ●コマンドキャンセル時
 */
const _Scene_Battle_commandCancel = Scene_Battle.prototype.commandCancel;
Scene_Battle.prototype.commandCancel = function() {
    _Scene_Battle_commandCancel.apply(this, arguments);

    // 対象の反転状態をクリア
    const action = BattleManager.inputtingAction();
    if (action) {
        action.clearReverseTargetSide();
    }
};

//-----------------------------------------------------------------------------
// 共通処理（Game_Action）
//-----------------------------------------------------------------------------

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
    // 対象が自分、敵味方全体ならば無効
    if (this.isForUser() || this.isForEveryone()) {
        return false;

    // NRP_SkillRangeEX連携時（mainTargetAllIfを想定）ならば無効
    } else if (existMainTargetAllIf(this)) {
        return false;
    }

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

/**
 * ●仲間向けの対象取得
 */
const _Game_Action_targetsForFriends = Game_Action.prototype.targetsForFriends;
Game_Action.prototype.targetsForFriends = function() {
    // 仲間向けはランダム対象が存在しないので追加
    if (this.isForRandom()) {
        const unit = this.friendsUnit();
        return this.randomTargets(unit);
    }

    return _Game_Action_targetsForFriends.apply(this, arguments);
};

/**
 * ●ＭＶには存在しない関数なので追加
 */
if (!Game_Action.prototype.isForEveryone) {
    Game_Action.prototype.isForEveryone = function() {
        return this.checkItemScope([14]);
    };
}

//-----------------------------------------------------------------------------
// PageUp/Downによる切替
//-----------------------------------------------------------------------------

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

//-----------------------------------------------------------------------------
// カーソル左右による切替
//-----------------------------------------------------------------------------

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

//-----------------------------------------------------------------------------
// カーソル上下による切替
//-----------------------------------------------------------------------------

if (pChangeSideByUpDown) {
    /**
     * 【上書】カーソル下移動
     */
    Window_BattleEnemy.prototype.cursorDown = function(wrap) {
        // 対象サイドを変更
        SceneManager._scene.targetSideChangeToActor();
    };

    /**
     * 【上書】カーソル上移動
     */
    Window_BattleActor.prototype.cursorUp = function(wrap) {
        // 対象サイドを変更
        SceneManager._scene.targetSideChangeToEnemy();
    };
}

//-----------------------------------------------------------------------------
// 常に選択を表示
//-----------------------------------------------------------------------------

if (pAlwaysSelection) {
    /**
     * 【上書】選択が必要かどうか？
     */
    Game_Action.prototype.needsSelection = function() {
        // 防御は除外
        if (this.isGuard()) {
            return false;

        // 使用者を除外する場合
        } else if (!pUserSelection && this.isForUser()) {
            return false;

        // 敵味方全体を除外する場合
        } else if (!pEveryoneSelection && this.isForEveryone()) {
            return false;
        }

        // それ以外は要選択
        return true;
    };

    /**
     * 【ＭＺ】アクターの選択開始
     */
    if (Scene_Battle.prototype.startActorSelection) {
        const _Scene_Battle_startActorSelection2 = Scene_Battle.prototype.startActorSelection;
        Scene_Battle.prototype.startActorSelection = function() {
            this._actorWindow.setCursorAll(false);

            _Scene_Battle_startActorSelection2.apply(this, arguments);

            selectActorEX(this._actorWindow);
        };

    /**
     * 【ＭＶ】アクターの選択開始
     */
    } else if (Scene_Battle.prototype.selectActorSelection) {
        const _Scene_Battle_selectActorSelection2 = Scene_Battle.prototype.selectActorSelection;
        Scene_Battle.prototype.selectActorSelection = function() {
            this._actorWindow.setCursorAll(false);

            _Scene_Battle_selectActorSelection2.apply(this, arguments);

            selectActorEX(this._actorWindow);
        };
    }

    /**
     * 【ＭＺ】エネミーの選択開始
     */
    if (Scene_Battle.prototype.startEnemySelection) {
        const _Scene_Battle_startEnemySelection2 = Scene_Battle.prototype.startEnemySelection;
        Scene_Battle.prototype.startEnemySelection = function() {
            this._enemyWindow.setCursorAll(false);

            _Scene_Battle_startEnemySelection2.apply(this, arguments);

            selectEnemyEX(this._enemyWindow);
        };

    /**
     * 【ＭＶ】エネミーの選択開始
     */
    } else if (Scene_Battle.prototype.selectEnemySelection) {
        const _Scene_Battle_selectEnemySelection2 = Scene_Battle.prototype.selectEnemySelection;
        Scene_Battle.prototype.selectEnemySelection = function() {
            this._enemyWindow.setCursorAll(false);

            _Scene_Battle_selectEnemySelection2.apply(this, arguments);

            selectEnemyEX(this._enemyWindow);
        };
    }

    /**
     * ●味方の選択時
     */
    const _Window_BattleActor_prototype_select = Window_BattleActor.prototype.select;
    Window_BattleActor.prototype.select = function(index) {
        _Window_BattleActor_prototype_select.apply(this, arguments);

        selectActorEX(this);
    }
    
    /**
     * ●敵の選択時
     */
    const _Window_BattleEnemy_prototype_select = Window_BattleEnemy.prototype.select;
    Window_BattleEnemy.prototype.select = function(index) {
        _Window_BattleEnemy_prototype_select.apply(this, arguments);

        selectEnemyEX(this);
    }

    /**
     * ●カーソル移動を許可するか？
     */
    const _Window_BattleActor_isCursorMovable = Window_BattleActor.prototype.isCursorMovable;
    Window_BattleActor.prototype.isCursorMovable = function() {
        const action = BattleManager.inputtingAction();
        if (action && action.item()) {
            // 対象が自分の場合は無効
            if (action.isForUser()) {
                return false;
            // NRP_SkillRangeEX連携時（mainTargetAllIfを想定）
            } else if (existMainTargetAllIf(action)) {
                return false;
            }
        }
        
        // 全体選択時
        if (this._cursorAll) {
            // 一時的に解除
            this._cursorAll = false;
            const isCursorMovable = _Window_BattleActor_isCursorMovable.apply(this, arguments);
            this._cursorAll = true;
            return isCursorMovable;
        }

        return _Window_BattleActor_isCursorMovable.apply(this, arguments);
    };

    /**
     * ●カーソル移動を許可するか？
     */
    const _Window_BattleEnemy_isCursorMovable = Window_BattleEnemy.prototype.isCursorMovable;
    Window_BattleEnemy.prototype.isCursorMovable = function() {
        const action = BattleManager.inputtingAction();
        if (action && action.item()) {
            // 対象が自分の場合は無効
            if (action.isForUser()) {
                return false;
            // NRP_SkillRangeEX連携時（mainTargetAllIfを想定）
            } else if (existMainTargetAllIf(action)) {
                return false;
            }
        }
        
        // 全体選択時
        if (this._cursorAll) {
            // 一時的に解除
            this._cursorAll = false;
            const isCursorMovable = _Window_BattleEnemy_isCursorMovable.apply(this, arguments);
            this._cursorAll = true;
            return isCursorMovable;
        }

        return _Window_BattleEnemy_isCursorMovable.apply(this, arguments);
    };

    /**
     * ●全体時のカーソル表示
     * ※Window_Selectableの関数をオーバライド
     * ※通常、この関数は一列のリストしか想定していないらしく、
     * 　二列のウィンドウに適用すると正しく表示されない。
     * 　そこで修正を行う。
     */
    Window_BattleEnemy.prototype.refreshCursorForAll = function() {
        const maxItems = this.maxItems();
        if (maxItems > 0) {
            const rect = this.itemRect(0);

            // 選択位置の末尾を求める
            let lastIndex = maxItems;
            // 列数の倍数（標準は二列）に拡張する。
            if (lastIndex % this.maxCols() != 0) {
                lastIndex = lastIndex - lastIndex % this.maxCols() + this.maxCols();
            }
            lastIndex -= 1;

            rect.enlarge(this.itemRect(lastIndex));
            this.setCursorRect(rect.x, rect.y, rect.width, rect.height);
        } else {
            this.setCursorRect(0, 0, 0, 0);
        }
    };
}

/**
 * ●敵の選択拡張
 */
function selectEnemyEX(window) {
    const action = BattleManager.inputtingAction();
    if (!action || !action.item()) {
        return;
    }

    // 対象が敵味方全体の場合
    if (action.isForEveryone()) {
        window.setCursorAll(true);
        // 全バトラーを選択し、白点滅状態に
        for (const member of BattleManager.allBattleMembers()) {
            member.select();
        }

    // NRP_SkillRangeEX連携時（mainTargetAllIfを想定）
    } else if (existMainTargetAllIf(action)) {
        // メインターゲットを選択し、白点滅状態に
        window._index = BattleManager._mainTarget.index();
        if (window.refreshCursor) {
            window.refreshCursor();
        }
        window.callUpdateHelp();
        return;

    // 対象が全体／ランダムの場合
    } else if (action.isForAll() || action.isForRandom()) {
        window.setCursorAll(true);
        // バトラーを選択し、白点滅状態に
        for (const member of $gameTroop.members()) {
            member.select();
        }
        for (const member of $gameParty.members()) {
            member.deselect();
        }
    }
}

/**
 * ●アクターの選択拡張
 */
function selectActorEX(window) {
    const action = BattleManager.inputtingAction();
    if (!action || !action.item()) {
        return;
    }

    // 対象が自分の場合
    if (action.isForUser()) {
        // 自分を選択し、白点滅状態に
        window._index = action.subject().index();
        if (window.refreshCursor) {
            window.refreshCursor();
        }
        window.callUpdateHelp();
        action.subject().select();

    // 対象が敵味方全体の場合
    } else if (action.isForEveryone()) {
        window.setCursorAll(true);
        // 全バトラーを選択し、白点滅状態に
        for (const member of BattleManager.allBattleMembers()) {
            member.select();
        }

    // NRP_SkillRangeEX連携時（mainTargetAllIfを想定）
    } else if (existMainTargetAllIf(action)) {
        // メインターゲットを選択し、白点滅状態に
        window._index = BattleManager._mainTarget.index();
        if (window.refreshCursor) {
            window.refreshCursor();
        }
        window.callUpdateHelp();
        return;

    // 対象が全体／ランダムの場合
    } else if (action.isForAll() || action.isForRandom()) {
        window.setCursorAll(true);
        // バトラーを選択し、白点滅状態に
        for (const member of $gameParty.members()) {
            member.select();
        }
        for (const member of $gameTroop.members()) {
            member.deselect();
        }
    }
}

//-----------------------------------------------------------------------------
// タッチ操作に対応
//-----------------------------------------------------------------------------

if (pEnableTouch) {
    /**
     * ●アクターのタッチ操作
     */
    const _Window_BattleActor_processTouch = Window_BattleActor.prototype.processTouch;
    Window_BattleActor.prototype.processTouch = function() {
        // $gameTemp.clearTouchState()が元の処理で呼ばれるので、
        // クリアされる前の値を保持しておく。
        const target = $gameTemp.touchTarget();

        _Window_BattleActor_processTouch.apply(this, arguments);

        if (this.isOpenAndActive()) {
            if (target) {
                // 敵キャラサイドを選択した場合（追加）
                const enemies = $gameTroop.aliveMembers();
                if (enemies.includes(target)) {
                    // 対象サイドを敵キャラへ変更
                    const changeOk = SceneManager._scene.targetSideChangeToEnemy();
                    if (changeOk) {
                        SceneManager._scene._enemyWindow.select(enemies.indexOf(target));
                    }
                }
                $gameTemp.clearTouchState();
            }
        }
    };

    /**
     * ●敵キャラのタッチ操作
     */
    const _Window_BattleEnemy_processTouch = Window_BattleEnemy.prototype.processTouch;
    Window_BattleEnemy.prototype.processTouch = function() {
        // $gameTemp.clearTouchState()が元の処理で呼ばれるので、
        // クリアされる前の値を保持しておく。
        const target = $gameTemp.touchTarget();

        _Window_BattleEnemy_processTouch.apply(this, arguments);

        if (this.isOpenAndActive()) {
            if (target) {
                // アクターサイドを選択した場合（追加）
                const members = $gameParty.battleMembers();
                if (members.includes(target)) {
                    // 対象サイドをアクターへ変更
                    const changeOk = SceneManager._scene.targetSideChangeToActor();
                    if (changeOk) {
                        SceneManager._scene._actorWindow.select(members.indexOf(target));
                    }
                }
                $gameTemp.clearTouchState();
            }
        }
    };
}

//-----------------------------------------------------------------------------
// その他
//-----------------------------------------------------------------------------

/**
 * ●NRP_SkillRangeEX連携用（mainTargetAllIfを想定）
 * ※対象の自動選択時
 */
function existMainTargetAllIf(action) {
    if (action.isForAll() && BattleManager._mainTarget) {
        return true;
    }
    return false;
}

})();
