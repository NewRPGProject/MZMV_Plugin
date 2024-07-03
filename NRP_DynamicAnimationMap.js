//=============================================================================
// NRP_DynamicAnimationMap.js
//=============================================================================
/*:
 * @target MV
 * @plugindesc v1.153 Call DynamicAnimation on the map.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @base NRP_DynamicAnimation
 * @url http://newrpg.seesaa.net/article/477639171.html
 *
 * @help Call DynamicAnimation on the map.
 * 
 * Although it says on the map, it can actually be executed during a battle.
 * In this case, I recommend working with the following plugins
 * that perform parallel processing during battle.
 * http://newrpg.seesaa.net/article/477740800.html
 * 
 * For more information on this plugin, please see below.
 * http://newrpg.seesaa.net/article/477639171.html
 * 
 * Here's a sample.
 * http://newrpg.seesaa.net/article/477704129.html
 *
 * [Plugin Command]
 * > nrp.animation.skill 100
 * DynamicAnimation is executed based on the skill with ID=100.
 * It can be done on a map or in battle.
 * Before specifying this command, you can specify the options (see below).
 * 
 * [Example: Map]
 * nrp.animation.subject 1
 * nrp.animation.target 2
 * nrp.animation.wait
 * nrp.animation.skill 100
 * 
 * In the example above, we will release an animation
 * with skill ID=100 from event ID=1 to ID=2.
 * In doing so, it waits for the animation to end.
 * 
 * [Example: Battle]
 * nrp.animation.subjectCondition a._actorId == 1
 * nrp.animation.targetCondition a._enemyId == 2
 * nrp.animation.wait
 * nrp.animation.skill 100
 * 
 * In the above example, the actor ID = 1 to the enemy ID = 2,
 * releasing an animation with skill ID = 100.
 * In doing so, it waits for the animation to end.
 * 
 * It can also be specified in the item as follows.
 * The usage is exactly the same as in the case of skills, so I'll skip it.
 * > nrp.animation.item 100
 * 
 * See below for more information on options.
 * 
 * [Common Option (Plugin Command)]
 * > nrp.animation.wait
 * Wait for the animation to finish.
 * If you use parallel processing,
 * it waits for the animation to end and then loops.
 * In this case, the player's operation is not stopped.
 * 
 * [For Map Option (Plugin Command)]
 * > nrp.animation.target 1
 * Event ID = 1 is the target of the animation.
 * If you specify 0, this event is targeted,
 * if you specify -1, the player is targeted.
 * if you specify -2 or less, the follower is targeted. (-2, -3, -4)
 * And you can also specify multiple targets.
 * "1,2,3" to specify one by one." 1 to 5" to specify them all at once.
 * 
 * Formulas can also be specified. For example, ......
 * this._eventId + 1
 * The above is the ID+1 event for this event.
 * 
 * > nrp.animation.subject 1
 * Event ID = 1 is the subject (starting point) of the animation.
 * This is the same as nrp.animation.target,
 * including the ability to specify multiple targets.
 * 
 * > nrp.animation.noscroll
 * The animation is no longer affected by screen scrolling.
 * 
 * > nrp.animation.range 10
 * Animations are only executed
 * if the distance to parallel processing events is within 10 grids.
 * 
 * [For Battle Option (Plugin Command)]
 * > nrp.animation.targetCondition
 * Specify the conditions under which the animation will be performed.
 * (Multiple targets are allowed.)
 * 
 * > nrp.animation.subjectCondition
 * Specify the conditions that determine who will use the animation.
 * The point is the same as nrp.animation.targetCondition.
 * 
 * However, I'm assuming an animation
 * that basically doesn't require a target.
 * For example, it is used for background effects.
 * In this case, these specifications are not necessary.
 * 
 * [Call from note]
 * <D-Skill:1>
 * As mentioned above,
 * if you specify a skill ID for a map event
 * or actor or enemy or state note,
 * its animation will be executed automatically.
 * 
 * Also fill in the tag in the note at the top of the event page.
 * You can switch the status of this one for each of the current pages.
 *
 * [Play from the middle] (ver1.09~)
 * <D-StartTiming:?>
 * You can play the animation from an advanced state
 * by adding the above to the note field of the skill.
 * If ? =30 will start the animation with 30 frames advanced.
 * ※The standard value is 1 frame = 1/15 second.
 * 
 * This is useful when you want the animation
 * to start immediately after switching maps.
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 * 
 * @param keepAnimation
 * @type boolean
 * @desc Keep the animation when changing scenes such as menu, battle.
 * As for the animation in MZ format, it is incomplete.
 * @default true
 * 
 * @param eventResetOnLoad
 * @type boolean
 * @desc Resets the processing status of any events that are running DynamicAnimation at load time.
 * @default true
 * 
 * @param targetRangeGrid
 * @type number
 * @desc If the distance to the parallel event falls within this range, the animation is displayed.
 * 
 * @param noteTargetRangeGrid
 * @type number
 * @desc When executed from note, If the distance to the event falls within this range, the animation is displayed.
 * 
 * @param closeAnimationGap
 * @type boolean
 * @default false
 * @desc Slightly speeds up the end of the animation to eliminate gaps in the cyclical animation.
 * 
 * @param actingNoStateAnimation
 * @type boolean
 * @default false
 * @desc The animation specified in the state's note will not be displayed during the action.
 */

/*:ja
 * @target MV
 * @plugindesc v1.153 DynamicAnimationをマップ上から起動します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @base NRP_DynamicAnimation
 * @url http://newrpg.seesaa.net/article/477639171.html
 *
 * @help DynamicAnimationをマップ上から起動します。
 * 
 * マップ上とありますが、実際には戦闘中の実行も可能です。
 * その際、以下の戦闘中に並列処理を実行するプラグインとの連携をオススメします。
 * http://newrpg.seesaa.net/article/477740800.html
 * 
 * 当プラグインの詳細は以下をご覧ください。
 * http://newrpg.seesaa.net/article/477639171.html
 * 
 * 以下はサンプルです。
 * http://newrpg.seesaa.net/article/477704129.html
 *
 * 【プラグインコマンド】
 * > nrp.animation.skill 100
 * ID=100のスキルのDynamicAnimationを実行します。
 * マップ上でも戦闘中でも実行可能です。
 * このコマンドを指定する前に、オプション（下記参照）を指定可能です。
 * 
 * [マップ上の使用例]
 * nrp.animation.subject 1
 * nrp.animation.target 2
 * nrp.animation.wait
 * nrp.animation.skill 100
 * 
 * 上記の例ではイベントID=1からID=2に向けて、
 * スキルID=100のアニメーションをウェイト指定で放ちます。
 * 
 * [戦闘中の使用例]
 * nrp.animation.subjectCondition a._actorId == 1
 * nrp.animation.targetCondition a._enemyId == 2
 * nrp.animation.wait
 * nrp.animation.skill 100
 * 
 * 上記の例ではアクターID=1から敵キャラID=2に向けて、
 * スキルID=100のアニメーションをウェイト指定で放ちます。
 * 
 * また、以下のようにアイテムでも指定可能です。
 * 使い方はスキルの場合と全く同じなので割愛します。
 * > nrp.animation.item 100
 * 
 * オプションの詳細は以下をご覧ください。
 * 
 * 【プラグインコマンドの共通オプション】
 * > nrp.animation.wait
 * アニメーションの終了を待ちます。
 * 並列処理で指定するとアニメーションの終了を待ってからループするようになります。
 * その際、プレイヤーの操作を停止しません。
 * 
 * 【プラグインコマンドのマップ用オプション】
 * > nrp.animation.target 1
 * イベントID=1をアニメーションの対象とします。
 * 0ならばこのイベント、-1ならばプレイヤーです。
 * -2以下（-2, -3, -4）で隊列歩行の仲間も対象にできます。
 * さらに複数指定も可能です。
 * "1,2,3"で一つずつ指定。"1~5"で一括指定となります。
 * 
 * また、数式も指定可能です。例えば……
 * this._eventId + 1
 * はこのイベントのID+1のイベントとなります。
 * 
 * > nrp.animation.subject 1
 * イベントID=1をアニメーションの行動主体（始点）とします。
 * 複数指定ができることも含め、nrp.animation.targetと要領は同じです。
 * 
 * > nrp.animation.noscroll
 * アニメーションが画面スクロールの影響を受けなくなります。
 * 
 * > nrp.animation.range 10
 * 並列処理イベントとの距離が１０マス以内に収まる場合のみ、
 * アニメーションを実行します。
 * 
 * 【プラグインコマンドの戦闘用オプション】
 * > nrp.animation.targetCondition
 * アニメーションの対象を決める条件を指定します。（対象複数可）
 * 
 * > nrp.animation.subjectCondition
 * アニメーションの使用者を決める条件を指定します。
 * 要領はnrp.animation.targetConditionと同じです。
 * 
 * もっとも基本的には背景など対象を取らないアニメーションを想定しています。
 * その場合はこれらの指定も不要です。
 * 
 * 【メモ欄＆注釈からの起動】
 * <D-Skill:1>
 * というように、マップイベント、アクター、敵キャラ、
 * およびステートのメモ欄にスキルＩＤを指定すると、
 * そのアニメーションが自動実行されます。
 * 
 * また、イベントページ先頭の注釈に記入しても有効です。
 * こちらは現在のページ毎に状態を切り替えることも可能です。
 * 
 * 【途中から再生】（ver1.09～）
 * <D-StartTiming:?>
 * スキルのメモ欄に上記を追加すれば、アニメーションを進めた状態から再生できます。
 * ?=30ならば、アニメーションを30フレーム進めた状態から開始します。
 * ※標準では1フレーム＝1/15秒です。
 * マップを切り替えた直後から表示したい演出などに有用です。
 *
 * 【利用規約】
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param keepAnimation
 * @text シーン変更時もアニメを維持
 * @type boolean
 * @desc メニューや戦闘などシーン変更時もアニメの表示を維持します。
 * @default true
 * 
 * @param eventResetOnLoad
 * @text ロード時にイベントリセット
 * @type boolean
 * @desc ロード時にDynamicAnimationを実行中のイベントの処理状況をリセットします。
 * @default true
 * 
 * @param targetRangeGrid
 * @text 並列実行時の有効範囲マス数
 * @type number
 * @desc 並列処理イベントとの距離がこのマス数に収まる場合のみ、アニメーションを実行します。
 * 
 * @param noteTargetRangeGrid
 * @text 注釈実行時の有効範囲マス数
 * @type number
 * @desc 注釈実行時、イベントとの距離がこのマス数に収まる場合のみ、アニメーションを実行します。
 * 
 * @param closeAnimationGap
 * @text アニメの切目をなくす
 * @type boolean
 * @default false
 * @desc アニメーションの終了をわずかに早めることで、
 * 並列処理などで循環するアニメーションの切れ目をなくします。
 * 
 * @param actingNoStateAnimation
 * @text 行動中のステートアニメを禁止
 * @type boolean
 * @default false
 * @desc アクション中はステートのメモ欄に指定したアニメーションを非表示にします。
 */

// 連携用に値を保持
var Nrp = Nrp || {};

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

const PLUGIN_NAME = "NRP_DynamicAnimationMap";
const BASE_PLUGIN_NAME = "NRP_DynamicAnimation";

//-----------------------------------------------------------
// ここより下、NRP_DynamicAnimationMapMZと
// NRP_DynamicAnimationMapは全く同じソースとなります。
//-----------------------------------------------------------

const parameters = PluginManager.parameters(PLUGIN_NAME);
const pKeepAnimation = toBoolean(parameters["keepAnimation"], true);
const pEventResetOnLoad = toBoolean(parameters["eventResetOnLoad"], true);
const pTargetRangeGrid = toNumber(parameters["targetRangeGrid"]);
const pNoteTargetRangeGrid = toNumber(parameters["noteTargetRangeGrid"]);
const pCloseAnimationGap = toBoolean(parameters["closeAnimationGap"], false);
const pActingNoStateAnimation = toBoolean(parameters["actingNoStateAnimation"], false);

// DynamicAnimation本体側のパラメータ
const baseParameters = PluginManager.parameters(BASE_PLUGIN_NAME);
// 計算レート（ＭＶの場合は存在しないので既定値=4になる）
const pCalculationRate = toNumber(baseParameters["calculationRate"], 4);

const STARTTIMING_TAG_NAME = "D-StartTiming";

// DynamicMotionMapへ連携
Nrp.pKeepAnimation = pKeepAnimation;

//----------------------------------------
// ＭＺ用プラグインコマンド
//----------------------------------------

// MVには存在しないため、空で定義しておかないとエラーになる。
if (!PluginManager.registerCommand) {
    PluginManager.registerCommand = function() {}
}

/**
 * ●アニメーションの表示
 */
PluginManager.registerCommand(PLUGIN_NAME, "showAnimation", function(args) {
    // 戦闘中は無効
    if ($gameParty.inBattle()) {
        return;
    }

    const skillId = eval(getCommandValue(args.skillId));
    const targetId = setDefault(getCommandValue(args.target), "0");
    const startPointId = setDefault(getCommandValue(args.startPoint), "-1");

    let wait = false; // デフォルトはウェイトなし
    let noScroll = false; // デフォルトは画面に連動
    let targetRangeGrid = pTargetRangeGrid;

    // オプション情報
    if (args.option) {
        const option = JSON.parse(args.option);
        wait = toBoolean(option.wait);
        noScroll = toBoolean(option.noScroll);

        // 指定がある場合は共通設定より優先
        if (option.targetRangeGrid != undefined) {
            targetRangeGrid = toNumber(option.targetRangeGrid);
        }
    }

    const mapAnimationParams = [];
    mapAnimationParams.skillId = skillId;
    mapAnimationParams.targetId = targetId;
    mapAnimationParams.startPointId = startPointId;
    mapAnimationParams.wait = wait;
    mapAnimationParams.noScroll = noScroll;
    mapAnimationParams.targetRangeGrid = targetRangeGrid;
    
    // マップ上でのアニメーション表示
    showMapAnimation.bind(this)(mapAnimationParams);
});

/**
 * ●マップ上でのアニメーション表示
 * ※bindによってinterpreterをthisに渡して用いる。
 */
function showMapAnimation(mapAnimationParams) {
    const skillId = mapAnimationParams.skillId;
    const targetId = mapAnimationParams.targetId;
    const startPointId = mapAnimationParams.startPointId;
    const wait = mapAnimationParams.wait;
    const noScroll = mapAnimationParams.noScroll;
    const targetRangeGrid = mapAnimationParams.targetRangeGrid;
    const battleSubject = mapAnimationParams.battleSubject;
    const isItem = mapAnimationParams.isItem;

    // 対象を生成
    // ※bindによってthisをメソッドに渡す。
    const targets = makeTargetsAndSubjects.bind(this)(targetId);
    // 対象が取得できなければ処理しない。
    if (targets.length == 0) {
        return;
    }
    
    // イベントが範囲対象外ならば処理終了
    const event = $gameMap.event(this.eventId());
    // trigger:4（並列処理の場合）
    if (event && event._trigger == 4
            && isOutOfRange(event, targetRangeGrid)) {
        return;
    }

    // 行動主体を生成（複数を考慮）
    // ※bindによってthisをメソッドに渡す。
    const subjects = makeTargetsAndSubjects.bind(this)(startPointId);

    for (const subject of subjects) {
        // アクション情報を作成
        const action = makeAction(skillId, battleSubject, isItem);
        const mapAnimation = makeMapAnimation(this, subject, wait, noScroll, action);

        // 最後の対象のイベントIDを取得
        this._characterId = targets[targets.length - 1]._eventId;
        // 取得できない場合は-1:プレイヤー
        if (!this._characterId) {
            this._characterId = -1;
        }

        // 設定があればウェイト
        if (!mapAnimation.noWait) {
            this.setWaitMode("animation");
            this._onDynamicAnimation = true; // 実行中判定
            // タイミングを測るためアニメーションの最終対象を保持しておく
            this._lastDynamicTargetId = this.getDynamicTargetId(targets[targets.length - 1]);
            // モーション判定用の行動主体
            this._dynamicSubjectId = this.getDynamicTargetId(subject);

            // ＭＶの場合
            // ※ＭＺでは循環参照になるので厳禁！
            if (Utils.RPGMAKER_NAME == "MV") {
                this._character = targets[targets.length - 1];
            }
        }

        // DynamicAnimation開始
        this.startDynamicAnimation(targets, action, mapAnimation);
    }
}

/**
 * ●アニメーションの削除
 */
PluginManager.registerCommand(PLUGIN_NAME, "removeAnimation", function(args) {
    // 戦闘中は無効
    if ($gameParty.inBattle()) {
        return;
    }

    const skillId = getCommandValue(args.skillId);
    const targetId = getCommandValue(args.target);
    const startPointId = getCommandValue(args.startPoint);

    const targets = makeTargetsAndSubjects.bind(this)(targetId);
    const startPoints = makeTargetsAndSubjects.bind(this)(startPointId);

    const spriteset = getSpriteset();

    // 再生中の全アニメーションでループ
    for (const animationSprite of spriteset._animationSprites.clone()) {
        const dynamicAnimation = animationSprite.dynamicAnimation;
        // DynamicAnimationでないなら処理しない。
        if (!dynamicAnimation) {
            continue;
        }

        const baseAnimation = dynamicAnimation.baseAnimation;

        // スキルＩＤが条件に設定されている。
        if (skillId) {
            const id = baseAnimation.action.item().id;

            // スキルＩＤが一致していないなら処理しない
            if (skillId != id) {
                continue;
            }
        }

        // 行動主体が条件に設定されている。
        if (startPoints.length > 0) {
            // 行動主体が一致していないなら処理しない
            if (!startPoints.includes(baseAnimation.getSubject())) {
                continue;
            }
        }

        let removeFlg = false;

        // アニメーションの対象毎にループ
        for (const targetSprite of animationSprite._targets) {
            // 対象が不一致ならば削除しない。
            if (targets.length > 0
                    && !targets.includes(targetSprite._character)) {
                continue;
            }

            //------------------------------------------------
            // ここまで来たならば、条件に一致しているということ。
            //------------------------------------------------

            // 予約されているアニメーションを削除
            targetSprite._animations = [];
            removeFlg = true;
        }

        if (removeFlg) {
            // 再生中のアニメーションを削除
            spriteset.removeAnimation(animationSprite);
        }
    }
});

/**
 * ●アニメーションの削除（戦闘）
 */
PluginManager.registerCommand(PLUGIN_NAME, "removeAnimationBattle", function(args) {
    // 戦闘中以外は無効
    if (!$gameParty.inBattle()) {
        return;
    }

    const skillId = eval(getCommandValue(args.skillId));
    const targetCondition = getCommandValue(args.targetCondition);
    const subjectCondition = getCommandValue(args.subjectCondition);

    // 行動主体を取得
    let subject = undefined;
    if (subjectCondition) {
        subject = BattleManager.allBattleMembers().find(a => eval(subjectCondition));
    }
    // 対象を取得
    let targets = undefined;
    if (targetCondition) {
        targets = BattleManager.allBattleMembers().filter(a => eval(targetCondition));
    }

    const spriteset = getSpriteset();

    // 再生中の全アニメーションでループ
    for (const animationSprite of spriteset._animationSprites.clone()) {
        const dynamicAnimation = animationSprite.dynamicAnimation;
        // DynamicAnimationでないなら処理しない。
        if (!dynamicAnimation) {
            continue;
        }

        const baseAnimation = dynamicAnimation.baseAnimation;

        // スキルＩＤが条件に設定されている。
        if (skillId) {
            const id = baseAnimation.action.item().id;

            // スキルＩＤが一致していないなら処理しない
            if (skillId != id) {
                continue;
            }
        }

        // 行動主体が条件に設定されている。
        if (subject) {
            // 行動主体が一致していないなら処理しない
            if (subject != baseAnimation.getSubject()) {
                continue;
            }
        }

        let removeFlg = false;

        // アニメーションの対象毎にループ
        for (const targetSprite of animationSprite._targets) {
            // 対象が不一致ならば削除しない。
            if (targets && targets.length > 0
                    && !targets.includes(targetSprite._battler)) {
                continue;
            }

            //------------------------------------------------
            // ここまで来たならば、条件に一致しているということ。
            //------------------------------------------------
            // 予約されているアニメーションを削除
            targetSprite._battler._animations = [];
            removeFlg = true;
        }

        if (removeFlg) {
            // 再生中のアニメーションを削除
            spriteset.removeAnimation(animationSprite);
        }
    }
});

