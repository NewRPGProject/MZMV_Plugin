//=============================================================================
// NRP_CallEnemy.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.02 Implement the "Call Enemy" function.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @base NRP_TroopRandomFormation
 * @url http://newrpg.seesaa.net/article/485838070.html
 *
 * @help Add a "Call Enemy" function to the enemy skill.
 * The enemy that appears will automatically appear in a marginal area.
 * 
 * The following plugin is required for use.
 * - NRP_TroopRandomFormation.js (ver1.06~)
 * 
 * The way the enemy is placed also depends
 * on the plugin parameters of NRP_TroopRandomFormation.js.
 * Please make adjustments there.
 * 
 * Note that if NRP_TroopRandomFormation.js is installed,　troops
 * whose name starts with "#" will be subject to automatic placement.
 * Please be careful if you do not want to use this feature.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Create skills for "Call Enemy".
 * 
 * First, the scope of the skill should be a single target,
 * such as "User".
 * Be aware that if the range is "None", the skill will not work.
 * 
 * Next, fill in the following in the note field of your skills.
 * <CallEnemy: x>
 * 
 * This will call the enemy with ID x.
 * If you omit it and just write <CallEnemy>,
 * it will call the same enemy as the user of the skill.
 * 
 * Multiple designations are also supported.
 * <CallEnemy: 1~3>
 * Then it will randomly invoke an enemy with ID 1 to 3.
 * <CallEnemy: 1,3,5>
 * Then it will randomly call an enemy with an ID of 1, 3, or 5.
 * 
 * By the way, if you increase repeat,
 * you can call more than one fellow at a time.
 * 
 * -------------------------------------------------------------------
 * [Note of Skills]
 * -------------------------------------------------------------------
 * <CallEnemyDynamic: x>
 * Works with the DynamicAnimation&Motion plugins.
 * Appears with the direction specified for the x numbered skill.
 * 
 * -------------------------------------------------------------------
 * [Note of Enemies]
 * -------------------------------------------------------------------
 * <DynamicAppear: x>
 * In linkage with the DynamicAnimation&Motion plugins,
 * the skill appears with the direction specified
 * for the x-numbered skill.
 * 
 * Choose your preferred designation method: skill or enemy.
 * If both are specified, the skill side is given priority.
 * 
 * Note that this setting is shared
 * with the appearance direction by NRP_DynamicAppear.js.
 * 
 * <CallEnemy: x>
 * The ID of the target to be called
 * when an enemy character calls an enemy.
 * The ID must not be specified in the skill that calls the enemy.
 * 
 * -------------------------------------------------------------------
 * [Sample of DynamicMotion]
 * -------------------------------------------------------------------
 * <D-Motion>
 * frame = 5 // Movement time
 * sx = a._homeX -500 // Start X (off-screen left)
 * sy = a._homeY // Start Y
 * ex = a._homeX // End X
 * ey = a._homeY // End Y
 * </D-Motion>
 * 
 * "a" refers to the called enemy and "b" refers to the user of the skill.
 * "a._homeX" and "a._homeY" are the placement points.
 * Implement it so that it will eventually move there.
 * 
 * -------------------------------------------------------------------
 * [Plugin Command MZ]
 * -------------------------------------------------------------------
 * ◆CallEnemy
 * Freely invoke an enemy within a battle event.
 * Unlike invocation by skill, coordinates can be specified.
 * 
 * -------------------------------------------------------------------
 * [Reference]
 * -------------------------------------------------------------------
 * The following plugin was used as references
 * in the creation of this plugin.
 * 
 * EnemyCallsAlly.js (Sasuke KANNAZUKI)
 * https://forum.tkool.jp/index.php?threads/4795/
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
 * @ Plugin Command
 * @------------------------------------------------------------------
 * 
 * @command CallEnemy
 * @desc Calls the specified enemy.
 * 
 * @arg EnemyId
 * @type enemy
 * @desc The ID of the enemy to call.
 * Text input is valid for formulas, etc.
 * 
 * @arg X
 * @type string
 * @desc The X coordinate at which enemy appears.
 * If left blank, it will be calculated automatically.
 * 
 * @arg Y
 * @type string
 * @desc The Y coordinate at which enemy appears.
 * If left blank, it will be calculated automatically.
 * 
 * @arg DynamicId
 * @type skill
 * @desc Specify the appearance direction by DynamicAnimation&Motion.
 * Specify the ID of the skill.
 * 
 * @------------------------------------------------------------------
 * @ [Plugin Parameters]
 * @------------------------------------------------------------------
 * 
 * @param MaxEnemyNo
 * @type number
 * @default 5
 * @desc The maximum number of enemy that can appear.
 * Attempting to call more than that will result in failure.
 * 
 * @param SuccessMessage
 * @type string
 * @default %1 showed up!
 * @desc The message to be displayed when the call is successful.
 *
 * @param FailureMessage
 * @type string
 * @default However, the fellow didn't show up!
 * @desc The message to be displayed when the call is failed.
 * 
 * @param LinkDynamicAppear
 * @type boolean
 * @default true
 * @desc Works with NRP_DynamicAppear.js to execute the appearance direction.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.02 敵キャラの『仲間を呼ぶ』を実装します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @base NRP_TroopRandomFormation
 * @url http://newrpg.seesaa.net/article/485838070.html
 *
 * @help 敵キャラのスキルに『仲間を呼ぶ』機能を追加します。
 * 現れた敵キャラは自動で、空白のある場所に登場します。
 * 
 * このプラグインの利用には以下のプラグインが必要です。
 * ・NRP_TroopRandomFormation.js (ver1.06~)
 * 
 * 敵キャラの配置方法もNRP_TroopRandomFormation.jsの
 * プラグインパラメータに依存しますので、調整はそちらで行ってください。
 * 
 * なお、NRP_TroopRandomFormation.jsを導入すると、
 * グループ名が『#』から始まる敵グループが自動配置の対象となります。
 * この機能を利用したくない場合はご注意ください。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * 『仲間を呼ぶ』用のスキルを作成します。
 * 
 * まず、スキルの範囲は『使用者』など、単体を対象とするものにしてください。
 * 範囲が『なし』だと機能しませんのでご注意を。
 * 
 * 次にスキルのメモ欄に以下を記入してください。
 * <CallEnemy: x>
 * 
 * これでＩＤがx番の敵キャラを呼び出します。
 * 省略して<CallEnemy>とだけ記入すると、
 * スキルの使用者と同一の敵キャラを呼び出します。
 * 
 * また、複数指定にも対応しています。
 * <CallEnemy: 1~3>
 * ならば、ＩＤが１～３の敵キャラをランダムで呼び出します。
 * <CallEnemy: 1,3,5>
 * ならば、ＩＤが１，３，５の敵キャラをランダムで呼び出します。
 * 
 * ちなみに連続回数を増やせば、一度に複数の仲間を呼びます。
 * 
 * -------------------------------------------------------------------
 * ■スキルのメモ欄
 * -------------------------------------------------------------------
 * <CallEnemyDynamic: x>
 * DynamicAnimation&Motionプラグインと連携し、
 * x番のスキルに指定された演出で登場します。
 * 
 * -------------------------------------------------------------------
 * ■敵キャラのメモ欄
 * -------------------------------------------------------------------
 * <DynamicAppear: x>
 * DynamicAnimation&Motionプラグインと連携し、
 * x番のスキルに指定された演出で登場します。
 * 
 * スキルか敵キャラか、好きな指定方法を選んでください。
 * 両方の指定がある場合はスキル側が優先されます。
 * 
 * なお、この設定はNRP_DynamicAppear.js（登場演出プラグイン）による
 * 登場演出と共有されます。
 * 
 * <CallEnemy: x>
 * 該当の敵キャラが仲間を呼んだ場合に呼び出される敵のＩＤです。
 * 仲間を呼ぶスキルにＩＤの指定がないことが条件です。
 * 
 * -------------------------------------------------------------------
 * ■DynamicMotionによる演出の例
 * -------------------------------------------------------------------
 * <D-Motion>
 * frame = 5 // 移動時間
 * sx = a._homeX -500 // 始点Ｘ座標（画面外左）
 * sy = a._homeY // 始点Ｙ座標
 * ex = a._homeX // 終点Ｘ座標
 * ey = a._homeY // 終点Ｙ座標
 * </D-Motion>
 * 
 * aで呼び出された敵キャラ、bで呼び出した敵キャラを参照できます。
 * a._homeX, a._homeYが配置地点となるので、
 * 最終的にそこへ移動するように実装してください。
 * 
 * -------------------------------------------------------------------
 * ■ＭＺ用プラグインコマンド
 * -------------------------------------------------------------------
 * ◆敵キャラを呼ぶ
 * バトルイベント内で自由に敵キャラを呼び出します。
 * スキルによる呼び出しとは異なり、座標を指定することも可能です。
 * 
 * -------------------------------------------------------------------
 * ■参考
 * -------------------------------------------------------------------
 * このプラグインの制作に当たって、
 * 以下のプラグインを参考にさせていただきました。
 * 
 * EnemyCallsAlly.js（神無月サスケ様）
 * https://forum.tkool.jp/index.php?threads/4795/
 * 
 * -------------------------------------------------------------------
 * ■利用規約
 * -------------------------------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @------------------------------------------------------------------
 * @ プラグインコマンド
 * @------------------------------------------------------------------
 * 
 * @command CallEnemy
 * @text 敵キャラを呼ぶ
 * @desc 指定した敵キャラを呼び出します。
 * 
 * @arg EnemyId
 * @text 敵キャラのＩＤ
 * @type enemy
 * @desc 呼び出す敵キャラのＩＤです。
 * テキスト入力すれば数式なども有効です。
 * 
 * @arg X
 * @text Ｘ座標
 * @type string
 * @desc 敵キャラが登場するＸ座標です。
 * 空欄の場合は自動で計算します。
 * 
 * @arg Y
 * @text Ｙ座標
 * @type string
 * @desc 敵キャラが登場するＹ座標です。
 * 空欄の場合は自動で計算します。
 * 
 * @arg DynamicId
 * @text DynamicID
 * @type skill
 * @desc DynamicAnimation&Motionによる登場演出を指定します。
 * スキルのＩＤを指定してください。
 * 
 * @------------------------------------------------------------------
 * @ プラグインパラメータ
 * @------------------------------------------------------------------
 * 
 * @param MaxEnemyNo
 * @text 敵キャラの最大数
 * @type number
 * @default 5
 * @desc 同時に出現できる敵キャラの最大数です。
 * それ以上呼び出そうとすると失敗します。
 * 
 * @param SuccessMessage
 * @text 成功メッセージ
 * @type string
 * @default %1が現れた！
 * @desc 呼び出しに成功した際に表示する文章です。
 *
 * @param FailureMessage
 * @text 失敗メッセージ
 * @type string
 * @default しかし仲間は現れなかった！
 * @desc 呼び出しに失敗した際に表示する文章です。
 * 
 * @param LinkDynamicAppear
 * @text DynamicAppearと連携
 * @type boolean
 * @default true
 * @desc NRP_DynamicAppear.jsと連携し、登場演出を実行します。
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

