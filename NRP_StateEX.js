//=============================================================================
// NRP_StateEX.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.141 Extend the functionality of the state in various ways.
 * @orderAfter NRP_TraitsPlus
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/488957733.html
 *
 * @help Extend the functionality of the state in various ways.
 * 
 * For example, the following states can be created.
 * 
 * - Poisons and parameter changes that are not percentage effects.
 * - Poisons and parameter changes
 *   that become more effective the higher the user's magic power.
 * - States that inflict damage when hit.
 * 　※In other words, it is a damaging technique
 *     whose hit is determined by state resistance.
 * - State that activates a skill when it is released after a turn.
 *   For example, Mortal Ray is possible.
 * 
 * You can also have a popup appear when an add state misses.
 * ※Normally, only the decision based
 *   on the success rate of the skill is displayed.
 * 
 * -------------------------------------------------------------------
 * [Regeneration Value Settings]
 * -------------------------------------------------------------------
 * Specify the following in the notes field of the state.
 * 
 * <HrgExValue:?>
 * Sets the HP regeneration value according to the specified formula.
 * 
 * <MrgExValue:?>
 * Sets the MP regeneration value according to the specified formula.
 * 
 * <TrgExValue:?>
 * Sets the MP regeneration value according to the specified formula.
 * 
 * ※Both are "regeneration value", not "regeneration rate".
 *   A value that is not a percentage can be specified.
 * 
 * -------------------------------------------------------------------
 * For example, the following formula sets "Magic Power - Magic Defense".
 * 
 * <HrgExValue:b.mdf - a.mat>
 * 
 * Continuously inflicts damage for as long as the magic power
 * exceeds the target's magic defense.
 * ※When dealing damage, the value should be negative.
 * 
 * "a" is the side that gave the state
 * and "b" is the side that received it.
 * The value is calculated at the timing when the state is applied.
 * Random width and other settings are not available.
 * 
 * ◆Application
 * <HrgExValue:Math.min(b.mdf - a.mat, -1)>
 * 
 * The previous formula "b.mdf - a.mat" will recover conversely
 * if the target's magic defense is high.
 * So the formula is set so that the maximum value is less than -1.
 * 
 * -------------------------------------------------------------------
 * [Parameter Change Settings]
 * -------------------------------------------------------------------
 * Specify the following in the notes field of the state.
 * 
 * ◆Regular Parameters
 * <MhpEx:?>
 * Sets the Max HP(mhp) according to the specified formula.
 * 
 * <MmpEx:?>
 * Sets the Max MP(mmp) according to the specified formula.
 * 
 * <AtkEx:?>
 * Sets the AttacK Power(atk) according to the specified formula.
 * 
 * <DefEx:?>
 * Sets the Defense Power(def) according to the specified formula.
 * 
 * <MatEx:?>
 * Sets the Magic Attack Power(mat) according to the specified formula.
 * 
 * <MdfEx:?>
 * Sets the Magic Defense Power(mdf) according to the specified formula.
 * 
 * <AgiEx:?>
 * Sets the Magic Agility(agi) according to the specified formula.
 * 
 * <LukEx:?>
 * Sets the Luck(luk) according to the specified formula.
 * 
 * -------------------------------------------------------------------
 * ◆Example
 * <AtkEx:a.mat / 2>
 * Increases attack power by half the skill user's magic power.
 * 
 * Note that these correction values are added or subtracted later
 * than the normal parameter corrections and Buff/Debuff calculations.
 * 
 * -------------------------------------------------------------------
 * ◆Ex-Parameters
 * ※In both cases, 1 is 100%.
 * 
 * <HitEx:?>
 * Sets the Hit Rate(hit) according to the specified formula.
 * 
 * <EvaEx:?>
 * Sets the Evasion Rate(eva) according to the specified formula.
 * 
 * <CriEx:?>
 * Sets the Critical Rate(cri) according to the specified formula.
 * 
 * <CevEx:?>
 * Sets the Critical Evation Rate(cev) according to the specified formula.
 * 
 * <MevEx:?>
 * Sets the Magic Evation Rate(mev) according to the specified formula.
 * 
 * <MrfEx:?>
 * Sets the Magic Reflection Rate(mrf) according to the specified formula.
 * 
 * <CntEx:?>
 * Sets the Counter Attack Rate(cnt) according to the specified formula.
 * 
 * <HrgEx:?>
 * Sets the HP Regeneration Rate(hrg) according to the specified formula.
 * 
 * <MrgEx:?>
 * Sets the MP Regeneration Rate(mrg) according to the specified formula.
 * 
 * <TrgEx:?>
 * Sets the TP Regeneration Rate(trg) according to the specified formula.
 * 
 * -------------------------------------------------------------------
 * ◆Sp-Parameter
 * ※In both cases, 1 is 100%.
 * 
 * <TgrEx:?>
 * Sets the Target Rate(tgr) according to the specified formula.
 * 
 * <GrdEx:?>
 * Sets the Guard Effect Rate(grd) according to the specified formula.
 * 
 * <RecEx:?>
 * Sets the Recovery Effect Rate(rec) according to the specified formula.
 * 
 * <PhaEx:?>
 * Sets the Pharmacology(pha) according to the specified formula.
 * 
 * <McrEx:?>
 * Sets the MP Cost Rate(mcr) according to the specified formula.
 * 
 * <TcrEx:?>
 * Sets the TP Charge Rate(tcr) according to the specified formula.
 * 
 * <PdrEx:?>
 * Sets the Physical Damage Rate(pdr) according to the specified formula.
 * 
 * <MdrEx:?>
 * Sets the Magic Damage Rate(mdr) according to the specified formula.
 * 
 * <FdrEx:?>
 * Sets the Floor Damage Rate(fdr) according to the specified formula.
 * 
 * <ExrEx:?>
 * Sets the Experience Rate(exr) according to the specified formula.
 * 
 * -------------------------------------------------------------------
 * These are registered in the ParameterList of plugin parameters.
 * If you have added your own parameters with external plugins,
 * you may be able to define them additionally.
 * (※It depends on the implementation
 *  and cannot be guaranteed with certainty.)
 * 
 * -------------------------------------------------------------------
 * [Damage When Adding State]
 * -------------------------------------------------------------------
 * Specify the following in the notes field of the state.
 * 
 * <StateChangeHp:?>
 * HP is changed by the formula specified when the state is added.
 * 
 * <StateChangeMp:?>
 * MP is changed by the formula specified when the state is added.
 * 
 * <StateChangeTp:?>
 * TP is changed by the formula specified when the state is added.
 * 
 * -------------------------------------------------------------------
 * In both cases, a value of plus means recovery
 * and a value of minus means damage.
 * 
 * Note that overwriting an ongoing state has no effect.
 * If the "AlwaysUpdateState" plugin parameter
 * is turned on, or if the skill is set to add
 * and remove states at the same time, it will be enabled continuously.
 * 
 * <StateDamageSilent>
 * Numerical values are not displayed during the above.
 * 
 * ◆Example
 * <StateChangeHp:-b.hp>
 * The above will result in an immediate death state.
 * 
 * When combined with <StateDamageSilent>,
 * the damage display is also eliminated.
 * 
 * -------------------------------------------------------------------
 * [Other Effects]
 * -------------------------------------------------------------------
 * Specify the following in the notes field of the state.
 * 
 * <StateEndSkill:100>
 * When the state is released after a turn,
 * the number 100 skill is activated.
 * Note that the target will be random.
 * 
 * <DefeatState>
 * Same as dead, subject to a defeat determination.
 * Assumes a petrification-like state
 * that is not automatically released.
 * 
 * <IgnoreRecoverAll>
 * It will no longer be released by the event command Recover All.
 * Can only be released if a state is specified.
 * 
 * <IgnoreRecoverDie>
 * It will not be released in dead state.
 * Can only be released if a state is specified.
 * 
 * <RemoveState:10>
 * When a state is added, state #10 is removed.
 * Multiple comma-separated specifications are allowed (<RemoveState:10,11>)
 * 
 * <AutoRemovalActionStart>
 * Change Auto-removal Timing to Action Start.
 * ※The setting on the database should be “End Action”.
 * 
 * <AutoRemovalCommandStart>
 * Change Auto-removal Timing to Command Input Start.
 * Basically, it is intended to be used in conjunction
 * with NRP_CountTimeBattle.js.
 * ※The setting on the database should be “End Action”.
 * 
 * <BattlerInvisible>
 * Hides battlers.
 * Can be used for jumping skills with DynamicMotion.
 * https://newrpg.seesaa.net/article/479020531.html
 * 
 * -------------------------------------------------------------------
 * [Original Parameters]
 * -------------------------------------------------------------------
 * You can also set your own parameters
 * by selecting Original for the ParameterList type.
 * 
 * For example, suppose that the Id is set to 0, the Tag to “TestParam”,
 * and the note field of the state is set to <TestParam:a.level>.
 * In that case, you can refer to the value by
 * writing “a.stateExOriginalParam(0)” in the skill calculation formula.
 * ※Key is not used, but should be set to a value that is unique.
 * 
 * We envision states that reduce damage only
 * for specific skills, for example.
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
 * @param ParameterList
 * @type struct<Parameter>[]
 * @default ["{\"Type\":\"r\",\"Id\":\"0\",\"Key\":\"mhp\",\"Tag\":\"MhpEx\"}","{\"Type\":\"r\",\"Id\":\"1\",\"Key\":\"mmp\",\"Tag\":\"MmpEx\"}","{\"Type\":\"r\",\"Id\":\"2\",\"Key\":\"atk\",\"Tag\":\"AtkEx\"}","{\"Type\":\"r\",\"Id\":\"3\",\"Key\":\"def\",\"Tag\":\"DefEx\"}","{\"Type\":\"r\",\"Id\":\"4\",\"Key\":\"mat\",\"Tag\":\"MatEx\"}","{\"Type\":\"r\",\"Id\":\"5\",\"Key\":\"mdf\",\"Tag\":\"MdfEx\"}","{\"Type\":\"r\",\"Id\":\"6\",\"Key\":\"agi\",\"Tag\":\"AgiEx\"}","{\"Type\":\"r\",\"Id\":\"7\",\"Key\":\"luk\",\"Tag\":\"LukEx\"}","{\"Type\":\"x\",\"Id\":\"0\",\"Key\":\"hit\",\"Tag\":\"HitEx\"}","{\"Type\":\"x\",\"Id\":\"1\",\"Key\":\"eva\",\"Tag\":\"EvaEx\"}","{\"Type\":\"x\",\"Id\":\"2\",\"Key\":\"cri\",\"Tag\":\"CriEx\"}","{\"Type\":\"x\",\"Id\":\"3\",\"Key\":\"cev\",\"Tag\":\"CevEx\"}","{\"Type\":\"x\",\"Id\":\"4\",\"Key\":\"mev\",\"Tag\":\"MevEx\"}","{\"Type\":\"x\",\"Id\":\"5\",\"Key\":\"mrf\",\"Tag\":\"MrfEx\"}","{\"Type\":\"x\",\"Id\":\"6\",\"Key\":\"cnt\",\"Tag\":\"CntEx\"}","{\"Type\":\"x\",\"Id\":\"7\",\"Key\":\"hrg\",\"Tag\":\"HrgEx\"}","{\"Type\":\"x\",\"Id\":\"8\",\"Key\":\"mrg\",\"Tag\":\"MrgEx\"}","{\"Type\":\"x\",\"Id\":\"9\",\"Key\":\"trg\",\"Tag\":\"TrgEx\"}","{\"Type\":\"s\",\"Id\":\"0\",\"Key\":\"tgr\",\"Tag\":\"TgrEx\"}","{\"Type\":\"s\",\"Id\":\"1\",\"Key\":\"grd\",\"Tag\":\"GrdEx\"}","{\"Type\":\"s\",\"Id\":\"2\",\"Key\":\"rec\",\"Tag\":\"RecEx\"}","{\"Type\":\"s\",\"Id\":\"3\",\"Key\":\"pha\",\"Tag\":\"PhaEx\"}","{\"Type\":\"s\",\"Id\":\"4\",\"Key\":\"mcr\",\"Tag\":\"McrEx\"}","{\"Type\":\"s\",\"Id\":\"5\",\"Key\":\"tcr\",\"Tag\":\"TcrEx\"}","{\"Type\":\"s\",\"Id\":\"6\",\"Key\":\"pdr\",\"Tag\":\"PdrEx\"}","{\"Type\":\"s\",\"Id\":\"7\",\"Key\":\"mdr\",\"Tag\":\"MdrEx\"}","{\"Type\":\"s\",\"Id\":\"8\",\"Key\":\"fdr\",\"Tag\":\"FdrEx\"}","{\"Type\":\"s\",\"Id\":\"9\",\"Key\":\"exr\",\"Tag\":\"ExrEx\"}"]
 * @desc List of parameters.
 * If you have your own parameters, you can add them as well.
 * 
 * @param AlwaysUpdateState
 * @type boolean
 * @default false
 * @desc The update process is also performed for states that are in effect.
 * Duration in Turns is updated even when false.
 * 
 * @param UpdateType
 * @parent AlwaysUpdateState
 * @type select
 * @option 0:Latest Priority @value 0
 * @option 1:Maximum Priority @value 1
 * @default 0
 * @desc Latest Priority: Priority is given to new states.
 * Maximum Priority: Priority is given to stronger states.
 * 
 * @param ShowStateMiss
 * @type boolean
 * @default false
 * @desc Displays a miss when the state is missed.
 * This applies to skills with a damage type of None.
 * 
 * @param SlipOverKill
 * @type boolean
 * @default false
 * @desc For slip damage (e.g. poison), enable values that exceed the current HP.
 * 
 * @param QuickStateEndSkill
 * @type boolean
 * @default true
 * @desc Perform skills triggered by <StateEndSkill> with speed as the limit. Adjustment for CTB.
 */
