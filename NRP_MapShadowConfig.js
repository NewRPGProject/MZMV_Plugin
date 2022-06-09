//=============================================================================
// NRP_MapShadowConfig.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.021 Sets the settings for shadows on the map.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/479088201.html
 *
 * @help Sets the settings for shadows on the map.
 * ※This plugin will not work with RPG Maker MV.
 * 
 * [Features]
 * ・Diagonalize the shadow created by the shadow pen.
 * ・Change the opacity of the shadow.
 * ・Do not create a shadow on the table.
 * 
 * ◆Procedure for diagonalizing the shadow
 * If you create the following four shadow patterns with the shadow pen,
 * they will be displayed as diagonal shadows when the game is run.
 * ■■　■□　□■　■■
 * ■□　■■　■■　□■
 * 
 * The feature must be turned on,
 * either by a plugin parameter or by a note in the tileset.
 * 
 * [Individual Settings]
 * If you specify the following for the tileset note,
 * it will take precedence over the plugin parameters.
 * 
 * <DiagonalShadow:[true or false]>
 * Changes whether the shadow will be diagonal or not.
 * Note that true can be omitted. (Example: <DiagonalShadow>)
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but we will respond to defects as far as possible.
 * 
 * @param DiagonalShadow
 * @type boolean
 * @default false
 * @desc Diagonalize the shape of the shadow for a particular pattern.
 * 
 * @param ShadowOpacity
 * @type number @decimals 2 @max 1
 * @desc Sets the opacity between 0~1.
 * Default 0.5; setting it to 1 will make it completely black.
 * 
 * @param NoTableShadow
 * @type boolean
 * @default false
 * @desc It does not create a shadow over the table (counter attribute of A2 tile).
 */

/*:ja
 * @target MZ
 * @plugindesc v1.021 マップの影に関する設定を行います。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/479088201.html
 *
 * @help マップの影に関する設定を行います。
 * ※このプラグインはツクールＭＶでは動作しません。
 * 
 * ■機能
 * ・影ペンで作成した影を斜めにする。
 * ・影の不透明度を変更する。
 * ・テーブルの上に影を作らない。
 * 
 * ◆影を斜めにする手順
 * 以下の４パターンの影を影ペンで作成すれば、
 * ゲーム実行時に斜めの影として表示されます。
 * ■■　■□　□■　■■
 * ■□　■■　■■　□■
 * 
 * なお、プラグインパラメータ、またはタイルセットのメモ欄によって、
 * 機能をオンにする必要があります。
 * 
 * ■個別設定
 * タイルセットのメモ欄に以下を指定すれば、
 * プラグインパラメータよりも優先されます。
 * 
 * <DiagonalShadow:[true or false]>
 * 影を斜めにするかどうかを変更します。
 * ちなみにtrueは省略できます。（例：<DiagonalShadow>）
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param DiagonalShadow
 * @text 影を斜めにする
 * @type boolean
 * @default false
 * @desc 特定のパターンの影の形を斜めにします。
 * 
 * @param ShadowOpacity
 * @text 不透明度
 * @type number @decimals 2 @max 1
 * @desc 0~1の間で不透明度を設定します。
 * 初期値は0.5。1にすると真っ黒になります。
 * 
 * @param NoTableShadow
 * @text テーブルの上に影を作らない
 * @type boolean
 * @default false
 * @desc テーブル（A2タイルのカウンター属性）の上に影を作りません。
 * 床にのみ影を表示させられます。
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
    if (str == "") {
        return def;
    }
    return isFinite(str) ? str : def;
}

const PLUGIN_NAME = "NRP_MapShadowConfig";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pDiagonalShadow = toBoolean(parameters["DiagonalShadow"], false);
const pOpacity = toNumber(parameters["ShadowOpacity"]);
const pNoTableShadow = toBoolean(parameters["NoTableShadow"], false);

if (pNoTableShadow) {
    /**
     * ●タイルの配置
     */
    const _Tilemap__addSpot = Tilemap.prototype._addSpot;
    Tilemap.prototype._addSpot = function(startX, startY, x, y) {
        const mx = startX + x;
        const my = startY + y;
        const tileId1 = this._readMapData(mx, my, 1);

        // カウンター属性かどうか？
        const flag1 = this.flags[tileId1];
        // カウンターではない
        if ((flag1 & 0b10000000) === 0) {
            // 元の処理を実行
            _Tilemap__addSpot.apply(this, arguments);
            return;
        }

        const dx = x * (this.tileWidth || this._tileWidth);
        const dy = y * (this.tileHeight || this._tileHeight);
        const tileId0 = this._readMapData(mx, my, 0);
        const tileId2 = this._readMapData(mx, my, 2);
        const tileId3 = this._readMapData(mx, my, 3);
        const shadowBits = this._readMapData(mx, my, 4);
        const upperTileId1 = this._readMapData(mx, my - 1, 1);

        this._addSpotTile(tileId0, dx, dy);

        // tileId1部分よりも先に影を描画する。
        this._addShadow(this._lowerLayer, shadowBits, dx, dy);
        this._addSpotTile(tileId1, dx, dy);

        if (this._isTableTile(upperTileId1) && !this._isTableTile(tileId1)) {
            if (!Tilemap.isShadowingTile(tileId0)) {
                this._addTableEdge(this._lowerLayer, upperTileId1, dx, dy);
            }
        }
        if (this._isOverpassPosition(mx, my)) {
            this._addTile(this._upperLayer, tileId2, dx, dy);
            this._addTile(this._upperLayer, tileId3, dx, dy);
        } else {
            this._addSpotTile(tileId2, dx, dy);
            this._addSpotTile(tileId3, dx, dy);
        }
    };
}

