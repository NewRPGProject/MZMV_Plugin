//=============================================================================
// NRP_LevelGrowTP.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.021 Level growth of TP.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @orderAfter NRP_AdditionalClasses
 * @orderAfter NRP_EnemyPercentParams
 * @url https://newrpg.seesaa.net/article/489719706.html
 *
 * @help Allow the Max TP (normally fixed at 100) to grow in level.
 * In short, it can be used as another MP.
 * 
 * Max TP is calculated using the same formula
 * as the ability value curve in the Class database.
 * It is handled as similarly as possible to other parameters.
 * 
 * -------------------------------------------------------------------
 * [Note of Classes]
 * -------------------------------------------------------------------
 * Fill in the following in the Classes note field
 * to set up the Max TP parameter curve.
 * ※Specifications are almost the same
 *   as other parameters such as Max MP.
 * 
 * <GrowCurveMTP:[Lv1 value],[Lv99 value],[growth type]>
 * 
 * growth type is a 21-level value (0-20) used to generate the curve.
 * Early growth is 0, standard is 10, and late growth is 20.
 * For example, if Lv1 is 0, Lv99 is 200,
 * and the growth type is standard, then <GrowCurveMTP:0,200,10>.
 * 
 * -------------------------------------------------------------------
 * [Note of Weapons and Armors]
 * -------------------------------------------------------------------
 * <PlusMTP:?>
 * Max TP is added by the specified number.
 * 
 * -------------------------------------------------------------------
 * [Note of Actors, Classes, Weapons, Armors and States]
 * -------------------------------------------------------------------
 * <RateMTP:?>
 * Vary Max TP by the specified percentage.
 * Set the value based on 100.
 * ※Equivalent to the normal capacity value of the traits.
 * 
 * -------------------------------------------------------------------
 * [Note of Enemies]
 * -------------------------------------------------------------------
 * <MTP:?>
 * Set Max TP. Formula is valid.
 * 
 * -------------------------------------------------------------------
 * [Note of Items]
 * -------------------------------------------------------------------
 * <GrowMTP:?>
 * Grows Max TP by the specified number.
 * 
 * -------------------------------------------------------------------
 * [Setting of Enemies]
 * -------------------------------------------------------------------
 * Inevitably, you will need to set the enemy's Max TP.
 * You can either set the initial value
 * with a plugin parameter or specify it individually.
 * 
 * The default value is 999999.
 * If you do not need to control the TP of your enemies,
 * it is easy to set a uniformly large value.
 * 
 * If you want to specify the value individually,
 * use <MTP:?> above if you want to specify them individually.
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
 * @param TpParamId
 * @type number
 * @min 0
 * @default 10
 * @desc Parameter ID to manage TP. This value follows the existing "0:Max HP to 7:Luck", but 10 or later is recommended.
 * 
 * @param MaxTpName
 * @type string
 * @default Max TP
 * @desc Max TP display name.
 * This is used when displaying the name with external plugins, etc.
 * 
 * @param PreserveTp
 * @type boolean
 * @default true
 * @desc Always "Preserve TP" regardless of traits.
 * 
 * @param RecoverAllTp
 * @type boolean
 * @default true
 * @desc TP is also recovered upon full recovery.
 * 
 * @param ApplyRegenerateTp
 * @type boolean
 * @default true
 * @desc Modifies the amount of recovery based on the TP regeneration rate to a value based on Max TP.
 * 
 * @param NoChargeTpByDamage
 * @type boolean
 * @default true
 * @desc Eliminate TP charge on damage.
 * 
 * @param ShowPopupTp
 * @type boolean
 * @default true
 * @desc TP damage/recovery pops up as well as HP and MP.
 * 
 * @param ShowRegenerateTp
 * @parent ShowPopupTp
 * @type boolean
 * @default true
 * @desc Displays a popup during TP regeneration.
 * 
 * @param TpDamageColor
 * @parent ShowPopupTp
 * @type string
 * @default #90ffff
 * @desc The RGB value of the color to be used for the pop-up at the time of TP damage.
 * 
 * @param TpRecoverColor
 * @parent ShowPopupTp
 * @type string
 * @default #ffff80
 * @desc The RGB value of the color to be used for the pop-up during TP recovery.
 * 
 * @param <EnemySetting>
 * 
 * @param EnemyDefaultMTP
 * @parent <EnemySetting>
 * @type string
 * @default 999999
 * @desc Initial value of Max TP for enemy.
 * Can be numeric, e.g. a.mmp, a.level, etc.
 * 
 * @param EnemyStartTP
 * @parent <EnemySetting>
 * @type number @min 0 @max 100
 * @default 100
 * @desc Initial % of the enemy's TP at the beginning of the battle. 100 is the full value.
 * 
 * @param TargetNoNameData
 * @type boolean
 * @default false
 * @desc Writes Max TP information to unnamed data.
 * ※Load time will be a little longer.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.021 ＴＰをレベル成長させる。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @orderAfter NRP_AdditionalClasses
 * @orderAfter NRP_EnemyPercentParams
 * @url https://newrpg.seesaa.net/article/489719706.html
 *
 * @help 最大ＴＰ（通常１００で固定）をレベル成長するようにします。
 * 要するに、もう一つのＭＰとして使用できるようになります。
 * 
 * 最大ＴＰは職業ＤＢの能力値曲線と同一の計算式で算出します。
 * なるべく他のパラメータと同様の感覚で扱えるようにしています。
 * 
 * -------------------------------------------------------------------
 * ■職業のメモ欄
 * -------------------------------------------------------------------
 * 以下を職業のメモ欄に記入し、最大ＴＰの能力曲線を設定してください。
 * ※仕様は最大ＭＰなど他のパラメータとほぼ同じです。
 * 
 * <GrowCurveMTP:[Lv1の値],[Lv99の値],[成長タイプ]>
 * 
 * 成長タイプは曲線生成に使用する２１段階（0～20）の値です。
 * 早熟が0、標準が10、晩熟が20となります。
 * 例えば、Lv1が0、Lv99が200、成長タイプが標準の場合は、
 * <GrowCurveMTP:0,200,10>となります。
 * 
 * -------------------------------------------------------------------
 * ■武器、防具のメモ欄
 * -------------------------------------------------------------------
 * <PlusMTP:?>
 * 最大ＴＰを指定数値分だけ加算します。
 * 
 * -------------------------------------------------------------------
 * ■アクター、職業、武器、防具、ステートのメモ欄
 * -------------------------------------------------------------------
 * <RateMTP:?>
 * 最大ＴＰを指定した％分変動させます。
 * 100を基準に設定してください。
 * ※特徴の通常能力値に相当します。
 * 
 * -------------------------------------------------------------------
 * ■敵キャラのメモ欄
 * -------------------------------------------------------------------
 * <MTP:?>
 * 最大ＴＰを設定します。数式可。
 * 
 * -------------------------------------------------------------------
 * ■アイテムのメモ欄
 * -------------------------------------------------------------------
 * <GrowMTP:?>
 * 最大ＴＰを数値分成長させます。
 * 
 * -------------------------------------------------------------------
 * ■敵キャラの設定
 * -------------------------------------------------------------------
 * 必然的に敵キャラの最大ＴＰを設定する必要があります。
 * プラグインパラメータで初期値を設定するか、個別に指定してください。
 * 
 * 初期値は999999になっています。
 * 敵のＴＰ管理を行う必要がない場合は、
 * 一律で大きな値を設定しておくのが簡単です。
 * 
 * 個別に指定する場合は上述の<MTP:?>を使用してください。
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
 * @param TpParamId
 * @text ＴＰのパラメータＩＤ
 * @type number
 * @min 0
 * @default 10
 * @desc ＴＰを管理するパラメータＩＤです。
 * 既存の0:最大ＨＰ～7:運に続く値ですが、10以降を推奨。
 * 
 * @param MaxTpName
 * @text 最大ＴＰの表示名
 * @type string
 * @default 最大ＴＰ
 * @desc 最大ＴＰの表示名です。
 * 外部プラグイン等で名称表示する際に使います。
 * 
 * @param PreserveTp
 * @text 常にＴＰ持ち越し
 * @type boolean
 * @default true
 * @desc 特徴に寄らず常に『ＴＰ持ち越し』状態にします。
 * 
 * @param RecoverAllTp
 * @text 全回復にＴＰを含める
 * @type boolean
 * @default true
 * @desc 全回復時にＴＰも回復します。
 * 
 * @param ApplyRegenerateTp
 * @text ＴＰ再生率を修正
 * @type boolean
 * @default true
 * @desc ＴＰ再生率による回復量を最大ＴＰを基準とした値に修正します。
 * 
 * @param NoChargeTpByDamage
 * @text ダメージ時のＴＰ回復廃止
 * @type boolean
 * @default true
 * @desc ダメージ時のＴＰ回復を行いません。
 * 
 * @param ShowPopupTp
 * @text ＴＰをポップアップ表示
 * @type boolean
 * @default true
 * @desc ＨＰやＭＰと同じようにＴＰダメージ／回復もポップアップ表示します。
 * 
 * @param ShowRegenerateTp
 * @parent ShowPopupTp
 * @text ＴＰ再生を表示
 * @type boolean
 * @default true
 * @desc ＴＰ再生時にポップアップを表示します。
 * 
 * @param TpDamageColor
 * @parent ShowPopupTp
 * @text ＴＰダメージの色
 * @type string
 * @default #90ffff
 * @desc ＴＰダメージ時のポップアップに使用する色のＲＧＢ値です。
 * 
 * @param TpRecoverColor
 * @parent ShowPopupTp
 * @text ＴＰ回復の色
 * @type string
 * @default #ffff80
 * @desc ＴＰ回復時のポップアップに使用する色のＲＧＢ値です。
 * 
 * @param <EnemySetting>
 * @text ＜敵キャラの設定＞
 * 
 * @param EnemyDefaultMTP
 * @parent <EnemySetting>
 * @text 敵キャラの最大ＴＰ既定値
 * @type string
 * @default 999999
 * @desc 敵キャラの最大ＴＰの初期値です。
 * 数式可。a.mmp, a.levelなど。
 * 
 * @param EnemyStartTP
 * @parent <EnemySetting>
 * @text 敵キャラの初期ＴＰ％
 * @type number @min 0 @max 100
 * @default 100
 * @desc 戦闘開始時の敵キャラのＴＰの初期％です。
 * 100で全快になります。
 * 
 * @param TargetNoNameData
 * @text 名なしデータも対象
 * @type boolean
 * @default false
 * @desc 名前のないデータにも最大ＴＰ情報を書き込みます。
 * ※少しロード時間が長くなります。
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

