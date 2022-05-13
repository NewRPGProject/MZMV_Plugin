//=============================================================================
// NRP_DynamicPixiFilter.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.00 Pixi effects are called from Dynamic plugins.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @base FilterControllerMZ
 * @base NRP_DynamicAnimationMZ
 * @orderAfter NRP_DynamicAnimationMZ
 * @url http://newrpg.seesaa.net/article/487983241.html
 *
 * @help Call Pixi's filter effect function
 * from the DynamicAnimation&Motion plugins.
 * ※Pixi is the library used by default in RPG Maler MV/MZ.
 * 
 * This plugin is also required because
 * it is via the FilterControllerMZ.js (by Tsukimi) function.
 * https://forum.tkool.jp/index.php?threads/4306/
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Once applied, it can be easily called
 * from the DynamicAnimation and Motion plugins.
 * 
 * The easiest effect to handle is "shockwave".
 * Or rather, it is difficult to incorporate anything else into combat,
 * so the following explanations will be based on that assumption.
 * 
 * ◆DynamicAnimation
 * For example, the following will display
 * the shockwave effect simultaneously with the animation.
 * ※If you do not need the animation, just do not set the image.
 * ※By default, the effect is displayed
 *   at the beginning of the animation.
 * -------------------------------------------------------------------
 * <D-Animation>
 * filterType = shockwave
 * </D-Animation>
 * -------------------------------------------------------------------
 * 
 * ◆DynamicMotion
 * The same is true for DynamicMotion.
 * ※The effect is displayed on the motion performer's side by default.
 * -------------------------------------------------------------------
 * <D-Motion>
 * filterType = shockwave
 * </D-Motion>
 * -------------------------------------------------------------------
 * 
 * -------------------------------------------------------------------
 * [Parameters]
 * -------------------------------------------------------------------
 * You can adjust the effect by specifying parameters.
 * Most of the parameters follow FilterControllerMZ.js,
 * so please refer to the explanation there for details.
 * 
 * Parameters are specified as follows.
 * -------------------------------------------------------------------
 * <D-Animation>
 * filterType = shockwave // Type of Effects
 * filterTarget = Battlers // Effects Target
 * filterX = b.width / 2 // X-coordinate
 * filterY = b.height / 2 // Y-coordinate
 * // X,Y,Radius,Amplitude,Wavelength,Brightness
 * filterParameters = [0,0,-1,30,160,1]
 * filterId = 1
 * </D-Animation>
 * -------------------------------------------------------------------
 * See below for details.
 * 
 * ◆filterType
 * Types of filter effects.
 * Basically, you should use "shockwave".
 * 
 * ◆filterTarget
 * The target of the effect.
 * The standard target is the full screen,
 * but the following can also be used.
 * 
 * - Battlers: Only battlers.
 * - Battleback: Battlebackgrounds only
 * - FullScreenWithWindow: Full screen (including windows)
 * 
 * ※The specification of Battlers and Battlebacks
 *   is a function added by this plugin.
 * ※When Battlers are specified,
 *   the origin is the upper left corner of the battler.
 *   Please be careful when changing the coordinates.
 * 
 * ◆filterSpeed
 * The speed of the effect.
 * For shockwave, it is the speed at which the effect spreads.
 * The standard value for shockwave is "0.01", so use that as a reference.
 * If you enter "1" by mistake,
 * it will be too fast and you will not be able to see it.
 * 
 * Also, if you set it to '0', it will remain in place,
 * so You will need to delete it later.
 * 
 * ◆filterX
 * ◆filterY
 * The X and Y coordinates at which the effect will be displayed.
 * May be omitted as it is displayed at the starting point
 * of the animation (or motion performer) by default.
 * 
 * ◆filterParameter
 * Parameters to be passed to FilterControllerMZ.js and Pixi.
 * However, it may be a bit advanced.
 * 
 * For example, in the case of shockwave,
 * 6 parameters are passed as follows.
 * 
 * >　filterParameters = [0,0,-1,30,160,1]
 * ※Values are default settings for FilterControllerMZ.
 * 
 * But you will have to check the meaning of each value against
 * the FilterControllerMZ.js implementation and the Pixi documentation.
 * https://filters.pixijs.download/main/docs/PIXI.filters.ShockwaveFilter.html
 * 
 * In practice, the following order is supported,
 * so adjust to your liking.
 * 
 * ・center(1): X coordinate correction
 * ・center(2): Y coordinate correction
 * ・radius: maximum radius (unlimited below 0)
 * ・amplitude: intensity of fluctuation
 * ・wavelength: magnitude of fluctuation
 * ・Brightness: brightness of the shock wave
 * 
 * The top two need not be changed basically
 * because "filterX" and "filterY" need only be specified.
 * 
 * By the way, since default values are used even if not entered,
 * unnecessary items may be left blank as shown below.
 * >　filterParameters = [,,,,,0]
 * 
 * ◆filterId
 * ID to operate the filter effect.
 * The ID can be a number or a string,
 * but if it is a string, enclose it in "".
 * 
 * Note that this is not necessary if the following deletion
 * or other operations are not performed.
 * ※For shockwave, it will disappear automatically
 * after a period of time, except when the speed is 0.
 * 
 * ◆filterErase
 * Delete the effect of the specified "filterId".
 * For example, the flow is as follows.
 * -------------------------------------------------------------------
 * <D-Animation:wait>
 * filterId = 1
 * filterType = godray
 * </D-Animation>
 * 
 * <D-Animation>
 * filterErase = 1
 * </D-Animation>
 * -------------------------------------------------------------------
 * Also, setting "filterErase = true" will delete all effects.
 * Please note that this applies
 * to all effects called by FilterControllerMZ.js.
 * 
 * @------------------------------------------------------------------
 * @ [Plugin Parameters]
 * @------------------------------------------------------------------
 */

