//=============================================================================
// NRP_DynamicMotionMap.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.04 Call DynamicMotion on the map.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @base NRP_DynamicMotionMZ
 * @base NRP_DynamicAnimationMapMZ
 * @orderAfter NRP_DynamicAnimationMZ
 * @orderAfter NRP_DynamicMotionMZ
 * @orderAfter NRP_DynamicAnimationMapMZ
 * @url http://newrpg.seesaa.net/article/477913000.html
 *
 * @help Call DynamicMotion on the map.
 * You can make your character do things
 * that would normally be difficult to do,
 * such as rotating, zooming, and moving freely.
 * 
 * The following plugins are required for this plugin to work.
 * This plugin itself is valid for both MV and MZ.
 * 
 * NRP_DynamicAnimation or NRP_DynamicAnimationMZ
 * NRP_DynamicMotion or NRP_DynamicMotionMZ
 * NRP_DynamicAnimationMap or NRP_DynamicAnimationMapMZ
 * 
 * This plugin should always be placed below the three plugins above.
 * 
 * Once registered, DynamicMotion is enabled on the map.
 * Call it from the NRP_DynamicAnimationMap plugin command.
 * 
 * For more information, please see below.
 * http://newrpg.seesaa.net/article/477913000.html
 *
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but we will respond to defects as far as possible.
 * 
 * @param NoMultipleMotion
 * @type boolean
 * @desc Simultaneous execution of multiple DynamicMotion instructions for a event is prohibited.
 * @default true
 * 
 * @param RoundCoordinate
 * @type boolean
 * @desc Rounds off if the destination grid coordinates are decimal.
 * Events in decimal coordinates can cause problems.
 * @default true
 * 
 * @param StepOnMove
 * @type select
 * @option ExceptJump
 * @option NoStep
 * @option Always
 * @desc Specifies how to step when moving.
 * If you specify a pattern, the pattern takes precedence.
 * @default ExceptJump
 * 
 * @param PlayerOnScroll
 * @type boolean
 * @desc When the player is activated, the scrolling will follow.
 * If off, the default process is used as it is.
 * @default true
 * 
 * @param <Near>
 * @desc Adjusts the behavior of the approach.
 * This is mainly related to the near (back) template.
 * 
 * @param ConsiderSize
 * @parent <Near>
 * @type boolean
 * @desc Consider the target size when approaching.
 * Off: The size of the object is considered as one grid.
 * @default false
 * 
 * @param RoundTypeNear
 * @parent <Near>
 * @type select
 * @option NoRound
 * @option ApproachTarget
 * @option AwayTarget
 * @desc How to round the grid coordinates when approaching.
 * Adjust when characters move to coordinates such as 10.5.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.04 DynamicMotionをマップ上から起動します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @base NRP_DynamicMotionMZ
 * @base NRP_DynamicAnimationMapMZ
 * @orderAfter NRP_DynamicAnimationMZ
 * @orderAfter NRP_DynamicMotionMZ
 * @orderAfter NRP_DynamicAnimationMapMZ
 * @url http://newrpg.seesaa.net/article/477913000.html
 *
 * @help DynamicMotionをマップ上から起動します。
 * 回転や拡大、自在な移動など通常では困難な動作を
 * キャラクターにさせられます。
 * 
 * このプラグインの動作には、以下のプラグインが必要です。
 * ※このプラグイン自体はＭＶとＭＺの両方で有効です。
 * 
 * NRP_DynamicAnimation または NRP_DynamicAnimationMZ
 * NRP_DynamicMotion または NRP_DynamicMotionMZ
 * NRP_DynamicAnimationMap または NRP_DynamicAnimationMapMZ
 * 
 * ※このプラグインは、上記３つのプラグインよりも必ず下に配置してください。
 * 
 * 登録すれば、マップ上でのDynamicMotionが有効となります。
 * 起動はNRP_DynamicAnimationMapのプラグインコマンドから行います。
 * 
 * 詳細は以下をご覧ください。
 * http://newrpg.seesaa.net/article/477913000.html
 *
 * 【利用規約】
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param NoMultipleMotion
 * @text 重複実行禁止
 * @type boolean
 * @desc イベントに対するDynamicMotionの重複実行を禁止します。
 * これにより想定外の挙動を防止します。
 * @default true
 * 
 * @param RoundCoordinate
 * @text 移動先座標の四捨五入
 * @type boolean
 * @desc 移動先のグリッド座標が小数だった場合、四捨五入します。
 * 小数座標に静止したイベントは通常、操作不可となります。
 * @default true
 * 
 * @param StepOnMove
 * @text 移動時の足踏み
 * @type select
 * @option ジャンプ時以外足踏み @value ExceptJump
 * @option 足踏みなし @value NoStep
 * @option 常に足踏み @value Always
 * @desc 移動時の足踏み方法を指定します。
 * パターンを指定した場合はそちらが優先されます。
 * @default ExceptJump
 * 
 * @param PlayerOnScroll
 * @text プレイヤーのスクロール連動
 * @type boolean
 * @desc プレイヤーを動作させた場合、スクロールを連動させます。
 * オフの場合はデフォルトの処理をそのまま用います。
 * @default true
 * 
 * @param <Near>
 * @text ＜接近時＞
 * @desc 接近時の挙動を調整します。
 * 主にnear(back)テンプレートに関係します。
 * 
 * @param ConsiderSize
 * @parent <Near>
 * @text 対象の大きさを考慮
 * @type boolean
 * @desc 接近時、対象の大きさを考慮します。
 * オフの場合は対象の大きさを１グリッドと見なします。
 * @default false
 * 
 * @param RoundTypeNear
 * @parent <Near>
 * @text 接近時の座標の丸め方
 * @type select
 * @option 何もしない @value NoRound
 * @option 対象に寄せる @value ApproachTarget
 * @option 対象から離す @value AwayTarget
 * @desc 接近時のグリッド座標の丸め方です。
 * 10.5のような座標に移動した際、処理に統一感を出します。
 */

