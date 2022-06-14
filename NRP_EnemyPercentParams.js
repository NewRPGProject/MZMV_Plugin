//=============================================================================
// NRP_EnemyPercentParams.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.01 Set enemy parameters in terms of levels and percentages.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/484538732.html
 *
 * @help Set enemy parameters in terms of levels and percentages.
 * Enemies that grow in level, etc. can be realized
 * by using the parameters of the class in the database as a basis.
 * 
 * In addition to cases where you want to change enemy parameters
 * depending on the progress of the game,
 * you can also use it to simply save yourself
 * the trouble of setting the values.
 * 
 * In particular, experience can be calculated automatically
 * based on the experience required for the next level.
 * This saves you the trouble of adjusting the values.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * First, set the standard profession for the enemy parameters,
 * and specify it in the plug-in parameters.
 * ※Not only the parameters, but also the EXP curve
 *   is used to calculate the acquired EXP.
 * 
 * Next, set the enemy's parameters to a value based on 100.
 * 100 in this case means 100%.
 * (e.g. 110 for an enemy with a slightly higher attack power.)
 * 
 * In addition, you can set the level for enemies.
 * The base level can be set by assigning a value
 * to the variable specified in the plugin parameter.
 * 
 * If you change the base level depending on the location and progress,
 * you will be able to fluctuate the strength of the enemies.
 * You can also set the random width of the level
 * by a variable in the same way.
 * 
 * Of course, you can also set a fixed value for each enemy.
 * Please refer to the "Note of Enemies" section below for flexible settings.
 * 
 * -------------------------------------------------------------------
 * [Note of Enemies]
 * -------------------------------------------------------------------
 * <Level:?>
 * 
 * Sets the level of the enemy.
 * This value takes precedence over the base level.
 * 
 * It is also possible to reference the base level as follows.
 * <Level:BaseLevel + 1>
 * 
 * The following is a further random width added to the base level.
 * <Level:RandomLevel + 1>
 * 
 * There may be cases where you want to eliminate the random range
 * only for the boss battle, so please use it differently.
 * 
 * -------------------------------------------------------------------
 * [EXP & Gold]
 * -------------------------------------------------------------------
 * The base values for EXP and Gold
 * cannot be simply obtained from class data,
 * so they are determined by the following formulas.
 * 
 * ◆EXP: 1 + "EXP to the next level" / 30
 * In short, if the level of the enemy and the actor are the same,
 * you can calculate the level increase by defeating about 30 of them.
 * This is very useful because it calculates automatically.
 * ※The first one is an adjustment for low levels.
 * 
 * ◆Gold: 5 + (level * level) / 2
 * The formula is proportional to the square of the level.
 * 
 * These formulas can be adjusted in the plugin parameters.
 * You can also leave it blank to use the editor settings as is.
 * 
 * -------------------------------------------------------------------
 * [Battle Test]
 * -------------------------------------------------------------------
 * The common event to be called at the start of the battle test
 * can be set in the plugin parameter.
 * 
 * If you set the base level and etc. here,
 * it will be applied to the enemy parameters as well.
 * 
 * You can also refer to the actor's parameters set during battle testing.
 * For example, it is assumed that the base level
 * is set by referring to the level of the main character.
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
 * @param BaseClass
 * @type class
 * @default 1
 * @desc The base class for parameters.
 * 
 * @param VariableBaseLevel
 * @type variable
 * @desc A variable that specifies the base level.
 * 
 * @param VariableRandomLevel
 * @type variable
 * @desc This variable specifies the random width of the level.
 * If 2, then 0~2 will be added to the base level.
 * 
 * @param BaseExp
 * @type text
 * @default 1 + a.nextRequiredExp() / 30
 * @desc A formula for finding the base experience value.
 * a.nextRequiredExp() is the EXP to the next level
 * 
 * @param BaseGold
 * @type text
 * @default 5 + (a.level * a.level) / 2
 * @desc This is the formula for finding the base Gold.
 * 
 * @param TestCommonEvent
 * @type common_event
 * @desc A common event that is executed before a battle test.
 * Please use it to set the base level.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.01 敵の能力値をレベルと百分率で設定
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/484538732.html
 *
 * @help レベルと百分率によって、敵の能力値を設定します。
 * データベースの職業の能力値を基準とすることによって、
 * レベル成長する敵などを実現可能です。
 * 
 * 進行状況によって敵の能力値を変化させたい場合の他にも、
 * 単純に数値設定の手間を省きたい場合にも使えます。
 * 
 * 特に経験値については、
 * 次のレベルに必要な経験値を基準に、自動で算出できます。
 * これによりバランス調整の手間を軽減できます。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * まず、敵の能力の基準となる職業を設定し、
 * プラグインパラメータで指定します。
 * ※能力だけでなく経験値曲線も取得経験値の計算に使用します。
 * 
 * 次に敵の能力に１００を基準にした値を設定します。
 * ここでの１００は１００％の意味になります。
 * （少し攻撃力が高い敵なら１１０にするなど。）
 * 
 * さらに敵に対してレベルを設定します。
 * プラグインパラメータで指定した変数に値を代入することで、
 * 基準となるレベルを設定可能です。
 * 
 * 場所や進行状況によって基準レベルを変更すれば、
 * 敵の強さを変動させることができるようになります。
 * また、同じ要領で変数によって、レベルのランダム幅も設定できます。
 * 
 * もちろん、敵毎に固定値を設定しても構いません。
 * 柔軟な設定が可能ですので、
 * 以下の『敵キャラのメモ欄』を参照してください。
 * 
 * -------------------------------------------------------------------
 * ■敵キャラのメモ欄
 * -------------------------------------------------------------------
 * <Level:?>
 * 
 * 敵のレベルを設定します。
 * この値は基準レベルよりも優先されます。
 * 
 * また、以下のように基準レベルを参照することも可能です。
 * <Level:BaseLevel + 1>
 * 
 * 以下はさらに基準レベルにランダム幅を追加したものです。
 * <Level:RandomLevel + 1>
 * 
 * ボス戦だけはランダム幅をなくしたいなどの場合も
 * あると思いますので、使い分けてください。
 * 
 * -------------------------------------------------------------------
 * ■経験値と所持金
 * -------------------------------------------------------------------
 * 経験値と所持金の基準値については職業データから
 * 単純取得できないため、以下の数式で決定しています。
 * 
 * ◆経験値：1 + 次のレベルまでの経験値 / 30
 * 要するに敵とアクターのレベルが同じ場合、
 * ３０体ほど倒せばレベルが上がる計算です。
 * 自動で計算してくれるのでとても便利です。
 * ※最初の1は低レベル用の調整です。
 * 
 * ◆所持金：5 + （レベル * レベル） / 2
 * レベルの２乗に比例する数式です。
 * 
 * 数式はプラグインパラメータで調整できます。
 * 空欄にすれば、エディタの設定値をそのまま使用することもできます。
 * 
 * -------------------------------------------------------------------
 * ■戦闘テスト
 * -------------------------------------------------------------------
 * 戦闘テスト開始時に呼び出すコモンイベントを
 * プラグインパラメータで設定可能です。
 * 
 * ここで基準レベル等の設定をすれば、敵の能力にも反映されます。
 * 
 * 戦闘テスト時に設定したアクターの能力も参照できます。
 * 例えば、主人公のレベルを参照して、
 * 基準レベルを設定するといった運用を想定しています。
 * 
 * -------------------------------------------------------------------
 * ■利用規約
 * -------------------------------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param BaseClass
 * @text 基準となる職業
 * @type class
 * @default 1
 * @desc 能力値の基準となる職業です。
 * 
 * @param VariableBaseLevel
 * @text 基準レベルの変数
 * @type variable
 * @desc 基準レベルを指定する変数です。
 * 
 * @param VariableRandomLevel
 * @text レベルランダム幅の変数
 * @type variable
 * @desc レベルのランダム幅を指定する変数です。
 * 値が2の場合、基準レベルに0~2が加算されます。
 * 
 * @param BaseExp
 * @text 基準経験値
 * @type text
 * @default 1 + a.nextRequiredExp() / 30
 * @desc 基準となる経験値を求める数式です。
 * a.nextRequiredExp()で次のレベルまでのＥＸＰ
 * 
 * @param BaseGold
 * @text 基準所持金
 * @type text
 * @default 5 + (a.level * a.level) / 2
 * @desc 基準となる所持金を求める数式です。
 * 
 * @param TestCommonEvent
 * @text 戦闘テスト時コモンイベント
 * @type common_event
 * @desc 戦闘テスト前に実行されるコモンイベントです。
 * 基準レベルの設定などにご活用ください。
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

