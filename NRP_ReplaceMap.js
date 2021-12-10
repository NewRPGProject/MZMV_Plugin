//=============================================================================
// NRP_ReplaceMap.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.00 Replace map tiles by range.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/484742174.html
 *
 * @help Replace map tiles by range.
 * 
 * Perform range replacement of tiles by copying
 * the specified tiles from another map (or the current map).
 * 
 * Useful for maps that change as the story progresses,
 * or when you want to create a gimmick for a dungeon.
 * 
 * ------------------------------------------
 * [Usage]
 * ------------------------------------------
 * Specify the map information to be replaced
 * by the plugin command, and execute the replacement.
 * 
 * Specify the map ID, X, Y-coordinate,
 * width, and height of the replacement source,
 * and also specify the X, Y-coordinate of the replacement destination.
 * You can select whether each layer (+shadow, region)
 * is to be replaced or not.
 * 
 * All input fields are formulaic.
 * For example, $gameVariables.value(1) can refer to
 * the variable with the specified number.
 * 
 * The replaced tiles will be initialized
 * when the player transfers the map.
 * If you want to maintain the tile state, use parallel processing
 * to replace each tile as soon as the map starts to be displayed.
 * 
 * ------------------------------------------
 * [Notice]
 * ------------------------------------------
 * There will be a momentary load time as the information
 * from another map is loaded and replaced based on it.
 * Therefore, when a player transfers to the map,
 * for example, in an instant display,
 * the state before the replacement may be displayed instantaneously.
 * 
 * If there are multiple maps to replace, the load time will be longer.
 * I recommend that you limit yourself to one map as much as possible.
 * 
 * If the current map is used as the replacement source,
 * there will be no load time.
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
 * @param DefaultLayers
 * @type struct<TargetLayer>
 * @default {"Layer1":"true","Layer2":"true","Layer3":"true","Layer4":"true","Shadow":"true","Region":"false"}
 * @desc The layer to target for replacement by default.
 * You can also target shadows and regions.
 * 
 * 
 * @command ReplaceMap
 * @desc Replaces the map in the specified range.
 * 
 * @arg FromMapId
 * @desc Specifies the map ID to be replaced from.
 * If omitted, it will be the current map ID.
 * 
 * @arg FromX
 * @desc Specify the starting X coordinate of the replacement source.
 * 
 * @arg FromY
 * @desc Specify the starting Y coordinate of the replacement source.
 * 
 * @arg Width
 * @desc Specifies the width to be replaced.
 * @default 1
 * 
 * @arg Height
 * @desc Specifies the height to be replaced.
 * @default 1
 * 
 * @arg ToX
 * @desc Specify the start X coordinate of the replacement target.
 * If omitted, it is the same as FromX.
 * 
 * @arg ToY
 * @desc Specify the start Y coordinate of the replacement target.
 * If omitted, it is the same as FromY.
 * 
 * @arg Layers
 * @type struct<TargetLayer>
 * @desc The layer and region to be replaced.
 * The default values are used for the parts left blank.
 */

