//=============================================================================
// NRP_PicturePriority.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.021 Change the display priority for each picture.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/485015972.html
 *
 * @help You can change the Z coordinate (display priority)
 * for each picture.
 * 
 * ◆Features
 * - Change the Z-coordinate of the picture
 *   for each number by plugin command
 * - It is possible to change the Z-coordinate of multiple pictures
 *   at the same time.
 * - Can be used together with
 *   PicturePriorityCustomize.js (by Triacontane)
 * 
 * -------------------------------------------------------------------
 * [Plugin Command MZ]
 * -------------------------------------------------------------------
 * ◆SetZ
 * All you have to do is specify the picture number and Z-coordinate.
 * However, it must be after the picture is displayed.
 * 
 * You can also specify multiple picture numbers or use a formula.
 * 
 * - Example1: 1,2,3
 * - Example2: 1~3
 * - Example3: $gameVariables.value(1)
 * 
 * If you want to cancel the setting, leave the Z-coordinate blank,
 * or do "Erase Picture" from the event command.
 * 
 * -------------------------------------------------------------------
 * [Plugin Command MV]
 * -------------------------------------------------------------------
 * Since the functions are the same as the MZ version,
 * the explanation is omitted.
 * Does not distinguish between individual capital letters.
 * Also, do not include [].
 * 
 * ◆SetZ
 * NRP.PicturePriority.SetZ [Picture No] [Z-coordinate]
 * 
 * - Example1: NRP.PicturePriority.SetZ 1~5 3
 * Change the Z-coordinate of pictures 1 to 5 to 3
 * 
 * - Example2: NRP.PicturePriority.SetZ 1,2,3
 * Release the Z-coordinates of the pictures numbered 1 to 3.
 * 
 * -------------------------------------------------------------------
 * [Reference]
 * -------------------------------------------------------------------
 * The meaning of the Z-coordinate is as follows.
 *
 * 0 : Lower tiles
 * 1 : Lower characters
 * 3 : Normal characters
 * 4 : Upper tiles
 * 5 : Upper characters
 * 6 : Airship shadow
 * 7 : Balloon
 * 8 : Animation
 * 9 : Touch Operation Destination
 * 
 * For example, if you want to display between "Lower tiles"
 * and "Lower characters", you can set a value such as "z = 0.5".
 * Z-coordinates can also be specified as a decimal number.
 * 
 * -------------------------------------------------------------------
 * [Notice]
 * -------------------------------------------------------------------
 * ◆About Battle
 * By default, setting the Z coordinate for a picture during battle
 * does not change its display priority.
 * It must be combined with plugins that control display priority,
 * such as NRP_DynamicMotionMZ.js.
 * 
 * ◆Regarding the Release of the Z-Coordinate
 * Note that once the Z coordinate is specified,
 * the setting remains active until it is canceled.
 * ※Even if the picture's scale or opacity is set to 0,
 *   the picture continues to exist internally.
 * 
 * The ‘ReleaseOnTransfer’ plugin parameter will only be
 * automatically released when moving locations if it is enabled.
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
 * @command SetZ
 * @desc Set the display priority (Z-coordinate) of the picture.
 * Leave the Z-coordinate blank to cancel.
 * 
 * @arg PictureId
 * @desc The picture number to target. Multiple & formula are allowed.
 * eg1: 1,2,3　eg2: 1~3
 * 
 * @arg Z
 * @desc Priority. 0:Lower tile, 1:Lower character, 3:Normal character,
 * 4:Upper tile, 5:Upper character, 7:Balloon, 8:Animation
 * @type number @min -99999 @max 99999 @decimals 2
 * 
 * @------------------------------------------------------------------
 * @ Plugin Parameters
 * @------------------------------------------------------------------
 * 
 * @param DefaultZ
 * @type number @min -99999 @max 99999 @decimals 2
 * @desc The display priority initially set for the picture.
 * If blank, the standard Maker behavior is followed.
 * 
 * @param ReleaseOnTransfer
 * @type boolean
 * @default false
 * @desc Removes the Z coordinate setting for pictures during player transfer.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.021 ピクチャ毎に表示優先度を変更します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/485015972.html
 *
 * @help ピクチャ毎にＺ座標（表示優先度）を変更できます。
 * 
 * ◆特徴
 * ・プラグインコマンドによって、番号毎にピクチャのＺ座標を変更
 * ・複数のピクチャのＺ座標を同時に変更することも可能
 * ・PicturePriorityCustomize.js（トリアコンタン様）との併用も可
 * 
 * -------------------------------------------------------------------
 * ■プラグインコマンド（ＭＺ）
 * -------------------------------------------------------------------
 * ◆Ｚ座標を設定
 * ピクチャ番号とＺ座標を指定すればＯＫです。
 * ただし、ピクチャの表示後である必要があります。
 * 
 * また、ピクチャ番号には複数指定や数式の使用も可能です。
 * 
 * ・例１：1,2,3
 * ・例２：1~3
 * ・例３：$gameVariables.value(1)
 * 
 * 設定を解除したい場合はＺ座標を空欄にするか、
 * イベントコマンドから『ピクチャの消去』をしてください。
 * 
 * -------------------------------------------------------------------
 * ■プラグインコマンド（ＭＶ）
 * -------------------------------------------------------------------
 * 機能はＭＺ版と同じため、説明は割愛します。
 * ※大文字個別は区別しません。また[]は含まないでください。
 * 
 * ◆Ｚ座標を設定
 * NRP.PicturePriority.SetZ [ピクチャ番号] [Ｚ座標]
 * 
 * 例１：NRP.PicturePriority.SetZ 1~5 3
 * 1～5番のピクチャのＺ座標を3に変更
 * 
 * 例２：NRP.PicturePriority.SetZ 1,2,3
 * 1～3番のピクチャのＺ座標を解除
 * 
 * -------------------------------------------------------------------
 * ■参考
 * -------------------------------------------------------------------
 * Ｚ座標の意味は以下の通りです。
 *
 * 0 : 下層タイル
 * 1 : 通常キャラの下
 * 3 : 通常キャラ
 * 4 : 上層タイル
 * 5 : 通常キャラの上
 * 6 : 飛行船の影
 * 7 : 吹き出し
 * 8 : アニメーション
 * 9 : タッチ操作の移動先
 * 
 * 例えば『下層タイル』と『通常キャラの下』の間に表示をしたい場合は
 * 『z = 0.5』などの値を設定できます。
 * ※Ｚ座標は小数も指定可能です。
 * 
 * -------------------------------------------------------------------
 * ■注意点
 * -------------------------------------------------------------------
 * ◆戦闘時の使用について
 * 初期状態では、戦闘中のピクチャーに
 * Ｚ座標を設定しても表示優先度は変化しません。
 * NRP_DynamicMotionMZ.jsなど表示優先度の制御を行うプラグインと
 * 組み合わせる必要があります。
 * 
 * ◆Ｚ座標の解除について
 * なお、Ｚ座標を一度指定すると解除するまで
 * 設定が継続することに注意してください。
 * ※ピクチャの拡大率や不透明度を0にした場合でも、
 *　 ピクチャは内部的には存在し続けます。
 * 
 * プラグインパラメータの『移動時にＺ座標を解除』が
 * オンの場合のみ場所移動時に自動で解除されます。
 * 
 * -------------------------------------------------------------------
 * ■利用規約
 * -------------------------------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * ただし、当プラグインではPicturePriorityCustomize.jsより
 * 一部の処理を流用しています。
 * その部分については、ＭＩＴライセンスに従います。
 * 
 * @------------------------------------------------------------------
 * @ プラグインコマンド
 * @------------------------------------------------------------------
 * 
 * @command SetZ
 * @text Ｚ座標を設定
 * @desc ピクチャの表示優先度（Ｚ座標）を設定します。
 * Ｚ座標を空欄にすると解除します。
 * 
 * @arg PictureId
 * @text ピクチャ番号
 * @desc 対象とするピクチャ番号です。複数指定＆数式可
 * 例１：1,2,3　例２：1~3
 * 
 * @arg Z
 * @text Ｚ座標
 * @desc 表示優先度。0:下層, 1:キャラ下, 3:キャラ, 4:上層
 * 5:キャラ上, 6:飛行船影, 7:フキダシ, 8:アニメ, 9:目的地
 * @type number @min -99999 @max 99999 @decimals 2
 * 
 * @------------------------------------------------------------------
 * @ プラグインパラメータ
 * @------------------------------------------------------------------
 * 
 * @param DefaultZ
 * @text 初期Ｚ座標
 * @type number @min -99999 @max 99999 @decimals 2
 * @desc ピクチャに初期設定する表示優先度です。
 * 空白の場合はツクールの標準動作に従います。
 * 
 * @param ReleaseOnTransfer
 * @text 移動時にＺ座標を解除
 * @type boolean
 * @default false
 * @desc 場所移動時、ピクチャに対するＺ座標の設定を解除します。
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

