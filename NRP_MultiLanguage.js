//=============================================================================
// NRP_MultiLanguage.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.031 Multi-language support.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/521162546.html
 *
 * @help This plugin adds multi-language support to RPG Maker MZ.
 *
 * Main features:
 * - Load text from Excel-compatible xlsx files
 *   and replace it by language.
 * - Load database JSON files and plugin parameters
 *   from language projects.
 * - Automatically switch between registered images
 *   based on the selected language.
 * - Add a language-selection command to the Options screen.
 * - Integrate with the MZ Text Editor extension.
 *
 * Microsoft Excel is not required.
 * Any spreadsheet application that can save xlsx files,
 * such as LibreOffice, can be used.
 *
 * Note: Please place this plugin as high up in the list as possible.
 *       Only plugins listed below this one will be translated.
 * 
 * -------------------------------------------------------------------
 * [xlsx file placement]
 * -------------------------------------------------------------------
 * Place xlsx files in [Project]/data/localize/.
 * 
 * If you look at the sample,
 * you should get a general idea of the format.
 * Details are provided below.
 * 
 * ◆xlsx Format
 * - The first row is the header row.
 * - The “ID” column serves as the key
 *   for referencing entries within the text.
 * - The language code columns (ja, en, etc.)
 *   correspond to the text columns for each language.
 * - From the second row onward:
 *   Enter an ID in the “ID” column (e.g., 001)
 *   and the corresponding text in the respective language columns.
 * - The order of the columns is flexible.
 *   You may also add reference information,
 *   such as the speaker, as a column.
 * 
 * ◆Specifying Sheet Names
 * This plugin supports multiple XLSX files and multiple sheets.
 * However, only the sheet name is used as the key.
 * If the same sheet name is used across multiple files,
 * it will be invalid.
 * Note: Sheet names are not case-sensitive.
 * 
 * - When using multiple sheets,
 *   separate the names with a period (.) at the beginning.
 *   (Example: If the sheet name is “town001” and the ID is “001”
 *    enter “town01.001”)
 * - You can also omit the sheet name by setting the current sheet name.
 *   There are two ways to set the current sheet name:
 *   - Set it in the map’s notes field
 *     as follows: <LanguageSheet:sheetName>
 *   - Set a string in the “Sheet Name Variable”
 *     plugin parameter using a script.
 * - Note that if only one sheet is used throughout the project,
 *   this can be omitted.
 *
 * -------------------------------------------------------------------
 * [Translation Overview]
 * -------------------------------------------------------------------
 * This plugin offers various methods for multilingual support.
 * Please choose the method that works best for you.
 * 
 * - Main text: \lanm
 * - Name field: \lanc, or refer to a separate project
 *   (TextScriptBase.js)
 * - Options: \lanc
 * - Database: Refer to a separate project
 * - Plugin parameters: Refer to a separate project
 * 
 * I recommend using these as appropriate.
 * Details are explained below.
 * 
 * -------------------------------------------------------------------
 * [Text replacement with xlsx]
 * -------------------------------------------------------------------
 * ◆String Replacement (\lan[id])
 * 
 * This is the simplest method.
 * It replaces the text with the language specified in the xlsx file.
 * It can be used for body text, name fields,
 * database fields, plugin parameters, and more.
 * 
 * However, the text entered in the editor
 * must consist solely of control characters.
 * Please note that when viewed in the editor,
 * only the code will be visible.
 * 
 * ◆Replace text based on the “Name” field (\lanm[id])
 * 
 * Entering text in the “Name” field will replace the body text
 * with the corresponding language specified in the XLSX file.
 * If no corresponding language is specified,
 * the original text will be used as is.
 * 
 * This is useful when you want to make a project
 * that has already been completed in Japanese
 * multilingual while making as few changes as possible.
 * 
 * ◆String Prefix Replacement (\lanc[id])
 * 
 * Replaces the text at the beginning of the input field
 * with the corresponding language specified in xlsx.
 * Can be used for body text, name fields, database fields,
 * plugin parameters, and more.
 * If the corresponding language is not available,
 * the original text is used as-is.
 * 
 * This is also useful when you want to make
 * a project—already completed as an English-language work—
 * multilingual with as few changes as possible.
 * It can also be used for replacements
 * in name fields and drop-down menus.
 * 
 * ◆Automatic Replacement
 * 
 * If you specify an xlsx file as the “Automatic Replacement File,”
 * text that matches the entries in the “Name” column
 * and the “Options” column will be automatically replaced.
 * It also supports strings expanded using \v[]
 * and similar constructs (for the “Name” column only).
 * 
 * This feature uses the “original” column in the xlsx file as the key.
 * 
 * Example (original column = “Alex”, ja column = “アレックス”):
 *   Name field “Alex” → “アレックス” in Japanese
 * 
 * ◆Script
 * 
 * If you want to reference it from a script,
 * you can use the following function.
 * Note1: Please note that you must pass the ID as a string.
 * Note2: The rules for sheet names, etc., are the same as for \lan[id].
 * 
 * $lan(id)
 * Example: $lan("town01.001")
 * 
 * -------------------------------------------------------------------
 * [Language projects]
 * -------------------------------------------------------------------
 * By creating a separate project for each language,
 * you can reference the corresponding text when switching languages.
 * This applies to database and plugin parameters.
 * Note: Map data and assets are not referenced.
 * 
 * Please create a separate project for the language.
 * The database applies to text fields (including the “Note” field).
 * Plugin parameters apply to all fields.
 * Only fields with data will be overwritten;
 * all others will be ignored.
 * It is safer to delete any unnecessary plugins or plugin parameters.
 * Please be careful not to accidentally
 * overwrite the note field in the database.
 * 
 * ※For example, it is possible to adjust
 *   layout-related parameters based on the language.
 * 
 * Please register the relevant “Language Code,”
 * “Locale,” “Folder Name,” and “Language Project Path”
 * in the “Language List” section of the plugin parameters.
 * 
 * When you run a test playthrough, the respective JSON files and
 * plugins.js (plugin parameters) will be copied automatically.
 * 
 * ◆Note Tag Merge
 * You can change the settings so that the note field
 * is overwritten for each tag.
 * For example, suppose the note field for
 * a certain enemy contained the following specification:
 * 
 * <Level:1>
 * <desc:A large rat that gnaws on just about anything.>
 * 
 * Of these, only <desc:~> needs to be multilingual.
 * If you enable merging of enemy note tags,
 * you’ll only need to include <desc:~> in the language project.
 * 
 * ◆Terminology Plugins
 * To replace text in the name field,
 * you can use a terminology plugin.
 * You can use the official plugin “TextScriptBase.js,” for example.
 * 
 * -------------------------------------------------------------------
 * [Auto Image Switching]
 * -------------------------------------------------------------------
 * Images are automatically switched based
 * on the current language code.
 * You can specify the images to be used
 * in the “Image List” and “Pattern List.”
 * 
 * For example, if you specify “img\pictures\Test.png”
 * the system will automatically display
 * “img\pictures\ja\Test.png” if the language is Japanese.
 * 
 * This also applies when using subfolders.
 * “img\pictures\Help\Test.png” will be replaced with
 * “img\pictures\ja\Help\Test.png”.
 * 
 * The “Pattern List” is a handy feature
 * for specifying multiple files.
 * 
 * ◆This applies to files in the “pictures\Help” directory
 * pictures\Help\*
 * 
 * ◆Includes subfolders even further down the hierarchy
 * pictures\Help\**
 * 
 * If the target image does not exist,
 * the original image will be used.
 * Please note that in this case,
 * there will be a slight delay in the image display.
 * (To verify the file's existence)
 * 
 * -------------------------------------------------------------------
 * [Other Details]
 * -------------------------------------------------------------------
 * ◆Language Code Storage Location
 * The current language code is loaded
 * from the following locations when the game starts.
 * ・Local environment: save/nrp_language.ini
 * ・Browser environment: the “nrp_language” key in localStorage
 * This is managed independently of config.rmmzsave.
 * 
 * ◆Behavior When Switching Languages
 * If you switch the language in the Options menu
 * on the title screen and then close the Options menu,
 * the game will restart after saving the language code.
 * The language settings are grayed out
 * and cannot be changed anywhere other than the title screen.
 * 
 * ◆Language Variable
 * Language variable is automatically reset
 * when you start a new game or load a saved game.
 * 
 * -------------------------------------------------------------------
 * [SheetJS setup]
 * -------------------------------------------------------------------
 * 1. Download xlsx.full.min.js from:
 * https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js
 * 
 * 2. Place it at [Project]/js/libs/xlsx.full.min.js.
 *
 * -------------------------------------------------------------------
 * [Terms] (SheetJS)
 * -------------------------------------------------------------------
 * This plugin uses SheetJS Community Edition.
 * If you distribute or sell this as a game,
 * please include the following in the credits or
 * in the text included with the game.
 * 
 * SheetJS Community Edition -- https://sheetjs.com/
 * Copyright (C) 2012-present SheetJS LLC
 * Licensed under the Apache License, Version 2.0
 * https://www.apache.org/licenses/LICENSE-2.0
 * 
 * ◆Add
 * According to the official Apache License documentation,
 * it seems they recommend creating a license file rather than
 * including the text directly.
 * I've created one for SheetJS below; just place it somewhere
 * in your project where it can be referenced, and you're all set.
 * 
 * https://newrpg.up.seesaa.net/image/SheetJS-LICENSE.txt
 * 
 * -------------------------------------------------------------------
 * [Terms] (NRP_MultiLanguage.js)
 * -------------------------------------------------------------------
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 * 
 * @------------------------------------------------------------------
 * @ Plugin Parameters
 * @------------------------------------------------------------------
 * 
 * @param LanguageList
 * @text Language List
 * @type struct<Language>[]
 * @default ["{\"LangNo\":\"0\",\"LangName\":\"English\",\"LangCode\":\"en\",\"Locale\":\"en_US\",\"FolderName\":\"\",\"LangProjectPath\":\"\"}","{\"LangNo\":\"1\",\"LangName\":\"Japanese\",\"LangCode\":\"ja\",\"Locale\":\"ja_JP\",\"FolderName\":\"data_ja\",\"LangProjectPath\":\"\"}"]
 * @desc Configure the languages available to the player.
 *
 * @param LanguageVariable
 * @text Language Variable
 * @type variable
 * @default 0
 * @desc Stores the current language number. Set 0 to disable this feature.
 *
 * @param SheetVariable
 * @text Sheet Variable
 * @type variable
 * @default 0
 * @desc Stores the current xlsx sheet name used by \lan[ID].
 * Set a map note <LanguageSheet:SheetName> to change it automatically.
 *
 * @param DefaultSheetName
 * @parent SheetVariable
 * @text Default Sheet Name
 * @type string
 * @default
 * @desc Default sheet name. A blank value is valid. It takes priority over
 * automatic selection when there is only one xlsx sheet.
 *
 * @param DefaultLanguage
 * @text Default Language
 * @type select
 * @option Japanese @value ja
 * @option English @value en
 * @option Chinese (Simplified) @value zh-CN
 * @option Chinese (Traditional) @value zh-TW
 * @option Korean @value ko
 * @option French @value fr
 * @option German @value de
 * @option Spanish @value es
 * @option Italian @value it
 * @option Portuguese @value pt
 * @option Russian @value ru
 * @option Arabic @value ar
 * @option Turkish @value tr
 * @option Dutch @value nl
 * @option Polish @value pl
 * @option Swedish @value sv
 * @option Norwegian @value no
 * @option Danish @value da
 * @option Finnish @value fi
 * @option Czech @value cs
 * @option Hungarian @value hu
 * @default en
 * @desc Used when the OS language does not match an entry in Language List.
 * Also used on the first launch.
 *
 * @param OriginalLanguage
 * @text Original Language
 * @type select
 * @option Japanese @value ja
 * @option English @value en
 * @option Chinese (Simplified) @value zh-CN
 * @option Chinese (Traditional) @value zh-TW
 * @option Korean @value ko
 * @option French @value fr
 * @option German @value de
 * @option Spanish @value es
 * @option Italian @value it
 * @option Portuguese @value pt
 * @option Russian @value ru
 * @option Arabic @value ar
 * @option Turkish @value tr
 * @option Dutch @value nl
 * @option Polish @value pl
 * @option Swedish @value sv
 * @option Norwegian @value no
 * @option Danish @value da
 * @option Finnish @value fi
 * @option Czech @value cs
 * @option Hungarian @value hu
 * @default en
 * @desc The source language of this project. Images are not switched when it matches the current language.
 *
 * @param <Option>
 * @text <Options>
 *
 * @param OptionLabel
 * @parent <Option>
 * @text Language Option Label
 * @type string
 * @default Language
 * @desc Label for the language setting in the Options screen.
 *
 * @param InsertPosition
 * @parent <Option>
 * @text Insert Position
 * @type number
 * @default 0
 * @desc Position of the language command in the Options screen. 0 inserts it
 * at the beginning.
 *
 * @param <Database>
 * @text <Database>
 *
 * @param UseLanguageProject
 * @parent <Database>
 * @text Use Language Project
 * @type boolean
 * @default true
 * @desc ON: load translated database JSON files and plugins.js.
 * 
 * @param AutoCopy
 * @parent UseLanguageProject
 * @text Auto-Copy Language Data
 * @type boolean
 * @default true
 * @desc During test play, copy files from each language project automatically.
 * This has no effect when Use Language Project is OFF.
 *
 * @param DelString
 * @parent UseLanguageProject
 * @type string
 * @default [DEL]
 * @desc String to set when the language project wants to override a plugin parameter by leaving it blank.
 * 
 * @param <NoteTagMerge>
 * @parent <UseLanguageProject>
 * @text <Note Tag Merge>
 * 
 * @param MergeActorNotes
 * @parent <NoteTagMerge>
 * @text Actor
 * @type boolean
 * @default false
 * @desc ON: Apply changes to the source data for each tag in the note.
 * OFF: overwrite the entire note when it is supplied.
 * 
 * @param MergeClassNotes
 * @parent <NoteTagMerge>
 * @text Class
 * @type boolean
 * @default false
 * @desc ON: Apply changes to the source data for each tag in the note.
 * OFF: overwrite the entire note when it is supplied.
 * 
 * @param MergeSkillNotes
 * @parent <NoteTagMerge>
 * @text Skill
 * @type boolean
 * @default false
 * @desc ON: Apply changes to the source data for each tag in the note.
 * OFF: overwrite the entire note when it is supplied.
 * 
 * @param MergeItemNotes
 * @parent <NoteTagMerge>
 * @text Item
 * @type boolean
 * @default false
 * @desc ON: Apply changes to the source data for each tag in the note.
 * OFF: overwrite the entire note when it is supplied.
 * 
 * @param MergeWeaponNotes
 * @parent <NoteTagMerge>
 * @text Weapon
 * @type boolean
 * @default false
 * @desc ON: Apply changes to the source data for each tag in the note.
 * OFF: overwrite the entire note when it is supplied.
 * 
 * @param MergeArmorNotes
 * @parent <NoteTagMerge>
 * @text Armor
 * @type boolean
 * @default false
 * @desc ON: Apply changes to the source data for each tag in the note.
 * OFF: overwrite the entire note when it is supplied.
 * 
 * @param MergeEnemyNotes
 * @parent <NoteTagMerge>
 * @text Enemy
 * @type boolean
 * @default false
 * @desc ON: Apply changes to the source data for each tag in the note.
 * OFF: overwrite the entire note when it is supplied.
 * 
 * @param MergeStateNotes
 * @parent <NoteTagMerge>
 * @text State
 * @type boolean
 * @default false
 * @desc ON: Apply changes to the source data for each tag in the note.
 * OFF: overwrite the entire note when it is supplied.
 * 
 * @param <NameReplace>
 * @text <Automatic Name Replacement>
 *
 * @param NameAutoReplaceFile
 * @parent <NameReplace>
 * @text Auto-Replacement File
 * @type string
 * @desc Name of the xlsx file for automatic name replacement. Place it under
 * data/localize/ (for example, name.xlsx). Leave blank to disable it.
 *
 * @param ReplaceNameBox
 * @parent <NameReplace>
 * @text Replace Speaker Names
 * @type boolean
 * @default true
 * @desc Replace speaker-name text automatically when ON.
 *
 * @param ReplaceChoices
 * @parent <NameReplace>
 * @text Replace Choices
 * @type boolean
 * @default true
 * @desc Replace choice text automatically when ON.
 * 
 * @param <AutoChangeImages>
 * @text <Auto Image Switching>
 *
 * @param AutoChangeImageList
 * @parent <AutoChangeImages>
 * @text Image List
 * @type file[] @dir img
 * @desc Images to switch automatically when a language-specific version exists.
 *
 * @param AutoChangePatternList
 * @parent <AutoChangeImages>
 * @text Pattern List
 * @type string
 * @desc Comma- or line-separated patterns under img/. Use * for one folder
 * level and ** to include subfolders (for example, pictures/Help/*).
 */

/*~struct~Language:
 * @param LangNo
 * @text Language Number
 * @type number
 * @default 0
 * @desc Unique number for this language. Stored in Language Variable when set.
 *
 * @param LangName
 * @text Language Name
 * @type string
 * @desc Name displayed in the Options screen (for example, English).
 *
 * @param LangCode
 * @text Language Code
 * @type select
 * @option Japanese @value ja
 * @option English @value en
 * @option Chinese (Simplified) @value zh-CN
 * @option Chinese (Traditional) @value zh-TW
 * @option Korean @value ko
 * @option French @value fr
 * @option German @value de
 * @option Spanish @value es
 * @option Italian @value it
 * @option Portuguese @value pt
 * @option Russian @value ru
 * @option Arabic @value ar
 * @option Turkish @value tr
 * @option Dutch @value nl
 * @option Polish @value pl
 * @option Swedish @value sv
 * @option Norwegian @value no
 * @option Danish @value da
 * @option Finnish @value fi
 * @option Czech @value cs
 * @option Hungarian @value hu
 * @default en
 * @desc Language code used to select a matching column in xlsx files and a language project.
 *
 * @param Locale
 * @text Locale
 * @type string
 * @desc Value assigned to $dataSystem.locale when using a language project.
 * For example: ja_JP, en_US.
 *
 * @param FolderName
 * @text Folder Name
 * @type string
 * @default data_en
 * @desc Folder under data/ containing this language's files. For example,
 * data_en refers to [Project]/data/data_en/.
 *
 * @param LangProjectPath
 * @text Language Project Path
 * @type string
 * @desc Path to the source language project. During test play, files from this
 * folder can be copied automatically. Leave blank to disable copying.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.031 多言語対応
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/521162546.html
 *
 * @help RPGツクールMZ用の多言語対応プラグインです。
 * 
 * ◆主な機能
 * ・Excel（xlsx）ファイルを参照し、各言語の文章に変換。
 * ・各言語のデータベースやプラグインパラメータを読み込んで切替。
 * ・登録した画像を設定言語で自動切替。
 * ・オプション画面に言語選択項目を追加。
 * ・MZ用テキスト編集エディタに連携して表示。
 * 
 * なお、Microsoft Excelである必要はありません。
 * xlsx形式で保存できるなら、Libre Officeなど無料ソフトで十分です。
 * 
 * ※このプラグインはなるべく上に配置してください。
 * 　順序がこれより下のプラグインのみが翻訳対象となります。
 * 
 * -------------------------------------------------------------------
 * ■xlsxファイルの配置
 * -------------------------------------------------------------------
 * [プロジェクト]/data/localize/ 以下にxlsxファイルを配置してください。
 * 
 * フォーマットはサンプルを見れば、大体分かると思います。
 * 以下詳細です。
 * 
 * ◆xlsx のフォーマット
 * ・1行目はヘッダ行となります。
 * ・ID列が文章中から参照するためのキーとなります。
 * ・言語コード（ja / en 等）の列が各言語のテキスト列になります。
 * ・2行目以降：ID列にID（例：001）、各言語列に対応テキストを記入。
 * ・列の順序は自由です。話者などの参照情報を列として追加しても構いません。
 * 
 * ◆シート名の指定
 * 当プラグインは複数のxlsxファイル、複数のシートに対応しています。
 * ただし、キーとするのはシート名だけです。
 * 複数ファイルに同一のシート名を使用しても無効となります。
 * ※シート名は大文字小文字を区別しません。
 * 
 * ・複数シートを使用する場合、先頭に『.』で区切って使用してください。
 * 　（例：シート名が『town001』、IDが『001』ならば、『town01.001』など）
 * ・また、現在のシート名を設定することで省略できるようになります。
 * 　現在のシート名の設定方法は以下２つの方法があります。
 * 　・マップのメモ欄に次のように設定：<LanguageSheet:sheetName>
 * 　・プラグインパラメータの『シート名変数』にスクリプトで文字列を設定する。
 * ・なお、全体でシートを一つしか使用しない場合は省略できます。
 * 
 * -------------------------------------------------------------------
 * ■翻訳の概要
 * -------------------------------------------------------------------
 * 当プラグインの多言語対応には様々な方法を用意しています。
 * 最適な方法をご利用ください。
 * 
 * ・本文：\lanm
 * ・名前欄：\lanc、または別プロジェクト参照（TextScriptBase.js）
 * ・選択肢：\lanc
 * ・データベース：別プロジェクト参照
 * ・プラグインパラメータ：別プロジェクト参照
 * 
 * というように使い分けるのがオススメです。
 * 以下で詳細を説明します。
 * 
 * -------------------------------------------------------------------
 * ■xlsxによる置換方法
 * -------------------------------------------------------------------
 * ◆文字列置換（\lan[id]）
 * 
 * 最も単純な方法です。
 * xlsxに指定された該当言語へと置き換えます。
 * 本文、名前欄、ＤＢ項目、プラグインパラメータなどに使えます。
 * 
 * ただし、エディタ内の入力文を、制御文字だけにする必要があります。
 * エディタで見た場合もコードしか分からなくなることに注意してください。
 * 
 * ◆名前欄で指定して本文置換（\lanm[id]）
 * 
 * 名前欄に記入すると本文をxlsxに指定された該当言語へと置き換えます。
 * 該当言語がない場合は元の文章をそのまま使います。
 * 
 * 既に日本語作品として完成したプロジェクトを、
 * なるべく変更せずに多言語対応したいような場合に有用です。
 * 
 * ◆文字列前方置換（\lanc[id]）
 * 
 * その入力欄の前方の文字列をxlsxに指定された該当言語へと置き換えます。
 * 本文、名前欄、ＤＢ項目、プラグインパラメータなどに使えます。
 * 該当言語がない場合は元の文章をそのまま使います。
 * 
 * こちらも既に日本語作品として完成したプロジェクトを、
 * なるべく変更せずに多言語対応したいような場合に有用です。
 * 名前欄や選択肢の置換にも使えます。
 * 
 * ◆自動置換
 * 
 * 「自動置換ファイル」にxlsxファイルを指定すると、
 * 名前欄、選択肢が一致するテキストを自動的に置換します。
 * \v[]などで展開された後の文字列にも対応します（名前欄のみ）。
 * 
 * こちらはxlsxの『original』列をキーとします。
 * 
 * 例（original列 = "アレックス"、en列 = "Alex"）：
 *   名前欄「アレックス」→ 英語時「Alex」
 * 
 * ◆スクリプト
 * 
 * スクリプトから参照したい場合は、以下の関数を使用できます。
 * ※文字列としてIDを渡す必要があることに注意してください。
 * ※シート名などのルールは他と同じです。
 * 
 * $lan(id)
 * 例：$lan("town01.001")
 * 
 * -------------------------------------------------------------------
 * ■別プロジェクトの参照
 * -------------------------------------------------------------------
 * 別言語用のプロジェクトを用意することで、
 * 言語切替時にそちらの文言を参照できるようにします。
 * 対象はデータベースとプラグインパラメータです。
 * ※マップデータや素材は参照しません。
 * 
 * 別のプロジェクトとして、言語用プロジェクトを作成してください。
 * データベースは文章項目（メモ欄を含む）のみ、
 * プラグインパラメータは全ての項目が対象です。
 * 入力がある項目のみ上書きし、それ以外は無視します。
 * 不要なプラグインや不要なプラグインパラメータは削除したほうが安全です。
 * データベースのメモ欄も、間違えて上書きしないように注意してください。
 * 
 * ※言語によって、レイアウト系のパラメータを調整するといったことも可能です。
 * 
 * プラグインパラメータの『言語リスト』に対象の『言語コード』や
 * 『ロケール』『フォルダ名』『言語プロジェクトのパス』を登録してください。
 * 
 * テストプレイ実行時に自動的に各JSONおよび、
 * plugins.js（プラグインパラメータ）がコピーされます。
 * 
 * ◆メモタグのマージ
 * メモ欄については、タグ毎に上書きするように設定を変更できます。
 * 例えば、とある敵キャラのメモ欄に以下のような指定がされていたとします。
 * 
 * <Level:1>
 * <desc:何でもかじる大型のネズミ。>
 * 
 * この内、多言語対応する必要があるのは<desc:～>だけです。
 * 敵キャラのメモタグのマージをオンにすれば、
 * 言語プロジェクト側には、<desc:～>だけを記載すればよくなります。
 * 
 * ◆用語プラグイン
 * 名前欄の置き換えに関しては、用語系プラグインを使う方法があります。
 * 公式プラグインの『TextScriptBase.js』などが使えます。
 * 
 * -------------------------------------------------------------------
 * ■画像の自動切替
 * -------------------------------------------------------------------
 * 現在の言語コードによって、画像を自動で切り替えられるようにできます。
 * 対象とする画像は『画像リスト』および『パターンリスト』で指定できます。
 * 
 * 例えば、"img\pictures\Test.png"を指定した場合、
 * 言語が英語なら"img\pictures\en\Test.png"が自動で表示されます。
 * 
 * サブフォルダを使用した場合も有効です。
 * "img\pictures\Help\Test.png" は 
 * "img\pictures\en\Help\Test.png" として切り替えられます。
 * 
 * 複数のファイルの指定には『パターンリスト』が便利です。
 * 
 * ◆"pictures\Help"以下のファイルが対象
 * pictures\Help\*
 * 
 * ◆さらに下のサブフォルダまで対象
 * pictures\Help\**
 * 
 * 対象の画像が存在しない場合は、元の画像を使用します。
 * その際は画像の表示がわずかに遅延するため注意です。
 * （ファイルの存在確認を行うため）
 * 
 * -------------------------------------------------------------------
 * ■その他詳細
 * -------------------------------------------------------------------
 * ◆言語コードの保存先
 * 現在の言語コードはゲーム起動時に以下の場所から読み込みます。
 * ・ローカル環境：save/nrp_language.ini
 * ・ブラウザ環境：localStorage の "nrp_language" キー
 * config.rmmzsave とは独立して管理されます。
 * 
 * ◆言語切り替え時の動作
 * タイトル画面のオプションで言語を切り替えてオプションを閉じると、
 * 言語コードを保存後にゲームを再起動します。
 * 言語設定項目はタイトル画面以外ではグレーアウトされ変更できません。
 * 
 * ◆言語変数
 * 言語変数はニューゲーム時・ロード時に自動で再設定されます。
 * 
 * -------------------------------------------------------------------
 * ■SheetJS のセットアップ（xlsx読込に必要）
 * -------------------------------------------------------------------
 * 1. 以下のURLにアクセスし、xlsx.full.min.js をダウンロードしてください。
 *    https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js
 * 
 * 2. ダウンロードしたファイルをプロジェクトの以下のフォルダに配置します。
 *    [Project]/js/libs/xlsx.full.min.js
 * 
 * -------------------------------------------------------------------
 * ■利用規約（SheetJS）
 * -------------------------------------------------------------------
 * 本プラグインは SheetJS Community Edition を使用しています。
 * ゲーム作品として配布・販売する場合は、
 * クレジットあるいは同梱テキストに以下を記載してください。
 * 
 * SheetJS Community Edition -- https://sheetjs.com/
 * Copyright (C) 2012-present SheetJS LLC
 * Licensed under the Apache License, Version 2.0
 * https://www.apache.org/licenses/LICENSE-2.0
 * 
 * ◆追記
 * Apache License公式によれば、
 * 記載するよりもライセンスファイルの作成を推奨しているようです。
 * 以下にSheetJS用のものを作成したので、
 * どこか作品内の参照できる場所に配置しておけばＯＫです。
 * 
 * https://newrpg.up.seesaa.net/image/SheetJS-LICENSE.txt
 * 
 * -------------------------------------------------------------------
 * ■利用規約（NRP_MultiLanguage.js）
 * -------------------------------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @------------------------------------------------------------------
 * @ プラグインパラメータ
 * @------------------------------------------------------------------
 * 
 * @param LanguageList
 * @text 言語リスト
 * @type struct<Language>[]
 * @default ["{\"LangNo\":\"0\",\"LangName\":\"Japanese\",\"LangCode\":\"ja\",\"Locale\":\"ja_JP\",\"FolderName\":\"\",\"LangProjectPath\":\"\"}","{\"LangNo\":\"1\",\"LangName\":\"English\",\"LangCode\":\"en\",\"Locale\":\"en_US\",\"FolderName\":\"data_en\",\"LangProjectPath\":\"\"}"]
 * @desc 使用する言語の一覧です。
 * 
 * @param LanguageVariable
 * @text 言語変数
 * @type variable
 * @default 0
 * @desc 現在の言語番号を格納する変数です。
 * 
 * @param SheetVariable
 * @text シート名変数
 * @type variable
 * @default 0
 * @desc 現在のシート名を格納する変数です。
 * \lan[001]のように省略記法を使う際に参照されます。
 * 
 * @param DefaultSheetName
 * @parent SheetVariable
 * @text デフォルトシート名
 * @type string
 * @default
 * @desc シート名の既定値です。空欄も有効です。
 * xlsxのシートが1つの場合の自動選択より優先されます。
 * 
 * @param DefaultLanguage
 * @text 初期設定の言語
 * @type select
 * @option 日本語 @value ja
 * @option 英語 @value en
 * @option 中国語（簡体字） @value zh-CN
 * @option 中国語（繁体字） @value zh-TW
 * @option 韓国語 @value ko
 * @option フランス語 @value fr
 * @option ドイツ語 @value de
 * @option スペイン語 @value es
 * @option イタリア語 @value it
 * @option ポルトガル語 @value pt
 * @option ロシア語 @value ru
 * @option アラビア語 @value ar
 * @option トルコ語 @value tr
 * @option オランダ語 @value nl
 * @option ポーランド語 @value pl
 * @option スウェーデン語 @value sv
 * @option ノルウェー語 @value no
 * @option デンマーク語 @value da
 * @option フィンランド語 @value fi
 * @option チェコ語 @value cs
 * @option ハンガリー語 @value hu
 * @default en
 * @desc OS の言語設定が言語リストに一致しない場合の初期言語です。
 * 初回起動時にのみ使用されます。
 * 
 * @param OriginalLanguage
 * @text オリジナル言語
 * @type select
 * @option 日本語 @value ja
 * @option 英語 @value en
 * @option 中国語（簡体字） @value zh-CN
 * @option 中国語（繁体字） @value zh-TW
 * @option 韓国語 @value ko
 * @option フランス語 @value fr
 * @option ドイツ語 @value de
 * @option スペイン語 @value es
 * @option イタリア語 @value it
 * @option ポルトガル語 @value pt
 * @option ロシア語 @value ru
 * @option アラビア語 @value ar
 * @option トルコ語 @value tr
 * @option オランダ語 @value nl
 * @option ポーランド語 @value pl
 * @option スウェーデン語 @value sv
 * @option ノルウェー語 @value no
 * @option デンマーク語 @value da
 * @option フィンランド語 @value fi
 * @option チェコ語 @value cs
 * @option ハンガリー語 @value hu
 * @default ja
 * @desc このプロジェクトのオリジナル言語です。現在の言語と一致する場合、画像の自動切替を行いません。
 * 
 * @param <Option>
 * @text ＜オプション＞
 * 
 * @param OptionLabel
 * @parent <Option>
 * @text 言語設定の項目名
 * @type string
 * @default 言語設定
 * @desc オプション画面に表示する言語設定の項目名です。
 * 
 * @param InsertPosition
 * @parent <Option>
 * @text 挿入位置
 * @type number
 * @default 0
 * @desc 言語設定を挿入するオプション項目の位置です。
 * 0を先頭として設定してください。
 * 
 * @param <Database>
 * @text ＜データベース＞
 * 
 * @param UseLanguageProject
 * @parent <Database>
 * @text 言語プロジェクトを使用
 * @type boolean
 * @default true
 * @desc ONにすると言語フォルダのJSONファイル, plugins.jsを参照します。
 * 
 * @param AutoCopy
 * @parent UseLanguageProject
 * @text 言語データを自動コピー
 * @type boolean
 * @default true
 * @desc テストプレイ起動時に言語プロジェクトから自動コピーします。「言語プロジェクトを使用」がOFFなら無効。
 * 
 * @param DelString
 * @parent UseLanguageProject
 * @text 削除用文字列
 * @type string
 * @default [DEL]
 * @desc 言語プロジェクト側でプラグインパラメータを空欄で上書きしたい場合に設定する文字列です。
 * 
 * @param <NoteTagMerge>
 * @parent UseLanguageProject
 * @text ＜メモタグのマージ＞
 *
 * @param MergeActorNotes
 * @parent <NoteTagMerge>
 * @text アクター
 * @type boolean
 * @default false
 * @desc ONの場合、メモ欄にあるタグ毎に元データへ反映します。
 * OFFの場合は、メモ欄全体を上書き。
 *
 * @param MergeClassNotes
 * @parent <NoteTagMerge>
 * @text 職業
 * @type boolean
 * @default false
 * @desc ONの場合、メモ欄にあるタグ毎に元データへ反映します。
 * OFFの場合は、メモ欄全体を上書き。
 *
 * @param MergeSkillNotes
 * @parent <NoteTagMerge>
 * @text スキル
 * @type boolean
 * @default false
 * @desc ONの場合、メモ欄にあるタグ毎に元データへ反映します。
 * OFFの場合は、メモ欄全体を上書き。
 *
 * @param MergeItemNotes
 * @parent <NoteTagMerge>
 * @text アイテム
 * @type boolean
 * @default false
 * @desc ONの場合、メモ欄にあるタグ毎に元データへ反映します。
 * OFFの場合は、メモ欄全体を上書き。
 *
 * @param MergeWeaponNotes
 * @parent <NoteTagMerge>
 * @text 武器
 * @type boolean
 * @default false
 * @desc ONの場合、メモ欄にあるタグ毎に元データへ反映します。
 * OFFの場合は、メモ欄全体を上書き。
 *
 * @param MergeArmorNotes
 * @parent <NoteTagMerge>
 * @text 防具
 * @type boolean
 * @default false
 * @desc ONの場合、メモ欄にあるタグ毎に元データへ反映します。
 * OFFの場合は、メモ欄全体を上書き。
 *
 * @param MergeEnemyNotes
 * @parent <NoteTagMerge>
 * @text 敵キャラ
 * @type boolean
 * @default false
 * @desc ONの場合、メモ欄にあるタグ毎に元データへ反映します。
 * OFFの場合は、メモ欄全体を上書き。
 *
 * @param MergeStateNotes
 * @parent <NoteTagMerge>
 * @text ステート
 * @type boolean
 * @default false
 * @desc ONの場合、メモ欄にあるタグ毎に元データへ反映します。
 * OFFの場合は、メモ欄全体を上書き。
 * 
 * @param <NameReplace>
 * @text ＜自動置換＞
 * 
 * @param NameAutoReplaceFile
 * @parent <NameReplace>
 * @text 自動置換ファイル
 * @type string
 * @desc 自動置換に使用するxlsxファイル名です。data/localize/ 以下に配置してください（例：name.xlsx）。
 * 
 * @param ReplaceNameBox
 * @parent <NameReplace>
 * @text 名前欄を置換
 * @type boolean
 * @default true
 * @desc ONにすると名前欄のテキストを自動置換します。
 * 
 * @param ReplaceChoices
 * @parent <NameReplace>
 * @text 選択肢を置換
 * @type boolean
 * @default true
 * @desc ONにすると選択肢のテキストを自動置換します。
 * 
 * @param <AutoChangeImages>
 * @text ＜画像の自動切替＞
 * 
 * @param AutoChangeImageList
 * @text 画像リスト
 * @parent <AutoChangeImages>
 * @type file[] @dir img
 * @desc 登録した画像について、自動切替の対象にします。
 * 
 * @param AutoChangePatternList
 * @text パターンリスト
 * @parent <AutoChangeImages>
 * @type string
 * @desc 登録した画像ファイルのパターンについて、自動切替の対象にします。img以下を指定してください。例: pictures\Test\*
 */

/*~struct~Language:ja
 * @param LangNo
 * @text 言語番号
 * @type number
 * @default 0
 * @desc この言語を選択したとき言語変数に格納される値です。
 * 
 * @param LangName
 * @text 言語名
 * @type string
 * @desc オプション画面に表示する言語の名前です。
 * （例：日本語、English）
 * 
 * @param LangCode
 * @text 言語コード
 * @type select
 * @option 日本語 @value ja
 * @option 英語 @value en
 * @option 中国語（簡体字） @value zh-CN
 * @option 中国語（繁体字） @value zh-TW
 * @option 韓国語 @value ko
 * @option フランス語 @value fr
 * @option ドイツ語 @value de
 * @option スペイン語 @value es
 * @option イタリア語 @value it
 * @option ポルトガル語 @value pt
 * @option ロシア語 @value ru
 * @option アラビア語 @value ar
 * @option トルコ語 @value tr
 * @option オランダ語 @value nl
 * @option ポーランド語 @value pl
 * @option スウェーデン語 @value sv
 * @option ノルウェー語 @value no
 * @option デンマーク語 @value da
 * @option フィンランド語 @value fi
 * @option チェコ語 @value cs
 * @option ハンガリー語 @value hu
 * @default en
 * @desc この言語に対応する言語コードです。
 * 現在の言語判定に使用します。
 * 
 * @param Locale
 * @text ロケール
 * @type string
 * @desc 言語プロジェクト使用時に$dataSystem.localeへ設定する値です。例：ja_JP、en_US
 * 
 * @param FolderName
 * @text フォルダ名
 * @type string
 * @default data_en
 * @desc この言語用のフォルダ名です（data/ 以下に作成）。
 * 例：data_en → [Project]/data/data_en/ に配置。
 * 
 * @param LangProjectPath
 * @text 言語プロジェクトのパス
 * @type string
 * @desc 言語用プロジェクトフォルダのパスです。テストプレイ時に、このフォルダからファイルを自動コピーします。
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

function parseImagePathList(value) {
    if (!value) return [];
    try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) return parsed;
        if (typeof parsed === "string") value = parsed;
    } catch (e) {
        // A pattern list can be entered as plain text.
    }
    return String(value).split(/[\r\n,]+/);
}

function normalizeImagePath(path) {
    let result = String(path || "").trim().replace(/\\/g, "/");
    try {
        result = decodeURIComponent(result);
    } catch (e) {
        // Keep the original path when it is not URI-encoded.
    }
    return result.replace(/^img\//i, "").replace(/^\/+/, "")
        .replace(/[?#].*$/, "").replace(/\.png$/i, "");
}

function imagePatternToRegExp(pattern) {
    const escaped = normalizeImagePath(pattern)
        .replace(/[.+^${}()|[\]\\]/g, "\\$&")
        .replace(/\*\*/g, "\u0000")
        .replace(/\*/g, "[^/]*")
        .replace(/\u0000/g, ".*");
    return escaped ? new RegExp("^" + escaped + "$", "i") : null;
}

