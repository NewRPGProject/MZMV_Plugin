//=============================================================================
// NRP_animatedSVEnemies_ForDM.js
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc v1.01 Allows animatedSVEnemies to be used in conjunction with DynamicMotion.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @base animatedSVEnemies
 * @base NRP_DynamicMotionMZ
 * @orderAfter animatedSVEnemies
 * @url http://newrpg.seesaa.net/article/478581866.html
 *
 * @help Allows animatedSVEnemies to be used in conjunction with DynamicMotion.
 * 
 * animatedSVEnemies.js (by Rexal) is a plugin
 * that allows you to use SV_Battler as an enemy.
 * Combined with DynamicMotion,
 * it allows enemies to execute motions for the side view.
 * 
 * ■Install
 * Register this plugin under animatedSVEnemies.js.
 * You can download animatedSVEnemies.js below.
 * https://forums.rpgmakerweb.com/index.php?threads/animated-enemies.47991/
 * 
 * ※I have tested it with the stable version, v1.15.51.
 * 　Please note that in the latest version I am unconfirmed.
 * ※Naturally, you need NRP_DynamicMotion or NRP_DynamicMotionMZ.
 * 
 * ■Contents
 * ・Addressed the problem of an error when selecting a target in MZ.
 * ・Dealing with step forward process can be controlled.
 * ・Adjustable movement direction at the start of battle.
 * 
 * ■Note
 * In the default spec of animatedSVEnemies.js,
 * when an actor is defeated, the enemy takes a victory motion.
 * However, there is a glitch in this process
 * that causes the defeat process to be duplicated.
 * I recommend turning off "Enemies Celebrate" to avoid this problem.
 * If you want the enemy's victory motion on top of that,
 * please turn on the "PlayVictoryMotion" option in my plugin.
 * 
 * When used in conjunction with NRP_EnemyAttackAnimation.js,
 * please place it below this plugin.
 * Otherwise, the enemy's normal attack animations will not appear.
 * 
 * For more information, please see below.
 * http://newrpg.seesaa.net/article/478581866.html
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but we will respond to defects as far as possible.
 * 
 * @param StartPosition
 * @text [MZ]StartPosition
 * @type number
 * @max 9999
 * @min -9999
 * @default -300
 * @desc The appearance position at the start of battle (difference home position). Maybe only MZ.
 * 
 * @param PlayVictoryMotion
 * @type boolean
 * @default false
 * @desc When defeated, the enemies play the victory motion.
 * Turn off "Enemies Celebrate" in animatedSVEnemies.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.01 animatedSVEnemiesをDynamicMotionと併用できるようにします。
 * @author 砂川赳 (http://newrpg.seesaa.net/)
 * @base animatedSVEnemies
 * @base NRP_DynamicMotionMZ
 * @orderAfter animatedSVEnemies
 * @url http://newrpg.seesaa.net/article/478581866.html
 * 
 * @help animatedSVEnemiesをDynamicMotionと併用できるようにします。
 * 
 * animatedSVEnemies.js（Rexal様）は[SV]戦闘キャラを
 * 敵として使用できるようにするプラグインです。
 * DynamicMotionと組み合わせることにより、
 * サイドビュー用のモーションを敵が実行できるようにします。
 * 
 * ■導入方法
 * animatedSVEnemies.jsの下に、このプラグインを登録してください。
 * animatedSVEnemies.jsは以下よりダウンロードできます。
 * https://forums.rpgmakerweb.com/index.php?threads/animated-enemies.47991/
 * 
 * ※安定版のv1.15.51で動作確認しています。
 * 　最新版では未確認なのでご注意ください。
 * ※当然ながら、NRP_DynamicMotionまたはNRP_DynamicMotionMZが必要です。
 * 
 * ■対応内容
 * ・ＭＺにて対象選択時にエラーとなる問題に対処。
 * ・一歩前進処理を制御できるように対処。
 * ・戦闘開始時の移動演出を調整可能に。
 * 
 * ■注意点
 * animatedSVEnemies.jsのデフォルトの仕様では、
 * アクターの敗北時に敵が勝利モーションを取ります。
 * ……が、この処理には不具合があって、敗北処理が二重に実行されてしまいます。
 * 『Enemies Celebrate』をオフにすれば回避できるので推奨します。
 * その上で敵の勝利モーションが必要ならば、
 * 当プラグインで『勝利モーションを実行』をオンにしてください。
 * 
 * NRP_EnemyAttackAnimation.jsと併用する場合は、
 * 当プラグインより下に配置してください。
 * さもないと敵の通常攻撃のアニメーションが表示されません。
 * 
 * その他、このプラグインの詳細は以下をご覧ください。
 * http://newrpg.seesaa.net/article/478581866.html
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param StartPosition
 * @text [MZ]開始位置
 * @type number
 * @max 9999
 * @min -9999
 * @default -300
 * @desc 戦闘開始時の出現位置（ホームポジションとの差分）です。
 * たぶんＭＺでしか機能しません。
 * 
 * @param PlayVictoryMotion
 * @text 勝利モーションを実行
 * @type boolean
 * @default false
 * @desc 敗北時、敵が勝利モーションを実行するようにします。
 * animatedSVEnemiesの"Enemies Celebrate"はオフを推奨します。
 */

var Imported = Imported || {};
Imported.AnimatedSVEnemies = true;

var Rexal = Rexal || {};
Rexal.ASVE = Rexal.ASVE || {};

(function() {
"use strict";

function toBoolean(val, def) {
    // 空白なら初期値を返す
    if (val === "" || val === undefined) {
        return def;
        
    // 既にboolean型なら、そのまま返す
    } else if (typeof val === "boolean") {
        return val;
    }
    // 文字列ならboolean型に変換して返す
    return val.toLowerCase() == "true";
}
function toNumber(str, def) {
    return isNaN(str) ? def : +(str || def);
}

const parameters = PluginManager.parameters("NRP_animatedSVEnemies_ForDM");
const pStartPosition = toNumber(parameters["StartPosition"]);
const pPlayVictoryMotion = toBoolean(parameters["PlayVictoryMotion"], false);

const dMotionParams = getDynamicMotionParameters();
const pSetStepForward = dMotionParams["setStepForward"];

Rexal.ASVE.Parameters = PluginManager.parameters('animatedSVEnemies');
Rexal.ASVE.NoMovement = eval(String(Rexal.ASVE.Parameters['No Movement']));

/**
 * ●MZかMVかを判定してパラメータを返す。
 */
function getDynamicMotionParameters() {
    const mzParams = PluginManager.parameters("NRP_DynamicMotionMZ");
    if (mzParams != undefined) {
        return mzParams;
    }
    return PluginManager.parameters("NRP_DynamicMotion");
}

/**
 * ●対象選択時のフラッシュ
 */
Sprite_EnemyRex.prototype.updateSelectionEffect = function() {
    // そのままSprite_Battlerの処理を呼び出し
    Sprite_Battler.prototype.updateSelectionEffect.apply(this, arguments);
};

/**
 * ●登場時の初期位置調整
 */
Sprite_EnemyRex.prototype.moveToStartPosition = function() {
    if (pStartPosition) {
        this.startMove(-300, 0, 0);
    }
};

/**
 * ●一歩前進
 */
Sprite_EnemyRex.prototype.stepForward = function() {
    // そのままSprite_Enemyの処理を呼び出し
    Sprite_Enemy.prototype.stepForward.apply(this, arguments);
};

/**
 * ●一歩前進
 */
const _Sprite_Enemy_stepForward = Sprite_Enemy.prototype.stepForward;
Sprite_Enemy.prototype.stepForward = function() {
    const action = BattleManager._action;
    if (BattleManager._phase == "action" && action) {
        // 前進の有無
        if (pSetStepForward) {
            // 1:常に無
            if (pSetStepForward == 1) {
                return;
            // 2:モーション指定時のみ無
            } else if (pSetStepForward == 2 && action.isDynamicMotion()) {
                return;
            }
        }

        // NoStepの設定があれば前進しない
        if (action.existDynamicSetting("NoStep")) {
            return;
        }
    }

    _Sprite_Enemy_stepForward.apply(this, arguments);
};

//-----------------------------------------------------------------------------
// BattleManager
//============================================================================
if (pPlayVictoryMotion) {
    /**
     * ●敗北時
     */
    const _BattleManager_processDefeat = BattleManager.processDefeat;
    BattleManager.processDefeat = function () {
        _BattleManager_processDefeat.apply(this, arguments);
        // 敵の勝利モーション
        $gameTroop.performVictory();
    };
}

/**
 * MZ専用処理
 */
if (Utils.RPGMAKER_NAME == "MZ") {
    /**
     * ●スプライトにバトラーをセットする。
     * ※NRP_TroopRandomFormation.jsとの連携用
     */
    const _Sprite_EnemyRex_setBattler = Sprite_EnemyRex.prototype.setBattler;
    Sprite_EnemyRex.prototype.setBattler = function(battler) {
        _Sprite_EnemyRex_setBattler.apply(this, arguments);

        // 早めに画像読込を実施
        this.updateBitmap();
    };
}

})();
