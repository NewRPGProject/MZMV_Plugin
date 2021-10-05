//=============================================================================
// NRP_CallEvent.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc v1.01 Expanded calling of map events and common events.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/482150579.html
 *
 * @help Call map events and common events.
 * 
 * In Maker MZ, it is usually not possible to call map events.
 * So, you can call them as you used to do in Maker 2000.
 * 
 * You can use the event name or refer to a variable
 * to call the event with a high degree of freedom.
 * Also, if you perform an operation that targets "this event"
 * from the called event, you can target a different character than usual.
 * For example, you can target a follower, which is usually impossible.
 * 
 * Common events can be called as well.
 * 
 * ■Usage
 * Run the following plugin command.
 * 
 * ◆CallMapEvent
 * Call a map event by specifying the event ID (event name) and page number.
 * Multiple events can be targeted at the same time.
 * A sample is provided in the combo box of EventId, so please use it.
 * 
 * ◆CallCommonEvent
 * Call a common event by specifying the common event ID or common event name.
 * The gist is almost the same as for map events.
 * 
 * When calling more common events from a common event,
 * it is also possible to call "current common event ID + 1".
 * However, this function is only available
 * for common events that have been called in the proper way.
 * It may not work if you call it from an external plugin.
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 * 
 * @command CallMapEvent
 * @desc Call the map event.
 * 
 * @arg EventId
 * @desc Specify the ID of the event to be called.
 * Numbers and formulas are possible. If blank, this event.
 * @type combo
 * @option $gameVariables.value(1) #Variable number event
 * @option this._eventId + 1
 * @option 1,2,3 #Multiple
 * @option 1~3 #Range
 * 
 * @arg EventName
 * @desc Specify the name of the event to be called.
 * This takes precedence over the ID specification.
 * 
 * @arg PageNo
 * @desc The page number to be called.
 * If not specified, it will be the currently active page.
 * @type combo
 * @option this.pageNo() + 1
 * @option $gameVariables.value(1) #Variable number event
 * 
 * @arg ChangeThisEventId
 * @desc When "this event" is targeted in the called event, the event with the specified ID will be targeted.
 * @type combo
 * @option this._eventId #Caller's Event
 * @option $gameVariables.value(1) #Variable number event
 * @option -1 #Player
 * @option -2 #Follower
 * 
 * 
 * @command CallCommonEvent
 * @desc Call the common event.
 * 
 * @arg CommonEventId
 * @desc Specify the ID of the common event to be called.
 * Numbers and mathematical expressions are valid.
 * @type combo
 * @option $gameVariables.value(1) #Variable number commmon event
 * @option this._commonEventId + 1
 * @option 1,2,3 #Multiple
 * @option 1~3 #Range
 * 
 * @arg CommonEventName
 * @desc Specifies the name of the common event to be called.
 * This takes precedence over the ID specification.
 * 
 * @arg ChangeThisEventId
 * @desc When you target "this event" in a common event, the event with the specified ID will be targeted.
 * @type combo
 * @option $gameVariables.value(1) #Variable number event
 * @option -1 #Player
 * @option -2 #Follower
 * @option this._eventId + 1 #Caller's event +1
 */

