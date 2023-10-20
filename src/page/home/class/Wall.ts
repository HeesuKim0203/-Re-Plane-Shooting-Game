class Wall {
    private left : number = 0 ;
    private top : number = 0 ;
    private right : number = 0 ;
    private bottom : number = 0 ;

    constructor( left : number, top : number, right : number, bottom : number ) {
        this.left = left ;
        this.top = top ;
        this.right = right ;
        this.bottom = bottom ;
    }

    public getLeft() { return this.left ; }
    public getTop() { return this.top ; }
    public getRight() { return this.right ; }
    public getBottom() { return this.bottom ; }
}

export default Wall ;