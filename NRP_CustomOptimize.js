//=============================================================================
// NRP_CustomOptimize.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.001 Customize Optimize function.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/489626316.html
 *
 * @help Customize Optimize function.
 * There are two main functions
 * 
 * ◆Limited Optimize equipment type
 * Normally, the Optimize & Clear function
 * on the equipment scene covers all equipment slots.
 * 
 * The plugin allows you to limit
 * the scope of Optimize (and Clear) by equipment type.
 * 
 * ◆Hide Optimize area & make a separate window
 * Omit the optimize area so that the equipment can be changed
 * from the beginning.
 * The optimize area can be called up as a separate window
 * by pressing Shift or other keys.
 * 
 * In doing so, the Optimize area can be set to
 * a more detailed function than usual.
 * For example, "All Optimize", "Optimize Excluding Accessories",
 * "All Clear", "Clear Excluding Accessories",
 * and many other functions can be provided.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * The setting method varies depending
 * on the two functions described above.
 * It does not make sense to set both.
 * 
 * ◆Limited Optimize equipment type
 * Set the equipment types you want to target
 * in the "OptimizeEquipmentType" and "ClearEquipmentType" fields.
 * 
 * ◆Hide Optimize area & make a separate window
 * Turn on "HideOptimizeArea".
 * 
 * In addition, the contents registered
 * in "OptimizeCommandList" can be called up as a separate window.
 * You can set the equipment type you want to target
 * for each registered command.
 * 
 * Note that "Optimize" and "Clear" are registered
 * from the initial state.
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
 * @param OptimizeEquipmentType
 * @type string
 * @desc Equipment type to be covered by Optimize. If blank, all. Multiple can be specified. (e.g.: 4,6)
 * 
 * @param ClearEquipmentType
 * @type string
 * @desc Equipment type to be covered by Clear. If blank, all. Multiple can be specified. (e.g.: 4,6)
 * 
 * @param SlotActorSwitch
 * @type boolean
 * @default true
 * @desc Actor switching by Pageup and Pagedown is also enabled when changing equipment slots.
 * 
 * @param HideOptimizeArea
 * @type boolean
 * @default false
 * @desc Hides the Optimize area and goes directly to selecting an equipment slot.
 * 
 * @param OptimizeKey
 * @parent HideOptimizeArea
 * @default shift
 * @type select
 * @option Invalid @value
 * @option shift
 * @option control
 * @option tab
 * @desc If the Optimize area is hidden, this key is used to open it in a separate window.
 * 
 * @param OptimizeCommandList
 * @parent HideOptimizeArea
 * @type struct<Optimize>[]
 * @default ["{\"Name\":\"Optimize\",\"EquipOrRelease\":\"equip\",\"TargetEquipmentType\":\"\"}","{\"Name\":\"Clear\",\"EquipOrRelease\":\"release\",\"TargetEquipmentType\":\"\"}"]
 * @desc List of commands to be displayed in the window for Optimize.
 */

/*~struct~Optimize:
 * @param Name
 * @type string
 * @desc Display contents.
 * 
 * @param EquipOrRelease
 * @type select
 * @option equip
 * @option release
 * @default equip
 * @desc It is whether to equip or unequip.
 * 
 * @param TargetEquipmentType
 * @type string
 * @desc Target equipment type. If blank, all. Multiple can be specified. (e.g.: 4,6)
 */

