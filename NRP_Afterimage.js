//=============================================================================
// NRP_Afterimage.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v2.04 Gives an afterimage effect to the battler or character.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/483120023.html
 *
 * @help Gives an afterimage effect to the battler or character.
 * The display time, interval, and color tone of the afterimage
 * can be adjusted using plugin parameters.
 * 
 * [Basic Usage]
 * You can execute the following script
 * by specifying the battler (or character) and calling it.
 * Basically, it is assumed to be called from DynamicMotion.
 * ※a is the battler or character.
 * 
 * ◆a.afterimage().start();
 * Start the afterimage.
 * 
 * ◆a.afterimage().end();
 * End the afterimage.
 * ※If omitted in battle,
 *   it will be automatically terminated when the action is finished.
 * ※Note that it does not automatically exit on the map.
 * 
 * ◆Example for DynamicMotion
 * ---------------------------------
 * <D-Motion:near>
 * script = a.afterimage().start();
 * </D-Motion>
 * 
 * <D-Motion:attack>
 * script = a.afterimage().end();
 * </D-Motion>
 * 
 * <D-Animation/>
 * <D-Motion:return/>
 * ---------------------------------
 * 
 * ◆Example for Movement Route
 * It is easy to write a script as follows.
 * > this.afterimage().start();
 * 
 * When finished, it will look like this
 * > this.afterimage().end();
 * 
 * It is exactly the same, except that it targets "this" instead of "a".
 * 
 * [Option]
 * Normally, the plugin parameter settings are used,
 * but the settings can be changed for each skill.
 * 
 * ◆a.afterimage().setInterval(4);
 * Set the display interval of the afterimage to 4 frames (4/60 seconds).
 * 
 * ◆a.afterimage().setDuration(30);
 * Set the display duration of the afterimage to 30 frames (30/60 seconds).
 * 
 * ◆a.afterimage().setOpacity(128);
 * Set the initial opacity of the afterimage to 128/255.
 * 
 * ◆a.afterimage().setColor([255, 255, 255, 255]);
 * Set the color tone of the afterimage to [255, 255, 255, 255].
 * ※Red, green, blue, strength in that order.
 * 
 * ◆a.afterimage().setBlendMode(1);
 * Change the afterimage blending method to 1:Add.
 * ※0:Normal, 1:Add, 2:Multiply, 3:Screen
 * 
 * ◆Example for DynamicMotion
 * Set the options after the start process as shown below.
 * 
 * ---------------------------------
 * <D-Motion:near>
 * script = a.afterimage().start(); a.afterimage().setInterval(1); a.afterimage().setDuration(100); a.afterimage().setOpacity(128); a.afterimage().setColor([255, 0, 0, 255]); a.afterimage().setBlendMode(1);
 * </D-Motion>
 * 
 * <D-Motion:attack>
 * script = a.afterimage().end();
 * </D-Motion>
 * 
 * <D-Animation/>
 * <D-Motion:return/>
 * ---------------------------------
 * 
 * [Reference]
 * The following plugin was used as a reference in the creation of this plugin.
 * 
 * SAN_ResidualSprites.js (Sanshiro)
 * https://github.com/rev2nym/SAN_ResidualSprites
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 * 
 * @param Duration
 * @type number
 * @default 30
 * @desc The time it takes for the afterimages to disappear.
 * 
 * @param Interval
 * @type number
 * @default 4
 * @desc The interval at which the afterimages are generated, set in 1/60 second increments.
 * 
 * @param Opacity
 * @type number
 * @max 255
 * @default 255
 * @desc The opacity of the afterimages when they are created.
 * 
 * @param Color
 * @type string
 * @default [0, 0, 0, 0]
 * @desc The color tone of the afterimages. eg: [128, 128, 255, 255]
 * 
 * @param BlendMode
 * @type select
 * @option 0:Normal @value 0
 * @option 1:Add @value 1
 * @option 2:Multiply @value 2
 * @option 3:Screen @value 3
 * @default 0
 * @desc How to blend afterimages.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v2.04 バトラー＆キャラクターに残像効果を付与します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/483120023.html
 *
 * @help バトラーまたはキャラクターに対して残像効果を付与します。
 * 残像の表示時間、間隔、色調などをプラグインパラメータで調整可能です。
 * 
 * ■基本的な使用法
 * バトラーまたはキャラクターを指定して、
 * 以下のスクリプトを呼び出すことで実行できます。
 * 基本的にはDynamicMotionから呼び出すことを想定しています。
 * ※aはバトラーまたはキャラクターです。
 * 
 * ◆a.afterimage().start();
 * 残像を開始する。
 * 
 * ◆a.afterimage().end();
 * 残像を終了する。
 * ※戦闘時に省略した場合、アクション終了時に自動で終了します。
 * ※マップ上では自動終了しないので注意してください。
 * 
 * ◆DynamicMotionの記述例
 * ---------------------------------
 * <D-Motion:near>
 * script = a.afterimage().start();
 * </D-Motion>
 * 
 * <D-Motion:attack>
 * script = a.afterimage().end();
 * </D-Motion>
 * 
 * <D-Animation/>
 * <D-Motion:return/>
 * ---------------------------------
 * 
 * ◆移動ルートの設定の記述例
 * スクリプトで以下のように記述するのが手軽です。
 * > this.afterimage().start();
 * 
 * 終了時は以下のようになります。
 * > this.afterimage().end();
 * 
 * aではなくthisを対象にする以外は全く同じです。
 * 
 * ■オプション
 * 通常はプラグインパラメータの設定値を使用しますが、
 * スキル毎に設定を変更することもできます。
 * 
 * ◆a.afterimage().setInterval(4);
 * 残像の表示間隔を4フレーム（4/60秒）に設定する。
 * 
 * ◆a.afterimage().setDuration(30);
 * 残像の表示時間を30フレーム（30/60秒）に設定する。
 * 
 * ◆a.afterimage().setOpacity(128);
 * 残像の初期不透明度を128/255に設定する。
 * 
 * ◆a.afterimage().setColor([255, 255, 255, 255]);
 * 残像の色調を[255, 255, 255, 255]に設定する。
 * ※赤、緑、青、強さの順番
 * 
 * ◆a.afterimage().setBlendMode(1);
 * 残像の合成方法を1:加算に変更する。
 * ※0:通常, 1:加算, 2:乗算, 3:スクリーン
 * 
 * ◆DynamicMotionの記述例
 * 以下のように開始処理の後でオプションを設定してください。
 * 
 * ---------------------------------
 * <D-Motion:near>
 * script = a.afterimage().start(); a.afterimage().setInterval(1); a.afterimage().setDuration(100); a.afterimage().setOpacity(128); a.afterimage().setColor([255, 0, 0, 255]); a.afterimage().setBlendMode(1);
 * </D-Motion>
 * 
 * <D-Motion:attack>
 * script = a.afterimage().end();
 * </D-Motion>
 * 
 * <D-Animation/>
 * <D-Motion:return/>
 * ---------------------------------
 * 
 * ■参考
 * このプラグインの制作に当たって、
 * 以下のプラグインを参考にさせていただきました。
 * 
 * SAN_ResidualSprites.js（サンシロ様）
 * https://github.com/rev2nym/SAN_ResidualSprites
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param Duration
 * @text 表示時間
 * @type number
 * @default 30
 * @desc 残像が消滅するまでの時間です。
 * 
 * @param Interval
 * @text 間隔
 * @type number
 * @default 4
 * @desc 残像を生成する間隔です。1/60秒単位で設定してください。
 * 
 * @param Opacity
 * @text 不透明度
 * @type number
 * @max 255
 * @default 255
 * @desc 残像を生成する際の不透明度です。
 * 
 * @param Color
 * @text 色調
 * @type string
 * @default [0, 0, 0, 0]
 * @desc 残像の色調です。例：[128, 128, 255, 255]
 * 
 * @param BlendMode
 * @text 合成方法
 * @type select
 * @option 0:通常 @value 0
 * @option 1:加算 @value 1
 * @option 2:乗算 @value 2
 * @option 3:スクリーン @value 3
 * @default 0
 * @desc 残像の合成方法です。
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

