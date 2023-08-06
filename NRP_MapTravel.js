//=============================================================================
// NRP_MapTravel.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.022 Implement a map selection & transfer screen.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/484927929.html
 *
 * @help Implement a screen to transfer to the selected spot.
 * ※This function is equivalent to so-called fast travel.
 * 
 * ◆Main features
 * - Correspondence between the field and atlas to display each spot.
 * - Atlas image can be output from the editor.
 * - Can be directed by common event.
 * - Can be added to the menu screen.
 * - The icon can be displayed next to the spot name by switching it.
 * 　For example, it can notify the spot where an event is occurring.
 * - Can be used as a simple atlas if movement is prohibited.
 * 
 * To avoid confusing you, I'll say no first.
 * In this plugin, terms are used with the following meanings.
 * 
 * - Map: The stage of the game. Data corresponding to MapXXX.json.
 * - Atlas: A map in a general sense,
 *          a diagram to know the location and terrain.
 * - Field: A map that corresponds to an atlas and is the parent of spots.
 * - Spot: A spot that is a child of the field (mostly town and dungeon).
 * 
 * Basically, I'm assuming that you want to map fields to spots,
 * but you can create a movement screen
 * that maps a town to facilities, for example.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Since this is a plugin with a lot of settings,
 * I will explain it in stages.
 * I will start with a method that does not use atlas.
 * 
 * ◆Basic
 * First, register to SpotList in the plugin parameters.
 * 
 * - SpotName
 * - TransferMapId
 * - TransferX
 * - TransferY
 * 
 * ...and other information.
 * 
 * Also, if you specify "ListingSwitch",
 * the spot will not be displayed until the switch is turned on.
 * 
 * Now you can run the plugin command.
 * ※No parameters need to be specified.
 * A simple spot selection & move screen can be achieved.
 * 
 * ◆Transfer Direction
 * However, the above alone is tasteless
 * without any player transfer direction.
 * So add a direction by calling the common event.
 * 
 * - TransferCommonEvent
 * - MapIdVariable
 * - XVariable
 * - YVariable
 * 
 * Set each plugin parameter above.
 * ※All of these are normal parameters, not in SpotList.
 * 
 * In this case, you need to describe the player transfer process
 * by yourself in the specified common event.
 * The coordinate information will be stored in the variable specified
 * in parameters, so please specify the destination in that variable.
 * 
 * After that, you can add your own direction
 * as you like in the event command.
 * You can also do something unusual, such as sending the user
 * to a different location if the transfer fails.
 * 
 * ◆Display Atlas
 * The atlas corresponding to the field can be displayed,
 * and each spot can be displayed as a point (symbol) on the atlas.
 * 
 * First, you need to prepare an atlas image.
 * The easiest way to do this is to select the map you want
 * to create an atlas for in the map tree,
 * and right-click and select "Save as Image" to output it.
 * Register the prepared image as a picture in the "FieldMapList"
 * and link it to the map ID.
 * 
 * You can also process the atlas by yourself
 * or create it completely by yourself.
 * The size of the atlas is also free,
 * as long as the proportions are correct.
 * 
 * ◆Display Spots on Atlas
 * If the coordinates on the field are set in
 * "TransferMapId", "TransferX", and "TransferY",
 * the spots will be displayed as symbols on atlas at this point.
 * 
 * The problem is when the destination is not a field,
 * such as in a town.
 * In this case, you need to enter the coordinates corresponding
 * to atlas for each spot.
 * 
 * - FieldMapId
 * - FieldX
 * - FieldY
 * 
 * Set each of the above items.
 * 
 * If you do not want the symbols to be displayed
 * from the start of the game, set "PointSwitch" to switch them.
 * You can use any switch with the same number as "ListingSwitch".
 * 
 * ◆Display of Current Location
 * Displaying the player's current location
 * on atlas is surprisingly difficult.
 * 
 * If the player is on the field, it will just refer to
 * the current coordinates, but if the player is in a spot
 * such as a town or dungeon, it will not.
 * 
 * Therefore, the coordinate information of the field
 * needs to be kept by you even when you are in the spot.
 * First, set the following items in the plugin parameter FieldMapList
 * to determine the variables to be retained.
 * 
 * - CurrentMapIdVariable
 * - CurrentXVariable
 * - CurrentYVariable
 * 
 * This plugin provides the following two automation methods.
 * 
 * 1. Retain the coordinates when the player is transferred
 *    from the field to the spot.
 * However, this does not apply when a player is transferred
 * from spot to spot due to an event.
 * The coordinates of the first spot you enter will be retained.
 * 
 * Also note that if you temporarily transfer a player
 * to the field during the staging of an event,
 * it will be targeted by this process.
 * 
 * 2. When a player is transferred to a spot,
 *    the coordinates for atlas are acquired.
 * The judgment whether it is a corresponding spot
 * is done by "TransferMapId".
 * If it is not enough, it can be added to "LocationUpdateMapId".
 * 
 * It is impractical to register all maps that belong to a spot.
 * Only maps that may be transferred from outside are sufficient.
 * 
 * ※If you want to register a spot that will not be displayed
 *   on the atlas, such as a dungeon, leave "TransferMapId" blank,
 *   and then set only "LocationUpdateMapId".
 * ※This function does not work for spots added
 *   with the "AddSpotList" plugin command for MZ. Please note this.
 * 
 * If you want to stop the automatic acquisition function
 * described above, you can also switch it by using the plugin parameters.
 * 
 * You can also set the values to the above variables manually,
 * without getting them automatically.
 * Please be flexible depending on the situation.
 * For example, there is a way to share the coordinates
 * with the escape coordinates from the dungeon.
 * 
 * -------------------------------------------------------------------
 * [Plugin Command MZ]
 * -------------------------------------------------------------------
 * ◆SceneStart
 * Display the spots selection screen.
 * It can also be used purely as atlas by specifying display-only.
 * 
 * It is also possible to add your own list by specifying "AddSpotList".
 * 
 * -------------------------------------------------------------------
 * [Plugin Command MV]
 * -------------------------------------------------------------------
 * ※No distinction is made between individual capital letters.
 * 
 * ◆SceneStart
 * > NRP.MapTravel.SceneStart
 * 
 * It will also be display-only in the following.
 * > NRP.MapTravel.SceneStart true
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
 * @ Plugin Command
 * @------------------------------------------------------------------
 * 
 * @command SceneStart
 * @desc Display the spots selection screen.
 * 
 * @arg AddSpotList
 * @type struct<Spot>[]
 * @desc An additional portion of the spot list to be displayed.
 * Bind to the plugin parameter SpotList.
 * 
 * @arg ReadOnly
 * @type boolean
 * @desc Player transfer is prohibited.
 * Intended for purely atlas use.
 * 
 * @arg HideCommonList
 * @type boolean
 * @desc It does not show the common spot list, but only the additional ones.
 * 
 * @------------------------------------------------------------------
 * @ Plugin Parameters
 * @------------------------------------------------------------------
 * 
 * @param SpotList
 * @type struct<Spot>[]
 * @desc This is a list of spots to be displayed.
 * Please include the display conditions.
 * 
 * @param FieldMapList
 * @type struct<FieldMap>[]
 * @desc This is a list of fields to be displayed as atlas.
 * Please register map IDs and images.
 * 
 * @param SymbolList
 * @type struct<Symbol>[]
 * @default ["{\"SymbolId\":\"-1\",\"Memo\":\"Current Location\",\"SymbolImage\":\"\",\"BlinkPeriod\":\"60\",\"Opacity\":\"255\",\"<NoImage>\":\"\",\"SymbolColor\":\"rgb(0, 255, 255)\",\"SymbolRadius\":\"8\"}","{\"SymbolId\":\"0\",\"Memo\":\"Selected Spot\",\"SymbolImage\":\"\",\"BlinkPeriod\":\"\",\"Opacity\":\"128\",\"<NoImage>\":\"\",\"SymbolColor\":\"rgb(255, 0, 0)\",\"SymbolRadius\":\"12\"}","{\"SymbolId\":\"1\",\"Memo\":\"Each Spot\",\"SymbolImage\":\"\",\"BlinkPeriod\":\"120\",\"Opacity\":\"510\",\"<NoImage>\":\"\",\"SymbolColor\":\"rgb(255, 255, 255)\",\"SymbolRadius\":\"5\"}"]
 * @desc A list of symbols (Each Spot, Selected Spot, and Current Location) that are displayed on atlas.
 * 
 * @param <TransferCommonEvent>
 * @desc Related to common events that are executed when transferring players.
 * 
 * @param TransferCommonEvent
 * @parent <TransferCommonEvent>
 * @type common_event
 * @desc A common event to be executed after spot selection.
 * Execute the player transfer within this event.
 * 
 * @param MapIdVariable
 * @parent <TransferCommonEvent>
 * @type variable
 * @desc This variable is used to store the map ID of the transfer destination after spot selection.
 * 
 * @param XVariable
 * @parent <TransferCommonEvent>
 * @type variable
 * @desc This variable is used to store the X coordinate of the transfer destination after spot selection.
 * 
 * @param YVariable
 * @parent <TransferCommonEvent>
 * @type variable
 * @desc This variable is used to store the Y coordinate of the transfer destination after spot selection.
 * 
 * @param IdentifierVariable
 * @parent <TransferCommonEvent>
 * @type variable
 * @desc A variable that stores the identification value after selecting a spot.
 * Useful if you want to do some processing for each spot.
 * 
 * @param <FieldMap>
 * @desc Items related to atlas and its corresponding field.
 * 
 * @param UpdateWhenExitField
 * @parent <FieldMap>
 * @type boolean
 * @default true
 * @desc Automatically update variables for atlas coordinates when transferring from a field to another map.
 * 
 * @param UpdateWhenEnterSpot
 * @parent <FieldMap>
 * @type boolean
 * @default true
 * @desc Automatically updates the variables for atlas coordinates when transferred to each spot.
 * 
 * @param CurrentSymbolId
 * @parent <FieldMap>
 * @type number @min -999 @max 999
 * @default -1
 * @desc The ID of the symbol that displays the current location.
 * 
 * @param SelectedSymbolId
 * @parent <FieldMap>
 * @type number @min -999 @max 999
 * @default 0
 * @desc This is the ID of the symbol that displays the currently selected spot.
 * 
 * @param <Layout>
 * @desc Layout-related items.
 * 
 * @param SpotListWidth
 * @parent <Layout>
 * @type number
 * @default 300
 * @desc The width of the spot list.
 * 
 * @param HelpHeight
 * @parent <Layout>
 * @type number
 * @desc The height of the help frame.
 * By default (blank), two lines are reserved; set to 0 to hide it.
 * 
 * @param <Menu Command>
 * @desc These are the related items for displaying the Travel function in the menu command.
 * 
 * @param ShowMenuCommand
 * @parent <Menu Command>
 * @type boolean
 * @default false
 * @desc Add the Travel function to the menu command.
 * 
 * @param ShowMenuCommandPosition
 * @parent <Menu Command>
 * @type number
 * @default 4
 * @desc The position where the Travel function is inserted into the menu command. 0 is the first position.
 * 
 * @param TravelName
 * @parent <Menu Command>
 * @type text
 * @default Map Travel
 * @desc Set the display name of the Travel function.
 * 
 * @param MenuCommandSwitch
 * @parent <Menu Command>
 * @type switch
 * @desc Display the command only when the switch is on.
 * Always display if blank.
 * 
 * @param MaskString
 * @parent MenuCommandSwitch
 * @type string
 * @desc If MenuCommandSwitch is off, displays the specified string. If blank, hides the command itself.
 * 
 * @param DisableSwitch
 * @parent <Menu Command>
 * @type switch
 * @desc Disallow command only when switch is on.
 * Always allow if blank.
 * 
 * @param TravelSymbol
 * @parent <Menu Command>
 * @type text
 * @default maptravel
 * @desc Set the symbol for the Travel function. (For advanced users)
 * This value can be used when working with other plugins.
 * 
 * @param ReadOnlyMenu
 * @parent <Menu Command>
 * @type boolean
 * @default false
 * @desc Makes the Travel command reference-only.
 * Intended for use as atlas.
 * 
 * @param <Other>
 * @desc Other items.
 * 
 * @param StartCommonEvent
 * @parent <Other>
 * @type common_event
 * @desc A common event that is executed when a scene starts.
 * It can display messages, etc., but its function is limited.
 */

