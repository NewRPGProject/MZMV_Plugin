//=============================================================================
// NRP_OriginalVehicle.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Add the original vehicles.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @orderAfter NRP_VehiclePassage
 * @url http://newrpg.seesaa.net/article/482502348.html
 *
 * @help Normally there are only three types of vehicles
 * that can be set, but you can freely add more.
 * In addition, detailed settings can be made for each of them.
 * 
 * - A low-flying carpet that can't go over mountains.
 * - A yellow bird that runs on land and shallow water.
 * - A black bird that can only land in forests.
 * - A machine that can go over dungeon-specific trap zones.
 *
 * ...... and so on.
 * 
 * The settings that can be configured for each vehicle are as follows.
 * 
 * - Standard setting information such as images and background music
 * - Terrain that can be passed through and get on/off
 * - Battle background
 * - Encounter rate
 * - Speed
 * - Direction when stopped
 * - Altitude of airship
 * 
 * [Usage]
 * In the list of vehicles in the plugin parameters,
 * set the Set the information of the vehicle you want to add.
 * The following fields are required.
 * 
 * ◆OriginalId
 * This is an ID to identify the vehicle.
 * This is required when you want to operate it from a plugin command.
 * 
 * ◆VehicleType
 * The type of vehicle to be used as the base.
 * If you want to fly in the sky, make it an airship.
 * 
 * Passage and getting on/off decisions
 * are also inherited from the base vehicle.
 * 
 * ◆Image & ImageIndex
 * The image to be displayed and its index.
 * 
 * 
 * If necessary, set other information
 * such as the PassageList (passage & getting on/off judgment).
 * It is possible to switch between enabling it
 * for all tilesets or calling it for each tileset,
 * depending on the parameters in the list.
 * 
 * Note that the location of the vehicle cannot be set
 * by the plugin parameters.
 * Please use the following plug-in commands to set the location.
 * 
 * [Plugin Command (MZ)]
 * By specifying the OriginalId, the target vehicle can be operated.
 * The following functions are enabled.
 * 
 * ◆Set Vehicle Location
 * ◆Change Vehicle Image
 * ◆Change Vehicle BGM
 * 
 * The contents are all the same
 * as the event commands for normal vehicles.
 * The only command that does not exist is "Get on/off Vehicle".
 * You can simply execute the "Get on/off Vehicle" event command.
 * 
* [Plugin Command (MV)]
 * ※No distinction is made between individual capital letters.
 *   Also, do not include [].
 * 
 * ◆Set Vehicle Location
 * NRP.OriginalVehical.SetVehicleLocation [OriginalId] [MapId] [X] [Y]
 * 
 * ◆Change Vehicle Image
 * NRP.OriginalVehical.ChangeVehicleImage [OriginalId] [ImageName] [ImageIndex]
 * 
 * ◆Change Vehicle BGM
 * NRP.OriginalVehical.ChangeVehicleBgm [OriginalId] [BgmName] [Volume] [Pitch] [Pan]
 * ※The items after the Volume can be omitted.
 * 
 * [Tilesets Notes]
 * If you want to set the passage and getting on/off judgment for each tileset,
 * specify the following in the Note field of the tileset.
 * 
 * <VehiclePassage:?>
 * 
 * ? is the "SettingId" registered in the PassageList.
 * It is also possible to specify multiple values
 * by separating them with commas.
 * <VehiclePassage:A,B,C>
 * 
 * [Script]
 * The following script can be used to determine
 * if you are on a specific vehicle.
 * Feel free to use them in combination with the event commands.
 * 
 * $gamePlayer.vehicleId() == "test"
 * 
 * ※Set the OriginalId in the "test" section.
 * 
 * [Notice]
 * Added vehicles are managed using OriginalId as a key.
 * 
 * If you change the OriginalId of the plugin parameter
 * when upgrading a published game,
 * the vehicle will disappear from the existing save data.
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 * 
 * @command SetVehicleLocation
 * @text Set Vehicle Location
 * @desc Change the location of the original vehicle.
 * 
 * @arg OriginalId
 * @type string
 * @desc The ID of the target vehicle.
 * 
 * @arg MapId
 * @desc The map ID to move the vehicle to.
 * If blank, the current map is targeted.
 * @type combo
 * @option $gameVariables.value(1)
 * 
 * @arg X
 * @desc The X coordinate to move the vehicle.
 * @type combo
 * @option $gameVariables.value(1)
 * @option $gamePlayer.x
 * 
 * @arg Y
 * @desc The Y coordinate to move the vehicle.
 * @type combo
 * @option $gameVariables.value(1)
 * @option $gamePlayer.y
 * 
 * 
 * @command ChangeVehicleImage
 * @text Change Vehicle Image
 * @desc Change the image of the original vehicle.
 * 
 * @arg OriginalId
 * @type string
 * @desc The ID of the target vehicle.
 * 
 * @arg Image
 * @type file
 * @dir img/characters/
 * @desc Character Image for the vehicle.
 * Must be specified as a set with ImageIndex.
 * 
 * @arg ImageIndex
 * @type number
 * @min 0 @max 7
 * @desc Index of character imagesto be used for the vehicle. Specify a value between 0 and 7.
 * 
 * @command ChangeVehicleBgm
 * @text Change Vehicle BGM
 * @desc Change the BGM of the original vehicle.
 * 
 * @arg OriginalId
 * @type string
 * @desc The ID of the target vehicle.
 * 
 * @arg BGM
 * @type struct<BGM>
 * @desc Information about the background music played during boarding.
 * 
 * 
 * @param VehicleList
 * @type struct<Vehicle>[]
 * @desc This is a list of original vehicles.
 */

/*~struct~Vehicle:
 * @param OriginalId
 * @type string
 * @desc This is an identifier to distinguish the original vehicles.
 * 
 * @param VehicleType
 * @type select
 * @option Boat @value boat
 * @option Ship @value ship
 * @option Airship @value airship
 * @default ship
 * @desc The type of vehicle you want to use as a base.
 * If you choose Airship, it will float in the sky.
 * 
 * @param Image
 * @type file
 * @dir img/characters/
 * @desc Character Image for the vehicle.
 * Must be specified as a set with ImageIndex.
 * 
 * @param ImageIndex
 * @type number
 * @min 0 @max 7
 * @desc Index of character imagesto be used for the vehicle. Specify a value between 0 and 7.
 * 
 * @param BGM
 * @type struct<BGM>
 * @desc BGM information to be played.
 * If blank, the BGM before the ride will be continued.
 * 
 * @param PassageList
 * @type struct<Passage>[]
 * @desc This is a list of vehicle passage & getting on/off settings.
 * 
 * @param BasePassage
 * @type select
 * @option Depends VehicleType @value
 * @option Allow @value on
 * @option Prohibit @value off
 * @desc This is the basic setting for the passage.
 * Set exceptions to the PassageList based on this.
 * 
 * @param BaseGetOn
 * @type select
 * @option Depends VehicleType @value
 * @option Allow @value on
 * @option Prohibit @value off
 * @desc This is the basic setting for getting on and off.
 * Set exceptions to the PassageList based on this.
 * 
 * @param Speed
 * @type number
 * @decimals 3
 * @desc The speed of the vehicle.
 * 4 is the standard speed. Decimals can also be specified.
 * 
 * @param DefaultDirection
 * @type select
 * @option up
 * @option right
 * @option down
 * @option left
 * @desc The direction the vehicle is facing when it is stationary.
 * Initially, it is facing left.
 * 
 * @param EncounterRate
 * @type number
 * @desc This is the encounter rate when you are on a vehicle.
 * Set the value based on 100.
 * 
 * @param Battleback1
 * @type file
 * @dir img/battlebacks1
 * @desc The battle background (below) during boarding.
 * This is only valid if the tileset is a field type.
 * 
 * @param Battleback2
 * @type file
 * @dir img/battlebacks2
 * @desc The battle background (above) during boarding.
 * This is only valid if the tileset is a field type.
 * 
 * @param UseWalkingBattleback
 * @type boolean
 * @default false
 * @desc Use the battle background when walking.
 * This is only valid if the tileset is a field type.
 * 
 * @param AirshipSetting
 * @desc This setting is valid only when the vehicle type is an airship.
 * 
 * @param AirshipAltitude
 * @parent AirshipSetting
 * @type number
 * @min 1
 * @desc The altitude of the airship. Default is 48.
 */