const PLUGIN_NAME = "NRP_Afterimage";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pDuration = toNumber(parameters["Duration"], 30);
const pInterval = toNumber(parameters["Interval"], 4);
const pOpacity = toNumber(parameters["Opacity"], 255);
const pColor = parameters["Color"];
const pBlendMode = toNumber(parameters["BlendMode"], 0);

// 残像ＩＤの連番
let mAfterimageSeq = 0;

//-----------------------------------------------------------------------------
// Battler_Afterimage
//
// バトラーの残像を管理するクラス

function Battler_Afterimage() {
    this.initialize(...arguments);
}

Battler_Afterimage.prototype = Object.create(Game_Battler.prototype);
Battler_Afterimage.prototype.constructor = Battler_Afterimage;

/**
 * ●初期化
 */
Battler_Afterimage.prototype.initialize = function(battler) {
    // 紐付け用の残像ＩＤを設定する。
    this._afterimageId = mAfterimageSeq;
    battler._afterimageId = mAfterimageSeq;
    // 連番を加算
    mAfterimageSeq++;
};

/**
 * ●残像の親となるバトラーを取得する。
 */
Battler_Afterimage.prototype.battler = function() {
    return BattleManager.allBattleMembers().find(battler => battler._afterimageId == this._afterimageId);
};

/**
 * ●残像処理の開始
 */
