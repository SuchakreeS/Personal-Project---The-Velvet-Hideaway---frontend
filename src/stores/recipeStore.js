import { mainApi } from "@/api/mainApi";
import { toast } from "react-toastify";

import { create } from "zustand";

const useRecipeStore = create((set, get) => ({
    recipes: [],
    categories: [],
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

    // Get recipe
    getRecipes: async () => {
        try{
            set({loading: true})
            const res = await mainApi.get('/recipes/user-recipes')
            set({recipes: res.data})
        } catch(err) {
            toast.err(err)
        } finally {
            set({loading: false})
        }
    },

    // Delete recipe
    deleteRecipe: async(id) => {
        try {
            await mainApi.delete(`/recipes/${id}`)
        } catch(err) {
            toast.error(err)
        }
    }
}
))

export default useRecipeStore