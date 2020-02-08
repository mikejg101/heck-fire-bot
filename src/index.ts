import dotenv from 'dotenv';
import Discord from 'discord.js';

dotenv.config();

const bot = new Discord.Client();
const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on('ready', () => {
    console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
    if(msg.mentions.users.size){
        const taggedUser = msg.mentions.users.first();
        if(taggedUser.username === 'HeckBot'){
            const command = msg.cleanContent.replace('@HeckBot', '').trim();
            if (command.toLocaleLowerCase() === 'ping'){
                msg.reply('pong');
            }
        }
    }
});
