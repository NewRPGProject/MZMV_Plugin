﻿//=============================================================================
// NRP_BushEX.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.01 Extends the functionality of the bushes attribute.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @orderBefore OverpassTile
 * @url http://newrpg.seesaa.net/article/481013577.html
 *
 * @help Extends the functionality of the bushes attribute.
 * 
 * Normally, when standing on a tile with the bush attribute added,
 * the lower half of the character's body will appear translucent.
 * This feature is used not only for bushes, but also for water features.
 * 
 * However, the trouble is that the bushes attribute is applied to all layers.
 * For example, let's say you have a bridge that spans the water.
 * Your character is standing on it.
 * Your character will then become translucent,
 * as if he were standing on the bridge, but he is underwater.
 * 
 * So, if there are other tiles on the layer above the bushes,
 * do not apply the bushes attribute.
 * 
 * In addition, you can adjust the opacity, the depth of the bushes,
 * and, as an added extra, the color.
 * You can also fine-tune the settings by using TerrainTags,
 * RegionIDs, TileIDs and AutoTileTypes as conditions.
 * 
 * If you add a "SettingId" to the settings you have created,
 * you can call up the settings for each tileset.
 * 
 * [Usage]
 * When the plugin is applied,
 * the "LimitBushLayer" function is initially turned on.
 * The depth and opacity of the bushes can be set by parameters.
 * 
 * In addition, it allows finer tuning than the SettingList.
 * Whether the setting is enabled for all tilesets
 * or invoked for each tileset can be toggled by a parameter in the list.
 * 
 * [Tilesets Notes]
 * To recall the settings for each tileset,
 * specify the following in Note.
 * 
 * <BushSetting:?>
 * 
 * ? is the "SettingId" registered in the setting by condition.
 * You can also specify multiple settings by separating them with commas.
 * 
 * <BushSetting:A,B,C>
 * 
 * [Notice]
 * When using this plugin together with OverpassTile.js,
 * be sure to place this plugin on the top.
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 * 
 * @param LimitBushLayer
 * @type boolean
 * @default true
 * @desc If there are other tiles on the layer above the bushes, the bush attribute will not be applied.
 * 
 * @param ExcludedTerrain
 * @type string
 * @desc Specify the terrain tags (1~7) to be excluded for "LimitBushLayer". Multiple allowed (e.g. 1,3).
 * 
 * @param BushDepth
 * @type number
 * @desc The height of the translucency effect applied to the lower body on the bushes. Default 12.
 * 
 * @param BushOpacity
 * @type number
 * @max 255
 * @desc The opacity to apply to the lower body on the bushes.
 * Opaque at 255. Default value is 128.
 * 
 * @param SettingList
 * @type struct<Setting>[]
 * @desc This is a list of bush settings.
 * This is useful when you want to specify detailed conditions.
 */
