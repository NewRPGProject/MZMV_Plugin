//=============================================================================
// NRP_LearnSkillList.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.012 A list-style skill learning system.
 * @author Takeshi Sunagawa (https://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/499059518.html
 *
 * @help Implement a list-style skill learning system.
 * 
 * It is a simple system where you spend the skill points you earn
 * and select the skill you want to learn from a list.
 * 
 * Skill points can be obtained either by defeating enemies
 * or when leveling up.
 * 
 * -------------------------------------------------------------------
 * [Create a Skill List]
 * -------------------------------------------------------------------
 * First, register the skill sets in the "SkillSetList"
 * plugin parameter. Register more skill information under it.
 * 
 * You can specify conditions for the skill set,
 * such as which actors to target.
 * If no conditions are specified, the skills are common to all.
 * 
 * Other conditions, such as prerequisite skills,
 * can be specified for each skill.
 * 
 * Selecting the "Learn Skills" command
 * from the menu will bring up the Skill Learning System screen.
 * 
 * -------------------------------------------------------------------
 * [Setting Skill Points]
 * -------------------------------------------------------------------
 * You can choose between "Each Actor" and "Party Sharing"
 * as your skill point management method.
 *
 * In the case of Party Sharing, skill points are stored in variables,
 * so they can be controlled by "Control Variables"
 * in the event command.
 * 
 * -------------------------------------------------------------------
 * [Note of Enemies]
 * -------------------------------------------------------------------
 * <SkillPoint:?>
 * Specify the skill points to be earned.
 * 
 * You can also specify a default value with a plugin parameter.
 * If it is too much trouble to specify the details,
 * it is easier to set the value proportional to exp or level.
 * 
 * <SkillPointRate:?>
 * Change the skill points earned to the specified %.
 * For example, 200 would be 200% (double).
 * Intended to be used in combination with the default value.
 * 
 * -------------------------------------------------------------------
 * [Note of Items]
 * -------------------------------------------------------------------
 * <AddSkillPoint:?>
 * Increases the actor's skill points by a numerical value.
 * 
 * -------------------------------------------------------------------
 * [Plugin Commands]
 * -------------------------------------------------------------------
 * ◆SceneStart
 * Calls up the skill learning scene.
 * If no actor is specified,
 * the actor selection scene is also displayed.
 * 
 * ◆ChangeSkillPoint
 * Increases or decreases the actor's skill points.
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
 * @-----------------------------------------------------
 * @ [Plugin Commands]
 * @-----------------------------------------------------
 * 
 * @command SceneStart
 * @desc Calls up the skill learning scene. If no actor is specified, the actor selection scene is also displayed.
 * 
 * @arg Actor
 * @type actor
 * @desc Actor to be targeted. If not specified, the selected scene of the actor is displayed.
 * 
 * @arg VariableActor
 * @type variable
 * @desc Specify the target actor by variable.
 * This one takes precedence over the other.
 * 
 * @-----------------------------------------------------
 * 
 * @command ChangeSkillPoint
 * @desc Change skill points.
 * Specify the target condition (AND).
 * 
 * @arg SkillPoint
 * @type number @min -9999999 @max 9999999
 * @desc The amount of skill points to increase or decrease. Negative value can be specified.
 * 
 * @arg VariableSkillPoint
 * @type variable
 * @desc The variable specifies the amount of skill points to increase or decrease. This takes precedence.
 * 
 * @arg <Condition>
 * 
 * @arg Actor
 * @parent <Condition>
 * @type actor
 * @desc Actor to target.
 * If unspecified, the entire party is targeted.
 * 
 * @arg VariableActor
 * @parent <Condition>
 * @type variable
 * @desc Specify the target actor by variable.
 * This one takes precedence over the other.
 * 
 * @-----------------------------------------------------
 * @ [Plugin Parameters]
 * @-----------------------------------------------------
 * 
 * @param SkillSetList
 * @type struct<SkillSet>[]
 * @desc Define the skill set to be learned.
 * 
 * @param <SkillPoint>
 * @desc This section is about skill points.
 * 
 * @param SkillPointName
 * @parent <SkillPoint>
 * @type string
 * @default SP
 * @desc The display name for the skill points.
 * 
 * @param MaxSkillPoint
 * @parent <SkillPoint>
 * @type number
 * @default 999999
 * @desc The maximum value of skill points.
 * It cannot be greater than this value.
 * 
 * @param SkillPointType
 * @parent <SkillPoint>
 * @type select
 * @option Each Actor @value actor
 * @option Party Sharing @value party
 * @default actor
 * @desc How to hold skill points.
 * You can choose between each actor or party sharing.
 * 
 * @param SkillPointVariable
 * @parent <SkillPoint>
 * @type variable
 * @desc This variable stores skill points. Valid only when party sharing is selected for SkillPointType.
 * 
 * @param SkillPointMessage
 * @parent <SkillPoint>
 * @type string
 * @default %1 %2 received!
 * @desc Displays a statement of skill points earned.
 * %1=number, %2=name of skill points to be displayed.
 * 
 * @param DefaultEnemySkillPoint
 * @parent <SkillPoint>
 * @type string
 * @desc Default value of skill points dropped by enemies.
 * Formula acceptable (e.g: 1 + Math.floor(a.exp() / 100))
 * 
 * @param SkillPointSwitch
 * @parent <SkillPoint>
 * @type switch
 * @desc If the switch is on, the increase or decrease in skill points is valid. If blank, always enabled.
 * 
 * @param BenchSkillPointRate
 * @parent <SkillPoint>
 * @type string
 * @default 1.00
 * @desc The percentage of SP earned by reserve members. If blank, the same rate as normal experience is used.
 * 
 * @param LevelUpSkillPoint
 * @parent <SkillPoint>
 * @type string
 * @desc Skill points earned upon level-up.
 * Formula acceptable (e.g: a.level)
 * 
 * @param <SkillListWindow>
 * @desc This item relates to the Skill List window.
 * 
 * @param LearnedSkillDisplayStyle
 * @parent <SkillListWindow>
 * @type select
 * @option Display @value display
 * @option Hide @value hide
 * @option Display Below @value below
 * @default display
 * @desc This is how the learned skills are displayed.
 * 
 * @param UseIcon
 * @parent <SkillListWindow>
 * @type boolean
 * @default true
 * @desc Whether the icon should appear before the name of the skill?
 * 
 * @param SkillPointColor
 * @parent <SkillListWindow>
 * @type number
 * @default 0
 * @desc Skill point text color.
 * Specify the number of the system color.
 * 
 * @param LearnedText
 * @parent <SkillListWindow>
 * @type string
 * @default Learned
 * @desc The wording to be displayed on the learned skills.
 * This is displayed at the location of the skill point.
 * 
 * @param LearnedTextColor
 * @parent <SkillListWindow>
 * @type number
 * @default 6
 * @desc The color of the learned skill statement.
 * Specify the number of the system color.
 * 
 * @param ShowHiddenSkills
 * @parent <SkillListWindow>
 * @type boolean
 * @default false
 * @desc Display skills that do not meet the conditions.
 * If you want to display conditions, expand help.
 * 
 * @param HiddenSymbol
 * @parent ShowHiddenSkills
 * @type string
 * @default *
 * @desc Symbols to be displayed on hidden skills.
 * 
 * @param HelpLines
 * @parent ShowHiddenSkills
 * @type number
 * @desc Change the number of lines of help.
 * Set to display hidden skill conditions.
 * 
 * @param HiddenSkillMask
 * @parent ShowHiddenSkills
 * @type string
 * @desc Mask hidden skills with this string.
 * It will be displayed when the condition is met.
 * 
 * @param HiddenHelp
 * @parent ShowHiddenSkills
 * @type boolean
 * @default false
 * @desc Hide hidden skills help (except for postscripts).
 * It will be displayed when the conditions are met.
 * 
 * @param <ActorWindow>
 * @desc This item is related to the actor window.
 * 
 * @param ActorWindowWidth
 * @parent <ActorWindow>
 * @type number
 * @default 240
 * @desc The width of the actor window.
 * 
 * @param ActorWindowHeight
 * @parent <ActorWindow>
 * @type number
 * @default 280
 * @desc The height of the actor window.
 * If blank, it is extended to the maximum.
 * 
 * @param <ConfirmWindow>
 * @desc This item relates to the confirmation window when learning the skill system.
 * 
 * @param ConfirmMessage
 * @parent <ConfirmWindow>
 * @type multiline_string
 * @default Do you want to learn %1?
 * @desc A message confirming the acquisition of a skill.
 * %1=Skill Name %2=Icon %3=Skill Points
 * 
 * @param ConfirmButtonOk
 * @parent <ConfirmWindow>
 * @type string
 * @default OK
 * @desc The display of a button to confirm the message confirming the acquisition of a skill.
 * 
 * @param ConfirmButtonCancel
 * @parent <ConfirmWindow>
 * @type string
 * @default Cancel
 * @desc The display of a button to cancel the message confirming the acquisition of a skill.
 * 
 * @param ConfirmOkSe
 * @parent <ConfirmWindow>
 * @type file
 * @dir audio/se
 * @default Decision5
 * @desc The sound effect when the learning of a skill is confirmed.
 * 
 * @param <Menu Command>
 * @desc This is the relevant section for displaying the skill system in the menu commands.
 * 
 * @param ShowMenuCommandPosition
 * @parent <Menu Command>
 * @type number
 * @default 4
 * @desc The position where the function is inserted into the menu command. 0 is the first position.
 * 
 * @param CommandName
 * @parent <Menu Command>
 * @type text
 * @default Learn Skills
 * @desc Sets the display command name for the skill system.
 * 
 * @param MenuCommandSwitch
 * @parent <Menu Command>
 * @type switch
 * @desc Displays the command only when the switch is on.
 * If blank, it is always displayed.
 * 
 * @param DisableSwitch
 * @parent <Menu Command>
 * @type switch
 * @desc Disallow command only when switch is on.
 * Always allow if blank.
 */

/*~struct~SkillSet:
 * @param Note
 * @type string
 * @desc Identification note.
 * 
 * @param SkillList
 * @type struct<SkillData>[]
 * @desc Define the skill list.
 *
 * @param <Condition>
 * 
 * @param Actor
 * @parent <Condition>
 * @type actor
 * @desc Actor to display skill set.
 * If blank, it will be the same for all.
 * 
 * @param Switch
 * @parent <Condition>
 * @type switch
 * @desc This switch is a condition for displaying skill sets.
 * 
 * @param Script
 * @parent <Condition>
 * @type string
 * @desc This script is the condition for displaying skill sets.
 * e.g: a.isLearnedSkill(1) && a.isLearnedSkill(2)
 */

/*~struct~SkillData:
 * @param Note
 * @type string
 * @desc Identification note.
 * 
 * @param Skill
 * @type skill
 * @desc Skills to be learned.
 *
 * @param SkillPoint
 * @type number
 * @desc Skill points required for learning.
 * 
 * @param DisplayName
 * @type string
 * @desc This is the name displayed on the learning screen.
 * %1:Skill Name, %2:Icon If blank, skill name.
 * 
 * @param HelpPostscript
 * @type multiline_string
 * @desc Text to be added to the help.
 * Mainly intended to describe learning conditions.
 * 
 * @param LearnedSkillDisplayStyle
 * @type select
 * @option display
 * @option hide
 * @desc How the learned skills are displayed.
 * If blank, the overall setting is applied.
 * 
 * @param <Condition>
 * 
 * @param ConditionSkill
 * @parent <Condition>
 * @type skill
 * @desc Only display skills if they have mastered the specified skill.
 * 
 * @param Switch
 * @parent <Condition>
 * @type switch
 * @desc This switch is a condition for displaying skill.
 * 
 * @param Script
 * @parent <Condition>
 * @type string
 * @desc This script is the condition for displaying skill.
 * e.g: a.isLearnedSkill(1) && a.isLearnedSkill(2)
 */

/*:ja
 * @target MZ
 * @plugindesc v1.012 リスト形式のスキル習得システム。
 * @author 砂川赳（https://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/499059518.html
 *
 * @help リスト形式のスキル習得システムを実装します。
 * 
 * 獲得したスキルポイントを消費し、
 * 表から覚えたいスキルを選択するシンプルな仕組みです。
 * 
 * スキルポイントは敵から入手したり、
 * レベルアップ時に入手したりといった方法を選択できます。
 * 
 * -------------------------------------------------------------------
 * ■スキルリストの作成
 * -------------------------------------------------------------------
 * まずプラグインパラメータの『スキルセットのリスト』に
 * スキルセットを登録し、その下へさらにスキル情報を登録してください。
 * 
 * スキルセットには対象とするアクターなどの条件を指定できます。
 * 条件を指定しなかった場合は全員共通のスキルとなります。
 * 
 * 他にも、スキル毎に前提スキルなどの条件を指定できます。
 * 
 * メニューから『スキル習得』のコマンドを選択すれば、
 * スキル習得システムの画面が表示されるようになります。
 * 
 * -------------------------------------------------------------------
 * ■スキルポイントの設定
 * -------------------------------------------------------------------
 * スキルポイントの保有方法として『アクター毎』と『パーティ共有』の
 * 二種類から選択できます。
 * 
 * パーティ共有の場合は変数内に格納するため、
 * イベントコマンドの『変数の操作』での制御が可能となります。
 * 
 * -------------------------------------------------------------------
 * ■敵キャラのメモ欄
 * -------------------------------------------------------------------
 * <SkillPoint:?>
 * 獲得できるスキルポイントを指定します。
 * 
 * また、プラグインパラメータで既定値を指定することもできます。
 * 細かい指定が面倒なら、経験値やレベルに比例する値にしてしまえば楽です。
 * 
 * <SkillPointRate:?>
 * 獲得できるスキルポイントを指定した%に変更します。
 * 例えば、200ならば200%（２倍）になります。
 * 既定値とのセットで使うことを想定しています。
 * 
 * -------------------------------------------------------------------
 * ■アイテムのメモ欄
 * -------------------------------------------------------------------
 * <AddSkillPoint:?>
 * アクターのスキルポイントを数値分増加させます。
 * 
 * -------------------------------------------------------------------
 * ■プラグインコマンド
 * -------------------------------------------------------------------
 * ◆シーン開始
 * スキル習得画面を呼び出します。
 * アクターを指定しない場合は、アクター選択画面も表示します。
 * 
 * ◆スキルポイントの増減
 * アクターのスキルポイントを増減させます。
 * 
 * -------------------------------------------------------------------
 * ■利用規約
 * -------------------------------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @-----------------------------------------------------
 * @ プラグインコマンド
 * @-----------------------------------------------------
 * 
 * @command SceneStart
 * @text シーン開始
 * @desc スキル習得画面を呼び出します。
 * アクターを指定しない場合は、アクター選択画面も表示。
 * 
 * @arg Actor
 * @text アクター
 * @type actor
 * @desc 対象とするアクターです。
 * 指定がない場合は、アクターの選択画面を表示します。
 * 
 * @arg VariableActor
 * @text アクター（変数）
 * @type variable
 * @desc 対象とするアクターを変数で指定します。
 * こちらのほうが優先されます。
 * 
 * @-----------------------------------------------------
 * 
 * @command ChangeSkillPoint
 * @text スキルポイントの増減
 * @desc スキルポイントを変更します。
 * 対象条件（ＡＮＤ）を指定してください。
 * 
 * @arg SkillPoint
 * @text スキルポイント
 * @type number @min -9999999 @max 9999999
 * @desc 増減するスキルポイントの量です。マイナス指定可。
 * 
 * @arg VariableSkillPoint
 * @text スキルポイント（変数）
 * @type variable
 * @desc 増減するスキルポイントの量を変数で指定します。
 * こちらのほうが優先されます。
 * 
 * @arg <Condition>
 * @text ＜対象条件＞
 * 
 * @arg Actor
 * @parent <Condition>
 * @text アクター
 * @type actor
 * @desc 対象とするアクターです。
 * 未指定ならパーティ全体を対象とします。
 * 
 * @arg VariableActor
 * @parent <Condition>
 * @text アクター（変数）
 * @type variable
 * @desc 対象とするアクターを変数で指定します。
 * こちらのほうが優先されます。
 * 
 * @-----------------------------------------------------
 * @ プラグインパラメータ
 * @-----------------------------------------------------
 * 
 * @param SkillSetList
 * @text スキルセットのリスト
 * @type struct<SkillSet>[]
 * @desc 習得するスキルセットを定義します。
 * 
 * @param <SkillPoint>
 * @text ＜スキルポイント＞
 * @desc スキルポイントに関する項目です。
 * 
 * @param SkillPointName
 * @text スキルポイントの表示名
 * @parent <SkillPoint>
 * @type string
 * @default SP
 * @desc スキルポイントを表す表示名です。
 * 
 * @param MaxSkillPoint
 * @text スキルポイントの最大値
 * @parent <SkillPoint>
 * @type number
 * @default 999999
 * @desc スキルポイントの最大値です。
 * これ以上の値にはなりません。
 * 
 * @param SkillPointType
 * @text スキルポイントの保有方法
 * @parent <SkillPoint>
 * @type select
 * @option アクター毎 @value actor
 * @option パーティ共有 @value party
 * @default actor
 * @desc スキルポイントの保有方法です。
 * アクター毎かパーティ共有かを選択できます。
 * 
 * @param SkillPointVariable
 * @text スキルポイントの変数
 * @parent <SkillPoint>
 * @type variable
 * @desc スキルポイントを格納する変数です。
 * 保有方法にパーティ共有を選んだ場合のみ有効です。
 * 
 * @param SkillPointMessage
 * @parent <SkillPoint>
 * @text スキルポイント獲得文
 * @type string
 * @default %1 の%2を獲得！
 * @desc スキルポイントの獲得文を表示します。
 * %1=数値, %2=スキルポイントの表示名となります。
 * 
 * @param DefaultEnemySkillPoint
 * @text 敵スキルポイントの既定値
 * @parent <SkillPoint>
 * @type string
 * @desc 敵が落とすスキルポイントの既定値を設定します。
 * 数式可（例：1 + Math.floor(a.exp() / 100)）
 * 
 * @param SkillPointSwitch
 * @text ＳＰ有効化スイッチ
 * @parent <SkillPoint>
 * @type switch
 * @desc 指定のスイッチがオンの際、スキルポイントの増減を有効化します。空白なら常に有効。
 * 
 * @param BenchSkillPointRate
 * @text 控えの獲得率
 * @parent <SkillPoint>
 * @type string
 * @default 1.00
 * @desc 控えメンバーのスキルポイントの獲得率です。数式可
 * 空白の場合は通常経験値と同率を使用。
 * 
 * @param LevelUpSkillPoint
 * @text レベルアップ時のSP
 * @parent <SkillPoint>
 * @type string
 * @desc レベルアップ時に獲得できるスキルポイントです。
 * 数式可（例：a.level）
 * 
 * @param <SkillListWindow>
 * @text ＜スキルリスト関連＞
 * @desc スキルリストウィンドウに関する項目です。
 * 
 * @param LearnedSkillDisplayStyle
 * @text 習得済スキルの表示方法
 * @parent <SkillListWindow>
 * @type select
 * @option そのまま @value display
 * @option 非表示 @value hide
 * @option 下に表示 @value below
 * @default display
 * @desc 習得したスキルの表示方法です。
 * 
 * @param UseIcon
 * @text アイコンを表示
 * @parent <SkillListWindow>
 * @type boolean
 * @default true
 * @desc アイコンをスキル名の前に表示するかどうか？
 * 
 * @param SkillPointColor
 * @text スキルポイントの色
 * @parent <SkillListWindow>
 * @type number
 * @default 0
 * @desc スキルポイントの文字色です。
 * システムカラーの番号を指定してください。
 * 
 * @param LearnedText
 * @text 習得済の表示文
 * @parent <SkillListWindow>
 * @type string
 * @default 済
 * @desc 習得済スキルに表示する文言です。
 * スキルポイントの場所に表示されます。
 * 
 * @param LearnedTextColor
 * @text 習得済の色
 * @parent <SkillListWindow>
 * @type number
 * @default 6
 * @desc 習得済スキルに表示する文言の色です。
 * システムカラーの番号を指定してください。
 * 
 * @param ShowHiddenSkills
 * @text 隠しスキルを表示
 * @parent <SkillListWindow>
 * @type boolean
 * @default false
 * @desc 条件を満たしていないスキルを表示します。
 * 条件表示する場合はヘルプの行数は３以上に。
 * 
 * @param HiddenSymbol
 * @text 隠しスキルの記号
 * @parent ShowHiddenSkills
 * @type string
 * @default ※
 * @desc 隠しスキルに表示する記号です。
 * 
 * @param HelpLines
 * @text ヘルプの行数
 * @parent ShowHiddenSkills
 * @type number
 * @desc ヘルプの行数を変更します。
 * 隠しスキルの条件表示を行うための設定です。
 * 
 * @param HiddenSkillMask
 * @text 隠しスキルのマスク
 * @parent ShowHiddenSkills
 * @type string
 * @desc 隠しスキルを指定した文字列（？など）で隠します。
 * 条件を満たすと表示されるようになります。
 * 
 * @param HiddenHelp
 * @text ヘルプを隠す
 * @parent ShowHiddenSkills
 * @type boolean
 * @default false
 * @desc 隠しスキルのヘルプ（追記除く）を隠します。
 * 条件を満たすと表示されるようになります。
 * 
 * @param <ActorWindow>
 * @text ＜アクターウィンドウ関連＞
 * @desc アクターウィンドウに関する項目です。
 * 
 * @param ActorWindowWidth
 * @text アクターウィンドウの横幅
 * @parent <ActorWindow>
 * @type number
 * @default 240
 * @desc アクターウィンドウの横幅です。
 * 
 * @param ActorWindowHeight
 * @text アクターウィンドウの縦幅
 * @parent <ActorWindow>
 * @type number
 * @default 280
 * @desc アクターウィンドウの縦幅です。
 * 空白の場合は最大まで伸ばします。
 * 
 * @param <ConfirmWindow>
 * @text ＜確認ウィンドウ関連＞
 * @desc スキルシステムを習得する際の確認ウィンドウに関する項目です。
 * 
 * @param ConfirmMessage
 * @text 確認メッセージ
 * @parent <ConfirmWindow>
 * @type multiline_string
 * @default %1を習得しますか？
 * @desc スキルの習得確認メッセージの内容です。
 * %1=スキル名、%2=アイコン、%3=スキルポイントです。
 * 
 * @param ConfirmButtonOk
 * @text ＯＫの文言
 * @parent <ConfirmWindow>
 * @type string
 * @default ＯＫ
 * @desc スキルの習得確認メッセージを確定する際のボタンの表示です。
 * 
 * @param ConfirmButtonCancel
 * @text キャンセルの文言
 * @parent <ConfirmWindow>
 * @type string
 * @default キャンセル
 * @desc スキルの習得確認メッセージをキャンセルする際のボタンの表示です。
 * 
 * @param ConfirmOkSe
 * @text 確定時のＳＥ
 * @parent <ConfirmWindow>
 * @type file
 * @dir audio/se
 * @default Decision5
 * @desc スキルの習得を確定した際の効果音です。
 * 
 * @param <Menu Command>
 * @text ＜メニューコマンド関連＞
 * @desc メニューコマンドにスキルシステムを表示する際の関連項目です。
 * 
 * @param ShowMenuCommandPosition
 * @parent <Menu Command>
 * @text メニューコマンド挿入位置
 * @type number
 * @default 4
 * @desc メニューコマンドにスキル習得を挿入する位置です。
 * 0が先頭。不要ならDELで消去してください。
 * 
 * @param CommandName
 * @parent <Menu Command>
 * @text メニュー表示名
 * @type text
 * @default スキル習得
 * @desc スキルシステムの表示コマンド名を設定します。
 * 
 * @param MenuCommandSwitch
 * @parent <Menu Command>
 * @text 表示許可するスイッチ
 * @type switch
 * @desc スイッチがオンの時のみコマンドを表示します。
 * 空白なら常に表示します。
 * 
 * @param DisableSwitch
 * @parent <Menu Command>
 * @text 禁止するスイッチ
 * @type switch
 * @desc スイッチがオンの時のみコマンドを禁止（灰色）します。
 * 空白なら常に許可します。
 */

/*~struct~SkillSet:ja
 * @param Note
 * @text メモ
 * @type string
 * @desc 識別用のメモです。
 * 
 * @param SkillList
 * @text スキルリスト
 * @type struct<SkillData>[]
 * @desc スキルリストを定義します。
 *
 * @param <Condition>
 * @text ＜条件＞
 * 
 * @param Actor
 * @parent <Condition>
 * @text アクター
 * @type actor
 * @desc スキルセットを表示するアクターです。
 * 空欄なら全員共通になります。
 * 
 * @param Switch
 * @parent <Condition>
 * @text スイッチ
 * @type switch
 * @desc スキルセットを表示する条件となるスイッチです。
 * 
 * @param Script
 * @parent <Condition>
 * @text スクリプト
 * @type string
 * @desc スキルセットを表示する条件となるスクリプトです。
 * 例：a.isLearnedSkill(1) && a.isLearnedSkill(2)
 */

/*~struct~SkillData:ja
 * @param Note
 * @text メモ
 * @type string
 * @desc 識別用のメモです。
 * 
 * @param Skill
 * @text スキル
 * @type skill
 * @desc 習得するスキルです。
 *
 * @param SkillPoint
 * @text スキルポイント
 * @type number
 * @desc 習得に必要なスキルポイントです。
 * 
 * @param DisplayName
 * @text 表示名
 * @type string
 * @desc 習得画面での表示名です。
 * %1:スキル名,%2:アイコン。空白ならスキル名を使用。
 * 
 * @param HelpPostscript
 * @text ヘルプに追記
 * @type multiline_string
 * @desc ヘルプに追記する文章です。
 * 主に習得条件の記述を想定しています。
 * 
 * @param LearnedSkillDisplayStyle
 * @text 習得済スキルの表示方法
 * @type select
 * @option そのまま @value display
 * @option 非表示 @value hide
 * @desc 習得したスキルの表示方法です。
 * こちらはスキル個別の設定。空欄だと全体設定を適用。
 * 
 * @param <Condition>
 * @text ＜条件＞
 * 
 * @param ConditionSkill
 * @parent <Condition>
 * @text スキル
 * @type skill
 * @desc 指定のスキルを習得している場合のみスキルを表示します。
 * 
 * @param Switch
 * @parent <Condition>
 * @text スイッチ
 * @type switch
 * @desc スキルを表示する条件となるスイッチです。
 * 
 * @param Script
 * @parent <Condition>
 * @text スクリプト
 * @type string
 * @desc スキルを表示する条件となるスクリプトです。
 * 例：a.isLearnedSkill(1) && a.isLearnedSkill(2)
 */
(function() {
"use strict";

/**
 * ●構造体をJSで扱えるように変換
 */
function parseStruct1(arg) {
    var ret = [];

    JSON.parse(arg).forEach(function(str) {
        ret.push(str);
    });

    return ret;
}
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
function toNumber(str, def) {
    if (str == undefined || str == "") {
        return def;
    }
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
function setDefault(str, def) {
    if (str == undefined || str == "") {
        return def;
    }
    return str;
}

const PLUGIN_NAME = "NRP_LearnSkillList";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pSkillSetList = parseStruct2(parameters["SkillSetList"]);
// スキルポイント
const pSkillPointName = setDefault(parameters["SkillPointName"], "");
const pMaxSkillPoint = toNumber(parameters["MaxSkillPoint"], 999999);
const pSkillPointType = setDefault(parameters["SkillPointType"]);
const pSkillPointVariable = setDefault(parameters["SkillPointVariable"]);
const pSkillPointMessage = setDefault(parameters["SkillPointMessage"], "");
const pDefaultEnemySkillPoint = setDefault(parameters["DefaultEnemySkillPoint"]);
const pSkillPointSwitch = toNumber(parameters["SkillPointSwitch"]);
const pBenchSkillPointRate = setDefault(parameters["BenchSkillPointRate"]);
const pLevelUpSkillPoint = setDefault(parameters["LevelUpSkillPoint"]);
// スキルリストウィンドウ関連
const pLearnedSkillDisplayStyle = parameters["LearnedSkillDisplayStyle"];
const pSkillPointColor = toNumber(parameters["SkillPointColor"], 0);
const pLearnedText = setDefault(parameters["LearnedText"]);
const pLearnedTextColor = toNumber(parameters["LearnedTextColor"], 0);
const pUseIcon = toBoolean(parameters["UseIcon"]);
const pShowHiddenSkills = toBoolean(parameters["ShowHiddenSkills"]);
const pHiddenSymbol = setDefault(parameters["HiddenSymbol"]);
const pHelpLines = toNumber(parameters["HelpLines"]);
const pHiddenSkillMask = setDefault(parameters["HiddenSkillMask"]);
const pHiddenHelp = toBoolean(parameters["HiddenHelp"]);
// アクターウィンドウ関連
const pActorWindowWidth = toNumber(parameters["ActorWindowWidth"]);
const pActorWindowHeight = toNumber(parameters["ActorWindowHeight"]);
// 確認ウィンドウ関連
const pConfirmMessage = parameters["ConfirmMessage"];
const pConfirmButtonOk = parameters["ConfirmButtonOk"];
const pConfirmButtonCancel = parameters["ConfirmButtonCancel"];
const pConfirmOkSe = setDefault(parameters["ConfirmOkSe"]);
// メニューコマンド関連
const pShowMenuCommandPosition = toNumber(parameters["ShowMenuCommandPosition"]);
const pCommandName = parameters["CommandName"];
const pMenuCommandSwitch = toNumber(parameters["MenuCommandSwitch"]);
const pDisableSwitch = toNumber(parameters["DisableSwitch"]);

// 定数
const SYMBOL_SKILL_SYSTEM = "skillSystem";
const SKILL_POINT_KEY = "skillPoint";

//-----------------------------------------------------------------------------
// ＭＺ用プラグインコマンド
//-----------------------------------------------------------------------------

/**
 * ●シーン開始
 */
PluginManager.registerCommand(PLUGIN_NAME, "SceneStart", function(args) {
    // アクターを取得
    const actor = getActor(args);
    // 対象に設定
    if (actor) {
        $gameParty.setMenuActor(actor);
    // 指定がない場合はクリア
    } else {
        $gameParty._menuActorId = 0;
    }

    // 選択肢ウィンドウが存在する場合は非表示
    // ※ゴミが残らないようにするため
    if (SceneManager._scene._choiceListWindow) {
        SceneManager._scene._choiceListWindow.hide();
    }

    // シーン開始
    if ($gameParty._menuActorId) {
        SceneManager.push(Scene_LearnSkillList);
    } else {
        SceneManager.push(Scene_LearnSkillSelectActor);
    }
});

/**
 * ●スキルポイントの増減
 */
PluginManager.registerCommand(PLUGIN_NAME, "ChangeSkillPoint", function(args) {
    // スキルポイント
    const skillPoint = getSkillPoint(args);

    // パーティ共有の場合
    if (pSkillPointType == "party") {
        const variableNo = eval(pSkillPointVariable);
        const currentSp = $gameVariables.value(variableNo);

        let newValue = currentSp + skillPoint;
        if (newValue > pMaxSkillPoint) {
            newValue = pMaxSkillPoint;
        }
        // 変数の値を加算
        $gameVariables.setValue(variableNo, newValue);
        return;
    }

    // アクターを取得
    const actor = getActor(args);
    if (actor) {
        actor.changeSkillPoint(skillPoint)

    // アクターの指定がない場合は全体を対象化
    } else if (isForParty(args)) {
        // 通常時
        for (const actor of $gameParty.members()) {
            actor.changeSkillPoint(skillPoint)
        }
    }
});

/**
 * ●スキルポイントを取得
 */
function getSkillPoint(args) {
    let skillPoint = setDefault(args.SkillPoint);

    // 変数の指定がある場合は優先
    const variablSp = setDefault(args.VariableSkillPoint);
    if (variablSp) {
        skillPoint = $gameVariables.value(variablSp);
    }

    return eval(skillPoint);
}

/**
 * ●アクターを取得
 */
function getActor(args) {
    let actorId = setDefault(args.Actor);

    // 変数の指定がある場合は優先
    const variablActor = setDefault(args.VariableActor);
    if (variablActor) {
        actorId = $gameVariables.value(variablActor);
    }

    // アクターを取得
    const actor = $gameActors.actor(actorId);
    return actor;
}

/**
 * ●全体が対象かどうか？
 */
function isForParty(args) {
    const actorId = setDefault(args.Actor);
    const variablActor = setDefault(args.VariableActor);
    return !actorId && !variablActor;
}

//-----------------------------------------------------------------------------
// Scene_LearnSkillSelectActor
//
// アクター選択シーン用クラス

function Scene_LearnSkillSelectActor() {
    this.initialize(...arguments);
}

Scene_LearnSkillSelectActor.prototype = Object.create(Scene_MenuBase.prototype);
Scene_LearnSkillSelectActor.prototype.constructor = Scene_LearnSkillSelectActor;

Scene_LearnSkillSelectActor.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
};

/**
 * ●ウィンドウの生成
 */
Scene_LearnSkillSelectActor.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);

    // アクター選択用ウィンドウ
    this.createStatusWindow();
};

/**
 * ●アクター選択用ウィンドウの作成
 */
Scene_LearnSkillSelectActor.prototype.createStatusWindow = function() {
    const rect = this.statusWindowRect();
    this._statusWindow = new Window_MenuStatus(rect);
    this._statusWindow.setHandler("ok", this.onActorOk.bind(this));
    this._statusWindow.setHandler('cancel', this.popScene.bind(this));
    this.addWindow(this._statusWindow);
};

/**
 * ●ステータスウィンドウ用の領域を確保
 */
Scene_LearnSkillSelectActor.prototype.statusWindowRect = function() {
    const ww = Graphics.boxWidth;
    const wh = this.mainAreaHeight();
    const wx = this.isRightInputMode() ? 0 : Graphics.boxWidth - ww;
    const wy = this.mainAreaTop();
    return new Rectangle(wx, wy, ww, wh);
};

/**
 * ●ヘルプウィンドウの縦幅
 * ※存在しないので0
 */
Scene_LearnSkillSelectActor.prototype.helpAreaHeight = function() {
    return 0;
};

/**
 * ●処理開始
 */
Scene_LearnSkillSelectActor.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    
    // アクター選択用ウィンドウを表示＆フォーカス
    this._statusWindow.show();
    this._statusWindow.activate();

    // スキルシステムから戻ってきた際は選択状況を再現
    this._statusWindow.smoothSelect($gameParty.menuActor().index() || 0);

    // 描画更新（顔グラ）
    this._statusWindow.refresh();
};

