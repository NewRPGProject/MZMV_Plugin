//=============================================================================
// NRP_ChangeEquipment.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.02 Change the actor's equipment at will.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/489100727.html
 *
 * @help Change the actor's equipment at will.
 * 
 * The normal event command "Change Equipment" can only select equipment
 * that the actor himself or his initial class is capable of.
 * 
 * In other words, if an actor changes classes in the middle of the game,
 * or if the equipment is extended by some plugin,
 * you will not be able to select a valid equipment.
 * 
 * With this plugin, you can change equipment without those restrictions.
 * 
 * -------------------------------------------------------------------
 * [Plugin Commands MZ]
 * -------------------------------------------------------------------
 * ◆ChangeEquipmentAuto
 * Change the actor's equipment.
 * WeaponId/ArmorId/ItemId only needs to be specified for one of them.
 * 
 * The slot to equip is automatically obtained from the item data.
 * If there are multiple identical equipment types, such as Dual Wield,
 * the equipment location can be selected by the OrderNo.
 *
 * Both items can be formulated by changing to text mode.
 * Example: "$gameVariables.value(1)" is the value of variable 1.
 * 
 * ◆ChangeEquipment(Old)
 * The equipment type must be specified here.
 * ※"EquipType" corresponds to the registered value in the database.
 * (Default: 1:Weapon, 2:Shield, 3:Head, 4:Body, 5:Accessory)
 * 
 * If the equipment slot has been changed by an external plugin,
 * it is not recommended because there is a problem
 * that the equipment cannot be changed properly.
 * 
 * -------------------------------------------------------------------
 * [Notice]
 * -------------------------------------------------------------------
 * As with regular "Change Equipment",
 * you cannot equip items that are not owned by the player.
 * Do not forget to "Change Weapons/Armors" first if necessary.
 * 
 * Also, actors cannot be forced to equip items
 * that they are currently unable to equip.
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
 * @ [Plugin Commands]
 * @------------------------------------------------------------------
 * 
 * @command ChangeEquipmentAuto
 * @desc Change the actor's equipment.
 * Only one WeaponId/ArmorId/ItemId should be specified.
 * 
 * @arg ActorId
 * @type actor
 * @desc Actor to change equipment.
 * 
 * @arg WeaponId
 * @type weapon
 * @desc Weapon to be equipped.
 * 
 * @arg ArmorId
 * @type armor
 * @desc Armor to be equipped.
 * 
 * @arg ItemId
 * @type item
 * @desc Item to be equipped.
 * Use with a plugin that can equip items.
 * 
 * @arg OrderNo
 * @type number
 * @min 1
 * @desc The order in which the same equip types are present.
 * For example, specify 2 for the lower side of Dual Wield.
 * 
 * @------------------------------------------------------------------
 * 
 * @command ChangeEquipment
 * @text ChangeEquipment(Old)
 * @desc Change the actor's equipment.
 * Only one WeaponId/ArmorId/ItemId should be specified.
 * 
 * @arg ActorId
 * @type actor
 * @desc Actor to change equipment.
 * 
 * @arg EquipType
 * @type number
 * @min 1
 * @desc Equipment Type. Below are the default values for DB.
 * (1:Weapon, 2:Shield, 3:Head, 4:Body, 5:Accessory)
 * 
 * @arg WeaponId
 * @type weapon
 * @desc Weapon to be equipped.
 * 
 * @arg ArmorId
 * @type armor
 * @desc Armor to be equipped.
 * 
 * @arg ItemId
 * @type item
 * @desc Item to be equipped.
 * Use with a plugin that can equip items.
 * 
 * @------------------------------------------------------------------
 * @ [Plugin Parameters]
 * @------------------------------------------------------------------
 */

