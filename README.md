# Re Plane Shooting Game
This project was carried out as a react. Program setup is the same as a normal [React app](https://react.dev/).

## Game Introduction
It's a simple game to shoot down enemy planes. Shoot down all enemy planes!

## Custom Plane Data
We can customize plane data.

### User Plane

userPlane.ts

Type PlaneData 

Name|Type|Description|
|------|---|---|
|planeImageSrc|string|Plane image src|
|planeExpImageSrc|string[]|Plane exp image src list|
|size|size|Plane size|
|speed|number|Plane speed|
|life|number|Plane life|
|shootImgSrcList|string[]|Shot image src list(update scheduled)|
|shotSize|size|Shot size|
|shotDamage|number|Shot damage|
|shotDelay|number|The minimum time it takes to get the next shot|
|shotSpeed|number|Shot speed|
|shotListNormalImageIndex|number|Image Index before and after shot|
|shotCollisionImageIndex|number|Index at which the explosion image starts|

### Enemy Plane

enemyPlane.ts

Type EnemyPlanLevelData

Name|Type|Description|
|------|---|---|
|level|number|Enemy plane level(Used to divide types of planes)|
|planeData|PlaneData|Data on enemy planes by level(Same as user plane data)|

### Enemy Plane Imfotmation Apply to Game
Please correct the data.json  

data.json

Name|Type|Description|
|------|---|---|
|title|string|Game Title|
|enemyPlaneList|EnemyPlaneImformation|Plane level and number of planes|

Type EnemyPlaneImformation

Name|Type|Description|
|------|---|---|
|level|number|Plane level|
|num|number|Plane number|

### Other data settings

Type size

Name|Type|Description|
|------|---|---|
|width|number|Normal image width|
|height|number|Normal image height|
|expWidth|number|Exp image width|
|expHeight|number|Exp image height|

### Game Environment Settings

util.ts

Name|Type|Description|
|------|---|---|
|SCORE|number|Points earned for each shot down of a plane|
|ENEMPLANE_MIN_TIME|number|The minimum time it takes for the next plane to come out|
|ENEMPLANE_MAX_TIME|number|The maximum time it takes for the next plane to come out|