/**
 * ●アクターの選択確定
 */
Scene_LearnSkillSelectActor.prototype.onActorOk = function() {
    // アクター選択ウィンドウの選択結果を反映
    const actor = this._statusWindow.actor(this._statusWindow.index());
    $gameParty.setMenuActor(actor);
    // スキルシステムへ遷移
    SceneManager.push(Scene_LearnSkillList);
};

//-----------------------------------------------------------------------------
// Scene_LearnSkillList
//
// スキルシステムシーン用クラス

function Scene_LearnSkillList() {
    this.initialize(...arguments);
}

Scene_LearnSkillList.prototype = Object.create(Scene_MenuBase.prototype);
Scene_LearnSkillList.prototype.constructor = Scene_LearnSkillList;

Scene_LearnSkillList.prototype.initialize = function() {
    Scene_MenuBase.prototype.initialize.call(this);
    Scene_Message.prototype.initialize.call(this);
};

/**
 * ●ウィンドウの生成
 */
Scene_LearnSkillList.prototype.create = function() {
    Scene_MenuBase.prototype.create.call(this);

    // ヘルプウィンドウ
    this.createHelpWindow();

    // アクター用ウィンドウ
    this.createActorWindow();

    // スキルリストウィンドウ
    this.createSkillListWindow();

    // 確認ウィンドウ
    this.createConfirmWindow();

    // // メッセージ表示用の設定
    // this.createMessageWindows();
};

