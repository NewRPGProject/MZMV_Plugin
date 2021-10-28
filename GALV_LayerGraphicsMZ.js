//-----------------------------------------------------------------------------
//  Galv's Layer Graphics MZ
//-----------------------------------------------------------------------------
//  For: RPGMAKER MZ
//  GALV_LayerGraphicsMZ.js
//-----------------------------------------------------------------------------
//  2020-10-xx - Version 1.2 - fixed static layer plugin setting not listing
//                             layers directory images
//  2020-08-26 - Version 1.1 - plugin command updated to select /layers/ file
//  2020-08-24 - Version 1.0 - release
//-----------------------------------------------------------------------------
//  Terms can be found at:
//  galvs-scripts.com
//-----------------------------------------------------------------------------

var Imported = Imported || {};
Imported.Galv_LayerGraphics = true;

var Galv = Galv || {};        // Galv's main object
Galv.LG = Galv.LG || {};      // This plugin object
Galv.LG.pluginName = "GALV_LayerGraphicsMZ";

//-----------------------------------------------------------------------------
/*:
 * @plugindesc (v.1.2) Create graphic layers for parallax mapping, fog, etc. View documentation for plugin commands.
 * @url http://galvs-scripts.com
 * @target MZ
 * @author Galv
 *
 * @param fixPosition
 * @text Fix Battlefield Position
 * @type boolean
 * @default true
 * @desc Stops the battlefield from having a gap on the left and bottom. Turn off if any compatibility issues.
 *
 * @command create
 * @text Create Layer
 * @desc Creates a layer with specified settings
 *
 * @arg mapId
 * @default 0
 * @text Map ID
 * @desc The ID of the map to create the layer on.
 *
 * @arg layerId
 * @default 0
 * @text Layer ID
 * @desc The ID of the layer to refer to it during development.
 *
 * @arg graphic
 * @default 
 * @text Graphic
 * @type file
 * @dir img/layers/
 * @desc The filename of the graphic found in /img/layers/ folder (without file extension)
 *
 * @arg xSpeed
 * @default 0
 * @text X Speed
 * @desc The speed of the horizontal movement. Negatives go left.
 *
 * @arg ySpeed
 * @default 0
 * @text Y Speed
 * @desc The speed of the vertical movement. Negatives go up.
 *
 * @arg opacity
 * @min 0
 * @max 255
 * @default 255
 * @text Opacity
 * @desc The opacity of the layer (0-255)
 *
 * @arg zLevel
 * @default 10
 * @text Z Level
 * @desc The Z level of the layer (can use negatives and decimals). 0 = ground, 5 = above all chars.
 *
 * @arg xShift
 * @default 0
 * @text X Shift
 * @desc Horizonal movement shift that differs from player movement to create parallax effects. 0 to move with map.
 *
 * @arg yShift
 * @default 0
 * @text Y Shift
 * @desc Vertical movement shift that differs from player movement to create parallax effects. 0 to move with map.
 *
 * @arg blendMode
 * @type number
 * @min 0
 * @default 0
 * @text Blend Mode
 * @desc Blend mode (0 = normal, 1 = add, 2 = multiply, 3 = screen)... and apparently up to 29 different ones.
 *
 *
 * @command createStatic
 * @text Create Static Layer
 * @desc Creates a static layer with specified settings
 *
 * @arg mapId
 * @min 0
 * @default 0
 * @text Map ID
 * @desc The ID of the map to create the layer on.
 *
 * @arg layerId
 * @min 0
 * @default 0
 * @text Layer ID
 * @desc The ID of the layer to refer to it during development.
 *
 * @arg graphic
 * @default 
 * @text Graphic
 * @type file
 * @dir img/layers/
 * @desc The filename of the graphic found in /img/layers/ folder (without file extension)
 *
 * @arg xPosition
 * @default 0
 * @text X Position
 * @desc The x (horizontal) position of the static layer on the map.
 *
 * @arg yPosition
 * @default 0
 * @text Y Position
 * @desc The y (vertical) position of the static layer on the map.
 *
 * @arg opacity
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * @text Opacity
 * @desc The opacity of the layer (0-255)
 *
 * @arg zLevel
 * @default 0
 * @text Z Level
 * @desc The Z level of the layer (can use negatives and decimals). 0 = ground, 5 = above all chars.
 *
 * @arg blendMode
 * @type number
 * @min 0
 * @default 0
 * @text Blend Mode
 * @desc Blend mode (0 = normal, 1 = add, 2 = multiply, 3 = screen)... and apparently up to 29 different ones.
 *
 * @arg xAnchor
 * @default 0
 * @text X Anchor
 * @desc The position of the image centered on the x value (0 left, 0.5 middle, 1 right)
 *
 * @arg yAnchor
 * @default 0
 * @text Y Anchor
 * @desc The position of the image centered on the y value (0 left, 0.5 middle, 1 right)
 *
 * @arg char
 * @default 0
 * @text Character
 * @desc 0 for none, -1 for player, above 0 for a specific event id for the static image to be positioned on.
 *
 * @arg rotate
 * @default 0
 * @text Rotate
 * @desc 0 for no. 1 for yes. If the image points the direction the character is facing (create image facing down).
 *
 *
 * @command remove
 * @text Remove Layer
 * @desc Removes a layer from a map.
 *
 * @arg removeMapId
 * @default 0
 * @text Map ID
 * @desc The map ID that contains the layer you want to remove.
 *
 * @arg removeLayerId
 * @default 0
 * @text Layer ID
 * @desc The layer ID of the layer you want to remove.
 *
 *
 * @command refresh
 * @text Refresh Layer
 * @desc Only needs to be done if a layer is added or removed on the CURRENT map.
 *
 *
 * 
 *
 * @help
 *   Galv's Layer Graphics MZ
 * ----------------------------------------------------------------------------
 * Before you start, you will need to create a layers folder in your project.
 * /img/layers/
 * This is where all your layer images will be taken from.
 *
 * Each map can have many graphic layers, but be aware that the more you have,
 * the more chance the game could lag (especially on slow computers or mobile
 * devices).
 *
 * When a layer is made, it is stored, so you can set layers for maps before
 * a player enters them. The layers are created when the map is created, so
 * for layer commands created on the current map, use the 'Refresh Layer'
 * plugin command to force the layers to draw while on the same map.
 *
 * ----------------------------------------------------------------------------
 *   PLUGIN COMMANDS
 * ----------------------------------------------------------------------------
 *
 * Below are possible commands to be use in and event's "Plugin Command":
 *
 * Create Layer        - Creates settings for a layer on the specified map.
 *                       Use 0 for current map.
 *
 * Create Static Layer - Creates a non-repeating layer that sticks to the map.
 *
 * Remove Layer        - Removes a layer on the specified map.
 * 
 * Refresh Layer       - Redraws the layers. Needed only if you add NEW layers
 *                       within an event on the current map. No need to use it
 *                       after the layers are created, they will draw when the
 *                       map loads.
 *
 *
 * EXPLANATION OF PROPERTIES:
 * Map ID       - the id of the map you are creating the layer for
 * Layer ID     - the id of the layer itself. If you want to change or remove
 *                an existing layer, you refer to it by it's id.
 * Graphic      - The filename of the image found in /img/layers/
 * X Speed      - The speed of the horizontal movement. Negatives to go left
 * Y Speed      - The speed of the vertical movement. Negatives to go up
 * Opacity      - Transparency of the image (0 - 255)
 * Z Level      - What priority the image has. 0 = ground, 5 = above all chars
 * X Shift      - Horizonal movement shift that differs from player movement
 * Y Shift      - Vertical movement shift that differs from player movement
 *                Make X Shift and Y Shift = 0 to move with map
 * Blend        - Blend mode (0 = normal, 1 = add, 2 = multiply, 3 = screen)
 *                There appears to be different modes all the way to 29
 *
 * X            - The x position of the Static Layer.
 * Y            - The y position of the Stateic Layer
 * X Anchor     - 0 left, 0.5 middle, 1 right - the part of the image that
 *                is set to the X position porperty above.
 * Y Anchor     - 0 left, 0.5 middle, 1 right - the part of the image that
 *                is set to the Y position porperty above.
 * Character    - 0 for none, -1 for player, above 0 for a specific event id
 * Rotate       - 0 for no, 1 for yes, to rotate the sprite depending on the
 *                direction the specified Characters is facing. Default 
 *                graphic should be facing down. This doesn't work if there is
 *                no character set
 *
 * ----------------------------------------------------------------------------
 * Variable Feature: You can type in vX, where X is a variable id in order
 * to use the number stored in a variable within the plugin command settings.
 *
 * EXAMPLE:
 * If I were to put v2 in the opacity setting, it would take the number stored
 * in Variable 2 and use it when the plugin command is called.
 *
 * ----------------------------------------------------------------------------
 *   MAP NOTES
 * ----------------------------------------------------------------------------
 * In addition to using the plugin commands, you can setup layers on each map.
 * Do this in using the below text in the NOTE section of the map settings.
 *
 *   LAYER ID GRAPHIC XSPEED YSPEED OPACITY Z XSHIFT YSHIFT BLEND
 *
 *   LAYER_S ID GRAPHIC X Y OPACITY Z BLEND XANCHOR YANCHOR CHARACTER ROTATE
 *
 * The top example is for repeating parallax layers. LAYER_S is to add static
 * layers. These layers can be changed as normal with plugin commands.
 *
 * EXAMPLES OF TEXT IN NOTE FIELD:
 * LAYER 1 trees 0 0 255 5 10 0 0
 * LAYER_S 2 fog 80 64 85 12 0.5 0.5 0
 * ----------------------------------------------------------------------------
 *
 * ----------------------------------------------------------------------------
 *   SCRIPT STUFF
 * ----------------------------------------------------------------------------
 * For advanced users only. Layer properties can be accessed via script:
 * $gameMap.layerSettings[mapId][layerId].property
 * "property" being the above properites in lowercase.
 * ----------------------------------------------------------------------------
 *
 * ----------------------------------------------------------------------------
 *   SCRIPT CALL - BATTLE LAYERS
 * ----------------------------------------------------------------------------
 *
 *   Galv.LG.bLayer(id,'graphic',xspeed,yspeed,opacity,z,blend);
 *
 * Battle layers are controlled with this script call. They don't use the
 * Plugin Command but the values are the same as the plugin commands above
 * (without the map ID). Once set, battle layers last for every combat after
 * until they are changed again.
 *
 * BATTLE Z LEVEL - works slightly different. Cannot use decimals.
 * 0   - behind enemies
 * 2   - equal to enemies (probably don't want to use this one
 * 3+  - above enemies
 *
 * To remove a layer simply use the same call with only the id.
 * For example:
 *
 *   Galv.LG.bLayer(id);
 *
 * ----------------------------------------------------------------------------
 */

 /*:ja
 * @plugindesc (v.1.0) 視差マッピング、霧などの画像レイヤーを作成します。
 * @url http://galvs-scripts.com
 * @target MZ
 * @author Galv
 *
 * @param fixPosition
 * @text 戦闘シーンの位置修正
 * @type boolean
 * @on 修正有効化
 * @off 修正無効化
 * @default true
 * @desc 戦闘シーンの左右の隙間をなくします。互換性の問題がある場合、無効にします
 *
 * @command create
 * @text レイヤーを作成
 * @desc 指定した設定でレイヤーを作成します
 *
 * @arg mapId
 * @type number
 * @min 1
 * @default 0
 * @text マップID
 * @desc レイヤーを作成するマップID
 *
 * @arg layerId
 * @type number
 * @min 0
 * @default 0
 * @text レイヤーID
 * @desc 開発中に参照するレイヤーID
 *
 * @arg graphic
 * @default
 * @text 画像
 * @type file
 * @dir img/layers/
 * @desc 画像ファイル名(/img/layers/内)
 *
 * @arg xSpeed
 * @default 0
 * @text X速度
 * @desc 水平移動の速度。負の値は左に
 *
 * @arg ySpeed
 * @default 0
 * @text Y速度
 * @desc 垂直移動の速度。負の値は上に
 *
 * @arg opacity
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * @text 不透明度
 * @desc レイヤーの不透明度(0から255)
 *
 * @arg zLevel
 * @default 10
 * @text Zレベル
 * @desc レイヤーのZレベル(負の値と小数を使用できます) 0=グラウンド、5=全キャラクターの上
 *
 * @arg xShift
 * @default 0
 * @text Xシフト
 * @desc 視差効果を作成するためにプレイヤーの動きとは異なる水平方向の動きのシフト。マップとともに移動するには0
 *
 * @arg yShift
 * @default 0
 * @text Yシフト
 * @desc 視差効果を作成するためにプレイヤーの動きとは異なる垂直方向の動きのシフト。マップとともに移動するには0
 *
 * @arg blendMode
 * @type number
 * @min 0
 * @default 0
 * @text 合成方法
 * @desc 合成方法(0=通常、1=加算、2=乗算、3=スクリーン)...と明らかに最大29の異なるもの
 *
 *
 * @command createStatic
 * @text 静的レイヤーを作成
 * @desc 指定した設定で静的レイヤーを作成します
 *
 * @arg mapId
 * @type number
 * @min 1
 * @default 0
 * @text マップID
 * @desc レイヤーを作成するマップID
 *
 * @arg layerId
 * @type number
 * @min 0
 * @default 0
 * @text レイヤーID
 * @desc 開発中に参照するレイヤーID
 *
 * @arg graphic
 * @text 画像
 * @type file
 * @dir img/layers/
 * @desc 画像ファイル名(/img/layers/内)
 * @default
 *
 * @arg xPosition
 * @text X位置
 * @default 0
 * @desc マップ上の静的レイヤーのx(水平)位置
 *
 * @arg yPosition
 * @text Y位置
 * @default 0
 * @desc マップ上の静的レイヤーのy(垂直)位置
 *
 * @arg opacity
 * @type number
 * @min 0
 * @max 255
 * @default 255
 * @text 不透明度
 * @desc レイヤーの不透明度(0から255)
 *
 * @arg zLevel
 * @default 0
 * @text Zレベル
 * @desc レイヤーのZレベル(負と小数を使用できます) 0=地面、5=全キャラクターの上
 *
 * @arg blendMode
 * @type number
 * @min 0
 * @default 0
 * @text 合成方法
 * @desc 合成方法(0=通常、1=加算、2=乗算、3=スクリーン)...と明らかに最大29の異なるもの
 *
 * @arg xAnchor
 * @default 0
 * @text Xアンカー
 * @desc x値を中心とした画像の位置(左0、中央0.5、右1)
 *
 * @arg yAnchor
 * @default 0
 * @text Yアンカー
 * @desc y値を中心とした画像の位置(左0、中央0.5、右1)
 *
 * @arg char
 * @default 0
 * @text キャラクター
 * @desc なしの場合は0、プレーヤーの場合は-1、静的画像が配置される特定のイベントIDの場合は0より大きい
 *
 * @arg rotate
 * @type number
 * @min 0
 * @max 1
 * @default 0
 * @text 回転
 * @desc キャラクターの向いている方向に合わせて回転。有効:1 / 無効:0
 *
 *
 * @command remove
 * @text レイヤーを削除
 * @desc マップからレイヤーを削除します
 *
 * @arg removeMapId
 * @type number
 * @default 0
 * @text マップID
 * @desc 削除するレイヤを含むマップID
 *
 * @arg removeLayerId
 * @type number
 * @min 0
 * @default 0
 * @text レイヤーID
 * @desc 削除するレイヤーのレイヤーID
 *
 *
 * @command refresh
 * @text レイヤーを更新
 * @desc 現在のマップでレイヤーが追加/削除された場合にのみ実行する必要があります
 *
 *
 * @help
 * 翻訳:ムノクラ
 * https://fungamemake.com/
 * https://twitter.com/munokura/
 *
 * 元プラグイン:
 * https://galvs-scripts.com/2020/08/24/mz-layer-graphics/
 *
 *   Galv's Layer Graphics MZ
 * ---------------------------------------------------------------------------
 * 開始する前に、プロジェクトにレイヤーフォルダーを作成する必要があります。
 * /img/layers/
 * これは、全てのレイヤー画像が取得される場所です。
 *
 * 各マップには多くの画像レイヤーを含めることができますが、
 * マップの数が多いほど、ゲームが重くなる可能性が高くなることに
 * 注意してください(特に低速のコンピューター/モバイルデバイスの場合)。
 *
 * レイヤーは作成されると保存されるので、
 * プレイヤーがマップに入る前にマップのレイヤーを設定できます。
 * レイヤーはマップの作成時に作成されるため、
 * 現在のマップで作成されたレイヤーコマンドの場合、
 * 'Refresh Layer'プラグインコマンドを使用して、
 * 同じマップ上にあるレイヤーを強制的に表示します。
 *
 * ---------------------------------------------------------------------------
 *   プラグインコマンド
 * ---------------------------------------------------------------------------
 *
 * 以下は、使用可能なコマンドとイベントの「プラグインコマンド」です。
 *
 * Create Layer（レイヤーを作成）
 * - 指定されたマップ上のレイヤーの設定を作成します。
 *   現在のマップには0を使用します。
 *
 * Create Static Layer（静的レイヤーを作成）
 * - マップに固定する繰り返しのないレイヤーを作成します。
 *
 * Remove Layer（レイヤーを削除）
 * - 指定されたマップ上のレイヤーを削除します。
 *
 * Refresh Layer（レイヤーを更新）
 * - レイヤーを再表示します。
 *   現在のマップのイベント内に新しいレイヤーを追加する場合のみ必要です。
 *   レイヤーを作成した後は使用する必要はありません。
 *   マップが読み込まれた時、表示されます。
 *
 *
 *
 * 引数の説明:
 * Map ID
 * - レイヤーを作成するマップのID
 * Layer ID
 * - レイヤー自体のID。
 * 既存のレイヤーを変更/削除する場合、IDで参照します。
 * Graphic
 * - 画像のファイル名(/img/layers/内)
 * X Speed
 * -水平移動の速度。負の値は左に行く
 * Y Speed
 * - 垂直移動の速度。負の値は上に行く
 * Opacity
 * - 画像の透明度（0-255）
 * Z Level
 * - 画像の優先度。 0 =グラウンド、5 =全てのキャラクターの上
 * X Shift
 * - プレイヤーの動きとは異なる水平移動シフト
 * Y Shift
 * - プレイヤーの動きとは異なる縦の動きのシフト。
 *   XシフトとYシフト=0にしてマップと一緒に移動します
 * Blend
 * - 合成方法(0=通常、1=加算、2=乗算、3=スクリーン)
 * 29まではモードがあるようです
 *
 * X
 * - 静的レイヤーのx位置。
 * Y
 * - 静的レイヤーのy位置。
 * X Anchor
 * - 左0、中央0.5、右1-上のX位置に設定されている画像の部分。
 * Y Anchor
 * - 左0、中央0.5、右1 - 画像の上のY位置に設定されている部分。
 * Character
 * - なしの場合は0、プレーヤーの場合は-1、特定のイベントの場合は0より上
 * Rotate
 * - キャラクターが向いている方向に応じてスプライトの回転の指定。
 *   回転を有効:1 / 無効:0
 *   用意する画像は下を向いている表示になります。
 *   キャラクターセットがない場合、機能しません
 *
 * ---------------------------------------------------------------------------
 * 変数機能:vXを入力できます。
 * Xは、プラグインコマンドに変数の値を使用する変数IDです。
 *
 * 例:
 * 不透明度の設定にv2を入れると、変数2に保存されている数値が取得され、
 * プラグインコマンドが呼び出されたときに使用されます。
 * ---------------------------------------------------------------------------
 *   マップのメモ
 * ---------------------------------------------------------------------------
 * プラグインコマンドを使用することに加えて、
 * 各マップにレイヤーを設定できます。
 * マップ設定のメモ欄に以下のテキストを使用して行います。
 *
 *   LAYER ID GRAPHIC XSPEED YSPEED OPACITY Z XSHIFT YSHIFT BLEND
 *
 *   LAYER_S ID GRAPHIC X Y OPACITY Z BLEND XANCHOR YANCHOR CHARACTER ROTATE
 *
 * 一番上の例は、視差レイヤーを繰り返す場合です。
 * LAYER_Sは静的レイヤーを追加します。
 * これらのレイヤーは、プラグインコマンドを使用して通常どおり変更できます。
 *
 * メモ欄のテキストの例:
 * LAYER 1 trees 0 0 255 5 10 0 0
 * LAYER_S 2 fog 80 64 85 12 0.5 0.5 0
 * ---------------------------------------------------------------------------
 *
 * ---------------------------------------------------------------------------
 *   スクリプト
 * ---------------------------------------------------------------------------
 * 上級ユーザー向け。レイヤーのプロパティには、スクリプトでアクセスできます。
 * $gameMap.layerSettings[mapId][layerId].property
 *
 * ---------------------------------------------------------------------------
 *
 * ---------------------------------------------------------------------------
 *   スクリプト - 戦闘レイヤー
 * ---------------------------------------------------------------------------
 *
 *   Galv.LG.bLayer(id,'graphic',xspeed,yspeed,opacity,z,blend);
 *
 * 戦闘レイヤーはこのスクリプトで制御されます。
 * プラグインコマンドは使用しませんが、
 * 値は上記のプラグインコマンドと同じです(マップIDなし)。
 * 一度設定すると、戦闘レイヤーは変更されるまで、全ての戦闘で持続します。
 *
 * BATTLE Z LEVEL
 * - 少し異なります。小数は使用できません。
 * 0
 * - 敵の後ろ
 * 2
 * - 敵に等しい(おそらくこれは使わないでしょう)
 * 3+
 * - 敵の上
 *
 * レイヤーを削除するには、IDのみを指定して同じ呼び出しを使用します。
 * 例:
 *
 *   Galv.LG.bLayer(id);
 *
 * ---------------------------------------------------------------------------
 */