const PLUGIN_NAME = "NRP_PicturePriority";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pDefaultZ = toNumber(parameters["DefaultZ"]);
const pReleaseOnTransfer = toBoolean(parameters["ReleaseOnTransfer"], false);

// ----------------------------------------------------------------------------
// PicturePriorityCustomize.jsとの併用対策
// ----------------------------------------------------------------------------

const hasPicturePriorityCustomize = PluginManager._scripts.some(scriptName => scriptName == "PicturePriorityCustomize");
const PLUGIN_NAME_PPC = "PicturePriorityCustomize";

// ============================================================================
// (C) 2017 Triacontane
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
// ----------------------------------------------------------------------------
//
// ↓↓↓↓↓PicturePriorityCustomizeの流用部分↓↓↓↓↓
// ============================================================================

const getParamString = function(paramNames) {
    if (!Array.isArray(paramNames)) paramNames = [paramNames];
    for (let i = 0; i < paramNames.length; i++) {
        const name = PluginManager.parameters(PLUGIN_NAME_PPC)[paramNames[i]];
        if (name) return name;
    }
    return '';
};

const getParamNumber = function(paramNames, min, max) {
    const value = getParamString(paramNames);
    if (arguments.length < 2) min = -Infinity;
    if (arguments.length < 3) max = Infinity;
    return (parseInt(value) || 0).clamp(min, max);
};

