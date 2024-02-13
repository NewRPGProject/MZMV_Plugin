//=============================================================================
// NRP_BattleBush.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.04 Apply the bush effect to the battle background.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @orderAfter NRP_ShadowAndLevitate
 * @url http://newrpg.seesaa.net/article/486468229.html
 *
 * @help Apply the bush effect to the battle background.
 * I use the word "bush", but in reality,
 * I think it is mainly used in water areas.
 * 
 * For example, it is possible to create an effect in which
 * the lower half of the body is hidden by the surface of the water.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Settings are made for each "battlebacks" file.
 * Please specify the file in the "SettingList".
 * Separate settings can be made for actors and enemies.
 * 
 * If bush depth and opacity are not set for each background,
 * the default values of the plugin parameters are used.
 * 
 * -------------------------------------------------------------------
 * [Note of Battlers]
 * -------------------------------------------------------------------
 * The following can be specified in the actor's and enemy's notes
 * to set them individually.
 * ※Note that these settings take precedence over settings for the background.
 * 
 * ◆<BattleBushDepth:?>
 * Change the bush depth to ?. Formula is also possible.
 * e.g.: <BattleBushDepth:a.height / 3> (1/3 of the image height)
 * 
 * For example, if you do not want to apply the effect to enemies
 * flying on the surface of the water, just set the value to 0.
 * 
 * ◆<BattleBushOpacity:?>
 * Change the opacity on the bushes to ?. Formula is also possible.
 * 
 * -------------------------------------------------------------------
 * [Note of Enemies]
 * -------------------------------------------------------------------
 * ◆<ForceBush>
 * Apply a forced bush effect regardless of the background.
 * For example, when you want to represent
 * an enemy half-buried in the ground.。
 * 
 * -------------------------------------------------------------------
 * [Notice]
 * -------------------------------------------------------------------
 * When used with NRP_ShadowAndLevitate.js,
 * this plugin should be placed below.
 * 
 * Also, when the levitation effect of NRP_ShadowAndLevitate.js
 * is applied, the bush effect is automatically disabled,
 * so it is useful to combine the two.
 * 
 * [Terms]
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
 * @param SettingList
 * @type struct<Setting>[]
 * @default
 * @desc List of bush settings.
 * The bush effect is applied to the background registered here.
 * 
 * @param <Actor Default>
 * 
 * @param ActorBushDepth
 * @parent <Actor Default>
 * @default 24
 * @desc The height at which the bush effect is applied to the actor. Formula is valid (e.g.: a.height / 3).
 * 
 * @param ActorBushOpacity
 * @parent <Actor Setting>
 * @default 128
 * @desc Opacity to be applied to the actor on the bushes (opaque at 255).
 * 
 * @param <Enemy Default>
 * 
 * @param EnemyBushDepth
 * @parent <Enemy Default>
 * @default 24
 * @desc The height at which the bush effect is applied to the enemy. Formula is valid (e.g.: a.height / 3).
 * 
 * @param EnemyBushOpacity
 * @parent <Enemy Default>
 * @default 128
 * @desc Opacity to be applied to the enemy on the bushes (opaque at 255).
 * 
 * @param <Common Default>
 * 
 * @param BushOnMove
 * @parent <Common Default>
 * @type boolean
 * @default true
 * @desc Whether the battler applies the bush effect while on the move?
 * 
 * @param BushInAir
 * @parent <Common Default>
 * @type boolean
 * @default false
 * @desc Whether the bush effect should also be applied when the battler is in the air?
 * 
 * @param ShowShadow
 * @parent <Common Default>
 * @type boolean
 * @default false
 * @desc The shadow of the battler is also displayed during the bush effect.
 * 
 * @param ChangeShadowOpacity
 * @parent ShowShadow
 * @type boolean
 * @default false
 * @desc Change the opacity of the battler's shadow to match the bush setting.
 * 
 * @param ShadowOverBush
 * @parent ShowShadow
 * @type boolean
 * @default false
 * @desc Change the position of battler's shadow over the bushes.
 * In short, it displays a shadow on the water surface.
 * 
 * @param ShadowOnlyAir
 * @parent ShowShadow
 * @type boolean
 * @default false
 * @desc Shadows are displayed only when the battler is in the air.
 */
