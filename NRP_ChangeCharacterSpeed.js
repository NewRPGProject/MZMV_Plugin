//=============================================================================
// NRP_ChangeCharacterSpeed.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.03 Change the character's movement speed in detail.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/481254085.html
 *
 * @help Change the character's movement speed in detail.
 * This includes players, events, and various vehicles.
 * 
 * [Main Features]
 * - Allows you to set speeds that cannot be specified normally.
 * 　Speeds in the middle or beyond the limit, for example.
 * - Set from plugin command or notes field.
 * - Can change the default value of Always Dash to On.
 * - Set the initial speed of the player and vehicles.
 * - Can change the speed when dashing.
 * - Can change the speed of stepping.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Set each speed from the plugin parameters.
 * The initial value of the movement speed will be changed.
 * 
 * However, if you change the value of <BasicSpeed>,
 * a multiplier will be applied to all movement speeds.
 * Please use the method that is most convenient for you.
 * 
 * The speed value should refer to the move speed of the event.
 * 
 * ・1: x8 Slower
 * ・2: x4 Slower
 * ・3: x2 Slower
 * ・4: Normal
 * ・5: x2 Faster
 * ・6: x4 Faster
 * 
 * Values outside of this range can also be set.
 * Each increase of 1 in the value doubles the speed,
 * and each decrease of 1 halves the speed.
 * Decimals and negative values are also valid.
 * 
 * For example, 3.5 is the speed between normal and x2 Slower.
 * 0 is x16 Slower and -1 is x32 Slower.
 * 
 * However, the maximum speed is "8:x16 Faster".
 * ※If the speed is faster than this, it will move 2 grids
 *   in an instant and will not be able to stop at the specified grid.
 * 
 * -------------------------------------------------------------------
 * [Setting Notes]
 * -------------------------------------------------------------------
 * The following can be specified as events note.
 * 
 * <MoveSpeed:3.5>
 * Set the event speed to 3.5.
 * 
 * -------------------------------------------------------------------
 * [Plugin commands for MZ]
 * -------------------------------------------------------------------
 * Specify the target and speed using "ChangeSpeed".
 * You can target a player or each events.
 * You can target multiple events at the same time.
 * 
 * For example, if the target is "1,2,3",
 * you can specify them one by one,
 * and if the target is "1~5", you can specify them all at once.
 * There is an example in the combo box, so please use it.
 *
 * -------------------------------------------------------------------
 * [Plugin commands for MV]
 * -------------------------------------------------------------------
 * > nrp.changecharacterspeed.speed 3.5
 * 
 * Change the speed of the target to 3.5.
 * If this is all you do, the target will be "this event".
 * If you want to specify the target,
 * set the following options in front of it.
 * 
 * > nrp.changecharacterspeed.target 1
 * 
 * Event ID=1 is the target of the speed change.
 * If 0, it is this event; if -1, it is the player.
 * In addition, you can specify multiple events.
 * "1,2,3" specifies one by one, and "1~5" specifies all at once.
 * 
 * ◆Example
 * nrp.changecharacterspeed.target 1~10
 * nrp.changecharacterspeed.speed 3.5
 * 
 * Change the speed of events with event IDs from 1 to 10 to 3.5.
 * 
 * To change the step speed, do the following.
 * 
 * > nrp.changecharacterspeed.stepspeed 3.5
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
 * @ Plugin Commands
 * @-----------------------------------------------------
 * 
 * @command ChangeSpeed
 * @desc Changes the character's speed.
 * 
 * @arg Target
 * @desc Specify the target to change the movement speed.
 * You can specify multiple targets.
 * @type combo
 * @default 0 #This Event
 * @option 0 #This Event
 * @option -1 #Player
 * @option 1,2,3 #Multiple
 * @option 1~3 #Range
 * @option this._eventId + 1 #EventID+1
 * 
 * @arg Speed
 * @desc The movement speed to be changed. 4 is the normal speed.
 * @type number
 * @decimals 3 @min -99
 * @default 4
 * 
 * @-----------------------------------------------------
 * 
 * @command ChangeStepSpeed
 * @desc Changes the character's step speed.
 * If Speed is blank, then cancel the setting.
 * 
 * @arg Target
 * @desc Specify the target to change the step speed.
 * You can specify multiple targets.
 * @type combo
 * @default 0 #This Event
 * @option 0 #This Event
 * @option -1 #Player
 * @option 1,2,3 #Multiple
 * @option 1~3 #Range
 * @option this._eventId + 1 #EventID+1
 * 
 * @arg Speed
 * @desc The step speed to be changed. 4 is the normal.
 * If it is blank, then cancel the setting.
 * 
 * @type number
 * @decimals 3 @min -99
 * @default 4
 * 
 * @-----------------------------------------------------
 * @ Plugin Parameters
 * @-----------------------------------------------------
 * 
 * @param DefaultAlwaysDash
 * @desc Turn on the default value for Always On Dash in Options.
 * @type boolean
 * 
 * @param PlayerSpeed
 * @desc The movement speed of the player when walking. The initial value is 4.
 * @type number
 * @decimals 3 @min -99
 * 
 * @param PlusSpeedDash
 * @desc The speed that the player adds when dashing. The default value is 1. If 0, disable dash.
 * @type number
 * @decimals 3 @min -99
 * 
 * @param UseStepSpeed
 * @desc Enable the ability to change the step speed.
 * Turn off if it conflicts with other plugins.
 * @type boolean
 * @default true
 * 
 * @param <BasicSpeedRate>
 * 
 * @param PlayerBasicSpeedRate
 * @desc Changes the player's base speed to 100 as standard.
 * This changes the overall speed.
 * @type number
 * @default 100
 * 
 * @param EventBasicSpeedRate
 * @desc Changes the basic speed of the events to 100 as standard.
 * This changes the overall speed.
 * @type number
 * @default 100
 * 
 * @param <Vehicles>
 * 
 * @param BoatSpeed
 * @desc The boat's movement speed. The initial value is 4.
 * @type number
 * @decimals 3 @min -99
 * 
 * @param ShipSpeed
 * @desc The ship's movement speed. The initial value is 5.
 * @type number
 * @decimals 3 @min -99
 * 
 * @param AirShipSpeed
 * @desc The airship's movement speed. The default value is 6.
 * @type number
 * @decimals 3 @min -99
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.03 キャラクターの移動速度を細かく変更します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/481254085.html
 *
 * @help キャラクターの移動速度を細かく変更できます。
 * プレイヤー、イベント、各種乗り物が対象です。
 * 
 * ■主な機能
 * ・通常では指定できない速度を設定可能。
 * 　中間の速度や限界を超えた速度など。
 * ・プラグインコマンドやメモ欄から設定。
 * ・常時ダッシュの初期値をオンに変更可能。
 * ・プレイヤーや乗り物の初期速度を設定。
 * ・ダッシュ時の速度を変更可能。
 * ・足踏みの速度を変更可能。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * プラグインパラメータより各速度を設定してください。
 * 移動速度の初期値が変更されます。
 * 
 * ただし、＜基本速度＞の値を変更した場合は、
 * 全ての移動速度に対して倍率がかかります。
 * 使いやすい方法をご利用ください。
 * 
 * 速度の値はイベントの移動速度を参考にしてください。
 * 
 * ・1: 1/8倍速
 * ・2: 1/4倍速
 * ・3: 1/2倍速
 * ・4: 標準速
 * ・5: 2倍速
 * ・6: 4倍速
 * 
 * ここから外れた値も設定可能です。
 * 数値を１増やす毎に速度が２倍、１減らす毎に速度が半減します。
 * 小数やマイナス値も有効です。
 * 
 * 例えば、3.5は標準速と1/2倍速の中間の速さになります。
 * 0は1/16倍速、-1は1/32倍速になります。
 * 
 * ただし、速さは『8: 16倍速』が限度です。
 * ※これより速いと一瞬で２マス移動してしまい、指定のマスに止まれないため。
 * 
 * -------------------------------------------------------------------
 * ■メモ欄の指定
 * -------------------------------------------------------------------
 * 以下をイベントのメモ欄に指定できます。
 * 
 * <MoveSpeed:3.5>
 * イベントの速度を3.5にします。
 * 
 * <StepSpeed:5>
 * 足踏みの速度を5にします。
 * 
 * -------------------------------------------------------------------
 * ■ＭＺ用プラグインコマンド
 * -------------------------------------------------------------------
 * 『速度の変更』により対象と速度を指定してください。
 * プレイヤーや各イベントを対象にできます。
 * 同時に複数のイベントを対象とすることも可能です。
 * 
 * 例えば、対象を"1,2,3"とすると一つずつ指定できます。
 * また、"1~5"で一括指定となります。
 * ※コンボボックスに例があるのでご利用ください。
 * 
 * 『足踏み速度の変更』も同様です。
 * 
 * -------------------------------------------------------------------
 * ■ＭＶ用プラグインコマンド
 * -------------------------------------------------------------------
 * > nrp.changecharacterspeed.speed 3.5
 * 
 * 速度を3.5に変更します。
 * これだけだと対象は『このイベント』になります。
 * 対象を指定したい場合は、以下のオプションを事前に設定します。
 * 
 * > nrp.changecharacterspeed.target 1
 * 
 * イベントID=1を速度変更の対象とします。
 * 0ならばこのイベント、-1ならばプレイヤーです。
 * さらに複数指定も可能です。
 * "1,2,3"で一つずつ指定。"1~5"で一括指定となります。
 * 
 * ◆例
 * nrp.changecharacterspeed.target 1~10
 * nrp.changecharacterspeed.speed 3.5
 * 
 * イベントＩＤが1～10までのイベントの速度を3.5に変更します。
 * 
 * 足踏み速度を変更する場合は以下のようになります。
 * 
 * > nrp.changecharacterspeed.stepspeed 3.5
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
 * @command ChangeSpeed
 * @text 速度の変更
 * @desc キャラクターの速度を変更します。
 * 
 * @arg Target
 * @text 対象
 * @desc 移動速度を変更する対象を指定します。
 * 複数指定も可能です。
 * @type combo
 * @default 0 #このイベント
 * @option 0 #このイベント
 * @option -1 #プレイヤー
 * @option 1,2,3 #複数指定
 * @option 1~3 #範囲指定
 * @option this._eventId + 1 #イベントID+1
 * 
 * @arg Speed
 * @text 移動速度
 * @desc 変更する移動速度です。4が標準速になります。
 * 小数やマイナスも指定可能です。
 * @type number
 * @decimals 3 @min -99
 * @default 4
 * 
 * @-----------------------------------------------------
 * 
 * @command ChangeStepSpeed
 * @text 足踏み速度の変更
 * @desc キャラクターの足踏み速度を変更します。
 * 速度が空欄なら設定を解除します。
 * 
 * @arg Target
 * @text 対象
 * @desc 足踏み速度を変更する対象を指定します。
 * 複数指定も可能です。
 * @type combo
 * @default 0 #このイベント
 * @option 0 #このイベント
 * @option -1 #プレイヤー
 * @option 1,2,3 #複数指定
 * @option 1~3 #範囲指定
 * @option this._eventId + 1 #イベントID+1
 * 
 * @arg Speed
 * @text 足踏み速度
 * @desc 変更する足踏み速度です。4が標準速になります。
 * 空欄なら設定を解除します。
 * @type number
 * @decimals 3 @min -99
 * @default 4
 * 
 * @-----------------------------------------------------
 * @ プラグインパラメータ
 * @-----------------------------------------------------
 * 
 * @param DefaultAlwaysDash
 * @text 常時ダッシュの初期値
 * @desc オプション画面にある常時ダッシュの初期値をオンにします。
 * @type boolean
 * 
 * @param PlayerSpeed
 * @text プレイヤーの移動速度
 * @desc プレイヤーの歩行時の移動速度です。初期値は4です。
 * 小数も指定可能です。
 * @type number
 * @decimals 3 @min -99
 * 
 * @param PlusSpeedDash
 * @text ダッシュ時の加算速度
 * @desc プレイヤーがダッシュ時に加算される速度です。初期値は1です。
 * 小数も指定可能です。0ならダッシュ無効化。
 * @type number
 * @decimals 3 @min -99
 * 
 * @param UseStepSpeed
 * @text 足踏速度の変更を許可
 * @desc 足踏み速度の変更機能を有効にします。
 * 他プラグインと競合する場合はオフに。
 * @type boolean
 * @default true
 * 
 * @param <BasicSpeedRate>
 * @text ＜基本速度＞
 * 
 * @param PlayerBasicSpeedRate
 * @parent <BasicSpeedRate>
 * @text プレイヤーの基本速度％
 * @desc プレイヤーの基本速度を100を標準として変更します。
 * こちらは全体の速度を変更します。
 * @type number
 * @default 100
 * 
 * @param EventBasicSpeedRate
 * @parent <BasicSpeedRate>
 * @text イベントの基本速度％
 * @desc イベントの基本速度を100を標準として変更します。
 * こちらは全体の速度を変更します。
 * @type number
 * @default 100
 * 
 * @param <Vehicles>
 * @text ＜乗り物＞
 * 
 * @param BoatSpeed
 * @parent <Vehicles>
 * @text 小型船の移動速度
 * @desc 小型船の移動速度です。初期値は4です。
 * 小数も指定可能です。
 * @type number
 * @decimals 3 @min -99
 * 
 * @param ShipSpeed
 * @parent <Vehicles>
 * @text 大型船の移動速度
 * @desc 大型船の移動速度です。初期値は5です。
 * 小数も指定可能です。
 * @type number
 * @decimals 3 @min -99
 * 
 * @param AirShipSpeed
 * @parent <Vehicles>
 * @text 飛行船の移動速度
 * @desc 飛行船の移動速度です。初期値は6です。
 * 小数も指定可能です。
 * @type number
 * @decimals 3 @min -99
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
    if (str == undefined || str == "") {
        return def;
    }
    return isNaN(str) ? def : +(str || def);
}
function setDefault(str, def) {
    return str ? str : def;
}

