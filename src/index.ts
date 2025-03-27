import { APIGatewayProxyHandler } from 'aws-lambda';

import {
    extractCommandFromMessage,
    isKnownCommand,
    validateValidUserId,
} from './utils';

export const handler: APIGatewayProxyHandler = async (event) => {
    try {
        const body = JSON.parse(event.body || '{}');
        const message = body.message;

        if (!message || !message.text) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'No valid message received' }),
            };
        }

        console.log('message', message);
        const userId = message.from?.id;
        const chatId = message.chat?.id;
        const { text } = message;

        if (!validateValidUserId(userId) || !chatId || !text) {
            return { statusCode: 200, body: '' };
        }

        const { command, rest } = extractCommandFromMessage(text);

        if (!isKnownCommand(command)) {
            return { statusCode: 200, body: '' };
        }

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: `Your command is: ${command}, the URL is: ${rest}`,
                method: 'sendMessage',
                chat_id: chatId,
            }),
        };
    } catch (error) {
        console.error('Error processing Telegram message:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal server error' }),
        };
    }
};
