//=============================================================================
// NRP_VictoryRewards.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.041 Customize the display after a battle victory.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/499138292.html
 *
 * @help Customize the display after a battle victory.
 * 
 * - Change the position and size of windows
 *   and display various information in one place
 * - Consolidated display of the number of dropped items
 * - Works with NRP_AdditionalClasses.js
 *   to collectively display class level increases
 * 
 * and more at .......
 * 
 * As much as possible, the default message display is diverted,
 * so it is relatively easy to use with other plugins.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Apply the plugin to display the battle victory message
 * across the entire screen.
 * Change the position and size of the display to suit your preference.
 * 
 * Messages other than drop items basically use the same settings
 * for terms in the database.
 * Control characters can also be used for terms,
 * so please set them as you like.
 * For example, the victory message
 * could be "\c[16][Victory]\c[0]".
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
 * @param NotDisplayVictoryMessage
 * @type boolean
 * @default false
 * @desc Omit the victory message at the beginning and put the experience display at the top.
 * 
 * @param ApplyNotBattle
 * @type boolean
 * @default false
 * @desc The plugin's process is also reflected in the level-up display during battle.
 * 
 * @param StartCommmonEvent
 * @type common_event
 * @desc This is a common event that is executed at the start of the victory screen.
 * 
 * @param EndCommmonEvent
 * @text 終了時のコモンイベント
 * @type common_event
 * @desc This is a common event that is executed at the end of the victory screen.
 * 
 * @param <Window>
 * 
 * @param VictoryWindowBackground
 * @parent <Window>
 * @type select
 * @option Normal @value 0
 * @option Dimmer @value 1
 * @option Transparency @value 2
 * @desc This is the window background at the time of the win.
 * 
 * @param WindowX
 * @parent <Window>
 * @type string
 * @default 0
 * @desc X coordinate for displaying the victory window.
 * 
 * @param WindowY
 * @parent <Window>
 * @type string
 * @default 0
 * @desc Y coordinate for displaying the victory window.
 * 
 * @param WindowWidth
 * @parent <Window>
 * @type string
 * @default Graphics.boxWidth
 * @desc The width of the victory window.
 * "Graphics.boxWidth" will be the entire box.
 * 
 * @param WindowHeight
 * @parent <Window>
 * @type string
 * @default Graphics.boxHeight
 * @desc The height of the victory window.
 * "Graphics.boxHeight" will be the entire box.
 * 
 * @param DefeatWindowBackground
 * @parent <Window>
 * @type select
 * @option Normal @value 0
 * @option Dimmer @value 1
 * @option Transparency @value 2
 * @desc Window background at the time of defeat.
 * 
 * @param <DimmerWindow>
 * @desc Dimmer window settings.
 * 
 * @param GradientType
 * @parent <DimmerWindow>
 * @type select
 * @option 0:None @value 0
 * @option 1:Horizontal @value 1
 * @option 2:Vertical @value 2
 * @default 2
 * @desc The direction of the window gradient.
 * 
 * @param StartGradientSize
 * @parent <DimmerWindow>
 * @type number
 * @desc The gradient width of the start side.
 * Default: 12
 * 
 * @param EndGradientSize
 * @parent <DimmerWindow>
 * @type number
 * @desc The gradient width of the end side.
 * Default: 12
 * 
 * @param <Message>
 * 
 * @param MessageSpeed
 * @parent <Message>
 * @type number
 * @default 100
 * @desc Set the message speed with 100 as the standard.
 * For example, 150 is 1.5 times the normal speed.
 * 
 * @param FontSize
 * @parent <Message>
 * @type number
 * @desc The font size of the victory message.
 * If unspecified, use system setting.
 * 
 * @param LineHeight
 * @parent <Message>
 * @type number
 * @desc The height per line of the message.
 * Default: 36
 * 
 * @param AdjustMessageX
 * @parent <Message>
 * @type number @min -999 @max 999
 * @desc Adjust the X coordinate of the message.
 * 
 * @param AdjustMessageY
 * @parent <Message>
 * @type number @min -999 @max 999
 * @desc Adjust the Y coordinate of the message.
 * 
 * @param MessageFitWidth
 * @parent <Message>
 * @type boolean
 * @default false
 * @desc Automatically shrinks the message to fit the width of the window.
 * 
 * @param <Actor>
 *
 * @param UseActorHeadline
 * @parent <Actor>
 * @type boolean
 * @default false
 * @desc Actor name headings are used when leveling up.
 * 
 * @param ActorHeadline
 * @type string
 * @parent <Actor>
 * @default \c[16][%1]\c[0]
 * @desc Actor Name Heading. %1=Actor Name
 * 
 * @param <DropItem>
 * 
 * @param DropItemHeadline
 * @parent <DropItem>
 * @type string
 * @default \c[16][Drop Items]\c[0]
 * @desc Drop Items Heading.
 * Leave blank if not needed.
 * 
 * @param DropItemDisplay
 * @parent <DropItem>
 * @type string
 * @default %2%1 x %3
 * @desc The display format of dropped items.
 * %1=Item NAme, %2=Icon, %3=Number
 * 
 * @param DropItemNewline
 * @parent <DropItem>
 * @type boolean
 * @default true
 * @desc Insert a line break before the drop item heading.
 * 
 * @param DropItemConsolidate
 * @parent <DropItem>
 * @type boolean
 * @default true
 * @desc If the items are the same, the number of dropped items is aggregated and displayed.
 * 
 * @param <AdditionalClasses>
 * @desc This item is for integration with NRP_AdditionalClasses.js.
 * 
 * @param AC_DisplayStyle
 * @parent <AdditionalClasses>
 * @type select
 * @option Page Break @value page
 * @option Batch @value batch
 * @option Batch & Input @value input
 * @default input
 * @desc This is how it is displayed when additional classes are leveled up.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.041 戦闘勝利時の表示をカスタマイズします。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/499138292.html
 *
 * @help 戦闘勝利時の表示をカスタマイズします。
 * 
 * ・ウィンドウの位置やサイズを変更し、各種情報をまとめて表示
 * ・ドロップアイテムの個数を集約して表示
 * ・多重職業プラグイン（NRP_AdditionalClasses.js）と連携し、
 * 　職業レベルの上昇をまとめて表示
 * 
 * などなど……。
 * 
 * なるべく、デフォルトのメッセージ表示を流用するため、
 * 比較的に他プラグインとも併用しやすいのが特徴です。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * プラグインを適用すると、画面全体に
 * 戦闘勝利メッセージを表示するようになります。
 * お好みに合わせて表示する位置やサイズを変更してください。
 * 
 * ドロップアイテム以外のメッセージは基本的に、
 * データベースの用語の設定をそのまま使っています。
 * 用語には制御文字も使用可能なので、お好みで設定してください。
 * 例えば、勝利メッセージを『\c[16]【戦闘勝利】\c[0]』にするなど。
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
 * @param NotDisplayVictoryMessage
 * @text 勝利メッセージを省略
 * @type boolean
 * @default false
 * @desc 冒頭の勝利メッセージを省略し、経験値表示を先頭にします。
 * 
 * @param ApplyNotBattle
 * @text 非戦闘時にも反映
 * @type boolean
 * @default false
 * @desc 非戦闘時のレベルアップ表示にも当プラグインの処理を反映します。
 * 
 * @param StartCommmonEvent
 * @text 開始時のコモンイベント
 * @type common_event
 * @desc 勝利画面開始時に実行するコモンイベントです。
 * 
 * @param EndCommmonEvent
 * @text 終了時のコモンイベント
 * @type common_event
 * @desc 勝利画面終了時に実行するコモンイベントです。
 * 
 * @param <Window>
 * @text ＜ウィンドウ関連＞
 * 
 * @param VictoryWindowBackground
 * @text 勝利時のウィンドウ背景
 * @parent <Window>
 * @type select
 * @option 通常 @value 0
 * @option 暗くする @value 1
 * @option 透明 @value 2
 * @desc 勝利時のウィンドウ背景です。
 * 
 * @param WindowX
 * @text ウィンドウのＸ座標
 * @parent <Window>
 * @type string
 * @default 0
 * @desc ウィンドウを表示するＸ座標です。
 * 
 * @param WindowY
 * @text ウィンドウのＹ座標
 * @parent <Window>
 * @type string
 * @default 0
 * @desc ウィンドウを表示するＹ座標です。
 * 
 * @param WindowWidth
 * @text ウィンドウの横幅
 * @parent <Window>
 * @type string
 * @default Graphics.boxWidth
 * @desc ウィンドウの横幅です。
 * 「Graphics.boxWidth」で全体になります。
 * 
 * @param WindowHeight
 * @text ウィンドウの縦幅
 * @parent <Window>
 * @type string
 * @default Graphics.boxHeight
 * @desc ウィンドウの縦幅です。
 * 「Graphics.boxHeight」で全体になります。
 * 
 * @param DefeatWindowBackground
 * @text 敗北時のウィンドウ背景
 * @parent <Window>
 * @type select
 * @option 通常 @value 0
 * @option 暗くする @value 1
 * @option 透明 @value 2
 * @desc 敗北時のウィンドウ背景です。
 * 
 * @param <DimmerWindow>
 * @text ＜暗くする関連＞
 * @desc ウィンドウを暗くするにした場合の設定です。
 * 
 * @param GradientType
 * @text グラデーション方式
 * @parent <DimmerWindow>
 * @type select
 * @option 0:なし @value 0
 * @option 1:横 @value 1
 * @option 2:縦 @value 2
 * @default 2
 * @desc ウィンドウのグラデーション方式です。
 * 
 * @param StartGradientSize
 * @text 開始グラデーション幅
 * @parent <DimmerWindow>
 * @type number
 * @desc ウィンドウの開始グラデーション幅です。
 * 初期値は12です。
 * 
 * @param EndGradientSize
 * @text 終了グラデーション幅
 * @parent <DimmerWindow>
 * @type number
 * @desc ウィンドウの終了グラデーション幅です。
 * 初期値は12です。
 * 
 * @param <Message>
 * @text ＜メッセージ関連＞
 * 
 * @param MessageSpeed
 * @text メッセージ速度
 * @parent <Message>
 * @type number
 * @default 100
 * @desc 100を標準としてメッセージ速度を設定してください。
 * 例えば、150なら通常の1.5倍速となります。
 * 
 * @param FontSize
 * @text フォントサイズ
 * @parent <Message>
 * @type number
 * @desc 勝利メッセージのフォントサイズです。
 * 未指定ならシステム設定を使います。
 * 
 * @param LineHeight
 * @text 行の縦幅
 * @parent <Message>
 * @type number
 * @desc 勝利ウィンドウの行の縦幅です。
 * 初期値は36です。
 * 
 * @param AdjustMessageX
 * @text メッセージＸ座標調整
 * @parent <Message>
 * @type number @min -999 @max 999
 * @desc メッセージのＸ座標を調整します。
 * 
 * @param AdjustMessageY
 * @text メッセージＹ座標調整
 * @parent <Message>
 * @type number @min -999 @max 999
 * @desc メッセージのＹ座標を調整します。
 * 
 * @param MessageFitWidth
 * @text 横幅を自動で縮小
 * @parent <Message>
 * @type boolean
 * @default false
 * @desc ウィンドウの横幅に合わせて自動でメッセージを縮小します。
 * 
 * @param <Actor>
 * @text ＜アクター関連＞
 * 
 * @param UseActorHeadline
 * @text アクターの見出しを使用
 * @parent <Actor>
 * @type boolean
 * @default false
 * @desc レベルアップ時にアクター名の見出しを使用します。
 * 
 * @param ActorHeadline
 * @text アクターの見出し
 * @parent <Actor>
 * @type string
 * @default \c[16]【%1】\c[0]
 * @desc アクター名の見出しです。%1=アクター名
 * 
 * @param <DropItem>
 * @text ＜ドロップアイテム関連＞
 * 
 * @param DropItemHeadline
 * @text ドロップアイテムの見出し
 * @parent <DropItem>
 * @type string
 * @default \c[16]【戦利品】\c[0]
 * @desc ドロップアイテムの見出しです。
 * 不要なら空欄にしてください。
 * 
 * @param DropItemDisplay
 * @text ドロップアイテムの表示
 * @parent <DropItem>
 * @type string
 * @default %2%1 × %3
 * @desc ドロップアイテムの表示形式です。
 * %1=アイテム名, %2=アイコン, %3=個数
 * 
 * @param DropItemNewline
 * @text ドロップアイテムの改行
 * @parent <DropItem>
 * @type boolean
 * @default true
 * @desc ドロップアイテムの見出しの前に改行を挿入します。
 * 
 * @param DropItemConsolidate
 * @text ドロップアイテムの集約
 * @parent <DropItem>
 * @type boolean
 * @default true
 * @desc 同じアイテムならば、ドロップアイテムの個数を集約して表示します。
 * 
 * @param <AdditionalClasses>
 * @text ＜多重職業連携用＞
 * @desc 多重職業プラグインとの連携用の項目です。
 * 
 * @param AC_DisplayStyle
 * @text 【多重】表示方式
 * @parent <AdditionalClasses>
 * @type select
 * @option 改ページ @value page
 * @option 一括表示 @value batch
 * @option 一括＋入力待ち @value input
 * @default input
 * @desc 追加職業のレベルアップ時の動作です。
 * 一括表示なら通常レベルアップと同ページに表示します。
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
    if (str === "") {
        return def;
    }
    return isNaN(str) ? def : +(str || def);
}
function setDefault(str, def) {
    if (str == undefined || str === "") {
        return def;
    }
    return str;
}

