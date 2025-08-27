//=============================================================================
// NRP_MagicReflection.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.03 Extend the specification of magic reflection.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @orderAfter NRP_DamageTiming
 * @url http://newrpg.seesaa.net/article/483027532.html
 *
 * @help Various adjustments can be made regarding
 * the specifications of magic reflection.
 * 
 * - Animation can be specified for the source and destination of reflection.
 * - The reflection destination can be changed
 *   to another side instead of the skill user.
 * - Reflections can be set for each skill type.
 * 　※RPG Maker's standard specification is that skills
 *     with a hit type of "Magic Attack" will be reflected.
 * - Can create skills that disable reflection.
 * 
 * For example, it is possible to perform the famous FF series trick
 * of attacking an enemy by reflecting the overall magic cast on your friends.
 * 
 * -------------------------------------------------------------------
 * [Note of states]
 * -------------------------------------------------------------------
 * If you register it in the "SettingList" of the plugin parameters,
 * you will be able to set reflections conditional on the skill type.
 * For example, you can create a state that reflects only "Special".
 * 
 * Enter the "SettingId" registered in "SettingList"
 * in the note field of the state as shown below.
 * 
 * <MagicRefrection:[SettingId]>
 * 
 * ※Do not include [].
 * ※Unlike the standard, the hit type will be ignored.
 * 
 * -------------------------------------------------------------------
 * [Note of skills]
 * -------------------------------------------------------------------
 * You can create a skill that disables magic reflection
 * by specifying the following in the skill's note field.
 * 
 * <NoMagicRefrection>
 * 
 * In addition, if you set the following,
 * skills will not be reflected during that state.
 * This is intended for cases where you want to prohibit reflection
 * during invincible states such as jumping.
 * 
 * <NoRefrectionState>
 * 
 * -------------------------------------------------------------------
 * [Note of objects]
 * -------------------------------------------------------------------
 * The magic used by the battler will not be reflected
 * if the following is set in the note field of
 * each object (actor, enemy, class, equipment, state, and skill).
 * As for skills, they are passive skills
 * that only need to be learned to be effective.
 * 
 * <IgnoreMagicRefrection>
 * 
 * -------------------------------------------------------------------
 * [Notice]
 * -------------------------------------------------------------------
 * ◆About Sound effect
 * I recommend that you leave the magic reflection sound effect,
 * which can be set in "System2", to be none.
 * It is more natural to leave the sound effects to the reflection animation.
 * 
 * ◆About HighSpeedMode
 * Normally, the reflection process is not fast-paced because the message
 * is displayed one by one and other processes are performed.
 * So, I'm working with a damage timing adjustment plugin (NRP_DamageTiming.js)
 * to make it possible to display reflections at high speed.
 * 
 * When "damageSameTime" of NRP_DamageTiming is turned on,
 * the highspeed mode will be enabled automatically.
 * 
 * Also, delay-related items will only function in highspeed mode.
 * 
 * It is possible to force the mode to switch
 * by setting the plugin parameter "HighSpeedMode", but
 * Please note that this will basically result in unnatural behavior.
 * 
 * ◆About ToOriginalAnimation
 * When "ToOriginalAnimation" is turned on,
 * only the animation set in the skill can be displayed.
 * Please note that when combined with plug-ins such as "DynamicAnimation",
 * even the description in the note field will not be executed.
 * 
 * -------------------------------------------------------------------
 * [About Conflict]
 * -------------------------------------------------------------------
 * This plugin should be placed below the aforementioned NRP_DamageTiming.js.
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
 * @param ReflectAnotherSide
 * @type boolean
 * @default false
 * @desc When reflecting magic, change the target to another side and randomly.
 * 
 * @param ReflectFromAnimation
 * @type animation
 * @desc This animation is displayed to the battler performing the reflection.
 * 
 * @param ReflectToAnimation
 * @type animation
 * @desc This is an animation that is displayed to the battler at the reflection destination.
 * 
 * @param ToOriginalAnimation
 * @type boolean
 * @default false
 * @desc When reflecting magic, the original animation is displayed at the reflection destination.
 * 
 * @param Timing
 * 
 * @param HighSpeedMode
 * @parent Timing
 * @type boolean
 * @desc When on, ignore the delay and wait for the message.
 * Normally, this will be determined automatically and can be left blank.
 * 
 * @param ToBaseDelay
 * @parent Timing
 * @type number
 * @default 30
 * @desc Time difference to display the animation on the reflection.
 * Set this value in 1/60 second increments.
 * 
 * @param NextDelay
 * @parent Timing
 * @type number
 * @default 12
 * @desc Time difference for each object when displaying the reflection animation.
 * 
 * @param Detail
 * 
 * @param SettingList
 * @parent Detail
 * @type struct<Setting>[]
 * @desc This is a list of settings related to magic reflection.
 * Useful when you want to specify detailed conditions.
 */

