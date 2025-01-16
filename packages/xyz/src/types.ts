import { z } from "zod";
import { WorkOrderEventSchema } from "./schemas";

export type WorkOrderReadyEvent = z.infer<typeof WorkOrderEventSchema>;

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

export interface JobCounterpart {
  id: string;
  jobId: string;
  assignee: string;
  workOrderNumber: string;
  customer: Customer;
  location: Location;
  contributeToJobDeepLinkUrl?: string;
  entireJobShareLinkUrl?: string;
  customerJobShareLinkUrl?: string;
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