/*~struct~Passage:
 * @param SettingId
 * @type string
 * @desc Identifier used to call from the note field of a tileset. This is not required if "ValidAllTilesets" is on.
 * 
 * @param Memo
 * @type string
 * @desc This is a memo for identification.
 * Please give it an easy-to-understand name.
 * 
 * @param ValidAllTilesets
 * @type boolean
 * @default false
 * @desc Enables the setting for all tilesets. If turned off, the setting can be applied to individual tilesets.
 * 
 * @param <Condition>
 * 
 * @param TerrainTag
 * @parent <Condition>
 * @type string
 * @desc Specify the Terrain Tag (1~7) to be targeted.
 * Multiple tags can be specified. (Example: 1,3~5)
 * 
 * @param RegionId
 * @parent <Condition>
 * @type string
 * @desc Specify the Region Id (1~255) to be targeted.
 * Multiple ids can be specified. (Example: 1,3~5)
 * 
 * @param AutotileType
 * @parent <Condition>
 * @type string
 * @desc Specify the Autotile Type to be targeted.
 * Multiple types can be specified. (Example: 1,3~5)
 * 
 * @param TileId
 * @parent <Condition>
 * @type string
 * @desc Specify the Tile Id to be targeted.
 * Multiple ids can be specified. (Example: 1,3~5)
 * 
 * @param <PassageSetting>
 * 
 * @param CanPass
 * @parent <PassageSetting>
 * @type boolean
 * @desc Is it passable?
 * 
 * @param CanGetOn
 * @parent <PassageSetting>
 * @type boolean
 * @desc Is it possible to get in and out?
 */

/*~struct~BGM:
 * @param Name
 * @type file
 * @dir audio/bgm
 * @desc The file name of the BGM.
 * 
 * @param Volume
 * @type number
 * @default 90
 * @desc The volume of the BGM.
 * 
 * @param Pitch
 * @type number
 * @default 100
 * @desc The pitch of the BGM.
 * 
 * @param Pan
 * @type number
 * @default 0
 * @desc The pan of the BGM.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 オリジナルの乗物を追加します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @orderAfter NRP_VehiclePassage
 * @url http://newrpg.seesaa.net/article/482502348.html
 *
 * @help 通常は三種類しか設定できない乗物を、自由に追加できます。
 * さらにそれぞれに対して詳細な設定が可能です。
 * 
 * ・山を越えられない低空飛行の絨毯
 * ・陸地と浅瀬を走る黄色い馬鳥
 * ・森しか着陸できない黒い馬鳥
 * ・ダンジョン限定のトラップ地帯を越えられるマシン
 * 
 * ……などなど自由自在です。
 * 
 * 乗物毎に設定できる情報は以下の通りです。
 * 
 * ・画像、ＢＧＭなど標準の設定情報
 * ・通行＆乗降可能な地形
 * ・戦闘背景
 * ・エンカウント率
 * ・速度
 * ・停止時の向き
 * ・飛行船の高度
 * 
 * ■使用方法
 * プラグインパラメータの乗物リストに、
 * 追加したい乗物の情報を設定してください。
 * 以下は必須項目です。
 * 
 * ◆オリジナルＩＤ
 * 乗物を識別するためのＩＤです。
 * プラグインコマンドから操作したい場合などに必要となります。
 * 
 * ◆乗物タイプ
 * ベースとする乗物の種別です。
 * 空を飛ばしたい場合は飛行船にしてください。
 * 
 * 通行＆乗降判定などもベースとした乗物から引き継がれます。
 * 
 * ◆画像＆画像インデックス
 * 表示する画像とその位置です。
 * 
 * 
 * その他にも必要であれば、
 * 通行リスト（通行＆乗降判定）などの情報を設定してください。
 * 全タイルセットで有効とするか、タイルセット毎に呼び出すかを、
 * リスト内のパラメータによって切り替え可能です。
 * 
 * なお、プラグインパラメータでは乗物の位置は設定できません。
 * 以下のプラグインコマンドで位置を設定してください。
 * 
 * ■プラグインコマンド（ＭＺ）
 * オリジナルＩＤを指定することで、対象の乗物を操作できます。
 * 以下の機能が有効です。
 * 
 * ◆乗物の位置設定
 * ◆乗物の画像変更
 * ◆乗物のＢＧＭ変更
 * 
 * 内容は全て通常の乗物用のイベントコマンドと同一です。
 * なお、乗物の乗降のみコマンドが存在しません。
 * 普通にイベントコマンドにある『乗り物の乗降』を実行すればＯＫです。
 * 
 * ■プラグインコマンド（ＭＶ）
 * ※大文字個別は区別しません。また[]は含まないでください。
 * 
 * ◆乗物の位置設定
 * NRP.OriginalVehical.SetVehicleLocation [オリジナルＩＤ] [マップＩＤ] [Ｘ座標] [Ｙ座標]
 * 
 * ◆乗物の画像変更
 * NRP.OriginalVehical.ChangeVehicleImage [オリジナルＩＤ] [画像ファイル名] [画像インデックス]
 * 
 * ◆乗物のＢＧＭ変更
 * NRP.OriginalVehical.ChangeVehicleBgm [オリジナルＩＤ] [ＢＧＭ名] [音量] [ピッチ] [位相]
 * ※音量以降は省略可能です。
 * 
 * ■タイルセットのメモ欄
 * 乗物の通行＆乗降判定をタイルセット毎に設定する場合、
 * タイルセットのメモ欄に以下を指定してください。
 * 
 * <VehiclePassage:?>
 * 
 * ?の部分が通行リストに登録した『設定ＩＤ』となります。
 * また、カンマ区切りによって複数指定も可能です。
 * <VehiclePassage:A,B,C>
 * 
 * ■スクリプト
 * 以下のスクリプトで特定の乗物に乗っているかを判定できます。
 * イベントコマンドと組み合わせて、自由に活用してください。
 * 
 * $gamePlayer.vehicleId() == "test"
 * 
 * ※testの部分にオリジナルＩＤを設定してください。
 * 
 * ■注意点
 * 追加した乗物はオリジナルＩＤ単位で管理しています。
 * 
 * 公開した作品をバージョンアップなどした際に、
 * プラグインパラメータのオリジナルＩＤを変更すると
 * 既存のセーブデータ上からその乗物は消滅します。
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @command SetVehicleLocation
 * @text 乗物の位置設定
 * @desc オリジナルの乗物の位置を変更します。
 * 
 * @arg OriginalId
 * @text オリジナルＩＤ
 * @type string
 * @desc 対象とする乗物のＩＤです。
 * 
 * @arg MapId
 * @text マップＩＤ
 * @desc 乗物を移動させるマップＩＤです。
 * 空欄なら現在のマップを対象とします。
 * @type combo
 * @option $gameVariables.value(1) #変数で指定
 * 
 * @arg X
 * @text Ｘ座標
 * @desc 乗物を移動させるＸ座標です。
 * @type combo
 * @option $gameVariables.value(1) #変数で指定
 * @option $gamePlayer.x #プレイヤーのＸ座標
 * 
 * @arg Y
 * @text Ｙ座標
 * @desc 乗物を移動させるＹ座標です。
 * @type combo
 * @option $gameVariables.value(1) #変数で指定
 * @option $gamePlayer.y #プレイヤーのＹ座標
 * 
 * 
 * @command ChangeVehicleImage
 * @text 乗物の画像変更
 * @desc オリジナルの乗物の画像を変更します。
 * 
 * @arg OriginalId
 * @text オリジナルＩＤ
 * @type string
 * @desc 対象とする乗物のＩＤです。
 * 
 * @arg Image
 * @text 画像
 * @type file
 * @dir img/characters/
 * @desc 乗物に使用するキャラクター画像です。
 * 画像インデックスとセットで指定してください。
 * 
 * @arg ImageIndex
 * @text 画像インデックス
 * @type number
 * @min 0 @max 7
 * @desc 乗物に使用するキャラクター画像の参照位置です。
 * 0~7の値を指定してください。
 * 
 * 
 * @command ChangeVehicleBgm
 * @text 乗物のＢＧＭ変更
 * @desc オリジナルの乗物のＢＧＭを変更します。
 * 
 * @arg OriginalId
 * @text オリジナルＩＤ
 * @type string
 * @desc 対象とする乗物のＩＤです。
 * 
 * @arg BGM
 * @text ＢＧＭ
 * @type struct<BGM>
 * @desc 搭乗時に演奏されるＢＧＭ情報です。
 * 
 * 
 * @param VehicleList
 * @text 乗物リスト
 * @type struct<Vehicle>[]
 * @desc オリジナルの乗物一覧です。
 */