Battler_Afterimage.prototype.start = function() {
    // 間隔チェック用のカウンタ
    this._checkInterval = 0;

    // 表示時間
    this._duration = pDuration;
    // 表示間隔
    this._interval = pInterval;
    // 標準の不透明度
    this._opacity = pOpacity;
    // 色調
    if (pColor) {
        this._color = eval(pColor);
    }
    // 合成方法
    this._blendMode = pBlendMode;

    const spriteset = getSpriteset();
    let battlerSprite = spriteset.findTargetSprite(this.battler());
    // タイミングによってはアクターを取得できないことがあるので、更新して再取得
    if (!battlerSprite && this.battler().isActor() && spriteset.updateActors) {
        spriteset.updateActors();
        battlerSprite = spriteset.findTargetSprite(this.battler());
    }

    battlerSprite._afterimages = [];
    battlerSprite._makeAfterimage = true;

    this._isActive = true;
};

/**
 * ●残像処理の終了
 */
Battler_Afterimage.prototype.end = function() {
    const battlerSprite = getSpriteset().findTargetSprite(this.battler());
    battlerSprite._makeAfterimage = false;

    this._isActive = false;
};

/**
 * ●残像作成チェック
 */
Battler_Afterimage.prototype.check = function() {
    if (!this.isActive()) {
        return false;
    }

    let check = false;

    if (this._checkInterval == 0) {
        check = true;
    }
    
    this._checkInterval++;
    if (this._checkInterval >= this._interval) {
        this._checkInterval = 0;
    }
        
    return check;
};

/**
 * ●残像を実行中かどうか？
 */
Battler_Afterimage.prototype.isActive = function() {
    return this._isActive;
};

/**
 * ●表示時間を取得
 */
Battler_Afterimage.prototype.duration = function() {
    return this._duration;
};

/**
 * ●表示時間を設定
 */
Battler_Afterimage.prototype.setDuration = function(duration) {
    this._duration = duration;
};

/**
 * ●間隔を取得
 */
Battler_Afterimage.prototype.interval = function() {
    return this._interval;
};

/**
 * ●間隔を設定
 */
Battler_Afterimage.prototype.setInterval = function(interval) {
    this._interval = interval;
};

/**
 * ●不透明度を取得
 */
Battler_Afterimage.prototype.opacity = function() {
    return this._opacity;
};

/**
 * ●不透明度を設定
 */
Battler_Afterimage.prototype.setOpacity = function(opacity) {
    this._opacity = opacity;
};

/**
 * ●色調を取得
 */
Battler_Afterimage.prototype.color = function() {
    return this._color;
};

/**
 * ●色調を設定
 */
Battler_Afterimage.prototype.setColor = function(color) {
    this._color = color;
};

/**
 * ●合成方法を設定
 */
Battler_Afterimage.prototype.blendMode = function() {
    return this._blendMode;
};

/**
 * ●合成方法を設定
 */
Battler_Afterimage.prototype.setBlendMode = function(blendMode) {
    this._blendMode = blendMode;
};

//-----------------------------------------------------------------------------
// Sprite_BattlerAfterimage
//
// アクターの残像となるスプライトクラス

function Sprite_BattlerAfterimage() {
    this.initialize(...arguments);
}

Sprite_BattlerAfterimage.prototype = Object.create(Sprite_Battler.prototype);
Sprite_BattlerAfterimage.prototype.constructor = Sprite_BattlerAfterimage;

Sprite_BattlerAfterimage.prototype.initialize = function(parent) {
    Sprite.prototype.initialize.call(this);
    this.initMembers();
    this._parent = parent;
    this.setBattler(parent._battler);
};

/**
 * ●更新
 */
Sprite_BattlerAfterimage.prototype.update = function() {
    // 不透明度を減算
    this.opacity -= (this._initialOpacity / this._duration);
};

/**
 * ●不透明度の設定
 */
Sprite_BattlerAfterimage.prototype.setOpacity = function(opacity) {
    this.opacity = opacity;
};

/**
 * ●初期不透明度の設定
 */
Sprite_BattlerAfterimage.prototype.setInitialOpacity = function(opacity) {
    this._initialOpacity = opacity;
};

/**
 * ●持続時間の設定
 */
Sprite_BattlerAfterimage.prototype.setDuration = function(duration) {
    this._duration = duration;
};

/**
 * ●位置の設定
 */
Sprite_BattlerAfterimage.prototype.setPosition = function(x, y) {
    this.x = x;
    this.y = y;
};

//-----------------------------------------------------------------------------
// Sprite_ActorAfterimage
//
// アクターの残像となるスプライトクラス

function Sprite_ActorAfterimage() {
    this.initialize(...arguments);
}

Sprite_ActorAfterimage.prototype = Object.create(Sprite_BattlerAfterimage.prototype);
Sprite_ActorAfterimage.prototype.constructor = Sprite_ActorAfterimage;

/**
 * ●初期化
 */
