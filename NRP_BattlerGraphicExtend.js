//=============================================================================
// NRP_BattlerGraphicExtend.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.051 Extend the graphics of the battler.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/500642681.html
 *
 * @help Extend the graphics of the battler.
 * 
 * This plugin is based on BattlerGraphicExtend.js by Triacontane
 * and adjusted for DynamicMotion.
 * 
 * It has reduced functionality compared to the original plugin.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Include the following in the note of the object
 * that holds the trait. (actor, enemy, class, equipment, state)
 * 
 * ◆Battler's Tone Change
 * <BattlerTone:r,g,b,g>
 * r:Red g:Green b:Blue(-255..255) g:Gray(0..255)
 * 
 * - Example(Bright Red): <BattlerTone:255,-255,-255,0>
 * - Example(Gray)      : <BattlerTone:0,0,0,255>
 * 
 * ◆Battler's Flash
 * <BattlerFlash:r,g,b,a>
 * r:Red g:Green b:Blue a:Strength(0..255)
 * 
 * ◆Battler's Flash Interval
 * <BattlerFlashInterval:f>
 * f:Number of frames (Default:90)
 * 
 * ◆Battler's Flash Priority
 * <BattlerFlashPriority:p>
 * p:Priority (Default:0)
 * 
 * ◆Battler's motion speed
 * <BattlerMotionRate:n>
 * n:Rate(100%)
 * 
 * - Example: <BattlerMotionRate:150>
 * ※This setting is valid only for actors.
 * 
 * -------------------------------------------------------------------
 * [Flash Specifications]
 * -------------------------------------------------------------------
 * If multiple flashes are set up on the battler,
 * the flashes will alternate from red to blue to green to red again.
 * 
 * However, if a priority (<BattlerFlashPriority>) is set for a flash,
 * only the flash with the highest priority will be displayed (alternately).
 * 
 * Also, if the plugin parameter “PriorityByInterval” is turned on,
 * only the flash with the shortest interval will be given priority.
 * 
 * -------------------------------------------------------------------
 * [Script]
 * -------------------------------------------------------------------
 * You can flash battler with the following.
 * battler.startFlash([r,g,b,a], f);
 * r:Red g:Green b:Blue a:Strength(0..255) f:Number of frames
 * 
 * For example, if you want the target to flash red (30 frames)
 * in DynamicAnimation, the following would be used.
 * 
 * <D-Animation>
 * script = b.startFlash([255,0,0,255], 30);
 * </D-Animation>
 * 
 * -------------------------------------------------------------------
 * [Terms]
 * -------------------------------------------------------------------
 * Like BattlerGraphicExtend.js, it is subject to the MIT License.
 * http://opensource.org/licenses/mit-license.php
 * 
 * @------------------------------------------------------------------
 * @ Plugin Parameters
 * @------------------------------------------------------------------
 * 
 * @param FlashType
 * @type select
 * @option 0:Half @value 0
 * @option 1:All @value 1
 * @default 0
 * @desc Flash display method.
 * If half, at least half of the color is left.
 * 
 * @param FlashInterval
 * @type number
 * @default 90
 * @desc Default value for flash interval.
 * Set in 1/60 second increments.
 * 
 * @param PriorityByInterval
 * @type boolean
 * @default false
 * @desc If multiple flash settings exist, only the one with the shortest interval is displayed.
 * 
 * @param NoFlashStateIcon
 * @type boolean
 * @default false
 * @desc Separating the enemy's state icon from the body removes it from the flash.
 * 
 * @param StateIconZ
 * @parent NoFlashStateIcon
 * @type number
 * @default 9
 * @desc Specifies the Z coordinate of the icon if NoFlashStateIcon is on.
 * 
 * @param StateIconAdjustX
 * @parent NoFlashStateIcon
 * @type number @min -999
 * @default -4
 * @desc Adjusts the X coordinate of the icon when the state icon is not flashed.
 * 
 * @param StateIconAdjustY
 * @parent NoFlashStateIcon
 * @type number @min -999
 * @default 10
 * @desc Adjusts the Y coordinate of the icon when the state icon is not flashed.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.051 バトラーのグラフィックを拡張します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/500642681.html
 *
 * @help バトラーのグラフィックを拡張します。
 * 
 * 当プラグインはトリアコンタン様のBattlerGraphicExtend.jsを元に
 * DynamicMotion用に調整したものです。
 * 
 * 競合を最小限に抑えるため、
 * オリジナルのプラグインよりも機能は縮小されています。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * 特徴を保有するオブジェクト（アクター、エネミー、職業、装備、ステート）
 * のメモ欄に以下を記載してください。
 * 
 * ◆バトラーの色調変更
 * <BattlerTone:r,g,b,g>
 * r:赤 g:緑 b:青(-255..255) g:グレー(0..255)
 * 
 * ・例（真っ赤）：<BattlerTone:255,-255,-255,0>
 * ・例（灰色）：<BattlerTone:0,0,0,255>
 * 
 * ◆バトラーのフラッシュ
 * <BattlerFlash:r,g,b,a>
 * r:赤 g:緑 b:青 a:強さ(0..255)
 * 
 * ◆バトラーのフラッシュ間隔
 * <BattlerFlashInterval:f>
 * f:フレーム数（標準は90）
 * 
 * ◆バトラーのフラッシュ優先度
 * <BattlerFlashPriority:p>
 * p:優先度（初期値は0）
 * 
 * ◆バトラーのモーション速度
 * <BattlerMotionRate:n>
 * n:倍率(100%)
 * 
 * ・例：<BattlerMotionRate:150>
 * ※この設定はアクターのみ有効です。
 * 
 * -------------------------------------------------------------------
 * ■フラッシュの仕様
 * -------------------------------------------------------------------
 * バトラーに複数のフラッシュの設定がされている場合、
 * 赤→青→緑→赤……というように交互にフラッシュが表示されます。
 * 
 * ただし、フラッシュに優先度（<BattlerFlashPriority>）が設定されている場合は、
 * 最も高い優先度のフラッシュだけが（交互に）表示されます。
 * 
 * また、プラグインパラメータの『間隔による優先設定』をオンにすると、
 * 間隔が最も短いフラッシュだけが優先して表示されるようになります。
 * 
 * -------------------------------------------------------------------
 * ■スクリプト
 * -------------------------------------------------------------------
 * 以下でバトラーをフラッシュさせられます。
 * battler.startFlash([r,g,b,a], f);
 * r:赤 g:緑 b:青 a:強さ(0..255) f:フレーム数
 * 
 * 例えば、DynamicAnimationで、
 * 対象を赤くフラッシュ（30フレーム）させたい場合は以下のようになります。
 * 
 * <D-Animation>
 * script = b.startFlash([255,0,0,255], 30);
 * </D-Animation>
 * 
 * -------------------------------------------------------------------
 * ■利用規約
 * -------------------------------------------------------------------
 * BattlerGraphicExtend.jsと同じく、ＭＩＴライセンスに準じます。
 * http://opensource.org/licenses/mit-license.php
 * 
 * @------------------------------------------------------------------
 * @ プラグインパラメータ
 * @------------------------------------------------------------------
 * 
 * @param FlashType
 * @text フラッシュ方式
 * @type select
 * @option 0:半分 @value 0
 * @option 1:全部 @value 1
 * @default 0
 * @desc フラッシュの表示方式です。
 * 半分ならば、最低でも色を半分残します。
 * 
 * @param FlashInterval
 * @text フラッシュ間隔
 * @type number
 * @default 90
 * @desc フラッシュの間隔の初期値です。
 * 1/60秒単位で設定してください。
 * 
 * @param PriorityByInterval
 * @text 間隔による優先設定
 * @type boolean
 * @default false
 * @desc 複数のフラッシュ設定が存在する場合、間隔が短いものだけを表示します。
 * 
 * @param NoFlashStateIcon
 * @text ｽﾃｰﾄｱｲｺﾝを光らせない
 * @type boolean
 * @default false
 * @desc 敵キャラのステートアイコンを本体と分離することでフラッシュの対象から外します。
 * 
 * @param StateIconZ
 * @parent NoFlashStateIcon
 * @text ステートアイコンＺ座標
 * @type number
 * @default 9
 * @desc ステートアイコンを光らせない場合にアイコンのＺ座標を指定します。
 * 
 * @param StateIconAdjustX
 * @parent NoFlashStateIcon
 * @text ｽﾃｰﾄｱｲｺﾝＸ座標調整
 * @type number @min -999
 * @default -4
 * @desc ステートアイコンを光らせない場合にアイコンのＸ座標を調整します。
 * 
 * @param StateIconAdjustY
 * @parent NoFlashStateIcon
 * @text ｽﾃｰﾄｱｲｺﾝＹ座標調整
 * @type number @min -999
 * @default 10
 * @desc ステートアイコンを光らせない場合にアイコンのＹ座標を調整します。
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

