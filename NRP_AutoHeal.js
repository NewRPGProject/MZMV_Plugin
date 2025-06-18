//=============================================================================
// NRP_AutoHeal.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.03 It enables the "Auto Heal" command.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/480069638.html
 * 
 * @help It enables the "Auto Heal" command.
 * When you run it from the menu screen, etc.,
 * your party members will automatically use the skill to heal.
 * 
 * -------------------------------------------------------------------
 * [Main Specifications]
 * -------------------------------------------------------------------
 * - The "Auto Heal" command can be added to the menu.
 * - It is also possible to call it from a plug-in command.
 * - Can also cure registered states.
 *   (In the initial state, this only applies to dead and poison)
 * - Automatically selects skills
 *   that consume as much energy as possible.
 * - You can change the conditions that determine
 *   who can use the healing skill.
 * 　For example, those with high MP, those with efficient skills, etc.
 * - You can also set it to heal up to XX% of your maximum HP.
 * - You can choose how the message is displayed.
 * - You can choose whether or not to include reserve members.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Turning on this plugin will add "Auto Heal" command
 * to the menu commands.
 * It is also possible to call it from the plugin command
 * without displaying it in the menu.
 * You can also make finer adjustments than the plugin parameters.
 * 
 * -------------------------------------------------------------------
 * [Note of Skills]
 * -------------------------------------------------------------------
 * <ExceptAutoHeal>
 * Excludes the specified skill from "Auto Heal".
 * 
 * -------------------------------------------------------------------
 * [Plugin Command (MZ)]
 * -------------------------------------------------------------------
 * You can execute "Auto Heal" from the event.
 * "TargetHpRate", "SuccessSwitch",
 * and "FailureSwitch" can be specified.
 * The details are the same as for the plugin parameters,
 * so we will skip them.
 * 
 * -------------------------------------------------------------------
 * [Plugin Command (MV)]
 * -------------------------------------------------------------------
 * > nrp.autoHeal.start
 * You can execute "Auto Heal" from the event.
 * You can also specify options by specifying the following in advance.
 * 
 * > nrp.autoHeal.targetHpRate XX
 * If the HP is less than the specified value %,
 * it will perform a healing.
 * 
 * > nrp.autoHeal.successSwitch X
 * When healing is successful,
 * the switch with the specified number will be turned on.
 * 
 * > nrp.autoHeal.failureSwitch X
 * When healing is failed,
 * the switch with the specified number will be turned on.
 * 
 * The following is a running example of everything together.
 * ※Call it line by line.
 * 
 * nrp.autoHeal.targetHpRate 90
 * nrp.autoHeal.successSwitch 1
 * nrp.autoHeal.failureSwitch 2
 * nrp.autoHeal.start
 * 
 * -------------------------------------------------------------------
 * [About Displaying Messages]
 * -------------------------------------------------------------------
 * When "Auto Heal" is performed, the result is displayed as a message.
 * However, according to the RPG Maker specifications,
 * it is not possible to display messages on the menu screen.
 * Since this is a forced realization,
 * there is a possibility of conflicts and other problems.
 * In this case, please set the menu to close
 * after "Auto Heal" or turn off the message display.
 * 
 * Also, only when closing the menu, the common event can be called.
 * Please use this function for performance.
 * 
 * -------------------------------------------------------------------
 * [Algorithm Of "Auto Heal"]
 * -------------------------------------------------------------------
 * 1. Find the target with the lowest percentage of HP.
 * 2. Determine the user of the healing skill according to the settings.
 * 3. Find the most efficient skill for the target.
 *    ※The skill with the largest (healing amount / consumption).
 * 4. Execute the healing.
 * 5. Repeat the above.
 *    The process ends when no one's HP is reduced
 *    or no one can use the skill.
 * 
 * -------------------------------------------------------------------
 * [Other Detailed Specifications]
 * -------------------------------------------------------------------
 * - Only skills with the type "HP Recover" are targeted for healing.
 * 
 * - Also, the calculation of the efficiency is done by a formula.
 * 　Even the amount of healing
 *   from the use effect is not taken into account.
 * 
 * - MP and TP are treated the same.
 * 　In other words, if the amount of healing is the same,
 *   the efficiency of a skill that consumes 10 MP
 *   and a skill that consumes 10 TP are considered equal.
 * 
 * - To calculate the amount of healing, run the skill formula internally.
 * 　Note that if you write the actual process inside the formula,
 *   it will also be executed.
 * 
 * - I do not guarantee complete efficiency.
 * 　It is not very efficient, especially when it comes to curing states.
 * 　For example, I did not calculate the difference in efficiency
 *   between a skill that can cure multiple states
 *   and a skill that can only cure one state.
 * 　It was too complicated and the author gave up on it.
 * 
 * - I don't think there are many,
 *   but recovery skills with random targets are not covered.
 * 　I can' t calculate the result, so I can' t help you.
 * 
 * For more information, please see below.
 * http://newrpg.seesaa.net/article/480069638.html
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
 * @param <Menu Command>
 * @desc This item is used to display the "Auto Heal" menu command.
 * 
 * @param ShowMenuCommand
 * @parent <Menu Command>
 * @type boolean
 * @default true
 * @desc Add the menu command "Auto Heal".
 * 
 * @param ShowMenuCommandPosition
 * @parent <Menu Command>
 * @type number
 * @default 5
 * @desc The position to insert the "Auto Heal" menu command.
 * 0 will be the first.
 * 
 * @param AutoHealName
 * @parent <Menu Command>
 * @type text
 * @default Auto Heal
 * @desc Set the display name for "Auto Heal".
 * 
 * @param AutoHealSymbol
 * @text [Advanced]AutoHealSymbol
 * @parent <Menu Command>
 * @type text
 * @default autoheal
 * @desc Set the "Auto Heal" symbol.
 * This value can be used when working with other plugins.
 * 
 * @param <Heal Setting>
 * @desc This item is related to the settings for the healing process.
 * 
 * @param CureStates
 * @parent <Heal Setting>
 * @type state[]
 * @default ["1","4"]
 * @desc This is a list of states that are targeted for treatment.
 * It takes precedence over HP recovery.
 * 
 * @param TargetHpRate
 * @parent <Heal Setting>
 * @type text
 * @default 100
 * @desc If the actor's HP% is less than this value, the actor will recover.
 * 
 * @param TargetHpRateVariable
 * @parent <Heal Setting>
 * @type variable
 * @desc It will recover if the value is less than the value of the specified variable. This setting has priority.
 * 
 * @param UserPriority
 * @parent <Heal Setting>
 * @type select
 * @option Remaining MP @value Mp
 * @option Back Of The Line @value Back
 * @option Low Cost @value Cost
 * @option Balance(Remaining MP + Low Cost) @value Balance
 * @default Balance
 * @desc This condition determines the priority of the user of the healing skill.
 * 
 * @param UseReserveMembers
 * @parent <Heal Setting>
 * @type boolean
 * @default false
 * @desc Even reserve members who do not participate in battle will use their healing skills.
 * 
 * @param TargetReserveMembers
 * @parent <Heal Setting>
 * @type boolean
 * @default false
 * @desc Reserve members who do not participate in battle are also subject to healing.
 * 
 * @param <Message>
 * @desc Message related items.
 * 
 * @param MessageType
 * @parent <Message>
 * @type select
 * @option 0:None @value 0
 * @option 1:Simple @value 1
 * @option 2:Displays Skill Usage @value 2
 * @option 3:Displays Skill Usage & Result @value 3
 * @default 3
 * @desc Sets the message display method.
 * The message in case of failure is the same in both cases.
 * 
 * @param MessageShowFast
 * @parent <Message>
 * @type boolean
 * @default true
 * @desc Instant message for skill usage and results.
 * 
 * @param MessageBackgroundType
 * @parent <Message>
 * @type select
 * @option Normal @value 0
 * @option Dimmer @value 1
 * @option Transparency @value 2
 * @default 0
 * @desc Message window background type.
 * 
 * @param MessageSuccess
 * @parent <Message>
 * @type text
 * @default You're all recovered!
 * @desc This is the message upon successful healing.
 * Only displayed when using "1:Simple".
 * 
 * @param MessageUnnecessary
 * @parent <Message>
 * @type text
 * @default You have no need for recovery!
 * @desc The message when healing is not required.
 * 
 * @param MessageFailure
 * @parent <Message>
 * @type text
 * @default You can't recover!
 * @desc The message when the healing process fails.
 * 
 * @param MessageWait
 * @parent <Message>
 * @type boolean
 * @default true
 * @desc Wait for the message to be processed until it is finished.
 * 
 * @param <Sound>
 * @desc This is an item related to sound effects.
 * 
 * @param SoundSuccess
 * @parent <Sound>
 * @type file
 * @dir audio/se
 * @default Recovery
 * @desc The sound effect that is played when you successfully recover.
 * 
 * @param SoundFailure
 * @parent <Sound>
 * @type file
 * @dir audio/se
 * @default Buzzer1
 * @desc The sound effect that is played when recovery fails.
 * 
 * @param <Close Menu>
 * @desc This item is related to closing the menu after "Auto Heal".
 * 
 * @param CloseMenu
 * @parent <Close Menu>
 * @type boolean
 * @default false
 * @desc Close the menu after "Auto Heal".
 * 
 * @param SuccessSwitch
 * @parent <Close Menu>
 * @type switch
 * @desc A switch that turns on when successful.
 * Can be used for flash and animation.
 * 
 * @param FailureSwitch
 * @parent <Close Menu>
 * @type switch
 * @desc A switch that turns on when failed.
 * 
 * @------------------------------------------------------------------
 * @ Plugin Commands
 * @------------------------------------------------------------------
 * 
 * @command CallAutoHeal
 * @desc Execute "Auto Heal".
 * 
 * @arg TargetHpRate
 * @desc If the actor's HP% is less than this value, the actor will recover.
 * @type number
 * @max 100
 * 
 * @arg SuccessSwitch
 * @desc A switch that turns on when successful.
 * Can be used for flash and animation.
 * @type switch
 * 
 * @arg FailureSwitch
 * @desc A switch that turns on when failed.
 * @type switch
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.03 自動回復コマンド（まんたん）を実現
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/480069638.html
 *
 * @help 自動回復コマンドを実現します。
 * いわゆるドラクエのまんたんコマンドです。
 * メニュー画面などから実行すると、
 * パーティメンバーがスキルを自動的に使用して回復してくれます。
 * 
 * -------------------------------------------------------------------
 * ■主な仕様
 * -------------------------------------------------------------------
 * ・メニューに自動回復コマンドを追加。
 * ・また、プラグインコマンドからの呼び出しも可能。
 * ・登録したステートも自動で治療。
 * 　（初期状態では戦闘不能と毒のみ対象）
 * ・なるべく消費効率の良いスキルを自動で選択。
 * ・回復スキルの使用者を決定する条件を変更可能。
 * 　例えば、ＭＰが高い者、効率の良いスキルを持つ者など。
 * ・最大ＨＰのＸＸ％まで回復するような設定も可能。
 * 　（いわゆる『ほぼまんたん』）
 * ・メッセージの表示方法を選択可。
 * ・控えメンバーを対象に含めるかを選択可。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * プラグインをオンにすれば、
 * メニューコマンドに自動回復コマンドが追加されます。
 * メニューに表示せず、プラグインコマンドから呼び出すことも可能です。
 * また、プラグインパラメータより細かい調整が可能です。
 * 
 * -------------------------------------------------------------------
 * ■メモ欄（スキル）
 * -------------------------------------------------------------------
 * <ExceptAutoHeal>
 * 指定したスキルを自動回復の使用対象から除きます。
 * 
 * -------------------------------------------------------------------
 * ■プラグインコマンド（ＭＺ）
 * -------------------------------------------------------------------
 * イベント上から自動回復を実行できます。
 * 『対象とするＨＰ％』『成功時のスイッチ』『失敗時のスイッチ』
 * を指定可能です。
 * 内容はプラグインパラメータと同一のため割愛します。
 * 
 * -------------------------------------------------------------------
 * ■プラグインコマンド（ＭＶ）
 * -------------------------------------------------------------------
 * > nrp.autoHeal.start
 * 自動回復を実行します。
 * また、以下を事前に指定すればオプションも指定可能です。
 * 
 * > nrp.autoHeal.targetHpRate XX
 * ＨＰが指定した数値％以下ならば、回復を実行します。
 * 
 * > nrp.autoHeal.successSwitch X
 * 回復成功時、指定した番号のスイッチをオンにします。
 * 
 * > nrp.autoHeal.failureSwitch X
 * 回復失敗時、指定した番号のスイッチをオンにします。
 * 
 * 以下は全てをまとめた実行例です。
 * ※一行ずつ呼び出してください。
 * 
 * nrp.autoHeal.targetHpRate 90
 * nrp.autoHeal.successSwitch 1
 * nrp.autoHeal.failureSwitch 2
 * nrp.autoHeal.start
 * 
 * -------------------------------------------------------------------
 * ■メッセージの表示について
 * -------------------------------------------------------------------
 * 自動回復を行った際、結果をメッセージで表示します。
 * ただし、本来ツクールの仕様ではメニュー画面でのメッセージ表示はできません。
 * 色々と無理矢理なので、競合などの問題が発生する可能性もあります。
 * その際は、自動回復後にメニューを閉じる設定にするか、
 * メッセージ表示をオフにしてください。
 * 
 * また、メニューを閉じる場合のみ、コモンイベントの呼出も可能です。
 * 演出などにご利用ください。
 * 
 * -------------------------------------------------------------------
 * ■自動回復のアルゴリズム
 * -------------------------------------------------------------------
 * １．最もＨＰの割合が減っている対象者を求める。
 * ２．設定に従って、回復スキルの使用者を確定。
 * ３．対象者に対して、最も効率の良いスキルを求める。
 * 　　※（回復量／消費）が最大のスキル。
 * ４．回復実行。
 * ５．上記を繰り返し。
 * 　　誰もＨＰが減っていないか、誰もスキルを使用できなくなれば終了。
 * 
 * -------------------------------------------------------------------
 * ■その他、細かい仕様
 * -------------------------------------------------------------------
 * ・回復の対象はタイプが『ＨＰ回復』のスキルのみです。
 * 
 * ・また、効果の計算は計算式で行います。
 * 　使用効果での回復量までは考慮していません。
 * 
 * ・ＭＰとＴＰは同列に扱います。
 * 　つまり、回復量が同じなら、消費ＭＰが１０のスキルと
 * 　消費ＴＰが１０のスキルの効率は同等とみなします。
 * 
 * ・回復量を求めるため、内部的にスキルの計算式を実行します。
 * 　計算式内に実処理を書くと、それも実行されるので注意です。
 * 
 * ・完全な効率化を保証するものではありません。
 * 　特にステートの治療については、あまり効率化されていません。
 * 　例えば、複数ステートを治療できるスキルと、一つのステートしか、
 * 　治療できないスキルの効率の差などは計算していません。
 * 　複雑すぎて作者が諦めました。
 * 
 * ・あまりないと思いますが、対象がランダムの回復スキルは対象外です。
 * 　結果を計算できないのでどうしようもありません。
 * 
 * その他、詳細は以下をご覧ください。
 * http://newrpg.seesaa.net/article/480069638.html
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
 * @param <Menu Command>
 * @text ＜メニューコマンド関連＞
 * @desc メニューコマンドに自動回復を表示する際の関連項目です。
 * 
 * @param ShowMenuCommand
 * @text メニューコマンドに表示
 * @parent <Menu Command>
 * @type boolean
 * @default true
 * @desc メニューコマンドに自動回復を追加します。
 * 
 * @param ShowMenuCommandPosition
 * @text メニューコマンド挿入位置
 * @parent <Menu Command>
 * @type number
 * @default 5
 * @desc メニューコマンドに自動回復を挿入する位置です。
 * 0が先頭になります。
 * 
 * @param AutoHealName
 * @text 自動回復表示名
 * @parent <Menu Command>
 * @type text
 * @default 自動回復
 * @desc 自動回復の表示コマンド名を設定します。
 * 
 * @param AutoHealSymbol
 * @text [上級]自動回復記号
 * @parent <Menu Command>
 * @type text
 * @default autoheal
 * @desc 自動回復の記号を設定します。
 * この値は他のプラグインと連携する際に使用できます。
 * 
 * @param <Heal Setting>
 * @text ＜回復設定関連＞
 * @desc 回復実行時の設定に関する項目です。
 * 
 * @param CureStates
 * @text 治療するステート
 * @parent <Heal Setting>
 * @type state[]
 * @default ["1","4"]
 * @desc 治療の対象とするステートの一覧です。
 * ＨＰの回復より優先されます。
 * 
 * @param TargetHpRate
 * @text 対象とするＨＰ％
 * @parent <Heal Setting>
 * @type text
 * @default 100
 * @desc ＨＰ％がこの数値未満の場合に回復対象とします。
 * 初期値は100。少しでも減っていれば回復します。
 * 
 * @param TargetHpRateVariable
 * @text 対象ＨＰ％を変数指定
 * @parent <Heal Setting>
 * @type variable
 * @desc 指定した変数の値未満の場合に回復対象とします。
 * こちらの設定が優先されます。
 * 
 * @param UserPriority
 * @text 使用者優先順位
 * @parent <Heal Setting>
 * @type select
 * @option 残ＭＰ優先 @value Mp
 * @option 後列優先 @value Back
 * @option 低消費優先 @value Cost
 * @option バランス（残ＭＰ＋低消費） @value Balance
 * @default Balance
 * @desc 回復スキルの使用者の優先順位を決める条件です。
 * 初期状態では残ＭＰと消費をバランス良く配分します。
 * 
 * @param UseReserveMembers
 * @text 控えメンバーも使用者に
 * @parent <Heal Setting>
 * @type boolean
 * @default false
 * @desc 戦闘に参加しない控えメンバーも回復スキルを使用します。
 * 
 * @param TargetReserveMembers
 * @text 控えメンバーも対象に
 * @parent <Heal Setting>
 * @type boolean
 * @default false
 * @desc 戦闘に参加しない控えメンバーも回復の対象とします。
 * 
 * @param <Message>
 * @text ＜メッセージ関連＞
 * @desc メッセージ関連の項目です。
 * 
 * @param MessageType
 * @text メッセージの表示方式
 * @parent <Message>
 * @type select
 * @option 0:表示しない @value 0
 * @option 1:簡易表示 @value 1
 * @option 2:スキルの使用状況を表示 @value 2
 * @option 3:スキルの使用結果も表示 @value 3
 * @default 3
 * @desc メッセージの表示方式を設定します。
 * なお、失敗時のメッセージはいずれも同じです。
 * 
 * @param MessageShowFast
 * @text メッセージの瞬間表示
 * @parent <Message>
 * @type boolean
 * @default true
 * @desc スキルの使用状況、結果を表示する際のメッセージを瞬間表示します。
 * 
 * @param MessageBackgroundType
 * @parent <Message>
 * @text ウィンドウ背景
 * @type select
 * @option 0:ウィンドウ @value 0
 * @option 1:暗くする @value 1
 * @option 2:透明 @value 2
 * @default 0
 * @desc メッセージウィンドウの背景です。
 * 
 * @param MessageSuccess
 * @text 回復成功メッセージ
 * @parent <Message>
 * @type text
 * @default 回復しました！
 * @desc 回復成功時のメッセージです。
 * 1:簡易表示の場合のみ表示されます。
 * 
 * @param MessageUnnecessary
 * @text 回復不要メッセージ
 * @parent <Message>
 * @type text
 * @default 回復の必要はありません！
 * @desc 回復が不要な際のメッセージです。
 * 
 * @param MessageFailure
 * @text 回復失敗メッセージ
 * @parent <Message>
 * @type text
 * @default 回復できません！
 * @desc 回復に失敗した際のメッセージです。
 * 
 * @param MessageWait
 * @text メッセージ中はウェイト
 * @parent <Message>
 * @type boolean
 * @default true
 * @desc メッセージが終了するまで処理を待ちます。
 * 
 * @param <Sound>
 * @text ＜効果音関連＞
 * @desc 効果音関連の項目です。
 * 
 * @param SoundSuccess
 * @text 成功時の効果音
 * @parent <Sound>
 * @type file
 * @dir audio/se
 * @default Recovery
 * @desc 回復に成功した際の効果音です。
 * 
 * @param SoundFailure
 * @text 失敗時の効果音
 * @parent <Sound>
 * @type file
 * @dir audio/se
 * @default Buzzer1
 * @desc 回復に失敗した際の効果音です。
 * 
 * @param <Close Menu>
 * @text ＜メニューを閉じる＞
 * @desc 自動回復後にメニューを閉じる場合の関連項目です。
 * 同時にオンにするスイッチも指定可能です。
 * 
 * @param CloseMenu
 * @text メニューを閉じる
 * @parent <Close Menu>
 * @type boolean
 * @default false
 * @desc 自動回復後にメニューを閉じます。
 * 
 * @param SuccessSwitch
 * @text 成功時のスイッチ
 * @parent <Close Menu>
 * @type switch
 * @desc 成功時、オンにするスイッチです。
 * フラッシュやアニメーションなどの演出に利用できます。
 * 
 * @param FailureSwitch
 * @text 失敗時のスイッチ
 * @parent <Close Menu>
 * @type switch
 * @desc 失敗時、オンにするスイッチです。
 * 
 * @------------------------------------------------------------------
 * @ プラグインコマンド
 * @------------------------------------------------------------------
 * 
 * @command CallAutoHeal
 * @text 自動回復の呼び出し
 * @desc 自動回復を実行します。
 * 
 * @arg TargetHpRate
 * @text 対象とするＨＰ％
 * @desc ＨＰ％がこの数値未満の場合に回復対象とします。
 * 空白なら初期設定を使用します。
 * @type number
 * @max 100
 * 
 * @arg SuccessSwitch
 * @text 成功時のスイッチ
 * @desc 成功時、オンにするスイッチです。
 * フラッシュやアニメーションなどの演出に利用できます。
 * @type switch
 * 
 * @arg FailureSwitch
 * @text 失敗時のスイッチ
 * @desc 失敗時、オンにするスイッチです。
 * @type switch
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
function setDefault(str, def) {
    return str ? str : def;
}

