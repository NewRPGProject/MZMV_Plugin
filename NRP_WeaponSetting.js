//=============================================================================
// NRP_WeaponSetting.js
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc v2.064 Extends the weapon display.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @orderBefore NRP_DynamicMotionMZ
 * @url http://newrpg.seesaa.net/article/484348477.html
 *
 * @help Extends the display of weapons in side-view battle.
 * 
 * ◆Features
 * - Adjust the display position of weapons.
 * 　※Can be adapted to battlers of different sizes from the standard.
 * - Adjust the position of each actors.
 * - Change the size of the weapon per pattern.
 * - Support for weapon images after the 31th.
 * 　※By default, only the 6th of Weapons3.png (=30th) can be selected.
 * - Changed the color tone of the weapon.
 * - Changed color tones of weapon animations.
 * - Unique images can be set for each weapon type.
 * - Combined with DynamicMotion,
 *   the same weapon can be swung and thrust.
 * 
 * -------------------------------------------------------------------
 * [For DynamicMotion]
 * -------------------------------------------------------------------
 * Although it takes some effort, when combined with DynamicMotion,
 * complex movements such as swinging and thrusting
 * with the same weapon are possible.
 * 
 * First, modify system/WeaponsX.png to create multiple weapon actions
 * such as "swing" and "thrust" in one image.
 * 
 * Next, register the created image
 * in the "WeaponInfoList" of the Plugin Parameters.
 * The motions that can be set here
 * are the standard ones used for normal attacks.
 * 
 * In addition, define motions for each index in "IndexList".
 * This allows the motion to be called on the DynamicMotion side.
 * 
 * <D-Motion:attack>
 * weaponIndex = 2
 * </D-Motion>
 * 
 * For example, the above description
 * will play the second animation in WeaponsX.png.
 * In addition, it will execute the motion defined above.
 * 
 * Note that you can also specify images
 * and motions directly on the DynamicMotion side.
 * The following is an example of executing a thrust motion
 * by specifying Weapons2.png.
 * 
 * <D-Motion:attack>
 * weaponImage = Weapons2
 * weaponIndex = 2
 * motion = thrust
 * </D-Motion>
 * 
 * Motion can be specified other than the usual
 * "swing", "thrust", and "missile" motions.
 * For example, you can use the "item" motion
 * to raise a sword above the ground.
 * 
 * -------------------------------------------------------------------
 * [More advanced settings (IndexList)]
 * -------------------------------------------------------------------
 * Depending on the IndexList settings,
 * more complex effects are possible.
 * This is also supposed to be used in conjunction with DynamicMotion.
 * 
 * ◆WeaponKey
 * It is possible to set a unique key instead of a WeaponIndex.
 * Utilize this function when you want
 * to set different behavior for the same WeaponIndex.
 * If the value is "test", it can be called as follows.
 * 
 * <D-Motion:attack>
 * weaponKey = test
 * </D-Motion>
 * 
 * ◆WeaponPatterns
 * The pattern of weapons to execute.
 * Specify them in order, separated by commas.
 * The initial value is "0,1,2".
 * For example, setting "2,1,0" will execute weapons in reverse order.
 * 
 * Furthermore, if 3 or more are specified,
 * the next WeaponIndex is referenced.
 * For example, if "0,1,2,3,4" is specified with 1 as the WeaponIndex,
 * the first animation in WeaponsX.png will be played in order,
 * and then the second animation until the second.
 * 
 * This allows more than four patterns of motion,
 * which would normally be impossible.
 * This is assumed to be combined with "Motion2" and "Motion2Patterns".
 * 
 * ◆PriorityPatterns
 * Change the priority of the specified weapon pattern.
 * In other words, it brings it to the front,
 * just like "Above characters" in the event.
 * 
 * For example, if "0,2" is specified, the first
 * and third weapon patterns will be displayed in the front.
 * 
 * It is only the order of the weapon pattern that is specified.
 * If the weapon pattern is "2,1,0" and "0,1" is specified
 * for the priority pattern, it is the "2,1" portion
 * of the weapon pattern that is displayed in the front.
 * Be careful not to confuse the two.
 * 
 * ◆MotionPatterns
 * The motion patterns to be executed.
 * Specify in order, separated by commas.
 * 
 * The same as for the weapon pattern,
 * but specifying a value of 3 or more will invalidate the pattern.
 * 
 * ◆Motion2
 * ◆Motion2Patterns
 * Additional motions and their patterns to be executed.
 * To be executed after the MotionPatterns above.
 * 
 * -------------------------------------------------------------------
 * [Note of Actors]
 * -------------------------------------------------------------------
 * <WeaponX:?>
 * Adjusts the X coordinate of the weapon. Formulae allowed.
 * If the value is negative, it moves left.
 * 
 * <WeaponY:?>
 * Adjusts the Y coordinate of the weapon. Formulae allowed.
 * If the value is negative, it moves up.
 * 
 * -------------------------------------------------------------------
 * [Note of Weapons]
 * -------------------------------------------------------------------
 * <WeaponImage:Weapons5>
 * Set Weapons5.png as the weapon image.
 * ※As with normal weapon images, the system folder is the target.
 * 
 * <WeaponIndex:2>
 * The second image among those specified
 * in WeaponImage is set as the weapon image.
 * If omitted, the first image will be used.
 * 
 * <AttackMotion:swing>
 * "swing" the motion when attacking.
 * Refer to the following for the type of motion.
 * 
 * - thrust
 * - swing
 * - missile
 * - walk
 * - wait
 * - chant
 * - guard
 * - damage
 * - evade
 * - skill
 * - spell
 * - item
 * - escape
 * - victory
 * - dying
 * - abnormal
 * - sleep
 * - dead
 * 
 * ※For more information, please refer to
 *   "Documentation > Side-View Character Standards"
 *   in the help section of Maker.
 * 
 * <BlendColor:[255,255,255,255]>
 * Blends color into the weapon.
 * 0~255 are valid values.
 * Set in the order of Red, Green, Blue, Strength.
 * 
 * <ColorTone:[255,255,255,255]>
 * Changes the color tone of the weapon.
 * The calculation method is different from <BlendColor>.
 * Also, values from -255~255 are valid here.
 * 
 * <BlendMode:1>
 * Change the blending method of the weapon.
 * ※0:Normal, 1:Add, 2:Multiply, 3:Screen
 * 
 * <Opacity:255>
 * Changes the opacity of the weapon.
 * 0~255 are valid values.
 * 
 * -------------------------------------------------------------------
 * [Note of Weapons, Actors, and Enemies]
 * -------------------------------------------------------------------
 * <AnimationColor:[255,255,255,255]>
 * Blends color into the normal attack animation.
 * 0~255 are valid values.
 * Set in the order of Red, Green, Blue, Strength.
 * ※Only the animation for MV is valid.
 * ※Plugins such as NRP_EnemyAttackAnimation.js
 *   are required for the enemy's normal attack animation.
 * 
 * <AnimationTone:[255,255,255,255]>
 * Changes the color tone of the normal attack animation.
 * The calculation method is different from <AnimationColor>.
 * Also, values from -255~255 are valid here.
 * 
 * <AnimationBlendMode:1>
 * Change the blending method of the normal attack animation.
 * ※0:Normal, 1:Add, 2:Multiply, 3:Screen
 * 
 * -------------------------------------------------------------------
 * [Terms]
 * -------------------------------------------------------------------
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but we will respond to defects as far as possible.
 * 
 * @-----------------------------------------------------
 * @ Plugin Parameters
 * @-----------------------------------------------------
 * 
 * @param WeaponInfoList
 * @type struct<WeaponInfo>[]
 * @desc List of settings for each weapon type.
 * 
 * @param WeaponX
 * @type number
 * @min -999 @max 999
 * @default -16
 * @desc Adjusts the X coordinate of the weapon.
 * Default value is -16.
 * 
 * @param WeaponY
 * @min -999 @max 999
 * @type number
 * @default 0
 * @desc Adjusts the Y coordinate of the weapon.
 * Default value is 0.
 * 
 * @param WeaponWidth
 * @type string
 * @desc Adjusts the width of the weapon (one pattern).
 * Default value is 96. Formulas available.
 * 
 * @param WeaponHeight
 * @type string
 * @desc Adjusts the height of the weapon (one pattern).
 * Default value is 64. Formulas available.
 * 
 * @param SupportOver30Image
 * @type boolean
 * @default true
 * @desc For example, if the weapon type is the 31st, the 31st image will be selected. No image should be set.
 * 
 * @param SyncActorMotion
 * @type boolean
 * @default true
 * @desc Synchronize the weapon with the actor's motion as much as possible.
 */
