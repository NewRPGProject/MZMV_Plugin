//=============================================================================
// NRP_ClassChangeScene.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.00 A class change system will be implemented.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/483459448.html
 *
 * @help A class change system will be implemented.
 * 
 * ◆Main Features
 * - Displays parameter changes
 *   and learnable skills after class change.
 * - Can set up an advanced class that can change classes
 *   when the conditions are met.
 * - Class change commands can be added to the menu screen.
 * - Different images (face gradients, pictures) can be specified
 *   for each class and actor.
 * - The new face can be reflected in the menu and in battle.
 * 
 * ------------------------------------------
 * ■Usage
 * ------------------------------------------
 * Register your candidate professions
 * in the "ClassList" of the plugin parameters.
 * You can also set the class change condition at that time.
 * Classes that do not meet the conditions will not be displayed.
 * 
 * It is also possible to display different images
 * for each class and actor by registering face graphics
 * and pictures in "ClassImageList".
 * 
 * If you execute the following plugin command,
 * the class change screen will be displayed.
 * If you turn on "ShowMenuCommand",
 * you can also call it from the menu screen.
 * 
 * ------------------------------------------
 * ■Plugin Command
 * ------------------------------------------
 * ◆SceneStart
 * Call the class change screen.
 * You can specify the actor to be the target of the class change.
 * If you do not specify, the actors' selection screen
 * will be displayed first.
 * 
 * You can also specify an additional ClassList.
 * This is useful, for example, for professions
 * that can only be class changed in certain locations.
 * 
 * ------------------------------------------
 * ■Note of Classes
 * ------------------------------------------
 * If you write the following, the description
 * will be displayed on the class change screen.
 * Line breaks and control characters are also possible.
 * 
 * <ClassMessage>
 * ~Text~
 * </ClassMessage>
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 * 
 * @command SceneStart
 * @desc Call the class change screen. If no actor is specified, the selection screen for actors is also displayed.
 * 
 * @arg Actor
 * @type actor
 * @desc This is the actor to be targeted. If not specified, the screen for selecting actors will be displayed.
 * 
 * @arg VariableActor
 * @type variable
 * @desc Specify the target actor as a variable.
 * This one has priority.
 * 
 * @arg AddClassList
 * @type struct<Class>[]
 * @desc This is the additional ClassList.
 * Combine with the ClassList of the plugin parameter.
 * 
 * 
 * 
 * @param ClassList
 * @type struct<Class>[]
 * @desc This is a list of targets for class change.
 * Register, including conditions.
 * 
 * @param KeepExp
 * @type boolean
 * @default false
 * @desc Make sure that experience is retained during class changes.
 * 
 * @param NoDuplicate
 * @type boolean
 * @default false
 * @desc It is prohibited to have multiple actors change classes to the same class.
 * 
 * @param ClassChangeMessage
 * @type string
 * @desc This is the message when changing classes.
 * %1=Actor, %2=Class。blank to hide.
 * 
 * @param SoundSuccess
 * @type file
 * @dir audio/se
 * @desc The sound effect when a class change is successfully.
 * If not specified, the default decision sound will be played.
 * 
 * @param <Layout>
 * @desc Items related to the layout of the class change screen.
 * 
 * @param SortClassId
 * @parent <Layout>
 * @type boolean
 * @default false
 * @desc Sorts the list in ClassId order.
 * 
 * @param ClassListWidth
 * @parent <Layout>
 * @type number
 * @default 280
 * @desc The width of the Class List.
 * 
 * @param DisplayListLevel
 * @parent <Layout>
 * @type boolean
 * @default true
 * @desc Displays the level in the Class List.
 * 
 * @param MessageFontSize
 * @parent <Layout>
 * @type number
 * @desc This is the font size of the class description.
 * If not specified, use the system setting.
 * 
 * @param <Layout Image>
 * @desc This item is used to set the image for the class change screen.
 * 
 * @param ClassImageList
 * @parent <Layout Image>
 * @type struct<ClassImage>[]
 * @desc This is a list for setting images for each class and actor.
 * 
 * @param UseClassImage
 * @parent <Layout Image>
 * @type boolean
 * @default true
 * @desc The images (other than pictures) set in ClassImageList will be reflected in the battle, menu, and other.
 * 
 * @param ReverseImagePos
 * @parent <Layout Image>
 * @type boolean
 * @default false
 * @desc Reverses the placement of parameters and images left and right.
 * 
 * @param PictureOnScroll
 * @parent <Layout Image>
 * @type boolean
 * @default true
 * @desc Link the picture to the up/down scroll.
 * 
 * @param PictureAdjustX
 * @parent <Layout Image>
 * @type number @min -9999 @max 9999
 * @default 0
 * @desc Adjusts the x-coordinate for displaying the picture.
 * 
 * @param PictureAdjustY
 * @parent <Layout Image>
 * @type number @min -9999 @max 9999
 * @default 0
 * @desc Adjusts the y-coordinate for displaying the picture.
 * 
 * @param PictureOpacity
 * @parent <Layout Image>
 * @type number
 * @default 128
 * @desc The opacity of the picture.
 * 
 * @param <Learn Skills>
 * @desc These are the related items of learned skills.
 * 
 * @param ShowSkillsType
 * @parent <Learn Skills>
 * @type select
 * @option No display @value
 * @option Show under @value under
 * @option Display other page @value page
 * @default page
 * @desc Set the placement to display the learned skills in the class information.
 * 
 * @param ShowUnlearnedSkills
 * @parent <Learn Skills>
 * @type select
 * @option No display @value
 * @option Display @value show
 * @option Mask Display @value mask
 * @default mask
 * @desc Displays unlearned skills in class information.
 * 
 * @param SkillFontSize
 * @parent <Learn Skills>
 * @type number
 * @desc The font size of the skill name.
 * If not specified, use the system setting.
 * 
 * @param <Menu Command>
 * @desc This is a related item for displaying class changes in menu commands.
 * 
 * @param ShowMenuCommand
 * @parent <Menu Command>
 * @type boolean
 * @default false
 * @desc Add class change to the menu command.
 * 
 * @param ShowMenuCommandPosition
 * @parent <Menu Command>
 * @type number
 * @default 3
 * @desc This is the position to insert the class change into the menu command. 0 is the first position.
 * 
 * @param ClassChangeName
 * @parent <Menu Command>
 * @type text
 * @default Class Change
 * @desc Sets the display command name for the class change.
 * 
 * @param ClassChangeSymbol
 * @parent <Menu Command>
 * @type text
 * @default classchange
 * @desc Sets the symbol for the class change.
 * This value can be used when working with other plugins.
 */

/*~struct~Class:
 * @param Class
 * @type class
 * @desc It is subject to class change.
 * 
 * @param Condition
 * 
 * @param Actors
 * @parent Condition
 * @type actor[]
 * @desc This is a candidate for actors that allow class changes.
 * 
 * @param Switch
 * @parent Condition
 * @type switch
 * @desc This switch is a class change requirement.
 * 
 * @param Item
 * @parent Condition
 * @type item
 * @desc This item is a class change requirement.
 * 
 * @param ClassInfo
 * @parent Condition
 * @type struct<ClassInfo>[]
 * @desc Class information for class change conditions.
 * 
 * @param Script
 * @parent Condition
 * @type string
 * @desc The script for the class change condition.
 * e.g. a.level >= 10
 */

/*~struct~ClassInfo:
 * @param Class
 * @type class
 * @desc This class is a condition for class change.
 * 
 * @param Level
 * @type number
 * @desc The class level that is a requirement for class change.
 */

