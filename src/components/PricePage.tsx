import { useQuery } from "@tanstack/react-query";
import HeroSection from "./HeroSection";
import { getTokenSupply } from "@/cosmos";
import { stat } from "fs";
import MarketCapDisplay from "./MarketCapDisplay";

const PricePage = () => {
  const {
    data: priceData,
    status: priceQueryStatus,
    error,
  } = useQuery({
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

  const { data: tokenSupply, status: supplyQueryStatus } = useQuery({
    queryKey: ["supply"],
    queryFn: getTokenSupply,
  });

  return (
    <div className="pt-16 px-4 max-w-screen-sm mx-auto">
      <div className="pb-6">
        <HeroSection
          error={error}
          price={priceData?.price ?? 0}
          isLoading={priceQueryStatus === "pending"}
        />
      </div>
      {priceQueryStatus === "success" && supplyQueryStatus === "success" && (
        <div className="pb-6">
          <MarketCapDisplay price={priceData.price ?? 0} supply={tokenSupply} />
        </div>
      )}
    </div>
  );
};

export default PricePage;
