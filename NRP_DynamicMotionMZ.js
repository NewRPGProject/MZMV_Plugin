//=============================================================================
// NRP_DynamicMotionMZ.js
//=============================================================================

/*:
 * @target MZ
 * @plugindesc v1.111 When executing skills, call motion freely.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 * @base NRP_DynamicAnimationMZ
 * @orderAfter NRP_DynamicAnimationMZ
 * @url http://newrpg.seesaa.net/article/477190386.html
 *
 * @help When executing skills(items), call motion freely.
 * "NRP_DynamicAnimationMZ.js" is required for the operation of this plugin.
 * 
 * [Usage]
 * For example, you can fill out a skills note as follows.
 * 
 * <D-Setting:NoStep> // no step forward
 * <D-Motion:near> // approaching target
 * frame = 10 // approaching time
 * </D-Motion>
 * <D-Motion:attack/> // swing a weapon
 * <D-Animation/> // animation
 * <D-Motion:return/> // return & damage
 * 
 * When you use a skill, you will move closer to your target and attack.
 * 
 * <D-Motion:near&jump&roll>
 * frame = 20 // approaching time
 * arcY = -200 // jump height.
 * rotation *= 5 // number of rotations
 * </D-Motion>
 * 
 * If you do the above,
 * the battler will approach the target by jumping and rolling.
 * You can also combine templates with each other in this way.
 * 
 * Other than that, this plugin has many features.
 * See below for details.
 * http://newrpg.seesaa.net/article/477190386.html
 * 
 * In particular, the following basic usage is easy to understand.
 * http://newrpg.seesaa.net/article/474038516.html
 * 
 * See also the sample skills below.
 * Many of them can be used directly by simply copying and pasting.
 * 
 * Basic Skills
 * http://newrpg.seesaa.net/article/474094068.html
 * Advanced Skills
 * http://newrpg.seesaa.net/article/474188581.html
 * Bow Skills
 * http://newrpg.seesaa.net/article/474283411.html
 * Magic Skills
 * http://newrpg.seesaa.net/article/475005304.html
 * Combination Skills
 * http://newrpg.seesaa.net/article/474521219.html
 * External Linkage Skills
 * http://newrpg.seesaa.net/article/475496918.html
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 * 
 * @param templateList
 * @type struct<DynamicMotion>[]
 * @default ["{\"templateId\":\"near\",\"name\":\"接近\",\"delay\":\"\",\"wait\":\"(isSync ? 0 : \\\"autoMove\\\")\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"defaultX + a.width/2 * mirroring + (position != 3 ? b.width/2 : 150) * mirroring\",\"ey\":\"defaultY + a.height/2\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"0\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"walk\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"crash\",\"name\":\"衝突\",\"delay\":\"\",\"wait\":\"(isSync ? 0 : \\\"autoMove\\\")\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"defaultX\",\"ey\":\"defaultY + a.height/2\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"0\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"walk\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"back\",\"name\":\"背後\",\"delay\":\"\",\"wait\":\"(isSync ? 0 : \\\"autoMove\\\")\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"defaultX - a.width/2 * mirroring - (position != 3 ? b.width/2 : 150) * mirroring\",\"ey\":\"defaultY + a.height/2\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"0\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"walk\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"pierce\",\"name\":\"貫通\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"(b.isActor() ? Graphics.boxWidth + a.width : -a.width)\",\"ey\":\"sy + (defaultY - (sy - a.height/2)) * (ex - sx) / (defaultX - sx)\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"stepForward\",\"name\":\"前進\",\"delay\":\"\",\"wait\":\"(isSync ? 0 : \\\"autoMove\\\")\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"a.x - 48 * (a.isEnemy() ? -1 : 1)\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"walk\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"stepBack\",\"name\":\"後退\",\"delay\":\"\",\"wait\":\"(isSync ? 0 : \\\"autoMove\\\")\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"a.x + 48 * (a.isEnemy() ? -1 : 1)\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"walk\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"return\",\"name\":\"帰還\",\"delay\":\"(isSync ? 0 : \\\"auto\\\")\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"false\",\"damage\":\"\",\"damageAll\":\"true\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"a._homeX\",\"ey\":\"a._homeY\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"0\",\"duration\":\"24\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"-50\",\"<Motion>\":\"\",\"motion\":\"escape\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"home\",\"name\":\"ホーム\",\"delay\":\"\",\"wait\":\"(isSync ? 0 : \\\"autoMove\\\")\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"a._homeX\",\"ey\":\"a._homeY\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"walk\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"jump\",\"name\":\"ジャンプ\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"-100\",\"<Motion>\":\"\",\"motion\":\"wait\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"roll\",\"name\":\"回転\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"t/et * -Math.PI*2 * mirroring\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"attack\",\"name\":\"攻撃\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"attack\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"attackR\",\"name\":\"攻撃R\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"attack\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"this._pattern - 1\",\"motionStartPattern\":\"2\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"attack0\",\"name\":\"攻撃0\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"attack\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"0\",\"motionStartPattern\":\"0\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"attack1\",\"name\":\"攻撃1\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"attack\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"1\",\"motionStartPattern\":\"1\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"attack2\",\"name\":\"攻撃2\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"attack\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"2\",\"motionStartPattern\":\"2\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"thrust\",\"name\":\"突き\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"thrust\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"swing\",\"name\":\"振り\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"swing\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"missile\",\"name\":\"飛び道具\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"missile\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"skill\",\"name\":\"スキル発動\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"skill\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"spell\",\"name\":\"魔法発動\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"spell\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"invisible\",\"name\":\"透明\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"255 * (1 - t/et)\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"visible\",\"name\":\"透明解除\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"255 * t/et\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"mirror\",\"name\":\"反転\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"true\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"mirrorOff\",\"name\":\"反転解除\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"false\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"target\",\"name\":\"対象\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"targets\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"every\",\"name\":\"対象毎に実行\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"true\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"wait\",\"name\":\"ウェイト\",\"delay\":\"\",\"wait\":\"auto\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"noWait\",\"name\":\"ウェイトなし\",\"delay\":\"\",\"wait\":\"0\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"delay\",\"name\":\"ディレイ\",\"delay\":\"auto\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"noDelay\",\"name\":\"ディレイなし\",\"delay\":\"0\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"soon\",\"name\":\"即時\",\"delay\":\"\",\"wait\":\"auto\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"1\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"1\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"zoomA\",\"name\":\"自分ズーム\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"$gameScreen.setZoom(a.x, a.y - a.height/2, 1 + 0.5 * t/et)\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"zoomB\",\"name\":\"対象ズーム\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"$gameScreen.setZoom(b.x, b.y - b.height/2, 1 + 0.5 * t/et)\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"zoomOff\",\"name\":\"ズーム解除\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"$gameScreen.setZoom($gameScreen._zoomX, $gameScreen._zoomY, 1 + ($gameScreen._zoomScale - 1) * (1 - t/et))\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"shake\",\"name\":\"振動\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"Math.sin(Math.PI * 2 * t / 4) * 3\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"revolve\",\"name\":\"公転\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"100 * (Math.sin(t/et * Math.PI))\",\"radiusY\":\"100 * (Math.sin(t/et * Math.PI))\",\"radX\":\"t/et * Math.PI*2\",\"radY\":\"t/et * Math.PI*2\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"head\",\"name\":\"頭上\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"0\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"center\",\"name\":\"中央\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"1\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"foot\",\"name\":\"足元\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"2\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"whole\",\"name\":\"全体\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"3\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"svWalk\",\"name\":\"歩行\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"walk\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"svWait\",\"name\":\"通常待機\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"wait\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"svChant\",\"name\":\"詠唱待機\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"chant\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"svGuard\",\"name\":\"防御\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"guard\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"svDamage\",\"name\":\"ダメージモーション\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"damage\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"svEvade\",\"name\":\"回避\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"evade\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"svThrust\",\"name\":\"突き\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"thrust\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"svSwing\",\"name\":\"振り\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"swing\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"svMissile\",\"name\":\"飛び道具\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"missile\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"svSkill\",\"name\":\"スキル発動\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"skill\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"svSpell\",\"name\":\"魔法発動\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"spell\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"svItem\",\"name\":\"アイテム\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"item\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"svEscape\",\"name\":\"逃げる\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"escape\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"svVictory\",\"name\":\"勝利\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"victory\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"svDying\",\"name\":\"瀕死\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"dying\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"svAbnormal\",\"name\":\"状態異常\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"dying\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"svSleep\",\"name\":\"睡眠\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"sleep\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"svDead\",\"name\":\"戦闘不能\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"dead\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"reverse\",\"name\":\"逆再生\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"this._pattern - 1\",\"motionStartPattern\":\"2\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"pattern0\",\"name\":\"パターン０\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"0\",\"motionStartPattern\":\"0\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"pattern1\",\"name\":\"パターン１\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"1\",\"motionStartPattern\":\"1\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"pattern2\",\"name\":\"パターン２\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"2\",\"motionStartPattern\":\"2\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"ifOther\",\"name\":\"対象が他者\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"a != b\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"ifSelf\",\"name\":\"対象が自分\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"a == b\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"ifActor\",\"name\":\"味方のみ\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"a.isActor()\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"ifEnemy\",\"name\":\"敵のみ\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"a.isEnemy()\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"ifBattle\",\"name\":\"戦闘中\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"$gameParty.inBattle()\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"ifMap\",\"name\":\"マップ中\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"!$gameParty.inBattle()\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"ifAdjacent\",\"name\":\"隣接\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"!$gameParty.inBattle() && a.isAdjacent && a.isAdjacent(b)\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"ifDistant\",\"name\":\"遠隔\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"$gameParty.inBattle() || !a.isAdjacent(b)\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}"]
 * @desc List of defined template motions.
 * You can also add new templates.
 * 
 * @param mapTemplateList
 * @type struct<DynamicMotion>[]
 * @default ["{\"templateId\":\"near\",\"name\":\"接近\",\"delay\":\"\",\"wait\":\"(isSync ? 0 : \\\"autoMove\\\")\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"a.nearX(b, position)\",\"ey\":\"a.nearY(b, position)\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"0\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"walk\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"crash\",\"name\":\"衝突\",\"delay\":\"\",\"wait\":\"(isSync ? 0 : \\\"autoMove\\\")\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"a.crashX(b, position)\",\"ey\":\"a.crashY(b, position)\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"0\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"walk\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"back\",\"name\":\"背後\",\"delay\":\"\",\"wait\":\"(isSync ? 0 : \\\"autoMove\\\")\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"a.backX(b, position)\",\"ey\":\"a.backY(b, position)\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"0\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"walk\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"stepForward\",\"name\":\"前進\",\"delay\":\"\",\"wait\":\"(isSync ? 0 : \\\"autoMove\\\")\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"walk\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"$gameMap.roundXWithDirection(a.gx, a._character._direction)\",\"gridEy\":\"$gameMap.roundYWithDirection(a.gy, a._character._direction)\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"stepBack\",\"name\":\"後退\",\"delay\":\"\",\"wait\":\"(isSync ? 0 : \\\"autoMove\\\")\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"walk\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"$gameMap.roundXWithDirection(a.gx, a._character.reverseDir(a._character._direction))\",\"gridEy\":\"$gameMap.roundYWithDirection(a.gy, a._character.reverseDir(a._character._direction))\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"return\",\"name\":\"帰還\",\"delay\":\"(isSync ? 0 : \\\"auto\\\")\",\"wait\":\"(isSync ? 0 : \\\"autoMove\\\")\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"false\",\"damage\":\"\",\"damageAll\":\"true\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"0\",\"duration\":\"24\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"a.gx == a._homeGx && a.gy == a._homeGy ? 0 : -50\",\"<Motion>\":\"\",\"motion\":\"a.gx == a._homeGx && a.gy == a._homeGy ? undefined : \\\"escape\\\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"a._homeGx\",\"gridEy\":\"a._homeGy\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"home\",\"name\":\"ホーム\",\"delay\":\"\",\"wait\":\"(isSync ? 0 : \\\"autoMove\\\")\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"walk\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"a._homeGx\",\"gridEy\":\"a._homeGy\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"turnToward\",\"name\":\"対象を向く\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"a.turnTowardDirection(b)\",\"pattern\":\"\"}","{\"templateId\":\"turnAway\",\"name\":\"反対を向く\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"a.turnAwayDirection(b)\",\"pattern\":\"\"}","{\"templateId\":\"clear\",\"name\":\"モーションクリア\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\\\"\\\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}"]
 * @desc List of defined template motions for maps.
 * If the same ID exists, it takes precedence on maps.
 * 
 * @param shortTagName
 * @type string
 * @default DM
 * @desc You can omit the tag name with the specified string.
 * ex. <D-Motion:near/> -> <dm:near/>
 * 
 * @param shortSettingTagName
 * @type string
 * @default DS
 * @desc You can omit the setting tag name with the specified string.
 * ex. <D-Setting:NoStep> -> <ds:NoStep>
 * 
 * @param setStartMotion
 * @type select
 * @option 0:always @value 0
 * @option 1:always nothing @value 1
 * @option 2:None when motion @value 2
 * @default 2
 * @desc Set whether to start the attack or skill.
 * 
 * @param setStepForward
 * @type select
 * @option 0:always @value 0
 * @option 1:always nothing @value 1
 * @option 2:None when motion @value 2
 * @default 0
 * @desc Set whether there is one step forward motion.
 * 
 * @param defaultDuration
 * @type number
 * @min 0
 * @default 12
 * @desc The default value for move duration.
 * 
 * @param defaultEnemyMotionDuration
 * @type number
 * @min 0
 * @default 12
 * @desc The default value for enemy motion duration.
 * Normally, the enemy has no motion. Just wait for the time.
 *
 * @param jumpShadow
 * @type boolean
 * @default true
 * @desc Show shadows when jumping.
 * 
 * @param immortalState
 * @type state
 * @default 3
 * @desc The immortal state number to use for performance.
 * Please set up a dedicated state if possible.
 * 
 * @param <Priority>
 * @desc Display priority-related headings.
 * 
 * @param usePriority
 * @parent <Priority>
 * @type boolean
 * @default true
 * @desc Enables the display priority change function.
 * 
 * @param battlerZ
 * @parent <Priority>
 * @type number
 * @decimals 1
 * @default 3
 * @desc The initial value of the Z coordinate of battler.
 * The default value is 3.
 * 
 * @param opponentSideZ
 * @parent <Priority>
 * @type number
 * @decimals 1
 * @default 2.5
 * @desc Changes the Z coordinate of the opponent's side at the time of action.
 * It is assumed to be displayed below the action subject.
 */
