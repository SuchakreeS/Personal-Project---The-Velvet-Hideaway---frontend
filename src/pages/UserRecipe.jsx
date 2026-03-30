import useRecipeStore from "@/stores/recipeStore"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import FullRecipeModal from "@/components/FullRecipeModal"
import RecipeFormModal from "@/components/RecipeFormModal"

function UserRecipe() {
    const { recipes, loading, baseSpirits, getBaseSpirits, getRecipes, createRecipe, categories, getCategories, deleteRecipe, editRecipe } = useRecipeStore()
    // เลือกตาม BaseSpirits
    const [selectedBase, setSelectedBase] = useState("ALL")

    const [editId, setEditId] = useState(null)

    const [viewRecipe, setViewRecipe] = useState(null)


    // Add new Recipe
    const [newRecipe, setNewRecipe] = useState({
        name: '',
        ingredients: '',
        instructions: '',
        image: '',
        categoryId: '',
        baseSpiritId: ''
    })

    const hdlChange = (e) => {
        const { name, value } = e.target;

        setNewRecipe((prev) => ({
            ...prev,
            [name]: (name === 'categoryId' || name === 'baseSpiritId')
                ? (value === "" ? "" : Number(value))
                : value,
        }));
    };

    const hdlSubmit = async (evt) => {
        evt.preventDefault();

        try {
            let res;
            if (editId) {
                res = await editRecipe(editId, newRecipe);
                toast.success("Craft Updated Successfully");
                document.getElementById('createRecipe').close();
                await getRecipes()
                resetForm();
            } else {
                res = await createRecipe(newRecipe);
                toast.success("New Craft Added");
            }
            if (res) {
                await getRecipes();
                document.getElementById('createRecipe').close();
                resetForm();
            }

        } catch (error) {
            console.error(error);
            toast.error("Failed to save recipe");
        }
    };

    const hdlEdit = (recipe) => {
        setEditId(recipe.id);
        setNewRecipe({
            name: recipe.name || '',
            ingredients: recipe.ingredients || '',
            instructions: recipe.instructions || '',
            image: recipe?.image || '',
            categoryId: recipe.categoryId ? Number(recipe.categoryId) : '',
            baseSpiritId: recipe.baseSpiritId ? Number(recipe.baseSpiritId) : ''
        });
        document.getElementById('createRecipe').showModal();
    };

    const resetForm = () => {
        setEditId(null)
        setNewRecipe({
            name: '',
            ingredients: '',
            instructions: '',
            image: '',
            categoryId: '',
            baseSpiritId: ''
        })
    }

    const hdlDelete = async (id) => {
        const confirmDelete = window.confirm("Confirm to delete this recipe?")
        if (confirmDelete) {
            const deleted = await deleteRecipe(id)
            if (deleted) {
                await getRecipes()
                toast.success("Recipe Deleted")
            }
        }
    }

    const hdlView = (recipe) => {
        setViewRecipe(recipe)
        document.getElementById('FullRecipeModal').showModal()
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
                        onClick={() => { resetForm(); document.getElementById('createRecipe').showModal() }}>
                        + NEW CRAFT
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                    {filteredRecipes && filteredRecipes.map((recipe) => (
                        <div key={recipe.id} className="relative group overflow-hidden border border-white/5 bg-[#1a1a1a] transition-all duration-500 hover:border-accent/30"
                            onClick={() => hdlView(recipe)}>

                            <button
                                onClick={(evt) => { evt.stopPropagation(); hdlEdit(recipe) }}
                                className="absolute top-4 right-14 z-20 opacity-0 group-hover:opacity-100  bg-black/60 hover:bg-accent  text-white/70 hover:text-white w-8 h-8 flex items-center justify-center backdrop-blur-md border border-white/10 transition-all duration-300"
                            >
                                ✎
                            </button>
                            <button
                                onClick={(evt) => { evt.stopPropagation(); hdlDelete(recipe.id) }}
                                className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 bg-black/60 hover:bg-red-900/80  text-white/70 hover:text-white w-8 h-8 flex items-center justify-center backdrop-blur-md border border-white/10 transition-all duration-300">
                                ✕
                            </button>

                            {/* Recipe Image */}
                            <div className="aspect-[3/4] overflow-hidden">
                                <img
                                    src={recipe.image || 'https://via.placeholder.com/400x500?text=No+Image'}
                                    alt={recipe.name}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                                />
                            </div>

                            {/* Recipe Info */}
                            <div className="p-6">
                                <h3 className="text-xl text-accent font-fraunces italic">
                                    {recipe.name}
                                </h3>
                                <p className="text-sm text-neutral font-syne tracking-widest uppercase mt-1">
                                    {recipe.basespirit?.name || "Uncategorized"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <FullRecipeModal recipe={viewRecipe} id='FullRecipeModal' />
            <RecipeFormModal
                editId={editId}
                newRecipe={newRecipe}
                hdlChange={hdlChange}
                hdlSubmit={hdlSubmit}
                baseSpirits={baseSpirits}
                categories={categories}
                id="createRecipe"
            />


        </>
    )
}

export default UserRecipe