const PLUGIN_NAME = "NRP_ChangeCharacterSpeed";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pDefaultAlwaysDash = toBoolean(parameters["DefaultAlwaysDash"]);
const pPlayerSpeed = toNumber(parameters["PlayerSpeed"]);
const pPlusSpeedDash = toNumber(parameters["PlusSpeedDash"]);
const pUseStepSpeed = toBoolean(parameters["UseStepSpeed"], true);
const pPlayerBasicSpeedRate = toNumber(parameters["PlayerBasicSpeedRate"]);
const pEventBasicSpeedRate = toNumber(parameters["EventBasicSpeedRate"]);
const pBoatSpeed = toNumber(parameters["BoatSpeed"]);
const pShipSpeed = toNumber(parameters["ShipSpeed"]);
const pAirShipSpeed = toNumber(parameters["AirShipSpeed"]);

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

/**
 * ●引数を元に対象の配列を取得する。
 * ※bindによってinterpreterをthisに渡して用いる。
 */
function makeTargets(targetId) {
    const targets = [];
    // カンマ区切りでループ
    for (let id of targetId.split(",")) {
        // 空白除去
        id = id.trim();
        // 1~5というように範囲指定の場合
        // ※~が存在する。
        if (id.indexOf("~") >= 0) {
            const idRange = id.split("~");
            const idRangeStart = eval(idRange[0]);
            const idRangeEnd = eval(idRange[1]);

            // IDの指定範囲で実行
            // 開始のほうが終了より大きい場合は反対に実行
            if (idRangeEnd < idRangeStart) {
                for (let i = idRangeStart; i >= idRangeEnd; i--) {
                    const evalId = eval(i);
                    if (this.character(evalId)) {
                        targets.push(this.character(evalId));
                    }
                }
            } else {
                for (let i = idRangeStart; i <= idRangeEnd; i++) {
                    const evalId = eval(i);
                    if (this.character(evalId)) {
                        targets.push(this.character(evalId));
                    }
                }
            }
            
        // 通常時
        } else {
            const evalId = eval(id);
            if (this.character(evalId)) {
                targets.push(this.character(evalId));
            }
        }
    }
    return targets;
}

