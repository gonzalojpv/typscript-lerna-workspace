import Logger from "./utils/logger";

export const createJobShare = (jobShare: string): void => {
  const logger = new Logger();

  logger.info(`Creating ${jobShare} job share.`);
};
