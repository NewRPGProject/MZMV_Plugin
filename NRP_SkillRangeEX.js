//=============================================================================
// NRP_SkillRangeEX.js
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc v1.081 Extends the effective range of skills and items.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @orderBefore NRP_VisualTurn
 * @orderBefore NRP_DynamicAnimationMZ
 * @url http://newrpg.seesaa.net/article/473374355.html
 *
 * @help Extends the effective range of skills and items.
 * You can specify various options
 * such as vertical, horizontal, group, and circular.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * <RangeEx:vertical>
 * The registered range is described in the skill (item) note as.
 * You can also create your own ranges.
 * 
 * For more information, please see below.
 * http://newrpg.seesaa.net/article/473374355.html
 * 
 * -------------------------------------------------------------------
 * [Notes]
 * -------------------------------------------------------------------
 * This plugin should be placed above the following plugins.
 * If you don't do so, some functions will not work.
 * - NRP_VisualTurn.js (affects color change target of ordered list).
 * - NRP_DynamicAnimation.js (affects the display position of the animation)
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
 * @param rangeList
 * @type struct<Range>[]
 * @default ["{\"name\":\"縦\",\"id\":\"vertical\",\"rangeIf\":\"40 >= Math.abs(b.srX() - c.srX())\",\"screenAnimationX\":\"b.srX()\",\"screenAnimationY\":\"\",\"mainTargetAllIf\":\"c1._battler.isEnemy() ? c1.srX() > c2.srX() : c1.srX() < c2.srX()\",\"noSide\":\"false\"}","{\"name\":\"横\",\"id\":\"horizontal\",\"rangeIf\":\"40 >= Math.abs(b.srY() - b.height / 2 - (c.srY() - c.height / 2))\",\"screenAnimationX\":\"\",\"screenAnimationY\":\"b.srY() - b.height / 2\",\"mainTargetAllIf\":\"c1._battler.isEnemy() ? c1.srY() > c2.srY() : c1.srY() < c2.srY()\",\"noSide\":\"false\"}","{\"name\":\"グループ\",\"id\":\"group\",\"rangeIf\":\"b._battler.isEnemy() ? b._battler.enemyId() == c._battler.enemyId() : true\",\"screenAnimationX\":\"\",\"screenAnimationY\":\"\",\"mainTargetAllIf\":\"\",\"noSide\":\"false\"}","{\"name\":\"円\",\"id\":\"circle\",\"rangeIf\":\"100**2 >= Math.max(Math.abs(c.srX() - b.srX()) - c.width / 2, 0)**2 + Math.max(Math.abs(c.srY() - c.height / 2 - (b.srY() - b.height / 2)) - c.height / 2, 0)**2\",\"screenAnimationX\":\"b.srX()\",\"screenAnimationY\":\"b.srY() - b.height / 2\",\"mainTargetAllIf\":\"(c1.srX() - a.srX())**2 + (c1.srY() - a.srY())**2 < (c2.srX() - a.srX())**2 + (c2.srY() - a.srY())**2\",\"noSide\":\"false\"}","{\"name\":\"十字\",\"id\":\"cross\",\"rangeIf\":\"40 >= Math.abs(b.srX() - c.srX()) || 40 >= Math.abs(b.srY() - b.height / 2 - (c.srY() - c.height / 2))\",\"screenAnimationX\":\"b.srX()\",\"screenAnimationY\":\"b.srY() - b.height / 2\",\"mainTargetAllIf\":\"\",\"noSide\":\"false\"}","{\"name\":\"直線\",\"id\":\"line\",\"rangeIf\":\"40 >= Math.abs(a.srY() - a.height / 2 + (b.srY() - b.height / 2 - (a.srY() - a.height / 2)) / (b.srX() - a.srX()) * (c.srX() - a.srX()) - (c.srY() - c.height / 2))\",\"screenAnimationX\":\"\",\"screenAnimationY\":\"\",\"mainTargetAllIf\":\"\",\"noSide\":\"false\"}","{\"name\":\"自分周辺\",\"id\":\"around\",\"rangeIf\":\"250**2 >= Math.max(Math.abs(c.srX() - a.srX()) - c.width / 2, 0)**2 + Math.max(Math.abs(c.srY() - c.height / 2 - (a.srY() - a.height / 2)) - c.height / 2, 0)**2\",\"screenAnimationX\":\"a.srX()\",\"screenAnimationY\":\"a.srY() - a.height / 2\",\"mainTargetAllIf\":\"\",\"noSide\":\"false\"}","{\"name\":\"敵味方全員\",\"id\":\"all\",\"rangeIf\":\"true\",\"screenAnimationX\":\"\",\"screenAnimationY\":\"\",\"mainTargetAllIf\":\"\",\"noSide\":\"true\"}","{\"name\":\"自分以外\",\"id\":\"allOther\",\"rangeIf\":\"a != c\",\"screenAnimationX\":\"\",\"screenAnimationY\":\"\",\"mainTargetAllIf\":\"\",\"noSide\":\"true\"}","{\"name\":\"ＬＶ５の倍数\",\"id\":\"lv5\",\"rangeIf\":\"c._battler.level % 5 == 0\",\"screenAnimationX\":\"\",\"screenAnimationY\":\"\",\"mainTargetAllIf\":\"\",\"noSide\":\"false\"}"]
 * @desc List of defined ranges.
 * New ranges can be added.
 * 
 * @param baseCoordinate
 * @type select
 * @option home @value home
 * @option current @value current
 * @default home
 * @desc Coordinates used for judging. In the case of a home, it will no longer be affected by levitation or other performances.
 */
