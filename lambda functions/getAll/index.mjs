import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

const ddbClient = new DynamoDBClient();

export const handler = async (event) => {
    console.log('Received event: ', event);

    try {
        const todos = await getAllTodos();

        return {
            statusCode: 200,
            body: JSON.stringify(todos),
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

const getAllTodos = async () => {
    const params = {
        TableName: 'todotable'
    };
    const command = new ScanCommand(params);
    const { Items } = await ddbClient.send(command);
    return Items.map(item => unmarshall(item));
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
