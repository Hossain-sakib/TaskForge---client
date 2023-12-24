import { NavLink, Outlet } from "react-router-dom";


const Dashboard = () => {
    return (
        <div>
            <div className="drawer lg:drawer-open ">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content text-lg font-bold">
                        <li> <NavLink to='/dashboard/addtask'>AddTask</NavLink></li>
                        {/* <li> <NavLink to='/dashboard/todo'>ToDo</NavLink></li>
                        <li> <NavLink to='/dashboard/ongoing'>OnGoing</NavLink></li>
                        <li> <NavLink to='/dashboard/completedTask'>Completed Task</NavLink></li> */}

                        <hr />
                        <li> <NavLink to='/'>Home</NavLink></li>
                    </ul>

                </div>
            </div>
            <Outlet></Outlet>
        </div>
    );
};

export default Dashboard;