/*~struct~DynamicMotion:
 * @param templateId
 * @type string
 * @desc The identifier used to call the template.
 * Specify this ID in the note of skills and items.
 * 
 * @param name
 * @type string
 * @desc This is a note for identification. Please give a descriptive name.
 * you can use it even if you specify this in the note field of the skill.
 * 
 * @param delay
 * @type string
 * @desc Wait frame before displaying motion.
 * When set to "auto", wait for the end of the previous motion.
 * 
 * @param wait
 * @type string
 * @desc Wait frame after displaying motion.
 * When set to "auto", wait for the end of this motion.
 * 
 * @param repeat
 * @type string
 * @desc The number of motion repetitions.
 * 
 * @param performer
 * @type string
 * @desc Target to execute motion.
 * Battler or its array can be specified.
 * 
 * @param noReturn
 * @type boolean
 * @desc An actor will not return to the home position.
 * To cancel, specify false.
 * 
 * @param battlerImage
 * @text [old]battlerImage
 * @type string
 * @desc Temporarily change the image of the battler.
 * It is released at the end of the battle.
 * 
 * @param image
 * @type string
 * @desc Temporarily changes the image of the battler (character).
 * Switch scenes to get back to normal.
 * 
 * @param imageIndex
 * @type number
 * @desc Temporarily changes the index(0-7) of the image.
 * Map only. Switch scenes to get back to normal.
 * 
 * @param <Repeat>
 * @desc Basic settings that are processed for each repeat.
 * 
 * @param condition
 * @parent <Repeat>
 * @type string
 * @desc This is an execution condition.
 * 
 * @param position
 * @parent <Repeat>
 * @type select
 * @option 0:Overhead @value 0
 * @option 1:Center @value 1
 * @option 2:Foot @value 2
 * @option 3:Screen @value 3
 * @desc The position of the motion.
 * 
 * @param interval
 * @parent <Repeat>
 * @type string
 * @desc The interval at which the motion repeats.
 * That time corresponds to one frame of the animation.
 * 
 * @param rate
 * @parent <Repeat>
 * @type string
 * @desc It is the time of one frame of motion.
 * The default value is 4. The drawing is updated every 4/60 seconds.
 * 
 * @param every
 * @parent <Repeat>
 * @type boolean
 * @desc If ON, repeat the motion for every target.
 * 
 * @param nextDelay
 * @parent <Repeat>
 * @type string
 * @desc The time difference in motion for each target in the skill.
 * It is meaningless if "every" is not turned on.
 * 
 * @param performerDelay
 * @parent <Repeat>
 * @type string
 * @desc The time difference in motion for each performer.
 * 
 * @param mirror
 * @parent <Repeat>
 * @type boolean
 * @desc The display of battler is reversed left and right.
 * 
 * @param damage
 * @parent <Repeat>
 * @type boolean
 * @desc Perform damage processing without waiting for the end of the motion.
 * This is processed only once.
 * 
 * @param damageAll
 * @parent <Repeat>
 * @type boolean
 * @desc Perform damage processing without waiting for the end of the motion.
 * This is all handled. (Faster normal damage processing)
 * 
 * @param noShadow
 * @parent <Repeat>
 * @type boolean
 * @desc Do not show battler shadows.
 * 
 * @param playSe
 * @parent <Repeat>
 * @type string
 * @desc Plays the specified sound effect. ex1. Cat
 * ex2. {"name": "Cat", "volume": 90, "pitch": 100, "pan": 0}
 * 
 * @param commonEvent
 * @parent <Repeat>
 * @type common_event
 * @desc Runs the common event of the specified number.
 * 
 * @param script
 * @parent <Repeat>
 * @type string
 * @desc Runs the specified script.
 * 
 * @param plugin
 * @parent <Repeat>
 * @type string
 * @desc Runs the specified plugin command.
 * 
 * @param <End Point>
 * @desc End point related parameters.
 * 
 * @param ex
 * @parent <End Point>
 * @type string
 * @desc The X coordinate of the end point.
 * The battler moves to the end point.
 * 
 * @param ey
 * @parent <End Point>
 * @type string
 * @desc The Y coordinate of the end point.
 * The battler moves to the end point.
 * 
 * @param exRandom
 * @parent <End Point>
 * @type string
 * @desc Disperses the X coordinate of the end point
 * to the left and right.
 * 
 * @param eyRandom
 * @parent <End Point>
 * @type string
 * @desc Disperses the Y coordinate of the end point
 * up and down.
 * 
 * @param airY
 * @parent <End Point>
 * @type string
 * @desc The air Y coordinate of the end point.
 * The battler moves to the end point in the air.
 * 
 * @param duration
 * @parent <End Point>
 * @type string
 * @desc The time it takes to move. (1/6os)
 * 
 * @param frame
 * @parent <End Point>
 * @type string
 * @desc Time required for movement (animation frame).
 * This has priority over "duration".
 * 
 * @param arcX
 * @parent <End Point>
 * @type string
 * @desc The width of the parabola.
 * 
 * @param arcY
 * @parent <End Point>
 * @type string
 * @desc The vertical width of the parabola.
 * Note that negative values go up!
 * 
 * @param <Motion>
 * @desc Motion-related parameters.
 * 
 * @param motion
 * @parent <Motion>
 * @type select
 * @option attack
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc The name of the motion to execute.
 * Ex: walk, wait. If you set "attack", the weapon will be used.
 * 
 * @param motionDuration
 * @parent <Motion>
 * @type string
 * @desc The time required for the motion.(1/6os)
 * 
 * @param motionFrame
 * @parent <Motion>
 * @type string
 * @desc Time required for motion (animation frame).
 * This has priority over "motionDuration".
 * 
 * @param motionPattern
 * @parent <Motion>
 * @type string
 * @desc Motion pattern.
 * Usually a number from 0 to 2 is entered.
 * 
 * @param motionStartPattern
 * @parent <Motion>
 * @type string
 * @desc The start pattern of the motion.
 * Usually 0, but 1,2 can be specified.
 * 
 * @param weaponId
 * @parent <Motion>
 * @type string
 * @desc Weapon ID used during motion.
 * 
 * @param weaponType
 * @parent <Motion>
 * @type string
 * @desc Weapon Type used during motion.
 * This takes priority over the weapon ID.
 * 
 * @param <Real Time>
 * @desc Items calculated every 1/60 second.
 *
 * @param dx
 * @parent <Real Time>
 * @type string
 * @desc It is the real-time calculation position of X coordinate.
 * 
 * @param dy
 * @parent <Real Time>
 * @type string
 * @desc It is the real-time calculation position of Y coordinate.
 * 
 * @param addX
 * @parent <Real Time>
 * @type string
 * @desc Value to be added to the X coordinate.
 * 
 * @param addY
 * @parent <Real Time>
 * @type string
 * @desc Value to be added to the Y coordinate.
 * 
 * @param scale
 * @parent <Real Time>
 * @type string
 * @desc The magnification of the overall. 1.0 is standard.
 * 
 * @param scaleX
 * @parent <Real Time>
 * @type string
 * @desc The magnification of the width. 1.0 is standard.
 * 
 * @param scaleY
 * @parent <Real Time>
 * @type string
 * @desc The magnification of the height. 1.0 is standard.
 * 
 * @param rotation
 * @parent <Real Time>
 * @type string
 * @desc Turn rate
 * One revolution with "Math.PI * 2".
 * 
 * @param opacity
 * @parent <Real Time>
 * @type string
 * @desc Opacity.
 * 255 is opaque and 0 is transparent.
 * 
 * @param color
 * @parent <Real Time>
 * @type string
 * @desc Change the color tone.
 * Ex.[255, 255, 255, 255](Red, green, blue, strength)
 * 
 * @param z
 * @parent <Real Time>
 * @type number
 * @decimals 1
 * @desc Change the Z coordinate of battler.
 * 
 * @param scriptRT
 * @parent <Real Time>
 * @type string
 * @desc Runs the specified script in real time.
 * 
 * @param <Real Time Circle>
 * @desc Items related to real-time circular motion.
 * 
 * @param radiusX
 * @parent <Real Time Circle>
 * @type string
 * @desc The radius of the circular motion in the X direction.
 * 
 * @param radiusY
 * @parent <Real Time Circle>
 * @type string
 * @desc The radius of the circular motion in the Y direction.
 * 
 * @param radX
 * @parent <Real Time Circle>
 * @type string
 * @desc The circular motion angle in the X direction.
 * 2π is one cycle.
 * 
 * @param radY
 * @parent <Real Time Circle>
 * @type string
 * @desc The circular motion angle in the Y direction.
 * 2π is one cycle.
 * 
 * @param <Map Only>
 * @desc Only map parameters.
 * 
 * @param gridEx
 * @parent <Map Only>
 * @type string
 * @desc The X coordinate (in grid units) of the endpoint.
 * The character moves to the end point.
 * 
 * @param gridEy
 * @parent <Map Only>
 * @type string
 * @desc The Y coordinate (in grid units) of the endpoint.
 * The character moves to the end point.
 * 
 * @param direction
 * @text direction(Real Time)
 * @parent <Map Only>
 * @type select
 * @option 2:Down @value 2
 * @option 4:Left @value 4
 * @option 6:Right @value 6
 * @option 8:Up @value 8
 * @option Turn Toward Target @value a.turnTowardDirection(b)
 * @option Turn Away Target @value a.turnAwayDirection(b)
 * @desc Changes the direction of the character.
 * In addition to numbers, you can also specify "up","down","left","right".
 * 
 * @param pattern
 * @text pattern(Real Time)
 * @parent <Map Only>
 * @type select
 * @option 0:Left @value 0
 * @option 1:Middle @value 1
 * @option 2:Right @value 2
 * @desc Sets the character's pattern (footsteps).
 */

/*:ja
 * @target MZ
 * @plugindesc v1.111 スキル実行時、自在にモーションを呼び出す。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 * @base NRP_DynamicAnimationMZ
 * @orderAfter NRP_DynamicAnimationMZ
 * @url http://newrpg.seesaa.net/article/477190386.html
 *
 * @help スキル（アイテム）から自在にモーションを呼び出します。
 * このプラグインの動作には、NRP_DynamicAnimationMZ.jsが必要です。
 * 
 * ■使用方法
 * 例えば、以下のようにスキルのメモ欄へ記入します。
 * 
 * <D-Setting:NoStep> // 自動前進禁止
 * <D-Motion:near> // 対象へ接近
 * frame = 10 // 接近時間
 * </D-Motion>
 * <D-Motion:attack/> // 武器振り
 * <D-Animation/> // アニメーション
 * <D-Motion:return/> // 戻る
 * 
 * スキルを使用すれば、対象に近づいて攻撃するようになります。
 * 
 * <D-Motion:near&jump&roll> // 接近＆ジャンプ＆回転
 * frame = 20 // 接近時間
 * arcY = -200 // ジャンプの高さ
 * rotation *= 5 // 回転数
 * </D-Motion>
 * 
 * とすれば、ジャンプと回転をしながら対象へ近づきます。
 * このようにテンプレート同士を組み合わせることも可能です。
 * 
 * その他にも、当プラグインは非常に多機能となっています。
 * 詳細は以下をご覧ください。
 * http://newrpg.seesaa.net/article/477190386.html
 * 
 * 特に、以下の基本的な使用法が分かりやすいと思います。
 * http://newrpg.seesaa.net/article/474038516.html
 * 
 * 以下のサンプル技もご覧ください。
 * 多くはコピペするだけでそのまま使えます。
 * 
 * 基本技
 * http://newrpg.seesaa.net/article/474094068.html
 * 上級技
 * http://newrpg.seesaa.net/article/474188581.html
 * 弓技
 * http://newrpg.seesaa.net/article/474283411.html
 * 魔法
 * http://newrpg.seesaa.net/article/475005304.html
 * 合体技
 * http://newrpg.seesaa.net/article/474521219.html
 * 外部連携
 * http://newrpg.seesaa.net/article/475496918.html
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param templateList
 * @text テンプレート一覧
 * @type struct<DynamicMotion>[]
 * @default ["{\"templateId\":\"near\",\"name\":\"接近\",\"delay\":\"\",\"wait\":\"(isSync ? 0 : \\\"autoMove\\\")\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"defaultX + a.width/2 * mirroring + (position != 3 ? b.width/2 : 150) * mirroring\",\"ey\":\"defaultY + a.height/2\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"0\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"walk\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"crash\",\"name\":\"衝突\",\"delay\":\"\",\"wait\":\"(isSync ? 0 : \\\"autoMove\\\")\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"defaultX\",\"ey\":\"defaultY + a.height/2\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"0\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"walk\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"back\",\"name\":\"背後\",\"delay\":\"\",\"wait\":\"(isSync ? 0 : \\\"autoMove\\\")\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"defaultX - a.width/2 * mirroring - (position != 3 ? b.width/2 : 150) * mirroring\",\"ey\":\"defaultY + a.height/2\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"0\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"walk\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"pierce\",\"name\":\"貫通\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"(b.isActor() ? Graphics.boxWidth + a.width : -a.width)\",\"ey\":\"sy + (defaultY - (sy - a.height/2)) * (ex - sx) / (defaultX - sx)\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"stepForward\",\"name\":\"前進\",\"delay\":\"\",\"wait\":\"(isSync ? 0 : \\\"autoMove\\\")\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"a.x - 48 * (a.isEnemy() ? -1 : 1)\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"walk\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"stepBack\",\"name\":\"後退\",\"delay\":\"\",\"wait\":\"(isSync ? 0 : \\\"autoMove\\\")\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"a.x + 48 * (a.isEnemy() ? -1 : 1)\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"walk\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"return\",\"name\":\"帰還\",\"delay\":\"(isSync ? 0 : \\\"auto\\\")\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"false\",\"damage\":\"\",\"damageAll\":\"true\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"a._homeX\",\"ey\":\"a._homeY\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"0\",\"duration\":\"24\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"-50\",\"<Motion>\":\"\",\"motion\":\"escape\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"home\",\"name\":\"ホーム\",\"delay\":\"\",\"wait\":\"(isSync ? 0 : \\\"autoMove\\\")\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"a._homeX\",\"ey\":\"a._homeY\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"walk\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"jump\",\"name\":\"ジャンプ\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"-100\",\"<Motion>\":\"\",\"motion\":\"wait\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"roll\",\"name\":\"回転\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"t/et * -Math.PI*2 * mirroring\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"attack\",\"name\":\"攻撃\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"attack\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"attackR\",\"name\":\"攻撃R\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"attack\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"this._pattern - 1\",\"motionStartPattern\":\"2\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"attack0\",\"name\":\"攻撃0\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"attack\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"0\",\"motionStartPattern\":\"0\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"attack1\",\"name\":\"攻撃1\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"attack\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"1\",\"motionStartPattern\":\"1\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"attack2\",\"name\":\"攻撃2\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"attack\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"2\",\"motionStartPattern\":\"2\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"thrust\",\"name\":\"突き\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"thrust\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"swing\",\"name\":\"振り\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"swing\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"missile\",\"name\":\"飛び道具\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"missile\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"skill\",\"name\":\"スキル発動\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"skill\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"spell\",\"name\":\"魔法発動\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"spell\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"invisible\",\"name\":\"透明\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"255 * (1 - t/et)\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"visible\",\"name\":\"透明解除\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"255 * t/et\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"mirror\",\"name\":\"反転\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"true\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"mirrorOff\",\"name\":\"反転解除\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"false\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"target\",\"name\":\"対象\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"targets\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"every\",\"name\":\"対象毎に実行\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"true\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"wait\",\"name\":\"ウェイト\",\"delay\":\"\",\"wait\":\"auto\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"noWait\",\"name\":\"ウェイトなし\",\"delay\":\"\",\"wait\":\"0\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"delay\",\"name\":\"ディレイ\",\"delay\":\"auto\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"noDelay\",\"name\":\"ディレイなし\",\"delay\":\"0\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"soon\",\"name\":\"即時\",\"delay\":\"\",\"wait\":\"auto\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"1\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"1\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"zoomA\",\"name\":\"自分ズーム\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"$gameScreen.setZoom(a.x, a.y - a.height/2, 1 + 0.5 * t/et)\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"zoomB\",\"name\":\"対象ズーム\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"$gameScreen.setZoom(b.x, b.y - b.height/2, 1 + 0.5 * t/et)\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"zoomOff\",\"name\":\"ズーム解除\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"$gameScreen.setZoom($gameScreen._zoomX, $gameScreen._zoomY, 1 + ($gameScreen._zoomScale - 1) * (1 - t/et))\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"shake\",\"name\":\"振動\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"Math.sin(Math.PI * 2 * t / 4) * 3\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"revolve\",\"name\":\"公転\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"100 * (Math.sin(t/et * Math.PI))\",\"radiusY\":\"100 * (Math.sin(t/et * Math.PI))\",\"radX\":\"t/et * Math.PI*2\",\"radY\":\"t/et * Math.PI*2\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"head\",\"name\":\"頭上\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"0\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"center\",\"name\":\"中央\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"1\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"foot\",\"name\":\"足元\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"2\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"whole\",\"name\":\"全体\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"3\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"svWalk\",\"name\":\"歩行\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"walk\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"svWait\",\"name\":\"通常待機\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"wait\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"svChant\",\"name\":\"詠唱待機\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"chant\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"svGuard\",\"name\":\"防御\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"guard\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"svDamage\",\"name\":\"ダメージモーション\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"damage\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"svEvade\",\"name\":\"回避\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"evade\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"svThrust\",\"name\":\"突き\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"thrust\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"svSwing\",\"name\":\"振り\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"swing\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"svMissile\",\"name\":\"飛び道具\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"missile\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"svSkill\",\"name\":\"スキル発動\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"skill\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"svSpell\",\"name\":\"魔法発動\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"spell\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"svItem\",\"name\":\"アイテム\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"item\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"svEscape\",\"name\":\"逃げる\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"escape\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"svVictory\",\"name\":\"勝利\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"victory\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"svDying\",\"name\":\"瀕死\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"dying\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"svAbnormal\",\"name\":\"状態異常\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"dying\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"svSleep\",\"name\":\"睡眠\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"sleep\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"svDead\",\"name\":\"戦闘不能\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"dead\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"reverse\",\"name\":\"逆再生\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"this._pattern - 1\",\"motionStartPattern\":\"2\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"pattern0\",\"name\":\"パターン０\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"0\",\"motionStartPattern\":\"0\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"pattern1\",\"name\":\"パターン１\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"1\",\"motionStartPattern\":\"1\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"pattern2\",\"name\":\"パターン２\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"2\",\"motionStartPattern\":\"2\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"ifOther\",\"name\":\"対象が他者\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"a != b\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"ifSelf\",\"name\":\"対象が自分\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"a == b\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"ifActor\",\"name\":\"味方のみ\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"a.isActor()\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"ifEnemy\",\"name\":\"敵のみ\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"a.isEnemy()\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"ifBattle\",\"name\":\"戦闘中\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"$gameParty.inBattle()\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"ifMap\",\"name\":\"マップ中\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"!$gameParty.inBattle()\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"ifAdjacent\",\"name\":\"隣接\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"!$gameParty.inBattle() && a.isAdjacent && a.isAdjacent(b)\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"ifDistant\",\"name\":\"遠隔\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"$gameParty.inBattle() || !a.isAdjacent(b)\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}"]
 * @desc 定義されたテンプレートモーションの一覧です。
 * 新しいテンプレートの追加も可能です。
 * 
 * @param mapTemplateList
 * @text マップ用テンプレート一覧
 * @type struct<DynamicMotion>[]
 * @default ["{\"templateId\":\"near\",\"name\":\"接近\",\"delay\":\"\",\"wait\":\"(isSync ? 0 : \\\"autoMove\\\")\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"a.nearX(b, position)\",\"ey\":\"a.nearY(b, position)\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"0\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"walk\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"crash\",\"name\":\"衝突\",\"delay\":\"\",\"wait\":\"(isSync ? 0 : \\\"autoMove\\\")\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"a.crashX(b, position)\",\"ey\":\"a.crashY(b, position)\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"0\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"walk\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"back\",\"name\":\"背後\",\"delay\":\"\",\"wait\":\"(isSync ? 0 : \\\"autoMove\\\")\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"a.backX(b, position)\",\"ey\":\"a.backY(b, position)\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"0\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"walk\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"stepForward\",\"name\":\"前進\",\"delay\":\"\",\"wait\":\"(isSync ? 0 : \\\"autoMove\\\")\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"walk\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"$gameMap.roundXWithDirection(a.gx, a._character._direction)\",\"gridEy\":\"$gameMap.roundYWithDirection(a.gy, a._character._direction)\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"stepBack\",\"name\":\"後退\",\"delay\":\"\",\"wait\":\"(isSync ? 0 : \\\"autoMove\\\")\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"walk\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"$gameMap.roundXWithDirection(a.gx, a._character.reverseDir(a._character._direction))\",\"gridEy\":\"$gameMap.roundYWithDirection(a.gy, a._character.reverseDir(a._character._direction))\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"return\",\"name\":\"帰還\",\"delay\":\"(isSync ? 0 : \\\"auto\\\")\",\"wait\":\"(isSync ? 0 : \\\"autoMove\\\")\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"false\",\"damage\":\"\",\"damageAll\":\"true\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"0\",\"duration\":\"24\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"a.gx == a._homeGx && a.gy == a._homeGy ? 0 : -50\",\"<Motion>\":\"\",\"motion\":\"a.gx == a._homeGx && a.gy == a._homeGy ? undefined : \\\"escape\\\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"a._homeGx\",\"gridEy\":\"a._homeGy\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"home\",\"name\":\"ホーム\",\"delay\":\"\",\"wait\":\"(isSync ? 0 : \\\"autoMove\\\")\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"walk\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"a._homeGx\",\"gridEy\":\"a._homeGy\",\"direction\":\"\",\"pattern\":\"\"}","{\"templateId\":\"turnToward\",\"name\":\"対象を向く\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"a.turnTowardDirection(b)\",\"pattern\":\"\"}","{\"templateId\":\"turnAway\",\"name\":\"反対を向く\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"a.turnAwayDirection(b)\",\"pattern\":\"\"}","{\"templateId\":\"clear\",\"name\":\"モーションクリア\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"performer\":\"\",\"noReturn\":\"\",\"battlerImage\":\"\",\"image\":\"\",\"imageIndex\":\"\",\"<Repeat>\":\"\",\"condition\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"every\":\"\",\"nextDelay\":\"\",\"performerDelay\":\"\",\"mirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"noShadow\":\"\",\"playSe\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"airY\":\"\",\"duration\":\"\",\"frame\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Motion>\":\"\",\"motion\":\"\\\"\\\"\",\"motionDuration\":\"\",\"motionFrame\":\"\",\"motionPattern\":\"\",\"motionStartPattern\":\"\",\"weaponId\":\"\",\"weaponType\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scale\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\",\"<Map Only>\":\"\",\"gridEx\":\"\",\"gridEy\":\"\",\"direction\":\"\",\"pattern\":\"\"}"]
 * @desc マップ用に定義されたテンプレートモーションの一覧です。
 * 同名のＩＤが存在する場合も、マップ上で優先されます。
 * 
 * @param shortTagName
 * @text 省略タグ名
 * @type string
 * @default dm
 * @desc タグ名を指定した文字列で省略できるようにします。
 * 例：<D-Motion:near/> -> <dm:near/>
 * 
 * @param shortSettingTagName
 * @text 省略設定タグ名
 * @type string
 * @default ds
 * @desc 設定タグ名を指定した文字列で省略できるようにします。
 * 例：<D-Setting:NoStep> -> <ds:NoStep>
 * 
 * @param setStartMotion
 * @text 開始モーションの設定
 * @type select
 * @option 0:常に有 @value 0
 * @option 1:常に無 @value 1
 * @option 2:モーション指定時のみ無 @value 2
 * @default 2
 * @desc 攻撃やスキルの開始モーションの有無を設定します。
 * 0:常に有, 1:常に無, 2:モーション指定時のみ無
 * 
 * @param setStepForward
 * @text 一歩前進の設定
 * @type select
 * @option 0:常に有 @value 0
 * @option 1:常に無 @value 1
 * @option 2:モーション指定時のみ無 @value 2
 * @default 0
 * @desc 一歩前進モーションの有無を設定します。
 * 0:常に有, 1:常に無, 2:モーション指定時のみ無
 * 
 * @param defaultDuration
 * @text 標準移動時間(1/60秒)
 * @type number
 * @min 0
 * @default 12
 * @desc 指定を行わない場合の移動時間の初期値です。
 * 
 * @param defaultEnemyMotionDuration
 * @text 敵の標準モーション時間(1/60秒)
 * @type number
 * @min 0
 * @default 12
 * @desc 指定を行わない場合の敵モーション時間の初期値です。
 * 通常、敵にモーションはありませんので時間だけ確保します。
 *
 * @param jumpShadow
 * @text ジャンプ時の影表示
 * @type boolean
 * @default true
 * @desc ジャンプ時に影を表示するかどうか？
 * 
 * @param immortalState
 * @text 不死身ステート
 * @type state
 * @default 3
 * @desc 演出制御に使う不死身ステートの番号です。
 * なるべく専用のステートを設定してください。
 * 
 * @param <Priority>
 * @text ＜表示優先度＞
 * @desc 表示優先度関連の見出しです。
 * 
 * @param usePriority
 * @text 表示優先度の有効化
 * @parent <Priority>
 * @type boolean
 * @default true
 * @desc 表示優先度の変更機能を有効化します。
 * 他のプラグインとの兼ね合いで不要ならfalseに。
 * 
 * @param battlerZ
 * @text バトラーのＺ座標
 * @parent <Priority>
 * @type number
 * @decimals 1
 * @default 3
 * @desc バトラーのＺ座標（表示優先度）の初期値です。
 * 初期値は3です。
 * 
 * @param opponentSideZ
 * @text 相手サイドのＺ座標
 * @parent <Priority>
 * @type number
 * @decimals 1
 * @default 2.5
 * @desc 行動時、相手サイドのＺ座標を変更します。
 * ※行動主体よりも下に表示することを想定。
 */