//-----------------------------------------------------------------------------
//  CODE STUFFS
//-----------------------------------------------------------------------------

// LAYER GRAPHIC FOLDER
//-----------------------------------------------------------------------------
ImageManager.loadLayerGraphic = function(filename, hue) {
    return this.loadBitmap('img/layers/', filename, hue, true);
};


// PLUGIN COMMANDS
//-----------------------------------------------------------------------------

PluginManager.registerCommand(Galv.LG.pluginName, "create", args => {
    Galv.LG.createLayer(Object.values(args));  // Send an array of the setting values
});
 
PluginManager.registerCommand(Galv.LG.pluginName, "refresh", args => {
    SceneManager._scene._spriteset.createLayerGraphics();  // Refresh layer graphics in spriteset
});

PluginManager.registerCommand(Galv.LG.pluginName, "remove", args => {
	// Remove specified layer object
	let mapid = Galv.LG.num(args.removeMapId);
	mapid = mapid === 0 ? $gameMap.mapId() : mapid;
	let id = Galv.LG.num(args.removeLayerId);
	$gameMap.layerSettings[mapid][id] = id >= 0 ? {} : $gameMap.layerSettings[mapid];
});

PluginManager.registerCommand(Galv.LG.pluginName, "createStatic", args => {
    Galv.LG.createLayerS(Object.values(args));  // Send an array of the setting values
});


