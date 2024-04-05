//=============================================================================
// NRP_ShadowAndLevitate.js
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc v1.101 Setting the battler's shadow & adding the levitation effect
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @base animatedSVEnemies
 * @base NRP_DynamicMotionMZ
 * @orderAfter animatedSVEnemies
 * @url http://newrpg.seesaa.net/article/478581866.html
 *
 * @help Configure the settings regarding the battler's shadow.
 * You can also make the battler float in the air.
 * 
 * ◆Key Features
 * ・Create a shadow similar to the actor on an enemy.
 * ・Change the size and position of the battler's shadow.
 * ・Also, the size of the shadow will match the image size of the battler
 * ・Floating battler.
 * ・And create a state floating battler.
 * ・This plugin supports DynamicMotion and animatedSVEnemies.js.
 * 
 * -------------------------------------------------------------------
 * [Install]
 * -------------------------------------------------------------------
 * If used in conjunction with the following plugins,
 * please register below them.
 * ・NRP_DynamicMotion.js or NRP_DynamicMotionMZ.js
 * ・animatedSVEnemies.js
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * You set the shadow settings in the plugin parameters.
 * In addition, the shadow of the enemy does not appear
 * just by installing the plugin. "EnemyMakeShadow" must be turned on.
 * 
 * Separate settings are also possible by including the following
 * in the notes for enemy and actor.
 * ※<BattlerFloat> is also valid only for states.
 * 
 * -------------------------------------------------------------------
 * [Note Settings]
 * -------------------------------------------------------------------
 * <MakeShadow> / <MakeShadow:false>
 * Enable / disable shadows.
 * 
 * <ShadowScaleX:?>
 * <ShadowScaleY:?>
 * Change the scale of the shadow in width and height respectively.
 * 1.0 is standard.
 * 
 * <ShadowScale:?>
 * Change the scale of the shadow.
 * This changes both width and height at the same time.
 * 
 * <ShadowX:?>
 * <ShadowY:?>
 * Adjust the position of the shadow.
 * The value will be the difference from the foot of the battler.
 * 
 * <ShadowOpacity:?>
 * Changes the opacity of the shadow; it becomes opaque at 255.
 * 
 * <ShadowImage:?>
 * Change the shadow image.
 * Specify the image name (no extension required) directly
 * under img/system.
 * 
 * <BattlerFloat> / <BattlerFloat:?>
 * The battler will float in the air.
 * The height depends on the settings of the plugin parameters.
 * It is also possible to specify the height numerically and individually.
 * 
 * <FloatAmplitude:?>
 * Changes the amplitude when floating.
 * The position when floating fluctuates by twice this height.
 * 
 * <FloatPeriodicTime:?>
 * Changes the floating period, where 60 corresponds to 1 second.
 * 
 * It is also valid for notes with only three states,
 * <BattlerFloat>, <FloatAmplitude>, and <FloatPeriodicTime>.
 * For example, you can create a state like the FF series Levitate.
 * 
 * -------------------------------------------------------------------
 * [Automatic adjustment of shadow size]
 * -------------------------------------------------------------------
 * By default, "EnemyShadowScaleX", "EnemyShadowScaleY"
 * is set to the following formula.
 * 
 * > a.width / shadow.width * 1.5
 * 
 * This means "(Body width / Shadow width) * 1.5".
 * That is, it automatically enlarges the shadow image
 * to "width of the body image * 1.5 times".
 * If you don't like it, make your own adjustments.
 * 
 * ※The standard shadow image, "Shadow2", contains spaces in the image.
 *   Note that it looks smaller than the number on the settings.
 *   In addition, the size is different between MZ and MV.
 *   The default setting is MV, which may be a bit large.
 * 
 * For more information on other plugins, please see below.
 * http://newrpg.seesaa.net/article/478654833.html
 * 
 * -------------------------------------------------------------------
 * [Terms]
 * -------------------------------------------------------------------
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but we will respond to defects as far as possible.
 * 
 * @param <Enemy Shadow>
 * @desc The setting regarding the shadow of the enemy.
 * 
 * @param EnemyMakeShadow
 * @parent <Enemy Shadow>
 * @type select
 * @option
 * @option Make @value true
 * @option Not Make @value false
 * @desc Create the shadow of the enemies in the same way as the actors.
 * Blank and use the default settings (usually Not Make).
 * 
 * @param EnemyShadowImage
 * @parent <Enemy Shadow>
 * @type file
 * @dir img/system
 * @default Shadow2
 * @desc The image used to shadow the enemies.
 * 
 * @param EnemyShadowScaleX
 * @parent <Enemy Shadow>
 * @type text
 * @default a.width / shadow.width * 1.5
 * @desc The horizontal scale of the enemy's shadow image.
 * By default, it expands to match the width of the body.
 * 
 * @param EnemyShadowScaleY
 * @parent <Enemy Shadow>
 * @type text
 * @default a.width / shadow.width * 1.5
 * @desc The vertical scale of the enemy's shadow image.
 * By default, it expands to match the width of the body.
 * 
 * @param EnemyShadowX
 * @parent <Enemy Shadow>
 * @type text
 * @default 0
 * @desc Adjust the position of the enemy's shadow in the X coordinate.
 * 
 * @param EnemyShadowY
 * @parent <Enemy Shadow>
 * @type text
 * @default (a.height / 20) * -1
 * @desc Adjust the position of the enemy's shadow in the Y coordinate.
 * Initially displace the "body height / 20" only up.
 * 
 * @param EnemyShadowZ
 * @parent <Enemy Shadow>
 * @type number
 * @decimals 1
 * @default 2
 * @desc Value of the Z (priority) of the enemy's shadow.
 * It is only valid when used in conjunction with DynamicMotion.
 * 
 * @param EnemyShadowOpacity
 * @parent <Enemy Shadow>
 * @type number
 * @max 255
 * @min 0
 * @default 255
 * @desc The opacity of the enemy's shadow. 255 makes it opaque.
 * 
 * @param EnemyFloatHeight
 * @parent <Enemy Shadow>
 * @type text
 * @default 48
 * @desc The height at which the enemy floats. The formula is valid.
 * It is valid if you write <BattlerFloat> in note.
 * 
 * @param EnemyFloatAmplitude
 * @parent <Enemy Shadow>
 * @type text
 * @default 5
 * @desc The amplitude of the enemy floating effect.
 * Mathematical formula is acceptable.
 * 
 * @param EnemyFloatPeriodicTime
 * @parent <Enemy Shadow>
 * @type text
 * @default 120
 * @desc The period of the amplitude of the enemy floating effect. Formulae allowed. 60 equals 1 second.
 * 
 * @param <Actor Shadow>
 * @desc The setting regarding the shadow of the actor.
 * 
 * @param ActorShadowImage
 * @parent <Actor Shadow>
 * @type file
 * @dir img/system
 * @desc The image used to shadow the enemies.
 * If blank, use the Maker's default settings (Shadow2).
 * 
 * @param ActorShadowScaleX
 * @parent <Actor Shadow>
 * @type text
 * @desc The rate of horizontal scaling of the actor's shadow image.
 * If blank, use the Maker's default settings (1).
 * 
 * @param ActorShadowScaleY
 * @parent <Actor Shadow>
 * @type text
 * @desc The rate of vertical scaling of the actor's shadow image.
 * If blank, use the Maker's default settings (1).
 * 
 * @param ActorShadowX
 * @parent <Actor Shadow>
 * @type text
 * @desc Adjust the position of the actor's shadow in the X coordinate.
 * If blank, use the Maker's default settings (0).
 * 
 * @param ActorShadowY
 * @parent <Actor Shadow>
 * @type text
 * @desc Adjust the position of the actor's shadow in the Y coordinate.
 * If blank, use the Maker's default settings (-2).
 * 
 * @param ActorShadowZ
 * @parent <Actor Shadow>
 * @type number
 * @decimals 1
 * @desc Value of the Z (priority) of the actor's shadow.
 * ※Usually unused. The shadow always appears below the actor.
 * 
 * @param ActorShadowOpacity
 * @parent <Actor Shadow>
 * @type number
 * @max 255
 * @min 0
 * @default 255
 * @desc The opacity of the actor's shadow. 255 makes it opaque.
 * 
 * @param ActorFloatHeight
 * @parent <Actor Shadow>
 * @type text
 * @default 24
 * @desc The height at which the actor floats. The formula is valid.
 * It is valid if you write <BattlerFloat> in note.
 * 
 * @param ActorFloatAmplitude
 * @parent <Actor Shadow>
 * @type text
 * @default 5
 * @desc The amplitude of the actor floating effect.
 * Mathematical formula is acceptable.
 * 
 * @param ActorFloatPeriodicTime
 * @parent <Actor Shadow>
 * @type text
 * @default 120
 * @desc The period of the amplitude of the actor floating effect. Formulae allowed. 60 equals 1 second.
 * 
 * @param RandomStartFloatHeight
 * @type boolean
 * @default true
 * @desc Randomize the height at the start of floating and make it naturally uneven.
 * 
 * @param TransparencyJumpHeight
 * @type number
 * @default 500
 * @desc When the jump height reaches the specified value, the shadow becomes transparent. Invalid if blank.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.101 バトラーの影を設定＆浮遊効果の追加
 * @author 砂川赳 (http://newrpg.seesaa.net/)
 * @orderAfter animatedSVEnemies
 * @orderAfter NRP_DynamicMotionMZ
 * @url http://newrpg.seesaa.net/article/478654833.html
 * 
 * @help バトラーの影に関する設定を行います。
 * また、バトラーを宙に浮かせる演出ができます。
 * 
 * ◆主な特徴
 * ・敵キャラにアクターと同じような影を作成可能
 * ・バトラーの影の大きさや位置を変更可能
 * ・バトラーの画像サイズに合わせた自動調整も可能
 * ・バトラーを浮遊させる設定が可能
 * ・バトラーを浮遊させるステートを作成可能
 * ・DynamicMotionおよびanimatedSVEnemies.jsに対応
 * 
 * -------------------------------------------------------------------
 * ■導入
 * -------------------------------------------------------------------
 * 以下のプラグインと併用する場合は、それらよりも下に登録してください。
 * ・NRP_DynamicMotion.js or NRP_DynamicMotionMZ.js
 * ・animatedSVEnemies.js
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * プラグインパラメータで、影の設定をしてください。
 * なお、プラグインを導入しただけでは敵キャラの影は表示されません。
 * 『影を作成』をオンにする必要があります。
 * 
 * 敵キャラおよびアクターのメモ欄に以下を記載すれば、個別の設定も可能です。
 * ※<BattlerFloat>のみステートにも有効です。
 * 
 * -------------------------------------------------------------------
 * ■メモ欄の設定
 * -------------------------------------------------------------------
 * <MakeShadow> / <MakeShadow:false>
 * 影を有効／無効にします。
 * 
 * <ShadowScaleX:?>
 * <ShadowScaleY:?>
 * 横幅・縦幅それぞれの影の拡大率を変更します。1.0が標準です。
 * 
 * <ShadowScale:?>
 * 影の拡大率を変更します。こちらは横幅・縦幅の両方を同時に変更します。
 * 
 * <ShadowX:?>
 * <ShadowY:?>
 * 影の位置を調整します。値は足元からの差分となります。
 * 
 * <ShadowOpacity:?>
 * 影の不透明度を変更します。255で不透明になります。
 * 
 * <ShadowImage:?>
 * 影の画像を変更します。
 * img/system 直下の画像名（拡張子不要）を指定してください。
 * 
 * <BattlerFloat> / <BattlerFloat:?>
 * バトラーが宙に浮きます。高さはプラグインパラメータの設定値に従います。
 * 高さを数値で個別に指定することも可能です。
 * 
 * <FloatAmplitude:?>
 * 浮遊時の振幅を変更します。
 * この二倍の高さ分だけ浮遊時の位置が変動します。
 * 
 * <FloatPeriodicTime:?>
 * 浮遊時の周期を変更します。60が1秒に相当します。
 * 
 * また、<BattlerFloat>, <FloatAmplitude>, <FloatPeriodicTime>
 * の３項目のみステートのメモ欄でも有効です。
 * 例えば、ＦＦシリーズのレビテトのようなステートが作成できます。
 * 
 * -------------------------------------------------------------------
 * ■影幅の自動調整
 * -------------------------------------------------------------------
 * 初期状態では敵の『影の拡大率Ｘ』『影の拡大率Ｙ』に
 * 以下のような数式が設定されています。
 * 
 * > a.width / shadow.width * 1.5
 * 
 * これは『（本体画像の横幅 / 影画像の横幅） * 1.5』の意味です。
 * つまり、本体画像の横幅 * 1.5倍へと影画像を自動で拡大します。
 * 気に入らない場合は各自調整をしてください。
 * 
 * ※なお、標準の影画像"Shadow2"は画像内に空白が含まれています。
 * 　設定上の数値より小さく見えるので注意してください。
 * 　加えて、ＭＺとＭＶでサイズが異なります。
 * 　初期設定はＭＶだと少し大きいかも知れません。
 * 
 * その他、プラグインの詳細は以下をご覧ください。
 * http://newrpg.seesaa.net/article/478654833.html
 * 
 * -------------------------------------------------------------------
 * ■利用規約
 * -------------------------------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param <Enemy Shadow>
 * @text ＜敵キャラの影＞
 * @desc 敵キャラの影に関する設定です。
 * 
 * @param EnemyMakeShadow
 * @parent <Enemy Shadow>
 * @text 影を作成
 * @type select
 * @option
 * @option 作成する @value true
 * @option 作成しない @value false
 * @desc 敵の影をアクターと同じように作成します。
 * 空欄だと初期設定（原則は未作成）を使用します。
 * 
 * @param EnemyShadowImage
 * @parent <Enemy Shadow>
 * @text 影の画像
 * @type file
 * @dir img/system
 * @default Shadow2
 * @desc 敵の影に使用する画像です。
 * 
 * @param EnemyShadowScaleX
 * @parent <Enemy Shadow>
 * @text 影の拡大率Ｘ
 * @type text
 * @default a.width / shadow.width * 1.5
 * @desc 敵の影画像の横方向への拡大率です。
 * 初期値では本体の横幅に合わせて拡大します。
 * 
 * @param EnemyShadowScaleY
 * @parent <Enemy Shadow>
 * @text 影の拡大率Ｙ
 * @type text
 * @default a.width / shadow.width * 1.5
 * @desc 敵の影画像の縦方向への拡大率です。
 * 初期値では本体の横幅に合わせて拡大します。
 * 
 * @param EnemyShadowX
 * @parent <Enemy Shadow>
 * @text 影のＸ座標
 * @type text
 * @default 0
 * @desc 敵の影のＸ座標位置を調整します。
 * 
 * @param EnemyShadowY
 * @parent <Enemy Shadow>
 * @text 影のＹ座標
 * @type text
 * @default (a.height / 20) * -1
 * @desc 敵の影のＹ座標位置を調整します。
 * 初期値では『本体の縦幅/20』だけ上にずらします。
 * 
 * @param EnemyShadowZ
 * @parent <Enemy Shadow>
 * @text 影のＺ座標
 * @type number
 * @decimals 1
 * @default 2
 * @desc 敵の影のＺ座標（表示優先度）の初期値です。
 * この値はDynamicMotionと併用する場合のみ有効です。
 * 
 * @param EnemyShadowOpacity
 * @parent <Enemy Shadow>
 * @text 影の不透明度
 * @type number
 * @max 255
 * @min 0
 * @default 255
 * @desc 敵の影の不透明度です。255で不透明になります。
 * 
 * @param EnemyFloatHeight
 * @parent <Enemy Shadow>
 * @text 浮遊効果の高さ
 * @type text
 * @default 48
 * @desc 敵の浮遊効果の高さです。数式可。
 * メモ欄に<BattlerFloat>を記述した場合に有効となります。
 * 
 * @param EnemyFloatAmplitude
 * @parent <Enemy Shadow>
 * @text 浮遊効果の振幅
 * @type text
 * @default 5
 * @desc 敵の浮遊効果の振幅です。数式可。
 * 0で無効となります。
 * 
 * @param EnemyFloatPeriodicTime
 * @parent <Enemy Shadow>
 * @text 浮遊効果の周期
 * @type text
 * @default 120
 * @desc 敵の浮遊効果の振幅の周期です。数式可。
 * 60が1秒に相当します。
 * 
 * @param <Actor Shadow>
 * @text ＜アクターの影＞
 * @desc アクターの影に関する設定です。
 * 
 * @param ActorShadowImage
 * @parent <Actor Shadow>
 * @text 影の画像
 * @type file
 * @dir img/system
 * @desc アクターの影に使用する画像です。
 * 空欄ならツクールの初期設定(Shadow2)を使用します。
 * 
 * @param ActorShadowScaleX
 * @parent <Actor Shadow>
 * @text 影の横幅
 * @type text
 * @desc アクターの影画像の横幅です。
 * 空欄ならツクールの初期設定(1)を使用します。
 * 
 * @param ActorShadowScaleY
 * @parent <Actor Shadow>
 * @text 影の縦幅
 * @type text
 * @desc アクターの影画像の縦幅です。
 * 空欄ならツクールの初期設定(1)を使用します。
 * 
 * @param ActorShadowX
 * @parent <Actor Shadow>
 * @text 影のＸ座標
 * @type text
 * @desc アクターの影のＸ座標位置を調整します。
 * 空欄ならツクールの初期設定(0)を使用します。
 * 
 * @param ActorShadowY
 * @parent <Actor Shadow>
 * @text 影のＹ座標
 * @type text
 * @desc アクターの影のＹ座標位置を調整します。
 * 空欄ならツクールの初期設定(-2)を使用します。
 * 
 * @param ActorShadowZ
 * @parent <Actor Shadow>
 * @text 影のＺ座標
 * @type number
 * @decimals 1
 * @desc アクターの影のＺ座標（表示優先度）の初期値です。
 * ※通常は未使用です。影は常にアクターの下に表示されます。
 * 
 * @param ActorShadowOpacity
 * @parent <Actor Shadow>
 * @text 影の不透明度
 * @type number
 * @max 255
 * @min 0
 * @default 255
 * @desc アクターの影の不透明度です。255で不透明になります。
 * 
 * @param ActorFloatHeight
 * @parent <Actor Shadow>
 * @text 浮遊効果の高さ
 * @type text
 * @default 24
 * @desc アクターの浮遊効果の高さです。数式可。
 * メモ欄に<BattlerFloat>を記述した場合に有効となります。
 * 
 * @param ActorFloatAmplitude
 * @parent <Actor Shadow>
 * @text 浮遊効果の振幅
 * @type text
 * @default 5
 * @desc アクターの浮遊効果の振幅です。数式可。
 * 0で無効となります。
 * 
 * @param ActorFloatPeriodicTime
 * @parent <Actor Shadow>
 * @text 浮遊効果の周期
 * @type text
 * @default 120
 * @desc アクターの浮遊効果の振幅の周期です。数式可。
 * 60が1秒に相当します。
 * 
 * @param RandomStartFloatHeight
 * @text 浮遊開始位置をランダム化
 * @type boolean
 * @default true
 * @desc 浮遊開始時の高さをランダム化し、自然にバラつかせます。
 * 
 * @param TransparencyJumpHeight
 * @text 透明化するジャンプ高度
 * @type number
 * @default 500
 * @desc ジャンプ中に影の透明度を上昇させます。
 * 指定値は完全に透明化する高度です。空白なら無効。
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
    return isNaN(str) ? def : +(str || def);
}
function setDefault(str, def) {
    return str ? str : def;
}

