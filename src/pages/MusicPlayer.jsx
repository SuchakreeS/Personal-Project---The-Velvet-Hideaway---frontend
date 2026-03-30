import React from 'react';
import useMusicStore from '@/stores/musicStore';

const MusicPlayer = () => {
    const { 
        playList, 
        currentTrack, 
        currentTrackTitle, 
        isPlaying, 
        togglePlay, 
        nextTrack, 
        prevTrack, 
        selectTrack,
        volume,
        setVolume 
    } = useMusicStore();

    return (
        <div className="min-h-screen bg-[url(./assets/Music-background.jpg)] bg-cover text-white py-20 px-6 font-sans">
            <div className="max-w-4xl mx-auto flex flex-col lg:flex-row gap-12 items-start">
                <div className="w-full lg:w-1/2 lg:sticky lg:top-24">
                    <div className="bg-[#1a1a1a] border border-white/5 p-8 flex flex-col gap-8 shadow-2xl rounded-sm">
                        <div className="h-40 bg-[#0a0a0a] border border-white/5 flex items-end justify-center gap-1 p-4 overflow-hidden">
                            {[...Array(12)].map((_, i) => (
                                <div 
                                    key={i} 
                                    className={`w-2 bg-emerald-500 transition-all duration-300 ${isPlaying ? 'animate-pulse' : 'h-2'}`}
                                    style={{ 
                                        height: isPlaying ? `${Math.floor(Math.random() * 60) + 20}%` : '8px'
                                    }}
                                />
                            ))}
                        </div>

                        {/* Track Info */}
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] tracking-[0.5em] text-neutral uppercase">Now Archiving</span>
                            <h2 className="text-3xl font-fraunces italic text-accent uppercase leading-tight">
                                {currentTrackTitle || "No Track Selected"}
                            </h2>
                        </div>

                        {/* Controls */}
                        <div className="flex flex-col gap-8">
                            <div className="flex items-center justify-between px-4">
                                <button 
                                    onClick={prevTrack} 
                                    className="text-white/40 hover:text-emerald-400 transition-colors text-3xl"
                                >
                                    «
                                </button>
                                
                                <button 
                                    onClick={togglePlay}
                                    className="w-20 h-20 rounded-full border border-emerald-500/20 flex items-center justify-center bg-emerald-500/5 hover:bg-emerald-500 hover:text-black transition-all duration-500"
                                >
                                    <span className="font-bold text-[10px] tracking-widest">
                                        {isPlaying ? "PAUSE" : "PLAY"}
                                    </span>
                                </button>

                                <button 
                                    onClick={nextTrack} 
                                    className="text-white/40 hover:text-emerald-400 transition-colors text-3xl"
                                >
                                    »
                                </button>
                            </div>

                            {/* Volume */}
                            <div className="flex flex-col gap-3">
                                <input 
                                    type="range" 
                                    min="0" max="1" step="0.01" 
                                    value={volume} 
                                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                                    className="w-full h-1 bg-white/10 appearance-none cursor-pointer accent-emerald-500"
                                />
                                <div className="flex justify-between text-[8px] tracking-widest text-white/20 uppercase">
                                    <span>Mute</span>
                                    <span>Full Volume</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT: THE PLAYLIST ARCHIVE --- */}
                <div className="w-full lg:w-1/2 flex flex-col gap-6 bg-secondary/50">
                    <h3 className="text-[10px] tracking-[0.6em] text-neutral uppercase border-b border-white/5 pb-4">
                        The Selection
                    </h3>
                    
                    <div className="flex flex-col">
                        {playList.map((track, index) => {
                            const isCurrent = currentTrack === track.url;
                            return (
                                <button 
                                    key={track.id}
                                    onClick={() => selectTrack(track)}
                                    className={`group flex items-center justify-between py-6 border-b border-white/5 transition-all text-left ${isCurrent ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
                                >
                                    <div className="flex items-center gap-6">
                                        <span className="text-accent text-xs font-mono">
                                            0{index + 1}
                                        </span>
                                        <div className="flex flex-col">
                                            <span className={`text-lg uppercase tracking-tighter ${isCurrent ? 'text-accent' : 'text-neutral'}`}>
                                                {track.title}
                                            </span>
                                            <span className="text-[9px] tracking-widest text-white/40 uppercase">
                                                {track.artist}
                                            </span>
                                        </div>
                                    </div>

                                    {isCurrent && isPlaying && (
                                        <div className="flex gap-1 h-3 items-end">
                                            <div className="w-[2px] bg-emerald-500 animate-bounce" />
                                            <div className="w-[2px] bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                                            <div className="w-[2px] bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <p className="mt-8 text-[10px] leading-relaxed text-white/10 italic">
                        The Velvet Hideaway Audio Archive — Est. 2026
                    </p>
                </div>

            </div>
        </div>
    );
};

export default MusicPlayer;