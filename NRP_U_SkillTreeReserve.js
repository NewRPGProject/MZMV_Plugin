//=============================================================================
// NRP_U_SkillTreeReserve.js
//=============================================================================
/*:
@target MV MZ
@plugindesc v1.001 Added reservation function to the skill tree
@author Takeshi Sunagawa (http://newrpg.seesaa.net/)
@base SkillTree
@base SkillTree_LayoutEx
@orderAfter SkillTree
@orderAfter SkillTree_LayoutEx
@url https://newrpg.seesaa.net/article/490423513.html

@help Add a reservation function to the skill tree plugin (unagi ootoro).

You can reserve a skill by selecting the skill for which
you do not have enough SP on the skill tree screen.
The reserved skill will be automatically learned
when the SP requirement is met.
In addition, the skill tree screen will open automatically.
※The skill tree opens after the end of a battle or an event.
　It can also be forced to be called up with a plugin command
  even during the middle of an event.
※If more than one actor learns a skill at the same time,
  the skill tree of the actor closest to the beginning is opened.

-------------------------------------------------------------------
[Install]
-------------------------------------------------------------------
A skill tree plugin is required as a prerequisite.
Please refer to the following for installation.
https://github.com/unagiootoro/SkillTreeSample

- SkillTree.js
- SkillTree_LayoutEx.js
- SkillTreeConfig.js

The above three are required.
In addition, this plugin should be placed below the above plugins.

-------------------------------------------------------------------
[Terms]
-------------------------------------------------------------------
Since the processing of the original plugin is diverted,
the The license is also the MIT license.

Please note that I am not affiliated with the original author
and that this is my own original work.

@------------------------------------------------------------------
@ [Plugin Parameters]
@------------------------------------------------------------------

@param LearnTimingBattle
@type boolean
@default true
@desc
During battle, the acquisition of the reserved skill is processed.

@param LearnTimingNotBattle
@type boolean
@default true
@desc
Processes the acquisition of reserved skills during battle.

@param ReserveRectColor
@type string
@default #ff0000
@desc
Specifies the color of the border surrounding the icon of the skill being reserved.

@param ReserveSkillSeFileName
@type file
@dir audio/se
@default Switch2
@desc
Specify the filename of the SE to be played when the skill is reserved.

@param ReserveSkillSeVolume
@type number
@default 90
@desc
Specifies the volume of SE to be played when a skill is reserved.

@param ReserveSkillSePitch
@type number
@default 100
@desc
Specifies the pitch of the SE to be played when the skill is reserved.

@param ReserveSkillSePan
@type number
@default 0
@desc
Specifies the pan of the SE to be played when the skill is reserved.

@param ReserveConfirmationText
@type string
@default Not enough %2. Do you want to reserve %3?
@desc
This is a confirmation text for reserving a skill. %1:SP value, %2:SP name, %3:skill name

@param ReserveYesText
@type string
@default Reserve
@desc
Specify text for reserving the skill.

@param ReserveNoText
@type string
@default Don't reserve
@desc
Specify the text if the skill is not reserved.

@param ReserveCancelConfirmationText
@type string
@default %3 is on reservation. Do you want to cancel?
@desc
This is a confirmation text for canceling a reservation for a skill. %1:SP value, %2:SP name, %3:skill name

@param ReserveCancelYesText
@type string
@default Cancel
@desc
Specify text for canceling a skill reservation.

@param ReserveCancelNoText
@type string
@default Don't cancel
@desc
Specifies the text for not canceling the reservation of a skill.

@param LearnReserveSkillText
@type string
@default %1 learns %2!
@desc
This is the text when the reserved skills are learned. %1:actor name, %2:skill name

@param <Other>

@param SpecifySkillCanLearn
@parent <Other>
@type boolean
@default true
@desc
Change the display of skills with insufficient SP. Display translucent if SP is insufficient, dark if not meeting requirements.

 */

