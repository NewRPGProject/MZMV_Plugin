//=============================================================================
// NRP_DynamicAppear.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Implement an appearance direction at the start of the battle.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @base NRP_DynamicAnimationMZ
 * @url http://newrpg.seesaa.net/article/485942538.html
 *
 * @help By linking with the DynamicAnimation&Motion plugins,
 * the appearance of the battlers will be implemented
 * at the start of the battle.
 * 
 * Inevitably, the following plugins are required.
 * - NRP_DynamicAnimationMZ.js (or NRP_DynamicAnimation.js)
 * - NRP_DynamicMotionMZ.js (or NRP_DynamicMotion.js)
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Follow the instructions in the DynamicAnimation&Motion plugins
 * to create skills for staging.
 * (See: [Sample of DynamicMotion])
 * ※All that is required is the definition of the notes field,
 *   so other settings are not required.
 * 
 * All that is left is to set the skill ID
 * in the actor (or class) and enemy notes as follows.
 * 
 * If no individual specification is given,
 * the default values of the plugin parameters are used.
 * 
 * -------------------------------------------------------------------
 * [Note of Actors, Enemies, and Classes]
 * -------------------------------------------------------------------
 * <DynamicAppear: x>
 * In linkage with the DynamicAnimation&Motion plugins,
 * the skill appears with the direction specified
 * for the x-numbered skill.
 * 
 * In addition, when set in the notes of a profession,
 * it takes precedence over the actor's settings.
 * 
 * -------------------------------------------------------------------
 * [Sample of DynamicMotion]
 * -------------------------------------------------------------------
 * // Time difference at the start of the battle
 * <D-Motion>
 * condition = BattleManager._phase == "start"
 * wait = a.index() * 3 // Time difference
 * </D-Motion>
 *
 * // Appears from off-screen (sideways)
 * <D-Motion>
 * frame = 5 // Movement time
 * sx = a._homeX + 500 * mirroring // Start X (off-screen)
 * sy = a._homeY // Start Y
 * ex = a._homeX // End X
 * ey = a._homeY // End Y
 * </D-Motion>
 * -------------------------------------------------------------------
 * 
 * You can refer to the battler that appears in "a".
 * "a._homeX" and "a._homeY" are the placement points.
 * Implement it so that it will eventually move there.
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
 * @------------------------------------------------------------------
 * @ [Plugin Parameters]
 * @------------------------------------------------------------------
 * 
 * @param ActorDynamicId
 * @type skill
 * @desc Actor's battle start direction (default value).
 * Specify the skill that defines the direction.
 * 
 * @param EnemyDynamicId
 * @type skill
 * @desc Enemy's battle start direction (default value).
 * Specify the skill that defines the direction.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 戦闘開始時に登場演出を実行します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @base NRP_DynamicAnimationMZ
 * @url http://newrpg.seesaa.net/article/485942538.html
 *
 * @help 戦闘開始時にバトラーの登場演出を実行します。
 * 演出はDynamicAnimation&Motionプラグインによって作成します。
 * 
 * 必然的に以下のプラグインが必須です。
 * ・NRP_DynamicAnimationMZ.js (or NRP_DynamicAnimation.js)
 * ・NRP_DynamicMotionMZ.js (or NRP_DynamicMotion.js)
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * DynamicAnimation&Motionプラグインの説明に従って、
 * 演出用のスキルを作成してください。
 * （参照：■DynamicMotionによる演出の例）
 * ※必要なのはメモ欄の定義だけなので、その他の設定は不問です。
 * 
 * 後はアクター（または職業）、敵キャラのメモ欄に
 * 以下の通り、スキルＩＤを設定すればＯＫです。
 * 
 * 個別の指定がない場合は、プラグインパラメータの初期値が使用されます。
 * 
 * -------------------------------------------------------------------
 * ■アクター、敵キャラ、職業のメモ欄
 * -------------------------------------------------------------------
 * <DynamicAppear: x>
 * DynamicAnimation&Motionプラグインと連携し、
 * x番のスキルに指定された演出で登場します。
 * 
 * なお、職業のメモ欄に設定した場合は、
 * アクターの設定よりも優先されます。
 * 
 * -------------------------------------------------------------------
 * ■DynamicMotionによる演出の例
 * -------------------------------------------------------------------
 * // 戦闘開始時に時間差
 * <D-Motion>
 * condition = BattleManager._phase == "start"
 * wait = a.index() * 3 // 時間差
 * </D-Motion>
 *
 * // 画面外（横）から登場
 * <D-Motion>
 * frame = 5 // 移動時間
 * sx = a._homeX + 500 * mirroring // 始点Ｘ座標（画面外）
 * sy = a._homeY // 始点Ｙ座標
 * ex = a._homeX // 終点Ｘ座標
 * ey = a._homeY // 終点Ｙ座標
 * </D-Motion>
 * -------------------------------------------------------------------
 * 
 * aで登場するバトラーを参照できます。
 * a._homeX, a._homeYが配置地点となるので、
 * 最終的にそこへ移動するように実装してください。
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
 * @param ActorDynamicId
 * @text アクターの開始演出
 * @type skill
 * @desc アクターの戦闘開始演出（初期値）です。
 * 演出を定義したスキルを指定してください。
 * 
 * @param EnemyDynamicId
 * @text 敵キャラの開始演出
 * @type skill
 * @desc 敵キャラの戦闘開始演出（初期値）です。
 * 演出を定義したスキルを指定してください。
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

