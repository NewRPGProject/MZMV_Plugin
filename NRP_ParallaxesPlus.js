//=============================================================================
// NRP_ParallaxesPlus.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.001 Display parallaxes freely.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/488413806.html
 *
 * @help Provides the ability to display parallaxes at will.
 * You can display as many parallaxes as you like,
 * at any coordinates, in any range, and with any display priority.
 * They can also be used during battle.
 * 
 * Although the term "parallax" is used,
 * it can be used for various purposes by changing the display priority.
 * ※e.g., clouds displayed on top of a map.
 * 
 * You can also change the settings of the parallaxes once displayed.
 * Feel free to change the scrolling speed and display coordinates.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Invoke plugin commands as needed.
 * 
 * Note that there is no function to reflect the map settings themselves.
 * I think it would be better to use parallel processing (+Erase Event),
 * etc., to display the map immediately after the map starts.
 * 
 * -------------------------------------------------------------------
 * [Plugin Commands MZ]
 * -------------------------------------------------------------------
 * ◆AddParallax
 * Add Parallax to the current map or battle screen.
 * See [Setting Items] for details.
 * 
 * ◆ChangeParallax
 * Manipulate & change Parallax information for the specified ID.
 * Unspecified items inherit the settings at the time of creation.
 * 
 * ◆RemoveParallax
 * Removes the Parallax with the specified ID.
 * If ID is not specified, all Parallaxes will be removed.
 * 
 * -------------------------------------------------------------------
 * [Script For MV]
 * -------------------------------------------------------------------
 * This plugin does not support plugin commands for MV,
 * but can be called from MV via an external plugin.
 * 
 * The following is an example using callPluginCommandMZ.js(unagi ootoro).
 * https://raw.githubusercontent.com/unagiootoro/RPGMZ/master/callPluginCommandMZ.js
 * 
 * Note that it is executed by a script, not a plugin command.
 * ※Check the definitions of item
 *   and command names in the JS file on your own.
 * -------------------------------------------------------------------
 * // Basic
 * const args = {};
 * args.Image = "StarlitSky"; // parallaxes file
 * args.Z = 0.5;
 * args.MapX = 2;
 * args.MapY = 2;
 * args.Width = 240;
 * args.Height= 240;
 * args.ParallaxTile = true;
 * 
 * // Options
 * args.Options = {};
 * args.Options.BlendMode = 1;
 * 
 * // execute
 * callPluginCommand(this, "NRP_ParallaxesPlus", "AddParallax", args);
 * 
 * -------------------------------------------------------------------
 * [Setting Items]
 * -------------------------------------------------------------------
 * Items that can be used with the plugin commands
 * (AddParallax / ChangeParallax).
 * The basic items are the same as for normal Parallax,
 * but some of them are explained below.
 * 
 * ◆Z
 * Z coordinate (priority) to be displayed.
 * The meaning of the Z-coordinate is as follows.
 *
 * 0 : Lower tiles
 * 1 : Lower characters
 * 3 : Normal characters
 * 4 : Upper tiles
 * 5 : Upper characters
 * 6 : Airship shadow
 * 7 : Balloon
 * 8 : Animation
 * 9 : Touch Operation Destination
 * 
 * For example, if you want to display between "Lower tiles"
 * and "Lower characters", you can set a value such as "z = 0.5".
 * The default value is -1,
 * because it is displayed below the Lower tiles.
 * 
 * Note that it cannot be displayed
 * below the standard Parallax of RPG Maker.
 * 
 * ◆ParallaxTile
 * Make Parallax scroll the same way as tiles when the screen scrolls.
 * (Same behavior as when the filename is prefixed
 *  with ! at the beginning of the filename)
 * 
 * For more detailed settings, see "Options > ParallaxX, ParallaxY".
 * 
 * ◆MapX, MapY
 * Place Parallax at the specified coordinates on the map.
 * The specified coordinates will be the starting point (upper left).
 * The end point should be controlled by "Width" and "Height".
 * 
 * ◆Options > ParallaxX, ParallaxY
 * Set the details of the linkage method when scrolling the screen.
 * Settings take precedence over "ParallaxTile".
 * 
 * "Screen" is not affected by scrolling at all.
 * "Tile" scrolls like a tile. (Same as ParallaxTile)
 * "1/2 Speed" scrolls at 1/2 the speed of tile.
 *  (Same behavior as when Loop Horizontally / Vertically is turned on)
 * 
 * If not specified, it will be "Screen", but if the filename
 * starts with "! at the beginning of the file name,
 * it will be treated as a "Tile".
 * 
 * You can also set other numbers
 * by changing to text mode when entering.
 * For example, if you set 2,
 * it will scroll twice as fast as the tile.
 * 
 * ◆Options > NoLoopX, NoLoopY
 * Displays images that do not loop like pictures.
 * 
 * -------------------------------------------------------------------
 * [Behavior during battle]
 * -------------------------------------------------------------------
 * It behaves much the same as the map scene,
 * but with the following caveats.
 * 
 * ◆Z
 * Setting Z-coordinates does not work by default.
 * Must be used in conjunction with a plugin that enables
 * Z-coordinate sorting (display priority change),
 * such as NRP_DynamicMotionMZ.js.
 * 
 * Also, by default, Parallax cannot be displayed
 * behind the battle background.
 * If necessary, turn on the plugin parameter "UseBattlebackSort".
 * 
 * ◆MapX, MapY
 * The behavior is almost the same as in the map scene.
 * During battle, there are no tiles, so 1 square = 48 pixels.
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
 * @------------------------------------------------------------------
 * @ [Plugin Commands]
 * @------------------------------------------------------------------
 * 
 * @command AddParallax
 * @desc Add Parallax to the current map or battle screen.
 * 
 * @arg Id
 * @desc ID to manage Parallax.
 * Can be omitted if no further operations are performed.
 * 
 * @arg Image
 * @type file
 * @dir img/parallaxes/
 * @desc Parallax image file to be displayed.
 * 
 * @arg Z
 * @default -1
 * @desc Priority. 0:Lower tile, 1:Lower character, 3:Normal character,
 * 4:Upper tile, 5:Upper character, 7:Balloon, 8:Animation
 * 
 * @arg ParallaxTile
 * @type boolean
 * @desc When scrolling the screen, link Parallax to the tiles.
 * If not specified, the file name ! in the file name.
 * 
 * @arg ScrollX
 * @type string
 * @desc Horizontal scrolling speed. Formula available.
 * 
 * @arg ScrollY
 * @type string
 * @desc Vertical scrolling speed. Formula available.
 * 
 * @arg MapX
 * @desc X-coordinate of the map where the image will be placed.
 * 1 square = 48 pixels, even in battle. Formula available.
 * 
 * @arg MapY
 * @desc Y-coordinate of the map where the image will be placed.
 * 1 square = 48 pixels, even in battle. Formula available.
 * 
 * @arg Width
 * @desc Width to display Parallax. Formula available.
 * 
 * @arg Height
 * @desc Height to display Parallax. Formula available.
 * 
 * @arg Opacity
 * @type number
 * @max 255
 * @default 255
 * @desc The opacity of the image; 255 makes it completely opaque.
 * 
 * @arg Options
 * @type struct<Option>
 * 
 * @------------------------------------------------------------------
 * 
 * @command ChangeParallax
 * @desc Manipulate & change Parallax information for the specified ID.
 * Unspecified items inherit the settings at the time of creation.
 * 
 * @arg Id
 * @desc ID of the Parallax to be operated.
 * 
 * @arg Image
 * @type file
 * @dir img/parallaxes/
 * @desc Parallax image file to be displayed.
 * 
 * @arg Z
 * @desc Priority. 0:Lower tile, 1:Lower character, 3:Normal character,
 * 4:Upper tile, 5:Upper character, 7:Balloon, 8:Animation
 * 
 * @arg ParallaxTile
 * @type boolean
 * @desc When scrolling the screen, link Parallax to the tiles.
 * If not specified, the file name ! in the file name.
 * 
 * @arg ScrollX
 * @type string
 * @desc Horizontal scrolling speed. Formula available.
 * 
 * @arg ScrollY
 * @type string
 * @desc Vertical scrolling speed. Formula available.
 * 
 * @arg MapX
 * @desc X-coordinate of the map where the image will be placed.
 * 1 square = 48 pixels, even in battle. Formula available.
 * 
 * @arg MapY
 * @desc Y-coordinate of the map where the image will be placed.
 * 1 square = 48 pixels, even in battle. Formula available.
 * 
 * @arg Width
 * @desc Width to display Parallax. Formula available.
 * 
 * @arg Height
 * @desc Height to display Parallax. Formula available.
 * 
 * @arg Opacity
 * @type number
 * @max 255
 * @desc The opacity of the image; 255 makes it completely opaque.
 * 
 * @arg Options
 * @type struct<Option>
 * 
 * @------------------------------------------------------------------
 * 
 * @command RemoveParallax
 * @desc Removes the Parallax with the specified ID.
 * If ID is not specified, all Parallaxes will be removed.
 * 
 * @arg Id
 * @desc ID of the Parallax to be removed.
 * 
 * @------------------------------------------------------------------
 * @ [Plugin Parameters]
 * @------------------------------------------------------------------
 * @param UseBattlebackSort
 * @type boolean
 * @default false
 * @desc Activate the display priority (Z-sort) of the battleback.
 * Be sure to use in conjunction with a plugin that performs Z-sort.
 * 
 * @param Battleback1Z
 * @parent UseBattlebackSort
 * @type number @min -99999 @max 99999 @decimals 2
 * @default 0
 * @desc Display priority for Battle Background 1 (below).
 * 
 * @param Battleback2Z
 * @parent UseBattlebackSort
 * @type number @min -99999 @max 99999 @decimals 2
 * @default 0.5
 * @desc Display priority for Battle Background 2 (above).
 */
