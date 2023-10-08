import { useRef, useEffect, useState } from 'react' 
import type { CanvasHTMLAttributes, KeyboardEvent } from 'react' 

import backgroundSrc from './img/background.png'
import userPlaneSrc from './img/user_airplane.png'
import useCanvas from './useCanvas'
import Painter from './class/Painter'
import Wall from './class/Wall'
import { Plane, UserPlane } from './class/Plane'

interface CanvasProps extends CanvasHTMLAttributes<HTMLCanvasElement> { }

const Canvas = ( props : CanvasProps ) => {
  
  const canvasRef = useCanvas((canvas) => {

    const width = props.width as number ;
    const height = props.height as number ;

    const paint = new Painter(canvas, backgroundSrc) ;
    const wall = new Wall(0, 0, width, height) ;

    const user = new UserPlane(0, 100, userPlaneSrc, 0, 0, wall) ;

    paint.initBackground() ;
    paint.registerPlane(user) ;

    paint.runAnimationFrame() ;

    document.addEventListener('keydown', user.moveEvent());

  }) ; 

  return (
    <canvas 
      ref = { canvasRef }
      {...props}
    />
  )
}

export default Canvas