﻿//=============================================================================
// NRP_VisualTurn.js
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc v2.041 The order of actions is displayed on the battle screen.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/472840225.html
 *
 * @help This plugin performs the same screen display process as CTB and CTTB.
 * Be sure to place this plugin below the plugins that control those turns.
 *
 * -------------------------------------------------------------------
 * [Note (Actor, Enemy)]
 * -------------------------------------------------------------------
 * You can specify individual images
 * by writing the following in the actor and enemy's note.
 * 
 * <CtbFace:[FileName],[Index],[SwitchNo]>
 * <CtbCharacter:[FileName],[Index],[SwitchNo]>
 * <CtbSvActor:[FileName],[SwitchNo]>
 * <CtbPicture:[FileName],[SwitchNo]>
 * <CtbEnemy:[FileName],[SwitchNo]>
 *
 * If the specified switch is ON,
 * it will take precedence over the plugin parameter specification.
 * Note that, as usual, the index starts at 0.
 * Note that the switch number can be omitted.
 * If it is omitted, the switch number is displayed from the beginning.
 * 
 * <CtbPicture:boss>
 * Displays the images in the "pictures/boss.png" file.
 * When you want to change the display only for boss enemies.
 * This is probably the most orthodox usage.
 * 
 * <CtbFace:Monster,2>
 * Display the third image in "faces/Monster.png".
 *
 * <CtbCharacter:Monster,5,10>
 * The sixth image in "characters/Monster.png"
 * will be displayed when switch No. 10 is ON.
 *
 * You can specify multiple settings if you want
 * to change the display of the actor many times as the story progresses.
 *
 * <CtbPicture:aaa>
 * <CtbPicture1:bbb,11>
 * <CtbPicture2:ccc,12>
 *
 * Sequential numbering as shown above.
 * In the example above, when switch 11 is turned on,
 * the display changes to image bbb,
 * and when switch 12 is turned on, it changes to image ccc.
 * The order of up and down is not important,
 * but the one with the larger number has priority.
 * Note that the order is unmarked -> 1 -> 2...
 * If you make a mistake, it will not work.
 *
 * ◆Adjust image crop position
 * You can adjust the crop position of the image
 * by the specified value by doing the following.
 * For example, if a face is misaligned and does not fit
 * in the image, you can use this function.
 * 
 * <CtbCutAdjustX:10>
 * <CtbCutAdjustY:10>
 * 
 * -------------------------------------------------------------------
 * [Note (Skill, Item)]
 * -------------------------------------------------------------------
 * The following can be specified in the notes for skills and items.
 * 
 * <CtbHide>
 *
 * Temporarily hides the action order window
 * when activating a skill (item).
 * This is useful when you want to create an effect
 * that covers the entire screen.
 * 
 * -------------------------------------------------------------------
 * [Note (State)]
 * -------------------------------------------------------------------
 * You can change the color of the symbol image in a state
 * by specifying the following in the note field of the state
 * Intended for applications
 * such as visualization of action constraint states.
 * ※However, "useSprite" must be turned on.
 * 
 * For states whose "Auto-removal Timing" is "Action End",
 * the timing of the end of the state is also taken into account.
 * ※"Turn End" is not supported.
 * 
 * <CtbBlendColor:[255,255,255,255]>
 * Blends color into the symbol image.
 * 0~255 are valid values.
 * Set in the order of Red, Green, Blue, Strength.
 * 
 * <CtbColorTone:[255,255,255,255]>
 * Changes the color tone of the symbol image.
 * The calculation method is different from <CtbBlendColor>.
 * Also, values from -255~255 are valid here.
 * 
 * -------------------------------------------------------------------
 * For more information, please see below.
 * http://newrpg.seesaa.net/article/472840225.html
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
 * @ [Plugin Parameters]
 * @------------------------------------------------------------------
 * 
 * @param <Window>
 *
 * @param dispNumber
 * @parent <Window>
 * @type number
 * @desc The number of battler to be displayed in the order. If not specified, the value of the plugin that provides turn control is used.
 * 
 * @param horizon
 * @text horizontal window
 * @parent <Window>
 * @type select
 * @option 0:Vertical @value 0
 * @option 1:Horizontal @value 1
 * @default 0
 * @desc Changes the display direction of the action order window.
 * 0:vertical 1:horizontal
 *
 * @param adjustX
 * @parent <Window>
 * @type text
 * @default Graphics.boxWidth - this.width
 * @desc Move the action order window to the right.
 * "Graphics.boxWidth - this.width" can be used to align it to the right.
 *
 * @param adjustY
 * @parent <Window>
 * @type text
 * @default 0
 * @desc Move the action order window to the bottom. "Graphics.boxHeight - this._statusWindow.height - this.height" can be used to align it to the bottom.
 *
 * @param windowPadding
 * @parent <Window>
 * @type number
 * @desc Action order window margins. Default = 18.
 *
 * @param windowOpacity
 * @parent <Window>
 * @type number
 * @default 255
 * @desc The opacity of the window.
 * 0 for transparent, 255 for opaque.
 *
 * @param windowDark
 * @parent <Window>
 * @type select
 * @option 0:Normal @value 0
 * @option 1:Dark @value 1
 * @default 0
 * @desc If 1, darken the window.
 *
 * @param windowBackImage
 * @parent <Window>
 * @type file
 * @dir img/pictures
 * @desc You can specify a picture as the background of the window.
 * This can be combined with window transparency.
 *
 * @param <Symbol Image>
 *
 * @param graphicMode
 * @parent <Symbol Image>
 * @type select
 * @option 0:Name @value 0
 * @option 1:Face @value 1
 * @option 2:Character @value 2
 * @option 3:SV Battler @value 3
 * @default 1
 * @desc Graphic display mode.
 * 0:Name, 1:Face, 2:Character, 3:SV Battler
 *
 * @param width
 * @parent <Symbol Image>
 * @type number
 * @default 100
 * @desc The width to display the symbol image.
 *
 * @param height
 * @parent <Symbol Image>
 * @type number
 * @default 32
 * @desc The height to display the symbol image.
 *
 * @param zoom
 * @parent <Symbol Image>
 * @type number
 * @default 100
 * @desc Magnification of the symbol image.
 * Set it to 100 as the standard.
 *
 * @param characterDirection
 * @parent <Symbol Image>
 * @type select
 * @default down
 * @option @value down
 * @option @value left
 * @option @value right
 * @option @value up
 * @desc Direction for displaying the character image.
 * It is meaningless in any mode other than character display.
 *
 * @param actorBackImage
 * @parent <Symbol Image>
 * @type file
 * @dir img/pictures
 * @desc Specify a picture as a background for each actor.
 *
 * @param selectedHighlightType
 * @parent <Symbol Image>
 * @type select
 * @default image
 * @option @value image
 * @option @value square
 * @desc How to highlight the symbol in the target selection.
 * Whitewash the image or cover it with a white rectangle.
 * 
 * @param cutAdjustX
 * @parent <Symbol Image>
 * @type number @min -999 @max 999
 * @desc Adjust the X coordinate to crop the image.
 *
 * @param cutAdjustY
 * @parent <Symbol Image>
 * @type number @min -999 @max 999
 * @desc Adjust the Y coordinate to crop the image.
 * 
 * @param useSprite
 * @parent <Symbol Image>
 * @type boolean
 * @default false
 * @desc Changes the display method of the image to a sprite.
 * The window will no longer be displayed.
 * 
 * @param actorMaskImage
 * @parent useSprite
 * @type file
 * @dir img/pictures
 * @desc Mask image to hide the symbol.
 * 
 * @param intervalX
 * @parent useSprite
 * @type number
 * @desc The horizontal spacing between images.
 * If omitted, the width of the image is used as is.
 * 
 * @param intervalY
 * @parent useSprite
 * @type number
 * @desc The vertical spacing between images.
 * If omitted, the height of the image is used as is.
 * 
 * @param symbolAdjustX
 * @parent useSprite
 * @type string
 * @desc Adjusts X of the image. Formula is possible.
 * e.g.: index == 0 ? -50 : 0
 *
 * @param symbolAdjustY
 * @parent useSprite
 * @type string
 * @desc Adjusts Y of the image. Formula is possible.
 * e.g.: index == 0 ? -50 : 0
 * 
 * @param imageShiftX
 * @parent useSprite
 * @type string
 * @desc Shifts the X of the image. Formula is possible.
 * e.g.: a.isActor() ? 20 : -20
 * 
 * @param imageShiftY
 * @parent useSprite
 * @type string
 * @desc Shifts the Y of the image. Formula is possible.
 * e.g.: a.isActor() ? 20 : -20
 * 
 * @param adjustZoom
 * @parent useSprite
 * @type string
 * @default 100
 * @desc Correct scale. Formula is possible.
 * e.g.: index == 0 ? 100 : 50
 * 
 * @param <Enemy Symbol Image>
 *
 * @param enemyGraphicMode
 * @parent <Enemy Symbol Image>
 * @type select
 * @option None @value
 * @option 0:Name @value 0
 * @option 1:Face @value 1
 * @option 2:Character @value 2
 * @option 3:SV Battler @value 3
 * @option 4:Picture @value 4
 * @option 5:Enemy @value 5
 * @desc Enemy graphic mode, same as Actors when played with None.
 *
 * @param enemyZoom
 * @parent <Enemy Symbol Image>
 * @type number
 * @desc Magnification of the symbol image. Set it to 100 as the standard. When omitted, same as Actor.
 * 
 * @param enemyFileName
 * @parent <Enemy Symbol Image>
 * @type string
 * @default Monster
 * @desc Default file name of the enemy symbol. The target folder depends on the graphic mode. If not specified, it is "Monster".
 *
 * @param enemyFileIndex
 * @parent <Enemy Symbol Image>
 * @type number
 * @default 6
 * @desc Specify the index of the image specified by enemyFileName.
 * Note that this starts at 0. If you don't specify it, it's 6.
 *
 * @param enemyBackImage
 * @parent <Enemy Symbol Image>
 * @type file
 * @dir img/pictures
 * @desc Specify a picture for the background of each enemy.
 * 
 * @param enemyCutAdjustX
 * @parent <Enemy Symbol Image>
 * @type number @min -999 @max 999
 * @desc Adjust the X coordinate to crop the enemy image.
 * When omitted, same as Actor.
 *
 * @param enemyCutAdjustY
 * @parent <Enemy Symbol Image>
 * @type number @min -999 @max 999
 * @desc Adjust the Y coordinate to crop the enemy image.
 * When omitted, same as Actor.
 * 
 * @param enemyMaskImage
 * @parent <Enemy Symbol Image>
 * @type file
 * @dir img/pictures
 * @desc Mask image to hide the symbol.
 * When omitted, same as Actor.
 * 
 * @param <Enemy Visual ID>
 * 
 * @param useVisualId
 * @parent <Enemy Visual ID>
 * @type boolean
 * @default false
 * @desc Displays the identifier(A,B,C..) above the enemy symbol.
 * Also, Change the notation on the enemy selection window.
 * 
 * @param visualIdSize
 * @parent <Enemy Visual ID>
 * @type number
 * @default 28
 * @desc The font size of the identifier.
 * If not specified, it is 28.
 * 
 * @param visualIdColor
 * @parent <Enemy Visual ID>
 * @type number
 * @default 0
 * @desc The number of the character color used for the identifier.
 * The number corresponds to the system image.
 * 
 * @param visualIdArray
 * @parent <Enemy Visual ID>
 * @type text
 * @default ABCDEFGHIJKLMNOPQRSTUVWXYZ
 * @desc An array of identifiers to use.
 *
 * @param visualIdAdjustX
 * @parent <Enemy Visual ID>
 * @type number
 * @desc Adjust the X coordinate of the identifier.
 *
 * @param visualIdAdjustY
 * @parent <Enemy Visual ID>
 * @type number
 * @desc Adjust the Y coordinate of the identifier.
 * 
 * @param <DisplayEachWindow>
 *
 * @param overlapWindows
 * @parent <DisplayEachWindow>
 * @type boolean
 * @default true
 * @desc When windows overlap, the display is superimposed by translucent processing.
 * 
 * @param autoHidden
 * @parent <DisplayEachWindow>
 * @type boolean
 * @default false
 * @desc If true, it will automatically hide the action order when executing the action.
 * 
 * @param displayForSkillSelect
 * @text Order displayed selecting skills
 * @parent <DisplayEachWindow>
 * @type boolean
 * @default true
 * @desc The order of actions is also displayed when selecting skills (items). If off, hide it.
 * 
 * @param keepCommandWindow
 * @parent <DisplayEachWindow>
 * @type boolean
 * @default true
 * @desc Doesn't hide the command window after the input is completed.
 * If you don't want the window at the bottom of the screen to be busy.
 * 
 * @param hideTargetingHelp
 * @text [MZ]hideTargetingHelp
 * @parent <DisplayEachWindow>
 * @type boolean
 * @default true
 * @desc Hides the help when the target is selected.
 * This is the standard specification in MV.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v2.041 行動順序を戦闘画面へ表示します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/472840225.html
 *
 * @help CTBやCTTBに共通した画面表示処理を行います。
 * このプラグインは必ずターン制御を行うプラグインよりも下に配置してください。
 *
 * -------------------------------------------------------------------
 * ■メモ欄（アクター、敵キャラ）
 * -------------------------------------------------------------------
 * アクター、敵キャラのメモ欄に以下を記述すれば、
 * 画像の個別指定が可能です。
 * 
 * <CtbFace:[ファイル名],[インデックス],[スイッチ番号]>
 * <CtbCharacter:[ファイル名],[インデックス],[スイッチ番号]>
 * <CtbSvActor:[ファイル名],[スイッチ番号]>
 * <CtbPicture:[ファイル名],[スイッチ番号]>
 * <CtbEnemy:[ファイル名],[スイッチ番号]>
 *
 * 指定したスイッチがONの場合、
 * プラグインパラメータの指定よりも優先して表示されます。
 * 例によって、インデックスは0始まりなので注意です。
 * なお、スイッチ番号は省略可能です。
 * 省略した場合は最初から表示されます。
 * 
 * <CtbPicture:boss>
 * pictures/bossファイルの画像を表示します。
 * ボス敵だけ表示を変更したい場合など。
 * たぶんこれが一番オーソドックスな使い方です。
 * 
 * <CtbFace:Monster,2>
 * faces/Monsterの３番目の画像を表示します。
 *
 * <CtbCharacter:Monster,5,10>
 * characters/Monsterの６番目の画像を、スイッチ１０番がONの時に表示します。
 *
 * 物語の進行によって、アクターの表示を
 * 何度も変えたいような場合は複数指定も可能です。
 *
 * <CtbPicture:aaa>
 * <CtbPicture1:bbb,11>
 * <CtbPicture2:ccc,12>
 *
 * というように連番をつけます。
 * 上の例だとスイッチ11番がONの時に、画像bbbに表示が変更、
 * さらに12番がONの時に画像cccに変更されます。
 * 上下の順番は問いませんが、番号が大きいほうが優先されます。
 * 無印→1→2...という順番であることに注意してください。
 * 間違えると機能しません。
 * 
 * ◆画像の切り取り位置を補正
 * 以下のようにすれば、指定した数値分だけ画像の切り取り位置を調整できます。
 * 顔の位置がズレていて収まらないといった場合に活用してください。
 * 
 * <CtbCutAdjustX:10>
 * <CtbCutAdjustY:10>
 *
 * -------------------------------------------------------------------
 * ■メモ欄（スキル、アイテム）
 * -------------------------------------------------------------------
 * スキル、アイテムのメモ欄に以下を指定可能です。
 * 
 * <CtbHide>
 *
 * スキル（アイテム）発動時、行動順序ウィンドウを一時的に隠します。
 * 画面全体にかかるような演出を行いたい場合など。
 *
 * -------------------------------------------------------------------
 * ■メモ欄（ステート）
 * -------------------------------------------------------------------
 * ステートのメモ欄に以下を指定すれば、
 * そのステート中のシンボル画像の色を変更できます。
 * 行動停止系ステートの視覚化などの用途を想定しています。
 * ※ただし、『スプライト表示』がオンである必要があります。
 * 
 * 自動解除のタイミングが『行動終了時』のステートについては、
 * ステートが終了するタイミングも考慮して表示します。
 * ※『ターン終了時』については対応していません。
 * 
 * <CtbBlendColor:[255,255,255,255]>
 * 画像に色を合成します。0~255までの数値が有効です。
 * 赤、緑、青、強さの順で設定してください。
 * 
 * <CtbColorTone:[255,255,255,255]>
 * 画像の色調を変更します。
 * <CtbBlendColor>とは計算方法が異なります。
 * また、こちらは-255~255までの数値が有効です。
 * 
 * -------------------------------------------------------------------
 * その他、細かい仕様については、以下をご覧ください。
 * http://newrpg.seesaa.net/article/472840225.html
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
 * @param <Window>
 * @text ＜ウィンドウ関連＞
 * @desc 見出しです。
 *
 * @param dispNumber
 * @text 表示人数
 * @parent <Window>
 * @type number
 * @desc 順序表示を行う人数。
 * 指定がない場合、連携元プラグインの値を使用します。
 * 
 * @param horizon
 * @text ウィンドウの表示方向
 * @parent <Window>
 * @type select
 * @option 0:縦長 @value 0
 * @option 1:横長 @value 1
 * @default 0
 * @desc 行動順序の表示方向を切り替えます。
 * 0:縦長ウィンドウ、1:横長ウィンドウ
 *
 * @param adjustX
 * @text 横位置調整
 * @parent <Window>
 * @type text
 * @default Graphics.boxWidth - this.width
 * @desc 行動順序ウィンドウの位置を右方向に移動します。
 * "Graphics.boxWidth - this.width"で右寄せにできます。
 *
 * @param adjustY
 * @text 縦位置調整
 * @parent <Window>
 * @type text
 * @default 0
 * @desc 行動順序ウィンドウを下へ移動します。"Graphics.boxHeight - this._statusWindow.height - this.height"で下寄せ可。
 *
 * @param windowPadding
 * @text ウィンドウの余白
 * @parent <Window>
 * @type number
 * @desc 行動順序ウィンドウの余白を指定します。初期値=18。
 *
 * @param windowOpacity
 * @text 不透明度
 * @parent <Window>
 * @type number
 * @default 255
 * @desc 枠の不透明度です。
 * 0で透明、255で不透明。
 *
 * @param windowDark
 * @text 暗くするか？
 * @parent <Window>
 * @type select
 * @option 0:通常 @value 0
 * @option 1:暗くする @value 1
 * @default 0
 * @desc 1ならばウィンドウを暗くします。
 *
 * @param windowBackImage
 * @text 背景画像
 * @parent <Window>
 * @type file
 * @dir img/pictures
 * @desc ウィンドウの上に背景となるピクチャーを指定します。
 * 例えばウィンドウ透明化と組み合わせて独自の枠を作れます。
 *
 * @param <Symbol Image>
 * @text ＜画像関連＞
 * @desc 見出しです。
 *
 * @param graphicMode
 * @text 画像表示モード
 * @parent <Symbol Image>
 * @type select
 * @option 0:名前表示 @value 0
 * @option 1:顔グラ表示 @value 1
 * @option 2:キャラグラ表示 @value 2
 * @option 3:SV戦闘キャラ表示 @value 3
 * @default 1
 * @desc 画像表示モードです。0:名前表示、1:顔グラ表示、2:キャラグラ表示、3:SV戦闘キャラ。
 * 
 * @param width
 * @text 横幅
 * @parent <Symbol Image>
 * @type number
 * @default 100
 * @desc シンボル画像の表示横幅です。指定なしなら100。
 *
 * @param height
 * @text 縦幅
 * @parent <Symbol Image>
 * @type number
 * @default 32
 * @desc シンボル画像の表示縦幅です。指定なしなら32。
 *
 * @param zoom
 * @text 表示倍率
 * @parent <Symbol Image>
 * @type number
 * @default 100
 * @desc シンボル画像の拡大率です。
 * 100を基準に設定してください。
 *
 * @param characterDirection
 * @text キャラグラの向き
 * @parent <Symbol Image>
 * @type select
 * @default down
 * @option 下 @value down
 * @option 左 @value left
 * @option 右 @value right
 * @option 上 @value up
 * @desc キャラグラ表示の場合の向きです。
 * キャラグラ表示以外のモードでは無意味です。
 *
 * @param actorBackImage
 * @text 背景画像
 * @parent <Symbol Image>
 * @type file
 * @dir img/pictures
 * @desc 味方個別の背景となるピクチャーを指定します。
 * 
 * @param selectedHighlightType
 * @text 選択対象の強調方法
 * @parent <Symbol Image>
 * @type select
 * @default image
 * @option 画像 @value image
 * @option 四角 @value square
 * @desc 対象選択中のシンボルを強調する方法です。
 * 画像を白色表示するか白い四角形をかぶせるか？
 * 
 * @param cutAdjustX
 * @text 画像切取Ｘ座標補正
 * @parent <Symbol Image>
 * @type number @min -999 @max 999
 * @desc シンボル画像を切り取るＸ座標を補正します。
 *
 * @param cutAdjustY
 * @text 画像切取Ｙ座標補正
 * @parent <Symbol Image>
 * @type number @min -999 @max 999
 * @desc シンボル画像を切り取るＹ座標を補正します。
 * 
 * @param useSprite
 * @text スプライト表示
 * @parent <Symbol Image>
 * @type boolean
 * @default false
 * @desc 画像の表示方法をスプライトに変更します。
 * ウィンドウは表示されなくなります。
 * 
 * @param actorMaskImage
 * @parent useSprite
 * @text マスク画像
 * @type file
 * @dir img/pictures
 * @desc シンボルを隠すためのマスク画像です。
 * 
 * @param intervalX
 * @text 画像の横間隔
 * @parent useSprite
 * @type number
 * @desc シンボル画像同士の横の間隔です。
 * 省略時は画像の横幅をそのまま使います。
 * 
 * @param intervalY
 * @text 画像の縦間隔
 * @parent useSprite
 * @type number
 * @desc シンボル画像同士の縦の間隔です。
 * 省略時は画像の縦幅をそのまま使います。
 * 
 * @param symbolAdjustX
 * @text Ｘ座標補正
 * @parent useSprite
 * @type string
 * @desc シンボル画像のＸ座標を補正します。数式可
 * 例：index == 0 ? -50 : 0
 *
 * @param symbolAdjustY
 * @text Ｙ座標補正
 * @parent useSprite
 * @type string
 * @desc シンボル画像のＹ座標を補正します。数式可
 * 例：index == 0 ? -50 : 0
 * 
 * @param imageShiftX
 * @text 画像Ｘ座標シフト
 * @parent useSprite
 * @type string
 * @desc シンボル画像のＸ座標をシフトします。数式可
 * 例：a.isActor() ? 20 : -20
 * 
 * @param imageShiftY
 * @text 画像Ｙ座標シフト
 * @parent useSprite
 * @type string
 * @desc シンボル画像のＹ座標をシフトします。数式可
 * 例：a.isActor() ? 20 : -20
 * 
 * @param adjustZoom
 * @text 表示倍率補正
 * @parent useSprite
 * @type string
 * @default 100
 * @desc 拡大率を補正（背景画像含む）します。数式可。
 * 例：index == 0 ? 100 : 50
 * 
 * @param <Enemy Symbol Image>
 * @text ＜敵の画像関連＞
 * @desc 見出しです。
 *
 * @param enemyGraphicMode
 * @text 画像表示モード
 * @parent <Enemy Symbol Image>
 * @type select
 * @option 指定なし @value
 * @option 0:名前表示 @value 0
 * @option 1:顔グラ表示 @value 1
 * @option 2:キャラグラ表示 @value 2
 * @option 3:SV戦闘キャラ表示 @value 3
 * @option 4:ピクチャ表示 @value 4
 * @option 5:敵キャラ表示 @value 5
 * @desc 敵の画像表示方法。0:名前,1:顔グラ,2:キャラグラ,3:SV戦闘キャラ,4:ピクチャ,5:敵キャラ。指定なしなら味方と同じ。
 *
 * @param enemyZoom
 * @text 表示倍率
 * @parent <Enemy Symbol Image>
 * @type number
 * @desc シンボル画像の拡大率です。
 * 100を基準に設定してください。指定なしなら味方と同じ。
 * 
 * @param enemyFileName
 * @text 画像ファイル
 * @parent <Enemy Symbol Image>
 * @type string
 * @default Monster
 * @desc 敵シンボルのデフォルトファイル名。
 * 対象フォルダは表示モードに依存。指定なしなら"Monster"。
 *
 * @param enemyFileIndex
 * @text 画像のインデックス
 * @parent <Enemy Symbol Image>
 * @type number
 * @default 6
 * @desc enemyFileNameで指定した画像のインデックスを指定する。
 * 顔グラ・キャラグラ以外は不要。0始まり注意。指定なしなら6。
 *
 * @param enemyBackImage
 * @text 背景画像
 * @parent <Enemy Symbol Image>
 * @type file
 * @dir img/pictures
 * @desc 敵個別の背景となるピクチャーを指定します。
 * 
 * @param enemyCutAdjustX
 * @text 画像切取Ｘ座標補正
 * @parent <Enemy Symbol Image>
 * @type number @min -999 @max 999
 * @desc シンボルの画像を切り取るＸ座標を補正します。
 * 省略時はアクターと同じ。
 *
 * @param enemyCutAdjustY
 * @text 画像切取Ｙ座標補正
 * @parent <Enemy Symbol Image>
 * @type number @min -999 @max 999
 * @desc シンボルの画像を切り取るＹ座標を補正します。
 * 省略時はアクターと同じ。
 * 
 * @param enemyMaskImage
 * @parent <Enemy Symbol Image>
 * @text マスク画像
 * @type file
 * @dir img/pictures
 * @desc シンボルを隠すためのマスク画像です。
 * 省略時はアクターと同じ。
 * 
 * @param <Enemy Visual ID>
 * @text ＜敵の識別子関連＞
 * @desc 見出しです。
 * 
 * @param useVisualId
 * @text 識別子を表示
 * @parent <Enemy Visual ID>
 * @type boolean
 * @default false
 * @desc 敵シンボルの右下に識別子(A,B,C..)を表示します
 * また、敵選択ウィンドウの表記を併せて変更します。
 * 
 * @param visualIdSize
 * @text 識別子のサイズ
 * @parent <Enemy Visual ID>
 * @type number
 * @default 28
 * @desc 識別子のフォントサイズです。
 * 未指定の場合は28となります。
 * 
 * @param visualIdColor
 * @text 識別子の色
 * @parent <Enemy Visual ID>
 * @type number
 * @default 0
 * @desc 識別子に用いる文字色の番号です。
 * 番号はシステム画像に対応します。
 * 
 * @param visualIdArray
 * @text 識別子の配列
 * @parent <Enemy Visual ID>
 * @type text
 * @default ABCDEFGHIJKLMNOPQRSTUVWXYZ
 * @desc 使用する識別子の配列です。
 *
 * @param visualIdAdjustX
 * @text Ｘ座標補正
 * @parent <Enemy Visual ID>
 * @type number @min -999 @max 999
 * @desc 識別子のＸ座標を補正します。
 *
 * @param visualIdAdjustY
 * @text Ｙ座標補正
 * @parent <Enemy Visual ID>
 * @type number @min -999 @max 999
 * @desc 識別子のＹ座標を補正します。
 * 
 * @param <DisplayEachWindow>
 * @text ＜各ウィンドウの表示＞
 * @desc 見出しです。
 *
 * @param overlapWindows
 * @text ウィンドウを重ねて表示
 * @parent <DisplayEachWindow>
 * @type boolean
 * @default true
 * @desc ウィンドウが重なった場合、半透明処理によって表示を重ねるようにします。
 * 
 * @param autoHidden
 * @text 行動時に順序を隠す
 * @parent <DisplayEachWindow>
 * @type boolean
 * @default false
 * @desc trueならば行動実行時、自動的に行動順序を隠します。
 * メッセージとかぶって邪魔な場合などに。
 * 
 * @param displayForSkillSelect
 * @text スキル選択時も順序表示
 * @parent <DisplayEachWindow>
 * @type boolean
 * @default true
 * @desc スキル（アイテム）選択時も行動順序を表示します。
 * オフなら非表示にします。
 * 
 * @param keepCommandWindow
 * @text コマンドを隠さない
 * @parent <DisplayEachWindow>
 * @type boolean
 * @default true
 * @desc 入力完了後にコマンドウィンドウを隠しません。
 * 画面下のウィンドウがせわしないのは嫌だという場合に。
 * 
 * @param hideTargetingHelp
 * @text [MZ]対象選択時ヘルプ消去
 * @parent <DisplayEachWindow>
 * @type boolean
 * @default true
 * @desc 対象選択時にヘルプを隠します。
 * ＭＶでは標準で隠れる仕様です。
 */