const PLUGIN_NAME = "NRP_LevelGrowTP";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pTpParamId = toNumber(parameters["TpParamId"], 8);
const pMaxTpName = parameters["MaxTpName"];
const pPreserveTp = toBoolean(parameters["PreserveTp"], false);
const pRecoverAllTp = toBoolean(parameters["RecoverAllTp"], false);
const pApplyRegenerateTp = toBoolean(parameters["ApplyRegenerateTp"], false);
const pNoChargeTpByDamage = toBoolean(parameters["NoChargeTpByDamage"], false);
const pShowPopupTp = toBoolean(parameters["ShowPopupTp"], false);
const pShowRegenerateTp = toBoolean(parameters["ShowRegenerateTp"], false);
const pTpDamageColor = setDefault(parameters["TpDamageColor"], "#90ffff");
const pTpRecoverColor = setDefault(parameters["TpRecoverColor"], "#ffff80");
const pEnemyDefaultMTP = parameters["EnemyDefaultMTP"];
const pEnemyStartTP = toNumber(parameters["EnemyStartTP"], 100);
const pTargetNoNameData = toBoolean(parameters["TargetNoNameData"], false);

//-----------------------------------------------------------------------------
// Scene_Boot
//-----------------------------------------------------------------------------

/**
 * ●ＤＢのロード完了後
 */
