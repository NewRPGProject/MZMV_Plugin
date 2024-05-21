//=============================================================================
// NRP_PlayRecord.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.00 Displays the play record.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/503391609.html
 * @orderAfter NRP_EnemyCollapse
 *
 * @help Displays the play record.
 * Items such as number of battles, number of enemies defeated,
 * maximum damage, etc. can be displayed.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Play records can be called from the plugin command.
 * Alternatively, it can be added to an item on the menu scene
 * 
 * The following items are displayed by default.
 * 
 * - Play Time
 * - Battle Count
 * - Vitory Count
 * - Escape Count
 * - Defeated Enemies
 * - Max Damage
 * - Skill and Actor that caused Max Damage
 * - Step Count
 * 
 * The value is already set and can be used as is.
 * You can add values by specifying variables or scripts.
 * 
 * -------------------------------------------------------------------
 * [Script]
 * -------------------------------------------------------------------
 * The following values are obtained by the function of this plugin.
 * However, even if you apply the plugin from the middle of the process,
 * the values up to that point will not be obtained.
 * 
 * ◆$gameSystem.killEnemyCount();
 * Get the number of enemies defeated.
 * 
 * ◆$gameSystem.maxDamage();
 * Get maximum damage.
 * 
 * ◆$gameSystem.maxDamageActorName();
 * Get the name of the actor who did the maximum damage.
 * 
 * ◆$gameSystem.maxDamageSkillName();
 * Get the name of the skill that caused the maximum damage.
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
 * @ Plugin Commands
 * @-----------------------------------------------------
 * 
 * @command CallPlayRecord
 * @desc Displays the play record.
 * 
 * @-----------------------------------------------------
 * @ Plugin Parameters
 * @-----------------------------------------------------
 * 
 * @param Records
 * @type struct<Record>[]
 * @default ["{\"ItemName\":\"Play Time\",\"Variable\":\"\",\"Script\":\"$gameSystem.playtimeText()\",\"Suffix\":\"\"}","{\"ItemName\":\"Battle Count\",\"Variable\":\"\",\"Script\":\"$gameSystem.battleCount()\",\"Suffix\":\"\"}","{\"ItemName\":\"Victory Count\",\"Variable\":\"\",\"Script\":\"$gameSystem.winCount()\",\"Suffix\":\"\"}","{\"ItemName\":\"Escape Count\",\"Variable\":\"\",\"Script\":\"$gameSystem.escapeCount()\",\"Suffix\":\"\"}","{\"ItemName\":\"Defeated Enemies\",\"Variable\":\"\",\"Script\":\"$gameSystem.killEnemyCount()\",\"Suffix\":\"\"}","{\"ItemName\":\"Max Damage\",\"Variable\":\"\",\"Script\":\"$gameSystem.maxDamage()\",\"Suffix\":\"\"}","{\"ItemName\":\"\",\"Variable\":\"\",\"Script\":\"$gameSystem.maxDamage() ? $gameSystem.maxDamageSkillName() + \\\" (\\\" + $gameSystem.maxDamageActorName() + \\\")\\\" : \\\"\\\"\",\"Suffix\":\"\"}","{\"ItemName\":\"Step Count\",\"Variable\":\"\",\"Script\":\"$gameParty.steps()\",\"Suffix\":\"\"}"]
 * @desc The play record item to be displayed.
 * 
 * @param WindowBackgroundType
 * @parent <Message>
 * @type select
 * @option Normal @value 0
 * @option Dimmer @value 1
 * @option Transparency @value 2
 * @default 0
 * @desc The background of the window displaying the play record.
 * 
 * @param WindowWidth
 * @type string
 * @default 500
 * @desc The width of the window.
 * The default value is 500.
 * 
 * @param WindowHeight
 * @type string
 * @desc The height of the window.
 * If blank, it will be adjusted automatically.
 * 
 * @param WindowLineHeight
 * @type number
 * @desc The height of a single line of the window.
 * If blank, the original setting is used.
 * 
 * @param ValueRightAligned
 * @type boolean
 * @default true
 * @desc Aligns the value to the right edge of the window.
 * If off, values are left-aligned.
 * 
 * @param ValueX
 * @type string
 * @default 0
 * @desc X coordinate at which to display the value.
 * This item is not necessary when right-justified.
 * 
 * @param ValueAdjustX
 * @type number @min -999 @max 999
 * @default 0
 * @desc Adjust the X coordinate of the value. If the position is not correct when right-aligned, use this to adjust it.
 * 
 * @param <Menu Command>
 * @desc This is the relevant section for displaying the play record in the menu commands.
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
 * @default Learn Skills
 * @desc Sets the display command name for the play record.
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
//-----------------------------------------------------------------------------
// Record
//-----------------------------------------------------------------------------
/*~struct~Record:
 * @param ItemName
 * @type string
 * @desc The name of the item to be displayed.
 * Icons and other control characters are also valid.
 * 
 * @param Variable
 * @type variable
 * @desc Variable to display the value.
 * 
 * @param Script
 * @type string
 * @desc Script to display value.
 * Precedence over Variable.
 * 
 * @param Suffix
 * @type string
 * @desc The string to be displayed at the end.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.00 戦歴（プレイレコード）を表示します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/503391609.html
 * @orderAfter NRP_EnemyCollapse
 *
 * @help 戦歴（プレイレコード）を表示します。
 * 戦闘回数や倒した敵の数、最大ダメージなどの項目を表示できます。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * 戦歴はプラグインコマンドから呼び出せる他、
 * メニュー画面の項目に追加することもできます。
 * 
 * 初期設定では以下の項目を表示しています。
 * 
 * ・プレイ時間
 * ・戦闘回数
 * ・勝利回数
 * ・逃走回数
 * ・倒した敵の数
 * ・最大ダメージ
 * ・最大ダメージを与えたスキルとアクター
 * ・歩数
 * 
 * 既に値が設定されているため、そのままでも使えます。
 * 変数やスクリプトを指定することで、値を追加することができます。
 * 
 * -------------------------------------------------------------------
 * ■スクリプト
 * -------------------------------------------------------------------
 * 以下の値は当プラグインの機能によって取得しています。
 * ただし、プラグインを途中から適用しても、それまでの値は取得できません。
 * 
 * ◆$gameSystem.killEnemyCount();
 * 倒した敵の数を取得する。
 * 
 * ◆$gameSystem.maxDamage();
 * 最大ダメージを取得する。
 * 
 * ◆$gameSystem.maxDamageActorName();
 * 最大ダメージを与えたアクター名を取得する。
 * 
 * ◆$gameSystem.maxDamageSkillName();
 * 最大ダメージを与えたスキル名を取得する。
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
 * @command CallPlayRecord
 * @text 戦歴を表示
 * @desc 戦歴を表示します。
 * 
 * @-----------------------------------------------------
 * @ プラグインパラメータ
 * @-----------------------------------------------------
 * 
 * @param Records
 * @text 項目一覧
 * @type struct<Record>[]
 * @default ["{\"ItemName\":\"プレイ時間\",\"Variable\":\"\",\"Script\":\"$gameSystem.playtimeText()\",\"Suffix\":\"\"}","{\"ItemName\":\"戦闘回数\",\"Variable\":\"\",\"Script\":\"$gameSystem.battleCount()\",\"Suffix\":\"\"}","{\"ItemName\":\"勝利回数\",\"Variable\":\"\",\"Script\":\"$gameSystem.winCount()\",\"Suffix\":\"\"}","{\"ItemName\":\"逃走回数\",\"Variable\":\"\",\"Script\":\"$gameSystem.escapeCount()\",\"Suffix\":\"\"}","{\"ItemName\":\"倒した敵の数\",\"Variable\":\"\",\"Script\":\"$gameSystem.killEnemyCount()\",\"Suffix\":\"\"}","{\"ItemName\":\"最大ダメージ\",\"Variable\":\"\",\"Script\":\"$gameSystem.maxDamage()\",\"Suffix\":\"\"}","{\"ItemName\":\"\",\"Variable\":\"\",\"Script\":\"$gameSystem.maxDamage() ? $gameSystem.maxDamageSkillName() + \\\"（\\\" + $gameSystem.maxDamageActorName() + \\\"）\\\" : \\\"\\\"\",\"Suffix\":\"\"}","{\"ItemName\":\"歩数\",\"Variable\":\"\",\"Script\":\"$gameParty.steps()\",\"Suffix\":\"\"}"]
 * @desc 表示する戦歴の項目です。
 * 
 * @param WindowBackgroundType
 * @text ウィンドウ背景
 * @type select
 * @option 0:ウィンドウ @value 0
 * @option 1:暗くする @value 1
 * @option 2:透明 @value 2
 * @default 0
 * @desc 戦歴を表示するウィンドウの背景です。
 * 
 * @param WindowWidth
 * @text ウィンドウの横幅
 * @type string
 * @default 500
 * @desc ウィンドウの横幅です。
 * 初期値は500です。
 * 
 * @param WindowHeight
 * @text ウィンドウの縦幅
 * @type string
 * @desc ウィンドウの縦幅です。
 * 空欄なら自動で設定します。
 * 
 * @param WindowLineHeight
 * @text ウィンドウの一行の幅
 * @type number
 * @desc ウィンドウの一行の縦幅です。
 * 空欄なら元の設定を使用します。
 * 
 * @param ValueRightAligned
 * @text 値を右寄せ
 * @type boolean
 * @default true
 * @desc 値をウィンドウの右端に寄せます。
 * オフの場合は左寄せになります。
 * 
 * @param ValueX
 * @text 値の開始Ｘ座標
 * @type string
 * @default 0
 * @desc 値を表示するＸ座標です。
 * 右寄せ時は不要な項目です。
 * 
 * @param ValueAdjustX
 * @text 値のＸ座標調整
 * @type number @min -999 @max 999
 * @default 0
 * @desc 値のＸ座標を調整します。右寄せ時の位置がおかしい時はこれで調整してください。
 * 
 * @param <Menu Command>
 * @text ＜メニューコマンド関連＞
 * @desc メニューコマンドに戦歴を表示する際の関連項目です。
 * 
 * @param ShowMenuCommandPosition
 * @parent <Menu Command>
 * @text メニューコマンド挿入位置
 * @type number
 * @desc メニューコマンドに戦歴を挿入する位置です。
 * 0が先頭。不要ならDELで消去してください。
 * 
 * @param CommandName
 * @parent <Menu Command>
 * @text メニュー表示名
 * @type text
 * @default 戦歴
 * @desc 戦歴の表示コマンド名を設定します。
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
//-----------------------------------------------------------------------------
// Record
//-----------------------------------------------------------------------------
/*~struct~Record:ja
 * @param ItemName
 * @text 項目名
 * @type string
 * @desc 表示する項目名です。
 * アイコンなど制御文字も有効です。
 * 
 * @param Variable
 * @text 変数
 * @type variable
 * @desc 値を表示する変数です。
 * 
 * @param Script
 * @text スクリプト
 * @type string
 * @desc 値を表示するスクリプトです。
 * 変数よりも優先されます。
 * 
 * @param Suffix
 * @text 末尾
 * @type string
 * @desc 末尾に表示する文字列です。
 */

