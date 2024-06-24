//=============================================================================
// NRP_CombinationSkill.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.381 Creates a combination skill.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/474570191.html
 * 
 * @help Creates a combination skill.
 * Can be used in normal turn-based or CTB or TPB.
 * Works on both actors and enemy.
 * 
 * [Features]
 * - When a subject uses a skill, the activation conditions,
 *   consumption and gained TP are applied to the collaborator as well.
 * - The hit rate and critical rate are averages of participants.
 * - Add states to collaborators, such as disabling,
 *   to recreate the passage of CTB turns.
 * - It is also possible to use combination skills from party commands.
 * 
 * For more information, please see below.
 * http://newrpg.seesaa.net/article/474570191.html
 * 
 * [Global Functions]
 * $cs(no)
 * - Getting Participants in Combination Skills.  (1 beginning)
 * - Available for both enemies and actors.
 * - If "no" is not specified, get the whole thing.
 * - Use it for integration with other plugins and formulas.
 * 
 * $actor(id)
 * - Get the actor with the specified ID.
 * 
 * [Valid for skills notes]
 * <CS_Actors:[Actor ID],[Actor ID]>
 * - The combination skill targets a specified actor.
 * - 3 or more actors can be combined.
 * - You can also use, for example, \v[1].
 * 
 * <CS_Enemys:[Enemy ID],[Enemy ID]>
 * - Target a specified enemy character for a combination skill.
 * - Same character or three or more can be used.
 * 
 * <CS_Battlers:[number],[number]>
 * - The specified battler is the target of the combination skill.
 * - "number" is the number in order. (1 to start)
 * - 3 or more people can be accommodated.
 * 
 * <CS_ReactionState:[State ID]>
 * - The state to be added to the cooperator
 *   after the skill is executed is individually specified.
 * - If not specified, the value of the plugin parameter is set.
 * - In CTB, this allows you to represent the passage of a turn.
 * 
 * <CS_UserName:[string]>
 * - The name of the user of the combination skill when displaying the message.
 * - You can also use, for example, \n[1].
 * 
 * [Valid for states notes]
 * <CS_Seal>
 * - Prohibits combination skills while in state.
 * 
 * <CS_SealSub>
 * - Do not cooperate in combination skills while in state.
 * (You can use your own starting combination skills.)
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 * 
 * @param <For CTB>
 * @desc This item is designed for CTB.
 * And other individually acting combat systems.
 * 
 * @param reactionState
 * @parent <For CTB>
 * @type state
 * @desc After executing the skill, add the specified state to the cooperator. Assumes one inaction or delay.
 * 
 * @param <Message>
 * @desc Related items for displaying the battle log.
 * 
 * @param andLetter
 * @parent <Message>
 * @type text
 * @default &
 * @desc Connect the names of participants in the skill with their letters.
 * Example: Harold & Therese are...
 * 
 * @param <Party Command>
 * @desc This item is used to display combination skills in party commands.
 * 
 * @param partySkillActor
 * @parent <Party Command>
 * @type actor
 * @desc Specifies the actor that holds the combination skill.
 * Set a dummy actor dedicated to the party command.
 * 
 * @param combinationSymbol
 * @parent <Party Command>
 * @type text
 * @default combination
 * @desc Sets the symbol for the combination skill.
 * You can use this value when working with other plugins.
 * 
 * @param combinationName
 * @parent <Party Command>
 * @type text
 * @default Combination
 * @desc Sets the display command name for the combination skill.
 * 
 * @param showPartyCommand
 * @parent <Party Command>
 * @type boolean
 * @default false
 * @desc Adds a combination skill to the party command.
 * Not required for control by other plugins.
 * 
 * @param showPartyCommandPosition
 * @parent <Party Command>
 * @type number
 * @default 1
 * @desc Position for inserting a combination skill into a party command.
 * 0 is the top of the list.
 * 
 * @param showMenuCommand
 * @parent <Party Command>
 * @type boolean
 * @default false
 * @desc Adds a combination skill to the menu command.
 * Not required for control by other plugins.
 * 
 * @param showMenuCommandPosition
 * @parent <Party Command>
 * @type number
 * @default 2
 * @desc Position for inserting a combination skill into a menu command.
 * 0 is the top of the list.
 * 
 * @param hidePartyCommandSwitch
 * @parent <Party Command>
 * @type switch
 * @desc This switch hides the combination skills of the party commands.
 * 
 * @param hideMenuCommandSwitch
 * @parent <Party Command>
 * @type switch
 * @desc This switch hides the combination skills of the menu commands.
 * 
 * @param <Cooperation>
 * @desc This item is designed to work with external plugins.
 * 
 * @param invalidCondition
 * @parent <Cooperation>
 * @type string[]
 * @default ["BattleManager._isCttb && !a._isTurnEntry"]
 * @desc Combination skills are forbidden if the conditions are met.
 * "Subject" refers to the skill user and "a" refers to each participant.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.381 合体技を実現します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/474570191.html
 *
 * @help 合体技を実現します。
 * 通常のターン制でもＣＴＢでもＴＰＢ使えます。
 * アクターと敵キャラの両方に対応しています。
 * 
 * ■特徴
 * ・行動主体がスキルを使用した際、発動条件や消費、得ＴＰを協力者にも適用。
 * ・命中率やクリティカル率は参加者の平均値を取得。
 * ・協力者へ行動不能などのステートを付加し、ＣＴＢのターン経過を再現。
 * ・パーティコマンドから合体技を使用する設定も可能。
 * 
 * 詳細は以下をご覧ください。
 * http://newrpg.seesaa.net/article/474570191.html
 * 
 * ■グローバル関数
 * $cs(no)
 * ・合体技参加者を取得する。（1始まり）
 * ・敵味方両方で使用可能。
 * ・no未指定ならば、全体を取得。
 * ・他のプラグインとの連携や計算式に。
 * 
 * $actor(id)
 * ・指定したIDのアクターを取得する。
 * 
 * ■スキルのメモ欄で以下を指定可能です。
 * <CS_Actors:[アクターID],[アクターID]>
 * ・指定したアクターを合体技の対象とする。
 * ・３人以上も可能。
 * ・\v[1]なども使えます。
 * 
 * <CS_Enemys:[敵キャラID],[敵キャラID]>
 * ・指定した敵キャラを合体技の対象とする。
 * ・同キャラや３人以上も可能。
 * 
 * <CS_Battlers:[番号],[番号]>
 * ・指定したバトラー（敵味方共通）を合体技の対象とする。
 * ・[番号]は並び順の番号。（1から開始）
 * ・３人以上も可能。
 * 
 * <CS_ReactionState:[ステートID]>
 * ・スキル実行後、協力者に付加するステートを個別指定する。
 * ・指定がなければプラグインパラメータの値が設定される。
 * ・ＣＴＢではこれによってターン経過を表現できます。
 * 
 * <CS_UserName:[文字列]>
 * ・メッセージ表示する際の合体技の使用者名です。
 * ・\n[1]なども使えます。
 * 
 * ■ステートのメモ欄で以下を指定可能です。
 * <CS_Seal>
 * ・ステート中、合体技を禁止します。
 * 
 * <CS_SealSub>
 * ・ステート中、合体技への協力を禁止します。
 * （自身が起点となる合体技は使用可能）
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param <For CTB>
 * @text ＜ＣＴＢ関連＞
 * @desc ＣＴＢなどの個別行動系戦闘システムを想定した項目です。
 * 
 * @param reactionState
 * @text 実行後ステート
 * @parent <For CTB>
 * @type state
 * @desc スキル実行後、協力者に指定したステートを付加します。
 * １回行動不能やディレイなどを想定しています。
 * 
 * @param <Message>
 * @text ＜メッセージ関連＞
 * @desc 戦闘メッセージを表示する際の関連項目です。
 * 
 * @param andLetter
 * @text 連結用の文字
 * @parent <Message>
 * @type text
 * @default と
 * @desc 合体技の参加者名を指定の文字で連結します。
 * 例：「ハロルドとテレーゼは～」
 * 
 * @param <Party Command>
 * @text ＜パーティコマンド関連＞
 * @desc パーティコマンドに合体技を表示する際の関連項目です。
 * 
 * @param partySkillActor
 * @text 合体技用アクター
 * @parent <Party Command>
 * @type actor
 * @desc 合体技を保持するアクターを指定します。
 * パーティコマンド専用のダミーを設定してください。
 * 
 * @param combinationSymbol
 * @text 合体技記号
 * @parent <Party Command>
 * @type text
 * @default combination
 * @desc 合体技の記号を設定します。
 * この値は他のプラグインと連携する際に使用できます。
 * 
 * @param combinationName
 * @text 合体技表示名
 * @parent <Party Command>
 * @type text
 * @default 合体技
 * @desc 合体技の表示コマンド名を設定します。
 * 
 * @param showPartyCommand
 * @text パーティコマンドに表示
 * @parent <Party Command>
 * @type boolean
 * @default false
 * @desc パーティコマンドに合体技を追加します。
 * 他のプラグインで制御する場合は不要です。
 * 
 * @param showPartyCommandPosition
 * @text パーティコマンド挿入位置
 * @parent <Party Command>
 * @type number
 * @default 1
 * @desc パーティコマンドに合体技を挿入する位置です。
 * 0が先頭になります。
 * 
 * @param showMenuCommand
 * @text メニューコマンドに表示
 * @parent <Party Command>
 * @type boolean
 * @default false
 * @desc メニューコマンドに合体技を追加します。
 * 他のプラグインで制御する場合は不要です。
 * 
 * @param showMenuCommandPosition
 * @text メニューコマンド挿入位置
 * @parent <Party Command>
 * @type number
 * @default 2
 * @desc メニューコマンドに合体技を挿入する位置です。
 * 0が先頭になります。
 * 
 * @param hidePartyCommandSwitch
 * @text ﾊﾟｰﾃｨｺﾏﾝﾄﾞ非表示スイッチ
 * @parent <Party Command>
 * @type switch
 * @desc パーティコマンドの合体技を非表示にするスイッチです。
 * 
 * @param hideMenuCommandSwitch
 * @text ﾒﾆｭｰｺﾏﾝﾄﾞ非表示スイッチ
 * @parent <Party Command>
 * @type switch
 * @desc メニューコマンドの合体技を非表示にするスイッチです。
 * 
 * @param <Cooperation>
 * @text ＜外部連携＞
 * @desc 外部プラグインとの連携を想定した項目です。
 * 
 * @param invalidCondition
 * @text 使用禁止条件
 * @parent <Cooperation>
 * @type string[]
 * @default ["BattleManager._isCttb && !a._isTurnEntry"]
 * @desc 条件を満たす場合、合体技の実行を禁止します。
 * 『subject』でスキルの使用者、『a』で各参加者を参照します。
 */

