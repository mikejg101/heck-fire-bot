import { Message } from "discord.js";
import execute from "../execute";
import { HeckFireBot } from "../models/heck-fire-bot";
import { Command } from "../commands/command";

const isBotRequest = (message: Message, botName: string) => {
  return (
    message.mentions.users.size > 0 &&
    message.mentions.users.first().username === botName
  );
};

const getCommand = (message: Message): Command => {
  const messageParts = message.cleanContent.split(" ");
  const name = messageParts[1];
  const options = name === "shield" ? [messageParts[2]] : [];
  return {
    name,
    options,
    message
  };
};

export const messageEventHandler = (bot: HeckFireBot) => {
  return async (message: Message) => {
    if (isBotRequest(message, bot.name)) {
      bot.logger.log(message.author.username + ": " + message.cleanContent);
      const command = getCommand(message);
      await execute(command, bot.storage);
    }
  };
};

export default messageEventHandler;
