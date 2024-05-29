import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";

const ddbClient = new DynamoDBClient();

export const handler = async (event) => {
    console.log('Received event: ', event);
    try {
        const body = JSON.parse(event.body);
        const { title, description } = body;
        const todo = await createTodoItem(title, description);

        return {
            statusCode: 201,
            body: JSON.stringify(todo),
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

const createTodoItem = async (title, description) => {
    const generateUniqueId = () => {
        const timestamp = Date.now().toString(16); // Convert current timestamp to hexadecimal
        const randomString = Math.random().toString(36).substring(2, 10); // Generate a random string
        return timestamp + randomString;
    };

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    let formattedTime = currentDate.toTimeString().split(' ')[0]; // Get the time part
    formattedTime = formattedTime.substring(0, formattedTime.lastIndexOf(':')); // Remove seconds
    const formattedDateTime = `${formattedDate} ${formattedTime}`;

    const todo_id = generateUniqueId();

    const params = {
        TableName: 'todotable',
        Item: marshall({
            todo_id,
            completed: false,
            description,
            lastModified: formattedDateTime,
            title,
        })
    };
    const command = new PutItemCommand(params);
    await ddbClient.send(command);
    return { todo_id, title, description, completed: false, lastModified: formattedDateTime }; // Return created item details
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
