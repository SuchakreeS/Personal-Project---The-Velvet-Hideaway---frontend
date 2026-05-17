import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { mainApi } from '@/api/mainApi'

const useUserStore = create(persist((set, get) => ({
    profilePicture: 'https://api.dicebear.com/7.x/shapes/svg?seed=Noir&backgroundColor=050505,10b981',

    // 2. Rename the setter
    setProfilePicture: (newUrl) => set({ profilePicture: newUrl }),

    user: null,
    token: "",

    editProfile: async (body) => {
        try {
            const rs = await mainApi.patch('/user/edit', body);
            const updatedUser = rs.data.updated;

            // Update both the user object and the specific profilePicture state
            set({
                user: updatedUser,
                profilePicture: updatedUser.profilePicture
            });
            return rs;
        } catch (err) {
            console.error("Store Sync Error:", err);
            throw err;
        }
    },

    login: async (body) => {
        try {
            const rs = await mainApi.post('/auth/login', body);
            const { token, user } = rs.data;

            if (token && user) {
                set({
                    token,
                    user,
                    // FIX: Always take the picture from the DB first. 
                    // If the DB is empty (""), then and only then use a default.
                    profilePicture: user.profilePicture || "https://api.dicebear.com/7.x/shapes/svg?seed=Noir"
                });
            }
            return rs;
        } catch (err) {
            throw err;
        }
    },

    getMe: async () => {
        try {
            const rs = await mainApi.get('/user');
            const { user } = rs.data;

            if (user) {
                set({
                    user,
                    // FORCE the picture to match the unique user in the DB
                    // Do NOT use: user.profilePicture || get().profilePicture
                    profilePicture: user.profilePicture || ""
                });
            }
        } catch (err) {
            set({ profilePicture: null }); // Wipe on error
        }
    },
    logout: () => {
        // 1. Clear everything from the store
        set({
            user: null,
            token: null,
            profilePicture: null // This prevents the "leak"
        });
        // 2. Optional: Completely wipe the persisted storage
        localStorage.removeItem('auth-storage');
        console.log("Archive Purged");
    }
}), {
    name: 'authState',
    storage: createJSONStorage(() => localStorage)
}))

export default useUserStore