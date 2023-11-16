import { EnemyPlane, Plane, PlaneList, UserPlane } from './Plane'
import { Shot, ShotList } from './Shot' ;
import Wall from './Wall';

class Painter {
    private canvas : HTMLCanvasElement ;
    private ctx : CanvasRenderingContext2D | null = null ;

    private backgroundSrc : string = "" ;
    private planeList : PlaneList = new PlaneList() ;
    private wall : Wall | null = null ;

    private shotList : ShotList = new ShotList() ;

    constructor( canvas : HTMLCanvasElement, backgroundSrc : string, wall : Wall ) {
        this.canvas = canvas ; 
        this.ctx = this.canvas.getContext('2d') ;
        this.backgroundSrc = backgroundSrc ;
        this.wall = wall ;
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
            userPlaneList.forEach((plane : UserPlane) => this.drawPlane(plane)) ;

            // Draw Planes
            const enemyPlaneList = this.planeList.getEnemyPlanes() ;
            enemyPlaneList.forEach((plane : EnemyPlane) => this.drawPlane(plane)) ;

            this.shotList.shotToDamagePlane(userPlaneList, enemyPlaneList) ;
        }

        // Shots Move
        this.shotList.getShots().map((shot : Shot) => {

            const imgList = shot.getImgList() ;

            if( imgList ) {
                const image  = imgList[shot.getCurrentIndex()] ;
                const { x, y } = shot.position ;
                this.ctx?.drawImage(image, x, y, image.width, image.height) ;
            }
        }) ;
        this.shotList.shotMove() ;
        this.planeList?.unregisterPlane() ;
    }

    private drawPlane( plane : Plane ) {
        const image = plane.getImg() ; 
        if( !image ) return ;

        this.drawShotAndLogic(plane) ;
        plane.move() ;
        const { x, y } = plane.position ;
        this.ctx?.drawImage(image, x, y, image.width, image.height) ;
    }

    public drawShotAndLogic( plane : Plane ) {
        if( plane.checkShotStatusAction() && this.wall ) {

            const shotImgList = plane.getImgList() ;

            const { shotPositionX, shotPositionY } = plane.getShotPosition(plane instanceof UserPlane) ;

            if( shotImgList ) {
                this.shotList.createShot(
                    shotPositionX,
                    shotPositionY,
                    this.wall,
                    plane.getShotSize(),
                    plane.getShotSpeed(),
                    plane.getShotListNormalImageIndex(),
                    plane.getShotCollisionImageIndex(),
                    plane instanceof UserPlane,
                    shotImgList,
                    plane.getShotDamage()
                ) ;
            }
            plane.shotStopMapping() ;
        }
    }

    public runAnimationFrame() {
        this.draw();
        requestAnimationFrame(this.runAnimationFrame.bind(this)) ;
    }
}

export default Painter