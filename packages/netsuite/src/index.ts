import OAuth from "oauth-1.0a";
import Logger from "xyz/src/utils/logger";

interface NetSuiteClientConfig {
  consumerKey: string;
  consumerSecret: string;
  tokenId: string;
  tokenSecret: string;
  netSuiteBaseUrl: string;
  realm: string;
}

class NetSuiteClient {
  private logger: Logger;
  private config: NetSuiteClientConfig;
  private oauth: OAuth;
}

export default NetSuiteClient;