/*~struct~Spot:
 * @param SpotName
 * @type text
 * @desc The name of the spot to be displayed.
 * Icon display such as \i[1] is also valid.
 * 
 * @param Description
 * @type multiline_string
 * @desc This is the help text for spot.
 * 
 * @param TransferMapId
 * @type text
 * @desc The map ID to transfer to. Can be a formula.
 * If left blank, it will not appear in the list.
 * 
 * @param TransferX
 * @type text
 * @desc X coordinate of the transfer destination. Can be a formula.
 * 
 * @param TransferY
 * @type text
 * @desc Y coordinate of the transfer destination. Can be a formula.
 * 
 * @param TransferDirection
 * @type select
 * @option Keep @value 0
 * @option Down @value 2
 * @option Left @value 4
 * @option Right @value 6
 * @option Up @value 8
 * @desc This is the direction after transfer.
 * 
 * @param TransferIdentifier
 * @type number
 * @desc This value is used to identify the spot to be transferred.
 * The value is stored in the "IdentifierVariable".
 * 
 * @param TransferCommonEvent
 * @type common_event
 * @desc A common event that is executed after spot selection.
 * This event has priority over the one set for the entire event.
 * 
 * @param Icons
 * @type struct<SwitchIcon>[]
 * @desc Add icons next to the spot name.
 * e.g. to let the player know that an event is taking place.
 * 
 * @param <FieldMap>
 * @desc This is an item related to atlas information.
 * 
 * @param FieldMapId
 * @parent <FieldMap>
 * @type text
 * @desc The map ID of the field corresponding to atlas. Can be a formula.
 * If left blank, "TransferMapId" will be used.
 * 
 * @param FieldX
 * @parent <FieldMap>
 * @type text
 * @desc The X of the field corresponding to atlas. Can be a formula.
 * If left blank, "TransferX" will be used.
 * 
 * @param FieldY
 * @parent <FieldMap>
 * @type text
 * @desc The Y of the field corresponding to atlas. Can be a formula.
 * If left blank, "TransferY" will be used.
 * 
 * @param LocationUpdateMapId
 * @parent <FieldMap>
 * @type text
 * @desc Map ID for updating atlas coordinates. Multiple OK.
 * ExampleA: 1,2,3 ExampleB: 1~3
 * 
 * @param SymbolId
 * @parent <FieldMap>
 * @type number @min -999 @max 999
 * @default 1
 * @desc The ID of the symbol to be displayed.
 * If left blank, the symbol will be hidden.
 * 
 * @param Condition
 * 
 * @param ListingSwitch
 * @parent Condition
 * @type switch
 * @desc This switch is used to display the spot on the list.
 * If blank, always display.
 * 
 * @param PointSwitch
 * @parent Condition
 * @type switch
 * @desc This switch is used to display spot as a point on atlas.
 * If blank, it is always displayed.
 * 
 * @param DisableSwitch
 * @parent Condition
 * @type switch
 * @desc This switch prohibits selection.
 * It will be displayed in gray on the list.
 */

/*~struct~FieldMap:
 * @param MapId
 * @type number
 * @desc The map ID of the field corresponding to atlas.
 * 
 * @param MapImage
 * @type file
 * @dir img/pictures
 * @desc This image is used as atlas.
 * 
 * @param BackgroundColor
 * @type text
 * @desc The background color of atlas. e.g.: rgb(255, 255, 255)
 * Values correspond to red, green, and blue. Transparent if blank.
 * 
 * @param CurrentMapIdVariable
 * @type variable
 * @desc A variable that stores the map ID for displaying the current location on atlas.
 * 
 * @param CurrentXVariable
 * @type variable
 * @desc A variable that stores the X coordinate for displaying the current location on atlas.
 * 
 * @param CurrentYVariable
 * @type variable
 * @desc A variable that stores the Y coordinate for displaying the current location on atlas.
 * 
 * @param ValidSwitch
 * @type switch
 * @desc Switch to enable the map. If blank, always show. Priority is given to the upper side of the list.
 */

/*~struct~Symbol:
 * @param SymbolId
 * @type number @min -999 @max 999
 * @desc The ID corresponding to the symbol.
 * Used to link to each spot.
 * 
 * @param Memo
 * @type text
 * @desc This is a memo for the user to identify.
 * This is not used in the game at all.
 * 
 * @param SymbolImage
 * @type file
 * @dir img/pictures
 * @desc This is the image to be used as the symbol.
 * If not specified, a circular point will be drawn.
 * 
 * @param BlinkPeriod
 * @type number
 * @default 120
 * @desc This is the period in which the symbol blinks.
 * Set in 1/60 second increments. 0 means no blinking.
 * 
 * @param Opacity
 * @type number
 * @default 510
 * @desc The opacity of the symbol (0~255).
 * If the value exceeds 255, the display time will be extended.
 * 
 * @param <NoImage>
 * @desc This item is enabled when the image is not specified.
 * 
 * @param SymbolColor
 * @parent <NoImage>
 * @type text
 * @desc Symbol colors. e.g.: rgb(255, 255, 255)
 * Numbers correspond to red, green, and blue.
 * 
 * @param SymbolRadius
 * @parent <NoImage>
 * @type number
 * @default 8
 * @desc The radius of the symbol.
 */

