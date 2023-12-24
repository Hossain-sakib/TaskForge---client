import {
    NavLink
} from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="menu w-64 min-h-screen bg-blue-400">
            <ul className="menu p-1 space-y-4 text-lg font-semibold">
                <li className="border-2 overflow-hidden transition-all hover:scale-105  hover:shadow-2xl">
                    <NavLink to='/'>Home</NavLink>
                </li>
                <li className="border-2 overflow-hidden transition-all hover:scale-105  hover:shadow-2xl">
                <NavLink to='/dashboard/addtask'>AddTask</NavLink>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;