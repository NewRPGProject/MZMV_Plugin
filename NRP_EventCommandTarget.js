﻿//=============================================================================
// NRP_EventCommandTarget.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.01 Change the target of the event command.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/482259070.html
 *
 * @help Change the target of an event command.
 * 
 * You can specify the target of the event command by variables or formulas.
 * If the target is 'this event',
 * the process is realized by rewriting the target.
 * 
 * This also allows you to execute commands to your followers
 * (fellow troop walkers) that would normally be impossible.
 * 
 * For example, the following commands can be used.
 * 
 * ・Set Movement Route
 * ・Set Event Location
 * ・Show Animation
 * ・Show Balloon Icon
 * 
 * It also provides the following functions for manipulating followers.
 * 
 * ・Disable automatic tracking of players.
 * ・Enable speed change for each follower.
 * 　※Normally fixed at the same speed as the player.
 * 
 * ■MZ Plugin Command
 * ◆ChangeTarget
 * Change the target characters of "This Event".
 * 
 * When executed, it will target the set character
 * when "This Event" is specified in subsequent event commands.
 * The effect is effective until the event page processing is finished.
 * 
 * The character is specified by the event ID.
 * -1 is a player, -2 or lower is a follower.
 * If it is blank, it will be unset.
 * 
 * ◆StopFollow
 * Followers will no longer track the player.
 * 
 * ■MV Plugin Command
 * ◆NRP.EventCommandTarget.ChangeTarget [対象ＩＤ]
 * Change the target characters of "This Event".
 * Specify the event ID as a number or formula.
 * -1 is a player, -2 or lower is a follower.
 * If it is blank, it will be unset.
 * 
 * ◆NRP.EventCommandTarget.StopFollow [true/false]
 * Followers will no longer track the player.
 * True (optional) to enable, false to disable.
 * 
 * ※It is not case sensitive. Do not include [].
 * 
 * ■Additional Functions for Followers
 * ◆this.chasePreceding()
 * Calling the above script in the movement route setting
 * will bring you closer to the previous character.
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 * 
 * @command ChangeTarget
 * @desc Change the character to be the target of "this event". If blank, cancel the setting.
 * 
 * @arg TargetId
 * @desc When "this event" is targeted in the called event, the event with the specified ID will be targeted.
 * @type combo
 * @option $gameVariables.value(1) #Variable number events
 * @option -1 #Player
 * @option -2 #Follower
 * @option this._eventId + 1
 * @option followerIdByActorId(1)
 * @option 0 #Set the release
 * 
 * 
 * @command StopFollow
 * @desc Followers will no longer track the player.
 * 
 * @arg Stop
 * @desc Stops tracking of followers.
 * Deactivates it when set to false.
 * @type boolean
 * @default true
 * 
 * 
 * @param TerminateStopFollow
 * @desc Automatically release the "StopFollow" function when the event processing is finished.
 * @type boolean
 * @default true
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.01 イベントコマンドの対象を変更する。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/482259070.html
 *
 * @help イベントコマンドの対象を変更します。
 * 
 * 変数や数式によって、イベントコマンドの対象を指定できます。
 * 対象が『このイベント』の場合、対象を書き換えることで処理を実現します。
 * 
 * これにより通常は不可能なフォロワー（隊列歩行の仲間）に対して、
 * 命令を実行することもできます。
 * 
 * 例えば、以下のコマンドが対象となります。
 * 
 * ・移動ルートの設定
 * ・イベントの位置設定
 * ・アニメーションの表示
 * ・フキダシアイコンの表示
 * 
 * また、フォロワーの操作に関して以下の機能を提供します。
 * 
 * ・プレイヤーを自動追尾する機能を停止可
 * ・フォロワー毎の速度変更を有効に
 * 　※通常はプレイヤーと同じ速度で固定
 * 
 * ■ＭＺ用プラグインコマンド
 * ◆対象キャラクターの変更
 * 『このイベント』の対象とするキャラクターを変更します。
 * 
 * 実行すると以降のイベントコマンドで『このイベント』を指定した際、
 * 設定したキャラクターを対象とするようにします。
 * 効果はイベントページの処理が終了するまで有効です。
 * 
 * キャラクターの指定はイベントＩＤで行います。
 * -1はプレイヤー、-2以下はフォロワーとなります。
 * 空白ならば設定解除します。
 * 
 * ◆隊列歩行の追尾を停止
 * 隊列歩行の仲間がプレイヤーを追尾しなくなります。
 * 
 * ■ＭＶ用プラグインコマンド
 * ◆NRP.EventCommandTarget.ChangeTarget [対象ＩＤ]
 * 『このイベント』の対象とするキャラクターを変更します。
 * イベントＩＤを数値や数式で指定してください。
 * -1はプレイヤー、-2以下はフォロワーとなります。
 * 空白ならば設定解除します。
 * 
 * ◆NRP.EventCommandTarget.StopFollow [true/false]
 * 隊列歩行の仲間がプレイヤーを追尾しなくなります。
 * true（省略可）で有効に、falseで解除します。
 * 
 * ※大文字／小文字は不問です。[]は含めないでください。
 * 
 * ■フォロワー用の追加関数
 * ◆this.chasePreceding()
 * 移動ルートの設定にて上記のスクリプトを呼び出すと、
 * 一つ前のキャラクターに向かって近づきます。
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @command ChangeTarget
 * @text 対象キャラクターの変更
 * @desc 『このイベント』の対象とするキャラクターを変更します。
 * 空白ならば設定解除します。
 * 
 * @arg TargetId
 * @text 対象ＩＤ
 * @desc 呼び出されたイベント内で『このイベント』を対象にした際、指定ＩＤのイベントを対象とします。
 * @type combo
 * @option $gameVariables.value(1) #変数番のイベント
 * @option -1 #プレイヤー
 * @option -2 #フォロワー
 * @option this._eventId + 1 #このイベント+1
 * @option followerIdByActorId(1) #アクターＩＤのフォロワー
 * @option 0 #設定解除
 * 
 * 
 * @command StopFollow
 * @text 隊列歩行の追尾を停止
 * @desc 隊列歩行の仲間がプレイヤーを追尾しなくなります。
 * 
 * @arg Stop
 * @text 追尾を停止
 * @desc 隊列歩行の追尾を停止します。
 * falseにすると解除します。
 * @type boolean
 * @default true
 * 
 * 
 * @param TerminateStopFollow
 * @text 処理終了時に追尾停止解除
 * @desc イベントの処理終了時に『隊列歩行の追尾を停止』機能を自動的に解除します。
 * @type boolean
 * @default true
 */
