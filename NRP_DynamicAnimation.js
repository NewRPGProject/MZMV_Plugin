﻿//=============================================================================
// NRP_DynamicAnimation.js
//=============================================================================

/*:
 * @plugindesc v1.23 Automate & super-enhance battle animations.
 * @author Takeshi Sunagawa (http://newrpg.seesaa.net/)
 *
 * @help Call battle animations freely from skills (items).
 * It is also possible to move the animation.
 * 
 * [What you can do]
 * 1. Call animation at the same time. And bulk calls.
 * 2. Movement such as shooting and circular motion.
 * 3. Dynamic changes such as rotation rate and size.
 * 
 * [Usage]
 * For example, you can fill out a skills note as follows.
 * 
 * <D-Animation:arcRandomAll/>
 * 
 * The arcRandomAll template allows you to create an animation
 * that throws an animation to the entire battler.
 * You can also set more detailed parameters.
 * 
 * <D-Animation:arcRandomAll> // throw to all
 * id = 82 // Water One 2 (When omitted, use the skill setting)
 * repeat = 20
 * interval = 1 // repeating interval
 * arrival = 7 // arrival frame
 * arcY = -200 // height of the arc
 * scaleX = 0.5 // animation width
 * scaleY = 0.5 // animation height
 * </D-Animation>
 * 
 * A large amount of bubbles will be thrown at the enemy forces, making them pop.
 * The content changes depending on the parameters.
 * 
 * Other than that, This plugin has many features.
 * See below for details.
 * http://newrpg.seesaa.net/article/473569739.html
 * 
 * In particular, the following basic usage is easy to understand.
 * http://newrpg.seesaa.net/article/473686120.html
 * 
 * [Terms]
 * There are no restrictions.
 * Modification, redistribution freedom, commercial availability,
 * and rights indication are also optional.
 * The author is not responsible,
 * but will deal with defects to the extent possible.
 * 
 * @param templateList
 * @type struct<DynamicAnimation>[]
 * @default ["{\"templateId\":\"shot\",\"name\":\"射撃\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"a.x\",\"sy\":\"a.y - a.height / 2\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"defaultX\",\"ey\":\"defaultY\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"shotRandom\",\"name\":\"乱射\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"5\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"a.x\",\"sy\":\"a.y - a.height / 2\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"defaultX\",\"ey\":\"defaultY\",\"exRandom\":\"b.width / 3\",\"eyRandom\":\"b.height / 3\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"shotRandomAll\",\"name\":\"全乱射\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"20\",\"limitFlash\":\"4\",\"limitSound\":\"2\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"3\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"a.x\",\"sy\":\"a.y - a.height / 2\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"defaultX\",\"ey\":\"defaultY\",\"exRandom\":\"allRangeX\",\"eyRandom\":\"allRangeY\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"arc\",\"name\":\"投射\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"a.x\",\"sy\":\"a.y - a.height / 2\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"defaultX\",\"ey\":\"defaultY\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"-100\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"arcRandom\",\"name\":\"乱投射\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"5\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"a.x\",\"sy\":\"a.y - a.height / 2\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"defaultX\",\"ey\":\"defaultY\",\"exRandom\":\"b.width / 3\",\"eyRandom\":\"b.height / 3\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"-100\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"arcRandomAll\",\"name\":\"全乱投射\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"20\",\"limitFlash\":\"4\",\"limitSound\":\"2\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"3\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"a.x\",\"sy\":\"a.y - a.height / 2\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"defaultX\",\"ey\":\"defaultY\",\"exRandom\":\"allRangeX\",\"eyRandom\":\"allRangeY\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"-100\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"random\",\"name\":\"ランダム\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"5\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"b.width / 3\",\"syRandom\":\"b.height / 3\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"randomAll\",\"name\":\"全ランダム\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"25\",\"limitFlash\":\"5\",\"limitSound\":\"2\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"3\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"allRangeX\",\"syRandom\":\"allRangeY\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"randomCircle\",\"name\":\"円ランダム\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"25\",\"limitFlash\":\"5\",\"limitSound\":\"2\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"3\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"allRangeX\",\"syRandom\":\"ba.randomY() * Math.sqrt(sxRandom**2 - (defaultX - sx)**2) * (Math.random() < 0.5 ? 1 : -1)\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"rain\",\"name\":\"雨\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"25\",\"limitFlash\":\"5\",\"limitSound\":\"2\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"3\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"defaultX\",\"sy\":\"defaultY - Graphics.boxHeight\",\"sxRandom\":\"allRangeX\",\"syRandom\":\"allRangeY\",\"<End Point>\":\"\",\"ex\":\"sx\",\"ey\":\"sy + Graphics.boxHeight\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"horizontal\",\"name\":\"水平\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"5\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"3\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"(defaultX + 150 * mirroring) - ((b.isActor() ? Graphics.boxWidth : 0) + (defaultX + 150 * mirroring) * mirroring) * (r / repeat) * mirroring\",\"sy\":\"b.y - b.height/2\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"shotHorizontal\",\"name\":\"水平射撃\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"3\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"defaultX + 250 * mirroring\",\"sy\":\"b.y - b.height/2\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"sx - (defaultX + 250 * mirroring) * mirroring\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"vertical\",\"name\":\"垂直\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"5\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"3\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"b.x\",\"sy\":\"Graphics.boxHeight * 1/5 + (r / repeat) * (Graphics.boxHeight / 2)\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"pierce\",\"name\":\"貫通\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"3\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"a.x\",\"sy\":\"a.y - a.height / 2\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"(b.isActor() ? Graphics.boxWidth + 100 : -100)\",\"ey\":\"sy + (b.y - b.height/2 - sy) * (ex - sx) / (b.x - sx)\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"circle\",\"name\":\"円周\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"10\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"100\",\"radiusY\":\"100\",\"radX\":\"(r/repeat * Math.PI*2 - Math.PI/2)\",\"radY\":\"(r/repeat * Math.PI*2 - Math.PI/2)\"}","{\"templateId\":\"vortex\",\"name\":\"渦\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"20\",\"limitFlash\":\"5\",\"limitSound\":\"2\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"100 * (1 - r/repeat)\",\"radiusY\":\"100 * (1 - r/repeat)\",\"radX\":\"(r/repeat * Math.PI*2 - Math.PI/2)\",\"radY\":\"(r/repeat * Math.PI*2 - Math.PI/2)\"}","{\"templateId\":\"spreadVortex\",\"name\":\"発散渦\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"20\",\"limitFlash\":\"5\",\"limitSound\":\"2\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"100 * (r/repeat)\",\"radiusY\":\"100 * (r/repeat)\",\"radX\":\"(r/repeat * Math.PI*2 - Math.PI/2)\",\"radY\":\"(r/repeat * Math.PI*2 - Math.PI/2)\"}","{\"templateId\":\"revolve\",\"name\":\"公転\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"100\",\"radiusY\":\"100\",\"radX\":\"(Math.min(t, arrival)/arrival * Math.PI*2 - Math.PI/2)\",\"radY\":\"(Math.min(t, arrival)/arrival * Math.PI*2 - Math.PI/2)\"}","{\"templateId\":\"moveVortex\",\"name\":\"移動渦\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"100 * (1 - Math.min(t, arrival)/arrival)\",\"radiusY\":\"100 * (1 - Math.min(t, arrival)/arrival)\",\"radX\":\"Math.min(t, arrival)/arrival * Math.PI*2\",\"radY\":\"Math.min(t, arrival)/arrival * Math.PI*2\"}","{\"templateId\":\"spreadMoveVortex\",\"name\":\"発散移動渦\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"100 * (t/et)\",\"radiusY\":\"100 * (t/et)\",\"radX\":\"t/et * Math.PI*2\",\"radY\":\"t/et * Math.PI*2\"}","{\"templateId\":\"breath\",\"name\":\"ブレス\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"20\",\"limitFlash\":\"5\",\"limitSound\":\"2\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"3\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"a.x - a.width/3 * mirroring\",\"sy\":\"a.y - a.height * 2/3\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"defaultX - 250 * mirroring\",\"ey\":\"defaultY\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"allRangeY * 1.5 * t/arrival\",\"radX\":\"\",\"radY\":\"(r/repeat * Math.PI*2 * 1 - Math.PI/2)\"}","{\"templateId\":\"fv_breath\",\"name\":\"FVブレス\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"20\",\"limitFlash\":\"5\",\"limitSound\":\"2\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"3\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"a.x\",\"sy\":\"a.y - a.height * 2/3\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"defaultX\",\"ey\":\"defaultY - 100 * mirroring\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"allRangeX * 1.5 * t/arrival\",\"radiusY\":\"\",\"radX\":\"(r/repeat * Math.PI*2 * 1 - Math.PI/2)\",\"radY\":\"\"}","{\"templateId\":\"converge\",\"name\":\"収束\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"40\",\"limitFlash\":\"10\",\"limitSound\":\"5\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"1/2\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"true\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"da.startRotation(Math.atan2(this.y - ey, this.x - ex))\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"500 * (1 - Math.min(t, arrival)/arrival)\",\"radiusY\":\"500 * (1 - Math.min(t, arrival)/arrival)\",\"radX\":\"da.startRandom() * Math.PI * 2\",\"radY\":\"da.startRandom() * Math.PI * 2\"}","{\"templateId\":\"radiate\",\"name\":\"放射\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"40\",\"limitFlash\":\"10\",\"limitSound\":\"5\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"1/2\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"true\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"Math.atan2(sy - this.y, sx - this.x)\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"500 * Math.min(t, arrival)/arrival\",\"radiusY\":\"500 * Math.min(t, arrival)/arrival\",\"radX\":\"da.startRandom() * Math.PI * 2\",\"radY\":\"da.startRandom() * Math.PI * 2\"}","{\"templateId\":\"beam\",\"name\":\"ビーム\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"true\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"a.x\",\"sy\":\"a.y - a.height / 2\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"Math.atan2(sy - defaultY, sx - defaultX)\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"diffusionBeam\",\"name\":\"拡散ビーム\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"20\",\"limitFlash\":\"4\",\"limitSound\":\"2\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"true\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"a.x\",\"sy\":\"a.y - a.height / 2\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"(Math.atan2(sy - defaultY, sx - defaultX) + da.startRandom() * Math.PI/2 - Math.PI/4)\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"keep\",\"name\":\"継続\",\"condition\":\"\",\"delay\":\"dataA[no-1].list[0].frame\",\"wait\":\"\",\"repeat\":\"dataA[no-1].repeat\",\"limitFlash\":\"dataA[no-1].limitFlash\",\"limitSound\":\"dataA[no-1].limitSound\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"dataA[no-1].list[r].id\",\"position\":\"dataA[no-1].list[r].position\",\"interval\":\"dataA[no-1].list[r].interval\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"dataA[no-1].list[r].ex\",\"sy\":\"dataA[no-1].list[r].ey\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"boomerang\",\"name\":\"ブーメラン\",\"condition\":\"\",\"delay\":\"dataA[no-1].frame\",\"wait\":\"\",\"repeat\":\"dataA[no-1].repeat\",\"limitFlash\":\"dataA[no-1].limitFlash\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"dataA[no-1].list[r].id\",\"position\":\"dataA[no-1].list[r].position\",\"interval\":\"dataA[no-1].list[r].interval\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"dataA[no-1].list[r].ex\",\"sy\":\"dataA[no-1].list[r].ey\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"dataA[no-1].list[r].sx\",\"ey\":\"dataA[no-1].list[r].sy\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"dataA[no-1].list[r].arrival\",\"arcX\":\"dataA[no-1].list[r].arcX * -1\",\"arcY\":\"dataA[no-1].list[r].arcY * -1\",\"<Afterimage>\":\"\",\"afterimage\":\"dataA[no-1].list[r].afterimage\",\"afterimageInterval\":\"dataA[no-1].list[r].afterimageInterval\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"eval(dataA[no-1].list[r].addX) * -1\",\"addY\":\"eval(dataA[no-1].list[r].addY) * -1\",\"scaleX\":\"eval(dataA[no-1].list[r].scaleX)\",\"scaleY\":\"eval(dataA[no-1].list[r].scaleY)\",\"rotation\":\"eval(dataA[no-1].list[r].rotation)\",\"opacity\":\"eval(dataA[no-1].list[r].opacity)\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"spell\",\"name\":\"魔法発動\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"(isSync ? 0 : \\\"auto\\\")\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"a\",\"<Repeat>\":\"\",\"id\":\"52\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"defaultX\",\"sy\":\"defaultY\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"follow\",\"name\":\"追従\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"b.x\",\"dy\":\"b.y - (position == 0 ? b.height : position == 1 ? b.height/2 : 0)\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"self\",\"name\":\"自分\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"a\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"lookCourse\",\"name\":\"進路を向く\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"true\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"(this.beforeY == this.y && this.beforeX == this.x ? this.rotation : Math.atan2(this.beforeY - this.y, this.beforeX - this.x))\",\"opacity\":\"(t == 0 ? 0 : 255)\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"roll\",\"name\":\"回転\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"Math.min(t, arrival) / arrival * Math.PI * 2 * mirroring\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"screen\",\"name\":\"画面\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"3\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"Graphics.width / 2\",\"sy\":\"Graphics.height / 2\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"wait\",\"name\":\"ウェイト\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"auto\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"delay\",\"name\":\"ディレイ\",\"condition\":\"\",\"delay\":\"auto\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"damage\",\"name\":\"ダメージ\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"true\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"damageAll\",\"name\":\"全体ダメージ\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"true\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"head\",\"name\":\"頭上\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"0\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"center\",\"name\":\"中央\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"1\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"foot\",\"name\":\"足元\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"2\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"whole\",\"name\":\"全体\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"3\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"ifBattle\",\"name\":\"戦闘中\",\"condition\":\"$gameParty.inBattle()\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"ifMap\",\"name\":\"マップ中\",\"condition\":\"!$gameParty.inBattle()\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}"]
 * @desc List of defined template animations.
 * You can also add new templates.
 * 
 * @param shortTagName
 * @type string
 * @default da
 * @desc You can omit the tag name with the specified string.
 * ex. <D-Animation:shot/> -> <da:shot/>
 * 
 * @param referenceBattler
 * @type select
 * @option 0:Sprite_Battler @value 0
 * @option 1:Game_Battler @value 1
 * @default 1
 * @desc The type of battler to be used as a reference (a, b).
 * If you set "1:Game_Battler", you can use both "a.x" and "a.atk".
 * 
 * @param <Animation Position>
 * @desc Items related to the position of the animation.
 * 
 * @param screenX
 * @parent <Animation Position>
 * @type string
 * @default ($gameSystem.isSideView() ? Graphics.boxWidth / 4 + 48 : Graphics.boxWidth / 2)
 * @desc If the animation position is "screen", is is the X coordinate.
 * If the target is an actor, reversed left and right.
 * 
 * @param screenY
 * @parent <Animation Position>
 * @type string
 * @default ($gameSystem.isSideView() ? Graphics.boxHeight / 3 + 24 : Graphics.boxHeight / 2)
 * @desc If the animation position is "screen", it is the Y coordinate.
 * 
 * @param allRangeX
 * @parent <Animation Position>
 * @type string
 * @default ($gameSystem.isSideView() ? Graphics.boxWidth / 4 : Graphics.boxWidth / 3)
 * @desc The horizontal range for displaying the animation for all.
 * Some templates reference this value.
 * 
 * @param allRangeY
 * @parent <Animation Position>
 * @type string
 * @default ($gameSystem.isSideView() ? Graphics.boxHeight / 4 : Graphics.boxHeight / 6)
 * @desc The Vertical range for displaying the animation for all.
 * Some templates reference this value.
 * 
 * @param mirrorAdjustX
 * @parent <Animation Position>
 * @type string
 * @desc When the target is an actor, adjust the value of screenX.
 * 
 * @param mirrorAdjustY
 * @parent <Animation Position>
 * @type string
 * @desc When the target is an actor, adjust the value of screenY.
 * 
 * @param randomAdjust
 * @parent <Animation Position>
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @desc Disperse the numerical value at random calculation.
 * If the value is 0.20, move away from the previous position by about 20%.
 * 
 * @param considerTargetScale
 * @parent <Animation Position>
 * @type boolean
 * @default true
 * @desc When calculating the animation position, consider the target scale.
 * This item also affects DynamicMotion.
 * 
 * @param <For FrontView>
 * @desc Items related to the front view.
 * 
 * @param fvActorHomeX
 * @parent <For FrontView>
 * @type string
 * @default Graphics.boxWidth / 2
 * @desc If it is a front view, set the X position of the actor.
 * 
 * @param fvActorHomeY
 * @parent <For FrontView>
 * @type string
 * @default Graphics.boxHeight * 7/10
 * @desc If it is a front view, set the Y position of the actor.
 * 
 * @param <Conflict>
 * @desc Items related to plug-in conflict countermeasures..
 * 
 * @param conflictMode
 * @parent <Conflict>
 * @type select
 * @option 0:standard @value 0
 * @option 1:branch from showNormalAnimation @value 1
 * @default 0
 * @desc Modify processing for conflict resolution.
 * If it is 1, YEP_BattleEngineCore may also work ...
 * 
 * @param ignoreCondition
 * @parent <Conflict>
 * @type string[]
 * @default ["BattleManager._actSeq && BattleManager._actSeq[0].toUpperCase() === 'CAST ANIMATION'"]
 * @desc If the condition is satisfied,
 * this animation will not be executed.
 */
