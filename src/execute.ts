import { Message } from "discord.js";
import quests from "./commands/quests";
import shield from "./commands/shield";
import error from "./commands/error";

const execute = async (command: string, message: Message, storage: any) => {
  switch (command) {
    case "quests":
      await quests(message, storage);
      break;
    case "shield":
      await shield(message, storage);
      break;
    default:
      await error(message, storage);
      break;
  }
};

export default execute;
