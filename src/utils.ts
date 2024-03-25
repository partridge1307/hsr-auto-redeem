export async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export type ResponseType = {
  data: any,
  message: string,
  retcode: number,
}

export async function retryFetch<T>(params: T[], fn: (...args: T[]) => Promise<Response>, retries = 5) {
  try {
    const response = await fn(...params) as Response;
    const serialized = await response.json() as ResponseType

    if (serialized.message !== "OK") {
      if (serialized.retcode === -2017) {
        throw new Error("Code already redeemed");
      }

      throw new Error(serialized.message);
    };

    return response;
  } catch (error) {
    const err = error as Error;
    if (retries === 0) {
      throw new Error(`Failed to fetch data after ${retries} retries`);
    }

    await sleep(5000);

    if (err.message === "Code already redeemed") {
      throw new Error(err.message);
    }

    console.error(`Failed to fetch data: ${err.message}. Retrying in 5 seconds...`);
    return retryFetch(params, fn, retries - 1);
  }
}

export async function notify_via_discord(content: string) {
  const payload = JSON.stringify({
    content
  });

  await fetch(process.env.SCRIPT_DISCORD_WEBHOOK!, {
    method: "POST",
    body: payload,
    headers: {
      "Content-Type": "application/json"
    }
  })
}