/*:ja
 * @target MZ
 * @plugindesc v1.01 マップイベントやコモンイベントの呼び出しを拡張。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @url http://newrpg.seesaa.net/article/482150579.html
 *
 * @help マップイベントやコモンイベントの呼び出しを行います。
 * 
 * ツクールＭＺでは通常、マップイベントの呼び出しはできませんが、
 * かつてのツクール２０００のように呼び出せるようにします。
 * 
 * イベント名や変数を参照するなどして、自由度の高い呼び出しができます。
 * また呼び出したイベントから『このイベント』を対象とする操作を行った場合、
 * 通常とは異なるキャラクターを対象にできます。
 * 例えば、通常は不可能なフォロワー（隊列歩行の仲間）を対象とすることもできます。
 * 
 * 同様にコモンイベントも呼び出し可能です。
 * 
 * ■使用方法
 * 以下のプラグインコマンドを実行してください。
 * 
 * ◆マップイベントの呼び出し
 * イベントＩＤ（イベント名）とページ番号を指定して、マップイベントを呼び出します。
 * 複数のイベントを同時に対象とすることも可能です。
 * イベントＩＤのコンボボックスにサンプルが設定されているのでご活用ください。
 * 
 * ◆コモンイベントの呼び出し
 * コモンイベントＩＤやコモンイベント名を指定して、コモンイベントを呼び出します。
 * 要領はマップイベントとほぼ同じです。
 * 
 * コモンイベントからさらにコモンイベントを呼び出す場合、
 * 『現在のコモンイベントＩＤ + 1』といった呼び出し方も可能です。
 * ただし、この機能は正規の手順で呼び出したコモンイベントのみに有効です。
 * 外部のプラグインなどから呼び出した場合は機能しない可能性があります。
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @command CallMapEvent
 * @text マップイベントの呼び出し
 * @desc マップイベントを呼び出します。
 * 
 * @arg EventId
 * @text イベントＩＤ
 * @desc 呼び出したいイベントのＩＤを指定します。
 * 数字や数式で指定可能です。空欄ならこのイベント。
 * @type combo
 * @option $gameVariables.value(1) #変数番のイベント
 * @option this._eventId + 1 #このイベント+1のID
 * @option 1,2,3 #複数指定
 * @option 1~3 #範囲指定
 * 
 * @arg EventName
 * @text イベント名
 * @desc 呼び出したいイベントの名前を指定します。
 * ＩＤの指定より優先されます。
 * 
 * @arg PageNo
 * @text ページ番号
 * @desc 呼び出すページ番号です。
 * 指定がなければ現在有効なページとなります。
 * @type combo
 * @option this.pageNo() + 1 #現在のページ+1
 * @option $gameVariables.value(1) #変数番のページ
 * 
 * @arg ChangeThisEventId
 * @text このイベントのＩＤを変更
 * @desc 呼び出されたイベント内で『このイベント』を対象にした際、指定ＩＤのイベントを対象とします。
 * @type combo
 * @option this._eventId #呼出元のイベント
 * @option $gameVariables.value(1) #変数番のイベント
 * @option -1 #プレイヤー
 * @option -2 #フォロワー
 * 
 * 
 * @command CallCommonEvent
 * @text コモンイベントの呼び出し
 * @desc コモンイベントを呼び出します。
 * 
 * @arg CommonEventId
 * @text コモンイベントＩＤ
 * @desc 呼び出したいコモンイベントのＩＤを指定します。
 * 数字や数式で指定可能です。
 * @type combo
 * @option $gameVariables.value(1) #変数番のコモンイベント
 * @option this._commonEventId + 1 #このコモンイベント+1
 * @option 1,2,3 #複数指定
 * @option 1~3 #範囲指定
 * 
 * @arg CommonEventName
 * @text コモンイベント名
 * @desc 呼び出したいコモンイベントの名前を指定します。
 * ＩＤの指定より優先されます。
 * 
 * @arg ChangeThisEventId
 * @text このイベントのＩＤを変更
 * @desc コモンイベント内で『このイベント』を対象にした際、指定ＩＤのイベントを対象とします。
 * @type combo
 * @option $gameVariables.value(1) #変数番のイベント
 * @option -1 #プレイヤー
 * @option -2 #フォロワー
 * @option this._eventId + 1 #呼出元のイベント+1
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

const PLUGIN_NAME = "NRP_CallEvent";
const parameters = PluginManager.parameters(PLUGIN_NAME);

/**
 * ●プラグインコマンドの値を取得する。
 */
 function getCommandValue(value) {
    if (value === undefined) {
        return value;
    }
    // #以降は注釈扱いなので除去
    // さらに前後の空白を除去する。
    return value.split("#")[0].trim();
}

/**
 * ●引数を元に対象の配列を取得する。
 * ※bindによってinterpreterをthisに渡して用いる。
 */
