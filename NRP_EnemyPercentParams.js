//=============================================================================
// NRP_EnemyPercentParams.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.03 Set enemy parameters in terms of levels and percentages.
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
 * [Adjust Variable]
 * -------------------------------------------------------------------
 * You can set variables for parameter adjustment
 * in the plugin parameters.
 * For example, if the value of the variable set for “HpRateVariable”
 * is set to 10, the maximum HP of all enemies will increase by 10%.
 * 
 * Please use this function to set the difficulty level
 * and fine-tune the balance.
 * 
 * Note that only “ParamLevelVariable” is special,
 * which increases the level related to the calculation of parameters
 * by the specified value.
 * It does not affect the values that can be referred to in b.level,
 * nor the calculation of exp and gold.
 * Negative values are possible, but cannot be less than level 1.
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
 * [For use with EnemyBook-based plugins]
 * -------------------------------------------------------------------
 * Be careful when using with external EnemyBook-based plugins.
 *  * This is because when enemy data is displayed in the book,
 * the parameters are still displayed at the current setting level.
 * ※Plugins compliant with EnemyBook.js (MV's DLC plugin)
 *   such as ABMZ_EnemyBook.js are assumed.
 *
 * If the level is always a fixed value, there is no problem,
 * but if the base level or random width is used,
 * even fluctuations caused by them will be reflected.
 *
 * As a temporary workaround, the % value can be displayed
 * as it is while the book is displayed.
 * This is enabled when "SupportEnemyBook" is turned on.
 * ※I really wanted to add a % character after the number,
 *   but it was difficult to do so here.
 *   It would be more practical to edit the EnemyBook plugin side.
 *
 * Note that this specification is not supported during battle,
 * and the current values are displayed as they are.
 * Some of the relevant plugins have the ability
 * to examine enemy parameters during battle,
 * which may be more convenient for you.
 * ...To begin with, there is the situation that it is difficult
 * to obtain the judgment that the book is open during the battle itself.
 *
 * Another simple solution is to not display the parameters
 * on the book side. Please adjust according to your needs.
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
 * @ Plugin Commands
 * @------------------------------------------------------------------
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
 * 
 * @param SupportEnemyBook
 * @type boolean
 * @default false
 * @desc When used with EnemyBook, display % values instead of actual parameters.
 * 
 * @param <AdjustVariable>
 * @desc Sets variables to adjust parameters.
 * 
 * @param ParamLevelVariable
 * @parent <AdjustVariable>
 * @type variable
 * @desc Increases parameters by the specified level.
 * Does not affect experience, etc.
 * 
 * @param HpRateVariable
 * @parent <AdjustVariable>
 * @type variable
 * @desc Variable sets the maximum HP adjustment value.
 * If the value of the variable is 10, it will increase by 10%.
 * 
 * @param MpRateVariable
 * @parent <AdjustVariable>
 * @type variable
 * @desc This variable sets the maximum HP adjustment value.
 * If the value of the variable is 10, it will increase by 10%.
 * 
 * @param AtkRateVariable
 * @parent <AdjustVariable>
 * @type variable
 * @desc This variable sets the attack adjustment value.
 * If the value of the variable is 10, it will increase by 10%.
 * 
 * @param DefRateVariable
 * @parent <AdjustVariable>
 * @type variable
 * @desc This variable sets the defense adjustment value.
 * If the value of the variable is 10, it will increase by 10%.
 * 
 * @param MatRateVariable
 * @parent <AdjustVariable>
 * @type variable
 * @desc This variable sets the magic attack adjustment value.
 * If the value of the variable is 10, it will increase by 10%.
 * 
 * @param MdfRateVariable
 * @parent <AdjustVariable>
 * @type variable
 * @desc This variable sets the magic defense adjustment value.
 * If the value of the variable is 10, it will increase by 10%.
 * 
 * @param AgiRateVariable
 * @parent <AdjustVariable>
 * @type variable
 * @desc This variable sets the agility adjustment value.
 * If the value of the variable is 10, it will increase by 10%.
 * 
 * @param LukRateVariable
 * @parent <AdjustVariable>
 * @type variable
 * @desc This variable sets the luck adjustment value.
 * If the value of the variable is 10, it will increase by 10%.
 * 
 * @param ExpRateVariable
 * @parent <AdjustVariable>
 * @type variable
 * @desc This variable sets the experience adjustment value.
 * If the value of the variable is 10, it will increase by 10%.
 * 
 * @param GoldRateVariable
 * @parent <AdjustVariable>
 * @type variable
 * @desc This variable sets the gold adjustment value.
 * If the value of the variable is 10, it will increase by 10%.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.03 敵の能力値をレベルと百分率で設定
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
 * <ParamBaseClass:?>
 * 
 * 能力値の基準となる職業を変更します。?がＩＤです。
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
 * ■能力値補正
 * -------------------------------------------------------------------
 * プラグインパラメータで能力値補正を行う変数を設定できます。
 * 例えば、『ＨＰ補正変数』に設定した変数の値を10にすれば、
 * 全ての敵の最大ＨＰが１０％上昇します。
 * 
 * 難易度設定や細かいバランス調整にご利用ください。
 * 
 * なお、『能力値レベル変数』のみ特殊で、これは指定した数値分だけ
 * 能力値の計算に関するレベルを上げるというものです。
 * b.levelで参照できる値や、経験値や所持金の計算にも影響を与えません。
 * マイナス値も可能ですが、レベル1を下回ることはできません。
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
 * ■図鑑系プラグインとの併用について
 * -------------------------------------------------------------------
 * 外部のモンスター図鑑系プラグインと併用する場合は注意が必要です。
 * 図鑑で敵キャラデータを表示した場合も、
 * 現在の設定レベルでのパラメータが表示されるためです。
 * ※ABMZ_EnemyBook.jsなどEnemyBook.js（ＭＶのＤＬＣプラグイン）に
 * 　準拠したプラグインを想定しています。
 *
 * レベルが常に固定値ならば問題ないのですが、
 * 基準レベルやランダム幅を利用している場合は
 * それらによる変動まで反映されてしまいます。
 *
 * 暫定的な対処として、図鑑表示中は％値をそのまま表示できるようにしています。
 * 『魔物図鑑に対応』をオンにすると有効になります。
 * ※本当は数値の後ろに％文字を付けたかったのですが、こちらでは困難でした。
 * 　図鑑プラグイン側を編集したほうが現実的と思われます。
 *
 * なお、この仕様は戦闘中には対応しておらず、現在値がそのまま表示されます。
 * 該当のプラグインの中には、戦闘中に敵の能力値を調べる機能もありますが、
 * その際はそのほうが都合が良いと思われます。
 * ……そもそも、戦闘時は図鑑を開いているという判定を得ること自体が
 * 難しいという事情もあります。
 *
 * 他にも、簡単な対処として図鑑側でパラメータを
 * 表示しないという方法もありますので、用途に合わせて調整してください。
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
 * 
 * @param SupportEnemyBook
 * @text 魔物図鑑に対応
 * @type boolean
 * @default false
 * @desc モンスター図鑑と併用時、実際のパラメータではなく％値を表示するようにします。
 * 
 * @param <AdjustVariable>
 * @text ＜能力値補正変数＞
 * @desc 能力値を補正するための変数を設定します。
 * 
 * @param ParamLevelVariable
 * @text 能力値レベル変数
 * @parent <AdjustVariable>
 * @type variable
 * @desc 指定したレベル分、能力を上昇させます。
 * 経験値などには影響を与えません。
 * 
 * @param HpRateVariable
 * @text ＨＰ補正変数
 * @parent <AdjustVariable>
 * @type variable
 * @desc 最大ＨＰの補正値を設定する変数です。
 * 変数の値が10ならば、10%上昇します。
 * 
 * @param MpRateVariable
 * @text ＭＰ補正変数
 * @parent <AdjustVariable>
 * @type variable
 * @desc 最大ＭＰの補正値を設定する変数です。
 * 変数の値が10ならば、10%上昇します。
 * 
 * @param AtkRateVariable
 * @text 攻撃力補正変数
 * @parent <AdjustVariable>
 * @type variable
 * @desc 攻撃力の補正値を設定する変数です。
 * 変数の値が10ならば、10%上昇します。
 * 
 * @param DefRateVariable
 * @text 防御力補正変数
 * @parent <AdjustVariable>
 * @type variable
 * @desc 防御力の補正値を設定する変数です。
 * 変数の値が10ならば、10%上昇します。
 * 
 * @param MatRateVariable
 * @text 魔法力補正変数
 * @parent <AdjustVariable>
 * @type variable
 * @desc 魔法力の補正値を設定する変数です。
 * 変数の値が10ならば、10%上昇します。
 * 
 * @param MdfRateVariable
 * @text 魔法防御補正変数
 * @parent <AdjustVariable>
 * @type variable
 * @desc 魔法防御の補正値を設定する変数です。
 * 変数の値が10ならば、10%上昇します。
 * 
 * @param AgiRateVariable
 * @text 敏捷性補正変数
 * @parent <AdjustVariable>
 * @type variable
 * @desc 敏捷性の補正値を設定する変数です。
 * 変数の値が10ならば、10%上昇します。
 * 
 * @param LukRateVariable
 * @text 運補正変数
 * @parent <AdjustVariable>
 * @type variable
 * @desc 運の補正値を設定する変数です。
 * 変数の値が10ならば、10%上昇します。
 * 
 * @param ExpRateVariable
 * @text 経験値補正変数
 * @parent <AdjustVariable>
 * @type variable
 * @desc 経験値の補正値を設定する変数です。
 * 変数の値が10ならば、10%上昇します。
 * 
 * @param GoldRateVariable
 * @text 所持金補正変数
 * @parent <AdjustVariable>
 * @type variable
 * @desc 所持金の補正値を設定する変数です。
 * 変数の値が10ならば、10%上昇します。
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
const pSupportEnemyBook = toBoolean(parameters["SupportEnemyBook"], false);
const pParamLevelVariable = toNumber(parameters["ParamLevelVariable"]);
const pHpRateVariable = toNumber(parameters["HpRateVariable"]);
const pMpRateVariable = toNumber(parameters["MpRateVariable"]);
const pAtkRateVariable = toNumber(parameters["AtkRateVariable"]);
const pDefRateVariable = toNumber(parameters["DefRateVariable"]);
const pMatRateVariable = toNumber(parameters["MatRateVariable"]);
const pMdfRateVariable = toNumber(parameters["MdfRateVariable"]);
const pAgiRateVariable = toNumber(parameters["AgiRateVariable"]);
const pLukRateVariable = toNumber(parameters["LukRateVariable"]);
const pExpRateVariable = toNumber(parameters["ExpRateVariable"]);
const pGoldRateVariable = toNumber(parameters["GoldRateVariable"]);

// ----------------------------------------------------------------------------
// Game_Enemy
// ----------------------------------------------------------------------------

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
    if (!this._level || this._level < 1) {
        this._level = 1;
    }

    _Game_Enemy_setup.apply(this, arguments);
};

