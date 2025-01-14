import { z } from "zod";
import {
  TaskSchema,
  EmployeeSchema,
  CaseSchema,
  WorkSummaryNetSuiteSchema,
  WebhookSchema,
} from "./schemas";

export type TaskResponse = z.infer<typeof TaskSchema>;
export type EmployeeResponse = z.infer<typeof EmployeeSchema>;
export type CaseResponse = z.infer<typeof CaseSchema>;
export type WebhookResponse = z.infer<typeof WebhookSchema>;
export type WorkSummaryNetSuite = z.infer<typeof WorkSummaryNetSuiteSchema>;