Sprite_ActorAfterimage.prototype.initMembers = function() {
    Sprite_Battler.prototype.initMembers.call(this);
    this._battlerName = "";
    this._motion = null;
    this._motionCount = 0;
    this._pattern = 0;
    this.createMainSprite();
};

/**
 * ●本体生成
 */
Sprite_ActorAfterimage.prototype.createMainSprite = function() {
    Sprite_Actor.prototype.createMainSprite.call(this);
};

/**
 * ●バトラーの設定
 */
Sprite_ActorAfterimage.prototype.setBattler = function(battler) {
    Sprite_Battler.prototype.setBattler.call(this, battler);
    this._actor = battler;
};

/**
 * ●画像の設定
 */
Sprite_ActorAfterimage.prototype.setBitmap = function() {
    Sprite_Actor.prototype.updateBitmap.call(this);
}

/**
 * ●画像の切抜位置の設定
 * ※関数名がかぶるので適当
 */
Sprite_ActorAfterimage.prototype.setSetFrame = function() {
    // 本体のモーション＆パターンを反映
    this._motion = this._parent._motion;
    this._pattern = this._parent._pattern;

    Sprite_Actor.prototype.updateFrame.call(this);
};

//-----------------------------------------------------------------------------
// Sprite_EnemyAfterimage
//
// アクターの残像となるスプライトクラス

function Sprite_EnemyAfterimage() {
    this.initialize(...arguments);
}

Sprite_EnemyAfterimage.prototype = Object.create(Sprite_BattlerAfterimage.prototype);
Sprite_EnemyAfterimage.prototype.constructor = Sprite_EnemyAfterimage;

/**
 * ●初期化
 */
Sprite_EnemyAfterimage.prototype.initMembers = function() {
    Sprite_Battler.prototype.initMembers.call(this);
    this._enemy = null;
    this._appeared = false;
    this._battlerName = "";
    this._battlerHue = 0;
    this._effectType = null;
    this._effectDuration = 0;
    this._shake = 0;
};

/**
 * ●バトラーの設定
 */
Sprite_EnemyAfterimage.prototype.setBattler = function(battler) {
    Sprite_Battler.prototype.setBattler.call(this, battler);
    this._enemy = battler;
};

/**
 * ●画像の設定
 */
Sprite_EnemyAfterimage.prototype.setBitmap = function() {
    Sprite_Enemy.prototype.updateBitmap.call(this);
}

/**
 * ●画像の読込
 */
Sprite_EnemyAfterimage.prototype.loadBitmap = function(name) {
    Sprite_Enemy.prototype.loadBitmap.call(this, name);
};

/**
 * ●色相の設定
 */
Sprite_EnemyAfterimage.prototype.setHue = function(hue) {
    Sprite_Enemy.prototype.setHue.call(this, hue);
};

/**
 * ●表示の設定
 */
Sprite_EnemyAfterimage.prototype.initVisibility = function() {
    // 何もしない
};

/**
 * ●画像の切抜位置の設定
 * ※関数名がかぶるので適当
 */
Sprite_EnemyAfterimage.prototype.setSetFrame = function() {
    // 何もしない
};

//-----------------------------------------------------------------------------
// BattleManager
//-----------------------------------------------------------------------------

/**
 * ●変数初期化
 */
const _BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
    _BattleManager_initMembers.apply(this, arguments);

    // 戦闘の度に残像連番をクリア
    mAfterimageSeq = 0;
};

//-----------------------------------------------------------------------------
// Game_Battler
//-----------------------------------------------------------------------------

/**
 * 【独自】残像管理情報の取得
 */
Game_Battler.prototype.afterimage = function() {
    // 外部プラグインなどでonBattleStartを経由しなかった場合、
    // undefinedの可能性があるので初期化する。
    if (!this._afterimage) {
        this._afterimage = new Battler_Afterimage(this);
    }

    return this._afterimage;
};

/**
 * ●戦闘開始時
 */
const _Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
Game_Battler.prototype.onBattleStart = function(advantageous) {
    this._afterimage = new Battler_Afterimage(this);

    _Game_Battler_onBattleStart.apply(this, arguments);
}

/**
 * ●アクション実行終了（バトラー共通）
 */
const _Game_Battler_performActionEnd = Game_Battler.prototype.performActionEnd;
Game_Battler.prototype.performActionEnd = function() {
    const afterimage = this.afterimage();

    // 残像実行中なら終了
    if (afterimage.isActive()) {
        afterimage.end();
    }

    _Game_Battler_performActionEnd.call(this);
};

//-----------------------------------------------------------------------------
// Game_Actor
//-----------------------------------------------------------------------------

/**
 * ●戦闘終了時
 */
const _Game_Actor_onBattleEnd = Game_Actor.prototype.onBattleEnd;
Game_Actor.prototype.onBattleEnd = function() {
    _Game_Actor_onBattleEnd.apply(this, arguments);

    // 不要変数の初期化
    // ※セーブデータに含まない。
    this._afterimage = undefined;
};