/**
 * 【上書】パラメータの計算
 */
const _Game_Enemy_paramBase = Game_Enemy.prototype.paramBase;
Game_Enemy.prototype.paramBase = function(paramId) {
    // 図鑑使用時はそのまま％値を取得
    if (isEnemyBookScene()) {
        return _Game_Enemy_paramBase.apply(this, arguments);
    }

    // パラメータ計算用のレベル
    let paramLevel = this._level;
    if (pParamLevelVariable) {
        paramLevel += $gameVariables.value(pParamLevelVariable);
    }
    // レベルは最低でも1を設定
    if (paramLevel < 1) {
        paramLevel = 1;
    }

    // パラメータのベースとなる職業を取得
    const baseValue = this.getParamBaseClass().params[paramId][paramLevel];
    // 元の値を％として使用して乗算
    const percent = this.enemy().params[paramId];
    // さらに補正をかける。
    const paramRate = getParamAdjustRate(paramId);

    return Math.round(baseValue * (percent / 100) * (paramRate / 100));
};

/**
 * ●能力値補正を取得
 */
function getParamAdjustRate(paramId) {
    let rate = 100;
    // 0:MHP
    if (paramId == 0 && pHpRateVariable) {
        rate += $gameVariables.value(pHpRateVariable);
    // 1:MMP
    } else if (paramId == 1 && pMpRateVariable) {
        rate += $gameVariables.value(pMpRateVariable);
    // 2:ATK
    } else if (paramId == 2 && pAtkRateVariable) {
        rate += $gameVariables.value(pAtkRateVariable);
    // 3:DEF
    } else if (paramId == 3 && pDefRateVariable) {
        rate += $gameVariables.value(pDefRateVariable);
    // 4:MAT
    } else if (paramId == 4 && pMatRateVariable) {
        rate += $gameVariables.value(pMatRateVariable);
    // 5:MDF
    } else if (paramId == 5 && pMdfRateVariable) {
        rate += $gameVariables.value(pMdfRateVariable);
    // 6:AGI
    } else if (paramId == 6 && pAgiRateVariable) {
        rate += $gameVariables.value(pAgiRateVariable);
    // 7:LUK
    } else if (paramId == 7 && pLukRateVariable) {
        rate += $gameVariables.value(pLukRateVariable);
    }
    return rate;
}

