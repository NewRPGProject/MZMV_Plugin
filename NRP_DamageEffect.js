//=============================================================================
// NRP_DamageEffect.js
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc v1.05 Change the effect of damage handling.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/475586753.html
 *
 * @help Change the effect of damage handling.
 * 
 * -------------------------------------------------------------------
 * [What you can do]
 * -------------------------------------------------------------------
 * 1. enable/disable enemy & actor blinking effects.
 * 2. Play an animation during critical or weak.
 * 3. Change color and size of damage number during critical or weak.
 * 4. change the position of the damage popup.
 * 
 * Effective from ver1.02, a staging for resistance has been added.
 * Initially, "Resist1" is assumed to be halved
 * and "Resist2" is assumed to be disabled.
 * 
 * -------------------------------------------------------------------
 * [Additional Weak Conditions]
 * -------------------------------------------------------------------
 * In addition to the elements, it is possible to determine weaknesses.
 * 
 * ◆Note of Skill
 * Fill in the following in the note for the skill.
 * Weakness direction will be performed when the conditions are met.
 * 
 * <WeakCondition: [Condition]>
 * 
 * e.g.: if the state is number 100, it is judged as a weakness.
 * <WeakCondition:b.isStateAffected(100)>
 * 
 * However, it does not affect the damage formula of the skill.
 * 
 * ◆Damage Formula
 * When using <WeakCondition>,
 * the following functions can be incorporated into the formula.
 * 
 * $weakRate(a, b, [Rate])
 * 
 * e.g.: Damage doubled when <WeakCondition> conditions are met.
 * (a.atk * 4 - b.def * 2) * $weakRate(a, b, 2)
 * 
 * ◆Cooperation with NRP_TraitsEX.js
 * If you work with NRP_TraitsEX.js,
 * you can also set up weak effects for weapons and other items.
 * https://newrpg.seesaa.net/article/488957733.html
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
 * @param <Blink>
 * 
 * @param enemyBlink
 * @parent <Blink>
 * @type boolean
 * @default true
 * @desc Blink the enemy on damage.
 * The default value is true.
 * 
 * @param actorBlink
 * @parent <Blink>
 * @type boolean
 * @default false
 * @desc Blink the actor on damage.
 * The default value is false.
 * 
 * @param blinkDuration
 * @parent <Blink>
 * @type number
 * @default 20
 * @desc Blinking time. The default value is 20.
 * 
 * @param <Critical>
 * 
 * @param criticalAnimation
 * @parent <Critical>
 * @type animation
 * @desc When critical, this animation plays back to the target.
 * Formula is allowed (Text). (e.g.:target.isEnemy() ? 1 : 2)
 * 
 * @param criticalBlinkOff
 * @parent <Critical>
 * @type boolean
 * @default false
 * @desc When critical, the target will not blink.
 * If you want to leave the effect to animation only.
 * 
 * @param criticalDamageColor
 * @parent <Critical>
 * @type string
 * @desc The color of the damage value on a critical hit.
 * e.g.:[255,255,255,255] (Red, Green, Blue, Strength)
 * 
 * @param criticalDamageScale
 * @parent <Critical>
 * @type number @decimals 2
 * @desc The size of the damage value on a critical hit.
 * Please set it by a multiplier based on 1.00.
 * 
 * @param <Weak>
 * 
 * @param weakAnimation
 * @parent <Weak>
 * @type animation
 * @desc When weak, this animation plays back to the target.
 * Formula is allowed (Text). (e.g.:target.isEnemy() ? 1 : 2)
 * 
 * @param weakBlinkOff
 * @parent <Weak>
 * @type boolean
 * @default false
 * @desc When weak, the target will not blink.
 * If you want to leave the effect to animation only.
 * 
 * @param weakCondition
 * @parent <Weak>
 * @type string
 * @default 150 <= action.calcElementRate(target) * 100
 * @desc The condition for staging weaknesses.
 * The initial value must be 150% effective or higher.
 * 
 * @param weakDamageColor
 * @parent <Weak>
 * @type string
 * @desc The color of the damage value at the weak.
 * e.g.:[255,255,255,255] (Red, Green, Blue, Strength)
 * 
 * @param weakDamageScale
 * @parent <Weak>
 * @type number @decimals 2
 * @desc The size of the damage value at the weak.
 * Please set it by a multiplier based on 1.00.
 * 
 * @param <Resist1>
 * 
 * @param resistAnimation1
 * @parent <Resist1>
 * @type animation
 * @desc When resist, this animation plays back to the target.
 * Formula is allowed (Text). (e.g.:target.isEnemy() ? 1 : 2)
 * 
 * @param resistBlinkOff1
 * @parent <Resist1>
 * @type boolean
 * @default false
 * @desc When resist, the target will not blink.
 * If you want to leave the effect to animation only.
 * 
 * @param resistCondition1
 * @parent <Resist1>
 * @type string
 * @default 50 >= action.calcElementRate(target) * 100
 * @desc The condition for staging resistance.
 * The default value is less than 50% validity.
 * 
 * @param resistDamageColor1
 * @parent <Resist1>
 * @type string
 * @desc The color of the damage value at the time of resist.
 * e.g.:[255,255,255,255] (Red, Green, Blue, Strength)
 * 
 * @param resistDamageScale1
 * @parent <Resist1>
 * @type number @decimals 2
 * @desc The size of the damage value when resist.
 * Please set it by a multiplier based on 1.00.
 * 
 * @param <Resist2>
 * 
 * @param resistAnimation2
 * @parent <Resist2>
 * @type animation
 * @desc When resist, this animation plays back to the target.
 * Formula is allowed (Text). (e.g.:target.isEnemy() ? 1 : 2)
 * 
 * @param resistBlinkOff2
 * @parent <Resist2>
 * @type boolean
 * @default false
 * @desc When resist, the target will not blink.
 * If you want to leave the effect to animation only.
 * 
 * @param resistCondition2
 * @parent <Resist2>
 * @type string
 * @default 0 == action.calcElementRate(target) * 100
 * @desc The condition for staging resistance.
 * The initial value is conditional on 0% validity.
 * 
 * @param resistDamageColor2
 * @parent <Resist2>
 * @type string
 * @desc The color of the damage value at the time of resist.
 * e.g.:[255,255,255,255] (Red, Green, Blue, Strength)
 * 
 * @param resistDamageScale2
 * @parent <Resist2>
 * @type number @decimals 2
 * @desc The size of the damage value when resist.
 * Please set it by a multiplier based on 1.00.
 * 
 * @param <Critical & Weak>
 * 
 * @param effectPrioritity
 * @parent <Critical & Weak>
 * @type select
 * @option Critical Priority @value critical
 * @option Weak Priority @value weak
 * @option Both @value both
 * @default critical
 * @desc Priority for critical/weakness effects.
 * Which is the priority if it occurs at the same time?
 * 
 * @param <Damage Position>
 * 
 * @param enemyDamageOffsetX
 * @parent <Damage Position>
 * @type string
 * @desc Adjustment to the X for displaying enemy damage popups.
 * You can use a formula. The default value is 0.
 * 
 * @param enemyDamageOffsetY
 * @parent <Damage Position>
 * @type string
 * @desc Adjustment to the Y for displaying enemy damage popups.
 * You can use a formula. The default value is -8.
 * 
 * @param actorDamageOffsetX
 * @parent <Damage Position>
 * @type string
 * @desc Adjustment to the X for displaying actor damage popups.
 * You can use a formula. The default value is -32.
 * 
 * @param actorDamageOffsetY
 * @parent <Damage Position>
 * @type string
 * @desc Adjustment to the Y for displaying actor damage popups.
 * You can use a formula. The default value is 0.
 * 
 * @param damageDistanceX
 * @parent <Damage Position>
 * @type number @min -999 @max 999
 * @desc The distance between damages (X coordinate).
 * Default: 8
 * 
 * @param damageDistanceY
 * @parent <Damage Position>
 * @type number @min -999 @max 999
 * @desc The distance between damages (Y coordinate).
 * Default: 16
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.05 ダメージ処理の演出を変更します。
 * @author 砂川赳 (http://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/475586753.html
 *
 * @help ダメージ処理の演出を変更します。
 *
 * -------------------------------------------------------------------
 * ■できること
 * -------------------------------------------------------------------
 * ・敵味方の点滅演出の有効・無効化
 * ・会心や弱点時にアニメーションで演出
 * ・会心や弱点時にダメージの文字色やサイズを変更
 * ・ダメージポップアップの表示位置を変更
 * 
 * ver1.02より、耐性時の演出を追加しました。
 * 初期状態では耐性演出１は半減、
 * 耐性演出２は無効を想定しています。
 * 
 * -------------------------------------------------------------------
 * ■追加の弱点判定
 * -------------------------------------------------------------------
 * 属性以外にも弱点の判定を行うことができます。
 * 
 * ◆スキルのメモ欄
 * スキルのメモ欄に以下を記入すると、
 * 指定した条件の場合に弱点演出を行います。
 * 
 * <WeakCondition:条件>
 * 
 * 例：ステート100番ならば、弱点として判定
 * <WeakCondition:b.isStateAffected(100)>
 * 
 * ただし、スキルのダメージ計算式には影響しません。
 * 
 * ◆ダメージ計算式
 * <WeakCondition>を使う場合、以下の式を計算式に組み込むと便利です。
 * 
 * $weakRate(a, b, 倍率)
 * 
 * 例：<WeakCondition>の条件を満たした場合にダメージ２倍
 * (a.atk * 4 - b.def * 2) * $weakRate(a, b, 2)
 * 
 * ◆NRP_TraitsEX.jsとの連携
 * NRP_TraitsEX.jsとの連携によって、弱点演出を行う武器なども設定できます。
 * https://newrpg.seesaa.net/article/488957733.html
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
 * @param <Blink>
 * @text ＜点滅演出＞
 * 
 * @param enemyBlink
 * @text 敵を点滅
 * @parent <Blink>
 * @type boolean
 * @default true
 * @desc ダメージ時に敵を点滅させます。
 * 初期値はtrueです。
 * 
 * @param actorBlink
 * @text アクターを点滅
 * @parent <Blink>
 * @type boolean
 * @default false
 * @desc ダメージ時にアクターを点滅させます。
 * 初期値はfalseです。
 * 
 * @param blinkDuration
 * @text 点滅時間
 * @parent <Blink>
 * @type number
 * @default 20
 * @desc 点滅時間です。初期値は20です。
 * 
 * @param <Critical>
 * @text ＜会心演出＞
 * 
 * @param criticalAnimation
 * @text 会心時のアニメ
 * @parent <Critical>
 * @type animation
 * @desc 会心時、対象に再生するアニメーションです。
 * 数式可（テキスト）。例：target.isEnemy() ? 1 : 2
 * 
 * @param criticalBlinkOff
 * @text 会心時の点滅オフ
 * @parent <Critical>
 * @type boolean
 * @default false
 * @desc 会心時、対象を点滅させません。
 * アニメーションのみに演出を任せたい場合。
 * 
 * @param criticalDamageColor
 * @text 会心時の文字色
 * @parent <Critical>
 * @type string
 * @desc 会心時のダメージ数値の色です。
 * 例：[255,255,255,255]（赤、緑、青、強さ）
 * 
 * @param criticalDamageScale
 * @text 会心時の文字倍率
 * @parent <Critical>
 * @type number @decimals 2
 * @desc 会心時のダメージ数値の大きさです。
 * 1.00を基準に倍率で設定してください。
 * 
 * @param <Weak>
 * @text ＜弱点演出＞
 * 
 * @param weakAnimation
 * @text 弱点時のアニメ
 * @parent <Weak>
 * @type animation
 * @desc 弱点時、対象に再生するアニメーションです。
 * 数式可（テキスト）。例：target.isEnemy() ? 1 : 2
 * 
 * @param weakBlinkOff
 * @text 弱点時の点滅オフ
 * @parent <Weak>
 * @type boolean
 * @default false
 * @desc 弱点時、対象を点滅させません。
 * アニメーションのみに演出を任せたい場合。
 * 
 * @param weakCondition
 * @text 弱点演出を行う条件
 * @parent <Weak>
 * @type string
 * @default 150 <= action.calcElementRate(target) * 100
 * @desc 弱点演出を行う条件です。
 * 初期値は有効度150%以上が条件です。
 * 
 * @param weakDamageColor
 * @text 弱点時の文字色
 * @parent <Weak>
 * @type string
 * @desc 弱点時のダメージの文字色です。
 * 例：[255,255,255,255]（赤、緑、青、強さ）
 * 
 * @param weakDamageScale
 * @text 弱点時の文字倍率
 * @parent <Weak>
 * @type number @decimals 2
 * @desc 弱点時のダメージ文字の大きさです。
 * 1.00を基準に倍率で設定してください。
 * 
 * @param <Resist1>
 * @text ＜耐性演出１＞
 * 
 * @param resistAnimation1
 * @text 耐性時のアニメ１
 * @parent <Resist1>
 * @type animation
 * @desc 耐性時、対象に再生するアニメーションです。
 * 数式可（テキスト）。例：target.isEnemy() ? 1 : 2
 * 
 * @param resistBlinkOff1
 * @text 耐性時の点滅オフ１
 * @parent <Resist1>
 * @type boolean
 * @default false
 * @desc 耐性時、対象を点滅させません。
 * アニメーションのみに演出を任せたい場合。
 * 
 * @param resistCondition1
 * @text 耐性演出を行う条件１
 * @parent <Resist1>
 * @type string
 * @default 50 >= action.calcElementRate(target) * 100
 * @desc 耐性演出を行う条件です。
 * 初期値は有効度50%以下が条件です。
 * 
 * @param resistDamageColor1
 * @text 耐性時の文字色１
 * @parent <Resist1>
 * @type string
 * @desc 耐性時のダメージの文字色です。
 * 例：[255,255,255,255]（赤、緑、青、強さ）
 * 
 * @param resistDamageScale1
 * @text 耐性時の文字倍率１
 * @parent <Resist1>
 * @type number @decimals 2
 * @desc 耐性時のダメージ文字の大きさです。
 * 1.00を基準に倍率で設定してください。
 * 
 * @param <Resist2>
 * @text ＜耐性演出２＞
 * 
 * @param resistAnimation2
 * @text 耐性時のアニメ２
 * @parent <Resist2>
 * @type animation
 * @desc 耐性時、対象に再生するアニメーションです。
 * 数式可（テキスト）。例：target.isEnemy() ? 1 : 2
 * 
 * @param resistBlinkOff2
 * @text 耐性時の点滅オフ２
 * @parent <Resist2>
 * @type boolean
 * @default false
 * @desc 耐性時、対象を点滅させません。
 * アニメーションのみに演出を任せたい場合。
 * 
 * @param resistCondition2
 * @text 耐性演出を行う条件２
 * @parent <Resist2>
 * @type string
 * @default 0 == action.calcElementRate(target) * 100
 * @desc 耐性演出を行う条件です。
 * 初期値は有効度0%が条件です。
 * 
 * @param resistDamageColor2
 * @text 耐性時の文字色２
 * @parent <Resist2>
 * @type string
 * @desc 耐性時のダメージの文字色です。
 * 例：[255,255,255,255]（赤、緑、青、強さ）
 * 
 * @param resistDamageScale2
 * @text 耐性時の文字倍率２
 * @parent <Resist2>
 * @type number @decimals 2
 * @desc 耐性時のダメージ文字の大きさです。
 * 1.00を基準に倍率で設定してください。
 * 
 * @param <Critical & Weak>
 * @text ＜会心／弱点共通＞
 * 
 * @param effectPrioritity
 * @text 会心弱点優先度
 * @parent <Critical & Weak>
 * @type select
 * @option 会心優先 @value critical
 * @option 弱点優先 @value weak
 * @option 両方表示 @value both
 * @default critical
 * @desc 会心／弱点演出の優先度です。
 * 同時に発生した場合にどちらを優先するか。
 * 
 * @param <Damage Position>
 * @text ＜ダメージ表示位置＞
 * 
 * @param enemyDamageOffsetX
 * @text 敵のダメージＸ調整
 * @parent <Damage Position>
 * @type string
 * @desc 敵のダメージ数値を表示するＸ座標の調整分です。
 * 数式使用可。初期値は0です。
 * 
 * @param enemyDamageOffsetY
 * @text 敵のダメージＹ調整
 * @parent <Damage Position>
 * @type string
 * @desc 敵のダメージ数値を表示するＹ座標の調整分です。
 * 数式使用可。初期値は-8です。
 * 
 * @param actorDamageOffsetX
 * @text アクターのダメージＸ調整
 * @parent <Damage Position>
 * @type string
 * @desc アクターのダメージ数値を表示するＸ座標の調整分です。
 * 数式使用可。初期値は-32です。
 * 
 * @param actorDamageOffsetY
 * @text アクターのダメージＹ調整
 * @parent <Damage Position>
 * @type string
 * @desc アクターのダメージ数値を表示するＹ座標の調整分です。
 * 数式使用可。初期値は0です。
 * 
 * @param damageDistanceX
 * @text ダメージ間隔Ｘ
 * @parent <Damage Position>
 * @type number @min -999 @max 999
 * @desc 連続ヒット時のダメージ同士の間隔（Ｘ座標）です。
 * 初期値は8です。
 * 
 * @param damageDistanceY
 * @text ダメージ間隔Ｙ
 * @parent <Damage Position>
 * @type number @min -999 @max 999
 * @desc 連続ヒット時のダメージ同士の間隔（Ｙ座標）です。
 * 初期値は16です。
 */

/**
 * ●弱点によるダメージ倍率
 * ※a, bはeval参照用
 */
function $weakRate(a, b, rate) {
    const action = BattleManager._action;
    if (!action) {
        return 1;
    }
    // 弱点の場合
    if (eval(action.item().meta.WeakCondition)) {
        return rate;
    }
    return 1;
}

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
    return (str != undefined && str.length > 0) ? str : def;
}