function makeTargets(targetId) {
    const targets = [];
    
    // 無効なら処理しない。
    if (targetId === undefined || targetId === null || targetId === "") {
        return targets;
    }

    // カンマ区切りでループ
    for (let id of targetId.split(",")) {
        // 空白除去
        id = id.trim();
        // 1~5というように範囲指定の場合
        // ※~が存在する。
        if (id.indexOf("~") >= 0) {
            const idRange = id.split("~");
            const idRangeStart = eval(idRange[0]);
            const idRangeEnd = eval(idRange[1]);

            // IDの指定範囲で実行
            // 開始のほうが終了より大きい場合は反対に実行
            if (idRangeEnd < idRangeStart) {
                for (let i = idRangeStart; i >= idRangeEnd; i--) {
                    const evalId = eval(i);
                    if (this.characterAndFollower(evalId)) {
                        targets.push(this.characterAndFollower(evalId));
                    }
                }
            } else {
                for (let i = idRangeStart; i <= idRangeEnd; i++) {
                    const evalId = eval(i);
                    if (this.characterAndFollower(evalId)) {
                        targets.push(this.characterAndFollower(evalId));
                    }
                }
            }
            
        // 通常時
        } else {
            const evalId = eval(id);
            if (this.characterAndFollower(evalId)) {
                targets.push(this.characterAndFollower(evalId));
            }
        }
    }
    return targets;
}

/**
 * 【独自】キャラクター取得時、-2以下はフォロワーとして取得する。
 */
Game_Interpreter.prototype.characterAndFollower = function(param) {
    if ($gameParty.inBattle()) {
        return null;
    // フォロワーを取得
    } else if (param <= -2) {
        // -2 -> 0, -3 -> 1というように変換
        const n = Math.abs(param) - 2;
        return $gamePlayer.followers().follower(n);
    } else if (param < 0) {
        return $gamePlayer;
    } else if (this.isOnCurrentMap()) {
        return $gameMap.event(param > 0 ? param : this._eventId);
    } else {
        return null;
    }
};

/**
 * ●引数を元にコモンイベントＩＤの配列を取得する。
 * ※bindによってinterpreterをthisに渡して用いる。
 */
function makeCommonEventIds(commonEventId) {
    const ids = [];
    
    // 無効なら処理しない。
    if (!commonEventId) {
        return ids;
    }

    // カンマ区切りでループ
    for (let id of commonEventId.split(",")) {
        // 空白除去
        id = id.trim();
        // 1~5というように範囲指定の場合
        // ※~が存在する。
        if (id.indexOf("~") >= 0) {
            const idRange = id.split("~");
            const idRangeStart = eval(idRange[0]);
            const idRangeEnd = eval(idRange[1]);

            // IDの指定範囲で実行
            // 開始のほうが終了より大きい場合は反対に実行
            if (idRangeEnd < idRangeStart) {
                for (let i = idRangeStart; i >= idRangeEnd; i--) {
                    const evalId = eval(i);
                    if (evalId) {
                        ids.push(evalId);
                    }
                }
            } else {
                for (let i = idRangeStart; i <= idRangeEnd; i++) {
                    const evalId = eval(i);
                    if (evalId) {
                        ids.push(evalId);
                    }
                }
            }
            
        // 通常時
        } else {
            const evalId = eval(id);
            if (evalId) {
                ids.push(evalId);
            }
        }
    }
    return ids;
}

//----------------------------------------
// ＭＺ用プラグインコマンド
//----------------------------------------

// MVには存在しないため、空で定義しておかないとエラーになる。
if (!PluginManager.registerCommand) {
    PluginManager.registerCommand = function() {}
}

/**
 * ●マップイベントの呼び出し
 */