const parameters = PluginManager.parameters("NRP_ShadowAndLevitate");

// 敵キャラ
const pEnemyMakeShadow = setDefault(parameters["EnemyMakeShadow"]);
const pEnemyShadowImage = setDefault(parameters["EnemyShadowImage"], "Shadow2");
const pEnemyShadowScaleX = setDefault(parameters["EnemyShadowScaleX"], "a.width / shadow.width * 1.5");
const pEnemyShadowScaleY = setDefault(parameters["EnemyShadowScaleY"], "a.width / shadow.width * 1.5");
const pEnemyShadowX = setDefault(parameters["EnemyShadowX"], 0);
const pEnemyShadowY = setDefault(parameters["EnemyShadowY"], "(a.height / 20) * -1");
const pEnemyShadowZ = toNumber(parameters["EnemyShadowZ"], 2);
const pEnemyShadowOpacity = toNumber(parameters["EnemyShadowOpacity"], 255);
const pEnemyFloatHeight = setDefault(parameters["EnemyFloatHeight"], "48");
const pEnemyFloatAmplitude = setDefault(parameters["EnemyFloatAmplitude"], "5");
const pEnemyFloatPeriodicTime = setDefault(parameters["EnemyFloatPeriodicTime"], "120");
// アクター
const pActorShadowImage = setDefault(parameters["ActorShadowImage"]);
const pActorShadowScaleX = setDefault(parameters["ActorShadowScaleX"]);
const pActorShadowScaleY = setDefault(parameters["ActorShadowScaleY"]);
const pActorShadowX = setDefault(parameters["ActorShadowX"]);
const pActorShadowY = setDefault(parameters["ActorShadowY"]);
const pActorShadowZ = setDefault(parameters["ActorShadowZ"]);
const pActorShadowOpacity = toNumber(parameters["ActorShadowOpacity"], 255);
const pActorFloatHeight = setDefault(parameters["ActorFloatHeight"], "24");
const pActorFloatAmplitude = setDefault(parameters["ActorFloatAmplitude"], "5");
const pActorFloatPeriodicTime = setDefault(parameters["ActorFloatPeriodicTime"], "120");
// 共通
const pRandomStartFloatHeight = toBoolean(parameters["RandomStartFloatHeight"], true);
const pTransparencyJumpHeight = toNumber(parameters["TransparencyJumpHeight"]);