const PLUGIN_NAME = "NRP_BattlerGraphicExtend";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pFlashType = toNumber(parameters["FlashType"]);
const pFlashInterval = toNumber(parameters["FlashInterval"], 90);
const pPriorityByInterval = toBoolean(parameters["PriorityByInterval"], false);
const pNoFlashStateIcon = toBoolean(parameters["NoFlashStateIcon"], false);
const pStateIconZ = toNumber(parameters["StateIconZ"], 9);
const pStateIconAdjustX = toNumber(parameters["StateIconAdjustX"], 0);
const pStateIconAdjustY = toNumber(parameters["StateIconAdjustY"], 0);

// ----------------------------------------------------------------------------
// Game_BattlerBase
// ----------------------------------------------------------------------------

/**
 * ●初期化
 */
const _Game_BattlerBase_initMembers = Game_BattlerBase.prototype.initMembers;
Game_BattlerBase.prototype.initMembers = function() {
    _Game_BattlerBase_initMembers.apply(this, arguments);
    this._tone = null;
    this._motionRate = null;
    this.refreshGraphicInfo();
};

const _Game_BattlerBase_refresh = Game_BattlerBase.prototype.refresh;
Game_BattlerBase.prototype.refresh = function() {
    _Game_BattlerBase_refresh.apply(this, arguments);
    this.refreshGraphicInfo();
};