PluginManager.registerCommand(PLUGIN_NAME, "CallMapEvent", function(args) {
    const param = {};
    param.interpreter = this;
    param.pageNo = getCommandValue(args.PageNo);
    param.changeThisEventId = eval(getCommandValue(args.ChangeThisEventId));

    // イベント名で呼び出し
    param.eventName = getCommandValue(args.EventName);
    if (param.eventName) {
        callMapEventByName(param);
        return;
    }

    // イベントＩＤで呼び出し
    const eventId = getCommandValue(args.EventId);
    
    // イベントが有効でない場合
    if (!eventId) {
        // このイベントを対象とする。
        param.eventId = this.eventId();
        callMapEventById(param);
        return;
    }

    // 対象イベントを取得しループ
    const events = makeTargets.bind(this)(eventId);

    // 取得できなければ終了
    if (!events) {
        return;
    }
    
    // reverse()で逆順に登録
    // ※後で登録したほうが先に実行されるため。
    for (const event of events.reverse()) {
        param.eventId = event.eventId();
        if ($gameMap.event(param.eventId)) {
            callMapEventById(param);

            // 連続で実行するため、連鎖的に紐付ける。
            // ※参考：https://qiita.com/Sigureya/items/f07fca723fe2d159d160
            param.interpreter = param.interpreter._childInterpreter;
        }
    }
});

/**
 * ●コモンイベントの呼び出し
 */
PluginManager.registerCommand(PLUGIN_NAME, "CallCommonEvent", function(args) {
    const param = {};
    param.interpreter = this;
    param.changeThisEventId = eval(getCommandValue(args.ChangeThisEventId));

    // コモンイベント名で呼び出し
    const eventName = getCommandValue(args.CommonEventName);
    if (eventName) {
        // 名前の一致するコモンイベントを取得
        const commonEvent = $dataCommonEvents.find(c => c.name == eventName);
        if (commonEvent) {
            callCommonEvent(commonEvent, param);
        }
        return;
    }

    // 対象のコモンイベントＩＤを取得しループ
    const eventId = getCommandValue(args.CommonEventId);
    const eventIds = makeCommonEventIds.bind(this)(eventId);

    // 取得できなければ終了
    if (!eventIds) {
        return;
    }
    
    // reverse()で逆順に登録
    // ※後で登録したほうが先に実行されるため。
    for (const id of eventIds.reverse()) {
        const commonEvent = $dataCommonEvents[id];
        if (commonEvent) {
            callCommonEvent(commonEvent, param);

            // 連続で実行するため、連鎖的に紐付ける。
            // ※参考：https://qiita.com/Sigureya/items/f07fca723fe2d159d160
            param.interpreter = param.interpreter._childInterpreter;
        }
    }
});

/**
 * ●コモンイベントの呼び出し共通処理
 */
const callCommonEvent = function(commonEvent, param) {
    const changeThisEventId = param.changeThisEventId;
    const interpreter = param.interpreter;
    let eventId = interpreter.isOnCurrentMap() ? interpreter._eventId : 0;

    // 指定がある場合は『このイベント』の対象とするイベントＩＤを書き換える。
    if (changeThisEventId) {
        eventId = changeThisEventId;
    }

    interpreter.setupChild(commonEvent.list, eventId);
    // コモンイベントＩＤを設定
    interpreter._childInterpreter.setCommonEventId(commonEvent.id);
};

/**
 * ●コモンイベントの呼び出し（通常のイベントコマンド）
 */
const _Game_Interpreter_command117 = Game_Interpreter.prototype.command117;
Game_Interpreter.prototype.command117 = function(params) {
    const ret = _Game_Interpreter_command117.apply(this, arguments);

    // コモンイベントＩＤを設定しておく。
    this._childInterpreter.setCommonEventId(params[0]);

    return ret;
};

/**
 * 【独自】コモンイベントＩＤを設定する。
 * ※通常、現在実行中のInterpreterがマップイベントなのか、
 * 　コモンイベントなのかを区別する方法はない。
 * 　なのでＩＤを設定して保持する。
 */
Game_Interpreter.prototype.setCommonEventId = function(commonEventId) {
    this._commonEventId = commonEventId;
};

/**
 * ●対象のキャラクター取得
 */
