//=============================================================================
// NRP_ChangeParty.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.04 Implemented a party change screen.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/500297653.html
 *
 * @help Implemented a party change screen.
 * 
 * This is a simple scene to swap battle members and reserve members.
 * 
 * As a prerequisite, RPG Maker MZ's standard formation feature
 * makes it easy to swap battle members with reserve members.
 * So if that is sufficient, the party change screen is not necessary.
 * 
 * So what is the purpose of this plugin,
 * it is mainly to restrict the use of reserve members.
 * We anticipate that the level of difficulty
 * will be lower than expected, especially
 * if the recovery skills of the reserve members are freely available.
 * 
 * Therefore, this plugin prohibits the use of recovery skills by
 * reserve members by forbidding their replacement on the menu screen.
 * 
 * If the party change screen could then be called up from a base,
 * save point, etc., it would limit the use of reserve members.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * As mentioned above, the party change screen of this plugin
 * is designed to replace battle members and reserve members.
 * Actors to be organized should be added using
 * the "Change Party Member" event command.
 * 
 * The following features are applied when the plug-in is applied
 * 
 * - Prohibit the replacement of reserve members
 *   in the formation of the menu.
 * - Prohibits the use of skills by reserve members.
 * 
 * In addition, depending on the settings of the plugin parameters,
 * it is possible to set the reserve member
 * itself not to be displayed in the menu.
 * 
 * The party change screen should be called up
 * at a time of your choosing.
 * 
 * In addition to invoking the command via a plugin command,
 * the command can also be added to the menu screen.
 * The timing of when menu commands are available
 * can also be controlled by switches.
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
 * @ [Plugin Commands]
 * @-----------------------------------------------------
 * 
 * @command SceneStart
 * @desc Call the change party screen.
 * 
 * @-----------------------------------------------------
 * @ [Plugin Parameters]
 * @-----------------------------------------------------
 * 
 * @param AllowRelease
 * @type boolean
 * @default false
 * @desc Reduce the number of combat members to allow for less than three to be organized.
 * 
 * @param ShowOtherPage
 * @parent AllowRelease
 * @type boolean
 * @default false
 * @desc When "AllowRelease" is on, the members are displayed on a separate page in the menu screen.
 * 
 * @param ReserveOpacity
 * @type number
 * @desc Opacity of the reserved member's face, opaque at 255. If left blank, the default value of 160 is set.
 * 
 * @param StatusType
 * @type select
 * @option Only Name @value name
 * @option Name & Level @value level
 * @option All @value all
 * @default level
 * @desc How to display status on the party change screen.
 * All is deprecated as it usually does not fit.
 * 
 * @param ChangeDisabledState
 * @type state
 * @desc Actors on a given state are not allowed to be replaced.
 * 
 * @param <Menu Scene>
 * @desc Related items on the menu screen.
 * 
 * @param DisableReserveSkill
 * @parent <Menu Scene>
 * @type boolean
 * @default true
 * @desc Prohibits the use of skills by reserve members.
 * They will also not be able to target skills or items.
 * 
 * @param DisableReserveFormation
 * @parent <Menu Scene>
 * @type boolean
 * @default true
 * @desc Hide the reserve members in the formation function of the menu.
 * 
 * @param DisableReserveStatus
 * @parent <Menu Scene>
 * @type boolean
 * @default false
 * @desc Prohibits the display of reserve members in various functions. Hides them in status, equipment, etc.
 * 
 * @param <Menu Command>
 * @desc This is the relevant section for displaying the change party in the menu commands.
 * 
 * @param ShowMenuCommandPosition
 * @parent <Menu Command>
 * @type number
 * @default 4
 * @desc The position where the function is inserted into the menu command. 0 is the first position.
 * 
 * @param CommandName
 * @parent <Menu Command>
 * @type text
 * @default Party Change
 * @desc Sets the display command name for the change party.
 * 
 * @param MenuCommandSwitch
 * @parent <Menu Command>
 * @type switch
 * @desc Displays the command only when the switch is on.
 * If blank, it is always displayed.
 * 
 * @param MaskString
 * @parent MenuCommandSwitch
 * @type string
 * @desc If MenuCommandSwitch is off, displays the specified string. If blank, hides the command itself.
 * 
 * @param DisableSwitch
 * @parent <Menu Command>
 * @type switch
 * @desc Disallow command only when switch is on.
 * Always allow if blank.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.04 パーティ編成画面を実装。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/500297653.html
 *
 * @help パーティ編成画面を実装します。
 * 
 * 戦闘メンバーと控えメンバーを入れ替えるシンプルな編成画面です。
 * 
 * 前提として、ツクールＭＺでは標準の並び替え機能によって、
 * 戦闘メンバーと控えメンバーを簡単に入れ替えることができます。
 * なので、それで足りるなら編成画面は必要ありません。
 * 
 * では、このプラグインは何のためにあるのかというと、
 * 主に控えメンバーの利用を制限するためです。
 * 特に控えメンバーの回復スキルが自由に利用できてしまうと、
 * 難易度が想定よりも下がってしまうことが予想されます。
 * 
 * そこで当プラグインでは、メニュー画面での入替を禁止し、
 * 控えメンバーによる回復スキルの使用を禁止します。
 * 
 * その上で拠点やセーブポイントなどから編成画面を
 * 呼び出せるようにすれば、控えメンバーの使用を制限できます。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * 前述した通り、当プラグインの編成画面は、
 * 戦闘メンバーと控えメンバーを入れ替える仕様になっています。
 * 編成対象となるアクターは『メンバーの入れ替え』で追加してください。
 * 
 * プラグインを適用すると以下の機能が適用されます。
 * 
 * ・メニューの並び替えにて、控えとの入替を禁止。
 * ・控えメンバーのスキル使用を禁止。
 * 
 * さらにプラグインパラメータの設定によっては、
 * 控えメンバー自体をメニューに表示しない設定にできます。
 * 
 * 編成画面はお好みのタイミングで呼び出すようにしてください。
 * 
 * プラグインコマンドで呼び出す他にも、
 * メニュー画面にコマンドを追加することもできます。
 * メニューコマンドを使用できるタイミングもスイッチで制御できます。
 * 
 * -------------------------------------------------------------------
 * ■利用規約
 * -------------------------------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @-----------------------------------------------------
 * @ プラグインコマンド
 * @-----------------------------------------------------
 * 
 * @command SceneStart
 * @text シーン開始
 * @desc パーティ編成画面を呼び出します。
 * 
 * @-----------------------------------------------------
 * @ プラグインパラメータ
 * @-----------------------------------------------------
 * 
 * @param AllowRelease
 * @text 戦闘メンバーの空白許可
 * @type boolean
 * @default false
 * @desc 戦闘メンバーを減らして３人以下での編成をできるようにします。
 * 
 * @param ShowOtherPage
 * @parent AllowRelease
 * @text 控えを別ページに表示
 * @type boolean
 * @default false
 * @desc 戦闘メンバーの空白許可がオンの際、メニュー画面にて控えメンバーを別ページに表示します。
 * 
 * @param ReserveOpacity
 * @text 控えの不透明度
 * @type number
 * @desc 控えメンバーの顔グラの不透明度です。255で不透明
 * 空欄の場合、初期値の160が設定されます。
 * 
 * @param StatusType
 * @text ステータス表示方法
 * @type select
 * @option 名前のみ @value name
 * @option 名前とレベル @value level
 * @option 全表示 @value all
 * @default level
 * @desc 編成画面におけるステータスの表示方法です。
 * 通常の画面サイズでは全表示は収まらないので非推奨。
 * 
 * @param ChangeDisabledState
 * @text 入替禁止ステート
 * @type state
 * @desc 指定のステートにかかっているアクターは入替を禁止します。
 * 
 * @param <Menu Scene>
 * @text ＜メニュー関連＞
 * @desc メニュー画面の関連項目です。
 * 
 * @param DisableReserveSkill
 * @parent <Menu Scene>
 * @text 控えメンバーのスキル禁止
 * @type boolean
 * @default true
 * @desc 控えメンバーのスキルの使用を禁止します。
 * さらにスキルやアイテムの対象にもできなくなります。
 * 
 * @param DisableReserveFormation
 * @parent <Menu Scene>
 * @text 控えメンバーの並替禁止
 * @type boolean
 * @default true
 * @desc メニューの並び替え機能において、控えメンバーを非表示にします。
 * 
 * @param DisableReserveStatus
 * @parent <Menu Scene>
 * @text 控えメンバーの表示禁止
 * @type boolean
 * @default false
 * @desc 控えメンバーの各機能での表示を禁止します。
 * ステータスや装備などの表示ができなくなります。
 * 
 * @param <Menu Command>
 * @text ＜メニューコマンド関連＞
 * @desc メニューコマンドに編成を表示する際の関連項目です。
 * 
 * @param ShowMenuCommandPosition
 * @parent <Menu Command>
 * @text メニューコマンド挿入位置
 * @type number
 * @desc メニューコマンドにパーティ編成を挿入する位置です。
 * 0が先頭。不要ならDELで空欄にしてください。
 * 
 * @param CommandName
 * @parent <Menu Command>
 * @text メニュー表示名
 * @type text
 * @default 編成
 * @desc パーティ編成の表示コマンド名を設定します。
 * 
 * @param MenuCommandSwitch
 * @parent <Menu Command>
 * @text 表示許可するスイッチ
 * @type switch
 * @desc スイッチがオンの時のみコマンドを表示します。
 * 空白なら常に表示します。
 * 
 * @param MaskString
 * @parent MenuCommandSwitch
 * @text マスク文字列
 * @type string
 * @desc 表示許可するスイッチがオフの際、指定した文字列でコマンドを表示します。空欄ならコマンド自体を非表示。
 * 
 * @param DisableSwitch
 * @parent <Menu Command>
 * @text 禁止するスイッチ
 * @type switch
 * @desc スイッチがオンの時のみコマンドを禁止（灰色）します。
 * 空白なら常に許可します。
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
function toNumber(str, def) {
    if (str == undefined || str == "") {
        return def;
    }
    return isNaN(str) ? def : +(str || def);
}
function setDefault(str, def) {
    if (str == undefined || str == "") {
        return def;
    }
    return str;
}