const PLUGIN_NAME = "NRP_MultiLanguage";
const parameters = PluginManager.parameters(PLUGIN_NAME);
let pOptionLabel        = setDefault(parameters["OptionLabel"], "言語設定");
const pInsertPosition   = toNumber(parameters["InsertPosition"], 0);
const pLanguageList     = parseStruct2(parameters["LanguageList"]);
const pLanguageVariable = toNumber(parameters["LanguageVariable"], 0);
const pSheetVariable    = toNumber(parameters["SheetVariable"],    0);
const pDefaultSheetName = parameters["DefaultSheetName"] !== undefined
    ? parameters["DefaultSheetName"] : null; // nullは未設定、""は空欄指定
const pDefaultLanguage  = setDefault(parameters["DefaultLanguage"], "en");
const pOriginalLanguage = setDefault(parameters["OriginalLanguage"], "ja");
const pUseLanguageProject = toBoolean(parameters["UseLanguageProject"], true);
const pAutoCopy          = toBoolean(parameters["AutoCopy"],           true);
const pDelString         = setDefault(parameters["DelString"],          "[DEL]");
const pMergeActorNotes   = toBoolean(parameters["MergeActorNotes"],   false);
const pMergeClassNotes   = toBoolean(parameters["MergeClassNotes"],   false);
const pMergeSkillNotes   = toBoolean(parameters["MergeSkillNotes"],   false);
const pMergeItemNotes    = toBoolean(parameters["MergeItemNotes"],    false);
const pMergeWeaponNotes  = toBoolean(parameters["MergeWeaponNotes"],  false);
const pMergeArmorNotes   = toBoolean(parameters["MergeArmorNotes"],   false);
const pMergeEnemyNotes   = toBoolean(parameters["MergeEnemyNotes"],   false);
const pMergeStateNotes   = toBoolean(parameters["MergeStateNotes"],   false);
const pNameAutoReplaceFile = setDefault(parameters["NameAutoReplaceFile"], "");
const pReplaceNameBox      = toBoolean(parameters["ReplaceNameBox"], true);
const pReplaceChoices      = toBoolean(parameters["ReplaceChoices"], true);
const pAutoChangeImageList = new Set(
    parseImagePathList(parameters["AutoChangeImageList"])
        .map(normalizeImagePath).filter(Boolean)
);
const pAutoChangePatternList = parseImagePathList(parameters["AutoChangePatternList"])
    .map(imagePatternToRegExp).filter(Boolean);

