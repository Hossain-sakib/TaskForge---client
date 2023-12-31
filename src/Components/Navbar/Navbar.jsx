import { Link, NavLink } from "react-router-dom";
import useAuth from "../../Hooks/UseAuth";
import { AiOutlineLogout } from "react-icons/ai";

const Navbar = () => {
    const { signOutUser, user } = useAuth();

    const navLinks =
        <>
            <NavLink to="/"><li className="w-full btn btn-sm btn-outline rounded-none bg-blue-200 hover:bg-blue-400 font-bold overflow-hidden transition-all hover:scale-105  hover:shadow-2xl ">Home</li></NavLink>
            <NavLink to="/dashboard"><li className="w-full btn btn-sm btn-outline rounded-none bg-blue-200 hover:bg-blue-400 font-bold overflow-hidden transition-all hover:scale-105  hover:shadow-2xl ">Dashboard</li></NavLink>
            <NavLink to="/"><li className="w-full btn btn-sm btn-outline rounded-none bg-blue-200 hover:bg-blue-400 font-bold overflow-hidden transition-all hover:scale-105  hover:shadow-2xl ">About Us</li></NavLink>
            <NavLink to="/"><li className="w-full btn btn-sm btn-outline rounded-none bg-blue-200 hover:bg-blue-400 font-bold overflow-hidden transition-all hover:scale-105  hover:shadow-2xl ">Contact</li></NavLink>
           
        </>

    return (
        <div className="navbar fixed z-10 bg-blue-400 text-white max-w-screen-xl mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow w-52 bg-blue-400 bg-opacity-80 space-y-2">
                        {
                            navLinks
                        }
                    </ul>
                </div>
                <Link to='/'><img className="btn  btn-ghost overflow-hidden transition-all hover:scale-105  hover:shadow-2xl" src="https://i.ibb.co/RNDnqJf/Taskforge-logo.png" alt="" /></Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 space-x-8 ">
                    {
                        navLinks
                    }
                </ul>
            </div>
            <div className="navbar-end">

                <div>
                    {user?.email ? (
                        <div className="dropdown dropdown-end ">
                            <label tabIndex={0} className="cursor-pointer">
                                <div className="avatar">
                                    <div className="w-10 rounded-full overflow-hidden transition-all hover:scale-105  hover:shadow-2xl ">
                                        <img src={user?.photoURL} alt={user.displayName} />
                                    </div>
                                </div>
                            </label>
                            <div
                                tabIndex={0}
                                className="menu menu-sm border-1 border-white dropdown-content mt-3 z-[1] p-2 shadow  rounded-none w-52 bg-blue-400 bg-opacity-80 space-y-2"
                            >
                                <NavLink
                                            className="btn btn-sm btn-outline rounded-none bg-blue-200 hover:bg-blue-400 font-bold overflow-hidden transition-all hover:scale-105  hover:shadow-2xl "
                                        >
                                            {user?.displayName}
                                        </NavLink>
                                <NavLink to={`/dashboard`}

                                    className="btn btn-sm btn-outline rounded-none bg-blue-200 hover:bg-blue-400 font-bold overflow-hidden transition-all hover:scale-105  hover:shadow-2xl "
                                >
                                    Dashboard
                                </NavLink>
                                <div
                                    onClick={signOutUser}
                                    className="btn btn-sm text-red-600 btn-outline rounded-none bg-blue-200 hover:bg-blue-400 font-bold overflow-hidden transition-all hover:scale-105  hover:shadow-2xl "
                                >
                                    Sign Out <AiOutlineLogout className="text-xl"></AiOutlineLogout>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <NavLink
                            to="/signin"
                            className="btn btn-outline rounded-none bg-blue-200 hover:bg-blue-400 font-bold overflow-hidden transition-all hover:scale-105  hover:shadow-2xl  "
                        >
                            Sign in
                        </NavLink>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;