/**
 * ●アクターＩＤからGame_Actorを取得
 */
function $actor(id) {
    return $gameActors.actor(id);
}

/**
 * ●インデックスからバトラーを取得
 */
function $cs(indexPlus1) {
    // 指定がない場合は全員を返す
    if (indexPlus1 == undefined) {
        return BattleManager._csMembers;
    }

    // ０始まりに変換
    var index = indexPlus1 - 1;
    return BattleManager._csMembers[index];
}

/**
 * ●インデックスからバトラースプライトを取得
 */
function $css(indexPlus1) {
    // 指定がない場合は全員を返す
    if (indexPlus1 == undefined) {
        return BattleManager._csMembers;
    }

    var battler = $cs(indexPlus1);

    var sprite;
    var sprites;

    if (battler.isActor()) {
        sprites = BattleManager._spriteset._actorSprites;
    } else {
        sprites = BattleManager._spriteset._enemySprites;
    }

    for (var i = 0; i < sprites.length; i++) {
        var s = sprites[i];
        if (s._battler == battler) {
            sprite = s;
            break;
        }
    }

    // Sprite_Actorのサイズ設定
    if (sprite._battler.isActor()) {
        // Sprite_Actorのサイズが取れないのでeffectTargetのものをセットする。
        // やや強引かも……。
        sprite.width = sprite._effectTarget.width;
        sprite.height = sprite._effectTarget.height;
    }

    return sprite;
}

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
function toNumber(str, def) {
    return isNaN(str) ? def : +(str || def);
}
function toBoolean(val, def) {
    if (val == "") {
        return def;
        
    } else if (typeof val === "boolean") {
        return val;
    }
    return val.toLowerCase() == "true";
}

var parameters = PluginManager.parameters("NRP_CombinationSkill");
var pReactionState = toNumber(parameters["reactionState"]);
var pAndLetter = parameters["andLetter"];
var pPartySkillActor = toNumber(parameters["partySkillActor"]);
var pCombinationSymbol = parameters["combinationSymbol"];
var pCombinationName = parameters["combinationName"];
var pShowPartyCommand = toBoolean(parameters["showPartyCommand"], false);
var pShowPartyCommandPosition = toNumber(parameters["showPartyCommandPosition"], 1);
var pShowMenuCommand = toBoolean(parameters["showMenuCommand"], false);
var pShowMenuCommandPosition = toNumber(parameters["showMenuCommandPosition"], 2);
var pHidePartyCommandSwitch = parameters["hidePartyCommandSwitch"];
var pHideMenuCommandSwitch = parameters["hideMenuCommandSwitch"];
var pInvalidCondition = parseStruct1(parameters["invalidCondition"]);

