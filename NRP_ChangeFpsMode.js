//=============================================================================
// NRP_ChangeFpsMode.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.00 Change the rendering FPS.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/504839628.html
 *
 * @-----------------------------------------------------
 * @ [Plugin Parameters]
 * @-----------------------------------------------------
 * 
 * @param VariableId
 * @text FPS Variable
 * @desc The game uses the value of this variable as the render FPS.
 * @type variable
 * @default 1
 *
 * @param OnlyBattle
 * @text Limited to Battle
 * @desc Limit FPS reduction to battle scenes only.
 * @type boolean
 * @default false
 *
 * @param DefaultFps
 * @text Default FPS at Startup
 * @desc The FPS used at game startup.
 * Must be a value that exists in the FPS list below.
 * @type number
 * @default 60
 *
 * @param UseOption
 * @text Show in Options
 * @desc Adds an FPS selector to the Options menu.
 * @type boolean
 * @default true
 *
 * @param OptionPosition
 * @parent UseOption
 * @text Options Position
 * @desc Position to insert into the Options menu (0-indexed).
 * Default 2 places it just below "Command Remember".
 * @type number
 * @default 2
 *
 * @param OptionName
 * @parent UseOption
 * @text Options Display Name
 * @desc The label shown in the Options menu.
 * @type string
 * @default Render FPS
 *
 * @param FpsList
 * @parent UseOption
 * @text FPS Candidates List
 * @desc The list of FPS values the player can choose from in Options.
 * @type struct<FpsEntry>[]
 * @default ["{\"Fps\":\"30\",\"Label\":\"\"}","{\"Fps\":\"40\",\"Label\":\"\"}","{\"Fps\":\"50\",\"Label\":\"\"}","{\"Fps\":\"60\",\"Label\":\"\"}"]
 *
 * @help Reduces the rendering frequency from 60 to any specified FPS value,
 * cutting the drawing load proportionally.
 * Game logic (character movement, events, battle calculations, etc.)
 * continues to run at 60 times per second, so player controls and
 * game speed remain completely unchanged.
 *
 * -------------------------------------------------------------------
 * ■ How to Control FPS
 * -------------------------------------------------------------------
 * ◆ When "Show in Options" is ON (Default)
 *
 * Players can select the FPS in the Options menu.
 * Use Left/Right keys to cycle through the FPS candidates.
 * This setting is saved independently of game save files (config.rmmzsave).
 *
 * Changing this option also updates the "FPS Variable" automatically.
 * To check the current FPS in-game, read the value of this variable.
 *
 * Note: Changing the variable directly via events will temporarily
 * alter the FPS but will NOT update the Options menu setting.
 *
 * ◆ When "Show in Options" is OFF
 *
 * Control the FPS by setting the variable via Event Commands.
 * Set the variable to the desired FPS value (e.g. 30).
 * If the value is 0 or less, or greater than 60, 60 FPS is used.
 * The state is stored individually within each save file.
 *
 * -------------------------------------------------------------------
 * ■ FPS Candidates List
 * -------------------------------------------------------------------
 * In the "FPS Candidates List" parameter, you can register multiple
 * FPS values with custom display labels for the Options menu.
 *
 * Example entries:
 *   Fps: 60  Label: 60 (Standard)
 *   Fps: 30  Label: 30 (Low Load)
 *   Fps: 15  Label: 15 (Very Low)
 *
 * The Label text can be longer, but the default display area in
 * RPG Maker MZ is limited to 120px. Use an external plugin such as
 * NRP_OptionCustomize.js (v1.01) to adjust the width.
 * https://newrpg.seesaa.net/article/502777639.html
 *
 * -------------------------------------------------------------------
 * ■ Notes
 * -------------------------------------------------------------------
 * - Animations and movement may look slightly less smooth.
 * - This does not affect BGM or SE timing.
 * - Game speed and control responsiveness are identical to 60 FPS.
 * - Do not use alongside other plugins that modify FPS.
 *
 * -------------------------------------------------------------------
 * ■ How It Works
 * -------------------------------------------------------------------
 * In rmmz_core.js, rendering is handled via "this._app.render()" inside
 * "Graphics._onTick()".
 * This plugin wraps "Graphics._onTick" to skip render calls at a ratio
 * matching the chosen FPS, without altering any game logic.
 *
 *   Graphics._onTick(deltaTime)
 *       ├─ fpsCounter.startTick() : Every frame
 *       ├─ tickHandler(deltaTime) : Every frame (logic & speed unchanged)
 *       ├─ this._app.render()     : Skipped proportionally in low-FPS mode ★
 *       └─ fpsCounter.endTick()   : Every frame (FPS display adjusted) ★
 *
 * -------------------------------------------------------------------
 * [Terms]
 * -------------------------------------------------------------------
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 */

