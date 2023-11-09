import { PlaneData } from "./Plane"
import Wall from "./Wall"

const ENEM_PLANE_START_POSITION_X = 1100 ;

type EnemyPlanImpomation = {
    level : number,
    num : number
}

export type roundData = {
    title : string
    enemyPlan : EnemyPlanImpomation[]
}

enum GameStatus {
    START = 1,
    END = 0
}

export default class Game {
    private title : string = "" ;
    private enemyPlaneList : EnemyPlanImpomation[] = [] ;
    
    constructor({
        title,
        enemyPlan
    } : roundData) {
        this.title = title ;
        this.enemyPlaneList = enemyPlan ;
    }

    public getTitle() { return this.title ; }
    public start( id : number, size : number, wall : Wall, planeData : PlaneData) {
        const y = wall.getBottom() / 2 + Math.floor(Math.random() * (600 - 0 + 1)) + 0 ;
        
        // this.enemyPlaneList.forEach((enemyPlane) => {
        //     const 
        //     setTimeout((callback), )
        // }) ;
    }
    public createEnemyPlane() {

    }
    public status() {

    }
}