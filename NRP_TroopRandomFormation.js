//=============================================================================
// NRP_TroopRandomFormation.js
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc v1.07 Place enemy groups automatically and randomly.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/475049887.html
 *
 * @help Place enemy groups automatically and randomly.
 * When the group name corresponds to the set condition,
 * enemies will be automatically placed.
 * 
 * By default, if the group name starts with a '#',
 * it will be subject to automatic placement.
 * 
 * [Specification of automatic placement]
 * 1. Enemies will be randomly placed within the specified range.
 * 2. Examine the coordinates on a grid-by-grid basis,
 *    and if the appropriate spacing can be secured, finalize the placement.
 * 3. If you can't get the spacing, repeat the placement over and over again.
 *    Then, pick out the best placement.
 * 4. If there is only one enemy, place it in the center.
 * 
 * Basically, it's for side view, but it's also for front view in passing.
 * 
 * For more information, please see below.
 * http://newrpg.seesaa.net/article/475049887.html
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but we will respond to defects as far as possible.
 * 
 * @param <Valid Condition>
 * 
 * @param condition
 * @parent <Valid Condition>
 * @type string
 * @default name.startsWith("#")
 * @desc Conditions for automatic placement. (blank: always execute.)
 * ex.: name.startsWith("#"); group name starts with #.
 * 
 * @param exclusionCondition
 * @parent <Valid Condition>
 * @type string
 * @desc The condition is that automatic placement is not executed.
 * It takes precedence over "condition".
 * 
 * @param <Formation Range>
 * 
 * @param startX
 * @text startX(left)
 * @parent <Formation Range>
 * @type string
 * @default 20
 * @desc X-coordinate to start placing the enemy.
 * 
 * @param endX
 * @text endX(right)
 * @parent <Formation Range>
 * @type string
 * @default 500
 * @desc X-coordinate to end the enemy's placement.
 * 
 * @param startHeadY
 * @text startHeadY(up)
 * @parent <Formation Range>
 * @type string
 * @default 0
 * @desc Y-coordinate at the head of the enemy's starting position.
 * This will adjust to prevent taller enemies from hiding.
 * 
 * @param startFootY
 * @text startFootY(up)
 * @parent <Formation Range>
 * @type string
 * @default 250
 * @desc Y-coordinate at the foot of the enemy's starting position.
 * 
 * @param endY
 * @text endY(down)
 * @parent <Formation Range>
 * @type string
 * @default 420
 * @desc Y-coordinate to end the enemy's placement.
 * 
 * @param gridSize
 * @parent <Formation Range>
 * @type number
 * @default 32
 * @desc The unit of coordinates for automatic placement.
 * 0 -> 32 -> 64... and so on.
 * 
 * @param <Enemy Sort>
 * 
 * @param sameRowBorder
 * @parent <Enemy Sort>
 * @type number
 * @default 64
 * @desc If the difference of X of each other is within the range, it is regarded as the same column and numbered.
 * 
 * @param sortBaseX
 * @parent <Enemy Sort>
 * @type select
 * @option 0:Center of image @value 0
 * @option 1:Right of image @value 1
 * @default 1
 * @desc X-coordinate to be used as a standard for sorting.
 * 
 * @param <Single Enemy Setting>
 * 
 * @param singleEnemyPosition
 * @parent <Single Enemy Setting>
 * @type select
 * @option 0:Random @value 0
 * @option 1:Specified Coordinates @value 1
 * @default 1
 * @desc How to place it when the enemy is a unit.
 * When "Specified Coordinates", the following settings are enabled.
 * 
 * @param singleEnemyX
 * @parent <Single Enemy Setting>
 * @type string
 * @default (startX + endX) / 2
 * @desc The X in the case of "Specified Coordinates".
 * The default value is the center of the placement range.
 * 
 * @param singleEnemyY
 * @parent <Single Enemy Setting>
 * @type string
 * @default ((startHeadY + startFootY) / 2 + endY) / 2 + a.height/2
 * @desc The Y in the case of "Specified Coordinates".
 * The default value is the center of the placement range.
 * 
 * @param <Algorithm>
 * 
 * @param algorithmType
 * @parent <Algorithm>
 * @type select
 * @option 0:Brute Force(recommended) @value 0
 * @option 1:Repeat Random @value 1
 * @default 0
 * @desc An algorithm that does automatic placement.
 * Basically, "0:Brute Force" is recommended.
 * 
 * @param maxTryNoForTroop
 * @parent <Algorithm>
 * @type number
 * @default 20
 * @desc The maximum number of times per troop to repeat the placement.
 * 
 * @param maxTryNoForEnemy
 * @parent <Algorithm>
 * @type number
 * @default 50
 * @desc The maximum number of times per unit to repeat the placement.
 * This is not used in the case of "Brute Force".
 * 
 * @param distanceBorder
 * @parent <Algorithm>
 * @type string
 * @default 0
 * @desc The distance evaluation value that confirms the attempt. The larger the value, the more spacing is ensured.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.07 敵グループを自動でランダム配置します。
 * @author 砂川赳 (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/475049887.html
 *
 * @help 敵グループを自動でランダム配置します。
 * プラグインパラメータの設定値を元に、
 * グループ名が条件に該当するものを自動配置の対象とします。
 * 
 * 初期状態ではグループ名が『#』から始まる場合に自動配置の対象とします。
 * 
 * ■自動配置の仕様
 * ・指定した範囲内に対して、ランダムで敵を配置。
 * ・グリッド単位で座標を検査し、適切な間隔を確保できれば配置確定。
 * ・確保できなければ何度も繰り返して、最もマシな配置を選び出す。
 * ・敵が一体の場合は中央に配置。
 * 
 * 基本的にはサイドビュー用ですが、
 * フロントビューにも一応は対応しています。
 * 
 * 詳細は以下をご覧ください。
 * http://newrpg.seesaa.net/article/475049887.html
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param <Valid Condition>
 * @text ＜適用条件＞
 * 
 * @param condition
 * @text 実行条件
 * @parent <Valid Condition>
 * @type string
 * @default name.startsWith("#")
 * @desc 自動配置を実行する条件です。空欄なら常に実行。
 * 例：name.startsWith("#"); グループ名が#で開始。
 * 
 * @param exclusionCondition
 * @text 除外条件
 * @parent <Valid Condition>
 * @type string
 * @desc 自動配置を実行しない条件です。
 * 実行条件よりも優先されます。
 * 
 * @param <Formation Range>
 * @text ＜配置範囲＞
 * 
 * @param startX
 * @text 開始Ｘ座標（左）
 * @parent <Formation Range>
 * @type string
 * @default 20
 * @desc 敵の配置範囲の開始Ｘ座標です。
 * 
 * @param endX
 * @text 終了Ｘ座標（右）
 * @parent <Formation Range>
 * @type string
 * @default 500
 * @desc 敵の配置範囲の終了Ｘ座標です。
 * 
 * @param startHeadY
 * @text 開始頭上Ｙ座標（上）
 * @parent <Formation Range>
 * @type string
 * @default 0
 * @desc 敵の配置範囲の頭上開始Ｙ座標です。
 * 背の高い敵が隠れないように調整するための値です。
 * 
 * @param startFootY
 * @text 開始足元Ｙ座標（上）
 * @parent <Formation Range>
 * @type string
 * @default 250
 * @desc 敵の配置範囲の足元開始Ｙ座標です。
 * 
 * @param endY
 * @text 終了Ｙ座標（下）
 * @parent <Formation Range>
 * @type string
 * @default 420
 * @desc 敵の配置範囲の終了Ｙ座標です。
 * 
 * @param gridSize
 * @text グリッドサイズ
 * @parent <Formation Range>
 * @type number
 * @default 32
 * @desc 自動配置する座標の単位です。
 * 0 -> 32 -> 64...というように配置されます。
 * 
 * @param <Enemy Sort>
 * @text ＜敵の並び順＞
 * 
 * @param sameRowBorder
 * @text 同列とみなす範囲
 * @parent <Enemy Sort>
 * @type number
 * @default 64
 * @desc 互いのＸ座標の差が指定の数値範囲に収まる場合、同じ列とみなして番号を振ります。
 * 
 * @param sortBaseX
 * @text 基準となるＸ座標
 * @parent <Enemy Sort>
 * @type select
 * @option 0:画像中央 @value 0
 * @option 1:画像右端 @value 1
 * @default 1
 * @desc 並び替えの基準とするＸ座標です。
 * 
 * @param <Single Enemy Setting>
 * @text ＜敵が一体の場合＞
 * 
 * @param singleEnemyPosition
 * @text 単体時の配置
 * @parent <Single Enemy Setting>
 * @type select
 * @option 0:ランダムに配置 @value 0
 * @option 1:指定座標に配置 @value 1
 * @default 1
 * @desc 敵が一体の場合に配置する方法です。
 * 『指定座標に配置』の場合は以下の設定を有効とします。
 * 
 * @param singleEnemyX
 * @text 単体時のＸ座標
 * @parent <Single Enemy Setting>
 * @type string
 * @default (startX + endX) / 2
 * @desc 指定座標に配置する場合のＸ座標です。
 * 初期値は配置範囲の中央です。
 * 
 * @param singleEnemyY
 * @text 単体時のＹ座標
 * @parent <Single Enemy Setting>
 * @type string
 * @default ((startHeadY + startFootY) / 2 + endY) / 2 + a.height/2
 * @desc 指定座標に配置する場合のＹ座標です。
 * 初期値は配置範囲の中央です。
 * 
 * @param <Algorithm>
 * @text ＜演算方法＞
 * 
 * @param algorithmType
 * @text 演算方式
 * @parent <Algorithm>
 * @type select
 * @option 0:座標総当り（推奨） @value 0
 * @option 1:ランダム繰り返し @value 1
 * @default 0
 * @desc 自動配置を行う演算方式です。
 * 基本的には『0:座標総当り』を推奨します。
 * 
 * @param maxTryNoForTroop
 * @text グループ当たりの試行回数
 * @parent <Algorithm>
 * @type number
 * @default 20
 * @desc 自動配置を繰り返すグループ当たりの最大回数です。
 * 
 * @param maxTryNoForEnemy
 * @text 一体当たりの試行回数
 * @parent <Algorithm>
 * @type number
 * @default 50
 * @desc 自動配置を繰り返す一体当たりの最大回数です。
 * 『座標総当り』の場合は使用しません。
 * 
 * @param distanceBorder
 * @text 確定とする距離評価値
 * @parent <Algorithm>
 * @type string
 * @default 0
 * @desc この値を超える距離評価値を得た場合、試行を確定します。
 * 値を大きくするほど間隔を確保します。
 */

(function() {
"use strict";

function toNumber(str, def) {
    return isNaN(str) ? def : +(str || def);
}
function setDefault(str, def) {
    return str ? str : def;
}

var parameters = PluginManager.parameters("NRP_TroopRandomFormation");
// ＜適用条件＞
var pCondition = parameters["condition"];
var pExclusionCondition = parameters["exclusionCondition"];
// ＜配置範囲＞
var pStartX = setDefault(parameters["startX"], 0);
var pEndX = parameters["endX"];
var pStartHeadY = setDefault(parameters["startHeadY"], 0);
var pStartFootY = setDefault(parameters["startFootY"], 250);
var pEndY = parameters["endY"];
var pGridSize = toNumber(parameters["gridSize"], 1);
// ＜敵の並び順＞
var pSameRowBorder = toNumber(parameters["sameRowBorder"], 50);
var pSortBaseX = toNumber(parameters["sortBaseX"], 1);
// ＜敵が一体の場合＞
var pSingleEnemyPosition = toNumber(parameters["singleEnemyPosition"], 1);
var pSingleEnemyX = setDefault(parameters["singleEnemyX"], "(startX + endX) / 2");
var pSingleEnemyY = setDefault(parameters["singleEnemyY"], "(startY + endY) / 2 + a.height/2");
// ＜演算方法＞
var pAlgorithmType = toNumber(parameters["algorithmType"], 0);
var pMaxTryNoForEnemy = toNumber(parameters["maxTryNoForEnemy"], 50);
var pMaxTryNoForTroop = toNumber(parameters["maxTryNoForTroop"], 50);
var pDistanceBorder = setDefault(parameters["distanceBorder"], 0);

/**
 * ●戦闘開始
 */
var _Scene_Battle_start = Scene_Battle.prototype.start;
Scene_Battle.prototype.start = function() {
    _Scene_Battle_start.call(this);

    // 対象外なら処理せず、配置完了とする。
    if (!isAutoTroopFormation()) {
        return;
    }

    var spriteset = BattleManager._spriteset;

    // 通常、この段階ではサイズを読み込めていないので、bitmapから取得し計算する。
    for (let sprite of spriteset._enemySprites) {
        // 画像が読み込まれていない場合は読み込む
        if (!sprite.bitmap) {
            sprite.updateBitmap();
        }
        // 画像倍率も考慮
        if (sprite.bitmap) {
            sprite.width = sprite.bitmap.width * sprite.scale.x;
            sprite.height = sprite.bitmap.height * sprite.scale.y;
        }
    }

    // 単体かつ『指定座標に配置』の場合
    if (pSingleEnemyPosition == 1 && $gameTroop.members().length == 1) {
        setSinglePosition(spriteset._enemySprites[0]);
        return;
    }
    
    // 通常配置
    spriteset.setTrooRandomFormation();
};

/**
 * MZ専用処理
 */
if (Utils.RPGMAKER_NAME == "MZ") {
    /**
     * ●スプライトにバトラーをセットする。
     */
    const _Sprite_Enemy_setBattler = Sprite_Enemy.prototype.setBattler;
    Sprite_Enemy.prototype.setBattler = function(battler) {
        _Sprite_Enemy_setBattler.apply(this, arguments);

        // 早めに画像読込を実施
        this.updateBitmap();
    };
}

/**
 * ●自動配置の対象かどうか？
 */
function isAutoTroopFormation() {
    // eval参照用のグループ名
    var name = $gameTroop.troop().name;

    // 除外条件
    if (pExclusionCondition && eval(pExclusionCondition)) {
        return false;

    // 実行条件
    } else if (!pCondition || eval(pCondition)) {
        return true;
    }

    return false;
}

/**
 * ●単体時の指定配置
 */
function setSinglePosition(a) {
    // eval参照用
    var startX = eval(pStartX);
    var endX = eval(pEndX);
    var startFootY = eval(pStartFootY);
    var endY = eval(pEndY);
    var startHeadY = eval(pStartHeadY);

    var battler = a._battler;
    battler._screenX = eval(pSingleEnemyX);
    battler._screenY = eval(pSingleEnemyY);

    // 画面下に突き抜けた場合は調整
    if (battler._screenY > endY) {
        battler._screenY = endY;
    }
    // 画面上に突き抜けた場合は調整（優先）
    if (battler._screenY - a.height < startHeadY) {
        battler._screenY = startHeadY + a.height;
    }

    // 配置更新
    a.setHome(battler.screenX(), battler.screenY());
}

/**
 * 【独自実装】自動配置
 */
Spriteset_Battle.prototype.setTrooRandomFormation = function() {
    // サイズの大きい順にスプライトを並び替え
    // ※そのほうが配置が安定する。
    this._enemySprites.sort(function(a, b){
        return b.width * b.height - a.width * a.height;
    });

    var bestDistance = -999999;

    // 繰り返しながら、最善の配置を求める
    for (var i = 0; i < pMaxTryNoForTroop; i++) {
        var newDistance = 999999;

        // フラグ初期化
        for (let sprite of this._enemySprites) {
            sprite._isPositionOK = false;
        }

        // 一体ずつ配置計算
        for (let sprite of this._enemySprites) {
            const distance = sprite.makeAutoPosition(bestDistance);

            // 返ってきた結果の中で最も小さな（間隔の狭い）値を取得する
            if (distance < newDistance) {
                newDistance = distance;
            }
        }

        // 前回の試行値より優秀な場合
        if (newDistance > bestDistance) {
            bestDistance = newDistance;

            // 最善値を更新
            for (let sprite of this._enemySprites) {
                sprite._bestFormationX = sprite.x;
                sprite._bestFormationY = sprite.y;
            }

            // 十分な間隔が確保されている場合、そこで終了
            if (bestDistance >= BattleManager.getDistanceBorder()) {
                break;
            }
        }
    }

    // 確定
    for (let sprite of this._enemySprites) {
        var battler = sprite._battler;
        // 最善値で座標更新
        battler._screenX = sprite._bestFormationX;
        battler._screenY = sprite._bestFormationY;
        // 比較用に右端を取得
        battler._screenRightX = battler._screenX + sprite.width/2;
        // 配置更新
        sprite.setHome(battler.screenX(), battler.screenY());
    }

    // データ上の並び順を更新
    BattleManager.sortTroopMembers();
    // Ｙ座標を元にスプライトの並び順を更新
    this.sortTroopSprite();
};

/**
 * ●データ上の並び順を更新
 */
BattleManager.sortTroopMembers = function() {
    // サイドビューの場合
    if ($gameSystem.isSideView()) {
        $gameTroop.members().sort(function(a, b) {
            // 右端の差が一定値以内なら、縦の比較を優先
            if (Math.abs(a.formationSortX() - b.formationSortX()) <= pSameRowBorder) {
                // Ｙ座標は上優先
                if (a._screenY > b._screenY) {
                    return 1;
                } else if (a._screenY < b._screenY) {
                    return -1;
                }
            }

            // Ｘ座標は右優先
            if (a.formationSortX() < b.formationSortX()) {
                return 1;
            } else if (a.formationSortX() > b.formationSortX()) {
                return -1;
            }
            return 0;
        });

    // フロントビューの場合
    } else {
        $gameTroop.members().sort(function(a, b) {
            // Ｙ座標の差が一定値以内なら、横の比較を優先
            if (Math.abs(a._screenY - b._screenY) <= pSameRowBorder) {
                // Ｘ座標は左優先
                if (a._screenX > b._screenX) {
                    return 1;
                } else if (a._screenX < b._screenX) {
                    return -1;
                }
            }

            // Ｙ座標は下優先
            if (a._screenY < b._screenY) {
                return 1;
            } else if (a._screenY > b._screenY) {
                return -1;
            }

            return 0;
        });
    }

    // 一旦、記号情報をクリア
    $gameTroop._namesCount = {};
    for (const enemy of $gameTroop.members()) {
        enemy.setLetter("");
    }
    // 記号再生成
    $gameTroop.makeUniqueNames();
};

/**
 * ●並び替えに使用するＸ座標
 */
Game_Enemy.prototype.formationSortX = function() {
    // 右端基準
    if (pSortBaseX == 1) {
        return this._screenRightX;
    }
    // 中央基準
    return this._screenX;
};

/**
 * 【独自】スプライトの並び順を更新
 */
Spriteset_Battle.prototype.sortTroopSprite = function() {
    const battleField = this._battleField;

    // バトラースプライトだけをソートしたいので、childrenを３分割して格納
    // 真ん中にバトラーがいるはず
    var beforeChildren = []; // バトラーの前
    var battlerChildren = []; // バトラー
    var afterChildren = []; // バトラーの後

    // バトラーに達したかどうかのフラグ
    var afterFlg = false;

    // 0件になるまで分割して格納
    while (battleField.children.length > 0) {
        // childを取得して削除
        let child = battleField.children[0];
        battleField.removeChildAt(0);

        // バトラーを持つ
        if (child._battler) {
            afterFlg = true;
            battlerChildren.push(child);

        // バトラーを持たない
        } else {
            if (!afterFlg) {
                beforeChildren.push(child);
            } else {
                afterChildren.push(child);
            }
        }
    }

    // バトラースプライトを並び替え
    battlerChildren.sort(compareSprite);

    // 順番に再格納
    for (let child of beforeChildren) {
        battleField.addChild(child);
    }
    for (let child of battlerChildren) {
        battleField.addChild(child);
    }
    for (let child of afterChildren) {
        battleField.addChild(child);
    }
};

/**
 * ●優先度設定
 */
function compareSprite(a, b) {
    // アクター優先
    if (a._actorId && b._enemyId) {
        return 1;
    } else if (a._enemyId && b._actorId) {
        return -1;
    }

    // 優先度が同一の場合、Ｙ座標が大きいものを優先
    if (a.y > b.y) {
        return 1;
    } else if (a.y < b.y) {
        return -1;
    }

    // Ｘ座標が大きいものを優先
    if (a.x > b.x) {
        return 1;
    } else if (a.x < b.x) {
        return -1;
    }

    return b.spriteId - a.spriteId;
}

/**
 * 【独自】配置計算を開始
 * ※外部プラグインとの連携を考慮し、あえてEnemyではなくBattlerに実装。
 */
Sprite_Battler.prototype.makeAutoPosition = function(bestDistance) {
    // 配置範囲を取得（Ｘ座標は中央が基準、Ｙ座標は足元が基準）
    const startX = eval(pStartX) + this.width/2;
    const endX = eval(pEndX) - this.width/2;
    // 頭上と足元を基準に大きなほうを取得
    const startY = Math.max(eval(pStartHeadY) + this.height, eval(pStartFootY));
    const endY = eval(pEndY);

    // 配置できるグリッド数を計算
    let gridCountX = Math.floor((endX - startX) / pGridSize) + 1;
    let gridCountY = Math.floor((endY - startY) / pGridSize) + 1;
    // 最低でも１
    gridCountX = Math.max(gridCountX, 1);
    gridCountY = Math.max(gridCountY, 1);

    // 既に配置を確定した敵のスプライトを取得
    const spriteset = BattleManager._spriteset;
    const sprites = spriteset._enemySprites.filter(function(s) {
        return s && s._isPositionOK && s._battler.isAlive();
    });

    let distanceList;

    // 座標総当り方式の場合
    if (pAlgorithmType == 0) {
        distanceList = this.makeAutoPositionWithBruteForce(
            endX, endY, gridCountX, gridCountY, sprites, bestDistance);

    // ランダム方式の場合
    } else {
        distanceList = this.makeAutoPositionAtRandom(
            endX, endY, gridCountX, gridCountY, sprites, bestDistance);
    }

    var initialData = {x: 0, y: 0, distance:-999999};

    // 最大間隔のデータを取得
    var bestData = distanceList.reduce(function(a, b) {
        return a.distance > b.distance ? a : b;
    }, initialData);

    // 計算結果を確定
    this.x = bestData.x;
    this.y = bestData.y;
    this._isPositionOK = true;

    // 評価用に最小距離を返す
    return bestData.distance;
};

/**
 * 【独自実装】総当り方式で位置を決定
 * ※外部プラグインとの連携を考慮し、あえてEnemyではなくBattlerに実装。
 */
Sprite_Battler.prototype.makeAutoPositionWithBruteForce = function(
        endX, endY, gridCountX, gridCountY, sprites, bestDistance) {
    var distanceList = [];

    // グリッドを使用した座標の候補を保有する配列を作成する。
    var gridList = [];

    for (let countX = 0; countX < gridCountX; countX++) {
        for (let countY = 0; countY < gridCountY; countY++) {
            // 右下を基準にグリッド座標を計算
            var gridData = {
                x: endX - countX * pGridSize,
                y: endY - countY * pGridSize
            };

            gridList.push(gridData);
        }
    }

    // 配列をシャッフルする。
    // ※座標順にしきい値超えを見つけても、ランダム性を保てないため
    shuffleArray(gridList);

    /**
     * １つずつ座標総当りで距離評価値を取得
     */
    for (let gridData of gridList) {
        const distanceData = makeDistanceData(
            this, gridData.x, gridData.y, sprites, bestDistance);

        // 取得できなかった場合は次へ
        if (!distanceData) {
            continue;
        }

        // 間隔が適切に開いている場合はＯＫ
        if (distanceData.distance >= BattleManager.getDistanceBorder()) {
            // 成功の１件だけ残す
            distanceList = [];
            distanceList.push(distanceData);
            break;
        }

        // ＮＧの場合は候補に追加
        distanceList.push(distanceData);
    }

    return distanceList;
};

/**
 * ●配列の中身をシャッフルする。
 * ※フィッシャー–イェーツのシャッフル
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var r = Math.floor(Math.random() * (i + 1));
        var tmp = array[i];
        array[i] = array[r];
        array[r] = tmp;
    }
}

/**
 * 【独自実装】ランダム方式で位置を決定
 * ※外部プラグインとの連携を考慮し、あえてEnemyではなくBattlerに実装。
 */
Sprite_Battler.prototype.makeAutoPositionAtRandom = function(
        endX, endY, gridCountX, gridCountY, sprites, bestDistance) {
    var distanceList = [];

    for (let i = 0; i < pMaxTryNoForEnemy; i++) {
        // ランダム位置を取得（右下を基準にグリッド座標を計算）
        var randomX = endX - Math.randomInt(gridCountX) * pGridSize;
        var randomY = endY - Math.randomInt(gridCountY) * pGridSize;

        var distanceData = makeDistanceData(
            this, randomX, randomY, sprites, bestDistance);

        // 取得できなかった場合は次へ
        if (!distanceData) {
            continue;
        }

        // 間隔が適切に開いている場合はＯＫ
        if (distanceData.distance >= BattleManager.getDistanceBorder()) {
            // 成功の１件だけ残す
            distanceList = [];
            distanceList.push(distanceData);
            break;
        }

        // ＮＧの場合は候補に追加
        distanceList.push(distanceData);
    }

    return distanceList;
};

/**
 * ●間隔データを作成する。
 */
function makeDistanceData(target, x, y, sprites, bestDistance) {
    // 一時的に座標値を設定
    target.x = x;
    target.y = y;

    // 最小間隔を記録
    let minDistance = 999999;

    // 既に配置を確定した敵との距離評価値を比較
    for (const sprite of sprites) {
        const distance = getDistanceValue(target, sprite);
        // 最小間隔を記録
        if (distance < minDistance) {
            minDistance = distance;
            // 既に記録を下回っている場合
            if (minDistance <= bestDistance) {
                // ループ終了
                return undefined;
            }
        }
    }

    // 候補を作成
    const distanceData = {
        x: x,
        y: y,
        distance: minDistance
    };

    return distanceData;
}

/**
 * 二体の間隔を元に評価値を取得
 * @param {*} a 基準となる敵キャラ
 * @param {*} b 比較対象となる敵キャラ
 */
function getDistanceValue(a, b) {
    let distanceValue = 0;

    // 中央座標を求める
    const ax = a.x;
    const aCenterY = a.y - a.height/2;
    const bx = b.x;
    const bCenterY = b.y - b.height/2;

    // 中心同士の距離を計算
    const distanceCenterX = Math.abs(ax - bx);
    const distanceCenterY = Math.abs(aCenterY - bCenterY);

    // 横幅・縦幅を考慮した距離
    const distanceX = distanceCenterX - (a.width + b.width) / 2;
    const distanceY = distanceCenterY - (a.height + b.height) / 2;

    // 両方がマイナスなら重なっている
    if (distanceX < 0 && distanceY < 0) {
        const aHeadY = a.y - a.height;
        const bHeadY = b.y - b.height;

        // 比較的自然に重なっているパターン
        // ■aの上半分が隠れていない場合
        // ・aの足元座標がbの中央座標より上である。
        // ・かつ、aの中央座標がbの頭上座標より上である。
        // ■または、bの上半分が隠れていない場合
        if ((a.y <= bCenterY && aCenterY <= bHeadY)
                || (b.y <= aCenterY && bCenterY <= aHeadY)) {
            distanceValue = distanceX + distanceY;

        // 不自然な重なり方をしているパターン
        } else {
            // 極力選ばないようにするため、-10000のペナルティ
            // またＹ座標差を*10して、Ｙ座標の変化を優遇する。
            distanceValue = distanceX + distanceY*10 - 10000;
        }

    // それ以外は重なっていない
    } else {
        // ＸＹ共に重なっていない
        if (distanceX >= 0 && distanceY >= 0) {
            // 長いほうの幅を加算
            distanceValue += Math.max((a.width + b.width) / 2, (a.height + b.height) / 2);

        // Ｘ座標だけ重なっていない
        } else if (distanceX >= 0) {
            // Ｙ座標の中心距離を加算
            distanceValue += distanceCenterY;

        // Ｙ座標だけ重なっていない
        } else if (distanceY >= 0) {
            // Ｘ座標の中心距離を加算
            distanceValue += distanceCenterX;
        }

        // 正の値部分のみ加算
        distanceValue += Math.max(distanceX, 0) + Math.max(distanceY, 0);
    }

    return distanceValue;
}

/**
 * ●距離評価値のしきい値を取得する。
 */
BattleManager.getDistanceBorder = function() {
    return eval(pDistanceBorder);
};

/**
 * ●YEP_BattleEngineCoreの競合対策で関数を上書
 */
BattleManager.getSprite = function(battler) {
    // 現在の状態を参照してスプライトを取得する。
    return getBattlerSprite(battler);

    // if (!this._registeredSprites) this._registeredSprites = {};
    // if (battler.isActor()) var id = 100000 + battler.actorId();
    // if (battler.isEnemy()) var id = 200000 + battler.index();
    // return this._registeredSprites[id];
};

/**
 * 指定したバトラーのスプライトを取得する。
 */
function getBattlerSprite(battler) {
    if (!battler || !BattleManager._spriteset) {
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

})();
