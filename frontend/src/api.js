export const fetchTodos = async () => {
    const response = await fetch('https://pntglxz2gb.execute-api.us-east-1.amazonaws.com/prod/todos');
    if (!response.ok) {
        throw new Error('Failed to fetch todos');
    }
    return await response.json();
};
export const createTodo = async (newTodo) => {
    const response = await fetch('https://pntglxz2gb.execute-api.us-east-1.amazonaws.com/prod/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
    });
    if (!response.ok) {
        throw new Error('Failed to create todo');
    }
    return await response.json();
};
export const deleteTodo = async (id) => {
    const response = await fetch(`https://pntglxz2gb.execute-api.us-east-1.amazonaws.com/prod/todos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to delete todo');
    }
};

export const updateTodo = async (id, updatedTodo) => {
    const response = await fetch(`https://pntglxz2gb.execute-api.us-east-1.amazonaws.com/prod/todos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
    });

    if (!response.ok) {
        throw new Error('Failed to update todo');
    }

    const data = await response.json();
    return data;
};
export const completeTodo = async (id) => {
    const response = await fetch(`https://pntglxz2gb.execute-api.us-east-1.amazonaws.com/prod/todos/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        throw new Error('Failed to update todo completion status');
    }

    const data = await response.json();
    return data;
};
