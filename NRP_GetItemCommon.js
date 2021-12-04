//=============================================================================
// NRP_GetItemCommon.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Commonize the process of gaining items.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/484654978.html
 *
 * @help Commonize the process of gaining items.
 * Although I refer to items in the following,
 * they are valid for all weapons, armors, and gold.
 * 
 * Automatically calls the Common Event when changing items.
 * In addition, information such as the item name
 * and the amount of change can be referenced by plugin commands.
 * This makes the gaining process common.
 * 
 * You can also prohibit the calling of common events
 * only while the specified switch is on.
 * 
 * ------------------------------------------
 * [Plugin Command MZ]
 * ------------------------------------------
 * Stores each item's information gained immediately
 * before in a variable.
 * If you specify a variable in the message,
 * such as \v[1], the value will be displayed.
 * ※If the target is "Gold", only the amount of change is valid.
 * 
 * ◆GetName
 * Stores the name of the last item gained in a variable.
 * 
 * ◆GetAmount
 * Stores the amount of the last item gained in a variable.
 * 
 * ◆GetDescription
 * Stores the description of the last item gained in a variable.
 * Line breaks are also useful.
 * 
 * ◆GetIcon
 * Stores the icon ID of the last item gained in a variable.
 * 
 * ◆GetCategory
 * Stores the category of the last item gained in a variable.
 * 
 * ◆GetId
 * Stores the ID of the last item gained in a variable.
 * 
 * ◆GetType
 * Stores the type of the last item gained in a variable.
 * Item, Weapon, and Armor, for each types.
 * 
 * For Item, the following applies.
 *   1: Regular Item, 2: Key Item, 3: Hidden Item A, 4: Hidden Item B
 * For Weapon and Armor, please refer to the database setting values.
 * 
 * ◆GetMetaValue
 * Stores the meta value of the last item gained in a variable.
 * Only this item requires the meta name to be specified.
 * 
 * Meta value is a value defined by the user in the note field.
 * For example, suppose you write <Test:100>.
 * If you specify the "Test" part as the meta name,
 * 100 will be stored in the variable.
 * 
 * ------------------------------------------
 * [Plugin Command MV]
 * ------------------------------------------
 * The functions are exactly the same as the MZ version,
 * so I'll skip them.
 * Call the following command.
 * ※No distinction is made between individual capital letters.
 *   Also, do not include [].
 * 
 * ◆GetName
 * NRP.GetItemCommon.GetName [VariableId]
 * 
 * ◆GetAmount
 * NRP.GetItemCommon.GetAmount [VariableId]
 * 
 * ◆GetDescription
 * NRP.GetItemCommon.GetDescription [VariableId]
 * 
 * ◆GetIcon
 * NRP.GetItemCommon.GetIcon [VariableId]
 * 
 * ◆GetCategory
 * NRP.GetItemCommon.GetCategory [VariableId]
 * 
 * ◆GetId
 * NRP.GetItemCommon.GetId [VariableId]
 * 
 * ◆GetType
 * NRP.GetItemCommon.GetType [VariableId]
 * 
 * ◆GetEquipType
 * NRP.GetItemCommon.GetEquipType [VariableId]
 * 
 * ◆GetMetaValue
 * NRP.GetItemCommon.GetMetaValue [MetaName] [VariableId]
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 * 
 * @command GetName
 * @desc Stores the name of the last item gained in a variable.
 * 
 * @arg Variable
 * @desc A variable that stores the name of the item.
 * @type variable
 * 
 * 
 * @command GetAmount
 * @desc Stores the amount of the last item gained in a variable.
 * 
 * @arg Variable
 * @desc A variable that stores the amount of the item.
 * @type variable
 * 
 * 
 * @command GetDescription
 * @desc Stores the description of the last item gained in a variable.
 * 
 * @arg Variable
 * @desc A variable that stores the description of the item.
 * @type variable
 * 
 * 
 * @command GetIcon
 * @desc Stores the icon ID of the last item gained in a variable.
 * 
 * @arg Variable
 * @desc A variable that stores the icon ID of the item.
 * @type variable
 * 
 * 
 * @command GetCategory
 * @desc Stores the category of the last item gained in a variable.
 * 0:Gold, 1:Item, 2:Weapon, 3:Armor
 * 
 * @arg Variable
 * @desc A variable that stores the category of the item.
 * @type variable
 * 
 * 
 * @command GetId
 * @desc Stores the ID of the last item gained in a variable.
 * 
 * @arg Variable
 * @desc A variable that stores the ID of the item.
 * @type variable
 * 
 * 
 * @command GetType
 * @desc Stores the type of the last item gained in a variable.
 * Item, Weapon, and Armor, for each types.
 * 
 * @arg Variable
 * @desc A variable that stores the item type of the item.
 * @type variable
 * 
 * 
 * @command GetEquipType
 * @desc Stores the equip type of the last armor gained in a variable.
 * 
 * @arg Variable
 * @desc A variable that stores the equip type of the item.
 * @type variable
 * 
 * 
 * @command GetMetaValue
 * @desc Stores the meta value of the last item gained in a variable.
 * 
 * @arg MetaName
 * @desc The name of the meta value definition.
 * e.g. this is the Test part in <Test:100>.
 * @type string
 * 
 * @arg Variable
 * @desc A variable that stores the meta value of the item.
 * @type variable
 * 
 * 
 * @param GoldCommonEvent
 * @type common_event
 * @desc A common event that is called when gold increases or decreases.
 * 
 * @param ItemCommonEvent
 * @type common_event
 * @desc A common event that is called when items increase or decrease.
 * 
 * @param WeaponCommonEvent
 * @type common_event
 * @desc A common event that is called when weapons increase or decrease.
 * 
 * @param ArmorCommonEvent
 * @type common_event
 * @desc A common event that is called when armors increase or decrease.
 * 
 * @param DisableSwitch
 * @type switch
 * @desc Disables the invocation of the common event while the switch is on.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 アイテムの入手処理を共通化します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/484654978.html
 *
 * @help アイテムの入手処理を共通化します。
 * なお、以下ではアイテムと記載していますが、
 * 武器、防具、所持金の全てに対して有効です。
 * 
 * アイテムの増減時、自動的にコモンイベントを呼び出します。
 * さらにアイテム名や増減量などの情報をプラグインコマンドで参照できます。
 * これにより、入手処理の共通化を実現します。
 * 
 * また、指定のスイッチがオンの間だけ、
 * コモンイベントの呼び出しを禁止することもできます。
 * 
 * ------------------------------------------
 * ■ＭＺ版プラグインコマンド
 * ------------------------------------------
 * 直前に入手したアイテムの各情報を変数に格納します。
 * メッセージ内で\v[1]のように変数を指定すると、値が表示されます。
 * ※対象が『所持金』の場合は増減量のみが有効となります。
 * 
 * ◆アイテム名を取得
 * 直前に入手したアイテムの名前を変数へ格納します。
 * 
 * ◆増減量を取得
 * 直前に入手したアイテムの増減量を変数へ格納します。
 * 
 * ◆説明文を取得
 * 直前に入手したアイテムの説明文を変数へ格納します。
 * 改行も有効です。
 * 
 * ◆アイコンを取得
 * 直前に入手したアイテムのアイコンＩＤを変数へ格納します。
 * 
 * ◆分類を取得
 * 直前に入手したアイテムの分類を変数へ格納します。
 * 
 * ◆ＩＤを取得
 * 直前に入手したアイテムＩＤを変数へ格納します。
 * 
 * ◆タイプを取得
 * 直前に入手したアイテムのタイプを変数へ格納します。
 * アイテム、武器、防具、それぞれのタイプに対応します。
 * 
 * アイテムの場合は以下の通りです。
 * 　1:通常アイテム、2:大事なもの、3:隠しアイテムA、4:隠しアイテムB
 * 武器防具についてはデータベースの設定値を参照してください。
 * 
 * ◆装備タイプを取得
 * 直前に入手した防具の装備タイプを変数へ格納します。
 * 
 * ◆メタ値を取得
 * 直前に入手したアイテムのメタ値を変数へ格納します。
 * この項目のみ定義名の指定が必要です。
 * 
 * メタ値とはメモ欄にユーザが定義した値のことです。
 * 例えば、<Test:100>と記述した場合、
 * 『Test』の部分を定義名に指定すると、変数に100が格納されます。
 * 
 * ------------------------------------------
 * ■ＭＶ版プラグインコマンド
 * ------------------------------------------
 * 機能はＭＺ版と全く同じなので割愛します。
 * 以下のコマンドを呼び出してください。
 * ※大文字個別は区別しません。また[]は含まないでください。
 * 
 * ◆アイテム名を取得
 * NRP.GetItemCommon.GetName [変数ＩＤ]
 * 
 * ◆増減量を取得
 * NRP.GetItemCommon.GetAmount [変数ＩＤ]
 * 
 * ◆説明文を取得
 * NRP.GetItemCommon.GetDescription [変数ＩＤ]
 * 
 * ◆アイコンを取得
 * NRP.GetItemCommon.GetIcon [変数ＩＤ]
 * 
 * ◆分類を取得
 * NRP.GetItemCommon.GetCategory [変数ＩＤ]
 * 
 * ◆ＩＤを取得
 * NRP.GetItemCommon.GetId [変数ＩＤ]
 * 
 * ◆タイプを取得
 * NRP.GetItemCommon.GetType [変数ＩＤ]
 * 
 * ◆装備タイプを取得
 * NRP.GetItemCommon.GetEquipType [変数ＩＤ]
 * 
 * ◆メタ値を取得
 * NRP.GetItemCommon.GetMetaValue [定義名] [変数ＩＤ]
 * 
 * ------------------------------------------
 * ■利用規約
 * ------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @command GetName
 * @text アイテム名を取得
 * @desc 直前に入手したアイテム（武器・防具）の名前を変数へ格納します。
 * 
 * @arg Variable
 * @text 変数
 * @desc アイテム名を格納する変数です。
 * @type variable
 * 
 * 
 * @command GetAmount
 * @text 増減量を取得
 * @desc 直前に入手したアイテム（武器・防具）または所持金の増減量を変数へ格納します。
 * 
 * @arg Variable
 * @text 変数
 * @desc 増減量を格納する変数です。
 * @type variable
 * 
 * 
 * @command GetDescription
 * @text 説明文を取得
 * @desc 直前に入手したアイテム（武器・防具）の説明文を変数へ格納します。
 * 
 * @arg Variable
 * @text 変数
 * @desc 説明文を格納する変数です。
 * @type variable
 * 
 * 
 * @command GetIcon
 * @text アイコンを取得
 * @desc 直前に入手したアイテムのアイコンＩＤを変数へ格納します。
 * 
 * @arg Variable
 * @text 変数
 * @desc アイテムのアイコンＩＤを格納する変数です。
 * @type variable
 * 
 * 
 * @command GetCategory
 * @text 分類を取得
 * @desc 直前に入手したアイテムの分類を変数へ格納します。
 * 0:所持金、1:アイテム、2:武器、3:防具
 * 
 * @arg Variable
 * @text 変数
 * @desc アイテム分類を格納する変数です。
 * @type variable
 * 
 * 
 * @command GetId
 * @text アイテムＩＤを取得
 * @desc 直前に入手したアイテム（武器・防具）のＩＤを変数へ格納します。
 * 
 * @arg Variable
 * @text 変数
 * @desc アイテムＩＤを格納する変数です。
 * @type variable
 * 
 * 
 * @command GetType
 * @text タイプを取得
 * @desc 直前に入手したアイテムのタイプを変数へ格納します。
 * アイテム、武器、防具、それぞれのタイプに対応します。
 * 
 * @arg Variable
 * @text 変数
 * @desc タイプを格納する変数です。
 * @type variable
 * 
 * 
 * @command GetEquipType
 * @text 装備タイプを取得
 * @desc 直前に入手した防具の装備タイプを変数へ格納します。
 * 
 * @arg Variable
 * @text 変数
 * @desc 装備タイプを格納する変数です。
 * @type variable
 * 
 * 
 * @command GetMetaValue
 * @text メタ値を取得
 * @desc 直前に入手したアイテム（武器・防具）のメタ値を変数へ格納します。
 * 
 * @arg MetaName
 * @text 定義名
 * @desc メタ値の定義名です。
 * ※例：<Test:100>ならTestの部分に当たります。
 * @type string
 * 
 * @arg Variable
 * @text 変数
 * @desc メタ値を格納する変数です。
 * @type variable
 * 
 * 
 * @param GoldCommonEvent
 * @text 所持金コモンイベント
 * @type common_event
 * @desc 所持金の増減時に呼び出されるコモンイベントです。
 * 
 * @param ItemCommonEvent
 * @text アイテムコモンイベント
 * @type common_event
 * @desc アイテムの増減時に呼び出されるコモンイベントです。
 * 
 * @param WeaponCommonEvent
 * @text 武器コモンイベント
 * @type common_event
 * @desc 武器の増減時に呼び出されるコモンイベントです。
 * 
 * @param ArmorCommonEvent
 * @text 防具コモンイベント
 * @type common_event
 * @desc 防具の増減時に呼び出されるコモンイベントです。
 * 
 * @param DisableSwitch
 * @text 無効化スイッチ
 * @type switch
 * @desc 指定のスイッチがオンの間、コモンイベントの呼び出しを無効化します。
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