// CREATE TILING LAYER
//-----------------------------------------------------------------------------

Galv.LG.createLayer = function(config) {
	// get variables
	let mapid = Galv.LG.num(config[0]);
	mapid = mapid === 0 ? $gameMap.mapId() : mapid;
	let id = Galv.LG.num(config[1]);
	$gameMap.layerSettings[mapid] = $gameMap.layerSettings[mapid] || {};
	$gameMap.layerSettings[mapid][id] = $gameMap.layerSettings[mapid][id] || {};
	
	let x_exist = $gameMap.layerSettings[mapid][id].currentx || 0;
	let y_exist = $gameMap.layerSettings[mapid][id].currenty || 0;
	
	// create object
	$gameMap.layerSettings[mapid][id] = {
		graphic: config[2],                      // filename of the graphic in /img/layers/
		xspeed: Galv.LG.num(config[3]),          // speed the layer will scroll horizontally
		yspeed: Galv.LG.num(config[4]),          // speed the layer will scroll vertically
		opacity: Galv.LG.num(config[5]),         // the opacity of the layer
		z: Galv.LG.num(config[6]),               // what level the layer is displayed at (ground is 0)
		xshift: Galv.LG.num(config[7]),          // Moves the layer at a different x amount than the map (0 to not move)
		yshift: Galv.LG.num(config[8]),          // Moves the layer at a different y amount than the map (0 to not move)
		blend: Galv.LG.num(config[9]),           // Blend mode  (0 = normal, 1 = add, 2 = multiply, 3 = screen)
		currentx: x_exist,                       // origin x saved. Reset this on map change
		currenty: y_exist,                       // origin y saved. Reset this on map change
	};
};


