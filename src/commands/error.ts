import { Message } from "discord.js";

const error = (message: Message) => {
    message.reply("Does not compute!");
};

export default error;