const PLUGIN_NAME = "NRP_VictoryRewards";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pNotDisplayVictoryMessage = toBoolean(parameters["NotDisplayVictoryMessage"]);
const pApplyNotBattle = toBoolean(parameters["ApplyNotBattle"]);
const pStartCommmonEvent = setDefault(parameters["StartCommmonEvent"]);
const pEndCommmonEvent = setDefault(parameters["EndCommmonEvent"]);
// ウィンドウ関連
const pVictoryWindowBackground = toNumber(parameters["VictoryWindowBackground"]);
const pWindowX = setDefault(parameters["WindowX"]);
const pWindowY = setDefault(parameters["WindowY"]);
const pWindowWidth = setDefault(parameters["WindowWidth"]);
const pWindowHeight = setDefault(parameters["WindowHeight"]);
const pDefeatWindowBackground = toNumber(parameters["DefeatWindowBackground"]);
const pGradientType = toNumber(parameters["GradientType"], 2);
const pStartGradientSize = toNumber(parameters["StartGradientSize"]);
const pEndGradientSize = toNumber(parameters["EndGradientSize"]);
// メッセージ関連
const pMessageSpeed = toNumber(parameters["MessageSpeed"], 100);
const pFontSize = toNumber(parameters["FontSize"]);
const pLineHeight = toNumber(parameters["LineHeight"]);
const pAdjustMessageX = toNumber(parameters["AdjustMessageX"]);
const pAdjustMessageY = toNumber(parameters["AdjustMessageY"]);
const pMessageFitWidth = toBoolean(parameters["MessageFitWidth"]);
// アクター関連
const pUseActorHeadline = toBoolean(parameters["UseActorHeadline"]);
const pActorHeadline = setDefault(parameters["ActorHeadline"]);
// ドロップアイテム関連
const pDropItemHeadline = setDefault(parameters["DropItemHeadline"]);
const pDropItemDisplay = setDefault(parameters["DropItemDisplay"]);
const pDropItemNewline = toBoolean(parameters["DropItemNewline"]);
const pDropItemConsolidate = toBoolean(parameters["DropItemConsolidate"]);
// 多重職業関連
const pAC_DisplayStyle = setDefault(parameters["AC_DisplayStyle"], "input");