// DynamicMotionのパラメータ
const dMotionParams = getDynamicMotionParameters();
const pJumpShadow = toBoolean(dMotionParams["jumpShadow"]);

/**
 * ●MZかMVかを判定してパラメータを返す。
 */
function getDynamicMotionParameters() {
    const isDynamicMotionMZ = PluginManager._scripts.some(function(scriptName) {
        return scriptName == "NRP_DynamicMotionMZ";
    });
    if (isDynamicMotionMZ) {
        return PluginManager.parameters("NRP_DynamicMotionMZ");
    }
    return PluginManager.parameters("NRP_DynamicMotion");
}

//--------------------------------------------------------
// 敵の影を生成
//--------------------------------------------------------

/**
 * ●初期化処理
 */
const _Sprite_Enemy_initMembers = Sprite_Enemy.prototype.initMembers;
Sprite_Enemy.prototype.initMembers = function() {
    _Sprite_Enemy_initMembers.apply(this, arguments);

    this.createShadowSprite();
};

/**
 * 【独自】敵の影作成
 */
Sprite_Enemy.prototype.createShadowSprite = function() {
    this._shadowSprite = new Sprite();
    this._shadowSprite.bitmap = ImageManager.loadSystem(pEnemyShadowImage);
    this._shadowSprite.anchor.x = 0.5;
    this._shadowSprite.anchor.y = 0.5;
    this._shadowSprite.z = pEnemyShadowZ;
    // とりあえず非表示にしておく。
    this._shadowSprite.visible = false;
    // 識別用のフラグを立てる。
    this._shadowSprite._isEnemyShadow = true;

    // あえてSprite_EnemyにaddChildはしない。
    // ※表示優先度を調整するため。
    // this.addChild(this._shadowSprite);
};

