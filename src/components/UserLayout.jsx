import useUserStore from "@/stores/userStore"
import { Link, Outlet, useNavigate } from "react-router"


function UserLayout() {
    const navigate = useNavigate()
    const {logout} = useUserStore()

    const hdlLogout = ()=> {
        logout()
        navigate('/')
    }
    return (
        <>
            <div className="min-h-screen bg-[url(./assets/Bar-bg.png)] bg-cover flex flex-col">
                <div className="w-full bg-secondary flex items-center justify-between">
                    <div className="ml-5 flex flex-col cursor-pointer" onClick={() => navigate('/barfront')}>
                        <h1 className="text-3xl font-fraunces font-black text-neutral">THE VELVET</h1>
                        <h1 className="text-3xl font-fraunces font-black text-accent">HIDEAWAY</h1>
                    </div>
                    <Link to={('/recipes')}
                        className="text-3xl font-fraunces font-black text-neutral">Explore</Link>
                    <Link to={('/spirits')}
                        className="text-3xl font-fraunces font-black text-neutral">Base Spirits</Link>
                    <Link to={('/about')}
                        className="text-3xl font-fraunces font-black text-neutral">About Us</Link>
                    <div className="mr-5">
                        <details class="dropdown dropdown-end">
                            <summary class="m-1 btn btn-ghost btn-circle avatar">
                                <div class="w-10 rounded-full">
                                    <img src="" />
                                </div>
                            </summary>
                            <ul class="p-2 shadow menu dropdown-content z-1 bg-base-100 rounded-box w-52">
                                <li>
                                    <a className="text-xl" onClick={() => navigate('/user')}>Profile</a>
                                </li>
                                <li>
                                    <a className="text-xl " onClick={() => navigate('/recipes/user-recipes')}>Your Recipes</a>
                                </li>
                                <li>
                                    <a className="text-xl " onClick={() => navigate('/recipes')}>Explore the Recipes</a>
                                </li>
                                <li>
                                    <a className="text-xl " onClick={hdlLogout}>Logout</a>
                                </li>
                            </ul>
                        </details>
                    </div>
                </div>

                <Outlet />
            </div>
        </>
    )
}

export default UserLayout