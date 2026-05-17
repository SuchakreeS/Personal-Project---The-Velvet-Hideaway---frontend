import React, { useState, useEffect } from 'react';
import AvatarSelector from './AvartarSelector';
import useUserStore from '@/stores/userStore';

const EditProfileModal = ({ id }) => {
    const { user, editProfile } = useUserStore();
    
    // 1. Create state for all editable fields
    const [username, setUsername] = useState("");
    const [info, setInfo] = useState("");

    // 2. Sync local state with current user data when modal opens
    useEffect(() => {
        if (user) {
            setUsername(user.username || "");
            setInfo(user.info || "");
        }
    }, [user]);

    const hdlSubmit = async () => {
        try {
            // 3. Send both username and info to the backend
            await editProfile({ 
                username: username,
                info: info 
            });
            
            console.log("Archive updated");
            document.getElementById(id).close();
        } catch (err) {
            console.error("Failed to update archive:", err);
        }
    };

    return (
        <dialog id={id} className="modal modal-bottom sm:modal-middle">
            <div className="modal-box bg-[#121212] border border-white/10 rounded-none p-8 max-w-2xl">
                
                {/* Header */}
                <div className="mb-8 border-b border-white/5 pb-4">
                    <h3 className="font-black text-accent text-[11px] tracking-[0.5em] uppercase">
                        Archive Modification
                    </h3>
                    <p className="text-white/30 text-[10px] uppercase tracking-widest mt-1">
                        Update your visual persona and credentials
                    </p>
                </div>

                <div className="flex flex-col gap-10">
                    {/* SECTION: AVATAR SELECTION */}
                    <div className="flex flex-col gap-4">
                        <label className="text-[10px] text-white/50 tracking-[0.2em] uppercase font-bold">
                            Select New Persona
                        </label>
                        <AvatarSelector />
                    </div>

                    {/* SECTION: PROFILE DETAILS */}
                    <div className="flex flex-col gap-6">
                        
                        {/* USERNAME FIELD */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] text-white/50 tracking-[0.2em] uppercase font-bold">
                                Display Name
                            </label>
                            <input 
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="bg-black/40 border border-white/10 p-4 text-white outline-none focus:border-accent transition-colors"
                                placeholder="Enter username..."
                            />
                        </div>

                        {/* BIOGRAPHY FIELD */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[10px] text-white/50 tracking-[0.2em] uppercase font-bold">
                                Update Biography
                            </label>
                            <textarea 
                                value={info}
                                onChange={(e) => setInfo(e.target.value)}
                                className="bg-black/40 border border-white/10 p-4 text-white font-fraunces italic outline-none focus:border-accent transition-colors"
                                rows="3"
                                placeholder="Edit your archive history..."
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Modal Actions */}
                <div className="modal-action mt-10">
                    <div className="flex gap-4 w-full">
                        <button 
                            type="button"
                            onClick={hdlSubmit}
                            className="flex-1 bg-accent text-black font-black text-[10px] tracking-[0.3em] py-4 hover:bg-white transition-colors duration-300"
                        >
                            SAVE CHANGES
                        </button>
                        
                        <form method="dialog">
                            <button className="px-6 h-full border border-white/10 text-white/40 font-black text-[10px] tracking-[0.3em] hover:text-white transition-colors">
                                CLOSE
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            
            <form method="dialog" className="modal-backdrop bg-black/80">
                <button>close</button>
            </form>
        </dialog>
    );
};

export default EditProfileModal;