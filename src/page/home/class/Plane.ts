import Wall from './Wall'
import { Shot } from './Shot'
import { Obj, Direction } from './util'
  
export enum ShotStatus {
    LOAD = 0,
    ACTION = 1,
    STOP = 2
}

class Plane extends Obj {
    private id : number = 0 ;
    private img : HTMLImageElement | null = null ;
    private shotAction : ShotStatus = ShotStatus.STOP ;
    private shotDelay : number = 2000 ;

    private shootImgList : HTMLImageElement[] | null = null ;
    
    constructor( 
        id : number, 
        size : number, 
        imgSrc : string, 
        positionX : number, 
        positionY : number, 
        wall : Wall, 
        speed : number, 
        shootImgSrcList : string[],
        shotDelay? : number,
    ) {
        
        super( positionX, positionY, wall, speed ) ;

        this.id = id ;

        this.img = new Image() ;
        this.img.src = imgSrc ;
        this.img.width = size ;
        this.img.height = size ;

        if( shotDelay ) this.shotDelay = shotDelay ;

        this.shootImgList = shootImgSrcList.map(( src : string ) => {
            const img = new Image() ;
            img.width = size ;
            img.height = size ;
            img.src = src ;
            return img ;
        }) ;
    }

    public getId()             { return this.id ; } 
    public getImg()            { return this.img ; }
    public getImgList()        { return this.shootImgList ; }
    public getShotStatus()     { return this.shotAction ; }
    public getShotDelay()      { return this.shotDelay ; }
    public shotActionMapping() {
        if( this.shotAction === ShotStatus.LOAD ) return ;
        this.shotAction = ShotStatus.ACTION ;
    }
    public shotLoadMapping() {
        this.shotAction =  ShotStatus.LOAD ; 
    }
    public shotStopMapping() {
        this.shotAction =  ShotStatus.STOP ; 
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
                this.shotActionMapping() ;
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
                this.shotStopMapping() ;
                break ;
            default : 
                break ;
        }
    }
}

class Level1EnemyPlane extends Plane {

    constructor( 
        id : number, 
        size : number, 
        imgSrc : string, 
        positionX : number, 
        positionY : number, 
        wall : Wall, 
        speed : number, 
        shootImgSrcList : string[],
        shotDelay : number|undefined,
    ) {
        super(id, size, imgSrc, positionX, positionY, wall, 3, shootImgSrcList, shotDelay) ;
        this.movementMapping() ;
        this.shotMapping() ;
    }

    public movementMapping() {
        this.direction.left = true ;
    }

    public shotMapping() {
        setInterval(() => {
            this.shotActionMapping() ;
        }, this.getShotDelay()) ;
    }

}
  
export { Plane, UserPlane, Direction, Level1EnemyPlane } ;