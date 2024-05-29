import React, { useState } from 'react';
import '../style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function Form({ onAddTodo }) {
    const [title, setTitle] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (title.trim() === "") return;

        // Create a new todo item with only the title
        const newTodo = {
            title,
            description: null,

        };

        // Call the onAddTodo prop with the new todo item
        await onAddTodo(newTodo);

        // Clear the input
        setTitle("");
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <label htmlFor="todo">
                <input
                    type="text"
                    name="todo"
                    id="todo"
                    placeholder="Write your next task"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            <button type="submit">
                <FontAwesomeIcon icon={faPlus} style={{ color: 'white', fontSize: '30px', margin: "10px" }} />
            </button>
        </form>
    );
}

export default Form;