const ppcParam               = {};
ppcParam.upperPictureId      = getParamNumber(['UpperPictureId', '上層ピクチャ番号']);
ppcParam.lowerPictureId      = getParamNumber(['LowerPictureId', '下層ピクチャ番号']);
ppcParam.lowerPictureZ       = getParamNumber(['LowerPictureZ', '下層ピクチャZ座標']);
ppcParam.lowerPictureBattleZ = getParamNumber(['LowerPictureBattleZ', '戦闘下層ピクチャZ座標'], 0);

// ----------------------------------------------------------------------------
// ↑↑↑↑↑流用終わり↑↑↑↑↑
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// プラグインコマンド（ＭＺ）
// ----------------------------------------------------------------------------

// MVには存在しないため、空で定義しておかないとエラーになる。
if (!PluginManager.registerCommand) {
    PluginManager.registerCommand = function() {}
}

/**
 * ●ピクチャのＺ座標変更
 */
PluginManager.registerCommand(PLUGIN_NAME, "SetZ", function(args) {
    // 引数を分解して配列に変換
    const pictureIds = textToArray(args.PictureId);
    const z = eval(args.Z);

    const spriteset = getSpriteset();
    // 各ピクチャにＺ座標を設定
    for (const pictureId of pictureIds) {
        const picture = spriteset.getPictureFromId(pictureId);
        picture.setZ(z);
    }
});

