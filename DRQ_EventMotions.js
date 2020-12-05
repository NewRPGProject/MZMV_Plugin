//-----------------------------------------------------------------------------
// copyright 2020 Doktor_Q all rights reserved.
// Released under the MIT license.
// http://opensource.org/licenses/mit-license.php
//=============================================================================

/*:
 * @target MV MZ
 * @plugindesc Allows you to create "motions" for events
 * @author Dr. Q
 *
 * @param Motions
 * @type struct<MotionData>[]
 * @desc List of standard motions available for events
 *
 * @param Compatability Mode
 * @type boolean
 * @desc Enable if another plugin changes how character animations loop
 * @on YES
 * @off NO
 * @default false
 *
 * @help
 * Creates a system of "motions" for use with on-map events and players, similar
 * to the one available in side-view battles. It was initially created for use
 * with SRPG_Core.js to animate the battlers, but can also be used to make
 * reusable animations for cutscenes, map events, or other battle systems.
 *
 * By default, the index points to the event's current file, from 0 to 7. If you 
 * need more than 8 motions, you can make use of the suffix- for example, if the
 * event normally uses hero.png, a motion with the suffix _dead would use
 * hero_dead.png. If you called the same animation on an event using villain.png,
 * it would instead use villain_dead.png.
 * 
 *
 * Script calls:
 *
 * event.playMotion('motion') starts the event playing the specified motion
 * event.clearMotion()        stops any motions in progress
 * event.motion()             returns the current motion, or null if there isn't one
 * event.hasLoopingMotion()   returns True if the event is playing a looping motion
 * event.hasSingleMotion()    returns True if the event is playing a non-looping motion
 * event.waitForMotion()      in move routes, waits for the current (non-looping) motion
 * 
 * You can also make a new motion on the fly with playCustomMotion:
 * event.playCustomMotion({index: X, loop: true, wait: Y})
 * If omitted, loop defaults to "false", and wait defaults to 0. Index is required.
 */

/*~struct~MotionData:
 * @param Name
 * @desc The name used to call this motion
 * Capitalization doesn't matter
 * @type text
 *
 * @param Index
 * @desc The index on the character sheet for the motion
 * -1 to use the default index
 * @type number
 * @min -1
 * @default 0
 *
 * @param Suffix
 * @desc Suffix to add to the character sheet filename
 * @type text
 *
 * @param Wait
 * @desc How long to wait between frames for this motion
 * Set to 0 to keep the setting from the user's speed
 * @type number
 * @min 0
 * @default 0
 *
 * @param Loop
 * @desc What the motion does when it finishes playing
 * Looping uses the same 0-1-2-1 pattern as normal walking
 * @type select
 * @option Play Once
 * @value 0
 * @option Hold Last Frame
 * @value 1
 * @option Loop
 * @value 2
 * @default 0
 */

 /*:ja
 * @target MV MZ
 * @plugindesc イベント用のモーションを作成します。
 * @author Dr. Q
 *
 * @param Motions
 * @text モーション一覧
 * @type struct<MotionData>[]
 * @desc イベントで使える標準モーション一覧。
 *
 * @param Compatability Mode
 * @text 互換モード
 * @type boolean
 * @desc 他のプラグインからキャラクターアニメのループ方法が変更された場合に有効とする。
 * @on YES
 * @off NO
 * @default false
 *
 * @help
 * マップ上のイベントやプレイヤー向けに、
 * サイドビュー戦闘と同じようなモーションを導入します。
 * 当初はSRPG_Core.jsでバトラーをアニメーションさせるために作成されました。
 * しかし、カットシーンやマップイベント、その他のバトルシステムで、
 * 再利用可能なアニメーションを作成するためにも使用できます。
 *
 * 初期状態だとインデックスはイベントの現在のファイル（0~7）を指しますが、
 * 別のファイルも指定できます。
 * 例えば、"hero.png"の画像を設定したイベントに対して、
 * 接尾辞"_dead"を付けたモーションを指定すると"hero_dead.png"を参照できます。
 * "villain.png"を使用しているイベントで同じアニメーションを呼び出すと、
 * 代わりに"villain_dead.png"が参照されます。
 * 
 *
 * ■以下のスクリプトで呼び出します。
 *
 * event.playMotion('motion') イベントが指定のモーションを実行
 * event.clearMotion()        実行中のモーションを停止
 * event.motion()             実行中のモーションを返す
 * event.hasLoopingMotion()   ループモーションを実行中ならtrueを返す
 * event.hasSingleMotion()    非ループモーションを実行中ならtrueを返す
 * event.waitForMotion()      ルート指定時、モーション（非ループ）終了を待つ
 * 
 * playCustomMotionによって、その場で新しいモーションを作成できます。
 * event.playCustomMotion({index: X, loop: true, wait: Y})
 * 値を省略した場合、loopは"false"、waitは"0 "が使用されます。
 * また、indexは必須です。
 * 
 * ■翻訳
 * 砂川赳（http://newrpg.seesaa.net）
 * ※なお、このプラグインはＭＩＴライセンスです。
 *　 砂川制プラグインとは規約が異なりますのでご注意ください。
 */