/**
 * ●lastDynamicTargetIdを元に最終ターゲットを取得する。
 */
Game_Interpreter.prototype.getLastDynamicTarget = function() {
    return this.getDynamicTarget(this._lastDynamicTargetId);
}

/**
 * ●dynamicSubjectIdを元に行動主体を取得する。
 */
Game_Interpreter.prototype.getDynamicSubject = function() {
    return this.getDynamicTarget(this._dynamicSubjectId);
}

/**
 * 【独自】マップ版DynamicAnimationを開始する。
 * ※NRP_DynamicReadTxtとの連携用にメソッド分割
 */
Game_Interpreter.prototype.startDynamicAnimation = function(targets, action, mapAnimation) {
    // 空のWindow_BattleLogを作成し、DynamicAnimationを起動
    const win = new Window_BattleLog(new Rectangle());
    win.showDynamicAnimation(targets, action, false, mapAnimation);
}

/**
 * ●アニメーションの表示（戦闘用）
 */
PluginManager.registerCommand(PLUGIN_NAME, "showAnimationBattle", function(args) {
    // 戦闘中以外は無効
    if (!$gameParty.inBattle()) {
        return;
    }

    const skillId = eval(getCommandValue(args.skillId));
    const targetCondition = getCommandValue(args.targetCondition);
    const subjectCondition = getCommandValue(args.subjectCondition);

    let wait = false; // デフォルトはウェイトなし

    // オプション情報
    if (args.option) {
        const option = JSON.parse(args.option);
        wait = toBoolean(option.wait);
    }

    // 戦闘中のアニメーション表示
    showBattleAnimation.bind(this)(skillId, targetCondition, subjectCondition, wait);
});

/**
 * ●アニメーションの表示（戦闘用）
 * ※bindによってinterpreterをthisに渡して用いる。
 */
function showBattleAnimation(skillId, targetCondition, subjectCondition, wait) {
    // 行動主体を取得（指定がなければ適当に先頭）
    let subject = $gameParty.members()[0];
    if (subjectCondition) {
        subject = BattleManager.allBattleMembers().find(a => eval(subjectCondition));
        // 取得できなければ不発
        if (!subject) {
            return;
        }
    }
    // 対象を取得（指定がなければ適当に先頭）
    let targets = [$gameParty.members()[0]];
    if (targetCondition) {
        targets = BattleManager.allBattleMembers().filter(a => eval(targetCondition));
        // 取得できなければ不発
        if (targets.length == 0) {
            return;
        }
    }
    
    // アクション情報を作成
    const action = makeAction(skillId)
    const mapAnimation = makeMapAnimationBattle(this, subject, wait, action, targets)
    
    // DynamicAnimation開始
    this.startDynamicAnimation(targets, action, mapAnimation);
}

/**
 * ●呼出元が並列処理かどうか？
 * ※通常戦闘中に並列コモンイベントが呼び出されることはないので、
 * 　他プラグインとの連携を想定
 */
function isParallel(interpreter) {
    let commonEvents;
    // $gameTroopにコモンイベントを登録するタイプのプラグインにも対応
    if ($gameTroop._commonEvents) {
        commonEvents = $gameTroop._commonEvents;
    // 通常は$gameMapを想定
    } else {
        commonEvents = $gameMap._commonEvents;
    }
    // interpreterが一致かつ有効な並列イベントである。
    return commonEvents.some(common => common._interpreter == interpreter && common.isActive());
}

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
 * ●引数を元に対象（行動主体）の配列を取得する。
 * ※bindによってinterpreterをthisに渡して用いる。
 */
function makeTargetsAndSubjects(targetId) {
    const targets = [];
    
    // 無効なら処理しない。
    if (targetId === undefined || targetId === null || targetId === "") {
        return targets;
    }

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
                    if (this.characterAndFollower(evalId)) {
                        targets.push(this.characterAndFollower(evalId));
                    }
                }
            } else {
                for (let i = idRangeStart; i <= idRangeEnd; i++) {
                    const evalId = eval(i);
                    if (this.characterAndFollower(evalId)) {
                        targets.push(this.characterAndFollower(evalId));
                    }
                }
            }
            
        // 通常時
        } else {
            const evalId = eval(id);
            if (this.characterAndFollower(evalId)) {
                targets.push(this.characterAndFollower(evalId));
            }
        }
    }
    return targets;
}

/**
 * ●アクション情報の作成
 */
function makeAction(itemId, battleSubject, isItem) {
    // 適当に先頭のキャラを行動主体にしてアクションを作成
    // ※行動主体の情報は基本的に使わないので実際はほぼダミー
    let subject = $gameParty.members()[0];
    if (battleSubject) {
        subject = battleSubject;
    }
    const action = new Game_Action(subject);
    // アイテムかスキルかで分岐
    if (isItem) {
        action.setItem(itemId);
    } else {
        action.setSkill(itemId);
    }

    return action;
}

/**
 * ●マップアニメーション用情報を作成
 */
function makeMapAnimation(interpreter, subject, wait, noScroll, action) {
    // 始点の初期値はプレイヤー
    if (subject === undefined) {
        subject = $gamePlayer;
    }
    // 引き継ぎたい情報をセット
    const mapAnimation = [];
    mapAnimation.subject = subject;
    mapAnimation.interpreter = interpreter;
    mapAnimation.noWait = !toBoolean(wait); // 反転させておく
    mapAnimation.onScroll = !toBoolean(noScroll); // 反転させておく
    // 呼出元が並列処理（trigger:4）かどうか？
    const event = $gameMap.event(interpreter.eventId());
    if (event && event._trigger == 4) {
        mapAnimation.isParallel = true;
    }
    // 開始時間の設定
    const startTimingTarget = getStartTimingTarget(interpreter);
    setStartTiming(mapAnimation, action, startTimingTarget);

    return mapAnimation;
}

/**
 * ●マップアニメーション用情報を作成（戦闘時）
 */
function makeMapAnimationBattle(interpreter, subject, wait, action, targets) {
    const mapAnimation = [];
    mapAnimation.subject = subject;
    mapAnimation.interpreter = interpreter;
    mapAnimation.noWait = !toBoolean(wait); // 反転させておく

    // 設定があればウェイト
    if (!mapAnimation.noWait) {
        interpreter.setWaitMode("animation");
        interpreter._onDynamicAnimation = true; // 実行中判定
        // タイミングを測るためアニメーションの最終対象を保持しておく
        interpreter._lastDynamicTargetId = interpreter.getDynamicTargetId(targets[targets.length - 1]);
        // モーション判定用の行動主体
        interpreter._dynamicSubjectId = interpreter.getDynamicTargetId(subject);

        // ＭＶの場合
        // ※ＭＺでは循環参照になるので厳禁！
        if (Utils.RPGMAKER_NAME == "MV") {
            interpreter._character = targets[targets.length - 1];
        }
    }

    // 呼出元が並列処理かどうか？
    mapAnimation.isParallel = isParallel(interpreter);
    // 開始時間の設定
    const startTimingTarget = getStartTimingTarget(interpreter);
    setStartTiming(mapAnimation, action, startTimingTarget);

    return mapAnimation;
}

/**
 * ●開始時間の設定
 */
function setStartTiming(mapAnimation, action, startTimingTarget) {
    // メモ欄から開始タイミングを取得
    const startTiming = getStartTiming(action);
    // 設定があるなら制御
    if (startTiming) {
        const itemId = action.item().id;
        // 未登録の場合のみ処理
        // ※二回目以降は処理しない
        if (!startTimingTarget.includesDynamicStartSkill(itemId)) {
            // 開始時間を設定
            mapAnimation.startTiming = startTiming
            // スキルＩＤをイベントに設定
            // これにより、一度だけ開始時間処理を行うようにする。
            startTimingTarget.setDynamicStartSkill(itemId);
        }
    }
}

/**
 * ●開始時間の管理対象を取得
 */
function getStartTimingTarget(interpreter) {
    // コモンイベントが存在すればコモンイベントを取得
    for (const commonEvent of $gameMap._commonEvents) {
        if (commonEvent._interpreter == interpreter) {
            return commonEvent;
        }
    }

    // 実行元のイベントを取得
    const event = $gameMap.event(interpreter._eventId);
    if (event) {
        return event;
    }

    // 取得できなければプレイヤーを設定
    return $gamePlayer;
}

/**
 * ●開始時間を取得
 */
function getStartTiming(action) {
    // <D-StartTiming:*>を取得
    const setting = action.getDynamicNote().match("<" + STARTTIMING_TAG_NAME + "\\s*:(.*)>");
    if (setting) {
        return setting[1];
    }
    return 0;
};

/**
 * ●戦闘終了時
 * ※アニメーション終了後に実行する必要があるため、
 * 　BattleManager.endBattleではなくここでやる。
 */