// CREATE STATIC LAYER
//-----------------------------------------------------------------------------

Galv.LG.createLayerS = function(config) {
	// get variables
	let mapid = Galv.LG.num(config[0]);
	let id = Galv.LG.num(config[1]);
	$gameMap.layerSettings[mapid] = $gameMap.layerSettings[mapid] || {};
	$gameMap.layerSettings[mapid][id] = $gameMap.layerSettings[mapid][id] || {};
	
	// create object
	$gameMap.layerSettings[mapid][id] = {
		static: true,               // determines static layer
		graphic: config[2],         // filename of the graphic in /img/layers/
		x: Galv.LG.num(config[3]),          // speed the layer will scroll horizontally
		y: Galv.LG.num(config[4]),          // speed the layer will scroll vertically
		opacity: Galv.LG.num(config[5]),         // the opacity of the layer
		z: Galv.LG.num(config[6]),               // what level the layer is displayed at (ground is 0)
		blend: Galv.LG.num(config[7]),           // Blend mode  (0 = normal, 1 = add, 2 = multiply, 3 = screen)
		xa: config[8] ? Galv.LG.num(config[8]) : 0,     // xanchor (0-1)
		ya: config[9] ? Galv.LG.num(config[9]) : 0,     // yanchor (0-1)
		character: config[10] ? Galv.LG.num(config[10]) : 0,  // designated character to follow (-1 player, 0 none, >0 event id
		rotate: config[11] ? Galv.LG.num(config[11]) : 0,     // rotate? 0 for no, 1 for yes
	};

};