/*~struct~Setting:
 * @param SettingId
 * @type string
 * @desc The identifier to be specified in the note field of the state.
 * 
 * @param SkillTypes
 * @type number[]
 * @desc This is a skill type that is subject to reflection.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.03 魔法反射の仕様を拡張します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @orderAfter NRP_DamageTiming
 * @url http://newrpg.seesaa.net/article/483027532.html
 *
 * @help 魔法反射の仕様に関して、様々な調整が可能です。
 * 
 * ・反射元、反射先にそれぞれアニメーションを指定可
 * ・反射先をスキル使用者ではなく、別サイドに変更可
 * ・スキルタイプ毎に反射の設定をすることが可能
 * 　※ツクールの標準仕様では、命中タイプが『魔法攻撃』のスキルを反射
 * ・反射無効のスキルを作成可
 * 
 * 例えば、ＦＦシリーズで有名な
 * 「仲間にかけた全体魔法を敵に反射して攻撃」
 * というような芸当も可能となります。
 * 
 * -------------------------------------------------------------------
 * ■ステートのメモ欄
 * -------------------------------------------------------------------
 * プラグインパラメータの『設定リスト』に登録すれば、
 * スキルタイプを条件にして反射の設定が可能となります。
 * 例えば『必殺技』のみを反射するステートなどを作成可能です。
 * 
 * 『設定リスト』に登録した設定ＩＤを
 * 以下のようにステートのメモ欄に記入してください。
 * 
 * <MagicRefrection:[設定ＩＤ]>
 * 
 * ※[]は含めないでください。
 * ※標準とは異なり、命中タイプは無視するようになります。
 * 
 * また、以下を設定するとそのステート中はスキルを反射しなくなります。
 * ジャンプなどの無敵系ステート時に反射を禁止したい場合を想定しています。
 * 
 * <NoRefrectionState>
 * 
 * -------------------------------------------------------------------
 * ■スキルのメモ欄
 * -------------------------------------------------------------------
 * 以下をスキルのメモ欄に指定すれば、
 * 魔法反射を無効化するスキルを作成可能です。
 * 
 * <NoMagicRefrection>
 * 
 * -------------------------------------------------------------------
 * ■オブジェクトのメモ欄
 * -------------------------------------------------------------------
 * 各オブジェクト（アクター、エネミー、職業、装備、ステート、スキル）
 * のメモ欄に以下を設定すればバトラーの使用した魔法が反射されなくなります。
 * スキルについては覚えているだけで、発揮するパッシブスキルとなります。
 * 
 * <IgnoreMagicRefrection>
 * 
 * -------------------------------------------------------------------
 * ■注意点
 * -------------------------------------------------------------------
 * ◆効果音について
 * システム２で設定できる魔法反射の効果音は、
 * なしにしておくことをオススメします。
 * 効果音は反射アニメーションに任せたほうが自然です。
 * 
 * ◆高速化モードについて
 * 通常、反射処理は一体ずつメッセージ表示などの処理が行われるので、テンポが悪いです。
 * そこでダメージタイミングの調整プラグイン（NRP_DamageTiming.js）
 * との連携によって、高速での反射表示を可能としています。
 * 
 * NRP_DamageTimingの『ダメージ一括表示』をオンにすると、
 * 自動で高速化モードが有効となります。
 * 
 * また、ディレイ関連の項目は高速化モード時しか機能しません。
 * 
 * プラグインパラメータの『高速化モード』を設定することで、
 * 強制的にモードを切り替えることが可能ですが、
 * 基本的には不自然な動作になりますので、ご注意ください。
 * 
 * ◆反射先に元アニメを表示について
 * 『反射先に元アニメを表示』をオンにした場合、
 * 表示できるのはスキルに設定されているアニメーションだけです。
 * DynamicAnimationなどのプラグインと組み合わせた場合、
 * メモ欄の記述までは実行されませんので、ご了承ください。
 * 
 * -------------------------------------------------------------------
 * ■競合について
 * -------------------------------------------------------------------
 * このプラグインは前述のNRP_DamageTiming.jsより下に配置してください。
 * 
 * -------------------------------------------------------------------
 * ■利用規約
 * -------------------------------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param ReflectAnotherSide
 * @text 別サイドに反射
 * @type boolean
 * @default false
 * @desc 魔法反射時、別サイドかつランダムに対象を変更します。
 * 
 * @param ReflectFromAnimation
 * @text 反射元のアニメーション
 * @type animation
 * @desc 反射を行うバトラーに表示するアニメーションです。
 * 
 * @param ReflectToAnimation
 * @text 反射先のアニメーション
 * @type animation
 * @desc 反射先のバトラーに表示するアニメーションです。
 * 
 * @param ToOriginalAnimation
 * @text 反射先に元アニメを表示
 * @type boolean
 * @default false
 * @desc 魔法反射時、反射先に本来のアニメーションを表示します。
 * 
 * @param Timing
 * @text タイミング調整
 * 
 * @param HighSpeedMode
 * @parent Timing
 * @text 高速化モード
 * @type boolean
 * @desc オンにするとディレイを無視してメッセージを待ちます。
 * 通常は自動で判断しますので空白でＯＫです。
 * 
 * @param ToBaseDelay
 * @parent Timing
 * @text 反射先の標準ディレイ
 * @type number
 * @default 30
 * @desc 反射先にアニメーションを表示するまでの時間差です。
 * 1/60秒単位で設定してください。
 * 
 * @param NextDelay
 * @parent Timing
 * @text 対象別ディレイ
 * @type number
 * @default 12
 * @desc 反射アニメーションを表示する際の対象毎の時間差です。
 * 1/60秒単位で設定してください。
 * 
 * @param Detail
 * @text 詳細設定
 * 
 * @param SettingList
 * @parent Detail
 * @text 設定リスト
 * @type struct<Setting>[]
 * @desc 魔法反射に関する設定の一覧です。
 * 細かい条件を指定したい場合に有効です。
 */