const PLUGIN_NAME = "NRP_GetItemCommon";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pGoldCommonEvent = toNumber(parameters["GoldCommonEvent"]);
const pItemCommonEvent = toNumber(parameters["ItemCommonEvent"]);
const pWeaponCommonEvent = toNumber(parameters["WeaponCommonEvent"]);
const pArmorCommonEvent = toNumber(parameters["ArmorCommonEvent"]);
const pDisableSwitch = toNumber(parameters["DisableSwitch"]);

/**
 * 値の保持
 */
let mItemName = null;
let mItemAmount = null;
let mItemDescription = null;
let mItemIcon = null;
let mItemCategory = null;
let mItemId = null;
let mType = null;
let mEquipType = null;
let mItemMeta = null;

/**
 * ●所持金の増減
 */
const _Game_Interpreter_command125 = Game_Interpreter.prototype.command125;
Game_Interpreter.prototype.command125 = function(params) {
    mItemCategory = 0;
    const result = _Game_Interpreter_command125.apply(this, arguments);

    if (pGoldCommonEvent && canCallCommon()) {
        const commonEvent = $dataCommonEvents[pGoldCommonEvent];
        this.setupChild(commonEvent.list);
    }

    return result;
};

/**
 * ●アイテムの増減
 */
const _Game_Interpreter_command126 = Game_Interpreter.prototype.command126;
Game_Interpreter.prototype.command126 = function(params) {
    mItemCategory = 1;
    const result = _Game_Interpreter_command126.apply(this, arguments);

    if (pItemCommonEvent && canCallCommon()) {
        const commonEvent = $dataCommonEvents[pItemCommonEvent];
        this.setupChild(commonEvent.list);
    }

    return result;
};

