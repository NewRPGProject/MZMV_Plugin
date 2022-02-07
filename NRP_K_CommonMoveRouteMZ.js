//=============================================================================
// Plugin for RPG Maker MZ
// NRP_K_CommonMoveRouteMZ.js
//=============================================================================
// [Release Note (Original)]
// CommonMoveRoute.js for RMMV
// 2017 Jul 11: Ver1.0.0 First Release
// CommonMoveRouteMZ.js for RMMZ
// 2020 Jan 14: Ver0.0.1 First Closed Release

/*:
 * @target MZ
 * @plugindesc v1.02 Set events' custom move by common event
 * @author Sasuke KANNAZUKI(Thx to terunon)(mod Takeshi Sunagawa)
 *
 * @command set
 * @text Set Common Event
 * @desc Set Common Event for Events' Movement Route
 *
 * @arg eventId
 * @text Event ID
 * @desc The event to set movement route
 * @type number
 * @min 1
 * @default 1
 *
 * @arg commonEventId
 * @text Common Event ID
 * @desc The common event that sets events' movement route
 * @type common_event
 * @default 1
 *
 * @arg flag
 * @text Judge Formula
 * @desc Whether to set movement route or not.
 * @type string
 * @default true
 *
 * @command set2
 * @text Set Common Event(usable Variables)
 * @desc Set Common Event for Events' Movement Route
 * You also can set either variable or event's name
 *
 * @arg eventId
 * @text Event ID
 * @desc Event to set movement route
 * You can set V+variableID (ex. V10) or event name
 * @type string
 * @default 1
 *
 * @arg commonEventId
 * @text Common Event ID
 * @desc The common event that sets event's route
 * You can set V+variableID (ex. V10) or common event name
 * @type string
 * @default 1
 *
 * @arg flag
 * @text Judge Formula
 * @desc Whether to set movement route or not.
 * @type string
 * @default true
 *
 * @command setPlayer
 * @text Set CommonEvent to Player
 * @desc Set Common Event for player's Movement Route
 *
 * @arg commonEventId
 * @text Common Event ID
 * @desc The common event that sets events' movement route
 * @type common_event
 * @default 1
 *
 * @arg flag
 * @text Judge Formula
 * @desc Whether to set movement route or not.
 * @type string
 * @default true
 *
 * @command setPlayer2
 * @text Set CommonEvent to Player(enable Variable)
 * @desc Set Common Event for player's Movement Route
 * You also can set either variable or event's name
 *
 * @arg commonEventId
 * @text Common Event ID
 * @desc The common event that sets event's route
 * You can set V+variableID (ex. V10) or common event name
 * @type string
 * @default 1
 *
 * @arg flag
 * @text Judge Formula
 * @desc Whether to set movement route or not.
 * @type string
 * @default true
 * 
 * 
 * @param LockRunningEvent
 * @type boolean
 * @default true
 * @desc Prohibits self movement by this plugin for events that are currently running.
 *
 * @param LockOtherEvents
 * @type boolean
 * @default false
 * @desc When an event is running, self movement by this plugin is prohibited for all events.
 *
 * @help
 * CommonMoveRouteMZ.js is a launch plugin for RPG Maker MZ
 * by Sasuke KANNAZUKI (Thx to terunon).
 * This plugin is an addition to it by Takeshi Sunagawa.
 * 
 * According to the original specification, the action specified
 * in the common event will continue to run while the event is running,
 * but this can be stopped with a plugin parameter.
 * 
 * -------------------------------------------------------------------
 * [Here is the original explanation]
 * -------------------------------------------------------------------
 * This plugin runs under RPG Maker MZ.
 * This plugin is the MZ version of CommonMoveRoute.js
 * 
 * [Summary]
 * Set events' move route to a common event
 * In order to reduce the burden of setting each event's description,
 * write a routine to common event and call from many events.
 * 
 * The remarkable point of writing move route to common event,
 * it enables to execute any event commands to the move route.
 *
 * Since the execution is not by event commands list contents
 * but by move route, you can set event commands list when the event invokes.
 *
 * [Example of setting method]
 * You can set move route by following 3 methods.
 * 'Plugin Command', 'Script', and 'Set Movement Route -> Script'.
 * When you want to set Common Event #4 to Event whose id is 19's move route,
 * set like following:
 * ** Script **
 * this.toCommon(4);          // set move route to this event.
 * this.commandRoute(4);      // the same as above
 * this.toCommon2(19, 4);     // most standard notation
 * this.commandRoute2(19, 4); // the same as above
 * ** 'Script' in Move Routing**
 * this.toCommon(4);          // set move route to the event set at the command
 * this.commandRoute(4);      // the same as above
 * ** NOTE **
 * If you need to set Player as a callee, either use Plugin Commands or
 * call above as event Id is -1.
 * 
 * [Example of advanced setting method 1]
 * On above commans, you can set common event id and event id not only number,
 * but also following notation.
 * - V10, V25 and so on: the value of variable number whose id is after V.
 * - common event name, or event name: the id that the name has.
 * ** The example in Script **
 * this.toCommon2('Aooni', 'randomMove');
 *   set common event named randomMove as the move route whose event name is
 *   'Aooni'.
 *
 * [Example of advanced setting method 2]
 * put one more parameter to above commands, the parameter is evaluated by
 * the function eval(), and when the result is false, skip the execution.
 * ** The Examples **
 * CommonMoveRoute 19 4 true
 * this.toCommon2(19, 4, $gameSwitches.value(15));
 *
 * [Plugin Commands]
 * You can set above also by plugin command.
 * This plugin provides 4 plugin commands.
 * - set parameters by constant number
 * - set parameters by variable and so on
 * - set player's common event by constant number
 * - set player's common event by variable and so on
 *
 * [Hint and note of setting commands]
 * - When you run the event command that takes wait in the common event,
 *   the event may often move original custom move.
 *   So if you execute command with wait, check the event's custom move route.
 * - You can call another common event on the above commands in common event.
 *   i.e. move route common event can do nesting.
 *   but make sure to avoid cyclic calling. If nesting depth become 100,
 *   it will invoke error.
 *
 * [Additional Information]
 * - You need not to terminate move route common event. For example,
 *   repeat move route, or setting loop that never exit.
 *   The movement will stop when the event's page is changed.
 * - If the move route common event is terminated, the event restart original
 *   route moving.
 *
 * [License]
 * This plugin is the refine version of terunon's TN_commonMoveRoute.js.
 * You can get the MV pluin at https://forum.tkool.jp/index.php?threads/146/
 * (Japanese site). Very thanks to terunon.
 * 
 * this plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */
