import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
    const navLinks =
        <>
            <NavLink to="/"><li className="font-semibold text-lg overflow-hidden transition-all hover:scale-105 p-2 hover:shadow-2xl hover:bg-blue-800">Home</li></NavLink>
            <li className="font-semibold text-lg overflow-hidden transition-all hover:scale-105 p-2 hover:shadow-2xl hover:bg-blue-800">About Us</li>
            <li className="font-semibold text-lg overflow-hidden transition-all hover:scale-105 p-2 hover:shadow-2xl hover:bg-blue-800">Contact</li>

        </>
    return (
        <div className="navbar fixed z-10 bg-blue-600 text-white max-w-screen-xl mx-auto">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow w-52 bg-blue-600 bg-opacity-80 space-y-2">
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
                <Link to="/signin" className="btn btn-outline rounded-none border-white text-white hover:bg-blue-800">Sign in</Link>
            </div>
        </div>
    );
};

export default Navbar;