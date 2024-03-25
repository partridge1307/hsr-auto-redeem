import "dotenv/config";
import { JSONFilePreset } from "lowdb/node";
import { getCodes, redeem } from "./redeem";
import { notify_via_discord, retryFetch } from "./utils";
import http from "http";
import { schedule } from "node-cron";

const COOKIE = `cookie_token_v2=${process.env.SCRIPT_USER_COOKIE_TOKEN_V2}; account_id_v2=${process.env.SCRPT_USER_ACCOUNT_ID_V2}`;

const db = await JSONFilePreset("db.json", { redeemed_codes: [] as string[] });
const redeemed_codes = db.data.redeemed_codes;

async function start_redeem(has_discord_wh: boolean, callback: (content: string) => Promise<void>) {
  console.log("Fetching codes...");
  const codes = await getCodes();

  for (const code of codes) {
    console.log(`Checking code: ${code}`);
    if (redeemed_codes.includes(code)) continue;

    has_discord_wh && await callback(`Code not redeemed: ${code}. Try redeeming it now.`);

    try {
      await retryFetch([code, COOKIE, process.env.SCRIPT_USER_UID], redeem);

      redeemed_codes.push(code);
      db.write();

      has_discord_wh && await callback(`Redeemed code: ${code}`);
    } catch (error) {
      let err = error as Error;

      if (err.message === "Code already redeemed") {
        redeemed_codes.push(code);
        db.write();

        has_discord_wh && await callback(`Code already redeemed: ${code}`);
        console.error(err.message);
      } else {
        has_discord_wh && await callback(`Failed to redeem code: ${code}`);
        console.error(err.message);
      }
    }
  }
}

async function schedule_function() {
  console.log("Start redeem...");
  !!process.env.SCRIPT_DISCORD_WEBHOOK && notify_via_discord("Start redeem...");
  await start_redeem(!!process.env.SCRIPT_DISCORD_WEBHOOK, notify_via_discord);
}


schedule("* */2 * * *", schedule_function, {
  scheduled: true,
  timezone: "Asia/Ho_Chi_Minh"
}); // Run every 2 hours
console.log("Cron job started.");

http.createServer((_, res) => {
  res.end("Pong");
}).listen(8080);
