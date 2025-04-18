﻿//=============================================================================
// NRP_AdditionalClasses.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.14 Multiple classes allow for a highly flexible growth system.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @orderAfter NRP_TraitsPlus
 * @url http://newrpg.seesaa.net/article/483582956.html
 *
 * @help By setting multiple classes for actors at the same time,
 * a highly flexible growth system can be realized.
 * 
 * Classes in RPG Maker MZ have a rather peculiar specification.
 * Since the class and its level almost determine the actor's ability,
 * it is difficult to set up the actor's own personality.
 * 
 * If you do a class change based on this specification, you will end up
 * with a completely different character with different abilities.
 * ※So called Dragon Quest 3 type and Final Fantasy 3 type.
 * 
 * In fact, most of the works express the individuality of actors
 * by making a one-to-one correspondence between actors and classes.
 * In fact, in most of the works, actors
 * and classes have a one-to-one correspondence.
 * 
 * Therefore, this plug-in provides a class change system
 * with a high degree of freedom by retaining the base class
 * of the actor's ability values and granting additional classes.
 * 
 * For example, it is possible to change classes
 * while retaining the original personality, as in Dragon Quest 6.
 * Additional classes have their own levels,
 * and skills are learned according to those levels.
 * ※Initially, actor will level up with normal experience.
 * 
 * It can also be used for other systems in general,
 * such as Final Fantasy 6's magic stone system
 * and Dragon Quest 8's skill mastering,
 * where skills are learned in stages depending on proficiency.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Just create an additional class
 * and add it to the actor with the plugin command.
 * You will have an actor that has both the two traits
 * of the base class and the additional class.
 * 
 * In addition, you can customize your actors freely by changing classes.
 * With the included "NRP_AdditionalCCScene.js",
 * you can easily create a class change system.
 * 
 * Other than that, this plugin is very customizable.
 * Please read the description of plugin commands and parameters.
 * 
 * -------------------------------------------------------------------
 * [Plugin Command]
 * -------------------------------------------------------------------
 * ◆AddClass
 * Set the additional class to actor.
 * 
 * You can add multiple classes by changing the index.
 * This is useful if you want to create a subclass-like system.
 * 
 * ◆RemoveClass
 * Remove the additional class.
 * 
 * ◆ChangeExp
 * Increases or decreases the experience value for additional classes.
 * Unlike the "Change EXP" event command,
 * this only operates on additional classes.
 * 
 * ◆ChangeLevel
 * Increase or decrease the level for additional classes.
 * Unlike the "Change Level" event command,
 * this will only increase or decrease the level for additional classes.
 * 
 * ◆GetInformation
 * Stores information about the additional classes
 * that the actor is serving in a variable.
 * Class ID, level, and experience can be obtained.
 * 
 * Use this command because additional classes
 * cannot be determined by the normal event command.
 * 
 * -------------------------------------------------------------------
 * [Main Plugin Parameters]
 * -------------------------------------------------------------------
 * ◆ParamPlus
 * Adds the value set in the class' parameter curve to the actor.
 * This can be used for level-growing classes, etc.
 * Default value is off.
 * 
 * ◆KeepSkill
 * Keeps the skills of additional classes learned when changing classes.
 * Default value is off.
 * 
 * In addition, it is also possible to configure the settings for each skill.
 * ※See "Note of Skills" below.
 * 
 * ◆UseNormalExp
 * Use normal experience processing even for additional classes.
 * Make the experience processing affected
 * by battle victories and event commands.
 * 
 * Default value is on.
 * Turn off if you want to do your own experience processing,
 * such as proficiency.
 * 
 * Experience and level can be manipulated with plug-in commands even when off.
 * It is also possible to set class-specific experience values
 * for each enemy character.
 * ※See "Note of Enemies" below.
 * 
 * ◆UnificationExp
 * Class experience is shared by the party.
 * This means that the same class will be
 * at the same level no matter who changes classes.
 * Default value is off.
 * 
 * I envision a growth system that is independent of the actor,
 * like the GF in FF8, Persona 1-2, and Master Quotes in the Trails series.
 * 
 * ◆OverwriteClassField, ShowLevelOnStatus
 * Additional class will be displayed in the class column and Status screen.
 * Instead, the actor's base class and nickname will be hidden.
 * The default value is on.
 * 
 * -------------------------------------------------------------------
 * [Note of Classes]
 * -------------------------------------------------------------------
 * <MaxLevel:?>
 * Specify the maximum level for each additional class.
 * Overrides the default value of the plugin parameter.
 * 
 * -------------------------------------------------------------------
 * [Note of Skills]
 * -------------------------------------------------------------------
 * <KeepSkill>
 * Even if the setting is not to keep skills,
 * the skills will be kept when the class changes.
 * 
 * <KeepSkill:false>
 * On the other hand, even if the setting is to maintain the skill,
 * do not maintain it.
 * 
 * -------------------------------------------------------------------
 * [Note of Enemies]
 * -------------------------------------------------------------------
 * <ClassExp:?>
 * Specify the experience value to be added only for additional classes.
 * You can implement your own kind of proficiency
 * by turning off "UseNormalExp".
 * 
 * "ExpName" is used to indicate when a battle is over.
 * 
 * <ClassExpRate:?>
 * Change the class EXP earned to the specified %.
 * For example, 200 would be 200% (double).
 * Intended to be used in combination with the default value.
 * 
 * -------------------------------------------------------------------
 * [Note of Items]
 * -------------------------------------------------------------------
 * <AddClassExp:?>
 * Increases class EXP.
 * When level up, the item menu is closed
 * and then a message is displayed.
 * 
 * -------------------------------------------------------------------
 * [Note (actor, class, equipment, state)]
 * -------------------------------------------------------------------
 * <ClassExpRate:?>
 * Change the amount of class exp gained to the specified %.
 * For example, 200 would be 200% (double).
 * If you do not want the class experience to be gained when dead,
 * specify <ClassExpRate:0> for the dead state.
 * 
 * -------------------------------------------------------------------
 * [Script]]
 * -------------------------------------------------------------------
 * ◆actor.currentAdditionalClass(0);
 * Get additional class information for the actor.
 * 
 * If there are subclasses, you can increase the number (0 is the first).
 * For example, you can get the class name and class level
 * of the first actor with the following.
 * 
 * $gameParty.members()[0].currentAdditionalClass(0).name;
 * $gameParty.members()[0].currentAdditionalClass(0).level;
 * 
 * ※"actor" is an object of the Game_Actor class.
 * ※If the actor is not in the additional class, an error will occur.
 * 
 * ◆actor.isAdditionalClassId(1);
 * Determines if the actor is in an additional class.
 * The number is the class ID.
 * 
 * -------------------------------------------------------------------
 * [Notice]
 * -------------------------------------------------------------------
 * The standard specification is that when an actor changes classes,
 * he/she forgets the skills learned in that class.
 * In that case, the relevant skills are forgotten
 * without distinction, even if they were learned in other ways.
 * (This distinction is hard to make, and we have no plans to fix it.)
 * 
 * Please make sure that skills learned in additional classes
 * and skills learned by other means are registered separately.
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
 * @command AddClass
 * @desc Set the additional class to actor.
 * 
 * @arg Actor
 * @type actor
 * @desc The target actor.
 * If not specified, the entire party is targeted.
 * 
 * @arg VariableActor
 * @type variable
 * @desc Specify the target actor as a variable.
 * This one has priority.
 * 
 * @arg Index
 * @type number
 * @default 0
 * @desc The registration position of the class, starting from 0.
 * If left blank, add to the back.
 * 
 * @arg AdditionalClass
 * @type class
 * @desc The class to add.
 * 
 * @------------------------------------------------------------------
 * 
 * @command RemoveClass
 * @desc Remove the additional class from the actor.
 * Specify the condition AND.
 * 
 * @arg Actor
 * @type actor
 * @desc The target actor.
 * If not specified, the entire party is targeted.
 * 
 * @arg VariableActor
 * @type variable
 * @desc Specify the target actor as a variable.
 * This one has priority.
 * 
 * @arg <Condition>
 * 
 * @arg Index
 * @parent <Condition>
 * @type number
 * @desc This is the registered position of the class to be deleted.
 * Start from 0.
 * 
 * @arg AdditionalClass
 * @parent <Condition>
 * @type class
 * @desc Additional classes to remove.
 * 
 * @arg <Option>
 * 
 * @arg FillGap
 * @parent <Option>
 * @type boolean
 * @default false
 * @desc Fill in the gaps after removing them.
 * 
 * @------------------------------------------------------------------
 * 
 * @command ChangeExp
 * @desc Modify the experience values of additional classes.
 * Specify the target condition AND.
 * 
 * @arg Exp
 * @type number @min -9999999 @max 9999999
 * @desc The amount of experience to change. Can be negative.
 * 
 * @arg VariableExp
 * @type variable
 * @desc The variable specifies the amount of experiences to increase or decrease. This takes precedence.
 * 
 * @arg ShowLvUpMessage
 * @type boolean
 * @default false
 * @desc Displays a message when you level up.
 * 
 * @arg <Condition>
 * 
 * @arg Actor
 * @parent <Condition>
 * @type actor
 * @desc The actor to target.
 * If not specified, the entire party is targeted.
 * 
 * @arg VariableActor
 * @parent <Condition>
 * @type variable
 * @desc Specify the target actor as a variable.
 * This one has priority.
 * 
 * @arg Index
 * @parent <Condition>
 * @type number
 * @desc This is the registered position of the class to be targeted.
 * If unspecified, all classes in service will be targeted.
 * 
 * @arg AdditionalClass
 * @parent <Condition>
 * @type class
 * @desc The additional classes to target.
 * If not specified, all classes that are in service are targeted.
 * 
 * @------------------------------------------------------------------
 * 
 * @command ChangeLevel
 * @desc Change the level of the additional class.
 * Specify the target condition AND.
 * 
 * @arg Level
 * @type number @min -99 @max 99
 * @desc The amount of level to change. Minus value can be specified.
 * 
 * @arg VariableLevel
 * @type variable
 * @desc The variable specifies the amount of levels to increase or decrease. This takes precedence.
 * 
 * @arg ShowLvUpMessage
 * @type boolean
 * @default false
 * @desc Displays a message when you level up.
 * 
 * @arg <Condition>
 * 
 * @arg Actor
 * @parent <Condition>
 * @type actor
 * @desc The actor to target.
 * If not specified, the entire party is targeted.
 * 
 * @arg VariableActor
 * @parent <Condition>
 * @type variable
 * @desc Specify the target actor as a variable.
 * This one has priority.
 * 
 * @arg Index
 * @parent <Condition>
 * @type number
 * @desc This is the registered position of the class to be targeted.
 * If unspecified, all classes in service will be targeted.
 * 
 * @arg AdditionalClass
 * @parent <Condition>
 * @type class
 * @desc The additional classes to target.
 * If not specified, all classes that are in service are targeted.
 * 
 * @------------------------------------------------------------------
 * 
 * @command GetInformation
 * @desc Get information about the additional classes that the actor is in.
 * 
 * @arg VariableAtClass
 * @type variable
 * @desc This variable stores the ID of the additional class that the actor is in.
 * 
 * @arg VariableAtLv
 * @type variable
 * @desc A variable that stores the level of the additional class that the actor is in.
 * 
 * @arg VariableAtExp
 * @type variable
 * @desc A variable that stores the experience of the additional classes that the actor is in.
 * 
 * @arg <Condition>
 * 
 * @arg Actor
 * @parent <Condition>
 * @type actor
 * @desc The target actor.
 * 
 * @arg VariableActor
 * @parent <Condition>
 * @type variable
 * @desc Specify the target actor as a variable.
 * This one has priority.
 * 
 * @arg Index
 * @parent <Condition>
 * @type number
 * @default 0
 * @desc This is the registration position of the target class.
 * Start from 0.
 * 
 * @------------------------------------------------------------------
 * @ [Plugin Parameters]
 * @------------------------------------------------------------------
 * 
 * @param ParamPlus
 * @type boolean
 * @default false
 * @desc Add the parameters of the class to the actor.
 * 
 * @param KeepSkill
 * @type boolean
 * @default false
 * @desc When changing classes, make sure to keep your skills.
 * 
 * @param DefaultMaxLevel
 * @type number @max 99
 * @desc Default value for the maximum level of additional class.
 * If not specified otherwise, this value will be used.
 * 
 * @param LvUpMessage
 * @type string
 * @default %1 is now %2 Level %3!
 * @desc Displays the class level-up message.
 * %1=actor name, %2=class name, %3=Lv.
 * 
 * @param LvName
 * @type string
 * @default Lv
 * @desc The display name for the class level.
 * 
 * @param ExpName
 * @type string
 * @default EXP
 * @desc The display name for the class experience.
 * 
 * @param <ClassExp>
 * 
 * @param UseNormalExp
 * @parent <ClassExp>
 * @type boolean
 * @default true
 * @desc When you gain normal exp, it will also be reflected to additional classes. Turn this off if you want to use your own points.
 * 
 * @param DefaultClassExp
 * @parent <ClassExp>
 * @type string
 * @desc Sets the default value for class experience.
 * Formula is valid.（eg: 1 + Math.floor(a.exp() / 100)）
 * 
 * @param ClassExpMessage
 * @parent <ClassExp>
 * @type string
 * @default %1 %2 received!
 * @desc Displays the class experience gain message.
 * %1=number, %2=ExpName.
 * 
 * @param ClassLvUpLater
 * @parent <ClassExp>
 * @type boolean
 * @default false
 * @desc Display class level up after all actors have leveled up.
 * 
 * @param ClassExpSwitch
 * @parent <ClassExp>
 * @type switch
 * @desc Enables the change exp to additional classes when the specified switch is on. If blank, always enabled.
 * 
 * @param BenchClassExpRate
 * @parent <ClassExp>
 * @type string
 * @default 1.00
 * @desc The rate at which reserve members gain class exp. Formula OK.
 * If blank, the same rate as normal experience is used.
 * 
 * @param SubClassExpRate
 * @parent <ClassExp>
 * @type string
 * @default 1.00
 * @desc The rate of experience gain for the subclass. Formula OK.
 * If blank, the same rate as normal class is used.
 * 
 * @param UnificationExp
 * @parent <ClassExp>
 * @type boolean
 * @default false
 * @desc Class experience is shared by the party.
 * Can be used for systems such as growing magic stones.
 * 
 * @param NoDuplicateExp
 * @parent UnificationExp
 * @type boolean
 * @default false
 * @desc When exp is shared, and multiple actors are working on the same class, duplicate exp is prohibited.
 * 
 * @param OverwriteClassField
 * @type boolean
 * @default true
 * @desc Show additional class in the class column. (Hide normal class.) First additional class (index = 0) is targeted.
 * 
 * @param ShowLevelOnMenu
 * @parent OverwriteClassField
 * @type select
 * @option
 * @option simple
 * @option full
 * @desc Additional class levels are displayed on the menu screen.
 * Some screen width is required for full.
 * 
 * @param ShowLevelOnStatus
 * @type boolean
 * @default true
 * @desc The level of the additional class will be displayed on the status. The nickname will be removed for adjustment purposes.
 * 
 * @param NormalExpWidth
 * @parent ShowLevelOnStatus
 * @type number
 * @default 110
 * @desc The width of the normal experience value to be displayed on the status screen.
 * 
 * @param ClassExpWidth
 * @parent ShowLevelOnStatus
 * @type number
 * @default 110
 * @desc The width of the class experience value to be displayed on the status screen.
 * 
 * @param ClassLvMaxExp
 * @parent ShowLevelOnStatus
 * @type string
 * @default -------
 * @desc The notation of experience when the occupation level is reached to the maximum.
 * 
 * @param ShowMaxLevelMessage
 * @type boolean
 * @default false
 * @desc Displays a message when an additional class reaches the max level.
 * 
 * @param MaxLevelMessage
 * @parent ShowMaxLevelMessage
 * @type string
 * @default %1 mastered %2!
 * @desc The message when the max level is reached.
 * %1=actor name, %2=class name, %3=level
 * 
 * @param ShowBenchMaxLevel
 * @parent ShowMaxLevelMessage
 * @type boolean
 * @default false
 * @desc The message is forced to be displayed for the reserved members as well. Function only when used with NRP_BenchMembersExp.js.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.14 多重職業によって自由度の高い成長システムを実現。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @orderAfter NRP_TraitsPlus
 * @url http://newrpg.seesaa.net/article/483582956.html
 *
 * @help アクターに対して、複数の職業を同時に設定することにより、
 * 自由度の高い成長システムを実現します。
 * 
 * ＲＰＧツクールＭＺの職業はかなりクセのある仕様になっています。
 * 職業とそのレベルによって、アクターの能力がほぼ確定するため、
 * アクター自身の個性を設定することが困難です。
 * 
 * もし、この仕様に基づいて転職を行うと、
 * 全く別の能力を持ったキャラクターになってしまいます。
 * ※いわゆるＤＱ３型およびＦＦ３型
 * 
 * 実際のところ、ほとんどの作品ではアクターと職業を
 * 一対一に対応させることで、アクターの個性を表現しています。
 * 事実上、職業という仕組みが機能していない有様です。
 * 
 * そこでこのプラグインでは、
 * アクターの能力値のベースとなる職業（ベース職業）を残したまま、
 * さらに追加の職業（追加職業）を付与することで、
 * 自由度の高い転職システムを実現します。
 * 
 * 例えば、ＤＱ６のように元の個性を残したままの転職が可能です。
 * 追加職業は独自のレベルを持ち、そのレベルに応じてスキルも習得します。
 * ※初期状態では通常の経験値でレベルアップします。
 * 
 * その他にも、ＦＦ６の魔石システムやＤＱ８のスキルマスターのように、
 * 熟練度によってスキルを段階的に習得するシステム全般に活用できます。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * 追加用の職業を作成し、
 * プラグインコマンドでアクターに追加すればＯＫです。
 * ベース職業と追加職業の２つの特徴を併せ持ったアクターが誕生します。
 * 
 * さらに転職によって自由なアクターのカスタマイズが可能です。
 * 付属の『NRP_AdditionalCCScene.js』を利用すれば、
 * 簡単に転職システムを作成できます。
 * 
 * その他にも当プラグインは非常にカスタマイズ性が高くなっています。
 * プラグインコマンドやパラメータの解説をお読みください。
 * 
 * -------------------------------------------------------------------
 * ■プラグインコマンド
 * -------------------------------------------------------------------
 * ◆職業の追加
 * 追加職業をアクターに設定します。
 * 
 * インデックスを変更することによって、複数の職業を追加できます。
 * サブ職のようなシステムを作りたい場合に有用です。
 * 
 * ◆職業の削除
 * 追加職業を削除します。
 * 
 * ◆経験値の増減
 * 追加職業に対して経験値を増減させます。
 * イベントコマンドの『経験値の増減』とは異なり、
 * 追加職業に対してのみ増減を行います。
 * 
 * ◆レベルの増減
 * 追加職業に対してレベルを増減させます。
 * イベントコマンドの『レベルの増減』とは異なり、
 * 追加職業に対してのみ増減を行います。
 * 
 * ◆追加職業の情報を取得
 * アクターが就いている追加職業に関する情報を変数に格納します。
 * 職業ＩＤ、レベル、経験値を取得可能です。
 * 
 * 追加職業は通常のイベントコマンドでは判別できないため、
 * このコマンドを使用してください。
 * 
 * -------------------------------------------------------------------
 * ■主なプラグインパラメータ
 * -------------------------------------------------------------------
 * ◆パラメータを加算
 * 職業の能力値曲線に設定されている値を、アクターに加算します。
 * レベル成長する職業などに活用できます。
 * 初期値はオフです。
 * 
 * ◆スキルを維持する
 * 転職時、習得した追加職業のスキルを維持します。
 * 初期値はオフです。
 * 
 * なお、スキル単位での設定も可能です。
 * ※以下の『スキルのメモ欄』を参照
 * 
 * ◆通常の経験値を使用
 * 追加職業に対しても、通常の経験値処理を使用します。
 * 戦闘勝利時やイベントコマンドによる
 * 経験値処理の影響を受けるようにします。
 * 
 * 初期値はオンです。
 * 熟練度のような独自の経験値処理を行う場合は、オフにしてください。
 * 
 * オフの場合もプラグインコマンドで経験値やレベルを操作可能です。
 * また、敵キャラ毎に職業専用の経験値を設定することも可能です。
 * ※以下の『敵キャラのメモ欄』を参照
 * 
 * ◆経験値の共有化
 * 職業の経験値をパーティで共有します。
 * つまり、誰が転職しても同じ職業は同じレベルになります。
 * 初期値はオフです。
 * 
 * ＦＦ８のＧＦやペルソナ１～２、軌跡シリーズのマスタークオーツのように、
 * アクターとは独立した成長システムを想定しています。
 * 
 * ◆職業欄を上書表示、ステータスにレベル表示
 * 追加職業を職業欄やステータス画面に表示します。
 * その代わり、アクターのベース職業や二つ名は非表示になります。
 * 初期値はオンです。
 * 
 * -------------------------------------------------------------------
 * ■職業のメモ欄
 * -------------------------------------------------------------------
 * <MaxLevel:?>
 * 追加職業毎に最大レベルを指定します。
 * プラグインパラメータの既定値よりも優先されます。
 * 
 * -------------------------------------------------------------------
 * ■スキルのメモ欄
 * -------------------------------------------------------------------
 * <KeepSkill>
 * スキルを維持しない設定でも、転職時にスキルを維持するようにします。
 * 
 * <KeepSkill:false>
 * 逆にスキルを維持する設定でも、維持しないようにします。
 * 
 * -------------------------------------------------------------------
 * ■敵キャラのメモ欄
 * -------------------------------------------------------------------
 * <ClassExp:?>
 * 追加職業にのみ加算する経験値を指定します。
 * 
 * 『通常の経験値を使用』をオフにすることによって、
 * 独自の熟練度のようなものを実装できます。
 * 
 * 戦闘終了時の表示には『EXPの表示名』が使用されます。
 * 
 * <ClassExpRate:?>
 * 獲得できる追加職業の経験値を指定した%に変更します。
 * 例えば、200ならば200%（２倍）になります。
 * 既定値とのセットで使うことを想定しています。
 * 
 * -------------------------------------------------------------------
 * ■アイテムのメモ欄
 * -------------------------------------------------------------------
 * <AddClassExp:?>
 * 職業経験値を増加させます。
 * レベルアップ時はアイテムメニューを閉じてから、メッセージを表示します。
 * 
 * -------------------------------------------------------------------
 * ■アクター、職業、装備、ステートのメモ欄
 * -------------------------------------------------------------------
 * <ClassExpRate:?>
 * 職業経験値の獲得量を指定した%に変更します。
 * 200ならば200%（２倍）になります。
 * もし、戦闘不能時に職業経験値を獲得させたくない場合は、
 * 戦闘不能ステートに<ClassExpRate:0>を指定してください。
 * 
 * -------------------------------------------------------------------
 * ■スクリプト
 * -------------------------------------------------------------------
 * ◆actor.currentAdditionalClass(0);
 * アクターの追加職業情報を取得します。
 * 
 * サブ職業が存在する場合は、数値（0が先頭）を増やせばＯＫです。
 * 例えば、以下で先頭のアクターの職業名や職業レベルを取得できます。
 * 
 * $gameParty.members()[0].currentAdditionalClass(0).name;
 * $gameParty.members()[0].currentAdditionalClass(0).level;
 * 
 * ※actorはGame_Actorクラスのオブジェクトです。
 * ※追加職業に就いてない場合はエラーになります。
 * 
 * ◆actor.isAdditionalClassId(1);
 * アクターが追加職業に就いているかを判定します。
 * 数値は職業ＩＤです。
 * 
 * -------------------------------------------------------------------
 * ■注意点
 * -------------------------------------------------------------------
 * 標準では転職すると、その職業で覚えたスキルを忘れる仕様になっています。
 * その際、該当のスキルは他の方法で覚えたスキルであっても、
 * 区別なく忘れてしまいます。
 * （仕様上、区別が大変なので、修正の予定もありません。）
 * 
 * 追加職業で習得するスキルと、その他の手段で習得するスキルは、
 * 区別して登録するようにお願いします。
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
 * @command AddClass
 * @text 職業の追加
 * @desc 追加職業をアクターに設定します。
 * 
 * @arg Actor
 * @text アクター
 * @type actor
 * @desc 対象とするアクターです。
 * 未指定ならパーティ全体を対象とします。
 * 
 * @arg VariableActor
 * @text アクター（変数指定）
 * @type variable
 * @desc 対象とするアクターを変数で指定します。
 * こちらのほうが優先されます。
 * 
 * @arg Index
 * @text インデックス
 * @type number
 * @default 0
 * @desc 職業の登録位置です。0から開始。
 * 空白にすると後ろに追加します。
 * 
 * @arg AdditionalClass
 * @text 追加職業
 * @type class
 * @desc 追加する職業です。
 * 
 * @------------------------------------------------------------------
 * 
 * @command RemoveClass
 * @text 職業の削除
 * @desc 追加職業をアクターから削除します。
 * 条件をＡＮＤ指定してください。
 * 
 * @arg Actor
 * @text アクター
 * @type actor
 * @desc 対象とするアクターです。
 * 未指定ならパーティ全体を対象とします。
 * 
 * @arg VariableActor
 * @text アクター（変数指定）
 * @type variable
 * @desc 対象とするアクターを変数で指定します。
 * こちらのほうが優先されます。
 * 
 * @arg <Condition>
 * @text ＜対象条件＞
 * 
 * @arg Index
 * @parent <Condition>
 * @text インデックス
 * @type number
 * @desc 削除する職業の登録位置です。
 * 0から開始します。
 * 
 * @arg AdditionalClass
 * @parent <Condition>
 * @text 削除する追加職業
 * @type class
 * @desc 削除する追加職業です。
 * 
 * @arg <Option>
 * @text ＜オプション＞
 * 
 * @arg FillGap
 * @parent <Option>
 * @text 隙間を詰める
 * @type boolean
 * @default false
 * @desc 削除後に隙間を詰めます。
 * 
 * @------------------------------------------------------------------
 * 
 * @command ChangeExp
 * @text 経験値の増減
 * @desc 追加職業の経験値を変更します。
 * 対象条件をＡＮＤ指定してください。
 * 
 * @arg Exp
 * @text 経験値
 * @type number @min -9999999 @max 9999999
 * @desc 増減する経験値の量です。マイナス指定可。
 * 
 * @arg VariableExp
 * @text 経験値（変数）
 * @type variable
 * @desc 増減する経験値の量を変数で指定します。
 * こちらのほうが優先されます。
 * 
 * @arg ShowLvUpMessage
 * @text レベルアップを表示
 * @type boolean
 * @default false
 * @desc レベルアップ時にメッセージを表示します。
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
 * @text アクター（変数指定）
 * @type variable
 * @desc 対象とするアクターを変数で指定します。
 * こちらのほうが優先されます。
 * 
 * @arg Index
 * @parent <Condition>
 * @text インデックス
 * @type number
 * @desc 対象とする職業の登録位置です。
 * 未指定なら就いている職業全てを対象とします。
 * 
 * @arg AdditionalClass
 * @parent <Condition>
 * @text 追加職業
 * @type class
 * @desc 対象とする追加職業です。
 * 未指定なら就いている職業全てを対象とします。
 * 
 * @------------------------------------------------------------------
 * 
 * @command ChangeLevel
 * @text レベルの増減
 * @desc 追加職業のレベルを変更します。
 * 対象条件をＡＮＤ指定してください。
 * 
 * @arg Level
 * @text レベル
 * @type number @min -99 @max 99
 * @desc 増減するレベルの量です。マイナス指定可。
 * 
 * @arg VariableLevel
 * @text レベル（変数）
 * @type variable
 * @desc 増減するレベルの量を変数で指定します。
 * こちらのほうが優先されます。
 * 
 * @arg ShowLvUpMessage
 * @text レベルアップを表示
 * @type boolean
 * @default false
 * @desc レベルアップ時にメッセージを表示します。
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
 * @text アクター（変数指定）
 * @type variable
 * @desc 対象とするアクターを変数で指定します。
 * こちらのほうが優先されます。
 * 
 * @arg Index
 * @parent <Condition>
 * @text インデックス
 * @type number
 * @desc 対象とする職業の登録位置です。
 * 未指定なら就いている職業全てを対象とします。
 * 
 * @arg AdditionalClass
 * @parent <Condition>
 * @text 追加職業
 * @type class
 * @desc 対象とする追加職業です。
 * 未指定なら就いている職業全てを対象とします。
 * 
 * @------------------------------------------------------------------
 * 
 * @command GetInformation
 * @text 追加職業の情報を取得
 * @desc アクターが就いている追加職業に関する情報を取得します。
 * 
 * @arg VariableAtClass
 * @text 変数（追加職業）
 * @type variable
 * @desc アクターが就いている追加職業のＩＤを格納する変数です。
 * 
 * @arg VariableAtLv
 * @text 変数（レベル）
 * @type variable
 * @desc アクターが就いている追加職業のレベルを格納する変数です。
 * 
 * @arg VariableAtExp
 * @text 変数（経験値）
 * @type variable
 * @desc アクターが就いている追加職業の経験値を格納する変数です。
 * 
 * @arg <Condition>
 * @text ＜取得条件＞
 * 
 * @arg Actor
 * @parent <Condition>
 * @text アクター
 * @type actor
 * @desc 対象とするアクターです。
 * 
 * @arg VariableActor
 * @parent <Condition>
 * @text アクター（変数指定）
 * @type variable
 * @desc 対象とするアクターを変数で指定します。
 * こちらのほうが優先されます。
 * 
 * @arg Index
 * @parent <Condition>
 * @text インデックス
 * @type number
 * @default 0
 * @desc 対象とする職業の登録位置です。
 * 0から開始します。
 * 
 * @------------------------------------------------------------------
 * @ プラグインパラメータ
 * @------------------------------------------------------------------
 * 
 * @param ParamPlus
 * @text パラメータを加算
 * @type boolean
 * @default false
 * @desc 職業の能力値をアクターに加算します。
 * 
 * @param KeepSkill
 * @text スキルを維持する
 * @type boolean
 * @default false
 * @desc 転職時、スキルを維持するようにします。
 * 
 * @param DefaultMaxLevel
 * @text 最大レベル既定値
 * @type number @max 99
 * @desc 追加職業の最大レベルの既定値です。
 * 特に指定がなければ、この値が使用されます。
 * 
 * @param LvUpMessage
 * @text Lvアップメッセージ
 * @type string
 * @default %1は%2レベル %3 に上がった！
 * @desc 職業のレベルアップメッセージを表示します。
 * %1=アクター, %2=職業名, %3=Lvとなります。
 * 
 * @param LvName
 * @text Lvの表示名
 * @type string
 * @default Lv
 * @desc 職業のレベルを表す表示名です。
 * 
 * @param ExpName
 * @text EXPの表示名
 * @type string
 * @default EXP
 * @desc 職業の経験値を表す表示名です。
 * 
 * @param <ClassExp>
 * @text ＜職業経験値関連＞
 * 
 * @param UseNormalExp
 * @parent <ClassExp>
 * @text 通常の経験値を使用
 * @type boolean
 * @default true
 * @desc 通常の経験値取得時に、追加職業へも経験値を反映させます。
 * 独自ポイントを使う場合はオフにしてください。
 * 
 * @param DefaultClassExp
 * @parent <ClassExp>
 * @text 職業経験値の既定値
 * @type string
 * @desc 職業経験値の既定値を設定します。
 * 数式可（例：1 + Math.floor(a.exp() / 100)）
 * 
 * @param ClassExpMessage
 * @parent <ClassExp>
 * @text EXP獲得メッセージ
 * @type string
 * @default %1 の%2を獲得！
 * @desc 職業経験値の獲得メッセージを表示します。
 * %1=数値, %2=EXPの表示名となります。
 * 
 * @param ClassLvUpLater
 * @parent <ClassExp>
 * @text 職業Lvアップを後回し
 * @type boolean
 * @default false
 * @desc 職業レベルアップの表示を、アクター全員のレベルアップより後で表示します。
 * 
 * @param ClassExpSwitch
 * @parent <ClassExp>
 * @text 職業経験値の有効化ｽｲｯﾁ
 * @type switch
 * @desc 指定のスイッチがオンの際、追加職業への経験値の増減を有効化します。空白なら常に有効。
 * 
 * @param BenchClassExpRate
 * @parent <ClassExp>
 * @text 控えの獲得率
 * @type string
 * @default 1.00
 * @desc 控えメンバーの職業経験値の獲得率です。数式可
 * 空白の場合は通常経験値と同率を使用。
 * 
 * @param SubClassExpRate
 * @parent <ClassExp>
 * @text サブ職業の獲得率
 * @type string
 * @default 1.00
 * @desc サブ職業（２以降）の経験値獲得率です。数式可
 * 空白の場合は先頭の職業と同率を使用。
 * 
 * @param UnificationExp
 * @parent <ClassExp>
 * @text 経験値の共有化
 * @type boolean
 * @default false
 * @desc 職業の経験値をパーティで共有します。
 * 成長する魔石のようなシステムに使えます。
 * 
 * @param NoDuplicateExp
 * @parent UnificationExp
 * @text 経験値の重複禁止
 * @type boolean
 * @default false
 * @desc 経験値の共有化を行う場合、かつ複数人が同一の職業に就いている場合、経験値の重複加算を禁止します。
 * 
 * @param OverwriteClassField
 * @text 職業欄を上書表示
 * @type boolean
 * @default true
 * @desc 追加職業を職業欄に表示します。（通常の職業は非表示）
 * 先頭の追加職業（インデックス=0）のみが対象です。
 * 
 * @param ShowLevelOnMenu
 * @parent OverwriteClassField
 * @text メニューにレベル表示
 * @type select
 * @option 非表示 @value
 * @option 数字のみ @value simple
 * @option 全表示 @value full
 * @desc 追加職業のレベルをメニュー画面に表示します。
 * ただし、全表示にはある程度の画面幅が必要です。
 * 
 * @param ShowLevelOnStatus
 * @text ステータスにレベル表示
 * @type boolean
 * @default true
 * @desc 追加職業のレベルをステータス画面に表示します。
 * なお、調整のために二つ名を削除します。
 * 
 * @param NormalExpWidth
 * @parent ShowLevelOnStatus
 * @text 通常経験値の横幅
 * @type number
 * @default 110
 * @desc 通常経験値をステータス画面に表示する横幅です。
 * 
 * @param ClassExpWidth
 * @parent ShowLevelOnStatus
 * @text 職業経験値の横幅
 * @type number
 * @default 110
 * @desc 職業経験値をステータス画面に表示する横幅です。
 * 
 * @param ClassLvMaxExp
 * @parent ShowLevelOnStatus
 * @text 職業レベル最大経験値表記
 * @type string
 * @default -------
 * @desc 職業レベルが最大になった際の経験値欄の表記です。
 * 
 * @param ShowMaxLevelMessage
 * @text 最大レベルでメッセージ表示
 * @type boolean
 * @default false
 * @desc 追加職業が最大レベルに到達した際にメッセージを表示します。
 * 
 * @param MaxLevelMessage
 * @parent ShowMaxLevelMessage
 * @text 最大レベル時の文章
 * @type string
 * @default %1は%2を極めた！
 * @desc 最大レベル到達時のメッセージです。
 * %1=アクター名, %2=職業名, %3=レベルです。
 * 
 * @param ShowBenchMaxLevel
 * @parent ShowMaxLevelMessage
 * @text 控えも強制表示
 * @type boolean
 * @default false
 * @desc 控えメンバーもメッセージを強制表示します。
 * NRP_BenchMembersExp.js併用時のみ機能。
 */

