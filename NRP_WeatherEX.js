//=============================================================================
// NRP_WeatherEX.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Extend the weather function.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/481701865.html
 *
 * @help Extend the weather function.
 * You can specify powers that would normally be impossible,
 * or create your original weather.
 * 
 * ■Features
 * - Change weather power, direction, speed, color, etc. freely.
 * - Causes the specified image to fall.
 * - Enable weather even in battle.
 * 
 * ■Usage
 * You can adjust the behavior of the existing weather
 * by adjusting the plugin parameters.
 * 
 * Using the plugin command, it is possible
 * to call up existing weather (rain, storm, snow)
 * with different settings than usual.
 * 
 * You can also create your original weather
 * by making detailed settings in the "TemplateList".
 * The created weather can be called up with plugin commands.
 * 
 * ■Plugin Commando (MZ)
 * > ChangeWeather
 * Change the weather.
 * The settings can be recalled by specifying the "TemplateId".
 * 
 * Initially, the following TemplateId is available.
 * ・colorful: Colorful snowflakes are falling.
 * ・sandstorm: Sandstorm-like lines flowing horizontally.
 * ・earthlight: A ball of light rises upward from the ground.
 * 
 * Various other settings are also available.
 * See the description in the plugin command for details.
 * It is also possible to change only some of the settings for a template.
 * 
 * If you want to exit, just specify the type as "none".
 * You can also use the regular event command.
 * 
 * ■Plugin Commando (MV)
 * > NRP.WeatherEX.Id [TemplateId]
 * The process is the same as the MZ version.
 * ※It is not case sensitive. Do not include > or [].
 * 
 * Before specifying this command, options (see below) can be specified.
 * For example, the following is possible.
 * 
 * NRP.WeatherEX.Power 20
 * NRP.WeatherEX.Time 60
 * NRP.WeatherEX.Wait true
 * NRP.WeatherEX.Id colorful
 * 
 * ※Unlike the MZ version,
 *   detailed settings cannot be made with plugin commands.
 * 　The author gave up because it became too much trouble.
 * 　So, please set it in the template.
 * 
 * Also, if you don't want to call it from a template,
 * just specify the type ("rain", "storm", or "snow").
 * 
 * NRP.WeatherEX.Power 20
 * NRP.WeatherEX.Time 60
 * NRP.WeatherEX.Wait true
 * NRP.WeatherEX.Type rain
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 * 
 * @command ChangeWeather
 * @desc Create and run your original weather.
 * By specifying the TemplateId, you can call the template.
 * 
 * @arg TemplateId
 * @desc The ID to call the template.
 * @type string
 * 
 * @arg Type
 * @desc The type of weather. For snow, it is a circle; for other weather, it is a line.
 * @type select
 * @option none
 * @option rain
 * @option storm
 * @option snow
 * 
 * @arg Power
 * @desc The power of the weather.
 * @type number
 * 
 * @arg Duration
 * @desc The time it takes to change the weather.
 * 60 equals 1 second.
 * @type number
 * @min 1
 * 
 * @arg Wait
 * @desc Wait until the end of the weather change.
 * @type boolean
 * 
 * @arg Option
 * @type struct<Option>
 * 
 * 
 * 
 * @param WeatherOnBattle
 * @desc The weather is also displayed during battle.
 * Also, weather changes during battle will be enabled.
 * @type boolean
 * @default true
 * 
 * @param MaxSpritesByPower
 * @desc This is the power of the weather.
 * you can adjust the amount of rain or snowfall based on 10.
 * @type number
 * @default 10
 * 
 * @param DimmerLevel
 * @desc Darkens the screen according to power. The default value is 6, and it gets darker by X/255 in each step.
 * @type number
 * @default 6
 * 
 * @param DimmerLimit
 * @desc This is the limit of the screen darkness. It should not be darker than this even when power is increased.
 * @type number
 * @default 54
 * 
 * @param TemplateList
 * @type struct<OriginalWeather>[]
 * @default ["{\"BaseSetting\":\"\",\"TemplateId\":\"colorful\",\"Type\":\"snow\",\"Power\":\"10\",\"Duration\":\"1\",\"Wait\":\"false\",\"DimmerLevel\":\"0\",\"Image\":\"\",\"NoImageSetting\":\"\",\"Color\":\"[Math.randomInt(255), Math.randomInt(255), Math.randomInt(255)]\",\"IndividualBitmap\":\"true\",\"ParticleWidth\":\"30\",\"ParticleHeight\":\"\",\"SpeedSetting\":\"\",\"SpeedX\":\"\",\"SpeedY\":\"\",\"PositionSetting\":\"\",\"StartWidth\":\"Graphics.width + 100\",\"StartHeight\":\"Graphics.height + 200\",\"AdjustStartX\":\"-100\",\"AdjustStartY\":\"-200\",\"DisplaySetting\":\"\",\"BlendColor\":\"\",\"BlendMode\":\"1\",\"Scale\":\"1 + Math.random()\",\"Angle\":\"\",\"OpacitySetting\":\"\",\"StartOpacityBase\":\"160\",\"StartOpacityRandom\":\"60\",\"ReduceOpacity\":\"3\",\"EndOpacity\":\"40\"}","{\"BaseSetting\":\"\",\"TemplateId\":\"sandstorm\",\"Type\":\"storm\",\"Power\":\"20\",\"Duration\":\"1\",\"Wait\":\"false\",\"DimmerLevel\":\"\",\"Image\":\"\",\"NoImageSetting\":\"\",\"Color\":\"#A05050\",\"IndividualBitmap\":\"false\",\"ParticleWidth\":\"2\",\"ParticleHeight\":\"40\",\"SpeedSetting\":\"\",\"SpeedX\":\"-10.0\",\"SpeedY\":\"1.0\",\"PositionSetting\":\"\",\"StartWidth\":\"Graphics.width + 300\",\"StartHeight\":\"Graphics.height + 200\",\"AdjustStartX\":\"-100\",\"AdjustStartY\":\"-200\",\"DisplaySetting\":\"\",\"BlendColor\":\"\",\"BlendMode\":\"1\",\"Scale\":\"1 + Math.random()\",\"Angle\":\"85\",\"OpacitySetting\":\"\",\"StartOpacityBase\":\"160\",\"StartOpacityRandom\":\"60\",\"ReduceOpacity\":\"\",\"EndOpacity\":\"40\"}","{\"BaseSetting\":\"\",\"TemplateId\":\"earthlight\",\"Type\":\"snow\",\"Power\":\"5\",\"Duration\":\"1\",\"Wait\":\"false\",\"DimmerLevel\":\"0\",\"Image\":\"\",\"NoImageSetting\":\"\",\"Color\":\"\",\"IndividualBitmap\":\"\",\"ParticleWidth\":\"10\",\"ParticleHeight\":\"\",\"SpeedSetting\":\"\",\"SpeedX\":\"0.0\",\"SpeedY\":\"-5.0\",\"PositionSetting\":\"\",\"StartWidth\":\"Graphics.width + 100\",\"StartHeight\":\"Graphics.height + 200\",\"AdjustStartX\":\"-100\",\"AdjustStartY\":\"-200\",\"DisplaySetting\":\"\",\"BlendColor\":\"\",\"BlendMode\":\"1\",\"Scale\":\"1 + Math.random()\",\"Angle\":\"\",\"OpacitySetting\":\"\",\"StartOpacityBase\":\"160\",\"StartOpacityRandom\":\"60\",\"ReduceOpacity\":\"\",\"EndOpacity\":\"40\"}"]
 * @desc This is a list of defined weather templates.
 * You can also add new templates.。
 */

