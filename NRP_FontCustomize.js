//=============================================================================
// NRP_FontCustomize.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.00 Customize font settings.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/521407517.html
 *
 * @help Customize font settings for individual windows.
 * You can apply settings that differ from those in System 2 to each window.
 *
 * You may also use this plugin only to change font sizes, without changing
 * the font itself.
 *
 * Due to RPG Maker MZ specifications, some elements, including HP, MP, TP,
 * and actor names, are implemented as separate sprites. Configure their
 * fonts with the <Sprite Settings> parameters.
 *
 * -------------------------------------------------------------------
 * [Installing Fonts]
 * -------------------------------------------------------------------
 * Prepare the fonts you intend to use in advance. Many free fonts are
 * available.
 *
 * Place font files in the fonts folder in your project's root directory to
 * make them available.
 *
 * Major file formats, including .woff and .ttf, are generally supported.
 *
 * Set the font used throughout the game in System 2.
 *
 * -------------------------------------------------------------------
 * [Window Settings]
 * -------------------------------------------------------------------
 * In the Window List parameter, specify a font file name and font size for
 * each target window.
 *
 * The following windows are registered by default:
 *
 * - Window_Message: Regular messages
 * - Window_NameBox: Message name box
 * - Window_ScrollText: Scrolling text
 * - Window_StatusBase: General status displays
 * - Window_Command: Commands (menu, battle, choices, etc.)
 * - Window_ItemList: Item lists
 * - Window_SkillList: Skill lists
 * - Window_Help: Item and skill descriptions
 * - Window_BattleLog: Battle messages
 *
 * Include the file extension in font file names.
 * The default font size is 26; use it as a guideline.
 *
 * -------------------------------------------------------------------
 * [Registering Windows]
 * -------------------------------------------------------------------
 * Registering a window name in the Window List also lets you configure
 * windows added by external plugins.
 *
 * To find a window name, search the relevant plugin for "Window_" and find
 * the likely class name.
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
 * @param WindowList
 * @text Window List
 * @type struct<FontSetting>[]
 * @default ["{\"Window\":\"Window_Message\",\"FontName\":\"\",\"FontSize\":\"\"}","{\"Window\":\"Window_NameBox\",\"FontName\":\"\",\"FontSize\":\"\"}","{\"Window\":\"Window_ScrollText\",\"FontName\":\"\",\"FontSize\":\"\"}","{\"Window\":\"Window_StatusBase\",\"FontName\":\"\",\"FontSize\":\"\"}","{\"Window\":\"Window_Command\",\"FontName\":\"\",\"FontSize\":\"\"}","{\"Window\":\"Window_ItemList\",\"FontName\":\"\",\"FontSize\":\"\"}","{\"Window\":\"Window_SkillList\",\"FontName\":\"\",\"FontSize\":\"\"}","{\"Window\":\"Window_Help\",\"FontName\":\"\",\"FontSize\":\"\"}","{\"Window\":\"Window_BattleLog\",\"FontName\":\"\",\"FontSize\":\"\"}"]
 * @desc Add target windows and their settings.
 *
 * @param <SpriteSettings>
 * @text <Sprite Settings>
 *
 * @param DamageSprite
 * @text Damage Display
 * @parent <SpriteSettings>
 * @type struct<SpriteFontSetting>
 * @desc Font settings for Sprite_Damage.
 *
 * @param GaugeLabel
 * @text Gauge Label
 * @parent <SpriteSettings>
 * @type struct<SpriteFontSetting>
 * @desc Font settings for the label part of Sprite_Gauge.
 *
 * @param GaugeValue
 * @text Gauge Value
 * @parent <SpriteSettings>
 * @type struct<SpriteFontSetting>
 * @desc Font settings for the value part of Sprite_Gauge.
 *
 * @param NameSprite
 * @text Actor Name
 * @parent <SpriteSettings>
 * @type struct<SpriteFontSetting>
 * @desc Font settings for Sprite_Name.
 *
 * @param TimerSprite
 * @text Timer Display
 * @parent <SpriteSettings>
 * @type struct<SpriteFontSetting>
 * @desc Font settings for Sprite_Timer.
 *
 * @param <FallbackSettings>
 * @text <Fallback Settings>
 *
 * @param UseMplusFallback
 * @text Add Default Font
 * @parent <FallbackSettings>
 * @type boolean
 * @default false
 * @desc Use MZ's mplus-1m-regular.woff as the first fallback when the specified font lacks a character.
 */

