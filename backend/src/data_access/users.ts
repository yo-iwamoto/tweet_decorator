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
  find: async (id: string): Promise<UsersRecord> => {
    const { error, data } = await supabase
      .from<UsersRecord>("users")
      .select("*")
      .eq("id", id)
      .single();

    if (!data || error) throw error;

    return data;
  },
};