//-----------------------------------------------------------------------------
// Setting
//-----------------------------------------------------------------------------
/*~struct~Setting:
 * @param Battleback1
 * @type file
 * @dir img/battlebacks1
 * @desc The battle background you want to set the bush effect.
 * If specified, the bush effect will be enabled.
 * 
 * @param Battleback2
 * @type file
 * @dir img/battlebacks2
 * @desc The battle background you want to set the bush effect.
 * If specified, the bush effect will be enabled.
 * 
 * @param <Actor Setting>
 * 
 * @param ActorBushDepth
 * @parent <Actor Setting>
 * @desc The height at which the bush effect is applied to the actor. Formula is valid (e.g.: a.height / 3).
 * 
 * @param ActorBushOpacity
 * @parent <Actor Setting>
 * @desc Opacity to be applied to the actor on the bushes (opaque at 255).
 * 
 * @param <Enemy Setting>
 * 
 * @param EnemyBushDepth
 * @parent <Enemy Setting>
 * @desc The height at which the bush effect is applied to the enemy. Formula is valid (e.g.: a.height / 3).
 * 
 * @param EnemyBushOpacity
 * @parent <Enemy Setting>
 * @desc Opacity to be applied to the enemy on the bushes (opaque at 255).
 * 
 * @param <Common Setting>
 * 
 * @param BushOnMove
 * @parent <Common Setting>
 * @type boolean
 * @desc Whether the battler applies the bush effect while on the move?
 * 
 * @param BushInAir
 * @parent <Common Setting>
 * @type boolean
 * @desc Whether the bush effect should also be applied when the battler is in the air?
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.04 戦闘背景に茂み効果を適用します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @orderAfter NRP_ShadowAndLevitate
 * @url http://newrpg.seesaa.net/article/486468229.html
 *
 * @help 戦闘背景に茂み効果を適用します。
 * 茂みという言葉を使っていますが、
 * 実際には水場での使用が中心になると思います。
 * 
 * 例えば、水面に下半身が隠れるような演出が可能です。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * 設定は『戦闘背景（battlebacks）』のファイル毎に行います。
 * 『設定リスト』にファイルを指定してください。
 * アクターと敵キャラで別々の設定も可能です。
 * 
 * 茂みの深さや不透明度を背景毎に設定しなかった場合は、
 * プラグインパラメータの既定値が使用されます。
 * 
 * -------------------------------------------------------------------
 * ■バトラーのメモ欄
 * -------------------------------------------------------------------
 * アクターおよび敵キャラのメモ欄に以下の指定をすれば、
 * 個別に設定をすることができます。
 * ※なお、背景に対する設定よりも優先されます。
 * 
 * ◆<BattleBushDepth:?>
 * 茂みの深さを?に変更します。数式も可能です。
 * 例：<BattleBushDepth:a.height / 3>（画像縦幅の1/3）
 * 
 * 例えば、水面を飛行する敵には効果を適用したくないという場合は、
 * 0を設定しておけばＯＫです。
 * 
 * ◆<BattleBushOpacity:?>
 * 茂み時の不透明度を?に変更します。数式も可能です。
 * 
 * -------------------------------------------------------------------
 * ■敵キャラのメモ欄
 * -------------------------------------------------------------------
 * ◆<ForceBush>
 * 背景に関係なく強制的に茂み効果を適用します。
 * 地面に半身が埋もれた敵を表現したい時など。
 * 
 * -------------------------------------------------------------------
 * ■注意
 * -------------------------------------------------------------------
 * NRP_ShadowAndLevitate.jsと併用する場合は、
 * 当プラグインを下に配置してください。
 * 
 * また、NRP_ShadowAndLevitate.jsの浮遊効果を適用した際は、
 * 自動的に茂み効果は無効になりますので、組み合わせると便利です。
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
 * @param SettingList
 * @text 設定リスト
 * @type struct<Setting>[]
 * @default
 * @desc 茂み設定の一覧です。
 * この一覧に登録された戦闘背景に対して、茂み効果が適用されます。
 * 
 * @param <Actor Default>
 * @text ＜アクターの基本設定＞
 * 
 * @param ActorBushDepth
 * @text 茂みの深さ
 * @parent <Actor Default>
 * @default 24
 * @desc 茂み上でアクターの下半身に半透明効果を適用する高さです。数式可（例：a.height / 3）
 * 
 * @param ActorBushOpacity
 * @text 茂みでの不透明度
 * @parent <Actor Setting>
 * @default 128
 * @desc 茂み上でアクターの下半身に適用する不透明度（255で不透明）です。
 * 
 * @param <Enemy Default>
 * @text ＜敵キャラの基本設定＞
 * 
 * @param EnemyBushDepth
 * @text 茂みの深さ
 * @parent <Enemy Default>
 * @default 24
 * @desc 茂み上で敵キャラの下半身に半透明効果を適用する高さです。数式可（例：a.height / 3）
 * 
 * @param EnemyBushOpacity
 * @text 茂みでの不透明度
 * @parent <Enemy Default>
 * @default 128
 * @desc 茂み上で敵キャラの下半身に適用する不透明度（255で不透明）です。
 * 
 * @param <Common Default>
 * @text ＜共通の基本設定＞
 * 
 * @param BushOnMove
 * @text 移動中の茂み処理
 * @parent <Common Default>
 * @type boolean
 * @default true
 * @desc バトラーが移動中も茂み効果を適用するかどうか？
 * 
 * @param BushInAir
 * @text 空中の茂み処理
 * @parent <Common Default>
 * @type boolean
 * @default false
 * @desc バトラーが空中にいる際も茂み効果を適用するかどうか？
 * 
 * @param ShowShadow
 * @text 影を表示
 * @parent <Common Default>
 * @type boolean
 * @default false
 * @desc 茂み効果中にもバトラーの影を表示します。
 * 
 * @param ChangeShadowOpacity
 * @text 影の不透明度を変更
 * @parent ShowShadow
 * @type boolean
 * @default false
 * @desc 茂みの設定に合わせて、バトラーの影の不透明度も変更します。
 * 
 * @param ShadowOverBush
 * @text 影を茂みの上に表示
 * @parent ShowShadow
 * @type boolean
 * @default false
 * @desc バトラーの影の位置を茂みの上に変更します。
 * 要するに水面上に影を表示します。
 * 
 * @param ShadowOnlyAir
 * @text 空中時のみ影を表示
 * @parent ShowShadow
 * @type boolean
 * @default false
 * @desc バトラーが空中にいる時のみ影を表示します。
 */