(function() {
"use strict";

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

const PLUGIN_NAME = "NRP_EventCommandTarget";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pTerminateStopFollow = toBoolean(parameters["TerminateStopFollow"], true);

/**
 * ●プラグインコマンドの値を取得する。
 */
 function getCommandValue(value) {
    if (value === undefined) {
        return value;
    }
    // #以降は注釈扱いなので除去
    // さらに前後の空白を除去する。
    return value.split("#")[0].trim();
}

//----------------------------------------
// 対象キャラクターの変更
//----------------------------------------

// MVには存在しないため、空で定義しておかないとエラーになる。
if (!PluginManager.registerCommand) {
    PluginManager.registerCommand = function() {}
}

/**
 * ●【ＭＺ用プラグインコマンド】対象キャラクターの変更
 */
PluginManager.registerCommand(PLUGIN_NAME, "ChangeTarget", function(args) {
    const targetId = eval(getCommandValue(args.TargetId));

    // this(Game_Interpreter)に値を設定
    if (targetId) {
        this._changeTargetId = targetId;
    // 設定解除
    } else {
        this._changeTargetId = null;
    }
});

/**
 * ●【ＭＶ用プラグインコマンド】対象キャラクターの変更
 */
const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);

    // 小文字化してから判定
    const lowerCommand = command.toLowerCase();
    
    // 対象キャラクターを変更
    if (lowerCommand === "nrp.eventcommandtarget.changetarget") {
        const targetId = eval(args[0]);

        // this(Game_Interpreter)に値を設定
        if (targetId) {
            this._changeTargetId = targetId;
        // 設定解除
        } else {
            this._changeTargetId = null;
        }
    }
};

/**
 * ●処理終了
 */
const _Game_Interpreter_terminate = Game_Interpreter.prototype.terminate;
Game_Interpreter.prototype.terminate = function() {
    _Game_Interpreter_terminate.apply(this, arguments);

    // クリア
    this._changeTargetId = null;

    // 処理終了時に追尾停止解除
    if (pTerminateStopFollow && this._stopFollow) {
        $gamePlayer.followers()._stopFollow = false;
        this._stopFollow = false;
    }

    // フォロワーの速度クリア
    for (const follower of $gamePlayer.followers().data()) {
        follower.setMoveSpeedSelf(null);
    }
};

/**
 * ●対象のキャラクター取得
 */
