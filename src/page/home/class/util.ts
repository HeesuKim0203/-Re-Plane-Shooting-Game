import Wall from './Wall'

export interface Position {
    x: number;
    y: number;
}

export interface Move {
    down : boolean 
    up : boolean
    left : boolean
    right : boolean
}
  
export enum Direction {
    DOWN = 0,
    UP = 1,
    LEFT = 2,
    RIGHT = 3,
}

export class Obj {
    private wall : Wall | null = null ;
    private direction : Move = { down : false, up : false, left : false, right : false } ;
    private position : Position = { x : 0, y : 0 } ;
    private speed : number = 0 ;

    constructor( positionX : number, positionY : number, wall : Wall, speed : number ) {
        this.position.x = positionX ;
        this.position.y = positionY ;

        this.wall = wall ;
        this.speed = speed ;
    }

    public getPosition()    { return this.position ; }
    public getDirection()   { return this.direction ; }

    public move() {
        try {
            if( this.wall ) {
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
                    if ( this.wall?.getLeft() < this.position.x - this.speed ) {
                        this.position.x -= this.speed ;
                    }
                }

                if(this.direction.right) {
                    if ( this.wall?.getRight() > this.position.x + this.speed ) {
                        this.position.x += this.speed ;
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