import dotenv from "dotenv";
import { Client } from "discord.js";
import createMessageHandler from "./handlers/message-handler";

dotenv.config();

const bot = new Client();
const TOKEN = process.env.TOKEN;
const botName = "HeckBot";

bot.login(TOKEN);

bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", createMessageHandler(botName));