/*~struct~OriginalWeather:
 * @param BaseSetting
 * 
 * @param TemplateId
 * @parent BaseSetting
 * @desc The ID to call the template.
 * @type string
 * 
 * @param Type
 * @parent BaseSetting
 * @desc The type of weather. For snow, it is a circle; for other weather, it is a line.
 * @default none
 * @type select
 * @option none
 * @option rain
 * @option storm
 * @option snow
 * 
 * @param Power
 * @parent BaseSetting
 * @desc The power of the weather.
 * @type number
 * @default 5
 * 
 * @param Duration
 * @parent BaseSetting
 * @desc The time it takes to change the weather.
 * 60 equals 1 second.
 * @type number
 * @min 1
 * @default 60
 * 
 * @param Wait
 * @parent BaseSetting
 * @desc Wait until the end of the weather change.
 * @type boolean
 * @default true
 * 
 * @param DimmerLevel
 * @parent BaseSetting
 * @desc Darkens the screen according to power. The default value is 6, and it gets darker by X/255 in each step.
 * @type number
 * 
 * @param Image
 * @parent BaseSetting
 * @desc The image to use for the particle. If this is specified, the color, width, and height will be ignored.
 * @type file
 * @dir img/pictures
 * 
 * @param NoImageSetting
 * 
 * @param Color
 * @parent NoImageSetting
 * @desc The color tone of the particle. Example 1: "white", 2: "#FF0000", 3: "[255, 64, 0]"
 * @type string
 * 
 * @param IndividualBitmap
 * @parent NoImageSetting
 * @desc Create individual bitmaps for each particle. This is a bit more work, but allows you to change the color of each particle.
 * @type boolean
 * @default false
 * 
 * @param ParticleWidth
 * @parent NoImageSetting
 * @desc The width of the particle.
 * If the type is snow, it is the diameter.
 * @type number
 * 
 * @param ParticleHeight
 * @parent NoImageSetting
 * @desc The vertical width of the particle.
 * Not valid if the type is snow.
 * @type number
 * 
 * @param SpeedSetting
 * 
 * @param SpeedX
 * @parent SpeedSetting
 * @desc This is the speed in the X direction.
 * If it is negative, it moves to the left.
 * @type number @min -999 @max 999 @decimals 1
 * 
 * @param SpeedY
 * @parent SpeedSetting
 * @desc This is the speed in the Y direction.
 * Negative value makes it move upward.
 * @type number @min -999 @max 999 @decimals 1
 * 
 * @param PositionSetting
 * 
 * @param StartWidth
 * @parent PositionSetting
 * @desc The horizontal range where the particles occur. A formula is allowed.
 * The initial value is "Graphics.width + 100".
 * @type string
 * @default Graphics.width + 100
 * 
 * @param StartHeight
 * @parent PositionSetting
 * @desc The vertical range in which the particles occur. A formula is allowed.
 * The initial value is "Graphics.height + 200".
 * @type string
 * @default Graphics.height + 200
 * 
 * @param AdjustStartX
 * @parent PositionSetting
 * @desc Adjustment value for the X coordinate where the particles occur. The initial value is -100.
 * @type number @max 9999 @min -9999
 * @default -100
 * 
 * @param AdjustStartY
 * @parent PositionSetting
 * @desc Adjustment value for the Y coordinate where the particles occur. The initial value is -200.
 * @type number @max 9999 @min -9999
 * @default -200
 * 
 * @param DisplaySetting
 * 
 * @param BlendColor
 * @parent DisplaySetting
 * @desc Changes the color tone. Example: [255, 255, 255, 255]
 * Red, Green, Blue, Strength. Note that this is very demanding.
 * @type string
 * 
 * @param BlendMode
 * @parent DisplaySetting
 * @desc This is a method of blending particle images.
 * @type select
 * @option 0:Normal @value 0
 * @option 1:Add @value 1
 * @option 2:Multiply @value 2
 * @option 3:Screen @value 3
 * 
 * @param Scale
 * @parent DisplaySetting
 * @desc The scale factor of the particle, where 1 is the standard.
 * A formula is allowed. "Math.random() * 3" is also valid.
 * @type string
 * 
 * @param Angle
 * @parent DisplaySetting
 * @desc The angle of the particle, from 0 to 360.
 * @type number @min 0 @max 360
 * 
 * @param OpacitySetting
 * 
 * @param StartOpacityBase
 * @parent OpacitySetting
 * @desc The opacity at which the particles are generated.
 * Maximum 255; default value is 160.
 * @type number @min 0 @max 255
 * @default 160
 * 
 * @param StartOpacityRandom
 * @parent OpacitySetting
 * @desc The variance of the opacity at which the particles are generated.
 * Default 60, and this value is randomly added to the StartOpacityBase.
 * @type number @min 0 @max 255
 * @default 60
 * 
 * @param ReduceOpacity
 * @parent OpacitySetting
 * @desc The opacity of the particles to be reduced per frame.
 * @type number @min 1 @max 255
 * 
 * @param EndOpacity
 * @parent OpacitySetting
 * @desc When the opacity becomes less than this value, the particles will be deleted and recreated.
 * @type number @min 1 @max 255
 * @default 40
 */