/*~struct~Vehicle:ja
 * @param OriginalId
 * @text オリジナルＩＤ
 * @type string
 * @desc オリジナルの乗物を区別するための識別子です。
 * 
 * @param VehicleType
 * @text 乗物タイプ
 * @type select
 * @option 小型船 @value boat
 * @option 大型船 @value ship
 * @option 飛行船 @value airship
 * @default ship
 * @desc ベースとなる乗物のタイプです。
 * 飛行船にすると空に浮かびます。
 * 
 * @param Image
 * @text 画像
 * @type file
 * @dir img/characters/
 * @desc 乗物に使用するキャラクター画像です。
 * 画像インデックスとセットで指定してください。
 * 
 * @param ImageIndex
 * @text 画像インデックス
 * @type number
 * @min 0 @max 7
 * @desc 乗物に使用するキャラクター画像の参照位置です。
 * 0~7の値を指定してください。
 * 
 * @param BGM
 * @text ＢＧＭ
 * @type struct<BGM>
 * @desc 搭乗時に演奏されるＢＧＭ情報です。
 * 空白なら乗る前のＢＧＭを継続します。
 * 
 * @param PassageList
 * @text 通行リスト
 * @type struct<Passage>[]
 * @desc 乗物の通行＆乗降設定の一覧です。
 * 
 * @param BasePassage
 * @text 基本通行設定
 * @type select
 * @option 乗物タイプに依存 @value
 * @option 許可 @value on
 * @option 禁止 @value off
 * @desc 通行の基本設定です。
 * これを基準にして通行リストに例外を設定します。
 * 
 * @param BaseGetOn
 * @text 基本乗降設定
 * @type select
 * @option 乗物タイプに依存 @value
 * @option 許可 @value on
 * @option 禁止 @value off
 * @desc 乗降の基本設定です。
 * これを基準にして通行リストに例外を設定します。
 * 
 * @param Speed
 * @text 速度
 * @type number
 * @decimals 3
 * @desc 乗物の速度です。
 * 4が標準速。小数も指定可能です。
 * 
 * @param DefaultDirection
 * @text 静止時の向き
 * @type select
 * @option 上 @value up
 * @option 右 @value right
 * @option 下 @value down
 * @option 左 @value left
 * @desc 乗物が静止している際の向きです。
 * 初期状態では左向きになっています。
 * 
 * @param EncounterRate
 * @text エンカウント率
 * @type number
 * @desc 搭乗中のエンカウント率です。
 * 100を基準に設定してください。
 * 
 * @param Battleback1
 * @text 戦闘背景１
 * @type file
 * @dir img/battlebacks1
 * @desc フィールドにて搭乗中の戦闘背景（下）です。
 * タイルセットがフィールドタイプの場合のみ有効です。
 * 
 * @param Battleback2
 * @text 戦闘背景２
 * @type file
 * @dir img/battlebacks2
 * @desc フィールドにて搭乗中の戦闘背景（上）です。
 * タイルセットがフィールドタイプの場合のみ有効です。
 * 
 * @param UseWalkingBattleback
 * @text 歩行時の戦闘背景を使用
 * @type boolean
 * @default false
 * @desc 歩行時の戦闘背景を使用します。
 * タイルセットがフィールドタイプの場合のみ有効です。
 * 
 * @param AirshipSetting
 * @text 飛行船の設定
 * @desc 乗物タイプが飛行船の場合のみ有効となる設定です。
 * 
 * @param AirshipAltitude
 * @text 飛行船の高度
 * @parent AirshipSetting
 * @type number
 * @min 1
 * @desc 飛行船の高度です。デフォルトは48となります。
 */

/*~struct~Passage:ja
 * @param SettingId
 * @text 設定ＩＤ
 * @type string
 * @desc タイルセットのメモ欄からの呼び出しに使う識別子です。
 * 『全タイルセットで有効』がオンの場合は不要です。
 * 
 * @param Memo
 * @text メモ
 * @type string
 * @desc 判別用のメモです。
 * 分かりやすい名前を付けてください。
 * 
 * @param ValidAllTilesets
 * @text 全タイルセットで有効
 * @type boolean
 * @default false
 * @desc 設定を全てのタイルセットで有効にします。
 * オフにした場合は、個別のタイルセットに設定できます。
 * 
 * @param <Condition>
 * @text ＜条件＞
 * 
 * @param TerrainTag
 * @text 地形タグ
 * @parent <Condition>
 * @type string
 * @desc 対象とする地形タグ（1~7）を指定します。
 * 複数指定も可能です。（例：1,3~5）
 * 
 * @param RegionId
 * @text リージョンＩＤ
 * @parent <Condition>
 * @type string
 * @desc 対象とするリージョン（1~255）を指定します。
 * 複数指定も可能です。（例：1,3~5）
 * 
 * @param AutotileType
 * @text オートタイルタイプ
 * @parent <Condition>
 * @type string
 * @desc 対象とするオートタイルタイプを指定します。
 * 複数指定も可能です。（例：1,3~5）
 * 
 * @param TileId
 * @text タイルＩＤ
 * @parent <Condition>
 * @type string
 * @desc 対象とするタイルＩＤを指定します。
 * 複数指定も可能です。（例：1,3~5）
 * 
 * @param <PassageSetting>
 * @text ＜通行設定＞
 * 
 * @param CanPass
 * @text 通行可能
 * @parent <PassageSetting>
 * @type boolean
 * @desc 通行可能かどうか？
 * 
 * @param CanGetOn
 * @text 乗降可能
 * @parent <PassageSetting>
 * @type boolean
 * @desc 乗降可能かどうか？
 */