//----------------------------------------
// ＭＺ用プラグインコマンド
//----------------------------------------

// MVには存在しないため、空で定義しておかないとエラーになる。
if (!PluginManager.registerCommand) {
    PluginManager.registerCommand = function() {}
}

/**
 * ●移動速度の変更
 */
PluginManager.registerCommand(PLUGIN_NAME, "ChangeSpeed", function(args) {
    const targetId = setDefault(getCommandValue(args.Target), "0");
    const speed = toNumber(getCommandValue(args.Speed), 4);

    // 対象を生成
    // ※bindによってthisをメソッドに渡す。
    const targets = makeTargets.bind(this)(targetId);
    // 対象が取得できなければ処理しない。
    if (targets.length == 0) {
        return;
    }

    // 速度変更
    for (const target of targets) {
        target.setMoveSpeed(speed);
    }
});

/**
 * ●足踏み速度の変更
 */
PluginManager.registerCommand(PLUGIN_NAME, "ChangeStepSpeed", function(args) {
    const targetId = setDefault(getCommandValue(args.Target), "0");
    const speed = toNumber(getCommandValue(args.Speed));

    // 対象を生成
    // ※bindによってthisをメソッドに渡す。
    const targets = makeTargets.bind(this)(targetId);
    // 対象が取得できなければ処理しない。
    if (targets.length == 0) {
        return;
    }

    // 速度変更
    for (const target of targets) {
        target._stepSpeed = speed;
    }
});