// ----------------------------------------------------------------------------
// プラグインコマンド（ＭＶ）
// ----------------------------------------------------------------------------

const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);

    // 小文字化してから判定
    const lowerCommand = command.toLowerCase();
    
    /**
     * ●ピクチャのＺ座標変更
     */
    if (lowerCommand === "nrp.picturepriority.setz") {
        // 引数を分解して配列に変換
        const pictureIds = textToArray(args[0]);
        const z = eval(args[1]);

        const spriteset = getSpriteset();
        // 各ピクチャにＺ座標を設定
        for (const pictureId of pictureIds) {
            const picture = spriteset.getPictureFromId(pictureId);
            picture.setZ(z);
        }
    }
};

// ----------------------------------------------------------------------------
// Spriteset_Base
// ----------------------------------------------------------------------------

/**
 * ●ピクチャの作成
 */
const _Spriteset_Base_createPictures = Spriteset_Base.prototype.createPictures;
Spriteset_Base.prototype.createPictures = function() {
    _Spriteset_Base_createPictures.apply(this, arguments);

    // ピクチャスプライト管理用の配列
    this._pictures = [];
    for (const picture of this._pictureContainer.children) {
        this._pictures.push(picture);
    }

    // もう１回ループ
    // ※ちなみに↑のループ内でまとめてやろうとすると、
    // 　Container自体を書き換えた結果、処理が飛んでしまうのでＮＧ
    for (const picture of this._pictures) {
        // Ｚ座標が設定されているなら、Ｚ座標ソートの対象へ
        if (picture.z != null) {
            picture.releaseContainer(this);
        }
    }
};

/**
 * 【独自】ＩＤを指定してピクチャを取得
 */
Spriteset_Base.prototype.getPictureFromId = function(pictureId) {
    return this._pictures.find(p => p._pictureId == pictureId);
}

// ----------------------------------------------------------------------------
// Game_Picture
// ----------------------------------------------------------------------------

/**
 * 【独自】Ｚ座標を取得
 */
Game_Picture.prototype.z = function() {
    return this._z;
};

/**
 * 【独自】Ｚ座標を指定する。
 */
Game_Picture.prototype.setZ = function(z) {
    this._z = z;
}

// ----------------------------------------------------------------------------
// Sprite_Picture
// ----------------------------------------------------------------------------

/**
 * ●Game_Pictureの座標をSpriteに反映
 */
const _Sprite_Picture_updatePosition = Sprite_Picture.prototype.updatePosition;
Sprite_Picture.prototype.updatePosition = function() {
    _Sprite_Picture_updatePosition.apply(this, arguments);

    // Ｚ座標を反映
    const picture = this.picture();
    this.z = picture.z();
};

/**
 * 【独自】Ｚ座標を指定し、さらにピクチャの親を移行する。
 */
Sprite_Picture.prototype.setZ = function(z) {
    const picture = this.picture();
    if (!picture) {
        return;
    }

    // Game_Screen側へ反映
    picture.setZ(z);
    const spriteset = getSpriteset();

    // Ｚ座標が削除された場合
    if (z == null) {
        // ピクチャの親を元に戻す。
        this.restoreContainer(spriteset);
        return;
    }

    // Ｚ座標ソートの対象へ
    this.releaseContainer(spriteset);
}

/**
 * 【独自】ピクチャの親を移行し、Ｚ座標ソートの対象とする。
 */
Sprite_Picture.prototype.releaseContainer = function(spriteset) {
    // ピクチャを現在の親から切り離す。
    // ※デフォルトの親（コンテナ）はひとまとめになっているため、
    // 　そのままではピクチャ毎のＺソートができない。
    this.parent.removeChild(this);
    // 新しい親に追加する。
    getPictureParent(spriteset).addChild(this);
}

/**
 * 【独自】当プラグインによる管理を解除し、ピクチャを元の親へ戻す。
 */
