//=============================================================================
// NRP_AudioManager.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Manage audio files.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/483999181.html
 *
 * @help Manage audio files.
 * 
 * ------------------------------------------
 * [Functions]
 * ------------------------------------------
 * ◆Audio Alias Function
 * For example, if you want to set the boss battle music in Maker,
 * you may use the "Change Battle BGM" command
 * to set the boss battle music, and then change it back
 * to the normal battle music after the battle.
 * 
 * The problem is if you then want to change
 * the boss battle music or normal battle music.
 * The operation needs to be changed for all boss battle events.
 * 
 * If you set up a dummy file in advance,
 * you can replace that song with another file.
 * You will not have to bother to change all the event commands.
 * 
 * Also, if you want to change the normal battle music
 * from the second half of the game,
 * you can branch it by means of a switch.
 * 
 * ◆Audio Adjustment Function
 * For example, when playing an ogg file imported as material,
 * the volume is sometimes out of balance with other materials.
 * There is a way to adjust the volume every time you play,
 * but it is difficult if you want to change it later.
 * 
 * If you use this plug-in to set the volume in such cases,
 * you will not have to set it every time you play.
 * In particular, you can set the volume to over 100,
 * which is normally impossible.
 * 
 * You can also change the start point of BGM and BGS.
 * You can eliminate unnatural space by moving back
 * the start point of ogg that contain long space at the beginning.
 * 
 * ※If you use this function together with the Audio Alias Function,
 *   please set it for the file after the replacement.
 * 
 * ------------------------------------------
 * [Terms]
 * ------------------------------------------
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 * 
 * @param <BGM>
 * 
 * @param BgmSettings
 * @parent <BGM>
 * @type struct<BgmSetting>[]
 * @desc Set the volume and other settings for each BGM file.
 * 
 * @param BgmAliases
 * @parent <BGM>
 * @type struct<BgmAlias>[]
 * @desc Replaces the BGM file and plays it.
 * The higher the setting, the higher the priority.
 * 
 * @param <BGS>
 * 
 * @param BgsSettings
 * @parent <BGS>
 * @type struct<BgsSetting>[]
 * @desc Set the volume and other settings for each BGS file.
 * 
 * @param BgsAliases
 * @parent <BGS>
 * @type struct<BgsAlias>[]
 * @desc Replaces the BGS file and plays it.
 * The higher the setting, the higher the priority.
 * 
 * @param <ME>
 * 
 * @param MeSettings
 * @parent <ME>
 * @type struct<MeSetting>[]
 * @desc Set the volume and other settings for each ME file.
 * 
 * @param MeAliases
 * @parent <ME>
 * @type struct<MeAlias>[]
 * @desc Replaces the ME file and plays it.
 * The higher the setting, the higher the priority.
 * 
 * @param <SE>
 * 
 * @param SeSettings
 * @parent <SE>
 * @type struct<SeSetting>[]
 * @desc Set the volume and other settings for each SE file.
 * 
 * @param SeAliases
 * @parent <SE>
 * @type struct<SeAlias>[]
 * @desc Replaces the SE file and plays it.
 * The higher the setting, the higher the priority.
 */

/*~struct~BgmSetting:
 * @param Name
 * @type file
 * @dir audio/bgm
 * @desc File name of the BGM.
 * 
 * @param Volume
 * @type number
 * @max 400
 * @default 100
 * @desc The volume of the BGM.
 * Set the value based on 100.
 * 
 * @param Pitch
 * @type number
 * @desc The pitch of the BGM.
 * Set the value based on 100.
 * 
 * @param Pan
 * @type number
 * @max 100 @min -100
 * @desc The pan of the BGM.
 * Set the value based on 0.
 * 
 * @param Pos
 * @type number
 * @max 999 @decimals 2
 * @desc The starting point of the BGM (in seconds).
 */

