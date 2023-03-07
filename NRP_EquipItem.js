//=============================================================================
// NRP_EquipItem.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.03 Allow items to be equipped.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/489576403.html
 *
 * @help Realize a system that allows you to equip items.
 * Equipped items can be used during battle.
 * Conversely, unequipped items cannot be used during battle.
 * 
 * By default, equipped items can only be used once in battle.
 * If the item is in stock,
 * it will be automatically replenished after the battle.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * 1. Add an equipment type for the item to
 *    Database > Type Settings > Equipment Types.
 * 
 * 2. Specify the number of the Equipment Types (6 for 06)
 *    in the "EquipItemSlot" plugin parameter.
 * 
 * The item can be equipped with the above.
 * Only items with Occasion "Always" or "Battle Screen" are targeted.
 * 
 * -------------------------------------------------------------------
 * [Use of multiple slots]
 * -------------------------------------------------------------------
 * Combined with the plugin (NRP_EquipSlot.js) that freely changes
 * equipment slots, multiple slots can be designated for items.
 * 
 * Specify multiple slots (equipment type) specified in "EquipItemSlot"
 * according to the instructions on the NRP_EquipSlot.js side.
 * 
 * -------------------------------------------------------------------
 * [Original Command]
 * -------------------------------------------------------------------
 * Normally, the specification changes item commands during battle,
 * but it is possible to leave item commands in place
 * and add a dedicated command.
 * 
 * 1. Turn on "UseOriginalCommand" and turn off "AutoEquipMode"
 *    in the plugin commands.
 * 
 * 2. Further, set the item Occasion to "Never"
 *    and enter the following in the note field.
 * 
 * <EquipItem>
 * 
 * This will allow you to equip the relevant item
 * and use it in battle only when equipped.
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
 * @param EquipItemSlot
 * @type string
 * @default 6
 * @desc The slot (equipment type) to equip the item.
 * 
 * @param AutoEquipMode
 * @type boolean
 * @default true
 * @desc The Occasion will automatically enable "Always" and "Battle Screen" items to be equipped.
 * 
 * @param UsedOnlyOnce
 * @type boolean
 * @default true
 * @desc Allows items to be used only once per battle.
 * 
 * @param ExceptDurables
 * @parent UsedOnlyOnce
 * @type boolean
 * @default true
 * @desc For items not consumed, allow them to be used without restrictions.
 * 
 * @param UseOriginalCommand
 * @type boolean
 * @default false
 * @desc Use original command for equipped items.
 * On if you want to use it with existing item commands.
 * 
 * @param CommandPosition
 * @parent UseOriginalCommand
 * @type number
 * @default 4
 * @desc This is the position where the original command is inserted.
 * 
 * @param CommandName
 * @parent UseOriginalCommand
 * @type string
 * @default Equip
 * @desc The name of the command when the original command is used.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.03 アイテムを装備できるようにする。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/489576403.html
 *
 * @help アイテムを装備できるシステムを実現します。
 * 装備したアイテムは戦闘中に使用できます。
 * 逆に言うと、装備していないアイテムは戦闘中に使用できなくなります。
 * 
 * デフォルトでは装備したアイテムは戦闘中に一度しか使用できません。
 * 在庫がある場合は戦闘終了後に自動で補充されます。
 * 
 * -------------------------------------------------------------------
 * ■使用法
 * -------------------------------------------------------------------
 * １．データベース＞タイプ＞装備タイプに対して、
 * 　　アイテム用の装備タイプを追加してください。
 * 
 * ２．プラグインパラメータの『アイテム装備スロット』に
 * 　　先程の装備タイプの番号（06なら6）を指定してください。
 * 
 * 以上でアイテムが装備できるようになります。
 * 対象は使用可能時が『常時』または『バトル画面』のアイテム限定です。
 * 
 * -------------------------------------------------------------------
 * ■複数スロットの使用
 * -------------------------------------------------------------------
 * 装備スロットを自由に変更するプラグイン（NRP_EquipSlot.js）と
 * 組み合わせることで、複数のスロットをアイテム用に指定できます。
 * 
 * 『アイテム装備スロット』で指定したスロット（装備タイプ）を
 * NRP_EquipSlot.js側の説明に従って、複数指定してください。
 * 
 * -------------------------------------------------------------------
 * ■独自コマンド
 * -------------------------------------------------------------------
 * 通常は戦闘中のアイテムコマンドを変化させる仕様ですが、
 * アイテムコマンドを残したまま、専用のコマンドを追加することもできます。
 * 
 * １．プラグインコマンドの『独自コマンドを使用』をオンにし、
 * 　　『装備を自動的に許可』をオフにする。
 * 
 * ２．さらにアイテムの使用可能時を『使用不可』にした上で、
 * 　　以下をメモ欄に記入してください。
 * 
 * <EquipItem>
 * 
 * これで該当のアイテムを装備可能になると同時に、
 * 装備した時のみ戦闘中に使用できるようになります。
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
 * @param EquipItemSlot
 * @text アイテム装備スロット
 * @type string
 * @default 6
 * @desc アイテムを装備するスロット（装備タイプ）です。
 * 
 * @param AutoEquipMode
 * @text 装備を自動的に許可
 * @type boolean
 * @default true
 * @desc 使用可能時が『常時』『戦闘時』のアイテムを自動的に装備可能とします。
 * 
 * @param UsedOnlyOnce
 * @text 一度だけ使用
 * @type boolean
 * @default true
 * @desc アイテムを一戦闘に一度だけ使用可能にします。
 * 
 * @param ExceptDurables
 * @parent UsedOnlyOnce
 * @text 耐久品は除外
 * @type boolean
 * @default true
 * @desc 消耗なしのアイテムについては、制限なく使用できるようにします。
 * 
 * @param UseOriginalCommand
 * @text 独自コマンドを使用
 * @type boolean
 * @default false
 * @desc 装備アイテム用の独自コマンドを使用します。
 * 既存のアイテムコマンドと併用したい場合はオンに。
 * 
 * @param CommandPosition
 * @parent UseOriginalCommand
 * @text コマンド挿入位置
 * @type number
 * @default 4
 * @desc 独自コマンドを挿入する位置です。
 * 
 * @param CommandName
 * @parent UseOriginalCommand
 * @text コマンド名
 * @type string
 * @default 装備
 * @desc 独自コマンドを使用する場合のコマンド名です。
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

