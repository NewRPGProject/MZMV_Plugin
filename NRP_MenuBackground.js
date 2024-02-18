//=============================================================================
// NRP_MenuBackground.js
//=============================================================================
/*:
 * @target MZ MV
 * @plugindesc v1.00 Change the background of the menu screen.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/502378599.html
 *
 * @help Change the background of the menu screen.
 * You can also set the background to scroll
 * or change the background with a switch.
 * 
 * Note that this actually covers not only the menu,
 * but also the options, save/load, game end, shop, 
 * and name input scenes.
 * (Strictly speaking, a scene that inherits Scene_MenuBase)
 * 
 * The background can be changed for each scene.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Setting "BackgroundImage" in the <Common Setting> plugin parameter
 * will cause the background to appear in all target scenes.
 * 
 * If you want to change the settings for each scene,
 * select "BackgroundList" for detailed settings.
 * 
 * The main scenes are pre-set by default,
 * so you can change the settings as you like.
 * 
 * Scene_Menu (Top Menu)
 * Scene_Item
 * Scene_Equip
 * Scene_Skill
 * Scene_Status
 * Scene_Options
 * Scene_Save
 * Scene_Load
 * Scene_GameEnd
 * Scene_Shop
 * Scene_Name (Name Input)
 * 
 * Scenes added by external plugins not listed
 * above (inheriting Scene_MenuBase) should also be changed
 * by manually entering the corresponding scene name.
 * You can find it by searching in the plugin with the string "Scene_".
 * 
 * -------------------------------------------------------------------
 * [Change Background]
 * -------------------------------------------------------------------
 * This plugin allows you to change the background of each scene
 * by using switches as conditions.
 * 
 * If you set the scene to "ALL" and set the switch to a condition,
 * you can make the background change depending on the condition.
 * For example, you can make the background change
 * according to the progress of the story,
 * your current location, or the time of day.
 * 
 * @-----------------------------------------------------
 * @ [Plugin Parameters]
 * @-----------------------------------------------------
 * 
 * @param BackgroundList
 * @type struct<Background>[]
 * @default ["{\"Scene\":\"Scene_Menu\",\"Note\":\"Menu (Top)\",\"Disabled\":\"false\",\"BackgroundImage\":\"\",\"ScrollX\":\"\",\"ScrollY\":\"\",\"Switch\":\"\"}","{\"Scene\":\"Scene_Item\",\"Note\":\"Item\",\"Disabled\":\"false\",\"BackgroundImage\":\"\",\"ScrollX\":\"\",\"ScrollY\":\"\",\"Switch\":\"\"}","{\"Scene\":\"Scene_Equip\",\"Note\":\"Equip\",\"Disabled\":\"false\",\"BackgroundImage\":\"\",\"ScrollX\":\"\",\"ScrollY\":\"\",\"Switch\":\"\"}","{\"Scene\":\"Scene_Skill\",\"Note\":\"Skill\",\"Disabled\":\"false\",\"BackgroundImage\":\"\",\"ScrollX\":\"\",\"ScrollY\":\"\",\"Switch\":\"\"}","{\"Scene\":\"Scene_Status\",\"Note\":\"Status\",\"Disabled\":\"false\",\"BackgroundImage\":\"\",\"ScrollX\":\"\",\"ScrollY\":\"\",\"Switch\":\"\"}","{\"Scene\":\"Scene_Options\",\"Note\":\"Options\",\"Disabled\":\"false\",\"BackgroundImage\":\"\",\"ScrollX\":\"\",\"ScrollY\":\"\",\"Switch\":\"\"}","{\"Scene\":\"Scene_Save\",\"Note\":\"Save\",\"Disabled\":\"false\",\"BackgroundImage\":\"\",\"ScrollX\":\"\",\"ScrollY\":\"\",\"Switch\":\"\"}","{\"Scene\":\"Scene_Load\",\"Note\":\"Load\",\"Disabled\":\"false\",\"BackgroundImage\":\"\",\"ScrollX\":\"\",\"ScrollY\":\"\",\"Switch\":\"\"}","{\"Scene\":\"Scene_GameEnd\",\"Note\":\"Game End\",\"Disabled\":\"false\",\"BackgroundImage\":\"\",\"ScrollX\":\"\",\"ScrollY\":\"\",\"Switch\":\"\"}","{\"Scene\":\"Scene_Shop\",\"Note\":\"Shop\",\"Disabled\":\"false\",\"BackgroundImage\":\"\",\"ScrollX\":\"\",\"ScrollY\":\"\",\"Switch\":\"\"}","{\"Scene\":\"Scene_Name\",\"Note\":\"Name Input\",\"Disabled\":\"false\",\"BackgroundImage\":\"\",\"ScrollX\":\"\",\"ScrollY\":\"\",\"Switch\":\"\"}"]
 * @desc A list that manages backgrounds for each scene.
 * The higher the data, the higher the priority.
 * 
 * @param <Common Setting>
 * 
 * @param BackgroundImage
 * @parent <Common Setting>
 * @type file
 * @dir img/parallaxes/
 * @desc The background to be applied to the menu. The default value if BackgroundList is not specified.
 * 
 * @param ScrollX
 * @parent <Common Setting>
 * @type number @min -999 @max 999 @decimals 2
 * @default 0
 * @desc Horizontal scrolling speed.
 * 
 * @param ScrollY
 * @parent <Common Setting>
 * @type number @min -999 @max 999 @decimals 2
 * @default 0
 * @desc Vertical scrolling speed.
 */