/**
 * ●戦闘開始時
 */
const _Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
Game_Battler.prototype.onBattleStart = function(advantageous) {
    _Game_Battler_onBattleStart.apply(this, arguments);

    // 敵キャラの場合
    // ※『仲間を呼ぶ』など途中追加に対応するため、ここで実行
    if (this.isEnemy()) {
        const sprite = getBattlerSprite(this);
        if (sprite && sprite.isUseEnemyShadow && sprite.isUseEnemyShadow()) {
            // 影を本体の後ろへ追加
            const spriteset = BattleManager._spriteset;
            const bodyIndex = spriteset._battleField.children.indexOf(sprite);
            spriteset._battleField.addChildAt(sprite._shadowSprite, bodyIndex);
        }
    }
};

/**
 * 【独自】敵の影を使うかどうか？
 */
Sprite_Enemy.prototype.isUseEnemyShadow = function() {
    return !!this._shadowSprite;
};

/**
 * ●エネミースプライトにバトラーを設定
 */
const _Sprite_Enemy_setBattler = Sprite_Enemy.prototype.setBattler;
Sprite_Enemy.prototype.setBattler = function(battler) {
    _Sprite_Enemy_setBattler.apply(this, arguments);

    // 影を未設定に
    this._isSetShadow = false;
};