(function() {
"use strict";

function toNumber(str, def) {
    if (str == undefined || str == "") {
        return def;
    }
    return isNaN(str) ? def : +(str || def);
}
function setDefault(str, def) {
    return str ? str : def;
}
function toBoolean(val, def) {
    if (val == "" || val == undefined) {
        return def;
    } else if (typeof val === "boolean") {
        return val;
    }
    return val.toLowerCase() == "true";
}

const parameters = PluginManager.parameters("NRP_VisualTurn");

const pDispNumber = toNumber(parameters["dispNumber"], 0);
const pHorizon = toNumber(parameters["horizon"], 0);
const pAdjustX = setDefault(parameters["adjustX"], 0);
const pAdjustY = setDefault(parameters["adjustY"], 0);
let pWindowPadding = toNumber(parameters["windowPadding"], 18);
let pWindowOpacity = toNumber(parameters["windowOpacity"], 255);
const pWindowDark = toNumber(parameters["windowDark"], 0);
const pWindowBackImage = parameters["windowBackImage"];

const pGraphicMode = toNumber(parameters["graphicMode"], 1);
const pEnemyGraphicMode = parameters["enemyGraphicMode"];
const pWidth = toNumber(parameters["width"], 100);
const pHeight = toNumber(parameters["height"], 32);
const pZoom = toNumber(parameters["zoom"], 100) / 100;
const pCharacterDirection = setDefault(parameters["characterDirection"], "down");
const pActorBackImage = parameters["actorBackImage"];
const pCutAdjustX = toNumber(parameters["cutAdjustX"], 0);
const pCutAdjustY = toNumber(parameters["cutAdjustY"], 0);

const pUseSprite = toBoolean(parameters["useSprite"], false);
const pActorMaskImage = setDefault(parameters["actorMaskImage"]);
const pSelectedHighlightType = setDefault(parameters["selectedHighlightType"], "image");
const pIntervalX = toNumber(parameters["intervalX"]);
const pIntervalY = toNumber(parameters["intervalY"]);
const pSymbolAdjustX = setDefault(parameters["symbolAdjustX"], 0);
const pSymbolAdjustY = setDefault(parameters["symbolAdjustY"], 0);
const pImageShiftX = setDefault(parameters["imageShiftX"], 0);
const pImageShiftY = setDefault(parameters["imageShiftY"], 0);
const pAdjustZoom = setDefault(parameters["adjustZoom"], 100);
    
const pEnemyFileName = setDefault(parameters["enemyFileName"], "Monster");
const pEnemyFileIndex = toNumber(parameters["enemyFileIndex"], 6);
const pEnemyZoom = toNumber(parameters["enemyZoom"], toNumber(parameters["zoom"], 100)) / 100;
const pEnemyBackImage = parameters["enemyBackImage"];
const pEnemyCutAdjustX = toNumber(parameters["enemyCutAdjustX"], pCutAdjustX);
const pEnemyCutAdjustY = toNumber(parameters["enemyCutAdjustY"], pCutAdjustY);
const pEnemyMaskImage = setDefault(parameters["enemyMaskImage"]);

const pUseVisualId = toBoolean(parameters["useVisualId"], false);
const pVisualIdSize = toNumber(parameters["visualIdSize"], 0);
const pVisualIdColor = toNumber(parameters["visualIdColor"], 0);
const pVisualIdArray = setDefault(parameters["visualIdArray"], "ABCDEFGHIJKLMNOPQRSTUVWXYZ");
const pVisualIdAdjustX = toNumber(parameters["visualIdAdjustX"], 0);
const pVisualIdAdjustY = toNumber(parameters["visualIdAdjustY"], 0);

const pOverlapWindows = toBoolean(parameters["overlapWindows"], true);
const pAutoHidden = toBoolean(parameters["autoHidden"], false);
const pDisplayForSkillSelect = toBoolean(parameters["displayForSkillSelect"], true);
const pKeepCommandWindow = toBoolean(parameters["keepCommandWindow"], true);
const pHideTargetingHelp = toBoolean(parameters["hideTargetingHelp"], true);

// スプライト使用時の座標調整（未使用）
const SPRITE_ADD_X = 0;
const SPRITE_ADD_Y = 0;
// CTTB用のターン参加人数
var mCttbCount = -1;

// スプライトを使用する場合
if (pUseSprite) {
    // ウィンドウ透明（非表示）
    pWindowOpacity = 0;
    // 余白を0に。
    pWindowPadding = 0;
}

function NrpVisualTurn() {
    throw new Error('This is a static class');
}

/**
 * ●行動順序の作成
 */
const _BattleManager_makeActionOrders = BattleManager.makeActionOrders;
BattleManager.makeActionOrders = function() {
    _BattleManager_makeActionOrders.call(this);
    
    // 有効なら数字が入るので、CTTBかどうかの判定に使う。
    mCttbCount = this._cttbCount;

    // 表示処理を呼び出し。
    NrpVisualTurn.visualTurnList(this._actionBattlers);
    if (this.isInputting() && NrpVisualTurn._ctbWindow.isClosed()) {
        NrpVisualTurn._ctbWindow.show();
        NrpVisualTurn._ctbWindow.open();
    }
}

/**
 * 【独自】表示処理を呼び出す。
 * ※外部参照用
 */
BattleManager.displayActionOrders = function() {
    NrpVisualTurn.visualTurnList(this._actionBattlers);
}

/**
 * ●CTB用ウィンドウの定義
 */
function Window_BattleCtb() {
    this.initialize.apply(this, arguments);
}

Window_BattleCtb.prototype = Object.create(Window_Base.prototype);
Window_BattleCtb.prototype.constructor = Window_BattleCtb;

/**
 * ●CTB用ウィンドウの初期化
 */
Window_BattleCtb.prototype.initialize = function() {
    var width = 0;
    var height = 0;
    var padding = this.standardPadding();

    // eval計算用
    const index = 0;

    // 縦
    if (pHorizon == 0) {
        width = eval(pWidth) + padding * 2;
        // この時点ではサイズ不明なので画面いっぱいまで確保する。
        // （行動順リストが設定されていないため）
        // ここで確保しておかないと初期描画ができない。
        height = Graphics.boxHeight;

    // 横
    } else if (pHorizon == 1) {
        // この時点ではサイズ不明なので画面いっぱいまで確保する。
        width = Graphics.boxWidth;
        height = eval(pHeight) + padding * 2;
    }
    
    // MVの場合
    if (Utils.RPGMAKER_NAME == "MV") {
        Window_Base.prototype.initialize.call(this, 0, 0, width, height);
        
    // MZの場合
    } else {
        Window_Base.prototype.initialize.call(this, new Rectangle(0, 0, width, height));
    }
    
    // 余白設定
    this.padding = padding;
};

/**
 * ●CTB用ウィンドウのサイズを参照して位置を調整
 */
Window_BattleCtb.prototype.setPositionBySize = function() {
    var winX = eval(pAdjustX);
    var winY = eval(pAdjustY);
    this.move(winX, winY, this.width, this.height);
}

/**
 * ●CTB用ウィンドウの余白
 */
Window_BattleCtb.prototype.standardPadding = function() {
    return pWindowPadding;
};

/**
 * ●CTB用ウインドウの設定
 */
NrpVisualTurn.setCtbWindow = function(ctbWindow) {
    this._ctbWindow = ctbWindow;
};

/**
 * 戦闘画面用にWindowを追加する。
 */
const _Scene_Battle_prototype_createAllWindows = Scene_Battle.prototype.createAllWindows;
Scene_Battle.prototype.createAllWindows = function() {
    _Scene_Battle_prototype_createAllWindows.apply(this, arguments);
    
    this.createCtbWindow();

    //--------------------------------------------------------------------
    // 下に隠れた順序ウィンドウが消えないよう調整
    // ※WindowLayer.prototype.renderの挙動によって、
    // 　ウィンドウは重ねられない仕様なので、Scene_Battle直下に移動する。
    //--------------------------------------------------------------------
    if (pOverlapWindows) {
        // ログウィンドウ
        this.addChild(this._windowLayer.removeChild(this._logWindow));
        // ヘルプウィンドウ
        this.addChild(this._windowLayer.removeChild(this._helpWindow));
        // ＵＩエリアの幅を考慮して加算
        this._logWindow.x += this._windowLayer.x;
        this._helpWindow.x += this._windowLayer.x;

        // ＭＶでは画面上部にスキル＆アイテム一覧が表示されるので対象に含める。
        if (Utils.RPGMAKER_NAME == "MV") {
            this.addChild(this._windowLayer.removeChild(this._skillWindow));
            this.addChild(this._windowLayer.removeChild(this._itemWindow));
            // ＵＩエリアの幅を考慮して加算
            this._skillWindow.x += this._windowLayer.x;
            this._itemWindow.x += this._windowLayer.x;
        }
    }
};

/**
 * 戦闘表示関連の準備
 */
const _Scene_Battle_prototype_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
Scene_Battle.prototype.createDisplayObjects = function() {
    _Scene_Battle_prototype_createDisplayObjects.apply(this, arguments);
    
    // NrpVisualTurnから呼び出せるようにCTBウインドウをセット。
    NrpVisualTurn.setCtbWindow(this._ctbWindow);

    // 各背景画像を先読みしておく。
    // 各画像シンボルよりも確実に後ろに表示させるため。
    if (pWindowBackImage) {
        ImageManager.loadPicture(pWindowBackImage);
    }
    if (pActorBackImage) {
        ImageManager.loadPicture(pActorBackImage);
    }
    if (pEnemyBackImage) {
        ImageManager.loadPicture(pEnemyBackImage);
    }

    // 全メンバーの順序用画像を読込
    for (const battler of BattleManager.allBattleMembers()) {
        this._ctbWindow.loadBitmap(battler);
    }
};

/**
 * CTB行動順序ウィンドウ作成処理
 */
Scene_Battle.prototype.createCtbWindow = function(){
    this._ctbWindow = new Window_BattleCtb();
    // 参照用にステータスウィンドウを持たせる。（強引かも……）
    this._ctbWindow._statusWindow = this._statusWindow;
    this._ctbWindow.hide(); // 非表示しておく
    this._ctbWindow.close(); // 閉じておく
    
    this.addChild(this._ctbWindow);
};

/**
 * ● 行動順序リストの表示
 */
NrpVisualTurn.visualTurnList = function(actionBattlers) {
    const win = this._ctbWindow;
    if (!win) {
        return;
    }
    var dispNumber = getDispNumber();

    // 順序表示用のスプライトをクリア
    const spriteset = getSpriteset();
    // 順序表示用のスプライトが作成済の場合
    if (spriteset._visualTurnSprites) {
        // 削除処理を行う。
        for (const sprite of spriteset._visualTurnSprites) {
            spriteset._battleField.removeChild(sprite);
        }
    }
    spriteset._visualTurnSprites = [];
    
    /*
     * ウィンドウの位置とサイズを設定
     */
    var xSize = 0;
    var ySize = 0;
    var padding = win.padding * 2; // ウィンドウの余白サイズ

    // eval計算用
    let index = 0;

    // 縦
    if (pHorizon == 0) {
        xSize = eval(pWidth) + padding;
        ySize = dispNumber * eval(pHeight) + padding;
        
        // 【CTTB用】境界線用の間隔を加算
        if (mCttbCount > 0 && mCttbCount < dispNumber) {
            ySize += 32;
        }

    // 横
    } else if (pHorizon == 1) {
        xSize = dispNumber * eval(pWidth) + padding;
        // 【CTTB用】境界線用の間隔を加算
        if (mCttbCount > 0 && mCttbCount < dispNumber) {
            xSize += 32;
        }
        
        ySize = eval(pHeight) + padding;
    }

    // ウィンドウの位置・サイズ変更を実行
    win.width = xSize;
    win.height = ySize;
    win.setPositionBySize();
    
    // 暗くするかどうか。
    win.setBackgroundType(pWindowDark);
    
    win.contents.clear(); // 表示クリア
    win.opacity = pWindowOpacity; // 不透明度の設定
    
    // 背景画像の設定
    win.drawWindowBackImage();

    /*
     * バトラー名を表示
     */
    var x = 0;
    var y = 0;

    for (index = 0; index < dispNumber; index++) {
        var battler = actionBattlers[index];

        // 【CTTB用】ターン外のキャラとは隙間を空ける
        if (mCttbCount == index) {
            // 縦表示
            if (pHorizon == 0) {
                y += 16;
                this.drawCttbBorder(battler, x, y);
                y += 16;
            // 横表示
            } else {
                x += 16;
                this.drawCttbBorder(battler, x, y);
                x += 16;
            }
        }

        // 位置を補正する。
        const x2 = x + eval(pSymbolAdjustX);
        const y2 = y + eval(pSymbolAdjustY);

        // キャラ描画
        this.drawCtbBattler(battler, x2, y2, dispNumber, index);
        
        // 縦表示
        if (pHorizon == 0) {
            if (pIntervalY != null) {
                y += pIntervalY;
            } else {
                y += eval(pHeight);
            }
        // 横表示
        } else {
            if (pIntervalX != null) {
                x += pIntervalX;
            } else {
                x += eval(pWidth);
            }
        }
    }
}

/**
 * ●表示人数を取得
 */
function getDispNumber() {
    var actionBattlersLength = BattleManager._actionBattlers.length;
    var dispNumber = pDispNumber;

    // パラメータの表示人数が未定義
    // または、連携先の計算人数がパラメータの表示人数を下回る場合
    if (!pDispNumber || actionBattlersLength < pDispNumber) {
        dispNumber = actionBattlersLength;
    }
    return dispNumber;
}

/**
 * ● 行動順序用、バトラーの描画
 */
NrpVisualTurn.drawCtbBattler = function(battler, x, y, battlersLength, index) {
    const win = this._ctbWindow;
    var opacity = 255;
    
    // 【CTTB用】ターン外だと半透明
    if (index >= mCttbCount) {
        opacity = 150;
    } else {
        opacity = 255; // 通常
    }

    // 背景描画
    win.drawPersonalBackImage(battler, x, y, index);
    // シンボル画像表示
    win.drawCtbBattler(battler, x, y, index, opacity);
}

/**
 * ●表示モードを取得する。
 */
NrpVisualTurn.getGraphicMode = function(battler) {
    var graphicMode = pGraphicMode;
    // 敵のグラフィックモードに指定があれば取得
    if (!battler.isActor() && pEnemyGraphicMode != "") {
        graphicMode = pEnemyGraphicMode;
    }
    return graphicMode;
}

/**
 * ●CTB用の名前表示
 * ※ウィンドウ縦表示専用。横表示だとバグります。
 */
Window_BattleCtb.prototype.drawName = function(battler, x, y, index, opacity) {
    const width = eval(pWidth);
    const height = eval(pHeight);

    var name = battler.name();
    if (battler.isActor()) {
        this.changeTextColor(this.textColor(0)); // 文字色設定
    } else {
        this.changeTextColor(this.textColor(2)); // 文字色設定
    }
    this.contents.paintOpacity = opacity;
    
    var ph = 28; // 文字の縦幅
    
    // 中央に来るように描画位置を調整。
    // ※中央線を求め、そこから文字縦幅/2 ほど上にずらす。
    let dy = y + height / 2 - ph / 2;
    dy -= 2; // 元が下寄せっぽいので微調整
    
    this.drawText(name, x, dy, this.contentsWidth(), "left");
    
    // 対象選択時の白枠表示
    if (battler._selected) {
        this.drawSelected(x, dy + 2, width, ph + 4);
    }
}

/**
 * ●バトラー毎の順序表示を行う。
 */
Window_BattleCtb.prototype.drawCtbBattler = function(battler, x, y, index, opacity) {
    // 表示モードによって判断し、bitmapを読み込む。
    const bitmap = this.loadBitmap(battler);
    
    const graphicMode = this._graphicMode;
    // loadBitmapで取得した顔グラ、キャラグラ用のインデックス
    const imageIndex = this._imageIndex;

    // キャラグラ用のビッグ判定
    const isBigCharacter = this._isBigCharacter;
    
    // 名前表示なら制御せずそのまま描画
    if (graphicMode == 0) {
        this.drawName(battler, x, y, index, opacity);
        return;
    }

    this.drawSymbol(bitmap, imageIndex, isBigCharacter, battler, x, y, index, opacity, graphicMode);    
};

/**
 * ●表示モードによって判断し、bitmapを読み込む。
 */
Window_BattleCtb.prototype.loadBitmap = function(battler) {
    var imageName;
    var imageIndex;
    var bitmap;
    var data;
    
    this._graphicMode = null;     // 現在対象とする画像表示モード
    this._imageIndex = null;      // 画像インデックス
    this._isBigCharacter = false; // キャラグラ用のビッグキャラクター判定用
    
    // メタタグの存在チェック（最優先）
    if (battler.isActor()) {
        data = $dataActors[battler.actorId()];
    } else {
        data = $dataEnemies[battler.enemyId()];
    }
    
    //---------------------------------
    // 各画像をメタタグから取得できるか？
    // 取得できればそちらを優先。
    //---------------------------------
    // 顔グラ
    imageName = NrpVisualTurn.getMetaImageName(data, "CtbFace");
    if (imageName) {
        this._graphicMode = 1;
        return ImageManager.loadFace(imageName);
    }
    // キャラグラ
    imageName = NrpVisualTurn.getMetaImageName(data, "CtbCharacter");
    if (imageName) {
        this._graphicMode = 2;
        bitmap = ImageManager.loadCharacter(imageName);
        this._isBigCharacter = ImageManager.isBigCharacter(imageName);
        return bitmap;
    }
    // SV戦闘キャラ
    imageName = NrpVisualTurn.getMetaImageName(data, "CtbSvActor");
    if (imageName) {
        this._graphicMode = 3;
        return ImageManager.loadSvActor(imageName);
    }
    // ピクチャー
    imageName = NrpVisualTurn.getMetaImageName(data, "CtbPicture");
    if (imageName) {
        this._graphicMode = 4;
        return ImageManager.loadPicture(imageName);
    }
    // 敵キャラ
    imageName = NrpVisualTurn.getMetaImageName(data, "CtbEnemy");
    if (imageName) {
        this._graphicMode = 5;
        if ($gameSystem.isSideView()) {
            return ImageManager.loadSvEnemy(imageName);
        } else {
            return ImageManager.loadEnemy(imageName);
        }
    }

    const graphicMode = NrpVisualTurn.getGraphicMode(battler);
    
    // 0:名前表示
    if (graphicMode == 0) {
        bitmap = null;
        
    // 1:顔グラ表示
    } else if (graphicMode == 1) {
        if (battler.isActor()) {
            imageName = battler.faceName();
            imageIndex = battler.faceIndex();
        } else {
            imageName = pEnemyFileName;
            imageIndex = pEnemyFileIndex;
        }
        bitmap = ImageManager.loadFace(imageName);
        
    // 2:キャラグラ表示
    } else if (graphicMode == 2) {
        if (battler.isActor()) {
            imageName = battler.characterName();
            imageIndex = battler.characterIndex();
        } else {
            imageName = pEnemyFileName;
            imageIndex = pEnemyFileIndex;
        }
        bitmap = ImageManager.loadCharacter(imageName);
        this._isBigCharacter = ImageManager.isBigCharacter(imageName);
        
    // 3:SV表示
    } else if (graphicMode == 3) {
        if (battler.isActor()) {
            imageName = battler.battlerName();
        } else {
            imageName = pEnemyFileName;
        }
        bitmap = ImageManager.loadSvActor(imageName);
        
    // 4:ピクチャー表示
    } else if (graphicMode == 4) {
        if (!battler.isActor()) {
            imageName = pEnemyFileName;
        }
        bitmap = ImageManager.loadPicture(imageName);

    // 5:敵キャラ表示
    } else if (graphicMode == 5) {
        imageName = battler.battlerName();
        if ($gameSystem.isSideView()) {
            bitmap = ImageManager.loadSvEnemy(imageName);
        } else {
            bitmap = ImageManager.loadEnemy(imageName);
        }
    }
    
    this._graphicMode = graphicMode;
    this._imageIndex = imageIndex;
    return bitmap;
};

/**
 * ●メタタグ名を元に画像ファイル名を取得する。
 */
NrpVisualTurn.getMetaImageName = function(data, metaTagName) {
    var imageName = null;
    var metaValue = data.meta[metaTagName];

    // 画像の指定があれば、そちらを取得する。
    if (metaValue) {
        imageName = this.getMetaImageNameSwitch(metaValue, metaTagName, imageName);

        // 連番が取得できた場合、そちらを優先
        for (var i = 1; data.meta.hasOwnProperty(metaTagName + i); i++) {
            metaValue = data.meta[metaTagName + i];
            imageName = this.getMetaImageNameSwitch(metaValue, metaTagName, imageName);
        }
    }
    return imageName;
}

/**
 * ●スイッチを考慮して画像ファイル名を取得する。
 */
NrpVisualTurn.getMetaImageNameSwitch = function(metaValue, metaTagName, defaultImageName) {
    const win = this._ctbWindow;
    var imageName = defaultImageName;
    var switchNo;
    
    // キャラグラ、顔グラの場合、
    // <CtbFace:Monster,6,10>というようにファイル名、インデックス、ゲーム内スイッチ番号の順番を想定。
    // ゲーム内スイッチ番号は省略可能。
    if (metaTagName == "CtbCharacter" || metaTagName == "CtbFace") {
        // スイッチ番号を取得
        switchNo = metaValue.split(",")[2];
        // スイッチ指定があり、かつ満たしている場合
        if (switchNo && $gameSwitches.value(switchNo)) {
            imageName = metaValue.split(",")[0];
            win._imageIndex = metaValue.split(",")[1]; // インデックス
            
        // スイッチ指定がない場合は普通に取得
        } else if (!switchNo) {
            imageName = metaValue.split(",")[0];
            win._imageIndex = metaValue.split(",")[1]; // インデックス
        }
        
    // それ以外の場合、
    // <CtbPicture:Monster,10>というようにファイル名、ゲーム内スイッチ番号の順番を想定
    // ゲーム内スイッチは省略可能。
    } else {
        // スイッチ番号を取得
        switchNo = metaValue.split(",")[1];
        // スイッチ指定があり、かつ満たしている場合
        if (switchNo && $gameSwitches.value(switchNo)) {
            imageName = metaValue.split(",")[0];
            
        // スイッチ指定がない場合は普通に取得
        } else if (!switchNo) {
            imageName = metaValue;
        }
    }

    return imageName;
}

/**
 * ●CTB用のシンボル表示
 */
Window_BattleCtb.prototype.drawSymbol = function(
        bitmap, imageIndex, isBigCharacter, battler, x, y, index, opacity, graphicMode) {
    // 1:顔グラ表示
    if (graphicMode == 1) {
        this.drawFace(bitmap, imageIndex, battler, x, y, index, opacity);
        
    // 2:キャラグラ表示
    } else if (graphicMode == 2) {
        this.drawCharacter(bitmap, imageIndex, isBigCharacter, battler, x, y, index, opacity);
        
    // 3:SV表示
    } else if (graphicMode == 3) {
        this.drawSvActor(bitmap, battler, x, y, index, opacity);
        
    // 4:ピクチャー表示
    } else if (graphicMode == 4) {
        this.drawPicture(bitmap, battler, x, y, index, opacity);

    // 5:敵キャラ表示
    } else if (graphicMode == 5) {
        this.drawEnemy(bitmap, battler, x, y, index, opacity);
    }
};

/**
 * ●CTB用の顔グラ表示
 */
Window_BattleCtb.prototype.drawFace = function(bitmap, imageIndex, battler, x, y, index, opacity) {
    const width = eval(pWidth);
    const height = eval(pHeight);

    // 規格上の顔グラサイズ
    var imageWidth;
    var imageHeight;

    // MVとMZで定義が違うので考慮
    if (Utils.RPGMAKER_NAME == "MV") {
        imageWidth = Window_Base._faceWidth;
        imageHeight = Window_Base._faceHeight;

    } else {
        imageWidth = ImageManager.faceWidth;
        imageHeight = ImageManager.faceHeight;
    }
    
    // 描画用の引数配列（sw, sh, dx, dy, pw, phを計算）
    const drawArgs = makeDrawArgs(x, y, width, height, imageWidth, imageHeight);

    //----------------------------------------------------------
    // sx, syは表示タイプによって異なるため別途計算
    //----------------------------------------------------------
    const sw = drawArgs.sw;
    const sh = drawArgs.sh;

    // 切り取り開始位置
    let sx = imageIndex % 4 * imageWidth;
    // 全体を描画できない場合、画像中央を取得するように調整
    if (sw < imageWidth) {
        sx += (imageWidth - sw) / 2;
    }
    
    let sy = Math.floor(imageIndex / 4) * imageHeight;
    // 全体を描画できない場合、画像中央を取得するように調整
    if (sh < imageHeight) {
        sy += (imageHeight - sh) / 2;
    }

    drawArgs.sx = sx;
    drawArgs.sy = sy;

    drawArgs.bitmap = bitmap;
    drawArgs.battler = battler;
    drawArgs.opacity = opacity;
    
    //----------------------------------------------------------
    // 描画実行
    //----------------------------------------------------------
    this.drawSymbolCommon(drawArgs, index);
};

/**
 * ●CTB用のキャラグラ表示
 */
Window_BattleCtb.prototype.drawCharacter = function(bitmap, imageIndex, isBig, battler, x, y, index, opacity) {
    const width = eval(pWidth);
    const height = eval(pHeight);

    // 規格上１キャラの横幅、縦幅
    const imageWidth = bitmap.width / (isBig ? 3 : 12);
    const imageHeight = bitmap.height / (isBig ? 4 : 8);
    
    // 描画用の引数配列（sw, sh, dx, dy, pw, phを計算）
    const drawArgs = makeDrawArgs(x, y, width, height, imageWidth, imageHeight);

    //----------------------------------------------------------
    // sx, syは表示タイプによって異なるため別途計算
    //----------------------------------------------------------
    const sw = drawArgs.sw;
    
    // 切り取り開始位置（ファイルからキャラ位置を指定）
    var sx = (imageIndex % 4 * 3 + 1) * imageWidth;
    // 全体を描画できない場合、画像中央を取得するように調整
    if (sw < imageWidth) {
        sx += (imageWidth - sw) / 2;
    }
    
    var sy = (Math.floor(imageIndex / 4) * 4) * imageHeight;
    
    // 向き調整。
    // ※キャラグラは下、左、右、上の順で格納されているので、その分の高さを加算する。
    if (pCharacterDirection == "left") {
        sy += imageHeight;
    } else if (pCharacterDirection == "right") {
        sy += imageHeight * 2;
    } else if (pCharacterDirection == "up") {
        sy += imageHeight * 3;
    }
    
    drawArgs.sx = sx;
    drawArgs.sy = sy;

    drawArgs.bitmap = bitmap;
    drawArgs.battler = battler;
    drawArgs.opacity = opacity;
    
    //----------------------------------------------------------
    // 描画実行
    //----------------------------------------------------------
    this.drawSymbolCommon(drawArgs, index);
};

/**
 * ●CTB用のSV戦闘キャラ表示
 */
Window_BattleCtb.prototype.drawSvActor = function(bitmap, battler, x, y, index, opacity) {
    const width = eval(pWidth);
    const height = eval(pHeight);

    // 待機モーションの中央を取得
    var motionIndex = 0;
    var pattern = 1;
    
    // 規格上１キャラの横幅、縦幅
    const imageWidth = bitmap.width / 9;
    const imageHeight = bitmap.height / 6;
    
    // 描画用の引数配列（sw, sh, dx, dy, pw, phを計算）
    const drawArgs = makeDrawArgs(x, y, width, height, imageWidth, imageHeight);

    //----------------------------------------------------------
    // sx, syは表示タイプによって異なるため別途計算
    //----------------------------------------------------------
    const sw = drawArgs.sw;
    
    // 切り取り開始位置
    var cx = Math.floor(motionIndex / 6) * 3 + pattern;
    var cy = motionIndex % 6;
    var sx = cx * imageWidth;
    var sy = cy * imageHeight;
    
    // 全体を描画できない場合、画像中央を取得するように調整
    if (sw < imageWidth) {
        sx += (imageWidth - sw) / 2;
    }
// 上から取ったほうが自然なため縦側は行わない。
//    // 全体を描画できない場合、画像中央を取得するように調整
//    if (sh < imageHeight) {
//        sy += (imageHeight - sh) / 2;
//    }
    
    drawArgs.sx = sx;
    drawArgs.sy = sy;

    drawArgs.bitmap = bitmap;
    drawArgs.battler = battler;
    drawArgs.opacity = opacity;
    
    //----------------------------------------------------------
    // 描画実行
    //----------------------------------------------------------
    this.drawSymbolCommon(drawArgs, index);
};

/**
 * ●CTB用のピクチャー表示
 */
Window_BattleCtb.prototype.drawPicture = function(bitmap, battler, x, y, index, opacity) {
    const width = eval(pWidth);
    const height = eval(pHeight);

    // 画像の縦幅、横幅
    var imageWidth = bitmap.width;
    var imageHeight = bitmap.height;
    
    // 描画用の引数配列（sw, sh, dx, dy, pw, phを計算）
    const drawArgs = makeDrawArgs(x, y, width, height, imageWidth, imageHeight);

    //----------------------------------------------------------
    // sx, syは表示タイプによって異なるため別途計算
    //----------------------------------------------------------
    const sw = drawArgs.sw;
    const sh = drawArgs.sh;
    
    // 切り取り開始位置
    var sx = 0;
    var sy = 0;
    
    // 全体を描画できない場合、画像中央を取得するように調整
    if (sw < imageWidth) {
        sx += (imageWidth - sw) / 2;
    }
    // 全体を描画できない場合、画像中央を取得するように調整
    if (sh < imageHeight) {
        sy += (imageHeight - sh) / 2;
    }
    
    drawArgs.sx = sx;
    drawArgs.sy = sy;

    drawArgs.bitmap = bitmap;
    drawArgs.battler = battler;
    drawArgs.opacity = opacity;
    
    //----------------------------------------------------------
    // 描画実行
    //----------------------------------------------------------
    this.drawSymbolCommon(drawArgs, index);
};

/**
 * ●CTB用の敵キャラ表示
 */
Window_BattleCtb.prototype.drawEnemy = function(bitmap, battler, x, y, index, opacity) {
    const width = eval(pWidth);
    const height = eval(pHeight);

    // 画像の縦幅、横幅
    var imageWidth = bitmap.width;
    var imageHeight = bitmap.height;
    
    // 描画用の引数配列（sw, sh, dx, dy, pw, phを計算）
    const drawArgs = makeDrawArgsAutoZoom(x, y, width, height, imageWidth, imageHeight);

    //----------------------------------------------------------
    // sx, syは表示タイプによって異なるため別途計算
    //----------------------------------------------------------
    const sw = drawArgs.sw;
    const sh = drawArgs.sh;
    
    // 切り取り開始位置
    var sx = 0;
    var sy = 0;
    
    // 全体を描画できない場合、画像中央を取得するように調整
    if (sw < imageWidth) {
        sx += (imageWidth - sw) / 2;
    }
    // 全体を描画できない場合、画像中央を取得するように調整
    if (sh < imageHeight) {
        sy += (imageHeight - sh) / 2;
    }
    
    drawArgs.sx = sx;
    drawArgs.sy = sy;

    drawArgs.bitmap = bitmap;
    drawArgs.battler = battler;
    drawArgs.opacity = opacity;
    
    //----------------------------------------------------------
    // 描画実行
    //----------------------------------------------------------
    this.drawSymbolCommon(drawArgs, index);
};

/**
 * ●CTB用のシンボル表示共通部分
 */
Window_BattleCtb.prototype.drawSymbolCommon = function(drawArgs, index) {
    const battler = drawArgs.battler;

    // 画像切取位置の調整
    const cutAdjustX = getCutAdjustX(battler);
    const cutAdjustY = getCutAdjustY(battler);
    const sx = drawArgs.sx - cutAdjustX;
    const sy = drawArgs.sy - cutAdjustY;

    const sw = drawArgs.sw;
    const sh = drawArgs.sh;
    const dx = drawArgs.dx;
    const dy = drawArgs.dy;
    const pw = drawArgs.pw;
    const ph = drawArgs.ph;
    const width = drawArgs.width;
    const height = drawArgs.height;

    const bitmap = drawArgs.bitmap;
    const opacity = drawArgs.opacity;
    const sprite = new Sprite();

    // 不透明度
    this.contents.paintOpacity = opacity;

    // スプライト表示
    if (pUseSprite) {
        const adjustZoom = eval(pAdjustZoom) / 100;
        // 敵用の座標補正（アクターの場合は0になる。）
        const enemyAdjustX = drawArgs.enemyAdjustX * adjustZoom;
        const enemyAdjustY = drawArgs.enemyAdjustY * adjustZoom;
        // 画像の位置調整
        const imageShiftX = getImageShiftX(battler);
        const imageShiftY = getImageShiftY(battler);

        const spriteset = getSpriteset();
        sprite.bitmap = bitmap;

        sprite.x = this.x + SPRITE_ADD_X + drawArgs.x + enemyAdjustX + imageShiftX;
        sprite.y = this.y + SPRITE_ADD_Y + drawArgs.y + enemyAdjustY + imageShiftY;
        sprite.anchor.x = 0;
        sprite.anchor.y = 0;
        
        // 元画像から必要な領域を切り抜き
        sprite.setFrame(sx, sy, sw, sh);
        // 画像の幅と枠の幅を元に倍率を設定
        sprite.scale.x = drawArgs.zoom * adjustZoom;
        sprite.scale.y = drawArgs.zoom * adjustZoom;
        // Ｚ座標には適当に大きな数字を設定
        sprite.z = 10001;

        // シンボルの色調変更
        this.setSymbolSpriteColor(sprite, battler, index);

        // 画面表示に追加
        spriteset._visualTurnSprites.push(sprite);
        spriteset._battleField.addChild(sprite);

        let maskImage = pActorMaskImage;
        if (battler.isEnemy() && pEnemyMaskImage) {
            maskImage = pEnemyMaskImage;
        }

        // マスク用スプライトがあれば設定
        if (maskImage) {
            const maskSprite = new Sprite();
            maskSprite.bitmap = ImageManager.loadPicture(maskImage);
            // 描画時に敵画像をズラした分を戻す。
            maskSprite.x = sprite.x - enemyAdjustX - imageShiftX;
            maskSprite.y = sprite.y - enemyAdjustY - imageShiftY;
            maskSprite.anchor.x = sprite.anchor.x;
            maskSprite.anchor.y = sprite.anchor.y;
            maskSprite.scale.x = adjustZoom;
            maskSprite.scale.y = adjustZoom;
            spriteset._visualTurnSprites.push(maskSprite);
            spriteset._battleField.addChild(maskSprite);
            sprite.mask = maskSprite;
        }

    // ウィンドウ表示
    } else {
        // 対象選択時の白表示
        if (battler._selected) {
            // 白枠表示
            if (pSelectedHighlightType == "square") {
                // シンボルを描画
                this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, pw, ph);
                // 白枠をかぶせる。（※幅は小さいほうに合わせる）
                this.drawSelected(dx, dy, Math.min(pw, width), Math.min(ph, height));

            // 画像を白表示
            } else {
                // 変更前のBitmapの色調を保持
                const originalPixels = getBitmapPixels(bitmap);
                // Bitmapの色調変更
                bitmap.adjustTone(128, 128, 128);
                // 描画
                this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, pw, ph);
                // Bitmapの色調を戻す
                setBitmapPixels(bitmap, originalPixels);
            }

        // 通常描画
        } else {
            this.contents.blt(bitmap, sx, sy, sw, sh, dx, dy, pw, ph);
        }
    }

    // 敵の表示用識別子を描画
    this.drawEnemyVisualId(battler, sprite, drawArgs, index);
}