/*~struct~TargetLayer:
 * 
 * @param Layer1
 * @type boolean
 * @default true
 * @desc Layer 1 will be the target of the replacement.
 * 
 * @param Layer2
 * @type boolean
 * @default true
 * @desc Layer 2 will be the target of the replacement.
 * 
 * @param Layer3
 * @type boolean
 * @default true
 * @desc Layer 3 will be the target of the replacement.
 * 
 * @param Layer4
 * @type boolean
 * @default true
 * @desc Layer 4 will be the target of the replacement.
 * 
 * @param Shadow
 * @type boolean
 * @default true
 * @desc Shadow will be the target of the replacement.
 * 
 * @param Region
 * @type boolean
 * @default false
 * @desc Region will be the target of the replacement.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.00 マップタイルを範囲置換します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/484742174.html
 *
 * @help マップタイルを範囲置換します。
 * 
 * 別マップ（もしくは現在マップ）から指定したタイルを
 * コピーすることでタイルの範囲置換を行います。
 * 
 * ストーリー進行によって、変化するマップや、
 * ダンジョンのギミックを作成したい場合などに有用です。
 * 
 * ------------------------------------------
 * ■使用方法
 * ------------------------------------------
 * プラグインコマンドで置換元となるマップ情報を指定し、
 * 置換を実行してください。
 * 
 * 置換元のマップＩＤ、Ｘ座標、Ｙ座標、横幅、縦幅を指定し、
 * 置換先のＸ座標、Ｙ座標を指定してください。
 * レイヤー毎（＋影、リージョン）に置換の対象とするか選択できます。
 * 
 * 入力項目はいずれも数式可です。
 * 例えば、$gameVariables.value(1)で指定番号の変数を参照できます。
 * 
 * なお、置換したタイルはマップを移動すると初期化されます。
 * タイル状態を維持したい場合は、並列処理などを使って、
 * マップの表示開始と同時に都度置換してください。
 * 
 * ------------------------------------------
 * ■注意点
 * ------------------------------------------
 * 別マップの情報を読み込み、それを元に置換を行うため、
 * 一瞬のロード時間が発生します。
 * そのため、瞬間表示などでマップに場所移動すると、
 * 置換前の状態が瞬間的に表示されてしまうことがあります。
 * 
 * 置換元のマップが複数存在する場合、それだけロード時間が
 * 長くなるので、できるだけ一つにすることを推奨します。
 * 
 * なお、現在のマップを置換元にした場合は、
 * ロード時間が発生しません。
 * 
 * ------------------------------------------
 * ■利用規約
 * ------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param DefaultLayers
 * @text 対象レイヤーの初期値
 * @type struct<TargetLayer>
 * @default {"Layer1":"true","Layer2":"true","Layer3":"true","Layer4":"true","Shadow":"true","Region":"false"}
 * @desc 初期状態で置換の対象とするレイヤーです。
 * また、影やリージョンも対象にできます。
 * 
 * 
 * @command ReplaceMap
 * @text マップの置換
 * @desc 指定した範囲のマップを置換します。
 * 
 * @arg FromMapId
 * @text マップＩＤ（置換元）
 * @desc 置換元となるマップＩＤを指定します。
 * 省略すると現在のマップＩＤとなります。
 * 
 * @arg FromX
 * @text Ｘ座標（置換元）
 * @desc 置換元の開始Ｘ座標を指定します。
 * 
 * @arg FromY
 * @text Ｙ座標（置換元）
 * @desc 置換元の開始Ｙ座標を指定します。
 * 
 * @arg Width
 * @text 横幅
 * @desc 置換する横幅を指定します。
 * @default 1
 * 
 * @arg Height
 * @text 縦幅
 * @desc 置換する縦幅を指定します。
 * @default 1
 * 
 * @arg ToX
 * @text Ｘ座標（置換先）
 * @desc 置換先の開始Ｘ座標を指定します。
 * 省略すると置換元と同じ座標になります。
 * 
 * @arg ToY
 * @text Ｙ座標（置換先）
 * @desc 置換先の開始Ｙ座標を指定します。
 * 省略すると置換元と同じ座標になります。
 * 
 * @arg Layers
 * @text 対象レイヤー
 * @type struct<TargetLayer>
 * @desc 置換の対象とするレイヤーおよびリージョンです。
 * 空欄にした箇所は初期値を使用します。
 */

/*~struct~TargetLayer:ja
 * 
 * @param Layer1
 * @text レイヤー１を対象
 * @type boolean
 * @default true
 * @desc レイヤー１を置換の対象とします。
 * 
 * @param Layer2
 * @text レイヤー２を対象
 * @type boolean
 * @default true
 * @desc レイヤー２を置換の対象とします。
 * 
 * @param Layer3
 * @text レイヤー３を対象
 * @type boolean
 * @default true
 * @desc レイヤー３を置換の対象とします。
 * 
 * @param Layer4
 * @text レイヤー４を対象
 * @type boolean
 * @default true
 * @desc レイヤー４を置換の対象とします。
 * 
 * @param Shadow
 * @text 影を対象
 * @type boolean
 * @default true
 * @desc 影を置換の対象とします。
 * 
 * @param Region
 * @text リージョンを対象
 * @type boolean
 * @default false
 * @desc リージョンを置換の対象とします。
 */

// 置換元のマップデータ
$dataMapReplace = null;

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

const PLUGIN_NAME = "NRP_ReplaceMap";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pDefaultLayers = parseLayers(parameters["DefaultLayers"]);

/**
 * ●ＪＳで扱えるように型変換
 */
function parseLayers(layers) {
    layers = JSON.parse(layers);
    layers.Layer1 = toBoolean(layers.Layer1);
    layers.Layer2 = toBoolean(layers.Layer2);
    layers.Layer3 = toBoolean(layers.Layer3);
    layers.Layer4 = toBoolean(layers.Layer4);
    layers.Shadow = toBoolean(layers.Shadow);
    layers.Region = toBoolean(layers.Region);
    return layers;
}

// マップデータのロードが必要な置換情報の配列
let mLoadReplaceArgs = [];
// ロード中のマップＩＤ
let mLoadMapId = null;

//---------------------------------------------------
// プラグインコマンド
//---------------------------------------------------

