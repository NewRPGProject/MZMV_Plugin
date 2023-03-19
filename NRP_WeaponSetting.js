//=============================================================================
// NRP_WeaponSetting.js
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc v2.00 Extends the weapon display.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @orderBefore NRP_DynamicMotionMZ
 * @url http://newrpg.seesaa.net/article/484348477.html
 *
 * @help Extends the display of weapons in side-view battle.
 * 
 * ◆Features
 * - Adjust the display position of weapons.
 * 　※Can be adapted to battlers of different sizes from the standard.
 * - Adjust the position of each actors.
 * - Change the size of the weapon per pattern.
 * - Support for weapon images after the 31th.
 * 　※By default, only the 6th of Weapons3.png (=30th) can be selected.
 * - Changed the color tone of the weapon.
 * - Unique images can be set for each weapon type.
 * - Combined with DynamicMotion,
 *   the same weapon can be swung and thrust.
 * 
 * -------------------------------------------------------------------
 * [For DynamicMotion]
 * -------------------------------------------------------------------
 * Although it takes some effort, when combined with DynamicMotion,
 * complex movements such as swinging and thrusting
 * with the same weapon are possible.
 * 
 * First, modify system/WeaponsX.png to create multiple weapon actions
 * such as "swing" and "thrust" in one image.
 * 
 * Next, register the created image
 * in the "WeaponInfoList" of the Plugin Parameters.
 * The motions that can be set here
 * are the standard ones used for normal attacks.
 * 
 * In addition, define motions for each index in "IndexList.
 * This allows the motion to be called on the DynamicMotion side.
 * 
 * <D-Motion:attack>
 * weaponIndex = 2
 * </D-Motion>
 * 
 * For example, the above description
 * will play the second animation in WeaponsX.png.
 * In addition, it will execute the motion defined above.
 * 
 * You can also specify an image directly on the DynamicMotion side.
 * The following is an example of specifying Weapons2.png.
 * 
 * <D-Motion:attack>
 * weaponImage = Weapons2
 * weaponIndex = 2
 * </D-Motion>
 * 
 * Motion can be specified other than the usual
 * "swing", "thrust", and "missile" motions.
 * For example, you can use the "item" motion
 * to raise a sword above the ground.
 * 
 * -------------------------------------------------------------------
 * [Note of Actors]
 * -------------------------------------------------------------------
 * <WeaponX:?>
 * Adjusts the X coordinate of the weapon. Formulae allowed.
 * If the value is negative, it moves left.
 * 
 * <WeaponY:?>
 * Adjusts the Y coordinate of the weapon. Formulae allowed.
 * If the value is negative, it moves up.
 * 
 * -------------------------------------------------------------------
 * [Note of Weapons]
 * -------------------------------------------------------------------
 * <BlendColor:[255,255,255,255]>
 * Changes the color tone of the weapon.
 * 0~255 are valid values.
 * Set in the order of Red, Green, Blue, Strength.
 * 
 * <WeaponImage:Weapons5>
 * Set Weapons5.png as the weapon image.
 * ※As with normal weapon images, the system folder is the target.
 * 
 * <WeaponIndex:2>
 * The second image among those specified
 * in WeaponImage is set as the weapon image.
 * If omitted, the first image will be used.
 * 
 * <AttackMotion:swing>
 * "swing" the motion when attacking.
 * Refer to the following for the type of motion.
 * 
 * - thrust
 * - swing
 * - missile
 * - walk
 * - wait
 * - chant
 * - guard
 * - damage
 * - evade
 * - skill
 * - spell
 * - item
 * - escape
 * - victory
 * - dying
 * - abnormal
 * - sleep
 * - dead
 * 
 * ※For more information, please refer to
 *   "Documentation > Side-View Character Standards"
 *   in the help section of Maker.
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
 * @-----------------------------------------------------
 * @ Plugin Parameters
 * @-----------------------------------------------------
 * 
 * @param WeaponInfoList
 * @type struct<WeaponInfo>[]
 * @desc List of settings for each weapon type.
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
 * @type string
 * @desc Adjusts the width of the weapon (one pattern).
 * Default value is 96. Formulas available.
 * 
 * @param WeaponHeight
 * @type string
 * @desc Adjusts the height of the weapon (one pattern).
 * Default value is 64. Formulas available.
 * 
 * @param SupportOver30Image
 * @type boolean
 * @default true
 * @desc For example, if the weapon type is the 31st, the 31st image will be selected. No image should be set.
 * 
 * @param SyncActorMotion
 * @type boolean
 * @default true
 * @desc Synchronize the weapon with the actor's motion as much as possible.
 */
