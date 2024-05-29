// TaskModal.js
import React from 'react';

function TaskModal({ isOpen, onClose, task }) {
    if (!isOpen) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Task Details</h2>
                <p><strong>ID:</strong> {task.id}</p>
                <p><strong>Title:</strong> {task.title}</p>
                <p><strong>Status:</strong> {task.isCompleted ? 'Completed' : 'Not Completed'}</p>
            </div>
        </div>
    );
}

export default TaskModal;
