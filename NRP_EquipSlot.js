//=============================================================================
// NRP_EquipSlot.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.13 Change the equipment slots at will.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/489626316.html
 *
 * @help Change the equipment slots at will.
 * 
 * By default, Equipment Type and Actor's equipment slots
 * are one-to-one, but can be changed freely.
 * For example, it will be possible to equip multiple accessories.
 * 
 * Furthermore, you can set up additional equipment slots
 * for each actor, class, weapon, armor, state, and skill.
 * Specifically, the following system can be implemented.
 * 
 * - Add a slot for an accessory for each equipment.
 *   (so-called materia)
 * - Only mages can equip multiple grimoires.
 * - A passive skill that increases the number of equipment slots
 *   when learned.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Fill in the following in the notes field
 * for the Actor, Class, Weapon, Armor, State, or Skill.
 * 
 * <AddEquipSlot:[Equipment Type]>
 * 
 * A slot of the specified Equipment Type is added.
 * For example, <AddEquipSlot:5> for "05:Accessories".
 * 
 * You can further specify the number of slots
 * by adding a comma-separated list of numbers.
 * 
 * <AddEquipSlot:5, 2>
 * 
 * This will add two slots for accessories.
 * ※The number of slots can also be negative.
 *   However, the behavior of a combination
 *   of plus and minus is not guaranteed.
 * 
 * If you want to add multiple Equipment Types, you can write
 * 
 * <AddEquipSlot:5, 2>
 * <AddEquipSlot2:6, 2>
 * <AddEquipSlot3:7>
 * 
 * ※Please note that the order is: unmarked, 2, 3.
 * 
 * -------------------------------------------------------------------
 * ■Equip Unique
 * -------------------------------------------------------------------
 * Specify the name of the equipment kind.
 * 
 * <EquipUnique:[kind]>
 * 
 * This makes it impossible to equip
 * the same kind of equipment at the same time.
 * This kind name has nothing to do
 * with "armor type" or "equipment type".
 * 
 * For example, in a work where all armor can be freely equipped
 * like accessories, it is possible to prohibit combinations
 * such as head armor (hat and helmet)
 * that would be uncomfortable if equipped in duplicate.
 * 
 * In that case, set the same kind name to note on all head armor.
 * 
 * -------------------------------------------------------------------
 * [Show on another page]
 * -------------------------------------------------------------------
 * The equipment window can be split into multiple pages.
 * For example, if a detachable skill system
 * is to be implemented with this plugin,
 * it would be easier to understand if it is
 * on a separate page from the normal equipment.
 * 
 * ◆Procedure
 * Set the equipment type in "PagingEquipmentType" as a numerical value.
 * If 5 is specified, equipment types after 5
 * will be displayed on a separate page.
 * 
 * Multiple specifications, such as "4,6", are also possible.
 * In this case, the equipment types will be displayed
 * on three separate pages: "1~3", "4~5", and "6~".
 * 
 * Note that the page can be switched from left to right.
 * With the mouse, you can switch between them with the wheel.
 * 
 * However, it may be difficult for the player
 * to notice in the standard way.
 * Also, the display is a little suspect in MV.
 * 
 * If combined with a plugin that paginates the window (NRP_PageWindow.js),
 * it is possible to display the switching symbol.
 * https://newrpg.seesaa.net/article/475347742.html
 * 
 * -------------------------------------------------------------------
 * [Acknowledgements]
 * -------------------------------------------------------------------
 * The following plugin was used as a reference
 * in the creation of this plugin.
 * 
 * ◆EquipSlotAddTrait.js (Yana)
 * https://w.atwiki.jp/pokotan/pages/3.html
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
 * @param DefaultEquipSlots
 * @type number[]
 * @desc Initial configuration of slots (Equipment Type).
 * Multiple equipment can be equipped by specifying the same number.
 * 
 * @param AdjustInitEquip
 * @type boolean
 * @default true
 * @desc If there is a mismatch between equipment type and DefaultEquipSlots order, also allow the initial equipment to take effect.
 * 
 * @param DualWieldPosition
 * @type number
 * @default 2
 * @desc The position where the weapon is equipped during Dual Wield.
 * The standard position is second.
 * 
 * @param PagingEquipmentType
 * @type string
 * @desc Display the specified Equipment Type or later on a separate page.
 * Multiple items can be specified. (e.g.: 4,6)
 * 
 * @param StatusShowSlots
 * @text [MZ]StatusShowSlots
 * @type number[]
 * @desc Equipment type to be displayed on the status screen.
 * If blank, it will be displayed until it fits in the window.
 * 
 * @param ArmorTypeUnique
 * @type boolean
 * @default false
 * @desc Disables the ability to equip multiple pieces of equipment with the same armor type.
 * 
 * @param ArmorUnique
 * @type boolean
 * @default false
 * @desc Disables the ability to equip multiple pieces of the same armor.
 * 
 * @param <For NRP_EquipItem>
 * @desc This item is for use with NRP_EquipItem.js.
 * 
 * @param ItemUnique
 * @parent <For NRP_EquipItem>
 * @type boolean
 * @default false
 * @desc Disables the ability to equip multiple pieces of the same item.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.13 装備スロットを自由に変更。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/489626316.html
 * 
 * @help 装備スロットを自由に変更します。
 * 
 * 標準では装備タイプとアクターの装備スロットは１対１ですが、
 * 自由に変更できるようにします。
 * 例えば、装飾品を複数装備できるようになります。
 * 
 * さらにはアクター、職業、武器、防具、ステート、スキル毎に、
 * 装備スロットを追加する設定が可能です。
 * 具体的には以下のようなシステムを実現できます。
 * 
 * ・装備毎に装飾品スロットを追加する。（いわゆるマテリア）
 * ・魔道士のみが魔道書を複数装備できる。
 * ・習得すると装備スロットが増えるパッシブスキル。
 * 
 * -------------------------------------------------------------------
 * ■使用法
 * -------------------------------------------------------------------
 * 以下をアクター、職業、武器、防具、ステート、スキルの
 * いずれかのメモ欄に記入してください。
 * 
 * <AddEquipSlot:[装備タイプ]>
 * 
 * 指定した装備タイプのスロットが追加されます。
 * 例えば『05:装飾品』ならば<AddEquipSlot:5>です。
 * 
 * さらにカンマ区切りで数値を追加すれば、スロット数を指定できます。
 * 
 * <AddEquipSlot:5, 2>
 * 
 * これで装飾品のスロットが２つ追加されます。
 * ※スロット数はマイナスも可能です。
 * 　ただし、プラスとマイナスを組み合わせた場合の挙動は保証しません。
 * 
 * 複数の装備タイプを追加したい場合は以下のように記述できます。
 * 
 * <AddEquipSlot:5, 2>
 * <AddEquipSlot2:6, 2>
 * <AddEquipSlot3:7>
 * 
 * ※無印, 2, 3の順序であることにご注意ください。
 * 
 * -------------------------------------------------------------------
 * ■同一系統の装備を禁止
 * -------------------------------------------------------------------
 * 装備の系統名を指定します。
 * 
 * <EquipUnique:[系統名]>
 * 
 * これにより、同じ系統の装備を同時に装備できなくなります。
 * この系統名は『防具タイプ』や『装備タイプ』とは無関係です。
 * 例えば、全ての防具を装飾品のように自由に装備できる作品において、
 * 頭防具（帽子と兜）のように重複して装備すると
 * 違和感がある組み合わせを禁止できます。
 * 
 * その場合は、全ての頭防具のメモ欄に同じ系統名を設定してください。
 * 
 * -------------------------------------------------------------------
 * ■別ページに表示
 * -------------------------------------------------------------------
 * 装備画面を複数のページに分割することが可能です。
 * 例えば、着脱可能なスキルシステムを当プラグインで実現する場合など、
 * 通常の装備とは別ページにすると分かりやすいです。
 * 
 * ◆手順
 * 『ページ切替する装備タイプ』に装備タイプを数値で設定してください。
 * 5を指定した場合、5以降の装備タイプが別ページに表示されます。
 * 
 * 「4,6」というように複数指定も可能です。
 * この場合「1~3」「4~5」「6~」の３ページに装備タイプが分かれます。
 * 
 * なお、ページは左右で切り替えできます。
 * マウス操作ではホイールで切り替えできます。
 * 
 * ただし、標準ではプレイヤーが気づきにくいかもしれません。
 * また、ＭＶでは少し表示が怪しいです。
 * 
 * ウィンドウをページ化するプラグイン（NRP_PageWindow.js）と
 * 組み合わせれば、切替記号を表示することも可能です。
 * https://newrpg.seesaa.net/article/475347742.html
 * 
 * -------------------------------------------------------------------
 * ■謝辞
 * -------------------------------------------------------------------
 * このプラグインの作成に当たり、以下のプラグインを参考にさせて頂きました。
 * 
 * ◆EquipSlotAddTrait.js（装備スロット追加特徴）（Yana様）
 * https://w.atwiki.jp/pokotan/pages/3.html
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
 * @param DefaultEquipSlots
 * @text 初期スロット構成
 * @type number[]
 * @desc 装備スロット（装備タイプ）の初期構成です。
 * 同じ番号を複数指定すれば重複装備も可能です。
 * 
 * @param AdjustInitEquip
 * @text 初期装備を自動調整
 * @type boolean
 * @default true
 * @desc 装備タイプと初期スロット構成の順序が不一致な場合、初期装備が有効にならない問題に対処します。
 * 
 * @param DualWieldPosition
 * @text 二刀流の位置
 * @type number
 * @default 2
 * @desc 二刀流の際に武器を装備する位置です。
 * 標準では二番目になります。
 * 
 * @param PagingEquipmentType
 * @text ページ切替する装備タイプ
 * @type string
 * @desc 指定の装備タイプ以降を別ページに表示します。
 * 複数指定可能です。（例：4,6）
 * 
 * @param StatusShowSlots
 * @text [MZ]ｽﾃｰﾀｽの表示スロット
 * @type number[]
 * @desc ステータス画面に表示する装備スロット（装備タイプ）です。
 * 空白時はウィンドウに収まるまで全表示します。
 * 
 * @param ArmorTypeUnique
 * @text 同一防具タイプの装備禁止
 * @type boolean
 * @default false
 * @desc 防具タイプが同じ装備を複数装備できなくします。
 * 
 * @param ArmorUnique
 * @text 同一防具の装備禁止
 * @type boolean
 * @default false
 * @desc 同じ防具を複数装備できなくします。
 * 
 * @param <For NRP_EquipItem>
 * @text ＜NRP_EquipItem.js連携＞
 * @desc NRP_EquipItem.jsと併用する場合の項目です。
 * 
 * @param ItemUnique
 * @text 同一アイテムの装備禁止
 * @parent <For NRP_EquipItem>
 * @type boolean
 * @default false
 * @desc 同じアイテムを複数装備できなくします。
 */

