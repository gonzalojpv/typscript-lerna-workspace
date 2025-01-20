import { WorkOrderReadyEvent, Job } from "./types";
import Logger from "./utils/logger";
import { delay } from "./utils/helper";
import data from "./utils/data.json";
import find from "lodash/find";
import { v4 as uuidv4 } from "uuid";

export const createJob = async (
  workOrderReadyEvent: WorkOrderReadyEvent,
): Promise<Job> => {
  const now = new Date();
  const logger = new Logger();

  logger.log("Creating job...", workOrderReadyEvent);

  await delay(1000);

  logger.log("Job created!");

  return {
    jobId: uuidv4(),
    jobName: workOrderReadyEvent.jobName,
    location: workOrderReadyEvent.location,
    assigneeIds: workOrderReadyEvent.assigneeIds,
    customerName: workOrderReadyEvent.customerName,
    workOrderNumber: workOrderReadyEvent.orderNumber,
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    status: "in-progress",
  };
};

export const getJobs = (): Job[] => {
  return data as Job[];
};

export const getJobById = async (jobId: string) => {
  const logger = new Logger();

  logger.info("Getting job by id...", { jobId });

  await delay(500);

  logger.info("Job found!", { jobId });

  return find(data, ["jobId", jobId]) as Job | undefined;
};
