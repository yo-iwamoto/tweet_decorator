import { supabase } from "../plugins/supabase.ts";
import type { UsersRecord } from "../types/db.ts";
import { TwitterUserCredential } from "../types/twitter.ts";

export const usersApi = {
  /**
   * insert a record to users table
   * @param arg: twitter user credential
   */
  create: async (arg: TwitterUserCredential): Promise<UsersRecord> => {
    const { error, data } = await supabase
      .from<UsersRecord>("users")
      .insert({
        name: arg.name,
        screen_name: arg.screen_name,
        twitter_user_id: arg.id_str,
        image_url: arg.profile_image_url_https,
      })
      .single();

    if (!data || error) throw error;

    return data;
  },

  /**
   * get single record from users table which match with id
   * @param id: record id
   */
  find: async (id: string): Promise<UsersRecord | null> => {
    const { error, data } = await supabase
      .from<UsersRecord>("users")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    return data;
  },

  /**
   * get single record from users table which match with userId
   * @param userId: twitter_user_id in TwitterUserCredential
   */
  findByTwitterUserId: async (
    twitterUserId: string,
  ): Promise<UsersRecord | null> => {
    const { error, data } = await supabase
      .from<UsersRecord>("users")
      .select("*")
      .eq("twitter_user_id", twitterUserId)
      .limit(1);

    if (error) throw error;

    if (data?.length) {
      return data[0];
    } else {
      return null;
    }
  },
};