/*~struct~BGM:ja
 * @param Name
 * @text ファイル名
 * @type file
 * @dir audio/bgm
 * @desc ＢＧＭのファイル名です。
 * 
 * @param Volume
 * @text 音量
 * @type number
 * @default 90
 * @desc ＢＧＭの音量です。
 * 
 * @param Pitch
 * @text ピッチ
 * @type number
 * @default 100
 * @desc ＢＧＭのピッチです。
 * 
 * @param Pan
 * @text 位相
 * @type number
 * @default 0
 * @desc ＢＧＭの位相です。
 */

//-----------------------------------------------------------------------------
// Original_Vehicle
//
// オリジナルの乗物を定義するクラス
// セーブデータで有効とするため、グローバル関数として定義する。
//
// ■注意
// ・Game_Player._vehicleType は Original_Vehicle._originalId に対応
// ・Original_Vehicle._type は デフォルトの乗物タイプ三種そのまま
// 混在しないように注意！
//

function Original_Vehicle() {
    this.initialize(...arguments);
}

(function() {
"use strict";

/**
 * バージョン互換対応
 */
if (!Array.prototype.find) {
    Array.prototype.find = function (predicate) {
        if (this === null) {
            throw new TypeError('Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return value;
            }
        }
        return undefined;
    };
}

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
    var ret = [];

    if (arg) {
        JSON.parse(arg).forEach(function(str) {
            ret.push(JSON.parse(str));
        });
    }

    return ret;
}

/**
 * ●引数を元に配列を取得する。
 */
function makeArray(values) {
    const results = [];
    if (!values) {
        return undefined;
    }

    // カンマ区切りでループ
    for (let value of values.split(",")) {
        // 空白除去
        value = value.trim();
        // 1~5というように範囲指定の場合
        // ※~が存在する。
        if (value.indexOf("~") >= 0) {
            const range = value.split("~");
            const rangeStart = eval(range[0]);
            const rangeEnd = eval(range[1]);

            // 指定範囲で実行
            // 開始のほうが終了より大きい場合は反対に実行
            if (rangeEnd < rangeStart) {
                for (let i = rangeStart; i >= rangeEnd; i--) {
                    results.push(eval(i));
                }
            } else {
                for (let i = rangeStart; i <= rangeEnd; i++) {
                    results.push(eval(i));
                }
            }
            
        // 通常時
        } else {
            // 数値変換するためeval
            results.push(eval(value));
        }
    }
    return results;
}

/**
 * ●プラグインコマンドの値を取得する。
 */
 function getCommandValue(value) {
    if (value === undefined) {
        return value;
    }
    // #以降は注釈扱いなので除去
    // さらに前後の空白を除去する。
    return value.split("#")[0].trim();
}

/**
 * ●パラメータのＢＧＭを使用できる形式に変換
 */
function convertBgm(param) {
    const bgm = JSON.parse(param);
    bgm.name = bgm.Name;
    bgm.volume = toNumber(bgm.Volume);
    bgm.pitch = toNumber(bgm.Pitch);
    bgm.pan = toNumber(bgm.Pan);
    return bgm;
}

const PLUGIN_NAME = "NRP_OriginalVehicle";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pVehicleList = parseStruct2(parameters["VehicleList"]);

/**
 * ●効率化のため事前変換
 */
for (const vehicle of pVehicleList) {
    vehicle.originalId = vehicle.OriginalId;
    vehicle.vehicleType = vehicle.VehicleType;
    vehicle.image = vehicle.Image;
    vehicle.imageIndex = toNumber(vehicle.ImageIndex, 0);
    vehicle.bgm = vehicle.BGM;
    vehicle.passageList = parseStruct2(vehicle.PassageList);
    vehicle.basePassage = vehicle.BasePassage;
    vehicle.baseGetOn = vehicle.BaseGetOn;
    vehicle.speed = toNumber(vehicle.Speed);
    vehicle.defaultDirection = vehicle.DefaultDirection;
    vehicle.encounterRate = toNumber(vehicle.EncounterRate);
    vehicle.battleback1 = vehicle.Battleback1;
    vehicle.battleback2 = vehicle.Battleback2;
    vehicle.useWalkingBattleback = toBoolean(vehicle.UseWalkingBattleback, false);
    vehicle.airshipAltitude = toNumber(vehicle.AirshipAltitude);

    // 通行設定
    for (const setting of vehicle.passageList) {
        setting.settingId = setting.SettingId;
        setting.vehicleType = setting.VehicleType;
        setting.validAllTilesets = toBoolean(setting.ValidAllTilesets, false);
        setting.terrainTags = makeArray(setting.TerrainTag);
        setting.regionIds = makeArray(setting.RegionId);
        setting.autotileTypes = makeArray(setting.AutotileType);
        setting.tileIds = makeArray(setting.TileId);
        setting.canPass = toBoolean(setting.CanPass);
        setting.canGetOn = toBoolean(setting.CanGetOn);
    }
}

//----------------------------------------
// ＭＺ用プラグインコマンド
//----------------------------------------

// MVには存在しないため、空で定義しておかないとエラーになる。
if (!PluginManager.registerCommand) {
    PluginManager.registerCommand = function() {}
}

/**
 * ●【ＭＺ用プラグインコマンド】乗物の位置設定
 */
PluginManager.registerCommand(PLUGIN_NAME, "SetVehicleLocation", function(args) {
    const originalId = getCommandValue(args.OriginalId);
    const vehicle = $gameMap.vehicle(originalId);
    if (vehicle) {
        // マップＩＤの指定がなければ現在マップ
        let mapId = eval(getCommandValue(args.MapId));
        if (!mapId) {
            mapId = $gameMap.mapId();
        }
        const x = eval(getCommandValue(args.X));
        const y = eval(getCommandValue(args.Y));

        vehicle.setLocation(mapId, x, y);
    }
});

/**
 * ●乗物画像の変更
 */
PluginManager.registerCommand(PLUGIN_NAME, "ChangeVehicleImage", function(args) {
    const originalId = getCommandValue(args.OriginalId);
    const vehicle = $gameMap.vehicle(originalId);
    if (vehicle) {
        const image = args.Image;
        const imageIndex = toNumber(args.ImageIndex, 0);
        vehicle.setImage(image, imageIndex);
    }
});

/**
 * ●乗物ＢＧＭの変更
 */
PluginManager.registerCommand(PLUGIN_NAME, "ChangeVehicleBgm", function(args) {
    const originalId = getCommandValue(args.OriginalId);
    const vehicle = $gameMap.vehicle(originalId);
    if (vehicle) {
        const bgm = convertBgm(args.BGM);
        vehicle.setBgm(bgm);
    }
});

//----------------------------------------
// ＭＶ用プラグインコマンド
//----------------------------------------

const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);

    // 小文字化してから判定
    const lowerCommand = command.toLowerCase();
    
    /**
     * ●乗物の位置設定
     */
    if (lowerCommand === "nrp.originalvehical.setvehiclelocation") {
        const originalId = args[0];

        const vehicle = $gameMap.vehicle(originalId);
        if (vehicle) {
            // マップＩＤの指定がなければ現在マップ
            let mapId = eval(args[1]);
            if (!mapId) {
                mapId = $gameMap.mapId();
            }
            const x = eval(args[2]);
            const y = eval(args[3]);

            vehicle.setLocation(mapId, x, y);
        }

    /**
     * ●乗物の画像変更
     */
    } else if (lowerCommand === "nrp.originalvehical.changevehicleimage") {
        const originalId = args[0];

        const vehicle = $gameMap.vehicle(originalId);
        if (vehicle) {
            const image = args[1];
            const imageIndex = toNumber(args[2], 0);
            vehicle.setImage(image, imageIndex);
        }

    /**
     * ●乗物のＢＧＭ変更
     */
    } else if (lowerCommand === "nrp.originalvehical.changevehiclebgm") {
        const originalId = args[0];

        const vehicle = $gameMap.vehicle(originalId);
        if (vehicle) {
            const bgm = [];
            bgm.name = args[1];
            bgm.volume = toNumber(args[2], 90);
            bgm.pitch = toNumber(args[3], 100);
            bgm.pan = toNumber(args[4], 0);
            vehicle.setBgm(bgm);
        }
    }
};

