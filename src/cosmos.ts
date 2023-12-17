import {
  BASE_TOKEN_COINGECKO_ID,
  BASE_TOKEN_DECIMALS,
  POOL_ADDRESS,
  RPC_URL,
  TOKEN_ADDRESS,
  TOKEN_DECIMALS,
  TOKEN_TYPE,
} from "@/constants";
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { setupBankExtension, QueryClient } from "@cosmjs/stargate";
import { Tendermint37Client } from "@cosmjs/tendermint-rpc";
import { ethers } from "ethers";

export async function getTokenSupply() {
  if (TOKEN_TYPE === "native") {
    return getNativeTokenSupply();
  }

  return getCW20TokenSupply();
}

export async function getNativeTokenSupply(): Promise<string> {
  const tmClient = await Tendermint37Client.connect(RPC_URL);
  const client = QueryClient.withExtensions(tmClient, setupBankExtension);

  const response = await client.bank.supplyOf(TOKEN_ADDRESS);

  return response.amount;
}

export async function getCW20TokenSupply(): Promise<string> {
  const client = await CosmWasmClient.connect("https://terra-rpc.polkachu.com");

  const response = await client.queryContractSmart(
    "terra1nsuqsk6kh58ulczatwev87ttq2z6r3pusulg9r24mfj2fvtzd4uq3exn26",
    {
      token_info: {},
    }
  );

  return response.total_supply;
}

export async function getTokenPriceUSD() {
  const [poolPrice, baseTokenUSD] = await Promise.all([
    getTokenPoolPrice(),
    getBaseTokenUSD(),
  ]);

  return poolPrice * baseTokenUSD;
}

async function getTokenPoolPrice() {
  const client = await CosmWasmClient.connect(RPC_URL);

  const response = await client.queryContractSmart(POOL_ADDRESS, {
    simulation: {
      offer_asset: {
        info: {
          native_token:
            TOKEN_TYPE === "native"
              ? {
                  denom: TOKEN_ADDRESS,
                }
              : undefined,
          token:
            TOKEN_TYPE === "cw20"
              ? { contract_addr: TOKEN_ADDRESS }
              : undefined,
        },
        amount: ethers.parseUnits("1", TOKEN_DECIMALS).toString(),
      },
    },
  });

  return parseFloat(
    ethers.formatUnits(response.return_amount, BASE_TOKEN_DECIMALS)
  );
}

async function getBaseTokenUSD(): Promise<number> {
  const res = await fetch(
    `https://coins.llama.fi/prices/current/coingecko:${BASE_TOKEN_COINGECKO_ID}`
  );
  const data = await res.json();

  return data.coins[`coingecko:${BASE_TOKEN_COINGECKO_ID}`].price;
}