/*~struct~SwitchIcon:
 * @param IconIndex
 * @type text
 * @desc The number of the icon to be displayed next to the spot name.
 * You can right-click to "Insert Icon Number".
 * 
 * @param NameColor
 * @type number
 * @desc Change the text color of the Spot name.
 * Specify the system color number.
 * 
 * @param DispSwitch
 * @type switch
 * @desc This switch is the condition for displaying the icon.
 * If it is blank, it is always displayed.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.022 マップ選択＆移動画面を実装します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/484927929.html
 *
 * @help 選択した地点（マップ）に移動するための画面を実装します。
 * ※いわゆるファストトラベルやルーラに相当する機能です。
 * 
 * ◆主な特徴
 * ・フィールドと地図を対応させて各地点を表示
 * ・地図画像はエディタから出力するだけでＯＫ
 * ・コモンイベントによって演出可能
 * ・メニュー画面に追加可能
 * ・地点名の横にスイッチ切替によるアイコン表示が可能
 * 　イベント発生中の地点を知らせるなど。
 * ・移動を禁止すれば、単なる地図としても利用可能
 * 
 * 当プラグイン内で指す『フィールド』とは地図に対応するマップを意味します。
 * 基本的にはフィールドと地点（町やダンジョン）を対応させる想定ですが、
 * 町と施設を対応させた移動画面を作成しても構いません。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * 設定内容の多いプラグインなので、段階に分けて説明します。
 * まずは地図を使わない方法から始めます。
 * 
 * ◆基本
 * まず地点一覧をプラグインパラメータに登録します。
 * 
 * ・『地点名』
 * ・『移動先マップＩＤ』
 * ・『移動先Ｘ座標』
 * ・『移動先Ｙ座標』
 * 
 * などの情報を指定してください。
 * 
 * また『一覧表示スイッチ』を指定すれば、
 * スイッチがオンになるまで地点は表示されなくなります。
 * 
 * これでプラグインコマンドを実行すればＯＫです。
 * ※パラメータは指定不要
 * シンプルなマップ選択＆移動画面が実現できます。
 * 
 * ◆移動演出を追加
 * しかしながら、上記だけでは場所移動の演出もなく味気ないです。
 * そこでコモンイベントを呼び出すことで演出を追加します。
 * 
 * ・『移動用コモンイベント』
 * ・『マップＩＤ変数』
 * ・『Ｘ座標変数』
 * ・『Ｙ座標変数』
 * 
 * の各プラグインパラメータを設定してください。
 * ※いずれも地点一覧ではなく通常のパラメータです。
 * 
 * この際、指定したコモンイベント内に、
 * 自力で場所移動処理を記述する必要があります。
 * パラメータで指定した変数に座標情報が格納されるので、
 * 場所移動先をその変数で指定してください。
 * 
 * 後はイベントコマンドで好きなように演出を追加してください。
 * 移動に失敗して、別の場所に飛ばされるなんて変わったこともできます。
 * 
 * ◆地図を表示
 * フィールドに対応する地図を表示し、
 * 各地点を地図上の点（シンボル）として表示することが可能です。
 * 
 * まずは地図画像を用意してください。
 * 最も簡単なのはマップツリー上で地図を作成したいマップを選択し、
 * 右クリックで「画像として保存」を選択して出力する方法です。
 * 用意した画像をピクチャーとして『地図設定一覧』に登録し、
 * マップＩＤと紐付けてください。
 * 
 * なお、自力で地図を加工したり完全に自作しても構いません。
 * 比率さえ合っていれば、地図のサイズも自由です。
 * 
 * ◆地図上に地点を表示
 * 『移動先マップＩＤ』『移動先Ｘ座標』『移動先Ｙ座標』
 * の各項目にフィールド上の座標が設定されているならば、
 * この時点で地図上に地点がシンボルとして表示されるようになります。
 * 
 * 問題は、移動先が町の中などフィールド以外だった場合です。
 * この場合、地点毎に地図に対応する座標を入力する必要があります。
 * 
 * ・『地図用マップＩＤ』
 * ・『地図用Ｘ座標』
 * ・『地図用Ｙ座標』
 * 
 * の各項目を設定してください。
 * 
 * なお、シンボルをゲームの開始時から表示したくないという場合は
 * 『点表示スイッチ』を設定して切り替えてください。
 * 『一覧表示スイッチ』と同じ番号のスイッチでも構いません。
 * 
 * ◆現在地の表示
 * 地図上にプレイヤーの現在地を表示するのは意外に困難です。
 * フィールド上にプレイヤーがいるなら、現在の座標を参照するだけですが、
 * 町やダンジョンなどの地点にいる場合は、そうもいきません。
 * 
 * よって、地点内にいる場合もフィールドの座標情報を保持する必要があります。
 * まず、プラグインパラメータの地図情報に以下項目を設定し、
 * 保持する変数を決めてください。
 * 
 * ・『現在地用マップＩＤ変数』
 * ・『現在地用Ｘ座標変数』
 * ・『現在地用Ｙ座標変数』
 * 
 * このプラグインでは、以下二つの自動化手段を用意しています。
 * 
 * １．フィールドから地点へ場所移動した際の座標を保持する。
 * ただし、イベントなどで地点から地点へ移動した際は当てになりません。
 * 最初に入った地点の座標が保持されたままになります。
 * 
 * また、イベントの演出で一時的にフィールドへ場所移動した場合、
 * この処理の対象になってしまうことも注意してください。
 * 
 * ２．地点へ場所移動した際に、地図用座標を取得する。
 * 該当の地点かどうかの判定は、『移動先マップＩＤ』で行います。
 * それだけでは不十分な場合は『座標更新用マップＩＤ』に追加できます。
 * 
 * もっとも、地点に属する全てのマップを登録するのは非現実的です。
 * 外部から遷移する可能性があるマップだけで十分です。
 * 
 * ※ダンジョンなど地図上に表示しない地点を登録したい場合は、
 * 　『移動先マップＩＤ』を空欄にした上で、
 * 　さらに『座標更新用マップＩＤ』だけを設定してください。
 * ※ＭＺ用プラグインコマンドの『地点一覧（追加）』で
 * 　追加した地点についてはこの機能は働きません。ご注意ください。
 * 
 * 上記の自動取得機能を停止したい場合は、
 * プラグインパラメータで切替も可能です。
 * 
 * 自動取得せずに、手動で上記の変数に値を設定しても構いません。
 * 状況によって柔軟に対応してください。
 * 例えば、ダンジョンからの脱出座標などと共有する方法もあります。
 * 
 * -------------------------------------------------------------------
 * ■プラグインコマンド（ＭＺ）
 * -------------------------------------------------------------------
 * ◆シーン開始
 * マップ選択画面を表示します。
 * 表示専用の指定をすれば、純粋に地図としての利用もできます。
 * 
 * また『地点一覧（追加）』を指定すれば、
 * 独自の一覧を追加することも可能です。
 * 
 * -------------------------------------------------------------------
 * ■プラグインコマンド（ＭＶ）
 * -------------------------------------------------------------------
 * ※大文字個別は区別しません。
 * 
 * ◆シーン開始
 * NRP.MapTravel.SceneStart
 * 
 * また、以下で表示専用になります。
 * NRP.MapTravel.SceneStart true
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
 * @command SceneStart
 * @text シーン開始
 * @desc 地点選択画面を呼び出します。
 * 
 * @arg AddSpotList
 * @text 地点一覧（追加）
 * @type struct<Spot>[]
 * @desc 表示される地点一覧の追加分です。
 * プラグインパラメータの地点一覧に結合します。
 * 
 * @arg ReadOnly
 * @text 表示専用
 * @type boolean
 * @desc 場所移動を禁止します。
 * 純粋に地図として使用する場合を想定しています。
 * 
 * @arg HideCommonList
 * @text 共通一覧を非表示
 * @type boolean
 * @desc 共通の地点一覧を表示せず追加分だけを表示します。
 * 
 * @------------------------------------------------------------------
 * @ プラグインパラメータ
 * @------------------------------------------------------------------
 * 
 * @param SpotList
 * @text 地点一覧
 * @type struct<Spot>[]
 * @desc 表示される地点の一覧です。
 * 表示条件なども含めて登録してください。
 * 
 * @param FieldMapList
 * @text 地図情報一覧
 * @type struct<FieldMap>[]
 * @desc 地図として表示されるフィールドマップの一覧です。
 * マップＩＤや画像などを登録してください。
 * 
 * @param SymbolList
 * @text シンボル画像一覧
 * @type struct<Symbol>[]
 * @default ["{\"SymbolId\":\"-1\",\"Memo\":\"現在地\",\"SymbolImage\":\"\",\"BlinkPeriod\":\"60\",\"Opacity\":\"255\",\"<NoImage>\":\"\",\"SymbolColor\":\"rgb(0, 255, 255)\",\"SymbolRadius\":\"8\"}","{\"SymbolId\":\"0\",\"Memo\":\"選択地点\",\"SymbolImage\":\"\",\"BlinkPeriod\":\"\",\"Opacity\":\"128\",\"<NoImage>\":\"\",\"SymbolColor\":\"rgb(255, 0, 0)\",\"SymbolRadius\":\"12\"}","{\"SymbolId\":\"1\",\"Memo\":\"各地点\",\"SymbolImage\":\"\",\"BlinkPeriod\":\"120\",\"Opacity\":\"510\",\"<NoImage>\":\"\",\"SymbolColor\":\"rgb(255, 255, 255)\",\"SymbolRadius\":\"5\"}"]
 * @desc 地図上に表示されるシンボル（各地点、選択地点、現在地）の一覧です。
 * 
 * @param <TransferCommonEvent>
 * @text ＜場所移動用コモン関連＞
 * @desc 場所移動時に実行されるコモンイベント関連項目です。
 * 
 * @param TransferCommonEvent
 * @parent <TransferCommonEvent>
 * @text 移動用コモンイベント
 * @type common_event
 * @desc 地点選択後に実行するコモンイベントです。
 * このイベント内で場所移動を実行してください。
 * 
 * @param MapIdVariable
 * @parent <TransferCommonEvent>
 * @text マップＩＤ変数
 * @type variable
 * @desc 地点選択後に場所移動先のマップＩＤを格納する変数です。
 * 
 * @param XVariable
 * @parent <TransferCommonEvent>
 * @text Ｘ座標変数
 * @type variable
 * @desc 地点選択後に場所移動先のＸ座標を格納する変数です。
 * 
 * @param YVariable
 * @parent <TransferCommonEvent>
 * @text Ｙ座標変数
 * @type variable
 * @desc 地点選択後に場所移動先のＹ座標を格納する変数です。
 * 
 * @param IdentifierVariable
 * @parent <TransferCommonEvent>
 * @text 識別用変数
 * @type variable
 * @desc 地点選択後に識別値を格納する変数です。
 * 地点毎に異なる処理をしたい場合に有用です。
 * 
 * @param <FieldMap>
 * @text ＜地図情報関連＞
 * @desc 地図情報関連の項目です。
 * 
 * @param UpdateWhenExitField
 * @parent <FieldMap>
 * @text 自動更新(フィールド脱出)
 * @type boolean
 * @default true
 * @desc フィールドから別のマップへ移動する際に地図座標用の変数を自動更新します。
 * 
 * @param UpdateWhenEnterSpot
 * @parent <FieldMap>
 * @text 自動更新(地点進入)
 * @type boolean
 * @default true
 * @desc 各地点へ移動した際に地図座標用の変数を自動更新します。
 * 『移動先マップＩＤ』および『座標更新用マップＩＤ』が基準。
 * 
 * @param CurrentSymbolId
 * @parent <FieldMap>
 * @text 現在地のシンボルＩＤ
 * @type number @min -999 @max 999
 * @default -1
 * @desc 現在地を表示するシンボルのＩＤです。
 * 
 * @param SelectedSymbolId
 * @parent <FieldMap>
 * @text 選択地点のシンボルＩＤ
 * @type number @min -999 @max 999
 * @default 0
 * @desc 選択地点を表示するシンボルのＩＤです。
 * 
 * @param <Layout>
 * @text ＜レイアウト関連＞
 * @desc レイアウト関連項目です。
 * 
 * @param SpotListWidth
 * @parent <Layout>
 * @text 地点一覧の横幅
 * @type number
 * @default 300
 * @desc 地点一覧の横幅です。
 * 
 * @param HelpHeight
 * @parent <Layout>
 * @text 解説枠の縦幅
 * @type number
 * @desc 解説枠の縦幅です。
 * 初期値（空欄）では二行分を確保します。0にすると非表示。
 * 
 * @param <Menu Command>
 * @text ＜メニューコマンド関連＞
 * @desc メニューコマンドに移動機能を表示する際の関連項目です。
 * 
 * @param ShowMenuCommand
 * @parent <Menu Command>
 * @text メニューコマンドに表示
 * @type boolean
 * @default false
 * @desc メニューコマンドに移動機能を追加します。
 * 
 * @param ShowMenuCommandPosition
 * @parent <Menu Command>
 * @text メニューコマンド挿入位置
 * @type number
 * @default 4
 * @desc メニューコマンドに移動機能を挿入する位置です。
 * 0が先頭になります。
 * 
 * @param TravelName
 * @parent <Menu Command>
 * @text メニュー表示名
 * @type text
 * @default 移動
 * @desc 移動機能の表示コマンド名を設定します。
 * 
 * @param MenuCommandSwitch
 * @parent <Menu Command>
 * @text 表示許可するスイッチ
 * @type switch
 * @desc スイッチがオンの時のみコマンドを表示します。
 * 空白なら常に表示します。
 * 
 * @param MaskString
 * @parent MenuCommandSwitch
 * @text マスク文字列
 * @type string
 * @desc 表示許可するスイッチがオフの際、指定した文字列でコマンドを表示します。空欄ならコマンド自体を非表示。
 * 
 * @param DisableSwitch
 * @parent <Menu Command>
 * @text 禁止するスイッチ
 * @type switch
 * @desc スイッチがオンの時のみコマンドを禁止（灰色）します。
 * 空白なら常に許可します。
 * 
 * @param TravelSymbol
 * @parent <Menu Command>
 * @text [上級]記号
 * @type text
 * @default maptravel
 * @desc 移動機能の記号を設定します。
 * この値は他のプラグインと連携する際に使用できます。
 * 
 * @param ReadOnlyMenu
 * @parent <Menu Command>
 * @text 参照専用
 * @type boolean
 * @default false
 * @desc 移動コマンドを参照専用にします。
 * 地図としての利用を想定しています。
 * 
 * @param <Other>
 * @text ＜その他＞
 * @desc その他の項目です。
 * 
 * @param StartCommonEvent
 * @parent <Other>
 * @text 開始時コモンイベント
 * @type common_event
 * @desc シーン開始時に実行されるコモンイベントです。
 * メッセージ表示等が可能ですが、機能は限定的です。
 */

