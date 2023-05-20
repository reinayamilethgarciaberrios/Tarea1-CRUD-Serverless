import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand } from "@aws-sdk/lib-dynamodb";

const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({ region: "us-east-1" }));

export const handler = async (event) => {
    try {
        const telefono = JSON.parse(event.body);

        const getOutput = await dynamo.send(new GetCommand({
            TableName: "telefonos",
            Key: {id: telefono.id}
        }));

        return {
            statusCode: 200,
            body: JSON.stringify(getOutput.Item)
        };

    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message })
        };
    } 
}
