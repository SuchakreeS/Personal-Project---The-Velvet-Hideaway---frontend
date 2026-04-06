import EditProfileModal from '@/components/EditProfileModal';
import useRecipeStore from '@/stores/recipeStore';
import useUserStore from '@/stores/userStore';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Profile = () => {
    const navigate = useNavigate()
    const { user, getMe, logout } = useUserStore()
    const { recipes, getRecipes } = useRecipeStore()

    useEffect(() => {
        if (!user) {
            navigate('/auth/login')
            return
        }

        const refreshProfile = async () => {
            try {
                await Promise.all([getMe?.(), getRecipes?.()])
            } catch (err) {
                console.log(err)
            }
        }

        refreshProfile()
    }, [navigate])

    const userRecipes = recipes.filter(recipe => recipe.userId === user?.id)
    const joinedDate = user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US') : "Undefined"

    const hdlLogout = () => {
        logout();
        navigate('/')
    }

    if (!user) {
        return null
    }

    return (
        <div className='min-h-screen bg-[url(./assets/Bar-bg.png)] bg-cover text-neutral font-fraunces'>
            <div className='max-w-4xl mx-auto px-6 py-20 flex flex-col gap-8'>
                {/* Header */}
                <div className='flex flex-col items-center gap-8 border-b border-neutral/5 pb-12'>
                    <div className='avatar'>
                        <div className='w-32 rounded-full ring ring-accent ring-offset-base-100 ring-offset-2 bg-primary flex items-center justify-center'>
                            {user.username}
                        </div>
                    </div>
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <h1 className="text-5xl font-fraunces italic tracking-tighter text-accent uppercase">
                            {user.username}
                        </h1>
                        <p className="text-[10px] tracking-[0.4em] text-white/30 uppercase">
                            Archive Member since {joinedDate}
                        </p>
                    </div>
                </div>
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-[#1a1a1a] border border-white/5 p-6 flex flex-col gap-2">
                        <span className="text-[10px] text-white/20 tracking-widest uppercase">Total Crafts</span>
                        <span className="text-3xl font-fraunces text-accent">{recipes.length}</span>
                    </div>
                    <div className="bg-[#1a1a1a] border border-white/5 p-6 flex flex-col gap-2">
                        <span className="text-[10px] text-white/20 tracking-widest uppercase">Member Tier</span>
                        <span className="text-3xl font-fraunces text-accent">GUEST</span>
                    </div>
                    <div className="bg-[#1a1a1a] border border-white/5 p-6 flex flex-col gap-2">
                        <span className="text-[10px] text-white/20 tracking-widest uppercase">Status</span>
                        <span className="text-3xl font-fraunces text-accent uppercase">Verified</span>
                    </div>
                </div>
                {/* Info */}
                <div className="flex flex-col gap-8 bg-[#1a1a1a]/30 p-8 border border-white/5">
                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-accent tracking-[0.3em] uppercase font-bold">Email Address</label>
                        <p className="text-lg text-white/70">{user.email}</p>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-[10px] text-accent tracking-[0.3em] uppercase font-bold">Biography</label>
                        <p className="text-lg text-white/70 leading-relaxed italic font-fraunces">
                            {user.info || "No biography provided in the archives yet."}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-4 pt-6">
                    <button
                        onClick={() => document.getElementById('EditProfileModal').showModal()}
                        className="flex-1 bg-white text-black py-4 font-black text-[10px] tracking-[0.3em] hover:bg-accent transition-colors duration-300">
                        EDIT PROFILE
                    </button>
                    <button
                        onClick={hdlLogout}
                        className="flex-1 border border-white/10 text-white/40 py-4 font-black text-[10px] tracking-[0.3em] hover:border-red-900 hover:text-red-500 transition-all duration-300">
                        LOGOUT FROM ARCHIVE
                    </button>
                </div>
            </div>
            <EditProfileModal id="EditProfileModal"/>

        </div>
    )
}

export default Profile;