/*~struct~Option:
 * @param BaseSetting
 * 
 * @param DimmerLevel
 * @parent BaseSetting
 * @desc Darkens the screen according to power. The default value is 6, and it gets darker by X/255 in each step.
 * @type number
 * 
 * @param Image
 * @parent BaseSetting
 * @desc The image to use for the particle. If this is specified, the color, width, and height will be ignored.
 * @type file
 * @dir img/pictures
 * 
 * @param NoImageSetting
 * 
 * @param Color
 * @parent NoImageSetting
 * @desc The color tone of the particle. Example 1: "white", 2: "#FF0000", 3: "[255, 64, 0]"
 * @type string
 * 
 * @param IndividualBitmap
 * @parent NoImageSetting
 * @desc Create individual bitmaps for each particle. This is a bit more work, but allows you to change the color of each particle.
 * @type boolean
 * 
 * @param ParticleWidth
 * @parent NoImageSetting
 * @desc The width of the particle.
 * If the type is snow, it is the diameter.
 * @type number
 * 
 * @param ParticleHeight
 * @parent NoImageSetting
 * @desc The vertical width of the particle.
 * Not valid if the type is snow.
 * @type number
 * 
 * @param SpeedSetting
 * 
 * @param SpeedX
 * @parent SpeedSetting
 * @desc This is the speed in the X direction.
 * If it is negative, it moves to the left.
 * @type number @min -999 @max 999 @decimals 1
 * 
 * @param SpeedY
 * @parent SpeedSetting
 * @desc This is the speed in the Y direction.
 * Negative value makes it move upward.
 * @type number @min -999 @max 999 @decimals 1
 * 
 * @param PositionSetting
 * 
 * @param StartWidth
 * @parent PositionSetting
 * @desc The horizontal range where the particles occur. A formula is allowed.
 * The initial value is "Graphics.width + 100".
 * @type string
 * 
 * @param StartHeight
 * @parent PositionSetting
 * @desc The vertical range in which the particles occur. A formula is allowed.
 * The initial value is "Graphics.height + 200".
 * @type string
 * 
 * @param AdjustStartX
 * @parent PositionSetting
 * @desc Adjustment value for the X coordinate where the particles occur. The initial value is -100.
 * @type number @max 9999 @min -9999
 * 
 * @param AdjustStartY
 * @parent PositionSetting
 * @desc Adjustment value for the Y coordinate where the particles occur. The initial value is -200.
 * @type number @max 9999 @min -9999
 * 
 * @param DisplaySetting
 * 
 * @param BlendColor
 * @parent DisplaySetting
 * @desc Changes the color tone. Example: [255, 255, 255, 255]
 * Red, Green, Blue, Strength. Note that this is very demanding.
 * @type string
 * 
 * @param BlendMode
 * @parent DisplaySetting
 * @desc This is a method of blending particle images.
 * @type select
 * @option 0:Normal @value 0
 * @option 1:Add @value 1
 * @option 2:Multiply @value 2
 * @option 3:Screen @value 3
 * 
 * @param Scale
 * @parent DisplaySetting
 * @desc The scale factor of the particle, where 1 is the standard.
 * A formula is allowed. "Math.random() * 3" is also valid.
 * @type string
 * 
 * @param Angle
 * @parent DisplaySetting
 * @desc The angle of the particle, from 0 to 360.
 * @type number @min 0 @max 360
 * 
 * @param OpacitySetting
 * 
 * @param StartOpacityBase
 * @parent OpacitySetting
 * @desc The opacity at which the particles are generated.
 * Maximum 255; default value is 160.
 * @type number @min 0 @max 255
 * 
 * @param StartOpacityRandom
 * @parent OpacitySetting
 * @desc The variance of the opacity at which the particles are generated.
 * Default 60, and this value is randomly added to the StartOpacityBase.
 * @type number @min 0 @max 255
 * 
 * @param ReduceOpacity
 * @parent OpacitySetting
 * @desc The opacity of the particles to be reduced per frame.
 * @type number @min 1 @max 255
 * 
 * @param EndOpacity
 * @parent OpacitySetting
 * @desc When the opacity becomes less than this value, the particles will be deleted and recreated.
 * @type number @min 1 @max 255
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 天候機能を拡張します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/481701865.html
 *
 * @help 天候機能を拡張します。
 * 通常は不可能な強さを指定したり、オリジナルの天候を作ったりできます。
 * 
 * ■特徴
 * ・天候の強さ、向き、速度、色などを自由に変更
 * ・指定した画像を降らせる
 * ・戦闘時も天候を有効に
 * 
 * ■使用方法
 * プラグインパラメータを調整すれば、
 * 既存の天候の挙動を調整できます。
 * 
 * プラグインコマンドを使用することで、
 * 既存の天候（雨、嵐、雪）を通常とは異なる設定で
 * 呼び出すことが可能となります。
 * 
 * また『テンプレート一覧』に詳細な設定をすることで、
 * オリジナルの天候を作成可能です。
 * 作成した天候はプラグインコマンドで呼び出します。
 * 
 * ■プラグインコマンド（ＭＺ）
 * 『天候の設定』
 * 天候を変更します。
 * テンプレートＩＤを指定すれば、設定を呼び出すことが可能です。
 * 
 * 初期状態では以下が利用可能です。
 * ・colorful：カラフルな雪が降り注ぎます。
 * ・sandstorm：横に向かって砂嵐のような線が流れます。
 * ・earthlight：地面から上に向かって光の球が上昇します。
 * 
 * その他にも様々な設定が可能です。
 * 詳細はプラグインコマンド内の説明を参照してください。
 * テンプレートに対して、一部の設定だけを変更することも可能です。
 * 
 * なお、終了する場合はタイプを『なし』に指定すればＯＫです。
 * 普通のイベントコマンドでも問題ありません。
 * 
 * ■プラグインコマンド（ＭＶ）
 * > NRP.WeatherEX.Id [テンプレートＩＤ]
 * 処理内容はＭＺ版と同じです。
 * ※大文字小文字は不問。>や[]は含めないでください。
 * 
 * このコマンドを指定する前に、オプション（下記参照）を指定可能です。
 * 例えば、以下のようになります。
 * 
 * NRP.WeatherEX.Power 20
 * NRP.WeatherEX.Time 60
 * NRP.WeatherEX.Wait true
 * NRP.WeatherEX.Id colorful
 * 
 * Powerは強さ、Timeは時間、Waitは完了までウェイトに相当します。
 * ※ＭＺ版と異なり、プラグインコマンドでの詳細な設定はできません。
 * 　作者が面倒になって諦めました。
 * 　そんなわけで、テンプレート内に設定してください。
 * 
 * また、テンプレートからの呼び出しを行わない場合は、
 * タイプ（rain, storm, snowのいずれか）を指定すればＯＫです。
 * 
 * NRP.WeatherEX.Power 20
 * NRP.WeatherEX.Time 60
 * NRP.WeatherEX.Wait true
 * NRP.WeatherEX.Type rain
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @command ChangeWeather
 * @text 天候の設定
 * @desc 独自の天候を作成し、実行します。
 * テンプレートＩＤを指定すれば、テンプレートを呼び出せます。
 * 
 * @arg TemplateId
 * @text テンプレートＩＤ
 * @desc テンプレートを呼び出すためのＩＤです。
 * @type string
 * 
 * @arg Type
 * @text タイプ
 * @desc 天候の種類です。
 * 雪の場合は円形、他の場合は線になります。
 * @type select
 * @option
 * @option なし @value none
 * @option 雨 @value rain
 * @option 嵐 @value storm
 * @option 雪 @value snow
 * 
 * @arg Power
 * @text 強さ
 * @desc 天候の強さです。
 * @type number
 * 
 * @arg Duration
 * @text 時間
 * @desc 天候変化にかける時間です。
 * 60が1秒に相当します。
 * @type number
 * @min 1
 * 
 * @arg Wait
 * @text 完了までウェイト
 * @desc 天候変化の終了までウェイトします。
 * @type boolean
 * 
 * @arg Option
 * @text オプション
 * @type struct<Option>
 * 
 * 
 * 
 * @param WeatherOnBattle
 * @text 戦闘中も天候を表示
 * @desc 戦闘中も天候を表示します。
 * また、戦闘中の天候変化も有効となります。
 * @type boolean
 * @default true
 * 
 * @param MaxSpritesByPower
 * @text 天候の強さ
 * @desc 天候の強さです。
 * 10を基準にして雨や雪の降る量を調整できます。
 * @type number
 * @default 10
 * 
 * @param DimmerLevel
 * @text 暗くする度合
 * @desc 天候の強さに応じて画面を暗くする度合いです。
 * 初期値は6。一段階毎にX/255暗くなります。
 * @type number
 * @default 6
 * 
 * @param DimmerLimit
 * @text 暗くする限界値
 * @desc 画面を暗くする効果の限界値です。
 * 強さを上げても、これ以上暗くならないようにします。
 * @type number
 * @default 54
 * 
 * @param TemplateList
 * @text テンプレート一覧
 * @type struct<OriginalWeather>[]
 * @default ["{\"BaseSetting\":\"\",\"TemplateId\":\"colorful\",\"Type\":\"snow\",\"Power\":\"10\",\"Duration\":\"1\",\"Wait\":\"false\",\"DimmerLevel\":\"0\",\"Image\":\"\",\"NoImageSetting\":\"\",\"Color\":\"[Math.randomInt(255), Math.randomInt(255), Math.randomInt(255)]\",\"IndividualBitmap\":\"true\",\"ParticleWidth\":\"30\",\"ParticleHeight\":\"\",\"SpeedSetting\":\"\",\"SpeedX\":\"\",\"SpeedY\":\"\",\"PositionSetting\":\"\",\"StartWidth\":\"Graphics.width + 100\",\"StartHeight\":\"Graphics.height + 200\",\"AdjustStartX\":\"-100\",\"AdjustStartY\":\"-200\",\"DisplaySetting\":\"\",\"BlendColor\":\"\",\"BlendMode\":\"1\",\"Scale\":\"1 + Math.random()\",\"Angle\":\"\",\"OpacitySetting\":\"\",\"StartOpacityBase\":\"160\",\"StartOpacityRandom\":\"60\",\"ReduceOpacity\":\"3\",\"EndOpacity\":\"40\"}","{\"BaseSetting\":\"\",\"TemplateId\":\"sandstorm\",\"Type\":\"storm\",\"Power\":\"20\",\"Duration\":\"1\",\"Wait\":\"false\",\"DimmerLevel\":\"\",\"Image\":\"\",\"NoImageSetting\":\"\",\"Color\":\"#A05050\",\"IndividualBitmap\":\"false\",\"ParticleWidth\":\"2\",\"ParticleHeight\":\"40\",\"SpeedSetting\":\"\",\"SpeedX\":\"-10.0\",\"SpeedY\":\"1.0\",\"PositionSetting\":\"\",\"StartWidth\":\"Graphics.width + 300\",\"StartHeight\":\"Graphics.height + 200\",\"AdjustStartX\":\"-100\",\"AdjustStartY\":\"-200\",\"DisplaySetting\":\"\",\"BlendColor\":\"\",\"BlendMode\":\"1\",\"Scale\":\"1 + Math.random()\",\"Angle\":\"85\",\"OpacitySetting\":\"\",\"StartOpacityBase\":\"160\",\"StartOpacityRandom\":\"60\",\"ReduceOpacity\":\"\",\"EndOpacity\":\"40\"}","{\"BaseSetting\":\"\",\"TemplateId\":\"earthlight\",\"Type\":\"snow\",\"Power\":\"5\",\"Duration\":\"1\",\"Wait\":\"false\",\"DimmerLevel\":\"0\",\"Image\":\"\",\"NoImageSetting\":\"\",\"Color\":\"\",\"IndividualBitmap\":\"\",\"ParticleWidth\":\"10\",\"ParticleHeight\":\"\",\"SpeedSetting\":\"\",\"SpeedX\":\"0.0\",\"SpeedY\":\"-5.0\",\"PositionSetting\":\"\",\"StartWidth\":\"Graphics.width + 100\",\"StartHeight\":\"Graphics.height + 200\",\"AdjustStartX\":\"-100\",\"AdjustStartY\":\"-200\",\"DisplaySetting\":\"\",\"BlendColor\":\"\",\"BlendMode\":\"1\",\"Scale\":\"1 + Math.random()\",\"Angle\":\"\",\"OpacitySetting\":\"\",\"StartOpacityBase\":\"160\",\"StartOpacityRandom\":\"60\",\"ReduceOpacity\":\"\",\"EndOpacity\":\"40\"}"]
 * @desc 定義された天候テンプレートの一覧です。
 * 新しいテンプレートの追加も可能です。
 */

