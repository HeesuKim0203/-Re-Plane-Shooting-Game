import { Plane, PlaneList, UserPlane } from './Plane'
import { Shot, ShotList } from './Shot' ;

class Painter {
    private canvas : HTMLCanvasElement ;
    private ctx : CanvasRenderingContext2D | null = null ;

    private backgroundSrc : string = "" ;
    
    private planeList : PlaneList | null = null ;
    private shotList : ShotList = new ShotList() ;

    constructor( canvas : HTMLCanvasElement, backgroundSrc : string, planeList : PlaneList ) {
        this.canvas = canvas ; 
        this.ctx = this.canvas.getContext('2d') ;
        this.backgroundSrc = backgroundSrc ;
        this.planeList = planeList ;
    }

    public initBackground() : void {
        this.canvas.style.background = `url(${this.backgroundSrc}) repeat` ;
        this.canvas.style.backgroundSize = 'cover' ;
        this.canvas.style.position = 'relative' ;
    }

    private draw() {

        if( !this.ctx ) return ;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        if( this.planeList ) {
            // Draw User Plane
            const userPlaneList = this.planeList.getUserPlanes() ;
            //this.shotList.shotToDamagePlane(true, ...userPlaneList) ;
            //userPlaneList.forEach((plane : Plane) => this.drawPlane(plane, true)) ;

            // Draw Planes
            const enemyPlaneList = this.planeList.getEnemyPlanes() ;
            //this.shotList.shotToDamagePlane(false, ...enemyPlaneList) ;
            //enemyPlaneList.forEach((plane : Plane) => this.drawPlane(plane, false)) ;
        }

        // Shots Move
        // this.shotList.getShots().map((shot : Shot) => {

        //     const imgList = shot.getImgList() ;

        //     if( imgList ) {
        //         const image  = imgList[shot.getCurrentIndex()] ;
        //         const { x, y } = shot.position ;
        //         this.ctx?.drawImage(imgList[shot.getCurrentIndex()], x, y, image.width, image.height) ;
        //     }
        // }) ;
        // this.shotList.shotMove() ;
        // this.shotList.deleteShot() ;

        this.planeList?.unregisterPlane() ;
    }

    private drawPlane( plane : Plane ) {
        // const image = plane.getImg() ; 
        // if( !image ) return ;

        // this.drawShotAndLogic(plane, userPlane) ;
        // plane.move() ;
        // const { x, y } = plane.position ;
        //this.ctx?.drawImage(image, x, y, image.width, image.height) ;
    }

    public drawShotAndLogic( plane : Plane ) {

        const wall = plane.getWall() ;

        if( plane.checkShotStatusAction() && wall ) {

            const shotImg            = plane.getShotImg() ;
            const shotBeforImageList = plane.getShotBeforImageList() ;
            const shotExpImageList   = plane.getShotExpImageList() ;

            const { shotPositionX, shotPositionY } = plane.getShotPosition() ;

            this.shotList.createShot(
                shotPositionX,
                shotPositionY,
                wall,
                plane.getShotSize(),
                plane.getShotSpeed(),
                plane.getPlaneKind() ? true : false,
                shotBeforImageList,
                shotImg,
                shotExpImageList,
                plane.getShotDamage()
            ) ;

            plane.shotStopMapping() ;
        }
    }

    public runAnimationFrame() {
        this.draw();
        requestAnimationFrame(this.runAnimationFrame.bind(this)) ;
    }
}

export default Painter