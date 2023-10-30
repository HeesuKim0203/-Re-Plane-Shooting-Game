import { Plane } from './Plane'
import { ShootList } from './Shoot';

class Painter {
    private canvas : HTMLCanvasElement ;
    private ctx : CanvasRenderingContext2D | null = null ;

    private backgroundSrc : string = "" ;

    private userPlane : Plane | null = null ;
    private planes : Plane[] = [] ;
    private shootList : ShootList = new ShootList() ;

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

    public unregisterPlane( removePlane : Plane ) : void {
        const index = this.planes.findIndex((plane : Plane) => ( plane.getId() == removePlane.getId() )) ;

        this.planes = [
            ...this.planes.slice(0, index),
            ...this.planes.slice(index - 1, this.planes.length) 
        ] ;
    }

    private draw() {

        if( !this.ctx ) return ;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw User Planes
        if( this.userPlane ) {
            this.userPlane.move() ;
            
            if( this.userPlane.shootAction && this.userPlane.wall ) {

                const shootImgList = this.userPlane.getImgList() ;

                if( shootImgList ) {
                    this.shootList.createShoot(
                        this.userPlane.position.x,
                        this.userPlane.position.y,
                        this.userPlane.wall,
                        10,
                        3,
                        4,
                        true,
                        shootImgList
                    ) ;
                }
            }

            this.drawPlane(this.userPlane) ;
        }

        // Draw Planes
        this.planes.forEach((plane : Plane) => this.drawPlane(plane)) ;
    }

    private drawPlane( plane : Plane ) {
        const image = plane.getImg() ; 

        if( !image ) return ;

        const { x, y } = plane.position ;

        this.ctx?.drawImage(image, x, y, image.width, image.height) ;
    }

    public runAnimationFrame() {
        this.draw();
        requestAnimationFrame(this.runAnimationFrame.bind(this)) ;
    }
}

export default Painter