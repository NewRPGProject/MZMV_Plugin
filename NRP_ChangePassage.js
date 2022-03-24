//=============================================================================
// NRP_ChangePassage.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Change the event's passage determination.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @orderAfter NRP_EventCollisionEX
 * @url http://newrpg.seesaa.net/article/486134190.html
 *
 * @help Change the event's passage determination.
 * You can create birds flying in the sky,
 * fish swimming in the water, etc.
 * 
 * Can be fine-tuned for terrain tag, region ID,
 * tile ID and autotile type.
 * ※For checking tile ID and autotile type,
 *   NRP_DebugTile.js is useful.
 * 
 * It also allows "Below characters" and "Above characters" events
 * to collide with the player.
 * This allows for the creation of bird-based enemies
 * (symbolic encounters), etc., that ignore obstacles
 * and come into contact with the player.
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Set the passage information in the "PassageTypeList" plugin parameter.
 * 
 * The registered "TypeId" is tied by entering it
 * in the event's note field as shown below.
 * 
 * <ChangePassage:[TypeId]>
 * 
 * Passage decisions set in "PassageList" can also be tied to tilesets.
 * Please enter "PassageId" in the note field of the tileset.
 * 
 * <ChangePassageTile:[PassageId]>
 * 
 * If "PassageId" is left blank, it is valid for all tilesets.
 * 
 * -------------------------------------------------------------------
 * [Sample]
 * -------------------------------------------------------------------
 * The following settings are initially registered.
 * Once set in the note field of events, it can be used immediately.
 * 
 * <ChangePassage:FLY>
 * A flying passage type that ignores obstacles.
 * Note that the game is designed to collide with
 * players (and other events) because it assumes symbolic encounters.
 * 
 * <ChangePassage:FISH>
 * This is a passage type that moves only underwater,
 * assuming fish and ships.
 * The upper left tile in the A1 tileset is treated as underwater.
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
 * @ [Plugin Parameters]
 * @------------------------------------------------------------------
 * 
 * @param PassageTypeList
 * @type struct<PassageType>[]
 * @default ["{\"TypeId\":\"FLY\",\"PassageList\":\"\",\"BasePassage\":\"on\",\"ExtendCollied\":\"true\"}","{\"TypeId\":\"FISH\",\"PassageList\":\"[\\\"{\\\\\\\"PassageId\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Memo\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"<Condition>\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"TerrainTag\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RegionId\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"AutotileType\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"TileId\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"<PassageSetting>\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CanPass\\\\\\\":\\\\\\\"true\\\\\\\"}\\\"]\",\"BasePassage\":\"off\",\"ExtendCollied\":\"false\"}"]
 * @desc This is a list to register the passage type settings.
 */

/*~struct~PassageType:
 * @param TypeId
 * @type string
 * @desc Passage type identifier.
 * 
 * @param PassageList
 * @type struct<Passage>[]
 * @desc List of passage settings.
 * 
 * @param BasePassage
 * @type select
 * @option Normal @value
 * @option Allow @value on
 * @option Prohibit @value off
 * @desc This is the basic setting for the passage.
 * Set exceptions to the PassageList based on this.
 * 
 * @param ExtendCollied
 * @type boolean
 * @default false
 * @desc The collision detection is given to events other than "Passage type identifier" and the trigger is enabled.
 */

