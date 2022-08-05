//=============================================================================
// NRP_CountTimeTurnBattle.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.051 A dream battle system that forcefully blends turn-based and CTB.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @base NRP_VisualTurn
 * @orderBefore NRP_VisualTurn
 * @url http://newrpg.seesaa.net/article/472839675.html
 *
 * @help Multiple characters act together like a typical turn-based system.
 * However, a character with high agility will get more turns
 * in proportion to that number.
 * Conversely, slower characters can have their turns skipped.
 *
 * For more information, please see below.
 * http://newrpg.seesaa.net/article/472839675.html
 *
 * This plugin does not display order by itself.
 * Please use it in combination with NRP_VisualTurn.js.
 * http://newrpg.seesaa.net/article/472840225.html
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but we will respond to defects as far as possible.
 *
 * @param <Basic>
 *
 * @param number
 * @parent <Basic>
 * @type number
 * @default 9
 * @desc The number of battler to calculate the turn order.
 * This is the number of battler to be displayed. default 9.
 *
 * @param <Battle Start>
 *
 * @param actorStartRandomWt
 * @parent <Battle Start>
 * @type number
 * @default 0
 * @desc Distribute the actors' initial wait time by the numerical %.
 * Example: 20 distributes 90-110%. 0 if not specified.
 *
 * @param enemyStartRandomWt
 * @parent <Battle Start>
 * @type number
 * @default 20
 * @desc Distribute the enemys' initial wait time by the numerical %.
 * Example: 20 distributes 90-110%. 0 if not specified.
 *
 * @param preemptiveAdvantage
 * @parent <Battle Start>
 * @type number
 * @default 50
 * @desc Advantage to actors during a preemptive attack.
 * Speed up their turn by the % of the specified number.
 *
 * @param surpriseAdvantage
 * @parent <Battle Start>
 * @type number
 * @default 50
 * @desc Advantage to enemys during a surprise attack.
 * Speed up their turn by the % of the specified number.
 *
 * @param startTurn
 * @parent <Battle Start>
 * @type select
 * @option 0
 * @option 1
 * @default 1
 * @desc Sets the number of turns at the start of battle.
 * It is used to determine the enemy's action. default 1. MV's default 0.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.051 ターン制とＣＴＢを無理やり融合させた夢の戦闘システムを実現します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @base NRP_VisualTurn
 * @orderBefore NRP_VisualTurn
 * @url http://newrpg.seesaa.net/article/472839675.html
 *
 * @help 一般的なターン制のように複数のキャラがまとまって行動します。
 * ただし、敏捷性が高いキャラはその数値に比例して多くターンが回ってきます。
 * 逆に言うと、遅いキャラは出番が飛ばされることがあります。
 *
 * 詳細は以下をご覧ください。
 * http://newrpg.seesaa.net/article/472839675.html
 *
 * このプラグイン単体では順序の表示を行いません。
 * NRP_VisualTurn.jsと組み合わせて使用してください。
 * http://newrpg.seesaa.net/article/472840225.html
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 *
 * @param <Basic>
 * @text ＜基本設定＞
 * @desc 見出しです。
 *
 * @param number
 * @text 計算人数（表示人数）
 * @parent <Basic>
 * @type number
 * @default 9
 * @desc ターン順序の計算を行う人数。これが表示される人数になります。
 * 指定なしなら9。
 *
 * @param <Battle Start>
 * @text ＜戦闘開始関連＞
 * @desc 見出しです。
 *
 * @param actorStartRandomWt
 * @text 味方の始動時間バラツキ
 * @parent <Battle Start>
 * @type number
 * @default 0
 * @desc 味方の初期待ち時間を数値％分だけ分散させます。
 * 例：20ならば、90～110%に分散。指定なしは0。
 *
 * @param enemyStartRandomWt
 * @text 敵の始動時間バラツキ
 * @parent <Battle Start>
 * @type number
 * @default 20
 * @desc 敵の初期待ち時間を数値％分だけ分散させます。
 * 例：20ならば、90～110%に分散。指定なしは20。
 *
 * @param preemptiveAdvantage
 * @text 先制時の始動時間ボーナス
 * @parent <Battle Start>
 * @type number
 * @default 50
 * @desc 先制攻撃時の特典。
 * 指定した数値の％分だけ仲間のターンを早めます。
 *
 * @param surpriseAdvantage
 * @text 奇襲時の始動時間ボーナス
 * @parent <Battle Start>
 * @type number
 * @default 50
 * @desc 奇襲時の敵特典。
 * 指定した数値の％分だけ敵のターンを早めます。
 *
 * @param startTurn
 * @text 初期ターン数
 * @parent <Battle Start>
 * @type select
 * @option 0
 * @option 1
 * @default 1
 * @desc 戦闘開始時のターン数（敵の行動判定用）を設定します。
 * 初期値は1。MVのデフォルトの仕様だと0です。
 */