/*~struct~BgmAlias:
 * @param FromFileName
 * @type file
 * @dir audio/bgm
 * @desc The file name before the replacement.
 * 
 * @param ToFileName
 * @type file
 * @dir audio/bgm
 * @desc The file name after the replacement.
 * 
 * @param Switch
 * @type switch
 * @desc This switch is used to enable the replacement setting.
 */

/*~struct~BgsSetting:
 * @param Name
 * @type file
 * @dir audio/bgs
 * @desc File name of the BGS.
 * 
 * @param Volume
 * @type number
 * @max 400
 * @default 100
 * @desc The volume of the BGS.
 * Set the value based on 100.
 * 
 * @param Pitch
 * @type number
 * @desc The pitch of the BGS.
 * Set the value based on 100.
 * 
 * @param Pan
 * @type number
 * @max 100 @min -100
 * @desc The pan of the BGS.
 * Set the value based on 0.
 * 
 * @param Pos
 * @type number
 * @max 999 @decimals 2
 * @desc The starting point of the BGS (in seconds).
 */

/*~struct~BgsAlias:
 * @param FromFileName
 * @type file
 * @dir audio/bgs
 * @desc The file name before the replacement.
 * 
 * @param ToFileName
 * @type file
 * @dir audio/bgs
 * @desc The file name after the replacement.
 * 
 * @param Switch
 * @type switch
 * @desc This switch is used to enable the replacement setting.
 */

/*~struct~MeSetting:
 * @param Name
 * @type file
 * @dir audio/me
 * @desc File name of the ME.
 * 
 * @param Volume
 * @type number
 * @max 400
 * @default 100
 * @desc The volume of the ME.
 * Set the value based on 100.
 * 
 * @param Pitch
 * @type number
 * @desc The pitch of the ME.
 * Set the value based on 100.
 * 
 * @param Pan
 * @type number
 * @max 100 @min -100
 * @desc The pan of the ME.
 * Set the value based on 0.
 */

/*~struct~MeAlias:
 * @param FromFileName
 * @type file
 * @dir audio/me
 * @desc The file name before the replacement.
 * 
 * @param ToFileName
 * @type file
 * @dir audio/me
 * @desc The file name after the replacement.
 * 
 * @param Switch
 * @type switch
 * @desc This switch is used to enable the replacement setting.
 */

/*~struct~SeSetting:
 * @param Name
 * @type file
 * @dir audio/se
 * @desc File name of the SE.
 * 
 * @param Volume
 * @type number
 * @max 400
 * @default 100
 * @desc The volume of the SE.
 * Set the value based on 100.
 * 
 * @param Pitch
 * @type number
 * @desc The pitch of the SE.
 * Set the value based on 100.
 * 
 * @param Pan
 * @type number
 * @max 100 @min -100
 * @desc The pan of the SE.
 * Set the value based on 0.
 */

