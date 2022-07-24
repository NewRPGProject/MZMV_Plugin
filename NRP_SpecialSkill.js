//=============================================================================
// NRP_SpecialSkill.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.001 Implementation of the special skill system.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/489968387.html
 *
 * @help Implement special skills
 * that are triggered by accumulating a gauge.
 * 
 * Similar to the existing TP system, but can have multiple gauges.
 * It can also be used in conjunction
 * with a plugin that grows TP to a level (NRP_LevelGrowTP.js).
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Please register your information
 * in the SpecialTypeList of the plugin parameters.
 * You can set the conditions under
 * which the gauge accumulates in detail.
 * 
 * In the initial state, only one data is registered,
 * but multiple data can be registered.
 * The first data is treated as "special type = 1".
 * 
 * Further, set the corresponding special skill
 * to the special type.
 * ※Refer to [Note of Skills] below.
 * 
 * -------------------------------------------------------------------
 * [Note of Skills] (Special Skill)
 * -------------------------------------------------------------------
 * Fill in the following in the note for the skill
 * you wish to designate as a special skill.
 * 
 * ◆<SpecialSkill:[special type]>
 * Set the skill as special skill.
 * If the special type is 1, as mentioned above,
 * it corresponds to the first in the SpecialTypeList.
 * 
 * ◆<SpecialSkillCost:100>
 * Consumes 100 points of the special gauge.
 * If not specified, all will be consumed.
 * 
 * -------------------------------------------------------------------
 * [Note of Skills] (Normal Skill)
 * -------------------------------------------------------------------
 * You can set the conditions under
 * which the gauge will accumulate for each skill.
 * If not specified,
 * the default values of the plugin parameters are used.
 * 
 * ◆<SpecialSkillActionValue:10>
 * When a skill hits, all gauges of the skill user are increased by 10.
 * The amount of increase is proportional
 * to the number of targets and repeat.
 * ※The gauge can be set to increase even if the target misses.
 * 
 * ◆<SpecialSkillActionEndValue:10>
 * After the skill is used, all gauges of the skill user are added by 10.
 * 
 * ◆<SpecialSkillChargeValue:10>
 * Adds 10 to all gauges of the target receiving the skill.
 * Basically assumes a support skill.
 * 
 * -------------------------------------------------------------------
 * If you want to increase only a specific gauge,
 * add a numeric value to the end of the tag name.
 * Example: "SpecialSkillActionValue1" would target the first gauge.
 * 
 * ◆<SpecialSkillActionValue1:10>
 * ◆<SpecialSkillActionEndValue1:10>
 * ◆<SpecialSkillChargeValue1:10>
 * 
 * -------------------------------------------------------------------
 * [Note of States]
 * -------------------------------------------------------------------
 * ◆<SpecialSkillChargeValue:10>
 * Adds 10 to all gauges of the target that received the state.
 * 
 * ◆<SpecialSkillRegenerateValue:10>
 * When in state, add 10 to all gauges per turn.
 * 
 * -------------------------------------------------------------------
 * You can target only specific special types in the same way as skills.
 * 
 * ◆<SpecialSkillChargeValue1:10>
 * ◆<SpecialSkillRegenerateValue1:10>
 * 
 * -------------------------------------------------------------------
 * [Plugin Command]
 * -------------------------------------------------------------------
 * ◆ChangeSpecialGauge
 * Increases or decreases the special gauge.
 * The actor and special type to be operated can be specified.
 * If you do not specify an actor,
 * all members of the party will be affected.
 * If you do not specify a special type, all special types are targeted.
 * 
 * -------------------------------------------------------------------
 * [About Layout]
 * -------------------------------------------------------------------
 * In the initial state, the space
 * to display the special gauge is too small and cramped.
 * This is especially noticeable when multiple gauges are registered.
 * The three screens covered are menu, status, and battle.。
 * 
 * A plugin parameter allows you to set the layout of the gauges,
 * but this plugin alone may be too demanding.
 * 
 * Please combine this plugin with other layout plugin
 * and adjust it to your liking.
 * ※The author has given up on this plugin
 *   because it is too much for this plugin alone.
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
 * @-----------------------------------------------------------
 * @ [Plugin Commands]
 * @-----------------------------------------------------------
 * 
 * @command ChangeSpecialGauge
 * @desc Increase or decrease the special gauge.
 * 
 * @arg Actor
 * @type actor
 * @desc Actors to target.
 * If blank, all party members are targeted.
 * 
 * @arg SpecialSkillType
 * @type number @min 1
 * @desc Special type to be targeted for increase/decrease.
 * If blank, all special gauges are targeted.
 * 
 * @arg Value
 * @type number @max 99999 @min -99999
 * @desc The amount of increase or decrease in the special gauge.
 * 
 * @-----------------------------------------------------------
 * @ [Plugin Parameters]
 * @-----------------------------------------------------------
 * 
 * @param SpecialTypeList
 * @type struct<SpecialType>[]
 * @default ["{\"Condition\":\"\",\"GaugeMax\":\"100\",\"ActionValue\":\"\",\"ActionEndValue\":\"\",\"RegenerateValue\":\"\",\"DamageValue\":\"50 * damage / a.mhp\",\"EvadedValue\":\"\",\"FriendsDeadValue\":\"\",\"DefeatEnemyValue\":\"\",\"CriticalValue\":\"\",\"CostColor\":\"6\",\"ChargedAnimation\":\"\",\"<GaugeLayout>\":\"\",\"Label\":\"\",\"GaugeColor1\":\"14\",\"GaugeColor2\":\"0\"}"]
 * @desc List of special types.
 * Each will hold gauge information.
 * 
 * @param ShowGaugeWhenLearned
 * @type boolean
 * @default true
 * @desc The gauge is displayed only if the actor has learned an active special skill.
 * 
 * @param RecoverGauge
 * @type boolean
 * @default false
 * @desc The special gauge is also recovered when all recovery is complete.
 * 
 * @param PlusOnlyHit
 * @type boolean
 * @default true
 * @desc Enable the gauge increase by ActionValue only when hit.
 * 
 * @param NotPlusWhenUsed
 * @type boolean
 * @default false
 * @desc The gauge should not increase during a special skill that you have activated.
 * 
 * @param NotPlusSameTarget
 * @type boolean
 * @default false
 * @desc Multiple attacks on the same target, such as a series of techniques, do not accumulate ActionValue.
 * 
 * @param MultipleAttenuation
 * @type string
 * @desc Decrease ActionValue for ranged/continuous techniques.
 * e.g:"value / count" attenuates to the amount of increase / number of hits.
 * 
 * @-----------------------------------------------------------
 * 
 * @param <GaugeLayout>
 * 
 * @param ShowGaugeNumber
 * @parent <GaugeLayout>
 * @type boolean
 * @default false
 * @desc The current value is displayed numerically on the gauge.
 * 
 * @param LabelWidth
 * @parent <GaugeLayout>
 * @type number
 * @desc The width of the label to be displayed.
 * Set to 0 if not needed.
 * 
 * @param GaugeWidth
 * @parent <GaugeLayout>
 * @type number
 * @desc Width of the gauge. The default value is 128.
 * Note that LabelWidth is subtracted from this value.
 * 
 * @param GaugeHeight
 * @parent <GaugeLayout>
 * @type number
 * @desc Height of the gauge. The default value is 12.
 * 
 * @param GaugeInterval
 * @parent <GaugeLayout>
 * @type number
 * @default 16
 * @desc The spacing between gauges.
 * 
 * @param GaugeFlash
 * @parent <GaugeLayout>
 * @type boolean
 * @default true
 * @desc Flash the full gauge.
 * 
 * @-----------------------------------------------------------
 * 
 * @param ShowMenu
 * @parent <GaugeLayout>
 * @type boolean
 * @default true
 * @desc Displays a special gauge on the menu screen.
 * 
 * @param MenuStartGaugeX
 * @parent ShowMenu
 * @type number @max 9999 @min -9999
 * @default 0
 * @desc X coord at which the gauge is displayed in the menu.
 * Specify the coordinates relative to the actor name.
 * 
 * @param MenuStartGaugeY
 * @parent ShowMenu
 * @type number @max 9999 @min -9999
 * @default 96
 * @desc Y coord at which the gauge is displayed in the menu.
 * Specify the coordinates relative to the actor name.
 * 
 * @-----------------------------------------------------------
 * 
 * @param ShowStatus
 * @parent <GaugeLayout>
 * @type boolean
 * @default true
 * @desc Displays a special gauge on the status screen.
 * 
 * @param StatusStartGaugeX
 * @parent ShowStatus
 * @type number @max 9999 @min -9999
 * @default 0
 * @desc X coord at which the gauge is displayed in the status.
 * Specify the coordinates relative to the level.
 * 
 * @param StatusStartGaugeY
 * @parent ShowStatus
 * @type number @max 9999 @min -9999
 * @default 144
 * @desc Y coord at which the gauge is displayed in the status.
 * Specify the coordinates relative to the level.
 * 
 * @-----------------------------------------------------------
 * 
 * @param ShowBattle
 * @parent <GaugeLayout>
 * @type boolean
 * @default true
 * @desc Displays a special gauge on the battle screen.
 * 
 * @param BattleStartGaugeX
 * @parent ShowBattle
 * @type number @max 9999 @min -9999
 * @default 0
 * @desc X coord at which the gauge is displayed in the battle.
 * Specify the coordinates relative to the actor name.
 * 
 * @param BattleStartGaugeY
 * @parent ShowBattle
 * @type number @max 9999 @min -9999
 * @default 96
 * @desc Y coord at which the gauge is displayed in the battle.
 * Specify the coordinates relative to the actor name.
 * 
 * @param BattleAdjustNameY
 * @parent ShowBattle
 * @type number @max 9999 @min -9999
 * @default -24
 * @desc Adjust the Y coordinate of Name to TP during battle.
 * 
 * @param BattleNameHpInterval
 * @parent ShowBattle
 * @type number
 * @default 0
 * @desc During battle, the interval between name and HP is widened by a numerical value.
 */