/**
 * ●スキルを使用可能か
 */
var _Game_BattlerBase_canUse = Game_BattlerBase.prototype.canUse;
Game_BattlerBase.prototype.canUse = function(item) {
    if (!item) {
        return false;
    }

    // 合体技の場合
    if (isCombinationSkill(item)) {
        if (DataManager.isSkill(item) && canUseCombinationSkill(this, item)) {
            return true;
        } else if (DataManager.isItem(item) && canUseCombinationItem(this, item)) {
            return true;
        }
        return false;
    }

    // 元処理実行
    return _Game_BattlerBase_canUse.call(this, item);
};

/**
 * ●合体技の使用条件を満たすかどうか？
 */
function canUseCombinationSkill(subject, item) {
    var csMembers = getCombinationMembers(item, subject);

    // 空ならば実行不可
    if (!csMembers || csMembers.length == 0) {
        return false;
    }

    // 参加者毎に使用可否を判定
    for (var member of csMembers) {
        // 参加者が存在しない場合
        if (!member || !member.isBattleMember()) {
            return false;
        }

        // 使用不可または行動制約
        if (!member.meetsSkillConditions(item) || member.isRestricted()) {
            return false;
        }

        // コマンド入力中
        if (BattleManager.isInputting()) {
            // タイムプログレス（アクティブ）の場合
            if (BattleManager.isActiveTpb()) {
                // 既に合体技の発動中かどうか？
                var isReserveCombination = member._actions.some(function(tmpAction) {
                    return tmpAction._isReserveCombination && item == tmpAction.item();
                });

                // 発動中でないならば
                // かつ、参加者のゲージが満タンでないなら無効
                if (!isReserveCombination && !member.isTpbCharged()) {
                    return false;
                }

            // それ以外
            } else {
                // アクションが合体技協力準備中なら入力不可とする。
                for (var tmpAction of member._actions) {
                    if (tmpAction && tmpAction._isReserveCombination) {
                        return false;
                    }
                }
            }

        // ターン中
        } else if (BattleManager.isInTurn()) {
            // 同一スキルかどうか？
            // ※行動時に行動再選択を行うプラグインを考慮
            var isMatch = member._actions.some(function(action) {
                return item == action.item();
            });

            // 不一致の場合は使用不可
            if (!isMatch) {
                return false;
            }
        }

        // 合体技禁止状態なら使用不可
        if (member.isCombinationSeal(subject)) {
            return false;
        }

        // 禁止条件に該当しているかの判定
        if (isInvalidCondition(member, subject)) {
            return false;
        }
    }

    // 全員ＯＫならtrue
    return true;
}

/**
 * 【独自実装】合体技の禁止判定
 */
Game_BattlerBase.prototype.isCombinationSeal = function(mainUser) {
    for (var state of this.states()) {
        // 合体技禁止
        if (state.meta.CS_Seal) {
            return true;
        // 合体技協力禁止
        } else if (this != mainUser && state.meta.CS_SealSub) {
            return true;
        }
    }
    return false;
};

/**
 * ●合体技（アイテム版）の使用条件を満たすかどうか？
 */
function canUseCombinationItem(subject, item) {
    // 参加者毎に使用可否を判定
    for (var member of getCombinationMembers(item, subject)) {
        // 参加者が存在しない場合
        if (!member) {
            return false;
        }

        // 使用可否を判定
        if (!member.meetsItemConditions(item)) {
            return false;
        }

        // 禁止条件に該当しているかの判定
        if (isInvalidCondition(member, subject)) {
            return false;
        }
    }

    // 全員ＯＫならtrue
    return true;
}

/**
 * 禁止条件に該当しているかの判定
 */
function isInvalidCondition(a, subject) {
    if (!pInvalidCondition) {
        return false;
    }

    // 禁止条件に該当しているかの判定
    for (var  i = 0; i < pInvalidCondition.length; i++) {
        var condition = pInvalidCondition[i];
        if (eval(condition)) {
            return true;
        }
    }
}

/**
 * ●消費処理
 */
var _Game_Battler_useItem = Game_Battler.prototype.useItem;
Game_Battler.prototype.useItem = function(item) {
    // 合体技の場合
    if (isCombinationSkill(item)) {
        // 解放処理
        releaseCombination(item, this);

        if (DataManager.isSkill(item)) {
            // 参加者毎に消費
            for (var member of getCombinationMembers(item, this)) {
                member.paySkillCost(item);
            }
            return;
        }
    }

    // 元処理実行
    _Game_Battler_useItem.call(this, item);
};

/**
 * スキル（アイテム）使用後の効果
 */
var _Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
Game_Action.prototype.applyItemUserEffect = function(target) {
    var item = this.item();
    // 合体技の場合
    if (isCombinationSkill(item)) {
        // 参加者毎にＴＰ加算
        for (var member of getCombinationMembers(item, this.subject())) {
            var value = Math.floor(item.tpGain * member.tcr);
            member.gainSilentTp(value);
        }
        return;
    }

    // 元処理実行
    _Game_Action_applyItemUserEffect.call(this, target);
};

/**
 * ●命中率計算
 */
var _Game_Action_itemHit = Game_Action.prototype.itemHit;
Game_Action.prototype.itemHit = function(target) {
    // 合体技の場合
    if (isCombinationSkill(this.item())) {
        var combinationHit = combinationItemHit(this);
        // 結果があれば返す
        if (combinationHit) {
            return combinationHit;
        }
    }

    // 元処理実行
    return _Game_Action_itemHit.call(this, target);
};

/**
 * ●合体技用の命中計算
 */
function combinationItemHit(action) {
    if (action.isPhysical()) {
        var members = getCombinationMembers(action.item(), action.subject());
        // 命中合計を求める。
        var hitSum = members.reduce(function(a, b) {
            return a + b.hit;
        }, 0);

        // 人数で割って平均値を返す
        var hitAvg = hitSum / members.length;
        return action.item().successRate * 0.01 * hitAvg;
    }

    // 対象外の場合はundefined
    return undefined;
}

/**
 * ●クリティカル率計算
 */
var _Game_Action_itemCri = Game_Action.prototype.itemCri;
Game_Action.prototype.itemCri = function(target) {
    // 合体技の場合
    if (isCombinationSkill(this.item())) {
        return combinationItemCri(this, target);
    }

    // 元処理実行
    return _Game_Action_itemCri.call(this, target);
};

/**
 * ●合体技用のクリティカル計算
 */
function combinationItemCri(action, target) {
    // クリティカル対象外
    if (!action.item().damage.critical) {
        return 0;
    }

    var members = getCombinationMembers(action.item(), action.subject());
    // クリティカル合計を求める。
    var criSum = members.reduce(function(a, b) {
        return a + b.cri;
    }, 0);

    // 人数で割って平均値を返す
    var criAvg = criSum / members.length;
    return criAvg * (1 - target.cev);
}