/*~struct~FpsEntry:
 * @param Fps
 * @text FPS Value
 * @desc The FPS value selectable in the Options menu (1–60).
 * @type number
 * @min 1
 * @max 60
 * @default 60
 *
 * @param Label
 * @text Display Label
 * @desc The text displayed in the Options menu.
 * If left blank, the FPS value itself is shown.
 * @type string
 * @default 60
 */

/*:ja
 * @target MZ
 * @plugindesc v1.00 描画ＦＰＳを変更する。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/504839628.html
 *
 * @-----------------------------------------------------
 * @ プラグインパラメータ
 * @-----------------------------------------------------
 * 
 * @param VariableId
 * @text FPS変数
 * @desc この変数の値を描画ＦＰＳとして使用します。
 * 値が0以下または60より大きい場合は通常の60FPSになります。
 * @type variable
 * @default 1
 *
 * @param OnlyBattle
 * @text 戦闘時に限定
 * @desc 機能を戦闘シーンに限定します。
 * @type boolean
 * @default false
 *
 * @param DefaultFps
 * @text 起動時のデフォルトFPS
 * @desc ゲーム起動時に使用するFPSです。
 * 下記のFPS候補リストに存在する値を設定してください。
 * @type number
 * @default 60
 *
 * @param UseOption
 * @text オプションに表示
 * @desc オプション画面にFPS選択項目を追加します。
 * @type boolean
 * @default true
 *
 * @param OptionPosition
 * @parent UseOption
 * @text オプション挿入位置
 * @desc オプション画面への挿入位置（0始まり）。
 * デフォルト2はコマンド記憶の下。
 * @type number
 * @default 2
 *
 * @param OptionName
 * @parent UseOption
 * @text オプション表示名
 * @desc オプション画面に表示する項目名。
 * @type string
 * @default 描画FPS
 *
 * @param FpsList
 * @parent UseOption
 * @text FPS候補リスト
 * @desc オプション画面でプレイヤーが選択できるFPS値の一覧。
 * @type struct<FpsEntry>[]
 * @default ["{\"Fps\":\"30\",\"Label\":\"\"}","{\"Fps\":\"40\",\"Label\":\"\"}","{\"Fps\":\"50\",\"Label\":\"\"}","{\"Fps\":\"60\",\"Label\":\"\"}"]
 *
 * @help 画面描画の回数を60回/秒から指定したFPSに間引き、描画負荷を軽減します。
 * ゲームロジック（キャラ移動・イベント・戦闘計算など）は引き続き
 * 60回/秒で動作するため、プレイヤーの操作感・ゲーム速度は変わりません。
 *
 * -------------------------------------------------------------------
 * ■ＦＰＳの切替方法
 * -------------------------------------------------------------------
 * ◆『オプションに表示』がオン（初期設定）
 *
 * オプション画面でＦＰＳを選択できるようになります。
 * 左右キーでFPS候補リストに設定した値を切り替えます。
 * 設定はセーブデータとは独立して保存されます（config.rmmzsave）。
 *
 * また、設定を変更すると『FPS変数』に値が格納されます。
 * 状態を参照したい場合はこの変数を参照してください。
 *
 * 変数を直接切り替えた場合は一時的にＦＰＳを変更できますが、
 * オプション側には連動しないことに注意してください。
 *
 * ◆『オプションに表示』がオフ
 *
 * イベントコマンドで変数を操作することで、ＦＰＳを切り替えられます。
 * 変数に希望のFPS値（例：30）を設定してください。
 * 値が0以下または60より大きい場合は60FPSとして扱われます。
 * 状態はセーブデータ毎に記録されます。
 *
 * -------------------------------------------------------------------
 * ■FPS候補リストについて
 * -------------------------------------------------------------------
 * 『FPS候補リスト』のパラメータで、オプション画面に表示する
 * FPS値と表示ラベルを複数登録できます。
 *
 * 設定例：
 *   FPS: 60  ラベル: 60（標準）
 *   FPS: 30  ラベル: 30（低負荷）
 *   FPS: 15  ラベル: 15（超低負荷）
 *
 * ラベルは長い文字列も設定できますが、ＭＺの仕様では値の表示領域は
 * 120px固定になっており、文字が縮小されて表示されてしまいます。
 *
 * 値の表示領域の幅はNRP_OptionCustomize.js（ver1.01）など
 * 外部のプラグインで変更できます。
 * https://newrpg.seesaa.net/article/502777639.html
 *
 * -------------------------------------------------------------------
 * ■注意点
 * -------------------------------------------------------------------
 * ・アニメーションや移動の見た目は多少カクつきます（描画間引きの性質上）。
 * ・音楽・効果音のタイミングには影響しません。
 * ・ゲーム速度・操作応答は６０ＦＰＳ時と同一です。
 * ・他のＦＰＳ変更プラグインとの併用はしないでください。
 *
 * -------------------------------------------------------------------
 * ■仕組み
 * -------------------------------------------------------------------
 * 描画は rmmz_core.js の Graphics._onTick() 内の
 * this._app.render() で行われています。
 * Graphics._onTick をラップしてこの render 呼び出しを指定FPSの比率で
 * スキップすることで、ロジックに一切手を加えずに描画だけを制限します。
 *
 *   Graphics._onTick(deltaTime)
 *       ├─ fpsCounter.startTick() : 毎フレーム
 *       ├─ tickHandler(deltaTime) : 毎フレーム（ロジック・速度は変わらない）
 *       ├─ this._app.render()     : 低FPSモード時は比率に応じてスキップ ★
 *       └─ fpsCounter.endTick()   : 毎フレーム（FPS表示は修正）★
 *
 * -------------------------------------------------------------------
 * ■利用規約
 * -------------------------------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 */