/*:ja
 * @target MZ
 * @plugindesc v1.02 アクターの装備を自由に変更。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/489100727.html
 *
 * @help アクターの装備を自由に変更します。
 * 
 * 通常のイベントコマンドの『装備の変更』は、
 * アクター自身および初期職業が可能な装備しか選択できません。
 * 
 * つまり、途中でアクターが転職した場合や、
 * 何らかのプラグインによって装備が拡張された場合は、
 * 有効な装備が選択できなくなってしまいます。
 * 
 * このプラグインを使えば、それらの制約を受けずに装備を変更できます。
 * 
 * -------------------------------------------------------------------
 * ■プラグインコマンド（ＭＺ）
 * -------------------------------------------------------------------
 * ◆装備の変更（自動）
 * アクターの装備を変更します。
 * 武器／防具／アイテムは一つだけ指定すればＯＫです。
 * 
 * 装備するスロットはアイテム情報から自動的に取得します。
 * 二刀流など同一の装備タイプが複数存在する場合は、
 * 順序番号で装備箇所を選択できます。
 *
 * いずれの項目もテキストモードに変更すれば、数式可です。
 * 例：『$gameVariables.value(1)』で変数１の値。
 * 
 * ◆装備の変更（旧）
 * こちらは装備タイプの指定が必須です。
 * ※装備タイプはデータベースの登録値に対応します。
 * （デフォルト：1:武器, 2:盾, 3:頭, 4:身体, 5:装飾品）
 * 
 * 外部プラグインで装備スロットが変更されていた場合、
 * うまく装備変更できない問題があるため推奨しません。
 * 
 * -------------------------------------------------------------------
 * ■注意点
 * -------------------------------------------------------------------
 * 通常の装備の変更と同じく、所有していないものは装備できません。
 * 必要なら先に武器、防具の増減を忘れないようにしてください。
 * 
 * また、現在装備できないものを無理やり装備することはできません。
 * 
 * -------------------------------------------------------------------
 * ■利用規約
 * -------------------------------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @------------------------------------------------------------------
 * @ プラグインコマンド
 * @------------------------------------------------------------------
 * 
 * @command ChangeEquipmentAuto
 * @text 装備を変更（自動）
 * @desc アクターの装備を変更します。
 * 武器／防具／アイテムは一つだけ指定してください。
 * 
 * @arg ActorId
 * @text アクター
 * @type actor
 * @desc 装備を変更するアクターです。
 * 
 * @arg WeaponId
 * @text 武器
 * @type weapon
 * @desc 装備する武器です。
 * 
 * @arg ArmorId
 * @text 防具
 * @type armor
 * @desc 装備する防具です。
 * 
 * @arg ItemId
 * @text アイテム
 * @type item
 * @desc 装備するアイテムです。
 * アイテムを装備できるプラグインと併用してください。
 * 
 * @arg OrderNo
 * @text 順序番号
 * @type number
 * @min 1
 * @desc 同一の装備タイプが複数存在する場合の順番です。
 * 例えば、二刀流の下側ならば2を指定してください。
 * 
 * @------------------------------------------------------------------
 * 
 * @command ChangeEquipment
 * @text 装備を変更（旧）
 * @desc アクターの装備を変更します。
 * 武器／防具／アイテムは一つだけ指定してください。
 * 
 * @arg ActorId
 * @text アクター
 * @type actor
 * @desc 装備を変更するアクターです。
 * 
 * @arg EquipType
 * @text 装備タイプ
 * @type number
 * @min 1
 * @desc 装備タイプです。以下はＤＢのデフォルト値です。
 * 1:武器, 2:盾, 3:頭, 4:身体, 5:装飾品
 * 
 * @arg WeaponId
 * @text 武器
 * @type weapon
 * @desc 装備する武器です。
 * 
 * @arg ArmorId
 * @text 防具
 * @type armor
 * @desc 装備する防具です。
 * 
 * @arg ItemId
 * @text アイテム
 * @type item
 * @desc 装備するアイテムです。
 * アイテムを装備できるプラグインと併用してください。
 * 
 * @------------------------------------------------------------------
 * @ プラグインパラメータ
 * @------------------------------------------------------------------
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

const PLUGIN_NAME = "NRP_ChangeEquipment";
const parameters = PluginManager.parameters(PLUGIN_NAME);

//-----------------------------------------------------------------------------
// ＭＺ用プラグインコマンド
//-----------------------------------------------------------------------------

// MVには存在しないため、空で定義しておかないとエラーになる。
if (!PluginManager.registerCommand) {
    PluginManager.registerCommand = function() {}
}

/**
 * ●装備の変更（自動）
 */
PluginManager.registerCommand(PLUGIN_NAME, "ChangeEquipmentAuto", function(args) {
    const actorId = eval(args.ActorId);
    const weaponId = eval(args.WeaponId);
    const armorId = eval(args.ArmorId);
    const itemId = eval(args.ItemId);
    const orderNo = eval(setDefault(args.OrderNo, 1));
    const actor = $gameActors.actor(actorId);

    // 武器／防具／アイテムの有効なものを取得
    let dataItem;
    // 武器
    if (weaponId) {
        dataItem = $dataWeapons[weaponId];
    // 防具
    } else if (armorId) {
        dataItem = $dataArmors[armorId];
    // アイテム
    } else if (itemId) {
        dataItem = $dataItems[itemId];
    }

    // 一旦、Game_Itemに変換して再取得
    // ※NRP_EquipItemとの連携によってetypeIdを取得するため。
    const item = new Game_Item(dataItem);
    dataItem = item.object();
    const equipType = dataItem.etypeId;

    // アクターのスロット配列
    const slots = actor.equipSlots();

    let slotId = null;
    // 装備タイプからスロットＩＤを求める。
    for (let i = 0; i < slots.length; i++) {
        if (equipType == slots[i]) {
            // 順序番号の指定がある場合
            if (orderNo >= 2) {
                slotId = i + (orderNo - 1);
                // スロットが存在した場合は確定
                if (slots[slotId] == equipType) {
                    break;
                }
                // スロットが存在しないので処理終了
                return;
            }
            slotId = i;
            break;
        }
    }

    // 武器
    if (weaponId) {
        actor.changeEquip(slotId, dataItem);
    // 防具
    } else if (armorId) {
        actor.changeEquip(slotId, dataItem);
    // アイテム
    } else if (itemId) {
        // 通常は装備できないので強制
        if (actor.tradeItemWithParty(dataItem, actor.equips()[slotId])) {
            actor.forceChangeEquip(slotId, dataItem);
        }
    }
});

/**
 * ●装備の変更
 */
PluginManager.registerCommand(PLUGIN_NAME, "ChangeEquipment", function(args) {
    const actorId = eval(args.ActorId);
    const equipType = eval(args.EquipType);
    const weaponId = eval(args.WeaponId);
    const armorId = eval(args.ArmorId);
    const itemId = eval(args.ItemId);
    const actor = $gameActors.actor(actorId);

    // 武器／防具／アイテムの有効なものを取得
    const slotId = equipType - 1;
    // 武器
    if (weaponId) {
        const dataItem = $dataWeapons[weaponId];
        actor.changeEquip(slotId, dataItem);
    // 防具
    } else if (armorId) {
        const dataItem = $dataArmors[armorId];
        actor.changeEquip(slotId, dataItem);
    // アイテム
    } else if (itemId) {
        const dataItem = $dataItems[itemId];
        // 通常は装備できないので強制
        if (actor.tradeItemWithParty(dataItem, actor.equips()[slotId])) {
            actor.forceChangeEquip(slotId, dataItem);
        }
    }
});

})();
