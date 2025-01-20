import Logger from "xyz/src/utils/logger";
import { startWorkOrderReadyFlow } from "xyz/src";
import { WebhookPayload } from "xyz/src/types";

export const initWorkOrderReadyFlow = (webhookPayload: WebhookPayload) => {
  const logger = new Logger();
  logger.info("Starting Work Order Ready Flow");

  startWorkOrderReadyFlow(webhookPayload);

  return "All Done";
};