// 【検証用】起動時の多言語処理にかかった時間をコンソールへ出力する。
// ※使用しない場合（通常）はfalseにしておく。
const UseLogStartupTime = true;
function _startupNow() {
    if (UseLogStartupTime) {
        return performance.now();
    }
    return 0;
}
function _logStartupTime(label, startTime) {
    // テストプレイ時専用
    if (UseLogStartupTime && Utils.isOptionValid("test")) {
        console.log(`NRP_MultiLanguage [Startup] ${label}: ${(performance.now() - startTime).toFixed(1)} ms`);
    }
}

// 言語設定のシンボル
const SYMBOL_LANGUAGE = "nrpLanguage";

// 言語コードの保存キー（localStorage用）
const LANG_STORAGE_KEY = "nrp_language";
// 言語コードの保存ファイル名（NW.js用）
const LANG_FILE_NAME = "nrp_language.ini";

//-----------------------------------------------------------------------------
// 言語コードのユーティリティ
//-----------------------------------------------------------------------------

/**
 * 【独自】言語リストから言語コードに一致するエントリを返す。
 * "ja" のような短いコードと "ja-JP" のような長いコードの両方に対応する。
 */
function findLangByCode(code) {
    if (!code) return null;
    const lower = code.toLowerCase();
    // 完全一致優先
    let found = pLanguageList.find(l => l.LangCode && l.LangCode.toLowerCase() === lower);
    if (found) return found;
    // 前方一致（例：OS が "ja-JP" でリストが "ja" の場合）
    found = pLanguageList.find(l => l.LangCode && lower.startsWith(l.LangCode.toLowerCase()));
    if (found) return found;
    // 逆方向の前方一致（リストが "zh-CN" で OS が "zh"）
    found = pLanguageList.find(l => l.LangCode && l.LangCode.toLowerCase().startsWith(lower));
    return found || null;
}

