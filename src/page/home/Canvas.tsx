import type { CanvasHTMLAttributes } from 'react' 

import backgroundSrc from './img/background/background.png'
import useCanvas from './useCanvas'
import Painter from './class/Painter'
import Wall from './class/Wall'
import { PlaneList, UserPlane } from './class/Plane'

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
    const userPlane = new UserPlane(0, wall, 40, (height / 2) - (userPlaneData.size.height / 2), userPlaneData) ;

    const planeList = new PlaneList() ;
    planeList.registerUserPlane(userPlane) ;

    const userLife : HTMLParagraphElement = document.createElement('p') ;
    const canvasContainer = document.getElementsByClassName('canvas-container')[0] ;
    userLife.className = 'userLife absolute -top-6 left-1 text-white font-pixel text-xl' ;
    userLife.innerText = `Life : ${userPlane.getLife()}` ;
    canvasContainer.appendChild(userLife) ;

    const paint = new Painter(canvas, backgroundSrc, planeList, wall) ;

    document.addEventListener('keydown', (event) => userPlane.keyDownToMoveMapping(event));
    document.addEventListener('keyup', (event) => userPlane.keyUpToMoveMapping(event));

    paint.initBackground() ;
    paint.runAnimationFrame() ;

    const gameWallX = 300 ;

    const gameWallXHtml : HTMLParagraphElement = document.createElement('div') ;
    gameWallXHtml.className = "gameWallXHtml absolute -top-6 left-[300px] bg-[url('/public/gamePositionX.png')] w-5 h-5" ;
    canvasContainer.appendChild(gameWallXHtml) ;

    const gameWall = new Wall(gameWallX, 0, width, height) ;
    const game = new Game({ title : gameData.title, enemyPlaneImformationList : gameData.enemyPlaneList, wall : gameWall, painter : paint, enemyPlaneDataList : enemyPlaneList }, planeList) ;
    
    game.start() ;
  }) ; 

  return (
    <>
      <canvas 
        ref = { canvasRef }
        {...props}
      />
      <div className=''>

      </div>
    </>
  )
}

export default Canvas