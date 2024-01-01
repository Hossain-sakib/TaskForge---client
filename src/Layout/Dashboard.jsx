import DashboardNav from "../Components/DashboardNav";
import TodosAdd from "../Components/TodosAdd/TodosAdd";
import PendingTodos from "../Components/PendingTodos/PendingTodos";
import OngoingTodos from "../Components/OngoingTodos/OngoingTodos";
import CompletedTodos from "../Components/CompletedTodos/CompletedTodos";

const Dashboard = () => {
  return (
    <div className="bg-blue-200 min-h-screen">
      <DashboardNav></DashboardNav>
      <div className="mt-16">
        <TodosAdd></TodosAdd>
        <div className="grid grid-cols-1 md:grid-cols-3 p-4 md:p-10 gap-4 md:gap-10">
          <PendingTodos></PendingTodos>
          <OngoingTodos></OngoingTodos>
          <CompletedTodos></CompletedTodos>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
