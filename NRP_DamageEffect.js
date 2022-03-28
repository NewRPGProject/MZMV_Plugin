//=============================================================================
// NRP_DamageEffect.js
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc v1.03 Change the effect of damage handling.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/475586753.html
 *
 * @help Change the effect of damage handling.
 * 
 * [What you can do]
 * 1. enable/disable enemy & actor blinking effects.
 * 2. Play an animation during critical or weak.
 * 3. change the position of the damage popup.
 * 
 * Effective from ver1.02, a staging for resistance has been added.
 * Initially, "Resist1" is assumed to be halved
 * and "Resist2" is assumed to be disabled.
 * 
 * For more information, please see below.
 * http://newrpg.seesaa.net/article/475586753.html
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but we will respond to defects as far as possible.
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
 * @defalt false
 * @desc When critical, the target will not blink.
 * If you want to leave the effect to animation only.
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
 * @defalt false
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
 * @defalt false
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
 * @defalt false
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
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.03 ダメージ処理の演出を変更します。
 * @author 砂川赳 (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/475586753.html
 *
 * @help ダメージ処理の演出を変更します。
 * 
 * ■できること
 * ・敵味方の点滅演出の有効・無効化
 * ・クリティカルや弱点時にアニメーションで演出
 * ・ダメージポップアップの表示位置を変更
 * 
 * ver1.02より、耐性時の演出を追加しました。
 * 初期状態では耐性演出１は半減、
 * 耐性演出２は無効を想定しています。
 * 
 * 詳細は以下をご覧ください。
 * http://newrpg.seesaa.net/article/475586753.html
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
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
 * @text ＜クリティカル演出＞
 * 
 * @param criticalAnimation
 * @text クリティカル時のアニメ
 * @parent <Critical>
 * @type animation
 * @desc クリティカル時、対象に再生するアニメーションです。
 * 数式可（テキスト）。例：target.isEnemy() ? 1 : 2
 * 
 * @param criticalBlinkOff
 * @text クリティカル時の点滅オフ
 * @parent <Critical>
 * @type boolean
 * @defalt false
 * @desc クリティカル時、対象を点滅させません。
 * アニメーションのみに演出を任せたい場合。
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
 * @defalt false
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
 * @defalt false
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
 * @defalt false
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
 * @param <Critical & Weak>
 * @text ＜クリティカル／弱点共通＞
 * 
 * @param effectPrioritity
 * @text クリティカル弱点優先度
 * @parent <Critical & Weak>
 * @type select
 * @option クリティカル優先 @value critical
 * @option 弱点優先 @value weak
 * @option 両方表示 @value both
 * @default critical
 * @desc クリティカル／弱点演出の優先度です。
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
// クリティカル
const pCriticalAnimation = parameters["criticalAnimation"];
const pCriticalBlinkOff = toBoolean(parameters["criticalBlinkOff"], false);
// 弱点
const pWeakAnimation = parameters["weakAnimation"];
const pWeakBlinkOff = toBoolean(parameters["weakBlinkOff"], false);
const pWeakCondition = parameters["weakCondition"];
// 耐性１
const pResistAnimation1 = parameters["resistAnimation1"];
const pResistBlinkOff1 = toBoolean(parameters["resistBlinkOff1"], false);
const pResistCondition1 = parameters["resistCondition1"];
// 耐性２
const pResistAnimation2 = parameters["resistAnimation2"];
const pResistBlinkOff2 = toBoolean(parameters["resistBlinkOff2"], false);
const pResistCondition2 = parameters["resistCondition2"];
// クリティカル／弱点
const pEffectPrioritity = setDefault(parameters["effectPrioritity"], "critical");
// ダメージ位置
const pEnemyDamageOffsetX = setDefault(parameters["enemyDamageOffsetX"]);
const pEnemyDamageOffsetY = setDefault(parameters["enemyDamageOffsetY"]);
const pActorDamageOffsetX = setDefault(parameters["actorDamageOffsetX"]);
const pActorDamageOffsetY = setDefault(parameters["actorDamageOffsetY"]);

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
    // クリティカル or 弱点 or 耐性の演出対象
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
    // クリティカル or 弱点 or 耐性の演出対象
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
 * ■点滅共通部分
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

        // クリティカルかつ点滅無効なら処理しない
        } else if (isCriticalEffect(this) && pCriticalBlinkOff) {
            return;

        // 弱点かつ点滅無効なら処理しない
        } else if (isWeakEffect(this) && pWeakBlinkOff) {
            return;

        // 耐性１かつ点滅無効なら処理しない
        } else if (isResistEffect1(this) && pResistBlinkOff1) {
            return;

        // 耐性２かつ点滅無効なら処理しない
        } else if (isResistEffect2(this) && pResistBlinkOff2) {
            return;
        }
    }

    _Game_Battler_requestEffect.apply(this, arguments);
};

/***********************************************************
 * ■クリティカル演出
 ***********************************************************/
/**
 * ●クリティカル演出
 */
var _Window_BattleLog_displayCritical = Window_BattleLog.prototype.displayCritical;
Window_BattleLog.prototype.displayCritical = function(target) {
    const isCriticalFlg = isCriticalEffect(target); // クリティカル判定
    const isWeakFlg = isWeakEffect(target);         // 弱点判定
    const isResistFlg1 = isResistEffect1(target);   // 耐性判定１
    const isResistFlg2 = isResistEffect2(target);   // 耐性判定２

    // クリティカルと弱点（耐性）が同時発生した場合
    if (isCriticalFlg && (isWeakFlg || isResistFlg1 || isResistFlg2)) {
        // クリティカル優先
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

    // それ以外はクリティカルと弱点を別々に処理
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
    // クリティカル or 弱点 or 耐性の演出対象
    if (isCriticalEffect(target)
            || isWeakEffect(target)
            || isResistEffect1(target)
            || isResistEffect2(target)) {
        return true;
    }
    return false;
}

/**
 * ●クリティカル演出を行うかどうか？
 */
function isCriticalEffect(target) {
    // eval参照用
    const action = BattleManager._action;

    // クリティカルかつアニメーションが設定されている
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

    return eval(pWeakCondition);
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

})();