const parameters = PluginManager.parameters("NRP_DamageEffect");
// 点滅
const pEnemyBlink = toBoolean(parameters["enemyBlink"], true);
const pActorBlink = toBoolean(parameters["actorBlink"], false);
const pBlinkDuration = toNumber(parameters["blinkDuration"]);
// 会心
const pCriticalAnimation = parameters["criticalAnimation"];
const pCriticalBlinkOff = toBoolean(parameters["criticalBlinkOff"], false);
const pCriticalDamageColor = setDefault(parameters["criticalDamageColor"]);
const pCriticalDamageScale = toNumber(parameters["criticalDamageScale"]);
// 弱点
const pWeakAnimation = parameters["weakAnimation"];
const pWeakBlinkOff = toBoolean(parameters["weakBlinkOff"], false);
const pWeakCondition = parameters["weakCondition"];
const pWeakDamageColor = setDefault(parameters["weakDamageColor"]);
const pWeakDamageScale = toNumber(parameters["weakDamageScale"]);
// 耐性１
const pResistAnimation1 = parameters["resistAnimation1"];
const pResistBlinkOff1 = toBoolean(parameters["resistBlinkOff1"], false);
const pResistCondition1 = parameters["resistCondition1"];
const pResistDamageColor1 = setDefault(parameters["resistDamageColor1"]);
const pResistDamageScale1 = toNumber(parameters["resistDamageScale1"]);
// 耐性２
const pResistAnimation2 = parameters["resistAnimation2"];
const pResistBlinkOff2 = toBoolean(parameters["resistBlinkOff2"], false);
const pResistCondition2 = parameters["resistCondition2"];
const pResistDamageColor2 = setDefault(parameters["resistDamageColor2"]);
const pResistDamageScale2 = toNumber(parameters["resistDamageScale2"]);
// 会心／弱点
const pEffectPrioritity = setDefault(parameters["effectPrioritity"], "critical");
// ダメージ位置
const pEnemyDamageOffsetX = setDefault(parameters["enemyDamageOffsetX"]);
const pEnemyDamageOffsetY = setDefault(parameters["enemyDamageOffsetY"]);
const pActorDamageOffsetX = setDefault(parameters["actorDamageOffsetX"]);
const pActorDamageOffsetY = setDefault(parameters["actorDamageOffsetY"]);
const pDamageDistanceX = toNumber(parameters["damageDistanceX"]);
const pDamageDistanceY = toNumber(parameters["damageDistanceY"]);