/*~struct~ClassImage:
 * @param <Target>
 * 
 * @param Class
 * @parent <Target>
 * @type class
 * @desc This is the target class.
 * 
 * @param Actor
 * @parent <Target>
 * @type actor
 * @desc This is the target actor.
 * 
 * @param <Image>
 * 
 * @param Face
 * @parent <Image>
 * @type file
 * @dir img/faces
 * @desc This is the file of the face graphic to be displayed.
 * Use this file in combination with the index below.
 *
 * @param FaceIndex
 * @parent <Image>
 * @type number
 * @desc Index of the face graphic.
 * If the face graphic is omitted, the current file is used.
 * 
 * @param Picture
 * @parent <Image>
 * @type file
 * @dir img/pictures
 * @desc Specify the picture to be displayed.
 * Overrides the face graphic.
 * 
 * @param Character
 * @parent <Image>
 * @type file
 * @dir img/characters
 * @desc The file of the character image to be used.
 * Use this file in combination with the index below.
 *
 * @param CharacterIndex
 * @parent <Image>
 * @type number
 * @desc Index of the character graphic.
 * If the character graphic is omitted, the current file is used.
 * 
 * @param Battler
 * @parent <Image>
 * @type file
 * @dir img/sv_actors
 * @desc The file of the SV actor image to be used.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.00 転職システムを実装する。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/483459448.html
 *
 * @help 転職システムを実装します。
 * 
 * ◆主な機能
 * ・転職後の能力変化や習得スキルを表示
 * ・条件を満たした場合に転職できる上級職などを設定可
 * ・メニュー画面に転職用のコマンドを追加可
 * ・職業やアクター毎に異なる画像（顔グラ、ピクチャー）を指定可
 * ・変更した顔グラは戦闘やメニューにも反映可
 * 
 * ------------------------------------------
 * ■使用方法
 * ------------------------------------------
 * プラグインパラメータの『職業一覧』に、候補となる職業を登録してください。
 * その際、転職条件の設定も可能です。
 * 条件を満たさない職業は表示されません。
 * 
 * また、『職業画像一覧』に顔グラフィックやピクチャーを登録することで、
 * 職業やアクター毎に異なる画像を表示することも可能です。
 * 
 * 下記のプラグインコマンドを実行すれば、転職画面が表示されます。
 * 『メニューコマンドに表示』をオンにすれば、
 * メニュー画面から呼び出すことも可能です。
 * 
 * ------------------------------------------
 * ■プラグインコマンド
 * ------------------------------------------
 * ◆シーン開始
 * 転職画面を呼び出します。
 * 転職の対象とするアクターを指定可能です。
 * 指定しなかった場合は、アクターの選択画面が事前に表示されます。
 * 
 * また、追加の職業一覧を指定可能です。
 * 例えば、特定の場所でのみ転職可能な職業などに便利です。
 * 
 * ------------------------------------------
 * ■職業のメモ欄
 * ------------------------------------------
 * 以下のように記述すれば、転職画面に説明が表示されます。
 * 改行や制御文字も可能です。
 * 
 * <ClassMessage>
 * ～表示したい文章～
 * </ClassMessage>
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @command SceneStart
 * @text シーン開始
 * @desc 転職画面を呼び出します。
 * アクターを指定しない場合は、アクター選択画面も表示。
 * 
 * @arg Actor
 * @text アクター
 * @type actor
 * @desc 対象とするアクターです。
 * 指定がない場合は、アクターの選択画面を表示します。
 * 
 * @arg VariableActor
 * @text アクター（変数指定）
 * @type variable
 * @desc 対象とするアクターを変数で指定します。
 * こちらのほうが優先されます。
 * 
 * @arg AddClassList
 * @text 職業一覧（追加）
 * @type struct<Class>[]
 * @desc 転職の対象となる職業一覧の追加分です。
 * プラグインパラメータの職業一覧に結合します。
 * 
 * 
 * 
 * @param ClassList
 * @text 職業一覧
 * @type struct<Class>[]
 * @desc 転職の対象となる職業一覧です。
 * 転職条件なども含めて登録してください。
 * 
 * @param KeepExp
 * @text 経験値の保存
 * @type boolean
 * @default false
 * @desc 転職時に経験値を維持するようにします。
 * 
 * @param NoDuplicate
 * @text 職業の重複禁止
 * @type boolean
 * @default false
 * @desc 同一の職業へ複数のアクターが転職することを禁止します。
 * 
 * @param ClassChangeMessage
 * @text 転職時のメッセージ
 * @type string
 * @desc 転職時のメッセージです。
 * %1=アクター, %2=職業。空白で非表示します。
 * 
 * @param SoundSuccess
 * @text 成功時の効果音
 * @type file
 * @dir audio/se
 * @desc 転職に成功した際の効果音です。
 * 指定がない場合はデフォルトの決定音を鳴らします。
 * 
 * @param <Layout>
 * @text ＜レイアウト関連＞
 * @desc 転職画面のレイアウト関連項目です。
 * 
 * @param SortClassId
 * @parent <Layout>
 * @text 職業ＩＤで並び替え
 * @type boolean
 * @default false
 * @desc 職業ＩＤ順で一覧を並び替えます。
 * 
 * @param ClassListWidth
 * @parent <Layout>
 * @text 職業一覧の横幅
 * @type number
 * @default 280
 * @desc 職業一覧の横幅です。
 * 
 * @param DisplayListLevel
 * @parent <Layout>
 * @text 一覧にレベルを表示
 * @type boolean
 * @default true
 * @desc 職業一覧にレベルを表示します。
 * 
 * @param MessageFontSize
 * @parent <Layout>
 * @text 説明文のフォントサイズ
 * @type number
 * @desc 職業の説明文のフォントサイズです。
 * 未指定ならシステム設定を使います。
 * 
 * @param <Layout Image>
 * @text ＜レイアウト画像関連＞
 * @desc 転職画面に画像を設定するための項目です。
 * 
 * @param ClassImageList
 * @parent <Layout Image>
 * @text 職業画像一覧
 * @type struct<ClassImage>[]
 * @desc 職業やアクター毎の画像を設定するリストです。
 * 
 * @param UseClassImage
 * @parent <Layout Image>
 * @text 画像を他画面に反映
 * @type boolean
 * @default true
 * @desc 職業画像一覧に設定した画像（ピクチャー以外）を、戦闘やメニューなどにも反映します。
 * 
 * @param ReverseImagePos
 * @parent <Layout Image>
 * @text 画像配置の左右反転
 * @type boolean
 * @default false
 * @desc パラメータと画像の配置を左右反転します。
 * 
 * @param PictureOnScroll
 * @parent <Layout Image>
 * @text ピクチャーのｽｸﾛｰﾙ連動
 * @type boolean
 * @default true
 * @desc ピクチャーを上下のスクロールに連動します。
 * 
 * @param PictureAdjustX
 * @parent <Layout Image>
 * @text ピクチャーＸ補正
 * @type number @min -9999 @max 9999
 * @default 0
 * @desc ピクチャーを表示するＸ座標を調整します。
 * 
 * @param PictureAdjustY
 * @parent <Layout Image>
 * @text ピクチャーＹ補正
 * @type number @min -9999 @max 9999
 * @default 0
 * @desc ピクチャーを表示するＹ座標を調整します。
 * 
 * @param PictureOpacity
 * @parent <Layout Image>
 * @text ピクチャー不透明度
 * @type number
 * @default 128
 * @desc ピクチャーの不透明度です。
 * 
 * @param <Learn Skills>
 * @text ＜習得スキル関連＞
 * @desc 習得スキルの関連項目です。
 * 
 * @param ShowSkillsType
 * @parent <Learn Skills>
 * @text 習得スキルの表示位置
 * @type select
 * @option 表示しない @value
 * @option 下に表示 @value under
 * @option 別ページに表示 @value page
 * @default page
 * @desc 職業情報に習得スキルを表示する配置を設定します。
 * 
 * @param ShowUnlearnedSkills
 * @parent <Learn Skills>
 * @text 未習得のスキル表示
 * @type select
 * @option 表示しない @value
 * @option 表示 @value show
 * @option マスク表示 @value mask
 * @default mask
 * @desc 職業情報に未習得のスキルを表示します。
 * 
 * @param SkillFontSize
 * @parent <Learn Skills>
 * @text スキルのフォントサイズ
 * @type number
 * @desc スキル名のフォントサイズです。
 * 未指定ならシステム設定を使います。
 * 
 * @param <Menu Command>
 * @text ＜メニューコマンド関連＞
 * @desc メニューコマンドに転職を表示する際の関連項目です。
 * 
 * @param ShowMenuCommand
 * @parent <Menu Command>
 * @text メニューコマンドに表示
 * @type boolean
 * @default false
 * @desc メニューコマンドに転職を追加します。
 * 
 * @param ShowMenuCommandPosition
 * @parent <Menu Command>
 * @text メニューコマンド挿入位置
 * @type number
 * @default 3
 * @desc メニューコマンドに転職を挿入する位置です。
 * 0が先頭になります。
 * 
 * @param ClassChangeName
 * @parent <Menu Command>
 * @text 転職表示名
 * @type text
 * @default 転職
 * @desc 転職の表示コマンド名を設定します。
 * 
 * @param ClassChangeSymbol
 * @parent <Menu Command>
 * @text [上級]転職記号
 * @type text
 * @default classchange
 * @desc 転職の記号を設定します。
 * この値は他のプラグインと連携する際に使用できます。
 */