//-----------------------------------------------------------------------------
// 【独自】Scene_PlayRecord
// ※外部プラグインから参照できるように定義
//-----------------------------------------------------------------------------

function Scene_PlayRecord() {
    this.initialize(...arguments);
}

Scene_PlayRecord.prototype = Object.create(Scene_MenuBase.prototype);
Scene_PlayRecord.prototype.constructor = Scene_PlayRecord;

(function() {
"use strict";

/**
 * ●構造体（二重配列）をJSで扱えるように変換
 */
function parseStruct2(arg) {
    var ret = [];

    if (arg) {
        JSON.parse(arg).forEach(function(str) {
            ret.push(JSON.parse(str));
        });
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

const PLUGIN_NAME = "NRP_PlayRecord";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pRecords = parseStruct2(parameters["Records"]);
const pWindowBackgroundType = toNumber(parameters["WindowBackgroundType"], 0);
const pWindowWidth = setDefault(parameters["WindowWidth"]);
const pWindowHeight = setDefault(parameters["WindowHeight"]);
const pWindowLineHeight = toNumber(parameters["WindowLineHeight"]);
const pValueRightAligned = toBoolean(parameters["ValueRightAligned"], true);
const pValueX = toNumber(parameters["ValueX"], 0);
const pValueAdjustX = toNumber(parameters["ValueAdjustX"], 0);
// メニューコマンド関連
const pShowMenuCommandPosition = toNumber(parameters["ShowMenuCommandPosition"]);
const pCommandName = parameters["CommandName"];
const pMenuCommandSwitch = toNumber(parameters["MenuCommandSwitch"]);
const pMaskString = setDefault(parameters["MaskString"]);
const pDisableSwitch = toNumber(parameters["DisableSwitch"]);

// 定数
const SYMBOL_PLAY_RECORD = "playRecord";

//-----------------------------------------------------------------------------
// ＭＺ用プラグインコマンド
//-----------------------------------------------------------------------------

// MVには存在しないため、空で定義しておかないとエラーになる。
if (!PluginManager.registerCommand) {
    PluginManager.registerCommand = function() {}
}

/**
 * ●戦歴の呼び出し
 */
PluginManager.registerCommand(PLUGIN_NAME, "CallPlayRecord", function(args) {
    SceneManager.push(Scene_PlayRecord);
});

//-----------------------------------------------------------------------------
// 【独自】Scene_PlayRecord
//-----------------------------------------------------------------------------

Scene_PlayRecord.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_PlayRecord.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);
    this.createWindow();
};

/**
 * ●ウィンドウ作成
 */
Scene_PlayRecord.prototype.createWindow = function() {
    const rect = this.windowRect();
    this._window = new Window_PlayRecord(rect);
    this._window.setHandler("cancel", this.onItemCancel.bind(this));
    this.addWindow(this._window);
    this._window.activate();
};

/**
 * ●ウィンドウの描画範囲
 */
Scene_PlayRecord.prototype.windowRect = function() {
    const ww = eval(pWindowWidth) ?? Graphics.boxWidth;
    const wx = (Graphics.boxWidth - ww) / 2;

    let wh;
    if (pWindowHeight) {
        wh = eval(pWindowHeight);
    } else {
        wh = this.calcWindowHeight(pRecords.length);
    }
    const wy = (Graphics.boxHeight - wh) / 2;

    return new Rectangle(wx, wy, ww, wh);
};

/**
 * ●キャンセル時
 */
Scene_PlayRecord.prototype.onItemCancel = function() {
    this.popScene();
};

/**
 * ●ウィンドウの高さ計算
 */
Scene_PlayRecord.prototype.calcWindowHeight = function(numLines, selectable) {
    // Window_PlayRecordを参照する
    return Window_PlayRecord.prototype.fittingHeight(numLines);
};

//-----------------------------------------------------------------------------
// 【独自】Window_PlayRecord
//-----------------------------------------------------------------------------

function Window_PlayRecord() {
    this.initialize(...arguments);
}

Window_PlayRecord.prototype = Object.create(Window_Selectable.prototype);
Window_PlayRecord.prototype.constructor = Window_PlayRecord;

Window_PlayRecord.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
    // 背景更新
    this.updateBackground();

    // 戦歴表示
    for (let i = 0; i < pRecords.length; i++) {
        this.drawItem(i);
    }
};

/**
 * ●項目表示
 */
Window_PlayRecord.prototype.drawItem = function(index) {
    const rect = this.itemLineRect(index);
    const record = pRecords[index];
    const valueX = pValueX;
    this.changeTextColor(ColorManager.systemColor());
    this.drawTextEx(record.ItemName, rect.x, rect.y);
    this.resetTextColor();

    let value = "";
    if (record.Script) {
        value = eval(record.Script);
    } else if (record.Variable) {
        value = $gameVariables.value(record.Variable);
    }
    // 末尾の文字列
    if (record.Suffix) {
        value += " " + record.Suffix;
    }

    const drawWidth = this.width - (rect.x + valueX) - 40;
    const align = pValueRightAligned ? "right" : "left";
    this.drawText(value, rect.x + valueX + pValueAdjustX, rect.y, drawWidth, align);
};

/**
 * ●文字列描画処理
 * ※Window_Base.prototype.drawTextExとほぼ同じだがフォントリセットしない。
 */
Window_PlayRecord.prototype.drawTextEx = function(text, x, y, width) {
    const textState = this.createTextState(text, x, y, width);
    this.processAllText(textState);
    return textState.outputWidth;
};

/**
 * ●背景設定
 */
Window_PlayRecord.prototype.updateBackground = function() {
    this._background = pWindowBackgroundType;
    this.setBackgroundType(this._background);
};

/**
 * ●行数を元に高さを計算。
 */
Window_PlayRecord.prototype.fittingHeight = function(numLines) {
    return numLines * this.itemHeight() + $gameSystem.windowPadding() * 2;
};

/**
 * ●項目の縦幅
 */
Window_PlayRecord.prototype.itemHeight = function() {
    if (pWindowLineHeight) {
        return pWindowLineHeight;
    }
    return Window_Selectable.prototype.itemHeight();
};

//-----------------------------------------------------------------------------
// メニューコマンド（Window_MenuCommand, Scene_Menu）
//-----------------------------------------------------------------------------

if (pShowMenuCommandPosition != null) {
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
                    {name: pMaskString, symbol: SYMBOL_PLAY_RECORD, enabled: false, ext: null});
            }
            return;
        }
        
        let isEnabled = true;
        // 禁止スイッチが存在かつオンの場合は禁止
        if (pDisableSwitch && $gameSwitches.value(pDisableSwitch)) {
            isEnabled = false;
        }

        // 指定位置に戦歴コマンドを挿入
        this._list.splice(pShowMenuCommandPosition, 0,
            {name: pCommandName, symbol: SYMBOL_PLAY_RECORD, enabled: isEnabled, ext: null});
    };

    /**
     * ●メニューコマンド呼び出し先の設定
     */
    const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        _Scene_Menu_createCommandWindow.call(this);
        // コマンド追加
        this._commandWindow.setHandler(SYMBOL_PLAY_RECORD, this.commandPlayRecord.bind(this));
    };

    /**
     * 【独自】戦歴表示
     */
    Scene_Menu.prototype.commandPlayRecord = function() {
        SceneManager.push(Scene_PlayRecord);
    };
}