//-------------------------------------------------------------
// WeaponInfo
//-------------------------------------------------------------
/*~struct~WeaponInfo:
 * @param WeaponType
 * @type number
 * @desc Weapon type to be set.
 * By default, 1:Dagger, 2:Sword, 3:Flail...
 * 
 * @param WeaponImage
 * @type file
 * @dir img/system
 * @desc Image file corresponding to the weapon type.
 * 
 * @param WeaponIndex
 * @type number @min 1
 * @default 1
 * @desc Index of images (1~12).
 * 
 * @param Motion
 * @type select
 * @option thrust
 * @option swing
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc The standard motion used for weapon attacks.
 * 
 * @param IndexList
 * @type struct<IndexDetail>[]
 * @desc Motion can be defined for each image index.
 * Must be used in conjunction with DynamicMotion.
 */
//-------------------------------------------------------------
// IndexDetail
//-------------------------------------------------------------
/*~struct~IndexDetail:
 * @param WeaponIndex
 * @type number @min 1
 * @desc Index of image (1~12).
 * 
 * @param WeaponKey
 * @type string
 * @desc Value to call the weapon pattern from DynamicMotion.
 * Multiple identical WeaponIndexes can be handled.
 * 
 * @param AdjustX
 * @type number
 * @min -999 @max 999
 * @desc Further adjust the X coordinate of the weapon.
 * 
 * @param AdjustY
 * @min -999 @max 999
 * @type number
 * @desc Further adjust the Y coordinate of the weapon.
 * 
 * @param WeaponPatterns
 * @type string
 * @desc The pattern of the weapon to be executed. e.g.: 0,2,1
 * If 3 or more are specified, the next index is referenced.
 * 
 * @param PriorityPatterns
 * @type string
 * @desc The pattern is to display the weapons in front. e.g. 0,2 would bring the first and third weapons to the front.
 * 
 * @param Motion
 * @type select
 * @option thrust
 * @option swing
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc This motion corresponds to the index.
 * 
 * @param MotionPatterns
 * @type string
 * @desc The pattern of motion to be executed. e.g.: 0,2,1
 * 
 * @param Motion2
 * @type select
 * @option thrust
 * @option swing
 * @option missile
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Additional motions to be executed further.
 * More than 4 patterns can be executed in total.
 * 
 * @param Motion2Patterns
 * @type string
 * @desc The pattern of Motion2 to be executed. Example: 0,2,1
 */