/*~struct~Range:
 * @param name
 * @type string
 * @desc A note for identification. Give it a name that's easy to understand.
 * You can also use this as a note for skills and items.
 * 
 * @param id
 * @type string
 * @desc The identifier to use for the call.
 * Specify this ID in the skill item note.
 * 
 * @param rangeIf
 * @type string
 * @desc It is a conditional expression that defines the range.
 * 
 * @param screenAnimationX
 * @type string
 * @desc X-coordinate of the screen animation.
 * If not set, the animation will be displayed at the normal position.
 * 
 * @param screenAnimationY
 * @type string
 * @desc Y-coordinate of the screen animation.
 * If not set, the animation will be displayed at the normal position.
 * 
 * @param mainTargetAllIf
 * @type string
 * @desc A condition that defines the main target when the range is everyone.
 * For example, you can create a move that targets only the front row.
 * 
 * @param noSide
 * @type boolean
 * @default false
 * @desc If you turn it on, anyone who meets the condition will be targeted, friend or foe alike.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.081 スキル及びアイテムの効果範囲を拡張します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @orderBefore NRP_VisualTurn
 * @orderBefore NRP_DynamicAnimationMZ
 * @url http://newrpg.seesaa.net/article/473374355.html
 *
 * @help スキル及びアイテムの効果範囲を拡張します。
 * 縦列・横列・グループ・円形など様々な指定が可能です。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * <RangeEx:vertical>
 * というように登録されている範囲をスキル（アイテム）のメモ欄に記述します。
 * また、独自範囲の追加も可能です。
 * 
 * 詳細は以下のページをご覧ください。
 * http://newrpg.seesaa.net/article/473374355.html
 * 
 * -------------------------------------------------------------------
 * ■注意点
 * -------------------------------------------------------------------
 * このプラグインは以下のプラグインよりも、上に配置してください。
 * そうしないと一部の機能が動作しなくなります。
 * ・NRP_VisualTurn.js（順序リストの色変え対象に影響）
 * ・NRP_DynamicAnimation.js（アニメーションの表示位置に影響）
 * 
 * -------------------------------------------------------------------
 * ■利用規約
 * -------------------------------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param rangeList
 * @text 範囲一覧
 * @type struct<Range>[]
 * @default ["{\"name\":\"縦\",\"id\":\"vertical\",\"rangeIf\":\"40 >= Math.abs(b.srX() - c.srX())\",\"screenAnimationX\":\"b.srX()\",\"screenAnimationY\":\"\",\"mainTargetAllIf\":\"c1._battler.isEnemy() ? c1.srX() > c2.srX() : c1.srX() < c2.srX()\",\"noSide\":\"false\"}","{\"name\":\"横\",\"id\":\"horizontal\",\"rangeIf\":\"40 >= Math.abs(b.srY() - b.height / 2 - (c.srY() - c.height / 2))\",\"screenAnimationX\":\"\",\"screenAnimationY\":\"b.srY() - b.height / 2\",\"mainTargetAllIf\":\"c1._battler.isEnemy() ? c1.srY() > c2.srY() : c1.srY() < c2.srY()\",\"noSide\":\"false\"}","{\"name\":\"グループ\",\"id\":\"group\",\"rangeIf\":\"b._battler.isEnemy() ? b._battler.enemyId() == c._battler.enemyId() : true\",\"screenAnimationX\":\"\",\"screenAnimationY\":\"\",\"mainTargetAllIf\":\"\",\"noSide\":\"false\"}","{\"name\":\"円\",\"id\":\"circle\",\"rangeIf\":\"100**2 >= Math.max(Math.abs(c.srX() - b.srX()) - c.width / 2, 0)**2 + Math.max(Math.abs(c.srY() - c.height / 2 - (b.srY() - b.height / 2)) - c.height / 2, 0)**2\",\"screenAnimationX\":\"b.srX()\",\"screenAnimationY\":\"b.srY() - b.height / 2\",\"mainTargetAllIf\":\"(c1.srX() - a.srX())**2 + (c1.srY() - a.srY())**2 < (c2.srX() - a.srX())**2 + (c2.srY() - a.srY())**2\",\"noSide\":\"false\"}","{\"name\":\"十字\",\"id\":\"cross\",\"rangeIf\":\"40 >= Math.abs(b.srX() - c.srX()) || 40 >= Math.abs(b.srY() - b.height / 2 - (c.srY() - c.height / 2))\",\"screenAnimationX\":\"b.srX()\",\"screenAnimationY\":\"b.srY() - b.height / 2\",\"mainTargetAllIf\":\"\",\"noSide\":\"false\"}","{\"name\":\"直線\",\"id\":\"line\",\"rangeIf\":\"40 >= Math.abs(a.srY() - a.height / 2 + (b.srY() - b.height / 2 - (a.srY() - a.height / 2)) / (b.srX() - a.srX()) * (c.srX() - a.srX()) - (c.srY() - c.height / 2))\",\"screenAnimationX\":\"\",\"screenAnimationY\":\"\",\"mainTargetAllIf\":\"\",\"noSide\":\"false\"}","{\"name\":\"自分周辺\",\"id\":\"around\",\"rangeIf\":\"250**2 >= Math.max(Math.abs(c.srX() - a.srX()) - c.width / 2, 0)**2 + Math.max(Math.abs(c.srY() - c.height / 2 - (a.srY() - a.height / 2)) - c.height / 2, 0)**2\",\"screenAnimationX\":\"a.srX()\",\"screenAnimationY\":\"a.srY() - a.height / 2\",\"mainTargetAllIf\":\"\",\"noSide\":\"false\"}","{\"name\":\"敵味方全員\",\"id\":\"all\",\"rangeIf\":\"true\",\"screenAnimationX\":\"\",\"screenAnimationY\":\"\",\"mainTargetAllIf\":\"\",\"noSide\":\"true\"}","{\"name\":\"自分以外\",\"id\":\"allOther\",\"rangeIf\":\"a != c\",\"screenAnimationX\":\"\",\"screenAnimationY\":\"\",\"mainTargetAllIf\":\"\",\"noSide\":\"true\"}","{\"name\":\"ＬＶ５の倍数\",\"id\":\"lv5\",\"rangeIf\":\"c._battler.level % 5 == 0\",\"screenAnimationX\":\"\",\"screenAnimationY\":\"\",\"mainTargetAllIf\":\"\",\"noSide\":\"false\"}"]
 * @desc 定義された効果範囲の一覧です。
 * 新しい範囲を追加することも可能です。
 * 
 * @param baseCoordinate
 * @text 基準座標
 * @type select
 * @option ホーム座標 @value home
 * @option 現在座標 @value current
 * @default home
 * @desc 判定に使用する座標です。ホーム座標の場合、浮遊などの移動演出に左右されなくなります。
 */