const _Game_BattlerBase_addNewState = Game_BattlerBase.prototype.addNewState;
Game_BattlerBase.prototype.addNewState = function(stateId) {
    _Game_BattlerBase_addNewState.apply(this, arguments);
    this.refreshGraphicInfo();
};

const _Game_BattlerBase_eraseState = Game_BattlerBase.prototype.eraseState;
Game_BattlerBase.prototype.eraseState = function(stateId) {
    _Game_BattlerBase_eraseState.apply(this, arguments);
    this.refreshGraphicInfo();
};

const _Game_BattlerBase_clearStates = Game_BattlerBase.prototype.clearStates;
Game_BattlerBase.prototype.clearStates = function() {
    _Game_BattlerBase_clearStates.apply(this, arguments);
    this.refreshGraphicInfo();
};

/**
 * 【独自】画像情報を更新
 */
Game_BattlerBase.prototype.refreshGraphicInfo = function() {
    if (!this._actorId && !this._enemyId) return;
    this.refreshTone();
    this.refreshBlendColor();
    this.refreshMotionRate();
    this._refreshExecute = true;
};

/**
 * 【独自】モーション速度をリフレッシュ
 */
Game_BattlerBase.prototype.refreshMotionRate = function() {
    const rate = getMetaValue(this, "BattlerMotionRate");
    this._motionRate = rate || 100;
};

/**
 * 【独自】色調をリフレッシュ
 */
Game_BattlerBase.prototype.refreshTone = function() {
    const tone = getMetaValue(this, "BattlerTone")
    this._tone = tone ? getArgArrayNumber(tone) : null;
};