/**
 * ●エネミースプライトの表示初期化
 */
const _Sprite_Enemy_initVisibility = Sprite_Enemy.prototype.initVisibility;
Sprite_Enemy.prototype.initVisibility = function() {
    _Sprite_Enemy_initVisibility.apply(this, arguments);

    // 影を未設定に
    this._isSetShadow = false;
};

/**
 * ●更新
 */
const _Sprite_Enemy_update = Sprite_Enemy.prototype.update;
Sprite_Enemy.prototype.update = function() {
    _Sprite_Enemy_update.apply(this, arguments);

    // 本来、アクター用の関数を敵キャラにも設定
    this.updateShadow();
};

/**
 * 【独自】影の描画更新
 */
Sprite_Enemy.prototype.updateShadow = function() {
    if (!this._shadowSprite) {
        return;
    }

    // 戦闘不能時は表示しない
    if (!this._battler.isAlive()) {
        this._shadowSprite.visible = false;
        return;
    }

    // 影の初期化を行うかどうか？
    if (this.isInitShadow()) {
        this.initBattlerShadow();
    }

    const meta  = this._battler.enemy().meta;

    // 影の基準位置設定
    const shadowX = getShadowX(this, meta.ShadowX);
    const shadowY = getShadowY(this, meta.ShadowY);
    this._shadowSprite.x = this.x + shadowX;
    this._shadowSprite.y = this.y + shadowY;

    // DynamicMotionとの連携
    if (this.updateDynamicShadow) {
        this.updateDynamicShadow();
    }

    // 影の不透明度が取得できない場合は終了
    if (!this._shadowSprite.originalOpacity) {
        return;
    }
    
    // 不透明度を初期化
    this._shadowSprite.opacity = this._shadowSprite.originalOpacity;

    // ※透明度が可変の場合のみ更新
    if (pTransparencyJumpHeight) {
        const shadowOpacity = getJumpOpacity(this, this._shadowSprite.opacity);
        if (shadowOpacity != undefined) {
            this._shadowSprite.opacity = shadowOpacity;
        }
    }
};

//--------------------------------------------------------
// アクターの影を設定
//--------------------------------------------------------

/**
 * ●アクターの影作成
 */
const _Sprite_Actor_createShadowSprite = Sprite_Actor.prototype.createShadowSprite;
Sprite_Actor.prototype.createShadowSprite = function() {
    _Sprite_Actor_createShadowSprite.apply(this, arguments);

    if (pActorShadowImage != undefined) {
        this._shadowSprite.bitmap = ImageManager.loadSystem(pActorShadowImage);
    }
    if (pActorShadowZ != undefined) {
        this._shadowSprite.z = pActorShadowZ;
    }
};

/**
 * ●アクラースプライトにバトラーを設定
 */
const _Sprite_Actor_setBattler = Sprite_Actor.prototype.setBattler;
Sprite_Actor.prototype.setBattler = function(battler) {
    const beforeActor = this._actor;

    _Sprite_Actor_setBattler.call(this, battler);

    // アクターの変化を検出
    if (battler !== beforeActor) {
        // 影を未設定に
        this._isSetShadow = false;
    }
};