const _Scene_Battle_terminate = Scene_Battle.prototype.terminate;
Scene_Battle.prototype.terminate = function() {
    _Scene_Battle_terminate.apply(this, arguments);

    // 戦闘用コモンイベントのDynamicAnimationのフラグをクリア
    // ※NRP_BattleParallelCommon.jsとの連携
    if ($gameMap._battleCommonEvents) {
        for (const commonEvent of $gameMap._battleCommonEvents) {
            clearRunningEvent(commonEvent);
        }
    }
};

/**
 * 【独自】DynamicAnimationの途中実行制御フラグ
 */
Game_Character.prototype.includesDynamicStartSkill = function(skillId) {
    // 初期化されていない
    if (this._dynamicStartSkills === undefined) {
        return false;
    }

    // 既に登録済ならば
    if (this._dynamicStartSkills.includes(skillId)) {
        return true;
    }
    return false;
};
Game_Battler.prototype.includesDynamicStartSkill = function(skillId) {
    // 初期化されていない
    if (this._dynamicStartSkills === undefined) {
        return false;
    }

    // 既に登録済ならば
    if (this._dynamicStartSkills.includes(skillId)) {
        return true;
    }
    return false;
};
Game_CommonEvent.prototype.includesDynamicStartSkill = function(skillId) {
    // 初期化されていない
    if (this._dynamicStartSkills === undefined) {
        return false;
    }

    // 既に登録済ならば
    if (this._dynamicStartSkills.includes(skillId)) {
        return true;
    }
    return false;
};

/**
 * 【独自】DynamicAnimationの途中実行制御フラグ
 */
Game_Character.prototype.setDynamicStartSkill = function(skillId) {
    // 初期化されていないならば初期化
    if (this._dynamicStartSkills === undefined) {
        this._dynamicStartSkills = [];
    }
    // 登録
    this._dynamicStartSkills.push(skillId);
};
Game_Battler.prototype.setDynamicStartSkill = function(skillId) {
    // 初期化されていないならば初期化
    if (this._dynamicStartSkills === undefined) {
        this._dynamicStartSkills = [];
    }
    // 登録
    this._dynamicStartSkills.push(skillId);
};
Game_CommonEvent.prototype.setDynamicStartSkill = function(skillId) {
    // 初期化されていないならば初期化
    if (this._dynamicStartSkills === undefined) {
        this._dynamicStartSkills = [];
    }
    // 登録
    this._dynamicStartSkills.push(skillId);
};

/**
 * 【独自】DynamicAnimationの途中実行制御フラグをクリア
 */
Game_Character.prototype.clearDynamicStartSkill = function() {
    this._dynamicStartSkills = [];
    this.dynamicDuration = 0;
};
Game_Battler.prototype.clearDynamicStartSkill = function() {
    this._dynamicStartSkills = [];
    this.dynamicDuration = 0;
};
Game_CommonEvent.prototype.clearDynamicStartSkill = function() {
    this._dynamicStartSkills = [];
    this.dynamicDuration = 0;
};

/**
 * ●戦闘開始時
 */
const _Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
Game_Battler.prototype.onBattleStart = function(advantageous) {
    this.clearDynamicStartSkill();
    _Game_Battler_onBattleStart.apply(this, arguments);
};

/**
 * ●イベントが範囲対象外かどうか？
 */
function isOutOfRange(event, targetRangeGrid) {
    // 範囲指定がある場合
    if (targetRangeGrid > 0) {
        // 画面中央の座標を取得
        const centerX = Graphics.width / 2;
        const centerY = Graphics.height / 2;
        // イベントの画面座標を取得
        const eventX = $gameMap.mapToCanvasX(event.x);
        const eventY = $gameMap.mapToCanvasY(event.y);
        // 差分を求める
        const diffX = Math.abs(centerX - eventX) / $gameMap.tileWidth();
        const diffY = Math.abs(centerY - eventY) / $gameMap.tileHeight();
        // 長辺を取得
        const diff = Math.max(diffX, diffY);
        
        // 距離が指定範囲よりも離れているなら対象外
        if (diff > targetRangeGrid) {
            return true;
        }
    }

    return false;
}

/**
 * 【独自】キャラクター取得時、-2以下はフォロワーとして取得する。
 */
Game_Interpreter.prototype.characterAndFollower = function(param) {
    if ($gameParty.inBattle()) {
        return null;
    // フォロワーを取得
    } else if (param <= -2) {
        // -2 -> 0, -3 -> 1というように変換
        const n = Math.abs(param) - 2;
        return $gamePlayer.followers().follower(n);
    } else if (param < 0) {
        return $gamePlayer;
    } else if (this.isOnCurrentMap()) {
        return $gameMap.event(param > 0 ? param : this._eventId);
    } else {
        return null;
    }
};

/**
 * 【独自】DynamicTargetIdを元に戦闘、マップを問わずに対象を取得する。
 */
Game_Interpreter.prototype.getDynamicTarget = function(dynamicId) {
    // 戦闘
    if ($gameParty.inBattle()) {
        // １以上はエネミー
        if (dynamicId > 0) {
            const index = dynamicId - 1;
            return $gameTroop.members()[index];

        // －１以下はアクター
        } else if (dynamicId < 0) {
            const index = dynamicId * -1 - 1;
            return $gameParty.members()[index];
        }

    // マップ
    } else {
        return this.characterAndFollower(dynamicId);
    }
}

/**
 * 【独自】戦闘時はアクター、エネミー
 * マップ時はイベント、プレイヤー、フォロワーを一意に識別するためのＩＤを取得する。
 */
Game_Interpreter.prototype.getDynamicTargetId = function(target) {
    // ■戦闘時
    // エネミーは1, 2, 3, 4...
    // アクターは-1, -2, -3, -4...として取得
    if ($gameParty.inBattle()) {
        if (target.isEnemy()) {
            return target.index() + 1;
        } else {
            return (target.index() + 1) * -1;
        }
    }

    // ■マップ時
    // プレイヤーは-1、フォロワーは-2, -3, -4として取得
    // フォロワーならば-2以下に変換して返す
    for (let i = 0; i < $gamePlayer.followers()._data.length; i++) {
        const follower = $gamePlayer.followers().follower(i);
        if (follower == target) {
            // 0 -> -2, 1 -> -3というように変換
            return i * -1 - 2;
        }
    }

    // イベントＩＤがあればそのまま返す
    if (target._eventId) {
        return target._eventId;
    }

    // それ以外はプレイヤー
    return -1;
}

//----------------------------------------
// マップ用共通処理
//----------------------------------------

/**
 * ●初期化
 */
const _Game_Map_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
    _Game_Map_initialize.apply(this, arguments);

    this._beforeDisplayScreenX = this.displayX() * this.tileWidth();
    this._beforeDisplayScreenY = this.displayY() * this.tileHeight();
};

/**
 * ●更新処理
 */
const _Game_Map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function(sceneActive) {
    _Game_Map_update.apply(this, arguments);

    // 現在の画面座標
    const displayScreenX = this.displayX() * this.tileWidth();
    const displayScreenY = this.displayY() * this.tileHeight();

    // 画面座標を保持
    this._beforeDisplayScreenX = displayScreenX;
    this._beforeDisplayScreenY = displayScreenY;
};

/**
 * 【独自】１フレームでスクロールしたスクリーンＸ座標
 */
Game_Map.prototype.moveScreenX = function() {
    // 現在の座標と前回の座標を比較し差分を求める。
    const displayScreenX = this.displayX() * this.tileWidth();
    let moveScreenX = displayScreenX - this._beforeDisplayScreenX;

    // マップ全体の横幅（ピクセル）
    const mapWidth = this.width() * this.tileWidth();
    // 全体座標の半分以上を移動した（ループ）
    if (moveScreenX > mapWidth / 2) {
        moveScreenX -= mapWidth;
    } else if (moveScreenX < mapWidth / 2 * -1) {
        moveScreenX += mapWidth;
    }

    return moveScreenX;
};

/**
 * 【独自】１フレームでスクロールしたスクリーンＹ座標
 */
Game_Map.prototype.moveScreenY = function() {
    // 現在の座標と前回の座標を比較し差分を求める。
    const displayScreenY = this.displayY() * this.tileHeight();
    let moveScreenY = displayScreenY - this._beforeDisplayScreenY;

    // マップ全体の縦幅（ピクセル）
    const mapHeight = this.height() * this.tileHeight();
    // 全体座標の半分以上を移動した（ループ）
    if (moveScreenY > mapHeight / 2) {
        moveScreenY -= mapHeight;
    } else if (moveScreenY < mapHeight / 2 * -1) {
        moveScreenY += mapHeight;
    }

    return moveScreenY;
};

/**
 * 【独自】マップＸ座標を画面Ｘ座標に変換する。
 */
Game_Map.prototype.mapToCanvasX = function(mapX) {
    const tileWidth = this.tileWidth();
    // グリッドの左上が基準なので0.5補正
    return ($gameMap.adjustX(mapX) + 0.5) * tileWidth;
};

/**
 * 【独自】マップＹ座標を画面Ｙ座標に変換する。
 */
Game_Map.prototype.mapToCanvasY = function(mapY) {
    const tileHeight = this.tileHeight();
    // グリッドの左上が基準なので0.5補正
    return ($gameMap.adjustY(mapY) + 0.5) * tileHeight;
};

//----------------------------------------
// DynamicAnimation関連
//----------------------------------------

/**
 * 【独自】動的アニメーションをキャラクターにセットする。
 */
Game_CharacterBase.prototype.setDynamicAnimation = function(dynamicAnimation) {
    // 処理をSpriteで実行
    // ※Game_CharacterBaseは$gameMapのセーブファイルに含まれるため、
    // 　dynamicAnimationが保存されないようにする。
    const sprite = getSprite(this);
    sprite.setDynamicAnimation(dynamicAnimation);
};

/**
 * 【独自】動的アニメーションをSpriteにセットする。
 */