//-----------------------------------------------------------------------------
// Background
//-----------------------------------------------------------------------------
/*~struct~Background:
 * @param Scene
 * @type combo
 * @option
 * @option ALL
 * @option Scene_Menu
 * @option Scene_Item
 * @option Scene_Equip
 * @option Scene_Skill
 * @option Scene_Status
 * @option Scene_Options
 * @option Scene_Save
 * @option Scene_Load
 * @option Scene_GameEnd
 * @option Scene_Shop
 * @option Scene_Name
 * @desc The scene to be covered.
 * ALL is the overall setting.
 * 
 * @param Note
 * @type string
 * @desc Explanatory Notes.
 * 
 * @param Disabled
 * @type boolean
 * @default false
 * @desc Disables the background without applying it.
 * The common background is also disabled.
 * 
 * @param BackgroundImage
 * @type file
 * @dir img/parallaxes/
 * @desc Background image to be applied to the scene.
 * If left blank, a common value will be used.
 * 
 * @param ScrollX
 * @type number @min -999 @max 999 @decimals 2
 * @desc Horizontal scrolling speed.
 * 
 * @param ScrollY
 * @type number @min -999 @max 999 @decimals 2
 * @desc Vertical scrolling speed.
 * 
 * @param Switch
 * @type switch
 * @desc A switch to enable the background.
 */