/*:ja
 * @target MZ
 * @plugindesc v1.001 最強装備機能をカスタマイズ
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/489626316.html
 *
 * @help 最強装備機能をカスタマイズします。
 * 主に以下二つの機能があります。
 * 
 * ◆最強装備の装備タイプを限定
 * 通常、装備画面の最強装備＆全て外す機能では、
 * 全ての装備箇所が対象になってしまいます。
 * 
 * 当プラグインでは、対象を装備タイプによって限定できます。
 * 例えば、装飾品など単純な性能では優劣を測れない装備について、
 * 最強装備（および全て外す）の対象外にすることができます。
 * 
 * ◆最強装備欄の省略＆別ウィンドウ化
 * 最強装備欄を省略して、いきなり装備を変更できるようにします。
 * 最強装備欄はShiftなどのキーで別ウィンドウとして呼び出せます。
 * 
 * その際、最強装備欄には通常よりも細かい機能を設定できます。
 * 例えば『全て最強』『装飾品を除いて最強』『全て外す』『装飾品を除いて外す』
 * というように、多数の機能を用意できます。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * 上述した二つの機能によって、設定方法が変わります。
 * 両方の設定をしても意味がありません。
 * 
 * ◆最強装備の装備タイプを限定
 * 『最強装備する装備タイプ』と『全て外す装備タイプ』に
 * 対象としたい装備タイプを設定してください。
 * 
 * ◆最強装備欄の省略＆別ウィンドウ化
 * 『最強装備欄の省略』をオンにしてください。
 * 
 * さらに『最強装備コマンドリスト』に登録した内容が、
 * 別ウィンドウとして呼び出せるようになります。
 * 登録したコマンド毎に対象としたい装備タイプを設定できます。
 * 
 * なお、初期状態から『最強装備』と『全て外す』は登録されています。
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
 * @param OptimizeEquipmentType
 * @text 最強装備する装備タイプ
 * @type string
 * @desc 最強装備の対象とする装備タイプです。空欄なら全て。
 * 複数指定可。（例：4,6）
 * 
 * @param ClearEquipmentType
 * @text 全て外す装備タイプ
 * @type string
 * @desc 全て外すの対象とする装備タイプです。空欄なら全て。
 * 複数指定可。（例：4,6）
 * 
 * @param SlotActorSwitch
 * @text スロット変更時アクター切替
 * @type boolean
 * @default true
 * @desc 装備スロット変更時にPageup,Pagedownによるアクター切替を有効にします。
 * 
 * @param HideOptimizeArea
 * @text 最強装備欄の省略
 * @type boolean
 * @default false
 * @desc 最強装備などの欄を隠し、直接装備スロットの選択に移行します。
 * 
 * @param OptimizeKey
 * @parent HideOptimizeArea
 * @text ウィンドウを開くキー
 * @default shift
 * @type select
 * @option 無効 @value
 * @option shift
 * @option control
 * @option tab
 * @desc 最強装備欄を非表示にした場合、別ウィンドウで開くためのキーです。
 * 
 * @param OptimizeCommandList
 * @parent HideOptimizeArea
 * @text 最強装備コマンドリスト
 * @type struct<Optimize>[]
 * @default ["{\"Name\":\"最強装備\",\"EquipOrRelease\":\"equip\",\"TargetEquipmentType\":\"\"}","{\"Name\":\"全て外す\",\"EquipOrRelease\":\"release\",\"TargetEquipmentType\":\"\"}"]
 * @desc 最強装備用のウィンドウに表示するコマンドのリストです。
 */