/*:ja
@target MV MZ
@plugindesc v1.001 スキルツリーに予約機能を追加
@author 砂川赳（http://newrpg.seesaa.net/）
@base SkillTree
@base SkillTree_LayoutEx
@orderAfter SkillTree
@orderAfter SkillTree_LayoutEx
@url https://newrpg.seesaa.net/article/490423513.html

@help スキルツリープラグイン（うなぎおおとろ様）に予約機能を追加します。

スキルツリー画面でＳＰが足りないスキルを選択すると、予約できます。
予約したスキルはＳＰが条件を満たした時点で、自動的に習得されます。
さらにスキルツリー画面が自動で開かれます。
※スキルツリーが開くタイミングは戦闘終了後またはイベント終了後です。
　イベント途中でもプラグインコマンドで強制的に呼び出すこともできます。
※同時に複数のアクターがスキルを習得した場合は、
　最も先頭に近いアクターのスキルツリーが開かれます。

-------------------------------------------------------------------
■導入手順
-------------------------------------------------------------------
前提としてスキルツリープラグインが必要です。
以下を参考に導入してください。
https://github.com/unagiootoro/SkillTreeSample

・SkillTree.js
・SkillTree_LayoutEx.js
・SkillTreeConfig.js

上記の三つが必須です。
さらに当プラグインを上記プラグインの下に配置してください。

-------------------------------------------------------------------
■プラグインコマンド（ＭＺ）
-------------------------------------------------------------------
◆予約スキル習得後ツリー呼出
予約スキル習得後にこのコマンドを実行すると、スキルツリーを呼び出します。
該当スキルがない場合は無視されます。

なお、ＳＰ獲得処理の直後にコマンドを実行すると、
スキル習得メッセージより先にスキルツリーが呼び出されてしまう模様です。
ウェイト（１フレームでＯＫ）を入れると解決できます。

-------------------------------------------------------------------
■利用規約
-------------------------------------------------------------------
元のプラグインの処理を流用しているため、
ライセンスも同じく、ＭＩＴライセンスとなります。

元の作者様とは関係なく、あくまで
砂川赳が独自に作った代物であることにご注意ください。

@------------------------------------------------------------------
@ プラグインコマンド
@------------------------------------------------------------------

@command CallReserveSkillTree
@text 予約スキル習得後ツリー呼出
@desc
予約スキル習得後に実行すると、スキルツリーを呼び出します。
該当スキルがない場合は無視されます。

@------------------------------------------------------------------
@ プラグインパラメータ
@------------------------------------------------------------------

@param LearnTimingBattle
@text 戦闘時に習得
@type boolean
@default true
@desc
戦闘時に予約スキルの習得処理を行います。

@param LearnTimingNotBattle
@text 非戦闘時に習得
@type boolean
@default true
@desc
非戦闘時に予約スキルの習得処理を行います。

@param ReserveRectColor
@text 予約スキルの枠線色
@type string
@default #ff0000
@desc
予約中のスキルのアイコンを囲む枠線の色を指定します。

@param ReserveSkillSeFileName
@text スキル予約時の効果音名
@type file
@dir audio/se
@default Switch2
@desc
スキルを予約したときに再生するSEのファイル名を指定します。

@param ReserveSkillSeVolume
@text スキル予約時の効果音量
@type number
@default 90
@desc
スキルを予約したときに再生するSEのvolumeを指定します。

@param ReserveSkillSePitch
@text スキル予約時の効果音ピッチ
@type number
@default 100
@desc
スキルを予約したときに再生するSEのpitchを指定します。

@param ReserveSkillSePan
@text スキル予約時の効果音位相
@type number
@default 0
@desc
スキルを予約したときに再生するSEのpanを指定します。

@param ReserveConfirmationText
@text 予約時の文章（確認）
@type string
@default %2が不足しています。%3を予約しますか？
@desc
スキルを予約する際の確認用文章です。%1:消費するSP値, %2:SP名, %3:取得するスキル名

@param ReserveYesText
@text 予約時の文章（はい）
@type string
@default 予約する
@desc
スキルを予約する場合のテキストを指定します。

@param ReserveNoText
@text 予約時の文章（いいえ）
@type string
@default 予約しない
@desc
スキルを予約しない場合のテキストを指定します。

@param ReserveCancelConfirmationText
@text 予約取消時の文章（確認）
@type string
@default %3は予約中です。取り消しますか？
@desc
スキルの予約を取り消す際の確認用文章です。%1:消費するSP値, %2:SP名, %3:取得するスキル名

@param ReserveCancelYesText
@text 予約取消時の文章（はい）
@type string
@default 取り消す
@desc
スキルの予約を取り消す場合のテキストを指定します。

@param ReserveCancelNoText
@text 予約取消時の文章（いいえ）
@type string
@default 取り消さない
@desc
スキルの予約を取り消さない場合のテキストを指定します。

@param LearnReserveSkillText
@text 予約スキルの習得文
@type string
@default %1は%2を覚えた！
@desc
予約したスキルを習得した際の文章です。%1:アクター名, %2:取得するスキル名

@param <Other>
@text ＜その他＞

@param SpecifySkillCanLearn
@text ＳＰ不足スキルの表示変更
@parent <Other>
@type boolean
@default true
@desc
ＳＰが不足しているスキルの表示を変更します。
ＳＰ不足なら半透明、条件未達なら暗く表示。

 */