/*~struct~Setting:
 * @param SettingId
 * @type string
 * @desc Identifier used to call from the note field of a tileset. This is not required if "ValidAllTilesets" is on.
 * 
 * @param ValidAllTilesets
 * @type boolean
 * @default false
 * @desc Enables the setting for all tilesets. If turned off, the setting can be applied to individual tilesets.
 * 
 * @param ForceBush
 * @type boolean
 * @default true
 * @desc If the condition is met, the bush state is always applied, even on tiles other than bushes.
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
 * @param <OpacitySetting>
 * 
 * @param BushDepth
 * @parent <OpacitySetting>
 * @type number
 * @desc The height of the translucency effect applied to the lower body on the bushes.
 * 
 * @param BushOpacity
 * @parent <OpacitySetting>
 * @type number
 * @max 255
 * @desc The opacity to apply to the lower body on the bushes.
 * 
 * @param <ExtraSetting>
 * 
 * @param BushColor
 * @parent <ExtraSetting>
 * @type string
 * @desc The color to apply to the lower body on the bushes.
 * e.g.: [255,255,255,255]
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.01 茂み属性の機能を拡張します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @orderBefore OverpassTile
 * @url http://newrpg.seesaa.net/article/481013577.html
 *
 * @help 茂み属性の機能を拡張します。
 * 
 * 通常、茂み属性を付加されたタイルの上に立つと、
 * キャラクターの下半身が半透明になって表示されます。
 * この機能は茂みだけでなく、水場などの表現にも利用されます。
 * 
 * しかしながら、困ったことに、
 * 茂み属性は全てのレイヤーに適用されてしまいます。
 * 例えば、水の上に架かる橋を設置した場合、
 * 橋の上に立っているのに、水中にいるかのように
 * キャラが半透明になってしまいます。
 * 
 * そこで、茂みの上のレイヤーに他のタイルがある場合、
 * 茂み属性を適用しないようにします。
 * 
 * その他にも、不透明度や茂みの深さ、おまけに色を調整できます。
 * 地形タグやリージョンＩＤ、タイルＩＤやオートタイルタイプを
 * 条件にして細かく設定することも可能です。
 * 作成した設定に『設定ＩＤ』を付加すれば、
 * タイルセット毎に設定を呼び出すことも可能です。
 * 
 * ■使用方法
 * プラグインを適用すると初期状態で『茂みレイヤーの限定』機能がオンとなります。
 * 茂みの深さや不透明度もパラメータで設定可能です。
 * 
 * さらに、設定リストによって細かい調整が可能となります。
 * 全タイルセットで有効とするか、タイルセット毎に呼び出すかを、
 * リスト内のパラメータによって切り替え可能です。
 * 
 * ■タイルセットのメモ欄
 * タイルセット毎に設定する場合はメモ欄に以下を指定してください。
 * <BushSetting:?>
 * 
 * ?の部分が設定リストに登録した『設定ＩＤ』となります。
 * また、カンマ区切りによって複数指定も可能です。
 * <BushSetting:A,B,C>
 * 
 * ■注意点
 * OverpassTile.js（立体交差プラグイン）と併用する場合、
 * 当プラグインを必ず上側に配置してください。
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param LimitBushLayer
 * @text 茂みレイヤーの限定
 * @type boolean
 * @default true
 * @desc 茂みの上のレイヤーに他のタイルがある場合、茂み属性を無効化します。
 * 
 * @param ExcludedTerrain
 * @text 除外する地形タグ
 * @type string
 * @desc 『茂みレイヤーの限定』について除外する地形タグ（1~7）を指定します。複数指定可。（例：1,3）
 * 
 * @param BushDepth
 * @text 茂みの深さ
 * @type number
 * @desc 茂み上でキャラクターの下半身に半透明効果を適用する高さです。初期値は12。
 * 
 * @param BushOpacity
 * @text 茂みでの不透明度
 * @type number
 * @max 255
 * @desc 茂み上でキャラクターの下半身に適用する不透明度です。
 * 255で不透明。初期値は128です。
 * 
 * @param SettingList
 * @text 設定リスト
 * @type struct<Setting>[]
 * @desc 茂み設定の一覧です。
 * 細かい条件を指定したい場合に有効です。
 */
/*~struct~Setting:ja
 * @param SettingId
 * @text 設定ＩＤ
 * @type string
 * @desc タイルセットのメモ欄からの呼び出しに使う識別子です。
 * 『全タイルセットで有効』がオンの場合は不要です。
 * 
 * @param ValidAllTilesets
 * @text 全タイルセットで有効
 * @type boolean
 * @default false
 * @desc 設定を全てのタイルセットで有効にします。
 * オフにした場合は、個別のタイルセットに設定できます。
 * 
 * @param ForceBush
 * @text 茂みを強制適用
 * @type boolean
 * @default true
 * @desc 条件を満たした場合、茂み以外のタイルでも常に茂み状態を適用します。
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
 * @param <OpacitySetting>
 * @text ＜不透明度設定＞
 * 
 * @param BushDepth
 * @text 茂みの深さ
 * @parent <OpacitySetting>
 * @type number
 * @desc 茂み上でキャラクターの下半身に半透明効果を適用する高さです。
 * 
 * @param BushOpacity
 * @text 茂みでの不透明度
 * @parent <OpacitySetting>
 * @type number
 * @max 255
 * @desc 茂み上でキャラクターの下半身に適用する不透明度です。
 * 
 * @param <ExtraSetting>
 * @text ＜おまけ＞
 * 
 * @param BushColor
 * @text 茂みでの色
 * @parent <ExtraSetting>
 * @type string
 * @desc 茂み上でキャラクターの下半身に適用する色です。
 * 例：[255,255,255,255]
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

const PLUGIN_NAME = "NRP_BushEX";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pLimitBushLayer = toBoolean(parameters["LimitBushLayer"], true);
const pExcludedTerrain = makeArray(parameters["ExcludedTerrain"]);
const pBushDepth = toNumber(parameters["BushDepth"]);
const pBushOpacity = toNumber(parameters["BushOpacity"]);
const pSettingList = parseStruct2(parameters["SettingList"]);

/**
 * ●効率化のため事前変換
 */
for (const setting of pSettingList) {
    setting.settingId = setting.SettingId;
    setting.validAllTilesets = toBoolean(setting.ValidAllTilesets, false);
    setting.forceBush = toBoolean(setting.ForceBush, false);
    setting.terrainTags = makeArray(setting.TerrainTag);
    setting.regionIds = makeArray(setting.RegionId);
    setting.autotileTypes = makeArray(setting.AutotileType);
    setting.tileIds = makeArray(setting.TileId);
    setting.bushDepth = toNumber(setting.BushDepth);
    setting.bushOpacity = toNumber(setting.BushOpacity);
    setting.bushColor = setting.BushColor;
}