/**
 * ●影の作成
 */
const _Tilemap__addShadow = Tilemap.prototype._addShadow;
Tilemap.prototype._addShadow = function(layer, shadowBits, dx, dy) {
    if (shadowBits & 0x0f) {
        const w1 = (this.tileWidth || this._tileWidth) / 2;
        const h1 = (this.tileHeight || this._tileHeight) / 2;

        // 斜め影の作成
        if (isDiagonalShadow() && makeDiagonalShadow(layer, shadowBits, dx, dy, w1, h1)) {
            return true;
        }
    }

    _Tilemap__addShadow.apply(this, arguments);
};

/**
 * ●影の作成を行う。
 * 
 * ※影の情報は以下のように４分割されて管理されている。
 * 01
 * 23
 * 
 * dx: 開始位置Ｘ座標
 * dy: 開始位置Ｙ座標
 * w1: タイルの横幅
 * h1: タイルの縦幅
 */
function makeDiagonalShadow(layer, shadowBits, dx, dy, w1, h1) {
    /*
     * ■■
     * ■□
     * 0,1,2が影の場合
     * ※二進数0111に相当
     */
    if (shadowBits == 0b0111) {
        for (let i = 0; i < 4; i++) {
            if (shadowBits & (1 << i)) {
                const dx1 = dx + (i % 2) * w1;
                const dy1 = dy + Math.floor(i / 2) * h1;

                if (i == 1 || i == 2) {
                    // 影を斜めに描画
                    for (let j = 0; j < h1; j++) {
                        layer.addRect(-1, 0, 0, dx1, dy1 + j, w1 - j, 1);
                    }
                } else {
                    layer.addRect(-1, 0, 0, dx1, dy1, w1, h1);
                }
            }
        }
        return true;
    }

    /*
     * ■□
     * ■■
     * 0,2,3が影の場合
     * ※二進数1101に相当
     */
    if (shadowBits == 0b1101) {
        for (let i = 0; i < 4; i++) {
            if (shadowBits & (1 << i)) {
                const dx1 = dx + (i % 2) * w1;
                const dy1 = dy + Math.floor(i / 2) * h1;

                if (i == 0 || i == 3) {
                    // 影を斜めに描画
                    for (let j = 0; j < h1; j++) {
                        layer.addRect(-1, 0, 0, dx1, dy1 + j, 1 + j, 1);
                    }
                } else {
                    layer.addRect(-1, 0, 0, dx1, dy1, w1, h1);
                }
            }
        }
        return true;
    }

    /*
     * □■
     * ■■
     * 1,2,3が影の場合
     * ※二進数1110に相当
     */
    if (shadowBits == 0b1110) {
        for (let i = 0; i < 4; i++) {
            if (shadowBits & (1 << i)) {
                const dx1 = dx + (i % 2) * w1;
                const dy1 = dy + Math.floor(i / 2) * h1;

                if (i == 1 || i == 2) {
                    // 影を斜めに描画
                    for (let j = 0; j < h1; j++) {
                        layer.addRect(-1, 0, 0, dx1 + w1 - j - 1, dy1 + j, 1 + j, 1);
                    }
                } else {
                    layer.addRect(-1, 0, 0, dx1, dy1, w1, h1);
                }
            }
        }
        return true;
    }

    /*
     * ■■
     * □■
     * 0,1,3が影の場合
     * ※二進数1011に相当
     */
    if (shadowBits == 0b1011) {
        for (let i = 0; i < 4; i++) {
            if (shadowBits & (1 << i)) {
                const dx1 = dx + (i % 2) * w1;
                const dy1 = dy + Math.floor(i / 2) * h1;

                if (i == 0 || i == 3) {
                    // 影を斜めに描画
                    for (let j = 0; j < h1; j++) {
                        layer.addRect(-1, 0, 0, dx1 + j, dy1 + j, w1 - j, 1);
                    }
                } else {
                    layer.addRect(-1, 0, 0, dx1, dy1, w1, h1);
                }
            }
        }
        return true;
    }
    
    // 処理しない
    return false;
}

