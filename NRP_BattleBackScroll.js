//=============================================================================
// NRP_BattleBackScroll.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Scroll through the battle backgrounds.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/488098471.html
 *
 * @help Scroll through the battle backgrounds.
 * Intended uses include scrolling clouds in the background,
 * fighting on vehicles, fighting in a mysterious different space,
 * and fighting while falling.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Settings are made for
 * each battle background (battlebacks1, battlebacks2) file.
 * Specify file and scroll settings for each list.
 * 
 * You can also specify variables to make the speed variable.
 * 
 * [Terms]
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
 * @param Battleback1SettingList
 * @type struct<Battleback1Setting>[]
 * @default
 * @desc The following is a list of settings for Battleback1 (below).
 * 
 * @param Battleback2SettingList
 * @type struct<Battleback2Setting>[]
 * @default
 * @desc The following is a list of settings for Battleback2 (above).
 */
//-----------------------------------------------------------------------------
// Battleback1Setting
//-----------------------------------------------------------------------------
/*~struct~Battleback1Setting:ja
 * @param Battleback1
 * @type file
 * @dir img/battlebacks1
 * @desc The battle background (below) to set the scroll effect.
 * 
 * @param SpeedX
 * @type number
 * @max 999 @min -999
 * @decimals 2
 * @desc Scroll speed in horizontal direction.
 * 
 * @param SpeedY
 * @type number
 * @max 999 @min -999
 * @decimals 2
 * @desc Scroll speed in vertical direction.
 * 
 * @param SpeedXVariable
 * @type variable
 * @desc Variable that determines the horizontal scrolling speed.
 * When set, it takes precedence over SpeedX.
 * 
 * @param SpeedYVariable
 * @type variable
 * @desc Variable that determines the vertical scrolling speed.
 * When set, it takes precedence over SpeedY.
 */
//-----------------------------------------------------------------------------
// Battleback2Setting
//-----------------------------------------------------------------------------
/*~struct~Battleback2Setting:ja
 * @param Battleback2
 * @type file
 * @dir img/battlebacks2
 * @desc The battle background (above) to set the scroll effect.
 * 
 * @param SpeedX
 * @type number
 * @max 999 @min -999
 * @decimals 2
 * @desc Scroll speed in horizontal direction.
 * 
 * @param SpeedY
 * @type number
 * @max 999 @min -999
 * @decimals 2
 * @desc Scroll speed in vertical direction.
 * 
 * @param SpeedXVariable
 * @type variable
 * @desc Variable that determines the horizontal scrolling speed.
 * When set, it takes precedence over SpeedX.
 * 
 * @param SpeedYVariable
 * @type variable
 * @desc Variable that determines the vertical scrolling speed.
 * When set, it takes precedence over SpeedY.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 戦闘背景をスクロールさせる。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/488098471.html
 *
 * @help 戦闘背景をスクロールさせます。
 * 背景の雲をスクロールさせたり、乗り物の上で戦ったり、
 * 謎の異空間で戦ったり、落ちながら戦ったりといった用途を想定しています。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * 設定は戦闘背景（battlebacks1, battlebacks2）のファイル毎に行います。
 * 各設定リストにファイルとスクロール設定を指定してください。
 * 
 * 変数を指定すれば速度を可変にすることもできます。
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
 * @param Battleback1SettingList
 * @text 戦闘背景１の設定
 * @type struct<Battleback1Setting>[]
 * @default
 * @desc 戦闘背景１（下）の設定一覧です。
 * 
 * @param Battleback2SettingList
 * @text 戦闘背景２の設定
 * @type struct<Battleback2Setting>[]
 * @default
 * @desc 戦闘背景２（上）の設定一覧です。
 */
//-----------------------------------------------------------------------------
// Battleback1Setting
//-----------------------------------------------------------------------------
/*~struct~Battleback1Setting:ja
 * @param Battleback1
 * @text 戦闘背景１
 * @type file
 * @dir img/battlebacks1
 * @desc スクロール効果を設定する戦闘背景（下）です。
 * 
 * @param SpeedX
 * @text Ｘ速度
 * @type number
 * @max 999 @min -999
 * @decimals 2
 * @desc 横方向へのスクロール速度です。
 * 
 * @param SpeedY
 * @text Ｙ速度
 * @type number
 * @max 999 @min -999
 * @decimals 2
 * @desc 縦方向へのスクロール速度です。
 * 
 * @param SpeedXVariable
 * @text Ｘ速度の変数
 * @type variable
 * @desc 横方向へのスクロール速度を決定する変数です。
 * 設定時は『Ｘ速度』より優先されます。
 * 
 * @param SpeedYVariable
 * @text Ｙ速度の変数
 * @type variable
 * @desc 縦方向へのスクロール速度を決定する変数です。
 * 設定時は『Ｙ速度』より優先されます。
 */
