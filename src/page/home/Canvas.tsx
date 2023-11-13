import type { CanvasHTMLAttributes } from 'react' 

import backgroundSrc from './img/background/background.png'
import useCanvas from './useCanvas'
import Painter from './class/Painter'
import Wall from './class/Wall'
import { UserPlane } from './class/Plane'

import userPlaneData from './data/userPlane'

import gameData from './gameData/data.json'
import Game from './class/Game'
import enemyPlaneList from './data/enemyPlane'

interface CanvasProps extends CanvasHTMLAttributes<HTMLCanvasElement> { }

const Canvas = ( props : CanvasProps ) => {
  
  const canvasRef = useCanvas((canvas) => {

    const width = props.width as number ;
    const height = props.height as number ;

    const wall = new Wall(0, 0, width, height) ;
    const userPlane = new UserPlane(0, wall, 0, 0, userPlaneData) ;
    const paint = new Painter(canvas, backgroundSrc, userPlane) ;

    document.addEventListener('keydown', (event) => userPlane.keyDownToMoveMapping(event));
    document.addEventListener('keyup', (event) => userPlane.keyUpToMoveMapping(event));

    paint.initBackground() ;
    paint.runAnimationFrame() ;

    const game = new Game({ title : gameData.title, enemyPlan : gameData.enemyPlaneList, wall : wall, painter : paint, enemyPlaneDataList : enemyPlaneList }) ;
    
    game.start() ;
  }) ; 

  return (
    <canvas 
      ref = { canvasRef }
      {...props}
    />
  )
}

export default Canvas