/**
 * 【独自】言語リストの何番目のインデックスか（オプション選択肢の添字）を返す。
 */
function langListIndex(langCode) {
    if (!langCode) return 0;
    const idx = pLanguageList.findIndex(
        l => l.LangCode && l.LangCode.toLowerCase() === langCode.toLowerCase()
    );
    return idx >= 0 ? idx : 0;
}

//-----------------------------------------------------------------------------
// 言語コードの保存・読み込み
// ConfigManager より先に実行されるため、独自ストレージを使用する。
// ・NW.js環境：save/nrp_language.ini（fs モジュールで同期読み書き）
// ・ブラウザ環境：localStorage
//-----------------------------------------------------------------------------

/**
 * 【独自】現在の言語コードを同期で読み込む。
 * ファイル/キーが存在しない場合（初回起動）は OS 言語から決定する。
 * @returns {string} 言語コード
 */
function _loadLangCode() {
    let code = null;
    if (Utils.isNwjs()) {
        // NW.js：save/nrp_language.ini を同期読み込み
        try {
            const fs   = require("fs");
            const path = require("path");
            const base = path.dirname(process.mainModule.filename);
            const filePath = path.join(base, "save", LANG_FILE_NAME);
            if (fs.existsSync(filePath)) {
                code = fs.readFileSync(filePath, { encoding: "utf8" }).trim();
            }
        } catch (e) {
            // 読み込み失敗時は初回扱い
        }
    } else {
        // ブラウザ：localStorage
        try {
            code = localStorage.getItem(LANG_STORAGE_KEY);
        } catch (e) {
            // プライベートモード等で localStorage が使えない場合
        }
    }

    if (code && findLangByCode(code)) {
        return findLangByCode(code).LangCode;
    }
    // 未設定（初回）→ OS 言語から決定
    return _detectOsLanguage();
}

/**
 * 【独自】現在の言語コードを保存する。
 * @param {string} code 言語コード
 */
function _saveLangCode(code) {
    if (Utils.isNwjs()) {
        try {
            const fs   = require("fs");
            const path = require("path");
            const base = path.dirname(process.mainModule.filename);
            const dirPath  = path.join(base, "save");
            const filePath = path.join(dirPath, LANG_FILE_NAME);
            if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath);
            }
            fs.writeFileSync(filePath, code, { encoding: "utf8" });
        } catch (e) {
            console.warn("NRP_MultiLanguage: Failed to save the language code.", e);
        }
    } else {
        try {
            localStorage.setItem(LANG_STORAGE_KEY, code);
        } catch (e) {
            console.warn("NRP_MultiLanguage: Failed to save the language code.", e);
        }
    }
}

/**
 * 【独自】OS の言語コードを取得し、言語リストと照合して言語コードを返す。
 * 一致しない場合は「初期設定の言語」パラメータの値を返す。
 */
function _detectOsLanguage() {
    let osCode = "";
    try {
        osCode = Intl.DateTimeFormat().resolvedOptions().locale || "";
    } catch (e) {
        // 取得失敗時は空文字のまま
    }
    const entry = findLangByCode(osCode);
    if (entry) return entry.LangCode;
    // OS言語が言語リストに一致しない → DefaultLanguage を使用
    // DefaultLanguage が言語リストにある場合はそのコード、なければそのまま返す
    const defEntry = findLangByCode(pDefaultLanguage);
    return defEntry ? defEntry.LangCode : pDefaultLanguage;
}

//-----------------------------------------------------------------------------
// NRP_MultiLanguage 本体（グローバルアクセス用）
//-----------------------------------------------------------------------------

// 現在の言語コード（IIFE実行時に確定する）
// ConfigManager より先に決定されるため、独自プロパティとして保持する。
let _currentLangCode = _loadLangCode();

/**
 * 【独自】外部から現在の言語情報にアクセスするためのグローバルオブジェクト。
 */
window.NRP_MultiLanguage = {
    /** 現在の言語コード（例："ja", "en"）を返す。 */
    currentCode: function() {
        return _currentLangCode;
    },
    /** 現在の言語エントリを返す。 */
    currentEntry: function() {
        return findLangByCode(_currentLangCode);
    },
    /** 現在の言語のフォルダパスを返す（例："data/data_en"）。 */
    currentFolder: function() {
        const entry = this.currentEntry();
        const name = entry ? setDefault(entry.FolderName, "") : "";
        return name ? "data/" + name : "";
    }
};

/**
 * スクリプトから \lan[] と同じ辞書テキストを取得する。
 * @param {string|number} id "sheet.id" または、シート名省略時のID
 * @returns {string} 対応テキスト。存在しない場合は空文字。
 */
window.$lan = function(id) {
    const key = id == null ? "" : String(id);
    const separatorIndex = key.indexOf(".");

    // \lan[sheet.id] と同じく、最初のドットだけをシート名の区切りにする。
    if (separatorIndex >= 0) {
        const sheet = key.slice(0, separatorIndex);
        const textId = key.slice(separatorIndex + 1);
// alert(sheetName + " / " + textId);
        return sheet && textId ? _getLocalizeText(sheet, textId) : "";
    }

    // \lan[id] と同じく、シート名変数が未設定なら空文字を返す。
    const sheet = _currentSheetName();
    return sheet && key ? _getLocalizeText(sheet, key) : "";
};

//-----------------------------------------------------------------------------
// プラグインパラメータの多言語対応（同期・起動時即時実行）
//
// ■タイミングの説明
// plugins.js の読み込み → 各プラグインのJSファイル読み込み → 各プラグインのIIFE実行
// という順で処理される。本プラグインのIIFE実行時点で
// PluginManager._parameters には本プラグインより前のプラグインのパラメータのみ格納済み。
// 本プラグインより後に配置されたプラグインはこの時点では未登録だが、
// loadScript() で <script> タグが挿入された直後に同期XHRで言語用 plugins.js を取得し、
// setParameters() で上書きすることで各プラグインのIIFE実行時に
// 言語パラメータが参照できる状態になる。
//-----------------------------------------------------------------------------

/**
 * 【独自】言語用 plugins.js を同期XHRで取得し、
 * PluginManager.setParameters() で上書きする。
 * IIFE 実行時に即時呼ばれる。
 */
(function _applyLangPluginsJs() {
    function localizedImageUrl(url) {
        if (!url || !url.startsWith("img/")) return null;
        if (url.includes("/localize/")) return null;

        const imagePath = normalizeImagePath(url);
        const isTarget = pAutoChangeImageList.has(imagePath)
            || pAutoChangePatternList.some(pattern => pattern.test(imagePath));
        if (!isTarget) return null;

        const languageCode = _currentLangCode;
        if (!languageCode) return null;
        if (languageCode.toLowerCase() === pOriginalLanguage.toLowerCase()) return null;

        const pathParts = url.split("/");
        if (pathParts.length < 3) return null;
        const category = pathParts[1];
        const relativePath = pathParts.slice(2).join("/");
        return "img/" + category + "/" + languageCode + "/" + relativePath;
    }

    const _Bitmap_load = Bitmap.load;
    Bitmap.load = function(url) {
        const localizedUrl = localizedImageUrl(url);
        if (!localizedUrl) return _Bitmap_load.call(this, url);

        const bitmap = _Bitmap_load.call(this, localizedUrl);
        bitmap._nrpFallbackImageUrl = url;
        return bitmap;
    };

    const _Bitmap_onError = Bitmap.prototype._onError;
    Bitmap.prototype._onError = function() {
        if (this._nrpFallbackImageUrl) {
            this._url = this._nrpFallbackImageUrl;
            this._nrpFallbackImageUrl = null;
            this._startLoading();
            return;
        }
        _Bitmap_onError.apply(this, arguments);
    };

    if (!pUseLanguageProject) return;
    // Keep copied language plugins.js current before reading its parameters.
    const copyStartTime = _startupNow();
    _copyLangFiles();
    _logStartupTime("Auto-copy language data", copyStartTime);
    const folder = NRP_MultiLanguage.currentFolder();
    if (!folder) return;

    let text = null;
    const pluginsLoadStartTime = _startupNow();
    try {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", folder + "/plugins.js", false); // 同期
        xhr.send();
        if (xhr.status >= 200 && xhr.status < 300) {
            text = xhr.responseText;
        }
    } catch (e) {
        console.warn("NRP_MultiLanguage: Failed to load `plugins.js` synchronously.", e);
        return;
    }
    if (!text) return;
    _logStartupTime("Load language plugins.js", pluginsLoadStartTime);

    let langPlugins = null;
    const pluginsMergeStartTime = _startupNow();
    try {
        const match = text.match(/var\s+\$plugins\s*=\s*(\[[\s\S]*\])\s*;/);
        if (!match) return;
        langPlugins = JSON.parse(match[1]);
    } catch (e) {
        console.warn("NRP_MultiLanguage: Failed to parse plugins.js.", e);
        return;
    }

    for (const langPlugin of langPlugins) {
        if (!langPlugin.status || !langPlugin.name || !langPlugin.parameters) continue;
        const name = langPlugin.name.toLowerCase();
        // デフォルト言語のパラメータを取得（既に登録済みの場合のみマージ）
        const defaultParams = PluginManager._parameters[name];
        if (!defaultParams) {
            // 未登録（本プラグインより後に読み込まれるプラグイン）は
            // 言語パラメータをそのまま登録しておき、
            // デフォルト値はそのプラグイン自身のIIFE内で上書きされるが、
            // PluginManager.parameters() フックでマージする。
            PluginManager._nrpLangParams = PluginManager._nrpLangParams || {};
            PluginManager._nrpLangParams[name] = langPlugin.parameters;
            continue;
        }
        // 登録済みプラグインはここでマージして即時上書き
        const merged = _mergeParams(defaultParams, langPlugin.parameters);
        PluginManager.setParameters(langPlugin.name, merged);

        // 自身のパラメータは既に初期化済みなので、翻訳対象の項目名だけを反映する。
        if (name === PLUGIN_NAME.toLowerCase()) {
            pOptionLabel = setDefault(merged["OptionLabel"], pOptionLabel);
        }
    }
    _logStartupTime("Parse and merge language plugin parameters", pluginsMergeStartTime);
})();

//-----------------------------------------------------------------------------
// SheetJS の動的ロード
//-----------------------------------------------------------------------------

// SheetJS（XLSX）のロード完了フラグ
let _xlsxLoaded = false;
// SheetJS のロード待ちコールバックキュー
const _xlsxLoadCallbacks = [];

/**
 * 【独自】SheetJS（js/libs/xlsx.full.min.js）を動的にロードする。
 * 既にロード済みの場合はすぐに onLoad を呼ぶ。
 * @param {Function} onLoad ロード完了時コールバック
 */
function _loadSheetJs(onLoad) {
    if (_xlsxLoaded || typeof XLSX !== "undefined") {
        _xlsxLoaded = true;
        onLoad();
        return;
    }
    _xlsxLoadCallbacks.push(onLoad);
    // 既にscriptタグを挿入済みなら重複挿入しない
    if (_xlsxLoadCallbacks.length > 1) return;

    const sheetJsLoadStartTime = _startupNow();
    const script = document.createElement("script");
    script.src = "js/libs/xlsx.full.min.js";
    script.onload = function() {
        _xlsxLoaded = true;
        _logStartupTime("Load SheetJS", sheetJsLoadStartTime);
        for (const cb of _xlsxLoadCallbacks) cb();
        _xlsxLoadCallbacks.length = 0;
    };
    script.onerror = function() {
        _logStartupTime("Load SheetJS (failed)", sheetJsLoadStartTime);
        console.warn("NRP_MultiLanguage: Failed to load xlsx.full.min.js.");
        console.warn("  Please place js/libs/xlsx.full.min.js in the appropriate location.");
        console.warn("  DL: https://cdn.sheetjs.com/xlsx-0.20.3/package/dist/xlsx.full.min.js");
        // 失敗してもゲームは続行（\lan[]が空文字になるだけ）
        for (const cb of _xlsxLoadCallbacks) cb();
        _xlsxLoadCallbacks.length = 0;
    };
    document.head.appendChild(script);
}

//-----------------------------------------------------------------------------
// ローカライズxlsxの読み込みと辞書管理
//-----------------------------------------------------------------------------

// ローカライズテキスト辞書
// Map< シート名(小文字) , Map< ID , テキスト > >
let _localizeDictionary = null;
// 辞書のロード完了フラグ
let _dictLoaded  = false;
let _dictLoading = false;

// ローカライズxlsxの配置フォルダ
const LOCALIZE_DIR = "data/localize/";

/**
 * 【独自】data/localize/ 以下の全xlsxを読み込み、辞書を構築する。
 * @param {Function} onComplete 完了コールバック
 */
