import axios from 'axios'
import useUserStore from '@/stores/userStore'

export const mainApi = axios.create({
    baseURL: "http://localhost:8875",
    headers: {
        "Content-Type": 'application/json'
    }
})

mainApi.interceptors.request.use(config => {
    const token = useUserStore.getState().token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export const apiRegister = async (body) => {
    return await mainApi.post('/auth/register', body)
}

export const apiRecipeDelete = async(id) => {
    return await mainApi.delete(`/recipes/${id}`)
}

export const apiEditRecipe = async(id, body) => {
    return await mainApi.put(`/recipes/${id}`)
}

export const apiUpdateProfile = async (body) => {
    return await mainApi.patch('/user/edit', body)
}