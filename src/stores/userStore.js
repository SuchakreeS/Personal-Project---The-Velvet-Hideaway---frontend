import {create} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'
import { mainApi } from '@/api/mainApi'

const useUserStore = create( persist((set,get)=>({
    user: null,
    token: "",
    login: async(body) => {
        const rs = await mainApi.post('/auth/login', body)
        set({token: rs.data.token, user: rs.data.user})
        return rs
    },
    logout: () => set({token:'', user: null})
}), {
    name: 'authState',
    storage: createJSONStorage( ()=> localStorage)
}))

export default useUserStore