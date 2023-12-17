import { Inter } from "next/font/google";
import PricePage from "@/components/PricePage";
import {
  DehydratedState,
  HydrationBoundary,
  QueryClient,
  dehydrate,
  useQuery,
} from "@tanstack/react-query";
import { getTokenPriceUSD } from "@/cached";
import { NextPage } from "next";
import { getCW20TokenSupply, getTokenSupply } from "@/cosmos";
import Head from "next/head";
import { TOKEN_SYMBOL } from "@/constants";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["price"],
    queryFn: async () => {
      const price = await getTokenPriceUSD();

      return { price };
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["supply"],
    queryFn: getTokenSupply,
  });

  const dehydratedState = dehydrate(queryClient);

  return {
    props: {
      dehydratedState,
    },
  };
}

function Home() {
  const { data: priceData } = useQuery({
    queryKey: ["price"],
    queryFn: async () => {
      const res = await fetch("/api/price");

      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.message);
      }

      return json;
    },
  });

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 6,
  }).format(priceData?.price ?? 0);

  return (
    <main className={`${inter.className}`}>
      <Head>
        <title>{`${TOKEN_SYMBOL} Price (${formattedPrice})`}</title>
      </Head>
      <PricePage />
    </main>
  );
}

const HomeRoute: NextPage<{
  dehydratedState: DehydratedState;
}> = ({ dehydratedState }) => {
  return (
    <HydrationBoundary state={dehydratedState}>
      <Home />
    </HydrationBoundary>
  );
};

export default HomeRoute;