//-----------------------------------------------------------------------------
// AdditionalClass
//
// 追加職業を保有するクラス
// ※外部プラグインから参照できるように外側に定義

function AdditionalClass() {
    this.initialize(...arguments);
}

/**
 * ●初期化
 */
AdditionalClass.prototype.initialize = function(actor, classId) {
    this._actor = actor;
    this._id = classId;
    this._data = $dataClasses[classId];
    this.setLevel();
};

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

const PLUGIN_NAME = "NRP_AdditionalClasses";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pParamPlus = toBoolean(parameters["ParamPlus"], false);
const pKeepSkill = toBoolean(parameters["KeepSkill"], false);
const pDefaultMaxLevel = toNumber(parameters["DefaultMaxLevel"]);
const pLvUpMessage = setDefault(parameters["LvUpMessage"]);
const pLvName = setDefault(parameters["LvName"], "");
const pExpName = setDefault(parameters["ExpName"], "");
const pUseNormalExp = toBoolean(parameters["UseNormalExp"], true);
const pDefaultClassExp = setDefault(parameters["DefaultClassExp"]);
const pClassExpMessage = setDefault(parameters["ClassExpMessage"], "");
const pClassLvUpLater = toBoolean(parameters["ClassLvUpLater"], false);
const pClassExpSwitch = toNumber(parameters["ClassExpSwitch"]);
const pBenchClassExpRate = setDefault(parameters["BenchClassExpRate"]);
const pSubClassExpRate = setDefault(parameters["SubClassExpRate"]);
const pUnificationExp = toBoolean(parameters["UnificationExp"], false);
const pNoDuplicateExp = toBoolean(parameters["NoDuplicateExp"], false);
const pOverwriteClassField = toBoolean(parameters["OverwriteClassField"], true);
const pShowLevelOnMenu = setDefault(parameters["ShowLevelOnMenu"]);
const pShowLevelOnStatus = toBoolean(parameters["ShowLevelOnStatus"], true);
const pNormalExpWidth = toNumber(parameters["NormalExpWidth"], 110);
const pClassExpWidth = toNumber(parameters["ClassExpWidth"], 110);
const pClassLvMaxExp = setDefault(parameters["ClassLvMaxExp"], "-------");
const pShowMaxLevelMessage = toBoolean(parameters["ShowMaxLevelMessage"], false);
const pMaxLevelMessage = setDefault(parameters["MaxLevelMessage"]);
const pShowBenchMaxLevel = toBoolean(parameters["ShowBenchMaxLevel"], false);

