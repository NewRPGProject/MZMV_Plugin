//=============================================================================
// NRP_PageWindow.js
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc v1.08 The windows can be page-turned left and right.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/475347742.html
 *
 * @help The windows can be page-turned left and right.
 * Also, the cursor will loop up and down.
 * 
 * For more information, please see below.
 * http://newrpg.seesaa.net/article/475347742.html
 * 
 * -------------------------------------------------------------------
 * [Terms]
 * -------------------------------------------------------------------
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but we will respond to defects as far as possible.
 * 
 * @------------------------------------------------------------------
 * @ [Plugin Parameters]
 * @------------------------------------------------------------------
 * 
 * @param disableAutoPaging
 * @type boolean
 * @default false
 * @desc No automatic paging.
 * It is assumed to be specified in "pagingWindowList" and so on.
 * 
 * @param usePageCol1
 * @type boolean
 * @default true
 * @desc The page is also used in a single column window.
 * 
 * @param cursorReverse
 * @type boolean
 * @default false
 * @desc After switching pages, move the cursor position to the opposite direction.
 * 
 * @param noStopCursor
 * @type boolean
 * @default false
 * @desc The cursor is not paused at the edge of the window.
 * 
 * @param selectOverLastSpace
 * @type boolean
 * @default false
 * @desc Allows the cursor to be placed in the space behind the final element.
 * If it is "false", it stops at the last element.
 * 
 * @param <Page Cursor>
 * 
 * @param pageCursorHorizontal
 * @parent <Page Cursor>
 * @type select
 * @option Left @value left
 * @option Center @value center
 * @option Right @value right
 * @option Left & Right @value leftRight
 * @default right
 * @desc This is the horizontal position of the page cursor.
 * 
 * @param pageCursorVertical
 * @parent <Page Cursor>
 * @type select
 * @option Top @value top
 * @option Middle @value middle
 * @option Bottom @value bottom
 * @default bottom
 * @desc The vertical position of the page cursor.
 * 
 * @param pageCursorLeftImage
 * @parent <Page Cursor>
 * @type file
 * @dir img/pictures
 * @desc Specify the image of the left page cursor as a picture.
 * If not specified, the left arrow of the system image is used.
 * 
 * @param pageCursorRightImage
 * @parent <Page Cursor>
 * @type file
 * @dir img/pictures
 * @desc Specify the image of the right page cursor as a picture.
 * If not specified, the right arrow of the system image is used.
 * 
 * @param pageCursorLeftAdjustX
 * @parent <Page Cursor>
 * @type number
 * @max 999
 * @min -999
 * @default 0
 * @desc Adjust the X position to the left page cursor.
 * 
 * @param pageCursorLeftAdjustY
 * @parent <Page Cursor>
 * @type number
 * @max 999
 * @min -999
 * @default 0
 * @desc Adjust the Y position to the left page cursor.
 * 
 * @param pageCursorRightAdjustX
 * @parent <Page Cursor>
 * @type number
 * @max 999
 * @min -999
 * @default 0
 * @desc Adjust the X position to the right page cursor.
 * 
 * @param pageCursorRightAdjustY
 * @parent <Page Cursor>
 * @type number
 * @max 999
 * @min -999
 * @default 0
 * @desc Adjust the Y position to the right page cursor.
 * 
 * @param <Setting Exceptions>
 * 
 * @param pagingEquipSlotList
 * @parent <Setting Exceptions>
 * @type select
 * @option @value
 * @option ON @value ON
 * @option OFF @value OFF
 * @desc Sets whether the equipment slot list will be paged. Ignore the above settings and force override them.
 * 
 * @param pagingEquipList
 * @parent <Setting Exceptions>
 * @type select
 * @option @value
 * @option ON @value ON
 * @option OFF @value OFF
 * @default ON
 * @desc Sets whether the equipment list will be paged.
 * Ignore the above settings and force override them.
 * 
 * @param pagingSaveList
 * @parent <Setting Exceptions>
 * @type select
 * @option @value
 * @option ON @value ON
 * @option OFF @value OFF
 * @default OFF
 * @desc Sets whether the save/load screen is paged.
 * Ignore the above settings and force override them.
 * 
 * @param pagingBattleCommand
 * @parent <Setting Exceptions>
 * @type select
 * @option @value
 * @option ON @value ON
 * @option OFF @value OFF
 * @default
 * @desc Sets whether battle commands(actor/party) will be paged. Ignore the above settings and force override them.
 * 
 * @param pagingWindowList
 * @parent <Setting Exceptions>
 * @type string[]
 * @desc List of additional window names to be paged.
 * e.g.: "Window_MenuCommand"
 * 
 * @param noPagingWindowList
 * @parent <Setting Exceptions>
 * @type string[]
 * @desc List of additional window names that should not be paged.
 * e.g.: "Window_MenuCommand"
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.08 各種ウィンドウを左右でページ切替できるようにします。
 * @author 砂川赳 (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/475347742.html
 *
 * @help 各種ウィンドウを左右でページ切替できるようにします。
 * また、カーソルが上下でループするようになる機能も含まれています。
 * 
 * 詳細は以下をご覧ください。
 * http://newrpg.seesaa.net/article/475347742.html
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
 * @param disableAutoPaging
 * @text ページ化を自動でしない
 * @type boolean
 * @default false
 * @desc 自動でのページ化を行いません。
 * 『ページ化ウィンドウ一覧』などで指定する想定です。
 * 
 * @param usePageCol1
 * @text 一列でもページを使用
 * @type boolean
 * @default true
 * @desc 一列のウィンドウでもページを使用します。
 * 
 * @param cursorReverse
 * @text カーソルを左右反対へ
 * @type boolean
 * @default false
 * @desc ページ切替後、カーソル位置を左右反対へ移動します。
 * 
 * @param noStopCursor
 * @text カーソルを一旦停止しない
 * @type boolean
 * @default false
 * @desc ウィンドウ端でカーソルが一旦停止しないようにします。
 * 
 * @param selectOverLastSpace
 * @text 末尾の空欄を有効に
 * @type boolean
 * @default false
 * @desc 最終要素よりも後ろの空欄にカーソルを合わせられるようにします。
 * falseの場合は最終要素で止まります。
 * 
 * @param <Page Cursor>
 * @text ＜ページカーソル関連＞
 * 
 * @param pageCursorHorizontal
 * @text ページカーソル横位置
 * @parent <Page Cursor>
 * @type select
 * @option 左 @value left
 * @option 中央 @value center
 * @option 右 @value right
 * @option 左右 @value leftRight
 * @default right
 * @desc ページカーソルの横位置です。
 * 
 * @param pageCursorVertical
 * @text ページカーソル縦位置
 * @parent <Page Cursor>
 * @type select
 * @option 上 @value top
 * @option 中央 @value middle
 * @option 下 @value bottom
 * @default bottom
 * @desc ページカーソルの縦位置です。
 * 
 * @param pageCursorLeftImage
 * @text ページカーソル左の画像
 * @parent <Page Cursor>
 * @type file
 * @dir img/pictures
 * @desc ページカーソル左の画像をピクチャーで指定します。
 * 指定なしならシステム画像の左矢印を用います。
 * 
 * @param pageCursorRightImage
 * @text ページカーソル右の画像
 * @parent <Page Cursor>
 * @type file
 * @dir img/pictures
 * @desc ページカーソル右の画像をピクチャーで指定します。
 * 指定なしならシステム画像の右矢印を用います。
 * 
 * @param pageCursorLeftAdjustX
 * @text ページカーソル左Ｘ調整
 * @parent <Page Cursor>
 * @type number
 * @max 999
 * @min -999
 * @default 0
 * @desc ページカーソル左のＸ位置を調整します。
 * 
 * @param pageCursorLeftAdjustY
 * @text ページカーソル左Ｙ調整
 * @parent <Page Cursor>
 * @type number
 * @max 999
 * @min -999
 * @default 0
 * @desc ページカーソル左のＹ位置を調整します。
 * 
 * @param pageCursorRightAdjustX
 * @text ページカーソル右Ｘ調整
 * @parent <Page Cursor>
 * @type number
 * @max 999
 * @min -999
 * @default 0
 * @desc ページカーソル右のＸ位置を調整します。
 * 
 * @param pageCursorRightAdjustY
 * @text ページカーソル右Ｙ調整
 * @parent <Page Cursor>
 * @type number
 * @max 999
 * @min -999
 * @default 0
 * @desc ページカーソル右のＹ位置を調整します。
 * 
 * @param <Setting Exceptions>
 * @text ＜例外設定＞
 * 
 * @param pagingEquipSlotList
 * @text 装備ｽﾛｯﾄ一覧のページ化
 * @parent <Setting Exceptions>
 * @type select
 * @option @value
 * @option ON @value ON
 * @option OFF @value OFF
 * @desc 装備スロット一覧をページ化するかを設定します。
 * 上記の設定を無視して、強制的に設定を上書きします。
 * 
 * @param pagingEquipList
 * @text 装備品一覧のページ化
 * @parent <Setting Exceptions>
 * @type select
 * @option @value
 * @option ON @value ON
 * @option OFF @value OFF
 * @default ON
 * @desc 装備品一覧をページ化するかを設定します。
 * 上記の設定を無視して、強制的に設定を上書きします。
 * 
 * @param pagingSaveList
 * @text セーブ画面のページ化
 * @parent <Setting Exceptions>
 * @type select
 * @option @value
 * @option ON @value ON
 * @option OFF @value OFF
 * @default OFF
 * @desc セーブ・ロード画面をページ化するかを設定します。
 * 上記の設定を無視して、強制的に設定を上書きします。
 * 
 * @param pagingBattleCommand
 * @text 戦闘コマンドのページ化
 * @parent <Setting Exceptions>
 * @type select
 * @option @value
 * @option ON @value ON
 * @option OFF @value OFF
 * @default
 * @desc 戦闘コマンド（アクター／パーティ）をページ化するかを設定します。上記の設定を無視して、強制的に設定を上書きします。
 * 
 * @param pagingWindowList
 * @text ページ化ウィンドウ一覧
 * @parent <Setting Exceptions>
 * @type string[]
 * @desc 追加でページ化するウィンドウ名の一覧です。
 * 例："Window_MenuCommand"など。
 * 
 * @param noPagingWindowList
 * @text 非ページ化ウィンドウ一覧
 * @parent <Setting Exceptions>
 * @type string[]
 * @desc 追加でページ化を禁止するウィンドウ名の一覧です。
 * 例："Window_MenuCommand"など。
 */

(function() {
"use strict";

/**
 * ●構造体をJSで扱えるように変換
 */
function parseStruct1(arg) {
    var ret = [];

    if (arg) {
        JSON.parse(arg).forEach(function(str) {
            ret.push(str);
        });
    }

    return ret;
}
function toBoolean(str) {
    if (str == true) {
        return true;
    }
    return (str == "true") ? true : false;
}
function toNumber(str, def) {
    return isNaN(str) ? def : +(str || def);
}
function setDefault(str, def) {
    return str ? str : def;
}

const parameters = PluginManager.parameters("NRP_PageWindow");
const pDisableAutoPaging = toBoolean(parameters["disableAutoPaging"], false);
const pUsePageCol1 = toBoolean(parameters["usePageCol1"]);
const pCursorReverse = toBoolean(parameters["cursorReverse"], false);
const pNoStopCursor = toBoolean(parameters["noStopCursor"], false);
const pSelectOverLastSpace = toBoolean(parameters["selectOverLastSpace"], false);
// ページカーソル関連
const pPageCursorHorizontal = setDefault(parameters["pageCursorHorizontal"], "right");
const pPageCursorVertical = setDefault(parameters["pageCursorVertical"], "bottom");
const pPageCursorLeftImage = parameters["pageCursorLeftImage"];
const pPageCursorRightImage = parameters["pageCursorRightImage"];
const pPageCursorLeftAdjustX = toNumber(parameters["pageCursorLeftAdjustX"], 0);
const pPageCursorLeftAdjustY = toNumber(parameters["pageCursorLeftAdjustY"], 0);
const pPageCursorRightAdjustX = toNumber(parameters["pageCursorRightAdjustX"], 0);
const pPageCursorRightAdjustY = toNumber(parameters["pageCursorRightAdjustY"], 0);
// 例外設定
const pPagingEquipSlotList = parameters["pagingEquipSlotList"];
const pPagingEquipList = parameters["pagingEquipList"];
const pPagingSaveList = parameters["pagingSaveList"];
const pPagingBattleCommand = parameters["pagingBattleCommand"];
const pPagingWindowList = parseStruct1(parameters["pagingWindowList"]);
const pNoPagingWindowList = parseStruct1(parameters["noPagingWindowList"]);

// ----------------------------------------------------------------------------
// Window_Selectable
// ----------------------------------------------------------------------------

/**
 * ●初期化
 */
const _Window_Selectable_initialize = Window_Selectable.prototype.initialize;
Window_Selectable.prototype.initialize = function() {
    // 時々、this._listを参照するプラグインがあるので初期化しておく。
    if (!this._list) {
        this._list = [];
    }
    _Window_Selectable_initialize.apply(this, arguments);
};

/**
 * 【独自】選択領域の合計
 */
Window_Selectable.prototype.maxCells = function() {
    return this.maxCols() * this.maxRows();
};

/**
 * 【独自】ページ先頭要素のインデックス
 */
Window_Selectable.prototype.pageTopIndex = function() {
    return this.topRow() * this.maxCols();
};

/**
 * 【独自】ページ内選択領域の合計（最終行の空白含む）
 */
Window_Selectable.prototype.pageCells = function() {
    return Math.min(this.maxCells() - this.pageTopIndex(), this.maxPageItems());
};

/**
 * 【独自】合計ページ数
 */
Window_Selectable.prototype.pageCount = function() {
    const pageCount = Math.floor((this.maxCells() - 1) / this.maxPageItems()) + 1;
    return Math.max(pageCount, 1); // 最低でも１
};

/**
 * 【独自】現在ページ番号（0～）
 */
Window_Selectable.prototype.pageNo = function() {
    const pageNo = Math.floor(this.index() / this.maxPageItems());
    return Math.max(pageNo, 0); // 最低でも０
};

/**
 * 【独自】カーソル移動可能な最終インデックス値
 */
Window_Selectable.prototype.maxIndex = function() {
    // 空白選択可能
    if (pSelectOverLastSpace) {
        return this.maxCells() - 1;
    }
    // 空白選択不可
    return this.maxItems() - 1;
};

/**
 * 【独自】ページ処理の対象とするかどうか？
 */
Window_Selectable.prototype.isUsePage = function() {
    const thisName = this.constructor.name;
    // ページ化リストに一致するウィンドウ名が存在する場合
    if (pPagingWindowList.some(function(name){return name == thisName})) {
        return true;

    // 非ページ化リストに一致するウィンドウ名が存在する場合
    } else if (pNoPagingWindowList.some(function(name){return name == thisName})) {
        return false;
    }

    // ページ化を自動でしない場合は対象外
    if (pDisableAutoPaging) {
        return false;
    }
    
    // 一行の場合は対象外
    if (this.isHorizontal()) {
        return false;

    // 『一列でもページを使用』がfalseの場合、１列の場合は対象外
    } else if (!pUsePageCol1 && this.maxCols() == 1) {
        return false;
    }

    return true;
}

/**
 * 【独自】ページ処理の対象とするかどうか？
 */
Window_Options.prototype.isUsePage = function() {
    // オプションは常に対象外
    // 左右での切替があるので適用するとおかしくなる。
    return false;
}

/**
 * 【独自】装備スロット一覧をページ処理の対象とするかどうか？
 */
if (pPagingEquipSlotList) {
    Window_EquipSlot.prototype.isUsePage = function() {
        if (pPagingEquipSlotList == "ON") {
            return true;
        } else if (pPagingEquipSlotList == "OFF") {
            return false;
        }
    };
}

/**
 * 【独自】装備品一覧をページ処理の対象とするかどうか？
 */
if (pPagingEquipList) {
    Window_EquipItem.prototype.isUsePage = function() {
        if (pPagingEquipList == "ON") {
            return true;
        } else if (pPagingEquipList == "OFF") {
            return false;
        }
    };
}

/**
 * 【独自】セーブ・ロード画面をページ処理の対象とするかどうか？
 */
if (pPagingSaveList) {
    Window_SavefileList.prototype.isUsePage = function() {
        if (pPagingSaveList == "ON") {
            return true;
        } else if (pPagingSaveList == "OFF") {
            return false;
        }
    };
}

if (pPagingBattleCommand) {
    /**
     * 【独自】パーティコマンドをページ処理の対象とするかどうか？
     */
    Window_PartyCommand.prototype.isUsePage = function() {
        if (pPagingBattleCommand == "ON") {
            return true;
        } else if (pPagingBattleCommand == "OFF") {
            return false;
        }
    };

    /**
     * 【独自】アクターコマンドをページ処理の対象とするかどうか？
     */
    Window_ActorCommand.prototype.isUsePage = function() {
        if (pPagingBattleCommand == "ON") {
            return true;
        } else if (pPagingBattleCommand == "OFF") {
            return false;
        }
    };
}

/**
 * 【独自】ページが存在するかどうか？
 */
Window_Selectable.prototype.existPage = function() {
    // ページ処理対象外の場合
    if (!this.isUsePage()) {
        return false;

    // １ページに収まる場合は対象外
    } else if (this.maxItems() <= this.maxPageItems()) {
        return false;
    }

    return true;
}

/**
 * 【上書】カーソル下移動
 */
var _Window_Selectable_cursorDown = Window_Selectable.prototype.cursorDown;
Window_Selectable.prototype.cursorDown = function(wrap) {
    wrap = this.isPageWrap(wrap);

    // ページ処理対象外の場合
    if (!this.isUsePage()) {
        _Window_Selectable_cursorDown.call(this, wrap);
        return;
    }

    var index = this.index();
    var maxCols = this.maxCols();
    var maxCells = this.maxCells();
    var pageCells = this.pageCells();
    var pageTopIndex = this.pageTopIndex();

    // ページ末尾の場合
    if (index + maxCols > pageTopIndex + pageCells - 1) {
        // 一旦停止
        if (!wrap) {
            return;
        }

        // ページ有
        if (this.existPage()) {
            // ページ最上段へループ移動
            this.select(pageTopIndex + index % maxCols);
        // ページ無
        } else {
            // 最上段へループ移動
            this.select(index % maxCols);
        }
        return;
    }

    if (index < maxCells - maxCols || wrap) {
        this.select((index + maxCols) % maxCells);
    }
};

/**
 * 【上書】カーソル上移動
 */
var _Window_Selectable_cursorUp = Window_Selectable.prototype.cursorUp;
Window_Selectable.prototype.cursorUp = function(wrap) {
    wrap = this.isPageWrap(wrap);

    // ページ処理対象外の場合
    if (!this.isUsePage()) {
        _Window_Selectable_cursorUp.call(this, wrap);
        return;
    }

    var index = this.index();
    var maxCols = this.maxCols();
    var pageCells = this.pageCells();
    var maxCells = this.maxCells();
    var pageTopIndex = this.pageTopIndex();

    // 最上段の場合
    if (index - maxCols < pageTopIndex) {
        // 一旦停止
        if (!wrap) {
            return;
        }

        // ページ有
        if (this.existPage()) {
            // ページ最下段へループ移動
            this.select(index - maxCols + pageCells);
        // ページ無
        } else {
            // 最下段へループ移動
            this.select((index - maxCols + maxCells) % maxCells);
        }
        return;
    }

    if (index >= maxCols || wrap) {
        this.select((index - maxCols + maxCells) % maxCells);
    }
};

/**
 * 【上書】カーソル右移動
 */
var _Window_Selectable_cursorRight = Window_Selectable.prototype.cursorRight;
Window_Selectable.prototype.cursorRight = function(wrap) {
    wrap = this.isPageWrap(wrap);
    
    // ページ処理対象外の場合
    if (!this.isUsePage()) {
        _Window_Selectable_cursorRight.call(this, wrap);
        return;
    }

    var index = this.index();
    var maxCols = this.maxCols();
    var maxIndex = this.maxIndex();

    // 右に移動できる場合
    if (index % maxCols < maxCols - 1 && index < maxIndex) {
        this.select(index + 1);
        return;
    }

    // 一旦停止
    if (!wrap) {
        return;
    }

    // ページが存在しない
    if (!this.existPage()) {
        // ページ左端へ移動
        index = index - maxCols + 1;
        // ただしマイナスにはならない
        index = Math.max(index, 0);
        this.select(index);

    // 次のページへ
    } else if (this.topRow() + this.maxPageRows() < this.maxRows()) {
        index += this.maxPageItems();

        // カーソルを左右反対へ
        if (pCursorReverse) {
            index = index - maxCols + 1;
        }

        // 末尾を超えている場合は末尾へ
        index = Math.min(index, maxIndex);

        this.select(index);
        this.setPageTopRow();

    // 最初のページへ
    } else {
        index = index % this.maxPageItems();

        // カーソルを左右反対へ
        if (pCursorReverse) {
            index = index - maxCols + 1;
        }

        // マイナスの場合は0を設定
        index = Math.max(index, 0);

        this.select(index);
        this.setPageTopRow();
    }
};

/**
 * 【上書】カーソル左移動
 */
var _Window_Selectable_cursorLeft = Window_Selectable.prototype.cursorLeft;
Window_Selectable.prototype.cursorLeft = function(wrap) {
    wrap = this.isPageWrap(wrap);

    // ページ処理対象外の場合
    if (!this.isUsePage()) {
        _Window_Selectable_cursorLeft.call(this, wrap);
        return;
    }

    var index = this.index();
    var maxCols = this.maxCols();
    var maxIndex = this.maxIndex();
    var pageTopIndex = this.pageTopIndex();
    
    // 左に移動できる場合
    if (index % maxCols > 0) {
        this.select(index - 1);
        return;
    }

    // 一旦停止
    if (!wrap) {
        return;
    }

    // ページが存在しない
    if (!this.existPage()) {
        // ページ右端へ移動
        index = index + maxCols - 1;
        this.select(index);

    // 前のページへ
    } else if (this.topRow() > 0) {
        index = Math.max(index - this.maxPageItems(), 0);

        // カーソルを左右反対へ
        if (pCursorReverse) {
            index += maxCols - 1;
        }

        this.select(index);
        this.setPageTopRow();

    // 最終ページへ
    } else {
        var lastPageNo = this.pageCount() - 1;
        // ページ内のインデックス + 最終ページ番号 * MAXページ要素数
        index = index - pageTopIndex + lastPageNo * this.maxPageItems();
        // 最終位置を超えた場合は最終位置へ
        index = Math.min(index, maxIndex);

        // カーソルを左右反対へ
        if (pCursorReverse) {
            index += maxCols - 1;
        }

        this.select(index);
        this.setPageTopRow();
    }
};

/**
 * 【独自】ページ切替時の先頭位置設定
 * ※ページ内の要素数に関わらず先頭位置を固定する
 */
Window_Selectable.prototype.setPageTopRow = function() {
    // 現在ページ番号 * 最大ページ行数 * 行幅
    const scrollY = this.pageNo() * this.maxPageRows() * this.itemHeight();

    if (this._scrollY !== scrollY) {
        this._scrollY = scrollY;
        this.refresh();
        // MZ対応
        if (Utils.RPGMAKER_NAME != "MZ") {
            this.updateCursor();
        }
    }
};

/**
 * ●カーソル移動時
 */
const _Window_Selectable_select = Window_Selectable.prototype.select;
Window_Selectable.prototype.select = function(index) {
    if (!pSelectOverLastSpace) {
        // 最終要素を超えた場合は、最終要素へカーソルを移動
        if (index + 1 > this.maxItems()) {
            index = this.maxItems() - 1;
            // ただしマイナスにはならない
            index = Math.max(index, 0);
        }
    }

    _Window_Selectable_select.call(this, index);
};

/**
 * ●初期表示時のスクロール位置を調整
 */
const _Window_Selectable_ensureCursorVisible = Window_Selectable.prototype.ensureCursorVisible;
Window_Selectable.prototype.ensureCursorVisible = function() {
    const row = this.row();

    // ページ有、かつ２ページ目以降の場合
    if (this.existPage() && row > this.bottomRow()) {
        // index値を元に現在ページを取得
        this.setPageTopRow();
        return;
    }

    _Window_Selectable_ensureCursorVisible.apply(this, arguments);
};

/**
 * 【上書】ページダウン
 */
Window_Selectable.prototype.cursorPagedown = function() {
    // 処理なし
};

/**
 * 【上書】ページアップ
 */
Window_Selectable.prototype.cursorPageup = function() {
    // 処理なし
};

/**
 * 【独自】端で止まるかどうか？
 */
Window_Selectable.prototype.isPageWrap = function(wrap) {
    if (pNoStopCursor) {
        return true;
    }
    return wrap;
};

/**
 * ●ページ切替矢印更新
 */
const _Window_Selectable_updateArrows = Window_Selectable.prototype.updateArrows;
Window_Selectable.prototype.updateArrows = function() {
    _Window_Selectable_updateArrows.apply(this, arguments);

    // ページ処理の対象外
    if (!this.existPage()) {
        this.leftPageArrowVisible = false;
        this.rightPageArrowVisible = false;
        return;
    }

    // 左右のページ切替矢印を表示
    this.leftPageArrowVisible = true;
    this.rightPageArrowVisible = true;
    this.downArrowVisible = false;
    this.upArrowVisible = false;
};

/*
 * Window_Selectableの関数が未定義の場合は事前に定義
 * ※これをしておかないと以後の親側への追記が反映されない。
 */
if (Window_Selectable.prototype.close == Window_Base.prototype.close) {
    Window_Selectable.prototype.close = function() {
        return Window_Base.prototype.close.apply(this, arguments);
    }
}
if (Window_Selectable.prototype.hide == Window_Base.prototype.hide) {
    Window_Selectable.prototype.hide = function() {
        return Window_Base.prototype.hide.apply(this, arguments);
    }
}

/**
 * ●ウィンドウを閉じる
 */
const _Window_Selectable_close = Window_Selectable.prototype.close;
Window_Selectable.prototype.close = function() {
    // スクロール状態をクリア
    if (this.isUsePage()) {
        this._scrollX = 0;
        this._scrollY = 0;
        this._scrollBaseX = 0;
        this._scrollBaseY = 0;
        this.clearScrollStatus();
    }
    _Window_Selectable_close.apply(this, arguments);
};

/**
 * ●ウィンドウを消す
 */
const _Window_Selectable_hide = Window_Selectable.prototype.hide;
Window_Selectable.prototype.hide = function() {
    // スクロール状態をクリア
    if (this.isUsePage()) {
        this._scrollX = 0;
        this._scrollY = 0;
        this._scrollBaseX = 0;
        this._scrollBaseY = 0;
        this.clearScrollStatus();
    }
    _Window_Selectable_hide.apply(this, arguments);
};

/**
 * ●ウィンドウの選択を外す。
 */
const _Window_Selectable_deselect = Window_Selectable.prototype.deselect;
Window_Selectable.prototype.deselect = function() {
    _Window_Selectable_deselect.apply(this, arguments);
    // スクロール状態をクリア
    if (this.isUsePage()) {
        this._scrollX = 0;
        this._scrollY = 0;
        this._scrollBaseX = 0;
        this._scrollBaseY = 0;
        this.clearScrollStatus();
        this.refresh();
    }
};

// ----------------------------------------------------------------------------
// Window
// ----------------------------------------------------------------------------

/**
 * ●ページ切替矢印作成
 */
var _Window__createAllParts = Window.prototype._createAllParts;
Window.prototype._createAllParts = function() {
    _Window__createAllParts.apply(this, arguments);

    // 左右の矢印を追加
    this._leftPageArrowSprite = new Sprite();
    this._rightPageArrowSprite = new Sprite();
    this.addChild(this._leftPageArrowSprite);
    this.addChild(this._rightPageArrowSprite);

    // カーソル画像設定
    if (pPageCursorLeftImage) {
        this._leftPageArrowSprite.bitmap = ImageManager.loadPicture(pPageCursorLeftImage);
    }
    if (pPageCursorRightImage) {
        this._rightPageArrowSprite.bitmap = ImageManager.loadPicture(pPageCursorRightImage);
    }
};

/**
 * ●ページ切替矢印配置
 */
const _Window__refreshArrows = Window.prototype._refreshArrows;
Window.prototype._refreshArrows = function() {
    _Window__refreshArrows.apply(this, arguments);

    const w = this._width;
    const h = this._height;
    const p = 24;
    const q = p / 2;
    const sx = 96 + p;
    const sy = 0 + p;

    var cursorLeftW = 12;
    var cursorLeftH = 24;
    var cursorRightW = 12;
    var cursorRightH = 24;

    // カーソル画像設定
    if (pPageCursorLeftImage) {
        cursorLeftW = this._leftPageArrowSprite.bitmap.width;
        cursorLeftH = this._leftPageArrowSprite.bitmap.height;

    } else {
        this._leftPageArrowSprite.bitmap = this._windowskin;
        this._leftPageArrowSprite.setFrame(sx, sy+q, q, p);
    }

    this._leftPageArrowSprite.anchor.x = 0.5;
    this._leftPageArrowSprite.anchor.y = 0.5;

    if (pPageCursorRightImage) {
        cursorRightW = this._rightPageArrowSprite.bitmap.width;
        cursorRightH = this._rightPageArrowSprite.bitmap.height;

    } else {
        this._rightPageArrowSprite.bitmap = this._windowskin;
        this._rightPageArrowSprite.setFrame(sx+q+p, sy+q, q, p);
    }

    this._rightPageArrowSprite.anchor.x = 0.5;
    this._rightPageArrowSprite.anchor.y = 0.5;

    // カーソル位置設定
    var leftX;
    var leftY;
    var rightX;
    var rightY;

    // 横位置の設定
    if (pPageCursorHorizontal == "left") {
        leftX = cursorLeftW / 2 + 4;
        rightX = leftX + cursorLeftW;

    } else if (pPageCursorHorizontal == "center") {
        leftX = w / 2 - cursorLeftW / 2;
        rightX = w / 2 + cursorRightW / 2;

    } else if (pPageCursorHorizontal == "right") {
        rightX = w - cursorRightW / 2 - 4;
        leftX = rightX - cursorRightW;

    } else if (pPageCursorHorizontal == "leftRight") {
        leftX = cursorLeftW / 2 + 4;
        rightX = w - cursorRightW / 2 - 4;
    }
    
    // 縦位置の設定
    if (pPageCursorVertical == "top") {
        leftY = cursorLeftH / 2 + 4;
        rightY = cursorRightH / 2 + 4;

    } else if (pPageCursorVertical == "middle") {
        leftY = h / 2;
        rightY = h / 2;

    } else if (pPageCursorVertical == "bottom") {
        leftY = h - cursorLeftH / 2 - 4;
        rightY = h - cursorRightH / 2 - 4;
    }

    // カーソル位置調整
    if (pPageCursorLeftAdjustX) {
        leftX += eval(pPageCursorLeftAdjustX);
    }
    if (pPageCursorLeftAdjustY) {
        leftY += eval(pPageCursorLeftAdjustY);
    }
    if (pPageCursorRightAdjustX) {
        rightX += eval(pPageCursorRightAdjustX);
    }
    if (pPageCursorRightAdjustY) {
        rightY += eval(pPageCursorRightAdjustY);
    }

    this._leftPageArrowSprite.move(leftX, leftY);
    this._rightPageArrowSprite.move(rightX, rightY);
};

/**
 * ●矢印更新
 */
var _Window__updateArrows = Window.prototype._updateArrows;
Window.prototype._updateArrows = function() {
    _Window__updateArrows.apply(this, arguments);

    // ページ矢印の表示制御
    this._leftPageArrowSprite.visible = this.isOpen() && this.leftPageArrowVisible;
    this._rightPageArrowSprite.visible = this.isOpen() && this.rightPageArrowVisible;
};

// ----------------------------------------------------------------------------
// 【MZ用】不具合対応
// ----------------------------------------------------------------------------

if (Utils.RPGMAKER_NAME != "MV") {
    var _Window_Command_maxItems = Window_Command.prototype.maxItems;
    Window_Command.prototype.maxItems = function() {
        // listが取得できなければ0を返す。
        if (!this._list) {
            return 0;
        }

        return _Window_Command_maxItems.apply(this, arguments);
    };

    /**
     * MZには存在しないMVの関数を移植
     */
    Window_Selectable.prototype.bottomRow = function() {
        return Math.max(0, this.topRow() + this.maxPageRows() - 1);
    };

    /**
     * ●表示項目数
     */
    const _Window_Selectable_maxVisibleItems = Window_Selectable.prototype.maxVisibleItems;
    Window_Selectable.prototype.maxVisibleItems = function() {
        if (this.existPage()) {
            // 選択可能行だけを表示するように調整
            const visibleRows = Math.floor(this.contentsHeight() / this.itemHeight()) - 1;
            // const visibleRows = Math.ceil(this.contentsHeight() / this.itemHeight());
            return visibleRows * this.maxCols();
        }

        // ページ未使用時は元処理のまま
        return _Window_Selectable_maxVisibleItems.apply(this, arguments);
    };

    /**
     * ●縦スクロールできる範囲
     */
    const _Window_Selectable_overallHeight = Window_Selectable.prototype.overallHeight;
    Window_Selectable.prototype.overallHeight = function() {
        // ページ使用時、最終行までスクロールできなくなるので一行分加算
        if (this.existPage()) {
            return this.maxRows() * this.itemHeight() + this.itemHeight() / 2 + 4;
        }

        // ページ未使用時は元処理のまま
        return _Window_Selectable_overallHeight.apply(this, arguments);;
    };
}

// ----------------------------------------------------------------------------
// 【MV用】
// ----------------------------------------------------------------------------

/**
 * ●ＭＶに存在しないメソッドを定義
 */
if (!Window_Selectable.prototype.clearScrollStatus) {
    Window_Selectable.prototype.clearScrollStatus = function() {
    };
}

})();