/*~struct~OriginalWeather:ja
 * @param BaseSetting
 * @text 基本設定
 * 
 * @param TemplateId
 * @parent BaseSetting
 * @text テンプレートＩＤ
 * @desc テンプレートを呼び出すためのＩＤです。
 * @type string
 * 
 * @param Type
 * @parent BaseSetting
 * @text タイプ
 * @desc 天候の種類です。
 * 雪の場合は円形、他の場合は線になります。
 * @default none
 * @type select
 * @option なし @value none
 * @option 雨 @value rain
 * @option 嵐 @value storm
 * @option 雪 @value snow
 * 
 * @param Power
 * @parent BaseSetting
 * @text 強さ
 * @desc 天候の強さです。
 * @type number
 * @default 5
 * 
 * @param Duration
 * @parent BaseSetting
 * @text 時間
 * @desc 天候変化にかける時間です。
 * 60が1秒に相当します。
 * @type number
 * @min 1
 * @default 60
 * 
 * @param Wait
 * @parent BaseSetting
 * @text 完了までウェイト
 * @desc 天候変化の終了までウェイトします。
 * @type boolean
 * @default true
 * 
 * @param DimmerLevel
 * @parent BaseSetting
 * @text 暗くする度合
 * @desc 天候の強さに応じて画面を暗くする度合いです。
 * 初期値は6。強さが増える毎にX/255ずつ暗くなります。
 * @type number
 * 
 * @param Image
 * @parent BaseSetting
 * @text 画像
 * @desc 粒に使用する画像です。
 * これを指定した場合、色調、横幅, 縦幅は無視されます。
 * @type file
 * @dir img/pictures
 * 
 * @param NoImageSetting
 * @text 画像を指定しない場合
 * 
 * @param Color
 * @parent NoImageSetting
 * @text 色調
 * @desc 粒の色調です。
 * 例１："white", 例２："#FF0000", 例３："[255, 64, 0]"
 * @type string
 * 
 * @param IndividualBitmap
 * @parent NoImageSetting
 * @text 画像を個別作成
 * @desc 粒の画像を個別に作成します。
 * 少し負荷が上がりますが、粒毎の色調変更などができます。
 * @type boolean
 * @default false
 * 
 * @param ParticleWidth
 * @parent NoImageSetting
 * @text 粒の横幅
 * @desc 粒の横幅です。
 * タイプが雪の場合は直径になります。
 * @type number
 * 
 * @param ParticleHeight
 * @parent NoImageSetting
 * @text 粒の縦幅
 * @desc 粒の縦幅です。
 * タイプが雪の場合は無効です。
 * @type number
 * 
 * @param SpeedSetting
 * @text 速度設定
 * 
 * @param SpeedX
 * @parent SpeedSetting
 * @text 速度Ｘ
 * @desc Ｘ方向の速度です。
 * マイナスにすると左に移動します。
 * @type number @min -999 @max 999 @decimals 1
 * 
 * @param SpeedY
 * @parent SpeedSetting
 * @text 速度Ｙ
 * @desc Ｙ方向の速度です。
 * マイナスにすると上に移動します。
 * @type number @min -999 @max 999 @decimals 1
 * 
 * @param PositionSetting
 * @text 位置設定
 * 
 * @param StartWidth
 * @parent PositionSetting
 * @text 発生地点の横範囲
 * @desc 粒が発生する横範囲です。数式可。
 * 初期値は『Graphics.width + 100』
 * @type string
 * @default Graphics.width + 100
 * 
 * @param StartHeight
 * @parent PositionSetting
 * @text 発生地点の縦範囲
 * @desc 粒が発生する縦範囲です。数式可。
 * 初期値は『Graphics.height + 200』
 * @type string
 * @default Graphics.height + 200
 * 
 * @param AdjustStartX
 * @parent PositionSetting
 * @text 発生地点のＸ座標補正
 * @desc 粒が発生するＸ座標の補正値です。
 * 初期値は-100
 * @type number @max 9999 @min -9999
 * @default -100
 * 
 * @param AdjustStartY
 * @parent PositionSetting
 * @text 発生地点のＹ座標補正
 * @desc 粒が発生するＹ座標の補正値です。
 * 初期値は-200
 * @type number @max 9999 @min -9999
 * @default -200
 * 
 * @param DisplaySetting
 * @text 表示設定
 * 
 * @param BlendColor
 * @parent DisplaySetting
 * @text 合成する色調
 * @desc 色調を変更します。例：[255, 255, 255, 255]
 * 赤,緑,青,強さの順。非常に負荷が高いので注意。
 * @type string
 * 
 * @param BlendMode
 * @parent DisplaySetting
 * @text 合成方法
 * @desc 粒画像の合成方法です。
 * @type select
 * @option 0:通常 @value 0
 * @option 1:加算 @value 1
 * @option 2:乗算 @value 2
 * @option 3:スクリーン @value 3
 * 
 * @param Scale
 * @parent DisplaySetting
 * @text 拡大率
 * @desc 粒の拡大率。1が基準です。
 * 数式可、『Math.random() * 3』なども有効です。
 * @type string
 * 
 * @param Angle
 * @parent DisplaySetting
 * @text 角度
 * @desc 粒の角度です。
 * 0～360で指定してください。
 * @type number @min 0 @max 360
 * 
 * @param OpacitySetting
 * @text 不透明度設定
 * 
 * @param StartOpacityBase
 * @parent OpacitySetting
 * @text 開始不透明度
 * @desc 粒が生成される際の不透明度です。最大255。
 * 初期値は160です。
 * @type number @min 0 @max 255
 * @default 160
 * 
 * @param StartOpacityRandom
 * @parent OpacitySetting
 * @text 開始不透明度分散
 * @desc 粒が生成される際の不透明度の分散値です。初期値は60。
 * 開始不透明度にこの値がランダムで加算されます。
 * @type number @min 0 @max 255
 * @default 60
 * 
 * @param ReduceOpacity
 * @parent OpacitySetting
 * @text 不透明度減少値
 * @desc フレーム毎に減少させる粒の不透明度です。
 * @type number @min 1 @max 255
 * 
 * @param EndOpacity
 * @parent OpacitySetting
 * @text 終了不透明度
 * @desc 不透明度がこの値より小さくなった際、粒を消去＆再作成します。
 * @type number @min 1 @max 255
 * @default 40
 */