/**
 * ●CTB用のシンボル色調変更
 */
Window_BattleCtb.prototype.setSymbolSpriteColor = function(sprite, battler, index) {
    // ステートを確認
    for (const state of battler.states()) {
        const ctbColorTone = state.meta.CtbColorTone;
        const ctbBlendColor = state.meta.CtbBlendColor;
        // 色変更対象のステートが存在する場合
        if (ctbColorTone || ctbBlendColor) {
            // 自動解除が『行動終了時』のステートの場合
            if (state.autoRemovalTiming == 1) {
                // 現在の表示バトラーがリスト上で何番目の行動かを確認
                let battlerCount = 0;
                for (let i = 0; i <= index; i++) {
                    // バトラーが一致した場合はカウント
                    if (battler == BattleManager._actionBattlers[i]) {
                        battlerCount++;
                    }
                }

                // 継続ターン数が過ぎる場合は終了
                const stateTurn = battler._stateTurns[state.id];
                if (stateTurn < battlerCount) {
                    break;
                }
            }
            // 色調変更（ColorTone）
            if (ctbColorTone) {
                sprite.setColorTone(eval(ctbColorTone));
            }
            // 色調変更（BlendColor
            if (ctbBlendColor) {
                sprite.setBlendColor(eval(ctbBlendColor));
            }
            break;
        }
    }

    // 選択時の色変更
    if (battler._selected) {
        sprite.setBlendColor([255, 255, 255, 128]);
    }
}

