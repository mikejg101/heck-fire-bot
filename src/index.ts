import dotenv from "dotenv";
import createStorage from "./storage";
import { HeckFireBot } from "./models/heck-fire-bot";
import { readyEventHandler } from "./handlers/ready-handler";
import createLogger from "./utilities/logger";
import { messageEventHandler } from "./handlers/message-handler";

(async () => {
  try {
    dotenv.config();
    const logger = createLogger();
    const TOKEN: any = process.env.TOKEN;
    const BOT_NAME: any = process.env.BOT_NAME;
    
    const storage = await createStorage();
    const bot = new HeckFireBot(BOT_NAME, TOKEN, storage, logger);

    bot.setReadyHandler(readyEventHandler);
    bot.setMessageHandler(messageEventHandler);

    await bot.login();
    // const bot = await createBot(BOT_NAME, TOKEN, storage);
  } catch (e) {
    console.error(e);
  }
})();