const PLUGIN_NAME = "NRP_ChangeParty";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pAllowRelease = toBoolean(parameters["AllowRelease"], false);
const pShowOtherPage = toBoolean(parameters["ShowOtherPage"], false);
const pReserveOpacity = toNumber(parameters["ReserveOpacity"]);
const pStatusType = setDefault(parameters["StatusType"]);
const pChangeDisabledState = toNumber(parameters["ChangeDisabledState"]);
// メニュー関連
const pDisableReserveSkill = toBoolean(parameters["DisableReserveSkill"], true);
const pDisableReserveFormation = toBoolean(parameters["DisableReserveFormation"], true);
const pDisableReserveStatus = toBoolean(parameters["DisableReserveStatus"], false);
// メニューコマンド関連
const pShowMenuCommandPosition = toNumber(parameters["ShowMenuCommandPosition"]);
const pCommandName = parameters["CommandName"];
const pMenuCommandSwitch = toNumber(parameters["MenuCommandSwitch"]);
const pMaskString = setDefault(parameters["MaskString"]);
const pDisableSwitch = toNumber(parameters["DisableSwitch"]);

//-----------------------------------------------------------------------------
// ＭＺ用プラグインコマンド
//-----------------------------------------------------------------------------

// MVには存在しないため、空で定義しておかないとエラーになる。
if (!PluginManager.registerCommand) {
    PluginManager.registerCommand = function() {}
}

