//=============================================================================
// NRP_OriginalRewards.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Add original battle rewards.
 * @author Takeshi Sunagawa (https://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/499770382.html
 *
 * @help Add the original battle rewards and store them in a variable.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Set the original reward in the "RewardList" plugin parameters.
 * You can set rewards for each enemy in the following two ways
 * 
 * 1. Set the MetaName.
 *    Describe the MetaName and value in the note of the enemy.
 *    Example: If MetaName is TestReward, then <TestReward:100>.
 * 
 * 2. Set the DefaultValue.
 *    For example, if "a.gold() / 10", then 1/10 of the enemy's gold
 *    will be obtained as original rewards.
 *    This is recommended when it is troublesome to set one by one.
 * 
 * The above can be used in combination.
 * If MetaName is specified, it takes precedence over MetaName,
 * so it is possible to use fixed values only for bosses.
 * 
 * -------------------------------------------------------------------
 * [Rated Value]
 * -------------------------------------------------------------------
 * Rate after MetaName specifies a magnification factor
 * for the default value.
 * For example, if MetaName is TestReward,
 * 
 * <TestRewardRate:200>
 * 
 * would get a original rewards of twice the default value.
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
 * @param RewardList
 * @type struct<Reward>[]
 * @default ["{\"Name\":\"Test Stone\",\"MetaName\":\"TestReward\",\"GainMessage\":\"%1 %2 received!\",\"GainMessagePosition\":\"gold\",\"Variable\":\"1\",\"DefaultValue\":\"\",\"MaxValue\":\"999999\",\"Switch\":\"\"}"]
 * @desc Define additional rewards.
 */

/*~struct~Reward:
 * @param Name
 * @type string
 * @desc Name of reward.
 * 
 * @param MetaName
 * @type string
 * @desc The name of the reward definition. It is earned by writing <XXX:100> in the enemy's note.
 * 
 * @param GainMessage
 * @type string
 * @default %1 %2 received!
 * @desc Gaining message.
 * %1=Value, %2=Name
 * 
 * @param GainMessagePosition
 * @type select
 * @option After EXP @value exp
 * @option After Gold @value gold
 * @default gold
 * @desc The position where the gaining message is to be displayed.
 * 
 * @param Variable
 * @type variable
 * @desc Variables that control reward.
 * 
 * @param DefaultValue
 * @type string
 * @desc Default value of the reward.
 * (e.g.: a.gold() / 10).
 * 
 * @param MaxValue
 * @type number
 * @desc The maximum value of the reward.
 * The variable cannot be greater than this value.
 * 
 * @param Switch
 * @type switch
 * @desc The switch that activates the reward.
 * If blank, it is always enabled.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 独自の戦闘報酬を追加する。
 * @author 砂川赳（https://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/499770382.html
 *
 * @help 独自の戦闘報酬を追加し、変数へと格納します。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * プラグインパラメータの『報酬リスト』に独自報酬を設定してください。
 * 以下の二通りの方法で敵毎の報酬を設定できます。
 * 
 * １．定義名を設定する。
 * 　　敵キャラのメモ欄に定義名と値を記述します。
 * 　　例：定義名がTestRewardならば、<TestReward:100>
 * 
 * ２．既定値を設定する。
 * 　　例えば「a.gold() / 10」ならば、
 * 　　敵の所持金の1/10を独自報酬として獲得します。
 * 　　一体ずつ設定するのが面倒という場合にオススメです。
 * 
 * 上記は併用も可能です。
 * 定義名を指定した場合はそちらが優先されますので、
 * ボスのみ固定値にするといった使い方もできます。
 * 
 * -------------------------------------------------------------------
 * ■倍率指定
 * -------------------------------------------------------------------
 * 定義名の後にRateを付けると、既定値に対する倍率指定になります。
 * 例えば、定義名がTestRewardならば、
 * 
 * <TestRewardRate:200>
 * 
 * とすると、既定値の２倍の独自報酬を取得できます。
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
 * @param RewardList
 * @text 報酬リスト
 * @type struct<Reward>[]
 * @default {"Name":"テスト石","MetaName":"TestReward","GainMessage":"%2を %1個 手に入れた！","GainMessagePosition":"gold","Variable":"1","DefaultValue":"","MaxValue":"999999","Switch":""}
 * @desc 追加の報酬を定義します。
 */

/*~struct~Reward:ja
 * @param Name
 * @text 名前
 * @type string
 * @desc 報酬の名称です。
 * 
 * @param MetaName
 * @text 定義名
 * @type string
 * @desc 報酬の定義名です。敵のメモ欄に<XXX:100>というように記述すれば獲得されます。
 * 
 * @param GainMessage
 * @text 獲得メッセージ
 * @type string
 * @default %2を %1個 手に入れた！
 * @desc 獲得メッセージです。
 * %1に値、%2に名前が表示されます。
 * 
 * @param GainMessagePosition
 * @text メッセージの表示位置
 * @type select
 * @option 経験値の後 @value exp
 * @option 所持金の後 @value gold
 * @default gold
 * @desc 獲得メッセージを表示する位置です。
 * 
 * @param Variable
 * @text 変数
 * @type variable
 * @desc 報酬を管理する変数です。
 * 
 * @param DefaultValue
 * @text 既定値
 * @type string
 * @desc 報酬の既定値です。
 * （例：a.gold() / 10）など。
 * 
 * @param MaxValue
 * @text 最大値
 * @type number
 * @desc 報酬の最大値です。
 * 変数はこの値以上にはなりません。
 * 
 * @param Switch
 * @text スイッチ
 * @type switch
 * @desc 報酬が有効となるスイッチです。
 * 空欄なら常に有効となります。
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

const PLUGIN_NAME = "NRP_OriginalRewards";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pRewardList = parseStruct2(parameters["RewardList"]);

//-----------------------------------------------------------------------------
// Game_Party
//-----------------------------------------------------------------------------

/**
 * 【独自】報酬の獲得
 */
Game_Party.prototype.gainCustomReward = function(rewardData, amount) {
    const variableNo = toNumber(rewardData.Variable);
    const maxValue = toNumber(rewardData.MaxValue);

    let value = $gameVariables.value(variableNo);
    value += amount;
    if (maxValue) {
        value = value.clamp(0, maxValue)
    }
    $gameVariables.setValue(variableNo, value);
};

//-----------------------------------------------------------------------------
// Game_Troop
//-----------------------------------------------------------------------------

/**
 * 【独自】報酬合計の取得
 */
Game_Troop.prototype.customRewardTotal = function(rewardData) {
    const members = this.deadMembers();
    return members.reduce((r, enemy) => r + enemy.customReward(rewardData), 0);
};

//-----------------------------------------------------------------------------
// Game_Enemy
//-----------------------------------------------------------------------------

/**
 * 【独自】報酬の取得
 */
Game_Enemy.prototype.customReward = function(rewardData) {
    // 条件を満たしていない場合は０
    if (rewardData.Switch && !$gameSwitches.value(rewardData.Switch)) {
        return 0;
    }

    const a = this; // eval参照用

    // 報酬を0で初期化
    let customReward = 0;

    // 既定値
    const defaultValue = eval(rewardData.DefaultValue);
    // 設定値
    const metaValue = this.enemy().meta[rewardData.MetaName];

    // 設定値を優先
    if (metaValue != undefined) {
        customReward = eval(metaValue);
    // 設定値がない場合は既定値
    } else if (defaultValue != undefined) {
        customReward = defaultValue;
    }

    // rateを乗算する。
    const rate = this.enemy().meta[rewardData.MetaName + "Rate"];
    if (rate != undefined) {
        customReward = Math.round(customReward * rate / 100);
    }

    return customReward;
};

//-----------------------------------------------------------------------------
// BattleManager
//-----------------------------------------------------------------------------

/**
 * ●報酬の作成
 */
const _BattleManager_makeRewards = BattleManager.makeRewards;
BattleManager.makeRewards = function() {
    _BattleManager_makeRewards.apply(this, arguments);

    // 追加報酬を設定
    for (const rewardData of pRewardList) {
        this._rewards[rewardData.MetaName] = $gameTroop.customRewardTotal(rewardData);
    }
};

/**
 * ●報酬の獲得
 */
const _BattleManager_gainRewards = BattleManager.gainRewards;
BattleManager.gainRewards = function() {
    _BattleManager_gainRewards.apply(this, arguments);

    // 追加報酬の獲得
    this.gainCustomRewards();
};

/**
 * 【独自】追加報酬の獲得
 */
BattleManager.gainCustomRewards = function() {
    for (const rewardData of pRewardList) {
        $gameParty.gainCustomReward(rewardData, this._rewards[rewardData.MetaName]);
    }
};

/**
 * ●経験値の表示
 */
const _BattleManager_displayExp = BattleManager.displayExp;
BattleManager.displayExp = function() {
    _BattleManager_displayExp.apply(this, arguments);

    // 経験値の後に表示するものに限定
    const expList = pRewardList.filter(r => r.GainMessagePosition == "exp");

    // 追加報酬の獲得メッセージ
    for (const rewardData of expList) {
        const gainValue = this._rewards[rewardData.MetaName];
        if (gainValue > 0) {
            $gameMessage.add("\\." + rewardData.GainMessage.format(gainValue, rewardData.Name));
        }
    }
};

/**
 * ●お金の表示
 */
const _BattleManager_displayGold = BattleManager.displayGold;
BattleManager.displayGold = function() {
    _BattleManager_displayGold.apply(this, arguments);

    // 所持金の後に表示するものに限定
    const goldList = pRewardList.filter(r => r.GainMessagePosition == "gold");

    // 追加報酬の獲得メッセージ
    for (const rewardData of goldList) {
        const gainValue = this._rewards[rewardData.MetaName];
        if (gainValue > 0) {
            $gameMessage.add("\\." + rewardData.GainMessage.format(gainValue, rewardData.Name));
        }
    }
};

})();