//-----------------------------------------------------------------------------
// Spriteset_Battle
//-----------------------------------------------------------------------------

/**
 * ●更新処理
 */
const _Spriteset_Battle_update = Spriteset_Battle.prototype.update;
Spriteset_Battle.prototype.update = function() {
    // removeChild処理を伴うため、個別のupdateに追加するのではなく、
    // 先にまとめて処理を行う。
    // ※要素数が変化するため、処理が飛ばされるSpriteが発生してしまう。
    this.updateAfterimage();

    _Spriteset_Battle_update.apply(this, arguments);
};

/**
 * 【独自】残像の更新処理
 */
Spriteset_Battle.prototype.updateAfterimage = function() {
    for (const sprite of this.battlerSprites()) {
        sprite.updateAfterimage();
    }
};

//-----------------------------------------------------------------------------
// Sprite_Battler
//-----------------------------------------------------------------------------

/**
 * 【独自】残像の状態更新
 */
Sprite_Battler.prototype.updateAfterimage = function() {
    if (!this._makeAfterimage || !this._afterimages) {
        return;
    }

    // 不透明度が０以下になった残像を消去
    const newAfterimages = [];
    for (const afterimage of this._afterimages) {
        // 不透明度が有効な残像だけを新配列に追加
        if (afterimage.opacity > 0) {
            newAfterimages.push(afterimage);
        // それ以外は削除
        } else {
            this.parent.removeChild(afterimage);
        }
    }
    this._afterimages = newAfterimages;

    // 残像管理クラスを取得
    const afterimageManage = this._battler.afterimage();
    if (afterimageManage.check()) {
        // 新しい残像を追加
        this.createAfterimage();
    }
}

/**
 * 【独自】残像を作成する。
 */
Sprite_Battler.prototype.createAfterimage = function() {
    // 残像管理クラスを取得
    const afterimageManage = this._battler.afterimage();

    // 新しい残像を作成
    let afterimage;
    if (this._actor) {
        afterimage = new Sprite_ActorAfterimage(this);
    } else {
        afterimage = new Sprite_EnemyAfterimage(this);
    }

    const bodyMainSprite = getMainSprite(this);
    const afterimageMainSprite = getMainSprite(afterimage);

    // 初期不透明度
    afterimage.setInitialOpacity(afterimageManage.opacity());
    afterimage.setOpacity(afterimageManage.opacity());
    // 持続時間
    afterimage.setDuration(afterimageManage.duration());
    // 本体の情報をコピー
    afterimage.setPosition(this.x, this.y);
    afterimage.setBitmap();
    afterimage.setSetFrame();
    afterimage.scale = this.scale;
    afterimage.rotation = this.rotation;
    
    afterimage.anchor.x = this.anchor.x;
    afterimage.anchor.y = this.anchor.y;
    afterimageMainSprite.anchor.x = bodyMainSprite.anchor.x;
    afterimageMainSprite.anchor.y = bodyMainSprite.anchor.y;

    // 色調設定
    const colorTone = afterimageManage.color()
    if (colorTone) {
        afterimage.setColorTone(colorTone);
    }
    // 合成方法
    afterimage.blendMode = afterimageManage.blendMode();
    // Ｚ座標
    afterimage.z = this.z;
    // 表示優先度の調整のため本体より下に
    afterimage.spriteId = this.spriteId - 0.1;
    // DynamicMotionの空中Ｙ座標
    afterimage._airY = this._airY;

    // 基準点（回転軸）が変更されている場合はズレるので調整
    if (afterimageMainSprite.anchor.y == 0.5) {
        // scaleの変更を考慮
        afterimage.x -= afterimage.width/2 * afterimage.scale.x * Math.sin(afterimage.rotation);
        afterimage.y += afterimage.height/2 * afterimage.scale.y * Math.cos(afterimage.rotation);
    }

    // animatedSVEnemies.jsで動作させている場合は反転
    if (this._battler._animated) {
        afterimage.scale.x *= -1;
    }

    this._afterimages.push(afterimage);
    // 戦闘画面に追加
    this.parent.addChild(afterimage);
};

/**
 * 【独自】残像を消去する。
 */
Sprite_Battler.prototype.removeAfterimage = function() {
    for (const afterimage of this._afterimages) {
        this.parent.removeChild(afterimage);
    }

    this._afterimages = [];
};

//-----------------------------------------------------------------------------
// Character_Afterimage
//
// キャラクターの残像を管理するクラス

function Character_Afterimage() {
    this.initialize(...arguments);
}

Character_Afterimage.prototype = Object.create(Game_Character.prototype);
Character_Afterimage.prototype.constructor = Character_Afterimage;

Character_Afterimage.prototype.initialize = function() {
};

