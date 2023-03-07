//=============================================================================
// NRP_ShopCustomize.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.00 Customize the shop scene.
 * @author Takeshi Sunagawa (https://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/498469379.html
 *
 * @help Customize the shop scene as follows.
 * 
 * - Display various parameters of equipment.
 * - Displays actors and their equipment status.
 * - Displays the number of equipped.
 * 
 * I also consider using it in conjunction
 * with a plugin (NRP_EquipSlot.js) to freely change equipment slots.
 * If multiple accessories, etc., can be equipped,
 * the MZ standard display will be uncomfortable,
 * so I have taken steps to prevent that from happening.
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
 * @param DisplayParameters
 * @type string
 * @default 2,3,4,5,6,7
 * @desc Parameters to be displayed. Multiple allowed.
 * 0:HP, 1:MP, 2:ATK ~ 7:LUK
 * 
 * @param DisplayEquipCount
 * @type boolean
 * @default false
 * @desc Displays the number of equipment.
 * 
 * @param EquipCountMessage
 * @parent DisplayEquipCount
 * @type string
 * @default Equipment
 * @desc The term used to indicate the number of pieces of equipment.
 * 
 * @param AboveHelpWindow
 * @type boolean
 * @default false
 * @desc The help window is displayed above the product listings.
 * 
 * @param DisplayActorWindow
 * @type boolean
 * @default true
 * @desc Displays the actor window.
 * 
 * @param ActorWindowHeight
 * @parent DisplayActorWindow
 * @type number @min -999 @max 999
 * @default 100
 * @desc The height of the actor window.
 * 
 * @param ActorAdjustX
 * @parent DisplayActorWindow
 * @type number @min -999 @max 999
 * @default 0
 * @desc Adjusts the X coordinate of the actor.
 * 
 * @param ActorAdjustY
 * @parent DisplayActorWindow
 * @type number
 * @default 0
 * @desc Adjusts the Y coordinate of the actor.
 * 
 * @param ActorInterval
 * @parent DisplayActorWindow
 * @type number
 * @default 80
 * @desc Sets the spacing between actors.
 * 
 * @param ActorWindowPositionH
 * @parent DisplayActorWindow
 * @type select
 * @option left
 * @option right
 * @option all
 * @default right
 * @desc Specifies the position (horizontal direction) of the actor window.
 * 
 * @param ActorWindowPositionV
 * @parent DisplayActorWindow
 * @type select
 * @option upper
 * @option middle
 * @option lower
 * @default middle
 * @desc Specifies the position (vertical direction) of the actor window.
 * 
 * @param DisplayBenchMembers
 * @parent DisplayActorWindow
 * @type boolean
 * @default true
 * @desc The actors in reserve are also displayed in the actor window.
 * 
 * @param <EquipSymbol>
 * @parent DisplayActorWindow
 * @desc A setting related to the display of equipment symbols.
 * 
 * @param CompareParameters
 * @parent <EquipSymbol>
 * @type string
 * @default 2,3,4,5,6,7
 * @desc Parameters to be referenced during comparison.
 * Multiple allowed. 0:HP, 1:MP, 2:ATK ~ 7:LUK
 * 
 * @param NotCompareEquipTypes
 * @parent <EquipSymbol>
 * @type string
 * @desc Equipment type without comparison symbols. Multiple allowed.
 * 
 * @param EquipSymbolAdjustX
 * @parent <EquipSymbol>
 * @type number @min -999 @max 999
 * @default 0
 * @desc Adjust the X coordinate of the equipment symbol.
 * 
 * @param EquipSymbolAdjustY
 * @parent <EquipSymbol>
 * @type number @min -999 @max 999
 * @default 0
 * @desc Adjust the Y coordinate of the equipment symbol.
 * 
 * @param EquipSymbolEquip
 * @parent <EquipSymbol>
 * @type string
 * @default E
 * @desc The symbol of the equipment being equipped. Default:E
 * 
 * @param EquipSymbolUp
 * @parent <EquipSymbol>
 * @type string
 * @default ▲
 * @desc The equipment symbol at the time of status increase. Default:▲
 * 
 * @param EquipSymbolDown
 * @parent <EquipSymbol>
 * @type string
 * @default ▼
 * @desc The equipment symbol at the time of status decrease. Default:▼
 * 
 * @param EquipSymbolEqual
 * @parent <EquipSymbol>
 * @type string
 * @default -
 * @desc The equipment symbol when there is no change in status. Default:-
 * 
 * @param EquipSymbolEquipColor
 * @parent <EquipSymbol>
 * @type number
 * @default 0
 * @desc The system color of the equipment symbol during equipping.
 * 
 * @param EquipSymbolUpColor
 * @parent <EquipSymbol>
 * @type number
 * @default 23
 * @desc The system color of the equipment symbol at the time of status increase.
 * 
 * @param EquipSymbolDownColor
 * @parent <EquipSymbol>
 * @type number
 * @default 2
 * @desc The system color of the equipment symbol at the time of status decrease.
 * 
 * @param EquipSymbolEqualColor
 * @parent <EquipSymbol>
 * @type number
 * @default 0
 * @desc The system color of the equipment symbol when there is no status change.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.00 店画面をカスタマイズします。
 * @author 砂川赳（https://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/498469379.html
 *
 * @help 店画面を以下のようにカスタマイズします。
 * 
 * ・装備品の各種パラメータを表示
 * ・アクターを表示して装備状況を表示
 * ・装備している数を表示
 * 
 * また、装備スロットを自由に変更するプラグイン（NRP_EquipSlot.js）を
 * 使用している場合には、併用をオススメします。
 * 具体的には、装飾品などを複数装備可能とした場合に
 * 違和感が出ないように対応しています。
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
 * @param DisplayParameters
 * @text 表示するパラメータ
 * @type string
 * @default 2,3,4,5,6,7
 * @desc 表示するパラメータです。複数指定可
 * 0:HP, 1:MP, 2:攻撃～7:運
 * 
 * @param DisplayEquipCount
 * @text 装備数を表示
 * @type boolean
 * @default false
 * @desc 装備数を表示します。
 * 
 * @param EquipCountMessage
 * @parent DisplayEquipCount
 * @text 装備数の文言
 * @type string
 * @default 装備している数
 * @desc 装備数を表示する際の文言です。
 * 
 * @param AboveHelpWindow
 * @text ヘルプを上に表示
 * @type boolean
 * @default false
 * @desc ヘルプを商品一覧の上側に表示します。
 * 
 * @param DisplayActorWindow
 * @text アクターウィンドウを表示
 * @type boolean
 * @default true
 * @desc アクターウィンドウを表示します。
 * 
 * @param ActorWindowHeight
 * @parent DisplayActorWindow
 * @text ウィンドウの縦幅
 * @type number @min -999 @max 999
 * @default 100
 * @desc アクターウィンドウの縦幅です。
 * 
 * @param ActorAdjustX
 * @parent DisplayActorWindow
 * @text アクターＸ座標調整
 * @type number @min -999 @max 999
 * @default 0
 * @desc アクターのＸ座標を調整します。
 * 
 * @param ActorAdjustY
 * @parent DisplayActorWindow
 * @text アクターＹ座標調整
 * @type number
 * @default 0
 * @desc アクターのＹ座標を調整します。
 * 
 * @param ActorInterval
 * @parent DisplayActorWindow
 * @text アクター同士の間隔
 * @type number
 * @default 80
 * @desc アクター同士の間隔を設定します。
 * 
 * @param ActorWindowPositionH
 * @parent DisplayActorWindow
 * @text ウィンドウ位置（横）
 * @type select
 * @option 左 @value left
 * @option 右 @value right
 * @option 全体 @value all
 * @default right
 * @desc アクターウィンドウの位置（横方向）を指定します。
 * 
 * @param ActorWindowPositionV
 * @parent DisplayActorWindow
 * @text ウィンドウ位置（縦）
 * @type select
 * @option 上 @value upper
 * @option 中 @value middle
 * @option 下 @value lower
 * @default middle
 * @desc アクターウィンドウの位置（縦方向）を指定します。
 * 下の場合、横位置は強制で全体になります。
 * 
 * @param DisplayBenchMembers
 * @parent DisplayActorWindow
 * @text 控えのアクターも表示
 * @type boolean
 * @default true
 * @desc 控えのアクターもアクターウィンドウ内に表示します。
 * 
 * @param <EquipSymbol>
 * @parent DisplayActorWindow
 * @text ＜装備記号＞
 * @desc 装備記号の表示に関する設定です。
 * 
 * @param CompareParameters
 * @parent <EquipSymbol>
 * @text 比較するパラメータ
 * @type string
 * @default 2,3,4,5,6,7
 * @desc 比較時に参照するパラメータです。複数指定可
 * 0:HP, 1:MP, 2:攻撃～7:運
 * 
 * @param NotCompareEquipTypes
 * @parent <EquipSymbol>
 * @text 比較しない装備タイプ
 * @type string
 * @desc 比較記号を表示しない装備タイプ。複数指定可
 * 複数装備の装飾品などを想定しています。
 * 
 * @param EquipSymbolAdjustX
 * @parent <EquipSymbol>
 * @text 装備記号Ｘ座標調整
 * @type number @min -999 @max 999
 * @default 0
 * @desc 装備記号のＸ座標を調整します。
 * 
 * @param EquipSymbolAdjustY
 * @parent <EquipSymbol>
 * @text 装備記号Ｙ座標調整
 * @type number @min -999 @max 999
 * @default 0
 * @desc 装備記号のＹ座標を調整します。
 * 
 * @param EquipSymbolEquip
 * @parent <EquipSymbol>
 * @text 装備記号（装備中）
 * @type string
 * @default E
 * @desc 装備中の装備記号です。初期値E
 * 
 * @param EquipSymbolUp
 * @parent <EquipSymbol>
 * @text 装備記号（上昇）
 * @type string
 * @default ▲
 * @desc 能力上昇時の装備記号です。初期値▲
 * 
 * @param EquipSymbolDown
 * @parent <EquipSymbol>
 * @text 装備記号（下降）
 * @type string
 * @default ▼
 * @desc 能力下降時の装備記号です。初期値▼
 * 
 * @param EquipSymbolEqual
 * @parent <EquipSymbol>
 * @text 装備記号（等しい）
 * @type string
 * @default -
 * @desc 能力変化なし時の装備記号です。初期値-
 * 
 * @param EquipSymbolEquipColor
 * @parent <EquipSymbol>
 * @text 装備記号（装備中）色
 * @type number
 * @default 0
 * @desc 装備中の装備記号の色です。
 * システムカラーで指定してください。
 * 
 * @param EquipSymbolUpColor
 * @parent <EquipSymbol>
 * @text 装備記号（上昇）色
 * @type number
 * @default 23
 * @desc 能力上昇時の装備記号の色です。
 * システムカラーで指定してください。
 * 
 * @param EquipSymbolDownColor
 * @parent <EquipSymbol>
 * @text 装備記号（下降）色
 * @type number
 * @default 2
 * @desc 能力下降時の装備記号の色です。
 * システムカラーで指定してください。
 * 
 * @param EquipSymbolEqualColor
 * @parent <EquipSymbol>
 * @text 装備記号（等しい）色
 * @type number
 * @default 0
 * @desc 能力変化なし時の装備記号の色です。
 * システムカラーで指定してください。
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

const PLUGIN_NAME = "NRP_ShopCustomize";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pDisplayParameters = setDefault(parameters["DisplayParameters"]);
const pDisplayEquipCount = toBoolean(parameters["DisplayEquipCount"]);
const pEquipCountMessage = setDefault(parameters["EquipCountMessage"]);
const pAboveHelpWindow = toBoolean(parameters["AboveHelpWindow"]);
const pDisplayActorWindow = toBoolean(parameters["DisplayActorWindow"]);
const pActorWindowHeight = toNumber(parameters["ActorWindowHeight"], 100);
const pActorAdjustX = toNumber(parameters["ActorAdjustX"], 0);
const pActorAdjustY = toNumber(parameters["ActorAdjustY"], 0);
const pActorInterval = toNumber(parameters["ActorInterval"], 80);
let pActorWindowPositionH = setDefault(parameters["ActorWindowPositionH"], "right");
const pActorWindowPositionV = setDefault(parameters["ActorWindowPositionV"], "middle");
const pDisplayBenchMembers = toBoolean(parameters["DisplayBenchMembers"], true);
const pCompareParameters = setDefault(parameters["CompareParameters"]);
const pNotCompareEquipTypes = setDefault(parameters["NotCompareEquipTypes"]);
const pEquipSymbolAdjustX = toNumber(parameters["EquipSymbolAdjustX"], 0);
const pEquipSymbolAdjustY = toNumber(parameters["EquipSymbolAdjustY"], 0);
const pEquipSymbolEquip = setDefault(parameters["EquipSymbolEquip"]);
const pEquipSymbolUp = setDefault(parameters["EquipSymbolUp"]);
const pEquipSymbolDown = setDefault(parameters["EquipSymbolDown"]);
const pEquipSymbolEqual = setDefault(parameters["EquipSymbolEqual"]);
const pEquipSymbolEquipColor = toNumber(parameters["EquipSymbolEquipColor"], 0);
const pEquipSymbolUpColor = toNumber(parameters["EquipSymbolUpColor"], 0);
const pEquipSymbolDownColor = toNumber(parameters["EquipSymbolDownColor"], 0);
const pEquipSymbolEqualColor = toNumber(parameters["EquipSymbolEqualColor"], 0);

// 下表示の場合は強制で横方向を全体化
if (pActorWindowPositionV == "lower") {
    pActorWindowPositionH = "all";
}

//-----------------------------------------------------------------------------
// Scene_Shop
//-----------------------------------------------------------------------------

/**
 * ●ヘルプを上部に表示する場合
 */
if (pAboveHelpWindow) {
    /**
     * ●コマンドウィンドウの作成
     */
    const _Scene_Shop_createCommandWindow = Scene_Shop.prototype.createCommandWindow;
    Scene_Shop.prototype.createCommandWindow = function() {
        _Scene_Shop_createCommandWindow.apply(this, arguments);

        // ヘルプウィンドウをコマンドウィンドウの下に移動
        this._helpWindow.y = this._commandWindow.y + this._commandWindow.height;
    };

    /**
     * ●ダミーウィンドウの表示領域
     * ※ショップの最初に表示される空のウィンドウのこと
     */
    const _Scene_Shop_dummyWindowRect = Scene_Shop.prototype.dummyWindowRect;
    Scene_Shop.prototype.dummyWindowRect = function() {
        const ret = _Scene_Shop_dummyWindowRect.apply(this, arguments);
        // ヘルプウィンドウより下に移動
        ret.y += this._helpWindow.height;
        return ret;
    };
}

if (pDisplayActorWindow) {
    /**
     * ●各種ウィンドウの生成
     */
    const _Scene_Shop_create = Scene_Shop.prototype.create;
    Scene_Shop.prototype.create = function() {
        _Scene_Shop_create.apply(this, arguments);
        // アクター用ウィンドウの生成
        this.createShopActorWindow();
    };

    /**
     * ●ステータスウィンドウの表示領域
     */
    const _Scene_Shop_statusWindowRect = Scene_Shop.prototype.statusWindowRect;
    Scene_Shop.prototype.statusWindowRect = function() {
        const rect = _Scene_Shop_statusWindowRect.apply(this, arguments);
        // 右寄せの場合と全体表示の場合
        if (pActorWindowPositionH == "right" || pActorWindowPositionH == "all") {
            // ウィンドウを縮める。
            rect.height = rect.height - pActorWindowHeight;
        }
        return rect;
    };

    /**
     * ●数値ウィンドウの表示領域
     */
    const _Scene_Shop_numberWindowRect = Scene_Shop.prototype.numberWindowRect;
    Scene_Shop.prototype.numberWindowRect = function() {
        const rect = _Scene_Shop_numberWindowRect.apply(this, arguments);
        // 左寄せの場合と全体表示の場合
        if (pActorWindowPositionH == "left" || pActorWindowPositionH == "all") {
            // ウィンドウを縮める。
            rect.height = rect.height - pActorWindowHeight;
        }
        return rect;
    };

    /**
     * ●購入ウィンドウの表示領域
     */
    const _Scene_Shop_buyWindowRect = Scene_Shop.prototype.buyWindowRect;
    Scene_Shop.prototype.buyWindowRect = function() {
        const rect = _Scene_Shop_buyWindowRect.apply(this, arguments);
        // 左寄せの場合と全体表示の場合
        if (pActorWindowPositionH == "left" || pActorWindowPositionH == "all") {
            // ウィンドウを縮める。
            rect.height = rect.height - pActorWindowHeight;
        }
        return rect;
    };

    /**
     * 【独自】アクター用ウィンドウの生成
     */
    Scene_Shop.prototype.createShopActorWindow = function() {
        const rect = this.shopActorWindowRect();
        this._shopActorWindow = new Window_ShopActor(rect);
        this._shopActorWindow.hide();
        this.addWindow(this._shopActorWindow);

        // ステータスウィンドウに連携
        this._statusWindow.setShopActorWindow(this._shopActorWindow);
    };

    /**
     * 【独自】アクター用ウィンドウの描画領域
     */
    Scene_Shop.prototype.shopActorWindowRect = function() {
        let ww;

        // 画面全体
        if (pActorWindowPositionH == "all") {
            ww = Graphics.boxWidth;
        // 左寄せ
        } else if (pActorWindowPositionH == "left") {
            ww = this._buyWindow.width;
        // 右寄せ
        } else if (pActorWindowPositionH == "right") {
            ww = this.statusWidth();
        }

        const wh = pActorWindowHeight;
        let wx = 0;
        // 右寄せの場合
        if (pActorWindowPositionH == "right") {
            wx = Graphics.boxWidth - ww;
        }

        let wy;

        // 画面上部
        if (pActorWindowPositionV == "upper") {
            wy = this._dummyWindow.y;

            // 右寄せの場合と全体表示の場合
            if (pActorWindowPositionH == "right" || pActorWindowPositionH == "all") {
                // ステータスウィンドウを調整
                this._statusWindow.y = wy + wh;
            }
            // 左寄せの場合と全体表示の場合
            if (pActorWindowPositionH == "left" || pActorWindowPositionH == "all") {
                // 購入ウィンドウ、数値ウィンドウを調整
                this._buyWindow.y = wy + wh;
                this._numberWindow.y = wy + wh;
            }
        // 中間
        } else if (pActorWindowPositionV == "middle") {
            if (pActorWindowPositionH == "left") {
                // 購入ウィンドウの下
                wy = this._buyWindow.y + this._buyWindow.height;
            } else {
                // ステータスウィンドウの下
                wy = this._statusWindow.y + this._statusWindow.height;
            }
        // 画面下部
        } else if (pActorWindowPositionV == "lower") {
            // 一番下
            wy = Graphics.boxHeight - wh;
            // ヘルプウィンドウが下表示の場合
            if (!pAboveHelpWindow) {
                // ヘルプウィンドウを上に移動
                this._helpWindow.y -= wh;
            }
        }

        return new Rectangle(wx, wy, ww, wh);
    };

    /**
     * ●購入ウィンドウの有効化
     */
    const _Scene_Shop_activateBuyWindow = Scene_Shop.prototype.activateBuyWindow;
    Scene_Shop.prototype.activateBuyWindow = function() {
        _Scene_Shop_activateBuyWindow.apply(this, arguments);
        // アクター用ウィンドウを表示
        this._shopActorWindow.show();
    };

    /**
     * ●売却ウィンドウの有効化
     */
    const _Scene_Shop_activateSellWindow = Scene_Shop.prototype.activateSellWindow;
    Scene_Shop.prototype.activateSellWindow = function() {
        _Scene_Shop_activateSellWindow.apply(this, arguments);
        // アクター用ウィンドウを非表示
        this._shopActorWindow.hide();
    };

    /**
     * ●購入キャンセル
     */
    const _Scene_Shop_onBuyCancel = Scene_Shop.prototype.onBuyCancel;
    Scene_Shop.prototype.onBuyCancel = function() {
        _Scene_Shop_onBuyCancel.apply(this, arguments);
        // アクター用ウィンドウを非表示
        this._shopActorWindow.hide();
    };

    /**
     * ●売却確定
     */
    const _Scene_Shop_onSellOk = Scene_Shop.prototype.onSellOk;
    Scene_Shop.prototype.onSellOk = function() {
        _Scene_Shop_onSellOk.apply(this, arguments);
        // アクター用ウィンドウを表示
        this._shopActorWindow.show();
    };
}

//-----------------------------------------------------------------------------
// 【独自】Window_ShopActor（アクター用ウィンドウ）
//-----------------------------------------------------------------------------

function Window_ShopActor() {
    this.initialize(...arguments);
}

Window_ShopActor.prototype = Object.create(Window_StatusBase.prototype);
Window_ShopActor.prototype.constructor = Window_ShopActor;

/**
 * ●初期化
 */
Window_ShopActor.prototype.initialize = function(rect) {
    Window_StatusBase.prototype.initialize.call(this, rect);
    this.createActorSprites();
};

/**
 * ●アイテムの設定
 */
Window_ShopActor.prototype.setup = function(item) {
    this._item = item;
    this.refresh();
}

/**
 * ●リフレッシュ
 */
Window_ShopActor.prototype.refresh = function() {
    let x = 56 + pActorAdjustX;
    const y = 70 + pActorAdjustY;
    const interval = pActorInterval; // 横の間隔

    // アクターの座標および表示を設定
    for (let i = 0; i < this._actorSprites.length; i++) {
        const actorSprite = this._actorSprites[i];
        actorSprite.x = x;
        actorSprite.y = y;

        // 装備状況を反映
        const actor = actorSprite.actor();
        if (actor.canEquip(this._item)) {
            actorSprite.opacity = 255;
        // 装備不可なら半透明
        } else {
            actorSprite.opacity = 128;
        }

        // アクターの装備状況を表示
        let equipSprite = this._equipStateSprites[i];
        equipSprite.x = x + 20 + pEquipSymbolAdjustX;
        equipSprite.y = y - 24 + pEquipSymbolAdjustY;
        equipSprite.bitmap.clear();
        equipSprite.bitmap.fontSize = 20;

        // 間隔を加算
        x += interval;

        const dataItem = this._item;
        // 装備可能な場合は記号を表示
        if (actor.canEquip(dataItem)) {
            let color = 0;
            let symbol = "";

            // 装備中
            if (actor.isEquipped(dataItem)) {
                symbol = pEquipSymbolEquip;
                color = pEquipSymbolEquipColor;

            // パラメータ変化を表示
            } else {
                // 装備タイプを取得
                const etypeId = dataItem.etypeId;

                // 装備タイプが対象外の場合は表示しない。
                if (pNotCompareEquipTypes) {
                    const notCompareEquipTypes = textToArray(pNotCompareEquipTypes);
                    if (notCompareEquipTypes.some(t => t == etypeId)) {
                        continue;
                    }
                }

                // 装備タイプを元に装備品を取得
                const currentItem = this.currentEquippedItem(actor, etypeId);
                const currentSum = calcParamsSum(currentItem);
                const newSum = calcParamsSum(this._item);

                // パラメータが＋の場合
                if (newSum > currentSum) {
                    symbol = pEquipSymbolUp;
                    color = pEquipSymbolUpColor;

                // パラメータが－の場合
                } else if (newSum < currentSum) {
                    symbol = pEquipSymbolDown;
                    color = pEquipSymbolDownColor;

                // パラメータが変化なしの場合
                } else {
                    symbol = pEquipSymbolEqual;
                    color = pEquipSymbolEqualColor;
                }
            }

            equipSprite.bitmap.textColor = ColorManager.textColor(color);
            equipSprite.bitmap.drawText(symbol, 0, 0, 24, 24, "center");
        }
    }
};

/**
 * ●パラメータの合計を取得
 */
function calcParamsSum(item) {
    // アイテムが存在しない場合は０と見なす
    if (!item || !item.params) {
        return 0;
    }
    const params = item.params;
    const targetParams = pCompareParameters ?? pDisplayParameters;
    const targetParamsArray = textToArray(targetParams);
    let sum = 0;
    for (const paramId of targetParamsArray) {
        if (params[paramId] != null) {
            sum += params[paramId];
        }
    }
    return sum;
}

/**
 * ●アクタースプライトの作成
 */
Window_ShopActor.prototype.createActorSprites = function() {
    this._actorSprites = [];
    this._equipStateSprites = [];

    let members;

    // 控えメンバーも表示
    if (pDisplayBenchMembers) {
        members = $gameParty.members();
    // 戦闘メンバーのみ
    } else {
        members = $gameParty.battleMembers();
    }

    // パーティメンバーでループ
    for (const actor of members) {
        // キャラクター情報を設定
        const characterName = actor.characterName();
        const characterIndex = actor.characterIndex();
        const character = new Game_Character();
        character.setImage(characterName, characterIndex);
        
        // アクター用のスプライトを作成
        const sprite = new Sprite_ShopCustomizeActor(character);
        sprite.setActor(actor);
        this._actorSprites.push(sprite);
        this.addChild(sprite);

        // 装備状況表示用のスプライトを作成
        const equipStateSprite = new Sprite();
        equipStateSprite.bitmap = new Bitmap(24, 24);
        this._equipStateSprites.push(equipStateSprite);
        this.addChild(equipStateSprite);
    }
};

/**
 * ●パラメータＩＤの取得
 */
Window_ShopActor.prototype.paramId = function() {
    return Window_ShopStatus.prototype.paramId.apply(this, arguments);
};

/**
 * ●現在の装備を取得
 */
Window_ShopActor.prototype.currentEquippedItem = function(actor, etypeId) {
    return Window_ShopStatus.prototype.currentEquippedItem.apply(this, arguments);
};

//-----------------------------------------------------------------------------
// Window_ShopStatus
//-----------------------------------------------------------------------------

/**
 * 【独自】アクター用ウィンドウを設定
 */
Window_ShopStatus.prototype.setShopActorWindow = function(shopActorWindow) {
    this._shopActorWindow = shopActorWindow;
};

/**
 * ●表示更新
 */
const _Window_ShopStatus_refresh = Window_ShopStatus.prototype.refresh;
Window_ShopStatus.prototype.refresh = function() {
    _Window_ShopStatus_refresh.apply(this, arguments);

    // アクター用ウィンドウを更新
    if (this._shopActorWindow) {
        this._shopActorWindow.setup(this._item);
    }
};

/**
 * ●装備アイテムかどうかの判定
 */
const _Window_ShopStatus_isEquipItem = Window_ShopStatus.prototype.isEquipItem;
Window_ShopStatus.prototype.isEquipItem = function() {
    const gameItem = new Game_Item(this._item);
    // NRP_EquipItem.jsを考慮
    if (gameItem.isEquipItem()) {
        return true;
    }
    return _Window_ShopStatus_isEquipItem.apply(this, arguments);
};

/**
 * 【上書】装備情報の描画
 */
const _Window_ShopStatus_drawEquipInfo = Window_ShopStatus.prototype.drawEquipInfo;
Window_ShopStatus.prototype.drawEquipInfo = function(x, y) {
    // 装備数を表示
    if (pDisplayEquipCount) {
        this.drawEquipCount(x, this.lineHeight());
        y += this.lineHeight();
    }

    // パラメータの表示
    if (pDisplayParameters) {
        this.drawAllParams(x, y);

    // パラメータの指定がない場合は通常表示
    } else {
        _Window_ShopStatus_drawEquipInfo.call(this, x, y);
    }
};

/**
 * 【独自】装備数を表示
 */
Window_ShopStatus.prototype.drawEquipCount = function(x, y) {
    const width = this.innerWidth - this.itemPadding() - x;
    const possessionWidth = this.textWidth("0000");
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(pEquipCountMessage, x, y, width - possessionWidth);
    this.resetTextColor();

    // 装備数をカウント
    let count = 0
    for (const member of $gameParty.members()) {
        for (const equip of member.equips()) {
            if (this._item == equip) {
                count++;
            }
        }
    }

    this.drawText(count, x, y, width, "right");
};

/**
 * 【独自】パラメータの描画
 */
Window_ShopStatus.prototype.drawAllParams = function(x, y) {
    const parameters = textToArray(pDisplayParameters);
    for (const paramId of parameters) {
        // パラメータの値が存在するか確認
        const value = this.paramValue(paramId);
        if (value != 0 && value != null) {
            // 存在するなら描画
            this.drawItem(x, y, paramId);
            y += this.lineHeight();
        }
    }
};

Window_ShopStatus.prototype.drawItem = function(x, y, paramId) {
    this.drawParamName(x, y, paramId);
    this.drawParam(x, y, paramId);
};

Window_ShopStatus.prototype.drawParamName = function(x, y, paramId) {
    const width = this.paramX() - this.itemPadding() * 2;
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(TextManager.param(paramId), x, y, width);
};

Window_ShopStatus.prototype.drawParam = function(x, y, paramId) {
    const value = this.paramValue(paramId);
    const width = this.innerWidth - this.itemPadding() * 2;
    this.resetTextColor();
    this.drawText(value, x, y, width, "right");
};

/**
 * 【独自】パラメータの値を取得
 */
Window_ShopStatus.prototype.paramValue = function(paramId) {
    if (this._item.params) {
        return this._item.params[paramId];
    }
    return 0;
};

Window_ShopStatus.prototype.paramWidth = function() {
    return 48;
};

Window_ShopStatus.prototype.paramX = function() {
    const itemPadding = this.itemPadding();
    const paramWidth = this.paramWidth();
    return this.innerWidth - itemPadding - paramWidth * 2;
};

//-----------------------------------------------------------------------------
// 【独自】Sprite_ShopCustomizeActor
// ※機能はSprite_Characterに準じるが、
//   マップを想定したメソッドは除去してエラーに対処
//-----------------------------------------------------------------------------

function Sprite_ShopCustomizeActor() {
    this.initialize(...arguments);
}

Sprite_ShopCustomizeActor.prototype = Object.create(Sprite.prototype);
Sprite_ShopCustomizeActor.prototype.constructor = Sprite_ShopCustomizeActor;

Sprite_ShopCustomizeActor.prototype.initialize = function(character) {
    Sprite.prototype.initialize.call(this);
    this.initMembers();
    this.setCharacter(character);
};

Sprite_ShopCustomizeActor.prototype.initMembers = function() {
    this.anchor.x = 0.5;
    this.anchor.y = 1;
    this._character = null;
};

Sprite_ShopCustomizeActor.prototype.setCharacter = function(character) {
    this._character = character;
};

Sprite_ShopCustomizeActor.prototype.setActor = function(actor) {
    this._actor = actor;
};

Sprite_ShopCustomizeActor.prototype.actor = function() {
    return this._actor;
};

Sprite_ShopCustomizeActor.prototype.update = function() {
    Sprite.prototype.update.call(this);
    this.updateBitmap();
    this.updateFrame();
};

Sprite_ShopCustomizeActor.prototype.updateBitmap = function() {
    if (this.isImageChanged()) {
        this._characterName = this._character.characterName();
        this._characterIndex = this._character.characterIndex();
        this.setCharacterBitmap();
    }
};

Sprite_ShopCustomizeActor.prototype.isImageChanged = function() {
    return Sprite_Character.prototype.isImageChanged.call(this);
};

Sprite_ShopCustomizeActor.prototype.setCharacterBitmap = function() {
    Sprite_Character.prototype.setCharacterBitmap.call(this);
};

Sprite_ShopCustomizeActor.prototype.updateFrame = function() {
    Sprite_Character.prototype.updateFrame.call(this);
};

Sprite_ShopCustomizeActor.prototype.updateCharacterFrame = function() {
    const pw = this.patternWidth();
    const ph = this.patternHeight();
    const sx = (this.characterBlockX() + this.characterPatternX()) * pw;
    const sy = (this.characterBlockY() + this.characterPatternY()) * ph;
    this.setFrame(sx, sy, pw, ph);
};

Sprite_ShopCustomizeActor.prototype.characterBlockX = function() {
    return Sprite_Character.prototype.characterBlockX.call(this);
};

Sprite_ShopCustomizeActor.prototype.characterBlockY = function() {
    return Sprite_Character.prototype.characterBlockY.call(this);
};

Sprite_ShopCustomizeActor.prototype.characterPatternX = function() {
    return Sprite_Character.prototype.characterPatternX.call(this);
};

Sprite_ShopCustomizeActor.prototype.characterPatternY = function() {
    return Sprite_Character.prototype.characterPatternY.call(this);
};

Sprite_ShopCustomizeActor.prototype.patternWidth = function() {
    return Sprite_Character.prototype.patternWidth.call(this);
};

Sprite_ShopCustomizeActor.prototype.patternHeight = function() {
    return Sprite_Character.prototype.patternHeight.call(this);
};

//-----------------------------------------------------------------------------
// 共通関数
//-----------------------------------------------------------------------------

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