/*~struct~Passage:
 * @param PassageId
 * @type string
 * @desc The identifier to be associated with the tileset.
 * If left blank, it is valid for all tilesets.
 * 
 * @param Memo
 * @type string
 * @desc This is a memo for identification.
 * Please give it an easy-to-understand name.
 * 
 * @param <Condition>
 * 
 * @param TerrainTag
 * @parent <Condition>
 * @type string
 * @desc Specify the Terrain Tag (1~7) to be targeted.
 * Multiple tags can be specified. (Example: 1,3~5)
 * 
 * @param RegionId
 * @parent <Condition>
 * @type string
 * @desc Specify the Region Id (1~255) to be targeted.
 * Multiple ids can be specified. (Example: 1,3~5)
 * 
 * @param AutotileType
 * @parent <Condition>
 * @type string
 * @desc Specify the Autotile Type to be targeted.
 * Multiple types can be specified. (Example: 1,3~5)
 * 
 * @param TileId
 * @parent <Condition>
 * @type string
 * @desc Specify the Tile Id to be targeted.
 * Multiple ids can be specified. (Example: 1,3~5)
 * 
 * @param <PassageSetting>
 * 
 * @param CanPass
 * @parent <PassageSetting>
 * @type boolean
 * @desc Is it passable?
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 イベントの通行判定を変更します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @orderAfter NRP_EventCollisionEX
 * @url http://newrpg.seesaa.net/article/486134190.html
 *
 * @help イベントの通行判定を変更します。
 * 空を飛ぶ鳥や、水中を泳ぐ魚などが作成できます。
 * 
 * 地形タグやリージョンＩＤ、タイルＩＤやオートタイルタイプを
 * 条件にして細かく設定できます。
 * 
 * また『通常キャラの下』や『通常キャラの上』のイベントを
 * プレイヤーと衝突可能にすることができます。
 * これにより、障害物を無視して接触してくる
 * 鳥型の敵（シンボルエンカウント）などを作成できます。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * プラグインパラメータの通行タイプリストに、通行情報を設定してください。
 * 
 * 登録した『タイプＩＤ』を以下のように、
 * イベントのメモ欄に記入することで紐付けを行います。
 * 
 * <ChangePassage:[タイプＩＤ]>
 * 
 * また、通行リストに設定した通行判定はタイルセットとの紐付けが可能です。
 * タイルセットのメモ欄に『通行ＩＤ』を記入してください。
 * 
 * <ChangePassageTile:[通行ＩＤ]>
 * 
 * 『通行ＩＤ』が空欄の場合は全てのタイルセットに対して有効となります。
 * 
 * -------------------------------------------------------------------
 * ■サンプル
 * -------------------------------------------------------------------
 * 初期状態で以下の設定が登録されています。
 * イベントのメモ欄に設定すれば、すぐに使用可能です。
 * 
 * <ChangePassage:FLY>
 * 障害物を無視する飛行型の通行タイプです。
 * なお、シンボルエンカウントを想定しているため、
 * プレイヤー（および他イベント）と衝突する仕様です。
 * 
 * <ChangePassage:FISH>
 * 魚や船を想定した水中のみを移動する通行タイプです。
 * A1タイルセットの左上のタイルが水中として扱われます。
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
 * @param PassageTypeList
 * @text 通行タイプリスト
 * @type struct<PassageType>[]
 * @default ["{\"TypeId\":\"FLY\",\"PassageList\":\"\",\"BasePassage\":\"on\",\"ExtendCollied\":\"true\"}","{\"TypeId\":\"FISH\",\"PassageList\":\"[\\\"{\\\\\\\"PassageId\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"Memo\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"<Condition>\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"TerrainTag\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"RegionId\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"AutotileType\\\\\\\":\\\\\\\"0\\\\\\\",\\\\\\\"TileId\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"<PassageSetting>\\\\\\\":\\\\\\\"\\\\\\\",\\\\\\\"CanPass\\\\\\\":\\\\\\\"true\\\\\\\"}\\\"]\",\"BasePassage\":\"off\",\"ExtendCollied\":\"false\"}"]
 * @desc 通行タイプの設定を登録する一覧です。
 */

/*~struct~PassageType:ja
 * @param TypeId
 * @text タイプＩＤ
 * @type string
 * @desc 通行タイプの識別子です。
 * 
 * @param PassageList
 * @text 通行リスト
 * @type struct<Passage>[]
 * @desc 通行設定の一覧です。
 * 
 * @param BasePassage
 * @text 基本通行設定
 * @type select
 * @option 通常 @value
 * @option 許可 @value on
 * @option 禁止 @value off
 * @desc 通行の基本設定です。
 * これを基準にして通行リストに例外を設定します。
 * 
 * @param ExtendCollied
 * @text 衝突判定を拡張
 * @type boolean
 * @default false
 * @desc 『通常キャラと重ならない』以外のイベントにも衝突判定を付与し、トリガーを有効化します。
 */