/**
 * 【独自】影の位置を初期化
 * ※DynamicMotionの上書だが、それ以外でも使用する。
 */
Sprite_Actor.prototype.initShadowPosition = function() {
    if (!this._battler) {
        return;
    }

    const meta  = this._battler.actor().meta;

    // 影の基準位置設定
    const shadowX = getShadowX(this, meta.ShadowX);
    const shadowY = getShadowY(this, meta.ShadowY);
    this._shadowSprite.x = shadowX;
    this._shadowSprite.y = shadowY;
};

/**
 * ●影の描画更新
 */
const _Sprite_Actor_updateShadow = Sprite_Actor.prototype.updateShadow;
Sprite_Actor.prototype.updateShadow = function() {
    // 影の初期化を行うかどうか？
    if (this.isInitShadow()) {
        this.initBattlerShadow();
    }

    // 影の位置を初期化
    if (this.initShadowPosition) {
        this.initShadowPosition();
    }

    _Sprite_Actor_updateShadow.apply(this, arguments);

    // 影の不透明度が取得できない場合は終了
    if (!this._shadowSprite.originalOpacity) {
        return;
    }

    // 不透明度を初期化
    this._shadowSprite.opacity = this._shadowSprite.originalOpacity;

    // ※透明度が可変の場合のみ更新
    if (pTransparencyJumpHeight) {
        const shadowOpacity = getJumpOpacity(this, this._shadowSprite.opacity);
        if (shadowOpacity != undefined) {
            this._shadowSprite.opacity = shadowOpacity;
        }
    }
};

//--------------------------------------------------------
// 共通処理
//--------------------------------------------------------

/**
 * 【独自】影の初期化を行うかどうか？
 */
Sprite_Battler.prototype.isInitShadow = function() {
    // 既に設定済みなら初期化しない。
    if (this._isSetShadow) {
        return false;
    }

    // 初期化しておらず、かつ画像情報が有効なら初期化を行う。
    const mainSprite = getMainSprite(this);
    if (mainSprite.width > 0) {
        return true;
    }
    return false;
};

/**
 * 【独自】影の設定を調整
 */
Sprite_Battler.prototype.initBattlerShadow = function() {
    if (!this._shadowSprite || !this._battler) {
        // 影を設定した
        this._isSetShadow = true;
        return;
    }

    const battler = this._battler;
    // eval参照用
    const a = getMainSprite(this);
    const shadow = this._shadowSprite;

    // MVかつアクターの場合はサイズを設定
    if (Utils.RPGMAKER_NAME == "MV" && battler.isActor()) {
        this.width = a.width;
        this.height = a.height;
    }

    // アクター、敵、それぞれのmeta情報を取得
    let meta;
    if (battler.isActor()) {
        meta = battler.actor().meta;
    } else {
        meta = battler.enemy().meta;
    }

    // 浮遊処理の設定
    setFloat(this, meta);
    
    // 影を作成しない場合は処理しない。
    if (!isMakeShadow(this, meta.MakeShadow)) {
        this._shadowSprite.scale.x = 0;
        this._shadowSprite.scale.y = 0;
        this._shadowSprite.opacity = 0;
        this._shadowSprite.visible = false;
        // 影を設定した
        this._isSetShadow = true;
        return;
    }

    // 全体拡大率
    if (meta.ShadowScale) {
        const shadowScale = eval(meta.ShadowScale);
        this._shadowSprite.scale.x = shadowScale;
        this._shadowSprite.scale.y = shadowScale;

    } else {
        // Ｘ方向の拡大率
        this._shadowSprite.scale.x = getScaleX(this, shadow, meta.ShadowScaleX);
        // Ｙ方向の拡大率
        this._shadowSprite.scale.y = getScaleY(this, shadow, meta.ShadowScaleY);
    }

    // 不透明度
    const shadowOpacity = getOpacity(this, meta.ShadowOpacity);
    if (shadowOpacity != undefined) {
        this._shadowSprite.opacity = shadowOpacity;
    }
    // 元の値を保持しておく。
    this._shadowSprite.originalOpacity = this._shadowSprite.opacity;

    // 影画像の設定
    const shadowImage = meta.ShadowImage
    if (shadowImage) {
        this._shadowSprite.bitmap = ImageManager.loadSystem(shadowImage);
    }

    // 影を設定した
    this._isSetShadow = true;
    this._shadowSprite.visible = true;
};

/**
 * ●影を作成するかどうか？
 */
function isMakeShadow(sprite, metaMakeShadow) {
    // 個別の設定があればそちらを優先
    if (metaMakeShadow) {
        return eval(metaMakeShadow);
    }

    const isActor = isUseActorSetting(sprite);

    // 敵かつプラグインの設定があれば採用
    if (!isActor && pEnemyMakeShadow != undefined) {
        return eval(pEnemyMakeShadow);
    // アクターなら原則作成
    // ※animatedSVEnemies.jsの敵も対象にする。
    } else if (isAnimatedBattler(sprite)) {
        return true;
    }
    return false;
}

/**
 * ●影のＸ方向の拡大率を取得
 */
function getScaleX(sprite, shadow, metaScaleX) {
    const a = getMainSprite(sprite);
    const isActor = isUseActorSetting(sprite);

    if (metaScaleX) {
        return eval(metaScaleX);
    } else if (isActor && pActorShadowScaleX) {
        return eval(pActorShadowScaleX);
    } else if (!isActor && pEnemyShadowScaleX) {
        return eval(pEnemyShadowScaleX);
    }
    return 1;
}

/**
 * ●影のＹ方向の拡大率を取得
 */