if (pLimitBushLayer) {
    /**
     * 【上書】茂みの判定
     */
    Game_Map.prototype.isBush = function(x, y) {
        if (!this.isValid(x, y)) {
            return false;
        }

        // 各タイルが保有するフラグ情報
        const flags = this.tilesetFlags();

        // 上のレイヤーから順番にループ
        for (const tileId of this.layeredTiles(x, y)) {
            const flag = flags[tileId];

            // 通行判定☆（0x10）を除く最初のタイルが対象
            if ((flag & 0x10) === 0) {
                // 二進数でデバッグ出力する場合は注釈解除
                // console.log(flag.toString(2));

                // 茂み（0x40）ならば茂みとして判定
                if ((flag & 0x40) !== 0) {
                    return true;
                }

                // 対象の地形タグならば無視して次へ
                if (isExcludedTerrain(flag)) {
                    // ※タイルが存在しない場合と同じ処理
                    continue;
                }

                // それ以外のタイルがあったならば対象外
                // その下に茂みがあったとしても無効とする。
                return false;
            }
        }

        return false;
    };
}

/**
 * ●上に続いてさらに処理
 * ※茂みの強制適用
 */
const _Game_Map_isBush = Game_Map.prototype.isBush;
Game_Map.prototype.isBush = function(x, y) {
    if (!this.isValid(x, y)) {
        return false;
    }

    // 条件設定が一つでも存在する場合
    if (existSetting()) {
        const setting = getMatchSetting(x, y);
        // 条件設定が取得できて、かつ強制適用の場合
        if (setting && setting.forceBush) {
            return true;
        }
    }

    return _Game_Map_isBush.apply(this, arguments);
};

/**
 * 【上書】茂みの深さ
 */
Game_CharacterBase.prototype.refreshBushDepth = function() {
    if (
        this.isNormalPriority() &&
        !this.isObjectCharacter() &&
        this.isOnBush() &&
        !this.isJumping()
    ) {
        // 茂み上に移動した
        if (!this.isMoving()) {
            // 条件設定が一つでも存在する場合
            if (existSetting()) {
                // 不透明度の変更も呼び出すためのフラグ
                this.changeBushOpacityFlg = true;

                const setting = getMatchSetting(this._x, this._y);
                // 条件設定が取得できた場合
                if (setting) {
                    this.bushSetting = setting;

                    // 条件設定がある場合
                    if (setting.bushDepth) {
                        this._bushDepth = setting.bushDepth;
                    // 条件設定はないが、全体設定がある場合
                    } else if (pBushDepth) {
                        this._bushDepth = pBushDepth;
                    // ツクールの初期値
                    } else {
                        this._bushDepth = 12;
                    }

                    return;
                }
                // 条件設定が取得できない場合
                // →設定初期化
                this.bushSetting = undefined;
            }

            // 条件設定はないが、全体設定がある場合
            if (pBushDepth) {
                this._bushDepth = pBushDepth;
            // ツクールの初期値
            } else {
                this._bushDepth = 12;
            }
        }
    } else {
        this._bushDepth = 0;
    }
};

/**
 * ●茂み時の半身の不透明度
 */
const _Sprite_Character_createHalfBodySprites = Sprite_Character.prototype.createHalfBodySprites;
Sprite_Character.prototype.createHalfBodySprites = function() {
    // 初回作成時
    if (!this._lowerBody) {
        _Sprite_Character_createHalfBodySprites.apply(this, arguments);
        if (pBushOpacity) {
            this._lowerBody.opacity = pBushOpacity;
        }
    // それ以外
    } else {
        _Sprite_Character_createHalfBodySprites.apply(this, arguments);
    }

    // 本来、茂みに不透明度の設定は最初の進入時に設定するだけだが、
    // 細かく制御するために、毎回の進入時にも制御するよう変更。
    const character = this._character;
    // 不透明度を変更する場合
    if (character.changeBushOpacityFlg) {
        // 不透明度の変更
        character.changeBushOpacityFlg = undefined;

        // 条件設定が取得できた場合
        if (character.bushSetting && character.bushSetting.bushOpacity) {
            this._lowerBody.opacity = character.bushSetting.bushOpacity;
            return;
        }

        // 条件設定はないが、全体設定がある場合
        if (pBushOpacity) {
            this._lowerBody.opacity = pBushOpacity;
        // 設定がない場合はツクールの初期値
        } else {
            this._lowerBody.opacity = 128;
        }
    }
};