Sprite_Character.prototype.setDynamicAnimation = function(dynamicAnimation) {
    let delay = dynamicAnimation.targetDelay;

    const mapAnimation = dynamicAnimation.baseAnimation.mapAnimation;
    // 開始時間が設定されている場合、始動を早める。
    if (mapAnimation && mapAnimation.startTiming) {
        const startDuration = mapAnimation.startTiming * pCalculationRate;
        delay -= startDuration;
        if (delay < 0) {
            delay = 0;
        }
    }

    const data = {
        animationId: dynamicAnimation.id,
        mirror: dynamicAnimation.mirror,
        delay: delay,
        dynamicAnimation: dynamicAnimation
    };
    this._animations.push(data);
};

/**
 * ●アニメーション更新
 * ※元々ＭＶのみに存在する処理
 */
const _Sprite_Character_updateAnimation = Sprite_Character.prototype.updateAnimation;
Sprite_Character.prototype.updateAnimation = function() {
    const spriteset = getSpriteset();
    if (spriteset && spriteset._requestDynamicAnimation) {
        this.setupDynamicAnimation();
    }

    // ＭＶでは吹き出しの制御なども行っているので呼び出し
    if (_Sprite_Character_updateAnimation) {
        _Sprite_Character_updateAnimation.apply(this, arguments);
    }
};

/**
 * ●アニメーション呼び出し
 */
Sprite_Character.prototype.setupDynamicAnimation = function() {
    const spriteset = getSpriteset();
    // 準備完了ではない場合は処理しない。
    if (!spriteset._isDynamicAnimationReady) {
        return;
    }

    // delayの昇順でソートする。
    if (this.isAnimationRequested()) {
        this.animations().sort(function(a, b) {
            return a.delay - b.delay;
        });
    }

    // アニメーションが予約されている限り実行
    while (this.isAnimationRequested()) {
        // 次に処理されるアニメーション情報
        const nextAnimation = this.animations()[0];
        
        // 前のアニメーションがウェイト対象の場合
        if (this.isWaitAnimation(nextAnimation.dynamicAnimation)) {
            // 処理終了（時間も進めない）
            return;
        }

        // まだ時間でない場合は処理しない
        if (nextAnimation.delay > 0) {
            // 時間経過へ
            break;
        }

        // 実行条件を満たしたのでshiftする。
        var data = this.shiftAnimation();

        // 動的アニメーションをセットする。
        this.startDynamicAnimation(data.dynamicAnimation);
    }

    // 時間経過
    for (const animation of this.animations()) {
        animation.delay--;
    }
};

/**
 * 【独自】終了待機中のアニメーションがあれば待つ
 */
Sprite_Character.prototype.isWaitAnimation = function(dynamicAnimation) {
    const spriteset = getSpriteset();
    // 実行中のウェイト対象アクションがあれば番号を取得
    const waitActionNo = spriteset._waitActionNo;
    if (waitActionNo) {
        // 現在実行中のアクションより番号が小さいアクションが、ウェイト対象ならば終了を待つ
        if (waitActionNo < dynamicAnimation.actionNo) {
            return true;
        }
    }
    return false;
}

// /**
//  * ●アニメーションの実行中判定
//  * ※実際にはウェイト判定に使う。
//  */
// const _Spriteset_Map_isAnimationPlaying = Spriteset_Map.prototype.isAnimationPlaying;
// Spriteset_Map.prototype.isAnimationPlaying = function() {
//     // 全てのアニメーションがnoWaitならば待たない。
//     if (this._animationSprites.length > 0
//             && this._animationSprites.every(sprite => sprite.dynamicAnimation && sprite.dynamicAnimation.noWait)) {
//         return false;
//     }

//     return _Spriteset_Map_isAnimationPlaying.apply(this, arguments);
// };

/**
 * ●アニメーションのリクエストによるウェイトが必要かどうか？
 */
Sprite_Character.prototype.isAnimationRequestWait = function() {
    // リクエストが存在する。
    if (this.isAnimationRequested()) {
        // noWaitのDynamicAnimationのみならばウェイトなし
        const noWait = this.animations().every(animation =>
            animation.dynamicAnimation && animation.dynamicAnimation.noWait);
        if (!noWait) {
            return true;
        }
    }
    return false;
};

Sprite_Character.prototype.isAnimationRequested = function() {
    return this.animations().length > 0;
};

/**
 * ●アニメーション情報取得
 */
Sprite_Character.prototype.animations = function() {
    return this._animations;
};

Sprite_Character.prototype.shiftAnimation = function() {
    return this._animations.shift();
};

var _Sprite_Character_initMembers = Sprite_Character.prototype.initMembers;
Sprite_Character.prototype.initMembers = function() {
    _Sprite_Character_initMembers.apply(this, arguments);

    this._animations = [];
};

/**
 * 【独自】動的アニメーションの呼び出し
 */
Sprite_Character.prototype.startDynamicAnimation = function(dynamicAnimation) {
    // ダメージ処理
    if (dynamicAnimation.afterDamage) {
        // 通常は不要だが、外部プラグインとの連携用に呼び出す
        BattleManager.dynamicDamageControl(dynamicAnimation);
        return;
    }

    const animation = dynamicAnimation.spriteAnimation._animation;

    // MV用
    if (Utils.RPGMAKER_NAME == "MV") {
        var sprite = new Sprite_Animation();
        sprite.dynamicAnimation = dynamicAnimation;
        sprite.setup(this._effectTarget, animation, false, 0);
        this.parent.addChild(sprite);
        this._animationSprites.push(sprite);

    // MZ用
    } else {
        // スプライト情報が書き換わっている場合があるので、
        // 再びキャラクターに紐づくスプライトを取り直す。
        // ※迂遠だが、やらないとメニューを開閉した後でエラーになる模様。
        dynamicAnimation.targetsSprite =
            dynamicAnimation.targetsSprite.map(sprite => getSprite(sprite._character));
        // 有効なデータに限定
        dynamicAnimation.targetsSprite = dynamicAnimation.targetsSprite.filter(sprite => sprite);

        const spriteset = getSpriteset();
        spriteset.createDynamicAnimation([this._character], animation, dynamicAnimation);
    }

    // ウェイト用の設定
    if (!dynamicAnimation.noWait) {
        const interpreter = dynamicAnimation.interpreter;
        // プラグインコマンドから起動した場合
        if (interpreter) {
            // DynamicAnimationの実行時間を設定
            interpreter.setDynamicDuration(dynamicAnimation);

        // イベント注釈から自動起動した場合
        } else if (dynamicAnimation.isDynamicAuto) {
            this.setDynamicAutoDuration(dynamicAnimation);
        }
    }
};

/**
 * ●DynamicAnimationの実行時間を設定
 * ※引数にはDynamicAnimationとMotionの両方が来る場合あり
 */
Game_Interpreter.prototype.setDynamicDuration = function(dynamicAction) {
    const newWaitDuration = dynamicAction.waitDuration

    this.setWaitMode("animation");

    // 現在実行中のDynamicAnimationの実行時間を取得
    let dynamicDuration = 0;
    if (this.dynamicDuration) {
        dynamicDuration = this.dynamicDuration;
    }
    // 新しく設定されるDynamicAnimationの実行時間を取得
    let waitDuration = 0;
    if (newWaitDuration) {
        waitDuration = newWaitDuration;
        // 切れ目をなくす場合、3フレーム短縮
        // ※3の根拠は不明……。実測値です。
        if (pCloseAnimationGap) {
            waitDuration -= 3;
        }
    }
    // より長いほうを採用
    dynamicDuration = Math.max(waitDuration, dynamicDuration);
    // 起動時のタイミング調整がある場合、実行時間も短縮
    // ※関数が存在する場合実行。
    //   現状はDynamicAnimationのみが対象
    if (dynamicAction.getStartTiming) {
        dynamicDuration -= dynamicAction.getStartTiming();
    }

    this.dynamicDuration = dynamicDuration;
};

/**
 * ●DynamicAnimationの実行時間を設定
 * ※メモ欄からの自動実行用
 * ※引数にはDynamicAnimationとMotionの両方が来る場合あり
 */
Sprite_Character.prototype.setDynamicAutoDuration = function(dynamicAction) {
    // 現在実行中のDynamicAnimationの実行時間を取得
    let dynamicDuration = 0;
    if (this._character.dynamicDuration) {
        dynamicDuration = this._character.dynamicDuration;
    }
    // 新しく設定されるDynamicAnimationの実行時間を取得
    let waitDuration = 0;
    if (dynamicAction.waitDuration) {
        waitDuration = dynamicAction.waitDuration;
        // 切れ目をなくす場合、1フレーム短縮
        if (pCloseAnimationGap) {
            waitDuration -= 1;
        }
    }
    // 二つを比較し、より長いほうを採用
    dynamicDuration = Math.max(waitDuration, dynamicDuration);
    // 起動時のタイミング調整がある場合、実行時間も短縮
    // ※関数が存在する場合実行。
    //   現状はDynamicAnimationのみが対象
    if (dynamicAction.getStartTiming) {
        dynamicDuration -= dynamicAction.getStartTiming();
    }

    this._character.dynamicDuration = dynamicDuration;
}

/**
 * ●開始タイミングを取得
 */
DynamicAnimation.prototype.getStartTiming = function () {
    const mapAnimation = this.baseAnimation.mapAnimation;
    // 起動時のタイミング調整がある場合、実行時間も短縮
    if (mapAnimation.startTiming) {
        return mapAnimation.startTiming * pCalculationRate;
    }
    return 0;
};

/**
 * ●ウェイト判定
 */