/*~struct~Class:ja
 * @param Class
 * @text 職業
 * @type class
 * @desc 転職対象とする職業です。
 * 
 * @param Condition
 * @text ＜転職条件＞
 * 
 * @param Actors
 * @parent Condition
 * @text アクター（配列）
 * @type actor[]
 * @desc 転職を許可するアクターの候補です。
 * 
 * @param Switch
 * @parent Condition
 * @text スイッチ
 * @type switch
 * @desc 転職条件となるスイッチです。
 * 
 * @param Item
 * @parent Condition
 * @text アイテム
 * @type item
 * @desc 転職条件となるアイテムです。
 * 
 * @param ClassInfo
 * @parent Condition
 * @text 職業情報（配列）
 * @type struct<ClassInfo>[]
 * @desc 転職条件となる職業情報です。
 * 
 * @param Script
 * @parent Condition
 * @text スクリプト
 * @type string
 * @desc 転職条件となるスクリプトです。
 * 例：a.level >= 10
 */

/*~struct~ClassInfo:ja
 * @param Class
 * @text 職業
 * @type class
 * @desc 転職の条件とする職業です。
 * 
 * @param Level
 * @text レベル
 * @type number
 * @desc 転職の条件とする職業のレベルです。
 */

/*~struct~ClassImage:ja
 * @param <Target>
 * @text ＜設定対象＞
 * 
 * @param Class
 * @parent <Target>
 * @text 職業
 * @type class
 * @desc 対象の職業です。
 * 
 * @param Actor
 * @parent <Target>
 * @text アクター
 * @type actor
 * @desc 対象のアクターです。
 * 
 * @param <Image>
 * @text ＜画像＞
 * 
 * @param Face
 * @parent <Image>
 * @text 顔グラフィック
 * @type file
 * @dir img/faces
 * @desc 表示する顔グラフィックのファイルです。
 * 下のインデックスと組み合わせてください。
 *
 * @param FaceIndex
 * @parent <Image>
 * @text 顔インデックス
 * @type number
 * @desc 顔グラフィックのインデックスです。
 * 顔グラフィックを省略すると現在のファイルを使用します。
 * 
 * @param Picture
 * @parent <Image>
 * @text ピクチャー
 * @type file
 * @dir img/pictures
 * @desc 表示するピクチャーを指定します。
 * 顔グラフィックよりも優先されます。
 * 
 * @param Character
 * @parent <Image>
 * @text キャラクター画像
 * @type file
 * @dir img/characters
 * @desc 使用するキャラクター画像のファイルです。
 * 下のインデックスと組み合わせてください。
 *
 * @param CharacterIndex
 * @parent <Image>
 * @text キャラクターｲﾝﾃﾞｯｸｽ
 * @type number
 * @desc キャラクター画像のインデックスです。
 * キャラクター画像を省略すると現在のファイルを使用します。
 * 
 * @param Battler
 * @parent <Image>
 * @text ＳＶアクター画像
 * @type file
 * @dir img/sv_actors
 * @desc 使用するＳＶアクター画像のファイルです。
 */

(function() {
"use strict";

/**
 * ●構造体をJSで扱えるように変換
 */
function parseStruct1(arg) {
    const ret = [];
    for (const str of JSON.parse(arg)) {
        ret.push(str);
    }
    return ret;
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

const PLUGIN_NAME = "NRP_ClassChangeScene";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pClassList = parseStruct2(parameters["ClassList"]);
const pKeepExp = toBoolean(parameters["KeepExp"], false);
const pNoDuplicate = toBoolean(parameters["NoDuplicate"], false);
const pClassChangeMessage = setDefault(parameters["ClassChangeMessage"]);
const pSoundSuccess = parameters["SoundSuccess"];
const pSortClassId = toBoolean(parameters["SortClassId"], false);
const pClassListWidth = toNumber(parameters["ClassListWidth"], 280);
const pDisplayListLevel = toBoolean(parameters["DisplayListLevel"], true);
const pMessageFontSize = toNumber(parameters["MessageFontSize"]);
const pClassImageList = parseStruct2(parameters["ClassImageList"]);
const pUseClassImage = toBoolean(parameters["UseClassImage"], true);
const pReverseImagePos = toBoolean(parameters["ReverseImagePos"], false);
const pPictureOnScroll = toBoolean(parameters["PictureOnScroll"], true);
const pPictureAdjustX = toNumber(parameters["PictureAdjustX"], 0);
const pPictureAdjustY = toNumber(parameters["PictureAdjustY"], 0);
const pPictureOpacity = toNumber(parameters["PictureOpacity"], 255);
const pShowSkillsType = parameters["ShowSkillsType"];
const pShowUnlearnedSkills = parameters["ShowUnlearnedSkills"];
const pSkillFontSize = toNumber(parameters["SkillFontSize"]);
const pShowMenuCommand = toBoolean(parameters["ShowMenuCommand"], false);
const pShowMenuCommandPosition = toNumber(parameters["ShowMenuCommandPosition"], 3);
const pClassChangeName = parameters["ClassChangeName"];
const pClassChangeSymbol = parameters["ClassChangeSymbol"];

//----------------------------------------
// ＭＺ用プラグインコマンド
//----------------------------------------

// MVには存在しないため、空で定義しておかないとエラーになる。
if (!PluginManager.registerCommand) {
    PluginManager.registerCommand = function() {}
}

/** 転職対象となる職業一覧 */
let mClassList = null;

/**
 * ●シーン開始
 */
PluginManager.registerCommand(PLUGIN_NAME, "SceneStart", function(args) {
    // アクターを取得
    const actor = getActor(args);
    // 対象に設定
    if (actor) {
        $gameParty.setMenuActor(actor);
    // 指定がない場合はクリア
    } else {
        $gameParty._menuActorId = 0;
    }

    // 職業一覧の生成
    mClassList = pClassList;

    if (args.AddClassList) {
        // プラグインコマンドの場合は、
        // なぜか謎の文字コード（001B）が含まれているので\に変換
        let addClassList = args.AddClassList.replace(/\u001B/g, "\\");
        // JSON形式をJS用に変換
        addClassList = parseStruct2(addClassList);
        // リストを結合
        mClassList = mClassList.concat(addClassList);
    }

    // ＩＤ順で並び替え
    if (pSortClassId) {
        mClassList.sort((a, b) => a.Class - b.Class);
    }

    // 選択肢ウィンドウが存在する場合は非表示
    // ※ゴミが残らないようにするため
    if (SceneManager._scene._choiceListWindow) {
        SceneManager._scene._choiceListWindow.hide();
    }

    // シーン開始
    SceneManager.push(Scene_ClassChange);
});

//----------------------------------------
// 共通関数
//----------------------------------------

/**
 * ●アクターを取得
 */
function getActor(args) {
    let actorId = setDefault(args.Actor);

    // 変数の指定がある場合は優先
    const variablActor = setDefault(args.VariableActor);
    if (variablActor) {
        actorId = $gameVariables.value(variablActor);
    }

    // アクターを取得
    const actor = $gameActors.actor(actorId);
    return actor;
}

//----------------------------------------
// 職業レベルの取得
//----------------------------------------

/**
 * ●経験値から職業のレベルを計算
 */
function getClassLevel(actor, classId) {
    const exp = actor._exp[classId];
    let level = 1;

    // 処理高速化のため先に中間レベルをチェックしてもよいかも？
    // exp >= this.expForLevel(50); みたいな感じで

    // 再帰的に現在のレベルを求める。
    while (!actor.isMaxLevel() && exp >= nextLevelExp(actor, classId, level)) {
        level++;
    }

    return level;
};

/**
 * ●次のレベルの経験値を取得
 */
function nextLevelExp(actor, classId, level) {
    return expForLevel(actor, classId, level + 1);
};

// 一時的に強制変更するための職業ＩＤ
let mForceClassId = null;

/**
 * ●指定レベルに到達するのに必要な経験値を取得
 */
function expForLevel(actor, classId, level) {
    // 参照する職業ＩＤを強制書換
    mForceClassId = classId;
    // 内部でGame_Actor.prototype.currentClass()を参照
    const exp = actor.expForLevel(level);
    // 職業ＩＤをクリア
    mForceClassId = null;

    return exp;
};

/**
 * ●現在の職業を取得
 */
const _Game_Actor_currentClass = Game_Actor.prototype.currentClass;
Game_Actor.prototype.currentClass = function() {
    if (mForceClassId) {
        // -1で空白を返す
        if (mForceClassId == -1) {
            const ret = [];
            ret.name = "";
            return ret;
        }
        return $dataClasses[mForceClassId];
    }

    return _Game_Actor_currentClass.apply(this, arguments);
};

//-----------------------------------------------------------------------------
// Scene_ClassChange
//
// 転職シーン用クラス

function Scene_ClassChange() {
    this.initialize(...arguments);
}

Scene_ClassChange.prototype = Object.create(Scene_MenuBase.prototype);
Scene_ClassChange.prototype.constructor = Scene_ClassChange;

Scene_ClassChange.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
    Scene_Message.prototype.initialize.call(this);

    // アクターの選択を行うかどうか？
    this._isSelectActor = false;
};

/**
 * ●ウィンドウの生成
 */
Scene_ClassChange.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);

    // アクター選択用ウィンドウ
    this.createStatusWindow();

    // 選択用ウィンドウ
    let wx = 0;
    let wy = this.mainAreaTop();
    let ww = pClassListWidth;
    let wh = Graphics.boxHeight - wy;
    this._selectWindow = new Windows_SelectClasses(new Rectangle(wx, wy, ww, wh));
    this._selectWindow.setHandler("ok", this.onClassChangeConfirm.bind(this));
    this._selectWindow.setHandler('cancel', this.onClassChangeSelectCancel.bind(this));
    this.addWindow(this._selectWindow);

    // 情報用ウィンドウ
    wx = this._selectWindow.width;
    ww = Graphics.boxWidth - wx;
    this._infoWindow = new Windows_ClassInfo(new Rectangle(wx, wy, ww, wh));
    this._infoWindow.setHandler("ok", this.onClassChangeOk.bind(this));
    this._infoWindow.setHandler('cancel', this.onClassChangeCancel.bind(this));
    this.addWindow(this._infoWindow);

    // 職業選択用ウィンドウから情報用ウィンドウへの参照を設定
    this._selectWindow.setInfoWindow(this._infoWindow);
    // メッセージ表示用の設定
    this.createMessageWindows();
};