//-----------------------------------------------------------------------------
// Option
//-----------------------------------------------------------------------------
/*~struct~Option:
 * @param ShiftX
 * @desc Adjustment value for the X-coordinate at which the image is displayed. Formula available.
 * 
 * @param ShiftY
 * @desc Adjustment value for the Y-coordinate at which the image is displayed. Formula available.
 * 
 * @param ParallaxX
 * @type select
 * @option @value
 * @option Screen @value 0
 * @option Tile @value 1
 * @option 1/2 Speed @value 0.5
 * @desc Sets the parallax in the horizontal direction when scrolling the screen.
 * 
 * @param ParallaxY
 * @type select
 * @option @value
 * @option Screen @value 0
 * @option Tile @value 1
 * @option 1/2 Speed @value 0.5
 * @desc Sets the parallax in the vertical direction when scrolling the screen.
 * 
 * @param NoLoopX
 * @type boolean
 * @desc Disables the parallax horizontal loop to match the image width.
 * Takes precedence over the width specification.
 * 
 * @param NoLoopY
 * @type boolean
 * @desc Disables the parallax vertical loop to match the image width.
 * Takes precedence over the height specification.
 * 
 * @param BlendMode
 * @type select
 * @option 0:Normal @value 0
 * @option 1:Add @value 1
 * @option 2:Multiply @value 2
 * @option 3:Screen @value 3
 * @desc This is a method of blending images.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.001 自在に遠景（近景）を表示します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/488413806.html
 *
 * @help 自在に遠景（近景）を表示する機能を提供します。
 * 好きな座標、好きな範囲、好きな表示優先度で、
 * 好きなだけ遠景を表示できます。
 * また、戦闘時にも使用可能です。
 * 
 * 『遠景』という言葉を使用していますが、
 * 表示優先度を変更すれば、近景として表示することもできます。
 * ※例：マップの上に表示する雲など。
 * 
 * 一度表示した遠景の設定を変更することもできます。
 * スクロール速度や表示座標を自由に変更してください。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * 必要に応じてプラグインコマンドを呼び出してください。
 * 
 * なお、マップの設定自体に反映させる機能はありません。
 * 並列処理（＋イベントの一時消去）などを利用して、
 * マップ開始直後に表示すればよいと思います。
 * 
 * -------------------------------------------------------------------
 * ■プラグインコマンド（ＭＺ）
 * -------------------------------------------------------------------
 * ◆遠景を追加
 * 遠景（近景）を現在のマップまたは戦闘画面に作成＆追加します。
 * 詳細は『設定項目』をご覧ください。
 * 
 * ◆遠景を変更
 * 指定ＩＤの遠景（近景）情報を操作＆変更します。
 * 未指定の項目は作成時の設定を引き継ぎます。
 * 
 * ◆遠景を削除
 * 指定したＩＤの遠景（近景）を削除します。
 * ＩＤ未指定なら全削除します。
 * 
 * -------------------------------------------------------------------
 * ■スクリプト（ＭＶ）
 * -------------------------------------------------------------------
 * 当プラグインはＭＶ用のプラグインコマンドに対応していませんが、
 * 外部プラグインを経由すれば、ＭＶから呼び出すことも可能です。
 * 
 * 以下はcallPluginCommandMZ.js（うなぎおおとろ様）を使用した例です。
 * https://raw.githubusercontent.com/unagiootoro/RPGMZ/master/callPluginCommandMZ.js
 * 
 * プラグインコマンドではなく、スクリプトで実行することに注意してください。
 * ※項目名、コマンド名は自力でJSファイル内の定義を確認してください。
 * -------------------------------------------------------------------
 * // 基本項目
 * const args = {};
 * args.Image = "StarlitSky"; // parallaxesのファイル
 * args.Z = 0.5;
 * args.MapX = 2;
 * args.MapY = 2;
 * args.Width = 240;
 * args.Height= 240;
 * args.ParallaxTile = true;
 * 
 * // オプション項目
 * args.Options = {};
 * args.Options.BlendMode = 1;
 * 
 * // 実行
 * callPluginCommand(this, "NRP_ParallaxesPlus", "AddParallax", args);
 * 
 * -------------------------------------------------------------------
 * ■設定項目
 * -------------------------------------------------------------------
 * プラグインコマンド（遠景を追加・変更）で使用できる項目です。
 * 基本的な項目は通常の遠景に準じますが、一部を解説します。
 * 
 * ◆Ｚ座標
 * 表示する優先度です。
 * Ｚ座標の意味は以下の通りです。
 *
 * 0 : 下層タイル
 * 1 : 通常キャラの下
 * 3 : 通常キャラ
 * 4 : 上層タイル
 * 5 : 通常キャラの上
 * 6 : 飛行船の影
 * 7 : 吹き出し
 * 8 : アニメーション
 * 9 : タッチ操作の移動先
 * 
 * 例えば『下層タイル』と『通常キャラの下』の間に表示をしたい場合は
 * 『z = 0.5』などの値を設定できます。
 * 初期値は-1としていますが、これは下層タイルよりも下に表示するためです。
 * 
 * なお、ツクール標準の遠景より下に表示することはできません。
 * 
 * ◆視差をタイルに連動
 * 画面スクロール時に遠景をタイルと同じようにスクロールさせます。
 * （ファイル名の先頭に!を付けた時の動作と同じ）
 * 
 * さらに詳細な設定を行う場合は、
 * 『オプション　＞　Ｘ、Ｙ方向の視差』をご覧ください。
 * 
 * ◆マップＸ、Ｙ座標
 * マップ上の指定した座標に遠景を配置します。
 * 指定した座標が始点（左上）になります。
 * 終点は『横幅』『縦幅』で制御してください。
 * 
 * ◆オプション　＞　Ｘ、Ｙ方向の視差
 * 画面スクロール時の連動方法を詳細に設定します。
 * 設定は『視差をタイルに連動』よりも優先されます。
 * 
 * 『画面固定』はスクロールの影響を一切受けません。
 * 『タイル』はタイルと同じようにスクロールします。
 * （視差をタイルに連動と同じ）
 * 『1/2倍速』はタイルの1/2倍速でスクロールします。
 * （横／縦方向にループをオンにした時の動作と同じ）
 * 
 * 未指定の場合は『画面固定』になりますが、
 * ファイル名の先頭が『!』ならば『タイル』として扱います。
 * 
 * また、入力時にテキストモードへ変更すれば、
 * それ以外の数値も設定できます。
 * 例えば、2を設定すればタイルの２倍速でスクロールします。
 * 
 * ◆オプション　＞　ループなし（横／縦）
 * ピクチャのようにループしない画像表示を行います。
 * 
 * -------------------------------------------------------------------
 * ■戦闘中の挙動について
 * -------------------------------------------------------------------
 * マップ画面とほぼ同じ挙動ですが、以下の注意点があります。
 * 
 * ◆Ｚ座標
 * 標準ではＺ座標を設定しても機能しません。
 * NRP_DynamicMotionMZ.jsなどのＺ座標ソート（表示優先度変更）を
 * 有効にするプラグインと併用する必要があります。
 * 
 * また、初期状態では戦闘背景より後ろに遠景を表示することはできません。
 * 必要な場合はプラグインパラメータの
 * 『戦闘背景の表示優先度を設定』をオンにしてください。
 * 
 * ◆マップＸ、Ｙ座標
 * マップ画面とほぼ同じ挙動になります。
 * 戦闘中はタイルが存在しませんので、1マス=48ピクセルとして計算します。
 * 
 * -------------------------------------------------------------------
 * ■利用規約
 * -------------------------------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @------------------------------------------------------------------
 * @ プラグインコマンド
 * @------------------------------------------------------------------
 * 
 * @command AddParallax
 * @text 遠景を追加
 * @desc 遠景（近景）を現在のマップまたは戦闘画面に追加します。
 * 
 * @arg Id
 * @text ＩＤ
 * @desc 遠景を管理するＩＤです。
 * 以降の操作を行わない場合は省略可能です。
 * 
 * @arg Image
 * @text 画像
 * @type file
 * @dir img/parallaxes/
 * @desc 表示する遠景の画像ファイルです。
 * 
 * @arg Z
 * @text Ｚ座標
 * @default -1
 * @desc 表示優先度。0:下層, 1:キャラ下, 3:キャラ, 4:上層
 * 5:キャラ上, 6:飛行船影, 7:フキダシ, 8:アニメ, 9:目的地
 * 
 * @arg ParallaxTile
 * @text 視差をタイルに連動
 * @type boolean
 * @desc 画面スクロール時、遠景をタイルに連動させます。
 * 未指定の場合はファイル名の!で判定します。
 * 
 * @arg ScrollX
 * @text Ｘ方向のスクロール
 * @type string
 * @desc 横方向へのスクロール速度です。数式可。
 * 
 * @arg ScrollY
 * @text Ｙ方向のスクロール
 * @type string
 * @desc 縦方向へのスクロール速度です。数式可。
 * 
 * @arg MapX
 * @text マップＸ座標
 * @desc 画像を配置するマップのＸ座標です。数式可。
 * 戦闘時も1マス=48ピクセルで計算。
 * 
 * @arg MapY
 * @text マップＹ座標
 * @desc 画像を配置するマップのＹ座標です。数式可。
 * 戦闘時も1マス=48ピクセルで計算。
 * 
 * @arg Width
 * @text 横幅
 * @desc 遠景を表示する横幅です。数式可。
 * 
 * @arg Height
 * @text 縦幅
 * @desc 遠景を表示する縦幅です。数式可。
 * 
 * @arg Opacity
 * @text 不透明度
 * @type number
 * @max 255
 * @default 255
 * @desc 画像の不透明度です。0～255が有効。
 * 
 * @arg Options
 * @text オプション
 * @type struct<Option>
 * 
 * @------------------------------------------------------------------
 * 
 * @command ChangeParallax
 * @text 遠景を変更
 * @desc 指定ＩＤの遠景（近景）情報を操作＆変更します。
 * 未指定の項目は作成時の設定を引き継ぎます。
 * 
 * @arg Id
 * @text ＩＤ
 * @desc 操作対象とする遠景のＩＤです。
 * 
 * @arg Image
 * @text 画像
 * @type file
 * @dir img/parallaxes/
 * @desc 表示する遠景の画像ファイルです。
 * 
 * @arg Z
 * @text Ｚ座標
 * @desc 表示優先度。0:下層, 1:キャラ下, 3:キャラ, 4:上層
 * 5:キャラ上, 6:飛行船影, 7:フキダシ, 8:アニメ, 9:目的地
 * 
 * @arg ParallaxTile
 * @text 視差をタイルに連動
 * @type boolean
 * @desc 画面スクロール時、遠景をタイルに連動させます。
 * 未指定の場合はファイル名の!で判定します。
 * 
 * @arg ScrollX
 * @text Ｘ方向のスクロール
 * @type string
 * @desc 横方向へのスクロール速度です。数式可。
 * 
 * @arg ScrollY
 * @text Ｙ方向のスクロール
 * @type string
 * @desc 縦方向へのスクロール速度です。数式可。
 * 
 * @arg MapX
 * @text マップＸ座標
 * @desc 画像を配置するマップのＸ座標です。数式可。
 * 戦闘時も1マス=48ピクセルで計算。
 * 
 * @arg MapY
 * @text マップＹ座標
 * @desc 画像を配置するマップのＹ座標です。数式可。
 * 戦闘時も1マス=48ピクセルで計算。
 * 
 * @arg Width
 * @text 横幅
 * @desc 遠景を表示する横幅です。数式可。
 * 
 * @arg Height
 * @text 縦幅
 * @desc 遠景を表示する縦幅です。数式可。
 * 
 * @arg Opacity
 * @text 不透明度
 * @type number
 * @max 255
 * @desc 画像の不透明度です。0～255が有効。
 * 
 * @arg Options
 * @text オプション
 * @type struct<Option>
 * 
 * @------------------------------------------------------------------
 * 
 * @command RemoveParallax
 * @text 遠景を削除
 * @desc 指定したＩＤの遠景（近景）を削除します。
 * ＩＤ未指定なら全削除します。
 * 
 * @arg Id
 * @text ＩＤ
 * @desc 削除対象とする遠景のＩＤです。
 * 
 * @------------------------------------------------------------------
 * @ プラグインパラメータ
 * @------------------------------------------------------------------
 * @param UseBattlebackSort
 * @text 戦闘背景の表示優先度を設定
 * @type boolean
 * @default false
 * @desc 戦闘背景の表示優先度（Ｚ座標ソート）を有効化します。
 * 必ずＺ座標ソートを行うプラグインと併用してください。
 * 
 * @param Battleback1Z
 * @parent UseBattlebackSort
 * @text 戦闘背景１のＺ座標
 * @type number @min -99999 @max 99999 @decimals 2
 * @default 0
 * @desc 戦闘背景１（下）の表示優先度です。
 * 
 * @param Battleback2Z
 * @parent UseBattlebackSort
 * @text 戦闘背景２のＺ座標
 * @type number @min -99999 @max 99999 @decimals 2
 * @default 0.5
 * @desc 戦闘背景１（上）の表示優先度です。
 */
