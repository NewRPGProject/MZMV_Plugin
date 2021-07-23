//=============================================================================
// NRP_VehiclePassage.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.01 Extends the passage & get on/off decision for vehicles.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/482385836.html
 *
 * @help Extends the passage & get on/off decision for vehicles.
 * 
 * You can also fine-tune the settings by using TerrainTags,
 * RegionIDs, TileIDs and AutoTileTypes as conditions.
 * 
 * If you add a "SettingId" to the settings you have created,
 * you can call up the settings for each tileset.
 * 
 * Depending on the plugin parameters,
 * getting on and off can be prohibited in principle.
 * This is useful if you want to be able to get on and off only in certain terrains.
 * For example, a ship that can only arrive and depart at a pier,
 * or a black bird that can only land in a forest, can be realized.
 * 
 * In addition, the altitude of the airship can be set.
 * This can be used to create low-flying vehicles
 * that cannot pass through mountainous areas.
 * 
 * [Usage]
 * Set the passage & get on/off decision
 * in each SettingList of plugin parameters.
 * It is possible to switch between enabling it for all tilesets
 * and calling it for each tileset by using the parameters in the list.
 * 
 * [Tilesets Notes]
 * If you want to set it for each tile set,
 * specify the following in the Note field.
 * <VehiclePassage:?>
 * 
 * ? is the SettingId registered in the SettingList.
 * It is also possible to specify multiple settings by separating them with commas.
 * <VehiclePassage:A,B,C>
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 * 
 * @param BoatSettingList
 * @type struct<Setting>[]
 * @desc This is a list of Boat's passage & get on/off settings.
 * 
 * @param ShipSettingList
 * @type struct<Setting>[]
 * @desc This is a list of Ship's passage & get on/off settings.
 * 
 * @param AirshipSettingList
 * @type struct<Setting>[]
 * @desc This is a list of Airship's passage & get on/off settings.
 * 
 * @param BoatNoGetOff
 * @type boolean
 * @default false
 * @desc In principle, getting on and off the Boat is prohibited.
 * Please define exceptions in the SettingList.
 * 
 * @param ShipNoGetOff
 * @type boolean
 * @default false
 * @desc In principle, getting on and off the Ship is prohibited.
 * Please define exceptions in the SettingList.
 * 
 * @param AirshipNoGetOff
 * @type boolean
 * @default false
 * In principle, getting on and off the Airship is prohibited.
 * Please define exceptions in the SettingList.
 * 
 * @param AirshipAltitude
 * @type number
 * @min 0 @max 999
 * @desc The altitude of the airship.
 * Default is 48.
 */
