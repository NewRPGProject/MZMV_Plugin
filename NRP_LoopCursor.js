//=============================================================================
// NRP_LoopCursor.js
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc v1.014 Change the cursor to loop up, down, left and right.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/475238742.html
 *
 * @help Change the behavior so that the cursor loops up,
 * down, left, right and right in each window.
 * This is a soberly useful plugin.
 * 
 * For more information, please see below.
 * http://newrpg.seesaa.net/article/475238742.html
 * 
 * <Terms>
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but we will respond to defects as far as possible.
 * 
 * @param loopLR
 * @type boolean
 * @default true
 * @desc The left and right movement is also looped.
 * 
 * @param noStopCursol
 * @type boolean
 * @default false
 * @desc The cursor is not paused at the edge of the window.
 * 
 * @param selectOverLastSpace
 * @type boolean
 * @default false
 * @desc Allows the cursor to be placed in the space behind the final element.
 * If it is "false", it stops at the last element.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.014 カーソルが上下左右にループするよう挙動を変更します。
 * @author 砂川赳 (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/475238742.html
 *
 * @help 各種ウィンドウにて、カーソルが上下左右にループするよう挙動を変更します。
 * 地味に便利なプラグインです。
 * 
 * 詳細は以下をご覧ください。
 * http://newrpg.seesaa.net/article/475238742.html
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param loopLR
 * @text 左右もループする
 * @type boolean
 * @default true
 * @desc 左右の移動もループさせます。
 * 
 * @param noStopCursol
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
 */

(function() {
"use strict";

function toBoolean(str) {
    if (str == true) {
        return true;
    }
    return (str == "true") ? true : false;
}

var parameters = PluginManager.parameters("NRP_LoopCursor");
var pLoopLR = toBoolean(parameters["loopLR"], true);
var pNoStopCursol = toBoolean(parameters["noStopCursol"], false);
const pSelectOverLastSpace = toBoolean(parameters["selectOverLastSpace"], false);

/**
 * 【独自】選択領域の合計
 */
Window_Selectable.prototype.maxCells = function() {
    return this.maxCols() * this.maxRows();
};

/**
 * 【上書】カーソル下移動
 */
Window_Selectable.prototype.cursorDown = function(wrap) {
    wrap = isWrap(wrap);

    var index = this.index();
    var maxCols = this.maxCols();
    var maxCells = this.maxCells();
    
    if (index < maxCells - maxCols || wrap) {
        // MZならsmoothSelect、MVはselect
        if (Utils.RPGMAKER_NAME == "MZ") {
            this.smoothSelect((index + maxCols) % maxCells);
        } else {
            this.select((index + maxCols) % maxCells);
        }
    }
};

/**
 * 【上書】カーソル上移動
 */
Window_Selectable.prototype.cursorUp = function(wrap) {
    wrap = isWrap(wrap);

    var index = this.index();
    var maxCols = this.maxCols();
    var maxCells = this.maxCells();

    if (index >= maxCols || wrap) {
        // MZならsmoothSelect、MVはselect
        if (Utils.RPGMAKER_NAME == "MZ") {
            this.smoothSelect((index - maxCols + maxCells) % maxCells);
        } else {
            this.select((index - maxCols + maxCells) % maxCells);
        }
    }
};

if (pLoopLR) {
    /**
     * 【上書】カーソル右移動
     */
    Window_Selectable.prototype.cursorRight = function(wrap) {
        wrap = isWrap(wrap);

        let index = this.index();
        const maxCols = this.maxCols();
        const maxCells = this.maxCells();

        if (maxCols >= 2 && (index < maxCells || (wrap && this.isHorizontal()))) {
            if (index % maxCols < maxCols - 1) {
                index++;
            } else if (wrap) {
                index -= (maxCols - 1);
            }

            index = index % maxCells;
            // 末尾の空欄が有効でない場合、
            // かつ、最大項目数を超えている場合は調整
            if (!pSelectOverLastSpace && index >= this.maxItems()) {
                index -= (Math.min(maxCols - 1, this.maxItems()));
            }

            this.select(index);
        }
    };

    /**
     * 【上書】カーソル左移動
     */
    Window_Selectable.prototype.cursorLeft = function(wrap) {
        wrap = isWrap(wrap);

        let index = this.index();
        const maxCols = this.maxCols();
        const maxCells = this.maxCells();
        
        if (maxCols >= 2 || (wrap && this.isHorizontal())) {
            if (index % maxCols > 0) {
                index--;
            } else if (wrap) {
                index += (maxCols - 1);
            }

            index = index % maxCells;
            // 末尾の空欄が有効でない場合、
            // かつ、最大項目数を超えている場合は調整
            if (!pSelectOverLastSpace && index >= this.maxItems()) {
                index = this.maxItems() - 1;
            }

            this.select(index);
        }
    };
}

/**
 * ●カーソル移動時
 */
var _Window_Selectable_select = Window_Selectable.prototype.select;
Window_Selectable.prototype.select = function(index) {
    if (!pSelectOverLastSpace) {
        // initialize内で呼ばれた際に、
        // maxItemsが取得できないことがあるので、その場合は0を設定する。
        let maxItems;
        try {
            maxItems = this.maxItems();
        } catch {
            maxItems = 0;
        }

        // 最終要素を超えた場合は、最終要素へカーソルを移動
        if (index + 1 > maxItems) {
            index = maxItems - 1;
            // ただしマイナスにはならない
            index = Math.max(index, 0);
        }
    }

    _Window_Selectable_select.call(this, index);
};

/**
 * ●選択中の要素の有効判定
 */
var _Window_Selectable_isCurrentItemEnabled = Window_Selectable.prototype.isCurrentItemEnabled;
Window_Selectable.prototype.isCurrentItemEnabled = function() {
    // 末尾の空白選択可かつ要素が存在する場合
    // 要素が0の場合は、数値入力などが想定されるため処理しない
    if (pSelectOverLastSpace && this.maxItems() > 0) {
        //  要素数を超えている場合は空欄なので不可
        if (this.index() + 1 > this.maxItems()) {
            return false;
        }
    }

    return _Window_Selectable_isCurrentItemEnabled.apply(this, arguments);
};

/**
 * ●端で止まるかどうか？
 */
function isWrap(wrap) {
    if (pNoStopCursol) {
        return true;
    }
    return wrap;
}

})();