/**
 * ●ヘルプウィンドウの縦幅
 */
Scene_LearnSkillList.prototype.helpAreaHeight = function() {
    if (pHelpLines != null) {
        return this.calcWindowHeight(pHelpLines, false);
    }
    return Scene_MenuBase.prototype.helpAreaHeight.call(this);
};

/**
 * ●スキルリストウィンドウの作成
 */
Scene_LearnSkillList.prototype.createSkillListWindow = function() {
    let wx = this._actorWindow.width;
    let wy = this.mainAreaTop();
    const ww = Graphics.boxWidth - wx;
    const wh = Graphics.boxHeight - this.buttonAreaHeight() - this.helpAreaHeight();
    this._skillListWindow = new Window_LearnSkillList(new Rectangle(wx, wy, ww, wh));
    this._skillListWindow.setHelpWindow(this._helpWindow);
    this._skillListWindow.setHandler("ok", this.onSkillListOk.bind(this));
    this._skillListWindow.setHandler('cancel', this.onSkillListCancel.bind(this));
    this._skillListWindow.setHandler("pagedown", this.nextActor.bind(this));
    this._skillListWindow.setHandler("pageup", this.previousActor.bind(this));
    this.addWindow(this._skillListWindow);
};

/**
 * ●アクターウィンドウの作成
 */
