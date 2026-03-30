import { useEffect, useRef } from 'react';
import useMusicStore from '@/stores/musicStore';

const GlobalAudio = () => {
    const audioRef = useRef(null);
    const { isPlaying, currentTrack, volume, nextTrack } = useMusicStore();

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play().catch(() => console.log("User must click once to allow audio"));
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, currentTrack]);

    useEffect(() => {
        audioRef.current.volume = volume;
    }, [volume]);

    return (
        <audio 
            ref={audioRef} 
            src={currentTrack} 
            onEnded={nextTrack}
            className="hidden" 
        />
    );
};

export default GlobalAudio