// リザルトウィンドウ表示用フラグ
let mIsRewardsMessage = false;
// 初期化処理利用
let mIsRewardsMessageInit = false;

// ----------------------------------------------------------------------------
// BattleManager
// ----------------------------------------------------------------------------

const _BattleManager_processVictory = BattleManager.processVictory;
BattleManager.processVictory = function() {
    // 開始コモンイベントを実行
    if (pStartCommmonEvent) {
        $gameTemp.reserveCommonEvent(pStartCommmonEvent);
        $gameTroop._interpreter.setupReservedCommonEvent();
        $gameTroop._interpreter.update();
    }

    _BattleManager_processVictory.apply(this, arguments);
};

/**
 * ●勝利メッセージの表示
 */
const _BattleManager_displayVictoryMessage = BattleManager.displayVictoryMessage;
BattleManager.displayVictoryMessage = function() {
    // ウィンドウの変更開始
    mIsRewardsMessage = true;
    mIsRewardsMessageInit = true;

    // 勝利メッセージの背景
    if (pVictoryWindowBackground != null) {
        $gameMessage.setBackground(pVictoryWindowBackground);
    }

    // メッセージ非表示
    if (pNotDisplayVictoryMessage) {
        return;
    }
    _BattleManager_displayVictoryMessage.apply(this, arguments);
};