/*~struct~Passage:ja
 * @param PassageId
 * @text 通行ＩＤ
 * @type string
 * @desc タイルセットと紐付ける識別子です。
 * 空欄の場合は全タイルセットで有効となります。
 * 
 * @param Memo
 * @text メモ
 * @type string
 * @desc 判別用のメモです。
 * 分かりやすい名前を付けてください。
 * 
 * @param <Condition>
 * @text ＜条件＞
 * 
 * @param TerrainTag
 * @text 地形タグ
 * @parent <Condition>
 * @type string
 * @desc 対象とする地形タグ（1~7）を指定します。
 * 複数指定も可能です。（例：1,3~5）
 * 
 * @param RegionId
 * @text リージョンＩＤ
 * @parent <Condition>
 * @type string
 * @desc 対象とするリージョン（1~255）を指定します。
 * 複数指定も可能です。（例：1,3~5）
 * 
 * @param AutotileType
 * @text オートタイルタイプ
 * @parent <Condition>
 * @type string
 * @desc 対象とするオートタイルタイプを指定します。
 * 複数指定も可能です。（例：1,3~5）
 * 
 * @param TileId
 * @text タイルＩＤ
 * @parent <Condition>
 * @type string
 * @desc 対象とするタイルＩＤを指定します。
 * 複数指定も可能です。（例：1,3~5）
 * 
 * @param <PassageSetting>
 * @text ＜通行設定＞
 * 
 * @param CanPass
 * @text 通行可能
 * @parent <PassageSetting>
 * @type boolean
 * @desc 通行可能かどうか？
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

/**
 * ●引数を元に配列を取得する。
 */
function makeArray(values) {
    const results = [];
    if (!values) {
        return undefined;
    }

    // カンマ区切りでループ
    for (let value of values.split(",")) {
        // 空白除去
        value = value.trim();
        // 1~5というように範囲指定の場合
        // ※~が存在する。
        if (value.indexOf("~") >= 0) {
            const range = value.split("~");
            const rangeStart = eval(range[0]);
            const rangeEnd = eval(range[1]);

            // 指定範囲で実行
            // 開始のほうが終了より大きい場合は反対に実行
            if (rangeEnd < rangeStart) {
                for (let i = rangeStart; i >= rangeEnd; i--) {
                    results.push(eval(i));
                }
            } else {
                for (let i = rangeStart; i <= rangeEnd; i++) {
                    results.push(eval(i));
                }
            }
            
        // 通常時
        } else {
            // 数値変換するためeval
            results.push(eval(value));
        }
    }
    return results;
}

const PLUGIN_NAME = "NRP_ChangePassage";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pPassageTypeList = parseStruct2(parameters["PassageTypeList"]);

/**
 * ●効率化のため事前変換
 */
for (const passageType of pPassageTypeList) {
    passageType.typeId = passageType.TypeId;
    passageType.passageList = parseStruct2(passageType.PassageList);
    passageType.basePassage = passageType.BasePassage;
    passageType.extendCollied = toBoolean(passageType.ExtendCollied);

    // 通行設定
    for (const passage of passageType.passageList) {
        passage.passageId = setDefault(passage.PassageId);
        passage.validAllTilesets = toBoolean(passage.ValidAllTilesets, false);
        passage.terrainTags = makeArray(passage.TerrainTag);
        passage.regionIds = makeArray(passage.RegionId);
        passage.autotileTypes = makeArray(passage.AutotileType);
        passage.tileIds = makeArray(passage.TileId);
        passage.canPass = toBoolean(passage.CanPass);
    }
}

//-----------------------------------------------------------------------------
// Game_CharacterBase
//-----------------------------------------------------------------------------

/**
 * ●マップを通行できるかの判定
 */
const _Game_CharacterBase_isMapPassable = Game_CharacterBase.prototype.isMapPassable;
Game_CharacterBase.prototype.isMapPassable = function(x, y, d) {
    const setting = this.getChangePassageSetting();
    if (setting) {
        let x2;
        let y2;

        // NRP_EventCollisionEX.jsとの連携
        if (this.isCollisionEX && this.isCollisionEX()) {
            // 先端座標を取得
            const tipX = this.collisionTipX(x, d);
            const tipY = this.collisionTipY(y, d);

            // 先端の移動先座標を取得
            x2 = $gameMap.roundXWithDirection(tipX, d);
            y2 = $gameMap.roundYWithDirection(tipY, d);

        // 通常時
        } else {
            x2 = $gameMap.roundXWithDirection(x, d);
            y2 = $gameMap.roundYWithDirection(y, d);
        }

        // 通行判定を取得
        const passable = isPassable(x2, y2, setting);
        // 有効な判定があれば優先
        if (passable !== null) {
            return passable;
        }
    }
    
    return _Game_CharacterBase_isMapPassable.apply(this, arguments);
};

