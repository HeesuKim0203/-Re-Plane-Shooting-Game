import Wall from './Wall'
import { Obj } from './util'

enum State {
    NORAML = 0,
    COLLISION = 1
}

export class Shot extends Obj {
    private imgList : HTMLImageElement[] | null = null ;
    private state : State = 0 ;
    private currentIndex : number = 0 ;
    private normalImageIndex : number = 0 ;
    private collisionImageIndex : number = 0 ;

    constructor(
        positionX : number, 
        positionY : number, 
        wall : Wall, 
        speed : number, 
        normalImageIndex : number,
        collisionImageIndex : number,
        direction : boolean, 
        imgList : HTMLImageElement[],
    ) {
        super( positionX, positionY, wall, speed ) ;

        this.normalImageIndex = normalImageIndex ;
        this.collisionImageIndex = collisionImageIndex ;

        this.imgList = imgList ;

        // Todo : direction, userShot update
        if( direction ) {
            this.direction.right = true ;
        }else {
            this.direction.left = true ;
        }
    }

    public getCurrentIndex()                        { return this.currentIndex ; }
    public getNormalImageIndex()                    { return this.normalImageIndex ; }
    public getCollisionImageIndex()                 { return this.collisionImageIndex ; }
    public getState()                               { return this.state ; }
    public getImgList()                             { return this.imgList ; }

    public setCurrentIndex( currentIndex : number ) { 
        // Todo : Image List Index Vaildation
        if( currentIndex >= this.collisionImageIndex ) return ;

        this.currentIndex = currentIndex ; 
    }

    public setStateToCollison() { this.state = State.COLLISION ; }

    public move() {
        try {
            if( this.wall ) {
                if( this.direction.left ) {
                    if ( this.wall?.getLeft() < this.position.x - this.speed ) {
                        this.position.x -= this.speed ;
                    }else {
                        this.state = State.COLLISION ;
                    }
                }
                if(this.direction.right) {
                    if ( this.wall?.getRight() > this.position.x + this.speed ) {
                        this.position.x += this.speed ;
                    }else {
                        this.state = State.COLLISION ;
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
    private ShotList : Shot[] = [] ;
    private instance : ShotList | null = null ;

    constructor() {}

    public getNormalShotState()    { return State.NORAML ; }
    public getCollisonShotState()  { return State.COLLISION ; }
    public getShots()              { return this.ShotList ; }
    
    public getInstance() {
        if( this.instance ) return this.instance ;

        this.instance = this ;
        return this.instance ;
    }

    public createShot( 
        positionX : number, 
        positionY : number, 
        wall : Wall, 
        speed : number, 
        normalImageIndex : number,
        collisionImageIndex : number,
        direction : boolean, 
        imgList : HTMLImageElement[],
    ) {

        const shot = new Shot(
            positionX,
            positionY,
            wall,
            speed,
            normalImageIndex,
            collisionImageIndex,
            direction,
            imgList,
        ) ;
 
        this.ShotList = this.ShotList.concat(shot) ;
    }

    public deleteShot() {
        const newShotList = this.ShotList.filter(( Shot : Shot ) => Shot.getState() !== this.getCollisonShotState()) ;
        if( newShotList ) this.ShotList = newShotList ;
    }

    public shotMove() {
        this.ShotList.forEach((Shot : Shot) => {
            Shot.move() ;
            Shot.setCurrentIndex(Shot.getCurrentIndex() + 1) ;
        }) ;
    }
}