/**
 * ●敗北メッセージの表示
 */
const _BattleManager_displayDefeatMessage = BattleManager.displayDefeatMessage;
BattleManager.displayDefeatMessage = function() {
    // 敗北メッセージの背景
    if (pDefeatWindowBackground != null) {
        $gameMessage.setBackground(pDefeatWindowBackground);
    }
    _BattleManager_displayDefeatMessage.apply(this, arguments);
};

/**
 * ●戦闘終了
 */
const _BattleManager_updateBattleEnd = BattleManager.updateBattleEnd;
BattleManager.updateBattleEnd = function() {
    // 終了コモンイベントを実行
    if (pEndCommmonEvent) {
        $gameTemp.reserveCommonEvent(pEndCommmonEvent);
        $gameTroop._interpreter.setupReservedCommonEvent();
        $gameTroop._interpreter.update();
    }
    _BattleManager_updateBattleEnd.apply(this, arguments);
    // ウィンドウの変更終了
    mIsRewardsMessage = false;
}

/**
 * 【上書】ドロップアイテムの表示
 */
BattleManager.displayDropItems = function() {
    const items = this._rewards.items;
    if (items.length == 0) {
        return;
    }

    // 集約用の配列
    const groupItems = [];

    for (const item of items) {
        // 集約しない場合は一つずつ登録
        if (!pDropItemConsolidate) {
            groupItems.push({item: item, count: 1});
            continue;
        }

        // 既にアイテムが登録されているならば加算。
        const findItem = groupItems.find(i => i.item == item);
        if (findItem) {
            findItem.count++;
            continue;
        }
        
        // 集約のため、アイテムと個数を紐づける。
        groupItems.push({item: item, count: 1});
    }

    // 改行を挿入
    if (pDropItemNewline) {
        $gameMessage.add("");
    }
    // 見出しを挿入
    if (pDropItemHeadline) {
        $gameMessage.add(pDropItemHeadline);
    }

    for (const group of groupItems) {
        const item = group.item;
        // 表示の指定がある場合
        if (pDropItemDisplay) {
            $gameMessage.add(pDropItemDisplay.format(item.name, "\\i[" + item.iconIndex + "]", group.count));
        // 指定がない場合はデフォルトの用語
        } else {
            $gameMessage.add(TextManager.obtainItem.format(item.name));
        }
    }
};

// ----------------------------------------------------------------------------
// Game_Actor
// ----------------------------------------------------------------------------

// レベルアップ判定用
let mTempLevelUp = false;

/**
 * ●経験値の取得
 */
