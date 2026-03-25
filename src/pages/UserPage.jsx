import useRecipeStore from "@/stores/recipeStore"
import { useEffect, useState } from "react"

function UserPage() {
    const { recipes, categories, loading, getCategories, getRecipes } = useRecipeStore()
    const [selectedCat, setSelectedCat] = useState("ALL")

    useEffect(() => {
        getCategories()
        getRecipes()
    }, []);
    const filteredRecipes = selectedCat === "ALL" ? recipes : recipes.filter(recipes => recipes.category?.name === selectedCat)

    if (loading && recipes.length === 0)
        return <div>Loading...</div>

    return (
        <>
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-10 border-b border-white/5 pb-10">
                    <div className="flex gap-8 font-syne text-[10px] tracking-widest">
                        <button
                            className={`text-xl font-fraunces font-semibold ${selectedCat === "ALL" ? "text-accent" : "text-neutral"}`}
                            onClick={() => setSelectedCat("ALL")}
                        >
                            ALL
                        </button>

                        {/* 2. Safety-Guarded Map */}
                        {categories && categories.map((cat) => (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCat(cat.name)}
                                className={`text-xl font-fraunces font-semibold ${selectedCat === cat.name ? "text-accent" : "text-neutral"}`}
                            >
                                {cat.name.toUpperCase()}
                            </button>
                        ))}

                    </div>
                    <button className="bg-white text-black font-syne text-[10px] font-black tracking-[0.3em] px-10 py-4 hover:bg-accent transition-colors duration-300 whitespace-nowrap">
                        + NEW CRAFT
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    <div className="group relative flex flex-col bg-secondary/40 backdrop-blur-md border border-white/5 hover:border-accent/40 transition-all duration-500 rounded-sm">
                        <div className="relative h-64 w-full overflow-hidden">
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-500 z-10"></div>
                            <img
                                src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=800"
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                            />
                            <div className="absolute top-4 left-4 z-20">
                                <span className="bg-accent text-black text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                                    Gin Base
                                </span>
                            </div>
                        </div>
                        <div className="p-8 flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-4xl font-fraunces font-black text-white italic leading-none">
                                    The Velvet Sinner
                                </h3>
                            </div>

                            <p className="text-neutral/40 font-syne text-[10px] uppercase tracking-[0.2em] mb-6">
                                Category: Modern Classic
                            </p>

                            <p className="text-white/60 font-syne text-sm line-clamp-2 mb-8 leading-relaxed">
                                A smooth blend of botanical gin, elderflower liqueur, and a hint of fresh muddled cucumber.
                            </p>
                            <div className="mt-auto pt-6 border-t border-white/5 flex justify-between items-center">
                                <button className="text-white/40 hover:text-accent font-syne text-[10px] uppercase tracking-widest transition-colors font-bold">
                                    Edit Recipe
                                </button>
                                <button className="text-white/20 hover:text-error font-syne text-[10px] uppercase tracking-widest transition-colors">
                                    Pour Out
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserPage