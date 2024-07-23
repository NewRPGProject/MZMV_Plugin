//=============================================================================
// NRP_KeepBalloon.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.00 Maintains the balloon display when switching scenes.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/484023583.html
 *
 * @help Maintains the balloon display when switching scenes.
 * 
 * Normally, if you switch scenes, such as opening and closing menus,
 * the balloon on display will disappear.
 * 
 * Applying this plugin will maintain the balloon display.
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
 * @ Plugin Parameters
 * @------------------------------------------------------------------
 */

/*:ja
 * @target MZ
 * @plugindesc v1.00 シーン切替時にフキダシアイコンの表示を保持。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/484023583.html
 *
 * @help シーン切替時にフキダシアイコンの表示を保持します。
 * 
 * 通常、メニューの開閉などのシーン切替をすれば、
 * 現在表示中のフキダシアイコンは消えてしまいます。
 * 
 * このプラグインを適用するとフキダシアイコンの表示を維持できるようになります。
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

const PLUGIN_NAME = "NRP_KeepBalloon";
const parameters = PluginManager.parameters(PLUGIN_NAME);

// ----------------------------------------------------------------------------
// Scene_Map
// ----------------------------------------------------------------------------

/**
 * ●場所移動
 */
const _Scene_Map_updateTransferPlayer = Scene_Map.prototype.updateTransferPlayer;
Scene_Map.prototype.updateTransferPlayer = function() {
    if ($gamePlayer.isTransferring()) {
        // 場所移動したので保存データをクリア
        clearBalloonTempData();
    }
    _Scene_Map_updateTransferPlayer.apply(this, arguments);
};

// ----------------------------------------------------------------------------
// SceneManager
// ----------------------------------------------------------------------------

/**
 * ●シーン変更
 */
const _SceneManager_changeScene = SceneManager.changeScene;
SceneManager.changeScene = function() {
    if (this.isSceneChanging() && !this.isCurrentSceneBusy()) {
        // Scene_Mapから移動する場合
        if (this._scene && this._scene instanceof Scene_Map) {
            // 場所移動時
            if ($gamePlayer.isTransferring()) {
                // 同一マップの場合はフキダシアイコン状態を保持
                // ※ただし、リロード時は除外
                if ($gamePlayer.newMapId() == $gameMap.mapId() && !$gamePlayer._needsMapReload) {
                    this._scene._spriteset.saveBalloonTempData();
                // マップが変化した場合は保存データクリア
                } else {
                    clearBalloonTempData();
                }
                
            // フキダシアイコン状態を保持
            } else {
                this._scene._spriteset.saveBalloonTempData();
            }
        }
    }
    _SceneManager_changeScene.apply(this, arguments);
};

// ----------------------------------------------------------------------------
// Spriteset_Map
// ----------------------------------------------------------------------------

/**
 * 【独自】フキダシアイコン維持用の一時データを保存する。
 */
Spriteset_Map.prototype.saveBalloonTempData = function() {
    // アニメーション情報を$gameTempに保持しておく
    $gameTemp.balloonSprites = [];
    for (const balloonSprite of this._balloonSprites) {
        $gameTemp.balloonSprites.push(balloonSprite);
    }
};

/**
 * ●マップスプライトの初期化
 */
const _Spriteset_Map_initialize = Spriteset_Map.prototype.initialize;
Spriteset_Map.prototype.initialize = function() {
    _Spriteset_Map_initialize.apply(this, arguments);
    this.remakeBalloons();
};

/**
 * 【独自】フキダシアイコンスプライトの再作成
 */
Spriteset_Map.prototype.remakeBalloons = function() {
    if (!$gameTemp.balloonSprites) {
        return;
    }

    for (const oldSprite of $gameTemp.balloonSprites) {
        // 対象のキャラクターを取得
        const targetObject = oldSprite._target._character;

        // 対象のスプライトを再取得
        // ※保存時とは別のスプライトになっているのでキャラクターから再取得
        const targetSprite = this.findTargetSprite(targetObject);
        if (!targetSprite) {
            continue;
        }

        // Sprite_Balloonを再作成
        const sprite = new Sprite_Balloon();
        sprite.targetObject = targetObject;
        sprite.setup(targetSprite, oldSprite._balloonId);

        // 時間を再設定
        sprite._duration = oldSprite._duration;

        this._effectsContainer.addChild(sprite);
        this._balloonSprites.push(sprite);
    }

    // 保存データをクリア
    clearBalloonTempData();
};

// ----------------------------------------------------------------------------
// 共通関数
// ----------------------------------------------------------------------------

/**
 * ●フキダシアイコン保存用の一時データをクリアする。
 */
function clearBalloonTempData() {
    $gameTemp.balloonSprites = undefined;
}

})();