/*~struct~Setting:ja
 * @param SettingId
 * @text 設定ＩＤ
 * @type string
 * @desc ステートのメモ欄に指定する識別子です。
 * 
 * @param SkillTypes
 * @text スキルタイプ
 * @type number[]
 * @desc 反射の対象とするスキルタイプです。
 */

/*
 * 以下、保留項目
 * @param HideOriginalAnimation
 * @text 元アニメーションを非表示
 * @type boolean
 * @default false
 * @desc 魔法反射時、本来の対象に表示するアニメーションを実行しません。
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

const PLUGIN_NAME = "NRP_MagicReflection";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pReflectAnotherSide = toBoolean(parameters["ReflectAnotherSide"], false);
const pReflectFromAnimation = toNumber(parameters["ReflectFromAnimation"]);
const pReflectToAnimation = toNumber(parameters["ReflectToAnimation"]);
// const pHideOriginalAnimation = toBoolean(parameters["HideOriginalAnimation"], false);
const pToOriginalAnimation = toBoolean(parameters["ToOriginalAnimation"], false);
const pHighSpeedMode = toBoolean(parameters["HighSpeedMode"]);
const pToBaseDelay = toNumber(parameters["ToBaseDelay"], 0);
const pNextDelay = toNumber(parameters["NextDelay"], 0);
const pSettingList = parseStruct2(parameters["SettingList"]);

/**
 * ●効率化のため事前変換
 */