//-------------------------------------------------------------
// SpecialType
//-------------------------------------------------------------
/*~struct~SpecialType:
 * @param Condition
 * @type string
 * @desc The validity condition of the special gauge.
 * Example: a.level >= 10 (formula with a as battler)
 * 
 * @param GaugeMax
 * @type string
 * @default 100
 * @desc This value is the maximum value of the special gauge.
 * 
 * @param PreserveGauge
 * @type boolean
 * @default true
 * @desc The special gauge is retained after the battle is over.
 * 
 * @param BattleStartValue
 * @type string
 * @desc The gauge increase value at the start of battle.
 * Example: If "Math.randomInt(25)" then 0~24.
 * 
 * @param ActionValue
 * @type string
 * @desc The gauge increase value for each action. It is added to the number of hits. Example: 10
 * 
 * @param ActionEndValue
 * @type string
 * @desc This is the value of the increase at the end of the action. This is only one time. Example: 10
 * 
 * @param RegenerateValue
 * @type string
 * @desc This is the regeneration value per turn. Example: 10
 * 
 * @param DamageValue
 * @type string
 * @default 50 * damage / a.mhp
 * @desc The value of the gauge increase when damage is received.
 * Example: 50 * damage / a.mhp
 * 
 * @param EvadedValue
 * @type string
 * @desc The value of the gauge increase when an attack is evaded.
 * Example: 10
 * 
 * @param FriendsDeadValue
 * @type string
 * @desc The value of the gauge increase when a friend is disabled from battle.
 * 
 * @param DefeatEnemyValue
 * @type string
 * @desc The value of the gauge increase when the enemy is defeated.
 * 
 * @param CriticalValue
 * @type string
 * @desc The gauge increase on a critical hit.
 * 
 * @param CostColor
 * @type number
 * @default 6
 * @desc The color of the points consumed for special skills.
 * The number of the system color. If blank, hide consumption.
 * 
 * @param ChargedAnimation
 * @type animation
 * @desc This animation is displayed when the special gauge is full.
 * 
 * @-----------------------------------------------------------
 * 
 * @param <GaugeLayout>
 * 
 * @param Label
 * @parent <GaugeLayout>
 * @type string
 * @desc Labels to be displayed.
 * 
 * @param GaugeColor1
 * @parent <GaugeLayout>
 * @type number
 * @default 14
 * @desc Color of special gauge (left).
 * Specify the number of the system color.
 * 
 * @param GaugeColor2
 * @parent <GaugeLayout>
 * @type number
 * @default 0
 * @desc Color of special gauge (right).
 * Specify the number of the system color.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.001 奥義システムの実装。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/489968387.html
 *
 * @help ゲージを溜めて発動する特別なスキルを実装します。
 * いわゆる奥義のようなものです。
 * 
 * 既存のＴＰ制に類似していますが、ゲージを複数持たせることができます。
 * また、ＴＰをレベル成長させるプラグイン（NRP_LevelGrowTP.js）
 * との併用も可能です。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * プラグインパラメータの奥義タイプ一覧に、情報を登録してください。
 * ゲージが溜まる条件を詳細に設定できます。
 * 
 * 初期状態では一つだけ登録されていますが、複数登録することも可能です。
 * 先頭のデータが『奥義タイプ = 1』として扱われます。
 * 
 * さらに奥義タイプに対応する奥義スキルを設定してください。
 * ※以下の『スキルのメモ欄』を参照
 * 
 * -------------------------------------------------------------------
 * ■スキルのメモ欄（奥義用）
 * -------------------------------------------------------------------
 * 奥義となるスキルのメモ欄に以下を記入してください。
 * 
 * ◆<SpecialSkill:[奥義タイプ]>
 * スキルを奥義スキルとして設定します。
 * 前述の通り奥義タイプが1ならば、奥義タイプ一覧の１番目に対応します。
 * 
 * ◆<SpecialSkillCost:100>
 * 奥義ゲージを100ポイント消費します。
 * 指定がない場合は全てを消費します。
 * 
 * -------------------------------------------------------------------
 * ■スキルのメモ欄（通常用）
 * -------------------------------------------------------------------
 * ゲージが溜まる条件をスキル毎に設定できます。
 * 指定がない場合はプラグインパラメータの既定値を用います。
 * 
 * ◆<SpecialSkillActionValue:10>
 * スキル命中時に、スキル使用者の全ゲージを10加算します。
 * 対象数や連続回数に比例して増加量も大きくなります。
 * ※外れても増加する設定もできます。
 * 
 * ◆<SpecialSkillActionEndValue:10>
 * スキル使用後に、スキル使用者の全ゲージを10加算します。
 * 
 * ◆<SpecialSkillChargeValue:10>
 * スキルを受けた相手の全ゲージを10加算します。
 * 基本的には補助スキルを想定しています。
 * 
 * -------------------------------------------------------------------
 * 特定のゲージだけを増加させたい場合は、
 * タグ名の末尾に数値を付加してください。
 * 例：『SpecialSkillActionValue1』ならば一番目のゲージが対象。
 * 
 * ◆<SpecialSkillActionValue1:10>
 * ◆<SpecialSkillActionEndValue1:10>
 * ◆<SpecialSkillChargeValue1:10>
 * 
 * -------------------------------------------------------------------
 * ■ステートのメモ欄
 * -------------------------------------------------------------------
 * ◆<SpecialSkillChargeValue:10>
 * ステートを受けた相手の全ゲージを10加算します。
 * 
 * ◆<SpecialSkillRegenerateValue:10>
 * ステート時、ターン毎に全ゲージを10加算します。
 * 
 * -------------------------------------------------------------------
 * スキルと同じ要領で特定の奥義タイプだけを対象にできます。
 * 
 * ◆<SpecialSkillChargeValue1:10>
 * ◆<SpecialSkillRegenerateValue1:10>
 * 
 * -------------------------------------------------------------------
 * ■プラグインコマンド
 * -------------------------------------------------------------------
 * ◆奥義ゲージの増減
 * 奥義ゲージを増減させます。
 * 操作するアクターや奥義タイプを指定可能です。
 * アクターを指定しなかった場合は、パーティ全員が対象となります。
 * 奥義タイプを指定しなかった場合は、全奥義タイプが対象となります。
 * 
 * -------------------------------------------------------------------
 * ■レイアウトについて
 * -------------------------------------------------------------------
 * 初期状態では奥義ゲージを表示する場所が狭いので窮屈です。
 * 特にゲージを複数登録した場合は顕著になります。
 * 対象はメニュー、ステータス、戦闘の３画面です。
 * 
 * プラグインパラメータによって、ゲージのレイアウトを設定できますが、
 * このプラグインだけでは厳しいかもしれません。
 * その他のレイアウト系プラグインと組み合わせて、いい感じに調整してください。
 * ※このプラグイン単体では無理があるので、作者はさじを投げました。
 * 
 * -------------------------------------------------------------------
 * ■利用規約
 * -------------------------------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @-----------------------------------------------------------
 * @ プラグインコマンド
 * @-----------------------------------------------------------
 * 
 * @command ChangeSpecialGauge
 * @text 奥義ゲージの増減
 * @desc 奥義ゲージを増減させます。
 * 
 * @arg Actor
 * @text アクター
 * @type actor
 * @desc 対象とするアクターです。
 * 空白ならパーティ全員を対象にします。
 * 
 * @arg SpecialSkillType
 * @text 奥義タイプ
 * @type number @min 1
 * @desc 増減の対象とする奥義タイプです。
 * 空白なら全ての奥義ゲージを対象にします。
 * 
 * @arg Value
 * @text 増減量
 * @type number @max 99999 @min -99999
 * @desc 奥義ゲージの増減量です。
 * 
 * @-----------------------------------------------------------
 * @ プラグインパラメータ
 * @-----------------------------------------------------------
 * 
 * @param SpecialTypeList
 * @text 奥義タイプ一覧
 * @type struct<SpecialType>[]
 * @default ["{\"Condition\":\"\",\"GaugeMax\":\"100\",\"ActionValue\":\"\",\"ActionEndValue\":\"\",\"RegenerateValue\":\"\",\"DamageValue\":\"50 * damage / a.mhp\",\"EvadedValue\":\"\",\"FriendsDeadValue\":\"\",\"DefeatEnemyValue\":\"\",\"CriticalValue\":\"\",\"CostColor\":\"6\",\"ChargedAnimation\":\"\",\"<GaugeLayout>\":\"\",\"Label\":\"\",\"GaugeColor1\":\"14\",\"GaugeColor2\":\"0\"}"]
 * @desc 奥義タイプの一覧です。
 * それぞれがゲージ情報を保有します。
 * 
 * @param ShowGaugeWhenLearned
 * @text 奥義所有時のみゲージ表示
 * @type boolean
 * @default true
 * @desc アクターが有効な奥義を覚えている場合のみゲージを表示します。
 * 
 * @param RecoverGauge
 * @text 全回復にゲージを含める
 * @type boolean
 * @default false
 * @desc 全回復時に奥義ゲージも回復します。
 * 
 * @param PlusOnlyHit
 * @text 命中時のみ加算
 * @type boolean
 * @default true
 * @desc 行動毎のゲージ上昇を命中時のみ有効にします。
 * 
 * @param NotPlusWhenUsed
 * @text 奥義発動時は加算しない
 * @type boolean
 * @default false
 * @desc 奥義発動時はゲージ上昇を停止します。
 * つまり、自身で発動した奥義ではゲージが溜まりません。
 * 
 * @param NotPlusSameTarget
 * @text 同じ対象は加算しない
 * @type boolean
 * @default false
 * @desc 多段技などで同一の対象に複数攻撃を当てても、行動毎の上昇値が溜まらないようにします。
 * 
 * @param MultipleAttenuation
 * @text 複数ヒット時に減衰
 * @type string
 * @desc 範囲技／多段技にてヒット毎のゲージ上昇量を減少させます。
 * 例：「value / count」で上昇量／ヒット数へと減衰。
 * 
 * @-----------------------------------------------------------
 * 
 * @param <GaugeLayout>
 * @text ＜ゲージのレイアウト＞
 * 
 * @param ShowGaugeNumber
 * @parent <GaugeLayout>
 * @text 数値の表示
 * @type boolean
 * @default false
 * @desc ゲージ上に現在値を数値表示します。
 * 
 * @param LabelWidth
 * @parent <GaugeLayout>
 * @text ラベルの横幅
 * @type number
 * @desc ラベルを表示する横幅です。
 * 不要な場合は0にしてください。
 * 
 * @param GaugeWidth
 * @parent <GaugeLayout>
 * @text 横幅
 * @type number
 * @desc ゲージの横幅です。初期値は128です。
 * ここからラベル幅が引かれることに注意です。
 * 
 * @param GaugeHeight
 * @parent <GaugeLayout>
 * @text 縦幅
 * @type number
 * @desc ゲージの縦幅です。初期値は12です。
 * 
 * @param GaugeInterval
 * @parent <GaugeLayout>
 * @text ゲージの間隔
 * @type number
 * @default 16
 * @desc ゲージ同士の間隔です。
 * 
 * @param GaugeFlash
 * @parent <GaugeLayout>
 * @text ゲージフラッシュ
 * @type boolean
 * @default true
 * @desc 満タンになったゲージをフラッシュさせます。
 * 
 * @-----------------------------------------------------------
 * 
 * @param ShowMenu
 * @parent <GaugeLayout>
 * @text メニュー画面に表示
 * @type boolean
 * @default true
 * @desc メニュー画面に奥義ゲージを表示します。
 * 
 * @param MenuStartGaugeX
 * @parent ShowMenu
 * @text 開始Ｘ座標（メニュー）
 * @type number @max 9999 @min -9999
 * @default 0
 * @desc メニューにゲージを表示するＸ座標です。
 * アクター名からの相対座標を指定してください。
 * 
 * @param MenuStartGaugeY
 * @parent ShowMenu
 * @text 開始Ｙ座標（メニュー）
 * @type number @max 9999 @min -9999
 * @default 96
 * @desc メニューにゲージを表示するＹ座標です。
 * アクター名からの相対座標を指定してください。
 * 
 * @-----------------------------------------------------------
 * 
 * @param ShowStatus
 * @parent <GaugeLayout>
 * @text ステータス画面に表示
 * @type boolean
 * @default true
 * @desc ステータス画面に奥義ゲージを表示します。
 * 
 * @param StatusStartGaugeX
 * @parent ShowStatus
 * @text 開始Ｘ座標（ステータス）
 * @type number @max 9999 @min -9999
 * @default 0
 * @desc ステータスにゲージを表示するＸ座標です。
 * レベルからの相対座標を指定してください。
 * 
 * @param StatusStartGaugeY
 * @parent ShowStatus
 * @text 開始Ｙ座標（ステータス）
 * @type number @max 9999 @min -9999
 * @default 144
 * @desc ステータスにゲージを表示するＹ座標です。
 * レベルからの相対座標を指定してください。
 * 
 * @-----------------------------------------------------------
 * 
 * @param ShowBattle
 * @parent <GaugeLayout>
 * @text 戦闘画面に表示
 * @type boolean
 * @default true
 * @desc 戦闘画面に奥義ゲージを表示します。
 * 
 * @param BattleStartGaugeX
 * @parent ShowBattle
 * @text 開始Ｘ座標（戦闘）
 * @type number @max 9999 @min -9999
 * @default 0
 * @desc 戦闘にゲージを表示するＸ座標です。
 * アクター名からの相対座標を指定してください。
 * 
 * @param BattleStartGaugeY
 * @parent ShowBattle
 * @text 開始Ｙ座標（戦闘）
 * @type number @max 9999 @min -9999
 * @default 96
 * @desc 戦闘にゲージを表示するＹ座標です。
 * アクター名からの相対座標を指定してください。
 * 
 * @param BattleAdjustNameY
 * @parent ShowBattle
 * @text ＨＰ調整Ｙ座標
 * @type number @max 9999 @min -9999
 * @default -24
 * @desc 戦闘時、名前～ＴＰのＹ座標を調整します。
 * 
 * @param BattleNameHpInterval
 * @parent ShowBattle
 * @text 名前～ＨＰの間隔
 * @type number
 * @default 0
 * @desc 戦闘時、名前とＨＰの間隔を数値分広げます。
 */
