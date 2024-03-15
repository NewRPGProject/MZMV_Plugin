//=============================================================================
// NRP_MultipleRegenerate.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.001 Allow simultaneous display of HP and MP regeneration.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/502669111.html
 *
 * @help If the HP regeneration rate and MP regeneration rate
 * are set at the same time, RPG Maker has a specification (bug?)
 * that only one of the recovery amounts can be displayed.
 * 
 * Therefore, this specification should be improved
 * to allow simultaneous display of HP and MP regeneration.
 * 
 * Note that the TP regeneration rate is also supported,
 * but the TP regeneration value is not displayed by default.
 * You will need to prepare another plug-in for display.
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
 * @ Plugin Parameters
 * @-----------------------------------------------------
 * 
 * @param Interval
 * @type number
 * @default 30
 * @desc Display interval between regeneration values, set in 1/60 second increments.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.001 ＨＰ再生とＭＰ再生の同時表示を可能にする。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/502669111.html
 *
 * @help HP再生率とMP再生率を同時に設定した場合、
 * ツクールには回復量を片方しか表示できない仕様（バグ？）があります。
 * 
 * そこでこの仕様を改善し、
 * 同時にＨＰ再生とＭＰ再生を表示できるようにします。
 * 
 * なお、TP再生率にも対応していますが、
 * 初期状態ではTP再生の値は表示されないので、
 * 表示用のプラグインを他に用意する必要があります。
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
 * @param Interval
 * @text 間隔
 * @type number
 * @default 30
 * @desc 再生値同士の表示間隔です。1/60秒単位で設定してください。
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

const PLUGIN_NAME = "NRP_MultipleRegenerate";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pInterval = toNumber(parameters["Interval"], 0);

//-----------------------------------------------------------------------------
// Sprite_Battler
//-----------------------------------------------------------------------------

/**
 * ●ダメージの生成
 */
const _Sprite_Battler_createDamageSprite = Sprite_Battler.prototype.createDamageSprite;
Sprite_Battler.prototype.createDamageSprite = function() {
    const result = this._battler.result();

    // ディレイ値をリセット
    result.multipleRegenerateDelay = 0;

    // ミス・回避の場合
    if (result.missed || result.evaded) {
        // そのまま通常表示
        _Sprite_Battler_createDamageSprite.apply(this, arguments);
        return;
    }

    let count = 0;
    if (result.hpAffected) {
        count++;
    }
    if (this._battler.isAlive() && result.mpDamage !== 0) {
        count++;
    }
    if (this._battler.isAlive() && result.tpDamage !== 0) {
        count++;
    }

    // 複数の結果を内包している場合は、それぞれを表示
    if (count >= 2) {
        const hpDamage = result.hpDamage;
        const mpDamage = result.mpDamage;
        const tpDamage = result.tpDamage;

        // 一旦各項目をリセットする。
        result.hpDamage = 0;
        result.mpDamage = 0;
        result.tpDamage = 0;

        // ＨＰダメージ／回復の表示
        if (result.hpAffected) {
            result.hpDamage = hpDamage;
            _Sprite_Battler_createDamageSprite.apply(this, arguments);
            result.hpAffected = false;
            result.hpDamage = 0;
            // 表示間隔を設定
            result.multipleRegenerateDelay += pInterval;
        }
        // ＭＰダメージ／回復の表示
        if (mpDamage !== 0) {
            result.mpDamage = mpDamage;
            _Sprite_Battler_createDamageSprite.apply(this, arguments);
            result.mpDamage == 0;
            // 表示間隔を設定
            result.multipleRegenerateDelay += pInterval;
        }
        // ＴＰダメージ／回復の表示
        if (tpDamage !== 0) {
            result.tpDamage = tpDamage;
            _Sprite_Battler_createDamageSprite.apply(this, arguments);
            result.tpDamage = 0;
        }
        return;
    }

    // それ以外は通常表示
    _Sprite_Battler_createDamageSprite.apply(this, arguments);
};

//-----------------------------------------------------------------------------
// Sprite_Damage
//-----------------------------------------------------------------------------

/**
 * ●ダメージ表示の設定
 */
const _Sprite_Damage_setup = Sprite_Damage.prototype.setup;
Sprite_Damage.prototype.setup = function(target) {
    _Sprite_Damage_setup.apply(this, arguments);

    // ディレイを設定
    const result = target.result();
    if (result.multipleRegenerateDelay) {
        this._multipleRegenerateDelay = result.multipleRegenerateDelay;
        // ダメージ表示を消しておく。
        this.visible = false;
    }
};

/**
 * ●ダメージスプライトの更新
 */
const _Sprite_Damage_update = Sprite_Damage.prototype.update;
Sprite_Damage.prototype.update = function() {
    // ディレイの指定がある場合は待つ
    if (this._multipleRegenerateDelay > 0) {
        // 帰還待ちの場合はそちらを先に待つ
        // ※NRP_DynamicReturningAction.jsのメソッド
        if (this.isReturningWait && this.isReturningWait()) {
            return;
        }
        // 時間減算
        this._multipleRegenerateDelay--;
        if (this._multipleRegenerateDelay > 0) {
            return;
        }
        // ダメージ表示開始
        this.visible = true;
    }
    _Sprite_Damage_update.apply(this, arguments);
};

})();