const PLUGIN_NAME = "NRP_EquipItem";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pAutoEquipMode = toBoolean(parameters["AutoEquipMode"], false);
const pUsedOnlyOnce = toBoolean(parameters["UsedOnlyOnce"], false);
const pExceptDurables = toBoolean(parameters["ExceptDurables"], false);
const pEquipItemSlot = parameters["EquipItemSlot"];
const pUseOriginalCommand = toBoolean(parameters["UseOriginalCommand"], false);
const pCommandPosition = toNumber(parameters["CommandPosition"], 0);
const pCommandName = parameters["CommandName"];

/**
 * ●引数を元に対象の配列を取得する。
 * ※bindによってinterpreterをthisに渡して用いる。
 */
function makeTargets(targetId) {
    const targets = [];

    // 無効なら処理しない。
    if (targetId === undefined || targetId === null || targetId === "") {
        return targets;
    }

    // カンマ区切りでループ
    for (let id of targetId.split(",")) {
        // 空白除去
        id = id.trim();
        // 1~5というように範囲指定の場合
        // ※~が存在する。
        if (id.indexOf("~") >= 0) {
            const idRange = id.split("~");
            const idRangeStart = eval(idRange[0]);
            const idRangeEnd = eval(idRange[1]);

            // IDの指定範囲で実行
            // 開始のほうが終了より大きい場合は反対に実行
            if (idRangeEnd < idRangeStart) {
                for (let i = idRangeStart; i >= idRangeEnd; i--) {
                    const evalId = eval(i);
                    if (evalId) {
                        targets.push(evalId);
                    }
                }
            } else {
                for (let i = idRangeStart; i <= idRangeEnd; i++) {
                    const evalId = eval(i);
                    if (evalId) {
                        targets.push(evalId);
                    }
                }
            }
            
        // 通常時
        } else {
            const evalId = eval(id);
            if (evalId) {
                targets.push(evalId);
            }
        }
    }
    return targets;
}

