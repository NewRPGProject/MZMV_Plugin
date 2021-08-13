//=============================================================================
// NRP_BattleTargetCursor.js
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc v1.03 Display the cursor when selecting a target in battle.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/482370647.html
 *
 * @help The cursor is displayed during battle
 * and when the target is selected.
 * Various adjustments can be made accordingly.
 * 
 * By default, it is designed for side view.
 * It can also be used in front view by adjusting the settings.
 * 
 * There are no advanced functions such as referring
 * to the positional relationship of the target
 * when the directional key is pressed
 * to determine the cursor's transition destination.
 * Pressing a key simply moves the cursor
 * to the target of the previous or next ID.
 * 
 * ■Usage
 * Just introducing it will change the behavior.
 * The cursor image is not set by default,
 * so only the target name is displayed.
 * 
 * A sample cursor is available on the introduction page.
 * Please refer to it for reference.
 * 
 * After that, you can adjust the plugin parameters as you wish.
 * 
 * Note that most of the actor's parameters can be left blank.
 * In that case, the parameters of the enemy side
 * will be automatically referenced.
 * ※The cursor image and X-coordinate adjustments
 *   will be flipped left and right.
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 * 
 * @param <EnemySide>
 * 
 * @param HideEnemyNameList
 * @parent <EnemySide>
 * @type boolean
 * @default true
 * @desc Hides the default enemy name list.
 * 
 * @param SwitchEnemyUpDown
 * @parent <EnemySide>
 * @type boolean
 * @default true
 * @desc Enables to switch the selection of enemies up&down. Only available when HideEnemyNameList is on.
 * 
 * @param SwitchEnemyLeftRight
 * @parent <EnemySide>
 * @type select
 * @option Invalid @value
 * @option Left to Next @value left
 * @option Right to Next @value right
 * @default left
 * @desc Enables to switch the selection of enemies left&right. Only available when HideEnemyNameList is on.
 * 
 * @param EnemyTargetCursor
 * @parent <EnemySide>
 * @type file
 * @dir img/pictures
 * @desc Specify the cursor image when targeting an enemy.
 * The image should be placed in the picture folder.
 * 
 * @param EnemyCursorPosition
 * @parent <EnemySide>
 * @type select
 * @option Foot @value foot
 * @option Center @value center
 * @option Head @value head
 * @default center
 * @desc The reference point for the enemy cursor image.
 * The name window will also be based on this.
 * 
 * @param EnemyCursorAdjustX
 * @parent <EnemySide>
 * @type number
 * @min -999 @max 999
 * @default 60
 * @desc Adjusts the X coordinate of the cursor image when targeting an enemy.
 * 
 * @param EnemyCursorAdjustY
 * @parent <EnemySide>
 * @type number
 * @min -999 @max 999
 * @default 0
 * @desc Adjusts the Y coordinate of the cursor image when targeting an enemy.
 * 
 * @param ShowTargetEnemyName
 * @parent <EnemySide>
 * @type boolean
 * @default true
 * @desc Displays the name of the currently selected enemy.
 * 
 * @param EnemyNameWindowHeight
 * @parent <EnemySide>
 * @type number
 * @default 72
 * @desc The height of the enemy name window.
 * Default value is 72.
 * 
 * @param EnemyNameWindowOpacity
 * @parent <EnemySide>
 * @type number
 * @default 255
 * @desc The opacity of the enemy name window (0~255).
 * 
 * @param EnemyNameWindowAdjustX
 * @parent <EnemySide>
 * @type number
 * @min -999 @max 999
 * @default 0
 * @desc Adjusts the X coordinate of the enemy name window.
 * 
 * @param EnemyNameWindowAdjustY
 * @parent <EnemySide>
 * @type number
 * @min -999 @max 999
 * @default 60
 * @desc Adjusts the Y coordinate of the enemy name window.
 * 
 * @param EnemyNameFontSize
 * @parent <EnemySide>
 * @type number
 * @desc The font size of the enemy name.
 * If blank, the system setting is used.
 * 
 * @param EnemyNameTextAdjustY
 * @parent <EnemySide>
 * @type number
 * @min -999 @max 999
 * @default 0
 * @desc Adjusts the Y coordinate of the text displayed in the enemy name window.
 * 
 * @param <ActorSide>
 * 
 * @param SwitchActorUpDown
 * @parent <ActorSide>
 * @type boolean
 * @default true
 * @desc Enables to switch the selection of actors up&down.
 * 
 * @param SwitchActorLeftRight
 * @parent <ActorSide>
 * @type boolean
 * @default true
 * @desc Enables to switch the selection of actors left&right.
 * This is the standard behavior of RPG Maker MZ.
 * 
 * @param ActorTargetCursor
 * @parent <ActorSide>
 * @type file
 * @dir img/pictures
 * @desc Specify the cursor image when targeting an actor.
 * If blank, it will flip the enemy's one left or right.
 * 
 * @param ActorCursorPosition
 * @parent <ActorSide>
 * @type select
 * @option Foot @value foot
 * @option Center @value center
 * @option Head @value head
 * @desc The reference point for the actor cursor image.
 * If blank, use the same value as the enemy.
 * 
 * @param ActorCursorAdjustX
 * @parent <ActorSide>
 * @type number
 * @min -999 @max 999
 * @desc Adjusts the X coordinate of the cursor when targeting an actor.
 * If blank, use the enemy's value flipped left or right.
 * 
 * @param ActorCursorAdjustY
 * @parent <ActorSide>
 * @type number
 * @min -999 @max 999
 * @desc Adjusts the Y coordinate of the cursor when targeting an actor.
 * If blank, use the same value as the enemy.
 * 
 * @param ShowTargetActorName
 * @parent <ActorSide>
 * @type boolean
 * @desc Displays the name of the currently selected actor.
 * If blank, use the same value as the enemy.
 * 
 * @param ActorNameWindowHeight
 * @parent <ActorSide>
 * @type number
 * @desc The height of the actor name window.
 * If blank, use the same value as the enemy.
 * 
 * @param ActorNameWindowOpacity
 * @parent <ActorSide>
 * @type number
 * @desc The opacity of the actor name window (0~255).
 * If blank, use the same value as the enemy.
 * 
 * @param ActorNameWindowAdjustX
 * @parent <ActorSide>
 * @type number
 * @desc Adjusts the X coordinate of the enemy name window.
 * If blank, use the enemy's value flipped left or right.
 * 
 * @param ActorNameWindowAdjustY
 * @parent <ActorSide>
 * @type number
 * @min -999 @max 999
 * @desc Adjusts the Y coordinate of the enemy name window.
 * If blank, use the same value as the enemy.
 * 
 * @param ActorNameFontSize
 * @parent <ActorSide>
 * @type number
 * @desc The font size of the actor name.
 * If blank, use the same value as the enemy.
 * 
 * @param ActorNameTextAdjustY
 * @parent <ActorSide>
 * @type number
 * @min -999 @max 999
 * @desc Adjusts the Y coordinate of the text in the enemy name window. If blank, use the same value as the enemy.
 * 
 * @param <Common>
 * 
 * @param LeftLimitX
 * @parent <Common>
 * @type string
 * @default 0
 * @desc The X coordinate that is the left limit of the cursor display. Default: left edge of the screen (0).
 * 
 * @param RightLimitX
 * @parent <Common>
 * @type string
 * @default Graphics.width
 * @desc The X coordinate that is the right limit of the cursor display. Default: right end of the screen (Graphics.width).
 * 
 * @param UpLimitY
 * @parent <Common>
 * @type string
 * @default 0
 * @desc The Y coordinate that is the upper limit of the cursor display. Default: upper edge of the screen (0).
 * 
 * @param DownLimitY
 * @parent <Common>
 * @type string
 * @default Graphics.height
 * @desc The Y coordinate that is the lower limit of the cursor display. Default: Bottom edge of the screen (Graphics.height).
 * 
 * @param UpdateCursorPosition
 * @parent <Common>
 * @type boolean
 * @default false
 * @desc Updates the cursor position every frame. For use with battle systems where the position changes in real time.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.03 戦闘時、選択中の対象にカーソルを表示
 * @author 砂川赳 (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/482370647.html
 *
 * @help 戦闘時、選択中の対象にカーソルを表示します。
 * それに伴い、様々な調整が可能です。
 * 
 * 初期値ではサイドビューを想定していますが、
 * 設定を調整すれば、フロントビューでも使えます。
 * 
 * 方向キーを押した時に対象の位置関係を参照して、
 * カーソルの遷移先を判定するような高度な機能はありません。
 * キーを押すと単純に前後のＩＤの対象に移るだけです。
 * 
 * ■使用法
 * 導入するだけで挙動が変わります。
 * カーソル画像は初期状態では設定されていませんので、
 * 対象の名前表示だけが行われます。
 * 
 * 紹介ページにカーソルのサンプルを用意しています。
 * ご参考にしていただければ。
 * 
 * 後はプラグインパラメータを好きなように調整してください。
 * 
 * なお、アクター側のパラメータの大半は空白でも構いません。
 * その場合は、自動的に敵側のパラメータが参照されます。
 * ※カーソル画像およびＸ座標の調整分は左右反転されます。
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param <EnemySide>
 * @text ＜敵側＞
 * 
 * @param HideEnemyNameList
 * @parent <EnemySide>
 * @text 敵名リストを非表示
 * @type boolean
 * @default true
 * @desc デフォルトの敵名リストを非表示にします。
 * 
 * @param SwitchEnemyUpDown
 * @parent <EnemySide>
 * @text 敵の上下切替
 * @type boolean
 * @default true
 * @desc 敵の選択を上下で切替できるようにします。
 * 『敵名リストを非表示』がオンの場合のみ有効です。
 * 
 * @param SwitchEnemyLeftRight
 * @parent <EnemySide>
 * @text 敵の左右切替
 * @type select
 * @option 無効 @value
 * @option 左で次へ @value left
 * @option 右で次へ @value right
 * @default left
 * @desc 敵の選択を左右で切替できるようにします。
 * 『敵名リストを非表示』がオンの場合のみ有効です。
 * 
 * @param EnemyTargetCursor
 * @parent <EnemySide>
 * @text 敵カーソルの画像
 * @type file
 * @dir img/pictures
 * @desc 敵を対象にした際のカーソル画像を指定します。
 * 画像はピクチャーフォルダに配置してください。
 * 
 * @param EnemyCursorPosition
 * @parent <EnemySide>
 * @text 敵のカーソル基準点
 * @type select
 * @option 足元 @value foot
 * @option 中央 @value center
 * @option 頭上 @value head
 * @default center
 * @desc 敵を対象にした際のカーソル画像の上下の基準点です。
 * 敵名ウィンドウもこれを基準にします。
 * 
 * @param EnemyCursorAdjustX
 * @parent <EnemySide>
 * @text 敵のカーソル調整Ｘ
 * @type number
 * @min -999 @max 999
 * @default 60
 * @desc 敵を対象にした際のカーソル画像のＸ座標を調整します。
 * 
 * @param EnemyCursorAdjustY
 * @parent <EnemySide>
 * @text 敵のカーソル調整Ｙ
 * @type number
 * @min -999 @max 999
 * @default 0
 * @desc 敵を対象にした際のカーソル画像のＹ座標を調整します。
 * 
 * @param ShowTargetEnemyName
 * @parent <EnemySide>
 * @text 選択中の敵名を表示
 * @type boolean
 * @default true
 * @desc 選択中の敵の名前を表示します。
 * 
 * @param EnemyNameWindowHeight
 * @parent <EnemySide>
 * @text 敵名ウィンドウの縦幅
 * @type number
 * @default 72
 * @desc 敵名ウィンドウの縦幅です。
 * 初期値は72です。
 * 
 * @param EnemyNameWindowOpacity
 * @parent <EnemySide>
 * @text 敵名ウィンドウの不透明度
 * @type number
 * @default 255
 * @desc 敵名ウィンドウの不透明度（0~255）です。
 * 
 * @param EnemyNameWindowAdjustX
 * @parent <EnemySide>
 * @text 敵名ウィンドウの調整Ｘ
 * @type number
 * @min -999 @max 999
 * @default 0
 * @desc 敵名ウィンドウのＸ座標を調整します。
 * 
 * @param EnemyNameWindowAdjustY
 * @parent <EnemySide>
 * @text 敵名ウィンドウの調整Ｙ
 * @type number
 * @min -999 @max 999
 * @default 60
 * @desc 敵名ウィンドウのＹ座標を調整します。
 * 
 * @param EnemyNameFontSize
 * @parent <EnemySide>
 * @text 敵名フォントサイズ
 * @type number
 * @desc 敵名のフォントサイズです。
 * 空欄ならシステムの設定値を使用します。
 * 
 * @param EnemyNameTextAdjustY
 * @parent <EnemySide>
 * @text 敵名テキストの調整Ｙ
 * @type number
 * @min -999 @max 999
 * @default 0
 * @desc 敵名ウィンドウに表示されるテキストのＹ座標を調整します。
 * 
 * @param <ActorSide>
 * @text ＜アクター側＞
 * 
 * @param SwitchActorUpDown
 * @parent <ActorSide>
 * @text アクターの上下切替
 * @type boolean
 * @default true
 * @desc アクターの選択を上下で切替できるようにします。
 * 
 * @param SwitchActorLeftRight
 * @parent <ActorSide>
 * @text アクターの左右切替
 * @type boolean
 * @default true
 * @desc アクターの選択を左右で切替できるようにします。
 * こちらはＭＺの標準動作です。
 * 
 * @param ActorTargetCursor
 * @parent <ActorSide>
 * @text アクターカーソルの画像
 * @type file
 * @dir img/pictures
 * @desc アクターを対象にした際のカーソル画像を指定します。
 * 空欄なら敵のものを左右反転します。
 * 
 * @param ActorCursorPosition
 * @parent <ActorSide>
 * @text アクターカーソル基準点
 * @type select
 * @option 足元 @value foot
 * @option 中央 @value center
 * @option 頭上 @value head
 * @desc アクターを対象にした際のカーソル画像の上下の基準点です。
 * 空欄なら敵と同じ値を使用します。
 * 
 * @param ActorCursorAdjustX
 * @parent <ActorSide>
 * @text アクターカーソル調整Ｘ
 * @type number
 * @min -999 @max 999
 * @desc アクターを対象にした際のカーソル画像のＸ座標を調整します。
 * 空欄なら敵の値を左右反転して使用します。
 * 
 * @param ActorCursorAdjustY
 * @parent <ActorSide>
 * @text アクターカーソル調整Ｙ
 * @type number
 * @min -999 @max 999
 * @desc アクターを対象にした際のカーソル画像のＹ座標を調整します。
 * 空欄なら敵と同じ値を使用します。
 * 
 * @param ShowTargetActorName
 * @parent <ActorSide>
 * @text 選択中のアクター名を表示
 * @type boolean
 * @desc 選択中のアクターの名前を表示します。
 * 空欄なら敵と同じ値を使用します。
 * 
 * @param ActorNameWindowHeight
 * @parent <ActorSide>
 * @text アクター名ｳｨﾝﾄﾞｳの縦幅
 * @type number
 * @desc アクター名ウィンドウの縦幅です。
 * 空欄なら敵と同じ値を使用します。
 * 
 * @param ActorNameWindowOpacity
 * @parent <ActorSide>
 * @text アクター名ｳｨﾝﾄﾞｳ不透明度
 * @type number
 * @desc アクター名ウィンドウの不透明度（0~255）です。
 * 空欄なら敵と同じ値を使用します。
 * 
 * @param ActorNameWindowAdjustX
 * @parent <ActorSide>
 * @text アクター名ｳｨﾝﾄﾞｳの調整Ｘ
 * @type number
 * @desc アクター名ウィンドウのＸ座標を調整します。
 * 空欄なら敵の値を左右反転して使用します。
 * 
 * @param ActorNameWindowAdjustY
 * @parent <ActorSide>
 * @text アクター名ｳｨﾝﾄﾞｳの調整Ｙ
 * @type number
 * @min -999 @max 999
 * @desc アクター名ウィンドウのＹ座標を調整します。
 * 空欄なら敵と同じ値を使用します。
 * 
 * @param ActorNameFontSize
 * @parent <ActorSide>
 * @text アクター名フォントサイズ
 * @type number
 * @desc アクター名のフォントサイズです。
 * 空欄なら敵と同じ値を使用します。
 * 
 * @param ActorNameTextAdjustY
 * @parent <ActorSide>
 * @text アクター名ﾃｷｽﾄの調整Ｙ
 * @type number
 * @min -999 @max 999
 * @desc アクター名ウィンドウに表示されるテキストのＹ座標を調整します。
 * 空欄なら敵と同じ値を使用します。
 * 
 * @param <Common>
 * @text ＜共通設定＞
 * 
 * @param LeftLimitX
 * @parent <Common>
 * @text 左の限界Ｘ座標
 * @type string
 * @default 0
 * @desc カーソル表示の左限界となるＸ座標です。
 * 初期値は画面左端（0）
 * 
 * @param RightLimitX
 * @parent <Common>
 * @text 右の限界Ｘ座標
 * @type string
 * @default Graphics.width
 * @desc カーソル表示の右限界となるＸ座標です。
 * 初期値は画面右端（Graphics.width）
 * 
 * @param UpLimitY
 * @parent <Common>
 * @text 上の限界Ｙ座標
 * @type string
 * @default 0
 * @desc カーソル表示の上限界となるＹ座標です。
 * 初期値は画面上端（0）
 * 
 * @param DownLimitY
 * @parent <Common>
 * @text 下の限界Ｙ座標
 * @type string
 * @default Graphics.height
 * @desc カーソル表示の下限界となるＹ座標です。
 * 初期値は画面下端（Graphics.height）
 * 
 * @param UpdateCursorPosition
 * @parent <Common>
 * @text カーソル位置を常時更新
 * @type boolean
 * @default false
 * @desc カーソル位置を毎フレーム更新します。
 * リアルタイムで位置が変動する戦闘システムとの併用に。
 */

(function() {
"use strict";

/**
 * バージョン互換対応
 */
if (!Array.prototype.find) {
    Array.prototype.find = function (predicate) {
        if (this === null) {
            throw new TypeError('Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return value;
            }
        }
        return undefined;
    };
}

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
    if (str == undefined || str == "") {
        return def;
    }
    return isNaN(str) ? def : +(str || def);
}
function setDefault(str, def) {
    return str ? str : def;
}
function isBlank(str) {
    return str === "" || str === undefined || str === null;
}

const parameters = PluginManager.parameters("NRP_BattleTargetCursor");

const pHideEnemyNameList = toBoolean(parameters["HideEnemyNameList"], true);
const pSwitchEnemyUpDown = toBoolean(parameters["SwitchEnemyUpDown"], true);
const pSwitchEnemyLeftRight = setDefault(parameters["SwitchEnemyLeftRight"]);
const pEnemyTargetCursor = parameters["EnemyTargetCursor"];
const pEnemyCursorPosition = parameters["EnemyCursorPosition"];
const pEnemyCursorAdjustX = toNumber(parameters["EnemyCursorAdjustX"], 0);
const pEnemyCursorAdjustY = toNumber(parameters["EnemyCursorAdjustY"], 0);

const pShowTargetEnemyName = toBoolean(parameters["ShowTargetEnemyName"], true);
const pEnemyNameWindowHeight = toNumber(parameters["EnemyNameWindowHeight"], 72);
const pEnemyNameWindowOpacity = toNumber(parameters["EnemyNameWindowOpacity"], 255);
const pEnemyNameWindowAdjustX = toNumber(parameters["EnemyNameWindowAdjustX"], 0);
const pEnemyNameWindowAdjustY = toNumber(parameters["EnemyNameWindowAdjustY"], 0);
const pEnemyNameFontSize = toNumber(parameters["EnemyNameFontSize"]);
const pEnemyNameTextAdjustY = toNumber(parameters["EnemyNameTextAdjustY"], 0);

const pSwitchActorUpDown = toBoolean(parameters["SwitchActorUpDown"], true);
const pSwitchActorLeftRight = toBoolean(parameters["SwitchActorLeftRight"], true);

// 以下Enemyの値をデフォルト値とする。
// ただし、画像およびＸ座標系は加工するため別途処理。
const pActorTargetCursor = parameters["ActorTargetCursor"];
const pActorCursorPosition = setDefault(parameters["ActorCursorPosition"], pEnemyCursorPosition);
const pActorCursorAdjustX = parameters["ActorCursorAdjustX"];
const pActorCursorAdjustY = toNumber(parameters["ActorCursorAdjustY"], pEnemyCursorAdjustY);
const pShowTargetActorName = toBoolean(parameters["ShowTargetActorName"], pShowTargetEnemyName);
const pActorNameWindowHeight = toNumber(parameters["ActorNameWindowHeight"], pEnemyNameWindowHeight);
const pActorNameWindowOpacity = toNumber(parameters["ActorNameWindowOpacity"], pEnemyNameWindowOpacity);
const pActorNameWindowAdjustX = parameters["ActorNameWindowAdjustX"];
const pActorNameWindowAdjustY = toNumber(parameters["ActorNameWindowAdjustY"], pEnemyNameWindowAdjustY);
const pActorNameFontSize = toNumber(parameters["ActorNameFontSize"], pEnemyNameFontSize);
const pActorNameTextAdjustY = toNumber(parameters["ActorNameTextAdjustY"], pEnemyNameTextAdjustY);

const pLeftLimitX = setDefault(parameters["LeftLimitX"], "0");
const pRightLimitX = setDefault(parameters["RightLimitX"], "Graphics.width");
const pUpLimitY = setDefault(parameters["UpLimitY"], "0");
const pDownLimitY = setDefault(parameters["DownLimitY"], "Graphics.height");
const pUpdateCursorPosition = toBoolean(parameters["UpdateCursorPosition"], false);

// 敵名リストを非表示
if (pHideEnemyNameList) {
    /**
     * 【上書】最大列数を１に変更
     * これにより、上下での切替を実現する。
     */
    Window_BattleEnemy.prototype.maxCols = function() {
        return 1;
    };

    /**
     * ●NRP_PageWindowとの競合対策
     */
    Window_BattleEnemy.prototype.isUsePage = function() {
        return false;
    };

    /**
     * ●敵名ウィンドウ表示
     */
    const _Window_BattleEnemy_show = Window_BattleEnemy.prototype.show;
    Window_BattleEnemy.prototype.show = function() {
        _Window_BattleEnemy_show.apply(this, arguments);

        // 非表示
        // ※機能はそのまま使うのでhideにはしない。
        // ※ＭＶで微妙に何かが見えるので位置を-100に設定しておく。
        this.move(-100, -100, 0, 0);
    };

    // ＭＺにしか存在しない関数なので考慮
    if (Scene_Battle.prototype.startEnemySelection) {
        /**
         * ●敵選択開始
         */
        const _Scene_Battle_startEnemySelection = Scene_Battle.prototype.startEnemySelection;
        Scene_Battle.prototype.startEnemySelection = function() {
            _Scene_Battle_startEnemySelection.apply(this, arguments);

            // ステータスウィンドウを非表示しない。
            this._statusWindow.show();
        };
    }
}

/**
 * 戦闘画面用にWindowを追加する。
 */
const _Scene_Battle_prototype_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
    _Scene_Battle_prototype_createAllWindows.apply(this, arguments);

    //--------------------------------------
    // 敵ウィンドウ生成
    //--------------------------------------
    if (pShowTargetEnemyName) {
        // MV
        if (Utils.RPGMAKER_NAME == "MV") {
            this._enemyNameWindow = new Window_BattleEnemyName(0, 0, this._enemyWindow);
        // MZ
        } else {
            // この時点ではサイズ不明なので、とりあえずGraphicsの全領域を確保
            // ※確保しておかないと文字が表示できない。
            this._enemyNameWindow = new Window_BattleEnemyName(
                new Rectangle(0, 0, Graphics.boxWidth, Graphics.boxHeight), this._enemyWindow);
        }

        this.addChild(this._enemyNameWindow);

        // 追加ウィンドウへアクセスできるように設定
        this._enemyWindow._enemyNameWindow = this._enemyNameWindow;
    }

    //--------------------------------------
    // アクターウィンドウ生成
    //--------------------------------------
    if (pShowTargetActorName) {
        // MV
        if (Utils.RPGMAKER_NAME == "MV") {
            this._actorNameWindow = new Window_BattleActorName(0, 0, this._actorWindow);
        // MZ
        } else {
            // この時点ではサイズ不明なので、とりあえずGraphicsの全領域を確保
            // ※確保しておかないと文字が表示できない。
            this._actorNameWindow = new Window_BattleActorName(
                new Rectangle(0, 0, Graphics.boxWidth, Graphics.boxHeight), this._actorWindow);
        }

        this.addChild(this._actorNameWindow);

        // 追加ウィンドウへアクセスできるように設定
        this._actorWindow._actorNameWindow = this._actorNameWindow;
        // 追加ウィンドウから親ウィンドウへアクセスできるように設定
        this._actorNameWindow._parentWindow = this._actorWindow;
    }
};

/**
 * ●敵選択
 */
const _Window_BattleEnemy_select = Window_BattleEnemy.prototype.select;
Window_BattleEnemy.prototype.select = function(index) {
    _Window_BattleEnemy_select.apply(this, arguments);

    if (this._enemyNameWindow) {
        const enemy = this.enemy();
        if (enemy) {
            this._enemyNameWindow.setEnemy(enemy);
            this._enemyNameWindow.select(index);
        } else {
            this._enemyNameWindow.hide();
        }
    } 
};

/**
 * ●敵選択ウィンドウ非表示
 */
const _Window_BattleEnemy_hide = Window_BattleEnemy.prototype.hide;
Window_BattleEnemy.prototype.hide = function() {
    _Window_BattleEnemy_hide.apply(this, arguments);

    if (this._enemyNameWindow) {
        this._enemyNameWindow.hide();
    }
};

/**
 * ●タッチ操作
 */
const _Window_BattleEnemy_processTouch = Window_BattleEnemy.prototype.processTouch;
Window_BattleEnemy.prototype.processTouch = function() {
    // カーソル移動禁止の場合
    if (!this.isCursorMovable()) {
        Window_Selectable.prototype.processTouch.call(this);
        if (this.isOpenAndActive()) {
            const target = $gameTemp.touchTarget();
            if (target) {
                if (this._enemies.includes(target)) {
                    // 選択しない
                    // this.select(this._enemies.indexOf(target));
                    if ($gameTemp.touchState() === "click") {
                        this.processOk();
                    }
                }
                $gameTemp.clearTouchState();
            }
        }
        return;
    }

    _Window_BattleEnemy_processTouch.apply(this, arguments);
}

/**
 * ●アクター選択
 */
const _Window_BattleActor_select = Window_BattleActor.prototype.select;
Window_BattleActor.prototype.select = function(index) {
    _Window_BattleActor_select.apply(this, arguments);

    if (this._actorNameWindow) {
        const actor = this.actor(index);
        if (actor) {
            this._actorNameWindow.setActor(actor);
            this._actorNameWindow.select(index);
        } else {
            this._actorNameWindow.hide();
        }
    }
};

/**
 * ●アクター選択ウィンドウ非表示
 */
const _Window_BattleActor_hide = Window_BattleActor.prototype.hide;
Window_BattleActor.prototype.hide = function() {
    _Window_BattleActor_hide.apply(this, arguments);

    if (this._actorNameWindow) {
        this._actorNameWindow.hide();
    }
};

/**
 * ●タッチ操作
 */
const _Window_BattleActor_processTouch = Window_BattleActor.prototype.processTouch;
Window_BattleActor.prototype.processTouch = function() {
    // カーソル移動禁止の場合
    if (!this.isCursorMovable()) {
        Window_BattleStatus.prototype.processTouch.call(this);
        if (this.isOpenAndActive()) {
            const target = $gameTemp.touchTarget();
            if (target) {
                const members = $gameParty.battleMembers();
                if (members.includes(target)) {
                    // 選択しない
                    // this.select(members.indexOf(target));
                    if ($gameTemp.touchState() === "click") {
                        this.processOk();
                    }
                }
                $gameTemp.clearTouchState();
            }
        }
        return;
    }

    _Window_BattleActor_processTouch.apply(this, arguments);
};

//-----------------------------------------------------------------------------
// 敵名表示用の追加ウィンドウ
//-----------------------------------------------------------------------------

function Window_BattleEnemyName() {
    this.initialize(...arguments);
}

Window_BattleEnemyName.prototype = Object.create(Window_Selectable.prototype);
Window_BattleEnemyName.prototype.constructor = Window_BattleEnemyName;

// MV
if (Utils.RPGMAKER_NAME == "MV") {
    Window_BattleEnemyName.prototype.initialize = function(x, y, parentWindow) {
        this._enemy = undefined;
        const width = Graphics.boxWidth;
        const height = pEnemyNameWindowHeight;

        // 親ウィンドウへアクセスできるように設定
        this._parentWindow = parentWindow;

        Window_Selectable.prototype.initialize.call(this, x, y, width, height);

        // // 暗くするかどうか。
        // this.setBackgroundType(1);
        
        this.refresh();
        this.hide();

        // ウィンドウの不透明度
        this.opacity = pEnemyNameWindowOpacity;
    };

// MZ
} else {
    Window_BattleEnemyName.prototype.initialize = function(rect, parentWindow) {
        this._enemy = undefined;
        // 親ウィンドウへアクセスできるように設定
        this._parentWindow = parentWindow;

        Window_Selectable.prototype.initialize.call(this, rect);

        // 暗くするかどうか。
        // ※うまくいかないので注釈化
        // this.setBackgroundType(1);
        
        this.refresh();
        this.hide();

        // ウィンドウの不透明度
        this.opacity = pEnemyNameWindowOpacity;

        // 余白（機能未実装）
        // this.padding = 0;
    };
}

Window_BattleEnemyName.prototype.maxCols = function() {
    return 1;
};

Window_BattleEnemyName.prototype.maxItems = function() {
    return 1;
};

Window_BattleEnemyName.prototype.setEnemy = function(enemy) {
    return this._enemy = enemy;
};

if (pUpdateCursorPosition) {
    /**
     * ●更新
     */
    Window_BattleEnemyName.prototype.update = function() {
        Window_Selectable.prototype.update.call(this);

        // 表示されている場合
        if (this.visible) {
            // 対象名を更新
            // ※外部プラグインによって、リアルタイムで位置が変更されることを考慮
            this.showTargetName();
        }
    };
}

/**
 * ●選択時（カーソル移動時）
 */
Window_BattleEnemyName.prototype.select = function(index) {
    this.showTargetName();
};

/**
 * ●対象名を表示
 */
Window_BattleEnemyName.prototype.showTargetName = function() {
    // 全体選択時は非表示
    if (this.cursorAll()) {
        this.hide();
        return;
    }
    
    const enemy = this._enemy;
    if (!enemy) {
        return;
    }

    // 指定があればフォントサイズを設定
    if (pEnemyNameFontSize) {
        this.contents.fontSize = pEnemyNameFontSize;
    }

    const sprite = getSprite(enemy);

    // ウィンドウ幅を求める。
    const textWidth = this.textWidth(this.convertEscapeCharacters(enemy.name()));
    // ウィンドウの余白と文字の余白を加算
    let textPaddingWidth = textWidth + this.padding * 2 + itemPadding(this) * 2;
    // 根拠不明だが調整
    // ※加算しないと文字が小さい……。
    textPaddingWidth += 16;

    // ウィンドウの高さ
    const windowHeight = pEnemyNameWindowHeight;

    // Ｘ座標
    let x = sprite.x - textPaddingWidth / 2;
    x += eval(pEnemyNameWindowAdjustX);

    // Ｙ座標
    let y = sprite.y;
    // 頭上
    if (pEnemyCursorPosition == "head") {
        y -= sprite.height;
    // 中央
    } else if (pEnemyCursorPosition == "center") {
        y -= (sprite.height / 2 + windowHeight / 2);
    // 足元
    } else {
        y -= windowHeight;
    }

    // 調整Ｙ座標
    y += eval(pEnemyNameWindowAdjustY);

    // 上下左右の限界を考慮
    x = limitedX(x);
    y = limitedY(y);

    // ウィンドウ位置を設定（Ｘ座標、Ｙ座標、幅、高さ）
    this.move(x, y, textPaddingWidth, windowHeight);
    this.show();

    // 敵のカーソル画像描画
    const spriteset = getSpriteset();
    if (spriteset) {
        dispCursorSprite(spriteset._enemyCursorSprite, sprite);
    }
};

/**
 * ●項目の描画
 */
Window_BattleEnemyName.prototype.drawItem = function(index) {
    if (this._enemy) {
        this.resetTextColor();

        // 表示名＆位置サイズの指定
        const name = this._enemy.name();

        let rect;
        // MV
        if (Utils.RPGMAKER_NAME == "MV") {
            rect = this.itemRectForText(index);
        // MZ
        } else {
            rect = this.itemLineRect(index);
        }

        this.drawText(name, rect.x, rect.y + pEnemyNameTextAdjustY, rect.width, "center");
    }
};

Window_BattleEnemyName.prototype.show = function() {
    this.refresh();

    Window_Selectable.prototype.show.call(this);
};

Window_BattleEnemyName.prototype.hide = function() {
    Window_Selectable.prototype.hide.call(this);

    // 敵のカーソル画像描画（消去）
    const spriteset = getSpriteset();
    if (spriteset) {
        hideCursorSprite(spriteset._enemyCursorSprite);
    }
};

Window_BattleEnemyName.prototype.refresh = function() {
    Window_Selectable.prototype.refresh.call(this);
};

/**
 * ●項目の背景
 */
Window_BattleEnemyName.prototype.drawItemBackground = function(index) {
    // 非表示
    // const rect = this.itemRect(index);
    // this.drawBackgroundRect(rect);
};

/**
 * ●カーソルが全体選択かどうか？
 */
Window_BattleEnemyName.prototype.cursorAll = function() {
    // 親ウィンドウの値をそのまま返す
    return this._parentWindow.cursorAll();
};

//-----------------------------------------------------------------------------
// アクター名表示用の追加ウィンドウ
//-----------------------------------------------------------------------------

function Window_BattleActorName() {
    this.initialize(...arguments);
}

Window_BattleActorName.prototype = Object.create(Window_Selectable.prototype);
Window_BattleActorName.prototype.constructor = Window_BattleActorName;

// MV
if (Utils.RPGMAKER_NAME == "MV") {
    Window_BattleActorName.prototype.initialize = function(x, y, parentWindow) {
        this._actor = undefined;
        const width = Graphics.boxWidth;
        const height = pActorNameWindowHeight;

        // 親ウィンドウへアクセスできるように設定
        this._parentWindow = parentWindow;

        Window_Selectable.prototype.initialize.call(this, x, y, width, height);

        this.refresh();
        this.hide();

        // ウィンドウの不透明度
        this.opacity = pActorNameWindowOpacity;
    };

// MZ
} else {
    Window_BattleActorName.prototype.initialize = function(rect, parentWindow) {
        this._actor = undefined;
        // 親ウィンドウへアクセスできるように設定
        this._parentWindow = parentWindow;

        Window_Selectable.prototype.initialize.call(this, rect);

        this.refresh();
        this.hide();

        // ウィンドウの不透明度
        this.opacity = pActorNameWindowOpacity;
    };
}

Window_BattleActorName.prototype.maxCols = function() {
    return 1;
};

Window_BattleActorName.prototype.maxItems = function() {
    return 1;
};

Window_BattleActorName.prototype.setActor = function(actor) {
    return this._actor = actor;
};

if (pUpdateCursorPosition) {
    /**
     * ●更新
     */
    Window_BattleActorName.prototype.update = function() {
        Window_Selectable.prototype.update.call(this);

        // 表示されている場合
        if (this.visible) {
            // 対象名を更新
            // ※外部プラグインによって、リアルタイムで位置が変更されることを考慮
            this.showTargetName();
        }
    };
}

/**
 * ●選択時（カーソル移動時）
 */
Window_BattleActorName.prototype.select = function(index) {
    this.showTargetName();
};

/**
 * ●対象名を表示
 */
Window_BattleActorName.prototype.showTargetName = function() {
    // 全体選択時は非表示
    if (this.cursorAll()) {
        this.hide();
        return;
    }

    const actor = this._actor;
    if (!actor) {
        return;
    }

    // 指定があればフォントサイズを設定
    if (pActorNameFontSize) {
        this.contents.fontSize = pActorNameFontSize;
    }

    const sprite = getSprite(actor);

    // ウィンドウ幅を求める。
    const textWidth = this.textWidth(this.convertEscapeCharacters(actor.name()));
    // ウィンドウの余白と文字の余白を加算
    let textPaddingWidth = textWidth + this.padding * 2 + itemPadding(this) * 2;
    // 根拠不明だが調整
    // ※加算しないと文字が小さい……。
    textPaddingWidth += 16;

    const windowHeight = pActorNameWindowHeight;

    // Ｘ座標
    let x = sprite.x - textPaddingWidth / 2;

    // Ｘ座標の調整
    let actorNameWindowAdjustX;
    // 値が存在しない場合は敵の値を参照し、左右反転
    if (isBlank(pActorNameWindowAdjustX)) {
        actorNameWindowAdjustX = eval(pEnemyNameWindowAdjustX) * -1;
    } else {
        actorNameWindowAdjustX = eval(pActorNameWindowAdjustX);
    }
    x += actorNameWindowAdjustX;

    // Ｙ座標
    let y = sprite.y;
    // 頭上
    if (pActorCursorPosition == "head") {
        y -= sprite.height;
    // 中央
    } else if (pActorCursorPosition == "center") {
        y -= (sprite.height / 2 + windowHeight / 2);
    // 足元
    } else {
        y -= windowHeight;
    }

    // 調整Ｙ座標
    y += eval(pActorNameWindowAdjustY);

    // 上下左右の限界を考慮
    x = limitedX(x);
    y = limitedY(y);

    this.move(x, y, textPaddingWidth, windowHeight);
    this.show();

    // アクターのカーソル画像描画
    const spriteset = getSpriteset();
    if (spriteset) {
        dispCursorSprite(spriteset._actorCursorSprite, sprite);
    }
}

/**
 * ●項目の描画
 */
Window_BattleActorName.prototype.drawItem = function(index) {
    if (this._actor) {
        this.resetTextColor();

        // 表示名＆位置サイズの指定
        const name = this._actor.name();

        let rect;
        // MV
        if (Utils.RPGMAKER_NAME == "MV") {
            rect = this.itemRectForText(index);
        // MZ
        } else {
            rect = this.itemLineRect(index);
        }

        this.drawText(name, rect.x, rect.y + pActorNameTextAdjustY, rect.width, "center");
    }
};

Window_BattleActorName.prototype.show = function() {
    this.refresh();
    
    Window_Selectable.prototype.show.call(this);
};

Window_BattleActorName.prototype.hide = function() {
    Window_Selectable.prototype.hide.call(this);

    // アクターのカーソル画像描画（消去）
    const spriteset = getSpriteset();
    if (spriteset) {
        hideCursorSprite(spriteset._actorCursorSprite);
    }
};

Window_BattleActorName.prototype.refresh = function() {
    Window_Selectable.prototype.refresh.call(this);
};

/**
 * ●項目の背景
 */
Window_BattleActorName.prototype.drawItemBackground = function(index) {
    // 非表示
    // const rect = this.itemRect(index);
    // this.drawBackgroundRect(rect);
};

/**
 * ●カーソルが全体選択かどうか？
 */
Window_BattleActorName.prototype.cursorAll = function() {
    // 親ウィンドウの値をそのまま返す
    return this._parentWindow.cursorAll();
};

//-----------------------------------------------------------------------------
// 敵の選択
//-----------------------------------------------------------------------------

// 敵名リストが非表示の場合のみ有効
if (pHideEnemyNameList) {
    // 上下カーソルでの切替を無効に
    if (!pSwitchEnemyUpDown) {
        Window_BattleEnemy.prototype.cursorDown = function(wrap) {
            // 何もしない
        };

        Window_BattleEnemy.prototype.cursorUp = function(wrap) {
            // 何もしない
        };
    }

    // 左右カーソルでの切替を有効に
    if (pSwitchEnemyLeftRight) {
        Window_BattleEnemy.prototype.cursorRight = function(wrap) {
            // 右送りの場合
            if (pSwitchEnemyLeftRight == "right") {
                // 下と同じ動作
                Window_Selectable.prototype.cursorDown.apply(this, arguments);
            // 左送りの場合
            } else if (pSwitchEnemyLeftRight == "left") {
                // 上と同じ動作
                Window_Selectable.prototype.cursorUp.apply(this, arguments);
            }
        };

        Window_BattleEnemy.prototype.cursorLeft = function(wrap) {
            // 右送りの場合
            if (pSwitchEnemyLeftRight == "right") {
                // 上と同じ動作
                Window_Selectable.prototype.cursorUp.apply(this, arguments);
            // 左送りの場合
            } else if (pSwitchEnemyLeftRight == "left") {
                // 下と同じ動作
                Window_Selectable.prototype.cursorDown.apply(this, arguments);
            }
        };
    }
}

//-----------------------------------------------------------------------------
// アクターの選択
//-----------------------------------------------------------------------------

// MV
if (Utils.RPGMAKER_NAME == "MV") {
    // 上下カーソルでの切替を無効に
    if (!pSwitchActorUpDown) {
        Window_BattleActor.prototype.cursorDown = function(wrap) {
            // 何もしない
        };

        Window_BattleActor.prototype.cursorUp = function(wrap) {
            // 何もしない
        };
    }

    // 左右カーソルでの切替を有効に
    if (pSwitchActorLeftRight) {
        Window_BattleActor.prototype.cursorRight = function(wrap) {
            // 下と同じ動作
            Window_Selectable.prototype.cursorDown.apply(this, arguments);
        };

        Window_BattleActor.prototype.cursorLeft = function(wrap) {
            // 上と同じ動作
            Window_Selectable.prototype.cursorUp.apply(this, arguments);
        };
    }

// MZ
} else {
    // 上下カーソルでの切替を有効に
    if (pSwitchActorUpDown) {
        Window_BattleActor.prototype.cursorDown = function(wrap) {
            // 右と同じ動作
            Window_Selectable.prototype.cursorRight.apply(this, arguments);
        };

        Window_BattleActor.prototype.cursorUp = function(wrap) {
            // 左と同じ動作
            Window_Selectable.prototype.cursorLeft.apply(this, arguments);
        };
    }

    // 左右カーソルでの切替を無効に
    if (!pSwitchActorLeftRight) {
        Window_BattleActor.prototype.cursorRight = function(wrap) {
            // 何もしない
        };

        Window_BattleActor.prototype.cursorLeft = function(wrap) {
            // 何もしない
        };
    }
}

//-----------------------------------------------------------------------------
// 対象カーソル
//-----------------------------------------------------------------------------

/**
 * ●戦闘時、下層の作成
 */
const _Spriteset_Battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
    _Spriteset_Battle_createLowerLayer.apply(this, arguments);

    // 敵カーソル画像の作成
    if (pEnemyTargetCursor) {
        this._enemyCursorSprite = new Sprite();
        this._enemyCursorSprite.bitmap = ImageManager.loadPicture(pEnemyTargetCursor);
        this._baseSprite.addChild(this._enemyCursorSprite);

        // カーソル非表示
        hideCursorSprite(this._enemyCursorSprite)

        // アクターカーソル画像が空白の場合、敵カーソル画像を適用
        if (!pActorTargetCursor) {
            this._actorCursorSprite = new Sprite();
            this._actorCursorSprite.bitmap = ImageManager.loadPicture(pEnemyTargetCursor);
            // 画像を左右反転（scaleX = -1）する。
            this._actorCursorSprite.scale.x = -1;
            this._baseSprite.addChild(this._actorCursorSprite);

            // カーソル非表示
            hideCursorSprite(this._actorCursorSprite)
            return;
        }
    }

    // アクターカーソル画像の作成
    if (pActorTargetCursor) {
        this._actorCursorSprite = new Sprite();
        this._actorCursorSprite.bitmap = ImageManager.loadPicture(pActorTargetCursor);
        this._baseSprite.addChild(this._actorCursorSprite);

        // カーソル非表示
        hideCursorSprite(this._actorCursorSprite)
    }
};

