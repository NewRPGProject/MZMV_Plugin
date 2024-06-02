//=============================================================================
// NRP_QuickMovementRoute.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.01 Immediately execute commands for Movement Route.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/484920665.html
 *
 * @help When "Set Movement Route" is called in the event command,
 * each command is designed to be executed every 1/60th of a second.
 * 
 * The problem caused by this specification is when
 * you want the action to be performed by changing the character image.
 * 
 * For example, let's say you want Pricia,
 * the default heroine of MZ, to perform a crouching action.
 * 
 * Priscia's image is the second one from the top left of "Actor1.png".
 * In contrast, her crouched image is the first left-facing image
 * from the top left of "Damage1.png".
 * 
 * If Priscia is facing down, the procedure to change it
 * by "Set Movement Route" is as follows.
 * 
 * 1. Change image: Specify the top left of Damage1.png.
 * 2. Turn to the left.
 * 
 * However, due to specifications,
 * there is a 1/60th of a second gap between the two actions.
 * Immediately after changing the image, it is still facing downward,
 * so "Damage1.png" will show the downward facing image (=Reid).
 * Even though the image will change
 * to Priscia momentarily right after,
 * it is still enough time for the player to feel uncomfortable.
 * 
 * That's why this plug-in eliminates the gaps between commands
 * when "Set Movement Route" is used.
 * In addition to changing the image and direction,
 * it also has effects on transparency,
 * turning switches on and off, etc.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Just apply it.
 * 
 * Note that, by default, it is not applied to routes
 * when the move type is custom.
 * ※This can be changed in the plugin parameters.
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
 * @param MaxImmediate
 * @type number
 * @default 5
 * @desc The maximum number of simultaneous immediate operations.
 * 
 * @param ApplyMoveTypeCustom
 * @type boolean
 * @default false
 * @desc This also applies when the autonomous movement type is custom.
 * But only if the movement frequency is maximum.
 * 
 * @param ChangeImageResetPattern
 * @type boolean
 * @default false
 * @desc To initialize the pattern when the image is changed.
 * Prevent flickering immediately after moving.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.01 移動ルートの設定用コマンド（画像の変更など）を即時実行。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/484920665.html
 *
 * @help イベントコマンドで『移動ルートの設定』を呼び出した場合、
 * 各コマンドは1/60秒毎に実行される仕様になっています。
 * 
 * この仕様によって困るのは、
 * キャラクター画像の変更によってアクションをさせたい場合です。
 * 
 * 例えば、ＭＺのデフォルトヒロインであるプリシアに対して、
 * しゃがむアクションをさせたいとします。
 * 
 * プリシアの画像はActor1.pngの左上から二番目です。
 * 対して、しゃがんだ画像はというと、
 * Damage1.pngの左上から一番目の左向き画像となっています。
 * 
 * プリシアが下向きだったとすると、
 * 『移動ルートの設定』によって変更する手順は以下の通りになります。
 * 
 * １．画像の変更：Damage1.pngの左上を指定
 * ２．左を向く
 * 
 * ところが、仕様により二つの動作の間には1/60秒の隙間が生じます。
 * 画像を変更した直後はまだ下向きなので、
 * Damage1.pngでは下向きの画像（＝リード）が表示されてしまいます。
 * 直後に一瞬でプリシアに変化するとはいえ、
 * プレイヤーが違和感を持つには十分な時間です。
 * 
 * そんなわけで、移動ルートの設定時に
 * コマンド間の隙間をなくすのがこのプラグインです。
 * 画像の変更や向きの変更以外にも、
 * 透明化やスイッチのON/OFFなど全般に効果があります。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * 適用するだけでＯＫです。
 * 
 * なお、初期状態では自律移動タイプが
 * カスタムの場合のルートには適用されません。
 * ※プラグインパラメータで変更可能です。
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
 * @param MaxImmediate
 * @text 最大同時処理数
 * @type number
 * @default 5
 * @desc 即時処理を同時に行う最大数です。
 * 
 * @param ApplyMoveTypeCustom
 * @text 自律移動カスタムに適用
 * @type boolean
 * @default false
 * @desc 自律移動タイプがカスタムの場合にも処理を適用します。
 * ただし、移動頻度が最大の場合が条件です。
 * 
 * @param ChangeImageResetPattern
 * @text 画像変更でパターン初期化
 * @type boolean
 * @default false
 * @desc 画像の変更時にパターンを初期化するようにします。
 * 移動直後に画像変更した際のチラ見え防止に。
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

