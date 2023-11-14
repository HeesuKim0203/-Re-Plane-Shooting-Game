import Wall from './Wall'
import { Obj, Direction, size } from './util'
 
export type PlaneData = {
    planeImageSrc : string
    speed : number
    life : number
    size : size
    shotSize : size
    shotDamage : number
    shootImgSrcList : string[]
    shotDelay : number
    shotSpeed : number
    shotListNormalImageIndex : number
    shotCollisionImageIndex : number
} ;

export enum PlaneKind {
    USERPLANE = 0,
    ENEMYPLANE = 1
}

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
    private size : size = { width : 0, height : 0, expWidth : 0, expHeight : 0 } ;
    private life : number = 0 ;

    // Shot Data
    private shotImgList : HTMLImageElement[] | null = null ;
    private shotSpeed : number = 0 ;
    private shotListNormalImageIndex : number = 0 ;
    private shotCollisionImageIndex : number = 0 ;
    private shotDamage : number = 0 ;
    private shotSize : size = { width : 0, height : 0, expWidth : 0, expHeight : 0 } ;

    constructor( 
        id : number, 
        wall : Wall,
        positionX : number,
        positionY : number,
        {
            planeImageSrc,
            size,
            shotSize,
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
        this.img.width = size.width ;
        this.img.height = size.height ;

        this.shotDamage = shotDamage ;
        this.shotDelay = shotDelay ;
        this.shotSpeed = shotSpeed ;
        this.shotListNormalImageIndex = shotListNormalImageIndex ;
        this.shotCollisionImageIndex = shotCollisionImageIndex ;
        this.shotSize = shotSize ;

        this.shotImgList = shootImgSrcList.map(( src : string, index : number ) => {
            const img = new Image() ;
            if( index >= this.shotCollisionImageIndex ) {
                img.width = shotSize.expWidth ;
                img.height = shotSize.expHeight ;
            }else {
                img.width = shotSize.width ;
                img.height = shotSize.height ;
            }
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
    public getShotSize()                    { return this.shotSize ; }
    public getShotPosition( direction : boolean ) {

        let shotPositionX ;

        const middle = this.size.width ;

        if( direction ) shotPositionX = this.position.x + middle ;
        else shotPositionX = this.position.x - middle ;

        const shotPositionY = this.position.y + (this.size.height / 2) - (this.shotSize.height / 2) ; 
        
        return { shotPositionX, shotPositionY }
    }
    public setLife( life : number ) {
        this.life = life ;
    }
    public checkShotStatusAction() {
        return this.shotAction === ShotStatus.ACTION ;
    }
    public checkShotStatusStop()  {
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
        wall : Wall,
        positionX : number,
        positionY : number,
        planeData : PlaneData
    ) {
        super( id, wall,  positionX, positionY, planeData ) ;

        this.movementMapping() ;
        this.shotMapping() ;
    }

    public movementMapping() {
        this.direction.left = true ;
    }
}

class PlaneList {
    protected enemyPlaneList : Plane[] = [] ;
    protected userPlaneList : Plane[] = [] ;
    private instance : PlaneList | null = null ;

    constructor() {
        return this.getInstance() ;
    }

    public getUserPlanes()              { return this.userPlaneList ; }
    public getEnemyPlanes()             { return this.enemyPlaneList ; }

    public getInstance() {
        if( this.instance ) return this.instance ;

        this.instance = this ;
        return this.instance ;
    }

    public createPlane( 
        id : number, 
        wall : Wall,
        positionX : number,
        positionY : number,
        planeData : PlaneData,
        planeKind : PlaneKind
    ) : Plane {

        let plane ;

        switch(planeKind) {
            case PlaneKind.USERPLANE : 
                plane = new UserPlane(id, wall, positionX, positionY, planeData) ;
                this.registerPlane(plane, planeKind) ;
                break ;
            case PlaneKind.ENEMYPLANE :
                plane = new EnemyPlane(id, wall, positionX, positionY, planeData) ;
                this.registerPlane(plane, planeKind) ;
                break ;
        }

        return plane ;
    }

    public registerPlane( plane : Plane, planeKind : PlaneKind ) : void {
        switch(planeKind) {
            case PlaneKind.USERPLANE : 
                this.userPlaneList = this.userPlaneList.concat(plane) ;
                break ;
            case PlaneKind.ENEMYPLANE :
                this.enemyPlaneList = this.enemyPlaneList.concat(plane) ;
                break ;
        }
    }

    public unregisterPlane() : void {
        // User Plane
        const notLifeUserPlane = this.userPlaneList.filter((plane : Plane) => ( plane.getLife() === 0 )) ;
        this.userPlaneList = this.userPlaneList.filter((plane : Plane) => !notLifeUserPlane.includes(plane)) ;
    
        // Enemy Plane
        const notLifeEnemyPlane = this.enemyPlaneList.filter((plane : Plane) => ( plane.getLife() === 0 )) ;
        this.enemyPlaneList = this.enemyPlaneList.filter((plane : Plane) => !notLifeEnemyPlane.includes(plane)) ;
    }
}
  
export { Plane, UserPlane, Direction, EnemyPlane, PlaneList } ;