/*~struct~DynamicAnimation:
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
 * @param condition
 * @type string
 * @desc This is an execution condition.
 * 
 * @param delay
 * @type string
 * @desc Wait frame before displaying animation.
 * When set to "auto", wait for the end of the previous animation.
 * 
 * @param wait
 * @type string
 * @desc Wait frame after displaying animation.
 * When set to "auto", wait for the end of this animation.
 * 
 * @param repeat
 * @type string
 * @desc The number of animation repetitions.
 * 
 * @param limitFlash
 * @type string
 * @desc Restrict flash processing.
 * If the value is 2, the number of flushes will be halved.
 * 
 * @param limitSound
 * @type string
 * @desc Limit sound effects.
 * At a value of 2, the number of plays will be halved.
 * 
 * @param target
 * @type string
 * @desc Changes the animation display to the specified target.
 * Battler or its array can be specified.
 * 
 * @param <Repeat>
 * @desc Basic settings that are processed for each repeat.
 * 
 * @param id
 * @parent <Repeat>
 * @type animation
 * @desc ID of the animation to call.
 * If empty, use the one set for the skill.
 * 
 * @param position
 * @parent <Repeat>
 * @type select
 * @option 0:Overhead @value 0
 * @option 1:Center @value 1
 * @option 2:Foot @value 2
 * @option 3:Screen @value 3
 * @desc The position of the animation.
 * Except for the "screen", only the target number is displayed.
 * 
 * @param interval
 * @parent <Repeat>
 * @type string
 * @desc The interval at which the animation repeats.
 * That time corresponds to one frame of the animation.
 * 
 * @param rate
 * @parent <Repeat>
 * @type string
 * @desc It is the time of one frame of animation.
 * The default value is 4. The drawing is updated every 4/60 seconds.
 * 
 * @param nextDelay
 * @parent <Repeat>
 * @type string
 * @desc This is the time difference for displaying
 * the animation when there are multiple targets.
 * 
 * @param noMirror
 * @parent <Repeat>
 * @type boolean
 * @desc Disables inversion of animation when the target is an actor.
 * 
 * @param damage
 * @parent <Repeat>
 * @type boolean
 * @desc Damage will be done at the end of the animation.
 * If a numeric value is specified, process at that timing.
 * 
 * @param damageAll
 * @parent <Repeat>
 * @type boolean
 * @desc Damage processing without waiting for end of the animation.
 * This is all handled. (Faster normal damage processing)
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
 * @param <Starting Point>
 * @desc Start point related parameters.
 * 
 * @param sx
 * @parent <Starting Point>
 * @type string
 * @desc The X coordinate of the starting point.
 * 
 * @param sy
 * @parent <Starting Point>
 * @type string
 * @desc The Y coordinate of the starting point.
 * 
 * @param sxRandom
 * @parent <Starting Point>
 * @type string
 * @desc Disperses the X coordinate of the starting point
 * to the left and right.
 * 
 * @param syRandom
 * @parent <Starting Point>
 * @type string
 * @desc Disperses the Y coordinate of the starting point
 * up and down.
 * 
 * @param <End Point>
 * @desc End point related parameters.
 * 
 * @param ex
 * @parent <End Point>
 * @type string
 * @desc The X coordinate of the end point.
 * The animation moves from sx to ex.
 * 
 * @param ey
 * @parent <End Point>
 * @type string
 * @desc The Y coordinate of the end point.
 * The animation moves from sy to ey.
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
 * @param arrival
 * @parent <End Point>
 * @type string
 * @desc The frame that reaches the end point.
 * Use this for animations that explode upon impact.
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
 * @param <Afterimage>
 * @desc Items related to afterimages.
 * 
 * @param afterimage
 * @parent <Afterimage>
 * @type string
 * @desc Create an afterimage according to the set number.
 * 
 * @param afterimageInterval
 * @parent <Afterimage>
 * @type string
 * @desc This is the interval at
 * which afterimages are created.
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
 * @desc Change the Z coordinate of animation.
 * The default value is 8. If it is less than 2, it will appear below the battler.
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
 */

/*:ja
 * @plugindesc v1.23 戦闘アニメーションを自動化＆超強化します。
 * @author 砂川赳（http://newrpg.seesaa.net/）
 *
 * @help スキル（アイテム）から自在に戦闘アニメーションを呼び出します。
 * またアニメを移動させることも可能です。
 * 
 * ■できること
 * ・アニメーションの同時呼び出し、大量呼び出し
 * ・射撃・円運動などの移動
 * ・回転率・大きさなどの動的な変更
 * 
 * ■使用方法
 * 例えば、以下のようにスキルのメモ欄へ記入します。
 * 
 * <D-Animation:arcRandomAll/>
 * 
 * arcRandomAllテンプレートの機能によって、
 * 対象全体へアニメーションを投げるような演出になります。
 * さらに詳細なパラメータも設定可能です。
 * 
 * <D-Animation:arcRandomAll> // 全体へ投射
 * id = 82 // 水/単体2（省略時はスキルの設定）
 * repeat = 20 // 繰返回数
 * interval = 1 // 間隔
 * arrival = 7 // 到達フレーム
 * arcY = -200 // 放物線の高さ
 * scaleX = 0.5 // 横幅
 * scaleY = 0.5 // 縦幅
 * </D-Animation>
 * 
 * 大量の泡を敵軍に投げつけ、弾けさせるような演出になります。
 * パラメータによって、内容が変化していきます。
 * 
 * その他にも、当プラグインは非常に多機能となっています。
 * 詳細は以下をご覧ください。
 * http://newrpg.seesaa.net/article/473569739.html
 * 
 * 特に、以下の基本的な使用法が分かりやすいと思います。
 * http://newrpg.seesaa.net/article/473686120.html
 * 
 * ■利用規約
 * 特に制約はありません。
 * 改変、再配布自由、商用可、権利表示も任意です。
 * 作者は責任を負いませんが、不具合については可能な範囲で対応します。
 * 
 * @param templateList
 * @text テンプレート一覧
 * @type struct<DynamicAnimation>[]
 * @default ["{\"templateId\":\"shot\",\"name\":\"射撃\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"a.x\",\"sy\":\"a.y - a.height / 2\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"defaultX\",\"ey\":\"defaultY\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"shotRandom\",\"name\":\"乱射\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"5\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"a.x\",\"sy\":\"a.y - a.height / 2\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"defaultX\",\"ey\":\"defaultY\",\"exRandom\":\"b.width / 3\",\"eyRandom\":\"b.height / 3\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"shotRandomAll\",\"name\":\"全乱射\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"20\",\"limitFlash\":\"4\",\"limitSound\":\"2\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"3\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"a.x\",\"sy\":\"a.y - a.height / 2\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"defaultX\",\"ey\":\"defaultY\",\"exRandom\":\"allRangeX\",\"eyRandom\":\"allRangeY\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"arc\",\"name\":\"投射\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"a.x\",\"sy\":\"a.y - a.height / 2\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"defaultX\",\"ey\":\"defaultY\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"-100\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"arcRandom\",\"name\":\"乱投射\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"5\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"a.x\",\"sy\":\"a.y - a.height / 2\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"defaultX\",\"ey\":\"defaultY\",\"exRandom\":\"b.width / 3\",\"eyRandom\":\"b.height / 3\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"-100\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"arcRandomAll\",\"name\":\"全乱投射\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"20\",\"limitFlash\":\"4\",\"limitSound\":\"2\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"3\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"a.x\",\"sy\":\"a.y - a.height / 2\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"defaultX\",\"ey\":\"defaultY\",\"exRandom\":\"allRangeX\",\"eyRandom\":\"allRangeY\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"-100\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"random\",\"name\":\"ランダム\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"5\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"b.width / 3\",\"syRandom\":\"b.height / 3\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"randomAll\",\"name\":\"全ランダム\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"25\",\"limitFlash\":\"5\",\"limitSound\":\"2\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"3\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"allRangeX\",\"syRandom\":\"allRangeY\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"randomCircle\",\"name\":\"円ランダム\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"25\",\"limitFlash\":\"5\",\"limitSound\":\"2\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"3\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"allRangeX\",\"syRandom\":\"ba.randomY() * Math.sqrt(sxRandom**2 - (defaultX - sx)**2) * (Math.random() < 0.5 ? 1 : -1)\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"rain\",\"name\":\"雨\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"25\",\"limitFlash\":\"5\",\"limitSound\":\"2\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"3\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"defaultX\",\"sy\":\"defaultY - Graphics.boxHeight\",\"sxRandom\":\"allRangeX\",\"syRandom\":\"allRangeY\",\"<End Point>\":\"\",\"ex\":\"sx\",\"ey\":\"sy + Graphics.boxHeight\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"horizontal\",\"name\":\"水平\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"5\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"3\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"(defaultX + 150 * mirroring) - ((b.isActor() ? Graphics.boxWidth : 0) + (defaultX + 150 * mirroring) * mirroring) * (r / repeat) * mirroring\",\"sy\":\"b.y - b.height/2\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"shotHorizontal\",\"name\":\"水平射撃\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"3\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"defaultX + 250 * mirroring\",\"sy\":\"b.y - b.height/2\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"sx - (defaultX + 250 * mirroring) * mirroring\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"vertical\",\"name\":\"垂直\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"5\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"3\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"b.x\",\"sy\":\"Graphics.boxHeight * 1/5 + (r / repeat) * (Graphics.boxHeight / 2)\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"pierce\",\"name\":\"貫通\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"3\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"a.x\",\"sy\":\"a.y - a.height / 2\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"(b.isActor() ? Graphics.boxWidth + 100 : -100)\",\"ey\":\"sy + (b.y - b.height/2 - sy) * (ex - sx) / (b.x - sx)\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"circle\",\"name\":\"円周\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"10\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"100\",\"radiusY\":\"100\",\"radX\":\"(r/repeat * Math.PI*2 - Math.PI/2)\",\"radY\":\"(r/repeat * Math.PI*2 - Math.PI/2)\"}","{\"templateId\":\"vortex\",\"name\":\"渦\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"20\",\"limitFlash\":\"5\",\"limitSound\":\"2\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"100 * (1 - r/repeat)\",\"radiusY\":\"100 * (1 - r/repeat)\",\"radX\":\"(r/repeat * Math.PI*2 - Math.PI/2)\",\"radY\":\"(r/repeat * Math.PI*2 - Math.PI/2)\"}","{\"templateId\":\"spreadVortex\",\"name\":\"発散渦\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"20\",\"limitFlash\":\"5\",\"limitSound\":\"2\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"100 * (r/repeat)\",\"radiusY\":\"100 * (r/repeat)\",\"radX\":\"(r/repeat * Math.PI*2 - Math.PI/2)\",\"radY\":\"(r/repeat * Math.PI*2 - Math.PI/2)\"}","{\"templateId\":\"revolve\",\"name\":\"公転\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"100\",\"radiusY\":\"100\",\"radX\":\"(Math.min(t, arrival)/arrival * Math.PI*2 - Math.PI/2)\",\"radY\":\"(Math.min(t, arrival)/arrival * Math.PI*2 - Math.PI/2)\"}","{\"templateId\":\"moveVortex\",\"name\":\"移動渦\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"100 * (1 - Math.min(t, arrival)/arrival)\",\"radiusY\":\"100 * (1 - Math.min(t, arrival)/arrival)\",\"radX\":\"Math.min(t, arrival)/arrival * Math.PI*2\",\"radY\":\"Math.min(t, arrival)/arrival * Math.PI*2\"}","{\"templateId\":\"spreadMoveVortex\",\"name\":\"発散移動渦\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"100 * (t/et)\",\"radiusY\":\"100 * (t/et)\",\"radX\":\"t/et * Math.PI*2\",\"radY\":\"t/et * Math.PI*2\"}","{\"templateId\":\"breath\",\"name\":\"ブレス\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"20\",\"limitFlash\":\"5\",\"limitSound\":\"2\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"3\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"a.x - a.width/3 * mirroring\",\"sy\":\"a.y - a.height * 2/3\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"defaultX - 250 * mirroring\",\"ey\":\"defaultY\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"allRangeY * 1.5 * t/arrival\",\"radX\":\"\",\"radY\":\"(r/repeat * Math.PI*2 * 1 - Math.PI/2)\"}","{\"templateId\":\"fv_breath\",\"name\":\"FVブレス\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"20\",\"limitFlash\":\"5\",\"limitSound\":\"2\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"3\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"a.x\",\"sy\":\"a.y - a.height * 2/3\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"defaultX\",\"ey\":\"defaultY - 100 * mirroring\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"allRangeX * 1.5 * t/arrival\",\"radiusY\":\"\",\"radX\":\"(r/repeat * Math.PI*2 * 1 - Math.PI/2)\",\"radY\":\"\"}","{\"templateId\":\"converge\",\"name\":\"収束\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"40\",\"limitFlash\":\"10\",\"limitSound\":\"5\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"1/2\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"true\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"da.startRotation(Math.atan2(this.y - ey, this.x - ex))\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"500 * (1 - Math.min(t, arrival)/arrival)\",\"radiusY\":\"500 * (1 - Math.min(t, arrival)/arrival)\",\"radX\":\"da.startRandom() * Math.PI * 2\",\"radY\":\"da.startRandom() * Math.PI * 2\"}","{\"templateId\":\"radiate\",\"name\":\"放射\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"40\",\"limitFlash\":\"10\",\"limitSound\":\"5\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"1/2\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"true\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"Math.atan2(sy - this.y, sx - this.x)\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"500 * Math.min(t, arrival)/arrival\",\"radiusY\":\"500 * Math.min(t, arrival)/arrival\",\"radX\":\"da.startRandom() * Math.PI * 2\",\"radY\":\"da.startRandom() * Math.PI * 2\"}","{\"templateId\":\"beam\",\"name\":\"ビーム\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"true\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"a.x\",\"sy\":\"a.y - a.height / 2\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"Math.atan2(sy - defaultY, sx - defaultX)\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"diffusionBeam\",\"name\":\"拡散ビーム\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"20\",\"limitFlash\":\"4\",\"limitSound\":\"2\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"true\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"a.x\",\"sy\":\"a.y - a.height / 2\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"(Math.atan2(sy - defaultY, sx - defaultX) + da.startRandom() * Math.PI/2 - Math.PI/4)\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"keep\",\"name\":\"継続\",\"condition\":\"\",\"delay\":\"dataA[no-1].list[0].frame\",\"wait\":\"\",\"repeat\":\"dataA[no-1].repeat\",\"limitFlash\":\"dataA[no-1].limitFlash\",\"limitSound\":\"dataA[no-1].limitSound\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"dataA[no-1].list[r].id\",\"position\":\"dataA[no-1].list[r].position\",\"interval\":\"dataA[no-1].list[r].interval\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"dataA[no-1].list[r].ex\",\"sy\":\"dataA[no-1].list[r].ey\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"boomerang\",\"name\":\"ブーメラン\",\"condition\":\"\",\"delay\":\"dataA[no-1].frame\",\"wait\":\"\",\"repeat\":\"dataA[no-1].repeat\",\"limitFlash\":\"dataA[no-1].limitFlash\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"dataA[no-1].list[r].id\",\"position\":\"dataA[no-1].list[r].position\",\"interval\":\"dataA[no-1].list[r].interval\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"dataA[no-1].list[r].ex\",\"sy\":\"dataA[no-1].list[r].ey\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"dataA[no-1].list[r].sx\",\"ey\":\"dataA[no-1].list[r].sy\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"dataA[no-1].list[r].arrival\",\"arcX\":\"dataA[no-1].list[r].arcX * -1\",\"arcY\":\"dataA[no-1].list[r].arcY * -1\",\"<Afterimage>\":\"\",\"afterimage\":\"dataA[no-1].list[r].afterimage\",\"afterimageInterval\":\"dataA[no-1].list[r].afterimageInterval\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"eval(dataA[no-1].list[r].addX) * -1\",\"addY\":\"eval(dataA[no-1].list[r].addY) * -1\",\"scaleX\":\"eval(dataA[no-1].list[r].scaleX)\",\"scaleY\":\"eval(dataA[no-1].list[r].scaleY)\",\"rotation\":\"eval(dataA[no-1].list[r].rotation)\",\"opacity\":\"eval(dataA[no-1].list[r].opacity)\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"spell\",\"name\":\"魔法発動\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"(isSync ? 0 : \\\"auto\\\")\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"a\",\"<Repeat>\":\"\",\"id\":\"52\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"defaultX\",\"sy\":\"defaultY\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"follow\",\"name\":\"追従\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"b.x\",\"dy\":\"b.y - (position == 0 ? b.height : position == 1 ? b.height/2 : 0)\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"self\",\"name\":\"自分\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"a\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"lookCourse\",\"name\":\"進路を向く\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"true\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"(this.beforeY == this.y && this.beforeX == this.x ? this.rotation : Math.atan2(this.beforeY - this.y, this.beforeX - this.x))\",\"opacity\":\"(t == 0 ? 0 : 255)\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"roll\",\"name\":\"回転\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"Math.min(t, arrival) / arrival * Math.PI * 2 * mirroring\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"screen\",\"name\":\"画面\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"3\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"Graphics.width / 2\",\"sy\":\"Graphics.height / 2\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"wait\",\"name\":\"ウェイト\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"auto\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"delay\",\"name\":\"ディレイ\",\"condition\":\"\",\"delay\":\"auto\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"damage\",\"name\":\"ダメージ\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"true\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"damageAll\",\"name\":\"全体ダメージ\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"true\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"head\",\"name\":\"頭上\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"0\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"center\",\"name\":\"中央\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"1\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"foot\",\"name\":\"足元\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"2\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"whole\",\"name\":\"全体\",\"condition\":\"\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"3\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"ifBattle\",\"name\":\"戦闘中\",\"condition\":\"$gameParty.inBattle()\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}","{\"templateId\":\"ifMap\",\"name\":\"マップ中\",\"condition\":\"!$gameParty.inBattle()\",\"delay\":\"\",\"wait\":\"\",\"repeat\":\"\",\"limitFlash\":\"\",\"limitSound\":\"\",\"target\":\"\",\"<Repeat>\":\"\",\"id\":\"\",\"position\":\"\",\"interval\":\"\",\"rate\":\"\",\"nextDelay\":\"\",\"noMirror\":\"\",\"damage\":\"\",\"damageAll\":\"\",\"commonEvent\":\"\",\"script\":\"\",\"plugin\":\"\",\"<Starting Point>\":\"\",\"sx\":\"\",\"sy\":\"\",\"sxRandom\":\"\",\"syRandom\":\"\",\"<End Point>\":\"\",\"ex\":\"\",\"ey\":\"\",\"exRandom\":\"\",\"eyRandom\":\"\",\"arrival\":\"\",\"arcX\":\"\",\"arcY\":\"\",\"<Afterimage>\":\"\",\"afterimage\":\"\",\"afterimageInterval\":\"\",\"<Real Time>\":\"\",\"dx\":\"\",\"dy\":\"\",\"addX\":\"\",\"addY\":\"\",\"scaleX\":\"\",\"scaleY\":\"\",\"rotation\":\"\",\"opacity\":\"\",\"color\":\"\",\"z\":\"\",\"scriptRT\":\"\",\"<Real Time Circle>\":\"\",\"radiusX\":\"\",\"radiusY\":\"\",\"radX\":\"\",\"radY\":\"\"}"]
 * @desc 定義されたテンプレートアニメーションの一覧です。
 * 新しいテンプレートの追加も可能です。
 * 
 * @param shortTagName
 * @text 省略タグ名
 * @type string
 * @default da
 * @desc タグ名を指定した文字列で省略できるようにします。
 * 例：<D-Animation:shot/> -> <da:shot/>
 * 
 * @param referenceBattler
 * @text 参照先バトラー(a, b)
 * @type select
 * @option 0:Sprite_Battler @value 0
 * @option 1:Game_Battler @value 1
 * @default 1
 * @desc 参照先（a, b）として使用するバトラー情報の型です。
 * 1:Game_Battlerなら『a.x』『a.atk』等の参照が両立できます。
 * 
 * @param <Animation Position>
 * @text ＜アニメーション位置＞
 * @desc アニメーションの位置関連の項目です。
 * 
 * @param screenX
 * @text 画面アニメの表示Ｘ座標
 * @parent <Animation Position>
 * @type string
 * @default ($gameSystem.isSideView() ? Graphics.boxWidth / 4 + 48 : Graphics.boxWidth / 2)
 * @desc 位置が『画面』のアニメーションを表示する標準Ｘ座標です。
 * 対象がアクターの場合は座標を左右反転します。
 * 
 * @param screenY
 * @text 画面アニメの表示Ｙ座標
 * @parent <Animation Position>
 * @type string
 * @default ($gameSystem.isSideView() ? Graphics.boxHeight / 3 + 24 : Graphics.boxHeight / 2)
 * @desc 位置が『画面』のアニメーションを表示する標準Ｙ座標です。
 * 
 * @param allRangeX
 * @text 全体アニメのＸ座標範囲
 * @parent <Animation Position>
 * @type string
 * @default ($gameSystem.isSideView() ? Graphics.boxWidth / 4 : Graphics.boxWidth / 3)
 * @desc 全体系アニメを表示する横の範囲です。
 * いくつかのテンプレートがこの値を参照します。
 * 
 * @param allRangeY
 * @text 全体アニメのＹ座標範囲
 * @parent <Animation Position>
 * @type string
 * @default ($gameSystem.isSideView() ? Graphics.boxHeight / 4 : Graphics.boxHeight / 6)
 * @desc 全体系アニメを表示する縦の範囲です。
 * いくつかのテンプレートがこの値を参照します。
 * 
 * @param mirrorAdjustX
 * @text Ｘ座標の反転後調整
 * @parent <Animation Position>
 * @type string
 * @desc 対象が味方のアニメーション位置を反転する際、
 * 画面アニメの表示Ｘ座標を数値分だけずらします。
 * 
 * @param mirrorAdjustY
 * @text Ｙ座標の反転後調整
 * @parent <Animation Position>
 * @type string
 * @desc 対象が味方のアニメーション位置を反転する際、
 * 画面アニメの表示Ｙ座標を数値分だけずらします。
 * 
 * @param randomAdjust
 * @text バラマキ調整
 * @parent <Animation Position>
 * @type number
 * @min 0
 * @max 1
 * @decimals 2
 * @desc ランダム計算時の乱数を作為的に分散させます。
 * 0.20なら20%以上、前回位置から離します。
 * 
 * @param considerTargetScale
 * @text 対象の拡大率を考慮
 * @parent <Animation Position>
 * @type boolean
 * @default true
 * @desc アニメーションの位置計算時に対象の拡大率を考慮します。
 * この項目はDynamicMotionにも適用されます。
 * 
 * @param <For FrontView>
 * @text ＜フロントビュー用＞
 * @desc フロントビュー関連の項目です。
 * 
 * @param fvActorHomeX
 * @text アクターＸ座標（フロントビュー）
 * @parent <For FrontView>
 * @type string
 * @default Graphics.boxWidth / 2
 * @desc フロントビュー時、アクターのＸ座標位置を設定します。
 * 通常、アクターは透明ですが、アニメの表示に関わります。
 * 
 * @param fvActorHomeY
 * @text アクターＹ座標（フロントビュー）
 * @parent <For FrontView>
 * @type string
 * @default Graphics.boxHeight * 7/10
 * @desc フロントビュー時、アクターのＹ座標位置を設定します。
 * 通常、アクターは透明ですが、アニメの表示に関わります。
 * 
 * @param <Conflict>
 * @text ＜競合対策＞
 * @desc プラグインの競合対策関連の項目です。
 * 
 * @param conflictMode
 * @text 競合対策モード
 * @parent <Conflict>
 * @type select
 * @option 0:標準 @value 0
 * @option 1:showNormalAnimationから分岐 @value 1
 * @default 0
 * @desc 競合対策用に処理を変更します。
 * 1ならYEP_BattleEngineCoreも動くかも……。
 * 
 * @param ignoreCondition
 * @text 除外条件
 * @parent <Conflict>
 * @type string[]
 * @default ["BattleManager._actSeq && BattleManager._actSeq[0].toUpperCase() === 'CAST ANIMATION'"]
 * @desc 条件を満たす場合、当アニメーションの実行をしません。
 */
