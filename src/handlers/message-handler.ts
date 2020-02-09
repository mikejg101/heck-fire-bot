import { Message } from "discord.js";
import execute from "../execute";

const createMessageHandler = async (botName: string, storage: any) => {
  return async (message: Message) => {
    if (
      message.mentions.users.size > 0 &&
      message.mentions.users.first().username === botName
    ) {
      console.log(message.author.username + ": " + message.cleanContent);
      await execute(message.cleanContent.split(" ")[1], message, storage);
    }
  };
};

export default createMessageHandler;
