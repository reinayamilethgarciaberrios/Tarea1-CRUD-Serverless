import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({ region: "us-east-1" }));

export const handler = async (event) => {
    try {
        const telefono = JSON.parse(event.body);

        await dynamo.send(new UpdateCommand({
            TableName: "telefonos",
            Key: { id: telefono.id },
            UpdateExpression: "set modelo = :modelo",
            ExpressionAttributeValues: {
                ":modelo": telefono.modelo
            }
        }));

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Telefono actualizado correctamente" })
        };

    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message })
        };
    }
}