/*~struct~DynamicMotion:ja
 * @param templateId
 * @text テンプレートＩＤ
 * @type string
 * @desc テンプレートの呼び出しに使う識別子です。
 * このIDをスキル・アイテムのメモ欄で指定します。
 * 
 * @param name
 * @text 名前
 * @type string
 * @desc 識別用のメモです。分かりやすい名前をおつけください。
 * 実はこれをスキル・アイテムのメモ欄で指定しても使えます。
 * 
 * @param delay
 * @text ディレイ（遅延）
 * @type string
 * @desc モーション表示前の待機フレームです。
 * autoにすると前モーションの終了を待ちます。
 * 
 * @param wait
 * @text ウェイト
 * @type string
 * @desc モーションを表示後の待機フレームです。
 * autoにするとモーションの終了を待ちます。
 * また、autoMoveにすると移動のみを待ちます。
 * 
 * @param repeat
 * @text リピート回数
 * @type string
 * @desc モーションの繰り返し回数です。
 * 
 * @param performer
 * @text モーション対象
 * @type string
 * @desc モーションの実行を指定した対象へ変更します。
 * バトラーまたはその配列を指定可能です。
 * 
 * @param noReturn
 * @text 帰還無効
 * @type boolean
 * @desc アクターがホームポジションへ戻らないようにします。
 * 解除する場合はfalseを指定してください。
 * 
 * @param battlerImage
 * @text [旧]バトラー画像
 * @type string
 * @desc バトラーの画像を一時的に変更します。
 * ※この項目はimageに移行されました。
 * 
 * @param image
 * @text 画像
 * @type string
 * @desc バトラーやキャラクターの画像を指定ファイルへ変更します。
 * 画面切替で元に戻ります。
 * 
 * @param imageIndex
 * @text 画像インデックス
 * @type number
 * @desc キャラクター画像のインデックス(0-7)を一時的に変更します。
 * マップ専用。画面切替で元に戻ります。
 * 
 * @param <Repeat>
 * @text ＜リピート＞
 * @desc リピートごとに処理される基本設定です。
 * 
 * @param condition
 * @text 実行条件
 * @parent <Repeat>
 * @type string
 * @desc 実行条件です。
 * この条件を満たさない場合、モーションを実行しません。
 * 
 * @param position
 * @text 位置
 * @parent <Repeat>
 * @type select
 * @option 0:頭上 @value 0
 * @option 1:中央 @value 1
 * @option 2:足元 @value 2
 * @option 3:画面 @value 3
 * @desc モーションの対象位置です。0:頭上, 1:中心, 2:足元, 3:画面。
 * 
 * @param interval
 * @text 間隔
 * @parent <Repeat>
 * @type string
 * @desc モーションを繰り返す間隔です。
 * 時間はアニメーションの1フレームに対応します。
 * 
 * @param rate
 * @text 描画レート
 * @parent <Repeat>
 * @type string
 * @desc モーション１フレームの経過時間です。
 * 初期値は4。つまり4/60秒単位になります。
 * 
 * @param every
 * @text 対象毎に繰り返し
 * @parent <Repeat>
 * @type boolean
 * @desc ONならモーションを対象毎に繰り返します。
 * 
 * @param nextDelay
 * @text 対象毎の時間差
 * @parent <Repeat>
 * @type string
 * @desc スキル対象が複数の場合にモーションを実行する時間差です。
 * 『対象毎に繰り返し』をONにしないと無意味です。
 * 
 * @param performerDelay
 * @text モーション対象毎の時間差
 * @parent <Repeat>
 * @type string
 * @desc モーション対象が複数の場合にモーションを実行する時間差です。
 * 
 * @param mirror
 * @text 左右反転
 * @parent <Repeat>
 * @type boolean
 * @desc バトラーの表示を左右反転します。
 * 
 * @param damage
 * @text ダメージ処理
 * @parent <Repeat>
 * @type boolean
 * @desc 全モーションの終了を待たずにダメージ処理を行います。
 * こちらは一回だけ処理します。
 * 
 * @param damageAll
 * @text 全体ダメージ処理
 * @parent <Repeat>
 * @type boolean
 * @desc 全モーションの終了を待たずにダメージ処理を行います。
 * こちらは全て処理します。（通常のダメージ処理を早める）
 * 
 * @param noShadow
 * @text 影の非表示
 * @parent <Repeat>
 * @type boolean
 * @desc 影を消します。
 * 
 * @param playSe
 * @text 効果音
 * @parent <Repeat>
 * @type string
 * @desc 指定した効果音（SE）を再生します。例1:Cat
 * 例2:{"name":"Cat","volume":90,"pitch":100,"pan":0}
 * 
 * @param commonEvent
 * @text コモンイベント
 * @parent <Repeat>
 * @type common_event
 * @desc 指定した番号のコモンイベントを実行します。
 * 
 * @param script
 * @text スクリプト
 * @parent <Repeat>
 * @type string
 * @desc 指定したスクリプトを実行します。
 * 
 * @param plugin
 * @text プラグインコマンド
 * @parent <Repeat>
 * @type string
 * @desc 指定したプラグインコマンドを実行します。
 * 
 * @param <End Point>
 * @text ＜終点＞
 * @desc 終点（移動先）関連のパラメータです。
 * 
 * @param ex
 * @text 終点Ｘ座標
 * @parent <End Point>
 * @type string
 * @desc 終点のＸ座標です。
 * これを入力すれば始点から終点へバトラーが移動します。
 * 
 * @param ey
 * @text 終点Ｙ座標
 * @parent <End Point>
 * @type string
 * @desc 終点のＹ座標です。
 * これを入力すれば始点から終点へバトラーが移動します。
 * 
 * @param exRandom
 * @text 終点Ｘ座標の分散値
 * @parent <End Point>
 * @type string
 * @desc 終点のＸ座標を左右に分散させます。
 * 値が100なら-100～100の200ピクセル分散します。
 * 
 * @param eyRandom
 * @text 終点Ｙ座標の分散値
 * @parent <End Point>
 * @type string
 * @desc 終点のＹ座標を上下に分散させます。
 * 値が100なら-100～100の200ピクセル分散します。
 * 
 * @param airY
 * @text 終点空中Ｙ座標
 * @parent <End Point>
 * @type string
 * @desc 終点の空中Ｙ座標です。
 * 空中を終点にしてバトラーが移動します。
 * 
 * @param duration
 * @text 移動時間(1/60秒)
 * @parent <End Point>
 * @type string
 * @desc 移動に要する時間です。
 * 
 * @param frame
 * @text 移動フレーム
 * @parent <End Point>
 * @type string
 * @desc 移動に要する時間（アニメーションフレーム）です。
 * durationよりこちらのほうが優先されます。
 * 
 * @param arcX
 * @text 放物線の横幅
 * @parent <End Point>
 * @type string
 * @desc 放物線の横幅です。
 * 
 * @param arcY
 * @text 放物線の縦幅
 * @parent <End Point>
 * @type string
 * @desc 放物線の縦幅です。
 * マイナスが上方向になるので注意！
 * 
 * @param <Motion>
 * @text ＜モーション＞
 * @desc モーション関連のパラメータです。
 * 
 * @param motion
 * @text モーション名
 * @parent <Motion>
 * @type select
 * @option 攻撃（attack） @value attack
 * @option 前進（walk） @value walk
 * @option 通常待機（wait） @value wait
 * @option 詠唱待機（chant） @value chant
 * @option 防御（guard） @value guard
 * @option ダメージ（damage） @value damage
 * @option 回避（evade） @value evade
 * @option 突き（thrust） @value thrust
 * @option 振り（swing） @value swing
 * @option 飛び道具（missile） @value missile
 * @option 汎用スキル（skill） @value skill
 * @option 魔法（spell） @value spell
 * @option アイテム（item） @value item
 * @option 逃げる（escape） @value escape
 * @option 勝利（victory） @value victory
 * @option 瀕死（dying） @value dying
 * @option 状態異常（abnormal） @value abnormal
 * @option 睡眠（sleep） @value sleep
 * @option 戦闘不能（dead） @value dead
 * @desc 実行するモーション名です。
 * 例：walk, waitなど。また"attack"で武器を振ります。
 * 
 * @param motionDuration
 * @text モーション時間(1/60秒)
 * @parent <Motion>
 * @type string
 * @desc モーションに要する時間です。
 * 
 * @param motionFrame
 * @text モーションフレーム
 * @parent <Motion>
 * @type string
 * @desc モーションに要する時間（アニメーションフレーム）です。
 * motionDurationよりこちらのほうが優先されます。
 * 
 * @param motionPattern
 * @text モーションパターン
 * @parent <Motion>
 * @type string
 * @desc モーションパターンです。
 * 通常は0～2の数が入ります。
 * 
 * @param motionStartPattern
 * @text モーション開始パターン
 * @parent <Motion>
 * @type string
 * @desc モーションの開始パターンです。
 * 通常は0ですが、1,2を指定可能です。
 * 
 * @param weaponId
 * @text 武器ID
 * @parent <Motion>
 * @type string
 * @desc モーション時に使用する武器IDです。
 * 
 * @param weaponType
 * @text 武器タイプ
 * @parent <Motion>
 * @type string
 * @desc モーション時に使用する武器タイプです。
 * 武器IDよりこちらが優先されます。
 * 
 * @param <Real Time>
 * @text ＜リアルタイム＞
 * @desc 1/60秒ごとに演算される項目です。
 * 上級向けの項目が多めです。
 * 
 * @param dx
 * @text 動的Ｘ座標【上級】
 * @parent <Real Time>
 * @type string
 * @desc Ｘ座標のリアルタイム計算位置です。
 * 
 * @param dy
 * @text 動的Ｙ座標【上級】
 * @parent <Real Time>
 * @type string
 * @desc Ｙ座標のリアルタイム計算位置です。
 * 
 * @param addX
 * @text Ｘ座標補正
 * @parent <Real Time>
 * @type string
 * @desc Ｘ座標に加算する値です。
 * 
 * @param addY
 * @text Ｙ座標補正
 * @parent <Real Time>
 * @type string
 * @desc Ｙ座標に加算する値です
 *
 * @param scale
 * @text 拡大率（全体）
 * @parent <Real Time>
 * @type string
 * @desc 全体の拡大率です。1.0が標準となります。
 * 
 * @param scaleX
 * @text 拡大率Ｘ
 * @parent <Real Time>
 * @type string
 * @desc 横幅の拡大率です。1.0が標準となります。
 * 
 * @param scaleY
 * @text 拡大率Ｙ
 * @parent <Real Time>
 * @type string
 * @desc 縦幅の拡大率です。1.0が標準となります。
 * 
 * @param rotation
 * @text 回転率
 * @parent <Real Time>
 * @type string
 * @desc 回転率です
 * Math.PI * 2で一回転します。
 * 
 * @param opacity
 * @text 不透明度
 * @parent <Real Time>
 * @type string
 * @desc 不透明度です。
 * 255で不透明、0で透明です。
 * 
 * @param color
 * @text 色調
 * @parent <Real Time>
 * @type string
 * @desc 色調を変更します。
 * 例：[255, 255, 255, 255] 赤,緑,青,強さの順。
 * 
 * @param z
 * @text Ｚ座標（表示優先度）
 * @parent <Real Time>
 * @type number
 * @decimals 1
 * @desc バトラーのＺ座標（表示優先度）を変更します。
 * 
 * @param scriptRT
 * @text スクリプト（リアルタイム）
 * @parent <Real Time>
 * @type string
 * @desc リアルタイムで指定したスクリプトを実行します。
 * 
 * @param <Real Time Circle>
 * @text ＜リアルタイム円＞
 * @desc リアルタイムの円運動関連の項目です。
 * 
 * @param radiusX
 * @text Ｘ方向の半径
 * @parent <Real Time Circle>
 * @type string
 * @desc Ｘ方向の円運動半径です。
 * 
 * @param radiusY
 * @text Ｙ方向の半径
 * @parent <Real Time Circle>
 * @type string
 * @desc Ｙ方向の円運動半径です。
 * 
 * @param radX
 * @text Ｘ方向の角度
 * @parent <Real Time Circle>
 * @type string
 * @desc Ｘ方向の円運動角度です。
 * ２πが一周期となります。
 * 
 * @param radY
 * @text Ｙ方向の角度
 * @parent <Real Time Circle>
 * @type string
 * @desc Ｙ方向の円運動角度です。
 * ２πが一周期となります。
 * 
 * @param <Map Only>
 * @text ＜マップ専用＞
 * @desc マップ専用のパラメータです。
 * 
 * @param gridEx
 * @text 終点グリッドＸ座標
 * @parent <Map Only>
 * @type string
 * @desc 終点のＸ座標（グリッド単位）です。
 * これを入力すれば始点から終点へキャラが移動します。
 * 
 * @param gridEy
 * @text 終点グリッドＹ座標
 * @parent <Map Only>
 * @type string
 * @desc 終点のＹ座標（グリッド単位）です。
 * これを入力すれば始点から終点へキャラが移動します。
 * 
 * @param direction
 * @text 向き（リアルタイム）
 * @parent <Map Only>
 * @type select
 * @option 2:下 @value 2
 * @option 4:左 @value 4
 * @option 6:右 @value 6
 * @option 8:上 @value 8
 * @option 対象を向く @value a.turnTowardDirection(b)
 * @option 対象の反対 @value a.turnAwayDirection(b)
 * @desc キャラクターの向きを指定します。
 * 数値の他、up, down, left, rightでも指定可能です。
 * 
 * @param pattern
 * @text パターン（リアルタイム）
 * @parent <Map Only>
 * @type select
 * @option 0:左 @value 0
 * @option 1:中央 @value 1
 * @option 2:右 @value 2
 * @desc キャラクターのパターン（足踏み）を指定します。
 */