/*~struct~FpsEntry:ja
 * @param Fps
 * @text FPS値
 * @desc オプション画面で選択できるFPS値（1〜60）。
 * @type number
 * @min 1
 * @max 60
 * @default 60
 *
 * @param Label
 * @text 表示ラベル
 * @desc オプション画面に表示するテキスト。
 * 空欄の場合はFPS値がそのまま表示されます。
 * @type string
 * @default 60
 */

(() => {
    "use strict";

    //=========================================================================
    // プラグインパラメータ
    //=========================================================================
    const pluginName  = "NRP_ChangeFpsMode";
    const parameters  = PluginManager.parameters(pluginName);
    const VARIABLE_ID = Number(parameters["VariableId"]      || 1);
    const ONLY_BATTLE = String(parameters["OnlyBattle"]      || "false") === "true";
    const DEFAULT_FPS = Number(parameters["DefaultFps"]      || 60);
    const USE_OPTION  = String(parameters["UseOption"]        || "true") === "true";
    const OPTION_NAME = String(parameters["OptionName"]       || "描画FPS");
    const OPTION_POS  = Number(parameters["OptionPosition"]   || 2);

    // FPS候補リストのパース
    const FPS_LIST = (function() {
        let raw;
        try {
            raw = JSON.parse(parameters["FpsList"] || "[]");
        } catch(e) {
            raw = [];
        }
        const list = raw.map(entry => {
            let obj;
            try { obj = JSON.parse(entry); } catch(e) { return null; }
            const fps   = Number(obj["Fps"] || 60);
            const label = obj["Label"] ? String(obj["Label"]) : String(fps);
            return { fps, label };
        }).filter(Boolean);

        // 空の場合はデフォルト（60/30）
        if (list.length === 0) {
            return [
                { fps: 60, label: "60" },
                { fps: 30, label: "30" }
            ];
        }
        return list;
    })();

    // ConfigManager / Window_Options で使うシンボル名
    const FPS_SYMBOL = "changeFpsMode";

    //=========================================================================
    // 内部状態
    //=========================================================================
    let _targetFps   = 60;  // 目標FPS（60のとき無効＝通常動作）
    let _accumulator = 0;   // 誤差蓄積値（Bresenham方式）

    //=========================================================================
    // 有効なFPS値か判定（1〜60 の整数のみ有効）
    //=========================================================================
    function isValidFps(fps) {
        return Number.isInteger(fps) && fps >= 1 && fps <= 60;
    }

    //=========================================================================
    // 低FPSモードか判定
    //=========================================================================
    function isReducedFps() {
        return _targetFps < 60;
    }

    //=========================================================================
    // Graphics._onTick をラップ
    //=========================================================================
    const _Graphics_onTick = Graphics._onTick;
    Graphics._onTick = function(deltaTime) {
        if (!isReducedFps()) {
            // ---- 60FPSモード（通常通り）----
            _Graphics_onTick.call(this, deltaTime);
            return;
        }

        // 戦闘中以外は無効の場合
        if (isNotBattleFPSMode()) {
            // ---- 60FPSモード（通常通り）----
            _Graphics_onTick.call(this, deltaTime);
            return;
        }

        // ---- 低FPSモード ----
        _accumulator += _targetFps;
        const doRender = (_accumulator >= 60);
        if (doRender) _accumulator -= 60;

        this._fpsCounter.startTick();
        if (this._tickHandler) {
            this._tickHandler(deltaTime); // ロジックは毎フレーム実行
        }
        if (doRender && this._canRender()) {
            this._app.render();           // 描画はスキップ比率に応じて実行
        }
        this._fpsCounter.endTick();
    };

    //=========================================================================
    // 戦闘時に限定かつ非戦闘時の場合
    //=========================================================================
    function isNotBattleFPSMode() {
        return ONLY_BATTLE && ($gameParty && !$gameParty.inBattle());
    }

    //=========================================================================
    // FPSカウンタの計算＆表示（スキップ比率に応じて補正）
    //=========================================================================
    const _Graphics_FPSCounter_endTick = Graphics.FPSCounter.prototype.endTick;
    Graphics.FPSCounter.prototype.endTick = function() {
        if (!isReducedFps() || isNotBattleFPSMode()) {
            // ---- 60FPSモード（通常通り）----
            _Graphics_FPSCounter_endTick.call(this);
            return;
        }

        // ---- 低FPSモード：FPS表示を実際の描画レートに補正 ----
        const time = performance.now();
        const thisFrameTime = time - this._lastLoop;
        this._frameTime += (thisFrameTime - this._frameTime) / 12;
        this.fps = (1000 / this._frameTime) * (_targetFps / 60); // ＦＰＳを補正
        this.duration = Math.max(0, time - this._frameStart);
        this._lastLoop = time;
        if (this._tickCount++ % 15 === 0) {
            this._update();
        }
    };

    //=========================================================================
    // FPSモードの適用
    //=========================================================================
    function applyFpsMode(fps) {
        const newFps = isValidFps(fps) ? fps : 60;
        if (_targetFps === newFps) return;
        _targetFps   = newFps;
        _accumulator = 0;
        console.log("[ChangeFpsMode] " + _targetFps + " FPS");
    }

    //=========================================================================
    // 変数監視
    // SceneManager.updateMain にフックして毎フレーム変数の値を確認する。
    //=========================================================================
    const _SceneManager_updateMain = SceneManager.updateMain;
    SceneManager.updateMain = function() {
        _syncFpsMode();
        _SceneManager_updateMain.call(this);
    };

    function _syncFpsMode() {
        if (typeof $gameVariables === "undefined" || !$gameVariables) return;
        const fps = $gameVariables.value(VARIABLE_ID);
        applyFpsMode(isValidFps(fps) ? fps : 60);
    }

    //=========================================================================
    // オプション未使用時：タイトル画面でＦＰＳを初期状態に戻す。
    //=========================================================================
    if (!USE_OPTION) {
        const _Scene_Title_start = Scene_Title.prototype.start;
        Scene_Title.prototype.start = function() {
            _Scene_Title_start.call(this);
            const fps = isValidFps(DEFAULT_FPS) ? DEFAULT_FPS : 60;
            applyFpsMode(fps);
            $gameVariables.setValue(VARIABLE_ID, fps);
        };

        const _DataManager_setupNewGame = DataManager.setupNewGame;
        DataManager.setupNewGame = function() {
            _DataManager_setupNewGame.call(this);
            // スイッチが初期化されてしまうため再設定
            const fps = isValidFps(DEFAULT_FPS) ? DEFAULT_FPS : 60;
            $gameVariables.setValue(VARIABLE_ID, fps);
        };
    }

    //=========================================================================
    // オプションを使用しない場合は以降処理しない。
    //=========================================================================
    if (!USE_OPTION) return;

    //=========================================================================
    // ConfigManager — オプション設定の保存・読み込み
    // 保存値はFPS数値（例: 30, 60）
    //=========================================================================
    const _defaultOptionFps = isValidFps(DEFAULT_FPS) ? DEFAULT_FPS : 60;
    ConfigManager[FPS_SYMBOL] = _defaultOptionFps;

    const _ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function() {
        const config = _ConfigManager_makeData.apply(this, arguments);
        config[FPS_SYMBOL] = this[FPS_SYMBOL];
        return config;
    };

    const _ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function(config) {
        _ConfigManager_applyData.apply(this, arguments);
        if (config[FPS_SYMBOL] !== undefined && isValidFps(Number(config[FPS_SYMBOL]))) {
            this[FPS_SYMBOL] = Number(config[FPS_SYMBOL]);
        } else {
            this[FPS_SYMBOL] = _defaultOptionFps;
        }
        // 起動時にconfig値を即時反映（$gameVariablesはまだないので内部フラグのみ更新）
        _targetFps   = isValidFps(this[FPS_SYMBOL]) ? this[FPS_SYMBOL] : 60;
        _accumulator = 0;
    };

    //=========================================================================
    // 新規ゲーム開始時：ConfigManagerの値を変数に反映
    //=========================================================================
    const _DataManager_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function() {
        _DataManager_setupNewGame.call(this);
        $gameVariables.setValue(VARIABLE_ID, ConfigManager[FPS_SYMBOL]);
    };

    //=========================================================================
    // セーブデータロード時：ConfigManagerの値を変数に反映
    // オプション設定をセーブデータの変数より優先する
    //=========================================================================
    const _DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function(contents) {
        _DataManager_extractSaveContents.call(this, contents);
        if ($gameVariables) {
            $gameVariables.setValue(VARIABLE_ID, ConfigManager[FPS_SYMBOL]);
        }
    };

    //=========================================================================
    // オプション画面への追加
    //=========================================================================

    /**
     * コマンドリストへの挿入
     */
    const _Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
    Window_Options.prototype.makeCommandList = function() {
        _Window_Options_makeCommandList.apply(this, arguments);
        const pos = OPTION_POS.clamp(0, this._list.length);
        this._list.splice(pos, 0, {
            name:    OPTION_NAME,
            symbol:  FPS_SYMBOL,
            enabled: true,
            ext:     null
        });
    };

    /**
     * 現在の設定値からFPSリスト上のインデックスを取得
     */
    function getFpsListIndex(fps) {
        const idx = FPS_LIST.findIndex(e => e.fps === fps);
        return idx >= 0 ? idx : 0;
    }

    /**
     * 表示テキスト：FPS候補リストのラベルを返す
     */
    const _Window_Options_statusText = Window_Options.prototype.statusText;
    Window_Options.prototype.statusText = function(index) {
        const symbol = this.commandSymbol(index);
        if (symbol === FPS_SYMBOL) {
            const fps     = this.getConfigValue(symbol);
            const listIdx = getFpsListIndex(fps);
            const entry   = FPS_LIST[listIdx] || FPS_LIST[0];
            return entry ? entry.label : String(fps);
        }
        return _Window_Options_statusText.apply(this, arguments);
    };

    /**
     * 決定キー：次の候補へ切り替え
     */
    const _Window_Options_processOk = Window_Options.prototype.processOk;
    Window_Options.prototype.processOk = function() {
        const symbol = this.commandSymbol(this.index());
        if (symbol === FPS_SYMBOL) {
            this._cycleFpsValue(1);
            return;
        }
        _Window_Options_processOk.apply(this, arguments);
    };

    /**
     * カーソル右：次のFPS候補へ
     */
    const _Window_Options_cursorRight = Window_Options.prototype.cursorRight;
    Window_Options.prototype.cursorRight = function(wrap) {
        const symbol = this.commandSymbol(this.index());
        if (symbol === FPS_SYMBOL) {
            this._cycleFpsValue(1);
            return;
        }
        _Window_Options_cursorRight.apply(this, arguments);
    };

    /**
     * カーソル左：前のFPS候補へ
     */
    const _Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
    Window_Options.prototype.cursorLeft = function(wrap) {
        const symbol = this.commandSymbol(this.index());
        if (symbol === FPS_SYMBOL) {
            this._cycleFpsValue(-1);
            return;
        }
        _Window_Options_cursorLeft.apply(this, arguments);
    };

    /**
     * 【独自】FPS候補リストを direction（+1/-1）方向に1つ循環させて反映
     */
    Window_Options.prototype._cycleFpsValue = function(direction) {
        if (FPS_LIST.length === 0) return;
        const currentFps = this.getConfigValue(FPS_SYMBOL);
        let   idx        = getFpsListIndex(currentFps);
        idx = (idx + direction + FPS_LIST.length) % FPS_LIST.length;
        const newFps = FPS_LIST[idx].fps;
        this.changeValue(FPS_SYMBOL, newFps);
        // 変数にも即時反映（ゲーム中にオプションを開いた場合に有効）
        if (typeof $gameVariables !== "undefined" && $gameVariables) {
            $gameVariables.setValue(VARIABLE_ID, newFps);
        }
        this.playCursorSound();
    };

    /**
     * コマンド数を1加算（ウィンドウの高さ調整に必要）
     */
    const _Scene_Options_maxCommands = Scene_Options.prototype.maxCommands;
    Scene_Options.prototype.maxCommands = function() {
        return _Scene_Options_maxCommands.apply(this, arguments) + 1;
    };

})();