const _Scene_Boot_onDatabaseLoaded = Scene_Boot.prototype.onDatabaseLoaded;
Scene_Boot.prototype.onDatabaseLoaded = function() {
    // 各種データに最大ＴＰ情報を書込
    // 通常は1/100秒以下で終わるはずなので問題ないはず……。
    setMtpDataClasses($dataClasses);
    setMtpData($dataActors);
    setMtpData($dataSkills);
    setMtpData($dataItems);
    setMtpData($dataWeapons); 
    setMtpData($dataArmors);
    setMtpData($dataStates);

    _Scene_Boot_onDatabaseLoaded.apply(this, arguments);
};

/**
 * ●職業データを書込
 */
function setMtpDataClasses(dataArray) {
    // 職業データを書込
    for (const dataClass of dataArray) {
        // 名前が設定されているデータのみが対象
        if (dataClass && (pTargetNoNameData || dataClass.name)) {
            setClassObjectParams(dataClass);
        }
    }
}

/**
 * ●データを書込
 */
function setMtpData(dataArray) {
    for (const data of dataArray) {
        // 名前が設定されているデータのみが対象
        if (data && (pTargetNoNameData || data.name)) {
            setObjectParams(data);
        }
    }
}

//-----------------------------------------------------------------------------
// Game_BattlerBase
//-----------------------------------------------------------------------------

