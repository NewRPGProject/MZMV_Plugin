//=============================================================================
// NRP_EquipSlot.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Change the equipment slots at will.
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
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 装備スロットを自由に変更。
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
 */

(function() {
"use strict";

/**
 * ●構造体をJSで扱えるように変換
 */
function parseStruct1(arg) {
    var ret = [];

    JSON.parse(arg).forEach(function(str) {
        ret.push(str);
    });

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
                // ※ただし、設定済の場合は除顔
                if (!initSet && initEtype == slotEType) {
                    // 初期装備を設定
                    this._equips[i].setEquip(slotEType === 1, initEquipId);
                    // 設定済のフラグを立てる。
                    initEquipMap.set = true;
                    break;
                }
            }
        }

        // 無効な装備を外す。
        this.releaseUnequippableItems(true);
        // リフレッシュ
        this.refresh();
    };
}

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

    // メモ欄を参照するオブジェクト
    // 特徴系＋スキル
    const objects = this.traitObjects().concat(this.skills());
    for (const object of objects) {
        const addEquipSlot = object.meta.AddEquipSlot;
        // タグが存在する場合
        if (addEquipSlot) {
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
    }
    // スロットを数値順でソート
    slots.sort((a, b) => a - b);

    // nullのスロットは他の処理でエラーになるため初期化
    for (let i = 0; i < slots.length; i++) {
        if (this._equips[i] == null) {
            this._equips[i] = new Game_Item();
        }
    }

    return slots;
};

})();
