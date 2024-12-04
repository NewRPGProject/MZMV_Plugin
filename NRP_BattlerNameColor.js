//=============================================================================
// NRP_BattlerNameColor.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.00 Change the color of the battler's name according to the condition.
 * @author Takeshi Sunagawa (https://newrpg.seesaa.net/)
 * @orderAfter NRP_BattleTargetCursor
 * @url https://newrpg.seesaa.net/article/505945545.html
 *
 * @help Change the color of the battler's name according to the condition.
 * Basically, it is intended to change when the enemy's HP is reduced.
 * 
 * In short, this is a feature found in Dragon Quest,
 * Octopath Traveler, etc.
 * It can be made conditional on something other than HP,
 * or applied to an actor.
 * 
 * The initial settings are as follows
 * 
 * - Changed to red on dead.
 * - Changes to yellow when dying (less than 25% HP)
 * - Changes to light blue when less than 50% HP
 * 
 * ※Dead and Dying are in accordance
 *   with RPG Maker's specifications (Actor).
 * ※Note the distinction between less than and less than or equal to.
 * ※Dead is for actor only.
 * ※The plugin also allows you to change the dying condition.
 * 
 * Incidentally, Dragon Quest and Octopath Traveler seem to be yellow
 * at less than 50% HP and red at less than 25% HP.
 * Note that if you imitate it as it is,
 * it will be out of alignment with the actor's display!
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Register the settings in NameColorList.
 * The default settings are as follows.
 * If there is no problem, you may leave it as it is.
 * 
 * - Red (system color 18) when unable to dead (a.isDead())
 * - Yellow (system color 17) when dying (a.dying())
 * - Light blue (system color 4) when less than 50% HP (a.hpRate() < 0.5)
 * 
 * The setting on the top has priority over the setting on the bottom.
 * 
 * The default setting is not reflected on the actor,
 * so please switch it if necessary.
 * Note that the color of the actor's name is
 * linked to the color of its HP.
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
 * @param NameColorList
 * @type struct<NameColor>[]
 * @default ["{\"Condition\":\"a.isDead()\",\"Color\":\"18\"}","{\"Condition\":\"a.isDying()\",\"Color\":\"17\"}","{\"Condition\":\"a.hpRate() < 0.5\",\"Color\":\"4\"}"]
 * @desc Define text color conditions and colors.
 * 
 * @param ApplyEnemy
 * @type boolean
 * @default true
 * @desc Reflects the color change in the enemy name.
 * 
 * @param ApplyActor
 * @type boolean
 * @default false
 * @desc Reflects the color change in the actor name.
 * Note that it is also reflected in the HP display!
 * 
 * @param DyingCondition
 * @type string
 * @default a.hpRate() < 0.25
 * @desc This is a condition that is treated as dying in the system.
 * Default: a.hpRate() < 0.25
 */

/*~struct~NameColor:
 * @param Condition
 * @type string
 * @desc A condition to change the text color.
 * 例：a.hpRate() <= 0.5
 * 
 * @param Color
 * @type number
 * @desc The color to be applied to the text.
 * Specify the number of the system color.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.00 バトラー名の色を条件によって変更します。
 * @author 砂川赳（https://newrpg.seesaa.net/）
 * @orderAfter NRP_BattleTargetCursor
 * @url https://newrpg.seesaa.net/article/505945545.html
 *
 * @help バトラー名の色を条件によって変更します。
 * 基本的には、敵のＨＰが減った際に変更することを想定しています。
 * 
 * 要するにドラゴンクエストやオクトパストラベラーなどにある機能です。
 * ＨＰ以外を条件にしたり、アクターにも適用したりできます。
 * 
 * 初期設定は以下のようにしています。
 * 
 * ・戦闘不能で赤色に変更
 * ・瀕死（ＨＰ２５％未満）で黄色に変更
 * ・ＨＰ５０％未満で水色に変更
 * 
 * ※戦闘不能と瀕死はツクールの仕様（アクター）に合わせています。
 * ※以下ではなく未満であることに注意してください。
 * ※戦闘不能はアクター専用です。
 * ※当プラグインでは瀕死条件を変更することも可能です。
 * 
 * ちなみに、ドラクエとオクトラは
 * ＨＰ５０％以下で黄色、２５％以下で赤色のようです。
 * そのまま真似すると、アクターの表示とズレる点には注意です！
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * 文字色リストに設定を登録してください。
 * 初期設定は以下のようになっていますので、
 * 問題なければ、そのままでも良いと思います。
 * 
 * ・戦闘不能（a.isDead()）で赤色（システムカラー18）
 * ・瀕死（a.dying()）で黄色（システムカラー17）
 * ・ＨＰ５０％未満（a.hpRate() < 0.5）で水色（システムカラー4）
 * 
 * 上にある設定のほうが優先される仕様です。
 * 
 * 初期設定ではアクターには反映されませんので、必要なら切り替えてください。
 * なお、アクターの名前の色とＨＰの色は連動する仕様です。
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
 * @param NameColorList
 * @text 文字色リスト
 * @type struct<NameColor>[]
 * @default ["{\"Condition\":\"a.isDead()\",\"Color\":\"18\"}","{\"Condition\":\"a.isDying()\",\"Color\":\"17\"}","{\"Condition\":\"a.hpRate() < 0.5\",\"Color\":\"4\"}"]
 * @desc 文字色の条件と色調を定義します。
 * 
 * @param ApplyEnemy
 * @text 敵キャラに反映
 * @type boolean
 * @default true
 * @desc 敵キャラ名に色の変更を反映します。
 * 
 * @param ApplyActor
 * @text アクターに反映
 * @type boolean
 * @default false
 * @desc アクター名に色の変更を反映します。
 * ＨＰ表示にも反映されるので注意！
 * 
 * @param DyingCondition
 * @text 瀕死条件
 * @type string
 * @default a.hpRate() < 0.25
 * @desc システム上、瀕死として扱われる条件です。
 * 初期値：a.hpRate() < 0.25
 */

/*~struct~NameColor:ja
 * @param Condition
 * @text 条件
 * @type string
 * @desc 文字色を変更する条件です。
 * 例：a.hpRate() <= 0.5
 * 
 * @param Color
 * @text 文字色
 * @type number
 * @desc 文字に適用する色です。
 * システムカラーの番号を指定してください。
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

const PLUGIN_NAME = "NRP_BattlerNameColor";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pNameColorList = parseStruct2(parameters["NameColorList"]);
const pApplyEnemy = toBoolean(parameters["ApplyEnemy"]);
const pApplyActor = toBoolean(parameters["ApplyActor"]);
const pDyingCondition = parameters["DyingCondition"];

//-----------------------------------------------------------------------------
// Window_BattleEnemyName
// ※NRP_BattleTargetCursor.jsのクラス
//-----------------------------------------------------------------------------

if (pApplyEnemy && typeof(Window_BattleEnemyName) !== 'undefined') {
    /**
     * ●テキストの描画
     */
    const _Window_BattleEnemyName_drawText = Window_BattleEnemyName.prototype.drawText;
    Window_BattleEnemyName.prototype.drawText = function(text, x, y, maxWidth, align) {
        const a = this._enemy;

        for (const colorData of pNameColorList) {
            // 条件を満たす文字色が存在した場合
            if (eval(colorData.Condition)) {
                this.changeTextColor(ColorManager.textColor(toNumber(colorData.Color)));
                _Window_BattleEnemyName_drawText.apply(this, arguments);
                this.resetTextColor();
                return;
            }
        }

        _Window_BattleEnemyName_drawText.apply(this, arguments);
    };
}