/*:ja
 * @target MV MZ
 * @plugindesc v2.064 武器の表示を拡張します。
 * @author 砂川赳 (http://newrpg.seesaa.net/)
 * @orderBefore NRP_DynamicMotionMZ
 * @url http://newrpg.seesaa.net/article/484348477.html
 *
 * @help サイドビュー戦闘における武器の表示を拡張します。
 * 
 * ◆機能
 * ・武器の表示位置を調整。
 * 　※標準とはサイズの異なるバトラーにも適応できます。
 * ・アクター毎の位置調整も可能。
 * ・武器の１パターン当たりのサイズを変更可。
 * ・３１番目以降の武器画像に対応。
 * 　※デフォルトではWeapons3.pngの６番目（＝３０番目）までしか選択不可。
 * ・武器の色調を変更。
 * ・武器のアニメーションの色調を変更
 * ・武器タイプ毎に独自の画像を設定可能。
 * ・DynamicMotionとの組み合わせにより、
 * 　同じ武器で振ったり突いたりといった動作も可能に。
 * 
 * -------------------------------------------------------------------
 * ■DynamicMotionとの連携
 * -------------------------------------------------------------------
 * いくらか手間はかかりますが、DynamicMotionと組み合わせることにより、
 * 同じ武器で振ったり突いたりといった複雑な動作も可能となります。
 * 
 * まず、system/WeaponsX.pngを改造し、
 * 一つの画像内に『振り』『突き』など複数の武器の動作を作成します。
 * 
 * 次に、プラグインパラメータの『武器情報リスト』に作成した画像を登録します。
 * ここで設定できるモーションは通常攻撃に用いる標準のものです。
 * 
 * さらに『インデックスリスト』にインデックス毎のモーションを定義します。
 * これにより、DynamicMotion側でモーションを呼び出せるようになります。
 * 
 * 例えば、
 * 
 * <D-Motion:attack>
 * weaponIndex = 2
 * </D-Motion>
 * 
 * と、記述した場合、WeaponsX.pngの２つ目のアニメーションを再生し、
 * さらに上で定義したモーションを実行します。
 * 
 * なお、DynamicMotion側で直接画像やモーションを指定することもできます。
 * 以下はWeapons2.pngを指定して、突きのモーションを実行した例です。
 * 
 * <D-Motion:attack>
 * weaponImage = Weapons2
 * weaponIndex = 2
 * motion = thrust
 * </D-Motion>
 * 
 * モーションには通常使用する『振り』『突き』『飛び道具』以外も指定できます。
 * 例えば『アイテム』のモーションを使って、剣を上に掲げるなど、
 * 発想次第で様々な演出が可能です。
 *
 * -------------------------------------------------------------------
 * ■さらに高度な設定（インデックスリスト）
 * -------------------------------------------------------------------
 * インデックスリストの設定によっては、さらに複雑な演出が可能です。
 * こちらもDynamicMotionとの併用が前提になっています。
 * 
 * ◆武器のキー
 * 武器の画像インデックスではなく特有のキーを設定することが可能です。
 * 同一のweaponIndexでも、異なる動作を設定したい場合に活用してください。
 * 値が「test」なら、以下のように呼び出せます。
 * 
 * <D-Motion:attack>
 * weaponKey = test
 * </D-Motion>
 * 
 * ◆武器パターン
 * 実行する武器のパターンです。
 * カンマ区切りで順番に指定してください。
 * 初期値は「0,1,2」です。
 * 例えば、「2,1,0」と設定すると、逆順で武器を振ります。
 * 
 * さらに、3以上を指定すると次の画像インデックスを参照します。
 * 例えば、画像インデックスに1を指定した状態で「0,1,2,3,4」を指定すると、
 * WeaponsX.pngの１つ目のアニメーションを順番に再生した上で、
 * さらに２つ目のアニメーションを２番目まで再生します。
 * 
 * これにより、通常は不可能な４パターン以上の動作が可能となります。
 * 「モーション２」「モーション２パターン」と組み合わせる想定です。
 * 
 * ◆優先パターン
 * 指定した武器パターンのプライオリティを変更します。
 * つまり、イベントにおける「通常キャラより上」と同じように前面表示します。
 * 
 * 例えば、「0,2」と指定した場合は１番目と３番目の武器パターンが、
 * 前面表示されるようになります。
 * 
 * あくまで指定するのは武器パターンの順番です。
 * 武器パターンが「2,1,0」で優先パターンに「0,1」を指定した場合、
 * 前面表示されるのは、武器パターンの「2,1」の部分です。
 * 混同しないように注意してください。
 * 
 * ◆モーションパターン
 * 実行するモーションのパターンです。
 * カンマ区切りで順番に指定してください。
 * 
 * 要領は武器パターンと同じですが、3以上を指定しても無効となります。
 * 
 * ◆モーション２
 * ◆モーション２パターン
 * 追加で実行されるモーションとそのパターンです。
 * 上記のモーションパターンの後に続けて実行されます。
 * 
 * -------------------------------------------------------------------
 * ■アクターのメモ欄
 * -------------------------------------------------------------------
 * <WeaponX:?>
 * 武器のＸ座標を調整します。数式可。
 * マイナスで左に移動します。
 * 
 * <WeaponY:?>
 * 武器のＹ座標を調整します。数式可。
 * マイナスで上に移動します。
 * 
 * -------------------------------------------------------------------
 * ■武器のメモ欄
 * -------------------------------------------------------------------
 * <WeaponImage:Weapons5>
 * Weapons5.pngを武器画像として設定します。
 * ※通常の武器画像と同じく、systemフォルダが対象です。
 * 
 * <WeaponIndex:2>
 * WeaponImageで指定した中で、２番目の画像を武器画像として設定します。
 * 省略した場合は１番目の画像となります。
 * 
 * <AttackMotion:swing>
 * 攻撃時のモーションを『振り』にします。
 * モーションの種類は以下を参考にしてください。
 * 
 * ・突き：thrust
 * ・振り：swing
 * ・飛び道具：missile
 * ・前進：walk
 * ・通常待機：wait
 * ・詠唱待機：chant
 * ・防御：guard
 * ・ダメージ：damage
 * ・回避：evade
 * ・汎用スキル：skill
 * ・魔法：spell
 * ・アイテム：item
 * ・逃げる：escape
 * ・勝利：victory
 * ・瀕死：dying
 * ・状態異常：abnormal
 * ・睡眠：sleep
 * ・戦闘不能：dead
 * 
 * ※詳細はツクールのヘルプにある「資料集＞サイドビューキャラ規格」を
 * 　ご覧ください。
 * 
 * <BlendColor:[255,255,255,255]>
 * 武器に色を合成します。0~255までの数値が有効です。
 * 赤、緑、青、強さの順で設定してください。
 * 
 * <ColorTone:[255,255,255,255]>
 * 武器の色調を変更します。
 * <BlendColor>とは計算方法が異なります。
 * また、こちらは-255~255までの数値が有効です。
 * 
 * <BlendMode:1>
 * 武器の合成方法を変更します。
 * 0:通常、1:加算、2:乗算、3:スクリーン
 * 
 * <Opacity:255>
 * 武器の不透明度を変更します。0~255までの数値が有効です。
 * 
 * -------------------------------------------------------------------
 * ■武器、アクター、敵キャラのメモ欄
 * -------------------------------------------------------------------
 * <AnimationColor:[255,255,255,255]>
 * 通常攻撃アニメーションに色を合成します。
 * 0~255までの数値が有効です。
 * 赤、緑、青、強さの順で設定してください。
 * ※ＭＶ形式のアニメーションのみ有効です。
 * ※敵キャラの通常攻撃アニメーションには、
 * 　NRP_EnemyAttackAnimation.jsなどのプラグインが必要です。
 * 
 * <AnimationTone:[255,255,255,255]>
 * 通常攻撃アニメーションの色調を変更します。
 * <AnimationColor>とは計算方法が異なります。
 * また、こちらは-255~255までの数値が有効です。
 * 
 * <AnimationBlendMode:1>
 * 通常攻撃アニメーションの合成方法を変更します。
 * 0:通常、1:加算、2:乗算、3:スクリーン
 * 
 * -------------------------------------------------------------------
 * ■利用規約
 * -------------------------------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @-----------------------------------------------------
 * @ プラグインパラメータ
 * @-----------------------------------------------------
 * 
 * @param WeaponInfoList
 * @text 武器情報リスト
 * @type struct<WeaponInfo>[]
 * @desc 武器タイプ毎の設定一覧です。
 * 
 * @param WeaponX
 * @text 武器のＸ座標
 * @type number
 * @min -999 @max 999
 * @default -16
 * @desc 武器のＸ座標を調整します。
 * 初期値は-16です。
 * 
 * @param WeaponY
 * @text 武器のＹ座標
 * @min -999 @max 999
 * @type number
 * @default 0
 * @desc 武器のＹ座標を調整します。
 * 初期値は0です。
 * 
 * @param WeaponWidth
 * @text 武器の横幅
 * @type string
 * @desc 武器（１パターン）の横幅を調整します。
 * 初期値は96です。数式化。
 * 
 * @param WeaponHeight
 * @text 武器の縦幅
 * @type string
 * @desc 武器（１パターン）の縦幅を調整します。
 * 初期値は64です。数式化。
 * 
 * @param SupportOver30Image
 * @text ３１以降の画像に対応
 * @type boolean
 * @default true
 * @desc 例えば、武器タイプが３１番目の場合、自動で３１番目の画像が選択されます。画像はなしにしてください。
 * 
 * @param SyncActorMotion
 * @text アクターモーションに同期
 * @type boolean
 * @default true
 * @desc アクターのモーションに武器をなるべく同期させます。
 */