/*~struct~Spot:ja
 * @param SpotName
 * @text 地点名
 * @type text
 * @desc 表示される地点の名前です。
 * \i[1]などのアイコン表示も有効です。
 * 
 * @param Description
 * @text 説明文
 * @type multiline_string
 * @desc 地点の説明文です。
 * 
 * @param TransferMapId
 * @text 移動先マップＩＤ
 * @type text
 * @desc 移動先のマップＩＤです。数式可。
 * 空欄だと一覧に表示されません。
 * 
 * @param TransferX
 * @text 移動先Ｘ座標
 * @type text
 * @desc 移動先のＸ座標です。数式可。
 * 
 * @param TransferY
 * @text 移動先Ｙ座標
 * @type text
 * @desc 移動先のＹ座標です。数式可。
 * 
 * @param TransferDirection
 * @text 移動後の向き
 * @type select
 * @option そのまま @value 0
 * @option 下 @value 2
 * @option 左 @value 4
 * @option 右 @value 6
 * @option 上 @value 8
 * @desc 移動後の向きです。
 * 
 * @param TransferIdentifier
 * @text 移動先識別値
 * @type number
 * @desc 移動先の地点を識別するための値です。
 * 『識別用変数』に値が格納されます。
 * 
 * @param TransferCommonEvent
 * @text 移動用コモンイベント
 * @type common_event
 * @desc 地点選択後に実行するコモンイベントです。
 * 全体で設定したものより優先されます。
 * 
 * @param Icons
 * @text アイコン（複数）
 * @type struct<SwitchIcon>[]
 * @desc 地点名の横にアイコンを追加します。
 * 例えば、イベント発生中の地点を明示するなど。
 * 
 * @param <FieldMap>
 * @text ＜地図情報関連＞
 * @desc 地図情報関連の項目です。
 * 
 * @param FieldMapId
 * @parent <FieldMap>
 * @text 地図用マップＩＤ
 * @type text
 * @desc 地図に対応するフィールドのマップＩＤです。数式可。
 * 空欄だと『移動先マップＩＤ』を流用します。
 * 
 * @param FieldX
 * @parent <FieldMap>
 * @text 地図用Ｘ座標
 * @type text
 * @desc 地図に対応するフィールド上での地点のＸ座標です。数式可。
 * 空欄だと『移動先Ｘ座標』を流用します。
 * 
 * @param FieldY
 * @parent <FieldMap>
 * @text 地図用Ｙ座標
 * @type text
 * @desc 地図に対応するフィールド上での地点のＹ座標です。数式可。
 * 空欄だと『移動先Ｙ座標』を流用します。
 * 
 * @param LocationUpdateMapId
 * @parent <FieldMap>
 * @text 座標更新用マップＩＤ
 * @type text
 * @desc 地図座標の更新を行うマップＩＤです。複数指定可
 * 例１：1,2,3 例２：1~3
 * 
 * @param SymbolId
 * @parent <FieldMap>
 * @text シンボルＩＤ
 * @type number @min -999 @max 999
 * @default 1
 * @desc 表示するシンボルのＩＤです。
 * 空欄にすると非表示になります。
 * 
 * @param Condition
 * @text ＜条件＞
 * 
 * @param ListingSwitch
 * @parent Condition
 * @text 一覧表示スイッチ
 * @type switch
 * @desc 地点がリスト上に表示される条件となるスイッチです。
 * 空欄なら常に表示します。
 * 
 * @param PointSwitch
 * @parent Condition
 * @text 点表示スイッチ
 * @type switch
 * @desc 地点を地図上の点として表示する条件となるスイッチです。
 * 空欄なら常に表示します。
 * 
 * @param DisableSwitch
 * @parent Condition
 * @text 選択禁止スイッチ
 * @type switch
 * @desc 選択を禁止するスイッチです。
 * リスト上には灰色で表示されるようになります。
 */

/*~struct~FieldMap:ja
 * @param MapId
 * @text マップＩＤ
 * @type number
 * @desc 地図に対応するマップのＩＤです。
 * 
 * @param MapImage
 * @text マップ画像
 * @type file
 * @dir img/pictures
 * @desc 地図として使用する画像です。
 * 
 * @param BackgroundColor
 * @text 背景色
 * @type text
 * @desc 地図の背景色です。例：rgb(255, 255, 255)
 * 数値は赤、緑、青に対応。空欄なら透明。
 * 
 * @param CurrentMapIdVariable
 * @text 現在地用マップＩＤ変数
 * @type variable
 * @desc 地図上の現在地となるマップＩＤを格納する変数です。
 * 
 * @param CurrentXVariable
 * @text 現在地用Ｘ座標変数
 * @type variable
 * @desc 地図上の現在地となるＸ座標を格納する変数です。
 * 
 * @param CurrentYVariable
 * @text 現在地用Ｙ座標変数
 * @type variable
 * @desc 地図上の現在地となるＹ座標を格納する変数です。
 * 
 * @param ValidSwitch
 * @text 有効とするスイッチ
 * @type switch
 * @desc 地図を有効とするスイッチです。空欄なら常に表示。
 * 同一マップＩＤの場合、リストの上側が優先されます。
 */

/*~struct~Symbol:ja
 * @param SymbolId
 * @text シンボルＩＤ
 * @type number @min -999 @max 999
 * @desc シンボルに対応するＩＤです。
 * 各地点との紐付けに使います。
 * 
 * @param Memo
 * @text メモ
 * @type text
 * @desc ユーザが識別するためのメモです。
 * ゲーム中には一切使用しません。
 * 
 * @param SymbolImage
 * @text シンボル画像
 * @type file
 * @dir img/pictures
 * @desc シンボルとして使用する画像です。
 * 未指定の場合は円形の点が描画されます。
 * 
 * @param BlinkPeriod
 * @text 点滅周期
 * @type number
 * @default 120
 * @desc シンボルが点滅する周期です。
 * 1/60秒単位で設定してください。0で点滅なし
 * 
 * @param Opacity
 * @text 不透明度
 * @type number
 * @default 510
 * @desc シンボルの不透明度（0~255）です。
 * 255を超えると点滅時の表示時間が伸びます。
 * 
 * @param <NoImage>
 * @text ＜画像未指定の場合＞
 * @desc 画像が未指定の場合に有効となる項目です。
 * 
 * @param SymbolColor
 * @parent <NoImage>
 * @text シンボルの色
 * @type text
 * @desc シンボル色です。例：rgb(255, 255, 255)
 * 数値は赤、緑、青に対応します。
 * 
 * @param SymbolRadius
 * @parent <NoImage>
 * @text シンボルの半径
 * @type number
 * @default 8
 * @desc シンボルの半径です。
 */

/*~struct~SwitchIcon:ja
 * @param IconIndex
 * @text アイコン番号
 * @type text
 * @desc 地点名の横に表示するアイコンの番号です。
 * 右クリックで『アイコン番号の挿入』ができます。
 * 
 * @param NameColor
 * @text 文字色
 * @type number
 * @desc 地点名の文字色を変更します。
 * システムカラーの番号を指定してください。
 * 
 * @param DispSwitch
 * @text 表示スイッチ
 * @type switch
 * @desc アイコンの表示条件となるスイッチです。
 * 空欄なら常に表示します。
 */

// 幅・高さ参照用のマップデータ
$dataMapTempSpot = null;

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
    return str ? str : def;
}

const PLUGIN_NAME = "NRP_MapTravel";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pSpotList = parseStruct2(parameters["SpotList"]);
const pFieldMapList = parseStruct2(parameters["FieldMapList"]);
const pSymbolList = parseStruct2(parameters["SymbolList"]);
// コモンイベント関連
const pTransferCommonEvent = toNumber(parameters["TransferCommonEvent"]);
const pMapIdVariable = toNumber(parameters["MapIdVariable"]);
const pXVariable = toNumber(parameters["XVariable"]);
const pYVariable = toNumber(parameters["YVariable"]);
const pIdentifierVariable = toNumber(parameters["IdentifierVariable"]);
// 地図情報関連
const pUpdateWhenExitField = toBoolean(parameters["UpdateWhenExitField"]);
const pUpdateWhenEnterSpot = toBoolean(parameters["UpdateWhenEnterSpot"]);
const pCurrentSymbolId = toNumber(parameters["CurrentSymbolId"]);
const pSelectedSymbolId = toNumber(parameters["SelectedSymbolId"]);
// レイアウト関連
const pSpotListWidth = toNumber(parameters["SpotListWidth"], 300);
const pHelpHeight = toNumber(parameters["HelpHeight"]);
// メニューコマンド関連
const pShowMenuCommand = toBoolean(parameters["ShowMenuCommand"], false);
const pShowMenuCommandPosition = toNumber(parameters["ShowMenuCommandPosition"], 4);
const pTravelName = parameters["TravelName"];
const pMenuCommandSwitch = toNumber(parameters["MenuCommandSwitch"]);
const pMaskString = setDefault(parameters["MaskString"]);
const pDisableSwitch = toNumber(parameters["DisableSwitch"]);
const pTravelSymbol = parameters["TravelSymbol"];
const pReadOnlyMenu = toBoolean(parameters["ReadOnlyMenu"], false);
// その他
const pStartCommonEvent = toNumber(parameters["StartCommonEvent"]);

//----------------------------------------
// ＭＺ用プラグインコマンド
//----------------------------------------

// MVには存在しないため、空で定義しておかないとエラーになる。
if (!PluginManager.registerCommand) {
    PluginManager.registerCommand = function() {}
}

/** 選択対象となる地点一覧 */
let mSpotList = null;
/** 表示専用 */
let mReadOnly = false;
// ロード中のマップＩＤ
let mLoadMapId = null;
// ロード済のマップ情報を格納する配列
// ※変化しない情報なのでゲーム終了まで永続的に保持する。
const mMapsInfo = [];

/**
 * ●シーン開始
 */
PluginManager.registerCommand(PLUGIN_NAME, "SceneStart", function(args) {
    // 表示専用の判定
    mReadOnly = toBoolean(args.ReadOnly);
    // 地点一覧の生成
    if (toBoolean(args.HideCommonList)) {
        // 共通一覧を非表示の場合
        mSpotList = [];
    } else {
        // 通常
        mSpotList = pSpotList;
    }

    if (args.AddSpotList) {
        // プラグインコマンドの場合は、
        // なぜか謎の文字コード（001B）が含まれているので\に変換
        let addSpotList = args.AddSpotList.replace(/\u001B/g, "\\");
        // JSON形式をJS用に変換
        addSpotList = parseStruct2(addSpotList);
        // リストを結合
        mSpotList = mSpotList.concat(addSpotList);
    }

    // 地点一覧を編集
    mSpotList = editSpotList(mSpotList);

    // 選択肢ウィンドウが存在する場合は非表示
    // ※ゴミが残らないようにするため
    if (SceneManager._scene._choiceListWindow) {
        SceneManager._scene._choiceListWindow.hide();
    }

    // シーン開始
    SceneManager.push(Scene_SelectSpots);
});

