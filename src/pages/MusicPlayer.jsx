import React, { useEffect } from 'react';
import useMusicStore from '@/stores/musicStore';

const MusicPlayer = () => {
    const {
        playList,
        currentTrack,
        currentTrackTitle,
        currentArtist,
        currentCover,
        isPlaying,
        togglePlay,
        nextTrack,
        prevTrack,
        selectTrack,
        volume,
        setVolume,
        getMood
    } = useMusicStore();

    useEffect(() => {
        if (playList.length === 0) {
            getMood("90s Rock");
        }
    }, [playList.length, getMood]);

    return (
        <div className="h-screen w-full bg-[#050505] text-white overflow-hidden bg-[url(./assets/Music-background.jpg)] bg-cover bg-center relative">

            {/* HEAVIER OVERLAY: Increased from 70 to 85 for better text contrast */}
            <div className="absolute inset-0 bg-black/85 backdrop-blur-sm -z-10" />

            <div className="max-w-7xl mx-auto h-full flex flex-col lg:flex-row items-stretch px-6 pt-24 pb-10 gap-12">

                {/* --- LEFT: THE CONTROL DECK --- */}
                <div className="w-full lg:w-5/12 flex flex-col justify-center">
                    {/* Increased opacity to 95% and added a stronger border */}
                    <div className="bg-[#111111]/95 border border-white/10 p-8 flex flex-col gap-8 shadow-2xl rounded-sm backdrop-blur-2xl">

                        {/* Visualizer Display */}
                        <div className="h-64 bg-[#050505] border border-white/5 flex items-end justify-center gap-1.5 p-6 overflow-hidden relative group">
                            {currentCover && (
                                <img
                                    src={currentCover}
                                    alt="Cover"
                                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-1000"
                                />
                            )}

                            <div className="flex items-end gap-1.5 z-10 w-full justify-center">
                                {[...Array(20)].map((_, i) => (
                                    <div
                                        key={i}
                                        className={`w-1.5 bg-emerald-400 transition-all duration-300 ${isPlaying ? 'animate-pulse' : 'h-1'}`}
                                        style={{
                                            height: isPlaying ? `${Math.floor(Math.random() * 70) + 10}%` : '4px',
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Metadata: Used higher contrast colors */}
                        <div className="space-y-1">
                            <span className="text-[10px] tracking-[0.5em] text-emerald-400 uppercase font-bold drop-shadow-md">Signal Received</span>
                            <h2 className="text-4xl font-fraunces italic text-accent uppercase leading-tight truncate drop-shadow-lg">
                                {currentTrackTitle || "Searching..."}
                            </h2>
                            <p className="text-sm tracking-[0.2em] text-white/90 uppercase font-medium">
                                {currentArtist || "Unknown Origin"}
                            </p>
                        </div>

                        {/* Controls */}
                        <div className="space-y-8">
                            <div className="flex items-center justify-between px-6">
                                <button onClick={prevTrack} className="text-white/60 hover:text-emerald-400 transition-all text-4xl">«</button>
                                <button
                                    onClick={togglePlay}
                                    className="w-20 h-20 rounded-full border-2 border-emerald-500/50 flex items-center justify-center bg-emerald-500/10 hover:bg-emerald-500 hover:text-black transition-all duration-500 shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                                >
                                    <span className="font-bold text-[11px] tracking-[0.2em]">{isPlaying ? "PAUSE" : "PLAY"}</span>
                                </button>
                                <button onClick={nextTrack} className="text-white/60 hover:text-emerald-400 transition-all text-4xl">»</button>
                            </div>

                            <div className="space-y-3 bg-black/40 p-4 rounded-lg">
                                <input
                                    type="range" min="0" max="1" step="0.01" value={volume}
                                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                                    className="w-full h-1.5 bg-white/20 appearance-none cursor-pointer accent-emerald-400"
                                />
                                <div className="flex justify-between text-[9px] tracking-[0.3em] text-white/70 uppercase font-bold">
                                    <span>Silence</span>
                                    <span>Output: {Math.round(volume * 100)}%</span>
                                    <span>Peak</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT: THE PLAYLIST ARCHIVE --- */}
                <div className="w-full lg:w-7/12 flex flex-col h-full min-h-0 bg-black/40 backdrop-blur-md p-6 rounded-sm border border-white/5">
                    <div className="flex justify-between items-end border-b-2 border-emerald-500/20 pb-4 mb-2">
                        <h3 className="text-[11px] tracking-[0.6em] text-white uppercase font-black">
                            Archive Logs
                        </h3>
                        <div className="flex gap-4">
                            <button onClick={() => getMood("90s Rock")} className="text-[10px] text-emerald-400 hover:underline font-bold">ROCK</button>
                            <button onClick={() => getMood("Lofi Jazz")} className="text-[10px] text-emerald-400 hover:underline font-bold">LO-FI</button>
                            <button onClick={() => getMood("Ballad Rock")} className="text-[10px] text-emerald-400 hover:underline font-bold">BALLAD ROCK</button>
                            <button onClick={() => getMood("Jazz")} className="text-[10px] text-emerald-400 hover:underline font-bold">JAZZ</button>
                        </div>
                    </div>

                    {/* INTERNAL SCROLL BOX */}
                    <div className="flex-1 overflow-y-auto pr-4 scrollbar-custom">
                        <style>{`
                            .scrollbar-custom::-webkit-scrollbar { width: 6px; }
                            .scrollbar-custom::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
                            .scrollbar-custom::-webkit-scrollbar-thumb { background: #10b981; border-radius: 0px; }
                        `}</style>

                        {playList.map((track, index) => {
                            const isCurrent = currentTrack === track.url;
                            return (
                                <button
                                    key={track.id || index}
                                    onClick={() => selectTrack(track)}
                                    className={`w-full group flex items-center justify-between py-6 border-b border-white/10 transition-all text-left ${isCurrent ? 'bg-emerald-500/10 px-4 -mx-2 border-l-4 border-l-emerald-500' : 'opacity-60 hover:opacity-100 hover:bg-white/5 hover:px-2'}`}
                                >
                                    <div className="flex items-center gap-6">
                                        <span className={`text-xs font-mono font-bold ${isCurrent ? 'text-emerald-400' : 'text-white/40'}`}>
                                            {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                        </span>
                                        <div className="flex flex-col">
                                            <span className={`text-base uppercase tracking-wider ${isCurrent ? 'text-emerald-400 font-black' : 'text-white font-bold'}`}>
                                                {track.title}
                                            </span>
                                            <span className={`text-[10px] tracking-widest uppercase ${isCurrent ? 'text-white/80' : 'text-white/50'}`}>
                                                {track.artist}
                                            </span>
                                        </div>
                                    </div>

                                    {isCurrent && isPlaying && (
                                        <div className="flex gap-1 h-4 items-end">
                                            <div className="w-[3px] bg-emerald-400 animate-bounce [animation-duration:0.6s]" />
                                            <div className="w-[3px] bg-emerald-400 animate-bounce [animation-duration:0.8s]" />
                                            <div className="w-[3px] bg-emerald-400 animate-bounce [animation-duration:0.4s]" />
                                        </div>
                                    )}
                                </button>
                            );
                        })}

                        <div className="py-20 opacity-30 text-center">
                            <p className="text-[10px] tracking-[1em] uppercase font-bold text-emerald-500">End of Transmission</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default MusicPlayer;