/**
 * ●合体技使用後の解放処理
 */
function releaseCombination(item, subject) {
    // 行動主体以外に付与するステート
    var reactionState = item.meta.CS_ReactionState;
    if (reactionState == undefined) {
        reactionState = pReactionState;
    }
    // 数式反映
    reactionState = eval(reactionState);
    
    // 参加者毎にループ
    for (var member of getCombinationMembers(item, subject)) {
        // 行動主体以外なら
        if (member != subject) {
            // ステートを付加する。
            if (reactionState) {
                member.addState(reactionState);
            }
            // アクションをクリア
            member.clearActions();
        }
    }
}

/**
 * ●アクション開始
 */
const _BattleManager_startAction = BattleManager.startAction;
BattleManager.startAction = function() {
    const subject = this._subject;
    const action = subject.currentAction();
    const item = action.item();

    // 合体技の場合
    if (isCombinationSkill(item)) {
        // BattleManagerに保持しておく
        // ※合体技のアクション実行時に参照
        BattleManager._csMembers = action.csMembers();
    }
    
    _BattleManager_startAction.apply(this, arguments);
};

/**
 * ●アクション開始処理
 * ※標準ではモーションの調整のみ
 */
const _Window_BattleLog_performActionStart = Window_BattleLog.prototype.performActionStart;
Window_BattleLog.prototype.performActionStart = function(subject, action) {
    _Window_BattleLog_performActionStart.apply(this, arguments);

    var item = action.item();
    // 合体技の場合
    if (isCombinationSkill(item)) {
        // 参加者毎にループ
        for (var member of getCombinationMembers(item, subject)) {
            // 行動主体以外もモーション調整
            if (member != subject) {
                member.performActionStart(action);
            }
        }
    }
};

/**
 * ●アクション終了処理
 * ※標準ではモーションの調整のみ
 */
var _Window_BattleLog_performActionEnd = Window_BattleLog.prototype.performActionEnd;
Window_BattleLog.prototype.performActionEnd = function(subject) {
    // 元処理実行
    _Window_BattleLog_performActionEnd.call(this, subject);

    // 行動情報が取得できなければ終了（念のため）
    if (!BattleManager._action || !BattleManager._action.item()) {
        return;
    }

    var item = BattleManager._action.item();
    // 合体技の場合
    if (isCombinationSkill(item)) {
        // 参加者毎にループ
        for (var member of getCombinationMembers(item, subject)) {
            // 行動主体以外もモーション調整
            if (member != subject) {
                member.performActionEnd();

                // 待機モーション解除
                // MZではperformActionEndで解除されないので別途設定
                if (Utils.RPGMAKER_NAME != "MV") {
                    // TPBならundecided, 他はdone
                    member.setActionState(BattleManager.isTpb() ? "undecided" : "done");
                }
            }
        }
    }
};

/**
 * ●合体技かどうか？
 */
function isCombinationSkill(item) {
    if (!item) {
        return false;
    }

    if (item.meta.CS_Actors || item.meta.CS_Battlers || item.meta.CS_Enemys) {
        return true;
    }

    return false;
}

/**
 * ●合体技の参加者を取得
 */
function getCombinationMembers(item, subject) {
    var action = subject.currentAction();

    // 既に参加者確定済なら、そのまま返す
    if (action && action.csMembers()) {
        return action.csMembers();
    }

    // 合体技の参加者リスト
    var members = [];

    var csActorsMeta = item.meta.CS_Actors;
    var csEnemysMeta = item.meta.CS_Enemys;
    var csBattlersMeta = item.meta.CS_Battlers;

    /*
     * アクターＩＤ指定
     */
    if (csActorsMeta) {
        // 配列化
        const actorsId = csActorsMeta.split(",");
        for (let i = 0; i < actorsId.length; i++) {
            const actorId = convertValue(actorsId[i]);
            var actor = $actor(actorId);

            members.push(actor);
        }

    /*
     * エネミーＩＤ指定
     */
    } else if (csEnemysMeta) {
        members = getCombinationEnemys(csEnemysMeta, subject);

    /*
     * バトラー指定
     */
    } else if (csBattlersMeta) {
        // 配列化
        var battlersIndex = csBattlersMeta.split(",");
        for (let i = 0; i < battlersIndex.length; i++) {
            // ０始まりに変換
            var index = convertValue(battlersIndex[i]) - 1;
            // 所属集団のインデックスから参加バトラーを取得
            var battler = subject.friendsUnit().members()[index];
            members.push(battler);
        }
    }

    // BattleManagerに保持しておく
    BattleManager._csMembers = members;

    return members;
}

/**
 * ●値の数式解釈を行う
 */
 function convertValue(value) {
    // 無理やり空のウィンドウを作成（convertEscapeCharacters用）
    var tmpWindow;
    if (Utils.RPGMAKER_NAME == "MV") {
        tmpWindow = new Window_Base();
    } else {
        tmpWindow = new Window_Base(new Rectangle());
    }

    let retValue;

    try {
        // 数式として取得できる場合
        retValue = eval(value);

    } catch (e) {
        // 数式でない場合はエラーとなるが、文字列で取得
        // \V[1]などの値を反映する。
        retValue = tmpWindow.convertEscapeCharacters(value);
    }

    return retValue;
}

/**
 * 【独自実装】合体技参加者の情報を配列化して設定
 * ※無限循環の可能性を考慮して、バトラーそのものは保有させない
 */
Game_Action.prototype.setCsMembers = function(csMembers) {
    if (!csMembers || csMembers.length == 0) {
        this._csMembersInfo = undefined;
        return;
    }

    var csMembersInfo = [];

    for (var member of csMembers) {
        var memberInfo = {
            actorId: member._actorId,
            enemyId: member._enemyId,
            index: member.index()
        };
        csMembersInfo.push(memberInfo);
    }

    this._csMembersInfo = csMembersInfo;
}

/**
 * 【独自実装】合体技参加者の情報をクリア
 */
Game_Action.prototype.clearCsMembers = function() {
    this._csMembersInfo = undefined;
}

/**
 * 【独自実装】合体技参加者の情報をバトラーに変換して取得
 */
Game_Action.prototype.csMembers = function() {
    if (!this._csMembersInfo) {
        return undefined;
    }

    var csMembers = [];

    for (var memberInfo of this._csMembersInfo) {
        // アクターはＩＤから取得
        if (memberInfo.actorId) {
            csMembers.push($gameActors.actor(memberInfo.actorId));
        // 敵キャラはインデックスから取得
        } else if (memberInfo.enemyId) {
            csMembers.push($gameTroop.members()[memberInfo.index]);
        }
    }

    return csMembers;
};