//----------------------------------------
// ＭＺ用プラグインコマンド
//----------------------------------------

// MVには存在しないため、空で定義しておかないとエラーになる。
if (!PluginManager.registerCommand) {
    PluginManager.registerCommand = function() {}
}

// 重複チェック用
let mTmpAdditionalClassIds = [];
let mNoDuplicateExp = false;

// イベントコマンドから呼び出されたかどうかの判定
let mCommandFlg = false;

/**
 * ●職業の追加
 */
PluginManager.registerCommand(PLUGIN_NAME, "AddClass", function(args) {
    // インデックス
    const index = toNumber(args.Index);
    const additionalClassId = setDefault(args.AdditionalClass);

    // アクターを取得
    const actor = getActor(args);
    if (!actor) {
        // アクターの指定がない場合は全体を対象化
        if (isForParty(args)) {
            // 通常時
            for (const member of $gameParty.members()) {
                // 追加職業の追加
                member.changeAdditionalClass(additionalClassId, index);
            }
        }
        return;
    }

    // 追加職業の追加
    actor.changeAdditionalClass(additionalClassId, index);
});

/**
 * ●職業の削除
 */
PluginManager.registerCommand(PLUGIN_NAME, "RemoveClass", function(args) {
    // インデックス
    const index = toNumber(args.Index);
    // 削除する追加職業ＩＤ
    const additionalClassId = setDefault(args.AdditionalClass);
    // 隙間を詰めるかどうか？
    const fillGap = toBoolean(args.FillGap);

    // アクターを取得
    const actor = getActor(args);
    if (!actor) {
        // アクターの指定がない場合は全体を対象化
        if (isForParty(args)) {
            // 通常時
            for (const member of $gameParty.members()) {
                // 追加職業の削除
                member.leaveAdditionalClass(additionalClassId, index, fillGap);
                // 追加職業のスキル再習得
                member.setAllAdditionalClassesSkills();
            }
        }
        return;
    }

    // 追加職業の削除
    actor.leaveAdditionalClass(additionalClassId, index, fillGap);
    // 追加職業のスキル再習得
    actor.setAllAdditionalClassesSkills();
});