// BATTLE LAYERS
//-----------------------------------------------------------------------------

Galv.LG.bLayer = function(id,graphic,xspeed,yspeed,opacity,z,blend) {
	if (!graphic) {
		if ($gameSystem._bLayers[id]) delete($gameSystem._bLayers[id]);
		return;
	};

	// create object
	$gameSystem._bLayers[id] = {
		graphic: graphic || '',         // filename of the graphic in /img/layers/
		xspeed: xspeed || 0,            // speed the layer will scroll horizontally
		yspeed: yspeed || 0,            // speed the layer will scroll vertically
		opacity: opacity || 0,          // the opacity of the layer
		z: z || 0,                      // what level the layer is displayed at (ground is 0)
		blend: blend || 0,              // Blend mode  (0 = normal, 1 = add, 2 = multiply, 3 = screen)
		xshift: 0,
		yshift: 0,
		currentx: 0,
		currenty: 0
	};
};


// OTHER
//-----------------------------------------------------------------------------

Galv.LG.num = function(txt) {
	if (txt[0] === "v") {
		let varId = Number(txt.replace("v",""));
		return $gameVariables.value(varId);
	} else {
		return Number(txt);
	};
};

Galv.LG.isEmpty = function(obj) {
	return Object.keys(obj).length === 0;
};



