import OAuth from "oauth-1.0a";
import * as crypto from "crypto-js";
import Logger from "xyz/src/utils/logger";
import { AxiosResponse } from "axios";
import { isError, isAxiosError } from "xyz/src/type-guards";
import { createClient } from "xyz/src/utils/client";
import {
  TaskResponse,
  EmployeeResponse,
  CaseResponse,
  WorkSummaryNetSuite,
  WebhookResponse,
} from "./types";

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

  constructor(config: NetSuiteClientConfig, logger: Logger) {
    this.config = config;
    this.logger = logger;

    this.oauth = new OAuth({
      consumer: { key: config.consumerKey, secret: config.consumerSecret },
      signature_method: "HMAC-SHA256",
      hash_function: (baseString, key) =>
        crypto.HmacSHA256(baseString, key).toString(crypto.enc.Base64),
    });
  }

  private getAuthHeader(url: string, method: string): string {
    const requestData = { url, method };
    const token = { key: this.config.tokenId, secret: this.config.tokenSecret };
    const oauthData = this.oauth.authorize(requestData, token);

    // Build the Authorization header string manually, since the oauth library doesn't support realm
    const authHeader =
      `OAuth realm="${this.config.realm}",` +
      `oauth_consumer_key="${oauthData.oauth_consumer_key}",` +
      `oauth_token="${oauthData.oauth_token}",` +
      `oauth_signature_method="${oauthData.oauth_signature_method}",` +
      `oauth_timestamp="${oauthData.oauth_timestamp}",` +
      `oauth_nonce="${oauthData.oauth_nonce}",` +
      `oauth_version="1.0",` +
      `oauth_signature="${encodeURIComponent(oauthData.oauth_signature)}"`;

    return authHeader;
  }

  private async request<T>(
    method: string,
    endpoint: string,
    data?: unknown,
  ): Promise<T> {
    const response = await this.requestWithFullResponse<T>(
      method,
      endpoint,
      data,
    );
    return response.data;
  }

  private async requestWithFullResponse<T>(
    method: string,
    endpoint: string,
    data?: unknown,
  ): Promise<AxiosResponse<T>> {
    const baseUrl = `${this.config.netSuiteBaseUrl}`;
    const url = `services/rest/record/v1${endpoint}`;

    const authHeader = this.getAuthHeader(`${baseUrl}/${url}`, method);

    const headers = {
      Authorization: authHeader,
      "Content-Type": "application/json",
      "User-Agent": "NetSuite-NodeApp",
      Accept: "application/json",
    };

    const client = createClient({
      baseUrl,
      headers,
    });

    const params = {
      method,
      url,
      data,
    };

    try {
      return await client.request<T>(params);
    } catch (error) {
      if (isError(error)) {
        this.logger.error(`Request failed: ${error.message}`);
        return Promise.reject(error);
      } else if (isAxiosError(error)) {
        this.logger.error(
          `Axios Request failed: ${error.response?.status} - ${JSON.stringify(
            error.response?.data,
          )}`,
        );
        return Promise.reject(error);
      }

      this.logger.error(`Unexpected error: ${error}`);
      return Promise.reject(error as Error);
    }
  }

  async getTask(taskId: string): Promise<TaskResponse> {
    try {
      const response = await this.request<TaskResponse>(
        "GET",
        `/task/${taskId}`,
      );
      return response;
    } catch (error) {
      return Promise.reject(error as Error);
    }
  }

  async getEmployee(employeeId: string): Promise<EmployeeResponse> {
    try {
      const response = await this.request<EmployeeResponse>(
        "GET",
        `/employee/${employeeId}`,
      );
      return response;
    } catch (error) {
      return Promise.reject(error as Error);
    }
  }
  async getCase(caseId: string): Promise<CaseResponse> {
    try {
      const response = await this.request<CaseResponse>(
        "GET",
        `/supportcase/${caseId}`,
      );
      return response;
    } catch (error) {
      return Promise.reject(error as Error);
    }
  }

  async updateCase(caseId: string, data: unknown): Promise<CaseResponse> {
    try {
      const response = await this.request<CaseResponse>(
        "PUT",
        `/supportcase/${caseId}`,
        data,
      );
      return response;
    } catch (error) {
      return Promise.reject(error as Error);
    }
  }

  async createWorkSummary(data: WorkSummaryNetSuite): Promise<AxiosResponse> {
    try {
      return await this.requestWithFullResponse<CaseResponse>(
        "POST",
        `/customrecord_xoi_worksummary`,
        data,
      );
    } catch (error) {
      return Promise.reject(error as Error);
    }
  }

  async updateTask(taskId: string, data: unknown): Promise<TaskResponse> {
    try {
      const response = await this.request<TaskResponse>(
        "PATCH",
        `/task/${taskId}`,
        data,
      );
      return response;
    } catch (error) {
      return Promise.reject(error as Error);
    }
  }

  async fetchWebhook(webhookId: string): Promise<WebhookResponse> {
    try {
      const response = await this.request<WebhookResponse>(
        "GET",
        `/customrecord_mhi_xoi_integration/${webhookId}`,
      );
      return response;
    } catch (error) {
      return Promise.reject(error as Error);
    }
  }

  async updateWebhook(webhookId: string, data: unknown): Promise<number> {
    try {
      const response = await this.request<number>(
        "PATCH",
        `/customrecord_mhi_xoi_integration/${webhookId}`,
        data,
      );
      return response;
    } catch (error) {
      return Promise.reject(error as Error);
    }
  }
}

export default NetSuiteClient;