//----------------------------------------
// ＭＶ用のプラグインコマンド
//----------------------------------------

// 旧ＭＶプラグインコマンド用
let plTarget;

/**
 * ●ＭＶ用の旧式プラグインコマンド
 */
const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);

    // 小文字化してから判定
    const lowerCommand = command.toLowerCase();
    
    // 速度を変更
    if (lowerCommand === "nrp.changecharacterspeed.speed") {
        const speed = toNumber(args[0], 4);
        const targetId = setDefault(plTarget, "0");

        // 設定したらクリア
        plTarget = undefined;

        // 対象を生成
        // ※bindによってthisをメソッドに渡す。
        const targets = makeTargets.bind(this)(targetId);
        // 対象が取得できなければ処理しない。
        if (targets.length == 0) {
            return;
        }

        // 速度変更
        for (const target of targets) {
            target.setMoveSpeed(speed);
        }

    // 足踏み速度を変更
    } else if (lowerCommand === "nrp.changecharacterspeed.stepspeed") {
        const speed = toNumber(args[0]);
        const targetId = setDefault(plTarget, "0");

        // 設定したらクリア
        plTarget = undefined;

        // 対象を生成
        // ※bindによってthisをメソッドに渡す。
        const targets = makeTargets.bind(this)(targetId);
        // 対象が取得できなければ処理しない。
        if (targets.length == 0) {
            return;
        }

        // 速度変更
        for (const target of targets) {
            target._stepSpeed = speed;
        }

    // 対象の設定
    } else if (lowerCommand === "nrp.changecharacterspeed.target") {
        // 引数が空白で区切られていた時のため連結しておく。
        plTarget = getCommandValue(String(args.join(" ")));
    }
};