const _Game_Interpreter_character = Game_Interpreter.prototype.character;
Game_Interpreter.prototype.character = function(param) {
    // 値が未指定（このイベント）かつ指定のＩＤがある場合
    if (!param && this._changeTargetId) {
        param = this._changeTargetId;

        if ($gameParty.inBattle()) {
            return null;
        // イベントＩＤがマイナスの場合、フォロワーを取得
        } else if (param <= -2) {
            // -2 -> 0, -3 -> 1というように変換
            const n = Math.abs(param) - 2;
            return $gamePlayer.followers().follower(n);
        // プレイヤーを取得
        } else if (param == -1) {
            return $gamePlayer;
        } else if (this.isOnCurrentMap()) {
            return $gameMap.event(param > 0 ? param : this._eventId);
        }

        return null;
    }

    return _Game_Interpreter_character.call(this, param);
};

//----------------------------------------
// フォロワーの制御
//----------------------------------------

/**
 * 【ＭＺ用プラグインコマンド】隊列歩行の追尾を停止
 */
PluginManager.registerCommand(PLUGIN_NAME, "StopFollow", function(args) {
    const stop = toBoolean(args.Stop);
    $gamePlayer.followers()._stopFollow = stop;
    this._stopFollow = stop;
});

/**
 * ●【ＭＶ用プラグインコマンド】隊列歩行の追尾を停止
 */
const _Game_Interpreter_pluginCommand2 = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand2.call(this, command, args);

    // 小文字化してから判定
    const lowerCommand = command.toLowerCase();
    if (lowerCommand === "nrp.eventcommandtarget.stopfollow") {
        // falseの措定がある場合は解除
        if (toBoolean(args[0]) === false) {
            $gamePlayer.followers()._stopFollow = false;
            this._stopFollow = false;

        // それ以外はtrue
        } else {
            $gamePlayer.followers()._stopFollow = true;
            this._stopFollow = true;
        }
    }
};

/**
 * ●フォロワーの移動更新
 */
const _Game_Followers_updateMove = Game_Followers.prototype.updateMove;
Game_Followers.prototype.updateMove = function() {
    // 追尾停止
    if (this._stopFollow) {
        return;
    }

    _Game_Followers_updateMove.apply(this, arguments);
};

/**
 * ●フォロワーのジャンプ（プレイヤーの追尾）
 */
const _Game_Followers_jumpAll = Game_Followers.prototype.jumpAll;
Game_Followers.prototype.jumpAll = function() {
    // 追尾停止
    if (this._stopFollow) {
        return;
    }

    _Game_Followers_jumpAll.apply(this, arguments);
};

/**
 * ●移動ルートの設定
 * ※Game_Characterの関数をオーバライド
 */
const _Game_Follower_processMoveCommand = Game_Follower.prototype.processMoveCommand;
Game_Follower.prototype.processMoveCommand = function(command) {
    const gc = Game_Character;
    const params = command.parameters;
    switch (command.code) {
        case gc.ROUTE_CHANGE_SPEED:
            this.setMoveSpeedSelf(params[0]);
            this.setMoveSpeed(params[0]);
            return;
    }

    _Game_Follower_processMoveCommand.apply(this, arguments);
};

/**
 * 【独自】プレイヤーから独立した速度の設定
 */
Game_Follower.prototype.setMoveSpeedSelf = function(moveSpeed) {
    this._moveSpeedSelf = moveSpeed;
};

/**
 * ●速度の設定
 * ※Game_Characterの関数をオーバライド
 */
const _Game_Follower_setMoveSpeed = Game_Follower.prototype.setMoveSpeed;
Game_Follower.prototype.setMoveSpeed = function(moveSpeed) {
    if (this._moveSpeedSelf) {
        this._moveSpeed = this._moveSpeedSelf;
        return;
    }

    _Game_Follower_setMoveSpeed.apply(this, arguments);
};

//----------------------------------------
// ＭＶ対応
//----------------------------------------

/**
 * ●ＭＶには存在しない関数なので定義
 */
if (!Game_Followers.prototype.data) {
    Game_Followers.prototype.data = function() {
        return this._data.clone();
    };
}

//----------------------------------------
// 追加関数
//----------------------------------------

/**
 * 【独自】先行のキャラクターに向かって移動する。
 */
Game_Follower.prototype.chasePreceding = function() {
    // このキャラクターが何番目のフォロワーか？（０始まり）
    const index = $gamePlayer.followers().data().indexOf(this);

    // 先行のキャラを取得
    const precedingCharacter = index > 0 ? $gamePlayer.followers().follower(index - 1) : $gamePlayer;

    // 対象へ向かって移動
    this.moveTowardCharacter(precedingCharacter);

    // ※chaseCharacterという関数もあるけど斜め移動するのでうまくいかない。
    // this.chaseCharacter(precedingCharacter);
};

/**
 * ●アクターＩＤを元にフォロワーＩＤを取得
 * ※対象ＩＤのコンボボックスからeval参照
 */
function followerIdByActorId(actorId) {
    return ($gameParty.members().indexOf($gameActors.actor(actorId)) + 1) * -1;
}

})();
