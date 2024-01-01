import useAxiosPublic from "../../Hooks/useAxiosPublic";
import TodosCard from '../TodosCard/TodosCard';
import useAuth from '../../Hooks/useAuth';
import { useQuery } from '@tanstack/react-query';

const PendingTodos = () => {
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
      <h1 className='text-center text-2xl font-bold text-blue-600'>Pending Tasks</h1>
      {todos
        .filter((todo) => todo.status === 'pending')
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

export default PendingTodos;