/**
 * ●アクター選択用ウィンドウの作成
 */
Scene_ClassChange.prototype.createStatusWindow = function() {
    const rect = this.statusWindowRect();
    this._statusWindow = new Window_MenuStatus(rect);
    this._statusWindow.setHandler("ok", this.onClassChangeSelectStart.bind(this));
    this._statusWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._statusWindow);
};

/**
 * ●ステータスウィンドウ用の領域を確保
 */
Scene_ClassChange.prototype.statusWindowRect = function() {
    const ww = Graphics.boxWidth;
    const wh = this.mainAreaHeight();
    const wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;
    const wy = this.mainAreaTop();
    return new Rectangle(wx, wy, ww, wh);
};

/**
 * ●更新処理
 */
Scene_ClassChange.prototype.update = function() {
    Scene_MenuBase.prototype.update.call(this);

    if (this._isMessageClosing) {
        // メッセージが完全に閉じてからシーン終了
        if (this._messageWindow.isClosed()) {
            this.classChangeEnd();
        }
        return;
    }

    // メッセージのクローズ開始を検出
    if (this.isMessageWindowClosing()) {
        this._isMessageClosing = true;
    }
};

/**
 * ●処理開始
 */
Scene_ClassChange.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    Scene_Message.prototype.start.call(this);

    // アクターが指定されていない場合は、
    // まずアクター選択ウィンドウを表示する。
    if (this.isNoActor()) {
        // アクター選択を行うモード
        this._isSelectActor = true;
        this.selectActorStart();
        return;
    }

    // アクター情報の設定
    this.refreshActor();
    // 職業選択ウィンドウにフォーカス
    this._selectWindow.activate();
    this._infoWindow.deactivate();
};

/**
 * ●アクター選択開始
 */
Scene_ClassChange.prototype.selectActorStart = function() {
    // 転職用ウィンドウは非表示
    this._selectWindow.hide();
    this._infoWindow.hide();
    // さらにアクター選択用ウィンドウを表示＆フォーカス
    this._statusWindow.show();
    this._statusWindow.activate();
    // インデックスがない場合(-1)は先頭を選択
    // インデックスがある場合（キャンセルで転職ウィンドウから戻った）は維持
    if (this._statusWindow.index() < 0) {
        this._statusWindow.select(0);
    }
    // 描画更新（顔グラ）
    this._statusWindow.refresh();
};

/**
 * ●ヘルプウィンドウの縦幅
 * ※存在しないので0
 */
Scene_ClassChange.prototype.helpAreaHeight = function() {
    return 0;
};

/**
 * ●各ウィンドウにアクター情報を設定
 */
Scene_ClassChange.prototype.refreshActor = function() {
    const actor = this._actor;
    this._selectWindow.setActor(actor);
    this._infoWindow.setActor(actor);
};

/**
 * ●アクターが未設定かどうか？
 */
Scene_ClassChange.prototype.isNoActor = function() {
    return !$gameParty._menuActorId;
};

/**
 * ●転職の選択開始
 */
Scene_ClassChange.prototype.onClassChangeSelectStart = function() {
    // アクター選択ウィンドウの選択結果を反映
    this._actor = this._statusWindow.actor(this._statusWindow.index());

    // アクター選択ウィンドウを非表示
    this._statusWindow.hide();
    // 職業選択ウィンドウの表示＆フォーカス
    this._selectWindow.show();
    this._selectWindow.activate();
    // 職業情報ウィンドウの表示。ただし選択しない
    this._infoWindow.show();
    this._infoWindow.deselect();
    this._infoWindow.deactivate()
    // アクター情報の設定
    this.refreshActor();
};

/**
 * ●転職の選択キャンセル
 */
Scene_ClassChange.prototype.onClassChangeSelectCancel = function() {
    // アクターの選択を行う場合
    if (this._isSelectActor) {
        // アクター選択へ戻る
        this.selectActorStart();

    // アクターの選択がない場合は前シーンへ
    } else {
        this.popScene();
    }
};

/**
 * ●転職確認
 */
Scene_ClassChange.prototype.onClassChangeConfirm = function() {
    this._infoWindow.select(0);
    this._infoWindow.activate();
};

/**
 * ●転職確定
 */
Scene_ClassChange.prototype.onClassChangeOk = function() {
    // 選択中の職業を取得
    const classItem = this._selectWindow.item();
    // 転職実行
    this._actor.changeClass(classItem.id, pKeepExp);

    if (pClassChangeMessage) {
        // 成功メッセージの表示
        const text = pClassChangeMessage.format(
            this._actor.name(),
            classItem.name
        );
        $gameMessage.add(text);

    // メッセージがない場合は即終了
    } else {
        this.classChangeEnd();
    }
};

/**
 * ●転職キャンセル
 */
Scene_ClassChange.prototype.onClassChangeCancel = function() {
    this._infoWindow.deselect();
    // 職業選択ウィンドウに戻る
    this._selectWindow.activate();
};

/**
 * ●転職確定後の終了処理
 */
Scene_ClassChange.prototype.classChangeEnd = function() {
    // 画像反映を行う場合はリフレッシュ
    if (pUseClassImage) {
        $gamePlayer.refresh();
    }

    // アクターの選択を行う場合
    if (this._isSelectActor) {
        // アクター選択へ戻る
        this.selectActorStart();

    // アクターの選択がない場合は前シーンへ
    } else {
        this.popScene();
    }
};

//----------------------------------------
// 以下メッセージ表示用
//----------------------------------------

/**
 * ●停止
 */
Scene_ClassChange.prototype.stop = function() {
    Scene_Message.prototype.stop.call(this);
};

/**
 * ●終了時
 */
Scene_ClassChange.prototype.terminate = function() {
    Scene_Message.prototype.terminate.call(this);
};

/**
 * ●メッセージが閉じている最中か？
 */
Scene_ClassChange.prototype.isMessageWindowClosing = function() {
    return this._messageWindow.isClosing();
};

/**
 * ●ウィンドウ生成
 */
Scene_ClassChange.prototype.createMessageWindows = function() {
    this.createMessageWindow();
    this.createScrollTextWindow();
    this.createNameBoxWindow();
    this.createChoiceListWindow();
    this.createNumberInputWindow();
    this.createEventItemWindow();
    this.associateWindows();

    // メッセージウィンドウの下が消えないよう調整
    this.addChild(this._windowLayer.removeChild(this._messageWindow));
    this.addChild(this._windowLayer.removeChild(this._scrollTextWindow));
};

Scene_ClassChange.prototype.createMessageWindow = function() {
    Scene_Message.prototype.createMessageWindow.call(this);
};

Scene_ClassChange.prototype.createScrollTextWindow = function() {
    Scene_Message.prototype.createScrollTextWindow.call(this);
};

Scene_ClassChange.prototype.createNameBoxWindow = function() {
    Scene_Message.prototype.createNameBoxWindow.call(this);
};

Scene_ClassChange.prototype.createChoiceListWindow = function() {
    Scene_Message.prototype.createChoiceListWindow.call(this);
};

Scene_ClassChange.prototype.createNumberInputWindow = function() {
    Scene_Message.prototype.createNumberInputWindow.call(this);
};

Scene_ClassChange.prototype.createEventItemWindow = function() {
    Scene_Message.prototype.createEventItemWindow.call(this);
};