const PLUGIN_NAME = "NRP_AutoHeal";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pShowMenuCommand = toBoolean(parameters["ShowMenuCommand"], true);
const pShowMenuCommandPosition = toNumber(parameters["ShowMenuCommandPosition"], 5);
const pAutoHealName = parameters["AutoHealName"];
const pAutoHealSymbol = parameters["AutoHealSymbol"];

const pTargetHpRate = setDefault(parameters["TargetHpRate"]);
const pCureStates = parseStruct1(parameters["CureStates"]);
const pTargetHpRateVariable = toNumber(parameters["TargetHpRateVariable"]);
const pUserPriority = setDefault(parameters["UserPriority"], "Balance");
const pUseReserveMembers = toBoolean(parameters["UseReserveMembers"], false);
const pTargetReserveMembers = toBoolean(parameters["TargetReserveMembers"], false);

const pMessageType = toNumber(parameters["MessageType"], 0);
const pMessageShowFast = toBoolean(parameters["MessageShowFast"], true);
const pMessageBackgroundType = toNumber(parameters["MessageBackgroundType"], 0);
const pMessageSuccess = parameters["MessageSuccess"];
const pMessageUnnecessary = parameters["MessageUnnecessary"];
const pMessageFailure = parameters["MessageFailure"];
const pMessageWait = toBoolean(parameters["MessageWait"], true);