/**
 * ●バトラー個別の画像シフトＸ座標の補正値
 */
function getImageShiftX(battler) {
    const a = battler;
    // プラグインパラメータから取得
    let imageShiftX = eval(pImageShiftX);
    // meta値があれば補正
    const data = battler.isActor() ? battler.actor() : battler.enemy();
    const metaImageShiftX = data.meta.CtbImageShiftX;
    if (metaImageShiftX != null) {
        imageShiftX += eval(metaImageShiftX);
    }
    return imageShiftX;
}

/**
 * ●バトラー個別の画像シフトＹ座標の補正値
 */
function getImageShiftY(battler) {
    const a = battler;
    // プラグインパラメータから取得
    let imageShiftY = eval(pImageShiftY);
    // meta値があれば補正
    const data = battler.isActor() ? battler.actor() : battler.enemy();
    const metaImageShiftY = data.meta.CtbImageShiftY;
    if (metaImageShiftY != null) {
        imageShiftY += eval(metaImageShiftY);
    }
    return imageShiftY;
}

/**
 * ●バトラー個別の画像切取Ｘ座標の補正値
 */
function getCutAdjustX(battler) {
    // プラグインパラメータから取得
    let cutAdjustX = battler.isActor() ? pCutAdjustX : pEnemyCutAdjustX;
    // meta値があれば補正
    const data = battler.isActor() ? battler.actor() : battler.enemy();
    const metaCutAdjustX = data.meta.CtbCutAdjustX;
    if (metaCutAdjustX != null) {
        cutAdjustX += eval(metaCutAdjustX);
    }
    return cutAdjustX;
}