//-----------------------------------------------------------------------------
// Parameter
//-----------------------------------------------------------------------------
/*~struct~Parameter:
 * @param Type
 * @type select
 * @option r:Regular-Params @value r
 * @option x:Ex-Params @value x
 * @option s:Sp-Params @value s
 * @option o:Original @value o
 * @default r
 * @desc Parameter type.
 * 
 * @param Id
 * @type number
 * @desc Parameter identification number.
 * 
 * @param Key
 * @type string
 * @desc Parameter identification name.
 * 
 * @param Tag
 * @type string
 * @desc Tag name specifying the amount of change in the parameter.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.141 ステートの機能を色々と拡張します。
 * @orderAfter NRP_TraitsPlus
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/488957733.html
 *
 * @help ステートの機能を色々と拡張します。
 * 
 * 例えば、以下のようなステートが作成できます。
 * 
 * ・割合効果ではない毒や能力変化
 * ・使用者の魔法力が高いほど効果の上がる毒や能力変化
 * ・命中時にダメージを与えるステート
 * 　※つまり、ステート耐性で命中の決まるダメージ技です。
 * 　　ＦＦシリーズのグラビデや即死効果など。
 * ・ターン経過で解除された際にスキルを発動するステート
 * 　例えば、死の宣告などが可能です。
 * 
 * また、ステート付加が外れた際に、ミスを表示するようにできます。
 * ※通常はスキルの成功率による判定しか表示されません。
 * 
 * -------------------------------------------------------------------
 * ■再生値の設定
 * -------------------------------------------------------------------
 * ステートのメモ欄に以下を指定してください。
 * 
 * <HrgExValue:?>
 * 指定した計算式を元にHP再生値を設定します。
 * 
 * <MrgExValue:?>
 * 指定した計算式を元にMP再生値を設定します。
 * 
 * <TrgExValue:?>
 * 指定した計算式を元にTP再生値を設定します。
 * 
 * ※いずれも『再生率』ではなく『再生値』です。
 * 　割合ではない数値を指定可能です。
 * 
 * -------------------------------------------------------------------
 * 例えば、以下の数式では「魔法力 - 魔法防御」を設定します。
 * <HrgExValue:b.mdf - a.mat>
 * 
 * 魔法力が相手の魔法防御を上回った分だけ、継続的にダメージを与え続けます。
 * ※ダメージを与える場合は値をマイナスにしてください。
 * 
 * aはステートをかけた側、bはかけられた側です。
 * 値の計算はステートがかかったタイミングで行われます。
 * ランダム幅などの設定はできません。
 * 
 * ◆応用
 * <HrgExValue:Math.min(b.mdf - a.mat, -1)>
 * 
 * 先程の「b.mdf - a.mat」の式では、
 * 相手の魔法防御が高い場合、逆に回復してしまいます。
 * そこで最大でも値が-1以下となるように設定する数式です。
 * 
 * -------------------------------------------------------------------
 * ■能力変化の設定
 * -------------------------------------------------------------------
 * ステートのメモ欄に以下を指定してください。
 * 
 * ◆通常能力値
 * <MhpEx:?>
 * 指定した計算式を元に最大ＨＰ（mhp）を変更します。
 * 
 * <MmpEx:?>
 * 指定した計算式を元に最大ＭＰ（mmp）を変更します。
 * 
 * <AtkEx:?>
 * 指定した計算式を元に攻撃力（atk）を変更します。
 * 
 * <DefEx:?>
 * 指定した計算式を元に防御力（def）を変更します。
 * 
 * <MatEx:?>
 * 指定した計算式を元に魔法力（mat）を変更します。
 * 
 * <MdfEx:?>
 * 指定した計算式を元に魔法防御（mdf）を変更します。
 * 
 * <AgiEx:?>
 * 指定した計算式を元に敏捷性（agi）を変更します。
 * 
 * <LukEx:?>
 * 指定した計算式を元に運（luk）を変更します。
 * 
 * -------------------------------------------------------------------
 * ◆例
 * <AtkEx:a.mat / 2>
 * 攻撃力をスキル使用者の魔法力の半分だけ上昇させます。
 * 
 * なお、これらの補正値は通常の能力値補正や
 * 強化／弱体の計算よりも、後に加算・減算されます。
 * 
 * -------------------------------------------------------------------
 * ◆追加能力値
 * ※いずれも1が100%となります。
 * 
 * <HitEx:?>
 * 指定した計算式を元に命中率（hit）を変更します。
 * 
 * <EvaEx:?>
 * 指定した計算式を元に回避率（eva）を変更します。
 * 
 * <CriEx:?>
 * 指定した計算式を元に会心率（cri）を変更します。
 * 
 * <CevEx:?>
 * 指定した計算式を元に会心回避率（cev）を変更します。
 * 
 * <MevEx:?>
 * 指定した計算式を元に魔法回避率（mev）を変更します。
 * 
 * <MrfEx:?>
 * 指定した計算式を元に魔法反射率（mrf）を変更します。
 * 
 * <CntEx:?>
 * 指定した計算式を元に反撃率（cnt）を変更します。
 * 
 * <HrgEx:?>
 * 指定した計算式を元にHP再生率（hrg）を変更します。
 * 
 * <MrgEx:?>
 * 指定した計算式を元にMP再生率（mrg）を変更します。
 * 
 * <TrgEx:?>
 * 指定した計算式を元にTP再生率（trg）を変更します。
 * 
 * -------------------------------------------------------------------
 * ◆特殊能力値
 * ※いずれも1が100%となります。
 * 
 * <TgrEx:?>
 * 指定した計算式を元に狙われ率（tgr）を変更します。
 * 
 * <GrdEx:?>
 * 指定した計算式を元に防御効果率（grd）を変更します。
 * 
 * <RecEx:?>
 * 指定した計算式を元に回復効果率（rec）を変更します。
 * 
 * <PhaEx:?>
 * 指定した計算式を元に薬の知識（pha）を変更します。
 * 
 * <McrEx:?>
 * 指定した計算式を元にMP消費率（mcr）を変更します。
 * 
 * <TcrEx:?>
 * 指定した計算式を元にTPチャージ率（tcr）を変更します。
 * 
 * <PdrEx:?>
 * 指定した計算式を元に物理ダメージ率（pdr）を変更します。
 * 
 * <MdrEx:?>
 * 指定した計算式を元に魔法ダメージ率（mdr）を変更します。
 * 
 * <FdrEx:?>
 * 指定した計算式を元に床ダメージ率（fdr）を変更します。
 * 
 * <ExrEx:?>
 * 指定した計算式を元に経験獲得率（exr）を変更します。
 * 
 * -------------------------------------------------------------------
 * これらはプラグインパラメータのパラメータリストに登録されています。
 * 外部プラグインで独自パラメータを追加した場合は、
 * それらを追加で定義できるかも？
 * （※実装次第なので、確実には保証できません。）
 * 
 * -------------------------------------------------------------------
 * ■ステート時にダメージ
 * -------------------------------------------------------------------
 * ステートのメモ欄に以下を指定してください。
 * 
 * <StateChangeHp:?>
 * ステート付加時に指定した計算式でＨＰを変更します。
 * 
 * <StateChangeMp:?>
 * ステート付加時に指定した計算式でＭＰを変更します。
 * 
 * <StateChangeTp:?>
 * ステート付加時に指定した計算式でＴＰを変更します。
 * 
 * -------------------------------------------------------------------
 * いずれも値が＋なら回復、－ならダメージです。
 * 
 * なお、継続中のステートに上書きした場合は効果がありません。
 * プラグインパラメータの『ステートを常に更新』をオンにするか、
 * スキル側にステート付加と解除を同時に設定すれば、連続で有効になります。
 * 
 * <StateDamageSilent>
 * 上記の際に数値表示を行いません。
 * 
 * ◆例
 * <StateChangeHp:-b.hp>
 * で、即死ステートになります。
 * <StateDamageSilent>を組み合わせると、ダメージ表示もなくなります。
 * 
 * -------------------------------------------------------------------
 * ■その他の効果
 * -------------------------------------------------------------------
 * ステートのメモ欄に以下を指定してください。
 * 
 * <StateEndSkill:100>
 * ステートがターン経過で解除される際に１００番のスキルを発動します。
 * なお、対象はランダムになります。
 * 
 * <DefeatState>
 * 戦闘不能と同じように、全滅判定の対象になります。
 * 自動解除されない石化のようなステートを想定しています。
 * 
 * <IgnoreRecoverAll>
 * イベントコマンドの全回復で解除されなくなります。
 * ステートを指定した場合のみ解除できます。
 * 
 * <IgnoreRecoverDie>
 * 戦闘不能時に解除されなくなります。
 * ステートを指定した場合のみ解除できます。
 * 
 * <RemoveState:10>
 * ステートが追加された際、10番のステートを解除する。
 * カンマ区切りで複数指定可（<RemoveState:10,11>）
 * 
 * <AutoRemovalActionStart>
 * 自動解除のタイミングを行動開始時に変更します。
 * ※データベース上の設定は『行動終了時』にしてください。
 * 
 * <AutoRemovalCommandStart>
 * 自動解除のタイミングをコマンド入力開始時に変更します。
 * 基本的にはNRP_CountTimeBattle.jsとの併用を想定しています。
 * ※データベース上の設定は『行動終了時』にしてください。
 * 
 * <BattlerInvisible>
 * バトラーを非表示にします。
 * DynamicMotionによるジャンプ系スキルに使えます。
 * https://newrpg.seesaa.net/article/479020531.html
 * 
 * -------------------------------------------------------------------
 * ■オリジナルパラメータ
 * -------------------------------------------------------------------
 * パラメータリストのタイプにオリジナルを選択すると、
 * 独自のパラメータを設定することもできます。
 * 
 * 例えば、ＩＤに0, タグ名に"TestParam"と設定した場合、
 * <TestParam:a.level>と設定したステートを付加すると、
 * スキルの計算式にて「a.stateExOriginalParam(0)」とすれば値を参照できます。
 * ※識別名は使いませんが、一意になる値を設定しておいてください。
 * 
 * 特定のスキルのみダメージを減らすステートなどを想定しています。
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
 * @param ParameterList
 * @text パラメータリスト
 * @type struct<Parameter>[]
 * @default ["{\"Type\":\"r\",\"Id\":\"0\",\"Key\":\"mhp\",\"Tag\":\"MhpEx\"}","{\"Type\":\"r\",\"Id\":\"1\",\"Key\":\"mmp\",\"Tag\":\"MmpEx\"}","{\"Type\":\"r\",\"Id\":\"2\",\"Key\":\"atk\",\"Tag\":\"AtkEx\"}","{\"Type\":\"r\",\"Id\":\"3\",\"Key\":\"def\",\"Tag\":\"DefEx\"}","{\"Type\":\"r\",\"Id\":\"4\",\"Key\":\"mat\",\"Tag\":\"MatEx\"}","{\"Type\":\"r\",\"Id\":\"5\",\"Key\":\"mdf\",\"Tag\":\"MdfEx\"}","{\"Type\":\"r\",\"Id\":\"6\",\"Key\":\"agi\",\"Tag\":\"AgiEx\"}","{\"Type\":\"r\",\"Id\":\"7\",\"Key\":\"luk\",\"Tag\":\"LukEx\"}","{\"Type\":\"x\",\"Id\":\"0\",\"Key\":\"hit\",\"Tag\":\"HitEx\"}","{\"Type\":\"x\",\"Id\":\"1\",\"Key\":\"eva\",\"Tag\":\"EvaEx\"}","{\"Type\":\"x\",\"Id\":\"2\",\"Key\":\"cri\",\"Tag\":\"CriEx\"}","{\"Type\":\"x\",\"Id\":\"3\",\"Key\":\"cev\",\"Tag\":\"CevEx\"}","{\"Type\":\"x\",\"Id\":\"4\",\"Key\":\"mev\",\"Tag\":\"MevEx\"}","{\"Type\":\"x\",\"Id\":\"5\",\"Key\":\"mrf\",\"Tag\":\"MrfEx\"}","{\"Type\":\"x\",\"Id\":\"6\",\"Key\":\"cnt\",\"Tag\":\"CntEx\"}","{\"Type\":\"x\",\"Id\":\"7\",\"Key\":\"hrg\",\"Tag\":\"HrgEx\"}","{\"Type\":\"x\",\"Id\":\"8\",\"Key\":\"mrg\",\"Tag\":\"MrgEx\"}","{\"Type\":\"x\",\"Id\":\"9\",\"Key\":\"trg\",\"Tag\":\"TrgEx\"}","{\"Type\":\"s\",\"Id\":\"0\",\"Key\":\"tgr\",\"Tag\":\"TgrEx\"}","{\"Type\":\"s\",\"Id\":\"1\",\"Key\":\"grd\",\"Tag\":\"GrdEx\"}","{\"Type\":\"s\",\"Id\":\"2\",\"Key\":\"rec\",\"Tag\":\"RecEx\"}","{\"Type\":\"s\",\"Id\":\"3\",\"Key\":\"pha\",\"Tag\":\"PhaEx\"}","{\"Type\":\"s\",\"Id\":\"4\",\"Key\":\"mcr\",\"Tag\":\"McrEx\"}","{\"Type\":\"s\",\"Id\":\"5\",\"Key\":\"tcr\",\"Tag\":\"TcrEx\"}","{\"Type\":\"s\",\"Id\":\"6\",\"Key\":\"pdr\",\"Tag\":\"PdrEx\"}","{\"Type\":\"s\",\"Id\":\"7\",\"Key\":\"mdr\",\"Tag\":\"MdrEx\"}","{\"Type\":\"s\",\"Id\":\"8\",\"Key\":\"fdr\",\"Tag\":\"FdrEx\"}","{\"Type\":\"s\",\"Id\":\"9\",\"Key\":\"exr\",\"Tag\":\"ExrEx\"}"]
 * @desc パラメータの一覧です。
 * 独自パラメータがあれば、追加も可能です。
 * 
 * @param AlwaysUpdateState
 * @text ステートを常に更新
 * @type boolean
 * @default false
 * @desc 既にかかっているステートでも更新処理を行います。
 * false時も継続ターンの更新は行われます。
 * 
 * @param UpdateType
 * @parent AlwaysUpdateState
 * @text 更新方法
 * @type select
 * @option 0:最新優先 @value 0
 * @option 1:最大優先 @value 1
 * @default 0
 * @desc 最新優先：新しくかけたステートを優先します。
 * 最大優先：効果の大きいほうを優先します。
 * 
 * @param ShowStateMiss
 * @text ステートのミスを表示
 * @type boolean
 * @default false
 * @desc ステート付加が外れた際に、ミスを表示するようにします。
 * ダメージタイプが『なし』のスキルが対象です。
 * 
 * @param SlipOverKill
 * @text スリップダメージ無制限
 * @type boolean
 * @default false
 * @desc 毒などのスリップダメージで現在ＨＰを超える値を有効にします。
 * 
 * @param QuickStateEndSkill
 * @text 終了時スキルを即時化
 * @type boolean
 * @default true
 * @desc <StateEndSkill>によって発動するスキルを速度補正を限界にして実行します。ＣＴＢ用の調整です。
 */
