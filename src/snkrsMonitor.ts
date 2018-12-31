import { Twilio } from "./twilio";
import { Request } from "./request";
import { Response, Thread, Cards } from "./snkrsModels";
import * as chalk from "chalk";

/**
 * a monitor to capture changes in Nikes' SNKRS app
 */
export class SnkrsMonitor {
  private content?: Response;
  private nikeRequest: any;
  private twilio: any;
  private mostRecent?: Thread;
  private lastRecent?: Thread;
  private isRestart: boolean;

  constructor() {
    this.nikeRequest = new Request();
    this.twilio = new Twilio();
    this.twilio.setupAccount("Louie", "newAccountSid", "newAuthToken", "+1234567890", "+19876543210"); // edit your account info here
    this.isRestart = true;
  }

  /**
   * start nike snkrs monitor
   */
  public async run(): Promise<void> {
    try {
      this.content = await this.nikeRequest.sendRequest();
      if (this.isNewContent()) {
        if (this.mostRecent === undefined) {
          console.log(`${chalk.default.red("[ERROR]")} Most Recent is undefined`);
          return;
        }
        if (!this.isRestart) {
          /**
           * @todo send message to all registered accounts
           */
          this.twilio.sendMessage("Andi", this.prepareMessage(this.mostRecent));
          this.twilio.sendMessage("Louie", this.prepareMessage(this.mostRecent));
          // this.twilio.sendMessage("Andi", this.prepareMessage(this.mostRecent), this.getCardImageUrl(this.mostRecent)); // send mms
        } else {
          console.log("No message send because monitor restarted");
          this.isRestart = false;
        }
      } else {
        console.log(`No new shoe, date: ${new Date()}`);
      }
    } catch (error) {
      console.log(`An error occured: ${error}`);
    }
  }

  /**
   * check if content changed
   */
  private isNewContent(): boolean {
    if (this.content === undefined) {
      console.log("[ERROR] Content is undefined");
      return false;
    }
    this.mostRecent = this.content.threads[0];
    if (this.getShoeName(this.mostRecent) !== this.getShoeName(this.lastRecent)) {
      console.log(`${chalk.default.green("Most recent card:")} ${this.getShoeName(this.mostRecent)}`);
      console.log(` - url: ${this.getUrl(this.mostRecent)}`);
      console.log(` - name: ${this.getCardName(this.mostRecent)}`);
      console.log(` - card subtitle: ${this.getCardSubtitle(this.mostRecent)}`);
      console.log(` - card title: ${this.getCardTitle(this.mostRecent)}`);
      console.log(` - image: ${this.getCardImageUrl(this.mostRecent)}`);
      console.log(` - tags: ${this.getTags(this.mostRecent)}`);
      console.log(` - publish date: ${this.getPublishDate(this.mostRecent)}`);
      console.log(` - sell date: ${this.getSellDate(this.mostRecent)}`);
      console.log(` - sell status date: ${this.getSellStatus(this.mostRecent)}`);
      this.lastRecent = this.mostRecent;
      return true;
    }
    return false;
  }

  private prepareMessage(data: Thread): string {
    return `Most recent card: ${this.getShoeName(data)} \nSell status" ${this.getSellStatus(data)} ${this.getUrl(data)}`;
  }

  // private openNewShoe(data: Thread): string {
  //   return `${this.getUrl(data)}`;
  // }

  private getCardName(data: Thread): string {
    return data.name;
  }

  private getCardSubtitle(data: Thread): string {
    return data.subtitle;
  }

  private getCardTitle(data: Thread): string {
    return data.title;
  }

  private getCardImageUrl(data: Thread): string {
    return data.imageUrl;
  }

  private getTags(data: Thread): string[] {
    return data.tags;
  }

  private getShoeName(data: Thread | undefined): string {
    if (data === undefined) return "undefined";
    return data.product.title;
  }

  private getPublishDate(data: Thread): string {
    const string = data.publishedDate.toString().split("T");
    const date = string[0];
    const time = string[1].split(".")[0];
    return `${date} at ${time}`;
  }

  private getSellDate(data: Thread): string {
    if (data.product.startSellDate === undefined) return "undefined";
    const string = data.product.startSellDate.toString().split("T");
    const date = string[0];
    const time = string[1].split(".")[0];
    return `${date} at ${time}`;
  }

  private getSellStatus(data: Thread): string {
    const status = data.cards.find(card => card.iOSOnly) as Cards;
    if (status === undefined) return "undefined";
    return status.cta.text;
  }

  private getUrl(data: Thread): string {
    const prefix = `https://www.nike.com/launch/t/`;
    return `${prefix}${data.seoSlug}`;
  }

  // private startSNKRS(): string {
  //   return `https://www.nike.com/launch/t/`;
  // }
}