/**
 * ●武器の増減
 */
const _Game_Interpreter_command127 = Game_Interpreter.prototype.command127;
Game_Interpreter.prototype.command127 = function(params) {
    mItemCategory = 2;
    const result = _Game_Interpreter_command127.apply(this, arguments);

    if (pWeaponCommonEvent && canCallCommon()) {
        const commonEvent = $dataCommonEvents[pWeaponCommonEvent];
        this.setupChild(commonEvent.list);
    }

    return result;
};

/**
 * ●防具の増減
 */
const _Game_Interpreter_command128 = Game_Interpreter.prototype.command128;
Game_Interpreter.prototype.command128 = function(params) {
    mItemCategory = 3;
    const result = _Game_Interpreter_command128.apply(this, arguments);

    if (pArmorCommonEvent && canCallCommon()) {
        const commonEvent = $dataCommonEvents[pArmorCommonEvent];
        this.setupChild(commonEvent.list);
    }

    return result;
};

/**
 * ●アイテムの入手
 */
const _Game_Party_gainItem = Game_Party.prototype.gainItem;
Game_Party.prototype.gainItem = function(item, amount, includeEquip) {
    mItemName = item.name;
    mItemAmount = amount;
    mItemDescription = item.description;
    mItemIcon = item.iconIndex;
    mItemId = item.id;

    // アイテム、武器、防具によって分岐
    mType = null;
    if (mItemCategory == 1) {
        mType = item.itypeId;
    } else if (mItemCategory == 2) {
        mType = item.wtypeId;
    } else if (mItemCategory == 3) {
        mType = item.atypeId;
    }
    
    mEquipType = item.etypeId;
    mItemMeta = item.meta;

    _Game_Party_gainItem.apply(this, arguments);
}

