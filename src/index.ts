import { APIGatewayProxyHandler } from "aws-lambda";
// import axios from "axios";
// const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;

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

        /* await axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            chat_id: chatId,
            text: `Your user ID is: ${userId}`,
        }); */

        return { statusCode: 200, body: JSON.stringify({ message: "User ID sent", method: "sendMessage", chat_id: chatId }) };
    } catch (error) {
        console.error("Error processing Telegram message:", error);
        return { statusCode: 500, body: JSON.stringify({ error: "Internal server error" }) };
    }
};