Game_BattlerBase.prototype.paramBasePlus = function(paramId) {
    // 初期化されてない場合は初期化
    // ※途中セーブ対応
    if (paramId == pTpParamId  && this._paramPlus[pTpParamId] == null) {
        this._paramPlus[pTpParamId] = 0;
        this._buffs[pTpParamId] = 0;
        this._buffTurns[pTpParamId] = 0;
    }

    return Math.max(0, this.paramBase(paramId) + this.paramPlus(paramId));
};

if (pPreserveTp) {
    /**
     * 【上書】ＴＰ持ち越し
     */
    Game_BattlerBase.prototype.isPreserveTp = function() {
        return true;
    };
}

if (pRecoverAllTp) {
    /**
     * ●全回復
     */
    const _Game_BattlerBase_recoverAll = Game_BattlerBase.prototype.recoverAll;
    Game_BattlerBase.prototype.recoverAll = function() {
        _Game_BattlerBase_recoverAll.apply(this, arguments);

        // ＴＰも全回復
        this._tp = this.maxTp();
    };
}

/**
 * 【上書】最大ＴＰ
 */
Game_BattlerBase.prototype.maxTp = function() {
    // パラメータ計算に変更
    return this.param(pTpParamId);
}

/**
 * ●パラメータの追加値をクリア
 */
const _Game_BattlerBase_clearParamPlus = Game_BattlerBase.prototype.clearParamPlus;
Game_BattlerBase.prototype.clearParamPlus = function() {
    _Game_BattlerBase_clearParamPlus.apply(this, arguments);

    for (let i = 8; i <= pTpParamId; i++) {
        this._paramPlus[i] = 0;
    }
};

/**
 * ●能力変化をクリア
 */
const _Game_BattlerBase_clearBuffs = Game_BattlerBase.prototype.clearBuffs;
Game_BattlerBase.prototype.clearBuffs = function() {
    _Game_BattlerBase_clearBuffs.apply(this, arguments);

    for (let i = 8; i <= pTpParamId; i++) {
        this._buffs[i] = 0;
        this._buffTurns[i] = 0;
    }
};

//-----------------------------------------------------------------------------
// Game_Battler
//-----------------------------------------------------------------------------

if (pNoChargeTpByDamage) {
    /**
     * 【上書】ダメージ時のＴＰ回復をしない。
     */
    Game_Battler.prototype.chargeTpByDamage = function(damageRate) {
        // const value = Math.floor(50 * damageRate * this.tcr);
        // this.gainSilentTp(value);
    };
}

if (pApplyRegenerateTp || (pShowPopupTp && pShowRegenerateTp)) {
    /**
     * 【上書】ＴＰ再生率
     */
    Game_Battler.prototype.regenerateTp = function() {
        let value;

        // 最大ＴＰを基準にする。
        if (pApplyRegenerateTp) {
            value = Math.floor(this.maxTp() * this.trg);
        // １００を基準にする。
        } else {
            value = Math.floor(100 * this.trg);
        }

        // ＴＰ再生を表示する。
        if (pShowRegenerateTp) {
            if (value !== 0) {
                this.gainTp(value);
            }
        // ＴＰ再生を表示しない。
        } else {
            this.gainSilentTp(value);
        }
    };
}

if (pShowPopupTp) {
    /**
     * ●ダメージポップアップの表示有無
     */
    const _Game_Battler_shouldPopupDamage = Game_Battler.prototype.shouldPopupDamage;
    Game_Battler.prototype.shouldPopupDamage = function() {
        const result = this._result;
        // ＴＰダメージをポップアップに追加
        return _Game_Battler_shouldPopupDamage.apply(this, arguments) || result.tpDamage !== 0;
    };
}

//-----------------------------------------------------------------------------
// Game_Enemy
//-----------------------------------------------------------------------------

/**
 * ●敵キャラの初期設定
 */
const _Game_Enemy_setup = Game_Enemy.prototype.setup;
Game_Enemy.prototype.setup = function(enemyId, x, y) {
    _Game_Enemy_setup.apply(this, arguments);

    this._tp = this.maxTp() * pEnemyStartTP / 100;
};

/**
 * ●パラメータの計算
 */
const _Game_Enemy_paramBase = Game_Enemy.prototype.paramBase;
Game_Enemy.prototype.paramBase = function(paramId) {
    if (paramId == pTpParamId) {
        // eval参照用
        const a = this;
        // 指定がある場合は採用
        const mtp = eval(this.enemy().meta.MTP);
        if (mtp != null) {
            return mtp;
        }
        // デフォルト値
        return eval(pEnemyDefaultMTP);
    }
    return _Game_Enemy_paramBase.apply(this, arguments);
};

