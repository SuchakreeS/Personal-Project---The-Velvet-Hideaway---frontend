import { create } from "zustand";

const useCategoryStore = create((set) => ({
    categories: [],
    loading: false,

     // Get categories
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
}))

export default useCategoryStore