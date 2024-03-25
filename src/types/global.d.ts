declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      SCRIPT_USER_UID: string;
      SCRIPT_USER_COOKIE_TOKEN_V2: string;
      SCRPT_USER_ACCOUNT_ID_V2: string;
      SCRIPT_DISCORD_WEBHOOK?: string;
    }
  }
}

export { };