Scene_ClassChange.prototype.messageWindowRect = function() {
    return Scene_Message.prototype.messageWindowRect.call(this);
};

Scene_ClassChange.prototype.scrollTextWindowRect = function() {
    return Scene_Message.prototype.scrollTextWindowRect.call(this);
};

Scene_ClassChange.prototype.eventItemWindowRect = function() {
    return Scene_Message.prototype.eventItemWindowRect.call(this);
};

Scene_ClassChange.prototype.associateWindows = function() {
    const messageWindow = this._messageWindow;

    // 余計な表示がされるので、ダミーのウィンドウを設定
    const rect = new Rectangle(0, 0, 0, 0);
    const goldWindow = new Window_Gold(rect);
    messageWindow.setGoldWindow(goldWindow);

    messageWindow.setNameBoxWindow(this._nameBoxWindow);
    messageWindow.setChoiceListWindow(this._choiceListWindow);
    messageWindow.setNumberInputWindow(this._numberInputWindow);
    messageWindow.setEventItemWindow(this._eventItemWindow);
    this._nameBoxWindow.setMessageWindow(messageWindow);
    this._choiceListWindow.setMessageWindow(messageWindow);
    this._numberInputWindow.setMessageWindow(messageWindow);
    this._eventItemWindow.setMessageWindow(messageWindow);
};

/**
 * ●成功メッセージの追加
 */
Scene_ClassChange.prototype.showMessage = function(message) {
    // メッセージが有効な場合
    if (message) {
        const window = this._messageWindow;
        $gameMessage.add(message);

        // メッセージウィンドウにフォーカス
        if (window) {
            window.activate();
        }
    }
};

//-----------------------------------------------------------------------------
// Windows_SelectClasses
//
// 職業選択用ウィンドウ

function Windows_SelectClasses() {
    this.initialize(...arguments);
}

Windows_SelectClasses.prototype = Object.create(Window_Selectable.prototype);
Windows_SelectClasses.prototype.constructor = Windows_SelectClasses;

Windows_SelectClasses.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
};

Windows_SelectClasses.prototype.refresh = function() {
    this.makeItemList();
    this.select(0);
    Window_Selectable.prototype.refresh.call(this);
};

/**
 * ●項目生成
 */
Windows_SelectClasses.prototype.makeItemList = function() {
    const classes = [];
    // eval参照用
    const a = this._actor;

    // 転職条件を満たすか判定
    for (const classInfo of mClassList) {
        // 対象のアクターでない場合
        if (classInfo.Actors && !classInfo.Actors.includes(this._actor.actorId())) {
            continue;
        // 対象のスイッチがオンでない場合
        } else if (classInfo.Switch && !$gameSwitches.value(classInfo.Switch)) {
            continue;
        // 対象のアイテムが持っていない場合
        } else if (classInfo.Item && !$gameParty.hasItem($dataItems[classInfo.Item])) {
            continue;
        // 対象の職業情報を満たさない場合
        } else if (classInfo.ClassInfo && !this.isClassConditionOK(classInfo.ClassInfo)) {
            continue;
        // 対象のスクリプトがオンでない場合
        } else if (classInfo.Script && !eval(classInfo.Script)) {
            continue;
        }

        // 条件を満たすなら追加
        classes.push($dataClasses[classInfo.Class]);
    }

    this._data = classes;
};

/**
 * ●職業条件を満たすかどうか？
 */
Windows_SelectClasses.prototype.isClassConditionOK = function(jsonConditions) {
    // JSON形式のままなのでJS方式に変換
    const conditions = parseStruct2(jsonConditions);
    // 一時アクターを生成し、その職業情報を取得する。
    const tempActor = JsonEx.makeDeepCopy(this._actor);

    for (const condition of conditions) {
        tempActor.changeClass(condition.Class, pKeepExp);

        // レベル条件を満たさないならfalse
        if (tempActor.level < condition.Level) {
            return false;
        }
    }

    return true;
};

/**
 * ●項目表示
 */
Windows_SelectClasses.prototype.drawItem = function(index) {
    if (!this._actor) {
        return;
    }

    const classItem = this.itemAt(index);
    if (classItem) {
        const rect = this.itemLineRect(index);
        // 転職可不可の表示制御
        this.changePaintOpacity(isClassEnabled(classItem, this._actor));
        // 職業名の表示
        this.drawItemName(classItem, rect.x, rect.y);
        // 職業レベルの表示
        if (pDisplayListLevel) {
            const level = getClassLevel(this._actor, classItem.id);
            this.drawClassLevel(level, rect.x, rect.y, rect.width);
        }
        // 表示を戻す
        this.changePaintOpacity(1);
    }
};

// /**
//  * ●選択中の項目が選択可能かどうか？
//  */
// Windows_SelectClasses.prototype.isCurrentItemEnabled = function() {
//     return isClassEnabled(this.item(), this._actor);
// };

// /**
//  * ●項目が選択可能かどうか？
//  */
// Windows_SelectClasses.prototype.isEnabled = function(item) {
//     // 既に就いている職業の場合は無効
//     if (item.id == this._actor._classId) {
//         return false;

//     // 職業の重複禁止
//     } else if (pNoDuplicate) {
//         // 誰かが既にその職業へ就いている場合
//         if ($gameActors._data.some(actor => actor._classId == item.id)) {
//             return false;
//         }
//     }

//     return true;
// };

/**
 * ●選択中の項目を取得
 */
Windows_SelectClasses.prototype.item = function() {
    return this.itemAt(this.index());
};

/**
 * ●項目の取得
 */
Windows_SelectClasses.prototype.itemAt = function(index) {
    return this._data && index >= 0 ? this._data[index] : null;
};

/**
 * ●最大項目数
 */
Windows_SelectClasses.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

/**
 * ●項目名の表示
 */
Windows_SelectClasses.prototype.drawItemName = function(item, x, y) {
    if (item) {
        let textMargin = 4;
        let levelWidth = 0;
        // 職業レベルの表示
        if (pDisplayListLevel) {
            levelWidth = 64;
        }
        const itemWidth = Math.max(0, this.innerWidth - textMargin - levelWidth);
        this.resetTextColor();
        this.drawText(item.name, x + textMargin, y, itemWidth);
    }
};

/**
 * ●職業のレベルを表示
 */
Windows_SelectClasses.prototype.drawClassLevel = function(level, x, y, width) {
    this.drawText(level, x, y, width, "right");
};

/**
 * ●カーソル移動時
 */
Windows_SelectClasses.prototype.select = function(index) {
    Window_Selectable.prototype.select.apply(this, arguments);

    const classItem = this.itemAt(index);

    // 比較用に転職後アクター情報を設定
    if (this._actor && classItem) {
        const tempActor = JsonEx.makeDeepCopy(this._actor);
        tempActor.changeClass(classItem.id, pKeepExp);
        this._infoWindow.setTempActor(tempActor);
    }
};

/**
 * ●情報ウィンドウの設定
 */
Windows_SelectClasses.prototype.setInfoWindow = function(window) {
    this._infoWindow = window;
};

/**
 * ●アクターの設定
 */
Windows_SelectClasses.prototype.setActor = function(actor) {
    this._actor = actor;
    this.refresh();

    // 現在の職業にインデックスを設定する。
    for (let i = 0; i < this._data.length; i++) {
        const classItem = this.itemAt(i);
        // 一致するクラスが存在した場合
        if (this._actor.isClass(classItem)) {
            // インデックスを設定
            this.select(i);
            break;
        }
    }
};

//-----------------------------------------------------------------------------
// Windows_ClassInfo
//
// 職業情報用ウィンドウ

function Windows_ClassInfo() {
    this.initialize(...arguments);
}

Windows_ClassInfo.prototype = Object.create(Window_EquipStatus.prototype);
Windows_ClassInfo.prototype.constructor = Windows_ClassInfo;

Windows_ClassInfo.prototype.initialize = function(rect) {
    Window_Status.prototype.initialize.call(this, rect);

    // スクロール間隔
    this._scrollInterval = this.lineHeight();
};

/**
 * ●アクターの設定
 */
Windows_ClassInfo.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.loadClassImage(this._actor);
        this.refresh();
    }
};

/**
 * ●ページの変更
 */
Windows_ClassInfo.prototype.changePage = function() {
    this._isSkillPage = !this._isSkillPage;
    this.refresh();
};

/**
 * ●再描画
 */
Windows_ClassInfo.prototype.paint = function() {
    if (this.contents) {
        this.contents.clear();
        this.contentsBack.clear();
        this.drawAllItems();
        this.refreshCursor();
    }
};

/**
 * ●描画更新
 */
Windows_ClassInfo.prototype.refresh = function() {
    this.contents.clear();
    this.drawAllItems();

    // スクロール込の縦幅を計算
    this.setOverallHeight();
};