/*:ja
 * @target MZ
 * @plugindesc v1.02 複数イベントの移動ルートをひとつのコモンイベントで制御可能
 * @author 神無月サスケ（原案：terunon）（改造：砂川赳）
 *
 * @command set
 * @text コモン移動ルート設定
 * @desc イベントの移動ルート用コモンイベントを設定
 *
 * @arg eventId
 * @text イベントID
 * @desc 移動ルートを設定するイベント
 * @type number
 * @min 1
 * @default 1
 *
 * @arg commonEventId
 * @text コモンイベントID
 * @desc 移動ルートが設定されたコモンイベント
 * @type common_event
 * @default 1
 *
 * @arg flag
 * @text 実行条件式
 * @desc この式の評価結果がfalseの時は設定を行いません。
 * @type string
 * @default true
 *
 * @command set2
 * @text コモン移動ルート設定(変数指定可)
 * @desc イベントの移動ルート用コモンイベントを設定
 * 変数やイベント名での設定が可能
 * @arg eventId
 * @text イベントID
 * @desc 移動ルートを設定するイベント
 * V+変数ID やイベント名での設定も可
 * @type string
 * @default 1
 *
 * @arg commonEventId
 * @text コモンイベントID
 * @desc 移動ルートが設定されたコモンイベント
 * V+変数ID (例：V10 V25)やイベント名での設定も可
 * @type string
 * @default 1
 *
 * @arg flag
 * @text 実行条件式
 * @desc この式の評価結果がfalseの時は設定を行いません。
 * @type string
 * @default true
 *
 * @command setPlayer
 * @text プレイヤーのルート設定
 * @desc プレイヤーの移動ルート用コモンイベントを設定
 *
 * @arg commonEventId
 * @text コモンイベントID
 * @desc 移動ルートが設定されたコモンイベント
 * @type common_event
 * @default 1
 *
 * @arg flag
 * @text 実行条件式
 * @desc この式の評価結果がfalseの時は設定を行いません。
 * @type string
 * @default true
 *
 * @command setPlayer2
 * @text プレイヤーのルート設定(変数指定可)
 * @desc プレイヤーの移動ルート用コモンイベントを設定
 * 変数やイベント名での設定が可能
 *
 * @arg commonEventId
 * @text コモンイベントID
 * @desc 移動ルートが設定されたコモンイベント
 * V+変数ID (例：V10 V25)やイベント名での設定も可
 * @type string
 * @default 1
 *
 * @arg flag
 * @text 実行条件式
 * @desc この式の評価結果がfalseの時は設定を行いません。
 * @type string
 * @default true
 * 
 * 
 * @param LockRunningEvent
 * @text 実行イベントをロック
 * @type boolean
 * @default true
 * @desc 実行中のイベントに対して、当プラグインによる自律移動を禁止します。
 *
 * @param LockOtherEventsSwitch
 * @text 他イベント停止スイッチ
 * @type switch
 * @desc スイッチがオンの間、当プラグインによる全イベントの自律移動を禁止します。0（なし）なら常に停止。
 * 
 * @help
 * このプラグインは神無月サスケ様（原案：terunon様）による
 * ＲＰＧツクールＭＺのローンチプラグインCommonMoveRouteMZ.jsに対して、
 * 砂川赳が機能追加を行ったものです。
 * 
 * 元の仕様だとコモンイベントで指定した動作は
 * イベント実行中も動作するようになっていますが、
 * プラグインパラメータによって、それを停止できます。
 * 
 * -------------------------------------------------------------------
 * ■以下、オリジナルの解説
 * -------------------------------------------------------------------
 * このプラグインは、RPGツクールMZに対応しています。
 *
 * ■概要
 * 任意のイベントから特定のコモンイベントを呼び出すことで、そのイベントの
 * 移動ルートを設定出来ます。
 * 同じ動作をする複数のイベントを、一つのコモンイベントの記述で処理できます。
 *
 * なお、コモンイベント内には、ほぼすべてのイベントコマンドが使えます。
 * ピクチャの表示や、条件分岐などあらゆることが可能です。
 *
 * 並列イベントとは異なり、あくまで移動ルートでの設定であるため、
 * 例えば、接触をした際に、反応をさせるといったことが可能です。
 *
 * ■設定可能な表記例（基本）
 * プラグインコマンド、スクリプト、移動ルートの設定のいずれからも呼び出せます。
 * 以下、イベントID19番に、4番のコモンイベントを移動ルートに設定する書式を
 * 説明します。数値は適宜置き換えてください。
 * ◆イベントコマンド『スクリプト』
 * this.toCommon(4);          // このコマンドを呼び出したイベントに設定
 * this.commandRoute(4);      // 同上
 * this.toCommon2(19, 4);     // イベントID19番のイベントに設定
 * this.commandRoute2(19, 4); // 同上
 * ◆イベントコマンド『移動ルートの設定』の中での『スクリプト』
 * this.toCommon(4);          // 『移動ルートの設定』で指定したイベントに設定
 * this.commandRoute(4);      // 同上
 * ◆設定上の注意
 * ・移動ルートの対象を「プレイヤー」にする場合、プラグインコマンドを使うか、
 * 上記のスクリプトでイベントIDを-1にしてください。
 *
 * ■設定可能な表記例（応用１）
 * 上記のパラメータの数値は、数字のみならず、すべて以下の書式が可能です。
 * ・V10 や V25 のように頭にVを付けると、その変数IDの値になります。
 * ・イベントID はイベント名で、コモンイベントID はコモンイベント名での
 *   指定も可能です。
 * 以下に一例を示します。
 * ◆イベントコマンド『スクリプト』での例：
 * this.toCommon2('青鬼', 'ランダム移動');
 *   「青鬼」という名のイベントに、「ランダム移動」という名のコモンイベントを
 *   移動ルートに設定します。
 *
 * ■設定可能な表記例（応用２）
 * 上記の任意の数値の後に、true や false や 数式を書いた場合、
 * その内容は eval で評価され、false と見做された場合は、実行を行いません。
 * ◆設定例：
 * this.toCommon2(19, 4, $gameSwitches.value(15));
 *
 * ■プラグインコマンド
 * 上記の設定をプラグインコマンドで行うことも出来ます。
 * 定数版と、変数版があります。
 * プレイヤーの設定もプラグインコマンドで可能です
 * 
 * ■設定上のコツと注意
 * ・コモンイベントによる移動ルート中、ウェイトを含むイベントコマンドを
 *   実行した場合、イベントに設定された本来の自律移動することがたまにあります。
 *   ウェイトを含むイベントコマンドを入れる場合、注意が必要です。
 * ・コモンイベント内から、さらに上記の記法でコモンイベントを呼び出すことも
 *   可能です(いわゆる「入れ子」)。ただし、循環参照などで、入れ子の深さが
 *   100を越えると、エラーになります。（これは通常のインタプリタと同様）
 * 
 * ■補足情報
 * ◆コモンイベント内で作者が使用可能を確認したイベントコマンド一覧
 * ・移動ルートの設定：最初の行でなくても問題なし。いくつも記述可能
 * ・スイッチ、変数、セルフスイッチの変更
 * ・条件分岐、ラベルジャンプ、ループ処理、中断など、フロー制御すべて
 * ・コモンイベント呼び出し（つまり入れ子にすることが可能）
 * ・ピクチャ関連、天候関連,フキダシアイコン
 * ・「イベントの一時消去」「場所移動（同マップへ）」なども受け付けます。
 * ◆コモンイベントの終了後の挙動
 * ・記述内にループや「動作を繰り返す」移動ルートの設定があった場合、
 *   ページが切り替わるまでコモンイベントの移動を続けます。
 * ・コモンイベントが終了した場合は、ただちに従来の自律移動に戻ります。
 *
 * ■ライセンス表記
 * このプラグインは、terunon(エイリアスエイク)様の TN_commonMoveRoute.js を
 * 元に、神無月サスケが機能追加およびバグ修正を行ったものです(MV版)。
 * terunon様に感謝いたします。
 *
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 */

