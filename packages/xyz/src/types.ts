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