function getScaleY(sprite, shadow, metaScaleY) {
    const a = getMainSprite(sprite);
    const isActor = isUseActorSetting(sprite);

    if (metaScaleY) {
        return eval(metaScaleY);
    } else if (isActor && pActorShadowScaleY) {
        return eval(pActorShadowScaleY);
    } else if (!isActor && pEnemyShadowScaleY) {
        return eval(pEnemyShadowScaleY);
    }
    return 1;
}

/**
 * ●影の不透明度を取得
 */
function getOpacity(sprite, metaOpacity) {
    const a = getMainSprite(sprite);
    const isActor = isUseActorSetting(sprite);

    let opacity;
    if (metaOpacity) {
        opacity = eval(metaOpacity);
    } else if (isActor && pActorShadowOpacity) {
        opacity = eval(pActorShadowOpacity);
    } else if (!isActor && pEnemyShadowOpacity) {
        opacity = eval(pEnemyShadowOpacity);
    }

    return opacity;
}

/**
 * ●ジャンプを考慮した影の不透明度を取得
 */
function getJumpOpacity(sprite, opacity) {
    // ジャンプ中は影を薄く
    if (pTransparencyJumpHeight) {
        const jumpHeight = getJumpHeight(sprite);
        return opacity * (1 - Math.min(jumpHeight / pTransparencyJumpHeight, 1));
    }
    return opacity;
}

/**
 * ●ジャンプの高さを取得
 */
function getJumpHeight(sprite) {
    if (sprite.jumpHeight) {
        return sprite.jumpHeight();

    // DynamicMotion用
    } else if (sprite._airY != null) {
        return sprite._airY * -1;
    }
    return 0;
}

/**
 * ●影のＸ座標調整値を取得
 */
function getShadowX(sprite, metaShadowX) {
    const a = getMainSprite(sprite);
    const isActor = isUseActorSetting(sprite);

    if (metaShadowX) {
        return eval(metaShadowX);
    } else if (isActor && pActorShadowX) {
        return eval(pActorShadowX);
    } else if (!isActor && pEnemyShadowX) {
        return eval(pEnemyShadowX);
    }
    return 0;
}

/**
 * ●影のＹ座標調整値を取得
 */
function getShadowY(sprite, metaShadowY) {
    const a = getMainSprite(sprite);
    const isActor = isUseActorSetting(sprite);
    let shadowY = 0;

    if (metaShadowY) {
        shadowY = eval(metaShadowY);
    } else if (isActor) {
        if (pActorShadowY) {
            shadowY = eval(pActorShadowY);
        // アクターの初期値は-2
        } else {
            shadowY = -2;
        }
    } else if (!isActor && pEnemyShadowY) {
        shadowY = eval(pEnemyShadowY);
    }

    // 浮遊値加算
    if (sprite.floatHeight) {
        shadowY += sprite.floatHeight;
        // 変動幅を減算
        shadowY -= sprite.floatSwing;
    }

    return shadowY;
}

/**
 * ●アクター側の設定を使用するかどうか？
 */
function isUseActorSetting(sprite) {
    return sprite._battler.isActor();
}

/**
 * ●SVモーションを使用できるバトラーかどうか？
 * ※animatedSVEnemies.jsを考慮
 */
function isAnimatedBattler(sprite) {
    return !!sprite._actor;
}

/**
 * ●本体スプライトを取得
 */
function getMainSprite(sprite) {
    // MVの場合
    if (Utils.RPGMAKER_NAME == "MV") {
        return sprite._effectTarget;
    }
    // MZの場合
    return sprite.mainSprite();
};

//--------------------------------------------------------
// 浮遊処理
//--------------------------------------------------------

/**
 * ●浮遊設定を行う
 */
function setFloat(sprite, meta) {
    const battler = sprite._battler;

    const oldFloatHeight = sprite.floatHeight ? sprite.floatHeight : 0;
    const floatHeight = getFloatHeight(sprite, meta);
    // 前回の浮遊値との差分を取得
    const diffFloatHeight = floatHeight - oldFloatHeight;

    // 参照用にスプライトとバトラーの両方に浮遊値を設定
    sprite.floatHeight = floatHeight;
    battler.floatHeight = floatHeight;

    // 浮遊の上下変動を設定
    sprite._floatAmplitude = getAmplitude(sprite, meta);
    sprite._floatPeriodicTime = getPeriodicTime(sprite, meta);

    // 浮遊時間制御用
    sprite._floatTime = 0;
    // 開始時間をランダム化することでバラつかせる。
    if (pRandomStartFloatHeight) {
        sprite._floatTime = Math.randomInt(sprite._floatPeriodicTime);
    }

    // ホームポジションのＹ座標を調整
    if (battler.isEnemy()) {
        battler._screenY -= diffFloatHeight;
        sprite.setHome(battler.screenX(), battler.screenY());
    } else {
        sprite.setHome(sprite._homeX, sprite._homeY - diffFloatHeight);
    }
}

/**
 * ●浮遊する高さを取得
 */
function getFloatHeight(sprite, meta) {
    const a = getMainSprite(sprite);
    const isActor = isUseActorSetting(sprite);
    let floatHeight = meta.BattlerFloat;

    // バトラーが浮遊ステートを保持しているなら優先設定
    for (const state of sprite._battler.states()) {
        if (state.meta.BattlerFloat) {
            floatHeight = eval(state.meta.BattlerFloat);
            break;
        }
    }

    if (isActor && floatHeight === true && pActorFloatHeight) {
        return eval(pActorFloatHeight);
    } else if (!isActor && floatHeight === true && pEnemyFloatHeight) {
        return eval(pEnemyFloatHeight);
    } else if (floatHeight != undefined) {
        return eval(floatHeight);
    }
    return 0;
}