const _Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
Game_Interpreter.prototype.updateWaitMode = function() {
    if (this._waitMode == "animation") {
        // イベント呼出時のマップと一致している場合
        if (this.isOnCurrentMap()) {
            // DynamicAnimation開始状態
            if (this._onDynamicAnimation) {
                // Interpreterから実行中のアニメーションがあればウェイト
                if (this.isDynamicAnimationPlaying()) {
                    // 実行時間が残っている場合は時間経過
                    if (this.dynamicDuration > 0) {
                        this.dynamicDuration--;
                    }
                    return true;
                }
                return false;
            }
        }
    }

    return _Game_Interpreter_updateWaitMode.apply(this, arguments);;
};

/**
 * ●ＭＶのエラー対策用
 * ※戦闘中のthis.setWaitMode("animation");はそもそもの仕様外なので
 */
Game_Battler.prototype.isAnimationPlaying = function() {
    return false;
};

/**
 * ●更新
 */
const _Spriteset_Map_update = Spriteset_Map.prototype.update;
Spriteset_Map.prototype.update = function() {
    _Spriteset_Map_update.apply(this, arguments);

    /**
     * ●アニメーションの終了待ちを行うかを確認
     */
    if (this._waitAnimationSprites) {
        // 【ＭＺ用】アニメーションの終了待ち番号をクリア
        this._waitActionNo = undefined;
        // 終了待機が必要なアニメーションがあるかどうか確認
        if (this._waitAnimationSprites.length) {
            const dynamicAnimation = this._waitAnimationSprites[0].dynamicAnimation;
            // 終了待機中のアニメーションがあれば、その番号を設定
            this._waitActionNo = dynamicAnimation.waitActionNo;
        }
    }
};

/**
 * 【独自】DynamicAnimationが実行中かどうか確認
 * 並列処理も考慮
 */
Game_Interpreter.prototype.isDynamicAnimationPlaying = function() {
    // 実行時間が残っている場合
    if (this.dynamicDuration > 0) {
        // 処理中と判断
        return true;
    }

    // リクエスト中のDynamicAnimationを検索
    // ※最終ターゲットがリクエスト情報を持っているかどうかで判定する。
    const lastDynamicTarget = this.getLastDynamicTarget();
    if (lastDynamicTarget) {
        const sprite = getSprite(lastDynamicTarget);
        if (sprite) {
            for (const animation of sprite.animations()) {
                const da = animation.dynamicAnimation;
                // interpreterが一致（呼び出したイベントが一致）
                if (da && this == da.interpreter) {
                    // 実行中と判定
                    return true;
                }
            }

            // 【ＭＶ用】DynamicAnimationの実行が存在するかどうか？
            // ※ＭＶでは各スプライト（バトラー or キャラ）が保有する。
            if (sprite._animationSprites) {
                const onDynamicAnimation = sprite._animationSprites.some(function(animationSprite) {
                    return animationSprite.dynamicAnimation
                        && this == animationSprite.dynamicAnimation.interpreter;
                }, this);
                if (!onDynamicAnimation) {
                    // DynamicAnimationの実行解除
                    this._onDynamicAnimation = false;
                }
            }
        }
    }

    // 【ＭＺ用】DynamicAnimationの実行が存在するかどうか？
    // ※ＭＺではspritesetが保有する。
    const spriteset = getSpriteset();
    if (spriteset._animationSprites) {
        const animationSprite = spriteset._animationSprites.find(function(animationSprite) {
            return animationSprite.dynamicAnimation
                && this == animationSprite.dynamicAnimation.interpreter;
        }, this);

        // DynamiAnimationが実行中の場合
        if (animationSprite) {
            const dynamicAnimation = animationSprite.dynamicAnimation;
            // ＭＺアニメかつ、wait == "auto"ならば待つ
            if (dynamicAnimation && !dynamicAnimation.mv && dynamicAnimation.baseAnimation.wait == "auto") {
                return true;
            }
        } else {
            // DynamicAnimationの実行解除
            this._onDynamicAnimation = false;
        }
    }

    return false;
};

/**
 * ●キャラクター（バトラー）からスプライトを取得する。
 */
function getSprite(character) {
    const spriteset = getSpriteset();
    if (!spriteset) {
        return undefined;
    }
    
    // マップ上ではキャラクタースプライトを返す。
    if (!$gameParty.inBattle()) {
        const sprites = spriteset._characterSprites;
        return sprites.find(function(sprite) {
            return sprite._character == character;
        });

    // 戦闘中はバトラースプライトを返す。
    } else  {
        const sprites = spriteset.battlerSprites();
        return sprites.find(function(sprite) {
            return sprite._battler == character;
        });
    }
}

/**
 * ●更新メイン
 */
var _Sprite_Character_update = Sprite_Character.prototype.update;
Sprite_Character.prototype.update = function() {
    _Sprite_Character_update.apply(this, arguments);

    // MZには存在しないため、MVから移植
    if (Utils.RPGMAKER_NAME != "MV") {
        this.updateAnimation();
    }

    // DynamicMotionが有効な場合のみ呼び出し
    if (this._character && this.updateDynamicMotion) {
        // 動的モーションの更新
        this.updateDynamicMotion();
    }
};

/**
 * ●エラーにならないよう関数を実装
 */
Game_CharacterBase.prototype.isActor = function() {
    return false;
};
Game_CharacterBase.prototype.isEnemy = function() {
    return false;
};
Sprite_Character.prototype.isActor = function() {
    return false;
};
Sprite_Character.prototype.isEnemy = function() {
    return false;
};
Sprite_Character.prototype.getMain = function() {
    return this;
};

//----------------------------------------
// セーブ＆ロード時
//----------------------------------------

if (pEventResetOnLoad) {
    /**
     * ●ロード時のデータ展開
     */
    const _DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        _DataManager_extractSaveContents.apply(this, arguments);

        // マップイベント
        for (const event of $gameMap.events()) {
            // 4:並列処理
            if (event._trigger === 4) {
                // 実行中のイベントをクリア
                clearRunningEvent(event);
            // 注釈起動用のスキルが設定されていた場合
            } else if (event._dynamicSkill) {
                // DynamicAnimationの途中実行制御フラグをクリア
                event.clearDynamicStartSkill();
            }
        }

        // コモンイベント（並列）
        for (const commonEvent of $gameMap._commonEvents) {
            // 実行中のイベントをクリア
            clearRunningEvent(commonEvent);
        }
    };
}

/**
 * ●実行中のイベントをクリアする。
 */
function clearRunningEvent(event) {
    if (event._interpreter && event._interpreter.isRunning()) {
        // DynamicAnimation実行状態なら、イベントの実行状況もクリア
        // ※そうしないと再開時にアニメーションが途切れてしまう。
        if (event._dynamicStartSkills && event._dynamicStartSkills.length) {
            event._interpreter = new Game_Interpreter();
            // DynamicAnimationの途中実行制御フラグをクリア
            event.clearDynamicStartSkill();
        }
    }
}

//----------------------------------------
// シーン切替時の情報保持
//----------------------------------------

/**
 * ●場所移動
 */
const _Scene_Map_updateTransferPlayer = Scene_Map.prototype.updateTransferPlayer;
Scene_Map.prototype.updateTransferPlayer = function() {
    if ($gamePlayer.isTransferring()) {
        // 場所移動したので保存データをクリア
        clearTempData();
    }

    _Scene_Map_updateTransferPlayer.apply(this, arguments);
};

/**
 * ●シーン変更
 */
const _SceneManager_changeScene = SceneManager.changeScene;
SceneManager.changeScene = function() {
    if (this.isSceneChanging() && !this.isCurrentSceneBusy()) {
        // Scene_Mapから移動する場合
        if (this._scene && this._scene instanceof Scene_Map) {
            // 場所移動時
            if ($gamePlayer.isTransferring()) {
                // 同一マップの場合はアニメーション状態を保持
                // ※ただし、リロード時は除外
                if ($gamePlayer.newMapId() == $gameMap.mapId() && !$gamePlayer._needsMapReload) {
                    this._scene._spriteset.saveAnimationTempData();
                // マップが変化した場合は保存データクリア
                } else {
                    clearTempData();
                }
                
            // アニメーション状態を保持
            } else {
                this._scene._spriteset.saveAnimationTempData();
            }
        }
    }

    _SceneManager_changeScene.apply(this, arguments);
};

/**
 * 【独自】アニメーション維持用の一時データを保存する。
 */
Spriteset_Map.prototype.saveAnimationTempData = function() {
    // アニメーションを保持する場合
    if (pKeepAnimation) {
        // アニメーション情報を$gameTempに保持しておく
        $gameTemp.animationSprites = [];

        // ＭＶ用（各spriteに保有）
        if (Utils.RPGMAKER_NAME == "MV") {
            for (const sprite of this._characterSprites) {
                if (sprite._animationSprites) {
                    for (const animationSprite of sprite._animationSprites) {
                        // 復元用に親への参照を設定しておく
                        animationSprite.parentSprite = sprite;
                        $gameTemp.animationSprites.push(animationSprite);
                    }
                }
            }
        // ＭＺ用（spritesetに保有）
        } else {
            for (const animationSprite of this._animationSprites) {
                $gameTemp.animationSprites.push(animationSprite);
            }
        }

        // DynamicAnimationのリクエスト情報を$gameTempに保持しておく
        $gameTemp.animationsMap = new Map();
        for (const sprite of this._characterSprites) {
            if (sprite.animations() && sprite.animations().length) {
                // メニューからの復帰用に対象を保持する。
                // 対象ＩＤを取得
                const targetId = this.getSaveDynamicTargetId(sprite._character);
                // 対象ＩＤをキーにしてマッピング
                $gameTemp.animationsMap.set(targetId, sprite._animations);
            }
        }
    }
};

/**
 * 【独自】リクエスト保管用のtargetIdを保持する。
 */