//-------------------------------------------------------------
// WeaponInfo
//-------------------------------------------------------------
/*~struct~WeaponInfo:
 * @param WeaponType
 * @type number
 * @desc Weapon type to be set.
 * By default, 1:Dagger, 2:Sword, 3:Flail...
 * 
 * @param WeaponImage
 * @type file
 * @dir img/system
 * @desc Image file corresponding to the weapon type.
 * 
 * @param WeaponIndex
 * @type number @min 1
 * @default 1
 * @desc Index of images (1~12).
 * 
 * @param Motion
 * @type select
 * @option thrust
 * @option swing
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc The standard motion used for weapon attacks.
 * 
 * @param IndexList
 * @type struct<IndexDetail>[]
 * @desc Motion can be defined for each image index.
 */
//-------------------------------------------------------------
// IndexDetail
//-------------------------------------------------------------
/*~struct~IndexDetail:
 * @param WeaponIndex
 * @type number @min 1
 * @desc Index of image (1~12).
 * 
 * @param Motion
 * @type select
 * @option thrust
 * @option swing
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc This motion corresponds to the index.
 * 
 * @param AdjustX
 * @type number
 * @min -999 @max 999
 * @desc Further adjust the X coordinate of the weapon.
 * 
 * @param AdjustY
 * @min -999 @max 999
 * @type number
 * @desc Further adjust the Y coordinate of the weapon.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v2.00 武器の表示を拡張します。
 * @author 砂川赳 (http://newrpg.seesaa.net/)
 * @orderBefore NRP_DynamicMotionMZ
 * @url http://newrpg.seesaa.net/article/484348477.html
 *
 * @help サイドビュー戦闘における武器の表示を拡張します。
 * 
 * ◆機能
 * ・武器の表示位置を調整。
 * 　※標準とはサイズの異なるバトラーにも適応できます。
 * ・アクター毎の位置調整も可能。
 * ・武器の１パターン当たりのサイズを変更可。
 * ・３１番目以降の武器画像に対応。
 * 　※デフォルトではWeapons3.pngの６番目（＝３０番目）までしか選択不可。
 * ・武器の色調を変更。
 * ・武器タイプ毎に独自の画像を設定可能。
 * ・DynamicMotionとの組み合わせにより、
 * 　同じ武器で振ったり突いたりといった動作も可能に。
 * 
 * -------------------------------------------------------------------
 * ■DynamicMotionとの連携
 * -------------------------------------------------------------------
 * いくらか手間はかかりますが、DynamicMotionと組み合わせることにより、
 * 同じ武器で振ったり突いたりといった複雑な動作も可能となります。
 * 
 * まず、system/WeaponsX.pngを改造し、
 * 一つの画像内に『振り』『突き』など複数の武器の動作を作成します。
 * 
 * 次に、プラグインパラメータの『武器情報リスト』に作成した画像を登録します。
 * ここで設定できるモーションは通常攻撃に用いる標準のものです。
 * 
 * さらに『インデックスリスト』にインデックス毎のモーションを定義します。
 * これにより、DynamicMotion側でモーションを呼び出せるようになります。
 * 
 * 例えば、
 * 
 * <D-Motion:attack>
 * weaponIndex = 2
 * </D-Motion>
 * 
 * と、記述した場合、WeaponsX.pngの２つ目のアニメーションを再生し、
 * さらに上で定義したモーションを実行します。
 * 
 * なお、DynamicMotion側で直接画像を指定することもできます。
 * 以下はWeapons2.pngを指定した例です。
 * 
 * <D-Motion:attack>
 * weaponImage = Weapons2
 * weaponIndex = 2
 * </D-Motion>
 * 
 * モーションには通常使用する『振り』『突き』『飛び道具』以外も指定できます。
 * 例えば『アイテム』のモーションを使って、剣を上に掲げるなど、
 * 発想次第で様々な演出が可能です。
 *
 * -------------------------------------------------------------------
 * ■アクターのメモ欄
 * -------------------------------------------------------------------
 * <WeaponX:?>
 * 武器のＸ座標を調整します。数式可。
 * マイナスで左に移動します。
 * 
 * <WeaponY:?>
 * 武器のＹ座標を調整します。数式可。
 * マイナスで上に移動します。
 * 
 * -------------------------------------------------------------------
 * ■武器のメモ欄
 * -------------------------------------------------------------------
 * <BlendColor:[255,255,255,255]>
 * 武器の色調を変更します。0~255までの数値が有効です。
 * 赤、緑、青、強さの順で設定してください。
 * 
 * <WeaponImage:Weapons5>
 * Weapons5.pngを武器画像として設定します。
 * ※通常の武器画像と同じく、systemフォルダが対象です。
 * 
 * <WeaponIndex:2>
 * WeaponImageで指定した中で、２番目の画像を武器画像として設定します。
 * 省略した場合は１番目の画像となります。
 * 
 * <AttackMotion:swing>
 * 攻撃時のモーションを『振り』にします。
 * モーションの種類は以下を参考にしてください。
 * 
 * ・突き：thrust
 * ・振り：swing
 * ・飛び道具：missile
 * ・前進：walk
 * ・通常待機：wait
 * ・詠唱待機：chant
 * ・防御：guard
 * ・ダメージ：damage
 * ・回避：evade
 * ・汎用スキル：skill
 * ・魔法：spell
 * ・アイテム：item
 * ・逃げる：escape
 * ・勝利：victory
 * ・瀕死：dying
 * ・状態異常：abnormal
 * ・睡眠：sleep
 * ・戦闘不能：dead
 * 
 * ※詳細はツクールのヘルプにある「資料集＞サイドビューキャラ規格」を
 * 　ご覧ください。
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
 * @param WeaponInfoList
 * @text 武器情報リスト
 * @type struct<WeaponInfo>[]
 * @desc 武器タイプ毎の設定一覧です。
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
 * @type string
 * @desc 武器（１パターン）の横幅を調整します。
 * 初期値は96です。数式化。
 * 
 * @param WeaponHeight
 * @text 武器の縦幅
 * @type string
 * @desc 武器（１パターン）の縦幅を調整します。
 * 初期値は64です。数式化。
 * 
 * @param SupportOver30Image
 * @text ３１以降の画像に対応
 * @type boolean
 * @default true
 * @desc 例えば、武器タイプが３１番目の場合、自動で３１番目の画像が選択されます。画像はなしにしてください。
 * 
 * @param SyncActorMotion
 * @text アクターモーションに同期
 * @type boolean
 * @default true
 * @desc アクターのモーションに武器をなるべく同期させます。
 */
