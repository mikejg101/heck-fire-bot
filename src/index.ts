import dotenv from "dotenv";
import { Client } from "discord.js";
import createMessageHandler from "./handlers/message-handler";

dotenv.config();

const bot = new Client();
const TOKEN = process.env.TOKEN;
const BOT_NAME = process.env.BOT_NAME;



bot.login(TOKEN);

bot.on("ready", () => {
  console.info(`Logged in as ${bot.user.tag}!`);
  console.log(BOT_NAME);
});

bot.on("message", createMessageHandler(BOT_NAME as any));