//-----------------------------------------------------------------------------
// Parameter
//-----------------------------------------------------------------------------
/*~struct~Parameter:ja
 * @param Type
 * @text タイプ
 * @type select
 * @option r:通常能力値 @value r
 * @option x:追加能力値 @value x
 * @option s:特殊能力値 @value s
 * @option o:オリジナル @value o
 * @default r
 * @desc パラメータのタイプです。
 * 
 * @param Id
 * @text ＩＤ
 * @type number
 * @desc パラメータの識別番号です。
 * 
 * @param Key
 * @text 識別名
 * @type string
 * @desc パラメータの識別名です。
 * 
 * @param Tag
 * @text タグ名
 * @type string
 * @desc パラメータの変化を指定するタグ名です。
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

const PLUGIN_NAME = "NRP_StateEX";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pParameterList = parseStruct2(parameters["ParameterList"]);
const pAlwaysUpdateState = toBoolean(parameters["AlwaysUpdateState"], false);
const pUpdateType = toNumber(parameters["UpdateType"], 0);
const pShowStateMiss = toBoolean(parameters["ShowStateMiss"], false);
const pSlipOverKill = toBoolean(parameters["SlipOverKill"], false);
const pQuickStateEndSkill = toBoolean(parameters["QuickStateEndSkill"], true);

/**
 * ●効率化のため事前変換
 */