/*~struct~Setting:
 * @param SettingId
 * @type string
 * @desc Identifier used to call from the note field of a tileset. This is not required if "ValidAllTilesets" is on.
 * 
 * @param Memo
 * @type string
 * @desc This is a memo for identification.
 * Please give it an easy-to-understand name.
 * 
 * @param ValidAllTilesets
 * @type boolean
 * @default false
 * @desc Enables the setting for all tilesets. If turned off, the setting can be applied to individual tilesets.
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
 * 
 * @param CanGetOn
 * @parent <PassageSetting>
 * @type boolean
 * @desc Is it possible to get in and out?
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.01 乗物の通行＆乗降判定を拡張します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/482385836.html
 *
 * @help 乗物の通行＆乗降判定を拡張します。
 * 
 * 地形タグやリージョンＩＤ、タイルＩＤやオートタイルタイプを
 * 条件にして細かく設定できます。
 * 作成した設定に『設定ＩＤ』を付加すれば、
 * タイルセット毎に設定を呼び出すことも可能です。
 * 
 * プラグインパラメータによって、乗降を原則禁止にすることもできます。
 * 桟橋でのみ発着できる船や、森のみ着陸できる黒い馬鳥など、
 * 特定の地形でのみ乗降できるようにしたい場合は便利です。
 * 
 * ついでに飛行船の高度も設定可能です。
 * 山岳地帯を通れない低空飛行の乗物などが実現できます。
 * 
 * ■使用方法
 * プラグインパラメータの各設定リストに、通行＆乗降判定を設定してください。
 * 全タイルセットで有効とするか、タイルセット毎に呼び出すかを、
 * リスト内のパラメータによって切り替え可能です。
 * 
 * ■タイルセットのメモ欄
 * タイルセット毎に設定する場合はメモ欄に以下を指定してください。
 * <VehiclePassage:?>
 * 
 * ?の部分が設定リストに登録した『設定ＩＤ』となります。
 * また、カンマ区切りによって複数指定も可能です。
 * <VehiclePassage:A,B,C>
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param BoatSettingList
 * @text 小型船の設定リスト
 * @type struct<Setting>[]
 * @desc 小型船の通行＆乗降設定の一覧です。
 * 
 * @param ShipSettingList
 * @text 大型船の設定リスト
 * @type struct<Setting>[]
 * @desc 大型船の通行＆乗降設定の一覧です。
 * 
 * @param AirshipSettingList
 * @text 飛行船の設定リスト
 * @type struct<Setting>[]
 * @desc 飛行船の通行＆乗降設定の一覧です。
 * 
 * @param BoatNoGetOff
 * @text 小型船の原則乗降禁止
 * @type boolean
 * @default false
 * @desc 小型船の乗降を原則禁止します。
 * 設定リストに定義した地形のみ乗降できます。
 * 
 * @param ShipNoGetOff
 * @text 大型船の原則乗降禁止
 * @type boolean
 * @default false
 * @desc 大型船の乗降を原則禁止します。
 * 設定リストに定義した地形のみ乗降できます。
 * 
 * @param AirshipNoGetOff
 * @text 飛行船の原則乗降禁止
 * @type boolean
 * @default false
 * @desc 飛行船の乗降を原則禁止します。
 * 設定リストに定義した地形のみ乗降できます。
 * 
 * @param AirshipAltitude
 * @text 飛行船の高度
 * @type number
 * @min 0 @max 999
 * @desc 飛行船の高度です。
 * デフォルトは48となります。
 * 
 * @param AirshipSameAsCharacters
 * @text 飛行船を通常キャラと同じに
 * @type boolean
 * @default false
 * @desc 飛行船のプライオリティタイプを『通常キャラと同じ』に変更します。
 */
/*~struct~Setting:ja
 * @param SettingId
 * @text 設定ＩＤ
 * @type string
 * @desc タイルセットのメモ欄からの呼び出しに使う識別子です。
 * 『全タイルセットで有効』がオンの場合は不要です。
 * 
 * @param Memo
 * @text メモ
 * @type string
 * @desc 判別用のメモです。
 * 分かりやすい名前を付けてください。
 * 
 * @param ValidAllTilesets
 * @text 全タイルセットで有効
 * @type boolean
 * @default false
 * @desc 設定を全てのタイルセットで有効にします。
 * オフにした場合は、個別のタイルセットに設定できます。
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
 * 
 * @param CanGetOn
 * @text 乗降可能
 * @parent <PassageSetting>
 * @type boolean
 * @desc 乗降可能かどうか？
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

const PLUGIN_NAME = "NRP_VehiclePassage";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pBoatSettingList = parseStruct2(parameters["BoatSettingList"]);
const pShipSettingList = parseStruct2(parameters["ShipSettingList"]);
const pAirshipSettingList = parseStruct2(parameters["AirshipSettingList"]);
const pBoatNoGetOff = toBoolean(parameters["BoatNoGetOff"], false);
const pShipNoGetOff = toBoolean(parameters["ShipNoGetOff"], false);
const pAirshipNoGetOff = toBoolean(parameters["AirshipNoGetOff"], false);
const pAirshipAltitude = toNumber(parameters["AirshipAltitude"]);
const pAirshipSameAsCharacters = toBoolean(parameters["AirshipSameAsCharacters"], false);

/**
 * ●通行リストを使用できる形式に設定
 */
function setSettingList(settingList, type) {
    for (const setting of settingList) {
        setting.settingId = setting.SettingId;
        setting.vehicleType = type;
        setting.validAllTilesets = toBoolean(setting.ValidAllTilesets, false);
        setting.terrainTags = makeArray(setting.TerrainTag);
        setting.regionIds = makeArray(setting.RegionId);
        setting.autotileTypes = makeArray(setting.AutotileType);
        setting.tileIds = makeArray(setting.TileId);
        setting.canPass = toBoolean(setting.CanPass);
        setting.canGetOn = toBoolean(setting.CanGetOn);
    }
}

