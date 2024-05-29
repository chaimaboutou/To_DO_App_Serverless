import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Modal from 'react-modal';

function Item({ item, toggleCompletion, onDeleteTodo, onUpdateTodo }) {
    const [showDetails, setShowDetails] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editedTitle, setEditedTitle] = useState(item.title);
    const [editedDescription, setEditedDescription] = useState(item.description);

    const handleCompletionToggle = () => {
        toggleCompletion(item.todo_id);
    };


    const handleDetailsToggle = () => {
        setShowDetails(prevState => !prevState);
    };

    const handleDelete = () => {
        confirmAlert({
            title: 'Confirm to delete',
            message: 'Are you sure you want to delete this task?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        onDeleteTodo(item.todo_id);
                    },
                    className: 'yes-button'
                },
                {
                    label: 'No',
                    onClick: () => { },
                    className: 'no-button'
                }
            ]
        });
    };

    const handleEditToggle = () => {
        setEditMode(!editMode);
    };

    const handleTitleChange = (e) => {
        setEditedTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setEditedDescription(e.target.value);
    };

    const handleSave = () => {
        onUpdateTodo(item.todo_id, { title: editedTitle, description: editedDescription });
        setEditMode(false);
    };
    return (
        <li className={`todo_item ${item.completed ? 'completed' : ''}`}>
            <div className="task_title_wrapper">
                <button className="todo_items_left" onClick={handleCompletionToggle}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                        <circle
                            cx="10"
                            cy="10"
                            r="9"
                            fill={item.completed ? '#1995AD' : 'white'}
                            stroke={item.completed ? '#1995AD' : '#1995AD'}
                            strokeWidth="2"
                        />
                    </svg>
                    <p>{item.title}</p>
                </button>
                <div className="todo_items_right">
                    <button onClick={handleDetailsToggle}>
                        <span className="visually-hidden">Task Details</span>
                        <FontAwesomeIcon icon={faInfoCircle} color="#1995AD" size="lg" />
                    </button>
                    <button onClick={handleEditToggle}>
                        <span className="visually-hidden">Edit</span>
                        <FontAwesomeIcon icon={faEdit} color="#1995AD" size="lg" />
                    </button>
                    <button onClick={handleDelete}>
                        <span className="visually-hidden">Delete</span>
                        <FontAwesomeIcon icon={faTrash} color="#1995AD" size="lg" />
                    </button>
                </div>
                {showDetails && (
                    <div className="task_details">

                        <p><strong>Description: </strong> {item.description}</p>
                        <p><strong>Date Modified: </strong> {item.lastModified}</p>
                        <p><strong>Completed: </strong> {item.completed ? 'Yes' : 'No'} </p>

                    </div>
                )}
            </div>
            <Modal isOpen={editMode}>
                <div>
                    <h2>Edit Task</h2>
                    <input type="text" value={editedTitle} onChange={handleTitleChange} />
                    <textarea value={editedDescription} onChange={handleDescriptionChange} />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleEditToggle}>Cancel</button>
                </div>
            </Modal>
        </li>
    );
}

export default Item;