//-----------------------------------------------------------------------------
// FontSetting
//-----------------------------------------------------------------------------
/*~struct~FontSetting:
 * @param Window
 * @text Window Name
 * @type string
 * @desc The name of the target window. Example: Window_Message
 *
 * @param FontName
 * @text Font File
 * @type string
 * @desc Font file name. Leave blank to use the default setting.
 *
 * @param FontSize
 * @text Font Size
 * @type number
 * @min 1
 * @desc Font size. Leave blank to use the default setting.
 */

//-----------------------------------------------------------------------------
// SpriteFontSetting
//-----------------------------------------------------------------------------
/*~struct~SpriteFontSetting:
 * @param FontName
 * @text Font File
 * @type string
 * @desc Font file name. Leave blank to use the default setting.
 *
 * @param FontSize
 * @text Font Size
 * @type number
 * @min 1
 * @desc Font size. Leave blank to use the default setting.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.00 フォント設定を変更します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/521407517.html
 *
 * @help 各画面のフォント設定を細かく変更します。
 * ウィンドウ毎にシステム2の設定値と異なる設定を適用できます。
 * 
 * フォントを変更せずに、
 * 単なる文字サイズの変更目的で使用しても構いません。
 * 
 * なお、ツクールＭＺの仕様により、ＨＰ、ＭＰ、ＴＰや
 * アクター名など一部の項目はスプライトとして別枠で定義されています。
 * こちらについては、＜スプライト関連＞のパラメータで設定してください。
 * 
 * -------------------------------------------------------------------
 * ■フォントの導入
 * -------------------------------------------------------------------
 * 使用するフォントは事前に用意する必要があります。
 * 無料で使えるものも、たくさんあるので探してみてください。
 * フォントファイルをプロジェクト直下のfontsフォルダに
 * 配置すれば使用できるようになります。
 * 
 * ちなみにフォントファイルの種類は.woffでも.ttfでも、
 * メジャーな拡張子なら大体対応しているようです。
 * 
 * 全体で使用するフォントについては、
 * システム2で設定できるのでそちらで設定してください。
 * 
 * -------------------------------------------------------------------
 * ■ウィンドウの設定
 * -------------------------------------------------------------------
 * プラグインパラメータの『ウィンドウリスト』のウィンドウに
 * フォントファイル名とフォントサイズを指定してください。
 * 
 * 初期設定では以下のウィンドウを登録しています。
 * 次の説明を目安にしてください。
 * 
 * ・Window_Message：通常メッセージ
 * ・Window_NameBox：メッセージの名前欄
 * ・Window_ScrollText：スクロール文章
 * ・Window_StatusBase：ステータス表示全般
 * ・Window_Command：コマンド全般（メニュー、戦闘、選択肢など）
 * ・Window_ItemList：アイテム一覧
 * ・Window_SkillList：スキル一覧
 * ・Window_Help：アイテムやスキルの説明
 * ・Window_BattleLog：戦闘メッセージ
 * 
 * フォントファイル名は拡張子まで含めて設定してください。
 * フォントサイズについては標準が26なので、それを基準にしてください。
 * 
 * -------------------------------------------------------------------
 * ■ウィンドウの登録
 * -------------------------------------------------------------------
 * 『ウィンドウリスト』にウィンドウ名を登録すれば、
 * 外部プラグインで追加されたウィンドウへも対応できます。
 * 
 * ウィンドウ名を調べたい場合は対象プラグイン内を「Window_」で検索して、
 * それっぽい名称を見つけてください。
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
 * @param WindowList
 * @text ウィンドウリスト
 * @type struct<FontSetting>[]
 * @default ["{\"Window\":\"Window_Message\",\"FontName\":\"\",\"FontSize\":\"\"}","{\"Window\":\"Window_NameBox\",\"FontName\":\"\",\"FontSize\":\"\"}","{\"Window\":\"Window_ScrollText\",\"FontName\":\"\",\"FontSize\":\"\"}","{\"Window\":\"Window_StatusBase\",\"FontName\":\"\",\"FontSize\":\"\"}","{\"Window\":\"Window_Command\",\"FontName\":\"\",\"FontSize\":\"\"}","{\"Window\":\"Window_ItemList\",\"FontName\":\"\",\"FontSize\":\"\"}","{\"Window\":\"Window_SkillList\",\"FontName\":\"\",\"FontSize\":\"\"}","{\"Window\":\"Window_Help\",\"FontName\":\"\",\"FontSize\":\"\"}","{\"Window\":\"Window_BattleLog\",\"FontName\":\"\",\"FontSize\":\"\"}"]
 * @desc 対象となるウィンドウと設定を追加します。
 *
 * @param <SpriteSettings>
 * @text ＜スプライト関連＞
 *
 * @param DamageSprite
 * @text ダメージ表示
 * @parent <SpriteSettings>
 * @type struct<SpriteFontSetting>
 * @desc Sprite_Damageのフォント設定です。
 *
 * @param GaugeLabel
 * @text ゲージのラベル
 * @parent <SpriteSettings>
 * @type struct<SpriteFontSetting>
 * @desc Sprite_Gaugeのラベル部分のフォント設定です。
 *
 * @param GaugeValue
 * @text ゲージの値
 * @parent <SpriteSettings>
 * @type struct<SpriteFontSetting>
 * @desc Sprite_Gaugeの値部分のフォント設定です。
 *
 * @param NameSprite
 * @text アクター名
 * @parent <SpriteSettings>
 * @type struct<SpriteFontSetting>
 * @desc Sprite_Nameのフォント設定です。
 *
 * @param TimerSprite
 * @text タイマー表示
 * @parent <SpriteSettings>
 * @type struct<SpriteFontSetting>
 * @desc Sprite_Timerのフォント設定です。
 *
 * @param <FallbackSettings>
 * @text ＜フォールバック関連＞
 *
 * @param UseMplusFallback
 * @text 標準フォントを追加
 * @parent <FallbackSettings>
 * @type boolean
 * @default false
 * @desc 指定フォントに文字がない場合、ＭＺ標準のmplus-1m-regular.woffを最初の候補として使用します。
 */

