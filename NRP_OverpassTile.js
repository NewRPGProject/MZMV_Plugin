//=============================================================================
// NRP_OverpassTile.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.04 Realize a high-performance overpass.
 * @author Takeshi Sunagawa (original triacontane & Yoji Ojima)
 * @orderAfter NRP_EventCollisionEX
 * @orderAfter NRP_BushEX
 * @url http://newrpg.seesaa.net/article/482040708.html
 * 
 * @help You can represent overpasses such as bridges on the map.
 * 
 * This is an enhanced version of
 * the official RPG Maker MZ plugin "OverpassTile.js".
 * It allows you to create overpasses with a higher degree of freedom
 * by allowing you to place tiles on the overpass that prohibit passage.
 * 
 * It can also be used as a hidden passage
 * that can be slipped through on maps that do not use overpass.
 * 
 * You can also switch the layer where the player or event exists
 * by using the event's note field or plugin commands.
 * 
 * OverpassTile.js" also exists in RPG Maker MV,
 * but this plugin is based on the more advanced MZ version.
 * On top of that, I have improved it
 * so that it can be used in MV as well.
 * 
 * -------------------------------------------------------------------
 * [Caution]
 * -------------------------------------------------------------------
 * This plugin should be placed below the following plugins.
 * 
 * - NRP_EventCollisionEX
 * - NRP_BushEX
 * 
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * If you place a tile in the upper layer (layer 3-4 in MZ),
 * it will be treated as an overpass.
 * Then, as in "OverpassTile.js", specify the overpass
 * and its entrance in the region and terrain tags.
 * 
 * Initially, the character will be treated as being under the overpass.
 * When the character passes through the entrance of the overpass,
 * the character will move above the overpass.
 * 
 * -------------------------------------------------------------------
 * [Note]
 * -------------------------------------------------------------------
 * If you specify the following in the event's note field,
 * it will appear above the overpass from the beginning.
 * 
 * <OverpassHigher>
 * 
 * Also, if you turn on the plugin parameter "AutoOverpassHigher",
 * it will automatically place events on the OverPathRegion on top.
 * In that case, if you want to place them at the bottom,
 * specify the following.
 * 
 * <OverpassHigher:false>
 * 
 * Also, the event will always be above the overpass
 * and will not move to a lower level if the following is specified
 * ※Assuming events such as flying events.
 * 
 * <OverpassFly>
 * 
 * -------------------------------------------------------------------
 * [Plugin Command (MZ)]
 * -------------------------------------------------------------------
 * ◆ChangeHeight
 * Specify the target character
 * and change its vertical relationship to the overpass.
 * Check the actual plugin command for details.
 * 
 * -------------------------------------------------------------------
 * [Plugin Command (MV)]
 * -------------------------------------------------------------------
 * ◆NRP.OverpassTile.Higher [Target] [Position (true/false)]
 * Change the height at which the target is displayed as in the MZ version.
 * ※If Position is omitted, it will be true.
 * ※It does not matter if it is uppercase or lowercase.
 * 
 * The following is an example.
 * 
 * >NRP.OverpassTile.Higher 0
 * Move this event to the upper layer.
 * ※0 can be omitted.
 * 
 * >NRP.OverpassTile.Higher 1 false
 * Move the event with ID=1 to the lower level.
 * 
 * >NRP.OverpassTile.Higher 1~10
 * Move the events with ID=1 to 10 to the upper layer.
 * 
 * >NRP.OverpassTile.Higher -1
 * Move player (-1) to the upper level.
 * 
 * >NRP.OverpassTile.Higher -1~-4
 * Move the four party members to the upper level.
 * ※-2 and below means formation walking friends.
 * 
 * -------------------------------------------------------------------
 * [Acknowledgements]
 * -------------------------------------------------------------------
 * This plugin is a modification of RPG Maker MZ's official OverpassTile.js
 * (by Triacontane and Yoji Ojima).
 *
 * -------------------------------------------------------------------
 * [Reference: From OverpassTile.js]
 * -------------------------------------------------------------------
 * Overpasses, such as bridges, can be represented on the map.
 * This plugin improves functionality for RPG Maker MV's official "OverpassTile.js" plugin's MZ.
 *
 * Since you can specify not only regions but terrain tags,
 * considerations are made for event launches and collision determination as well.
 * The plugin does not make considerations for vehicles.
 *
 * Specifications for Determination of Passage
 * -When at the entrance of a bridge
 * 　→The player can always move towards the overpass.
 * -When on an overpass
 * 　→If on top of a bridge, the player can always move towards the entrance of the bridge and overpass.
 * 　→If under a bridge, the player can never move toward the bridge's entrance.
 * -If movement allowance was not determined from the above conditions
 * 　→Follows the map's original passage settings.
 *
 * The plugin can take event launch determination and collision determination into consideration.
 * -Events with different heights (over and under a bridge) will launch, without collision.
 *
 * @------------------------------------------------------------------
 * @ Plugin Commands
 * @------------------------------------------------------------------
 * 
 * @command ChangeHeight
 * @desc Toggles whether the character will be displayed above or below the overpass.
 * 
 * @arg Target
 * @desc Specify the character (ID) whose position is to be changed. Multiple characters can be specified.
 * @type combo
 * @default 0 #this event
 * @option 0 #this event
 * @option -1 #player
 * @option -1~-4 #party
 * @option 1,2,3 #multiple
 * @option 1~3 #range
 * @option this._eventId + 1
 * 
 * @arg Higher
 * @desc Display above overpass.
 * If off, it will be displayed below.
 * @type boolean
 * @default true
 * 
 * @------------------------------------------------------------------
 * @ Plugin Parameters
 * @------------------------------------------------------------------
 * 
 * @param OverPathRegion
 * @desc Region ID set for bridge or other overpass sections.
 * @default 0
 * @type number
 *
 * @param OverPathTerrainTag
 * @desc Terrain tag set for bridge or other overpass sections.
 * @default 0
 * @type number
 *
 * @param GatewayRegion
 * @desc Region ID set for overpass entrances, such as both ends of a bridge.
 * @default 0
 * @type number
 *
 * @param GatewayTerrainTag
 * @desc Terrain tag set for overpass entrances, such as both ends of a bridge.
 * @default 0
 * @type number
 * 
 * @param ConsiderLadder
 * @desc If the character is on the overpass, ignore the ladder attribute below.
 * @default true
 * @type boolean
 * 
 * @param AutoOverpassHigher
 * @desc Events whose initial position is on the OverPathRegion are automatically placed on the upper level.
 * @default false
 * @type boolean
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.04 高機能な立体交差を実現します。
 * @author 砂川赳 (original トリアコンタン & Yoji Ojima)
 * @orderAfter NRP_EventCollisionEX
 * @orderAfter NRP_BushEX
 * @url http://newrpg.seesaa.net/article/482040708.html
 * 
 * @help マップ上で橋などの立体交差を表現できます。
 * 
 * ツクールＭＺ公式プラグイン『OverpassTile.js』の機能強化版です。
 * 立体交差上に通行禁止のタイルを配置できるため、
 * より自由度の高い立体交差を作成できます。
 * 
 * 立体交差を使わないマップでも、
 * すり抜け可能な隠し通路として利用することもできます。
 * 
 * また、イベントのメモ欄やプラグインコマンドによって、
 * プレイヤーやイベントが存在する層を切替できます。
 * 
 * 『OverpassTile.js』はツクールＭＶにも存在しますが、
 * 当プラグインはより高機能なＭＺ版に準拠しています。
 * その上でＭＶでも使用できるように改良しました。
 * 
 * -------------------------------------------------------------------
 * ■注意点
 * -------------------------------------------------------------------
 * このプラグインは、以下のプラグインよりも下に配置してください。
 * 
 * ・NRP_EventCollisionEX
 * ・NRP_BushEX
 * 
 * -------------------------------------------------------------------
 * ■使用法
 * -------------------------------------------------------------------
 * 上層（ＭＺにおけるレイヤー３～４）にタイルを配置すれば、
 * 立体交差として扱われます。
 * あとは『OverpassTile.js』と同じようにリージョンや地形タグで
 * 立体交差とその入口を指定してください。
 * 
 * 初期状態では、キャラクターは立体交差の下にいるものとして扱われます。
 * 立体交差の入口を通過すると、キャラクターが立体交差の上に移動します。
 * 
 * -------------------------------------------------------------------
 * ■メモ欄
 * -------------------------------------------------------------------
 * イベントのメモ欄に以下を指定すれば、
 * 最初から立体交差の上にいるものとして扱われます。
 * 
 * <OverpassHigher>
 * 
 * また、プラグインパラメータの『自動で上層に配置』をオンにすれば、
 * 自動的に立体交差リージョン上のイベントを上に配置します。
 * その場合、下に配置したい場合は以下を指定してください。
 * 
 * <OverpassHigher:false>
 * 
 * また、以下を指定すればイベントは常に立体交差の上となり、
 * 下層に移動することがなくなります。
 * ※空飛ぶイベントなどを想定。
 * 
 * <OverpassFly>
 * 
 * -------------------------------------------------------------------
 * ■プラグインコマンド（ＭＺ）
 * -------------------------------------------------------------------
 * ◆高さを変更
 * 対象となるキャラクターを指定し、立体交差との上下関係を変更します。
 * 詳細は実際のプラグインコマンドを確認してください。
 * 
 * -------------------------------------------------------------------
 * ■プラグインコマンド（ＭＶ）
 * -------------------------------------------------------------------
 * ◆NRP.OverpassTile.Higher [対象] [高さ（true/false）]
 * ＭＺ版と同じく対象を表示する高さを変更します。
 * ※高さを省略するとtrueになります。
 * ※大文字小文字は問いません。
 * 
 * 以下は例です。
 * 
 * >NRP.OverpassTile.Higher 0
 * このイベントを上層に移動します。
 * ※0は省略可能です。
 * 
 * >NRP.OverpassTile.Higher 1 false
 * ID=1のイベントを下層に移動します。
 * 
 * >NRP.OverpassTile.Higher 1~10
 * ID=1～10のイベントを上層に移動します。
 * 
 * >NRP.OverpassTile.Higher -1
 * プレイヤー（-1）を上層に移動します。
 * 
 * >NRP.OverpassTile.Higher -1~-4
 * パーティ４人を上層に移動します。
 * ※-2以下は隊列歩行の仲間になります。
 * 
 * -------------------------------------------------------------------
 * ■謝辞
 * -------------------------------------------------------------------
 * このプラグインはＲＰＧツクールＭＺ公式の
 * OverpassTile.js（トリアコンタン様＆Yoji Ojima様）を改修させて頂きました。
 *
 * -------------------------------------------------------------------
 * ■参考：OverpassTile.jsの解説を引用
 * -------------------------------------------------------------------
 * マップ上で橋などの立体交差を表現できます。
 * ツクールMV公式プラグイン「OverpassTile.js」のMZ向け機能強化版です。
 * 
 * リージョンだけでなく地形タグも指定可能で、
 * さらにイベントの起動や衝突判定に関する考慮がなされています。
 * 乗り物の存在は考慮しません。
 *
 * 通行可能判定に関する仕様
 * ・橋の入り口にいる場合
 * 　→立体交差に対して必ず移動できます。
 * ・立体交差にいる場合
 * 　→橋の上にいる場合、立体交差と橋の入り口に対して必ず移動できます。
 * 　→橋の下にいる場合、橋の入り口に対して必ず移動できません。
 * ・上記の条件で移動可否を判定しなかった場合
 * 　→マップの本来の通行設定に従います。
 *
 * イベントの起動判定、衝突判定を考慮できます。
 * ・高さが異なる（橋の上と下にいる）イベントは起動、衝突しません。
 * 
 * @------------------------------------------------------------------
 * @ プラグインコマンド
 * @------------------------------------------------------------------
 * 
 * @command ChangeHeight
 * @text 高さを変更
 * @desc キャラクターがいる高さを変更します。つまり立体交差の上下いずれに表示されるかを切り替えます。
 * 
 * @arg Target
 * @text 対象
 * @desc 高さを変更するキャラクター（ＩＤ）を指定します。
 * 複数指定も可能です。
 * @type combo
 * @default 0 #このイベント
 * @option 0 #このイベント
 * @option -1 #プレイヤー
 * @option -1~-4 #パーティ
 * @option 1,2,3 #複数指定
 * @option 1~3 #範囲指定
 * @option this._eventId + 1 #イベントID+1
 * 
 * @arg Higher
 * @text 上に表示
 * @desc 立体交差の上に表示します。
 * オフだと下に表示します。
 * @type boolean
 * @default true
 * 
 * @------------------------------------------------------------------
 * @ プラグインパラメータ
 * @------------------------------------------------------------------
 * 
 * @param OverPathRegion
 * @text 立体交差リージョン
 * @desc 橋などの立体交差部分に設定するリージョンIDです。
 * @default 0
 * @type number
 *
 * @param OverPathTerrainTag
 * @text 立体交差地形タグ
 * @desc 橋などの立体交差部分に設定する地形タグです。
 * @default 0
 * @type number
 *
 * @param GatewayRegion
 * @text 立体交差入り口リージョン
 * @desc 橋の両端など、立体交差の入り口部分に設定するリージョンIDです。
 * @default 0
 * @type number
 *
 * @param GatewayTerrainTag
 * @text 立体交差入り口地形タグ
 * @desc 橋の両端など、立体交差の入り口部分に設定するリージョンIDです。
 * @default 0
 * @type number
 * 
 * @param ConsiderLadder
 * @text ハシゴ属性に対応
 * @desc ハシゴ属性を立体交差に対応させます。
 * 立体交差上にいる場合、下のハシゴ属性を無視します。
 * @default true
 * @type boolean
 * 
 * @param AutoOverpassHigher
 * @text 自動で上層に配置
 * @desc 初期位置が立体交差リージョン上にあるイベントを自動で上層に配置します。
 * @default false
 * @type boolean
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
function setDefault(str, def) {
    return str ? str : def;
}