/*~struct~DynamicAnimation:ja
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
 * @param condition
 * @text 実行条件
 * @type string
 * @desc 実行条件です。
 * この条件を満たさない場合、アニメーションを実行しません。
 * 
 * @param delay
 * @text ディレイ（遅延）
 * @type string
 * @desc アニメーション表示前の待機フレームです。
 * autoにすると前アニメーションの終了を待ちます。
 * 
 * @param wait
 * @text ウェイト
 * @type string
 * @desc アニメーションを表示後の待機フレームです。
 * autoにするとこのアニメーションの終了を待ちます。
 * 
 * @param repeat
 * @text リピート回数
 * @type string
 * @desc アニメーションの繰り返し回数です。
 * 
 * @param limitFlash
 * @text フラッシュ制限
 * @type string
 * @desc 設定した数値によってフラッシュ処理を制限します。
 * 値が2なら、フラッシュ回数が1/2になります。
 * 
 * @param limitSound
 * @text 効果音制限
 * @type string
 * @desc 設定した数値によって効果音を制限します。
 * 値が2なら、演奏回数が1/2になります。
 * 
 * @param target
 * @text 対象変更
 * @type string
 * @desc アニメーションの表示を指定した対象へ変更します。
 * バトラーまたはその配列を指定可能です。
 * 
 * @param <Repeat>
 * @text ＜リピート＞
 * @desc リピートごとに処理される基本設定です。
 * 
 * @param id
 * @text アニメーションＩＤ
 * @parent <Repeat>
 * @type animation
 * @desc 呼び出すアニメーションのＩＤです。
 * 空ならばスキルに設定されたものを使用します。
 * 
 * @param position
 * @text アニメーション位置
 * @parent <Repeat>
 * @type select
 * @option 0:頭上 @value 0
 * @option 1:中央 @value 1
 * @option 2:足元 @value 2
 * @option 3:画面 @value 3
 * @desc アニメーションの位置です。0:頭上, 1:中心, 2:足元, 3:画面。
 * 画面以外は対象の人数分表示します。
 * 
 * @param interval
 * @text 間隔
 * @parent <Repeat>
 * @type string
 * @desc アニメーションを繰り返す間隔です。
 * 時間はアニメーションの1フレームに対応します。
 * 
 * @param rate
 * @text 描画レート
 * @parent <Repeat>
 * @type string
 * @desc アニメーション１フレームの表示時間です。
 * 初期値は4。つまり4/60秒単位で描画を更新します。
 * 
 * @param nextDelay
 * @text 対象毎の時間差
 * @parent <Repeat>
 * @type string
 * @desc 対象が複数の場合にアニメーションを表示する時間差です。
 * アニメーション位置が画面の場合には意味がありません。
 * 
 * @param noMirror
 * @text 反転無効化
 * @parent <Repeat>
 * @type boolean
 * @desc 対象がアクターの際、アニメの表示反転を無効化します。
 * 左右反転による表示崩れが起こる場合に。
 * 
 * @param damage
 * @text ダメージ処理
 * @parent <Repeat>
 * @type boolean
 * @desc アニメーションの終了に合わせてダメージ処理を行います。
 * また数値を指定すれば、そのタイミングで処理を行います。
 * 
 * @param damageAll
 * @text 全体ダメージ処理
 * @parent <Repeat>
 * @type boolean
 * @desc 全アニメーションの終了を待たずにダメージ処理を行います。
 * こちらは全て処理します。（通常のダメージ処理を早める）
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
 * @param <Starting Point>
 * @text ＜始点＞
 * @desc 始点関連のパラメータです。
 * 
 * @param sx
 * @text 始点Ｘ座標
 * @parent <Starting Point>
 * @type string
 * @desc 始点のＸ座標です。
 * 
 * @param sy
 * @text 始点Ｙ座標
 * @parent <Starting Point>
 * @type string
 * @desc 始点のＹ座標です。
 * 
 * @param sxRandom
 * @text 始点Ｘ座標の分散値
 * @parent <Starting Point>
 * @type string
 * @desc 始点のＸ座標を左右に分散させます。
 * 値が100なら-100～100の200ピクセル分散します。
 * 
 * @param syRandom
 * @text 始点Ｙ座標の分散値
 * @parent <Starting Point>
 * @type string
 * @desc 始点のＹ座標を上下に分散させます。
 * 値が100なら-100～100の200ピクセル分散します。
 * 
 * @param <End Point>
 * @text ＜終点＞
 * @desc 終点関連のパラメータです。
 * 
 * @param ex
 * @text 終点Ｘ座標
 * @parent <End Point>
 * @type string
 * @desc 終点のＸ座標です。
 * これを入力すれば始点から終点へアニメが移動します。
 * 
 * @param ey
 * @text 終点Ｙ座標
 * @parent <End Point>
 * @type string
 * @desc 終点のＹ座標です。
 * これを入力すれば始点から終点へアニメが移動します。
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
 * @param arrival
 * @text 到達フレーム
 * @parent <End Point>
 * @type string
 * @desc 終点に到達するフレームです。
 * 着弾して爆発するアニメーションなどに使います。
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
 * @param <Afterimage>
 * @text ＜残像＞
 * @desc 残像関連の項目です。
 * 
 * @param afterimage
 * @text 残像数
 * @parent <Afterimage>
 * @type string
 * @desc 設定した数に応じて、残像を作成します。
 * 数が多いほど重くなるので注意です。
 * 
 * @param afterimageInterval
 * @text 残像の間隔
 * @parent <Afterimage>
 * @type string
 * @desc 残像を作成する間隔です。
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
 * @desc アニメーションのＺ座標（表示優先度）を変更します。
 * 初期値は8です。2以下でバトラーより下に表示されます。
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
 */

 // 連携用に値を保持
var Nrp = Nrp || {};

/**
 * ●動的アニメーションの基本パラメータと機能を持つクラス
 * <D-Animation>タグそのものに対応する。
 */
function BaseAnimation() {
    this.initialize(...arguments);
}

/**
 * ●動的アニメーションの動的パラメータを持つクラス
 * こちらは繰り返しごとに保有し、Sprite_Animationへ引き渡すもの。
 */
function DynamicAnimation() {
    this.initialize(...arguments);
}