for (const setting of pSettingList) {
    setting.settingId = setting.SettingId;
    setting.skillTypes = JSON.parse(setting.SkillTypes);
}

// 高速化モードを取得
const mHighSpeedMode = getHighSpeedMode();

function getHighSpeedMode() {
    // 高速化モードの指定がある場合は優先
    if (pHighSpeedMode === true || pHighSpeedMode === false) {
        return pHighSpeedMode;
    }

    // NRP_DamageTimingの一括ダメージ表示を取得
    const parameters = PluginManager.parameters("NRP_DamageTiming");
    const damageSameTime = toBoolean(parameters["damageSameTime"], true);

    return damageSameTime;
}

/**
 * ●プラグインの存在チェック
 */
function existPlugin(pluginName) {
    return PluginManager._scripts.some(function(scriptName) {
        return scriptName == pluginName;
    });
}

// ディレイ調整用
let mTotalNextDelay = 0;

/**
 * ●アクション開始
 */
const _Window_BattleLog_startAction = Window_BattleLog.prototype.startAction;
Window_BattleLog.prototype.startAction = function(subject, action, targets) {
    // 変数初期化
    mTotalNextDelay = 0;

    _Window_BattleLog_startAction.apply(this, arguments);
}

const _BattleManager_startAction = BattleManager.startAction;
BattleManager.startAction = function() {
    _BattleManager_startAction.apply(this, arguments);

    // 反射先対象の初期化
    this._reflectTargets = [];
}

/**
 * ●アクション更新（ダメージ処理など）
 */
const _BattleManager_updateAction = BattleManager.updateAction;
BattleManager.updateAction = function() {
    // 対象がなければ
    if (!this._targets.length) {
        // 反射対象が存在する場合、ダメージ処理を実行
        if (this._reflectTargets && this._reflectTargets.length) {
            const reflectTarget = this._reflectTargets.shift();
            // ただし、再反射禁止フラグを立てておく
            this._action._noRefrection = true;
            this.invokeAction(this._subject, reflectTarget);
            this._action._noRefrection = false;
            return;
        }
    }

    _BattleManager_updateAction.apply(this, arguments);
};

/**
 * 【上書】魔法反射処理
 */
