import * as requestPromise from "request-promise-native";
import { Response } from "./snkrsModels";

/**
 * create http request
 */
export class Request {
  private body?: Response;
  private options = {
    url: NikeRequest.nikeHost + NikeRequest.nikeContentPathPreFilled,
    method: HttpMethods.get,
    headers: {
      "x-nike-caller-id": "nike:snkrs:ios:3.5",
      "Content-Type": "application/json",
      // tslint:disable-next-line:prettier
      "Authorization":
        "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6Ijc2YWI1NThkLWMwZTMtNGVhYi05MTljLTJkYjA3YjFjN2NhMHNpZyJ9.eyJpYXQiOjE1MzU3NTY3OTEsImV4cCI6MTUzNTc2MDM5MSwiaXNzIjoib2F1dGgyYWNjIiwianRpIjoiMTkzYjM0ZmMtZWNiYi00MzU2LWE2M2EtMmQ5NmFiYWU1MGRmIiwibGF0IjoxNTM0MDA1MjgzLCJhdWQiOiJjb20ubmlrZS5kaWdpdGFsIiwic3ViIjoiY29tLm5pa2UuY29tbWVyY2Uuc25rcnMuaW9zIiwic2J0IjoibmlrZTphcHAiLCJzY3AiOlsiY29tbWVyY2UiXSwicHJuIjoiNTVkZjhhMTQtNTdiOC00OWI5LTk3M2EtNjk5OGRkODkxNzQyIiwicHJ0IjoibmlrZTpwbHVzIn0.EielPkkhMVMFRswknOmovDjQQi2oztA0fUfc702EYxQuZEiEEUDfWlMq-ug5zdAYnLrwfO0Q4evULf8HFko7RTuv6Sbk7ThhTlLQEEQ0oO-Ev4yRbHiwOf6sfIZZKBWrW3swBrkOL2kG_zeCwA6l3aeft2RPQXKDSZnApgxFDe5LIUFuVSnXb5ru3FtbULmc8EfrAJTDd0pmdwhBH97Yiu0-7QJF7tunMrMfEt6a9-5CKXAHYxQ2dCKEDq4cCAwXIqBrbOaKkTkh9r9fjoO0uxXDu3YXsFR3qZUIXOPg60K-pbpv-EohXaYeZa1UAUzfWhBdWvKKFLxJ4lPkBPmjKw",
      "x-newrelic-id": "VQYGVF5SCBADUVBRBgAGVg==",
      "user-agent": "SNKRS/3.5.0 (iPhone; iOS 12.0; Scale/3.00)",
      "accept-language": "en-US;q=1, de-US;q=0.9"
    }
  };

  /**
   * send request to nike api
   * @returns list of recent shoe cards
   */
  public async sendRequest(): Promise<Response> {
    try {
      const response = await requestPromise(this.options);
      this.body = JSON.parse(response);
      return this.body as Response;
    } catch (error) {
      throw new Error(`Request failed because ${error}`);
    }
  }
}

/**
 * enum for nike request
 */
export enum NikeRequest {
  nikeHost = "https://api.nike.com",
  nikeContentPathPreFilled = "/snkrs/content/v1/?&country=US&language=en&offset=0&orderBy=published"
}

/**
 * enum for http methods
 */
export enum HttpMethods {
  get = "GET",
  post = "POST",
  put = "PUT",
  delete = "DELETE"
}
