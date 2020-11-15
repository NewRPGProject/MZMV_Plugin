//=============================================================================
// NRP_DynamicReadTxt.js
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc v1.032 Read the definition of DynamicAnimation&Motion from txt file.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @base NRP_DynamicAnimationMZ
 * @orderAfter NRP_DynamicAnimationMZ
 * @orderAfter NRP_DynamicAnimationMapMZ
 * @url http://newrpg.seesaa.net/article/477791458.html
 *
 * @help Read the definition of DynamicAnimation&Motion from txt file.
 * 
 * If you include <D-Txt:[file name]> in the skill note,
 * you can read and replace the definition
 * from the txt file in the specified folder.
 * (The file name does not need an extension.)
 * 
 * For example, <D-Txt:abc> would refer to abc.txt.
 * Also, if you omit the file name,
 * the skill ID is automatically used for the file name.
 * For example, if skill ID=100, it will refer to 100.txt.
 * 
 * [Example]
 * <D-Txt:spellStart>
 * <D-Animation/>
 * <D-Txt:spellEnd>
 * 
 * It is also possible to read from multiple txt files as shown above.
 * 
 * When in test mode, each time someone uses a skill,
 * it will load a file each time.
 * This allows you to check the operation repeatedly without stopping the game.
 * In production mode, all definitions are read at startup.
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but we will respond to defects as far as possible.
 * 
 * @param ReadTxtFolder
 * @type string
 * @default data/D-Txt/
 * @desc The folder where the .txt file to be read is located.
 * The default setting is "data/D-Txt/".
 * 
 * @param DynamicReadOnTest
 * @type boolean
 * @default true
 * @desc When testing, the game will load every time someone uses a skill.
 * This allows you to change behavior without stopping the game.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.032 DynamicAnimation&Motionの定義をtxtから読み込みます。
 * @author 砂川赳 (http://newrpg.seesaa.net/)
 * @base NRP_DynamicAnimationMZ
 * @orderAfter NRP_DynamicAnimationMZ
 * @orderAfter NRP_DynamicAnimationMapMZ
 * @url http://newrpg.seesaa.net/article/477791458.html
 *
 * @help DynamicAnimation&Motionの定義をtxtファイルから読み込みます。
 * 
 * スキルのメモ欄に<D-Txt:[ファイル名]>と記載すれば、
 * 指定のフォルダにあるtxtファイルから定義を読み込み、置換します。
 * （ファイル名に拡張子は不要です。）
 * 
 * 例えば、<D-Txt:abc>ならば、abc.txtを参照します。
 * また、ファイル名を省略するとスキルIDを自動でファイル名に使用します。
 * 例えば、スキルID=100ならば、100.txtを参照します。
 * 
 * [記述例]
 * <D-Txt:spellStart>
 * <D-Animation/>
 * <D-Txt:spellEnd>
 * 
 * 上記のように複数のtxtから読み込むことも可能です。
 * 
 * テストモード時はスキルを使用する度に毎回ファイルを読み込みます。
 * これにより、ゲームを停止することなく動作を繰り返し確認できます。
 * ※本番モード時は起動時に全ての定義を読み込みます。
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param ReadTxtFolder
 * @text txt配置フォルダ
 * @type string
 * @default data/D-Txt/
 * @desc 読み込む.txtファイルを配置するフォルダです。
 * 初期設定は"data/D-Txt/"です。
 * 
 * @param DynamicReadOnTest
 * @text テスト時は毎回読込
 * @type boolean
 * @default true
 * @desc テスト時はスキルを使用する度に読込を行います。
 * これによりゲームを停止せずに動作変更が可能です。
 */

// DynamicTextファイルの内容を格納する配列
$dynamicReadText = [];
// 読込判定に使う一時領域
$dynamicReadTextTemp = [];

(function() {
"use strict";

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
function setDefault(str, def) {
    return str ? str : def;
}

const PLUGIN_NAME = "NRP_DynamicReadTxt";
var parameters = PluginManager.parameters(PLUGIN_NAME);
var pReadTxtFolder = setDefault(parameters["ReadTxtFolder"], "data/D-Txt/");
var pDynamicReadOnTest = toBoolean(parameters["DynamicReadOnTest"], true);

const TAG_NAME = "D-Txt";

/************************************************
 * 以下、共通処理
 ***********************************************/

// エラー保有領域
DataManager._dynamicTextErrors = [];

/**
 * ●テスト時に定義の動的読込を行うか？
 */
function isDynamicReadOnTest() {
    // テスト時はプラグインパラメータの定義を使用
    if ($gameTemp.isPlaytest()) {
        return pDynamicReadOnTest;
    }

    // 本番時は必ずfalse
    return false;
}

/**
 * ●<D-Txt>タグがあればロードする。
 * ロード実行時はtrueを返す。
 */
function loadDynamicTextFile(item) {
    const fileNames = getDynamicTextFileNames(item);

    // ファイル名があればロード実行
    if (fileNames.length) {
        // 一時読込領域クリア
        $dynamicReadTextTemp = [];

        // 複数ファイルに対してロード実行
        for (const fileName of fileNames) {
            DataManager.loadDynamicTextFile("$dynamicReadTextTemp", fileName + ".txt", fileName);
        }
        return true;
    }

    // ロードしない
    return false;
}

/**
 * ●<D-Txt>タグがあればファイル名を配列で取得する。（拡張子は除く）
 */
function getDynamicTextFileNames(item) {
    const fileNames = [];
    // メモ欄の中身を取得（改行で分割して配列化）
    const noteSplit = item.note.split("\n");
    // 一行ずつ実行
    for (const line of noteSplit) {
        // ファイル名を取得
        const fileName = readLineFileName(line, item);
        // 取得できれば配列に追加
        if (fileName) {
            fileNames.push(fileName);
        }
    }

    return fileNames;
}

/**
 * ●メモ欄の行からファイル名を取得
 */
function readLineFileName(line, item) {
    // タグにファイル名の指定がない場合
    if (line.match("<" + TAG_NAME + ">")) {
        // スキルIDを使用
        return item.id;
    }

    // タグに:の指定がある場合
    const dTextArr = line.match("<" + TAG_NAME + ":(.*)>");
    if (dTextArr) {
        const value = dTextArr[1];
        // 空の場合
        if (value.length == 0) {
            // スキルIDを使用
            return item.id;

        // 入力がある場合
        } else {
            // 指定ファイル名を使用
            return value;
        }
    }

    return undefined;
}

/**
 * 【独自】テキストファイルを読み込む
 */
DataManager.loadDynamicTextFile = function(name, src, key) {
    const xhr = new XMLHttpRequest();
    const url = pReadTxtFolder + src;
    window[name][key] = null;
    xhr.open("GET", url);
    xhr.overrideMimeType("text/plain");
    xhr.onload = () => this.onXhrLoadDynamicText(xhr, name, src, url);
    xhr.onerror = () => this.onXhrErrorDynamicText(name, src, url);
    xhr.send();

    // フラグを立てる
    this.onLoadDynamicText = true;
};

/**
 * 【独自】DynamicText用エラー処理
 */
DataManager.onXhrErrorDynamicText = function(name, src, url) {
    const error = { name: name, src: src, url: url };
    this._dynamicTextErrors.push(error);
};

/**
 * 【独自】DynamicTextファイルのロード
 */
DataManager.onXhrLoadDynamicText = function(xhr, name, src, url) {
    if (xhr.status < 400) {
        // 取得したテキストを$dynamicReadTextに設定
        // 拡張子を除去してキーにする。abc.txt -> abc
        const key = src.replace(/\.[^/.]+$/, "");
        window[name][key] = xhr.responseText;
        $dynamicReadText[key] = xhr.responseText;

        this.onLoad(window[name][key]);
    } else {
        this.onXhrErrorDynamicText(name, src, url);
    }

    // フラグを解除
    this.onLoadDynamicText = false;
};

/**
 * 【独自】テキストがロードできているかどうか？
 * こちらは一行ずつの判定
 */
DataManager.isDynamicTextLoaded = function() {
    this.checkErrorDynamicText();

    // 全てのテキストがロード完了ならtrue
    return $dynamicReadTextTemp.every(function(text) {
        return text;
    });
};

/**
 * 【独自】DynamicText用のエラー判定
 */
DataManager.checkErrorDynamicText = function() {
    if (this._dynamicTextErrors.length > 0) {
        const error = this._dynamicTextErrors.shift();
        const retry = () => {
            this.loadDynamicTextFile(error.name, error.src);
        };
        throw ["LoadError", error.url, retry];
    }
};

/************************************************
 * 以下、起動時のロード
 ***********************************************/

const _DataManager_loadDatabase = DataManager.loadDatabase;
DataManager.loadDatabase = function() {
    _DataManager_loadDatabase.apply(this, arguments);

    // DynamicTextを全件読込する。
    this.loadDynamicTextAll();
};

/**
 * 【独自】DynamicTextを全件読込する。
 */
DataManager.loadDynamicTextAll = function() {
    // node.jsの関数を呼び出し、フォルダ内にあるファイル名を取得
    const fs = require("fs");
    // 処理はreaddirDynamicTextFileに引き継ぐ
    fs.readdir(pReadTxtFolder, readdirDynamicTextFile);

    // ロード実行フラグ
    this.onLoadDynamicTextAll = true;
};

/**
 * ●DynamicTextフォルダのファイルリストを読み込む
 */
function readdirDynamicTextFile(err, dynamicFileNames) {
    if (err) {
        // エラーメッセージを適当に表示
        alert(PLUGIN_NAME + ": Folder Not Found!\n\n" + err);
        process.exit(1);
    }
    
    // .txtファイルだけに絞り込み
    // ※フォルダ名に.txtを付けると誤検出するけど気にしない。
    const dynamicTextFileNames = dynamicFileNames.filter(function(fileName) {
        return fileName.endsWith(".txt");
    });

    // 一行ずつファイルを読込
    for (const fileName of dynamicTextFileNames) {
        DataManager.loadDynamicTextFile("$dynamicReadTextTemp", fileName);
    }

    // ファイル名リストを設定してチェックに使う
    // ※拡張子は不要なので除去
    DataManager._dynamicTextFileKeys = dynamicTextFileNames.map(function(name) {
        return name.replace(/\.[^/.]+$/, ""); 
    });
}

/**
 * 【独自】全テキストがロードできているかどうか？
 */
DataManager.isDynamicTextAllLoaded = function() {
    // ロード中の場合
    if (this.onLoadDynamicTextAll) {
        this.checkErrorDynamicText();

        // ファイル名リストから全ての該当キーが存在するかチェック
        // 全てがundefinedでなくなればＯＫ
        if (this._dynamicTextFileKeys) {
            const result = this._dynamicTextFileKeys.every(function(key) {
                return $dynamicReadText[key] != undefined
            });

            // 結果ＯＫなら
            if (result) {
                // 不要になったキーをクリア
                DataManager._dynamicTextFileKeys = undefined;
                // ロード中解除
                this.onLoadDynamicTextAll = false;
            }
            return result;
        }
        return false;
    }

    // それ以外はtrue
    return true;
};

/**
 * ●データベースのロードが完了したか？
 */
const _DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function() {
    const loaded = _DataManager_isDatabaseLoaded.apply(this, arguments);

    // DynamicTextのロード完了も確認
    return loaded && this.isDynamicTextAllLoaded();
};

/************************************************
 * 以下、NRP_DynamicAnimationとの連携
 ***********************************************/

/**
 * ●アクション開始
 */
const _Window_BattleLog_startAction = Window_BattleLog.prototype.startAction;
Window_BattleLog.prototype.startAction = function(subject, action, targets) {
    // テスト実行モードの場合
    if (isDynamicReadOnTest()) {
        // テキスト指定があれば読込
        loadDynamicTextFile(action.item());
    }

    _Window_BattleLog_startAction.apply(this, arguments);
};

/**
 * ●処理中判定
 */
const _BattleManager_isBusy = BattleManager.isBusy;
BattleManager.isBusy = function() {
    if (DataManager.onLoadDynamicText) {
        // ロードが未完了の場合
        if (!DataManager.isDynamicTextLoaded()) {
            return true;
        }
    }

    return _BattleManager_isBusy.apply(this, arguments);
};

/**
 * ●動的アニメーションタグが存在するかどうか？
 */
const _Game_Action_hasDynamicAnimationTag = Game_Action.prototype.hasDynamicAnimationTag;
Game_Action.prototype.hasDynamicAnimationTag = function() {
    var item = this.item();
    var note = item.note;

    // 開始タグがあればtrue
    if (note.match("<" + TAG_NAME)) {
        return true;
    }
    return _Game_Action_hasDynamicAnimationTag.apply(this, arguments);
};

/**
 * ●メモ欄読込処理
 */
const _Game_Action_getDynamicNote = Game_Action.prototype.getDynamicNote;
Game_Action.prototype.getDynamicNote = function() {
    // <D-Txt>タグが存在すれば、置換して取得
    const dynamicNote = replaceDynamicNote(this.item());
    if (dynamicNote) {
        return dynamicNote;
    }

    return _Game_Action_getDynamicNote.apply(this, arguments);
};

/**
 * ●<D-Txt>タグがあればファイル名を配列で取得する。（拡張子は除く）
 */
function replaceDynamicNote(item) {
    // 開始タグがなければundefined
    if (!item.note.match("<" + TAG_NAME)) {
        return undefined;
    }

    let dynamicText = "";

    // メモ欄の中身を取得（改行で分割して配列化）
    const noteSplit = item.note.split("\n");

    // 一行ずつ実行
    for (const line of noteSplit) {
        // ファイル名を取得
        const fileName = readLineFileName(line, item);
        // 取得できれば配列に追加
        if (fileName) {
            // 変換して追加
            dynamicText += $dynamicReadText[fileName];

        // 取得できなければ普通に行を出力
        } else {
            dynamicText += line;
        }
        // 改行追加
        dynamicText += "\n";
    }

    return dynamicText;
}

/************************************************
 * 以下、NRP_DynamicAnimationMapとの連携
 ***********************************************/

/**
 * ●マップ版DynamicAnimationを開始する。
 */
const _Game_Interpreter_startDynamicAnimation = Game_Interpreter.prototype.startDynamicAnimation;
Game_Interpreter.prototype.startDynamicAnimation = function(targets, action, mapAnimation) {
    // テスト実行モードの場合
    // ※ロード時に影響を与えないため、this._dynamicMethodsがある場合のみ処理
    if (this._dynamicMethods && isDynamicReadOnTest()) {
        // <D-Txt>の指定がある場合は読込実行
        if (loadDynamicTextFile(action.item())) {
            // 直接実行せず、一旦メインループに戻してから実行する。
            this._dynamicMethods.push({
                name: "showDynamicAnimation",
                params: [targets, action, mapAnimation]
            });
            return;
        }
    }

    // 指定がない場合は普通に実行
    _Game_Interpreter_startDynamicAnimation.apply(this, arguments);
}

/**
 * ●マップ版DynamicAnimationを開始する。
 * ※こちらは<D-Skill>による自動起動時
 */
const _Game_Event_showDynamicAnimation = Game_Event.prototype.showDynamicAnimation;
Game_Event.prototype.showDynamicAnimation = function(targets, action, mapAnimation) {
    // テスト実行モードの場合
    if (isDynamicReadOnTest()) {
        // <D-Txt>の指定がある場合は読込実行
        loadDynamicTextFile(action.item());
    }

    // 指定がない場合は普通に実行
    _Game_Event_showDynamicAnimation.apply(this, arguments);
}

/**
 * ●クリア
 */
const _Game_Interpreter_clear = Game_Interpreter.prototype.clear;
Game_Interpreter.prototype.clear = function() {
    _Game_Interpreter_clear.apply(this, arguments);

    this._dynamicMethods = [];
};

/**
 * 【独自】DynamicAnimationの実行
 */
Game_Interpreter.prototype.showDynamicAnimation = function(targets, action, mapAnimation) {
    // 設定があればウェイト
    if (!mapAnimation.noWait) {
        this.setWaitMode("animation");
        this._onDynamicAnimation = true;
    }

    // 空のWindow_BattleLogを作成し、DynamicAnimationを起動
    const win = new Window_BattleLog(new Rectangle());
    win.showDynamicAnimation(targets, action, false, mapAnimation);
};

/**
 * ●ウェイト更新処理
 */
const _Game_Interpreter_updateWait = Game_Interpreter.prototype.updateWait;
Game_Interpreter.prototype.updateWait = function() {
    if (this._dynamicMethods && this._dynamicMethods.length > 0) {
        // ロードが完了していない場合はウェイト
        if (!DataManager.isDynamicTextLoaded()) {
            return true;
        }

        // ロードが完了していたら実行
        const method = this._dynamicMethods.shift();
        if (method.name && this[method.name]) {
            this[method.name].apply(this, method.params);
        } else {
            throw new Error("Method not found: " + method.name);
        }
    }

    return _Game_Interpreter_updateWait.apply(this, arguments);
};

/**
 * ●ウェイト判定
 */
const _Game_Interpreter_updateWaitMode = Game_Interpreter.prototype.updateWaitMode;
Game_Interpreter.prototype.updateWaitMode = function() {
    if (this._waitMode == "animation") {
        if (this.isOnCurrentMap()) {
            // 実行前の処理があるならば実行を待つ
            if (this._dynamicMethods && this._dynamicMethods.length > 0) {
                return true;
            }
        }
    }

    return _Game_Interpreter_updateWaitMode.apply(this, arguments);;
};

/**
 * ●マップ版DynamicAnimationを開始する。
 * ※こちらは<D-Skill>によるステートからの自動起動時
 */
const _Game_Battler_showDynamicAnimation = Game_Battler.prototype.showDynamicAnimation;
Game_Battler.prototype.showDynamicAnimation = function(targets, action, mapAnimation) {
    // テスト実行モードの場合
    if (isDynamicReadOnTest()) {
        // <D-Txt>の指定がある場合は読込実行
        loadDynamicTextFile(action.item());
    }

    // 指定がない場合は普通に実行
    _Game_Battler_showDynamicAnimation.apply(this, arguments);
}

})();
