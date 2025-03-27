import { ACCEPTED_COMMANDS, VALID_TELEGRAM_IDS } from './constants';

export const validateValidUserId = (id: number): boolean => {
    return VALID_TELEGRAM_IDS.includes(id);
};

export const extractCommandFromMessage = (message: string) => {
    const messageChunks = message.split(' ');
    const [command, rest] = messageChunks;
    return {
        command,
        rest,
    };
};

export const isKnownCommand = (command: string): boolean => {
    return ACCEPTED_COMMANDS.includes(command);
};
