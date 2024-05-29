import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

const ddbClient = new DynamoDBClient();

const errorResponse = (errorMessage) => {
    return {
        statusCode: 500,
        body: JSON.stringify({
            Error: errorMessage
        }),
        headers: {
            'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*',
        },
    };
};

export const handler = async (event) => {
    console.log('Received event: ', event);

    try {
        const todoId = event.pathParameters.id;
        const todo = await getTodoById(todoId);

        return {
            statusCode: 200,
            body: JSON.stringify(todo),
            headers: {
                'Access-Control-Allow-Origin': '*',
            },
        };
    } catch (err) {
        console.error(err);
        return errorResponse(err.message);
    }
};

const getTodoById = async (todoId) => {
    const params = {
        TableName: 'todotable',
        Key: {
            todo_id: { S: todoId }
        }
    };
    const command = new GetItemCommand(params);
    const { Item } = await ddbClient.send(command);
    return unmarshall(Item);
};
