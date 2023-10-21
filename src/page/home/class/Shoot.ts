import Wall from './Wall'
import { Obj } from './util'

enum State {
    NORAML = 0,
    COLLISION = 1
}

export class Shoot extends Obj {
    private imgList : HTMLImageElement[] | null = null ;
    private state : State = 0 ;
    private normalImageIndex : number = 0 ;
    private collisionImageIndex : number = 0 ;

    constructor( 
        sizeX : number, 
        sizeY : number, 
        positionX : number, 
        positionY : number, 
        wall : Wall, 
        speed : number, 
        normalImageIndex : number,
        collisionImageIndex : number, 
        ...imgSrc : string[] 
    ) {
        super( positionX, positionY, wall, speed ) ;

        this.normalImageIndex = normalImageIndex ;
        this.collisionImageIndex = collisionImageIndex ;

        this.imgList = imgSrc.map(( src : string ) => {
            const img = new Image() ;
            img.width = sizeX ;
            img.height = sizeY ;
            img.src = src ;
            return img ;
        }) ;
    }

    
}