// 競合を避けるためのフラグ
var noBlink = false;
var noDamageSound = false;

/***********************************************************
 * ■敵のダメージ演出
 ***********************************************************/
/**
 * ●敵のダメージ演出
 */
var _Game_Enemy_performDamage = Game_Enemy.prototype.performDamage;
Game_Enemy.prototype.performDamage = function() {
    if (!pEnemyBlink) {
        noBlink = true;
    }
    // 会心 or 弱点 or 耐性の演出対象
    if (isEffectTarget(this)) {
        // 通常のダメージ効果音をオフ
        noDamageSound = true;
    }

    _Game_Enemy_performDamage.apply(this, arguments);
    noBlink = false;
    noDamageSound = false;
};

/**
 * ●敵のダメージ効果音
 */
var _SoundManager_playEnemyDamage = SoundManager.playEnemyDamage;
SoundManager.playEnemyDamage = function() {
    if (noDamageSound) {
        return;
    }

    _SoundManager_playEnemyDamage.apply(this, arguments);
};

/**
 * ●点滅開始
 */
var _Sprite_Enemy_startBlink = Sprite_Enemy.prototype.startBlink;
Sprite_Enemy.prototype.startBlink = function() {
    // 点滅時間の設定があれば反映
    if (pBlinkDuration) {
        this._effectDuration = pBlinkDuration;
        return;
    }

    _Sprite_Enemy_startBlink.apply(this, arguments);
};

