//=============================================================================
// NRP_VariableShop.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.00 Create a shop with variable goods.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/504839628.html
 *
 * @help Create a shop with variable goods.
 * 
 * By connecting Shop Processing, you can create a shop
 * where goods change in a complex manner depending on the situation.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Execute the event commands in the following order.
 * 
 * - SetGoods (Plugin Command)
 * - Shop Processing (Multiple Possible)
 * - StartShop (Plugin Command)
 * 
 * Goods are consolidated by executing multiple "SetGoods"
 * followed by "Shop Processing".
 * Combined with conditional branching, goods can be changed at will.
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
 * @command SetGoods
 * @desc Thereafter, the products set up in Shop Processing will be consolidated.
 * 
 * @-----------------------------------------------------
 * 
 * @command StartShop
 * @desc Shop Processing is executed based on the products set by SetGoods.
 * 
 * @arg PurchaseOnly
 * @type boolean
 * @default false
 * @desc Limit the shop to purchases only.
 * 
 * @arg VariableGoodsCount
 * @type variable
 * @desc Stores the number of goods in the specified variable.
 * 
 * @-----------------------------------------------------
 * @ Plugin Parameters
 * @-----------------------------------------------------
 * 
 * @param IgnoreNoGoods
 * @type boolean
 * @default false
 * @desc If the goods do not exist, Shop Processing is ignored.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.00 商品が可変のショップを作成する。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/504839628.html
 *
 * @help 商品が可変のショップを作成します。
 * 
 * ショップの処理を連結することで、
 * 状況に応じて複雑に商品が変化するショップを作成できます。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * 以下の順序でイベントコマンドを実行してください。
 * 
 * ・商品を設定（プラグインコマンド）
 * ・ショップの処理（複数可）
 * ・ショップ開始（プラグインコマンド）
 * 
 * 『商品を設定』の後に『ショップの処理』を複数実行することによって、
 * 商品が連結されていきます。
 * 条件分岐と組み合わせれば、商品を自由に変更できます。
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
 * @command SetGoods
 * @text 商品を設定
 * @desc 以降、ショップの処理で設定した商品を連結していきます。
 * 
 * @-----------------------------------------------------
 * 
 * @command StartShop
 * @text ショップ開始
 * @desc 商品を設定によって、設定した商品を元にショップ画面を開きます。
 * 
 * @arg PurchaseOnly
 * @text 購入のみ
 * @type boolean
 * @default false
 * @desc ショップを購入のみに限定します。
 * 
 * @arg VariableGoodsCount
 * @text 商品数の変数
 * @type variable
 * @desc 商品数を指定した変数に格納します。
 * 
 * @-----------------------------------------------------
 * @ プラグインパラメータ
 * @-----------------------------------------------------
 * 
 * @param IgnoreNoGoods
 * @text 商品がないと無視
 * @type boolean
 * @default false
 * @desc 商品が存在しない場合はショップ開始を無視します。
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

const PLUGIN_NAME = "NRP_VariableShop";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pIgnoreNoGoods = toBoolean(parameters["IgnoreNoGoods"], false);

//-----------------------------------------------------------------------------
// ＭＺ用プラグインコマンド
//-----------------------------------------------------------------------------

// MVには存在しないため、空で定義しておかないとエラーになる。
if (!PluginManager.registerCommand) {
    PluginManager.registerCommand = function() {}
}

// 商品設定モードフラグ
let mSetGoodsFlg = false;
// 設定中の商品
let mSetGoods = null;

/**
 * ●商品の設定
 */
PluginManager.registerCommand(PLUGIN_NAME, "SetGoods", function(args) {
    // 商品をクリア
    mSetGoods = [];
    // 商品設定モード開始
    mSetGoodsFlg = true;
});

/**
 * ●ショップの開始
 */
PluginManager.registerCommand(PLUGIN_NAME, "StartShop", function(args) {
    // 商品の設定によって連結された商品を設定
    const goods = mSetGoods;

    // 変数初期化
    mSetGoods = [];
    mSetGoodsFlg = false;

    // 商品が存在しない場合は無視
    if (pIgnoreNoGoods && goods.length == 0) {
        return;
    }

    // 購入のみ
    const purchaseOnly = toBoolean(args.PurchaseOnly, false);
    // 商品数の変数
    const variableGoodsCount = toNumber(args.VariableGoodsCount);
    if (variableGoodsCount) {
        // 指定した変数に格納
        $gameVariables.value(variableGoodsCount);
    }

    // ショップ起動
    SceneManager.push(Scene_Shop);
    SceneManager.prepareNextScene(goods, purchaseOnly);
});

//-----------------------------------------------------------------------------
// Game_Interpreter
//-----------------------------------------------------------------------------

/**
 * ●ショップの処理
 */
const _Game_Interpreter_command302 = Game_Interpreter.prototype.command302;
Game_Interpreter.prototype.command302 = function(params) {
    // 商品設定モードの場合
    if (mSetGoodsFlg) {
        // 商品を連結していく
        const goods = mSetGoods;
        goods.push(params);
        while (this.nextEventCode() === 605) {
            this._index++;
            goods.push(this.currentCommand().parameters);
        }
        // シーンを開始しない。
        return true;
    }
    return _Game_Interpreter_command302.apply(this, arguments);
};

})();