/**
 * ●経験値の増減
 */
PluginManager.registerCommand(PLUGIN_NAME, "ChangeExp", function(args) {
    // イベントコマンドから呼び出されたかどうかの判定
    mCommandFlg = true;

    // インデックス
    const index = toNumber(args.Index);
    // 追加職業
    const additionalClassId = setDefault(args.AdditionalClass);
    // 経験値
    let exp = toNumber(args.Exp);
    // 経験値（変数）
    const variableExp = toNumber(args.VariableExp);
    // レベルアップを表示
    const show = toBoolean(args.ShowLvUpMessage);

    // 変数の指定がある場合は優先
    if (variableExp) {
        exp = $gameVariables.value(variableExp);
    }

    // アクターを取得
    const actor = getActor(args);
    if (actor) {
        changeExp(actor, index, additionalClassId, exp, show)

    // アクターの指定がない場合は全体を対象化
    } else if (isForParty(args)) {
        // 経験値共有型かつ重複加算禁止の場合
        if (pUnificationExp && pNoDuplicateExp) {
            // 経験値共有用のアクターを対象にする。
            const expActor = getExpActor();
            // 職業単位で経験値を操作
            for (const additionalClass of allPartyAdditionalClasses()) {
                changeExp(expActor, index, additionalClass.id, exp, show)
            }
        } else {
            // 通常時
            for (const actor of $gameParty.members()) {
                changeExp(actor, index, additionalClassId, exp, show)
            }
        }
    }

    // レベルアップを表示する場合
    // かつ、メッセージが発生した場合
    if (show && $gameMessage.isBusy()) {
        // ウェイトする。
        this.setWaitMode("message");
    }
});