(function() {
"use strict";

/**
 * バージョン互換対応
 */
if (!Array.prototype.find) {
    Array.prototype.find = function (predicate) {
        if (this === null) {
            throw new TypeError('Array.prototype.find called on null or undefined');
        }
        if (typeof predicate !== 'function') {
            throw new TypeError('predicate must be a function');
        }
        var list = Object(this);
        var length = list.length >>> 0;
        var thisArg = arguments[1];
        var value;

        for (var i = 0; i < length; i++) {
            value = list[i];
            if (predicate.call(thisArg, value, i, list)) {
                return value;
            }
        }
        return undefined;
    };
}

/**
 * ●構造体をJSで扱えるように変換
 */
function parseStruct1(arg) {
    var ret = [];

    JSON.parse(arg).forEach(function(str) {
        ret.push(str);
    });

    return ret;
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

var parameters = PluginManager.parameters("NRP_DynamicAnimation");
var pTemplateList = parseStruct2(parameters["templateList"]);
var pShortTagName = parameters["shortTagName"];
var pReferenceBattler = toNumber(parameters["referenceBattler"], 0);
// アニメーション位置
var pScreenX = setDefault(parameters["screenX"], "($gameSystem.isSideView() ? Graphics.boxWidth / 4 + 48 : Graphics.boxWidth / 2)");
var pScreenY = setDefault(parameters["screenY"], "($gameSystem.isSideView() ? Graphics.boxHeight / 3 + 24 : Graphics.boxHeight / 2)");
var pAllRangeX = setDefault(parameters["allRangeX"], "($gameSystem.isSideView() ? Graphics.boxWidth / 4 : Graphics.boxWidth / 3)");
var pAllRangeY = setDefault(parameters["allRangeY"], "($gameSystem.isSideView() ? Graphics.boxHeight / 4 : Graphics.boxHeight / 6)");
var pMirrorAdjustX = parameters["mirrorAdjustX"];
var pMirrorAdjustY = parameters["mirrorAdjustY"];
var pRandomAdjust = toNumber(parameters["randomAdjust"], 0);
var pConsiderTargetScale = toBoolean(parameters["considerTargetScale"], true);
// フロントビュー関連
var pFvActorHomeX = parameters["fvActorHomeX"];
var pFvActorHomeY = parameters["fvActorHomeY"];
// 競合対策
var pConflictMode = toNumber(parameters["conflictMode"], 0);
var pIgnoreCondition = parseStruct1(parameters["ignoreCondition"]);
// DynamicMotionへ連携
Nrp.pReferenceBattler = pReferenceBattler;
// 以下は主にプラグインパラメータで参照する。
var defaultScreenX;
var defaultScreenY;
var allRangeX;
var allRangeY;

const TAG_NAME = "D-Animation";
const MOTION_TAG_NAME = "D-Motion";
const SETTING_TAG_NAME = "D-Setting";

/**
 * 競合対策モード==0の場合
 */
if (pConflictMode == 0) {
    /**
     * ●アクション開始
     */
    const _Window_BattleLog_startAction = Window_BattleLog.prototype.startAction;
    Window_BattleLog.prototype.startAction = function(subject, action, targets) {
        _Window_BattleLog_startAction.apply(this, arguments);

        var item = action.item();

        // DynamicAnimationの対象ならば
        if (action.isDynamicAnimation(item.animationId)) {
            // 競合を抑えるため、this.push()の格納先であるthis._methodsを直接書き換える。
            let newMethods = [];
            for (const method of this._methods) {
                // showAnimationをstartShowDynamicAnimationに差し替える。
                if (method.name == "showAnimation") {
                    this._methods.push({
                        name: "startShowDynamicAnimation",
                        params: [subject, targets.clone(), item.animationId]
                    });
                    continue;
                }
                newMethods.push(method);
            }
            this._methods = newMethods;
        }
    };

    /**
     * 【独自実装】動的アニメーションの表示開始
     */
    Window_BattleLog.prototype.startShowDynamicAnimation = function(subject, targets, animationId) {
        if (animationId < 0) {
            this.showAttackDynamicAnimation(subject, targets);
        } else {
            this.showDynamicAnimation(targets, BattleManager._action);
        }
    };
    
    /**
     * 【独自実装】動的アニメーションの通常攻撃
     */
    Window_BattleLog.prototype.showAttackDynamicAnimation = function(subject, targets) {
        if (subject.isEnemy()) {
            SoundManager.playEnemyAttack();
        }
        this.showDynamicAnimation(targets, BattleManager._action, false);
    };
}

/**
 * 競合対策モード==1の場合
 * ※こちらの方法の場合、通常以外の経路からshowNormalAnimationが呼び出された場合も、
 * 　DynamicAnimationが起動してしまう問題がある。
 */
if (pConflictMode == 1) {
    /**
     * ●アニメーションの再生
     */
    var Window_BattleLog_showNormalAnimation = Window_BattleLog.prototype.showNormalAnimation;
    Window_BattleLog.prototype.showNormalAnimation = function (targets, animationId, mirror) {
        var action = BattleManager._action;
        // タグがあれば、動的アニメーションを呼び出し
        if (action.isDynamicAnimation(animationId)) {
            this.showDynamicAnimation(targets, action, mirror);
            return;
        }

        // 元処理実行
        Window_BattleLog_showNormalAnimation.call(this, targets, animationId, mirror);
    };
}

/**
 * 【独自】アニメーションの再生
 */
Window_BattleLog.prototype.showDynamicAnimation = function (targets, action, mirror, mapAnimation) {
    // ここでevalしておく。
    defaultScreenX = eval(pScreenX);
    defaultScreenY = eval(pScreenY);
    allRangeX = eval(pAllRangeX);
    allRangeY = eval(pAllRangeY);

    // タグの中身を取得して配列化
    var dynamicActions = getTagDynamicAnimation(action, mirror);

    // アニメーションの設定を保持する配列
    var dataA = [];
    // モーションの設定を保持する配列
    var dataM = [];
    // 動的アニメーションの実行用リスト
    var dynamicAnimationList = [];
    // 動的モーションの実行用リスト
    var dynamicMotionList = [];
    // 画像読込用のアニメーションリスト
    var animationList = [];
    // 全体ウェイト
    var allWait = 0;
    // 直近のフレーム数
    var lastFrame = 0;

    const spriteset = getSpriteset();
    // アニメーションの基本ディレイ
    var animationBaseDelay = this.animationBaseDelay();
    // 対象ごとのディレイ
    var animationNextDelay = this.animationNextDelay();

    /*
     * タグが複数ある場合を想定してループする。
     */
    for (var i = 0; i < dynamicActions.length; i++) {
        var baseData = dynamicActions[i];

        // 各項目の保持
        baseData.allWait = allWait;
        baseData.lastFrame = lastFrame;
        baseData.animationBaseDelay = animationBaseDelay;
        baseData.animationNextDelay = animationNextDelay;
        baseData.defaultScreenX = defaultScreenX;
        baseData.defaultScreenY = defaultScreenY;
        baseData.mirrorAdjustX = pMirrorAdjustX;
        baseData.mirrorAdjustY = pMirrorAdjustY;
        baseData.targets = targets;
        baseData.action = action;
        // マップ用の情報（DynamicAnimationMapから設定）
        baseData.mapAnimation = mapAnimation;

        // 最終要素かつウェイト設定がない場合、autoを設定
        if (i == dynamicActions.length -1 && baseData.wait == undefined) {
            baseData.wait = "auto";
        }

        // アニメーションの場合
        if (baseData.type == "animation") {
            baseData.makeAnimation(dataA, mirror, dynamicAnimationList, animationList);

        // モーションの場合
        } else if (baseData.type == "motion") {
            baseData.makeMotion(dataM, dataA, dynamicMotionList);
        }

        // これまでの合計ウェイトを加算
        allWait += baseData.calcWait;
        // 直近のフレーム数
        lastFrame = baseData.frame;
    }

    // 使用する画像を一括読込
    animationList.forEach(function (animation) {
        var name1 = animation.animation1Name;
        var name2 = animation.animation2Name;
        var hue1 = animation.animation1Hue;
        var hue2 = animation.animation2Hue;
        ImageManager.loadAnimation(name1, hue1);
        ImageManager.loadAnimation(name2, hue2);

        // 効果音の事前読込
        animation.timings.forEach(function(timing) {
            if (timing.se) {
                AudioManager.preloadSe(timing.se);
            }
        });
    });

    // Spriteset_Battleで制御を行うためのフラグ
    spriteset._requestDynamicAnimation = true;
    spriteset._isDynamicAnimationReady = false;

    // アニメーションなしの場合は最初から準備完了に
    if (animationList.length == 0) {
        spriteset._isDynamicAnimationReady = true;

    // 画像読込状態チェック
    } else if (ImageManager.isReady()) {
        // 既に読込完了なら即true
        spriteset._isDynamicAnimationReady = true;
    }

    // targetDelayの昇順でソートする。
    dynamicAnimationList.sort(function(a, b) {
        return a.targetDelay - b.targetDelay;
    });
    dynamicMotionList.sort(function(a, b) {
        return a.targetDelay - b.targetDelay;
    });

    // 動的アニメーションを順番に表示実行
    dynamicAnimationList.forEach(function (dynamicAnimation) {
        dynamicAnimation.target.setDynamicAnimation(dynamicAnimation);
    });
    // 動的モーションを順番に表示実行
    dynamicMotionList.forEach(function (dynamicMotion) {
        // 無効な場合は処理しない
        // ※マップ版DynamicMotionが未登録の場合
        if (dynamicMotion.performer.setDynamicMotion) {
            dynamicMotion.performer.setDynamicMotion(dynamicMotion);
        }
    });
};

/**
 * ●動的アニメーションかの判定処理
 */
Game_Action.prototype.isDynamicAnimation = function(animationId) {
    // 除外条件に該当した場合は処理しない。
    if (pIgnoreCondition) {
        for (var  i = 0; i < pIgnoreCondition.length; i++) {
            var condition = pIgnoreCondition[i];
            if (eval(condition)) {
                return false;
            }
        }
    }

    // 通常攻撃かつID=0ならば除外。
    // この処置がないと二刀流の二撃目が常に表示されてしまう。
    if (this.isAttack() && animationId == 0) {
        return false;
    }

    return this.hasDynamicAnimationTag();
};

/**
 * ●動的アニメーションタグが存在するかどうか？
 */
Game_Action.prototype.hasDynamicAnimationTag = function() {
    var item = this.item();
    var note = item.note;

    // 省略タグを考慮
    var tagNameSet = "(?:" + TAG_NAME + ")";
    if (pShortTagName) {
        tagNameSet = "(?:" + TAG_NAME + "|" + pShortTagName + ")";
    }

    // モーション用省略タグがあれば考慮
    // 『Nrp.』はDynamicMotion側で定義
    var motionTagNameSet = "(?:" + MOTION_TAG_NAME + ")";
    if (typeof Nrp != "undefined" && Nrp.shortMotionTagName) {
        motionTagNameSet = "(?:" + MOTION_TAG_NAME + "|" + Nrp.shortMotionTagName + ")";
    }

    // 開始タグがあればtrue
    if (note.match("<" + tagNameSet) || note.match("<" + motionTagNameSet)) {
        return true;
    }
    return false;
};

/**
 * ●メモ欄からタグの中身を取得する。
 * <TagName>～</TagName>
 */
function getTagDynamicAnimation(action, mirror) {
    const item = action.item();
    const subject = action.subject();

    var animationId;
    // 通常攻撃
    if (item.animationId < 0) {
        // 二刀流の二撃目
        if (mirror) {
            animationId = subject.attackAnimationId2();
        // 通常
        } else {
            animationId = subject.attackAnimationId1();
        }
    // スキル
    } else {
        animationId = item.animationId;
    }

    // 全体配列
    var dynamicAnimationArray = [];
    // 命令内容を保持するオブジェクト
    var baseAnimation = new BaseAnimation(animationId);

    // モーション連携用
    // NRP_DynamicMotion.jsがオフならば実行しない
    var baseMotion;
    if (typeof BaseMotion != "undefined") {
        baseMotion = new BaseMotion(animationId);
    }

    // メモ欄の中身を取得（改行で分割して配列化）
    const noteSplit = action.getDynamicNote().split("\n");

    // DynamicAnimationの取得数
    var animationCount = 0;

    // メモ欄を改行で分割ループ
    for (var no = 0; no < noteSplit.length; no++) {
        var result = baseAnimation.readNote(noteSplit, no);

        // タグが閉じたならば、次のBaseAnimationへ
        if (result) {
            dynamicAnimationArray.push(baseAnimation);
            baseAnimation = new BaseAnimation(animationId);
            animationCount++;
        }

        // モーション連携用
        if (baseMotion) {
            result = baseMotion.readNote(noteSplit, no);

            // タグが閉じたならば、次のBaseAnimationへ
            if (result) {
                dynamicAnimationArray.push(baseMotion);
                baseMotion = new BaseMotion(animationId);
            }
        }
    }

    // アニメーションが0件の場合、末尾に１件追加
    if (animationCount == 0) {
        baseAnimation = new BaseAnimation(animationId);
        baseAnimation.delay = "auto";
        dynamicAnimationArray.push(baseAnimation);
    }

    return dynamicAnimationArray;
}

/**
 * 【独自実装】エラーにならないように。
 */
Game_Battler.prototype.attackAnimationId1 = function() {
    return 0;
};
Game_Battler.prototype.attackAnimationId2 = function() {
    return 0;
};

/**
 * ●初期化処理
 */
BaseAnimation.prototype.initialize = function (animationId) {
    this.type = "animation";

    // DynamicAnimationを保有するリスト
    this.list = [];

    this.sxRandom = 0;
    this.syRandom = 0;
    this.exRandom = 0;
    this.eyRandom = 0;
    this.arcX = 0;
    this.arcY = 0;

    this.id = animationId;
    this.delay = 0;
    this.repeat = 1;
    this.interval = 1;

    this.addX = 0;
    this.addY = 0;

    this.totalDuration = 0;
    this.baseDuration = 0;
    this.contentMode = false;
};

/**
 * 【独自】メモ欄読込処理
 */
Game_Action.prototype.getDynamicNote = function () {
    return this.item().note;
};

/**
 * ●テンプレート内容を元にアニメーションの基本パラメータを設定する。
 */
BaseAnimation.prototype.readNote = function (noteSplit, no) {
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

    // 全体配列に追加せず、そのまま続ける。
    return false;
};

/**
 * ●プラグインパラメータのテンプレートを呼び出す
 */
BaseAnimation.prototype.callTemplate = function (templateStr) {
    // &で分割
    var tempSplit = templateStr.split("&");

    // 前から順番に読み込む
    tempSplit.forEach(function(key) {
        var template;
        // 空白除去
        key = key.trim();
        // ＩＤおよび名前と一致するテンプレートを取得
        for (var i = 0; i < pTemplateList.length; i++) {
            var t = pTemplateList[i];
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
    }, this);
};

/**
 * ●テンプレート内容を元にアニメーションの基本パラメータを設定する。
 */
BaseAnimation.prototype.setTemplate = function (template) {
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
BaseAnimation.prototype.setContent = function (valueLine) {
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
BaseAnimation.prototype.calcBasicBefore = function (targets) {
    // eval参照用
    var a = this.getReferenceSubject()
    var b = getReferenceBattler(targets[0]);

    var no = this.no;
    var dataA = this.dataA;

    var delay = this.evalTimingStr(this.delay);
    this.delay = delay;

    // "auto"ならば前回フレーム数とウェイト合計の大きいほうを取得
    if (delay == "auto") {
        this.calcDelay = Math.max(this.lastFrame, this.allWait);

    // それ以外はディレイ＋ウェイト合計
    } else {
        this.calcDelay = Number(delay) + this.allWait;
    }

    // リピート回数
    var repeat = this.repeat;
    this.repeat = eval(repeat);
    // フラッシュ・効果音制限
    this.limitFlash = eval(this.limitFlash);
    this.limitSound = eval(this.limitSound);

    // 対象の変更処理
    // SpriteでもBattlerでも受け付ける。
    if (this.target) {
        var changeTarget = eval(this.target);
        // 配列でなければ配列変換
        if (!Array.isArray(changeTarget)) {
            changeTarget = [changeTarget];
        }

        this.targets = [];
        changeTarget.forEach(function(t) {
            // Spriteの場合
            if (t.spriteId != undefined) {
                if ($gameParty.inBattle()) {
                    this.targets.push(t._battler);
                } else {
                    this.targets.push(t._character);
                }

            // Battlerの場合
            } else {
                // 互換用ダミーの場合（TODO: 将来的には消したい）
                if (t._isDynamicDummy) {
                    if (t.isActor()) {
                        this.targets.push($gameActors.actor(t._actorId));
                    } else {
                        this.targets.push($gameTroop.members()[t.index()]);
                    }
                    
                // 正常なデータの場合
                } else {
                    this.targets.push(t);
                }
            }
        }, this);

    // 通常はそのままBaseAnimationに設定する。
    } else {
        this.targets = targets;
    }
};

/**
 * ●基本項目の計算を行う。（処理後）
 */
BaseAnimation.prototype.calcBasicAfter = function () {
    // 未設定なら０として扱う
    if (this.wait == undefined) {
        this.wait = 0;
    }
    var wait = this.evalTimingStr(this.wait);
    this.wait = wait;

    // "auto"ならば終了フレーム数を取得
    if (wait == "auto") {
        this.calcWait = this.frame - this.allWait;
    // ウェイト指定時
    } else {
        // 数値が文字列として渡るパターンがあるので確実に数値変換
        this.calcWait = Number(wait);
    }

    // ここで最初のDynamicAnimationにbaseDurationを設定
    // 先頭のアニメのみ最大時間を設定
    if (this.list.length) {
        // 先頭要素に設定したウェイトを指定
        const dynamicAnimation = this.list[0];

        // "auto"ならば終了フレーム数を取得
        if (wait == "auto") {
            dynamicAnimation.waitDuration = this.baseDuration;
        // ウェイト指定時
        } else {
            dynamicAnimation.waitDuration = this.calcWait * this.basicRate;
        }
    }
};

/**
 * ●ウェイト、ディレイについて有効な文字列を取得する。
 * ※数式として取得できない場合は、そのまま文字列取得
 */
BaseAnimation.prototype.evalTimingStr = function (arg) {
    var retValue;

    // eval参照用
    const no = this.no;
    const dataA = this.dataA;
    const dataM = this.dataM;
    const delay = this.delay;
    const arrival = this.arrival;
    const interval = this.interval;
    const repeat = this.repeat;
    
    var isSync = false;
    // Syncの設定を読込
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
 * ●アニメーションの生成開始
 */
BaseAnimation.prototype.makeAnimation = function (dataA, mirror, dynamicAnimationList, animationList) {
    // eval参照用
    const a = this.getReferenceSubject();
    this.referenceSubject = a;

    let targets = this.targets;
    // 対象がいなければとりあえず行動主体を設定
    // ※範囲なしの場合を想定
    if (targets.length === 0) {
        targets = [BattleManager._subject];
    }

    // この時点では対象未確定だが、とりあえず先頭を取得
    const b = getReferenceBattler(targets[0]);
    this.referenceTarget = b;

    // アニメーションとモーションで別のため、番号を取得する。
    const no = dataA.length;
    this.no = no;
    // 親要素への参照を作成。
    this.dataA = dataA;
    // 計算ウェイトの初期値
    this.calcWait = 0;
    // 数値として間隔を計算できる場合はあらかじめしておく
    this.interval = evalNumber(this.interval);

    // 基本項目の事前計算
    this.calcBasicBefore(targets);

    // 左右反転設定
    this.mirror = mirror;

    // Sprite_Animationから基本レートを取得
    var spriteAnimation = new Sprite_Animation();
    spriteAnimation.setupRate();
    var basicRate = spriteAnimation._rate;
    this.basicRate = basicRate;

    // 設定したdelayの分だけ遅らせる。（rateをかけた値）
    this.delaySum = this.animationBaseDelay + this.calcDelay * basicRate;

    // リピート回数だけ実行（r = 現在のリピート回数）
    for (var r = 0; r < this.repeat; r++) {
        // リピートごとにevalする。
        const id = eval(this.id);
        // アニメーションを取得
        const animation = this.getAnimation(id);

        if (animation) {
            // リピートごとの動的アニメーション生成
            this.makeRepeatAnimation(dynamicAnimationList, r, animation, targets);

            // アニメーションリストに追加
            if (animationList.indexOf(animation) < 0) {
                animationList.push(animation);
            }
        }
    }

    // 合計フレーム数をセットし、基本レートで割る。
    // animationBaseDelay分は除く
    this.frame = (this.delaySum - this.animationBaseDelay) / basicRate;

    // データ一覧に追加
    dataA.push(this);

    // 基本項目の事後計算
    this.calcBasicAfter();
};

/**
 * ●アニメーションデータを取得する。
 * ※外部連携用にメソッド化
 */
BaseAnimation.prototype.getAnimation = function (id) {
    return $dataAnimations[id];
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
 * ●繰り返しアニメーションの生成
 */
BaseAnimation.prototype.makeRepeatAnimation = function (dynamicAnimationList, r, animation, originalTargets) {
    // eval用に定義
    var no = this.no;
    var dataA = this.dataA;
    var repeat = this.repeat;

    var spriteAnimation = new Sprite_Animation();
    // アニメーションに設定されているrateを取得
    // ※フレームレート変更系プラグインを考慮
    spriteAnimation._animation = animation;
    spriteAnimation.setupRate();
    var rate = spriteAnimation._rate;
    // 設定レートがあればそちらを参照
    if (this.rate) {
        rate = eval(this.rate);
        spriteAnimation._rate = rate;
    }

    // アニメーションの継続時間を取得
    spriteAnimation.setupDuration();

    // アニメーション位置の取得
    var position = spriteAnimation._animation.position;
    if (this.position != undefined) {
        position = eval(this.position);
    }
    this.position = position;

    // 設定された対象を取得
    var targets = this.targets;

    // 間隔
    var interval = eval(this.interval);
    // 間隔×レート分のディレイを加算
    if (r > 0) {
        this.delaySum += interval * rate;
    }
    // 今回のリピートの基本ディレイ値
    const delay = this.delaySum;
    // 対象ごとのディレイ値
    var targetDelay = delay;
    // このBaseAnimation内での集計用ディレイ
    let baseDelaySum = interval * rate * r;

    // 画面アニメーション
    // ※一括で表示を行うが、対象のフラッシュ処理のみ全員分処理する。
    if (position === 3) {
        // 重複ターゲットを削除して再作成
        var distinctTargets = targets.filter(function(target, i) {
            return targets.indexOf(target) == i;
        });

        distinctTargets.forEach(function (target, i) {
            // Sprite_Animationへと引き渡すパラメータ
            var dynamicAnimation = [];

            // 条件を満たす場合のみアニメを表示
            if (this.isAnimationDisp(i, target, targets, originalTargets)) {
                // Sprite_Animationへと引き渡すパラメータを作成
                dynamicAnimation = this.createDynamicAnimation(
                    target, r, spriteAnimation, interval, delay);

                // ダメージ用データの作成
                dynamicAnimation.makeDamageData(this, dynamicAnimationList, targetDelay, spriteAnimation);

                // 残像の作成
                dynamicAnimation.makeAfterimage(this, dynamicAnimationList, spriteAnimation);
                
                // 参照用に保持しておく
                this.list.push(dynamicAnimation);

            // 対象のフラッシュ用のデータ
            } else {
                dynamicAnimation = this.createDynamicAnimationHidden(
                    target, delay, r, spriteAnimation, interval);
            }

            // 最終リピートの場合
            if (r == this.repeat - 1) {
                dynamicAnimation.isLastRepeat = true;
            }

            // 非表示、フラッシュなし、効果音なし、最終リピートではない
            // 全てを満たす場合は意味がないので不要
            if (dynamicAnimation.isNoMake()) {
                return;
            }

            // 戦闘アニメーション実行リストに追加
            dynamicAnimationList.push(dynamicAnimation);
        }, this);

    // 通常アニメーション
    // ※全体の場合は対象ごとに表示を行う
    } else {
        // 対象ごとの時間差
        var nextDelay = this.animationNextDelay;
        if (this.nextDelay) {
            // アニメーションフレーム単位なので補正する。
            nextDelay = eval(this.nextDelay) * rate;
        }

        // 対象ごとにループ
        targets.forEach(function (target, index) {
            // Sprite_Animationへと引き渡すパラメータを作成
            var dynamicAnimation = this.createDynamicAnimation(
                    target, r, spriteAnimation, interval, targetDelay);
            
            // 対象番号を保持しておく
            dynamicAnimation.targetNo = index;

            // 最終リピートの場合
            if (r == this.repeat - 1) {
                dynamicAnimation.isLastRepeat = true;
            }

            // 時間差なしなら、２回目以降の効果音消去
            if (nextDelay == 0 && index >= 1) {
                dynamicAnimation.isLimitSound = true;
            }

            // ダメージ用データの作成
            dynamicAnimation.makeDamageData(this, dynamicAnimationList, targetDelay, spriteAnimation);
            // 残像の作成
            dynamicAnimation.makeAfterimage(this, dynamicAnimationList, spriteAnimation);

            // 非表示、フラッシュなし、効果音なし、最終リピートではない
            // 全てを満たす場合は意味がないので不要
            if (dynamicAnimation.isNoMake()) {
                return;
            }

            // 参照用に保持しておく
            this.list.push(dynamicAnimation);
            // 戦闘アニメーション実行リストに追加
            dynamicAnimationList.push(dynamicAnimation);

            // 対象が複数いる場合の時間差
            // ※最後の一回は除外
            if (targets.length - 1 > index) {
                targetDelay += nextDelay;
                baseDelaySum += nextDelay;
            }
        }, this);
    }

    // 実行時間の最大長を求める。（スキル開始からの総合計）
    this.totalDuration = Math.max(this.totalDuration, targetDelay + spriteAnimation._duration);
    // この<D-Animation>内の実行時間
    this.baseDuration = Math.max(this.baseDuration, baseDelaySum + spriteAnimation._duration);

    // 最後の１回ならアニメーション時間を保持
    if (r == this.repeat - 1) {
        this.delaySum = this.totalDuration;
    }
};

/**
 * ●アニメーションを表示するかどうかの判定
 */
BaseAnimation.prototype.isAnimationDisp = function (i, target, targets, originalTargets) {
    // マップ起動時は無関係なので無視
    if (!this.mapAnimation) {
        // 範囲拡張プラグインとの連携用
        // 主対象が設定されていて、かつ範囲変更がされていない場合
        // 特殊な範囲技と判定
        if (BattleManager._mainTarget && targets == originalTargets) {
            // 主対象以外はアニメを表示しない
            if (target == BattleManager._mainTarget) {
                return true;
            }
            return false;
        }
    }

    // 通常時は最初の一人のみアニメを表示
    if (i == 0) {
        return true;
    }

    return false;
};

/**
 * ●動的アニメーションデータを生成する。
 */
BaseAnimation.prototype.createDynamicAnimation = function (
    target, r, spriteAnimation, interval, delay) {
    var dynamicAnimation = new DynamicAnimation(this, target, r, spriteAnimation, interval);
    dynamicAnimation.mirror = this.mirror;
    dynamicAnimation.targetDelay = delay;

    return dynamicAnimation;
};

/**
* ●動的アニメーションデータを生成する。
* ※こちらはアニメーション非表示版
*/
BaseAnimation.prototype.createDynamicAnimationHidden = function (target, delay, r, spriteAnimation, interval) {
    var no = this.no;
    var dataA = this.dataA;
    this.r = r;

    // DynamicAnimationを作成（値はほぼ空で問題ない）
    var dynamicAnimation = new DynamicAnimation(this, target, r, spriteAnimation, interval);

    dynamicAnimation.dispAnimation = false;
    dynamicAnimation.isLimitSound = true;
    dynamicAnimation.targetDelay = delay;
    dynamicAnimation.id = spriteAnimation._animation.id;

    if (!dynamicAnimation.isLimitFlash) {
        // 対象のフラッシュデータの有無を確認
        // 1:対象のフラッシュが一つも存在しないなら、フラッシュ制限フラグを立てる。
        dynamicAnimation.isLimitFlash = spriteAnimation._animation.timings.every(function(timing) {
            return timing.flashScope != 1;
        });
    }

    return dynamicAnimation;
};

/**
 * ●調整ランダム関数（Ｘ座標用）
 */
BaseAnimation.prototype.randomX = function () {
    // 調整ランダム値を取得
    var val = getRandomAdjust(this._randomX);

    this._randomX = val;
    return val;
};

/**
 * ●調整ランダム関数（Ｙ座標用）
 */
BaseAnimation.prototype.randomY = function () {
    // 調整ランダム値を取得
    var val = getRandomAdjust(this._randomY);

    this._randomY = val;
    return val;
};

/**
 * ●標準画面Ｘ座標取得
 */
BaseAnimation.prototype.getScreenX = function (b) {
    var screenX;

    // マップ上では対象の座標
    if (!$gameParty.inBattle()) {
        screenX = b.x;

    // アクターが対象の場合、左右位置反転
    } else if (b.isActor()) {
        screenX = Graphics.boxWidth - this.defaultScreenX;
        // 位置調整
        if (this.mirrorAdjustX) {
            screenX += eval(this.mirrorAdjustX);
        }
    // 通常時
    } else {
        screenX = this.defaultScreenX;
    }

    return screenX;
};

/**
 * ●標準画面Ｙ座標取得
 */
BaseAnimation.prototype.getScreenY = function (b) {
    var screenY = this.defaultScreenY;
    
    // マップ上では対象の座標
    if (!$gameParty.inBattle()) {
        // グリッド中央を取得するよう調整
        screenY = b.y - $gameMap.tileHeight() / 2;

    // アクターが対象の場合、位置調整
    } else if (b.isActor() && this.mirrorAdjustY) {
        // 位置調整
        if (this.mirrorAdjustY) {
            screenY += eval(this.mirrorAdjustY);
        }
    }

    return screenY;
};

/**
 * ●標準ターゲットＸ座標取得
 */
BaseAnimation.prototype.getDefaultX = function (b, position, screenX) {
    var defaultX;

    // 画面の場合は画面標準座標
    if (position === 3) {
        defaultX = screenX;

    // それ以外は対象のＸ座標
    } else {
        defaultX = b.x;
    }

    return defaultX;
};

/**
 * ●標準ターゲットＹ座標取得
 */
BaseAnimation.prototype.getDefaultY = function (b, position, screenY) {
    var defaultY;

    // 頭上
    if (position === 0) {
        defaultY = b.y - b.height;
    // 中心
    } else if (position === 1) {
        defaultY = b.y - b.height / 2;
    // 足元
    } else if (position === 2) {
        defaultY = b.y;
    // 画面の場合は画面標準座標
    } else if (position === 3) {
        defaultY = screenY
    }

    return defaultY;
};

/**
 * 【独自】指定した設定があればtrue
 */
Game_Action.prototype.existDynamicSetting = function (searchName) {
    // 設定用省略タグがあれば考慮
    // 『Nrp.』はDynamicMotion側で定義
    var settingTagNameSet = "(?:" + SETTING_TAG_NAME + ")";
    if (typeof Nrp != "undefined" && Nrp.shortSettingTagName) {
        settingTagNameSet = "(?:" + SETTING_TAG_NAME + "|" + Nrp.shortSettingTagName + ")";
    }

    // <D-Setting:*>を取得
    var settingStrArr = this.getDynamicNote().match("<" + settingTagNameSet + "\\s*:(.*)>");

    if (settingStrArr) {
        var settings = settingStrArr[1];
        // 『/』が入っていたら除去
        settings = settings.replace("/", "");

        var settingSplit = settings.split("&");

        // 前から順番に読み込む
        for (let i = 0; i < settingSplit.length; i++) {
            let setting = settingSplit[i].trim();
            // 大文字変換して比較
            if (setting.toUpperCase() == searchName.toUpperCase()) {
                return true;
            }
        }
    }
    return false;
};

/**
 * ●戦闘中とマップ中のそれぞれ向けに行動主体を取得する。
 */
BaseAnimation.prototype.getSubject = function () {
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
BaseAnimation.prototype.getReferenceSubject = function () {
    return getReferenceBattler(this.getSubject());
};

/**
 * ●初期化処理
 */
DynamicAnimation.prototype.initialize = function(baseAnimation, target, r, spriteAnimation, interval) {
    this.referenceSubject = baseAnimation.getReferenceSubject();
    this.referenceTarget = getReferenceBattler(target);

    var a = this.referenceSubject;
    var b = this.referenceTarget;

    var no = baseAnimation.no;
    this.no = no;

    // 親情報への参照設定
    this.baseAnimation = baseAnimation;
    var dataA = baseAnimation.dataA;
    this.dataA = dataA;
    this.spriteAnimation = spriteAnimation;

    this.target = target;

    // 基本項目
    var delay = baseAnimation.delay;
    this.delay = delay;
    var repeat = baseAnimation.repeat;
    this.repeat = repeat;

    this.r = r;

    /*
     * 以下はリピートごとに変化する項目
     */
    // 条件が存在し、かつ満たさなければ次のループへ
    var condition = baseAnimation.condition;
    if (condition && !eval(condition)) {
        // 表示しない
        this.frame = 0;
        this.dispAnimation = false;
        this.isNoMatchCondition = true;
        return;
    }
    this.dispAnimation = true;

    this.interval = interval;
    this.rate = spriteAnimation._rate;

    this.id = spriteAnimation._animation.id;
    var position = baseAnimation.position;
    this.position = position;

    this.frame = spriteAnimation._duration / this.rate;

    // アニメーション反転設定
    this.noMirror = eval(baseAnimation.noMirror);

    // フラッシュ・効果音制限フラグの対象かどうかを計算
    this.setLimitEffect(baseAnimation);

    // 残像数
    if (baseAnimation.afterimage) {
        this.afterimage = eval(baseAnimation.afterimage);
        // 残像間隔
        if (baseAnimation.afterimageInterval) {
            this.afterimageInterval = eval(baseAnimation.afterimageInterval);
        } else {
            this.afterimageInterval = 1;
        }
    }

    // ダメージ
    this.damage = eval(baseAnimation.damage);
    this.damageAll = eval(baseAnimation.damageAll);

    // NRP_DynamicAnimationMap用の情報
    const mapAnimation = baseAnimation.mapAnimation;
    if (mapAnimation) {
        this.interpreter = mapAnimation.interpreter; // Game_Interpreter
        this.noWait = mapAnimation.noWait; // ウェイトなし
        this.onScroll = mapAnimation.onScroll; // スクロール連動
        this.isDynamicAuto = mapAnimation.isDynamicAuto; // 注釈からの自動起動
        this.isParallel = mapAnimation.isParallel; // 並列処理から起動
    }
}

/**
 * ●対象外のデータかどうか？
 */
DynamicAnimation.prototype.isNoMake = function () {
    // 条件を満たさなかった場合は処理不要
    if (this.isNoMatchCondition) {
        return true;
    }

    // 非表示、フラッシュなし、効果音なし、最終リピートではない
    // 全てを満たす場合は意味がないので不要
    if (!this.dispAnimation
            && this.isLimitFlash
            && this.isLimitSound
            && !this.isLastRepeat) {
        return true;
    }
};

/**
 * ●評価実行（アニメーションを表示する直前に実行される）
 */
DynamicAnimation.prototype.evaluate = function (spriteAnimation) {
    // 非表示の場合はダメージ処理のみ行う
    if (!this.dispAnimation) {
        if (this.afterDamage) {
            BattleManager.dynamicDamageControl(this);
        }
        return;
    }

    const baseAnimation = this.baseAnimation;

    // マップ時になぜかエラーになるパターンがあるので再取得
    // 参照スプライトが変質している？
    if (!$gameParty.inBattle()) {
        this.referenceSubject = baseAnimation.getReferenceSubject();
        this.referenceTarget = getReferenceBattler(this.target);
    }

    var a = this.referenceSubject;
    var b = this.referenceTarget;

    var ba = baseAnimation;
    var da = this;

    var dataA = this.dataA;
    var list = baseAnimation.list;
    var repeat = this.repeat;
    var no = this.no; // 現在のD-Animation番号
    var r = this.r; // 現在のリピート回数
    var targetNo = this.targetNo;

    var position = this.position; // 位置
    // 判定設定の取得
    var mirroring = getMirroring(this.target);
    this.mirroring = mirroring;

    /*
     * このタイミングでevalしておく。
     */
    // 標準ターゲット座標取得
    var screenX = baseAnimation.getScreenX(b);
    var screenY = baseAnimation.getScreenY(b);
    this.screenX = screenX;
    this.screenY = screenY;

    var defaultX = baseAnimation.getDefaultX(b, position, screenX);
    var defaultY = baseAnimation.getDefaultY(b, position, screenY);
    this.defaultX = defaultX;
    this.defaultY = defaultY;

    var sx;
    var sy;
    var ex;
    var ey;

    // 残像の場合：親の情報をコピー
    if (this.isAfterimage) {
        // 親情報を取得
        const parentDA = this.afterimageParent;
        sx = parentDA.sx;
        sy = parentDA.sy;
        ex = parentDA.ex;
        ey = parentDA.ey;

        // マップ上でのスクロール補正を行う場合
        if (this.onScroll) {
            // 本体のスクロール補正を残像にも行う
            sx += parentDA.diffScreenX();
            sy += parentDA.diffScreenY();
            ex += parentDA.diffScreenX();
            ey += parentDA.diffScreenY();
        }

    // 通常時
    } else {
        // ランダム生成用履歴
        var bestRandom1; // 始点
        var bestRandom2; // 終点

        if (!baseAnimation.randomHistory1) {
            baseAnimation.randomHistory1 = [];
        }
        if (!baseAnimation.randomHistory2) {
            baseAnimation.randomHistory2 = [];
        }

        /*
         * ランダム値生成（始点）
         */
        bestRandom1 = baseAnimation.makeBestRandom(
            baseAnimation.randomHistory1, baseAnimation.sxRandom, baseAnimation.syRandom);

        /*
         * ランダム値生成（終点）
         */
        bestRandom2 = baseAnimation.makeBestRandom(
            baseAnimation.randomHistory2, baseAnimation.exRandom, baseAnimation.eyRandom);

        // 始点Ｘ座標（対象のＸ座標を初期設定）
        sx = defaultX;

        // 設定があれば反映
        if (baseAnimation.sx != undefined) {
            sx = eval(baseAnimation.sx);
        }

        // 始点Ｘ座標ランダム幅を加算
        if (baseAnimation.sxRandom) {
            var sxRandom = eval(baseAnimation.sxRandom);
            sx = sx - sxRandom + bestRandom1.x * (sxRandom * 2 + 1);
        }

        // 始点Ｙ座標
        sy = defaultY;

        // 設定があれば反映
        if (baseAnimation.sy != undefined) {
            sy = eval(baseAnimation.sy);
        }

        // 始点Ｙ座標ランダム幅を加算
        if (baseAnimation.syRandom) {
            var syRandom = eval(baseAnimation.syRandom);
            sy = sy - syRandom + bestRandom1.y * (syRandom * 2 + 1);
        }

        // 終点Ｘ座標
        if (baseAnimation.ex != undefined) {
            ex = eval(baseAnimation.ex);

        // 終点の指定がなければ始点と同じ。
        } else {
            ex = sx;
        }

        // 終点Ｘ座標ランダム幅を加算
        if (baseAnimation.exRandom) {
            var exRandom = eval(baseAnimation.exRandom);
            ex = ex - exRandom + bestRandom2.x * (exRandom * 2 + 1);
        }

        // 終点Ｙ座標
        ey = sy;
        if (baseAnimation.ey != undefined) {
            ey = eval(baseAnimation.ey)
        }

        // 終点Ｙ座標ランダム幅を加算
        if (baseAnimation.eyRandom) {
            var eyRandom = eval(baseAnimation.eyRandom);
            ey = ey - eyRandom + bestRandom2.y * (eyRandom * 2 + 1);
        }
    }

    this.sx = sx;
    this.sy = sy;
    this.ex = ex;
    this.ey = ey;
    
    // 放物線
    var arcX = eval(baseAnimation.arcX);
    var arcY = eval(baseAnimation.arcY);
    this.arcX = arcX;
    this.arcY = arcY;

    // 到達フレーム数
    if (baseAnimation.arrival != undefined) {
        this.arrival = eval(baseAnimation.arrival);
    } else {
        this.arrival = spriteAnimation._animation.frames.length;
    }

    // 円運動初期値
    var initRadX = eval(baseAnimation.initRadX);
    var initRadY = eval(baseAnimation.initRadY);
    if (!initRadX) {
        initRadX = 0;
    }
    if (!initRadY) {
        initRadY = 0;
    }
    this.initRadX = initRadX;
    this.initRadY = initRadY;

    // 効果音
    if (baseAnimation.playSe != undefined) {
        // "{"で始まる場合はObject指定
        if (baseAnimation.playSe.startsWith("{")) {
            AudioManager.playSe(JSON.parse(baseAnimation.playSe))
        // ファイル名指定
        } else {
            AudioManager.playSe({"name":baseAnimation.playSe, "volume":90, "pitch":100, "pan":0})
        }
    }

    // スクリプト
    if (baseAnimation.script != undefined) {
        eval(baseAnimation.script);
    }

    // プラグインコマンド
    if (baseAnimation.plugin != undefined) {
        var pluginCommand = baseAnimation.plugin;
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

    // 以下の項目はSprite_Animation側で可変のため、evalしない。
    // そのまま数式として渡す
    this.addX = baseAnimation.addX;
    this.addY = baseAnimation.addY;
    this.dx = baseAnimation.dx;
    this.dy = baseAnimation.dy;
    this.opacity = baseAnimation.opacity;
    this.rotation = baseAnimation.rotation;
    this.scale = baseAnimation.scale;
    this.scaleX = baseAnimation.scaleX;
    this.scaleY = baseAnimation.scaleY;
    this.color = baseAnimation.color;
    this.z = baseAnimation.z;
    // リアルタイム円
    this.radiusX = baseAnimation.radiusX;
    this.radiusY = baseAnimation.radiusY;
    this.radX = baseAnimation.radX;
    this.radY = baseAnimation.radY;

    // マップ時のスクロール制御用
    const mapAnimation = baseAnimation.mapAnimation;
    if (mapAnimation) {
        // スクロール開始時の初期値
        this.originalScreenX = $gameMap.displayX() * $gameMap.tileWidth();
        this.originalScreenY = $gameMap.displayY() * $gameMap.tileHeight();
    }

    // r=0のみ設定する
    if (r == 0) {
        this.scriptRT = baseAnimation.scriptRT;

        // コモンイベント
        if (baseAnimation.commonEvent != undefined) {
            var commonEventId = eval(baseAnimation.commonEvent);
            if (commonEventId) {
                var commonEvent = new Game_CommonEvent(commonEventId);
                // 強制実行フラグを立てる。
                commonEvent._isForceActive = true;

                // Spriteを取得
                // bの中身がBattlerでもSpriteでも受け付ける。
                let spriteB;

                // Spriteの場合
                if (b.spriteId != undefined) {
                    spriteB = b;
                // Battlerの場合
                } else {
                    spriteB = getBattlerSprite(b);
                }

                // コモンイベントリストが未定義なら初期化
                if (spriteB._commonEvents == undefined) {
                    spriteB._commonEvents = [];
                }
                // Sprite_Battlerに実行コモンイベントを追加
                spriteB._commonEvents.push(commonEvent);
                // 初期化
                commonEvent.refresh();
            }
        }
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
 * ●フラッシュ・効果音制限フラグの設定
 */
DynamicAnimation.prototype.setLimitEffect = function (baseAnimation) {
    // eval用の設定
    var no = this.no;
    var r = this.r;
    var dataA = this.dataA;
    var list = baseAnimation.list;

    // フラッシュ制限フラグ
    // trueならば、このリピートの対象フラッシュを消す
    this.isLimitFlash = false;
    if (baseAnimation.limitFlash) {
        var limitFlash = baseAnimation.limitFlash;
        if (r % limitFlash != 0) {
            this.isLimitFlash = true;
        }
    // 0以下ならば制限
    } else if (baseAnimation.limitFlash === 0 || baseAnimation.limitFlash < 0) {
        this.isLimitFlash = true;
    }

    // 効果音制限フラグ
    // trueならば、このリピートの効果音を消す
    this.isLimitSound = false;
    if (baseAnimation.limitSound) {
        var limitSound = baseAnimation.limitSound;
        if (r % limitSound != 0) {
            this.isLimitSound = true;
        }
    // 0以下ならば制限
    } else if (baseAnimation.limitSound === 0 || baseAnimation.limitSound < 0) {
        this.isLimitSound = true;
    }
};

/**
 * ●残像の作成
 */
DynamicAnimation.prototype.makeAfterimage = function (baseAnimation, dynamicAnimationList, spriteAnimation) {
    // 残像の作成
    var afterimage = this.afterimage;
    // 設定数分ループ
    for (var i = 0; i < afterimage; i++) {
        // DynamicAnimationを作成（値はほぼ空で問題ない）
        var afterimageData = new DynamicAnimation(baseAnimation, this.target, this.r, spriteAnimation, null);
        // 本体をコピー
        afterimageData.setProperties(this);
        // 親への参照
        afterimageData.afterimageParent = this;
        // 残像フラグを設定
        afterimageData.isAfterimage = true;
        // 残像は各種演出を行わない。
        afterimageData.isLimitEffect = true;
        // 残像間隔
        var afterimageInterval = this.afterimageInterval;
        afterimageData.targetDelay += afterimageInterval * this.rate * (i + 1);
        // 残像の数で透明度を分割
        // この時点では本体に対する割合のみを設定する。
        // 透明度はリアルタイム計算であるため、実際はそちらで処理
        afterimageData.opacityRate = 1 - (i + 1) / (afterimage + 1);

        // 戦闘アニメーション実行リストに追加
        dynamicAnimationList.push(afterimageData);
    }
};

/**
 * ●ダメージ処理用データの作成
 */
DynamicAnimation.prototype.makeDamageData = function (baseAnimation, dynamicAnimationList, delay, spriteAnimation) {
    // 単体ダメージか全体ダメージのいずれか
    if (this.damage === undefined && this.damageAll === undefined) {
        return;
    // 全体時は初回以外は処理しない
    } else if (this.damageAll != undefined && this.r > 0) {
        return;
    }

    // ダメージ用のDynamicAnimationを作成（値はほぼ空で問題ない）
    var damageData = new DynamicAnimation(baseAnimation, this.target, this.r, spriteAnimation, null);
    // ダメージ表示フラグをオン
    damageData.afterDamage = true;
    // 各種演出を行わない。
    damageData.isLimitEffect = true;
    damageData.dispAnimation = false;
    // trueならアニメーション終了に時間を合わせる
    if (this.damage == true || this.damageAll == true) {
        damageData.targetDelay = delay + spriteAnimation._duration;
    // 数値なら指定のフレーム数で（全体）
    } else if (this.damageAll != undefined) {
        damageData.targetDelay = delay + this.damageAll * this.rate;
    // 数値なら指定のフレーム数で（１回ずつ）
    } else if (this.damage != undefined) {
        damageData.targetDelay = delay + this.damage * this.rate;
    }

    // 戦闘アニメーション実行リストに追加
    dynamicAnimationList.push(damageData);
};

/**
 * ●プロパティをコピーする。
 */
DynamicAnimation.prototype.setProperties = function (source) {
    // プロパティをコピー
    Object.keys(source).forEach(function(key) {
        // 値が存在する場合に設定
        if (source[key] != undefined && source[key] != null && source[key] != "") {
            this[key] = source[key];
        }
    }, this);
};

/**
 * ●初回のみ取得する回転率
 */
DynamicAnimation.prototype.startRotation = function(rotation) {
    if (this._startRotation == undefined) {
        this._startRotation = rotation;
    }
    return this._startRotation;
};

// ランダム履歴上限
const RANDOM_HISTORY_MAX = 10;

/**
 * ●ランダム関数
 */
BaseAnimation.prototype.makeBestRandom = function(randomHistory, xFlg, yFlg) {
    // ランダム調整を行わない場合
    if (!pRandomAdjust) {
        return {
            x: Math.random(),
            y: Math.random()
        };
    }

    // ランダム許容基準値
    var randomAdjust = pRandomAdjust;

    // XY座標両方の場合は*2
    if (xFlg && yFlg) {
        randomAdjust *= 2;
    }

    var newHistory;

    // 履歴候補リスト
    var randomList = [];

    // 初回の場合
    if (randomHistory.length == 0) {
        newHistory = {
            x: Math.random(),
            y: Math.random()
        };

        randomHistory.push(newHistory);
        return newHistory;
    }

    // 履歴上限を超えていたら一行削除
    if (randomHistory.length >= RANDOM_HISTORY_MAX) {
        randomHistory.shift();
    }

    // 乱数生成（とりあえず10回まで）
    // ※この数値が大きいほど候補が増えるが、動作が重くなる可能性あり。
    for (let i = 0; i < 10; i++) {
        newHistory = {
            x: Math.random(),
            y: Math.random(),
            diff: 0,
            old: 0 // 数値が大きいほど古い
        };

        let worstDiff = undefined;
        let worstOld = undefined;

        // 生成した乱数が過去の値と適切に離れているか？
        for (let j = 0; j < randomHistory.length; j++) {
            let oldHistory = randomHistory[j];

            let diffValue = undefined;

            // XY両方
            if (xFlg && yFlg) {
                let xDiff = Math.abs(newHistory.x - oldHistory.x);
                let yDiff = Math.abs(newHistory.y - oldHistory.y);
                diffValue = xDiff + yDiff;

            // Xのみ
            } else if (xFlg) {
                diffValue = Math.abs(newHistory.x - oldHistory.x);

            // Yのみ
            } else if (yFlg) {
                diffValue = Math.abs(newHistory.y - oldHistory.y);
            }

            // 過去の乱数の優先度を上げる
            diffValue += (randomHistory.length - 1 - j) / (RANDOM_HISTORY_MAX - 1);

            // 過去の乱数値と比較し、最も密な場合の値を取得
            if (worstDiff == undefined || diffValue < worstDiff) {
                worstDiff = diffValue;
                // 数値が大きいほど古い
                worstOld = randomHistory.length - j;
            }
        }

        newHistory.diff = worstDiff;
        newHistory.old = worstOld;
        randomList.push(newHistory);
    }

    // リストの中から許容基準を満たすものがあるかを探す。
    var existBorderClear = randomList.some(function(r) {
        return r.diff >= randomAdjust;
    });

    var choiceData;

    // 許容基準を満たしている
    if (existBorderClear) {
        // 許容基準を満たすものだけでフィルタ
        randomList = randomList.filter(function(r) {
            return r.diff >= randomAdjust;
        });

        // ランダムに抽出
        choiceData = randomList[Math.randomInt(randomList.length)];

    // 許容基準を満たしていない
    } else {
        // ソートして先頭（最もマシな値）を取得
        randomList.sort(function(a, b) {
            return b.diff - a.diff;
        });

        choiceData = randomList[0];
    }

    randomHistory.push(choiceData);
    return choiceData;
};

/**
 * ●初回のみ取得するランダム関数
 */
DynamicAnimation.prototype.startRandom = function(key) {
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
        var baseAnimation = this.baseAnimation;

        // 調整ランダム値を取得
        var val = getRandomAdjust(this.baseAnimation._startRandom);
        baseAnimation._startRandom = val;
        this._startRandom = val;
    }
    return this._startRandom;
};

/**
 * ●初回のみ取得するランダム関数（短縮版）
 */
DynamicAnimation.prototype.random = function(key) {
    return this.startRandom(key);
}

/**
 * ●更新
 * ※毎フレーム実行される処理
 */
var _Sprite_Battler_update = Sprite_Battler.prototype.update;
Sprite_Battler.prototype.update = function() {
    // 元処理実行
    _Sprite_Battler_update.call(this);

    if (this._battler) {
        // コモンイベント呼び出し追加
        this.updateCommonEvents();
    }
};

/**
 * 【独自】コモンイベントを呼び出す。
 */
Sprite_Battler.prototype.updateCommonEvents = function() {
    if (!this._commonEvents) {
        return;
    }

    // イベント更新
    for (var event of this._commonEvents) {
        event.update();
    }

    // 実行リストが存在するイベントでフィルタリング
    // ※event._interpreter._listがnullなら終了と見なす
    this._commonEvents = this._commonEvents.filter(function(event) {
        return event._interpreter._list;
    });
};

/**
 * ●コモンイベントの実行有効判定
 */
var _Game_CommonEvent_isActive = Game_CommonEvent.prototype.isActive;
Game_CommonEvent.prototype.isActive = function() {
    // 強制実行フラグがONならtrue
    if (this._isForceActive) {
        return true;
    }

    return _Game_CommonEvent_isActive.call(this);
};

/**
 * ●アニメーションが準備完了かどうか？
 */
var _Sprite_Animation_isReady = Sprite_Animation.prototype.isReady;
Sprite_Animation.prototype.isReady = function() {
    // 既にロード済みのため無条件でtrue
    if (this.dynamicAnimation) {
        return true;
    }

    return _Sprite_Animation_isReady.call(this);
};

/**
 * ●戦闘更新処理
 */
var _Spriteset_Base_update = Spriteset_Base.prototype.update;
Spriteset_Base.prototype.update = function() {
    _Spriteset_Base_update.apply(this, arguments);

    // DynamicAnimationリクエスト状態、かつ画像読込未完了
    if (this._requestDynamicAnimation && !this._isDynamicAnimationReady) {
        // 画像読込状態チェック
        this._isDynamicAnimationReady = ImageManager.isReady();
    }
};

/**
 * ●アクション実行終了（バトラー共通）
 */
var _Game_Battler_performActionEnd = Game_Battler.prototype.performActionEnd;
Game_Battler.prototype.performActionEnd = function() {
    // 元処理実行
    _Game_Battler_performActionEnd.call(this);
};

/**
 * 【独自定義】動的アニメーションをアクターにセットする。
 */
Game_Actor.prototype.setDynamicAnimation = function(dynamicAnimation) {
    // 対象がアクターなら左右反転を行う。
    // ただし、反転無効化時を除く。
    if (!dynamicAnimation.noMirror) {
        dynamicAnimation.mirror = !dynamicAnimation.mirror;
    }
    Game_Battler.prototype.setDynamicAnimation.call(this, dynamicAnimation);
};

/**
 * 【独自定義】動的アニメーションをバトラーにセットする。
 */
Game_Battler.prototype.setDynamicAnimation = function(dynamicAnimation) {
    var data = {
        animationId: dynamicAnimation.id,
        mirror: dynamicAnimation.mirror,
        delay: dynamicAnimation.targetDelay,
        dynamicAnimation: dynamicAnimation
    };
    this._animations.push(data);
};

/**
 * ●アニメーション更新
 */
var _Sprite_Battler_updateAnimation = Sprite_Battler.prototype.updateAnimation;
Sprite_Battler.prototype.updateAnimation = function() {
    if (BattleManager._spriteset && BattleManager._spriteset._requestDynamicAnimation) {
        this.setupDynamicAnimation();
        return;
    }

    _Sprite_Battler_updateAnimation.apply(this, arguments);
};

/**
 * ●アニメーション呼び出し
 */
Sprite_Battler.prototype.setupDynamicAnimation = function() {
    const spriteset = getSpriteset();
    // 準備完了ではない場合は処理しない。
    if (!spriteset._isDynamicAnimationReady) {
        return;
    }

    // delayの昇順でソートする。
    // ※DynamicAnimationだけならこの処理は不要だが、外部から他のアニメーションが呼び出された場合を考慮
    if (this.isAnimationRequested()) {
        this.animations().sort(function(a, b) {
            return a.delay - b.delay;
        });
    }

    // アニメーションが予約されている限り実行
    while (this.isAnimationRequested()) {
        // 次に処理されるアニメーション情報
        const nextAnimation = this.animations()[0];

        // まだ時間でない場合は処理しない
        if (nextAnimation.delay > 0) {
            // 時間経過へ
            break;
        }

        // 実行条件を満たしたのでshiftする。
        var data = this._battler.shiftAnimation();

        var animation = $dataAnimations[data.animationId];
        var mirror = data.mirror;
    
        // タイミング制御は既に行っているため即時実行
        var delay = 0;
        
        // 動的アニメーションをセットする。
        this.startDynamicAnimation(animation, mirror, delay, data.dynamicAnimation);
    }

    // 時間経過
    for (const animation of this.animations()) {
        animation.delay--;
    }
};

/**
 * ●処理中かどうか？
 */
const _BattleManager_isBusy = BattleManager.isBusy;
BattleManager.isBusy = function() {
    // DynamicAnimationの再生中判定
    if (this._spriteset.isDynamicAnimationPlaying()) {
        return true;
    }

    return _BattleManager_isBusy.apply(this, arguments);
};

/**
 * 【独自】DynamicAnimationの再生中判定
 * ※isAnimationPlayingは状況によっては確実に通らないため、
 * 　別に独自実装する。
 */
Spriteset_Base.prototype.isDynamicAnimationPlaying = function() {
    if (this._requestDynamicAnimation) {
        // アニメーションのリクエスト待ちを行うかどうか？
        var isAnimationRequestWait = this.characterSprites().some(function(sprite) {
            return sprite.isAnimationRequestWait();
        });
        if (isAnimationRequestWait) {
            return true;
        }
        
        // リクエスト中のアニメーションが存在するか？
        var isAnimationRequested = this.characterSprites().some(function(sprite) {
            return sprite.isAnimationRequested();
        });
        if (!isAnimationRequested) {
            // リクエストがなくなればフラグクリア
            this._requestDynamicAnimation = undefined;
        }
    }

    return false;
};

/**
 * ●アニメーションの実行中判定
 * ※実際にはアクション実行の終了判定に使う。
 */
const _Sprite_Base_isAnimationPlaying = Sprite_Base.prototype.isAnimationPlaying;
Sprite_Base.prototype.isAnimationPlaying = function() {
    // 全てのアニメーションがnoWaitならば待たない。
    const isNoWaitInAction = this._animationSprites.every(function(sprite) {
        return sprite.dynamicAnimation && sprite.dynamicAnimation.isNoWaitInAction();
    });
    if (isNoWaitInAction) {
        return false;
    }

    return _Sprite_Base_isAnimationPlaying.apply(this, arguments);
};

/**
 * ●アクション中にアニメーション待ちしないかどうか？
 */
DynamicAnimation.prototype.isNoWaitInAction = function () {
    // ウェイトなしの場合に加えて、並列実行の場合も待たない。
    // 並列実行からのアニメーションで動作が止まらないようにする。
    return this.noWait || this.isParallel;
};

/**
 * 【独自】アニメーションのリクエストによるウェイトが必要かどうか？
 */
Sprite_Battler.prototype.isAnimationRequestWait = function() {
    // リクエストが存在する。
    if (this.isAnimationRequested()) {
        // noWaitのDynamicAnimationのみならばウェイトなし
        const noWait = this.animations().every(function(animation) {
            return animation.dynamicAnimation && animation.dynamicAnimation.isNoWaitInAction();
        });
        if (!noWait) {
            return true;
        }
    }
    return false;
};

/**
 * 【独自】アニメーションがリクエスト中か？
 */
Sprite_Battler.prototype.isAnimationRequested = function() {
    return this.animations().length > 0;
};

/**
 * 【独自】アニメーション情報取得
 */
Sprite_Battler.prototype.animations = function() {
    const battler = this._battler;
    // バトラーが取得できなければ空の配列
    if (!battler) {
        return [];
    }
    return battler._animations;
};

/**
 * 【独自】動的アニメーションの呼び出し
 * ※外部プラグインからアニメーションが呼び出された場合、
 * 　dynamicAnimationを保有しないパターンもありえるので注意！
 */
Sprite_Battler.prototype.startDynamicAnimation = function(animation, mirror, delay, dynamicAnimation) {
    var sprite = new Sprite_Animation();
    sprite.dynamicAnimation = dynamicAnimation;
    sprite.setup(this._effectTarget, animation, mirror, delay);
    this.parent.addChild(sprite);
    this._animationSprites.push(sprite);
    sprite.visible = this._battler.isSpriteVisible();

    // ウェイト用の設定
    // ※NRP_DynamicAnimationMap用
    if (dynamicAnimation && !dynamicAnimation.noWait) {
        const interpreter = dynamicAnimation.interpreter;
        // プラグインコマンドから起動した場合
        if (interpreter) {
            interpreter.setDynamicDuration(dynamicAnimation.waitDuration);
        }
    }
};

/**
 * ●継続時間の設定
 */
var _Sprite_Animation_setupDuration = Sprite_Animation.prototype.setupDuration;
Sprite_Animation.prototype.setupDuration = function() {
    _Sprite_Animation_setupDuration.call(this);

    // 全体の継続時間を保持しておく。
    this._allDuration = this._duration;
};

/**
 * ●アニメーションのスプライト作成
 */
var _Sprite_Animation_createSprites = Sprite_Animation.prototype.createSprites;
Sprite_Animation.prototype.createSprites = function() {
    // 画面アニメーションでも初回（または主対象）は強制スプライト生成
    if (this.dynamicAnimation) {
        // trueとfalseで分岐
        if (this.dynamicAnimation.dispAnimation == true) {
            this.createCellSprites();
            this.createScreenFlashSprite();
            this._duplicated = false;

        // 対象外なのでスプライトを作らない
        } else {
            // 複製フラグ（対象フラッシュだけを行う）
            this._duplicated = true;
        }
        return;
    }

    // 元処理実行
    _Sprite_Animation_createSprites.call(this);
};

/**
 * ●アニメーションのセットアップ
 */
var _Sprite_Animation_setup = Sprite_Animation.prototype.setup;
Sprite_Animation.prototype.setup = function(target, animation, mirror, delay) {
    _Sprite_Animation_setup.call(this, target, animation, mirror, delay);

    // レート指定があれば、それで上書き
    if (this._animation && this.dynamicAnimation && this.dynamicAnimation.rate) {
        this._rate = this.dynamicAnimation.rate;
        // アニメーションの継続時間を再計算
        this.setupDuration();
    }
};

/**
 * ●アニメーション更新メイン
 */
var _Sprite_Animation_updateMain = Sprite_Animation.prototype.updateMain;
Sprite_Animation.prototype.updateMain = function() {
    if (this.dynamicAnimation) {
        // 処理開始時
        if (this._allDuration == this._duration) {
            // 実行前に計算
            this.dynamicAnimation.evaluate(this);
        }
    }

    // 元処理実行
    _Sprite_Animation_updateMain.call(this);
};

/**
 * ●アニメーションの描画
 * ※1/60秒ごとに実行される。
 */
var _Sprite_Animation_updatePosition = Sprite_Animation.prototype.updatePosition;
Sprite_Animation.prototype.updatePosition = function() {
    _Sprite_Animation_updatePosition.call(this);

    // 当プラグイン用の更新処理を実行
    if (this.dynamicAnimation && this.dynamicAnimation.dispAnimation) {
        this.updateDynamicAnimation();
    }
};

/**
 * ●動的アニメーションの描画
 * ※1/60秒ごとに実行される。
 */
Sprite_Animation.prototype.updateDynamicAnimation = function() {
    var da = this.dynamicAnimation;
    var a = da.referenceSubject;
    var b = da.referenceTarget;

    var dataA = da.dataA;
    var repeat = da.repeat;
    var no = da.no; // 現在のD-Animation番号
    var r = da.r; // 現在のリピート回数
    var t = this._allDuration - this._duration - 1; // 現在の経過時間
    var et = this._allDuration - 1 // 終了時間

    var position = da.position; // 位置
    var mirroring = da.mirroring; // ミラーリング

    // 標準ターゲット座標取得
    var screenX = da.screenX;
    var screenY = da.screenY;
    var defaultX = da.defaultX;
    var defaultY = da.defaultY;

    var targetNo = da.targetNo;

    // 始点
    var sx = da.sx;
    var sy = da.sy;
    // 終点
    var ex = da.ex;
    var ey = da.ey;
    var arcX = da.arcX;
    var arcY = da.arcY;
    // リアルタイム
    var addX = da.addX;
    var addY = da.addY;
    var dx = da.dx;
    var dy = da.dy;
    var rotation = da.rotation;
    var opacity = da.opacity;
    var arrival = da.arrival;
    var scale = da.scale;
    var scaleX = da.scaleX;
    var scaleY = da.scaleY;
    // リアルタイム円
    var radiusX = da.radiusX;
    var radiusY = da.radiusY;
    var radX = da.radX;
    var radY = da.radY;
    var initRadX = da.initRadX;
    var initRadY = da.initRadY;
    // マップ用項目
    const onScroll = da.onScroll;

    // 前回の位置が存在しない場合は開始地点
    if (this.beforeX == undefined) {
        this.beforeX = sx;
    }
    if (this.beforeY == undefined) {
        this.beforeY = sy;
    }

    // 到着フレーム数の指定がある場合
    if (arrival != undefined) {
        // レート分、倍にしておく。
        // tが0始まりのため、到着時間も-1調整
        arrival = arrival * this._rate - 1;
    // ない場足は終了時間を設定
    } else {
        arrival = et;
    }

    // Ｘ座標の計算式の指定がある場合
    if (dx != undefined) {
        this.x = eval(dx);

    // Ｘ座標の始点・終点が等しい場合
    } else if (sx == ex) {
        this.x = sx;

    // Ｘ座標の始点・終点指定がある場合
    } else if (sx != undefined && ex != undefined) {
        // 到着時間をかけて、終了地点まで移動する。
        this.x = sx + (ex - sx) * Math.min(t, arrival) / arrival;
    }

    // Ｙ座標の計算式の指定がある場合
    if (dy != undefined) {
        this.y = eval(dy);

    // Ｙ座標の始点・終点が等しい場合
    } else if (sy == ey) {
        this.y = sy;

    // Ｙ座標の始点・終点指定がある場合
    } else if (sy != undefined && ey != undefined) {
        // 到着時間をかけて、終点まで移動する。
        this.y = sy + (ey - sy) * Math.min(t, arrival) / arrival;
    }

    // 放物線補正があれば加算
    if (arcX) {
        this.x += (-arcX / Math.pow(arrival/2, 2)) * Math.pow(Math.min(t, arrival) - arrival/2, 2) + arcX;
    }
    if (arcY) {
        this.y += (-arcY / Math.pow(arrival/2, 2)) * Math.pow(Math.min(t, arrival) - arrival/2, 2) + arcY;
    }

    // 円運動
    if (radiusX) {
        if (!radX) {
            radX = 0;
        }
        this.x += eval(radiusX) * Math.cos(initRadX + eval(radX))
    }
    if (radiusY) {
        if (!radY) {
            radY = 0;
        }
        this.y += eval(radiusY) * Math.sin(initRadY + eval(radY))
    }

    // 座標補正があれば加算
    if (addX) {
        this.x += eval(addX);
    }
    if (addY) {
        this.y += eval(addY);
    }

    // 回転率
    if (rotation != undefined) {
        this.rotation = eval(rotation);
    }
    // 不透明度
    if (opacity != undefined) {
        opacity = eval(opacity);
        if (opacity != undefined) {
            this.opacity = opacity;
        }
    }

    // 残像の不透明度計算
    if (da.isAfterimage) {
        if (opacity == undefined) {
            opacity = 255;
        }
        this.opacity = opacity * da.opacityRate;
    }

    // サイズ変更
    if (scale != undefined || scaleX != undefined || scaleY != undefined) {
        let setScaleX = 1;
        let setScaleY = 1;
        // 全体
        if (scale != undefined) {
            setScaleX = eval(scale);
            setScaleY = eval(scale);
        }
        // Ｘ方向
        if (scaleX != undefined) {
            setScaleX = eval(scaleX);
        }
        // Ｙ方向
        if (scaleY != undefined) {
            setScaleY = eval(scaleY);
        }
        this.scale = new PIXI.Point(setScaleX, setScaleY);
    }

    // Ｚ座標
    if (da.z != undefined) {
        this.z = eval(da.z);
    }

    // スクリプト（リアルタイム）
    if (da.scriptRT) {
        eval(da.scriptRT);
    }

    // 前回の位置を保持
    this.beforeX = this.x;
    this.beforeY = this.y;

    // 初期位置からのスクロール差分を加算
    if (onScroll) {
        this.x += da.diffScreenX();
        this.y += da.diffScreenY();
    }
};

/**
 * ●初期位置からのスクロール差分Ｘ座標（ピクセル）を取得する。
 */
 DynamicAnimation.prototype.diffScreenX = function () {
    let diffScreenX = this.originalScreenX - $gameMap.displayX() * $gameMap.tileWidth();

    // マップ全体の横幅（ピクセル）
    const mapWidth = $gameMap.width() * $gameMap.tileWidth();

    // 全体座標の半分以上を移動した（ループ）
    if (diffScreenX > mapWidth / 2) {
        diffScreenX -= mapWidth;
    } else if (diffScreenX < mapWidth / 2 * -1) {
        diffScreenX += mapWidth;
    }

    return diffScreenX;
};

/**
 * ●初期位置からのスクロール差分Ｙ座標（ピクセル）を取得する。
 */
 DynamicAnimation.prototype.diffScreenY = function () {
    let diffScreenY = this.originalScreenY - $gameMap.displayY() * $gameMap.tileHeight();

    // マップ全体の縦幅（ピクセル）
    const mapHeight = $gameMap.height() * $gameMap.tileHeight();

    // 全体座標の半分以上を移動した（ループ）
    if (diffScreenY > mapHeight / 2) {
        diffScreenY -= mapHeight;
    } else if (diffScreenY < mapHeight / 2 * -1) {
        diffScreenY += mapHeight;
    }

    return diffScreenY;
};

/**
 * ●アニメーションセルの更新
 */
var _Sprite_Animation_updateCellSprite = Sprite_Animation.prototype.updateCellSprite;
Sprite_Animation.prototype.updateCellSprite = function(sprite, cell) {
    _Sprite_Animation_updateCellSprite.call(this, sprite, cell);

    var pattern = cell[0];
    if (pattern >= 0 && this.dynamicAnimation) {
        var da = this.dynamicAnimation;
    
        var r = da.r; // 現在のリピート回数
        var t = this._allDuration - this._duration - 1; // 現在の経過時間
        var et = this._allDuration - 1 // 終了時間

        // 色調変更
        if (da.color != undefined) {
            // 色調変更すると合成方法がクリアされるので保持＆再設定
            const blendMode = sprite.blendMode;
            sprite.setBlendColor(eval(da.color));
            sprite.blendMode = blendMode;
        }
    }
};

/**
 * ●フラッシュや効果音などの制御
 */
var _Sprite_Animation_processTimingData = Sprite_Animation.prototype.processTimingData;
Sprite_Animation.prototype.processTimingData = function(timing) {
    // 演出制限フラグが立っているなら処理終了
    if (this.dynamicAnimation && this.dynamicAnimation.isLimitEffect) {
        return;
    }

    // 効果音演奏時
    if (!this._duplicated && timing.se) {
        // 効果音制限フラグが立っているなら、演出処理の呼び出しをして処理終了
        // ※やや冗長だけど競合を極力抑えるため……。
        if (this.dynamicAnimation && this.dynamicAnimation.isLimitSound) {
            var duration = timing.flashDuration * this._rate;
            switch (timing.flashScope) {
            case 1:
                this.startFlash(timing.flashColor, duration);
                break;
            case 2:
                this.startScreenFlash(timing.flashColor, duration);
                break;
            case 3:
                this.startHiding(duration);
                break;
            }
            return;
        }
    }

    // 元処理実行
    _Sprite_Animation_processTimingData.call(this, timing);
};

/**
 * ●対象のフラッシュ
 */
var _Sprite_Animation_startFlash = Sprite_Animation.prototype.startFlash;
Sprite_Animation.prototype.startFlash = function(color, duration) {
    // フラッシュ制限フラグが立っているなら処理終了
    if (this.dynamicAnimation && this.dynamicAnimation.isLimitFlash) {
        return;
    }

    // 元処理実行
    _Sprite_Animation_startFlash.call(this, color, duration);
};

/**
 * ●対象非表示
 */
var _Sprite_Animation_startHiding = Sprite_Animation.prototype.startHiding;
Sprite_Animation.prototype.startHiding = function(duration) {
    // フラッシュ制限フラグが立っているなら処理終了
    if (this.dynamicAnimation && this.dynamicAnimation.isLimitFlash) {
        return;
    }

    // 元処理実行
    _Sprite_Animation_startHiding.call(this, duration);
};

/**
 * アニメーションの削除
 */
var _Sprite_Animation_remove = Sprite_Animation.prototype.remove;
Sprite_Animation.prototype.remove = function() {
    if (this.dynamicAnimation && this.parent && this.parent.removeChild(this)) {
        // 最終リピートの場合のみ戻し処理を実行
        if (this.dynamicAnimation.isLastRepeat) {
            // アニメーションの削除時に色調＆表示状態を戻す（デフォルト処理）
            this._target.setBlendColor([0, 0, 0, 0]);
            this._target.show();
        }
        return;
    }
    
    // 元処理実行
    _Sprite_Animation_remove.call(this);
};

/**
 * ●画面のフラッシュ
 */
var _Sprite_Animation_startScreenFlash = Sprite_Animation.prototype.startScreenFlash;
Sprite_Animation.prototype.startScreenFlash = function(color, duration) {
    // フラッシュ制限フラグが立っているなら処理終了
    if (this.dynamicAnimation && this.dynamicAnimation.isLimitFlash) {
        return;
    }

    // 元処理実行
    _Sprite_Animation_startScreenFlash.call(this, color, duration);
};

/**
 * 【独自】効果音の事前読込
 */
AudioManager.preloadSe = function(se) {
    if (se.name) {
        var buffer = this.createBuffer('se', se.name);
        this.updateSeParameters(buffer, se);
    }
};

/**
 * ●更新メイン
 */
var _Sprite_Battler_updateMain = Sprite_Battler.prototype.updateMain;
Sprite_Battler.prototype.updateMain = function() {
    _Sprite_Battler_updateMain.apply(this);

    // スプライトの必要情報をバトラー本体へ反映
    this.setBattlerData();
};

/**
 * 【独自】スプライトの必要情報をバトラー本体へ反映
 */
Sprite_Battler.prototype.setBattlerData = function() {
    this._battler.x = this.x;
    this._battler.y = this.y;
    this._battler.z = this.z;
    this._battler._homeX = this._homeX;
    this._battler._homeY = this._homeY;
    this._battler.width = this.getMain().width;
    this._battler.height = this.getMain().height;
    // 拡大率を考慮
    if (pConsiderTargetScale) {
        this._battler.width *= Math.abs(this.getMain().scale.x);
        this._battler.height *= Math.abs(this.getMain().scale.y);
    }
};

/**
 * 【独自】互換性を確保するため追加
 */
Sprite_Actor.prototype.isActor = function() {
    return true;
};
Sprite_Actor.prototype.isEnemy = function() {
    return false;
};
Sprite_Enemy.prototype.isActor = function() {
    return false;
};
Sprite_Enemy.prototype.isEnemy = function() {
    return true;
};

/**
 * 1:バトラー取得用の互換性対応
 * ※色々と無理矢理ですが、ご容赦ください。
 */
if (pReferenceBattler == 1) {
    /**
     * ●戦闘開始時
     */
    var _Game_Actor_onBattleStart = Game_Actor.prototype.onBattleStart;
    Game_Actor.prototype.onBattleStart = function() {
        _Game_Actor_onBattleStart.apply(this, arguments);

        // 互換性を確保するため、参照用ダミーデータを作成
        this._battler = new Game_Actor(this._actorId);
        this._battler._index = this.index();
        this._battler._isDynamicDummy = true;
        this._actor = this._battler;
    };
    var _Game_Enemy_onBattleStart = Game_Enemy.prototype.onBattleStart;
    Game_Enemy.prototype.onBattleStart = function() {
        _Game_Enemy_onBattleStart.apply(this, arguments);

        // 互換性を確保するため、参照用ダミーデータを作成
        this._battler = new Game_Enemy(this._enemyId, 0, 0);
        this._battler._index = this.index();
        this._battler._isDynamicDummy = true;
        this._enemy = this._battler;
    };

    /**
     * ●インデックス
     */
    var _Game_Actor_index = Game_Actor.prototype.index;
    Game_Actor.prototype.index = function() {
        if (this._isDynamicDummy) {
            for (let member of $gameParty.members()) {
                if (this.actorId() == member.actorId()) {
                    return member.index();
                }
            }
        }

        return _Game_Actor_index.apply(this, arguments);
    };
    var _Game_Enemy_index = Game_Enemy.prototype.index;
    Game_Enemy.prototype.index = function() {
        if (this._isDynamicDummy) {
            return this._index;
        }

        return _Game_Enemy_index.apply(this, arguments);
    };
}

/**
 * ●戦闘終了時
 */
var _Game_Actor_onBattleEnd = Game_Actor.prototype.onBattleEnd;
Game_Actor.prototype.onBattleEnd = function() {
    _Game_Actor_onBattleEnd.apply(this, arguments);

    // 不要変数の初期化
    // ※やらないとセーブデータにゴミが入る
    this._battler = undefined;
    this._actor = undefined;
    this._animations = [];
};

/**
 * ●座標反転するかどうかを判定する。
 * 反転時は-1を返す。
 */
function getMirroring(battler) {
    if (battler.isActor()) {
        return -1;
    }
    return 1;
}

/**
 * ●調整ランダム値の取得
 */
function getRandomAdjust(oldVal) {
    var val;
    
    if (oldVal == undefined || !pRandomAdjust) {
        val = Math.random();
    } else {
        val = Math.random();

        // makeBestRandomで制御するため処理廃止
        // // 前回と同じような値を取った場合は調整
        // if (Math.abs(oldVal - val) <= pRandomAdjust) {
        //     // 0.2 -> 0.7, 0.8 -> 0.3というように反対側の値を取得
        //     val = (val + 0.5) % 1;
        // }
    }

    return val;
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

    // 1:バトラー取得
    if (pReferenceBattler == 1) {
        return battler;
    }
    // 0:スプライト取得
    return getBattlerSprite(battler);
}

/**
 * ●指定したバトラーのスプライトを取得する。
 */
function getBattlerSprite(battler) {
    if (!battler) {
        return undefined;
    }

    var sprites;
    const spriteset = getSpriteset();

    // マップ上ではキャラクタースプライトを返す。
    if (!$gameParty.inBattle()) {
        sprites = spriteset._characterSprites;

    // 戦闘中はバトラースプライトを返す。
    } else  {
        sprites = spriteset.battlerSprites();
    }

    // 一致があれば返す
    const sprite = sprites.find(function(s) {
        return s._battler == battler || s._character == battler
    });

    // アクタースプライトのサイズを設定する。
    setActorSpriteSize(sprite);

    return sprite;
}

/**
 * 指定したアクタースプライトのサイズを設定する。
 */
function setActorSpriteSize(sprite) {
    if (sprite._battler && sprite._battler.isActor()) {
        // Sprite_Actorのサイズが取れないのでeffectTargetのものをセットする。
        // やや強引かも……。
        sprite.width = sprite._effectTarget.width;
        sprite.height = sprite._effectTarget.height;
    }
}

/**
 * ●位置の指定がある場合のみ関数定義
 */
if (pFvActorHomeX && pFvActorHomeY) {
    var _Sprite_Actor_setActorHome = Sprite_Actor.prototype.setActorHome;
    Sprite_Actor.prototype.setActorHome = function(index) {
        // フロントビューの場合、位置を設定
        if (!$gameSystem.isSideView()) {
            this.setHome(eval(pFvActorHomeX), eval(pFvActorHomeY));
            return;
        }
        // this.setHome(600 + index * 32, 280 + index * 48);

        // 元処理実行
        _Sprite_Actor_setActorHome.call(this, index);
    };
}

/**
 * 【独自】アニメの対象となるキャラのスプライトを返す
 */
Spriteset_Map.prototype.characterSprites = function() {
    return this._characterSprites;
};

/**
 * 【独自】アニメの対象となるキャラのスプライトを返す
 */
Spriteset_Battle.prototype.characterSprites = function() {
    return this.battlerSprites();
};

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
 * 【独自】バトラーの主体となるスプライトを取得
 * ※ＭＺに合わせてmainSprite()にしたかったが、VE系とかぶるので変更……。
 */
Sprite_Battler.prototype.getMain = function() {
    return this._effectTarget;
};

//-----------------------------------------------
// ダメージ処理関連
//-----------------------------------------------

/**
 * 【独自】DynamicAnimationの途中でダメージ制御を行う
 * ※この処理はDynamicMotionからも呼ばれる想定
 * 　そのため、dynamicActionの型はDynamicAnimation, DynamicMotionの両方となる。
 */
BattleManager.dynamicDamageControl = function(dynamicAction) {
    // 戦闘中以外は処理しない
    if (!$gameParty.inBattle()) {
        return;
    }

    // 全体ダメージ処理の実行（通常のダメージ処理を先行呼び出し）
    if (dynamicAction.damageAll) {
        this._updateDamage = true;
    // ダメージ処理の実行（一回ずつ）
    } else if (dynamicAction.damage) {
        this.isDynamicCallDamage(dynamicAction);
    }
};

/**
 * ●毎フレーム実行される戦闘経過処理
 * ※モーション中のダメージ表示用に処理追加
 */
const _Scene_Battle_updateBattleProcess = Scene_Battle.prototype.updateBattleProcess;
Scene_Battle.prototype.updateBattleProcess = function() {
    if (!this.isAnyInputWindowActive() || BattleManager.isAborting() ||
            BattleManager.isBattleEnd()) {
        // ダメージ更新処理の実行
        if (BattleManager.updateDynamicDamage()) {
            return;
        }
    }

    // 元処理実行
    _Scene_Battle_updateBattleProcess.call(this);
};

/**
 * 【独自】モーション中でもダメージ表示を行うために
 * isBusy()からthis._spriteset.isBusy()を削除した版
 */
BattleManager.isDynamicDamageBusy = function() {
    return ($gameMessage.isBusy() || this._logWindow.isBusy());
};

/**
 * 【独自】全体ダメージ更新処理
 */
BattleManager.updateDynamicDamage = function() {
    // ダメージ処理フラグがONの場合
    if (this._updateDamage) {
        if (!this.isDynamicDamageBusy() && !this.updateEvent()) {
            // 既に処理が終わっているなら、ダメージ処理フラグをOFFして何もしない
            if (this._targets.length == 0) {
                this._updateDamage = false;
                return true;
            }

            // ダメージ処理
            this.updateAction();
            
            // 処理が終わったなら、ダメージ処理フラグをOFF
            if (this._targets.length == 0) {
                this._updateDamage = false;
            }
        }
        return true;
    }
};

/**
 * 【独自】ダメージ処理の実行
 */
BattleManager.isDynamicCallDamage = function(dynamicAction) {
    const action = this._action;
    const subject = this._subject;
    const targets = this._targets;

    // 対象がなければ終了
    if (!targets || !targets.length) {
        return;
    }

    // ランダム型の場合
    if (action.isForRandom()) {
        // 一体ずつダメージ処理
        const target = targets.shift();
        this.invokeAction(subject, target);
        return;
    }

    // 範囲に従ってダメージ処理
    // 重複ターゲットを削除して再作成
    const distinctTargets = targets.filter(function(target, i) {
        return targets.indexOf(target) == i;
    });

    // 対象の人数分実行
    for (const target of distinctTargets) {
        // 処理した要素を削除
        for (let i = 0; i < targets.length; i++) {
            const t = targets[i];
            // 一致した最初の１件を削除
            if (t == target) {
                targets.splice(i, 1);
                break;
            }
        }
        // ダメージ処理実行
        this.invokeAction(subject, target);
    }
};

})();
