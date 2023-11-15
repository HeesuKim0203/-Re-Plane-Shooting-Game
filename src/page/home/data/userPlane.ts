import { PlaneData, PlaneKind } from '../class/Plane'

import shoot1Src from '../img/shot/userPlaneShot/shot2_1.png'
import shoot2Src from '../img/shot/userPlaneShot/shot2_2.png'
import shoot3Src from '../img/shot/userPlaneShot/shot2_3.png'
import shoot4Src from '../img/shot/userPlaneShot/shot2_4.png'
import shoot5Src from '../img/shot/userPlaneShot/shot2_5.png'
import shoot6Src from '../img/shot/userPlaneShot/shot2_6.png'
import shoot7Src from '../img/shot/userPlaneShot/shot2_7.png'

import shoot8Src from '../img/shot/userPlaneShot/shot2_exp1.png'
import shoot9Src from '../img/shot/userPlaneShot/shot2_exp2.png'
import shoot10Src from '../img/shot/userPlaneShot/shot2_exp3.png'
import shoot11Src from '../img/shot/userPlaneShot/shot2_exp4.png'
import shoot12Src from '../img/shot/userPlaneShot/shot2_exp5.png'

import userPlaneSrc from '../img/planes/user_airplane.png'

const userPlaneData : PlaneData = {
    planKind : PlaneKind.USERPLANE,
    planeBeforImageSrc : [],
    planeImageSrc : userPlaneSrc,
    planeExpImageSrc : [],
    size : {
        beforWidth : 0,
        beforHeight : 0,
        width : 77,
        height : 34, 
        expWidth : 0,
        expHeight : 0
    },
    shotSize : {
        beforWidth : 0,
        beforHeight : 0,
        width : 25,
        height : 21,
        expWidth : 64,
        expHeight : 64
    },
    speed : 5,
    life : 10,
    shotDamage : 1,
    shotBeforImageSrcList : [
        shoot1Src,
        shoot2Src,
        shoot3Src,
        shoot4Src,
        shoot5Src,
        shoot6Src,
    ],
    shotImage: shoot7Src,
    shotExpImageSrcList : [
        shoot8Src,
        shoot9Src,
        shoot10Src,
        shoot11Src,
        shoot12Src,
    ],
    shotDelay : 200,
    shotSpeed : 10,
} ;

export default userPlaneData ;

