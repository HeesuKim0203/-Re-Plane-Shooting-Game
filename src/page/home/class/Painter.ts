import { Plane } from './Plane'
import Background from './Wall'

class Painter {
    private canvas : HTMLCanvasElement ;
    private ctx : CanvasRenderingContext2D | null = null ;

    private backgroundSrc : string = "" ;

    private userPlane : Plane | null = null ;
    private planes : Plane[] = [] ;

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

    private getDrawData() {

        if( !this.ctx ) return ;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw User Planes
        if( this.userPlane ) {
            const userImage = this.userPlane.getImg() ;

            if( !userImage ) return ;
            
            this.userPlane.move() ;

            const { x, y } = this.userPlane.getPosition() ;

            this.ctx?.drawImage(userImage, x, y, userImage.width, userImage.height) ;
        }

        // Draw Planes
        this.planes.forEach((plane : Plane) => {

            const image = plane.getImg() ;            
            if( !image ) return ;

            const { x, y } = plane.getPosition() ;

            this.ctx?.drawImage(image, x, y, image.width, image.height) ;

        }) ;
    }

    public runAnimationFrame() {
        this.getDrawData();
        requestAnimationFrame(this.runAnimationFrame.bind(this)) ;
    }
}

export default Painter