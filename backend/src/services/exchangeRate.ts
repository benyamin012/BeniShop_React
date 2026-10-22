const RATE_URL =
  "https://raw.githubusercontent.com/iran-market/iran-market.github.io/main/data/popular.json";

const CACHE_DURATION = 5 * 60 * 1000;

let cachedRate: number | null = null;
let cachedAt = 0;
let pendingRequest: Promise<number | null> | null = null;

export async function getUsdTomanRate(): Promise<number | null> {
  if (cachedRate !== null && Date.now() - cachedAt < CACHE_DURATION) {
    return cachedRate;
  }

  if (pendingRequest) {
    return pendingRequest;
  }

  pendingRequest = (async () => {
    try {
      const response = await fetch(RATE_URL, {
        signal: AbortSignal.timeout(8000),
      });

      if (!response.ok) {
        throw new Error(`Exchange rate API error: ${response.status}`);
      }

      const payload = await response.json();

      const usd = payload.data?.find(
        (item: { symbol: string }) => item.symbol === "USD_IRR_FREE",
      );

      const rate = Number(usd?.price);

      if (!Number.isFinite(rate) || rate <= 0) {
        throw new Error("Invalid USD exchange rate");
      }

      cachedRate = rate;
      cachedAt = Date.now();

      return cachedRate;
    } catch (error) {
      console.error("Failed to fetch USD rate:", error);

      // Keep using the last valid rate if the provider is unavailable.
      return cachedRate;
    } finally {
      pendingRequest = null;
    }
  })();

  return pendingRequest;
}
