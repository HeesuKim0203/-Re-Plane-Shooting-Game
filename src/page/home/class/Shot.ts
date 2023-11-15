import { Plane, UserPlane } from './Plane';
import Wall from './Wall'
import { Obj, size } from './util'

enum ShotStatus {
    NORAML = 0,
    COLLISION = 1,
    END = 2
}

export class Shot extends Obj {
    protected imgList : HTMLImageElement[] | null = null ;
    private state : ShotStatus = ShotStatus.NORAML ;
    private currentIndex : number = 0 ;
    private normalImageIndex : number = 0 ;
    private collisionImageIndex : number = 0 ;
    private damage : number = 0 ;
    private size : size = { width : 0, height : 0, expWidth : 0, expHeight : 0 } ;

    constructor(
        positionX : number, 
        positionY : number, 
        wall : Wall, 
        size : size,
        speed : number, 
        normalImageIndex : number,
        collisionImageIndex : number,
        direction : boolean, 
        imgList : HTMLImageElement[],
        damage : number
    ) {
        super( positionX, positionY, wall, speed ) ;

        this.normalImageIndex = normalImageIndex ;
        this.collisionImageIndex = collisionImageIndex ;

        this.imgList = imgList ;
        this.damage = damage ;
        this.size = size ;

        if( direction ) {
            this.direction.right = true ; // User Plane Shot
        }else {
            this.direction.left = true ;  // Enemy Plane Shot
        }
    }

    public getCurrentIndex()                        { return this.currentIndex ; }
    public getNormalImageIndex()                    { return this.normalImageIndex ; }
    public getCollisionImageIndex()                 { return this.collisionImageIndex ; }
    public getState()                               { return this.state ; }
    public getImgList()                             { return this.imgList ; }
    public getDirection()                           { return this.direction ; }
    public getDamage()                              { return this.damage ; }
    public getSize()                                { return this.size ; }

    public setCurrentIndex( currentIndex : number ) { 
        return this.currentIndex = currentIndex ; 
    }

    public setStateToCollison() { this.state = ShotStatus.COLLISION ; }
    public deleteDetermining()  { 
        if( this.imgList ) {
            return this.imgList?.length === this.currentIndex ;
        }
    }

    public move() {

        // Before shooting a shot
        if( this.getNormalImageIndex() > this.currentIndex ) {
            this.setCurrentIndex(this.currentIndex + 1) ;
            return ;
        }
        // Exp Draw
        if( this.getState() === ShotStatus.COLLISION && this.imgList ) {
            if( this.imgList?.length - 1 > this.currentIndex ) {
                this.setCurrentIndex(this.currentIndex + 1) ;
                return ;
            }else {
                this.state = ShotStatus.END ; // EXP -> END
            }
        }

        try {
            if( this.wall && this.getState() === ShotStatus.NORAML ) {
                if( this.direction.left ) {
                    if ( this.wall?.getLeft() < this.position.x - this.speed ) {
                        this.position.x -= this.speed ;
                    }else {
                        this.state = ShotStatus.END ;
                    }
                }
                if( this.direction.right ) {
                    if ( this.wall?.getRight() > this.position.x + this.speed ) {
                        this.position.x += this.speed ;
                    }else {
                        this.state = ShotStatus.END ;
                    }
                }
            }
        } catch (error) {
            
            console.log(error) ;

        }
    }
}

export class ShotList {
    private shotList : Shot[] = [] ;
    private instance : ShotList | null = null ;

    constructor() {}

    public getNormalShotState()    { return ShotStatus.NORAML ; }
    public getCollisonShotState()  { return ShotStatus.COLLISION ; }
    public getShots()              { return this.shotList ; }
    
    public getInstance() {
        if( this.instance ) return this.instance ;

        this.instance = this ;
        return this.instance ;
    }

    public createShot( 
        positionX : number, 
        positionY : number, 
        wall : Wall, 
        size : size,
        speed : number, 
        normalImageIndex : number,
        collisionImageIndex : number,
        direction : boolean, 
        imgList : HTMLImageElement[],
        damage : number
    ) {

        const shot = new Shot(
            positionX,
            positionY,
            wall,
            size,
            speed,
            normalImageIndex,
            collisionImageIndex,
            direction,
            imgList,
            damage
        ) ;
 
        this.shotList = this.shotList.concat(shot) ;
    }

    public shotToDamagePlane( userPlanes : UserPlane[], enemyPlane : Plane[] ) {

        const enemyShotList = this.shotList.filter(( shot : Shot ) => ( shot.getDirection().left === true ) && shot.getState() === ShotStatus.NORAML) ; // Enemy Shot
        const userShotList = this.shotList.filter(( shot : Shot ) => ( shot.getDirection().left === false ) && shot.getState() === ShotStatus.NORAML) ; // User Shot

        enemyShotList.forEach(( shot : Shot ) => {
            userPlanes.forEach(( plane : UserPlane ) => {
                if( plane.position.y < shot.position.y + shot.getSize().height && plane.position.y + plane.getSize().height > shot.position.y ) {
                    if( plane.position.x + plane.getSize().width >= shot.position.x && plane.position.x < shot.position.x + shot.getSize().width ) {
                        plane.setLife(plane.getLife() - shot.getDamage()) ;
                        plane.userLifeToHTML() ;
                        shot.setStateToCollison() ;
                    }
                }
            }) ;
        }) ;

        userShotList.forEach(( shot : Shot ) => {
            enemyPlane.forEach(( plane : Plane ) => {
                if( plane.position.y < shot.position.y + shot.getSize().height && plane.position.y + plane.getSize().height > shot.position.y ) {
                    if( plane.position.x <= shot.position.x ) {
                        plane.setLife(plane.getLife() - shot.getDamage()) ;
                        shot.setStateToCollison() ;
                    }
                }
            }) ;
        }) ;
    }

    public deleteShot() {
        const newShotList = this.shotList.filter(( shot : Shot ) => !(shot.getState() === ShotStatus.END)) ;
        if( newShotList ) this.shotList = newShotList ;
    }

    public shotMove() {
        this.shotList.forEach((shot : Shot) => {
            shot.move() ;
        }) ;
    }
}