/**
 * ●アクターに対して追加職業の経験値を増減させる。
 */
function changeExp(actor, index, additionalClassId, exp, show) {
    // 条件指定がある場合
    if (additionalClassId || index != undefined) {
        let additionalClass = undefined;

        // インデックスの指定がある場合
        if (index != undefined) {
            additionalClass = actor.additionalClasses()[index];
            if (!additionalClass) {
                return;
            }
        }

        // 職業の指定がある場合
        if (additionalClassId) {
            additionalClass = actor.additionalClass(additionalClassId, true);
            if (!additionalClass) {
                return;
            }
        }

        if (additionalClass) {
            // 経験値の増減
            // ※あえて、indexは指定しない。
            additionalClass.changeExp(additionalClass.exp() + exp, show);
        }

    // 未指定ならば、就いている全ての追加職業を対象
    } else {
        const additionalClasses = actor.additionalClasses();
        for (let i = 0; i < additionalClasses.length; i++) {
            const additionalClass = additionalClasses[i];
            // 経験値の増減
            additionalClass.changeExp(additionalClass.exp() + exp, show, i, exp);
        }
    }
}

/**
 * ●レベルの増減
 */
PluginManager.registerCommand(PLUGIN_NAME, "ChangeLevel", function(args) {
    // イベントコマンドから呼び出されたかどうかの判定
    mCommandFlg = true;

    // インデックス
    const index = toNumber(args.Index);
    // 追加職業
    const additionalClassId = setDefault(args.AdditionalClass);
    // レベル
    let level = toNumber(args.Level);
    // レベル（変数）
    const variableLevel = toNumber(args.VariableLevel);
    // レベルアップを表示
    const show = toBoolean(args.ShowLvUpMessage);

    // 変数の指定がある場合は優先
    if (variableLevel) {
        level = $gameVariables.value(variableLevel);
    }

    // アクターを取得
    const actor = getActor(args);
    if (actor) {
        changeLevel(actor, index, additionalClassId, level, show)

    // アクターの指定がない場合は全体を対象化
    } else if (isForParty(args)) {
        // 経験値共有型かつ重複加算禁止の場合
        if (pUnificationExp && pNoDuplicateExp) {
            // 経験値共有用のアクターを対象にする。
            const expActor = getExpActor();
            // 職業単位で経験値を操作
            for (const additionalClass of allPartyAdditionalClasses()) {
                changeLevel(expActor, index, additionalClass.id, level, show)
            }
        } else {
            // 通常時
            for (const actor of $gameParty.members()) {
                changeLevel(actor, index, additionalClassId, level, show)
            }
        }
    }

    // レベルアップを表示する場合
    // かつ、メッセージが発生した場合
    if (show && $gameMessage.isBusy()) {
        // ウェイトする。
        this.setWaitMode("message");
    }
});

/**
 * ●アクターに対して追加職業のレベルを増減させる。
 */
function changeLevel(actor, index, additionalClassId, level, show) {
    // 条件指定がある場合
    if (additionalClassId || index != undefined) {
        let additionalClass = undefined;

        // インデックスの指定がある場合
        if (index != undefined) {
            additionalClass = actor.additionalClasses()[index];
            if (!additionalClass) {
                return;
            }
        }

        // 職業の指定がある場合
        if (additionalClassId) {
            additionalClass = actor.additionalClass(additionalClassId, true);
            if (!additionalClass) {
                return;
            }
        }

        if (additionalClass) {
            // 経験値の増減
            additionalClass.changeLevel(additionalClass.level + level, show);
        }

    // 未指定ならば、就いている全ての追加職業を対象
    } else {
        for (const additionalClass of actor.additionalClasses()) {
            // 経験値の増減
            additionalClass.changeLevel(additionalClass.level + level, show);
        }
    }
}

/**
 * ●追加職業の情報を取得
 */
PluginManager.registerCommand(PLUGIN_NAME, "GetInformation", function(args) {
    // アクターを取得
    const actor = getActor(args);
    if (!actor) {
        return;
    }

    // インデックス
    const index = toNumber(args.Index);
    // 追加職業を取得
    const additionalClass = actor.additionalClasses()[index];

    // 追加職業のＩＤ
    const variableAtClass = toNumber(args.VariableAtClass);
    if (variableAtClass) {
        if (additionalClass) {
            $gameVariables.setValue(variableAtClass, additionalClass.id);
        } else {
            // 職業情報が取得できない場合も0を設定しておく。
            $gameVariables.setValue(variableAtClass, 0);
        }
    }

    // 追加職業のレベル
    const variableAtLv = toNumber(args.VariableAtLv);
    if (variableAtLv) {
        if (additionalClass) {
            $gameVariables.setValue(variableAtLv, additionalClass.level);
        } else {
            $gameVariables.setValue(variableAtLv, 0);
        }
    }

    // 追加職業の経験値
    const VariableAtExp = toNumber(args.VariableAtExp);
    if (VariableAtExp) {
        if (additionalClass) {
            $gameVariables.setValue(VariableAtExp, additionalClass.exp());
        } else {
            $gameVariables.setValue(VariableAtExp, 0);
        }
    }
});

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

/**
 * ●経験値共有時の参照用のアクターを取得
 */
function getExpActor() {
    // アクター１で固定
    return $gameActors.actor(1);
};

/**
 * ●現在のパーティが就いている全職業を取得
 */
function allPartyAdditionalClasses() {
    let additionalClasses = [];

    for (const actor of $gameParty.allMembers()) {
        for (const additionalClass of actor.additionalClasses()) {
            // 重複している場合は次へ
            if (additionalClasses.some(ac => ac.id == additionalClass.id)) {
                continue;
            }

            if (additionalClass) {
                // 配列に追加
                additionalClasses.push(additionalClass);
            }
        }
    }

    // 重複除去して返す
    return additionalClasses;
}

//-----------------------------------------------------------------------------
// AdditionalClass
//
// 追加職業を保有するクラス

/**
 * JSONオブジェクト感覚でアクセスできるようにしておく。
 */
Object.defineProperties(AdditionalClass.prototype, {
    id: {
        get: function() {
            return this._id;
        },
        configurable: true
    },
    level: {
        get: function() {
            return this._level;
        },
        configurable: true
    },
    name: {
        get: function() {
            return this._data.name;
        },
        configurable: false
    },
    note: {
        get: function() {
            return this._data.note;
        },
        configurable: false
    },
    learnings: {
        get: function() {
            return this._data.learnings;
        },
        configurable: false
    }
});

/**
 * ●現在の経験値を取得
 */
AdditionalClass.prototype.exp = function() {
    let exp = this.expActor()._exp[this._id];

    // 値が取得できなければ０を設定
    if (!exp) {
        exp = 0;
    }

    return exp;
};

/**
 * ●アクターを取得
 */
AdditionalClass.prototype.actor = function() {
    return this._actor;
};

/**
 * ●経験値参照用のアクターを取得
 */
AdditionalClass.prototype.expActor = function() {
    // ＥＸＰ共有時の場合
    if (pUnificationExp) {
        return getExpActor();
    }

    return this._actor;
};

/**
 * ●経験値からレベルを計算
 */
AdditionalClass.prototype.setLevel = function() {
    const exp = this.exp();
    this._level = 1;

    // 処理高速化のため先に中間レベルをチェックしてもよいかも？
    // exp >= this.expForLevel(50); みたいな感じで

    // 再帰的に現在のレベルを求める。
    while (!this.isMaxLevel() && exp >= this.nextLevelExp()) {
        this._level++;
    }
};

/**
 * ●現在の経験値を取得
 */
AdditionalClass.prototype.currentExp = function(showFlg) {
    // 最大レベル時の表示用
    if (showFlg && this.isMaxLevel()) {
        return pClassLvMaxExp;
    }
    return this.exp();
};

/**
 * ●現在レベルまでの経験値を取得
 */
AdditionalClass.prototype.currentLevelExp = function() {
    return this.expForLevel(this._level);
};

