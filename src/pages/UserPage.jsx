import useRecipeStore from "@/stores/recipeStore"
import { useEffect, useState } from "react"

function UserPage() {
    const { recipes, loading, baseSpirits, getBaseSpirits, getRecipes, createRecipe, categories, getCategories } = useRecipeStore()
    // เลือกตาม BaseSpirits
    const [selectedBase, setSelectedBase] = useState("ALL")


    // Add new Recipe
    const [newRecipe, setNewRecipe] = useState({
        name: '',
        ingerdients: '',
        instructions: '',
        image: '',
        categoryId: '',
        baseSpiritId: ''
    })

    // Modal set
    // const [isModalOpen, setIsModalOpen] = useState(false)

    // New recipe Handle submit
    const hdlSubmit = async (evt) => {
        evt.preventDefault()
        const createSuccess = await useRecipeStore.getState().createRecipe(newRecipe)
        if (createSuccess) {
            setIsModalOpen(false)
            setNewRecipe({ name: '', ingerdients: '', instructions: '', image: '', categoryId: '', baseSpiritId: '' })
        }
    }



    useEffect(() => {
        getBaseSpirits()
        getRecipes()
        getCategories()
    }, []);
    const filteredRecipes = selectedBase === "ALL" ? recipes : recipes.filter(recipes => recipes.basespirit?.name === selectedBase)

    if (loading && recipes.length === 0)
        return <div>Loading...</div>

    return (
        <>
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row justify-between items-center mb-20 gap-10 border-b border-white/5 pb-10">
                    <div className="flex gap-8 font-syne text-[10px] tracking-widest">
                        <button
                            className={`text-xl font-fraunces font-semibold ${selectedBase === "ALL" ? "text-accent" : "text-neutral"}`}
                            onClick={() => setSelectedBase("ALL")}
                        >
                            ALL
                        </button>
                        {baseSpirits && baseSpirits.map((base) => (
                            <button
                                key={base.id}
                                onClick={() => setSelectedBase(base.name)}
                                className={`text-xl font-fraunces font-semibold ${selectedBase === base.name ? "text-accent" : "text-neutral"}`}
                            >
                                {base.name.toUpperCase()}
                            </button>
                        ))}

                    </div>
                    <button className="bg-white text-black font-syne text-[10px] font-black tracking-[0.3em] px-10 py-4 hover:bg-accent transition-colors duration-300 whitespace-nowrap btn"
                        onClick={() => document.getElementById('createRecipe').showModal()}>
                        + NEW CRAFT
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {filteredRecipes && filteredRecipes.map((recipe) =>
                        <div>
                            <div>
                                <img src={recipe.image} alt="" />
                            </div>
                            <h3 className="text-xl text-accent font-fraunces">
                                {recipe.name}
                            </h3>
                            <p className="text-lg text-neutral">
                                {recipe.basespirit?.name || "uncategorized"}
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Create RecipeModal */}
            <dialog id="createRecipe" className="modal backdrop-blur-xl">
                <div className="modal-box bg-[#121212] border border-white/10 rounded-none max-w-2xl p-0 overflow-hidden">
                    <div className="h-2 w-full bg-accent"></div>

                    <div className="p-10">
                        <div className="flex justify-between items-center mb-10">
                            <h3 className="font-fraunces italic text-4xl text-accent">Mix a New Craft</h3>
                            <form method="dialog">
                                <button className="text-white/20 hover:text-white transition-colors uppercase text-[10px] tracking-widest font-syne">
                                    Close [x]
                                </button>
                            </form>
                        </div>

                        <form className="flex flex-col gap-6">
                            <div className="flex flex-wrap gap-4">
                                <div className="form-control flex-1 min-w-[260px]">
                                    <label className="label py-1"><span className="label-text text-[9px] text-white/30 font-syne tracking-widest uppercase">Drink Name</span></label>
                                    <input type="text" className="input input-bordered bg-white/5 border-white/10 rounded-none text-white focus:border-accent font-syne text-xs h-12" />
                                </div>
                                <div className="form-control flex-1 min-w-[260px]">
                                    <label className="label py-1"><span className="label-text text-[9px] text-white/30 font-syne tracking-widest uppercase">Image URL</span></label>
                                    <input type="file" className="file-input file-input-ghost input-bordered bg-white/5 border-white/10 rounded-none text-white focus:border-accent font-syne text-xs h-12" />
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <div className="form-control flex-1 min-w-[200px]">
                                    <label className="label py-1"><span className="label-text text-[9px] text-white/30 font-syne tracking-widest uppercase">Base Spirit</span></label>
                                    <select className="select select-bordered bg-[#1a1a1a] border-white/10 rounded-none text-white focus:border-accent text-xs h-12">
                                        <option disabled selected>Select Spirit</option>
                                        {baseSpirits.map(base=> (
                                            <option>{base.name.toUpperCase()}</option>
                                        )) }
                                    </select>
                                </div>
                                <div className="form-control flex-1 min-w-[200px]">
                                    <label className="label py-1"><span className="label-text text-[9px] text-white/30 font-syne tracking-widest uppercase">Category</span></label>
                                    <select className="select select-bordered bg-[#1a1a1a] border-white/10 rounded-none text-white focus:border-accent text-xs h-12">
                                        <option disabled selected>Select Category</option>
                                        {categories.map(base=> (
                                            <option>{base.name.toUpperCase()}</option>
                                        )) }
                                    </select>
                                </div>
                            </div>
                            <div className="form-control w-full">
                                <label className="label py-1"><span className="label-text text-[9px] text-white/30 font-syne tracking-widest uppercase">Ingredients</span></label>
                                <textarea className="textarea textarea-bordered bg-white/5 border-white/10 rounded-none text-white focus:border-accent font-syne text-xs h-28 resize-none" />
                            </div>
                            <div className="form-control w-full">
                                <label className="label py-1"><span className="label-text text-[9px] text-white/30 font-syne tracking-widest uppercase">Istructions</span></label>
                                <textarea className="textarea textarea-bordered bg-white/5 border-white/10 rounded-none text-white focus:border-accent font-syne text-xs h-28 resize-none" />
                            </div>

                            <button className="btn btn-block bg-white text-black hover:bg-accent border-none rounded-none font-syne font-black tracking-[0.3em] h-16 mt-4">
                                CONFIRM CRAFT
                            </button>
                        </form>
                    </div>
                </div>
            </dialog>

        </>
    )
}

export default UserPage