Scene_LearnSkillList.prototype.createActorWindow = function() {
    const rect = this.actorWindowRect();
    this._actorWindow = new Window_LearnSkillActor(rect);
    this.addWindow(this._actorWindow);
};

/**
 * ●アクターウィンドウの表示領域
 */
Scene_LearnSkillList.prototype.actorWindowRect = function() {
    const wx = 0;
    const wy = this.mainAreaTop();
    const ww = pActorWindowWidth;
    const wh = pActorWindowHeight ? pActorWindowHeight : this.mainAreaHeight();
    return new Rectangle(wx, wy, ww, wh);
};

/**
 * ●確認ウィンドウの作成
 */
Scene_LearnSkillList.prototype.createConfirmWindow = function() {
    const rect = this.confirmWindowRect();
    this._confirmWindow = new Window_LearnSkillConfirm(rect);
    this._confirmWindow.setHandler("ok", this.confirmLearnOk.bind(this));
    this._confirmWindow.setHandler("cancel", this.confirmLearnCancel.bind(this));
    // addWindowだと下が見えなくなるのでaddChildで追加する。
    this.addChild(this._confirmWindow);

    this._confirmWindow.hide();
    this._confirmWindow.close();
};

/**
 * ●確認ウィンドウの表示領域
 */
Scene_LearnSkillList.prototype.confirmWindowRect = function() {
    // ww,whは後で調整するため適当に画面全体を指定
    const ww = Graphics.boxWidth;
    const wh = Graphics.boxHeight;
    const wx = (Graphics.boxWidth - ww) / 2;
    const wy = (Graphics.boxHeight - wh) / 2;
    return new Rectangle(wx, wy, ww, wh);
};