/**
 * ●職業情報
 */
Windows_ClassInfo.prototype.getClass = function() {
    return this._tempActor.currentClass();
}

/**
 * ●各項目の描画
 */
Windows_ClassInfo.prototype.drawAllItems = function() {
    if (this._actor && this._tempActor) {
        if (this._isSkillPage) {
            this.drawLearnSkills(this.itemPadding(), this.itemPadding());
            return;
        }

        const nameRect = this.itemLineRect(0);

        // 変更先の職業を表示
        this.drawActorClass(this.itemPadding(), -this._scrollY + this.itemPadding());
        // 職業レベルを表示
        this.drawActorClassLevel(this.itemPadding(), -this._scrollY + this.itemPadding() + nameRect.height);
        // 職業経験値を表示
        this.drawExpInfo(0, -this._scrollY + this.itemPadding() + this.lineHeight());

        this.drawActorName(this._actor, nameRect.x, -this._scrollY + this.itemPadding(), nameRect.width);

        if (pReverseImagePos) {
            this.drawClassImage(this._actor, this.paramX() + 170, this.paramY(0));
            this.drawAllParams();
        } else {
            this.drawClassImage(this._actor, nameRect.x, this.paramY(0));
            this.drawAllParams();
        }

        // 説明文を表示
        this.drawClassMessage(this.itemPadding(), this.classMessageY());
        // 習得スキルを表示
        this.drawLearnSkills(this.itemPadding(), this.classSkillY());
    }
};

/**
 * ●職業画像を表示
 */
Windows_ClassInfo.prototype.drawClassImage = function(
    actor, x, y, width, height
) {
    let faceName = actor.faceName();
    let faceIndex = actor.faceIndex();

    // 独自の職業画像が存在すれば取得する。
    const classImage = findClassImage(this._tempActor);
    if (classImage) {
        // ピクチャー
        if (classImage.Picture) {
            if (pPictureAdjustX) {
                x += pPictureAdjustX;
            }
            if (pPictureAdjustY) {
                y += pPictureAdjustY;
            }
            // スクロール連動しない場合は逆に加算して打ち消す。
            if (!pPictureOnScroll) {
                y += this._scrollY;
            }
            this.drawPicture(classImage.Picture, x, y, width, height);
            return;
        // 顔グラ
        } else if (classImage.Face) {
            faceName = classImage.Face;
        }
        // 顔グラ（インデックス）
        if (classImage.FaceIndex != undefined) {
            faceIndex = classImage.FaceIndex;
        }
    }

    // 通常はアクターの顔グラ
    this.drawFace(faceName, faceIndex, x, y, width, height);
};

/**
 * ●ピクチャーの描画
 */
Windows_ClassInfo.prototype.drawPicture = function(
    imageName, x, y, width, height
) {
    const bitmap = ImageManager.loadPicture(imageName);
    width = width || bitmap.width;
    height = height || bitmap.height;
    const sw = width;
    const sh = height;
    // 中央寄せ
    const dx = x;
    const dy = y;
    const sx = 0;
    const sy = 0;
    this.contents.paintOpacity = pPictureOpacity;
    this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy);
    this.contents.paintOpacity = 255;
};

/**
 * ●独自の職業画像が存在すればロードする。
 */
Windows_ClassInfo.prototype.loadClassImage = function(actor) {
    // 画像の設定がある場合
    for (const classImage of pClassImageList) {
        // アクターの指定がある場合
        if (classImage.Actor) {
            if (classImage.Actor == actor.actorId()) {
                if (classImage.Picture) {
                    ImageManager.loadPicture(classImage.Picture);

                } else if (classImage.Face) {
                    ImageManager.loadFace(classImage.Face);
                }
            }

        // アクターの指定がない場合
        } else {
            if (classImage.Picture) {
                ImageManager.loadPicture(classImage.Picture);

            } else if (classImage.Face) {
                ImageManager.loadFace(classImage.Face);
            }
        }
    }
};

/**
 * ●職業名を表示
 */
Windows_ClassInfo.prototype.drawActorClass = function(x, y, width) {
    width = width || 168;
    this.resetTextColor();
    this.drawText(this.getClass().name, x, y, this.innerWidth - this.itemPadding(), "right");
};

/**
 * ●職業レベルを表示
 */
Windows_ClassInfo.prototype.drawActorClassLevel = function(x, y) {
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(TextManager.levelA, x, y, 48);
    this.resetTextColor();
    this.drawText(this._tempActor.level, x + 84, y, 36, "right");
};

/**
 * ●職業経験値を表示
 */
Windows_ClassInfo.prototype.drawExpInfo = function(x, y) {
    const faceWidth = ImageManager.faceWidth;

    this.changeTextColor(ColorManager.systemColor());
    this.drawText(TextManager.expA, faceWidth + this.itemPadding() + 16, y, 270);
    this.resetTextColor();
    // 現在の経験値
    this.drawText(this.expTotalValue(), x - 125, y, this.innerWidth - this.itemPadding(), "right");
    // "/"
    this.drawText("/", x - 110, y, this.innerWidth - this.itemPadding(), "right");
    // 次のレベルアップまでの経験値
    this.drawText(this.expNextValue(), x, y, this.innerWidth - this.itemPadding(), "right");
};

/**
 * ●現在の経験値
 */
Windows_ClassInfo.prototype.expTotalValue = function() {
    if (this._tempActor.isMaxLevel()) {
        return "-------";
    } else {
        return this._tempActor.currentExp();
    }
};

/**
 * ●次のレベルに必要な合計経験値
 */
Windows_ClassInfo.prototype.expNextValue = function() {
    if (this._tempActor.isMaxLevel()) {
        return "-------";
    } else {
        // デフォルトとは異なり、現在ＥＸＰとの合計を表示
        return this._tempActor.currentExp() + this._tempActor.nextRequiredExp();
    }
};

/**
 * ●職業レベルのＸ座標を取得
 */
Windows_ClassInfo.prototype.levelX = function() {
    const itemPadding = this.itemPadding();
    const levelWidth = 120;
    return this.innerWidth - itemPadding - levelWidth;
};

/**
 * ●各パラメータを表示
 */
Windows_ClassInfo.prototype.drawAllParams = function() {
    let x = this.itemPadding();
    if (!pReverseImagePos) {
        x += ImageManager.faceWidth + 16;
    }

    for (let i = 0; i < 6; i++) {
        const y = this.paramY(i);
        this.drawItem(x, y, 2 + i);
    }

    this.resetTextColor();
};

/**
 * ●パラメータのＸ座標
 */
Windows_ClassInfo.prototype.paramX = function() {
    const itemPadding = this.itemPadding();
    const rightArrowWidth = this.rightArrowWidth();
    const paramWidth = this.paramWidth();

    if (pReverseImagePos) {
        return 150;
    }
    return this.innerWidth - itemPadding - paramWidth * 2 - rightArrowWidth;
};

/**
 * ●パラメータのＹ座標取得
 */
Windows_ClassInfo.prototype.paramY = function(index) {
    return -this._scrollY + Math.floor(this.lineHeight() + this.lineHeight() * (index + 1.5));
};

/**
 * ●職業の習得スキルを表示
 */
Windows_ClassInfo.prototype.drawLearnSkills = function(x, y) {
    // スキルを表示しない場合
    if (!pShowSkillsType) {
        // 終了座標だけを設定
        this._skillEndY = y;
        return;
    // または別ページに表示する場合
    // かつ、スキルページではない場合
    } else if (!this._isSkillPage && pShowSkillsType == "page") {
        // 終了座標だけを設定
        this._skillEndY = y;
        return;
    }

    this.resetTextColor();
    if (pSkillFontSize) {
        this.contents.fontSize = pSkillFontSize;
    }

    let i = 0;
    for (const learning of this.getClass().learnings) {
        const skill = $dataSkills[learning.skillId];

        let skillName = skill.name;

        if (!this._tempActor.isLearnedSkill(learning.skillId)) {
            // 未習得のスキルを表示しない場合
            if (!pShowUnlearnedSkills) {
                continue;
            }

            // 未習得なら半透明表示
            this.changePaintOpacity(false);

            // マスクする場合
            if (pShowUnlearnedSkills == "mask") {
                skillName = "？？？？？";
            }
        }
        
        if (i % 2 == 0) {
            x = this.itemPadding();
        } else {
            x = this.itemPadding() + this.innerWidth / 2;
        }

        const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
        const textMargin = ImageManager.iconWidth + 4;
        const itemWidth = Math.max(0, this.innerWidth / 2 - this.itemPadding() - textMargin);
        // アイコンを描画
        this.drawIcon(skill.iconIndex, x, iconY);
        // スキル名を描画
        this.drawText(skillName, x + textMargin, y, itemWidth);
        // 表示を戻す
        this.changePaintOpacity(1);

        // 次の行へ
        if (i % 2 == 1) {
            y += this.lineHeight();
        }

        i++;
    }

    // 項目数が奇数の場合は改行追加
    if (i > 0 && i % 2 == 1) {
        y += this.lineHeight();
    }

    this.resetFontSettings();

    this._skillEndY = y + this.lineHeight();
};

