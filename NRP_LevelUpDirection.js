//=============================================================================
// NRP_LevelUpDirection.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.001 Added parameter display and direction at level-up.
 * @author Takeshi Sunagawa (https://newrpg.seesaa.net/)
 * @orderAfter NRP_VictoryRewards
 * @url https://newrpg.seesaa.net/article/499197962.html
 *
 * @help The following features will be added at level up.
 * 
 * - Display of parameters to be raised.
 * - Specify sound effects and ME.
 * - Move actors by DynamicAnimation&Motion.
 * - Consider cooperation with NRP_AdditionalClasses.js.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * When applied, it will display the parameters
 * that increase when the level is raised.
 * You can then set the sound effects, etc. to your liking.
 * 
 * Note that to work with DynamicAnimation&Motion and AdditionalClasses,
 * you need to install the corresponding plug-ins.
 * 
 * -------------------------------------------------------------------
 * [About DynamicMotion]
 * -------------------------------------------------------------------
 * If a motion is specified by DynamicMotion,
 * the normal victory motion will be canceled.
 * 
 * If necessary, reassign the motion
 * at the end of the skill's note as follows.
 * Note that you may specify something other than a victory motion.
 * 
 * <D-Motion>
 * motion = victory
 * </D-Motion>
 * 
 * -------------------------------------------------------------------
 * [Application]
 * -------------------------------------------------------------------
 * Fine-tuning is also possible by using control characters.
 * For example, if the display format is "\c[15]%1\c[0] +%2",
 * you can change the color of only the parameter name.
 * 
 * You can also insert a wait time between the level-up of terms,
 * such as "%1 is now %2 %3!\|\|".
 * This can also make the ME wait for the performance.
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
 * @param ParameterList
 * @type struct<Parameter>[]
 * @default ["{\"ParameterId\":\"0\",\"Memo\":\"Max HP\",\"DisplayName\":\"\"}","{\"ParameterId\":\"1\",\"Memo\":\"Max MP\",\"DisplayName\":\"\"}","{\"ParameterId\":\"2\",\"Memo\":\"Attack\",\"DisplayName\":\"\"}","{\"ParameterId\":\"3\",\"Memo\":\"Defence\",\"DisplayName\":\"\"}","{\"ParameterId\":\"4\",\"Memo\":\"M.Attack\",\"DisplayName\":\"\"}","{\"ParameterId\":\"5\",\"Memo\":\"M.Defense\",\"DisplayName\":\"\"}","{\"ParameterId\":\"6\",\"Memo\":\"Agility\",\"DisplayName\":\"\"}","{\"ParameterId\":\"7\",\"Memo\":\"Luck\",\"DisplayName\":\"\"}"]
 * @desc List of parameters to be displayed at level-up.
 * 
 * @param NumberOfColumns
 * @type number
 * @default 2
 * @desc The number of columns for displaying parameters.
 * 
 * @param DisplayFormat
 * @type string
 * @default %1 +%2
 * @desc This format displays the amount of the parameter increase. %1: Parameter Name, %2: Value
 * 
 * @param LevelUpSe
 * @type file
 * @dir audio/se
 * @desc The sound effect that is played when the level is raised.
 * 
 * @param LevelUpMe
 * @type file
 * @dir audio/me
 * @desc ME to be played at the time of level up.
 * 
 * @param DynamicSkill
 * @type skill
 * @desc DynamicAnimation&Motion skills to be performed at level up.
 * 
 * @param <AdditionalClasses>
 * @desc This item is for integration with NRP_AdditionalClasses.js.
 * 
 * @param AC_LevelUpSe
 * @parent <AdditionalClasses>
 * @type file
 * @dir audio/se
 * @desc The sound effect that is played when an additional class is leveled up.
 * 
 * @param AC_LevelUpMe
 * @parent <AdditionalClasses>
 * @type file
 * @dir audio/me
 * @desc ME to be played at the level of additional classes.
 * 
 * @param AC_DynamicSkill
 * @parent <AdditionalClasses>
 * @type skill
 * @desc DynamicAnimation&Motion skills to be performed at the level up of additional classes.
 */

/*~struct~Parameter:
 * @param ParameterId
 * @type number
 * @desc ID of the parameter.
 * Default: 0,1,2,3,4,5,6,7 0:MHP-7:Luck
 * 
 * @param Memo
 * @type string
 * @desc Discrimination notes.
 * Not used in the game.
 * 
 * @param DisplayName
 * @type string
 * @desc The name that will appear on the screen.
 * If left blank, it will be used directly from the term.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.001 レベルアップ時にパラメータ表示や演出を追加
 * @author 砂川赳（https://newrpg.seesaa.net/）
 * @orderAfter NRP_VictoryRewards
 * @url https://newrpg.seesaa.net/article/499197962.html
 *
 * @help レベルアップ時に以下のような機能を追加します。
 * 
 * ・上昇パラメータの表示。
 * ・効果音やＭＥを指定。
 * ・DynamicAnimation&Motionによってアクターを動かす。
 * ・多重職業プラグインとの連携も考慮。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * 適用するとレベルアップ時の上昇パラメータが表示されるようになります。
 * あとはお好みで効果音などを設定してください。
 * 
 * なお、DynamicAnimation&Motionや多重職業プラグインとの連携には、
 * 該当のプラグインを導入する必要があります。
 * 
 * -------------------------------------------------------------------
 * ■DynamicMotionについて
 * -------------------------------------------------------------------
 * DynamicMotionによって、モーションを指定した場合は、
 * 通常の勝利モーションが解除されます。
 * 
 * 必要ならスキルのメモ欄の末尾で
 * 以下のようにモーションを再設定してください。
 * なお、勝利モーション以外のものを指定しても構いません。
 * 
 * <D-Motion>
 * motion = victory
 * </D-Motion>
 * 
 * -------------------------------------------------------------------
 * ■応用
 * -------------------------------------------------------------------
 * 制御文字を使用することで細かい調整も可能です。
 * 例えば、表示フォーマットを「\c[15]%1\c[0] +%2」とすれば、
 * パラメータ名だけ色を変えることができます。
 * 
 * 他にも用語のレベルアップに「%1は%2 %3 に上がった！\|\|」というように
 * ウェイトを挟めば、ＭＥの演奏待ちをさせたりできます。
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
 * @param ParameterList
 * @text パラメータ一覧
 * @type struct<Parameter>[]
 * @default ["{\"ParameterId\":\"0\",\"Memo\":\"最大ＨＰ\",\"DisplayName\":\"\"}","{\"ParameterId\":\"1\",\"Memo\":\"最大ＭＰ\",\"DisplayName\":\"\"}","{\"ParameterId\":\"2\",\"Memo\":\"攻撃力\",\"DisplayName\":\"\"}","{\"ParameterId\":\"3\",\"Memo\":\"防御力\",\"DisplayName\":\"\"}","{\"ParameterId\":\"4\",\"Memo\":\"魔法力\",\"DisplayName\":\"\"}","{\"ParameterId\":\"5\",\"Memo\":\"魔法防御\",\"DisplayName\":\"\"}","{\"ParameterId\":\"6\",\"Memo\":\"敏捷性\",\"DisplayName\":\"\"}","{\"ParameterId\":\"7\",\"Memo\":\"運\",\"DisplayName\":\"\"}"]
 * @desc レベルアップ時に表示するパラメータの一覧です。
 * 
 * @param NumberOfColumns
 * @text 列数
 * @type number
 * @default 2
 * @desc パラメータを表示する際の列数です。
 * 
 * @param DisplayFormat
 * @text 表示フォーマット
 * @type string
 * @default %1 +%2
 * @desc パラメータの上昇量を表示するフォーマットです。
 * %1: パラメータ名, %2: 上昇量
 * 
 * @param LevelUpSe
 * @text レベルアップ効果音
 * @type file
 * @dir audio/se
 * @desc レベルアップ時に鳴らす効果音です。
 * 
 * @param LevelUpMe
 * @text レベルアップＭＥ
 * @type file
 * @dir audio/me
 * @desc レベルアップ時に演奏するＭＥです。
 * 
 * @param DynamicSkill
 * @text Dynamic用スキル
 * @type skill
 * @desc レベルアップ時に実行するDynamicAnimation&Motionのスキルです。
 * 
 * @param <AdditionalClasses>
 * @text ＜多重職業連携用＞
 * @desc 多重職業プラグインとの連携用の項目です。
 * 
 * @param AC_LevelUpSe
 * @text レベルアップ効果音
 * @parent <AdditionalClasses>
 * @type file
 * @dir audio/se
 * @desc 追加職業のレベルアップ時に鳴らす効果音です。
 * 
 * @param AC_LevelUpMe
 * @text レベルアップＭＥ
 * @parent <AdditionalClasses>
 * @type file
 * @dir audio/me
 * @desc 追加職業のレベルアップ時に演奏するＭＥです。
 * 
 * @param AC_DynamicSkill
 * @text Dynamic用スキル
 * @parent <AdditionalClasses>
 * @type skill
 * @desc 追加職業のレベルアップ時に実行するDynamicAnimation&Motionのスキルです。
 */

/*~struct~Parameter:ja
 * @param ParameterId
 * @text パラメータＩＤ
 * @type number
 * @desc パラメータのＩＤです。初期値：0,1,2,3,4,5,6,7
 * 0:最大ＨＰ～7:運となります。
 * 
 * @param Memo
 * @text メモ
 * @type string
 * @desc 判別用のメモです。
 * ゲーム内では使用されません。
 * 
 * @param DisplayName
 * @text 表示名
 * @type string
 * @desc 画面上に表示される名称です。
 * 空欄なら用語からそのまま使用されます。
 */

(function() {
"use strict";

/**
 * ●構造体（二重配列）をJSで扱えるように変換
 */
function parseStruct2(arg) {
    const ret = [];
    if (arg) {
        for (const str of JSON.parse(arg)) {
            ret.push(JSON.parse(str));
        }
    }
    return ret;
}
function toNumber(str, def) {
    if (str == undefined || str == "") {
        return def;
    }
    return isNaN(str) ? def : +(str || def);
}
function toBoolean(str, def) {
    if (str === true || str === "true") {
        return true;
    } else if (str === false || str === "false") {
        return false;
    }
    return def;
}
function setDefault(str, def) {
    if (str == undefined || str == "") {
        return def;
    }
    return str;
}

const PLUGIN_NAME = "NRP_LevelUpDirection";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pParameterList = parseStruct2(parameters["ParameterList"]);
const pNumberOfColumns = toNumber(parameters["NumberOfColumns"]);
const pDisplayFormat = setDefault(parameters["DisplayFormat"]);
const pLevelUpSe = parameters["LevelUpSe"];
const pLevelUpMe = parameters["LevelUpMe"];
const pDynamicSkill = parameters["DynamicSkill"];
// 多重職業用
const pAC_LevelUpSe = parameters["AC_LevelUpSe"];
const pAC_LevelUpMe = parameters["AC_LevelUpMe"];
const pAC_DynamicSkill = parameters["AC_DynamicSkill"];

// レベルアップ検出用の制御文字
const LEVEL_UP_CODE = "LUC";
const AC_LEVEL_UP_CODE = "ACLUC";

//-----------------------------------------------------------------------------
// Game_Actor
//-----------------------------------------------------------------------------

// レベルアップ前のアクター
let mOldActor = null;
let mIsLevelUpDirection = false;

const _Game_Actor_changeExp = Game_Actor.prototype.changeExp;
Game_Actor.prototype.changeExp = function(exp, show) {
    // レベルアップ前のアクターを保持しておく。
    mOldActor = JsonEx.makeDeepCopy(this);
    mIsLevelUpDirection = true;
    _Game_Actor_changeExp.apply(this, arguments);
    mOldActor = null;
};

/**
 * ●レベルアップメッセージの表示
 */
const _Game_Actor_displayLevelUp = Game_Actor.prototype.displayLevelUp;
Game_Actor.prototype.displayLevelUp = function(newSkills) {
    _Game_Actor_displayLevelUp.apply(this, arguments);

    // メッセージを生成
    const lvupMessages = [];

    let count = 1;
    let tempMessage = "";

    if (pParameterList) {
        // 表示パラメータ毎にループ
        for (const paramData of pParameterList) {
            const paramId = toNumber(paramData.ParameterId);
            // パラメータ上昇量を取得
            const value = this.param(paramId) - mOldActor.param(paramId);
            // パラメータ名
            const paramName = setDefault(paramData.DisplayName) ?? TextManager.param(paramId);
            // メッセージを追加
            tempMessage += pDisplayFormat.format(paramName, value);

            // 出力した項目数が列数で割り切れる場合
            if (count % pNumberOfColumns == 0) {
                // 改行を追加
                lvupMessages.push(tempMessage);
                tempMessage = "";
            // 最終要素の場合
            } else if (paramId == pParameterList[pParameterList.length - 1]) {
                // 改行を追加
                lvupMessages.push(tempMessage);

            // それ以外
            } else {
                // 半角スペースを追加
                tempMessage += " ";
            }

            count++;
        }
    }

    // 本来のレベルアップメッセージを取得
    const levelUpMessage = TextManager.levelUp.format(
        this._name,
        TextManager.level,
        this._level
    );

    // 出力するメッセージを後ろから検索する。
    for (let i = $gameMessage._texts.length - 1; i >= 0; i--) {
        // レベルアップメッセージを探す。
        if ($gameMessage._texts[i] == levelUpMessage) {
            // レベルアップメッセージの前にレベルアップ検出用の制御文字を埋め込む。
            // ※\LUC[アクターＩＤ]
            $gameMessage._texts[i] = "\\" + LEVEL_UP_CODE + "[" + this.actorId() + "]" + $gameMessage._texts[i];

            // 一行あとにパラメータ上昇量を出力
            for (const lvupMessage of lvupMessages) {
                $gameMessage._texts.splice(i + 1, 0, lvupMessage);
                i++;
            }
            return;
        }
    }
};

//-----------------------------------------------------------------------------
// Window_Message
//-----------------------------------------------------------------------------

/**
 * ●制御文字の処理
 */
const _Window_Message_processEscapeCharacter = Window_Message.prototype.processEscapeCharacter;
Window_Message.prototype.processEscapeCharacter = function(code, textState) {
    // レベルアップ検出用の制御文字と一致した場合
    if (mIsLevelUpDirection && code == LEVEL_UP_CODE) {
        // アクターＩＤを取得
        const actorId = this.obtainEscapeParam(textState);

        // DynamicAnimationの指定がある場合は呼び出し
        if (pDynamicSkill) {
            const actor = $gameActors.actor(actorId);
            callDynamic(actor, pDynamicSkill);
        }
        // 効果音
        if (pLevelUpSe) {
            AudioManager.playSe({"name":pLevelUpSe, "volume":90, "pitch":100, "pan":0})
        }
        // ＭＥ
        if (pLevelUpMe) {
            AudioManager.playMe({"name":pLevelUpMe, "volume":90, "pitch":100, "pan":0})
        }
        return;
    }

    _Window_Message_processEscapeCharacter.apply(this, arguments);
};

//-----------------------------------------------------------------------------
// BattleManager
//-----------------------------------------------------------------------------

/**
 * ●戦闘終了
 */
const _BattleManager_updateBattleEnd = BattleManager.updateBattleEnd;
BattleManager.updateBattleEnd = function() {
    _BattleManager_updateBattleEnd.apply(this, arguments);
    // 演出判定終了
    mIsLevelUpDirection = false;
}

// ----------------------------------------------------------------------------
// NRP_AdditionalClasses.jsとの連携
// ----------------------------------------------------------------------------

if (typeof AdditionalClass !== "undefined") {
    const AC_PLUGIN_NAME = "NRP_AdditionalClasses";
    const acParameters = PluginManager.parameters(AC_PLUGIN_NAME);
    const pLvUpMessage = setDefault(acParameters["LvUpMessage"]);

    /**
     * ●レベルアップメッセージの表示
     */
    const _AdditionalClass_displayLevelUp = AdditionalClass.prototype.displayLevelUp;
    AdditionalClass.prototype.displayLevelUp = function(newSkills) {
        _AdditionalClass_displayLevelUp.apply(this, arguments);

        // レベルアップメッセージがない場合はどうしようもないので終了
        if (!pLvUpMessage) {
            return;
        }

        const actor = this.actor();
        const levelUpMessage = pLvUpMessage.format(
            actor.name(),
            this.name,
            this._level
        );

        // 出力するメッセージを後ろから検索する。
        for (let i = $gameMessage._texts.length - 1; i >= 0; i--) {
            // レベルアップメッセージを探す。
            if ($gameMessage._texts[i] == levelUpMessage) {
                // レベルアップメッセージの前にレベルアップ検出用の制御文字を埋め込む。
                // ※\ACLUC[アクターＩＤ]
                $gameMessage._texts[i] = "\\" + AC_LEVEL_UP_CODE + "[" + actor.actorId() + "]" + $gameMessage._texts[i];
                return;
            }
        }
    };

    /**
     * ●制御文字の処理
     */
    const _Window_Message_processEscapeCharacter2 = Window_Message.prototype.processEscapeCharacter;
    Window_Message.prototype.processEscapeCharacter = function(code, textState) {
        // レベルアップ検出用の制御文字と一致した場合
        if (code == AC_LEVEL_UP_CODE) {
            // アクターＩＤを取得
            const actorId = this.obtainEscapeParam(textState);

            // DynamicAnimationの指定がある場合は呼び出し
            if (pAC_DynamicSkill) {
                const actor = $gameActors.actor(actorId);
                callDynamic(actor, pAC_DynamicSkill);
            }
            // 効果音
            if (pAC_LevelUpSe) {
                AudioManager.playSe({"name":pAC_LevelUpSe, "volume":90, "pitch":100, "pan":0})
            }
            // ＭＥ
            if (pAC_LevelUpMe) {
                AudioManager.playMe({"name":pAC_LevelUpMe, "volume":90, "pitch":100, "pan":0})
            }
            return;
        }

        _Window_Message_processEscapeCharacter2.apply(this, arguments);
    };
}

//-----------------------------------------------------------------------------
// 共通関数
//-----------------------------------------------------------------------------

/**
 * ●DynamicAnimation&Motionを呼び出し
 */
function callDynamic(battler, dynamicId) {
    // 戦闘時以外は処理しない。
    if (!$gameParty.inBattle()) {
        return;
    }

    // 実行するDynamicAnimation情報を持ったアクション
    const dynamicAction = makeAction(dynamicId, battler);
    // バトラーを対象にする。
    const targets = [battler];
    // 引き継ぎたい情報をセット
    const mapAnimation = [];
    // バトラーを行動主体にする。
    // ※これがないと行動主体を取得できない。
    mapAnimation.subject = battler;
    // 空のWindow_BattleLogを作成し、DynamicAnimationを起動
    const win = new Window_BattleLog(new Rectangle());
    win.showDynamicAnimation(targets, dynamicAction, false, mapAnimation);
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