//-----------------------------------------------------------------------------
// Option
//-----------------------------------------------------------------------------
/*~struct~Option:ja
 * @param ShiftX
 * @text シフトＸ
 * @desc 画像を表示するＸ座標の調整値です。数式可。
 * 
 * @param ShiftY
 * @text シフトＹ
 * @desc 画像を表示するＹ座標の調整値です。数式可。
 * 
 * @param ParallaxX
 * @text Ｘ方向の視差
 * @type select
 * @option @value
 * @option 画面固定 @value 0
 * @option タイル @value 1
 * @option 1/2倍速 @value 0.5
 * @desc 画面スクロール時、横方向の視差を設定します。
 * 
 * @param ParallaxY
 * @text Ｙ方向の視差
 * @type select
 * @option @value
 * @option 画面固定 @value 0
 * @option タイル @value 1
 * @option 1/2倍速 @value 0.5
 * @desc 画面スクロール時、縦方向の視差を設定します。
 * 
 * @param NoLoopX
 * @text ループなし（横）
 * @type boolean
 * @desc 遠景の横ループを無効にして、画像幅に合わせます。
 * 横幅の指定より優先されます。
 * 
 * @param NoLoopY
 * @text ループなし（縦）
 * @type boolean
 * @desc 遠景の縦ループを無効にして、画像幅に合わせます。
 * 縦幅の指定より優先されます。
 * 
 * @param BlendMode
 * @text 合成方法
 * @type select
 * @option 0:通常 @value 0
 * @option 1:加算 @value 1
 * @option 2:乗算 @value 2
 * @option 3:スクリーン @value 3
 * @desc 画像の合成方法です。
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

const PLUGIN_NAME = "NRP_ParallaxesPlus";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pUseBattlebackSort = toBoolean(parameters["UseBattlebackSort"], false);
const pBattleback1Z = toNumber(parameters["Battleback1Z"], 0);
const pBattleback2Z = toNumber(parameters["Battleback2Z"], 0.5);

//-----------------------------------------------------------------------------
// ＭＺ用プラグインコマンド
//-----------------------------------------------------------------------------

// MVには存在しないため、空で定義しておかないとエラーになる。
if (!PluginManager.registerCommand) {
    PluginManager.registerCommand = function() {}
}

/**
 * ●遠景の追加
 */
