import { Message } from "discord.js";
import quests from "./commands/quests";
import shield from "./commands/shield";
import error from "./commands/error";

const execute = (command: string, message: Message) => {
  switch (command) {
    case "quests":
      quests(message);
      break;
    case "shield":
      shield(message);
      break;
    default:
      error(message);
      break;
  }
};

export default execute;
