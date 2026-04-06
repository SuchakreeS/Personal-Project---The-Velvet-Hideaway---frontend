import { useEffect, useRef } from 'react';
import useMusicStore from '@/stores/musicStore';

const GlobalAudio = () => {
    const audioRef = useRef(null);
    const { isPlaying, currentTrack, volume, nextTrack } = useMusicStore();

    // Handle Play/Pause and Track Changes
    useEffect(() => {
        if (audioRef.current && currentTrack) {
            if (isPlaying) {
                // We use a small timeout to ensure the src is loaded before playing
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(() => {
                        console.log("Autoplay blocked. Click anywhere on the bar to enable audio.");
                    });
                }
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying, currentTrack]);

    // Handle Volume Changes
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    return (
        <audio 
            ref={audioRef} 
            src={currentTrack} 
            onEnded={nextTrack} // Auto-play next song in Audius playlist
            className="hidden" 
        />
    );
};

export default GlobalAudio;