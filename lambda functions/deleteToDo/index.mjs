import { DynamoDBClient, DeleteItemCommand } from "@aws-sdk/client-dynamodb";

const ddbClient = new DynamoDBClient();

export const handler = async (event) => {
    console.log('Received event: ', event);
    try {
        const todoId = event.pathParameters.id;

        await deleteTodoItem(todoId);

        return {
            statusCode: 204,
            body: '',
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            },
        };
    } catch (err) {
        console.error(err);
        return errorResponse(err.message);
    }
};

const deleteTodoItem = async (todoId) => {
    const params = {
        TableName: 'todotable',
        Key: {
            todo_id: { S: todoId }
        }
    };
    const command = new DeleteItemCommand(params);
    await ddbClient.send(command);
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
