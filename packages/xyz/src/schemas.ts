import { z } from "zod";

export const WorkOrderEventSchema = z.object({
  eventId: z.string(),
  location: z.string(),
  orderNumber: z.string().default("UNKNOWN"),
  assigneeIds: z.array(z.string()),
  customerName: z.string(),
});
