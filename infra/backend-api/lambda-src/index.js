import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({});
const TABLE_NAME = "portfolio-project-clicks";

export const handler = async (event) => {
    try {
        if (!event.body) {
            return {
                statusCode: 400,
                body: JSON.stringify({ message: "Bad Request: Missing request body" }),
            };
        }

        const { projectId } = JSON.parse(event.body);

        const command = new UpdateItemCommand({
            TableName: TABLE_NAME,
            Key: {
                id: { S: projectId },
            },
            UpdateExpression: "ADD clicks :inc",
            ExpressionAttributeValues: {
                ":inc": { N: "1" },
            },
        });

        await client.send(command);

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
            },
            body: JSON.stringify({ message: "Click recorded successfully" }),
        };
    } catch (error) {
        console.error("Error recording click:", error);
        return {
            statusCode: 500,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST, OPTIONS",
            },
            body: JSON.stringify({ message: "Internal Server Error" }),
        }
    }
}