import { DynamoDBClient, GetItemCommand, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall, marshall } from "@aws-sdk/util-dynamodb";

const ddbClient = new DynamoDBClient();

export const handler = async (event) => {
    console.log('Received event: ', event);
    try {
        const todoId = event.pathParameters.id;

        const todo = await getTodoItem(todoId);
        if (!todo) {
            return {
                statusCode: 404,
                body: JSON.stringify({ Error: "ToDo item not found" }),
                headers: {
                    'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                    'Access-Control-Allow-Methods': '*',
                    'Access-Control-Allow-Origin': '*',
                },
            };
        }

        const updatedTodo = await toggleCompletion(todo);

        return {
            statusCode: 200,
            body: JSON.stringify(updatedTodo),
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        };
    } catch (err) {
        console.error(err);
        return errorResponse(err.message);
    }
};

const getTodoItem = async (todoId) => {
    const params = {
        TableName: 'todotable',
        Key: {
            todo_id: { S: todoId }
        }
    };
    const command = new GetItemCommand(params);
    const { Item } = await ddbClient.send(command);
    return Item ? unmarshall(Item) : null;
};

const toggleCompletion = async (todo) => {
    const updatedTodo = {
        ...todo,
        completed: !todo.completed
    };

    const params = {
        TableName: 'todotable',
        Item: marshall(updatedTodo)
    };
    const command = new PutItemCommand(params);
    await ddbClient.send(command);

    return updatedTodo;
};

const errorResponse = (errorMessage) => {
    return {
        statusCode: 500,
        body: JSON.stringify({
            Error: errorMessage
        }),
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    };
};