// デフォルトのスロットを配列化
const DEFAULT_SLOTS = makeTargets(pEquipItemSlot);
// 装備アイテムとして扱う装備タイプ
const DEFAULT_EQUIP_TYPE = DEFAULT_SLOTS[0];

//-----------------------------------------------------------------------------
// Scene_Boot
//-----------------------------------------------------------------------------

/**
 * ●ＤＢのロード完了後
 */
const _Scene_Boot_onDatabaseLoaded = Scene_Boot.prototype.onDatabaseLoaded;
Scene_Boot.prototype.onDatabaseLoaded = function() {
    // アイテムデータに装備情報を書込
    setItemData($dataItems);

    _Scene_Boot_onDatabaseLoaded.apply(this, arguments);
};

/**
 * ●データを書込
 */
function setItemData(dataArray) {
    for (const data of dataArray) {
        // 名前が設定されているデータのみが対象
        if (data && data.name) {
            setObjectParams(data);
        }
    }
}

/**
 * ●JSONオブジェクトに値を設定
 */
function setObjectParams(object) {
    // アイテムかつ装備タイプが指定されている場合
    if (isEquipItem(object)) {
        // 装備タイプを書き込み
        const equipSlots = getEquipSlots(object);
        // とりあえず先頭の値
        object.etypeId = equipSlots[0];
        // 本来存在しない項目によってundefinedエラーとならないように空で定義しておく。
        object.traits = [];
        object.params = [];
        // 各パラメータも0で初期化
        // ※パラメータの配列は先頭の職業を参照する。
        const params = $dataClasses[1].params;
        for (let i = 0; i < params.length; i++) {
            object.params[i] = 0;
        }
    }
}

//-----------------------------------------------------------------------------
// Game_BattlerBase
//-----------------------------------------------------------------------------

/**
 * ●装備判定
 */
const _Game_BattlerBase_canEquip = Game_BattlerBase.prototype.canEquip;
Game_BattlerBase.prototype.canEquip = function(item) {
    if (DataManager.isItem(item)) {
        return this.canEquipItem(item);
    }
    return _Game_BattlerBase_canEquip.apply(this, arguments);
};

/**
 * 【独自】アイテムの装備判定
 */
Game_BattlerBase.prototype.canEquipItem = function(item) {
    return (
        isEquipItem(item) &&
        !this.isEquipTypeSealed(item.etypeId)
    );
};

/**
 * ●独自コマンドを使用しない場合
 */
if (!pUseOriginalCommand) {
    /**
     * 【上書】アイテムの使用判定
     */
    Game_BattlerBase.prototype.meetsItemConditions = function(item) {
        // アクターの所持品をそのまま使うため、パーティの所持数チェックは削除
        return this.meetsUsableItemConditions(item);
        // return this.meetsUsableItemConditions(item) && $gameParty.hasItem(item);
    };
}

if (pUseOriginalCommand) {
    /**
     * ●有効な使用可能時か？
     */
    const _Game_BattlerBase_isOccasionOk = Game_BattlerBase.prototype.isOccasionOk;
    Game_BattlerBase.prototype.isOccasionOk = function(item) {
        // 装備アイテムを装備しているなら有効に
        if ($gameParty.inBattle() && isEquipItem(item)) {
            const equipItemWindow = SceneManager._scene._equipItemWindow;
            // 入力中以外または装備アイテムウィンドウの場合
            // ※通常のアイテムウィンドウに影響を与えないようにする措置
            if (BattleManager._phase !== "input" || equipItemWindow.visible) {
                if (this._equips && this._equips.some(equip => equip.itemId() == item.id)) {
                    return true;
                }
            }
        }
        return _Game_BattlerBase_isOccasionOk.apply(this, arguments);
    };
}

//-----------------------------------------------------------------------------
// Game_Battler
//-----------------------------------------------------------------------------

/**
 * ●戦闘開始時
 */
const _Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
Game_Battler.prototype.onBattleStart = function(advantageous) {
    // 使用済スロットを初期化
    this._usedItemSlots = [];

    _Game_Battler_onBattleStart.apply(this, arguments);
};