const PLUGIN_NAME = "NRP_OverpassTile";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pOverPathRegion = toNumber(parameters["OverPathRegion"]);
const pOverPathTerrainTag = toNumber(parameters["OverPathTerrainTag"]);
const pGatewayRegion = toNumber(parameters["GatewayRegion"]);
const pGatewayTerrainTag = toNumber(parameters["GatewayTerrainTag"]);
const pConsiderLadder = toBoolean(parameters["ConsiderLadder"], true);
const pAutoOverpassHigher = toBoolean(parameters["AutoOverpassHigher"], false);

/**
 * Game_CharacterBase
 */
const _Game_CharacterBase_isMapPassable = Game_CharacterBase.prototype.isMapPassable;
Game_CharacterBase.prototype.isMapPassable = function(x, y, d) {
    const passable = this.isMapPassableOnOverPath(x, y, d);
    if (passable !== undefined) {
        return passable;
    }
    return _Game_CharacterBase_isMapPassable.apply(this, arguments)
};

const _Game_CharacterBase_isCollidedWithEvents = Game_CharacterBase.prototype.isCollidedWithEvents;
Game_CharacterBase.prototype.isCollidedWithEvents = function(x, y) {
    return _Game_CharacterBase_isCollidedWithEvents.apply(this, arguments) &&
        this.isCollidedWithSameHigherEvents(x, y);
};