/**
 * ●マップの置換
 */
PluginManager.registerCommand(PLUGIN_NAME, "ReplaceMap", function(args) {
    const loadMapId = eval(args.FromMapId);
    const fromX = eval(args.FromX);
    const fromY = eval(args.FromY);
    const width = eval(args.Width);
    const height = eval(args.Height);
    const toX = eval(args.ToX) ?? fromX;
    const toY = eval(args.ToY) ?? fromY;
    const layers = setLayers(args.Layers);

    // 格納用に変換
    // ※セーブデータに保持するため、配列[]ではなく連想配列{}で定義
    const newArgs = {};
    newArgs.fromMapId = loadMapId;
    newArgs.fromX = fromX;
    newArgs.fromY = fromY;
    newArgs.width = width;
    newArgs.height = height;
    newArgs.toX = toX;
    newArgs.toY = toY;
    newArgs.layers = layers;

    // マップＩＤが現在マップの場合は空にしておく。
    // ※余計なマップのロード処理を行わないため
    if (newArgs.fromMapId == $gameMap.mapId()) {
        newArgs.fromMapId = undefined;
    }

    // 置換情報を登録
    replaceRegist(newArgs);
});

/**
 * ●対象レイヤーの設定
 * ※設定がなければデフォルト値を使用
 */
function setLayers(argLayers) {
    if (argLayers) {
        // JSで使用できるように変換
        argLayers = JSON.parse(argLayers);

    // undefinedの場合は空で定義
    // ※以下でデフォルト値が読み込まれる。
    } else {
        argLayers = [];
    }

    const layers = [];
    // 対象のレイヤー（z=0,1,2,3）と影（z=4）とリージョン（z=5）を追加していく
    if (toBoolean(argLayers.Layer1, pDefaultLayers.Layer1)) {
        layers.push(0);
    }
    if (toBoolean(argLayers.Layer2, pDefaultLayers.Layer2)) {
        layers.push(1);
    }
    if (toBoolean(argLayers.Layer3, pDefaultLayers.Layer3)) {
        layers.push(2);
    }
    if (toBoolean(argLayers.Layer4, pDefaultLayers.Layer4)) {
        layers.push(3);
    }
    if (toBoolean(argLayers.Shadow, pDefaultLayers.Shadow)) {
        layers.push(4);
    }
    if (toBoolean(argLayers.Region, pDefaultLayers.Region)) {
        layers.push(5);
    }
    return layers;
}

//---------------------------------------------------
// Scene_Map
//---------------------------------------------------

/**
 * ●場所移動
 */
const _Scene_Map_updateTransferPlayer = Scene_Map.prototype.updateTransferPlayer;
Scene_Map.prototype.updateTransferPlayer = function() {
    // 場所移動時に初期化
    if ($gamePlayer.isTransferring()) {
        $gameMap.clearReplaceData();
    }

    _Scene_Map_updateTransferPlayer.apply(this, arguments);
};

//---------------------------------------------------
// Game_Map
//---------------------------------------------------

/**
 * ●マップの更新
 */
const _Game_Map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function(sceneActive) {
    _Game_Map_update.apply(this, arguments);

    // ロード中のマップＩＤがある場合
    if (mLoadMapId) {
        // まだロードが完了していない場合は終了して待つ
        if (!$dataMapReplace) {
            return;
        }

        //---------------------------------
        // マップデータの読込が完了した！
        //---------------------------------
        // $daraMapはマップＩＤを保有してないのでチェック用に書込
        $dataMapReplace.mapId = mLoadMapId;

        // マップ置換処理を実行
        for (const args of mLoadReplaceArgs) {
            // マップＩＤが一致したものに対して実行
            if (args.fromMapId == mLoadMapId) {
                replaceTiles(args, $dataMapReplace);
            }
        }

        // 処理の完了した要素を除去する。
        // ※mLoadReplaceArgsには複数マップの置換元データが含まれている可能性がある。
        mLoadReplaceArgs = mLoadReplaceArgs.filter(args => args.fromMapId != mLoadMapId);
        // ロード中マップＩＤをクリア
        mLoadMapId = null;
    }
    
    // 置換情報が存在する場合
    if (mLoadReplaceArgs.length > 0) {
        // 先頭要素のＩＤを取得してロード実行
        const args = mLoadReplaceArgs[0];
        const loadMapId = args.fromMapId;

        // マップデータをロード
        const filename = "Map%1.json".format(loadMapId.padZero(3));
        DataManager.loadDataFile("$dataMapReplace", filename);

        // ロード中のマップＩＤを設定
        mLoadMapId = loadMapId;
    }
};