function _loadLocalizeDictionary(onComplete) {
    if (_dictLoaded) { onComplete(); return; }
    if (_dictLoading) {
        const wait = setInterval(function() {
            if (_dictLoaded) { clearInterval(wait); onComplete(); }
        }, 16);
        return;
    }
    _dictLoading = true;
    _localizeDictionary = new Map();
    const dictionaryLoadStartTime = _startupNow();

    _loadSheetJs(function() {
        if (typeof XLSX === "undefined") {
            _dictLoaded  = true;
            _dictLoading = false;
            _logStartupTime("Load localization dictionary (SheetJS unavailable)", dictionaryLoadStartTime);
            onComplete();
            return;
        }
        if (Utils.isNwjs()) {
            _loadLocalizeNwjs(function() {
                _logStartupTime("Load localization dictionary", dictionaryLoadStartTime);
                onComplete();
            });
        } else {
            // ブラウザ環境は未対応（空辞書で続行）
            _dictLoaded  = true;
            _dictLoading = false;
            _logStartupTime("Load localization dictionary (browser)", dictionaryLoadStartTime);
            onComplete();
        }
    });
}

/**
 * 【独自】NW.js 環境で data/localize/ 内の xlsx を読み込む。
 */
function _loadLocalizeNwjs(onComplete) {
    try {
        const fs   = require("fs");
        const path = require("path");
        const base = path.dirname(process.mainModule.filename);
        const dir  = path.join(base, LOCALIZE_DIR);

        if (!fs.existsSync(dir)) {
            _dictLoaded  = true;
            _dictLoading = false;
            onComplete();
            return;
        }

        const files = fs.readdirSync(dir).filter(f => f.endsWith(".xlsx"));
        for (const file of files) {
            const fileLoadStartTime = _startupNow();
            try {
                const buf      = fs.readFileSync(path.join(dir, file));
                const workbook = XLSX.read(buf, { type: "buffer" });
                _parseWorkbook(workbook);
            } catch (e) {
                console.warn(`NRP_MultiLanguage: Failed to read ${file}.`, e);
            }
            _logStartupTime(`Load xlsx: ${file}`, fileLoadStartTime);
        }
    } catch (e) {
        console.warn("NRP_MultiLanguage: Failed to load data/localize/.", e);
    }
    _dictLoaded  = true;
    _dictLoading = false;
    onComplete();
}

/**
 * 【独自】実データセルの最終位置までにシート範囲を縮める。
 * 表計算ソフトの不要な書式により !ref が最終行まで伸びている場合でも、
 * 空行を大量に走査しないようにする。
 */
function _effectiveSheetRange(sheet) {
    if (!sheet || !sheet["!ref"]) return null;

    const declaredRange = XLSX.utils.decode_range(sheet["!ref"]);
    let lastRow = -1;
    let lastColumn = -1;

    for (const address of Object.keys(sheet)) {
        if (address.startsWith("!")) continue;
        const cell = sheet[address];
        // 値も数式もない書式用セルは、実データ範囲に含めない。
        if (!cell || (cell.v === undefined && cell.f === undefined)) continue;

        const position = XLSX.utils.decode_cell(address);
        lastRow = Math.max(lastRow, position.r);
        lastColumn = Math.max(lastColumn, position.c);
    }

    if (lastRow < declaredRange.s.r || lastColumn < declaredRange.s.c) return null;
    return {
        s: declaredRange.s,
        e: {
            r: Math.min(lastRow, declaredRange.e.r),
            c: Math.min(lastColumn, declaredRange.e.c),
        },
    };
}

/**
 * 【独自】ワークブックの全シートを走査して辞書に登録する。
 * ヘッダ行（1行目）：「ID」という文字列の列がID列、言語コードの列が各言語テキスト列。
 * データ行（2行目以降）：ID列=ID、各言語列=テキスト
 */
function _parseWorkbook(workbook) {
    for (const sheetName of workbook.SheetNames) {
        const sheet = workbook.Sheets[sheetName];
        const range = _effectiveSheetRange(sheet);
        if (!range) continue;
        const rows = XLSX.utils.sheet_to_json(sheet, {
            header: 1,
            defval: "",
            range: range,
        });
        if (rows.length < 2) continue;

        // ヘッダ行からID列と現在の言語コードの列インデックスを特定
        const header  = rows[0];
        const idCol   = header.findIndex(h => String(h).trim() === "ID");
        const langCol = header.indexOf(_currentLangCode);
        if (idCol < 0 || langCol < 0 || idCol === langCol) continue;

        const key = sheetName.toLowerCase();
        if (!_localizeDictionary.has(key)) {
            _localizeDictionary.set(key, new Map());
        }
        const sheetMap = _localizeDictionary.get(key);

        for (let r = 1; r < rows.length; r++) {
            const row  = rows[r];
            const id   = String(row[idCol] ?? "").trim();
            const text = String(row[langCol] ?? "").trim();
            if (id === "") continue;
            sheetMap.set(id, text);
        }
    }
}

/**
 * 【独自】辞書からテキストを取得する。
 * @param {string} sheetName シート名
 * @param {string} id        ID
 * @returns {string} テキスト（存在しない場合は空文字）
 */
function _getLocalizeText(sheetName, id) {
    if (!_localizeDictionary) return "";
    const sheetMap = _localizeDictionary.get(sheetName.toLowerCase());
    if (!sheetMap) return "";
    return sheetMap.get(id) ?? "";
}

//-----------------------------------------------------------------------------
// Scene_Boot：辞書ロードを isReady に組み込む
//-----------------------------------------------------------------------------

DataManager._nrpDictLoaded  = false;
DataManager._nrpDictLoading = false;

/**
 * 【独自】ローカライズ辞書のロードを開始する。
 * 言語データベースのロードと同時に開始し、両方の完了を待つ。
 */
function _startLocalizeDictionaryLoad() {
    if (!DataManager._nrpDictLoaded && !DataManager._nrpDictLoading) {
        DataManager._nrpDictLoading = true;
        DataManager._nrpLoadDict(function() {
            DataManager._nrpDictLoaded  = true;
            DataManager._nrpDictLoading = false;
        });
    }
}

//-----------------------------------------------------------------------------
// 名前欄自動置換
//-----------------------------------------------------------------------------

// 自動置換辞書
// Map< 日本語テキスト , 置換後テキスト >
let _nameReplaceDictionary = null;

/**
 * 【独自】自動置換ファイル（xlsx）を読み込んで辞書を構築する。
 * _loadLocalizeDictionary と同じタイミングで呼ばれる。
 * ID列の値（日本語テキスト）をキー、現在言語列の値を置換後テキストとする。
 * 複数シート対応（全シートを走査してひとつの辞書にまとめる）。
 */
function _loadNameReplaceDictionary() {
    _nameReplaceDictionary = new Map();
    if (!pNameAutoReplaceFile) return;
    if (typeof XLSX === "undefined") return;
    if (!Utils.isNwjs()) return;

    try {
        const fs   = require("fs");
        const path = require("path");
        const base = path.dirname(process.mainModule.filename);
        // @type file は拡張子なしで返ることがあるので .xlsx を補完
        let fileName = pNameAutoReplaceFile;
        if (!fileName.endsWith(".xlsx")) fileName += ".xlsx";
        const filePath = path.join(base, "data", "localize", path.basename(fileName));

        if (!fs.existsSync(filePath)) {
            console.warn(`NRP_MultiLanguage: Auto-Replacement File cannot be found: ${filePath}`);
            return;
        }

        const buf      = fs.readFileSync(filePath);
        const workbook = XLSX.read(buf, { type: "buffer" });

        for (const sheetName of workbook.SheetNames) {
            const sheet = workbook.Sheets[sheetName];
            const rows  = XLSX.utils.sheet_to_json(sheet, { header: 1, defval: "" });
            if (rows.length < 2) continue;

            const header      = rows[0];
            const idCol       = header.findIndex(h => String(h).trim() === "ID");
            const originalCol = header.findIndex(h => String(h).trim() === "original");
            const langCol     = header.indexOf(_currentLangCode);
            if (idCol < 0 || originalCol < 0 || langCol < 0) continue;

            for (let r = 1; r < rows.length; r++) {
                const row      = rows[r];
                const original = String(row[originalCol] ?? "").trim();
                const val      = String(row[langCol]     ?? "").trim();
                if (original === "" || val === "") continue;
                _nameReplaceDictionary.set(original, val);
            }
        }
    } catch (e) {
        console.warn("NRP_MultiLanguage: Failed to load the Auto-Replacement File.", e);
    }
}

/**
 * ●_loadLocalizeDictionary のラップ
 * 辞書ロード完了後に名前自動置換辞書もロードする。
 */
const _loadLocalizeDictionaryOrig = _loadLocalizeDictionary;

// SheetJSロード完了後に名前置換辞書のロードと自動シート選択を行う
const _loadLocalizeDictionaryWithName = function(onComplete) {
    _loadLocalizeDictionaryOrig(function() {
        const nameReplaceLoadStartTime = _startupNow();
        _loadNameReplaceDictionary();
        _logStartupTime("Load name replacement dictionary", nameReplaceLoadStartTime);
        // シートが1つだけの場合は自動選択
        _autoSelectSheet();
        onComplete();
    });
};

// Scene_Boot.isReady フックが参照する関数を差し替える
// ※既に const で定義済みの _loadLocalizeDictionary を上書きできないため
//   Scene_Boot.isReady 側で呼ぶ関数を変数経由に変更する
DataManager._nrpLoadDict = _loadLocalizeDictionaryWithName;

//-----------------------------------------------------------------------------
// シート名変数の管理
//-----------------------------------------------------------------------------

/**
 * 【独自】現在のシート名を返す。
 * シート名変数が設定されていればその値、なければ空文字。
 */
function _currentSheetName() {
    if (!pSheetVariable || pSheetVariable <= 0) return "";
    if (!$gameVariables) return "";
    return String($gameVariables.value(pSheetVariable) || "");
}

/**
 * 【独自】シート名変数にシート名を格納する。
 */
function _setSheetName(name) {
    if (!pSheetVariable || pSheetVariable <= 0) return;
    if (!$gameVariables) return;
    $gameVariables.setValue(pSheetVariable, name);
}

/**
 * 【独自】辞書のシートが1つだけの場合、自動的にシート名変数に格納する。
 * ただし pDefaultSheetName が設定されている場合はそちらを優先する。
 * ゲーム起動時（辞書ロード完了後）に呼ばれる。
 */
function _autoSelectSheet() {
    if (!pSheetVariable || pSheetVariable <= 0) return;

    // pDefaultSheetName が設定されている場合はそちらを使用
    if (pDefaultSheetName !== null) {
        DataManager._nrpAutoSheet = pDefaultSheetName;
        return;
    }

    // 未設定かつシートが1つだけの場合は自動選択
    if (!_localizeDictionary) return;
    if (_localizeDictionary.size === 1) {
        const sheetName = _localizeDictionary.keys().next().value;
        // $gameVariablesはまだ存在しない可能性があるため、
        // setupNewGame / loadGame のタイミングで改めて設定する
        DataManager._nrpAutoSheet = sheetName;
    }
}

/**
 * 【独自】マップのメモ欄から<LanguageSheet:シート名>を取得して変数に格納する。
 * メモ欄がない場合は _nrpAutoSheet（デフォルトシート名 or 自動選択）を使う。
 */
function _applySheetFromMap() {
    if (!pSheetVariable || pSheetVariable <= 0) return;
    if (!$dataMap || !$gameVariables) return;

    const meta = $dataMap.meta;
    if (meta && meta["LanguageSheet"] !== undefined) {
        // <LanguageSheet:シート名> または <LanguageSheet>（空欄）
        _setSheetName(String(meta["LanguageSheet"]).trim());
    } else if (DataManager._nrpAutoSheet !== undefined) {
        // <LanguageSheet>がない場合はデフォルト/自動選択シートを維持
        _setSheetName(DataManager._nrpAutoSheet);
    }
}

/**
 * ●場所移動完了時にマップのメモ欄を読んでシート名を更新する。
 */
const _Game_Player_performTransfer = Game_Player.prototype.performTransfer;
Game_Player.prototype.performTransfer = function() {
    _Game_Player_performTransfer.apply(this, arguments);
    _applySheetFromMap();
};

//-----------------------------------------------------------------------------
// 選択肢の自動置換
//-----------------------------------------------------------------------------

/**
 * ●Game_Interpreter.prototype.setupChoices のフック
 * 選択肢テキストを辞書で部分一致置換する（案C）。
 * \lanc[] による前方クリア置換も行う（案B）。
 * pReplaceChoices が false の場合はどちらもスキップ。
 */
const _Game_Interpreter_setupChoices = Game_Interpreter.prototype.setupChoices;
Game_Interpreter.prototype.setupChoices = function(params) {
    if (pReplaceChoices) {
        const LANC_FULL  = /\\lanc\[([^\.]+)\.([^\]]+)\]/i;
        const LANC_SHORT = /\\lanc\[([^\]\.]+)\]/i;
        const choices = params[0];

        for (let i = 0; i < choices.length; i++) {
            let text = choices[i];

            // --- 案B：\lanc[] による前方クリア置換 ---
            const matchFull  = text.match(LANC_FULL);
            const matchShort = !matchFull ? text.match(LANC_SHORT) : null;
            const matchLanc  = matchFull || matchShort;

            if (matchLanc) {
                const sheet = matchFull
                    ? matchFull[1]
                    : _currentSheetName();
                const id    = matchFull
                    ? matchFull[2]
                    : matchShort[1];

                if (sheet) {
                    const langText = _getLocalizeText(sheet, id);
                    if (langText !== "") {
                        // 前方クリア + 置換
                        const after = text.slice(matchLanc.index + matchLanc[0].length);
                        text = langText + after;
                    } else {
                        // データなし：\lanc[] のみ除去
                        text = text.replace(matchLanc[0], "");
                    }
                } else {
                    // シート名未設定：\lanc[] のみ除去
                    text = text.replace(matchLanc[0], "");
                }
            }

            // --- 案C：辞書による部分一致置換 ---
            if (_nameReplaceDictionary && _nameReplaceDictionary.size > 0) {
                for (const [key, val] of _nameReplaceDictionary) {
                    if (text.includes(key)) {
                        text = text.split(key).join(val);
                    }
                }
            }

            choices[i] = text;
        }
    }
    _Game_Interpreter_setupChoices.apply(this, arguments);
};

