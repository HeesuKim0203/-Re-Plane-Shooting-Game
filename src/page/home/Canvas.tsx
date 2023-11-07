import { useRef, useEffect, useState } from 'react' 
import type { CanvasHTMLAttributes, KeyboardEvent } from 'react' 

import backgroundSrc from './img/background/background.png'
import userPlaneSrc from './img/planes/user_airplane.png'
import level1EnemyPlaneSrc from './img/planes/level1_enemy_planes.png'
import useCanvas from './useCanvas'
import Painter from './class/Painter'
import Wall from './class/Wall'
import { Level1EnemyPlane, Plane, UserPlane } from './class/Plane'

import shoot1 from './img/shot/shot5_1.png'
import shoot2 from './img/shot/shot5_2.png'
import shoot3 from './img/shot/shot5_3.png'
import shoot4 from './img/shot/shot5_4.png'
import shoot5 from './img/shot/shot5_5.png'

interface CanvasProps extends CanvasHTMLAttributes<HTMLCanvasElement> { }

const Canvas = ( props : CanvasProps ) => {
  
  const canvasRef = useCanvas((canvas) => {

    const SPEED = 4 ;
    const width = props.width as number ;
    const height = props.height as number ;

    const wall = new Wall(0, 0, width, height) ;
    const userPlane = new UserPlane(0, 100, userPlaneSrc, 0, 0, wall, SPEED, [ shoot1, shoot1, shoot2, shoot2, shoot3, shoot3, shoot4, shoot4, shoot5 ], 1000) ;
    const enemyPlane1 = new Level1EnemyPlane(1, 100, level1EnemyPlaneSrc, 1100, 0, wall, SPEED, [ shoot1, shoot1, shoot2, shoot2, shoot3, shoot3, shoot4, shoot4, shoot5 ], 1000) ; 

    const paint = new Painter(canvas, backgroundSrc, userPlane) ;
    paint.registerPlane(enemyPlane1) ;

    document.addEventListener('keydown', (event) => userPlane.keyDownToMoveMapping(event));
    document.addEventListener('keyup', (event) => userPlane.keyUpToMoveMapping(event));

    paint.initBackground() ;
    paint.runAnimationFrame() ;

  }) ; 

  return (
    <canvas 
      ref = { canvasRef }
      {...props}
    />
  )
}

export default Canvas