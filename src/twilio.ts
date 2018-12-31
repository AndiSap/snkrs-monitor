import * as twilio from "twilio";
import * as chalk from "chalk";

/**
 * setup and send a message via twilio
 */
export class Twilio {
  private defaultAccountSid = "defaultAccountSid"; // Your Account SID from www.twilio.com/console
  private defaultAuthToken = "defaultAuthToken"; // Your Auth Token from www.twilio.com/console
  private defaultPhoneNumber = "+12222222222";
  private defaultTwilioNumber = "+13333333333";
  private accounts: Account[] = [];

  constructor() {}

  /**
   * add a new twilio account to account list (DEFAULT: my own)
   * @param name name user new user
   * @param accountSid accound sid from twilio (trial?)
   * @param authToken auth token from twilio
   * @param phoneNumber phone number of new user
   * @param twilioNumber phone number of twilio trial
   */
  public setupAccount(
    name: string = "Andi",
    accountSid: string = this.defaultAccountSid,
    authToken: string = this.defaultAuthToken,
    phoneNumber: string = this.defaultPhoneNumber,
    twilioNumber: string = this.defaultTwilioNumber
  ): void {
    const client = twilio(accountSid, authToken);
    this.accounts.push({ client, name, accountSid, authToken, phoneNumber, twilioNumber });
  }

  /**
   * send message to number
   * @param accountName to which account is the message being sent
   * @param body optional - text message being sent - error case as default
   * @todo handle accounts internally in this class
   */
  public sendMessage(accountName: string, body?: string /*, mediaUrl?: string*/): void {
    const account = this.accounts.find(account => account.name === accountName);
    if (account === undefined) {
      throw new Error(`Twilio::: setup account before sending a message`);
    }
    let text: string = "MONITOR DOWN";
    if (body !== undefined) {
      text = body;
    }
    // if (mediaUrl !== undefined) { // sending a mms
    //   account.client.messages.create({
    //     mediaUrl,
    //     body: text,
    //     to: account.phoneNumber, // text this number
    //     from: this.defaultTwilioNumber // From a valid Twilio number
    //   });
    // } else {
    account.client.messages.create({
      body: text,
      to: account.phoneNumber, // text this number
      from: account.twilioNumber // From a valid Twilio number
    });
    // }
    console.log(`Message "${text}" send on ${new Date()} to ${chalk.default.yellow(account.name)}`);
  }
}

/**
 * Interface for accounts
 */
export interface Account {
  client: any;
  name: string;
  accountSid: string;
  authToken: string;
  phoneNumber: string;
  twilioNumber: string;
}
