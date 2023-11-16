import React, { useState } from 'react' ;

import Canvas from './Canvas'

const STARTSCREEN = 'SCREEN' ;
const INFORMATIONSCREEN = 'INFORMATIONSCREEN' ;
const GAMESCREEN = 'GAMESCREEN' ;

function Home() {

    const [ displayStatus, setDisplayStatus ] = useState<string>(STARTSCREEN) ;

    return (
        <div className = "flex flex-col relative items-center w-screen h-screen bg-[url('/public/background.png')]">
            <div className = 'gameEnd hidden flex-col w-screen h-screen opacity-70 bg-black text-5xl text-white font-pixel items-center justify-center absolute top-0 left-0 z-50'>
                <p className = 'gameClear hidden h-5'>Game Clear</p>
                <p className = 'gameOver hidden h-5'>Game Over</p><br/>
                <button 
                    className = 'restart h-5 block text-2xl hover:text-3xl'
                    onClick = {() => window.location.reload() }
                >
                    Come back start screen
                </button>
            </div>
            <h1 className = 'mt-12 mb-14 font-pixel font-bold text-5xl text-white'>Plane Shooting Game</h1>
            { displayStatus === GAMESCREEN && 
                <div className = 'canvas-container relative'>
                    <p className = 'userLife absolute -top-6 left-1 text-white font-pixel text-xl'></p>
                    <p className = 'userScore absolute -top-6 right-1 text-white font-pixel text-xl'></p>
                    <Canvas 
                        width = { 1200 }
                        height = { 600 }
                    />
                </div>
            }
            { displayStatus !== GAMESCREEN && 
                <div className = 'gameBefor flex w-[1200px] h-[600px] bg-transparent items-center justify-center'>
                    { displayStatus === STARTSCREEN && 
                        <div className = 'gameBeforButtonContainer font-pixel font-semibold text-2xl text-white'>
                            <button 
                                className = 'startButton flex items-center justify-center w-8 h-12 p-2 hover:text-3xl'
                                onClick = { () => setDisplayStatus(GAMESCREEN) }
                            >Start</button>
                            <button 
                                className = 'information flex items-center justify-center w-8 h-12 p-2 hover:text-3xl'
                                onClick = { () => setDisplayStatus(INFORMATIONSCREEN) }
                            >Information</button>
                        </div>
                    }
                    { displayStatus === INFORMATIONSCREEN && 
                        <div className = 'gameInformation font-pixel font-semibold text-2xl text-white'>
                            <div className = 'gameinformtationKeyBoard relative'>
                                <p className = 'author'> Author : Heesu Kim </p>
                                <img 
                                    className = 'upKey'
                                    src = {`${process.env.PUBLIC_URL}/information.png`} 
                                    alt = 'Game Information'
                                    width = { '1000px' }
                                />
                                <button
                                    className = 'backButton absolute bottom-5 right-5 w-5 h-5 text-xl hover:text-2xl '
                                    onClick = { () => setDisplayStatus(STARTSCREEN) }
                                >Back</button>
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    ) ;
}

export default Home ;