/**
 * 【上書】経験値の取得
 */
const _Game_Enemy_exp = Game_Enemy.prototype.exp;
Game_Enemy.prototype.exp = function() {
    // 指定がない場合はそのまま
    if (!pBaseExp) {
        return _Game_Enemy_exp.apply(this, arguments);

    // 図鑑使用時はそのまま％値を取得
    } else if (isEnemyBookScene()) {
        return _Game_Enemy_exp.apply(this, arguments);
    }

    // eval参照用
    const a = this;
    // 基準となる経験値
    const baseExp = eval(pBaseExp);
    // 元の値を％として使用して乗算
    const percent = this.enemy().exp;
    // さらに補正をかける。
    let expRate = 100;
    if (pExpRateVariable) {
        expRate += $gameVariables.value(pExpRateVariable);
    }

    return Math.round(baseExp * (percent / 100) * (expRate / 100));
};

/**
 * 【上書】お金の取得
 */
const _Game_Enemy_gold = Game_Enemy.prototype.gold;
Game_Enemy.prototype.gold = function() {
    // 指定がない場合はそのまま
    if (!pBaseGold) {
        return _Game_Enemy_gold.apply(this, arguments);

    // 図鑑使用時はそのまま％値を取得
    } else if (isEnemyBookScene()) {
        return _Game_Enemy_gold.apply(this, arguments);
    }

    // eval参照用
    const a = this;
    // 基準となるお金
    const baseGold = eval(pBaseGold);
    // 元の値を％として使用して乗算
    const percent = this.enemy().gold;
    // さらに補正をかける。
    let goldRate = 100;
    if (pGoldRateVariable) {
        goldRate += $gameVariables.value(pGoldRateVariable);
    }

    return Math.round(baseGold * (percent / 100) * (goldRate / 100));
};

/**
 * 【独自】現在の職業（＝基準となる職業で固定）
 */
Game_Enemy.prototype.currentClass = function() {
    return this.getParamBaseClass();
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

/**
 * 【独自】パラメータのベースとなる職業を取得
 */
Game_Enemy.prototype.getParamBaseClass = function() {
    // 個別の指定がある場合
    const paramBaseClass = this.enemy().meta.ParamBaseClass;
    if (paramBaseClass) {
        return $dataClasses[paramBaseClass];
    }

    // 通常
    return $dataClasses[pBaseClass];
};

// ----------------------------------------------------------------------------
// Game_Party
// ----------------------------------------------------------------------------

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

// ----------------------------------------------------------------------------
// 共通関数
// ----------------------------------------------------------------------------

/**
 * ●魔物図鑑シーンかどうか？
 */
function isEnemyBookScene() {
    if (pSupportEnemyBook && (SceneManager._scene.constructor.name == "Scene_EnemyBook")) {
        return true;
    }
    return false;
}

})();
