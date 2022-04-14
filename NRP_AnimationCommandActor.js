//=============================================================================
// NRP_AnimationCommandActor.js
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc v1.01 Display an animation for the actor at the time of command input.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/477380673.html
 *
 * @help Display an animation for the actor at the time of command input.
 * Mainly in CTB and Time Progress Battles.
 * It is used for the purpose of making it easier
 * to understand the actor you are inputting.
 * 
 * You can set up a start animation or a loop animation.
 * You can also set up sound effects and flashes
 * by adding them to the animation.
 * 
 * For more information, please see below.
 * http://newrpg.seesaa.net/article/477380673.html
 * 
 * <Terms>
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but we will respond to defects as far as possible.
 * 
 * @param startAnimation
 * @type animation
 * @default 0
 * @desc The start animation to be displayed to the actor during command input.
 * 
 * @param startAnimationWait
 * @type number
 * @default 1
 * @desc The wait for displaying the start animation.
 * Specify in 1/60 second increments.
 * 
 * @param startAnimationBackground
 * @type boolean
 * @default false
 * @desc Displays the start animation below the actor.
 * This function requires NRP_DynamicMotion(MV, MZ).
 * 
 * @param loopAnimation
 * @type animation
 * @default 0
 * @desc The loop animation to be displayed to the actor during command input.
 * 
 * @param loopAnimationCycle
 * @type number
 * @default 60
 * @desc The cycle to display a loop animation.
 * Specify in 1/60 second increments.
 * 
 * @param loopAnimationBackground
 * @type boolean
 * @default false
 * @desc Displays the loop animation below the actor.
 * This function requires NRP_DynamicMotion(MV, MZ).
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.01 コマンド入力時のアクターにアニメーションを表示する。
 * @author 砂川赳 (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/477380673.html
 *
 * @help 戦闘でコマンド入力中のアクターの上にアニメーションを表示します。
 * 主にＣＴＢやタイムプログレスバトルなどで、
 * 入力中のアクターを分かりやすくする目的で使います。
 * 
 * 開始アニメーションとループアニメーションの二通りが設定できます。
 * また、アニメーションに付加する形で効果音やフラッシュも設定可能です。
 * 
 * 詳細は以下をご覧ください。
 * http://newrpg.seesaa.net/article/477380673.html
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param startAnimation
 * @text 開始アニメーション
 * @type animation
 * @default 0
 * @desc コマンド入力中のアクターに表示する開始アニメーションです。
 * 
 * @param startAnimationWait
 * @text 開始アニメウェイト
 * @type number
 * @default 1
 * @desc 開始アニメーションを表示する際のウェイトです。
 * 1/60秒単位で指定してください。
 * 
 * @param startAnimationBackground
 * @text 開始アニメの背景表示
 * @type boolean
 * @default false
 * @desc 開始アニメをアクターよりも下に表示します。
 * この機能には、NRP_DynamicMotion(MV, MZ)が必要です。
 * 
 * @param loopAnimation
 * @text ループアニメーション
 * @type animation
 * @default 0
 * @desc コマンド入力中のアクターに表示するループアニメーションです。
 * 
 * @param loopAnimationCycle
 * @text ループアニメ表示周期
 * @type number
 * @default 60
 * @desc ループアニメーションを表示する周期です。
 * 1/60秒単位で指定してください。
 * 
 * @param loopAnimationBackground
 * @text ループアニメの背景表示
 * @type boolean
 * @default false
 * @desc ループアニメをアクターよりも下に表示します。
 * この機能には、NRP_DynamicMotion(MV, MZ)が必要です。
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

const parameters = PluginManager.parameters("NRP_AnimationCommandActor");
const pStartAnimation = toNumber(parameters["startAnimation"]);
const pStartAnimationWait = Math.max(toNumber(parameters["startAnimationWait"], 1), 1);
const pStartBackground = toBoolean(parameters["startAnimationBackground"], false);
const pLoopAnimation = toNumber(parameters["loopAnimation"]);
const pLoopAnimationCycle = toNumber(parameters["loopAnimationCycle"], 60);
const pLoopBackground = toBoolean(parameters["loopAnimationBackground"], false);

const _Sprite_Actor_initMembers = Sprite_Actor.prototype.initMembers;
Sprite_Actor.prototype.initMembers = function() {
    _Sprite_Actor_initMembers.apply(this, arguments);

    this._startAnimationCount = 0;
    this._loopAnimationCount = pStartAnimationWait * -1;
};

const _Sprite_Actor_updateMain = Sprite_Actor.prototype.updateMain;
Sprite_Actor.prototype.updateMain = function() {
    _Sprite_Actor_updateMain.apply(this, arguments);

    // 除外条件を満たす場合は処理しない
    if (exceptCondition(this)) {
        // カウントが進んでいたらループアニメ削除
        if (this._startAnimationCount > 0) {
            removeLoopAnimation();
        }

        this._startAnimationCount = 0;
        // 開始アニメのウェイト分、ループアニメの開始を遅らせる。
        this._loopAnimationCount = pStartAnimationWait * -1;
        return;
    }

    // 開始アニメーション呼出
    if (this._startAnimationCount == 0 && pStartAnimation) {
        callAnimation(this, pStartAnimation, pStartBackground);
    }

    // ループアニメーション呼出
    if (this._loopAnimationCount == 0 && pLoopAnimation) {
        // アニメーション呼出
        callAnimation(this, pLoopAnimation, pLoopBackground);
    }

    this._startAnimationCount++;
    this._loopAnimationCount++;
    // 周期が来たらリセット
    if (this._loopAnimationCount >= pLoopAnimationCycle) {
        this._loopAnimationCount = 0;
    }
};

/**
 * ●表示中のループアニメーションを削除する。
 */
function removeLoopAnimation() {
    let animation = getAnimation(pLoopAnimation);

    // MVの場合
    // ※各バトラースプライトにアニメーションが紐づく
    if (Utils.RPGMAKER_NAME == "MV") {
        var battlerSprites =
            BattleManager._spriteset._actorSprites.concat(BattleManager._spriteset._enemySprites);
        
        // 全バトラースプライトを対象にループ
        for (const battlerSprite of battlerSprites) {

            // 削除対象のアニメーションを一旦格納
            let removeList = battlerSprite._animationSprites.filter(function (spriteAnimation) {
                // 再生中のループアニメ
                return spriteAnimation._animation == animation;
            });

            // 全削除
            for (const spriteAnimation of removeList) {
                // removeしたら、なんかフリーズすることがあるのでとりあえずdurationを0にして対応。
                // （適当ですまそ。）
                spriteAnimation._duration = 0;
                // spriteAnimation.remove();
            }
        }

    // MZの場合
    // ※BattleManager._spritesetにアニメーションが紐づく
    } else {
        const animationSprites = BattleManager._spriteset._animationSprites;

        // 削除対象のアニメーションを一旦格納
        // ※直接animationSpritesをforループして削除するとindexがずれてうまくいかないため。
        let removeList = animationSprites.filter(function (spriteAnimation) {
            // 再生中のループアニメ
            return spriteAnimation._animation == animation;
        });
    
        // 全削除
        for (const spriteAnimation of removeList) {
            // フラッシュ状態解除
            for (const target of spriteAnimation._targets) {
                target.setBlendColor([0, 0, 0, 0]);
                target.show();
            }
    
            // アニメーション削除
            BattleManager._spriteset.removeAnimation(spriteAnimation);
        }
    }
}

/**
 * ●除外とする条件
 */
function exceptCondition(spriteActor) {
    const actor = spriteActor._actor;
    // 入力中ではない。
    // アクタースプライトが有効でない。
    // 移動中である。
    if (!BattleManager.isInputting()
            || !actor.isInputting()
            || !actor.isSpriteVisible()
            || spriteActor.isMoving()) {
        return true;
    }

    // または選択中のアクターではない
    if (BattleManager.actor() != actor) {
        return true;
    }

    return false;
}

/**
 * ●アニメーション呼び出しを行う。
 * MV, MZの両方に対応
 */
function callAnimation(battlerSprite, animationId, background) {
    const battler = battlerSprite._actor;

    // MVの場合
    if (Utils.RPGMAKER_NAME == "MV") {
        var animation = $dataAnimations[animationId];
        var sprite = new Sprite_Animation();
        sprite.setup(battlerSprite._effectTarget, animation, battler.isActor(), 0);
        battlerSprite.parent.addChild(sprite);
        battlerSprite._animationSprites.push(sprite);
        for (var i = 0; i < battlerSprite._animationSprites.length; i++) {
            var tmpSprite = battlerSprite._animationSprites[i];
            tmpSprite.visible = battlerSprite._battler.isSpriteVisible();
        }
        // 背景表示
        if (background) {
            sprite.z = 0;
        }

    // MZの場合
    } else {
        let animation = getAnimation(animationId);
        createAnimationSprite([battler], animation, false, 0, background);
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
 * MZ用のアニメーション呼び出し
 */
function createAnimationSprite(targets, animation, mirror, delay, background) {
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
    // 背景表示
    if (background) {
        sprite.z = 0;
    }
}

/**
 * MZの場合
 */
if (Utils.RPGMAKER_NAME != "MV") {
    /**
     * ●アニメーションの実行中判定
     * ※実際にはウェイト判定に使う。
     */
    const _Spriteset_Base_isAnimationPlaying = Spriteset_Base.prototype.isAnimationPlaying;
    Spriteset_Base.prototype.isAnimationPlaying = function() {
        // 全てのアニメーションがnoWaitならば待たない。
        // これによって、当プラグインによるアニメーションのウェイトをなくす。
        if (this._animationSprites.length > 0
                && this._animationSprites.every(sprite => sprite._noWait)) {
            return false;
        }

        return _Spriteset_Base_isAnimationPlaying.apply(this, arguments);
    };
}

/**
 * ●アニメーションを取得
 */
function getAnimation(animationId) {
    let animation = $dataAnimations[animationId];

    // MZの場合
    if (Utils.RPGMAKER_NAME != "MV") {
        //---------------------------------------
        // MZ ver1.4.0より$dataAnimations内に
        // ＭＶデータが含まれるようになったので考慮
        //---------------------------------------
        // MZのMV用アニメーションではない。
        // かつ、MZ用アニメーションが空で
        // $dataMvAnimationsが有効ならMV用アニメーションを取得
        if (!isMVAnimation(animation)
                && isEmptyAnimation(animation)
                && typeof $dataMvAnimations !== 'undefined') {
            animation = $dataMvAnimations[animationId];
        }
    }

    return animation;
}

})();
