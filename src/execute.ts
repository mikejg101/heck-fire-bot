import { Message } from "discord.js";
import quests from "./quests";
import shield from "./shield";
import error from "./error";

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
