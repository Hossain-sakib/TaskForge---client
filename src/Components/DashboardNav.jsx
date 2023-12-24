import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../Hooks/UseAuth";

const DashboardNav = () => {
    const { user, logout } = useAuth;
    const navigate = useNavigate();
    const userName = user?.displayName;
    const handleLogout = () =>{
        logout()
        .then(()=>{
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
        <div>
            <div className="drawer">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Navbar */}
                    <div className="w-full navbar bg-base-300">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </label>
                        </div>
                        <div className="flex-1 px-2 mx-2"><img src="https://i.ibb.co/fYZVXxH/Task-Boook-1.png" alt="" className="w-full md:w-1/6 opacity-65" /></div>
                        <div className="flex-none hidden lg:block">
                            <ul className="menu menu-horizontal">
                                {/* Navbar menu content here */}
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img alt="Avatar" src={user?.photoURL} />
                                        </div>
                                    </div>
                                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                                        <li>
                                            <a className="justify-between">
                                                {user?.displayName}
                                            </a>
                                        </li>
                                        <li><Link>Settings</Link></li>
                                        <li><a onClick={handleLogout}>Logout</a></li>
                                    </ul>
                                </div>

                            </ul>
                        </div>
                    </div>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200">
                        {/* Sidebar content here */}
                        <h1 className="font-medium text-3xl">{userName}</h1>
                        <div className="flex flex-col gap-2 mt-2">
                            <Link className="btn btn-sm btn-success">Settings</Link>
                            <button className="btn btn-sm btn-error">Logout</button>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DashboardNav;