/**
 * ●地点一覧を編集する。
 */
function editSpotList(argSpotList) {
    const newSpotList = [];

    for (let spot of argSpotList) {
        // 編集して追加
        newSpotList.push(editSpot(spot));
    }

    return newSpotList;
}

/**
 * ●地点を編集して返す
 */
function editSpot(spot) {
    // Window_Helpの表示用
    // ※デフォルトでdescriptionを表示している模様。
    spot.description = spot.Description;
    // 場所移動先
    spot.transferMapId = eval(spot.TransferMapId);
    spot.transferX = eval(spot.TransferX);
    spot.transferY = eval(spot.TransferY);
    spot.transferDirection = eval(spot.TransferDirection);
    spot.transferIdentifier = eval(spot.TransferIdentifier);
    spot.transferCommonEvent = eval(spot.TransferCommonEvent);
    // アイコン情報
    spot.icons = parseStruct2(spot.Icons);
    // 地図表示用
    spot.fieldMapId = eval(spot.FieldMapId);
    spot.fieldX = eval(spot.FieldX);
    spot.fieldY = eval(spot.FieldY);
    // 未入力かつフィールド登録されたマップならば、場所移動先をコピー
    if (!spot.fieldMapId && isField(spot.transferMapId)) {
        spot.fieldMapId = spot.transferMapId;
        spot.fieldX = spot.transferX;
        spot.fieldY = spot.transferY;
    }
    // 配列へ変換
    spot.locationUpdateMapId = textToArray(spot.LocationUpdateMapId);

    spot.symbolId = eval(spot.SymbolId);
    // スイッチ類
    spot.listingSwitch = eval(spot.ListingSwitch);
    spot.pointSwitch = eval(spot.PointSwitch);
    spot.disableSwitch = eval(spot.DisableSwitch);

    return spot;
}

/**
 * ●文字列を分解して配列に変換する。
 * ※例１："1,2,3" -> [1,2,3]
 * ※例２："1~3" -> [1,2,3]
 */
function textToArray(textArr) {
    const array = [];
    
    // 無効なら処理しない。
    if (textArr === undefined || textArr === null || textArr === "") {
        return array;
    }

    // カンマ区切りでループ
    for (let text of textArr.split(",")) {
        // 空白除去
        text = text.trim();
        // 1~5というように範囲指定の場合
        // ※~が存在する。
        if (text.indexOf("~") >= 0) {
            const rangeVal = text.split("~");
            const rangeStart = eval(rangeVal[0]);
            const rangeEnd = eval(rangeVal[1]);

            // IDの指定範囲で実行
            // 開始のほうが終了より大きい場合は反対に実行
            if (rangeEnd < rangeStart) {
                for (let i = rangeStart; i >= rangeEnd; i--) {
                    array.push(eval(i));
                }
            } else {
                for (let i = rangeStart; i <= rangeEnd; i++) {
                    array.push(eval(i));
                }
            }
            
        // 通常時
        } else {
            array.push(eval(text));
        }
    }
    return array;
}

/**
 * ●フィールド登録されているか？
 */
function isField(mapId) {
    // 設定がない場合は処理終了
    if (!pFieldMapList) {
        return false;
    }
    return pFieldMapList.some(fieldMap => fieldMap.MapId == mapId);
}

/**
 * ●現在のマップに対するフィールド情報を取得できるか？
 */
function getFieldInfo(mapId) {
    // 設定がない場合は処理終了
    if (!pFieldMapList) {
        return null;
    }
    const fieldInfo = pFieldMapList.find(fieldMap => isValidField(fieldMap, mapId));
    if (fieldInfo) {
        // 値を加工
        fieldInfo.mapId = eval(fieldInfo.MapId);
        fieldInfo.mapImage = fieldInfo.MapImage;
        fieldInfo.backgroundColor = fieldInfo.BackgroundColor;
        fieldInfo.currentMapIdVariable = eval(fieldInfo.CurrentMapIdVariable);
        fieldInfo.currentXVariable = eval(fieldInfo.CurrentXVariable);
        fieldInfo.currentYVariable = eval(fieldInfo.CurrentYVariable);
    }
    return fieldInfo;
}

/**
 * ●地図表示が有効かを判定
 */
function isValidField(fieldMap, mapId) {
    // マップＩＤが一致し、かつ画像が存在する。
    if (fieldMap.MapId == mapId && fieldMap.MapImage) {
        // スイッチの指定があり、かつオフの場合は無効とする。
        if (fieldMap.ValidSwitch && !$gameSwitches.value(fieldMap.ValidSwitch)) {
            return false;
        }
        return true;
    }
    return false;
}

//----------------------------------------
// ＭＶ用プラグインコマンド
//----------------------------------------

const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);

    // 小文字化してから判定
    const lowerCommand = command.toLowerCase();
    
    /**
     * ●シーン開始
     */
    if (lowerCommand === "nrp.maptravel.scenestart") {
        mReadOnly = toBoolean(args[0]);
        // 地点一覧を編集
        mSpotList = editSpotList(pSpotList);
        // 選択肢ウィンドウが存在する場合は非表示
        // ※ゴミが残らないようにするため
        if (SceneManager._scene._choiceListWindow) {
            SceneManager._scene._choiceListWindow.hide();
        }
        // シーン開始
        SceneManager.push(Scene_SelectSpots);
    }
};

//-----------------------------------------------------------------------------
// Scene_SelectSpots
//
// 地点選択シーン用クラス

function Scene_SelectSpots() {
    this.initialize(...arguments);
}

Scene_SelectSpots.prototype = Object.create(Scene_MenuBase.prototype);
Scene_SelectSpots.prototype.constructor = Scene_SelectSpots;

Scene_SelectSpots.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
    if (Utils.RPGMAKER_NAME != "MV") {
        Scene_Message.prototype.initialize.call(this);
    } else {
        // MVにはScene_Messageがないので何もしない
    }

    // 地図画像の読込
    this.loadMapImage();

    // フィールド情報が取得できる場合
    const fieldMap = getFieldInfo($gameMap.mapId());
    if (fieldMap) {
        // 地図上座標を変数に格納
        if (fieldMap.currentMapIdVariable) {
            $gameVariables.setValue(fieldMap.currentMapIdVariable, $gameMap.mapId());
        }
        if (fieldMap.currentXVariable) {
            $gameVariables.setValue(fieldMap.currentXVariable, $gamePlayer.x);
        }
        if (fieldMap.currentYVariable) {
            $gameVariables.setValue(fieldMap.currentYVariable, $gamePlayer.y);
        }
    }
};
    
/**
 * ●更新処理
 */
Scene_SelectSpots.prototype.update = function() {
    // コモンイベント用のinterpreterを実行
    if (this.isActive()) {
        this.updateInterpreter();
    }

    Scene_MenuBase.prototype.update.call(this);
};

/**
 * ●イベント動作更新
 * ※コモンイベント用のinterpreterを実行
 */
Scene_SelectSpots.prototype.updateInterpreter = function() {
    if (this._interpreter) {
        this._interpreter.update();
    }
};

/**
 * ●準備完了かどうか？
 */
Scene_SelectSpots.prototype.isReady = function() {
    // マップデータの読込
    const result = this.loadDataMap();
    // 未完了なら待つ
    if (!result) {
        return false;
    }

    return Scene_MenuBase.prototype.isReady.call(this);
};

/**
 * ●イベント実行判定
 */
Scene_SelectSpots.prototype.isEventRunning = function() {
    if (this._interpreter) {
        return this._interpreter.isRunning();
    }
    return false;
};

/**
 * ●画像読込
 */
Scene_SelectSpots.prototype.loadMapImage = function() {
    // 設定がない場合は処理終了
    if (!pFieldMapList) {
        return;
    }

    // 設定画像を読込
    for (const fieldMap of pFieldMapList) {
        if (fieldMap.MapImage) {
            ImageManager.loadPicture(fieldMap.MapImage);
        }
    }
};

/**
 * ●マップデータの読込
 */
Scene_SelectSpots.prototype.loadDataMap = function() {
    // ロード中のマップＩＤがある場合
    if (mLoadMapId) {
        // まだロードが完了していない場合は終了して待つ
        if (!$dataMapTempSpot) {
            return false;
        }

        //---------------------------------
        // マップデータの読込が完了した！
        //---------------------------------
        // 読込済のマップ情報に追加
        const mapInfo = {};
        mapInfo.mapId = mLoadMapId;
        mapInfo.width = $dataMapTempSpot.width;
        mapInfo.height = $dataMapTempSpot.height;
        mMapsInfo.push(mapInfo);

        // ロード中マップＩＤをクリア
        mLoadMapId = null;
        // 不要になったのでクリア
        $dataMapTempSpot = null;
    }

    // 設定がない場合は処理終了
    if (!pFieldMapList) {
        return true;
    }

    // フィールド用マップＩＤだけを抽出した配列を作成
    let fieldMapIdArray = mSpotList.map(spot => spot.fieldMapId);
    // 重複除去
    fieldMapIdArray = Array.from(new Set(fieldMapIdArray))

    for (const fieldMap of pFieldMapList) {
        const mapId = toNumber(fieldMap.MapId);
        // 一覧に存在しておりながら、
        // かつ、まだ読み込まれていないマップデータが存在するか？
        if (fieldMapIdArray.includes(mapId) && !mMapsInfo.some(m => m.mapId == mapId)) {
            // マップデータをロード
            const filename = "Map%1.json".format(mapId.padZero(3));
            DataManager.loadDataFile("$dataMapTempSpot", filename);

            // ロード中のマップＩＤを設定
            mLoadMapId = mapId;
            return;
        }
    }

    // 全ての必要データが読み込まれた。
    return true;
};

/**
 * ●ウィンドウの生成
 */
Scene_SelectSpots.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);

    // ヘルプウィンドウ
    this.createHelpWindow();

    // 選択用ウィンドウ
    let wx = 0;
    let wy = this.mainAreaTop();
    let ww = pSpotListWidth;
    const wh = Graphics.boxHeight - this.buttonAreaHeight() - this.helpAreaHeight();
    this._selectWindow = new Windows_SelectSpots(new Rectangle(wx, wy, ww, wh));
    this._selectWindow.setHelpWindow(this._helpWindow);
    this._selectWindow.setHandler("ok", this.onSpotSelectOk.bind(this));
    this._selectWindow.setHandler('cancel', this.onSpotSelectCancel.bind(this));
    this.addWindow(this._selectWindow);

    // マップ表示用ウィンドウ
    wx = this._selectWindow.width;
    ww = Graphics.boxWidth - wx;
    this._mapWindow = new Windows_MapDisplay(new Rectangle(wx, wy, ww, wh));
    this.addWindow(this._mapWindow);

    // マップ表示用ウィンドウへの参照を設定
    this._selectWindow.setMapWindow(this._mapWindow);

    // メッセージ表示用の設定
    this.createMessageWindows();
};

