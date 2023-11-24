import { Obj, Direction, size } from './util'
import { gameOver, gameClear, setUserLifeHTML, setUserScoreHTML } from './Game'

export type PlaneData = {
    planeImageSrc : string
    planeExpImageSrcList : string[]
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

enum PlaneStatus {
    NORAML = 0,
    COLLISION = 1,
    END = 2
}

enum ShotStatus {
    STOP = 0,
    ACTION = 1,
}

class Plane extends Obj {
    // Plane Data
    private id : number = 0 ;
    private planeExpImgList : HTMLImageElement[] = [] ;
    protected planeExpImgIndex : number = 0 ;
    private img : HTMLImageElement = new Image() ;
    private shotAction : ShotStatus = ShotStatus.STOP ;
    private shotDelay : number = 1000 ;
    private shotMappingPid : number = 0 ;
    private size : size = { width : 0, height : 0, expWidth : 0, expHeight : 0 } ;
    protected life : number = 0 ;
    protected planeStatus : PlaneStatus = PlaneStatus.NORAML ;

    // Shot Data
    private shotImgList : HTMLImageElement[] | null = null ;
    private shotSpeed : number = 0 ;
    private shotListNormalImageIndex : number = 0 ;
    private shotCollisionImageIndex : number = 0 ;
    private shotDamage : number = 0 ;
    private shotSize : size = { width : 0, height : 0, expWidth : 0, expHeight : 0 } ;

    constructor( 
        id : number, 
        positionX : number,
        positionY : number,
        {
            planeImageSrc,
            planeExpImageSrcList,
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
        
        super( positionX, positionY, speed ) ;

        this.id = id ;
        this.size = size ;
        this.life = life ;

        this.img.src = planeImageSrc ;
        this.img.width = size.width ;
        this.img.height = size.height ;

        this.planeExpImgList = planeExpImageSrcList.map(( src : string, index : number ) => {
            const img = new Image() ;
            img.src = src ;
            img.width = size.expWidth ;
            img.height = size.expHeight ;

            return img ;
        }) ;

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
    public getPlaneStatus()                 { return this.planeStatus ; }
    public getShotPosition( direction : boolean ) {
        let shotPositionX ;
        const middle = this.size.width ;

        if( direction ) shotPositionX = this.position.x + middle ;
        else shotPositionX = this.position.x - middle ;

        const shotPositionY = this.position.y + (this.size.height / 2) - (this.shotSize.height / 2) ; 
        return { shotPositionX, shotPositionY } ;
    }
    public getImg() { 
        let img : HTMLImageElement ;
        switch( this.planeStatus ) {
            case PlaneStatus.COLLISION :
                // x, y update
                if( this.planeExpImgIndex === 0 ) {
                    this.position.x = this.position.x - (this.size.expWidth - this.size.width) / 2 ;
                    this.position.y = this.position.y - (this.size.expWidth - this.size.height) / 2 ;
                }
                img = this.planeExpImgList[this.planeExpImgIndex] ;
                this.planeExpImgIndex++ ;
                // PlaneStatus End 
                if( this.planeExpImgIndex === this.planeExpImgList.length ) this.planeStatus = PlaneStatus.END ;
                break ;
            case PlaneStatus.NORAML :
                img = this.img ;
                break ;
            case PlaneStatus.END :
            default :
                img = new Image() ;
                break ;
        }
        return img ; 
    }
    public setLife( life : number ) {
        if( life === 0  ) this.planeStatus = PlaneStatus.COLLISION ;
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

    public setLife( life : number ) {
        setUserLifeHTML( life ) ;
        if( life === 0  ) this.planeStatus = PlaneStatus.COLLISION ;
        this.life = life ;
    }

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
        positionX : number,
        positionY : number,
        planeData : PlaneData
    ) {
        super( id, positionX, positionY, planeData ) ;

        this.movementMapping() ;
        this.shotMapping() ;
    }

    public movementMapping() {
        this.direction.left = true ;
    }

    public move() {
        try {
            if( this.wall &&  this.planeStatus === PlaneStatus.NORAML ) {
                if( this.direction.up ) {
                    if ( this.wall?.getTop() < this.position.y - this.speed ) {
                        this.position.y -= this.speed ;
                    }
                }

                if( this.direction.down ) {
                    if ( this.wall?.getBottom() > this.position.y + this.speed ) {
                        this.position.y += this.speed ;
                    }
                }

                if( this.direction.left ) {
                    this.position.x -= this.speed ;
                    if( this.wall?.getLeft() > this.position.x - this.speed  ) {
                        gameOver() ;
                    }else if( this.wall?.getLeft() > this.position.x + this.getSize().width ) {
                        this.planeStatus = PlaneStatus.END ;
                    }
                }

                if(this.direction.right) {
                    if ( this.wall?.getRight() > this.position.x + this.speed ) {
                        this.position.x += this.speed ;
                    }
                }
            }
        } catch (error) {
            
            console.log(error) ;

        }
    }
}

class PlaneList {
    protected enemyPlaneList : EnemyPlane[] = [] ;
    protected userPlaneList : UserPlane[] = [] ;
    protected score : number = 0 ;
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
        positionX : number,
        positionY : number,
        planeData : PlaneData,
        planeKind : PlaneKind
    ) : Plane {

        let plane ;

        switch(planeKind) {
            case PlaneKind.USERPLANE : 
                plane = new UserPlane(id, positionX, positionY, planeData) ;
                this.registerUserPlane(plane) ;
                break ;
            case PlaneKind.ENEMYPLANE :
                plane = new EnemyPlane(id, positionX, positionY, planeData) ;
                this.registerEnemyPlane(plane) ;
                break ;
        }

        return plane ;
    }

    public registerUserPlane( plane : UserPlane ) {
        this.userPlaneList = this.userPlaneList.concat(plane) ;
    }

    public registerEnemyPlane( plane : EnemyPlane ) {
        this.enemyPlaneList = this.enemyPlaneList.concat(plane) ;
    }

    public unregisterPlane() : void {
        // User Plane
        const notLifeUserPlane = this.userPlaneList.filter((plane : UserPlane) => ( plane.getPlaneStatus() === PlaneStatus.END )) ;
        this.userPlaneList = this.userPlaneList.filter((plane : UserPlane) => !notLifeUserPlane.includes(plane)) ;
    
        // Enemy Plane
        const notLifeEnemyPlane = this.enemyPlaneList.filter((plane : EnemyPlane) => ( plane.getPlaneStatus() === PlaneStatus.END )) ;
        this.enemyPlaneList = this.enemyPlaneList.filter((plane : EnemyPlane) => !notLifeEnemyPlane.includes(plane)) ;

        setUserScoreHTML( notLifeEnemyPlane.length ) ;
    }
}
  
export { Plane, UserPlane, Direction, EnemyPlane, PlaneList } ;