/*~struct~Option:ja
 * @param BaseSetting
 * @text 基本設定
 * 
 * @param DimmerLevel
 * @parent BaseSetting
 * @text 暗くする度合
 * @desc 天候の強さに応じて画面を暗くする度合いです。
 * 初期値は6。強さが増える毎にX/255ずつ暗くなります。
 * @type number
 * 
 * @param Image
 * @parent BaseSetting
 * @text 画像
 * @desc 粒に使用する画像です。
 * これを指定した場合、色調、横幅, 縦幅は無視されます。
 * @type file
 * @dir img/pictures
 * 
 * @param NoImageSetting
 * @text 画像を指定しない場合
 * 
 * @param Color
 * @parent NoImageSetting
 * @text 色調
 * @desc 粒の色調です。
 * 例１："white", 例２："#FF0000", 例３："[255, 64, 0]"
 * @type string
 * 
 * @param IndividualBitmap
 * @parent NoImageSetting
 * @text 画像を個別作成
 * @desc 粒の画像を個別に作成します。
 * 少し負荷が上がりますが、粒毎の色調変更などができます。
 * @type boolean
 * 
 * @param ParticleWidth
 * @parent NoImageSetting
 * @text 粒の横幅
 * @desc 粒の横幅です。
 * タイプが雪の場合は直径になります。
 * @type number
 * 
 * @param ParticleHeight
 * @parent NoImageSetting
 * @text 粒の縦幅
 * @desc 粒の縦幅です。
 * タイプが雪の場合は無効です。
 * @type number
 * 
 * @param SpeedSetting
 * @text 速度設定
 * 
 * @param SpeedX
 * @parent SpeedSetting
 * @text 速度Ｘ
 * @desc Ｘ方向の速度です。
 * マイナスにすると左に移動します。
 * @type number @min -999 @max 999 @decimals 1
 * 
 * @param SpeedY
 * @parent SpeedSetting
 * @text 速度Ｙ
 * @desc Ｙ方向の速度です。
 * マイナスにすると上に移動します。
 * @type number @min -999 @max 999 @decimals 1
 * 
 * @param PositionSetting
 * @text 位置設定
 * 
 * @param StartWidth
 * @parent PositionSetting
 * @text 発生地点の横範囲
 * @desc 粒が発生する横範囲です。数式可。
 * 初期値は『Graphics.width + 100』
 * @type string
 * 
 * @param StartHeight
 * @parent PositionSetting
 * @text 発生地点の縦範囲
 * @desc 粒が発生する縦範囲です。数式可。
 * 初期値は『Graphics.height + 200』
 * @type string
 * 
 * @param AdjustStartX
 * @parent PositionSetting
 * @text 発生地点のＸ座標補正
 * @desc 粒が発生するＸ座標の補正値です。
 * 初期値は-100
 * @type number @max 9999 @min -9999
 * 
 * @param AdjustStartY
 * @parent PositionSetting
 * @text 発生地点のＹ座標補正
 * @desc 粒が発生するＹ座標の補正値です。
 * 初期値は-200
 * @type number @max 9999 @min -9999
 * 
 * @param DisplaySetting
 * @text 表示設定
 * 
 * @param BlendColor
 * @parent DisplaySetting
 * @text 合成する色調
 * @desc 色調を変更します。例：[255, 255, 255, 255]
 * 赤,緑,青,強さの順。非常に負荷が高いので注意。
 * @type string
 * 
 * @param BlendMode
 * @parent DisplaySetting
 * @text 合成方法
 * @desc 粒画像の合成方法です。
 * @type select
 * @option 0:通常 @value 0
 * @option 1:加算 @value 1
 * @option 2:乗算 @value 2
 * @option 3:スクリーン @value 3
 * 
 * @param Scale
 * @parent DisplaySetting
 * @text 拡大率
 * @desc 粒の拡大率。1が基準です。
 * 数式可、『Math.random() * 3』なども有効です。
 * @type string
 * 
 * @param Angle
 * @parent DisplaySetting
 * @text 角度
 * @desc 粒の角度です。
 * 0～360で指定してください。
 * @type number @min 0 @max 360
 * 
 * @param OpacitySetting
 * @text 不透明度設定
 * 
 * @param StartOpacityBase
 * @parent OpacitySetting
 * @text 開始不透明度
 * @desc 粒が生成される際の不透明度です。最大255。
 * 初期値は160です。
 * @type number @min 0 @max 255
 * 
 * @param StartOpacityRandom
 * @parent OpacitySetting
 * @text 開始不透明度分散
 * @desc 粒が生成される際の不透明度の分散値です。初期値は60。
 * 開始不透明度にこの値がランダムで加算されます。
 * @type number @min 0 @max 255
 * 
 * @param ReduceOpacity
 * @parent OpacitySetting
 * @text 不透明度減少値
 * @desc フレーム毎に減少させる粒の不透明度です。
 * @type number @min 1 @max 255
 * 
 * @param EndOpacity
 * @parent OpacitySetting
 * @text 終了不透明度
 * @desc 不透明度がこの値より小さくなった際、粒を消去＆再作成します。
 * @type number @min 1 @max 255
 */

