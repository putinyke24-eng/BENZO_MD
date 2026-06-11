import axios from 'axios';
import { sendInteractive } from '../../lib/sendInteractive.js';

export default {
    name: 'shorten',
    aliases: ['shorturl', 'tinyurl', 'shrinkurl'],
    description: 'Shorten a URL',
    run: async (context) => {
        const { client, m, text } = context;
        await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });
        const url = (text || '').trim();
        if (!url || !url.startsWith('http')) {
            return sendInteractive(client, m, `╭─❏ 「 URL Sʜᴏʀᴛᴇɴᴇʀ」
│
│ Give me a valid URL to shorten.\n│ Usage: .shorten https://example.com/very/long/url\n╰───────────────\n> ©𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 𝐆𝐔𝐑𝐔𝐓𝐄𝐂𝐇`);
        }
        try {
            await client.sendMessage(m.chat, { react: { text: '⌛', key: m.reactKey } });
            const res = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(url)}`, { timeout: 8000 });
            const short = res.data;
            await client.sendMessage(m.chat, { react: { text: '✅', key: m.reactKey } });
            return sendInteractive(client, m, `╭─❏ 「 URL Sʜᴏʀᴛᴇɴᴇʀ」
│
│ 🔗 Original: ${url.slice(0,60)}${url.length>60?'...':''}\n│ ✅ Shortened: ${short}\n╰───────────────\n> ©𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 𝐆𝐔𝐑𝐔𝐓𝐄𝐂𝐇`);
        } catch {
            await client.sendMessage(m.chat, { react: { text: '❌', key: m.reactKey } });
            return sendInteractive(client, m, `╭─❏ 「 URL Sʜᴏʀᴛᴇɴᴇʀ」
│
│ Couldn't shorten that. It stays long.\n╰───────────────\n> ©𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐁𝐲 𝐆𝐔𝐑𝐔𝐓𝐄𝐂𝐇`);
        }
    }
};
