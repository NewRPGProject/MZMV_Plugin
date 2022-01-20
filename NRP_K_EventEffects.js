//=============================================================================
// NRP_K_EventEffects.js
//=============================================================================
// [Update History (Original)]
// Ver 1.0.0  2017.May.05  First Release
// Ver 1.0.1  2018.Aug.23  Fix bug of wait behaviour on parallel events.
// Ver 1.0.2  2019.Dec.11  The same of the above yet more
// Ver 1.1.0  2020.Jan.09  (closed ver.) Support behavior on RMMZ.
// Ver 1.1.1  2020.Jan.14  Add several offset functions
// Ver 1.1.2  2020.May.18  Fix bug of ballon icon's position(Closed)
// Ver 1.1.3  2020.Sep.22  Fix bug of cross fade when duration is 1

/*:
 * @target MV MZ
 * @plugindesc v1.00 set various effects to events and player
 * @author Sasuke KANNAZUKI (Mod: Sunagawa Takeshi)
 *
 * @help This plugin is a modification of RPG Maker MZ's launch plugin
 * EventEffects.js (Ver 1.1.3 By Sasuke KANNAZUKI) by Takeshi Sunagawa.
 * 
 * Addressed the issue where character rotation commands
 * from external plugins (such as NRP_DynamicMotionMap.js)
 * would be disabled when used in conjunction with them.
 * 
 * -------------------------------------------------------------------
 * [Here is the original explanation]
 * -------------------------------------------------------------------
 * This plugin does not provide plugin commands.
 * This plugin runs under RPG Maker MV and MZ.

 * [Summary]
 * This plugin enables events various screen effects.
 *
 * [Usage]
 * Call follows from 'Set Movement Route' -> 'Script'.
 * ■change tint
 * this.tint(Array[red,green,blue,gray], # of frame ,waitFlag);
 * color: -255～255, 60frame = 1sec.
 * ex：
 * this.tint([255,255,255,0], 20, true);  # whiten within 20 frames
 * this.tint([0,0,0,0], 20, true);        # reset within 20 frames
 * ■change opacity
 * this.opaque(opacity, # of frame, waitFlag);
 * this.opaque(128, 20, true);        # set half-transparent within 20 frames
 * ■set above of all
 * this.tint2(Array[red,green,blue,gray], opacity, # of frame ,waitFlag);
 * this.tint2([64,64,64,0], 20, 128, false); 
 *   # set whithen and half-transparent in 20 franmes
 *
 * ■shorten notation of tint
 * this.tintB(frame, waitF);   # change tint to be Black(=[-255,-255,-255,0])
 * this.tintW(frame, waitF);   # change tint to be White(=[255,255,255,0])
 * this.tintN(frame, waitF);   # change tint to be Normal(=[0,0,0,0])
 * above of all, frame and waitF are omissible.
 * default value is frame=60, waitF=true.
 *
 * ■baloon icon
 * this.balloon(num, wait);   # num:1～10, wait:true/false
 * num: 1/exclamation, 2/question, 3/music note, 4/heart, 5/anger,
 * 6/sweat, 7/cobweb, 8/silence, 9/light bulb, 10/Zzz
 * ex:
 * this.balloon(1, true);     # exclamation icon with wait
 * this.balloon(2, false);    # qustion icon without wait
 *
 * ■set up side down
 * this.setUpSideDown();        # display up side down
 * this.resetUpSideDown();      # stop up side down
 * note: this function is realized by rotating 180 degree and changing offsets.
 * ■set angle
 * this.setAngle(90);           # set right 90 degree
 * this.setAngle(-90);          # set left 90 degree
 * this.setAngle(0);            # set original angle
 * ■set offset
 * this.setOffsets(10,20);      # set X+10, Y+20
 * this.setOffsets(0,0);        # set original position
 * ■set offset yet more (added at Ver1,1)
 * this.moveOffsets(25,-15);     # set X+25, Y-10 from current offset
 * this.setOffsetFwd(8);        # set 8 forward according to character's dir.
 * this.moveOffsetFwd(8);       # forward 8 from current offset
 * ■set above of all:
 * this.setEffects(ox,oy,usd,angle);
 * ox,oy:offsets, usd:flag up side down(true/false), angle:degree(360 is round)
 * ex:
 * this.setEffects(-15,20,false,45); #move(-15,20), rotate 45 defree clockwise
 * 
 * ■priority type
 * this.setPriorityType(priority);  # priority 0:under 1:normal 2:over
 * note: this is preset function.
 *
 * ■Change character with cross fade
 * this.setGrid2(dir, pattern, frames, wait);
 * this.setImageGrid2(name, index, dir, pattern, frames, wait);
 * dir=2,4,6,or8, pattern=0,1,or2, frames(60frame=1sec), wait: wait until end?
 * name=character graphic name, index=character index(0～7)
 *
 * ■Set Offset and Viewport
 * this.setOffset2(dx, dy[, slx, sly, srx, sry]);
 *   (dx, dy): Offset Coord.
 *   (slx, sly) - (srx, sry): range of viewport of character bitmap.
 *    | when these 4 parameters are omitted, it'll be all range of character.
 * this.resetOffset2();
 *   reset setting of setOffset2.
 *
 * [License]
 * this plugin is released under MIT license.
 * http://opensource.org/licenses/mit-license.php
 */