(function() {
"use strict";

function toNumber(str, def) {
    return isNaN(str) ? def : +(str || def);
}

var parameters = PluginManager.parameters("NRP_CountTimeTurnBattle");

var paramNumber = toNumber(parameters["number"], 9);
var paramActorStartRandomWt = toNumber(parameters["actorStartRandomWt"], 0);
var paramEnemyStartRandomWt = toNumber(parameters["enemyStartRandomWt"], 20);
var paramPreemptiveAdvantage = toNumber(parameters["preemptiveAdvantage"], 50);
var paramSurpriseAdvantage = toNumber(parameters["surpriseAdvantage"], 50);
var paramStartTurn = toNumber(parameters["startTurn"], 1);

/*------------------------------------------------------
 * BattleManager
 ------------------------------------------------------*/
/*
 * ●初期化処理
 */
var _BattleManager_initMembers = BattleManager.initMembers;
BattleManager.initMembers = function() {
    _BattleManager_initMembers.call(this);
    
    // CTTB判定フラグ
    this._isCttb = true;
    // コマンド入力順のアクター
    this._commandActors = [];
    // コマンド入力アクターのindex（追加）
    this._commandActorsIndex = -1;
    // CTTBターン内の行動のべ人数（追加）
    this._cttbCount = -1;
};

/**
 * ●戦闘開始時
 * ※バトラー変数の初期化
 */
var _Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
Game_Battler.prototype.onBattleStart = function() {
    // 元処理実行
    _Game_Battler_onBattleStart.call(this);

    this._wt = 0;
    // 初期ターンの設定
    this._turnCount = paramStartTurn - 1;
    // ターンに参加しているか？
    this._isTurnEntry = false;
};

/**
 * ● コマンド入力中のアクターを取得
 */
BattleManager.actor = function() {    // MZ対応
    return this._commandActorsIndex >= 0 ? this._commandActors[this._commandActorsIndex] : null;
    //return this._actorIndex >= 0 ? $gameParty.members()[this._actorIndex] : null;
};

/**
 * ● アクターの変更
 * また、newActorIndex = -1で初期化を行う。
 */
BattleManager.changeActor = function(newActorIndex, lastActorActionState) {
    var lastActor = this.actor();
    this._commandActorsIndex = newActorIndex; // 追加
    var newActor = this.actor();
    if (lastActor) {
        lastActor.setActionState(lastActorActionState);
    }
    if (newActor) {
        // アクターが取得できるなら、そのインデックスを設定
        this._actorIndex = newActor.index();
        newActor.setActionState('inputting');
    } else {
        // それ以外はそのままセット（-1の初期化を想定）
        this._actorIndex = newActorIndex;
    }

    // MZ対応
    if (Utils.RPGMAKER_NAME != "MV") {
        this._currentActor = newActor;
    }
};

/**
 * ●戦闘開始
 */
var _BattleManager_startBattle = BattleManager.startBattle;
BattleManager.startBattle = function() {
    _BattleManager_startBattle.apply(this, arguments); // 再定義した旧処理
    
    // 戦闘開始時の初期WTを設定
    this.setStartWt();
};

/**
 * 【独自実装】●戦闘開始時のWT（待ち時間）設定
 * ※先制攻撃、奇襲を考慮
 */
BattleManager.setStartWt = function() {
    // ループ内でthis参照はできないので一旦移す
    var surprise = this._surprise;
    var preemptive = this._preemptive;
    
    // 敵味方全員の初期WTを計算する。
    this.allBattleMembers().forEach(function(battler) {
        // 基本WTを設定する。
        battler.makeBaseWt();

        // WTの初期値として基本WTを設定する。
        var wt = battler._baseWt;
        var startRandomWt = 0;
        
        // 味方
        if (battler.isActor()) {
            startRandomWt = paramActorStartRandomWt;
            
            // 先制攻撃の場合はWT減算
            if (preemptive) {
                // - WT * 先制攻撃特典％ / 100
                wt -= parseInt(wt * paramPreemptiveAdvantage / 100);
            }
            
        // 敵の場合はWT分散
        } else {
            startRandomWt = paramEnemyStartRandomWt;
                
            // 不意打ちの場合はWT半減
            if (surprise) {
                // - WT * 奇襲特典％ / 100
                wt -= parseInt(wt * paramSurpriseAdvantage / 100);
            }
        }
        
        // 初期ＷＴを分散値に従って設定する。
        // 例：分散値が20の場合
        // 100 - (20 / 2) + [0～20未満の乱数] → 90～110未満の乱数を作成
        var r = 100 - (startRandomWt / 2) + Math.random() * startRandomWt;
        wt = parseInt(wt * r / 100);
        
        battler._wt = wt;
    });
};

/**
 * ●コマンド入力開始
 */
var _BattleManager_startInput = BattleManager.startInput;
BattleManager.startInput = function() {
    this._phase = 'input';
    
    // 行動順序計算
    this.makeActionOrders();
    // 時間経過
    this.timeGoesBy();

    // 各自の個別ターン加算
    this._entryBattlers.forEach(function(battler) {
        battler._turnCount++;
    });

    this._commandActorsIndex = -1;

    // 元処理実行
    _BattleManager_startInput.call(this);
}

/**
 * ● 次のコマンド入力へ
 */
BattleManager.selectNextCommand = function() {
    do {
        /*
         * 以下のいずれかの場合は次へ
         * アクターが取得できない。
         * アクターのコマンドは全て入力済み。（複数行動の場合）
         */
        if (!this.actor() || !this.actor().selectNextCommand()) {
            this.changeActor(this._commandActorsIndex + 1, 'waiting');
            // 全員入力完了ならターン開始
            if (this._commandActorsIndex >= this._commandActors.length) {
                this.startTurn();
                break;
            }
        }
    } while (!this.actor().canInput());
};

/**
 * ● 前のコマンド入力へ
 */
BattleManager.selectPreviousCommand = function() {
    do {
        if (!this.actor() || !this.actor().selectPreviousCommand()) {
            this.changeActor(this._commandActorsIndex - 1, 'undecided');
            if (this._commandActorsIndex < 0) {
                return;
            }
        }
    } while (!this.actor() || !this.actor().canInput());
};

/**
 * ●行動順序の作成
 */
BattleManager.makeActionOrders = function() {
    // WTとバトラーの組のリスト
    var wt_battlers = [];
    // 一時バトラーリスト
    var battlers = [];
    
    /*
     * 敵味方全員の生存者リストを作成し、基本WTを計算する。
     */
    this.allBattleMembers().forEach(function(battler) {
        // 生存者のみに絞る
        if (battler.isAlive()) {
            battlers.push(battler);
        }
        
        /*
         * ついでにバトラー別の初期化処理
         */
        // ターン参加フラグを初期化
        battler._isTurnEntry = false;
    });

    battlers.forEach(function(battler) {
        // 基本WTを設定する。（speedではなく、agiが参照される。）
        battler.makeBaseWt();
    });
    
    /*
     * CTB用のリストを作成していく。
     */
    battlers.forEach(function(battler) {
        for (var i = 0; i < paramNumber; i++) {
            // 現在のWTに、次の行動までのWTを加算する。
            var tmpWt = battler._wt + (battler._baseWt * i);

            /*
             * 以下の条件を満たす場合は、割り込めない。
             * １．現在の行動順リストが埋まっている。
             * ２．かつ、末尾のバトラーよりもWTが大きい場合。
             */
            if (wt_battlers.length >= paramNumber
                && tmpWt >= wt_battlers[paramNumber - 1][0]) {
                // forループを終了して、次のバトラーへ
                break;
            }
            
            // 行動順リストの末尾にWTとバトラーの組を追加
            wt_battlers.push([tmpWt, battler]);

            // WT降順でソート実行
            wt_battlers.sort(function(a, b) {
                return a[0] - b[0];
            });
            
            // 押し出された要素（最後の要素）を削除
            if (wt_battlers.length > paramNumber) {
                wt_battlers.pop();
            }
        }
    });

    /*
     * WTを除いたリストを再作成
     */
    battlers = wt_battlers.map(function(wtBattler) {
        return wtBattler[1];
    });

    /*
     * CTTB用戦闘人数を算出
     */
    var entryBattlers = []; // 参加リスト
    var noEntryBattlers = []; // 不参加リスト
    // CTTBターン内の行動のべ人数（追加）
    this._cttbCount = paramNumber; // 最大表示人数を初期値に
    // 参加締め切りフラグ
    var cttbCountFlg = false;

    var count = 0;

    // 配列をターン参加と不参加に分割する。
    battlers.forEach(function(battler) {
        // 参加締め切り後なら
        if (cttbCountFlg) {
            // 不参加リストに追加
            noEntryBattlers.push(battler);

        } else {
            // 対象のバトラーが二回目の登場なら参加締め切り
            // その直前をターンの終了点に
            if (entryBattlers.includes(battler)) {
                this._cttbCount = count;
                cttbCountFlg = true;

                // 不参加リストに追加
                noEntryBattlers.push(battler);
            } else {
                // ターン参加フラグを立てる
                battler._isTurnEntry = true;
                // ターン参加リストに追加
                entryBattlers.push(battler);
            }
        }

        count++;
    }, this);

    // ターン開始後、最速始動技が選択されているなら優先。
    if (this._phase == "turn") {
        entryBattlers.sort(function(a, b) {
            if (isFastTrick(a)) {
                return -1;
            } else if (isFastTrick(b)) {
                return 1;
            }
            return 0;
        });
    }

    // 参加者のみのリスト
    this._entryBattlers = entryBattlers;
    // 参加者、非参加者の順で結合
    this._actionBattlers = entryBattlers.concat(noEntryBattlers);

    // コマンド入力対象（アクター）に絞ったリストを作成
    this._commandActors = entryBattlers.filter(function(battler) {
        return battler.isActor();
    });
};

/**
 * ●最速始動かどうか？
 */
function isFastTrick(battler) {
    if (battler.numActions() > 0) {
        // ターン参加かつ最速始動ならば最優先
        var fastTrick = battler._actions.some(function(action) {
            return battler._isTurnEntry && action.item() && action.item().meta.FastTrick;
        });
        if (fastTrick) {
            return true;
        }
    }
}

/**
 * ●時間経過処理
 */
BattleManager.timeGoesBy = function() {
    var topWt = this._actionBattlers[0]._wt;
    if (topWt > 0) {
        // 先頭行動者のWTが0になるように、全バトラーのWTを減算。
        this.allBattleMembers().forEach(function(battler) {
            // 生存者のみに絞る
            if (battler.isAlive()) {
                battler._wt -= topWt;
            }
        });
    }
}

/**
 * ●行動開始
 */
var _BattleManager_startAction = BattleManager.startAction;
BattleManager.startAction = function() {
    // 元処理実行
    _BattleManager_startAction.apply(this);
    
    // 実行した行動の速度を計算する。
    this._subject.makeSpeed();
};

/**
 * ● 次の行動主体の取得
 * 行動順序リストの次に来るバトラーを取得する。
 * 現在パーティにいないアクターを取得した場合（index が nil, バトルイベ
 * ントでの離脱直後などに発生）は、それをスキップする。
 */
BattleManager.getNextSubject = function() {
    for (;;) {
        // そのターンの行動人数を超えていたら終了
        if (this._cttbCount <= 0) {
            return null;
        }
        this._cttbCount -= 1;
        
        var battler = this._actionBattlers.shift();
        if (!battler) {
            return null;
        }
        if (battler.isBattleMember() && battler.isAlive()) {
            return battler;
        }
    }
};

/**
 * ●パラメータの追加
 */
Object.defineProperties(Game_BattlerBase.prototype, {
    // WT（待ち時間）
    wt: { get: function() { return this._wt; }, configurable: true },
});

/**
 * ●個別ターン数の取得
 */
Game_BattlerBase.prototype.turnCount = function() {
    return this._turnCount;
};

/**
 * ●基本WTを計算する。
 */
Game_Battler.prototype.makeBaseWt = function() {
    // 敏捷性が０以下ならNumber型の最大値（たぶん9007199254740991）を設定
    if (this.agi <= 0) {
        this._baseWt = Number.MAX_SAFE_INTEGER;
        return;
    }
    // 100000 / 敏捷性
    this._baseWt = parseInt(100000 / this.agi);
};

/**
 * ●速度補正つき加算WTを取得する。
 */
Game_Battler.prototype.getAddWt = function() {
    var addWt = 100000;

    // speedが有効ならspeed値を使用する。
    if (this._speed > 0) {
        addWt = parseInt(100000 / this._speed);
        
    // なければagiを参照する。
    } else {
        // 敏捷性が０以下ならNumber型の最大値（たぶん9007199254740991）を設定
        if (this.agi <= 0) {
            return Number.MAX_SAFE_INTEGER;
        }
        addWt = parseInt(100000 / this.agi);
    }
    return addWt;
};

/**
 * ●個別のターン終了処理
 */
var _Game_Battler_prototype_onTurnEnd = Game_Battler.prototype.onTurnEnd;
Game_Battler.prototype.onTurnEnd = function() {
    // ターンに参加していないバトラーは終了処理をしない。
    if (!this._isTurnEntry) {
        return;
    }

    // 行動者の現在WTに加算WTを加算する。
    this._wt += this.getAddWt();

    // 元の処理を呼び出し。
    _Game_Battler_prototype_onTurnEnd.apply(this, arguments);
};

/**
 * ●行動速度の計算
 * 速度補正を％化
 */
Game_Action.prototype.speed = function() {
    var agi = this.subject().agi;
    
    // バラつきをなくす
    var speed = agi;
//    var speed = agi + Math.randomInt(Math.floor(5 + agi / 4));
    
    // 速度補正を％化
    if (this.item()) {
        // 速度補正MAX(2000)の場合は速度無限に（時間経過がなくなる）
        if (this.item().speed >= 2000) {
            return Infinity;
        }
        
        speed += parseInt(speed * this.item().speed / 100);
//        speed += this.item().speed;
    }
    if (this.isAttack()) {
        // 速度補正MAX(2000)の場合は速度無限に（時間経過がなくなる）
        if (this.subject().attackSpeed() >= 2000) {
            return Infinity;
        }
        
        speed += parseInt(speed * this.subject().attackSpeed() / 100);
//        speed += this.subject().attackSpeed();
    }
    return speed;
};

/**
 * ●敵の行動条件合致判定［ターン数］
 */
Game_Enemy.prototype.meetsTurnCondition = function(param1, param2) {
    // グループのターンではなく、行動者の個別ターンを参照する。
    var n = this.turnCount();
//    var n = $gameTroop.turnCount();
    
    if (param2 === 0) {
        return n === param1;
    } else {
        return n > 0 && n >= param1 && n % param2 === param1 % param2;
    }
};

/**
 * ●ステート追加（ＷＴ変動の実装）
 */
var _Game_BattlerBase_prototype_addNewState = Game_BattlerBase.prototype.addNewState;
Game_BattlerBase.prototype.addNewState = function(stateId) {
    /*
     * WT設定値を元にWTを変化
     */
    // <SetWt:number>があれば、その値(%)を設定
    if ($dataStates[stateId].meta.SetWt) {
        this._wt = this._baseWt * $dataStates[stateId].meta.SetWt / 100;
    
    // <AddWt:number>があれば、その値(%)を加算
    } else if ($dataStates[stateId].meta.AddWt) {
        this._wt += this._baseWt * $dataStates[stateId].meta.AddWt / 100;
    }
    
    // 元の処理
    _Game_BattlerBase_prototype_addNewState.apply(this, arguments);
};
})();