/*:ja
 * @target MZ
 * @plugindesc v1.00 PixiのエフェクトをDynamic系プラグインから呼び出します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @base FilterControllerMZ
 * @base NRP_DynamicAnimationMZ
 * @orderAfter NRP_DynamicAnimationMZ
 * @url http://newrpg.seesaa.net/article/487983241.html
 *
 * @help DynamicAnimation&Motionプラグインから、
 * Pixiのフィルターエフェクト機能を呼び出します。
 * ※PixiとはツクールＭＶ～ＭＺの標準で使用しているライブラリのことです。
 * 
 * FilterControllerMZ.js（Tsukimi様）の機能を経由しているため、
 * こちらのプラグインも必須となります。
 * https://forum.tkool.jp/index.php?threads/4306/
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * 適用すれば、DynamicAnimationおよびMotionプラグインから
 * 簡単に呼び出せるようになります。
 * 
 * 最も扱いやすいエフェクトは『shockwave（衝撃波）』です。
 * ……というか、それ以外を戦闘に組み込むのは難しいので、
 * 以降の解説もそれを前提にします。
 * 
 * ◆DynamicAnimation
 * 例えば、以下でアニメーションと同時に衝撃波のエフェクトが表示されます。
 * ※アニメーションが不要なら画像を設定しなければＯＫです。
 * ※標準ではアニメーションの始点にエフェクトを表示します。
 * -------------------------------------------------------------------
 * <D-Animation>
 * filterType = shockwave
 * </D-Animation>
 * -------------------------------------------------------------------
 * 
 * ◆DynamicMotion
 * DynamicMotionの場合も同じです。
 * ※標準ではモーション実行者側にエフェクトを表示します。
 * -------------------------------------------------------------------
 * <D-Motion>
 * filterType = shockwave
 * </D-Motion>
 * -------------------------------------------------------------------
 * 
 * -------------------------------------------------------------------
 * ■パラメータ
 * -------------------------------------------------------------------
 * パラメータを指定することでエフェクトを調整できます。
 * 大半のパラメータはFilterControllerMZ.jsに準じますので、
 * 詳細はそちらの解説をご確認ください。
 * 
 * パラメータは以下のように指定します。
 * -------------------------------------------------------------------
 * <D-Animation>
 * filterType = shockwave // エフェクトの種類
 * filterTarget = Battlers // エフェクト対象
 * filterX = b.width / 2 // Ｘ座標
 * filterY = b.height / 2 // Ｙ座標
 * filterParameters = [0,0,-1,30,160,1] // X,Y,半径,振幅,波長,明るさ
 * filterId = 1 // ＩＤ
 * </D-Animation>
 * -------------------------------------------------------------------
 * 詳細は下をご覧ください。
 * 
 * ◆filterType
 * フィルターエフェクトの種類です。
 * 基本的には『shockwave』を使っていけばよいと思います。
 * 
 * ◆filterTarget
 * エフェクトをかける対象です。
 * 標準では全画面を対象としますが、その他にも以下が使用できます。
 * 
 * ・Battlers：バトラーのみ
 * ・Battleback：戦闘背景のみ
 * ・FullScreenWithWindow：全画面（ウィンドウ含む）
 * 
 * ※BattlersおよびBattlebackの指定は、当プラグインで追加した機能です。
 * ※Battlersを指定した場合は原点が、バトラーの左上になります。
 * 　座標を変更する場合はご注意ください。
 * 
 * ◆filterSpeed
 * エフェクトの速度です。
 * shockwaveの場合は衝撃波が広がる速度になります。
 * shockwaveの標準値は『0.01』なので、その辺りを基準にしてください。
 * うっかり『1』などを入力すると、早すぎて見えなくなります。
 * 
 * また『0』にした場合はその場に残りますので、
 * 後で削除を行う必要があります。
 * 
 * ◆filterX
 * ◆filterY
 * エフェクトを表示するＸ座標、Ｙ座標です。
 * 標準ではアニメーションの始点（もしくはモーション実行者）に
 * 表示されるため省略しても構いません。
 * 
 * ◆filterParameter
 * FilterControllerMZ.jsおよびPixiに渡すパラメータですが、
 * 少し上級者向けかもしれません。
 * 
 * 例えば、shockwaveの場合、以下のように６つのパラメータを渡しています。
 * 
 * >　filterParameters = [0,0,-1,30,160,1]
 * ※値はFilterControllerMZの標準値
 * 
 * ……が、それぞれの値の意味は、FilterControllerMZ.jsの実装と、
 * Pixiのドキュメントを照らし合わせないと分からないと思います。
 * https://filters.pixijs.download/main/docs/PIXI.filters.ShockwaveFilter.html
 * 
 * 実際には以下の順番で対応していますので、お好みで調整してください。
 * 
 * ・center(1)：Ｘ座標補正
 * ・center(2): Ｙ座標補正
 * ・radius：最大半径（０以下で無制限）
 * ・amplitude：振幅（揺らぎの強さ）
 * ・wavelength：波長（揺らぎの大きさ）
 * ・brightness：明るさ
 * 
 * 上２つは『filterX』『filterY』を指定すればよいので基本は変更不要です。
 * 
 * ちなみに未入力の場合も標準値が使用されるため、
 * 不要な項目は以下のように空白にしても構いません。
 * >　filterParameters = [,,,,,0]
 * 
 * ◆filterId
 * フィルターエフェクトを操作するためのＩＤです。
 * ＩＤは数値でも文字列でも構いませんが、文字列の場合は""で囲ってください。
 * 
 * なお、以下の削除などの操作を行わない場合は不要です。
 * ※shockwaveについては、速度が0の場合を除いて、
 * 　時間経過で自動的に消滅します。
 * 
 * ◆filterErase
 * 指定した『filterId』のエフェクトを削除します。
 * 例えば、以下のような流れになります。
 * -------------------------------------------------------------------
 * <D-Animation:wait>
 * filterId = 1
 * filterType = godray
 * </D-Animation>
 * 
 * <D-Animation>
 * filterErase = 1
 * </D-Animation>
 * -------------------------------------------------------------------
 * また『filterErase = true』にすると、全てのエフェクトを削除します。
 * FilterControllerMZ.jsで呼び出した全てのエフェクトが
 * 対象になるので、ご注意ください。
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

const PLUGIN_NAME = "NRP_DynamicPixiFilter";
const parameters = PluginManager.parameters(PLUGIN_NAME);

//-----------------------------------------------------------------------------
// DynamicAnimation（NRP_DynamicAnimationMZ.js）
//-----------------------------------------------------------------------------

/**
 * ●評価実行（アニメーションを表示する直前に実行される）
 */