/**
 * ●Window_NameBox.prototype.refresh のフック
 * drawTextEx で \v[] 等が展開された後の文字列に対して自動置換をかける。
 * _name を直接書き換えず、描画用テキストとして展開→置換→描画する。
 */
/**
 * ●Window_NameBox.prototype.start のフック
 * updatePlacement()（→windowWidth()）より前に _nrpDrawName を確定させる。
 */
const _Window_NameBox_start = Window_NameBox.prototype.start;
Window_NameBox.prototype.start = function() {
    this._nrpDrawName = this._resolveDrawName();
    _Window_NameBox_start.call(this);
};

const _Window_NameBox_refresh = Window_NameBox.prototype.refresh;
Window_NameBox.prototype.refresh = function() {
    // 置換後テキストを確定して _nrpDrawName に保存
    // windowWidth() はこの値を参照して幅を再計算する
    this._nrpDrawName = this._resolveDrawName();

    if (this._nrpDrawName !== null) {
        const rect = this.baseTextRect();
        this.contents.clear();
        this.drawTextEx(this._nrpDrawName, rect.x, rect.y, rect.width);
    } else {
        _Window_NameBox_refresh.call(this);
    }
};

/**
 * 【独自】名前自動置換を適用した描画用テキストを返す。
 * 置換が発生した場合は置換後文字列、発生しない場合は null を返す。
 */
Window_NameBox.prototype._resolveDrawName = function() {
    if (!pReplaceNameBox) return null;
    if (!_nameReplaceDictionary || _nameReplaceDictionary.size === 0
            || !this._name) {
        return null;
    }

    // \v[] などを展開した描画用テキストを取得
    let drawName = this.convertEscapeCharacters(this._name);
    const original = drawName;

    // 辞書の全エントリで部分一致置換
    for (const [key, val] of _nameReplaceDictionary) {
        if (drawName.includes(key)) {
            drawName = drawName.split(key).join(val);
        }
    }

    return drawName !== original ? drawName : null;
};

//-----------------------------------------------------------------------------
// \lan[シート名.ID] エスケープ文字の処理
//-----------------------------------------------------------------------------

/**
 * ●convertEscapeCharacters のフック
 * \lan[シート名.ID] を辞書テキストに置換する。対応テキストがない場合は空文字。
 * シート名を省略した \lan[ID] も、シート名変数が設定されている場合に対応する。
 * \lanc[シート名.ID] は前方クリア付き置換。改行も含めてクリアする。
 */
const _Window_Base_convertEscapeCharacters =
    Window_Base.prototype.convertEscapeCharacters;
Window_Base.prototype.convertEscapeCharacters = function(text) {
    // MZ標準の convertEscapeCharacters は \\ → \x1b に変換した後に処理するため、
    // 本フックは元の \\ がある状態で呼ばれる。
    // \lanc[] / \lan[] はここで処理してから標準処理に渡す。

    // --- \lanc[] の処理（前方クリア付き置換）---
    // 完全記法：\lanc[シート名.ID]
    text = text.replace(/\\lanc\[([^\.]+)\.([^\]]+)\]/gi, function(match, sheet, id) {
        return "\x00LANC\x00" + sheet + "\x00" + id + "\x00";
    });
    // 省略記法：\lanc[ID]（ドットなし）
    text = text.replace(/\\lanc\[([^\]\.]+)\]/gi, function(match, id) {
        const sheet = _currentSheetName();
        if (!sheet) return "";
        return "\x00LANC\x00" + sheet + "\x00" + id + "\x00";
    });
    // マーカーを実際に処理：マーカーより前（改行含む）をクリアして置換
    // データなしの場合はマーカーのみ除去して前方テキストを保持
    if (text.includes("\x00LANC\x00")) {
        text = text.replace(/([\s\S]*?)\x00LANC\x00([^\x00]+)\x00([^\x00]+)\x00/gi,
            function(match, before, sheet, id) {
                const langText = _getLocalizeText(sheet, id);
                // データあり：前方クリア + 置換
                if (langText !== "") return langText;
                // データなし：前方テキストをそのまま残してマーカーのみ除去
                return before;
            }
        );
    }

    // --- \lan[] の処理（前方クリアなし）---
    // 完全記法：\lan[シート名.ID]
    text = text.replace(/\\lan\[([^\.]+)\.([^\]]+)\]/gi, function(match, sheet, id) {
        return _getLocalizeText(sheet, id);
    });
    // 省略記法：\lan[ID]（シート名変数が設定されている場合のみ）
    text = text.replace(/\\lan\[([^\]]+)\]/gi, function(match, id) {
        const sheet = _currentSheetName();
        if (!sheet) return "";
        return _getLocalizeText(sheet, id);
    });

    return _Window_Base_convertEscapeCharacters.call(this, text);
};

/**
 * drawText() 用に \lan[] / \lanc[] だけを解決する。
 * drawTextEx() と異なり通常のエスケープ文字を処理しないため、\V[] や \C[] は残す。
 */
function _resolveDrawTextLocalize(text) {
    if (typeof text !== "string" || !META_LAN_REGEXP.test(text)) return text;

    text = text.replace(/\\lanc\[([^\.]+)\.([^\]]+)\]/gi, function(match, sheet, id) {
        return "\x00LANC\x00" + sheet + "\x00" + id + "\x00";
    });
    text = text.replace(/\\lanc\[([^\]\.]+)\]/gi, function(match, id) {
        const sheet = _currentSheetName();
        return sheet ? "\x00LANC\x00" + sheet + "\x00" + id + "\x00" : "";
    });
    if (text.includes("\x00LANC\x00")) {
        text = text.replace(/([\s\S]*?)\x00LANC\x00([^\x00]+)\x00([^\x00]+)\x00/gi,
            function(match, before, sheet, id) {
                const localized = _getLocalizeText(sheet, id);
                return localized !== "" ? localized : before;
            }
        );
    }

    text = text.replace(/\\lan\[([^\.]+)\.([^\]]+)\]/gi, function(match, sheet, id) {
        return _getLocalizeText(sheet, id);
    });
    text = text.replace(/\\lan\[([^\]]+)\]/gi, function(match, id) {
        const sheet = _currentSheetName();
        return sheet ? _getLocalizeText(sheet, id) : "";
    });
    return text;
}

// drawText() は convertEscapeCharacters() を通らないため、ここで補完する。
const _Window_Base_drawText = Window_Base.prototype.drawText;
Window_Base.prototype.drawText = function(text, x, y, maxWidth, align) {
    text = _resolveDrawTextLocalize(text);
    return _Window_Base_drawText.call(this, text, x, y, maxWidth, align);
};

/**
 * ●PluginManager.parameters() のフック
 * 本プラグインより後に読み込まれたプラグイン用。
 * _nrpLangParams に登録された言語パラメータをマージして返す。
 */
const _PluginManager_parameters = PluginManager.parameters;
PluginManager.parameters = function(name) {
    const defaultParams = _PluginManager_parameters.apply(this, arguments);

    // 「言語プロジェクトを使用」がOFFの場合は、元の parameters を書き換えず
    // \lan[] を含む値だけを getter で遅延解決する。
    // 本プラグインより後に読み込まれるプラグインが対象となる。
    if (!pUseLanguageProject) {
        _defineLocalizedParamGetters(defaultParams);
        return defaultParams;
    }

    const langDict = PluginManager._nrpLangParams;
    if (!langDict) return defaultParams;
    const langParams = langDict[name.toLowerCase()];
    if (!langParams) return defaultParams;
    // マージ済みをキャッシュとして _parameters に書き戻す
    const merged = _mergeParams(defaultParams, langParams);
    this._parameters[name.toLowerCase()] = merged;
    return merged;
};

/**
 * プラグインパラメータの \lan[] / \lanc[] を遅延解決する getter を設定する。
 * 構造体・配列型パラメータは JSON を一度展開してから、内部の文字列も処理する。
 */
function _defineLocalizedParamGetters(params) {
    if (!params) return;
    for (const key of Object.keys(params)) {
        const raw = params[key];
        if (typeof raw !== "string" || !META_LAN_REGEXP.test(raw)) continue;

        Object.defineProperty(params, key, {
            get: function() {
                return _resolveParameterValue(raw);
            },
            configurable: true,
            enumerable: true,
        });
    }
}

function _resolveParameterValue(raw) {
    const trimmed = raw.trim();
    const isJson = (trimmed.startsWith("{") && trimmed.endsWith("}"))
        || (trimmed.startsWith("[") && trimmed.endsWith("]"));
    if (!isJson) return _resolveMetaValue(raw);

    try {
        return JSON.stringify(_resolveParameterJson(JSON.parse(raw)));
    } catch (e) {
        // JSONとして不正な文字列は通常の文字列パラメータとして扱う。
        return _resolveMetaValue(raw);
    }
}

function _resolveParameterJson(value) {
    if (typeof value === "string") return _resolveMetaValue(value);
    if (Array.isArray(value)) return value.map(_resolveParameterJson);
    if (value && typeof value === "object") {
        const result = {};
        for (const key of Object.keys(value)) {
            result[key] = _resolveParameterJson(value[key]);
        }
        return result;
    }
    return value;
}

/**
 * 【独自】デフォルトパラメータオブジェクトに言語パラメータをマージして返す。
 * 言語側の値が空文字の場合はデフォルト値を使う。
 * 削除用文字列の場合は、元の型に応じた空値で上書きする。
 * @param {Object} defaultParams デフォルト言語のパラメータ
 * @param {Object} langParams    言語フォルダのパラメータ
 * @returns {Object} マージ済みパラメータ
 */
function _mergeParams(defaultParams, langParams) {
    const merged = Object.assign({}, defaultParams);
    for (const key of Object.keys(langParams)) {
        merged[key] = _mergeParamValue(defaultParams[key], langParams[key]);
    }
    return merged;
}

/**
 * 【独自】言語側の値が削除用文字列かを判定する。
 * 前後の空白を無視せず、完全一致した場合だけ削除として扱う。
 */
function _isDeleteParamValue(value) {
    return typeof value === "string" && pDelString !== "" && value === pDelString;
}

/**
 * 【独自】削除時に使う空値を返す。
 * JSON形式の配列・構造体は、プラグイン側のJSON.parse()でエラーにならない値を維持する。
 */
function _deletedParamValue(defVal) {
    if (Array.isArray(defVal)) return [];
    if (defVal !== null && typeof defVal === "object") return {};
    if (typeof defVal !== "string") return "";

    const trimmed = defVal.trim();
    if (trimmed.startsWith("[") && trimmed.endsWith("]")) return "[]";
    if (trimmed.startsWith("{") && trimmed.endsWith("}")) return "{}";
    return "";
}

/**
 * 【独自】パラメータ値を再帰的にマージする。
 * lang 側が空文字・null・undefined の場合は default 値を返す。
 * 両方がJSON文字列（オブジェクト・配列）の場合は再帰的にマージする。
 */
function _mergeParamValue(defVal, langVal) {
    if (_isDeleteParamValue(langVal)) {
        return _deletedParamValue(defVal);
    }
    if (langVal === undefined || langVal === null || langVal === "") {
        return defVal;
    }
    if (typeof langVal === "string" && typeof defVal === "string") {
        const lTrim = langVal.trim();
        const dTrim = (defVal || "").trim();
        const lIsJson = (lTrim.startsWith("{") && lTrim.endsWith("}"))
                     || (lTrim.startsWith("[") && lTrim.endsWith("]"));
        const dIsJson = (dTrim.startsWith("{") && dTrim.endsWith("}"))
                     || (dTrim.startsWith("[") && dTrim.endsWith("]"));
        if (lIsJson && dIsJson) {
            try {
                return JSON.stringify(_mergeParamDeep(JSON.parse(dTrim), JSON.parse(lTrim)));
            } catch (e) {
                return langVal;
            }
        }
        return langVal;
    }
    return langVal;
}

/**
 * 【独自】パース済みオブジェクト・配列を再帰的にマージする。
 */
function _mergeParamDeep(def, lang) {
    if (_isDeleteParamValue(lang)) {
        return _deletedParamValue(def);
    }
    if (lang === undefined || lang === null || lang === "") {
        return def;
    }
    if (typeof def === "string" && typeof lang === "string") {
        const dTrim = def.trim();
        const lTrim = lang.trim();
        const dIsJson = (dTrim.startsWith("{") && dTrim.endsWith("}"))
                     || (dTrim.startsWith("[") && dTrim.endsWith("]"));
        const lIsJson = (lTrim.startsWith("{") && lTrim.endsWith("}"))
                     || (lTrim.startsWith("[") && lTrim.endsWith("]"));
        if (dIsJson && lIsJson) {
            try {
                return JSON.stringify(_mergeParamDeep(JSON.parse(dTrim), JSON.parse(lTrim)));
            } catch (e) {
                // Invalid JSON is handled as a normal string.
            }
        }
    }
    if (Array.isArray(def) && Array.isArray(lang)) {
        const result = def.map((item, i) =>
            i < lang.length ? _mergeParamDeep(item, lang[i]) : item
        );
        for (let i = def.length; i < lang.length; i++) result.push(lang[i]);
        return result;
    }
    if (def !== null && lang !== null
        && typeof def === "object" && typeof lang === "object"
        && !Array.isArray(def) && !Array.isArray(lang)) {
        const result = Object.assign({}, def);
        for (const key of Object.keys(lang)) {
            const value = _mergeParamDeep(def[key], lang[key]);
            if (key in def || value !== undefined) {
                result[key] = value;
            }
        }
        return result;
    }
    return lang;
}

//-----------------------------------------------------------------------------
// 言語変数の反映
//-----------------------------------------------------------------------------

/**
 * 【独自】現在の言語コードに対応する言語番号を変数に格納する。
 */
function _applyLanguageVariable() {
    if (!pLanguageVariable || pLanguageVariable <= 0) return;
    if (!$gameVariables) return;
    const entry = findLangByCode(_currentLangCode);
    if (entry) {
        $gameVariables.setValue(pLanguageVariable, toNumber(entry.LangNo, 0));
    }
}

/**
 * ●ニューゲーム開始時
 */
const _DataManager_setupNewGame = DataManager.setupNewGame;
DataManager.setupNewGame = function() {
    _DataManager_setupNewGame.apply(this, arguments);
    _applyLanguageVariable();
    if (DataManager._nrpAutoSheet) _setSheetName(DataManager._nrpAutoSheet);
};