(function() {
"use strict";

/**
 * ●構造体（二重配列）をJSで扱えるように変換
 */
function parseStruct2(arg) {
    var ret = [];

    JSON.parse(arg).forEach(function(str) {
        ret.push(JSON.parse(str));
    });

    return ret;
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
    if (str === "") {
        return def;
    }
    return isNaN(str) ? def : +(str || def);
}
function setDefault(str, def) {
    return str ? str : def;
}

const PLUGIN_NAME = "NRP_WeatherEX";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pWeatherOnBattle = toBoolean(parameters["WeatherOnBattle"], false);
const pMaxSpritesByPower = toNumber(parameters["MaxSpritesByPower"], 10);
const pDimmerLevel = toNumber(parameters["DimmerLevel"], 6);
const pDimmerLimit = toNumber(parameters["DimmerLimit"]);
const pTemplateList = parseStruct2(parameters["TemplateList"]);

//----------------------------------------
// ＭＺ用プラグインコマンド
//----------------------------------------

// MVには存在しないため、空で定義しておかないとエラーになる。
if (!PluginManager.registerCommand) {
    PluginManager.registerCommand = function() {}
}

/**
 * ●天候の設定
 */
PluginManager.registerCommand(PLUGIN_NAME, "ChangeWeather", function(args) {
    // パラメータを保有するオブジェクト
    const params = {};
    params.templateId = args.TemplateId;

    // テンプレートＩＤの指定がある場合、一致があるかどうかを検索
    if (params.templateId) {
        const template = pTemplateList.find(function(t) {
            return t.TemplateId == params.templateId;
        });

        // テンプレートが存在した場合、反映
        if (template) {
            readTemplate(params, template);
        }
    }

    // プラグインコマンドの指定がある場合は上書
    readArgs(params, args);

    // 変更実行
    $gameScreen.changeOriginalWeather(params);
    if (params.wait) {
        this.wait(params.duration);
    }
});

/**
 * ●テンプレートの内容を読込
 */
function readTemplate(params, template) {
    // プロパティをコピー
    params.type = template.Type;
    params.power = toNumber(template.Power);
    params.duration = toNumber(template.Duration);
    params.wait = toBoolean(template.Wait);
    params.dimmerLevel = toNumber(template.DimmerLevel);
    params.image = template.Image;
    params.color = template.Color;
    params.individualBitmap = toBoolean(template.IndividualBitmap, false);
    params.particleWidth = template.ParticleWidth;
    params.particleHeight = template.ParticleHeight;
    params.speedX = toNumber(template.SpeedX);
    params.speedY = toNumber(template.SpeedY);
    params.startWidth = template.StartWidth;
    params.startHeight = template.StartHeight;
    params.adjustStartX = toNumber(template.AdjustStartX);
    params.adjustStartY = toNumber(template.AdjustStartY);
    params.blendColor = template.BlendColor;
    params.blendMode = template.BlendMode;
    params.scale = template.Scale;
    params.angle = toNumber(template.Angle);
    params.startOpacityBase = toNumber(template.StartOpacityBase);
    params.startOpacityRandom = toNumber(template.StartOpacityRandom);
    params.reduceOpacity = toNumber(template.ReduceOpacity);
    params.endOpacity = toNumber(template.EndOpacity);
}

/**
 * ●プラグインコマンドの引数を読込
 */
function readArgs(params, args) {
    // argsに値があればそちらを優先
    // なければ、そのままparamsの値を使用
    params.type = setArg(args.Type, params.type);
    params.power = setArg(toNumber(args.Power), params.power);
    params.duration = setArg(toNumber(args.Duration), params.duration);
    params.wait = setArg(toBoolean(args.Wait), params.wait);

    // オプション項目
    if (args.Option) {
        const option = JSON.parse(args.Option);
        params.dimmerLevel = setArg(toNumber(option.DimmerLevel), params.dimmerLevel);
        params.image = setArg(option.Image, params.image);
        params.color = setArg(option.Color, params.color);
        params.individualBitmap = setArg(toBoolean(option.IndividualBitmap), params.individualBitmap);
        params.particleWidth = setArg(option.Width, params.particleWidth);
        params.particleHeight = setArg(option.Height, params.particleHeight);
        params.speedX = setArg(toNumber(option.SpeedX), params.speedX);
        params.speedY = setArg(toNumber(option.SpeedY), params.speedY);
        params.startWidth = setArg(option.StartWidth, params.startWidth);
        params.startHeight = setArg(option.StartHeight, params.startHeight);
        params.adjustStartX = setArg(toNumber(option.AdjustStartX), params.adjustStartX);
        params.adjustStartY = setArg(toNumber(option.AdjustStartY), params.adjustStartY);
        params.blendColor = setArg(option.BlendColor, params.blendColor);
        params.blendMode = setArg(option.BlendMode, params.blendMode);
        params.scale = setArg(option.Scale, params.scale);
        params.angle = setArg(toNumber(option.Angle), params.angle);
        params.startOpacityBase = setArg(toNumber(option.StartOpacityBase), params.startOpacityBase);
        params.startOpacityRandom = setArg(toNumber(option.StartOpacityRandom), params.startOpacityRandom);
        params.reduceOpacity = setArg(toNumber(option.ReduceOpacity), params.reduceOpacity);
        params.endOpacity = setArg(toNumber(option.EndOpacity), params.endOpacity);
    }
}

/**
 * ●空文字チェックして値を返す。
 */
function setArg(val, def) {
    if (val !== undefined && val !== null && val !== "") {
        return val;
    }
    return def;
}

/**
 * ●コンボの値を取得する。
 */
function getComboValue(value) {
    // 空白はundefined扱い
    if (value === "") {
        return undefined;
    }
    // #以降は注釈扱いなので除去
    // さらに前後の空白を除去する。
    return value.split("#")[0].trim();
}

//----------------------------------------
// ＭＶ用プラグインコマンド
//----------------------------------------

// 旧ＭＶプラグインコマンド用
let plPower;
let plTime;
let plWait;

/**
 * ●ＭＶ用の旧式プラグインコマンド
 */
const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);

    // 小文字化してから判定
    const lowerCommand = command.toLowerCase();
    
    // テンプレートＩＤを指定
    if (lowerCommand === "nrp.weatherex.id") {
        const templateId = args[0];

        // パラメータを保有するオブジェクト
        const params = {};
        params.templateId = templateId;

        // テンプレートＩＤの指定がある場合、一致があるかどうかを検索
        if (params.templateId) {
            const template = pTemplateList.find(function(t) {
                return t.TemplateId == params.templateId;
            });

            // テンプレートが存在した場合、反映
            if (template) {
                readTemplate(params, template);
            }
        }

        // プラグインコマンドの指定がある場合は上書
        if (plPower != undefined) {
            params.power = plPower;
        }
        if (plTime != undefined) {
            params.time = plTime;
        }
        if (plWait != undefined) {
            params.wait = plWait;
        }

        // 設定したらクリア
        plPower = undefined;
        plTime = undefined;
        plWait = undefined;

        // 変更実行
        $gameScreen.changeOriginalWeather(params);
        if (params.wait) {
            this.wait(params.duration);
        }

    // タイプを指定
    } else if (lowerCommand === "nrp.weatherex.type") {
        const type = args[0];

        $gameScreen.changeWeather(type, plPower, plTime);
        if (plWait) {
            this.wait(plTime);
        }

        // 設定したらクリア
        plPower = undefined;
        plTime = undefined;
        plWait = undefined;

    // 強さの設定
    } else if (lowerCommand === "nrp.weatherex.power") {
        plPower = toNumber(args[0]);

    // 時間の設定
    } else if (lowerCommand === "nrp.weatherex.time") {
        plTime = toNumber(args[0]);

    // 完了までウェイトの設定
    } else if (lowerCommand === "nrp.weatherex.wait") {
        plWait = toBoolean(args[0]);
    }
};

//-----------------------------------------------------------
// Weather
//-----------------------------------------------------------

/**
 * ●画面を暗くするスプライトの更新
 */
Weather.prototype._updateDimmer = function() {
    // プラグインパラメータの設定値
    let opacity = Math.floor(this.power * pDimmerLevel);

    // 制限値を超えている場合は補正
    if (pDimmerLimit != undefined && opacity > pDimmerLimit) {
        opacity = pDimmerLimit;
    }

    this._dimmerSprite.opacity = opacity;
};

/**
 * ●天候スプライトの更新
 */
if (pMaxSpritesByPower != undefined) {
    Weather.prototype._updateAllSprites = function() {
        // 強さの調整
        const maxSprites = Math.floor(this.power * pMaxSpritesByPower);
        while (this._sprites.length < maxSprites) {
            this._addSprite();
        }
        while (this._sprites.length > maxSprites) {
            this._removeSprite();
        }
        for (const sprite of this._sprites) {
            this._updateSprite(sprite);
            sprite.x = sprite.ax - this.origin.x;
            sprite.y = sprite.ay - this.origin.y;
        }
    };
}

//-----------------------------------------------------------
// OriginalWeather
//-----------------------------------------------------------

/**
 * 独自の天候クラス
 */
function OriginalWeather() {
    this.initialize(...arguments);
}

OriginalWeather.prototype = Object.create(Weather.prototype);
OriginalWeather.prototype.constructor = OriginalWeather;

OriginalWeather.prototype.initialize = function(params) {
    Weather.prototype.initialize();

    this.params = params;
    this._createOriginalBitmaps(params);
};

/**
 * ●独自天候用の画像を作成
 */
OriginalWeather.prototype._createOriginalBitmaps = function(params) {
    this._originalBitmap = this._makeOriginalBitmaps(params);
};

/**
 * ●独自天候用の画像を作成
 */
OriginalWeather.prototype._makeOriginalBitmaps = function(params) {
    const type = params.type;
    const imageName = params.image;
    let width = 0;
    let height = 0;
    let color = "white";

    // 指定の画像がある場合は優先使用
    if (imageName) {
        return ImageManager.loadPicture(imageName);

    // それ以外
    } else {
        // 天候毎に初期値を設定
        if (type == "rain") {
            width = 1;
            height = 60;

        } else if (type == "storm") {
            width = 2;
            height = 100;

        } else if (type == "snow") {
            width = 9;
            height = 9;
        }

        // 指定があれば優先
        if (params.particleWidth) {
            width = params.particleWidth;
        }
        if (params.particleHeight) {
            height = params.particleHeight;
        }

        // 雪の場合は円形なので縦横は同じにしておく。
        if (type == "snow") {
            height = width;
        }

        if (params.color) {
            // "["で始まる場合はevalする。
            if (params.color.startsWith("[")) {
                const colorArr = eval(params.color);
                color = "rgb(" + eval(colorArr[0]) + "," + eval(colorArr[1]) + "," + eval(colorArr[2]) + ")";
            } else {
                color = params.color;
            }
        }

        // 指定した大きさで画像を作成
        const bitmap = new Bitmap(width, height);

        // 雪の場合は円にする。
        if (type == "snow") {
            // 横幅から半径を求める。
            const radius = Math.floor(width / 2);
            bitmap.drawCircle(radius, radius, radius, color);
        } else {
            bitmap.fillAll(color);
        }

        return bitmap;
    }
};

