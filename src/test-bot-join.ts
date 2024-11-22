// npx tsc src/test-bot-join.ts
// node src/test-bot-join.js

import { post } from './app/api/start-bot/action';
import { RunJoinBotConfig } from './app/types';

const serverUrl = 'http://localhost:4321/bot_join/DummyBot';
const serverAuth = 'your-auth-token';
// no use nextjs env
console.log(serverUrl, RunJoinBotConfig);

(async () => {
    try {
        const result = await post(
            serverUrl, serverAuth,
            { "config": RunJoinBotConfig }
        );
        console.log('Result:', result);
    } catch (error) {
        console.error('Error:', error);
    }
})();