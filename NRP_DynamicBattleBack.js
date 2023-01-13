//=============================================================================
// NRP_DynamicBattleBack.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.04 Display DynamicAnimation to match the battle background.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/488123194.html
 *
 * @help Display DynamicAnimation to match the battle background.
 * In addition, common event can be executed.
 * 
 * The following plugins are required to show DynamicAnimation.
 * 
 * - NRP_DynamicAnimationMZ.js
 * - NRP_DynamicAnimationMapMZ.js
 * ※Or MV version of the above.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Settings are made for
 * each battle background (battlebacks1, battlebacks2) file.
 * Specify the file and the skill number
 * to display in each settings list.
 * Multiple DynamicAnimations can be specified for a single background.
 * 
 * If both battlebacks1 and battlebacks2 are used as conditions,
 * DynamicAnimation will be displayed only when both match.
 * Normally, only one of them is sufficient.
 * 
 * Basically, the animation is assumed
 * to be displayed for the entire screen.
 * Please refer to each sample of the map version
 * of DynamicAnimation for specific details.
 * 
 * https://newrpg.seesaa.net/article/477704129.html
 * 
 * -------------------------------------------------------------------
 * [Notice]
 * -------------------------------------------------------------------
 * A switch can be specified for a condition,
 * but the specification is not immediately reflected even
 * if the switch is made during battle.
 * 
 * If you need such detailed control,
 * I recommend NRP_BattleParallelCommon.js.
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 * 
 * @------------------------------------------------------------------
 * @ [Plugin Parameters]
 * @------------------------------------------------------------------
 * 
 * @param BattlebackSettingList
 * @type struct<BattlebackSetting>[]
 * @default
 * @desc List of settings for each battle background.
 * 
 * @param WaitLoadImage
 * @type boolean
 * @default true
 * @desc When displaying an image in a common event, wait for fade-in until image loading is complete.
 */
//-----------------------------------------------------------------------------
// BattlebackSetting
//-----------------------------------------------------------------------------
/*~struct~BattlebackSetting:
 * @param Memo
 * @type string
 * @desc This is a memo for identification.
 * It is not used for processing.
 * 
 * @param <Condition>
 *
 * @param Battleback1
 * @parent <Condition>
 * @type file
 * @dir img/battlebacks1
 * @desc The battle background (below) is the condition for executing.
 * 
 * @param Battleback2
 * @parent <Condition>
 * @type file
 * @dir img/battlebacks2
 * @desc The battle background (above) is the condition for executing.
 * 
 * @param Switch
 * @parent <Condition>
 * @type switch
 * @desc This is a switch that serves as the execution condition.
 * 
 * @param <Directing>
 * 
 * @param DynamicSkill
 * @parent <Directing>
 * @type skill
 * @desc DynamicAnimation skills to execute.
 * 
 * @param CommonEvent
 * @parent <Directing>
 * @type common_event
 * @desc A common event that is executed at battle start.
 * It is executed before the fade-in on the screen.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.04 戦闘背景に合わせてDynamicAnimationを表示。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/488123194.html
 *
 * @help 戦闘背景に合わせてDynamicAnimationを表示します。
 * ついでにコモンイベントも実行できます。
 * 
 * DynamicAnimationの表示には、以下のプラグインが必要です。
 * 
 * ・NRP_DynamicAnimationMZ.js
 * ・NRP_DynamicAnimationMapMZ.js
 * ※もしくは上記のＭＶ版
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * 設定は戦闘背景（battlebacks1, battlebacks2）のファイル毎に行います。
 * 各設定リストにファイルと表示するスキル番号を指定してください。
 * 一つの背景に対して複数のDynamicAnimationを指定することも可能です。
 * 
 * 戦闘背景１と戦闘背景２の両方を条件にした場合は、
 * 両方が一致した場合のみDynamicAnimationの表示を行います。
 * 通常は片方だけで十分だと思います。
 * 
 * 基本的には、画面全体に対して表示するアニメーションを想定しています。
 * 具体的には、マップ版DynamicAnimationの各サンプルをご覧ください。
 * https://newrpg.seesaa.net/article/477704129.html
 * 
 * -------------------------------------------------------------------
 * ■注意点
 * -------------------------------------------------------------------
 * 条件にスイッチを指定することもできますが、
 * 戦闘中に切り替えても即座に反映されない仕様です。
 * 
 * そういった細かい制御が必要な場合は、
 * NRP_BattleParallelCommon.jsをオススメします。
 * 
 * -------------------------------------------------------------------
 * ■利用規約
 * -------------------------------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @------------------------------------------------------------------
 * @ プラグインパラメータ
 * @------------------------------------------------------------------
 * 
 * @param BattlebackSettingList
 * @text 戦闘背景の設定
 * @type struct<BattlebackSetting>[]
 * @default
 * @desc 戦闘背景毎の設定一覧です。
 * 
 * @param WaitLoadImage
 * @text 画像のロードを待つ
 * @type boolean
 * @default true
 * @desc コモンイベント内で画像の表示を指定した場合、
 * 画像の読込完了までフェードインを待ちます。
 */