//-------------------------------------------------------------
// WeaponInfo
//-------------------------------------------------------------
/*~struct~WeaponInfo:ja
 * @param WeaponType
 * @text 武器タイプ
 * @type number
 * @desc 設定を行う武器タイプです。
 * 標準では1:短剣, 2:剣, 3:フレイル...
 * 
 * @param WeaponImage
 * @text 画像ファイル
 * @type file
 * @dir img/system
 * @desc 武器タイプに対応する画像ファイルです。
 * 
 * @param WeaponIndex
 * @text 画像インデックス
 * @type number @min 1
 * @default 1
 * @desc 画像のインデックス（1~12）です。
 * 
 * @param Motion
 * @text モーション
 * @type select
 * @option 突き（thrust） @value thrust
 * @option 振り（swing） @value swing
 * @option 飛び道具（missile） @value missile
 * @option 前進（walk） @value walk
 * @option 通常待機（wait） @value wait
 * @option 詠唱待機（chant） @value chant
 * @option 防御（guard） @value guard
 * @option ダメージ（damage） @value damage
 * @option 回避（evade） @value evade
 * @option 汎用スキル（skill） @value skill
 * @option 魔法（spell） @value spell
 * @option アイテム（item） @value item
 * @option 逃げる（escape） @value escape
 * @option 勝利（victory） @value victory
 * @option 瀕死（dying） @value dying
 * @option 状態異常（abnormal） @value abnormal
 * @option 睡眠（sleep） @value sleep
 * @option 戦闘不能（dead） @value dead
 * @desc 武器攻撃に用いる標準のモーションです。
 * 
 * @param IndexList
 * @text インデックスリスト
 * @type struct<IndexDetail>[]
 * @desc 画像インデックス毎のモーションを定義できます。
 */