setSettingList(pBoatSettingList, "boat");
setSettingList(pShipSettingList, "ship");
setSettingList(pAirshipSettingList, "airship");

// リストを全連結
const pSettingList = pBoatSettingList.concat(pShipSettingList).concat(pAirshipSettingList);

//----------------------------------------
// 通行判定
//----------------------------------------

/**
 * ●小型船の通行判定
 */
const _Game_Map_isBoatPassable = Game_Map.prototype.isBoatPassable;
Game_Map.prototype.isBoatPassable = function(x, y) {
    // 条件設定が一つでも存在する場合
    if (existSetting()) {
        const setting = getMatchSetting(x, y);
        // 条件設定が取得できた場合、通行判定を適用
        if (setting && setting.canPass !== undefined) {
            return setting.canPass;
        }
    }

    return _Game_Map_isBoatPassable.apply(this, arguments);
};

/**
 * ●大型船の通行判定
 */
const _Game_Map_isShipPassable = Game_Map.prototype.isShipPassable;
Game_Map.prototype.isShipPassable = function(x, y) {
    // 条件設定が一つでも存在する場合
    if (existSetting()) {
        const setting = getMatchSetting(x, y);
        // 条件設定が取得できた場合、通行判定を適用
        if (setting && setting.canPass !== undefined) {
            return setting.canPass;
        }
    }

    return _Game_Map_isShipPassable.apply(this, arguments);
};

/**
 * ●通行判定
 * ※Game_CharacterBase.prototype.canPassのオーバーライド
 * ※飛行船はすり抜け属性をデフォルトで持っているため、
 * 　Game_Vehicle.prototype.isMapPassableを通過しない。
 * 　そのためここで実装する。
 */
const _Game_Player_canPass = Game_Player.prototype.canPass;
Game_Player.prototype.canPass = function(x, y, d) {
    // プレイヤーが飛行船に乗っている場合
    if (this.isInAirship()) {
        const x2 = $gameMap.roundXWithDirection(x, d);
        const y2 = $gameMap.roundYWithDirection(y, d);
        return isAirShipPassable(x2, y2);
    }

    return _Game_Player_canPass.apply(this, arguments);
};

/**
 * ●飛行船の通行判定
 */
function isAirShipPassable(x, y) {
    // 条件設定が一つでも存在する場合
    if (existSetting()) {
        const setting = getMatchSetting(x, y);
        // 条件設定が取得できた場合、通行判定を適用
        if (setting && setting.canPass !== undefined) {
            return setting.canPass;
        }
    }

    return true;
}

//----------------------------------------
// 乗降判定
//----------------------------------------

const _Game_Vehicle_isLandOk = Game_Vehicle.prototype.isLandOk;
Game_Vehicle.prototype.isLandOk = function(x, y, d) {
    // 通過判定、イベントとの衝突判定などをここで参照
    const ret = _Game_Vehicle_isLandOk.apply(this, arguments);

    // 飛行船ではない
    if (ret && !this.isAirship()) {
        // 条件設定が一つでも存在する場合
        if (existSetting()) {
            const x2 = $gameMap.roundXWithDirection(x, d);
            const y2 = $gameMap.roundYWithDirection(y, d);

            const setting = getMatchSetting(x2, y2);
            // 条件設定が取得できた場合、乗降判定を適用
            if (setting && setting.canGetOn !== undefined) {
                return setting.canGetOn;
            }
        }

        // 原則禁止の場合はfalse固定
        if (this.isBoat() && pBoatNoGetOff) {
            return false;
        } else if (this.isShip() && pShipNoGetOff) {
            return false;
        }
    }

    return ret;
};

/**
 * ●飛行船の乗降判定
 */