/*~struct~Optimize:ja
 * @param Name
 * @text 表示名
 * @type string
 * @desc 表示する内容です。
 * 
 * @param EquipOrRelease
 * @text 装備か外すか？
 * @type select
 * @option 装備 @value equip
 * @option 外す @value release
 * @default equip
 * @desc 装備するか外すかどうかです。
 * 
 * @param TargetEquipmentType
 * @text 着脱する装備タイプ
 * @type string
 * @desc 対象とする装備タイプです。空欄なら全て。
 * 複数指定可。（例：4,6）
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

const PLUGIN_NAME = "NRP_CustomOptimize";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pOptimizeEquipmentType = setDefault(parameters["OptimizeEquipmentType"]);
const pClearEquipmentType = setDefault(parameters["ClearEquipmentType"]);
const pSlotActorSwitch = toBoolean(parameters["SlotActorSwitch"], false);
const pHideOptimizeArea = toBoolean(parameters["HideOptimizeArea"], false);
const pOptimizeKey = setDefault(parameters["OptimizeKey"]);
const pOptimizeCommandList = parseStruct2(parameters["OptimizeCommandList"]);

//-----------------------------------------------------------------------------
// Scene_Equip
//-----------------------------------------------------------------------------

if (pHideOptimizeArea) {
    /**
     * ●装備シーンの作成
     */
    const _Scene_Equip_create = Scene_Equip.prototype.create;
    Scene_Equip.prototype.create = function() {
        _Scene_Equip_create.apply(this, arguments);

        // 最強装備用ウィンドウの作成
        this.createOptimizeWindow();

        // スロットウィンドウにフォーカス。
        this._slotWindow.activate();
        this._slotWindow.select(0);
    };

    /**
     * ●コマンドウィンドウを非表示
     */
    const _Scene_Equip_createCommandWindow = Scene_Equip.prototype.createCommandWindow;
    Scene_Equip.prototype.createCommandWindow = function() {
        _Scene_Equip_createCommandWindow.apply(this, arguments);

        // コマンドウィンドウを非表示
        this._commandWindow.hide();
    };

    /**
     * ●スロットウィンドウのサイズ
     */
    Scene_Equip.prototype.slotWindowRect = function() {
        const wx = this.statusWidth();
        const wy = this.mainAreaTop();
        const ww = Graphics.boxWidth - this.statusWidth();
        const wh = this.mainAreaHeight();
        return new Rectangle(wx, wy, ww, wh);
    };

    /**
     * 【独自】最強装備ウィンドウの作成
     */
    Scene_Equip.prototype.createOptimizeWindow = function() {
        this._optimizeWindow = new Window_EquipOptimize();
        this._optimizeWindow.setHandler("ok", this.commandOptimizeOk.bind(this));
        this._optimizeWindow.setHandler("cancel", this.onOptimizeCancel.bind(this));

        // addWindowだと下が見えなくなるのでaddChildで追加する。
        this.addChild(this._optimizeWindow);
        this._optimizeWindow.close();
    };

    /**
     * 【独自】確認ウィンドウの表示領域
     */
    Scene_Equip.prototype.optimizeWindowRect = function() {
        const ww = pWindowWidth;
        const wh = pWindowHeight;
        const wx = (Graphics.boxWidth - ww) / 2;
        const wy = (Graphics.boxHeight - wh) / 2;
        return new Rectangle(wx, wy, ww, wh);
    };

    /**
     * 【独自】最強装備ウィンドウの表示
     */
    Scene_Equip.prototype.openOptimizeWindow = function() {
        SoundManager.playOk();
        this._optimizeWindow.start();
    };

    /**
     * 【独自】最強装備欄の選択確定
     */
    Scene_Equip.prototype.commandOptimizeOk = function() {
        // 選択されたデータを取得する。
        const index = this._optimizeWindow.index();
        const data = pOptimizeCommandList[index];

        // 装備タイプの指定がある場合
        if (data.TargetEquipmentType) {
            // 配列変換
            const targetEquipmentTypes = textToArray(data.TargetEquipmentType);
            // 装備する場合
            if (data.EquipOrRelease == "equip") {
                this.commandTargetOptimize(targetEquipmentTypes);

            // 外す場合
            } else {
                this.commandTargetClear(targetEquipmentTypes);
            }

        // 装備タイプの指定がない場合は通常の最強装備＆解除
        } else {
            // 装備する場合
            if (data.EquipOrRelease == "equip") {
                this.commandOptimize();
            // 外す場合
            } else {
                this.commandClear();
            }
        }

        // 最強装備欄を閉じて、スロットウィンドウをアクティブに
        this._commandWindow.deactivate();
        this._optimizeWindow.close();
        this._slotWindow.activate();
    };

    /**
     * 【独自】最強装備キャンセル
     */
    Scene_Equip.prototype.onOptimizeCancel = function() {
        SoundManager.playCancel();
        // 最強装備欄を閉じて、スロットウィンドウをアクティブに
        this._commandWindow.deactivate();
        this._optimizeWindow.close();
        this._slotWindow.activate();
    };
}

/**
 * ●スロットウィンドウの作成
 */
const _Scene_Equip_createSlotWindow = Scene_Equip.prototype.createSlotWindow;
Scene_Equip.prototype.createSlotWindow = function() {
    _Scene_Equip_createSlotWindow.apply(this, arguments);

    // ＬＲで前後のアクターへ。
    if (pSlotActorSwitch) {
        this._slotWindow.setHandler("pagedown", this.nextActor.bind(this));
        this._slotWindow.setHandler("pageup", this.previousActor.bind(this));
    }

    if (pHideOptimizeArea) {
        // キャンセル時は前画面へ戻る。
        this._slotWindow.setHandler("cancel", this.popScene.bind(this));
        // 最強装備用のウィンドウを開く
        if (pOptimizeKey) {
            this._slotWindow.setHandler(pOptimizeKey, this.openOptimizeWindow.bind(this));
        }
    }
};