//-------------------------------------------------------------
// WeaponInfo
//-------------------------------------------------------------
/*~struct~WeaponInfo:ja
 * @param WeaponType
 * @text 武器タイプ
 * @type number
 * @desc 設定を行う武器タイプです。
 * 標準では1:短剣, 2:剣, 3:フレイル...
 * 
 * @param WeaponImage
 * @text 画像ファイル
 * @type file
 * @dir img/system
 * @desc 武器タイプに対応する画像ファイルです。
 * 
 * @param WeaponIndex
 * @text 画像インデックス
 * @type number @min 1
 * @default 1
 * @desc 画像のインデックス（1~12）です。
 * 
 * @param Motion
 * @text モーション
 * @type select
 * @option 突き（thrust） @value thrust
 * @option 振り（swing） @value swing
 * @option 飛び道具（missile） @value missile
 * @option 前進（walk） @value walk
 * @option 通常待機（wait） @value wait
 * @option 詠唱待機（chant） @value chant
 * @option 防御（guard） @value guard
 * @option ダメージ（damage） @value damage
 * @option 回避（evade） @value evade
 * @option 汎用スキル（skill） @value skill
 * @option 魔法（spell） @value spell
 * @option アイテム（item） @value item
 * @option 逃げる（escape） @value escape
 * @option 勝利（victory） @value victory
 * @option 瀕死（dying） @value dying
 * @option 状態異常（abnormal） @value abnormal
 * @option 睡眠（sleep） @value sleep
 * @option 戦闘不能（dead） @value dead
 * @desc 武器攻撃に用いる標準のモーションです。
 * 
 * @param IndexList
 * @text インデックスリスト
 * @type struct<IndexDetail>[]
 * @desc 画像インデックス毎のモーションを定義できます。
 * DynamicMotionとの併用が前提です。
 */
//-------------------------------------------------------------
// IndexDetail
//-------------------------------------------------------------
/*~struct~IndexDetail:ja
 * @param WeaponIndex
 * @text 画像インデックス
 * @type number @min 1
 * @desc 画像のインデックス（1~12）です。
 * 
 * @param WeaponKey
 * @text 武器のキー
 * @type string
 * @desc DynamicMotionから武器パターンを呼び出すための値です。
 * 同一の画像インデックスを複数扱いたい場合に。
 * 
 * @param AdjustX
 * @text 武器のＸ座標調整
 * @type number
 * @min -999 @max 999
 * @desc 武器のＸ座標をさらに調整します。
 * 
 * @param AdjustY
 * @text 武器のＹ座標調整
 * @min -999 @max 999
 * @type number
 * @desc 武器のＹ座標をさらに調整します。
 * 
 * @param WeaponPatterns
 * @text 武器パターン
 * @type string
 * @desc 実行する武器のパターンです。例：0,2,1
 * 3以上を指定すると次のインデックスを参照します。
 * 
 * @param PriorityPatterns
 * @text 優先パターン
 * @type string
 * @desc 武器を前面表示するパターンです。
 * 例：0,2なら１番目と３番目を前面表示します。
 * 
 * @param Motion
 * @text モーション
 * @type select
 * @option 突き（thrust） @value thrust
 * @option 振り（swing） @value swing
 * @option 飛び道具（missile） @value missile
 * @option 前進（walk） @value walk
 * @option 通常待機（wait） @value wait
 * @option 詠唱待機（chant） @value chant
 * @option 防御（guard） @value guard
 * @option ダメージ（damage） @value damage
 * @option 回避（evade） @value evade
 * @option 汎用スキル（skill） @value skill
 * @option 魔法（spell） @value spell
 * @option アイテム（item） @value item
 * @option 逃げる（escape） @value escape
 * @option 勝利（victory） @value victory
 * @option 瀕死（dying） @value dying
 * @option 状態異常（abnormal） @value abnormal
 * @option 睡眠（sleep） @value sleep
 * @option 戦闘不能（dead） @value dead
 * @desc インデックスに対応するモーションです。
 * 
 * @param MotionPatterns
 * @text モーションパターン
 * @type string
 * @desc 実行するモーションのパターンです。例：0,2,1
 * 
 * @param Motion2
 * @text モーション２
 * @type select
 * @option 突き（thrust） @value thrust
 * @option 振り（swing） @value swing
 * @option 飛び道具（missile） @value missile
 * @option 前進（walk） @value walk
 * @option 通常待機（wait） @value wait
 * @option 詠唱待機（chant） @value chant
 * @option 防御（guard） @value guard
 * @option ダメージ（damage） @value damage
 * @option 回避（evade） @value evade
 * @option 汎用スキル（skill） @value skill
 * @option 魔法（spell） @value spell
 * @option アイテム（item） @value item
 * @option 逃げる（escape） @value escape
 * @option 勝利（victory） @value victory
 * @option 瀕死（dying） @value dying
 * @option 状態異常（abnormal） @value abnormal
 * @option 睡眠（sleep） @value sleep
 * @option 戦闘不能（dead） @value dead
 * @desc モーションの後にさらに実行するモーションです。
 * 連結することで４パターン以上を実行できます。
 * 
 * @param Motion2Patterns
 * @text モーション２パターン
 * @type string
 * @desc 実行するモーション２のパターンです。例：0,2,1
 */