Game_CharacterBase.prototype.isCollidedWithSameHigherEvents = function(x, y) {
    const events = $gameMap.eventsXyNt(x, y);
    return events.some(event => this.isSameHigher(event));
};

Game_CharacterBase.prototype.isSameHigher = function(target) {
    return Math.abs(this.getHigherLevel() - target.getHigherLevel()) <= 1;
};

Game_CharacterBase.prototype.getHigherLevel = function() {
    if (!this._higher) {
        return this.isOnOverPath() ? -1 : 0;
    } else {
        return this.isOnOverPath() ? 2 : 1;
    }
};

/**
 * ●立体交差の通行判定
 */
Game_CharacterBase.prototype.isMapPassableOnOverPath = function(x, y, d) {
    const overPath = $gameMap.isOverPath(x, y);
    const gateway = $gameMap.isGatewayOverPath(x, y);
    const advancedX = $gameMap.roundXWithDirection(x, d);
    const advancedY = $gameMap.roundYWithDirection(y, d);
    const advancedOverPath = $gameMap.isOverPath(advancedX, advancedY);
    const advancedGateway = $gameMap.isGatewayOverPath(advancedX, advancedY);
    const d2 = this.reverseDir(d);

    // 現在地が入口→立体交差上に移動（変更）
    if (gateway && advancedOverPath) {
        return undefined;
        // return true;

    // 現在地が立体交差
    } else if (overPath) {
        // 現在地が立体交差上
        if (this._higher) {
            // →立体交差上に移動（変更）
            if (advancedOverPath) {
                // 処理しない（通常の移動判定）
                return undefined;
            }
            return advancedGateway;

        // 現在地が立体交差下
        } else {
            // →入口に移動
            if (advancedGateway) {
                return false;

            // →立体交差下に移動（追加）
            } else if (advancedOverPath) {
                // 下層（レイヤー１～２）の通行判定
                // 上層は☆として扱うため無視
                return isPassableLowerLayer(this, advancedX, advancedY, d2);

            // →立体交差外に移動（追加）
            } else {
                // RegionBase.jsとの競合対策
                if ($gameMap.setPassableSubject) {
                    $gameMap.setPassableSubject(this);
                }

                // 移動先の移動判定だけを参照
                return isPassable(this, advancedX, advancedY, d2);
            }
        }

    // 現在地が立体交差外→立体交差下に移動（追加）
    } else if (advancedOverPath) {
        // RegionBase.jsとの競合対策
        if ($gameMap.setPassableSubject) {
            $gameMap.setPassableSubject(this);
        }

        // 移動元の移動判定と下層（レイヤー１～２）の通行判定を参照
        return isPassable(this, x, y, d)
            && isPassableLowerLayer(this, advancedX, advancedY, d2);
    }

    return undefined;
};

