//=============================================================================
// NRP_MessageAutoCapture.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.00 Automatically capture message screens.
 * @author Takeshi Sunagawa (https://newrpg.seesaa.net/)
 * @orderAfter NRP_MultiLanguage
 * @url https://newrpg.seesaa.net/article/521916718.html
 * 
 * @help Automatically capture message screens.
 * This plugin is intended for reviewing translations with AI agents
 * such as Codex.
 *
 * -------------------------------------------------------------------
 * [Overview]
 * -------------------------------------------------------------------
 * Although modern AI translation is highly capable, text alone often
 * does not provide enough context for an accurate translation.
 *
 * For example, translating Japanese into English may require knowing:
 * - The subject or object omitted from the original sentence
 * - Whether something is singular or plural
 * - A character's gender
 * - Who is talking to whom
 *
 * Also, text stored in game data is often not arranged in story order,
 * making it difficult to review conversations chronologically.
 *
 * This plugin automatically saves message screens in the order they
 * appear during playtesting. The actual game screen lets you check
 * whether the translation matches the situation.
 * Duplicate messages are skipped when Skip Duplicates is enabled.
 *
 * -------------------------------------------------------------------
 * [Usage]
 * -------------------------------------------------------------------
 * Set the Capture Folder parameter. Leaving it blank disables capture.
 * Relative paths are resolved from the project folder.
 *
 * Screens are automatically captured for Show Text commands during
 * desktop playtesting. Capture is disabled outside test play.
 * Standalone Show Choices commands are also supported.
 *
 * Images are saved as: CaptureFolder/YYYYMMDD/0000.jpg
 * Each image has a JSON file with the same base name, recording the
 * message text, original text, language, event location, capture time,
 * and page number.
 *
 * Ask your AI agent to review the JPG and JSON files in that folder.
 * You can also have the agent read this plugin to understand how the
 * capture files are organized.
 *
 * -------------------------------------------------------------------
 * [Details]
 * -------------------------------------------------------------------
 * A screen is captured when you advance a message, before it changes.
 * Choices are captured just before confirmation or cancellation.
 *
 * Automatic message closing (\^) is supported. Capture waits at least
 * 12 frames after the text finishes and takes place after rendering.
 * Message advancement and automatic closing may be held briefly
 * while capturing.
 *
 * Duplicate detection uses the map ID, event ID, page, command position,
 * language, speaker name, and message text.
 * Even the same Show Text command is captured again if variable values
 * or the language change.
 * Delete capture-index.json in the Capture Folder to reset duplicate
 * detection. Restart test play after resetting it.
 *
 * -------------------------------------------------------------------
 * [Integration with NRP_MultiLanguage]
 * -------------------------------------------------------------------
 * Integration is automatic when NRP_MultiLanguage is installed.
 * Related information is recorded in the JSON file accompanying each JPG.
 *
 * Original text is taken from the event text before translation.
 * Escape codes in the original-text area are kept as literal text;
 * translations and scripts are not executed there.
 * Even for messages spanning multiple pages, the original-text area
 * shows the entire message.
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
 * @-----------------------------------------------------
 * @ [Plugin Parameters]
 * @-----------------------------------------------------
 *
 * @param CaptureFolder
 * @text Capture Folder
 * @type string
 * @desc Output folder: an absolute path or a path relative to the project. Leave blank to disable capture.
 *
 * @param ImageScale
 * @text Image Scale
 * @type number
 * @decimals 2
 * @min 0.1
 * @max 2
 * @default 1
 * @desc Scale of the game screenshot. Information such as original text is appended below without scaling.
 *
 * @param JpegQuality
 * @text JPEG Quality
 * @type number
 * @decimals 2
 * @min 0.1
 * @max 1
 * @default 0.85
 * @desc 0.1 to 1. Higher values give better image quality and larger files.
 *
 * @param SkipDuplicates
 * @text Skip Duplicates
 * @type boolean
 * @default true
 * @desc Skip saving messages already recorded in the duplicate index.
 *
 * @param ShowMapName
 * @text Append Map Name
 * @type boolean
 * @default false
 * @desc Append the map ID and editor map name below the screenshot.
 *
 * @param ShowOriginal
 * @text Append Original Text
 * @type boolean
 * @default false
 * @desc Append the speaker name and message text before translation below the screenshot.
 * 
 */

/*:ja
 * @target MZ
 * @plugindesc v1.00 メッセージ画面を自動保存します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @orderAfter NRP_MultiLanguage
 * @url https://newrpg.seesaa.net/article/521916718.html
 * 
 * @help メッセージ画面を自動保存します。
 * CodexなどのＡＩエージェントと組み合わせることで、
 * 翻訳文をチェックする用途を想定しています。
 * 
 * -------------------------------------------------------------------
 * ■概要
 * -------------------------------------------------------------------
 * 現在のＡＩ翻訳は極めて高性能ですが、
 * 文章だけで完全な翻訳をすることは非常に難しいです。
 * 
 * 例えば、日本語から英語に翻訳する場合、
 * 
 * ・省略されている主語や目的語
 * ・そのモノが単数か複数か？
 * ・その人物が男か女か？
 * ・誰と誰が話しているのか？
 * 
 * といった情報が必要になります。
 * 
 * また多くの場合、文章データは格納順もバラバラなので
 * ストーリーの時系列に沿って確認することが難しいです。
 * 
 * そこでこのプラグインでは、ゲームをテストプレイした際に
 * 表示されたメッセージと画面を自動で順番に保存します。
 * 実際のゲーム画面を参照することで現在の状況と翻訳文に
 * 食い違いがないかを確認できるようになります。
 * 
 * なお、内容が同じメッセージは保存対象から除外されます。
 * 
 * -------------------------------------------------------------------
 * ■使用方法
 * -------------------------------------------------------------------
 * プラグインパラメータの保存フォルダを設定してください。
 * 空欄の場合は動作しません。相対パスはプロジェクト基準です。
 * 
 * テストプレイ時、「文章の表示」毎にキャプチャを自動実行します。
 * 製品版では自動で無効になります。
 * 
 * 保存先/YYYYMMDD/0000.jpg の形式で保存します。
 * 各画像には同名のJSONを保存します。本文、原文、表示言語、イベント位置、
 * 撮影日時、ページ番号を記録するので、画像と一緒に参照できます。
 * 
 * 後は、ＡＩエージェントに該当のフォルダを参照させ、
 * jpgとjsonをチェックするように指示すればＯＫです。
 * 
 * ＡＩへの説明が面倒なら、
 * このプラグインを読み込ませてしまうのが手っ取り早いです。
 * 
 * -------------------------------------------------------------------
 * ■細かい仕様
 * -------------------------------------------------------------------
 * メッセージ送りの入力を受けた瞬間、画面が切り替わる前に撮影します。
 * 『選択肢』については、確定またはキャンセル直前に撮影します。
 * 
 * 自動終了（\^）にも対応しています。
 * 自動終了は表示完了から12フレーム以上待ち、描画後に撮影します。
 * 保存中はページ送りと自動終了を短時間保留します。
 *
 * 重複判定は『マップＩＤ』『イベントＩＤ』『ページ』『コマンド位置』『言語』
 * 『名前欄』『本文』を使用します。
 * 同一の文章コマンドでも変数の値や言語が異なれば再保存します。
 * 保存先直下のcapture-index.jsonを削除すると重複情報をリセットできます。
 *
 * -------------------------------------------------------------------
 * ■NRP_MultiLanguageとの連携
 * -------------------------------------------------------------------
 * NRP_MultiLanguageを使用している場合は自動で連携されます。
 * jpgに付属するjson内に関連データを自動で記録します。
 * 
 * 原文は翻訳前のイベント文章を使用します。
 * 原文欄は制御文字を文字列として残します（翻訳・スクリプトは実行しません）。
 * 改ページがある場合も原文欄にはメッセージ全体を表示します。
 *
 * -------------------------------------------------------------------
 * ■利用規約
 * -------------------------------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @-----------------------------------------------------
 * @ プラグインパラメータ
 * @-----------------------------------------------------
 *
 * @param CaptureFolder
 * @text 保存フォルダ
 * @type string
 * @desc キャプチャ保存先。絶対パスまたはプロジェクトからの相対パス。空欄なら無効。
 *
 * @param ImageScale
 * @text 画像サイズ倍率
 * @type number
 * @decimals 2
 * @min 0.1
 * @max 2
 * @default 1
 * @desc ゲーム画面の拡大縮小倍率。原文などの情報欄は縮小せず下部に追加します。
 *
 * @param JpegQuality
 * @text JPEG品質
 * @type number
 * @decimals 2
 * @min 0.1
 * @max 1
 * @default 0.85
 * @desc 0.1～1。大きいほど高画質で容量が増えます。
 *
 * @param SkipDuplicates
 * @text 重複保存を防止
 * @type boolean
 * @default true
 * @desc 重複したメッセージの場合は保存を実行しません。
 *
 * @param ShowMapName
 * @text マップ名を追加
 * @type boolean
 * @default false
 * @desc 画像下に「マップID:管理用マップ名」を追加します。
 *
 * @param ShowOriginal
 * @text 原文を追加
 * @type boolean
 * @default false
 * @desc 画像下に翻訳前の名前欄と本文を追加します。
 */

(() => {
    "use strict";
    const parameters = PluginManager.parameters("NRP_MessageAutoCapture");
    if (!Utils.isNwjs() || !Utils.isOptionValid("test") || !parameters.CaptureFolder?.trim()) return;

    const fs = require("fs");
    const path = require("path");
    const crypto = require("crypto");
    const base = path.dirname(process.mainModule.filename);
    const folder = path.resolve(base, parameters.CaptureFolder.trim());
    const indexPath = path.join(folder, "capture-index.json");
    const scale = Math.min(2, Math.max(0.1, Number(parameters.ImageScale) || 1));
    const quality = Math.min(1, Math.max(0.1, Number(parameters.JpegQuality) || 0.85));
    const skip = parameters.SkipDuplicates !== "false";
    const showMap = parameters.ShowMapName !== "false";
    const showOriginal = parameters.ShowOriginal !== "false";
    let disabled = false;
    let index;
    let pending = null;
    const rawCache = new Map();
    const hash = value => crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");

    function fail(error) {
        disabled = true;
        console.error("NRP_MessageAutoCapture: STOP CAPTURE", error);
    }

    function rawFile(name) {
        if (!rawCache.has(name)) {
            rawCache.set(name, JSON.parse(fs.readFileSync(path.join(base, "data", name), "utf8").replace(/^\uFEFF/, "")));
        }
        return rawCache.get(name);
    }

    function identify(interpreter) {
        const list = interpreter._list;
        // setupで渡された配列は標準処理では複製されない。
        for (const common of $dataCommonEvents || []) {
            if (common && common.list === list) return { type: "common", id: common.id, page: 0 };
        }
        for (const troop of $dataTroops || []) {
            const page = troop?.pages.findIndex(p => p.list === list);
            if (page >= 0) return { type: "troop", id: troop.id, page };
        }
        for (const event of $dataMap?.events || []) {
            const page = event?.pages.findIndex(p => p.list === list);
            if (page >= 0) return { type: "map", id: event.id, page };
        }
        // セーブから復元された実行リストには参照の一致がないため内容で照合。
        const signature = hash(list);
        for (const common of $dataCommonEvents || []) {
            if (common && hash(common.list) === signature) return { type: "common", id: common.id, page: 0 };
        }
        const event = $dataMap?.events[interpreter._eventId];
        const page = event?.pages.findIndex(p => hash(p.list) === signature);
        if (page >= 0) return { type: "map", id: event.id, page };
        for (const troop of $dataTroops || []) {
            const troopPage = troop?.pages.findIndex(p => hash(p.list) === signature);
            if (troopPage >= 0) return { type: "troop", id: troop.id, page: troopPage };
        }
        return { type: "unknown", id: interpreter._eventId, page: -1, signature };
    }

    function originalMessage(source, mapId, commandIndex, fallback) {
        try {
            let list;
            if (source.type === "map") {
                list = rawFile("Map" + String(mapId).padStart(3, "0") + ".json").events[source.id].pages[source.page].list;
            } else if (source.type === "common") {
                list = rawFile("CommonEvents.json")[source.id].list;
            } else if (source.type === "troop") {
                list = rawFile("Troops.json")[source.id].pages[source.page].list;
            }
            if (list?.[commandIndex]?.code === 102) {
                return { speaker: "", text: list[commandIndex].parameters[0].join("\n") };
            }
            if (!list || list[commandIndex]?.code !== 101) throw new Error("original text cannot be identified.");
            const texts = [];
            for (let i = commandIndex + 1; list[i]?.code === 401; i++) texts.push(list[i].parameters[0]);
            return { speaker: list[commandIndex].parameters[4] || "", text: texts.join("\n") };
        } catch (error) {
            console.warn("NRP_MessageAutoCapture: Original text acquisition failure.", source, error);
            return fallback;
        }
    }

    const _command101 = Game_Interpreter.prototype.command101;
    Game_Interpreter.prototype.command101 = function() {
        if (disabled || $gameMessage.isBusy()) return _command101.apply(this, arguments);
        const commandIndex = this._index;
        const source = identify(this);
        const mapId = $gameMap.mapId();
        const result = _command101.apply(this, arguments);
        if (result && $gameMessage.hasText()) {
            const before = { speaker: $gameMessage.speakerName(), text: $gameMessage.allText() };
            $gameMessage._nrpCaptureInfo = {
                mapId, mapName: $dataMapInfos?.[mapId]?.name || "",
                source, commandIndex,
                original: originalMessage(source, mapId, commandIndex, before)
            };
        }
        return result;
    };

    // 文章に付随する選択肢はcommand101内で処理されるため、ここでは単独表示だけが対象。
    const _command102 = Game_Interpreter.prototype.command102;
    Game_Interpreter.prototype.command102 = function() {
        if (disabled || $gameMessage.isBusy()) return _command102.apply(this, arguments);
        const commandIndex = this._index;
        const source = identify(this);
        const mapId = $gameMap.mapId();
        const result = _command102.apply(this, arguments);
        if (result && $gameMessage.isChoice() && !$gameMessage.hasText()) {
            $gameMessage._nrpCaptureInfo = {
                mapId, mapName: $dataMapInfos?.[mapId]?.name || "",
                source, commandIndex, standaloneChoice: true,
                original: originalMessage(source, mapId, commandIndex,
                    { speaker: "", text: $gameMessage.choices().join("\n") })
            };
        }
        return result;
    };

    // 単独選択肢ではWindow_Message.startMessageが実行されないため、ここで準備する。
    const _choiceStart = Window_ChoiceList.prototype.start;
    Window_ChoiceList.prototype.start = function() {
        _choiceStart.apply(this, arguments);
        const info = $gameMessage._nrpCaptureInfo;
        const message = this._messageWindow;
        if (!info?.standaloneChoice || !message) return;
        message._nrpCapturePage = 1;
        message._nrpCaptureQueuedPage = -1;
        message._nrpCaptureEndIndex = null;
        message._nrpCaptureReady = true;
        message._nrpCaptureInfo = {
            ...info,
            language: window.NRP_MultiLanguage?.currentCode() || "default",
            speaker: "", text: "",
            choices: $gameMessage.choices().map(text => this.convertEscapeCharacters(text))
        };
    };

    const _clear = Game_Message.prototype.clear;
    Game_Message.prototype.clear = function() {
        _clear.apply(this, arguments);
        this._nrpCaptureInfo = null;
    };

    const _startMessage = Window_Message.prototype.startMessage;
    Window_Message.prototype.startMessage = function() {
        this._nrpCapturePage = 0;
        this._nrpCaptureInfo = $gameMessage._nrpCaptureInfo;
        this._nrpCaptureQueuedPage = -1;
        this._nrpCaptureReady = false;
        _startMessage.apply(this, arguments);
        if (this._nrpCaptureInfo) {
            this._nrpCaptureInfo = {
                ...this._nrpCaptureInfo,
                language: window.NRP_MultiLanguage?.currentCode() || "default",
                speaker: this.convertEscapeCharacters(this._nameBoxWindow?._nrpDrawName
                    ?? this._nameBoxWindow?._name ?? $gameMessage.speakerName()),
                text: this._textState?.text || $gameMessage.allText(),
                choices: $gameMessage.choices().map(text => this.convertEscapeCharacters(text))
            };
        }
    };

    const _newPage = Window_Message.prototype.newPage;
    Window_Message.prototype.newPage = function() {
        _newPage.apply(this, arguments);
        this._nrpCapturePage = (this._nrpCapturePage || 0) + 1;
        this._nrpCaptureReady = false;
        this._nrpCaptureEndIndex = null;
    };

    function queueCapture(window) {
        if (disabled || !window._nrpCaptureInfo || window._nrpCaptureQueuedPage === window._nrpCapturePage) return;
        window._nrpCaptureQueuedPage = window._nrpCapturePage;
        pending = { window, scene: SceneManager._scene, frame: Graphics.frameCount, record: {
            ...window._nrpCaptureInfo, page: window._nrpCapturePage,
            endIndex: window._textState?.index ?? window._nrpCaptureEndIndex ?? null
        } };
    }

    const _startPause = Window_Message.prototype.startPause;
    Window_Message.prototype.startPause = function() {
        _startPause.apply(this, arguments);
        if (this._textState && this.needsNewPage(this._textState)) this._nrpCaptureReady = true;
    };
    const _onEndOfText = Window_Message.prototype.onEndOfText;
    Window_Message.prototype.onEndOfText = function() {
        this._nrpCaptureReady = true;
        this._nrpCaptureEndIndex = this._textState?.index ?? null;
        if (this._pauseSkip && !$gameMessage.isChoice() && !$gameMessage.isNumberInput()
                && !$gameMessage.isItemChoice()) queueCapture(this);
        _onEndOfText.apply(this, arguments);
    };
    const _terminateMessage = Window_Message.prototype.terminateMessage;
    Window_Message.prototype.terminateMessage = function() {
        if (pending?.window === this) {
            this._nrpCaptureTerminate = true;
            return;
        }
        _terminateMessage.apply(this, arguments);
        this._nrpCaptureInfo = null;
    };
    const _updateInput = Window_Message.prototype.updateInput;
    Window_Message.prototype.updateInput = function() {
        if (pending?.window === this) return true;
        if (this.pause && this._nrpCaptureReady && !this.isAnySubWindowActive() && this.isTriggered()) {
            captureBeforeAdvance(this);
        }
        return _updateInput.apply(this, arguments);
    };

    // 入力処理前の状態をその場で描画・保存し、通常の入力処理を続行する。
    function captureBeforeAdvance(window) {
        queueCapture(window);
        if (pending?.window !== window) return;
        const job = pending;
        pending = null;
        try { saveCapture(job.scene, job.record); }
        catch (error) { fail(error); }
    }

    for (const [prototype, methods] of [
        [Window_ChoiceList.prototype, ["callOkHandler", "callCancelHandler"]],
        [Window_NumberInput.prototype, ["processOk"]],
        [Window_EventItem.prototype, ["onOk", "onCancel"]]
    ]) {
        for (const method of methods) {
            const original = prototype[method];
            prototype[method] = function() {
                if (this._messageWindow?._nrpCaptureReady) captureBeforeAdvance(this._messageWindow);
                return original.apply(this, arguments);
            };
        }
    }

    function saveCapture(scene, record) {
        if (!index) {
            fs.mkdirSync(folder, { recursive: true });
            index = fs.existsSync(indexPath) ? JSON.parse(fs.readFileSync(indexPath, "utf8")) : { version: 1, saved: {} };
            if (index.version !== 1 || !index.saved || typeof index.saved !== "object") throw new Error("The format of the duplicate check file is invalid.");
        }
        const key = hash(record);
        if (skip && index.saved[key]) return;
        const now = new Date();
        const day = [now.getFullYear(), String(now.getMonth() + 1).padStart(2, "0"), String(now.getDate()).padStart(2, "0")].join("");
        const directory = path.join(folder, day);
        fs.mkdirSync(directory, { recursive: true });
        let number = 0;
        for (const name of fs.readdirSync(directory)) {
            const match = name.match(/^(\d+)\.(jpg|json)$/i);
            if (match) number = Math.max(number, Number(match[1]) + 1);
        }
        const filename = String(number).padStart(4, "0");
        const bitmap = Bitmap.snap(scene);
        let image;
        try { image = composeImage(bitmap, record); }
        finally { bitmap.destroy(); }
        record.capturedAt = now.toISOString();
        record.image = day + "/" + filename + ".jpg";
        record.sequence = number;
        fs.writeFileSync(path.join(directory, filename + ".jpg"), image, { flag: "wx" });
        fs.writeFileSync(path.join(directory, filename + ".json"), JSON.stringify(record, null, 2), { flag: "wx" });
        index.saved[key] = record.image;
        const temp = indexPath + ".tmp";
        fs.writeFileSync(temp, JSON.stringify(index));
        fs.renameSync(temp, indexPath);
    }

    function composeImage(bitmap, record) {
        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, Math.round(bitmap.width * scale));
        const height = Math.max(1, Math.round(bitmap.height * scale));
        const ctx = canvas.getContext("2d");
        const font = '20px "' + $gameSystem.mainFontFace().split(",")[0].replace(/["']/g, "") + '", sans-serif';
        ctx.font = font;
        const lines = [];
        const paragraphs = [];
        if (showMap) paragraphs.push(record.mapId + ":" + record.mapName);
        if (showOriginal) {
            if (record.original.speaker) paragraphs.push("【" + record.original.speaker + "】");
            paragraphs.push(record.original.text);
        }
        for (const paragraph of paragraphs) {
            for (const rawLine of paragraph.split("\n")) {
                let line = "";
                for (const char of rawLine) {
                    if (line && ctx.measureText(line + char).width > canvas.width - 24) {
                        lines.push(line); line = "";
                    }
                    line += char;
                }
                lines.push(line);
            }
        }
        canvas.height = height + (lines.length ? lines.length * 28 + 24 : 0);
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(bitmap.canvas, 0, 0, canvas.width, height);
        ctx.font = font;
        ctx.fillStyle = "#111111";
        ctx.textBaseline = "top";
        lines.forEach((line, i) => ctx.fillText(line, 12, height + 12 + i * 28));
        return Buffer.from(canvas.toDataURL("image/jpeg", quality).split(",")[1], "base64");
    }

    // MZの描画処理が終わった直後に画像を確保する。
    const _onTick = Graphics._onTick;
    Graphics._onTick = function() {
        _onTick.apply(this, arguments);
        if (!pending) return;
        const job = pending;
        if (SceneManager._scene !== job.scene) { pending = null; return; }
        if (Graphics.frameCount - job.frame < 12) return;
        const windows = [job.window, job.window._nameBoxWindow,
            job.window._choiceListWindow, job.window._numberInputWindow, job.window._eventItemWindow];
        if (windows.some(w => w?.visible && w.isOpening())) return;
        pending = null;
        try { saveCapture(job.scene, job.record); }
        catch (error) { fail(error); }
        finally {
            if (job.window._nrpCaptureTerminate) {
                job.window._nrpCaptureTerminate = false;
                job.window.terminateMessage();
            }
        }
    };
})();