/*~struct~SeAlias:
 * @param FromFileName
 * @type file
 * @dir audio/se
 * @desc The file name before the replacement.
 * 
 * @param ToFileName
 * @type file
 * @dir audio/se
 * @desc The file name after the replacement.
 * 
 * @param Switch
 * @type switch
 * @desc This switch is used to enable the replacement setting.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 音声ファイルの管理を行う。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/483999181.html
 *
 * @help 音声ファイルの管理を行います。
 * 
 * ------------------------------------------
 * ■機能
 * ------------------------------------------
 * ◆音声置換機能
 * 例えば、ツクールでボス戦曲を設定する場合、
 * 『戦闘ＢＧＭの変更』コマンドによって、
 * ボス戦曲を設定し、戦闘後に通常戦闘曲に戻す
 * というような操作を行うかと思います。
 * 
 * 問題はその後、ボス戦曲や通常戦闘曲を変更したくなった場合です。
 * 全てのボス戦イベントに対して変更を行う必要があります。
 * 
 * このプラグインではあらかじめダミーのファイルを設定しておけば、
 * その曲を設定したファイルへ置換して演奏することが可能です。
 * いちいち全てのイベントを変更する必要がなくなります。
 * 
 * また、ゲーム後半は通常戦闘曲を変更したいという場合は、
 * スイッチによって分岐させることもできます。
 * 
 * ◆音声調整機能
 * 例えば、素材として取り込んだoggファイルを演奏する場合、
 * 他の素材と音量の釣り合いが取れてないことが時々あります。
 * 演奏時にいちいち音量を調整する方法もありますが、
 * 後で変更したくなった場合が大変です。
 * 
 * そんな時にこのプラグインで音量を設定してしまえば、
 * 演奏毎に設定する必要がなくなります。
 * 特に通常は不可能な100以上の音量も設定可能です。
 * 
 * また、ＢＧＭやＢＧＳの開始時点を変更できます。
 * 先頭に長めの空白が含まれているoggの開始時点を後ろにすれば、
 * 不自然な空白をなくすことができます。
 * 
 * ※音声置換機能と併用する場合は、
 * 　置換後のファイルに対して設定してください。
 * 
 * ------------------------------------------
 * ■利用規約
 * ------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param <BGM>
 * @text ＜ＢＧＭ＞
 * 
 * @param BgmSettings
 * @parent <BGM>
 * @text ＢＧＭ設定
 * @type struct<BgmSetting>[]
 * @desc ＢＧＭファイル毎に音量などの設定を行います。
 * 
 * @param BgmAliases
 * @parent <BGM>
 * @text ＢＧＭ置換設定
 * @type struct<BgmAlias>[]
 * @desc ＢＧＭファイルを置換して演奏します。
 * 上の設定ほど優先されます。
 * 
 * @param <BGS>
 * @text ＜ＢＧＳ＞
 * 
 * @param BgsSettings
 * @parent <BGS>
 * @text ＢＧＳ設定
 * @type struct<BgsSetting>[]
 * @desc ＢＧＳファイル毎に音量などの設定を行います。
 * 
 * @param BgsAliases
 * @parent <BGS>
 * @text ＢＧＳ置換設定
 * @type struct<BgsAlias>[]
 * @desc ＢＧＳファイルを置換して演奏します。
 * 上の設定ほど優先されます。
 * 
 * @param <ME>
 * @text ＜ＭＥ＞
 * 
 * @param MeSettings
 * @parent <ME>
 * @text ＭＥ設定
 * @type struct<MeSetting>[]
 * @desc ＭＥファイル毎に音量などの設定を行います。
 * 
 * @param MeAliases
 * @parent <ME>
 * @text ＭＥ置換設定
 * @type struct<MeAlias>[]
 * @desc ＭＥファイルを置換して演奏します。
 * 上の設定ほど優先されます。
 * 
 * @param <SE>
 * @text ＜ＳＥ＞
 * 
 * @param SeSettings
 * @parent <SE>
 * @text ＳＥ設定
 * @type struct<SeSetting>[]
 * @desc ＳＥファイル毎に音量などの設定を行います。
 * 
 * @param SeAliases
 * @parent <SE>
 * @text ＳＥ置換設定
 * @type struct<SeAlias>[]
 * @desc ＳＥファイルを置換して演奏します。
 * 上の設定ほど優先されます。
 */

/*~struct~BgmSetting:ja
 * @param Name
 * @text ファイル名
 * @type file
 * @dir audio/bgm
 * @desc ＢＧＭのファイル名です。
 * 
 * @param Volume
 * @text 音量
 * @type number
 * @max 400
 * @default 100
 * @desc ＢＧＭの音量です。
 * 100を基準に設定してください。
 * 
 * @param Pitch
 * @text ピッチ
 * @type number
 * @desc ＢＧＭのピッチです。
 * 100を基準に設定してください。
 * 
 * @param Pan
 * @text 位相
 * @type number
 * @max 100 @min -100
 * @desc ＢＧＭの位相です。
 * 0を基準に設定してください。
 * 
 * @param Pos
 * @text 開始位置
 * @type number
 * @max 999 @decimals 2
 * @desc ＢＧＭの開始位置（秒）です。
 */

