import { z } from "zod";
import {
  WorkOrderEventSchema,
  JobShareSchema,
  webhookPayloadSchema,
} from "./schemas";

export type WorkOrderReadyEvent = z.infer<typeof WorkOrderEventSchema>;
export type JobShareInput = z.infer<typeof JobShareSchema>;
export type WebhookPayload = z.infer<typeof webhookPayloadSchema>;

export interface Customer {
  name: string;
  email: string;
}

export interface Location {
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
}

export interface Job {
  jobId: string;
  jobName: string;
  location: string;
  assigneeIds: string[];
  customerName: string;
  workOrderNumber: string;
  status: "in-progress" | "completed" | "pending";
  createdAt: string;
  updatedAt: string;
}
