//=============================================================================
// NRP_PassageAutoTileTop.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.021 Only the top of the auto tile (wall/roof) can be open to traffic.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/473715538.html
 *
 * @help Only the top of the auto tile (wall/roof) can be open to traffic.
 * 
 * Normally in RPG Maker MZ and MV,
 * only the top of an autotile cannot be made passable.
 * It has become difficult to describe things like walking behind walls,
 * which was easy in the past Maker series.
 * # This is a function that corresponds
 *   to the "□" traffic check in the old RPG Maker 2000.
 * 
 * This plugin provides an autotile that allows the character to move only the top.
 * Use a counter attribute or terrain tags as conditions.
 * 
 * The subject will be the autotile located on the roof of the A3 (building)
 * and the top of the A4 (wall).
 * 
 * [Usage]
 * 1. Set a counter attribute on the autotile (A3 roof and A4 wall top).
 * 2. Set the autotile passage to "×".
 * 
 * Now only the upper part of the targeted autotile can be moved.
 * 
 * If you set the auto tile passage to "○",
 * the tile is treated as an upper layer.
 * You can create a tile that can be passed underneath,
 * as in the case of a "☆" marking.
 * 
 * Alternatively, you can set the target terrain tag with a plugin parameter.
 * 
 * [Note Specification]
 * If you don't want to use a counter attribute or terrain tags,
 * you can also specify it as a note for the tileset.
 * The following is an example configuration.
 * 
 * <PassageA3:1,2,5>
 * This is targeted at the 1st, 2nd and 5th roofs of Auto Tile (A3).
 * 
 * <PassageA4:1~8,15>
 * This is targeted at the 1st to 8th and 15th wall of Auto Tile (A4).
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but we will respond to defects as far as possible.
 * 
 * @param UseCounter
 * @type boolean
 * @default true
 * @desc If the counter attribute of the A3~A4 tile is enabled, it allows the auto tile to move up.
 * 
 * @param TargetTerrainTag
 * @type string
 * @desc Specify the target terrain tag number.
 * Multiple specifications are possible. (eg:1,3) (eg2:1~5)
 * 
 * @param DownProhibitionFromBackA3
 * @type boolean
 * @default true
 * @desc Prohibits movement downward from the back passing tiles. This is for A3 tiles (Roof).
 * 
 * @param DownProhibitionFromBackA4
 * @type boolean
 * @default false
 * @desc Prohibits movement downward from the back passing tiles. This is for A4 tiles (Wall).
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.021 オートタイル（壁・屋根）の上部だけを通行可能に
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/473715538.html
 *
 * @help オートタイル（壁・屋根）の上部だけを通行可能にします。
 * 
 * 通常ツクールＭＺやＭＶではオートタイルの上部だけを通行可能にはできません。
 * 過去のツクールシリーズでは容易だった壁の裏を歩く
 * といった表現が困難となってしまいました。
 * ※旧作のツクール２０００における通行判定『□』に当たる機能です。
 * 
 * このプラグインはカウンター属性や地形タグなどを条件とすることで、
 * 上部だけの移動が可能なオートタイルを実現します。
 * 
 * 対象はA3（建物）の屋根、およびA4（壁）の上部オートタイルとなります。
 * 
 * ■使用方法
 * ・オートタイル（A3の屋根およびA4の壁上部）にカウンター属性を設定します。
 * ・オートタイルの通行判定を×にします。
 * 
 * 以上で設定したオートタイルの上部が移動可能となります。
 * 
 * なお、オートタイルの通行判定を○にした場合は上層扱いとなります。
 * ☆判定のように、下をくぐり抜けられるタイルを作成可能です。
 * 
 * また、プラグインパラメータにて、対象とする地形タグを設定する方法もあります。
 * 
 * ■メモ欄の指定
 * カウンター属性や地形タグを使いたくない場合、
 * タイルセットのメモ欄に指定する方法も可能です。
 * 以下は設定例です。
 * 
 * <PassageA3:1,2,5>
 * オートタイル（A3）の1,2,5番目の屋根を対象とします。
 * 
 * <PassageA4:1~8,15>
 * オートタイル（A4）の1～8番目および15番目の壁上を対象とします。
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param UseCounter
 * @text カウンター属性を使う
 * @type boolean
 * @default true
 * @desc A3~A4タイルのカウンター属性が有効な場合に、オートタイルの上部移動を可能とします。
 * 
 * @param TargetTerrainTag
 * @text 対象とする地形タグ
 * @type string
 * @desc オートタイルの上部移動を可能とする地形タグを指定します。
 * 複数指定も可能です。（例１：1,3）（例２：1~5）
 * 
 * @param DownProhibitionFromBackA3
 * @text 裏側から下への移動禁止(A3)
 * @type boolean
 * @default true
 * @desc 裏側の通過タイルから下方向への移動を禁止します。
 * こちらはA3タイル（屋根）が対象です。
 * 
 * @param DownProhibitionFromBackA4
 * @text 裏側から下への移動禁止(A4)
 * @type boolean
 * @default false
 * @desc 裏側の通過タイルから下方向への移動を禁止します。
 * こちらはA4タイル（壁上）が対象です。
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

