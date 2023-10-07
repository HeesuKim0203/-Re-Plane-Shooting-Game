import { useRef, useEffect, useState } from 'react' ;
import type { CanvasHTMLAttributes, KeyboardEvent } from 'react' ;

import airplan from './user_airplane.svg'

interface CanvasProps extends CanvasHTMLAttributes<HTMLCanvasElement> { }
interface Position {
  top : boolean
  bottom : boolean
  left : boolean
  right : boolean
}

const Canvas = ( props : CanvasProps ) => {
  
  const canvasRef = useRef(null) ; 

  const [ position, setPosition ] = useState<Position>({
    top : false,
    bottom : false,
    left : false,
    right : false,
  }) ;
  const [ airPlan, setAirPlan ] = useState<HTMLImageElement>() ;

  useEffect(() => {

    const image = new Image() ;
    image.src = airplan ;

    image.onload = () => {
      setAirPlan(image) ;
    }
    
  }, []) ;
  
  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement | null ;
    const context = canvas?.getContext('2d') ;

    if( context ) {
      context.fillStyle = '#111111' ;
      context.fillRect(0, 0, context.canvas.width, context.canvas.height) ;

      if(airPlan) {
        context.drawImage(airPlan, 500, 450) ;
      }

      console.log(position.right) ;
    } 
 
  }, [ airPlan, position ]) ;

  function onKeyDown( event : KeyboardEvent ) {
    if( event.key === 'ArrowRight' ) {
      setPosition({
        ...position,
        right : true
      }) ;
    } else if( event.key === 'ArrowLeft' ) {
      setPosition({
        ...position,
        left : true
      }) ;
    }
  }

  function onKeyUp( event : KeyboardEvent ) {
    // if( event.key === 'ArrowRight' ) {
    //   setPosition({
    //     ...position,
    //     right : position.right + 3
    //   }) ;
    // } else if( event.key === 'ArrowLeft' ) {
    //   setPosition({
    //     ...position,
    //     left : position.left + 3
    //   }) ;
    // }
  }

  return (
    <canvas 
      ref = { canvasRef } 
      tabIndex = { 0 }
      onKeyDown = { onKeyDown }
      onKeyUp = { onKeyUp }
      {...props}
    />
  )
}

export default Canvas