(function() {
"use strict";

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
function toBoolean(str) {
    if (str == true) {
        return true;
    }
    return (str == "true") ? true : false;
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

const parameters = PluginManager.parameters("NRP_WeaponSetting");
const pWeaponInfoList = parseStruct2(parameters["WeaponInfoList"]);
const pWeaponX = toNumber(parameters["WeaponX"], 0);
const pWeaponY = toNumber(parameters["WeaponY"], 0);
const pWeaponWidth = setDefault(parameters["WeaponWidth"]);
const pWeaponHeight = setDefault(parameters["WeaponHeight"]);
const pSupportOver30Image = toBoolean(parameters["SupportOver30Image"]);
const pSyncActorMotion = toBoolean(parameters["SyncActorMotion"], true);

//-----------------------------------------------------------------------------
// Sprite_Weapon
//-----------------------------------------------------------------------------

/**
 * ●武器画像読込
 */
const _Sprite_Weapon_loadBitmap = Sprite_Weapon.prototype.loadBitmap;
Sprite_Weapon.prototype.loadBitmap = function() {
    // 武器の持ち主を取得
    const battler = this.parent._battler;
    if (battler && battler.weapons()) {
        // ファイル名の指定がある場合（DynamicMotionで設定）
        if (this._weaponImage) {
            this.bitmap = ImageManager.loadSystem(this._weaponImage);
            return;
        }

        // 武器を取得
        const dataWeapon = this.dataWeapon();

        // 画像の指定がある場合は読み込む
        const weaponImage = dataWeapon.meta.WeaponImage;
        if (weaponImage) {
            this.bitmap = ImageManager.loadSystem(weaponImage);
            return;
        }

        // DynamicMotionが有効かつ武器タイプの指定がある場合はそちらを優先取得
        let dynamicWeaponType = null;
        const dm = this.parent.dynamicMotion;
        if (dm && dm.weaponType) {
            dynamicWeaponType = dm.weaponType;
        }

        // 武器情報リストを参照
        const weaponInfo = getWeaponInfo(dataWeapon, dynamicWeaponType);
        if (weaponInfo && weaponInfo.WeaponImage) {
            this.bitmap = ImageManager.loadSystem(weaponInfo.WeaponImage);
            return;
        }
    }

    _Sprite_Weapon_loadBitmap.apply(this, arguments);
};

const _Sprite_Weapon_updatePattern = Sprite_Weapon.prototype.updatePattern;
Sprite_Weapon.prototype.updatePattern = function() {
    // 複雑なパターン制御を行う場合
    if (this._isChangeWeaponPattern) {
        this._pattern++;
        // ４つ目以降のパターン変化に対応するため、武器画像の自動非表示を行わない。
        // if (this._pattern >= 3) {
        //     this._weaponImageId = 0;
        // }
        return;
    }

    _Sprite_Weapon_updatePattern.apply(this, arguments);
};

/**
 * 【上書】フレーム更新
 */
Sprite_Weapon.prototype.updateFrame = function() {
    if (this._weaponImageId > 0) {
        let pattern = this._pattern;

        // 武器データを取得
        const dataWeapon = this.dataWeapon();
        // 武器情報リストを参照
        const weaponInfo = getWeaponInfo(dataWeapon);
        // 武器のインデックス情報を元に更新
        const retPattern = this.updateFrameIndexDetail(dataWeapon, weaponInfo)

        // 武器画像を非表示にした場合は終了
        if (this._weaponImageId == 0) {
            this.setFrame(0, 0, 0, 0);
            this._isChangeWeaponPattern = false;
            return;
        }

        // 戻り値のパターンがあれば更新
        if (retPattern != null) {
            pattern = retPattern;
        }

        let index = (this._weaponImageId - 1) % 12;

        // インデックスの指定がある場合（DynamicMotionで設定）
        if (this._weaponIndex) {
            index = eval(this._weaponIndex) - 1;

        // いずれかの指定がある場合
        } else if (dataWeapon) {
            // 画像の指定を取得
            const weaponImage = dataWeapon.meta.WeaponImage;
            // インデックスの指定を取得
            const weaponIndex = dataWeapon.meta.WeaponIndex;
            if (weaponImage || weaponIndex) {
                index = weaponIndex ? weaponIndex - 1 : 0;
            // 武器情報リストを参照
            } else if (weaponInfo && weaponInfo.WeaponIndex) {
                index = weaponInfo.WeaponIndex - 1;
            }
        }

        const w = pWeaponWidth ? eval(pWeaponWidth) : 96;
        const h = pWeaponHeight ? eval(pWeaponHeight) : 64;
        let sx;
        let sy;
        if (pattern <= 2) {
            sx = (Math.floor(index / 6) * 3 + pattern) * w;
            sy = Math.floor(index % 6) * h;

        // パターンが３以上の場合は次の段を参照
        } else if (pattern > 2) {
            const newIndex = index + Math.floor(pattern / 3);
            const newPattern = pattern % 3;
            sx = (Math.floor(newIndex / 6) * 3 + newPattern) * w;
            sy = Math.floor(newIndex % 6) * h;
        }
        
        this.setFrame(sx, sy, w, h);

    } else {
        this.setFrame(0, 0, 0, 0);
    }

    // 本体の動きと武器を同期する。
    if (pSyncActorMotion) {
        this.parent.updateFrame();
    }
};

/**
 * 【独自】フレーム更新内での武器パターン制御
 */
Sprite_Weapon.prototype.updateFrameIndexDetail = function(dataWeapon, weaponInfo) {
    let pattern = null;

    // DynamicMotionを参照し、武器のインデックス情報を取得
    const dm = this.parent.dynamicMotion;

    // 武器情報が取得できない場合は処理しない。
    if (!dataWeapon || !weaponInfo || !dm) {
        return;
    }

    const indexDetail = getWeaponIndexDetail(weaponInfo, dm.weaponIndex, dm.weaponKey);

    // 詳細が取得できない場合は処理しない。
    if (!indexDetail) {
        return;
    }

    // 武器＆モーションパターンの独自制御を行う場合
    if (this._isChangeWeaponPattern) {
        // 武器パターンの指定があれば参照
        if (indexDetail.WeaponPatterns) {
            const weaponPatterns = indexDetail.WeaponPatterns.split(",");
            pattern = eval(weaponPatterns[this._pattern]);
            // 最大値を超えている場合は武器画像を非表示
            if (pattern == null) {
                this._weaponImageId = 0;
                return;
            }
        }

        // モーションパターンの指定があれば参照
        if (this._weaponImageId > 0 && indexDetail.MotionPatterns) {
            const motionPatterns = indexDetail.MotionPatterns.split(",");
            let motionPattern = eval(motionPatterns[this._pattern]);

            // 最大値を超えている場合
            if (motionPattern == null) {
                // モーション２の指定がある場合はそちらから取得
                if (indexDetail.Motion2Patterns) {
                    const motion2Patterns = indexDetail.Motion2Patterns.split(",");
                    motionPattern = eval(motion2Patterns[this._pattern - motionPatterns.length]);
                    // 本体のモーションを変更
                    // ※ただし、既に反映済の場合は除く
                    if (this.parent._motion != Sprite_Actor.MOTIONS[indexDetail.Motion2]) {
                        this.parent.startMotion(indexDetail.Motion2);
                    }

                // それ以外
                } else {
                    // 最終パターンを参照
                    motionPattern = eval(motionPatterns[motionPatterns.length - 1]);
                }
            }

            // 本体のモーションパターンに反映
            this.parent._pattern = motionPattern;
        }
    }

    // 優先度の指定があれば参照
    if (this._weaponImageId > 0 && indexDetail.PriorityPatterns) {
        const priorityPatterns = indexDetail.PriorityPatterns.split(",");
        // 一致する場合は前面表示
        if (priorityPatterns.includes(String(this._pattern))) {
            // weaponSpriteを削除して、前面に移動
            this.parent.addChild(this.parent.removeChild(this));
        // それ以外は背面表示（元に戻す）
        } else {
            // weaponSpriteを削除して、本体より背後に移動
            const bodyIndex = this.parent.children.indexOf(this.parent.mainSprite());
            this.parent.addChildAt(this.parent.removeChild(this), bodyIndex - 1);
        }
    }

    return pattern;
}

/**
 * ●武器の設定
 */
const _Sprite_Weapon_setup = Sprite_Weapon.prototype.setup;
Sprite_Weapon.prototype.setup = function(weaponImageId) {
    // weaponSpriteを削除して、本体より背後に移動
    const bodyIndex = this.parent.children.indexOf(this.parent.mainSprite());
    this.parent.addChildAt(this.parent.removeChild(this), bodyIndex - 1);

    // 本来の処理（updateFrameも呼ばれるので注意）
    _Sprite_Weapon_setup.apply(this, arguments);

    const battler = this.parent._battler;

    // 通常、武器はアクター専用だが、animatedSVEnemies.jsによる敵も考慮
    const isActor = battler.isActor();
    const dataBattler = isActor ? battler.actor() : battler.enemy();

    this.x = isActor ? pWeaponX : pWeaponX * -1;
    this.y = pWeaponY;

    // 武器の持ち主を取得
    if (battler) {
        const adjustX = dataBattler.meta.WeaponX;
        const adjustY = dataBattler.meta.WeaponY;
        if (adjustX) {
            this.x += eval(adjustX);
        }
        if (adjustY) {
            this.y += eval(adjustY);
        }
    }

    this._isChangeWeaponPattern = false;
    this._weaponPatternCount = null;

    // 武器データを取得
    const dataWeapon = this.dataWeapon();
    if (!dataWeapon) {
        return;
    }

    // 武器情報リストを参照
    const weaponInfo = getWeaponInfo(dataWeapon);
    // DynamicMotionを参照し、武器のインデックス情報を取得
    const dm = this.parent.dynamicMotion;
    if (weaponInfo && dm) {
        // 武器のインデックス情報を取得
        const indexDetail = getWeaponIndexDetail(weaponInfo, dm.weaponIndex, dm.weaponKey);
        if (indexDetail) {
            // 座標の調整
            if (indexDetail.AdjustX != null) {
                this.x += Number(indexDetail.AdjustX);
            }
            if (indexDetail.AdjustY != null) {
                this.y += Number(indexDetail.AdjustY);
            }

            // 武器パターンおよびモーションパターンの指定がある場合
            if (indexDetail.WeaponPatterns || indexDetail.MotionPatterns) {
                // DynamicMotionによるアクターと武器スプライトの同期を停止する。
                this._isChangeWeaponPattern = true;
            }
        }
    }

    // 色指定があれば設定
    const blendColor = dataWeapon.meta.BlendColor;
    if (blendColor) {
        this.setBlendColor(eval(blendColor));
    } else {
        this.setBlendColor([0, 0, 0, 0]);
    }
    
    // トーン指定があれば設定
    const colorTone = dataWeapon.meta.ColorTone;
    if (colorTone) {
        this.setColorTone(eval(colorTone));
    } else {
        this.setColorTone([0, 0, 0, 0]);
    }

    // 合成方法があれば設定
    const blendMode = dataWeapon.meta.BlendMode;
    if (blendMode) {
        this.blendMode = eval(blendMode);
    }

    // 不透明度があれば設定
    const opacity = dataWeapon.meta.Opacity;
    if (opacity) {
        this.opacity = eval(opacity);
    }
};

/**
 * 【独自】武器情報を取得する。
 * ※通常、武器のスプライトから武器情報は取得できないが。
 * 　DynamicMotion側で情報を設定している場合のみ取得できる。
 */
Sprite_Weapon.prototype.dataWeapon = function() {
    // 武器の持ち主を取得
    const battler = this.parent._battler;
    if (battler) {
        // 武器ＩＤを取得できる場合
        // ※通常は存在しない項目（DynamicMotionで設定）
        if (this._weaponId) {
            // 武器データを取得
            return $dataWeapons[this._weaponId];
        // 通常時
        } else if (battler.weapons()[0]) {
            // アクターから武器データを取得
            return $dataWeapons[battler.weapons()[0].id];
        }
    }
    return null;
}

/**
 * 【独自】パターン数を取得する。
 */
Sprite_Weapon.prototype.weaponPatternCount = function(weaponIndex, weaponKey) {
    // 武器データ＆武器情報リストを取得
    const dataWeapon = this.dataWeapon();
    const weaponInfo = getWeaponInfo(dataWeapon);

    if (weaponInfo) {
        // 武器のインデックス情報を取得
        const indexDetail = getWeaponIndexDetail(weaponInfo, weaponIndex, weaponKey);
        if (indexDetail) {
            // 武器パターンの指定がある場合
            if (indexDetail.WeaponPatterns) {
                // DynamicMotionで参照するパターン数
                return indexDetail.WeaponPatterns.split(",").length;
            }
        }
    }

    return 3;
}

/**
 * 【独自】武器キーの設定
 * ※DynamicMotionから設定
 */
Sprite_Weapon.prototype.setWeaponKey = function(weaponKey) {
    if (!weaponKey) {
        return;
    }
    this._weaponKey = weaponKey;

    // 武器データ＆武器情報リストを取得
    const dataWeapon = this.dataWeapon();
    const weaponInfo = getWeaponInfo(dataWeapon);

    // weaponIndexを設定する。
    if (weaponInfo) {
        const indexDetail = getWeaponIndexDetail(weaponInfo, null, weaponKey);
        this._weaponIndex = eval(indexDetail.WeaponIndex);
    }
}

//-----------------------------------------------------------------------------
// Spriteset_Battle
//-----------------------------------------------------------------------------

/**
 * ●システム画像の読込
 */
const _Spriteset_Battle_loadSystemImages = Spriteset_Battle.prototype.loadSystemImages;
Spriteset_Battle.prototype.loadSystemImages = function() {
    _Spriteset_Battle_loadSystemImages.apply(this, arguments);

    // 武器画像ファイルのリストを作成（Setを使用して重複除去）
    const weaponSet = new Set();
    for (const weaponInfo of pWeaponInfoList) {
        if (weaponInfo.WeaponImage) {
            weaponSet.add(weaponInfo.WeaponImage);
        }
    }

    // 画像を事前読込
    for (const weaponImage of weaponSet) {
        ImageManager.loadSystem(weaponImage);
    }
};

//-----------------------------------------------------------------------------
// Game_Battler
//-----------------------------------------------------------------------------

if (pSupportOver30Image) {
    /**
     * ●武器アニメーションの開始
     */
    const _Game_Battler_startWeaponAnimation = Game_Battler.prototype.startWeaponAnimation;
    Game_Battler.prototype.startWeaponAnimation = function(weaponImageId) {
        if (!weaponImageId) {
            const weapons = this.weapons();
            const wtypeId = weapons[0] ? weapons[0].wtypeId : 0;
            // 武器タイプが３１以上の場合、自動的に画像を設定
            if (wtypeId >= 31) {
                this._weaponImageId = wtypeId
                return;
            }
        }

        _Game_Battler_startWeaponAnimation.apply(this, arguments);
    };
}

//-----------------------------------------------------------------------------
// Game_Actor
//-----------------------------------------------------------------------------

/**
 * ●武器振り演出
 */
const _Game_Actor_performAttack = Game_Actor.prototype.performAttack;
Game_Actor.prototype.performAttack = function() {
    // 武器を取得
    const weapon = getWeapon(this);

    if (weapon) {
        const attackMotionName = getAttackMotionName(this, weapon)
        // モーションの指定が存在すれば設定
        if (attackMotionName) {
            this.requestMotion(attackMotionName);
            const attackMotion = $dataSystem.attackMotions[weapon.wtypeId];
            this.startWeaponAnimation(attackMotion.weaponImageId);
            return;
        }
    }

    _Game_Actor_performAttack.apply(this, arguments);
};

/**
 * ●攻撃モーション名を取得
 * ※優先度：武器情報リストのインデックスリスト ＞ 武器毎の設定 ＞ 武器情報リスト
 */
function getAttackMotionName(battler, weapon) {
    // 武器タイプ毎の情報を取得
    const weaponInfo = getWeaponInfo(weapon);
    if (!weaponInfo) {
        // 取得できない場合でも、武器毎の設定があれば取得
        if (weapon.meta.AttackMotion) {
            return weapon.meta.AttackMotion;
        }
        return;
    }

    // アクターのスプライトを取得
    const spriteBattler = getBattlerSprite(battler);
    if (!spriteBattler) {
        return;
    }

    // DynamicMotionを参照し、武器のインデックス情報を取得
    const dm = spriteBattler.dynamicMotion;
    if (dm) {
        const indexDetail = getWeaponIndexDetail(weaponInfo, dm.weaponIndex, dm.weaponKey);
        if (indexDetail) {
            return indexDetail.Motion;
        }
    }

    // 武器毎の設定を取得
    if (weapon.meta.AttackMotion) {
        return weapon.meta.AttackMotion;
    }

    // 指定がない場合、武器情報リストを参照
    return weaponInfo.Motion;
}

/**
 * ●アクターの対象とする武器を取得
 */
function getWeapon(actor) {
    // 武器を取得
    let weapon = actor.weapons()[0];
    // DynamicMotionで設定されている場合はそちらを参照
    // ※通常は存在しない項目
    if (actor._weaponId) {
        // 武器データを取得
        weapon = $dataWeapons[actor._weaponId];
    }
    // 正常なデータを取得できない場合はnull
    // ※animatedSVEnemies.js用に調整
    if (weapon == null || weapon.id == null) {
        return null;
    }
    return weapon;
}

//-----------------------------------------------------------------------------
// Sprite_Animation / Sprite_AnimationMV
//-----------------------------------------------------------------------------

/**
 * ●セルの更新（ＭＶ）
 */
const _Sprite_Animation_updateCellSprite = Sprite_Animation.prototype.updateCellSprite;
Sprite_Animation.prototype.updateCellSprite = function(sprite, cell) {
    _Sprite_Animation_updateCellSprite.apply(this, arguments);
    // セルの色調変更
    changeAnimationColor(sprite, cell, this);
}

/**
 * ●セルの更新（ＭＺ）
 */
const _Sprite_AnimationMV_updateCellSprite = Sprite_AnimationMV.prototype.updateCellSprite;
Sprite_AnimationMV.prototype.updateCellSprite = function(sprite, cell) {
    _Sprite_AnimationMV_updateCellSprite.apply(this, arguments);
    // セルの色調変更
    changeAnimationColor(sprite, cell, this);
}

/**
 * ●セルの色調変更
 */
function changeAnimationColor(sprite, cell, spriteAnimation) {
    // 戦闘中以外は対象外
    // ※戦闘終了後もBattleManager._subjectは残るので事故防止
    if (!$gameParty.inBattle()) {
        return;
    }

    // 現在の行動主体を取得
    const subject = BattleManager._subject;
    const pattern = cell[0];
    if (pattern >= 0 && subject) {
        // 敵キャラはアニメーションを保有していないので考慮
        const animation1 = subject.attackAnimationId1 ? subject.attackAnimationId1() : 0;
        const animation2 = subject.attackAnimationId2 ? subject.attackAnimationId2() : 0;

        // 武器のアニメーションではない場合
        if (spriteAnimation._animation.id != animation1
            && spriteAnimation._animation.id != animation2) {
            // 変更しない。
            return;
        }

        // 武器が有効な場合
        if (subject.weapons) {
            // 武器を取得
            const weapon = getWeapon(subject);
            if (weapon) {
                if (setAnimationColor(sprite, weapon)) {
                    // 設定を反映した場合は終了
                    return;
                }
            }
        }

        let data;
        // アクターおよび敵キャラによる色変更
        if (subject.isActor()) {
            data = subject.actor();
        } else if (subject.isEnemy()) {
            data = subject.enemy();
        }
        setAnimationColor(sprite, data);
    }
}

/**
 * ●アニメーションを反映
 */
function setAnimationColor(sprite, data) {
    const blendColor = data.meta.AnimationColor;
    const colorTone = data.meta.AnimationTone;
    const blendMode = data.meta.AnimationBlendMode;

    // 設定がない場合は処理しない。
    if (!blendColor && !colorTone && !blendMode) {
        return false;
    }

    // 色調変更すると合成方法がクリアされるので元の値を保持
    const keepBlendMode = sprite.blendMode;

    // 色調
    if (blendColor) {
        sprite.setBlendColor(eval(blendColor));
    }
    // 色相
    if (colorTone) {
        sprite.setColorTone(eval(colorTone));
    }
    // 合成方法
    if (blendMode) {
        sprite.blendMode = blendMode;
    } else {
        sprite.blendMode = keepBlendMode;
    }
    return true;
}

//-----------------------------------------------------------------------------
// 共通関数
//-----------------------------------------------------------------------------

/**
 * ●武器情報を取得
 */
function getWeaponInfo(weapon, weaponType) {
    if (!weapon) {
        return null;
    }

    // 武器タイプの直接指定がある場合はそちらを優先
    if (weaponType) {
        return pWeaponInfoList.find(w => w.WeaponType == weaponType);
    }
    return pWeaponInfoList.find(w => w.WeaponType == weapon.wtypeId);
}

/**
 * ●武器のインデックス情報を取得
 */
function getWeaponIndexDetail(weaponInfo, weaponIndex, weaponKey) {
    // weaponKeyが指定されている場合
    if (weaponKey) {
        const indexList = parseStruct2(weaponInfo.IndexList);
        return indexList.find(i => i.WeaponKey == weaponKey);

    // weaponIndexが指定されている場合
    } else if (weaponIndex) {
        const indexList = parseStruct2(weaponInfo.IndexList);
        return indexList.find(i => i.WeaponIndex == weaponIndex);
    }
    return null;
}

/**
 * ●指定したバトラーのスプライトを取得する。
 * ※実際にはマップ時のSprite_Characterも対象
 */
function getBattlerSprite(battler) {
    if (!battler) {
        return undefined;
    }

    let sprites;
    let sprite;
    const spriteset = getSpriteset();

    // マップ上ではキャラクタースプライトを返す。
    if (!$gameParty.inBattle()) {
        sprites = spriteset._characterSprites;
        sprite = sprites.find(s => s._character == battler);

    // 戦闘中はバトラースプライトを返す。
    } else  {
        sprites = spriteset.battlerSprites();
        sprite = sprites.find(s => s._battler == battler);
    }

    // 一致があれば返す
    return sprite;
}

/**
 * ●現在の画面のSpritesetを取得する。
 */
function getSpriteset() {
    // 戦闘
    if ($gameParty.inBattle()) {
        return BattleManager._spriteset;
    // マップ
    } else {
        return SceneManager._scene._spriteset;
    }
}

})();