for (const parameter of pParameterList) {
    parameter.type = parameter.Type;
    parameter.id = toNumber(parameter.Id);
    parameter.key = parameter.Key;
    parameter.tag = parameter.Tag;
}

// ----------------------------------------------------------------------------
// パラメータテーブルの作成
// ----------------------------------------------------------------------------

// ※不変なのでここで作成しておく。
const PARAM_TABLE = createStateExTable();

/**
 * ●パラメータテーブルの作成
 */
function createStateExTable() {
    const table = [];
    // 通常能力値
    for (const p of pParameterList) {
        table.push({
            type: p.type,
            id  : p.id,
            name: p.key,
            tag : p.tag
        });
    }
    // その他（※typeやidは参照しないため意味はないです）
    table.push({type: "@", id: 0, name: "regenerateHp", tag: "HrgExValue"});
    table.push({type: "@", id: 1, name: "regenerateMp", tag: "MrgExValue"});
    table.push({type: "@", id: 2, name: "regenerateTp", tag: "TrgExValue"});
    return table;
};

// ----------------------------------------------------------------------------
// Game_BattlerBase
// ----------------------------------------------------------------------------

// 全回復判定フラグ
let mRecoverAllFlg = false;
// 戦闘不能判定フラグ
let mDeadFlg = false;

