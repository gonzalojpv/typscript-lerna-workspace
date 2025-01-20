import { createJob } from "./job";
import { createJobShare } from "./share";
import { WebhookPayload } from "./types";

import Logger from "./utils/logger";

export const startWorkOrderReadyFlow = async (
  payload: WebhookPayload,
): Promise<void> => {
  const logger = new Logger();

  logger.log(`Create the job:`, { payload });

  const job = await createJob({
    ...payload,
    eventId: "",
    orderNumber: payload.workOrderNumber,
  });

  logger.info("Create Customer Job Share", { job });

  createJobShare({
    jobId: job.jobId,
    shareEntireJob: true,
  });

  logger.info("Create Entire Job Share");

  createJobShare({
    jobId: job.jobId,
    shareEntireJob: false,
  });

  logger.log(`The job has been created and shared successfully:`);
};
