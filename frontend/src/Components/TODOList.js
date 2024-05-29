import React from 'react';
import Item from './Item';

function TODOList({ todos, toggleCompletion, onDeleteTodo, onUpdateTodo }) {
    return (
        <ul className="todo_list">
            {todos.map((todo) => (
                <Item key={todo.todo_id} item={todo} toggleCompletion={toggleCompletion} onDeleteTodo={onDeleteTodo} onUpdateTodo={onUpdateTodo} />
            ))}
        </ul>
    );
}

export default TODOList;