/*:ja
 * @target MV MZ
 * @plugindesc v1.00 イベントやプレイヤーに様々な効果をセットします
 * @author 神無月サスケ（改造：砂川赳）
 *
 * @help 当プラグインはＲＰＧツクールＭＺのローンチプラグイン
 * EventEffects.js（Ver 1.1.3 神無月サスケ様）に対して、
 * 砂川赳が改造を行ったものです。
 * 
 * 外部プラグイン（NRP_DynamicMotionMap.jsなど）と併用した際、
 * 外部プラグインによるキャラクターの回転命令が
 * 無効となってしまう問題に対処しています。
 * 
 * -------------------------------------------------------------------
 * ■以下、オリジナルの解説
 * -------------------------------------------------------------------
 * このプラグインには、プラグインコマンドはありません。
 * このプラグインは、RPGツクールMV および MZに対応しています。
 * 
 * ■概要
 * このプラグインは、「移動ルートの設定」の際にスクリプトを呼び出すことで
 * 数々のエフェクトをイベントに施すことを可能にします。
 *
 * 「移動ルートの設定」で「スクリプト」から以下の書式で呼び出してください：
 * ■色合いの変更
 * this.tint(色合いの配列[赤,緑,青,灰], フレーム数, 終了まで待つか);
 * 色：-255～255, 60フレーム＝1秒
 * 例：
 * this.tint([255,255,255,0], 20, true);  # 20フレームで真っ白に変化
 * this.tint([0,0,0,0], 20, true);        # 20フレームで元の色に戻す
 * ■不透明度の変更
 * this.opaque(不透明度, フレーム数, 終了までwaitか);
 * this.opaque(128, 20, true);        # 20 フレームで不透明度を128(半透明)に
 * ■一括設定
 * this.tint2(色合いの配列[赤,緑,青,灰], 不透明度, フレーム数, 終了までwait);
 * this.tint2([64,64,64,0], 128, 20, false);  # 20フレームで白化と半透明に
 *
 * ■色合い変更の短縮指定
 * this.tintB(フレーム数, 待つか);   # 色合いを黒(=[-255,-255,-255,0])にします
 * this.tintW(フレーム数, 待つか);   # 色合いを白(=[255,255,255,0])にします。
 * this.tintN(フレーム数, 待つか);   # 色合いを通常(=[0,0,0,0])にします。
 * 上記の「フレーム数」と「待つか」は省略可能です。
 * 省略時は「フレーム数」=60、「待つか」=trueになります。
 * 
 * ■フキダシアイコン
 * this.balloon(num, wait);   # num:1～10, wait:true/false
 * num: 1/びっくり, 2/はてな, 3/音符, 4/ハート, 5/怒り, 6/汗
 * 7/くしゃくしゃ, 8/沈黙, 9/電球, 10/Zzz
 * 例：
 * this.balloon(1, true);     # びっくりアイコン、ウェイトあり
 * this.balloon(2, false);    # はてなアイコン、ウェイトなし
 * オフセット付にもできます
 *  this.balloon(1, true, 50, 50); # (50,50)ずらして表示
 *
 * ■上下反転
 * this.setUpSideDown();        # 反転表示
 * this.resetUpSideDown();      # 反転表示終了
 * 注意：上下反転は180度回転＋位置移動で実現しています。
 * ■角度設定
 * this.setAngle(90);           # 90度右回転(元の姿勢から見て)
 * this.setAngle(-90);          # 90度左回転(元の姿勢から見て)
 * this.setAngle(0);            # 元の姿勢に戻す
 * ■オフセット(位置補正)設定
 * this.setOffsets(10,20);      # X右方向に10,Y左方向に20移動
 * this.setOffsets(0,0);        # 元の位置に戻す
 * ■オフセットの相対設定など[Ver1.1 追加要素]
 * this.moveOffsets(25,-15);     # 現在のオフセットから右に25、下に15移動
 * this.setOffsetFwd(8);        # イベントの向きに応じて8前方に移動
 * this.moveOffsetFwd(8);       # 現在のオフセットからイベント方向に8前進
 * ■一括設定
 * this.setEffects(ox,oy,usd,angle);
 * ox,oy:オフセット値, usd:逆さまか(true/false), angle:角度(一周=360度)
 * 例：
 * this.setEffects(-15,20,false,45); #(-15,20)ずらし、逆さまにせず 45度右回転
 * 
 * ■プライオリティ
 * this.setPriorityType(0);         # 通常キャラの下に
 * this.setPriorityType(1);         # 通所キャラと同じに
 * this.setPriorityType(2);         # 通常キャラの上に
 * ↑これはコアスクリプトに入っています。ページが切り替わると元に戻ります。
 *
 * ■クロスフェードさせてキャラ画像変更
 * this.setGrid2(dir, pattern, frames, wait);
 * this.setImage2(name, index, frames, wait);
 * this.setImageGrid2(name, index, dir, pattern, frames, wait);
 * dir=向き(2,4,6,8), pattern=0,1,or2, frames=フレーム数, wait=完了まで待つ？
 * name=画像名, index=画像内インデックス(0～7)
 *
 * ■視点範囲を制限したオフセット指定
 * this.setOffset2(dx, dy[, slx, sly, srx, sry]);
 *   (dx, dy):表示するオフセット(この座標だけずらす)
 *   (slx, sly) - (srx, sry): 画像の表示範囲座標(省略時はキャラのサイズ)
 * this.resetOffset2();
 *   setOffset2 の設定をリセット
 *
 * ■ライセンス表記
 * このプラグインは MIT ライセンスで配布されます。
 * ご自由にお使いください。
 * http://opensource.org/licenses/mit-license.php
 */

