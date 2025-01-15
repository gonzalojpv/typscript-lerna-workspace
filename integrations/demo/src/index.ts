import { initWorkOrderReadyFlow } from "./executionHandlers/createJobFlow";
import Logger from "xyz/src/utils/logger";

const netSuiteXyzFlow = () => {
  const logger = new Logger();

  logger.log("NetSuite XYz Flow");

  initWorkOrderReadyFlow();
};

netSuiteXyzFlow();