/**
 * ●確認確定
 */
Scene_LearnSkillList.prototype.confirmLearnOk = function() {
    // スキルを習得
    const dataSkill = this._confirmWindow.dataSkill();
    const item = this._confirmWindow.item();
    this.actor().learnSkill(dataSkill.id);

    // スキルポイントを減算
    if (item.SkillPoint) {
        this.actor().changeSkillPoint(eval(item.SkillPoint) * -1);
    }
    
    // 効果音を演奏
    if (pConfirmOkSe) {
        AudioManager.playSe({"name":pConfirmOkSe, "volume":90, "pitch":100, "pan":0})
    }

    // 確認ウィンドウを閉じる
    this._confirmWindow.close();
    // スキルリストに戻る
    this._skillListWindow.activate();
    // リフレッシュ
    this._skillListWindow.refresh();
    this._actorWindow.refresh();
};

/**
 * ●確認キャンセル
 */
Scene_LearnSkillList.prototype.confirmLearnCancel = function() {
    // 確認ウィンドウを閉じる
    this._confirmWindow.close();
    // スキルリストに戻る
    this._skillListWindow.activate();
};

/**
 * ●処理開始
 */
Scene_LearnSkillList.prototype.start = function() {
    Scene_MenuBase.prototype.start.call(this);
    Scene_Message.prototype.start.call(this);
    this.refreshActor();

    // スキルリストウィンドウを更新してフォーカス
    this._skillListWindow.refresh();
    this._skillListWindow.activate();
    this._skillListWindow.select(0);
    this._actorWindow.deactivate();

    // // 開始時コモンイベントがある場合は始動
    // if (pStartCommonEvent) {
    //     this._interpreter = new Game_Interpreter();
    //     $gameTemp.reserveCommonEvent(pStartCommonEvent);
    //     this._interpreter.setupReservedCommonEvent();
    // }
};

Scene_LearnSkillList.prototype.refreshActor = function() {
    const actor = this.actor();
    this._actorWindow.setActor(actor);
    this._skillListWindow.setActor(actor);
};

/**
 * ●地点の選択開始
 */
Scene_LearnSkillList.prototype.onSkillListStart = function() {
    // 地点選択ウィンドウの表示＆フォーカス
    this._skillListWindow.show();
    this._skillListWindow.activate();
    this._skillListWindow.refresh();
};

/**
 * ●スキルリスト選択時
 */
Scene_LearnSkillList.prototype.onSkillListOk = function() {
    const item = this._skillListWindow.item();

    // 確認ウィンドウにスキルデータを設定
    this._confirmWindow.setSkillData(item);
    // 確認ウィンドウを表示
    this._confirmWindow.show();
    this._confirmWindow.open();
    this._confirmWindow.activate();
    this._confirmWindow.select(0);
};

/**
 * ●スキルリストキャンセル
 */
Scene_LearnSkillList.prototype.onSkillListCancel = function() {
    // 前シーンへ遷移
    this.popScene();
};

/**
 * ●アクター切替
 */
Scene_LearnSkillList.prototype.onActorChange = function() {
    Scene_MenuBase.prototype.onActorChange.call(this);
    this.refreshActor();
    this._skillListWindow.activate();
};

//-----------------------------------------------------------------------------
// Window_LearnSkillList
//
// 習得スキルウィンドウクラス

function Window_LearnSkillList() {
    this.initialize(...arguments);
}

Window_LearnSkillList.prototype = Object.create(Window_Selectable.prototype);
Window_LearnSkillList.prototype.constructor = Window_LearnSkillList;

/**
 * ●初期化
 */
Window_LearnSkillList.prototype.initialize = function(rect, windowParam) {
    this._windowParam = windowParam;
    Window_Selectable.prototype.initialize.call(this, rect);
};

/**
 * ●アクター情報の設定
 */
Window_LearnSkillList.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
    }
};

/**
 * ●列の余白
 */
Window_LearnSkillList.prototype.colSpacing = function() {
    return 0;
};

/**
 * ●表示更新
 */