/**
 * ●マップ情報の初期化
 */
const _Game_Map_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
    _Game_Map_initialize.apply(this, arguments);

    this.clearReplaceData();
}

/**
 * 【独自】置換用データの初期化
 */
Game_Map.prototype.clearReplaceData = function() {
    mLoadReplaceArgs = [];
    mLoadMapId = null;

    // 有効な置換情報の配列
    // ※ロード時も復元するため$gameMap内に保持する。
    this._validReplaceArgs = [];
}

/**
 * 【独自】置換用データの復旧
 * ※メニュー画面やゲームロード時に$dataMapが初期化されるので戻す。
 */
Game_Map.prototype.restoreReplaceData = function() {
    // 存在しない場合は初期化
    // ※途中からプラグインを導入した場合はここを通る。
    if (!this._validReplaceArgs) {
        this._validReplaceArgs = [];
    }

    // 二重登録されないように一旦複製してから初期化
    const validReplaceArgs = this._validReplaceArgs.clone();
    this._validReplaceArgs = [];
    // 置換情報を再登録
    for (const args of validReplaceArgs) {
        replaceRegist(args);
    }
}

//---------------------------------------------------
// DataManager
//---------------------------------------------------

/**
 * ●マップデータのロード完了時にタイルを復元
 */
const _DataManager_onLoad = DataManager.onLoad;
DataManager.onLoad = function(object) {
    _DataManager_onLoad.apply(this, arguments);

    if (object === $dataMap && $gameMap) {
        // 置換情報の復旧を行う。
        $gameMap.restoreReplaceData();
    }
};

//---------------------------------------------------
// 独自関数
//---------------------------------------------------

/**
 * ●タイルの置換情報を登録
 */
function replaceRegist(args) {
    const loadMapId = args.fromMapId;

    //--------------------------------------------------------------
    // ■解説
    // 一度、置換元のマップ情報をロード待ちする必要があるため、
    // この時点では即座に処理を実行できない。
    // ※ただし、置換元が現在マップの場合はロード不要
    // 
    // そのため、置換情報を一旦配列に格納し、
    // Game_Map.prototype.updateにて、マップのロード状況を監視。
    // 完了したタイミングで処理を行っている。
    // 
    // 複数の置換元マップが存在する場合も考慮し、
    // 読み込んだ置換元マップＩＤ単位で処理をしていく。
    // ※異なる置換元マップＩＤが指定された場合は
    // 　置換用マップデータは破棄される。
    //--------------------------------------------------------------

    // マップＩＤが指定されている場合
    if (loadMapId) {
        // 既に読込済のマップとＩＤが一致した場合は、
        // ロード不要なので即時実行
        if ($dataMapReplace && $dataMapReplace.mapId == loadMapId) {
            replaceTiles(args, $dataMapReplace);
            return;
        }

        // それ以外は置換情報を追加し、マップデータのロード完了後に実行
        mLoadReplaceArgs.push(args);

    // マップＩＤの指定がない場合はロード不要
    // 現在のマップを対象に即時実行
    } else {
        replaceTiles(args, $dataMap);
    }
}

/**
 * ●タイルの範囲置換を実行
 */
function replaceTiles(args, dataMapReplace) {
    const fromX = args.fromX;
    const fromY = args.fromY;
    const width = args.width;
    const height = args.height;
    const toX = args.toX;
    const toY = args.toY;
    const layers = args.layers;

    const fromMapWidth = dataMapReplace.width;
    const fromMapHeight = dataMapReplace.height;
    const toMapWidth = $dataMap.width;
    const toMapHeight = $dataMap.height;

    //-----------------------------------------
    // 範囲内のタイルに対して一つずつ置換を実行
    // ※x1, y1は置換元、x2, y2は置換先の座標
    //-----------------------------------------
    for (let y1 = fromY, y2 = toY; y1 < fromY + height; y1++, y2++) {
        for (let x1 = fromX, x2 = toX; x1 < fromX + width; x1++, x2++) {
            // レイヤー（z=0,1,2,3）とリージョン（z=5）の置換
            for (const z of layers) {
                // $dataMapReplace内のタイル情報を保持する位置を計算
                const fromIndex = (z * fromMapHeight + y1) * fromMapWidth + x1;
                // $dataMap内のタイル情報を保持する位置を計算
                const toIndex = (z * toMapHeight + y2) * toMapWidth + x2;
                // タイルの置換実行
                $dataMap.data[toIndex] = dataMapReplace.data[fromIndex];
            }
        }
    }

    // 現在実行中の置換情報を登録
    $gameMap._validReplaceArgs.push(args);
}

})();
