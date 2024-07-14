//=============================================================================
// NRP_MotionSetting.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.04 Set up various motions in side-view battle.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @orderBefore NRP_DynamicMotionMZ
 * @url http://newrpg.seesaa.net/article/475560242.html
 *
 * @help Set up various motions in side-view battle.
 * 
 * 1. display time for each type of motion.
 * 2. forward and backward time.
 * 3. motion at various points in time.
 * ...etc.
 * 
 * Allows you to set the display time in 1/60 second increments.
 * In the case of motion, it is 1 pattern display time.
 * The default value for each of the MVs is 12 This means 12/60 seconds.
 * Normally 3 patterns = 1 motion, so that's 36/60 seconds.
 * 
 * -------------------------------------------------------------------
 * [Notes]
 * -------------------------------------------------------------------
 * This plugin should be placed above NRP_DynamicMotion.
 * Otherwise, it is recommended to place it near the top.
 * 
 * Starting from ver1.03, it is possible to set "none" for motion.
 * For example, you can disable the motion when executing a skill.
 * Do not accidentally select "none"
 * when resetting to the default setting.
 * In that case, use the Delete key to leave it blank.
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
 * @param <MotionTime>
 * 
 * @param defaultTime
 * @parent <MotionTime>
 * @type number
 * @desc Initial value of time to be applied if not specified.
 * If you blank each item, this value is applied. (blank:12)
 * 
 * @param walk
 * @parent <MotionTime>
 * @type number
 * @min 1
 * @desc Motion time for walk.
 * In reality, this is also the case when waiting for a command.
 * 
 * @param wait
 * @parent <MotionTime>
 * @type number
 * @min 1
 * @desc Motion time in wait.
 * To be precise, it means waiting after the command is entered.
 * 
 * @param chant
 * @parent <MotionTime>
 * @type number
 * @min 1
 * 
 * @param guard
 * @parent <MotionTime>
 * @type number
 * @min 1
 * 
 * @param damage
 * @parent <MotionTime>
 * @type number
 * @min 1
 * 
 * @param evade
 * @parent <MotionTime>
 * @type number
 * @min 1
 * 
 * @param thrust
 * @parent <MotionTime>
 * @type number
 * @min 1
 * 
 * @param swing
 * @parent <MotionTime>
 * @type number
 * @min 1
 * 
 * @param missile
 * @parent <MotionTime>
 * @type number
 * @min 1
 * 
 * @param skill
 * @parent <MotionTime>
 * @type number
 * @min 1
 * 
 * @param spell
 * @parent <MotionTime>
 * @type number
 * @min 1
 * 
 * @param item
 * @parent <MotionTime>
 * @type number
 * @min 1
 * 
 * @param escape
 * @parent <MotionTime>
 * @type number
 * @min 1
 * 
 * @param victory
 * @parent <MotionTime>
 * @type number
 * @min 1
 * 
 * @param dying
 * @parent <MotionTime>
 * @type number
 * @min 1
 * 
 * @param abnormal
 * @parent <MotionTime>
 * @type number
 * @min 1
 * 
 * @param sleep
 * @parent <MotionTime>
 * @type number
 * @min 1
 * 
 * @param dead
 * @parent <MotionTime>
 * @type number
 * @min 1
 * 
 * @param <MovingTime>
 * 
 * @param stepForward
 * @parent <MovingTime>
 * @type number
 * @min 1
 * @desc The time required to step forward at the start of the action.
 * The default value of MV is 12.
 * 
 * @param stepBack
 * @parent <MovingTime>
 * @type number
 * @min 1
 * @desc The time required to step back at the end of the action.
 * The default value of MV is 12.
 * 
 * @param <DefaultMotion>
 * 
 * @param inputtingMotion
 * @parent <DefaultMotion>
 * @type select
 * @option none
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Motion name at command input.
 * The default value is "walk".
 * 
 * @param actingMotion
 * @parent <DefaultMotion>
 * @type select
 * @option none
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Motion name during the action.
 * The default value is "walk".
 * 
 * @param undecidedMotion
 * @parent <DefaultMotion>
 * @type select
 * @option none
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Motion name before the action is decided.
 * The default value is "walk".
 * 
 * @param waitMotion
 * @parent <DefaultMotion>
 * @type select
 * @option none
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Motion of wait (after action is decided).
 * The initial value is "wait".
 * 
 * @param chantMotion
 * @parent <DefaultMotion>
 * @type select
 * @option none
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc The motion of the chant.
 * 
 * @param guardMotion
 * @parent <DefaultMotion>
 * @type select
 * @option none
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc The motion of the guard.
 * 
 * @param damageMotion
 * @parent <DefaultMotion>
 * @type select
 * @option none
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc The motion of the damage.
 * 
 * @param evadeMotion
 * @parent <DefaultMotion>
 * @type select
 * @option none
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc The motion of the evade.
 * 
 * @param skillMotion
 * @parent <DefaultMotion>
 * @type select
 * @option none
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc The motion of the skill.
 * 
 * @param spellMotion
 * @parent <DefaultMotion>
 * @type select
 * @option none
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc The motion of the spell.
 * 
 * @param itemMotion
 * @parent <DefaultMotion>
 * @type select
 * @option none
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc The motion of the item.
 * 
 * @param escapeMotion
 * @parent <DefaultMotion>
 * @type select
 * @option none
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc The motion of the escape.
 * 
 * @param victoryMotion
 * @parent <DefaultMotion>
 * @type select
 * @option none
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc The motion of the victory.
 * 
 * @param dyingMotion
 * @parent <DefaultMotion>
 * @type select
 * @option none
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc The motion of the dying.
 * 
 * @param abnormalMotion
 * @parent <DefaultMotion>
 * @type select
 * @option none
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc The motion of the abnormal.
 * 
 * @param sleepMotion
 * @parent <DefaultMotion>
 * @type select
 * @option none
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc The motion of the sleep.
 * 
 * @param deadMotion
 * @parent <DefaultMotion>
 * @type select
 * @option none
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc The motion of the dead.
 * 
 * @param <Other>
 * 
 * @param escapePriority
 * @parent <Other>
 * @type boolean
 * @default false
 * @desc Priority is given to the escape motion even when the action is restricted.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.04 サイドビュー戦闘における各種モーション設定を行います。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @orderBefore NRP_DynamicMotionMZ
 * @url http://newrpg.seesaa.net/article/475560242.html
 *
 * @help サイドビュー戦闘における各種モーション設定を行います。
 * 
 * ・各種モーションの表示時間
 * ・前進・後退時間
 * ・各種状態でのモーション
 * ……などが設定可能です。
 * 
 * 設定できる時間はいずれも1/60秒単位です。
 * モーションの場合は１パターンの表示時間です。
 * MVのデフォルトの各初期値はいずれも12となっていますが、
 * これは12/60秒を意味します。
 * 通常は３パターン＝１モーションとなるので、36/60秒となります。
 * 
 * -------------------------------------------------------------------
 * ■注意点
 * -------------------------------------------------------------------
 * このプラグインはNRP_DynamicMotionよりも上に配置してください。
 * それ以外の場合も、基本的には上側への配置を推奨します。
 * 
 * ver1.03より、モーションに「なし」を設定できるようになりました。
 * 例えば、スキルを実行する時のモーションを無効にできます。
 * 初期設定に戻す場合に誤って「なし」を選ばないでください。
 * その場合はDeleteキーで空白にしてください。
 * 
 * -------------------------------------------------------------------
 * ■利用規約
 * -------------------------------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @-----------------------------------------------------
 * @ Plugin Parameters
 * @-----------------------------------------------------
 * 
 * @param <MotionTime>
 * @text ＜各種モーション時間＞
 * 
 * @param defaultTime
 * @text モーション時間の初期値
 * @parent <MotionTime>
 * @type number
 * @desc 指定がない場合に適用される時間の初期値です。
 * 各項目をブランクにすると、この値が適用されます。空白:12
 * 
 * @param walk
 * @text 前進（コマンド待ち）
 * @parent <MotionTime>
 * @type number
 * @min 1
 * @desc 前進時のモーション時間です。
 * 実際にはコマンド待ちや、後退時もこの状態になります。
 * 
 * @param wait
 * @text 通常待機
 * @parent <MotionTime>
 * @type number
 * @min 1
 * @desc 通常待機時のモーション時間です。
 * 正確にはコマンド入力後の待機状態を指します。
 * 
 * @param chant
 * @text 詠唱待機
 * @parent <MotionTime>
 * @type number
 * @min 1
 * 
 * @param guard
 * @text 防御
 * @parent <MotionTime>
 * @type number
 * @min 1
 * 
 * @param damage
 * @text ダメージ
 * @parent <MotionTime>
 * @type number
 * @min 1
 * 
 * @param evade
 * @text 回避
 * @parent <MotionTime>
 * @type number
 * @min 1
 * 
 * @param thrust
 * @text 突き
 * @parent <MotionTime>
 * @type number
 * @min 1
 * 
 * @param swing
 * @text 振り
 * @parent <MotionTime>
 * @type number
 * @min 1
 * 
 * @param missile
 * @text 飛び道具
 * @parent <MotionTime>
 * @type number
 * @min 1
 * 
 * @param skill
 * @text 汎用スキル
 * @parent <MotionTime>
 * @type number
 * @min 1
 * 
 * @param spell
 * @text 魔法
 * @parent <MotionTime>
 * @type number
 * @min 1
 * 
 * @param item
 * @text アイテム
 * @parent <MotionTime>
 * @type number
 * @min 1
 * 
 * @param escape
 * @text 逃げる
 * @parent <MotionTime>
 * @type number
 * @min 1
 * 
 * @param victory
 * @text 勝利
 * @parent <MotionTime>
 * @type number
 * @min 1
 * 
 * @param dying
 * @text 瀕死
 * @parent <MotionTime>
 * @type number
 * @min 1
 * 
 * @param abnormal
 * @text 状態異常
 * @parent <MotionTime>
 * @type number
 * @min 1
 * 
 * @param sleep
 * @text 睡眠
 * @parent <MotionTime>
 * @type number
 * @min 1
 * 
 * @param dead
 * @text 戦闘不能
 * @parent <MotionTime>
 * @type number
 * @min 1
 * 
 * @param <MovingTime>
 * @text ＜移動時間＞
 * 
 * @param stepForward
 * @text 前進時間
 * @parent <MovingTime>
 * @type number
 * @min 1
 * @desc 行動時に一歩前へ出る際の所要時間です。
 * MVの初期値は12です。
 * 
 * @param stepBack
 * @text 後退時間
 * @parent <MovingTime>
 * @type number
 * @min 1
 * @desc 行動終了時に後ろへ戻る際の所要時間です。
 * MVの初期値は12です。
 * 
 * @param <DefaultMotion>
 * @text ＜標準モーション＞
 * 
 * @param inputtingMotion
 * @text 入力時のモーション
 * @parent <DefaultMotion>
 * @type select
 * @option なし @value none
 * @option 前進（walk） @value walk
 * @option 通常待機（wait） @value wait
 * @option 詠唱待機（chant） @value chant
 * @option 防御（guard） @value guard
 * @option ダメージ（damage） @value damage
 * @option 回避（evade） @value evade
 * @option 突き（thrust） @value thrust
 * @option 振り（swing） @value swing
 * @option 飛び道具（missile） @value missile
 * @option 汎用スキル（skill） @value skill
 * @option 魔法（spell） @value spell
 * @option アイテム（item） @value item
 * @option 逃げる（escape） @value escape
 * @option 勝利（victory） @value victory
 * @option 瀕死（dying） @value dying
 * @option 状態異常（abnormal） @value abnormal
 * @option 睡眠（sleep） @value sleep
 * @option 戦闘不能（dead） @value dead
 * @desc コマンド入力時のモーション名です。
 * 初期値は前進（walk）です。
 * 
 * @param actingMotion
 * @text アクション中のモーション
 * @parent <DefaultMotion>
 * @type select
 * @option なし @value none
 * @option 前進（walk） @value walk
 * @option 通常待機（wait） @value wait
 * @option 詠唱待機（chant） @value chant
 * @option 防御（guard） @value guard
 * @option ダメージ（damage） @value damage
 * @option 回避（evade） @value evade
 * @option 突き（thrust） @value thrust
 * @option 振り（swing） @value swing
 * @option 飛び道具（missile） @value missile
 * @option 汎用スキル（skill） @value skill
 * @option 魔法（spell） @value spell
 * @option アイテム（item） @value item
 * @option 逃げる（escape） @value escape
 * @option 勝利（victory） @value victory
 * @option 瀕死（dying） @value dying
 * @option 状態異常（abnormal） @value abnormal
 * @option 睡眠（sleep） @value sleep
 * @option 戦闘不能（dead） @value dead
 * @desc アクション中のモーション名です。
 * 初期値は前進（walk）です。
 * 
 * @param undecidedMotion
 * @text 行動確定前のモーション
 * @parent <DefaultMotion>
 * @type select
 * @option なし @value none
 * @option 前進（walk） @value walk
 * @option 通常待機（wait） @value wait
 * @option 詠唱待機（chant） @value chant
 * @option 防御（guard） @value guard
 * @option ダメージ（damage） @value damage
 * @option 回避（evade） @value evade
 * @option 突き（thrust） @value thrust
 * @option 振り（swing） @value swing
 * @option 飛び道具（missile） @value missile
 * @option 汎用スキル（skill） @value skill
 * @option 魔法（spell） @value spell
 * @option アイテム（item） @value item
 * @option 逃げる（escape） @value escape
 * @option 勝利（victory） @value victory
 * @option 瀕死（dying） @value dying
 * @option 状態異常（abnormal） @value abnormal
 * @option 睡眠（sleep） @value sleep
 * @option 戦闘不能（dead） @value dead
 * @desc 行動確定前のモーション名です。
 * 初期値は前進（walk）です。
 * 
 * @param waitMotion
 * @text 待機のモーション
 * @parent <DefaultMotion>
 * @type select
 * @option なし @value none
 * @option 前進（walk） @value walk
 * @option 通常待機（wait） @value wait
 * @option 詠唱待機（chant） @value chant
 * @option 防御（guard） @value guard
 * @option ダメージ（damage） @value damage
 * @option 回避（evade） @value evade
 * @option 突き（thrust） @value thrust
 * @option 振り（swing） @value swing
 * @option 飛び道具（missile） @value missile
 * @option 汎用スキル（skill） @value skill
 * @option 魔法（spell） @value spell
 * @option アイテム（item） @value item
 * @option 逃げる（escape） @value escape
 * @option 勝利（victory） @value victory
 * @option 瀕死（dying） @value dying
 * @option 状態異常（abnormal） @value abnormal
 * @option 睡眠（sleep） @value sleep
 * @option 戦闘不能（dead） @value dead
 * @desc 待機（行動確定後）のモーション名です。
 * 初期値は待機（wait）です。
 * 
 * @param chantMotion
 * @text 詠唱待機のモーション
 * @parent <DefaultMotion>
 * @type select
 * @option なし @value none
 * @option 前進（walk） @value walk
 * @option 通常待機（wait） @value wait
 * @option 詠唱待機（chant） @value chant
 * @option 防御（guard） @value guard
 * @option ダメージ（damage） @value damage
 * @option 回避（evade） @value evade
 * @option 突き（thrust） @value thrust
 * @option 振り（swing） @value swing
 * @option 飛び道具（missile） @value missile
 * @option 汎用スキル（skill） @value skill
 * @option 魔法（spell） @value spell
 * @option アイテム（item） @value item
 * @option 逃げる（escape） @value escape
 * @option 勝利（victory） @value victory
 * @option 瀕死（dying） @value dying
 * @option 状態異常（abnormal） @value abnormal
 * @option 睡眠（sleep） @value sleep
 * @option 戦闘不能（dead） @value dead
 * @desc 詠唱待機のモーション名です。
 * 初期値は詠唱待機（chant）です。
 * 
 * @param guardMotion
 * @text 防御のモーション
 * @parent <DefaultMotion>
 * @type select
 * @option なし @value none
 * @option 前進（walk） @value walk
 * @option 通常待機（wait） @value wait
 * @option 詠唱待機（chant） @value chant
 * @option 防御（guard） @value guard
 * @option ダメージ（damage） @value damage
 * @option 回避（evade） @value evade
 * @option 突き（thrust） @value thrust
 * @option 振り（swing） @value swing
 * @option 飛び道具（missile） @value missile
 * @option 汎用スキル（skill） @value skill
 * @option 魔法（spell） @value spell
 * @option アイテム（item） @value item
 * @option 逃げる（escape） @value escape
 * @option 勝利（victory） @value victory
 * @option 瀕死（dying） @value dying
 * @option 状態異常（abnormal） @value abnormal
 * @option 睡眠（sleep） @value sleep
 * @option 戦闘不能（dead） @value dead
 * @desc 防御のモーション名です。
 * 初期値は防御（guard）です。
 * 
 * @param damageMotion
 * @text ダメージのモーション
 * @parent <DefaultMotion>
 * @type select
 * @option なし @value none
 * @option 前進（walk） @value walk
 * @option 通常待機（wait） @value wait
 * @option 詠唱待機（chant） @value chant
 * @option 防御（guard） @value guard
 * @option ダメージ（damage） @value damage
 * @option 回避（evade） @value evade
 * @option 突き（thrust） @value thrust
 * @option 振り（swing） @value swing
 * @option 飛び道具（missile） @value missile
 * @option 汎用スキル（skill） @value skill
 * @option 魔法（spell） @value spell
 * @option アイテム（item） @value item
 * @option 逃げる（escape） @value escape
 * @option 勝利（victory） @value victory
 * @option 瀕死（dying） @value dying
 * @option 状態異常（abnormal） @value abnormal
 * @option 睡眠（sleep） @value sleep
 * @option 戦闘不能（dead） @value dead
 * @desc ダメージのモーション名です。
 * 初期値はダメージ（damage）です。
 * 
 * @param evadeMotion
 * @text 回避のモーション
 * @parent <DefaultMotion>
 * @type select
 * @option なし @value none
 * @option 前進（walk） @value walk
 * @option 通常待機（wait） @value wait
 * @option 詠唱待機（chant） @value chant
 * @option 防御（guard） @value guard
 * @option ダメージ（damage） @value damage
 * @option 回避（evade） @value evade
 * @option 突き（thrust） @value thrust
 * @option 振り（swing） @value swing
 * @option 飛び道具（missile） @value missile
 * @option 汎用スキル（skill） @value skill
 * @option 魔法（spell） @value spell
 * @option アイテム（item） @value item
 * @option 逃げる（escape） @value escape
 * @option 勝利（victory） @value victory
 * @option 瀕死（dying） @value dying
 * @option 状態異常（abnormal） @value abnormal
 * @option 睡眠（sleep） @value sleep
 * @option 戦闘不能（dead） @value dead
 * @desc 回避のモーション名です。
 * 初期値は回避（evade）です。
 * 
 * @param skillMotion
 * @text 汎用スキルのモーション
 * @parent <DefaultMotion>
 * @type select
 * @option なし @value none
 * @option 前進（walk） @value walk
 * @option 通常待機（wait） @value wait
 * @option 詠唱待機（chant） @value chant
 * @option 防御（guard） @value guard
 * @option ダメージ（damage） @value damage
 * @option 回避（evade） @value evade
 * @option 突き（thrust） @value thrust
 * @option 振り（swing） @value swing
 * @option 飛び道具（missile） @value missile
 * @option 汎用スキル（skill） @value skill
 * @option 魔法（spell） @value spell
 * @option アイテム（item） @value item
 * @option 逃げる（escape） @value escape
 * @option 勝利（victory） @value victory
 * @option 瀕死（dying） @value dying
 * @option 状態異常（abnormal） @value abnormal
 * @option 睡眠（sleep） @value sleep
 * @option 戦闘不能（dead） @value dead
 * @desc 汎用スキルのモーション名です。
 * 初期値は汎用スキル（skill）です。
 * 
 * @param spellMotion
 * @text 魔法のモーション
 * @parent <DefaultMotion>
 * @type select
 * @option なし @value none
 * @option 前進（walk） @value walk
 * @option 通常待機（wait） @value wait
 * @option 詠唱待機（chant） @value chant
 * @option 防御（guard） @value guard
 * @option ダメージ（damage） @value damage
 * @option 回避（evade） @value evade
 * @option 突き（thrust） @value thrust
 * @option 振り（swing） @value swing
 * @option 飛び道具（missile） @value missile
 * @option 汎用スキル（skill） @value skill
 * @option 魔法（spell） @value spell
 * @option アイテム（item） @value item
 * @option 逃げる（escape） @value escape
 * @option 勝利（victory） @value victory
 * @option 瀕死（dying） @value dying
 * @option 状態異常（abnormal） @value abnormal
 * @option 睡眠（sleep） @value sleep
 * @option 戦闘不能（dead） @value dead
 * @desc 魔法のモーション名です。
 * 初期値は魔法（spell）です。
 * 
 * @param itemMotion
 * @text アイテムのモーション
 * @parent <DefaultMotion>
 * @type select
 * @option なし @value none
 * @option 前進（walk） @value walk
 * @option 通常待機（wait） @value wait
 * @option 詠唱待機（chant） @value chant
 * @option 防御（guard） @value guard
 * @option ダメージ（damage） @value damage
 * @option 回避（evade） @value evade
 * @option 突き（thrust） @value thrust
 * @option 振り（swing） @value swing
 * @option 飛び道具（missile） @value missile
 * @option 汎用スキル（skill） @value skill
 * @option 魔法（spell） @value spell
 * @option アイテム（item） @value item
 * @option 逃げる（escape） @value escape
 * @option 勝利（victory） @value victory
 * @option 瀕死（dying） @value dying
 * @option 状態異常（abnormal） @value abnormal
 * @option 睡眠（sleep） @value sleep
 * @option 戦闘不能（dead） @value dead
 * @desc アイテムのモーション名です。
 * 初期値はアイテム（item）です。
 * 
 * @param escapeMotion
 * @text 逃げるのモーション
 * @parent <DefaultMotion>
 * @type select
 * @option なし @value none
 * @option 前進（walk） @value walk
 * @option 通常待機（wait） @value wait
 * @option 詠唱待機（chant） @value chant
 * @option 防御（guard） @value guard
 * @option ダメージ（damage） @value damage
 * @option 回避（evade） @value evade
 * @option 突き（thrust） @value thrust
 * @option 振り（swing） @value swing
 * @option 飛び道具（missile） @value missile
 * @option 汎用スキル（skill） @value skill
 * @option 魔法（spell） @value spell
 * @option アイテム（item） @value item
 * @option 逃げる（escape） @value escape
 * @option 勝利（victory） @value victory
 * @option 瀕死（dying） @value dying
 * @option 状態異常（abnormal） @value abnormal
 * @option 睡眠（sleep） @value sleep
 * @option 戦闘不能（dead） @value dead
 * @desc 逃げるのモーション名です。
 * 初期値は逃げる（escape）です。
 * 
 * @param victoryMotion
 * @text 勝利のモーション
 * @parent <DefaultMotion>
 * @type select
 * @option なし @value none
 * @option 前進（walk） @value walk
 * @option 通常待機（wait） @value wait
 * @option 詠唱待機（chant） @value chant
 * @option 防御（guard） @value guard
 * @option ダメージ（damage） @value damage
 * @option 回避（evade） @value evade
 * @option 突き（thrust） @value thrust
 * @option 振り（swing） @value swing
 * @option 飛び道具（missile） @value missile
 * @option 汎用スキル（skill） @value skill
 * @option 魔法（spell） @value spell
 * @option アイテム（item） @value item
 * @option 逃げる（escape） @value escape
 * @option 勝利（victory） @value victory
 * @option 瀕死（dying） @value dying
 * @option 状態異常（abnormal） @value abnormal
 * @option 睡眠（sleep） @value sleep
 * @option 戦闘不能（dead） @value dead
 * @desc 勝利のモーション名です。
 * 初期値は勝利（victory）です。
 * 
 * @param dyingMotion
 * @text 瀕死のモーション
 * @parent <DefaultMotion>
 * @type select
 * @option なし @value none
 * @option 前進（walk） @value walk
 * @option 通常待機（wait） @value wait
 * @option 詠唱待機（chant） @value chant
 * @option 防御（guard） @value guard
 * @option ダメージ（damage） @value damage
 * @option 回避（evade） @value evade
 * @option 突き（thrust） @value thrust
 * @option 振り（swing） @value swing
 * @option 飛び道具（missile） @value missile
 * @option 汎用スキル（skill） @value skill
 * @option 魔法（spell） @value spell
 * @option アイテム（item） @value item
 * @option 逃げる（escape） @value escape
 * @option 勝利（victory） @value victory
 * @option 瀕死（dying） @value dying
 * @option 状態異常（abnormal） @value abnormal
 * @option 睡眠（sleep） @value sleep
 * @option 戦闘不能（dead） @value dead
 * @desc 瀕死のモーション名です。
 * 初期値は瀕死（dying）です。
 * 
 * @param abnormalMotion
 * @text 状態異常のモーション
 * @parent <DefaultMotion>
 * @type select
 * @option なし @value none
 * @option 前進（walk） @value walk
 * @option 通常待機（wait） @value wait
 * @option 詠唱待機（chant） @value chant
 * @option 防御（guard） @value guard
 * @option ダメージ（damage） @value damage
 * @option 回避（evade） @value evade
 * @option 突き（thrust） @value thrust
 * @option 振り（swing） @value swing
 * @option 飛び道具（missile） @value missile
 * @option 汎用スキル（skill） @value skill
 * @option 魔法（spell） @value spell
 * @option アイテム（item） @value item
 * @option 逃げる（escape） @value escape
 * @option 勝利（victory） @value victory
 * @option 瀕死（dying） @value dying
 * @option 状態異常（abnormal） @value abnormal
 * @option 睡眠（sleep） @value sleep
 * @option 戦闘不能（dead） @value dead
 * @desc 状態異常のモーション名です。
 * 初期値は状態異常（abnormal）です。
 * 
 * @param sleepMotion
 * @text 睡眠のモーション
 * @parent <DefaultMotion>
 * @type select
 * @option なし @value none
 * @option 前進（walk） @value walk
 * @option 通常待機（wait） @value wait
 * @option 詠唱待機（chant） @value chant
 * @option 防御（guard） @value guard
 * @option ダメージ（damage） @value damage
 * @option 回避（evade） @value evade
 * @option 突き（thrust） @value thrust
 * @option 振り（swing） @value swing
 * @option 飛び道具（missile） @value missile
 * @option 汎用スキル（skill） @value skill
 * @option 魔法（spell） @value spell
 * @option アイテム（item） @value item
 * @option 逃げる（escape） @value escape
 * @option 勝利（victory） @value victory
 * @option 瀕死（dying） @value dying
 * @option 状態異常（abnormal） @value abnormal
 * @option 睡眠（sleep） @value sleep
 * @option 戦闘不能（dead） @value dead
 * @desc 睡眠のモーション名です。
 * 初期値は睡眠（sleep）です。
 * 
 * @param deadMotion
 * @text 戦闘不能のモーション
 * @parent <DefaultMotion>
 * @type select
 * @option なし @value none
 * @option 前進（walk） @value walk
 * @option 通常待機（wait） @value wait
 * @option 詠唱待機（chant） @value chant
 * @option 防御（guard） @value guard
 * @option ダメージ（damage） @value damage
 * @option 回避（evade） @value evade
 * @option 突き（thrust） @value thrust
 * @option 振り（swing） @value swing
 * @option 飛び道具（missile） @value missile
 * @option 汎用スキル（skill） @value skill
 * @option 魔法（spell） @value spell
 * @option アイテム（item） @value item
 * @option 逃げる（escape） @value escape
 * @option 勝利（victory） @value victory
 * @option 瀕死（dying） @value dying
 * @option 状態異常（abnormal） @value abnormal
 * @option 睡眠（sleep） @value sleep
 * @option 戦闘不能（dead） @value dead
 * @desc 戦闘不能のモーション名です。
 * 初期値は戦闘不能（dead）です。
 * 
 * @param <Other>
 * @text ＜その他＞
 * 
 * @param escapePriority
 * @text 逃走モーション優先
 * @parent <Other>
 * @type boolean
 * @default false
 * @desc 行動異常時でも逃走モーションを優先して実行します。
 */