const pSoundSuccess = parameters["SoundSuccess"];
const pSoundFailure = parameters["SoundFailure"];

const pCloseMenu = toBoolean(parameters["CloseMenu"], false);
const pSuccessSwitch = toNumber(parameters["SuccessSwitch"]);
const pFailureSwitch = toNumber(parameters["FailureSwitch"]);

//----------------------------------------
// ＭＺ用プラグインコマンド
//----------------------------------------

// MVには存在しないため、空で定義しておかないとエラーになる。
if (!PluginManager.registerCommand) {
    PluginManager.registerCommand = function() {}
}

/**
 * ●自動回復の呼び出し
 */
PluginManager.registerCommand(PLUGIN_NAME, "CallAutoHeal", function(args) {
    const targetHpRate = getCommandValue(args.TargetHpRate);
    const successSwitch = getCommandValue(args.SuccessSwitch);
    const failureSwitch = getCommandValue(args.FailureSwitch);

    const params = [];
    params.targetHpRate = targetHpRate;
    params.successSwitch = successSwitch;
    params.failureSwitch = failureSwitch;

    // 自動回復の実行
    $gameParty.startAutoHeal(params);
});

//----------------------------------------
// ＭＶ用のプラグインコマンド
//----------------------------------------
let plTargetHpRate;
let plSuccessSwitch;
let plFailureSwitch;