/**
 * ●合体技参加者取得（敵キャラ）
 * ※同一ＩＤの別キャラを考慮
 */
function getCombinationEnemys(csEnemysMeta, subject) {
    var members = [];

    // 配列化
    var enemysId = csEnemysMeta.split(",");
    for (let i = 0; i < enemysId.length; i++) {
        var enemyId = convertValue(enemysId[i]);

        // まず行動主体と一致するバトラーを優先追加
        var enemy = $gameTroop.aliveMembers().find(function(m) {
            return members.indexOf(m) == -1 // リストに未追加
                && m.enemyId() == enemyId   // ＩＤが一致
                && m == subject;            // 行動主体に一致
        });

        if (enemy) {
            members.push(enemy);
            continue;
        }

        // その他のバトラーを追加
        enemy = $gameTroop.aliveMembers().find(function(m) {
            // リストに追加済、またはＩＤが不一致
            if (members.indexOf(m) >= 0 || m.enemyId() != enemyId) {
                return false;
            }

            let action = m.currentAction();
            // 合体技準備状態ではない → 協力決定
            if (!action || !action._isReserveCombination) {
                return true;
            }
            
            // 他の合体技の準備中 → 協力不可
            return false;
        });

        // 取得できなければ合体技の参加者が存在しない
        if (!enemy) {
            // 参加者をクリアして無効化
            members = [];
            break;
        }

        members.push(enemy);
    }

    return members;
}

//-----------------------------------------------------------------------------
// 敵キャラ用の制御
//-----------------------------------------------------------------------------

/**
 * ●敵のアクション作成
 */
var _Game_Enemy_makeActions = Game_Enemy.prototype.makeActions;
Game_Enemy.prototype.makeActions = function() {
    var action = this.currentAction();
    // 既に合体技協力待機状態の場合
    if (action && action._isReserveCombination) {
        // アクションの設定はしない。
        return;
    }

    _Game_Enemy_makeActions.call(this);
}

/**
 * ●敵のアクション設定
 */
var _Game_Action_setEnemyAction = Game_Action.prototype.setEnemyAction;
Game_Action.prototype.setEnemyAction = function(action) {
    _Game_Action_setEnemyAction.call(this, action);

    if (action) {
        var item = this.item();
        // 合体技が選択された場合
        if (isCombinationSkill(item)) {
            // 合体技準備
            setReserveCombination(this, this._targetIndex);
        }
    }
};

//-----------------------------------------------------------------------------
// ターン制用の設定
//-----------------------------------------------------------------------------

/**
 * ●次のコマンドへ
 * ※アクション確定時
 */
var _BattleManager_selectNextCommand = BattleManager.selectNextCommand;
BattleManager.selectNextCommand = function() {
    // 直前に確定したアクションを取得
    var action = BattleManager.inputtingAction();
    if (action) {
        // パーティコマンドから合体技選択時なら行動主体を修正
        if (this._selectPartyCombination) {
            var subject = getPartyCombinationActor();
            action.setSubject(subject);

            // CTBの場合、現在の行動主体を合体技の一人目に変更
            // ※そうしないと動かない
            if (this._isCtb) {
                this._subject = getCombinationMembers(action.item(), subject)[0];
            }
        }

        // 合体技準備
        setReserveCombination(action, action._targetIndex);
    }

    // パーティコマンドの合体技選択時フラグ
    this._selectPartyCombination = undefined;

    // 元処理実行
    _BattleManager_selectNextCommand.call(this);
};

/**
 * ●合体技準備処理
 * ※現在の入力者以外にも合体技を設定する。
 */
function setReserveCombination(action, targetIndex) {
    var item = action.item();
    var subject = action.subject();

    // 合体技以外は終了
    if (!isCombinationSkill(item)) {
        return;
    }

    // 参加者取得
    var csMembers = getCombinationMembers(item, subject);

    // 合体技準備フラグを設定
    action._isReserveCombination = true;
    // 参加者が確定したのでアクションにセット
    action.setCsMembers(csMembers);

    // 参加者毎にループ
    for (var member of csMembers) {
        // 行動主体以外も同一スキルを選択
        if (member != subject) {
            // アクションを設定
            var followerAction = new Game_Action(member);
            followerAction.setSkill(item.id);
            followerAction.setTarget(targetIndex);
            /*
             * 合体技準備フラグを設定
             * _isReserveCombination
             *  →合体技参加者全員が対象のフラグ。他の合体技との競合判定用
             * _isReserveCombinationSub
             *  →合体技協力者用のフラグ。コマンド飛ばし判定用
             */
            followerAction._isReserveCombination = true;
            followerAction._isReserveCombinationSub = true;
            followerAction.setCsMembers(csMembers);

            member.setAction(0, followerAction);

            // 二番目以降のスキルはクリアしておく。
            for (let i = 1; i < member._actions.length; i++) {
                var blankAction = new Game_Action(member);
                member.setAction(i, blankAction);
            }

            // 待機モーションに設定
            member.setActionState("waiting");
        }
    }
}

/**
 * ●前のコマンドへ
 */
var _Game_Actor_selectPreviousCommand = Game_Actor.prototype.selectPreviousCommand;
Game_Actor.prototype.selectPreviousCommand = function() {
    // キャンセル処理実行
    var ret = _Game_Actor_selectPreviousCommand.call(this);

    // 複数回行動をキャンセルした場合、trueとなる。
    // →入力状況（_actionInputIndex）が変化
    if (ret) {
        // 合体技キャンセル
        cancelReserveCombination(this);
    }

    // 戻り値をそのまま返す
    return ret;
};

/**
 * ●[MV]アクター切替
 */
var _BattleManager_changeActor = BattleManager.changeActor;
BattleManager.changeActor = function(newActorIndex, lastActorActionState) {
    var lastActor = this.actor();
    // 合体技協力待機状態の場合、待機状態を保持
    if (lastActor && lastActor.currentAction()
            && lastActor.currentAction()._isReserveCombinationSub) {
        lastActorActionState = "waiting";
    }

    // 元処理実行
    _BattleManager_changeActor.call(this, newActorIndex, lastActorActionState);

    // 合体技キャンセル（キャンセル時、前のアクターに移った場合を想定）
    // ※次のアクターに移った場合も呼び出されるが支障はないのでそのまま
    cancelReserveCombination(this.actor());
};

/**
 * ●[MZ]アクター切替
 */
const _BattleManager_changeCurrentActor = BattleManager.changeCurrentActor;
BattleManager.changeCurrentActor = function(forward) {
    var lastActor = this.actor();
    // 合体技協力待機状態の場合、待機状態を保持
    if (lastActor && lastActor.currentAction()
            && lastActor.currentAction()._isReserveCombinationSub) {
        lastActorActionState = "waiting";
    }

    // 元処理実行
    _BattleManager_changeCurrentActor.apply(this, arguments);

    // 合体技キャンセル（キャンセル時、前のアクターに移った場合を想定）
    // ※次のアクターに移った場合も呼び出されるが支障はないのでそのまま
    cancelReserveCombination(this.actor());
};

