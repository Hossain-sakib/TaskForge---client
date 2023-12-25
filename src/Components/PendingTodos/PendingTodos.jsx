import { useEffect, useState } from 'react';
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import TodosCard from '../TodosCard/TodosCard';

const PendingTodos = () => {
  const axiosPublic = useAxiosPublic();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axiosPublic.get('/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching todos:', error));
  }, [axiosPublic]);
  const ongoingTodos = todos.filter(todo => todo.status === 'pending');

  return (
    <div>
      <h1 className='text-center text-2xl font-bold text-blue-600'>Pending Tasks</h1>
      {ongoingTodos.map(todo => (
        <TodosCard key={todo._id} todo={todo}></TodosCard>
      ))}
    </div>
  );
};

export default PendingTodos;