// GAME SYSTEM - BATTLE LAYERS
//-----------------------------------------------------------------------------

Galv.LG.Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
	Galv.LG.Game_System_initialize.call(this);
	this._bLayers = {};   // Store battle layers here.
};


// SPRITESET BATTLE
//-----------------------------------------------------------------------------

Galv.LG.Spriteset_Battle_createlowerlayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
    Galv.LG.Spriteset_Battle_createlowerlayer.call(this);
	for (let i = 0; i < this._battleField.children.length; i++) {
		this._battleField.children[i].z = 2 + (0.01 * i);
	};
	this.layerGraphics = this.layerGraphics || {};
	this.createLayerGraphics();
};

if (PluginManager.parameters('Galv_LayerGraphicsMZ').fixPosition) {
	// Only do this if setting is set in plugin
	Galv.LG.Spriteset_Battle_createBattleField = Spriteset_Battle.prototype.createBattleField;
	Spriteset_Battle.prototype.createBattleField = function() {
		Galv.LG.Spriteset_Battle_createBattleField.call(this);
		// Haven't seen the reason for the yOffset or 4px x offset yet. Making this 0.
		this._battleField.x = 0;
		this._battleField.y = 0;
	};
};

Spriteset_Battle.prototype.createLayerGraphics = function() {
    // Create Active Layers On Map
	let blayers = $gameSystem._bLayers; // get object only for the map

	for (let propertyId in blayers) {
		// if layers sprite doesn't exist, make it.
		if (!this.layerGraphics.hasOwnProperty(propertyId)) {
			// Create Layer Sprite
			if (blayers[propertyId]) {
				this.layerGraphics[propertyId] = new Sprite_LayerGraphic(propertyId,true);
				this.layerGraphics[propertyId].move(0, 0, Graphics.width, Graphics.height);
			};
		};

		// If settings are empty for the layer
		if (Galv.LG.isEmpty(blayers[propertyId]) || blayers[propertyId]["graphic"] == "") {
			let ind = this._battleField.children.indexOf(this.layerGraphics[propertyId]);
			this._battleField.removeChildAt(ind);
		} else {
			let z = blayers[propertyId].z;
			this._battleField.addChildAt(this.layerGraphics[propertyId],z);
		};
	};
};