//-------------------------------------------------------------
// IndexDetail
//-------------------------------------------------------------
/*~struct~IndexDetail:ja
 * @param WeaponIndex
 * @text 画像インデックス
 * @type number @min 1
 * @desc 画像のインデックス（1~12）です。
 * 
 * @param Motion
 * @text モーション
 * @type select
 * @option 突き（thrust） @value thrust
 * @option 振り（swing） @value swing
 * @option 飛び道具（missile） @value missile
 * @option 前進（walk） @value walk
 * @option 通常待機（wait） @value wait
 * @option 詠唱待機（chant） @value chant
 * @option 防御（guard） @value guard
 * @option ダメージ（damage） @value damage
 * @option 回避（evade） @value evade
 * @option 汎用スキル（skill） @value skill
 * @option 魔法（spell） @value spell
 * @option アイテム（item） @value item
 * @option 逃げる（escape） @value escape
 * @option 勝利（victory） @value victory
 * @option 瀕死（dying） @value dying
 * @option 状態異常（abnormal） @value abnormal
 * @option 睡眠（sleep） @value sleep
 * @option 戦闘不能（dead） @value dead
 * @desc インデックスに対応するモーションです。
 * 
 * @param AdjustX
 * @text 武器のＸ座標調整
 * @type number
 * @min -999 @max 999
 * @desc 武器のＸ座標をさらに調整します。
 * 
 * @param AdjustY
 * @text 武器のＹ座標調整
 * @min -999 @max 999
 * @type number
 * @desc 武器のＹ座標をさらに調整します。
 */