//-----------------------------------------------------------------------------
// Setting
//-----------------------------------------------------------------------------
/*~struct~Setting:ja
 * @param Battleback1
 * @text 戦闘背景１
 * @type file
 * @dir img/battlebacks1
 * @desc 茂み効果を設定する戦闘背景（下）です。
 * 指定すれば茂み効果が有効になります。
 * 
 * @param Battleback2
 * @text 戦闘背景２
 * @type file
 * @dir img/battlebacks2
 * @desc 茂み効果を設定する戦闘背景（上）です。
 * 指定すれば茂み効果が有効になります。
 * 
 * @param <Actor Setting>
 * @text ＜アクターの設定＞
 * 
 * @param ActorBushDepth
 * @text 茂みの深さ
 * @parent <Actor Setting>
 * @desc 茂み上でアクターの下半身に半透明効果を適用する高さです。
 * 空欄なら既定値を使用。
 * 
 * @param ActorBushOpacity
 * @text 茂みでの不透明度
 * @parent <Actor Setting>
 * @desc 茂み上でアクターの下半身に適用する不透明度です。
 * 空欄なら既定値を使用。
 * 
 * @param <Enemy Setting>
 * @text ＜敵キャラの設定＞
 * 
 * @param EnemyBushDepth
 * @text 茂みの深さ
 * @parent <Enemy Setting>
 * @desc 茂み上で敵キャラの下半身に半透明効果を適用する高さです。
 * 空欄なら既定値を使用。
 * 
 * @param EnemyBushOpacity
 * @text 茂みでの不透明度
 * @parent <Enemy Setting>
 * @desc 茂み上で敵キャラの下半身に適用する不透明度です。
 * 空欄なら既定値を使用。
 * 
 * @param <Common Setting>
 * @text ＜共通設定＞
 * 
 * @param BushOnMove
 * @text 移動中の茂み処理
 * @parent <Common Setting>
 * @type boolean
 * @desc バトラーが移動中も茂み効果を適用するかどうか？
 * 
 * @param BushInAir
 * @text 空中の茂み処理
 * @parent <Common Setting>
 * @type boolean
 * @desc バトラーが空中にいる際も茂み効果を適用するかどうか？
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

const PLUGIN_NAME = "NRP_BattleBush";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pSettingList = parseStruct2(parameters["SettingList"]);
const pActorBushDepth = parameters["ActorBushDepth"];
const pActorBushOpacity = parameters["ActorBushOpacity"];
const pEnemyBushDepth = parameters["EnemyBushDepth"];
const pEnemyBushOpacity = parameters["EnemyBushOpacity"];
const pBushOnMove = toBoolean(parameters["BushOnMove"], false);
const pBushInAir = toBoolean(parameters["BushInAir"], false);
const pShowShadow = toBoolean(parameters["ShowShadow"], false);
const pChangeShadowOpacity = toBoolean(parameters["ChangeShadowOpacity"], false);
const pShadowOverBush = toBoolean(parameters["ShadowOverBush"], false);
const pShadowOnlyAir = toBoolean(parameters["ShadowOnlyAir"], false);

/**
 * ●効率化のため事前変換
 */
