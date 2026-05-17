import axios from 'axios'
import useUserStore from '@/stores/userStore'

export const mainApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:8875",
})

mainApi.interceptors.request.use(config => {
    // 1. Try to get the token directly from the Zustand store (Fastest)
    let token = useUserStore.getState().token;

    // 2. Fallback to localStorage if the store hasn't hydrated yet
    if (!token) {
        const authData = localStorage.getItem('authState');
        if (authData) {
            try {
                const parsed = JSON.parse(authData);
                token = parsed.state?.token;
            } catch (e) {
                console.error("Error parsing authState", e);
            }
        }
    }

    // 3. Attach the header only if a valid token string exists
    if (token && token !== null && token !== "undefined") {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
}, error => {
    return Promise.reject(error);
});

export const apiRegister = async (body) => {
    return await mainApi.post('/auth/register', body)
}

export const apiRecipeDelete = async (id) => {
    return await mainApi.delete(`/recipes/${id}`)
}

export const apiEditRecipe = async (id, body) => {
    return await mainApi.put(`/recipes/${id}`, body)
}

export const apiUpdateProfile = async (body) => {
    return await mainApi.patch('/user/edit', body)
}