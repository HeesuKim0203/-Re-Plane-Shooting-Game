import React, { useState } from 'react'

import Canvas from './Canvas'

import { 
    TITLE, 
    
    START_SCREEN, 
    START_BUTTON_TEXT,
    INFORMATION_BUTTON_TEXT,
    
    INFORMATION_SCREEN, 
    AUTOR_TEXT,

    GAME_SCREEN, 

    BACK_BUTTON_TEXT
} from '../../util/text'
import { USER_LIFE, USER_SCORE } from '../../util/className'
import AudioPlayer from '../../AudioPlayer'

type Prop = {
    displayStatus : string
    setDisplayStatus : React.Dispatch<React.SetStateAction<string>>
}

function StartScreen({ setDisplayStatus } : Prop) {
    return (
        <div className = 'gameBeforButtonContainer font-pixel font-semibold text-2xl text-white'>
            <button 
                className = 'startButton flex items-center justify-center w-8 h-12 p-2 hover:text-3xl'
                onClick = { () => setDisplayStatus(GAME_SCREEN) }
            >{ START_BUTTON_TEXT }</button>
            <button 
                className = 'information flex items-center justify-center w-8 h-12 p-2 hover:text-3xl'
                onClick = { () => setDisplayStatus(INFORMATION_SCREEN) }
            >{ INFORMATION_BUTTON_TEXT }</button>
        </div>
    ) ;
}

function InformationScreen({ setDisplayStatus } : Prop) {
    return (
        <div className = 'gameInformation font-pixel font-semibold text-2xl text-white'>
            <div className = 'gameinformtationKeyBoard relative'>
                <p className = 'author'>{ AUTOR_TEXT }</p>
                <img 
                    className = 'upKey'
                    src = {`${process.env.PUBLIC_URL}/information.png`} 
                    alt = 'Game Information'
                    width = { '1000px' }
                />
                <button
                    className = 'backButton absolute bottom-5 right-5 w-5 h-5 text-xl hover:text-2xl '
                    onClick = { () => setDisplayStatus(START_SCREEN) }
                >{ BACK_BUTTON_TEXT }</button>
            </div>
        </div>
    ) ;
}

function NotGameScreen({ displayStatus, setDisplayStatus } : Prop) {
    return (
        <div className = 'gameBefor flex w-[1200px] h-[600px] bg-transparent items-center justify-center'>
            {
                (() : JSX.Element => {
                    switch(displayStatus) {
                        case START_SCREEN :
                            return <StartScreen displayStatus = { displayStatus } setDisplayStatus = { setDisplayStatus } />
                        case INFORMATION_SCREEN :
                            return <InformationScreen displayStatus = { displayStatus } setDisplayStatus = { setDisplayStatus } />
                        default : 
                            return <></>
                    }
                })()
            }
        </div>
    ) ;
}

function GameScreen({ displayStatus, setDisplayStatus } : Prop) {
    return (
        <>
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
            <div className = 'canvas-container relative'>
                <p className = { `${USER_LIFE} absolute -top-6 left-1 text-white font-pixel text-xl` }></p>
                <p className = { `${USER_SCORE} absolute -top-6 right-1 text-white font-pixel text-xl` }></p>
                <Canvas 
                    width = { 1200 }
                    height = { 600 }
                />
            </div>
        </>
    ) ;
}

function Home() {

    const [ displayStatus, setDisplayStatus ] = useState<string>(START_SCREEN)

    return (
        <div className = "flex flex-col relative items-center w-screen h-screen bg-[url('/public/background.png')]">
            <h1 className = 'mt-12 mb-14 font-pixel font-bold text-5xl text-white'>{ TITLE }</h1>
            {
                (() : JSX.Element => {
                    switch(displayStatus) {
                        case GAME_SCREEN :
                            return <GameScreen displayStatus = { displayStatus } setDisplayStatus = { setDisplayStatus } />
                        default : 
                            return <NotGameScreen displayStatus = { displayStatus } setDisplayStatus = { setDisplayStatus } />
                    }
                })()
            }
            <AudioPlayer 
                src = {`${ process.env.PUBLIC_URL }/bgm.mp3`}
            />
        </div>
    ) ;
}

export default Home ;