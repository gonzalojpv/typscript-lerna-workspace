import { createJob } from "./job";
import { createJobShare } from "./share";

import Logger from "./utils/logger";

export const startWorkOrderReadyFlow = (workOrderId: string): void => {
  const logger = new Logger();

  logger.log(`Create the job: ${workOrderId}`);

  createJob();
  logger.info("Create Customer Job Share");
  createJobShare("Customer");
  logger.info("Create Entire Job Share");
  createJobShare("Entire");

  logger.log(
    `The job has been created and shared successfully.: ${workOrderId}`
  );
};