const _Game_Actor_gainExp = Game_Actor.prototype.gainExp;
Game_Actor.prototype.gainExp = function(exp) {
    mTempLevelUp = false;
    // この中でレベルアップ表示処理が行われる。
    _Game_Actor_gainExp.apply(this, arguments);
    mTempLevelUp = false;
};

/**
 * ●レベルアップメッセージの表示
 */
const _Game_Actor_displayLevelUp = Game_Actor.prototype.displayLevelUp;
Game_Actor.prototype.displayLevelUp = function(newSkills) {
    _Game_Actor_displayLevelUp.apply(this, arguments);

    mTempLevelUp = true;

    if (pUseActorHeadline && pActorHeadline) {
        // ※以下、メソッドの上書きを避けるために面倒なことをしています。
        // 本来のレベルアップメッセージを取得
        const levelUpMessage = TextManager.levelUp.format(
            this._name,
            TextManager.level,
            this._level
        );

        // 出力するメッセージを後ろから検索する。
        for (let i = $gameMessage._texts.length - 1; i >= 0; i--) {
            // レベルアップメッセージを探す。
            if ($gameMessage._texts[i] == levelUpMessage) {
                // 一行前に名前を出力
                $gameMessage._texts.splice(i, 0, pActorHeadline.format(this._name));
                return;
            }
        }
    }
};

// ----------------------------------------------------------------------------
// Window_Message
// ----------------------------------------------------------------------------

// NRP_MessagePicture.jsとの競合対策
const PLUGIN_NAME_MESSAGE_PICTURE = "NRP_MessagePicture";
const parametersMessagePicture = PluginManager.parameters(PLUGIN_NAME_MESSAGE_PICTURE);
const pShowAboveWindow = toBoolean(parametersMessagePicture["ShowAboveWindow"]);
const pShowBelowMessages = toBoolean(parametersMessagePicture["ShowBelowMessages"]);

/**
 * 【独自】勝利表示の初期化を行う
 */
Window_Message.prototype.initVictoryRewards = function() {
    // ウィンドウの変更実行
    const x = setDefault(eval(pWindowX), this.x);
    const y = setDefault(eval(pWindowY), this.y);
    const width = setDefault(eval(pWindowWidth), this.width);
    const height = setDefault(eval(pWindowHeight), this.height);

    // ウィンドウのサイズ調整
    this.move(x, y, width, height);
    // サイズに合わせて表示行数を変更
    this.createContents();

    // contentsSpriteの位置をウィンドウに合わせる。
    if (pShowAboveWindow && pShowBelowMessages) {
        this.contentsSprite().x = this.x;
        this.contentsSprite().y = this.y;
    }

    // メッセージ用スプライトを位置調整
    if (pAdjustMessageX) {
        this.contentsSprite().x += pAdjustMessageX;
    }
    if (pAdjustMessageY) {
        this.contentsSprite().y += pAdjustMessageY;
    }

    // 初期化終了
    mIsRewardsMessageInit = false;
};

/**
 * ●ウィンドウを開く更新処理
 */
const _Window_Message_updateOpen = Window_Message.prototype.updateOpen;
Window_Message.prototype.updateOpen = function() {
    if (this._opening) {
        // 勝利メッセージ表示中
        // ※一度だけ実行したいので初期化時のみ。
        if (mIsRewardsMessage && mIsRewardsMessageInit) {
            this.initVictoryRewards();
        }
    }

    _Window_Message_updateOpen.apply(this, arguments);
};

/**
 * ●メッセージウィンドウの配置
 */
const _Window_Message_updatePlacement = Window_Message.prototype.updatePlacement;
Window_Message.prototype.updatePlacement = function() {
    // 既に配置済みなので処理停止
    if (mIsRewardsMessage) {
        return;
    }

    _Window_Message_updatePlacement.apply(this, arguments);
}

/**
 * メソッドが未定義の場合は事前に定義
 * ※これをしておかないと以後の親側への追記が反映されない。
 */
if (Window_Message.prototype.lineHeight == Window_Base.prototype.lineHeight) {
    Window_Message.prototype.lineHeight = function() {
        return Window_Base.prototype.lineHeight.apply(this, arguments);
    }
}

/**
 * ●行の縦幅
 */
const _Window_Message_lineHeight = Window_Message.prototype.lineHeight;
Window_Message.prototype.lineHeight = function() {
    // 勝利メッセージ表示中、かつ行の縦幅変更
    if (mIsRewardsMessage && pLineHeight) {
        return pLineHeight;
    }
    return _Window_Message_lineHeight.apply(this, arguments);
};

/**
 * メソッドが未定義の場合は事前に定義
 * ※これをしておかないと以後の親側への追記が反映されない。
 */
if (Window_Message.prototype.resetFontSettings == Window_Base.prototype.resetFontSettings) {
    Window_Message.prototype.resetFontSettings = function() {
        return Window_Base.prototype.resetFontSettings.apply(this, arguments);
    }
}

const _Window_Message_resetFontSettings = Window_Message.prototype.resetFontSettings;
Window_Message.prototype.resetFontSettings = function() {
    _Window_Message_resetFontSettings.apply(this, arguments);

    // 勝利メッセージ表示中、かつフォントサイズ変更
    if (mIsRewardsMessage && pFontSize) {
        this.contents.fontSize = pFontSize;
    }
};