/**
 * ●シーン開始
 */
PluginManager.registerCommand(PLUGIN_NAME, "SceneStart", function(args) {
    // 選択肢ウィンドウが存在する場合は非表示
    // ※ゴミが残らないようにするため
    if (SceneManager._scene._choiceListWindow) {
        SceneManager._scene._choiceListWindow.hide();
    }

    // シーン開始
    SceneManager.push(Scene_ChangeParty);
});

//-----------------------------------------------------------------------------
// Scene_ChangeParty
//
// パーティ編成用クラス

function Scene_ChangeParty() {
    this.initialize(...arguments);
}

Scene_ChangeParty.prototype = Object.create(Scene_MenuBase.prototype);
Scene_ChangeParty.prototype.constructor = Scene_ChangeParty;

Scene_ChangeParty.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_ChangeParty.prototype.helpAreaHeight = function() {
    return 0;
};

Scene_ChangeParty.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createStatusWindow();
    this.createBenchWindow();
};

Scene_ChangeParty.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    this._statusWindow.refresh();
    this._benchWindow.refresh();

    this.commandFormation();
};

Scene_ChangeParty.prototype.createStatusWindow = function() {
    this._statusWindow = new Window_ChangeParty(this.statusWindowRect());
    this.addWindow(this._statusWindow);
};

Scene_ChangeParty.prototype.statusWindowRect = function() {
    const ww = Graphics.boxWidth / 2;
    const wh = this.mainAreaHeight();
    const wx = 0;
    const wy = this.mainAreaTop();
    return new Rectangle(wx, wy, ww, wh);
};

Scene_ChangeParty.prototype.createBenchWindow = function() {
    this._benchWindow = new Window_ChangePartyBench(this.benchWindowRect());
    this.addWindow(this._benchWindow);
};

Scene_ChangeParty.prototype.benchWindowRect = function() {
    const ww = Graphics.boxWidth / 2;
    const wh = this.mainAreaHeight();
    const wx = this._statusWindow.width;
    const wy = this.mainAreaTop();
    return new Rectangle(wx, wy, ww, wh);
};

Scene_ChangeParty.prototype.commandFormation = function() {
    this._statusWindow.setFormationMode(true);
    this._statusWindow.selectLast();
    this._statusWindow.activate();
    this._statusWindow.setHandler("ok", this.onFormationOk.bind(this));
    this._statusWindow.setHandler("cancel", this.onFormationCancel.bind(this));
    this._benchWindow.setHandler("ok", this.onFormationBenchOk.bind(this));
    this._benchWindow.setHandler("cancel", this.onFormationBenchCancel.bind(this));
};

/**
 * ●戦闘メンバーを選択した
 */
Scene_ChangeParty.prototype.onFormationOk = function() {
    const statusIndex = this._statusWindow.index();
    const statusPendingIndex = this._statusWindow.pendingIndex();
    const benchPendingIndex = this._benchWindow.pendingIndex();

    // 戦闘参加人数を取得
    const battleMembersLength = $gameParty.battleMembers().length;

    // 控えと戦闘メンバーを交換する場合
    if (benchPendingIndex >= 0) {
        // 控えメンバーのパーティ全体でのインデックスを求める。
        const benchActorPendingIndex = battleMembersLength + benchPendingIndex;
        // 入替実行
        this.onFormationChange(statusIndex, benchActorPendingIndex);

    // 戦闘メンバー同士で交換する場合
    } else if (statusPendingIndex >= 0) {
        // 空欄の選択は無効
        if (statusIndex < battleMembersLength && statusPendingIndex < battleMembersLength) {
            // 入替実行
            $gameParty.swapOrder(statusIndex, statusPendingIndex);
        }

        this._statusWindow.setPendingIndex(-1);
        this._statusWindow.refresh();

    // 未選択の場合
    } else {
        // 選択状態に設定
        this._statusWindow.setPendingIndex(statusIndex);
    }

    this._statusWindow.activate();
};

/**
 * ●控えメンバーを選択した
 */