Window_LearnSkillList.prototype.refresh = function() {
    this.contents.clear();

    this._data = [];

    // 条件を満たすスキルセットのみを取得
    const skillSetList = pSkillSetList.filter(skillSet => this.isMatchSkillSet(skillSet));
    // さらにスキルセットの中で条件を満たすスキルのみを追加
    for (const skillSet of skillSetList) {
        const skillList = parseStruct1(skillSet.SkillList);
        for (const skillData of skillList) {
            const parseSkillData = JSON.parse(skillData);
            if (this.isDisplaySkillData(parseSkillData)) {
                this._data.push(parseSkillData);
            }
        }
    }

    // 習得スキルは下に表示する設定の場合
    if (pLearnedSkillDisplayStyle == "below") {
        this._data.sort((a, b) => {
            const skillIdA = Number(a.Skill);
            const skillIdB = Number(b.Skill);
            // 習得していないスキルを優先表示
            return this._actor.isLearnedSkill(skillIdA) - this._actor.isLearnedSkill(skillIdB);
        });
    }

    this.paint();
    this.updateHelp();
};

/**
 * ●スキルセットの条件を満たすかどうか？
 */
Window_LearnSkillList.prototype.isMatchSkillSet = function(skillSet) {
    // eval参照用
    const a = this._actor;

    const switchNo = Number(skillSet.Switch);
    // スイッチを満たしていない場合は不可
    if (skillSet.Switch && !$gameSwitches.value(switchNo)) {
        return false;
    // 対象のアクターではない場合は不可
    } else if (skillSet.Actor && skillSet.Actor != this._actor.actorId()) {
        return false;
    // スクリプト条件を満たしていない場合は不可
    } else if (skillSet.Script && !eval(skillSet.Script)) {
        return false;
    }
    return true;
}

/**
 * ●スキルの表示条件を満たすかどうか？
 */
Window_LearnSkillList.prototype.isDisplaySkillData = function(skillData) {
    const skillId = Number(skillData.Skill);

    // 習得スキルの表示方法
    const learnedSkillDisplayStyle = getLearnedSkillDisplayStyle(skillData);

    // 習得済スキルは表示しない設定の場合
    if (learnedSkillDisplayStyle == "hide" && this._actor.isLearnedSkill(skillId)) {
        return false;
    // 隠しスキルも表示する場合は表示
    } else if (pShowHiddenSkills) {
        return true;
    }
    
    // スキルを習得できるかどうか？
    return this.isMatchSkillData(skillData);
}

/**
 * ●スキルを習得条件を満たしているかどうか？
 * ※ポイントは除く
 */
Window_LearnSkillList.prototype.isMatchSkillData = function(skillData) {
    // eval参照用
    const a = this._actor;

    const conditionSkillId = Number(skillData.ConditionSkill);
    const switchNo = Number(skillData.Switch);

    // スイッチを満たしていない場合は不可
    if (skillData.Switch && !$gameSwitches.value(switchNo)) {
        return false;
    // 条件スキルを満たしていない場合は不可
    } else if (skillData.ConditionSkill && !this._actor.isLearnedSkill(conditionSkillId)) {
        return false;
    // スクリプト条件を満たしていない場合は不可
    } else if (skillData.Script && !eval(skillData.Script)) {
        return false;
    }
    return true;
}

/**
 * ●習得スキルの表示方法
 */
function getLearnedSkillDisplayStyle(skillData) {
    // 個別設定がある場合は優先
    if (skillData.LearnedSkillDisplayStyle) {
        return skillData.LearnedSkillDisplayStyle;
    }
    // それ以外は全体設定
    return pLearnedSkillDisplayStyle;
}

/**
 * ●選択中の項目を取得
 * ※dataSkillではなくプラグインパラメータのSkillData
 */
Window_LearnSkillList.prototype.item = function() {
    return this.itemAt(this.index());
};

/**
 * ●選択中の項目を取得
 * ※dataSkill
 */
Window_LearnSkillList.prototype.dataSkill = function() {
    return $dataSkills[this.item().Skill];
};

/**
 * ●指定した番号の項目を取得
 * ※dataSkillではなくプラグインパラメータのSkillData
 */
Window_LearnSkillList.prototype.itemAt = function(index) {
    return this._data && index >= 0 ? this._data[index] : null;
};

/**
 * ●全項目を表示
 */
Window_LearnSkillList.prototype.drawAllItems = function() {
    const topIndex = this.topIndex();
    for (let i = 0; i < this.maxVisibleItems(); i++) {
        const index = topIndex + i;
        if (index < this.maxItems()) {
            this.drawItemBackground(index);
            this.drawItem(index);
        }
    }
};

/**
 * ●項目数を定義
 */
Window_LearnSkillList.prototype.maxItems = function() {
    return this._data ? this._data.length : 1;
};

/**
 * ●項目を描画
 */
Window_LearnSkillList.prototype.drawItem = function(index) {
    const learnSkillData = this.itemAt(index);
    if (learnSkillData) {
        const costWidth = this.costWidth();
        const rect = this.itemLineRect(index);
        this.changePaintOpacity(this.isEnabled(learnSkillData));
        this.drawItemName(learnSkillData, rect.x, rect.y, rect.width - costWidth);
        this.drawSkillCost(learnSkillData, rect.x, rect.y, rect.width);
        this.changePaintOpacity(1);
    }
};

/**
 * ●現在の項目が有効かどうか？
 */
Window_LearnSkillList.prototype.isCurrentItemEnabled = function() {
    return this.isEnabled(this.item());
};

/**
 * ●スキルを習得できるかどうか？
 */
Window_LearnSkillList.prototype.isEnabled = function(item) {
    // 覚えられるスキルが一つもない場合
    if (!item) {
        return false;
    }
    // 習得済の場合
    const skillId = eval(item.Skill);
    if (this._actor.isLearnedSkill(skillId)) {
        return false;
    }
    // ＳＰが足りない
    const skillPoint = eval(item.SkillPoint);
    if (this._actor.currentSkillPoint() < skillPoint) {
        return false;
    }
    // 条件を満たしていない
    if (!this.isMatchSkillData(item)) {
        return false;
    }

    return true;
};

/**
 * ●項目名を表示
 */
Window_LearnSkillList.prototype.drawItemName = function(learnSkillData, x, y, width) {
    const skillId = Number(learnSkillData.Skill);
    const dataSkill = $dataSkills[skillId];
    const iconY = y + (this.lineHeight() - ImageManager.iconHeight) / 2;
    const textMargin = ImageManager.iconWidth + 4;
    const itemWidth = Math.max(0, width - textMargin);
    this.resetTextColor();

    let skillName = dataSkill.name;

    // マスク表示を行う場合は隠す
    if (pHiddenSkillMask && !this.isMatchSkillData(learnSkillData)) {
        skillName = pHiddenSkillMask;
    }

    // 表示名の指定がある場合
    if (learnSkillData.DisplayName) {
        // %1=スキル名, %2=アイコン
        const displayName = learnSkillData.DisplayName.format(skillName, "\\i[" + dataSkill.iconIndex + "]");
        this.drawTextEx(displayName, x, y, itemWidth);

    // 通常表示
    } else {
        // アイコンを使用
        if (pUseIcon) {
            this.drawIcon(dataSkill.iconIndex, x, iconY);
            x += textMargin;
        }
        this.drawText(skillName, x, y, itemWidth);
    }
};

/**
 * ●消費ＳＰの幅
 */
Window_LearnSkillList.prototype.costWidth = function() {
    return this.textWidth("0000");
};

/**
 * ●消費ＳＰの描画
 */
Window_LearnSkillList.prototype.drawSkillCost = function(learnSkillData, x, y, width) {
    const skillId = Number(learnSkillData.Skill);

    // 習得済スキルの場合
    if (this._actor.isLearnedSkill(skillId)) {
        if (pLearnedText) {
            this.changePaintOpacity(1);
            this.changeTextColor(ColorManager.textColor(pLearnedTextColor));
            this.drawText(pLearnedText, x, y, width, "right");
            this.resetTextColor();
        }
        return;
    }

    // 文字色変更
    this.changeTextColor(ColorManager.textColor(pSkillPointColor));

    // 条件を満たしていないスキルの場合は記号を表示
    if (!this.isMatchSkillData(learnSkillData)) {
        this.drawText(pHiddenSymbol, x, y, width - this.costWidth() - this.itemPadding(), "right");
    }

    // スキルポイントを表示
    if (learnSkillData.SkillPoint != null) {
        this.drawText(learnSkillData.SkillPoint, x, y, width, "right");
    }
};

/**
 * ●ヘルプを表示
 */
Window_LearnSkillList.prototype.updateHelp = function() {
    const learnSkillData = this.item();
    if (learnSkillData) {
        // ヘルプを隠す場合は追記のみ表示
        if (pHiddenHelp && !this.isMatchSkillData(learnSkillData)) {
            this._helpWindow.setText(learnSkillData.HelpPostscript);
            return;
        }

        const dataSkill = $dataSkills[learnSkillData.Skill];
        this.setHelpWindowItem(dataSkill);

        // 追記があれば設定
        if (learnSkillData.HelpPostscript) {
            const newText = this._helpWindow._text + "\n" + learnSkillData.HelpPostscript;
            this._helpWindow.setText(newText);
        }
    }
};