/**
 * ●全回復
 */
const _Game_BattlerBase_recoverAll = Game_BattlerBase.prototype.recoverAll;
Game_BattlerBase.prototype.recoverAll = function() {
    mRecoverAllFlg = true;
    _Game_BattlerBase_recoverAll.apply(this, arguments);
    mRecoverAllFlg = false;
};

/**
 * ●戦闘不能
 */
const _Game_BattlerBase_die = Game_BattlerBase.prototype.die;
Game_BattlerBase.prototype.die = function() {
    mDeadFlg = true;
    _Game_BattlerBase_die.apply(this, arguments);
    mDeadFlg = false;
};

/**
 * ●ステートの初期化
 */
const _Game_BattlerBase_clearStates = Game_BattlerBase.prototype.clearStates;
Game_BattlerBase.prototype.clearStates = function() {
    // 条件によって保持するステート
    const keepStates = [];

    // 全回復の場合
    if (mRecoverAllFlg) {
        for (let i = 0; i < this._states.length; i++) {
            const stateId = this._states[i];
            // 全回復でも保持するステートがあれば追加
            if ($dataStates[stateId].meta.IgnoreRecoverAll) {
                const stateTurn = this._stateTurns[stateId];
                const stateEx = this.getStateEx(stateId);
                keepStates.push({stateId: stateId, stateTurn: stateTurn, stateEx: stateEx});
            }
        }

    // 戦闘不能の場合
    } else if (mDeadFlg) {
        for (let i = 0; i < this._states.length; i++) {
            const stateId = this._states[i];
            // 戦闘不能でも保持するステートがあれば追加
            if ($dataStates[stateId].meta.IgnoreRecoverDie) {
                const stateTurn = this._stateTurns[stateId];
                const stateEx = this.getStateEx(stateId);
                keepStates.push({stateId: stateId, stateTurn: stateTurn, stateEx: stateEx});
            }
        }
    }

    _Game_BattlerBase_clearStates.apply(this, arguments);

    // 追加機能の管理用の構造体
    // ※this._stateTurnsと同じ要領で実装
    this._statesEx = {};

    // 保持するステートを復旧
    for (const keepState of keepStates) {
        this._states.push(keepState.stateId);
        this._stateTurns[keepState.stateId] = keepState.stateTurn;
        if (keepState.stateEx) {
            this._statesEx[keepState.stateId] = keepState.stateEx;
        }
    }

    // 透明状態は解除
    this._isBattlerInvisible = false;
};

/**
 * ●ステートの消去
 */
const _Game_BattlerBase_eraseState = Game_BattlerBase.prototype.eraseState;
Game_BattlerBase.prototype.eraseState = function(stateId) {
    _Game_BattlerBase_eraseState.apply(this, arguments);

    if (this._statesEx) {
        delete this._statesEx[stateId];
    }

    // 透明ステートを消去した場合
    const invisible = $dataStates[stateId].meta.BattlerInvisible;
    if (invisible) {
        this._isBattlerInvisible = false;
    }
};

/**
 * ●ステートの追加
 */
const _Game_BattlerBase_addNewState = Game_BattlerBase.prototype.addNewState;
Game_BattlerBase.prototype.addNewState = function(stateId) {
    const a = getSkillUser();
    const b = this;
    const meta = $dataStates[stateId].meta;

    // <RemoveState:number>があれば、そのステートを設定
    const metaRemoveState = $dataStates[stateId].meta.RemoveState;
    if (metaRemoveState) {
        // ","区切りに対応
        const removeStates = metaRemoveState.split(",");
        // 対象のステートＩＤを除去していく。
        for (const stateId of removeStates) {
            this.removeState(Number(stateId));
        }
    }

    // ステートを常に更新がオンの場合、現在のステートを消去
    // ※これをやらないと同じステートが重複してしまう。
    if (pAlwaysUpdateState) {
        this.eraseState(stateId);
    }

    // ステート時にＨＰ変更
    const changehp = meta.StateChangeHp;
    if (changehp) {
        const value = eval(changehp);
        const stateDamageSilent = meta.StateDamageSilent;
        if (stateDamageSilent) {
            this.setHp(this.hp + value);
        } else {
            this.gainHp(eval(changehp));
        }
    }

    // ステート時にＭＰ変更
    const changeMp = meta.StateChangeMp;
    if (changeMp) {
        const value = eval(changeMp);
        const stateDamageSilent = meta.StateDamageSilent;
        if (stateDamageSilent) {
            this.setMp(this.mp + value);
        } else {
            this.gainMp(eval(changeMp));
        }
    }

    // ステート時にＴＰ変更
    const changeTp = meta.StateChangeTp;
    if (changeTp) {
        const value = eval(changeTp);
        const stateDamageSilent = meta.StateDamageSilent;
        if (stateDamageSilent) {
            this.setTp(this.tp + value);
        } else {
            this.gainTp(eval(changeTp));
        }
    }
    
    // 旧値を取得
    let oldStateEx = {};
    const tempStateEx = this.getStateEx(stateId);
    if (tempStateEx) {
        // 値を複製
        oldStateEx = {...tempStateEx};
    }

    // 追加のステートデータを定義
    this._statesEx[stateId] = {};
    const newStateEx = this._statesEx[stateId];

    // 各パラメータを設定
    for (const params of PARAM_TABLE) {
        const tagName = params.tag;
        const paramName = params.name;

        // メモ欄に該当パラメータの値が設定されているかどうか？
        const metaValue = meta[tagName];
        if (metaValue) {
            // 数式計算して新しい値を取得
            let newValue = eval(metaValue);

            // 1:最大優先の場合は旧値との比較＆更新を行う
            if (pUpdateType == 1) {
                // 旧値を取得
                let oldValue = 0;
                if (oldStateEx && oldStateEx[paramName]) {
                    oldValue = oldStateEx[paramName].value;
                }

                // 新値が正の場合、かつ旧値のほうが大きいなら優先
                if (newValue > 0 && oldValue > newValue) {
                    newValue = oldValue;

                // 新値が負の場合、かつ旧値のほうが小さいなら優先
                } else if (newValue < 0 && oldValue < newValue) {
                    newValue = oldValue;
                }
            }

            // パラメータ名をキーにして代入
            // ※value値が共有されてしまわないように複製
            newStateEx[paramName] = {...params};
            // この時点で計算結果を代入
            newStateEx[paramName].value = newValue;
        }
    }

    // 透明ステート
    const invisible = meta.BattlerInvisible;
    if (invisible) {
        this._isBattlerInvisible = invisible;
    }

    _Game_BattlerBase_addNewState.apply(this, arguments);
};

