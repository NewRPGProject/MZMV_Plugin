//=============================================================================
// NRP_Steamworks.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.00 Steam Achievements & Cloud Save (Greenworks)
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url https://newrpg.seesaa.net/article/520883817.html
 *
 * @help Using Greenworks, you can access the following Steam features.
 *
 * Features:
 * - Unlock Steam Achievements
 * - Save and load game data via Steam Cloud
 *
 * Greenworks must be set up before using this plugin.
 * All features are automatically disabled in non-Steam environments.
 *
 * Your game must be registered on Steamworks and have an App ID assigned.
 *
 * -------------------------------------------------------------------
 * [Installing Greenworks & Updating NW.js]
 * -------------------------------------------------------------------
 * First, install Greenworks and update NW.js to a matching version.
 *
 * ◆ Installing Greenworks
 * Download Greenworks from the releases page:
 * https://github.com/greenheartgames/greenworks/releases
 *
 * On Windows, the filename will look like:
 *   greenworks-vX.XX.X-nw-vX.XX.X-win-64.zip
 *
 * ◆ Updating NW.js
 * Greenworks and NW.js versions must match.
 * Download NW.js from the official site:
 * https://nwjs.io/downloads/
 * (Older versions are available under "Previous releases".)
 *
 * The following article explains how to replace NW.js on Mac;
 * the Windows procedure is almost identical (use "nwjs-win" instead):
 * https://rpgtkool.hatenablog.com/entry/2024/10/23/140944
 *
 * ※ Always back up nwjs-win before replacing it.
 *    The author is not responsible for any issues that occur.
 *    If the test-play launcher stops working, restore the backup.
 *
 * After various tests, the following combination is confirmed to work
 * in the author's environment:
 *
 * ◆ Greenworks v0.17.0 for NW.js v0.89.0
 * https://github.com/greenheartgames/greenworks/releases/tag/v0.17.0
 * https://dl.nwjs.io/v0.89.0/
 *
 * On Windows, you will need:
 * - greenworks-v0.17.0-nw-v0.89.0-win-64.zip
 * - nwjs-v0.89.0-win-x64.zip
 *
 * -------------------------------------------------------------------
 * [Installing the Steamworks SDK]
 * -------------------------------------------------------------------
 * Download the Steamworks SDK from the Steamworks partner site.
 * (The author tested with steamworks_sdk_v1.64; other versions may
 * have compatibility issues with Greenworks.)
 *
 * -------------------------------------------------------------------
 * [Deploying the Project & Placing Files]
 * -------------------------------------------------------------------
 * ◆ Deploy
 * Install this plugin, then deploy the project as normal.
 *
 * ※ Set the platform to Windows (or macOS).
 * ※ Update NW.js as described above before deploying.
 *
 * ◆ File Placement
 * 1. Extract the Greenworks zip and place it in your project folder.
 *
 * 2. Extract the Steamworks SDK zip and copy the following files
 *    into "greenworks/lib":
 *
 *    [steamworks_sdk]\redistributable_bin\win64\steam_api64.dll
 *    [steamworks_sdk]\public\steam\lib\win64\sdkencryptedappticket64.dll
 *
 * 3. Create a new file named "steam_appid.txt" in the project folder.
 *    The file should contain only your Steam App ID (e.g. 1234567).
 *
 * ◆ Folder Structure
 * GameFolder/
 * ├── Game.exe
 * ├── package.json
 * ├── js/
 * │   └── plugins/
 * │       └── NRP_Steamworks.js
 * ├── greenworks/
 * │   ├── greenworks.js
 * │   └── lib/
 * |       ├── greenworks-win64.node
 * │       ├── steam_api64.dll             ← from Steamworks SDK
 * │       └── sdkencryptedappticket64.dll ← from Steamworks SDK
 * └── steam_appid.txt          ← contains your App ID (e.g. 1234567)
 *
 * If everything is set up correctly, the Steam API will be initialized.
 * Launch Game.exe with the Steam client running;
 * achievements should now be unlockable.
 *
 * -------------------------------------------------------------------
 * [Enabling the Steam Overlay]
 * -------------------------------------------------------------------
 * The Steam Overlay (F12 screenshot, etc.) is NOT enabled at this point.
 *
 * ◆ Edit package.json
 * Open package.json in a text editor and add the following two flags
 * to the "chromium-args" line:
 *
 *   --in-process-gpu --disable-direct-composition
 *
 * The result should look something like this:
 *
 *   "chromium-args": "--force-color-profile=srgb --disable-devtools --in-process-gpu --disable-direct-composition",
 *
 * ◆ Launch from the Steam Client
 * Start the game from the Steam client (not directly from Game.exe).
 * The Steam Overlay notification should appear when the game starts.
 *
 * -------------------------------------------------------------------
 * [Uploading the Game to Steam]
 * -------------------------------------------------------------------
 * To launch the game from the Steam client, you must upload it
 * to Steamworks first.
 *
 * SteamPipeGUI (included with the Steamworks SDK) is convenient:
 *   [steamworks_sdk]\tools\SteamPipeGUI.zip
 *
 * Web upload via the Steamworks dashboard is also possible,
 * but tends to be unreliable.
 *
 * Alternatively, you can add the project to the Steam client via
 * "Games > Add a Non-Steam Game to My Library".
 *
 * -------------------------------------------------------------------
 * [Tips]
 * -------------------------------------------------------------------
 * It is recommended to keep copies of package.json, steam_appid.txt,
 * and the greenworks folder somewhere safe.
 * After each deployment, simply copy them back into the output folder.
 *
 * ※ Note that package.json also contains the game title.
 *    If it includes a version number, update it accordingly.
 *
 * SteamPipeGUI stores settings per executable path.
 * If you manage multiple projects (e.g. a demo and the full game),
 * copy and rename SteamPipeGUI.exe for each project to keep
 * configurations separate and avoid accidental mix-ups.
 *
 * -------------------------------------------------------------------
 * [Cloud Save Configuration]
 * -------------------------------------------------------------------
 * To use Steam Cloud saves, configure the settings in
 * the Steamworks dashboard:
 *
 * 1. Go to "App Admin > Steam Cloud" in the Steamworks dashboard.
 * 2. Set up the Auto-Cloud configuration:
 *    - Root path: "App Install Directory"
 *    - Subdirectory: "save/{64BitSteamID}"
 *    - File pattern: ".rmmzsave"
 *
 * ※ {64BitSteamID} is automatically replaced with the player's Steam ID.
 *
 * You can also configure Shared Cloud Storage in Steamworks to allow
 * save data to carry over from a demo to the full game automatically.
 * (Set Shared Cloud Storage on the demo's side.)
 *
 * Note: Save data is synced bidirectionally between the full game
 * and the demo. Loading full-game save data in the demo may cause
 * errors (e.g. crashes on the load screen if actor images are missing).
 * If this is a concern, add logic in the demo to prevent loading
 * save files created in the full game.
 *
 * -------------------------------------------------------------------
 * [Unlocking Steam Achievements]
 * -------------------------------------------------------------------
 * Use the plugin command "Activate Achievement" and specify the
 * achievement's API name as registered in the Steamworks dashboard.
 *
 * Once the setup in "Deploying the Project & Placing Files" is
 * complete, the achievement should be unlocked successfully.
 *
 * -------------------------------------------------------------------
 * [Clearing Steam Achievements (for testing)]
 * -------------------------------------------------------------------
 * To clear an achievement unlocked during testing:
 *
 * 1. Open the Steam client console by entering the following in
 *    your browser's address bar:
 *      steam://open/console
 *
 * 2. In the console, enter one of the following commands:
 *
 *    To clear a single achievement:
 *      achievement_clear [Steam App ID] [Achievement API Name]
 *      (e.g. achievement_clear 9999999 STAGE_1_CLEAR)
 *
 *    To reset all achievements and stats:
 *      reset_all_stats [Steam App ID]
 *
 * ※ The UI may not update immediately after running the command,
 *    but the change takes effect right away.
 *
 * Tip: Add " -console" to the end of the steam.exe shortcut target
 * to always start Steam with the console open.
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
 * @ Plugin Commands
 * @------------------------------------------------------------------
 *
 * @command ActivateAchievement
 * @text Activate Achievement
 * @desc Unlocks the specified Steam Achievement.
 * Does nothing outside of a Steam environment.
 *
 * @arg AchievementName
 * @text Achievement Name (API Name)
 * @desc The API name of the achievement to unlock.
 * @type string
 *
 * @------------------------------------------------------------------
 *
 * @command SetSwitchIsSteam
 * @text Set "Is Steam" Switch
 * @desc Sets the specified switch to ON if the game is running
 * as a Steam build, or OFF otherwise.
 *
 * @arg SwitchId
 * @text Switch
 * @desc The ID of the switch to reflect the Steam build status.
 * @type switch
 */

/*:ja
 * @target MZ
 * @plugindesc v1.00 Steam実績＆クラウドセーブに対応（Greenworks版）
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/520883817.html
 *
 * @help Greenworksを利用して、Steamの以下機能を利用します。
 * 
 * ・Steam実績の達成
 * ・セーブデータのSteamクラウド保存と読み込み
 * 
 * 利用にはGreenworksのセットアップが必要です。
 * なお、Steam以外の環境では、これらの機能は無効化されます。
 * 
 * 当然ながら、Steamworksに登録していることが前提になります。
 * Steamに作品を登録して、App IDを取得してください。
 * 
 * -------------------------------------------------------------------
 * ■Greenworksの導入、NW.jsの更新
 * -------------------------------------------------------------------
 * まず、以下の通りにGreenworksを導入し、それに合わせてNW.jsを更新します。
 * 
 * ◆Greenworksの導入
 * 以下からGreenworksをダウンロードして導入します。
 * https://github.com/greenheartgames/greenworks/releases
 * 
 * ※Windowsの場合は、greenworks-vX.XX.X-nw-vX.XX.X-win-64.zip 
 * 　みたいなファイル名になるはずです。
 * 
 * ◆NW.jsの更新
 * 注意点としては、GreenworksとNW.jsのバージョンを合わせる必要があります。
 * NW.jsの公式サイトからＤＬしてください。
 * 過去バージョンは『Previous releases』からＤＬできます。
 * https://nwjs.io/downloads/
 * 
 * 以下はMac版でNW.jsを差し替える方法ですが、
 * Windows版でも『nwjs-win』になるだけで大体同じです。
 * https://rpgtkool.hatenablog.com/entry/2024/10/23/140944
 * 
 * ※nwjs-winのバックアップは必ず取ってください。
 * 　うっかり動かなくなっても作者は責任を取れません。
 * 　テストプレイが起動しなくなった場合は元に戻してください。
 * 
 * ただし、NW.jsを差し替えてもツクールＭＺが動かなくなったりと不安定です。
 * 色々試した結果、作者環境では以下の組み合わせで動くことを確認しました。
 * 
 * ◆Greenworks v0.17.0 for NW.js v0.89.0
 * https://github.com/greenheartgames/greenworks/releases/tag/v0.17.0
 * https://dl.nwjs.io/v0.89.0/
 * 
 * ※Windowsの場合は以下のファイル名になるかと思います。
 * ・greenworks-v0.17.0-nw-v0.89.0-win-64.zip 
 * ・nwjs-v0.89.0-win-x64.zip
 * 
 * -------------------------------------------------------------------
 * ■Steamworks SDKの導入
 * -------------------------------------------------------------------
 * Steamworksより、Steamworks SDKをダウンロードしてください。
 * ※作者環境ではsteamworks_sdk_v1.64で確認していますが、
 * 　バージョンによってはGreenworksとの相性があるかもしれません。
 * 
 * -------------------------------------------------------------------
 * ■プロジェクトのデプロイとファイルの配置
 * -------------------------------------------------------------------
 * ◆デプロイ
 * 当プラグインを導入し、通常通りプロジェクトをデプロイしてください。
 * 
 * ※プラットフォームはWindows（またはmacOS）に設定してください。
 * ※事前に上記のNW.jsの更新をする必要があります。
 * 
 * ◆ファイルの配置
 * １．Greenworksのzipを解凍し、プロジェクトフォルダに配置してください。
 * 
 * ２．Steamworks SDKのzipファイルを解凍し、以下のファイルを
 * 　　『greenworks/lib』内に配置してください。
 * 
 * [steamworks_sdk]\redistributable_bin\win64\steam_api64.dll
 * [steamworks_sdk]\public\steam\lib\win64\sdkencryptedappticket64.dll
 * 
 * ３．steam_appid.txtを新規作成し、プロジェクトフォルダに配置してください。
 * 　　txtの中身にはSteam App IDだけを記載してください。
 * 
 * ◆構造
 * ゲームフォルダ/
 * ├── Game.exe
 * ├── package.json
 * ├── js/
 * │   └── plugins/
 * │       └── NRP_Steamworks.js
 * ├── greenworks/
 * │   ├── greenworks.js
 * │   └── lib/
 * |       ├── greenworks-win64.node
 * │       ├── steam_api64.dll             ← Steamworks SDKから
 * │       └── sdkencryptedappticket64.dll ← Steamworks SDKから
 * └── steam_appid.txt          ← Steam App IDを記載（例: 1234567）
 * 
 * この時点でうまくいけば、Steam側のＡＰＩが有効になります。
 * Steamクライアントを起動した状態でGame.exeを実行してください。
 * 実績の達成が有効になるはずです。
 * 
 * -------------------------------------------------------------------
 * ■Steamオーバーレイの設定
 * -------------------------------------------------------------------
 * ただし、この時点ではSteamオーバーレイは有効になりません。
 * ※F12のキャプチャなどSteamの機能を有効にする仕組みのことです。
 * 
 * ◆package.jsonの編集
 * package.jsonをテキストエディタで編集します。
 * "chromium-args"の行に以下の２点を加えてください。
 * 
 * --in-process-gpu --disable-direct-composition"
 * 
 * 実際には元ある記述と合わせて、以下のようになるはずです。
 * 
 * "chromium-args": "--force-color-profile=srgb --disable-devtools --in-process-gpu --disable-direct-composition",
 * 
 * ◆Steamクライアントでゲームを起動
 * この状態でSteamクライアント上からゲームを起動すれば、
 * ようやくSteamオーバーレイが有効になります。
 * ※ゲーム開始時、Steamオーバーレイの表示が出ます。
 * 
 * -------------------------------------------------------------------
 * ■ゲームのアップロード
 * -------------------------------------------------------------------
 * なお、Steamクライアント上でゲームを起動するには、
 * Steamworksにゲームをアップロードする必要があります。
 * 
 * アップロードにはSteamworks SDK付属のSteamPipeGUIが便利です。
 * 
 * [steamworks_sdk]\tools\SteamPipeGUI.zip
 * 
 * 使い方は以下を参考にしてください。
 * https://kan-kikuchi.hatenablog.com/entry/Steam_Upload_Windows
 * 
 * Steamworksから直接Webアップロードもできますが、
 * 失敗することが多くて面倒でした……。
 * 
 * あるいは、「ゲーム＞非Steamゲームをマイライブラリに追加」
 * でSteamクライアントにプロジェクトを取り込む方法もあります。
 * 
 * -------------------------------------------------------------------
 * ■ポイント
 * -------------------------------------------------------------------
 * これまでに作成したpackage.jsonやsteam_appid.txt、
 * greenworksフォルダは別途保管しておくことをオススメします。
 * デプロイする度にコピペするだけで済みます。
 * 
 * ※ただし、package.jsonにはゲームタイトルも含まれるので注意です。
 * 　バージョン名などを含む場合はきちんと更新する必要があります。
 * 
 * また、SteamPipeGUIはexeファイルのパス毎に設定を記憶しているようです。
 * 体験版など複数のプロジェクトを管理する場合は、
 * SteamPipeGUI.exeを別にコピペ＆リネームしておくと便利＆安全です。
 * 
 * -------------------------------------------------------------------
 * ■クラウドセーブの設定
 * -------------------------------------------------------------------
 * Steamクラウドセーブを利用するには、Steamworksの管理画面で
 * クラウドセーブの設定を行う必要があります。
 * 
 * 1. Steamworksの管理画面で「アプリデータ管理 ＞ Steam クラウド」を選択
 * 2. Steam 自動クラウド設定のルートパスを設定
 *    ルートを「アプリのインストールディレクトリ」に設定
 *    サブディレクトリを「save/{64BitSteamID}」に設定
 *    パターンを「.rmmzsave」に設定
 * 
 * ※{64BitSteamID} はSteamのユーザＩＤに変換されます。
 * 
 * SteamworksのSteamクラウドの共有クラウドストレージを設定すれば、
 * 体験版から製品版へ自動でセーブを引き継ぐこともできます。
 * ※共有クラウドストレージは体験版側に設定するのが基本っぽいです。
 * 
 * ただし、製品版と体験版のセーブデータは双方向で反映される仕様のようです。
 * わざわざやるプレイヤーはあまりいないと思いますが、
 * 製品版でセーブしたデータを体験版でロードするとエラーになったりします。
 * ※アクターの画像ファイルがないとロード画面の時点で落ちます。
 * 気になる方は製品版のセーブデータは体験版で、
 * ロード禁止にするなどの制御をしてください。
 * 
 * -------------------------------------------------------------------
 * ■Steam実績の達成
 * -------------------------------------------------------------------
 * プラグインコマンドで『Steam実績を達成』を呼び出し、
 * あらかじめSteamworks側で登録した実績名（API名）を指定してください。
 * 
 * 上述の『プロジェクトのデプロイとファイルの配置』まで
 * 設定が終わっていれば、実績が達成されるはずです。
 * 
 * -------------------------------------------------------------------
 * ■Steam実績の削除
 * -------------------------------------------------------------------
 * テスト時に一度達成した実績を消去したい場合は、
 * 以下の手順で可能です。
 * 
 * ブラウザのＵＲＬに steam://open/console と入力し、
 * Steamクライアントのコンソールを表示させる。
 * コンソールに以下を入力する。
 * 
 * １．個別実績を消去する場合
 * achievement_clear [Steam App ID] [実績のAPI名]
 * （※例：achievement_clear 9999999 STAGE_1_CLEAR）
 * 
 * ２．全実績をリセットする場合:
 * reset_all_stats [Steam App ID]
 * 
 * ※実行した直後は表示が反映されていないように見えますが、
 * 　実際には反映されています。
 * 
 * ちなみに、steam.exeのリンク先の末尾に「 -console」を付けておけば、
 * コンソールが最初から表示された状態になるので便利です。
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
 *
 * @------------------------------------------------------------------
 * @ プラグインコマンド
 * @------------------------------------------------------------------
 * 
 * @command ActivateAchievement
 * @text Steam実績を達成
 * @desc 指定したSteam実績を達成します。
 * Steam以外の環境では何もしません。
 *
 * @arg AchievementName
 * @text 実績名（API名）
 * @desc 達成する実績のＡＰＩ名を指定します。
 * @type string
 *
 * @------------------------------------------------------------------
 * 
 * @command SetSwitchIsSteam
 * @text Steam判定スイッチ
 * @desc 現在Steamビルドで動いているかを指定のスイッチに反映します。
 *
 * @arg SwitchId
 * @text スイッチ
 * @desc Steamビルドであるかを反映するスイッチのID。
 * @type switch
 */

(() => {
"use strict";

const pluginName = "NRP_Steamworks";
const params = PluginManager.parameters(pluginName);

// ---------------------------------------------------------------------------
// Greenworksの初期化

let greenworks = null;
try {
    greenworks = require("./greenworks/greenworks");
    if (!greenworks.initAPI()) {
        // console.error("Greenworks: Steam APIの初期化に失敗しました");
        greenworks = null;
    } else {
        console.log("Greenworks: Steam API Init Success");
    }
} catch (e) {
    // Steam環境ではない。
    // console.error("Greenworks: 読み込みに失敗しました", e);
}

// ---------------------------------------------------------------------------
// Utils

/**
 * Steam向けビルド（Greenworks初期化済み）であるか？
 * @returns {boolean}
 */
Utils.isSteam = function () {
    return !!greenworks;
};

// ---------------------------------------------------------------------------
// プラグインコマンド

/**
 * Steam実績を達成するプラグインコマンド
 * @param {object} args
 * @param {string} args.AchievementName - 達成する実績の名前
 */
PluginManager.registerCommand(pluginName, "ActivateAchievement", (args) => {
    activateAchievement(String(args.AchievementName).trim());
});

/**
 * Steamビルドかをスイッチにセットするプラグインコマンド
 * @param {object} args
 * @param {number} args.SwitchId - 反映するスイッチのID
 */
PluginManager.registerCommand(pluginName, "SetSwitchIsSteam", (args) => {
    const switchId = Number(args.SwitchId);
    if (switchId > 0) {
        $gameSwitches.setValue(switchId, Utils.isSteam());
    }
});

// ---------------------------------------------------------------------------
// 実績解除

/**
 * Steam実績を達成する
 * @param {string} achievementId
 */
function activateAchievement(achievementId) {
    if (!greenworks) return;
    greenworks.activateAchievement(
        achievementId,
        () => console.log(`[Steam] Activate Achievement Success: ${achievementId}`),
        (err) => console.error(`[Steam] Activate Achievement Failed: ${achievementId}`, err)
    );
}

// ---------------------------------------------------------------------------
// StorageManager（クラウドセーブ）

const SAVE_FILE_EXT = ".rmmzsave";

/**
 * 64BitSteamIDを取得する
 * @returns {string}
 */
StorageManager.getSteamId64 = function () {
    try {
        // getSteamId()はSteamIDオブジェクトを返すため、
        // JSON経由でsteamIdフィールドを取得する
        const steamIdObj = greenworks.getSteamId();
        const steamId64 = JSON.parse(JSON.stringify(steamIdObj)).steamId;
        return steamId64 || "";
    } catch (e) {
        console.error("[Steam Cloud] Failed to retrieve Steam ID", e);
        return "";
    }
};

/**
 * Steamクラウド同期対象のローカルファイルパスを生成
 * Steamクラウドの設定に合わせて {gameDir}/save/{64BitSteamID}/saveName.rmmzsave の形式にする
 * @param {string} saveName
 * @returns {string}
 */
StorageManager.steamFilePath = function (saveName) {
    const path = require("path");
    const base = path.dirname(process.mainModule.filename);
    const steamId64 = this.getSteamId64();
    return path.join(base, "save", steamId64, `${saveName}${SAVE_FILE_EXT}`);
};

/**
 * Steamクラウドセーブを使用するか？
 * @returns {boolean}
 */
StorageManager.isSteamMode = function () {
    return Utils.isSteam();
};

/**
 * Steamクラウド同期対象フォルダを作成する
 */
StorageManager.fsMkdirForSteam = function () {
    const path = require("path");
    const base = path.dirname(process.mainModule.filename);
    const steamId64 = this.getSteamId64();
    this.fsMkdir(path.join(base, "save"));
    this.fsMkdir(path.join(base, "save", steamId64));
};

/**
 * Steamクラウド同期対象ローカルファイルにセーブデータを書き込む
 * @param {string} saveName
 * @param {string} zip
 * @returns {Promise<void>}
 */
StorageManager.saveToSteamCloud = function (saveName, zip) {
    const filePath = this.steamFilePath(saveName);
    const backupFilePath = filePath + "_";
    return new Promise((resolve, reject) => {
        this.fsMkdirForSteam();
        this.fsUnlink(backupFilePath);
        this.fsRename(filePath, backupFilePath);
        try {
            this.fsWriteFile(filePath, zip);
            this.fsUnlink(backupFilePath);
            console.log(`[Steam Cloud] Save Success: ${filePath}`);
            resolve();
        } catch (e) {
            try {
                this.fsUnlink(filePath);
                this.fsRename(backupFilePath, filePath);
            } catch (e2) {
                //
            }
            console.error(`[Steam Cloud] Save Failed: ${filePath}`, e);
            reject(e);
        }
    });
};

/**
 * Steamクラウド同期対象ローカルファイルからセーブデータを読み込む
 * @param {string} saveName
 * @returns {Promise<string>}
 */
StorageManager.loadFromSteamCloud = function (saveName) {
    const filePath = this.steamFilePath(saveName);
    return new Promise((resolve, reject) => {
        const data = this.fsReadFile(filePath);
        if (data) {
            console.log(`[Steam Cloud] Load Success: ${filePath}`);
            resolve(data);
        } else {
            console.error(`[Steam Cloud] Load Failed: ${filePath}`);
            reject(new Error("Savefile not found"));
        }
    });
};

/**
 * Steamクラウド同期対象ローカルファイルが存在するか確認
 * @param {string} saveName
 * @returns {Promise<boolean>}
 */
StorageManager.steamCloudExists = function (saveName) {
    const fs = require("fs");
    return Promise.resolve(fs.existsSync(this.steamFilePath(saveName)));
};

/**
 * Steamクラウド同期対象ローカルファイルを削除する
 * @param {string} saveName
 * @returns {Promise<void>}
 */
StorageManager.removeSteamCloud = function (saveName) {
    this.fsUnlink(this.steamFilePath(saveName));
    return Promise.resolve();
};

// StorageManagerのsave/load/exists/removeをクラウドセーブに差し替え

const upstream_StorageManager_saveZip = StorageManager.saveZip;
StorageManager.saveZip = function (saveName, zip) {
    if (this.isSteamMode()) {
        return this.saveToSteamCloud(saveName, zip);
    }
    return upstream_StorageManager_saveZip.apply(this, arguments);
};

const upstream_StorageManager_loadZip = StorageManager.loadZip;
StorageManager.loadZip = function (saveName) {
    if (this.isSteamMode()) {
        return this.loadFromSteamCloud(saveName);
    }
    return upstream_StorageManager_loadZip.apply(this, arguments);
};

const upstream_StorageManager_exists = StorageManager.exists;
StorageManager.exists = function (saveName) {
    if (this.isSteamMode()) {
        return this.steamCloudExists(saveName);
    }
    return upstream_StorageManager_exists.apply(this, arguments);
};

const upstream_StorageManager_remove = StorageManager.remove;
StorageManager.remove = function (saveName) {
    if (this.isSteamMode()) {
        return this.removeSteamCloud(saveName);
    }
    return upstream_StorageManager_remove.apply(this, arguments);
};

})();