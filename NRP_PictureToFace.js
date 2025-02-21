//=============================================================================
// NRP_PictureToFace.js
//=============================================================================
/*:
 * @target MZ MV
 * @plugindesc v1.01 Picture is displayed as a face image.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/502356002.html
 *
 * @help Allows the picture to be used as a face image
 * without modification.
 * 
 * This plugin was created by the author to automate
 * the process of cropping face images from a standing picture.
 * 
 * In case you are interested, we also support facial images
 * for messages, but they are basically
 * for actors displayed on menu screens, etc.
 * 
 * Specifically, by linking a face image file to a picture,
 * the picture is displayed as a 144x144 sized face image.
 * ※Note that the index of the face image is not referenced.
 *   1 character = 1 file.
 * ※Starting with MZ ver 1.9.0, face size can be specified in System 2.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Set the source file to "Face" in "PictureList"
 * and link it to the destination picture.
 * 
 * Set AdjustX, AdjustY, and Scale to adjust the crop position.
 * 
 * -------------------------------------------------------------------
 * [About Conditions]
 * -------------------------------------------------------------------
 * By using switches and scripts as conditions, the picture
 * to be referenced can be changed depending on the situation.
 * 
 * For example, you can set the script condition "a.isDead()"
 * to change the display only when the actor is dead.
 * 
 * However, in some situations, the a (battler) information
 * cannot be obtained and may not be reflected.
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
 * @ Plugin Parameters
 * @------------------------------------------------------------------
 * 
 * @param PictureList
 * @type struct<Picture>[]
 * @desc Here is a list of pictures.
 * 
 * @param <PictureSetting>
 * 
 * @param Origin
 * @parent <PictureSetting>
 * @type select
 * @option 0:Left-Upper @value 0
 * @option 1:Center @value 1
 * @default 1
 * @desc The origin to display the picture.
 * 
 * @param AdjustX
 * @parent <PictureSetting>
 * @type number @min -9999 @max 9999
 * @default 0
 * @desc Adjust the X coordinate to crop the picture.
 * 
 * @param AdjustY
 * @parent <PictureSetting>
 * @type number @min -9999 @max 9999
 * @default 0
 * @desc Adjust the Y coordinate to crop the picture.
 * 
 * @param Scale
 * @parent <PictureSetting>
 * @type number
 * @default 100
 * @desc This is the standard picture scale factor.
 * Set the value based on 100.
 * 
 * @param FaceWidth
 * @parent <PictureSetting>
 * @type number
 * @desc The width of the face image to be displayed.
 * If blank, refers to the value set in System 2.
 * 
 * @param FaceHeight
 * @parent <PictureSetting>
 * @type number
 * @desc The height of the face image to be displayed.
 * If blank, refers to the value set in System 2.
 */
//-----------------------------------------------------------------------------
// Picture
//-----------------------------------------------------------------------------
/*~struct~Picture:
 * @param Face
 * @type file
 * @dir img/faces
 * @desc The file of the face image to be replaced.
 * 
 * @param Picture
 * @type file
 * @dir img/pictures
 * @desc The picture to be replaced.
 * 
 * @param Switch
 * @type switch
 * @desc Switch to enable display.
 * The highest setting among the conditions is displayed.
 * 
 * @param ScriptCondition
 * @type string
 * @desc Script to enable display.
 * e.g.: a.isDead()
 * 
 * @param <PictureSetting>
 * 
 * @param Origin
 * @parent <PictureSetting>
 * @type select
 * @option 0:Left-Upper @value 0
 * @option 1:Center @value 1
 * @default 1
 * @desc The origin to display the picture.
 * 
 * @param AdjustX
 * @parent <PictureSetting>
 * @type number @min -9999 @max 9999
 * @desc Adjust the X coordinate to crop the picture.
 * 
 * @param AdjustY
 * @parent <PictureSetting>
 * @type number @min -9999 @max 9999
 * @desc Adjust the Y coordinate to crop the picture.
 * 
 * @param Scale
 * @parent <PictureSetting>
 * @type number
 * @desc This is the standard picture scale factor.
 * Set the value based on 100.
 */