/**
 * ●次のレベルの経験値を取得
 */
AdditionalClass.prototype.nextLevelExp = function(showFlg) {
    // 最大レベル時の表示用
    if (showFlg && this.isMaxLevel()) {
        return pClassLvMaxExp;
    }
    return this.expForLevel(this._level + 1);
};

/**
 * ●次のレベルまでの経験値を取得
 */
AdditionalClass.prototype.nextRequiredExp = function() {
    return this.nextLevelExp() - this.currentExp();
};

// 一時的に強制変更するための職業ＩＤ
let mForceClassId = null;

/**
 * ●指定レベルに到達するのに必要な経験値を取得
 */
AdditionalClass.prototype.expForLevel = function(level) {
    const actor = this.expActor();

    // 参照する職業ＩＤを強制書換
    mForceClassId = this.id;
    // 内部でGame_Actor.prototype.currentClass()を参照
    const exp = actor.expForLevel(level);
    // 職業ＩＤをクリア
    mForceClassId = null;

    return exp;
};

/**
 * ●最大レベルかどうか？
 */
AdditionalClass.prototype.isMaxLevel = function() {
    return this._level >= this.maxLevel();
};

/**
 * ●最大レベルを取得
 */
AdditionalClass.prototype.maxLevel = function() {
    // 職業毎の設定値があれば優先
    const metaMaxLevel = this._data.meta.MaxLevel;
    if (metaMaxLevel) {
        return metaMaxLevel;

    // プラグインパラメータのデフォルト値
    } else if (pDefaultMaxLevel) {
        return pDefaultMaxLevel;
    }

    // JSONオブジェクトを取得
    return this.expActor().actor().maxLevel;
};

/**
 * ●経験値を変更
 * ※expは加算済みの経験値
 */
AdditionalClass.prototype.changeExp = function(exp, show, index, difExp) {
    const expActor = this.expActor();
    const skillActor = this.actor();
    const classId = this.id;

    // サブ職業倍率
    if (index >= 1) {
        // 加算前の経験値を求める。
        const originalExp = exp - difExp;
        // 経験値差分に倍率をかけることでサブ職業の経験値を計算
        exp = originalExp + difExp * expActor.subClassExpRate(index);
    }

    expActor._exp[classId] = Math.max(exp, 0);
    // 変更前のレベル＆スキルを保持
    const lastLevel = this._level;
    const lastSkills = skillActor.skills();

    while (!this.isMaxLevel() && this.exp() >= this.nextLevelExp()) {
        this.levelUp();
    }
    while (this.exp() < this.currentLevelExp()) {
        this.levelDown();
    }

    // レベルアップした場合
    if (this._level > lastLevel) {
        // メッセージを表示
        if (show) {
            this.displayLevelUp(skillActor.findNewSkills(lastSkills));
        }
        // 最大レベル到達を表示
        if (this.maxLevel() == this._level) {
            this.displayLevelMax(show);
        }
    }
    expActor.refresh();
};

/**
 * ●レベルを変更
 */
AdditionalClass.prototype.changeLevel = function(level, show) {
    level = level.clamp(1, this.maxLevel());
    this.changeExp(this.expForLevel(level), show);
};

/**
 * ●レベルアップ
 */
AdditionalClass.prototype.levelUp = function() {
    const actor = this.actor();

    this._level++;

    for (const learning of this._data.learnings) {
        if (learning.level === this._level) {
            // アクターがそのクラスに就いていない場合
            if (!actor.isAdditionalClassId(this.id)) {
                // 継続できるスキルを除いて習得しない
                if (!isKeepSkill(learning.skillId)) {
                    continue;
                }
            }
            // スキルを習得
            actor.learnSkill(learning.skillId);
        }
    }
};

/**
 * ●レベルダウン
 */
AdditionalClass.prototype.levelDown = function() {
    this._level--;
};

// レベルアップ表示の判定用
let mDisplayLevelUp = false;

/**
 * ●レベルアップメッセージの表示
 */
AdditionalClass.prototype.displayLevelUp = function(newSkills) {
    if (pLvUpMessage) {
        const actor = this.actor();
        const text = pLvUpMessage.format(
            actor.name(),
            this.name,
            this._level
        );
        $gameMessage.newPage();
        $gameMessage.add(text);
    }

    // 習得スキルの表示
    for (const skill of newSkills) {
        $gameMessage.add(TextManager.obtainSkill.format(skill.name));
    }

    mDisplayLevelUp = true;
};

/**
 * ●レベルアップ限界の表示
 */
AdditionalClass.prototype.displayLevelMax = function(show) {
    // 表示しない場合
    if (!pShowMaxLevelMessage) {
        return;
    }

    // コマンド呼び出し、かつ非表示
    if (mCommandFlg && !show) {
        // 表示しない。
        return;
    }

    const actor = this.actor();

    // レベルアップの非表示対象（控え要員）は表示しない。
    // ただし、控えは強制表示する場合は例外
    // ※NRP_BenchMembersExp.jsによる制御
    if (!actor.shouldDisplayLevelUp() && !pShowBenchMaxLevel) {
        return;
    }

    const text = pMaxLevelMessage.format(actor.name(), this.name, this._level);
    // 控え要員の場合のみ改ページする。
    if (!actor.shouldDisplayLevelUp()) {
        $gameMessage.newPage();
    }
    // 改行しながら出力
    for (const line of text.split("\\n")) {
        $gameMessage.add(line);
    }
};

//-----------------------------------------------------------------------------
// 共通処理
//-----------------------------------------------------------------------------

/**
 * ●変数初期化
 */
const _Game_Actor_initMembers = Game_Actor.prototype.initMembers;
Game_Actor.prototype.initMembers = function() {
    _Game_Actor_initMembers.apply(this, arguments);

    // 追加職業のＩＤ配列
    this._additionalClassIds = [];
};

/**
 * 【独自】追加職業を取得（AdditionalClass型）
 */
Game_Actor.prototype.additionalClass = function(classId, targetAll) {
    // 全てが対象の場合は、現在就いている職業以外も対象
    if (targetAll) {
        return new AdditionalClass(this, classId);
    }

    // 存在チェック
    const exist = this._additionalClassIds.some(id => id == classId);
    if (exist) {
        return new AdditionalClass(this, classId);
    }

    return undefined;
};

/**
 * 【独自】メインの追加職業を取得（AdditionalClass型）
 */
Game_Actor.prototype.mainAdditionalClass = function() {
    const classId = this._additionalClassIds[0];
    if (classId) {
        return new AdditionalClass(this, classId);
    }
    return undefined;
};

/**
 * 【独自】指定したインデックスの追加職業を取得（AdditionalClass型）
 */
Game_Actor.prototype.currentAdditionalClass = function(index) {
    const classId = this._additionalClassIds[index];
    if (classId) {
        return new AdditionalClass(this, classId);
    }
    return undefined;
};

/**
 * 【独自】追加職業の配列を取得（AdditionalClass型）
 */
Game_Actor.prototype.additionalClasses = function() {
    // 空欄を除去
    const additionalClassIds = this._additionalClassIds.filter(classId => classId);
    return additionalClassIds.map(classId => new AdditionalClass(this, classId));
};

/**
 * 【独自】追加職業の配列を取得（JSON）
 */
Game_Actor.prototype.additionalClassObjects = function() {
    // こちらは構造を残すため、空欄は除去しない。
    return this._additionalClassIds.map(classId => classId && $dataClasses[classId]);
};

/**
 * 【独自】追加職業を追加
 */
Game_Actor.prototype.changeAdditionalClass = function(classId, index) {
    // インデックスの指定がある場合
    if (index != undefined) {
        // 現在の職業を解除
        const currentClassId = this._additionalClassIds[index];
        if (currentClassId) {
            this.leaveAdditionalClass(currentClassId, index);
        }
        // 職業を設定
        this._additionalClassIds[index] = classId;

        // クリア時（classId==null）は終了
        if (!classId) {
            // 追加職業のスキル再習得
            this.setAllAdditionalClassesSkills();
            // リフレッシュ（無効になった装備品の解除など）
            this.refresh();
            return;
        }
    } else {
        this._additionalClassIds.push(classId);
    }

    // 経験値が未設定の場合、初期設定
    if (!this._exp[classId]) {
        this._exp[classId] = 0;
    }
    // ＥＸＰ共有時の場合の初期設定
    if (pUnificationExp) {
        const expActor = getExpActor();
        if (!expActor._exp[classId]) {
            expActor._exp[classId] = 0;
        }
    }

    // 追加職業のスキル再習得
    this.setAllAdditionalClassesSkills();
    // リフレッシュ（無効になった装備品の解除など）
    this.refresh();
};

/**
 * 【独自】追加職業の解除
 */
Game_Actor.prototype.leaveAdditionalClass = function(classId, index, fillGap) {
    // 職業の指定がない場合、インデックスから求める。
    if (!classId) {
        classId = this._additionalClassIds[index];
    }
    // インデックスの指定がない場合は、職業から求める。
    if (index == undefined) {
        index = this._additionalClassIds.indexOf(classId);
    }
    // いずれかを取得できなければ終了
    if (index < 0 || !classId) {
        return;
    }

    // スキルを維持しない場合はスキルを忘れる。
    const additionalClass = this.additionalClass(classId);
    // 習得スキルを削除
    for (const learning of additionalClass._data.learnings) {
        // 転職時も維持するスキルなら削除しない。
        if (isKeepSkill(learning.skillId)) {
            continue;
        }
        this.forgetSkill(learning.skillId);
    }

    if (fillGap) {
        // 隙間を詰める場合は削除
        this._additionalClassIds.splice(index, 1);
    } else {
        // 職業にnullを設定
        this._additionalClassIds[index] = null;
    }
};

/**
 * ●転職時も保持するスキルかどうか？
 */
function isKeepSkill(skillId) {
    const skillData = $dataSkills[skillId];

    // スキル毎の指定がある場合は優先
    const metaKeepSkill = toBoolean(skillData.meta.KeepSkill);
    if (metaKeepSkill != undefined) {
        return metaKeepSkill;
    }

    // それ以外は既定値を使用
    return pKeepSkill;
}

