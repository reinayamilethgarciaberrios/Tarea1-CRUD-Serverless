import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { randomUUID } from "crypto";

const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({ region: "us-east-1" }));

export const handler = async (event) => {
    try {
        const telefono = JSON.parse(event.body);

        const newTelefono = {
            ...telefono,
            id: randomUUID(),
        };
        await dynamo.send(new PutCommand({
            TableName: "telefonos",
            Item: newTelefono,
        }));

        return {
            statusCode: 201,
            body: JSON.stringify(newTelefono)
        };

    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message })
        };
    }
}
