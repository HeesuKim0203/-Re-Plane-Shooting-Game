import shoot1Src from '../img/shot/enemyPlaneShot/shot5_1.png'
import shoot2Src from '../img/shot/enemyPlaneShot/shot5_2.png'
import shoot3Src from '../img/shot/enemyPlaneShot/shot5_3.png'
import shoot4Src from '../img/shot/enemyPlaneShot/shot5_4.png'
import shoot5Src from '../img/shot/enemyPlaneShot/shot5_5.png'

import shoot6Src from '../img/shot/enemyPlaneShot/shot5_exp1.png'
import shoot7Src from '../img/shot/enemyPlaneShot/shot5_exp2.png'
import shoot8Src from '../img/shot/enemyPlaneShot/shot5_exp3.png'
import shoot9Src from '../img/shot/enemyPlaneShot/shot5_exp4.png'
import shoot10Src from '../img/shot/enemyPlaneShot/shot5_exp5.png'
import shoot11Src from '../img/shot/enemyPlaneShot/shot5_exp6.png'
import shoot12Src from '../img/shot/enemyPlaneShot/shot5_exp7.png'

import level1EnemyPlaneSrc from '../img/planes/level1_enemy_planes.png'
import { PlaneData } from '../class/Plane'

export type EnemyPlanLevelData = {
    level : number
    planeDate : PlaneData
}

const enemyPlaneList : EnemyPlanLevelData[] = [
    {
        level : 1,
        planeDate : {
            planeImageSrc : level1EnemyPlaneSrc,
            size : {
                width : 105,
                height : 82,
                expWidth : 0,
                expHeight : 0
            },
            shotSize : {
                width : 46,
                height : 11,
                expWidth : 74,
                expHeight : 49
            },
            speed : 1,
            life : 2,
            shotDamage : 1 ,
            shootImgSrcList : [
                shoot1Src,
                shoot2Src,
                shoot3Src,
                shoot4Src,
                shoot5Src,
                shoot6Src,
                shoot7Src,
                shoot8Src,
                shoot9Src,
                shoot10Src,
                shoot11Src,
                shoot12Src
            ],
            shotDelay : 2000,
            shotSpeed : 8,
            shotListNormalImageIndex : 4,
            shotCollisionImageIndex : 6
        }
    }
] ;

export default enemyPlaneList ;
