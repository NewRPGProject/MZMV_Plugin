//=============================================================================
// NRP_SeamlessEncounter.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.02 Make the battle start effect seamless.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/502501086.html
 *
 * @help It provides a seamless battle start effect
 * with no intervening darkening.
 * Zooming and rotation are also possible.
 * 
 * Note that even with seamless effects,
 * a minimum loading time is required.
 * Therefore, I cheat by adding zoom
 * and rotation effects in the initial state.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Register settings in EncounterList.
 * Settings on the upper side will be used first.
 * For example, by making a switch a condition,
 * you can change the direction only for boss battles.
 * 
 * If "NoEffect" is turned on, the effect
 * by this plugin will not be executed.
 * This is useful when you want to use this plugin
 * together with other plugins.
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
 * @ Plugin Parameters
 * @-----------------------------------------------------
 * 
 * @param EncounterList
 * @type struct<Encounter>[]
 * @default ["{\"Note\":\"Sample\",\"Switch\":\"\",\"BeforeDuration\":\"30\",\"ZoomSpeed\":\"0.20\",\"RotationSpeed\":\"0.20\",\"FadeInDuration\":\"30\",\"WaitFadeIn\":\"true\"}"]
 * @desc The following is a list of the battle start effects.
 */
//-----------------------------------------------------------------------------
// Encounter
//-----------------------------------------------------------------------------
/*~struct~Encounter:
 * @param Note
 * @type string
 * @desc Explanatory notes.
 * Not used for processing.
 * 
 * @param Switch
 * @type switch
 * @desc This is a switch that is used as a condition.
 * If blank, it is always valid.
 * 
 * @param BeforeDuration
 * @type number
 * @default 10
 * @desc Time to start fade-in (in 1/60 second increments).
 * Even if set to 0, a minimum loading time will occur.
 * 
 * @param ZoomSpeed
 * @type number @decimals 2
 * @default 0
 * @desc Zoom speed (per 1/60 second) during the start of battle effect.
 * 
 * @param RotationSpeed
 * @type number @decimals 2 @min -9 @max 9
 * @default 0
 * @desc Rotation speed (per 1/60 second) during the start of battle effect.
 * 
 * @param FadeInDuration
 * @type number
 * @default 30
 * @desc The time it takes for the combat screen to fade in after loading is complete.
 * 
 * @param WaitFadeIn
 * @type boolean
 * @default true
 * @desc Wait for the fade-in process to finish before the player's operation takes effect.
 * 
 * @param Se
 * @type struct<SeSetting>
 * @desc It is a sound effect to be played.
 * 
 * @param NoEffect
 * @type boolean
 * @default false
 * @desc The plugin does not execute the effect.
 * However, only sound effects are played.
 */
/*~struct~SeSetting:
 * @param Name
 * @type file
 * @dir audio/se
 * @desc File name of the SE.
 * 
 * @param Volume
 * @type number
 * @max 200
 * @default 90
 * @desc The volume of the SE.
 * The default value is 90.
 * 
 * @param Pitch
 * @type number
 * @default 100
 * @desc The pitch of the SE.
 * Set the value based on 100.
 * 
 * @param Pan
 * @type number
 * @max 100 @min -100
 * @default 0
 * @desc The pan of the SE.
 * Set the value based on 0.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.02 戦闘開始演出をシームレスにします。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/502501086.html
 *
 * @help 暗転を挟まないシームレスな戦闘開始演出を提供します。
 * ズームや回転などの演出も同時に可能です。
 * 
 * なお、シームレスといっても最低限のロード時間は必要となるので、
 * 初期状態ではズームおよび回転演出を入れることでごまかしています。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * 戦闘開始演出リストに設定を登録してください。
 * 上側にある設定が優先して使用されます。
 * スイッチを条件にすることで、
 * ボス戦のみ演出を変更するといったことができます。
 * 
 * また、『演出なし』をオンにすると、
 * 当プラグインによる演出が実行されなくなります。
 * 他のプラグインによる演出と併用したい場合に有用です。
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
 * @param EncounterList
 * @text 戦闘開始演出リスト
 * @type struct<Encounter>[]
 * @default ["{\"Note\":\"サンプル\",\"Switch\":\"\",\"BeforeDuration\":\"30\",\"ZoomSpeed\":\"0.20\",\"RotationSpeed\":\"0.20\",\"FadeInDuration\":\"30\",\"WaitFadeIn\":\"true\"}"]
 * @desc 戦闘開始演出の一覧です。
 */
