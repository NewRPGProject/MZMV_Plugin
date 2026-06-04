//=============================================================================
// NRP_Steamworks.js
//=============================================================================

/*:ja
 * @target MZ
 * @plugindesc v1.00 Steam実績＆クラウドセーブプラグイン（Greenworks版）
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url https://newrpg.seesaa.net/article/500569896.html
 *
 * @help Greenworksを利用して、
 * Steam実績の達成やSteamクラウドセーブを実装します。
 * 
 * ・Steam実績の達成
 * ・セーブデータのSteamクラウド保存と読み込み
 * 
 * 利用にはGreenworksのセットアップが必要です。
 * 
 * なお、Steam以外の環境では、これらの機能は無効化されます。
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