/**
 * ●戦闘終了時
 */
const _Game_Battler_onBattleEnd = Game_Battler.prototype.onBattleEnd;
Game_Battler.prototype.onBattleEnd = function() {
    _Game_Battler_onBattleEnd.apply(this, arguments);

    // 使用済スロットをクリア
    this._usedItemSlots = null;
};

/**
 * ●アイテムの消費
 */
const _Game_Battler_consumeItem = Game_Battler.prototype.consumeItem;
Game_Battler.prototype.consumeItem = function(item) {
    // 戦闘時以外または敵キャラの場合は処理終了
    if (!$gameParty.inBattle() || this.isEnemy()) {
        _Game_Battler_consumeItem.apply(this, arguments);
        return;
    }

    // 使用したアイテムに一致するスロットを検索
    for (let slotId = 0; slotId < this._equips.length; slotId++) {
        const equipItem = this._equips[slotId];
        // 使用したアイテムと一致した場合
        // ※既に使用済みの場合は除外
        if (equipItem.object() == item && !this._usedItemSlots.includes(slotId)) {
            // 使用済処理を行う場合
            if (pUsedOnlyOnce) {
                // 消耗品の場合
                // または消耗しないアイテムでも対象とする場合
                if (item.consumable || !pExceptDurables) {
                    // 使用済スロットとして設定（０始まり）
                    this._usedItemSlots.push(slotId);
                }
            }

            // アイテムが消耗あり、かつストックがない場合は装備を外す。
            if (item.consumable && $gameParty.numItems(item) == 0) {
                this.changeEquip(slotId, null);
            }
            break;
        }
    }

    // 消費実行
    _Game_Battler_consumeItem.apply(this, arguments);
};

/**
 * 【独自】使用済スロットかどうか？
 */
Game_Battler.prototype.isUsedSlot = function(slotId) {
    return this._usedItemSlots.includes(slotId);
};

//-----------------------------------------------------------------------------
// Game_Actor
//-----------------------------------------------------------------------------

/**
 * ●装備変更（変更結果のプレビュー用）
 */
const _Game_Actor_prototype_forceChangeEquip = Game_Actor.prototype.forceChangeEquip;
Game_Actor.prototype.forceChangeEquip = function(slotId, item) {
    // 途中セーブに対して適用した場合、
    // スロット領域が存在しない問題があるため初期化する。
    if (this._equips[slotId] == null) {
        for (let i = 0; i <= slotId; i++) {
            if (this._equips[i] == null) {
                this._equips[i] = new Game_Item();
            }
        }
    }
    _Game_Actor_prototype_forceChangeEquip.apply(this, arguments);
};

/**
 * ●装備変更
 */
const _Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
Game_Actor.prototype.changeEquip = function(slotId, item) {
    // 途中セーブに対して適用した場合、
    // スロット領域が存在しない問題があるため初期化する。
    if (this._equips[slotId] == null) {
        for (let i = 0; i <= slotId; i++) {
            if (this._equips[i] == null) {
                this._equips[i] = new Game_Item();
            }
        }
    }
    _Game_Actor_changeEquip.apply(this, arguments);
};

/**
 * 配列指定されている場合は、その順番のスロットをアイテム用に上書き。
 * ※基本的には非推奨の方法
 */
if (DEFAULT_SLOTS.length >= 2) {
    /**
     * ●装備スロット取得
     */
    const _Game_Actor_equipSlots = Game_Actor.prototype.equipSlots;
    Game_Actor.prototype.equipSlots = function() {
        const slots = _Game_Actor_equipSlots.apply(this, arguments);
        for (let i = 0; i < slots.length; i++) {
            // 該当のスロットは全て装備アイテムに
            if (DEFAULT_SLOTS.includes(i)) {
                slots[i] = DEFAULT_EQUIP_TYPE;
            }
        }
        return slots;
    };
}

// 一時的に装備アイテムの変更を禁止
let mEquipItemChangeNG = false;

/**
 * ●最強装備
 */