//----------------------------------------
// 乗物の追加
//----------------------------------------

/**
 * ●乗物の作成
 * ※起動時、ロード時に実行
 */
const _Game_Map_createVehicles = Game_Map.prototype.createVehicles;
Game_Map.prototype.createVehicles = function() {
    _Game_Map_createVehicles.apply(this, arguments);

    // オリジナル乗物を追加
    for (const param of pVehicleList) {
        const vehicle = new Original_Vehicle(param);
        this._vehicles.push(vehicle);
    }
};

/**
 * ●リフレッシュ
 */
const _Game_Map_refereshVehicles = Game_Map.prototype.refereshVehicles;
Game_Map.prototype.refereshVehicles = function() {
    // 現在の乗物リストをプラグインパラメータのオリジナル乗物リストに合わせる。
    // 既存のセーブからプラグインパラメータが変化した場合を考慮

    // オリジナル乗物情報に変化が合った場合
    if (isUnmatchVehicles(this.originalVehicles())) {
        // alert("unmatch!");

        // 新しいリストを作成する。
        const newVehicles = [];

        // まず標準の乗物を追加
        for (const vehicle of this._vehicles) {
            if (!(vehicle instanceof Original_Vehicle)) {
                newVehicles.push(vehicle);
            }
        }

        // オリジナル乗物を追加
        for (const paramVehicle of pVehicleList) {
            // オリジナルＩＤが一致する乗物が存在するか？
            const findVehicle = this._vehicles.find(function(v) {
                return v._originalId == paramVehicle.originalId;
            });

            // 既に存在する場合はそのまま使用
            if (findVehicle) {
                newVehicles.push(findVehicle);
            // 存在しない場合は新しく追加
            } else {
                newVehicles.push(new Original_Vehicle(paramVehicle));
            }
        }

        this._vehicles = newVehicles;
    }
    
    _Game_Map_refereshVehicles.apply(this, arguments);

    // オリジナル乗物のパラメータを更新
    // 同じくプラグインパラメータの変更を反映するため
    for (const vehicle of this.originalVehicles()) {
        const paramVehicle = pVehicleList.find(function(param) {
            return param.originalId == vehicle.originalId();
        });

        vehicle._originalParams = paramVehicle;
        vehicle._type = paramVehicle.vehicleType;
    }
};

/**
 * 【独自】オリジナル乗物のリストを取得
 */
Game_Map.prototype.originalVehicles = function() {
    return this._vehicles.filter(function(vehicle) {
        return vehicle instanceof Original_Vehicle;
    });
};

/**
 * 【独自】現在のマップで有効なオリジナル乗物のリストを取得
 */
Game_Map.prototype.validOriginalVehicles = function() {
    // オリジナル乗物かつ透明でないこと
    return this._vehicles.filter(function(vehicle) {
        return vehicle instanceof Original_Vehicle && !vehicle.isTransparent();
    });
};

/**
 * ●オリジナル乗物リストに不一致があるかどうか？
 */
function isUnmatchVehicles(originalVehicles) {
    // 件数が不一致ならば変化したと判断
    if (originalVehicles.length != pVehicleList.length) {
        return true;
    }

    // パラメータの追加リストと$gameMapのオリジナル乗物リストを比較
    for (const vehicle of originalVehicles) {
        // 追加リストに一致するオリジナルＩＤが存在しなかった場合
        const match = pVehicleList.some(function(param) {
            return param.originalId == vehicle.originalId();
        });
        if (!match) {
            // 不一致と判断
            return true;
        }
    }

    return false;
}

//-----------------------------------------------------------------------------
// Original_Vehicle
//
// オリジナルの乗物を定義するクラス

Original_Vehicle.prototype = Object.create(Game_Vehicle.prototype);
Original_Vehicle.prototype.constructor = Original_Vehicle;

Original_Vehicle.prototype.initialize = function(param) {
    // パラメータを保持しておく
    this._originalParams = param;

    Game_Vehicle.prototype.initialize.call(this, param.vehicleType);

    // オリジナルＩＤ
    this._originalId = param.originalId;
    // 画像
    this.setImage(param.image, param.imageIndex);
};

/**
 * ●向きのリセット
 */
Original_Vehicle.prototype.resetDirection = function() {
    const defaultDirection = this._originalParams.defaultDirection;

    // 静止時の向き
    if (defaultDirection == "up") {
        this.setDirection(8);
    } else if (defaultDirection == "right") {
        this.setDirection(6);
    } else if (defaultDirection == "left") {
        this.setDirection(4);
    } else if (defaultDirection == "down") {
        this.setDirection(2);
    // 指定がない場合は元の設定
    } else {
        Game_Vehicle.prototype.resetDirection.apply(this, arguments);
    }
};

/**
 * ●速度の初期化
 */
Original_Vehicle.prototype.initMoveSpeed = function() {
    const speed = this._originalParams.speed;

    // 指定がある場合は有効化
    if (speed) {
        this.setMoveSpeed(speed);
        return;
    }

    Game_Vehicle.prototype.initMoveSpeed.apply(this, arguments);
};

/**
 * ●ＢＧＭの演奏
 */
Original_Vehicle.prototype.playBgm = function() {
    const bgm = this._bgm || this.defaultBgm();
    // 存在しなければ演奏しない
    if (bgm) {
        AudioManager.playBgm(bgm);
    }
};

/**
 * ●デフォルトＢＧＭの取得
 */
Original_Vehicle.prototype.defaultBgm = function() {
    if (this._originalParams.bgm) {
        return convertBgm(this._originalParams.bgm);
    }
    return undefined;
};

/**
 * ●システム設定
 * ※何も処理しない。
 */
Original_Vehicle.prototype.loadSystemSettings = function() {

};

/**
 * ●オリジナル乗物の識別ＩＤ
 */
Original_Vehicle.prototype.originalId = function() {
    return this._originalId;
};

/**
 * ●通行情報を取得する。
 */
Original_Vehicle.prototype.passageList = function() {
    return this._originalParams.passageList;
};

/**
 * ●基本通行設定を取得する。
 */
Original_Vehicle.prototype.basePassage = function() {
    return this._originalParams.basePassage;
};

/**
 * ●基本乗降設定を取得する。
 */
Original_Vehicle.prototype.baseGetOn = function() {
    return this._originalParams.baseGetOn;
};

/**
 * ●有効な通行情報を取得する。
 */
