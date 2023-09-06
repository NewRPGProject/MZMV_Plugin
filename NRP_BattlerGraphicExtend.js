//=============================================================================
// NRP_BattlerGraphicExtend.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Extend the graphics of the battler.
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
 * Include the following in the note of the object that holds the trait.
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
 * f:Number of frames (standard is 15)
 * 
 * ◆Battler's motion speed
 * <BattlerMotionRate:n> n:倍率(100%)
 * - Example: <BattlerMotionRate:150>
 * ※This setting is valid only for actors.
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
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 バトラーのグラフィックを拡張します。
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
 * 特徴を保有するオブジェクトのメモ欄に以下を記載してください。
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
 * f:フレーム数（標準は15）
 * 
 * ◆バトラーのモーション速度
 * <BattlerMotionRate:n> n:倍率(100%)
 * ・例：<BattlerMotionRate:150>
 * ※この設定はアクターのみ有効です。
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

const PLUGIN_NAME = "NRP_BattlerGraphicExtend";
const parameters = PluginManager.parameters(PLUGIN_NAME);

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
    const flash = getMetaValue(this, "BattlerFlash")
    this._blendColor = flash ? getArgArrayNumber(flash) : null;
    const flashInterval = getMetaValue(this, "BattlerFlashInterval");
    this._blendColorInterval = flashInterval || 15;
};

/**
 * 【独自】色調を取得
 */
Game_BattlerBase.prototype.getTone = function() {
    return this._tone;
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
// Sprite_Battler
// ----------------------------------------------------------------------------

/**
 * ●更新
 */
const _Sprite_Battler_update = Sprite_Battler.prototype.update;
Sprite_Battler.prototype.update = function() {
    if (this._battler) {
        this.updateProperty();
    }
    _Sprite_Battler_update.apply(this, arguments);
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
    let color = this._battler.getBlendColor();

    // 色調が未設定
    if (!color) {
        // 前回の色調が設定されている。
        if (this._prevBlendColor) {
            // 色調クリア
            color = [0,0,0,0]

        // 前回の色調が未設定。
        } else {
            // 何も処理しない。
            return;
        }
    }

    if (!color.equals(this._prevBlendColor)) {
        this._prevBlendColor = color;
        this._frameCount = 0;
    }
    const realBlendColor = color.clone();
    const interval = this._battler.getBlendColorInterval();
    realBlendColor[3]  = color[3] / 2 + Math.floor(color[3] * (Math.sin(this._frameCount / interval) + 1) / 4);
    if (!Utils.isMobileDevice() || this._frameCount % 8 === 0) {
        sprite.setBlendColor(realBlendColor);
    }
    this._frameCount++;
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

})();
