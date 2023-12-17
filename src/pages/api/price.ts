import type { NextApiRequest, NextApiResponse } from "next";
import { getTokenPriceUSD } from "@/cached";

export default async function handler(_: NextApiRequest, res: NextApiResponse) {
  try {
    const price = await getTokenPriceUSD();

    res.status(200).json({ price });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }

    res.status(500).json({ message: "failed to fetch price" });
  }
}
