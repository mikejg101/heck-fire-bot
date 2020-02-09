import dotenv from "dotenv";
import createMessageHandler from "./handlers/message-handler";
import createBot from "./bot";
import createStorage from "./storage";
import moment from "moment";

(async () => {
  try {
    dotenv.config();
    const TOKEN: any = process.env.TOKEN;
    const BOT_NAME: any = process.env.BOT_NAME;
    
    const storage = await createStorage();
    const bot = await createBot(BOT_NAME, TOKEN, storage);

    bot.on(
      "message",
      async message =>
        await (await createMessageHandler(BOT_NAME as any, storage))(message)
    );
  } catch (e) {
    console.error(e);
  }
})();