Scene_ChangeParty.prototype.onFormationBenchOk = function() {
    // 控えメンバーのパーティ全体でのインデックスを求める。
    const benchIndex = this._benchWindow.index();
    const benchActorIndex = $gameParty.battleMembers().length + benchIndex;

    const statusPendingIndex = this._statusWindow.pendingIndex();
    const benchPendingIndex = this._benchWindow.pendingIndex();

    // 控えと戦闘メンバーを交換する場合
    if (statusPendingIndex >= 0) {
        // 入替実行
        this.onFormationChange(statusPendingIndex, benchActorIndex);

    // 控えメンバー同士で交換する場合
    } else if (benchPendingIndex >= 0) {
        // 選択済控えメンバーのパーティ全体でのインデックスを求める。
        const benchActorPendingIndex = $gameParty.battleMembers().length + benchPendingIndex;
        // 空欄の選択は無効
        if ($gameParty.members()[benchActorIndex] && $gameParty.members()[benchActorPendingIndex]) {
            // 入替実行
            $gameParty.swapOrder(benchActorIndex, benchActorPendingIndex);
        }

        // 表示更新
        this._benchWindow.setPendingIndex(-1);
        this._benchWindow.refresh();

    // 未選択の場合
    } else {
        // 選択状態に設定
        this._benchWindow.setPendingIndex(benchIndex);
    }

    this._benchWindow.activate();
};

/**
 * ●入替共通
 */
Scene_ChangeParty.prototype.onFormationChange = function(statusActorIndex, benchActorIndex) {
    // 戦闘メンバーで選択されたアクターを取得
    let statusActor;
    if (statusActorIndex < $gameParty.maxBattleMembers()) {
        statusActor = $gameParty._actors[statusActorIndex];
    // 空欄の場合はnullを設定
    } else {
        statusActor = null;
    }

    // 控えで選択されたアクターを取得
    const benchActor = $gameParty._actors[benchActorIndex];
    
    // 両方有効な場合
    if (statusActor && benchActor) {
        // 通常の入替実行
        $gameParty.swapOrder(statusActorIndex, benchActorIndex);

    // 戦闘メンバーに空欄を選択した場合
    } else if (!statusActor && benchActor) {
        // 控えメンバーを外して戦闘メンバーの末尾へ移動
        const actor = $gameParty._actors.splice(benchActorIndex, 1)[0];
        $gameParty._actors.splice(statusActorIndex, 0, actor);
        // 戦闘最大人数を増やす
        $gameParty.setMaxBattleMembers($gameParty.battleMembers().length + 1);
        // プレイヤーの表示更新
        $gamePlayer.refresh();

    // 控えメンバーに空欄を選択した場合
    } else if (statusActor && !benchActor) {
        // 戦闘メンバーが２人以上の時のみ有効
        if ($gameParty.battleMembers().length >= 2) {
            // 戦闘メンバーを外して控えメンバーの末尾へ移動
            const actor = $gameParty._actors.splice(statusActorIndex, 1)[0];
            $gameParty._actors.push(actor);
            // 戦闘最大人数を減らす
            $gameParty.setMaxBattleMembers($gameParty.battleMembers().length - 1);
            // プレイヤーの表示更新
            $gamePlayer.refresh();
        }
    }

    // 選択状態を解除して更新
    this._statusWindow.setPendingIndex(-1);
    this._benchWindow.setPendingIndex(-1);
    this._statusWindow.refresh();
    this._benchWindow.refresh();
};

/**
 * ●キャンセル時
 */
Scene_ChangeParty.prototype.onFormationCancel = function() {
    // 選択状態の場合は解除
    if (this._statusWindow.pendingIndex() >= 0) {
        this._statusWindow.setPendingIndex(-1);
        this._statusWindow.activate();
    // 別のウィンドウが選択状態の場合も解除（タッチ操作用の制御）
    } else if (this._benchWindow.pendingIndex() >= 0) {
        this._benchWindow.setPendingIndex(-1);
    // 選択状態でない場合は終了して前のシーンへ戻る
    } else {
        this.popScene();
    }
};

/**
 * ●控えキャンセル時
 */
Scene_ChangeParty.prototype.onFormationBenchCancel = function() {
    // 選択状態の場合は解除
    if (this._benchWindow.pendingIndex() >= 0) {
        this._benchWindow.setPendingIndex(-1);
        this._benchWindow.activate();
    // 別のウィンドウが選択状態の場合も解除（タッチ操作用の制御）
    } else if (this._statusWindow.pendingIndex() >= 0) {
        this._statusWindow.setPendingIndex(-1);
    // 選択状態でない場合は終了して前のシーンへ戻る
    } else {
        this.popScene();
    }
};

/**
 * ●控えメンバーにカーソルを移動させる。
 */
Scene_ChangeParty.prototype.toBenchActor = function() {
    // 移動前のウィンドウのインデックスを保持する。
    // ただし、見せかけの位置を合わせるため控えウィンドウのスクロール分を加算する。
    const newIndex = this._benchWindow.topIndex() + this._statusWindow._index;

    // インデックスをもう一つのウィンドウに移す。
    this._benchWindow.select(newIndex);
    this._statusWindow.deselect();

    this._statusWindow.deactivate();
    this._benchWindow.activate();

    // 入力をクリア
    // ※これをやらないとtoBattleActorが連続で呼ばれてしまう。
    Input.clear();
};

/**
 * ●戦闘メンバーにカーソルを移動させる。
 */