/*~struct~BgmAlias:ja
 * @param FromFileName
 * @text 置換元のファイル名
 * @type file
 * @dir audio/bgm
 * @desc 置換元のファイル名です。
 * 
 * @param ToFileName
 * @text 置換先のファイル名
 * @type file
 * @dir audio/bgm
 * @desc 置換先のファイル名です。
 * 
 * @param Switch
 * @text スイッチ
 * @type switch
 * @desc 置換設定を有効にするスイッチです。
 */

/*~struct~BgsSetting:ja
 * @param Name
 * @text ファイル名
 * @type file
 * @dir audio/bgs
 * @desc ＢＧＳのファイル名です。
 * 
 * @param Volume
 * @text 音量
 * @type number
 * @max 400
 * @default 100
 * @desc ＢＧＳの音量です。
 * 100を基準に設定してください。
 * 
 * @param Pitch
 * @text ピッチ
 * @type number
 * @desc ＢＧＳのピッチです。
 * 100を基準に設定してください。
 * 
 * @param Pan
 * @text 位相
 * @type number
 * @max 100 @min -100
 * @desc ＢＧＳの位相です。
 * 0を基準に設定してください。
 * 
 * @param Pos
 * @text 開始位置
 * @type number
 * @max 999 @decimals 2
 * @desc ＢＧＳの開始位置（秒）です。
 */

/*~struct~BgsAlias:ja
 * @param FromFileName
 * @text 置換元のファイル名
 * @type file
 * @dir audio/bgs
 * @desc 置換元のファイル名です。
 * 
 * @param ToFileName
 * @text 置換先のファイル名
 * @type file
 * @dir audio/bgs
 * @desc 置換先のファイル名です。
 * 
 * @param Switch
 * @text スイッチ
 * @type switch
 * @desc 置換設定を有効にするスイッチです。
 */

/*~struct~MeSetting:ja
 * @param Name
 * @text ファイル名
 * @type file
 * @dir audio/me
 * @desc ＭＥのファイル名です。
 * 
 * @param Volume
 * @text 音量
 * @type number
 * @max 400
 * @default 100
 * @desc ＭＥの音量です。
 * 100を基準に設定してください。
 * 
 * @param Pitch
 * @text ピッチ
 * @type number
 * @desc ＭＥのピッチです。
 * 100を基準に設定してください。
 * 
 * @param Pan
 * @text 位相
 * @type number
 * @max 100 @min -100
 * @desc ＭＥの位相です。
 * 0を基準に設定してください。
 */

/*~struct~MeAlias:ja
 * @param FromFileName
 * @text 置換元のファイル名
 * @type file
 * @dir audio/me
 * @desc 置換元のファイル名です。
 * 
 * @param ToFileName
 * @text 置換先のファイル名
 * @type file
 * @dir audio/me
 * @desc 置換先のファイル名です。
 * 
 * @param Switch
 * @text スイッチ
 * @type switch
 * @desc 置換設定を有効にするスイッチです。
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
 * @max 400
 * @default 100
 * @desc ＳＥの音量です。
 * 100を基準に設定してください。
 * 
 * @param Pitch
 * @text ピッチ
 * @type number
 * @desc ＳＥのピッチです。
 * 100を基準に設定してください。
 * 
 * @param Pan
 * @text 位相
 * @type number
 * @max 100 @min -100
 * @desc ＳＥの位相です。
 * 0を基準に設定してください。
 */