/**
 * ●ページ設定開始
 */
const _Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
    _Game_Event_setupPageSettings.apply(this, arguments);

    // 速度の設定があれば反映
    const speed = this.event().meta.MoveSpeed;
    if (speed != null) {
        this.setMoveSpeed(toNumber(speed));
    }

    // 足踏み速度の設定があれば反映
    if (pUseStepSpeed) {
        const stepSpeed = this.event().meta.StepSpeed;
        if (stepSpeed != null) {
            this._stepSpeed = toNumber(stepSpeed);
        }
    }
};

/**
 * ●乗り物の速度初期化
 */
const _Game_Vehicle_initMoveSpeed = Game_Vehicle.prototype.initMoveSpeed;
Game_Vehicle.prototype.initMoveSpeed = function() {
    // 小型船
    if (this.isBoat() && pBoatSpeed != null) {
        this.setMoveSpeed(pBoatSpeed);
        return;

    // 大型船
    } else if (this.isShip() && pShipSpeed != null) {
        this.setMoveSpeed(pShipSpeed);
        return;

    // 飛行船
    } else if (this.isAirship() && pAirShipSpeed != null) {
        this.setMoveSpeed(pAirShipSpeed);
        return;
    }

    // 該当の設定がない場合はデフォルト
    _Game_Vehicle_initMoveSpeed.apply(this, arguments);
};