const _Game_Actor_optimizeEquipments = Game_Actor.prototype.optimizeEquipments;
Game_Actor.prototype.optimizeEquipments = function() {
    mEquipItemChangeNG = true;
    _Game_Actor_optimizeEquipments.apply(this, arguments);
    mEquipItemChangeNG = false;
};

/**
 * ●装備変更可能なスロットかどうか？
 */
const _Game_Actor_isEquipChangeOk = Game_Actor.prototype.isEquipChangeOk;
Game_Actor.prototype.isEquipChangeOk = function(slotId) {
    // 最強装備時のみ装備アイテムは変更の対象外に。
    if (mEquipItemChangeNG && this.equipSlots()[slotId] == DEFAULT_EQUIP_TYPE) {
        return false;
    }
    return _Game_Actor_isEquipChangeOk.apply(this, arguments);
};

//-----------------------------------------------------------------------------
// Game_Item
//-----------------------------------------------------------------------------

/**
 * ●装備できるかどうか？
 * ※外部プラグインからの参照用
 */
const _Game_Item_isEquipItem = Game_Item.prototype.isEquipItem;
Game_Item.prototype.isEquipItem = function() {
    if (this.isItem() && isEquipItem($dataItems[this._itemId])) {
        return true;
    }
    return _Game_Item_isEquipItem.apply(this, arguments);
};

//-----------------------------------------------------------------------------
// Window_EquipItem
//-----------------------------------------------------------------------------

/**
 * ●装備候補に表示するか？
 */
const _Window_EquipItem_includes = Window_EquipItem.prototype.includes;
Window_EquipItem.prototype.includes = function(item) {
    // 装備可能アイテムの場合
    if (isEquipItem(item)) {
        // 装備対象のスロットを取得
        const equipSlots = getEquipSlots(item);
        return (
            this._actor &&
            this._actor.canEquip(item) &&
            equipSlots.includes(this.etypeId())
        );
    }
    return _Window_EquipItem_includes.apply(this, arguments);
};

/**
 * ●ＭＶでは存在しない関数なので定義
 */
if (!Window_EquipItem.prototype.etypeId) {
    Window_EquipItem.prototype.etypeId = function() {
        if (this._actor && this._slotId >= 0) {
            return this._actor.equipSlots()[this._slotId];
        } else {
            return 0;
        }
    };
}

//-----------------------------------------------------------------------------
// Window_ActorCommand
//-----------------------------------------------------------------------------

/**
 * ●独自コマンドを使用する場合
 */
if (pUseOriginalCommand) {
    /**
     * ●コマンド一覧の作成
     */
    const _Window_ActorCommand_makeCommandList = Window_ActorCommand.prototype.makeCommandList;
    Window_ActorCommand.prototype.makeCommandList = function() {
        _Window_ActorCommand_makeCommandList.apply(this, arguments);

        // 装備アイテムコマンドの追加
        if (this._actor) {
            this._list.splice(pCommandPosition, 0, { name: pCommandName, symbol: "equipItem", enabled: true, ext: null});
        }
    };
}

//-----------------------------------------------------------------------------
// Scene_Battle
//-----------------------------------------------------------------------------

/**
 * ●独自コマンドを使用する場合
 */
