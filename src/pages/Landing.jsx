import React from 'react';
import { useNavigate } from 'react-router';

function Landing({ onGuest }) {
    const navigate = useNavigate();

    const handleEnter = () => {
        navigate('/auth/login');
    };

    const handleGuest = () => {
        if (onGuest) onGuest();
        navigate('/barfront');
    };

    return (
        <div className="h-screen w-full bg-[url(./assets/Bar-bg.png)] bg-cover flex flex-col items-center justify-center text-white p-6 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-white/20 to-transparent mb-12 opacity-50"></div>

            <div className="text-center z-10 max-w-4xl">
                <h1 className="font-fraunces italic text-7xl md:text-9xl mb-8 tracking-tighter leading-tight">
                    The Velvet <br /> 
                    <span className="text-accent">Hideaway</span>
                </h1>
                <p className="font-syne text-[10px] md:text-[12px] tracking-[0.7em] uppercase text-white/30 mb-20">
                    A Private Archive for the Modern Mixologist
                </p>

                <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
                    <button 
                        onClick={handleEnter}
                        className="group relative px-16 py-6 bg-white text-black font-syne font-black tracking-[0.4em] text-[11px] overflow-hidden transition-all duration-500"
                    >
                        <span className="relative z-10 group-hover:text-white transition-colors duration-500">
                            ENTER ARCHIVE
                        </span>
                        <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                    </button>
                    <button 
                        onClick={handleGuest}
                        className="px-12 py-6 border border-white/5 font-syne font-bold tracking-[0.4em] text-[10px] text-white/30 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-700 uppercase"
                    >
                        Continue as Guest
                    </button>
                </div>
            </div>

            {/* Bottom Decorative Footer */}
            <div className="absolute bottom-12 flex flex-col items-center gap-4">
                <div className="w-12 h-[1px] bg-white/10"></div>
                <div className="font-syne text-[8px] tracking-[1.2em] text-white/10 uppercase pl-[1.2em]">
                    Pathum Thani — Est. 2026
                </div>
            </div>

            {/* Corner Accents */}
            <div className="absolute top-10 left-10 border-t border-l border-white/5 w-10 h-10"></div>
            <div className="absolute bottom-10 right-10 border-b border-r border-white/5 w-10 h-10"></div>
        </div>
    );
}

export default Landing;