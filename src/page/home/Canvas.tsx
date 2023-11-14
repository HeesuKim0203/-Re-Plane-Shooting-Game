import type { CanvasHTMLAttributes } from 'react' 

import backgroundSrc from './img/background/background.png'
import useCanvas from './useCanvas'
import Painter from './class/Painter'
import Wall from './class/Wall'
import { PlaneKind, PlaneList, UserPlane } from './class/Plane'

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

    const planeList = new PlaneList() ;
    planeList.registerPlane(userPlane, PlaneKind.USERPLANE) ;

    const paint = new Painter(canvas, backgroundSrc, planeList) ;

    document.addEventListener('keydown', (event) => userPlane.keyDownToMoveMapping(event));
    document.addEventListener('keyup', (event) => userPlane.keyUpToMoveMapping(event));

    paint.initBackground() ;
    paint.runAnimationFrame() ;

    const game = new Game({ title : gameData.title, enemyPlaneImformationList : gameData.enemyPlaneList, wall : wall, painter : paint, enemyPlaneDataList : enemyPlaneList }, planeList) ;
    
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