const _DynamicAnimation_evaluate = DynamicAnimation.prototype.evaluate;
DynamicAnimation.prototype.evaluate = function (spriteAnimation) {
    _DynamicAnimation_evaluate.apply(this, arguments);

    const base = this.baseAnimation;
    // フィルタータイプとフィルター削除が未設定の場合は処理しない
    if (!base.filterType && !base.filterErase) {
        return;
    }

    // eval参照用
    const a = this.referenceSubject;
    const b = this.referenceTarget;
    const ba = base;
    const da = this;
    const no = this.no;
    const r = this.r;
    const targetNo = this.targetNo;
    const position = this.position;
    const mirroring = this.mirroring;
    const screenX = this.screenX;
    const screenY = this.screenY;
    const defaultX = this.defaultX;
    const defaultY = this.defaultY;
    const sx = this.sx;
    const sy = this.sy;
    const ex = this.ex;
    const ey = this.ey;

    // 座標を取得
    let filterX = sx;
    let filterY = sy;

    //-----------------------------------------------------------
    // 以下はDynamicAnimation&Motionで共通
    //-----------------------------------------------------------
    // 削除する場合
    if (base.filterErase) {
        const erase = eval(base.filterErase);
        // trueなら全削除
        if (erase === true) {
            $gameMap._filterConArr.forEach(fc => fc.erase());
        }
        // 指定ＩＤを削除
        $gameMap.eraseFilter(erase);
        return;
    }

    // ＩＤを設定（未設定時は実行時刻）
    const filterId = eval(setDefault(base.filterId, performance.now()));
    const filterType = base.filterType;
    const filterTarget = base.filterTarget || "FullScreen";
    const filterTargetIds = makeTargesId(base.targets);
    const posRefTargetId = null;

    // 対象がバトラーの場合は対象中央
    // ※バトラーの左上が原点となる。
    if (filterTarget == "Battlers") {
        filterX = b.width / 2;
        filterY = b.height / 2;
    }
    // 指定があれば取得
    filterX = eval(setDefault(base.filterX, filterX));
    filterY = eval(setDefault(base.filterY, filterY));

    // フィルター生成
    $gameMap.createFilter(filterId, filterType, filterTarget, filterTargetIds, posRefTargetId);

    // フィルターコントローラを取得
    const fc = $gameMap.getFilterController(filterId);
    fc.setForcePosition(filterX, filterY);

    // フィルター更新速度設定
    if (base.filterSpeed != null) {
        const filterSpeed = eval(base.filterSpeed);
        $gameMap.setFilterAddiTime(filterId, filterSpeed);
    }

    // フィルターパラメータ設定
    if (base.filterParameters != null) {
        const filterParams = eval(base.filterParameters);
        $gameMap.setFilter(filterId, filterParams);
    }
}