/*~struct~Range:ja
 * @param name
 * @text 名前
 * @type string
 * @desc 識別用のメモです。分かりやすい名前をおつけください。
 * これをスキル・アイテムのメモ欄で指定しても使えます。
 * 
 * @param id
 * @text 識別子
 * @type string
 * @desc 呼び出しに使う識別子です。
 * このIDをスキル・アイテムのメモ欄で指定します。
 * 
 * @param rangeIf
 * @text 範囲条件
 * @type string
 * @desc 範囲を定める条件式です。
 * 
 * @param screenAnimationX
 * @text 画面アニメのＸ座標
 * @type string
 * @desc 画面対象アニメーションのＸ座標です。
 * 未設定なら通常通りの位置に表示されます。
 * 
 * @param screenAnimationY
 * @text 画面アニメのＹ座標
 * @type string
 * @desc 画面対象アニメーションのＹ座標です。
 * 未設定なら通常通りの位置に表示されます。
 * 
 * @param mainTargetAllIf
 * @text 全体時の主対象条件
 * @type string
 * @desc 範囲を全体にした際、主対象を定める条件式です。
 * 例えば、前列だけを対象にする技などを作れます。
 * 
 * @param noSide
 * @text 敵味方を区別しない
 * @type boolean
 * @default false
 * @desc ONにすると、条件に該当する者は敵味方の区別なく対象とします。
 */