/*~struct~MotionData:ja
 * @param Name
 * @text モーション名
 * @desc モーションの名前です。
 * 大文字小文字は区別しません。
 * @type text
 *
 * @param Index
 * @text インデックス
 * @desc モーションに使用する画像のインデックス（0~7）です。
 * -1なら初期値を使用します。
 * @type number
 * @min -1
 * @default 0
 *
 * @param Suffix
 * @text 接尾辞
 * @desc ファイル名の末尾に使用する文字列です。
 * 別の画像ファイル使用したい場合に有効です。
 * @type text
 *
 * @param Wait
 * @text ウェイト
 * @desc モーションパターン毎の待ち時間です。
 * 0ならば、元の速度を使用します。
 * @type number
 * @min 0
 * @default 0
 *
 * @param Loop
 * @text ループ
 * @desc 再生終了時のモーションの挙動です。
 * ループ時は歩行と同じように『0-1-2-1』のパターンを使用します。
 * @type select
 * @option ループなし
 * @value 0
 * @option 最後のポーズを保持
 * @value 1
 * @option ループする
 * @value 2
 * @default 0
 */

(function(){

	var parameters = PluginManager.parameters('DRQ_EventMotions');
	// the motion list is fairly complex, actually
	Sprite_Character.MOTIONS = {};
	if (parameters['Motions']) {
		var _motionList = JSON.parse(parameters['Motions']);
		for (var i = 0; i < _motionList.length; i++) {
			if (_motionList[i]) {
				var _motion = JSON.parse(_motionList[i]);
				if (!_motion.Name || _motion.Name.length == 0) continue;
				Sprite_Character.MOTIONS[_motion.Name.toUpperCase()] = {
					index: Number(_motion.Index || 0),
					wait: Number(_motion.Wait || 0),
					loop: Number(_motion.Loop) == 2,
					hold: Number(_motion.Loop) == 1,
					suffix: _motion.Suffix || ''
				};
			}
		}
	}
	var _compat = !!eval(parameters['Compatability Mode']) ? 0 : -1;

//====================================================================
// Add motions to events
//====================================================================

	// initialize the motion property
	_characterInitMembers = Game_CharacterBase.prototype.initMembers;
	Game_CharacterBase.prototype.initMembers = function() {
		_characterInitMembers.call(this);
		this._motion = null;
	};

	// get the data object for the current motion
	Game_CharacterBase.prototype.motion = function() {
		return this._motion;
	};

	// check if there's a looping motion playing
	Game_CharacterBase.prototype.hasLoopingMotion = function() {
		var motion = this.motion();
		return !!(motion && (motion.loop || motion.hold));
	};

	// check if there's a non-looping motion playing
	Game_CharacterBase.prototype.hasSingleMotion = function() {
		var motion = this.motion();
		return !!(motion && !motion.loop && !motion.hold);
	};

	// remove any active motion
	Game_CharacterBase.prototype.clearMotion = function() {
		this._motion = null;
		this._animationCount = 0;
		this.resetPattern();
	};

	// run a preset motion
	Game_CharacterBase.prototype.playMotion = function(motion, wait) {
		if (!motion) return;
		this.playCustomMotion(Sprite_Character.MOTIONS[motion.toUpperCase()], wait);
	};

	// run a motion created on the fly
	Game_CharacterBase.prototype.playCustomMotion = function(motionData, wait) {
		this._motion = motionData;
		if (this._motion) {
			motionData.loop ? this.resetPattern() : this._pattern = 0;
			this._animationCount = 0;

			if (wait && !motionData.loop) {
				this._waitCount = this.animationWait() * (this.maxPattern() + _compat);
			}
		}
	};

	// wait for the current motion to finish (non-looping only)
	Game_CharacterBase.prototype.waitForMotion = function() {
		var motion = this.motion();
		if (!motion || motion.loop) return;
		var frameWait = this.animationWait();
		var frameCount = this.maxPattern() - this._pattern + _compat;
		var partialFrame = this._animationCount;
		// technically, it just computes the remaining motion duration
		this._waitCount = frameWait * frameCount - partialFrame;
	};

//====================================================================
// Use the active motion instead of normal properties
//====================================================================

	// when a motion is active, you always animate
	var _hasStepAnime = Game_CharacterBase.prototype.hasStepAnime;
	Game_CharacterBase.prototype.hasStepAnime = function() {
		if (this.motion()) {
			return true;
		} else {
			return _hasStepAnime.call(this);
		}
	};

	// override the character index for motions
	var _characterIndex = Game_CharacterBase.prototype.characterIndex;
	Game_CharacterBase.prototype.characterIndex = function() {
		if (this.motion() && this.motion().index >= 0) {
			return this.motion().index;
		} else {
			return _characterIndex.call(this);
		}
	};

	// override the character file for motions (rarely used)
	var _characterName = Game_CharacterBase.prototype.characterName;
	Game_CharacterBase.prototype.characterName = function() {
		var baseName = _characterName.call(this);
		if (baseName !== '' && this.motion() && this.motion().suffix) {
			return baseName + this.motion().suffix;
		} else {
			return baseName;
		}
	};

	// override normal animation wait for motions
	var _animationWait = Game_CharacterBase.prototype.animationWait;
	Game_CharacterBase.prototype.animationWait = function() {
		if (this.motion() && this.motion().wait > 0) {
			return this.motion().wait;
		} else {
			return _animationWait.call(this);
		}
	};

	// update the motion, and reset at the end of a non-looping, non-held motion
	var _updatePattern = Game_CharacterBase.prototype.updatePattern;
	Game_CharacterBase.prototype.updatePattern = function() {
		var motion = this.motion();
		if (motion) {
			if (motion.loop) {
				this._pattern = (this._pattern + 1) % this.maxPattern();
			} else if (this._pattern < this.maxPattern() + _compat - 1) {
				this._pattern++;
			} else if (motion.hold) {
				motion._done = true;
			} else {
				this.clearMotion();
			}
		} else {
			_updatePattern.call(this);
		}
	};

})();