/**
 * 【独自】ＥＸステートを取得
 */
Game_BattlerBase.prototype.getStateEx = function(stateId) {
    // 未定義なら初期化
    if (!this._statesEx) {
        this._statesEx = [];
    }
    return this._statesEx[stateId];
};

/**
 * 【独自】全ＥＸステートを取得
 */
Game_BattlerBase.prototype.statesEx = function() {
    const statesEx = [];
    for (const state of this.states()) {
        const stateEx = this.getStateEx(state.id);
        if (stateEx) {
            statesEx.push(stateEx);
        }
    }
    return statesEx;
};

/**
 * ●パラメータ計算
 */
const _Game_BattlerBase_param = Game_BattlerBase.prototype.param;
Game_BattlerBase.prototype.param = function(paramId) {
    // 元の値を取得
    let value = _Game_BattlerBase_param.apply(this, arguments);
    let changeFlg = false;

    // 各補正値があるかどうか？
    for (const stateEx of this.statesEx()) {
        // r:通常能力値が対象
        const exValue = getExValue(stateEx, "r", paramId);
        // 補正値が存在すれば加算
        if (exValue) {
            value += exValue;
            changeFlg = true;
        }
    }

    // 変更があった場合は最大、最小値の調整
    if (changeFlg) {
        const maxValue = this.paramMax(paramId);
        const minValue = this.paramMin(paramId);
        return Math.round(value.clamp(minValue, maxValue));
    }

    // 変更がない場合はそのまま
    return value;
};

/**
 * ●追加能力値の計算
 */
const _Game_BattlerBase_xparam = Game_BattlerBase.prototype.xparam;
Game_BattlerBase.prototype.xparam = function(xparamId) {
    // 元の値を取得
    let value = _Game_BattlerBase_xparam.apply(this, arguments);

    // 各補正値があるかどうか？
    for (const stateEx of this.statesEx()) {
        const exValue = getExValue(stateEx, "x", xparamId);
        // 補正値が存在すれば加算
        if (exValue) {
            value += exValue;
        }
    }
    return value;
};

/**
 * ●特殊能力値の計算
 */
const _Game_BattlerBase_sparam = Game_BattlerBase.prototype.sparam;
Game_BattlerBase.prototype.sparam = function(sparamId) {
    // 元の値を取得
    let value = _Game_BattlerBase_sparam.apply(this, arguments);

    // 各補正値があるかどうか？
    for (const stateEx of this.statesEx()) {
        const exValue = getExValue(stateEx, "s", sparamId);
        // 補正値が存在すれば加算
        if (exValue) {
            value += exValue;
        }
    }
    return value;
};

/**
 * 【独自】当プラグイン独自のパラメータ計算
 */
Game_BattlerBase.prototype.stateExOriginalParam = function(paramId) {
    let value = 0;
    // 各補正値があるかどうか？
    for (const stateEx of this.statesEx()) {
        // r:通常能力値が対象
        const exValue = getExValue(stateEx, "o", paramId);
        // 補正値が存在すれば加算
        if (exValue) {
            value += exValue;
        }
    }
    return value;
};

/**
 * ●補正値を取得
 */
function getExValue(stateEx, type, paramId) {
    // stateExが保有するkeyでループ
    for (const key in stateEx) {
        // keyを元に値を取得
        const exParam = stateEx[key];
        // タイプとIDが一致するもの
        if (exParam.type == type && exParam.id == paramId) {
            // 補正値を返す
            return exParam.value || 0;
        }
    }
    return 0;
}

// ----------------------------------------------------------------------------
// Game_Battler
// ----------------------------------------------------------------------------

/**
 * ●ＨＰ再生
 */
const _Game_Battler_regenerateHp = Game_Battler.prototype.regenerateHp;
Game_Battler.prototype.regenerateHp = function() {
    // 追加値を取得
    let exValue = 0;

    for (const stateEx of this.statesEx()) {
        // ＨＰ再生値があれば加算
        if (stateEx.regenerateHp && stateEx.regenerateHp.value) {
            exValue += stateEx.regenerateHp.value;
        }
    }

    // 追加値がある場合は通常の数式に加算
    if (exValue != 0) {
        const minRecover = -this.maxSlipDamage();
        const value = Math.max(Math.floor(this.mhp * this.hrg + exValue), minRecover);
        if (value !== 0) {
            this.gainHp(value);
        }
        return;
    }

    // ない場合は元のまま
    _Game_Battler_regenerateHp.apply(this, arguments);
};

/**
 * ●ＭＰ再生
 */
const _Game_Battler_regenerateMp = Game_Battler.prototype.regenerateMp;
Game_Battler.prototype.regenerateMp = function() {
    // 追加値を取得
    let exValue = 0;

    for (const stateEx of this.statesEx()) {
        // ＭＰ再生値があれば加算
        if (stateEx.regenerateMp && stateEx.regenerateMp.value) {
            exValue += stateEx.regenerateMp.value;
        }
    }

    // 追加値がある場合は通常の数式に加算
    if (exValue != 0) {
        const value = Math.floor(this.mmp * this.mrg + exValue);
        if (value !== 0) {
            this.gainMp(value);
        }
        return;
    }

    // ない場合は元のまま
    _Game_Battler_regenerateMp.apply(this, arguments);
};

/**
 * ●ＴＰ再生
 */
const _Game_Battler_regenerateTp = Game_Battler.prototype.regenerateTp;
Game_Battler.prototype.regenerateTp = function() {
    // 追加値を取得
    let exValue = 0;

    for (const stateEx of this.statesEx()) {
        // ＴＰ再生値があれば加算
        if (stateEx.regenerateTp && stateEx.regenerateTp.value) {
            exValue += stateEx.regenerateTp.value;
        }
    }

    // 追加値がある場合は通常の数式に加算
    if (exValue != 0) {
        const value = Math.floor(100 * this.trg + exValue);
        this.gainSilentTp(value);
        return;
    }

    // ない場合は元のまま
    _Game_Battler_regenerateTp.apply(this, arguments);
};

// スリップダメージ無制限
if (pSlipOverKill) {
    /**
     * 【上書】スリップダメージの最大値
     */
    Game_Battler.prototype.maxSlipDamage = function() {
        return $dataSystem.optSlipDeath ? Infinity : Math.max(this.hp - 1, 0);
    };
}

// ----------------------------------------------------------------------------
// ステート解除時にスキル発動
// ----------------------------------------------------------------------------

// ターン経過による解除を判定するフラグ
let mIsRemoveStatesAuto = false;
// ステート終了スキルのモーション調整
let mStateEndSkillAdjustMotion = false;
// ターン経過によるステート状況表示のクリアを抑制
let mdisplayAutoAffectedStatusNotClear = false;

/**
 * ●ステートのターン経過による解除
 */
const _Game_Battler_removeStatesAuto = Game_Battler.prototype.removeStatesAuto;
Game_Battler.prototype.removeStatesAuto = function(timing) {
    mIsRemoveStatesAuto = true;
    _Game_Battler_removeStatesAuto.apply(this, arguments);
    mIsRemoveStatesAuto = false;
};

