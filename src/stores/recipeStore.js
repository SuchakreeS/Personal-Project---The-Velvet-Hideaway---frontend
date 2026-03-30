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
    // getRecipes: async () => {
    //     try {
    //         set({ loading: true })
    //         const res = await mainApi.get('/recipes')
    //         set({ recipes: res.data })
    //     } catch (err) {
    //         toast.error(err)
    //     } finally {
    //         set({ loading: false })
    //     }
    // },
    getRecipes: async () => {
    set({ loading: true });
    try {
        const rs = await mainApi.get('/recipes'); // Or your correct endpoint
        // CRITICAL: Check if your backend returns { recipes: [] } or just []
        const data = rs.data.recipes || rs.data; 
        set({ recipes: data, loading: false });
    } catch (err) {
        set({ loading: false });
        console.error("Fetch error:", err);
    }
},


    createRecipe: async (formData) => {
        try {
            set({ loading: true });
            const res = await mainApi.post('/recipes', formData);
            const newRecipe = res.data.result;
            set((state) => ({
                recipes: [newRecipe, ...state.recipes]
            }));
            ;
            return true;
        } catch (err) {
            toast.error(err.response?.data?.message || "Failed to add recipe");
            return false;
        } finally {
            set({ loading: false });
        }
    },

    // Delete recipe
    deleteRecipe: async (id) => {
        try {
            await mainApi.delete(`/recipes/${id}`)
            set( (state) => ({
                recipes: state.recipes.filter((recipe) => recipe.id !== id)
            })
            )
            return true
        } catch (err) {
            console.log(err)
            return false
        }
    },

    // Edit recipe
    editRecipe: async (id, formData) => {
        try {
            const res = await mainApi.put(`/recipes/${id}`, formData);
            const updatedRecipe = res.data.result;

            set((state) => ({
                recipes: state.recipes.map((recipe) => {
                    if (recipe.id === id) {
                        return { ...recipe, ...updatedRecipe };
                    }
                    return recipe;
                })
            }));
            return true;
        } catch (err) {
            console.error("Store Error:", err);
            return false;
        } finally {
            set({ loading: false });
        }
    }
}
))

export default useRecipeStore