//-----------------------------------------------------------------------------
// DynamicMotion（NRP_DynamicMotionMZ.js）
//-----------------------------------------------------------------------------

/**
 * 【独自】動的モーションの呼び出し
 * ※マップ版と共有するためSpriteに定義する。
 */
const _Sprite_startDynamicMotion = Sprite.prototype.startDynamicMotion;
Sprite.prototype.startDynamicMotion = function(dynamicMotion) {
    _Sprite_startDynamicMotion.apply(this, arguments);

    const base = dynamicMotion.baseMotion;
    // フィルタータイプとフィルター削除が未設定の場合は処理しない
    if (!base.filterType && !base.filterErase) {
        return;
    }

    // 実行用のモーション情報
    const motion = this._setDynamicMotion;

    // eval参照用
    const dm = base;
    const a = dm.referenceSubject;
    const b = motion._referenceTarget;
    const repeat = dm.repeat;
    const r = dm.r;
    const position = dm.position;
    const screenX = motion._screenX;
    const screenY = motion._screenY;
    const defaultX = motion._defaultX;
    const defaultY = motion._defaultY;
    const performerNo = dm.performerNo;
    const targetNo = dm.targetNo;
    const mirroring = motion._mirroring;
    const sx = motion._sx;
    const sy = motion._sy;
    const ex = motion._ex;
    const ey = motion._ey;

    // 座標を取得
    let filterX = a.x;
    let filterY = a.y - a.height / 2;

    //-----------------------------------------------------------
    // 以下はDynamicAnimation&Motionで共通
    //-----------------------------------------------------------
    // 削除する場合
    if (base.filterErase) {
        const erase = eval(base.filterErase);
        // trueなら全削除
        if (erase === true) {
            $gameMap._filterConArr.forEach(fc => fc.erase());
        }
        // 指定ＩＤを削除
        $gameMap.eraseFilter(erase);
        return;
    }

    // ＩＤを設定（未設定時は実行時刻）
    const filterId = eval(setDefault(base.filterId, performance.now()));
    const filterType = base.filterType;
    const filterTarget = base.filterTarget || "FullScreen";
    const filterTargetIds = makeTargesId(base.targets);
    const posRefTargetId = null;

    // 対象がバトラーの場合は対象中央
    // ※バトラーの左上が原点となる。
    if (filterTarget == "Battlers") {
        filterX = b.width / 2;
        filterY = b.height / 2;
    }
    // 指定があれば取得
    filterX = eval(setDefault(base.filterX, filterX));
    filterY = eval(setDefault(base.filterY, filterY));

    // フィルター生成
    $gameMap.createFilter(filterId, filterType, filterTarget, filterTargetIds, posRefTargetId);

    // フィルターコントローラを取得
    const fc = $gameMap.getFilterController(filterId);
    fc.setForcePosition(filterX, filterY);

    // フィルター更新速度設定
    if (base.filterSpeed != null) {
        const filterSpeed = eval(base.filterSpeed);
        $gameMap.setFilterAddiTime(filterId, filterSpeed);
    }

    // フィルターパラメータ設定
    if (base.filterParameters != null) {
        const filterParams = eval(base.filterParameters);
        $gameMap.setFilter(filterId, filterParams);
    }
}