PluginManager.registerCommand(PLUGIN_NAME, "AddParallax", function(args) {
    const params = {};
    params.id = setDefault(args.Id);
    params.name = setDefault(args.Image);
    params.scrollX = setDefault(args.ScrollX, 0);
    params.scrollY = setDefault(args.ScrollY, 0);
    params.mapX = eval(args.MapX);
    params.mapY = eval(args.MapY);
    params.width = eval(args.Width);
    params.height = eval(args.Height);
    params.z = eval(setDefault(args.Z, -1));
    params.parallaxTile = toBoolean(args.ParallaxTile);

    // 視差をタイルに連動
    if (params.parallaxTile === true) {
        params.parallaxX = 1;
        params.parallaxY = 1;
    // 標準（画面固定）
    } else if (params.parallaxTile === false) {
        params.parallaxX = 0;
        params.parallaxY = 0;
    // 視差の指定がない場合はファイル名で判定
    } else {
        params.parallaxX = ImageManager.isZeroParallax(params.name) ? 1 : 0;
        params.parallaxY = params.parallaxX;
    }
    params.opacity = setDefault(args.Opacity, 255);
    params.blendMode = 0;

    // オプション項目の設定
    if (args.Options) {
        const option = JSON.parse(args.Options);
        params.shiftX = eval(option.ShiftX);
        params.shiftY = eval(option.ShiftY);
        if (isNotBlank(option.ParallaxX)) {
            params.parallaxX = eval(option.ParallaxX);
        }
        if (isNotBlank(option.ParallaxY)) {
            params.parallaxY = eval(option.ParallaxY);
        }
        params.noLoopX = toBoolean(option.NoLoopX, false);
        params.noLoopY = toBoolean(option.NoLoopY, false);
        params.blendMode = toNumber(option.BlendMode, 0);
    }

    // 遠景オブジェクトを生成
    const parallax = createParallaxPlus(params);

    const spriteset = getSpriteset();
    // 追加の遠景リストに登録
    spriteset._parallaxPlus.push(parallax);
    // 戦闘とマップで異なる場所に登録
    // ※それぞれＺソート対象になる要素
    if ($gameParty.inBattle()) {
        spriteset._battleField.addChild(parallax);
    } else {
        spriteset._tilemap.addChild(parallax);
        $gameMap.setParallaxPlus();
    }
});