const _Game_CharacterBase_refreshBushDepth = Game_CharacterBase.prototype.refreshBushDepth;
Game_CharacterBase.prototype.refreshBushDepth = function() {
    _Game_CharacterBase_refreshBushDepth.apply(this, arguments);
    this.updateOverPath();
};

Game_CharacterBase.prototype.updateOverPath = function() {
    // 常に上層
    // →直接上層に移動した場合も上層に移動
    if (this._overpassFly && this.isOnOverPath()) {
        this._higher = true;
        return;
    }

    if (this.isOnGateway()) {
        this._higher = true;
    } else if (!this.isOnOverPath()) {
        this._higher = false;
    }
};

Game_CharacterBase.prototype.isOnGateway = function() {
    return $gameMap.isGatewayOverPath(this.x, this.y);
};

Game_CharacterBase.prototype.isOnOverPath = function() {
    return $gameMap.isOverPath(this.x, this.y);
};

const _Game_CharacterBase_screenZ = Game_CharacterBase.prototype.screenZ;
Game_CharacterBase.prototype.screenZ = function() {
    const z = _Game_CharacterBase_screenZ.apply(this, arguments);

    // 飛行扱いの場合は既にＺ座標が高いのでそのまま
    if (this._overpassFly) {
        return z;
    }

    // Ｚ座標を『3+2.5 = 5.5』に変更
    // 5:通常キャラの上、6:飛行船の影の中間
    // ※元のOverpassTile.jsの仕様では6ですが、
    // 　飛行船の影より下でよいと思われるので調整しています。
    return this.isHigherPriority() ? z + 2.5 : z;
    // return this.isHigherPriority() ? z + 3 : z;
};

