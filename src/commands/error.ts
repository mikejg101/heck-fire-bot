import { Command } from "./command";

const error = (command: Command, storage: any) => {
  command.message.reply("Does not compute!");
};

export default error;
