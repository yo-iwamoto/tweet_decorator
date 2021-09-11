// deno-lint-ignore-file
export type Tweet = {
  id: string;
  entities?: {
    hashtags?: TweetHashtag[];
  };
  author_id?: string;
  source?: TwitterSource;
  attachments?: {
    media_keys: string[];
  };
  text?: string;
  created_at: string;
  possibly_sensitive: boolean;
};

type TweetHashtag = {
  start: number;
  end: number;
  tag: string;
};

type TwitterSource =
  | "Twitter for Advertisers"
  | "Twitter for iPhone"
  | "Twitter for Android";