/*:ja
 * @target MZ MV
 * @plugindesc v1.01 ピクチャを顔グラとして表示。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/502356002.html
 *
 * @help ピクチャを顔グラとしてそのまま使用できるようにします。
 * 
 * このプラグインは立ち絵用のピクチャから、
 * いちいち顔グラを別ファイルとして切り抜くのが面倒になった作者が、
 * 作業を省略するために作ったプラグインです。
 * 
 * 一応、メッセージの顔グラにも対応していますが、
 * 基本的にはメニュー画面などに表示されるアクター用です。
 * 
 * 具体的には顔グラのファイルとピクチャを紐づけることで、
 * ピクチャを144x144のサイズの顔グラとして表示します。
 * ※なお、顔グラのパターンは参照しません。
 * 　１キャラクター＝１ファイルとしてください。
 * ※MZ ver1.9.0より、システム2で顔サイズを指定できるようになりました。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * 『ピクチャリスト』の『顔グラ』に置換元となるファイルを設定し、
 * 置換先となるピクチャと紐づけてください。
 * 
 * Ｘ座標補正、Ｙ座標補正、拡大率を設定し、切り抜く位置を調整してください。
 * 
 * -------------------------------------------------------------------
 * ■条件について
 * -------------------------------------------------------------------
 * スイッチやスクリプトを条件とすることで、
 * 状況によって参照するピクチャを変更できます。
 * 
 * 例えば、スクリプト条件に「a.isDead()」と設定すれば、
 * 戦闘不能時のみ表示を変更させることができます。
 * 
 * ただし、場面によっては、a（battler）の情報を取得できないため、
 * 反映されないことがあります。
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
 * @param PictureList
 * @text ピクチャリスト
 * @type struct<Picture>[]
 * @desc 立ち絵の表示を行うピクチャの一覧です。
 * 
 * @param <PictureSetting>
 * @text ＜ピクチャ設定＞
 * 
 * @param Origin
 * @parent <PictureSetting>
 * @text 原点
 * @type select
 * @option 0:左上 @value 0
 * @option 1:中央 @value 1
 * @default 1
 * @desc ピクチャを表示する原点です。
 * 
 * @param AdjustX
 * @parent <PictureSetting>
 * @text Ｘ座標補正
 * @type number @min -9999 @max 9999
 * @default 0
 * @desc ピクチャを切り取るＸ座標を調整します。
 * 
 * @param AdjustY
 * @parent <PictureSetting>
 * @text Ｙ座標補正
 * @type number @min -9999 @max 9999
 * @default 0
 * @desc ピクチャを切り取るＹ座標を調整します。
 * 
 * @param Scale
 * @parent <PictureSetting>
 * @text 拡大率
 * @type number
 * @default 100
 * @desc 標準となるピクチャの拡大率です。
 * 100を基準に設定してください。
 * 
 * @param FaceWidth
 * @parent <PictureSetting>
 * @text 顔グラの横幅
 * @type number
 * @desc 表示される顔グラの横幅です。
 * 空欄ならシステム2の設定値を参照します。
 * 
 * @param FaceHeight
 * @parent <PictureSetting>
 * @text 顔グラの縦幅
 * @type number
 * @desc 表示される顔グラの縦幅です。
 * 空欄ならシステム2の設定値を参照します。
 */
//-----------------------------------------------------------------------------
// Picture
//-----------------------------------------------------------------------------
/*~struct~Picture:ja
 * @param Face
 * @text 顔グラ
 * @type file
 * @dir img/faces
 * @desc 置換対象とする顔グラのファイルです。
 * 
 * @param Picture
 * @text ピクチャ
 * @type file
 * @dir img/pictures
 * @desc 置換先のピクチャです。
 * 
 * @param Switch
 * @text スイッチ
 * @type switch
 * @desc 表示を有効にするスイッチです。
 * 条件を満たした中で最も上の設定が表示されます。
 * 
 * @param ScriptCondition
 * @text スクリプト条件
 * @type string
 * @desc 表示を有効にするスクリプトです。
 * 例：a.isDead()
 * 
 * @param <PictureSetting>
 * @text ＜ピクチャ設定＞
 * 
 * @param Origin
 * @parent <PictureSetting>
 * @text 原点
 * @type select
 * @option 0:左上 @value 0
 * @option 1:中央 @value 1
 * @desc ピクチャを表示する原点です。
 * 
 * @param AdjustX
 * @parent <PictureSetting>
 * @text Ｘ座標調整
 * @type number @min -9999 @max 9999
 * @desc ピクチャを切り取るＸ座標を調整します。
 * 
 * @param AdjustY
 * @parent <PictureSetting>
 * @text Ｙ座標調整
 * @type number @min -9999 @max 9999
 * @desc ピクチャを切り取るＹ座標を調整します。
 * 
 * @param Scale
 * @parent <PictureSetting>
 * @text 拡大率
 * @type number
 * @desc ピクチャの拡大率です。
 * 100を基準に設定してください。
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

const PLUGIN_NAME = "NRP_PictureToFace";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pPictureList = parseStruct2(parameters["PictureList"]);
const pOrigin = parameters["Origin"];
const pAdjustX = toNumber(parameters["AdjustX"]);
const pAdjustY = toNumber(parameters["AdjustY"]);
const pScale = toNumber(parameters["Scale"], 100);
const pFaceWidth = toNumber(parameters["FaceWidth"]);
const pFaceHeight = toNumber(parameters["FaceHeight"]);

// ----------------------------------------------------------------------------
// Window_StatusBase
// ----------------------------------------------------------------------------

// アクター一時保管用
let mActor = null;

// MZ
if (typeof Window_StatusBase !== 'undefined') {
    /**
     * ●顔グラの描画
     */
    const _Window_StatusBase_drawActorFace = Window_StatusBase.prototype.drawActorFace;
    Window_StatusBase.prototype.drawActorFace = function(
        actor, x, y, width, height
    ) {
        // ImageManager.loadFaceにはactorを引き継げないので、
        // ここで一時的に設定して参照する。
        mActor = actor;
        _Window_StatusBase_drawActorFace.apply(this, arguments);
        mActor = null;
    };