/**
 * 【独自】色調（フラッシュ用）をリフレッシュ
 */
Game_BattlerBase.prototype.refreshBlendColor = function() {
    let battlerFlashList = [];
    let maxPriority = 0;

    const objects = getTraitObjects(this);
    for (const object of objects) {
        const flashValue = object.meta.BattlerFlash;
        if (flashValue != null) {
            // 設定値がある場合はそちらを優先
            const interval = object.meta.BattlerFlashInterval || pFlashInterval;
            const priority = toNumber(object.meta.BattlerFlashPriority, 0);
            battlerFlashList.push({color: getArgArrayNumber(flashValue), interval: interval, priority: priority});
            // 最大優先度を求める。
            maxPriority = Math.max(maxPriority, priority);
        }
    }

    // フラッシュデータが最低一つ設定されている場合
    if (battlerFlashList.length > 0) {
        // 最大優先度のデータに限定
        battlerFlashList = battlerFlashList.filter(data => data.priority == maxPriority);
        // 間隔による優先設定
        if (pPriorityByInterval) {
            // 最小間隔を求めて設定
            let minInterval = Infinity;
            for (const data of battlerFlashList) {
                minInterval = Math.min(minInterval, data.interval);
            }
            battlerFlashList = battlerFlashList.filter(data => data.interval == minInterval);
        }
        this._battlerFlashList = battlerFlashList;
    // ない場合はクリア
    } else {
        this._battlerFlashList = null;
    }
};

/**
 * 【独自】色調を取得
 */
Game_BattlerBase.prototype.getTone = function() {
    return this._tone;
};

/**
 * 【独自】フラッシュ用のリストを取得
 */
Game_BattlerBase.prototype.getBattlerFlashList = function() {
    return this._battlerFlashList;
};


/**
 * 【独自】色調（フラッシュ用）を取得
 */
Game_BattlerBase.prototype.getBlendColor = function() {
    return this._blendColor;
};

/**
 * 【独自】色調（フラッシュ用）間隔を取得
 */
Game_BattlerBase.prototype.getBlendColorInterval = function() {
    return this._blendColorInterval;
};

/**
 * 【独自】モーション速度倍率を取得
 */
Game_BattlerBase.prototype.getMotionRate = function() {
    if (!this._motionRate) {
        return this._motionRate;
    }
    return this._motionRate / 100;
};

/**
 * 【独自】リフレッシュを実行するか？
 */
Game_BattlerBase.prototype.isRefreshExecuted = function() {
    return this._refreshExecute;
};

// ----------------------------------------------------------------------------
// Game_Battler
// ----------------------------------------------------------------------------

/**
 * 【独自】フラッシュ開始
 */
Game_Battler.prototype.startFlash = function(color, duration) {
    const sprite = getSprite(this);
    sprite.startFlash(color, duration);
};

// ----------------------------------------------------------------------------
// Sprite_Battler
// ----------------------------------------------------------------------------

/**
 * ●更新
 */
const _Sprite_Battler_update = Sprite_Battler.prototype.update;
Sprite_Battler.prototype.update = function() {
    if (this._battler) {
        this.updateProperty();
        this.updateFlash();
    }
    _Sprite_Battler_update.apply(this, arguments);
};

/**
 * 【独自】フラッシュ開始
 */
Sprite_Battler.prototype.startFlash = function(color, duration) {
    this._flashColor = color.clone();
    this._flashDuration = duration;
};

/**
 * 【独自】フラッシュの更新
 */
Sprite_Battler.prototype.updateFlash = function() {
    if (this._flashDuration > 0) {
        const d = this._flashDuration--;
        this._flashColor[3] *= (d - 1) / d;
        this.setBlendColor(this._flashColor);
    }
};

/**
 * 【独自】要素更新
 */
Sprite_Battler.prototype.updateProperty = function() {
    const battler = this._battler;
    if (!battler.isRefreshExecuted()) {
        battler.refreshGraphicInfo();
    }
    if (!this.isNeedDeadEffect()) {
        this.updateTone();
        this.updateBlendColor();
    }
};

