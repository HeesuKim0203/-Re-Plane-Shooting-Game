import Wall from './Wall'
import { Shoot } from './Shoot'
import { Obj, Direction } from './util'
  
class Plane extends Obj {
    private id : number = 0 ;
    private img : HTMLImageElement | null = null ;
    
    private shoots : Shoot[] = [] ;
    
    constructor( id : number, size : number, imgSrc : string, positionX : number, positionY : number, wall : Wall, speed : number ) {
        
        super( positionX, positionY, wall, speed ) ;

        this.id = id ;

        this.img = new Image() ;
        this.img.src = imgSrc ;
        this.img.width = size ;
        this.img.height = size ;
    }

    public getId()          { return this.id ; } 
    public getImg()         { return this.img ; }

    public registerShoot() {
        
    }
}

class UserPlane extends Plane {

    public keyDownToMoveMapping( event : KeyboardEvent ) : void {

        switch(event.key) {
            case('ArrowUp') : 
                this.getDirection().up = true ;
                break ;
            case('ArrowDown') : 
                this.getDirection().down = true ;
                break ;
            case('ArrowRight') :
                this.getDirection().right = true ;
                break ;
            case('ArrowLeft') :
                this.getDirection().left = true ;
                break ;
            case(' ') :
                console.log(typeof event.key) ;
                break ;
            default : 
                break ;
        }
    }

    public keyUpToMoveMapping( event : KeyboardEvent ) : void {
        
        switch(event.key) {
            case('ArrowUp') : 
                this.getDirection().up = false ;
                break ;
            case('ArrowDown') : 
                this.getDirection().down = false ;
                break ;
            case('ArrowRight') :
                this.getDirection().right = false ;
                break ;
            case('ArrowLeft') :
                this.getDirection().left = false ;
                break ;
            case(' ') :
                console.log(typeof event.key) ;
                break ;
            default : 
                break ;
        }
    }
}
  
export { Plane, UserPlane, Direction } ;