(function() {
"use strict";

/**
 * ●構造体（二重配列）をJSで扱えるように変換
 */
function parseStruct2(arg) {
    var ret = [];

    if (arg) {
        JSON.parse(arg).forEach(function(str) {
            ret.push(JSON.parse(str));
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
const pWeaponInfoList = parseStruct2(parameters["WeaponInfoList"]);
const pWeaponX = toNumber(parameters["WeaponX"], 0);
const pWeaponY = toNumber(parameters["WeaponY"], 0);
const pWeaponWidth = setDefault(parameters["WeaponWidth"]);
const pWeaponHeight = setDefault(parameters["WeaponHeight"]);
const pSupportOver30Image = toBoolean(parameters["SupportOver30Image"]);
const pSyncActorMotion = toBoolean(parameters["SyncActorMotion"], true);

//-----------------------------------------------------------------------------
// Sprite_Weapon
//-----------------------------------------------------------------------------

/**
 * ●武器画像読込
 */
const _Sprite_Weapon_loadBitmap = Sprite_Weapon.prototype.loadBitmap;
Sprite_Weapon.prototype.loadBitmap = function() {
    // DynamicMotionを参照
    const dm = this.parent.dynamicMotion;
    // DynamicMotion側で武器の指定がある場合は処理しない。
    if (dm && (dm.weaponId || dm.weaponType)) {
        _Sprite_Weapon_loadBitmap.apply(this, arguments);
        return;
    }

    // 武器の持ち主を取得
    const battler = this.parent._battler;
    if (battler && battler.weapons()) {
        // ファイル名の指定がある場合（DynamicMotionで設定）
        if (this._weaponImage) {
            this.bitmap = ImageManager.loadSystem(this._weaponImage);
            return;
        }

        // 武器を取得
        const dataWeapon = this.dataWeapon();
        // 画像の指定がある場合は読み込む
        const weaponImage = dataWeapon.meta.WeaponImage;
        if (weaponImage) {
            this.bitmap = ImageManager.loadSystem(weaponImage);
            return;
        }
        // 武器情報リストを参照
        const weaponInfo = getWeaponInfo(dataWeapon);
        if (weaponInfo && weaponInfo.WeaponImage) {
            this.bitmap = ImageManager.loadSystem(weaponInfo.WeaponImage);
            return;
        }
    }

    _Sprite_Weapon_loadBitmap.apply(this, arguments);
};

/**
 * 【上書】フレーム更新
 */
Sprite_Weapon.prototype.updateFrame = function() {
    if (this._weaponImageId > 0) {
        let index = (this._weaponImageId - 1) % 12;

        // 武器を取得
        const dataWeapon = this.dataWeapon();
        
        // インデックスの指定がある場合（DynamicMotionで設定）
        if (this._weaponIndex) {
            index = eval(this._weaponIndex) - 1;

        // いずれかの指定がある場合
        } else if (dataWeapon) {
            // 画像の指定を取得
            const weaponImage = dataWeapon.meta.WeaponImage;
            // インデックスの指定を取得
            const weaponIndex = dataWeapon.meta.WeaponIndex;
            if (weaponImage || weaponIndex) {
                index = weaponIndex ? weaponIndex - 1 : 0;
            } else {
                // 武器情報リストを参照
                const weaponInfo = getWeaponInfo(dataWeapon);
                if (weaponInfo && weaponInfo.WeaponIndex) {
                    index = weaponInfo.WeaponIndex - 1;
                }
            }
        }

        const w = pWeaponWidth ? eval(pWeaponWidth) : 96;
        const h = pWeaponHeight ? eval(pWeaponHeight) : 64;
        const sx = (Math.floor(index / 6) * 3 + this._pattern) * w;
        const sy = Math.floor(index % 6) * h;
        this.setFrame(sx, sy, w, h);
    } else {
        this.setFrame(0, 0, 0, 0);
    }
};

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

    // 武器データを取得
    const dataWeapon = this.dataWeapon();
    // 武器情報リストを参照
    const weaponInfo = getWeaponInfo(dataWeapon);
    if (weaponInfo) {
        // 武器のインデックス情報を取得
        const indexDetail = getWeaponIndexDetail(this.parent, weaponInfo);
        if (indexDetail) {
            if (indexDetail.AdjustX != null) {
                this.x += Number(indexDetail.AdjustX);
            }
            if (indexDetail.AdjustY != null) {
                this.y += Number(indexDetail.AdjustY);
            }
        }
    }

    // 色指定があれば設定
    const blendColor = dataWeapon.meta.BlendColor;
    if (blendColor) {
        this.setBlendColor(eval(blendColor));
    }
};

/**
 * 【独自】武器情報を取得する。
 * ※通常、武器のスプライトから武器情報は取得できないが。
 * 　DynamicMotion側で情報を設定している場合のみ取得できる。
 */
Sprite_Weapon.prototype.dataWeapon = function() {
    // 武器の持ち主を取得
    const battler = this.parent._battler;
    if (battler) {
        // 武器ＩＤを取得できる場合
        // ※通常は存在しない項目（DynamicMotionで設定）
        if (this._weaponId) {
            // 武器データを取得
            return $dataWeapons[this._weaponId];
        // 通常時
        } else {
            // アクターから武器データを取得
            return $dataWeapons[battler.weapons()[0].id];
        }
    }
    return null;
}

//-----------------------------------------------------------------------------
// Sprite_Actor
//-----------------------------------------------------------------------------

if (pSyncActorMotion) {
    /**
     * ●描画枠を更新
     */
    const _Sprite_Actor_updateFrame = Sprite_Actor.prototype.updateFrame;
    Sprite_Actor.prototype.updateFrame = function() {
        _Sprite_Actor_updateFrame.apply(this, arguments);

        // アクターの動きに武器も同期する。
        const bitmap = this._mainSprite.bitmap;
        if (bitmap && this._weaponSprite) {
            this._weaponSprite.updateFrame();
        }
    };
}

//-----------------------------------------------------------------------------
// Game_Battler
//-----------------------------------------------------------------------------

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

//-----------------------------------------------------------------------------
// Game_Actor
//-----------------------------------------------------------------------------

/**
 * ●武器振り演出
 */
const _Game_Actor_performAttack = Game_Actor.prototype.performAttack;
Game_Actor.prototype.performAttack = function() {
    // 武器を取得
    let weapon = this.weapons()[0];
    // DynamicMotionで設定されている場合はそちらを参照
    // ※通常は存在しない項目
    if (this._weaponId) {
        // 武器データを取得
        weapon = $dataWeapons[this._weaponId];
    }

    if (weapon) {
        const attackMotionName = getAttackMotionName(this, weapon)
        // モーションの指定が存在すれば設定
        if (attackMotionName) {
            this.requestMotion(attackMotionName);
            const attackMotion = $dataSystem.attackMotions[weapon.wtypeId];
            this.startWeaponAnimation(attackMotion.weaponImageId);
            return;
        }
    }

    _Game_Actor_performAttack.apply(this, arguments);
};

/**
 * ●攻撃モーション名を取得
 * ※優先度：武器情報リストのインデックスリスト ＞ 武器毎の設定 ＞ 武器情報リスト
 */
function getAttackMotionName(battler, weapon) {
    // 武器タイプ毎の情報を取得
    const weaponInfo = getWeaponInfo(weapon);
    if (!weaponInfo) {
        return;
    }

    // アクターのスプライトを取得
    const spriteBattler = getBattlerSprite(battler);
    if (!spriteBattler) {
        return;
    }

    // 武器のインデックス情報を取得
    const indexDetail = getWeaponIndexDetail(spriteBattler, weaponInfo);
    if (indexDetail) {
        return indexDetail.Motion;
    }

    // 武器毎の設定を取得
    if (weapon.meta.AttackMotion) {
        return weapon.meta.AttackMotion;
    }

    // 指定がない場合、武器情報リストを参照
    return weaponInfo.Motion;
}

//-----------------------------------------------------------------------------
// 共通関数
//-----------------------------------------------------------------------------

/**
 * ●武器情報を取得
 */
function getWeaponInfo(weapon) {
    return pWeaponInfoList.find(w => w.WeaponType == weapon.wtypeId);
}

/**
 * ●武器のインデックス情報を取得
 */
function getWeaponIndexDetail(spriteBattler, weaponInfo) {
    // DynamicMotionを参照
    const dm = spriteBattler.dynamicMotion;
    // DynamicMotionでweaponIndexが指定されている場合
    if (dm && dm.weaponIndex) {
        const indexList = parseStruct2(weaponInfo.IndexList);
        return indexList.find(i => i.WeaponIndex == dm.weaponIndex);
    }
    return null;
}

/**
 * ●指定したバトラーのスプライトを取得する。
 * ※実際にはマップ時のSprite_Characterも対象
 */
function getBattlerSprite(battler) {
    if (!battler) {
        return undefined;
    }

    let sprites;
    let sprite;
    const spriteset = getSpriteset();

    // マップ上ではキャラクタースプライトを返す。
    if (!$gameParty.inBattle()) {
        sprites = spriteset._characterSprites;
        sprite = sprites.find(s => s._character == battler);

    // 戦闘中はバトラースプライトを返す。
    } else  {
        sprites = spriteset.battlerSprites();
        sprite = sprites.find(s => s._battler == battler);
    }

    // 一致があれば返す
    return sprite;
}

/**
 * ●現在の画面のSpritesetを取得する。
 */
function getSpriteset() {
    // 戦闘
    if ($gameParty.inBattle()) {
        return BattleManager._spriteset;
    // マップ
    } else {
        return SceneManager._scene._spriteset;
    }
}

})();
