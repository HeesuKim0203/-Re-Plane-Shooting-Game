import Wall from './Wall'

interface Position {
    x: number;
    y: number;
}

interface Move {
    down : boolean 
    up : boolean
    left : boolean
    right : boolean
}
  
enum Direction {
    DOWN = 0,
    UP = 1,
    LEFT = 2,
    RIGHT = 3,
}
  
class Plane {
    private MOVE : number = 0 ;
    private id : number = 0 ;
    private position : Position = { x : 0, y : 0 } ;
    private direction : Move = { down : false, up : false, left : false, right : false } ;
    private img : HTMLImageElement | null = null ;
    private wall : Wall | null = null ;

    constructor( id : number, size : number, imgSrc : string, positionX : number, positionY : number, wall : Wall, MOVE : number ) {
        
        this.id = id ;
        this.wall = wall ;

        this.position.x = positionX ;
        this.position.y = positionY ;

        this.img = new Image() ;
        this.img.src = imgSrc ;
        this.img.width = size ;
        this.img.height = size ;
        this.MOVE = MOVE ;

    }

    public getId()          { return this.id ; } 
    public getImg()         { return this.img ; }
    public getPosition()    { return this.position ; }
    public getDirection()   { return this.direction ; }

    // Todo : Integration with the user plane's moveEvent
    public move() {
        try {
            if(this.wall) {
                if( this.direction.up ) {
                    if ( this.wall?.getTop() < this.position.y - this.MOVE ) {
                        this.position.y -= this.MOVE ;
                    }
                }

                if( this.direction.down ) {
                    if ( this.wall?.getBottom() > this.position.y + this.MOVE ) {
                        this.position.y += this.MOVE ;
                    }
                }

                if( this.direction.left ) {
                    if ( this.wall?.getLeft() < this.position.x - this.MOVE ) {
                        this.position.x -= this.MOVE ;
                    }
                }

                if(this.direction.right) {
                    if ( this.wall?.getRight() > this.position.x + this.MOVE ) {
                        this.position.x += this.MOVE ;
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

class UserPlane extends Plane {

    public keyDownToMoveMapping( event : KeyboardEvent ) : void {
        
        switch(event.key) {
            case('ArrowUp') : 
                this.getDirection().up = true ;
                break ;
            case('ArrowDown') : 
                this.getDirection().down = true ;
                break ;
            case('ArrowRight') :
                this.getDirection().right = true ;
                break ;
            case('ArrowLeft') :
                this.getDirection().left = true ;
                break ;
            default : 
                break ;
        }
    }

    public keyUpToMoveMapping( event : KeyboardEvent ) : void {
        
        switch(event.key) {
            case('ArrowUp') : 
                this.getDirection().up = false ;
                break ;
            case('ArrowDown') : 
                this.getDirection().down = false ;
                break ;
            case('ArrowRight') :
                this.getDirection().right = false ;
                break ;
            case('ArrowLeft') :
                this.getDirection().left = false ;
                break ;
            default : 
                break ;
        }
    }
}
  
export { Plane, UserPlane, Direction } ;