/**
 * ●ステートの解除
 */
const _Game_Battler_removeState = Game_Battler.prototype.removeState;
Game_Battler.prototype.removeState = function(stateId) {
    _Game_Battler_removeState.apply(this, arguments);

    // ターン経過でステートが解除された場合
    if (mIsRemoveStatesAuto) {
        const stateEndSkill = $dataStates[stateId].meta.StateEndSkill;
        if (stateEndSkill) {
            const a = this;
            const skillId = eval(stateEndSkill);
            const action = new Game_Action(this, true);
            action.setSkill(skillId);

            // 戦闘行動の強制を実行
            goStateSkill(this, skillId);
        }
    }
};

// ステート終了スキルの実行判定用のＩＤ
let mEndStateSkillId = null;

/**
 * ●ステート終了時のスキルを実行
 */
function goStateSkill(subject, skillId) {
    // 戦闘不能時のモーション調整
    if (subject.isDead()) {
        mStateEndSkillAdjustMotion = true;
    }

    // 戦闘行動の強制を実行
    // ※対象は-1:ランダム
    subject.stateEndForceAction(skillId, -1);
    BattleManager.forceAction(subject);
    // BattleManager.processForcedAction();

    // ステート終了スキルの実行判定用ＩＤ
    mEndStateSkillId = skillId;

    // 【ＭＶ】強制実行フラグを解除
    // ※強制フラグが立っていると、ステートのターン経過が行われないため。
    if (BattleManager.isForcedTurn && BattleManager.isForcedTurn()) {
        BattleManager._turnForced = false;
    }
    
    return true;
}

/**
 * ●速度補正の計算
 */
const _Game_Battler_makeSpeed = Game_Battler.prototype.makeSpeed;
Game_Battler.prototype.makeSpeed = function() {
    // ステート終了時のスキルなら速度補正は無限として計算
    // ※さもないとＣＴＢにおいて、二回分の行動時間を消費してしまう。
    if (pQuickStateEndSkill && mEndStateSkillId) {
        this._speed = Infinity;
        return;
    }
    _Game_Battler_makeSpeed.apply(this, arguments);
};

/**
 * ●行動終了時
 */
const _Game_Battler_onAllActionsEnd = Game_Battler.prototype.onAllActionsEnd;
Game_Battler.prototype.onAllActionsEnd = function() {
    const action = BattleManager._action;

    // ステート終了時のスキルなら終了処理を行わない。
    if (mEndStateSkillId && action) {
        if (action.item().id == mEndStateSkillId) {
            mEndStateSkillId = null;
            return;
        }
    }

    _Game_Battler_onAllActionsEnd.apply(this, arguments);
};

/**
 * 【独自】ステート終了スキルを実行する。
 */
Game_Battler.prototype.stateEndForceAction = function(skillId, targetIndex) {
    const action = new Game_Action(this, true);
    action.setSkill(skillId);

    if (targetIndex === -2) {
        action.setTarget(this._lastTargetIndex);
    } else if (targetIndex === -1) {
        action.decideRandomTarget();
    } else {
        action.setTarget(targetIndex);
    }

    // スキルを次のアクションとして実行するため、
    // push（末尾）ではなくunshift（先頭）で追加
    this._actions.unshift(action);

    // ログウィンドウをクリア
    BattleManager._logWindow.clear();

    // 次のログウィンドウのクリアを抑制するためのフラグ
    // ※これをしないと、タイミングの関係でスキル名の表示が消えてしまう。
    mdisplayAutoAffectedStatusNotClear = true;

    // アクター位置の自動設定を禁止解除（DynamicMotion）
    BattleManager._noUpdateTargetPosition = false;
};

/**
 * ●モーション更新
 */
const _Sprite_Actor_refreshMotion = Sprite_Actor.prototype.refreshMotion;
Sprite_Actor.prototype.refreshMotion = function() {
    if (mStateEndSkillAdjustMotion) {
        const actor = this._actor;
        if (actor) {
            const stateMotion = actor.stateMotionIndex();
            // 3:戦闘不能時はモーションを更新しない。
            // ※戦闘不能状態で発動するリレイズ的なステートを想定
            // 　瞬時にdeadモーションを取らせても一瞬だけ立ち上がる問題に対処
            if (stateMotion === 3) {
                mStateEndSkillAdjustMotion = false;
                return;
            }
        }
    }

    _Sprite_Actor_refreshMotion.apply(this, arguments);
}

/**
 * ●アクション終了時
 */
const _BattleManager_endAction = BattleManager.endAction;
BattleManager.endAction = function() {
    // フラグを解除
    mStateEndSkillAdjustMotion = false;
    mdisplayAutoAffectedStatusNotClear = false;
    _BattleManager_endAction.apply(this, arguments);
};

/**
 * ●ターン開始時
 */
const _BattleManager_startTurn = BattleManager.startTurn;
BattleManager.startTurn = function() {
    // フラグを解除
    mEndStateSkillId = null;
    _BattleManager_startTurn.apply(this, arguments);
};

/**
 * ●ターン終了時
 */
const _BattleManager_endTurn = BattleManager.endTurn;
BattleManager.endTurn = function() {
    // フラグを解除
    mEndStateSkillId = null;
    _BattleManager_endTurn.apply(this, arguments);
};

/**
 * ●ターン経過によるステート状況表示
 */
const _Window_BattleLog_displayAutoAffectedStatus = Window_BattleLog.prototype.displayAutoAffectedStatus;
Window_BattleLog.prototype.displayAutoAffectedStatus = function(target) {
    _Window_BattleLog_displayAutoAffectedStatus.apply(this, arguments);

    // メッセージをクリアしない。
    if (mdisplayAutoAffectedStatusNotClear) {
        // 末尾のclear処理を取得
        const clearMethod = this._methods.reverse().find(method => method.name == "clear");
        // 取得したclear処理をフィルターで除去
        this._methods = this._methods.filter(method => method != clearMethod);
    }
};

// ----------------------------------------------------------------------------
// 死亡時にもかかるステート
// ----------------------------------------------------------------------------

// 生存判定偽装用
let mDummyAlive = false;

/**
 * ●ステートを付加できるか？
 */
const _Game_Battler_isStateAddable = Game_Battler.prototype.isStateAddable;
Game_Battler.prototype.isStateAddable = function(stateId) {
    // 戦闘不能時も有効なステートなら、生存判定を偽装してステートを有効にする。
    if ($dataStates[stateId].meta.IgnoreRecoverDie) {
        mDummyAlive = true;
    }
    const ret = _Game_Battler_isStateAddable.apply(this, arguments);
    mDummyAlive = false;
    return ret;
};

/**
 * ●生存判定
 */
const _Game_BattlerBase_isAlive = Game_BattlerBase.prototype.isAlive;
Game_BattlerBase.prototype.isAlive = function() {
    if (mDummyAlive) {
        return true;
    }
    return _Game_BattlerBase_isAlive.apply(this, arguments);
};

// ----------------------------------------------------------------------------
// 全滅判定ステート
// ----------------------------------------------------------------------------

// 全滅ステート判定フラグ
let mCheckDefeatState = false;

/**
 * ●報酬の作成
 */
const _BattleManager_makeRewards = BattleManager.makeRewards;
BattleManager.makeRewards = function() {
    mCheckDefeatState = true;
    const ret = _BattleManager_makeRewards.apply(this, arguments);
    mCheckDefeatState = false;
    return ret;
};

/**
 * 【独自】全滅判定ステートかどうか？
 */