/**
 * メソッドが未定義の場合は事前に定義
 * ※これをしておかないと以後の親側への追記が反映されない。
 */
if (Window_Message.prototype.updateOpen == Window_Base.prototype.updateOpen) {
    Window_Message.prototype.updateOpen = function() {
        return Window_Base.prototype.updateOpen.apply(this, arguments);
    }
}

/**
 * 【独自】文字描画用のスプライトを取得
 */
Window_Message.prototype.contentsSprite = function() {
    // ＭＺ用
    if (this._contentsSprite) {
        return this._contentsSprite;
    // ＭＶ用
    } else if (this._windowContentsSprite) {
        return this._windowContentsSprite;
    }
}

// 黒背景の場合
if (pVictoryWindowBackground == 1) {
    /**
     * メソッドが未定義の場合は事前に定義
     * ※これをしておかないと以後の親側への追記が反映されない。
     */
    if (Window_Message.prototype.refreshDimmerBitmap == Window_Base.prototype.refreshDimmerBitmap) {
        Window_Message.prototype.refreshDimmerBitmap = function() {
            return Window_Base.prototype.refreshDimmerBitmap.apply(this, arguments);
        }
    }

    /**
     * ●黒背景
     */
    const _Window_Message_refreshDimmerBitmap = Window_Message.prototype.refreshDimmerBitmap;
    Window_Message.prototype.refreshDimmerBitmap = function() {
        // 戦闘勝利時以外は対象外
        if (!mIsRewardsMessage) {
            _Window_Message_refreshDimmerBitmap.apply(this, arguments);
            return;
        }

        // 黒背景の場合のみ初期化されてない場合があるので再調整。
        if (mIsRewardsMessageInit) {
            this.initVictoryRewards();
        }

        if (this._dimmerSprite) {
            const bitmap = this._dimmerSprite.bitmap;

            // サイズを反映
            const windowWidth = setDefault(eval(pWindowWidth) + 8, this.width + 8);
            const windowHeight = setDefault(eval(pWindowHeight), this.height);

            const m1 = startGradientSize(this);
            const m2 = endGradientSize(this);
            const c1 = ColorManager.dimColor1();
            const c2 = ColorManager.dimColor2();
            bitmap.resize(windowWidth, windowHeight);

            // wとhはグラデーション部分を除いた幅
            let w = windowWidth;
            let h = windowHeight;

            // 横のグラデーション領域を確保
            if (pGradientType == 1) {
                w -= m1 + m2;
            // 縦のグラデーション領域を確保
            } else if (pGradientType == 2) {
                h -= m1 + m2;
            }

            // 横のグラデーション
            if (pGradientType == 1) {
                // 左
                bitmap.gradientFillRect(0, 0, m1, h, c2, c1, false);
                // 非グラデーション部分
                bitmap.fillRect(m1, 0, w, h, c1);
                // 右
                bitmap.gradientFillRect(m1 + w, 0, m2, h, c1, c2, false);

            // 縦のグラデーション
            } else if (pGradientType == 2) {
                // 上
                bitmap.gradientFillRect(0, 0, w, m1, c2, c1, true);
                // 非グラデーション部分
                bitmap.fillRect(0, m1, w, h, c1);
                // 下
                bitmap.gradientFillRect(0, m1 + h, w, m2, c1, c2, true);
            }

            this._dimmerSprite.setFrame(0, 0, windowWidth, windowHeight);
        }
    };
}

/**
 * 【独自】開始グラデーション幅を取得
 */
function startGradientSize(win) {
    if (pStartGradientSize != undefined) {
        return eval(pStartGradientSize);
    }
    // 指定がなければ余白を取得
    return win.padding;
};

/**
 * 【独自】終了グラデーション幅を取得
 */
function endGradientSize(win) {
    if (pEndGradientSize != undefined) {
        return eval(pEndGradientSize);
    }
    // 指定がなければ余白を取得
    return win.padding;
};

// ----------------------------------------------------------------------------
// メッセージの横幅調整
// ----------------------------------------------------------------------------

