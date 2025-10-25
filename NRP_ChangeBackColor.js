//=============================================================================
// NRP_ChangeBackColor.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Changes the color tone of the battle background.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/498666610.html
 *
 * @help Changes the color tone of the battle background.
 * Does not affect the battlers or animations, so it is
 * This is useful for emphasizing the direction.
 * 
 * Parallaxes created with NRP_ParallaxesPlus.js are also supported.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Run the plugin command.
 * Both for MZ and MV are valid.
 * 
 * -------------------------------------------------------------------
 * [Plugin Command MZ]
 * -------------------------------------------------------------------
 * ◆ChangeColorBattle
 * Changes the color tone of the battle background
 * to the specified value.
 * See the description in the plug-in commands for details.
 * 
 * -------------------------------------------------------------------
 * [Plugin Command MV]
 * -------------------------------------------------------------------
 * ◆NRP.ChangeBackColor 255 255 255 60
 * Change the color tone to 255,255,255 (red, green, blue)
 * over 60 frames (1/60 second).
 * If time is omitted, the change is instantaneous.
 * 
 * Enter each color in the range of 0~255.
 * "0 0 0" makes it completely dark.
 * With "255 255 255", it returns to the original state.
 * 
 * -------------------------------------------------------------------
 * [Sample for DynamicMotion]
 * -------------------------------------------------------------------
 * When calling from DynamicAnimation or DynamicMotion,
 * the MV format is also convenient in MZ.
 * 
 * -------------------------------------------------------------------
 * // Darken it.
 * <D-Motion>
 * plugin = NRP.ChangeBackColor 128 128 128 15
 * </D-Motion>
 * 
 * <D-Animation:wait/>
 * 
 * // Return to original.
 * <D-Motion>
 * plugin = NRP.ChangeBackColor 255 255 255 15
 * </D-Motion>
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
 * @ [Plugin Commands]
 * @-----------------------------------------------------
 * 
 * @command ChangeColorBattle
 * @desc Changes the color tone of the battle background.
 * 
 * @arg Color
 * @type string
 * @default 255,255,255
 * @desc Input the background color tone in RGB format.
 * 255 is the maximum value for each.
 * 
 * @arg Duration
 * @type number
 * @desc The execution time (1/60 sec.) to change the color tone.
 * 
 * @-----------------------------------------------------
 * @ [Plugin Parameters]
 * @-----------------------------------------------------
 * 
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 戦闘背景の色調を変更する。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/498666610.html
 *
 * @help 戦闘背景の色調を変更します。
 * バトラーやアニメーションには影響を与えないため、
 * 演出の強調に便利です。
 * 
 * NRP_ParallaxesPlus.jsで作成した遠景にも対応しています。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * プラグインコマンドを実行してください。
 * ＭＺ用、ＭＶ用の双方が有効です。
 * 
 * -------------------------------------------------------------------
 * ■プラグインコマンド（ＭＺ）
 * -------------------------------------------------------------------
 * ◆色調を変更
 * 戦闘背景の色調を指定した値へと変更します。
 * 詳細はプラグインコマンド内の説明をご覧ください。
 * 
 * -------------------------------------------------------------------
 * ■プラグインコマンド（ＭＶ）
 * -------------------------------------------------------------------
 * ◆NRP.ChangeBackColor 255 255 255 60
 * 色調を255,255,255（赤、緑、青）に60フレーム（1/60秒）かけて変更します。
 * 時間を省略すると瞬時に変更します。
 * 
 * 各色は0~255の範囲で入力してください。
 * 「0 0 0」で真っ暗に。「255 255 255」で元に戻ります。
 * 
 * -------------------------------------------------------------------
 * ■DynamicMotion用のサンプル
 * -------------------------------------------------------------------
 * DynamicAnimationおよびDynamicMotionから呼び出す場合は、
 * ＭＺにおいてもＭＶ形式を使う方法が便利です。
 * 
 * -------------------------------------------------------------------
 * // 暗くする。
 * <D-Motion>
 * plugin = NRP.ChangeBackColor 128 128 128 15
 * </D-Motion>
 * 
 * <D-Animation:wait/>
 * 
 * // 元に戻す。
 * <D-Motion>
 * plugin = NRP.ChangeBackColor 255 255 255 15
 * </D-Motion>
 * 
 * -------------------------------------------------------------------
 * ■利用規約
 * -------------------------------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @-----------------------------------------------------
 * @ プラグインコマンド
 * @-----------------------------------------------------
 * 
 * @command ChangeColorBattle
 * @text 色調を変更
 * @desc 戦闘背景の色調を変更します。
 * 
 * @arg Color
 * @text 色調
 * @type string
 * @default 255,255,255
 * @desc 背景の色調をＲＧＢ（赤緑青）の順番で入力。
 * 255が各最大値となります。
 * 
 * @arg Duration
 * @text 時間(1/60秒)
 * @type number
 * @desc 色調変更にかける実行時間です。
 * 
 * @-----------------------------------------------------
 * @ プラグインパラメータ
 * @-----------------------------------------------------
 * 
 */

