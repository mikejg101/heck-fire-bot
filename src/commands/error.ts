import { Message } from "discord.js";

const error = (message: Message, storage: any) => {
    message.reply("Does not compute!");
};

export default error;