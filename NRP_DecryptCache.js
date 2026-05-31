//=============================================================================
// NRP_DecryptCache.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.00 Speed up loading of encrypted images with cache processing.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/520814411.html
 *
 * @help Speed up loading of encrypted images with cache processing.
 *
 * RPG Maker MZ uses the same engine as Chrome,
 * so images that have been loaded once are cached
 * in the same way as a browser.
 *
 * However, images encrypted at deploy time are
 * no longer recognized as images, so caching no longer works.
 * Therefore, every time you move to a new location,
 * almost all images are requested and decrypted.
 * (Tilesets, characters, SV actors, pictures, etc.)
 *
 * This plugin retains decrypted images as a cache.
 * On the second and subsequent accesses,
 * each process is skipped to speed up image loading
 * during location transfers and other operations.
 *
 * Basically, the load time should be about the same
 * as when images are not encrypted.
 * Of course, this plugin has no effect on projects
 * that do not use image encryption.
 *
 * -------------------------------------------------------------------
 * [How it works]
 * -------------------------------------------------------------------
 * RPG Maker MZ calls ImageManager.clear() on location transfer,
 * which clears all image caches. Therefore, encrypted images go
 * through the full process every time:
 * request → decrypt → Blob → ObjectURL.
 * This plugin retains ObjectURLs in a separate area from
 * ImageManager's cache, allowing them to be reused
 * without being affected by ImageManager.clear().
 *
 * -------------------------------------------------------------------
 * [Notes]
 * -------------------------------------------------------------------
 * - The cache exists only in memory during gameplay.
 * - The more the maximum cache count is increased,
 *   the more memory is consumed.
 *   Set it with reference to the number of files and size
 *   under the img folder.
 *   Note: Only files under the system folder are excluded
 *         (already cached separately).
 *   Note: Since MZ requires 8GB of memory,
 *         100MB of cache should not be a problem in most cases.
 *         In that case, you may set it higher than
 *         the total number of files.
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
 *
 * @param MaxCacheCount
 * @text Max Cache Count
 * @desc Maximum number of images to cache.
 * When this number is exceeded, older entries are discarded.
 * @type number
 * @min 1
 * @default 300
 *
 * @param ClearOnLoad
 * @text Clear On Load
 * @desc Resets the cache when a save file is loaded.
 * If turned off, the existing cache is retained after loading.
 * @type boolean
 * @default true
 */

/*:ja
 * @target MZ
 * @plugindesc v1.00 暗号化した画像のロードをキャッシュ処理で高速化。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/520814411.html
 *
 * @help 暗号化した画像のロードをキャッシュ処理で高速化します。
 * 
 * ＲＰＧツクールＭＺはChromeと同じエンジンを使用しており、
 * 一度読み込んだ画像はブラウザと同様の仕組みでキャッシュされます。
 *
 * しかしながら、デプロイ時に暗号化された画像は
 * 画像と認識されなくなるため、キャッシュも働かなくなってしまいます。
 * そのため、場所移動を行う度にほぼ全ての画像を
 * リクエストして復号（暗号解除）するということをしています。
 * （タイルセット、キャラクター、ＳＶアクター、ピクチャなど）
 * 
 * このプラグインは復号済みの画像をキャッシュとして保持します。
 * ２回目以降のアクセスでは各処理をスキップするため、
 * 場所移動などの画像読込を高速化できます。
 * 
 * 基本的には、暗号化しない場合とほぼ同じロード時間になるはずです。
 * 当然ながら、画像の暗号化を使用するプロジェクトでないと意味はありません。
 *
 * -------------------------------------------------------------------
 * ■仕組み
 * -------------------------------------------------------------------
 * ＲＰＧツクールＭＺは場所移動時に ImageManager.clear() を呼び出して
 * 画像キャッシュを全消去します。そのため、暗号化画像には毎回
 * リクエスト取得 → 復号 → Blob → ObjectURL という取得処理が走ります。
 * このプラグインはObjectURLをImageManagerのキャッシュとは別の領域に
 * 保持することで、ImageManager.clear()の影響を受けずに再利用します。
 *
 * -------------------------------------------------------------------
 * ■注意事項
 * -------------------------------------------------------------------
 * ・キャッシュはゲームプレイ中のメモリ上にのみ存在します。
 * ・最大キャッシュ数を増やすほどメモリを消費します。
 * 　imgフォルダ以下のファイル数とサイズを参考に設定してください。
 * 　※正確にはsystem以下のみ対象外（別でキャッシュ済）です。
 * 　※ちなみにＭＺの動作環境はメモリ８ＧＢなので、
 * 　　１００ＭＢ程度で問題になることはまずないはずです。
 * 　　その場合、全ファイル数より多く設定してもよいと思います。
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
 * @param MaxCacheCount
 * @text 最大キャッシュ数
 * @desc キャッシュする画像の最大数。この数を超えると古いものから破棄されます。
 * @type number
 * @min 1
 * @default 300
 * 
 * @param ClearOnLoad
 * @text ロード時にクリア
 * @desc セーブデータのロード時にキャッシュをリセットします。
 * オフにするとロード後もキャッシュを継続します。
 * @type boolean
 * @default true
 */