/*~struct~SeAlias:ja
 * @param FromFileName
 * @text 置換元のファイル名
 * @type file
 * @dir audio/se
 * @desc 置換元のファイル名です。
 * 
 * @param ToFileName
 * @text 置換先のファイル名
 * @type file
 * @dir audio/se
 * @desc 置換先のファイル名です。
 * 
 * @param Switch
 * @text スイッチ
 * @type switch
 * @desc 置換設定を有効にするスイッチです。
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

const PLUGIN_NAME = "NRP_AudioManager";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pBgmSettings = parseStruct2(parameters["BgmSettings"]);
const pBgmAliases = parseStruct2(parameters["BgmAliases"]);
const pBgsSettings = parseStruct2(parameters["BgsSettings"]);
const pBgsAliases = parseStruct2(parameters["BgsAliases"]);
const pMeSettings = parseStruct2(parameters["MeSettings"]);
const pMeAliases = parseStruct2(parameters["MeAliases"]);
const pSeSettings = parseStruct2(parameters["SeSettings"]);
const pSeAliases = parseStruct2(parameters["SeAliases"]);

//----------------------------------------
// ＢＧＭ
//----------------------------------------

/**
 * ●ＢＧＭ演奏
 */
const _AudioManager_playBgm = AudioManager.playBgm;
AudioManager.playBgm = function(bgm, pos) {
    // nullの場合はそのまま
    if (!bgm) {
        _AudioManager_playBgm.apply(this, arguments);
        return;
    }

    // ディープコピーする。
    const newBgm = {...bgm};
    // 別名があれば変換
    const aliasName = getAlias(newBgm, pBgmAliases);
    if (aliasName) {
        newBgm.name = aliasName;
    }

    // 開始位置を調整
    if (!pos) {
        pos = getAudioPos(newBgm, pBgmSettings);
    }

    _AudioManager_playBgm.call(this, newBgm, pos);
};

/**
 * ●ＢＧＭのパラメータ更新
 */
const _AudioManager_updateBgmParameters = AudioManager.updateBgmParameters;
AudioManager.updateBgmParameters = function(bgm) {
    // nullの場合はそのまま
    if (!bgm) {
        _AudioManager_updateBgmParameters.apply(this, arguments);
        return;
    }

    // ディープコピーする。
    const newBgm = {...bgm};
    // 設定を取得してnewBgmに保持
    setAudioAdjust(newBgm, pBgmSettings);

    _AudioManager_updateBgmParameters.call(this, newBgm);
};

//----------------------------------------
// ＢＧＳ
//----------------------------------------

/**
 * ●ＢＧＳ演奏
 */
const _AudioManager_playBgs = AudioManager.playBgs;
AudioManager.playBgs = function(bgs, pos) {
    // nullの場合はそのまま
    if (!bgs) {
        _AudioManager_playBgs.apply(this, arguments);
        return;
    }

    // ディープコピーする。
    const newBgs = {...bgs};
    // 別名があれば変換
    const aliasName = getAlias(newBgs, pBgsAliases);
    if (aliasName) {
        newBgs.name = aliasName;
    }

    // 開始位置を調整
    if (!pos) {
        pos = getAudioPos(newBgs, pBgsSettings);
    }

    _AudioManager_playBgs.call(this, newBgs, pos);
};

/**
 * ●ＢＧＳのパラメータ更新
 */
const _AudioManager_updateBgsParameters = AudioManager.updateBgsParameters;
AudioManager.updateBgsParameters = function(bgs) {
    // nullの場合はそのまま
    if (!bgs) {
        _AudioManager_updateBgsParameters.apply(this, arguments);
        return;
    }

    // ディープコピーする。
    const newBgs = {...bgs};
    // 設定を取得してnewBgsに保持
    setAudioAdjust(newBgs, pBgsSettings);

    _AudioManager_updateBgsParameters.call(this, newBgs);
};

//----------------------------------------
// ＭＥ
//----------------------------------------

/**
 * ●ＭＥ演奏
 */
const _AudioManager_playMe = AudioManager.playMe;
AudioManager.playMe = function(me) {
    // nullの場合はそのまま
    if (!me) {
        _AudioManager_playMe.apply(this, arguments);
        return;
    }

    // ディープコピーする。
    const newMe = {...me};
    // 別名があれば変換
    const aliasName = getAlias(newMe, pMeAliases);
    if (aliasName) {
        newMe.name = aliasName;
    }

    _AudioManager_playMe.call(this, newMe);
};