//-----------------------------------------------------------------------------
// Game_System
// ※以下は各項目取得用の処理
//-----------------------------------------------------------------------------

/**
 * ●初期化
 */
const _Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _Game_System_initialize.apply(this, arguments);
    // 倒した敵の数
    this._killEnemyCount = 0;
    // 最大ダメージ
    this._maxDamage = 0;
    // 最大ダメージアクター名
    this._maxDamageActor = "";
    // 最大ダメージスキル名
    this._maxDamageSkill = "";
};

/**
 * 【独自】倒した敵の数
 */
Game_System.prototype.killEnemyCount = function() {
    if (!this._killEnemyCount) {
        this._killEnemyCount = 0;
    }
    return this._killEnemyCount;
};

/**
 * 【独自】敵を倒した。
 */
Game_System.prototype.onKillEnemy = function() {
    if (!this._killEnemyCount) {
        this._killEnemyCount = 0;
    }
    this._killEnemyCount++;
};

/**
 * 【独自】最大ダメージ
 */
Game_System.prototype.maxDamage = function() {
    if (!this._maxDamage) {
        this._maxDamage = 0;
    }
    return this._maxDamage;
};

/**
 * 【独自】最大ダメージを与えたアクター名
 */
Game_System.prototype.maxDamageActorName = function() {
    if (!this._maxDamageActorName) {
        this._maxDamageActorName = "";
    }
    return this._maxDamageActorName;
};