/**
 * ●カーソル画像の表示制御
 */
function dispCursorSprite(cursorSprite, battlerSprite) {
    // 画像がなければ処理終了
    if (!cursorSprite) {
        return;
    }

    // 対象が存在する場合は表示
    if (battlerSprite) {
        // Ｘ座標
        let x = battlerSprite.x;
        // Ｙ座標
        let y = battlerSprite.y;

        // アクターの場合
        if (battlerSprite._actor) {
            let actorCursorAdjustX;

            // 値が存在しない場合は敵の値を参照し、左右反転
            if (isBlank(pActorCursorAdjustX)) {
                actorCursorAdjustX = eval(pEnemyCursorAdjustX) * -1;
            } else {
                actorCursorAdjustX = eval(pActorCursorAdjustX);
            }

            // 調整Ｘ座標
            x += actorCursorAdjustX;

            // 頭上
            if (pActorCursorPosition == "head") {
                y -= battlerSprite.height - cursorSprite.height / 2;
            // 中央
            } else if (pActorCursorPosition == "center") {
                y -= battlerSprite.height / 2;
            // 足元
            } else {
                y -= cursorSprite.height / 2;
            }
            // 調整Ｙ座標
            y += eval(pActorCursorAdjustY);

        // 敵の場合
        } else {
            // 調整Ｘ座標
            x += eval(pEnemyCursorAdjustX);

            // 頭上
            if (pEnemyCursorPosition == "head") {
                y -= battlerSprite.height - cursorSprite.height / 2;
            // 中央
            } else if (pEnemyCursorPosition == "center") {
                y -= battlerSprite.height / 2;
            // 足元
            } else {
                y -= cursorSprite.height / 2;
            }
            // 調整Ｙ座標
            y += eval(pEnemyCursorAdjustY);
        }

        // 上下左右の限界を考慮
        x = limitedX(x);
        y = limitedY(y);

        cursorSprite.x = x;
        cursorSprite.y = y;
        cursorSprite.anchor.x = 0.5;
        cursorSprite.anchor.y = 0.5;

        // ＭＺにしか存在しない関数なので考慮
        if (cursorSprite.show) {
            cursorSprite.show();
        } else {
            cursorSprite.opacity = 255;
        }

    // 対象が存在しない場合は非表示
    } else {
        hideCursorSprite(cursorSprite);
    }
}

