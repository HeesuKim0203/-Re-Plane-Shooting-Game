import Wall from './Wall'
import { Obj } from './util'

enum State {
    NORAML = 0,
    COLLISION = 1
}

export class Shoot extends Obj {
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
        imgList : HTMLImageElement[] 
    ) {
        super( positionX, positionY, wall, speed ) ;

        this.normalImageIndex = normalImageIndex ;
        this.collisionImageIndex = collisionImageIndex ;

        this.imgList = imgList ;
    }

    public getCurrentIndex()                        { return this.currentIndex ; }
    public getNormalImageIndex()                    { return this.normalImageIndex ; }
    public getCollisionImageIndex()                 { return this.collisionImageIndex ; }
    public getState()                               { return this.state ; }

    public setCurrentIndex( currentIndex : number ) { this.currentIndex = currentIndex ; }
    
    public setStateTOCollison() { this.state = State.COLLISION ; }

    public move() {
        try {
            if( this.wall ) {
                if( this.direction.up ) {
                    if ( this.wall?.getTop() < this.position.y - this.speed ) {
                        this.position.y -= this.speed ;
                    }else {
                        this.state = State.COLLISION ;
                    }
                }
                if( this.direction.down ) {
                    if ( this.wall?.getBottom() > this.position.y + this.speed ) {
                        this.position.y += this.speed ;
                    }else {
                        this.state = State.COLLISION ;
                    }
                }
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

export class ShootList {
    private shootList : Shoot[] = [] ;
    private instance : ShootList | null = null ;

    constructor() {}

    public getNormalShootState()    { return State.NORAML ; }
    public getCollisonShootState()  { return State.COLLISION ; }

    public getInstance() {
        if( this.instance ) return this.instance ;

        this.instance = this ;
        return this.instance ;
    }

    public shootRegister( shoot : Shoot ) {
        this.shootList = this.shootList.concat(shoot) ;
    }

    public shootUnRegister() {
        const newShootList = this.shootList.filter(( shoot : Shoot ) => shoot.getState() !== this.getCollisonShootState()) ;
        if( newShootList ) this.shootList = newShootList ;
    }
}