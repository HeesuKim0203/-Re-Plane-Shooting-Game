import React from 'react' ;

import Canvas from './Canvas'

function Home() {
    return (
        <div className = "flex flex-col relative items-center w-screen h-screen bg-[url('/public/background.png')]">
            <div className = 'gameEnd hidden w-screen h-screen opacity-70 bg-black text-3xl text-white font-pixel items-center justify-center absolute top-0 left-0 z-50'>
                <p className = 'gameClear hidden'>Game Clear</p>
                <p className = 'gameOver hidden'>Game Over</p>
                <button className = 'restart '>
                    {/* Todo : Icon */}
                </button>
            </div>
            <h1 className = 'mt-12 mb-14 font-pixel font-bold text-5xl text-white'>Plane Shooting Game</h1>
            {/* <div className = 'canvas-container relative'>
                <p className = 'userLife absolute -top-6 left-1 text-white font-pixel text-xl'></p>
                <Canvas 
                    width = { 1200 }
                    height = { 600 }
                />
            </div> */}
            <div className = 'gameBefor flex w-[1200px] h-[600px] bg-transparent items-center justify-center'>
                {/* <div className = 'gameBeforButtonContainer font-pixel font-semibold text-2xl text-white'>
                    <button className = 'startButton flex items-center justify-center w-5 p-2 hover:text-3xl'>Start</button>
                    <button className = 'information flex items-center justify-center w-5 p-2 hover:text-3xl'>Information</button>
                </div> */}
                <div className = 'gameInformation font-pixel font-semibold text-2xl text-white'>
                    <div className = 'gameinformtationKeyBoard'>
                        <img 
                            className = 'upKey top-10 right-10'
                            src = {`${process.env.PUBLIC_URL}/information.png`} 
                            alt = "Keyboard up key"
                            width = { "800px" }
                        />
                    </div>
                </div>
            </div>

        </div>
    ) ;
}

export default Home ;