BattleManager.invokeMagicReflection = function(subject, target) {
    let reflectToTarget = subject;

    let waitCount = 0;

    // 反射元のアニメーション
    if (pReflectFromAnimation) {
        const animationId = pReflectFromAnimation;

        if (mHighSpeedMode) {
            const delay = mTotalNextDelay;
            callAnimation(target, animationId, delay);
            const animationWait = getAnimationWait(animationId);
            waitCount = Math.max(animationWait, waitCount);

        } else {
            this._logWindow.push('showAnimation', subject, [target], animationId);
        }
    }

    // 反射元の対象（反射ステートの保有者）
    this._action._reflectionTarget = target;
    this._logWindow.displayReflection(target);

    // 逆サイドに乱反射する場合
    if (pReflectAnotherSide) {
        // 反射先のサイドを取得
        const opponentsUnit = target.opponentsUnit();
        // 反射先を変更
        reflectToTarget = opponentsUnit.randomTarget();
    }

    // 反射先の対象が取得できれば適用
    if (reflectToTarget) {
        // ダメージ＆表示処理を削除
        // this._action.apply(reflectToTarget);
        // this._logWindow.displayActionResults(target, reflectToTarget);

        // ターゲットの末尾に反射先を追加
        // ※通常のthis._targetsでは再反射を避けられないので、独自の対象配列を作成。
        this._reflectTargets.push(reflectToTarget);
    }

    // 反射先のアニメーション
    if (pReflectToAnimation && reflectToTarget) {
        const animationId = pReflectToAnimation;

        if (mHighSpeedMode) {
            const delay = pToBaseDelay + mTotalNextDelay;
            callAnimation(reflectToTarget, animationId, delay);
            const animationWait = getAnimationWait(animationId) + delay;
            waitCount = Math.max(animationWait, waitCount);

        } else {
            this._logWindow.push('showAnimation', subject, [reflectToTarget], animationId);
        }
    }

    // 反射先に元アニメーションを表示
    if (pToOriginalAnimation && reflectToTarget) {
        let animationId = this._action.item().animationId;

        const isNormalAttack = animationId < 0;

        // 通常攻撃ならそのアニメーションを取得
        if (isNormalAttack && subject.attackAnimationId1) {
            animationId = subject.attackAnimationId1();
        }
        
        if (mHighSpeedMode) {
            const delay = pToBaseDelay + mTotalNextDelay;
            callAnimation(reflectToTarget, animationId, delay);
            const animationWait = getAnimationWait(animationId) + delay;
            waitCount = Math.max(animationWait, waitCount);

        } else {
            this._logWindow.push('showAnimation', subject, [reflectToTarget], animationId);
        }

        // 通常攻撃かつ二刀流ならそのアニメーションを取得
        if (isNormalAttack && subject.attackAnimationId2) {
            animationId = subject.attackAnimationId2();

            if (mHighSpeedMode) {
                const delay = pToBaseDelay + mTotalNextDelay;
                callAnimation(reflectToTarget, animationId, delay);
                const animationWait = getAnimationWait(animationId) + delay;
                waitCount = Math.max(animationWait, waitCount);

            } else {
                this._logWindow.push('showAnimation', subject, [reflectToTarget], animationId);
            }
        }
    }

    // 高速化モード用のウェイトを設定
    if (mHighSpeedMode) {
        // 最後の一回だけウェイトを挿入（※最長のアニメーションを採用）
        if (this._targets.length == 0) {
            this._logWindow._waitCount = waitCount;
        }

        // 時間差を追加
        mTotalNextDelay += pNextDelay;
    }
};

/**
 * ●アニメーションのウェイト時間を取得
 */
function getAnimationWait(animationId) {
    const spriteAnimation = new Sprite_Animation();
    const animation = $dataAnimations[animationId];
    if (animation) {
        spriteAnimation._animation = animation;
        spriteAnimation.setupRate();
        spriteAnimation.setupDuration();
        return spriteAnimation._duration;
    }

    return 0;
}

//----------------------------------------------------------
// 反射判定の拡張
//----------------------------------------------------------

const _Game_Action_itemMrf = Game_Action.prototype.itemMrf;
Game_Action.prototype.itemMrf = function(target) {
    // 再反射禁止
    if (this._noRefrection) {
        return 0;
    }

    const itemObject = this.item();

    // 魔法反射無効の場合は0を返す
    if (itemObject.meta.NoMagicRefrection) {
        return 0;
    }

    // 反射無効の特徴を取得
    for (const object of getTraitObjects(this.subject())) {
        const ignoreMagicRefrection = object.meta.IgnoreMagicRefrection;
        if (ignoreMagicRefrection) {
            return 0;
        }
    }

    // 反射無効ステートの場合
    if (isNoRefrectionState(target._states)) {
        return 0;
    }

    // 該当の設定が存在するかどうか？
    const setting = getMatchSetting(target._states);
    if (setting) {
        // 設定したスキルタイプと一致した場合、魔法反射率を返す
        if (isMatchSetting(this, setting)) {
            return target.mrf;
        }
        // それ以外は0を返す
        // ※通常の魔法反射判定は行わない。
        return 0;
    }

    return _Game_Action_itemMrf.apply(this, arguments);
};

