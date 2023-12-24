import DashboardNav from "../Components/DashboardNav";
import TodosAdd from "../Components/TodosAdd/TodosAdd";
import TodosCompleted from "../Components/TodosCompleted/TodosCompleted";

// import TodosList from "./TodosList";

const Dashboard = () => {
    return (
        <div>
            <DashboardNav></DashboardNav>
            <TodosAdd></TodosAdd>
            <div className="grid grid-cols-1 md:grid-cols-2 p-4 md:p-10 gap-4 md:gap-10">
                {/* <TodosList></TodosList> */}
                <TodosCompleted></TodosCompleted>
            </div>
        </div>
    );
};

export default Dashboard;