/**
 * ●残像の元となる本体スプライトを取得
 */
Character_Afterimage.prototype.originalSprite = function() {
    const spriteset = getSpriteset();
    return spriteset._characterSprites.find(sprite => sprite._character.afterimage() == this);
};

/**
 * ●残像処理の開始
 */
Character_Afterimage.prototype.start = function() {
    // 間隔チェック用のカウンタ
    this._checkInterval = 0;

    // 表示時間
    this._duration = pDuration;
    // 表示間隔
    this._interval = pInterval;
    // 標準の不透明度
    this._opacity = pOpacity;
    // 色調
    if (pColor) {
        this._color = eval(pColor);
    }
    // 合成方法
    this._blendMode = pBlendMode;

    const characterSprite = this.originalSprite();
    characterSprite._afterimages = [];

    this._isActive = true;
};

/**
 * ●残像処理の終了
 */
Character_Afterimage.prototype.end = function() {
    this._isActive = false;
};

/**
 * ●残像作成チェック
 */
Character_Afterimage.prototype.check = function() {
    if (!this.isActive()) {
        return false;
    }

    let check = false;

    if (this._checkInterval == 0) {
        check = true;
    }
    
    this._checkInterval++;
    if (this._checkInterval >= this._interval) {
        this._checkInterval = 0;
    }
        
    return check;
};

/**
 * ●残像を実行中かどうか？
 */
Character_Afterimage.prototype.isActive = function() {
    return this._isActive;
};

/**
 * ●表示時間を取得
 */
Character_Afterimage.prototype.duration = function() {
    return this._duration;
};

/**
 * ●表示時間を設定
 */
Character_Afterimage.prototype.setDuration = function(duration) {
    this._duration = duration;
};

/**
 * ●間隔を取得
 */
Character_Afterimage.prototype.interval = function() {
    return this._interval;
};

/**
 * ●間隔を設定
 */
Character_Afterimage.prototype.setInterval = function(interval) {
    this._interval = interval;
};

/**
 * ●不透明度を取得
 */
Character_Afterimage.prototype.opacity = function() {
    return this._opacity;
};

/**
 * ●不透明度を設定
 */
Character_Afterimage.prototype.setOpacity = function(opacity) {
    this._opacity = opacity;
};

/**
 * ●色調を取得
 */
Character_Afterimage.prototype.color = function() {
    return this._color;
};

/**
 * ●色調を設定
 */
Character_Afterimage.prototype.setColor = function(color) {
    this._color = color;
};

/**
 * ●合成方法を設定
 */
Character_Afterimage.prototype.blendMode = function() {
    return this._blendMode;
};

/**
 * ●合成方法を設定
 */
Character_Afterimage.prototype.setBlendMode = function(blendMode) {
    this._blendMode = blendMode;
};

//-----------------------------------------------------------------------------
// Sprite_CharacterAfterimage
//
// キャラクターの残像となるスプライトクラス

function Sprite_CharacterAfterimage() {
    this.initialize(...arguments);
}

Sprite_CharacterAfterimage.prototype = Object.create(Sprite_Character.prototype);
Sprite_CharacterAfterimage.prototype.constructor = Sprite_CharacterAfterimage;

Sprite_CharacterAfterimage.prototype.initialize = function(parent) {
    Sprite.prototype.initialize.call(this);
    this.initMembers();
    this._parent = parent;
    this.setCharacter(parent._character);
};

/**
 * ●更新
 */
Sprite_CharacterAfterimage.prototype.update = function() {
    // 不透明度を減算
    this.opacity -= (this._initialOpacity / this._duration);

    // スクロール差分を調整
    this.x -= moveScreenX.bind($gameMap)();
    this.y -= moveScreenY.bind($gameMap)();
};

/**
 * ●不透明度の設定
 */
Sprite_CharacterAfterimage.prototype.setOpacity = function(opacity) {
    this.opacity = opacity;
};

/**
 * ●初期不透明度の設定
 */
Sprite_CharacterAfterimage.prototype.setInitialOpacity = function(opacity) {
    this._initialOpacity = opacity;
};

/**
 * ●持続時間の設定
 */
Sprite_CharacterAfterimage.prototype.setDuration = function(duration) {
    this._duration = duration;
};

/**
 * ●位置の設定
 */
Sprite_CharacterAfterimage.prototype.setPosition = function(x, y) {
    this.x = x;
    this.y = y;
};

/**
 * ●画像の設定
 */
Sprite_CharacterAfterimage.prototype.setBitmap = function() {
    Sprite_Character.prototype.updateBitmap.call(this);
}

/**
 * ●画像の切抜位置の設定
 * ※関数名がかぶるので適当
 */
Sprite_CharacterAfterimage.prototype.setSetFrame = function() {
    Sprite_Character.prototype.updateFrame.call(this);
};