/**
 * ●ＭＶ用プラグインコマンド実行
 */
var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);

    // 小文字化してから判定
    var lowerCommand = command.toLowerCase();

    // 自動回復実行
    if (lowerCommand === "nrp.autoheal.start") {
        const params = [];
        params.targetHpRate = plTargetHpRate;
        params.successSwitch = plSuccessSwitch;
        params.failureSwitch = plFailureSwitch;

        // クリア
        plTargetHpRate = undefined;
        plSuccessSwitch = undefined;
        plFailureSwitch = undefined;

        // 自動回復の実行
        $gameParty.startAutoHeal(params);

    // 対象者条件
    } else if (lowerCommand === "nrp.autoheal.targethprate") {
        plTargetHpRate = getCommandValue(args[0]);

    // 成功時スイッチ
    } else if (lowerCommand === "nrp.autoheal.successswitch") {
        plSuccessSwitch = getCommandValue(args[0]);

    // 失敗時スイッチ
    } else if (lowerCommand === "nrp.autoheal.failureswitch") {
        plFailureSwitch = getCommandValue(args[0]);
    }
};

//----------------------------------------
// 共通
//----------------------------------------

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

//-----------------------------------------------------------------------------
// メニューコマンドから自動回復を使用
//-----------------------------------------------------------------------------

/**
 * ●メニューコマンド追加（独自コマンド）
 */
const _Window_MenuCommand_addOriginalCommands = Window_MenuCommand.prototype.addOriginalCommands;
Window_MenuCommand.prototype.addOriginalCommands = function() {
    // 元処理実行
    _Window_MenuCommand_addOriginalCommands.call(this);

    // 指定位置に自動回復コマンドを挿入
    // ※標準では並び替えの下
    if (pShowMenuCommand) {
        this._list.splice(pShowMenuCommandPosition, 0,
            { name: pAutoHealName, symbol: pAutoHealSymbol, enabled: true, ext: null});
    }
};

/**
 * ●メニューコマンド呼び出し先の設定
 */
var _Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function() {
    // 元処理実行
    _Scene_Menu_createCommandWindow.call(this);

    // コマンド追加
    this._commandWindow.setHandler(pAutoHealSymbol, this.commandAutoHeal.bind(this));
};

/**
 * ●自動回復呼び出し
 */
Scene_Menu.prototype.commandAutoHeal = function() {
    const params = [];
    $gameParty.startAutoHeal(params);
};

//-----------------------------------------------------------------------------
// 自動回復の処理実行
//-----------------------------------------------------------------------------

// 結果表示用のメッセージ
const resultMessages = [];
// ウィンドウサイズの拡大フラグ
let m_bigWindowFlg = false;

/**
 * 【独自】自動回復の開始
 */
