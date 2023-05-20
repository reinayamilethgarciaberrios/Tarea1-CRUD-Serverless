import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({ region: "us-east-1" }));

export const handler = async () => {
    try {
        const scanOutput = await dynamo.send(new ScanCommand({
            TableName: "telefonos",
        }));

        const formattedItems = scanOutput.Items.map(item => {
            const formattedItem = {};
            for (const key in item) {
                formattedItem[key] = item[key].S;
            }
            return formattedItem;
        });

        return {
            statusCode: 200,
            body: JSON.stringify(formattedItems)
        };

    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: error.message })
        };
    }
}