const PLUGIN_NAME = "NRP_PassageAutoTileTop";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pUseCounter = toBoolean(parameters["UseCounter"], true);
const pTerrainTags = makeArray(parameters["TargetTerrainTag"]);
const pDownProhibitionFromBackA3 = toBoolean(parameters["DownProhibitionFromBackA3"], true);
const pDownProhibitionFromBackA4 = toBoolean(parameters["DownProhibitionFromBackA4"], false);

/**
 * ●引数を元に配列を取得する。
 */
function makeArray(values) {
    const results = [];
    if (!values) {
        return results;
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

/**
 * ■タイルが保有するフラグ情報（１６ビット）
 * 0000 0000 0000 1111	通行不可フラグ（上位から上右左下）
 * 0000 0000 0001 0000	裏側通行フラグ
 * 0000 0000 0010 0000	梯子フラグ
 * 0000 0000 0100 0000	茂みフラグ
 * 0000 0000 1000 0000	カウンターフラグ
 * 0000 0001 0000 0000	ダメージ床フラグ
 * 0000 0110 0000 0000	船移動不可フラグ（上位から大型船・小型船）
 * 0000 1000 0000 0000	飛行船着陸不可フラグ
 * 1111 0000 0000 0000	地形タグ
 * 
 * 参考：https://www.f-sp.com/entry/2016/09/25/131242
 */

//　一つのオートタイルが保有する領域
const AUTO_TILE_RANGE = 48;
// 対象のパターン：屋根上部
const TOP_OF_ROOF_TILE_PATTERNS = [2, 3, 6, 7, 15];
// 対象のパターン：壁上部（未使用）
const TOP_OF_WALL_TOP_TILE_PATTERNS = [20, 33, 34, 35, 36, 37, 42, 43, 45, 46];

/**
 * ●ゲーム開始時
 * ※Scene_Boot.prototype.onDatabaseLoadedでやりたかったけど、
 * 　ＭＺにしかないので仕方なくここで処理
 */
const _Scene_Boot_start = Scene_Boot.prototype.start;
Scene_Boot.prototype.start = function() {
    // 戦闘テストでは意味がないのでやらない
    if (DataManager.isBattleTest()) {
        // 元の処理を実行
        _Scene_Boot_start.apply(this, arguments);
        return;
    }

    // 各タイルセット毎にループ
    for (const dataTile of $dataTilesets) {
        if (!dataTile) {
            continue;
        }

        // A3のオートタイル上部（屋根）を通行可能にする。
        passageAutoTileTopA3(dataTile);
        // A4のオートタイル上部（壁）を通行可能にする。
        passageAutoTileTopA4(dataTile);
    }
    
    _Scene_Boot_start.apply(this, arguments);
};

/**
 * ●A3のオートタイル上部（屋根）を通行可能にする。
 */
function passageAutoTileTopA3(dataTile) {
    // タイル毎のフラグ情報（１６ビット）
    const flags = dataTile.flags;

    // 屋根の設定：タイルセットA3の範囲
    // １つのオートタイルにつき４８の領域を確保されているので、それぞれに実行
    for (let i = Tilemap.TILE_ID_A3; i < Tilemap.TILE_ID_A4; i += AUTO_TILE_RANGE) {
        // 全16ビットのフラグ情報
        const flag = flags[i];

        // 対象のオートタイルかどうか？
        if (isPassageAutoTileA3(flag, i, dataTile)) {
            // 二進数でデバッグ出力する場合は注釈解除
            // console.log(flag.toString(2));

            // タイル設定が通行可能かどうか？
            if (isTypePassage(flag)) {
                // 全てのパターンを通行可能＆上層に変更する。
                for (let pattern = 0; pattern < AUTO_TILE_RANGE; pattern++) {
                    const tileId = i + pattern;
                    setPassage(flags, tileId);
                    // カウンター属性を解除
                    setRemoveCounter(flags, tileId);
                }

            } else {
                for (let pattern = 0; pattern < AUTO_TILE_RANGE; pattern++) {
                    const tileId = i + pattern;
                    
                    // 屋根上部のパターンに対して、フラグ情報を通行可能＆上層に変更する。
                    if (TOP_OF_ROOF_TILE_PATTERNS.includes(pattern)) {
                        setPassageNoDownA3(flags, tileId);
                    }
                    // カウンター属性を解除
                    setRemoveCounter(flags, tileId);
                }
            }
        }
    }
}

/**
 * ●A4のオートタイル上部（壁）を通行可能にする。
 */
function passageAutoTileTopA4(dataTile) {
    // タイル毎のフラグ情報（１６ビット）
    const flags = dataTile.flags;

    // 壁の設定：タイルセットA4の範囲
    // １つのオートタイルにつき４８の領域を確保されているので、それぞれに実行
    for (let i = Tilemap.TILE_ID_A4; i < Tilemap.TILE_ID_MAX; i += AUTO_TILE_RANGE) {
        // 全16ビットのフラグ情報
        const flag = flags[i];

        // 対象のオートタイルかどうか？
        if (isPassageAutoTileA4(flag, i, dataTile)) {
            // 二進数でデバッグ出力する場合は注釈解除
            // console.log(flag.toString(2));

            // タイル設定が通行可能かどうか？
            if (isTypePassage(flag)) {
                // 全てのパターンを通行可能＆上層に変更する。
                for (let pattern = 0; pattern < AUTO_TILE_RANGE; pattern++) {
                    const tileId = i + pattern;
                    setPassage(flags, tileId);
                    // カウンター属性を解除
                    setRemoveCounter(flags, tileId);
                }

            } else {
                for (let pattern = 0; pattern < AUTO_TILE_RANGE; pattern++) {
                    const tileId = i + pattern;
                    // 上部パターンの場合
                    // ※上方向が通行禁止かどうかで判定
                    if ((flags[tileId] & 0b1000) !== 0) {
                        // フラグ情報を通行可能＆上層に変更する。
                        setPassageNoDownA4(flags, tileId);
                        // カウンター属性を解除
                        setRemoveCounter(flags, tileId);

                    // それ以外
                    } else {
                        // 通行禁止にする。
                        // ※天井部は内側に入れば移動できる仕様のため
                        setNoPassage(flags, tileId);
                        // カウンター属性を解除
                        setRemoveCounter(flags, tileId);
                    }
                }
            }
        }
    }
}

/**
 * ●タイル設定が通行可能かどうか？
 * ※○属性か否かを判定する。
 */
function isTypePassage(flag) {
    // 飛行船着陸不可フラグが0となるのでそれで判定
    // ※設定が×でも実際には移動禁止ではないため、移動判定では判定できないため。
    return (flag & 0b100000000000) === 0;
}

/**
 * ●フラグ情報を通行可能＆上層に変更する。
 * 
 * ただし、これだけだと最下層に配置した場合は通行できない。
 * ※上層判定なので下に床がないと判定されるため。
 * そこはGame_Map.prototype.checkPassageで制御する。
 */
function setPassage(flags, tileId) {
    let resultFlag;

    // 通行許可
    // ※右４ビットが通行判定なので0000にする。
    // 　0bで始まる数値は二進数
    // ※&はビット論理積
    resultFlag = flags[tileId] & 0b1111111111110000;
    // 上層へ変更
    // ※右から５ビット目を1にする。
    // ※|はビット論理和
    resultFlag = resultFlag | 0b10000;

    flags[tileId] = resultFlag;
}

/**
 * ●フラグ情報を通行可能＆上層に変更し、さらに下方向への移動を禁止する。
 * Ａ３タイル（屋根）が対象
 */
function setPassageNoDownA3(flags, tileId) {
    let resultFlag;

    // 通行許可
    // ※右４ビットが通行判定なので0000にする。
    // 　0bで始まる数値は二進数
    // ※&はビット論理積
    resultFlag = flags[tileId] & 0b1111111111110000;

    // フラグがオンの場合、さらに下方向への移動を禁止
    if (pDownProhibitionFromBackA3) {
        resultFlag = resultFlag | 0b0001;
    }

    // 上層へ変更
    // ※右から５ビット目を1にする。
    // ※|はビット論理和
    resultFlag = resultFlag | 0b10000;

    flags[tileId] = resultFlag;
}

/**
 * ●フラグ情報を通行可能＆上層に変更し、さらに下方向への移動を禁止する。
 * Ａ４タイル（壁上）が対象
 */
function setPassageNoDownA4(flags, tileId) {
    let resultFlag;

    // 通行許可
    // ※右４ビットが通行判定なので0000にする。
    // 　0bで始まる数値は二進数
    // ※&はビット論理積
    resultFlag = flags[tileId] & 0b1111111111110000;

    // フラグがオンの場合、さらに下方向への移動を禁止
    if (pDownProhibitionFromBackA4) {
        resultFlag = resultFlag | 0b0001;
    }

    // 上層へ変更
    // ※右から５ビット目を1にする。
    // ※|はビット論理和
    resultFlag = resultFlag | 0b10000;

    flags[tileId] = resultFlag;
}

/**
 * ●フラグ情報を通行不能＆上層に変更する。
 */
function setNoPassage(flags, tileId) {
    let resultFlag;

    // 通行不能
    // ※右４ビットが通行判定なので1111にする。
    resultFlag = flags[tileId] | 0b1111;
    // 上層へ変更
    // ※右から５ビット目を1にする。
    resultFlag = resultFlag | 0b10000;

    flags[tileId] = resultFlag;
}

/**
 * ●カウンタ属性を解除する。
 */
function setRemoveCounter(flags, tileId) {
    let resultFlag = flags[tileId];

    // カウンタ属性（0b10000000）解除
    if (pUseCounter) {
        resultFlag = resultFlag & 0b1111111101111111;
    }

    flags[tileId] = resultFlag;
}

/**
 * ●移動判定チェック
 */
const _Game_Map_checkPassage = Game_Map.prototype.checkPassage;
Game_Map.prototype.checkPassage = function(x, y, bit) {
    // 元の結果
    const checkPassage = _Game_Map_checkPassage.apply(this, arguments);

    // 最下層タイルをチェック
    const flags = this.tilesetFlags();
    const tiles = this.allTiles(x, y);
    const tile = tiles[tiles.length - 1];
    const flag = flags[tile];

    // タイルが存在し、かつ最下層が上層の場合は判定を行う
    if (tile && (flag & 0x10) !== 0) {
        if ((flag & bit) === 0) {
            // [o] Passable
            return true;
        }
        if ((flag & bit) === bit) {
            // [x] Impassable
            return false;
        }
    }

    return checkPassage;
};

/**
 * 【独自】制御を行う対象のA3タイルかどうかを確認します。
 */
function isPassageAutoTileA3(flag, tileId, dataTile) {
    // 屋根ではない
    if (!Tilemap.isRoofTile(tileId)) {
        return false;
    }

    // カウンタ（0b10000000）かどうか？
    if (pUseCounter && (flag & 0b10000000) !== 0) {
        return true;
    }

    // <PassageA3>タグを取得
    let passageA3 = dataTile.meta.PassageA3;
    // 屋根タイルの通過指定
    if (passageA3) {
        const passageA3Arr = makeArray(passageA3);
        const kind = getAutotileKindA3(tileId);
        // メモ欄の指定に該当があれば対象
        if (passageA3Arr.includes(kind)) {
            return true;
        }
    }

    // 地形タグを取得
    // ※右に１２ビットシフトして左４ビットだけを取得する。
    const terrainTag = flag >> 12;
    // 該当の地形タグならば
    if (pTerrainTags.includes(terrainTag)) {
        return true;
    }
    return false;
};

/**
 * 【独自】制御を行う対象のA4タイルかどうかを確認します。
 */
function isPassageAutoTileA4(flag, tileId, dataTile) {
    // 壁の上部ではない
    if (!Tilemap.isWallTopTile(tileId)) {
        return false;
    }

    // カウンタ（0b10000000）かどうか？
    if (pUseCounter && (flag & 0b10000000) !== 0) {
        return true;
    }

    // <PassageA4>タグを取得
    let passageA4 = dataTile.meta.PassageA4;
    // 壁上部タイルの通過指定
    if (passageA4) {
        const passageA4Arr = makeArray(passageA4);
        const kind = getAutotileKindA4(tileId);
        // メモ欄の指定に該当があれば対象
        if (passageA4Arr.includes(kind)) {
            return true;
        }
    }

    // 地形タグを取得
    // ※右に１２ビットシフトして左４ビットだけを取得する。
    const terrainTag = flag >> 12;
    // 該当の地形タグならば
    if (pTerrainTags.includes(terrainTag)) {
        return true;
    }
    return false;
};

/**
 * ●現在のオートタイルがA3の何番目かを取得します。
 */
function getAutotileKindA3(tileId) {
    // 壁部分は飛ばして屋根部分だけでの番号を取得
    // 00~09
    // 20~29 -> 10~19
    // 40~49 -> 20~29
    let tmp1 = Math.floor((tileId - Tilemap.TILE_ID_A3) / 48);
    let tmp2 = Math.floor(tmp1 / 16) * 8;

    return tmp1 - tmp2 + 1;
};

/**
 * ●現在のオートタイルがA4の何番目かを取得します。
 */
function getAutotileKindA4(tileId) {
    // 壁部分は飛ばして上部だけでの番号を取得
    // 00~07
    // 16~23 -> 08~15
    // 32~39 -> 16~23
    let tmp1 = Math.floor((tileId - Tilemap.TILE_ID_A4) / 48);
    let tmp2 = Math.floor(tmp1 / 16) * 8;

    return tmp1 - tmp2 + 1;
};

})();