/**
 * ●ＭＥのパラメータ更新
 */
const _AudioManager_updateMeParameters = AudioManager.updateMeParameters;
AudioManager.updateMeParameters = function(me) {
    // nullの場合はそのまま
    if (!me) {
        _AudioManager_updateMeParameters.apply(this, arguments);
        return;
    }

    // ディープコピーする。
    const newMe = {...me};
    // 設定を取得してnewMeに保持
    setAudioAdjust(newMe, pMeSettings);

    _AudioManager_updateMeParameters.call(this, newMe);
};

//----------------------------------------
// ＳＥ
//----------------------------------------

/**
 * ●ＳＥ演奏
 */
const _AudioManager_playSe = AudioManager.playSe;
AudioManager.playSe = function(se) {
    // nullの場合はそのまま
    if (!se) {
        _AudioManager_playSe.apply(this, arguments);
        return;
    }

    // ディープコピーする。
    const newSe = {...se};
    // 別名があれば変換
    const aliasName = getAlias(newSe, pSeAliases);
    if (aliasName) {
        newSe.name = aliasName;
    }

    _AudioManager_playSe.call(this, newSe);
};

/**
 * ●ＳＥのパラメータ更新
 */
const _AudioManager_updateSeParameters = AudioManager.updateSeParameters;
AudioManager.updateSeParameters = function(buffer, se) {
    // nullの場合はそのまま
    if (!se) {
        _AudioManager_updateSeParameters.apply(this, arguments);
        return;
    }

    // ディープコピーする。
    const newSe = {...se};
    // 設定を取得してnewSeに保持
    setAudioAdjust(newSe, pSeSettings);

    _AudioManager_updateSeParameters.call(this, buffer, newSe);
};

//----------------------------------------
// 共通処理
//----------------------------------------

/**
 * ●別名を取得する。
 */
function getAlias(audio, aliases) {
    // 別名が存在した場合はそちらを返す。
    const alias = aliases.find(alias => isValidAlias(audio, alias));
    if (alias) {
        return alias.ToFileName;
    }
    return undefined;
}

/**
 * ●有効な別名かどうか？
 */
function isValidAlias(audio, alias) {
    // ファイル名が一致している。
    if (alias.FromFileName == audio.name) {
        const aliasSwitch = toNumber(alias.Switch);
        // スイッチの設定がなければ有効
        if (!aliasSwitch) {
            return true;
        }
        // スイッチがオンならば有効
        return $gameSwitches.value(aliasSwitch);
    }
    // それ以外は無効
    return false;
}

/**
 * ●音声に調整設定を保持。
 */
function setAudioAdjust(audio, settings) {
    // 一致するファイルが存在すれば取得
    const setting = settings.find(setting => setting.Name == audio.name);
    // 設定がなければ処理しない。
    if (!setting) {
        return;
    }

    const adjustVolume = toNumber(setting.Volume);
    const adjustPitch = toNumber(setting.Pitch);
    const adjustPan = toNumber(setting.Pan);

    if (adjustVolume != undefined) {
        audio.volume = audio.volume * adjustVolume / 100;
    }
    if (adjustPitch != undefined) {
        audio.pitch = audio.pitch * adjustPitch / 100;
    }
    if (adjustPan != undefined) {
        audio.pan = audio.pan + adjustPan;
    }
}

/**
 * ●音声の開始位置を取得。
 */
function getAudioPos(audio, settings) {
    // 一致するファイルが存在すれば取得
    const setting = settings.find(setting => setting.Name == audio.name);
    // 設定がなければ処理しない。
    if (!setting) {
        return;
    }

    const adjustPos = toNumber(setting.Pos);

    if (adjustPos != undefined) {
        return adjustPos;
    }
    return undefined;
}

})();
