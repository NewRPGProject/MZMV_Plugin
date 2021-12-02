//=============================================================================
// NRP_AddTemplateEvent.js
//=============================================================================
/*:
 * @target MV MZ
 * @plugindesc v1.00 Activate TemplateEvent.js on a per-page basis.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @base TemplateEvent
 * @orderAfter TemplateEvent
 * @url http://newrpg.seesaa.net/article/484023583.html
 *
 * @help Add functionality to the semi-official plugin
 * TemplateEvent.js (Triacontane) to allow template reflection
 * on a page by page basis for events.
 * (This has been confirmed to work in both MV and MZ versions.)
 * 
 * For example, if you want to create exceptional events,
 * such as a door that closes without obtaining a key,
 * or a light that turns off with a switch,
 * you no longer need to create a separate template.
 * 
 * However, once an event is templated,
 * it will not be restored on the spot even if the conditions are changed.
 * It is necessary to initialize the event by switching maps, etc.
 * 
 * ------------------------------------------
 * [Install]
 * ------------------------------------------
 * Please register this plugin below TemplateEvent.js.
 * 
 * ------------------------------------------
 * [Usage]
 * ------------------------------------------
 * Insert an annotation at the top of the event page
 * and add a description similar to the note field.
 * <TE:?>
 * 
 * In addition, the <TEOverRide> description is also valid.
 * <TE:?><TEOverRide>
 * Please put them on the same line as above.
 * 
 * ------------------------------------------
 * [Terms]
 * ------------------------------------------
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 * 
 * Please note that since this plugin was created unofficially by me,
 * there may be inconsistencies due to updates to the original TemplateEvent.js.
 * In this case, please contact Takeshi Sunagawa.
 */

/*:ja
 * @target MV MZ
 * @plugindesc v1.00 TemplateEvent.jsをページ単位で有効化
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @base TemplateEvent
 * @orderAfter TemplateEvent
 * @url http://newrpg.seesaa.net/article/484023583.html
 *
 * @help 準公式のTemplateEvent.js（トリアコンタン様）に
 * 機能を追加し、イベントのページ単位で
 * テンプレートの反映を行えるようにします。
 * （ＭＶ版、ＭＺ版双方で動作確認済みです。）
 * 
 * 例えば、カギを入手しないと閉まっている扉や、
 * スイッチで消える灯りといった例外的なイベントを作成する場合も、
 * 別にテンプレートを作成する必要がなくなります。
 * 
 * ただし、一度テンプレート化したイベントは、
 * 条件を変更してもその場では元に戻りません。
 * マップ切替などでイベントを初期化する必要があります。
 * 
 * ------------------------------------------
 * ■導入方法
 * ------------------------------------------
 * TemplateEvent.jsより下に当プラグインを登録してください。
 * 
 * ------------------------------------------
 * ■使用方法
 * ------------------------------------------
 * イベントページの先頭に注釈を挿入し、
 * メモ欄と同様の記述を追加してください。
 * <TE:?>
 * 
 * なお、<TEOverRide>の記述も有効です。
 * <TE:?><TEOverRide>
 * というように、同一行へ記載してください。
 * 
 * ------------------------------------------
 * ■利用規約
 * ------------------------------------------
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * なお、当プラグインは非公式に制作したものなので、
 * 本家TemplateEvent.jsの更新により、不整合が生じる可能性があります。
 * その場合は砂川赳までご連絡ください。
 */
(function() {
"use strict";

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
function toNumber(str, def) {
    return isNaN(str) ? def : +(str || def);
}
function setDefault(str, def) {
    return str ? str : def;
}

const PLUGIN_NAME = "NRP_AddTemplateEvent";
const parameters = PluginManager.parameters(PLUGIN_NAME);

// TemplateEvent.jsのパラメータを読込
const templateParam = PluginManager.parameters("TemplateEvent");
const pAutoOverride = toBoolean(templateParam["AutoOverride"], false);
const pIntegrateNote = toNumber(templateParam["IntegrateNote"], 0);

/**
 * ●ページ設定開始
 */
const _Game_Event_setupPageSettings2 = Game_Event.prototype.setupPageSettings;
Game_Event.prototype.setupPageSettings = function() {
    this.setTemplateAtPage();

    _Game_Event_setupPageSettings2.apply(this, arguments);
}

/**
 * 【独自】ページ単位でテンプレートを設定
 */
Game_Event.prototype.setTemplateAtPage = function() {
    const event = this.event();
    const templateId    = this.generateTemplateIdAtPage(event);
    const templateEvent = $dataTemplateEvents[templateId];
    if (templateEvent) {
        this._templateId    = templateId;
        this._templateEvent = templateEvent;
        const type = pIntegrateNote;
        if (type > 0) {
            this.integrateNote(event, type);
        }

        // ページ更新
        const newPageIndex = this._erased ? -1 : this.findProperPageIndex();
        this._pageIndex = newPageIndex;

    } else {
        if (templateId) {
            console.error(`Invalid templateId : ${templateId}`);
        }
    }
};

/**
 * 【独自】ページ単位でテンプレートＩＤを取得
 */
Game_Event.prototype.generateTemplateIdAtPage = function() {
    let templateId;

    const list = this.list();
    // 処理が存在する場合
    if (list && list.length > 0) {
        for (const line of list) {
            // 108:注釈開始, 408:注釈続き
            if (line.code == 108 || line.code == 408) {
                // 注釈から<TE:*>を取得
                templateId = findMetaValueAtPage(line.parameters[0], "TE");
                // 見つかった場合
                if (templateId != undefined) {
                    // 上書き設定を反映し終了
                    this._override = pAutoOverride || isOverride(line.parameters[0]);
                    break;
                }

            // それ以外はループ終了
            } else {
                break;
            }
        }
    }

    // 値を取得できれば、テンプレートＩＤを取得
    if (templateId === String(templateId)) {
        const template = searchDataItem($dataTemplateEvents, 'name', templateId);
        return template ? template.id : 0;
    }

    return undefined;
};

/**
 * ●<HOGE:>の指定があれば取得
 */
function findMetaValueAtPage(text, word) {
    // メモ欄から<HOGE:*>を取得
    // ※[^>]は>を除く文字列
    const values = text.match("<" + word + "(:?)([^>]*)>");

    // 取得できれば返す
    if (values) {
        // 値があれば文字列
        if (values[2]) {
            return values[2];
        // なければtrue
        } else {
            return true;
        }
    }
    return undefined;
}

/**
 * ●上書き設定かどうか？
 */
function isOverride(text) {
    return findMetaValueAtPage(text, "TEOverRide") || findMetaValueAtPage(text, "TE上書き");
}

const searchDataItem = function(dataArray, columnName, columnValue) {
    let result = 0;
    dataArray.some(dataItem => {
        if (dataItem && dataItem[columnName] === columnValue) {
            result = dataItem;
            return true;
        }
        return false;
    });
    return result;
};

})();