Sprite_Picture.prototype.restoreContainer = function(spriteset) {
    // Ｚ座標をクリア
    this.z = null;

    let container;

    // PicturePriorityCustomize.jsと併用時
    if (hasPicturePriorityCustomize) {
        const pictureId = this.getPictureId();
        // PicturePriorityCustomize.js側の設定に従って、各コンテナを取得
        if (pictureId <= ppcParam.lowerPictureId) {
            container = spriteset._pictureContainerLower;
        } else if (pictureId >= ppcParam.upperPictureId) {
            container = spriteset._pictureContainerUpper;
        } else {
            container = spriteset._pictureContainerMiddle;
        }

    // 標準時
    } else if (spriteset._pictureContainer) {
        // 元のコンテナを取得
        container = spriteset._pictureContainer;
    }

    // コンテナに戻す
    container.addChild(this);
    // コンテナ内のピクチャを番号でソート
    container.children.sort((a, b) => a._pictureId - b._pictureId);
}

// ----------------------------------------------------------------------------
// Game_Screen
// ----------------------------------------------------------------------------

/**
 * ●ピクチャの表示
 */
const _Game_Screen_showPicture = Game_Screen.prototype.showPicture;
Game_Screen.prototype.showPicture = function(
    pictureId, name, origin, x, y, scaleX, scaleY, opacity, blendMode
) {
    _Game_Screen_showPicture.apply(this, arguments);

    // 表示したピクチャを再取得
    const realPictureId = this.realPictureId(pictureId);
    const gamePicture = this._pictures[realPictureId];

    // Ｚ座標の初期値がある場合は設定
    if (pDefaultZ) {
        gamePicture.setZ(pDefaultZ);

        // Sprite_Pictureを取得
        const spriteset = getSpriteset();
        // Sprite_PictureにＺ座標を設定
        const spritePicture = spriteset.getPictureFromId(pictureId);
        if (spritePicture) {
            spritePicture.setZ(pDefaultZ);
        }
    }
};

/**
 * ●ピクチャの消去
 */
const _Game_Screen_erasePicture = Game_Screen.prototype.erasePicture;
Game_Screen.prototype.erasePicture = function(pictureId) {
    _Game_Screen_erasePicture.apply(this, arguments);

    const spriteset = getSpriteset();
    const picture = spriteset.getPictureFromId(pictureId);
    // ピクチャがＺ座標管理の対象だった場合
    if (picture && picture.z != null) {
        // ピクチャの親を元に戻す。
        picture.restoreContainer(spriteset);
    }
};

// ----------------------------------------------------------------------------
// Game_Player
// ----------------------------------------------------------------------------

/**
 * ●場所移動時
 */
const _Game_Player_performTransfer = Game_Player.prototype.performTransfer;
Game_Player.prototype.performTransfer = function() {
    // Ｚ座標を解除
    if (this.isTransferring() && pReleaseOnTransfer) {
        for (let i = 0; i < $gameScreen._pictures.length; i++) {
            const picture = $gameScreen._pictures[i];
            if (picture) {
                picture.setZ(pDefaultZ);
            }
        }
    }

    _Game_Player_performTransfer.apply(this, arguments);
};

// ----------------------------------------------------------------------------
// 共通関数
// ----------------------------------------------------------------------------

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
            array.push(eval(text));
        }
    }
    return array;
}

/**
 * ●現在の画面のSpritesetを取得する。
 */
function getSpriteset() {
    // 戦闘
    if ($gameParty.inBattle()) {
        return BattleManager._spriteset;
    // マップ
    } else {
        return SceneManager._scene._spriteset;
    }
}

/**
 * ●現在の画面でピクチャの親とする要素を取得する。
 */
function getPictureParent(spriteset) {
    // 戦闘
    // ※$gameParty.inBattle()がセットされるより
    // 　早く呼び出されることがあるので、こちらで判定を行う。
    if (spriteset._battleField) {
        return spriteset._battleField;
    // マップ
    } else {
        return spriteset._tilemap;
    }
}

})();
