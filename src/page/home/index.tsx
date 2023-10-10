import React from 'react' ;

import Canvas from './Canvas'

function Home() {
    return (
        <div className = 'flex flex-col items-center bg-zinc-300'>
            <h1 className = 'mt-12 font-pixel font-semibold text-5xl'>Plane Shooting Game</h1>
            <div className = 'mt-14'>
                <Canvas 
                    width = { 1200 }
                    height = { 600 }
                />
            </div>
        </div>
    ) ;
}

export default Home ;