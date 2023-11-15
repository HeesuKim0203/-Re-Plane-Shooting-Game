import Wall from './Wall'
import { Obj, Direction, size } from './util'

export enum PlaneKind {
    USERPLANE = 1,
    ENEMYPLANE = 0
}

export type PlaneData = {
    planKind : PlaneKind 
    planeBeforImageSrc : string[]
    planeImageSrc : string
    planeExpImageSrc : string[]
    speed : number
    life : number
    size : size
    shotSize : size
    shotDamage : number
    shotBeforImageSrcList : string[]
    shotImage : string
    shotExpImageSrcList : string[]
    shotDelay : number
    shotSpeed : number
} ;

enum ObjStatus {
    BEFOR = 0,
    NORMAL = 1,
    EXP = 2
}

enum PlaneActionShotStatus {
    STOP = 0,
    ACTION = 1,
}

class Plane extends Obj {
    // Plane Data
    private id : number = 0 ;
    private planKind : PlaneKind | undefined = undefined ;
    private planeBeforImageList : HTMLImageElement[] = [] ;
    private img : HTMLImageElement = new Image() ;
    private planeExpImageList : HTMLImageElement[] = [] ;

    private shotAction : PlaneActionShotStatus = PlaneActionShotStatus.STOP ;
    private shotDelay : number = 1000 ;
    private shotMappingPid : number = 0 ;
    private size : size = { beforWidth : 0, beforHeight : 0, width : 0, height : 0, expWidth : 0, expHeight : 0 } ;
    private life : number = 0 ;

    // Shot Data
    private shotSpeed : number = 0 ;
    private shotDamage : number = 0 ;
    private shotSize : size = { beforWidth : 0, beforHeight : 0, width : 0, height : 0, expWidth : 0, expHeight : 0 } ;

    private shotBeforImageList : HTMLImageElement[] = [] ;
    private shotImg : HTMLImageElement = new Image() ;
    private shotExpImageList : HTMLImageElement[] = [] ;

    constructor( 
        id : number, 
        wall : Wall,
        positionX : number,
        positionY : number,
        {
            planKind,
            planeBeforImageSrc,
            planeImageSrc,
            planeExpImageSrc,
            speed,
            life,
            size,
            shotSize,
            shotDamage,
            shotBeforImageSrcList,
            shotImage,
            shotExpImageSrcList,
            shotDelay,
            shotSpeed,
        } : PlaneData
    ) {
        
        super( positionX, positionY, wall, speed ) ;

        this.id = id ;
        this.planKind = planKind ;
        this.size = size ;
        this.life = life ;

        // Plane Image
        this.img.src = planeImageSrc ;
        this.img.width = size.width ;
        this.img.height = size.height ;

        this.planeBeforImageList = this.srcToImage(planeBeforImageSrc, size.beforWidth, size.beforHeight) ;
        this.planeExpImageList  = this.srcToImage(planeExpImageSrc, size.expWidth, size.expHeight) ;

        // Shot Image
        this.shotImg.src = shotImage ;
        this.shotImg.width = shotSize.width ;
        this.shotImg.height = shotSize.height ;

        this.shotBeforImageList = this.srcToImage(shotBeforImageSrcList, size.beforWidth, size.beforHeight) ;
        this.shotExpImageList  = this.srcToImage(shotExpImageSrcList, size.expWidth, size.expHeight) ;

        this.shotDamage = shotDamage ;
        this.shotDelay = shotDelay ;
        this.shotSpeed = shotSpeed ;
        this.shotSize = shotSize ;
    }

    private srcToImage( srcList : string[], width : number, height : number ) {
        return srcList.map(( src : string ) => {
            const img = new Image() ;
            img.width = width ;
            img.height = height ;
            img.src = src ;
            return img ;
        }) ;
    }

    // Plane get method
    public getId()                          { return this.id ; } 
    public getPlaneBeforImageList()         { return this.planeBeforImageList ; }
    public getImg()                         { return this.img ; }
    public getPlaneExpImageList()           { return this.planeExpImageList ; }
    public getSize()                        { return this.size ; }
    public getLife()                        { return this.life ; }
    public getPlaneKind()                   { return this.planKind ; }
    public setLife( life : number )         { this.life = life ; }

    // Shot Imformation get method
    public getShotBeforImageList()          { return this.shotBeforImageList ; }
    public getShotImg()                     { return this.shotImg ; }
    public getShotExpImageList()            { return this.shotExpImageList ; }
    public getShotStatus()                  { return this.shotAction ; }
    public getShotDelay()                   { return this.shotDelay ; }
    public getShotMappingPid()              { return this.shotMappingPid ; }
    public getShotSpeed()                   { return this.shotSpeed ; }
    public getShotDamage()                  { return this.shotDamage ; }    
    public getShotSize()                    { return this.shotSize ; }
    public getShotPosition() { // Todo :  User? Enemy?
        let shotPositionX ;
        if( this.planKind === PlaneKind.USERPLANE ) shotPositionX = this.position.x + this.size.width ;
        else shotPositionX = this.position.x - this.size.width ;
        return { shotPositionX, shotPositionY :  this.position.y + (this.size.height / 2) - (this.shotSize.height / 2) }
    }

    // Plane shooting shot method
    public checkShotStatusAction()  { return this.shotAction === PlaneActionShotStatus.ACTION ; }
    public checkShotStatusStop()    { return this.shotAction === PlaneActionShotStatus.STOP ; }
    public shotActionMapping()      { this.shotAction = PlaneActionShotStatus.ACTION ; }
    public shotStopMapping()        { this.shotAction =  PlaneActionShotStatus.STOP ; }
    public shotMapping() {
        this.shotMappingPid = window.setInterval(() => {
            this.shotActionMapping() ;
        }, this.getShotDelay()) ;
    }
    public deleteShotMapping() {
        // We'll must have to run it before delete instance
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
    private static instance : PlaneList | null = null ;

    constructor() {
        return this.getInstance() ;
    }

    public getUserPlanes()              { return this.userPlaneList ; }
    public getEnemyPlanes()             { return this.enemyPlaneList ; }

    public getInstance() {
        if( PlaneList.instance ) return PlaneList.instance ;

        PlaneList.instance = this ;
        return PlaneList.instance ;
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