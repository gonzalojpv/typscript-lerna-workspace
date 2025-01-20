import { initWorkOrderReadyFlow } from "./executionHandlers/createJobFlow";
import Logger from "xyz/src/utils/logger";

const netSuiteXyzFlow = () => {
  const logger = new Logger();

  const webhookPayload = {
    jobName: "Install New HVAC System",
    location: "1234 Main St, Springfield",
    assigneeIds: ["user1", "user2"],
    customerName: "John Doe",
    workOrderNumber: "WO-00123",
  };

  logger.log("NetSuite XYz Flow");

  initWorkOrderReadyFlow(webhookPayload);
};

netSuiteXyzFlow();