//-----------------------------------------------------------------------------
// Encounter
//-----------------------------------------------------------------------------
/*~struct~Encounter:ja
 * @param Note
 * @text メモ
 * @type string
 * @desc 説明用のメモです。
 * 処理には使用しません。
 * 
 * @param Switch
 * @text スイッチ
 * @type switch
 * @desc 条件とするスイッチです。
 * 空欄なら常に有効となります。
 * 
 * @param BeforeDuration
 * @text 開始演出時間
 * @type number
 * @default 10
 * @desc フェードイン開始までの時間（1/60秒単位）です。
 * 0にしても最低限のロード時間は発生します。
 * 
 * @param ZoomSpeed
 * @text ズーム速度
 * @type number @decimals 2
 * @default 0
 * @desc 戦闘開始演出時のズーム速度（1/60秒当たり）です。
 * 
 * @param RotationSpeed
 * @text 回転速度
 * @type number @decimals 2 @min -9 @max 9
 * @default 0
 * @desc 戦闘開始演出時の回転速度（1/60秒当たり）です。
 * 
 * @param FadeInDuration
 * @text フェードイン時間
 * @type number
 * @default 30
 * @desc ロード完了後に戦闘画面をフェードイン表示するまでの時間です。
 * 
 * @param WaitFadeIn
 * @text フェードインを待つ
 * @type boolean
 * @default true
 * @desc フェードイン処理の終了を待ってから操作を有効にします。
 * 
 * @param Se
 * @text 効果音
 * @type struct<SeSetting>
 * @desc 演奏する効果音です。
 * 
 * @param NoEffect
 * @text 演出なし
 * @type boolean
 * @default false
 * @desc 当プラグインによる演出を実行しません。
 * ただし、効果音だけは演奏されます。
 */
/*~struct~SeSetting:ja
 * @param Name
 * @text ファイル名
 * @type file
 * @dir audio/se
 * @desc ＳＥのファイル名です。
 * 
 * @param Volume
 * @text 音量
 * @type number
 * @max 200
 * @default 90
 * @desc 効果音の音量です。
 * 初期値は90です。
 * 
 * @param Pitch
 * @text ピッチ
 * @type number
 * @default 100
 * @desc 効果音のピッチです。
 * 100を基準に設定してください。
 * 
 * @param Pan
 * @text 位相
 * @type number
 * @max 100 @min -100
 * @default 0
 * @desc 効果音の位相です。
 * 0を基準に設定してください。
 */

