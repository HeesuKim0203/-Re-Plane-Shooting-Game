import { enemyPlanLevelData } from "../data/enemyPlane";
import Painter from "./Painter";
import { EnemyPlane } from "./Plane"
import Wall from "./Wall"

const ENEMPLANE_START_POSITION_X = 1200 ;
const ENEMPLANE_START_POSITION_Y_MIN = 0 ;
const ENEMPLANE_START_POSITION_Y_MAX = 600 ;

const ENEMPLANE_MIN_TIME = 2000 ;
const ENEMPLANE_MAX_TIME = 4000 ;

type EnemyPlanImpomation = {
    level : number
    num : number
}

export type roundData = {
    title : string
    enemyPlan : EnemyPlanImpomation[]
    wall : Wall
    painter : Painter
    enemyPlaneDataList : enemyPlanLevelData[]
}

enum GameStatus {
    START = 1,
    END = 0
}

export default class Game {
    private title : string = "" ;
    private enemyPlaneList : EnemyPlanImpomation[] = [] ;
    private wall : Wall | null = null ;
    private painter : Painter | null = null ;
    private enemyPlaneDataList : enemyPlanLevelData[] = [] ;
    private gameStatus : GameStatus = GameStatus.START ;
    
    constructor({
        title,
        enemyPlan,
        wall,
        painter,
        enemyPlaneDataList
    } : roundData) {
        this.title = title ;
        this.enemyPlaneList = enemyPlan ;
        this.wall = wall ;
        this.painter = painter ;
        this.enemyPlaneDataList = enemyPlaneDataList ;
    }

    public getTitle()           { return this.title ; }
    public getGameStatus()      { return this.gameStatus ; }
    public setGameStatusEnd()   { this.gameStatus = GameStatus.END ; }
    
    // data.json Data => Painter 
    public start() {
        let id = 0 ; 

        if( this.painter ) {
            this.enemyPlaneList.forEach((enemyPlaneImportmation : EnemyPlanImpomation, index : number) => {
                for(let i = 0 ; i < enemyPlaneImportmation.num ; i++) {
                    const findIndex = this.enemyPlaneDataList.findIndex((enemyPlanData : enemyPlanLevelData) => enemyPlanData.level === enemyPlaneImportmation.level) ;
                    const planeData = this.enemyPlaneDataList[findIndex].planeDate ;

                    const y = Math.floor(Math.random() * (( ENEMPLANE_START_POSITION_Y_MAX - planeData.size ) - ENEMPLANE_START_POSITION_Y_MIN - 1)) + ENEMPLANE_START_POSITION_Y_MIN ;
                    const time = Math.floor(Math.random() * (ENEMPLANE_MAX_TIME - ENEMPLANE_MIN_TIME - 1)) + ENEMPLANE_MIN_TIME + index * 3000 ;
                    setTimeout(() => {
                        if(this.wall) {
                            const enemyPlan = new EnemyPlane(id, this.wall, ENEMPLANE_START_POSITION_X, y, planeData) ;
                            this.painter?.registerPlane(enemyPlan) ;
                        }
                    }, time) ;
                    id ++;
                }
            }) ;
        }

        const gameEndPid = setInterval(() => {
            if( this.painter?.getPlanes().length === 0 ) { 
                clearInterval(gameEndPid)
                this.end() ;
            }
        }, 1000) ;
    }

    // Game Clear
    public end() {
        
    }
}