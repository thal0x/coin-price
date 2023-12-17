import { LRUCache } from "lru-cache";
import cachified, { CacheEntry, verboseReporter } from "@epic-web/cachified";
import { getTokenPriceUSD as _getTokenPriceUSD } from "@/cosmos";

const lru = new LRUCache<string, CacheEntry>({ max: 1000 });

export async function getTokenPriceUSD() {
  return cachified({
    key: "token-price",
    cache: lru,
    getFreshValue: _getTokenPriceUSD,
    ttl: 1_000,
    staleWhileRevalidate: 60_000,
  });
}