Original_Vehicle.prototype.validPassageList = function() {
    // 設定リスト
    const vehiclePassageList = [];

    // 条件に一致する設定を抽出する。
    for (const setting of this.passageList()) {
        // どのタイルセットでも常に有効の場合
        if (setting.validAllTilesets) {
            // 追加して次へ
            vehiclePassageList.push(setting);
            continue;
        }

        // 有効な設定ＩＤかどうかを確認
        if (isValidSetting(setting.settingId, $gameMap.tileset())) {
            // 追加して次へ
            vehiclePassageList.push(setting);
        }
    }

    return vehiclePassageList;
};

/**
 * ●飛行船の最大高度
 */
Original_Vehicle.prototype.maxAltitude = function() {
    if (this._originalParams.airshipAltitude !== undefined) {
        return this._originalParams.airshipAltitude;
    }

    return Game_Vehicle.prototype.maxAltitude.apply(this, arguments);;
};

/**
 * ●飛行船の更新
 */
Original_Vehicle.prototype.updateAirship = function() {
    Game_Vehicle.prototype.updateAirship.apply(this, arguments);

    // 最大高度が0以下の場合、プライオリティタイプを下げないように調整
    if (this.maxAltitude() <= 0) {
        if (this._driving) {
            this.setPriorityType(2);
            this.setStepAnime(true);
        } else {
            this.setPriorityType(0);
            this.setStepAnime(false);
        }
    }
};

/**
 * ●追加の通行判定
 */
Original_Vehicle.prototype.isOriginalPassable = function(x, y) {
    const setting = getMatchSetting(x, y, this.validPassageList());
    // 条件設定が取得できた場合、通行判定を適用
    if (setting && setting.canPass !== undefined) {
        return setting.canPass;
    }

    // 原則許可の場合はtrue固定
    if (this.basePassage() == "on") {
        return true;

    // 原則禁止の場合はfalse固定
    } else if (this.basePassage() == "off") {
        return false;
    }

    // 設定がない場合はundefinedで返す
    return undefined;
};

/**
 * ●追加の乗降判定
 */
Original_Vehicle.prototype.isOriginalLandOk = function(x, y) {
    const setting = getMatchSetting(x, y, this.validPassageList());
    // 条件設定が取得できた場合、乗降判定を適用
    if (setting && setting.canGetOn !== undefined) {
        return setting.canGetOn;
    }

    // 原則許可の場合はtrue固定
    if (this.baseGetOn() == "on") {
        return true;

    // 原則禁止の場合はfalse固定
    } else if (this.baseGetOn() == "off") {
        return false;
    }

    // 設定がない場合はundefinedで返す
    return undefined;
};

/**
 * ●エンカウント率補正
 */
Original_Vehicle.prototype.encounterRate = function() {
    return this._originalParams.encounterRate;
};

/**
 * ●戦闘背景１
 */
Original_Vehicle.prototype.overworldBattleback1Name = function() {
    return this._originalParams.battleback1;
};

/**
 * ●戦闘背景２
 */
Original_Vehicle.prototype.overworldBattleback2Name = function() {
    return this._originalParams.battleback2;
};

/**
 * ●歩行時の戦闘背景を使用するか？
 */
Original_Vehicle.prototype.useWalkingBattleback = function() {
    return this._originalParams.useWalkingBattleback;
};

//----------------------------------------
// 乗降判定
//----------------------------------------

/**
 * ●ボタン押下時、プレイヤーの座標に有効な乗物があるかの判定
 * ※プレイヤのvehicleType == 乗物のoriginalIdとなる。
 */
const _Game_Player_getOnVehicle = Game_Player.prototype.getOnVehicle;
Game_Player.prototype.getOnVehicle = function() {
    const direction = this.direction();
    const x1 = this.x;
    const y1 = this.y;
    const x2 = $gameMap.roundXWithDirection(x1, direction);
    const y2 = $gameMap.roundYWithDirection(y1, direction);

    // 有効なオリジナル乗物を確認
    for (const vehicle of $gameMap.validOriginalVehicles()) {
        //----------------------------------
        // 指定位置に一致する乗物があるかの判定
        //----------------------------------
        // 飛行船は現在座標
        if (vehicle.isAirship() && vehicle.pos(x1, y1)) {
            this._vehicleType = vehicle.originalId();

        // 小型船、大型船は一歩先の座標
        } else if (vehicle.isShip() && vehicle.pos(x2, y2)) {
            this._vehicleType = vehicle.originalId();

        } else if (vehicle.isBoat() && vehicle.pos(x2, y2)) {
            this._vehicleType = vehicle.originalId();
        }

        // いずれかの乗物に該当した場合は終了
        if (this.isInVehicle()) {
            break;
        }
    }

    return _Game_Player_getOnVehicle.apply(this, arguments);
};

/**
 * ●マウスタッチ時（飛行船用）
 */
const _Game_Player_triggerTouchActionD1 = Game_Player.prototype.triggerTouchActionD1;
Game_Player.prototype.triggerTouchActionD1 = function(x1, y1) {
    // 有効なオリジナル乗物を確認
    for (const vehicle of $gameMap.validOriginalVehicles()) {
        // 指定位置に一致する乗物があるかの判定
        // ※元の処理では飛行船専用だが、あえて小型船や大型船も対象とする。
        //   そうしないと通行と乗降が同時にできる地形が対象の場合に、
        //   降りる手段がなくなってしまう。
        if (vehicle.pos(x1, y1)) {
            if (TouchInput.isTriggered() && this.getOnOffVehicle()) {
                return true;
            }
        }
    }

    return _Game_Player_triggerTouchActionD1.apply(this, arguments);
};

/**
 * ●マウスタッチ時（小型船／大型船用）
 */
const _Game_Player_triggerTouchActionD2 = Game_Player.prototype.triggerTouchActionD2;
Game_Player.prototype.triggerTouchActionD2 = function(x2, y2) {
    // 有効なオリジナル乗物を確認
    for (const vehicle of $gameMap.validOriginalVehicles()) {
        // 小型船／大型船以外は無視
        if (!vehicle.isShip() && !vehicle.isBoat()) {
            continue;
        }

        // 指定位置に一致する小型船／大型船があるか
        if (vehicle.pos(x2, y2)) {
            if (TouchInput.isTriggered() && this.getOnVehicle()) {
                return true;
            }
        }
    }

    return _Game_Player_triggerTouchActionD2.apply(this, arguments);
};

/**
 * ●タイプを元に乗物を取得
 */
const _Game_Map_vehicle = Game_Map.prototype.vehicle;
Game_Map.prototype.vehicle = function(type) {
    // 該当のオリジナル乗物が存在すれば取得
    const originalVehicle = $gameMap.originalVehicles().find(function(vehicle) {
        return type == vehicle.originalId();
    });

    if (originalVehicle) {
        return originalVehicle;
    }

    // それ以外は標準の乗物を取得
    return _Game_Map_vehicle.apply(this, arguments);
};

/**
 * ●小型船に乗っているかどうか？
 */
const _Game_Player_isInBoat = Game_Player.prototype.isInBoat;
Game_Player.prototype.isInBoat = function() {
    // 小型船型のオリジナル乗物も含める。
    const vehicle = this.vehicle();
    if (vehicle && vehicle.isBoat()) {
        return true;
    }

    return _Game_Player_isInBoat.apply(this, arguments);
};

/**
 * ●大型船に乗っているかどうか？
 */