for (const setting of pSettingList) {
    setting.battleback1 = setDefault(setting.Battleback1);
    setting.battleback2 = setDefault(setting.Battleback2);
    setting.actorBushDepth = setDefault(setting.ActorBushDepth, pActorBushDepth);
    setting.actorBushOpacity = setDefault(setting.ActorBushOpacity, pActorBushOpacity);
    setting.enemyBushDepth = setDefault(setting.EnemyBushDepth, pEnemyBushDepth);
    setting.enemyBushOpacity = setDefault(setting.EnemyBushOpacity, pEnemyBushOpacity);
    setting.bushOnMove = toBoolean(setting.BushOnMove, pBushOnMove);
    setting.bushInAir = toBoolean(setting.BushInAir, pBushInAir);
}

//-----------------------------------------------------------------------------
// Spriteset_Battle
//-----------------------------------------------------------------------------

/**
 * ●戦闘背景の作成
 */
const _Spriteset_Battle_createBattleback = Spriteset_Battle.prototype.createBattleback;
Spriteset_Battle.prototype.createBattleback = function() {
    _Spriteset_Battle_createBattleback.apply(this, arguments);

    // ＭＺとＭＶで取得先が異なる。
    let battleback1Name;
    let battleback2Name;
    // ＭＺ
    if (this._back1Sprite.battleback1Name) {
        battleback1Name = this._back1Sprite.battleback1Name();
        battleback2Name = this._back2Sprite.battleback2Name();
    // ＭＶ
    } else if (this.battleback1Name) {
        battleback1Name = this.battleback1Name();
        battleback2Name = this.battleback2Name();
    }

    // 条件に一致する茂み情報を反映
    const setting = getMatchSetting(battleback1Name, battleback2Name);
    this._bushSetting = setting;
};

/**
 * ●戦闘背景に一致する設定を取得する。
 */
function getMatchSetting(battleback1Name, battleback2Name) {
    // 戦闘背景１、戦闘背景２の条件が一致するか？
    const battlebackSettings = pSettingList.find(setting =>
        isMatch(setting.battleback1, battleback1Name)
        && isMatch(setting.battleback2, battleback2Name)
    );
    return battlebackSettings;
}

/**
 * ●設定が一致するか確認
 */
function isMatch(settingValue, compareValue) {
    // 設定値が存在しない場合は有効と判定
    if (settingValue == null) {
        return true;
    }
    return settingValue == compareValue;
}

//-----------------------------------------------------------------------------
// Sprite_Battler
//-----------------------------------------------------------------------------

/**
 * 【独自】半透明用の半身の作成
 */
Sprite_Battler.prototype.createHalfBodySprites = function() {
    if (!this._upperBody) {
        this._upperBody = new Sprite();
        this._upperBody.anchor.x = 0.5;
        this._upperBody.anchor.y = 1;
        this.addChild(this._upperBody);
    }
    if (!this._lowerBody) {
        this._lowerBody = new Sprite();
        this._lowerBody.anchor.x = 0.5;
        this._lowerBody.anchor.y = 1;
        this._lowerBody.opacity = this.bushOpacity();
        this.addChild(this._lowerBody);
    }
};

