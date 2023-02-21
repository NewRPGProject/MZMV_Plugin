//=============================================================================
// NRP_DamageTiming.js
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc v1.051 Adjusts the timing of damage display and enemy defeats.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/475196493.html
 *
 * @help Adjusts the timing of damage display and enemy defeats.
 * When used in conjunction with SimpleMsgSideView,
 * it is possible to display damage at the same time.
 * - If the message is displayed, various things will go wrong.
 * - The ability to show damage at the same time
 *   is a problem that can easily conflict.
 * 　Comparatively, we recommend placing it at the top.
 * 
 * For more information, please see below.
 * http://newrpg.seesaa.net/article/475196493.html
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but we will respond to defects as far as possible.
 * 
 * @param <Damage Same Time>
 * 
 * @param damageSameTime
 * @parent <Damage Same Time>
 * @type boolean
 * @default true
 * @desc Enables damage to be displayed at the same time.
 * It is recommended to use it with SimpleMsgSideView.
 * 
 * @param sameTimeCondition
 * @parent <Damage Same Time>
 * @type string[]
 * @default ["methodName.startsWith(\"popup\")","methodName == \"performDamage\"","methodName == \"performRecovery\"","methodName == \"performMiss\"","methodName == \"performEvasion\"","methodName == \"performMagicEvasion\"","methodName == \"performCollapse\""]
 * @desc If the condition is met, the damage is displayed at the same time.
 * Basically, no changes are needed.
 * 
 * @param <Damage Wait>
 * 
 * @param damageInterval
 * @parent <Damage Wait>
 * @type number
 * @default 16
 * @desc The interval between the damage (including recovery and misses).
 * The damage will be displayed at this interval if you hit continuously.
 * 
 * @param damageWait
 * @parent <Damage Wait>
 * @type number @min 1
 * @default 16
 * @desc It's a wait after damage (including recovery and misses).
 * This will be the wait for the last hit.
 * 
 * @param normalWait
 * @parent <Damage Wait>
 * @type number
 * @desc The wait time used to display messages, etc.
 * It works even if the message is hidden. (default: 16)
 * 
 * @param stateWaitFlg
 * @parent <Damage Wait>
 * @type boolean
 * @default false
 * @desc Apply the same wait as damage to the state.
 * Buffs and debuffs are included in the list.
 * 
 * @param <Enemy Collapse>
 * 
 * @param collapseWaitType
 * @parent <Enemy Collapse>
 * @type select
 * @option Wait(MV standard) @value
 * @option No Wait @value off
 * @option Wait Boss Only @value boss
 * @default boss
 * @desc Set the wait method when the enemy is defeated.
 */
/*:ja
 * @target MV MZ
 * @plugindesc v1.051 ダメージ表示や敵の撃破処理のタイミングを調整します。
 * @author 砂川赳 (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/475196493.html
 * 
 * @help ダメージ表示や敵の撃破処理のタイミングを調整します。
 * SimpleMsgSideViewと併用すれば、ダメージの一括表示も可能です。
 * ※メッセージ表示かつ一括表示だと色々とおかしくなります。
 * ※ダメージ一括表示はわりとクセのある機能です。
 * 　比較的に上側への配置を推奨します。
 * 　それでも、競合は結構あるかもしれません……。
 * 
 * 詳細は以下をご覧ください。
 * http://newrpg.seesaa.net/article/475196493.html
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param <Damage Same Time>
 * @text ＜ダメージ一括表示＞
 * 
 * @param damageSameTime
 * @text ダメージ一括表示
 * @parent <Damage Same Time>
 * @type boolean
 * @default true
 * @desc ダメージの一括表示を有効にします。
 * ※この機能はSimpleMsgSideViewとの併用を推奨します。
 * 
 * @param sameTimeCondition
 * @text 一括実行条件
 * @parent <Damage Same Time>
 * @type string[]
 * @default ["methodName.startsWith(\"popup\")","methodName == \"performDamage\"","methodName == \"performRecovery\"","methodName == \"performMiss\"","methodName == \"performEvasion\"","methodName == \"performMagicEvasion\"","methodName == \"performCollapse\""]
 * @desc 条件を満たす場合に、ダメージ一括表示の対象とします。
 * 基本的には変更不要です。
 * 
 * @param <Damage Wait>
 * @text ＜ダメージウェイト＞
 * 
 * @param damageInterval
 * @text ダメージ同士の間隔
 * @parent <Damage Wait>
 * @type number
 * @default 16
 * @desc ダメージ（回復やミスも含む）同士の間隔です。
 * 連続ヒット時はこの間隔でダメージ表示されます。
 * 
 * @param damageWait
 * @text ダメージ後のウェイト
 * @parent <Damage Wait>
 * @type number @min 1
 * @default 16
 * @desc ダメージ処理後（回復やミスも含む）のウェイトです。
 * こちらは最終ヒット時のウェイトになります。
 * 
 * @param normalWait
 * @text 標準ウェイト
 * @parent <Damage Wait>
 * @type number
 * @desc メッセージ表示などに使用される標準のウェイトです。
 * メッセージ非表示でもこのウェイトはかかります。未指定:16
 * 
 * @param stateWaitFlg
 * @text ステートもウェイト対象に
 * @parent <Damage Wait>
 * @type boolean
 * @default false
 * @desc ステート時もダメージと同様のウェイトをかけます。
 * 強化弱体も対象に含みます。
 * 
 * @param <Enemy Collapse>
 * @text ＜撃破時の動作＞
 * 
 * @param collapseWaitType
 * @text 敵撃破時のウェイト方法
 * @parent <Enemy Collapse>
 * @type select
 * @option ウェイト有（ＭＶ標準） @value
 * @option ウェイト無 @value off
 * @option ボスのみウェイト @value boss
 * @default boss
 * @desc 撃破時のウェイト方法を設定します。
 */