/**
 * ●文字列描画処理
 * ※Window_Base.prototype.drawTextExとほぼ同じだがフォントリセットしない。
 */
Window_LearnSkillList.prototype.drawTextEx = function(text, x, y, width) {
    const textState = this.createTextState(text, x, y, width);
    this.processAllText(textState);
    return textState.outputWidth;
};

//-----------------------------------------------------------------------------
// Window_LearnSkillActor
//
// 習得スキル用アクタークラス

function Window_LearnSkillActor() {
    this.initialize(...arguments);
}

Window_LearnSkillActor.prototype = Object.create(Window_StatusBase.prototype);
Window_LearnSkillActor.prototype.constructor = Window_LearnSkillActor;

Window_LearnSkillActor.prototype.initialize = function(rect) {
    Window_Selectable.prototype.initialize.call(this, rect);
};

Window_LearnSkillActor.prototype.setActor = function(actor) {
    if (this._actor !== actor) {
        this._actor = actor;
        this.refresh();
    }
};

Window_LearnSkillActor.prototype.refresh = function() {
    this.contents.clear();
    if (this._actor) {
        const nameRect = this.itemLineRect(0);
        this.drawActorName(this._actor, nameRect.x, this.itemPadding(), nameRect.width);
        this.drawActorFace(this._actor, nameRect.x, this.itemPadding() + nameRect.height + this.itemPadding());
        this.drawSkillPoint();
    }
};

/**
 * ●スキルポイントの描画
 */
Window_LearnSkillActor.prototype.drawSkillPoint = function() {
    const x = this.itemPadding();
    const y = this.paramY(0);

    this.changeTextColor(ColorManager.systemColor());
    this.drawText(pSkillPointName, x, y);
    this.resetTextColor();

    const skillPoint = this._actor.currentSkillPoint();
    const width = this.innerWidth - this.itemPadding() * 2;
    this.drawText(skillPoint, x, y, width, "right");
};

/**
 * ●スキルポイントのＹ座標
 */
Window_LearnSkillActor.prototype.paramY = function(index) {
    const faceHeight = ImageManager.faceHeight;
    return faceHeight + Math.floor(this.lineHeight() * (index + 1.5)) + this.itemPadding() * 2;
};

//-----------------------------------------------------------------------------
// Window_LearnSkillConfirm
//
// 習得確認用のウィンドウ

function Window_LearnSkillConfirm() {
    this.initialize(...arguments);
}

Window_LearnSkillConfirm.prototype = Object.create(Window_Command.prototype);
Window_LearnSkillConfirm.prototype.constructor = Window_LearnSkillConfirm;

Window_LearnSkillConfirm.prototype.initialize = function(rect) {
    // Window_Selectable.prototype.initialize.call(this, rect);
    Window_Command.prototype.initialize.call(this, rect);
};

/**
 * ●スキルデータの設定
 * ※dataSkillではなくプラグインパラメータのSkillData
 */
Window_LearnSkillConfirm.prototype.setSkillData = function(skillData) {
    this._skillData = skillData;
    this.refresh();
};

/**
 * ●選択中の項目を取得
 * ※dataSkillではなくプラグインパラメータのSkillData
 */
Window_LearnSkillConfirm.prototype.item = function() {
    return this._skillData;
};

/**
 * ●選択中の項目を取得
 * ※dataSkill
 */
Window_LearnSkillConfirm.prototype.dataSkill = function() {
    if (this._skillData) {
        return $dataSkills[this._skillData.Skill];
    }
    return null;
};

Window_LearnSkillConfirm.prototype.makeCommandList = function() {
    this.addCommand(pConfirmButtonOk, "ok");
    this.addCommand(pConfirmButtonCancel, "cancel");
};

Window_LearnSkillConfirm.prototype.drawAllItems = function() {
    const paramSkill = this._skillData;
    const dataSkill = this.dataSkill();
    if (!dataSkill) {
        return;
    }

    // 文字列の最大長を求める。
    let maxWidth = 0;
    // 行数カウント用
    let lineCount = 0;

    let skillPoint = 0;
    if (paramSkill.SkillPoint) {
        skillPoint = eval(paramSkill.SkillPoint);
    }

    for (const line of pConfirmMessage.split("\n")) {
        // %1をスキル名に%2をアイコンに%3をスキルポイントに変換
        const message = line.format(dataSkill.name, "\\i[" + dataSkill.iconIndex + "]", skillPoint);
        // 文字列の最大長を保持しておく。
        const newWidth = this.textSizeEx(message).width + this.itemPadding() * 4;
        maxWidth = Math.max(maxWidth, newWidth);

        // 一行ずつ描画
        this.drawTextEx(message, this.itemPadding(), this.itemPadding() + lineCount * this.lineHeight());
        lineCount++;
    }
    lineCount++;

    // ウィンドウの幅と座標を文字列に合わせて調整
    this.width = maxWidth;
    this.height = this.lineHeight() * lineCount + this.fittingHeight(2);
    this.x = (Graphics.boxWidth - this.width) / 2;
    this.y = (Graphics.boxHeight - this.height) / 2;

    const topIndex = this.topIndex();
    for (let i = 0; i < this.maxVisibleItems(); i++) {
        const index = topIndex + i;
        if (index < this.maxItems()) {
            this.drawItemBackground(index);
            this.drawItem(index);
        }
    }
};

Window_LearnSkillConfirm.prototype.drawItem = function(index) {
    const rect = this.itemLineRect(index);
    const align = this.itemTextAlign();
    this.resetTextColor();
    this.changePaintOpacity(this.isCommandEnabled(index));
    this.drawText(this.commandName(index), rect.x, rect.y, rect.width, align);
};

const _Window_LearnSkillConfirm_itemRect = Window_LearnSkillConfirm.prototype.itemRect;
Window_LearnSkillConfirm.prototype.itemRect = function(index) {
    const rect = _Window_LearnSkillConfirm_itemRect.apply(this, arguments);

    const lineCount = pConfirmMessage.split("\n").length;
    rect.y += lineCount * this.lineHeight() + this.itemPadding() * 4;

    return rect;
};

/**
 * ●文字列描画処理
 * ※Window_Base.prototype.drawTextExとほぼ同じだがフォントリセットしない。
 */
Window_LearnSkillConfirm.prototype.drawTextEx = function(text, x, y, width) {
    const textState = this.createTextState(text, x, y, width);
    this.processAllText(textState);
    return textState.outputWidth;
};

//-----------------------------------------------------------------------------
// Game_Actor
//-----------------------------------------------------------------------------

/**
 * ●変数初期化
 */
const _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
    _Game_Actor_initMembers.apply(this, arguments);
    this.initSkillPoint();
};

/**
 * 【独自】スキルポイントの初期化
 * ※プラグインの途中適用を考慮した初期化処理
 */
Game_Actor.prototype.initSkillPoint = function() {
    // パーティ共有の場合は不要なので無視
    if (pSkillPointType == "party") {
        return;
    }

    // アクター毎の場合
    // 値が未設定の場合は0を設定
    if (this[SKILL_POINT_KEY] == null) {
        this[SKILL_POINT_KEY] = 0;
    }
};

/**
 * 【独自】スキルポイントの取得
 */
Game_Actor.prototype.currentSkillPoint = function() {
    this.initSkillPoint();

    // パーティ共有の場合
    if (pSkillPointType == "party") {
        return $gameVariables.value(eval(pSkillPointVariable));
    }

    return this[SKILL_POINT_KEY];
};

/**
 * 【独自】スキルポイントの変更
 */
Game_Actor.prototype.changeSkillPoint = function(changePoint) {
    this.initSkillPoint();

    // 現在のスキルポイント
    const currentSp = this.currentSkillPoint();
    let newValue = currentSp + changePoint;
    if (newValue > pMaxSkillPoint) {
        newValue = pMaxSkillPoint;
    }

    // パーティ共有の場合
    if (pSkillPointType == "party") {
        const variableNo = eval(pSkillPointVariable);
        // 変数の値を加算
        $gameVariables.setValue(variableNo, newValue);
    // アクター毎の場合
    } else {
        this[SKILL_POINT_KEY] = newValue;
    }
};

//-----------------------------------------------------------------------------
// メニューコマンド（Window_MenuCommand, Scene_Menu）
//-----------------------------------------------------------------------------