Game_CharacterBase.prototype.isHigherPriority = function() {
    return this._higher;
};

/**
 * ●位置によって高度を更新
 * ※フォロワーの制御のみに使用されている模様
 */
Game_CharacterBase.prototype.updateOverPathOnLocate = function() {
    this._higher = this.isOnOverPath() || this.isOnGateway();
};

/**
 * Game_Character
 */
const _Game_Character_findDirectionTo = Game_Character.prototype.findDirectionTo;
Game_Character.prototype.findDirectionTo = function(goalX, goalY) {
    let result = _Game_Character_findDirectionTo.apply(this, arguments);
    if (result + this._prevFindDirectionTo === 10) {
        result = 0;
    }
    this._prevFindDirectionTo = result;
    return result;
};

const _Game_Player_moveByInput = Game_Player.prototype.moveByInput;
Game_Player.prototype.moveByInput = function() {
    if (!$gameTemp.isDestinationValid()) {
        this._prevFindDirectionTo = 0;
    }
    _Game_Player_moveByInput.apply(this, arguments);
};

/**
 * Game_Event
 */
const _Game_Event_start = Game_Event.prototype.start;
Game_Event.prototype.start = function() {
    if (this.isTriggerIn([0, 1, 2]) && !this.isSameHigher($gamePlayer)) {
        return;
    }
    _Game_Event_start.apply(this, arguments);
};