/***********************************************************
 * ■アクターのダメージ演出
 ***********************************************************/
/**
 * ●アクターの初期化処理
 */
var _Sprite_Actor_initMembers = Sprite_Actor.prototype.initMembers;
Sprite_Actor.prototype.initMembers = function() {
    _Sprite_Actor_initMembers.apply(this, arguments);

    this._effectType = null;
    this._effectDuration = 0;
};

/**
 * ●更新
 */
var _Sprite_Actor_update = Sprite_Actor.prototype.update;
Sprite_Actor.prototype.update = function() {
    _Sprite_Actor_update.apply(this, arguments);

    // エフェクト更新追加
    if (this._actor) {
        this.updateEffect();
    }
};

/**
 * ●ダメージ演出
 */
var _Game_Actor_performDamage = Game_Actor.prototype.performDamage;
Game_Actor.prototype.performDamage = function() {
    // 会心 or 弱点 or 耐性の演出対象
    if (isEffectTarget(this)) {
        // 通常のダメージ効果音をオフ
        noDamageSound = true;
    }

    _Game_Actor_performDamage.apply(this, arguments);
    noDamageSound = false;

    if (pActorBlink) {
        // 点滅開始
        this.requestEffect('blink');
    }
};

/**
 * ●アクターのダメージ効果音
 */
