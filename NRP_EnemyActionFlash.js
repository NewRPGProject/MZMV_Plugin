//=============================================================================
// NRP_EnemyActionFlash.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.011 Adjust the flash when the enemy acts.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/500973022.html
 *
 * @help Adjust the flash when the enemy acts.
 * Flash strength, duration, delay (wait), etc. can be set.
 * 
 * -------------------------------------------------------------------
 * [Note of Skills]
 * -------------------------------------------------------------------
 * When executing a skill, it does not perform a flash of the enemy.
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
 * @-----------------------------------------------------
 * @ [Plugin Parameters]
 * @-----------------------------------------------------
 * 
 * @param FlashStrong
 * @type number
 * @default 128
 * @desc The strength of the enemy's flash.
 * Enter 255 as the maximum.
 * 
 * @param FlashDuration
 * @type number
 * @default 16
 * @desc The length of the enemy's flash.
 * 1 corresponds to 1/60 second.
 * 
 * @param EnemyAnimationBaseDelay
 * @type number
 * @default 8
 * @desc This is the basic delay when the enemy acts.
 * This value is the waiting time for the flash.
 * 
 * @param ActorAnimationBaseDelay
 * @type number
 * @desc This is the basic delay when the actor acts.
 * Basically, it is not necessary and should be 0.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.011 敵の行動時のフラッシュを調整します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/500973022.html
 *
 * @help 敵の行動時のフラッシュを調整します。
 * フラッシュの強さ、時間、ディレイ（ウェイト）などを設定できます。
 * 
 * -------------------------------------------------------------------
 * ■スキルのメモ欄
 * -------------------------------------------------------------------
 * <NoEnemyActionFlash>
 * スキル実行時、敵キャラのフラッシュを禁止します。
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
 * @param FlashStrong
 * @text フラッシュの強さ
 * @type number
 * @default 128
 * @desc 敵のフラッシュの強さです。
 * 255を最大として入力してください。
 * 
 * @param FlashDuration
 * @text フラッシュの長さ
 * @type number
 * @default 16
 * @desc 敵のフラッシュの長さです。
 * 1が1/60秒に相当します。
 * 
 * @param EnemyAnimationBaseDelay
 * @text 敵の基本ディレイ
 * @type number
 * @default 8
 * @desc 敵行動時の基本ディレイです。1が1/60秒に相当。
 * 初期値は8。この値がフラッシュの待ち時間になります。
 * 
 * @param ActorAnimationBaseDelay
 * @text アクターの基本ディレイ
 * @type number
 * @desc アクター行動時の基本ディレイです。1が1/60秒に相当。
 * 初期値は8ですが、基本的に不要なので0でよいと思います。
 */
(function() {
"use strict";

function toNumber(str, def) {
    if (str == undefined || str == "") {
        return def;
    }
    return isNaN(str) ? def : +(str || def);
}
function toBoolean(str, def) {
    if (str === true || str === "true") {
        return true;
    } else if (str === false || str === "false") {
        return false;
    }
    return def;
}

const PLUGIN_NAME = "NRP_EnemyActionFlash";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pFlashStrong = toNumber(parameters["FlashStrong"], 128);
const pFlashDuration = toNumber(parameters["FlashDuration"], 16);
const pEnemyAnimationBaseDelay = toNumber(parameters["EnemyAnimationBaseDelay"], 8);
const pActorAnimationBaseDelay = toNumber(parameters["ActorAnimationBaseDelay"]);

// ----------------------------------------------------------------------------
// Spriteset_Battle
// ----------------------------------------------------------------------------

/**
 * ●アニメーション開始時の基本ディレイ
 */
const _Spriteset_Battle_animationBaseDelay = Spriteset_Battle.prototype.animationBaseDelay;
Spriteset_Battle.prototype.animationBaseDelay = function() {
    const subject = BattleManager._subject;
    if (subject) {
        // 敵キャラの基本ディレイ
        if (subject.isEnemy() && pEnemyAnimationBaseDelay != null) {
            return pEnemyAnimationBaseDelay;
        // アクターの基本ディレイ
        } else if (subject.isActor() && pActorAnimationBaseDelay != null) {
            return pActorAnimationBaseDelay;
        }
    }
    return _Spriteset_Battle_animationBaseDelay.apply(this, arguments);
};

// ----------------------------------------------------------------------------
// Sprite_Enemy
// ----------------------------------------------------------------------------

/**
 * 【上書】フラッシュ開始
 */
Sprite_Enemy.prototype.startWhiten = function() {
    this._effectDuration = pFlashDuration;
};

/**
 * 【上書】フラッシュの更新
 */
Sprite_Enemy.prototype.updateWhiten = function() {
    const alpha = pFlashStrong - (pFlashDuration - this._effectDuration) * (pFlashStrong / pFlashDuration);
    this.setBlendColor([255, 255, 255, alpha]);
};

/**
 * ●フラッシュ開始
 */
const _Sprite_Enemy_startWhiten = Sprite_Enemy.prototype.startWhiten;
Sprite_Enemy.prototype.startWhiten = function() {
    const action = BattleManager._action
    // フラッシュ禁止の場合
    if (action && action.item().meta.NoEnemyActionFlash) {
        // 0にすると特定条件下でフリーズするので1を設定
        // ※1でも点滅はしないので問題なし。
        this._effectDuration = 1;
        return;
    }
    _Sprite_Enemy_startWhiten.apply(this, arguments);
};

})();