const _Game_Event_isCollidedWithEvents = Game_Event.prototype.isCollidedWithEvents;
Game_Event.prototype.isCollidedWithEvents = function(x, y) {
    return _Game_Event_isCollidedWithEvents.apply(this, arguments) &&
        this.isCollidedWithSameHigherEvents(x, y);
};

const _Game_Event_isCollidedWithPlayerCharacters = Game_Event.prototype.isCollidedWithPlayerCharacters;
Game_Event.prototype.isCollidedWithPlayerCharacters = function(x, y) {
    if (!this.isSameHigher($gamePlayer)) {
        return false;
    }
    return _Game_Event_isCollidedWithPlayerCharacters.apply(this, arguments);
};

// EventReSpawn.jsのイベント生成に対応
if (typeof Game_PrefabEvent !== "undefined") {
    const _Game_PrefabEvent_locateWithoutStraighten = Game_PrefabEvent.prototype.locateWithoutStraighten;
    Game_PrefabEvent.prototype.locateWithoutStraighten = function(x, y) {
        _Game_PrefabEvent_locateWithoutStraighten.apply(this, arguments);

        // 自動で立体交差の上に配置
        if (pAutoOverpassHigher && this.isOnOverPath()) {
            this._higher = true;
        }

        // メモ欄から<OverpassHigher>を取得
        const overpassHigher = toBoolean(this.event().meta.OverpassHigher);
        if (overpassHigher === true) {
            // 立体交差の上に配置
            this._higher = true;
        } else if (overpassHigher === false) {
            // 立体交差の下に配置
            this._higher = false;
        }
    };
}

/**
 * ●ページ設定開始（追加）
 */
const _Game_Event_setupPageSettings = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
    _Game_Event_setupPageSettings.apply(this, arguments);

    // 自動で立体交差の上に配置
    if (pAutoOverpassHigher && this.isOnOverPath()) {
        this._higher = true;
    }

    // メモ欄から<OverpassHigher>を取得
    const overpassHigher = toBoolean(this.event().meta.OverpassHigher);
    if (overpassHigher === true) {
        // 立体交差の上に配置
        this._higher = true;
    } else if (overpassHigher === false) {
        // 立体交差の下に配置
        this._higher = false;
    }

    // メモ欄から<OverpassFly>を取得
    const overpassFly = this.event().meta.OverpassFly;
    if (overpassFly) {
        // 飛行イベントとして設定
        this._overpassFly = true;
        // プライオリティタイプを設定
        this._priorityType = 2.5;
        return;
    }
};

/**
 * Game_Followers
 */
Game_Followers.prototype.updateOverPathOnLocate = function() {
    this._data.forEach(follower => {
        follower.updateOverPathOnLocate();
    })
};

/**
 * Game_Map
 */
Game_Map.prototype.isRegionOrTerrainTag = function(x, y, regionId, terrainTag) {
    if (regionId > 0 && this.regionId(x, y) === regionId) {
        return true;
    } else if (terrainTag > 0 && this.terrainTag(x, y) === terrainTag) {
        return true;
    } else {
        return false;
    }
};

Game_Map.prototype.isOverPath = function(x, y) {
    return this.isRegionOrTerrainTag(x, y, pOverPathRegion, pOverPathTerrainTag);
};

Game_Map.prototype.isGatewayOverPath = function(x, y) {
    return this.isRegionOrTerrainTag(x, y, pGatewayRegion, pGatewayTerrainTag);
};

/**
 * 【独自】下層（レイヤー１～２）の通行判定
 */
Game_Map.prototype.isPassableLowerLayer = function(x, y, d) {
    return this.checkPassageLowerLayer(x, y, (1 << (d / 2 - 1)) & 0x0f);
};

/**
 * 【独自】下層（レイヤー１～２）の通行判定（小型船）
 */
Game_Map.prototype.isBoatPassableLowerLayer = function(x, y) {
    return this.checkPassageLowerLayer(x, y, 0x0200);
};

/**
 * 【独自】下層（レイヤー１～２）の通行判定（大型船）
 */
Game_Map.prototype.isShipPassableLowerLayer = function(x, y) {
    return this.checkPassageLowerLayer(x, y, 0x0400);
};

/**
 * 【独自】下層（レイヤー１～２）の通行判定
 */
