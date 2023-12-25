import { useEffect, useState } from 'react';
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import TodosCard from '../TodosCard/TodosCard';

const CompletedTodos = () => {
  const axiosPublic = useAxiosPublic();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axiosPublic.get('/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching todos:', error));
  }, [axiosPublic]);
  const completedTodos = todos.filter(todo => todo.status === 'completed');
  return (
    <div>
      <h1 className='text-center text-2xl font-bold text-blue-600'>Completed Task</h1>
      {completedTodos.map(todo => (
        <TodosCard key={todo._id} todo={todo}></TodosCard>
      ))}
    </div>
  );
};

export default CompletedTodos;