/**
 * ●画面を暗くするスプライトの更新
 */
OriginalWeather.prototype._updateDimmer = function() {
    // 指定があった場合はそちらを利用
    if (this.params.dimmerLevel != undefined) {
        // プラグインパラメータの設定値
        let opacity = Math.floor(this.power * this.params.dimmerLevel);
        
        // 制限値を超えている場合は補正
        if (pDimmerLimit != undefined && opacity > pDimmerLimit) {
            opacity = pDimmerLimit;
        }

        this._dimmerSprite.opacity = opacity;
        return;
    }

    // 指定がなければWeatherと同じ
    Weather.prototype._updateDimmer();
};

/**
 * ●粒の描画更新
 */
OriginalWeather.prototype._updateSprite = function(sprite) {
    switch (this.type) {
        case "rain":
            this._updateRainSprite(sprite);
            break;
        case "storm":
            this._updateStormSprite(sprite);
            break;
        case "snow":
            this._updateSnowSprite(sprite);
            break;
    }

    const params = this.params;
    let endOpacity = 40;
    if (params.endOpacity != undefined) {
        endOpacity = params.endOpacity;
    }

    // 指定の不透明度を下回った。
    if (sprite.opacity < endOpacity) {
        // →粒を再作成
        this._rebornSprite(sprite);
    }
};

/**
 * ●角度をラジアン角に変換する。
 */
function angleToRotation(angle) {
    return angle * Math.PI / 180;
}

/**
 * ●雨の描画更新
 */
OriginalWeather.prototype._updateRainSprite = function(sprite) {
    const params = this.params;
    const angle = params.angle;
    const speedX = params.speedX;
    const speedY = params.speedY;
    const reduceOpacity = params.reduceOpacity;

    if (angle != undefined) {
        sprite.rotation = angleToRotation(angle);
    } else {
        sprite.rotation = Math.PI / 16;
    }

    if (speedX != undefined) {
        sprite.ax += speedX;
    } else {
        sprite.ax -= 6 * Math.sin(sprite.rotation);
    }
    
    if (speedY != undefined) {
        sprite.ay += speedY;
    } else {
        sprite.ay += 6 * Math.cos(sprite.rotation);
    }

    // 不透明度を減少
    if (reduceOpacity != undefined) {
        sprite.opacity -= reduceOpacity;
    } else {
        sprite.opacity -= 6;
    }
};

/**
 * ●嵐の描画更新
 */
OriginalWeather.prototype._updateStormSprite = function(sprite) {
    const params = this.params;
    const angle = params.angle;
    const speedX = params.speedX;
    const speedY = params.speedY;
    const reduceOpacity = params.reduceOpacity;

    if (angle != undefined) {
        sprite.rotation = angleToRotation(angle);
    } else {
        sprite.rotation = Math.PI / 8;
    }

    if (speedX != undefined) {
        sprite.ax += speedX;
    } else {
        sprite.ax -= 8 * Math.sin(sprite.rotation);
    }
    
    if (speedY != undefined) {
        sprite.ay += speedY;
    } else {
        sprite.ay += 8 * Math.cos(sprite.rotation);
    }

    // 不透明度を減少
    if (reduceOpacity != undefined) {
        sprite.opacity -= reduceOpacity;
    } else {
        sprite.opacity -= 8;
    }
};

/**
 * ●雪の描画更新
 */
OriginalWeather.prototype._updateSnowSprite = function(sprite) {
    const params = this.params;
    const angle = params.angle;
    const speedX = params.speedX;
    const speedY = params.speedY;
    const reduceOpacity = params.reduceOpacity;

    if (angle != undefined) {
        sprite.rotation = angleToRotation(angle);
    } else {
        sprite.rotation = Math.PI / 16;
    }

    if (speedX != undefined) {
        sprite.ax += speedX;
    } else {
        sprite.ax -= 3 * Math.sin(sprite.rotation);
    }
    
    if (speedY != undefined) {
        sprite.ay += speedY;
    } else {
        sprite.ay += 3 * Math.cos(sprite.rotation);
    }

    // 不透明度を減少
    if (reduceOpacity != undefined) {
        sprite.opacity -= reduceOpacity;
    } else {
        sprite.opacity -= 3;
    }
};

/**
 * ●スプライトの追加
 */
OriginalWeather.prototype._addSprite = function() {
    const params = this.params;

    const sprite = new Sprite(this.viewport);

    // 粒が発生する不透明度
    // 初期状態では40～220の不透明度を取り得る。
    let startOpacityBase = 160;
    let startOpacityRandom = 60;
    let endOpacity = 40;

    if (params.startOpacityBase != undefined) {
        startOpacityBase = params.startOpacityBase;
    }
    if (params.startOpacityRandom != undefined) {
        startOpacityRandom = params.startOpacityRandom;
    }
    if (params.endOpacity != undefined) {
        endOpacity = params.endOpacity;
    }

    // 開始時の不透明度を分散させることで、始動をスムーズにする。
    // ※通常は初期の不透明度で一斉に生成されるため偏ってしまう。
    // 例：初期状態では40～220の不透明度を設定。
    sprite.opacity = endOpacity + Math.randomInt(startOpacityBase + startOpacityRandom - endOpacity);

    // 位置を設定
    this._rebornSpritePosition(sprite);

    // 独自の画像があるなら設定
    if (this._originalBitmap) {
        // 画像を個別作成する場合
        if (params.individualBitmap) {
            sprite.bitmap = this._makeOriginalBitmaps(params);

        // 同一の画像を使用する場合
        } else {
            sprite.bitmap = this._originalBitmap;
        }

    // なければ天候に応じた画像を指定
    } else if (type = "rain") {
        sprite.bitmap = this._rainBitmap;
    } else if (type = "storm") {
        sprite.bitmap = this._stormBitmap;
    } else if (type = "snow") {
        sprite.bitmap = this._snowBitmap;
    }

    // 合成色調
    if (params.blendColor) {
        sprite.setBlendColor(eval(params.blendColor));
    }
    // 合成方法
    if (params.blendMode) {
        sprite.blendMode = params.blendMode;
    }
    // 拡大率
    if (params.scale) {
        const scale = eval(params.scale);
        sprite.scale.x = scale;
        sprite.scale.y = scale;
    }

    this._sprites.push(sprite);
    this.addChild(sprite);
};

/**
 * ●粒の再発生
 */
OriginalWeather.prototype._rebornSprite = function(sprite) {
    this._rebornSpritePosition(sprite);
    this._rebornSpriteOpacity(sprite);
};

/**
 * ●再発生時の座標設定
 */
OriginalWeather.prototype._rebornSpritePosition = function(sprite) {
    const params = this.params;

    // 粒が発生するＸ座標を決定
    let startWidth = 0;
    let adjustStartX = 0;

    // 発生する横範囲
    if (params.startWidth) {
        startWidth = eval(params.startWidth);
    } else {
        startWidth = Graphics.width + 100;
    }

    // Ｘ座標補正
    if (params.adjustStartX) {
        adjustStartX = eval(params.adjustStartX);
    } else {
        adjustStartX = -100;
    }

    sprite.ax = Math.randomInt(startWidth) + adjustStartX + this.origin.x;

    // 粒が発生するＹ座標を決定
    let startHeight = 0;
    let adjustStartY = 0;

    // 発生する縦範囲
    if (params.startHeight) {
        startHeight = eval(params.startHeight);
    } else {
        startHeight = Graphics.height + 200;
    }

    // Ｙ座標補正
    if (params.adjustStartY) {
        adjustStartY = eval(params.adjustStartY);
    } else {
        adjustStartY = -200;
    }

    sprite.ay = Math.randomInt(startHeight) + adjustStartY + this.origin.y;
};

