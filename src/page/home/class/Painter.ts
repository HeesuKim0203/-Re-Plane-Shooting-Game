import { Plane } from './Plane'
import { Shot, ShotList } from './Shot' ;

class Painter {
    private canvas : HTMLCanvasElement ;
    private ctx : CanvasRenderingContext2D | null = null ;

    private backgroundSrc : string = "" ;

    private userPlane : Plane | null = null ;
    private planes : Plane[] = [] ;
    private shotList : ShotList = new ShotList() ;

    constructor( canvas : HTMLCanvasElement, backgroundSrc : string, userPlane : Plane ) {
        this.canvas = canvas ; 
        this.ctx = this.canvas.getContext('2d') ;
        this.userPlane = userPlane ;
        this.backgroundSrc = backgroundSrc ;
    }

    public getPlanes() : Plane[] { return this.planes } 

    public initBackground() : void {
        this.canvas.style.background = `url(${this.backgroundSrc}) repeat` ;
        this.canvas.style.backgroundSize = 'cover' ;
    }

    public registerPlane( addPlane : Plane ) : void {
        this.planes = this.planes.concat(addPlane) ;
    }

    // Todo : Multiple Plane Unregister
    public unregisterPlane() : void {
        const index = this.planes.findIndex((plane : Plane) => ( plane.getLife() === 0 )) ;

        this.planes = [
            ...this.planes.slice(0, index),
            ...this.planes.slice(index + 1, this.planes.length) 
        ] ;
    }

    private draw() {

        if( !this.ctx ) return ;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw User Planes
        if( this.userPlane ) {

            this.shotList.shotToDamagePlane(true, ...[ this.userPlane ]) ;

            this.userPlane.move() ;
            
            if( this.userPlane.checkShotAction() && this.userPlane.wall ) {

                const shotImgList = this.userPlane.getImgList() ;

                const { shotPositionX, shotPositionY } = this.userPlane.getShotPosition(true) ;

                if( shotImgList ) {
                    this.shotList.createShot(
                        shotPositionX, 
                        shotPositionY,
                        this.userPlane.wall,
                        this.userPlane.getShotSpeed(),
                        this.userPlane.getShotListNormalImageIndex(),
                        this.userPlane.getShotCollisionImageIndex(),
                        true,
                        shotImgList,
                        this.userPlane.getShotDamage()
                    ) ;
                }
                this.userPlane.shotStopMapping() ;
            }

            this.drawPlane(this.userPlane) ;
        }

        this.shotList.shotToDamagePlane(false, ...this.planes) ;

        // Draw Planes
        this.planes.forEach((plane : Plane) => this.drawPlane(plane)) ;

        // Shots Move
        this.shotList.getShots().map((shot : Shot) => {

            const imgList = shot.getImgList() ;

            if( imgList ) {
                const image  = imgList[shot.getCurrentIndex()] ;
                const { x, y } = shot.position ;
                this.ctx?.drawImage(imgList[shot.getCurrentIndex()], x, y, image.width, image.height) ;
            }
        }) ;
        this.shotList.shotMove() ;
        this.shotList.deleteShot() ;
    }

    private drawPlane( plane : Plane ) {
        const image = plane.getImg() ; 

        if( !image ) return ;

        if( plane.checkShotAction() && plane.wall ) {

            const shotImgList = plane.getImgList() ;

            const { shotPositionX, shotPositionY } = plane.getShotPosition(false) ;

            if( shotImgList ) {
                this.shotList.createShot(
                    shotPositionX,
                    shotPositionY,
                    plane.wall,
                    plane.getShotSpeed(),
                    plane.getShotListNormalImageIndex(),
                    plane.getShotCollisionImageIndex(),
                    false,
                    shotImgList,
                    plane.getShotDamage()
                ) ;
            }
            plane.shotStopMapping() ;
        }

        plane.move() ;
        const { x, y } = plane.position ;

        this.ctx?.drawImage(image, x, y, image.width, image.height) ;
    }

    public runAnimationFrame() {
        this.draw();
        requestAnimationFrame(this.runAnimationFrame.bind(this)) ;
    }
}

export default Painter