// SPRITESET MAP
//-----------------------------------------------------------------------------

Galv.LG.Spriteset_Map_createlowerlayer = Spriteset_Map.prototype.createLowerLayer;
Spriteset_Map.prototype.createLowerLayer = function() {
    Galv.LG.Spriteset_Map_createlowerlayer.call(this);
	this.layerGraphics = this.layerGraphics || {};
	this.createLayerGraphics();
};
    
Spriteset_Map.prototype.createLayerGraphics = function() {
    // Create Active Layers On Map on map load
	let mapGraphics = $gameMap.layerConfig(); // get object for the current map

	for (let id in mapGraphics) {
		// if layers sprite doesn't exist, make it.
		if (!this.layerGraphics[id] || !this.layerGraphics[id].id) {
			// Create Layer Sprite
			if (mapGraphics[id]) {
				if (mapGraphics[id].static) { // If layer created using LAYER_S
					this.layerGraphics[id] = new Sprite_LayerGraphicS(id); // Create a static layer
				} else {
					this.layerGraphics[id] = new Sprite_LayerGraphic(id); // Create a parallax layer
					this.layerGraphics[id].move(0, 0, Graphics.width, Graphics.height);
				};
			};
		};

		// If settings are empty for the layer
		if (Galv.LG.isEmpty(mapGraphics[id]) || mapGraphics[id]["graphic"] == "") {
			let ind = this._tilemap.children.indexOf(this.layerGraphics[id]);
			this._tilemap.removeChildAt(ind);
		} else {
			this._tilemap.addChild(this.layerGraphics[id]);
		};
	};
};


// GAME MAP - SETUP LAYER SETTINGS
//-----------------------------------------------------------------------------
Galv.LG.Game_Map_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
	Galv.LG.Game_Map_initialize.call(this);
	this.layerSettings = {};   // Store ALL layers in this object.
};

Galv.LG.Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
	Galv.LG.Game_Map_setup.call(this,mapId);
	this.layerSettings[mapId] = this.layerSettings[mapId] || {}

	// Setup map notetag layers
	this.createNoteLayers(mapId);
	
	for (let obj in this.layerConfig()) {
		obj.currentx = 0;
		obj.currenty = 0;
	};
};

Game_Map.prototype.createNoteLayers = function(mapId) {
	// CREATE MAP NOTE CONFIG HERE
	let txtArray = $dataMap.note.match(/[^\r\n]+/g);
	if (!txtArray) return;

	for (i = 0; i < txtArray.length; i++) {
		if (txtArray[i].indexOf("LAYER ") >= 0) {
			let config = (mapId + txtArray[i].replace('LAYER','')).split(" ");
			// If layer doesn't already exist, create it:
			if (!this.layerSettings[mapId][Number(config[1])]) {
				Galv.LG.createLayer(config);
			};
		};
		if (txtArray[i].indexOf("LAYER_S ") >= 0) {
			let config = (mapId + txtArray[i].replace('LAYER_S','')).split(" ");
			// If layer doesn't already exist, create it:
			if (!this.layerSettings[mapId][Number(config[1])]) {
				Galv.LG.createLayerS(config);
			};
		};
	};
};

Game_Map.prototype.layerConfig = function() {
	// Get object list from layerSettings
	if (this.layerSettings[this.mapId()]) {
		return this.layerSettings[this.mapId()];
	} else {
		this.layerSettings[this.mapId()] = {}
		return this.layerSettings[this.mapId()];
	};
};


// CREATE LAYER TILING SPRITE
//-----------------------------------------------------------------------------

function Sprite_LayerGraphic() {
    this.initialize(...arguments);
}

Sprite_LayerGraphic.prototype = Object.create(TilingSprite.prototype);
Sprite_LayerGraphic.prototype.constructor = Sprite_LayerGraphic;

Sprite_LayerGraphic.prototype.initialize = function(id,battle) {
	this.id = id;
	this._tileSize = $gameMap.tileWidth();

	if (battle) {
		this.lValue = this.lBValue;
		this.displayX = this.displayXBattle;
		this.displayY = this.displayYBattle;
	};
    TilingSprite.prototype.initialize.call(this);
	this.currentGraphic = "";
    this.createBitmap();
    this.update();
};

/*
// TEMP CANVAS FIX FOR WHEN REFRESHING LAYERS ON MAP
Sprite_LayerGraphic.prototype.generateTilingTexture = function(arg) {
    PIXI.TilingSprite.prototype.generateTilingTexture.call(this, arg);
    // Purge from Pixi's Cache
    if (this.tilingTexture && this.tilingTexture.canvasBuffer)
        PIXI.Texture.removeTextureFromCache(this.tilingTexture.canvasBuffer.canvas._pixiId);
};
// - END - TEMP CANVAS FIX FOR WHEN REFRESHING LAYERS ON MAP
*/

