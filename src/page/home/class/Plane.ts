import Wall from './Wall'
import { Obj, Direction } from './util'
 
export type PlaneData = {
    planeImageSrc : string
    speed : number
    life : number
    shotDamage : number
    shootImgSrcList : string[]
    shotDelay : number
    shotSpeed : number
    shotListNormalImageIndex : number
    shotCollisionImageIndex : number
} ;

enum ShotStatus {
    STOP = 0,
    ACTION = 1,
}

class Plane extends Obj {
    // Plane Data
    private id : number = 0 ;
    private img : HTMLImageElement | null = null ;
    private shotAction : ShotStatus = ShotStatus.STOP ;
    private shotDelay : number = 1000 ;
    private shotMappingPid : number = 0 ;
    private size : number = 0 ;
    private life : number = 0 ;

    // Shot Data
    private shotImgList : HTMLImageElement[] | null = null ;
    private shotSpeed : number = 0 ;
    private shotListNormalImageIndex : number = 0 ;
    private shotCollisionImageIndex : number = 0 ;
    private shotDamage : number = 0 ;

    constructor( 
        id : number, 
        size : number,
        wall : Wall,
        positionX : number,
        positionY : number,
        {
            planeImageSrc,
            speed,
            life,
            shotDamage,
            shootImgSrcList,
            shotDelay,
            shotSpeed,
            shotListNormalImageIndex,
            shotCollisionImageIndex,
        } : PlaneData
    ) {
        
        super( positionX, positionY, wall, speed ) ;

        this.id = id ;
        this.size = size ;
        this.life = life ;

        this.img = new Image() ;
        this.img.src = planeImageSrc ;
        this.img.width = size ;
        this.img.height = size ;

        this.shotDamage = shotDamage ;
        this.shotDelay = shotDelay ;
        this.shotSpeed = shotSpeed ;
        this.shotListNormalImageIndex = shotListNormalImageIndex ;
        this.shotCollisionImageIndex =  shotCollisionImageIndex ;

        this.shotImgList = shootImgSrcList.map(( src : string ) => {
            const img = new Image() ;
            img.width = size ;
            img.height = size ;
            img.src = src ;
            return img ;
        }) ;
    }

    public getId()                          { return this.id ; } 
    public getImg()                         { return this.img ; }
    public getImgList()                     { return this.shotImgList ; }
    public getShotStatus()                  { return this.shotAction ; }
    public getShotDelay()                   { return this.shotDelay ; }
    public getShotMappingPid()              { return this.shotMappingPid ; }
    public getSize()                        { return this.size ; }
    public getShotSpeed()                   { return this.shotSpeed ; }
    public getShotListNormalImageIndex()    { return this.shotListNormalImageIndex ; }
    public getShotCollisionImageIndex()     { return this.shotCollisionImageIndex ; }
    public getLife()                        { return this.life ; }
    public getShotDamage()                  { return this.shotDamage ; }    
    public getShotPosition( direction : boolean ) {

        let shotPositionX ;

        const middle = (this.size / 10) * 6  ;

        if( direction ) shotPositionX = this.position.x + middle ;
        else shotPositionX = this.position.x - middle ;

        const shotPositionY = this.position.y ; 
        
        return { shotPositionX, shotPositionY }
    }

    public setLife( life : number ) {
        this.life = life ;
    }

    public checkShotAction() {
        return this.shotAction === ShotStatus.ACTION ;
    }
    public checkShotStop() {
        return this.shotAction === ShotStatus.STOP ;
    }
    public shotActionMapping() {
        this.shotAction = ShotStatus.ACTION ;
    }
    public shotStopMapping() {
        this.shotAction =  ShotStatus.STOP ; 
    }
    public shotMapping() {
        this.shotMappingPid = window.setInterval(() => {
            this.shotActionMapping() ;
        }, this.getShotDelay()) ;
    }
    // We'll must have to run it before delete instance
    public deleteShotMapping() {
        clearInterval(this.shotMappingPid) ;
        this.shotMappingPid = 0 ;
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
                if( !this.getShotMappingPid() ) {
                    this.shotActionMapping() ;
                    this.shotMapping() ;
                }
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
                this.deleteShotMapping() ;
                break ;
            default : 
                break ;
        }
    }
}

class EnemyPlane extends Plane {

    constructor( 
        id : number, 
        size : number,
        wall : Wall,
        positionX : number,
        positionY : number,
        planeData : PlaneData
    ) {
        super( id, size, wall, positionX, positionY, planeData ) ;

        this.movementMapping() ;
        this.shotMapping() ;
    }

    public movementMapping() {
        this.direction.left = true ;
    }
}

class Level1Enemy extends EnemyPlane {
    
}
  
export { Plane, UserPlane, Direction, EnemyPlane } ;