const PLUGIN_NAME = "NRP_CallEnemy";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pMaxEnemyNo = toNumber(parameters["MaxEnemyNo"]);
const pSuccessMessage = parameters["SuccessMessage"];
const pFailureMessage = parameters["FailureMessage"];
const pLinkDynamicAppear = toBoolean(parameters["LinkDynamicAppear"], true);

/**
 * ●引数を元に対象の配列を取得する。
 * ※bindによってinterpreterをthisに渡して用いる。
 */
function makeTargets(targetId) {
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
                    if (evalId) {
                        targets.push(evalId);
                    }
                }
            } else {
                for (let i = idRangeStart; i <= idRangeEnd; i++) {
                    const evalId = eval(i);
                    if (evalId) {
                        targets.push(evalId);
                    }
                }
            }
            
        // 通常時
        } else {
            const evalId = eval(id);
            if (evalId) {
                targets.push(evalId);
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
 * ●敵キャラを呼ぶ
 */
PluginManager.registerCommand(PLUGIN_NAME, "CallEnemy", function(args) {
    const argsEnemyId = args.EnemyId;
    const x = eval(args.X);
    const y = eval(args.Y);
    const dynamicId = args.DynamicId;

    // 複数指定に対応するため配列変換
    const enemyIds = makeTargets(argsEnemyId);
    // 候補の中からランダムに一つを取得
    const enemyId = enemyIds[Math.randomInt(enemyIds.length)];

    // actionを生成
    // ※現在の行動主体がなければ、先頭の敵キャラ
    const subject = BattleManager._subject || $gameTroop.aliveMembers()[0];
    const action = new Game_Action(subject);

    // 引数を設定
    const callArgs = {};
    callArgs.x = x;
    callArgs.y = y;
    callArgs.dynamicId = dynamicId;

    // 呼び出し実行
    action.callEnemy(enemyId, callArgs);
    // メッセージ改行
    BattleManager._logWindow.push("waitForNewLine");
    BattleManager._logWindow.push("popBaseLine");
    BattleManager._logWindow.push("clear");
});

//-----------------------------------------------------------------------------
// BattleManager
//-----------------------------------------------------------------------------

/**
 * 【独自】仲間を呼ぶスキルかどうか？
 */
BattleManager.isCallEnemySkill = function() {
    const action = BattleManager._action;
    if (action) {
        return action.item().meta.CallEnemy;
    }
    return false;
};

/**
 * ●アクション実行
 * ※演出上のタイミングでここに実装
 */
const _BattleManager_invokeAction = BattleManager.invokeAction;
BattleManager.invokeAction = function(subject, target) {
    _BattleManager_invokeAction.apply(this, arguments);

    if (BattleManager.isCallEnemySkill()) {
        const enemyId = getCallEnemyId(this._action);
        // 仲間を呼ぶスキルなら処理を実行
        if (enemyId) {
            this._action.callEnemy(enemyId);
        }
    }
};

//-----------------------------------------------------------------------------
// Game_Action
//-----------------------------------------------------------------------------

/**
 * 【独自】敵キャラを呼ぶ
 */
Game_Action.prototype.callEnemy = function(enemyId, callArgs) {
    // 既に制限数に達している場合は処理停止
    if (pMaxEnemyNo && pMaxEnemyNo <= $gameTroop.aliveMembers().length) {
        // 失敗メッセージを表示
        BattleManager._logWindow.displayCallEnemy(this, this.subject(), callArgs);
        return;
    }

    // 敵を追加
    const newEnemy = new Game_Enemy(enemyId, 0, 0, true);
    $gameTroop._enemies.push(newEnemy);
    // 名前記号を振り直す
    $gameTroop.makeUniqueNames();

    // 敵キャラ画像を事前ロードしておく。
    const newSprite = new Sprite_Enemy(newEnemy)
    newSprite.updateBitmap();
    
    // 成功メッセージを表示
    this.makeSuccess(newEnemy);
    BattleManager._logWindow.displayCallEnemy(this, newEnemy, callArgs);
};

/**
 * ●呼び出す敵キャラのＩＤを取得
 */
function getCallEnemyId(action) {
    const metaCallEnemy = action.item().meta.CallEnemy;
    let enemyId;

    // 数値指定がない場合
    if (metaCallEnemy === true) {
        const a = action.subject();
        const dataEnemy = a.enemy();
        // 指定がある場合は優先
        if (dataEnemy.meta.CallEnemy) {
            enemyId = eval(dataEnemy.meta.CallEnemy);

        // それ以外は使用者と同じ
        } else {
            enemyId = a.enemyId();
        }

    // ＩＤが措定されている場合
    } else {
        // 複数指定に対応するため配列変換
        const enemyIds = makeTargets(metaCallEnemy);
        // 候補の中からランダムに一つを取得
        enemyId = enemyIds[Math.randomInt(enemyIds.length)];
    }
    return enemyId;
}

/**
 * ●DynamicAnimation&Motionを呼び出し
 */
function callDynamic(action, newEnemy, newSprite, dynamicId) {
    // チラ見えしないように、適当に画面外へ移動
    newSprite._offsetX = -newSprite.x - newSprite.width / 2 - 100;

    // 実行するDynamicAnimation情報を持ったアクション
    const dynamicAction = makeAction(dynamicId, newEnemy);
    // スキル使用者を対象にする。
    const targets = [action.subject()];
    // 引き継ぎたい情報をセット
    const mapAnimation = [];
    // 登場する敵キャラを行動者にする。
    mapAnimation.subject = newEnemy;
    // 空のWindow_BattleLogを作成し、DynamicAnimationを起動
    const win = new Window_BattleLog(new Rectangle());
    win.showDynamicAnimation(targets, dynamicAction, false, mapAnimation);
}

//-----------------------------------------------------------------------------
// Sprite_Enemy
//-----------------------------------------------------------------------------

/**
 * 【独自】呼び出される位置を設定
 */
Sprite_Enemy.prototype.setCallPosition = function(args) {
    const battler = this._battler;

    // 座標の指定がある場合は優先
    if (args && args.x != null && args.y != null) {
        this.x = args.x;
        this.y = args.y;

    // 自動配置
    } else {
        // 自身は未配置に設定しておく。
        this._isPositionOK = false;
        // 配置計算
        this.makeAutoPosition(-999999);
    }

    // Game_Battlerに座標反映
    battler._screenX = this.x;
    battler._screenY = this.y;
    // 配置更新
    this.setHome(battler.screenX(), battler.screenY());
    // DynamicMotion用にhomeを反映
    battler._homeX = this._homeX;
    battler._homeY = this._homeY;
};

//-----------------------------------------------------------------------------
// Window_BattleLog
//-----------------------------------------------------------------------------

/**
 * 【独自】呼び出しメッセージを表示
 */
Window_BattleLog.prototype.displayCallEnemy = function(action, target, callArgs) {
    if (target.result().success && pSuccessMessage) {
        this.push('addText', pSuccessMessage.format(target.name()));
        // 敵キャラ画像をロードする時間を作るためにpushする。
        this.push("performCallEnemy", action, target, callArgs);

    } else if (pFailureMessage) {
        this.push('addText', pFailureMessage.format(target.name()));
    }
};

/**
 * 【独自】敵キャラの登場演出
 */
Window_BattleLog.prototype.performCallEnemy = function(action, newEnemy, callArgs) {
    // 描画
    const spriteset = BattleManager._spriteset;
    // スプライトの作成
    const newSprite = new Sprite_Enemy(newEnemy)
    // DynamicAnimation&Motionの指定があれば取得
    const dynamicId = getDynamicId(action, newEnemy, callArgs);
    if (dynamicId) {
        // チラ見えしないように、適当に画面外へ移動
        newSprite._offsetX = -9999;
    }
    // 敵キャラのスプライトに追加
    spriteset._enemySprites.push(newSprite);
    // 表示順を調整する多面に並び替え
    // ※DynamicMotion併用時は常時処理しているため、あまり意味はない。
    spriteset._enemySprites.sort(spriteset.compareEnemySprite.bind(spriteset));
    // スプライトを画面に追加
    spriteset._battleField.addChild(newSprite);

    // 位置設定用のフラグ
    for (const sprite of spriteset._enemySprites) {
        sprite._isPositionOK = true;
    }
    // 位置設定
    newSprite.setCallPosition(callArgs);
    // Ｙ座標を元にスプライトの並び順を更新
    spriteset.sortTroopSprite();

    // バトラー毎の戦闘開始処理
    newEnemy.onBattleStart();

    // DynamicAnimation&Motion実行
    if (dynamicId) {
        callDynamic(action, newEnemy, newSprite, dynamicId);
    }
};

/**
 * ●失敗メッセージの表示
 */
const _Window_BattleLog_displayFailure = Window_BattleLog.prototype.displayFailure;
Window_BattleLog.prototype.displayFailure = function(target) {
    if (BattleManager.isCallEnemySkill()) {
        // 失敗メッセージを表示させない。
        return;
    }

    _Window_BattleLog_displayFailure.apply(this, arguments);
};

//-----------------------------------------------------------------------------
// NRP_DynamicAppear.jsと連携
//-----------------------------------------------------------------------------

const APPEAR_PLUGIN_NAME = "NRP_DynamicAppear";
const appearParameters = PluginManager.parameters(APPEAR_PLUGIN_NAME);
const pEnemyDynamicId = appearParameters["EnemyDynamicId"];

//-----------------------------------------------------------------------------
// 共通関数
//-----------------------------------------------------------------------------

/**
 * ●DynamicAnimation&MotionのスキルＩＤを取得
 */
function getDynamicId(action, newEnemy, callArgs) {
    // DynamicAnimation&Motionの指定があるか？
    let dynamicId;

    // プラグインコマンドの指定値
    if (callArgs && callArgs.dynamicId) {
        dynamicId = callArgs.dynamicId;
    // スキルの指定値
    } else if (action.item() && action.item().meta.CallEnemyDynamic) {
        // <CallEnemyDynamic>のスキルＩＤを取得
        dynamicId = action.item().meta.CallEnemyDynamic;
    // 敵キャラの指定値
    } else if (pLinkDynamicAppear) {
        // <DynamicAppear>のスキルＩＤを取得
        dynamicId = newEnemy.enemy().meta.DynamicAppear || pEnemyDynamicId
    }

    return eval(dynamicId);
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

})();
