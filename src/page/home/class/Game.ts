import { EnemyPlanLevelData } from "../data/enemyPlane";
import Painter from "./Painter";
import { PlaneList, PlaneKind } from "./Plane"
import Wall from "./Wall"


const SCORE = 100 ;
const ENEMPLANE_START_POSITION_X = 1200 ;
const ENEMPLANE_START_POSITION_Y_MIN = 0 ;
const ENEMPLANE_START_POSITION_Y_MAX = 600 ;

const ENEMPLANE_MIN_TIME = 500 ;
const ENEMPLANE_MAX_TIME = 3000 ;

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
    private planeList : PlaneList = new PlaneList() ;
    public static enemyPlaneNum : number = 0 ;
    public static userScore : number = 0 ;
    
    constructor({
        title,
        enemyPlaneImformationList,
        wall,
        enemyPlaneDataList
    } : GameData ) {
        this.title = title ;
        this.enemyPlaneImformationList = enemyPlaneImformationList ;
        this.wall = wall ;
        this.enemyPlaneDataList = enemyPlaneDataList ;
    }

    public getTitle()           { return this.title ; }
    public getGameStatus()      { return this.gameStatus ; }
    public setGameStatusEnd()   { this.gameStatus = GameStatus.END ; }
    
    public start() {
        let id = 0 ; 
        let time = 0 ;

        this.enemyPlaneImformationList.forEach((enemyPlaneImportmation : EnemyPlaneImformation, index : number) => {

            Game.enemyPlaneNum += enemyPlaneImportmation.num ;

            for(let i = 0 ; i < enemyPlaneImportmation.num ; i++) {
                const findIndex = this.enemyPlaneDataList.findIndex((enemyPlanData : EnemyPlanLevelData) => enemyPlanData.level === enemyPlaneImportmation.level) ;
                const planeData = this.enemyPlaneDataList[findIndex].planeDate ;

                const y = Math.floor(Math.random() * (( ENEMPLANE_START_POSITION_Y_MAX - planeData.size.height ) - ENEMPLANE_START_POSITION_Y_MIN - 1)) + ENEMPLANE_START_POSITION_Y_MIN ;
                time += Math.floor(Math.random() * (ENEMPLANE_MAX_TIME - ENEMPLANE_MIN_TIME - 1)) + ENEMPLANE_MIN_TIME ;
                setTimeout(() => {
                    if(this.wall && this.planeList) {
                        this.planeList.createPlane(id, this.wall, ENEMPLANE_START_POSITION_X, y, planeData, PlaneKind.ENEMYPLANE) ;
                    }
                }, time) ;
                id ++;
            }
        }) ;
    }

    // Game Clear
    public end() {
        
    }
}

export function gameOver() {
    const gameEnd = document.getElementsByClassName('gameEnd')[0] as HTMLParagraphElement ;
    gameEnd.className = gameEnd.className.replace('hidden', 'flex') ;

    const gameOver = document.getElementsByClassName('gameOver')[0] as HTMLParagraphElement ;
    gameOver.className = gameOver.className.replace('hidden', 'block') ;
}

export function gameClear() {
    const gameEnd = document.getElementsByClassName('gameEnd')[0] as HTMLParagraphElement ;
    gameEnd.className = gameEnd.className.replace('hidden', 'flex') ;

    const gameOver = document.getElementsByClassName('gameClear')[0] as HTMLParagraphElement ;
    gameOver.className = gameOver.className.replace('hidden', 'block') ;
}

export function setUserLifeHTML( life : number ) {
    const userLife = document.getElementsByClassName('userLife')[0] as HTMLParagraphElement ;
    userLife.innerText = `Life : ${life <= 0 ? 0 : life}` ;

    if( life === 0 ) {
        gameOver() ;
    }
}

export function setUserScoreHTML( score : number ) {
    Game.userScore += SCORE * score ;
    
    const userScore = document.getElementsByClassName('userScore')[0] as HTMLParagraphElement ;
    userScore.innerText = `Score : ${Game.userScore}` ;

    if( Game.enemyPlaneNum !== 0 && Game.userScore === Game.enemyPlaneNum * SCORE ) {
        gameClear() ;
    }
}