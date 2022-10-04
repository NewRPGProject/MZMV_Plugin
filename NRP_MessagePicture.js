//=============================================================================
// NRP_MessagePicture.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.03 Display a picture when showing text.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/489210228.html
 *
 * @help Display a picture when showing text.
 * It is possible to display a picture automatically
 * by referring to the string in the name box.
 * 
 * The image is designed to be replaced with a difference.
 * ※It is assumed that the entire picture will be replaced,
 *   even if it is a difference.
 * 
 * It does not have advanced features comparable to existing plugins,
 * such as multiple picture display or animation.
 * I am aiming for simplicity.
 * 
 * -------------------------------------------------------------------
 * [Automatic recognition in the name box]
 * -------------------------------------------------------------------
 * Set the condition name in "TargetString" of "PictureList"
 * and link the pictures.
 * 
 * Example of TargetString: Reid, \n[1]
 * 
 * ※Control Characters and names converted from Control Characters
 *   are also valid.
 * 
 * This is all you need to do.
 * The specified picture will be displayed during Show Text.
 * 
 * The coordinates for showing pictures
 * and other parameters can be set by plugin parameters.
 * You can also adjust these parameters on a picture-by-picture basis.
 * 
 * -------------------------------------------------------------------
 * [Specify by RegistId]
 * -------------------------------------------------------------------
 * If the character cannot be identified by name,
 * it can be specified by ID.
 * (For example, a first-time character whose name is not known.)
 * 
 * First, specify "ResistId" for "PictureList".
 * The format can be a number or a string.
 * 
 * After that, just specify ResistId
 * in the Control Character in the name box.
 * 
 * If ResistId is A, then "\MP[A]".
 * 
 * ※The Control Character (MP) part can be changed.
 * ※Any case is acceptable. "\mp[A]" is also valid.
 * 
 * To display a name, you can also add it before or
 * after the display name, such as "Mystery Boy\MP[A]".
 * 
 * -------------------------------------------------------------------
 * [Don't show picture]
 * -------------------------------------------------------------------
 * If you do not want the picture to be displayed automatically,
 * specify 0 as in "Reid\MP[0]" to hide the picture.
 * 
 * It can also be hidden forever by turning on "DisableSwitch".
 * 
 * -------------------------------------------------------------------
 * [Show Difference]
 * -------------------------------------------------------------------
 * Open "DifferenceList" in "PictureList"
 * and link "DiffId" to the picture for difference.
 * 
 * If the target string is "Reid" and DiffId is "sad",
 * set the Name box to "Reid\MPD[sad]".
 * The difference picture will be displayed.
 * 
 * Also, as for \MPD[], it is valid within the text.
 * You can use it when you want
 * to change the expression many times in a sentence.
 * 
 * -------------------------------------------------------------------
 * [Show Attached Pictures]
 * -------------------------------------------------------------------
 * AttachedPictures allows you to layer additional pictures
 * on top of the base picture.
 * 
 * For example, in combination with a switch, a character's costume
 * during a conversation can be changed depending on the situation.
 * 
 * AttachedPictures can be set
 * to either "PictureList" or "DifferenceList".
 * In particular, in the case of "DifferenceList",
 * only AttachedPictures can be changed
 * if the base picture is left blank.
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
 * @ Plugin Parameters
 * @------------------------------------------------------------------
 * 
 * @param PictureList
 * @type struct<Picture>[]
 * @desc List of pictures to be displayed.
 * 
 * @param <PictureSetting>
 * 
 * @param PictureId
 * @parent <PictureSetting>
 * @type number @min 0
 * @default 101
 * @desc The number to be used for the picture.
 * AttachedPictures will be sequential numbers following this.
 * 
 * @param Origin
 * @parent <PictureSetting>
 * @type select
 * @option 0:Left-Upper @value 0
 * @option 1:Center @value 1
 * @default 1
 * @desc The origin to display the picture.
 * 
 * @param X
 * @parent <PictureSetting>
 * @type number
 * @default 700
 * @desc The X coordinate at which the picture is to be displayed.
 * 
 * @param Y
 * @parent <PictureSetting>
 * @type number
 * @default 300
 * @desc The Y coordinate at which the picture is to be displayed.
 * 
 * @param ScaleX
 * @parent <PictureSetting>
 * @type number
 * @default 100
 * @desc Horizontal scale rate.
 * Set the value based on 100.
 * 
 * @param ScaleY
 * @parent <PictureSetting>
 * @type number
 * @default 100
 * @desc Vertical scale rate.
 * Set the value based on 100.
 * 
 * @param Opacity
 * @parent <PictureSetting>
 * @type number @min 0 @max 255
 * @default 255
 * @desc The opacity of the picture.
 * 255 makes it completely opaque.
 * 
 * @param BlendMode
 * @parent <PictureSetting>
 * @type select
 * @option 0:Normal @value 0
 * @option 1:Additive @value 1
 * @option 2:Multiply @value 2
 * @option 3:Screen @value 3
 * @default 0
 * @desc This is a blend mode of drawing a picture.
 * 
 * @param <Control>
 * 
 * @param ControlCharacterPicture
 * @parent <Control>
 * @type string
 * @default MP
 * @desc Control character for displaying picture.
 * By default, it is used like \MP[RegistId].
 * 
 * @param ControlCharacterDifference
 * @parent <Control>
 * @type string
 * @default MPD
 * @desc Control Character for displaying picture differences.
 * By default, it is used like \MPD[DiffId].
 * 
 * @param DisableSwitch
 * @parent <Control>
 * @type switch
 * @desc This switch disables the display of pictures.
 */
//-----------------------------------------------------------------------------
// Picture
//-----------------------------------------------------------------------------
/*~struct~Picture:
 * @param TargetString
 * @type string
 * @desc Target string.
 * If this exists in the name box. Display picture.
 * 
 * @param ResistId
 * @type string
 * @desc ID for manual recall of a picture.
 * Invoke it like \MP[ResistId].
 * 
 * @param Picture
 * @type file
 * @dir img/pictures
 * @desc This is the base picture for the display.
 * 
 * @param AttachedPictures
 * @type file[]
 * @dir img/pictures
 * @desc A picture that is overlaid on top of a picture.
 * 
 * @param Switch
 * @type switch
 * @desc Switch to enable display.
 * The highest setting among the conditions is displayed.
 * 
 * @param DifferenceList
 * @type struct<Difference>[]
 * @desc List of picture differences.
 * 
 * @param <PictureSetting>
 * 
 * @param Origin
 * @parent <PictureSetting>
 * @type select
 * @option 0:Left-Upper @value 0
 * @option 1:Center @value 1
 * @desc The origin to display the picture.
 * 
 * @param AdjustX
 * @parent <PictureSetting>
 * @type number @min -9999 @max 9999
 * @desc X-coordinate adjustment value.
 * 
 * @param AdjustY
 * @parent <PictureSetting>
 * @type number @min -9999 @max 9999
 * @desc Y-coordinate adjustment value.
 * 
 * @param ScaleX
 * @parent <PictureSetting>
 * @type number
 * @desc Horizontal scale rate.
 * Set the value based on 100.
 * 
 * @param ScaleY
 * @parent <PictureSetting>
 * @type number
 * @desc Vertical scale rate.
 * Set the value based on 100.
 * 
 * @param Opacity
 * @parent <PictureSetting>
 * @type number @min 0 @max 255
 * @desc The opacity of the picture.
 * 255 makes it completely opaque.
 * 
 * @param BlendMode
 * @parent <PictureSetting>
 * @type select
 * @option 0:Normal @value 0
 * @option 1:Additive @value 1
 * @option 2:Multiply @value 2
 * @option 3:Screen @value 3
 * @desc This is a blend mode of drawing a picture.
 */
//-----------------------------------------------------------------------------
// Difference
//-----------------------------------------------------------------------------
/*~struct~Difference:
 * @param DiffId
 * @type string
 * @desc ID to be targeted for diff.
 * \MP[RegistId]\MPD[DiffId] to call it.
 * 
 * @param Picture
 * @type file
 * @dir img/pictures
 * @desc This is the base picture for the display.
 * 
 * @param AttachedPictures
 * @type file[]
 * @dir img/pictures
 * @desc A picture that is overlaid on top of a picture.
 * 
 * @param Switch
 * @type switch
 * @desc Switch to enable display.
 * The highest setting among the conditions is displayed.
 * 
 * @param Origin
 * @parent <PictureSetting>
 * @type select
 * @option 0:Left-Upper @value 0
 * @option 1:Center @value 1
 * @desc The origin to display the picture.
 * 
 * @param AdjustX
 * @parent <PictureSetting>
 * @type number @min -9999 @max 9999
 * @desc X-coordinate adjustment value.
 * 
 * @param AdjustY
 * @parent <PictureSetting>
 * @type number @min -9999 @max 9999
 * @desc Y-coordinate adjustment value.
 * 
 * @param ScaleX
 * @parent <PictureSetting>
 * @type number
 * @desc Horizontal scale rate.
 * Set the value based on 100.
 * 
 * @param ScaleY
 * @parent <PictureSetting>
 * @type number
 * @desc Vertical scale rate.
 * Set the value based on 100.
 * 
 * @param Opacity
 * @parent <PictureSetting>
 * @type number @min 0 @max 255
 * @desc The opacity of the picture.
 * 255 makes it completely opaque.
 * 
 * @param BlendMode
 * @parent <PictureSetting>
 * @type select
 * @option 0:Normal @value 0
 * @option 1:Additive @value 1
 * @option 2:Multiply @value 2
 * @option 3:Screen @value 3
 * @desc This is a blend mode of drawing a picture.
 * 
 * @param ShowAboveWindow
 * @parent <PictureSetting>
 * @type boolean
 * @default false
 * @desc Displays the picture above the message window.
 * 
 * @param ShowBelowMessages
 * @parent <PictureSetting>
 * @type boolean
 * @default false
 * @desc If "ShowAboveWindow" is on, the picture is displayed below the message.
 * 
 * @param AdjustMessageX
 * @parent ShowBelowMessages
 * @type number
 * @default 16
 * @desc Adjust the X coordinate of messages when "ShowBelowMessages" is on.
 * 
 * @param AdjustMessageY
 * @parent ShowBelowMessages
 * @type number
 * @default 20
 * @desc Adjust the Y coordinate of messages when "ShowBelowMessages" is on.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.03 文章の表示時に立ち絵を表示する。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/489210228.html
 *
 * @help 文章の表示時に立ち絵となるピクチャを表示します。
 * 名前欄の文字列を参照し、自動で表示することが可能です。
 * 
 * また、差分なども想定した作りになっています。
 * ※差分といっても、ピクチャ全体を差し替える想定です。
 * 
 * ピクチャの複数表示やアニメーションといった
 * 既存のプラグインに匹敵するような高度な機能はありません。
 * あくまでシンプルなものを目指しています。
 * 
 * -------------------------------------------------------------------
 * ■名前欄で自動認識
 * -------------------------------------------------------------------
 * 『ピクチャリスト』の『対象文字列』に条件とする名前を設定し、
 * ピクチャを紐づけてください。
 * 
 * 対象文字列の例：リード、\n[1]
 * ※制御文字や制御文字を変換した名前も有効です。
 * 
 * これだけでＯＫです。
 * 文章の表示時に指定したピクチャが表示されるようになります。
 * 
 * なお、ピクチャを表示する座標などはプラグインパラメータで設定できます。
 * ピクチャ毎に調整することも可能です。
 * 
 * -------------------------------------------------------------------
 * ■登録ＩＤで指定
 * -------------------------------------------------------------------
 * 名前で識別できない場合はＩＤで指定することもできます。
 * （例えば、名前が判明していない初登場のキャラクターなど。）
 * 
 * まずピクチャリストに『登録ＩＤ』を指定してください。
 * 形式は数値でも文字列でも構いません。
 * 
 * 後は名前欄の制御文字で登録ＩＤを指定すればＯＫです。
 * 登録ＩＤがAならば
 * 
 * - \MP[A]
 * 
 * となります。
 * 
 * ※制御文字（MP）の部分は変更できます。
 * ※大文字小文字は問いません。\mp[A]も有効です。
 * 
 * 名前を表示する場合も、
 * 
 * - 謎の少年\MP[A]
 * 
 * というように表示名の前後に付ければＯＫです。
 * 
 * -------------------------------------------------------------------
 * ■ピクチャを表示しない
 * -------------------------------------------------------------------
 * ピクチャを自動表示したくない場合は、
 * 
 * - リード\MP[0]
 * 
 * というように0を指定すれば、ピクチャが非表示になります。
 * 
 * また『ピクチャ無効スイッチ』をオンにすれば、ずっと非表示にできます。
 * 
 * -------------------------------------------------------------------
 * ■差分の表示
 * -------------------------------------------------------------------
 * 『ピクチャリスト』内の『差分リスト』を開き、
 * 『差分ＩＤ』と差分用のピクチャを紐づけてください。
 * 
 * 対象文字列がリードで差分ＩＤが『sad』とすると、
 * 名前欄を
 * 
 * - リード\MPD[sad]
 * 
 * とすれば、差分が表示されます。
 * 
 * また、\MPD[]に関しては本文内でも有効です。
 * 文章内で何度も表情を変えたい場合などに使えます。
 * 
 * -------------------------------------------------------------------
 * ■付属ピクチャの表示
 * -------------------------------------------------------------------
 * 付属ピクチャを指定すれば、
 * ベースとなるピクチャの上にさらにピクチャを重ねられます。
 * 
 * 例えば、スイッチと組み合わせれば、
 * 状況によって会話時のキャラクターの衣装を変更できます。
 * 
 * 付属ピクチャは『ピクチャリスト』『差分リスト』のいずれにも設定できます。
 * 特に『差分リスト』の場合は、ベースとなるピクチャを空欄にすれば、
 * 付属ピクチャのみを変更させることができます。
 * 
 * -------------------------------------------------------------------
 * ■利用規約
 * -------------------------------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @------------------------------------------------------------------
 * @ プラグインパラメータ
 * @------------------------------------------------------------------
 * 
 * @param PictureList
 * @text ピクチャリスト
 * @type struct<Picture>[]
 * @desc 立ち絵の表示を行うピクチャの一覧です。
 * 
 * @param <PictureSetting>
 * @text ＜ピクチャ設定＞
 * 
 * @param PictureId
 * @parent <PictureSetting>
 * @text ピクチャ番号
 * @type number @min 0
 * @default 101
 * @desc 立ち絵のピクチャに使用する番号です。
 * 付属ピクチャはこれに続く連番となります。
 * 
 * @param Origin
 * @parent <PictureSetting>
 * @text 原点
 * @type select
 * @option 0:左上 @value 0
 * @option 1:中央 @value 1
 * @default 1
 * @desc ピクチャを表示する原点です。
 * 
 * @param X
 * @parent <PictureSetting>
 * @text Ｘ座標
 * @type number
 * @default 700
 * @desc ピクチャを表示するＸ座標です。
 * 
 * @param Y
 * @parent <PictureSetting>
 * @text Ｙ座標
 * @type number
 * @default 300
 * @desc ピクチャを表示するＹ座標です。
 * 
 * @param ScaleX
 * @parent <PictureSetting>
 * @text 拡大率（幅）
 * @type number
 * @default 100
 * @desc 横方向の拡大率です。
 * 100を基準に設定してください。
 * 
 * @param ScaleY
 * @parent <PictureSetting>
 * @text 拡大率（縦）
 * @type number
 * @default 100
 * @desc 縦方向の拡大率です。
 * 100を基準に設定してください。
 * 
 * @param Opacity
 * @parent <PictureSetting>
 * @text 不透明度
 * @type number @min 0 @max 255
 * @default 255
 * @desc ピクチャの不透明度です。
 * 255で完全な不透明になります。
 * 
 * @param BlendMode
 * @parent <PictureSetting>
 * @text 合成方法
 * @type select
 * @option 0:通常 @value 0
 * @option 1:加算 @value 1
 * @option 2:乗算 @value 2
 * @option 3:スクリーン @value 3
 * @default 0
 * @desc ピクチャを描画する合成方法です。
 * 
 * @param ShowAboveWindow
 * @parent <PictureSetting>
 * @text ウィンドウより上に表示
 * @type boolean
 * @default false
 * @desc ピクチャをメッセージウィンドウより上に表示します。
 * 
 * @param ShowBelowMessages
 * @parent <PictureSetting>
 * @text 文章より下に表示
 * @type boolean
 * @default false
 * @desc 『ウィンドウより上に表示』がオンの場合に、ピクチャを文章より下に表示します。
 * 
 * @param AdjustMessageX
 * @parent ShowBelowMessages
 * @text 文章のＸ座標調整
 * @type number
 * @default 16
 * @desc 『文章より下に表示』がオンの場合に、文章のＸ座標を調整します。
 * 
 * @param AdjustMessageY
 * @parent ShowBelowMessages
 * @text 文章のＹ座標調整
 * @type number
 * @default 20
 * @desc 『文章より下に表示』がオンの場合に、文章のＹ座標を調整します。
 * 
 * @param <Control>
 * @text ＜制御＞
 * 
 * @param ControlCharacterPicture
 * @parent <Control>
 * @text ピクチャ用制御文字
 * @type string
 * @default MP
 * @desc ピクチャ表示用の制御文字です。
 * デフォルトでは、\MP[登録ID]のように使います。
 * 
 * @param ControlCharacterDifference
 * @parent <Control>
 * @text 差分用制御文字
 * @type string
 * @default MPD
 * @desc ピクチャの差分表示用の制御文字です。
 * デフォルトでは、\MPD[差分ID]のように使います。
 * 
 * @param DisableSwitch
 * @parent <Control>
 * @text ピクチャ無効スイッチ
 * @type switch
 * @desc ピクチャの表示を無効化するスイッチです。
 */
//-----------------------------------------------------------------------------
// Picture
//-----------------------------------------------------------------------------
/*~struct~Picture:ja
 * @param TargetString
 * @text 対象文字列
 * @type string
 * @desc 対象とする文字列です。
 * これが名前欄に存在する場合に画像を表示します。
 * 
 * @param ResistId
 * @text 登録ＩＤ
 * @type string
 * @desc ピクチャを手動で呼び出す場合のＩＤです。
 * \MP[登録ＩＤ]のようにして呼び出します。
 * 
 * @param Picture
 * @text ピクチャ
 * @type file
 * @dir img/pictures
 * @desc 表示のベースとなるピクチャです。
 * 
 * @param AttachedPictures
 * @text 付属ピクチャ
 * @type file[]
 * @dir img/pictures
 * @desc ピクチャの上にさらに重ねて表示されるピクチャです。
 * 
 * @param Switch
 * @text スイッチ
 * @type switch
 * @desc 表示を有効にするスイッチです。
 * 条件を満たした中で最も上の設定が表示されます。
 * 
 * @param DifferenceList
 * @text 差分リスト
 * @type struct<Difference>[]
 * @desc 立ち絵の差分の一覧です。
 * 
 * @param <PictureSetting>
 * @text ＜ピクチャ設定＞
 * 
 * @param Origin
 * @parent <PictureSetting>
 * @text 原点
 * @type select
 * @option 0:左上 @value 0
 * @option 1:中央 @value 1
 * @desc ピクチャを表示する原点です。
 * 
 * @param AdjustX
 * @parent <PictureSetting>
 * @text Ｘ座標調整
 * @type number @min -9999 @max 9999
 * @desc Ｘ座標の調整値です。
 * 
 * @param AdjustY
 * @parent <PictureSetting>
 * @text Ｙ座標調整
 * @type number @min -9999 @max 9999
 * @desc Ｙ座標の調整値です。
 * 
 * @param ScaleX
 * @parent <PictureSetting>
 * @text 拡大率（幅）
 * @type number
 * @desc 横方向の拡大率です。
 * 100を基準に設定してください。
 * 
 * @param ScaleY
 * @parent <PictureSetting>
 * @text 拡大率（縦）
 * @type number
 * @desc 縦方向の拡大率です。
 * 100を基準に設定してください。
 * 
 * @param Opacity
 * @parent <PictureSetting>
 * @text 不透明度
 * @type number @min 0 @max 255
 * @desc ピクチャの不透明度です。
 * 255で完全な不透明になります。
 * 
 * @param BlendMode
 * @parent <PictureSetting>
 * @text 合成方法
 * @type select
 * @option 0:通常 @value 0
 * @option 1:加算 @value 1
 * @option 2:乗算 @value 2
 * @option 3:スクリーン @value 3
 * @desc ピクチャを描画する合成方法です。
 */
//-----------------------------------------------------------------------------
// Difference
//-----------------------------------------------------------------------------
/*~struct~Difference:ja
 * @param DiffId
 * @text 差分ＩＤ
 * @type string
 * @desc 差分用の対象とするＩＤです。
 * \MP[登録ＩＤ]\MPD[差分ＩＤ]のようにして呼び出します。
 * 
 * @param Picture
 * @text ピクチャ
 * @type file
 * @dir img/pictures
 * @desc 表示のベースとなるピクチャです。
 * 
 * @param AttachedPictures
 * @text 付属ピクチャ
 * @type file[]
 * @dir img/pictures
 * @desc ピクチャの上にさらに重ねて表示されるピクチャです。
 * 
 * @param Switch
 * @text スイッチ
 * @type switch
 * @desc 表示を有効にするスイッチです。
 * 条件を満たした中で最も上の設定が表示されます。
 * 
 * @param Origin
 * @text 原点
 * @type select
 * @option 0:左上 @value 0
 * @option 1:中央 @value 1
 * @desc ピクチャを表示する原点です。
 * 
 * @param AdjustX
 * @text Ｘ座標調整
 * @type number @min -9999 @max 9999
 * @desc Ｘ座標の調整値です。
 * 
 * @param AdjustY
 * @text Ｙ座標調整
 * @type number @min -9999 @max 9999
 * @desc Ｙ座標の調整値です。
 * 
 * @param ScaleX
 * @text 拡大率（幅）
 * @type number
 * @desc 横方向の拡大率です。
 * 100を基準に設定してください。
 * 
 * @param ScaleY
 * @text 拡大率（縦）
 * @type number
 * @desc 縦方向の拡大率です。
 * 100を基準に設定してください。
 * 
 * @param Opacity
 * @text 不透明度
 * @type number @min 0 @max 255
 * @desc ピクチャの不透明度です。
 * 255で完全な不透明になります。
 * 
 * @param BlendMode
 * @text 合成方法
 * @type select
 * @option 0:通常 @value 0
 * @option 1:加算 @value 1
 * @option 2:乗算 @value 2
 * @option 3:スクリーン @value 3
 * @desc ピクチャを描画する合成方法です。
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

const PLUGIN_NAME = "NRP_MessagePicture";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pPictureList = parseStruct2(parameters["PictureList"]);
let pPictureId = toNumber(parameters["PictureId"]);
const pOrigin = parameters["Origin"];
const pX = parameters["X"];
const pY = parameters["Y"];
const pScaleX = parameters["ScaleX"];
const pScaleY = parameters["ScaleY"];
const pOpacity = parameters["Opacity"];
const pBlendMode = parameters["BlendMode"];
const pShowAboveWindow = toBoolean(parameters["ShowAboveWindow"]);
const pShowBelowMessages = toBoolean(parameters["ShowBelowMessages"]);
const pAdjustMessageX = toNumber(parameters["AdjustMessageX"], 0);
const pAdjustMessageY = toNumber(parameters["AdjustMessageY"], 0);
const pControlCharacterPicture = parameters["ControlCharacterPicture"].toUpperCase(); // 大文字化
const pControlCharacterDifference = parameters["ControlCharacterDifference"].toUpperCase(); // 大文字化
const pDisableSwitch = toNumber(parameters["DisableSwitch"]);

// ----------------------------------------------------------------------------
// ピクチャをウィンドウより上に表示する場合は別コンテナとなるので、
// 番号も適当に別のものを振る。
// ----------------------------------------------------------------------------

if (pShowAboveWindow) {
    pPictureId = 9999;
}

// ----------------------------------------------------------------------------
// Game_Interpreter
// ----------------------------------------------------------------------------

// ピクチャＩＤを保持（削除用）
let mPictureId = null;
// 現在表示中のピクチャデータ（差分なし）
let mPictureData = null;
// 付属ピクチャの最大数
let mMaxAttachedPictures = getMaxAttachedPictures();;

/**
 * ●付属ピクチャの最大数を取得
 */
function getMaxAttachedPictures() {
    // 付属ピクチャの最大数を取得
    let diffMax = 0;
    // 全ピクチャのリストをループし、一致する情報を取得
    for (const pictureData of pPictureList) {
        // 差分を取得
        const differenceList = parseStruct2(pictureData.DifferenceList);
        for (const diff of differenceList) {
            if (diff.AttachedPictures) {
                const attachedPictures = JSON.parse(diff.AttachedPictures);
                diffMax = Math.max(diffMax, attachedPictures.length);
            }
        }
    }
    return diffMax;
}

/**
 * ●文章の表示
 */
const _Game_Interpreter_command101 = Game_Interpreter.prototype.command101;
Game_Interpreter.prototype.command101 = function(params) {
    // 禁止スイッチがオンの場合は無効
    if (pDisableSwitch && $gameSwitches.value(pDisableSwitch)) {
        return _Game_Interpreter_command101.apply(this, arguments);
    }

    // 名前欄を取得
    const name = params[4];
    if (!name) {
        erasePicture();
        return _Game_Interpreter_command101.apply(this, arguments);
    }

    // 名前欄に一致するピクチャ設定を取得
    let pictureData = getMatchPictureData(name);
    if (!pictureData) {
        erasePicture();
        return _Game_Interpreter_command101.apply(this, arguments);
    }

    // 差分情報を反映
    pictureData = getMatchDifferenceData(name, pictureData);

    // ピクチャを表示
    showPicture(pictureData);

    // 現在表示中のピクチャデータ（差分なし）を保持
    mPictureData = pictureData;

    return _Game_Interpreter_command101.apply(this, arguments);
};

/**
 * ●ピクチャを表示する。
 */
function showPicture(pictureData) {
    // ピクチャを生成
    const pictureParams = getPictureParams(pictureData);
    // 削除用にピクチャＩＤを保持
    mPictureId = pictureParams[0];
    // 位置を取得
    const point = Game_Interpreter.prototype.picturePoint(pictureParams);

    // ピクチャの表示
    $gameScreen.showPicture(
        pictureParams[0], pictureParams[1], pictureParams[2], point.x, point.y,
        pictureParams[6], pictureParams[7], pictureParams[8], pictureParams[9]
    );

    // 付属ピクチャがあれば生成
    if (pictureData.AttachedPictures) {
        const attachedPictures = JSON.parse(pictureData.AttachedPictures);
        let pictureId = pictureParams[0];

        for (const diffPicture of attachedPictures) {
            // 追加の数だけピクチャＩＤを加算
            pictureId++;
            // 付属ピクチャの表示
            if (diffPicture) {
                $gameScreen.showPicture(
                    pictureId, diffPicture, pictureParams[2], point.x, point.y,
                    pictureParams[6], pictureParams[7], pictureParams[8], pictureParams[9]
                );
            }
        }
    }

    // リフレッシュが必要かの判定
    if (needsRefresh(mPictureData, pictureData)) {
        // Sprite_Pictureを取得
        const spriteset = getSpriteset();
        const pictureSprite = getPictureSprite(spriteset, mPictureId);
        // 画像を更新
        pictureSprite.updateBitmap();

        // 既に読込済の画像ならば描画更新
        if (pictureSprite.bitmap.isReady()) {
            pictureSprite.update();
            
        // 画像が読み込めてない場合
        } else {
            // 待機モードにする
            pictureSprite._waitMessagePicture = true;
        }
    }
}

/**
 * ●スイッチが有効かどうか？
 */
function isSwitchOk(targetSwitch) {
    // スイッチの指定がない場合は常にＯＫ
    if (!targetSwitch) {
        return true;
    }
    return $gameSwitches.value(targetSwitch);
}

/**
 * ●ピクチャスプライトを取得
 */
function getPictureSprite(spriteset, pictureId) {
    // メッセージピクチャ用のコンテナがある場合は優先
    if (spriteset._messagePictureContainer) {
        return spriteset._messagePictureContainer.children.find(p => p._pictureId == pictureId);
    }
    // それ以外は通常のコンテナから取得
    return spriteset._pictureContainer.children.find(p => p._pictureId == pictureId);
}

/**
 * ●表示中のピクチャを消去する。
 */
function erasePicture() {
    if (mPictureId) {
        $gameScreen.erasePicture(mPictureId);
        
        // 差分も削除
        for (let i = 0; i < mMaxAttachedPictures; i++) {
            $gameScreen.erasePicture(mPictureId + i + 1);
        }

        // 変数クリア
        mPictureId = null;
        mPictureData = null;
    }
}

/**
 * ●変更検知
 * ※描画更新用の調整が必要かの判定
 * 　位置や拡大率が変更された際、前の画像のまま
 * 　一瞬だけ新しい設定で描画されてしまう問題への対処。
 */
function needsRefresh(oldData, newData) {
    // データが存在しないならば処理不要
    if (!oldData) {
        return false;
    }

    // 原点、位置、拡大率、不透明度、合成方法が変更された時
    if (oldData.Origin != newData.Origin
            || oldData.AdjustX != newData.AdjustX
            || oldData.AdjustY != newData.AdjustY
            || oldData.DiffAdjustX != newData.DiffAdjustX
            || oldData.DiffAdjustY != newData.DiffAdjustY
            || oldData.ScaleX != newData.ScaleX
            || oldData.ScaleY != newData.ScaleY
            || oldData.Opacity != newData.Opacity
            || oldData.BlendMode != newData.BlendMode
            ) {
        return true;
    }
    return false;
}

/**
 * ●一致するピクチャ情報を取得する。
 */
function getMatchPictureData(name) {
    // 戻るピクチャ情報
    let retPicture = null;
    // 大文字変換
    const upperName = name.toUpperCase();
    // 変換後の名前も取得（例：\n[1]→リード）
    const convertName = convertEscapeCharacters(upperName);

    // 名前欄に指定されている登録ＩＤ
    let nameResistId = null;
    // マッチしたかどうか？
    let isMatch = false;

    // 名前欄に対する\MP[登録ＩＤ]の一致状況を取得
    const matchStrs = upperName.match(".*\\" + pControlCharacterPicture + "\\[(.*)\\].*");
    if (matchStrs) {
        // 登録ＩＤを抜き出す。
        nameResistId = matchStrs[1];
        isMatch = true;
    }

    // 全ピクチャのリストをループし、一致する情報を取得
    for (const picture of pPictureList) {
        // スイッチが有効でない場合は飛ばす
        if (!isSwitchOk(picture.Switch)) {
            continue;
        }

        // 名前欄に登録ＩＤの指定が存在した場合は優先使用
        if (isMatch) {
            // 0の場合は非表示と見なす。
            if (!nameResistId || nameResistId == "0") {
                return null;
            }

            if (picture.ResistId) {
                // 大文字変換
                const resistId = picture.ResistId.toUpperCase();
                // 名前欄に指定されているＩＤと一致
                if (nameResistId == resistId) {
                    // 一致するピクチャを返す。
                    retPicture = picture;
                    break;
                }
            }
        }

        // 名前欄で自動認識
        if (picture.TargetString) {
            // 大文字変換
            const targetString = picture.TargetString.toUpperCase();
            // 部分一致
            if (upperName.indexOf(targetString) >= 0) {
                retPicture = picture;
                break;
            // 変換後の名前欄でも確認
            } else if (convertName.indexOf(targetString) >= 0) {
                retPicture = picture;
                break;
            }
        }
    }

    // ピクチャがあった場合
    if (retPicture) {
        // 初期値を設定しておく。
        retPicture.DiffAdjustX = 0;
        retPicture.DiffAdjustY = 0;
        // ※元の値を上書きしないように{...}で複製
        return {...retPicture};
    }

    // 一致がない場合はnullを返す。
    return null;
}

/**
 * ●一致する差分情報を取得する。
 */
function getMatchDifferenceData(name, pictureData) {
    // 大文字変換
    const upperName = name.toUpperCase();

    // 名前欄に指定されている差分ＩＤ
    let nameDiffId = null;

    // 名前欄に対する\MPD[差分ＩＤ]の一致状況を取得
    const matchStrs = upperName.match(".*\\" + pControlCharacterDifference + "\\[(.*)\\].*");
    if (matchStrs) {
        // 差分ＩＤを抜き出す。
        nameDiffId = matchStrs[1];
        // さらに差分を取得
        return setDifferenceData(pictureData, nameDiffId);
    }
    // 差分なしなら、そのまま返す
    return pictureData;
}

/**
 * ●差分情報を反映する。
 */
function setDifferenceData(pictureData, setDiffId) {
    // 大文字変換しておく。
    setDiffId = setDiffId.toUpperCase();
    // 元の値は変更したくないので複製
    const newData = {...pictureData};

    // 差分を取得
    const differenceList = parseStruct2(pictureData.DifferenceList);
    for (const diff of differenceList) {
        if (diff.DiffId) {
            // 大文字変換
            const diffId = diff.DiffId.toUpperCase();
            // 名前欄に指定されているＩＤと一致
            // かつ、スイッチが有効
            if (setDiffId == diffId && isSwitchOk(diff.Switch)) {
                // 差分情報を元にピクチャデータを補正＆上書
                newData.Picture = getNewValue(pictureData.Picture, diff.Picture);
                newData.AttachedPictures = diff.AttachedPictures;
                newData.Switch = diff.Switch;
                newData.Origin = getNewValue(pictureData.Origin, diff.Origin);
                newData.ScaleX = getNewValue(pictureData.ScaleX, diff.ScaleX);
                newData.ScaleY = getNewValue(pictureData.ScaleY, diff.ScaleY);
                newData.Opacity = getNewValue(pictureData.Opacity, diff.Opacity);
                newData.BlendMode = getNewValue(pictureData.BlendMode, diff.BlendMode);
                // 調整座標だけは別計算にする。
                newData.DiffAdjustX = toNumber(diff.AdjustX, 0);
                newData.DiffAdjustY = toNumber(diff.AdjustY, 0);
                break;
            }
        }
    }

    // 加工した値を返す。
    return newData;
}

/**
 * ●ピクチャの表示に渡すパラメータを設定
 * ・params[0]：ピクチャ番号
 * ・params[1]：ファイル名
 * ・params[2]：原点
 * ・params[3]：0:直接指定 or 1:変数指定
 * ・params[4]：Ｘ座標またはＸ座標の変数
 * ・params[5]：Ｙ座標またはＹ座標の変数
 * ・params[6]：拡大率（幅）
 * ・params[7]：拡大率（高さ）
 * ・params[8]：不透明度
 * ・params[9]：合成方法
 */
function getPictureParams(data) {
    const params = [];
    params[0] = pPictureId;
    params[1] = data.Picture;
    params[2] = eval(getNewValue(pOrigin, data.Origin)); // 右側の値がある場合は優先
    params[3] = 0;
    params[4] = eval(pX) + toNumber(data.AdjustX, 0) + toNumber(data.DiffAdjustX, 0);
    params[5] = eval(pY) + toNumber(data.AdjustY, 0) + toNumber(data.DiffAdjustY, 0);
    params[6] = eval(getNewValue(pScaleX, data.ScaleX));
    params[7] = eval(getNewValue(pScaleY, data.ScaleY));
    params[8] = eval(getNewValue(pOpacity, data.Opacity));
    params[9] = eval(getNewValue(pBlendMode, data.BlendMode));
    return params;
}

/**
 * ●新しい値が存在する場合は優先する。
 */
function getNewValue(oldValue, newValue) {
    if (newValue != null && newValue != "") {
        return newValue;
    }
    return oldValue;
}

// ----------------------------------------------------------------------------
// Sprite_Picture
// ----------------------------------------------------------------------------

const _Sprite_Picture_updateBitmap = Sprite_Picture.prototype.updateBitmap;
Sprite_Picture.prototype.updateBitmap = function() {
    // 画像が読み込めるまで描画停止
    if (this._waitMessagePicture) {
        if (this.bitmap.isReady()) {
            this._waitMessagePicture = false;
        } else {
            this.visible = false;
            return;
        }
    }

    _Sprite_Picture_updateBitmap.apply(this, arguments);
};

// ----------------------------------------------------------------------------
// Window_Base
// ----------------------------------------------------------------------------

/**
 * ●制御文字（一つずつの処理）
 */
const _Window_Base_processEscapeCharacter = Window_Base.prototype.processEscapeCharacter;
Window_Base.prototype.processEscapeCharacter = function(code, textState) {
    let id;
    switch (code) {
        case pControlCharacterPicture:
            id = obtainEscapeParamEx(textState);
            break;
        case pControlCharacterDifference:
            id = obtainEscapeParamEx(textState);

            // 名前欄の場合は既に処理済なので終了
            if (this instanceof Window_NameBox) {
                return;
            }

            if (mPictureData) {
                // 差分を反映
                const pictureData = setDifferenceData(mPictureData, id);
                // ピクチャを表示
                showPicture(pictureData);
            }

            break;
        default:
            _Window_Base_processEscapeCharacter.apply(this, arguments);
            break;
    }
};

/**
 * ●パラメータの中身を入手
 */
function obtainEscapeParamEx(textState) {
    // const regExp = /^\[\d+\]/;
    const regExp = /^\[\w+\]/; // 文字列もＯＫとなるように修正

    const arr = regExp.exec(textState.text.slice(textState.index));
    if (arr) {
        textState.index += arr[0].length;
        return arr[0].slice(1).replace("]", "");
        // return parseInt(arr[0].slice(1));
    } else {
        return "";
    }
};

// ----------------------------------------------------------------------------
// Window_Message
// ----------------------------------------------------------------------------

/**
 * ●メッセージを閉じる際の確認
 * ※terminateMessageはウィンドウを閉じない場合でも、
 * 　毎回呼び出されるっぽいのでこちらに実装
 */
const _Window_Message_checkToNotClose = Window_Message.prototype.checkToNotClose;
Window_Message.prototype.checkToNotClose = function() {
    // isOpenからisClosingに転じたタイミングで処理
    if (this.isOpen()) {
        _Window_Message_checkToNotClose.apply(this, arguments);
        // 表示するメッセージがないなら、メッセージ終了と判断してピクチャを削除
        if (this.isClosing() && !$gameMessage.hasText()) {
            erasePicture();
        }
        return;
    }

    _Window_Message_checkToNotClose.apply(this, arguments);
};

// ----------------------------------------------------------------------------
// Window_NameBox
// ----------------------------------------------------------------------------

/**
 * ●ウィンドウの横幅設定
 * ※当プラグインにより、名前欄に非表示の制御文字だけを入力する可能性が発生する。
 * 　その場合に、名前欄が表示されないようにするための処置。
 */
const _Window_NameBox_windowWidth = Window_NameBox.prototype.windowWidth;
Window_NameBox.prototype.windowWidth = function() {
    // 実際の表示サイズが0なら非表示
    if (this._name && this.textSizeEx(this._name).width == 0) {
        return 0;
    }
    return _Window_NameBox_windowWidth.apply(this, arguments);
};

// ----------------------------------------------------------------------------
// Game_Screen
// ----------------------------------------------------------------------------

/**
 * ●ウィンドウより上に表示がオンの場合は、
 * 　独立したコンテナを使うため拡張しない。
 */
if (!pShowAboveWindow) {
    /**
     * ●ピクチャの最大値
     */
    const _Game_Screen_maxPictures = Game_Screen.prototype.maxPictures;
    Game_Screen.prototype.maxPictures = function() {
        // 101以上のピクチャを使う場合は領域を増やしておく。
        return Math.max(pPictureId + mMaxAttachedPictures, _Game_Screen_maxPictures.apply(this, arguments));
    };
}

// ----------------------------------------------------------------------------
// ピクチャをウィンドウより上に表示
// ----------------------------------------------------------------------------

if (pShowAboveWindow) {
    const _Scene_Base_createWindowLayer = Scene_Base.prototype.createWindowLayer;
    Scene_Base.prototype.createWindowLayer = function() {
        _Scene_Base_createWindowLayer.apply(this, arguments);

        // シーン直下にメッセージ用コンテナを追加
        if (this._spriteset) {
            this.addChild(this._spriteset._messagePictureContainer);
        }
    };

    const _Spriteset_Base_createPictures = Spriteset_Base.prototype.createPictures;
    Spriteset_Base.prototype.createPictures = function() {
        _Spriteset_Base_createPictures.apply(this, arguments);

        const rect = this.pictureContainerRect();
        this._messagePictureContainer = new Sprite();
        this._messagePictureContainer.setFrame(rect.x, rect.y, rect.width, rect.height);
        this._messagePictureContainer.addChild(new Sprite_Picture(pPictureId));

        // 自動的に差分の最大数を取得して拡張
        for (let i = 0; i < mMaxAttachedPictures; i++) {
            this._messagePictureContainer.addChild(new Sprite_Picture(pPictureId + i + 1));
        }
    };
}

// ----------------------------------------------------------------------------
// メッセージをピクチャより下に表示
// ----------------------------------------------------------------------------

if (pShowBelowMessages) {
    /**
     * ●ウィンドウ生成
     */
    const _Scene_Message_createMessageWindow = Scene_Message.prototype.createMessageWindow;
    Scene_Message.prototype.createMessageWindow = function() {
        _Scene_Message_createMessageWindow.apply(this, arguments);

        // メッセージ用のスプライトをシーン直下に追加
        this.addChild(this._messageWindow._contentsSprite);
    };

    /**
     * ●配置更新
     */
    const _Window_Message_updatePlacement = Window_Message.prototype.updatePlacement;
    Window_Message.prototype.updatePlacement = function() {
        _Window_Message_updatePlacement.apply(this, arguments);

        // メッセージ用スプライトも移動
        this._contentsSprite.x = this.x + pAdjustMessageX;
        this._contentsSprite.y = this.y + pAdjustMessageY;
    };

    /*
    * Window_Message.prototype.closeが未定義の場合は事前に定義
    * ※これをしておかないと以後のWindow_Base側への追記が反映されない。
    */
    if (Window_Message.prototype.close == Window_Base.prototype.close) {
        Window_Message.prototype.close = function() {
            Window_Base.prototype.close.apply(this, arguments);
        }
    }

    /**
     * ●ウィンドウを閉じる。
     */
    const _Window_Message_close = Window_Message.prototype.close;
    Window_Message.prototype.close = function() {
        _Window_Message_close.apply(this, arguments);

        // メッセージ用スプライトもクリア。
        this.contents.clear();
    };
}

// ----------------------------------------------------------------------------
// 共通関数
// ----------------------------------------------------------------------------

/**
 * ●Window_Baseの関数を切り離し
 */
function convertEscapeCharacters(originalText) {
    let tmpText = originalText;
    /* eslint no-control-regex: 0 */
    tmpText = tmpText.replace(/\\/g, "\x1b");
    tmpText = tmpText.replace(/\x1b\x1b/g, "\\");
    tmpText = tmpText.replace(/\x1bV\[(\d+)\]/gi, (_, p1) =>
        $gameVariables.value(parseInt(p1))
    );
    tmpText = tmpText.replace(/\x1bV\[(\d+)\]/gi, (_, p1) =>
        $gameVariables.value(parseInt(p1))
    );
    tmpText = tmpText.replace(/\x1bN\[(\d+)\]/gi, (_, p1) =>
        actorName(parseInt(p1))
    );
    tmpText = tmpText.replace(/\x1bP\[(\d+)\]/gi, (_, p1) =>
        partyMemberName(parseInt(p1))
    );
    tmpText = tmpText.replace(/\x1bG/gi, TextManager.currencyUnit);
    return tmpText;
}

/**
 * ●Window_Baseの関数を切り離し
 */
function actorName(n) {
    const actor = n >= 1 ? $gameActors.actor(n) : null;
    return actor ? actor.name() : "";
};

/**
 * ●Window_Baseの関数を切り離し
 */
function partyMemberName(n) {
    const actor = n >= 1 ? $gameParty.members()[n - 1] : null;
    return actor ? actor.name() : "";
};

/**
 * ●現在の画面のSpritesetを取得する。
 */
function getSpriteset() {
    return SceneManager._scene._spriteset;
}

})();
