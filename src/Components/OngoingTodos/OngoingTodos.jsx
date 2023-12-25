import { useEffect, useState } from 'react';
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import TodosCard from '../TodosCard/TodosCard';

const OngoingTodos = () => {
  const axiosPublic = useAxiosPublic();
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axiosPublic.get('/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error('Error fetching todos:', error));
  }, [axiosPublic]);
  const ongoingTodos = todos.filter(todo => todo.status === 'ongoing');

  return (
    <div>
      <h1 className='text-center text-2xl font-bold text-blue-600'>Ongoing Tasks</h1>
      {ongoingTodos.map(todo => (
        <TodosCard key={todo._id} todo={todo}></TodosCard>
      ))}
    </div>
  );
};

export default OngoingTodos;