/**
 * ●プレイヤーの速度が設定されている場合
 */
if (pPlayerSpeed) {
    /**
     * ●プレイヤーの速度初期値を設定
     */
    const _Game_Player_initMembers = Game_Player.prototype.initMembers;
    Game_Player.prototype.initMembers = function() {
        _Game_Player_initMembers.apply(this, arguments);
    
        this._moveSpeed = pPlayerSpeed;
    };

    /**
     * ●乗り物を降りる
     */
    const _Game_Player_getOffVehicle = Game_Player.prototype.getOffVehicle;
    Game_Player.prototype.getOffVehicle = function() {
        const ret = _Game_Player_getOffVehicle.apply(this, arguments);

        // 速度を設定値へ戻す。
        if (ret) {
            this.setMoveSpeed(pPlayerSpeed);
        }

        return ret;
    };
}

/**
 * ●ダッシュ時の加算速度が設定されている場合
 */
if (pPlusSpeedDash !== undefined) {
    /**
     * ●ダッシュを考慮した実移動速度の取得
     */
    Game_CharacterBase.prototype.realMoveSpeed = function() {
        return this._moveSpeed + (this.isDashing() ? pPlusSpeedDash : 0);
    };
}

// プレイヤーの基本速度変更
if (pPlayerBasicSpeedRate && pPlayerBasicSpeedRate != 100) {
    Game_Player.prototype.distancePerFrame = function() {
        const ret = Game_CharacterBase.prototype.distancePerFrame.apply(this, arguments);

        return ret * pPlayerBasicSpeedRate / 100;
    };

    // 仲間も合わせて変更
    Game_Follower.prototype.distancePerFrame = function() {
        const ret = Game_CharacterBase.prototype.distancePerFrame.apply(this, arguments);

        return ret * pPlayerBasicSpeedRate / 100;
    };
}

// イベントの基本速度変更
if (pEventBasicSpeedRate && pEventBasicSpeedRate != 100) {
    Game_Event.prototype.distancePerFrame = function() {
        const ret = Game_CharacterBase.prototype.distancePerFrame.apply(this, arguments);

        return ret * pEventBasicSpeedRate / 100;
    };
}

/**
 * ●常時ダッシュの初期値
 */
if (pDefaultAlwaysDash) {
    ConfigManager.alwaysDash = true;

    const _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        _ConfigManager_applyData.apply(this, arguments);
        this.alwaysDash = this.readFlag(config, "alwaysDash", true);
    };

    // MV対応
    // ※ＭＶはreadFlagの挙動が異なるのでＭＺに合わせる
    if (Utils.RPGMAKER_NAME == "MV") {
        ConfigManager.readFlag = function(config, name, defaultValue) {
            if (name in config) {
                return !!config[name];
            } else {
                return defaultValue;
            }
        };
    }
}

/**
 * ●足踏みウェイト
 */
const _Game_CharacterBase_animationWait = Game_CharacterBase.prototype.animationWait;
Game_CharacterBase.prototype.animationWait = function() {
    // 足踏み速度の指定がある場合
    if (pUseStepSpeed && this._stepSpeed != null) {
        return (9 - this._stepSpeed) * 3;
    }
    return _Game_CharacterBase_animationWait.apply(this, arguments);
};

})();
