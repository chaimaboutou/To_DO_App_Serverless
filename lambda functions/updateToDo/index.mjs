import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";

const ddbClient = new DynamoDBClient();

export const handler = async (event) => {
    console.log('Received event: ', event);
    try {
        const todoId = event.pathParameters.id;

        const requestBody = JSON.parse(event.body);
        const { title, description } = requestBody;

        const updatedTodo = await updateTodoItem(todoId, title, description);

        return {
            statusCode: 200,
            body: JSON.stringify(updatedTodo),
            headers: {
                'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*',
            },
        };
    } catch (err) {
        console.error(err);
        return errorResponse(err.message);
    }
};

const updateTodoItem = async (todoId, title, description) => {


    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    let formattedTime = currentDate.toTimeString().split(' ')[0]; // Get the time part
    formattedTime = formattedTime.substring(0, formattedTime.lastIndexOf(':')); // Remove seconds
    const formattedDateTime = `${formattedDate} ${formattedTime}`;

    const params = {
        TableName: 'todotable',
        Key: {
            todo_id: { S: todoId } // Assuming todo_id is a string type in DynamoDB
        },
        UpdateExpression: 'SET #t = :title, #d = :description, lastModified = :lastModified',
        ExpressionAttributeNames: {
            '#t': 'title',
            '#d': 'description'
        },
        ExpressionAttributeValues: {
            ':title': { S: title },
            ':description': { S: description },
            ':lastModified': { S: formattedDateTime }
        },
        ReturnValues: 'ALL_NEW'
    };

    const command = new UpdateItemCommand(params);
    const { Attributes } = await ddbClient.send(command);
    return unmarshall(Attributes);
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