//-------------------------------------------------------------
// SpecialType
//-------------------------------------------------------------
/*~struct~SpecialType:ja
 * @param Condition
 * @text 有効条件
 * @type string
 * @desc 奥義ゲージの有効条件です。（aをバトラーとした数式）
 * 例：a.level >= 10
 * 
 * @param GaugeMax
 * @text 最大値
 * @type string
 * @default 100
 * @desc 奥義ゲージの最大値となる数値です。
 * 
 * @param PreserveGauge
 * @text 戦闘後もゲージ持越
 * @type boolean
 * @default true
 * @desc 戦闘終了後も奥義ゲージを保持します。
 * 
 * @param BattleStartValue
 * @text 戦闘開始時の上昇値
 * @type string
 * @desc 戦闘開始時に加算するゲージ上昇値です。
 * 例：「Math.randomInt(25)」で0~24
 * 
 * @param ActionValue
 * @text 行動毎の上昇値
 * @type string
 * @desc 行動毎のゲージ上昇値です。ヒット数分加算されます。
 * 例：10
 * 
 * @param ActionEndValue
 * @text 行動終了時の上昇値
 * @type string
 * @desc 行動終了時の上昇値です。こちらは１回だけです。
 * 例：10
 * 
 * @param RegenerateValue
 * @text ターン毎の再生値
 * @type string
 * @desc ターン毎の再生値です。
 * 例：10
 * 
 * @param DamageValue
 * @text ダメージ時の上昇値
 * @type string
 * @default 50 * damage / a.mhp
 * @desc ダメージを受けた時の奥義ゲージ上昇値です。
 * 例：50 * damage / a.mhp
 * 
 * @param EvadedValue
 * @text 回避時の上昇値
 * @type string
 * @desc 攻撃を回避した時の奥義ゲージ上昇値です。
 * 例：10
 * 
 * @param FriendsDeadValue
 * @text 仲間死亡時の上昇値
 * @type string
 * @desc 仲間が戦闘不能になった際のゲージ上昇値です。
 * 
 * @param DefeatEnemyValue
 * @text 敵撃破時の上昇値
 * @type string
 * @desc 敵を撃破した際のゲージ上昇値です。
 * 
 * @param CriticalValue
 * @text 会心時の上昇値
 * @type string
 * @desc 会心時のゲージ上昇値です。
 * 
 * @param CostColor
 * @text 消費ポイントの色
 * @type number
 * @default 6
 * @desc 奥義の消費ポイントの色です。
 * システムカラーの番号を指定。空欄なら消費非表示。
 * 
 * @param ChargedAnimation
 * @text 満タン時のアニメ
 * @type animation
 * @desc 奥義ゲージが満タンになった際のアニメーションです。
 * 
 * @-----------------------------------------------------------
 * 
 * @param <GaugeLayout>
 * @text ＜ゲージのレイアウト＞
 * 
 * @param Label
 * @parent <GaugeLayout>
 * @text ラベル
 * @type string
 * @desc 表示するラベルです。
 * 
 * @param GaugeColor1
 * @parent <GaugeLayout>
 * @text 色（左）
 * @type number
 * @default 14
 * @desc 奥義ゲージの色（左）です。
 * システムカラーの番号を指定してください。
 * 
 * @param GaugeColor2
 * @parent <GaugeLayout>
 * @text 色（右）
 * @type number
 * @default 0
 * @desc 奥義ゲージの色（右）です。
 * システムカラーの番号を指定してください。
 */

