/* 
 * MIT License
 * 
 * Copyright (c) 2020 Nolonar
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

//=============================================================================
// Metadata
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.04 Use a map as title screen.
 * @author Takeshi Sunagawa（Original: Nolonar）
 * @orderAfter ExtraGauge
 * @url https://github.com/Nolonar/RM_Plugins
 * 
 * @param mapId
 * @text Map ID
 * @desc The id of the map to render as title screen.
 * @type number
 * @min 1
 * @default 1
 * 
 * @param startX
 * @text Start X coordinate
 * @desc The X coordinate at the start.
 * If blank, it will be placed in the center of the map automatically.
 * @type number
 * @min 0
 * @max 255
 * 
 * @param startY
 * @text Start Y coordinate
 * @desc The Y coordinate at the start.
 * If blank, it will be placed in the center of the map automatically.
 * @type number
 * @min 0
 * @max 255
 * 
 * @param readSaveFile
 * @text Read save file
 * @desc Refer to the save file so that the contents can be reflected.
 * @type boolean
 * @default false
 * 
 * @param saveFileId
 * @parent readSaveFile
 * @text Save file ID
 * @desc The number of the save file to be referenced.
 * 0: Auto Save, 1: First File
 * @type number
 * @min 0
 * @default 0
 * 
 * @param disabledParallelCommon
 * @parent readSaveFile
 * @text Disabled Parallel Common
 * @desc Triggers disable common events for automatic execution and parallel processing.
 * @type boolean
 * @default true
 * 
 * 
 * @help By using the map as the title screen,
 * a variety of effects can be realized.
 * 
 * This plugin is based on N_TitleMap.js (Version 1.0.3)
 * and modified by Takeshi Sunagawa to prevent conflicts.
 * 
 * Also, the ability to reference the contents of a save file is added.
 * (By default, it references the auto-save.)
 * Since switches, variables, party, items, etc. can be referenced,
 * it is possible to create effects such as changing the background
 * or BGM depending on the progress of the game.
 * 
 * The original N_TitleMap.js (by Nolonar) can be found below.
 * https://github.com/Nolonar/RM_Plugins
 * 
 * -------------------------------------------------------------------
 * The following is the original text
 * -------------------------------------------------------------------
 * Version 1.0.3
 * 
 * This plugin does not provide plugin commands.
 * 
 * Notes:
 * If you wish to use a map the player can visit during the game, know that
 * this plugin does not load any save games, so all Switches will be off and
 * all Variables will be 0. You can change Switches and Variables, but they
 * will be reset when you return to the Title Screen.
 * 
 * This plugin is designed without the player character (or followers) in mind.
 * If you wish to display the player character, use an event instead.
 * 
 * Works with most event command, with a few limitations:
 * 
 *      - Message type commands require user input, which conflicts with the
 *        Title Command window (players can't start a New Game, for instance).
 *        This can be worked around for "Show Text..." by ending your text
 *        message with the \^ control character.
 * 
 *      - Avoid the "Play Movie..." command. Movies will hide the Title Command
 *        window, but players can still interact with it.
 * 
 *      - The following commands do nothing:
 *          - Transfer Player...
 *          - Set Movement Route... (with Player as target)
 *          - Get on/off Vehicle
 *          - Change Transparency...
 *          - Change Player Followers...
 *          - Gather Followers
 * 
 *      - Scene Control type commands like "Battle Processing..." work, but why
 *        would you even use them on the Title Screen? Remember that all
 *        Switches (including Self Switches) and Variables will be reset when
 *        you return to the Title Screen. You could get into an infinite loop.
 * 
 *      - System Settings type commands work, but most are useless. You can't
 *        have Encounters, so changing them is pointless.
 * 
 *      - "Change Map Name Display..." does nothing.
 * 
 *      - Battle type commands only work in battle, so they do nothing.
 * 
 * Plugin compatibility:
 * This plugin replaces Scene_Title, so compatibility with plugins that modify
 * Scene_Title is not guaranteed. For best compatibility, this plugin should
 * be placed high in the plugin list.
 */

