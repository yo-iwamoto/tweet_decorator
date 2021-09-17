export type UsersRecord = {
  id: string;
  name: string;
  screen_name: string;
  twitter_user_id: string;
  image_url: string;
  created_at: string;
  updated_at: string;
};

export type HashTagDecoration = "DELETE" | "REMIND";

export type HashTag = {
  id: string;
  user_id: string;
  name: string;
  type: HashTagDecoration;
  created_at: string;
  updated_at: string;
};