(() => {
    "use strict";

    //-------------------------------------------------------------------------
    // パラメータ取得
    //-------------------------------------------------------------------------
    const pluginName = "NRP_DecryptCache";
    const parameters = PluginManager.parameters(pluginName);
    const mMaxCacheCount = Math.max(1, Number(parameters["MaxCacheCount"] || 300));
    const mClearOnLoad = parameters["ClearOnLoad"] !== "false";

    //-------------------------------------------------------------------------
    // ObjectURLキャッシュ管理変数
    //
    // urlCache: { url: string, objectUrl: string }[] の配列。末尾が最新。
    //   url       : 元の暗号化ファイルURL（例: img/tilesets/Field.png_）
    //   objectUrl : 復号済みBlobから生成したObjectURL
    //
    // 画像が暗号化されていない場合は一切使用されない。
    //-------------------------------------------------------------------------
    let urlCache = [];

    //-------------------------------------------------------------------------
    // キャッシュ操作ユーティリティ
    //-------------------------------------------------------------------------

    /**
     * 指定URLのObjectURLをキャッシュから検索する。なければnull。
     */
    function findObjectUrl(url) {
        const entry = urlCache.find(e => e.url === url);
        return entry ? entry.objectUrl : null;
    }

    /**
     * ObjectURLをキャッシュに追加し末尾（最新）へ配置する。
     * 上限超過時は先頭から順にObjectURLを解放して破棄する。
     */
    function addObjectUrl(url, objectUrl) {
        // 同一URLが既にあれば先に除去（重複防止）
        removeEntry(url);

        urlCache.push({ url, objectUrl });

        // 上限超過分を先頭から破棄
        while (urlCache.length > mMaxCacheCount) {
            const removed = urlCache.shift();
            // ObjectURLを解放してメモリリークを防ぐ
            URL.revokeObjectURL(removed.objectUrl);
        }
    }

    /**
     * 指定URLのエントリをキャッシュから除去し、ObjectURLを解放する。
     */
    function removeEntry(url) {
        const idx = urlCache.findIndex(e => e.url === url);
        if (idx !== -1) {
            URL.revokeObjectURL(urlCache[idx].objectUrl);
            urlCache.splice(idx, 1);
        }
    }

    /**
     * キャッシュを全消去し、全ObjectURLを解放する。
     */
    function clearCache() {
        for (const entry of urlCache) {
            URL.revokeObjectURL(entry.objectUrl);
        }
        urlCache = [];
    }

    /**
     * 指定URLのエントリをキャッシュの末尾（最新）へ移動する（LRU更新）。
     */
    function touchCache(url) {
        const idx = urlCache.findIndex(e => e.url === url);
        if (idx === -1) return;
        const entry = urlCache.splice(idx, 1)[0];
        urlCache.push(entry);
    }

    //-------------------------------------------------------------------------
    // Bitmap.prototype._startDecrypting のオーバーライド
    //
    // 暗号化画像の読み込み処理に介入する。
    //
    // 【キャッシュHIT】
    //   保存済みのObjectURLを直接 image.src にセットする。
    //   XHRと復号処理を完全にスキップできる。
    //   image.onload は既に _startLoading 内でセット済みのため、
    //   src に代入するだけで _onLoad が自動的に呼ばれる。
    //
    // 【キャッシュMISS】
    //   通常通りXHRを発行し、復号後にObjectURLをキャッシュへ保存する。
    //-------------------------------------------------------------------------
    const _Bitmap_startDecrypting = Bitmap.prototype._startDecrypting;
    Bitmap.prototype._startDecrypting = function() {
        const encryptedUrl = this._url + "_";
        const cachedObjectUrl = findObjectUrl(encryptedUrl);

        if (cachedObjectUrl) {
            // キャッシュHIT：ObjectURLを再利用してXHR・復号をスキップ
            touchCache(encryptedUrl);
            this._image.src = cachedObjectUrl;
        } else {
            // キャッシュMISS：通常のXHR読み込みへ委譲
            _Bitmap_startDecrypting.call(this);
        }
    };

    //-------------------------------------------------------------------------
    // Bitmap.prototype._onXhrLoad のオーバーライド
    //
    // XHR完了後の復号処理に介入し、生成したObjectURLをキャッシュへ保存する。
    // 元実装では URL.createObjectURL(blob) を生成して image.src にセットするが、
    // そのObjectURLは _onLoad 内で即座に revokeObjectURL される。
    // キャッシュとして保持するため、先にurlCacheへ登録してから image.src をセットする。
    //-------------------------------------------------------------------------
    const _Bitmap_onXhrLoad = Bitmap.prototype._onXhrLoad;
    Bitmap.prototype._onXhrLoad = function(xhr) {
        if (xhr.status < 400) {
            const arrayBuffer = Utils.decryptArrayBuffer(xhr.response);
            const blob = new Blob([arrayBuffer]);
            const objectUrl = URL.createObjectURL(blob);

            // image.src セット前にキャッシュへ登録する。
            // _onLoad 内で revokeObjectURL が呼ばれるより先に保存しておく必要がある。
            addObjectUrl(this._url + "_", objectUrl);

            this._image.src = objectUrl;
            // この後 _onLoad が呼ばれ revokeObjectURL(objectUrl) が実行されるが、
            // urlCache にはObjectURL文字列が保持されたままになる。
            // revokeObjectURL 後にそのURLを image.src に再セットしても
            // 画像データがメモリに残っているため表示は維持される。
            // ただしキャッシュHIT時に同じURLを image.src に再セットしても
            // revoke済みのため読み込みに失敗する。
            // この問題は _onLoad のオーバーライドで revokeObjectURL をスキップすることで解決する。
        } else {
            this._onError();
        }
    };

    //-------------------------------------------------------------------------
    // Bitmap.prototype._onLoad のオーバーライド
    //
    // 元実装では Utils.hasEncryptedImages() が true のとき
    // URL.revokeObjectURL(this._image.src) を呼んでObjectURLを解放する。
    // しかしキャッシュとして保持したいため、この解放をスキップする必要がある。
    //
    // 元実装を丸ごとスキップすると他プラグインのフックが無効になるリスクがあるため、
    // revokeObjectURL を一時的にダミーに差し替えてから元実装を呼ぶ方式とする。
    // これにより他プラグインのフックも正常に呼ばれる。
    //-------------------------------------------------------------------------
    const _Bitmap_onLoad = Bitmap.prototype._onLoad;
    Bitmap.prototype._onLoad = function() {
        // 暗号化使用時
        if (Utils.hasEncryptedImages()) {
            // revokeObjectURL を一時的に差し替えて解放をスキップする
            const originalRevoke = URL.revokeObjectURL.bind(URL);
            URL.revokeObjectURL = () => {};
            _Bitmap_onLoad.call(this);
            // 元の revokeObjectURL を即座に復元する
            URL.revokeObjectURL = originalRevoke;
            return;
        }
        _Bitmap_onLoad.call(this);
    };

    //-------------------------------------------------------------------------
    // セーブデータのロード時にキャッシュをリセット
    //
    // ロード後は異なるゲーム状態になるため、古いObjectURLを破棄して
    // メモリリークを防ぐ。
    // MZのloadGameはPromiseを返すため、ロード開始時点（then前）でクリアする。
    //-------------------------------------------------------------------------
    const _DataManager_loadGame = DataManager.loadGame;
    DataManager.loadGame = function(savefileId) {
        if (mClearOnLoad) {
            clearCache();
        }
        return _DataManager_loadGame.call(this, savefileId);
    };

})();