//-----------------------------------------------------------------------------
// Game_Character
//-----------------------------------------------------------------------------

/**
 * 【独自】残像管理情報の取得
 */
Game_Character.prototype.afterimage = function() {
    // 未定義の場合は初期化
    // ※ロード時にCharacter_Afterimageの型が取得できなかった場合も考慮
    if (!(this._afterimage instanceof Character_Afterimage)) {
        this._afterimage = new Character_Afterimage();
    }

    return this._afterimage;
};

/**
 * 【独自】残像情報の初期化
 */
Game_Character.prototype.clearAfterimage = function() {
    this._afterimage = null;
};

//-----------------------------------------------------------------------------
// Spriteset_Map
//-----------------------------------------------------------------------------

/**
 * ●更新処理
 */
const _Spriteset_Map_update = Spriteset_Map.prototype.update;
Spriteset_Map.prototype.update = function() {
    // removeChild処理を伴うため、個別のupdateに追加するのではなく、
    // 先にまとめて処理を行う。
    // ※要素数が変化するため、処理が飛ばされるSpriteが発生してしまう。
    this.updateAfterimage();

    _Spriteset_Map_update.apply(this, arguments);
};

/**
 * 【独自】残像の更新処理
 */
Spriteset_Map.prototype.updateAfterimage = function() {
    for (const sprite of this._characterSprites) {
        sprite.updateAfterimage();
    }
};

//-----------------------------------------------------------------------------
// Sprite_Character
//-----------------------------------------------------------------------------

/**
 * 【独自】残像管理情報の取得
 * ※マップ版DynamicMotionの仕様に合わせるため、スプライトも関数を持つ。
 */
Sprite_Character.prototype.afterimage = function() {
    // 未定義の場合は初期化
    // ※ロード時にCharacter_Afterimageの型が取得できなかった場合も考慮
    if (!(this._character._afterimage instanceof Character_Afterimage)) {
        this._character._afterimage = new Character_Afterimage();
    }
    return this._character._afterimage;
};

/**
 * 【独自】残像の状態更新
 */
Sprite_Character.prototype.updateAfterimage = function() {
    // 残像管理クラスを取得
    const afterimageManage = this.afterimage();
    // 残像が有効な場合
    if (afterimageManage.isActive()) {
        // メニュー開閉などによって、残像データがなくなった場合はクリア
        if (!this._afterimages) {
            this._afterimages = [];
        }
        
    // 残像が無効かつデータがない場合は処理しない。
    // ※無効になっていても、残像が残っている場合は処理する。
    } else if (!this._afterimages || this._afterimages.length == 0) {
        return;
    }

    // 不透明度が０以下になった残像を消去
    const newAfterimages = [];
    for (const afterimage of this._afterimages) {
        // 不透明度が有効な残像だけを新配列に追加
        if (afterimage.opacity > 0) {
            newAfterimages.push(afterimage);
        // それ以外は削除
        } else {
            this.parent.removeChild(afterimage);
        }
    }
    this._afterimages = newAfterimages;

    if (afterimageManage.check()) {
        // 新しい残像を追加
        this.createAfterimage();
    }
}

/**
 * 【独自】残像を作成する。
 */
Sprite_Character.prototype.createAfterimage = function() {
    // 残像管理クラスを取得
    const afterimageManage = this.afterimage();

    // 新しい残像を作成
    const afterimage = new Sprite_CharacterAfterimage(this);

    // 初期不透明度
    afterimage.setInitialOpacity(afterimageManage.opacity());
    afterimage.setOpacity(afterimageManage.opacity());
    // 持続時間
    afterimage.setDuration(afterimageManage.duration());
    // 本体の情報をコピー
    afterimage.setPosition(this.x, this.y);
    afterimage.setBitmap();
    afterimage.setSetFrame();
    afterimage.scale = this.scale;
    afterimage.rotation = this.rotation;
    afterimage.anchor.x = this.anchor.x;
    afterimage.anchor.y = this.anchor.y;
    // 色調設定
    const colorTone = afterimageManage.color()
    if (colorTone) {
        afterimage.setColorTone(colorTone);
    }
    // 合成方法
    afterimage.blendMode = afterimageManage.blendMode();
    // Ｚ座標
    afterimage.z = this.z;
    // 表示優先度の調整のため本体より下に
    afterimage.spriteId = this.spriteId - 0.1;
    // DynamicMotionの空中Ｙ座標
    afterimage._airY = this._airY;

    // 基準点（回転軸）が変更されている場合はズレるので調整
    if (afterimage.anchor.y == 0.5) {
        // scaleの変更を考慮
        afterimage.x -= afterimage.width/2 * afterimage.scale.x * Math.sin(afterimage.rotation);
        afterimage.y += afterimage.height/2 * afterimage.scale.y * Math.cos(afterimage.rotation);
    }

    this._afterimages.push(afterimage);
    // Tilemapに追加
    this.parent.addChild(afterimage);
};