if (pMessageFitWidth) {
    // 現在行を保有する文字列
    let mLineText = "";
    // 文字表示調整用
    let mTextScale = null;
    // 制御を行わない
    let mNoControl = false;

    /**
     * ●変数初期化
     */
    const _Window_Message_initMembers = Window_Message.prototype.initMembers;
    Window_Message.prototype.initMembers = function() {
        _Window_Message_initMembers.apply(this, arguments);
        mTextScale = null;
    };

    /**
     * メソッドが未定義の場合は事前に定義
     * ※これをしておかないと以後の親側への追記が反映されない。
     */
    if (Window_Message.prototype.flushTextState == Window_Base.prototype.flushTextState) {
        Window_Message.prototype.flushTextState = function() {
            return Window_Base.prototype.flushTextState.apply(this, arguments);
        }
    }

    /**
     * ●文字の出力
     */
    const _Window_Message_flushTextState = Window_Message.prototype.flushTextState;
    Window_Message.prototype.flushTextState = function(textState) {
        // 対象外ならば無視
        if (!mIsRewardsMessage) {
            _Window_Message_flushTextState.apply(this, arguments);
            return;
        }

        // 現在のindexを元に出力中の文字が行の先頭かどうかを判定する。
        const preCharacter = textState.text[textState.index - 1];

        // 先端または改行＆改ページが直前にある。
        if (textState.index <= 1 || preCharacter == "\n" || preCharacter == "\f") {
            let index = textState.index;

            // 先端の場合はなぜか1から始まるので-1する。
            if (textState.index <= 1) {
                index--;
            }

            // 現在の行をクリア
            mLineText = "";
            mTextScale = null;

            // 先頭から行の終端までを結合する。
            while (true) {
                const c = textState.text[index];
                // 終端または改行＆改ページに到達した。
                if (index >= textState.text.length || c == "\n" || c == "\f") {
                    break;
                }

                if (c != null) {
                    mLineText += c;
                }

                index++;
            }

            // 制御文字を除去
            const regExp = /\x1b[a-zA-Z]+\[.+\]/i;
            mLineText = mLineText.replace(regExp, "");
            
            // 行の文字列の横幅を求める。
            // ※mIsRewardsMessageをオフにしないと循環参照になる。
            // ※mNoControlをオンにして制御文字処理を除外
            mIsRewardsMessage = false;
            mNoControl = true;
            const textWidth = this.textSizeEx(mLineText).width;
            mIsRewardsMessage = true;
            mNoControl = false;
            
            // 旧処理（こちらのほうが競合し辛いかも？）
            // const textWidth = this.contents.measureTextWidth(mLineText);

            // 文字列がウィンドウの横幅に収まらない場合
            // ウィンドウの横幅と比較し、縮小率を求める。
            const maxWidth = this.innerWidth - this.padding;
            if (textWidth > maxWidth) {
// console.log(textWidth + " > " + maxWidth + " : " + mLineText);
                mTextScale = maxWidth / textWidth;
            }
        }
        
        _Window_Message_flushTextState.apply(this, arguments);
    };

    /**
     * Window_Message.prototype.textWidthが未定義の場合は事前に定義
     * ※これをしておかないと以後のWindow_Base側への追記が反映されない。
     */
    if (Window_Message.prototype.textWidth == Window_Base.prototype.textWidth) {
        Window_Message.prototype.textWidth = function(text) {
            return Window_Base.prototype.textWidth.apply(this, arguments);
        }
    }

    /**
     * ●文章の横幅を取得
     */
    const _Window_Message_textWidth = Window_Message.prototype.textWidth;
    Window_Message.prototype.textWidth = function(text) {
        let width = _Window_Message_textWidth.apply(this, arguments);

        if (mTextScale) {
            return width * mTextScale;
        }

        return width;
    };

    /**
     * ●制御文字の処理
     */
    const _Window_Message_processControlCharacter = Window_Message.prototype.processControlCharacter;
    Window_Message.prototype.processControlCharacter = function(textState, c) {
        // 文字幅計測中は処理を行わない。
        if (mNoControl) {
            return;
        }
        _Window_Message_processControlCharacter.apply(this, arguments);
    };
}

// ----------------------------------------------------------------------------
// 非戦闘時のレベルアップ対応
// ----------------------------------------------------------------------------

if (pApplyNotBattle) {
    /**
     * ●Change EXP
     */
    const _Game_Interpreter_command315 = Game_Interpreter.prototype.command315;
    Game_Interpreter.prototype.command315 = function(params) {
        const ret = _Game_Interpreter_command315.apply(this, arguments);

        // レベルアップを表示する場合
        // かつ、メッセージが発生した場合
        if (params[5] && $gameMessage.isBusy()) {
            // ウィンドウの変更開始
            mIsRewardsMessage = true;
            mIsRewardsMessageInit = true;

            // 勝利メッセージの背景
            if (pVictoryWindowBackground != null) {
                $gameMessage.setBackground(pVictoryWindowBackground);
            }

            // ウェイトする。
            this.setWaitMode("message");
        }

        return ret;
    };

    /**
     * ●Change Level
     */
    const _Game_Interpreter_command316 = Game_Interpreter.prototype.command316;
    Game_Interpreter.prototype.command316 = function(params) {
        const ret = _Game_Interpreter_command316.apply(this, arguments);

        // レベルアップを表示する場合
        // かつ、メッセージが発生した場合
        if (params[5] && $gameMessage.isBusy()) {
            // ウィンドウの変更開始
            mIsRewardsMessage = true;
            mIsRewardsMessageInit = true;

            // 勝利メッセージの背景
            if (pVictoryWindowBackground != null) {
                $gameMessage.setBackground(pVictoryWindowBackground);
            }

            // ウェイトする。
            this.setWaitMode("message");
        }

        return ret;
    };

    /**
     * ●メッセージ終了時
     */
    const _Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
    Window_Message.prototype.terminateMessage = function() {
        _Window_Message_terminateMessage.apply(this, arguments);

        // フラグをクリア
        mIsRewardsMessage = false;
        mIsRewardsMessageInit = false;
        mTempLevelUp = false;
    };
}

