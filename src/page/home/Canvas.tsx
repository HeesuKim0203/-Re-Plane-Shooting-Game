import type { CanvasHTMLAttributes } from 'react' 

import backgroundSrc from './img/background/background.png'
import useCanvas from './useCanvas'
import Painter from './class/Painter'
import Wall from './class/Wall'
import { UserPlane } from './class/Plane'

import userPlaneData from './data/userPlane'
import level1PlaneData from './data/Level1Plane'

import round1 from './round/round1.json' ;

interface CanvasProps extends CanvasHTMLAttributes<HTMLCanvasElement> { }

const Canvas = ( props : CanvasProps ) => {
  
  const canvasRef = useCanvas((canvas) => {

    console.log(round1) ;

    const width = props.width as number ;
    const height = props.height as number ;

    const wall = new Wall(0, 0, width, height) ;
    const userPlane = new UserPlane(0, 100, wall, 0, 0, userPlaneData) ;
    //const enemyPlane1 = new Level1EnemyPlane(1, 100, wall, 1100, 0, level1PlaneData) ; 

    const paint = new Painter(canvas, backgroundSrc, userPlane) ;
    //paint.registerPlane(enemyPlane1) ;

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