if (pUseOriginalCommand) {
    /**
     * ●ウィンドウの作成
     */
    const _Scene_Battle_createAllWindows = Scene_Battle.prototype.createAllWindows;
    Scene_Battle.prototype.createAllWindows = function() {
        _Scene_Battle_createAllWindows.apply(this, arguments);

        this.createEquipItemWindow();
    };

    /**
     * 【独自】装備アイテムウィンドウを作成
     */
    Scene_Battle.prototype.createEquipItemWindow = function() {
        const rect = this.itemWindowRect();
        this._equipItemWindow = new Window_BattleEquipItem(rect);
        this._equipItemWindow.setHelpWindow(this._helpWindow);
        this._equipItemWindow.setHandler("ok", this.onEquipItemOk.bind(this));
        this._equipItemWindow.setHandler("cancel", this.onEquipItemCancel.bind(this));
        this.addWindow(this._equipItemWindow);
    };

    /**
     * 【独自】装備アイテムウィンドウを選択
     */
    Scene_Battle.prototype.commandEquipItem = function() {
        this._equipItemWindow.refresh();
        this._equipItemWindow.show();
        this._equipItemWindow.activate();
        this._statusWindow.hide();
        this._actorCommandWindow.hide();
    };

    /**
     * ●アクターコマンドウィンドウを作成
     */
    const _Scene_Battle_createActorCommandWindow = Scene_Battle.prototype.createActorCommandWindow;
    Scene_Battle.prototype.createActorCommandWindow = function() {
        _Scene_Battle_createActorCommandWindow.apply(this, arguments);

        const commandWindow = this._actorCommandWindow;
        commandWindow.setHandler("equipItem", this.commandEquipItem.bind(this));
    };

    /**
     * ●サブウィンドウを隠す。
     */
    const _Scene_Battle_hideSubInputWindows = Scene_Battle.prototype.hideSubInputWindows;
    Scene_Battle.prototype.hideSubInputWindows = function() {
        _Scene_Battle_hideSubInputWindows.apply(this, arguments);

        this._equipItemWindow.deactivate();
        this._equipItemWindow.hide();
    };

    /**
     * ●ＴＰＢ用のアクティブ判定処理
     */
    const _Scene_Battle_isTimeActive = Scene_Battle.prototype.isTimeActive;
    Scene_Battle.prototype.isTimeActive = function() {
        if (BattleManager.isActiveTpb()) {
            return _Scene_Battle_isTimeActive.apply(this, arguments) && !this._equipItemWindow.active;
        }
        return _Scene_Battle_isTimeActive.apply(this, arguments);
    };

    /**
     * ●ウィンドウのアクティブ状態を確認
     */
    const _Scene_Battle_isAnyInputWindowActive = Scene_Battle.prototype.isAnyInputWindowActive;
    Scene_Battle.prototype.isAnyInputWindowActive = function() {
        return _Scene_Battle_isAnyInputWindowActive.apply(this, arguments) || this._equipItemWindow.active;
    };

    /**
     * ●アクターキャンセル時
     */
    const _Scene_Battle_onActorCancel = Scene_Battle.prototype.onActorCancel;
    Scene_Battle.prototype.onActorCancel = function() {
        _Scene_Battle_onActorCancel.apply(this, arguments);

        switch (this._actorCommandWindow.currentSymbol()) {
            case "equipItem":
                this._equipItemWindow.show();
                this._equipItemWindow.activate();
                break;
        }
    };

    /**
     * ●エネミーキャンセル時
     */
    const _Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
    Scene_Battle.prototype.onEnemyCancel = function() {
        _Scene_Battle_onEnemyCancel.apply(this, arguments);

        switch (this._actorCommandWindow.currentSymbol()) {
            case "equipItem":
                this._equipItemWindow.show();
                this._equipItemWindow.activate();
                break;
        }
    };

    /**
     * ●装備アイテム確定時
     */
    Scene_Battle.prototype.onEquipItemOk = function() {
        const item = this._equipItemWindow.item();
        const action = BattleManager.inputtingAction();
        action.setItem(item.id);
        $gameParty.setLastItem(item);
        this.onSelectAction();
    };

    /**
     * ●装備アイテムキャンセル時
     */
    Scene_Battle.prototype.onEquipItemCancel = function() {
        this._equipItemWindow.hide();
        this._statusWindow.show();
        this._actorCommandWindow.show();
        this._actorCommandWindow.activate();
    };
}

//-----------------------------------------------------------------------------
// Window_BattleEquipItem
//
// 戦闘時に使用可能な装備品を表示するウィンドウ

/**
 * ●独自コマンドを使用する場合
 */
function Window_BattleEquipItem() {
    this.initialize(...arguments);
}

Window_BattleEquipItem.prototype = Object.create(Window_BattleItem.prototype);
Window_BattleEquipItem.prototype.constructor = Window_BattleEquipItem;

/**
 * ●アイテム一覧作成
 */