const _Game_Interpreter_character = Game_Interpreter.prototype.character;
Game_Interpreter.prototype.character = function(param) {
    const character = _Game_Interpreter_character.apply(this, arguments);

    // キャラクターが取得できない
    // かつ、イベントＩＤがマイナスの場合
    if (!character) {
        // フォロワーを取得
        if (this._eventId <= -2) {
            // -2 -> 0, -3 -> 1というように変換
            const n = Math.abs(this._eventId) - 2;
            return $gamePlayer.followers().follower(n);
        // プレイヤーを取得
        } else if (this._eventId == -1) {
            return $gamePlayer;
        }
    }

    return character;
};

/**
 * ●コモンイベント（並列実行）のリフレッシュ
 */
const _Game_CommonEvent_refresh = Game_CommonEvent.prototype.refresh;
Game_CommonEvent.prototype.refresh = function() {
    _Game_CommonEvent_refresh.apply(this, arguments);

    // コモンイベントＩＤをinterpreterに引き継ぐ
    if (this._interpreter) {
        this._interpreter.setCommonEventId(this._commonEventId);
    }
};

/**
 * ●コモンイベント（自動実行）のセットアップ
 */
const _Game_Map_setupAutorunCommonEvent = Game_Map.prototype.setupAutorunCommonEvent;
Game_Map.prototype.setupAutorunCommonEvent = function() {
    const ret = _Game_Map_setupAutorunCommonEvent.apply(this, arguments);

    // 自動実行条件を満たすコモンイベントが存在する場合
    if (ret) {
        // 再度ループして該当のコモンイベントを取得
        // ※非効率だが上書きを避けるためやむなく……。
        //   大した負荷ではないはず……。
        for (const commonEvent of this.autorunCommonEvents()) {
            if ($gameSwitches.value(commonEvent.switchId)) {
                this._interpreter.setCommonEventId(commonEvent.id);
                return ret;
            }
        }
    }

    return ret;
};

//----------------------------------------
// TemplateEvent.jsを参考
//----------------------------------------

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

const callMapEventById = function(param) {
    let eventId = param.eventId;
    const changeThisEventId = param.changeThisEventId;
    const interpreter = param.interpreter;

    const event = $gameMap.event(eventId);
    if (event) {
        // 指定がある場合は『このイベント』の対象とするイベントＩＤを書き換える。
        if (changeThisEventId) {
            eventId = changeThisEventId;
        }

        const pageNo = getCallPage.bind(event)(param.pageNo);
        setupAnotherList(eventId, event.getPages(), pageNo, interpreter);
    }
};

const callMapEventByName = function(param) {
    const eventName = param.eventName;
    const changeThisEventId = param.changeThisEventId;
    const interpreter = param.interpreter;

    const eventData = searchDataItem($dataMap.events, 'name', eventName);
    if (eventData) {
        let eventId = eventData.id;
        // 指定がある場合は『このイベント』の対象とするイベントＩＤを書き換える。
        if (changeThisEventId) {
            eventId = changeThisEventId;
        }
        const event = $gameMap.event(eventId);
        const pageNo = getCallPage.bind(event)(param.pageNo);
        setupAnotherList(eventId, eventData.pages, pageNo, interpreter);
    }
};

const setupAnotherList = function(eventId, pages, pageNo, interpreter) {
    const page = pages[pageNo - 1 || interpreter._pageIndex] || pages[0];
    if (!eventId) eventId = interpreter.isOnCurrentMap() ? interpreter._eventId : 0;
    interpreter.setupChild(page.list, eventId);
};

/**
 * ●呼び出す対象とするページの取得
 */
const getCallPage = function(pageNo) {
    // ページの指定がない場合
    if (!pageNo) {
        // 現在のページを指定
        return this._pageIndex + 1;
    }

    return eval(pageNo);
};

/**
 * 【独自】ページ番号を取得
 */
Game_Event.prototype.pageNo = function() {
    // １始まりの番号を取得
    return this._pageIndex + 1;
};

})();
