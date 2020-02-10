import { Message } from "discord.js";

export interface Command {
  name: string;
  options: string[];
  message: Message;
}