/**
 * ●影を斜めにするかどうか？
 */
function isDiagonalShadow() {
    const tileset = $gameMap.tileset();
    return tileset && tileset.isDiagonalShadow;
}

/**
 * ●マップ情報の設定
 */
const _Game_Map_setup = Game_Map.prototype.setup;
Game_Map.prototype.setup = function(mapId) {
    _Game_Map_setup.apply(this, arguments);
    
    // 影を斜めにするかを設定
    // ※影の描画は常駐処理なので、極力処理はこちらでやっておく。
    const tileset = this.tileset();
    if (!tileset) {
        return;
    }

    tileset.isDiagonalShadow = getDiagonalShadow(tileset);
};

/**
 * ●タイルセットの変更
 */
const _Game_Map_changeTileset = Game_Map.prototype.changeTileset;
Game_Map.prototype.changeTileset = function(tilesetId) {
    _Game_Map_changeTileset.apply(this, arguments);

    // 影を斜めにするかを設定
    const tileset = this.tileset();
    if (!tileset) {
        return;
    }

    tileset.isDiagonalShadow = getDiagonalShadow(tileset);
};

/**
 * ●影を斜めにするかどうかを設定
 */
function getDiagonalShadow(tileset) {
    const isDiagonalShadow = tileset.meta.DiagonalShadow;

    // 指定がなければ設定値
    if (isDiagonalShadow === undefined) {
        return pDiagonalShadow;
    }

    // 個別の指定があれば優先
    if (isDiagonalShadow == true) {
        return true;
    }
    return false;
}

//------------------------------------------------
// 不透明度の変更
//------------------------------------------------
if (pOpacity !== undefined) {
    Tilemap.Renderer.prototype._createShader = function() {
        const vertexSrc =
            "attribute float aTextureId;" +
            "attribute vec4 aFrame;" +
            "attribute vec2 aSource;" +
            "attribute vec2 aDest;" +
            "uniform mat3 uProjectionMatrix;" +
            "varying vec4 vFrame;" +
            "varying vec2 vTextureCoord;" +
            "varying float vTextureId;" +
            "void main(void) {" +
            "  vec3 position = uProjectionMatrix * vec3(aDest, 1.0);" +
            "  gl_Position = vec4(position, 1.0);" +
            "  vFrame = aFrame;" +
            "  vTextureCoord = aSource;" +
            "  vTextureId = aTextureId;" +
            "}";
        const fragmentSrc =
            "varying vec4 vFrame;" +
            "varying vec2 vTextureCoord;" +
            "varying float vTextureId;" +
            "uniform sampler2D uSampler0;" +
            "uniform sampler2D uSampler1;" +
            "uniform sampler2D uSampler2;" +
            "void main(void) {" +
            "  vec2 textureCoord = clamp(vTextureCoord, vFrame.xy, vFrame.zw);" +
            "  int textureId = int(vTextureId);" +
            "  vec4 color;" +
            "  if (textureId < 0) {" +
            // "    color = vec4(0.0, 0.0, 0.0, 0.5);" +
            "    color = vec4(0.0, 0.0, 0.0, " + pOpacity + ");" + // 影の不透明度
            "  } else if (textureId == 0) {" +
            "    color = texture2D(uSampler0, textureCoord / 2048.0);" +
            "  } else if (textureId == 1) {" +
            "    color = texture2D(uSampler1, textureCoord / 2048.0);" +
            "  } else if (textureId == 2) {" +
            "    color = texture2D(uSampler2, textureCoord / 2048.0);" +
            "  }" +
            "  gl_FragColor = color;" +
            "}";

        return new PIXI.Shader(PIXI.Program.from(vertexSrc, fragmentSrc), {
            uSampler0: 0,
            uSampler1: 0,
            uSampler2: 0,
            uProjectionMatrix: new PIXI.Matrix()
        });
    };
}

})();