/**
 * ●追加の通行判定
 */
function isPassable(x, y, setting) {
    // 条件設定が取得できた場合、通行判定を適用
    const passageList = getChangePassageList(setting);
    if (passageList) {
        const passage = getMatchSetting(x, y, passageList);
        if (passage && passage.canPass !== undefined) {
            return passage.canPass;
        }
    }

    // 原則許可の場合はtrue固定
    if (setting.basePassage == "on") {
        return true;

    // 原則禁止の場合はfalse固定
    } else if (setting.basePassage == "off") {
        return false;
    }

    // 設定がない場合はnullで返す
    return null;
};

/**
 * ●基本情報を取得
 */
Game_CharacterBase.prototype.getChangePassageSetting = function() {
    return null;
};

// 特定イベントを強制的に『通常キャラと重ならない』として判定するフラグ
let mForceNormalPriority = false;

/**
 * ●通常キャラと重ならないかどうか？
 */
const _Game_CharacterBase_prototype_isNormalPriority = Game_CharacterBase.prototype.isNormalPriority;
Game_CharacterBase.prototype.isNormalPriority = function() {
    if (mForceNormalPriority && this._isExtendCollied) {
        return true;
    }
    return _Game_CharacterBase_prototype_isNormalPriority.apply(this, arguments);
};

/**
 * ●イベントとの衝突判定
 */
const _Game_CharacterBase_isCollidedWithEvents = Game_CharacterBase.prototype.isCollidedWithEvents;
Game_CharacterBase.prototype.isCollidedWithEvents = function(x, y) {
    // 強制的に『通常キャラと重ならない』として判定
    mForceNormalPriority = true;
    const ret = _Game_CharacterBase_isCollidedWithEvents.apply(this, arguments);
    mForceNormalPriority = false;
    return ret;
};

//-----------------------------------------------------------------------------
// Game_Event
//-----------------------------------------------------------------------------

/**
 * ●初期化
 */
const _Game_Event_initialize = Game_Event.prototype.initialize;
Game_Event.prototype.initialize = function(mapId, eventId) {
    _Game_Event_initialize.apply(this, arguments);

    const setting = this.getChangePassageSetting();
    // メモ欄に、当たり判定の設定があれば反映
    if (setting) {
        this._isExtendCollied = setting.extendCollied;
    }
};

/**
 * ●基本情報を取得
 */
Game_Event.prototype.getChangePassageSetting = function() {
    const typeId = this.event().meta.ChangePassage;
    if (typeId) {
        // 通行情報を設定
        return pPassageTypeList.find(setting => setting.typeId == typeId);
    }
    return null;
};

/**
 * ●通行情報を取得
 */
function getChangePassageList(setting) {
    if (!setting) {
        return null;
    }

    // 設定リスト
    const passageList = [];

    // 条件に一致する設定を抽出する。
    for (const passage of setting.passageList) {
        // 有効な通行ＩＤかどうかを確認
        if (isValidSetting(passage.passageId, $gameMap.tileset())) {
            // 追加して次へ
            passageList.push(passage);
        }
    }

    return passageList;
};

/**
 * ●プレイヤーとの接触判定
 */
const _Game_Event_isCollidedWithPlayerCharacters = Game_Event.prototype.isCollidedWithPlayerCharacters;
Game_Event.prototype.isCollidedWithPlayerCharacters = function(x, y) {
    // 特定イベントを強制的に『通常キャラと重ならない』として判定
    mForceNormalPriority = true;
    const ret = _Game_Event_isCollidedWithPlayerCharacters.apply(this, arguments);
    mForceNormalPriority = false;
    return ret;
};

/**
 * ●イベントから接触した場合のトリガー判定
 */
