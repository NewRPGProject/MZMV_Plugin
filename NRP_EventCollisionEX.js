//=============================================================================
// NRP_EventCollisionEX.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.01 Extends the collision detection for events.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/481944599.html
 *
 * @help Extends the collision detection for events.
 *
 * This is useful for large objects and huge monsters.
 * It also extends the range of event execution by triggers.
 *
 * Note that only squares can be extended.
 * It does not support flexible changes such as circles and crosses.
 * 
 * ■Usage
 * There are three ways to extend the event collision detection.
 * Please use the method that is easiest for you.
 * 
 * ◆SettingList
 * You can register the target file and collision detection
 * in the plugin parameter SettingList.
 * This is convenient because you do not need to register each event.
 * 
 * ◆Note Field
 * Please enter the following in the Note field of the event.
 * 
 * <CollisionEX:?,?,?,?>
 * 
 * Please set a numerical value in the ?.
 * The collision detection will be extended
 * in the following order: down, left, right, up.
 * 
 * ◆Annotations
 * You can also enter the same information
 * in the annotation at the top of the event page.
 * You can switch the status of this annotation for each current page.
 * 
 * In addition, the order of priority is "Annotations > Notes > SettingList".
 * Please note that if the event itself has a collision detection specification,
 * the contents registered in the SettingList will be ignored.
 * 
 * ■Notice
 * This plugin has a relatively large impact.
 * In order to avoid conflicts,
 * it is recommended to place it as high up as possible.
 * 
 * If normal movement of large events is not necessary,
 * turning off "ConsiderEventMove" may stabilize the situation.
 * 
 * Also, the behavior near the boundary of a looping map is
 * I gave up on implementing it
 * because it was too complicated. Sorry.......
 * So, there is no collision detection for the part of the loop
 * that extends beyond the loop.
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 * 
 * @param ConsiderEventMove
 * @type boolean
 * @default true
 * @desc The collision detection is also calculated when a large event moves. Turning it off will reduce the processing.
 * 
 * @param SettingList
 * @type struct<Setting>[]
 * @default []
 * @desc List of settings related to collision detection.
 */
/*~struct~Setting:
 * @param File
 * @type file
 * @dir img/characters
 * @desc A file of character images to extend the collision detection.
 * 
 * @param Index
 * @type number
 * @desc The index value of the image to use (0~7).
 * If blank, all will be used.
 * 
 * @param CollisionDown
 * @type number
 * @desc This is an additional value for downward collision detection.
 * 
 * @param CollisionLeft
 * @type number
 * @desc This is an additional value for leftward collision detection.
 * 
 * @param CollisionRight
 * @type number
 * @desc This is an additional value for rightward collision detection.
 * 
 * @param CollisionUp
 * @type number
 * @desc This is an additional value for upward collision detection.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.01 イベントの当たり判定を拡張する。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/481944599.html
 *
 * @help イベントの当たり判定を拡張します。
 *
 * 大型のオブジェクトや巨大モンスターなどに便利です。
 * トリガーによるイベントの実行範囲も拡張されます。
 * 
 * なお、拡張できる範囲は四角だけです。
 * 円や十字などの柔軟な変更には対応していません。
 * 
 * ■使用方法
 * 三通りの方法によって、イベントの当たり判定を拡張できます。
 * 使いやすい方法をご利用ください。
 * 
 * ◆設定リスト
 * プラグインパラメータの設定リストに、
 * 対象のファイルと当たり判定を登録できます。
 * いちいちイベント毎に登録する必要がないので便利です。
 * 
 * ◆メモ欄
 * イベントのメモ欄に以下を記入してください。
 * 
 * <CollisionEX:?,?,?,?>
 * 
 * ?には数値を設定してください。
 * 下、左、右、上の順番に当たり判定が拡張されます。
 * 
 * ◆注釈
 * また、イベントページ先頭の注釈に同様の記入しても有効となります。
 * こちらは現在のページ毎に状態を切り替えられます。
 * 
 * なお、優先度は『注釈＞メモ欄＞設定リスト』の順番になっています。
 * イベント自体に指定がある場合、設定リストに登録した内容は
 * 無視されますのでご注意ください。
 * 
 * ■注意点
 * 比較的、影響の大きいプラグインです。
 * 競合を避けるため、なるべく上方への配置を推奨します。
 * 
 * 大型イベントの通常移動が不要な場合は、
 * 『大型イベントの移動を考慮』をオフにしておくと安定するかもしれません。
 * 
 * また、ループするマップの境界付近での挙動については、
 * ややこしくて実装を断念しました。すまぬ……。
 * なので、ループの向こうへはみ出している部分には、
 * 当たり判定がありません。
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param ConsiderEventMove
 * @text 大型イベントの移動を考慮
 * @type boolean
 * @default true
 * @desc 大型イベントが移動した際も当たり判定を計算します。
 * オフにすると処理が軽減されます。
 * 
 * @param SettingList
 * @text 設定リスト
 * @type struct<Setting>[]
 * @default []
 * @desc 当たり判定の設定の一覧です。
 */
