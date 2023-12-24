import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../Hooks/UseAuth";
import { AiOutlineLogout } from "react-icons/ai";

const DashboardNav = () => {
    const { signOutUser, user } = useAuth();
    console.log(user);
    const navigate = useNavigate();
    const handleSignOut = () => {
        signOutUser()
            .then(() => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "User Logged Out!",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/");
            })
    }
    return (
        <div className="text-white">
            <div className="drawer">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    <div className="navbar fixed z-10 bg-blue-400 text-white max-w-screen-xl mx-auto">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </label>
                        </div>
                        <div className="flex-1 px-2 mx-2"><img src="https://i.ibb.co/RNDnqJf/Taskforge-logo.png" alt="" className="w-full md:w-1/6 opacity-65" /></div>
                        <div className="flex-none hidden lg:block">
                            <ul className="menu menu-horizontal">
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img alt="Avatar" src={user?.photoURL} />
                                        </div>
                                    </div>
                                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow w-52 bg-blue-400 bg-opacity-80 space-y-2">
                                        <li>
                                            <a className="justify-between">
                                                {user?.displayName}
                                            </a>
                                        </li>
                                        <Link className="px-4 py-2 rounded-none  font-semibold
                                        hover:bg-base-100 hover:bg-opacity-10 hover:font-bold flex   items-center gap-2
                                        overflow-hidden transition-all hover:scale-105  hover:shadow-2xl">Settings</Link>
                                        <div
                                            onClick={handleSignOut}
                                            className="cursor-pointer text-red-500 px-4 py-2  rounded-none font-bold hover:bg-base-100 hover:bg-opacity-10 hover:font-extrabold flex  items-center gap-2 overflow-hidden transition-all hover:scale-105  hover:shadow-2xl"
                                        >
                                            Sign Out <AiOutlineLogout className="text-xl"></AiOutlineLogout>
                                        </div>
                                    </ul>
                                </div>

                            </ul>
                        </div>
                    </div>
                </div>
                <div className="drawer-side mt-16">
                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu menu-sm border-1 border-white dropdown-content mt-3 z-[1] p-2 shadow  rounded-none w-52 bg-blue-400 bg-opacity-80 space-y-2">
                        <div className="flex flex-col justify-center items-center gap-2 mt-2">
                            <div className="avatar">
                                <div className="w-10 rounded-full overflow-hidden transition-all hover:scale-105  hover:shadow-2xl ">
                                    <img src={user?.photoURL} alt={user?.displayName} />
                                </div>
                            </div>
                            <h1 className="font-medium text-3xl">{user?.displayName}</h1>
                            <Link className="px-4 py-2 rounded-none  font-semibold
                                        hover:bg-base-100 hover:bg-opacity-10 hover:font-bold flex   items-center gap-2
                                        overflow-hidden transition-all hover:scale-105  hover:shadow-2xl">Settings
                            </Link>
                            <div
                                onClick={handleSignOut}
                                className="cursor-pointer text-red-500 px-4 py-2  rounded-none font-bold hover:bg-base-100 hover:bg-opacity-10 hover:font-extrabold flex  items-center gap-2 overflow-hidden transition-all hover:scale-105  hover:shadow-2xl"
                            >
                                Sign Out <AiOutlineLogout className="text-xl"></AiOutlineLogout>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardNav;