import { AVATARS } from "@/constants/avatars";
import useUserStore from "@/stores/userStore";
import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router";

function UserLayout() {
    const navigate = useNavigate();
    
    // 1. Pull profilePicture and logout from your store
    const { logout, profilePicture } = useUserStore();

    // LOGIC: Click Outside to Close Dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Target the specific <details> element
            const details = event.target.closest('details.dropdown');
            
            // If the click is NOT inside a dropdown, find any open dropdowns and close them
            if (!details) {
                const openDetails = document.querySelectorAll('details.dropdown[open]');
                openDetails.forEach((el) => el.removeAttribute('open'));
            }
        };

        // Add the listener to the whole webpage
        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup: Remove the listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // LOGIC: Manual Close for Menu Items
    const closeDropdown = () => {
        const openDetails = document.querySelectorAll('details.dropdown[open]');
        openDetails.forEach((el) => el.removeAttribute('open'));
    };

    const hdlLogout = () => {
        closeDropdown(); // Ensure menu closes on logout
        logout();
        navigate('/');
    };

    return (
        <>
            <div className="min-h-screen bg-[url(./assets/Bar-bg.png)] bg-cover flex flex-col">
                {/* Navbar Container */}
                <div className="w-full bg-secondary flex items-center justify-between p-2 shadow-lg">
                    
                    {/* Logo Section */}
                    <div className="ml-5 flex flex-col cursor-pointer" onClick={() => navigate('/barfront')}>
                        <h1 className="text-3xl font-fraunces font-black text-neutral leading-tight">THE VELVET</h1>
                        <h1 className="text-3xl font-fraunces font-black text-accent leading-tight">HIDEAWAY</h1>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex gap-8">
                        <Link to="/recipes" className="text-2xl font-fraunces font-black text-neutral hover:text-accent transition-colors">Explore</Link>
                        <Link to="/spirits" className="text-2xl font-fraunces font-black text-neutral hover:text-accent transition-colors">Base Spirits</Link>
                        <Link to="/about" className="text-2xl font-fraunces font-black text-neutral hover:text-accent transition-colors">About Us</Link>
                    </div>

                    {/* User Dropdown Section */}
                    <div className="mr-5">
                        <details className="dropdown dropdown-end">
                            <summary className="m-1 btn btn-ghost btn-circle avatar border-2 border-accent/30 hover:border-accent transition-all list-none">
                                <div className="w-10 rounded-full">
                                    <img 
                                        src={profilePicture || AVATARS[0].url} 
                                        alt="User Avatar" 
                                        onError={(e) => { e.target.src = 'https://api.dicebear.com/7.x/shapes/svg?seed=Noir&backgroundColor=050505,10b981' }}
                                    />
                                </div>
                            </summary>
                            <ul className="p-2 shadow menu dropdown-content z-10 bg-base-100 rounded-box w-52 border border-white/10">
                                <li>
                                    <Link to='/user' className="text-lg font-bold" onClick={closeDropdown}>Your Profile</Link>
                                </li>
                                <li>
                                    <Link to='/recipes/user-recipes' className="text-lg" onClick={closeDropdown}>My Crafts</Link>
                                </li>
                                <li>
                                    <Link to='/explore' className="text-lg" onClick={closeDropdown}>Explores</Link>
                                </li>
                                <hr className="my-2 border-white/5" />
                                <li>
                                    <a className="text-lg text-error font-bold" onClick={hdlLogout}>Logout</a>
                                </li>
                            </ul>
                        </details>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 overflow-auto">
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default UserLayout;