/**
 * ●茂み時の半身を更新
 */
const _Sprite_Character_updateHalfBodySprites = Sprite_Character.prototype.updateHalfBodySprites;
Sprite_Character.prototype.updateHalfBodySprites = function() {
    _Sprite_Character_updateHalfBodySprites.apply(this, arguments);

    if (this._bushDepth > 0) {
        const character = this._character;
        // 条件設定が取得できた場合
        if (character.bushSetting && character.bushSetting.bushColor) {
            // this._lowerBody.blendMode = 2;
            this._lowerBody.setBlendColor(eval(character.bushSetting.bushColor));
        }
    }
};

//----------------------------------------
// マップ切替時
//----------------------------------------

/**
 * ●マップ情報の設定
 */
const _Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    _Game_Map_setup.apply(this, arguments);

    setTilesetInfo();
};

/**
 * ●タイルセットの変更
 */
const _Game_Map_changeTileset = Game_Map.prototype.changeTileset;
Game_Map.prototype.changeTileset = function(tilesetId) {
    _Game_Map_changeTileset.apply(this, arguments);
 
    setTilesetInfo();
};
 
/**
 * ●タイルセットに情報を設定
 * ※常駐処理は避けて、極力処理はこちらでやっておく。
 */
function setTilesetInfo() {
    const tileset = $gameMap.tileset();

    // 設定リスト
    const bushSettingList = [];

    // 条件に一致する設定を抽出する。
    for (const setting of pSettingList) {
        // どのタイルセットでも常に有効の場合
        if (setting.validAllTilesets) {
            // 追加して次へ
            bushSettingList.push(setting);
            continue;
        }

        // 有効な設定ＩＤかどうかを確認
        if (isValidSetting(setting.settingId, tileset)) {
            // 追加して次へ
            bushSettingList.push(setting);
        }
    }

    // タイルセットに設定
    tileset.bushSettingList = bushSettingList;
}

/**
 * ●茂み設定が指定のタイルセットで有効か？
 */
function isValidSetting(settingId, tileset) {
    if (settingId === undefined) {
        return false;
    }

    const bushSetting = tileset.meta.BushSetting;
    if (bushSetting) {
        // カンマ区切りで分解
        const bushSettingArray = bushSetting.split(",");
        // 含まれていればtrue
        return bushSettingArray.includes(settingId);
    }
    return false;
}

//----------------------------------------
// その他共通関数
//----------------------------------------

/**
 * ●現在のキャラクター位置に一致する茂み設定を取得する。
 */
function getMatchSetting(x, y) {
    const tileset = $gameMap.tileset();

    // 設定がなければundefined
    if (!tileset.bushSettingList) {
        return undefined;
    }

    // なるべく負荷をかけないよう値を一度だけ取得する。
    let terrainTag;
    let regionId;
    let autotileType;
    let tileId;

    // 設定を１つずつ確認
    for (const setting of tileset.bushSettingList) {
        let noMatch = false;

        // 地形タグの一致を確認
        if (setting.terrainTags && setting.terrainTags.length > 0) {
            // 未取得なら地形タグを取得
            if (terrainTag === undefined) {
                terrainTag = $gameMap.terrainTag(x, y);
            }

            noMatch = setting.terrainTags.every(function(tag) {
                return terrainTag != tag;
            });
            if (noMatch) {
                continue;
            }
        }

        // リージョンの一致を確認
        if (setting.regionIds && setting.regionIds.length > 0) {
            // 未取得ならリージョンＩＤを取得
            if (regionId === undefined) {
                regionId = $gameMap.regionId(x, y);
            }

            noMatch = setting.regionIds.every(function(id) {
                return regionId != id;
            });
            if (noMatch) {
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

            noMatch = setting.autotileTypes.every(function(type) {
                return autotileType != type;
            });
            if (noMatch) {
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

            noMatch = setting.tileIds.every(function(id) {
                return tileId != id;
            });
            if (noMatch) {
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
            // ただし、対象の地形タグならば無視して次へ
            if (isExcludedTerrain(flag)) {
                // ※タイルが存在しない場合と同じ処理
                continue;
            }

            return layerNo;
        }
    }
    // 無効の場合は-1
    return -1;
}

/**
 * ●除外する地形タグ
 */
function isExcludedTerrain(flag) {
    // 茂み(0x40)は除外しない。
    if (flag & 0x40) {
        return false;
    }

    // 地形タグを取得
    const tag = flag >> 12;
    // 対象の地形タグならばtrue
    if (tag > 0 && pExcludedTerrain && pExcludedTerrain.includes(tag)) {
        return true;
    }
    return false;
}

/**
 * ●条件設定が存在するかどうか？
 */
function existSetting() {
    return pSettingList.length > 0;
}

})();