/**
 * 【独自】半透明用の半身の更新
 */
Sprite_Battler.prototype.updateHalfBodySprites = function() {
    const bushDepth = this._bushDepth;
    if (bushDepth > 0 && !this.isOutOfBush()) {
        this.createHalfBodySprites();
        this._upperBody.bitmap = this._originalBitmap;
        this._upperBody.visible = true;
        this._upperBody.y = -bushDepth;
        this._lowerBody.bitmap = this._originalBitmap;
        this._lowerBody.visible = true;
        this._upperBody.setBlendColor(this.getBlendColor());
        this._lowerBody.setBlendColor(this.getBlendColor());
        this._upperBody.setColorTone(this.getColorTone());
        this._lowerBody.setColorTone(this.getColorTone());
        this._upperBody.blendMode = this.blendMode;
        this._lowerBody.blendMode = this.blendMode;
    } else if (this._upperBody) {
        this._upperBody.visible = false;
        this._lowerBody.visible = false;
    }
};

/**
 * 【独自】茂みの不透明度を取得
 */
Sprite_Battler.prototype.bushOpacity = function() {
    // 定義のみ
}

/**
 * 【独自】茂みの深さを計算
 */
Sprite_Battler.prototype.calcBushDepth = function() {
    // 定義のみ
}

//-----------------------------------------------------------------------------
// Sprite_Actor
//-----------------------------------------------------------------------------

/**
 * ●描画枠の設定
 */
const _Sprite_Actor_updateFrame = Sprite_Actor.prototype.updateFrame;
Sprite_Actor.prototype.updateFrame = function() {
    // 茂み状態ではない場合のみ通常の処理
    if (!this._isOnBush) {
        _Sprite_Actor_updateFrame.apply(this, arguments);
    }

    // 茂みの深さを取得
    const bushDepth = this.calcBushDepth();
    this._bushDepth = bushDepth;

    // 本来の画像を参照
    const originalBitmap = this._originalBitmap;

    if (originalBitmap && originalBitmap.isReady()) {
        this.updateHalfBodySprites();

        // 茂み適用時
        if (bushDepth > 0 && !this.isOutOfBush()) {
            const motionIndex = this._motion ? this._motion.index : 0;
            const pattern = this._pattern < 3 ? this._pattern : 1;
            const cw = originalBitmap.width / 9; // 描画する横幅
            const ch = originalBitmap.height / 6; // 描画する縦幅
            const cx = Math.floor(motionIndex / 6) * 3 + pattern; // 描画するパターンのＸ番号
            const cy = motionIndex % 6; // 描画するパターンのＹ番号
            const sx = cx * cw; // 切り取り開始Ｘ座標
            const sy = cy * ch; // 切り取り開始Ｙ座標

            // // 上半身を途中まで描画
            this._upperBody.setFrame(sx, sy, cw, ch - bushDepth);
            // // 下半身を半透明描画
            this._lowerBody.setFrame(sx, sy + ch - bushDepth, cw, bushDepth);

            // 茂み状態になっていない場合
            if (!this._isOnBush) {
                // 本体画像をダミーの透明画像に変更して非表示にする。
                // ※bitmap.visible = falseでは半身まで消えてしまうので却下。
                // ※setFrame(sx, sy, 0, ch);ではサイズを参照できなくなるので却下。
                this.mainSprite().bitmap = new Bitmap(cw, ch);
                // 茂み状態開始
                this._isOnBush = true;
            }
            
        // 茂みが解除された際
        } else if (this._isOnBush) {
            // 画像を元に戻す。
            this.mainSprite().bitmap = originalBitmap;
            // 茂み状態解除
            this._isOnBush = false;
            // 本来の処理を実行
            _Sprite_Actor_updateFrame.apply(this, arguments);
        }
    }
};

/**
 * 【独自】茂みの深さを計算
 */
Sprite_Actor.prototype.calcBushDepth = function() {
    if (!this._battler || !getSpriteset()) {
        return;
    }

    const setting = getSpriteset()._bushSetting;
    if (setting && setting.actorBushDepth) {
        const a = this; // eval用
        // メモ欄の指定がある場合は優先
        const metaValue = this._battler.actor().meta.BattleBushDepth;
        if (metaValue) {
            return Math.round(eval(metaValue));
        }
        // 通常時
        return Math.round(eval(setting.actorBushDepth));
    }
    return null;
}