(function() {
"use strict";

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

const PLUGIN_NAME = "NRP_SeamlessEncounter";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pEncounterList = parseStruct2(parameters["EncounterList"]);

//-----------------------------------------------------------------------------
// Scene_Map
//-----------------------------------------------------------------------------

/**
 * ●戦闘開始エフェクト
 */
const _Scene_Map_startEncounterEffect = Scene_Map.prototype.startEncounterEffect;
Scene_Map.prototype.startEncounterEffect = function() {
    const encounterData = getEncounterData();
    if (encounterData) {
        // 効果音の演奏
        if (encounterData.Se) {
            const seData = JSON.parse(encounterData.Se);
            if (seData && seData.Name) {
                AudioManager.playSe({"name":seData.Name, "volume":seData.Volume, "pitch":seData.Pitch, "pan":seData.Pan})
            }
        }

        // 演出なし
        if (encounterData.NoEffect) {
            _Scene_Map_startEncounterEffect.apply(this, arguments);
            return;
        }

        // キャラクターは残しておく。
        // this._spriteset.hideCharacters();
        // this._encounterEffectDuration = this.encounterEffectSpeed();

        this._encounterEffectDuration = 0;

        BattleManager.playBattleBgm();
        // 現在の画面をキャプチャしてマスクを準備
        this.snapForBattleBackground();
        return;
    }

    _Scene_Map_startEncounterEffect.apply(this, arguments);
};

//-----------------------------------------------------------------------------
// Scene_Battle
//-----------------------------------------------------------------------------

/**
 * ●表示オブジェクトの作成
 */
const _Scene_Battle_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
Scene_Battle.prototype.createDisplayObjects = function() {
    _Scene_Battle_createDisplayObjects.apply(this, arguments);

    // マスクの作成
    this.createFrontMask();
};

/**
 * 【独自】前面にマップ画面のキャプチャを表示してマスクする。
 */
Scene_Battle.prototype.createFrontMask = function() {
    this._frontMaskSprite = null;

    // 対象の戦闘演出リストを取得
    const encounterData = getEncounterData();

    // 取得できない場合は終了
    if (!encounterData) {
        return;
    // 無効の場合は終了
    } else if (toBoolean(encounterData.NoEffect)) {
        return;
    }

    this._encounterData = encounterData;

    this._frontMaskSprite = new Sprite();
    this._frontMaskSprite.bitmap = SceneManager.backgroundBitmap();
    this._frontMaskSprite.anchor.x = 0.5;
    this._frontMaskSprite.anchor.y = 0.5;
    this._frontMaskSprite.x = Graphics.width / 2;
    this._frontMaskSprite.y = Graphics.height / 2;
    this.addChild(this._frontMaskSprite);
};

/**
 * ●戦闘開始のフェードイン
 */
const _Scene_Battle_startFadeIn = Scene_Battle.prototype.startFadeIn;
Scene_Battle.prototype.startFadeIn = function(duration, white) {
    // 処理の指定がある場合は終了
    if (this._encounterData) {
        return;
    }
    _Scene_Battle_startFadeIn.apply(this, arguments);
};


let mEffectTime = 0;

/**
 * ●更新
 */
const _Scene_Battle_update = Scene_Battle.prototype.update;
Scene_Battle.prototype.update = function() {
    // 演出対象外の場合は終了
    if (!this._frontMaskSprite) {
        _Scene_Battle_update.apply(this, arguments);
        return;
    }

    const data = this._encounterData;

    // 経過時間
    mEffectTime++;

    const rotationSpeed = toNumber(eval(data.RotationSpeed), 0);
    const zoomSpeed = toNumber(eval(data.ZoomSpeed), 0);
    const beforeDuration = toNumber(eval(data.BeforeDuration), 0);
    const fadeInDuration = toNumber(eval(data.FadeInDuration), 0) + 1;

    // 演出
    this._frontMaskSprite.rotation += rotationSpeed;
    this._frontMaskSprite.scale.x += zoomSpeed;
    this._frontMaskSprite.scale.y += zoomSpeed;

    // ロード中の画像がある場合は停止
    // または、指定時間まで
    if (!ImageManager.isReady() || mEffectTime < beforeDuration) {
        return;
    }

    // 準備完了ならマスクを透明化していく
    this._frontMaskSprite.opacity -= (255 / fadeInDuration);
    if (this._frontMaskSprite.opacity <= 0) {
        // マスク消去
        this.removeChild(this._frontMaskSprite);
        this._frontMaskSprite = null;
    }

    _Scene_Battle_update.apply(this, arguments);
};

/**
 * Scene_Battle.prototype.isBusyが未定義の場合は事前に定義
 * ※これをしておかないと以後のScene_Base側への追記が反映されない。
 */
if (Scene_Battle.prototype.isBusy == Scene_Base.prototype.isBusy) {
    Scene_Battle.prototype.isBusy = function() {
        return Scene_Base.prototype.isBusy.apply(this, arguments);
    }
}

/**
 * ●処理待ちするかどうか？
 */
const _Scene_Battle_isBusy = Scene_Battle.prototype.isBusy;
Scene_Battle.prototype.isBusy = function() {
    if (this._encounterData) {
        const waitFadeIn = toBoolean(this._encounterData.WaitFadeIn, false);
        // フェードインを待つ場合、マスクが残っている間は処理しない。
        if (waitFadeIn) {
            return _Scene_Battle_isBusy.apply(this, arguments) || this._frontMaskSprite;
        }
    }
    return _Scene_Battle_isBusy.apply(this, arguments);
};

//-----------------------------------------------------------------------------
// 共通関数
//-----------------------------------------------------------------------------

/**
 * ●エンカウントデータを取得
 */
function getEncounterData() {
    // 対象の戦闘演出リストを取得
    for (const encounter of pEncounterList) {
        const switchNo = setDefault(encounter.Switch);
        // スイッチの指定がない。またはスイッチが一致している場合
        if (!switchNo || $gameSwitches.value(switchNo)) {
            return encounter;
        }
    }
    return null;
}

})();