(function() {
"use strict";

/**
 * ●構造体をJSで扱えるように変換
 */
function parseStruct1(arg) {
    if (arg == undefined || arg == "") {
        return undefined;
    }
    const ret = [];
    for (const str of JSON.parse(arg)) {
        ret.push(str);
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
    if (str == undefined || str == "") {
        return def;
    }
    return str;
}

const PLUGIN_NAME = "NRP_SpecialSkill";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pSpecialTypeList = parseStruct1(parameters["SpecialTypeList"]);
const pShowGaugeWhenLearned = toBoolean(parameters["ShowGaugeWhenLearned"], false);
const pRecoverGauge = toBoolean(parameters["RecoverGauge"], false);
const pPlusOnlyHit = toBoolean(parameters["PlusOnlyHit"], false);
const pNotPlusWhenUsed = toBoolean(parameters["NotPlusWhenUsed"], false);
const pNotPlusSameTarget = toBoolean(parameters["NotPlusSameTarget"], false);
const pMultipleAttenuation = parameters["MultipleAttenuation"];
const pShowGaugeNumber = toBoolean(parameters["ShowGaugeNumber"], false);
const pLabelWidth = toNumber(parameters["LabelWidth"]);
const pGaugeWidth = toNumber(parameters["GaugeWidth"]);
const pGaugeHeight = toNumber(parameters["GaugeHeight"]);
const pGaugeInterval = toNumber(parameters["GaugeInterval"], 16);
const pGaugeFlash = toBoolean(parameters["GaugeFlash"], false);
const pShowMenu = toBoolean(parameters["ShowMenu"], false);
const pMenuStartGaugeX = toNumber(parameters["MenuStartGaugeX"]);
const pMenuStartGaugeY = toNumber(parameters["MenuStartGaugeY"]);
const pShowStatus = toBoolean(parameters["ShowStatus"], false);
const pStatusStartGaugeX = toNumber(parameters["StatusStartGaugeX"]);
const pStatusStartGaugeY = toNumber(parameters["StatusStartGaugeY"]);
const pShowBattle = toBoolean(parameters["ShowBattle"], false);
const pBattleStartGaugeX = toNumber(parameters["BattleStartGaugeX"]);
const pBattleStartGaugeY = toNumber(parameters["BattleStartGaugeY"]);
const pBattleAdjustNameY = toNumber(parameters["BattleAdjustNameY"]);
const pBattleNameHpInterval = toNumber(parameters["BattleNameHpInterval"]);

// ステータス表示用の識別子
const STATUS_TYPE = "specialGauge";

// ゲージ登録がない場合は意味を成さないので終了
if (!pSpecialTypeList) {
    return;
}

// 対象記憶用
let mTargetIndexes = [];

//-----------------------------------------------------------------------------
// プラグインコマンド
//-----------------------------------------------------------------------------

/**
 * ●奥義ゲージの増減
 */
PluginManager.registerCommand(PLUGIN_NAME, "ChangeSpecialGauge", function(args) {
    const actorId = eval(args.Actor);
    const specialSkillType = eval(args.SpecialSkillType);
    const value = eval(args.Value);

    if (!value) {
        return;
    }

    // アクターの指定がある場合
    if (actorId) {
        const actor = $gameActors.actor(actorId);
        addSpecialGauge(actor, specialSkillType, value);
        return;
    }

    // アクターの指定がない場合はパーティ全員が対象
    for (const actor of $gameParty.members()) {
        addSpecialGauge(actor, specialSkillType, value);
    }
});

/**
 * ●アクターの奥義ゲージを増減させる。
 */
function addSpecialGauge(actor, specialSkillType, value) {
    // 奥義ゲージタイプの指定がある場合
    if (specialSkillType) {
        const index = specialSkillType - 1;
        actor.addSpecialGauge(index, value);

    // 奥義ゲージタイプの指定がない場合は全部
    } else {
        for (let i = 0; i < pSpecialTypeList.length; i++) {
            actor.addSpecialGauge(i, value);
        }
    }
}

//-----------------------------------------------------------------------------
// Game_BattlerBase
//-----------------------------------------------------------------------------

/**
 * ●初期化
 */
const _Game_BattlerBase_initMembers = Game_BattlerBase.prototype.initMembers;
Game_BattlerBase.prototype.initMembers = function() {
    _Game_BattlerBase_initMembers.apply(this, arguments);

    // 現状、アクターだけなので敵キャラは不要だが、一応バトラー共通にしておく。
    this.clearSpecialGauges();
};

/**
 * 【独自】奥義ゲージを初期化
 */
Game_BattlerBase.prototype.clearSpecialGauges = function() {
    this._specialGauges = [];
    for (let i = 0; i < pSpecialTypeList.length; i++) {
        this._specialGauges[i] = 0;
    }
};

if (pRecoverGauge) {
    /**
     * ●全回復
     */
    const _Game_BattlerBase_recoverAll = Game_BattlerBase.prototype.recoverAll;
    Game_BattlerBase.prototype.recoverAll = function() {
        _Game_BattlerBase_recoverAll.apply(this, arguments);

        // eval参照用
        const a = this;
        // ゲージも全回復
        for (let i = 0; i < pSpecialTypeList.length; i++) {
            // 指定がない場合は全部
            const gaugeData = getSpecialGaugeData(i);
            // ゲージに加算
            this.addSpecialGauge(i, eval(gaugeData.GaugeMax));
        }
    };
}

/**
 * ●スキルの消費を払えるかどうか？
 */
const _Game_BattlerBase_canPaySkillCost = Game_BattlerBase.prototype.canPaySkillCost;
Game_BattlerBase.prototype.canPaySkillCost = function(skill) {
    const specialSkillType = toNumber(skill.meta.SpecialSkill);
    if (specialSkillType) {
        const gaugeValue = this._specialGauges[specialSkillType - 1];
        return _Game_BattlerBase_canPaySkillCost.apply(this, arguments)
            && gaugeValue >= this.skillSpecialGaugeCost(skill);
    }
    return _Game_BattlerBase_canPaySkillCost.apply(this, arguments);
};

/**
 * ●スキルの消費
 */
const _Game_BattlerBase_paySkillCost = Game_BattlerBase.prototype.paySkillCost;
Game_BattlerBase.prototype.paySkillCost = function(skill) {
    _Game_BattlerBase_paySkillCost.apply(this, arguments);

    // 奥義の場合
    const specialSkillType = toNumber(skill.meta.SpecialSkill);
    if (specialSkillType) {
        // 該当のゲージを減算
        this._specialGauges[specialSkillType - 1] -= this.skillSpecialGaugeCost(skill);
    }
};

/**
 * 【独自】奥義ゲージの消費を取得
 */
Game_BattlerBase.prototype.skillSpecialGaugeCost = function(skill) {
    const specialSkillType = toNumber(skill.meta.SpecialSkill);
    if (!specialSkillType) {
        return null;
    }

    // eval参照用
    const a = this;

    // 指定があれば、数値分消費
    if (skill.meta.SpecialSkillCost) {
        return eval(skill.meta.SpecialSkillCost);
    }

    // 指定がない場合は全部
    const gaugeData = getSpecialGaugeData(specialSkillType - 1);
    return eval(gaugeData.GaugeMax);
};

/**
 * ●ステート付加
 */
const _Game_BattlerBase_addNewState = Game_BattlerBase.prototype.addNewState;
Game_BattlerBase.prototype.addNewState = function(stateId) {
    _Game_BattlerBase_addNewState.apply(this, arguments);

    for (let i = 0; i < pSpecialTypeList.length; i++) {
        const chargeValue = getChargeValue(this, $dataStates[stateId], i);
        // ゲージに加算
        this.addSpecialGauge(i, chargeValue);
    }
};

//-----------------------------------------------------------------------------
// Game_Battler
//-----------------------------------------------------------------------------

/**
 * ●戦闘開始
 */
const _Game_Battler_onBattleStart = Game_Battler.prototype.onBattleStart;
Game_Battler.prototype.onBattleStart = function(advantageous) {
    _Game_Battler_onBattleStart.apply(this, arguments);

    // 途中適用対策
    this.clearSpecialGaugesIfNecessary();

    // eval参照用
    const a = this;

    // ゲージ毎に設定
    for (let i = 0; i < pSpecialTypeList.length; i++) {
        const gaugeData = getSpecialGaugeData(i);

        // ゲージを持ち越さない場合はクリア
        if (!toBoolean(gaugeData.PreserveGauge)) {
            this._specialGauges[i] = 0;
        }
        // 開始値をゲージに加算
        this.addSpecialGauge(i, eval(gaugeData.BattleStartValue));
    }
};

/**
 * ●アクション開始
 */
const _Game_Battler_performActionStart = Game_Battler.prototype.performActionStart;
Game_Battler.prototype.performActionStart = function(action) {
    // 対象クリア
    mTargetIndexes = [];

    _Game_Battler_performActionStart.apply(this, arguments);
};

/**
 * ●ダメージ時
 */
const _Game_Battler_onDamage = Game_Battler.prototype.onDamage;
Game_Battler.prototype.onDamage = function(value) {
    _Game_Battler_onDamage.apply(this, arguments);

    // eval参照用
    const a = this;

    for (let i = 0; i < pSpecialTypeList.length; i++) {
        const gaugeData = getSpecialGaugeData(i);
        let skill = null;
        if (BattleManager._action) {
            skill = BattleManager._action.item();
        }
        const damageValue = getDamageValue(a, skill, gaugeData, value)
        // ゲージに加算
        this.addSpecialGauge(i, damageValue);
    }
};

/**
 * ●自動回復
 */
const _Game_Battler_regenerateAll = Game_Battler.prototype.regenerateAll;
Game_Battler.prototype.regenerateAll = function() {
    _Game_Battler_regenerateAll.apply(this, arguments);

    // 奥義ゲージ再生
    if (this.isAlive()) {
        this.regenerateSpecialGauge();
    }
};

/**
 * 【独自】奥義ゲージ再生
 */
Game_Battler.prototype.regenerateSpecialGauge = function() {
    const a = this;

    // ステート毎に計算
    for (const state of this.states()) {
        for (let i = 0; i < pSpecialTypeList.length; i++) {
            const regenerateValue = getRegenerateValue(a, state, i);
            // 奥義ゲージ再生値があれば加算
            this.addSpecialGauge(i, regenerateValue);
        }
    }

    // 基本値
    for (let i = 0; i < pSpecialTypeList.length; i++) {
        // ゲージデータを取得
        const gaugeData = getSpecialGaugeData(i);
        this.addSpecialGauge(i, eval(gaugeData.RegenerateValue));
    }
};

/**
 * ●ゲージ再生の加算値を取得
 */
function getRegenerateValue(a, stateData, index) {
    // <SpecialSkillRegenerateValue>の指定がある場合は優先
    const metaValue = stateData.meta.SpecialSkillRegenerateValue;
    if (metaValue != null) {
        return eval(metaValue);
    }
    // <SpecialSkillRegenerateValue?>の指定がある場合は優先
    const indexMetaValue = stateData.meta["SpecialSkillRegenerateValue" + (index + 1)];
    if (indexMetaValue != null) {
        return eval(indexMetaValue);
    }
    return 0;
}

/**
 * 【独自】奥義ゲージの値を加算
 */
Game_Battler.prototype.addSpecialGauge = function(index, value) {
    // 途中適用対策
    this.clearSpecialGaugesIfNecessary();

    // 値がなければ処理停止
    if (!value) {
        return;
    }

    // eval参照用
    const a = this;

    // ゲージが無効なら処理停止
    if (!isGaugeConditionOK(index, a)) {
        return;
    }

    // 値が無効なら0に初期化
    if (!this._specialGauges[index]) {
        this._specialGauges[index] = 0;
    }

    const gaugeData = getSpecialGaugeData(index);
    const gaugeMax = eval(gaugeData.GaugeMax);

    // 値が既に満タンかつ値がプラスならば処理終了
    if (this._specialGauges[index] >= gaugeMax && value > 0) {
        return;
    }

    this._specialGauges[index] += value;

    // 上限～下限を超えないように調整
    this._specialGauges[index] = Math.min(this._specialGauges[index], gaugeMax);
    this._specialGauges[index] = Math.max(this._specialGauges[index], 0);

    // 値が満タンになった場合は演出実行
    if (this._specialGauges[index] == gaugeMax && gaugeData.ChargedAnimation) {
        callAnimation(this, eval(gaugeData.ChargedAnimation));
    }
}

/**
 * 【独自】必要なら奥義ゲージを初期化
 * ※途中適用向けの対策
 */
Game_Battler.prototype.clearSpecialGaugesIfNecessary = function() {
    if (!this._specialGauges) {
        this.clearSpecialGauges();
    }
}

//-----------------------------------------------------------------------------
// Game_Action
//-----------------------------------------------------------------------------

/**
 * ●スキル結果の適用
 */
const _Game_Action_apply = Game_Action.prototype.apply;
Game_Action.prototype.apply = function(target) {
    _Game_Action_apply.apply(this, arguments);
    
    const result = target.result();
    // 命中時限定なら命中時のみ
    // ※奥義使用時は加算しない。
    if ((!pPlusOnlyHit || result.isHit())) {
        // 行動後のゲージ加算
        this.specialGaugeAfterApply(target);
    }

    //-------------------------------------
    // こちらは対象側のゲージ加算
    //-------------------------------------
    // 命中した場合
    if (result.isHit()) {
        for (let i = 0; i < pSpecialTypeList.length; i++) {
            const chargeValue = getChargeValue(target, this.item(), i);
            // ゲージに加算
            target.addSpecialGauge(i, chargeValue);
        }

    // 回避した場合
    } else if (result.missed || result.evaded) {
        for (let i = 0; i < pSpecialTypeList.length; i++) {
            const evadedValue = getEvadedValue(target, this.item(), i);
            // ゲージに加算
            target.addSpecialGauge(i, evadedValue);
        }
    }
};

/**
 * 【独自】行動後のゲージ加算
 */
Game_Action.prototype.specialGaugeAfterApply = function(target) {
    const subject = this.subject();
    const result = target.result();

    // eval参照用
    const a = subject;

    let isNotPlusSameTarget = false;

    // 同一の対象は加算しない場合
    // かつ、既に対象となっている場合
    if (pNotPlusSameTarget && mTargetIndexes.includes(target)) {
        isNotPlusSameTarget = true;

    // それ以外
    } else {
        mTargetIndexes.push(target);
    }

    // ゲージ毎に加算
    for (let i = 0; i < pSpecialTypeList.length; i++) {
        // 行動ボーナス
        let value = getActionValue(a, this.item(), i);

        if (isNotPlusSameTarget) {
            // 増加量を0に
            value = 0;
        }

        // ヒット数で減衰する場合
        if (pMultipleAttenuation) {
            // eval参照用
            const count = mTargetIndexes.length;
            if (count >= 2) {
                value = Math.floor(eval(pMultipleAttenuation));
            }
        }

        subject.addSpecialGauge(i, value);
        // 会心ボーナス
        if (result.critical) {
            const gaugeData = getSpecialGaugeData(i);
            if (gaugeData.CriticalValue) {
                subject.addSpecialGauge(i, eval(gaugeData.CriticalValue));
            }
        }
    }
};

/**
 * ●戦闘不能時
 */
const _Game_Actor_performCollapse = Game_Actor.prototype.performCollapse;
Game_Actor.prototype.performCollapse = function() {
    _Game_Actor_performCollapse.apply(this, arguments);

    // パーティ全員（生存者）が対象
    for (const a of $gameParty.aliveMembers()) {
        // ゲージ毎に加算
        for (let i = 0; i < pSpecialTypeList.length; i++) {
            const gaugeData = getSpecialGaugeData(i);
            // ゲージに加算
            if (gaugeData.FriendsDeadValue) {
                a.addSpecialGauge(i, eval(gaugeData.FriendsDeadValue));
            }
        }
    }
};

//-----------------------------------------------------------------------------
// Game_Enemy
//-----------------------------------------------------------------------------

/**
 * ●敵撃破時
 */
const _Game_Enemy_performCollapse = Game_Enemy.prototype.performCollapse;
Game_Enemy.prototype.performCollapse = function() {
    _Game_Enemy_performCollapse.apply(this, arguments);

    const subject = BattleManager._subject;

    // eval参照用
    const a = subject;
    const b = this;

    // アクターがとどめを刺した場合が対象
    if (subject && subject.isActor()) {
        // ゲージ毎に加算
        for (let i = 0; i < pSpecialTypeList.length; i++) {
            const gaugeData = getSpecialGaugeData(i);
            // ゲージに加算
            if (gaugeData.DefeatEnemyValue) {
                a.addSpecialGauge(i, eval(gaugeData.DefeatEnemyValue));
            }
        }
    }
};

//-----------------------------------------------------------------------------
// BattleManager
//-----------------------------------------------------------------------------

/**
 * ●行動終了時
 */
const _BattleManager_endAction = BattleManager.endAction;
BattleManager.endAction = function() {
    // eval参照用
    const a = BattleManager._subject;
    const action = this._action;

    if (action) {
        for (let i = 0; i < a._specialGauges.length; i++) {
            const actionEndValue = getActionEndValue(a, action.item(), i);
            // ゲージに加算
            a.addSpecialGauge(i, actionEndValue);
        }
    }

    _BattleManager_endAction.apply(this, arguments);
};

//-----------------------------------------------------------------------------
// Window_SkillList
//-----------------------------------------------------------------------------

/**
 * ●スキルの消費を描画
 */
const _Window_SkillList_drawSkillCost = Window_SkillList.prototype.drawSkillCost;
Window_SkillList.prototype.drawSkillCost = function(skill, x, y, width) {
    if (this._actor.skillSpecialGaugeCost(skill) > 0) {
        // 奥義タイプを取得
        const specialSkillType = toNumber(skill.meta.SpecialSkill);
        // 奥義対応に応じた奥義情報を取得
        const gaugeData = getSpecialGaugeData(specialSkillType - 1);
        
        if (isNotBlank(gaugeData.CostColor)) {
            // コストの文字色を設定
            this.changeTextColor(ColorManager.textColor(toNumber(gaugeData.CostColor)));
            // コストを描画
            this.drawText(this._actor.skillSpecialGaugeCost(skill), x, y, width, "right");
        }
        return;
    }
    _Window_SkillList_drawSkillCost.apply(this, arguments);
};

//-----------------------------------------------------------------------------
// Window_StatusBase
//-----------------------------------------------------------------------------

if (pShowMenu) {
    /**
     * ●アクターのメニュー画面のステータス描画
     */
    const _Window_StatusBase_drawActorSimpleStatus = Window_StatusBase.prototype.drawActorSimpleStatus;
    Window_StatusBase.prototype.drawActorSimpleStatus = function(actor, x, y) {
        _Window_StatusBase_drawActorSimpleStatus.apply(this, arguments);

        // 途中適用対策
        actor.clearSpecialGaugesIfNecessary();
        // eval参照用
        const a = actor;

        // 登録したゲージの数だけループ
        for (let i = 0; i < pSpecialTypeList.length; i++) {
            // ゲージが有効かどうか？
            if (isGaugeConditionOK(i, a)) {
                // ゲージを表示
                this.placeGauge(a, STATUS_TYPE + i, x + pMenuStartGaugeX, y + pMenuStartGaugeY + i * pGaugeInterval);
            }
        }
    };
}

//-----------------------------------------------------------------------------
// Window_Status
//-----------------------------------------------------------------------------

if (pShowStatus) {
    /**
     * ●基本情報の表示
     */
    const _Window_Status_drawBasicInfo = Window_Status.prototype.drawBasicInfo;
    Window_Status.prototype.drawBasicInfo = function(x, y) {
        _Window_Status_drawBasicInfo.apply(this, arguments);

        // eval参照用
        const a = this._actor;

        // 登録したゲージの数だけループ
        for (let i = 0; i < pSpecialTypeList.length; i++) {
            // ゲージが有効かどうか？
            if (isGaugeConditionOK(i, a)) {
                // ゲージを表示
                this.placeGauge(a, STATUS_TYPE + i, x + pStatusStartGaugeX, y + pStatusStartGaugeY + i * pGaugeInterval);
            }
        }
    };
}

//-----------------------------------------------------------------------------
// Window_BattleStatus
//-----------------------------------------------------------------------------

if (pShowBattle) {
    /**
     * ●ステータス描画
     */
    const _Window_BattleStatus_drawItemStatus = Window_BattleStatus.prototype.drawItemStatus;
    Window_BattleStatus.prototype.drawItemStatus = function(index) {
        _Window_BattleStatus_drawItemStatus.apply(this, arguments);

        const actor = this.actor(index);
        const rect = this.itemRectWithPadding(index);
        const x = this.nameX(rect);
        const y = this.nameY(rect);

        // 途中適用対策
        actor.clearSpecialGaugesIfNecessary();
        // eval参照用
        const a = actor;

        // 登録したゲージの数だけループ
        for (let i = 0; i < pSpecialTypeList.length; i++) {
            // ゲージが有効かどうか？
            if (isGaugeConditionOK(i, a)) {
                // ゲージを表示
                this.placeGauge(a, STATUS_TYPE + i, x + pBattleStartGaugeX, y + pBattleStartGaugeY + i * pGaugeInterval);
            }
        }
    };

    /**
     * ●名前のＹ座標
     * ※顔グラの座標も上に変動する模様。
     */
    const _Window_BattleStatus_nameY = Window_BattleStatus.prototype.nameY;
    Window_BattleStatus.prototype.nameY = function(rect) {
        return _Window_BattleStatus_nameY.apply(this, arguments) - pBattleNameHpInterval;
    };

    /**
     * ●ゲージ類（ＨＰ～ＴＰ）のＹ座標
     * ※顔グラの座標も上に変動する模様。
     */
    const _Window_BattleStatus_basicGaugesY = Window_BattleStatus.prototype.basicGaugesY;
    Window_BattleStatus.prototype.basicGaugesY = function(rect) {
        return _Window_BattleStatus_basicGaugesY.apply(this, arguments) + pBattleAdjustNameY;
    };
}

//-----------------------------------------------------------------------------
// Sprite_Gauge
//-----------------------------------------------------------------------------

/**
 * ●現在値
 */
const _Sprite_Gauge_currentValue = Sprite_Gauge.prototype.currentValue;
Sprite_Gauge.prototype.currentValue = function() {
    if (this.isSpecialGauge()) {
        return this._battler._specialGauges[this.specialGaugeIndex()];
    }
    return _Sprite_Gauge_currentValue.apply(this, arguments);
};

/**
 * ●最大値
 */
const _Sprite_Gauge_currentMaxValue = Sprite_Gauge.prototype.currentMaxValue;
Sprite_Gauge.prototype.currentMaxValue = function() {
    if (this.isSpecialGauge()) {
        const a = this._battler;
        const gauge = this.specialGaugeData();
        return eval(gauge.GaugeMax);
    }
    return _Sprite_Gauge_currentMaxValue.apply(this, arguments);
};

/**
 * ●数値表示
 */
const _Sprite_Gauge_drawValue = Sprite_Gauge.prototype.drawValue;
Sprite_Gauge.prototype.drawValue = function() {
    // 数値を表示しない。
    if (!pShowGaugeNumber && this.isSpecialGauge()) {
        return;
    }
    _Sprite_Gauge_drawValue.apply(this, arguments);
};

/**
 * ●ラベル表示
 */
const _Sprite_Gauge_label = Sprite_Gauge.prototype.label;
Sprite_Gauge.prototype.label = function() {
    if (this.isSpecialGauge()) {
        const gauge = this.specialGaugeData();
        return gauge.Label;
    }
    return _Sprite_Gauge_label.apply(this, arguments);
};

/**
 * ●ゲージの相対Ｘ座標（＝ラベルの幅）
 */
const _Sprite_Gauge_gaugeX = Sprite_Gauge.prototype.gaugeX;
Sprite_Gauge.prototype.gaugeX = function() {
    if (this.isSpecialGauge() && pLabelWidth) {
        return pLabelWidth;
    }
    return _Sprite_Gauge_gaugeX.apply(this, arguments);
};

/**
 * ●ゲージの横幅
 */
const _Sprite_Gauge_bitmapWidth = Sprite_Gauge.prototype.bitmapWidth;
Sprite_Gauge.prototype.bitmapWidth = function() {
    if (this.isSpecialGauge() && pGaugeWidth) {
        return pGaugeWidth;
    }
    return _Sprite_Gauge_bitmapWidth.apply(this, arguments);
};

/**
 * ●ゲージの縦幅
 */
const _Sprite_Gauge_gaugeHeight = Sprite_Gauge.prototype.gaugeHeight;
Sprite_Gauge.prototype.gaugeHeight = function() {
    if (this.isSpecialGauge() && pGaugeHeight) {
        return pGaugeHeight;
    }
    return _Sprite_Gauge_gaugeHeight.apply(this, arguments);
};

/**
 * ●カラー１
 */
const _Sprite_Gauge_gaugeColor1 = Sprite_Gauge.prototype.gaugeColor1;
Sprite_Gauge.prototype.gaugeColor1 = function() {
    if (this.isSpecialGauge()) {
        const gauge = this.specialGaugeData();
        return ColorManager.textColor(gauge.GaugeColor1);
    }
    return _Sprite_Gauge_gaugeColor1.apply(this, arguments);
};

/**
 * ●カラー２
 */
const _Sprite_Gauge_gaugeColor2 = Sprite_Gauge.prototype.gaugeColor2;
Sprite_Gauge.prototype.gaugeColor2 = function() {
    if (this.isSpecialGauge()) {
        const gauge = this.specialGaugeData();
        return ColorManager.textColor(gauge.GaugeColor2);
    }
    return _Sprite_Gauge_gaugeColor2.apply(this, arguments);
};

if (pGaugeFlash) {
    /**
     * ●フラッシュ制御
     */
    const _Sprite_Gauge_updateFlashing = Sprite_Gauge.prototype.updateFlashing;
    Sprite_Gauge.prototype.updateFlashing = function() {
        if (this.isSpecialGauge()) {
            this._flashingCount++;
            if (this.currentValue() >= this.currentMaxValue()) {
                if (this._flashingCount % 30 < 15) {
                    this.setBlendColor(this.flashingColor1());
                } else {
                    this.setBlendColor(this.flashingColor2());
                }
            } else {
                this.setBlendColor([0, 0, 0, 0]);
            }
            return;
        }

        _Sprite_Gauge_updateFlashing.apply(this, arguments);
    };
}

/**
 * 【独自】奥義ゲージかどうか？
 */
Sprite_Gauge.prototype.isSpecialGauge = function() {
    if (this._statusType.startsWith(STATUS_TYPE)) {
        return true;
    }
    return false;
};

/**
 * 【独自】奥義ゲージデータを取得
 */
Sprite_Gauge.prototype.specialGaugeData = function() {
    return getSpecialGaugeData(this.specialGaugeIndex());
};

/**
 * 【独自】奥義ゲージのインデックスを取得
 */
Sprite_Gauge.prototype.specialGaugeIndex = function() {
    // ステータスタイプから固定文字列を除去して数値を取得
    return toNumber(this._statusType.replace(STATUS_TYPE, ""));
};

//-----------------------------------------------------------------------------
// 共通
//-----------------------------------------------------------------------------

/**
 * ●奥義ゲージデータを取得
 */
function getSpecialGaugeData(index) {
    return JSON.parse(pSpecialTypeList[index]);
}

/**
 * ●奥義スキルかの判定
 */
function isSpecialSkill(item) {
    return item && item.meta.SpecialSkill;
};

/**
 * ●奥義スキルかつタイプが一致するかの判定
 */
function isSpecialSkillType(item, type) {
    return item && toNumber(item.meta.SpecialSkill) == type;
};

/**
 * ●被ダメージ毎のゲージ加算値を取得
 */
function getDamageValue(a, skillData, gaugeData, damage) {
    return eval(gaugeData.DamageValue);
}

/**
 * ●行動毎のゲージ加算値を取得
 */
function getActionValue(a, skillData, index) {
    if (pNotPlusWhenUsed && isSpecialSkill(skillData)) {
        return 0;
    }

    // <SpecialSkillActionValue>の指定がある場合は優先
    const metaValue = skillData.meta.SpecialSkillActionValue;
    if (metaValue != null) {
        return eval(metaValue);
    }
    // <SpecialSkillActionValue?>の指定がある場合は優先
    const indexMetaValue = skillData.meta["SpecialSkillActionValue" + (index + 1)];
    if (indexMetaValue != null) {
        return eval(indexMetaValue);
    }

    // ゲージデータを取得
    const gaugeData = getSpecialGaugeData(index);
    return eval(gaugeData.ActionValue);
}

/**
 * ●行動終了時のゲージ加算値を取得
 */
function getActionEndValue(a, skillData, index) {
    if (pNotPlusWhenUsed && isSpecialSkill(skillData)) {
        return 0;
    }

    // <SpecialSkillActionEndValue>の指定がある場合は優先
    const metaValue = skillData.meta.SpecialSkillActionEndValue;
    if (metaValue != null) {
        return eval(metaValue);
    }
    // <SpecialSkillActionValue?>の指定がある場合は優先
    const indexMetaValue = skillData.meta["SpecialSkillActionEndValue" + (index + 1)];
    if (indexMetaValue != null) {
        return eval(indexMetaValue);
    }

    // ゲージデータを取得
    const gaugeData = getSpecialGaugeData(index);
    return eval(gaugeData.ActionEndValue);
}

/**
 * ●対象のゲージ加算値を取得
 * ※dataはスキルとステートの両方が来る。
 */
function getChargeValue(b, data, index) {
    // <SpecialSkillChargeValue>の指定がある場合は優先
    const metaValue = data.meta.SpecialSkillChargeValue;
    if (metaValue != null) {
        return eval(metaValue);
    }
    // <SpecialSkillChargeValue?>の指定がある場合は優先
    const indexMetaValue = data.meta["SpecialSkillChargeValue" + (index + 1)];
    if (indexMetaValue != null) {
        return eval(indexMetaValue);
    }
    return 0;
}

/**
 * ●対象の回避時ゲージ加算値を取得
 */
function getEvadedValue(b, data, index) {
    // ゲージデータを取得
    const gaugeData = getSpecialGaugeData(index);
    return eval(gaugeData.EvadedValue);
}

/**
 * ●値が有効かどうか？
 */
function isNotBlank(value) {
    if (value != "" && value != null) {
        return true;
    }
    return false;
}

/**
 * ●ゲージが有効かどうか？
 */
function isGaugeConditionOK(index, a) {
    // アクター以外は無効
    if (!a.isActor()) {
        return false;
    }

    // ついでに値が無効だった場合は初期化しておく。
    if (!a._specialGauges[index]) {
        a._specialGauges[index] = 0;
    }

    // 一致する奥義タイプが存在しない場合はゲージ無効
    if (pShowGaugeWhenLearned) {
        if (!a.skills().some(skill => isSpecialSkillType(skill, index + 1))) {
            return false;
        }
    }

    const gaugeData = getSpecialGaugeData(index);
    // 条件指定がない場合は常に有効
    if (!gaugeData.Condition) {
        return true;
    }
    return eval(gaugeData.Condition);
}

//-----------------------------------------------------------------------------
// アニメーション用
//-----------------------------------------------------------------------------

/**
 * ●アニメーション呼び出しを行う。
 * MV, MZの両方に対応
 */
function callAnimation(target, animationId) {
    if (!animationId) {
        return;
    }

    // MVの場合
    if (Utils.RPGMAKER_NAME == "MV") {
        target.startAnimation(animationId, target.isActor(), 0);

    // MZの場合
    } else {
        let animation = $dataAnimations[animationId];

        // MZのMV用アニメーションではない。
        // かつ、MZ用アニメーションが空で
        // $dataMvAnimationsが有効ならMV用アニメーションを取得
        if (!isMVAnimation(animation)
                && isEmptyAnimation(animation)
                && typeof $dataMvAnimations !== 'undefined') {
            animation = $dataMvAnimations[animationId];
        }

        createAnimationSprite([target], animation, false, 0);
    }
}

/**
 * ●MZアニメーションの情報が空かどうかの判定
 * ※AnimationMv.jsから移植
 */
function isEmptyAnimation(animation) {
    return animation &&
        !animation.effectName &&
        animation.flashTimings.length === 0 &&
        animation.soundTimings.length === 0;
}

/**
 * ●ＭＶアニメーションかどうかの判定
 */
function isMVAnimation(animation) {
    return animation && !!animation.frames;
};

/**
 * ●MZ用のアニメーション呼び出し
 */
function createAnimationSprite(targets, animation, mirror, delay) {
    var spriteSet = BattleManager._spriteset;

    const mv = spriteSet.isMVAnimation(animation);
    const sprite = new (mv ? Sprite_AnimationMV : Sprite_Animation)();
    const targetSprites = spriteSet.makeTargetSprites(targets);
    const baseDelay = spriteSet.animationBaseDelay();
    const previous = delay > baseDelay ? spriteSet.lastAnimationSprite() : null;
    if (spriteSet.animationShouldMirror(targets[0])) {
        mirror = !mirror;
    }
    sprite.targetObjects = targets;
    sprite.setup(targetSprites, animation, mirror, delay, previous);
    spriteSet._effectsContainer.addChild(sprite);
    spriteSet._animationSprites.push(sprite);
};

})();