/**
 * ●バトラー個別の画像切取Ｙ座標の補正値
 */
function getCutAdjustY(battler) {
    // プラグインパラメータから取得
    let cutAdjustY = battler.isActor() ? pCutAdjustY : pEnemyCutAdjustY;
    // meta値があれば補正
    const data = battler.isActor() ? battler.actor() : battler.enemy();
    const metaCutAdjustY = data.meta.CtbCutAdjustY;
    if (metaCutAdjustY != null) {
        cutAdjustY += eval(metaCutAdjustY);
    }
    return cutAdjustY;
}

/**
 * ●描画用の引数配列を生成する。
 */
function makeDrawArgs(x, y, width, height, imageWidth, imageHeight) {
    // 最終的に描画するサイズ
    // 収まるなら画像のサイズ、収まらないなら範囲いっぱいまで
    const pw = Math.min(width, imageWidth * pZoom);
    const ph = Math.min(height, imageHeight * pZoom);
    
    // 切り取る画像サイズ
    let sw = Math.floor(pw / pZoom);
    let sh = Math.floor(ph / pZoom);

    // 切り取る画像サイズが規格の範囲を超えている。
    // 元のサイズ比率を保ったまま調整する。
    if (sw > imageWidth || sh > imageHeight) {
        if (sw >= sh) {
            sh = Math.floor(sh * imageWidth / sw);
            sw = imageWidth;

        } else {
            sw = Math.floor(sw * imageHeight / sh);
            sh = imageHeight;
        }
    }

    const dx = x + width / 2 - pw / 2;
    const dy = y + height / 2 - ph / 2;

    // 描画用の引数配列
    const drawArgs = {};
    drawArgs.x = x;
    drawArgs.y = y;
    drawArgs.enemyAdjustX = 0;
    drawArgs.enemyAdjustY = 0;
    drawArgs.pw = pw;
    drawArgs.ph = ph;
    drawArgs.sw = sw;
    drawArgs.sh = sh;
    drawArgs.dx = dx;
    drawArgs.dy = dy;
    drawArgs.width = width;
    drawArgs.height = height;
    drawArgs.zoom = pZoom;

    return drawArgs;
}