// 予約習得後にスキルツリーを開くアクターＩＤ
let mReserveSkillTreeActorId = null;

(() => {
"use strict";

class PluginParamsParser {
    static parse(params, typeData, predictEnable = true) {
        return new PluginParamsParser(predictEnable).parse(params, typeData);
    }

    constructor(predictEnable = true) {
        this._predictEnable = predictEnable;
    }

    parse(params, typeData, loopCount = 0) {
        if (++loopCount > 255) throw new Error("endless loop error");
        const result = {};
        for (const name in typeData) {
            result[name] = this.convertParam(params[name], typeData[name], loopCount);
        }
        if (!this._predictEnable) return result;
        if (typeof params === "object" && !(params instanceof Array)) {
            for (const name in params) {
                if (result[name]) continue;
                const param = params[name];
                const type = this.predict(param);
                result[name] = this.convertParam(param, type, loopCount);
            }
        }
        return result;
    }

    convertParam(param, type, loopCount) {
        if (typeof type === "string") {
            return this.cast(param, type);
        } else if (typeof type === "object" && type instanceof Array) {
            const aryParam = JSON.parse(param);
            if (type[0] === "string") {
                return aryParam.map(strParam => this.cast(strParam, type[0]));
            } else {
                return aryParam.map(strParam => this.parse(JSON.parse(strParam), type[0]), loopCount);
            }
        } else if (typeof type === "object") {
            return this.parse(JSON.parse(param), type, loopCount);
        } else {
            throw new Error(`${type} is not string or object`);
        }
    }

    cast(param, type) {
        switch(type) {
        case "any":
            if (!this._predictEnable) throw new Error("Predict mode is disable");
            return this.cast(param, this.predict(param));
        case "string":
            return param;
        case "number":
            if (param.match(/\d+\.\d+/)) return parseFloat(param);
            return parseInt(param);
        case "boolean":
            return param === "true";
        default:
            throw new Error(`Unknow type: ${type}`);
        }
    }

    predict(param) {
        if (param.match(/^\d+$/) || param.match(/^\d+\.\d+$/)) {
            return "number";
        } else if (param === "true" || param === "false") {
            return "boolean";
        } else {
            return "string";
        }
    }
}

const PluginName = document.currentScript.src.match(/^.*\/(.+)\.js$/)[1];
const params = PluginManager.parameters(PluginName);
const LearnTimingBattle = (params["LearnTimingBattle"] === "true" ? true : false);
const LearnTimingNotBattle = (params["LearnTimingNotBattle"] === "true" ? true : false);
const ReserveRectColor = params["ReserveRectColor"];
const ReserveSkillSeFileName = params["ReserveSkillSeFileName"];
const ReserveSkillSeVolume = parseInt(params["ReserveSkillSeVolume"]);
const ReserveSkillSePitch = parseInt(params["ReserveSkillSePitch"]);
const ReserveSkillSePan = parseInt(params["ReserveSkillSePan"]);
const ReserveConfirmationText = params["ReserveConfirmationText"];
const ReserveYesText = params["ReserveYesText"];
const ReserveNoText = params["ReserveNoText"];
const ReserveCancelConfirmationText = params["ReserveCancelConfirmationText"];
const ReserveCancelYesText = params["ReserveCancelYesText"];
const ReserveCancelNoText = params["ReserveCancelNoText"];
const LearnReserveSkillText = params["LearnReserveSkillText"];
const SpecifySkillCanLearn = (params["SpecifySkillCanLearn"] === "true" ? true : false);

// 本体プラグインのパラメータ
const skillTreeParams = PluginParamsParser.parse(PluginManager.parameters(SkillTreePluginName), {});
const SpName = skillTreeParams.SpName;
const IconWidth = skillTreeParams.IconWidth;
const IconHeight = skillTreeParams.IconHeight;
const ViewRectColor = skillTreeParams.ViewRectColor;
const ViewRectOfs = skillTreeParams.ViewRectOfs;

const SkillTreeNodeInfo = SkillTreeClassAlias.SkillTreeNodeInfo;
const SkillTreeNode = SkillTreeClassAlias.SkillTreeNode;
const SkillTreeTopNode = SkillTreeClassAlias.SkillTreeTopNode;
const SkillDataType = SkillTreeClassAlias.SkillDataType;
const SkillTreeMapLoader = SkillTreeClassAlias.SkillTreeMapLoader;
const SkillTreeConfigLoadError = SkillTreeClassAlias.SkillTreeConfigLoadError;
const SkillTreeConfigLoader = SkillTreeClassAlias.SkillTreeConfigLoader;
const SkillTreeData = SkillTreeClassAlias.SkillTreeData;
const SkillTreeManager = SkillTreeClassAlias.SkillTreeManager;
const Scene_SkillTree = SkillTreeClassAlias.Scene_SkillTree;
const Window_TypeSelect = SkillTreeClassAlias.Window_TypeSelect;
const Window_ActorInfo = SkillTreeClassAlias.Window_ActorInfo;
const Window_SkillTreeNodeInfo = SkillTreeClassAlias.Window_SkillTreeNodeInfo;
const Window_SkillTree = SkillTreeClassAlias.Window_SkillTree;
const Window_NodeOpen = SkillTreeClassAlias.Window_NodeOpen;
const SkillTreeView = SkillTreeClassAlias.SkillTreeView;

const typeDefine = {
    OpenedImage: {},
    BackgroundImage: {
        BackgroundImage2: [{}]
    },
};

// レイアウトプラグインのパラメータ
const layoutParams = PluginParamsParser.parse(PluginManager.parameters(SkillTree_LayoutExPluginName), typeDefine);
const OpenedImage = layoutParams.OpenedImage;

//-----------------------------------------------------------------------------
// ＭＺ用プラグインコマンド
//-----------------------------------------------------------------------------

// MVには存在しないため、空で定義しておかないとエラーになる。
if (!PluginManager.registerCommand) {
    PluginManager.registerCommand = function() {}
}

/**
 * ●予約スキル習得後ツリー呼出
 */
PluginManager.registerCommand(PluginName, "CallReserveSkillTree", function(args) {
    // 予約スキルを習得した場合はスキルツリー画面呼び出し
    if (mReserveSkillTreeActorId) {
        skt_open(mReserveSkillTreeActorId);
    }
});

// ----------------------------------------------------------------------------
// SkillTreeNode
// ----------------------------------------------------------------------------

/**
 * 【上書】スキルの解放が可能か？
 */
SkillTreeNode.prototype.isOpenable = function() {
    // コストが不足の場合も許可して、予約ウィンドウを開く。
    return this.isSelectable() && !this.isOpened();
    // return this.isSelectable() && !this.isOpened() && this.canCostConsumption();
}

/**
 * ●スキルが解放されているか？
 */
const _SkillTreeNode_isOpened = SkillTreeNode.prototype.isOpened;
SkillTreeNode.prototype.isOpened = function() {
    // 既に習得しているスキルはopenedにする。
    const skillId = this._info.skillId();
    const actorId = this._info.actorId();
    if (actorId) {
        const actor = $gameActors.actor(actorId);
        if (actor.isLearnedSkill(skillId)) {
            return true;
        }
    }

    return _SkillTreeNode_isOpened.apply(this, arguments);
}

/**
 * ●スキル解放時
 */
const _SkillTreeNode_open = SkillTreeNode.prototype.open;
SkillTreeNode.prototype.open = function(costConsume = true) {
    _SkillTreeNode_open.apply(this, arguments);

    const actorId = this._info.actorId();
    if (actorId) {
        const actor = $gameActors.actor(actorId);
        // 予約情報をクリア
        actor.clearReserveSkill();
    }
}


/**
 * 【独自】スキルが予約されているかどうか？
 */
SkillTreeNode.prototype.isReserved = function() {
    const skillId = this._info.skillId();
    const actorId = this._info.actorId();
    if (actorId) {
        const actor = $gameActors.actor(actorId);
        // 予約中のスキルと一致した場合
        if (skillId == actor.reserveSkillId())  {
            return true;
        }
    }
    return false;
}

// ----------------------------------------------------------------------------
// Scene_SkillTree
// ----------------------------------------------------------------------------

/**
 * ●スキルツリーの生成
 */
const _Scene_SkillTree_create = Scene_SkillTree.prototype.create;
Scene_SkillTree.prototype.create = function() {
    _Scene_SkillTree_create.apply(this, arguments);

    this.createNodeOpenReserveWindow();
}

/**
 * ●スキルツリー上で決定キーを押した。
 */
const _Scene_SkillTree_skillTreeOk = Scene_SkillTree.prototype.skillTreeOk;
Scene_SkillTree.prototype.skillTreeOk = function() {
    // ポイントが足りているかを判定
    const info = this._skillTreeManager.selectNode().info();
    const actorId = info.actorId();
    const needSp = info.needSp();
    // 条件を満たしていない場合
    if ($skillTreeData.sp(actorId) < needSp) {
        // 予約ウィンドウを表示
        this.change_SkillTreeWindow_To_NodeOpenReserveWindow();
        return;
    }

    _Scene_SkillTree_skillTreeOk.apply(this, arguments);
}

/**
 * 【独自】予約ウィンドウの生成
 */
Scene_SkillTree.prototype.createNodeOpenReserveWindow = function() {
    this._windowNodeOpenReserve = new Window_NodeOpenReserve(this.nodeOpenWindowRect(), this._skillTreeManager);
    this._windowNodeOpenReserve.setHandler("yes", this.nodeOpenReserveOk.bind(this));
    this._windowNodeOpenReserve.setHandler("no", this.nodeOpenReserveCancel.bind(this));
    this._windowNodeOpenReserve.setHandler("cancel", this.nodeOpenReserveCancel.bind(this));
    this._windowNodeOpenReserve.close();
    this._windowNodeOpenReserve.deactivate();
    this._windowNodeOpenReserve.hide();
    this.addWindow(this._windowNodeOpenReserve);
}

/**
 * 【独自】予約ウィンドウ確定時
 */
Scene_SkillTree.prototype.nodeOpenReserveOk = function() {
    // ここで予約処理を実行
    const node = this._skillTreeManager.selectNode();
    const actor = this.actor();

    // 予約されている場合は取り消し
    if (node.isReserved()) {
        actor.clearReserveSkill();
        // 表示更新して予約状況を反映
        this._windowSkillTree.refresh();
    } else {
        const info = node.info();
        const needSp = info.needSp();
        const skillId = info.skillId();
        // 予約スキル情報を設定
        actor.setReserveSkill(skillId, needSp);
    }

    // Windowを閉じてスキルツリーへ
    this.change_NodeOpenReserveWindow_To_SkillTreeWindow();
    // 表示更新して予約状況を反映
    this._windowSkillTree.refresh();
}

/**
 * 【独自】予約ウィンドウキャンセル時
 */
Scene_SkillTree.prototype.nodeOpenReserveCancel = function() {
    this.change_NodeOpenReserveWindow_To_SkillTreeWindow();
}

/**
 * 【独自】予約ウィンドウを開く
 */
Scene_SkillTree.prototype.change_SkillTreeWindow_To_NodeOpenReserveWindow = function() {
    this._windowSkillTree.deactivate();
    this._windowNodeOpenReserve.refresh();
    this._windowNodeOpenReserve.activate();
    this._windowNodeOpenReserve.show();
    this._windowNodeOpenReserve.open();
}

/**
 * 【独自】予約ウィンドウを閉じてスキルツリーへ
 */
Scene_SkillTree.prototype.change_NodeOpenReserveWindow_To_SkillTreeWindow = function() {
    this._windowNodeOpenReserve.deactivate();
    this._windowNodeOpenReserve.close();
    this._windowSkillTree.open();
    this._windowSkillTree.showHelpWindow();
    this._windowSkillTree.activate();
}

/**
 * ●終了処理
 */
const _Scene_SkillTree_terminate = Scene_SkillTree.prototype.terminate;
Scene_SkillTree.prototype.terminate = function() {
    _Scene_SkillTree_terminate.apply(this, arguments);

    // 予約から呼び出された場合はマップ画面へ戻る。
    if (mReserveSkillTreeActorId) {
        mReserveSkillTreeActorId = null;
        SceneManager.goto(Scene_Map);
    }
}

/**
 * ●タイプキャンセル時
 */
const _Scene_SkillTree_typeCancel = Scene_SkillTree.prototype.typeCancel;
Scene_SkillTree.prototype.typeCancel = function() {
    // カーソルが一瞬表示されるので消しておく（細かい……）
    this._windowSkillTree.setCursorRect(0, 0, 0, 0);

    _Scene_SkillTree_typeCancel.apply(this, arguments);
}

// ----------------------------------------------------------------------------
// SkillTreeView
// ----------------------------------------------------------------------------

/**
 * 【上書】ノードの描画
 */
SkillTreeView.prototype.viewDrawNode = function(bitmap) {
    for (const node of Object.values(this._skillTreeManager.getAllNodes())) {
        let [px, py] = SkillTreeView.getPixelXY(node.point);
        
        // ＳＰ不足スキルの表示を変更
        if (SpecifySkillCanLearn) {
            // 条件を満たしているスキル
            if (node.isSelectable() || node.isOpened()) {
                // ポイントが足りているかを判定
                if (node.isOpened() || node.canCostConsumption()) {
                    this.drawIcon(bitmap, node.iconBitmap(), px, py);
                // ＳＰ不足時は半透明
                } else {
                    this.drawIcon(bitmap, node.iconBitmap(), px, py, 128);
                }
            // 条件を満たしていないスキル
            // ※元の動作は半透明だが、ＳＰ不足と区別するため暗くする。
            } else {
                // Bitmapの色調変更
                const iconBitmap = node.iconBitmap();
                iconBitmap.adjustTone(-180, -180, -180);
                this.drawIcon(bitmap, iconBitmap, px, py);
            }
        // 元の動作
        } else {
            if (node.isSelectable() || node.isOpened()) {
                this.drawIcon(bitmap, node.iconBitmap(), px, py);
            } else {
                this.drawIcon(bitmap, node.iconBitmap(), px, py, 96);
            }
        }

        // 予約されている場合
        if (node.isReserved()) {
            const x = px - ViewRectOfs;
            const y = py - ViewRectOfs;
            const width = IconWidth + ViewRectOfs * 2;
            const height = IconHeight + ViewRectOfs * 2;
            this.drawRect(bitmap, ReserveRectColor, x, y, width, height);

        // 解放されている場合
        } else if (node.isOpened()) {
            if (OpenedImage.EnableOpenedImage) {
                const x = px + OpenedImage.XOfs;
                const y = py + OpenedImage.YOfs;
                const openedImage = ImageManager.loadBitmap("img/", OpenedImage.FileName);
                bitmap.blt(openedImage, 0, 0, openedImage.width, openedImage.height, x, y);
            } else {
                const x = px - ViewRectOfs;
                const y = py - ViewRectOfs;
                const width = IconWidth + ViewRectOfs * 2;
                const height = IconHeight + ViewRectOfs * 2;
                this.drawRect(bitmap, ViewRectColor, x, y, width, height);
            }
        }
    }
}

// ----------------------------------------------------------------------------
// Window_NodeOpen
// ----------------------------------------------------------------------------

/**
 * ●リフレッシュ
 */
const _Window_NodeOpen_refresh = Window_NodeOpen.prototype.refresh;
Window_NodeOpen.prototype.refresh = function() {
    _Window_NodeOpen_refresh.apply(this, arguments);
    // 先頭にカーソルを合わせる。
    this._index = 0;
}

//-----------------------------------------------------------------------------
// Window_NodeOpenReserve
//
// 予約メッセージ用のウィンドウ

function Window_NodeOpenReserve() {
    this.initialize(...arguments);
}

Window_NodeOpenReserve.prototype = Object.create(Window_NodeOpen.prototype);
Window_NodeOpenReserve.prototype.constructor = Window_NodeOpenReserve;

Window_NodeOpenReserve.prototype.initialize = function(rect, skillTreeManager) {
    Window_NodeOpen.prototype.initialize.call(this, rect, skillTreeManager);
};

/**
 * ●予約ウィンドウの文言（yes/no）
 */
Window_NodeOpenReserve.prototype.makeCommandList = function() {
    const node = this._skillTreeManager.selectNode();
    // 予約済みの場合
    if (node.isReserved()) {
        this.addCommand(ReserveCancelYesText, "yes");
        this.addCommand(ReserveCancelNoText, "no");
    // 通常
    } else {
        this.addCommand(ReserveYesText, "yes");
        this.addCommand(ReserveNoText, "no");
    }
}

/**
 * ●リフレッシュ
 */
Window_NodeOpenReserve.prototype.refresh = function() {
    Window_Command.prototype.refresh.call(this);

    if (!this._skillTreeManager.type()) return;
    const needSp = this._skillTreeManager.selectNode().needSp();
    const skillName = this._skillTreeManager.selectNode().info().skill().name;
    const textWidth = this.windowWidth() - this.padding * 2;

    const node = this._skillTreeManager.selectNode();
    let text;
    // 予約済みの場合
    if (node.isReserved()) {
        text = ReserveCancelConfirmationText;
    // 通常
    } else {
        text = ReserveConfirmationText;
    }

    this.drawText(text.format(needSp, SpName, skillName), 0, 0, textWidth, "left");
    // 先頭にカーソルを合わせる。
    this._index = 0;
}

/**
 * ●確定時の効果音
 */
Window_NodeOpenReserve.prototype.playOkSound = function() {
    const node = this._skillTreeManager.selectNode();
    // 予約済かつ確定の場合はキャンセル音
    if (node.isReserved() && this.currentSymbol() === "yes") {
        SoundManager.playCancel();
        return;

    // 予約確定時の効果音
    } else if (this.currentSymbol() === "yes") {
        if (ReserveSkillSeFileName === "") {
            return;
        }
        const se = {
            name: ReserveSkillSeFileName,
            pan: ReserveSkillSePan,
            pitch: ReserveSkillSePitch,
            volume: ReserveSkillSeVolume,
        }
        AudioManager.playSe(se);
        return;
    }

    // それ以外は通常の確定音
    Window_Command.prototype.playOkSound.call(this);
}

// ----------------------------------------------------------------------------
// Game_Actor
// ----------------------------------------------------------------------------

// レベルアップ時判定用
let mIsLevelUp = false;

/**
 * ●レベルアップ時
 */
const _Game_Actor_levelUp = Game_Actor.prototype.levelUp;
Game_Actor.prototype.levelUp = function() {
    mIsLevelUp = true;
    _Game_Actor_levelUp.apply(this, arguments);
    mIsLevelUp = false;
};

/**
 * ●ＳＰの獲得
 * ※SkillTree.jsのメソッド
 */
const _Game_Actor_gainSp = Game_Actor.prototype.gainSp;
Game_Actor.prototype.gainSp = function(sp) {
    _Game_Actor_gainSp.apply(this, arguments);

    // タイミングが有効で、かつ予約スキルが存在する場合
    if (isLearnSkillConditionOK() && this._reserveSkillId) {
        // 必要ＳＰを満たした場合、スキルを習得する。
        if ($skillTreeData.sp(this.actorId()) >= this._reserveSkillSp) {
            // ＳＰを減算
            $skillTreeData.gainSp(this.actorId(), -this._reserveSkillSp);
            // スキル習得
            this.learnSkill(this._reserveSkillId);

            // メッセージ表示
            // ※レベルアップ時は標準の処理内で表示されるため処理しない。
            if (!mIsLevelUp) {
                const dataSkill = $dataSkills[this._reserveSkillId];
                $gameMessage.add(LearnReserveSkillText.format(this.name(), dataSkill.name));
            }

            // 予約状態初期化
            this._reserveSkillId = null;
            this._reserveSkillSp = null;
            // スキルツリー画面を開くアクターＩＤ
            if (mReserveSkillTreeActorId) {
                // 既に値が存在する場合は、先頭寄りのアクターの番号を優先
                if (this.index() >= 0
                        && this.index() < $gameActors.actor(mReserveSkillTreeActorId).index()) {
                    mReserveSkillTreeActorId = this.actorId();
                }

            } else {
                mReserveSkillTreeActorId = this.actorId();
            }
        }
    }
};

/**
 * 【独自】予約スキルの設定
 */
Game_Actor.prototype.setReserveSkill = function(skillId, needSp) {
    this._reserveSkillId = skillId;
    this._reserveSkillSp = needSp;
};

/**
 * 【独自】予約スキルのクリア
 */
Game_Actor.prototype.clearReserveSkill = function() {
    this._reserveSkillId = null;
    this._reserveSkillSp = null;
};

/**
 * 【独自】予約スキルの取得
 */
Game_Actor.prototype.reserveSkillId = function() {
    return this._reserveSkillId;
};

/**
 * ●スキル習得のタイミングが有効か？
 */
function isLearnSkillConditionOK() {
    if ($gameParty.inBattle() && LearnTimingBattle) {
        return true;
    } else if (!$gameParty.inBattle() && LearnTimingNotBattle) {
        return true;
    }
    return false;
}

// ----------------------------------------------------------------------------
// Scene_Map
// ----------------------------------------------------------------------------

/**
 * ●マップ開始
 */
const _Scene_Map_start = Scene_Map.prototype.start;
Scene_Map.prototype.start = function() {
    // 予約スキルを習得した場合はスキルツリー画面呼び出し
    if (mReserveSkillTreeActorId) {
        // 一瞬マップが表示されてしまうため黒くする。
        this._fadeOpacity = 255;
        this.updateColorFilter();
        // スキルツリー画面呼び出し
        skt_open(mReserveSkillTreeActorId);
        return;
    }

    _Scene_Map_start.apply(this, arguments);
};

// ----------------------------------------------------------------------------
// Game_Interpreter
// ----------------------------------------------------------------------------

/**
 * ●処理終了
 */
const _Game_Interpreter_terminate = Game_Interpreter.prototype.terminate;
Game_Interpreter.prototype.terminate = function() {
    _Game_Interpreter_terminate.apply(this, arguments);

    // 予約スキルを習得した場合はスキルツリー画面呼び出し
    // 対象は現在実行中のイベントのみ
    // ただし、メッセージ表示を行う場合は待つ（下のWindow_Messageへ）
    if (mReserveSkillTreeActorId
            && $gameMap._interpreter == this
            && !$gameMessage.hasText()) {
        skt_open(mReserveSkillTreeActorId);
    }
};


// ----------------------------------------------------------------------------
// Window_Message
// ----------------------------------------------------------------------------

/**
 * ●メッセージを閉じる際の確認
 * イベントコマンドでＳＰを獲得し、予約スキルを習得した際、
 * イベント終了時にスキルツリー画面を呼び出す処理。
 * ※Game_Interpreter.prototype.terminateに実装した場合は、
 * 　スキル習得メッセージより前に呼び出されてしまうためここに実装する。
 */
const _Window_Message_checkToNotClose = Window_Message.prototype.checkToNotClose;
Window_Message.prototype.checkToNotClose = function() {
    _Window_Message_checkToNotClose.apply(this, arguments);

    // この時点でもisClosingならば、メッセージ終了と判断
    // さらにイベントが終了していることを確認する。
    if (this.isClosing() && !$gameMap._interpreter.isRunning()) {
        // 予約スキルを習得した場合はスキルツリー画面呼び出し
        if (mReserveSkillTreeActorId) {
            skt_open(mReserveSkillTreeActorId);
        }
    }
};

// ----------------------------------------------------------------------------
// ＭＺ対応
// ----------------------------------------------------------------------------
if (Utils.RPGMAKER_NAME != "MV") {
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

})();
