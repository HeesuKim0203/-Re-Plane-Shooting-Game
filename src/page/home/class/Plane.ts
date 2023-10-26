import Wall from './Wall'
import { Shoot } from './Shoot'
import { Obj, Direction } from './util'
  
class Plane extends Obj {
    private id : number = 0 ;
    private img : HTMLImageElement | null = null ;

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

    public registerShoot() {
        
    }
}

class UserPlane extends Plane {

    public keyDownToMoveMapping( event : KeyboardEvent ) : void {

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
                console.log(typeof event.key) ;
                break ;
            default : 
                break ;
        }
    }

    public keyUpToMoveMapping( event : KeyboardEvent ) : void {
        
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
                console.log(typeof event.key) ;
                break ;
            default : 
                break ;
        }
    }
}
  
export { Plane, UserPlane, Direction } ;