/**
 * ●ロード完了時
 */
const _DataManager_loadGame = DataManager.loadGame;
DataManager.loadGame = function(savefileId) {
    const result = _DataManager_loadGame.apply(this, arguments);
    if (result && typeof result.then === "function") {
        return result.then(function(v) {
            _applyLanguageVariable();
            if (DataManager._nrpAutoSheet) _setSheetName(DataManager._nrpAutoSheet);
            return v;
        });
    }
    _applyLanguageVariable();
    if (DataManager._nrpAutoSheet) _setSheetName(DataManager._nrpAutoSheet);
    return result;
};

//-----------------------------------------------------------------------------
// データベースの多言語ロード
//-----------------------------------------------------------------------------

// 言語ロード完了フラグ（Scene_Boot.isReady で参照）
DataManager._nrpLangLoaded  = false;
DataManager._nrpLangLoading = false;
DataManager._nrpLanguageBootTimeLogged = false;

/**
 * 【独自】テストプレイ時に言語プロジェクトからファイルをコピーする。
 * ・NW.js環境かつテストプレイ時のみ実行する。
 * ・コピー元の更新日時がコピー先より新しい場合のみコピーする。
 * ・同期処理（_loadLangDatabase より前に完了させる必要があるため）。
 */
function _copyLangFiles() {
    // NW.js環境かつテストプレイ時のみ実行
    if (!Utils.isNwjs() || !Utils.isOptionValid("test")) return;
    // 言語プロジェクト使用がオフ、またはオートコピーがオフの場合はスキップ
    if (!pUseLanguageProject || !pAutoCopy) return;

    const fs   = require("fs");
    const path = require("path");
    const base = path.dirname(process.mainModule.filename);

    // コピー対象ファイル（コピー元の相対パス → コピー先ファイル名）
    const FILE_MAP = [
        { src: path.join("data", "Actors.json"),   dst: "Actors.json"   },
        { src: path.join("data", "Classes.json"),  dst: "Classes.json"  },
        { src: path.join("data", "Skills.json"),   dst: "Skills.json"   },
        { src: path.join("data", "Items.json"),    dst: "Items.json"    },
        { src: path.join("data", "Weapons.json"),  dst: "Weapons.json"  },
        { src: path.join("data", "Armors.json"),   dst: "Armors.json"   },
        { src: path.join("data", "Enemies.json"),  dst: "Enemies.json"  },
        { src: path.join("data", "States.json"),   dst: "States.json"   },
        { src: path.join("data", "System.json"),   dst: "System.json"   },
        { src: path.join("js",   "plugins.js"),    dst: "plugins.js"    },
    ];

    for (const entry of pLanguageList) {
        const projectPath = entry.LangProjectPath
            ? entry.LangProjectPath.trim() : "";
        const folderName  = entry.FolderName
            ? entry.FolderName.trim() : "";

        // 言語プロジェクトパスまたはフォルダ名が未設定の場合はスキップ
        if (!projectPath || !folderName) continue;

        // コピー先フォルダ（メインプロジェクトの data/[フォルダ名]）
        const destDir = path.join(base, "data", folderName);

        // コピー先フォルダが存在しない場合は作成
        if (!fs.existsSync(destDir)) {
            try {
                fs.mkdirSync(destDir, { recursive: true });
            } catch (e) {
                console.warn(`NRP_MultiLanguage: Failed to create the folder: ${destDir}`, e);
                continue;
            }
        }

        for (const file of FILE_MAP) {
            const srcPath = path.join(projectPath, file.src);
            const dstPath = path.join(destDir, file.dst);

            // コピー元が存在しない場合はスキップ
            if (!fs.existsSync(srcPath)) continue;

            try {
                const srcMtime = fs.statSync(srcPath).mtimeMs;
                const dstMtime = fs.existsSync(dstPath)
                    ? fs.statSync(dstPath).mtimeMs : 0;

                // コピー元の方が新しい場合のみコピー
                if (srcMtime > dstMtime) {
                    fs.copyFileSync(srcPath, dstPath);
                    console.log(`NRP_MultiLanguage: Copy ${file.dst} -> data/${folderName}/`);
                }
            } catch (e) {
                console.warn(`NRP_MultiLanguage: The copy failed: ${file.dst}`, e);
            }
        }
    }
}

/**
 * 【独自】言語フォルダからデータベースJSONを非同期で読み込み、
 * テキスト項目を上書きする。完了時に onComplete() を呼ぶ。
 */
function _loadLangDatabase(onComplete) {
    // 言語プロジェクト使用がオフの場合はスキップ
    if (!pUseLanguageProject) {
        onComplete();
        return;
    }
    const folder = NRP_MultiLanguage.currentFolder();
    if (!folder) {
        onComplete();
        return;
    }

    const files = [];
    files.push({ name: "Actors",   apply: _applyActors   });
    files.push({ name: "Classes",  apply: _applyClasses  });
    files.push({ name: "Skills",   apply: _applySkills   });
    files.push({ name: "Items",    apply: _applyItems    });
    files.push({ name: "Weapons",  apply: _applyWeapons  });
    files.push({ name: "Armors",   apply: _applyArmors   });
    files.push({ name: "Enemies",  apply: _applyEnemies  });
    files.push({ name: "States",   apply: _applyStates   });
    files.push({ name: "System",   apply: _applySystem   });

    if (files.length === 0) { onComplete(); return; }

    const databaseLoadStartTime = _startupNow();
    let remaining = files.length;
    function onFileComplete() {
        remaining--;
        if (remaining <= 0) {
            _logStartupTime("Load and merge language database", databaseLoadStartTime);
            onComplete();
        }
    }
    for (const file of files) {
        const fileLoadStartTime = _startupNow();
        fetch(folder + "/" + file.name + ".json")
            .then(r => r.ok ? r.json() : null)
            .then(json => {
                if (json) file.apply(json);
                _logStartupTime(`Load and merge ${file.name}.json`, fileLoadStartTime);
                onFileComplete();
            })
            .catch(() => {
                _logStartupTime(`Load ${file.name}.json (failed)`, fileLoadStartTime);
                onFileComplete();
            });
    }
}

//-----------------------------------------------------------------------------
// Scene_Boot：起動時の言語ロード
//
// ■タイミングの説明
// Scene_Boot.isReady() は以下の順で完了を待つ：
//   1. DataManager.isDatabaseLoaded()  → DB本体のロード完了
//   2. onDatabaseLoaded()              → ConfigManager.load() を起動（非同期）
//   3. isPlayerDataLoaded()            → ConfigManager.isLoaded() を待つ
//
// 標準の isReady() が true = ConfigManager.isLoaded() 完了済み。
// データベースのテキスト上書きはその後に行えばよいため、
// Scene_Boot.isReady() をフックして独自フラグで管理する。
//-----------------------------------------------------------------------------

// 言語用System.jsonをマージしてから、正しいフォントファイルを読み込む。
const _Scene_Boot_loadGameFonts = Scene_Boot.prototype.loadGameFonts;
Scene_Boot.prototype.loadGameFonts = function() {
    if (pUseLanguageProject) {
        this._nrpDeferredGameFonts = true;
        return;
    }
    _Scene_Boot_loadGameFonts.apply(this, arguments);
};

/**
 * ●Scene_Boot.isReady() のフック
 * 標準の isReady が true になった後に、辞書と言語DBのロードを同時に開始し、
 * 両方の完了まで待機する。
 */
const _Scene_Boot_isReady = Scene_Boot.prototype.isReady;
Scene_Boot.prototype.isReady = function() {
    if (!_Scene_Boot_isReady.apply(this, arguments)) {
        return false;
    }

    if (DataManager._nrpLanguageBootStartTime === undefined) {
        DataManager._nrpLanguageBootStartTime = _startupNow();
    }

    // xlsx辞書と各言語JSONの取得は相互に依存しないため、並列で開始する。
    _startLocalizeDictionaryLoad();

    if (!DataManager._nrpLangLoaded && !DataManager._nrpLangLoading) {
        DataManager._nrpLangLoading = true;
        _loadLangDatabase(() => {
            DataManager._nrpLangLoaded  = true;
            DataManager._nrpLangLoading = false;
            if (this._nrpDeferredGameFonts) {
                this._nrpDeferredGameFonts = false;
                _Scene_Boot_loadGameFonts.call(this);
            }
        });
    }

    const isReady = DataManager._nrpDictLoaded && DataManager._nrpLangLoaded;
    if (isReady && !DataManager._nrpLanguageBootTimeLogged) {
        DataManager._nrpLanguageBootTimeLogged = true;
        _logStartupTime("Total multi-language boot wait", DataManager._nrpLanguageBootStartTime);
    }
    return isReady;
};

//-----------------------------------------------------------------------------
// テキスト上書きユーティリティ
//-----------------------------------------------------------------------------

function _ow(src, dest, key) {
    if (src[key] !== undefined && src[key] !== null && src[key] !== "") {
        dest[key] = src[key];
    }
}

function _applyArrayData(langArray, jaArray, applyFn) {
    if (!Array.isArray(langArray)) return;
    for (const langItem of langArray) {
        if (!langItem) continue;
        const jaItem = jaArray[langItem.id];
        if (!jaItem) continue;
        applyFn(langItem, jaItem);
    }
}

function _mergeNote(langItem, jaItem, mergeTags) {
    if (langItem.note === undefined || langItem.note === null || langItem.note === "") return;

    if (mergeTags) {
        const tagRegexp = /<([^<>:]+)(:?)([^>]*)>/g;
        const langTags = new Map();
        let match;
        while ((match = tagRegexp.exec(langItem.note)) !== null) {
            langTags.set(match[1], match[0]);
        }
        if (langTags.size === 0) return;

        let mergedNote = jaItem.note || "";
        for (const [tagName, tag] of langTags) {
            const escapedName = tagName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            mergedNote = mergedNote.replace(
                new RegExp("<" + escapedName + "(?::[^>]*)?>|<" + escapedName + "\\s*/>", "g"), ""
            );
            if (mergedNote.length > 0 && !mergedNote.endsWith("\n")) mergedNote += "\n";
            mergedNote += tag;
        }
        jaItem.note = mergedNote;
    } else {
        jaItem.note = langItem.note;
    }
    DataManager.extractMetadata(jaItem);
}

//-----------------------------------------------------------------------------
// 各ファイルの上書き処理
//-----------------------------------------------------------------------------

function _applyActors(json) {
    _applyArrayData(json, $dataActors, (l, j) => {
        _ow(l, j, "name"); _ow(l, j, "nickname"); _ow(l, j, "profile"); _mergeNote(l, j, pMergeActorNotes);
    });
}
function _applyClasses(json) {
    _applyArrayData(json, $dataClasses, (l, j) => { _ow(l, j, "name"); _mergeNote(l, j, pMergeClassNotes); });
}
function _applySkills(json) {
    _applyArrayData(json, $dataSkills, (l, j) => {
        _ow(l, j, "name"); _ow(l, j, "description");
        _ow(l, j, "message1"); _ow(l, j, "message2"); _mergeNote(l, j, pMergeSkillNotes);
    });
}
function _applyItems(json) {
    _applyArrayData(json, $dataItems, (l, j) => {
        _ow(l, j, "name"); _ow(l, j, "description"); _mergeNote(l, j, pMergeItemNotes);
    });
}
function _applyWeapons(json) {
    _applyArrayData(json, $dataWeapons, (l, j) => {
        _ow(l, j, "name"); _ow(l, j, "description"); _mergeNote(l, j, pMergeWeaponNotes);
    });
}
function _applyArmors(json) {
    _applyArrayData(json, $dataArmors, (l, j) => {
        _ow(l, j, "name"); _ow(l, j, "description"); _mergeNote(l, j, pMergeArmorNotes);
    });
}
function _applyEnemies(json) {
    _applyArrayData(json, $dataEnemies, (l, j) => { _ow(l, j, "name"); _mergeNote(l, j, pMergeEnemyNotes); });
}
function _applyStates(json) {
    _applyArrayData(json, $dataStates, (l, j) => {
        _ow(l, j, "name");
        _ow(l, j, "message1"); _ow(l, j, "message2");
        _ow(l, j, "message3"); _ow(l, j, "message4"); _mergeNote(l, j, pMergeStateNotes);
    });
}
function _applySystem(json) {
    if (!json || !$dataSystem) return;
    _ow(json, $dataSystem, "gameTitle");
    _ow(json, $dataSystem, "currencyUnit");
    if (json.advanced && $dataSystem.advanced) {
        for (const key of [
            "mainFontFilename",
            "numberFontFilename",
            "fallbackFonts",
            "fontSize",
        ]) {
            _ow(json.advanced, $dataSystem.advanced, key);
        }
    }
    const language = findLangByCode(_currentLangCode);
    if (language && language.Locale) {
        $dataSystem.locale = language.Locale;
    }
    for (const key of ["elements", "skillTypes", "weaponTypes", "armorTypes", "equipTypes"]) {
        if (Array.isArray(json[key]) && Array.isArray($dataSystem[key])) {
            json[key].forEach((value, index) => {
                if (value !== undefined && value !== "") $dataSystem[key][index] = value;
            });
        }
    }
    if (json.terms && $dataSystem.terms) {
        const lt = json.terms, jt = $dataSystem.terms;
        if (Array.isArray(lt.basic))    lt.basic.forEach((v, i)    => { if (v !== undefined && v !== "") jt.basic[i]    = v; });
        if (Array.isArray(lt.params))   lt.params.forEach((v, i)   => { if (v !== undefined && v !== "") jt.params[i]   = v; });
        if (Array.isArray(lt.commands)) lt.commands.forEach((v, i) => { if (v !== undefined && v !== "") jt.commands[i] = v; });
        if (lt.messages && jt.messages) {
            for (const key of Object.keys(lt.messages)) {
                if (lt.messages[key] !== undefined && lt.messages[key] !== "") {
                    jt.messages[key] = lt.messages[key];
                }
            }
        }
    }
}

//-----------------------------------------------------------------------------
// Scene_Options：オプション画面の拡張
//-----------------------------------------------------------------------------

const _Scene_Options_maxCommands = Scene_Options.prototype.maxCommands;
Scene_Options.prototype.maxCommands = function() {
    return _Scene_Options_maxCommands.apply(this, arguments) + 1;
};