/**
 * ●浮遊振幅を取得
 */
 function getAmplitude(sprite, meta) {
    const a = getMainSprite(sprite);
    const isActor = isUseActorSetting(sprite);

    // ステートに振幅が設定されているなら最優先
    for (const state of sprite._battler.states()) {
        if (state.meta.FloatAmplitude) {
            return eval(state.meta.FloatAmplitude);
        }
    }

    // メタ情報 -> プラグイン設定値の優先順で取得
    const floatAmplitude = meta.FloatAmplitude;
    if (floatAmplitude) {
        return eval(floatAmplitude);
    } else if (isActor && pActorFloatAmplitude) {
        return eval(pActorFloatAmplitude);
    } else if (!isActor && pEnemyFloatAmplitude) {
        return eval(pEnemyFloatAmplitude);
    }
    return 0;
}

/**
 * ●浮遊周期を取得
 */
 function getPeriodicTime(sprite, meta) {
    const a = getMainSprite(sprite);
    const isActor = isUseActorSetting(sprite);

    // ステートに周期が設定されているなら最優先
    for (const state of sprite._battler.states()) {
        if (state.meta.FloatPeriodicTime) {
            return eval(state.meta.FloatPeriodicTime);
        }
    }

    // メタ情報 -> プラグイン設定値の優先順で取得
    const floatPeriodicTime = meta.FloatPeriodicTime;
    if (floatPeriodicTime) {
        return eval(floatPeriodicTime);
    } else if (isActor && pActorFloatPeriodicTime) {
        return eval(pActorFloatPeriodicTime);
    } else if (!isActor && pEnemyFloatPeriodicTime) {
        return eval(pEnemyFloatPeriodicTime);
    }
    return 0;
}

/**
 * ●ステートの追加
 */
const _Game_BattlerBase_addNewState = Game_BattlerBase.prototype.addNewState;
Game_BattlerBase.prototype.addNewState = function(stateId) {
    _Game_BattlerBase_addNewState.apply(this, arguments);

    const state = $dataStates[stateId];
    // ステートの浮遊指定があれば
    if (state.meta.BattlerFloat != undefined) {
        const sprite = getBattlerSprite(this);
        // 影を未設定にして初期化
        if (sprite) {
            sprite._isSetShadow = false;
        }
    }
};

/**
 * ●ステートの解除
 */
const _Game_BattlerBase_eraseState = Game_BattlerBase.prototype.eraseState;
Game_BattlerBase.prototype.eraseState = function(stateId) {
    _Game_BattlerBase_eraseState.apply(this, arguments);

    const state = $dataStates[stateId];
    // ステートの浮遊指定があれば
    if (state.meta.BattlerFloat != undefined) {
        const sprite = getBattlerSprite(this);
        // 影を未設定にして初期化
        if (sprite) {
            sprite._isSetShadow = false;
        }
    }
};

/**
 * ●ステートクリア
 */
const _Game_BattlerBase_clearStates = Game_BattlerBase.prototype.clearStates;
Game_BattlerBase.prototype.clearStates = function() {
    _Game_BattlerBase_clearStates.apply(this, arguments);

    // 戦闘開始時は有効でない模様
    if (BattleManager._spriteset) {
        const sprite = getBattlerSprite(this);
        if (sprite) {
            // 影を未設定にして初期化
            sprite._isSetShadow = false;
        }
    }
};

/**
 * ●変数初期化
 */
const _Sprite_Battler_initMembers = Sprite_Battler.prototype.initMembers;
Sprite_Battler.prototype.initMembers = function() {
    _Sprite_Battler_initMembers.apply(this, arguments);

    // 浮遊時間制御用
    this._floatTime = 0;
}

/**
 * ●更新時の位置補正
 */
const _Sprite_Battler_updatePosition = Sprite_Battler.prototype.updatePosition;
Sprite_Battler.prototype.updatePosition = function() {
    _Sprite_Battler_updatePosition.apply(this, arguments);

    // 浮遊状態の場合、浮遊時間に応じて上下させる。
    if (this.floatHeight) {
        // 変動幅を設定し、Ｙ座標に加算
        this.floatSwing =
            Math.sin(this._floatTime / this._floatPeriodicTime * Math.PI * 2) * this._floatAmplitude;
        this.y += this.floatSwing;
        // 時間を進める。
        this._floatTime++;
    }
};

//--------------------------------------------------------
// DynamicMotion連携
//--------------------------------------------------------

/**
 * ●DynamicMotion連携用の影更新
 */
Sprite_Enemy.prototype.updateDynamicShadow = function() {
    const motion = this._setDynamicMotion;
    if (!motion || !this._shadowSprite) {
        return;
    }

    // 影非表示
    if (motion._noShadow) {
        this._shadowSprite.visible = false;
        return;
    // 影再表示
    } else if (motion._noShadow === false) {
        this._shadowSprite.visible = true;
    }

    // 空中Ｙ座標
    const airY = this.rollAirY();

    // ジャンプ時の影表示
    if (pJumpShadow == true) {
        // ジャンプ座標分だけ影のＹ座標を調整
        if (airY && this._shadowSprite.visible) {
            this._shadowSprite.y -= airY;
        }

    // ジャンプ時の影非表示
    } else if (pJumpShadow == false && airY) {
        this._shadowSprite.visible = false;
        return;
    }
};

/**
 * ●指定したバトラーのスプライトを取得する。
 */
function getBattlerSprite(battler) {
    const spriteset = BattleManager._spriteset;
    if (!spriteset) {
        return;
    }

    const sprites = spriteset.battlerSprites();

    // 一致があれば返す
    return sprites.find(s => s._battler == battler);
}

})();
    