//-----------------------------------------------------------------------------
// BattlebackSetting
//-----------------------------------------------------------------------------
/*~struct~BattlebackSetting:ja
 * @param Memo
 * @text メモ
 * @type string
 * @desc 判別用のメモです。
 * 分かりやすい名前を付けてください。
 * 
 * @param <Condition>
 * @text ＜条件＞
 *
 * @param Battleback1
 * @parent <Condition>
 * @text 戦闘背景１
 * @type file
 * @dir img/battlebacks1
 * @desc 実行条件となる戦闘背景（下）です。
 * 
 * @param Battleback2
 * @parent <Condition>
 * @text 戦闘背景２
 * @type file
 * @dir img/battlebacks2
 * @desc 実行条件となる戦闘背景（上）です。
 * 
 * @param Switch
 * @parent <Condition>
 * @text スイッチ
 * @type switch
 * @desc 実行条件となるスイッチです。
 * 
 * @param <Directing>
 * @text ＜演出＞
 * 
 * @param DynamicSkill
 * @parent <Directing>
 * @text Dynamic用スキル
 * @type skill
 * @desc 実行するDynamicAnimationのスキルです。
 * 
 * @param CommonEvent
 * @parent <Directing>
 * @text コモンイベント
 * @type common_event
 * @desc 戦闘開始直後に実行するコモンイベントです。
 * 画面のフェードインより先に実行されます。
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

/**
 * ●構造体（二重配列）をJSで扱えるように変換
 */
function parseStruct2(arg) {
    var ret = [];

    if (arg) {
        JSON.parse(arg).forEach(function(str) {
            ret.push(JSON.parse(str));
        });
    }

    return ret;
}

const PLUGIN_NAME = "NRP_DynamicBattleBack";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pBattlebackSettingList = parseStruct2(parameters["BattlebackSettingList"]);
const pWaitLoadImage = toBoolean(parameters["WaitLoadImage"], true);

/**
 * ●効率化のため事前変換
 */
for (const setting of pBattlebackSettingList) {
    setting.battleback1 = setDefault(setting.Battleback1);
    setting.battleback2 = setDefault(setting.Battleback2);
    setting.switch = toNumber(setting.Switch);
    setting.dynamicSkill = toNumber(setting.DynamicSkill);
    setting.commonEvent = setDefault(setting.CommonEvent);
}

//-----------------------------------------------------------------------------
// Spriteset_Battle
//-----------------------------------------------------------------------------

/**
 * 敵キャラの作成
 */
const _Spriteset_Battle_createEnemies = Spriteset_Battle.prototype.createEnemies;
Spriteset_Battle.prototype.createEnemies = function() {
    _Spriteset_Battle_createEnemies.apply(this, arguments);

    // 背景アニメの管理に使うダミーエネミーを追加
    const enemy = new Game_Enemy(1, 9999, 9999);
    // 隠れる状態にしておく。
    enemy.hide();

    // DynamicAnimationMapが有効の場合
    if (enemy.dynamicSkills) {
        // 設定がなければ終了
        if (!this._battleBackDynamicSettings) {
            return;
        }

        // ダミーエネミーのスプライトを作成し追加
        const sprite = new Sprite_Enemy(enemy);
        this._enemySprites.push(sprite);
        this._battleField.addChild(sprite);

        // 実行対象に追加
        for (const setting of this._battleBackDynamicSettings) {
            if (setting.dynamicSkill) {
                enemy.dynamicSkills.push(setting.dynamicSkill);
            }
        }
    }
};