/**
 * ●追加背景の作成
 */
function createParallaxPlus(params) {
    const parallax = new ParallaxPlus();
    setParallaxData(parallax, params);
    return parallax;
}

/**
 * ●背景データの設定
 * ※セーブ保存用のデータとも共有
 */
function setParallaxData(parallax, params) {
    parallax.id = params.id;
    parallax.name = params.name;
    parallax.scrollX = params.scrollX;
    parallax.scrollY = params.scrollY;
    parallax.z = params.z;
    parallax.opacity = eval(params.opacity);
    parallax.blendMode = params.blendMode;
    parallax.parallaxX = params.parallaxX;
    parallax.parallaxY = params.parallaxY;
    parallax.shiftX = setDefault(params.shiftX, 0);
    parallax.shiftY = setDefault(params.shiftY, 0);
    parallax.noLoopX = params.noLoopX;
    parallax.noLoopY = params.noLoopY;

    // 引き継ぎ項目
    if (params.origin) {
        parallax.originalWidth = params.originalWidth;
        parallax.originalHeight = params.originalHeight;
        parallax.origin.x = params.origin.x;
        parallax.origin.y = params.origin.y;
        parallax.mapX = params.mapX;
        parallax.mapY = params.mapY;
        parallax.x = params.x;
        parallax.y = params.y;
        parallax.isLimitX = params.isLimitX;
        parallax.isLimitY = params.isLimitY;

    // 初回用の項目
    } else {
        // 元の幅
        parallax.originalWidth = setDefault(params.width);
        parallax.originalHeight = setDefault(params.height);
        parallax.mapX = params.mapX;
        parallax.mapY = params.mapY;
        parallax.x = parallax.shiftX;
        parallax.y = parallax.shiftY;

        // 戦闘時、battleFieldの座標分を補正
        if ($gameParty.inBattle()) {
            const spriteset = getSpriteset();
            parallax.x -= spriteset._battleField.x;
            parallax.y -= spriteset._battleField.y;
        }

        // 幅が指定されているかどうか？
        // ※指定がある場合はズームアウト処理時の補正を行わない。
        if (parallax.noLoopX || params.width != null) {
            parallax.isLimitX = true;
        }
        if (parallax.noLoopY || params.height != null) {
            parallax.isLimitY = true;
        }
    }
}

/**
 * ●遠景情報の変更
 */