/**
 * ●描画用の引数配列を生成（倍率を自動設定）する。
 */
function makeDrawArgsAutoZoom(x, y, width, height, imageWidth, imageHeight) {
    // 画像の幅と枠の幅を元に倍率を設定
    const zoomX = width / imageWidth;
    const zoomY = height / imageHeight;
    // 縦横の中で小さいほうに合わせる。
    const zoomSmaller = Math.min(zoomX, zoomY);
    // 設定された倍率をかける。
    // ※ただし、最大でも1
    const zoom = Math.min(zoomSmaller * pEnemyZoom, 1);

    // 最終的に描画するサイズ
    // 収まるなら画像のサイズ、収まらないなら範囲いっぱいまで
    const pw = Math.min(width, imageWidth * zoom);
    const ph = Math.min(height, imageHeight * zoom);
    
    // 切り取る画像サイズ
    let sw = Math.floor(pw * pEnemyZoom / zoom);
    let sh = Math.floor(ph * pEnemyZoom / zoom);

    // 切り取る画像サイズが規格の範囲を超えている。
    // 元のサイズ比率を保ったまま調整する。
    if (sw > imageWidth || sh > imageHeight) {
        if (sw >= sh) {
            sh = Math.floor(sh * imageWidth / sw);
            sw = imageWidth;

        } else {
            sw = Math.floor(sw * imageHeight / sh);
            sh = imageHeight;
        }
    }

    // 座標を中央に調整
    const enemyAdjustX = (width - pw) / 2;
    const enemyAdjustY = (height - ph) / 2;
    const dx = x + width / 2 - pw / 2;
    const dy = y + height / 2 - ph / 2;

    // 描画用の引数配列
    const drawArgs = {};
    drawArgs.x = x;
    drawArgs.y = y;
    drawArgs.enemyAdjustX = enemyAdjustX;
    drawArgs.enemyAdjustY = enemyAdjustY;
    drawArgs.pw = pw;
    drawArgs.ph = ph;
    drawArgs.sw = sw;
    drawArgs.sh = sh;
    drawArgs.dx = dx;
    drawArgs.dy = dy;
    drawArgs.width = width;
    drawArgs.height = height;
    drawArgs.zoom = zoom;

    return drawArgs;
}

/**
 * ●敵の表示用識別子を描画
 */