/**
 * ●所持金の増減
 */
const _Game_Party_gainGold = Game_Party.prototype.gainGold;
Game_Party.prototype.gainGold = function(amount) {
    mItemName = null;
    mItemAmount = amount;
    mItemDescription = null;
    mItemId = null;
    mType = null;
    mEquipType = null;
    mItemMeta = null;

    _Game_Party_gainGold.apply(this, arguments);
};

//----------------------------------------
// ＭＺ用プラグインコマンド
//----------------------------------------

// MVには存在しないため、空で定義しておかないとエラーになる。
if (!PluginManager.registerCommand) {
    PluginManager.registerCommand = function() {}
}

/**
 * ●アイテム名の取得
 */
PluginManager.registerCommand(PLUGIN_NAME, "GetName", function(args) {
    const variableId = toNumber(args.Variable);
    setVariableValue(variableId, mItemName);
});

/**
 * ●アイテム増減量の取得
 */
PluginManager.registerCommand(PLUGIN_NAME, "GetAmount", function(args) {
    const variableId = toNumber(args.Variable);
    setVariableValue(variableId, mItemAmount);
});

/**
 * ●アイテム説明文の取得
 */
PluginManager.registerCommand(PLUGIN_NAME, "GetDescription", function(args) {
    const variableId = toNumber(args.Variable);
    setVariableValue(variableId, mItemDescription);
});