(function() {
"use strict";

/**
 * ●構造体をJSで扱えるように変換
 */
function parseStruct1(arg) {
    var ret = [];

    JSON.parse(arg).forEach(function(str) {
        ret.push(str);
    });

    return ret;
}
function toBoolean(str) {
    if (str == true) {
        return true;
    }
    return (str == "true") ? true : false;
}
function toNumber(str, def) {
    return isNaN(str) ? def : +(str || def);
}
function setDefault(str, def) {
    return str ? str : def;
}

var parameters = PluginManager.parameters("NRP_DamageTiming");
var pDamageSameTime = toBoolean(parameters["damageSameTime"], true);
var pSameTimeCondition = parseStruct1(parameters["sameTimeCondition"]);
var pDamageInterval = toNumber(parameters["damageInterval"]);
var pDamageWait = toNumber(parameters["damageWait"]);
var pNormalWait = toNumber(parameters["normalWait"]);
var pStateWaitFlg = toBoolean(parameters["stateWaitFlg"], false);
var pCollapseWaitType = parameters["collapseWaitType"];

var priorityWait = 0;
var damageWaitFlg = false;

/**
 * ●ダメージ一括表示の場合
 */
if (pDamageSameTime) {
    /**
     * ●初期化処理
     */
    var _BattleManager_initMembers = BattleManager.initMembers;
    BattleManager.initMembers = function() {
        _BattleManager_initMembers.apply(this, arguments);

        this._refrectTargets = [];
    }

    /**
     * 【上書】ダメージ処理などの更新
     */
    BattleManager.updateAction = function() {
        var targets = this._targets;
        var subject = BattleManager._subject;

        // 行動主体が取得できなければ処理終了
        if (!subject) {
            return;
        }

        // 対象がなければ
        if (!targets.length) {
            // 反射対象がある場合
            if (this._refrectTargets && this._refrectTargets.length) {
                // 一体ずつダメージ処理
                // ただし、再反射禁止フラグを立てておく
                let target = this._refrectTargets.shift();
                this._action._noRefrection = true;
                this.invokeAction(subject, target);
                this._action._noRefrection = false;
                return;
            }

            // 処理終了
            this.endAction();
            return;
        }

        // ランダム型の場合
        if (this._action.isForRandom()) {
            // 一体ずつダメージ処理
            let target = targets.shift();
            this.invokeAction(subject, target);
            return;
        }

        // 範囲に従ってダメージ処理
        // 重複ターゲットを削除して再作成
        var distinctTargets = targets.filter(function(target, i) {
            return targets.indexOf(target) == i;
        });

        // 対象の人数分ダメージ処理を実行
        for (let target of distinctTargets) {
            // 処理した要素を削除
            for (let i = 0; i < targets.length; i++) {
                let t = targets[i];
                // 一致した最初の１件を削除
                if (t == target) {
                    targets.splice(i, 1);
                    break;
                }
            }
            // ダメージ処理実行
            this.invokeAction(subject, target);
        }
    };

    /**
     * 【上書】魔法反射処理
     */
    BattleManager.invokeMagicReflection = function(subject, target) {
        this._action._reflectionTarget = target;
        this._logWindow.displayReflection(target);

        // ここではダメージ処理を行わず、ターゲットの追加だけを行う
        if (!this._refrectTargets) {
            this._refrectTargets = [];
        }
        this._refrectTargets.push(subject);
    };

    /**
     * ●魔法反射率取得
     */
    var _Game_Action_itemMrf = Game_Action.prototype.itemMrf;
    Game_Action.prototype.itemMrf = function(target) {
        // 再反射禁止
        if (this._noRefrection) {
            return 0;
        }
        return _Game_Action_itemMrf.apply(this, arguments);
    };

    /**
     * ●初期化
     */
    var _Window_BattleLog_initialize = Window_BattleLog.prototype.initialize;
    Window_BattleLog.prototype.initialize = function() {
        _Window_BattleLog_initialize.apply(this, arguments);

        this._methodsSameTime = [];
    };

    /**
     * ●処理の蓄積
     */
    var _Window_BattleLog_push = Window_BattleLog.prototype.push;
    Window_BattleLog.prototype.push = function(methodName) {
        // ウェイトがかかるため不要
        if (methodName == "waitForNewLine"
                || methodName == "pushBaseLine"
                || methodName == "popBaseLine") {
            return;
        }

        // 一括表示の対象条件なら
        if (isSameCondition(methodName)) {
            var methodArgs = Array.prototype.slice.call(arguments, 1);
            this._methodsSameTime.push({ name: methodName, params: methodArgs });
            return;
        }

        _Window_BattleLog_push.apply(this, arguments);
    };

    /**
     * ●結果クリア
     */
    var _Game_Battler_clearResult = Game_Battler.prototype.clearResult;
    Game_Battler.prototype.clearResult = function() {
        // 行動中はクリアしない。
        // ※行動主体の回復表示が消えてしまうため。
        if (this.isActing()) {
            return;
        }
        
        _Game_Battler_clearResult.apply(this, arguments);
    };

    /**
     * ●行動開始時
     */
    const _BattleManager_startAction = BattleManager.startAction;
    BattleManager.startAction = function() {
        // 行動主体の結果をクリアする。
        // ※clearResultの修正の影響で、結果が残る不具合に対処するため。
        const subject = this._subject;
        subject._result.clear();

        _BattleManager_startAction.apply(this, arguments);
    };
}

/**
 * ●順次実行処理
 */
var _Window_BattleLog_callNextMethod = Window_BattleLog.prototype.callNextMethod;
Window_BattleLog.prototype.callNextMethod = function() {
    if (pDamageSameTime) {
        // 一括で処理する。
        while (this._methodsSameTime.length > 0) {
            var method = this._methodsSameTime.shift();
            if (method.name && this[method.name]) {
                this[method.name].apply(this, method.params);
            } else {
                throw new Error('Method not found: ' + method.name);
            }
        }
    }

    _Window_BattleLog_callNextMethod.apply(this, arguments);

    // 優先ウェイトがある場合は上書き
    if (priorityWait) {
        this._waitCount = priorityWait;
        priorityWait = 0;
    }
};

/**
 * ●一括表示の対象かどうかを判定
 */
function isSameCondition(methodName) {
    return pSameTimeCondition.some(function(condition) {
        return eval(condition);
    });
}

/**
 * ●ウェイト
 */
var _Window_BattleLog_wait = Window_BattleLog.prototype.wait;
Window_BattleLog.prototype.wait = function() {
    // ウェイト変更フラグが立っていた場合
    if (damageWaitFlg) {
        damageWaitFlg = false;
        setDamageWait();
        return;
    }

    _Window_BattleLog_wait.apply(this, arguments);
};

/**
 * ●メッセージ速度
 */
const _Window_BattleLog_messageSpeed = Window_BattleLog.prototype.messageSpeed;
Window_BattleLog.prototype.messageSpeed = function() {
    if (pNormalWait != undefined) {
        return pNormalWait;
    }

    return _Window_BattleLog_messageSpeed.apply(this, arguments);;
};

/**
 * ●ダメージ後のウェイト
 */
function setDamageWait() {
    // ダメージ間隔
    if (BattleManager._targets.length > 0) {
        if (pDamageInterval != undefined) {
            priorityWait = pDamageInterval;
        }

    // 最終ヒット
    } else if (BattleManager._targets.length == 0) {
        if (pDamageWait != undefined) {
            priorityWait = pDamageWait;
        }
    }
}

/**
 * ●失敗
 */
var _Window_BattleLog_displayFailure = Window_BattleLog.prototype.displayFailure;
Window_BattleLog.prototype.displayFailure = function(target) {
    if (target.result().isHit() && !target.result().success) {
        damageWaitFlg = true;
    }

    _Window_BattleLog_displayFailure.apply(this, arguments);
};

/**
 * ●ミス
 */
var _Window_BattleLog_displayMiss = Window_BattleLog.prototype.displayMiss;
Window_BattleLog.prototype.displayMiss = function(target) {
    damageWaitFlg = true;
    
    _Window_BattleLog_displayMiss.apply(this, arguments);
};

/**
 * ●回避
 */
var _Window_BattleLog_displayEvasion = Window_BattleLog.prototype.displayEvasion;
Window_BattleLog.prototype.displayEvasion = function(target) {
    damageWaitFlg = true;

    _Window_BattleLog_displayEvasion.apply(this, arguments);
};

/**
 * ●ＨＰダメージ
 */
var _Window_BattleLog_displayHpDamage = Window_BattleLog.prototype.displayHpDamage;
Window_BattleLog.prototype.displayHpDamage = function(target) {
    if (target.result().hpAffected) {
        damageWaitFlg = true;
    }

    _Window_BattleLog_displayHpDamage.apply(this, arguments);
};

/**
 * ●ＭＰダメージ
 */
var _Window_BattleLog_displayMpDamage = Window_BattleLog.prototype.displayMpDamage;
Window_BattleLog.prototype.displayMpDamage = function(target) {
    if (target.isAlive() && target.result().mpDamage !== 0) {
        damageWaitFlg = true;
    }

    _Window_BattleLog_displayMpDamage.apply(this, arguments);
};

/**
 * ●ＴＰダメージ
 */
var _Window_BattleLog_displayTpDamage = Window_BattleLog.prototype.displayTpDamage;
Window_BattleLog.prototype.displayTpDamage = function(target) {
    if (target.isAlive() && target.result().tpDamage !== 0) {
        damageWaitFlg = true;
    }

    _Window_BattleLog_displayTpDamage.apply(this, arguments);
};

if (pStateWaitFlg) {
    /**
     * ●ステート付加（死亡処理含む）
     */
    var _Window_BattleLog_displayAddedStates = Window_BattleLog.prototype.displayAddedStates;
    Window_BattleLog.prototype.displayAddedStates = function(target) {
        target.result().addedStateObjects().forEach(function(state) {
            var stateMsg = target.isActor() ? state.message1 : state.message2;
            if (stateMsg) {
                damageWaitFlg = true;
                return;
            }
        }, this);

        _Window_BattleLog_displayAddedStates.apply(this, arguments);
    };

    // とりあえず対象外
    // /**
    //  * ●ステート消去
    //  */
    // var _Window_BattleLog_displayRemovedStates = Window_BattleLog.prototype.displayRemovedStates;
    // Window_BattleLog.prototype.displayRemovedStates = function(target) {
    //     target.result().removedStateObjects().forEach(function(state) {
    //         if (state.message4) {
    //             damageWaitFlg = true;
    //             return;
    //         }
    //     }, this);
    //     _Window_BattleLog_displayRemovedStates.apply(this, arguments);
    // };

    /**
     * ●バフ
     */
    var _Window_BattleLog_displayBuffs = Window_BattleLog.prototype.displayBuffs;
    Window_BattleLog.prototype.displayBuffs = function(target, buffs, fmt) {
        buffs.forEach(function(paramId) {
            damageWaitFlg = true;
            return;
        }, this);

        _Window_BattleLog_displayBuffs.apply(this, arguments);
    };
}

if (pCollapseWaitType) {
    /**
     * 【上書】撃破演出時のウェイト
     */
    Sprite_Enemy.prototype.isEffecting = function() {
        // ボス
        if (pCollapseWaitType == "boss" && this._effectType == 'bossCollapse') {
            return true;
        }
        // 敵全滅時はウェイトをかける
        if ($gameTroop.aliveMembers().length == 0) {
            return this._effectType !== null;
        }
        // 通常
        return false;
    };
}

})();