// MV
} else {
    /**
     * ●顔グラの描画
     */
    const _Window_Base_drawActorFace = Window_Base.prototype.drawActorFace;
    Window_Base.prototype.drawActorFace = function(
        actor, x, y, width, height
    ) {
        // ImageManager.loadFaceにはactorを引き継げないので、
        // ここで一時的に設定して参照する。
        mActor = actor;
        _Window_Base_drawActorFace.apply(this, arguments);
        mActor = null;
    };
}

// ----------------------------------------------------------------------------
// ImageManager
// ----------------------------------------------------------------------------

/**
 * ●顔グラの読み込み
 */
const _ImageManager_loadFace = ImageManager.loadFace;
ImageManager.loadFace = function(filename) {
    const data = getMatchPictureData(filename, mActor);
    if (data) {
        // 指定がない場合は初期値を取得
        const faceWidth = setDefault(pFaceWidth, ImageManager.faceWidth);
        const faceHeight = setDefault(pFaceHeight, ImageManager.faceHeight);

        // ピクチャを取得する。
        const pictureBitmap = ImageManager.loadPicture(data.picture);
        // ピクチャを元に顔グラを作成する。
        const faceBitmap = new Bitmap(faceWidth, faceHeight);
        // ピクチャから切り取る幅
        const cutWidth = faceWidth / data.scale * 100;
        const cutHeight = faceHeight / data.scale * 100;

        let sx = data.adjustX;
        let sy = data.adjustY;

        // 原点が1:中央
        if (pOrigin == 1) {
            // ピクチャの中央を基準にする。
            sx += pictureBitmap.width / 2 - cutWidth / 2;
            sy += pictureBitmap.height / 2 - cutHeight / 2;
        }

        faceBitmap.blt(pictureBitmap, sx, sy, cutWidth, cutHeight, 0, 0, faceWidth, faceHeight);
        return faceBitmap;
    }

    return _ImageManager_loadFace.apply(this, arguments);
};

// ----------------------------------------------------------------------------
// Game_Actor
// ----------------------------------------------------------------------------

/**
 * ●顔グラのインデックスを取得
 */
const _Game_Actor_faceIndex = Game_Actor.prototype.faceIndex;
Game_Actor.prototype.faceIndex = function() {
    // ファイルが変換対象の場合はインデックスは0固定に
    if (getMatchPictureData(this._faceName, this)) {
        return 0;
    }
    return _Game_Actor_faceIndex.apply(this, arguments);
};

// ----------------------------------------------------------------------------
// Game_Message
// ----------------------------------------------------------------------------

/**
 * ●顔グラのインデックスを取得
 */
const _Game_Message_faceIndex = Game_Message.prototype.faceIndex;
Game_Message.prototype.faceIndex = function() {
    // ファイルが変換対象の場合はインデックスは0固定に
    if (getMatchPictureData(this._faceName, this)) {
        return 0;
    }
    return _Game_Message_faceIndex.apply(this, arguments);
};

// ----------------------------------------------------------------------------
// 共通関数
// ----------------------------------------------------------------------------

/**
 * ●一致するピクチャ情報を取得する。
 */
function getMatchPictureData(filename, battler) {
    const data = {};

    // 全ピクチャのリストをループし、一致する情報を取得
    for (const picture of pPictureList) {
        // 顔グラが不一致の場合
        if (picture.Face != filename) {
            continue;
        // スイッチが有効でない場合は飛ばす
        } else if (!isSwitchOk(picture.Switch)) {
            continue;
        // スクリプトが有効でない場合は飛ばす
        } else if (!isScriptOk(picture.ScriptCondition, battler)) {
            continue;
        }

        // 条件に一致した。
        data.picture = picture.Picture;
        data.adjustX = pAdjustX + toNumber(picture.AdjustX, 0);
        data.adjustY = pAdjustY + toNumber(picture.AdjustY, 0);
        // 優先する値（右側）があればを取得
        data.scale = getNewValue(pScale, toNumber(picture.Scale));
        return data;
    }
    // 一致がない場合はnullを返す。
    return null;
}

/**
 * ●スイッチが有効かどうか？
 */
function isSwitchOk(targetSwitch) {
    // スイッチの指定がない場合は常にＯＫ
    if (!targetSwitch) {
        return true;
    }
    return $gameSwitches.value(targetSwitch);
}

/**
 * ●スクリプトが有効かどうか？
 */
function isScriptOk(script, a) {
    // スクリプトの指定がない場合は常にＯＫ
    if (!script) {
        return true;
    }

    // 数式がエラーとなった場合は無視
    // ※aがnullの場合を想定
    try {
        return eval(script);
    } catch (e) {}
    return false;
}

/**
 * ●新しい値が存在する場合は優先する。
 */
function getNewValue(oldValue, newValue) {
    if (newValue != null && newValue != "") {
        return newValue;
    }
    return oldValue;
}

})();