Game_Party.prototype.startAutoHeal = function(params) {
    let targetHpRate = params.targetHpRate;
    let successSwitch = params.successSwitch;
    let failureSwitch = params.failureSwitch;

    // プラグインコマンドからの指定がない場合
    if (!targetHpRate) {
        // 変数指定があれば優先
        if (pTargetHpRateVariable) {
            targetHpRate = $gameVariables.value(pTargetHpRateVariable);
        // デフォルト値を取得
        } else {
            targetHpRate = eval(pTargetHpRate);
        }
    }

    if (!successSwitch) {
        successSwitch = pSuccessSwitch;
    }
    if (!failureSwitch) {
        failureSwitch = pFailureSwitch;
    }

    // 結果表示用のメッセージをクリア
    resultMessages.splice(0);

    let firstFlg = true;

    // 有効な限りループ
    while (true) {
        let cureFlg = false;

        // ステート毎に処理
        for (let stateId of pCureStates) {
            // 文字列判定なので数値変換しておく。
            stateId = Number(stateId);

            // ステート対象者がいるか判定
            const stateActors = getStateActors(healTargetsAddDead(), stateId);
            if (stateActors.length > 0) {
                const target = stateActors[0];
                // 治療可能なら治療実行
                const user = getCureUser(target, stateId);
                if (user) {
                    // 最も効率の良いスキルを選定
                    const skill = getEfficientCureSkill(user, target, stateId);
                    // スキル実行
                    applySkill(user, skill, target);
                    cureFlg = true;
                    break;
                }
                // 治療不可ならそのまま次へ
            }
        }

        // 治療を実行したなら、ループに戻る。
        if (cureFlg) {
            // 初回フラグ解除
            firstFlg = false;
            continue;
        }

        // ＨＰの減っている者がいるか判定
        if (!canAutoHeal(targetHpRate)) {
            if (firstFlg) {
                // 失敗時の演出
                failureEffect(failureSwitch);
                // 回復不要のメッセージ
                failureMessage(pMessageUnnecessary);
                return;
            }
            break;
        }

        // 回復対象（ＨＰの割合が最も低い者）を取得
        const target = getHealTarget();

        // 優先設定に従って、回復スキルの使用者を確定
        const user = getHealUser(target);
        // 使用者が取得できない場合
        if (!user) {
            if (firstFlg) {
                // 失敗時の演出
                failureEffect(failureSwitch);
                // 回復不能メッセージ
                failureMessage(pMessageFailure);
                return;
            }
            break;
        }

        // 最も効率の良いスキルを選定
        const skill = getEfficientHealSkill(user, target);
        // 有効でない場合（回復量が０以下）は終了
        if (!skill) {
            if (firstFlg) {
                // 失敗時の演出
                failureEffect(failureSwitch);
                // 回復不能メッセージ
                failureMessage(pMessageFailure);
                return;
            }
            break;
        }

        // 回復スキルを実行
        applySkill(user, skill, target);

        // 初回フラグ解除
        firstFlg = false;
    }

    // アクターのステータス表示を更新
    if (SceneManager._scene._statusWindow) {
        SceneManager._scene._statusWindow.refresh();
    }
    
    // 成功時の演出
    successEffect(successSwitch);
    // 回復成功メッセージ
    successMessage(pMessageSuccess);
};

/**
 * ●回復成功時の演出
 */
function successEffect(successSwitch) {
    // 現在のシーンを取得
    const scene = SceneManager._scene;

    // スイッチオン
    setSwitch(successSwitch);

    // 回復成功効果音
    if (pSoundSuccess) {
        AudioManager.playSe({"name":pSoundSuccess, "volume":90, "pitch":100, "pan":0})
    }

    // メニューを閉じる。
    if (scene instanceof Scene_Menu && pCloseMenu) {
        scene.popScene();
    }
}

/**
 * ●回復失敗時の演出
 */
function failureEffect(failureSwitch) {
    // 現在のシーンを取得
    const scene = SceneManager._scene;

    // スイッチオン
    setSwitch(failureSwitch);

    // 回復失敗効果音
    if (pSoundFailure) {
        AudioManager.playSe({"name":pSoundFailure, "volume":90, "pitch":100, "pan":0})
    }

    // メニューを閉じる。
    if (scene instanceof Scene_Menu && pCloseMenu) {
        scene.popScene();
    }
}

/**
 * ●スイッチをオンにする
 */
function setSwitch(switchNo) {
    if (switchNo) {
        $gameSwitches.setValue(switchNo, true);
    }
}

/**
 * ●ＨＰの減っている者がいるか判定
 */
function canAutoHeal(targetHpRate) {
    // 生存者を検索
    return healTargets().some(function(a) {
        // 設定された条件で判定
        return a.hpRate() * 100 < targetHpRate;
    });
}

/**
 * ●回復対象を取得
 */
function getHealTarget() {
    // 対象の中で、ＨＰの割合が最も低い者
    return healTargets().reduce(function(a, b) {
        return a.hpRate() <= b.hpRate() ? a : b;
    });
}

// 一時計算用
let m_Target = undefined;

/**
 * ●優先設定に従って、回復スキルの使用者を確定
 */
function getHealUser(target) {
    m_Target = target;

    // 生存者かつ回復スキルを持つ者の配列を取得
    const users = healUsers().filter(function(member) {
        return hasHeal(member, target);
    });

    // 存在しなければ終了
    if (users.length == 0) {
        return undefined;
    }

    // 指定条件で比較
    return users.reduce(function(a, b) {
        return userPriority(a, b) ? a : b;
    });
}

/**
 * ●優先設定に従って、治療スキルの使用者を確定
 */
function getCureUser(target, stateId) {
    m_Target = target;

    // 生存者かつ蘇生スキルを持つ者の配列を取得
    const users = healUsers().filter(function(member) {
        return hasCure(member, target, stateId);
    });

    // 存在しなければ終了
    if (users.length == 0) {
        return undefined;
    }

    // 指定条件で比較
    return users.reduce(function(a, b) {
        return userPriority(a, b, stateId) ? a : b;
    });
}

/**
 * ●スキルの使用者の優先度を取得
 */
function userPriority(a, b, stateId) {
    // 残りＭＰが高いアクターを優先
    if (pUserPriority == "Mp") {
        return a.mp >= b.mp;

    // 後列にいるアクターを優先
    } else if (pUserPriority == "Back") {
        return a.index() >= b.index();

    // コストパフォーマンス優先
    } else if (pUserPriority == "Cost") {
        return efficiency(a, stateId) >= efficiency(b, stateId);

    // バランス（残ＭＰ＋低消費）
    } else if (pUserPriority == "Balance") {
        return a.mp * efficiency(a, stateId) >= b.mp * efficiency(b, stateId);
    }

    // それ以外はないはずだが、とりあえずＭＰで
    return a.mp >= b.mp;
}

/**
 * ●回復スキルを保有しているかどうか？
 */
function hasHeal(member, target) {
    const skills = getUsableHealSkills(member, target);
    return skills && skills.length > 0;
}

/**
 * ●治療スキルを保有しているかどうか？
 */
function hasCure(member, target, stateId) {
    const skills = getUsableCureSkills(member, target, stateId);
    return skills && skills.length > 0;
}

/**
 * ●有効な回復スキルを取得する。
 */
function getUsableHealSkills(member, target) {
    // 使用可能なスキルから、さらに対象に対して有効な回復スキルに限定する。
    return member.usableSkills().filter(function(skill) {
        const action = new Game_Action(member);
        action.setSkill(skill.id);

        // 自分が対象のスキルで、自分以外が対象の場合は除外
        if (action.isForUser() && member != target) {
            return false;

        // 対象が戦闘不能者の場合は除外
        } else if (action.isForDeadFriend()) {
            return false;

        // ランダム対象は除外
        } else if (action.isForRandom()) {
            return false;

        // 自動回復の対象外なら除外
        } else if (action.item().meta.ExceptAutoHeal) {
            return false;
        }

        // タイプがＨＰ回復のものを抽出
        return action.isHpRecover();
    });
}