Window_BattleCtb.prototype.drawEnemyVisualId = function(battler, sprite, drawArgs, index) {
    if (!battler.isEnemy() || !pUseVisualId) {
        return;
    }

    const adjustZoom = eval(pAdjustZoom) / 100;
    const width = eval(pWidth) * adjustZoom;
    const height = eval(pHeight) * adjustZoom;

    // スプライト使用時は番号もスプライト描画する。
    if (pUseSprite) {
        const spriteset = getSpriteset();
        // 識別子を描画する。
        const visualIdSprite = new Sprite();
        visualIdSprite.bitmap = new Bitmap(48, 48);
        if ($gameSystem.mainFontFace) {
            visualIdSprite.bitmap.fontFace = $gameSystem.mainFontFace();
        } else {
            visualIdSprite.bitmap.fontFace = this.standardFontFace();
        }
        visualIdSprite.bitmap.fontSize = pVisualIdSize * adjustZoom;
        if (pVisualIdColor) {
            visualIdSprite.bitmap.textColor = this.textColor(pVisualIdColor);
        }
        visualIdSprite.anchor.x = sprite.anchor.x;
        visualIdSprite.anchor.y = sprite.anchor.x;

        const x = drawArgs.x;
        const y = drawArgs.y;
        // 固定値による位置調整
        const constantX = -20 * adjustZoom;
        const constantY = -40 * adjustZoom;
        // プラグインパラメータによる位置調整
        const adjustX = pVisualIdAdjustX * adjustZoom;
        const adjustY = pVisualIdAdjustY * adjustZoom;

        // ウィンドウ位置＋画像始点＋右下
        visualIdSprite.x = this.x + x + width + constantX + adjustX;
        visualIdSprite.y = this.y + y + height + constantY + adjustY;

        // Ｚ座標には適当に大きな数字を設定
        // ※ただし、シンボルよりは大きな値
        visualIdSprite.z = 10002;
        visualIdSprite.bitmap.drawText(battler.visualId(), 0, 0, 48, 48, "left");
        spriteset._visualTurnSprites.push(visualIdSprite);
        spriteset._battleField.addChild(visualIdSprite);
        return;
    }

    const dx = drawArgs.dx;
    const dy = drawArgs.dy;
    
    // フォントサイズ指定
    if (pVisualIdSize) {
        this.contents.fontSize = pVisualIdSize * adjustZoom;
    }
    // 文字色設定
    if (pVisualIdColor) {
        this.changeTextColor(this.textColor(pVisualIdColor));
    }
    // 右下付近
    const x = dx - 5 + pVisualIdAdjustX;
    const y = dy + height - this.contents.fontSize - 2 - 15 + pVisualIdAdjustY;
    this.drawText(battler.visualId(), x, y, width, "right");
};

/**
 * ●表示用識別子を用いる場合のみ関数上書
 */
if (pUseVisualId) {
    /**
     * 【関数上書】敵キャラの表示名取得
     */
    Game_Enemy.prototype.name = function() {
        // 入力中は『A:スライム』というように識別子を付ける
        if (BattleManager.isInputting() && this.visualId()) {
            return this.visualId() + ":" + this.originalName();
        }

        // それ以外は本来の名称表示
        // 末尾のアルファベットは不要とする。
        return this.originalName();
    };

    /**
     * 【独自実装】表示用識別子を取得
     */
    Game_Enemy.prototype.visualId = function() {
        var array = pVisualIdArray.split('');
        var digit = array.length; // 進数
        // 配列長を超えた場合はループ
        return array[this.index() % digit];
    };
}

/**
 * ●CTB用の境界線表示（未使用）
 */
Window_BattleCtb.prototype.drawBorderCtb = function(x, y, width, height, battlersLength, i) {
    // キャラクター同士の境界線を引く
    if (i < battlersLength - 1) {
        var colorNormal = "rgba(255, 255, 255, 1)";  // 不透明の色
        var colorAlpha = "rgba(255, 255, 255, 0.1)"; // 透明寄りの色
        
        // ウィンドウ縦表示
        if (pHorizon == 0) {
            var lineY = y + height - 1;
            // 境界線にグラデーションをかけてみる。
            // 左から中央までの線
            this.contents.gradientFillRect(x, lineY, width / 2, 1, colorAlpha, colorNormal, false);
            // 中央から右までの線
            this.contents.gradientFillRect(x + width / 2, lineY, width / 2, 1, colorNormal, colorAlpha, false);

        // ウィンドウ横表示
        } else if (pHorizon == 1) {
            var lineX = x + width - 1;
            // 境界線にグラデーションをかけてみる。
            // 上から中央までの線
            this.contents.gradientFillRect(lineX, y, 1, height / 2, colorAlpha, colorNormal, true);
            // 中央から下までの線
            this.contents.gradientFillRect(lineX, y + height / 2, 1, height / 2, colorNormal, colorAlpha, true);
        }
    }
}

/**
 * ●選択中のキャラは色変え
 */
Window_BattleCtb.prototype.drawSelected = function(x, y, width, height) {
    // 白の半透明
    const color = "rgba(255, 255, 255, 0.5)";
    this.contents.fillRect(x, y, width, height, color);
}

/**
 * ●ウィンドウ全体に表示するピクチャー描画
 */
Window_BattleCtb.prototype.drawWindowBackImage = function() {
    if (!pWindowBackImage) {
        return;
    }

    const bitmap = ImageManager.loadPicture(pWindowBackImage);

    // スプライト表示
    if (pUseSprite) {
        const spriteset = getSpriteset();
        const sprite = new Sprite();
        sprite.bitmap = bitmap;
        sprite.x = this.x + SPRITE_ADD_X;
        sprite.y = this.y + SPRITE_ADD_Y;
        sprite.anchor.x = 0;
        sprite.anchor.y = 0;
        // Ｚ座標には適当に大きな数字を設定
        // ※ただし、個別背景よりも下
        sprite.z = 10000;
        // 画面に追加
        spriteset._visualTurnSprites.push(sprite);
        spriteset._battleField.addChild(sprite);
        return;
    }

    this.contents.paintOpacity = 255;
    this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, 0, 0);
};

/**
 * ●アクター・バトラーの背景に表示するピクチャー描画
 */
Window_BattleCtb.prototype.drawPersonalBackImage = function(battler, x, y, index) {
    var bitmap = null;
    
    // 味方／敵に対応する背景画像があれば読み込む
    if (battler.isActor() && pActorBackImage) {
        bitmap = ImageManager.loadPicture(pActorBackImage);
    } else if (!battler.isActor() && pEnemyBackImage) {
        bitmap = ImageManager.loadPicture(pEnemyBackImage);
    // どちらもなければ処理しない。
    } else {
        return;
    }

    // スプライト表示
    if (pUseSprite) {
        const adjustZoom = eval(pAdjustZoom) / 100;
        const spriteset = getSpriteset();
        const sprite = new Sprite();
        sprite.bitmap = bitmap;
        sprite.x = this.x + SPRITE_ADD_X + x;
        sprite.y = this.y + SPRITE_ADD_Y + y;
        sprite.anchor.x = 0;
        sprite.anchor.y = 0;
        sprite.scale.x = adjustZoom;
        sprite.scale.y = adjustZoom;
        // Ｚ座標には適当に大きな数字を設定
        sprite.z = 10001;
        // 画面に追加
        spriteset._visualTurnSprites.push(sprite);
        spriteset._battleField.addChild(sprite);

    // ウィンドウ表示
    } else {
        this.contents.paintOpacity = 255;
        this.contents.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y);
    }
};

/**
 * ●スキル（アイテム）選択時の非表示処理
 */
Window_BattleCtb.prototype.skillHide = function() {
    // 常に表示なら隠さない
    if (pDisplayForSkillSelect == 1) {
        return;
    }

    // ウィンドウ非表示
    this.hide();
};

/**
 * ●ウィンドウを閉じる（演出なし）
 */
Window_BattleCtb.prototype.hide = function() {
    Window_Base.prototype.hide.call(this);

    // スプライトを非表示にする。
    const spriteset = getSpriteset();
    if (spriteset._visualTurnSprites) {
        spriteset._visualTurnSprites.forEach(sprite => sprite.visible = false);
    }
}

/**
 * ●ウィンドウを開く（演出なし）
 */
Window_BattleCtb.prototype.show = function() {
    Window_Base.prototype.show.call(this);

    // スプライトを表示する。
    const spriteset = getSpriteset();
    if (spriteset._visualTurnSprites) {
        spriteset._visualTurnSprites.forEach(sprite => sprite.visible = true);
    }
}

/**
 * ●ウィンドウを閉じる
 */
Window_BattleCtb.prototype.close = function() {
    Window_Base.prototype.close.call(this);

    // スプライトを非表示にする。
    const spriteset = getSpriteset();
    if (spriteset._visualTurnSprites) {
        spriteset._visualTurnSprites.forEach(sprite => sprite.visible = false);
    }
}

/**
 * ●ウィンドウを開く
 */
Window_BattleCtb.prototype.open = function() {
    Window_Base.prototype.open.call(this);

    // スプライトを表示する。
    const spriteset = getSpriteset();
    if (spriteset._visualTurnSprites) {
        spriteset._visualTurnSprites.forEach(sprite => sprite.visible = true);
    }
}

/**
 * ● 【CTTB用】ターン外境界線の描画
 */
NrpVisualTurn.drawCttbBorder = function(battler, x, y) {
    const win = this._ctbWindow;
    var borderName = "";

    // 縦表示
    if (pHorizon == 0) {
        // 境界線表示
        // 線の描画（とりあえず注釈化）
        //win.contents.fillRect(x, y, win.contentsWidth(), 3, borderColor);
        
        borderName = "-NEXT-";
        win.changeTextColor(win.textColor(6)); // 文字色設定
        win.drawText(borderName, x, y - 16, win.contentsWidth(), "center");
        
    // 横表示
    } else if (pHorizon == 1) {
        borderName = "◀";
        win.changeTextColor(win.textColor(6)); // 文字色設定
        win.drawText(
            borderName,
            x - 8,
            y - (win.padding * 2) + pHeight / 2,
            win.contentsWidth(), "left");
    }
}

/**
 * ●味方の選択時
 */
const _Window_BattleActor_prototype_select = Window_BattleActor.prototype.select;
Window_BattleActor.prototype.select = function(index) {
    _Window_BattleActor_prototype_select.apply(this, arguments);
    
    // 対象の選択が有効なら再描画して選択対象を色替え
    if (this.active && index >= 0) {
        NrpVisualTurn.visualTurnList(BattleManager._actionBattlers);
    }
};

/**
 * ●アクターの選択を閉じる
 */
const _Window_BattleActor_hide = Window_BattleActor.prototype.hide;
Window_BattleActor.prototype.hide = function() {
    _Window_BattleActor_hide.apply(this, arguments);

    // 【MZ対応】選択状態が残らないようにインデックスをクリア
    this._index = null;
};

/**
 * ●敵の選択時
 */
var _Window_BattleEnemy_prototype_select = Window_BattleEnemy.prototype.select;
Window_BattleEnemy.prototype.select = function(index) {
    _Window_BattleEnemy_prototype_select.apply(this, arguments);
    
    // 対象の選択が有効なら再描画して選択対象を色替え
    if (this.active && index >= 0) {
        NrpVisualTurn.visualTurnList(BattleManager._actionBattlers);
    }
};

/**
 * ●敵の選択を閉じる
 */
const _Window_BattleEnemy_hide = Window_BattleEnemy.prototype.hide;
Window_BattleEnemy.prototype.hide = function() {
    _Window_BattleEnemy_hide.apply(this, arguments);

    // 【MZ対応】選択状態が残らないようにインデックスをクリア
    this._index = null;
};

/**-------------------------------------------------------------
 * ●以下、状況によってCTBウィンドウの表示・非表示を切り替える。
 *--------------------------------------------------------------/
/**
 * ●パーティコマンド選択開始
 */
var _Scene_Battle_prototype_startPartyCommandSelection = Scene_Battle.prototype.startPartyCommandSelection;
Scene_Battle.prototype.startPartyCommandSelection = function() {
    _Scene_Battle_prototype_startPartyCommandSelection.call(this); // 元処理呼び出し

    // 行動順序表示
    if (getDispNumber() > 0) {
        this._ctbWindow.show();
        this._ctbWindow.open();
    }
};

/**
 * ●コマンド入力開始
 */
var _BattleManager_startInput = BattleManager.startInput;
BattleManager.startInput = function() {
    // 行動順序表示
    // パーティコマンドとの重複処理になるけれど、その場合は無視されるので問題ない。
    if (getDispNumber() > 0) {
        NrpVisualTurn._ctbWindow.show();
        NrpVisualTurn._ctbWindow.open();
    }
    
    _BattleManager_startInput.apply(this);
};