Sprite_LayerGraphic.prototype.createBitmap = function() {
	if (Galv.LG.isEmpty(this.lValue())) {
		this.bitmap = ImageManager.loadLayerGraphic("");
	} else {
		this.bitmap = ImageManager.loadLayerGraphic(this.lValue().graphic);
	};
	this.z = this.lValue().z;
};

Sprite_LayerGraphic.prototype.lValue = function() {
	return $gameMap.layerConfig()[this.id];
};

Sprite_LayerGraphic.prototype.lBValue = function() {
	return $gameSystem._bLayers[this.id];
};

// Update
Sprite_LayerGraphic.prototype.update = function() {
	TilingSprite.prototype.update.call(this);
	if (this.currentGraphic !== this.lValue().graphic) {
		this.createBitmap();
		this.currentGraphic = this.lValue().graphic;
	};
	this.updatePosition();
};

// Update Position
Sprite_LayerGraphic.prototype.updatePosition = function() {
	this.z = this.lValue().z || 0;
	this.opacity = this.lValue().opacity || 0;
	this.blendMode = this.lValue().blend || 0;
	
	this.origin.x = 0 + this.displayX() * this._tileSize + this.lValue().currentx + this.xOffset();
	this.origin.y = 0 + this.displayY() * this._tileSize + this.lValue().currenty + this.yOffset();
	this.lValue().currentx += this.lValue().xspeed;
	this.lValue().currenty += this.lValue().yspeed;
};

Sprite_LayerGraphic.prototype.xOffset = function() {
	return this.displayX() * this.lValue().xshift;
};

Sprite_LayerGraphic.prototype.yOffset = function() {
	return this.displayY() * this.lValue().yshift;
};

Sprite_LayerGraphic.prototype.displayX = function() {
	return $gameMap.displayX();
};
Sprite_LayerGraphic.prototype.displayY = function() {
	return $gameMap.displayY();
};

Sprite_LayerGraphic.prototype.displayXBattle = function() {
	return 0;
};
Sprite_LayerGraphic.prototype.displayYBattle = function() {
	return 0;
};


// CREATE STATIC LAYER SPRITE
//-----------------------------------------------------------------------------
function Sprite_LayerGraphicS(id) {
	this.id = id;
    this.initialize(...arguments);
}

Sprite_LayerGraphicS.prototype = Object.create(Sprite.prototype);
Sprite_LayerGraphicS.prototype.constructor = Sprite_LayerGraphicS;

Sprite_LayerGraphicS.prototype.initialize = function() {
    Sprite.prototype.initialize.call(this);
	this._rVals = [
				0,			// Can't have direction 0
				0.785398,	// 45 degrees
				0,			// 0 degrees
				5.49779,	// 315 degrees
				1.5708,		// 90 degrees
				0,			// Can't have direction 5
				4.71239,	// 270 degrees
				2.35619,	// 135 degrees
				3.14159,	// 180 degrees
				3.92699		// 225 degrees
			];
	
	this._tileSize = $gameMap.tileWidth();
	this.currentGraphic = "";
    this.createBitmap();
    this.update();
};

Sprite_LayerGraphicS.prototype.createBitmap = function(val) {
	val = val || this.lValue();
	if (Galv.LG.isEmpty($gameMap.layerConfig()[this.id])) {
		this.bitmap = ImageManager.loadLayerGraphic("");
	} else {
		this.bitmap = ImageManager.loadLayerGraphic(val.graphic);
	};
	this.z = val.z;
};

Sprite_LayerGraphicS.prototype.lValue = function() {
	return $gameMap.layerConfig()[this.id];
};

// Update
Sprite_LayerGraphicS.prototype.update = function() {
	Sprite.prototype.update.call(this);
	let val = this.lValue();
	if (this.currentGraphic !== val.graphic) {
		this.createBitmap(val);
		this.currentGraphic = val.graphic;
	};
	this.updatePosition(val);
};

// Update Position
Sprite_LayerGraphicS.prototype.updatePosition = function(val) {	
	this.z = val.z || 0;
	this.opacity = val.opacity || 0;
	this.blendMode = val.blend || 0;
	
	if (val.character) {
		// get character object
		let char = val.character > 0 ? $gameMap.event(val.character) : $gamePlayer;
		
		// set x,y to character's x,y
		let center = this._tileSize / 2;
		let tx = char._realX * this._tileSize + center;
		let ty = char._realY * this._tileSize + center;
		this.x = tx - $gameMap.displayX() * this._tileSize;
		this.y = ty - $gameMap.displayY() * this._tileSize;
		
		// rotate
		if (val.rotate) {
			this.rotation = this._rVals[char._direction];
		} else {
			this.rotation = 0;
		}	
	} else {
		this.x = val.x - $gameMap.displayX() * this._tileSize;
		this.y = val.y - $gameMap.displayY() * this._tileSize;
		this.rotation = 0;
	}
	this.anchor.x = val.xa;
	this.anchor.y = val.ya;
};