Game_Map.prototype.checkPassageLowerLayer = function(x, y, bit) {
    const flags = this.tilesetFlags();
    const tiles = this.allTiles(x, y);
    // for (const tile of tiles) {
    for (let i = 2; i < tiles.length; i++) {
        const tile = tiles[i];

        const flag = flags[tile];
        if ((flag & 0x10) !== 0) {
            // [*] No effect on passage
            continue;
        }
        if ((flag & bit) === 0) {
            // [o] Passable
            return true;
        }
        if ((flag & bit) === bit) {
            // [x] Impassable
            return false;
        }
    }
    return false;
};

const _Tilemap_isOverpassPosition = Tilemap.prototype._isOverpassPosition;
Tilemap.prototype._isOverpassPosition = function(mx, my) {
    const result = _Tilemap_isOverpassPosition.apply(this, arguments);
    return result || ($gameMap && $gameMap.isOverPath(mx, my));
};

//-------------------------------------------------
// 以下、プラグインコマンド
//-------------------------------------------------

/**
 * ●プラグインコマンドのコンボの値を取得する。
 */
 function getComboValue(value) {
    if (value === undefined) {
        return value;
    }
    // #以降は注釈扱いなので除去
    // さらに前後の空白を除去する。
    return value.split("#")[0].trim();
}

/**
 * ●引数を元に対象（行動主体）の配列を取得する。
 * ※bindによってinterpreterをthisに渡して用いる。
 */
function makeTargets(targetId) {
    const targets = [];
    
    // 無効なら処理しない。
    if (targetId === undefined || targetId === null || targetId === "") {
        return targets;
    }

    // カンマ区切りでループ
    for (let id of targetId.split(",")) {
        // 空白除去
        id = id.trim();
        // 1~5というように範囲指定の場合
        // ※~が存在する。
        if (id.indexOf("~") >= 0) {
            const idRange = id.split("~");
            const idRangeStart = eval(idRange[0]);
            const idRangeEnd = eval(idRange[1]);

            // IDの指定範囲で実行
            // 開始のほうが終了より大きい場合は反対に実行
            if (idRangeEnd < idRangeStart) {
                for (let i = idRangeStart; i >= idRangeEnd; i--) {
                    const evalId = eval(i);
                    if (this.characterAndFollower(evalId)) {
                        targets.push(this.characterAndFollower(evalId));
                    }
                }
            } else {
                for (let i = idRangeStart; i <= idRangeEnd; i++) {
                    const evalId = eval(i);
                    if (this.characterAndFollower(evalId)) {
                        targets.push(this.characterAndFollower(evalId));
                    }
                }
            }
            
        // 通常時
        } else {
            const evalId = eval(id);
            if (this.characterAndFollower(evalId)) {
                targets.push(this.characterAndFollower(evalId));
            }
        }
    }
    return targets;
}

/**
 * 【独自】キャラクター取得時、-2以下はフォロワーとして取得する。
 */
Game_Interpreter.prototype.characterAndFollower = function(param) {
    if ($gameParty.inBattle()) {
        return null;
    // フォロワーを取得
    } else if (param <= -2) {
        // -2 -> 0, -3 -> 1というように変換
        const n = Math.abs(param) - 2;
        return $gamePlayer.followers().follower(n);
    } else if (param < 0) {
        return $gamePlayer;
    } else if (this.isOnCurrentMap()) {
        return $gameMap.event(param > 0 ? param : this._eventId);
    } else {
        return null;
    }
};

//----------------------------------------
// ＭＺ用プラグインコマンド
//----------------------------------------

if (PluginManager.registerCommand) {
    /**
     * ●高さの変更
     */
    PluginManager.registerCommand(PLUGIN_NAME, "ChangeHeight", function(args) {
        const targetId = setDefault(getComboValue(args.Target), "0");
        const higher = toBoolean(args.Higher, true);

        // 対象を生成
        // ※bindによってthisをメソッドに渡す。
        const targets = makeTargets.bind(this)(targetId);
        // 対象が取得できなければ処理しない。
        if (targets.length == 0) {
            return;
        }

        // 高度変更
        for (const target of targets) {
            target._higher = higher;
        }
    });
}

//----------------------------------------
// ＭＶ用プラグインコマンド
//----------------------------------------

/**
 * ●高さの変更
 */