/**
 * ●有効な治療スキルを取得する。
 */
function getUsableCureSkills(member, target, stateId) {
    // 使用可能なスキルから、さらに対象に対して有効な治療スキルに限定する。
    return member.usableSkills().filter(function(skill) {
        const action = new Game_Action(member);
        action.setSkill(skill.id);

        // 自分が対象のスキルで、自分以外が対象の場合は除外
        if (action.isForUser() && member != target) {
            return false;

        // ランダム対象は除外
        } else if (action.isForRandom()) {
            return false;

        // 自動回復の対象外なら除外
        } else if (action.item().meta.ExceptAutoHeal) {
            return false;
        }

        // ステートの解除効果を持っているか？
        return skill.effects.some(function(effect) {
            // ステート解除かつステートID=1（戦闘不能）
            return effect.code == Game_Action.EFFECT_REMOVE_STATE
                && effect.dataId == stateId;
        });
    });
}

/**
 * ●最大効率を取得する。
 * ※eval内で使用
 */
function efficiency(user, stateId) {
    let skill;
    // 最大効率スキルを取得
    if (stateId) {
        // ステート治療の場合
        skill = getEfficientCureSkill(user, m_Target, stateId);
    } else {
        // 回復の場合
        skill = getEfficientHealSkill(user, m_Target);
    }

    const action = new Game_Action(user);
    action.setSkill(skill.id);

    // 最大効率を返す
    if (stateId) {
        // ステート治療の場合
        return getCureSkillCostPerformance(user, action, m_Target, stateId);
    } else {
        // 回復の場合
        return getHealSkillCostPerformance(user, action, m_Target);
    }
}

/**
 * ●最も効率の良い回復スキルを取得
 */
function getEfficientHealSkill(user, target) {
    const skills = getUsableHealSkills(user, target);

    return skills.reduce(function(skillA, skillB) {
        const actionA = new Game_Action(user);
        actionA.setSkill(skillA.id);
        
        const actionB = new Game_Action(user);
        actionB.setSkill(skillB.id);

        // より効率の良いほうを採用
        return getHealSkillCostPerformance(user, actionA, target)
            >= getHealSkillCostPerformance(user, actionB, target)
            ? skillA : skillB;
    });
}

/**
 * ●最も効率の良い治療スキルを取得
 */
function getEfficientCureSkill(user, target, stateId) {
    const skills = getUsableCureSkills(user, target, stateId);

    return skills.reduce(function(skillA, skillB) {
        const actionA = new Game_Action(user);
        actionA.setSkill(skillA.id);
        
        const actionB = new Game_Action(user);
        actionB.setSkill(skillB.id);

        // より効率の良いほうを採用
        return getCureSkillCostPerformance(user, actionA, target, stateId)
            >= getCureSkillCostPerformance(user, actionB, target, stateId)
            ? skillA : skillB;
    });
}

/**
 * ●回復スキルの消費効率を求める。
 * ※回復量を消費で割る
 */
function getHealSkillCostPerformance(user, action, target) {
    let value = 0;

    // 対象となるアクターの配列を取得
    const actors = getTargetActors(action, target);
    // 有効でない場合は0を返す
    if (!actors) {
        return 0;
    }

    // 一人ずつ回復率を計算
    for (const actor of actors) {
        action.setTarget(actor.index());
        // 回復率を計算
        const newValue = action.evaluateWithTarget(actor);
        if (newValue) {
            // 計算結果を加算
            value += newValue;
        }
    }

    // 有効でない場合は0を返す
    if (value == 0) {
        return 0;
    }

    // 消費を求める（ＭＰ＋ＴＰ）
    const cost = user.skillMpCost(action.item()) + user.skillTpCost(action.item());
    // さらに消費で割る
    const costValue = value / cost;
    return costValue;
}

/**
 * ●治療スキルの消費効率を求める。
 * ※効果を１００として消費で割る
 */
function getCureSkillCostPerformance(user, action, target, stateId) {
    let value = 0;

    // 対象となるアクターの配列を取得
    const targetActors = getTargetActors(action, target);
    // さらにステート対象者に絞る
    const actors = getStateActors(targetActors, stateId);
    // 有効でない場合は0を返す
    if (!actors) {
        return 0;
    }

    // 一人ずつ効果を計算
    for (const actor of actors) {
        action.setTarget(actor.index());
        // 100固定で計算
        const newValue = 100;
        if (newValue) {
            // 計算結果を加算
            value += newValue;
        }
    }

    // 有効でない場合は0を返す
    if (value == 0) {
        return 0;
    }

    // 消費を求める（ＭＰ＋ＴＰ）
    const cost = user.skillMpCost(action.item()) + user.skillTpCost(action.item());
    // さらに消費で割る
    const costValue = value / cost;
    return costValue;
}

/**
 * ●回復効果の反映
 */
function applySkill(user, skill, target) {
    const action = new Game_Action(user);
    action.setSkill(skill.id);

    // 範囲を元に対象の配列を取得
    const targetActors = getTargetActors(action, target);

    // 2:スキルの使用状況を表示
    // 3:スキルの使用結果も表示
    if (pMessageType == 2 || pMessageType == 3) {
        if (Utils.RPGMAKER_NAME != "MV") {
            resultMessages.push(skill.message1.format(user.name(), skill.name));
        } else {
            resultMessages.push(user.name() + skill.message1.format(skill.name));
        }
    }

    // 対象毎に反映
    for (const target of targetActors) {
        for (let i = 0; i < action.numRepeats(); i++) {
            action.apply(target);

            // 3:スキルの使用結果を表示
            if (pMessageType == 3) {
                const result = target.result();

                // ステート除去
                const states = result.removedStateObjects();
                for (const state of states) {
                    if (state.message4) {
                        if (Utils.RPGMAKER_NAME != "MV") {
                            resultMessages.push(state.message4.format(target.name()));
                        } else {
                            resultMessages.push(target.name() + state.message4);
                        }
                    }
                }
                // 回復
                const damage = result.hpDamage;
                if (damage < 0) {
                    resultMessages.push(
                        TextManager.actorRecovery.format(target.name(), TextManager.hp, -damage));
                }
            }
        }
    }
    action.applyGlobal();

    // 消費を反映
    user.useItem(skill);
}

/**
 * ●対象となるアクターの配列を取得する。
 */
function getTargetActors(action, target) {
    // 対象が使用者および単体
    if (action.isForUser() || action.isForOne()) {
        // そのまま対象を返す
        return [target];
    }

    // 全体の場合はそのまま生存者を返す
    return healTargets();
}

/**
 * ●ステートにかかっているアクターの配列を取得する。
 */
function getStateActors(actors, stateId) {
    return actors.filter(function(actor) {
        return actor.isStateAffected(stateId);
    });
}

/**
 * ●回復スキルの使用者の配列を取得する。
 */
function healUsers() {
    // 控えメンバーが有効な場合
    if (pUseReserveMembers) {
        return $gameParty.aliveMembers();
    // 戦闘メンバーのみ
    } else {
        return $gameParty.aliveBattleMembers();
    }
}

/**
 * ●回復スキルの対象者の配列を取得する。
 */