/**
 * ●職業の説明を表示
 */
Windows_ClassInfo.prototype.drawClassMessage = function(x, y) {
    if (pMessageFontSize) {
        this.contents.fontSize = pMessageFontSize;
    }

    this.drawTextEx(this.getClassMessage(), x, y);
    // フォント設定をリセット（\c[]などを初期化）
    this.resetFontSettings();
};

/**
 * ●文字列描画処理
 * ※Window_Base.prototype.drawTextExとほぼ同じだがフォントリセットしない。
 */
Windows_ClassInfo.prototype.drawTextEx = function(text, x, y, width) {
    const textState = this.createTextState(text, x, y, width);
    this.processAllText(textState);
    return textState.outputWidth;
};

/**
 * ●職業説明文のＹ座標取得
 */
Windows_ClassInfo.prototype.classMessageY = function() {
    // パラメータの下に接続（8はマージン）
    return Math.floor(this.paramY(6)) + 8;
};

/**
 * ●職業習得スキルのＹ座標取得
 */
Windows_ClassInfo.prototype.classSkillY = function() {
    const classMessage = this.getClassMessage();
    // 説明文が存在しない場合は省略
    if (!classMessage) {
        return Math.floor(this.classMessageY()) + 8;
    }
    // 職業説明の下に接続（8はマージン）
    return Math.floor(this.classMessageY() + this.getTextHeight(classMessage)) + 8;
};

/**
 * ●文章の縦幅取得
 */
Windows_ClassInfo.prototype.getTextHeight = function(text) {
    return this.textSizeEx(text).height;
};

/**
 * ●職業の説明文を表示
 */
Windows_ClassInfo.prototype.getClassMessage = function () {
    const noteSplit = this.getClass().note.split("\n");
    // タグ名
    const tagName = "ClassMessage";
    // メッセージ
    let msg = "";
    // タグ開始検出用
    let readStart = false;

    // 一行ずつ読込
    for (const noteLine of noteSplit) {
        // 開始タグ
        if (noteLine.match("<" + tagName + ">")) {
            // 内容モード開始
            readStart = true;

        // 終了タグ
        } else if (noteLine.match("</\\s*" + tagName + ">")) {
            // 処理終了
            break;

        // 内容モード時
        } else if (readStart) {
            // 行内容を追加
            if (msg) {
                msg += "\n";
            }
            // msg.push(noteLine);
            msg += noteLine;
        }
    }

    return msg;
};

/**
 * ●カーソルの表示
 */
Windows_ClassInfo.prototype.refreshCursor = function() {
    if (this._cursorAll) {
        this.setCursorRect(0, 0, this.width, Graphics.height);
    } else if (this.index() >= 0) {
        this.setCursorRect(0, 0, this.width, Graphics.height);
    } else {
        this.setCursorRect(0, 0, 0, 0);
    }
};

/**
 * ●カーソル移動が有効かどうか？
 */
Windows_ClassInfo.prototype.isCursorMovable = function() {
    return this.isOpenAndActive();
};

/**
 * ●選択中の項目が選択可能かどうか？
 */
Windows_ClassInfo.prototype.isCurrentItemEnabled = function() {
    return isClassEnabled(this.getClass(), this._actor);
};

/**
 * ●転職決定時
 */
Windows_ClassInfo.prototype.processOk = function() {
    if (this.isCurrentItemEnabled()) {
        // 転職成功効果音
        if (pSoundSuccess) {
            AudioManager.playSe({"name":pSoundSuccess, "volume":90, "pitch":100, "pan":0})
        // 指定がない場合はデフォルトの決定音
        } else {
            this.playOkSound();
        }
        
        this.updateInputData();
        this.deactivate();
        this.callOkHandler();
    } else {
        this.playBuzzerSound();
    }
};

/**
 * ●転職キャンセル時
 */
Windows_ClassInfo.prototype.processCancel = function() {
    Window_Selectable.prototype.processCancel.apply(this, arguments);

    // スクロール位置を先頭に戻す。
    this.scrollTo(this._scrollX, 0);
};

/**
 * ●カーソル下
 */
Windows_ClassInfo.prototype.cursorDown = function(wrap) {
    // this.scrollTo(this._scrollX, this._scrollY + this._scrollInterval);
    // this.smoothScrollTo(this._scrollX, this._scrollY + this._scrollInterval);
    this.smoothScrollDown(1);
};

/**
 * ●カーソル上
 */
Windows_ClassInfo.prototype.cursorUp = function(wrap) {
    // this.scrollTo(this._scrollX, this._scrollY - this._scrollInterval);
    // this.smoothScrollTo(this._scrollX, this._scrollY - this._scrollInterval);
    this.smoothScrollUp(1);
};

// Windows_ClassInfo.prototype.smoothScrollTo = function(x, y) {
//     this._scrollTargetX = x.clamp(0, this.maxScrollX());
//     this._scrollTargetY = y.clamp(0, this.maxScrollY());
//     // this._scrollDuration = Input.keyRepeatInterval;
//     this._scrollDuration = 6;
// };

/**
 * ●スクロールを含めた縦幅を計算
 */
Windows_ClassInfo.prototype.setOverallHeight = function() {
    if (this._actor && this._tempActor) {
        this._overallHeight = this._skillEndY;
        return;
    }
    this._overallHeight = 0;
};

/**
 * ●スクロールを含めた縦幅
 */
Windows_ClassInfo.prototype.overallHeight = function() {
    return this._overallHeight;
};

/**
 * ●最大の縦スクロール幅
 */
Windows_ClassInfo.prototype.maxScrollY = function() {
    let maxScrollY = Math.max(0, this.overallHeight() - this.innerHeight);
    // スクロール単位で丸める。
    // ※丸めておかないと上に戻った時にズレる。
    maxScrollY = Math.floor(maxScrollY / this.scrollBlockHeight()) * this.scrollBlockHeight();
    return maxScrollY;
};

/**
 * ●スクロール単位
 */
Windows_ClassInfo.prototype.scrollBlockHeight = function() {
    return this._scrollInterval;
};

/**
 * ●原点の更新
 */
Windows_ClassInfo.prototype.updateOrigin = function() {
    const blockWidth = this.scrollBlockWidth() || 1;
    // const blockHeight = this.scrollBlockHeight() || 1;
    const blockHeight = 1; // ブロックは使わない。

    const baseX = this._scrollX - (this._scrollX % blockWidth);
    const baseY = this._scrollY - (this._scrollY % blockHeight);

    if (baseX !== this._scrollBaseX || baseY !== this._scrollBaseY) {
        this.updateScrollBase(baseX, baseY);
        this.paint();
    }
    this.origin.x = this._scrollX % blockWidth;
    this.origin.y = this._scrollY % blockHeight;
};

/**
 * ●カーソル移動時
 */
Windows_ClassInfo.prototype.processCursorMove = function() {
    if (this.isCursorMovable()) {
        // スクロールをスムーズにするため独自関数を使用
        if (isRepeated.bind(Input)("down")) {
            this.cursorDown(Input.isTriggered("down"));
        }
        if (isRepeated.bind(Input)("up")) {
            this.cursorUp(Input.isTriggered("up"));
        }
    }

    Window_Selectable.prototype.processCursorMove.apply(this, arguments);
};

// Windows_ClassInfo.prototype._updateCursor = function() {
//     this._cursorSprite.alpha = this._makeCursorAlpha();
//     this._cursorSprite.visible = this.isOpen() && this.cursorVisible;
//     this._cursorSprite.x = this._cursorRect.x;
//     this._cursorSprite.y = this._cursorRect.y;
// };

// Windows_ClassInfo.prototype._makeCursorAlpha = function() {
//     const blinkCount = this._animationCount % 40;
//     const baseAlpha = this.contentsOpacity / 255;
//     if (this.active) {
//         if (blinkCount < 20) {
//             return baseAlpha - blinkCount / 32;
//         } else {
//             return baseAlpha - (40 - blinkCount) / 32;
//         }
//     }
//     return baseAlpha;
// };

/**
 * ●スクロールをスムーズにするための独自関数
 * ※Input.isRepeatedを改修
 */