/**
 * ●合体技キャンセル処理
 * ※合体技を待機中のアクターがいればキャンセル
 */
function cancelReserveCombination(actor) {
    if (!actor) {
        return;
    }

    var action = actor.inputtingAction();

    // アクションが取得できない
    if (!action || !action.item()) {
        return;
    }

    var item = action.item();

    // 以下の場合は終了
    // ・合体技ではない。
    // ・合体技協力待機状態である。
    // ・合体技実行待機者ではない。
    if (!isCombinationSkill(item)
            || action._isReserveCombinationSub
            || !action._isReserveCombination) {
        return;
    }

    // 参加者毎にループ
    for (var member of getCombinationMembers(item, actor)) {
        // アクション毎にループし、合体技待機状態をクリア
        for (var tmpAction of member._actions) {
            if (tmpAction._isReserveCombination) {
                tmpAction._isReserveCombination = undefined;

                // 協力者のスキルは通常攻撃へ初期化
                if (tmpAction._isReserveCombinationSub) {
                    tmpAction._isReserveCombinationSub = undefined;
                    tmpAction.setAttack();
                }
                // 合体技参加者の情報をクリア
                tmpAction.clearCsMembers();

                // 対象の参加者がいない。（ＰＴコマンド時を想定）
                // または、対象の参加者が現在の入力アクター以後ならば
                if (!BattleManager.actor() ||
                        member.index() > BattleManager.actor().index()) {
                    // 待機モーション解除
                    member.setActionState("undecided");
                }
            }
        }
    }
}

/**
 * ●入力可能かどうか？
 */
var _Game_BattlerBase_canInput = Game_BattlerBase.prototype.canInput;
Game_BattlerBase.prototype.canInput = function() {
    // アクションが合体技協力準備中なら入力不可とする。
    var action = this.currentAction();
    if (action && action._isReserveCombinationSub) {
        return false;
    }

    // 元処理実行
    return _Game_BattlerBase_canInput.call(this);
};

//-----------------------------------------------------------------------------
// パーティコマンドから合体技を使用
//-----------------------------------------------------------------------------

/**
 * ●パーティコマンド作成
 */
const _Window_PartyCommand_makeCommandList = Window_PartyCommand.prototype.makeCommandList;
Window_PartyCommand.prototype.makeCommandList = function() {
    // 元処理実行
    _Window_PartyCommand_makeCommandList.call(this);

    // 非表示スイッチがオンの場合
    if (pHidePartyCommandSwitch && $gameSwitches.value(pHidePartyCommandSwitch)) {
        return;
    }

    // 指定位置に合体技コマンドを挿入
    if (pShowPartyCommand) {
        this._list.splice(pShowPartyCommandPosition, 0, { name: pCombinationName, symbol: pCombinationSymbol, enabled: true, ext: null});
    }
};

/**
 * ●パーティコマンドに関数紐付け
 */
const _Scene_Battle_createPartyCommandWindow = Scene_Battle.prototype.createPartyCommandWindow;
Scene_Battle.prototype.createPartyCommandWindow = function() {
    // 元処理実行
    _Scene_Battle_createPartyCommandWindow.call(this);

    // 合体技追加
    this._partyCommandWindow.setHandler(pCombinationSymbol,  this.commandCombination.bind(this));
};

/**
 * 【独自定義】合体技コマンド選択
 */
Scene_Battle.prototype.commandCombination = function() {
    var actor = getPartyCombinationActor();
    actor.clearActions();
    actor._actions.push(new Game_Action(actor));

    // 合体技選択中フラグ
    BattleManager._selectPartyCombination = true;

    this._skillWindow.setActor(actor);
    this._skillWindow.setStypeId(undefined); // スキルタイプの区別なく表示
    this._skillWindow.refresh();
    this._skillWindow.show();
    this._skillWindow.activate();

    // MZ対応
    BattleManager._currentActor = actor;

    // NRP_CountTimeBattle.js連携用
    if (this._ctbWindow) {
        // CTBウィンドウを非表示
        this._ctbWindow.hide();
    }
};

/**
 * ●[MZ対応]ウィンドウの切替が必要かどうか？
 */
const _Scene_Battle_needsInputWindowChange = Scene_Battle.prototype.needsInputWindowChange;
Scene_Battle.prototype.needsInputWindowChange = function() {
    // 合体技選択中は切替しない。
    // この制御をしないと、アクターコマンドへ飛んでしまう。
    if (BattleManager._selectPartyCombination) {
        return false;
    }
    
    return _Scene_Battle_needsInputWindowChange.apply(this, arguments);
};

/**
 * 【独自】合体技用ウィンドウとして設定
 */
Window_SkillList.prototype.setCombinationMode = function(isCombination) {
    this._isCombination = isCombination;
};

/**
 * ●スキル選択候補表示
 */
const _Window_SkillList_makeItemList = Window_SkillList.prototype.makeItemList;
Window_SkillList.prototype.makeItemList = function() {
    // 合体技の場合かつスキルタイプの指定がない場合
    if (this._isCombination && !this._stypeId && this._actor) {
        // スキルタイプの区別なく表示
        this._data = this._actor.skills();
        return;
    }

    // 元処理実行
    _Window_SkillList_makeItemList.call(this);
};

/*
 * Window_BattleSkill.prototype.makeItemListが未定義の場合は事前に定義
 * ※これをしておかないと以後のWindow_SkillList側への追記が反映されない。
 */
if (Window_BattleSkill.prototype.makeItemList == Window_SkillList.prototype.makeItemList) {
    Window_BattleSkill.prototype.makeItemList = function() {
        Window_SkillList.prototype.makeItemList.apply(this, arguments);
    }
}

/**
 * ●スキル選択候補表示（戦闘時）
 */
const _Window_BattleSkill_makeItemList = Window_BattleSkill.prototype.makeItemList;
Window_BattleSkill.prototype.makeItemList = function() {
    // スキルタイプの指定がない場合
    if (!this._stypeId && this._actor) {
        // スキルタイプの区別なく表示
        this._data = this._actor.skills();
        return;
    }

    // 元処理実行
    _Window_BattleSkill_makeItemList.call(this);
};

/**
 * ●アクター取得
 */
const _BattleManager_actor = BattleManager.actor;
BattleManager.actor = function() {
    // 合体技選択中
    if (this._selectPartyCombination) {
        return getPartyCombinationActor();
    }

    return _BattleManager_actor.call(this);
};

/**
 * ●スキル確定時
 */