const PLUGIN_NAME = "NRP_DynamicAppear";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pActorDynamicId = parameters["ActorDynamicId"];
const pEnemyDynamicId = parameters["EnemyDynamicId"];

//-----------------------------------------------------------------------------
// Game_Unit
//-----------------------------------------------------------------------------

/**
 * ●戦闘開始
 */
const _Game_Unit_onBattleStart = Game_Unit.prototype.onBattleStart;
Game_Unit.prototype.onBattleStart = function(advantageous) {
    _Game_Unit_onBattleStart.apply(this, arguments);

    // 敵グループの場合
    if (this == $gameTroop) {
        // 登場演出
        BattleManager._spriteset.enemiesAppear();
    }
};

//-----------------------------------------------------------------------------
// Spriteset_Battle
//-----------------------------------------------------------------------------

/**
 * 【独自】敵キャラの登場演出
 */
Spriteset_Battle.prototype.enemiesAppear = function() {
    for (const sprite of this._enemySprites) {
        sprite.startEntryMotion();
    }
};

//-----------------------------------------------------------------------------
// Sprite_Actor
//-----------------------------------------------------------------------------

/**
 * ●戦闘開始モーション
 */
const _Sprite_Actor_startEntryMotion = Sprite_Actor.prototype.startEntryMotion;
Sprite_Actor.prototype.startEntryMotion = function() {
    if (this._actor && this._actor.canMove()) {
        // <DynamicAppear>のスキルＩＤを取得
        // ※職業＞アクター＞デフォルト値の順で優先
        let dynamicId =
            this._battler.currentClass().meta.DynamicAppear
            || this._battler.actor().meta.DynamicAppear
            || pActorDynamicId;

        dynamicId = eval(dynamicId);
        // DynamicAnimation&Motion実行
        if (dynamicId) {
            callDynamic(this, dynamicId);
            return;
        }
    }

    // 指定がない場合は通常の登場処理
    _Sprite_Actor_startEntryMotion.apply(this, arguments);
};

//-----------------------------------------------------------------------------
// Sprite_Enemy
//-----------------------------------------------------------------------------

/**
 * 【独自】戦闘開始モーション
 */
Sprite_Enemy.prototype.startEntryMotion = function() {
    if (this._enemy && this._enemy.canMove()) {
        // <DynamicAppear>のスキルＩＤを取得
        let dynamicId = this._battler.enemy().meta.DynamicAppear || pEnemyDynamicId;
        dynamicId = eval(dynamicId);
        // DynamicAnimation&Motion実行
        if (dynamicId) {
            // チラ見えしないように、適当に画面外へ移動
            this.x = -9999;
            // 演出実行
            callDynamic(this, dynamicId);
            return;
        }
    }
};

//-----------------------------------------------------------------------------
// 共通関数
//-----------------------------------------------------------------------------

/**
 * ●DynamicAnimation&Motionを呼び出し
 */
function callDynamic(sprite, dynamicId) {
    const battler = sprite._battler;
    // チラ見えしないように、適当に画面外へ移動
    sprite._offsetX = -sprite.x - sprite.width / 2 - 100;

    // 実行するDynamicAnimation情報を持ったアクション
    const dynamicAction = makeAction(dynamicId, battler);
    // バトラーを対象にする。
    const targets = [battler];
    // 引き継ぎたい情報をセット
    const mapAnimation = [];
    // バトラーを行動主体にする。
    mapAnimation.subject = battler;
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
