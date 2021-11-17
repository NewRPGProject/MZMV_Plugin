//=============================================================================
// NRP_WeaponSetting.js
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc v1.00 Adjusts the display of weapons.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/484348477.html
 *
 * @help Adjust the display of weapons in side-view battle.
 * 
 * ◆Features
 * - Adjust the display position of weapons.
 * 　※Can be adapted to battlers of different sizes from the standard.
 * - Adjust the position of each actors.
 * - Change the size of the weapon per pattern.
 * - Support for weapon images after the 31th.
 * 　※By default, only the 6th of Weapons3.png (=30th) can be selected.
 * - Changed the color tone of the weapon.
 * 
 * ------------------------------------------
 * [Note of Actors]
 * ------------------------------------------
 * <WeaponX:?>
 * Adjusts the X coordinate of the weapon. Formulae allowed.
 * If the value is negative, it moves left.
 * 
 * <WeaponY:?>
 * Adjusts the Y coordinate of the weapon. Formulae allowed.
 * If the value is negative, it moves up.
 * 
 * ------------------------------------------
 * [Note of Weapons]
 * ------------------------------------------
 * <BlendColor:[255,255,255,255]>
 * Changes the color tone of the weapon.
 * 0~255 are valid values.
 * Set in the order of Red, Green, Blue, Strength.
 * 
 * ------------------------------------------
 * [Terms]
 * ------------------------------------------
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but we will respond to defects as far as possible.
 * 
 * @param WeaponX
 * @type number
 * @min -999 @max 999
 * @default -16
 * @desc Adjusts the X coordinate of the weapon.
 * Default value is -16.
 * 
 * @param WeaponY
 * @min -999 @max 999
 * @type number
 * @default 0
 * @desc Adjusts the Y coordinate of the weapon.
 * Default value is 0.
 * 
 * @param WeaponWidth
 * @type number
 * @desc Adjusts the width of the weapon (one pattern).
 * Default value is 96.
 * 
 * @param WeaponHeight
 * @type number
 * @desc Adjusts the height of the weapon (one pattern).
 * Default value is 64.
 * 
 * @param SupportOver30Image
 * @type boolean
 * @default true
 * @desc For example, if the weapon type is the 31st, the 31st image will be selected. No image should be set.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 武器の表示を調整します。
 * @author 砂川赳 (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/484348477.html
 *
 * @help サイドビュー戦闘における武器の表示を調整します。
 * 
 * ◆機能
 * ・武器の表示位置を調整。
 * 　※標準とはサイズの異なるバトラーにも適応できます。
 * ・アクター毎の位置調整も可能。
 * ・武器の１パターン当たりのサイズを変更可。
 * ・３１番目以降の武器画像に対応。
 * 　※デフォルトではWeapons3.pngの６番目（＝３０番目）までしか選択不可。
 * ・武器の色調を変更。
 * 
 * ------------------------------------------
 * ■アクターのメモ欄
 * ------------------------------------------
 * <WeaponX:?>
 * 武器のＸ座標を調整します。数式可。
 * マイナスで左に移動します。
 * 
 * <WeaponY:?>
 * 武器のＹ座標を調整します。数式可。
 * マイナスで上に移動します。
 * 
 * ------------------------------------------
 * ■武器のメモ欄
 * ------------------------------------------
 * <BlendColor:[255,255,255,255]>
 * 武器の色調を変更します。0~255までの数値が有効です。
 * 赤、緑、青、強さの順で設定してください。
 * 
 * ------------------------------------------
 * ■利用規約
 * ------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param WeaponX
 * @text 武器のＸ座標
 * @type number
 * @min -999 @max 999
 * @default -16
 * @desc 武器のＸ座標を調整します。
 * 初期値は-16です。
 * 
 * @param WeaponY
 * @text 武器のＹ座標
 * @min -999 @max 999
 * @type number
 * @default 0
 * @desc 武器のＹ座標を調整します。
 * 初期値は0です。
 * 
 * @param WeaponWidth
 * @text 武器の横幅
 * @type number
 * @desc 武器（１パターン）の横幅を調整します。
 * 初期値は96です。
 * 
 * @param WeaponHeight
 * @text 武器の縦幅
 * @type number
 * @desc 武器（１パターン）の縦幅を調整します。
 * 初期値は64です。
 * 
 * @param SupportOver30Image
 * @text ３１以降の画像に対応
 * @type boolean
 * @default true
 * @desc 例えば、武器タイプが３１番目の場合、自動で３１番目の画像が選択されます。画像はなしにしてください。
 */

(function() {
"use strict";

function toBoolean(str) {
    if (str == true) {
        return true;
    }
    return (str == "true") ? true : false;
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

const parameters = PluginManager.parameters("NRP_WeaponSetting");
const pWeaponX = toNumber(parameters["WeaponX"], 0);
const pWeaponY = toNumber(parameters["WeaponY"], 0);
const pWeaponWidth = toNumber(parameters["WeaponWidth"]);
const pWeaponHeight = toNumber(parameters["WeaponHeight"]);
const pSupportOver30Image = toBoolean(parameters["SupportOver30Image"]);

if (pWeaponWidth || pWeaponHeight) {
    /**
     * 【上書】フレーム更新
     */
    Sprite_Weapon.prototype.updateFrame = function() {
        if (this._weaponImageId > 0) {
            const index = (this._weaponImageId - 1) % 12;
            const w = pWeaponWidth ? pWeaponWidth : 96;
            const h = pWeaponHeight ? pWeaponHeight : 64;
            const sx = (Math.floor(index / 6) * 3 + this._pattern) * w;
            const sy = Math.floor(index % 6) * h;
            this.setFrame(sx, sy, w, h);
        } else {
            this.setFrame(0, 0, 0, 0);
        }
    };
}

/**
 * ●武器の設定
 */
const _Sprite_Weapon_setup = Sprite_Weapon.prototype.setup;
Sprite_Weapon.prototype.setup = function(weaponImageId) {
    _Sprite_Weapon_setup.apply(this, arguments);

    this.x = pWeaponX;
    this.y = pWeaponY;

    // 武器の持ち主を取得
    const battler = this.parent._battler;
    if (battler) {
        const adjustX = battler.actor().meta.WeaponX;
        const adjustY = battler.actor().meta.WeaponY;
        if (adjustX) {
            this.x += eval(adjustX);
        }
        if (adjustY) {
            this.y -= eval(adjustY);
        }
    }

    let dataWeapon;

    // 武器ＩＤを取得できる場合
    // ※通常は存在しない項目（DynamicMotionで設定）
    if (this._weaponId) {
        // 武器データを取得
        dataWeapon = $dataWeapons[this._weaponId];

    // 通常時
    } else {
        // アクターから武器データを取得
        dataWeapon = $dataWeapons[battler.weapons()[0].id];
    }

    // 色指定があれば設定
    const blendColor = dataWeapon.meta.BlendColor;
    if (blendColor) {
        this.setBlendColor(eval(blendColor));
    }
};

if (pSupportOver30Image) {
    /**
     * ●武器アニメーションの開始
     */
    const _Game_Battler_startWeaponAnimation = Game_Battler.prototype.startWeaponAnimation;
    Game_Battler.prototype.startWeaponAnimation = function(weaponImageId) {
        if (!weaponImageId) {
            const weapons = this.weapons();
            const wtypeId = weapons[0] ? weapons[0].wtypeId : 0;
            // 武器タイプが３１以上の場合、自動的に画像を設定
            if (wtypeId >= 31) {
                this._weaponImageId = wtypeId
                return;
            }
        }

        _Game_Battler_startWeaponAnimation.apply(this, arguments);
    };
}

})();
