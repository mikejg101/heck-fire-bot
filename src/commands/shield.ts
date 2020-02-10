import { setTimeout } from "timers";
import moment from "moment";
import { Command } from "./command";
import { supportedShieldTypes, ShieldDurationTypes } from "../models/shield";
import { User } from "discord.js";
import { Errors } from "../models/errors";
import { HeckFireBot } from "../models/heck-fire-bot";

const diff = (time: any) => moment(time).diff(moment(), "milliseconds");

export const addShieldFromStorage = async (bot: HeckFireBot, shield: any) => {
  if (moment(shield.earlyWarning).isAfter(moment())) {
    const milliseconds = diff(shield.earlyWarning);
    bot.logger.info(
      `adding ${shield.user}'s shield early warning after restart`
    );
    setTimeout(async () => {
      const user = await bot.fetchUser(shield.id);
      user.send("Your shield is about to expire");
    }, milliseconds);
  }
  if (moment(shield.finalWarning).isAfter(moment())) {
    const milliseconds = diff(shield.finalWarning);
    bot.logger.info(
      `adding ${shield.user}'s shield final warning after restart`
    );
    setTimeout(async () => {
      const user = await bot.fetchUser(shield.id);
      user.send("Your shield has expired");
    }, milliseconds);
  }
};

const getSupportedDuration = (interval: number) => {
  return supportedShieldTypes.hasOwnProperty(interval)
    ? (supportedShieldTypes as any)[interval]
    : undefined;
};

const userHasActiveShield = (userData?: any) => {
  return (
    userData &&
    userData.shield &&
    moment(userData.shield.finalWarning).isAfter(moment())
  );
};

const shield = async (command: Command, storage: any) => {
  try {
    const interval = Number(command.options[0]);
    const duration = getSupportedDuration(interval);

    if (!duration) {
      throw new Error(Errors.UNSUPPORTED_SHIELD_DURATION);
    }

    const type = duration.type;
    const userData = await storage.getItem(command.message.author.id);
    let earlyWarning = getWarningMilliseconds(type, interval, 0.5);
    let finalWarning = getWarningMilliseconds(type, interval);

    if (userHasActiveShield(userData)) {
      throw new Error(Errors.SHIELD_ALREADY_ACTIVE);
    }

    command.message.reply(
      "I will direct message you when your shield is expiring"
    );

    await storage.setItem(
      command.message.author.id,
      {
        shield: {
          id: command.message.author.id,
          user: command.message.author.username,
          type,
          interval,
          earlyWarning: getWarningTime(earlyWarning),
          finalWarning: getWarningTime(finalWarning)
        }
      },
      {
        ttl: moment()
          .add(finalWarning)
          .toDate()
      } as any
    );

    scheduleWarning(earlyWarning, command.message.author);
    scheduleWarning(finalWarning, command.message.author);
  } catch (e) {
    if (e.message === Errors.UNSUPPORTED_SHIELD_DURATION) {
      command.message.reply(
        `${Number(command.options[0])} shield duration is not supported`
      );
    } else if (e.message === Errors.SHIELD_ALREADY_ACTIVE) {
      command.message.reply(
        "You need to wait for the current shield to expire"
      );
    } else {
      command.message.reply("Does not compute!");
    }
  }
};

const scheduleWarning = (warning: number, user: User) => {
  if (warning !== 0) {
    setTimeout(() => {
      user.send("Your shield is about to expire");
    }, warning);
  }
};

const getWarningMilliseconds = (
  type: string,
  interval: number,
  modifier: number = 0
) => {
  switch (type) {
    case ShieldDurationTypes.MINUTES:
      return (interval - modifier) * 60 * 1000;
    case ShieldDurationTypes.HOURS:
      return (interval - modifier) * 60 * 60 * 1000;
    case ShieldDurationTypes.DAYS:
      return (interval - modifier) * 24 * 60 * 60 * 1000;
    default:
      return 0;
  }
};

const getWarningTime = (milliseconds: number) => {
  return moment()
    .add(milliseconds)
    .format();
};

export default shield;