/**
 * ●処理開始
 */
Scene_SelectSpots.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    if (Utils.RPGMAKER_NAME != "MV") {
        Scene_Message.prototype.start.call(this);
    }

    // 地点選択ウィンドウを更新してフォーカス
    this._selectWindow.refresh();
    this._selectWindow.activate();
    // this._mapWindow.deactivate();

    // 開始時コモンイベントがある場合は始動
    if (pStartCommonEvent) {
        this._interpreter = new Game_Interpreter();
        $gameTemp.reserveCommonEvent(pStartCommonEvent);
        this._interpreter.setupReservedCommonEvent();
    }
};

/**
 * ●ＭＶでは未定義の関数なので追加
 */
if (Utils.RPGMAKER_NAME == "MV") {
    Scene_SelectSpots.prototype.mainAreaTop = function() {
        if (!this.isBottomHelpMode()) {
            return this.helpAreaBottom();
        } else if (this.isBottomButtonMode()) {
            return 0;
        } else {
            return this.buttonAreaBottom();
        }
    };

    Scene_SelectSpots.prototype.isBottomHelpMode = function() {
        return false;
    };
    
    Scene_SelectSpots.prototype.helpAreaBottom = function() {
        return this.helpAreaTop() + this.helpAreaHeight();
    };

    Scene_SelectSpots.prototype.helpAreaTop = function() {
        if (this.isBottomHelpMode()) {
            return this.mainAreaBottom();
        } else if (this.isBottomButtonMode()) {
            return 0;
        } else {
            return this.buttonAreaBottom();
        }
    };

    Scene_SelectSpots.prototype.mainAreaBottom = function() {
        return this.mainAreaTop() + this.mainAreaHeight();
    };

    Scene_SelectSpots.prototype.mainAreaHeight = function() {
        return Graphics.boxHeight - this.buttonAreaHeight() - this.helpAreaHeight();
    };

    Scene_SelectSpots.prototype.buttonAreaHeight = function() {
        return 0;
    };

    Scene_SelectSpots.prototype.isBottomButtonMode = function() {
        return false;
    };

    Scene_SelectSpots.prototype.buttonAreaBottom = function() {
        return this.buttonAreaTop() + this.buttonAreaHeight();
    };

    Scene_SelectSpots.prototype.buttonAreaTop = function() {
        if (this.isBottomButtonMode()) {
            return Graphics.boxHeight - this.buttonAreaHeight();
        } else {
            return 0;
        }
    };

    Scene_SelectSpots.prototype.createHelpWindow = function() {
        this._helpWindow = new Window_Help();
        this.addWindow(this._helpWindow);
        if (pHelpHeight != undefined) {
            this._helpWindow.height = pHelpHeight;
        }
    };
}

/**
 * ●ヘルプウィンドウの縦幅
 */
Scene_SelectSpots.prototype.helpAreaHeight = function() {
    if (pHelpHeight != undefined) {
        return pHelpHeight;
    }
    // MVの場合は既に設定済の縦幅を参照
    if (Utils.RPGMAKER_NAME == "MV") {
        return this._helpWindow.height;
    }
    return Scene_MenuBase.prototype.helpAreaHeight.call(this);
};

//----------------------------------------
// 地点選択用ウィンドウ
//----------------------------------------

/**
 * ●地点の選択開始
 */
Scene_SelectSpots.prototype.onSpotSelectStart = function() {
    // 地点選択ウィンドウの表示＆フォーカス
    this._selectWindow.show();
    this._selectWindow.activate();
    this._selectWindow.refresh();
    // 地点情報ウィンドウの表示。ただし選択しない
    this._mapWindow.show();
    this._mapWindow.deselect();
    this._mapWindow.deactivate()
};

/**
 * ●地点の選択キャンセル
 */
Scene_SelectSpots.prototype.onSpotSelectCancel = function() {
    // 前シーンへ遷移
    this.popScene();
};

/**
 * ●地点選択確定時
 */
Scene_SelectSpots.prototype.onSpotSelectOk = function() {
    // 選択中の地点を取得
    const spot = this._selectWindow.item();
    // 遷移先を取得
    const mapId = spot.transferMapId;
    const x = spot.transferX;
    const y = spot.transferY;
    const transferIdentifier = spot.transferIdentifier;
    const direction = spot.transferDirection;

    // コモンイベントＩＤ（個別指定があれば優先）
    const commonEvent = spot.transferCommonEvent || pTransferCommonEvent;

    // 場所移動先を変数に格納
    if (pMapIdVariable) {
        $gameVariables.setValue(pMapIdVariable, mapId);
    }
    if (pMapIdVariable) {
        $gameVariables.setValue(pXVariable, x);
    }
    if (pMapIdVariable) {
        $gameVariables.setValue(pYVariable, y);
    }
    if (pIdentifierVariable) {
        $gameVariables.setValue(pIdentifierVariable, transferIdentifier);
    }

    // 座標自動更新（地点進入時）
    // ※通常は場所移動後の移動先マップＩＤをキーにして自動取得されるので、ここの設定は不要。
    // 　ＭＺ版プラグインコマンドの追加リストの場合のみ意味がある。
    if (pUpdateWhenEnterSpot) {
        // フィールド情報が取得できる場合
        const fieldMap = getFieldInfo(spot.fieldMapId);
        if (fieldMap) {
            // 地図上座標を変数に格納
            if (fieldMap.currentMapIdVariable && spot.fieldMapId != undefined) {
                $gameVariables.setValue(fieldMap.currentMapIdVariable, spot.fieldMapId);
            }
            if (fieldMap.currentXVariable && spot.fieldX != undefined) {
                $gameVariables.setValue(fieldMap.currentXVariable, spot.fieldX);
            }
            if (fieldMap.currentYVariable && spot.fieldY != undefined) {
                $gameVariables.setValue(fieldMap.currentYVariable, spot.fieldY);
            }
        }
    }

    // シーン開始（マップ画面へ）
    SceneManager.push(Scene_Map);

    // コモンイベントの指定がない場合
    if (!commonEvent) {
        // フェードタイプ（黒）
        const fadeType = 0;
        // 場所移動実行
        $gamePlayer.reserveTransfer(mapId, x, y, direction, fadeType);
        return;
    }

    // 向きを設定
    $gamePlayer.setDirection(direction);

    const interpreter = $gameMap._interpreter;
    // メニューから呼び出された場合
    if (!interpreter._list) {
        interpreter.setup($dataCommonEvents[commonEvent].list, 0);
        return;
    }
    // コモンイベントを呼び出し
    interpreter.setupChild($dataCommonEvents[commonEvent].list, 0);
    // NRP_CallEvent.jsとの連携用
    interpreter._childInterpreter.setCommonEventId(commonEvent);
};

/**
 * ●地点キャンセル
 */
Scene_SelectSpots.prototype.onSpotCancel = function() {
    this._mapWindow.deselect();
    // 地点選択ウィンドウに戻る
    this._selectWindow.activate();
};

//----------------------------------------
// 以下メッセージ表示用
//----------------------------------------

/**
 * ●停止
 */
Scene_SelectSpots.prototype.stop = function() {
    if (Utils.RPGMAKER_NAME != "MV") {
        Scene_Message.prototype.stop.call(this);
    }
};

/**
 * ●終了時
 */
Scene_SelectSpots.prototype.terminate = function() {
    if (Utils.RPGMAKER_NAME != "MV") {
        Scene_Message.prototype.terminate.call(this);
    }
};

/**
 * ●メッセージが閉じている最中か？
 */
Scene_SelectSpots.prototype.isMessageWindowClosing = function() {
    return this._messageWindow.isClosing();
};

/**
 * ●ウィンドウ生成
 */
Scene_SelectSpots.prototype.createMessageWindows = function() {
    if (Utils.RPGMAKER_NAME != "MV") {
        this.createMessageWindow();
        this.createScrollTextWindow();
        this.createNameBoxWindow();
        this.createChoiceListWindow();
        this.createNumberInputWindow();
        this.createEventItemWindow();
        this.associateWindows();

    } else {
        this.createMessageWindow();
        this.createScrollTextWindow();
    }

    // メッセージウィンドウの下が消えないよう調整
    this.addChild(this._windowLayer.removeChild(this._messageWindow));
    this.addChild(this._windowLayer.removeChild(this._scrollTextWindow));
};

Scene_SelectSpots.prototype.createMessageWindow = function() {
    if (Utils.RPGMAKER_NAME != "MV") {
        Scene_Message.prototype.createMessageWindow.call(this);
    } else {
        Scene_Map.prototype.createMessageWindow.call(this);
    }
};

Scene_SelectSpots.prototype.createScrollTextWindow = function() {
    if (Utils.RPGMAKER_NAME != "MV") {
        Scene_Message.prototype.createScrollTextWindow.call(this);
    } else {
        Scene_Map.prototype.createScrollTextWindow.call(this);
    }
};

Scene_SelectSpots.prototype.createNameBoxWindow = function() {
    Scene_Message.prototype.createNameBoxWindow.call(this);
};

Scene_SelectSpots.prototype.createChoiceListWindow = function() {
    Scene_Message.prototype.createChoiceListWindow.call(this);
};

Scene_SelectSpots.prototype.createNumberInputWindow = function() {
    Scene_Message.prototype.createNumberInputWindow.call(this);
};

Scene_SelectSpots.prototype.createEventItemWindow = function() {
    Scene_Message.prototype.createEventItemWindow.call(this);
};

Scene_SelectSpots.prototype.messageWindowRect = function() {
    return Scene_Message.prototype.messageWindowRect.call(this);
};

Scene_SelectSpots.prototype.scrollTextWindowRect = function() {
    return Scene_Message.prototype.scrollTextWindowRect.call(this);
};

Scene_SelectSpots.prototype.eventItemWindowRect = function() {
    return Scene_Message.prototype.eventItemWindowRect.call(this);
};

