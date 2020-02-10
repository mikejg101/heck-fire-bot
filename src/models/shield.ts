export enum ShieldDurations {
  ONE_MINUTE = "ONE_MINUTE",
  FOUR_HOURS = "FOUR_HOURS",
  EIGHT_HOURS = "EIGHT_HOURS",
  TWELVE_HOURS = "TWELVE_HOURS",
  TWENTY_FOUR_HOURS = "TWENTY_FOUR_HOURS",
  THREE_DAYS = "THREE_DAYS",
  SEVEN_DAYS = "SEVEN_DAYS"
}

export enum ShieldDurationTypes {
  MINUTES = "MINUTES",
  HOURS = "HOURS",
  DAYS = "DAYS"
}

export const supportedShieldTypes = {
  1: {
    interval: 1,
    duration: ShieldDurations.ONE_MINUTE,
    type: ShieldDurationTypes.MINUTES
  },
  4: {
    interval: 4,
    duration: ShieldDurations.FOUR_HOURS,
    type: ShieldDurationTypes.HOURS
  },
  8: {
    interval: 8,
    duration: ShieldDurations.EIGHT_HOURS,
    type: ShieldDurationTypes.HOURS
  },
  12: {
    interval: 12,
    duration: ShieldDurations.TWELVE_HOURS,
    type: ShieldDurationTypes.HOURS
  },
  24: {
    interval: 24,
    duration: ShieldDurations.TWENTY_FOUR_HOURS,
    type: ShieldDurationTypes.HOURS
  },
  3: {
    interval: 3,
    duration: ShieldDurations.THREE_DAYS,
    type: ShieldDurationTypes.DAYS
  },
  7: {
    interval: 7,
    duration: ShieldDurations.SEVEN_DAYS,
    type: ShieldDurationTypes.DAYS
  }
};