Game_BattlerBase.prototype.isDefeatState = function() {
    if (this.isDead()) {
        return true;
    }
    if (this.isAppeared() && this._states.some(stateId => $dataStates[stateId].meta.DefeatState)) {
        return true;
    }
    return false;
};

/**
 * ●全滅判定
 */
const _Game_Unit_isAllDead = Game_Unit.prototype.isAllDead;
Game_Unit.prototype.isAllDead = function() {
    const ret = _Game_Unit_isAllDead.apply(this, arguments);
    if (ret) {
        return ret;
    }

    // 全員が全滅ステートの対象なら全滅として判定
    if (this.surviveMembers().length == 0) {
        return true;
    }
    return false;
};

/**
 * ●戦闘不能メンバー
 */
const _Game_Unit_deadMembers = Game_Unit.prototype.deadMembers;
Game_Unit.prototype.deadMembers = function() {
    // 全滅ステート判定フラグがオンの場合のみメンバーを拡張する。
    if (mCheckDefeatState) {
        return this.members().filter(member => member.isDefeatState());
    }
    return _Game_Unit_deadMembers.apply(this, arguments);
};

/**
 * 【独自】全滅対象ではないメンバー
 */
Game_Unit.prototype.surviveMembers = function() {
    return this.aliveMembers().filter(member => !member.isDefeatState());
};

// ----------------------------------------------------------------------------
// ステートを常に更新
// ----------------------------------------------------------------------------

if (pAlwaysUpdateState) {
    let mIsStateAffectedFalse = false;

    /**
     * ●ステートの追加
     */
    const _Game_Battler_addState = Game_Battler.prototype.addState;
    Game_Battler.prototype.addState = function(stateId) {
        // 死亡時は無限ループとなるので対象外。
        if (this.deathStateId() == stateId) {
            _Game_Battler_addState.apply(this, arguments);
            return;
        }

        // this.isStateAffected(stateId)を強制falseにする。
        mIsStateAffectedFalse = true;
        _Game_Battler_addState.apply(this, arguments);
        mIsStateAffectedFalse = false;
    };

    /**
     * ●ステートにかかっているかどうか？
     * ※通常はこの処理によって、既にかかっているステートが重ねられないようになっている。
     */
    const _Game_BattlerBase_isStateAffected = Game_BattlerBase.prototype.isStateAffected;
    Game_BattlerBase.prototype.isStateAffected = function(stateId) {
        // 強制的にfalseとすることでステートの重ねを有効に
        // ※ただし、死亡は無限ループとなるので対象外。
        if (mIsStateAffectedFalse) {
            mIsStateAffectedFalse = false;
            if (this.deathStateId() != stateId) {
                return false;
            }
        }
        return _Game_BattlerBase_isStateAffected.apply(this, arguments);
    };
}

// ----------------------------------------------------------------------------
// ステートのミスを表示
// ----------------------------------------------------------------------------

if (pShowStateMiss) {
    const _Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function(target) {
        _Game_Action_apply.apply(this, arguments);

        const result = target.result();

        // スキルが命中かつダメージタイプがなし
        if (result.isHit() && this.item().damage.type == 0) {
            // ステート付加が最低一つ存在している。
            if (this.item().effects.some(effect => effect.code == Game_Action.EFFECT_ADD_STATE)) {
                // かつ、失敗した。
                if (!result.success) {
                    result.missed = true;
                }
            }
        }
    };
}

// ----------------------------------------------------------------------------
// 自動解除を行動開始時に変更
// ----------------------------------------------------------------------------

/**
 * ●行動開始時
 */
const _Game_Actor_performActionStart = Game_Actor.prototype.performActionStart;
Game_Actor.prototype.performActionStart = function(action) {
    _Game_Actor_performActionStart.apply(this, arguments);
    this.removeStatesAutoActionStart();
};

/**
 * ●行動開始時
 * ※this.requestEffect("whiten");より後にステート解除したいので、
 * 　Game_BattlerではなくGame_Enemyで処理している。
 */
const _Game_Enemy_performActionStart = Game_Enemy.prototype.performActionStart;
Game_Enemy.prototype.performActionStart = function(action) {
    _Game_Enemy_performActionStart.apply(this, arguments);
    this.removeStatesAutoActionStart();
};

/**
 * 【独自】行動開始時のステート消去
 */
Game_Battler.prototype.removeStatesAutoActionStart = function() {
    // ＣＴＢなら１ターン以下を指定
    // ※ターン経過の仕組みが異なるため、１ターンのズレが生じるのでその調整
    const removeTurn = BattleManager._isCtb ? 1 : 0;

    for (const state of this.states()) {
        // 自動解除が行動開始時の場合
        if (state.meta.AutoRemovalActionStart) {
            if (this._stateTurns[state.id] <= removeTurn && state.autoRemovalTiming === 1) {
                // ステート解除
                this.removeState(state.id);
            }
        }
    }
};

// ----------------------------------------------------------------------------
// 自動解除をコマンド入力開始時に変更
// ----------------------------------------------------------------------------

/**
 * ●コマンド入力開始
 */
const _BattleManager_startInput = BattleManager.startInput
BattleManager.startInput = function() {
    _BattleManager_startInput.apply(this, arguments);

    // 行動主体が取得できない場合は無効
    const subject = this._subject;
    if (!subject) {
        return;
    }

    // ＣＴＢなら１ターン以下を指定
    // ※ターン経過の仕組みが異なるため、１ターンのズレが生じるのでその調整
    const removeTurn = BattleManager._isCtb ? 1 : 0;

    for (const state of subject.states()) {
        // 自動解除がコマンド開始時の場合
        if (state.meta.AutoRemovalCommandStart) {
            if (subject._stateTurns[state.id] <= removeTurn && state.autoRemovalTiming === 1) {
                // ステート解除
                subject.removeState(state.id);
            }
        }
    }
};

// ----------------------------------------------------------------------------
// 透明状態
// ----------------------------------------------------------------------------

/**
 * ●表示状態更新
 */
const _Sprite_Battler_updateVisibility = Sprite_Battler.prototype.updateVisibility;
Sprite_Battler.prototype.updateVisibility = function() {
    _Sprite_Battler_updateVisibility.apply(this, arguments);

    // 透明状態を設定
    if (this._battler && this._battler._isBattlerInvisible) {
        this.visible = false;
    }
};

/**
 * ●エフェクトのリクエスト
 */
const _Game_Battler_requestEffect = Game_Battler.prototype.requestEffect;
Game_Battler.prototype.requestEffect = function(effectType) {
    // 透明時は敵の行動開始時のエフェクトを禁止する。
    // ※そうしないと一瞬表示されてしまう。
    if (this._isBattlerInvisible && effectType == "whiten") {
        return;
    }
    _Game_Battler_requestEffect.apply(this, arguments);
};

/**
 * ●更新処理
 */
const _Sprite_Battler_update = Sprite_Battler.prototype.update;
Sprite_Battler.prototype.update = function() {
    // 透明状態の間はopacityの操作を無効化
    // ※DynamicMotionによる設定値を保持するため。
    if (this._battler && this._battler._isBattlerInvisible) {
        const keepOpacity = this.opacity;
        _Sprite_Battler_update.apply(this, arguments);
        this.opacity = keepOpacity;
        return;
    }
    _Sprite_Battler_update.apply(this, arguments);
};

// ----------------------------------------------------------------------------
// 共通処理
// ----------------------------------------------------------------------------

/**
 * ●スキルの使用者を取得
 */
function getSkillUser() {
    // 戦闘時またはメニュー画面で選択中のアクター
    return BattleManager._subject || $gameParty.menuActor();
}

})();