/**
 * 【独自】色調更新
 */
Sprite_Battler.prototype.updateTone = function() {
    const sprite = this.getMainSprite();
    const tone = this._battler.getTone();

    // 色調が設定されている場合
    if (tone) {
        sprite.setColorTone(tone);
        this._oldTone = tone;

    // 色調が未設定かつ、前回の色調が設定されている
    // →つまり、色調がクリアされたと判断
    } else if (this._oldTone) {
        sprite.setColorTone([0, 0, 0, 0]);
        this._oldTone = null;
    }
};

/**
 * 【独自】色調（フラッシュ用）を更新
 */
Sprite_Battler.prototype.updateBlendColor = function() {
    if (this._battler._deactivateSelect) {
        return;
    }

    const sprite = this.getMainSprite();
    let flashList = this._battler.getBattlerFlashList();

    // フラッシュが未設定
    if (!flashList) {
        // 前回の色調が設定されている。
        if (this._prevFlashList) {
            // 色調クリア
            flashList = [];
        // 前回の色調が未設定。
        } else {
            // 何も処理しない。
            return;
        }
    }

    // フラッシュ状態が更新された時
    if (!flashList.equals(this._prevFlashList)) {
        this._prevFlashList = flashList;
        this._frameCount = 0;
        this._flashListIndex = 0;
    }

    // 現在のフラッシュがリストの何番目か？
    if (!this._flashListIndex) {
        this._flashListIndex = 0;
    }

    const flashData = flashList[this._flashListIndex];
    
    // 取得できない場合は一巡したのでリセット
    if (!flashData) {
        this._frameCount = 0;
        this._flashListIndex = 0;
        sprite.setBlendColor([0,0,0,0]);
        return;
    }

    const color = flashData.color;
    const realBlendColor = color.clone();
    const interval = flashData.interval;

    // 全部
    if (pFlashType == 1) {
        realBlendColor[3]  = Math.floor(color[3] * (Math.sin(-Math.PI/2 + 2 * Math.PI * this._frameCount / interval) + 1) / 2);
    // 半分（本来のBattlerGraphicExtend.jsに近い挙動）
    } else {
        realBlendColor[3]  = color[3] / 2 + Math.floor(color[3] * (Math.sin(-Math.PI/2 + 2 * Math.PI * this._frameCount / interval) + 1) / 4);
    }

    // モバイル時なら8フレームに１回更新
    if (!Utils.isMobileDevice() || this._frameCount % 8 === 0) {
        // 色調変更実行
        sprite.setBlendColor(realBlendColor);
    }
    this._frameCount++;

    // １フラッシュが終わったら次へ
    if (this._frameCount / interval > 1) {
        this._frameCount = 0;
        this._flashListIndex++;
    }
};

/**
 * 【独自】戦闘不能時のエフェクトが必要か？
 */
Sprite_Battler.prototype.isNeedDeadEffect = function() {
    return false;
};

/**
 * 【独自】メインスプライトを取得
 */
Sprite_Battler.prototype.getMainSprite = function() {
    return this._mainSprite ? this._mainSprite : this;
};

// ----------------------------------------------------------------------------
// Sprite_Actor
// ----------------------------------------------------------------------------

/**
 * ●モーション速度
 */
const _Sprite_Actor_motionSpeed = Sprite_Actor.prototype.motionSpeed;
Sprite_Actor.prototype.motionSpeed = function() {
    if (this._battler && this._battler.getMotionRate() != null) {
        return _Sprite_Actor_motionSpeed.apply(this, arguments) / this._battler.getMotionRate();
    }
    return _Sprite_Actor_motionSpeed.apply(this, arguments);
};

// ----------------------------------------------------------------------------
// Sprite_Enemy
// ----------------------------------------------------------------------------

/**
 * 【独自】戦闘不能時のエフェクトが必要か？
 */
Sprite_Enemy.prototype.isNeedDeadEffect = function() {
    return !this._appeared;
};