Scene_ChangeParty.prototype.toBattleActor = function() {
    // 移動前のウィンドウのインデックスを保持する。
    // ただし、見せかけの位置を合わせるため控えウィンドウのスクロール分を減算する。
    const newIndex = this._benchWindow._index - this._benchWindow.topIndex();

    // インデックスをもう一つのウィンドウに移す。
    this._statusWindow.select(newIndex);
    this._benchWindow.deselect();

    this._benchWindow.deactivate();
    this._statusWindow.activate();

    // 入力をクリア
    // ※これをやらないとtoBenchActorが連続で呼ばれてしまう。
    Input.clear();
};

/**
 * ●戦闘メンバーのカーソルを外す。
 */
Scene_ChangeParty.prototype.unFocusBattleActor = function() {
    if (this._statusWindow) {
        this._statusWindow.deselect();
        this._statusWindow.deactivate();
        this._benchWindow.activate();
    }
};

/**
 * ●控えメンバーのカーソルを外す。
 */
Scene_ChangeParty.prototype.unFocusBenchActor = function() {
    if (this._benchWindow) {
        this._benchWindow.deselect();
        this._benchWindow.deactivate();
        this._statusWindow.activate();
    }
};

//-----------------------------------------------------------------------------
// Window_ChangeParty
//
// パーティ編成用ウィンドウ

function Window_ChangeParty() {
    this.initialize(...arguments);
}

Window_ChangeParty.prototype = Object.create(Window_MenuStatus.prototype);
Window_ChangeParty.prototype.constructor = Window_ChangeParty;

Window_ChangeParty.prototype.maxCols = function() {
    return 1;
};

/**
 * ●最大表示数
 */
Window_ChangeParty.prototype.maxItems = function() {
    // 人数が４人に満たない場合は人数を取得する。
    if ($gameParty.size() < this.numVisibleRows()) {
        return $gameParty.size();
    }
    // 外すを許可している場合は空欄を追加
    if (pAllowRelease) {
        return Math.min(this.numVisibleRows(), $gameParty.battleMembers().length + 1);
    }
    return $gameParty.maxBattleMembers();
};

Window_ChangeParty.prototype.drawItemImage = function(index) {
    // 空欄を想定
    if (!this.actor(index)) {
        return;
    }
    Window_MenuStatus.prototype.drawItemImage.apply(this, arguments);
};

Window_ChangeParty.prototype.drawItemStatus = function(index) {
    // 空欄を想定
    if (!this.actor(index)) {
        return;
    }
    Window_MenuStatus.prototype.drawItemStatus.apply(this, arguments);
};

// アイコン非表示
Window_ChangeParty.prototype.drawActorIcons = function(actor, x, y, width) {
};

// ステータス表示が『名前のみ』の場合はレベル非表示
if (pStatusType == "name") {
    Window_ChangeParty.prototype.drawActorLevel = function(actor, x, y) {
    };
}
// ステータス表示が『名前のみ』または『名前とレベル』の場合は職業と数値を非表示
if (pStatusType == "name" || pStatusType == "level") {
    Window_ChangeParty.prototype.drawActorClass = function(actor, x, y, width) {
    };
    Window_ChangeParty.prototype.placeBasicGauges = function(actor, x, y) {
    };
}

Window_ChangeParty.prototype.actor = function(index) {
    // 最大数を超えている場合は表示しない。
    if (index >= $gameParty.maxBattleMembers()) {
        return null;
    }
    return $gameParty.members()[index];
};

Window_ChangeParty.prototype.cursorLeft = function(wrap) {
    SceneManager._scene.toBenchActor();
};

Window_ChangeParty.prototype.cursorRight = function(wrap) {
    SceneManager._scene.toBenchActor();
};

/**
 * ●タッチ処理
 */
Window_ChangeParty.prototype.processTouch = function() {
    // アクティブなウィンドウでなくとも反応。
    if (this.isHoverEnabled() && TouchInput.isHovered()) {
        this.onTouchSelect(false);
    } else if (TouchInput.isTriggered()) {
        this.onTouchSelect(true);
    }
    if (TouchInput.isClicked()) {
        this.onTouchOk();
    } else if (TouchInput.isCancelled()) {
        this.onTouchCancel();
    }
};

/**
 * ●タッチ選択時
 */
Window_ChangeParty.prototype.onTouchSelect = function(trigger) {
    this._doubleTouch = false;
    if (this.isCursorMovable(true)) {
        const lastIndex = this.index();
        const hitIndex = this.hitIndex();
        if (hitIndex >= 0) {
            // 控えメンバーのフォーカスを外す（タッチ操作を想定）
            SceneManager._scene.unFocusBenchActor();

            if (hitIndex === this.index()) {
                this._doubleTouch = true;
            }
            this.select(hitIndex);
        }
        if (trigger && this.index() !== lastIndex) {
            this.playCursorSound();
        }
    }
};

/**
 * ●カーソル選択できるか？
 */
const _Window_ChangeParty_isCursorMovable = Window_ChangeParty.prototype.isCursorMovable;
Window_ChangeParty.prototype.isCursorMovable = function(touchMode) {
    // タッチカーソルが上にある場合は有効
    if (touchMode && this.hitIndex() >= 0) {
        return (
            !this._cursorFixed &&
            !this._cursorAll &&
            this.maxItems() > 0
        );
    }
    // それ以外は通常
    return _Window_ChangeParty_isCursorMovable.apply(this, arguments);
};

