import dotenv from "dotenv";
import { Message, Client } from "discord.js";
import quests from "./quests";

dotenv.config();

const bot = new Client();
const TOKEN = process.env.TOKEN;

bot.login(TOKEN);

bot.on("ready", () => {
  console.info(`Logged in as ${bot.user.tag}!`);
});

bot.on("message", (message: Message) => {
  if (message.mentions.users.size) {
    const taggedUser = message.mentions.users.first();
    if (taggedUser.username === "HeckBot") {
      const command = message.cleanContent.replace("@HeckBot", "").trim();
      if (command.toLocaleLowerCase() === "quests") {
        quests(message);
      }
    }
  }
});
