import { Client } from "discord.js";
import moment from "moment";

const addShieldFromStorage = async (
  bot: any,
  id: any,
  warningTime: any,
  log: string,
  message: string
) => {
  const milliseconds = moment(warningTime).diff(moment(), "milliseconds");
  console.log(message);
  setTimeout(async () => {
    const user = await bot.fetchUser(id);
    user.send(log);
  }, milliseconds);
};

const createBot = async (botName: string, token: string, storage: any) => {
  const bot = new Client();
  bot.login(token);

  bot.on("ready", async () => {
    console.info(`Logged in as ${bot.user.tag} using ${botName}!`);

    await (await storage.values()).forEach(async (entry: any) => {
      if (entry.shield && moment(entry.shield.earlyWarning).isAfter(moment())) {
        await addShieldFromStorage(
          bot,
          entry.shield.id,
          entry.shield.earlyWarning,
          "Your shield is about to expire",
          `adding ${entry.shield.user}'s shield early warning after restart`
        );
      }
      if (entry.shield && moment(entry.shield.finalWarning).isAfter(moment())) {
        await addShieldFromStorage(
          bot,
          entry.shield.id,
          entry.shield.finalWarning,
          "Your shield has expired",
          `adding ${entry.shield.user}'s shield final warning after restart`
        );
      }
    });
  });

  return bot;
};

export default createBot;


    // bot.on(
    //   "message",
    //   async message =>
    //     await (await createMessageHandler(BOT_NAME as any, storage))(message)
    // );