const _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function(command, args) {
    _Game_Interpreter_pluginCommand.call(this, command, args);

    // 小文字化してから判定
    const lowerCommand = command.toLowerCase();
    
    // 高さを変更
    if (lowerCommand === "nrp.overpasstile.higher") {
        const targetId = setDefault(args[0], "0");
        const higher = toBoolean(args[1], true);

        // 対象を生成
        // ※bindによってthisをメソッドに渡す。
        const targets = makeTargets.bind(this)(targetId);
        // 対象が取得できなければ処理しない。
        if (targets.length == 0) {
            return;
        }

        // 高度変更
        for (const target of targets) {
            target._higher = higher;
        }
    }
};

//----------------------------------------
// ハシゴ処理
//----------------------------------------

if (pConsiderLadder) {
    /**
     * ●ハシゴ上にいるかどうか？
     */
    Game_CharacterBase.prototype.isOnLadder = function() {
        // キャラクターが上層にいる場合
        if (this._higher) {
            return $gameMap.isLadderHigher(this._x, this._y);
        }

        return $gameMap.isLadder(this._x, this._y);
    };

    /**
     * 【独自】上層がハシゴかどうか？
     */
    Game_Map.prototype.isLadderHigher = function(x, y) {
        if (!this.isValid(x, y)) {
            return false;
        }

        // 各タイルが保有するフラグ情報
        const flags = this.tilesetFlags();

        // 上層（３～４）だけを確認
        for (let i = 0; i < 2; i++) {
            const tileId = this.tileId(x, y, 3 - i);
            // ハシゴ（0x20）ならばハシゴとして判定
            if ((flags[tileId] & 0x20) !== 0) {
                return true;
            }
        }

        return false;
    };
}

//----------------------------------------
// 乗物対応
//----------------------------------------

/**
 * ●乗物のマップ通行判定
 */
const _Game_Vehicle_isMapPassable = Game_Vehicle.prototype.isMapPassable;
Game_Vehicle.prototype.isMapPassable = function(x, y, d) {
    // 小型船、大型船
    if (this.isBoat() || this.isShip()) {
        // 立体交差の通行判定
        const passable = this.isMapPassableOnOverPath(x, y, d);
        if (passable !== undefined) {
            return passable;
        }
    }

    return _Game_Vehicle_isMapPassable.apply(this, arguments);
};

/**
 * RegionBaseで定義されている関数をオーバライド
 * ※RegionBase.jsとの競合対策
 */
Game_Vehicle.prototype.findCollisionData = function(x, y) {
    // プレイヤーの情報を参照
    return $gameMap.findArrayDataRegionAndTerrain(x, y, 'collisionForPlayer');
};

/**
 * ●乗り物の乗降時の判定
 */
const _Game_Vehicle_isLandOk = Game_Vehicle.prototype.isLandOk;
Game_Vehicle.prototype.isLandOk = function(x, y, d) {
    // ※RegionBase.jsとの競合対策
    // RegionBaseの関数が有効な場合
    if ($gameMap.setPassableSubject) {
        // ロード直後、一度もsetPassableSubjectが呼ばれないまま、
        // 乗降を実行するとエラーになるので対処
        $gameMap.setPassableSubject(this);
    }

    // 現在地が立体交差の下で、かつ上陸先が通行不可の場合は乗降禁止
    if (this.isOnOverPath() && !this._higher && !$gameMap.isPassableLowerLayer(x, y, d)) {
        return false;
    }

    return _Game_Vehicle_isLandOk.apply(this, arguments);
}

/**
 * ●通行判定
 */
function isPassable(character, x, y, d) {
    // 乗物の場合
    if (character.constructor === Game_Vehicle) {
        // 小型船
        if (character.isBoat()) {
            return $gameMap.isBoatPassable(x, y);

        // 大型船
        } else if (character.isShip()) {
            return $gameMap.isShipPassable(x, y);
        }
    }

    return $gameMap.isPassable(x, y, d);
}

/**
 * ●通行判定
 */
function isPassableLowerLayer(character, x, y, d) {
    // 乗物の場合
    if (character.constructor === Game_Vehicle) {
        // 小型船
        if (character.isBoat()) {
            return $gameMap.isBoatPassableLowerLayer(x, y);

        // 大型船
        } else if (character.isShip()) {
            return $gameMap.isShipPassableLowerLayer(x, y);
        }
    }

    return $gameMap.isPassableLowerLayer(x, y, d);
}

})();
