import Image from "next/image";
import { SWAP_LINK, TOKEN_SYMBOL } from "@/constants";
import Spinner from "./Spinner";

const HeroSection = ({
  error,
  isLoading,
  price,
}: {
  error: Error | null;
  price: number;
  isLoading?: boolean;
}) => {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 6,
  }).format(price);

  return (
    <div className="space-y-6">
      <Image
        alt={`${TOKEN_SYMBOL} logo`}
        className="w-52 mx-auto"
        src="/logo.png"
        width={208}
        height={208}
        priority
      />
      <div className="space-y-2">
        <p className="text-center font-black text-xl">
          <a
            className="text-cyan-400 underline"
            href={SWAP_LINK}
            target="_blank"
            rel="noreferrer"
          >
            {TOKEN_SYMBOL}
          </a>{" "}
          Price
        </p>
        {isLoading ? (
          <div className="flex justify-center items-end h-10">
            <Spinner />
          </div>
        ) : (
          <p className="font-medium text-4xl text-center">
            {formattedPrice} USD
          </p>
        )}
        {error ? (
          <div className="pt-2">
            <div className="bg-red-50 text-red-500 font-medium text-center px-4 py-2 rounded-lg border border-red-400 border-b-2">
              <p>{error.message}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default HeroSection;