//-----------------------------------------------------------------------------
// Filter_Controller（FilterControllerMZ.js）
//-----------------------------------------------------------------------------

/**
 * 【独自】フィルターの表示位置を強制的に上書き
 */
Filter_Controller.prototype.setForcePosition = function(x, y) {
    this._forceX = x;
    this._forceY = y;
};

/**
 * 【独自】フィルターの対象を強制的に上書き
 */
Filter_Controller.prototype.setForceTargets = function(targets) {
    this._forceTargets = targets;
};

/**
 * ●位置取得
 */
const _Filter_Controller_getCharLoc = Filter_Controller.prototype.getCharLoc;
Filter_Controller.prototype.getCharLoc = function() {
    // 座標指定があれば優先使用
    if (this._forceX != null) {
        return [this._forceX, this._forceY];
    }
    
    return _Filter_Controller_getCharLoc.apply(this, arguments);
};

// targetTypeにBattlers, Battlebackを追加
Filter_Controller.targetType["Battlers"] = "Battlers";
Filter_Controller.targetType["Battleback"] = "Battleback";

const Type = Filter_Controller.targetType;
const targetGetter = Filter_Controller.targetGetter;

/**
 * 【独自】対象にBattlersを追加
 */
targetGetter[Type.Battlers] = function(targetIds) {
    // 対象が指定されている場合は取得して終了
    if (targetIds) {
        const targets = reverseTargesId(targetIds);
        return targets.map(target => getBattlerSprite(target));
    }

    const targets = [];
    if (this._spriteset) {
        this._spriteset.battlerSprites().forEach(sprite => targets.push(sprite));
    }
    return targets;
};

/**
 * 【独自】対象にBattlebackを追加
 */
targetGetter[Type.Battleback] = function(targetIds) {
    const targets = [];
    if (this._spriteset) {
        targets.push(this._spriteset._back1Sprite);
        targets.push(this._spriteset._back2Sprite);
    }
    return targets;
};

//-----------------------------------------------------------------------------
// 共通関数
//-----------------------------------------------------------------------------

/**
 * ●対象を対象ＩＤの配列に変換
 */
function makeTargesId(targets) {
    // 戦闘時以外は無視
    if (!$gameParty.inBattle()) {
        return null;
    }

    const targetsId = [];
    for (const target of targets) {
        // 敵の場合はインデックス+1
        if (target.isEnemy()) {
            targetsId.push(target.index() + 1);
        // アクターの場合は*-1
        } else {
            targetsId.push((target.index() + 1) * -1);
        }
    }
    return targetsId;
}

/**
 * ●対象ＩＤを対象の配列に変換
 */
function reverseTargesId(targetsId) {
    const targets = [];
    for (const targetId of targetsId) {
        // アクターの場合
        if (targetId < 0) {
            targets.push($gameParty.members()[(targetId * -1) - 1]);

        // 敵キャラの場合
        } else {
            targets.push($gameTroop.members()[targetId - 1]);
        }
    }
    return targets;
}

/**
 * ●指定したバトラーのスプライトを取得する。
 */
function getBattlerSprite(battler) {
    if (!battler) {
        return undefined;
    }

    var sprites;
    const spriteset = getSpriteset();

    // 戦闘中はバトラースプライトを返す。
    if ($gameParty.inBattle()) {
        sprites = spriteset.battlerSprites();

    // マップ上ではキャラクタースプライトを返す。
    } else {
        sprites = spriteset._characterSprites;
    }

    // 一致があれば返す
    return sprites.find(s => s._battler == battler || s._character == battler);
}

/**
 * ●現在の画面のSpritesetを取得する。
 */
function getSpriteset() {
    return SceneManager._scene._spriteset;
}

})();