/*:ja
 * @target MZ MV
 * @plugindesc v1.00 メニュー画面の背景を変更する。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/502378599.html
 *
 * @help メニュー画面の背景を変更します。
 * 背景をスクロールさせたり、スイッチで背景を切り替える設定も可能です。
 * 
 * 実際にはメニューだけでなく、
 * オプション、セーブ／ロード、ゲーム終了、店、名前入力
 * の各シーンも対象となることにご注意ください。
 * （厳密には、Scene_MenuBaseを継承したシーン）
 * 
 * 各シーン毎に背景を変更することも可能です。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * プラグインパラメータの共通設定に背景画像を設定すると、
 * 対象の全シーンに背景が表示されるようになります。
 * 
 * 各シーン毎に設定を変更したい場合は『背景リスト』を選択して、
 * 詳細設定をしてください。
 * 
 * 初期状態で主なシーンはあらかじめ設定しているので、
 * お好みで設定を変更してください。
 * 
 * Scene_Menu : メニュー画面（トップ）
 * Scene_Item : アイテム画面
 * Scene_Equip : 装備画面
 * Scene_Skill : スキル画面
 * Scene_Status : ステータス画面
 * Scene_Options : オプション画面
 * Scene_Save : セーブ画面
 * Scene_Load : ロード画面
 * Scene_GameEnd : ゲーム終了画面
 * Scene_Shop : ショップ画面
 * Scene_Name : 名前入力画面
 * 
 * 上記にはない外部プラグインで追加したシーン（Scene_MenuBaseを継承）も、
 * 対応するシーン名を手入力すれば変更されるはずです。
 * 「Scene_」の文字列でプラグイン内を検索してみるとよさげです。
 * 
 * -------------------------------------------------------------------
 * ■背景の変更
 * -------------------------------------------------------------------
 * 当プラグインではスイッチを条件にして、各シーンの背景を変更できます。
 * 
 * シーンを『ALL』に設定し、スイッチを条件に設定すれば、
 * 条件次第で背景が変化するようにできます。
 * 例えば、物語の進行や現在地、時間帯に応じて
 * 背景を変化させることができます。
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
 * @param BackgroundList
 * @text 背景リスト
 * @type struct<Background>[]
 * @default ["{\"Scene\":\"Scene_Menu\",\"Note\":\"メニュー（トップ）\",\"Disabled\":\"false\",\"BackgroundImage\":\"\",\"ScrollX\":\"\",\"ScrollY\":\"\",\"Switch\":\"\"}","{\"Scene\":\"Scene_Item\",\"Note\":\"アイテム\",\"Disabled\":\"false\",\"BackgroundImage\":\"\",\"ScrollX\":\"\",\"ScrollY\":\"\",\"Switch\":\"\"}","{\"Scene\":\"Scene_Equip\",\"Note\":\"装備\",\"Disabled\":\"false\",\"BackgroundImage\":\"\",\"ScrollX\":\"\",\"ScrollY\":\"\",\"Switch\":\"\"}","{\"Scene\":\"Scene_Skill\",\"Note\":\"スキル\",\"Disabled\":\"false\",\"BackgroundImage\":\"\",\"ScrollX\":\"\",\"ScrollY\":\"\",\"Switch\":\"\"}","{\"Scene\":\"Scene_Status\",\"Note\":\"ステータス\",\"Disabled\":\"false\",\"BackgroundImage\":\"\",\"ScrollX\":\"\",\"ScrollY\":\"\",\"Switch\":\"\"}","{\"Scene\":\"Scene_Options\",\"Note\":\"オプション\",\"Disabled\":\"false\",\"BackgroundImage\":\"\",\"ScrollX\":\"\",\"ScrollY\":\"\",\"Switch\":\"\"}","{\"Scene\":\"Scene_Save\",\"Note\":\"セーブ\",\"Disabled\":\"false\",\"BackgroundImage\":\"\",\"ScrollX\":\"\",\"ScrollY\":\"\",\"Switch\":\"\"}","{\"Scene\":\"Scene_Load\",\"Note\":\"ロード\",\"Disabled\":\"false\",\"BackgroundImage\":\"\",\"ScrollX\":\"\",\"ScrollY\":\"\",\"Switch\":\"\"}","{\"Scene\":\"Scene_GameEnd\",\"Note\":\"ゲーム終了\",\"Disabled\":\"false\",\"BackgroundImage\":\"\",\"ScrollX\":\"\",\"ScrollY\":\"\",\"Switch\":\"\"}","{\"Scene\":\"Scene_Shop\",\"Note\":\"ショップ\",\"Disabled\":\"false\",\"BackgroundImage\":\"\",\"ScrollX\":\"\",\"ScrollY\":\"\",\"Switch\":\"\"}","{\"Scene\":\"Scene_Name\",\"Note\":\"名前入力\",\"Disabled\":\"false\",\"BackgroundImage\":\"\",\"ScrollX\":\"\",\"ScrollY\":\"\",\"Switch\":\"\"}"]
 * @desc シーン毎の背景画像を管理するリストです。
 * 複数の条件が満たされた場合は上が優先されます。
 * 
 * @param <Common Setting>
 * @text ＜共通設定＞
 * 
 * @param BackgroundImage
 * @parent <Common Setting>
 * @text 背景画像
 * @type file
 * @dir img/parallaxes/
 * @desc メニューに適用する背景画像です。
 * 背景リストの指定がなかった場合の既定値となります。
 * 
 * @param ScrollX
 * @parent <Common Setting>
 * @text Ｘ方向のスクロール
 * @type number @min -999 @max 999 @decimals 2
 * @default 0
 * @desc 背景の横方向へのスクロール速度です。
 * 
 * @param ScrollY
 * @parent <Common Setting>
 * @text Ｙ方向のスクロール
 * @type number @min -999 @max 999 @decimals 2
 * @default 0
 * @desc 背景の縦方向へのスクロール速度です。
 */
