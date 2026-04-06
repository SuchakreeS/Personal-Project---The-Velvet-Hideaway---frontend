import React from 'react';

const About = () => {
    return (
        <div className="min-h-screen bg-[url(./assets/Bar-bg.png)] bg-cover py-20 px-6 relative overflow-hidden">
            {/* Warm Ambient Glows */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 blur-[120px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-900/10 blur-[120px] rounded-full pointer-events-none"></div>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="text-center mb-20">
                    <span className="font-syne text-[10px] tracking-[0.5em] text-accent uppercase">Our Story</span>
                    <h2 className="font-fraunces italic text-6xl md:text-7xl text-neutral mt-4">
                        The Soul of the <span className="text-accent">Hideaway</span>
                    </h2>
                </div>

                {/* Main Content: Two Column Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8">
                        <div className="border-l-2 border-accent/30 pl-8">
                            <h3 className="font-fraunces text-2xl text-accent italic mb-4">A Sanctuary in the Digital Noise</h3>
                            <p className="font-syne text-sm leading-loose text-white/60">
                                The Velvet Hideaway wasn't built for the crowd; it was built for the individual. 
                                In a world that moves too fast, we created a digital sanctuary that asks you 
                                to slow down, pour a glass, and stay a while.
                            </p>
                        </div>
                        
                        <p className="font-syne text-sm leading-loose text-white/60">
                            Our philosophy is simple: "Warmth" in every interaction and a "Cozy" atmosphere 
                            that transcends the screen. Whether you are archiving a new craft or exploring 
                            the foundations of spirits, you are part of a quiet tradition.
                        </p>
                    </div>

                    {/* Decorative Visual Element */}
                    <div className="relative group">
                        <div className="aspect-[4/5] bg-black/40 border border-white/5 overflow-hidden">
                            <img 
                                src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=800" 
                                alt="Cozy Bar Atmosphere" 
                                className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-1000 scale-110 group-hover:scale-100"
                            />
                        </div>
                        {/* Quote Overlay */}
                        <div className="absolute -bottom-6 -right-6 bg-accent p-8 max-w-[240px] shadow-2xl">
                            <p className="font-fraunces italic text-black text-lg leading-tight">
                                "The best conversations happen in the dim light of a shared secret."
                            </p>
                        </div>
                    </div>
                </div>

                {/* The "Warm & Cozy" Core Values Section */}
                <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/5 pt-20">
                    <div className="text-center group">
                        <div className="text-accent font-fraunces text-4xl mb-4 group-hover:-translate-y-2 transition-transform duration-500">01</div>
                        <h4 className="font-syne text-[10px] tracking-[0.3em] uppercase text-neutral mb-4">Atmosphere</h4>
                        <p className="font-syne text-xs text-white/40 leading-relaxed italic">
                            A curated selection of 90s ballads and low-light aesthetics to keep your space inviting.
                        </p>
                    </div>
                    
                    <div className="text-center group">
                        <div className="text-accent font-fraunces text-4xl mb-4 group-hover:-translate-y-2 transition-transform duration-500">02</div>
                        <h4 className="font-syne text-[10px] tracking-[0.3em] uppercase text-neutral mb-4">Craft</h4>
                        <p className="font-syne text-xs text-white/40 leading-relaxed italic">
                            Every recipe is a piece of history. We treat the digital archive with the same respect as a cellar.
                        </p>
                    </div>

                    <div className="text-center group">
                        <div className="text-accent font-fraunces text-4xl mb-4 group-hover:-translate-y-2 transition-transform duration-500">03</div>
                        <h4 className="font-syne text-[10px] tracking-[0.3em] uppercase text-neutral mb-4">Community</h4>
                        <p className="font-syne text-xs text-white/40 leading-relaxed italic">
                            Designed for the modern mixologist, the home-brewer, and the soul looking for a retreat.
                        </p>
                    </div>
                </div>

                {/* Footer Signature */}
                <div className="mt-32 text-center">
                    <div className="w-16 h-[1px] bg-accent/30 mx-auto mb-8"></div>
                    <p className="font-fraunces italic text-white/20 text-sm">
                        Curated with care. Est. 2026.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;