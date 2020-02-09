import { Message } from "discord.js";
import { setTimeout } from "timers";
import moment = require("moment");

const shieldTypes = {
  4: { type: "hours" },
  8: { type: "hours" },
  12: { type: "hours" },
  24: { type: "hours" },
  3: { type: "days" },
  7: { type: "days" }
};

const shield = async (message: Message, storage: any) => {
  try {
    const interval = parseInterval(message);
    if (!shieldTypes.hasOwnProperty(interval)) {
      message.reply(`${interval} shield duration is not supported`);
    } else {
      const type = (shieldTypes as any)[interval].type;
      const userData = await storage.getItem(message.author.id);
      let earlyWarning = getEarlyWarning(type, interval);
      let finalWarning = getFinalWarning(type, interval);

      if (
        userData &&
        userData.shield &&
        moment(userData.shield.finalWarning).isAfter(moment())
      ) {
        message.reply("You need to wait for the current shield to expire");
      } else {
        message.reply("I will direct message you when your shield is expiring");
        await storage.setItem(
          message.author.id,
          {
            shield: {
              id: message.author.id,
              user: message.author.username,
              type,
              interval,
              earlyWarning: moment()
                .add(earlyWarning)
                .format(),
              finalWarning: moment()
                .add(finalWarning)
                .format()
            }
          },
          {
            ttl: moment()
              .add(finalWarning)
              .toDate()
          } as any
        );
        if (earlyWarning !== 0) {
          setTimeout(() => {
            message.author.send("Your shield is about to expire");
          }, earlyWarning);
        }

        if (finalWarning !== 0) {
          setTimeout(() => {
            message.author.send("Your shield has expired");
          }, finalWarning);
        }
      }
    }
  } catch (e) {
    message.reply("Does Not Compute!");
  }
};

const getFinalWarning = (type: string, interval: number) => {
  if (type === "minutes") {
    return interval * 60 * 1000;
  } else if (type === "hours") {
    return interval * 60 * 60 * 1000;
  } else if (type === "days") {
    return interval * 24 * 60 * 60 * 1000;
  }
  return 0;
};

const getEarlyWarning = (type: string, interval: number) => {
  if (type === "minutes") {
    return (interval - 0.5) * 60 * 1000;
  } else if (type === "hours") {
    return (interval - 0.5) * 60 * 60 * 1000;
  } else if (type === "days") {
    return (interval - 0.5) * 24 * 60 * 60 * 1000;
  }
  return 0;
};

const parseInterval = (message: Message) =>
  Number(message.cleanContent.split(" ")[2]);

export default shield;
