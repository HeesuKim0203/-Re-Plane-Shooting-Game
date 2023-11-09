import { PlaneData } from '../class/Plane'

import shoot1Src from '../img/shot/shot5_1.png'
import shoot2Src from '../img/shot/shot5_2.png'
import shoot3Src from '../img/shot/shot5_3.png'
import shoot4Src from '../img/shot/shot5_4.png'
import shoot5Src from '../img/shot/shot5_5.png'

import userPlaneSrc from '../img/planes/user_airplane.png'

const userPlaneData : PlaneData = {
    planeImageSrc : userPlaneSrc,
    speed : 3,
    life : 3,
    shotDamage : 1,
    shootImgSrcList : [
        shoot1Src, shoot1Src,
        shoot2Src, shoot2Src,
        shoot3Src, shoot3Src,
        shoot4Src, shoot4Src,
        shoot5Src
    ],
    shotDelay : 500,
    shotSpeed : 10,
    shotListNormalImageIndex : 8,
    shotCollisionImageIndex : 9
} ;

export default userPlaneData ;

