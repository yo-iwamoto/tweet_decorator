import { HmacSha1 } from "https://deno.land/std@0.106.0/hash/sha1.ts";
import { cryptoRandomString } from "https://deno.land/x/crypto_random_string@1.1.0/cryptoRandomString.ts";
import {
  TWITTER_API_CONSUMER_KEY,
  TWITTER_API_CONSUMER_SECRET,
} from "../config/env.ts";
import { encodeOAuthUri } from "./encode.ts";

type Arg = {
  url: string;
  method: "GET" | "POST";
  token: string;
  tokenSecret: string;
};

/**
 * @param url -> full url
 * @param token -> oauth_token
 * @param tokenSecret -> oauth_token_secret
 * @returns already formatted Authorization header for OAuth1.0a
 */
export const buildOAuthHeader = (
  { url, method, token, tokenSecret }: Arg,
): string => {
  const nonce = _randomBase64();
  const timestamp = _timestamp();

  const encUrl = encodeOAuthUri(url);

  const oauthParameter = {
    "oauth_version": "1.0",
    "oauth_signature_method": "HMAC-SHA1",
    "oauth_consumer_key": TWITTER_API_CONSUMER_KEY,
    "oauth_token": token,
    "oauth_nonce": nonce,
    "oauth_timestamp": timestamp,
  };

  // format encoded keys and valuess
  const baseParameter = Object.entries(oauthParameter).map(([key, value]) => {
    return `${encodeOAuthUri(key)}=${encodeOAuthUri(value)}`;
  }).sort().join("&");

  // generate payload and key for signature
  const payload = `${method}&${encUrl}&${encodeOAuthUri(baseParameter)}`;
  const siginingKey = _genSigningKey(tokenSecret);

  // generate signature
  const signature = _sign(payload, siginingKey);

  const oauthHeaderParameter = {
    ...oauthParameter,
    "oauth_signature": signature,
  };

  // format encoded keys and values
  const header = "OAuth " +
    Object.entries(oauthHeaderParameter).map(([key, value]) => {
      return `${encodeOAuthUri(key)}="${encodeOAuthUri(value)}"`;
    }).join(", ");

  return header;
};

/**
 * @param tokenSecret -> Developer's consumer secret
 */
const _genSigningKey = (tokenSecret: string): string => {
  const encConsumerSecret = encodeOAuthUri(TWITTER_API_CONSUMER_SECRET);
  const encTokenSecret = encodeOAuthUri(tokenSecret);
  return `${encConsumerSecret}&${encTokenSecret}`;
};

/**
 * @param payload -> signing payload
 * @param key -> sigining key
 */
const _sign = (payload: string, key: string) => {
  const hasher = new HmacSha1(key);
  const arrayBuffer = hasher.update(payload).arrayBuffer();
  const signature = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
  return signature;
};

const _randomBase64 = (): string => {
  return cryptoRandomString({ length: 42, type: "base64" });
};

const _timestamp = (): string => Date.now().toString().slice(0, 10);