(function() {
"use strict";

/**
 * ●構造体をJSで扱えるように変換
 */
function parseStruct(arg) {
    var ret = [];

    JSON.parse(arg).forEach(function(str) {
        ret.push(JSON.parse(str));
    });

    return ret;
}
function toBoolean(val) {
    return (val == true || val == "true") ? true : false;
}
function setDefault(str, def) {
    if (str == undefined || str == "") {
        return def;
    }
    return str;
}

const parameters = PluginManager.parameters("NRP_SkillRangeEX");
const pRangeList = parseStruct(parameters["rangeList"]);
const pBaseCoordinate = setDefault(parameters["baseCoordinate"]);

// 主対象保持用
var mainTarget;

/**
 * ●効果範囲の拡張
 */
function rangeEx(action, targets) {
    // 主対象クリア
    BattleManager._mainTarget = undefined;
    // 範囲情報を存在チェック
    var rangeInfo = getRangeInfo(action);

    // 範囲情報がなければ終了
    if (!rangeInfo) {
        return targets;
    }

    var rangeIf = rangeInfo.rangeIf; // 範囲を定義する条件式
    var mainTargetAllIf = rangeInfo.mainTargetAllIf; // 全体時の主対象選定条件
    var isNoSide = toBoolean(rangeInfo.noSide); // 敵味方の区別なし

    // 戦闘不能者を対象に含む（正常に機能しない）
    var isAddDead = toBoolean(rangeInfo.addDead);

    // アクターとエネミーのスプライトリスト
    var actorSprites = BattleManager._spriteset._actorSprites;
    var enemySprites = BattleManager._spriteset._enemySprites;

    // バトラーを保有しないアクタースプライトは不要なのでフィルタリングする。
    // エネミーは最初から人数分のみ。
    actorSprites = actorSprites.filter(function(s) {
        return s._battler;
    });

    // スプライトの表示順で並んでいるため、インデックス順でソートしておく。
    actorSprites.sort(function(a, b) {
        return a._battler.index() - b._battler.index();
    });
    enemySprites.sort(function(a, b) {
        return a._battler.index() - b._battler.index();
    });

    // 行動主体とそのスプライトを取得
    const subject = action.subject();
    const subjectSprite = getBattlerSprite(subject);

    var targetSprites;

    // 敵味方無差別
    if (isNoSide) {
        // 全員を対象リストに登録
        // 登録順序でダメージ表示順序を調整
        if (subject.isActor()) {
            targetSprites = enemySprites.concat(actorSprites);
        } else {
            targetSprites = actorSprites.concat(enemySprites);
        }

    // 対象サイドを判定して登録
    } else {
        if (isTargetEnemies(subject, targets, action)) {
            targetSprites = enemySprites;
        } else {
            targetSprites = actorSprites;
        }
    }

    // 無効な対象を除外する。
    targetSprites = targetSprites.filter(function(s) {
        // 戦闘不能者が対象。
        if (action.isForDeadFriend()) {
            return s._battler.isDead();
        // 戦闘不能者を対象に含む
        } else if (isAddDead) {
            return s._battler.isAlive() || s._battler.isDead();
        // 通常の場合（戦闘不能者を除外）
        } else {
            return s._battler.isAlive();
        }
    });

    // 主対象を仮に取得
    mainTarget = targets[0];
    // 主対象のスプライト
    var mainTargetSprite;

    // 数式用に設定
    var a = subjectSprite;

    // 対象が全体かつ設定があれば、主対象を変更
    if (!action.isForOne() && mainTargetAllIf) {
        // 比較を繰り返し、最も条件に当てはまる対象スプライトを取得する。
        mainTargetSprite = targetSprites.reduce(function(c1, c2) {
            // 条件式呼び出し
            return eval(mainTargetAllIf) ? c1 : c2;
        });
        // Sprite_Actorのサイズ設定
        setActorSpriteSize(mainTargetSprite);

        mainTarget = mainTargetSprite._battler;

    // 通常時
    } else {
        // 既に主対象は決まっているため、そのスプライトを取得
        mainTargetSprite = getBattlerSprite(mainTarget);
    }

    // 他プラグインとの連携用に主対象を設定
    BattleManager._mainTarget = mainTarget;

    // 数式用に設定
    const b = mainTargetSprite;

    // 再作成するため、対象リストをクリア
    targets = [];

    try {
        // 数式用に設定
        // 巻き込む副対象のスプライト
        for (const c of targetSprites) {
            // Sprite_Actorのサイズ設定
            setActorSpriteSize(c);

            // 計算式を元に、条件を満たす副対象を対象リストへ追加
            if (eval(rangeIf)) {
                targets.push(c._battler);
            }
        }
    // 数式でエラーが出た場合
    } catch (e) {
        // 空を返す
        return [];
    }

    return targets;
}

/**
 * ●対象サイドを判定
 */
function isTargetEnemies(subject, targets, action) {
    // 混乱している場合→対象サイドをそのまま取得
    if (subject.isConfused()) {
        // 相手サイドが対象
        if (targets[0].isEnemy()) {
            return true;
        }
        // 自軍サイドが対象
        return false;
    }

    // 行動主体がアクター
    if (subject.isActor()) {
        // 相手サイドが対象
        if (action.isForOpponent()) {
            return true;
        }
        // 自軍サイドが対象
        return false;

    // 行動主体がエネミー
    } else {
        // 相手サイドが対象
        if (action.isForOpponent()) {
            return false;
        }
        // 自軍サイドが対象
        return true;
    }
}

/**
 * ●範囲情報を取得する。
 */
function getRangeInfo(action) {
    // 外部プラグインによっては取得できないパターンがあるので対処。
    if (!action || !action.item()) {
        return undefined;
    }

    var rangeInfo = [];

    // メモ欄のメタ情報を取得
    var metaRange = action.item().meta.RangeEx;

    // 登録条件式の指定があれば、リストから該当条件を取得
    if (metaRange != undefined) {
        for (var i = 0; i < pRangeList.length; i++) {
            var range = pRangeList[i];
            if (range.id == metaRange || range.name == metaRange) {
                rangeInfo = range;
                break;
            }
        }
    }

    var metaRangeIf = action.item().meta.RangeExIf;

    // 独自指定があれば上書き取得
    if (metaRangeIf != undefined) {
        rangeInfo.rangeIf = metaRangeIf;
    }
    // 条件式が取得できなければundefinedを返す。
    if (!rangeInfo.rangeIf) {
        return undefined;
    }

    // その他の指定があれば上書き取得
    var metaAnimationX = action.item().meta.RangeExAnimationX;
    var metaAnimationY = action.item().meta.RangeExAnimationY;
    var metaMainTargetAllIf = action.item().meta.RangeExMainTargetAllIf;
    var metaNoSide = action.item().meta.RangeExNoSide;
    // 機能しないが一応残しておく。
    var metaAddDead = action.item().meta.RangeExAddDead;

    if (metaAnimationX != undefined) {
        rangeInfo.screenAnimationX = metaAnimationX;
    }
    if (metaAnimationY != undefined) {
        rangeInfo.screenAnimationY = metaAnimationY;
    }
    if (metaMainTargetAllIf != undefined) {
        rangeInfo.mainTargetAllIf = metaMainTargetAllIf;
    }
    if (metaNoSide != undefined) {
        rangeInfo.noSide = metaNoSide;
    }
    if (metaAddDead != undefined) {
        rangeInfo.addDead = metaAddDead;
    }

    return rangeInfo;
}

/**
 * 指定したバトラーのスプライトを取得する。
 */
function getBattlerSprite(battler) {
    if (!battler) {
        return undefined;
    }

    var sprite;

    var actorSprites = BattleManager._spriteset._actorSprites;
    var enemySprites = BattleManager._spriteset._enemySprites;

    if (battler.isActor()) {
        for (var i = 0; i < actorSprites.length; i++) {
            var s = actorSprites[i];
            if (s._battler == battler) {
                sprite = s;
                break;
            }
        }

        // Sprite_Actorのサイズ設定
        setActorSpriteSize(sprite);
    } else {
        for (var i = 0; i < enemySprites.length; i++) {
            var s = enemySprites[i];
            if (s._battler == battler) {
                sprite = s;
                break;
            }
        }
    }

    return sprite;
}

/**
 * 指定したアクタースプライトのサイズを設定する。
 */
function setActorSpriteSize(sprite) {
    if (sprite && sprite._battler.isActor()) {
        // Sprite_Actorのサイズが取れないのでeffectTargetのものをセットする。
        // やや強引かも……。
        // MZの場合は不要なのでMVのみ。
        if (Utils.RPGMAKER_NAME == "MV") {
            sprite.width = sprite._effectTarget.width;
            sprite.height = sprite._effectTarget.height;
        }
    }
}

//-----------------------------------------------------------------------------
// Game_Action
//-----------------------------------------------------------------------------

/**
 * ●本来は連続効果を処理するための関数っぽいですが、
 * 競合の関係でここの前方に、範囲拡張処理を記述します。
 */
const _Game_Action_repeatTargets = Game_Action.prototype.repeatTargets;
Game_Action.prototype.repeatTargets = function(targets) {
    // 範囲拡張処理
    targets = rangeEx(this, targets);

    return _Game_Action_repeatTargets.call(this, targets);
}

//-----------------------------------------------------------------------------
// Sprite_Animation
//-----------------------------------------------------------------------------

if (Utils.RPGMAKER_NAME == "MV") {
    /**
     * ●アニメーション準備
     */
    const _Sprite_Animation_setup = Sprite_Animation.prototype.setup;
    Sprite_Animation.prototype.setup = function(target, animation, mirror, delay) {
        _Sprite_Animation_setup.call(this, target, animation, mirror, delay);

        // 位置が画面かつ複製でない場合
        // ※画面対象の戦闘アニメは最初の一人だけグラフィックを表示している。
        // _duplicated==trueなら、グラフィック表示対象外
        if (this._animation && this._animation.position === 3 && !this._duplicated) {
            const rangeInfo = getRangeInfo(BattleManager._action);

            // かつ、範囲情報を取得できた場合
            // 必要な情報を準備しておく。
            if (rangeInfo) {
                const subject = BattleManager._subject;

                // 範囲情報
                this._rangeInfo = rangeInfo;

                const a = getBattlerSprite(subject); // 行動主体のスプライト
                const b = getBattlerSprite(mainTarget); // 主対象のスプライト

                // アニメーション位置の調整設定があれば、事前計算
                // ※updatePositionは毎フレーム呼び出されるため、あちらでは計算しない。
                if (rangeInfo.screenAnimationX) {
                    this._rangeInfo._animationX = eval(rangeInfo.screenAnimationX);
                }
                if (rangeInfo.screenAnimationY) {
                    this._rangeInfo._animationY = eval(rangeInfo.screenAnimationY);
                }
            }
        }
    };

// 【MZ対応】
} else {
    /**
     * ●アニメーション準備
     */
    const _Sprite_Animation_setup = Sprite_Animation.prototype.setup;
    Sprite_Animation.prototype.setup = function(
        targets, animation, mirror, delay, previous
    ) {
        _Sprite_Animation_setup.apply(this, arguments);

        // 位置が画面の場合
        if (this._animation && this._animation.displayType == 2) {
            const rangeInfo = getRangeInfo(BattleManager._action);

            // かつ、範囲情報を取得できた場合
            // 必要な情報を準備しておく。
            if (rangeInfo) {
                const subject = BattleManager._subject;

                // 範囲情報
                this._rangeInfo = rangeInfo;

                const a = getBattlerSprite(subject); // 行動主体のスプライト
                const b = getBattlerSprite(mainTarget); // 主対象のスプライト

                // アニメーション位置の調整設定があれば、事前計算
                // ※updatePositionは毎フレーム呼び出されるため、あちらでは計算しない。
                if (rangeInfo.screenAnimationX) {
                    this._rangeInfo._animationX = eval(rangeInfo.screenAnimationX);
                }
                if (rangeInfo.screenAnimationY) {
                    this._rangeInfo._animationY = eval(rangeInfo.screenAnimationY);
                }
            }
        }
    };
}

/**
 * ●アニメーション表示位置の設定
 */
const _Sprite_Animation_updatePosition = Sprite_Animation.prototype.updatePosition;
Sprite_Animation.prototype.updatePosition = function() {
    _Sprite_Animation_updatePosition.apply(this);

    // 位置が画面、かつ複製でない、かつ範囲情報を取得できた場合
    if (this._animation.position === 3 && !this._duplicated && this._rangeInfo) {
        // アニメーション位置の調整設定があれば位置調整
        if (this._rangeInfo._animationX) {
            this.x = this._rangeInfo._animationX;
        }
        if (this._rangeInfo._animationY) {
            this.y = this._rangeInfo._animationY;
        }
    }
};

// 【MZ対応】
if (Utils.RPGMAKER_NAME != "MV") {
    /**
     * ●【MZ対応】アニメーション準備（ＭＺのＭＶ互換）
     */
    const _Sprite_AnimationMV_setup = Sprite_AnimationMV.prototype.setup;
    Sprite_AnimationMV.prototype.setup = function(target, animation, mirror, delay) {
        _Sprite_AnimationMV_setup.call(this, target, animation, mirror, delay);

        // 位置が画面かつ複製でない場合
        // ※画面対象の戦闘アニメは最初の一人だけグラフィックを表示している。
        // _duplicated==trueなら、グラフィック表示対象外
        if (this._animation && this._animation.position === 3 && !this._duplicated) {
            const rangeInfo = getRangeInfo(BattleManager._action);

            // かつ、範囲情報を取得できた場合
            // 必要な情報を準備しておく。
            if (rangeInfo) {
                const subject = BattleManager._subject;

                // 範囲情報
                this._rangeInfo = rangeInfo;

                const a = getBattlerSprite(subject); // 行動主体のスプライト
                const b = getBattlerSprite(mainTarget); // 主対象のスプライト

                // アニメーション位置の調整設定があれば、事前計算
                // ※updatePositionは毎フレーム呼び出されるため、あちらでは計算しない。
                if (rangeInfo.screenAnimationX) {
                    this._rangeInfo._animationX = eval(rangeInfo.screenAnimationX);
                }
                if (rangeInfo.screenAnimationY) {
                    this._rangeInfo._animationY = eval(rangeInfo.screenAnimationY);
                }
            }
        }
    };

    /**
     * ●【MZ対応】アニメーション表示位置の設定（ＭＺのＭＶ互換）
     */
    const _Sprite_AnimationMV_updatePosition = Sprite_AnimationMV.prototype.updatePosition;
    Sprite_AnimationMV.prototype.updatePosition = function() {
        _Sprite_AnimationMV_updatePosition.apply(this);

        // 位置が画面、かつ複製でない、かつ範囲情報を取得できた場合
        if (this._animation.position === 3 && !this._duplicated && this._rangeInfo) {
            // アニメーション位置の調整設定があれば位置調整
            if (this._rangeInfo._animationX) {
                this.x = this._rangeInfo._animationX;
            }
            if (this._rangeInfo._animationY) {
                this.y = this._rangeInfo._animationY;
            }
        }
    };
}

/**
 * ●【MZ対応】アニメーションの表示位置制御
 */
const _Sprite_Animation_targetPosition = Sprite_Animation.prototype.targetPosition;
Sprite_Animation.prototype.targetPosition = function(renderer) {
    const pos = _Sprite_Animation_targetPosition.apply(this, arguments);

    // 位置が画面、かつ範囲情報を取得できた場合
    if (this._animation.displayType == 2 && this._rangeInfo) {
        // アニメーション位置の調整設定があれば位置調整
        if (this._rangeInfo._animationX) {
            this.x = this._rangeInfo._animationX;
        }
        if (this._rangeInfo._animationY) {
            this.y = this._rangeInfo._animationY;
        }

        // Effekseer用に位置を補正
        const tpos = this.targetSpritePosition(this);
        pos.x = tpos.x;
        pos.y = tpos.y;
    }

    return pos;
};

//-----------------------------------------------------------------------------
// Sprite_Battler
//-----------------------------------------------------------------------------

/**
 * ●参照するＸ座標
 */
Sprite_Battler.prototype.srX = function() {
    if (pBaseCoordinate == "current") {
        return this.x;
    }
    return this._homeX;
};

/**
 * ●参照するＹ座標
 */
Sprite_Battler.prototype.srY = function() {
    if (pBaseCoordinate == "current") {
        return this.y;
    }
    return this._homeY;
};

//-----------------------------------------------------------------------------
// Window_BattleActor
//-----------------------------------------------------------------------------

/**
 * ●味方の選択時
 */
const _Window_BattleActor_prototype_select = Window_BattleActor.prototype.select;
Window_BattleActor.prototype.select = function(index) {
    _Window_BattleActor_prototype_select.apply(this, arguments);

    if (index >= 0) {
        const subject = BattleManager.actor();
        // 【MZ対応】subjectが取得できなければ終了
        if (!subject) {
            return;
        }
        const action = subject.currentAction();
        const selectActor = $gameParty.members()[this.index()];
        // アクションと現在の選択対象を元に拡張された対象を取得
        const targets = rangeEx(action, [selectActor]);
        // 範囲拡張なしなら終了
        if (targets.length == 1 && targets[0] == selectActor) {
            return;
        }

        // 一旦、全対象候補を解除
        $gameParty.select(null);
        $gameTroop.select(null);

        // 拡張された対象を選択表示
        targets.forEach(function(target) {
            target.select();
        });
    }
};

/**
 * ●味方の選択ウィンドウ消去時
 */
const _Window_BattleActor_hide = Window_BattleActor.prototype.hide;
Window_BattleActor.prototype.hide = function() {
    _Window_BattleActor_hide.apply(this);

    // 無差別技を想定し、敵側の選択も解除しておく
    $gameTroop.select(null);
};

//-----------------------------------------------------------------------------
// Window_BattleEnemy
//-----------------------------------------------------------------------------

/**
 * ●敵の選択時
 */
const _Window_BattleEnemy_prototype_select = Window_BattleEnemy.prototype.select;
Window_BattleEnemy.prototype.select = function(index) {
    _Window_BattleEnemy_prototype_select.apply(this, arguments);

    if (index >= 0) {
        const subject = BattleManager.actor();
        // 【MZ対応】subjectが取得できなければ終了
        if (!subject) {
            return;
        }
        const action = subject.currentAction();

        // アクションと現在の選択対象を元に拡張された対象を取得
        const targets = rangeEx(action, [this.enemy()]);
        // 範囲拡張なしなら終了
        if (targets.length == 1 && targets[0] == this.enemy()) {
            return;
        }

        // 一旦、全対象候補を解除
        $gameParty.select(null);
        $gameTroop.select(null);

        // 拡張された対象を選択表示
        targets.forEach(function(target) {
            target.select();
        });
    }
};

/**
 * ●敵の選択ウィンドウ消去時
 */
const _Window_BattleEnemy_hide =  Window_BattleEnemy.prototype.hide;
Window_BattleEnemy.prototype.hide = function() {
    _Window_BattleEnemy_hide.apply(this);

    // 無差別技を想定し、味方側の選択も解除しておく
    $gameParty.select(null);
};

})();