/**
 * ●戦闘背景の作成
 */
const _Spriteset_Battle_createBattleback = Spriteset_Battle.prototype.createBattleback;
Spriteset_Battle.prototype.createBattleback = function() {
    _Spriteset_Battle_createBattleback.apply(this, arguments);

    // ＭＺとＭＶで取得先が異なる。
    let battleback1Name;
    let battleback2Name;
    // ＭＺ
    if (this._back1Sprite.battleback1Name) {
        battleback1Name = this._back1Sprite.battleback1Name();
    // ＭＶ
    } else if (this.battleback1Name) {
        battleback1Name = this.battleback1Name();
    }
    // ＭＺ
    if (this._back2Sprite.battleback2Name) {
        battleback2Name = this._back2Sprite.battleback2Name();
    // ＭＶ
    } else if (this.battleback2Name) {
        battleback2Name = this.battleback2Name();
    }

    // 条件に一致する設定を反映
    this._battleBackDynamicSettings = getMatchSettings(battleback1Name, battleback2Name);
};

//-----------------------------------------------------------------------------
// Game_Troop
//-----------------------------------------------------------------------------

/*
 * Game_Troop.prototype.onBattleStartが未定義の場合は事前に定義
 * ※これをしておかないと以後のGame_Unit側への追記が反映されない。
 */
if (Game_Troop.prototype.onBattleStart == Game_Unit.prototype.onBattleStart) {
    Game_Troop.prototype.onBattleStart = function(advantageous) {
        Game_Unit.prototype.onBattleStart.apply(this, arguments);
    }
}

/**
 * ●戦闘開始
 */
const _Game_Troop_onBattleStart = Game_Troop.prototype.onBattleStart;
Game_Troop.prototype.onBattleStart = function(advantageous) {
    _Game_Troop_onBattleStart.apply(this, arguments);

    const spriteset = getSpriteset();
    // コモンイベントを実行
    for (const setting of spriteset._battleBackDynamicSettings) {
        const commonEvent = eval(setting.commonEvent);
        $gameTemp.reserveCommonEvent(commonEvent);
        this._interpreter.setupReservedCommonEvent();
        this._interpreter.update();
    }
};

//-----------------------------------------------------------------------------
// Scene_Battle
//-----------------------------------------------------------------------------

/**
 * ●画像のロードを待つ
 */
if (pWaitLoadImage) {
    /*
    * Scene_Battle.prototype.updateFadeが未定義の場合は事前に定義
    * ※これをしておかないと以後のGame_Unit側への追記が反映されない。
    */
    if (Scene_Battle.prototype.updateFade == Scene_Base.prototype.updateFade) {
        Scene_Battle.prototype.updateFade = function() {
            Scene_Base.prototype.updateFade.apply(this, arguments);
        }
    }

    /**
     * ●フェード処理の更新
     */
    const _Scene_Battle_updateFade = Scene_Battle.prototype.updateFade;
    Scene_Battle.prototype.updateFade = function() {
        if (!ImageManager.isReady()) {
            return;
        }
        _Scene_Battle_updateFade.apply(this, arguments);
    };
}

//-----------------------------------------------------------------------------
// 共通
//-----------------------------------------------------------------------------

/**
 * ●戦闘背景に一致する設定（複数）を取得する。
 */
function getMatchSettings(battleback1Name, battleback2Name) {
    // 戦闘背景１、戦闘背景２、スイッチの条件が一致するか？
    const battlebackSettings = pBattlebackSettingList.filter(setting =>
        isMatch(setting.battleback1, battleback1Name)
        && isMatch(setting.battleback2, battleback2Name)
        && (!setting.switch || $gameSwitches.value(setting.switch))
    );
    return battlebackSettings;
}

/**
 * ●設定が一致するか確認
 */
function isMatch(settingValue, compareValue) {
    // 設定値が存在しない場合は有効と判定
    if (settingValue == null) {
        return true;
    }
    return settingValue == compareValue;
}

/**
 * ●現在の画面のSpritesetを取得する。
 */
function getSpriteset() {
    return SceneManager._scene._spriteset;
}

})();
