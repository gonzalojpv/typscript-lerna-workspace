import { z } from "zod";

export const WorkOrderEventSchema = z.object({
  eventId: z.string(),
  location: z.string(),
  jobName: z.string(),
  orderNumber: z.string().default("UNKNOWN"),
  assigneeIds: z.array(z.string()),
  customerName: z.string(),
});

export const JobShareSchema = z.object({
  jobId: z.string(),
  shareEntireJob: z.boolean(),
});

export const webhookPayloadSchema = z.object({
  jobName: z.string(),
  location: z.string(),
  assigneeIds: z.array(z.string()),
  customerName: z.string(),
  workOrderNumber: z.string(),
});