/**
 * ●再発生時の不透明度設定
 */
OriginalWeather.prototype._rebornSpriteOpacity = function(sprite) {
    const params = this.params;

    // 粒が発生する不透明度
    let startOpacityBase = 160;
    let startOpacityRandom = 60;

    if (params.startOpacityBase != undefined) {
        startOpacityBase = params.startOpacityBase;
    }
    if (params.startOpacityRandom != undefined) {
        startOpacityRandom = params.startOpacityRandom;
    }

    sprite.opacity = startOpacityBase + Math.randomInt(startOpacityRandom);
}

//-----------------------------------------------------------
// Game_Screen
//-----------------------------------------------------------

/**
 * 【独自】独自の天候変更
 */
Game_Screen.prototype.changeOriginalWeather = function(params) {
    const type = params.type;
    const power = params.power;
    const duration = params.duration;

    if (type !== "none" || duration === 0) {
        this._weatherType = type;
        this._originalWeatherParams = params;

        // 指定の画像で天候用スプライトを作成
        const spriteset = getSpriteset();
        if (spriteset && spriteset.createOriginalWeather) {
            spriteset.createOriginalWeather(params);
        }
    }

    this._weatherPowerTarget = type === "none" ? 0 : power;
    this._weatherDuration = duration;
    if (duration === 0) {
        this._weatherPower = this._weatherPowerTarget;
    }
};

/**
 * 【独自】独自の天候かどうか？
 */
Game_Screen.prototype.isOriginalWeather = function() {
    // パラメータが存在すればtrue
    return !!(this._originalWeatherParams && this._originalWeatherParams.type);
};

/**
 * 【独自】独自天候用のパラメータ
 */
Game_Screen.prototype.originalWeatherParams = function() {
    return this._originalWeatherParams;
};

/**
 * ●天候のクリア
 */
const _Game_Screen_clearWeather = Game_Screen.prototype.clearWeather;
Game_Screen.prototype.clearWeather = function() {
    _Game_Screen_clearWeather.apply(this, arguments);

    // 独自パラメータをクリア
    this._originalWeatherParams = {};
    const spriteset = getSpriteset();
    if (spriteset && spriteset.clearOriginalWeather) {
        spriteset.clearOriginalWeather();
    }
};

/**
 * ●天候の変更
 */
const _Game_Screen_changeWeather = Game_Screen.prototype.changeWeather;
Game_Screen.prototype.changeWeather = function(type, power, duration) {
    _Game_Screen_changeWeather.apply(this, arguments);

    // 他の天候が指定されている場合
    if (type !== "none" || duration === 0) {
        // 独自パラメータをクリア
        this._originalWeatherParams = {};
        const spriteset = getSpriteset();
        if (spriteset && spriteset.clearOriginalWeather) {
            spriteset.clearOriginalWeather();
        }
    }
};

const _Game_Screen_updateWeather = Game_Screen.prototype.updateWeather;
Game_Screen.prototype.updateWeather = function() {
    // this._weatherDurationの値が変化するため、先に保持しておく。
    const flg = this._weatherDuration > 0;

    // 元の処理
    _Game_Screen_updateWeather.apply(this, arguments);

    // Target値に到達した場合
    if (flg && this._weatherDuration === 0 && this._weatherPowerTarget === 0) {
        // 独自パラメータをクリア
        this._originalWeatherParams = {};
        const spriteset = getSpriteset();
        if (spriteset && spriteset.clearOriginalWeather) {
            spriteset.clearOriginalWeather();
        }
    }
};

//-----------------------------------------------------------
// Spriteset_Map
//-----------------------------------------------------------

/**
 * 【独自】独自の天候を作成
 */
Spriteset_Map.prototype.createOriginalWeather = function(params) {
    this.clearOriginalWeather();

    this._originalWeather = new OriginalWeather(params);
    this.addChild(this._originalWeather);
};

/**
 * 【独自】独自天候のクリア
 */
Spriteset_Map.prototype.clearOriginalWeather = function() {
    // 既に存在していた場合は削除
    if (this._originalWeather) {
        this.removeChild(this._originalWeather);
    }
};

/**
 * ●下層の作成
 */
const _Spriteset_Map_createLowerLayer = Spriteset_Map.prototype.createLowerLayer;
Spriteset_Map.prototype.createLowerLayer = function() {
    _Spriteset_Map_createLowerLayer.apply(this, arguments);

    // オリジナル天候実施中なら作成
    // ※画面切替時も継続するための措置
    if ($gameScreen.isOriginalWeather()) {
        this.createOriginalWeather($gameScreen.originalWeatherParams());
    }
};

/**
 * ●天候の更新
 */
const _Spriteset_Map_updateWeather = Spriteset_Map.prototype.updateWeather;
Spriteset_Map.prototype.updateWeather = function() {
    // 独自の天候の場合
    if ($gameScreen.isOriginalWeather()) {
        // originalWeatherにパラメータを渡す
        this._originalWeather.type = $gameScreen.weatherType();
        this._originalWeather.power = $gameScreen.weatherPower();
        this._originalWeather.origin.x = $gameMap.displayX() * $gameMap.tileWidth();
        this._originalWeather.origin.y = $gameMap.displayY() * $gameMap.tileHeight();
        this._originalWeather.params = $gameScreen.originalWeatherParams();
        
        // 通常の天候はクリアしておく。
        this._weather.power = 0;
        return;
    }

    _Spriteset_Map_updateWeather.apply(this, arguments);
};

//-----------------------------------------------------------
// Spriteset_Battle
// ※戦闘中も天候を表示
//-----------------------------------------------------------

if (pWeatherOnBattle) {
    /**
     * 【独自】独自の天候を作成
     */
    Spriteset_Battle.prototype.createOriginalWeather = function(params) {
        Spriteset_Map.prototype.createOriginalWeather.apply(this, arguments);
    };

    /**
     * 【独自】下層の作成
     */
    const _Spriteset_Battle_createLowerLayer = Spriteset_Battle.prototype.createLowerLayer;
    Spriteset_Battle.prototype.createLowerLayer = function() {
        _Spriteset_Battle_createLowerLayer.apply(this, arguments);

        Spriteset_Map.prototype.createWeather.apply(this, arguments);

        // オリジナル天候実施中なら作成
        // ※画面切替時も継続するための措置
        if ($gameScreen.isOriginalWeather()) {
            this.createOriginalWeather($gameScreen.originalWeatherParams());
        }
    };

    /**
     * 【独自】更新
     */
    const _Spriteset_Battle_update = Spriteset_Battle.prototype.update;
    Spriteset_Battle.prototype.update = function() {
        _Spriteset_Battle_update.apply(this, arguments);

        Spriteset_Map.prototype.updateWeather.apply(this, arguments);
    };

    /**
     * 【独自】独自天候のクリア
     */
    Spriteset_Battle.prototype.clearOriginalWeather = function() {
        Spriteset_Map.prototype.clearOriginalWeather.apply(this, arguments);
    };
}

//-----------------------------------------------------------
// Game_Interpreter
// ※戦闘中も天候を表示
//-----------------------------------------------------------

if (pWeatherOnBattle) {
    // Set Weather Effect
    const _Game_Interpreter_command236 = Game_Interpreter.prototype.command236;
    Game_Interpreter.prototype.command236 = function(params) {
        if ($gameParty.inBattle()) {
            $gameScreen.changeWeather(params[0], params[1], params[2]);
            if (params[3]) {
                this.wait(params[2]);
            }
        }

        return _Game_Interpreter_command236.apply(this, arguments);
    };
}

//-----------------------------------------------------------
// その他共通関数
//-----------------------------------------------------------

/**
 * ●マップのSpritesetを取得する。
 */
function getSpriteset() {
    return SceneManager._scene._spriteset;
}

})();