/**
 * ●選択が可能かどうか？
 */
Window_ChangeParty.prototype.isCurrentItemEnabled = function() {
    const actor = this.actor(this.index());
    // 空欄の場合は常に許可
    if (!actor) {
        return true;
    }
    // 入替禁止ステートの場合は無効
    if (pChangeDisabledState && actor.isStateAffected(pChangeDisabledState)) {
        return false;
    }
    return actor && actor.isFormationChangeOk();
};

/**
 * ●ページ処理の対象とするかどうか？
 * ※NRP_PageWindow.js用
 */
Window_ChangeParty.prototype.isUsePage = function() {
    return false;
}

//-----------------------------------------------------------------------------
// Window_ChangePartyBench
//
// パーティ編成用控えウィンドウ

function Window_ChangePartyBench() {
    this.initialize(...arguments);
}

Window_ChangePartyBench.prototype = Object.create(Window_MenuStatus.prototype);
Window_ChangePartyBench.prototype.constructor = Window_ChangePartyBench;

Window_ChangePartyBench.prototype.maxCols = function() {
    return 1;
};

Window_ChangePartyBench.prototype.maxItems = function() {
    // 控えメンバーの数（パーティ人数から戦闘人数を引いた値）
    let maxItems = $gameParty.size() - $gameParty.battleMembers().length;
    // さらに外す用に空欄を+1
    if (pAllowRelease) {
        maxItems++;
    }
    return maxItems;
};

Window_ChangePartyBench.prototype.drawItemImage = function(index) {
    // 空欄を想定
    if (!this.actor(index)) {
        return;
    }
    Window_MenuStatus.prototype.drawItemImage.apply(this, arguments);
};

Window_ChangePartyBench.prototype.drawItemStatus = function(index) {
    // 空欄を想定
    if (!this.actor(index)) {
        return;
    }
    Window_MenuStatus.prototype.drawItemStatus.apply(this, arguments);
};

// アイコン非表示
Window_ChangePartyBench.prototype.drawActorIcons = function(actor, x, y, width) {
};

// ステータス表示が『名前のみ』の場合はレベル非表示
if (pStatusType == "name") {
    Window_ChangePartyBench.prototype.drawActorLevel = function(actor, x, y) {
    };
}
// ステータス表示が『名前のみ』または『名前とレベル』の場合は職業と数値を非表示
if (pStatusType == "name" || pStatusType == "level") {
    Window_ChangePartyBench.prototype.drawActorClass = function(actor, x, y, width) {
    };
    Window_ChangePartyBench.prototype.placeBasicGauges = function(actor, x, y) {
    };
}

Window_ChangePartyBench.prototype.actor = function(index) {
    // 控えメンバーを取得
    const benchMembers = $gameParty.allMembers().filter(m => m && !m.isBattleMember());
    return benchMembers[index];
};

Window_ChangePartyBench.prototype.cursorLeft = function(wrap) {
    SceneManager._scene.toBattleActor();
};

Window_ChangePartyBench.prototype.cursorRight = function(wrap) {
    SceneManager._scene.toBattleActor();
};

/**
 * ●タッチ処理
 */
Window_ChangePartyBench.prototype.processTouch = function() {
    // アクティブなウィンドウでなくとも反応。
    if (this.isHoverEnabled() && TouchInput.isHovered()) {
        this.onTouchSelect(false);
    } else if (TouchInput.isTriggered()) {
        this.onTouchSelect(true);
    }
    if (TouchInput.isClicked()) {
        this.onTouchOk();
    } else if (TouchInput.isCancelled()) {
        this.onTouchCancel();
    }
};

/**
 * ●タッチ選択時
 */
Window_ChangePartyBench.prototype.onTouchSelect = function(trigger) {
    this._doubleTouch = false;
    if (this.isCursorMovable(true)) {
        const lastIndex = this.index();
        const hitIndex = this.hitIndex();
        if (hitIndex >= 0) {
            // 戦闘メンバーのフォーカスを外す（タッチ操作を想定）
            SceneManager._scene.unFocusBattleActor();

            if (hitIndex === this.index()) {
                this._doubleTouch = true;
            }
            this.select(hitIndex);
        }
        if (trigger && this.index() !== lastIndex) {
            this.playCursorSound();
        }
    }
};

/**
 * ●カーソル選択できるか？
 */
const _Window_ChangePartyBench_isCursorMovable = Window_ChangePartyBench.prototype.isCursorMovable;
Window_ChangePartyBench.prototype.isCursorMovable = function(touchMode) {
    // タッチカーソルが上にある場合は有効
    if (touchMode && this.hitIndex() >= 0) {
        return (
            !this._cursorFixed &&
            !this._cursorAll &&
            this.maxItems() > 0
        );
    }
    // それ以外は通常
    return _Window_ChangePartyBench_isCursorMovable.apply(this, arguments);
};

/**
 * ●選択が可能かどうか？
 */
Window_ChangePartyBench.prototype.isCurrentItemEnabled = function() {
    const actor = this.actor(this.index());
    // 空欄の場合は常に許可
    if (!actor) {
        return true;
    }
    // 入替禁止ステートの場合は無効
    if (pChangeDisabledState && actor.isStateAffected(pChangeDisabledState)) {
        return false;
    }
    return actor && actor.isFormationChangeOk();
};