//-----------------------------------------------------------------------------
// Window_BattleActorName
// ※NRP_BattleTargetCursor.jsのクラス
//-----------------------------------------------------------------------------

if (pApplyActor && typeof(Window_BattleActorName) !== 'undefined') {
    /**
     * ●テキストの描画
     */
    const _Window_BattleActorName_drawText = Window_BattleActorName.prototype.drawText;
    Window_BattleActorName.prototype.drawText = function(text, x, y, maxWidth, align) {
        const a = this._actor;

        for (const colorData of pNameColorList) {
            // 条件を満たす文字色が存在した場合
            if (eval(colorData.Condition)) {
                this.changeTextColor(ColorManager.textColor(toNumber(colorData.Color)));
                _Window_BattleActorName_drawText.apply(this, arguments);
                this.resetTextColor();
                return;
            }
        }

        _Window_BattleActorName_drawText.apply(this, arguments);
    };
}

//-----------------------------------------------------------------------------
// Window_BattleEnemy
//-----------------------------------------------------------------------------

if (pApplyEnemy) {
    /**
     * ●敵名の描画
     */
    const _Window_BattleEnemy_drawItem = Window_BattleEnemy.prototype.drawItem;
    Window_BattleEnemy.prototype.drawItem = function(index) {
        const a = this._enemies[index];

        for (const colorData of pNameColorList) {
            // 条件を満たす文字色が存在した場合
            if (eval(colorData.Condition)) {
                this.changeTextColor(ColorManager.textColor(toNumber(colorData.Color)));
                const name = this._enemies[index].name();
                const rect = this.itemLineRect(index);
                this.drawText(name, rect.x, rect.y, rect.width);
                this.resetTextColor();
                return;
            }
        }

        _Window_BattleEnemy_drawItem.apply(this, arguments);
    };
}

//-----------------------------------------------------------------------------
// ColorManager
//-----------------------------------------------------------------------------

if (pApplyActor) {
    /**
     * ●ＨＰ（および名前）の色
     */
    ColorManager.hpColor = function(actor) {
        if (!actor) {
            return this.normalColor();
        }
        const a = actor;
        for (const colorData of pNameColorList) {
            // 条件を満たす文字色が存在した場合
            if (eval(colorData.Condition)) {
                return ColorManager.textColor(toNumber(colorData.Color));
            }
        }
        return this.normalColor();
    };
}

//-----------------------------------------------------------------------------
// Game_BattlerBase
//-----------------------------------------------------------------------------

if (pDyingCondition) {
    /**
     * 【上書】瀕死として判定される条件。
     */
    Game_BattlerBase.prototype.isDying = function() {
        const a = this;
        return this.isAlive() && eval(pDyingCondition);
    };
}

})();