/**
 * ●スキル選択画面の表示
 */
var _Scene_Battle_prototype_commandSkill = Scene_Battle.prototype.commandSkill;
Scene_Battle.prototype.commandSkill = function() {
    _Scene_Battle_prototype_commandSkill.call(this); // 元処理呼び出し
    
    // CTBウィンドウを非表示
    this._ctbWindow.skillHide();
};

/**
 * MZ対応
 * MZかつ対象選択時にヘルプを隠す場合
 */
if (Utils.RPGMAKER_NAME != "MV" && pHideTargetingHelp) {
    /**
     * ●敵の選択開始
     */
    const _Scene_Battle_startEnemySelection = Scene_Battle.prototype.startEnemySelection;
    Scene_Battle.prototype.startEnemySelection = function() {
        _Scene_Battle_startEnemySelection.apply(this, arguments);

        // ヘルプを隠して行動順序を表示
        this._helpWindow.hide();
    };

    /**
     * ●味方の選択開始
     */
    const _Scene_Battle_startActorSelection = Scene_Battle.prototype.startActorSelection;
    Scene_Battle.prototype.startActorSelection = function() {
        _Scene_Battle_startActorSelection.apply(this, arguments);

        // ヘルプを隠して行動順序を表示
        this._helpWindow.hide();
    };
}

/**
 * ●味方選択決定
 */
var _Scene_Battle_prototype_onActorOk = Scene_Battle.prototype.onActorOk;
Scene_Battle.prototype.onActorOk = function() {
    _Scene_Battle_prototype_onActorOk.call(this);
    
    // 対象がクリアされたので再描画
    NrpVisualTurn.visualTurnList(BattleManager._actionBattlers);
};

/**
 * ●味方選択キャンセル
 */
var _Scene_Battle_prototype_onActorCancel = Scene_Battle.prototype.onActorCancel;
Scene_Battle.prototype.onActorCancel = function() {
    _Scene_Battle_prototype_onActorCancel.call(this);
    
    switch (this._actorCommandWindow.currentSymbol()) {
    case 'skill':
        // CTBウィンドウを非表示
        this._ctbWindow.skillHide();
        break;
    case 'item':
        // CTBウィンドウを非表示
        this._ctbWindow.skillHide();
        break;
    }
};

/**
 * ●敵選択決定
 */
var _Scene_Battle_prototype_onEnemyOk = Scene_Battle.prototype.onEnemyOk;
Scene_Battle.prototype.onEnemyOk = function() {
    _Scene_Battle_prototype_onEnemyOk.call(this);
    
    // 対象がクリアされたので再描画
    NrpVisualTurn.visualTurnList(BattleManager._actionBattlers);
};

/**
 * ●敵選択キャンセル
 */
var _Scene_Battle_prototype_onEnemyCancel = Scene_Battle.prototype.onEnemyCancel;
Scene_Battle.prototype.onEnemyCancel = function() {
    _Scene_Battle_prototype_onEnemyCancel.call(this);
    
    switch (this._actorCommandWindow.currentSymbol()) {
    case 'attack':
        // 対象が消失したので再描画
        NrpVisualTurn.visualTurnList(BattleManager._actionBattlers);
        break;
    case 'skill':
        // CTBウィンドウを非表示
        this._ctbWindow.skillHide();
        break;
    case 'item':
        // CTBウィンドウを非表示
        this._ctbWindow.skillHide();
        break;
    }
};

/**
 * ●スキル選択キャンセル
 */
var _Scene_Battle_prototype_onSkillCancel = Scene_Battle.prototype.onSkillCancel;
Scene_Battle.prototype.onSkillCancel = function() {
    _Scene_Battle_prototype_onSkillCancel.call(this); // 元処理呼び出し
    
    // CTBウィンドウを再描画して表示
    NrpVisualTurn.visualTurnList(BattleManager._actionBattlers);
    this._ctbWindow.show();
};

/**
 * ●アイテム選択画面の表示
 */
var _Scene_Battle_prototype_commandItem = Scene_Battle.prototype.commandItem;
Scene_Battle.prototype.commandItem = function() {
    _Scene_Battle_prototype_commandItem.call(this); // 元処理呼び出し
    
    // CTBウィンドウを非表示
    this._ctbWindow.skillHide();
};

/**
 * ●アイテム選択キャンセル
 */
var _Scene_Battle_prototype_onItemCancel = Scene_Battle.prototype.onItemCancel;
Scene_Battle.prototype.onItemCancel = function() {
    _Scene_Battle_prototype_onItemCancel.call(this); // 元処理呼び出し

    // CTBウィンドウを再描画して表示
    NrpVisualTurn.visualTurnList(BattleManager._actionBattlers);
    this._ctbWindow.show();
};

/**
 * ●スキル・アイテム選択後、対象の選択へ
 */
var _Scene_Battle_prototype_onSelectAction = Scene_Battle.prototype.onSelectAction;
Scene_Battle.prototype.onSelectAction = function() {
    _Scene_Battle_prototype_onSelectAction.call(this); // 元処理呼び出し
    
    // CTBウィンドウを表示
    this._ctbWindow.show();
};

/**
 * ●ターン開始処理
 */
var _BattleManager_startTurn = BattleManager.startTurn;
BattleManager.startTurn = function() {
    _BattleManager_startTurn.call(this);
    
    // 行動順序関連表示を閉じる
    if (pAutoHidden == 1) {
        NrpVisualTurn._ctbWindow.close();
    }
};

/**
 * ●行動開始
 */
const _BattleManager_startAction = BattleManager.startAction;
BattleManager.startAction = function() {
    // 元の処理
    _BattleManager_startAction.apply(this, arguments);
    
    const item = this._subject.currentAction().item();

    // <CtbHide>の指定があれば、行動順序関連表示を閉じる
    if (item && item.meta.CtbHide) {
        NrpVisualTurn._ctbWindow.close();
    }
};

/**
 * ●行動終了
 */
const _BattleManager_endAction = BattleManager.endAction;
BattleManager.endAction = function() {
    _BattleManager_endAction.call(this);

    if (this._action) {
        const item = this._action.item();

        // <CtbHide>の指定があれば、行動順序表示を再開
        // ただし、ウィンドウを隠す設定でない場合のみ
        if (item && item.meta.CtbHide && pAutoHidden == 0) {
            NrpVisualTurn._ctbWindow.show();
            NrpVisualTurn._ctbWindow.open();
        }
    }
};

/**
 * ●戦闘終了
 */
var _BattleManager_endBattle = BattleManager.endBattle;
BattleManager.endBattle = function(result) {
    // 行動順序関連表示削除
    NrpVisualTurn._ctbWindow.close();
    
    _BattleManager_endBattle.apply(this, arguments);
};

/**
 * ●コマンドを隠さない場合
 * ※パラメータがtrueでなければ、関数再定義を行わない。
 */
if (pKeepCommandWindow) {
    /**
     * MVの場合
     */
    if (Utils.RPGMAKER_NAME == "MV") {
        /**
         * ●コマンド入力完了
         */
        Scene_Battle.prototype.endCommandSelection = function() {
            this._partyCommandWindow.close();
            // アクターコマンドウィンドウを隠さない。
            // this._actorCommandWindow.close();
            // 選択解除する。
            this._actorCommandWindow.deselect();
            this._statusWindow.deselect();
        };

        /**
         * ●ステータスウィンドウの位置更新
         */
        Scene_Battle.prototype.updateWindowPositions = function() {
            // 初期位置から変更しない。
        };

    /**
     * MZの場合
     */
    } else {
        /**
         * ●コマンド入力完了
         */
        Scene_Battle.prototype.endCommandSelection = function() {
            // アクターコマンドウィンドウを隠さない。
            // this.closeCommandWindows();

            // 選択解除する。
            this._partyCommandWindow.deactivate();
            this._actorCommandWindow.deactivate();
            this._actorCommandWindow.deselect();
            this.hideSubInputWindows();
            this._statusWindow.deselect();
            this._statusWindow.show();
        };

        /**
         * ●ステータスウィンドウの位置更新
         */
        Scene_Battle.prototype.updateStatusWindowPosition = function() {
            // 初期位置から変更しない。
        };

        /**
         * ●スキル表示時
         */
        const _Scene_Battle_commandSkill = Scene_Battle.prototype.commandSkill;
        Scene_Battle.prototype.commandSkill = function() {
            _Scene_Battle_commandSkill.apply(this, arguments);

            // アクターコマンドを残すために再表示
            this._actorCommandWindow.show();
        };
        
        /**
         * ●アイテム表示時
         */
        const _Scene_Battle_commandItem = Scene_Battle.prototype.commandItem;
        Scene_Battle.prototype.commandItem = function() {
            _Scene_Battle_commandItem.apply(this, arguments);

            // アクターコマンドを残すために再表示
            this._actorCommandWindow.show();
        };
    }
}

/**
 * ●MZ対応
 */
if (Utils.RPGMAKER_NAME != "MV") {
    /**
     * MZではWindow_Base.prototype.textColorが存在しないので、
     * 代替処理を呼び出す。
     */
    Window_BattleCtb.prototype.textColor = function(n) {
        return ColorManager.textColor(n);
    };

    /**
     * 余白定義
     */
    Window_BattleCtb.prototype.updatePadding = function() {
        this.padding = pWindowPadding;
    };

    /**
     * ●ウィンドウ内の画像の色を変更
     */
    if (!Bitmap.prototype.adjustTone) {
        /**
         * Changes the color tone of the entire bitmap.
         *
         * @method adjustTone
         * @param {Number} r The red strength in the range (-255, 255)
         * @param {Number} g The green strength in the range (-255, 255)
         * @param {Number} b The blue strength in the range (-255, 255)
         */
        Bitmap.prototype.adjustTone = function(r, g, b) {
            if ((r || g || b) && this.width > 0 && this.height > 0) {
                var context = this.context;
                var imageData = context.getImageData(0, 0, this.width, this.height);
                var pixels = imageData.data;
                for (var i = 0; i < pixels.length; i += 4) {
                    pixels[i + 0] += r;
                    pixels[i + 1] += g;
                    pixels[i + 2] += b;
                }
                context.putImageData(imageData, 0, 0);
                this._setDirty();
            }
        };

        /**
         * @method _setDirty
         * @private
         */
        Bitmap.prototype._setDirty = function() {
            this._dirty = true;
        };
    }
}

/**
 * ●Bitmapのピクセルデータを取得
 */
function getBitmapPixels(bitmap) {
    const context = getBitmapContext(bitmap);
    const imageData = context.getImageData(0, 0, bitmap.width, bitmap.height);
    const pixels = imageData.data;
    return pixels;
};

/**
 * ●Bitmapのピクセルデータを反映
 */
function setBitmapPixels(bitmap, newPixels) {
    const context = getBitmapContext(bitmap);
    const imageData = context.getImageData(0, 0, bitmap.width, bitmap.height);
    const pixels = imageData.data;
    for (var i = 0; i < pixels.length; i++) {
        pixels[i] = newPixels[i];
    }
    context.putImageData(imageData, 0, 0);
};

/**
 * ●Bitmapのcontextを取得
 * ※ＭＶとＭＺの差異を吸収
 */
function getBitmapContext(bitmap) {
    return bitmap.context || bitmap._context;
};

/**
 * ●現在の画面のSpritesetを取得する。
 */
function getSpriteset() {
    return SceneManager._scene._spriteset;
}

//-----------------------------------------------------------------------------
// ＭＶ対応
//-----------------------------------------------------------------------------
if (Utils.RPGMAKER_NAME == "MV") {
    /**
     * ●仲間の追加
     */
    const _Game_Party_addActor = Game_Party.prototype.addActor;
    Game_Party.prototype.addActor = function(actorId) {
        // 仲間が追加可能な場合
        if (!this._actors.contains(actorId)) {
            _Game_Party_addActor.apply(this, arguments);
            // 戦闘中の場合
            if (this.inBattle()) {
                const actor = $gameActors.actor(actorId);
                if (this.battleMembers().includes(actor)) {
                    // 画像読込
                    SceneManager._scene._ctbWindow.loadBitmap(actor);
                }
            }
            return;
        }

        // 追加できない場合はそのまま
        _Game_Party_addActor.apply(this, arguments);
    };
}

})();