/**
 * ●反射無効ステート
 */
function isNoRefrectionState(states) {
    for (const stateId of states) {
        // 魔法反射禁止ステート<NoRefrectionState>があれば終了
        const metaNoRefrectionState = $dataStates[stateId].meta.NoRefrectionState;
        if (metaNoRefrectionState) {
            return true;
        }
    }
    return false;
}

/**
 * ●反射対象となる設定を取得
 */
function getMatchSetting(states) {
    for (const stateId of states) {
        // <MagicRefrection>の指定を取得
        const metaMagicRefrection = $dataStates[stateId].meta.MagicRefrection;
        if (!metaMagicRefrection) {
            continue;
        }

        // 条件に一致する設定を抽出する。
        for (const setting of pSettingList) {
            // 有効な設定ＩＤかどうかを確認
            if (metaMagicRefrection == setting.settingId) {
                return setting;
            }
        }
    }

    return undefined;
}

/**
 * ●スキルタイプが設定と一致するか？
 */
function isMatchSetting(action, setting) {
    // スキルタイプＩＤを取得
    const itemObject = action.item();
    const stypeId = itemObject.stypeId;

    for (const skillType of setting.skillTypes) {
        if (stypeId == skillType) {
            return true;
        }
    }

    return false;
}

//----------------------------------------------------------
// アニメーション呼出用の共通処理
//----------------------------------------------------------

/**
 * ●アニメーション呼び出しを行う。
 * MV, MZの両方に対応
 */
function callAnimation(battler, animationId, delay) {
    const battlerSprite = BattleManager._spriteset.findTargetSprite(battler);

    // MVの場合
    if (Utils.RPGMAKER_NAME == "MV") {
        var animation = $dataAnimations[animationId];
        var sprite = new Sprite_Animation();
        sprite.setup(battlerSprite._effectTarget, animation, battler.isActor(), delay);
        battlerSprite.parent.addChild(sprite);
        battlerSprite._animationSprites.push(sprite);
        for (const tmpSprite of battlerSprite._animationSprites) {
            tmpSprite.visible = battler.isSpriteVisible();
        }

    // MZの場合
    } else {
        const animation = getAnimation(animationId);
        if (animation) {
            createAnimationSprite([battler], animation, false, delay);
        }
    }
}

/**
 * ●ＭＶアニメーションかどうかの判定
 */
function isMVAnimation(animation) {
    return animation && !!animation.frames;
};

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
 * MZ用のアニメーション呼び出し
 */
function createAnimationSprite(targets, animation, mirror, delay) {
    const spriteSet = BattleManager._spriteset;

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
        // ＭＺエディタでＭＶアニメーションが設定されている。
        if (isMVAnimation(animation)) {
            return animation;

        // MZ用アニメーションが空ならMV用アニメーションを取得
        // ※ただし$dataMvAnimationsが有効な場合のみ
        } else if (isEmptyAnimation(animation) && typeof $dataMvAnimations !== 'undefined') {
            animation = $dataMvAnimations[animationId];
        }
    }

    return animation;
}

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

// ----------------------------------------------------------------------------
// 共通関数
// ----------------------------------------------------------------------------

/**
 * ●特徴を保持するオブジェクトを取得
 */
function getTraitObjects(battler) {
    // メモ欄を参照するオブジェクトを全取得
    let traitObjects = battler.traitObjects();
    // パッシブスキルが有効な場合は連結
    // ※通常はアクターのみ
    if (battler.skills) {
        traitObjects = traitObjects.concat(battler.skills());
    }
    return traitObjects;
}

})();