if (pShowMenuCommandPosition != null) {
    /**
     * ●メニューコマンド追加（独自コマンド）
     */
    const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
    Window_MenuCommand.prototype.addOriginalCommands = function() {
        // 元処理実行
        _Window_MenuCommand_addOriginalCommands.call(this);

        // 非表示スイッチが存在かつオフの場合は無効
        if (pMenuCommandSwitch && !$gameSwitches.value(pMenuCommandSwitch)) {
            return;
        }
        
        let isEnabled = true;
        // 禁止スイッチが存在かつオンの場合は禁止
        if (pDisableSwitch && $gameSwitches.value(pDisableSwitch)) {
            isEnabled = false;
        }

        // 指定位置にスキル習得コマンドを挿入
        // ※標準ではステータスの下
        this._list.splice(pShowMenuCommandPosition, 0,
            { name: pCommandName, symbol: SYMBOL_SKILL_SYSTEM, enabled: isEnabled, ext: null});
    };

    /**
     * ●メニューコマンド呼び出し先の設定
     */
    const _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
    Scene_Menu.prototype.createCommandWindow = function() {
        _Scene_Menu_createCommandWindow.call(this);

        // コマンド追加
        this._commandWindow.setHandler(SYMBOL_SKILL_SYSTEM, this.commandPersonal.bind(this));
    };

    /**
     * ●アクター選択
     */
    const _Scene_Menu_onPersonalOk = Scene_Menu.prototype.onPersonalOk;
    Scene_Menu.prototype.onPersonalOk = function() {
        _Scene_Menu_onPersonalOk.apply(this, arguments);

        // スキル習得画面へ
        if (this._commandWindow.currentSymbol() == SYMBOL_SKILL_SYSTEM) {
            SceneManager.push(Scene_LearnSkillList);
        }
    };
}

//-----------------------------------------------------------------------------
// スキルポイントの取得
// （BattleManager, Game_System, Game_Troop, Game_Enemy, Game_Actor）
//-----------------------------------------------------------------------------

/**
 * ●報酬の作成
 */
const _BattleManager_makeRewards = BattleManager.makeRewards;
BattleManager.makeRewards = function() {
    _BattleManager_makeRewards.apply(this, arguments);

    // 報酬にＳＰを追加
    this._rewards["skillPoint"] = $gameTroop.skillPointTotal();
};

/**
 * ●報酬の獲得
 */
const _BattleManager_gainRewards = BattleManager.gainRewards;
BattleManager.gainRewards = function() {
    _BattleManager_gainRewards.apply(this, arguments);

    // ＳＰが有効なら加算
    if ($gameSystem.isSkiiPointEnabled()) {
        this.gainSkillPoint();
    }
};

/**
 * 【独自】スキルポイントの獲得
 */
BattleManager.gainSkillPoint = function() {
    const skillPoint = this._rewards["skillPoint"];

    // パーティ共有の場合
    if (pSkillPointType == "party") {
        // 現在のスキルポイントを取得
        const currentSkillPoint = $gameVariables.value(variableNo);
        const variableNo = eval(pSkillPointVariable);
        // 変数の値を加算
        const newValue = currentSkillPoint + skillPoint;
        $gameVariables.setValue(variableNo, newValue);
        return;
    }

    // 通常時はアクター毎に加算
    for (const actor of $gameParty.allMembers()) {
        actor.gainSkillPoint(skillPoint);
    }
};

/**
 * ●経験値の表示
 * ※BattleManager.displayRewardsを上書きしたくないので
 * 　こちらの末尾に追加
 */
const _BattleManager_displayExp = BattleManager.displayExp;
BattleManager.displayExp = function() {
    _BattleManager_displayExp.apply(this, arguments);

    // 獲得スキルポイントの表示
    const skillPoint = this._rewards["skillPoint"];
    if (skillPoint > 0 && pSkillPointMessage) {
        const text = pSkillPointMessage.format(skillPoint, pSkillPointName);
        $gameMessage.add("\\." + text);
    }
};

/**
 * ●スキルポイントが有効かどうか？
 */
Game_System.prototype.isSkiiPointEnabled = function() {
    // 有効スイッチがオフの場合は変更禁止
    if (pSkillPointSwitch && !$gameSwitches.value(pSkillPointSwitch)) {
        return false;
    }
    return true;
};

/**
 * 【独自】スキルポイントの合計
 */
Game_Troop.prototype.skillPointTotal = function() {
    // ＳＰが有効でない場合は0
    if (!$gameSystem.isSkiiPointEnabled()) {
        return 0;
    }

    return this.deadMembers().reduce((r, enemy) => r + enemy.skillPoint(), 0);
};

/**
 * 【独自】スキルポイントの取得
 */
Game_Enemy.prototype.skillPoint = function() {
    const a = this; // eval参照用

    let skillPoint = 0;

    // 設定値が存在する場合
    const metaSkillPoint = this.enemy().meta.SkillPoint;

    if (metaSkillPoint != undefined) {
        skillPoint = eval(metaSkillPoint);

    // 既定値が存在する場合
    } else if (pDefaultEnemySkillPoint != undefined) {
        skillPoint = eval(pDefaultEnemySkillPoint);
    }

    // rateを乗算する。
    const rate = this.enemy().meta.SkillPointRate;
    if (rate != undefined) {
        skillPoint = Math.round(skillPoint * rate / 100);
    }
    return skillPoint;
};

/**
 * 【独自】スキルポイントの獲得（アクター）
 */
Game_Actor.prototype.gainSkillPoint = function(skillPoint) {
    this.changeSkillPoint(Math.round(skillPoint * this.finalSkillPointRate()));
};

/**
 * 【独自】スキルポイントの獲得率
 */
Game_Actor.prototype.finalSkillPointRate = function() {
    return this.isBattleMember() ? 1 : this.benchMembersSkillPointRate();
};

/**
 * 【独自】控えメンバーのスキルポイント比率
 */
Game_Actor.prototype.benchMembersSkillPointRate = function() {
    if (pBenchSkillPointRate != undefined) {
        const a = this; // eval計算用
        return eval(pBenchSkillPointRate);
    }
    return $dataSystem.optExtraExp ? 1 : 0;
};

//-----------------------------------------------------------------------------
// スキルポイントの取得（レベルアップ時）
// （Game_Actor）
//-----------------------------------------------------------------------------

// レベルアップ時の増加ＳＰを保持する。
// ※複数レベルアップも想定
let mLevelSpTotal = 0;

/**
 * ●経験値の変更
 * ※レベルアップ処理の前に必ず通る想定
 */
const _Game_Actor_changeExp = Game_Actor.prototype.changeExp;
Game_Actor.prototype.changeExp = function(exp, show) {
    mLevelSpTotal = 0;

    _Game_Actor_changeExp.apply(this, arguments);
};

/**
 * ●レベルアップ
 */
const _Game_Actor_levelUp = Game_Actor.prototype.levelUp;
Game_Actor.prototype.levelUp = function() {
    _Game_Actor_levelUp.apply(this, arguments);

    if (pLevelUpSkillPoint) {
        const a = this; // eval参照用
        // ＳＰを獲得
        const levelUpSkillPoint = eval(pLevelUpSkillPoint);
        this.changeSkillPoint(levelUpSkillPoint);
        // 表示用に保持
        mLevelSpTotal += levelUpSkillPoint;
    }
};

/**
 * ●レベルダウン
 */
const _Game_Actor_levelDown = Game_Actor.prototype.levelDown;
Game_Actor.prototype.levelDown = function() {
    if (pLevelUpSkillPoint) {
        const a = this; // eval参照用
        // ＳＰを獲得
        const levelUpSkillPoint = eval(pLevelUpSkillPoint);
        this.changeSkillPoint(levelUpSkillPoint * -1);
        // 表示用に保持
        mLevelSpTotal -= levelUpSkillPoint;
    }

    _Game_Actor_levelDown.apply(this, arguments);
};

/**
 * ●レベルアップの表示
 */
const _Game_Actor_displayLevelUp = Game_Actor.prototype.displayLevelUp;
Game_Actor.prototype.displayLevelUp = function(newSkills) {
    _Game_Actor_displayLevelUp.apply(this, arguments);

    if (mLevelSpTotal) {
        $gameMessage.add(pSkillPointMessage.format(mLevelSpTotal, pSkillPointName));
    }

    // 終了したので初期化
    mLevelSpTotal = 0;
};

//-----------------------------------------------------------------------------
// スキルポイントの取得（アイテム）
// （Game_Action）
//-----------------------------------------------------------------------------

/**
 * ●効果適用
 */
const _Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    _Game_Action_apply.apply(this, arguments);

    // スキルポイントを加算
    const addSkillPoint = this.item().meta.AddSkillPoint;
    if (addSkillPoint) {
        const result = target.result();
        if (result.isHit()) {
            target.changeSkillPoint(eval(addSkillPoint));
            this.makeSuccess(target);
        }
    }
};

/**
 * ●効果適用判定
 */
const _Game_Action_hasItemAnyValidEffects = Game_Action.prototype.hasItemAnyValidEffects;
Game_Action.prototype.hasItemAnyValidEffects = function(target) {
    const ret = _Game_Action_hasItemAnyValidEffects.apply(this, arguments);
    // 効果が存在する場合は判定を有効にする。
    return ret || this.item().meta.AddSkillPoint;
};

})();