//-----------------------------------------------------------------------------
// Sprite_Damage
//-----------------------------------------------------------------------------

if (pShowPopupTp) {
    /**
     * ●ダメージポップアップのセットアップ
     */
    const _Sprite_Damage_setup = Sprite_Damage.prototype.setup;
    Sprite_Damage.prototype.setup = function(target) {
        _Sprite_Damage_setup.apply(this, arguments);

        const result = target.result();
        // ＴＰダメージを追加
        if (target.isAlive() && result.tpDamage !== 0) {
            this._colorType = result.tpDamage >= 0 ? 4 : 5;
            this.createDigits(result.tpDamage);
        }
    };
}

//-----------------------------------------------------------------------------
// ColorManager
//-----------------------------------------------------------------------------

if (pShowPopupTp) {
    /**
     * ●ダメージ／回復時のポップアップの文字色
     */
    const _ColorManager_damageColor = ColorManager.damageColor;
    ColorManager.damageColor = function(colorType) {
        switch (colorType) {
            case 4: // TP damage
                return pTpDamageColor;
            case 5: // TP recover
                return pTpRecoverColor;
        }
        return _ColorManager_damageColor.apply(this, arguments);
    };
}

//-----------------------------------------------------------------------------
// TextManager
//-----------------------------------------------------------------------------

/**
 * ●パラメータ名の取得
 */
const _TextManager_param = TextManager.param;
TextManager.param = function(paramId) {
    // 最大ＴＰの場合
    if (paramId == pTpParamId) {
        return pMaxTpName;
    }
    return _TextManager_param.apply(this, arguments);
};

//-----------------------------------------------------------------------------
// 共通
//-----------------------------------------------------------------------------

/**
 * ●指定レベルの最大ＴＰを取得する。
 */
function calcLevelMTP(start, end, growType, level) {
    // 差分
    const diff = end - start;
    // 上昇レベル
    const upLevel = level - 1;
    // 早熟計算式
    const earlyValue = start + upLevel * (diff / 98) * (196 - upLevel) / 98;
    // 晩熟計算式
    const lateValue = start + upLevel * (diff / 98) * upLevel / 98;
    // 成長タイプを考慮
    const value = earlyValue * ((20 - growType) / 20) + lateValue * (growType / 20);
    // 小数点は切り上げ
    return Math.ceil(value);
}

/**
 * ●JSONオブジェクトに値を設定
 */
function setObjectParams(object) {
    // パラメータが有効なオブジェクトなら
    if (object.params) {
        // 最大ＴＰを書込
        object.params[pTpParamId] = 0;
        const plusTP = eval(object.meta.PlusMTP);
        if (plusTP != null) {
            object.params[pTpParamId] = plusTP;
        }
    }
    // アイテムならば
    if (DataManager.isItem(object)) {
        // 最大ＴＰ成長値を書込
        const growMTP = eval(object.meta.GrowMTP);
        if (growMTP) {
            object.effects.push({
                code: Game_Action.EFFECT_GROW
                ,dataId: pTpParamId
                ,value1: growMTP
            });
        }
    }
    // 特徴情報を設定
    setObjectTraits(object);
}

/**
 * ●職業のJSONオブジェクトに値を設定
 */
function setClassObjectParams(object) {
    if (object && object.params) {
        object.params[pTpParamId] = [];
        const growCurveMTP = object.meta.GrowCurveMTP;
        // 成長曲線の指定がある場合
        if (growCurveMTP) {
            const values = growCurveMTP.split(",");
            const start = Number(values[0]);
            const end = Number(values[1]);
            const growType = Number(values[2]);
            for (let level = 1; level <= 99; level++) {
                // 最大ＴＰを求めて全レベル分を書込
                const mtp = calcLevelMTP(start, end, growType, level);
                object.params[pTpParamId][level] = mtp;
            }
        // 成長曲線の指定がない場合
        } else {
            // 0で初期化しておく。
            for (let level = 1; level <= 99; level++) {
                object.params[pTpParamId][level] = 0;
            }
        }
    }
    // 特徴情報を設定
    setObjectTraits(object);
}

/**
 * ●JSONオブジェクトに特徴値を設定
 */
function setObjectTraits(object) {
    // 特徴が有効なオブジェクトなら
    if (object && object.traits) {
        // 最大ＴＰ倍率を書込
        const rateTP = eval(object.meta.RateMTP);
        if (rateTP) {
            object.traits.push({
                code: Game_BattlerBase.TRAIT_PARAM
                ,dataId: pTpParamId
                ,value: rateTP / 100
            });
        }
    }
}

})();
