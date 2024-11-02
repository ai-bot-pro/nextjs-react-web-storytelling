// npx jest src/tests/action.test.ts

/// <reference types="jest" />

import { post as bot_join } from '@/app/api/start-bot/action';
import { RunJoinBotConfig } from '@/app/types';

// mock fetch API
global.fetch = jest.fn();

describe('bot_join', () => {
    const serverUrl = 'https://example.com/api/join-bot';
    const serverAuth = 'your-auth-token';
    const payload = {
        config: RunJoinBotConfig,
    };

    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('should handle successful response', async () => {
        const mockResponse = {
            ok: true,
            json: jest.fn().mockResolvedValue({ result: 'Success' }),
        };

        (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

        const result = await bot_join(serverUrl, serverAuth, payload);

        expect(global.fetch).toHaveBeenCalledWith(serverUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${serverAuth}`,
            },
            body: JSON.stringify({ config: RunJoinBotConfig }),
        });

        expect(result).toEqual({ result: 'Success' });
    });

    it('should handle HTTP error', async () => {
        const mockResponse = {
            ok: false,
            status: 400,
            json: jest.fn().mockResolvedValue({ result: 'Bad Request' }),
        };

        (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

        try {
            await bot_join(serverUrl, serverAuth, payload);
        } catch (error: any) {
            expect(error.message).toBe('HTTP error! status: 400');
        }
    });

    it('should handle specific server URL', async () => {
        const mockResponse = {
            ok: true,
            json: jest.fn().mockResolvedValue({ result: 'Success' }),
        };

        (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

        const result = await bot_join('https://api.cortex.cerebrium.ai/api/join-bot', serverAuth, payload);

        expect(result).toBe('Success');
    });
});