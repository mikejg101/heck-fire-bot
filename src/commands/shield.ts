import { Message } from "discord.js";
import { setTimeout } from "timers";

const shieldTypes = {
  4: { type: "hours" },
  8: { type: "hours" },
  12: { type: "hours" },
  24: { type: "hours" },
  3: { type: "days" },
  7: { type: "days" }
};

const shield = (message: Message) => {
  try {
    const interval = Number(message.cleanContent.split(" ")[2]);
    if (!shieldTypes.hasOwnProperty(interval)) {
      message.reply(`${interval} shield duration is not supported`);
    } else {
      message.reply("I will direct message you when your shield is expiring");
      let finalWarning = 0;
      let earlyWarning = 0;

      if ((shieldTypes as any)[interval].type === "hours") {
        finalWarning = interval * 60 * 60 * 1000;
        earlyWarning = (interval - 0.5) * 60 * 60 * 1000;
      }

      if ((shieldTypes as any)[interval].type === "days") {
        finalWarning = interval * 24 * 60 * 60 * 1000;
        earlyWarning = interval * 24 * 60 * 60 * 1000 - 1 * 60 * 60 * 1000;
      }

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
  } catch (e) {
    message.reply("Does Not Compute!");
  }
};

export default shield;