/**
 * 【独自】最大ダメージを与えたスキル名
 */
Game_System.prototype.maxDamageSkillName = function() {
    if (!this._maxDamageSkillName) {
        this._maxDamageSkillName = "";
    }
    return this._maxDamageSkillName;
};

/**
 * 【独自】最大ダメージ更新
 */
Game_System.prototype.updateMaxDamage = function(damage, actorName, skillName) {
    if (!this._maxDamage) {
        this._maxDamage = 0;
    }
    // これまでの最大ダメージを上回った場合
    if (damage > this._maxDamage) {
        // 値を更新
        this._maxDamage = damage;
        this._maxDamageActorName = actorName;
        this._maxDamageSkillName = skillName;
    }
};

//-----------------------------------------------------------------------------
// Game_Enemy
//-----------------------------------------------------------------------------

/**
 * ●敵の撃破演出
 */
const _Game_Enemy_performCollapse = Game_Enemy.prototype.performCollapse;
Game_Enemy.prototype.performCollapse = function() {
    _Game_Enemy_performCollapse.apply(this, arguments);
    // 倒した敵の数を加算
    $gameSystem.onKillEnemy();
};

//-----------------------------------------------------------------------------
// Game_Battler
//-----------------------------------------------------------------------------

/**
 * ●ダメージ時
 */
const _Game_Battler_onDamage = Game_Battler.prototype.onDamage;
Game_Battler.prototype.onDamage = function(value) {
    // 戦闘中、かつ対象が敵、行動者がアクター
    if ($gameParty.inBattle() && this.isEnemy()
            && BattleManager._subject && BattleManager._subject.isActor() && BattleManager._action) {
        // アクター名を取得
        const actorName = BattleManager._subject.name();
        // スキル名を取得
        const skillName = BattleManager._action.item().name;
        $gameSystem.updateMaxDamage(value, actorName, skillName);
    }
    _Game_Battler_onDamage.apply(this, arguments);
};

})();