/**
 * 【独自】茂みの対象外となる状態かどうか？
 */
Sprite_Actor.prototype.isOutOfBush = function() {
    const setting = getSpriteset()._bushSetting;
    if (setting && isOutOfBush(this, setting)) {
        return true;
    }
    return false;
}

/**
 * 【独自】茂みの不透明度を取得
 */
Sprite_Actor.prototype.bushOpacity = function() {
    if (!this._battler || !getSpriteset()) {
        return;
    }

    const setting = getSpriteset()._bushSetting;
    if (setting) {
        const a = this; // eval用
        // メモ欄の指定がある場合は優先
        const metaValue = this._battler.actor().meta.BattleBushOpacity;
        if (metaValue) {
            return eval(metaValue);
        }
        // 通常時
        return eval(setting.actorBushOpacity);
    }
    return null;
}

/**
 * ●画像更新
 */
const _Sprite_Actor_updateBitmap = Sprite_Actor.prototype.updateBitmap;
Sprite_Actor.prototype.updateBitmap = function() {
    // 画像が変更された場合
    if (this._battlerName !== this._actor.battlerName()) {
        _Sprite_Actor_updateBitmap.apply(this, arguments);
        // 本来の画像を保持しておく。
        this._originalBitmap = this._mainSprite.bitmap;
        return;
    }

    _Sprite_Actor_updateBitmap.apply(this, arguments);
};

/**
 * ●影の描画更新
 */
const _Sprite_Actor_updateShadow = Sprite_Actor.prototype.updateShadow;
Sprite_Actor.prototype.updateShadow = function() {
    _Sprite_Actor_updateShadow.apply(this, arguments);

    if (this._bushDepth) {
        // 茂み上では影を非表示する場合
        if (!pShowShadow) {
            this._shadowSprite.opacity = 0;
            return;
        }

        const setting = getSpriteset()._bushSetting;

        // 空中時のみ影を表示する場合
        if (pShadowOnlyAir && !isInAirNotOnBush(this, setting)) {
            this._shadowSprite.opacity = 0;
            return;
        }

        // 茂みの設定に合わせて影の不透明度も変更
        if (pChangeShadowOpacity) {
            // NRP_ShadowAndLevitate.jsと併用時
            if (this._shadowSprite.originalOpacity) {
                this._shadowSprite.opacity *= (this.bushOpacity() / 255);

            // 通常時（標準の不透明度を255固定で計算）
            } else {
                this._shadowSprite.opacity = this.bushOpacity() / 255;
            }
        }

        // 影の位置を茂みの上に
        // ※ただし、NRP_ShadowAndLevitate.jsの浮遊処理時は除外
        if (pShadowOverBush && !this.floatHeight) {
            this._shadowSprite.y -= this._bushDepth;
        }
    }
};

//-----------------------------------------------------------------------------
// Sprite_Enemy
//-----------------------------------------------------------------------------

/**
 * ●描画枠の設定
 */
const _Sprite_Enemy_updateFrame = Sprite_Enemy.prototype.updateFrame;
Sprite_Enemy.prototype.updateFrame = function() {
    // 茂み状態ではない場合のみ通常の処理
    if (!this._isOnBush) {
        _Sprite_Enemy_updateFrame.apply(this, arguments);
    }
    
    // 茂みの深さを取得
    const bushDepth = this.calcBushDepth();
    this._bushDepth = bushDepth;

    // 本来の画像を参照
    const originalBitmap = this._originalBitmap;

    if (originalBitmap && originalBitmap.isReady()) {
        this.updateHalfBodySprites();

        // 茂み適用時
        if (bushDepth > 0 && !this.isOutOfBush()) {
            const cw = originalBitmap.width; // 描画する横幅
            const ch = originalBitmap.height; // 描画する縦幅

            // 上半身を途中まで描画
            this._upperBody.setFrame(0, 0, cw, ch - bushDepth);
            // 下半身を半透明描画
            this._lowerBody.setFrame(0, ch - bushDepth, cw, bushDepth);
            // 茂み状態になっていない場合
            if (!this._isOnBush) {
                // 本体画像をダミーの透明画像に変更して非表示にする。
                // ※bitmap.visible = falseでは半身まで消えてしまうので却下。
                // ※setFrame(sx, sy, 0, ch);ではサイズを参照できなくなるので却下。
                this.mainSprite().bitmap = new Bitmap(cw, ch);
                // 茂み状態開始
                this._isOnBush = true;
            }
            
        // 茂みが解除された際
        } else if (this._isOnBush) {
            // 画像を元に戻す。
            this.mainSprite().bitmap = originalBitmap;
            // 茂み状態解除
            this._isOnBush = false;
            // 本来の処理を実行
            _Sprite_Enemy_updateFrame.apply(this, arguments);
        }
    }
};