/**
 * ●アイテムアイコンの取得
 */
PluginManager.registerCommand(PLUGIN_NAME, "GetIcon", function(args) {
    const variableId = toNumber(args.Variable);
    setVariableValue(variableId, mItemIcon);
});

/**
 * ●アイテム分類の取得
 */
PluginManager.registerCommand(PLUGIN_NAME, "GetCategory", function(args) {
    const variableId = toNumber(args.Variable);
    setVariableValue(variableId, mItemCategory);
});

/**
 * ●アイテムＩＤの取得
 */
PluginManager.registerCommand(PLUGIN_NAME, "GetId", function(args) {
    const variableId = toNumber(args.Variable);
    setVariableValue(variableId, mItemId);
});

/**
 * ●タイプの取得
 */
PluginManager.registerCommand(PLUGIN_NAME, "GetType", function(args) {
    const variableId = toNumber(args.Variable);
    setVariableValue(variableId, mType);
});

/**
 * ●装備タイプの取得
 */
PluginManager.registerCommand(PLUGIN_NAME, "GetEquipType", function(args) {
    const variableId = toNumber(args.Variable);
    setVariableValue(variableId, mEquipType);
});

/**
 * ●メタ値の取得
 */
PluginManager.registerCommand(PLUGIN_NAME, "GetMetaValue", function(args) {
    const metaName = args.MetaName;
    const variableId = toNumber(args.Variable);
    setVariableValue(variableId, eval(mItemMeta[metaName]));
});

//----------------------------------------
// ＭＶ用プラグインコマンド
//----------------------------------------

const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);

    // 小文字化してから判定
    const lowerCommand = command.toLowerCase();
    
    /**
     * ●アイテム名の取得
     */
    if (lowerCommand === "nrp.getitemcommon.getname") {
        const variableId = toNumber(args[0]);
        setVariableValue(variableId, mItemName);

    /**
     * ●アイテム増減量の取得
     */
    } else if (lowerCommand === "nrp.getitemcommon.getamount") {
        const variableId = toNumber(args[0]);
        setVariableValue(variableId, mItemAmount);

    /**
     * ●アイテム説明文の取得
     */
    } else if (lowerCommand === "nrp.getitemcommon.getdescription") {
        const variableId = toNumber(args[0]);
        setVariableValue(variableId, mItemDescription);

    /**
     * ●アイテムアイコンの取得
     */
    } else if (lowerCommand === "nrp.getitemcommon.geticon") {
        const variableId = toNumber(args[0]);
        setVariableValue(variableId, mItemIcon);

    /**
     * ●アイテム分類の取得
     */
    } else if (lowerCommand === "nrp.getitemcommon.getcategory") {
        const variableId = toNumber(args[0]);
        setVariableValue(variableId, mItemCategory);

    /**
     * ●アイテムＩＤの取得
     */
    } else if (lowerCommand === "nrp.getitemcommon.getid") {
        const variableId = toNumber(args[0]);
        setVariableValue(variableId, mItemId);

    /**
     * ●タイプの取得
     */
    } else if (lowerCommand === "nrp.getitemcommon.gettype") {
        const variableId = toNumber(args[0]);
        setVariableValue(variableId, mType);

    /**
     * ●装備タイプの取得
     */
    } else if (lowerCommand === "nrp.getitemcommon.getequiptype") {
        const variableId = toNumber(args[0]);
        setVariableValue(variableId, mEquipType);

    /**
     * ●メタ値の取得
     */
    } else if (lowerCommand === "nrp.getitemcommon.getmetavalue") {
        const metaName = args[0];
        const variableId = toNumber(args[1]);
        setVariableValue(variableId, eval(mItemMeta[metaName]));
    }
};

//----------------------------------------
// 共通関数
//----------------------------------------

/**
 * ●変数に値を設定
 */
function setVariableValue(variableId, value) {
    // 値が無効だった場合はダミーの値を設定
    // ※$gameVariables.value()で数値の0を表示させないため
    if (value === "" || value === undefined || value === null) {
        // 文字の拡大と縮小を同時に実行して空振りさせる。
        value = "\\{\\}";
    }
    $gameVariables.setValue(variableId, value);
}

/**
 * ●コモンイベントの呼び出しが有効か？
 */
function canCallCommon() {
    // スイッチの指定があり、かつオンの場合
    if (pDisableSwitch && $gameSwitches.value(pDisableSwitch)) {
        return false;
    }

    return true;
}

})();
