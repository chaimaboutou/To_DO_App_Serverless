import React, { useState, useEffect } from 'react';
import './style.css';
import Header from './Components/Header';
import Title from './Components/Title';
import Form from './Components/Form';
import TODOList from './Components/TODOList';
import { fetchTodos, createTodo, deleteTodo, updateTodo, completeTodo } from './api';
function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadTodos = async () => {
    try {
      const fetchedTodos = await fetchTodos();
      setTodos(fetchedTodos);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTodos();
  }, []);

  const toggleCompletion = async (id) => {
    const todo = todos.find((todo) => todo.todo_id === id);

    try {
      await completeTodo(id);
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.todo_id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddTodo = async (newTodo) => {
    try {
      const createdTodo = await createTodo(newTodo);
      setTodos((prevTodos) => [createdTodo, ...prevTodos]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTodo(id);
      loadTodos();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (id, updatedTodo) => {
    try {
      const updatedItem = await updateTodo(id, updatedTodo);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.todo_id === id ? updatedItem : todo))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="wrapper">
      <Header />
      <Title />
      <Form onAddTodo={handleAddTodo} />
      <TODOList todos={todos} toggleCompletion={toggleCompletion} onDeleteTodo={handleDelete} onUpdateTodo={handleUpdate} />
    </div>
  );
}

export default App;
