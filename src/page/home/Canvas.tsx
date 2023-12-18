import type { CanvasHTMLAttributes } from 'react' 

import backgroundSrc from './img/background/background.png'
import useCanvas from './useCanvas'
import Painter from './class/Painter'
import Wall from './class/Wall'
import { PlaneList, UserPlane } from './class/Plane'
import { USER_LIFE } from '../../util/className'

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
    const userPlane = new UserPlane(0, 40, (height / 2) - (userPlaneData.size.height / 2), userPlaneData) ;

    const planeList = new PlaneList() ;
    planeList.registerUserPlane(userPlane) ;

    const userLife = document.getElementsByClassName(USER_LIFE)[0] as HTMLParagraphElement ;
    userLife.innerText = `Life : ${userPlane.getLife()}` ;

    const paint = new Painter(canvas, backgroundSrc) ;

    document.addEventListener('keydown', (event) => userPlane.keyDownToMoveMapping(event));
    document.addEventListener('keyup', (event) => userPlane.keyUpToMoveMapping(event));

    paint.initBackground() ;
    paint.runAnimationFrame() ;

    window.addEventListener('focus', (event) => window.location.reload(), false);

    const game = new Game({ title : gameData.title, enemyPlaneImformationList : gameData.enemyPlaneList, painter : paint, enemyPlaneDataList : enemyPlaneList }) ;
    
    game.start() ;
  }) ; 

  return (
    <>
      <canvas 
        data-testid = "painter-canvas"
        ref = { canvasRef }
        {...props}
      />
    </>
  )
}

export default Canvas