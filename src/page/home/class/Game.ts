import { EnemyPlanLevelData } from "../data/enemyPlane";
import Painter from "./Painter";
import { PlaneList, PlaneKind } from "./Plane"
import Wall from "./Wall"

const ENEMPLANE_START_POSITION_X = 1200 ;
const ENEMPLANE_START_POSITION_Y_MIN = 0 ;
const ENEMPLANE_START_POSITION_Y_MAX = 600 ;

const ENEMPLANE_MIN_TIME = 5000 ;
const ENEMPLANE_MAX_TIME = 25000 ;

type EnemyPlaneImformation = {
    level : number
    num : number
}

export type GameData = {
    title : string
    enemyPlaneImformationList : EnemyPlaneImformation[]
    wall : Wall
    painter : Painter
    enemyPlaneDataList : EnemyPlanLevelData[]
}

enum GameStatus {
    START = 1,
    END = 0
}

export default class Game {
    private title : string = "" ;
    private enemyPlaneImformationList : EnemyPlaneImformation[] = [] ;
    private wall : Wall | null = null ;
    private enemyPlaneDataList : EnemyPlanLevelData[] = [] ;
    private gameStatus : GameStatus = GameStatus.START ;

    private planeList : PlaneList | null = null ;
    
    constructor({
        title,
        enemyPlaneImformationList,
        wall,
        enemyPlaneDataList
    } : GameData, planeList : PlaneList ) {
        this.title = title ;
        this.enemyPlaneImformationList = enemyPlaneImformationList ;
        this.wall = wall ;
        this.enemyPlaneDataList = enemyPlaneDataList ;

        this.planeList = planeList ;

        const p = document.createElement('p') ;
        p.className = 'absolute' ;
    }

    public getTitle()           { return this.title ; }
    public getGameStatus()      { return this.gameStatus ; }
    public setGameStatusEnd()   { this.gameStatus = GameStatus.END ; }
    
    public start() {
        let id = 0 ; 

        this.enemyPlaneImformationList.forEach((enemyPlaneImportmation : EnemyPlaneImformation, index : number) => {
            for(let i = 0 ; i < enemyPlaneImportmation.num ; i++) {
                const findIndex = this.enemyPlaneDataList.findIndex((enemyPlanData : EnemyPlanLevelData) => enemyPlanData.level === enemyPlaneImportmation.level) ;
                const planeData = this.enemyPlaneDataList[findIndex].planeDate ;

                const y = Math.floor(Math.random() * (( ENEMPLANE_START_POSITION_Y_MAX - planeData.size.height ) - ENEMPLANE_START_POSITION_Y_MIN - 1)) + ENEMPLANE_START_POSITION_Y_MIN ;
                const time = Math.floor(Math.random() * (ENEMPLANE_MAX_TIME - ENEMPLANE_MIN_TIME - 1)) + ENEMPLANE_MIN_TIME ;
                setTimeout(() => {
                    if(this.wall && this.planeList) {
                        this.planeList.createPlane(id, this.wall, ENEMPLANE_START_POSITION_X, y, planeData, PlaneKind.ENEMYPLANE) ;
                    }
                }, time) ;
                id ++;
            }
        }) ;

        // Todo : Game End fg setting
        const gameEndPid = setInterval(() => {
            if( this.planeList?.getEnemyPlanes().length === 0 ) { 
                clearInterval(gameEndPid)
                this.end() ;
            }
        }, 1000) ;
    }

    // Game Clear
    public end() {
        
    }
}