const _Game_Player_isInShip = Game_Player.prototype.isInShip;
Game_Player.prototype.isInShip = function() {
    // 大型船型のオリジナル乗物も含める。
    const vehicle = this.vehicle();
    if (vehicle && vehicle.isShip()) {
        return true;
    }

    return _Game_Player_isInShip.apply(this, arguments);
};

/**
 * ●飛行船に乗っているかどうか？
 */
const _Game_Player_isInAirship = Game_Player.prototype.isInAirship;
Game_Player.prototype.isInAirship = function() {
    // 飛行船型のオリジナル乗物も含める。
    const vehicle = this.vehicle();
    if (vehicle && vehicle.isAirship()) {
        return true;
    }

    return _Game_Player_isInAirship.apply(this, arguments);
};

/**
 * ●飛行船の影
 */
const _Spriteset_Map_updateShadow = Spriteset_Map.prototype.updateShadow;
Spriteset_Map.prototype.updateShadow = function() {
    // 飛行船に乗っている場合
    if ($gamePlayer.isInAirship()) {
        const airship = $gamePlayer.vehicle();

        // オリジナル乗物だった場合はそちらの座標を参照
        if (airship instanceof Original_Vehicle) {
            this._shadowSprite.x = airship.shadowX();
            this._shadowSprite.y = airship.shadowY();
            this._shadowSprite.opacity = airship.shadowOpacity();
            return;
        }
    }

    // それ以外は通常の処理
    _Spriteset_Map_updateShadow.apply(this, arguments);
};

//----------------------------------------
// 通行判定
//----------------------------------------

/**
 * ●小型船の通行判定
 */
const _Game_Map_isBoatPassable = Game_Map.prototype.isBoatPassable;
Game_Map.prototype.isBoatPassable = function(x, y) {
    const vehicle = $gamePlayer.vehicle();

    // オリジナル乗物だった場合
    if (vehicle instanceof Original_Vehicle) {
        // 通行判定を取得
        const isOriginalPassable = vehicle.isOriginalPassable(x, y);
        // 値が存在すれば、その値を使用
        // undefinedの場合はスルー
        if (isOriginalPassable !== undefined) {
            return isOriginalPassable;
        }
    }

    return _Game_Map_isBoatPassable.apply(this, arguments);
};

/**
 * ●大型船の通行判定
 */
const _Game_Map_isShipPassable = Game_Map.prototype.isShipPassable;
Game_Map.prototype.isShipPassable = function(x, y) {
    const vehicle = $gamePlayer.vehicle();

    // オリジナル乗物だった場合
    if (vehicle instanceof Original_Vehicle) {
        // 通行判定を取得
        const isOriginalPassable = vehicle.isOriginalPassable(x, y);
        // 値が存在すれば、その値を使用
        // undefinedの場合はスルー
        if (isOriginalPassable !== undefined) {
            return isOriginalPassable;
        }
    }

    return _Game_Map_isShipPassable.apply(this, arguments);
};

/**
 * ●通行判定
 * ※Game_CharacterBase.prototype.canPassのオーバーライド
 * ※飛行船はすり抜け属性をデフォルトで持っているため、
 * 　Game_Vehicle.prototype.isMapPassableを通過しない。
 * 　そのためここで実装する。
 */
const _Game_Player_canPass = Game_Player.prototype.canPass;
Game_Player.prototype.canPass = function(x, y, d) {
    // プレイヤーが飛行船に乗っている場合
    if (this.isInAirship()) {
        const vehicle = $gamePlayer.vehicle();

        // オリジナル乗物だった場合
        if (vehicle instanceof Original_Vehicle) {
            const x2 = $gameMap.roundXWithDirection(x, d);
            const y2 = $gameMap.roundYWithDirection(y, d);

            // 通行判定を取得
            const isOriginalPassable = vehicle.isOriginalPassable(x2, y2);
            // 値が存在すれば、その値を使用
            // undefinedの場合はスルー
            if (isOriginalPassable !== undefined) {
                return isOriginalPassable;
            }
        }
    }

    return _Game_Player_canPass.apply(this, arguments);
};

//----------------------------------------
// 乗降判定
//----------------------------------------

/**
 * ●小型船、大型船の乗降判定
 */
Original_Vehicle.prototype.isLandOk = function(x, y, d) {
    // 飛行船以外の乗物
    if (!this.isAirship()) {
        // 処理が重複してしまうけれど競合回避のため、
        //  通過判定、イベントとの衝突判定などを先に実行
        // ※主にNRP_VehiclePassageで別に設定がされていた場合を想定
        const x2 = $gameMap.roundXWithDirection(x, d);
        const y2 = $gameMap.roundYWithDirection(y, d);
        if (!$gameMap.isValid(x2, y2)) {
            return false;
        }
        if (!$gameMap.isPassable(x2, y2, this.reverseDir(d))) {
            return false;
        }
        if (this.isCollidedWithCharacters(x2, y2)) {
            return false;
        }

        // 乗降判定を取得
        const isOriginalLandOk = this.isOriginalLandOk(x2, y2);
        // 値が存在すれば、その値を使用
        // undefinedの場合はスルー
        if (isOriginalLandOk !== undefined) {
            return isOriginalLandOk;
        }
    }

    // それ以外は元の処理
    return Game_Vehicle.prototype.isLandOk.apply(this, arguments);
};

/**
 * ●飛行船の着陸判定
 */
const _Game_Map_isAirshipLandOk = Game_Map.prototype.isAirshipLandOk;
Game_Map.prototype.isAirshipLandOk = function(x, y) {
    const vehicle = $gamePlayer.vehicle();

    // 他の乗物と座標が一致すれば着陸禁止
    const isNoLanding = $gameMap.vehicles().some(function(v) {
        return v != vehicle && v.posNt(x, y);
    });
    if (isNoLanding) {
        return false;
    }

    // オリジナル乗物だった場合
    if (vehicle instanceof Original_Vehicle) {
        // 乗降判定を取得
        const isOriginalLandOk = vehicle.isOriginalLandOk(x, y);
        // 値が存在すれば、その値を使用
        // undefinedの場合はスルー
        if (isOriginalLandOk !== undefined) {
            return isOriginalLandOk;
        }
    }

    return _Game_Map_isAirshipLandOk.apply(this, arguments);
};

//----------------------------------------
// 衝突判定
//----------------------------------------

const _Game_CharacterBase_isCollidedWithVehicles = Game_CharacterBase.prototype.isCollidedWithVehicles;
Game_CharacterBase.prototype.isCollidedWithVehicles = function(x, y) {
    const ret = _Game_CharacterBase_isCollidedWithVehicles.apply(this, arguments);

    // 元の処理で衝突があればそのまま返す
    if (ret) {
        return ret;
    }

    // オリジナル乗物の衝突判定
    return $gameMap.validOriginalVehicles().some(function(vehicle) {
        // 飛行船以外と座標が一致すれば衝突とする。
        return !vehicle.isAirship() && vehicle.posNt(x, y);
    });
};

//----------------------------------------
// エンカウント判定
//----------------------------------------

// 一時的に飛行船判定を無視するためのフラグ
let ignoreIsInAirship = false;
let ignoreIsInShip = false;