const _Scene_Battle_onSkillOk = Scene_Battle.prototype.onSkillOk;
Scene_Battle.prototype.onSkillOk = function() {
    // 合体技選択時ならセット
    if (BattleManager._selectPartyCombination) {
        var actor = BattleManager.actor();
        var skill = this._skillWindow.item();
        var action = BattleManager.inputtingAction();
        action.setSkill(skill.id);

        // 合体技の場合、最初の参加者をアクションの行動主体にセットしておく
        // NRP_SkillRangeEXとの連携の際、行動主体のスプライトを取得できるようにするため。
        // ※強引かも……。
        if (isCombinationSkill(skill)) {
            action.setSubject(getCombinationMembers(skill, actor)[0]);
        }

        actor.setLastBattleSkill(skill);
        this.onSelectAction();
        return;
    }

    // 元処理実行
    _Scene_Battle_onSkillOk.call(this);
};

/**
 * ●スキルキャンセル時
 */
const _Scene_Battle_onSkillCancel = Scene_Battle.prototype.onSkillCancel;
Scene_Battle.prototype.onSkillCancel = function() {
    // 元処理実行
    _Scene_Battle_onSkillCancel.call(this);

    // 合体技選択時ならパーティコマンドへ
    if (BattleManager._selectPartyCombination) {
        // MZ対応：合体技用アクターをクリア
        BattleManager._currentActor = undefined;
        this.startPartyCommandSelection();
    }
};

/**
 * ●パーティコマンド選択開始
 */
const _Scene_Battle_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;
Scene_Battle.prototype.startPartyCommandSelection = function() {
    // 元処理内で選択位置が初期化されてしまうため保持しておく。
    var keepIndex = this._partyCommandWindow._index;

    // 元処理実行
    _Scene_Battle_startPartyCommandSelection.call(this);

    // 合体技キャンセル
    cancelReserveCombination(getPartyCombinationActor());

    // 合体技選択時なら解除
    if (BattleManager._selectPartyCombination) {
        BattleManager._selectPartyCombination = undefined;

        // 内部的にアクターコマンドが有効になってしまうので解除
        this._actorCommandWindow.deactivate();
        // アクターをクリア
        this._actorCommandWindow._actor = undefined;
        // カーソル位置
        this._partyCommandWindow.select(keepIndex);
    }
};

/**
 * ●アクター選択キャンセル
 */
var _Scene_Battle_onActorCancel = Scene_Battle.prototype.onActorCancel
Scene_Battle.prototype.onActorCancel = function() {
    // 合体技選択時ならスキルウィンドウへ戻る
    if (BattleManager._selectPartyCombination) {
        this._actorWindow.hide();
        this._skillWindow.show();
        this._skillWindow.activate();
        return;
    }

    // 元処理実行
    _Scene_Battle_onActorCancel.call(this);
};

/**
 * ●敵選択キャンセル
 */
var _Scene_Battle_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel = function() {
    // 合体技選択時ならスキルウィンドウへ戻る
    if (BattleManager._selectPartyCombination) {
        this._enemyWindow.hide();
        this._skillWindow.show();
        this._skillWindow.activate();
        return;
    }

    // 元処理実行
    _Scene_Battle_onEnemyCancel.call(this);
};

/**
 * ●パーティコマンド用の合体技を保有するアクター
 */
function getPartyCombinationActor() {
    return $gameActors.actor(pPartySkillActor);
}

/**
 * ●メニューコマンド追加（メインコマンド）
 */
var _Window_MenuCommand_addMainCommands = Window_MenuCommand.prototype.addMainCommands;
Window_MenuCommand.prototype.addMainCommands = function() {
    // 元処理実行
    _Window_MenuCommand_addMainCommands.call(this);

    // 非表示スイッチがオンの場合
    if (pHideMenuCommandSwitch && $gameSwitches.value(pHideMenuCommandSwitch)) {
        return;
    }

    // 指定位置に合体技コマンドを挿入
    // ※標準ではスキルの下
    if (pShowMenuCommand) {
        this._list.splice(pShowMenuCommandPosition, 0, { name: pCombinationName, symbol: pCombinationSymbol, enabled: true, ext: null});
    }
};

/**
 * ●メニューコマンド呼び出し先の設定
 */
var _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
    // 元処理実行
    _Scene_Menu_createCommandWindow.call(this);

    // 合体技追加
    this._commandWindow.setHandler(pCombinationSymbol, this.commandCombinationSkill.bind(this));
};

/**
 * ●合体技呼び出し
 */
Scene_Menu.prototype.commandCombinationSkill = function() {
    SceneManager.push(Scene_CombinationSkill);
};

//-----------------------------------------------------------------------------
// メニュー画面用の合体技コマンド
//-----------------------------------------------------------------------------

function Scene_CombinationSkill() {
    this.initialize.apply(this, arguments);
}

// Scene_Skillを継承
Scene_CombinationSkill.prototype = Object.create(Scene_Skill.prototype);
Scene_CombinationSkill.prototype.constructor = Scene_CombinationSkill;

/**
 * ●合体技用スキル画面を作成
 */
Scene_CombinationSkill.prototype.create = function() {
    Scene_ItemBase.prototype.create.call(this);
    this.createHelpWindow();
    this.createItemWindow();
    this.createActorWindow();
};

/**
 * ●合体技用スキル画面：スキルウィンドウを作成
 */
Scene_CombinationSkill.prototype.createItemWindow = function() {
    // MVの場合
    if (Utils.RPGMAKER_NAME == "MV") {
        var wx = 0;
        var wy = this._helpWindow.height;
        var ww = Graphics.boxWidth;
        var wh = Graphics.boxHeight - wy;
        this._itemWindow = new Window_SkillList(wx, wy, ww, wh);
    // MZの場合
    } else {
        const rect = this.itemWindowRect();
        this._itemWindow = new Window_SkillList(rect);
    }
    this._itemWindow.setHelpWindow(this._helpWindow);
    this._itemWindow.setHandler('ok',     this.onItemOk.bind(this));
    this._itemWindow.setHandler('cancel', this.popScene.bind(this));
    this._itemWindow.setCombinationMode(true);
    this.addWindow(this._itemWindow);
};

/**
 * ●[MZ]合体技用スキル画面：スキルウィンドウの表示領域を設定
 */
Scene_CombinationSkill.prototype.itemWindowRect = function() {
    const wx = 0;
    const wy = this.mainAreaTop();
    const ww = Graphics.boxWidth;
    const wh = Graphics.boxHeight - this.buttonAreaHeight() - this.helpAreaHeight();
    return new Rectangle(wx, wy, ww, wh);
};

/**
 * ●[MZ]合体技用スキル画面：アクター切替ボタンの表示設定
 */
Scene_CombinationSkill.prototype.needsPageButtons = function() {
    // 非表示固定
    return false;
};