Spriteset_Map.prototype.getSaveDynamicTargetId = function(character) {
    // メニューからの復帰用に対象を保持する。
    let targetId;

    // フォロワーの場合、隊列の何番目かを取得
    const followerNo = $gamePlayer.followers()._data.indexOf(character);

    // フォロワー（-2～として取得）
    if (followerNo >= 0) {
        // 0 -> -2, 1 -> -3変換
        targetId = followerNo * -1 - 2;
    // プレイヤー
    } else if (character == $gamePlayer) {
        targetId = -1;
    // それ以外はイベントＩＤ
    } else {
        targetId = character._eventId;
    }

    return targetId;
}

/**
 * ●マップスプライトの初期化
 */
const _Spriteset_Map_initialize = Spriteset_Map.prototype.initialize;
Spriteset_Map.prototype.initialize = function() {
    _Spriteset_Map_initialize.apply(this, arguments);

    // Spriteset_Base.prototype.initializeでanimationSpritesが初期化されているため、
    // ここでアニメーション情報を再生成する。
    this.createAnimations();
};

/**
 * 【独自】アニメーションスプライトの引継
 */
Spriteset_Map.prototype.createAnimations = function() {
    // $gameTempから読み出して再設定
    if ($gameTemp.animationSprites) {
        for (const oldSprite of $gameTemp.animationSprites) {
            const animation = oldSprite._animation
            const mirror = oldSprite._mirror;

            // ＭＶ用（各spriteに保有）
            if (Utils.RPGMAKER_NAME == "MV") {
                // 保存時とは別のオブジェクトになっているのでＩＤから再取得
                const parentSprite = this.getNewSprite(oldSprite.parentSprite);
                if (parentSprite) {
                    const sprite = new Sprite_Animation();
                    sprite.dynamicAnimation = oldSprite.dynamicAnimation;
                    sprite.setup(parentSprite._effectTarget, animation, mirror, 0);

                    // 時間を再設定
                    sprite._duration = oldSprite._duration;

                    parentSprite.parent.addChild(sprite);
                    parentSprite._animationSprites.push(sprite);
                }

            // ＭＺ用（spritesetに保有）
            } else {
                const mv = this.isMVAnimation(animation);

                // 対象はＭＶアニメーションのみ
                // ※ＭＺ用は途中再開の方法が分かりません……。
                if (!mv) {
                    continue;
                }
    
                const sprite = new (mv ? Sprite_AnimationMV : Sprite_Animation)();
    
                // 保存時とは別のオブジェクトになっているのでＩＤから再取得
                const targetSprites = oldSprite._targets.map(sprite => this.getNewSprite(sprite));
                // 有効な要素が取得できなければ処理しない。
                // ※ないはずだが念のため。
                if (!targetSprites || !targetSprites.some(t => t)) {
                    continue;
                }
                sprite.targetObjects = targetSprites.map(sprite => sprite._character);
    
                // DynamicAnimationを再設定して引継
                if (oldSprite.dynamicAnimation) {
                    const dynamicAnimation = oldSprite.dynamicAnimation;
                    // スプライトを現在のマップのものへ更新
                    dynamicAnimation.referenceSubject = this.getNewSprite(dynamicAnimation.referenceSubject);
                    dynamicAnimation.referenceTarget = this.getNewSprite(dynamicAnimation.referenceTarget);
                    dynamicAnimation.targetsSprite =
                        dynamicAnimation.targetsSprite.map(sprite => this.getNewSprite(sprite));
                    sprite.dynamicAnimation = dynamicAnimation;
                }
    
                sprite.setup(targetSprites, animation, mirror, 0, null);
    
                // 時間を再設定
                sprite._duration = oldSprite._duration;

                this._effectsContainer.addChild(sprite);
                this._animationSprites.push(sprite);
            }
        }

        // 2/60秒ズレるっぽいので調整して終了を早める。
        // ※根拠不明（恐らくはシーン遷移→復帰の各1フレーム）
        for (const event of $gameMap.events()) {
            if (event.dynamicDuration) {
                event.dynamicDuration -= 2;
            }
        }
    }

    // DynamicAnimationのリクエストが存在する。
    if ($gameTemp.animationsMap && $gameTemp.animationsMap.size > 0) {
        // 対象ＩＤを元に対象のスプライトへ、アニメーションの順次実行情報を再設定する。
        for (const targetId of $gameTemp.animationsMap.keys()) {
            const sprite = this.getSpriteFromTargetId(targetId);
            if (sprite) {
                sprite._animations = $gameTemp.animationsMap.get(targetId);
            }
        }

        // リクエスト再開
        this._requestDynamicAnimation = true;
    }

    // 保存データをクリア
    clearTempData();
};

/**
 * 【独自】古いスプライト情報を元に、現在のマップに存在するスプライトを再取得する。
 * ※メニューを閉じた後は同一のオブジェクトではなくなるため。
 */
Spriteset_Map.prototype.getNewSprite = function(oldSprite) {
    const character = oldSprite._character;
    for (const sprite of this._characterSprites) {
        if (sprite._character == character) {
            return sprite;

        // イベントＩＤが一致した場合
        } else if (character._eventId && sprite._character._eventId === character._eventId) {
            return sprite;
        }
    }
};

/**
 * 【独自】対象ＩＤを元に該当のスプライトを取得する。
 */
Spriteset_Map.prototype.getSpriteFromTargetId = function(targetId) {
    for (const sprite of this._characterSprites) {
        // -2以下はフォロワー
        if (targetId <= -2) {
            // -2 -> 0, -3 -> 1というように変換
            const n = Math.abs(targetId) - 2;
            if (sprite._character == $gamePlayer.followers().follower(n)) {
                return sprite;
            }

        // ０以下ならプレイヤー
        } else if (targetId <= 0 && sprite._character == $gamePlayer) {
            return sprite;

        // イベントＩＤが一致した場合
        } else if (sprite._character._eventId === targetId) {
            return sprite;
        }
    }
};

/**
 * ●アニメーション保存用の一時データをクリアする。
 */
function clearTempData() {
    $gameTemp.animationSprites = undefined;
    $gameTemp.animationsMap = undefined;
}

//----------------------------------------
// <D-Skill>による自動実行（イベント）
//----------------------------------------

/**
 * ●ページ設定開始
 */
const _Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
    _Game_Event_setupPageSettings.apply(this, arguments);

    // 設定スキルをクリア
    this._dynamicSkill = undefined;
    this.dynamicDuration = 0;

    const list = this.list();
    // 処理が存在する場合
    if (list && list.length > 0) {
        for (const line of list) {
            // 108:注釈開始, 408:注釈続き
            if (line.code == 108 || line.code == 408) {
                // 注釈から<D-Skill:*>を取得
                let skillId = getDynamicSkill(line.parameters[0]);
                // 取得できれば実行スキルに設定
                if (skillId != undefined) {
                    this._dynamicSkill = skillId;
                    return;
                }

            // それ以外はループ終了
            } else {
                break;
            }
        }
    }

    // メモ欄から<D-Skill:*>を取得
    let skillId = getDynamicSkill(this.event().note);
    // 取得できれば実行スキルに設定
    if (skillId != undefined) {
        this._dynamicSkill = skillId;
        return;
    }
};

/**
 * ●<D-Skill>の指定があれば取得
 */
function getDynamicSkill(note) {
    // メモ欄から<D-Skill:*>を取得
    const skillStrArr = note.match("<D-Skill:([0-9]+)>");
    // 取得できれば返す
    if (skillStrArr) {
        return skillStrArr[1];
    }
}

/**
 * ●ページ設定のクリア
 */
const _Game_Event_clearPageSettings = Game_Event.prototype.clearPageSettings;
Game_Event.prototype.clearPageSettings = function() {
    _Game_Event_clearPageSettings.apply(this, arguments);

    // 設定スキルをクリア
    this._dynamicSkill = undefined;
    this.dynamicDuration = 0;
};

/**
 * ●更新処理
 */
const _Game_Event_update = Game_Event.prototype.update;
Game_Event.prototype.update = function() {
    _Game_Event_update.apply(this, arguments);

    // スキルが設定されていた場合
    if (this._dynamicSkill) {
        // アニメーションの自動実行中ならば終了を待つ
        if (this.isDynamicAutoAnimationPlaying()) {
            return;
        }

        // イベントが範囲対象外ならば処理終了
        if (isOutOfRange(this, pNoteTargetRangeGrid)) {
            return;
        }

        const targets = [this];
        const action = makeAction(this._dynamicSkill);
        const mapAnimation = makeMapAnimationEvent(this, this._dynamicSkill, action);

        // DynamicAnimation開始
        this.showDynamicAnimation(targets, action, mapAnimation);
    }
};

/**
 * 【独自】マップ版DynamicAnimationを開始する。
 * ※NRP_DynamicReadTxtとの連携用にメソッド分割
 */
Game_Event.prototype.showDynamicAnimation = function(targets, action, mapAnimation) {
    // 空のWindow_BattleLogを作成し、DynamicAnimationを起動
    const win = new Window_BattleLog(new Rectangle());
    win.showDynamicAnimation(targets, action, false, mapAnimation);
}

/**
 * ●マップアニメーション用情報を作成
 */
function makeMapAnimationEvent(event, skillId, action) {
    // 始点となる行動主体
    const subject = event;

    // 引き継ぎたい情報をセット
    const mapAnimation = [];
    mapAnimation.subject = subject;
    mapAnimation.noWait = false;
    mapAnimation.onScroll = true;
    mapAnimation.isDynamicAuto = true;
    mapAnimation.skillId = skillId;
    mapAnimation.isParallel = true;
    // 開始時間の設定
    setStartTiming(mapAnimation, action, event);

    return mapAnimation;
}

/**
 * 【独自】DynamicAnimationが実行中かどうか確認
 */
Game_Event.prototype.isDynamicAutoAnimationPlaying = function() {
    // 実行時間が残っているかどうかの判定
    if (this.dynamicDuration > 0) {
        // 時間経過＆処理中と判断
        this.dynamicDuration--;
        return true;
    }

    // リクエスト中のDynamicAnimationを検索
    const sprite = getSprite(this);

    for (const animation of sprite.animations()) {
        const da = animation.dynamicAnimation;
        // 自動実行フラグが設定されているならば
        if (da && da.isDynamicAuto) {
            // 実行中と判定
            return true;
        }
    }

    return false;
};