Scene_SelectSpots.prototype.associateWindows = function() {
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
Scene_SelectSpots.prototype.showMessage = function(message) {
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
// Windows_SelectSpots
//
// 地点選択用ウィンドウ

function Windows_SelectSpots() {
    this.initialize(...arguments);
}

Windows_SelectSpots.prototype = Object.create(Window_Selectable.prototype);
Windows_SelectSpots.prototype.constructor = Windows_SelectSpots;

/**
 * ●初期化
 */
Windows_SelectSpots.prototype.initialize = function(rect) {
    if (Utils.RPGMAKER_NAME === "MV") {
        Window_Selectable.prototype.initialize.call(this, rect.x, rect.y, rect.width, rect.height);
        this.innerWidth = this.contentsWidth();
        this.innerHeight = this.contentsHeight();
    } else {
        Window_Selectable.prototype.initialize.call(this, rect);
    }
    // 先頭を選択しておく。
    this.select(0);
};

/**
 * ●描画更新
 */
Windows_SelectSpots.prototype.refresh = function() {
    this.makeItemList();
    Window_Selectable.prototype.refresh.call(this);
};

/**
 * ●更新
 */
Windows_SelectSpots.prototype.update = function() {
    // イベント実行中は処理しない
    if (SceneManager._scene.isEventRunning()) {
        return;
    }
    Window_Selectable.prototype.update.call(this);
};

/**
 * ●項目生成
 */
Windows_SelectSpots.prototype.makeItemList = function() {
    this._data = mSpotList.filter(spot => this.isListingSpot(spot));
};

/**
 * ●地点が一覧に表示する項目かを判定
 */
Windows_SelectSpots.prototype.isListingSpot = function(spot) {
    // 場所移動先の設定がない
    if (spot.transferMapId == undefined) {
        return false;

    // 一覧表示用のスイッチが指定されているが、オフである。
    } else if (spot.listingSwitch && !$gameSwitches.value(spot.listingSwitch)) {
        return false;
    }
    // それ以外は有効
    return true;
};

/**
 * ●項目表示
 */
Windows_SelectSpots.prototype.drawItem = function(index) {
    const item = this.itemAt(index);
    if (item) {
        const rect = this.itemLineRect(index);
        // 選択可不可の表示制御
        this.changePaintOpacity(isSpotEnabled(item));
        // 地点名の表示
        this.drawItemName(item, rect.x, rect.y);
        // 表示を戻す
        this.changePaintOpacity(1);
    }
};

/**
 * ●ＭＶにはない関数なので追加
 */
if (Utils.RPGMAKER_NAME === "MV") {
    Windows_SelectSpots.prototype.itemLineRect = function(index) {
        const rect = this.itemRectWithPadding(index);
        const padding = (rect.height - this.lineHeight()) / 2;
        rect.y += padding;
        rect.height -= padding * 2;
        return rect;
    };

    Windows_SelectSpots.prototype.itemRectWithPadding = function(index) {
        const rect = this.itemRect(index);
        const padding = this.itemPadding();
        rect.x += padding;
        rect.width -= padding * 2;
        return rect;
    };

    Windows_SelectSpots.prototype.itemPadding = function() {
        return 8;
    };
}

/**
 * ●選択中の項目が選択可能かどうか？
 */
Windows_SelectSpots.prototype.isCurrentItemEnabled = function() {
    return isSpotEnabled(this.item());
};

/**
 * ●選択中の項目を取得
 */
Windows_SelectSpots.prototype.item = function() {
    return this.itemAt(this.index());
};

/**
 * ●項目の取得
 */
Windows_SelectSpots.prototype.itemAt = function(index) {
    return this._data && index >= 0 ? this._data[index] : null;
};

/**
 * ●最大項目数
 */
Windows_SelectSpots.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

/**
 * ●項目名の表示
 */
Windows_SelectSpots.prototype.drawItemName = function(item, x, y) {
    if (item) {
        const textMargin = 4;
        const iconDrawWidth = ImageManager.iconWidth + 4;

        // 全体の描画幅を取得
        let drawWidth = this.innerWidth - 20;
        let color = null;

        // アイコンを描画（逆順にして右から順に描画）
        let iconX = x + drawWidth + 8;
        for (const iconInfo of item.icons.reverse()) {
            const dispSwitch = eval(iconInfo.DispSwitch);
            // 表示スイッチの指定があり、かつオフの場合は非表示
            if (dispSwitch && !$gameSwitches.value(dispSwitch)) {
                continue;
            }

            if (iconInfo.IconIndex) {
                // アイコン幅分だけ左へ移動
                iconX -= iconDrawWidth;
                drawWidth -= iconDrawWidth;

                const iconIndex = eval(iconInfo.IconIndex);
                this.drawIcon(iconIndex, iconX, y);
            }

            // 最初の色を優先
            if (color == null) {
                color = toNumber(iconInfo.NameColor);
            }
        }

        // 地点名の描画
        this.resetTextColor();
        // 色指定がある場合は変更
        if (color != null) {
            this.changeTextColor(ColorManager.textColor(color));
        }
        this.drawTextEx(item.SpotName, x + textMargin, y, drawWidth);
    }
};

/**
 * ●文字列描画処理
 * ※Window_Base.prototype.drawTextExとほぼ同じだがフォントリセットしない。
 */
Windows_SelectSpots.prototype.drawTextEx = function(text, x, y, width) {
    // ＭＶ対応
    if (Utils.RPGMAKER_NAME == "MV") {
        if (text) {
            let textState = { index: 0, x: x, y: y, left: x };
            textState.text = this.convertEscapeCharacters(text);
            textState.height = this.calcTextHeight(textState, false);
            while (textState.index < textState.text.length) {
                this.processCharacter(textState);
            }
            return textState.x - x;
        } else {
            return 0;
        }
    }

    // ＭＺ
    const textState = this.createTextState(text, x, y, width);
    this.processAllText(textState);
    return textState.outputWidth;
};

/**
 * ●文字列の出力
 * ※Windows_Baseの関数をオーバーライド
 */
Windows_SelectSpots.prototype.flushTextState = function(textState) {
    const text = textState.buffer;
    const rtl = textState.rtl;
    
    // 指定したwidthに合わせるように調整
    // ただし、アイコン出力時はtextが空白になるので考慮
    let width = 0;
    if (text) {
        width = textState.width || this.textWidth(text);
    }
    // const width = this.textWidth(text);

    const height = textState.height;
    const x = rtl ? textState.x - width : textState.x;
    const y = textState.y;
    if (textState.drawing) {
        this.contents.drawText(text, x, y, width, height);
    }
    textState.x += rtl ? -width : width;
    textState.buffer = this.createTextBuffer(rtl);
    const outputWidth = Math.abs(textState.x - textState.startX);
    if (textState.outputWidth < outputWidth) {
        textState.outputWidth = outputWidth;
    }
    textState.outputHeight = y - textState.startY + height;
};

/**
 * ●カーソル移動時
 */
Windows_SelectSpots.prototype.select = function(index) {
    Window_Selectable.prototype.select.apply(this, arguments);

    // 選択中の地点情報をマップ表示用ウィンドウへ反映
    if (this._mapWindow) {
        this._mapWindow.setItem(this.itemAt(index));
    }
};

/**
 * ●地点決定時
 */
Windows_SelectSpots.prototype.processOk = function() {
    // 読取専用の場合は処理しない
    if (mReadOnly) {
        return;
    }
    Window_Selectable.prototype.processOk.apply(this, arguments);
};


/**
 * ●マップ表示用ウィンドウの設定
 */
Windows_SelectSpots.prototype.setMapWindow = function(window) {
    this._mapWindow = window;
};

/**
 * ●ヘルプ更新
 */
Windows_SelectSpots.prototype.updateHelp = function() {
    this.setHelpWindowItem(this.item());
};

/**
 * ●地点が選択可能かどうか？
 */
function isSpotEnabled(item) {
    if (!item) {
        return false;

    // 無効スイッチがオンの場合
    } else if (item.disableSwitch && $gameSwitches.value(item.disableSwitch)) {
        return false;
    }

    return true;
};

//-----------------------------------------------------------------------------
// Windows_MapDisplay
//
// マップ表示用ウィンドウ

function Windows_MapDisplay() {
    this.initialize(...arguments);
}

Windows_MapDisplay.prototype = Object.create(Window_Base.prototype);
Windows_MapDisplay.prototype.constructor = Windows_MapDisplay;

Windows_MapDisplay.prototype.initialize = function(rect) {
    if (Utils.RPGMAKER_NAME === "MV") {
        Window_Base.prototype.initialize.call(this, rect.x, rect.y, rect.width, rect.height);
        this.innerWidth = this.contentsWidth();
        this.innerHeight = this.contentsHeight();
    } else {
        Window_Base.prototype.initialize.call(this, rect);
    }

    // ポイント点滅用のカウント
    this._timeCount = 0;
};

/**
 * ●描画更新
 */
Windows_MapDisplay.prototype.refresh = function() {
    this.contents.clear();
    this.drawAllItems();
};

/**
 * ●描画更新（常時）
 */
Windows_MapDisplay.prototype.update = function() {
    this.contents.clear();
    this.drawAllItems();

    // ポイントの不透明度更新用のカウント
    this._timeCount++;
};

/**
 * ●各項目の描画
 */
Windows_MapDisplay.prototype.drawAllItems = function() {
    if (!this._item) {
        return;
    }
    const fieldMapId = this._item.fieldMapId;

    // 不透明度を戻す
    this.contents.paintOpacity = 255;

    // 一致する地図用マップ情報を取得
    const fieldMapItem = getFieldInfo(fieldMapId);
    // 地図を描画
    if (fieldMapItem) {
        this.drawMap(fieldMapItem);
        this.show();

    // 存在しない場合はウィンドウ非表示
    } else {
        this.hide();
        return;
    }

    // マップ情報が取得できなければ終了
    if (!this._mapInfo) {
        return;
    }

    // 該当マップのポイントを取得
    // 表示条件を満たすか判定
    for (const spot of mSpotList) {
        // フィールド用マップＩＤが一致する場合
        if (spot.fieldMapId == fieldMapId) {
            this.drawPoint(spot);
        }
    }

    // 現在地を表示
    this.drawCurrentPoint();
};

/**
 * ●マップ画像の描画
 */
Windows_MapDisplay.prototype.drawMap = function(item) {
    const imageName = item.mapImage;
    const bgColor = item.backgroundColor;

    const bitmap = ImageManager.loadPicture(imageName);

    // 地図画像と描画サイズの比率を取得
    // ※縦と横の小さいほうに合わせる。
    // ※1よりは小さくならない。
    this._drawScale = Math.min(this.innerWidth / bitmap.width, this.innerHeight / bitmap.height, 1);

    // 最終的に描画するサイズ
    const pw = bitmap.width * this._drawScale;
    const ph = bitmap.height * this._drawScale;

    // 切取開始位置
    const sx = 0;
    const sy = 0;
    // 切り取る画像サイズ
    const sw = bitmap.width;
    const sh = bitmap.height;
    // 画像描画位置（中央寄せ）
    const dx = (this.innerWidth - pw) / 2;
    const dy = (this.innerHeight - ph) / 2;
    // 背景色描画
    if (bgColor) {
        this.contents.fillRect(dx, dy, pw, ph, bgColor);
    }
    // 地図描画実行
    this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, pw, ph);

    // 点の描画に参照するため保持しておく
    this._drawMapWidth = pw;
    this._drawMapHeight = ph;
    this._drawMapX = dx;
    this._drawMapY = dy;
};

/**
 * ●地点シンボルの描画
 */
Windows_MapDisplay.prototype.drawPoint = function(item) {
    // 点表示用のスイッチが指定されているが、オフである。
    if (item.pointSwitch && !$gameSwitches.value(item.pointSwitch)) {
        // 点非表示
        return;
    }

    // シンボル情報を取得する。
    const symbol = getSymbol(item.symbolId);
    // シンボルの描画
    this.drawSymbol(item.fieldX, item.fieldY, symbol);

    //----------------------------------------
    // 選択中の地点ならば
    //----------------------------------------
    if (this._item == item) {
        // シンボル情報を取得する。
        const selectedSymbol = getSymbol(pSelectedSymbolId);
        // シンボルの描画
        this.drawSymbol(item.fieldX, item.fieldY, selectedSymbol);
    }
};

/**
 * ●シンボルの描画
 */
Windows_MapDisplay.prototype.drawSymbol = function(x, y, symbol) {
    if (!symbol) {
        return;
    }

    // ここで一旦不透明度を戻さないと、なぜかうまく表示されない。
    this.contents.paintOpacity = 255;
    // シンボル画像を取得
    const bitmap = getSymbolBitmap(symbol);

    // タイルの中央（描画ピクセル幅 / マップ座標幅 / 2）
    const tileCenterX = this._drawMapWidth / this._mapInfo.width / 2;
    const tileCenterY = this._drawMapHeight / this._mapInfo.height / 2;

    // 画像描画位置（地図の描画座標 + 描画ピクセル幅 * (フィールド座標 / マップ座標幅) + タイルの中央調整）
    const dx = this._drawMapX + this._drawMapWidth * x / this._mapInfo.width + tileCenterX;
    const dy = this._drawMapY + this._drawMapHeight * y / this._mapInfo.height + tileCenterY;

    // 点滅周期
    const periodicTime = toNumber(symbol.BlinkPeriod);
    // 点滅時の最大不透明度（255を超えた値を入力するとその分表示時間が長くなる）
    const maxOpacity = toNumber(symbol.Opacity);

    if (periodicTime) {
        // ポイント点滅用の不透明度を求める式
        // ※sinは-1~1の値を周期的に循環するので、それを利用して0 -> 255 -> 0を循環させる。
        this.contents.paintOpacity = (0.5 + 0.5 * Math.sin(this._timeCount / periodicTime * Math.PI * 2)) * maxOpacity;

    // 周期が空欄の場合は点滅しない。
    } else {
        this.contents.paintOpacity = maxOpacity;
    }

    // 地点描画実行
    if (bitmap) {
        const sw = bitmap.width;
        const sh = bitmap.height;
        // 画像の中央を基準に修正
        const fixDx = dx - sw / 2;
        const fixDy = dy - sh / 2;
        this.contents.blt(bitmap, 0, 0, sw, sh, fixDx, fixDy);

    // 画像指定がない場合は点を描画
    } else {
        const radius = eval(symbol.SymbolRadius);
        this.contents.drawCircle(dx, dy, radius, symbol.SymbolColor);
    }
};

/**
 * ●現在地シンボルの描画
 */
Windows_MapDisplay.prototype.drawCurrentPoint = function() {
    const fieldMapId = this._item.fieldMapId;
    const fieldMap = getFieldInfo(fieldMapId);

    // フィールド情報が取得できない。
    // または、現在のフィールドと一致しない
    if (!fieldMap || fieldMapId != $gameVariables.value(fieldMap.currentMapIdVariable)) {
        return;
    }
    
    const fieldX = this.getFieldPlayerX();
    const fieldY = this.getFieldPlayerY();
    // 座標を取得できなければ終了
    if (fieldX == undefined || fieldY == undefined) {
        return;
    }

    // シンボル情報を取得する。
    const symbol = getSymbol(pCurrentSymbolId);
    // シンボルの描画
    this.drawSymbol(fieldX, fieldY, symbol);
};

/**
 * ●プレイヤーのフィールド上のＸ座標を取得
 */
Windows_MapDisplay.prototype.getFieldPlayerX = function() {
    // フィールド情報が取得できる場合
    const fieldMap = getFieldInfo(this._item.fieldMapId);
    if (fieldMap && fieldMap.currentMapIdVariable) {
        // 登録されているＸ座標を返す
        return $gameVariables.value(fieldMap.currentXVariable);

    // 現在地がフィールドの場合
    } else if ($gameMap.mapId() == this._item.fieldMapId) {
        return $gamePlayer.x;
    }
    return undefined;
};

/**
 * ●プレイヤーのフィールド上のＹ座標を取得
 */
Windows_MapDisplay.prototype.getFieldPlayerY = function() {
    // フィールド情報が取得できる場合
    const fieldMap = getFieldInfo(this._item.fieldMapId);
    if (fieldMap && fieldMap.currentMapIdVariable) {
        // 登録されているＹ座標を返す
        return $gameVariables.value(fieldMap.currentYVariable);

    // 現在地がフィールドの場合
    } else if ($gameMap.mapId() == this._item.fieldMapId) {
        return $gamePlayer.y;
    }
    return undefined;
};

/**
 * ●地点情報を設定します。
 */
Windows_MapDisplay.prototype.setItem = function(item) {
    if (!item) {
        return;
    }

    this._item = item;
    // マップ情報を取得して設定（ここのwidth, heightはグリッド数のこと）
    this._mapInfo = mMapsInfo.find(m => m.mapId == item.fieldMapId);
    // リフレッシュ
    this.refresh();
};

/**
 * ●シンボル情報を取得する。
 */
function getSymbol(symbolId) {
    if (pSymbolList) {
        return pSymbolList.find(symbol => symbol.SymbolId == symbolId);
    }
    return undefined;
}

/**
 * ●シンボル情報を取得する。
 */
function getSymbolBitmap(symbol) {
    if (symbol && symbol.SymbolImage) {
        return ImageManager.loadPicture(symbol.SymbolImage);
    }
    return undefined;
}

//-----------------------------------------------------------------------------
// 場所移動時
//-----------------------------------------------------------------------------

/**
 * ●場所移動時
 */
const _Game_Player_performTransfer = Game_Player.prototype.performTransfer;
Game_Player.prototype.performTransfer = function() {
    if (this.isTransferring()) {
        // 地図座標自動更新時（フィールド脱出）
        if (pUpdateWhenExitField) {
            // フィールド情報が取得できる場合
            const fieldMap = getFieldInfo($gameMap.mapId());
            if (fieldMap) {
                // 移動前の地図上座標を変数に格納
                if (fieldMap.currentMapIdVariable) {
                    $gameVariables.setValue(fieldMap.currentMapIdVariable, $gameMap.mapId());
                }
                if (fieldMap.currentXVariable) {
                    $gameVariables.setValue(fieldMap.currentXVariable, $gamePlayer.x);
                }
                if (fieldMap.currentYVariable) {
                    $gameVariables.setValue(fieldMap.currentYVariable, $gamePlayer.y);
                }
            }
        }
    }

    _Game_Player_performTransfer.apply(this, arguments);
};

/**
 * ●場所移動終了後
 */
const _Scene_Map_onTransferEnd = Scene_Map.prototype.onTransferEnd;
Scene_Map.prototype.onTransferEnd = function() {
    // 地図座標自動更新時（地点進入）
    if (pUpdateWhenEnterSpot) {
        // 移動先のマップＩＤと一致する地点を取得
        let spot = pSpotList.find(spot => isUpdateSpot(spot));
        if (spot) {
            // 編集されてないので編集
            spot = editSpot(spot);

            // フィールド情報が取得できる場合
            const fieldMap = getFieldInfo(spot.fieldMapId);
            if (fieldMap) {
                // 登録されているフィールド座標を反映
                if (fieldMap.currentMapIdVariable && spot.fieldMapId != undefined) {
                    $gameVariables.setValue(fieldMap.currentMapIdVariable, spot.fieldMapId);
                }
                if (fieldMap.currentXVariable && spot.fieldX != undefined) {
                    $gameVariables.setValue(fieldMap.currentXVariable, spot.fieldX);
                }
                if (fieldMap.currentYVariable && spot.fieldY != undefined) {
                    $gameVariables.setValue(fieldMap.currentYVariable, spot.fieldY);
                }
            }
        }
    }

    _Scene_Map_onTransferEnd.apply(this, arguments);
};

/**
 * ●座標更新の対象となる地点かどうか？
 */
function isUpdateSpot(spot) {
    // フィールドの場合は座標更新しない
    if (isField($gameMap.mapId())) {
        return false;
    }

    // マップＩＤが移動先マップＩＤと一致
    if ($gameMap.mapId() == eval(spot.TransferMapId)) {
        return true;
    }

    // 地図座標更新用マップＩＤを配列展開
    const locationUpdateMapIds = textToArray(spot.LocationUpdateMapId);
    // 一致するマップＩＤが見つかった場合
    if (locationUpdateMapIds.some(mapId => mapId == $gameMap.mapId())) {
        return true;
    }
    
    // それ以外はfalse
    return false;
}

//-----------------------------------------------------------------------------
// メニューコマンド
//-----------------------------------------------------------------------------

if (pShowMenuCommand) {
    /**
     * ●メニューコマンド追加（独自コマンド）
     */
    const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function() {
        // 元処理実行
        _Window_MenuCommand_addOriginalCommands.call(this);

        // 非表示スイッチが存在かつオフの場合は無効
        if (pMenuCommandSwitch && !$gameSwitches.value(pMenuCommandSwitch)) {
            // 文字列の指定がある場合は表示
            if (pMaskString) {
                this._list.splice(pShowMenuCommandPosition, 0,
                    { name: pMaskString, symbol: pTravelSymbol, enabled: false, ext: null});
            }
            return;
        }
        
        let isEnabled = true;
        // 禁止スイッチが存在かつオンの場合は禁止
        if (pDisableSwitch && $gameSwitches.value(pDisableSwitch)) {
            isEnabled = false;
        }

        // 指定位置に移動コマンドを挿入
        // ※標準ではステータスの下
        this._list.splice(pShowMenuCommandPosition, 0,
            { name: pTravelName, symbol: pTravelSymbol, enabled: isEnabled, ext: null});
    };

    /**
     * ●メニューコマンド呼び出し先の設定
     */
    const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        // 元処理実行
        _Scene_Menu_createCommandWindow.call(this);

        // コマンド追加（地点選択へ）
        this._commandWindow.setHandler(pTravelSymbol, this.commandSelectSpots.bind(this));
    };

    /**
     * 【独自】シーン実行
     */
    Scene_Menu.prototype.commandSelectSpots = function() {
        mReadOnly = pReadOnlyMenu;
        // 地点一覧の生成
        mSpotList = pSpotList;
        // 地点一覧を編集
        mSpotList = editSpotList(mSpotList);
        SceneManager.push(Scene_SelectSpots);
    };
}

//-----------------------------------------------------------------------------
// その他関数
//-----------------------------------------------------------------------------

/**
 * 【独自】コモンイベントＩＤを設定する。
 * ※NRP_CallEvent.jsとの連携用
 */
Game_Interpreter.prototype.setCommonEventId = function(commonEventId) {
    this._commonEventId = commonEventId;
};

})();
