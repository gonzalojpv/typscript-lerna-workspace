import Logger from "./utils/logger";
import { JobShareInput } from "./types";
import { delay } from "./utils/helper";

export const createJobShare = async (
  jobShare: JobShareInput,
): Promise<boolean> => {
  const logger = new Logger();
  logger.info(`Creating job share.`, { jobShare });

  await delay(500);

  return true;
};