(() => {

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

  const pluginName = 'NRP_K_CommonMoveRouteMZ';
  const parameters = PluginManager.parameters(pluginName);
  const pLockRunningEvent = toBoolean(parameters["LockRunningEvent"], true);
  const pLockOtherEventsSwitch = toNumber(parameters["LockOtherEventsSwitch"]);

  //
  // process plugin commands
  //
  const proecessPluginCommand = args => {
    const eventIdStr = args.eventId;
    const commonIdStr = args.commonEventId;
    const flagFormula = args.flag;
    $gameMap._interpreter.toCommon2(eventIdStr, commonIdStr, flagFormula);
  };

  const proecessPluginCommandPlayer = args => {
    const commonIdStr = args.commonEventId;
    const flagFormula = args.flag;
    $gameMap._interpreter.toCommon2('-1', commonIdStr, flagFormula);
  };

  PluginManager.registerCommand(pluginName, 'set', args => {
    proecessPluginCommand(args);
  });

  PluginManager.registerCommand(pluginName, 'set2', args => {
    proecessPluginCommand(args);
  });

  PluginManager.registerCommand(pluginName, 'setPlayer', args => {
    proecessPluginCommandPlayer(args);
  });

  PluginManager.registerCommand(pluginName, 'setPlayer2', args => {
    proecessPluginCommandPlayer(args);
  });

  //
  // routine for process parameters
  //
  const getCommonEventIdWhoseNameIs = name => {
    for (let i = 1; i < $dataCommonEvents.length; i++) {
      var commonEvent = $dataCommonEvents[i];
      if (commonEvent && commonEvent.name === name) {
        return i;
      }
    }
    return 0;
  };

  const getCommonEventId = notation => {
    let reg;
    if (reg = (/^(V?)([0-9]+)/i).exec(String(notation))) {
      return reg[1] ? $gameVariables.value(+reg[2]) : +reg[2];
    }
    return getCommonEventIdWhoseNameIs(notation);
  };

  const getEventIdWhoseNameIs = name => {
    let arr = $gameMap.events().filter(e => e.event().name === name);
    return arr[0] ? arr[0].eventId() : 0;
  };

  const getEventId = notation => {
    let reg;
    if (reg = (/^(V?)(\-?[0-9]+)/i).exec(String(notation))) {
      return reg[1] ? $gameVariables.value(+reg[2]) : +reg[2];
    }
    return getEventIdWhoseNameIs(notation);
  };

  const checkFlag = notation => {
    return notation == null || !!eval(notation);
  };

  //
  // initialize this plugin's original variables in class
  //
  var _Game_Character_initMembers = Game_Character.prototype.initMembers;
  Game_Character.prototype.initMembers = function() {
    _Game_Character_initMembers.call(this);
    this._moveRouteInterpreter = null;
    this._moveRouteByCommon = false;
  };

  //
  // memorize original move route when custom movement calls it.
  // 
  // (to prevent multiple execusion of memorize/restore move route,
  //  add such notation)
  //
  Game_Character.prototype.memorizeMoveRoute2 = function() {
    if (!this._originalMoveRoute2) {
      this._originalMoveRoute2 = this._moveRoute;
      this._originalMoveRouteIndex2 = this._moveRouteIndex;
    }
  };

  Game_Character.prototype.restoreMoveRoute2 = function() {
    if (this._originalMoveRoute2) {
      this._moveRoute = this._originalMoveRoute2;
      this._moveRouteIndex = this._originalMoveRouteIndex2;
      this._originalMoveRoute2 = null;
    }
  };

  //
  // store/resume Movement Route
  //
  Game_Character.prototype.isInCommonMoveRoute = function() {
    return this._moveRouteByCommon;
  };

  Game_Character.prototype._storeMoveRouteByCommon = function () {
    this._moveRouteByCommon = true;
    this.memorizeMoveRoute2();
  };

  Game_Character.prototype._resumeMoveRouteByCommon = function () {
    this.restoreMoveRoute2();
    this._moveRouteByCommon = false;
  };

  //
  // call from event command 'Script' or 'Set Movement Route'
  //
  Game_Interpreter.prototype.commandRoute = 
  Game_Interpreter.prototype.toCommon = function (commonIdNote, flag) {
    if (!checkFlag(flag)) {
      return;
    }
    const eventId = this.eventId();
    if (eventId) {
      const event = eventId === -1 ? $gamePlayer : $gameMap.event(eventId);
      event.toCommon(commonIdNote);
    }
  };

  Game_Interpreter.prototype.commandRoute2 = 
  Game_Interpreter.prototype.toCommon2 = function (eventIdNote, commonIdNote,
   flag) {
    if (!checkFlag(flag)) {
      return;
    }
    let eventId = getEventId(eventIdNote);
    if (eventId === 0) {
      eventId = this.eventId();
    }
    if (eventId) {
      const event = eventId === -1 ? $gamePlayer : $gameMap.event(eventId);
      if (event) {
        event.toCommon(commonIdNote);
      }
    }
  };

  Game_Character.prototype.commandRoute =
  Game_Character.prototype.toCommon = function(notation, flag) {
    if (!checkFlag(flag)) {
      return;
    }
    const commonId = getCommonEventId(notation);
    let common;
    if (commonId && (common = $dataCommonEvents[commonId])) {
      this._setMoveRouteToCommon(common);
    }
  };

  //
  // create new move route interpreter
  //
  Game_Character.prototype._setMoveRouteToCommon = function (commonEvent) {
    this._storeMoveRouteByCommon();
    this._setMoveRouteInterpreter(commonEvent);
  };

  Game_Character.prototype._setMoveRouteInterpreter = function (commonEvent) {
    if (this._moveRouteInterpreter) {
      onFinishMovement(this);
    }
    this._moveRouteInterpreter = new Game_Interpreter();
    this._moveRouteInterpreter.setup(commonEvent.list, this._mriEventId());
  };

  Game_Character.prototype._mriEventId = function () {
    return 0;
  };

  Game_Event.prototype._mriEventId = function () {
    return this.eventId();
  };

  Game_Player.prototype._mriEventId = function () {
    return -1;
  };

  //
  // update new move route interpreter
  //
  const _Game_Character_update = Game_Character.prototype.update;
  Game_Character.prototype.update = function () {
    _Game_Character_update.call(this);
    this.updateMoveRouteInterpreter();
  };

  Game_Character.prototype.updateMoveRouteInterpreter = function () {
    if (this._moveRouteInterpreter) {
      if (!this.isMoveRouteForcing()) {
        this._moveRouteInterpreter.update();
      }
    }
  };

  const _Game_Character_updateRoutineMove =
    Game_Character.prototype.updateRoutineMove;
  Game_Character.prototype.updateRoutineMove = function() {
    if (this._moveRouteInterpreter) {
// Add START Sunagawa
      // 実行中のイベントは処理停止
      if (pLockRunningEvent && this._locked) {
        return;
      // 他のイベントが実行中でも処理停止
      } else if (isLockOtherEvents() && $gameMap.isEventRunning()) {
        return;
      }
// Add END Sunagawa

      const interpreter = this._moveRouteInterpreter;
      if (!interpreter.isRunning()) {
        this._moveRouteInterpreter = null;
      }
    }

    _Game_Character_updateRoutineMove.call(this);
  };

  const _Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
  Game_Event.prototype.setupPageSettings = function() {
    _Game_Event_setupPageSettings.call(this);
    this._moveRouteInterpreter = null;
  };

  //
  // maniplulate event parameters
  //
  const _Game_Interpreter_character = Game_Interpreter.prototype.character;
  Game_Interpreter.prototype.character = function(param) {
    if ($gameParty.inBattle()) {
      return null;
    } else if (param === 0 && this._eventId < 0) {
      return $gamePlayer;
    }
    return _Game_Interpreter_character.call(this, param);
  };

  //
  // finish movement by common event and restart original self movement
  //
  const onFinishMovement = event => {
    if (event && event.isInCommonMoveRoute()) {
      event._moveRouteInterpreter = null;
      event._resumeMoveRouteByCommon();
    }
  };

  const _Game_Character_processRouteEnd =
    Game_Character.prototype.processRouteEnd;
  Game_Character.prototype.processRouteEnd = function() {
    _Game_Character_processRouteEnd.call(this);
    onFinishMovement(this);
  };

//--------------------------------------------------------------
// ADD Sunagawa
//--------------------------------------------------------------

/**
 * ●移動ルートの指定
 */
const _Game_Interpreter_command205 = Game_Interpreter.prototype.command205;
Game_Interpreter.prototype.command205 = function(params) {
    this._characterId = params[0];
    const character = this.character(this._characterId);
    if (character) {
        // 命令がコモンイベント経由以外の場合
        if (this != character._moveRouteInterpreter) {
            // 当プラグインによるコモンイベント経由の動作をクリア
            onFinishMovement(character);
        }
    }
    return _Game_Interpreter_command205.apply(this, arguments);;
};

/**
 * ●他イベントを停止するかどうか？
 */
function isLockOtherEvents() {
    // 0なら常に禁止
    if (pLockOtherEventsSwitch === 0) {
        return true;
    }
    // それ以外はスイッチがオンの場合のみ停止
    return $gameSwitches.value(pLockOtherEventsSwitch);
};

})();