PluginManager.registerCommand(PLUGIN_NAME, "ChangeParallax", function(args) {
    const id = setDefault(args.Id);

    const params = {};
    params.name = setDefault(args.Image);
    params.scrollX = setDefault(args.ScrollX);
    params.scrollY = setDefault(args.ScrollY);
    params.mapX = eval(args.MapX);
    params.mapY = eval(args.MapY);
    params.width = eval(args.Width);
    params.height = eval(args.Height);
    params.z = eval(args.Z);
    params.opacity = eval(args.Opacity);
    params.parallaxTile = toBoolean(args.ParallaxTile);

    // 視差をタイルに連動
    if (params.parallaxTile === true) {
        params.parallaxX = 1;
        params.parallaxY = 1;
    // 標準（画面固定）
    } else if (params.parallaxTile === false) {
        params.parallaxX = 0;
        params.parallaxY = 0;
    }

    // オプション項目の設定
    if (args.Options) {
        const option = JSON.parse(args.Options);
        params.shiftX = eval(option.ShiftX);
        params.shiftY = eval(option.ShiftY);
        params.parallaxX = eval(option.ParallaxX);
        params.parallaxY = eval(option.ParallaxY);
        params.noLoopX = toBoolean(option.NoLoopX);
        params.noLoopY = toBoolean(option.NoLoopY);
        params.blendMode = setDefault(option.BlendMode);
    }

    const spriteset = getSpriteset();
    // 対象の遠景を取得
    const targetParallaxes = spriteset._parallaxPlus.filter(p => id == null || p.id == id);
    // 変更を反映
    for (const parallax of targetParallaxes) {
        // 基本項目
        parallax.name = changeValue(parallax.name, params.name);
        parallax.scrollX = changeValue(parallax.scrollX, params.scrollX);
        parallax.scrollY = changeValue(parallax.scrollY, params.scrollY);
        parallax.mapX = changeValue(parallax.mapX, params.mapX);
        parallax.mapY = changeValue(parallax.mapY, params.mapY);
        parallax.z = changeValue(parallax.z, params.z);
        parallax.opacity = changeValue(parallax.opacity, params.opacity);
        parallax.parallaxTile = changeValue(parallax.parallaxTile, params.parallaxTile);

        // 特殊な調整をする項目
        parallax.originalWidth = changeValue(parallax.originalWidth, params.width);
        parallax.originalHeight = changeValue(parallax.originalHeight, params.height);

        // オプション項目
        parallax.shiftX = changeValue(parallax.shiftX, params.shiftX);
        parallax.shiftY = changeValue(parallax.shiftY, params.shiftY);
        parallax.parallaxX = changeValue(parallax.parallaxX, params.parallaxX);
        parallax.parallaxY = changeValue(parallax.parallaxY, params.parallaxY);
        parallax.noLoopX = changeValue(parallax.noLoopX, params.noLoopX);
        parallax.noLoopY = changeValue(parallax.noLoopY, params.noLoopY);
        parallax.blendMode = changeValue(parallax.blendMode, params.blendMode);
    }

    // $gameMapに反映
    if (!$gameParty.inBattle()) {
        $gameMap.setParallaxPlus();
    }
});

/**
 * ●新しい値がある場合のみ反映する。
 */
function changeValue(current, newValue) {
    if (newValue != null) {
        return newValue;
    }
    return current;
}

/**
 * ●遠景の削除
 */
PluginManager.registerCommand(PLUGIN_NAME, "RemoveParallax", function(args) {
    const id = setDefault(args.Id);
    const spriteset = getSpriteset();

    // 遠景を削除
    // ※ＩＤが未指定の場合は全てが対象
    const deleteParallaxes = spriteset._parallaxPlus.filter(p => id == null || p.id == id);
    for (const parallax of deleteParallaxes) {
        spriteset._parallaxPlus.remove(parallax);

        // 戦闘とマップで異なる場所に登録されている
        if ($gameParty.inBattle()) {
            spriteset._battleField.removeChild(parallax);
        } else {
            spriteset._tilemap.removeChild(parallax);
        }
    }

    // $gameMapに反映
    if (!$gameParty.inBattle()) {
        $gameMap.setParallaxPlus();
    }
});

//-----------------------------------------------------------------------------
// ParallaxPlus
//
// 追加の遠景を定義するクラス

function ParallaxPlus() {
    this.initialize(...arguments);
}

ParallaxPlus.prototype = Object.create(TilingSprite.prototype);
ParallaxPlus.prototype.constructor = ParallaxPlus;

ParallaxPlus.prototype.initialize = function() {
    TilingSprite.prototype.initialize.call(this);
};

/**
 * ●サイズを設定する。
 */
ParallaxPlus.prototype.setSize = function() {
    const bmp = this.bitmap;

    //-------------------------------------------------
    // 基本サイズの設定
    //-------------------------------------------------
    // 横幅が設定されていない場合→初期設定を行う
    if (this.originalWidth == null) {
        // ループしない場合は画像幅に合わせる。
        if (this.noLoopX) {
            this.originalWidth = bmp.width;
        // それ以外は画像幅と画面幅の大きなほう。
        } else {
            this.originalWidth = Math.max(bmp.width, Graphics.width);
        }
    }
    // 縦幅が設定されていない場合→初期設定を行う
    if (this.originalHeight == null) {
        // ループしない場合は画像幅に合わせる。
        if (this.noLoopY) {
            this.originalHeight = bmp.height;
        // それ以外は画像幅と画面幅の大きなほう。
        } else {
            this.originalHeight = Math.max(bmp.height, Graphics.height);
        }
    }

    //-------------------------------------------------
    // 基本サイズを元に表示サイズを設定
    //-------------------------------------------------
    if (this.isLimitX) {
        this.width = this.originalWidth;
    } else {
        // 指定の幅がない場合はズーム対応
        // ※ズームアウト時に画面全体まで引き伸ばす
        this.width = this.originalWidth / $gameScreen.zoomScale();
    }
    if (this.isLimitY) {
        this.height = this.originalHeight;
    } else {
        // 指定の幅がない場合はズーム対応
        this.height = this.originalHeight / $gameScreen.zoomScale();
    }
};