//-----------------------------------------------------------------------------
// Background
//-----------------------------------------------------------------------------
/*~struct~Background:ja
 * @param Scene
 * @text シーン
 * @type combo
 * @option
 * @option ALL
 * @option Scene_Menu
 * @option Scene_Item
 * @option Scene_Equip
 * @option Scene_Skill
 * @option Scene_Status
 * @option Scene_Options
 * @option Scene_Save
 * @option Scene_Load
 * @option Scene_GameEnd
 * @option Scene_Shop
 * @option Scene_Name
 * @desc 対象とするシーンです。
 * ALLは全体の設定になります。
 * 
 * @param Note
 * @text メモ
 * @type string
 * @desc 説明用のメモです。
 * 
 * @param Disabled
 * @text 無効化
 * @type boolean
 * @default false
 * @desc 背景の適用をせず無効化します。
 * 共通の背景も無効になります。
 * 
 * @param BackgroundImage
 * @text 背景画像
 * @type file
 * @dir img/parallaxes/
 * @desc シーンに適用する背景画像です。
 * 空欄だと共通の値を使用します。
 * 
 * @param ScrollX
 * @text Ｘ方向のスクロール
 * @type number @min -999 @max 999 @decimals 2
 * @desc 背景の横方向へのスクロール速度です。
 * 
 * @param ScrollY
 * @text Ｙ方向のスクロール
 * @type number @min -999 @max 999 @decimals 2
 * @desc 背景の縦方向へのスクロール速度です。
 * 
 * @param Switch
 * @text スイッチ
 * @type switch
 * @desc 背景を有効にするスイッチです。
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

const PLUGIN_NAME = "NRP_MenuBackground";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pBackgroundList = parseStruct2(parameters["BackgroundList"]);
const pBackgroundImage = setDefault(parameters["BackgroundImage"]);
const pScrollX = toNumber(parameters["ScrollX"], 0);
const pScrollY = toNumber(parameters["ScrollY"], 0);

//-----------------------------------------------------------------------------
// Scene_MenuBase
//-----------------------------------------------------------------------------

/**
 * ●背景作成
 */
const _Scene_MenuBase_createBackground = Scene_MenuBase.prototype.createBackground;
Scene_MenuBase.prototype.createBackground = function() {
    let imageName = pBackgroundImage;
    let scrollX = pScrollX;
    let scrollY = pScrollY;

    // 条件を満たすデータが取得できた場合は適用
    const data = getBackgroundData();
    if (data) {
        // 無効化の場合は通常の処理
        if (toBoolean(data.Disabled)) {
            _Scene_MenuBase_createBackground.apply(this, arguments);
            return;
        }
        // 背景画像の指定がなければ何もしない。
        if (data.BackgroundImage) {
            imageName = data.BackgroundImage;
            scrollX = toNumber(data.ScrollX, 0);
            scrollY = toNumber(data.ScrollY, 0);
        }
    }

    // 画像を取得できれば適用
    if (imageName) {
        // タイル用スプライトとして定義（これにより途切れずループするようになる。）
        this._backgroundSprite = new TilingSprite();
        this._backgroundSprite.bitmap = ImageManager.loadParallax(imageName);
        this._backgroundScrollX = scrollX;
        this._backgroundScrollY = scrollY;
        this._backgroundSprite.move(0, 0, Graphics.width, Graphics.height);
        this.addChild(this._backgroundSprite);
        return;
    }

    // 指定がない場合は通常の処理
    _Scene_MenuBase_createBackground.apply(this, arguments);
};

/**
 * ●有効な背景データがあれば取得する。
 */
function getBackgroundData() {
    if (pBackgroundList) {
        for (const data of pBackgroundList) {
            // シーン名が一致した場合
            // ※ただし、ALLの場合は有効とする。
            if (data.Scene == "ALL" || data.Scene == SceneManager._scene.constructor.name) {
                // スイッチの指定があり、かつオフだった場合
                if (data.Switch && !$gameSwitches.value(data.Switch)) {
                    continue;
                }
                return data;
            }
        }
    }
    return null;
}

/**
 * ●更新
 */
const _Scene_MenuBase_update = Scene_MenuBase.prototype.update;
Scene_MenuBase.prototype.update = function() {
    _Scene_MenuBase_update.apply(this, arguments);
    this.updateBackground();
};

/**
 * ●背景描画更新
 */
Scene_MenuBase.prototype.updateBackground = function() {
    // TilingSpriteになっていない場合はoriginを取得できないので終了
    if (!this._backgroundSprite.origin) {
        return;
    }
    // スクロールする。
    this._backgroundSprite.origin.x += this._backgroundScrollX;
    this._backgroundSprite.origin.y += this._backgroundScrollY;
};

})();
