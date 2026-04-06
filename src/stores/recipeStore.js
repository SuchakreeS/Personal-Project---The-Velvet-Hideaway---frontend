import { mainApi } from "@/api/mainApi";
import { toast } from "react-toastify";

import { create } from "zustand";
import useUserStore from "./userStore";

const useRecipeStore = create((set, get) => ({
    recipes: [],
    userRecipes:[],
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

    // Create Category
    createCategory: async (formData) => {
        try {
            const res = await mainApi.post('/categories', formData);
            const newCat = res.data;

            set((state) => ({
                categories: [...state.categories, newCat]
            }));

            toast.success("Category Added");
            return true;
        } catch (err) {
            console.log(err);
            toast.error("Failed to add category");
            return false;
        }
    },

    // Edit Category
    editCategory: async (id, formData) => {
        try {
            const res = await mainApi.put(`/categories/${id}`, formData);
            const updatedCat = res.data.result || res.data;

            set((state) => ({
                categories: state.categories.map(cat =>
                    cat.id === id ? updatedCat : cat
                )
            }));

            toast.success("Category Updated");
            return true;
        } catch (err) {
            console.log(err, "Edit category error");
            return false;
        }
    },

    // Delete Category
    deleteCategory: async (id) => {
        try {
            await mainApi.delete(`/categories/${id}`);
            set((state) => ({
                categories: state.categories.filter(cat => cat.id !== id)
            }));
            toast.success("Category Removed");
        } catch (err) {
            console.log(err, "Delete category error");
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

    // Add Base-Spirit
    createBaseSpirit: async (formData) => {
        try {
            const res = await mainApi.post('/spirits', formData)
            set((state) => ({
                baseSpirits: [...state.baseSpirits, res.data]
            }))
            toast.success("New Spirit Added")
            return true
        } catch (err) {
            console.log(err)
        }
    },

    // Edit Base-spirit
    editBaseSpirit: async (id, formData) => {
        try {
            const res = await mainApi.put(`/spirits/${id}`, formData)
            const updatedSpirit = res.data.result

            set((state) => ({
                baseSpirits: state.baseSpirits.map(spirit => spirit.id === id ? res.data : spirit)
            }))
            toast.success("Spirits Updated")
            return true
        } catch (err) {
            console.log(err, "Edit base spirits")
            return false
        }
    },

    // Delete Base-spirit
    deleteBaseSpirit: async (id) => {
        try {
            await mainApi.delete(`/spirits/${id}`)
            set((state) => ({
                baseSpirits: state.baseSpirits.filter(spirit => spirit.id !== id)
            }))
            toast.success("Base Spirit Deleted")
        } catch (err) {
            console.log(err, "delete BaseSpirit")
        }
    },

    getRecipes: async () => {
        try {
            set({ loading: true });
            const res = await mainApi.get('/recipes');
            set({ recipes: res.data, loading: false });
        } catch (err) {
            console.log(err, getRecipes);
            set({ loading: false });
        }
    },

    getUserRecipes: async () => {
        const token = useUserStore.getState().token

        if (!token) {
            console.log("No token found (fn. getRecipes)")
            return
        }
        set({ loading: true })
        try {
            const res = await mainApi.get('/recipes/user-recipes', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            set({ userRecipes: res.data, loading: false })
        } catch (err) {
            console.log(err, "Getrecipes")
            set({ loading: false, userRecipes: [] })
        }
    },


    createRecipe: async (formData) => {
        try {
            set({ loading: true });
            const res = await mainApi.post('/recipes', formData);
            const newRecipe = res.data.result;

            set((state) => ({
                // Update both lists so the UI reflects changes everywhere
                recipes: [newRecipe, ...state.recipes],
                userRecipes: [newRecipe, ...state.userRecipes]
            }));
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
            const token = localStorage.getItem('token')
            await mainApi.delete(`/recipes/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            set((state) => ({
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
        // Match the key "recipe" returned by your controller
        const updatedRecipe = res.data.recipe; 

        set((state) => ({
            userRecipes: state.userRecipes.map((r) => r.id === id ? updatedRecipe : r),
            recipes: state.recipes.map((r) => r.id === id ? updatedRecipe : r)
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