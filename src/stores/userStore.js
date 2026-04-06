import {create} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'
import { mainApi } from '@/api/mainApi'

const useUserStore = create( persist((set,get)=>({
    user: null,
    token: "",
    login: async (body) => {
    const rs = await mainApi.post('/auth/login', body)
    const { token, user } = rs.data
    
    if (token && user) {
        set({ token: token, user: user })
    }
    console.log(token)
    console.log(user)
    return rs
},
    getMe: async () => {
        const token = get().token
        if(!token){
            return
        }
        const rs = await mainApi.get('/user')
        set({user: rs.data.user})
    },
    logout: () => set({token:'', user: null}),
    editProfile: async (payload) => {
        const res = await mainApi.patch('/user/edit', payload)
        set({user: res.data.updated})
        return(res.data)
    }
}), {
    name: 'authState',
    storage: createJSONStorage( ()=> localStorage)
}))

export default useUserStore