const _Scene_Options_start = Scene_Options.prototype.start;
Scene_Options.prototype.start = function() {
    _Scene_Options_start.apply(this, arguments);
    this._nrpLangOnOpen = _currentLangCode;
};

/**
 * ●オプション画面を閉じる
 * 言語が変更されていた場合、言語コード保存→再起動。
 */
const _Scene_Options_popScene = Scene_Options.prototype.popScene;
Scene_Options.prototype.popScene = function() {
    if (_currentLangCode !== this._nrpLangOnOpen) {
        _saveLangCode(_currentLangCode);
        SceneManager.reloadGame();
    } else {
        _Scene_Options_popScene.apply(this, arguments);
    }
};

//-----------------------------------------------------------------------------
// Window_Options
//-----------------------------------------------------------------------------

const _Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
Window_Options.prototype.makeCommandList = function() {
    _Window_Options_makeCommandList.apply(this, arguments);
    // タイトル画面からのオプション遷移かどうかを _stack で判定
    // Scene_Options は push() で呼ばれるため、呼び出し元が _stack の末尾に積まれている
    const callerClass = SceneManager._stack[SceneManager._stack.length - 1];
    const enabled = callerClass === Scene_Title;
    const pos = Math.min(pInsertPosition, this._list.length);
    this._list.splice(pos, 0, {
        name: pOptionLabel, symbol: SYMBOL_LANGUAGE, enabled: enabled, ext: null
    });
};

const _Window_Options_statusText = Window_Options.prototype.statusText;
Window_Options.prototype.statusText = function(index) {
    if (this.commandSymbol(index) === SYMBOL_LANGUAGE) {
        const entry = findLangByCode(_currentLangCode);
        return entry ? setDefault(entry.LangName, "") : "";
    }
    return _Window_Options_statusText.apply(this, arguments);
};

const _Window_Options_cursorRight = Window_Options.prototype.cursorRight;
Window_Options.prototype.cursorRight = function() {
    if (this.commandSymbol(this.index()) === SYMBOL_LANGUAGE) {
        if (this.isCommandEnabled(this.index())) this._nrpChangeLang(1);
        return;
    }
    _Window_Options_cursorRight.apply(this, arguments);
};

const _Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
Window_Options.prototype.cursorLeft = function() {
    if (this.commandSymbol(this.index()) === SYMBOL_LANGUAGE) {
        if (this.isCommandEnabled(this.index())) this._nrpChangeLang(-1);
        return;
    }
    _Window_Options_cursorLeft.apply(this, arguments);
};

const _Window_Options_processOk = Window_Options.prototype.processOk;
Window_Options.prototype.processOk = function() {
    if (this.commandSymbol(this.index()) === SYMBOL_LANGUAGE) {
        if (this.isCommandEnabled(this.index())) this._nrpChangeLang(1);
        return;
    }
    _Window_Options_processOk.apply(this, arguments);
};

/**
 * 【独自】言語をリスト上で dir(+1/-1) 方向に切り替える。
 * _currentLangCode を更新するのみ。保存はオプション画面を閉じる時。
 */
Window_Options.prototype._nrpChangeLang = function(dir) {
    if (!pLanguageList || pLanguageList.length === 0) return;
    const currentIdx = langListIndex(_currentLangCode);
    const nextIdx = (currentIdx + dir + pLanguageList.length) % pLanguageList.length;
    _currentLangCode = pLanguageList[nextIdx].LangCode;
    this.redrawItem(this.findSymbol(SYMBOL_LANGUAGE));
    this.playCursorSound();
};

//-----------------------------------------------------------------------------
// \lanc[シート名.ID] / \lanm[シート名.ID] エスケープ文字の処理
// どちらも名前欄に記述して使用する。
//
// \lanc[シート名.ID]
//   言語データがある場合、\lanc[] より前の文字列を削除し、
//   対応言語テキストに置換する。\lanc[] 自体も除去される。
//   例：「アレックス\lanc[name.001]\f[ang]」→「Alex\f[ang]」
//
// \lanm[シート名.ID]
//   言語データがある場合、文章欄を全置換する。
//   \lanm[] 部分は名前欄から除去される。
//   \lanc[] と共存可能。
//-----------------------------------------------------------------------------

/**
 * ●Window_Message.prototype.startMessage のフック
 * allText() が呼ばれる前に名前欄の \lanc[] / \lanm[] を処理する。
 * シート名省略記法（\lanc[ID], \lanm[ID]）にも対応する。
 */
const _Window_Message_startMessage = Window_Message.prototype.startMessage;
Window_Message.prototype.startMessage = function() {
    // 完全記法（シート名あり）
    const LANC_REGEXP_FULL = /\\lanc\[([^\.]+)\.([^\]]+)\]/i;
    const LANM_REGEXP_FULL = /\\lanm\[([^\.]+)\.([^\]]+)\]/i;
    // 省略記法（シート名なし：ドットを含まない）
    const LANC_REGEXP_SHORT = /\\lanc\[([^\]\.]+)\]/i;
    const LANM_REGEXP_SHORT = /\\lanm\[([^\]\.]+)\]/i;
    let speakerName = $gameMessage.speakerName();

    /**
     * speakerName から \lanc[] または \lanm[] を検出して
     * シート名とIDを返すヘルパー。
     * 完全記法を優先し、なければ省略記法でシート名変数を使う。
     * @returns {{ sheet, id, match } | null}
     */
    function detectLan(fullRegexp, shortRegexp, name) {
        const matchFull = name.match(fullRegexp);
        if (matchFull) {
            return { sheet: matchFull[1], id: matchFull[2], match: matchFull };
        }
        const matchShort = name.match(shortRegexp);
        if (matchShort) {
            const sheet = _currentSheetName();
            if (!sheet) return null;
            return { sheet: sheet, id: matchShort[1], match: matchShort };
        }
        return null;
    }

    // --- \lanc[] の処理 ---
    if (speakerName) {
        const found = detectLan(LANC_REGEXP_FULL, LANC_REGEXP_SHORT, speakerName);
        if (found) {
            const text = _getLocalizeText(found.sheet, found.id);
            if (text !== "") {
                // \lanc[] より前の文字列を削除し、対応テキストで置換
                const after = speakerName.slice(found.match.index + found.match[0].length);
                speakerName = text + after;
            } else {
                // 言語データなし：\lanc[] 自体は除去して前後はそのまま
                speakerName = speakerName.replace(found.match[0], "");
            }
        }
    }

    // --- \lanm[] の処理 ---
    if (speakerName) {
        const found = detectLan(LANM_REGEXP_FULL, LANM_REGEXP_SHORT, speakerName);
        if (found) {
            const text = _getLocalizeText(found.sheet, found.id);
            if (text !== "") {
                // allText() より前に _texts を書き換える
                $gameMessage._texts = [text];
            }
            // \lanm[] 部分を名前欄から除去
            speakerName = speakerName.replace(found.match[0], "").trim();
        }
    }

    // 名前欄を更新（変更があった場合のみ）
    if (speakerName !== $gameMessage.speakerName()) {
        $gameMessage.setSpeakerName(speakerName);
    }

    _Window_Message_startMessage.call(this);
};

/**
 * ●Window_NameBox.prototype.windowWidth のフック
 * 名前自動置換がある場合は置換後テキストで幅を再計算する。
 * 表示幅が0の場合（制御文字のみで実際の文字がない場合）は非表示にする。
 * NRP_MessagePicture.js と同様の処置。
 */
const _Window_NameBox_windowWidth_lanm = Window_NameBox.prototype.windowWidth;
Window_NameBox.prototype.windowWidth = function() {
    // 置換後テキストで幅を再計算
    const drawName = this._nrpDrawName ?? this._name;
    if (drawName) {
        const textWidth = this.textSizeEx(drawName).width;
        if (textWidth === 0) return 0;
        // 置換が発生している場合は置換後テキストで幅を返す
        if (this._nrpDrawName) {
            const padding = this.padding + this.itemPadding();
            return Math.min(Math.ceil(textWidth) + padding * 2, Graphics.boxWidth);
        }
    }
    return _Window_NameBox_windowWidth_lanm.apply(this, arguments);
};


//-----------------------------------------------------------------------------
// meta タグ値の \lan[] / \lanc[] 動的解決
//
// 「言語プロジェクトを使用」がオフの場合にのみ有効。
// extractMetadata() をフックし、meta の各文字列値を getter に差し替える。
// アクセス時に \lan[] / \lanc[] を解決して返す。
// \lanc[] は meta 値の文脈では前方クリアなし（単純置換）とする。
//-----------------------------------------------------------------------------

/**
 * 【独自】meta値に \lan[] / \lanc[] が含まれるかを判定する正規表現。
 */
const META_LAN_REGEXP = /\\lan[cm]?\[/i;

/**
 * 【独自】meta値の \lan[] / \lanc[] を解決して返す。
 * \lanc[] は前方クリアなしの単純置換とする。
 * @param {string} raw 元の文字列
 * @returns {string} 解決後の文字列
 */
function _resolveMetaValue(raw) {
    let text = raw;

    // \lanc[シート名.ID]（前方クリアなし・単純置換）
    text = text.replace(/\\lanc\[([^\.]+)\.([^\]]+)\]/gi, function(m, sheet, id) {
        const v = _getLocalizeText(sheet, id);
        return v !== "" ? v : m;
    });
    // \lanc[ID]（省略記法）
    text = text.replace(/\\lanc\[([^\]\.]+)\]/gi, function(m, id) {
        const sheet = _currentSheetName();
        if (!sheet) return m;
        const v = _getLocalizeText(sheet, id);
        return v !== "" ? v : m;
    });
    // \lanm[シート名.ID]（meta値では\lanと同じ扱い）
    text = text.replace(/\\lanm\[([^\.]+)\.([^\]]+)\]/gi, function(m, sheet, id) {
        const v = _getLocalizeText(sheet, id);
        return v !== "" ? v : m;
    });
    // \lanm[ID]（省略記法）
    text = text.replace(/\\lanm\[([^\]\.]+)\]/gi, function(m, id) {
        const sheet = _currentSheetName();
        if (!sheet) return m;
        const v = _getLocalizeText(sheet, id);
        return v !== "" ? v : m;
    });
    // \lan[シート名.ID]
    text = text.replace(/\\lan\[([^\.]+)\.([^\]]+)\]/gi, function(m, sheet, id) {
        const v = _getLocalizeText(sheet, id);
        return v !== "" ? v : m;
    });
    // \lan[ID]（省略記法）
    text = text.replace(/\\lan\[([^\]]+)\]/gi, function(m, id) {
        const sheet = _currentSheetName();
        if (!sheet) return m;
        const v = _getLocalizeText(sheet, id);
        return v !== "" ? v : m;
    });

    return text;
}

/**
 * ●DataManager.extractMetadata のフック
 * meta の各文字列値に \lan[] 等が含まれる場合、
 * getter を定義してアクセス時に動的解決する。
 * 「言語プロジェクトを使用」がオフの場合のみ有効。
 */
const _DataManager_extractMetadata = DataManager.extractMetadata;
DataManager.extractMetadata = function(data) {
    _DataManager_extractMetadata.apply(this, arguments);

    // 言語プロジェクトを使用している場合は既にJSON上書きで対応するためスキップ
    if (pUseLanguageProject) return;

    const meta = data.meta;
    for (const key of Object.keys(meta)) {
        const raw = meta[key];
        // 値なしタグ（true）はスキップ
        if (typeof raw !== "string") continue;
        // \lan[] 等を含まない値はスキップ（パフォーマンス考慮）
        if (!META_LAN_REGEXP.test(raw)) continue;

        // getter に差し替えて動的解決
        Object.defineProperty(meta, key, {
            get: function() {
                return _resolveMetaValue(raw);
            },
            configurable: true,
            enumerable:   true,
        });
    }
};

/**
 * データベース項目用の解決処理。
 * \lanc[] は翻訳が見つかった場合だけ、その記述より前の文字列を置き換える。
 */
function _resolveDatabaseValue(raw) {
    let text = raw;

    text = text.replace(/\\lanc\[([^\.]+)\.([^\]]+)\]/gi, function(match, sheet, id) {
        return "\x00LANC\x00" + sheet + "\x00" + id + "\x00";
    });
    text = text.replace(/\\lanc\[([^\]\.]+)\]/gi, function(match, id) {
        const sheet = _currentSheetName();
        return sheet ? "\x00LANC\x00" + sheet + "\x00" + id + "\x00" : "";
    });
    if (text.includes("\x00LANC\x00")) {
        text = text.replace(/([\s\S]*?)\x00LANC\x00([^\x00]+)\x00([^\x00]+)\x00/gi,
            function(match, before, sheet, id) {
                const localized = _getLocalizeText(sheet, id);
                return localized !== "" ? localized : before;
            }
        );
    }

    return _resolveMetaValue(text);
}

//----------------------------------------------------------------------------- 
// データベース文字列の \lan[] / \lanc[] 遅延解決
//
// note は既存の meta タグ処理に任せる。イベントコマンド list には入らず、
// 通常のデータベース項目・システム用語などの文字列プロパティだけを対象にする。
//----------------------------------------------------------------------------- 

function _defineLocalizedDatabaseGetters(data) {
    if (!data || typeof data !== "object") return;

    if (Array.isArray(data)) {
        for (const item of data) _defineLocalizedDatabaseGetters(item);
        return;
    }

    for (const key of Object.keys(data)) {
        // note は DataManager.extractMetadata の既存対応を維持する。
        // list はイベントコマンド列のため、ここでの再帰対象にはしない。
        if (key === "note" || key === "meta" || key === "list") continue;

        const raw = data[key];
        if (typeof raw === "string") {
            if (!META_LAN_REGEXP.test(raw)) continue;
            Object.defineProperty(data, key, {
                get: function() {
                    return _resolveDatabaseValue(raw);
                },
                configurable: true,
                enumerable: true,
            });
        } else if (raw && typeof raw === "object") {
            _defineLocalizedDatabaseGetters(raw);
        }
    }
}

const _DataManager_onLoad = DataManager.onLoad;
DataManager.onLoad = function(object) {
    _DataManager_onLoad.apply(this, arguments);
    if (!pUseLanguageProject) _defineLocalizedDatabaseGetters(object);
};
    
})();