(function() {
"use strict";

/**
 * ●構造体をJSで扱えるように変換
 */
function parseStruct1(arg) {
    if (arg == undefined || arg == "") {
        return undefined;
    }
    const ret = [];
    for (const str of JSON.parse(arg)) {
        ret.push(str);
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

const PLUGIN_NAME = "NRP_EquipSlot";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pDefaultEquipSlots = parseStruct1(parameters["DefaultEquipSlots"]);
const pAdjustInitEquip = toBoolean(parameters["AdjustInitEquip"], false);
const pDualWieldPosition = toNumber(parameters["DualWieldPosition"], 2);
const pPagingEquipmentType = parameters["PagingEquipmentType"];
const pStatusShowSlots = parseStruct1(parameters["StatusShowSlots"]);
const pArmorTypeUnique = toBoolean(parameters["ArmorTypeUnique"], false);
const pArmorUnique = toBoolean(parameters["ArmorUnique"], false);
const pItemUnique = toBoolean(parameters["ItemUnique"], false);

//-----------------------------------------------------------------------------
// Game_Actor
//-----------------------------------------------------------------------------

if (pAdjustInitEquip) {
    /**
     * 【上書】装備の初期化
     * ※初期状態では装備タイプと装備スロットがほぼ１対１で対応しているが、
     * 　スロット構造が変更された場合に対処できなくなる。
     * 　そこで改めて再設定を行う。
     */
    Game_Actor.prototype.initEquips = function(equips) {
        const slots = this.equipSlots();
        const maxSlots = slots.length;
        this._equips = [];

        // 初期装備の装備タイプとＩＤの組を作成
        const initEquipsMap = [];
        for (let i = 0; i < equips.length; i++) {
            let etype = i + 1;
            // 二刀流の位置かつアクターが二刀流の場合
            if (i == pDualWieldPosition - 1 && this.isDualWield()) {
                // 盾 -> 武器に変更
                etype = 1;
            }
            initEquipsMap.push({etype: etype, equipId: equips[i], set: false});
        }

        // 装備スロット毎のループ
        for (let i = 0; i < maxSlots; i++) {
            // 装備スロットを初期化する。
            this._equips[i] = new Game_Item();

            // スロットに対応する装備タイプを取得
            const slotEType = slots[i];

            // 初期装備の装備情報でループ
            for (const initEquipMap of initEquipsMap) {
                const initEtype = initEquipMap.etype;
                const initEquipId = initEquipMap.equipId;
                const initSet = initEquipMap.set;

                // 装備タイプが一致する場合
                // ※ただし、設定済の場合は除外
                if (!initSet && initEtype == slotEType) {
                    // 初期装備を設定
                    this._equips[i].setEquip(slotEType === 1, initEquipId);
                    // 設定済のフラグを立てる。
                    initEquipMap.set = true;
                    break;
                }
            }
        }

        // スロット情報を記憶
        this._oldSlots = slots;

        // 無効な装備を外す。
        this.releaseUnequippableItems(true);
        // リフレッシュ
        this.refresh();
    };
}

/**
 * ●無効になった装備を外す
 */
const _Game_Actor_releaseUnequippableItems = Game_Actor.prototype.releaseUnequippableItems;
Game_Actor.prototype.releaseUnequippableItems = function(forcing) {
    // この処理中のみスロット変化による装備解除を有効にする。
    mForcing = forcing;
    mReleaseUnequippableItems = true;
    _Game_Actor_releaseUnequippableItems.apply(this, arguments);
    mReleaseUnequippableItems = false;
    mForcing = false;
};

if (pDefaultEquipSlots) {
    /**
     * 【上書】スロットの生成
     * ※装備タイプとは独立して初期スロットを設定
     */
    Game_Actor.prototype.equipSlots = function() {
        const slots = [];
        // 初期スロットを設定
        for (const etype of pDefaultEquipSlots) {
            slots.push(eval(etype));
        }
        // 二刀流
        if (slots.length >= 2 && this.isDualWield()) {
            slots[1] = 1;
        }
        return slots;
    };
}

/**
 * ●スロットの生成
 */
const _Game_Actor_equipSlots = Game_Actor.prototype.equipSlots;
Game_Actor.prototype.equipSlots = function() {
    const slots = _Game_Actor_equipSlots.apply(this, arguments);

    // スロット情報を記憶してない場合は記憶
    if (!this._oldSlots) {
        this._oldSlots = slots;
    }

    //----------------------------------------------------
    // 特徴を元にスロットの配列を生成
    //----------------------------------------------------
    // メモ欄を参照するオブジェクト
    // 特徴系＋スキル
    const objects = this.traitObjects().concat(this.skills());
    for (const object of objects) {
        const addEquipSlot = object.meta.AddEquipSlot;
        changeSlots(slots, addEquipSlot);

        // <AddEquipSlot2>, <AddEquipSlot3>というように数値が尽きるまで処理
        // ※最大１００までループ
        for (let i = 2; i <= 100; i++) {
            const addEquipSlotNumber = object.meta["AddEquipSlot" + i];
            // 該当のタグがなければ終了
            if (!addEquipSlotNumber) {
                break;
            }
            // 該当のタグがあれば処理
            changeSlots(slots, addEquipSlotNumber);
        }
    }

    // スロットを数値順でソート
    slots.sort((a, b) => a - b);

    //-----------------------------------------------------------------------
    // ※以下、非常に難解な処理につき注意！
    //
    // スロット情報（slots）には[1,2,3,3,4,4]というように、
    // 装備タイプの配列が格納されているが、
    // この要素が[1,2,3,4,4]というように変化した時の対応が非常にややこしい。
    //
    // というのも、これに対応する装備情報（this.equips()）は装備品の配列だが、
    // 空データも許容されるため、その際の装備タイプが分からない。
    // 従って、スロット情報が変化した時、以前の装備との対応が分からなくなる。
    //
    // そんなわけで、前回のスロット情報（this._oldSlots）を保持＆参照することで、
    // どうにかこうにか対応情報を復元している。
    //-----------------------------------------------------------------------

    //-------------------------------------------------------------
    // 装備解除を行う場合、
    // スロット情報に変化がないかチェックし、変化があれば装備欄を調整
    //-------------------------------------------------------------
    if (mReleaseUnequippableItems && !equalSlots(this._oldSlots, slots)) {
        // 前回の装備タイプと装備（複数）をマッピング
        const equipsMap = makeEquipsMap(this.equips(), this._oldSlots);

        //------------------------------------------------------
        // 装備マップとスロット配列を元に装備用オブジェクトを再構築
        //------------------------------------------------------
        this._equips = mapToEquips(this, equipsMap, slots);
        // スロット情報の更新を記憶
        this._oldSlots = slots;
    }

    return slots;
};

/**
 * ●装備の変更
 */
const _Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
Game_Actor.prototype.changeEquip = function(slotId, item) {
    // 無効なスロットを参照してしまうパターンがあるので対処
    if (!this._equips[slotId]) {
        this.refresh();
        return;
    }
    _Game_Actor_changeEquip.apply(this, arguments);
};

/**
 * ●装備の強制変更（内部処理用）
 */
const _Game_Actor_forceChangeEquip = Game_Actor.prototype.forceChangeEquip;
Game_Actor.prototype.forceChangeEquip = function(slotId, item) {
    // 無効なスロットを参照してしまうパターンがあるので対処
    if (!this._equips[slotId]) {
        this.refresh();
        return;
    }
    _Game_Actor_forceChangeEquip.apply(this, arguments);
};

// 装備解除判定用フラグ
let mReleaseUnequippableItems = false;
let mForcing = false;

/**
 * ●装備タイプと装備（複数）をマッピングして返す
 */
function makeEquipsMap(equips, slots) {
    // 装備タイプと装備（複数）をマッピング
    const equipsMap = new Map();
    // 初期化（装備タイプ毎に空の配列を作成）
    for (let equipType = 1; equipType < $dataSystem.equipTypes.length; equipType++) {
        equipsMap.set(equipType, []);
    }

    // スロット毎にループ
    for (let i = 0; i < slots.length; i++) {
        const slot = slots[i];
        const equip = equips[i];

        if (equip) {
            const equipArray = equipsMap.get(equip.etypeId);
            equipArray.push(equip);
            equipsMap.set(equip.etypeId, equipArray);

        // 装備が空欄の場合も空欄を追加
        } else {
            // slotsを元にetypeIdを取得する。
            const equipArray = equipsMap.get(slot);
            equipArray.push(null);
            equipsMap.set(slot, equipArray);
        }
    }

    return equipsMap;
}

/**
 * ●装備マップとスロットデータを元に装備用オブジェクトに変換
 */
function mapToEquips(actor, equipsMap, slots) {
    const equips = [];

    // 再度、装備タイプ毎に反映
    for (let equipType = 1; equipType < $dataSystem.equipTypes.length; equipType++) {
        // 装備タイプに該当する装備（配列）を取得
        const equipArray = equipsMap.get(equipType);
        // 該当の装備タイプの数を取得
        const slotTypeCount = slots.filter(s => s == equipType).length;

        for (let i = 0; i < slotTypeCount; i++) {
            if (equipArray && equipArray[i]) {
                equips.push(new Game_Item(equipArray[i]));
            } else {
                equips.push(new Game_Item());
            }
        }

        // 装備欄が減少した場合
        // ※ただし、forcingがオンの場合はプレビュー用の内部処理なので対象外。
        //   この処理を適切にやらないと装備が増殖または消滅して大変なことに……。
        if (!mForcing && equipArray.length > slotTypeCount) {
            // 装備を解除してパーティに戻す。
            for (let i = slotTypeCount; i < equipArray.length; i++) {
                actor.tradeItemWithParty(null, equipArray[i]);
            }
        }
    }

    // nullのスロットは他の処理でエラーになるため初期化
    for (let i = 0; i < slots.length; i++) {
        if (equips[i] == null) {
            equips[i] = new Game_Item();
        }
    }

    return equips;
}


/**
 * ●スロットの内容が等しいか確認
 */
function equalSlots(slotsA, slotsB) {
    if (slotsA.length != slotsB.length) {
        return false;
    }

    for (let i = 0; i < slotsA.length; i++) {
        if (slotsA[i] != slotsB[i]) {
            return false;
        }
    }
    // 全て一致
    return true;
}

/**
 * ●スロット情報を変更
 */
function changeSlots(slots, addEquipSlot) {
    // タグが存在しない場合
    if (!addEquipSlot) {
        return;
    }

    // カンマ区切りを分解
    const addEquipSlotArray = addEquipSlot.split(",");
    const etype = eval(addEquipSlotArray[0]);
    const count = eval(addEquipSlotArray[1]) || 1;
    // 値が＋の場合はスロット追加
    if (count > 0) {
        for (let i = 0; i < count; i++) {
            slots.push(etype);
        }
    // 値が－の場合はスロット除去
    } else if (count < 0) {
        for (let i = 0; i > count; i--) {
            const deleteIndex = slots.indexOf(etype);
            if (deleteIndex >= 0) {
                slots.splice(deleteIndex, 1);
            }
        }
    }
}

//-----------------------------------------------------------------------------
// 同一系統の装備を禁止
//-----------------------------------------------------------------------------

// スロット番号管理用
let mSlotId = null;

/**
 * ●最強装備の選定
 */
const _Game_Actor_bestEquipItem = Game_Actor.prototype.bestEquipItem;
Game_Actor.prototype.bestEquipItem = function(slotId) {
    mSlotId = slotId;
    const ret = _Game_Actor_bestEquipItem.apply(this, arguments);
    mSlotId = null;
    return ret;
};

/**
 * ●装備可能かどうか？
 * ※bestEquipItemから呼ばれる場合に対応
 */
const _Game_BattlerBase_canEquip = Game_BattlerBase.prototype.canEquip;
Game_BattlerBase.prototype.canEquip = function(item) {
    // スロットの指定がない場合
    // アイテムが無効な場合
    // またはequipsメソッドが無効（敵キャラ）の場合
    if (!mSlotId || !item || !this.equips) {
        return _Game_BattlerBase_canEquip.apply(this, arguments);
    }

    // 装備制限に引っかかるか？
    if (this.isEquipUnique(item, mSlotId)) {
        return false;
    }

    return _Game_BattlerBase_canEquip.apply(this, arguments);
};

/**
 * ●装備できるかどうか？
 */
const _Window_EquipItem_isEnabled = Window_EquipItem.prototype.isEnabled;
Window_EquipItem.prototype.isEnabled = function(item) {
    // アイテムが空欄の場合は終了
    if (!item) {
        return _Window_EquipItem_isEnabled.apply(this, arguments);
    }

    // 装備制限に引っかかるか？
    if (this._actor.isEquipUnique(item, this._slotId)) {
        return false;
    }

    return _Window_EquipItem_isEnabled.apply(this, arguments);
};

/**
 * 【独自】装備制限に引っかかるか？
 */
Game_BattlerBase.prototype.isEquipUnique = function(item, slotId) {
    // 同一防具、同一アイテムの装備禁止
    if (pArmorUnique && DataManager.isArmor(item)
            || pItemUnique && DataManager.isItem(item)) {
        // アクターの装備チェック
        for (let tempSlotId = 0; tempSlotId < this.equips().length; tempSlotId++) {
            // 選択中のスロットについては除外
            if (tempSlotId == slotId) {
                continue;
            }
            const equip = this.equips()[tempSlotId];
            // 装備が有効な場合
            if (equip) {
                // 同一の装備が存在すれば装備不可
                if (item == equip) {
                    return true;
                }
            }
        }
    }

    // 対象の装備の系統指定
    const equipUnique = item.meta.EquipUnique;

    // アクターの装備チェック
    for (let tempSlotId = 0; tempSlotId < this.equips().length; tempSlotId++) {
        // 選択中のスロットについては除外
        if (tempSlotId == slotId) {
            continue;
        }
        const equip = this.equips()[tempSlotId];
        // 装備が有効な場合
        if (equip) {
            // 同系統の装備が存在すれば装備不可
            if (equipUnique && equipUnique == equip.meta.EquipUnique) {
                return true;
            // 同一の防具タイプが存在すれば装備不可
            } else if (pArmorTypeUnique && item.atypeId && item.atypeId == equip.atypeId) {
                return true;
            }
        }
    }
    return false;
};

//-----------------------------------------------------------------------------
// スキル習得時の調整
//-----------------------------------------------------------------------------

/**
 * ●スキルを覚える
 */
const _Game_Actor_learnSkill = Game_Actor.prototype.learnSkill;
Game_Actor.prototype.learnSkill = function(skillId) {
    _Game_Actor_learnSkill.apply(this, arguments);

    if (skillId) {
        const dataSkill = $dataSkills[skillId];
        // スロット情報が変更された場合はリフレッシュ
        if (dataSkill.meta.AddEquipSlot) {
            this.refresh();
        }
    }
};

/**
 * ●スキルを忘れる
 */
const _Game_Actor_forgetSkill = Game_Actor.prototype.forgetSkill;
Game_Actor.prototype.forgetSkill = function(skillId) {
    _Game_Actor_forgetSkill.apply(this, arguments);

    if (skillId) {
        const dataSkill = $dataSkills[skillId];
        // スロット情報が変更された場合はリフレッシュ
        if (dataSkill.meta.AddEquipSlot) {
            this.refresh();
        }
    }
};

//-----------------------------------------------------------------------------
// ページ切替機能（Scene_Equip & Window_EquipSlot）
//-----------------------------------------------------------------------------

if (pPagingEquipmentType) {
    // ページ切替する装備タイプを配列化
    const mPagingEquipmentTypes = pPagingEquipmentType.split(",");

    /**
     * ●装備選択
     */
    const _Scene_Equip_commandEquip = Scene_Equip.prototype.commandEquip;
    Scene_Equip.prototype.commandEquip = function() {
        _Scene_Equip_commandEquip.apply(this, arguments);

        // ページの先頭を選択
        const topIndex = this._slotWindow.topIndex();
        this._slotWindow.select(topIndex);
    };

    /**
     * ●初期化
     */
    const _Window_EquipSlot_initialize = Window_EquipSlot.prototype.initialize;
    Window_EquipSlot.prototype.initialize = function(rect) {
        _Window_EquipSlot_initialize.apply(this, arguments);

        // 現在のページを設定
        this._pageNo = 0;
    };

    /**
     * 【独自】最大ページ番号（0始まり）
     */
    Window_EquipSlot.prototype.maxPageNo = function() {
        let maxPageNo = 0;

        // ２ページ目以降の存在をチェック
        for (let i = 0; i < mPagingEquipmentTypes.length; i++) {
            if (this.pageItemsCount(i + 1) > 0) {
                maxPageNo++;
            }
        }

        return maxPageNo;
    };

    /**
     * ●上キー
     */
    const _Window_EquipSlot_cursorUp = Window_EquipSlot.prototype.cursorUp;
    Window_EquipSlot.prototype.cursorUp = function(wrap) {
        // 移動先が現在のページの最小要素を下回っていた場合
        if (this._index - 1 < this.pageTopIndex()) {
            // 連続移動でない場合は末尾に移動
            if (wrap) {
                this.select(this.pageLastIndex());
            }
            // 連続移動の場合は停止
            return;
        }
        _Window_EquipSlot_cursorUp.apply(this, arguments);
    };

    /**
     * ●下キー
     */
    const _Window_EquipSlot_cursorDown = Window_EquipSlot.prototype.cursorDown;
    Window_EquipSlot.prototype.cursorDown = function(wrap) {
        // 移動先が現在のページの最大要素を超えていた場合
        if (this._index + 1 > this.pageLastIndex()) {
            // 連続移動でない場合は先頭に移動
            if (wrap) {
                this.select(this.pageTopIndex());
            }
            // 連続移動の場合は停止
            return;
        }
        _Window_EquipSlot_cursorDown.apply(this, arguments);
    };

    /**
     * ●右キー
     */
    Window_EquipSlot.prototype.cursorRight = function(wrap) {
        // ページ切替前に表示上の位置を取得
        const posIndex = this.posIndex();
        // 次のページへ
        this._pageNo++;
        // 最大ページを超えたら0ページへループ
        if (this._pageNo > this.maxPageNo()) {
            this._pageNo = 0;
        }
        // 現在値を更新
        let index = posIndex + this.topIndex();
        // カーソルが領域外になった場合は調整
        if (posIndex >= this.maxVisibleItems()) {
            index = this.topIndex() + this.maxVisibleItems() - 1;
        }
        this.select(index);
        // 再描画
        this.paint();
    };

    /**
     * ●左キー
     */
    Window_EquipSlot.prototype.cursorLeft = function(wrap) {
        // ページ切替前に表示上の位置を取得
        const posIndex = this.posIndex();
        // 前のページヘ
        this._pageNo--;
        // マイナスになったら最大ページループ
        if (this._pageNo < 0) {
            this._pageNo = this.maxPageNo();
        }
        // 現在値を更新
        let index = posIndex + this.topIndex();
        // カーソルが領域外になった場合は調整
        if (posIndex >= this.maxVisibleItems()) {
            index = this.topIndex() + this.maxVisibleItems() - 1;
        }
        this.select(index);
        // 再描画
        this.paint();
    };

    /**
     * 【独自】画面上のインデックス
     */
    Window_EquipSlot.prototype.posIndex = function() {
        return this.index() - this.topIndex();
    };

    /**
     * 【上書】先頭のインデックス
     */
    Window_EquipSlot.prototype.topIndex = function() {
        if (!this._actor || this._pageNo == 0) {
            return 0;
        }
        //-----------------------------------------------
        // ページ数を元に先頭のインデックスを求める。
        //-----------------------------------------------
        let index = 0;
        // 各ページ毎の項目数を加算
        for (let p = 0; p < this._pageNo; p++) {
            index += this.pageItemsCount(p);
        }
        return index;
    };

    /**
     * 【独自】ページ先頭要素のインデックス
     * ※topIndexと分ける必要があったかは謎……。
     */
    Window_EquipSlot.prototype.pageTopIndex = function() {
        return this.topIndex();
    };

    /**
     * 【独自】ページ末尾要素のインデックス
     */
    Window_EquipSlot.prototype.pageLastIndex = function() {
        return this.topIndex() + this.maxPageAllRows() - 1;
    };

    /**
     * 【上書】スクロール計算用の縦幅
     */
    Window_EquipSlot.prototype.overallHeight = function() {
        // ページ毎の行数で計算
        return this.maxPageAllRows() * this.itemHeight();
    };

    /**
     * ●選択
     */
    const _Window_EquipSlot_select = Window_EquipSlot.prototype.select;
    Window_EquipSlot.prototype.select = function(index) {
        // 現在のページの最大要素を超えていた場合は末尾に移動
        if (index > this.pageLastIndex()) {
            index = this.pageLastIndex();
        }
        _Window_EquipSlot_select.call(this, index);
    };

    /**
     * ●スムース選択
     */
    Window_EquipSlot.prototype.smoothSelect = function(index) {
        this.select(index);
        // ↓相性が悪いようなので注釈化
        // this.ensureCursorVisible(true);
    };

    /**
     * 【上書】装備項目を全描画
     */
    Window_EquipSlot.prototype.drawAllItems = function() {
        const topIndex = this.topIndex();
        for (let i = 0; i < this.maxVisibleItems(); i++) {
            // 実インデックスを取得
            const index = topIndex + i;
            if (index < this.maxItems()) {
                // ＭＺのみの関数
                if (this.drawItemBackground) {
                    this.drawItemBackground(index);
                }
                this.drawItem(index);
            }
        }
    };

    /**
     * 【上書】項目描画範囲を取得
     */
    Window_EquipSlot.prototype.itemRect = function(index) {
        // 表示上の位置
        const posIndex = index - this.topIndex();

        const maxCols = this.maxCols();
        const itemWidth = this.itemWidth();
        const itemHeight = this.itemHeight();
        const colSpacing = this.colSpacing();
        const rowSpacing = this.rowSpacing();
        const col = index % maxCols;
        const row = Math.floor(posIndex / maxCols);
        const x = col * itemWidth + colSpacing / 2 - this.scrollBaseX();

        // スクロール分を加算しない。
        // const y = row * itemHeight + rowSpacing / 2 - this.scrollBaseY();
        const y = row * itemHeight + rowSpacing / 2;

        const width = itemWidth - colSpacing;
        const height = itemHeight - rowSpacing;
        return new Rectangle(x, y, width, height);
    };

    /**
     * 【ＭＶ対応】列のスペース
     */
    if (!Window_EquipSlot.prototype.colSpacing) {
        Window_EquipSlot.prototype.colSpacing = function() {
            return 0;
        };
    }

    /**
     * 【ＭＶ対応】行のスペース
     */
    if (!Window_EquipSlot.prototype.rowSpacing) {
        Window_EquipSlot.prototype.rowSpacing = function() {
            return 0;
        };
    }

    /**
     * 【ＭＶ対応】横スクロールの基本値
     */
    if (!Window_EquipSlot.prototype.scrollBaseX) {
        Window_EquipSlot.prototype.scrollBaseX = function() {
            return 0;
        };
    }

    /**
     * 【ＭＶ対応】横スクロールの基本値描画
     */
    if (!Window_EquipSlot.prototype.paint) {
        Window_EquipSlot.prototype.paint = function() {
            return this.refresh();
        };
    }

    /**
     * 【独自】スクロール分を含めたページ内の全行数
     */
    Window_EquipSlot.prototype.maxPageAllRows = function() {
        if (!this._actor) {
            return 0;
        }

        const topIndex = this.topIndex();
        const slots = this._actor.equipSlots();

        let i = 0;
        for (i = topIndex; i < slots.length; i++) {
            const slotId = slots[i];

            // ページ先頭のスロットＩＤは除外
            if (slotId == slots[topIndex]) {
                continue;

            // 該当のスロットＩＤに対してページ切替を行うかどうか？
            } else if (existPagingEquipmentType(slots, this._pageNo, slotId)) {
                // 切り替えるタイミングでのインデックス（i）を保持
                break;
            }
        }
        return i - topIndex;
    };

    /**
     * 【上書】画面内に表示する項目数
     */
    Window_EquipSlot.prototype.maxVisibleItems = function() {
        return this.maxPageAllRows();

        // ↓スクロール対応用（未実装）
        // ページ内に収まる行数とページ内の全行数の小さいほう
        // return Math.min(this.maxPageRows(), this.maxPageAllRows());
    };

    /**
     * ●該当のスロットＩＤに対してページ切替を行うかどうか？
     */
    function existPagingEquipmentType(slots, pageNo, slotId) {
        const pagingEquipmentTypes = realPagingEquipmentTypes(slots);

        // 現在ページから最終ページまでをチェック
        for (let i = pageNo; i < mPagingEquipmentTypes.length; i++) {
            // ページ切替する装備タイプがあれば、そこでインデックスを返す
            if (pagingEquipmentTypes[i] && pagingEquipmentTypes[i] == slotId) {
                return true;
            }
        }
        return false;
    }

    /**
     * ●ページ切替する装備タイプを取得
     * ※歯抜けになっていた場合を考慮
     */
    function realPagingEquipmentTypes(slots) {
        // 『ページ切替する装備タイプ』のスロットが歯抜けになっていた場合
        // その次のスロットを参照する。
        const pagingEquipmentTypes = [];
        for (const pagingEquipmentType of mPagingEquipmentTypes) {
            // スロットが正常に存在する場合
            if (slots.includes(toNumber(pagingEquipmentType))) {
                // 普通に登録
                pagingEquipmentTypes.push(pagingEquipmentType);
            // 歯抜けの場合
            } else {
                // 次の存在するスロットを取得して登録
                const nextSlot = slots.find(slot => slot > pagingEquipmentType);
                if (nextSlot) {
                    pagingEquipmentTypes.push(nextSlot);
                }
            }
        }
        // 重複除去して返す
        return [...new Set(pagingEquipmentTypes)];
    }

    /**
     * 【独自】指定ページに表示する項目数
     */
    Window_EquipSlot.prototype.pageItemsCount = function(pageNo) {
        if (!this._actor) {
            return 0;
        }

        const slots = this._actor.equipSlots();
        // slotsを各ページに分割
        const pageSlots = [];
        // ページ数分の配列を初期化
        for (let i = 0; i <= mPagingEquipmentTypes.length; i++) {
            pageSlots[i] = [];
        }
        // アクターのスロット毎にループ
        for (const slot of slots) {
            let pushFlg = false;

            for (let i = 0; i < mPagingEquipmentTypes.length; i++) {
                if (slot < mPagingEquipmentTypes[i]) {
                    pageSlots[i].push(slot);
                    pushFlg = true;
                    break;
                }
            }

            // 該当がなかった場合は最後のページへ追加
            if (!pushFlg) {
                pageSlots[mPagingEquipmentTypes.length].push(slot);
            }
        }

        // 空のページは除去
        const filterPageSlots = pageSlots.filter(pageSlot => pageSlot.length > 0);

        // 有効なページなら指定ページの件数を取得
        if (filterPageSlots[pageNo]) {
            return filterPageSlots[pageNo].length;
        }
        return 0;
    };

    /**
     * 【独自】ページが存在するかどうか？
     */
    Window_EquipSlot.prototype.existPage = function() {
        // ページ処理対象外の場合
        if (!this.isUsePage()) {
            return false;
        }
        // 最大ページ数が０の場合
        if (this.maxPageNo() == 0) {
            return false;
        }
        return true;
    }

    /**
     * 【上書】ホイールでページ切替
     */
    Window_EquipSlot.prototype.processWheelScroll = function() {
        if (this.isOpenAndActive() && this.isWheelScrollEnabled() && this.isTouchedInsideFrame()) {
            const threshold = 20;
            if (TouchInput.wheelY >= threshold) {
                this.cursorRight();
            }
            if (TouchInput.wheelY <= -threshold) {
                this.cursorLeft();
            }
        }
    };
}

//-----------------------------------------------------------------------------
// Window_StatusEquip (MZ)
//-----------------------------------------------------------------------------

if (pStatusShowSlots && Utils.RPGMAKER_NAME == "MZ") {
    /**
     * 【上書】１ページ内に表示する項目数
     */
    Window_StatusEquip.prototype.maxVisibleItems = function() {
        const slots = this._actor.equipSlots();
        const filterSlots = slots.filter(slot => pStatusShowSlots.includes(String(slot)));
        return filterSlots.length;
    };

    /**
     * 【上書】全体の項目数
     */
    Window_StatusEquip.prototype.maxItems = function() {
        // 表示する項目数と一致させる。
        return this.maxVisibleItems();
    };
}

})();
