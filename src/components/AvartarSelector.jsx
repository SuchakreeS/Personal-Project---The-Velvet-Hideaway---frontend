import React, { useState } from 'react';
import useUserStore from '@/stores/userStore';
import { AVATARS } from '@/constants/avatars';

const AvatarSelector = () => {
    // 1. Pull everything from your synced store
    // Ensure these names match your useUserStore exactly
    const { profilePicture, setProfilePicture, editProfile } = useUserStore();
    
    // 2. Local state to track the "Saving..." process
    const [isUpdating, setIsUpdating] = useState(false);

    const handleSelect = async (url) => {
        // Prevent double-clicking while an update is in progress
        if (isUpdating) return;
        
        // 1. Keep track of the OLD picture in case the server fails
        const previousPicture = profilePicture; 

        setIsUpdating(true);
        try {
            // Optimistic Update: Change the UI immediately for a snappy feel
            setProfilePicture(url); 
            
            // 2. Sync with Backend
            // We pass the object { profilePicture: url } to match your controller logic
            if (typeof editProfile === 'function') {
                await editProfile({ profilePicture: url });
                console.log("Persona Synchronized");
            } else {
                throw new Error("editProfile function is missing from store");
            }
            
        } catch (err) {
            console.error("Sync failed:", err);
            
            // 3. REVERT: If the backend fails, put the old one back 
            setProfilePicture(previousPicture); 
            alert("Server connection failed. Profile could not be saved.");
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-sm shadow-2xl max-w-md">
            <header className="mb-8">
                <h3 className="text-[10px] tracking-[0.5em] text-emerald-500 uppercase font-black mb-1">
                    Identity Uplink
                </h3>
                <p className="text-white/40 text-[11px] uppercase tracking-wider">
                    {isUpdating ? "Synchronizing with Archive..." : "Select your visual persona"}
                </p>
            </header>

            <div className="grid grid-cols-4 gap-6">
                {AVATARS.map((avatar) => {
                    const isActive = profilePicture === avatar.url;
                    
                    return (
                        <button
                            key={avatar.id}
                            type="button"
                            onClick={() => handleSelect(avatar.url)}
                            disabled={isUpdating}
                            className={`relative group aspect-square rounded-full transition-all duration-700 ${
                                isActive 
                                ? 'ring-2 ring-emerald-500 ring-offset-4 ring-offset-[#0a0a0a] scale-110 shadow-[0_0_30px_rgba(16,185,129,0.3)]' 
                                : 'opacity-40 hover:opacity-100 grayscale hover:grayscale-0'
                            } ${isUpdating ? 'cursor-wait' : 'cursor-pointer'}`}
                        >
                            {/* The Image */}
                            <img 
                                src={avatar.url} 
                                alt={avatar.label} 
                                className="w-full h-full object-cover rounded-full border border-white/10" 
                            />

                            {/* Loading Spinner Overlay */}
                            {isActive && isUpdating && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full">
                                    <div className="w-5 h-5 border-2 border-emerald-500 border-t-transparent animate-spin rounded-full" />
                                </div>
                            )}

                            {/* Tooltip on Hover */}
                            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-[8px] text-white bg-black px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap tracking-widest border border-white/10">
                                {avatar.label}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* Bottom Status Bar */}
            <div className="mt-12 pt-4 border-t border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${isUpdating ? 'bg-amber-500 animate-pulse' : 'bg-emerald-500'}`} />
                    <span className="text-[9px] text-white/60 tracking-widest uppercase font-bold">
                        {isUpdating ? "System Busy" : "System Ready"}
                    </span>
                </div>
                <span className="text-[9px] text-white/20 font-mono">
                    UID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
                </span>
            </div>
        </div>
    );
};

export default AvatarSelector;