
function FullRecipeModal({
    recipe, id = 'fullRecipeModal'
}) {
    if (!recipe)
        return null

    return (
        <dialog id={id} className="modal backdrop-blur-2xl">
            <div className="modal-box bg-[#0a0a0a] border border-white/10 rounded-none max-w-4xl p-0 overflow-hidden shadow-2xl">
                <div className="flex flex-col md:flex-row h-full">
                    <div className="md:w-1/2 h-[400px] md:h-auto border-r border-white/5 bg-[#121212]">
                        <img
                            src={recipe.image || 'https://via.placeholder.com/600x800?text=No+Image'}
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                            alt={recipe.name}
                        />
                    </div>
                    <div className="md:w-1/2 p-10 flex flex-col">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <span className="text-accent font-syne text-[10px] tracking-[0.3em] uppercase underline decoration-accent/30 underline-offset-8">
                                    {recipe.basespirit?.name || "CRAFT COCKTAIL"}
                                </span>
                                <h2 className="text-5xl font-fraunces italic text-white mt-4">{recipe.name}</h2>
                            </div>
                            <form method="dialog">
                                <button className="text-white/20 hover:text-white transition-colors uppercase text-[10px] font-syne tracking-widest">
                                    Close [x]
                                </button>
                            </form>
                        </div>

                        <div className="space-y-8 overflow-y-auto pr-4 max-h-[60vh] custom-scrollbar">
                            <section>
                                <h4 className="text-white/30 font-syne text-[9px] tracking-widest uppercase mb-3">The Composition</h4>
                                <div className="text-neutral font-syne text-sm leading-relaxed whitespace-pre-wrap border-l border-accent/20 pl-4">
                                    {recipe.ingredients}
                                </div>
                            </section>
                            <section>
                                <h4 className="text-white/30 font-syne text-[9px] tracking-widest uppercase mb-3">The Method</h4>
                                <div className="text-neutral font-syne text-sm leading-relaxed whitespace-pre-wrap">
                                    {recipe.instructions}
                                </div>
                            </section>
                        </div>
                        <div className="mt-auto pt-8 border-t border-white/5">
                            <p className="text-[9px] font-syne text-white/10 uppercase tracking-[0.2em]">
                                Velvet Hideaway Archive — Recipe #{recipe.id}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}

export default FullRecipeModal