var _SoundManager_playActorDamage = SoundManager.playActorDamage;
SoundManager.playActorDamage = function() {
    if (noDamageSound) {
        return;
    }

    _SoundManager_playActorDamage.apply(this, arguments);
};

/**
 * ●点滅開始
 */
Sprite_Actor.prototype.startBlink = function() {
    // 点滅時間の設定があれば反映
    if (pBlinkDuration) {
        this._effectDuration = pBlinkDuration;
        return;
    }

    // 点滅時間を設定
    this._effectDuration = 20;
};

/**
 * ●エフェクトの設定
 */
Sprite_Actor.prototype.setupEffect = function() {
    if (this._actor.isEffectRequested()) {
        this.startEffect(this._actor.effectType());
        this._actor.clearEffect();
    }
};

/**
 * ●エフェクト開始
 */
Sprite_Actor.prototype.startEffect = function(effectType) {
    this._effectType = effectType;
    switch (this._effectType) {
    case 'blink':
        this.startBlink();
        break;
    }
    // this.revertToNormal();
};

/**
 * ●エフェクト更新
 */
Sprite_Actor.prototype.updateEffect = function() {
    this.setupEffect();
    if (this._effectDuration > 0) {
        this._effectDuration--;
        switch (this._effectType) {
        case 'blink':
            this.updateBlink();
            break;
        }
        if (this._effectDuration === 0) {
            this._effectType = null;
        }
    }
};

/**
 * ●エフェクト判定
 */
Sprite_Actor.prototype.isEffecting = function() {
    return this._effectType !== null;
};

/**
 * ●点滅演出更新
 */
Sprite_Actor.prototype.updateBlink = function() {
    this.opacity = (this._effectDuration % 10 < 5) ? 255 : 0;
};

/***********************************************************
 * ■ダメージ共通部分
 ***********************************************************/
/**
 * ●エフェクト設定
 */
var _Game_Battler_requestEffect = Game_Battler.prototype.requestEffect;
Game_Battler.prototype.requestEffect = function(effectType) {
    // 点滅の場合
    if (effectType == "blink") {
        // 無効フラグが立っている場合は処理しない
        if (noBlink) {
            return;

        // 会心かつ点滅無効なら処理しない
        } else if (isCriticalEffect(this) && pCriticalBlinkOff) {
            return;

        // 弱点かつ点滅無効なら処理しない
        } else if (isWeakEffect(this) && pWeakBlinkOff) {
            return;

        // 耐性２かつ点滅無効なら処理しない
        } else if (isResistEffect2(this) && pResistBlinkOff2) {
            return;

        // 耐性１かつ点滅無効なら処理しない
        } else if (isResistEffect1(this) && pResistBlinkOff1) {
            return;
        }
    }

    _Game_Battler_requestEffect.apply(this, arguments);
};

/**
 * ●属性計算
 */
const _Game_Action_calcElementRate = Game_Action.prototype.calcElementRate;
Game_Action.prototype.calcElementRate = function(target) {
    // ダメージタイプが『なし』ならば計算しない。
    if (this.item().damage.type == 0) {
        return 1;
    }
    return _Game_Action_calcElementRate.apply(this, arguments);
};

/***********************************************************
 * ■会心演出
 ***********************************************************/
/**
 * ●会心演出
 */
var _Window_BattleLog_displayCritical = Window_BattleLog.prototype.displayCritical;
Window_BattleLog.prototype.displayCritical = function(target) {
    const isCriticalFlg = isCriticalEffect(target); // 会心判定
    const isWeakFlg = isWeakEffect(target);         // 弱点判定
    const isResistFlg1 = isResistEffect1(target);   // 耐性判定１
    const isResistFlg2 = isResistEffect2(target);   // 耐性判定２

    // 会心と弱点（耐性）が同時発生した場合
    if (isCriticalFlg && (isWeakFlg || isResistFlg1 || isResistFlg2)) {
        // 会心優先
        if (pEffectPrioritity == "critical") {
            callAnimation(target, eval(pCriticalAnimation), this);
            // 処理終了
            _Window_BattleLog_displayCritical.apply(this, arguments);
            return;

        // 弱点～耐性優先
        } else if (pEffectPrioritity == "weak") {
            // 弱点
            if (isWeakFlg) {
                callAnimation(target, eval(pWeakAnimation), this);
            // 耐性２（耐性１よりも優先）
            } else if (isResistFlg2) {
                callAnimation(target, eval(pResistAnimation2), this);
            // 耐性１
            } else if (isResistFlg1) {
                callAnimation(target, eval(pResistAnimation1), this);
            }

            // 処理終了
            _Window_BattleLog_displayCritical.apply(this, arguments);
            return;
        }
    }

    // それ以外は会心と弱点を別々に処理
    if (isCriticalFlg) {
        callAnimation(target, eval(pCriticalAnimation), this);
    }
    // 弱点
    if (isWeakFlg) {
        callAnimation(target, eval(pWeakAnimation), this);
    // 耐性２（耐性１よりも優先）
    } else if (isResistFlg2) {
        callAnimation(target, eval(pResistAnimation2), this);
    // 耐性１
    } else if (isResistFlg1) {
        callAnimation(target, eval(pResistAnimation1), this);
    }

    _Window_BattleLog_displayCritical.apply(this, arguments);
};

/**
 * ●演出対象とするかどうか？
 */
function isEffectTarget(target) {
    // 会心 or 弱点 or 耐性の演出対象
    if (isCriticalEffect(target)
            || isWeakEffect(target)
            || isResistEffect1(target)
            || isResistEffect2(target)) {
        return true;
    }
    return false;
}

/**
 * ●会心演出を行うかどうか？
 */
function isCriticalEffect(target) {
    // eval参照用
    const action = BattleManager._action;

    // 会心かつアニメーションが設定されている
    if (target.result().critical && pCriticalAnimation) {
        return true;
    }
    return false;
}

/**
 * ●弱点演出を行うかどうか？
 */
function isWeakEffect(target) {
    // eval参照用
    const action = BattleManager._action;

    // ミス、回避、弱点アニメーションの設定がない場合は無効
    if (target.result().missed || target.result().evaded || !pWeakAnimation) {
        return false;

    // ダメージがない場合は無効
    } else if (target.result().hpAffected && target.result().hpDamage <= 0) {
        return false;
    }

    const a = action.subject();
    const b = target;

    if (eval(pWeakCondition)) {
        return true;
    }

    // スキル毎の弱点判定
    const metaWeakCondition = action.item().meta.WeakCondition;
    if (metaWeakCondition && eval(metaWeakCondition)) {
        return true;
    }
    return false;
}