const _Game_Map_isAirshipLandOk = Game_Map.prototype.isAirshipLandOk;
Game_Map.prototype.isAirshipLandOk = function(x, y) {
    // 条件設定が一つでも存在する場合
    if (existSetting()) {
        const setting = getMatchSetting(x, y);
        // 条件設定が取得できた場合、乗降判定を適用
        if (setting && setting.canGetOn !== undefined) {
            return setting.canGetOn;
        }
    }

    // 原則禁止の場合はfalse固定
    if (pAirshipNoGetOff) {
        return false;
    }

    return _Game_Map_isAirshipLandOk.apply(this, arguments);
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
    const vehiclePassageSettingList = [];

    // 条件に一致する設定を抽出する。
    for (const setting of pSettingList) {
        // どのタイルセットでも常に有効の場合
        if (setting.validAllTilesets) {
            // 追加して次へ
            vehiclePassageSettingList.push(setting);
            continue;
        }

        // 有効な設定ＩＤかどうかを確認
        if (isValidSetting(setting.settingId, tileset)) {
            // 追加して次へ
            vehiclePassageSettingList.push(setting);
        }
    }

    // タイルセットに設定
    tileset.vehiclePassageSettingList = vehiclePassageSettingList;
}

/**
 * ●通行設定が指定のタイルセットで有効か？
 */
function isValidSetting(settingId, tileset) {
    if (settingId === undefined) {
        return false;
    }

    const setting = tileset.meta.VehiclePassage;
    if (setting) {
        // カンマ区切りで分解
        const settingArray = setting.split(",");
        // 含まれていればtrue
        return settingArray.includes(settingId);
    }
    return false;
}

//----------------------------------------
// 飛行船の最大高度
//----------------------------------------

if (pAirshipAltitude !== undefined) {
    /**
     * 【上書】飛行船の最大高度
     */
    Game_Vehicle.prototype.maxAltitude = function() {
        return pAirshipAltitude;
    };

    /**
     * ●飛行船の更新
     */
    const _Game_Vehicle_updateAirship = Game_Vehicle.prototype.updateAirship;
    Game_Vehicle.prototype.updateAirship = function() {
        _Game_Vehicle_updateAirship.apply(this, arguments);

        // 最大高度が0以下の場合、プライオリティタイプを下げないように調整
        if (this.maxAltitude() <= 0) {
            if (this._driving) {
                this.setPriorityType(2);
                this.setStepAnime(true);
            } else {
                this.setPriorityType(0);
                this.setStepAnime(false);
            }
        }
    };
}

//----------------------------------------
// 飛行船のプライオリティタイプ
//----------------------------------------

if (pAirshipSameAsCharacters) {
    const _Game_Vehicle_refresh = Game_Vehicle.prototype.refresh;
    Game_Vehicle.prototype.refresh = function() {
        _Game_Vehicle_refresh.apply(this, arguments);

        if (this.isAirship() && !this._driving) {
            // 飛行中でない場合は通常キャラと同じに
            this.setPriorityType(1);
        }
    };

    const _Game_Vehicle_updateAirship = Game_Vehicle.prototype.updateAirship;
    Game_Vehicle.prototype.updateAirship = function() {
        _Game_Vehicle_updateAirship.apply(this, arguments);

        if (this.isLowest()) {
            // 飛行中でない場合は通常キャラと同じに
            this.setPriorityType(1);
        }
    };
}

//----------------------------------------
// その他共通関数
//----------------------------------------

/**
 * ●現在位置に一致する通行設定を取得する。
 */
function getMatchSetting(x, y) {
    const tileset = $gameMap.tileset();

    // 設定がなければundefined
    if (!tileset.vehiclePassageSettingList) {
        return undefined;
    }

    // なるべく負荷をかけないよう値を一度だけ取得する。
    let terrainTag;
    let regionId;
    let autotileType;
    let tileId;

    // 設定を１つずつ確認
    for (const setting of tileset.vehiclePassageSettingList) {
        let noMatch = false;

        // 該当の乗物以外は無視
        if ($gamePlayer.vehicle()._type != setting.vehicleType) {
            continue;
        }

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
            return layerNo;
        }
    }
    // 無効の場合は-1
    return -1;
}

/**
 * ●条件設定が存在するかどうか？
 */
function existSetting() {
    return pSettingList.length > 0;
}

})();