/*~struct~Setting:ja
 * @param File
 * @text 画像ファイル
 * @type file
 * @dir img/characters
 * @desc 当たり判定を拡張するキャラクター画像のファイルです。
 * 
 * @param Index
 * @text 画像インデックス
 * @type number
 * @desc 使用する画像のインデックス値（0~7）です。
 * 空欄なら全てを対象とします。
 * 
 * @param CollisionDown
 * @text 当たり判定（下）
 * @type number
 * @desc 下方向への当たり判定の加算値です。
 * 
 * @param CollisionLeft
 * @text 当たり判定（左）
 * @type number
 * @desc 左方向への当たり判定の加算値です。
 * 
 * @param CollisionRight
 * @text 当たり判定（右）
 * @type number
 * @desc 右方向への当たり判定の加算値です。
 * 
 * @param CollisionUp
 * @text 当たり判定（上）
 * @type number
 * @desc 上方向への当たり判定の加算値です。
 */

(function() {
"use strict";

/**
 * ●構造体（二重配列）をJSで扱えるように変換
 */
function parseStruct2(arg) {
    var ret = [];

    JSON.parse(arg).forEach(function(str) {
        ret.push(JSON.parse(str));
    });

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

const PLUGIN_NAME = "NRP_EventCollisionEX";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pConsiderMove = toBoolean(parameters["ConsiderEventMove"], true);
const pSettingList = parseStruct2(parameters["SettingList"]);

/**
 * ●効率化のため事前変換
 */
for (const setting of pSettingList) {
    setting.file = setting.File;
    setting.index = toNumber(setting.Index);
    setting.collisionDown = toNumber(setting.CollisionDown, 0);
    setting.collisionLeft = toNumber(setting.CollisionLeft, 0);
    setting.collisionRight = toNumber(setting.CollisionRight, 0);
    setting.collisionUp = toNumber(setting.CollisionUp, 0);
}

//--------------------------------------------------------------
// 基本処理
//--------------------------------------------------------------

/**
 * ●変数初期化
 */
const _Game_CharacterBase_initMembers = Game_CharacterBase.prototype.initMembers;
Game_CharacterBase.prototype.initMembers = function() {
    _Game_CharacterBase_initMembers.apply(this, arguments);

    // 当たり判定初期化
    this._collisionDown = 0;
    this._collisionLeft = 0;
    this._collisionRight = 0;
    this._collisionUp = 0;
}

/**
 * 【独自】画像を設定する。
 * ※Game_CharacterBaseの関数をオーバーライド
 */
const _Game_CharacterBase_setImage = Game_CharacterBase.prototype.setImage;
Game_Event.prototype.setImage = function(
    characterName,
    characterIndex
) {
    _Game_CharacterBase_setImage.apply(this, arguments);

    // 当たり判定初期化
    this._collisionDown = 0;
    this._collisionLeft = 0;
    this._collisionRight = 0;
    this._collisionUp = 0;

    // ページを取得できない場合は処理終了
    if (!this.page()) {
        return;
    }

    //-------------------------------------------
    // 当たり判定をイベントに設定する。
    // 優先度は『注釈＞メモ欄＞画像ファイル名』の順番
    //-------------------------------------------
    let collisionEX = undefined;

    // 注釈欄から読込を行う。
    const list = this.list();
    // 処理が存在する場合
    if (list && list.length > 0) {
        for (const line of list) {
            // 108:注釈開始, 408:注釈続き
            if (line.code == 108 || line.code == 408) {
                // 注釈から<CollisionEX:*>を取得
                collisionEX = getMetaValue(line.parameters[0]);
                // 取得できればイベントに設定
                if (collisionEX != undefined) {
                    setCollision(this, collisionEX);
                    return;
                }

            // それ以外はループ終了
            } else {
                break;
            }
        }
    }

    // メモ欄に、当たり判定の設定があれば反映
    collisionEX = this.event().meta.CollisionEX;
    if (collisionEX != undefined) {
        setCollision(this, collisionEX);
        return;
    }

    // 設定されている画像名から判定
    for (const setting of pSettingList) {
        // 一致する画像名が存在した場合
        if (setting.file == this.characterName()) {
            // インデックスの指定がない場合は常に有効
            if (setting.index == undefined) {
                setCollisionFromSetting(this, setting);
                return;

            // インデックスの指定がある場合
            } else if (setting.index == this.characterIndex()) {
                setCollisionFromSetting(this, setting);
                return;
            }
        }
    }
};

/**
 * ●<CollisionEX>の指定があれば取得
 */
function getMetaValue(note) {
    // 注釈から<CollisionEX:*>を取得
    const strArr = note.match("<CollisionEX:(.+)>");
    // 取得できれば返す
    if (strArr) {
        return strArr[1];
    }
}

/**
 * ●各方向の当たり判定をイベントに設定する。
 */
function setCollision(event, collisionEX) {
    // 下、左、右、上の順番
    const collisionArray = collisionEX.split(",");
    event._collisionDown = toNumber(collisionArray[0]);
    if (collisionArray.length >= 2) {
        event._collisionLeft = toNumber(collisionArray[1]);
    }
    if (collisionArray.length >= 3) {
        event._collisionRight = toNumber(collisionArray[2]);
    }
    if (collisionArray.length >= 4) {
        event._collisionUp = toNumber(collisionArray[3]);
    }
}

/**
 * ●各方向の当たり判定をイベントに設定する。
 * こちらは設定リストから読み込む場合です。
 */
function setCollisionFromSetting(event, setting) {
    // 下、左、右、上の順番
    event._collisionDown = setting.collisionDown;
    event._collisionLeft = setting.collisionLeft;
    event._collisionRight = setting.collisionRight;
    event._collisionUp = setting.collisionUp;
}

/**
 * 【独自】衝突計算用の中央Ｘ座標
 */
Game_CharacterBase.prototype.collisionCenterX = function(x) {
    return x + (this._collisionRight - this._collisionLeft) / 2;
};

/**
 * 【独自】衝突計算用の中央Ｙ座標
 */
Game_CharacterBase.prototype.collisionCenterY = function(y) {
    return y + (this._collisionDown - this._collisionUp) / 2;
};

/**
 * 【独自】衝突計算用の横幅
 */
Game_CharacterBase.prototype.collisionWidth = function() {
    return 1 + this._collisionRight + this._collisionLeft;
};

/**
 * 【独自】衝突計算用の縦幅
 */
Game_CharacterBase.prototype.collisionHeight = function() {
    return 1 + this._collisionUp + this._collisionDown;
};

//--------------------------------------------------------------
// プレイヤーからイベントへの当たり判定
// ※プレイヤーは拡張なしとして計算
//--------------------------------------------------------------

/**
 * 【上書】指定の座標に当たり判定のあるイベントを求める。
 */
Game_Map.prototype.eventsXyNt = function(x, y) {
    return this.events().filter(event => event.posNtCollisionEX(x, y));
};

/**
 * 【独自】該当の座標にすり抜けではないイベントが存在するかどうか？
 * ※当たり判定の拡張を考慮
 */
Game_CharacterBase.prototype.posNtCollisionEX = function(x, y) {
    return !this.isThrough() && this.posCollisionEX(x, y);
};

/**
 * 【独自】該当の座標に一致するかどうか？
 * ※当たり判定の拡張を考慮
 */
Game_CharacterBase.prototype.posCollisionEX = function(x, y) {
    return this._x + this._collisionRight >= x && this.x - this._collisionLeft <= x
            && this._y + this._collisionDown >= y && this._y - this._collisionUp <= y;
};

//--------------------------------------------------------------
// イベントからイベントへの当たり判定
//--------------------------------------------------------------

/**
 * 【上書】指定の座標に当たり判定のあるイベントが存在するか？
 */
Game_Event.prototype.isCollidedWithEvents = function(x, y) {
    const events = this.eventsXyNt(x, y);
    return events.length > 0;
};

/**
 * 【独自】指定の座標に当たり判定のあるイベントを求める。
 */
Game_Event.prototype.eventsXyNt = function(x, y) {
    // Game_Mapと異なり、自分自身は判定から除外する。
    // さもないと、自分の当たり判定で動けなくなる。
    return $gameMap.events().filter(event => event != this && event.posNtCollisionEXEvent(x, y, this));
};

/**
 * 【独自】該当の座標にすり抜けではないイベントが存在するかどうか？
 * ※当たり判定の拡張を考慮
 */
Game_Event.prototype.posNtCollisionEXEvent = function(x, y, event) {
    return !this.isThrough() && this.posCollisionEXEvent(x, y, event);
};

/**
 * 【独自】該当の座標に一致するかどうか？
 * ※当たり判定の拡張を考慮
 */
Game_CharacterBase.prototype.posCollisionEXEvent = function(x, y, event) {
    // 大型イベントの移動を考慮しない場合
    if (!pConsiderMove) {
        return this.posCollisionEX(x, y);
    }

    //-----------------------------------
    // 引数のイベントとの当たり判定を計算
    //-----------------------------------

    // 中央座標を求める
    const aCenterX = this.collisionCenterX(this._x);
    const aCenterY = this.collisionCenterY(this._y);
    const bCenterX = event.collisionCenterX(x);
    const bCenterY = event.collisionCenterY(y);

    // 横幅・縦幅を計算
    const aWidth = this.collisionWidth();
    const aHeight = this.collisionHeight();
    const bWidth = event.collisionWidth();
    const bHeight = event.collisionHeight();

    // 中心同士の距離を計算
    const distanceCenterX = Math.abs(aCenterX - bCenterX);
    const distanceCenterY = Math.abs(aCenterY - bCenterY);

    // 横幅・縦幅を考慮した距離
    const distanceX = distanceCenterX - (aWidth + bWidth) / 2;
    const distanceY = distanceCenterY - (aHeight + bHeight) / 2;

    // 両方がマイナスなら重なっている
    if (distanceX < 0 && distanceY < 0) {
        return true;
    }

    return false;
};

//--------------------------------------------------------------
// イベントからプレイヤー＆フォロワーへの当たり判定
//--------------------------------------------------------------

/**
 * イベントが移動しない想定なら不要
 */
if (pConsiderMove) {
    /**
     * ●プレイヤー＆フォロワーとの衝突判定
     */
    Game_Event.prototype.isCollidedWithPlayerCharacters = function(x, y) {
        // イベントが通常キャラと同じ以外なら処理しない。
        if (!this.isNormalPriority()) {
            return false;
        }

        // プレイヤーがすり抜けなら処理しない。
        if ($gamePlayer.isThrough()) {
            return false;
        }

        // プレイヤーとフォロワーに衝突するかどうか？
        return $gamePlayer.posCollisionEXEvent(x, y, this)
            || $gamePlayer._followers.isSomeoneCollidedExEvent(x, y, this);
    };

    /**
     * 【独自】イベントとフォロワーとの衝突判定
     */
    Game_Followers.prototype.isSomeoneCollidedExEvent = function(x, y, event) {
        return this.visibleFollowers().some(follower => follower.posCollisionEXEvent(x, y, event));
    };
}

//--------------------------------------------------------------
// イベントからマップへの当たり判定
//--------------------------------------------------------------

/**
 * イベントが移動しない想定なら不要
 */
if (pConsiderMove) {
    /**
     * 【独自】イベントからマップへの当たり判定
     * ※Game_CharacterBaseの関数をオーバーライド
     */
    const _Game_Event_canPass = Game_Event.prototype.canPass;
    Game_Event.prototype.canPass = function(x, y, d) {
        const x2 = $gameMap.roundXWithDirection(x, d);
        const y2 = $gameMap.roundYWithDirection(y, d);
        if (!this.isMapValid(x2, y2)) {
            return false;
        }

        return _Game_Event_canPass.apply(this, arguments);
    };

    /**
     * 【独自】イベントの当たり判定を考慮して、マップの有効無効を確認
     */
    Game_Event.prototype.isMapValid = function(x, y) {
        let horizontalOk = false;
        let verticalOk = false;

        // 横ループのマップなら、横チェックは行わない。
        if ($gameMap.isLoopHorizontal()) {
            horizontalOk = true;

        // 横範囲に収まっているか？
        } else if (x - this._collisionLeft >= 0 && x + this._collisionRight < $gameMap.width()) {
            horizontalOk = true;
        }

        // 縦ループのマップなら、縦チェックは行わない。
        if ($gameMap.isLoopVertical()) {
            verticalOk = true;

        // 縦範囲に収まっているか？
        } else if (y - this._collisionUp >= 0 && y + this._collisionDown < $gameMap.height()) {
            verticalOk = true;
        }

        return horizontalOk && verticalOk;
    };

    /**
     * ●イベントからマップへの当たり判定
     * ※イベント限定の機能なのでGame_Eventにしたかったけど、
     * 　『OverpassTile.js』辺りと併用できなくなるのでここに実装。
     */
    const _Game_CharacterBase_isMapPassable = Game_CharacterBase.prototype.isMapPassable;
    Game_CharacterBase.prototype.isMapPassable = function(x, y, d) {
        // イベント以外は元の処理を使用
        if (!this.event) {
            return _Game_CharacterBase_isMapPassable.apply(this, arguments);
        }

        // 先端座標を取得
        const tipX = this.collisionTipX(x, d);
        const tipY = this.collisionTipY(y, d);

        // 先端の移動先座標を取得
        const tipX2 = $gameMap.roundXWithDirection(tipX, d);
        const tipY2 = $gameMap.roundYWithDirection(tipY, d);
        const d2 = this.reverseDir(d);

        return this.isPassableWide(tipX, tipY, d) && this.isPassableWide(tipX2, tipY2, d2);
    };

    /**
     * 【独自】イベントがタイルを通過できるか？
     * ※イベントの進路に対する水平サイズを考慮
     */
    Game_CharacterBase.prototype.isPassableWide = function(x, y, d) {
        // 上下
        if (d === 2 || d === 8) {
            const startX = x - this._collisionLeft;
            const endX = x + this._collisionRight;

            for (let tmpX = startX; tmpX <= endX; tmpX++) {
                // 通行禁止に該当があれば処理終了
                if (!$gameMap.checkPassage(tmpX, y, (1 << (d / 2 - 1)) & 0x0f)) {
                    return false;
                }
            }

            // 通行可能
            return true;

        // 左右
        } else if (d === 4 | d === 6) {
            const startY = y - this._collisionUp;
            const endY = y + this._collisionDown;

            for (let tmpY = startY; tmpY <= endY; tmpY++) {
                // 通行禁止に該当があれば処理終了
                if (!$gameMap.checkPassage(x, tmpY, (1 << (d / 2 - 1)) & 0x0f)) {
                    return false;
                }
            }

            // 通行可能
            return true;
        }

        // とりあえずそのまま
        return $gameMap.checkPassage(x, y, (1 << (d / 2 - 1)) & 0x0f);
    };
}

/**
 * 【独自】衝突時の先端となるＸ座標
 */
Game_CharacterBase.prototype.collisionTipX = function(x, d) {
    // 左
    if (d === 4) {
        x -= this._collisionLeft;

    // 右
    } else if (d === 6) {
        x += this._collisionRight;
    }
    return x;
};

/**
 * 【独自】衝突時の先端となるＹ座標
 */
Game_CharacterBase.prototype.collisionTipY = function(y, d) {
    // 下
    if (d === 2) {
        y += this._collisionDown;

    // 上
    } else if (d === 8) {
        y -= this._collisionUp;
    }
    return y;
};

//--------------------------------------------------------------
// イベント起動
//--------------------------------------------------------------

/**
 * 【上書】マップイベントの起動
 */
Game_Player.prototype.startMapEvent = function(x, y, triggers, normal) {
    if (!$gameMap.isEventRunning()) {
        for (const event of $gameMap.eventsXyCollisionEX(x, y)) {
            if (
                event.isTriggerIn(triggers) &&
                event.isNormalPriority() === normal
            ) {
                event.start();
            }
        }
    }
};

/**
 * 【独自】指定の座標に存在するイベントを求める。
 */
Game_Map.prototype.eventsXyCollisionEX = function(x, y) {
    return this.events().filter(event => event.posCollisionEX(x, y));
};

/**
 * イベントから接触の場合
 * ※イベントが移動しない想定なら不要
 */
if (pConsiderMove) {
    /**
     * 【独自】イベントから接触による起動判定１
     * ※Game_CharacterBaseの関数をオーバーライド
     */
    Game_Event.prototype.checkEventTriggerTouchFront = function(d) {
        // 先端座標を取得
        const tipX = this.collisionTipX(this._x, d);
        const tipY = this.collisionTipY(this._y, d);

        // 先端の向いている座標を取得
        const x2 = $gameMap.roundXWithDirection(tipX, d);
        const y2 = $gameMap.roundYWithDirection(tipY, d);

        // イベント確認＆起動
        this.checkEventTriggerTouchCollisionEX(x2, y2, d);
    };

    /**
     * 【独自】イベントから接触による起動判定２
     */
    Game_Event.prototype.checkEventTriggerTouchCollisionEX = function(x, y, d) {
        if (!$gameMap.isEventRunning()) {
            if (this._trigger === 2 && $gamePlayer.posTriggerTouchCollisionEX(x, y, d, this)) {
                if (!this.isJumping() && this.isNormalPriority()) {
                    this.start();
                }
            }
        }
    };

    /**
     * 【独自】イベントから接触の対象座標に一致するかどうか？
     * ※当たり判定の拡張を考慮
     */
    Game_Player.prototype.posTriggerTouchCollisionEX = function(x, y, d, event) {
        // 進路が上下
        if (d === 2 || d === 8) {
            if (this.y == y) {
                const startX = x - event._collisionLeft;
                const endX = x + event._collisionRight;

                // 該当範囲のＸ座標を確認
                for (let tmpX = startX; tmpX <= endX; tmpX++) {
                    // 該当があればtrue
                    if (this.x == tmpX) {
                        return true;
                    }
                }
            }

        // 進路が左右
        } else if (d === 4 | d === 6) {
            if (this.x == x) {
                const startY = y - this._collisionUp;
                const endY = y + this._collisionDown;

                // 該当範囲のＹ座標を確認
                for (let tmpY = startY; tmpY <= endY; tmpY++) {
                    // 該当があればtrue
                    if (this.y == tmpY) {
                        return true;
                    }
                }
            }
        }
        
        // それ以外は通常の座標一致
        return this.pos(x, y);
    };
}

})();
