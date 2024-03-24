//=============================================================================
// NRP_ShopEquipCommand.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Add an equipment command to the shop.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/489626316.html
 *
 * @help Add an equipment command to the shop.
 * Players will be able to change their equipment
 * without leaving the shop.
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
 * @ [Plugin Parameters]
 * @------------------------------------------------------------------
 * 
 * @param CommandName
 * @type string
 * @desc The name of the command to be displayed in the store.
 * If blank, the term is used as is.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 ショップに装備コマンドを追加
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/489626316.html
 *
 * @help ショップに装備コマンドを追加します。
 * プレイヤーはショップから出ることなく装備を変更できるようになります。
 * 
 * -------------------------------------------------------------------
 * ■利用規約
 * -------------------------------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @------------------------------------------------------------------
 * @ プラグインパラメータ
 * @------------------------------------------------------------------
 * 
 * @param CommandName
 * @text コマンド名
 * @type string
 * @desc ショップに表示するコマンド名です。
 * 空白の場合は用語をそのまま使います。
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

const PLUGIN_NAME = "NRP_ShopEquipCommand";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pCommandName = setDefault(parameters["CommandName"]);

//-----------------------------------------------------------------------------
// Game_Interpreter
//-----------------------------------------------------------------------------

let mKeepGoods;
let mKeepPurchaseOnly;
let mKeepIndex;

/**
 * ●ショップの処理
 */
const _Game_Interpreter_command302 = Game_Interpreter.prototype.command302;
Game_Interpreter.prototype.command302 = function(params) {
    // 変数初期化
    mKeepGoods = null;
    mKeepPurchaseOnly = null;
    mKeepIndex = null;
    return _Game_Interpreter_command302.apply(this, arguments);
};

//-----------------------------------------------------------------------------
// Scene_Equip
//-----------------------------------------------------------------------------

/**
 * ●コマンド生成
 */
const _Scene_Shop_createCommandWindow = Scene_Shop.prototype.createCommandWindow;
Scene_Shop.prototype.createCommandWindow = function() {
    _Scene_Shop_createCommandWindow.apply(this, arguments);
    this._commandWindow.setHandler("equip", this.commandEquip.bind(this));
};

/**
 * 【独自】装備コマンド
 */
Scene_Shop.prototype.commandEquip = function() {
    // 装備画面へ遷移
    SceneManager.push(Scene_Equip);

    // これらの値は本来イベントコマンドから起動した際に引き渡されるが、
    // 装備画面から戻ってきた際は空になってしまう。
    // そこで値を保持しておく。
    mKeepGoods = this._goods;
    mKeepPurchaseOnly = this._purchaseOnly;
    mKeepIndex = this._commandWindow._index;
};

/**
 * ●画面生成
 */
const _Scene_Shop_create = Scene_Shop.prototype.create;
Scene_Shop.prototype.create = function() {
    // Scene_Shop.prototype.prepareが呼び出されていない場合は各値が未設定
    // 装備画面から戻ってきたと判断して再セット
    if (this._goods == null && this._purchaseOnly == null && mKeepGoods != null && mKeepPurchaseOnly != null) {
        this._goods = mKeepGoods;
        this._purchaseOnly = mKeepPurchaseOnly;
        // 変数クリア
        mKeepGoods = null;
        mKeepPurchaseOnly = null;
    }
    _Scene_Shop_create.apply(this, arguments);

    if (mKeepIndex) {
        // カーソルを装備に合わせる
        this._commandWindow.select(mKeepIndex);
        // 変数クリア
        mKeepIndex = null;
    }
};

//-----------------------------------------------------------------------------
// Window_ShopCommand
//-----------------------------------------------------------------------------

/**
 * ●コマンド生成
 */
const _Window_ShopCommand_makeCommandList = Window_ShopCommand.prototype.makeCommandList;
Window_ShopCommand.prototype.makeCommandList = function() {
    _Window_ShopCommand_makeCommandList.apply(this, arguments);

    // 装備コマンドを『やめる』の手前に挿入
    let equipName = TextManager.equip;
    // パラメータがあれば優先使用
    if (pCommandName) {
        equipName = pCommandName;
    }
    this._list.splice(2, 0, {name: equipName, symbol: "equip", enabled: true});
};

/**
 * ●列数の定義
 */
const _Window_ShopCommand_maxCols = Window_ShopCommand.prototype.maxCols;
Window_ShopCommand.prototype.maxCols = function() {
    // 列数を１追加
    return _Window_ShopCommand_maxCols.apply(this, arguments) + 1;
};

})();