//-----------------------------------------------------------------------------
// Battleback2Setting
//-----------------------------------------------------------------------------
/*~struct~Battleback2Setting:ja
 * @param Battleback2
 * @text 戦闘背景２
 * @type file
 * @dir img/battlebacks2
 * @desc スクロール効果を設定する戦闘背景（上）です。
 * 
 * @param SpeedX
 * @text Ｘ速度
 * @type number
 * @max 999 @min -999
 * @decimals 2
 * @desc 横方向へのスクロール速度です。
 * 
 * @param SpeedY
 * @text Ｙ速度
 * @type number
 * @max 999 @min -999
 * @decimals 2
 * @desc 縦方向へのスクロール速度です。
 * 
 * @param SpeedXVariable
 * @text Ｘ速度の変数
 * @type variable
 * @desc 横方向へのスクロール速度を決定する変数です。
 * 設定時は『Ｘ速度』より優先されます。
 * 
 * @param SpeedYVariable
 * @text Ｙ速度の変数
 * @type variable
 * @desc 縦方向へのスクロール速度を決定する変数です。
 * 設定時は『Ｙ速度』より優先されます。
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

const PLUGIN_NAME = "NRP_BattleBackScroll";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pBattleback1SettingList = parseStruct2(parameters["Battleback1SettingList"]);
const pBattleback2SettingList = parseStruct2(parameters["Battleback2SettingList"]);

/**
 * ●効率化のため事前変換
 */
for (const setting of pBattleback1SettingList) {
    setting.battleback1 = setDefault(setting.Battleback1);
    setting.speedX = toNumber(setting.SpeedX);
    setting.speedY = toNumber(setting.SpeedY);
    setting.speedXVariable = toNumber(setting.SpeedXVariable);
    setting.speedYVariable = toNumber(setting.SpeedYVariable);
}
for (const setting of pBattleback2SettingList) {
    setting.battleback2 = setDefault(setting.Battleback2);
    setting.speedX = toNumber(setting.SpeedX);
    setting.speedY = toNumber(setting.SpeedY);
    setting.speedXVariable = toNumber(setting.SpeedXVariable);
    setting.speedYVariable = toNumber(setting.SpeedYVariable);
}

//-----------------------------------------------------------------------------
// Spriteset_Battle
//-----------------------------------------------------------------------------

/**
 * ●戦闘背景の更新
 */
const _Spriteset_Battle_updateBattleback = Spriteset_Battle.prototype.updateBattleback;
Spriteset_Battle.prototype.updateBattleback = function() {
    _Spriteset_Battle_updateBattleback.apply(this, arguments);

    // 戦闘背景１のスクロール
    if (this._battleBack1ScrollSetting) {
        // Ｘ方向
        if (this._battleBack1ScrollSetting.speedXVariable) {
            this._back1Sprite.origin.x += $gameVariables.value(this._battleBack1ScrollSetting.speedXVariable);
        } else if (this._battleBack1ScrollSetting.speedX) {
            this._back1Sprite.origin.x += this._battleBack1ScrollSetting.speedX;
        }
        // Ｙ方向
        if (this._battleBack1ScrollSetting.speedYVariable) {
            this._back1Sprite.origin.y += $gameVariables.value(this._battleBack1ScrollSetting.speedYVariable);
        } else if (this._battleBack1ScrollSetting.speedY) {
            this._back1Sprite.origin.y += this._battleBack1ScrollSetting.speedY;
        }
    }

    // 戦闘背景２のスクロール
    if (this._battleBack2ScrollSetting) {
        // Ｘ方向
        if (this._battleBack2ScrollSetting.speedXVariable) {
            this._back2Sprite.origin.x += $gameVariables.value(this._battleBack2ScrollSetting.speedXVariable);
        } else if (this._battleBack2ScrollSetting.speedX) {
            this._back2Sprite.origin.x += this._battleBack2ScrollSetting.speedX;
        }
        // Ｙ方向
        if (this._battleBack2ScrollSetting.speedYVariable) {
            this._back2Sprite.origin.y += $gameVariables.value(this._battleBack2ScrollSetting.speedYVariable);
        } else if (this._battleBack2ScrollSetting.speedY) {
            this._back2Sprite.origin.y += this._battleBack2ScrollSetting.speedY;
        }
    }
}

/**
 * ●戦闘背景の作成
 */
const _Spriteset_Battle_createBattleback = Spriteset_Battle.prototype.createBattleback;
Spriteset_Battle.prototype.createBattleback = function() {
    _Spriteset_Battle_createBattleback.apply(this, arguments);

    // ＭＺとＭＶで取得先が異なる。
    let battleBack1Name;
    let battleBack2Name;
    // ＭＺ
    if (this._back1Sprite.battleback1Name) {
        battleBack1Name = this._back1Sprite.battleback1Name();
    // ＭＶ
    } else if (this.battleback1Name) {
        battleBack1Name = this.battleback1Name();
    }
    // ＭＺ
    if (this._back2Sprite.battleback2Name) {
        battleBack2Name = this._back2Sprite.battleback2Name();
    // ＭＶ
    } else if (this.battleback2Name) {
        battleBack2Name = this.battleback2Name();
    }

    // 条件に一致する設定を反映
    this._battleBack1ScrollSetting = getMatchSetting1(battleBack1Name);
    this._battleBack2ScrollSetting = getMatchSetting2(battleBack2Name);
};

/**
 * ●戦闘背景１に一致する設定を取得する。
 */
function getMatchSetting1(battleback1Name) {
    return pBattleback1SettingList.find(setting => setting.battleback1 == battleback1Name);
}

/**
 * ●戦闘背景２に一致する設定を取得する。
 */
function getMatchSetting2(battleback2Name) {
    return pBattleback2SettingList.find(setting => setting.battleback2 == battleback2Name);
}

})();