/*:ja
 * @target MZ
 * @plugindesc v1.04 マップをタイトル画面として使用する。
 * @author 砂川赳（オリジナル：Nolonar様）
 * @orderAfter ExtraGauge
 * @url https://github.com/Nolonar/RM_Plugins
 * 
 * @param mapId
 * @text マップＩＤ
 * @desc タイトル画面として使用するマップのＩＤ
 * @type number
 * @min 1
 * @default 1
 * 
 * @param startX
 * @text 開始Ｘ座標
 * @desc 開始時のＸ座標です。
 * 空欄なら自動でマップ中央に配置されます。
 * @type number
 * @min 0
 * @max 255
 * 
 * @param startY
 * @text 開始Ｙ座標
 * @desc 開始時のＹ座標です。
 * 空欄なら自動でマップ中央に配置されます。
 * @type number
 * @min 0
 * @max 255
 * 
 * @param readSaveFile
 * @text セーブファイルを参照
 * @desc セーブファイルを参照し、内容を反映できるようにします。
 * @type boolean
 * @default false
 * 
 * @param saveFileId
 * @parent readSaveFile
 * @text セーブファイル番号
 * @desc 参照するセーブファイルの番号です。
 * 0:オートセーブ, 1:一番目のファイル
 * @type number
 * @min 0
 * @default 0
 * 
 * @param disabledParallelCommon
 * @parent readSaveFile
 * @text 並列コモンの無効化
 * @desc トリガーが自動実行や並列処理のコモンイベントを無効化します。
 * @type boolean
 * @default true
 * 
 * 
 * @help マップをタイトル画面として使用することで、
 * 様々な演出を実現可能とします。
 * 
 * 当プラグインはN_TitleMap.js（Version 1.0.3）を
 * 元に砂川赳が競合対策などの改造を施したものです。
 * 
 * また、セーブファイルの内容を参照する機能を追加しています。
 * （初期状態ではオートセーブを参照します。）
 * スイッチや変数、仲間、アイテムなどが参照できるので、
 * 進行状況によって、背景やＢＧＭを変更するような演出が可能となります。
 * 
 * オリジナルのN_TitleMap.js（Nolonar様）は以下にあります。
 * https://github.com/Nolonar/RM_Plugins
 * 
 * -------------------------------------------------------------------
 * 以下、原文の日本語訳
 * -------------------------------------------------------------------
 * Version 1.0.3
 * 
 * このプラグインにはプラグインコマンドはありません。
 * 
 * [注意事項]
 * このプラグインによって呼び出されたマップでは、
 * スイッチや変数の値は初期化されます。
 * 
 * マップ内でスイッチや変数は変更可能ですが、
 * タイトル画面に戻る度にリセットされます。
 * 
 * 本プラグインは、プレイヤーキャラクター（フォロワー）を
 * 考慮せずに設計されています。
 * プレイヤーキャラクターを表示させたい場合は、
 * 代わりにイベントを使用してください。
 * 
 * ほとんどのイベントコマンドは動作しますが、いくつかの制限があります。
 * 
 * ・メッセージ系のコマンドは入力を必要とするため、
 * 　タイトルコマンドウィンドウと競合します。
 * 　（例えば、ニューゲームを受けつけなくなります。）
 * 　『文章の表示』の場合、メッセージの最後を
 * 　制御文字の\^で終了させることで回避することもできます。
 * 
 * ・『ムービーの再生』は推奨しません。
 * 　ムービーはタイトルコマンドウィンドウを隠してしまいますが、
 * 　プレイヤーはウィンドウを操作できてしまいます。
 * 
 * ・以下のコマンドは無効となります。
 * 　・場所移動
 * 　・プレイヤーを対象にした移動ルートの設定
 * 　・乗り物の乗降
 * 　・透明状態の変更
 * 　・隊列歩行の変更
 * 　・隊列メンバーの集合
 * 
 * ・『戦闘の処理』といったシーン制御系のコマンドは使えますが、
 * 　（タイトル画面で使う必要があるかは疑問ですが……）
 * 　タイトル画面に戻ると、すべてのスイッチ（セルフスイッチも含む）と変数が
 * 　リセットされることを忘れないでください。無限ループに陥る可能性があります。
 * 
 * ・システム設定系のコマンドは機能しますが、ほぼ使い物になりません。
 * 　エンカウントができないので、変更しても意味がありません。
 * 
 * ・マップ名表示の変更は無効です。
 * 
 * ・バトル系コマンドはもちろん無効です。
 * 
 * [プラグインの互換性について]
 * このプラグインは Scene_Title を置き換えるため、
 * Scene_Title を修正するプラグインとの互換性は保証されません。
 * できる限り、プラグイン一覧の上位への配置を推奨します。
 */