/**
 * ●ページ処理の対象とするかどうか？
 * ※NRP_PageWindow.js用
 */
Window_ChangePartyBench.prototype.isUsePage = function() {
    return false;
}

//-----------------------------------------------------------------------------
// Game_Party
//-----------------------------------------------------------------------------

/**
 * ●メニュー画面で参照するアクターを設定
 */
const _Game_Party_setMenuActor = Game_Party.prototype.setMenuActor;
Game_Party.prototype.setMenuActor = function(actor) {
    // アクターが無効なら処理しない。
    if (!actor) {
        return;
    }
    _Game_Party_setMenuActor.apply(this, arguments);
};

/**
 * 【独自】最大戦闘人数を設定する。
 */
Game_Party.prototype.setMaxBattleMembers = function(no) {
    this._maxBattleMembers = no;
};

/**
 * ●最大戦闘人数
 */
const _Game_Party_maxBattleMembers = Game_Party.prototype.maxBattleMembers;
Game_Party.prototype.maxBattleMembers = function() {
    // 設定がある場合は優先
    if (this._maxBattleMembers) {
        return this._maxBattleMembers;
    }
    // それ以外は元の値を使用する。
    return _Game_Party_maxBattleMembers.apply(this, arguments);
};

//-----------------------------------------------------------------------------
// 控えメンバーの不透明度
//-----------------------------------------------------------------------------

if (pReserveOpacity != null) {
    Window_ChangePartyBench.prototype.translucentOpacity = function() {
        return pReserveOpacity;
    };
    Window_MenuStatus.prototype.translucentOpacity = function() {
        return pReserveOpacity;
    };
}

//-----------------------------------------------------------------------------
// 控えメンバーを別ページに表示
//-----------------------------------------------------------------------------

if (pAllowRelease && pShowOtherPage) {
    /**
     * ●表示項目数
     */
    Window_MenuStatus.prototype.maxItems = function() {
        // １ページの表示人数を取得
        // ※競合を避けるためthis.maxVisibleItems()は使わない。
        const maxVisibleItems = this.numVisibleRows() * this.maxCols();
        // 空白分を追加（パーティ人数 + （１ページの表示人数 - 戦闘人数））
        return $gameParty.size() + maxVisibleItems - $gameParty.battleMembers().length;
    };

    /**
     * ●アクター
     */
    Window_MenuStatus.prototype.actor = function(index) {
        const members = $gameParty.members();
        // １ページの表示人数を取得
        const maxVisibleItems = this.numVisibleRows() * this.maxCols();
        // 空白を挿入する。
        const blankLength = maxVisibleItems - $gameParty.battleMembers().length;
        for (let i = 0; i < blankLength; i++) {
            members.splice($gameParty.battleMembers().length, 0, null);
        }

        return members[index];
    };

    /**
     * ●顔グラを描画
     */
    const _Window_MenuStatus_drawItemImage = Window_MenuStatus.prototype.drawItemImage;
    Window_MenuStatus.prototype.drawItemImage = function(index) {
        // 空欄を想定
        if (!this.actor(index)) {
            return;
        }
        _Window_MenuStatus_drawItemImage.apply(this, arguments);
    };

    /**
     * ●ステータスを描画
     */
    const _Window_MenuStatus_drawItemStatus = Window_MenuStatus.prototype.drawItemStatus;
    Window_MenuStatus.prototype.drawItemStatus = function(index) {
        // 空欄を想定
        if (!this.actor(index)) {
            return;
        }
        _Window_MenuStatus_drawItemStatus.apply(this, arguments);
    };

    /**
     * ●選択が可能かどうか？
     */
    const _Window_MenuStatus_isCurrentItemEnabled = Window_MenuStatus.prototype.isCurrentItemEnabled;
    Window_MenuStatus.prototype.isCurrentItemEnabled = function() {
        const actor = this.actor(this.index());
        // 空欄の場合は無効
        if (!actor) {
            return false;
        }
        return _Window_MenuStatus_isCurrentItemEnabled.apply(this, arguments);
    };
}

//-----------------------------------------------------------------------------
// 並び替えで控えメンバーを表示しない。
//-----------------------------------------------------------------------------

if (pDisableReserveFormation) {
    let mFormationFlg = false;

    /**
     * ●初期化
     */
    const _Scene_Menu_initialize = Scene_Menu.prototype.initialize;
    Scene_Menu.prototype.initialize = function() {
        _Scene_Menu_initialize.apply(this, arguments);
        mFormationFlg = false;
    };

    /**
     * ●並び替え開始
     */
    const _Scene_Menu_commandFormation = Scene_Menu.prototype.commandFormation;
    Scene_Menu.prototype.commandFormation = function() {
        mFormationFlg = true;
        _Scene_Menu_commandFormation.apply(this, arguments);
        // 控えメンバーを非表示
        this._statusWindow.refresh();
    };

    /**
     * ●並び替えキャンセル
     */
    const _Scene_Menu_onFormationCancel = Scene_Menu.prototype.onFormationCancel;
    Scene_Menu.prototype.onFormationCancel = function() {
        if (mFormationFlg && this._statusWindow.pendingIndex() < 0) {
            _Scene_Menu_onFormationCancel.apply(this, arguments);
            mFormationFlg = false;
            // 控えメンバーを再表示
            this._statusWindow.refresh();
            return;    
        }
        _Scene_Menu_onFormationCancel.apply(this, arguments);
    };

    /**
     * ●項目数
     */
    const _Window_MenuStatus_maxItems = Window_MenuStatus.prototype.maxItems;
    Window_MenuStatus.prototype.maxItems = function() {
        if (mFormationFlg) {
            // 並び替えの時のみ戦闘メンバーに限定する。
            return $gameParty.battleMembers().length;
        }
        // それ以外は通常通り
        return _Window_MenuStatus_maxItems.apply(this, arguments);
    };
}

