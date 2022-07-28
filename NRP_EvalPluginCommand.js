//=============================================================================
// NRP_EvalPluginCommand.js
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc v1.031 Enable formulas and control characters in plugin commands.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/475509661.html
 *
 * @help Enable formulas and control characters in plugin commands
 * This plugin works by simply applying it.
 * 
 * For example, if you want to use the variable1 as a parameter,
 * both of the following methods are valid.
 * 
 * > command $gameVariables.value(1)
 * > command \v[1]
 * 
 * Also, you can use "a" to refer to the subject during battle.
 * However, it cannot be used if the subject cannot be specified.
 * For example, at the beginning and end of a turn.
 * 
 * > command a.hp
 * 
 * [Note]
 * - Starting from ver 1.01, formulas are disabled by default.
 * 　Only the control characters, such as \v[1], are valid.
 * 　If you want to enable the formula, switch the parameter to enable it.
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 * 
 * @param enableEvaluate
 * @type boolean
 * @default false
 * @desc Enables formula evaluation of parameters.
 * 
 * @param ignoreDoubleBackslash
 * @type boolean
 * @default true
 * @desc Malfunctions are prevented by ignoring "\\" in the parameters.
 */
/*:ja
 * @target MV MZ
 * @plugindesc v1.031 プラグインコマンドで数式や制御文字を使用可能に
 * @author 砂川赳 (http://newrpg.seesaa.net/)
 * @url http://newrpg.seesaa.net/article/475509661.html
 *
 * @help プラグインコマンドで数式や制御文字を使用できるようにします。
 * このプラグインは適用するだけで機能します。
 * 
 * 例えば、変数１をパラメータに使用する場合は以下のどちらでも可能です。
 * 
 * command $gameVariables.value(1)
 * command \v[1]
 * 
 * また、戦闘中は『a』で行動主体を参照できます。
 * ※ただし、ターン開始・終了時など行動主体を特定できない状況では使えません。
 * 
 * command a.hp
 * 
 * ※ver1.01より標準では数式は無効となっています。
 * 　\v[1]などの制御文字のみ有効となっています。
 * 　数式を有効にしたい場合はパラメータで切替してください。
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param enableEvaluate
 * @text 数式評価を行うかどうか？
 * @type boolean
 * @default false
 * @desc パラメータの数式評価（eval）を有効にします。
 * 
 * @param ignoreDoubleBackslash
 * @text 『\\』を無視
 * @type boolean
 * @default true
 * @desc パラメータ内の『\\』を無視することで誤動作を防止します。
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

const PLUGIN_NAME = "NRP_EvalPluginCommand";
const parameters = PluginManager.parameters(PLUGIN_NAME);
const pEnableEvaluate = toBoolean(parameters["enableEvaluate"], false);
const pIgnoreDoubleBackslash = toBoolean(parameters["ignoreDoubleBackslash"], true);

// MVの場合
if (Utils.RPGMAKER_NAME == "MV") {
    /**
     * ●プラグインコマンド呼び出し
     */
    var _Game_Interpreter_command356 = Game_Interpreter.prototype.command356;
    Game_Interpreter.prototype.command356 = function() {
        // eval参照用
        var a = getA();
        var b = getB();

        // 数式を解釈してパラメータに反映
        this._params[0] = convertParam(this._params[0]);

        return _Game_Interpreter_command356.call(this);
    };

// MZの場合
} else {
    /**
     * ●プラグインコマンド呼び出し（ＭＶ互換の旧方式）
     */
    var _Game_Interpreter_command356 = Game_Interpreter.prototype.command356;
    Game_Interpreter.prototype.command356 = function(params) {
        // eval参照用
        var a = getA();
        var b = getB();
        
        // 数式を解釈してパラメータに反映
        params[0] = convertParam(params[0]);

        return _Game_Interpreter_command356.call(this, params);
    };

    /**
     * ●プラグインコマンド（新方式）
     */
    const _Game_Interpreter_command357 = Game_Interpreter.prototype.command357;
    Game_Interpreter.prototype.command357 = function(params) {
        // eval参照用
        var a = getA();
        var b = getB();

        // ディープコピーする。
        let newParams = JSON.parse(JSON.stringify(params));

        // パラメータを取得する。
        for(const key in newParams[3]) {
            if (newParams[3].hasOwnProperty(key) ) {
                // パラメータをコンバートする。
                newParams[3][key] = convertParam(newParams[3][key]);
            }
        }
        
        return _Game_Interpreter_command357.call(this, newParams);
    };
}

/**
 * ●eval参照用に行動主体を取得する。
 */
function getA() {
    var a = BattleManager._subject;
    // 取得できなければactionから取得
    if (!a && BattleManager._action) {
        a = BattleManager._action.subject()
    }
    return a;
}

/**
 * ●eval参照用に対象を取得する。
 */
function getB() {
    var b;
    if (BattleManager._targets) {
        // 先頭の対象
        b = BattleManager._targets[0];
    }
    return b;
}

/**
 * ●パラメータの数式解釈を行う
 */
function convertParam(param) {
    // 数式評価を行わない場合は文字列変換だけ
    if (!pEnableEvaluate) {
        return convertEscapeCharacters(param);
    }

    var args = param.split(" ");
    var evalParam = "";

    for (let arg of args) {
        let arg2;

        try {
            // 数式として取得できる場合
            arg2 = eval(arg);

        } catch (e) {
            // 数式でない場合はエラーとなるが、文字列で取得
            // \V[1]などの値を反映する。
            arg2 = convertEscapeCharacters(arg);
        }

        if (evalParam.length > 0) {
            evalParam += " ";
        }
        evalParam += arg2;
    }

    return evalParam;
}

/**
 * ●Window_Baseの関数を切り離し
 */
function convertEscapeCharacters(originalText) {
    let tmpText = originalText;

    // 『\\』を含む場合は誤動作するので無視
    if (pIgnoreDoubleBackslash && tmpText.match(/\\/)) {
        // 元の値を返す。
        return originalText;
    }

    /* eslint no-control-regex: 0 */
    tmpText = tmpText.replace(/\\/g, "\x1b");
    tmpText = tmpText.replace(/\x1b\x1b/g, "\\");
    tmpText = tmpText.replace(/\x1bV\[(\d+)\]/gi, (_, p1) =>
        $gameVariables.value(parseInt(p1))
    );
    tmpText = tmpText.replace(/\x1bV\[(\d+)\]/gi, (_, p1) =>
        $gameVariables.value(parseInt(p1))
    );
    tmpText = tmpText.replace(/\x1bN\[(\d+)\]/gi, (_, p1) =>
        actorName(parseInt(p1))
    );
    tmpText = tmpText.replace(/\x1bP\[(\d+)\]/gi, (_, p1) =>
        partyMemberName(parseInt(p1))
    );
    tmpText = tmpText.replace(/\x1bG/gi, TextManager.currencyUnit);

    // 変換不能のコードが残っていた場合は、エラーになるので処理しない。
    // ※note型のパラメータが渡った際を想定
    if (tmpText.match(/\x1b/)) {
        // 元の値を返す。
        return originalText;
    }

    return tmpText;
}

/**
 * ●Window_Baseの関数を切り離し
 */
function actorName(n) {
    const actor = n >= 1 ? $gameActors.actor(n) : null;
    return actor ? actor.name() : "";
};

/**
 * ●Window_Baseの関数を切り離し
 */
function partyMemberName(n) {
    const actor = n >= 1 ? $gameParty.members()[n - 1] : null;
    return actor ? actor.name() : "";
};

})();