// ----------------------------------------------------------------------------
// 敵キャラのステートアイコンの独立
// ----------------------------------------------------------------------------

if (pNoFlashStateIcon) {
    // spriteset保持用
    let mSpriteset = null;

    /**
     * ●敵キャラの作成
     */
    const _Spriteset_Battle_createEnemies = Spriteset_Battle.prototype.createEnemies;
    Spriteset_Battle.prototype.createEnemies = function() {
        // 戦闘開始時はSceneManagerから取得できないのでここで設定
        mSpriteset = this;
        _Spriteset_Battle_createEnemies.apply(this, arguments);
        mSpriteset = null;
    };

    /**
     * ●ステートアイコンの作成
     */
    const _Sprite_Enemy_createStateIconSprite = Sprite_Enemy.prototype.createStateIconSprite;
    Sprite_Enemy.prototype.createStateIconSprite = function() {
        _Sprite_Enemy_createStateIconSprite.apply(this, arguments);

        // mSpritesetが取得できるならそのまま使用。
        // 空でもSceneManagerから取得できる場合はそちらを使う。
        // ※途中出現の場合を想定
        const spriteset = mSpriteset || getSpriteset();

        if (spriteset) {
            // 新しいステートアイコンを作成する。
            this._stateIconSprite2 = new Sprite_StateIcon();
            // Sprite_Enemyではなく、battleFieldに追加することで、
            // 色調変更の影響を受けないようにする。
            spriteset._battleField.addChild(this._stateIconSprite2);
            // Ｚ座標を設定
            this._stateIconSprite2.z = pStateIconZ;
            // 本来のステートアイコンは非表示
            this._stateIconSprite.visible = false;
            this._stateIconSprite2.visible = true;
        }
    };

    /**
     * ●バトラー情報のセット
     */
    const _Sprite_Enemy_setBattler = Sprite_Enemy.prototype.setBattler;
    Sprite_Enemy.prototype.setBattler = function(battler) {
        _Sprite_Enemy_setBattler.apply(this, arguments);

        if (this._stateIconSprite2) {
            this._stateIconSprite2.setup(battler);
        }
    };

    /**
     * ●ステート画像の更新
     */
    const _Sprite_Enemy_updateStateSprite = Sprite_Enemy.prototype.updateStateSprite;
    Sprite_Enemy.prototype.updateStateSprite = function() {
        _Sprite_Enemy_updateStateSprite.apply(this, arguments);

        if (this._stateIconSprite2) {
            this._stateIconSprite2.x = this.x + this.parent.x + this._stateIconSprite.x + pStateIconAdjustX;
            this._stateIconSprite2.y = this.y + this.parent.y + this._stateIconSprite.y + pStateIconAdjustY;
        }
    };
}

// ----------------------------------------------------------------------------
// 共通関数
// ----------------------------------------------------------------------------

/**
 * ●特徴を保持するオブジェクトを取得
 */
function getTraitObjects(battler) {
    // メモ欄を参照するオブジェクトを全取得
    let traitObjects = battler.traitObjects();
    return traitObjects;
}

/**
 * ●Meta値を取得
 */
function getMetaValue(a, metaName) {
    const objects = getTraitObjects(a);
    for (const object of objects) {
        const metaValue = object.meta[metaName];
        if (metaValue != null) {
            return metaValue;
        }
    }
    return null;
}

/**
 * ●文字列を配列に変換
 */
function getArgArrayNumber(text) {
    return text.split(',').map(function (value) {
        return parseInt(value);
    })
}

/**
 * ●バトラーからスプライトを取得する。
 */
function getSprite(battler) {
    const spriteset = getSpriteset();
    if (!spriteset) {
        return undefined;
    }
    
    const sprites = spriteset.battlerSprites();
    return sprites.find(function(sprite) {
        return sprite._battler == battler;
    });
}

/**
 * ●現在の画面のSpritesetを取得する。
 */
function getSpriteset() {
    return SceneManager._scene._spriteset;
}

})();
