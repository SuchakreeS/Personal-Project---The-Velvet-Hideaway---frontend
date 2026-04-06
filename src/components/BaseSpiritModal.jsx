export const BaseSpiritModal = (
    { editId, spiritData, hdlChange, hdlSubmit, id, hdlFileChange }) => {
    return (
        <dialog className="modal" id="spiritModal">
            <div className="modal-box bg-secondary border border-neutral max-w-2xl p-0 overflow-hidden">
                <div className="bg-accent p-6 flex justify-between items-center">
                    {editId ? "Edit Spirits" : "New Spirits"}
                </div>
                <form onSubmit={hdlSubmit}>
                    <button className="text-secondary hover:rotate-90 transition-transform duration-300">
                        X
                    </button>
                </form>

                <form className="p-8 space-y-6" onSubmit={hdlSubmit}>
                    <div className="space-y-2">
                        <label className="text-neutral/40">
                            SPIRIT NAME
                        </label>
                        <input type="text" name="name" value={spiritData.name} onChange={hdlChange} placeholder="e.g. Gin" required
                            className="w-full bg-neutral/5 border border-neutral/10 p-4 text-neutral focus:border-accent transition-colors" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-neutral/40">
                            IMAGE URL
                        </label>
                        <input type="file" accept="image/*" name="image" onChange={hdlFileChange} placeholder="Paste image link here" 
                            className="w-full bg-neutral/5 border border-neutral/10 p-4 text-neutral focus:border-accent transition-colors" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-neutral/40">
                            DESCRIPTION
                        </label>
                        <input type="text" name="details" value={spiritData.details} onChange={hdlChange} placeholder="Describe the flavor profile..." required
                            className="w-full bg-neutral/5 border border-neutral/10 p-4 text-neutral focus:border-accent transition-colors" />
                    </div>
                    <button type="submit"
                        className="btn w-full bg-neutral text-secondary font-black hover:bg-accent transition-colors">
                        {editId ? "UPDATE ARCHIVE" : "COMMIT TO FOUNDATION"}
                    </button>

                </form>
            </div>
        </dialog>
    )
}