/**
 * ●カーソル画像を非表示に
 */
function hideCursorSprite(cursorSprite) {
    // 画像がなければ処理終了
    if (!cursorSprite) {
        return;
    }
    
    // ＭＺにしか存在しない関数なので考慮
    if (cursorSprite.hide) {
        cursorSprite.hide();
    } else {
        cursorSprite.opacity = 0;
    }
}

//-----------------------------------------------------------------------------
// 共通関数
//-----------------------------------------------------------------------------

/**
 * ●左右の限界を考慮したＸ座標
 */
function limitedX(x) {
    const leftLimitX = eval(pLeftLimitX);
    const rightLimitX = eval(pRightLimitX);

    if (!isBlank(leftLimitX) && x < leftLimitX) {
        x = leftLimitX;
    } else if (!isBlank(rightLimitX) && x > rightLimitX) {
        x = rightLimitX;
    }

    return x;
}

/**
 * ●上下の限界を考慮したＹ座標
 */
function limitedY(y) {
    const upLimitY = eval(pUpLimitY);
    const downLimitY = eval(pDownLimitY);

    if (!isBlank(upLimitY) && y < upLimitY) {
        y = upLimitY;
    } else if (!isBlank(downLimitY) && y > downLimitY) {
        y = downLimitY;
    }

    return y;
}