/**
 * 【独自】残像を消去する。
 */
Sprite_Character.prototype.removeAfterimage = function() {
    for (const afterimage of this._afterimages) {
        this.parent.removeChild(afterimage);
    }

    this._afterimages = [];
};

//-----------------------------------------------------------------------------
// DataManager
//-----------------------------------------------------------------------------

/**
 * ●セーブ情報の作成
 */
const _DataManager_makeSaveContents = DataManager.makeSaveContents;
DataManager.makeSaveContents = function() {
    // 残像情報が保存されないようにクリア
    $gamePlayer.clearAfterimage();
    for (const follower of $gamePlayer.followers().data()) {
        follower.clearAfterimage();
    }
    for (const event of $gameMap.events()) {
        event.clearAfterimage();
    }
    for (const vehicle of $gameMap.vehicles()) {
        vehicle.clearAfterimage();
    }

    return _DataManager_makeSaveContents.apply(this, arguments);
};

//-----------------------------------------------------------------------------
// Game_Map
//-----------------------------------------------------------------------------

// スクロール差分計算用
let mBeforeDisplayScreenX = 0;
let mBeforeDisplayScreenY = 0;

/**
 * ●初期化
 */
const _Game_Map_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
    _Game_Map_initialize.apply(this, arguments);

    mBeforeDisplayScreenX = this.displayX() * this.tileWidth();
    mBeforeDisplayScreenY = this.displayY() * this.tileHeight();
};

/**
 * ●更新処理
 */
const _Game_Map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function(sceneActive) {
    // 画面座標を保持
    mBeforeDisplayScreenX = this.displayX() * this.tileWidth();
    mBeforeDisplayScreenY = this.displayY() * this.tileHeight();
    
    _Game_Map_update.apply(this, arguments);
};

/**
 * 【独自】１フレームでスクロールしたスクリーンＸ座標
 * ※NRP_DynamicAnimationMapMZとほぼ同じ関数
 */
function moveScreenX() {
    // 現在の座標と前回の座標を比較し差分を求める。
    const displayScreenX = this.displayX() * this.tileWidth();
    let moveScreenX = displayScreenX - mBeforeDisplayScreenX;

    // マップ全体の横幅（ピクセル）
    const mapWidth = this.width() * this.tileWidth();
    // 全体座標の半分以上を移動した（ループ）
    if (moveScreenX > mapWidth / 2) {
        moveScreenX -= mapWidth;
    } else if (moveScreenX < mapWidth / 2 * -1) {
        moveScreenX += mapWidth;
    }

    return moveScreenX;
};

/**
 * 【独自】１フレームでスクロールしたスクリーンＹ座標
 * ※NRP_DynamicAnimationMapMZとほぼ同じ関数
 */
function moveScreenY() {
    // 現在の座標と前回の座標を比較し差分を求める。
    const displayScreenY = this.displayY() * this.tileHeight();
    let moveScreenY = displayScreenY - mBeforeDisplayScreenY;

    // マップ全体の縦幅（ピクセル）
    const mapHeight = this.height() * this.tileHeight();
    // 全体座標の半分以上を移動した（ループ）
    if (moveScreenY > mapHeight / 2) {
        moveScreenY -= mapHeight;
    } else if (moveScreenY < mapHeight / 2 * -1) {
        moveScreenY += mapHeight;
    }

    return moveScreenY;
};

//----------------------------------------------------------
// 共通関数
//----------------------------------------------------------

/**
 * ●現在の画面のSpritesetを取得する。
 */
function getSpriteset() {
    return SceneManager._scene._spriteset;
}

/**
 * ●本体スプライトを取得
 */
function getMainSprite(sprite) {
    // MVの場合
    if (Utils.RPGMAKER_NAME == "MV") {
        return sprite._effectTarget;
    }
    // MZの場合
    return sprite.mainSprite();
};

//----------------------------------------------------------
// ＭＶ対応
// ※ＭＺにしか存在しない関数を定義
//----------------------------------------------------------

if (!Spriteset_Battle.prototype.findTargetSprite) {
    Spriteset_Battle.prototype.findTargetSprite = function(target) {
        return this.battlerSprites().find(sprite => sprite.checkBattler(target));
    };

    Sprite_Battler.prototype.checkBattler = function(battler) {
        return this._battler === battler;
    };
}

if (!Spriteset_Map.prototype.findTargetSprite) {
    Spriteset_Map.prototype.findTargetSprite = function(target) {
        return this._characterSprites.find(sprite => sprite.checkCharacter(target));
    };

    Sprite_Character.prototype.checkCharacter = function(character) {
        return this._character === character;
    };
}

if (!Game_Followers.prototype.data) {
    Game_Followers.prototype.data = function() {
        return this._data.clone();
    };
}

})();
