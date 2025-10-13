//=============================================================================
// NRP_OriginalShop.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.011 Create a store using your original currency.
 * @author Takeshi Sunagawa (https://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/498394064.html
 *
 * @help Create a store using your original currency.
 * Refer to variables for values of original currency.
 * Can be used for prizes such as casinos as well as
 * for original systems。
 * 
 * You can also prohibit the sale of specified items at regular stores
 * so that they can only be traded in the original currency.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Register the variable you want to treat
 * as the original currency in "CurrencyVariable".
 * 
 * If you call the store with "Switch" turned on,
 * you can trade in the original currency.
 * 
 * If the switch is turned on and you specify \$ in the message,
 * the notation of the money in your possession will also be
 * in the original currency.
 * 
 * ※Note that this plugin by itself does not support functions
 *   such as "displaying original currency on the menu screen"
 *   or "gaining original currency during battle victories".
 * 
 * -------------------------------------------------------------------
 * [Trade Restriction]
 * -------------------------------------------------------------------
 * The specified items can be sold only at the original currency store.
 * Specify the conditions in the "TargetItemList", "TargetWeaponList"
 * and "TargetArmorList" plugin parameters.
 * 
 * Also, items registered here will not be able to be sold
 * at regular stores.
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
 * @param CurrencyVariable
 * @type variable
 * @desc This variable is treated as the original currency.
 * 
 * @param Switch
 * @type switch
 * @default 1
 * @desc This switch enables the original currency.
 * Switches the store only when this is on.
 * 
 * @param <TargetItems>
 * 
 * @param TargetItemList
 * @parent <TargetItems>
 * @type struct<TargetItem>[]
 * @desc A list specifying the conditions for the target items.
 * Only items specified here can be sold.
 * 
 * @param TargetWeaponList
 * @parent <TargetItems>
 * @type struct<TargetWeapon>[]
 * @desc A list specifying the conditions for the target weapons.
 * Only weapons specified here can be sold.
 * 
 * @param TargetArmorList
 * @parent <TargetItems>
 * @type struct<TargetArmor>[]
 * @desc A list specifying the conditions for the target armors.
 * Only armors specified here can be sold.
 * 
 * @param NoCategory
 * @parent <TargetItems>
 * @type boolean
 * @default false
 * @desc No category is displayed at the time of sale.
 * 
 * @param <Message>
 * 
 * @param Prefix
 * @parent <Message>
 * @type string
 * @desc String to be displayed in front of the original currency.
 * Icon (\i[?]) is also valid.
 * 
 * @param Suffix
 * @parent <Message>
 * @type string
 * @default
 * @desc String to be displayed after the original currency.
 * Icon (\i[?]) is also valid.
 * 
 * @param MessageBuy
 * @parent <Message>
 * @type string
 * @desc The message to be displayed as a buy command.
 * 
 * @param MessageSale
 * @parent <Message>
 * @type string
 * @desc The message to be displayed as a sale command.
 * 
 * @param MessageCancel
 * @parent <Message>
 * @type string
 * @desc The message to be displayed as a cancel command.
 * 
 * @param <Sound>
 * 
 * @param SoundBuy
 * @parent <Sound>
 * @type file
 * @dir audio/se
 * @desc This is the sound effect of the buy.
 * 
 * @param SoundSale
 * @parent <Sound>
 * @type file
 * @dir audio/se
 * @desc This is the sound effect of the sale.
 */

/*~struct~TargetItem:
 * @param ItemType
 * @type string
 * @desc Target item type. Multiple allowed.
 * 1:Regular, 2:Key, 3:Hidden A, 4:Hidden B
 * 
 * @param ItemId
 * @type string
 * @desc Target item ID.
 * Multiple allowed. (e.g.: 1,2,4~6)
 */
/*~struct~TargetWeapon:
 * @param WeaponType
 * @type string
 * @desc Target weapon type.
 * Multiple allowed. (e.g.: 1,2,4~6)
 * 
 * @param WeaponId
 * @type string
 * @desc Target weapon ID.
 * Multiple allowed. (e.g.: 1,2,4~6)
 */
/*~struct~TargetArmor:
 * @param ArmorType
 * @type string
 * @desc Target armor type.
 * Multiple allowed. (e.g.: 1,2,4~6)
 * 
 * @param EquipType
 * @type string
 * @desc Equipment Type. Below: default values for DB.
 * 1:Weapon, 2:Shield, 3:Head, 4:Body, 5:Accessory
 * 
 * @param ArmorId
 * @type string
 * @desc Target armor ID.
 * Multiple allowed. (e.g.: 1,2,4~6)
 */

/*:ja
 * @target MZ
 * @plugindesc v1.011 独自通貨を使用した店を作成します。
 * @author 砂川赳（https://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/498394064.html
 *
 * @help 独自通貨を使用した店を作成します。
 * 独自通貨の管理には変数を使用します。
 * カジノなどの景品の他、独自システムにも使用できます。
 * 
 * また、指定したアイテムを通常の店で売却禁止とすることで、
 * 独自通貨でしか取引できないようにもできます。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * 『独自通貨の変数』に独自通貨として扱いたい変数を登録してください。
 * 
 * 『有効にするスイッチ』がオンになっている状態で店を呼び出すと、
 * 独自通貨で取引を行うことができます。
 * 
 * スイッチがオンの状態でメッセージ内に\$を指定すれば、
 * 所持金の表記も独自通貨のものになります。
 * 
 * ※なお、このプラグイン単体ではメニュー画面への独自通貨の表示や、
 * 　戦闘勝利時の独自通貨の獲得といった機能はサポートしていません。
 * 
 * -------------------------------------------------------------------
 * ■取引制限
 * -------------------------------------------------------------------
 * 指定したアイテムを独自通貨の店でのみ、売却できるようになります。
 * プラグインパラメータの『対象アイテムリスト』『対象武器リスト』
 * 『対象防具リスト』に条件を指定してください。
 * 
 * また、ここに登録したアイテムは通常の店では売却できなくなります。
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
 * @param CurrencyVariable
 * @text 独自通貨の変数
 * @type variable
 * @desc 独自通貨として扱う変数です。
 * 
 * @param Switch
 * @text 有効にするスイッチ
 * @type switch
 * @default 1
 * @desc 独自通貨を有効にするスイッチです。
 * これがオンの時のみ店を切替します。
 * 
 * @param <TargetItems>
 * @text ＜対象アイテム＞
 * 
 * @param TargetItemList
 * @parent <TargetItems>
 * @text 対象アイテムリスト
 * @type struct<TargetItem>[]
 * @desc 対象アイテムの条件を指定するリストです。
 * ここで指定したアイテムのみ売却できます。
 * 
 * @param TargetWeaponList
 * @parent <TargetItems>
 * @text 対象武器リスト
 * @type struct<TargetWeapon>[]
 * @desc 対象武器の条件を指定するリストです。
 * ここで指定した武器のみ売却できます。
 * 
 * @param TargetArmorList
 * @parent <TargetItems>
 * @text 対象防具リスト
 * @type struct<TargetArmor>[]
 * @desc 対象防具の条件を指定するリストです。
 * ここで指定した防具のみ売却できます。
 * 
 * @param NoCategory
 * @parent <TargetItems>
 * @text カテゴリ表示しない
 * @type boolean
 * @default false
 * @desc 売却時はカテゴリ表示をしません。
 * 
 * @param <Message>
 * @text ＜文言＞
 * 
 * @param Prefix
 * @parent <Message>
 * @text 前の文字列
 * @type string
 * @desc 独自通貨の前方に表示する文字列です。
 * アイコン（\i[?]）も有効です。
 * 
 * @param Suffix
 * @parent <Message>
 * @text 後の文字列
 * @type string
 * @default 個
 * @desc 独自通貨の後方に表示する文字列です。
 * アイコン（\i[?]）も有効です。
 * 
 * @param MessageBuy
 * @parent <Message>
 * @text 購入メッセージ
 * @type string
 * @desc 購入コマンドとして表示するメッセージです。
 * 
 * @param MessageSale
 * @parent <Message>
 * @text 売却メッセージ
 * @type string
 * @desc 売却コマンドとして表示するメッセージです。
 * 
 * @param MessageCancel
 * @parent <Message>
 * @text キャンセルメッセージ
 * @type string
 * @desc キャンセルコマンドとして表示するメッセージです。
 * 
 * @param <Sound>
 * @text ＜効果音＞
 * 
 * @param SoundBuy
 * @text 購入時の効果音
 * @parent <Sound>
 * @type file
 * @dir audio/se
 * @desc 購入した際の効果音です。
 * 
 * @param SoundSale
 * @text 売却時の効果音
 * @parent <Sound>
 * @type file
 * @dir audio/se
 * @desc 売却した際の効果音です。
 */

/*~struct~TargetItem:ja
 * @param ItemType
 * @text アイテムタイプ
 * @type string
 * @desc 対象とするアイテムタイプです。複数指定可。
 * 1:通常, 2:大事, 3:隠しＡ, 4:隠しＢ
 * 
 * @param ItemId
 * @text アイテムＩＤ
 * @type string
 * @desc 対象とするアイテムＩＤです。
 * 複数指定可（例：1,2,4~6）
 */
/*~struct~TargetWeapon:ja
 * @param WeaponType
 * @text 武器タイプ
 * @type string
 * @desc 対象とする武器タイプです。
 * 複数指定可（例：1,2,4~6）
 * 
 * @param WeaponId
 * @text 武器ＩＤ
 * @type string
 * @desc 対象とする武器ＩＤです。
 * 複数指定可（例：1,2,4~6）
 */
/*~struct~TargetArmor:ja
 * @param ArmorType
 * @text 防具タイプ
 * @type string
 * @desc 対象とする防具タイプです。
 * 複数指定可（例：1,2,4~6）
 * 
 * @param EquipType
 * @text 装備タイプ
 * @type string
 * @desc 装備タイプです。以下はＤＢのデフォルト値です。
 * 1:武器, 2:盾, 3:頭, 4:身体, 5:装飾品
 * 
 * @param ArmorId
 * @text 防具ＩＤ
 * @type string
 * @desc 対象とする防具ＩＤです。
 * 複数指定可（例：1,2,4~6）
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

const PLUGIN_NAME = "NRP_OriginalShop";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pCurrencyVariable = toNumber(parameters["CurrencyVariable"]);
const pSwitch = toNumber(parameters["Switch"]);
const pTargetItemList = parseStruct2(parameters["TargetItemList"]);
const pTargetWeaponList = parseStruct2(parameters["TargetWeaponList"]);
const pTargetArmorList = parseStruct2(parameters["TargetArmorList"]);
const pNoCategory = toBoolean(parameters["NoCategory"], false);
const pPrefix = setDefault(parameters["Prefix"]);
const pSuffix = setDefault(parameters["Suffix"]);
const pMessageBuy = setDefault(parameters["MessageBuy"]);
const pMessageSale = setDefault(parameters["MessageSale"]);
const pMessageCancel = setDefault(parameters["MessageCancel"]);
const pSoundBuy = setDefault(parameters["SoundBuy"]);
const pSoundSale = setDefault(parameters["SoundSale"]);

//-----------------------------------------------------------------------------
// Scene_Shop
//-----------------------------------------------------------------------------

/**
 * ●購入
 */
const _Scene_Shop_doBuy = Scene_Shop.prototype.doBuy;
Scene_Shop.prototype.doBuy = function(number) {
    // 独自通貨を減算
    if (isOriginalShop()) {
        const oldValue = $gameVariables.value(pCurrencyVariable);
        $gameVariables.setValue(pCurrencyVariable, oldValue - number * this.buyingPrice());
        $gameParty.gainItem(this._item, number);
        return;
    }
    _Scene_Shop_doBuy.apply(this, arguments);
};

/**
 * ●売却
 */
const _Scene_Shop_doSell = Scene_Shop.prototype.doSell;
Scene_Shop.prototype.doSell = function(number) {
    // 独自通貨を減算
    if (isOriginalShop()) {
        const oldValue = $gameVariables.value(pCurrencyVariable);
        $gameVariables.setValue(pCurrencyVariable, oldValue + number * this.sellingPrice());
        $gameParty.loseItem(this._item, number);
        return;
    }
    _Scene_Shop_doSell.apply(this, arguments);
};

let mBuySound = false;
let mSaleSound = false;

/**
 * ●個数確定時
 */
const _Scene_Shop_onNumberOk = Scene_Shop.prototype.onNumberOk;
Scene_Shop.prototype.onNumberOk = function() {
    // 独自通貨の場合かつ効果音が設定されている場合
    if (isOriginalShop() && (pSoundBuy || pSoundSale)) {
        // 効果音用のフラグを立てる。
        switch (this._commandWindow.currentSymbol()) {
            case "buy":
                mBuySound = true;
                break;
            case "sell":
                mSaleSound = true;
                break;
        }
    }

    _Scene_Shop_onNumberOk.apply(this, arguments);

    mBuySound = false;
    mSaleSound = false;
};

//-----------------------------------------------------------------------------
// SoundManager
//-----------------------------------------------------------------------------

/**
 * ●購入、売却時の効果音
 */
const _SoundManager_playShop = SoundManager.playShop;
SoundManager.playShop = function() {
    // 購入時の効果音
    if (mBuySound) {
        AudioManager.playSe({"name":pSoundBuy, "volume":90, "pitch":100, "pan":0})
        return;
    // 売却時の効果音
    } else if (mSaleSound) {
        AudioManager.playSe({"name":pSoundSale, "volume":90, "pitch":100, "pan":0})
        return;
    }
    _SoundManager_playShop.apply(this, arguments);
};

//-----------------------------------------------------------------------------
// Window_ItemCategory
//-----------------------------------------------------------------------------

const _Window_ItemCategory_needsSelection = Window_ItemCategory.prototype.needsSelection;
Window_ItemCategory.prototype.needsSelection = function() {
    // 独自通貨使用時かつカテゴリが無効な場合
    if (isOriginalShop() && pNoCategory) {
        return false;
    }
    return _Window_ItemCategory_needsSelection.apply(this, arguments);
};

//-----------------------------------------------------------------------------
// Window_Gold
//-----------------------------------------------------------------------------

/**
 * ●金額の表示
 */
const _Window_Gold_value = Window_Gold.prototype.value;
Window_Gold.prototype.value = function() {
    // 独自通貨を表示
    if (isOriginalShop()) {
        return $gameVariables.value(pCurrencyVariable);
    }
    return _Window_Gold_value.apply(this, arguments);
};

/**
 * ●通貨単位
 */
const _Window_Gold_currencyUnit = Window_Gold.prototype.currencyUnit;
Window_Gold.prototype.currencyUnit = function() {
    // 独自単位を表示
    if (isOriginalShop()) {
        return pSuffix;
    }
    return _Window_Gold_currencyUnit.apply(this, arguments);
};

/**
 * ●更新
 */
const _Window_Gold_refresh = Window_Gold.prototype.refresh;
Window_Gold.prototype.refresh = function() {
    if (!isOriginalShop()) {
        _Window_Gold_refresh.apply(this, arguments);
        return;
    }

    // 独自通貨の表示
    const rect = this.itemLineRect(0);
    const x = rect.x;
    const y = rect.y;
    const width = rect.width;
    this.contents.clear();

    // 値を取得
    const prefix = pPrefix;
    const suffix = pSuffix;
    const value = this.value();
    let prefixWidth = prefix ? this.textWidth(prefix) : 0;
    const suffixWidth = suffix ? this.textWidth(suffix) : 0;

    if (prefix) {
        this.changeTextColor(ColorManager.systemColor());
        prefixWidth = this.drawTextExNoReset(prefix, x, y, prefixWidth);
    }
    if (value != null) {
        this.resetTextColor();
        this.drawText(value, x + prefixWidth, y, width - prefixWidth - suffixWidth - 6, "right");
    }
    if (suffix) {
        this.changeTextColor(ColorManager.systemColor());
        this.drawTextExNoReset(suffix, x + width - suffixWidth, y, suffixWidth);
    }
};

/**
 * ●文字列描画処理
 * ※Window_Base.prototype.drawTextExとほぼ同じだがフォントリセットしない。
 */
Window_Gold.prototype.drawTextExNoReset = function(text, x, y, width) {
    const textState = this.createTextState(text, x, y, width);
    this.processAllText(textState);
    return textState.outputWidth;
};

//-----------------------------------------------------------------------------
// Window_ShopCommand
//-----------------------------------------------------------------------------

/**
 * ●ショップコマンド
 */
const _Window_ShopCommand_makeCommandList = Window_ShopCommand.prototype.makeCommandList;
Window_ShopCommand.prototype.makeCommandList = function() {
    if (isOriginalShop()) {
        // 該当項目が存在する場合は使用する。
        if (pMessageBuy || pMessageSale || pMessageCancel) {
            this.addCommand(pMessageBuy, "buy");
            this.addCommand(pMessageSale, "sell", !this._purchaseOnly);
            this.addCommand(pMessageCancel, "cancel");
            return;
        }
    }

    _Window_ShopCommand_makeCommandList.apply(this, arguments);
};

//-----------------------------------------------------------------------------
// Window_ShopBuy
//-----------------------------------------------------------------------------

/**
 * ●購入判定
 */
const _Window_ShopBuy_isEnabled = Window_ShopBuy.prototype.isEnabled;
Window_ShopBuy.prototype.isEnabled = function(item) {
    if (isOriginalShop()) {
        // 独自通貨を取得して判定
        const originalMoney = $gameVariables.value(pCurrencyVariable);
        return (
            item && this.price(item) <= originalMoney && !$gameParty.hasMaxItems(item)
        );
    }
    return _Window_ShopBuy_isEnabled.apply(this, arguments);
};

//-----------------------------------------------------------------------------
// Window_ShopSell
//-----------------------------------------------------------------------------

/*
 * Window_ShopSell.prototype.includesが未定義の場合は事前に定義
 * ※これをしておかないと以後のWindow_ItemList側への追記が反映されない。
 */
if (Window_ShopSell.prototype.includes == Window_ItemList.prototype.includes) {
    Window_ShopSell.prototype.includes = function(item) {
        return Window_ItemList.prototype.includes.apply(this, arguments);
    }
}

/**
 * ●カテゴリ毎の表示判定
 */
const _Window_ShopSell_includes = Window_ShopSell.prototype.includes;
Window_ShopSell.prototype.includes = function(item) {
    // 空欄または非表示制御を行わない場合はそのまま
    if (!item || !isLimitTarget()) {
        return _Window_ShopSell_includes.apply(this, arguments);
    }

    // 通常ショップの場合
    if (!isOriginalShop()) {
        const ret = _Window_ShopSell_includes.apply(this, arguments);
        // 表示対象のアイテムでも独自通貨対象だった場合は無効に
        if (ret && isOriginalShopItem(item)) {
            return false;
        }
        return ret;
    }

    // カテゴリ無効ではない。
    // かつ、無効なカテゴリの場合は終了
    if (!pNoCategory && !_Window_ShopSell_includes.apply(this, arguments)) {
        return false;
    }

    // 独自通貨対象アイテムかどうか？
    return isOriginalShopItem(item);
};

/**
 * ●カテゴリウィンドウの領域
 */
const _Scene_Shop_categoryWindowRect = Scene_Shop.prototype.categoryWindowRect;
Scene_Shop.prototype.categoryWindowRect = function() {
    const rect = _Scene_Shop_categoryWindowRect.apply(this, arguments);
    // 独自通貨使用時かつカテゴリが無効な場合は高さを０として扱う
    if (isOriginalShop() && pNoCategory) {
        rect.height = 0;
    }
    return rect;
};

/**
 * ●独自通貨対象アイテムかどうか？
 */
function isOriginalShopItem(item) {
    // アイテムの場合
    if (DataManager.isItem(item)) {
        if (pTargetItemList && pTargetItemList.length) {
            for (const targetItemData of pTargetItemList) {
                // 有効なアイテムタイプに一致するかどうか？
                if (targetItemData.ItemType) {
                    const types = textToArray(targetItemData.ItemType);
                    if (types.some(type => type == item.itypeId)) {
                        return true;
                    }
                }
                // 有効なＩＤに一致するかどうか？
                if (targetItemData.ItemId) {
                    const ids = textToArray(targetItemData.ItemId);
                    if (ids.some(id => id == item.id)) {
                        return true;
                    }
                }
            }
            return false;

        // リストの登録がない場合は無効
        } else {
            return false;
        }

    // 武器の場合
    } else if (DataManager.isWeapon(item)) {
        if (pTargetWeaponList && pTargetWeaponList.length) {
            for (const targetWeaponData of pTargetWeaponList) {
                // 有効な武器タイプに一致するかどうか？
                if (targetWeaponData.WeaponType) {
                    const types = textToArray(targetWeaponData.WeaponType);
                    if (types.some(type => type == item.wtypeId)) {
                        return true;
                    }
                }
                // 有効なＩＤに一致するかどうか？
                if (targetWeaponData.WeaponId) {
                    const ids = textToArray(targetWeaponData.WeaponId);
                    if (ids.some(id => id == item.id)) {
                        return true;
                    }
                }
            }
            return false;

        // リストの登録がない場合は無効
        } else {
            return false;
        }

    // 防具の場合
    } else if (DataManager.isArmor(item)) {
        if (pTargetArmorList && pTargetArmorList.length) {
            for (const targetArmorData of pTargetArmorList) {
                // 有効な防具タイプに一致するかどうか？
                if (targetArmorData.ArmorType) {
                    const types = textToArray(targetArmorData.ArmorType);
                    if (types.some(type => type == item.atypeId)) {
                        return true;
                    }
                }
                // 有効な装備タイプに一致するかどうか？
                if (targetArmorData.EquipType) {
                    const types = textToArray(targetArmorData.EquipType);
                    if (types.some(type => type == item.etypeId)) {
                        return true;
                    }
                }
                // 有効なＩＤに一致するかどうか？
                if (targetArmorData.ArmorId) {
                    const ids = textToArray(targetArmorData.ArmorId);
                    if (ids.some(id => id == item.id)) {
                        return true;
                    }
                }
            }
            return false;

        // リストの登録がない場合は無効
        } else {
            return false;
        }
    }
    return false;
}

/**
 * ●対象アイテムの制限を行うかどうか？
 */
function isLimitTarget() {
    // 対象のリストが一つでも設定されて入れば対象とする。
    if (pTargetItemList && pTargetItemList.length) {
        return true;
    } else if (pTargetWeaponList && pTargetWeaponList.length) {
        return true;
    } else if (pTargetArmorList && pTargetArmorList.length) {
        return true;
    }
    return false;
}

//-----------------------------------------------------------------------------
// 共通関数
//-----------------------------------------------------------------------------

/**
 * ●独自通貨かどうか？
 */
function isOriginalShop() {
    // シーンがショップまたはマップであること
    // ※マップは\$による通貨表示用
    if (SceneManager._scene instanceof Scene_Shop || SceneManager._scene instanceof Scene_Map) {
        // かつ、スイッチを満たしていること
        return $gameSwitches.value(pSwitch);
    }
    return false;
}

/**
 * ●文字列を分解して配列に変換する。
 * ※例１："1,2,3" -> [1,2,3]
 * ※例２："1~3" -> [1,2,3]
 */
function textToArray(textArr) {
    const array = [];
    
    // 無効なら処理しない。
    if (textArr === undefined || textArr === null || textArr === "") {
        return array;
    }

    // カンマ区切りでループ
    for (let text of textArr.split(",")) {
        // 空白除去
        text = text.trim();
        // 1~5というように範囲指定の場合
        // ※~が存在する。
        if (text.indexOf("~") >= 0) {
            const rangeVal = text.split("~");
            const rangeStart = eval(rangeVal[0]);
            const rangeEnd = eval(rangeVal[1]);

            // IDの指定範囲で実行
            // 開始のほうが終了より大きい場合は反対に実行
            if (rangeEnd < rangeStart) {
                for (let i = rangeStart; i >= rangeEnd; i--) {
                    array.push(eval(i));
                }
            } else {
                for (let i = rangeStart; i <= rangeEnd; i++) {
                    array.push(eval(i));
                }
            }
            
        // 通常時
        } else {
            try {
                array.push(eval(text));
            // 数式評価できない場合はそのままpush
            } catch (e) {
                array.push(text);
            }
        }
    }
    return array;
}

})();