Window_BattleEquipItem.prototype.makeItemList = function() {
    this._data = [];

    // アクターの装備品を表示
    const actor = BattleManager.actor();
    for (let slotId = 0; slotId < actor._equips.length; slotId++) {
        // 既に使用済のスロットだった場合は次へ
        if (actor.isUsedSlot(slotId)) {
            continue;
        }

        const equip = actor._equips[slotId];
        // JSONデータを取得
        const dataItem = equip.object();
        // アイテムならば表示対象に追加
        if (isEquipItem(dataItem)) {
            this._data.push(dataItem);
        }
    }
};

/**
 * ●アイテムが使用可能かどうか？
 */
Window_BattleEquipItem.prototype.isEnabled = function(item) {
    if (!item) {
        return false;
    }
    // 現在のアクターを取得
    const actor = BattleManager.actor();
    // アクターがアイテムを使用できるかどうか？
    return actor.canMove();
};

/**
 * ●戦闘中の使用候補に表示するか？
 */
Window_BattleEquipItem.prototype.includes = function(item) {
    // 装備可能なアイテムのみが対象
    if (isEquipItem(item)) {
        // 現在のアクターを取得
        const actor = BattleManager.actor();
        // 装備中かつ有効ならば表示
        if (actor.hasValidItem(item)) {
            return true;
        }
    }
    return false;
};

/**
 * ●個数を表示するかどうか？
 */
Window_BattleEquipItem.prototype.needsNumber = function() {
    // 表示しないで固定
    return false;
};

//-----------------------------------------------------------------------------
// Window_BattleItem
//-----------------------------------------------------------------------------

/**
 * ●独自コマンドを使用しない場合
 */
if (!pUseOriginalCommand) {
    /**
     * ●アイテム一覧作成
     */
    Window_BattleItem.prototype.makeItemList = function() {
        this._data = [];

        // アクターの装備品を表示
        const actor = BattleManager.actor();
        for (let slotId = 0; slotId < actor._equips.length; slotId++) {
            // 既に使用済のスロットだった場合は次へ
            if (actor.isUsedSlot(slotId)) {
                continue;
            }

            const equip = actor._equips[slotId];
            // JSONデータを取得
            const dataItem = equip.object();
            // アイテムならば表示対象に追加
            if (isEquipItem(dataItem)) {
                this._data.push(dataItem);
            }
        }
    };

    /**
     * ●アイテムが使用可能かどうか？
     */
    Window_BattleItem.prototype.isEnabled = function(item) {
        if (!item) {
            return false;
        }
        // 現在のアクターを取得
        const actor = BattleManager.actor();
        // アクターがアイテムを使用できるかどうか？
        return actor.meetsUsableItemConditions(item);
    };

    /**
     * 【上書】戦闘中の使用候補に表示するか？
     */
    Window_BattleItem.prototype.includes = function(item) {
        // 装備可能なアイテムのみが対象
        if (isEquipItem(item)) {
            // 現在のアクターを取得
            const actor = BattleManager.actor();
            // 装備中かつ有効ならば表示
            if (actor.hasValidItem(item)) {
                return true;
            }
        }
        return false;
    };

    /**
     * 【上書】個数を表示するかどうか？
     */
    Window_BattleItem.prototype.needsNumber = function() {
        // 表示しないで固定
        return false;
    };
}

//-----------------------------------------------------------------------------
// 共通
//-----------------------------------------------------------------------------

/**
 * ●装備できるアイテムかどうか？
 */
function isEquipItem(dataItem) {
    // 使用可能時が『常時』『戦闘時』のアイテムを自動的に装備可能とする。
    if (pAutoEquipMode && dataItem) {
        return dataItem.occasion === 0 || dataItem.occasion === 1;
    }
    // それ以外のアイテムも指定があれば有効に
    return dataItem && dataItem.meta.EquipItem;
}

/**
 * ●装備対象となるスロット（配列）を取得
 */
function getEquipSlots(dataItem) {
    let equipItemEtypeId = dataItem.meta.EquipItem;
    // 値が有効で、かつ値が指定されている場合はスロットを変更
    if (equipItemEtypeId && equipItemEtypeId !== true) {
        return makeTargets(equipItemEtypeId);
    }
    return DEFAULT_SLOTS;
}

})();