const _Game_Event_checkEventTriggerTouch = Game_Event.prototype.checkEventTriggerTouch;
Game_Event.prototype.checkEventTriggerTouch = function(x, y) {
    // 特定イベントを強制的に『通常キャラと重ならない』として判定
    mForceNormalPriority = true;
    _Game_Event_checkEventTriggerTouch.apply(this, arguments);
    mForceNormalPriority = false;
};

//-----------------------------------------------------------------------------
// Game_Player
//-----------------------------------------------------------------------------

/**
 * ●マップイベントの実行
 */
const _Game_Player_startMapEvent = Game_Player.prototype.startMapEvent;
Game_Player.prototype.startMapEvent = function(x, y, triggers, normal) {
    // 特定イベントを強制的に『通常キャラと重ならない』として判定
    mForceNormalPriority = true;
    _Game_Player_startMapEvent.apply(this, arguments);
    mForceNormalPriority = false;
};

//-----------------------------------------------------------------------------
// その他共通関数
//-----------------------------------------------------------------------------

/**
 * ●通行設定が指定のタイルセットで有効か？
 */
function isValidSetting(passageId, tileset) {
    // 通行ＩＤが空の場合は常に有効
    if (passageId == null) {
        return true;
    }

    const setting = tileset.meta.ChangePassageTile;
    if (setting) {
        // カンマ区切りで分解
        const settingArray = setting.split(",");
        // 含まれていればtrue
        return settingArray.includes(passageId);
    }
    return false;
}

/**
 * ●現在位置に一致する通行設定を取得する。
 */
function getMatchSetting(x, y, passageList) {
    // 設定がなければundefined
    if (!passageList) {
        return undefined;
    }

    // なるべく負荷をかけないよう値を一度だけ取得する。
    let terrainTag;
    let regionId;
    let autotileType;
    let tileId;

    // 設定を１つずつ確認
    for (const setting of passageList) {
        // 地形タグの一致を確認
        if (setting.terrainTags && setting.terrainTags.length > 0) {
            // 未取得なら地形タグを取得
            if (terrainTag === undefined) {
                terrainTag = $gameMap.terrainTag(x, y);
            }
            // 一つも一致しなければ次へ
            if (setting.terrainTags.every(tag => terrainTag != tag)) {
                continue;
            }
        }

        // リージョンの一致を確認
        if (setting.regionIds && setting.regionIds.length > 0) {
            // 未取得ならリージョンＩＤを取得
            if (regionId === undefined) {
                regionId = $gameMap.regionId(x, y);
            }
            // 一つも一致しなければ次へ
            if (setting.regionIds.every(id => regionId != id)) {
                continue;
            }
        }

        // オートタイルタイプの一致を確認
        if  (setting.autotileTypes && setting.autotileTypes.length > 0) {
            // 未取得ならオートタイルタイプを取得
            if (autotileType === undefined) {
                const layerNo = getStepLayer(x, y);
                autotileType = $gameMap.autotileType(x, y, layerNo);
            }
            // 一つも一致しなければ次へ
            if (setting.autotileTypes.every(type => autotileType != type)) {
                continue;
            }
        }

        // タイルＩＤの一致を確認
        if  (setting.tileIds && setting.tileIds.length > 0) {
            // 未取得ならタイルＩＤを取得
            if (tileId === undefined) {
                const layerNo = getStepLayer(x, y);
                tileId = $gameMap.tileId(x, y, layerNo);
            }
            // 一つも一致しなければ次へ
            if (setting.tileIds.every(id => tileId != id)) {
                continue;
            }
        }

        // 条件を満たす設定があった。
        return setting;
    }

    // なければundefined
    return undefined;
}

/**
 * ●☆を除いた有効な最大レイヤー番号
 * ※要するに足を踏みしめるレイヤー
 */
function getStepLayer(x, y) {
    // 各タイルが保有するフラグ情報
    const flags = $gameMap.tilesetFlags();
    // 上のレイヤーから順番にループ
    const tiles = $gameMap.layeredTiles(x, y);
    for (let i = 0; i < 4; i++) {
        const tileId = tiles[i];
        const layerNo = 3 - i;
        const flag = flags[tileId];

        // 通行判定☆（0x10）を除く最初のタイルが対象
        if ((flag & 0x10) === 0) {
            return layerNo;
        }
    }
    // 無効の場合は-1
    return -1;
}

})();