(function() {
"use strict";

function toNumber(str, def) {
    return isNaN(str) ? def : +(str || def);
}
function toBoolean(str, def) {
    if (str === true || str === "true") {
        return true;
    } else if (str === false || str === "false") {
        return false;
    }
    return def;
}

const parameters = PluginManager.parameters("NRP_MotionSetting");

const pDefaultTime = toNumber(parameters["defaultTime"]);
const pWalk = parameters["walk"];
const pWait = parameters["wait"];
const pChant = parameters["chant"];
const pGuard = parameters["guard"];
const pDamage = parameters["damage"];
const pEvade = parameters["evade"];
const pThrust = parameters["thrust"];
const pSwing = parameters["swing"];
const pMissile = parameters["missile"];
const pSkill = parameters["skill"];
const pSpell = parameters["spell"];
const pItem = parameters["item"];
const pEscape = parameters["escape"];
const pVictory = parameters["victory"];
const pDying = parameters["dying"];
const pAbnormal = parameters["abnormal"];
const pSleep = parameters["sleep"];
const pDead = parameters["dead"];

const pStepForward = toNumber(parameters["stepForward"], 12);
const pStepBack = toNumber(parameters["stepBack"], 12);

const pInputtingMotion = parameters["inputtingMotion"];
const pActingMotion = parameters["actingMotion"];
const pUndecidedMotion = parameters["undecidedMotion"];
const pWaitMotion = parameters["waitMotion"];
const pDeadMotion = parameters["deadMotion"];
const pSleepMotion = parameters["sleepMotion"];
const pAbnormalMotion = parameters["abnormalMotion"];
const pDyingMotion = parameters["dyingMotion"];
const pChantMotion = parameters["chantMotion"];
const pGuardMotion = parameters["guardMotion"];
const pSpellMotion = parameters["spellMotion"];
const pSkillMotion = parameters["skillMotion"];
const pItemMotion = parameters["itemMotion"];
const pDamageMotion = parameters["damageMotion"];
const pEvadeMotion = parameters["evadeMotion"];
const pEscapeMotion = parameters["escapeMotion"];
const pVictoryMotion = parameters["victoryMotion"];
const pEscapePriority = toBoolean(parameters["escapePriority"], false);

if (pStepForward) {
    /**
     * ●一歩前進
     */
    Sprite_Actor.prototype.stepForward = function() {
        // ホームポジションから外れている場合は処理しない
        if (!this.inHomePosition()) {
            return;
        }

        this.startMotion('walk');
        this.startMove(-48, 0, pStepForward);
    };
}

if (pStepBack) {
    /**
     * ●後退
     */
    Sprite_Actor.prototype.stepBack = function() {
        // 移動中は処理しない
        if (this.isMoving()) {
            return;
        }

        this.startMotion('walk');
        this.startMove(0, 0, pStepBack);
    };
}

/**
 * ●アクターのモーション時間
 */
const _Sprite_Actor_motionSpeed = Sprite_Actor.prototype.motionSpeed;
Sprite_Actor.prototype.motionSpeed = function() {
    // 各種モーションを判定し、指定時間があればそちらを参照する。
    if (pWalk && this._motion === Sprite_Actor.MOTIONS['walk']) {
        return pWalk;
    } else if (pWait && this._motion === Sprite_Actor.MOTIONS['wait']) {
        return pWait;
    } else if (pChant && this._motion === Sprite_Actor.MOTIONS['chant']) {
        return pChant;
    } else if (pGuard && this._motion === Sprite_Actor.MOTIONS['guard']) {
        return pGuard;
    } else if (pDamage && this._motion === Sprite_Actor.MOTIONS['damage']) {
        return pDamage;
    } else if (pEvade && this._motion === Sprite_Actor.MOTIONS['evade']) {
        return pEvade;
    } else if (pThrust && this._motion === Sprite_Actor.MOTIONS['thrust']) {
        return pThrust;
    } else if (pSwing && this._motion === Sprite_Actor.MOTIONS['swing']) {
        return pSwing;
    } else if (pMissile && this._motion === Sprite_Actor.MOTIONS['missile']) {
        return pMissile;
    } else if (pSkill && this._motion === Sprite_Actor.MOTIONS['skill']) {
        return pSkill;
    } else if (pSpell && this._motion === Sprite_Actor.MOTIONS['spell']) {
        return pSpell;
    } else if (pItem && this._motion === Sprite_Actor.MOTIONS['item']) {
        return pItem;
    } else if (pEscape && this._motion === Sprite_Actor.MOTIONS['escape']) {
        return pEscape;
    } else if (pVictory && this._motion === Sprite_Actor.MOTIONS['victory']) {
        return pVictory;
    } else if (pDying && this._motion === Sprite_Actor.MOTIONS['dying']) {
        return pDying;
    } else if (pAbnormal && this._motion === Sprite_Actor.MOTIONS['abnormal']) {
        return pAbnormal;
    } else if (pSleep && this._motion === Sprite_Actor.MOTIONS['sleep']) {
        return pSleep;
    } else if (pDead && this._motion === Sprite_Actor.MOTIONS['dead']) {
        return pDead;
    }

    // 初期値の指定があれば返す。
    if (pDefaultTime) {
        return pDefaultTime;
    }

    return _Sprite_Actor_motionSpeed.apply(this, arguments);;
};

/**
 * ●武器のモーション時間
 */
Sprite_Weapon.prototype.animationWait = function() {
    // 親（Sprite_Actor）のモーション時間に武器も合わせる。
    return this.parent.motionSpeed();
};

/**
 * ●標準モーションを変更
 */
const _Sprite_Actor_refreshMotion = Sprite_Actor.prototype.refreshMotion;
Sprite_Actor.prototype.refreshMotion = function() {
    const actor = this._actor;
    let motionGuard = Sprite_Actor.MOTIONS['guard'];

    // 防御モーションが変更されていた場合
    if (pGuardMotion) {
        motionGuard = Sprite_Actor.MOTIONS[pGuardMotion];
    }

    if (actor) {
        // ↓　何のために入れていたのか謎……。
        // ↓　動かなくなる処理があるので、とりあえず消します。（ver1.02）
        // // 移動中はモーション変更しない
        // if (this.isMoving()) {
        //     return;
        // }

        if (this._motion === motionGuard && !BattleManager.isInputting()) {
            return;
        }

        const stateMotion = actor.stateMotionIndex();

        let motionName = null;

        // 入力時
        if (actor.isInputting()) {
            if (pInputtingMotion) {
                motionName = pInputtingMotion;
            }

        // アクション中
        } else if (actor.isActing()) {
            if (pActingMotion) {
                motionName = pActingMotion;
            }

        // 戦闘不能
        } else if (stateMotion === 3) {
            if (pDeadMotion) {
                motionName = pDeadMotion;
            }

        // 睡眠
        } else if (stateMotion === 2) {
            if (pSleepMotion) {
                motionName = pSleepMotion;
            }

        // 詠唱待機
        } else if (actor.isChanting()) {
            if (pChantMotion) {
                motionName = pChantMotion;
            }

        // 防御
        } else if (actor.isGuard() || actor.isGuardWaiting()) {
            if (pGuardMotion) {
                motionName = pGuardMotion;
            }

        // 状態異常
        } else if (stateMotion === 1) {
            if (pAbnormalMotion) {
                motionName = pAbnormalMotion;
            }

        // 瀕死
        } else if (actor.isDying()) {
            if (pDyingMotion) {
                motionName = pDyingMotion;
            }

        // 行動確定前
        } else if (actor.isUndecided()) {
            if (pUndecidedMotion) {
                motionName = pUndecidedMotion;
            }

        // 待機
        } else {
            if (pWaitMotion) {
                motionName = pWaitMotion;
            }
        }

        if (motionName) {
            // なしの場合は終了
            if (motionName == "none") {
                return;
            }
            this.startMotion(motionName);
            return;
        }
    }

    _Sprite_Actor_refreshMotion.apply(this, arguments);
};

/**
 * ●アクション演出
 */
const _Game_Actor_performAction = Game_Actor.prototype.performAction;
Game_Actor.prototype.performAction = function(action) {
    let motionName = null;

    // 防御
    if (action.isGuard() && pGuardMotion) {
        motionName = pGuardMotion;
    // 魔法
    } else if (action.isMagicSkill() && pSpellMotion) {
        motionName = pSpellMotion;
    // スキル
    } else if (action.isSkill() && pSkillMotion) {
        motionName = pSkillMotion;
    // アイテム
    } else if (action.isItem() && pItemMotion) {
        motionName = pItemMotion;
    }

    if (motionName) {
        Game_Battler.prototype.performAction.call(this, action);
        // なしの場合は終了
        if (motionName == "none") {
            return;
        }
        this.requestMotion(motionName);
        return;
    }

    _Game_Actor_performAction.apply(this, arguments);
};

/**
 * ●ダメージ演出
 */
const _Game_Actor_performDamage = Game_Actor.prototype.performDamage;
Game_Actor.prototype.performDamage = function() {
    if (this.isSpriteVisible() && pDamageMotion) {
        Game_Battler.prototype.performDamage.call(this);

        // なしの場合は終了
        if (pDamageMotion == "none") {
            SoundManager.playActorDamage();
            return;
        }
        this.requestMotion(pDamageMotion);
        SoundManager.playActorDamage();
        return;
    }

    _Game_Actor_performDamage.apply(this, arguments);
};

/**
 * ●回避
 */
if (pEvadeMotion) {
    Game_Actor.prototype.performEvasion = function() {
        Game_Battler.prototype.performEvasion.call(this);
        // なしの場合は終了
        if (pEvadeMotion == "none") {
            return;
        }
        this.requestMotion(pEvadeMotion);
    };

    Game_Actor.prototype.performMagicEvasion = function() {
        Game_Battler.prototype.performMagicEvasion.call(this);
        // なしの場合は終了
        if (pEvadeMotion == "none") {
            return;
        }
        this.requestMotion(pEvadeMotion);
    };
}

/**
 * ●逃げる
 */
if (pEscapeMotion) {
    Game_Actor.prototype.performEscape = function() {
        if (this.canMove()) {
            // なしの場合は終了
            if (pEscapeMotion == "none") {
                return;
            }
            this.requestMotion(pEscapeMotion);
        }
    };
}

/**
 * ●勝利
 */
if (pVictoryMotion) {
    Game_Actor.prototype.performVictory = function() {
        if (this.canMove()) {
            // なしの場合は終了
            if (pVictoryMotion == "none") {
                return;
            }
            this.requestMotion(pVictoryMotion);
        }
    };
}

if (pEscapePriority) {
    /**
     * ●逃走時の演出
     */
    const _Game_Actor_performEscape = Game_Actor.prototype.performEscape;
    Game_Actor.prototype.performEscape = function() {
        // 逃走時は行動異常でもモーション変更
        this.requestMotion("escape");

        // この中でもthis.requestMotion("escape");が呼び出されるが、
        // 競合を意識してあえてそのままにする。
        _Game_Actor_performEscape.apply(this, arguments);
    };
}

})();