const PLUGIN_NAME = "NRP_EnemyPercentParams";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pBaseClass = toNumber(parameters["BaseClass"]);
const pVariableBaseLevel = toNumber(parameters["VariableBaseLevel"]);
const pVariableRandomLevel = toNumber(parameters["VariableRandomLevel"]);
const pBaseExp = parameters["BaseExp"];
const pBaseGold = parameters["BaseGold"];
const pTestCommonEvent = toNumber(parameters["TestCommonEvent"]);

//----------------------------------------------------------
// Game_Enemy
//----------------------------------------------------------

/**
 * 【独自】敵のレベルを有効化
 */
Object.defineProperty(Game_Enemy.prototype, "level", {
    get: function() {
        return this._level;
    },
    configurable: true
});

/**
 * ●敵の設定
 */
const _Game_Enemy_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
    // 元の処理でも呼ばれるが、必要なので先行呼び出し
    this._enemyId = enemyId;

    // eval参照用
    const a = this;
    // 基本レベル
    let BaseLevel = 1;
    if (pVariableBaseLevel) {
        BaseLevel = $gameVariables.value(pVariableBaseLevel);
    }
    // 基本レベルにランダム幅を加算したもの
    let RandomLevel = BaseLevel;
    if (pVariableRandomLevel) {
        RandomLevel += Math.randomInt($gameVariables.value(pVariableRandomLevel) + 1);
    }

    // レベルの設定
    this._level = 0;

    // レベルの指定があれば優先使用する。
    const metaValue = this.enemy().meta.Level;
    if (metaValue) {
        this._level = eval(metaValue);

    // 指定がない場合はランダムレベルを使用
    } else {
        this._level = RandomLevel;
    }

    // レベルは最低でも1を設定
    if (!this._level) {
        this._level = 1;
    }

    _Game_Enemy_setup.apply(this, arguments);
};

