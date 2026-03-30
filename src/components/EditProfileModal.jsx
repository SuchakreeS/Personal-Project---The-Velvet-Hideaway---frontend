import useUserStore from "@/stores/userStore"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

const EditProfileModal = ({ id }) => {
    const { user, editProfile } = useUserStore()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        info: ''
    })

    useEffect(() => {
        if (user) {
            setFormData({
                username: user.username || '',
                password: '',
                info: user.info || ''
            })
        }
    }, [user])
    const hdlChange = (evt) => {
        setFormData({ ...formData, [evt.target.name]: evt.target.value })
    }

    const hdlSubmit = async (evt) => {
        evt.preventDefault()
        setLoading(true)
        try {
            await editProfile(formData)
            toast.success("Profile Updated")
            document.getElementById(id).close()
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <dialog className="modal" id={id}>
            <div className="modal-box bg-secondary border border-neutral max-w-xl">
                <div className="p-8 border-neutral/5 bg-secondary">
                    <h3 className="font-fraunces italic text-accent">UPDATE YOUR PROFILE</h3>
                </div>
                <form className="p-8 flex flex-col gap-8" onSubmit={hdlSubmit}>
                    <div className="flex flex-col gap-2">
                        <label className="text-[8px] text-accent ">Username</label>
                        <input className="bg-secondary border border-neutral/10 focus:border-accent"
                            type="text" name="username" value={formData.username} onChange={hdlChange} />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[8px] text-accent ">Info</label>
                        <textarea className="bg-secondary border border-neutral/10 focus:border-accent"
                            name="username" value={formData.info} onChange={hdlChange} rows={3}></textarea>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="text-[8px] text-accent ">Password</label>
                        <input className="bg-secondary border border-neutral/10 focus:border-accent"
                            type="password" name="password" placeholder="Leave blank to keep the old password" value={formData.password} onChange={hdlChange} />
                    </div>
                    <div className="flex gap-4 mt-4">
                        <button className="flex-1 bg-neutral text-secondary py-2 font-black hover:bg-accent transition-all disabled:bg-secondary"
                            type="submit" disabled={loading}>
                            {loading ? "Updating..." : "Save Changes"}
                        </button>
                        <button type="button" className="flex-1 border border-neutral/10 py-4 font-black hover:text-error hover:border-error transition-all"
                        onClick={() => document.getElementById(id).close()}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
            <form method="dialog" className="modal-backdrop">
                <button>Close</button>
            </form>
        </dialog>
    )
}

export default EditProfileModal