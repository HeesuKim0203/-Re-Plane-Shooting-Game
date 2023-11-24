class Wall {
    private left : number = 0 ;
    private top : number = 0 ;
    private right : number = 0 ;
    private bottom : number = 0 ;
    private static instance : Wall | null = null ;

    constructor( left : number, top : number, right : number, bottom : number ) {
        this.left = left ;
        this.top = top ;
        this.right = right ;
        this.bottom = bottom ;
        
        return this.getInstance() ;
    }

    public getInstance() {
        if( Wall.instance ) return Wall.instance ;

        Wall.instance = this ;
        return Wall.instance ;
    }

    public getLeft() : number { return this.left ; }
    public getTop() : number { return this.top ; }
    public getRight() : number { return this.right ; }
    public getBottom() : number { return this.bottom ; }
}

export default Wall ;