import { useRef, useEffect, useState } from 'react' 
import type { CanvasHTMLAttributes, KeyboardEvent } from 'react' 

import backgroundSrc from './img/background/background.png'
import userPlaneSrc from './img/planes/user_airplane.png'
import useCanvas from './useCanvas'
import Painter from './class/Painter'
import Wall from './class/Wall'
import { Plane, UserPlane } from './class/Plane'

interface CanvasProps extends CanvasHTMLAttributes<HTMLCanvasElement> { }

const Canvas = ( props : CanvasProps ) => {
  
  const canvasRef = useCanvas((canvas) => {

    const SPEED = 4 ;
    const width = props.width as number ;
    const height = props.height as number ;

    const wall = new Wall(0, 0, width, height) ;
    const userPlane = new UserPlane(0, 100, userPlaneSrc, 0, 0, wall, SPEED) ;

    const paint = new Painter(canvas, backgroundSrc, userPlane) ;

    document.addEventListener('keydown', (event) => userPlane.keyDownToMoveMapping(event));
    document.addEventListener('keyup', (event) => userPlane.keyUpToMoveMapping(event));
    setInterval(() => {

    }, 500) ;

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