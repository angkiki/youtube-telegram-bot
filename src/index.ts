import { APIGatewayProxyHandler } from "aws-lambda";

export const handler: APIGatewayProxyHandler = async (event) => {
    try {
        const body = JSON.parse(event.body || "{}");
        const message = body.message;

        if (!message || !message.text) {
            return { statusCode: 400, body: JSON.stringify({ error: "No valid message received" }) };
        }

        console.log('message', message)
        const userId = message.from?.id;
        const chatId = message.chat?.id;

        if (!userId || !chatId) {
            return { statusCode: 400, body: JSON.stringify({ error: "Invalid message format" }) };
        }

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: `Your User ID is: ${userId}`,
                method: "sendMessage",
                chat_id: chatId
            })
        };
    } catch (error) {
        console.error("Error processing Telegram message:", error);
        return { statusCode: 500, body: JSON.stringify({ error: "Internal server error" }) };
    }
};

