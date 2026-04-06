import { useEffect, useState } from "react";
import useRecipeStore from "@/stores/recipeStore";
import { toast } from "react-toastify";

export default function CategoryAdmin() {
    const { categories, getCategories, createCategory, editCategory, deleteCategory } = useRecipeStore();
    
    const [createInput, setCreateInput] = useState({ name: "", details: "" });
    const [editId, setEditId] = useState(null);
    const [editInput, setEditInput] = useState({ name: "", details: "" });

    useEffect(() => { getCategories(); }, []);

    const hdlAdd = async (e) => {
        e.preventDefault();
        if (!createInput.name.trim()) return toast.error("Name is required");
        
        const success = await createCategory(createInput);
        if (success) setCreateInput({ name: "", details: "" }); // Reset form
    };

    const hdlUpdate = async (id) => {
        if (!editInput.name.trim()) return toast.error("Name is required");
        
        const success = await editCategory(id, editInput);
        if (success) setEditId(null);
    };

    return (
        <div className="p-8 min-h-screen bg-secondary text-neutral font-fraunces">
            <h1 className="text-4xl italic font-black text-accent mb-10 uppercase">Archive Management</h1>

            {/* --- ADD FORM --- */}
            <form onSubmit={hdlAdd} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12 p-6 bg-black/20 border border-white/5 rounded">
                <input 
                    className="bg-black/40 border border-neutral/10 p-3 rounded outline-none focus:border-accent"
                    placeholder="Category Name (e.g. Gin)"
                    value={createInput.name}
                    onChange={(e) => setCreateInput({...createInput, name: e.target.value})}
                />
                <input 
                    className="bg-black/40 border border-neutral/10 p-3 rounded outline-none focus:border-accent"
                    placeholder="Details (e.g. Juniper-forward spirits)"
                    value={createInput.details}
                    onChange={(e) => setCreateInput({...createInput, details: e.target.value})}
                />
                <button className="bg-accent text-secondary font-bold uppercase tracking-widest hover:brightness-110" type="submit">
                    Add Category
                </button>
            </form>

            {/* --- DATA TABLE --- */}
            <table className="w-full text-left border-collapse">
                <thead className="border-b border-neutral/20 text-accent/80 text-xs uppercase">
                    <tr>
                        <th className="pb-4 w-1/4">Name</th>
                        <th className="pb-4 w-1/2">Details</th>
                        <th className="pb-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((item) => (
                        <tr key={item.id} className="border-b border-neutral/5 hover:bg-white/5">
                            {editId === item.id ? (
                                // --- EDITING ROW ---
                                <>
                                    <td className="py-4 pr-2">
                                        <input 
                                            className="bg-black/60 border border-accent/40 p-2 w-full outline-none text-sm"
                                            value={editInput.name}
                                            onChange={(e) => setEditInput({...editInput, name: e.target.value})}
                                        />
                                    </td>
                                    <td className="py-4 pr-2">
                                        <input 
                                            className="bg-black/60 border border-accent/40 p-2 w-full outline-none text-sm"
                                            value={editInput.details}
                                            onChange={(e) => setEditInput({...editInput, details: e.target.value})}
                                        />
                                    </td>
                                    <td className="py-4 text-right space-x-3">
                                        <button onClick={() => hdlUpdate(item.id)} className="text-green-500 font-bold text-xs">SAVE</button>
                                        <button onClick={() => setEditId(null)} className="text-neutral/40 font-bold text-xs">CANCEL</button>
                                    </td >
                                </>
                            ) : (
                                // --- DISPLAY ROW ---
                                <>
                                    <td className="py-4 font-bold">{item.name}</td>
                                    <td className="py-4 text-neutral/60 text-sm italic">{item.details || "No description"}</td>
                                    <td className="py-4 text-right space-x-4">
                                        <button 
                                            onClick={() => { 
                                                setEditId(item.id); 
                                                setEditInput({ name: item.name, details: item.details || "" }); 
                                            }} 
                                            className="text-accent hover:underline font-bold text-xs uppercase"
                                        >
                                            Edit
                                        </button>
                                        <button onClick={() => deleteCategory(item.id)} className="text-red-800 hover:text-red-500 font-bold text-xs uppercase">Delete</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}