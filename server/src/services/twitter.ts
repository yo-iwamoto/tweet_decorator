import { ky } from "../plugins/ky.ts";

export const twitterApi = {
  /**
   * @param tweet id
   * @returns any
   */
  getTweet: async (id: string): Promise<any> => {
    const res = await ky.get(`https://api.twitter.com/2/tweets/${id}`)
      .then((res) => res.json())
      .catch(console.error);
    return res.data;
  },

  /**
   * @param tweet id
   * @returns any
   */
  destroyTweet: async (id: string): Promise<any> => {
    const res = await ky.post(
      `https://api.twitter.com/1.1/statuses/destroy/${id}.json`,
    )
      .then((res) => res.json())
      .catch(console.error);
    return res;
  },
};