(function() {
"use strict";

function toBoolean(val, def) {
    // 空白なら初期値を返す
    if (val === "" || val === undefined) {
        return def;
        
    // 既にboolean型なら、そのまま返す
    } else if (typeof val === "boolean") {
        return val;
    }
    // 文字列ならboolean型に変換して返す
    return val.toLowerCase() == "true";
}
function setDefault(str, def) {
    return str ? str : def;
}

const PLUGIN_NAME = "NRP_DynamicMotionMap";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pNoMultipleMotion = toBoolean(parameters["NoMultipleMotion"], true);
const pRoundCoordinate = toBoolean(parameters["RoundCoordinate"], true);
const pStepOnMove = setDefault(parameters["StepOnMove"], "ExceptJump");
const pPlayerOnScroll = toBoolean(parameters["PlayerOnScroll"], true);
const pConsiderSize = toBoolean(parameters["ConsiderSize"], false);
const pRoundTypeNear = setDefault(parameters["RoundTypeNear"], "NoRound");

//----------------------------------------
// DynamicMotion対応
//----------------------------------------

/**
 * ●Sprite_Characterの初期化
 */
var _Sprite_Character_initMembers = Sprite_Character.prototype.initMembers;
Sprite_Character.prototype.initMembers = function() {
    _Sprite_Character_initMembers.call(this);

    // モーション情報の追加
    this._motions = [];
    // 実行用モーション情報
    this._setDynamicMotion = [];
    // 空中Ｙ座標
    this._airY = 0;
};

/**
 * 【独自】動的モーションをバトラーからクリアする。
 */
Sprite_Character.prototype.clearDynamicMotions = function() {
    this._motions = [];
};

/**
 * 【独自】動的モーションがリクエストされているか？
 */
Sprite_Character.prototype.isDynamicMotionRequested = function() {
    return this.motions().length > 0;
};

/**
 * 【独自】モーション情報取得
 */
Sprite_Character.prototype.motions = function() {
    return this._motions;
};

/**
 * 【独自】動的モーションを取得する。
 */
Sprite_Character.prototype.shiftDynamicMotion = function() {
    return this.motions().shift();
};

/**
 * 【独自】動的モーションをセットする。
 * NRP_DynamicAnimation.js側から呼び出し。
 */
Game_Character.prototype.setDynamicMotion = function(dynamicMotion) {
    // 処理をSpriteで実行
    // ※Game_Characterは$gameMapのセーブファイルに含まれるため、
    // 　dynamicMotionが保存されないようにする。
    const sprite = getSprite(this);
    sprite.setDynamicMotion(dynamicMotion);
};

/**
 * 【独自】動的アニメーションをSpriteにセットする。
 */
Sprite_Character.prototype.setDynamicMotion = function(dynamicMotion) {
    // DynamicMotion実行中は多重実行禁止！
    // ※movementDurationが１以下ならモーション接続と見なして許可
    if (pNoMultipleMotion && this._movementDuration > 1) {
        return;
    }

    var data = {
        delay: dynamicMotion.targetDelay,
        dynamicMotion: dynamicMotion
    };

    this.motions().push(data);

    // ついでにhomeX, homeYを設定
    // とりあえずテンプレートで使われているため、無効な座標となるのを防止
    // あくまで画面座標なのであまり当てにはなりません……。
    this._homeX = this.x;
    this._homeY = this.y;
    // グリッド座標も設定
    this._homeGx = this._character.x;
    this._homeGy = this._character.y;
};

/**
 * 【独自】動的モーションの実行
 */
Sprite_Character.prototype.updateDynamicMotion = function() {
    // モーション実行中ならば、時間カウント-1
    if (this.isMotionPlaying()) {
        this._dynamicMotionDuration--;
    }
    
    const spriteset = getSpriteset();
    // DynamicAnimationと同タイミングで実行するため、準備完了まで待つ。
    if (!spriteset || !spriteset._isDynamicAnimationReady) {
        return;
    }

    // delayの昇順でソートする。
    if (this.isDynamicMotionRequested()) {
        this.motions().sort(function(a, b) {
            return a.delay - b.delay;
        });
    }

    // 実行モーションの設定があれば処理
    while (this.isDynamicMotionRequested()) {
        // 次に処理されるモーション情報
        const nextMotion = this.motions()[0];

        // 前のアニメーションがウェイト対象の場合
        if (this.isWaitAnimationMotion(nextMotion.dynamicMotion)) {
            // 処理終了（時間も進めない）
            return;
        }

        // まだ時間でない場合は処理しない
        if (nextMotion.delay > 0) {
            // 時間経過へ
            break;
        }

        // 実行条件を満たしたのでshift（先頭を削除＆取得）する。
        var data = this.shiftDynamicMotion();

        var dynamicMotion = data.dynamicMotion;
        // モーション実行時間を設定
        // モーション実行時間が未設定、または新規モーションが現在のモーションより長い
        if (!this._dynamicMotionDuration || dynamicMotion.maxDuration > this._dynamicMotionDuration) {
            this._dynamicMotionDuration = dynamicMotion.maxDuration;
        }
        // 動的モーションを開始する。
        this.startDynamicMotion(dynamicMotion);
    }

    // 時間経過
    for (const motion of this.motions()) {
        motion.delay--;
    }
};

/**
 * 【独自】動的モーションの呼び出し
 * ※Sprite.prototype.startDynamicMotionを継承
 */
const _Sprite_Character_startDynamicMotion = Sprite_Character.prototype.startDynamicMotion;
Sprite_Character.prototype.startDynamicMotion = function(dynamicMotion) {
    var bm = dynamicMotion.baseMotion;
    var dm = dynamicMotion;
    const motion = this._setDynamicMotion;

    // 方向指定
    if (dm.direction != undefined) {
        motion.evalDirection = dm.direction;
    }
    // パターン指定
    if (dm.pattern != undefined) {
        motion.evalPattern = dm.pattern;
    }

    // 元処理実行
    _Sprite_Character_startDynamicMotion.apply(this, arguments);

    // イベント注釈から自動起動した場合
    if (dynamicMotion.isDynamicAuto) {
        // 実行時間を設定
        let dynamicDuration = 0;
        if (this._character.dynamicDuration) {
            dynamicDuration = this._character.dynamicDuration;
        }
        let waitDuration = 0;
        if (dynamicMotion.waitDuration) {
            waitDuration = dynamicMotion.waitDuration;
        }
        // より長いほうを採用
        this._character.dynamicDuration = Math.max(waitDuration, dynamicDuration);
    }
};

/**
 * 【独自】DynamicAnimationが実行中かどうか確認
 * ※DynamicAnimationMapの処理に追記
 */
const _Game_Interpreter_isDynamicAnimationPlaying = Game_Interpreter.prototype.isDynamicAnimationPlaying;
Game_Interpreter.prototype.isDynamicAnimationPlaying = function() {
    // リクエスト中のDynamicMotionを検索
    // ※最終ターゲットがリクエスト情報を持っているかどうか
    if (this.isRequestMotion(this._lastAnimationTarget)) {
        return true;

    // さらに行動主体がリクエスト情報を持っているかどうか
    } else if (this.isRequestMotion(this._subject)) {
        return true;
    }

    // DynamicAnimationMapの同処理へ
    return _Game_Interpreter_isDynamicAnimationPlaying.apply(this, arguments);
};

/**
 * ●指定のキャラクターがモーションリクエストを持っているかどうか
 */
Game_Interpreter.prototype.isRequestMotion = function(character) {
    if (!character) {
        return false;
    }

    const sprite = getSprite(character);
    if (sprite) {
        for (const motion of sprite.motions()) {
            const dm = motion.dynamicMotion;
            // interpreterが一致（呼び出したイベントが一致）
            if (dm && this == dm.interpreter) {
                // 実行中と判定
                return true;
            }
        }
    }
    return false;
};

/**
 * 【独自】絶対座標での移動を行う。
 */
Sprite_Character.prototype.startMoveDynamic = function(x, y, duration) {
    const dm = this.dynamicMotion;
    const character = this._character;
    // 実行用のモーション情報
    const motion = this._setDynamicMotion;

    // 全体時間の保持
    this._allDuration = duration;

    // 絶対座標を相対座標へ変換し、移動実行。
    var offsetX = x - this.x;
    var offsetY = y - this.y - character.jumpHeight(); // 空中Ｙ座標分を調整

    // 開始時の空中Ｙ座標
    this._startAirY = this._airY;

    // 移動先のグリッドを指定
    character._x += offsetX / $gameMap.tileWidth();
    character._y += offsetY / $gameMap.tileHeight();
    
    // 最後の移動ならば整数座標に調整
    // ※整数以外の座標に移動してしまうと操作を受けつけなくなるため
    if (pRoundCoordinate && this.isEndMoveDynamic()) {
        character._x = Math.round(character._x);
        character._y = Math.round(character._y);
    }

    this._movementDuration = duration;
    if (duration === 0) {
        this._airY = this._targetAirY;
    }

    /**
     * ■足踏みの設定
     * 歩行アニメがオン
     * かつパターンの指定がない
     */
    if (character.hasWalkAnime() && !motion.evalPattern) {
        // 停止
        character.updateStop();

        // 座標移動がある場合のみ対象
        if (character._x != character._realX || character._y != character._realY) {
            // ジャンプ以外
            if (pStepOnMove == "ExceptJump") {
                if (!motion._arcY) {
                    // 停止状態リセット→歩行開始
                    character.resetStopCount();
                }
            // 常に歩行の場合
            } else if (pStepOnMove == "Always") {
                character.resetStopCount();
            }
        }
    }

    // 描画更新
    this.updatePosition();
};

/**
 * 【独自】最後の移動かどうかを判定
 */
Sprite_Character.prototype.isEndMoveDynamic = function() {
    // durationを保有する命令があるかどうか？
    const hasDuration = this.motions().some(function(m) {
        return m.dynamicMotion.duration != undefined;
    });
    // 命令がない場合は最後の移動と見なす
    if (!hasDuration) {
        return true;
    }
    return false;
}

/**
 * 【独自】終了待機中のアニメーションがあれば待つ
 */
Sprite_Character.prototype.isWaitAnimationMotion = function(dynamicMotion) {
    // 実行中のウェイト対象アクションがあれば番号を取得
    const waitActionNo = getSpriteset()._waitActionNo;
    if (waitActionNo) {
        // 現在実行中のアクションより番号が小さいアクションが実行中ならば終了を待つ
        if (waitActionNo < dynamicMotion.actionNo) {
            return true;
        }
    }
    return false;
}

/**
 * 【独自】モーション実行中の判定。
 */
Sprite_Character.prototype.isMotionPlaying = function() {
    return this._dynamicMotionDuration > 0;
};

/**
 * ●位置更新
 */
var _Sprite_Character_updatePosition = Sprite_Character.prototype.updatePosition;
Sprite_Character.prototype.updatePosition = function() {
    // NRP_DynamicMotionの関数を呼び出し
    if (this._movementDuration > 0) {
        this.updateDynamicMove();
        // 動作中は通常の座標表示を行わない
        return;
    }

    // 通常の表示
    _Sprite_Character_updatePosition.apply(this, arguments);
};

/**
 * ●DynamicMotion用バトラーの移動更新
 * ※Sprite.prototype.updateDynamicMoveを継承
 */
const _Sprite_Character_updateDynamicMove = Sprite_Character.prototype.updateDynamicMove;
Sprite_Character.prototype.updateDynamicMove = function() {
    _Sprite_Character_updateDynamicMove.apply(this, arguments);

    const motion = this._setDynamicMotion;
    const character = this._character;

    // スクロール差分を調整
    const onScroll = motion.onScroll;
    if (onScroll) {
        motion.scrollSx -= $gameMap.moveScreenX();
        motion.scrollSy -= $gameMap.moveScreenY();
    }
    const sx = motion.scrollSx;
    const sy = motion.scrollSy;

    const dm = this.dynamicMotion;
    const t = this.getDynamicMotionTime(); // 現在の経過時間
    const et = this.getDynamicMotionEndTime(); // 終了時間

    const targetX = character.targetScreenX();
    const targetY = character.targetScreenY();
    this.x = sx + (targetX - sx) * t/et;
    this.y = sy + (targetY - sy) * t/et;

    // DynamicMotion用バトラーの位置補正
    this.updateDynamicPosition();

    // 不透明度
    // Game_Character側の設定が優先されるので反映
    character.setOpacity(this.opacity);

    // 向き
    if (motion.evalDirection != undefined) {
        this.setDynamicDirection(motion.evalDirection);
    }
    // パターン
    if (motion.evalPattern != undefined) {
        character.setPattern(eval(motion.evalPattern));
        // パターンの自動更新を停止
        character._animationCount = 0;
    }

    this._movementDuration--;
    if (this._movementDuration === 0) {
        // 実座標を更新する。
        character._realX = character._x;
        character._realY = character._y;

        // プレイヤーの場合はスクロール位置を調整
        if (pPlayerOnScroll && character == $gamePlayer) {
            character.center(this.decimalMapX(), this.decimalMapY());
        }

        // DynamicMotion用の移動終了
        this.onDynamicMoveEnd();

        // 通常の座標表示
        _Sprite_Character_updatePosition.apply(this, arguments);
    }
}

/**
 * ●移動更新
 */
const _Game_CharacterBase_updateMove = Game_CharacterBase.prototype.updateMove;
Game_CharacterBase.prototype.updateMove = function() {
    if (pPlayerOnScroll) {
        const sprite = getSprite(this);
        // モーション実行中なら表示座標に実体座標を合わせる
        // ※プレイヤーのスクロール位置に影響
        if (sprite.isMotionPlaying()) {
            this._realX = sprite.decimalMapX();
            this._realY = sprite.decimalMapY();

            if (!this.isMoving()) {
                this.refreshBushDepth();
            }
            return;
        }
    }

    _Game_CharacterBase_updateMove.apply(this, arguments);
};

/**
 * 【独自】マップＸ座標を小数で取得する。
 */
Sprite_Character.prototype.decimalMapX = function() {
    return $gameMap.canvasToDecimalMapX(this.x - $gameMap.tileWidth() / 2);
}

/**
 * 【独自】マップＹ座標を小数で取得する。
 */
Sprite_Character.prototype.decimalMapY = function() {
    return $gameMap.canvasToDecimalMapY(this.y
        - $gameMap.tileHeight()
        + 6 // なぜか６ピクセルずれるので調整（数値根拠不明）
        + this._character.jumpHeight());
}

/**
 * 【独自】向きの指定
 */
Sprite_Character.prototype.setDynamicDirection = function(val) {
    const dm = this.dynamicMotion;
    // eval参照用
    var a = dm.referenceSubject;
    var b = dm.referenceTarget;

    var t = this.getDynamicMotionTime(); // 現在の経過時間
    var et = this.getDynamicMotionEndTime(); // 終了時間

    // 注釈や空白は不要なので除去
    val = val.split("//")[0].trim();
    // 文字列を方向数値へ変換
    val = strToDirection(val);
    // 数式
    val = eval(val);
    // 数式で向きを指定された場合を考慮し再度変換
    val = strToDirection(val);

    this._character.setDirection(val);
}

/**
 * ●文字列を方向数値へ変換する。
 *  2:下 4:左 6:右 8:上
 */
function strToDirection(val) {
    // 文字列を数字変換
    if (typeof (val) == "string") {
        switch (val.toLowerCase()) {
            case "down":
                val = 2;
                break;
            case "left":
                val = 4;
                break;
            case "right":
                val = 6;
                break;
            case "up":
                val = 8;
                break;
        }
    }
    return val;
}

/**
 * ●ジャンプの高さ
 */
const _Game_CharacterBase_jumpHeight = Game_CharacterBase.prototype.jumpHeight;
Game_CharacterBase.prototype.jumpHeight = function() {
    const sprite = getSprite(this);

    if (sprite) {
        // 空中座標指定がある場合はそちらを優先
        const airY = sprite.rollAirY();
        if (airY) {
            // 符号反転
            return airY * -1;
        }
    }

    return _Game_CharacterBase_jumpHeight.apply(this, arguments);
};

/**
 * 【独自】DynamicMotion用バトラーの位置補正
 * ※Sprite.prototype.updateDynamicPositionを継承
 */
const _Sprite_Character_updateDynamicPosition = Sprite_Character.prototype.updateDynamicPosition;
Sprite_Character.prototype.updateDynamicPosition = function() {
    _Sprite_Character_updateDynamicPosition.apply(this, arguments);

    const motion = this._setDynamicMotion;
    // 空中にいて、かつＺ座標の指定がない場合は加算
    if (this._airY && motion._evalZ === undefined) {
        this.z = this._character.screenZ() + 0.1;
    }
}

/**
 * 【独自】移動先の画面Ｘ座標を取得
 */
Game_CharacterBase.prototype.targetScreenX = function() {
    const tw = $gameMap.tileWidth();
    return Math.floor($gameMap.adjustX(this._x) * tw + tw / 2);
};

/**
 * 【独自】移動先の画面Ｙ座標を取得
 */
Game_CharacterBase.prototype.targetScreenY = function() {
    const th = $gameMap.tileHeight();
    return Math.floor(
        $gameMap.adjustY(this._y) * th + th - this.shiftY()
    );
};

//----------------------------------------
// テンプレート用の補助関数
//----------------------------------------

/**
 * 【独自】モーション主体から見て直近の対象の隣接Ｘ座標を求める
 */
Sprite_Character.prototype.nearX = function(b, position) {
    const coordinates = this.getNearCoordinate(b);
    return coordinates.x;
};

/**
 * 【独自】モーション主体から見て直近の対象の隣接Ｙ座標を求める
 */
Sprite_Character.prototype.nearY = function(b, position) {
    const coordinates = this.getNearCoordinate(b);
    // 頭上の場合
    if (position === 0) {
        coordinates.y = coordinates.y - b.height / 2 - this.height / 2;
    }
    return coordinates.y;
};

/**
 * 【独自】対象のＸ座標を求める
 */
Sprite_Character.prototype.crashX = function(b, position) {
    return b.x;
};

/**
 * 【独自】対象のＹ座標を求める
 */
Sprite_Character.prototype.crashY = function(b, position) {
    let y = b.y;
    // 頭上の場合
    if (position === 0) {
        y = y - b.height;
    }
    return y;
};

/**
 * 【独自】モーション主体から見て最遠の対象の隣接Ｘ座標を求める
 */
Sprite_Character.prototype.backX = function(b, position) {
    const coordinates = this.getBackCoordinate(b);
    return coordinates.x;
};

/**
 * 【独自】モーション主体から見て最遠の対象の隣接Ｙ座標を求める
 */
Sprite_Character.prototype.backY = function(b, position) {
    const coordinates = this.getBackCoordinate(b);
    // 頭上の場合
    if (position === 0) {
        coordinates.y = coordinates.y - b.height / 2 - this.height / 2;
    }
    return coordinates.y;
};

/**
 * 【独自】モーション主体から見て対象が隣接しているかどうか？
 * ※positionは使わないが一応残しておく。
 */
Sprite_Character.prototype.isAdjacent = function(b, position) {
    const coordinates = this.getNearCoordinate(b);
    return this.x == coordinates.x && this.y == coordinates.y;
};

/**
 * 【独自】aに最も近いbの隣接座標を求める。
 */
Sprite_Character.prototype.getNearCoordinate = function(b) {
    const a = this;

    // グリッドサイズを対象サイズとして扱う
    let widthA = $gameMap.tileWidth();
    let widthB = $gameMap.tileWidth();
    let heightA = $gameMap.tileHeight();
    let heightB = $gameMap.tileHeight();

    // 実際のサイズを見る
    if (pConsiderSize) {
        widthA = a.width;
        widthB = b.width;
        heightA = a.height;
        heightB = b.height;
    }

    // 現在地が既に対象の懐の場合はそのまま返す
    // ※縦側は足元が基準点なので調整
    if (Math.abs(a.x - b.x) < (widthA + widthB) / 2
        && Math.abs(a.y - heightA/2 - (b.y - heightB/2)) < (heightA + heightB) / 2) {
        const now = [];
        now.x = a.x;
        now.y = a.y;
        return now;
    }

    // bに隣接する４座標を配列化
    const coordinates = getAdjacentCoordinates(a, b);

    // 配列の中で最もaに近い座標を求める
    const coordinate =  coordinates.sort(function(c1, c2) {
        return (Math.pow(c1.x - a.x, 2) + Math.pow(c1.y - a.y, 2))
            - (Math.pow(c2.x - a.x, 2) + Math.pow(c2.y - a.y, 2));
    })[0];

    return adjustCoordinate(a, b, coordinate);
};

/**
 * 【独自】aに最も遠いbの隣接座標を求める。
 */
Sprite_Character.prototype.getBackCoordinate = function(b) {
    const a = this;

    // bに隣接する４座標を配列化
    const coordinates = getAdjacentCoordinates(a, b);

    // 配列の中で最もaに遠い座標を求める
    const coordinate =  coordinates.sort(function(c1, c2) {
        return (Math.pow(c1.x - a.x, 2) + Math.pow(c1.y - a.y, 2))
            - (Math.pow(c2.x - a.x, 2) + Math.pow(c2.y - a.y, 2));
    })[coordinates.length - 1];

    return adjustCoordinate(a, b, coordinate, true);
};

/**
 * ●対象（b）に隣接する４座標を配列化
 */
function getAdjacentCoordinates(a, b) {
    // グリッドサイズを対象サイズとして扱う
    let widthA = $gameMap.tileWidth();
    let widthB = $gameMap.tileWidth();
    let heightA = $gameMap.tileHeight();
    let heightB = $gameMap.tileHeight();

    // 実際のサイズを見る
    if (pConsiderSize) {
        widthA = a.width;
        widthB = b.width;
        heightA = a.height;
        heightB = b.height;
    }

    const coordinates = [];
    // 上
    const up = [];
    up.x = b.x;
    up.y = b.y - heightB;
    // 下
    const down = [];
    down.x = b.x;
    down.y = b.y + heightA;
    // 左
    const left = [];
    left.x = b.x - (widthA + widthB) / 2;
    left.y = b.y;
    // 右
    const right = [];
    right.x = b.x + (widthA + widthB) / 2;
    right.y = b.y;
    // 格納
    coordinates.push(up);
    coordinates.push(down);
    coordinates.push(left);
    coordinates.push(right);

    return coordinates;
}

/**
 * ●対象との位置で座標を微調整する。
 */
function adjustCoordinate(a, b, coordinate, mirror) {
    // 丸めない場合はそのまま
    if (!pRoundCoordinate) {
        return coordinate;
    }

    let add = 1;
    let sub = -1;
    // ミラー状態なら符号反転
    if (mirror) {
        add *= -1;
        sub *= -1;
    }

    // 座標が半グリッドだった場合は調整
    // Ｘ座標
    if ($gameMap.canvasToDecimalMapX(coordinate.x) % 1 === 0) {
        if (pRoundTypeNear == "ApproachTarget") {
            if (b.x - a.x > 0) {
                coordinate.x += add;
            } else if (b.x - a.x < 0) {
                coordinate.x += sub;
            }
        } else if (pRoundTypeNear == "AwayTarget") {
            if (b.x - a.x > 0) {
                coordinate.x += sub;
            } else if (b.x - a.x < 0) {
                coordinate.x += add;
            }
        }
    }

    // Ｙ座標
    if ($gameMap.canvasToDecimalMapY(coordinate.y) % 1 === 0) {
        if (pRoundTypeNear == "ApproachTarget") {
            if (b.y - a.y > 0) {
                coordinate.y += add;
            } else if (b.y - a.y < 0) {
                coordinate.y += sub;
            }
        } else if (pRoundTypeNear == "AwayTarget") {
            if (b.y - a.y > 0) {
                coordinate.y += sub;
            } else if (b.y - a.y < 0) {
                coordinate.y += add;
            }
        }
    }

    return coordinate;
}

/**
 * 【独自】マップ座標（Ｘ）を小数で返す
 */
Game_Map.prototype.canvasToDecimalMapX = function(x) {
    const tileWidth = this.tileWidth();
    const originX = this._displayX * tileWidth;
    const mapX = (originX + x) / tileWidth;
    return this.roundX(mapX);
};

/**
 * 【独自】マップ座標（Ｙ）を小数で返す
 */
Game_Map.prototype.canvasToDecimalMapY = function(y) {
    const tileHeight = this.tileHeight();
    const originY = this._displayY * tileHeight;
    const mapY = (originY + y) / tileHeight;
    return this.roundY(mapY);
};

/**
 * 【独自】対象の方向を取得
 */
Sprite_Character.prototype.turnTowardDirection = function(sprite) {
    const characterA = this._character;
    const characterB = sprite._character;
    const sx = characterA.deltaXFrom(characterB.x);
    const sy = characterA.deltaYFrom(characterB.y);
    if (Math.abs(sx) > Math.abs(sy)) {
        return sx > 0 ? 4 : 6;
    } else if (sy !== 0) {
        return sy > 0 ? 8 : 2;
    }
    // それ以外はそのまま
    return characterA._direction;
};

/**
 * 【独自】対象の反対方向を取得
 */
Sprite_Character.prototype.turnAwayDirection = function(sprite) {
    const characterA = this._character;
    const characterB = sprite._character;
    const sx = characterA.deltaXFrom(characterB.x);
    const sy = characterA.deltaYFrom(characterB.y);
    if (Math.abs(sx) > Math.abs(sy)) {
        return sx > 0 ? 6 : 4;
    } else if (sy !== 0) {
        return sy > 0 ? 2 : 8;
    }
    // それ以外はそのまま
    return characterA._direction;
};

/**
 * 【独自】対象のほうを向く
 * ※Game_Characterの同名関数を移植
 */
Sprite_Character.prototype.turnTowardCharacter = function(sprite) {
    characterA.setDirection(this.turnTowardDirection(sprite));
};

/**
 * 【独自】対象の反対を向く
 * ※Game_Characterの同名関数を移植
 */
Sprite_Character.prototype.turnAwayFromCharacter = function(sprite) {
    characterA.setDirection(this.turnAwayDirection(sprite));
};

//----------------------------------------
// シーン切替時の情報保持
//----------------------------------------

/**
 * ●場所移動
 */
const _Scene_Map_updateTransferPlayer = Scene_Map.prototype.updateTransferPlayer;
Scene_Map.prototype.updateTransferPlayer = function() {
    if ($gamePlayer.isTransferring()) {
        // 場所移動したので保存データをクリア
        clearTempData();
    }

    _Scene_Map_updateTransferPlayer.apply(this, arguments);
};

/**
 * ●シーン変更
 */
const _SceneManager_changeScene = SceneManager.changeScene;
SceneManager.changeScene = function() {
    if (this.isSceneChanging() && !this.isCurrentSceneBusy()) {
        // Scene_Mapから移動する場合
        if (this._scene && this._scene instanceof Scene_Map) {
            // 場所移動時は保存データクリア
            if ($gamePlayer.isTransferring()) {
                clearTempData();
            // アニメーション状態を保持
            } else {
                this._scene._spriteset.saveMotionTempData();
            }
        }
    }

    _SceneManager_changeScene.apply(this, arguments);
};

/**
 * 【独自】モーション維持用の一時データを保存する。
 */
Spriteset_Map.prototype.saveMotionTempData = function() {
    // モーションを保持する場合
    if (Nrp.pKeepAnimation) {
        // モーションを保持するキャラクタースプライトを$gameTempに保持しておく
        $gameTemp.motionSprites = this._characterSprites.filter(function(sprite) {
            // DynamicMotionを実行中、またはリクエスト中の場合
            if (sprite.isMotionPlaying() || sprite.isDynamicMotionRequested()) {
                // 情報を保持する。
                // ※これらはシーンをまたいで保持できないため別扱い
                sprite.keepData = [];
                sprite.keepData.rotation = sprite.rotation;
                sprite.keepData.scale = sprite.scale;
                sprite.keepData.opacity = sprite.opacity;
                sprite.keepData.anchor = sprite.anchor;

                return sprite;
            }
        });

        // DynamicMotionのリクエスト情報を$gameTempに保持しておく
        $gameTemp.motionsMap = new Map();
        for (const sprite of this._characterSprites) {
            if (sprite.isDynamicMotionRequested()) {
                // メニューからの復帰用に対象を保持する。
                // 対象ＩＤを取得（DynamicAnimationMap側で定義した関数）
                const targetId = this.getSaveDynamicTargetId(sprite._character);
                // 対象ＩＤをキーにしてマッピング
                $gameTemp.motionsMap.set(targetId, sprite.motions());
            }
        }
    }
};

/**
 * ●マップスプライトの初期化
 */
const _Spriteset_Map_initialize = Spriteset_Map.prototype.initialize;
Spriteset_Map.prototype.initialize = function() {
    _Spriteset_Map_initialize.apply(this, arguments);

    // モーション情報を再生成する。
    this.createMotions();
};

/**
 * 【独自】モーション情報の引継
 */
Spriteset_Map.prototype.createMotions = function() {
    // $gameTempから読み出して再設定
    if ($gameTemp.motionSprites) {
        for (const oldSprite of $gameTemp.motionSprites) {
            // 保存時とは別のオブジェクトになっているのでＩＤから再取得
            const newSprite = this.getNewSprite(oldSprite);
            // 値を引き継ぐ
            newSprite.setSceneKeepData(oldSprite);
        }
    }

    // モーションのリクエストが存在する。
    if ($gameTemp.motionsMap && $gameTemp.motionsMap.size > 0) {
        // 対象ＩＤを元に対象のスプライトへ、モーションの順次実行情報を再設定する。
        for (const targetId of $gameTemp.motionsMap.keys()) {
            const sprite = this.getSpriteFromTargetId(targetId);
            if (sprite) {
                sprite._motions = $gameTemp.motionsMap.get(targetId);
            }
        }

        // リクエスト再開
        this._requestDynamicAnimation = true;
    }

    // 保存データをクリア
    clearTempData();
};

/**
 * 【独自】シーンをまたいで引き継ぐデータをセットする。
 */
Sprite_Character.prototype.setSceneKeepData = function(sprite) {
    this._setDynamicMotion = sprite._setDynamicMotion;
    this.dynamicMotion = sprite.dynamicMotion;
    
    this._dynamicMotionDuration = sprite._dynamicMotionDuration;
    this._allDuration = sprite._allDuration;
    this._movementDuration = sprite._movementDuration;
    this._airY = sprite._airY;
    this._startAirY = sprite._startAirY;
    this._targetAirY = sprite._targetAirY;
    this._homeX = sprite._homeX;
    this._homeY = sprite._homeY;
    this._homeGx = sprite._homeGx;
    this._homeGy = sprite._homeGy;

    this.rotation = sprite.keepData.rotation;
    this.scale = sprite.keepData.scale;
    this.opacity = sprite.keepData.opacity;
    this.anchor = sprite.keepData.anchor;
}

/**
 * ●アニメーション保存用の一時データをクリアする。
 */
function clearTempData() {
    $gameTemp.motionSprites = undefined;
    $gameTemp.motionsMap = undefined;
}

//----------------------------------------
// 共通関数
//----------------------------------------

/**
 * 【独自】本体スプライトを取得
 */
Sprite_Character.prototype.mainSprite = function() {
    return this;
};

/**
 * ●キャラクターからスプライトを取得する。
 */
function getSprite(character) {
    const spriteset = getSpriteset();
    if (!spriteset) {
        return undefined;
    }

    // マップ上ではキャラクタースプライトを返す。
    if (!$gameParty.inBattle()) {
        const sprites = spriteset._characterSprites;
        return sprites.find(function(sprite) {
            return sprite._character == character;
        });

    // 戦闘中はバトラースプライトを返す。
    } else  {
        const sprites = spriteset.battlerSprites();
        return sprites.find(function(sprite) {
            return sprite._battler == character;
        });
    }
}

/**
 * ●現在の画面のSpritesetを取得する。
 */
function getSpriteset() {
    return SceneManager._scene._spriteset;
}

})();