/**
 * ●現在の画面のSpritesetを取得する。
 */
function getSpriteset() {
    return BattleManager._spriteset;
}

/**
 * 指定したバトラーのスプライトを取得する。
 */
function getSprite(battler) {
    if (!battler) {
        return undefined;
    }

    var sprite;
    const spriteset = getSpriteset();
    const actorSprites = spriteset._actorSprites;
    const enemySprites = spriteset._enemySprites;

    if (battler.isActor()) {
        for (var i = 0; i < actorSprites.length; i++) {
            var s = actorSprites[i];
            if (s._battler == battler) {
                sprite = s;
                break;
            }
        }

        // Sprite_Actorのサイズ設定
        setActorSpriteSize(sprite);
    } else {
        for (var i = 0; i < enemySprites.length; i++) {
            var s = enemySprites[i];
            if (s._battler == battler) {
                sprite = s;
                break;
            }
        }
    }

    return sprite;
}

/**
 * 指定したアクタースプライトのサイズを設定する。
 */
function setActorSpriteSize(sprite) {
    if (sprite && sprite._battler.isActor()) {
        // Sprite_Actorのサイズが取れないのでeffectTargetのものをセットする。
        // やや強引かも……。
        // MZの場合は不要なのでMVのみ。
        if (Utils.RPGMAKER_NAME == "MV") {
            sprite.width = sprite._effectTarget.width;
            sprite.height = sprite._effectTarget.height;
        }
    }
}

/**
 * ●余白を取得
 */
function itemPadding(win) {
    if (Utils.RPGMAKER_NAME == "MZ") {
        return win.itemPadding();
    } else {
        return win.textPadding();
    }
}

})();
