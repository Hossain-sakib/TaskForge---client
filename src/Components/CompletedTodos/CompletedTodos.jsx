import useAxiosPublic from "../../Hooks/useAxiosPublic";
import TodosCard from '../TodosCard/TodosCard';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const CompletedTodos = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const userEmail = user?.email;

  const { data: todos = [], refetch } = useQuery({
    queryKey: ['todos', userEmail],
    queryFn: async () => {
      const res = await axiosPublic.get(`/todos?email=${user.email}`);
      return res.data;
    },
  });

  const handleActionComplete = () => {
    refetch();
  };

  return (
    <div>
      <h1 className='text-center text-2xl font-bold text-blue-600'>Completed Task</h1>
      {todos
        .filter((todo) => todo.status === 'completed')
        .map((todo) => (
          <TodosCard
            key={todo._id}
            todo={todo}
            onActionComplete={handleActionComplete}
          ></TodosCard>
        ))}
    </div>
  );
};

export default CompletedTodos;