(() => {
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

    const PLUGIN_NAME = "NRP_N_TitleMap";

    const parameters = PluginManager.parameters(PLUGIN_NAME);
    parameters.mapId = Number(parameters.mapId) || 1;
    parameters.startX = Number(parameters.startX) || null;
    parameters.startY = Number(parameters.startY) || null;
    parameters.readSaveFile = toBoolean(parameters.readSaveFile, false);
    parameters.saveFileId = Number(parameters.saveFileId) || 0;
    parameters.disabledParallelCommon = toBoolean(parameters.disabledParallelCommon, true);

    //=========================================================================
    // Scene_TitleMap
    //=========================================================================
    const Scene_Title_old = Scene_Title;
    Scene_Title = class Scene_TitleMap extends Scene_Map {
        create() {
            Scene_Base.prototype.create.call(this);

            // セーブファイルを参照する場合
            if (parameters.readSaveFile) {
                DataManager.loadGame(parameters.saveFileId)
                    .then(() => this.onLoadSuccess())
                    .catch(() => this.onLoadFailure());
            }

            DataManager.loadMapData(parameters.mapId);
            this.createCommandWindow();
            // Scene_Map will create its own window layer later on.
            this.removeChild(this._windowLayer);

            // Needed to avoid player character from appearing on TitleMap when
            // player returns to Title.
            DataManager.setupNewGame();

            // 場所移動中のままになっているのでクリア
            $gamePlayer.clearTransferInfo();
        }

        createCommandWindow() {
            // Copy all commands from Scene_Title. This is compatible with
            // Plugins that add their own command to Scene_Title.
            const commands = Object.keys(Scene_Title_old.prototype)
                .filter(property => property.startsWith("command"));
            for (const command of commands) {
                Scene_TitleMap.prototype[command] = Scene_Title_old.prototype[command];
            }

            this.createWindowLayer();
            Scene_Title_old.prototype.createCommandWindow.call(this);
        }

        createAllWindows() {
            super.createAllWindows();
            this.addWindow(this._commandWindow);
            this._commandWindow.open();
        }

        drawGameTitle() {
            Scene_Title_old.prototype.drawGameTitle.call(this);
        }

        onMapLoaded() {
            $gameMap.setup(parameters.mapId);
            $dataMap.autoplayBgm = false; // Use Title Scene BGM instead.
            $gameMap.autoplay();

            // 開始位置を設定
            if (parameters.startX != null) {
                $gamePlayer.center(parameters.startX, parameters.startY);
            } else {
                $gamePlayer.center($gameMap.width() / 2, $gameMap.height() / 2);
            }

            super.onMapLoaded();
            Scene_Title_old.prototype.createForeground.call(this);
        }

        start() {
            super.start();
            Scene_Title_old.prototype.playTitleMusic();
        }

        // セーブファイルのロード成功時
        onLoadSuccess() {
            // 以下はクリアしておく。
            // （そうしないとロードしたマップの現状まで再現してしまう。）
            $gamePlayer = new Game_Player();
            $gameMap = new Game_Map();
            $gameScreen = new Game_Screen();
            $gameTimer = new Game_Timer();

            this._loadSuccess = true;
        };

        // セーブファイルのロード失敗時
        onLoadFailure() {
        };

        stop() {
            Scene_Base.prototype.stop.call(this);
        }

        needsFadeIn() {
            return true;
        }

        fadeOutAll() {
            // フェードアウト前に画面キャプチャをかぶせる
            // ※フェード中に画面が乱れるので、それを防ぐための措置。
            SceneManager.snapForBackground();
            this._backgroundSprite = new Sprite();
            this._backgroundSprite.bitmap = SceneManager.backgroundBitmap();
            this.addChild(this._backgroundSprite);
            this._backgroundSprite.opacity = 255;
            // 標準のフェードアウトを実行
            Scene_Title_old.prototype.fadeOutAll.call(this);

            // const time = this.slowFadeSpeed() / 60;
            // AudioManager.fadeOutBgm(time);
            // AudioManager.fadeOutBgs(time);
            // AudioManager.fadeOutMe(time);
            // this.startFadeOut(1);
        }

        update() {
            // 場所移動中は処理を停止
            // ※ニューゲームによる場所移動後まで処理が走ってしまいエラーになるため。
            if ($gamePlayer.isTransferring()) {
                Scene_Base.prototype.update.call(this);
                return;
            }

            $gameMap.update(true);
            $gameScreen.update();

            this.updateWaitCount();
            Scene_Base.prototype.update.call(this);
        }

        terminate() {
            super.terminate();
            const stopVideo = {
                MV: () => {
                    if (Graphics.isVideoPlaying()) {
                        Graphics._video.pause();
                        Graphics._onVideoEnd();
                    }
                },
                MZ: () => {
                    if (Video.isPlaying()) {
                        Video._element.pause();
                        Video._onEnd();
                    }
                }
            }[Utils.RPGMAKER_NAME];
            stopVideo();
        }

        isBusy() {
            // コマンドウィンドウが閉じるのを待つ
            return this._commandWindow.isClosing() || super.isBusy();
        }
    }

    function resetWeather() {
        $gameScreen.changeWeather("none", 0, 0);
    }

    function freezeCamera(action) {
        const previousMap = $gameMap;
        action();
        for (const property of ["_displayX", "_displayY", "_parallaxX", "_parallaxY"])
            $gameMap[property] = previousMap[property];
    }

    const Scene_Title_commandNewGame = Scene_Title_old.prototype.commandNewGame;
    Scene_Title_old.prototype.commandNewGame = function () {
        freezeCamera(Scene_Title_commandNewGame.bind(this));
        resetWeather();
    };

    const Scene_Load_onLoadSuccess = Scene_Load.prototype.onLoadSuccess;
    Scene_Load.prototype.onLoadSuccess = function () {
        Scene_Load_onLoadSuccess.call(this);
        resetWeather();
    }

    //=========================================================================
    // Game_Map
    //=========================================================================

    // 並列＆自動コモンイベントの無効化
    if (parameters.readSaveFile && parameters.disabledParallelCommon) {
        const _Game_Map_autorunCommonEvents = Game_Map.prototype.autorunCommonEvents;
        Game_Map.prototype.autorunCommonEvents = function() {
            // タイトル画面ならば自動コモンを無効
            if (SceneManager._scene.constructor.name == "Scene_TitleMap") {
                return [];
            }
            return _Game_Map_autorunCommonEvents.apply(this, arguments);
        };

        const _Game_Map_parallelCommonEvents = Game_Map.prototype.parallelCommonEvents;
        Game_Map.prototype.parallelCommonEvents = function() {
            // タイトル画面ならば並列コモンを無効
            if (SceneManager._scene.constructor.name == "Scene_TitleMap") {
                return [];
            }
            return _Game_Map_parallelCommonEvents.apply(this, arguments);
        };
    }

    //=========================================================================
    // ExtraGauge.jsとの競合解決
    //=========================================================================
    if (Scene_Base.prototype.addExtraGauge) {
        const _Scene_Base_addExtraGauge = Scene_Base.prototype.addExtraGauge;
        Scene_Base.prototype.addExtraGauge = function() {
            // ゲージデータが存在しない場合は生成する。
            if (!this._extraGauges) {
                this.createExtraGauges();
            }
            _Scene_Base_addExtraGauge.apply(this, arguments);
        };
    }
})();