/**
 * ●現在の職業を取得
 */
const _Game_Actor_currentClass = Game_Actor.prototype.currentClass;
Game_Actor.prototype.currentClass = function() {
    if (mForceClassId) {
        // -1で空白を返す
        if (mForceClassId == -1) {
            const ret = [];
            ret.name = "";
            return ret;
        }
        return $dataClasses[mForceClassId];
    }

    return _Game_Actor_currentClass.apply(this, arguments);
};

/**
 * 【独自】全追加職業のスキルを習得
 */
Game_Actor.prototype.setAllAdditionalClassesSkills = function() {
    // 追加職業のスキルを習得
    for (const additionalClass of this.additionalClasses()) {
        this.setAdditionalClassSkills(additionalClass);
    }
};

/**
 * 【独自】追加職業のスキルを習得
 */
Game_Actor.prototype.setAdditionalClassSkills = function(additionalClass) {
    // 職業のレベルを取得
    const level = additionalClass._level;
    // レベル以下のスキルを取得
    for (const learning of additionalClass._data.learnings) {
        if (learning.level <= level) {
            this.learnSkill(learning.skillId);
        }
    }
};

/**
 * ●職業に紐づくスキルを習得
 */
const _Game_Actor_initSkills = Game_Actor.prototype.initSkills;
Game_Actor.prototype.initSkills = function() {
    _Game_Actor_initSkills.apply(this, arguments);

    // 追加職業のスキル習得
    this.setAllAdditionalClassesSkills();
};

/**
 * ●特徴を保有するオブジェクトの取得
 * ※これにより、追加職業の特徴をアクターに反映
 */
const _Game_Actor_traitObjects = Game_Actor.prototype.traitObjects;
Game_Actor.prototype.traitObjects = function() {
    const objects = _Game_Actor_traitObjects.apply(this, arguments);

    // 追加職業を追加（JSON形式で取得）
    for (const additionalClass of this.additionalClassObjects()) {
        if (additionalClass) {
            objects.push(additionalClass);
        }
    }

    return objects;
};

/**
 * ●アクターが追加職業についているか？
 */
Game_Actor.prototype.isAdditionalClass = function(gameClass) {
    if (!gameClass) {
        return false;
    }
    if (this.additionalClasses().some(ac => ac.id == gameClass.id)) {
        return true;
    }
    return false;
};

/**
 * ●アクターが追加職業についているか？（ＩＤ）
 */
Game_Actor.prototype.isAdditionalClassId = function(classId) {
    return this.isAdditionalClass($dataClasses[classId]);
};

if (pParamPlus) {
    /**
     * ●パラメータの加算
     */
    const _Game_Actor_paramPlus = Game_Actor.prototype.paramPlus;
    Game_Actor.prototype.paramPlus = function(paramId) {
        let value = _Game_Actor_paramPlus.apply(this, arguments);

        // 追加職業分を追加
        for (const additionalClass of this.additionalClasses()) {
            if (additionalClass) {
                const level = additionalClass.level;
                value += additionalClass._data.params[paramId][level];
            }
        }
        return value;
    };
}

//-----------------------------------------------------------------------------
// 経験値の加算
//-----------------------------------------------------------------------------

if (pUseNormalExp) {
    // 経験値共有型かつ重複加算禁止の場合
    if (pUnificationExp && pNoDuplicateExp) {
        /**
         * ●経験値の増減（イベントコマンド）
         */
        const _Game_Interpreter_command315 = Game_Interpreter.prototype.command315;
        Game_Interpreter.prototype.command315 = function(params) {
            // 重複確認用の一時配列をクリア
            mTmpAdditionalClassIds = [];

            // 経験値の重複加算禁止
            mNoDuplicateExp = true;
            const ret =  _Game_Interpreter_command315.apply(this, arguments);
            mNoDuplicateExp = false;

            return ret;
        };

        /**
         * ●戦闘終了時の経験値加算
         */
        const _BattleManager_gainExp = BattleManager.gainExp;
        BattleManager.gainExp = function() {
            // 重複確認用の一時配列をクリア
            mTmpAdditionalClassIds = [];

            // 経験値の重複加算禁止
            mNoDuplicateExp = true;
            _BattleManager_gainExp.apply(this, arguments);
            mNoDuplicateExp = false;
        };
    }

    /**
     * ●経験値の変更
     * ※イベントコマンド（経験値の増減、レベルの増減）や戦闘終了時など、
     * 　様々な箇所から呼び出される共通処理
     */
    const _Game_Actor_changeExp = Game_Actor.prototype.changeExp;
    Game_Actor.prototype.changeExp = function(exp, show) {
        // 経験値の増減量
        const value = exp - (this.currentExp() || 0);

        _Game_Actor_changeExp.apply(this, arguments);

        // 職業経験値が有効でない場合は変更禁止
        if (!$gameSystem.isClassExpEnabled()) {
            return;
        }

        // 追加職業にも経験値を加算
        const additionalClasses = this.additionalClasses();
        for (let i = 0; i < additionalClasses.length; i++) {
            const additionalClass = additionalClasses[i];
            // 重複加算禁止の場合
            if (mNoDuplicateExp) {
                // かつ、既に加算済なら処理しない
                if (mTmpAdditionalClassIds.includes(additionalClass.id)) {
                    continue;
                }
                // 重複確認用の配列に追加
                mTmpAdditionalClassIds.push(additionalClass.id);
            }

            const newExp = additionalClass.exp() + value;
            additionalClass.changeExp(newExp, show, i, value);
        }
    };
}

//-----------------------------------------------------------------------------
// 職業経験値の加算
//-----------------------------------------------------------------------------

/**
 * 【独自】職業経験値の合計
 */
Game_Troop.prototype.classExpTotal = function() {
    // 職業経験値が有効でない場合は0
    if (!$gameSystem.isClassExpEnabled()) {
        return 0;
    }

    const total = this.deadMembers().reduce((r, enemy) => r + enemy.classExp(), 0);
    // 四捨五入
    return Math.round(total);
};

/**
 * 【独自】職業経験値の取得
 */
Game_Enemy.prototype.classExp = function() {
    const a = this; // eval参照用

    let classExp = 0;

    // 設定値が存在する場合
    const metaClassExp = this.enemy().meta.ClassExp;
    if (metaClassExp != undefined) {
        classExp = eval(metaClassExp);

    // 既定値が存在する場合
    } else if (pDefaultClassExp != undefined) {
        classExp = eval(pDefaultClassExp);
    }

    // rateを乗算する。
    const rate = this.enemy().meta.ClassExpRate;
    if (rate != undefined) {
        classExp = classExp * rate / 100;
    }
    return classExp;
};

/**
 * ●報酬の作成
 */
const _BattleManager_makeRewards = BattleManager.makeRewards;
BattleManager.makeRewards = function() {
    // イベントコマンドから呼び出されたかどうかの判定
    mCommandFlg = false;

    _BattleManager_makeRewards.apply(this, arguments);

    // 報酬に職業経験値を追加
    this._rewards["classExp"] = $gameTroop.classExpTotal();
};

/**
 * ●報酬の獲得
 */
const _BattleManager_gainRewards = BattleManager.gainRewards;
BattleManager.gainRewards = function() {
    _BattleManager_gainRewards.apply(this, arguments);

    // 職業経験値が有効なら加算
    if ($gameSystem.isClassExpEnabled()) {
        this.gainClassExp();
    }
};

// 職業レベルアップ表示が後回しでない場合
if (!pClassLvUpLater) {
    /**
     * ●経験値の獲得
     */
    const _Game_Actor_gainExp = Game_Actor.prototype.gainExp;
    Game_Actor.prototype.gainExp = function(exp) {
        _Game_Actor_gainExp.apply(this, arguments);

        // 職業経験値が有効な場合
        if ($gameSystem.isClassExpEnabled()) {
            // 経験値共有型かつ重複加算禁止の場合は終了
            if (pUnificationExp && pNoDuplicateExp) {
                return;
            }
            // 職業経験値を加算
            const classExp = BattleManager._rewards.classExp;
            this.gainClassExp(classExp);
        }
    };
}

/**
 * 【独自】職業経験値の獲得
 */
BattleManager.gainClassExp = function() {
    const classExp = this._rewards.classExp;

    // 経験値共有型かつ重複加算禁止の場合
    if (pUnificationExp && pNoDuplicateExp) {
        // 職業単位で経験値を操作
        for (const additionalClass of allPartyAdditionalClasses()) {
            const actor = additionalClass.actor();
            const newExp = additionalClass.currentExp() + Math.round(classExp * actor.finalClassExpRate());
            additionalClass.changeExp(newExp, actor.shouldDisplayLevelUp());
        }
        return;
    }

    // 職業レベルアップ表示を後回しにする場合
    if (pClassLvUpLater) {
        // 通常時はアクター毎に加算
        for (const actor of $gameParty.allMembers()) {
            actor.gainClassExp(classExp);
        }
    }
};

/**
 * 【独自】職業経験値の獲得（アクター）
 */
Game_Actor.prototype.gainClassExp = function(classExp, ignoreBench) {
    const additionalClasses = this.additionalClasses();
    for (let i = 0; i < additionalClasses.length; i++) {
        const additionalClass = additionalClasses[i];

        let addExp = classExp;
        // 控えメンバー倍率
        // ※ただし、フラグがオンの場合は無視する。
        //   アイテム使用の場合は控えを無視する必要があるため。
        if (!ignoreBench) {
            addExp *= this.finalClassExpRate()
        }

        const addExpRound = Math.round(addExp);
        const newExp = additionalClass.currentExp() + addExpRound;
        additionalClass.changeExp(newExp, this.shouldDisplayLevelUp(), i, addExpRound);
    }
};

/**
 * 【独自】職業経験値の獲得率
 */
Game_Actor.prototype.finalClassExpRate = function() {
    let rate = 1;
    const a = this; // eval計算用

    // 倍率計算
    for (const object of this.traitObjects()) {
        const classExpRate = object.meta.ClassExpRate;
        if (classExpRate != null) {
            rate *= (eval(classExpRate) / 100);
        }
    }

    return rate * (this.isBattleMember() ? 1 : this.benchMembersClassExpRate());
};

