import Logger from "xyz/src/utils/logger";
import { startWorkOrderReadyFlow } from "xyz/src";

export const initWorkOrderReadyFlow = () => {
  const logger = new Logger();
  logger.info("Starting Work Order Ready Flow");

  startWorkOrderReadyFlow("123");

  return "All Done";
};
