import { HeckFireBot } from "../models/heck-fire-bot";
import moment = require("moment");
import { addShieldFromStorage } from "../commands/shield";

export const readyEventHandler = (bot: HeckFireBot) => {
  return async () => {
    bot.logger.info(`Logged in as ${bot.user.tag} using ${bot.name}`);

    await (await bot.storage.values()).forEach(async (entry: any) => {
      if (entry.shield) {
        await addShieldFromStorage(bot, entry.shield);
      }
    });
  };
};

export default readyEventHandler;