function healTargets() {
    // 控えメンバーが有効な場合
    if (pTargetReserveMembers) {
        return $gameParty.aliveMembers();
    // 戦闘メンバーのみ
    } else {
        return $gameParty.aliveBattleMembers();
    }
}

/**
 * ●回復スキルの対象者の配列を取得する。
 * ※こちらは戦闘不能者も含む
 */
function healTargetsAddDead() {
    // 控えメンバーが有効な場合
    if (pTargetReserveMembers) {
        return $gameParty.members();
    // 戦闘メンバーのみ
    } else {
        return $gameParty.battleMembers();
    }
}

/**
 * 【独自】戦闘メンバーかつ生存者を取得する。
 */
Game_Party.prototype.aliveBattleMembers = function() {
    return this.battleMembers().filter(function(member) {
        return member.isAlive();
    });
};

//-----------------------------------------------------------------------------
// 自動回復のメッセージ表示
//-----------------------------------------------------------------------------

// 一時保存用メッセージウィンドウの高さとＹ座標
let m_keepMessageWindowHeight = undefined;
let m_keepMessageWindowY = undefined;

/**
 * ●成功メッセージの追加
 */
function successMessage(message) {
    // 現在のシーンを取得
    const scene = SceneManager._scene;

    // メッセージが有効な場合
    if (message && pMessageType) {
        const window = scene._messageWindow;
        // ウィンドウ背景の設定
        $gameMessage.setBackground(pMessageBackgroundType);

        // 1:簡易表示
        if (pMessageType == 1) {
            $gameMessage.add(message);

        // 2:スキルの使用状況を表示
        // 3:スキルの使用結果も表示
        } else if (pMessageType == 2 || pMessageType == 3) {
            // 一行ずつ出力
            for (const msg of resultMessages) {
                if (pMessageShowFast) {
                    // 高速表示
                    $gameMessage.add("\\>" + msg);
                } else {
                    // 通常表示
                    $gameMessage.add(msg);
                }
            }

            // ウィンドウサイズを拡大するフラグ
            m_bigWindowFlg = true;
        }

        // メッセージの終了までウェイト
        if (pMessageWait) {
            $gameMap._interpreter.setWaitMode("message");
        }

        // メッセージウィンドウにフォーカス
        if (window) {
            window.activate();
            // メッセージを閉じた際に戻すフォーカス先
            if (scene instanceof Scene_Menu) {
                scene._keepActivateWindow = scene._commandWindow;
            }
        }

    // メッセージ未使用
    } else {
        // コマンド選択状態に戻す
        if (scene._commandWindow) {
            scene._commandWindow.activate();
        }
    }
};

/**
 * ●失敗メッセージの追加
 */
function failureMessage(message) {
    // 現在のシーンを取得
    const scene = SceneManager._scene;

    // メッセージが有効な場合
    if (message && pMessageType) {
        // ウィンドウ背景の設定
        $gameMessage.setBackground(pMessageBackgroundType);
        $gameMessage.add(message);
        // メッセージの終了までウェイト
        if (pMessageWait) {
            $gameMap._interpreter.setWaitMode("message");
        }

        // メッセージウィンドウにフォーカス
        if (scene._messageWindow) {
            scene._messageWindow.activate();
            // メッセージを閉じた際に戻すフォーカス先
            if (scene instanceof Scene_Menu) {
                scene._keepActivateWindow = scene._commandWindow;
            }
        }

    // メッセージ未使用
    } else {
        // コマンド選択状態に戻す
        if (scene._commandWindow) {
            scene._commandWindow.activate();
        }
    }
};

/**
 * ●更新
 * ※メッセージウィンドウを閉じた時の処理
 */
if (pMessageType) {
    /**
     * メソッドが未定義の場合は事前に定義
     * ※これをしておかないと以後の親側への追記が反映されない。
     */
    if (Scene_Menu.prototype.update == Scene_MenuBase.prototype.update) {
        Scene_Menu.prototype.update = function() {
            return Scene_MenuBase.prototype.update.apply(this, arguments);
        }
    }

    /**
     * ●メニューの場合
     */
    const _Scene_Menu_update = Scene_Menu.prototype.update;
    Scene_Menu.prototype.update = function() {
        _Scene_Menu_update.apply(this, arguments);

        const window = this._messageWindow;
        // メッセージウィンドウの状態を監視
        if (window.isClosing()) {
            // メッセージを閉じた際は、コマンド選択状態に戻す
            if (this._keepActivateWindow) {
                this._keepActivateWindow.activate();
                this._keepActivateWindow = undefined;
            }
        }
    };
}

// 詳細ログを表示する場合
if (pMessageType == 2 || pMessageType == 3) {
    /**
     * メソッドが未定義の場合は事前に定義
     * ※これをしておかないと以後の親側への追記が反映されない。
     */
    if (Window_Message.prototype.updateOpen == Window_Base.prototype.updateOpen) {
        Window_Message.prototype.updateOpen = function() {
            return Window_Base.prototype.updateOpen.apply(this, arguments);
        }
    }

    /**
     * ●ウィンドウを開く更新処理
     */
    const _Window_Message_updateOpen = Window_Message.prototype.updateOpen;
    Window_Message.prototype.updateOpen = function() {
        if (this._opening) {
            // 自動回復後にメニューを閉じる設定の場合
            // その後のメッセージウィンドウを拡大
            if (m_bigWindowFlg) {
                // ウィンドウのサイズ調整前に高さとＹ座標を保持
                m_keepMessageWindowHeight = this.height;
                m_keepMessageWindowY = this.y;
                // ウィンドウのサイズ調整
                this.move(this.x, 0, this.width, Graphics.boxHeight);
                // サイズに合わせて表示行数を変更
                this.createContents();
                // フラグ解除
                m_bigWindowFlg = false;
            }
        }

        _Window_Message_updateOpen.apply(this, arguments);
    };

    /**
     * メソッドが未定義の場合は事前に定義
     * ※これをしておかないと以後の親側への追記が反映されない。
     */
    if (Window_Message.prototype.updateClose == Window_Base.prototype.updateClose) {
        Window_Message.prototype.updateClose = function() {
            return Window_Base.prototype.updateClose.apply(this, arguments);
        }
    }
    
    /**
     * ●ウィンドウを閉じる更新処理
     */
    const _Window_Message_updateClose = Window_Message.prototype.updateClose;
    Window_Message.prototype.updateClose = function() {
        _Window_Message_updateClose.apply(this, arguments);

        // 閉じ終わった際、かつサイズ変更がされていた場合
        if (this.isClosed() && m_keepMessageWindowHeight) {
            // ウィンドウのサイズ調整
            this.move(this.x, m_keepMessageWindowY, this.width, m_keepMessageWindowHeight);
            // サイズに合わせて表示行数を変更
            this.createContents();

            // クリア
            m_keepMessageWindowHeight = undefined;
            m_keepMessageWindowY = undefined;
        }
    };

    /**
     * メソッドが未定義の場合は事前に定義
     * ※これをしておかないと以後の親側への追記が反映されない。
     */
    if (Window_Message.prototype.refreshDimmerBitmap == Window_Base.prototype.refreshDimmerBitmap) {
        Window_Message.prototype.refreshDimmerBitmap = function() {
            return Window_Base.prototype.refreshDimmerBitmap.apply(this, arguments);
        }
    }

    /**
     * ●暗くするウィンドウのリフレッシュ
     */
    const _Window_Message_refreshDimmerBitmap = Window_Message.prototype.refreshDimmerBitmap;
    Window_Message.prototype.refreshDimmerBitmap = function() {
        _Window_Message_refreshDimmerBitmap.apply(this, arguments);

        // 暗くするウィンドウの場合のサイズ調整
        if (this._dimmerSprite && m_bigWindowFlg) {
            const bitmap = this._dimmerSprite.bitmap;
            const w = bitmap.width;
            const h = Graphics.boxHeight; // 画面の縦幅いっぱいまで
            const m = this.padding;
            const c1 = ColorManager.dimColor1();
            const c2 = ColorManager.dimColor2();
            bitmap.resize(w, h);
            bitmap.gradientFillRect(0, 0, w, m, c2, c1, true);
            bitmap.fillRect(0, m, w, h - m * 2, c1);
            bitmap.gradientFillRect(0, h - m, w, m, c1, c2, true);
            this._dimmerSprite.setFrame(0, 0, w, h);
        }
    };
}

