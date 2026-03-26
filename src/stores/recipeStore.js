import { mainApi } from "@/api/mainApi";
import { toast } from "react-toastify";

import { create } from "zustand";

const useRecipeStore = create((set, get) => ({
    recipes: [],
    categories: [],
    baseSpirits: [],
    loading: false,

    // Get category
    getCategories: async () => {
        try {
            set({ loading: true });
            const res = await mainApi.get('/categories');
            // This now matches the state name above
            set({ categories: res.data.category });
        } catch (err) {
            toast.error("Failed to load categories");
        } finally {
            set({ loading: false });
        }
    },

    // Get Base-Spirit
    getBaseSpirits: async () => {
        try {
            const res = await mainApi.get('/spirits');
            set({ baseSpirits: res.data }); 
        } catch (err) {
            console.error("Failed to fetch spirits", err);
        }
    },

    // Get recipe
    getRecipes: async () => {
        try {
            set({ loading: true })
            const res = await mainApi.get('/recipes/user-recipes')
            set({ recipes: res.data })
        } catch (err) {
            toast.err(err)
        } finally {
            set({ loading: false })
        }
    },

    //Create recipe
    createRecipe: async (formData) => {
        try {
            set({ loading: true })
            const res = await mainApi.post('/recipes', formData)
            const newRecipe = res.data.result
            set((state) => {
                recipes = [newRecipe, ...state.recipes]
            })
            toast.success('Recipe Added')
        } catch (err) {
            toast.error(err)
        } finally {
            set({ loading: false })
        }
    },

    // Delete recipe
    deleteRecipe: async (id) => {
        try {
            await mainApi.delete(`/recipes/${id}`)
        } catch (err) {
            toast.error(err)
        }
    }
}
))

export default useRecipeStore