(function() {

  var _Game_CharacterBase_initialize = Game_CharacterBase.prototype.initialize;
  Game_CharacterBase.prototype.initialize = function() {
    _Game_CharacterBase_initialize.call(this);
    this.initTone();
    this.initEffects();
    this.initImageGrid();
  };

  var _Game_CharacterBase_update = Game_CharacterBase.prototype.update;
  Game_CharacterBase.prototype.update = function() {
    this.updateTone();
    this.updateOpacity();
    this.updateImageGrid();
    _Game_CharacterBase_update.call(this);
  };

  var _Sprite_Character_update = Sprite_Character.prototype.update;
  Sprite_Character.prototype.update = function() {
    _Sprite_Character_update.call(this);
    this.updateTone();
    this.updateAngle();
    this.updateCrossFade();
  };

  // ----------------------------------------
  // set tone and opacity
  //
  Game_CharacterBase.prototype.initTone = function() {
    this._tone = null;
    this._toneTarget = null;
    this._toneDuration = 0;
    this._opacityTarget = null;
    this._opacityDuration = 0;
  };

  // this function is called from 'Move Route' -> 'Script'.
  Game_CharacterBase.prototype.tint = function(tone, duration, needsWait) {
    if (!this._tone) {
      this._tone = [0, 0, 0, 0];
    }
    this._toneTarget = tone.clone();
    this._toneDuration = duration;
    if (this._toneDuration === 0) {
      this._tone = this._toneTarget.clone();
    }
    if (needsWait) {
      this._waitCount = duration;
    }
  };

  //
  // shorten notations of tint.
  //
  Game_CharacterBase.prototype.tintB = function (duration, needsWait) {
    duration = duration != null ? duration : 60;
    needsWait = needsWait != null ? needsWait : true;
    this.tint([-255,-255,-255,0], duration, needsWait);
  };

  Game_CharacterBase.prototype.tintW = function (duration, needsWait) {
    duration = duration != null ? duration : 60;
    needsWait = needsWait != null ? needsWait : true;
    this.tint([255,255,255,0], duration, needsWait);
  };

  Game_CharacterBase.prototype.tintN = function (duration, needsWait) {
    duration = duration != null ? duration : 60;
    needsWait = needsWait != null ? needsWait : true;
    this.tint([0,0,0,0], duration, needsWait);
  };

  // this function is called from 'Move Route' -> 'Script'.
  Game_CharacterBase.prototype.opaque = function(opacity, duration, fWait) {
    this._opacityTarget = opacity;
    this._opacityDuration = duration;
    if (this._opacityDuration === 0) {
      this._opacity = this._opacityTarget;
    }
    if (fWait) {
      this._waitCount = duration;
    }
  };

  // this function is called from 'Move Route' -> 'Script'.
  Game_CharacterBase.prototype.tint2 = function(tone, opacity, d, wait) {
    this.tint(tone, d, false);
    this.opaque(opacity, d, wait);
  };

  Game_CharacterBase.prototype.updateTone = function() {
    this._toneDuration = this._toneDuration || 0;
    if (this._toneDuration > 0) {
      var d = this._toneDuration;
      for (var i = 0; i < 4; i++) {
        this._tone[i] = (this._tone[i] * (d - 1) + this._toneTarget[i]) / d;
      }
      this._toneDuration--;
    }
  };

  Game_CharacterBase.prototype.updateOpacity = function() {
    this._opacityDuration = this._opacityDuration || 0;
    if (this._opacityDuration > 0) {
      var d = this._opacityDuration;
      this._opacity = (this._opacity * (d - 1) + this._opacityTarget) / d;
      this._opacityDuration--;
    }
  };

  Game_CharacterBase.prototype.tone = function() {
    return this._tone;
  };

  Sprite_Character.prototype.updateTone = function() {
    if (this._character.tone()) {
      this.setColorTone(this._character.tone());
    }
  };

  // ----------------------------------------
  // set ballon icon
  //
  Game_CharacterBase.prototype.balloon = function(num, wait, ox, oy) {
    this.ballonX = ox || 0;
    this.ballonY = oy || 0;
    if ('requestBalloon' in $gameTemp) {
      $gameTemp.requestBalloon(this, num);
    } else {
      this.requestBalloon(num);
    }
    if (wait) {
      this._waitCount = 76;
    }
    return true;
  };

  // ----------------------------------------
  // set offset, upSideDown, angle
  //
  Game_CharacterBase.prototype.initEffects = function() {
    this._offsetX = 0;
    this._offsetY = 0;
    this._upSideDown = false;

    // 初期値はnullへ変更 Mod Sunagawa
    this._angle = null;
    // this._angle = 0;

    this.resetOffset2();
  };

  Game_CharacterBase.prototype.setEffects = function(x, y, u, a) {
    this._offsetX = x;
    this._offsetY = y;
    this._upSideDown = u;
    this._angle = a;
  };

  Game_CharacterBase.prototype.setOffsets = function(x, y) {
    this._offsetX = x;
    this._offsetY = y;
  };

  //
  // offset routine added at Ver1.1
  //
  var checkOffsets = function () {
    if (this._offsetX == null) {
      this._offsetX = 0;
    }
    if (this._offsetY == null) {
      this._offsetY = 0;
    }
  };

  var addingX = function (d) {
    return d === 6 ? 1 : d === 4 ? -1 : 0;
  };

  var addingY = function (d) {
    return d === 2 ? 1 : d === 8 ? -1 : 0;
  };
  
  Game_CharacterBase.prototype.moveOffsets = function(x, y) {
    checkOffsets();
    this._offsetX += x;
    this._offsetY += y;
  };

  Game_CharacterBase.prototype.setOffsetFwd = function(p) {
    var d = this.direction();
    this._offsetX = p * addingX(d);
    this._offsetY = p * addingY(d);
  };

  Game_CharacterBase.prototype.moveOffsetFwd = function(p) {
    checkOffsets();
    var d = this.direction();
    this._offsetX += p * addingX(d);
    this._offsetY += p * addingY(d);
  };
  //
  // end of additional part at Ver.1.1
  //


  Game_CharacterBase.prototype.setOffset2 = function(dx, dy, slx, sly, srx, sry
  ) {
    slx = slx || 0;
    sly = sly || 0;
    srx = srx || slx;
    sry = sry || sly;
    this._offsets2 = new Point(dx, dy);
    this._frameOffsets = new Rectangle(slx, sly, srx-slx, sry-sly);
  };

  Game_CharacterBase.prototype.resetOffset2 = function() {
    this._offsets2 = null;
    this._frameOffsets = null;
  };

  Game_CharacterBase.prototype.setUpSideDown = function() {
    this._upSideDown = true;
  };

  Game_CharacterBase.prototype.resetUpSideDown = function() {
    this._upSideDown = false;
  };

  Game_CharacterBase.prototype.setAngle = function(d) {
    this._angle = d;
  };

  Sprite_Character.prototype.updateAngle = function() {
    if (this._character._upSideDown) {
      // nullの場合は無効 Mod Sunagawa
      if (this._character._angle != null) {
        this.anchor.y = 0;
        this.rotation = Math.PI + this._character._angle * Math.PI / 180;
      }
    } else {
      // nullの場合は無効 Mod Sunagawa
      if (this._character._angle != null) {
        this.anchor.y = 1;
        this.rotation = this._character._angle * Math.PI / 180;
      }
    }
  };

  var _Sprite_Character_updatePosition =
    Sprite_Character.prototype.updatePosition;
  Sprite_Character.prototype.updatePosition = function() {
    _Sprite_Character_updatePosition.call(this);
    // null or undefined : compatibility for older version
    if (this._character._offsetX == null) {
      this._character.initEffects();
    }
    this.x += this._character._offsetX;
    this.y += this._character._offsetY;

    if (this._character._offsets2) {
      var frameOffsets = this._character._frameOffsets;
      frameOffsets.width = frameOffsets.width || this.patternWidth();
      frameOffsets.height = frameOffsets.height || this.patternHeight();
      var offsets2 = this._character._offsets2;
      var sry = frameOffsets.y + frameOffsets.height;
      this.x += offsets2.x / 2 + frameOffsets.x;
      this.x -= (this.patternWidth() - frameOffsets.width) / 2;
      this.y -= Math.max(this.patternHeight() - sry, -offsets2.y, 0);
    }
  };

  var _Sprite_Balloon_updatePosition = Sprite_Balloon.prototype.updatePosition;
  Sprite_Balloon.prototype.updatePosition = function() {
     _Sprite_Balloon_updatePosition.call(this);
    var character = this._target._character;
    if (character.ballonX) {
      this.offsetX = character.ballonX;
      character.ballonX = null;
    }
    this.x += this.offsetX || 0;
    if (character.ballonY) {
      this.offsetY = character.ballonY;
      character.ballonY = null;
    }
    this.y += this.offsetY || 0;
    this.rotation = this._target.rotation;
    if (this.rotation) {
      var degree = character._angle * Math.PI / 180;
      var height = this._target.patternHeight();
      this.y += this._target.height;
      this.x += height * Math.sin(degree);
      this.y -= height * Math.cos(degree);
    }
  };

  var _Sprite_Character_setFrame = Sprite_Character.prototype.setFrame;
  Sprite_Character.prototype.setFrame = function(sx, sy, pw, ph) {
    if (this._character._offsets2) {
      var frameOffsets = this._character._frameOffsets;
      frameOffsets.width = frameOffsets.width || this.patternWidth();
      frameOffsets.height = frameOffsets.height || this.patternHeight();
      var offsets2 = this._character._offsets2;
      sx += frameOffsets.x + Math.max(-offsets2.x, 0);
      sy += frameOffsets.y + Math.max(-offsets2.y, 0);
      var srx = frameOffsets.x + frameOffsets.width;
      var sry = frameOffsets.y + frameOffsets.height;
      pw -= Math.min(Math.max(pw - srx, 0) + frameOffsets.x +
        Math.abs(offsets2.x), pw
      );
      ph -= Math.min(Math.max(ph - sry - Math.max(-offsets2.y, 0), 0) +
        frameOffsets.y + Math.abs(offsets2.y), ph
      );
    }
    _Sprite_Character_setFrame.call(this, sx, sy, pw, ph);
  };

  // ----------------------------------------
  // perform cross fade
  //
  Game_CharacterBase.prototype.initImageGrid = function() {
    this._hasChildSprite = false;
    this._newIgName = null;
    this._newIgIndex = 0;
    this._newIgDirection = 0;
    this._newIgPattern = 0;
    this._oldIgOpacity = 255;
    this._IgFrames = 0;
    this._IgDuration = 0;
  };

  Game_CharacterBase.prototype.setImageGrid2 = function(name, index, dir,
    pattern, duration, needsWait
  ) {
    if (duration > 1) {
      this._newIgName = name;
      this._newIgIndex = index;
      this.setGrid2(dir, pattern, duration, needsWait);
    } else {
      // perform normal setImageGrid.
      this.setImage(name, index);
      this.setGrid2(dir, pattern, duration, needsWait);
    }
  };

  Game_CharacterBase.prototype.setImage2 = function (name, index, duration,
    needsWait
  ) {
    if (duration > 1) {
      this._newIgName = name;
      this._newIgIndex = index;
      this._newIgDirection = this._direction;
      this._newIgPattern = this._pattern;
      this._oldIgOpacity = this.opacity();
      this._IgFrames = duration;
      this._IgDuration = duration + 1;
      if (needsWait) {
        this._waitCount = duration;
      };
    } else {
      // perform normal setImage.
      this.setImage(name, index);
    }
  };

  Game_CharacterBase.prototype.setGrid2 = function(dir, pattern, duration,
    needsWait
  ) {
    if (duration > 1) {
      this._newIgDirection = dir;
      this._newIgPattern = pattern;
      this._oldIgOpacity = this.opacity();
      this._IgFrames = duration;
      this._IgDuration = duration + 1;
      if (needsWait) {
        this._waitCount = duration;
      };
    } else {
      // perform normal setGrid.
      this._originalDirection = dir;
      this.setDirection(dir);
      this._originalPattern = pattern;
      this.setPattern(pattern);  
    }
  };

  Game_CharacterBase.prototype.setupNewImageGrid = function () {
    if (this._newIgName) {
      this.setImage(this._newIgName, this._newIgIndex);
      this._newIgName = null;
    }
    this._originalDirection = this._newIgDirection;
    this.setDirection(this._newIgDirection);
    this._originalPattern = this._newIgPattern;
    this.setPattern(this._newIgPattern);  
  };

  Game_CharacterBase.prototype.makeCrossFadeSpriteRequested = function () {
    return this._IgDuration > 0 && this._IgFrames === this._IgDuration &&
     !this._hasChildSprite;
  };

  Game_CharacterBase.prototype.igOpacity = function () {
    return this._oldIgOpacity * this._IgDuration / this._IgFrames;
  };

  Game_CharacterBase.prototype.updateImageGrid = function () {
    if (this._IgDuration > 0) {
      if (!ImageManager.isReady()) {
        return;
      }
      this._IgDuration--;
      var igCount = this._IgFrames - this._IgDuration;
      if (igCount === 0) {
        return; // wait until sprite set the sprite.
      }
      if (igCount === 1) {
        this.setupNewImageGrid();
      }
      if (igCount >= 1) {
        this._opacity = 255.0 * (igCount + 1) / this._IgFrames;
      }
    }
  };

  Sprite_Character.prototype.updateCrossFade = function() {
    var spriteset = SceneManager._scene._spriteset;
    if (spriteset) {
      if (this._character && this._character.makeCrossFadeSpriteRequested()) {
        var parent = spriteset._tilemap;
        this._character._hasChildSprite = true;
        parent.addChild(new Sprite_CrossFade(this._character));
      }
    }
  };

  function Sprite_CrossFade() {
    this.initialize.apply(this, arguments);
  }
  Sprite_CrossFade.prototype = Object.create(Sprite_Character.prototype);
  Sprite_CrossFade.prototype.constructor = Sprite_CrossFade;

  Sprite_CrossFade.prototype.initialize = function(character) {
    Sprite_Character.prototype.initialize.call(this, character);
    Sprite_Character.prototype.update.call(this);
  };

   Sprite_CrossFade.prototype.update = function() {
    this.opacity = this._character.igOpacity();
    this.updatePosition();
    if (this._character._IgDuration === 1) {
      this.parent.removeChild(this);
      this._character._hasChildSprite = false;
      this._character._IgDuration = 0;
    }
  };

})();