/**
 * ●合体技用スキル画面：アクター情報更新
 */
Scene_CombinationSkill.prototype.refreshActor = function() {
    var actor = this.actor();
    this._itemWindow.setActor(actor);
    // スキル一覧を選択状態にする。
    this._itemWindow.select(0);
    this._itemWindow.activate();
};

/**
 * ●合体技用スキル画面：アクターを取得
 */
Scene_CombinationSkill.prototype.actor = function() {
    return getPartyCombinationActor();
};

/**
 * ●合体技用スキル画面：使用時
 */
Scene_CombinationSkill.prototype.useItem = function() {
    Scene_ItemBase.prototype.useItem.call(this);
    this._itemWindow.refresh();
};

//-----------------------------------------------------------------------------
// メッセージ表示の使用者名変更
//-----------------------------------------------------------------------------

/**
 * ●アクション実行時のメッセージ
 */
var _Window_BattleLog_displayAction = Window_BattleLog.prototype.displayAction;
Window_BattleLog.prototype.displayAction = function(subject, item) {
    if (isCombinationSkill(item)) {
        var csUserName = "";

        // 指定があれば、使用者名を書き換え
        var metaCsUserName = item.meta.CS_UserName;

        // 空白判定
        if (metaCsUserName == true) {
            metaCsUserName = "";

        // 入力がある場合
        } else if (metaCsUserName) {
            try {
                // 数式として取得できる場合
                csUserName = eval(metaCsUserName);
            } catch (e) {
                // 数式でない場合はエラーとなるが、普通に文字列で取得
                csUserName = metaCsUserName;
            }

        // 指定がなければ、参加者の名前を連結
        } else {
            for (var member of getCombinationMembers(item, subject)) {
                if (csUserName) {
                    csUserName += pAndLetter;
                }
                csUserName += member.name();
            }
        }

        subject._csUserName = csUserName;
    }

    // 元処理実行
    _Window_BattleLog_displayAction.call(this, subject, item);

    // クリアしておく
    if (subject._csUserName) {
        subject._csUserName = undefined;
    }
};

/**
 * ●アクターの名称表示
 */
var _Game_Actor_name = Game_Actor.prototype.name;
Game_Actor.prototype.name = function() {
    // 合体技用の使用者名があればそちらを返す
    if (this._csUserName) {
        return this._csUserName;
    }

    return _Game_Actor_name.call(this);
};

/**
 * ●敵の名称表示
 */
var _Game_Enemy_name = Game_Enemy.prototype.name;
Game_Enemy.prototype.name = function() {
    // 合体技用の使用者名があればそちらを返す
    if (this._csUserName) {
        return this._csUserName;
    }

    return _Game_Enemy_name.call(this);
};

//-----------------------------------------------------------------------------
// タイムプログレス（アクティブ）用の調整
//-----------------------------------------------------------------------------

/**
 * ●[MZのみ]現在のアクションを削除
 * ※実際に使用されたアクションの他、妨害ステートなどで不発に終わったアクションも通る
 */
const _Game_Battler_removeCurrentAction = Game_Battler.prototype.removeCurrentAction;
Game_Battler.prototype.removeCurrentAction = function() {
    // タイムプログレス（アクティブ）のみ
    if (BattleManager.isActiveTpb()) {
        const action = this._actions[0];
        const item = action.item();

        // 消去対象のアクションが合体技ならば
        if (isCombinationSkill(item)) {
            // コンビ解消用アイテム
            // ※終了処理で協力者の状態を戻すために用いる
            BattleManager._removeTpbCombinationItem = item;
        }
    }

    _Game_Battler_removeCurrentAction.apply(this, arguments);
};

/**
 * ●[MZのみ]行動終了時
 */
const _BattleManager_endBattlerActions = BattleManager.endBattlerActions;
BattleManager.endBattlerActions = function(battler) {
    _BattleManager_endBattlerActions.apply(this, arguments);

    // タイムプログレス（アクティブ）以外は処理しない
    if (!this.isActiveTpb()) {
        return;
    }

    // 消去された合体技が存在する場合
    const item = this._removeTpbCombinationItem;
    if (item) {
        // 参加者毎にループ
        for (var member of getCombinationMembers(item, battler)) {
            // 行動主体以外も行動終了処理を行う
            if (member != battler) {
                member.setActionState(this.isTpb() ? "undecided" : "done");
                member.onAllActionsEnd();
                member.clearTpbChargeTime();
                this.displayBattlerStatus(member, true);
            }
        }
        // クリアしておく。
        this._removeTpbCombinationItem = undefined;
    }
};

/**
 * ●[MZのみ]アクターの入力完了
 */
const _BattleManager_finishActorInput = BattleManager.finishActorInput;
BattleManager.finishActorInput = function() {
    _BattleManager_finishActorInput.apply(this, arguments);

    if (this._currentActor) {
        // タイムプログレス（アクティブ）の場合
        if (this.isActiveTpb()) {
            var item = this._currentActor.currentAction().item();

            // 合体技の場合
            if (isCombinationSkill(item)) {
                // 参加者毎にループ
                for (var member of getCombinationMembers(item, this._currentActor)) {
                    // 行動主体以外が対象
                    if (member != this._currentActor) {
                        // キャスト開始
                        member.startTpbCasting();
                    }
                }
            }
        }
    }
};

/**
 * ●[MZのみ]TPBのアクション開始
 */
const _Game_Battler_startTpbAction = Game_Battler.prototype.startTpbAction;
Game_Battler.prototype.startTpbAction = function() {
    _Game_Battler_startTpbAction.apply(this, arguments);

    // タイムプログレス（アクティブ）以外は処理しない
    // ウェイトの場合だとおかしくなるのでとりあえず。
    if (!BattleManager.isActiveTpb()) {
        return;
    }

    if (!this.currentAction()) {
        return;
    }

    var item = this.currentAction().item();
    // 合体技の場合
    if (isCombinationSkill(item)) {
        // 参加者毎にループ
        for (var member of getCombinationMembers(item, this)) {
            // 行動主体以外もアクション開始
            if (member != this) {
                member._tpbState = "acting";
            }
        }
    }
};

//-----------------------------------------------------------------------------
// 自動戦闘用の調整
//-----------------------------------------------------------------------------

/**
 * ●評価値計算
 */
const _Game_Action_evaluate = Game_Action.prototype.evaluate;
Game_Action.prototype.evaluate = function() {
    // 合体技の場合
    if (isCombinationSkill(this.item())) {
        // 評価値を０にする。
        return 0;
    }

    return _Game_Action_evaluate.apply(this, arguments);
};

/**
 * ●MVでも落ちないように調整
 */
if (Utils.RPGMAKER_NAME == "MV") {
    BattleManager.isActiveTpb = function() {
        return false;
    };
}

})();