const PLUGIN_NAME = "NRP_QuickMovementRoute";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pMaxImmediate = toNumber(parameters["MaxImmediate"]);
const pApplyMoveTypeCustom = toBoolean(parameters["ApplyMoveTypeCustom"]);
const pChangeImageResetPattern = toBoolean(parameters["ChangeImageResetPattern"]);

// 自律移動カスタム用の除外判定フラグ
let mExceptSoon = false;

/**
 * ●移動ルートの設定の更新
 */
const _Game_Character_updateRoutineMove = Game_Character.prototype.updateRoutineMove;
Game_Character.prototype.updateRoutineMove = function() {
    // ウェイト中および自律移動カスタムの場合は対象外
    if (this._waitCount > 0 || mExceptSoon) {
        // 元の処理を呼び出して終了
        _Game_Character_updateRoutineMove.apply(this, arguments);
        return;
    }

    // 元の処理でmoveRouteIndexが+1になるため先に取得
    let command = this._moveRoute.list[this._moveRouteIndex];

    // 元の処理
    _Game_Character_updateRoutineMove.apply(this, arguments);

    // 実行したコマンドが即時対象である限り、指定回数までループ実行
    for (let i = 0; i < pMaxImmediate; i++) {
        // 即時実行対象ならば
        if (command && isSoonTarget(command) && this._moveRoute) {
            // 次のコマンドを取得し実行する。
            command = this._moveRoute.list[this._moveRouteIndex];
            if (command) {
                // 即座に処理を実行
                this.processMoveCommand(command);
                // moveRouteIndexを加算
                this.advanceMoveRouteIndex();
                // indexが有効な場合は続行
                if (this._moveRouteIndex > 0) {
                    continue;
                }
            }
        }
        // それ以外は終了
        return;
    }
};

/**
 * ●自律移動カスタムの場合
 */
const _Game_Event_moveTypeCustom = Game_Event.prototype.moveTypeCustom;
Game_Event.prototype.moveTypeCustom = function() {
    // 自律移動も対象かつ移動頻度が5の場合
    if (pApplyMoveTypeCustom && this._moveFrequency == 5) {
        // 処理を実行する。
        _Game_Event_moveTypeCustom.apply(this, arguments);
        return;
    }

    // 処理を対象外にして実行。
    mExceptSoon = true;
    _Game_Event_moveTypeCustom.apply(this, arguments);
    mExceptSoon = false;
};

/**
 * ●即時実行を行うかどうかの判定
 */
function isSoonTarget(command) {
    const gc = Game_Character;

    // 移動系、ウェイト、スクリプト以外が対象
    switch (command.code) {
        case gc.ROUTE_TURN_DOWN:
        case gc.ROUTE_TURN_LEFT:
        case gc.ROUTE_TURN_RIGHT:
        case gc.ROUTE_TURN_UP:
        case gc.ROUTE_TURN_90D_R:
        case gc.ROUTE_TURN_90D_L:
        case gc.ROUTE_TURN_180D:
        case gc.ROUTE_TURN_90D_R_L:
        case gc.ROUTE_TURN_RANDOM:
        case gc.ROUTE_TURN_TOWARD:
        case gc.ROUTE_TURN_AWAY:
        case gc.ROUTE_SWITCH_ON:
        case gc.ROUTE_SWITCH_OFF:
        case gc.ROUTE_CHANGE_SPEED:
        case gc.ROUTE_CHANGE_FREQ:
        case gc.ROUTE_WALK_ANIME_ON:
        case gc.ROUTE_WALK_ANIME_OFF:
        case gc.ROUTE_STEP_ANIME_ON:
        case gc.ROUTE_STEP_ANIME_OFF:
        case gc.ROUTE_DIR_FIX_ON:
        case gc.ROUTE_DIR_FIX_OFF:
        case gc.ROUTE_THROUGH_ON:
        case gc.ROUTE_THROUGH_OFF:
        case gc.ROUTE_TRANSPARENT_ON:
        case gc.ROUTE_TRANSPARENT_OFF:
        case gc.ROUTE_CHANGE_IMAGE:
        case gc.ROUTE_CHANGE_OPACITY:
        case gc.ROUTE_CHANGE_BLEND_MODE:
        case gc.ROUTE_PLAY_SE:
            return true;
    }
};

// 画像変更でパターン初期化
if (pChangeImageResetPattern) {
    /**
     * ●画像の変更
     */
    const _Game_CharacterBase_setImage = Game_CharacterBase.prototype.setImage;
    Game_CharacterBase.prototype.setImage = function(characterName, characterIndex) {
        _Game_CharacterBase_setImage.apply(this, arguments);
        // 移動中ではない。
        if (this.isStopping()) {
            // パターン初期化
            this.resetPattern();
            this._animationCount = 0;
        }
    };
}

})();