//----------------------------------------
// <D-Skill>による自動実行（ステート）
//----------------------------------------

const _Game_Battler_initMembers = Game_Battler.prototype.initMembers;
Game_Battler.prototype.initMembers = function() {
    _Game_Battler_initMembers.apply(this, arguments);

    // 表示するDynamicAnimationのスキルＩＤ（複数可）
    this.dynamicSkills = [];
    // 表示するDynamicAnimationのスキル毎の長さ（複数可）
    this.dynamicDurations = [];
};

/**
 * ●リフレッシュ
 */
const _Game_Battler_refresh = Game_Battler.prototype.refresh;
Game_Battler.prototype.refresh = function() {
    _Game_Battler_refresh.apply(this, arguments);

    // クリア
    this.dynamicSkills = [];

    // アクターまたはエネミーのデータを取得
    if (this.isAlive()) {
        const battlerData = this.isActor() ? this.actor() : this.enemy();
        if (battlerData) {
            // メモ欄から<D-Skill:*>を取得
            const skillId = getDynamicSkill(battlerData.note);
            // 取得できれば実行スキルに設定
            if (skillId != undefined) {
                this.dynamicSkills.push(skillId);
            }
        }
    }

    // 現在のステートでループ
    for (const state of this.states()) {
        // メモ欄から<D-Skill:*>を取得
        const skillId = getDynamicSkill(state.note);
        // 取得できれば実行スキルに設定
        if (skillId != undefined) {
            this.dynamicSkills.push(skillId);
        }
    }
};

/**
 * ●更新処理
 */
const _Sprite_Battler_update = Sprite_Battler.prototype.update;
Sprite_Battler.prototype.update = function() {
    _Sprite_Battler_update.apply(this, arguments);

    const battler = this._battler;
    if (battler) {
        // アクション中は処理しない
        if (pActingNoStateAnimation && battler.isActing()) {
            return;
        }

        // スキルが設定されていた場合
        for (const skillId of battler.dynamicSkills) {
            // アニメーションの自動実行中ならば処理しない
            if (this.isDynamicAutoAnimationPlaying(skillId)) {
                continue;
            }

            const targets = [battler];
            const action = makeAction(skillId);
            const mapAnimation = makeMapAnimationStateAndBattler(battler, skillId, action);

            // DynamicAnimation開始
            battler.showDynamicAnimation(targets, action, mapAnimation);
        }
    }
};

/**
 * ●マップアニメーション用情報を作成
 * ※ステートまたはバトラー単位の表示
 */
function makeMapAnimationStateAndBattler(battler, skillId, action) {
    // 始点となる行動主体
    const subject = battler;

    // 引き継ぎたい情報をセット
    const mapAnimation = [];
    mapAnimation.subject = subject;
    mapAnimation.noWait = false;
    mapAnimation.isDynamicAuto = true;
    mapAnimation.isParallel = true;
    mapAnimation.skillId = skillId;

    // 開始時間の設定
    setStartTiming(mapAnimation, action, subject);
    return mapAnimation;
}

/**
 * 【独自】DynamicAnimationが実行中かどうか確認
 */
Sprite_Battler.prototype.isDynamicAutoAnimationPlaying = function(skillId) {
    const battler = this._battler;
    // 実行時間が残っている場合
    if (battler.dynamicDurations[skillId] > 0) {
        // 時間経過＆処理中と判断
        battler.dynamicDurations[skillId]--;
        return true;
    }

    // リクエスト中のDynamicAnimationを検索
    for (const animation of this.animations()) {
        const da = animation.dynamicAnimation;
        if (da) {
            const mapAnimation = da.baseAnimation.mapAnimation;
            // 自動実行フラグが設定されているならば
            if (mapAnimation && mapAnimation.skillId == skillId && da.isDynamicAuto) {
                // 実行中と判定
                return true;
            }
        }
    }

    return false;
};

/**
 * 【独自】マップ版DynamicAnimationを開始する。
 * ※NRP_DynamicReadTxtとの連携用にメソッド分割
 */
Game_Battler.prototype.showDynamicAnimation = function(targets, action, mapAnimation) {
    // 空のWindow_BattleLogを作成し、DynamicAnimationを起動
    const win = new Window_BattleLog(new Rectangle());
    win.showDynamicAnimation(targets, action, false, mapAnimation);
}

/**
 * 【独自】動的アニメーションの呼び出し
 */
const _Sprite_Battler_startDynamicAnimation = Sprite_Battler.prototype.startDynamicAnimation;
Sprite_Battler.prototype.startDynamicAnimation = function(mirror, delay, dynamicAnimation) {
    _Sprite_Battler_startDynamicAnimation.apply(this, arguments);

    // ウェイト用の設定
    if (!dynamicAnimation.noWait) {
        // ステートメモ欄から自動起動した場合
        if (dynamicAnimation.isDynamicAuto) {
            const mapAnimation = dynamicAnimation.baseAnimation.mapAnimation;
            const skillId = mapAnimation.skillId;
            const battler = this._battler;
            // 実行時間を設定
            let dynamicDuration = 0;
            // スキルＩＤ単位で保有する実行時間
            if (battler.dynamicDurations[skillId]) {
                dynamicDuration = battler.dynamicDurations[skillId];
                // 開始タイミングの指定がある場合は調整
                if (mapAnimation.startTiming) {
                    dynamicDuration -= mapAnimation.startTiming * pCalculationRate;
                }
            }
            let waitDuration = 0;
            if (dynamicAnimation.waitDuration) {
                waitDuration = dynamicAnimation.waitDuration;
            }
            // より長いほうを採用
            battler.dynamicDurations[skillId] = Math.max(waitDuration, dynamicDuration);
        }
    }
};

//----------------------------------------
// ＭＶ用のプラグインコマンド
//----------------------------------------

// 旧ＭＶプラグインコマンド用
let plTarget;
let plStartPoint;
let plWait;
let plNoScroll;
let plRange;
let plTargetCondition;
let plSubjectCondition;
let plBattleSubject;

/**
 * ●ＭＶ用の旧式プラグインコマンド
 */
var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);

    // 小文字化してから判定
    var lowerCommand = command.toLowerCase();
    
    // スキルＩＤまたはアイテムＩＤからアニメーション実行
    if (lowerCommand === "nrp.animation.skill" || lowerCommand === "nrp.animation.item") {
        const skillId = eval(args[0]);

        // undefindのboolean変換
        let wait = !!plWait;

        // 戦闘中
        if ($gameParty.inBattle()) {
            const targetCondition = plTargetCondition;
            const subjectCondition = plSubjectCondition;

            // 設定したらクリア
            plWait = undefined;
            plTargetCondition = undefined;
            plSubjectCondition = undefined;
            
            // 戦闘中のアニメーション表示
            showBattleAnimation.bind(this)(
                skillId, targetCondition, subjectCondition, wait);

        // マップ中
        } else {
            const targetId = setDefault(plTarget, "0");
            const startPointId = setDefault(plStartPoint, "-1");
    
            // undefindのboolean変換
            let noScroll = !!plNoScroll;
            let targetRangeGrid = pTargetRangeGrid;
    
            // 指定がある場合は共通設定より優先
            if (plRange != undefined) {
                targetRangeGrid = toNumber(plRange);
            }
    
            // 設定したらクリア
            plTarget = undefined;
            plStartPoint = undefined;
            plWait = undefined;
            plNoScroll = undefined;
            plRange = undefined;

            const mapAnimationParams = [];
            mapAnimationParams.skillId = skillId;
            mapAnimationParams.targetId = targetId;
            mapAnimationParams.startPointId = startPointId;
            mapAnimationParams.wait = wait;
            mapAnimationParams.noScroll = noScroll;
            mapAnimationParams.targetRangeGrid = targetRangeGrid;
            mapAnimationParams.battleSubject = plBattleSubject;
            // アイテムとして呼び出された場合はフラグを立てる。
            if (lowerCommand === "nrp.animation.item") {
                mapAnimationParams.isItem = true;
            }

            // マップ上でのアニメーション表示
            showMapAnimation.bind(this)(mapAnimationParams);
        }
        
    // 対象の設定
    } else if (lowerCommand === "nrp.animation.target") {
        // 引数が空白で区切られていた時のため連結しておく。
        plTarget = getCommandValue(String(args.join(" ")));
        
    // 始点の設定
    } else if (lowerCommand === "nrp.animation.startpoint" || lowerCommand === "nrp.animation.subject") {
        plStartPoint = getCommandValue(String(args.join(" ")));
        
    // ウェイトするか
    } else if (lowerCommand === "nrp.animation.wait") {
        plWait = true;

    // スクロールの無効化
    } else if (lowerCommand === "nrp.animation.noscroll") {
        plNoScroll = true;

    // 有効範囲
    } else if (lowerCommand === "nrp.animation.range") {
        plRange = eval(getCommandValue(args[0]));

    // 対象条件
    } else if (lowerCommand === "nrp.animation.targetcondition") {
        plTargetCondition = getCommandValue(String(args.join(" ")));

    // 行動主体条件
    } else if (lowerCommand === "nrp.animation.subjectcondition") {
        plSubjectCondition = getCommandValue(String(args.join(" ")));

    // 戦闘用行動主体（通常攻撃などの取得用）
    // 通常のプラグインコマンドではなくスクリプトから直接バトラーを設定する想定
    } else if (lowerCommand === "nrp.animation.subjectbattler") {
        plBattleSubject = args[0];
    }
};

//----------------------------------------
// 共通
//----------------------------------------

/**
 * ●現在の画面のSpritesetを取得する。
 */
function getSpriteset() {
    return SceneManager._scene._spriteset;
}

})();