/**
 * ●耐性演出１を行うかどうか？
 */
function isResistEffect1(target) {
    // eval参照用
    const action = BattleManager._action;

    // ミス、回避、弱点アニメーションの設定がない場合は無効
    if (target.result().missed || target.result().evaded || !pResistAnimation1) {
        return false;
    }

    return eval(pResistCondition1);
}

/**
 * ●耐性演出２を行うかどうか？
 */
function isResistEffect2(target) {
    // eval参照用
    const action = BattleManager._action;

    // ミス、回避、弱点アニメーションの設定がない場合は無効
    if (target.result().missed || target.result().evaded || !pResistAnimation2) {
        return false;
    }

    return eval(pResistCondition2);
}

/**
 * ●アニメーション呼び出しを行う。
 * MV, MZの両方に対応
 */
function callAnimation(target, animationId, win) {
    if (!animationId) {
        return;
    }

    // MVの場合
    if (Utils.RPGMAKER_NAME == "MV") {
        target.startAnimation(animationId, target.isActor(), 0);

    // MZの場合
    } else {
        //---------------------------------------
        // MZ ver1.4.0より$dataAnimations内に
        // ＭＶデータが含まれるようになったので考慮
        //---------------------------------------
        let animation = $dataAnimations[animationId];

        // MZのMV用アニメーションではない。
        // かつ、MZ用アニメーションが空で
        // $dataMvAnimationsが有効ならMV用アニメーションを取得
        if (!isMVAnimation(animation)
                && isEmptyAnimation(animation)
                && typeof $dataMvAnimations !== 'undefined') {
            animation = $dataMvAnimations[animationId];
        }

        createAnimationSprite([target], animation, false, 0);
    }
}

/**
 * ●MZアニメーションの情報が空かどうかの判定
 * ※AnimationMv.jsから移植
 */
function isEmptyAnimation(animation) {
    return animation &&
        !animation.effectName &&
        animation.flashTimings.length === 0 &&
        animation.soundTimings.length === 0;
}

/**
 * ●ＭＶアニメーションかどうかの判定
 */
function isMVAnimation(animation) {
    return animation && !!animation.frames;
};

/**
 * ●MZ用のアニメーション呼び出し
 */
function createAnimationSprite(targets, animation, mirror, delay) {
    var spriteSet = BattleManager._spriteset;

    const mv = spriteSet.isMVAnimation(animation);
    const sprite = new (mv ? Sprite_AnimationMV : Sprite_Animation)();
    const targetSprites = spriteSet.makeTargetSprites(targets);
    const baseDelay = spriteSet.animationBaseDelay();
    const previous = delay > baseDelay ? spriteSet.lastAnimationSprite() : null;
    if (spriteSet.animationShouldMirror(targets[0])) {
        mirror = !mirror;
    }
    sprite.targetObjects = targets;
    sprite.setup(targetSprites, animation, mirror, delay, previous);
    spriteSet._effectsContainer.addChild(sprite);
    spriteSet._animationSprites.push(sprite);

    // ウェイトしないためのフラグ
    sprite._noWait = true;
};

// MZの場合
if (Utils.RPGMAKER_NAME != "MV") {
    /**
     * ●アニメーションの実行中判定
     * ※実際にはウェイト判定に使う。
     */
    const _Spriteset_Base_isAnimationPlaying = Spriteset_Base.prototype.isAnimationPlaying;
    Spriteset_Base.prototype.isAnimationPlaying = function() {
        // 全てのアニメーションがnoWaitならば待たない。
        // これによって、演出時のウェイトなくす。
        if (this._animationSprites.length > 0
                && this._animationSprites.every(sprite => sprite._noWait)) {
            return false;
        }

        return _Spriteset_Base_isAnimationPlaying.apply(this, arguments);
    };
}

/***********************************************************
 * ■ダメージ表示位置
 ***********************************************************/
/**
 * ●敵のダメージ表示位置Ｘ
 */
if (pEnemyDamageOffsetX != undefined) {
    Sprite_Enemy.prototype.damageOffsetX = function() {
        const offset = eval(pEnemyDamageOffsetX);
        return offset ? Number(offset) : 0;
    };
}

/**
 * ●敵のダメージ表示位置Ｙ
 */
if (pEnemyDamageOffsetY != undefined) {
    Sprite_Enemy.prototype.damageOffsetY = function() {
        const offset = eval(pEnemyDamageOffsetY);
        return offset ? Number(offset) : 0;
    };
}

/**
 * ●アクターのダメージ表示位置Ｘ
 */
if (pActorDamageOffsetX != undefined) {
    Sprite_Actor.prototype.damageOffsetX = function() {
        const offset = eval(pActorDamageOffsetX);
        return offset ? Number(offset) : 0;
    };
}