/**
 * ●マップ座標に配置する際の補正を行う
 */
ParallaxPlus.prototype.setMapPosition = function(diffX, diffY) {
    // マップＸ座標の指定がある場合は補正
    if (this.mapX != null) {
        // 表示座標 = 配置座標 - 現在の画面座標
        this.x = (this.mapX - $gameMap.displayX()) * $gameMap.tileWidth() + this.shiftX;
        // 横ループマップの場合
        if (!$gameParty.inBattle() && $gameMap.isLoopHorizontal()) {
            const mapWidth = $gameMap.width() * $gameMap.tileWidth();
            // 画像が画面外（左）に位置している場合、画面右へ表示されるよう補正
            if (this.x + this.width < 0) {
                this.x += mapWidth;
            }
        }
        // 画像のスクロールを戻す
        this.origin.x -= diffX;
    }
    // マップＹ座標の指定がある場合は補正
    if (this.mapY != null) {
        // 表示座標 = 配置座標 - 現在の画面座標
        this.y = (this.mapY - $gameMap.displayY()) * $gameMap.tileHeight() + this.shiftY;
        // 縦ループマップの場合
        if (!$gameParty.inBattle() && $gameMap.isLoopVertical()) {
            const mapHeight = $gameMap.height() * $gameMap.tileHeight();
            // 画像が画面外（上）に位置している場合、画面下へ表示されるよう補正
            if (this.y + this.height < 0) {
                this.y += mapHeight;
            }
        }
        // 画像のスクロールを戻す
        this.origin.y -= diffY;
    }
}

//-----------------------------------------------------------------------------
// Spriteset_Base
//-----------------------------------------------------------------------------

/**
 * ●更新
 */
const _Spriteset_Base_update = Spriteset_Base.prototype.update;
Spriteset_Base.prototype.update = function() {
    _Spriteset_Base_update.apply(this, arguments);

    // 追加遠景の更新
    this.updateParallaxPlus();
}

/**
 * ●追加遠景の更新
 */
Spriteset_Base.prototype.updateParallaxPlus = function() {
    // 存在しない場合は処理しない。
    if (this._parallaxPlus.length == 0) {
        return;
    }

    // スクロール差分を取得
    const diffX = moveScreenX.bind($gameMap)();
    const diffY = moveScreenY.bind($gameMap)();

    for (const parallax of this._parallaxPlus) {
        // ロードしたファイル名と指示されているファイル名が異なる場合
        // ※ロードがまだ、もしくは画像が変更されたと判断
        if (parallax.loadName !== parallax.name) {
            // ロード処理を実行する。
            parallax.loadName = parallax.name;
            parallax.bitmap = ImageManager.loadParallax(parallax.name);
        }

        const bmp = parallax.bitmap;
        // 画像の幅を取得できない場合は終了
        if (!bmp.width) {
            continue;
        }

        // 幅が設定されていない場合に初期設定を行う
        parallax.setSize();

        // 視差に応じて画面スクロール分を加算
        if (parallax.parallaxX) {
            parallax.origin.x += diffX * parallax.parallaxX;
        }
        if (parallax.parallaxY) {
            parallax.origin.y += diffY * parallax.parallaxY;
        }

        // 遠景自体のスクロール値を加算
        parallax.origin.x += eval(parallax.scrollX);
        parallax.origin.y += eval(parallax.scrollY);

        // マップ座標の指定がある場合は補正
        parallax.setMapPosition(diffX, diffY);
    }
};

//-----------------------------------------------------------------------------
// Spriteset_Map
//-----------------------------------------------------------------------------

/**
 * ●下層スプライトの作成
 */
const _Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
Spriteset_Map.prototype.createLowerLayer = function() {
    _Spriteset_Map_createLowerLayer.apply(this, arguments);

    this.createParallaxPlus();
};

/**
 * ●追加遠景の作成
 */
Spriteset_Map.prototype.createParallaxPlus = function() {
    this._parallaxPlus = [];

    // 保存データが存在する場合は復元
    const gameMapParallax = $gameMap._parallaxPlus;
    if (gameMapParallax) {
        for (const params of gameMapParallax) {
            const parallax = createParallaxPlus(params);
            // 追加の遠景リストに登録
            this._parallaxPlus.push(parallax);
            // 表示対象に追加（tilemapの子要素はＺソート対象になる）
            this._tilemap.addChild(parallax);
        }
    }
};

/**
 * 【独自】遠景維持用の一時データを保存する。
 */
Spriteset_Map.prototype.saveParallaxPlusTempData = function() {
    // 遠景情報を$gameMapに保持しておく
    $gameMap.setParallaxPlus(this._parallaxPlus);
};

/**
 * ●セーブ用データの作成
 */
function createSaveParallax(params) {
    // 不要なデータを保存しないため、TilingSpriteではない単なる構造体に変換。
    const parallax = {};
    parallax.origin = {};
    setParallaxData(parallax, params);
    return parallax;
}

//-----------------------------------------------------------------------------
// Spriteset_Battle
//-----------------------------------------------------------------------------

/**
 * ●下層スプライトの作成
 */
const _Spriteset_Battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
Spriteset_Battle.prototype.createLowerLayer = function() {
    _Spriteset_Battle_createLowerLayer.apply(this, arguments);

    this.createParallaxPlus();
};

/**
 * ●追加遠景の作成
 */
Spriteset_Battle.prototype.createParallaxPlus = function() {
    this._parallaxPlus = [];
};

//-----------------------------------------------------------------------------
// 戦闘背景の表示優先度変更
//-----------------------------------------------------------------------------

