import { Message } from "discord.js";
import execute from "../execute";

const createMessageHandler = (botName: string) => (message: Message) => {
  if (
    message.mentions.users.size > 0 &&
    message.mentions.users.first().username === botName
  ) {
    execute(message.cleanContent.split(" ")[1], message);
  }
};

export default createMessageHandler;
