import React from 'react';

function RecipeFormModal({ 
    id = "createRecipe", 
    editId, 
    newRecipe, 
    hdlChange, 
    hdlSubmit, 
    hdlFileChange,
    baseSpirits, 
    categories 
}) {
    return (
        <dialog id={id} className="modal backdrop-blur-xl">
            <div className="modal-box bg-[#121212] border border-white/10 rounded-none max-w-2xl p-0 overflow-hidden">
                {/* Decorative Accent Bar */}
                <div className="h-2 w-full bg-accent"></div>

                <div className="p-10">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="font-fraunces italic text-4xl text-accent">
                            {editId ? "Refine the Craft" : "Mix a New Craft"}
                        </h3>
                        <form method="dialog">
                            <button className="text-white/20 hover:text-white transition-colors uppercase text-[10px] tracking-widest font-syne">
                                Close [x]
                            </button>
                        </form>
                    </div>

                    <form className="flex flex-col gap-6" onSubmit={hdlSubmit}>
                        <div className="flex flex-wrap gap-4">
                            <div className="form-control flex-1 min-w-[260px]">
                                <label className="label py-1">
                                    <span className="label-text text-[9px] text-white/30 font-syne tracking-widest uppercase">Drink Name</span>
                                </label>
                                <input 
                                    type="text" 
                                    className="input input-bordered bg-white/5 border-white/10 rounded-none text-white focus:border-accent font-syne text-xs h-12" 
                                    name="name" 
                                    onChange={hdlChange} 
                                    value={newRecipe.name} 
                                    required
                                />
                            </div>
                            <div className="form-control flex-1 min-w-[260px]">
                                <label className="label py-1">
                                    <span className="label-text text-[9px] text-white/30 font-syne tracking-widest uppercase">Image URL</span>
                                </label>
                                <input 
                                    type="file" 
                                    accept='image/*'
                                    className="input input-bordered bg-white/5 border-white/10 rounded-none text-white focus:border-accent font-syne text-xs h-12" 
                                    name="image" 
                                    onChange={hdlFileChange} 
                                />
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <div className="form-control flex-1 min-w-[200px]">
                                <label className="label py-1">
                                    <span className="label-text text-[9px] text-white/30 font-syne tracking-widest uppercase">Base Spirit</span>
                                </label>
                                <select 
                                    className="select select-bordered bg-[#1a1a1a] border-white/10 rounded-none text-white focus:border-accent text-xs h-12" 
                                    name="baseSpiritId" 
                                    value={newRecipe.baseSpiritId || ""} 
                                    onChange={hdlChange}
                                    required
                                >
                                    <option value="" disabled>Select Spirit</option>
                                    {baseSpirits?.map(base => (
                                        <option key={base.id} value={base.id}>{base.name.toUpperCase()}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-control flex-1 min-w-[200px]">
                                <label className="label py-1">
                                    <span className="label-text text-[9px] text-white/30 font-syne tracking-widest uppercase">Category</span>
                                </label>
                                <select 
                                    className="select select-bordered bg-[#1a1a1a] border-white/10 rounded-none text-white focus:border-accent text-xs h-12" 
                                    name="categoryId" 
                                    value={newRecipe.categoryId || ""} 
                                    onChange={hdlChange}
                                    required
                                >
                                    <option value="" disabled>Select Category</option>
                                    {categories?.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.name.toUpperCase()}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-control w-full">
                            <label className="label py-1">
                                <span className="label-text text-[9px] text-white/30 font-syne tracking-widest uppercase">Ingredients</span>
                            </label>
                            <textarea 
                                className="textarea textarea-bordered bg-white/5 border-white/10 rounded-none text-white focus:border-accent font-syne text-xs h-28 resize-none" 
                                name="ingredients" 
                                onChange={hdlChange} 
                                value={newRecipe.ingredients} 
                                placeholder="e.g. 2oz Gin, 1oz Vermouth..."
                            />
                        </div>

                        <div className="form-control w-full">
                            <label className="label py-1">
                                <span className="label-text text-[9px] text-white/30 font-syne tracking-widest uppercase">Instructions</span>
                            </label>
                            <textarea 
                                className="textarea textarea-bordered bg-white/5 border-white/10 rounded-none text-white focus:border-accent font-syne text-xs h-28 resize-none" 
                                name="instructions" 
                                onChange={hdlChange} 
                                value={newRecipe.instructions} 
                                placeholder="Stir with ice, strain into chilled glass..."
                            />
                        </div>

                        <button 
                            className="btn btn-block bg-white text-black hover:bg-accent border-none rounded-none font-syne font-black tracking-[0.3em] h-16 mt-4 transition-all duration-300" 
                            type="submit"
                        >
                            {editId ? "SAVE CHANGES" : "CONFIRM CRAFT"}
                        </button>
                    </form>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
}

export default RecipeFormModal;