import { load } from "cheerio";

const CRAWL_SITE = "https://www.prydwen.gg/star-rail";
const API_QUERY = "https://sg-hkrpg-api.hoyoverse.com/common/apicdkey/api/webExchangeCdkey?lang=en&game_biz=hkrpg_global&region=prod_official_asia"

export async function getCodes(): Promise<string[]> {
  const response = await fetch(CRAWL_SITE, {
    method: "GET",
    headers: {
      Connection: "keep-alive",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Encoding": "gzip, deflate, br",
    },
  });
  const rawHtml = await response.text();
  const $ = load(rawHtml);

  const codes_section = $("div.content.hsr > div.codes > div.box.centered");

  return codes_section.map((_, el) => {
    const code = $(el).find(".code").text();
    return code;
  }).get()
};

export async function redeem(code: string, cookie: string, user_uid: string): Promise<Response> {
  let headers = {
    Cookie: cookie,
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
    "Content-Type": "application/json",
    Referer: "https://act.hoyolab.com/",
    Origin: "https://act.hoyolab.com",
    Connection: "keep-alive",
    Accept: "application/json, text/plain, */*",
    Accept_Encoding: "gzip, deflate, br",
  };

  const query = `${API_QUERY}&cdkey=${code}&uid=${user_uid}&t=${Date.now()}`;

  const response = await fetch(query, {
    headers,
  });

  return response
}