// ＬＲで前後のアクターへ。
if (pSlotActorSwitch) {
    /**
     * ●アクター変更時
     */
    const _Scene_Equip_onActorChange = Scene_Equip.prototype.onActorChange;
    Scene_Equip.prototype.onActorChange = function() {
        // スロットウィンドウにカーソルが残っている場合
        if (this._slotWindow.index() >= 0) {
            Scene_MenuBase.prototype.onActorChange.call(this);
            this.refreshActor();
            // 引き続きスロットウィンドウをアクティブにする。
            this._slotWindow.activate();
            // this._slotWindow.select(0);
            this._commandWindow.deactivate();
            return;
        }
        _Scene_Equip_onActorChange.apply(this, arguments);
    };
}

// 最強装備の装備タイプが指定されている場合
if (pOptimizeEquipmentType) {
    /**
     * 【上書】最強装備
     */
    Scene_Equip.prototype.commandOptimize = function() {
        // 配列変換
        const targetEquipmentTypes = textToArray(pOptimizeEquipmentType);
        this.commandTargetOptimize(targetEquipmentTypes);
    };
}

// 全て外すの装備タイプが指定されている場合
if (pClearEquipmentType) {
    /**
     * 【上書】全て外す
     */
    Scene_Equip.prototype.commandClear = function() {
        // 配列変換
        const targetEquipmentTypes = textToArray(pClearEquipmentType);
        this.commandTargetClear(targetEquipmentTypes);
    };
}

/**
 * 【独自】対象の装備タイプを最強装備する。
 */
Scene_Equip.prototype.commandTargetOptimize = function(equipmentTypes) {
    SoundManager.playEquip();
    this.actor().optimizeTargetEquipments(equipmentTypes);
    this._statusWindow.refresh();
    this._slotWindow.refresh();
    this._commandWindow.activate();
};

/**
 * 【独自】対象の装備タイプをクリアする。
 */
Scene_Equip.prototype.commandTargetClear = function(equipmentTypes) {
    SoundManager.playEquip();
    this.actor().clearTargetEquipments(equipmentTypes);
    this._statusWindow.refresh();
    this._slotWindow.refresh();
    this._commandWindow.activate();
};

//-----------------------------------------------------------------------------
// Game_Actor
//-----------------------------------------------------------------------------

/**
 * 【独自】対象の装備タイプをクリアする。
 */
Game_Actor.prototype.clearTargetEquipments = function(equipmentTypes) {
    const maxSlots = this.equipSlots().length;
    for (let i = 0; i < maxSlots; i++) {
        // 対象外の装備タイプの場合は無視
        if (!equipmentTypes.includes(this.equipSlots()[i])) {
            continue;
        }
        if (this.isEquipChangeOk(i)) {
            this.changeEquip(i, null);
        }
    }
};

/**
 * 【独自】対象の装備タイプを最強装備する。
 */
Game_Actor.prototype.optimizeTargetEquipments = function(equipmentTypes) {
    const maxSlots = this.equipSlots().length;
    this.clearTargetEquipments(equipmentTypes);
    for (let i = 0; i < maxSlots; i++) {
        // 対象外の装備タイプの場合は無視
        if (!equipmentTypes.includes(this.equipSlots()[i])) {
            continue;
        }
        if (this.isEquipChangeOk(i)) {
            this.changeEquip(i, this.bestEquipItem(i));
        }
    }
};

//-----------------------------------------------------------------------------
// Window_EquipSlot
//-----------------------------------------------------------------------------

if (pHideOptimizeArea) {
    /*
     * メソッドが未定義の場合は事前に定義
     * ※これをしておかないと以後の親クラスへの追記が反映されない。
     */
    if (Window_EquipSlot.prototype.processHandling == Window_Selectable.prototype.processHandling) {
        Window_EquipSlot.prototype.processHandling = function() {
            return Window_Selectable.prototype.processHandling.apply(this, arguments);
        }
    }

    /**
     * ●キーの判定
     */
    const _Window_EquipSlot_processHandling = Window_EquipSlot.prototype.processHandling;
    Window_EquipSlot.prototype.processHandling = function() {
        _Window_EquipSlot_processHandling.apply(this, arguments);

        // 指定したキーを有効にする。
        if (this.isOpenAndActive()) {
            if (Input.isTriggered(pOptimizeKey)) {
                return this.processOptimizeKey();
            }
        }
    };

    /**
     * 【独自】最強装備ウィンドウを呼び出すキー
     */
    Window_EquipSlot.prototype.processOptimizeKey = function() {
        this.updateInputData();
        this.deactivate();
        this.callHandler(pOptimizeKey);
    };
}

