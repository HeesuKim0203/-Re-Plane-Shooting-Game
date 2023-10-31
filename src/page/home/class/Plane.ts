import Wall from './Wall'
import { Shot } from './Shot'
import { Obj, Direction } from './util'
  
enum ShotStatus {
    LOAD = 0,
    ACTION = 1,
    STOP = 2
}

class Plane extends Obj {
    private id : number = 0 ;
    private img : HTMLImageElement | null = null ;
    shotAction : ShotStatus = ShotStatus.STOP ;

    private shootImgList : HTMLImageElement[] | null = null ;
    
    constructor( id : number, size : number, imgSrc : string, positionX : number, positionY : number, wall : Wall, speed : number, shootImgSrcList : string[] ) {
        
        super( positionX, positionY, wall, speed ) ;

        this.id = id ;

        this.img = new Image() ;
        this.img.src = imgSrc ;
        this.img.width = size ;
        this.img.height = size ;

        this.shootImgList = shootImgSrcList.map(( src : string ) => {
            const img = new Image() ;
            img.width = size ;
            img.height = size ;
            img.src = src ;
            return img ;
        }) ;
    }

    public getId()          { return this.id ; } 
    public getImg()         { return this.img ; }
    public getImgList()     { return this.shootImgList ; }
    public oneShot() {
        this.shotAction =  ShotStatus.LOAD; 
    }
}

class UserPlane extends Plane {

    public keyDownToMoveMapping( event : KeyboardEvent ) : void {

        event.preventDefault() ;

        switch(event.key) {
            case('ArrowUp') : 
                this.direction.up = true ;
                break ;
            case('ArrowDown') : 
                this.direction.down = true ;
                break ;
            case('ArrowRight') :
                this.direction.right = true ;
                break ;
            case('ArrowLeft') :
                this.direction.left = true ;
                break ;
            case(' ') :
                
                if( this.shotAction == ShotStatus.LOAD ) break ;

                this.shotAction = ShotStatus.ACTION ;
                
                break ;
            default : 
                break ;
        }
    }

    public keyUpToMoveMapping( event : KeyboardEvent ) : void {
        
        event.preventDefault() ;

        switch(event.key) {
            case('ArrowUp') : 
                this.direction.up = false ;
                break ;
            case('ArrowDown') : 
                this.direction.down = false ;
                break ;
            case('ArrowRight') :
                this.direction.right = false ;
                break ;
            case('ArrowLeft') :
                this.direction.left = false ;
                break ;
            case(' ') :
                this.shotAction = ShotStatus.STOP ;
                break ;
            default : 
                break ;
        }
    }
}
  
export { Plane, UserPlane, Direction } ;