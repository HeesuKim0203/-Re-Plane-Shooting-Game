import { Plane } from './Plane';
import Wall from './Wall'
import { Obj, size } from './util'

enum ObjStatus {
    BEFOR = 0,
    NORMAL = 1,
    EXP = 2,
    COLLISION = 3 
}

export class Shot extends Obj {
    protected shotBeforImageList : HTMLImageElement[] = [] ;
    protected shotBeforImageListIndex : number = 0 ;

    protected shotImg : HTMLImageElement = new Image() ;

    protected shotExpImageList : HTMLImageElement[] = [] ;
    protected shotExpImageListIndex : number = 0 ;

    protected shotStatus : ObjStatus = ObjStatus.BEFOR ;

    private damage : number = 0 ;
    private size : size = {  beforWidth : 0, beforHeight : 0, width : 0, height : 0, expWidth : 0, expHeight : 0 } ;

    constructor(
        positionX : number, 
        positionY : number, 
        wall : Wall, 
        size : size,
        speed : number, 
        direction : boolean, 
        shotBeforImageList : HTMLImageElement[],
        shotImg : HTMLImageElement,
        shotExpImageList : HTMLImageElement[],
        damage : number
    ) {
        super( positionX, positionY, wall, speed ) ;

        this.damage = damage ;
        this.size = size ;

        this.shotBeforImageList = shotBeforImageList ;
        this.shotImg = shotImg ;
        this.shotExpImageList = shotExpImageList ;

        if( direction ) {
            this.direction.right = true ; // User Plane Shot
        }else {
            this.direction.left = true ;  // Enemy Plane Shot
        }
    }

    public getState()                               { return this.shotStatus ; }
    public getDirection()                           { return this.direction ; }
    public getDamage()                              { return this.damage ; }
    public getSize()                                { return this.size ; }

    public getImg() {
        if( this.shotStatus === ObjStatus.BEFOR ) {
            if( this.shotBeforImageListIndex ===  this.shotBeforImageList.length )

            return this.shotBeforImageList[this.shotBeforImageListIndex++] ;
        }else if( this.shotStatus === ObjStatus.NORMAL ) {
            return this.shotImg ;
        }else if( this.shotStatus === ObjStatus.EXP ) {
            return this.shotExpImageList[this.shotExpImageListIndex++] ;
        }else if( this.shotStatus === ObjStatus.COLLISION ) {

        }
    }

    // public setCurrentIndex( currentIndex : number ) { 
    //     this.currentIndex = currentIndex ; 
    // }

    // public setStateToCollison() { this.state = ObjStatus.COLLISION ; }
    // public deleteDetermining()  { 
    //     if( this.imgList ) {
    //         return this.imgList?.length === this.currentIndex ;
    //     }
    // }

    public move() {

        // // Before shooting a shot
        // if( this.getNormalImageIndex() > this.currentIndex ) {
        //     this.setCurrentIndex(this.currentIndex + 1) ;
        //     return ;
        // }

        // // Exp Draw
        // if( this.getState() === ShotStatus.COLLISION && this.imgList ) {
        //     if( this.imgList?.length > this.currentIndex ) {
        //         this.setCurrentIndex(this.currentIndex + 1) ;
        //         return ;
        //     }
        // }

        try {
            if( this.wall ) {
                if( this.direction.left ) {
                    if ( this.wall?.getLeft() < this.position.x - this.speed ) {
                        this.position.x -= this.speed ;
                    }else {
                        this.shotStatus = ObjStatus.COLLISION ;
                    }
                }
                if( this.direction.right ) {
                    if ( this.wall?.getRight() > this.position.x + this.speed ) {
                        this.position.x += this.speed ;
                    }else {
                        this.shotStatus = ObjStatus.COLLISION ;
                    }
                }
            }else {
                throw new Error("Not Found wall") ;
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

    // public getNormalShotState()    { return ShotStatus.NORAML ; }
    // public getCollisonShotState()  { return ShotStatus.COLLISION ; }
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
        direction : boolean, 
        shotBeforImageList : HTMLImageElement[],
        shotImg : HTMLImageElement,
        shotExpImageList : HTMLImageElement[],
        damage : number
    ) {

        const shot = new Shot(
            positionX,
            positionY,
            wall,
            size,
            speed,
            direction,
            shotBeforImageList,
            shotImg,
            shotExpImageList,
            damage
        ) ;
 
        this.shotList = this.shotList.concat(shot) ;
    }

    // public shotToDamagePlane( user : boolean, ...plane : Plane[] ) {

    //     if( user ) { // UserPlane
    //         const shotList = this.shotList.filter(( shot : Shot ) => ( shot.getDirection().left === true )) ; // Enemy Shot

    //         shotList.forEach(( shot : Shot ) => {

    //             if( shot.getState() === ShotStatus.COLLISION ) return ;

    //             plane.forEach(( plane : Plane ) => {
    //                 if( plane.position.y < shot.position.y + shot.getSize().height && plane.position.y + plane.getSize().height > shot.position.y ) {
    //                     if( plane.position.x + plane.getSize().width >= shot.position.x && plane.position.x < shot.position.x + shot.getSize().width ) {
    //                         plane.setLife(plane.getLife() - shot.getDamage()) ;
    //                         shot.setStateToCollison() ;
    //                     }
    //                 }
    //             }) ;
    //         }) ;

    //     }else {  // enemyPlane
    //         const shotList = this.shotList.filter(( shot : Shot ) => ( shot.getDirection().left === false )) ; // User Shot

    //         shotList.forEach(( shot : Shot ) => {

    //             if( shot.getState() === ShotStatus.COLLISION ) return ;

    //             plane.forEach(( plane : Plane ) => {
    //                 if( plane.position.y < shot.position.y + shot.getSize().height && plane.position.y + plane.getSize().height > shot.position.y ) {
    //                     if( plane.position.x <= shot.position.x ) {
    //                         plane.setLife(plane.getLife() - shot.getDamage()) ;
    //                         shot.setStateToCollison() ;
    //                     }
    //                 }
    //             }) ;
    //         }) ;
    //     }
    // }

    // // public deleteShot() {
    // //     const newShotList = this.shotList.filter(( shot : Shot ) => (!shot.deleteDetermining() && !(shot.getState() === ShotStatus.END))) ;
    // //     if( newShotList ) this.shotList = newShotList ;
    // // }

    // public shotMove() {
    //     this.shotList.forEach((shot : Shot) => {
    //         shot.move() ;
    //     }) ;
    // }
}