//-----------------------------------------------------------------------------
// FontSetting
//-----------------------------------------------------------------------------
/*~struct~FontSetting:ja
 * @param Window
 * @text ウィンドウ名
 * @type string
 * @desc 対象とするウィンドウの名前です。
 * 例：Window_Message
 * 
 * @param FontName
 * @text フォントファイル
 * @type string
 * @desc フォントファイル名です。
 * 空欄なら初期設定を使用します。
 * 
 * @param FontSize
 * @text フォントサイズ
 * @type number
 * @min 1
 * @desc フォントサイズです。
 * 空欄なら初期設定を使用します。
 */

//-----------------------------------------------------------------------------
// SpriteFontSetting
//-----------------------------------------------------------------------------
/*~struct~SpriteFontSetting:ja
 * @param FontName
 * @text フォントファイル
 * @type string
 * @desc フォントファイル名です。
 * 空欄なら初期設定を使用します。
 *
 * @param FontSize
 * @text フォントサイズ
 * @type number
 * @min 1
 * @desc フォントサイズです。
 * 空欄なら初期設定を使用します。
 */

(function() {
"use strict";

/**
 * ●構造体をJSで扱えるように変換
 */
function parseStruct1(arg) {
    return arg ? JSON.parse(arg) : undefined;
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

const PLUGIN_NAME = "NRP_FontCustomize";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pWindowList = parseStruct2(parameters["WindowList"]);
const pDamageSprite = parseStruct1(parameters["DamageSprite"]);
const pGaugeLabel = parseStruct1(parameters["GaugeLabel"]);
const pGaugeValue = parseStruct1(parameters["GaugeValue"]);
const pNameSprite = parseStruct1(parameters["NameSprite"]);
const pTimerSprite = parseStruct1(parameters["TimerSprite"]);
const pUseMplusFallback = toBoolean(parameters["UseMplusFallback"], false);

const MPLUS_FONT_FILE = "mplus-1m-regular.woff";
const MPLUS_FONT_FAMILY = "nrp-mplusfont";
let mMplusFontFamily;

const fontSettingCandidates = [
    ...pWindowList.map((parameter, index) =>
        createFontSetting(
            parameter.Window,
            parameter,
            "nrp-windowfont" + (index + 1)
        )
    )
];
const FONT_SETTING_MAP = createFontSettingMap(fontSettingCandidates);
const SPRITE_FONT_SETTING_LIST = [
    createFontSetting("Sprite_Damage", pDamageSprite, "nrp-damagefont"),
    createFontSetting("Sprite_GaugeLabel", pGaugeLabel, "nrp-gaugelabelfont"),
    createFontSetting("Sprite_GaugeValue", pGaugeValue, "nrp-gaugevaluefont"),
    createFontSetting("Sprite_Name", pNameSprite, "nrp-namefont"),
    createFontSetting("Sprite_Timer", pTimerSprite, "nrp-timerfont")
];
const FONT_SETTING_LIST = [
    ...FONT_SETTING_MAP.values(),
    ...SPRITE_FONT_SETTING_LIST.filter(fontSetting => fontSetting.enabled)
];
shareFontFamilies(FONT_SETTING_LIST);

// ----------------------------------------------------------------------------
// Scene_Boot
// ----------------------------------------------------------------------------

/**
 * ●指定フォントの読込
 * FontManagerへ登録することで、起動処理は読込完了まで自動的に待機する。
 */
const _Scene_Boot_loadGameFonts = Scene_Boot.prototype.loadGameFonts;
Scene_Boot.prototype.loadGameFonts = function() {
    _Scene_Boot_loadGameFonts.apply(this, arguments);
    const loadedFontFamilies = new Set();
    for (const fontSetting of FONT_SETTING_LIST) {
        // フォントをロードする。
        // ※既にロード指定済みの場合は除外
        if (
            fontSetting.fontFile &&
            !loadedFontFamilies.has(fontSetting.fontFamily)
        ) {
            FontManager.load(fontSetting.fontFamily, fontSetting.fontFile);
            loadedFontFamilies.add(fontSetting.fontFamily);
        }
    }
    setupMplusFallbackFont(loadedFontFamilies);
};

// ----------------------------------------------------------------------------
// Window_Base
// ----------------------------------------------------------------------------

/**
 * ●対象ウィンドウへのフォント設定適用
 */
const _Window_Base_resetFontSettings = Window_Base.prototype.resetFontSettings;
Window_Base.prototype.resetFontSettings = function() {
    _Window_Base_resetFontSettings.apply(this, arguments);

    const fontSetting = FONT_SETTING_MAP.get(this.constructor.name);
    if (!fontSetting) {
        return;
    }

    if (fontSetting.fontFile) {
        this.contents.fontFace = makeFontFace(
            fontSetting.fontFamily,
            this.contents.fontFace
        );
    }
    if (fontSetting.fontSize != null) {
        this.contents.fontSize = fontSetting.fontSize;
    }
};

// ----------------------------------------------------------------------------
// Sprite
// ----------------------------------------------------------------------------

applySpriteFontSetting(
    Sprite_Damage,
    "fontFace",
    "fontSize",
    SPRITE_FONT_SETTING_LIST[0]
);
applySpriteFontSetting(
    Sprite_Gauge,
    "labelFontFace",
    "labelFontSize",
    SPRITE_FONT_SETTING_LIST[1]
);
applySpriteFontSetting(
    Sprite_Gauge,
    "valueFontFace",
    "valueFontSize",
    SPRITE_FONT_SETTING_LIST[2]
);
applySpriteFontSetting(
    Sprite_Name,
    "fontFace",
    "fontSize",
    SPRITE_FONT_SETTING_LIST[3]
);
applySpriteFontSetting(
    Sprite_Timer,
    "fontFace",
    "fontSize",
    SPRITE_FONT_SETTING_LIST[4]
);

// ----------------------------------------------------------------------------
// 共通関数
// ----------------------------------------------------------------------------

/**
 * ●フォント設定情報の生成
 */
function createFontSetting(windowName, parameter, fontFamily) {
    return {
        windowName: windowName,
        enabled: !!parameter,
        fontFile: parameter ? setDefault(parameter.FontName) : undefined,
        fontSize: parameter ? toNumber(parameter.FontSize) : undefined,
        fontFamily: fontFamily
    };
}

/**
 * ●ウィンドウ名をキーとするフォント設定の生成
 * 同じウィンドウ名が複数ある場合は、後に登録された設定を優先する。
 */
function createFontSettingMap(fontSettingList) {
    const fontSettingMap = new Map();

    for (const fontSetting of fontSettingList) {
        if (fontSetting.enabled && fontSetting.windowName) {
            fontSettingMap.set(fontSetting.windowName, fontSetting);
        }
    }
    return fontSettingMap;
}

/**
 * ●同一ファイルを使用する設定間でフォントファミリー名を共有
 */
function shareFontFamilies(fontSettingList) {
    const familyByFile = new Map();

    for (const fontSetting of fontSettingList) {
        if (!fontSetting.fontFile) {
            continue;
        }

        const sharedFamily = familyByFile.get(fontSetting.fontFile);
        if (sharedFamily) {
            fontSetting.fontFamily = sharedFamily;
        } else {
            familyByFile.set(fontSetting.fontFile, fontSetting.fontFamily);
        }
    }
}

/**
 * ●ＭＺ標準フォントをフォールバック用に準備
 */
function setupMplusFallbackFont(loadedFontFamilies) {
    if (!pUseMplusFallback) {
        return;
    }

    // 本プラグイン内で同じファイルを指定済みなら、その登録を共有する。
    const loadedSetting = FONT_SETTING_LIST.find(
        fontSetting => fontSetting.fontFile === MPLUS_FONT_FILE
    );
    if (loadedSetting) {
        mMplusFontFamily = loadedSetting.fontFamily;
        return;
    }

    // ゲームのメインフォントとしてロード済みなら、標準の登録を共有する。
    if ($dataSystem.advanced.mainFontFilename === MPLUS_FONT_FILE) {
        mMplusFontFamily = "rmmz-mainfont";
        return;
    }

    mMplusFontFamily = MPLUS_FONT_FAMILY;
    if (!loadedFontFamilies.has(mMplusFontFamily)) {
        FontManager.load(mMplusFontFamily, MPLUS_FONT_FILE);
        loadedFontFamilies.add(mMplusFontFamily);
    }
}

/**
 * ●指定フォントと既存のフォールバックを結合
 */
function makeFontFace(fontFamily, fallbackFontFace) {
    const fontFaces = [];
    appendFontFace(fontFaces, fontFamily);
    if (pUseMplusFallback) {
        appendFontFace(fontFaces, mMplusFontFamily);
    }

    for (const fallback of String(fallbackFontFace || "").split(",")) {
        appendFontFace(fontFaces, fallback.trim());
    }
    return fontFaces.join(", ");
}

/**
 * ●フォントファミリーを重複なしで追加
 */
function appendFontFace(fontFaces, fontFace) {
    if (fontFace && !fontFaces.includes(fontFace)) {
        fontFaces.push(fontFace);
    }
}

/**
 * ●スプライトへのフォント設定適用
 */
function applySpriteFontSetting(
    spriteClass,
    fontFaceMethodName,
    fontSizeMethodName,
    fontSetting
) {
    if (!fontSetting.enabled) {
        return;
    }

    const prototype = spriteClass.prototype;
    if (fontSetting.fontFile) {
        const originalFontFace = prototype[fontFaceMethodName];
        prototype[fontFaceMethodName] = function() {
            const fallbackFontFace = originalFontFace.apply(this, arguments);
            return makeFontFace(fontSetting.fontFamily, fallbackFontFace);
        };
    }
    if (fontSetting.fontSize != null) {
        prototype[fontSizeMethodName] = function() {
            return fontSetting.fontSize;
        };
    }
}

})();