/**
 * 【独自】控えメンバーの職業経験値比率
 */
Game_Actor.prototype.benchMembersClassExpRate = function() {
    if (pBenchClassExpRate != undefined) {
        const a = this; // eval計算用
        return eval(pBenchClassExpRate);
    }
    return this.benchMembersExpRate();
};

/**
 * 【独自】サブ職業の職業経験値比率
 */
Game_Actor.prototype.subClassExpRate = function(index) {
    if (pSubClassExpRate != undefined) {
        // eval計算用
        const a = this;
        const no = index + 1;
        return eval(pSubClassExpRate);
    }
    return 1;
};

/**
 * ●経験値の表示
 * ※BattleManager.displayRewardsを上書きしたくないので
 * 　こちらの末尾に追加
 */
const _BattleManager_displayExp = BattleManager.displayExp;
BattleManager.displayExp = function() {
    _BattleManager_displayExp.apply(this, arguments);

    // 職業経験値の表示
    const classExp = this._rewards.classExp;
    if (classExp > 0 && pClassExpMessage) {
        const text = pClassExpMessage.format(classExp, pExpName);
        $gameMessage.add("\\." + text);
    }
};

//----------------------------------------
// 共通関数
//----------------------------------------

/**
 * ●職業経験値が有効かどうか？
 */
Game_System.prototype.isClassExpEnabled = function() {
    // 有効スイッチがオフの場合は変更禁止
    if (pClassExpSwitch && !$gameSwitches.value(pClassExpSwitch)) {
        return false;
    }
    return true;
};

//-----------------------------------------------------------------------------
// 経験値共有用の関数
//-----------------------------------------------------------------------------

if (pUnificationExp) {
    /**
     * ●共有用アクターの経験値を反映する。
     */
    Game_Actor.prototype.setUnificationExp = function() {
        const expActor = getExpActor();

        // 共有用アクターなら処理しない。
        if (this == expActor) {
            return;
        }

        this._exp = expActor._exp;
    };
}

//-----------------------------------------------------------------------------
// 職業欄の表示
//-----------------------------------------------------------------------------

if (pOverwriteClassField) {
    /**
     * 【上書】職業の表示
     */
    Window_StatusBase.prototype.drawActorClass = function(actor, x, y, width) {
        // 追加職業の名称を表示し、元の職業は表示しない。
        const additionalClass = actor.mainAdditionalClass();
        if (additionalClass) {
            width = width || 168;
            this.resetTextColor();
            this.drawText(additionalClass.name, x, y, width);
        }
    }

    if (pShowLevelOnMenu) {
        /**
         * 【上書】職業の表示
         */
        Window_MenuStatus.prototype.drawActorClass = function(actor, x, y, width) {
            Window_StatusBase.prototype.drawActorClass.apply(this, arguments);

            // 追加職業のレベルをさらに表示
            const additionalClass = actor.mainAdditionalClass();
            if (additionalClass) {
                // 幅を取得
                const classNameWidth = this.textSizeEx(additionalClass.name).width;
                x += classNameWidth + this.itemPadding();

                // 数字のみ
                if (pShowLevelOnMenu == "simple") {
                    this.drawText(additionalClass.level, x, y, 30, "right");

                // 全表示
                } else if (pShowLevelOnMenu == "full") {
                    this.changeTextColor(ColorManager.systemColor());
                    this.drawText(pLvName, x, y, this.innerWidth - x - this.itemPadding() * 2 - 40, "right");
                    this.resetTextColor();
                    // 追加職業のレベル描画を追加
                    x += 40;
                    this.drawText(additionalClass.level, x, y, this.innerWidth - x - this.itemPadding() * 2, "right");
                }
            }
        }
    }
}

if (pShowLevelOnStatus) {
    /**
     * ●ステータス画面のブロック１
     */
    Window_Status.prototype.drawBlock1 = function() {
        const y = this.block1Y();
        this.drawActorName(this._actor, 6, y, 168);
        this.drawActorLevel(this._actor, 192, y);
        this.drawExpInfo(0, y);
        // this.drawActorClass(this._actor, 192, y, 168);
        // this.drawActorNickname(this._actor, 432, y, 270);
    };

    /**
     * ●アクターレベルの描画
     */
    Window_Status.prototype.drawActorLevel = function(actor, x, y) {
        y = this.block1Y();

        this.changeTextColor(ColorManager.systemColor());
        this.drawText(TextManager.levelA, x, y, 48);
        this.resetTextColor();
        // 少しＸ座標を詰める
        this.drawText(actor.level, x + 42, y, 36, "right");
        // this.drawText(actor.level, x + 84, y, 36, "right");
    };

    /**
     * ●経験値の描画
     */
    Window_Status.prototype.drawExpInfo = function(x, y) {
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(TextManager.exp, x - pNormalExpWidth * 2 - 30, y, this.innerWidth - this.itemPadding(), "right");
        this.resetTextColor();
        // 現在の経験値
        this.drawText(this.expTotalValue(), x - pNormalExpWidth - 15, y, this.innerWidth - this.itemPadding(), "right");
        // "/"
        this.drawText("/", x - pNormalExpWidth, y, this.innerWidth - this.itemPadding(), "right");
        // 次にレベルアップする経験値
        let nextExp = this.expTotalValue() + this.expNextValue();
        // 最大レベルの時は-------表記になるので修正
        if (this._actor.isMaxLevel()) {
            nextExp = this.expTotalValue();
        }
        this.drawText(nextExp, x, y, this.innerWidth - this.itemPadding(), "right");
    };

    /**
     * ●ブロック２（２行目）の描画
     */
    Window_Status.prototype.drawBlock2 = function() {
        const y = this.block2Y();
        this.drawActorFace(this._actor, 12, y);
        this.drawBasicInfo(204, y);
        // this.drawExpInfo(456, y);

        // 追加職業の情報
        this.drawClassInfo(this._actor.mainAdditionalClass(), 0, y);
        // サブ職の情報
        this.drawClassInfo(this._actor.additionalClasses()[1], 0, y + this.lineHeight() * 2 + 8);
    };

    /**
     * ●職業経験値の描画
     */
    Window_Status.prototype.drawClassInfo = function(additionalClass, x, y) {
        if (!additionalClass) {
            return;
        }

        this.drawText(additionalClass.name, x, y, this.innerWidth - this.itemPadding(), "right");

        // 下の段に
        y += this.lineHeight();
        this.changeTextColor(ColorManager.systemColor());
        this.drawText(pLvName, x - pClassExpWidth * 2 - 70, y, this.innerWidth - this.itemPadding(), "right");
        this.resetTextColor();
        // 追加職業のレベル描画を追加
        this.drawText(additionalClass.level, x - pClassExpWidth * 2 - 30, y, this.innerWidth - this.itemPadding(), "right");
        // 現在の経験値
        this.drawText(additionalClass.currentExp(true), x - pClassExpWidth - 15, y, this.innerWidth - this.itemPadding(), "right");
        // "/"
        this.drawText("/", x - pClassExpWidth, y, this.innerWidth - this.itemPadding(), "right");
        // 次にレベルアップする経験値
        this.drawText(additionalClass.nextLevelExp(true), x, y, this.innerWidth - this.itemPadding(), "right");
    };

    /**
     * ●基本情報の出力
     */
    Window_Status.prototype.drawBasicInfo = function(x, y) {
        const lineHeight = this.lineHeight();
        // this.drawActorLevel(this._actor, x, y + lineHeight * 0);
        this.drawActorIcons(this._actor, x, y + lineHeight * 1);
        this.placeBasicGauges(this._actor, x, y + lineHeight * 2);
    };

    /**
     * ●二つ名の描画
     * ※Window_StatusBase.prototype.drawActorNicknameを継承
     */
    Window_Status.prototype.drawActorNickname = function(actor, x, y, width) {
        // 描画しない。
    };
}

/**
 * 【独自】追加職業のレベル描画
 * ※外部プラグインから参照できるようにpOverwriteClassFieldの外に定義
 */
Window_StatusBase.prototype.drawAdditionalClassLevel = function(additionalClass, x, y) {
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(pLvName, x, y, 48);
    this.resetTextColor();
    this.drawText(additionalClass.level, x + 44, y, 36, "right");
};

//-----------------------------------------------------------------------------
// 職業経験値の取得（アイテム）
// （Game_Action）
//-----------------------------------------------------------------------------

/**
 * ●効果適用
 */
const _Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    _Game_Action_apply.apply(this, arguments);

    mDisplayLevelUp = false;

    // 職業経験値を加算
    const addClassExp = this.item().meta.AddClassExp;
    if (addClassExp) {
        const result = target.result();
        if (result.isHit()) {
            target.gainClassExp(eval(addClassExp), true);
            this.makeSuccess(target);
        }
    }

    // レベルアップ表示が必要な場合、アイテムメニューを閉じる
    if (mDisplayLevelUp && SceneManager._scene instanceof Scene_Item) {
        SceneManager.goto(Scene_Map);
    }
};

/**
 * ●効果適用判定
 */
const _Game_Action_hasItemAnyValidEffects = Game_Action.prototype.hasItemAnyValidEffects;
Game_Action.prototype.hasItemAnyValidEffects = function(target) {
    const ret = _Game_Action_hasItemAnyValidEffects.apply(this, arguments);
    // 効果が存在する場合は判定を有効にする。
    return ret || this.item().meta.AddClassExp;
};

//-----------------------------------------------------------------------------
// NRP_TraitsPlus.jsとの連携用
//-----------------------------------------------------------------------------

/**
 * ●特徴を保有するバトラー系オブジェクトの取得
 */
const _Game_Actor_traitBattlerObjects = Game_Actor.prototype.traitBattlerObjects;
Game_Actor.prototype.traitBattlerObjects = function() {
    const objects = _Game_Actor_traitBattlerObjects.apply(this, arguments);

    // 追加職業を追加（JSON形式で取得）
    for (const additionalClass of this.additionalClassObjects()) {
        objects.push(additionalClass);
    }
    return objects;
};

})();
