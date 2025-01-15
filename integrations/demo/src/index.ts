import { initWorkOrderReadyFlow } from "./executionHandlers/createJobFlow";

const netSuiteXyzFlow = () => {
  console.log("NetSuite XYz Flow");

  initWorkOrderReadyFlow();
};

netSuiteXyzFlow();