//-----------------------------------------------------------------------------
// 控えメンバーのスキル使用を禁止。
// さらにスキルやアイテムの対象にもならなくなる。
//-----------------------------------------------------------------------------

if (pDisableReserveSkill) {
    /**
     * ●メニュー画面でのアイテム使用者の決定
     * ※内部的に『薬の知識』の率が高いアクターを選択している模様。
     */
    const _Scene_Item_user = Scene_Item.prototype.user;
    Scene_Item.prototype.user = function() {
        const keepInBattle = $gameParty._inBattle;
        // 一時的に使用者を戦闘メンバーに限定（控えメンバーは無効にする。）
        $gameParty._inBattle = true;
        const user = _Scene_Item_user.apply(this, arguments);
        // 元に戻す。
        $gameParty._inBattle = keepInBattle;
        return user;
    };

    /**
     * ●スキルの使用可否
     */
    const _Game_BattlerBase_canUse = Game_BattlerBase.prototype.canUse;
    Game_BattlerBase.prototype.canUse = function(item) {
        // 控えメンバーはスキル使用禁止
        if (!this.isBattleMember()) {
            return false;
        }
        return _Game_BattlerBase_canUse.apply(this, arguments);
    };

    /**
     * 【上書】項目数
     */
    Window_MenuActor.prototype.maxItems = function() {
        // 戦闘メンバーに限定する。
        return $gameParty.battleMembers().length;
    };
}

//-----------------------------------------------------------------------------
// 控えメンバーをステータスや装備などで表示しない。
//-----------------------------------------------------------------------------

if (pDisableReserveStatus) {
    /**
     * 【上書】項目数
     */
    Window_MenuStatus.prototype.maxItems = function() {
        // 戦闘メンバーに限定する。
        return $gameParty.battleMembers().length;
    };

    let mBattleMemberFlg = false;

    /**
     * ●次のアクター
     */
    const _Game_Party_makeMenuActorNext = Game_Party.prototype.makeMenuActorNext;
    Game_Party.prototype.makeMenuActorNext = function() {
        mBattleMemberFlg = true;
        _Game_Party_makeMenuActorNext.apply(this, arguments);
        mBattleMemberFlg = false;
    };

    /**
     * ●前のアクター
     */
    const _Game_Party_makeMenuActorPrevious = Game_Party.prototype.makeMenuActorPrevious;
    Game_Party.prototype.makeMenuActorPrevious = function() {
        mBattleMemberFlg = true;
        _Game_Party_makeMenuActorPrevious.apply(this, arguments);
        mBattleMemberFlg = false;
    };

    /**
     * ●メンバー取得
     */
    const _Game_Party_members = Game_Party.prototype.members;
    Game_Party.prototype.members = function() {
        if (mBattleMemberFlg) {
            return this.battleMembers();
        }
        return _Game_Party_members.apply(this, arguments);
    };
}

//-----------------------------------------------------------------------------
// メニューコマンド（Window_MenuCommand, Scene_Menu）
//-----------------------------------------------------------------------------

if (pShowMenuCommandPosition != null) {
    // 定数
    const SYMBOL_CHANGE_PARTY = "changeParty";

    /**
     * ●メニューコマンド追加（独自コマンド）
     */
    const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function() {
        // 元処理実行
        _Window_MenuCommand_addOriginalCommands.call(this);

        // 非表示スイッチが存在かつオフの場合は無効
        if (pMenuCommandSwitch && !$gameSwitches.value(pMenuCommandSwitch)) {
            // 文字列の指定がある場合は表示
            if (pMaskString) {
                this._list.splice(pShowMenuCommandPosition, 0,
                    { name: pMaskString, symbol: SYMBOL_CHANGE_PARTY, enabled: false, ext: null});
            }
            return;
        }
        
        let isEnabled = true;
        // 禁止スイッチが存在かつオンの場合は禁止
        if (pDisableSwitch && $gameSwitches.value(pDisableSwitch)) {
            isEnabled = false;
        }

        // 指定位置に編成コマンドを挿入
        // ※標準ではステータスの下
        this._list.splice(pShowMenuCommandPosition, 0,
            { name: pCommandName, symbol: SYMBOL_CHANGE_PARTY, enabled: isEnabled, ext: null});
    };

    /**
     * ●メニューコマンド呼び出し先の設定
     */
    const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        _Scene_Menu_createCommandWindow.call(this);

        // コマンド追加
        this._commandWindow.setHandler(SYMBOL_CHANGE_PARTY, this.commandChangeParty.bind(this));
    };

    /**
     * 【独自】パーティ編成選択
     */
    Scene_Menu.prototype.commandChangeParty = function() {
        SceneManager.push(Scene_ChangeParty);
    };
}

})();
