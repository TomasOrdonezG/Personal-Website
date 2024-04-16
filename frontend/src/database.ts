import axios from "axios";
import { BACKEND_URL } from "./config";
import { ContactEmailInfo } from "./models";

export class Photography {
  private static PHOTOGRAPHY_URL: string = `${BACKEND_URL}/photography`;

  public static async getFromCollection(collection: string): Promise<string[] | undefined> {
    try {
      const response = await axios.get(`${this.PHOTOGRAPHY_URL}/${collection}`);
      return response.data.images;
    } catch (err) {
      console.error(err);
    }
  }
}

export class Contact {
  private static CONTACT_URLS = `${BACKEND_URL}/contact`;

  public static async sendEmail(contactEmailInfo: ContactEmailInfo) {
    await axios.post(`${this.CONTACT_URLS}/email`, contactEmailInfo).catch((err) => console.error(err));
  }
}