/**
 * 【独自】茂みの深さを計算
 */
Sprite_Enemy.prototype.calcBushDepth = function() {
    if (!this._battler || !getSpriteset()) {
        return;
    }

    const setting = getSpriteset()._bushSetting;
    // 強制茂みフラグ
    const forceBush = this._battler.enemy().meta.ForceBush;

    if (forceBush || (setting && setting.enemyBushDepth)) {
        const a = this; // eval用
        // メモ欄の指定がある場合は優先
        const metaValue = this._battler.enemy().meta.BattleBushDepth;
        if (metaValue) {
            return Math.round(eval(metaValue));
        }
        // 通常時
        if (setting) {
            return Math.round(eval(setting.enemyBushDepth));
        }
        // 既定値
        return Math.round(eval(pEnemyBushDepth));
    }
    return null;
}

/**
 * 【独自】茂みの対象外となる状態かどうか？
 */
Sprite_Enemy.prototype.isOutOfBush = function() {
    // ボスの消滅エフェクト時は処理停止
    // （NRP_EnemyCollapse.jsの独自エフェクトにも対応）
    // ※体が削れていく演出にupdateFrameを使用しているため、
    // 　茂み処理を停止しないとうまく動作しなくなる。
    // 　同様にupdateFrameを使用する演出を追加した場合は対処が必要
    if (this._effectType === "bossCollapse" || this._effectType === "originalCollapse") {
        return true;
    }

    const setting = getSpriteset()._bushSetting;
    // 強制茂みフラグ
    const forceBush = this._battler.enemy().meta.ForceBush;

    if (setting || forceBush) {
        if (isOutOfBush(this, setting)) {
            return true;
        }
    }
    return false;
}

/**
 * 【独自】茂みの不透明度を取得
 */
Sprite_Enemy.prototype.bushOpacity = function() {
    if (!this._battler || !getSpriteset()) {
        return;
    }

    const setting = getSpriteset()._bushSetting;
    // 強制茂みフラグ
    const forceBush = this._battler.enemy().meta.ForceBush;

    if (forceBush || setting) {
        const a = this; // eval用
        // メモ欄の指定がある場合は優先
        const metaValue = this._battler.enemy().meta.BattleBushOpacity;
        if (metaValue) {
            return eval(metaValue);
        }
        // 通常時
        if (setting) {
            return eval(setting.enemyBushOpacity);
        }
        // 既定値
        return eval(pEnemyBushOpacity);
    }
    return null;
}

/**
 * ●画像の読み込み
 */
const _Sprite_Enemy_loadBitmap = Sprite_Enemy.prototype.loadBitmap;
Sprite_Enemy.prototype.loadBitmap = function(name) {
    _Sprite_Enemy_loadBitmap.apply(this, arguments);

    // 本来の画像を保持しておく。
    this._originalBitmap = this.bitmap;
};

/**
 * ●影の描画更新
 * ※本来は存在しない関数だが、NRP_ShadowAndLevitate.jsとの連携を想定
 */
