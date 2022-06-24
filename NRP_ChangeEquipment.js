//=============================================================================
// NRP_ChangeEquipment.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.00 Change the actor's equipment at will.
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
 * ◆ChangeEquipment
 * Change the actor's equipment.
 * "EquipType" corresponds to the registered value in the database.
 * (Default: 1:Weapon, 2:Shield, 3:Head, 4:Body, 5:Accessory)
 * 
 * WeaponId/ArmorId only needs to be specified for one of them.
 *
 * Both items can be formulated by changing to text mode.
 * Example: "$gameVariables.value(1)" is the value of variable 1.
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
 * @command ChangeEquipment
 * @desc Change the actor's equipment.
 * Only one WeaponId/ArmorId should be specified.
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
 * @------------------------------------------------------------------
 * @ [Plugin Parameters]
 * @------------------------------------------------------------------
 */

/*:ja
 * @target MZ
 * @plugindesc v1.00 アクターの装備を自由に変更。
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
 * ◆装備の変更
 * アクターの装備を変更します。
 * 装備タイプはデータベースの登録値に対応します。
 * （デフォルト：1:武器, 2:盾, 3:頭, 4:身体, 5:装飾品）
 * 
 * 武器／防具は片方だけ指定すればＯＫです。
 *
 * いずれの項目もテキストモードに変更すれば、数式可です。
 * 例：『$gameVariables.value(1)』で変数１の値。
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
 * @command ChangeEquipment
 * @text 装備を変更
 * @desc アクターの装備を変更します。
 * 武器／防具は片方だけ指定してください。
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
 * ●装備の変更
 */
PluginManager.registerCommand(PLUGIN_NAME, "ChangeEquipment", function(args) {
    const actorId = eval(args.ActorId);
    const equipType = eval(args.EquipType);
    const weaponId = eval(args.WeaponId);
    const armorId = eval(args.ArmorId);
    // 武器と防具の有効なほうを取得
    const id = weaponId || armorId;
    // 変更実行
    $gameActors.actor(actorId).changeEquipById(equipType, id)
});

})();