// 連携用に値を保持
var Nrp = Nrp || {};

/**
 * ●モーションの基本パラメータと機能を持つクラス
 * <D-Motion>タグそのものに対応する。
 */
function BaseMotion() {
    this.initialize(...arguments);
}

/**
 * ●モーションの動的パラメータを持つクラス
 * こちらは繰り返しごとに保有する。
 */
function DynamicMotion() {
    this.initialize(...arguments);
}

(function() {
"use strict";

// NRP_DynamicAnimationMZがなければ処理しない。
const existNRP_DynamicAnimationMZ = PluginManager._scripts.some(function(scriptName) {
    return scriptName == "NRP_DynamicAnimationMZ";
});
if (!existNRP_DynamicAnimationMZ) {
    return;
}

function toBoolean(str) {
    if (str == true) {
        return true;
    }
    return (str == "true") ? true : false;
}
function toNumber(str, def) {
    return isNaN(str) ? def : +(str || def);
}
/**
 * ●構造体（二重配列）をJSで扱えるように変換
 */
function parseStruct2(arg) {
    var ret = [];

    JSON.parse(arg).forEach(function(str) {
        ret.push(JSON.parse(str));
    });

    return ret;
}

const parameters = PluginManager.parameters("NRP_DynamicMotionMZ");
const pTemplateList = parseStruct2(parameters["templateList"]);
const pMapTemplateList = parseStruct2(parameters["mapTemplateList"]);

var pSetStartMotion = parameters["setStartMotion"];
var pSetStepForward = parameters["setStepForward"];
var pJumpShadow = toBoolean(parameters["jumpShadow"]);
var pShortTagName = parameters["shortTagName"];
var pShortSettingTagName = parameters["shortSettingTagName"];
var pDefaultDuration = toNumber(parameters["defaultDuration"], 12);
var pDefaultEnemyMotionDuration = toNumber(parameters["defaultEnemyMotionDuration"], 12);
var pImmortalState = toNumber(parameters["immortalState"]);
var pUsePriority = toBoolean(parameters["usePriority"], true);
var pBattlerZ = toNumber(parameters["battlerZ"], 3);
var pOpponentSideZ = toNumber(parameters["opponentSideZ"]);

const TAG_NAME = "D-Motion";
const SETTING_TAG_NAME = "D-Setting";

// 連携用に保持
Nrp.shortMotionTagName = pShortTagName;
Nrp.shortSettingTagName = pShortSettingTagName;

/**
 * ●初期化処理
 */
BaseMotion.prototype.initialize = function (animationId) {
    this.type = "motion";

    // Dataを保有するリスト
    this.list = [];

    this.exRandom = 0;
    this.eyRandom = 0;

    this.id = animationId;
    this.delay = 0;
    this.repeat = 1;
    this.wait = 0;

    this.totalDuration = 0;
    this.baseDuration = 0;
    this.contentMode = false;
};

/**
 * ●テンプレート内容を元にアニメーションの基本パラメータを設定する。
 */
BaseMotion.prototype.readNote = function (noteSplit, no) {
    var noteLine = noteSplit[no];
    var templatesStr;

    // 省略タグを考慮
    var tagNameSet = "(?:" + TAG_NAME + ")";
    if (pShortTagName) {
        tagNameSet = "(?:" + TAG_NAME + "|" + pShortTagName + ")";
    }

    // 単独タグ
    if (noteLine.match("<" + tagNameSet + "\\s*/>")) {
        return true;

    // 単独タグ（テンプレート指定）
    } else if (noteLine.match("<" + tagNameSet + "\\s*:(.*)/>")) {
        // テンプレート名を取得
        templatesStr = noteLine.match("<" + tagNameSet + "\\s*:(.*)/>");
        // テンプレート呼出
        this.callTemplate(templatesStr[1].trim());
        // 全体配列に追加
        return true;

    // 開始タグ
    } else if (noteLine.match("<" + tagNameSet + ">")) {
        // 内容モード開始
        this.contentMode = true;

    // 開始タグ（テンプレート指定）
    } else if (noteLine.match("<" + tagNameSet + "\\s*:(.*)>")) {
        // テンプレート名を取得
        templatesStr = noteLine.match("<" + tagNameSet + "\\s*:(.*)>");
        // テンプレート呼出
        this.callTemplate(templatesStr[1].trim());
        // 内容モード開始
        this.contentMode = true;

    // 終了タグ（または内容モードかつ最終行）
    } else if (noteLine.match("</\\s*" + tagNameSet + ">")
            || (this.contentMode && no == noteSplit.length - 1)) {
        // 内容モードを終了し、全体配列に追加
        this.contentMode = false;
        // 全体配列に追加
        return true;

    // 内容モード時
    } else if (this.contentMode) {
        // 行内容を追加
        this.setContent(noteLine);
    }

    return false;
};

/**
 * ●プラグインパラメータのテンプレートを呼び出す
 */
BaseMotion.prototype.callTemplate = function (templateStr) {
    // &で分割
    const tempSplit = templateStr.split("&");

    // 前から順番に読み込む
    for (let key of tempSplit) {
        let template;
        // 空白除去
        key = key.trim();

        // マップ上の場合
        if (!$gameParty.inBattle()) {
            // マップ用テンプレートを優先検索
            for (const t of pMapTemplateList) {
                // ＩＤまたは名前と一致するテンプレートを取得
                if (t.templateId == key || t.name == key) {
                    template = t;
                    break;
                }
            }

            // 見つかった場合は次へ
            if (template) {
                // 取得したテンプレートを設定
                this.setTemplate(template);
                continue;
            }
        }

        // ＩＤまたは名前と一致するテンプレートを取得
        for (const t of pTemplateList) {
            if (t.templateId == key || t.name == key) {
                template = t;
                break;
            }
        }
    
        // テンプレートが見つからなければそのまま。
        if (!template) {
            return;
        }
    
        // 取得したテンプレートを設定
        this.setTemplate(template);
    }
};

/**
 * ●テンプレート内容を元にアニメーションの基本パラメータを設定する。
 */
BaseMotion.prototype.setTemplate = function (template) {
    // プロパティをコピー
    Object.keys(template).forEach(function(key) {
        // 値が存在する場合に設定
        if (template[key] != undefined && template[key] != null && template[key] != "") {
            this[key] = template[key];
        }
    }, this);
};

/**
 * ●タグの行内容を元にアニメーションの基本パラメータを設定する。
 */
BaseMotion.prototype.setContent = function (valueLine) {
    var index;
    var paramType;
    var paramValue;

    // パラメータを取得（+=時）
    index = valueLine.indexOf("+=");
    if (index >= 0) {
        paramType = valueLine.slice(0, index).trim();
        // =以降をevalする。
        paramValue = valueLine.slice(index + 2).trim();
        // プロパティに文字列連結する。
        this[paramType] = this[paramType] + " + " + paramValue;
        return;
    }

    // パラメータを取得（-=時）
    index = valueLine.indexOf("-=");
    if (index >= 0) {
        paramType = valueLine.slice(0, index).trim();
        // =以降をevalする。
        paramValue = valueLine.slice(index + 2).trim();
        // プロパティに文字列連結する。
        this[paramType] = this[paramType] + " - " + paramValue;
        return;
    }

    // パラメータを取得（*=時）
    index = valueLine.indexOf("*=");
    if (index >= 0) {
        paramType = valueLine.slice(0, index).trim();
        // =以降をevalする。
        paramValue = valueLine.slice(index + 2).trim();
        // プロパティに文字列連結する。
        this[paramType] = this[paramType] + " * " + paramValue;
        return;
    }

    // パラメータを取得（/=時）
    index = valueLine.indexOf("/=");
    if (index >= 0) {
        paramType = valueLine.slice(0, index).trim();
        // =以降をevalする。
        paramValue = valueLine.slice(index + 2).trim();
        // プロパティに文字列連結する。
        this[paramType] = this[paramType] + " / " + paramValue;
        return;
    }

    // パラメータを取得（=時）
    index = valueLine.indexOf("=");
    if (index >= 0) {
        paramType = valueLine.slice(0, index).trim();
        // =以降をevalする。
        paramValue = valueLine.slice(index + 1).trim();
        // プロパティに設定する。
        this[paramType] = paramValue;
    }
};

/**
 * ●基本項目の計算を行う。（処理前）
 */
BaseMotion.prototype.calcBasicBefore = function (targets) {
    // eval参照用
    var a = this.getReferenceSubject();
    var b = getReferenceBattler(targets[0]);

    var no = this.no;
    var dataA = this.dataA;
    var dataM = this.dataM;

    var delay = this.evalTimingStr(this.delay);
    this.delay = delay;

    // "auto"ならば前回フレーム数とウェイト合計の大きいほうを取得
    if (delay == "auto") {
        this.calcDelay = Math.max(this.lastFrame, this.allWait);

    // それ以外はディレイ＋ウェイト合計
    } else {
        // 数値が文字列として渡るパターンがあるので確実に数値変換
        this.calcDelay = Number(delay) + this.allWait;
    }

    // リピート回数
    var repeat = this.repeat;
    this.repeat = eval(repeat);

    // 対象の変更処理
    // SpriteでもBattlerでも受け付ける。
    if (this.performer) {
        var changePerformer = eval(this.performer);
        // 配列でなければ配列変換
        if (!Array.isArray(changePerformer)) {
            changePerformer = [changePerformer];
        }

        this.performers = [];
        changePerformer.forEach(function(t) {
            // Spriteの場合
            if (t.spriteId != undefined) {
                if ($gameParty.inBattle()) {
                    this.performers.push(t._battler);
                } else {
                    this.performers.push(t._character);
                }

            // Battlerの場合
            } else {
                this.performers.push(t);
            }
        }, this);

    // 通常は行動主体を設定する。
    } else {
        this.performers = [this.getSubject()];
    }

    // 対象
    this.targets = targets;
};

/**
 * ●基本項目の計算を行う。（処理後）
 */
BaseMotion.prototype.calcBasicAfter = function () {
    var wait = this.evalTimingStr(this.wait);
    this.wait = wait;

    // "autoMove"ならば移動終了フレーム数を取得
    if (wait == "autoMove") {
        // 直近のモーションデータを取得
        var bm = this.dataM[this.dataM.length - 1];
        var dm = bm.list[bm.list.length - 1];

        var dif = 0;
        if (dm) {
            dif = nvl(dm.motionDurationTotal) - nvl(dm.duration);
        }
        // 移動よりもモーション時間のほうが長い場合
        if (dif > 0) {
            this.calcWait = this.frame - this.allWait - dif / bm.basicRate;
        } else {
            this.calcWait = this.frame - this.allWait;
        }

    // "auto"ならば移動とモーションの終了フレーム数を取得
    } else if (wait == "auto") {
        this.calcWait = this.frame - this.allWait;
    // 通常時
    } else {
        this.calcWait = Number(wait);
    }

    // ここで最初のDynamicMotionにbaseDurationを設定
    // 先頭のモーションのみ最大時間を設定
    if (this.list.length) {
        // 先頭要素に設定したウェイトを指定
        const dynamicMotion = this.list[0];

        // "auto"ならば終了フレーム数を取得
        if (wait == "auto" || wait == "autoMove") {
            dynamicMotion.waitDuration = this.baseDuration;
        // ウェイト指定時
        } else {
            dynamicMotion.waitDuration = this.calcWait * this.basicRate;
        }
    }
};

/**
 * ●画像を事前読込する。
 */
BaseMotion.prototype.loadImage = function () {
    // マップ版と統合するためbattlerImage -> imageに変更
    // ただし旧設定があるならそちらを使用する。
    if (this.battlerImage) {
        this.image = this.battlerImage;
    }

    if (this.image != undefined) {
        // eval参照用
        var a = this.getReferenceSubject();

        try {
            // 数式として取得できる場合
            this.image = eval(this.image);
        } catch (e) {
            // 文字列の場合はそのまま
        }

        if (this.image) {
            // 戦闘画面（バトラー）
            if ($gameParty.inBattle()) {
                if (this.performers[0].isActor()) {
                    ImageManager.loadSvActor(this.image);
                } else {
                    if ($gameSystem.isSideView()) {
                        ImageManager.loadSvEnemy(this.image);
                    } else {
                        ImageManager.loadEnemy(this.image);
                    }
                }
            // マップ画面（キャラクター）
            } else {
                ImageManager.loadCharacter(this.image);
            }
        }
    }
};

/**
 * ●ウェイト、ディレイについて有効な文字列を取得する。
 * ※数式として取得できない場合は、そのまま文字列取得
 */
BaseMotion.prototype.evalTimingStr = function (arg) {
    var retValue;

    // eval参照用
    const no = this.no;
    const dataA = this.dataA;
    const dataM = this.dataM;
    const delay = this.delay;
    const frame = this.originalFrame;
    const arrival = this.arrival;
    const interval = this.interval;
    const repeat = this.repeat;

    var isSync = false;
    // Syncの設定を読込（eval内で使用される）
    if (this.action.existDynamicSetting("Sync")) {
        isSync = true;
    }

    try {
        // 数式として取得できる場合
        retValue = eval(arg);
    } catch (e) {
        // 数式でない場合はエラーとなるが、普通に文字列で取得
        retValue = arg;
        // 注釈や空白は不要なので除去
        retValue = retValue.split("//")[0];
        retValue = retValue.trim();
    }

    return retValue;
};

/**
 * ●モーションの生成開始
 * ※NRP_DynamicAnimation.jsより呼び出し
 */
BaseMotion.prototype.makeMotion = function (dataM, dataA, dynamicMotionList) {
    // アクター位置の自動設定を禁止
    BattleManager._noUpdateTargetPosition = true;

    // eval参照用
    var a = this.getReferenceSubject();

    let targets = this.targets;
    // 対象がいなければとりあえず行動主体を設定
    // ※範囲なしの場合を想定
    if (targets.length === 0) {
        targets = [this.getSubject()];
    }

    var b = getReferenceBattler(targets[0]);

    // アニメーションとモーションで別のため、番号を取得する。
    var no = dataM.length;
    this.no = no;
    // アニメーション情報への参照を作成。
    this.dataA = dataA;
    // 親要素への参照を作成。
    this.dataM = dataM;
    // 計算ウェイトの初期値
    this.calcWait = 0;
    // 数値として間隔を計算できる場合はあらかじめしておく
    this.interval = evalNumber(this.interval);

    // 基本項目の事前計算
    this.calcBasicBefore(targets);

    // 画像の事前読込
    this.loadImage();

    // Sprite_Animationから基本レートを取得
    var spriteAnimation = getSpriteAnimation();
    spriteAnimation.setupRate();
    var basicRate = spriteAnimation._rate;
    this.basicRate = basicRate;

    // 設定したdelayの分だけ遅らせる。（rateをかけた値）
    this.delaySum = this.animationBaseDelay + this.calcDelay * basicRate;

    // リピート回数だけ実行（r = 現在のリピート回数）
    for (var r = 0; r < this.repeat; r++) {
        // リピートごとの動的アニメーション生成
        this.makeRepeatMotion(dynamicMotionList, r);
    }

    // 合計フレーム数をセットし、基本レートで割る。
    // delaySum : これまでのディレイ
    // animationBaseDelay分は除く
    this.originalFrame = this.frame;
    this.frame = (this.delaySum - this.animationBaseDelay) / basicRate;

    // データ一覧に追加
    dataM.push(this);

    // 基本項目の事後計算
    this.calcBasicAfter();
};

/**
 * ●数値をeval計算する。
 */
function evalNumber(val) {
    let tmpInterval;
    // 数値として間隔を計算できる場合はあらかじめしておく
    try {
        tmpInterval = eval(val);
    } catch (e) {
        // この時点で計算できない場合はそのまま
    }
    if (Number.isFinite(tmpInterval)) {
        return tmpInterval;
    }
    // 変換できなければそのまま返す
    return val;
}

/**
 * ●繰り返しモーションの生成
 */
BaseMotion.prototype.makeRepeatMotion = function (dynamicMotionList, r) {
    // eval用に定義
    var no = this.no;
    var dataM = this.dataM;
    var dataA = this.dataA;
    var repeat = this.repeat;

    // 【MZ対応】
    var spriteAnimation = getSpriteAnimation();
    // アニメーションに設定されているrateを取得
    // ※フレームレート変更系プラグインを考慮
    var animation = $dataAnimations[this.id];
    spriteAnimation._animation = animation;
    spriteAnimation.setupRate();
    var rate = spriteAnimation._rate;
    // 設定レートがあればそちらを参照
    if (this.rate) {
        rate = eval(this.rate);
        spriteAnimation._rate = rate;
    }
    this.rate = rate;

    // アニメーション位置の設定
    var position;
    // ポジション指定があれば使用
    if (this.position != undefined) {
        position = eval(this.position);
    // 表示タイプが『1:全対象の中央』『2:画面の中央』なら3:画面
    } else if (animation && (animation.displayType == 1 || animation.displayType == 2)) {
        position = 3;
    // 下揃え（MZ v1.1.0より追加）ならば下
    } else if (animation && animation.alignBottom) {
        position = 2;
    // それ以外は1:中央
    } else if (position == undefined) {
        position = 1;
    }
    
    this.position = position;
    if (animation) {
        this.displayType = animation.displayType;
    }

    // 設定された対象を取得
    var performers = this.performers;

    // 対象毎にモーションを繰り返すフラグ
    var isEvery = eval(this.every);

    // 間隔×レート分のディレイを加算
    if (r > 0) {
        this.delaySum += this.list[r - 1].interval * rate;
    }

    var delay = this.delaySum;
    // 対象ごとのディレイ値
    var targetDelay = delay;
    // この<D-Motion>内での集計用ディレイ
    let baseDelaySum = 0;

    var dynamicMotion;

    // 対象リストから重複除去
    const distinctTargets = this.targets.filter(function(target, i) {
        return this.indexOf(target) == i;
    }, this.targets);

    // モーション対象毎に繰り返し
    performers.forEach(function (performer, performerIndex) {
        // 対象毎にモーション繰り返し
        if (isEvery) {
            this.targets.forEach(function (target, index) {
                // Sprite_Battlerへと引き渡すパラメータを作成
                dynamicMotion = this.createDynamicMotion(performer, target, r, targetDelay);
                dynamicMotion.performerNo = performerIndex;
                dynamicMotion.targetNo = index;

                // 条件を満たさなかった場合は処理不要
                if (dynamicMotion.isNoMatchCondition) {
                    return;
                }

                // 対象のスプライトを設定
                dynamicMotion.targetsSprite = distinctTargets.map(function(battler){
                    return getBattlerSprite(battler);
                });

                // 参照用に保持しておく
                this.list.push(dynamicMotion);
                // モーション実行リストに追加
                dynamicMotionList.push(dynamicMotion);

                // 対象が複数いる場合の時間差
                // ※最後の一回は除外
                if (this.targets.length - 1 > index) {
                    // 対象毎の時間差
                    var nextDelay = this.animationNextDelay;
                    // nextDelayが設定されている場合
                    if (this.nextDelay) {
                        // autoの場合はモーションの長さを自動取得
                        if (this.nextDelay.startsWith("auto")) {
                            nextDelay = this.maxDuration;
                        } else {
                            // アニメーションフレーム単位なので補正する。
                            nextDelay = eval(this.nextDelay) * rate;
                        }
                    }
                    targetDelay += nextDelay;
                    baseDelaySum += nextDelay;
                }
            }, this);

        // その他
        } else {
            // Sprite_Battlerへと引き渡すパラメータを作成
            dynamicMotion = this.createDynamicMotion(performer, this.targets[0], r, targetDelay);
            dynamicMotion.performerNo = performerIndex;

            // 条件を満たさなかった場合は処理不要
            if (dynamicMotion.isNoMatchCondition) {
                return;
            }

            // 対象のスプライトを設定
            dynamicMotion.targetsSprite = distinctTargets.map(function(battler){
                return getBattlerSprite(battler);
            });

            // 参照用に保持しておく
            this.list.push(dynamicMotion);
            // モーション実行リストに追加
            dynamicMotionList.push(dynamicMotion);
        }

        // 対象ごとのディレイ値（performerごとに値を加算）
        let performerDelay = 0;
        if (this.performerDelay) {
            // アニメーションフレーム単位なので補正する。
            performerDelay = eval(this.performerDelay)  * rate;
        }
        targetDelay += performerDelay;
        baseDelaySum += performerDelay;

    }, this);

    // 実行時間の最大長を求める。（スキル開始からの総合計）
    this.totalDuration = Math.max(this.totalDuration, targetDelay + dynamicMotion.maxDuration);
    // この<D-Motion>内の実行時間
    this.baseDuration = Math.max(this.baseDuration, baseDelaySum + dynamicMotion.maxDuration);
    
    // 最後の１回ならモーション時間を保持
    if (r == this.repeat - 1) {
        this.delaySum = this.totalDuration;
    }
};

/**
 * ●動的モーションデータを生成する。
 */
BaseMotion.prototype.createDynamicMotion = function (performer, target, r, delay) {
    var dynamicMotion = new DynamicMotion(this, performer, target, r);
    dynamicMotion.targetDelay = delay;

    return dynamicMotion;
};

/**
 * ●標準画面Ｘ座標取得
 */
BaseMotion.prototype.getScreenX = function (b) {
    var screenX;

    // マップ上では画面中央
    if (!$gameParty.inBattle()) {
        screenX = Graphics.boxWidth / 2;

    // アクターが対象の場合、左右位置反転
    } else if (b && b.isActor()) {
        screenX = Graphics.boxWidth - this.defaultScreenX;
        // 位置調整
        if (this.mirrorAdjustX) {
            screenX += eval(this.mirrorAdjustX);
        }
    } else {
        screenX = this.defaultScreenX;
    }

    return screenX;
};

/**
 * ●標準画面Ｙ座標取得
 */
BaseMotion.prototype.getScreenY = function (b) {
    var screenY = this.defaultScreenY;
    
    // マップ上では画面中央
    if (!$gameParty.inBattle()) {
        screenY = Graphics.boxHeight / 2;

    // アクターが対象の場合、位置調整
    } else if (b && b.isActor() && this.mirrorAdjustY) {
        // 位置調整
        if (this.mirrorAdjustY) {
            screenY += eval(this.mirrorAdjustY);
        }
    }

    return screenY;
};

/**
 * ●非ループモーションのカウント数
 */
BaseMotion.prototype.motionPatternCount = function () {
    return 3;
};

/**
 * ●durationが必要かどうか？
 * ※移動に類する処理を行うかで判定
 */
BaseMotion.prototype.isUseDuration = function () {
    if (this.ex != undefined || this.ey != undefined
        || this.airY != undefined || this.arcX != undefined || this.arcY != undefined
        || this.addX != undefined || this.addY != undefined
        || this.dx != undefined || this.dy != undefined
        || this.opacity != undefined || this.rotation != undefined
        || this.scale != undefined || this.scaleX != undefined || this.scaleY != undefined
        || this.scriptRT != undefined
        || this.radiusX != undefined || this.radiusY != undefined
        || this.radX != undefined || this.radY != undefined
        || this.gridEx != undefined || this.gridEy != undefined
        || this.gx != undefined || this.gy != undefined
        || this.direction != undefined || this.pattern != undefined
    ) {
        return true;
    }

    return false;
};

/**
 * ●モーション時間を求める。
 */
BaseMotion.prototype.getDefaultMotionDuration = function (a, motion) {
    var motionDuration;

    // SVモーションが有効な場合（アクターを想定）
    if (a && a.hasSvMotion()) {
        // 一時的にモーションを変更し、標準のモーション速度を取得する。
        let tmp = a._motion;
        // attackの場合は本来のモーションを取得
        if (motion == "attack") {
            var weapons = a._battler.weapons();
            var wtypeId = weapons[0] ? weapons[0].wtypeId : 0;
            var attackMotion = $dataSystem.attackMotions[wtypeId];
            if (attackMotion) {
                if (attackMotion.type === 0) {
                    a._motion = Sprite_Actor.MOTIONS["thrust"];
                } else if (attackMotion.type === 1) {
                    a._motion = Sprite_Actor.MOTIONS["swing"];
                } else if (attackMotion.type === 2) {
                    a._motion = Sprite_Actor.MOTIONS["missile"];
                }
            }
        } else {
            a._motion = this.motion;
        }
        motionDuration = a.motionSpeed();
        a._motion = tmp; // モーションを戻す

    // それ以外（エネミーを想定）
    // またはフロントビューで無理やりアクターのモーションを指定した場合
    } else {
        // 初期値を設定
        motionDuration = pDefaultEnemyMotionDuration;
    }

    return motionDuration;
};

/**
 * ●戦闘中とマップ中のそれぞれ向けに行動主体を取得する。
 */
BaseMotion.prototype.getSubject = function () {
    // マップ中
    if (this.mapAnimation) {
        return this.mapAnimation.subject;
    }
    // 戦闘中
    return BattleManager._subject;
};

/**
 * ●参照用行動主体を取得する。
 */
BaseMotion.prototype.getReferenceSubject = function () {
    return getReferenceBattler(this.getSubject());
};

/**
 * ●初期化処理
 */
DynamicMotion.prototype.initialize = function (baseMotion, performer, target, r) {
    // eval参照用
    var a = getReferenceBattler(performer);
    var spriteA = getBattlerSprite(performer);
    // モーションの対象ではなく、スキルの対象を取得
    var b = getReferenceBattler(target);
    var bm = baseMotion;
    var dm = this;
    // 常にスキルの使用者を参照（condition用）
    const subject = bm.getReferenceSubject();

    var no = baseMotion.no;
    this.no = no;

    // 親情報への参照設定
    this.baseMotion = baseMotion;
    var dataA = baseMotion.dataA;
    this.dataA = dataA;
    var dataM = baseMotion.dataM;
    this.dataM = dataM;

    this.referenceSubject = a;
    this.performer = performer;
    this.referenceTarget = b;
    var list = baseMotion.list;

    this.target = target;

    // 基本項目
    var delay = baseMotion.delay;
    this.delay = delay;
    var repeat = baseMotion.repeat;
    this.repeat = repeat;
    this.r = r;

    /*
     * 以下はリピートごとに変化する項目
     */

    // 条件が存在し、かつ満たさなければ次のループへ
    var condition = baseMotion.condition;
    if (condition && !eval(condition)) {
        // 表示しない
        this.maxDuration = 0;
        this.isNoMatchCondition = true;
        return;
    }

    // ダメージ処理
    this.damage = toBoolean(eval(baseMotion.damage));
    this.damageAll = toBoolean(eval(baseMotion.damageAll));
    this.targets = baseMotion.targets;

    var position = baseMotion.position;
    this.position = position;
    this.displayType = baseMotion.displayType;

    // 影の表示
    this.noShadow = eval(baseMotion.noShadow);

    // 判定設定の取得（スキルの対象者が基準）
    var mirroring = getMirroring(target);
    this.mirroring = mirroring;

    /*
     * このタイミングでevalしておく。
     */
    // 左右反転
    this.mirror = eval(baseMotion.mirror);

    // 標準ターゲット座標取得
    var screenX = baseMotion.getScreenX(b);
    var screenY = baseMotion.getScreenY(b);
    this.screenX = screenX;
    this.screenY = screenY;

    // 所要時間
    // フレーム指定
    if (baseMotion.frame != undefined) {
        this.duration = eval(baseMotion.frame) * baseMotion.rate;
    // 1/60指定
    } else if (baseMotion.duration != undefined) {
        this.duration = eval(baseMotion.duration);
    // 既定値
    } else if (baseMotion.isUseDuration()) {
        this.duration = pDefaultDuration;
    }

    // モーション
    if (baseMotion.motion != undefined) {
        let tmpMotion = baseMotion.motion;
        // 注釈や空白は不要なので除去
        tmpMotion = tmpMotion.split("//")[0];
        tmpMotion = tmpMotion.trim();

        // escapeのみ関数名と競合している模様なので固定コーディング
        if (tmpMotion == "escape") {
            this.motion = "escape";
        } else {
            try {
                // 数式として取得できる場合
                this.motion = eval(tmpMotion);
            } catch (e) {
                // 数式でない場合はエラーとなるが、普通に文字列で取得
                this.motion = tmpMotion;
            }
        }

        // モーション所要時間
        // フレーム指定
        if (baseMotion.motionFrame != undefined) {
            this.motionDuration = eval(baseMotion.motionFrame) * baseMotion.rate;
        // 1/60指定
        } else if (baseMotion.motionDuration != undefined) {
            this.motionDuration = eval(baseMotion.motionDuration);
        // 指定なしの場合
        } else {
            // 初期値を取得
            this.motionDuration = baseMotion.getDefaultMotionDuration(spriteA, this.motion);
        }
    }

    /*
     * モーション時間を取得
     */
    this.maxDuration = nvl(this.duration);
    // モーションの指定があり、かつループモーション以外の場合
    if (this.motion
            && (this.motion == "attack"
                || (Sprite_Actor.MOTIONS[this.motion] && !Sprite_Actor.MOTIONS[this.motion].loop))) {
        // 合計モーション時間を計算
        // ※モーション時間は３パターンを想定し、*3して計算
        this.motionDurationTotal = nvl(this.motionDuration) * baseMotion.motionPatternCount();
        // 移動よりモーション時間が長い場合はそちらの時間まで確保
        this.maxDuration = Math.max(this.maxDuration, this.motionDurationTotal);
    }

    // 間隔を設定
    if (baseMotion.interval != undefined) {
        this.interval = eval(baseMotion.interval);
    // 間隔が未設定ならば、モーションの長さを設定
    } else {
        this.interval = this.maxDuration / baseMotion.rate;
    }

    // 以下の項目はそのまま数式として渡す
    this.ex = baseMotion.ex;
    this.ey = baseMotion.ey;
    this.airY = baseMotion.airY;
    this.z = baseMotion.z;
    this.playSe = baseMotion.playSe;
    this.commonEvent = baseMotion.commonEvent;
    this.script = baseMotion.script;
    this.plugin = baseMotion.plugin;
    this.scriptRT = baseMotion.scriptRT;
    this.motionPattern = baseMotion.motionPattern;
    this.motionStartPattern = baseMotion.motionStartPattern;
    this.weaponId = baseMotion.weaponId;
    this.weaponType = baseMotion.weaponType;
    this.arcX = baseMotion.arcX;
    this.arcY = baseMotion.arcY;
    this.addX = baseMotion.addX;
    this.addY = baseMotion.addY;
    this.dx = baseMotion.dx;
    this.dy = baseMotion.dy;
    this.opacity = baseMotion.opacity;
    this.rotation = baseMotion.rotation;
    this.scale = baseMotion.scale;
    this.scaleX = baseMotion.scaleX;
    this.scaleY = baseMotion.scaleY;
    this.color = baseMotion.color;
    this.noReturn = baseMotion.noReturn;
    this.image = baseMotion.image;
    this.imageIndex = baseMotion.imageIndex;
    // リアルタイム円
    this.radiusX = baseMotion.radiusX;
    this.radiusY = baseMotion.radiusY;
    this.radX = baseMotion.radX;
    this.radY = baseMotion.radY;

    // NRP_DynamicAnimationMap用の情報
    const mapAnimation = baseMotion.mapAnimation;
    if (mapAnimation) {
        this.interpreter = mapAnimation.interpreter; // Game_Interpreter
        this.noWait = mapAnimation.noWait; // ウェイトなし
        this.onScroll = mapAnimation.onScroll; // スクロール連動
        this.isDynamicAuto = mapAnimation.isDynamicAuto; // 注釈からの自動起動
        this.isParallel = mapAnimation.isParallel; // 並列処理から起動
        this.gridEx = baseMotion.gridEx; // グリッドＸ座標
        this.gridEy = baseMotion.gridEy; // グリッドＹ座標
        // 省略形のgx, gy
        if (baseMotion.gx) {
            this.gridEx = baseMotion.gx;
        }
        if (baseMotion.gy) {
            this.gridEy = baseMotion.gy;
        }
        this.direction = baseMotion.direction; // 向き
        this.pattern = baseMotion.pattern; // パターン
    }
}

/**
 * ●nullなら0変換
 */
function nvl(val) {
    if (!val) {
        return 0;
    }
    return val;
}

/**
 * ●標準ターゲットＸ座標取得
 */
DynamicMotion.prototype.getDefaultX = function (b, screenX) {
    var defaultX;

    // 1:全対象の中央
    if (this.displayType == 1) {
        defaultX = 0;
        for (const target of this.targetsSprite) {
            defaultX += target.x;
        }
        defaultX /= this.targetsSprite.length;
        return defaultX;
    }

    // 画面の場合は画面標準座標
    if (this.position === 3) {
        defaultX = screenX;

    // それ以外は対象のＸ座標
    } else if (b) {
        defaultX = b.x;
    }

    return defaultX;
};

/**
 * ●標準ターゲットＹ座標取得
 */
DynamicMotion.prototype.getDefaultY = function (a, b, screenY) {
    // 対象なし
    if (this.position <= 2 && b == undefined) {
        return undefined;
    }

    var defaultY;

    // 1:全対象の中央
    if (this.displayType == 1) {
        defaultY = 0;
        for (const target of this.targetsSprite) {
            defaultY += (target.y - target.height / 2);
        }
        defaultY /= this.targetsSprite.length;
        return defaultY;
    }

    // 頭上
    if (this.position === 0) {
        defaultY = b.y - b.height - a.height/2;
    // 中心
    } else if (this.position === 1) {
        defaultY = b.y - b.height / 2;
    // 足元
    } else if (this.position === 2) {
        defaultY = b.y - a.height/2;
    // 画面の場合は画面標準座標
    } else if (this.position === 3) {
        defaultY = screenY
    }

    return defaultY;
};

/**
 * ●Game_Battlerの初期化
 */
var _Game_Battler_initMembers = Game_Battler.prototype.initMembers;
Game_Battler.prototype.initMembers = function() {
    // 元処理実行
    _Game_Battler_initMembers.call(this);

    // モーション情報の追加
    this._motions = [];
};

/**
 * ●戦闘終了時
 */
var _Game_Actor_onBattleEnd = Game_Actor.prototype.onBattleEnd;
Game_Actor.prototype.onBattleEnd = function() {
    _Game_Actor_onBattleEnd.apply(this, arguments);

    // 不要変数の初期化
    // ※マップ版では消化されず残ってしまうため
    this._motions = [];
    this._tempBattlerImage = undefined;
};

/**
 * 【独自定義】動的モーションをバトラーからクリアする。
 */
Game_Battler.prototype.clearDynamicMotions = function() {
    this._motions = [];
};

/**
 * 【独自定義】動的モーションがリクエストされているか？
 */
Game_Battler.prototype.isDynamicMotionRequested = function() {
    return this._motions && this._motions.length > 0;
};

/**
 * ●モーション情報取得
 */
Sprite_Battler.prototype.motions = function() {
    const battler = this._battler;
    // バトラーが取得できなければ空の配列
    if (!battler) {
        return [];
    }
    return battler._motions;
};

/**
 * 【独自定義】動的モーションを取得する。
 */
Game_Battler.prototype.shiftDynamicMotion = function() {
    return this._motions.shift();
};

/**
 * 【独自】動的モーションをセットする。
 * NRP_DynamicAnimation.js側から呼び出し。
 */
Game_Battler.prototype.setDynamicMotion = function(dynamicMotion) {
    var data = {
        delay: dynamicMotion.targetDelay,
        dynamicMotion: dynamicMotion
    };

    // モーション情報が未定義なら初期化
    if (!this._motions) {
        this.clearDynamicMotions();
    }
    this._motions.push(data);
};

/**
 * ●更新
 * ※毎フレーム実行される処理
 */
var _Sprite_Battler_update = Sprite_Battler.prototype.update;
Sprite_Battler.prototype.update = function() {
    // 元処理実行
    _Sprite_Battler_update.call(this);

    if (this._battler) {
        // 動的モーションの更新
        this.updateDynamicMotion();
    }
};

/**
 * 【独自定義】動的モーションの実行
 */
Sprite_Battler.prototype.updateDynamicMotion = function() {
    // モーション実行中ならば、時間カウント-1
    if (this.isMotionPlaying()) {
        this._dynamicMotionDuration--;
    }
    
    // DynamicAnimationと同タイミングで実行するため、準備完了まで待つ。
    if (!BattleManager._spriteset || !BattleManager._spriteset._isDynamicAnimationReady) {
        return;
    }

    // delayの昇順でソートする。
    if (this._battler.isDynamicMotionRequested()) {
        this.motions().sort(function(a, b) {
            return a.delay - b.delay;
        });
    }

    // 実行モーションの設定があれば処理
    while (this._battler.isDynamicMotionRequested()) {
        // 次に処理されるモーション情報
        const nextMotion = this.motions()[0];

        // 前のアニメーションがウェイト対象の場合
        if (this.isWaitAnimationMotion(nextMotion.dynamicMotion)) {
            // 処理終了（時間も進めない）
            return;
        }

        // まだ時間でない場合は処理しない
        if (nextMotion.delay > 0) {
            // 時間経過へ
            break;
        }

        // 実行条件を満たしたのでshift（先頭を削除＆取得）する。
        var data = this._battler.shiftDynamicMotion();

        var dynamicMotion = data.dynamicMotion;
        // モーション実行時間を設定
        // モーション実行時間が未設定、または新規モーションが現在のモーションより長い
        if (!this._dynamicMotionDuration || dynamicMotion.maxDuration > this._dynamicMotionDuration) {
            this._dynamicMotionDuration = dynamicMotion.maxDuration;
        }
        // 動的モーションを開始する。
        this.startDynamicMotion(dynamicMotion);
    }

    // 時間経過
    for (const motion of this.motions()) {
        motion.delay--;
    }
};

/**
 * 【独自】終了待機中のアニメーションがあれば待つ
 */
Sprite_Battler.prototype.isWaitAnimationMotion = function(dynamicMotion) {
    // 実行中のウェイト対象アクションがあれば番号を取得
    const waitActionNo = BattleManager._spriteset._waitActionNo;
    if (waitActionNo) {
        // 現在実行中のアクションより番号が小さいアクションが実行中ならば終了を待つ
        if (waitActionNo < dynamicMotion.actionNo) {
            return true;
        }
    }
    return false;
}

/**
 * 【独自】動的モーションの呼び出し
 * ※マップ版と共有するためSpriteに定義する。
 */
Sprite.prototype.startDynamicMotion = function(dynamicMotion) {
    var bm = dynamicMotion.baseMotion;
    var dm = dynamicMotion;
    this.dynamicMotion = dm;
    // 実行用のモーション情報
    const motion = this._setDynamicMotion;

    // マップ時になぜかエラーになるパターンがあるので再取得
    // 参照スプライトが変質している？
    if (!$gameParty.inBattle()) {
        dm.referenceSubject = getReferenceBattler(dynamicMotion.performer);
        dm.referenceTarget = getReferenceBattler(dynamicMotion.target);
    }

    // eval参照用
    const a = dm.referenceSubject;
    const subject = bm.getReferenceSubject();
    const b = dm.referenceTarget;
    motion._referenceTarget = b;
    const repeat = dm.repeat;
    const r = dm.r;
    const position = dm.position;
    const screenX = dm.screenX;
    const screenY = dm.screenY;
    motion._screenX = screenX;
    motion._screenY = screenY;
    const defaultX = dm.getDefaultX(b, screenX);
    const defaultY = dm.getDefaultY(a, b, screenY);
    motion._defaultX = defaultX;
    motion._defaultY = defaultY;

    // スクロール判定用
    motion.onScroll = dm.onScroll;

    const performerNo = dm.performerNo;
    const targetNo = dm.targetNo;
    motion._performerNo = performerNo;
    motion._targetNo = targetNo;

    // ミラーリング
    var mirroring = dm.mirroring;
    motion._mirroring = mirroring;

    // 放物線
    if (dm.arcX) {
        motion._arcX = eval(dm.arcX);
    }
    if (dm.arcY) {
        motion._arcY = eval(dm.arcY);
    }

    // 動的座標
    if (dm.dx) {
        motion._evalDx = dm.dx;
    }
    if (dm.dy) {
        motion._evalDy = dm.dy;
    }

    // リアルタイム円（半径）
    if (dm.radiusX) {
        motion._evalRadiusX = dm.radiusX;
    }
    if (dm.radiusY) {
        motion._evalRadiusY = dm.radiusY;
    }

    // リアルタイム円（角度）
    if (dm.radX) {
        motion._evalRadX = dm.radX;
    }
    if (dm.radY) {
        motion._evalRadY = dm.radY;
    }

    // 座標補正
    if (dm.addX) {
        motion._evalAddX = dm.addX;
    }
    if (dm.addY) {
        motion._evalAddY = dm.addY;
    }

    // 大きさ
    if (dm.scale != undefined) {
        motion._evalScale = dm.scale;
    }
    if (dm.scaleX != undefined) {
        motion._evalScaleX = dm.scaleX;
    }
    if (dm.scaleY != undefined) {
        motion._evalScaleY = dm.scaleY;
    }

    // 左右反転
    if (dm.mirror != undefined) {
        motion._mirror = dm.mirror;

        // 解除された場合は戻す
        if (!motion._mirror && this.scale.x < 0) {
            this.scale.x *= -1;
        }
    }

    // Ｚ座標
    if (dm.z != undefined) {
        // this.z = eval(dm.z);
        motion._evalZ = dm.z;
    }

    // 回転率
    if (dm.rotation != undefined) {
        motion._evalRotation = dm.rotation;
    }

    // 不透明度
    if (dm.opacity != undefined) {
        motion._evalOpacity = dm.opacity;
    }

    // 色調変更
    if (dm.color != undefined) {
        motion._evalColor = dm.color;
    }

    // 影非表示
    if (dm.noShadow != undefined) {
        motion._noShadow = dm.noShadow;
    }

    // 効果音
    if (dm.playSe != undefined) {
        // "{"で始まる場合はObject指定
        if (dm.playSe.startsWith("{")) {
            AudioManager.playSe(JSON.parse(dm.playSe))
        // ファイル名指定
        } else {
            AudioManager.playSe({"name":dm.playSe, "volume":90, "pitch":100, "pan":0})
        }
    }

    // コモンイベント
    if (dm.commonEvent != undefined) {
        var commonEventId = eval(dm.commonEvent);
        if (commonEventId) {
            var commonEvent = new Game_CommonEvent(commonEventId);
            // 強制実行フラグを立てる。
            commonEvent._isForceActive = true;
            // コモンイベントリストが未定義なら初期化
            if (this._commonEvents == undefined) {
                this._commonEvents = [];
            }
            // Sprite_Battlerに実行コモンイベントを追加
            // 処理はDynamicAnimation側に記述
            this._commonEvents.push(commonEvent);
            // 初期化
            commonEvent.refresh();
        }
    }

    // スクリプト
    if (dm.script != undefined) {
        eval(dm.script);
    }

    // プラグインコマンド
    if (dm.plugin != undefined) {
        var pluginCommand = dm.plugin;
        // 注釈や空白は不要なので除去
        pluginCommand = pluginCommand.split("//")[0];
        pluginCommand = pluginCommand.trim();

        var evalPluginCommand = [];
        for (let p of pluginCommand.split(" ")) {
            let p2;
            try {
                // 数式として取得できる場合
                p2 = eval(p);
            } catch (e) {
                // 数式でない場合はエラーとなるが、普通に文字列で取得
                p2 = p;
            }
            evalPluginCommand.push(p2);
        }
        callPluginCommand(evalPluginCommand);
    }

    // スクリプト（リアルタイム）
    if (dm.scriptRT != undefined) {
        motion._scriptRT = dm.scriptRT;
    }
    
    // 終点指定
    if (dm.duration != undefined) {
        // 座標補正が残っていれば減算
        if (motion._addX) {
            this.x -= motion._addX;
        }
        if (motion._addY) {
            this.y -= motion._addY;
        }

        /*
         * 始点座標
         * ※パラメータとしては存在しないがeval参照用に設定
         */
        // 現在地を初期値に設定
        var sx = this.x;
        var sy = this.y - this.rollAirY(); // 空中座標は除外

        motion._sx = sx;
        motion._sy = sy;

        // マップ関連項目の設定
        if (bm.mapAnimation) {
            // スクロール調整用の始点
            motion.scrollSx = sx;
            motion.scrollSy = sy;
        }

        var ex = sx;
        var ey = sy;

        // Ｘ座標の指定があれば優先
        if (dm.gridEx != undefined) {
            const gridSx = this._character._x; // 参照用の始点
            const gridEx = eval(dm.gridEx);
            ex += (gridEx - this._character._x) * $gameMap.tileWidth();

        } else if (dm.ex) {
            ex = eval(dm.ex);
        }
        // 終点Ｘ座標ランダム幅を加算
        if (bm.exRandom) {
            const exRandom = eval(bm.exRandom);
            ex = ex - exRandom + Math.random() * (exRandom * 2 + 1);
        }

        // Ｙ座標の指定があれば優先
        if (dm.gridEy != undefined) {
            const gridSy = this._character._y; // 参照用の始点
            const gridEy = eval(dm.gridEy);
            ey += (gridEy - this._character._y) * $gameMap.tileHeight();

        } else if (dm.ey) {
            ey = eval(dm.ey);
        }
        // 終点Ｙ座標ランダム幅を加算
        if (bm.eyRandom) {
            const eyRandom = eval(bm.eyRandom);
            ey = ey - eyRandom + Math.random() * (eyRandom * 2 + 1);
        }

        // 空中Ｙ座標
        var airY = this._airY;
        if (dm.airY != undefined) {
            airY = eval(dm.airY);
        }
        // 目標（終点）とする空中Ｙ座標
        this._targetAirY = airY;

        // 絶対座標へ移動
        this.startMoveDynamic(ex, ey, dm.duration);
    }

    // SVモーションの実行
    this.startDynamicSvMotion(dm);

    // ダメージ処理の実行
    // ※DynamicAnimationで定義された関数
    BattleManager.dynamicDamageControl(dm);

    //--------------------
    // 非リピート項目
    //--------------------
    if (r == 0) {
        // 帰還しないフラグの設定
        if (dm.noReturn) {
            var noReturn = eval(dm.noReturn);
            if (noReturn == true) {
                this._battler._noReturn = true;
            } else if (noReturn == false) {
                this._battler._noReturn = false;
            }
        }

        // 戦闘中
        if ($gameParty.inBattle()) {
            // バトラー画像の変更
            if (dm.image != undefined) {
                if (dm.image) {
                    this._battler._tempBattlerImage = dm.image;
                // 空白ならクリア
                } else {
                    this._battler._tempBattlerImage = undefined;
                }
            }
        // マップ中
        } else {
            // キャラクター画像の変更
            if (dm.image != undefined) {
                if (dm.image) {
                    this._character._characterName = dm.image;
                // 空白ならクリア
                } else {
                    this._character._characterName = undefined;
                }
            }
            // キャラクター画像インデックスの変更
            if (dm.imageIndex != undefined) {
                // マップ上のみ
                if (!$gameParty.inBattle()) {
                    this._character._characterIndex = dm.imageIndex;
                }
            }
        }
    }

    // ウェイト用の設定
    // ※NRP_DynamicAnimationMapMZ用
    if (!dynamicMotion.noWait) {
        const interpreter = dynamicMotion.interpreter;
        // プラグインコマンドから起動した場合
        if (interpreter) {
            // DynamicAnimation&Motionの実行時間を設定
            interpreter.setDynamicDuration(dynamicMotion.waitDuration);
        }
    }
};

/**
 * 【独自】SVキャラクターモーションの実行
 */
Sprite.prototype.startDynamicSvMotion = function(dynamicMotion) {
    const bm = dynamicMotion.baseMotion;
    const dm = dynamicMotion;

    // モーションが取得できなければ終了（アクター専用）
    if (!dm.motion || !this.hasSvMotion()) {
        return;
    }

    // eval参照用
    const a = dm.referenceSubject;
    const subject = bm.getReferenceSubject();
    const b = dm.referenceTarget;
    const repeat = dm.repeat;
    const r = dm.r;

    // モーションリセット
    this._motionCount = 0;
    this._pattern = 0;

    // モーション時間
    this._motionDuration = dm.motionDuration;
    // モーションパターン
    this._motionPattern = dm.motionPattern;
    // モーション開始パターン
    if (dm.motionStartPattern != undefined) {
        this._motionStartPattern = eval(dm.motionStartPattern);
    }

    // attackの場合は武器を振る
    if (dm.motion == "attack"){
        var weaponId;
        if (dm.weaponId) {
            weaponId = eval(dm.weaponId);
        }
        var weaponType;
        if (dm.weaponType) {
            weaponType = eval(dm.weaponType);
        }
        this._battler.performAttackDynamicMotion(weaponId, weaponType);

    // 通常のモーション
    } else {
        // 武器非表示
        if (this._weaponSprite) {
            this._weaponSprite._weaponImageId = 0;
            this._weaponSprite.updateFrame();
        }
        this.startMotion(dm.motion);
    }
};

/**
 * ●プラグインコマンドを呼び出す
 */
function callPluginCommand(params) {
    var command = params.shift();
    // バトルコマンド用のInterpreterを参照し、プラグインコマンドを呼び出す。
    $gameTroop._interpreter.pluginCommand(command, params);
}

/**
 * ●モーションの開始
 */
var _Sprite_Actor_startMotion = Sprite_Actor.prototype.startMotion;
Sprite_Actor.prototype.startMotion = function(motionType) {
    _Sprite_Actor_startMotion.call(this, motionType);

    // モーション開始パターンの変更
    if (this._motionStartPattern) {
        this._pattern = this._motionStartPattern;
    }
};

/**
 * ●モーションの更新
 */
var _Sprite_Actor_updateMotionCount = Sprite_Actor.prototype.updateMotionCount;
Sprite_Actor.prototype.updateMotionCount = function() {
    // 変更がある場合は独自実装へ。
    if (this._motionDuration != undefined || this._motionPattern != undefined) {
        const dm = this.dynamicMotion;
        const t = this.getDynamicMotionTime(); // 現在の経過時間
        const et = this.getDynamicMotionEndTime(); // 終了時間

        // モーション速度
        var motionSpeed;
        if (this._motionDuration != undefined) {
            motionSpeed = this._motionDuration;
        // 指定がなければ標準値
        } else {
            motionSpeed = this.motionSpeed();
        }
        if (this._motion && ++this._motionCount >= motionSpeed) {
            // モーションパターンの指定がある場合
            if (this._motionPattern != undefined) {
                // 指定式でパターン制御
                this._pattern = eval(this._motionPattern);
                // 値がマイナスになった場合はリフレッシュ
                if (this._pattern < 0) {
                    this.refreshMotion();
                }
            } else if (this._motion.loop) {
                this._pattern = (this._pattern + 1) % 4;
            } else if (this._pattern < 2) {
                this._pattern++;
            } else {
                this.refreshMotion();
            }
            this._motionCount = 0;
        }
        return;
    }

    // 元処理実行
    _Sprite_Actor_updateMotionCount.call(this);
};

/**
 * ●モーションリフレッシュ
 */
var _Sprite_Actor_refreshMotion = Sprite_Actor.prototype.refreshMotion;
Sprite_Actor.prototype.refreshMotion = function() {
    this._motionDuration = undefined;
    this._motionPattern = undefined;
    this._motionStartPattern = undefined;
    // 武器非表示
    if (this._weaponSprite.bitmap) {
        this._weaponSprite._weaponImageId = 0;
        this._weaponSprite.updateFrame();
    }

    _Sprite_Actor_refreshMotion.call(this);
};

/**
 * 【独自】アタックモーション
 */
Game_Battler.prototype.performAttackDynamicMotion = function(weaponId, weaponType) {
    var wtypeId;

    // weaponTypeの指定がある場合は優先
    if (weaponType != undefined) {
        wtypeId = weaponType;
    // それ以外は武器ＩＤから取得
    } else {
        var weapons;
        // 武器IDの指定があれば取得
        if (weaponId != undefined) {
            weapons = [$dataWeapons[weaponId]];
        } else {
            weapons = this.weapons();
        }
        wtypeId = weapons[0] ? weapons[0].wtypeId : 0;
    }

    var attackMotion = $dataSystem.attackMotions[wtypeId];
    if (attackMotion) {
        if (attackMotion.type === 0) {
            this.requestMotion('thrust');
        } else if (attackMotion.type === 1) {
            this.requestMotion('swing');
        } else if (attackMotion.type === 2) {
            this.requestMotion('missile');
        }
        this.startWeaponAnimation(attackMotion.weaponImageId);
    }
};

/**
 * ●武器の表示準備
 */
var _Sprite_Weapon_setup = Sprite_Weapon.prototype.setup;
Sprite_Weapon.prototype.setup = function(weaponImageId) {
    // 開始モーションの指定がある場合
    if (this.parent._motionStartPattern) {
        this._weaponImageId = weaponImageId;
        this._animationCount = 0;
        this._pattern = this.parent._motionStartPattern;
        this.loadBitmap();
        this.updateFrame();
        return;
    }

    // 元処理実行
    _Sprite_Weapon_setup.call(this, weaponImageId);
};

/**
 * 【上書】武器のモーション時間
 */
Sprite_Weapon.prototype.animationWait = function() {
    // 親（Sprite_Actor）のモーション時間に武器も合わせる。
    var motionSpeed;
    if (this.parent._motionDuration != undefined) {
        motionSpeed = this.parent._motionDuration;
    // 指定がなければ標準値
    } else {
        motionSpeed = this.parent.motionSpeed();
    }

    return motionSpeed;
};

/**
 * 【上書】武器のモーションパターン
 */
Sprite_Weapon.prototype.updatePattern = function() {
    // アクターのパターンに同期する。
    this._pattern = this.parent._pattern;

    if (this._pattern >= 3 || this._pattern <= -1) {
        this._weaponImageId = 0;
    }
};

/**
 * 【独自】絶対座標での移動を行う。
 */
Sprite_Battler.prototype.startMoveDynamic = function(x, y, duration) {
    // 全体時間の保持
    this._allDuration = duration;

    // 絶対座標を相対座標へ変換し、移動実行。
    var offsetX = x - this._homeX;
    var offsetY = y - this._homeY;

    // 開始時の空中Ｙ座標
    this._startAirY = this._airY;
    if (this._startAirY == undefined) {
        this._startAirY = 0;
    }

    this._targetOffsetX = offsetX;
    this._targetOffsetY = offsetY;
    this._movementDuration = duration;
    if (duration === 0) {
        this._offsetX = offsetX;
        this._offsetY = offsetY;
        this._airY = this._targetAirY;
    }

    // 描画更新
    this.updateMove();
};

/**
 * ●バトラーの移動更新
 */
var _Sprite_Battler_updateMove = Sprite_Battler.prototype.updateMove;
Sprite_Battler.prototype.updateMove = function() {
    this.updateDynamicMove();

    _Sprite_Battler_updateMove.call(this);
};

/**
 * 【独自】DynamicMotion用バトラーの移動更新
 * ※当プラグインの描画更新系もここで行う
 */
Sprite.prototype.updateDynamicMove = function() {
    var motion = this._setDynamicMotion;

    if (motion && this._movementDuration > 0) {
        const dm = this.dynamicMotion;
        const t = this.getDynamicMotionTime(); // 現在の経過時間
        const et = this.getDynamicMotionEndTime(); // 終了時間

        // eval参照用
        var a = this;
        var b = motion._referenceTarget;
        var screenX = motion._screenX;
        var screenY = motion._screenY;
        var defaultX = motion._defaultX;
        var defaultY = motion._defaultY;
        var sx = motion._sx;
        var sy = motion._sy;
        var performerNo = motion._performerNo;
        var targetNo = motion._targetNo;

        var mirroring = motion._mirroring; // ミラーリング

        motion._addX = 0;
        motion._addY = 0;

        // 座標計算式
        if (motion._evalDx) {
            motion._dx = eval(motion._evalDx);
        }
        if (motion._evalDy) {
            motion._dy = eval(motion._evalDy);
        }

        // 円運動
        if (motion._evalRadiusX) {
            if (motion._evalRadX == undefined) {
                motion._evalRadX = 0;
            }
            motion._addX += eval(motion._evalRadiusX) * Math.cos(eval(motion._evalRadX))
        }
        if (motion._evalRadiusY) {
            if (motion._evalRadY == undefined) {
                motion._evalRadY = 0;
            }
            motion._addY += eval(motion._evalRadiusY) * Math.sin(eval(motion._evalRadY))
        }

        // 座標補正
        if (motion._evalAddX) {
            motion._addX += eval(motion._evalAddX);
        }
        if (motion._evalAddY) {
            motion._addY += eval(motion._evalAddY);
        }

        // 空中Ｙ座標
        this._airY = this._startAirY;
        if (this._airY == undefined) {
            this._airY = 0;
        }
        // 終点の始点がある場合
        if (this._targetAirY != undefined && this._startAirY != this._targetAirY) {
            var rate = t/et;
            // 始点から終点へと移動する計算式
            this._airY += (this._targetAirY - this._startAirY) * rate;
        }

        // 放物線補正があれば加算
        var arcX = motion._arcX;
        var arcY = motion._arcY;
        // arcX, arcYを頂点とする二次曲線の方程式
        if (arcX) {
            motion._offsetArcX = (-arcX / Math.pow(et/2, 2)) * Math.pow(Math.min(t, et) - et/2, 2) + arcX;
        }
        if (arcY) {
            this._airY += (-arcY / Math.pow(et/2, 2)) * Math.pow(Math.min(t, et) - et/2, 2) + arcY;
        }

        // 大きさ変更
        if (motion._evalScale != undefined) {
            this.scale.x = eval(motion._evalScale);
            this.scale.y = eval(motion._evalScale);
        }
        if (motion._evalScaleX != undefined) {
            this.scale.x = eval(motion._evalScaleX);
        }
        if (motion._evalScaleY != undefined) {
            this.scale.y = eval(motion._evalScaleY);
        }

        // 回転率変更
        if (motion._evalRotation != undefined) {
            this.rotation = eval(motion._evalRotation);

            // 画像の原点を高さの中央に
            this.mainSprite().anchor.y = 0.5;

            if (this._weaponSprite) {
                this._weaponSprite.anchor.y = 0.5;
            }
            if (this._stateSprite) {
                this._stateSprite.anchor.y = 0.5;
            }
        }

        // 不透明度変更
        if (motion._evalOpacity != undefined) {
            this.opacity = eval(motion._evalOpacity);
        }

        // 色調変更
        if (motion._evalColor != undefined) {
            this.mainSprite().setBlendColor(eval(motion._evalColor));
        }

        // Ｚ座標
        if (motion._evalZ != undefined) {
            this.z = eval(motion._evalZ);
        }

        // スクリプト（リアルタイム）
        if (motion._scriptRT != undefined) {
            eval(motion._scriptRT);
        }
    }
};

/**
 * 【上書】移動終了
 */
Sprite_Actor.prototype.onMoveEnd = function() {
    Sprite_Battler.prototype.onMoveEnd.call(this);
    if (!BattleManager.isBattleEnd()) {
        // モーションを実行中ならリフレッシュしない。
        // ■条件詳細
        // ・モーションが存在する。
        // ・ループモーションではない。
        // ・現在のパターンが0～2
        if (this._motion
                && !this._motion.loop
                && this._pattern >= 0 && this._pattern <= 2) {
            return;
        }
        this.refreshMotion();
    }
};

/**
 * ●移動終了
 */
var _Sprite_Battler_onMoveEnd = Sprite_Battler.prototype.onMoveEnd;
Sprite_Battler.prototype.onMoveEnd = function() {
    _Sprite_Battler_onMoveEnd.call(this);

    // DynamicMotion用の移動終了
    this.onDynamicMoveEnd();
};

/**
 * 【独自】DynamicMotion用の移動終了
 */
Sprite.prototype.onDynamicMoveEnd = function() {
    // 変数初期化
    this._setDynamicMotion = [];
    this._startAirY = undefined;
    this._targetAirY = undefined;

    // 画像基準点が変更されている場合
    if (this.mainSprite().anchor.y == 0.5) {
        // かつ回転終了の場合
        if (this.rotation == undefined || this.rotation % Math.PI*2 == 0) {
            // 基準点を戻す（本体、武器、ステート）
            this.mainSprite().anchor.y = 1;
            if (this._weaponSprite) {
                this._weaponSprite.anchor.y = 1;
            }
            if (this._stateSprite) {
                this._stateSprite.anchor.y = 1;
            }
        }
    }
};

/**
 * ●バトラーの位置設定
 */
var _Sprite_Battler_updatePosition = Sprite_Battler.prototype.updatePosition;
Sprite_Battler.prototype.updatePosition = function() {
    // 元処理実行
    _Sprite_Battler_updatePosition.call(this);

    const motion = this._setDynamicMotion;
    if (motion) {
        this.updateDynamicPosition();
    }
};

/**
 * 【独自】DynamicMotion用バトラーの位置補正
 */
Sprite.prototype.updateDynamicPosition = function() {
    const motion = this._setDynamicMotion;
    // Ｘ座標の計算式の指定がある場合
    if (motion._dx != undefined) {
        this.x = motion._dx;
    }
    // Ｙ座標の計算式の指定がある場合
    if (motion._dy != undefined) {
        this.y = motion._dy;
    }

    // Ｘ座標の補正があれば加算
    if (motion._addX) {
        this.x += motion._addX;
    }
    // Ｙ座標の補正があれば加算
    if (motion._addY) {
        this.y += motion._addY;
    }

    // 放物線成分および空中成分を加算
    if (motion._offsetArcX) {
        this.x += motion._offsetArcX;
    }
    // 空中Ｙ座標
    if (this.rollAirY()) {
        this.y += this.rollAirY();
    }

    // 左右反転
    if (motion._mirror) {
        if (this.scale.x > 0) {
            this.scale.x *= -1;
        }
    }
};

/**
 * ●アクターのアクション開始
 */
var _Game_Actor_performAction = Game_Actor.prototype.performAction;
Game_Actor.prototype.performAction = function(action) {
    // 開始モーションの有無
    if (pSetStartMotion) {
        // やや冗長だけど競合を減らすため、
        // Game_Battler.prototype.performActionを呼び出す。
        Game_Battler.prototype.performAction.call(this, action);
        // 1:常に無
        if (pSetStartMotion == 1) {
            return;
        // 2:モーション指定時のみ無
        } else if (pSetStartMotion == 2 && action.isDynamicMotion()) {
            return;
        }
    }

    // 元処理実行
    _Game_Actor_performAction.call(this, action);
};

/**
 * 【独自】動的モーションかの判定処理
 */
Game_Action.prototype.isDynamicMotion = function() {
    const item = this.item();
    const note = item.note;

    // 省略タグを考慮
    var tagNameSet = "(?:" + TAG_NAME + ")";
    if (pShortTagName) {
        tagNameSet = "(?:" + TAG_NAME + "|" + pShortTagName + ")";
    }

    // 省略タグを考慮（設定タグ）
    var settingTagNameSet = "(?:" + SETTING_TAG_NAME + ")";
    if (pShortSettingTagName) {
        settingTagNameSet = "(?:" + SETTING_TAG_NAME + "|" + pShortSettingTagName + ")";
    }

    // 開始タグがあればtrue
    if (note.match("<" + tagNameSet) || note.match("<" + settingTagNameSet)) {
        return true;
    }
    return false;
};

/**
 * ●アクション実行終了（バトラー共通）
 */
var _Game_Battler_performActionEnd = Game_Battler.prototype.performActionEnd;
Game_Battler.prototype.performActionEnd = function() {
    // 元処理実行
    _Game_Battler_performActionEnd.call(this);

    // アクター位置の自動設定を禁止解除
    BattleManager._noUpdateTargetPosition = false;
};

/**
 * ●アクター位置の自動設定
 */
var _Sprite_Actor_updateTargetPosition = Sprite_Actor.prototype.updateTargetPosition;
Sprite_Actor.prototype.updateTargetPosition = function() {
    // 行動開始したら、解除されるまで処理しない。
    if (BattleManager._noUpdateTargetPosition) {
        return;
    // noReturn状態ならば帰還しない。
    } else if (this._actor._noReturn) {
        return;
    }

    _Sprite_Actor_updateTargetPosition.call(this);
};

/**
 * ●前進
 */
var _Sprite_Actor_stepForward = Sprite_Actor.prototype.stepForward;
Sprite_Actor.prototype.stepForward = function() {
    const action = BattleManager._action;
    if (BattleManager._phase == "action" && action) {
        // 前進の有無
        if (pSetStepForward) {
            // 1:常に無
            if (pSetStepForward == 1) {
                return;
            // 2:モーション指定時のみ無
            } else if (pSetStepForward == 2 && action.isDynamicMotion()) {
                return;
            }
        }

        // NoStepの設定があれば前進しない
        if (action.existDynamicSetting("NoStep")) {
            return;
        }
    }

    // 元処理実行
    _Sprite_Actor_stepForward.call(this);
};

/**
 * ●アクターの影更新
 */
const _Sprite_Actor_updateShadow = Sprite_Actor.prototype.updateShadow;
Sprite_Actor.prototype.updateShadow = function() {
    _Sprite_Actor_updateShadow.apply(this, arguments);

    this.updateDynamicShadow();
};

/**
 * ●影更新
 */
Sprite_Actor.prototype.updateDynamicShadow = function() {
    const motion = this._setDynamicMotion;
    if (!motion || !this._shadowSprite) {
        return;
    }

    // 影非表示
    if (motion._noShadow) {
        this._shadowSprite.visible = false;
        return;
    }

    // 空中Ｙ座標
    var airY = this.rollAirY();

    // ジャンプ時の影表示
    if (pJumpShadow == true) {
        // 影の位置を初期化
        this.initShadowPosition();

        // ジャンプ座標分だけ影のＹ座標を調整
        if (airY && this._shadowSprite.visible) {
            // 回転時の角度変化分を調整
            if (motion._mirror) {
                this._shadowSprite.y -= airY * Math.cos(this.rotation * -1);
                this._shadowSprite.x -= airY * Math.sin(this.rotation * -1);
            } else {
                this._shadowSprite.y -= airY * Math.cos(this.rotation);
                this._shadowSprite.x -= airY * Math.sin(this.rotation);
            }
        }
    // ジャンプ時の影非表示
    } else if (pJumpShadow == false && airY) {
        this._shadowSprite.visible = false;
        return;
    }

    // アクターが回転した場合、影を反対に回転して元の角度を保持する。
    if (this.rotation) {
        this._shadowSprite.rotation = -this.rotation;
        // 左右反転時は逆
        if (motion._mirror) {
            this._shadowSprite.rotation *= -1;
        }
    } else {
        this._shadowSprite.rotation = 0;
    }
};

/**
 * 【独自】影の位置を初期化
 * ※基本的にはSprite_Actor用だが、NRP_BattlerShadow,jsとの連携を考慮
 */
Sprite_Battler.prototype.initShadowPosition = function() {
    this._shadowSprite.x = 0;
    this._shadowSprite.y = -2;
};

/**
 * 【独自】回転調整後の空中Ｙ座標を取得
 * ※マップ版と共有するためSpriteに定義する。
 */
Sprite.prototype.rollAirY = function() {
    var airY = 0;
    if (this._airY) {
        airY += this._airY;
    }
    // 基準点（回転軸）が変更されている場合はズレるので調整
    if (this.mainSprite().anchor.y == 0.5) {
        // scaleの変更を考慮
        airY += -this.height/2 * this.scale.y;
    }
    
    return airY;
};

/**
 * 【独自】モーション実行中の判定。
 */
Sprite_Battler.prototype.isMotionPlaying = function() {
    return this._dynamicMotionDuration > 0;
};

/**
 * ●アクターの画像名を取得。
 */
var _Game_Actor_battlerName = Game_Actor.prototype.battlerName;
Game_Actor.prototype.battlerName = function() {
    // 一時設定があれば、そちらを取得
    if (this._tempBattlerImage) {
        return this._tempBattlerImage;
    }

    return _Game_Actor_battlerName.apply(this, arguments);
};

/**
 * ●敵キャラの画像名を取得。
 */
var _Game_Enemy_battlerName = Game_Enemy.prototype.battlerName;
Game_Enemy.prototype.battlerName = function() {
    // 一時設定があれば、そちらを取得
    if (this._tempBattlerImage) {
        return this._tempBattlerImage;
    }

    return _Game_Enemy_battlerName.apply(this, arguments);
};

/**
 * ●処理中かどうかの判定
 */
var _Spriteset_Battle_isBusy = Spriteset_Battle.prototype.isBusy;
Spriteset_Battle.prototype.isBusy = function() {
    return _Spriteset_Battle_isBusy.call(this) || this.isMotionPlaying();
};

/**
 * 【独自】モーション実行中判定
 */
Spriteset_Battle.prototype.isMotionPlaying = function() {
    return this.battlerSprites().some(function(sprite) {
        return sprite._battler && (sprite._battler.isDynamicMotionRequested() || sprite.isMotionPlaying());
    });
};

/**
 * ●アクション中にアニメーション待ちしないかどうか？
 */
DynamicMotion.prototype.isNoWaitInAction = function () {
    // ウェイトなしの場合に加えて、並列実行の場合も待たない。
    // 並列実行からのアニメーションで動作が止まらないようにする。
    return this.noWait || this.isParallel;
};

/**
 * ●初回のみ取得するランダム関数
 */
DynamicMotion.prototype.startRandom = function(key) {
    // keyがある場合はそちらから取得
    if (key != undefined) {
        // Mapが未作成なら新規作成
        if (this._startRandomMap == undefined) {
            this._startRandomMap = new Map();
        }

        // keyが既に設定されている
        if (this._startRandomMap.has(key)) {
            // そのまま値を返す
            return this._startRandomMap.get(key);

        // 新規のキーならば
        } else {
            // ランダム値をセットして戻す
            const val = Math.random();
            this._startRandomMap.set(key, val);
            return val;
        }
    }

    // keyがなければ一つだけ生成
    if (this._startRandom == undefined) {
        var baseMotion = this.baseMotion;

        // ランダム値を取得
        var val = Math.random();
        baseMotion._startRandom = val;
        this._startRandom = val;
    }
    return this._startRandom;
};

/**
 * ●初回のみ取得するランダム関数（短縮版）
 */
DynamicMotion.prototype.random = function(key) {
    return this.startRandom(key);
}

/**
 * ●バトラースプライトの初期化
 */
var _Sprite_Battler_initMembers = Sprite_Battler.prototype.initMembers;
Sprite_Battler.prototype.initMembers = function() {
    _Sprite_Battler_initMembers.apply(this, arguments);

    this._setDynamicMotion = [];

    if (pUsePriority) {
        // Ｚ座標の設定
        this.z = pBattlerZ;
    }
};

/**
 * 【独自】DynamicMotion用時間の取得
 */
Sprite.prototype.getDynamicMotionTime = function() {
    let t = this._allDuration - this._movementDuration; // 現在の経過時間
    let et = this._allDuration - 1; // 終了時間

    // 両方０の場合はt/etがNaNになるので、固定で1を設定
    if (t === 0 && et === 0) {
        t = 1;
    }

    return t;
};

/**
 * 【独自】DynamicMotion用終了時間の取得
 */
Sprite.prototype.getDynamicMotionEndTime = function() {
    let t = this._allDuration - this._movementDuration; // 現在の経過時間
    let et = this._allDuration - 1 // 終了時間

    // 両方０の場合はt/etがNaNになるので、固定で1を設定
    if (t === 0 && et === 0) {
        et = 1;
    }

    return et;
};

//------------------------------------------
// 表示優先度
//------------------------------------------

if (pUsePriority) {
    /**
     * ●更新処理
     */
    var _Spriteset_Battle_update = Spriteset_Battle.prototype.update;
    Spriteset_Battle.prototype.update = function() {
        _Spriteset_Battle_update.apply(this, arguments);

        this.updateNrpZCoordinates();
    };

    /**
     * ●Ｚ座標による優先度表示の更新
     */
    Spriteset_Battle.prototype.updateNrpZCoordinates = function () {
        // Ｚ座標の既定値
        // 8:戦闘アニメ
        for (var child of this._battleField.children) {
            if (child.z == undefined) {
                child.z = 9;
            }
        }

        this._battleField.children.sort(compareZ);
    };

    /**
     * ●アクション開始
     */
    var _Game_Battler_performActionStart = Game_Battler.prototype.performActionStart;
    Game_Battler.prototype.performActionStart = function(action) {
        _Game_Battler_performActionStart.apply(this, arguments);

        // 行動開始前、Ｚ座標を調整
        // ※相手サイドを下に表示
        var battlerSprites = BattleManager._spriteset.battlerSprites();
        for (var sprite of battlerSprites) {
            // 存在しない場合は無視
            if (!sprite._battler) {
                continue;
            }

            // 自分と同サイド
            if (this.isActor() == sprite._battler.isActor()) {
                sprite.z = pBattlerZ;

            // それ以外
            } else {
                if (pOpponentSideZ) {
                    sprite.z = pOpponentSideZ;
                } else {
                    sprite.z = pBattlerZ;
                }
            }
        }
    };

    /**
     * ●アクション実行終了（バトラー共通）
     * ※上に同関数があるので名前を_2に変更
     */
    var _Game_Battler_performActionEnd_2 = Game_Battler.prototype.performActionEnd;
    Game_Battler.prototype.performActionEnd = function() {
        _Game_Battler_performActionEnd_2.call(this);

        // 行動終了後、Ｚ座標を初期化
        var battlerSprites = BattleManager._spriteset.battlerSprites();
        for (var sprite of battlerSprites) {
            sprite.z = pBattlerZ;
        }
    };
}

/**
 * ●優先度設定
 */
function compareZ(a, b) {
    // 優先度による比較
    if (a.z > b.z) {
        return 1;
    } else if (a.z < b.z) {
        return -1;
    }

    // 空中Ｙ座標があれば優先（マイナス優先）
    var aAirY = a._airY ? a._airY : 0;
    var bAirY = b._airY ? b._airY : 0;

    if (aAirY < bAirY) {
        return 1;
    } else if (aAirY > bAirY) {
        return -1;
    }

    // 優先度が同一の場合、Ｙ座標が大きいものを優先
    if (a.y > b.y) {
        return 1;
    } else if (a.y < b.y) {
        return -1;
    }

    // バトラー同士ならＸ座標が大きいものを優先
    if (a._battler && b._battler) {
        if (a.x > b.x) {
            return 1;
        } else if (a.x < b.x) {
            return -1;
        }
    }
    
    // 新しく生成されたスプライトを優先（ダメージなど）
    return a.spriteId - b.spriteId;
}

//------------------------------------------
// 共通関数
//------------------------------------------

/**
 * ●座標反転するかどうかを判定する。
 * 反転時は-1を返す。
 */
function getMirroring(battler) {
    if (battler && battler.isActor()) {
        return -1;
    }
    return 1;
}

/**
 * ●参照用のバトラーを取得する
 * ※バトラー本体かスプライトか？
 */
function getReferenceBattler(battler) {
    // マップ中はスプライトを取得
    // ※Game_Characterのx,yはグリッド座標になってしまうため、
    //   画面座標を参照できるスプライトを参照する。
    if (!$gameParty.inBattle()) {
        return getBattlerSprite(battler);
    }
    // バトラー取得
    return battler;
}

/**
 * ●指定したバトラーのスプライトを取得する。
 * ※実際にはマップ時のSprite_Characterも対象
 */
function getBattlerSprite(battler) {
    if (!battler) {
        return undefined;
    }

    let sprites;
    let sprite;
    const spriteset = getSpriteset();

    // マップ上ではキャラクタースプライトを返す。
    if (!$gameParty.inBattle()) {
        sprites = spriteset._characterSprites;
        sprite = sprites.find(s => s._character == battler);
        // マップ用のグリッド座標情報もついでに設定
        if (sprite) {
            sprite.gx = sprite._character.x;
            sprite.gy = sprite._character.y;
        }

    // 戦闘中はバトラースプライトを返す。
    } else  {
        sprites = spriteset.battlerSprites();
        sprite = sprites.find(s => s._battler == battler);
    }

    // 一致があれば返す
    return sprite;
}

/**
 * ●Sprite_Animationを取得する。
 */
function getSpriteAnimation() {
    return new Sprite_Animation();
    // return new Sprite_AnimationMV();
}

/**
 * ●現在の画面のSpritesetを取得する。
 */
function getSpriteset() {
    // 戦闘
    if ($gameParty.inBattle()) {
        return BattleManager._spriteset;
    // マップ
    } else {
        return SceneManager._scene._spriteset;
    }
}

/**
 * 【独自】サイドビュー用モーションを保持しているかどうか？
 */
Sprite.prototype.hasSvMotion = function() {
    return this._actor;
};

//-------------------------------------------------------------
// ダメージ処理関連
// ※本当はDynamicAnimation側に統合したいのですが、
// 　当初はこちら側でダメージ制御をしていた関係で
// 　不死身設定だけがこちらの担当のままになっています。
//-------------------------------------------------------------

/**
 * ●ダメージ更新処理など
 */
const _BattleManager_invokeAction = BattleManager.invokeAction;
BattleManager.invokeAction = function(subject, target) {
    // 不死身設定の場合、対象を不死身化
    if (this._action && this._action.existDynamicSetting("Immortal")) {
        target.addState(pImmortalState);
    }

    _BattleManager_invokeAction.apply(this, arguments);
};

/**
 * ●行動終了
 */
const _BattleManager_endAction = BattleManager.endAction;
BattleManager.endAction = function() {
    // 不死身設定の場合、全員の不死身化解除
    if (this._action && this._action.existDynamicSetting("Immortal")) {
        this.allBattleMembers().forEach(function(battler) {
            battler.removeState(pImmortalState);
            // 既に死んでいる場合は演出実行
            if (battler.isStateAffected(battler.deathStateId())) {
                this._logWindow.displayAddedStates(battler);
            }
        }, this);
    }

    _BattleManager_endAction.apply(this, arguments);
};

})();