/**
 * ●Scene_Messageと同等の機能を持たせる。
 * ※他のプラグインで定義されている場合は処理しない
 */
if (pMessageType && !Scene_Menu.prototype.createMessageWindow) {
    /**
     * ●初期化
     */
    const _Scene_Menu_initialize = Scene_Menu.prototype.initialize;
    Scene_Menu.prototype.initialize = function() {
        _Scene_Menu_initialize.apply(this, arguments);

        if (Utils.RPGMAKER_NAME != "MV") {
            Scene_Message.prototype.initialize.call(this);
        } else {
            // MVにはScene_Messageがないので何もしない
        }
    };

    /**
     * ●開始
     */
    const _Scene_Menu_start = Scene_Menu.prototype.start;
    Scene_Menu.prototype.start = function() {
        if (Utils.RPGMAKER_NAME != "MV") {
            Scene_Message.prototype.start.call(this);
        }

        _Scene_Menu_start.apply(this, arguments);
    };

    /**
     * ●各ウィンドウの生成
     */
    const _Scene_Menu_create = Scene_Menu.prototype.create;
    Scene_Menu.prototype.create = function() {
        _Scene_Menu_create.apply(this, arguments);

        this.createAllWindows();
    };

    /**
     * ●停止
     */
    const _Scene_Menu_stop = Scene_Menu.prototype.stop;
    Scene_Menu.prototype.stop = function() {
        if (Utils.RPGMAKER_NAME != "MV") {
            Scene_Message.prototype.stop.call(this);
        }

        _Scene_Menu_stop.apply(this, arguments);
    };

    /**
     * ●終了時
     */
    const _Scene_Menu_terminate = Scene_Menu.prototype.terminate;
    Scene_Menu.prototype.terminate = function() {
        if (Utils.RPGMAKER_NAME != "MV") {
            Scene_Message.prototype.terminate.call(this);
        }

        _Scene_Menu_terminate.apply(this, arguments);
    };

    // 以下はScene_Menuにない関数

    /**
     * ●ウィンドウ生成
     */
    Scene_Menu.prototype.createAllWindows = function() {
        if (Utils.RPGMAKER_NAME != "MV") {
            this.createMessageWindow();
            this.createScrollTextWindow();
            // this.createGoldWindow();
            this.createNameBoxWindow();
            this.createChoiceListWindow();
            this.createNumberInputWindow();
            this.createEventItemWindow();
            this.associateWindows();

        } else {
            this.createMessageWindow();
            this.createScrollTextWindow();
        }

        // メッセージウィンドウの下が消えないよう調整
        this.addChild(this._windowLayer.removeChild(this._messageWindow));
        this.addChild(this._windowLayer.removeChild(this._scrollTextWindow));
        // ＭＶ用
        if (this._messageWindow.subWindows) {
            this._messageWindow.subWindows().forEach(function(win) {
                this.addChild(this._windowLayer.removeChild(win));
            }, this);
        }
    };

    Scene_Menu.prototype.createMessageWindow = function() {
        if (Utils.RPGMAKER_NAME != "MV") {
            Scene_Message.prototype.createMessageWindow.call(this);
        } else {
            Scene_Map.prototype.createMessageWindow.call(this);
        }
    };

    Scene_Menu.prototype.createScrollTextWindow = function() {
        if (Utils.RPGMAKER_NAME != "MV") {
            Scene_Message.prototype.createScrollTextWindow.call(this);
        } else {
            Scene_Map.prototype.createScrollTextWindow.call(this);
        }
    };

    Scene_Menu.prototype.createNameBoxWindow = function() {
        if (Utils.RPGMAKER_NAME != "MV") {
            Scene_Message.prototype.createNameBoxWindow.call(this);
        } else {
            Scene_Map.prototype.createNameBoxWindow.call(this);
        }
    };

    Scene_Menu.prototype.createChoiceListWindow = function() {
        if (Utils.RPGMAKER_NAME != "MV") {
            Scene_Message.prototype.createChoiceListWindow.call(this);
        } else {
            Scene_Map.prototype.createChoiceListWindow.call(this);
        }
    };

    Scene_Menu.prototype.createNumberInputWindow = function() {
        if (Utils.RPGMAKER_NAME != "MV") {
            Scene_Message.prototype.createNumberInputWindow.call(this);
        } else {
            Scene_Map.prototype.createNumberInputWindow.call(this);
        }
    };

    Scene_Menu.prototype.createEventItemWindow = function() {
        if (Utils.RPGMAKER_NAME != "MV") {
            Scene_Message.prototype.createEventItemWindow.call(this);
        } else {
            Scene_Map.prototype.createEventItemWindow.call(this);
        }
    };

    /**
     * ●以下はＭＺのみの関数
     */
    Scene_Menu.prototype.messageWindowRect = function() {
        return Scene_Message.prototype.messageWindowRect.call(this);
    };

    Scene_Menu.prototype.scrollTextWindowRect = function() {
        return Scene_Message.prototype.scrollTextWindowRect.call(this);
    };

    Scene_Menu.prototype.eventItemWindowRect = function() {
        return Scene_Message.prototype.eventItemWindowRect.call(this);
    };

    Scene_Menu.prototype.associateWindows = function() {
        const messageWindow = this._messageWindow;

        // 余計な表示がされるので、ダミーのウィンドウを設定
        const rect = new Rectangle(0, 0, 0, 0);
        const goldWindow = new Window_Gold(rect);
        messageWindow.setGoldWindow(goldWindow);

        messageWindow.setNameBoxWindow(this._nameBoxWindow);
        messageWindow.setChoiceListWindow(this._choiceListWindow);
        messageWindow.setNumberInputWindow(this._numberInputWindow);
        messageWindow.setEventItemWindow(this._eventItemWindow);
        this._nameBoxWindow.setMessageWindow(messageWindow);
        this._choiceListWindow.setMessageWindow(messageWindow);
        this._numberInputWindow.setMessageWindow(messageWindow);
        this._eventItemWindow.setMessageWindow(messageWindow);
    };
}

})();
