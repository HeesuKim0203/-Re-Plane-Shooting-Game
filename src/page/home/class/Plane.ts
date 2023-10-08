import Wall from './Wall'

const MOVE = 8 ;

interface Position {
    x: number;
    y: number;
}
  
enum Direction {
    DOWN = 0,
    UP = 1,
    LEFT = 2,
    RIGHT = 3,
}
  
class Plane {
    private id : number = 0 ;
    private position : Position = { x : 0, y : 0 } ;
    private direction : number = Direction.DOWN ;
    private img : HTMLImageElement | null = null ;
    private wall : Wall | null = null ;

    constructor( id : number, size : number, imgSrc : string, positionX : number, positionY : number, wall : Wall ) {
        
        this.id = id ;
        this.wall = wall ;

        this.position.x = positionX ;
        this.position.y = positionY ;

        this.img = new Image() ;
        this.img.src = imgSrc ;
        this.img.width = size ;
        this.img.height = size ;

    }

    public getId()          { return this.id ; } 
    public getImg()         { return this.img ; }
    public getPosition()    { return this.position ; }

    public move( direction : number ) {
        if(this.wall) {
            switch (direction) {
                case Direction.UP :
                    if ( this.wall?.getTop() < this.position.y - MOVE ) {
                        this.position.y -= MOVE ;
                    }
                    break ;
                case Direction.DOWN :
                    if ( this.wall?.getBottom() > this.position.y + MOVE ) {
                        this.position.y += MOVE ;
                    }
                    break ;
                case Direction.LEFT :
                    if ( this.wall?.getLeft() < this.position.x - MOVE ) {
                        this.position.x -= MOVE ;
                    }
                    break ;
                case Direction.RIGHT :
                    if ( this.wall?.getRight() > this.position.x + MOVE ) {
                        this.position.x += MOVE ;
                    }
                    break ;
                default:
                    break ;
            }
        }
    }
}

class UserPlane extends Plane {
    public moveEvent() {
        const ArrowKeys = [
            {
                code : '38',
                string : 'ArrowUp',
                movement : Direction.UP
            },
            {
                code: '40',
                string: 'ArrowDown',
                movement : Direction.DOWN
            },
            {
                code: '39',
                string: 'ArrowRight',
                movement : Direction.RIGHT
            },
            {
                code: '37',
                string: 'ArrowLeft',
                movement : Direction.LEFT
            },
        ];

        const handler = (e: KeyboardEvent) => {
            for (let i = 0; i < ArrowKeys.length; i++) {
                const { code, string, movement } = ArrowKeys[i];
                if ( e.key === string ) {
                    this.move(movement) ;
                }
            }
        };
        
        return (e: KeyboardEvent) => handler(e);
    }
}
  
export { Plane, UserPlane, Direction } ;