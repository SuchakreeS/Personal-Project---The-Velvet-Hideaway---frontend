import { BaseSpiritModal } from "@/components/BaseSpiritModal";
import useRecipeStore from "@/stores/recipeStore";
import useUserStore from "@/stores/userStore";
import { useEffect, useState } from "react";

function BaseSpirit() {
    const { baseSpirits, getBaseSpirits, loading, createBaseSpirit, editBaseSpirit, deleteBaseSpirit } = useRecipeStore()
    const { user } = useUserStore()
    console.log(user?.role)
    const isAdmin = user?.role === 'ADMIN'
    console.log(isAdmin)
    const [editSpiritId, setEditSpiritId] = useState(null)
    const [spiritData, setSpiritData] = useState({ name: '', image: '', details: '' })
    const [fileName, setFileName] = useState("")

    useEffect(() => {
        getBaseSpirits()
    }, [])

    const hdlChange = (evt) => {
        setSpiritData(prev => ({ ...prev, [evt.target.name]: evt.target.value }))
    }

    const resetForm = () => {
        setEditSpiritId(null)
        setSpiritData({ name: '', image: '', details: '' })
    }

    const hdlSubmit = async (evt) => {
        evt.preventDefault();

        // Create a copy of the state to send
        const payload = { ...spiritData };

        // Only send the image if it's a NEW upload (Base64)
        // If it's a URL, the backend usually doesn't need to re-process it
        if (payload.image && !payload.image.startsWith('data:image')) {
            delete payload.image;
        }

        try {
            let success = false;
            if (editSpiritId) {
                success = await editBaseSpirit(editSpiritId, payload);
            } else {
                success = await createBaseSpirit(payload);
            }

            if (success) {
                document.getElementById('spiritModal').close();
                resetForm();
                setFileName(""); // Clear the filename state
                getBaseSpirits();
            }
        } catch (err) {
            console.log(err);
        }
    };

    const openEdit = (spirit) => {
        setEditSpiritId(spirit.id)
        setSpiritData({
            name: spirit.name || '',
            image: spirit.image || '',
            details: spirit.details || ''
        })
        document.getElementById('spiritModal').showModal()
    }

    const hdlFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                alert("File is too large! Please choose an image under 10MB.");
                return;
            }

            setFileName(file.name);

            const reader = new FileReader();
            reader.onloadend = () => {
                // FIX: Use setSpiritData, not setInput
                setSpiritData((prev) => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="min-h-screen bg-[url(./assets/Bar-bg.png)] bg-cover py-20 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-16 border-b border-white/10 pb-8 flex justify-between items-end">
                    <div>
                        <h2 className="font-fraunces italic text-6xl text-accent">The Foundation</h2>
                        {isAdmin && (
                            <button className="bg-neutral text-secondary px-8 py-4 font-black hover:bg-accent transition-colors"
                                onClick={() => {
                                    resetForm()
                                    const modal = document.getElementById('spiritModal');
                                    if (modal) {
                                        modal.showModal();
                                    } else {
                                        console.error("Modal 'spiritModal' not found! Check BaseSpiritModal.jsx ID");
                                    }
                                }}>
                                + NEW SPIRITS
                            </button>
                        )}
                        <p className="font-syne text-[10px] tracking-[0.4em] text-white/30 uppercase mt-2">Essential Base Spirits Registry</p>
                    </div>
                    <p className="font-syne text-[10px] text-white/20 tracking-widest hidden md:block">
                        TOTAL ENTRIES: {baseSpirits?.length || 0}
                    </p>
                </div>

                {/* Table Header */}
                <div className="hidden md:grid grid-cols-6 gap-8 px-10 py-4 font-syne text-[10px] tracking-[0.2em] text-white/20 uppercase">
                    <div className="col-span-1">Visual</div>
                    <div className="col-span-1">Spirit Name</div>
                    <div className="col-span-3">Profile & Character</div>
                    <div className="text-right">Index</div>
                </div>

                {/* Row List */}
                <div className="flex flex-col gap-4 mt-4">
                    {baseSpirits?.map((spirit) => (
                        <div
                            key={spirit.id}
                            className="grid grid-cols-1 md:grid-cols-6 gap-8 items-center px-10 py-8 bg-black/60 border border-white/5 hover:border-accent/40 hover:bg-white/[0.03] transition-all duration-700 group relative overflow-hidden"
                        >
                            {/* Accent Glow Background */}
                            <div className="absolute top-0 left-0 w-[2px] h-full bg-accent scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"></div>

                            {/* Image Column */}
                            <div className="col-span-1 w-full aspect-square overflow-hidden border border-white/10">
                                <img
                                    src={spirit.image || 'https://via.placeholder.com/300?text=Spirit'}
                                    alt={spirit.name}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                                />
                            </div>

                            {/* Name Column */}
                            <div className="col-span-1">
                                <h3 className="font-fraunces text-3xl text-neutral group-hover:text-accent transition-colors duration-500">
                                    {spirit.name}
                                </h3>
                                <div className="h-[1px] w-8 bg-accent/30 mt-2"></div>
                            </div>

                            {/* Description Column */}
                            <div className="md:col-span-3">
                                <p className="font-syne text-sm text-white/60 leading-relaxed max-w-2xl">
                                    {spirit.details || "A cornerstone of the mixology tradition. This spirit provides the structural backbone for countless classic and contemporary cocktails in the archive."}
                                </p>
                            </div>

                            {/* Index Column */}
                            <div className="text-right font-syne text-[11px] text-white/10 tracking-[0.3em] group-hover:text-white/30 transition-colors">
                                [ REF_ID: 00{spirit.id} ]
                            </div>
                            {isAdmin && (
                                <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    <button
                                        onClick={() => openEdit(spirit)}
                                        className="text-[10px] font-syne text-accent hover:text-white tracking-widest"
                                    >
                                        EDIT
                                    </button>
                                    <button
                                        onClick={() => {
                                            if (window.confirm("Delete this spirit from the foundation?")) {
                                                deleteBaseSpirit(spirit.id);
                                            }
                                        }}
                                        className="text-[10px] font-syne text-red-800 hover:text-red-500 tracking-widest"
                                    >
                                        DELETE
                                    </button>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <BaseSpiritModal
                id="spiritModal"
                editId={editSpiritId}
                spiritData={spiritData}
                hdlChange={hdlChange}
                hdlFileChange={hdlFileChange}
                hdlSubmit={hdlSubmit} />
        </div>
    )
}

export default BaseSpirit