// アクター切替が有効な場合
if (pSlotActorSwitch) {
    /*
    * メソッドが未定義の場合は事前に定義
    * ※これをしておかないと以後の親クラスへの追記が反映されない。
    */
    if (Window_EquipSlot.prototype.processPageup == Window_Selectable.prototype.processPageup) {
        Window_EquipSlot.prototype.processPageup = function() {
            return Window_Selectable.prototype.processPageup.apply(this, arguments);
        }
    }
    if (Window_EquipSlot.prototype.processPagedown == Window_Selectable.prototype.processPagedown) {
        Window_EquipSlot.prototype.processPagedown = function() {
            return Window_Selectable.prototype.processPagedown.apply(this, arguments);
        }
    }

    const _Window_EquipSlot_processPageup = Window_EquipSlot.prototype.processPageup;
    Window_EquipSlot.prototype.processPageup = function() {
        _Window_EquipSlot_processPageup.apply(this, arguments);
        // ページ切替後もアクティブを維持する。
        this.activate();
    };

    const _Window_EquipSlot_processPagedown = Window_EquipSlot.prototype.processPagedown;
    Window_EquipSlot.prototype.processPagedown = function() {
        _Window_EquipSlot_processPagedown.apply(this, arguments);
        // ページ切替後もアクティブを維持する。
        this.activate();
    };
}

//-----------------------------------------------------------------------------
// Window_EquipOptimize
//
// 最強装備用のウィンドウ

function Window_EquipOptimize() {
    this.initialize(...arguments);
}

Window_EquipOptimize.prototype = Object.create(Window_Command.prototype);
Window_EquipOptimize.prototype.constructor = Window_EquipOptimize;

Window_EquipOptimize.prototype.initialize = function() {
    Window_Command.prototype.initialize.call(this, new Rectangle());
};

Window_EquipOptimize.prototype.start = function() {
    this.updatePlacement();
    this.createContents();
    this.refresh();
    this.scrollTo(0, 0);
    this.select(0);
    this.open();
    this.activate();
};

/**
 * ●コマンドの生成
 */
Window_EquipOptimize.prototype.makeCommandList = function() {
    for (const data of pOptimizeCommandList) {
        this.addCommand(data.Name, data.Name);
    }
};

/**
 * ●ウィンドウの配置とサイズ設定
 */
Window_EquipOptimize.prototype.updatePlacement = function() {
    this.x = this.windowX();
    this.y = this.windowY();
    this.width = this.windowWidth();
    this.height = this.windowHeight();
};

Window_EquipOptimize.prototype.windowX = function() {
    return (Graphics.boxWidth - this.windowWidth()) / 2;
};

Window_EquipOptimize.prototype.windowY = function() {
    return (Graphics.boxHeight - this.windowHeight()) / 2;
};

Window_EquipOptimize.prototype.windowWidth = function() {
    const width = this.maxChoiceWidth() + this.colSpacing() + this.padding * 2;
    return Math.min(width, Graphics.boxWidth);
};

Window_EquipOptimize.prototype.windowHeight = function() {
    return this.fittingHeight(this.numVisibleRows());
};

/**
 * ●文字列の長さを元にウィンドウ幅を計算する。
 */
Window_EquipOptimize.prototype.maxChoiceWidth = function() {
    let maxWidth = 96;
    for (const choice of this._list) {
        const text = choice.name;
        const textWidth = this.textSizeEx(text).width;
        const choiceWidth = Math.ceil(textWidth) + this.itemPadding() * 2;
        if (maxWidth < choiceWidth) {
            maxWidth = choiceWidth;
        }
    }
    return maxWidth;
};

/**
 * ●表示行数
 */
Window_EquipOptimize.prototype.numVisibleRows = function() {
    return pOptimizeCommandList.length;
};

// ----------------------------------------------------------------------------
// 共通関数
// ----------------------------------------------------------------------------

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
