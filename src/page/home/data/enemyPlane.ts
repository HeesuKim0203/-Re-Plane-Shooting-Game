import shoot1Src from '../img/shot/enemyLevel1PlaneShot/shot5_1.png'
import shoot2Src from '../img/shot/enemyLevel1PlaneShot/shot5_2.png'
import shoot3Src from '../img/shot/enemyLevel1PlaneShot/shot5_3.png'
import shoot4Src from '../img/shot/enemyLevel1PlaneShot/shot5_4.png'
import shoot5Src from '../img/shot/enemyLevel1PlaneShot/shot5_5.png'

import shoot6Src from '../img/shot/enemyLevel1PlaneShot/shot5_exp1.png'
import shoot7Src from '../img/shot/enemyLevel1PlaneShot/shot5_exp2.png'
import shoot8Src from '../img/shot/enemyLevel1PlaneShot/shot5_exp3.png'
import shoot9Src from '../img/shot/enemyLevel1PlaneShot/shot5_exp4.png'
import shoot10Src from '../img/shot/enemyLevel1PlaneShot/shot5_exp5.png'
import shoot11Src from '../img/shot/enemyLevel1PlaneShot/shot5_exp6.png'
import shoot12Src from '../img/shot/enemyLevel1PlaneShot/shot5_exp7.png'

import planeExp1 from '../img/planes/enemyLevel1PlaneExp/exp1.png'
import planeExp2 from '../img/planes/enemyLevel1PlaneExp/exp2.png'
import planeExp3 from '../img/planes/enemyLevel1PlaneExp/exp3.png'
import planeExp4 from '../img/planes/enemyLevel1PlaneExp/exp4.png'
import planeExp5 from '../img/planes/enemyLevel1PlaneExp/exp5.png'
import planeExp6 from '../img/planes/enemyLevel1PlaneExp/exp6.png'
import planeExp7 from '../img/planes/enemyLevel1PlaneExp/exp7.png'
import planeExp8 from '../img/planes/enemyLevel1PlaneExp/exp8.png'
import planeExp9 from '../img/planes/enemyLevel1PlaneExp/exp9.png'
import planeExp10 from '../img/planes/enemyLevel1PlaneExp/exp10.png'
import planeExp11 from '../img/planes/enemyLevel1PlaneExp/exp11.png'

import level1EnemyPlaneSrc from '../img/planes/level1_enemy_planes.png'
import { PlaneData } from '../class/Plane'

import shoot1SrcLevel2 from '../img/shot/enemyLevel2PlaneShot/shot6_1.png'
import shoot2SrcLevel2 from '../img/shot/enemyLevel2PlaneShot/shot6_2.png'
import shoot3SrcLevel2 from '../img/shot/enemyLevel2PlaneShot/shot6_3.png'
import shoot4SrcLevel2 from '../img/shot/enemyLevel2PlaneShot/shot6_4.png'

import shoot5SrcLevel2 from '../img/shot/enemyLevel2PlaneShot/shot6_exp1.png'
import shoot6SrcLevel2 from '../img/shot/enemyLevel2PlaneShot/shot6_exp2.png'
import shoot7SrcLevel2 from '../img/shot/enemyLevel2PlaneShot/shot6_exp3.png'
import shoot8SrcLevel2 from '../img/shot/enemyLevel2PlaneShot/shot6_exp4.png'
import shoot9SrcLevel2 from '../img/shot/enemyLevel2PlaneShot/shot6_exp5.png'
import shoot10SrcLevel2 from '../img/shot/enemyLevel2PlaneShot/shot6_exp6.png'
import shoot11SrcLevel2 from '../img/shot/enemyLevel2PlaneShot/shot6_exp7.png'

import planeExp1Level2 from '../img/planes/enemyLevel2PlaneExp/exp1.png'
import planeExp2Level2 from '../img/planes/enemyLevel2PlaneExp/exp2.png'
import planeExp3Level2 from '../img/planes/enemyLevel2PlaneExp/exp3.png'
import planeExp4Level2 from '../img/planes/enemyLevel2PlaneExp/exp4.png'
import planeExp5Level2 from '../img/planes/enemyLevel2PlaneExp/exp5.png'
import planeExp6Level2 from '../img/planes/enemyLevel2PlaneExp/exp6.png'
import planeExp7Level2 from '../img/planes/enemyLevel2PlaneExp/exp7.png'
import planeExp8Level2 from '../img/planes/enemyLevel2PlaneExp/exp8.png'
import planeExp9Level2 from '../img/planes/enemyLevel2PlaneExp/exp9.png'
import planeExp10Level2 from '../img/planes/enemyLevel2PlaneExp/exp10.png'
import planeExp11Level2 from '../img/planes/enemyLevel2PlaneExp/exp11.png'

import level1EnemyPlaneSrcLevel2 from '../img/planes/level2_enemy_planes.png'

export type EnemyPlanLevelData = {
    level : number
    planeDate : PlaneData
}

const enemyPlaneList : EnemyPlanLevelData[] = [
    {
        level : 1,
        planeDate : {
            planeImageRunSrc : "",
            planeImageSrc : level1EnemyPlaneSrc,
            planeExpImageSrcList : [
                planeExp1,
                planeExp2,
                planeExp3,
                planeExp4,
                planeExp5,
                planeExp6,
                planeExp7,
                planeExp8,
                planeExp9,
                planeExp10,
                planeExp11,
            ],
            size : {
                width : 105,
                height : 82,
                expWidth : 183,
                expHeight : 183
            },
            shotSize : {
                width : 46,
                height : 11,
                expWidth : 74,
                expHeight : 49
            },
            speed : 1,
            life : 2,
            shotDamage : 1,
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
    },
    {
        level : 2,
        planeDate : {
            planeImageRunSrc : "",
            planeImageSrc : level1EnemyPlaneSrcLevel2,
            planeExpImageSrcList : [
                planeExp1Level2,
                planeExp2Level2,
                planeExp3Level2,
                planeExp4Level2,
                planeExp5Level2,
                planeExp6Level2,
                planeExp7Level2,
                planeExp8Level2,
                planeExp9Level2,
                planeExp10Level2,
                planeExp11Level2,
            ],
            size : {
                width : 117,
                height : 75,
                expWidth : 256,
                expHeight : 256
            },
            shotSize : {
                width : 58,
                height : 12,
                expWidth : 128,
                expHeight : 128
            },
            speed : 1.2,
            life : 3,
            shotDamage : 1 ,
            shootImgSrcList : [
                shoot1SrcLevel2,
                shoot2SrcLevel2,
                shoot3SrcLevel2,
                shoot4SrcLevel2,
                shoot5SrcLevel2,
                shoot6SrcLevel2,
                shoot7SrcLevel2,
                shoot8SrcLevel2,
                shoot9SrcLevel2,
                shoot10SrcLevel2,
                shoot11SrcLevel2,
            ],
            shotDelay : 1800,
            shotSpeed : 8,
            shotListNormalImageIndex : 3,
            shotCollisionImageIndex : 5
        }
    }
] ;

export default enemyPlaneList ;
