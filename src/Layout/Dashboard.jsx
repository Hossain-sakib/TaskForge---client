import AddTodos from "./AddTodos";
import Completed from "./Completed";
import DashboradNav from "./DashboradNav";
import TodosList from "./TodosList";

const Dashboard = () => {
    return (
        <div>
            <DashboradNav></DashboradNav>
            <AddTodos></AddTodos>
            <div className="grid grid-cols-1 md:grid-cols-2 p-4 md:p-10 gap-4 md:gap-10">
                <TodosList></TodosList>
                <Completed></Completed>
            </div>
        </div>
    );
};

export default Dashboard;