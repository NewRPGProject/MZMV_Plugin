//=============================================================================
// NRP_EnemyCollapse.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Change the effect when an enemy collapses.
 * @author Takeshi Sunagawa (https://newrpg.seesaa.net/)
 * @orderAfter NRP_DamageTiming
 * @url https://newrpg.seesaa.net/article/501277851.html
 *
 * @help Change the effect when an enemy collapses.
 * 
 * BlendMode and BlendColor can be changed.
 * Other animations can be played back
 * by calling DynamicAnimation&Motion.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Register your settings in CollapseList.
 * The ID registered here will be used to link the settings.
 * 
 * The collapse effect can be applied to the entire area
 * by means of a plugin parameter.
 * In addition, it can be specified individually for each enemy.
 * 
 * -------------------------------------------------------------------
 * [Note of Enemies]
 * -------------------------------------------------------------------
 * ◆Specify method of collapse
 * <CollapseId:[ID]>
 * 
 * Link the registered collapse effects to the enemy by ID.
 * Do not include [].
 * 
 * -------------------------------------------------------------------
 * [Sample]
 * -------------------------------------------------------------------
 * The following samples are available in CollapseList.
 * 
 * ◆normal
 * This is exactly the same as the normal enemy collapse direction.
 * Please use for reference only.
 * 
 * ◆boss
 * It is exactly the same as the normal boss collapse direction.
 * 
 * ◆sink
 * It collapses as the enemy sinks.
 * 
 * ◆boss_shake
 * This is a boss collapse direction with screen shaking.
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
 * @param CollapseList
 * @type struct<CollapseData>[]
 * @default ["{\"Id\":\"normal\",\"CollapseType\":\"Normal\",\"Duration\":\"32\",\"BlendMode\":\"1\",\"BlendColor\":\"[255, 128, 128, 128]\",\"ShakeStrength\":\"0\",\"Sound1\":\"Collapse1\",\"Sound2\":\"\",\"Sound2Interval\":\"\",\"DynamicId\":\"\",\"Wait\":\"\",\"Script\":\"\"}","{\"Id\":\"boss\",\"CollapseType\":\"Sink\",\"Duration\":\"this.bitmap.height\",\"BlendMode\":\"1\",\"BlendColor\":\"[255, 255, 255, 255 - this.opacity]\",\"ShakeStrength\":\"2\",\"Sound1\":\"Collapse2\",\"Sound2\":\"Collapse3\",\"Sound2Interval\":\"20\",\"DynamicId\":\"\",\"Wait\":\"\",\"Script\":\"\"}","{\"Id\":\"sink\",\"CollapseType\":\"Sink\",\"Duration\":\"32\",\"BlendMode\":\"1\",\"BlendColor\":\"[255, 128, 128, 128]\",\"ShakeStrength\":\"0\",\"Sound1\":\"Collapse1\",\"Sound2\":\"\",\"Sound2Interval\":\"\",\"DynamicId\":\"\",\"Wait\":\"\",\"Script\":\"\"}","{\"Id\":\"boss_shake\",\"CollapseType\":\"Sink\",\"Duration\":\"this.bitmap.height\",\"BlendMode\":\"1\",\"BlendColor\":\"[255, 255, 255, 255 - this.opacity]\",\"ShakeStrength\":\"2\",\"Sound1\":\"Collapse2\",\"Sound2\":\"Collapse3\",\"Sound2Interval\":\"20\",\"DynamicId\":\"\",\"Wait\":\"\",\"Script\":\"$gameScreen.startShake(1, 20, this.bitmap.height);\"}"]
 * @desc This list defines the collapse effects.
 * 
 * @param DefaultCollapseId
 * @type string
 * @desc Standard collapse effects.
 * CollapseList ID.
 * 
 * @param DefaultBossCollapseId
 * @type string
 * @desc Standard boss collapse effects.
 * CollapseList ID.
 */

/*~struct~CollapseData:
 * @param Id
 * @type string
 * @desc Management ID.
 *
 * @param CollapseType
 * @type select
 * @option Normal
 * @option Sink
 * @option None
 * @default Normal
 * @desc Type of collapse.
 * In the case of "Sink", the collapse is downward.
 * 
 * @param Duration
 * @type combo
 * @option 32
 * @option this.bitmap.height
 * @default 32
 * @desc The time to collapse.
 * this.bitmap.height refers to the height of the image.
 * 
 * @param BlendMode
 * @type select
 * @option 0:Normal @value 0
 * @option 1:Add @value 1
 * @option 2:Multiply @value 2
 * @option 3:Screen @value 3
 * @default 1
 * @desc This is how the image is blended during the collapse.
 * 
 * @param BlendColor
 * @type string
 * @default [255, 128, 128, 128]
 * @desc The color to be applied to the image.
 * e.g.:[255,255,255,255] (Red, Green, Blue, Strength)
 *
 * @param ShakeStrength
 * @type number
 * @default 0
 * @desc The strength of the shaking.
 * 
 * @param Sound1
 * @text Sound1 (start)
 * @type file
 * @dir audio/se
 * @desc This is the sound effect at the start of the collapse.
 * 
 * @param Sound2
 * @text Sound2 (loop)
 * @type file
 * @dir audio/se
 * @desc This is a sound effect that continues to sound during the collapse.
 * 
 * @param Sound2Interval
 * @type number
 * @desc This is the interval at which Sound2 is played repeatedly.
 * 
 * @param DynamicId
 * @text DynamicID
 * @type skill
 * @desc Specify the collapse direction by DynamicAnimation&Motion.
 * Specify the ID of the skill.
 * 
 * @param Wait
 * @type boolean
 * @desc Whether to wait for the collapse effect.
 * If blank (DEL), the original settings will be taken over.
 * 
 * @param Script
 * @type string
 * @desc Script to be executed at the time of collapse.
 * e.g.:$gameScreen.startShake(1, 20, this.bitmap.height);
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 敵消滅時の演出を変更する。
 * @author 砂川赳（https://newrpg.seesaa.net/）
 * @orderAfter NRP_DamageTiming
 * @url https://newrpg.seesaa.net/article/501277851.html
 *
 * @help 敵が消滅する際のエフェクトを変更します。
 * 
 * 合成方法や色調の変更の他にも、
 * DynamicAnimation&Motionの呼び出しによって、
 * アニメーションを再生することもできます。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * 消滅エフェクト一覧に設定を登録してください。
 * ここで登録したＩＤによって紐づけを行います。
 * 
 * 消滅エフェクトはプラグインパラメータによって、
 * 全体に適用することができる他、敵毎に個別に指定することもできます。
 * 
 * -------------------------------------------------------------------
 * ■敵キャラのメモ欄
 * -------------------------------------------------------------------
 * ◆消滅方法の指定
 * <CollapseId:[ID]>
 * 
 * 登録した消滅エフェクトを、ＩＤによって敵と紐づけします。
 * ※[]は含まないでください。
 * 
 * -------------------------------------------------------------------
 * ■サンプル
 * -------------------------------------------------------------------
 * 消滅エフェクト一覧に以下のサンプルを用意しています。
 * 
 * ◆normal
 * 通常の敵消滅演出と全く同じものです。
 * 参考用にご利用ください。
 * 
 * ◆boss
 * 通常のボス消滅演出と全く同じものです。
 * 
 * ◆sink
 * 敵が沈むように消滅します。
 * 
 * ◆boss_shake
 * ボス消滅演出に画面振動を加えたものです。
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
 * @param CollapseList
 * @text 消滅エフェクト一覧
 * @type struct<CollapseData>[]
 * @default ["{\"Id\":\"normal\",\"CollapseType\":\"Normal\",\"Duration\":\"32\",\"BlendMode\":\"1\",\"BlendColor\":\"[255, 128, 128, 128]\",\"ShakeStrength\":\"0\",\"Sound1\":\"Collapse1\",\"Sound2\":\"\",\"Sound2Interval\":\"\",\"DynamicId\":\"\",\"Wait\":\"\",\"Script\":\"\"}","{\"Id\":\"boss\",\"CollapseType\":\"Sink\",\"Duration\":\"this.bitmap.height\",\"BlendMode\":\"1\",\"BlendColor\":\"[255, 255, 255, 255 - this.opacity]\",\"ShakeStrength\":\"2\",\"Sound1\":\"Collapse2\",\"Sound2\":\"Collapse3\",\"Sound2Interval\":\"20\",\"DynamicId\":\"\",\"Wait\":\"\",\"Script\":\"\"}","{\"Id\":\"sink\",\"CollapseType\":\"Sink\",\"Duration\":\"32\",\"BlendMode\":\"1\",\"BlendColor\":\"[255, 128, 128, 128]\",\"ShakeStrength\":\"0\",\"Sound1\":\"Collapse1\",\"Sound2\":\"\",\"Sound2Interval\":\"\",\"DynamicId\":\"\",\"Wait\":\"\",\"Script\":\"\"}","{\"Id\":\"boss_shake\",\"CollapseType\":\"Sink\",\"Duration\":\"this.bitmap.height\",\"BlendMode\":\"1\",\"BlendColor\":\"[255, 255, 255, 255 - this.opacity]\",\"ShakeStrength\":\"2\",\"Sound1\":\"Collapse2\",\"Sound2\":\"Collapse3\",\"Sound2Interval\":\"20\",\"DynamicId\":\"\",\"Wait\":\"\",\"Script\":\"$gameScreen.startShake(1, 20, this.bitmap.height);\"}"]
 * @desc 消滅エフェクトを定義する一覧です。
 * 
 * @param DefaultCollapseId
 * @text 標準の消滅ＩＤ
 * @type string
 * @desc 標準の消滅エフェクトです。
 * 消滅エフェクト一覧のＩＤを指定してください。
 * 
 * @param DefaultBossCollapseId
 * @text 標準の消滅ＩＤ（ボス）
 * @type string
 * @desc 標準のボスの消滅エフェクトです。
 * 消滅エフェクト一覧のＩＤを指定してください。
 */

/*~struct~CollapseData:ja
 * @param Id
 * @text ＩＤ
 * @type string
 * @desc 管理用のＩＤです。
 * 
 * @param CollapseType
 * @text 消滅タイプ
 * @type select
 * @option 通常 @value Normal
 * @option 沈む @value Sink
 * @option 消えない @value None
 * @default Normal
 * @desc 消滅のタイプです。
 * 『沈む』の場合は下に向かって消滅します。
 * 
 * @param Duration
 * @text 消滅時間
 * @type combo
 * @option 32
 * @option this.bitmap.height
 * @default 32
 * @desc 消滅にかける時間です。
 * this.bitmap.heightで画像の高さを参照します。
 * 
 * @param BlendMode
 * @text 合成方法
 * @type select
 * @option 0:通常 @value 0
 * @option 1:加算 @value 1
 * @option 2:乗算 @value 2
 * @option 3:スクリーン @value 3
 * @default 1
 * @desc 消滅時の画像の合成方法です。
 * 
 * @param BlendColor
 * @text 色
 * @type string
 * @default [255, 128, 128, 128]
 * @desc 消滅時の画像に適用する色です。
 * 例：[255,255,255,255]（赤、緑、青、強さ）
 *
 * @param ShakeStrength
 * @text 揺れの強さ
 * @type number
 * @default 0
 * @desc 揺れの強さです。
 * 
 * @param Sound1
 * @text 効果音１（開始）
 * @type file
 * @dir audio/se
 * @desc 消滅開始時の効果音です。
 * 
 * @param Sound2
 * @text 効果音２（繰返）
 * @type file
 * @dir audio/se
 * @desc 消滅中に鳴らし続ける効果音です。
 * 
 * @param Sound2Interval
 * @text 効果音２の間隔
 * @type number
 * @desc 効果音２を繰り返し演奏する間隔です。
 * 
 * @param DynamicId
 * @text DynamicID
 * @type skill
 * @desc DynamicAnimation&Motionによる消滅演出を指定します。
 * スキルのＩＤを指定してください。
 * 
 * @param Wait
 * @text ウェイト
 * @type boolean
 * @desc 消滅エフェクトを待つかどうかです。
 * 空欄(DEL)なら元の設定を引き継ぎます。
 * 
 * @param Script
 * @text スクリプト
 * @type string
 * @desc 消滅時に実行するスクリプトです。
 * 例：$gameScreen.startShake(1, 20, this.bitmap.height);
 */

(function() {
"use strict";

/**
 * ●構造体（二重配列）をJSで扱えるように変換
 */
function parseStruct2(arg) {
    const ret = [];
    if (arg) {
        for (const str of JSON.parse(arg)) {
            ret.push(JSON.parse(str));
        }
    }
    return ret;
}
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
function setDefault(str, def) {
    if (str == undefined || str == "") {
        return def;
    }
    return str;
}

const PLUGIN_NAME = "NRP_EnemyCollapse";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pCollapseList = parseStruct2(parameters["CollapseList"]);
const pDefaultCollapseId = setDefault(parameters["DefaultCollapseId"]);
const pDefaultBossCollapseId = setDefault(parameters["DefaultBossCollapseId"]);

// ----------------------------------------------------------------------------
// Game_BattlerBase
// ----------------------------------------------------------------------------

/**
 * 【独自】独自の消滅タイプ
 */
Game_BattlerBase.prototype.originalCollapseId = function() {
    return null;
};

/**
 * 【独自】独自の消滅データ
 */
Game_BattlerBase.prototype.originalCollapseData = function() {
    return null;
};

// ----------------------------------------------------------------------------
// Game_Enemy
// ----------------------------------------------------------------------------

/**
 * 【独自】独自の消滅タイプ
 */
Game_Enemy.prototype.originalCollapseId = function() {
    const collapseId = this.enemy().meta.CollapseId;

    // 消滅ＩＤの指定がない場合は既定値
    if (collapseId == null) {
        // 通常
        if (this.collapseType() == 0 && pDefaultCollapseId) {
            return pDefaultCollapseId;
        // ボス
        } else if (this.collapseType() == 1 && pDefaultBossCollapseId) {
            return pDefaultBossCollapseId;
        }
        return null;
    }

    // 消滅ＩＤの指定がある場合
    try {
        const a = this;
        return eval(collapseId);
    } catch(e) {}

    // evalでエラーになった場合はそのまま返す
    return collapseId;
};

/**
 * 【独自】独自の消滅データ
 */
Game_Enemy.prototype.originalCollapseData = function() {
    // 演出の指定があった場合
    const originalCollapseId = this.originalCollapseId();
    if (originalCollapseId != null) {
        Game_Battler.prototype.performCollapse.call(this);

        // 条件を満たす消滅データを取得
        return pCollapseList.find(collapseData => collapseData.Id == originalCollapseId);
    }
    return null;
};

/**
 * ●消滅演出開始
 */
const _Game_Enemy_performCollapse = Game_Enemy.prototype.performCollapse;
Game_Enemy.prototype.performCollapse = function() {
    // 独自の消滅演出があった場合
    const collapseData = this.originalCollapseData();
    if (collapseData) {
        // 通常は空だが元の処理にあったので呼び出し
        Game_Battler.prototype.performCollapse.call(this);
        // 独自の消滅演出を呼び出し
        this.requestEffect("originalCollapse");
        // 効果音を演奏
        if (collapseData.Sound1) {
            AudioManager.playSe({"name":collapseData.Sound1, "volume":90, "pitch":100, "pan":0})
        }
        return;
    }
    _Game_Enemy_performCollapse.apply(this, arguments);
};

// ----------------------------------------------------------------------------
// Sprite_Enemy
// ----------------------------------------------------------------------------

/**
 * ●エフェクト開始
 */
const _Sprite_Enemy_startEffect = Sprite_Enemy.prototype.startEffect;
Sprite_Enemy.prototype.startEffect = function(effectType) {
    // 独自の消滅演出の場合
    if (effectType == "originalCollapse") {
        this._effectType = effectType;
        this.startOriginalCollapse();
        this.revertToNormal();
        return;
    }
    _Sprite_Enemy_startEffect.apply(this, arguments);
};

/**
 * ●エフェクト更新
 */
const _Sprite_Enemy_updateEffect = Sprite_Enemy.prototype.updateEffect;
Sprite_Enemy.prototype.updateEffect = function() {
    // 独自の消滅演出の場合
    if (this._effectType == "originalCollapse") {
        this.setupEffect();
        if (this._effectDuration > 0) {
            this._effectDuration--;
            this.updateOriginalCollapse();
            // キリのよい計算でないとフリーズするので『<=』にしておく。
            if (this._effectDuration <= 0) {
                this._effectType = null;
            }
        }
        return;
    }

    _Sprite_Enemy_updateEffect.apply(this, arguments);
};

/**
 * 【独自】独自の消滅演出を開始
 */
Sprite_Enemy.prototype.startOriginalCollapse = function() {
    // eval参照用
    const a = this._battler;

    const collapseData = this._battler.originalCollapseData();
    const duration = eval(collapseData.Duration);

    this._effectDuration = setDefault(duration, 32);
    this._appeared = false;

    // DynamicAnimation&Motion実行
    if (collapseData.DynamicId) {
        const dynamicId = eval(collapseData.DynamicId);
        if (dynamicId) {
            callDynamic(this, dynamicId);
        }
    }

    // スクリプトの実行
    if (collapseData.Script != null) {
        eval(collapseData.Script);
    }
};

/**
 * 【独自】独自の消滅演出の更新
 */
Sprite_Enemy.prototype.updateOriginalCollapse = function() {
    const collapseData = this._battler.originalCollapseData();

    // 消さない場合
    if (collapseData.CollapseType == "None") {
        return;
    }

    // 振動
    const shakeStrength = setDefault(eval(collapseData.ShakeStrength), 0);
    this._shake = (this._effectDuration % 2) == 0 ? -shakeStrength : shakeStrength;
    // 合成方法
    const blendMode = setDefault(eval(collapseData.BlendMode), 1);
    this.blendMode = blendMode;
    // 色調
    const blendColor = setDefault(eval(collapseData.BlendColor), [255, 128, 128, 128]);
    this.setBlendColor(blendColor);
    // 効果音２
    if (collapseData.Sound2 && collapseData.Sound2Interval) {
        const sound2Interval = eval(collapseData.Sound2Interval);
        if (this._effectDuration % sound2Interval === sound2Interval - 1) {
            AudioManager.playSe({"name":collapseData.Sound2, "volume":90, "pitch":100, "pan":0})
        }
    }

    this.opacity *= this._effectDuration / (this._effectDuration + 1);
};

/**
 * ●フレーム更新
 */
const _Sprite_Enemy_updateFrame = Sprite_Enemy.prototype.updateFrame;
Sprite_Enemy.prototype.updateFrame = function() {
    const collapseData = this._battler.originalCollapseData();

    // 独自消滅エフェクトでない場合
    // または、消滅データがない場合は通常通り
    if (this._effectType != "originalCollapse" || !collapseData) {
        _Sprite_Enemy_updateFrame.apply(this, arguments);
        return;
    }

    Sprite_Battler.prototype.updateFrame.call(this);

    // 沈む場合（ボス）
    if (collapseData.CollapseType == "Sink") {
        const duration = eval(collapseData.Duration);
        this.setFrame(0, 0, this.bitmap.width, (this._effectDuration / duration) * this.bitmap.height);
    // 通常の場合
    } else {
        this.setFrame(0, 0, this.bitmap.width, this.bitmap.height);
    }
};

/**
 * ●撃破演出時のウェイト
 */
const _Sprite_Enemy_isEffecting = Sprite_Enemy.prototype.isEffecting;
Sprite_Enemy.prototype.isEffecting = function() {
    const collapseData = this._battler.originalCollapseData();

    // 独自消滅エフェクトかつ消滅データが存在する場合
    if (this._effectType == "originalCollapse" && collapseData) {
        // ウェイトの指定がある場合
        const wait = toBoolean(collapseData.Wait);
        if (wait === true) {
            return true;
        } else if (wait === false) {
            return false;
        }
    }

    return _Sprite_Enemy_isEffecting.apply(this, arguments);
};

//-----------------------------------------------------------------------------
// 共通関数
//-----------------------------------------------------------------------------

/**
 * ●DynamicAnimation&Motionを呼び出し
 */
function callDynamic(sprite, dynamicId) {
    const battler = sprite._battler;

    // 実行するDynamicAnimation情報を持ったアクション
    const dynamicAction = makeAction(dynamicId, battler);
    // バトラーを対象にする。
    const targets = [battler];
    // 引き継ぎたい情報をセット
    const mapAnimation = [];
    // バトラーを行動主体にする。
    mapAnimation.subject = battler;
    // ウェイトしないように並列実行
    mapAnimation.isParallel = true;
    // 空のWindow_BattleLogを作成し、DynamicAnimationを起動
    const win = new Window_BattleLog(new Rectangle());
    win.showDynamicAnimation(targets, dynamicAction, false, mapAnimation);
}

/**
 * ●アクション情報の作成
 */
function makeAction(itemId, battleSubject, isItem) {
    // 適当に先頭のキャラを行動主体にしてアクションを作成
    // ※行動主体の情報は基本的に使わないので実際はほぼダミー
    let subject = $gameParty.members()[0];
    if (battleSubject) {
        subject = battleSubject;
    }
    const action = new Game_Action(subject);
    // アイテムかスキルかで分岐
    if (isItem) {
        action.setItem(itemId);
    } else {
        action.setSkill(itemId);
    }
    return action;
}

})();
