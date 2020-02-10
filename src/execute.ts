import { Message } from "discord.js";
import quests from "./commands/quests";
import shield from "./commands/shield";
import error from "./commands/error";
import { Command } from "./commands/command";

const execute = async (command: Command, storage: any) => {
  switch (command.name) {
    case "quests":
      await quests(command, storage);
      break;
    case "shield":
      await shield(command, storage);
      break;
    default:
      await error(command, storage);
      break;
  }
};

export default execute;
