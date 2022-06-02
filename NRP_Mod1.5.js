//=============================================================================
// NRP_Mod1.5.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc MZ1.5用の応急処置。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @orderBefore mz3d
 * 
 * @help MZ1.5用で動かなくなるプラグインに対する応急処置です。
 * 上のほうに配置してください。
 */

(function() {
"use strict";

/**
 * ●Tilemap._tileWidth, _tileHeightが参照できない問題に対応
 */
Object.defineProperties(Tilemap.prototype, {
    _tileWidth: {
        get: function() {
            return this.tileWidth;
        },
        configurable: true
    },
    _tileHeight: {
        get: function() {
            return this.tileHeight;
        },
        configurable: true
    }
});

/**
 * ●MZ3D用の対策
 */
const _Game_Map_tileWidth = Game_Map.prototype.tileWidth;
Game_Map.prototype.tileWidth = function() {
    if (!$dataSystem) {
        return 48;
    }
    return _Game_Map_tileWidth.apply(this, arguments);
};

})();
