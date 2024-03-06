import React, { useState, useRef } from 'react';

interface AudioPlayerProps {
  src: string
}

const AudioPlayerComponent: React.FC<AudioPlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  const handlePlay = () => {

    const audio = audioRef.current

    if (audio) {
        setIsPlaying(!isPlaying)
    
        if (!isPlaying) {
          audio.play().catch((error) => {
            console.error("Audio Error : ", error)
            setIsPlaying(false)
          })
        } else {
          audio.pause()
        }
    }
  };

  return (
    <div className = 'absolute top-8 right-8 text-2xl text-white' >
      <audio ref = { audioRef } src = { src } loop />
      <button className = 'flex items-center' onClick = { handlePlay } >
        <img className = 'w-5 h-7' src = {isPlaying ? `${ process.env.PUBLIC_URL }/audio_on.png` : `${ process.env.PUBLIC_URL }/audio_off.png`} alt = "Audio button" />
      </button>
    </div>
  );
}

export default AudioPlayerComponent ;
