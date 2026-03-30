import useRecipeStore from "@/stores/recipeStore"
import { useEffect, useState } from "react"
import FullRecipeModal from "@/components/FullRecipeModal"

function Explore() {
    const { recipes, loading, baseSpirits, getBaseSpirits, getRecipes, getCategories } = useRecipeStore()
    const [selectedBase, setSelectedBase] = useState("ALL")
    const [viewRecipe, setViewRecipe] = useState(null)

    const hdlView = (recipe) => {
        setViewRecipe(recipe)
        document.getElementById('FullRecipeModal').showModal()
    }

    useEffect(() => {
        getBaseSpirits()
        getRecipes()
        getCategories()
    }, []);

    // Fixed filter logic
    const filteredRecipes = selectedBase === "ALL"
        ? recipes
        : recipes.filter(recipe => recipe.basespirit?.name === selectedBase)

    if (loading && recipes.length === 0) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <p className="font-syne text-[10px] tracking-[0.5em] text-accent animate-pulse">LOADING ARCHIVE...</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[url(./assets/Bar-bg.png)] bg-cover text-neutral">
            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-10 border-b border-white/5 pb-10">
                    <div className="flex gap-8 font-syne text-[10px] tracking-widest">
                        <button
                            className={`text-xl font-fraunces font-semibold transition-colors ${selectedBase === "ALL" ? "text-accent" : "text-white/20 hover:text-white"}`}
                            onClick={() => setSelectedBase("ALL")}
                        >
                            ALL
                        </button>
                        {baseSpirits && baseSpirits.map((base) => (
                            <button
                                key={base.id}
                                onClick={() => setSelectedBase(base.name)}
                                className={`text-xl font-fraunces font-semibold transition-colors ${selectedBase === base.name ? "text-accent" : "text-white/20 hover:text-white"}`}
                            >
                                {base.name.toUpperCase()}
                            </button>
                        ))}
                    </div>
                    <h1 className="font-fraunces italic text-white/20 text-2xl uppercase tracking-tighter">Public Gallery</h1>
                </div>

                {/* Grid Section - FIXED & RESTORED */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {filteredRecipes && filteredRecipes.length > 0 ? (
                        filteredRecipes.map((recipe) => (
                            <div
                                key={recipe.id}
                                className="relative group overflow-hidden border border-white/5 bg-[#1a1a1a] transition-all duration-500 hover:border-accent/30 cursor-pointer"
                                onClick={() => hdlView(recipe)}
                            >
                                <div className="aspect-[3/4] overflow-hidden">
                                    <img
                                        src={recipe.image || 'https://via.placeholder.com/400x500?text=No+Image'}
                                        alt={recipe.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                    />
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl text-accent font-fraunces italic">{recipe.name}</h3>
                                    <p className="text-sm text-neutral font-fraunces tracking-widest uppercase mt-1">
                                        {recipe.basespirit?.name || "Uncategorized"}
                                    </p>
                                    <p className="text-xs text-neutral tracking-widest uppercase mt-1">
                                        {recipe.user?.username || "Uncategorized"}
                                    </p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full py-40 text-center">
                            <p className="font-syne text-[10px] uppercase tracking-[0.5em] text-white/10">
                                No recipes found in this category
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <FullRecipeModal recipe={viewRecipe} id='FullRecipeModal' />
        </div>
    )
}

export default Explore