const _Game_Player_canEncounter = Game_Player.prototype.canEncounter;
Game_Player.prototype.canEncounter = function() {
    // 飛行船かつオリジナル乗物だった場合
    const vehicle = this.vehicle();
    if (this.isInAirship() && vehicle instanceof Original_Vehicle) {
        // かつエンカウント率補正が設定されているならば
        if (vehicle.encounterRate()) {
            ignoreIsInAirship = true;
        }
    }
    
    // 以下でthis.isInAirship()で呼び出される。
    const ret = _Game_Player_canEncounter.apply(this, arguments);

    ignoreIsInAirship = false;
    return ret;
};

/**
 * ●飛行船判定
 * ※上でも同一の関数を定義しているので_2を付けています。
 */
const _Game_Player_isInAirship_2 = Game_Player.prototype.isInAirship;
Game_Player.prototype.isInAirship = function() {
    // フラグが立っているなら強制false
    if (ignoreIsInAirship) {
        return false;
    }
    return _Game_Player_isInAirship_2.apply(this, arguments);
};

/**
 * ●エンカウント率補正
 */
const _Game_Player_encounterProgressValue = Game_Player.prototype.encounterProgressValue;
Game_Player.prototype.encounterProgressValue = function() {

    // オリジナル乗物以外
    const vehicle = this.vehicle();
    if (!(vehicle instanceof Original_Vehicle)) {
        // 元の処理を呼んで終了
        return _Game_Player_encounterProgressValue.apply(this, arguments);

    // またはオリジナル乗物でもエンカウント補正の設定がない場合
    } else if (vehicle.encounterRate() === undefined) {
        // alert(vehicle.encounterRate());
        // 元の処理を呼んで終了
        return _Game_Player_encounterProgressValue.apply(this, arguments);
    }

    // 大型船かつエンカウント補正が設定されている場合
    if (this.isInShip()) {
        // 大型船の標準エンカウント補正を無視する。
        ignoreIsInShip = true;
    }

    let value = _Game_Player_encounterProgressValue.apply(this, arguments);
    ignoreIsInShip = false;

    // エンカウント補正をかける
    return value * (vehicle.encounterRate() / 100);
};

/**
 * ●大型船判定
 * ※上でも同一の関数を定義しているので_2を付けています。
 */
const _Game_Player_isInShip_2 = Game_Player.prototype.isInShip;
Game_Player.prototype.isInShip = function() {
    // フラグが立っているなら強制false
    if (ignoreIsInShip) {
        return false;
    }
    return _Game_Player_isInShip_2.apply(this, arguments);
};

//----------------------------------------
// 戦闘背景
//----------------------------------------

/**
 * ●戦闘背景１
 */
const _Sprite_Battleback_overworldBattleback1Name = Sprite_Battleback.prototype.overworldBattleback1Name;
Sprite_Battleback.prototype.overworldBattleback1Name = function() {
    const vehicle = $gamePlayer.vehicle();
    // オリジナル乗物だった場合
    if (vehicle instanceof Original_Vehicle) {
        // 歩行時の戦闘背景を使用する
        if (vehicle.useWalkingBattleback()) {
            return this.normalBattleback1Name();

        // 戦闘背景１
        } else if (vehicle.overworldBattleback1Name()) {
            return vehicle.overworldBattleback1Name();
        }
    }

    return _Sprite_Battleback_overworldBattleback1Name.apply(this, arguments);
};

/**
 * ●戦闘背景２
 */
const _Sprite_Battleback_overworldBattleback2Name = Sprite_Battleback.prototype.overworldBattleback2Name;
Sprite_Battleback.prototype.overworldBattleback2Name = function() {
    const vehicle = $gamePlayer.vehicle();
    // オリジナル乗物だった場合
    if (vehicle instanceof Original_Vehicle) {
        // 歩行時の戦闘背景を使用する
        if (vehicle.useWalkingBattleback()) {
            return this.normalBattleback2Name();

        // 戦闘背景２
        } else if (vehicle.overworldBattleback2Name()) {
            return vehicle.overworldBattleback2Name();
        }
    }

    return _Sprite_Battleback_overworldBattleback2Name.apply(this, arguments);
};

//----------------------------------------
// スクリプト用追加関数
//----------------------------------------

/**
 * 【独自】搭乗中の乗物ＩＤを取得
 */
Game_Player.prototype.vehicleId = function() {
    return this._vehicleType;
};

//----------------------------------------
// その他共通関数
//----------------------------------------

/**
 * ●通行設定が指定のタイルセットで有効か？
 */
function isValidSetting(settingId, tileset) {
    if (settingId === undefined) {
        return false;
    }

    const setting = tileset.meta.VehiclePassage;
    if (setting) {
        // カンマ区切りで分解
        const settingArray = setting.split(",");
        // 含まれていればtrue
        return settingArray.includes(settingId);
    }
    return false;
}

/**
 * ●現在位置に一致する通行設定を取得する。
 */
function getMatchSetting(x, y, passageList) {
    // 設定がなければundefined
    if (!passageList) {
        return undefined;
    }

    // なるべく負荷をかけないよう値を一度だけ取得する。
    let terrainTag;
    let regionId;
    let autotileType;
    let tileId;

    // 設定を１つずつ確認
    for (const setting of passageList) {
        let noMatch = false;

        // 地形タグの一致を確認
        if (setting.terrainTags && setting.terrainTags.length > 0) {
            // 未取得なら地形タグを取得
            if (terrainTag === undefined) {
                terrainTag = $gameMap.terrainTag(x, y);
            }

            noMatch = setting.terrainTags.every(function(tag) {
                return terrainTag != tag;
            });
            if (noMatch) {
                continue;
            }
        }

        // リージョンの一致を確認
        if (setting.regionIds && setting.regionIds.length > 0) {
            // 未取得ならリージョンＩＤを取得
            if (regionId === undefined) {
                regionId = $gameMap.regionId(x, y);
            }

            noMatch = setting.regionIds.every(function(id) {
                return regionId != id;
            });
            if (noMatch) {
                continue;
            }
        }

        // オートタイルタイプの一致を確認
        if  (setting.autotileTypes && setting.autotileTypes.length > 0) {
            // 未取得ならオートタイルタイプを取得
            if (autotileType === undefined) {
                const layerNo = getStepLayer(x, y);
                autotileType = $gameMap.autotileType(x, y, layerNo);
            }

            noMatch = setting.autotileTypes.every(function(type) {
                return autotileType != type;
            });
            if (noMatch) {
                continue;
            }
        }

        // タイルＩＤの一致を確認
        if  (setting.tileIds && setting.tileIds.length > 0) {
            // 未取得ならタイルＩＤを取得
            if (tileId === undefined) {
                const layerNo = getStepLayer(x, y);
                tileId = $gameMap.tileId(x, y, layerNo);
            }

            noMatch = setting.tileIds.every(function(id) {
                return tileId != id;
            });
            if (noMatch) {
                continue;
            }
        }

        // 条件を満たす設定があった。
        return setting;
    }

    // なければundefined
    return undefined;
}

/**
 * ●☆を除いた有効な最大レイヤー番号
 * ※要するに足を踏みしめるレイヤー
 */
function getStepLayer(x, y) {
    // 各タイルが保有するフラグ情報
    const flags = $gameMap.tilesetFlags();
    // 上のレイヤーから順番にループ
    const tiles = $gameMap.layeredTiles(x, y);
    for (let i = 0; i < 4; i++) {
        const tileId = tiles[i];
        const layerNo = 3 - i;
        const flag = flags[tileId];

        // 通行判定☆（0x10）を除く最初のタイルが対象
        if ((flag & 0x10) === 0) {
            return layerNo;
        }
    }
    // 無効の場合は-1
    return -1;
}

})();