/**
 * ●アクターのダメージ表示位置Ｙ
 */
if (pActorDamageOffsetY != undefined) {
    Sprite_Actor.prototype.damageOffsetY = function() {
        const offset = eval(pActorDamageOffsetY);
        return offset ? Number(offset) : 0;
    };
}

/**
 * ●ダメージスプライトの作成
 */
const _Sprite_Battler_createDamageSprite = Sprite_Battler.prototype.createDamageSprite;
Sprite_Battler.prototype.createDamageSprite = function() {
    const last = this._damages[this._damages.length - 1];

    _Sprite_Battler_createDamageSprite.apply(this, arguments);

    if (last) {
        const sprite = this._damages[this._damages.length - 1];
        // 連続ヒット時のダメージ同士の間隔を調整
        if (pDamageDistanceX != null) {
            sprite.x = last.x + pDamageDistanceX;
        }
        if (pDamageDistanceY != null) {
            sprite.y = last.y - pDamageDistanceY;
        }
    }
};

/***********************************************************
 * ■ダメージ表示変更
 ***********************************************************/

// 会心の場合
let mIsDamageCritical = false;
// 弱点の場合
// ※NRP_TraitsEX.jsからも設定される。
let mIsDamageWeak = false;
// 耐性１の場合
let misDamageResist1 = false;
// 耐性２の場合
let misDamageResist2 = false;

/**
 * ●アクション結果の反映
 */
const _Game_Action_apply2 = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    _Game_Action_apply2.apply(this, arguments);

    const action = this; // eval参照用
    const result = target.result();

    if (result.isHit()) {
        // 弱点表示
        if (pWeakDamageColor || pWeakDamageScale) {
            if (eval(pWeakCondition)) {
                result.isDamageWeak = true;
            }

            const a = action.subject();
            const b = target;

            // スキル毎の弱点判定
            const metaWeakCondition = this.item().meta.WeakCondition;
            if (metaWeakCondition && eval(metaWeakCondition)) {
                result.isDamageWeak = true;
            }
        }

        // 耐性１表示
        if (pResistDamageColor1 || pResistDamageScale1) {
            if (eval(pResistCondition1)) {
                result.isDamageResist1 = true;
            }
        }

        // 耐性２表示
        if (pResistDamageColor2 || pResistDamageScale2) {
            if (eval(pResistCondition2)) {
                result.isDamageResist2 = true;
            }
        }
    }
};

/**
 * ●結果の初期化
 */
const _Game_ActionResult_clear = Game_ActionResult.prototype.clear;
Game_ActionResult.prototype.clear = function() {
    _Game_ActionResult_clear.apply(this, arguments);

    // 弱点、耐性判定用の変数
    this.isDamageWeak = false;
    this.isDamageResist1 = false;
    this.isDamageResist2 = false;
};

/**
 * ●ダメージのセットアップ
 */
const _Sprite_Damage_setup = Sprite_Damage.prototype.setup;
Sprite_Damage.prototype.setup = function(target) {
    const result = target.result();

    mIsDamageCritical = result.critical;
    mIsDamageWeak = result.isDamageWeak;
    misDamageResist1 = result.isDamageResist1;
    misDamageResist2 = result.isDamageResist2;
    _Sprite_Damage_setup.apply(this, arguments);
    mIsDamageCritical = false;
    mIsDamageWeak = false;
    misDamageResist1 = false;
    misDamageResist2 = false;
};

/**
 * ●ダメージ数字の作成
 */
const _Sprite_Damage_createDigits = Sprite_Damage.prototype.createDigits;
Sprite_Damage.prototype.createDigits = function(value) {
    _Sprite_Damage_createDigits.apply(this, arguments);

    // 会心時
    if (mIsDamageCritical) {
        if (pCriticalDamageColor) {
            this.setBlendColor(eval(pCriticalDamageColor));
        }
        if (pCriticalDamageScale) {
            this.scale.x = pCriticalDamageScale;
            this.scale.y = pCriticalDamageScale;
        }
    }

    // 弱点時
    if (mIsDamageWeak) {
        if (pWeakDamageColor) {
            this.setBlendColor(eval(pWeakDamageColor));
        }
        if (pWeakDamageScale) {
            this.scale.x = pWeakDamageScale;
            this.scale.y = pWeakDamageScale;
        }
    // 耐性２時
    } else if (misDamageResist2) {
        if (pResistDamageColor2) {
            this.setBlendColor(eval(pResistDamageColor2));
        }
        if (pResistDamageScale2) {
            this.scale.x = pResistDamageScale2;
            this.scale.y = pResistDamageScale2;
        }
    // 耐性１時
    } else if (misDamageResist1) {
        if (pResistDamageColor1) {
            this.setBlendColor(eval(pResistDamageColor1));
        }
        if (pResistDamageScale1) {
            this.scale.x = pResistDamageScale1;
            this.scale.y = pResistDamageScale1;
        }
    }
};

})();