(function() {
"use strict";

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

const PLUGIN_NAME = "NRP_ChangeBackColor";
const parameters = PluginManager.parameters(PLUGIN_NAME);

//-----------------------------------------------------------------------------
// ＭＺ用プラグインコマンド
//-----------------------------------------------------------------------------

// MVには存在しないため、空で定義しておかないとエラーになる。
if (!PluginManager.registerCommand) {
    PluginManager.registerCommand = function() {}
}

/**
 * ●色調の変更（戦闘）
 */
PluginManager.registerCommand(PLUGIN_NAME, "ChangeColorBattle", function(args) {
    const colorArray = textToArray(args.Color);
    const duration = textToArray(args.Duration);
    changeColorBattle(colorArray, duration);
});

/**
 * ●戦闘時の色調変更
 */
function changeColorBattle(colorArray, duration) {
    const spriteset = getSpriteset();

    // 背景の色調変更
    spriteset._back1Sprite.startTint(colorArray, duration);
    spriteset._back2Sprite.startTint(colorArray, duration);

    // NRP_ParallaxesPlus.jsが存在すれば対応
    if (spriteset._parallaxPlus) {
        for (const parallaxPlus of spriteset._parallaxPlus) {
            parallaxPlus.startTint(colorArray, duration);
        }
    }
}

//-----------------------------------------------------------------------------
// ＭＶ用プラグインコマンド
//-----------------------------------------------------------------------------

/**
 * ●ＭＶ用のプラグインコマンド
 */
const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);

    // 小文字化してから判定
    const lowerCommand = command.toLowerCase();
    
    // 色調を変更
    if (lowerCommand === "nrp.changebackcolor") {
        const colorArray = [args[0], args[1], args[2]];
        const duration = args[3];
        changeColorBattle(colorArray, duration);
    }
};

// ----------------------------------------------------------------------------
// TilingSprite
// ----------------------------------------------------------------------------

/**
 * 【独自】色調の変更開始
 */
TilingSprite.prototype.startTint = function(tintArray, duration) {
    // 時間指定がない場合は即時反映
    if (!duration) {
        // 配列を数値に変換してから反映
        this.tint = arrayToTint(tintArray);
        // 値を初期化
        this._tintDuration = null;
        this._tintCount = null;
        this._tintTarget = null;
        this._tintTargetOriginal = null;
        return;
    }

    // 最終的な色調（配列）
    this._tintTarget = tintArray;
    // 当初の色調（配列）
    this._tintTargetOriginal = tintToArray(this.tint);
    this._tintDuration = duration;
    this._tintCount = 0;
};

/**
 * ●更新
 */
const _TilingSprite_update = TilingSprite.prototype.update;
TilingSprite.prototype.update = function() {
    _TilingSprite_update.apply(this, arguments);

    // 色調を更新
    this.updateChangeBackColor();
};

/**
 * 【独自】色調を更新
 */
TilingSprite.prototype.updateChangeBackColor = function() {
    _TilingSprite_update.apply(this, arguments);

    // 実行時間が存在する場合、色調変更
    if (this._tintDuration > 0) {
        let colorArray = [];
        // ＲＧＢを一つずつ抜き出して処理
        for (let i = 0; i < 3; i++) {
            // 現在の値
            const oldColor = this._tintTargetOriginal[i];
            // 現在の値と最終値との差分を計算し、現在時間での値を求める。
            let newColor = oldColor + (this._tintTarget[i] - oldColor) * this._tintCount / this._tintDuration;
            // 0~255に制限
            newColor = newColor.clamp(0, 255);
            colorArray.push(newColor);
        }
        // 配列を数値に変換してから反映
        this.tint = arrayToTint(colorArray);

        // 時間経過
        this._tintCount++;

        // 終了処理
        if (this._tintCount > this._tintDuration) {
            this._tintDuration = null;
            this._tintCount = null;
            this._tintTarget = null;
            this._tintTargetOriginal = null;
        }
    }
};

// ----------------------------------------------------------------------------
// 共通関数
// ----------------------------------------------------------------------------

/**
 * ●色調を配列に変換します。
 * ※色調は数値でビット管理されているため、
 * 　そのままでは操作が難しいため配列に変換する。
 */
function tintToArray(tint) {
    // 数値を配列に分解
    const r = (tint >> 16) & 255;
    const g = (tint >> 8) & 255;
    const b = tint & 255;
    return [r, g, b];
}

/**
 * ●配列を色調に変換します。
 */
function arrayToTint(array) {
    const r = array[0];
    const g = array[1];
    const b = array[2];
    return (r << 16) | (g << 8) | b;
}

/**
 * ●文字列を分解して配列に変換する。
 * ※例１："1,2,3" -> [1,2,3]
 * ※例２："1~3" -> [1,2,3]
 */
function textToArray(textArr) {
    const array = [];
    
    // 無効なら処理しない。
    if (textArr === undefined || textArr === null || textArr === "") {
        return array;
    }

    // カンマ区切りでループ
    for (let text of textArr.split(",")) {
        // 空白除去
        text = text.trim();
        // 1~5というように範囲指定の場合
        // ※~が存在する。
        if (text.indexOf("~") >= 0) {
            const rangeVal = text.split("~");
            const rangeStart = eval(rangeVal[0]);
            const rangeEnd = eval(rangeVal[1]);

            // IDの指定範囲で実行
            // 開始のほうが終了より大きい場合は反対に実行
            if (rangeEnd < rangeStart) {
                for (let i = rangeStart; i >= rangeEnd; i--) {
                    array.push(eval(i));
                }
            } else {
                for (let i = rangeStart; i <= rangeEnd; i++) {
                    array.push(eval(i));
                }
            }
            
        // 通常時
        } else {
            try {
                array.push(eval(text));
            // 数式評価できない場合はそのままpush
            } catch (e) {
                array.push(text);
            }
        }
    }
    return array;
}

/**
 * ●現在の画面のSpritesetを取得する。
 */
function getSpriteset() {
    return SceneManager._scene._spriteset;
}

})();