function isRepeated(keyName) {
    if (this._isEscapeCompatible(keyName) && this.isRepeated("escape")) {
        return true;
    } else {
        return (
            this._latestButton === keyName &&
            (this._pressedTime === 0 ||
                (this._pressedTime >= 0 &&
                    this._pressedTime % this.keyRepeatInterval === 0))
        );
    }
};

//-----------------------------------------------------------------------------
// ページ切替用
//-----------------------------------------------------------------------------

// 別ページに表示する場合
if (pShowSkillsType == "page") {
    /**
     * ●右キー
     */
    Windows_SelectClasses.prototype.cursorRight = function(wrap) {
        this.playCursorSound();
        // スキルページへ切替
        this._infoWindow.changePage();
    };

    /**
     * ●左キー
     */
    Windows_SelectClasses.prototype.cursorLeft = function(wrap) {
        this.playCursorSound();
        // スキルページへ切替
        this._infoWindow.changePage();
    };

    /**
     * ●右キー
     */
    Windows_ClassInfo.prototype.cursorRight = function(wrap) {
        this.playCursorSound();
        // スキルページへ切替
        this.changePage();
    };

    /**
     * ●左キー
     */
    Windows_ClassInfo.prototype.cursorLeft = function(wrap) {
        this.playCursorSound();
        // スキルページへ切替
        this.changePage();
    };

    /**
     * ●ページを使用しない。
     * ※NRP_PageWindow.jsとの競合対策
     */
    Windows_SelectClasses.prototype.isUsePage = function() {
        return false;
    }

    /**
     * ●ページ切替矢印更新
     */
    Windows_ClassInfo.prototype.updateArrows = function() {
        Window_Selectable.prototype.updateArrows.apply(this, arguments);

        // 左右のページ切替矢印を表示
        // this.leftArrowVisible = true;
        this.rightArrowVisible = true;
    };

    /**
     * ●ページ切替矢印作成
     */
    Windows_ClassInfo.prototype._createAllParts = function() {
        Window.prototype._createAllParts.apply(this, arguments);

        // 左右の矢印を追加
        // this._leftArrowSprite = new Sprite();
        this._rightArrowSprite = new Sprite();
        // this.addChild(this._leftArrowSprite);
        this.addChild(this._rightArrowSprite);
    };

    /**
     * ●ページ切替矢印配置
     */
    Windows_ClassInfo.prototype._refreshArrows = function() {
        Window.prototype._refreshArrows.apply(this, arguments);

        var w = this._width;
        var h = this._height;
        var p = 24;
        var q = p/2;
        var sx = 96+p;
        var sy = 0+p;

        var cursorLeftW = 12;
        var cursorRightW = 12;

        // // カーソル画像設定
        // this._leftArrowSprite.bitmap = this._windowskin;
        // this._leftArrowSprite.setFrame(sx, sy+q, q, p);

        // this._leftArrowSprite.anchor.x = 0.5;
        // this._leftArrowSprite.anchor.y = 0.5;

        this._rightArrowSprite.bitmap = this._windowskin;
        this._rightArrowSprite.setFrame(sx+q+p, sy+q, q, p);

        this._rightArrowSprite.anchor.x = 0.5;
        this._rightArrowSprite.anchor.y = 0.5;

        // カーソル位置設定
        var leftX;
        var leftY;
        var rightX;
        var rightY;

        // // 横位置の設定
        // if (pPageCursorHorizontal == "right") {
        //     rightX = w - cursorRightW / 2 - 4;
        //     leftX = rightX - cursorRightW;

        // } else if (pPageCursorHorizontal == "leftRight") {
        //     leftX = cursorLeftW / 2 + 4;
        //     rightX = w - cursorRightW / 2 - 4;
        // }
        leftX = cursorLeftW / 2 + 4;
        rightX = w - cursorRightW / 2 - 4;
        
        // 縦位置の設定
        leftY = h / 2;
        rightY = h / 2;

        // this._leftArrowSprite.move(leftX, leftY);
        this._rightArrowSprite.move(rightX, rightY);
    };
}

//-----------------------------------------------------------------------------
// メニューコマンド
//-----------------------------------------------------------------------------

if (pShowMenuCommand) {
    /**
     * ●メニューコマンド追加（メインコマンド）
     */
    const _Window_MenuCommand_addMainCommands = Window_MenuCommand.prototype.addMainCommands;
    Window_MenuCommand.prototype.addMainCommands = function() {
        // 元処理実行
        _Window_MenuCommand_addMainCommands.call(this);

        // 指定位置に転職コマンドを挿入
        // ※標準では装備の下
        this._list.splice(pShowMenuCommandPosition, 0,
            { name: pClassChangeName, symbol: pClassChangeSymbol, enabled: true, ext: null});
    };

    /**
     * ●メニューコマンド呼び出し先の設定
     */
    const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        // 元処理実行
        _Scene_Menu_createCommandWindow.call(this);

        // コマンド追加（アクター選択）
        this._commandWindow.setHandler(pClassChangeSymbol, this.commandPersonal.bind(this));
    };

    /**
     * ●アクター選択
     */
    const _Scene_Menu_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
    Scene_Menu.prototype.onPersonalOk = function() {
        _Scene_Menu_onPersonalOk.apply(this, arguments);

        // 転職画面に遷移
        if (this._commandWindow.currentSymbol() == pClassChangeSymbol) {
            // 職業一覧の生成
            mClassList = pClassList;
            // 転職画面起動
            SceneManager.push(Scene_ClassChange);
        }
    };
}

//-----------------------------------------------------------------------------
// 画像の反映
//-----------------------------------------------------------------------------
if (pUseClassImage) {
    /**
     * ●顔グラ
     */
    const _Game_Actor_faceName = Game_Actor.prototype.faceName;
    Game_Actor.prototype.faceName = function() {
        const classImage = findClassImage(this);
        if (classImage && classImage.Face) {
            return classImage.Face;
        }

        return _Game_Actor_faceName.apply(this, arguments);
    };

    /**
     * ●顔グラ（インデックス）
     */
    const _Game_Actor_faceIndex = Game_Actor.prototype.faceIndex;
    Game_Actor.prototype.faceIndex = function() {
        const classImage = findClassImage(this);
        if (classImage && classImage.FaceIndex) {
            return classImage.FaceIndex;
        }

        return _Game_Actor_faceIndex.apply(this, arguments);
    };

    /**
     * ●キャラクター
     */
    const _Game_Actor_characterName = Game_Actor.prototype.characterName;
    Game_Actor.prototype.characterName = function() {
        const classImage = findClassImage(this);
        if (classImage && classImage.Character) {
            return classImage.Character;
        }

        return _Game_Actor_characterName.apply(this, arguments);
    };

    /**
     * ●キャラクター（インデックス）
     */
    const _Game_Actor_characterIndex = Game_Actor.prototype.characterIndex;
    Game_Actor.prototype.characterIndex = function() {
        const classImage = findClassImage(this);
        if (classImage && classImage.CharacterIndex) {
            return classImage.CharacterIndex;
        }

        return _Game_Actor_characterIndex.apply(this, arguments);
    };

    /**
     * ●ＳＶアクター
     */
    const _Game_Actor_battlerName = Game_Actor.prototype.battlerName;
    Game_Actor.prototype.battlerName = function() {
        const classImage = findClassImage(this);
        if (classImage && classImage.Battler) {
            return classImage.Battler;
        }

        return _Game_Actor_battlerName.apply(this, arguments);
    };
}

//-----------------------------------------------------------------------------
// 共通関数
//-----------------------------------------------------------------------------

/**
 * ●独自の職業画像が存在すれば取得する。
 */
function findClassImage(actor) {
    // 画像の設定がある場合
    for (const classImage of pClassImageList) {
        // 職業が一致する場合
        if (classImage.Class == actor.currentClass().id) {
            // アクターの指定がある場合
            if (classImage.Actor) {
                if (classImage.Actor == actor.actorId()) {
                    return classImage;
                }
            // アクターの指定がない場合
            } else {
                return classImage;
            }

        // 職業の指定がない場合
        } else if (!classImage.Class) {
            // アクターの指定がある場合
            if (classImage.Actor) {
                if (classImage.Actor == actor.actorId()) {
                    return classImage;
                }
            // アクターの指定がない場合
            } else {
                return classImage;
            }
        }
    }
    // 存在しなければnullを返す。
    return null;
};

/**
 * ●職業が選択可能かどうか？
 */
function isClassEnabled(item, actor) {
    // 既に就いている職業の場合は無効
    if (item.id == actor._classId) {
        return false;

    // 職業の重複禁止
    } else if (pNoDuplicate) {
        // 誰かが既にその職業へ就いている場合
        if ($gameActors._data.some(actor => actor._classId == item.id)) {
            return false;
        }
    }

    return true;
};

})();