// 使用する場合のみ有効化
if (pUseBattlebackSort) {
    /**
     * ●戦闘背景の作成
     */
    const _Spriteset_Battle_createBattleback = Spriteset_Battle.prototype.createBattleback;
    Spriteset_Battle.prototype.createBattleback = function() {
        _Spriteset_Battle_createBattleback.apply(this, arguments);

        // ※removeしなくても動作するようなので、とりあえずそのまま
        // this._baseSprite.removeChild(this._back1Sprite);
        // this._baseSprite.removeChild(this._back2Sprite);

        // Ｚ座標を設定
        this._back1Sprite.z = pBattleback1Z;
        this._back2Sprite.z = pBattleback2Z;
    };

    /**
     * ●下層の作成
     */
    const _Spriteset_Battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
    Spriteset_Battle.prototype.createLowerLayer = function() {
        _Spriteset_Battle_createLowerLayer.apply(this, arguments);

        // デフォルトのthis._baseSprite以下ではＺソートの対象にならないので、
        // this._battleField以下に移動
        this._battleField.addChild(this._back1Sprite);
        this._battleField.addChild(this._back2Sprite);

        // this._battleFieldの座標分を補正
        this._back1Sprite.x = -this._battleField.x;
        this._back1Sprite.y = -this._battleField.y;
    };
}

//-----------------------------------------------------------------------------
// Game_Map
//-----------------------------------------------------------------------------

let mBeforeDisplayScreenX = 0;
let mBeforeDisplayScreenY = 0;

/**
 * ●初期化
 */
const _Game_Map_initialize = Game_Map.prototype.initialize;
Game_Map.prototype.initialize = function() {
    _Game_Map_initialize.apply(this, arguments);

    // 画面座標を保持
    mBeforeDisplayScreenX = this.displayX() * this.tileWidth();
    mBeforeDisplayScreenY = this.displayY() * this.tileHeight();
};

/**
 * ●更新処理
 */
const _Game_Map_update = Game_Map.prototype.update;
Game_Map.prototype.update = function(sceneActive) {
    // 画面座標を保持
    mBeforeDisplayScreenX = this.displayX() * this.tileWidth();
    mBeforeDisplayScreenY = this.displayY() * this.tileHeight();
    
    _Game_Map_update.apply(this, arguments);
};

/**
 * 【独自】追加の遠景データをセットする。
 */
Game_Map.prototype.setParallaxPlus = function() {
    const spriteParallaxPlus = getSpriteset()._parallaxPlus;

    // 遠景情報を$gameMapに保持しておく
    this._parallaxPlus = [];
    for (const parallax of spriteParallaxPlus) {
        // 保存用の形式に変換
        const saveParallax = createSaveParallax(parallax);
        this._parallaxPlus.push(saveParallax);
    }
};

/**
 * 【独自】１フレームでスクロールしたスクリーンＸ座標
 * ※NRP_DynamicAnimationMapMZとほぼ同じ関数
 */
function moveScreenX() {
    // 戦闘中は無効
    if ($gameParty.inBattle()) {
        return 0;
    }

    // 現在の座標と前回の座標を比較し差分を求める。
    const displayScreenX = this.displayX() * this.tileWidth();
    let moveScreenX = displayScreenX - mBeforeDisplayScreenX;

    // マップ全体の横幅（ピクセル）
    const mapWidth = this.width() * this.tileWidth();
    // 全体座標の半分以上を移動した（ループ）
    if (moveScreenX > mapWidth / 2) {
        moveScreenX -= mapWidth;
    } else if (moveScreenX < mapWidth / 2 * -1) {
        moveScreenX += mapWidth;
    }

    return moveScreenX;
};

/**
 * 【独自】１フレームでスクロールしたスクリーンＹ座標
 * ※NRP_DynamicAnimationMapMZとほぼ同じ関数
 */
function moveScreenY() {
    // 戦闘中は無効
    if ($gameParty.inBattle()) {
        return 0;
    }

    // 現在の座標と前回の座標を比較し差分を求める。
    const displayScreenY = this.displayY() * this.tileHeight();
    let moveScreenY = displayScreenY - mBeforeDisplayScreenY;

    // マップ全体の縦幅（ピクセル）
    const mapHeight = this.height() * this.tileHeight();
    // 全体座標の半分以上を移動した（ループ）
    if (moveScreenY > mapHeight / 2) {
        moveScreenY -= mapHeight;
    } else if (moveScreenY < mapHeight / 2 * -1) {
        moveScreenY += mapHeight;
    }

    return moveScreenY;
};

//-----------------------------------------------------------------------------
// シーン切替時の情報保持
//-----------------------------------------------------------------------------

/**
 * ●場所移動
 */
const _Scene_Map_updateTransferPlayer = Scene_Map.prototype.updateTransferPlayer;
Scene_Map.prototype.updateTransferPlayer = function() {
    if ($gamePlayer.isTransferring()) {
        // 場所移動したので$gameMapのデータをクリア
        clearParallaxData();
    }
    _Scene_Map_updateTransferPlayer.apply(this, arguments);
};

/**
 * ●シーン変更
 */
const _SceneManager_changeScene = SceneManager.changeScene;
SceneManager.changeScene = function() {
    if (this.isSceneChanging() && !this.isCurrentSceneBusy()) {
        // Scene_Mapから移動する場合
        if (this._scene && this._scene instanceof Scene_Map) {
            // 場所移動時
            if ($gamePlayer.isTransferring()) {
                // 同一マップの場合は遠景状態を保持
                if ($gamePlayer.newMapId() == $gameMap.mapId()) {
                    $gameMap.setParallaxPlus();
                // マップが変化した場合は$gameMapのデータクリア
                } else {
                    clearParallaxData();
                }
                
            // 遠景状態を保持
            } else {
                $gameMap.setParallaxPlus();
            }
        }
    }
    _SceneManager_changeScene.apply(this, arguments);
};

/**
 * ●$gameMapの遠景データをクリアする。
 */
function clearParallaxData() {
    $gameMap._parallaxPlus = undefined;
}

//-----------------------------------------------------------------------------
// 共通
//-----------------------------------------------------------------------------

/**
 * ●空白チェック
 */
function isNotBlank(str) {
    return str != "" && str != null;
}

/**
 * ●現在の画面のSpritesetを取得する。
 */
function getSpriteset() {
    return SceneManager._scene._spriteset;
}

})();