if (Sprite_Enemy.prototype.updateShadow) {
    const _Sprite_Enemy_updateShadow = Sprite_Enemy.prototype.updateShadow;
    Sprite_Enemy.prototype.updateShadow = function() {
        _Sprite_Enemy_updateShadow.apply(this, arguments);

        const bushDepth = this._bushDepth;
        if (bushDepth) {
            // 茂み上では影を非表示する場合
            if (!pShowShadow) {
                this._shadowSprite.opacity = 0;
                return;
            }

            const setting = getSpriteset()._bushSetting;

            // 空中時のみ影を表示する場合
            if (pShadowOnlyAir && !isInAirNotOnBush(this, setting)) {
                this._shadowSprite.opacity = 0;
                return;
            }

            // 茂みの設定に合わせて影の不透明度も変更
            if (pChangeShadowOpacity && this._shadowSprite && this._shadowSprite.originalOpacity) {
                this._shadowSprite.opacity *= (this.bushOpacity() / 255);
            }

            // 影の位置を茂みの上に
            // ※ただし、NRP_ShadowAndLevitate.jsの浮遊処理時は除外
            if (pShadowOverBush && !this.floatHeight) {
                this._shadowSprite.y -= bushDepth;
            }
        }
    };
}

//-----------------------------------------------------------------------------
// Game_Enemy
//-----------------------------------------------------------------------------

/**
 * ●変身処理
 */
const _Game_Enemy_transform = Game_Enemy.prototype.transform;
Game_Enemy.prototype.transform = function(enemyId) {
    const sprite = getBattlerSprite(this);

    // 上半身、下半身を削除
    sprite.removeChild(sprite._upperBody);
    sprite.removeChild(sprite._lowerBody);
    sprite._upperBody = null;
    sprite._lowerBody = null;

    // 一旦茂みフラグを解除する。
    // ※これによって、Sprite_Enemy.prototype.updateFrameの茂み処理を再度実行させる。
    sprite._isOnBush = false;

    _Game_Enemy_transform.apply(this, arguments);
};

//-----------------------------------------------------------------------------
// その他共通関数
//-----------------------------------------------------------------------------

/**
 * ●バトラースプライトが茂み処理の対象外かどうか？
 */
function isOutOfBush(sprite, setting) {
    // 空中判定および移動判定
    if (isInAirNotOnBush(sprite, setting) || isMovingNotOnBush(sprite, setting)) {
        return true;
    }
    return false;
}

/**
 * ●バトラースプライトが空中にいるかどうか？
 */
function isInAirNotOnBush(sprite, setting) {
    // 空中にいる際も茂み処理を行うなら不要
    if ((setting && setting.bushInAir)
            || (!setting && pBushInAir)) {
        return false;

    // マップキャラクターに合わせた高さ
    } else if (sprite.jumpHeight && sprite.jumpHeight() > 0) {
        return true;

    // NRP_ShadowAndLevitate.js用
    } else if (sprite.floatHeight > 0) {
        return true;

    // DynamicMotion用
    } else if (sprite._airY < 0) {
        return true;
    }
    return false;
}

/**
 * ●バトラースプライトが移動中かどうか？
 */
function isMovingNotOnBush(sprite, setting) {
    // 移動中も茂み処理を行うなら不要
    if (setting && setting.bushOnMove) {
        return false;

    // 戦闘開始時は除外
    } else if (BattleManager._phase == "start") {
        return false;

    // 移動中
    } else if (sprite._movementDuration > 0) {
        return true;

    // アクション中
    } else if (sprite._battler.isActing()) {
        return true;
    }
    return false;
}

/**
 * ●指定したバトラーのスプライトを取得する。
 */
function getBattlerSprite(battler) {
    if (!battler) {
        return undefined;
    }

    var sprites;
    const spriteset = getSpriteset();

    // 戦闘中はバトラースプライトを返す。
    if ($gameParty.inBattle()) {
        sprites = spriteset.battlerSprites();

    // マップ上ではキャラクタースプライトを返す。
    } else {
        sprites = spriteset._characterSprites;
    }

    // 一致があれば返す
    return sprites.find(s => s._battler == battler || s._character == battler);
}

/**
 * ●現在の画面のSpritesetを取得する。
 */
function getSpriteset() {
    return SceneManager._scene._spriteset;
}

//-----------------------------------------------------------------------------
// ＭＶ対応
//-----------------------------------------------------------------------------

/**
 * ●ＭＶに存在しない関数を定義
 */
if (!Sprite_Battler.prototype.mainSprite) {
    Sprite_Battler.prototype.mainSprite = function() {
        return this;
    };
    Sprite_Actor.prototype.mainSprite = function() {
        return this._mainSprite;
    };
}

})();