// ----------------------------------------------------------------------------
// メッセージ速度の調整
// ※NRP_MessageSpeed.jsの流用
// ----------------------------------------------------------------------------

let mMessageCount = 0;

/**
 * ●メッセージ開始
 */
const _Window_Message_startMessage = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
    // 戦闘勝利時以外は対象外
    if (!mIsRewardsMessage) {
        _Window_Message_startMessage.apply(this, arguments);
        return;
    }

    // カウント初期化
    mMessageCount = 0;
    _Window_Message_startMessage.apply(this, arguments);
}

/**
 * ●メッセージの更新
 */
const _Window_Message_updateMessage = Window_Message.prototype.updateMessage;
Window_Message.prototype.updateMessage = function() {
    // 戦闘勝利時以外は対象外
    if (!mIsRewardsMessage) {
        return _Window_Message_updateMessage.apply(this, arguments);
    }

    // メッセージがない場合は終了
    if (!this._textState) {
        return false;
    }

    // 出力する文字数を蓄積
    mMessageCount += getMessageSpeed() / 100;
    return _Window_Message_updateMessage.apply(this, arguments);
};

/**
 * ●文字出力の停止判定
 * ※本来は瞬間表示時（false）に文字表示を一気に行うための判定。
 * 　当プラグインでは、これを利用して２文字以上の同時表示を行う。
 */
const _Window_Message_shouldBreakHere = Window_Message.prototype.shouldBreakHere;
Window_Message.prototype.shouldBreakHere = function(textState) {
    // 戦闘勝利時以外は対象外
    if (!mIsRewardsMessage) {
        return _Window_Message_shouldBreakHere.apply(this, arguments);
    }

    // １文字出力したので減算
    mMessageCount--;
    // 追加の出力文字が存在する場合
    if (mMessageCount >= 1 && this.canBreakHere(textState)) {
        // ウェイト命令がある場合は停止
        if (this.isWaiting()) {
            // 出力文字数をクリア
            mMessageCount = 0;
            return true;
        }
        // それ以外は文字表示続行
        return false;
    }

    return _Window_Message_shouldBreakHere.apply(this, arguments);
};

/**
 * ●メッセージ速度を取得
 */
function getMessageSpeed() {
    return pMessageSpeed;
}

// ----------------------------------------------------------------------------
// NRP_AdditionalClasses.jsとの連携
// ----------------------------------------------------------------------------

if (typeof AdditionalClass !== "undefined") {
    /**
     * ●レベルアップメッセージの表示
     */
    const _AdditionalClass_displayLevelUp = AdditionalClass.prototype.displayLevelUp;
    AdditionalClass.prototype.displayLevelUp = function(newSkills) {
        // 非戦闘時のレベルアップ表示
        if (pApplyNotBattle && !$gameParty.inBattle()) {
            // ウィンドウの変更開始
            mIsRewardsMessage = true;
            mIsRewardsMessageInit = true;

            // 勝利メッセージの背景
            if (pVictoryWindowBackground != null) {
                $gameMessage.setBackground(pVictoryWindowBackground);
            }

            // 最初の場合は見出しの表示
            if (pUseActorHeadline && pActorHeadline && $gameMessage._texts.length == 0) {
                _AdditionalClass_displayLevelUp.apply(this, arguments);
                $gameMessage._texts.splice(0, 0, pActorHeadline.format(this.actor()._name));
                mTempLevelUp = true;
                return;
            }
        }

        _AdditionalClass_displayLevelUp.apply(this, arguments);

        // 出力するメッセージを後ろから検索する。
        for (let i = $gameMessage._texts.length - 1; i >= 0; i--) {
            // 改ページが含まれている場合
            if ($gameMessage._texts[i].indexOf("\f") != -1) {
                // 既にレベルアップ表示後の場合は改ページせずに接続する。
                // ※通常レベルアップまたは別の職業レベルアップ
                if (mTempLevelUp) {
                    // 改ページ除去して改行を付加
                    if (pAC_DisplayStyle == "batch") {
                        $gameMessage._texts[i] = $gameMessage._texts[i].replace("\f", "\n");
                    // 改ページ除去して改行＋入力待ちを付加
                    } else if (pAC_DisplayStyle == "input") {
                        $gameMessage._texts[i] = $gameMessage._texts[i].replace("\f", "\n\\!");
                    }

                // 職業レベルアップのみの場合は改ページの直後に名前表示を行う。
                } else {
                    if (pUseActorHeadline && pActorHeadline) {
                        $gameMessage._texts.splice(i + 1, 0, pActorHeadline.format(this.actor()._name));
                    }
                    mTempLevelUp = true;
                }
                return;
            }
        }
    };
}

})();
