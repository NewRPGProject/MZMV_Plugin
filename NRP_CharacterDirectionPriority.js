//=============================================================================
// NRP_CharacterDirectionPriority.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Accept direction changes, even if the direction is fixed.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/481360429.html
 *
 * @help Make it possible to accept direction change commands
 * for characters in fixed direction.
 * 
 * In RPG Maker MV and MZ, instructions to change the direction of a character
 * with a fixed direction from the movement route settings will be ignored.
 * However, this specification is not very reasonable.
 * If you don't intend to change the direction, you don't tell it to do so.
 * 
 * There is also a way to undo the direction fixation each time,
 * but it is not reasonable,
 * as it is time-consuming and error-prone.
 * 
 * Therefore, I will change the specification
 * to accept direction changes only at the time of instruction,
 * just like RPG Maker 2000.
 * 
 * The relevant process is as follows.
 * - Change the direction of the move route setting
 * - Change the direction when autonomous movement is custom.
 * - Change the direction when setting the position of an event.
 * 
 * ■Usage
 * You only need to apply the plugin.
 * There are no parameters.
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 キャラクターの向き固定時も向き変更を有効に
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/481360429.html
 *
 * @help 向き固定状態のキャラクターに対しても、
 * 向きの変更命令を受けつけるようにします。
 * 
 * ツクールＭＶ～ＭＺでは、向き固定状態のキャラクターに対して、
 * 移動ルートの設定から向き変更を指示しても、無視される仕様です。
 * しかしながら、この仕様はあまり合理的ではありません。
 * そもそも、向きを変更する意図がないなら指示などしないからです。
 * 
 * いちいち、向き固定を解除する方法もありますが、
 * 手間がかかる上にミスもしやすく、やはり合理的ではありません。
 * 
 * というわけで、ツクール2000などと同じように、
 * 命令時のみ、向き変更を受けつけるように仕様を変更します。
 * 
 * 該当の処理は以下の通りです。
 * ・移動ルートの設定の向き変更
 * ・自律移動がカスタムの際の向き変更
 * ・イベントの位置設定時の向き変更
 * 
 * ■使用方法
 * プラグインを適用するだけでＯＫです。
 * パラメータなどはありません。
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 */
(function() {
"use strict";

const PLUGIN_NAME = "NRP_CharacterDirectionPriority";
const parameters = PluginManager.parameters(PLUGIN_NAME);

/**
 * ●向き設定
 */
const _Game_CharacterBase_setDirection = Game_CharacterBase.prototype.setDirection;
Game_CharacterBase.prototype.setDirection = function(d) {
    // 向き変更強制フラグがオンなら変更
    if (this.isForceDirection() && d) {
        this._direction = d;
    }

    _Game_CharacterBase_setDirection.apply(this, arguments);
};
 
/**
 * 【独自】向き変更強制フラグを設定
 */
Game_CharacterBase.prototype.setForceDirection = function(flg) {
    this._forceDirection = flg;
};
 
/**
 * 【独自】向き変更強制フラグを取得
 */
Game_CharacterBase.prototype.isForceDirection = function() {
    return !!this._forceDirection;
};

/**
 * ●移動ルートの設定
 */
const _Game_Character_processMoveCommand = Game_Character.prototype.processMoveCommand;
Game_Character.prototype.processMoveCommand = function(command) {
    const gc = Game_Character;

    // 向き変更に該当する処理の場合、強制フラグを立てる。
    switch (command.code) {
        case gc.ROUTE_TURN_DOWN:
            this.setForceDirection(true);
            break;
        case gc.ROUTE_TURN_LEFT:
            this.setForceDirection(true);
            break;
        case gc.ROUTE_TURN_RIGHT:
            this.setForceDirection(true);
            break;
        case gc.ROUTE_TURN_UP:
            this.setForceDirection(true);
            break;
        case gc.ROUTE_TURN_90D_R:
            this.setForceDirection(true);
            break;
        case gc.ROUTE_TURN_90D_L:
            this.setForceDirection(true);
            break;
        case gc.ROUTE_TURN_180D:
            this.setForceDirection(true);
            break;
        case gc.ROUTE_TURN_90D_R_L:
            this.setForceDirection(true);
            break;
        case gc.ROUTE_TURN_RANDOM:
            this.setForceDirection(true);
            break;
        case gc.ROUTE_TURN_TOWARD:
            this.setForceDirection(true);
            break;
        case gc.ROUTE_TURN_AWAY:
            this.setForceDirection(true);
            break;
    }

    _Game_Character_processMoveCommand.apply(this, arguments);

    // 強制フラグを解除
    this.setForceDirection(false);
};

/**
 * ●イベントの位置設定
 */
const _Game_Interpreter_command203 = Game_Interpreter.prototype.command203;
Game_Interpreter.prototype.command203 = function(params) {
    const character = this.character(params[0]);
    if (character) {
        if (params[4] > 0) {
            character.setForceDirection(true);
        }
    }

    const ret = _Game_Interpreter_command203.apply(this, arguments);

    // 戻す
    if (character) {
        if (params[4] > 0) {
            character.setForceDirection(false);
        }
    }

    return ret;
};

})();