/**
 * 【上書】パラメータの計算
 */
Game_Enemy.prototype.paramBase = function(paramId) {
    // パラメータのベースとなる職業を取得
    const baseValue = getBaseClass().params[paramId][this._level];
    // 元の値を％として使用して乗算
    const percent = this.enemy().params[paramId]
    return Math.round(baseValue * percent / 100);
};

/**
 * 【上書】経験値の取得
 */
const _Game_Enemy_exp = Game_Enemy.prototype.exp;
Game_Enemy.prototype.exp = function() {
    // 指定がない場合はそのまま
    if (!pBaseExp) {
        return _Game_Enemy_exp.apply(this, arguments);
    }

    // eval参照用
    const a = this;
    // 基準となる経験値
    const baseExp = eval(pBaseExp);
    // 元の値を％として使用して乗算
    const percent = this.enemy().exp;
    return Math.round(baseExp * percent / 100);
};

/**
 * 【上書】お金の取得
 */
const _Game_Enemy_gold = Game_Enemy.prototype.gold;
Game_Enemy.prototype.gold = function() {
    // 指定がない場合はそのまま
    if (!pBaseGold) {
        return _Game_Enemy_gold.apply(this, arguments);
    }

    // eval参照用
    const a = this;
    // 基準となるお金
    const baseGold = eval(pBaseGold);
    // 元の値を％として使用して乗算
    const percent = this.enemy().gold;
    return Math.round(baseGold * percent / 100);
};

/**
 * 【独自】現在の職業（＝基準となる職業で固定）
 */
Game_Enemy.prototype.currentClass = function() {
    return getBaseClass();
};

/**
 * 【独自】現在レベルに必要な合計経験値
 */
Game_Enemy.prototype.expForLevel = function(level) {
    return Game_Actor.prototype.expForLevel.call(this, level);
};

/**
 * 【独自】現在の経験値（＝現在のレベルまでの合計経験値）
 */
Game_Enemy.prototype.currentExp = function() {
    return this.currentLevelExp();
};

/**
 * 【独自】現在のレベルまでの合計経験値
 */
Game_Enemy.prototype.currentLevelExp = function() {
    return Game_Actor.prototype.currentLevelExp.call(this);
};

/**
 * 【独自】次のレベルまでの合計経験値
 */
Game_Enemy.prototype.nextLevelExp = function() {
    return Game_Actor.prototype.nextLevelExp.call(this);
};

/**
 * 【独自】次のレベルまでの差分経験値
 */
Game_Enemy.prototype.nextRequiredExp = function() {
    return this.nextLevelExp() - this.currentExp();
};

//----------------------------------------------------------
// Game_Party
//----------------------------------------------------------

/**
 * ●戦闘テストの設定
 */
const _Game_Party_setupBattleTest = Game_Party.prototype.setupBattleTest;
Game_Party.prototype.setupBattleTest = function() {
    // ここでパーティ情報が設定される。
    _Game_Party_setupBattleTest.apply(this, arguments);

    if (pTestCommonEvent) {
        $gameTemp.reserveCommonEvent(pTestCommonEvent);
        $gameTroop._interpreter.setupReservedCommonEvent();
        $gameTroop._interpreter.update();
    }
};

//----------------------------------------------------------
// 共通関数
//----------------------------------------------------------

/**
 * ●パラメータのベースとなる職業を取得
 */
function getBaseClass() {
    return $dataClasses[pBaseClass];
};

})();
