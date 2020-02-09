import { Message } from "discord.js";
import { DateTime, Interval } from "luxon";

const firstQuest = DateTime.fromISO("2018-02-13T06:00:00Z");

const quests = (message: Message, storage: any) => {
  const current = DateTime.local();
  const interval = Interval.fromDateTimes(firstQuest, current).length("hours");

  const currentQuestBlock = getCurrentQuestBlock(interval);
  const timeLeftInCurrentQuest = getTimeLeftInCurrentQuest(interval);
  const secondsLeftInCurrentQuest = getSecondsLeftInCurrentQuest(
    timeLeftInCurrentQuest
  );
  const minutesLeftInCurrentQuest = Math.floor(timeLeftInCurrentQuest);

  const q = [...Array(11).keys()]
    .map(idx => {
      const questIndex =
        currentQuestBlock + idx > 11
          ? currentQuestBlock + idx - 11
          : currentQuestBlock + idx;

      const quest = findQuest(questIndex);

      const minutesLeftInSelectedQuest =
        idx == 0 ? 0 : minutesLeftInCurrentQuest + 60 * (idx - 1);

      return createCard(
        current,
        quest,
        minutesLeftInSelectedQuest,
        secondsLeftInCurrentQuest
      );
    })
    .map((quest, idx) =>
      idx === 0
        ? `${quest.quest} currently active`
        : `${quest.quest} starts in ${quest.hoursTillQuestStarts} hours ${quest.minutesTillQuestStarts} minutes ${quest.secondsTillQuestStarts} seconds`
    )
    .reduce((acc, cur) => acc + "\n" + cur);
  message.reply(q);
};

const findQuest = (k: any) => {
  switch (k) {
    case 1:
      return "Resource Gathering";
    case 2:
      return "Troop Training";
    case 3:
      return "Resource Gathering";
    case 4:
      return "Research";
    case 5:
      return "Troop Training";
    case 6:
      return "Monster Slaying";
    case 7:
      return "Might Growth";
    case 8:
      return "Resource Gathering";
    case 9:
      return "Dragon Growth";
    case 10:
      return "Monster Slaying";
    case 11:
      return "Might Growth";
    default:
      return "ERROR";
  }
};

const createCard = (
  current: DateTime,
  quest: any,
  minutes: any,
  seconds: any
) => {
  const questStartTime = current.plus({ minutes, seconds: seconds + 1 });

  let hoursTillQuestStarts = 0;
  let minutesTillQuestStarts = 0;
  let secondsTillQuestStarts = 0;

  if (minutes > 60) {
    hoursTillQuestStarts = Math.floor(minutes / 60);
    minutesTillQuestStarts = Math.round(
      (minutes / 60 - hoursTillQuestStarts) * 60
    );
    secondsTillQuestStarts = seconds;
  } else if (minutes !== 0) {
    minutesTillQuestStarts = minutes;
    secondsTillQuestStarts = seconds;
  }

  return {
    quest,
    hoursTillQuestStarts,
    minutesTillQuestStarts,
    secondsTillQuestStarts,
    questStartTimeString: questStartTime.toLocaleString(DateTime.TIME_SIMPLE)
  };
};

const getCurrentQuestBlock = (interval: number) => Math.ceil(interval % 11);

const getTimeLeftInCurrentQuest = (interval: number) =>
  (Math.ceil(interval) - interval) * 60;

const getSecondsLeftInCurrentQuest = (timeLeftInCurrentQuest: number) =>
  Math.round(
    (timeLeftInCurrentQuest - Math.floor(timeLeftInCurrentQuest)) * 60
  );

export default quests;
