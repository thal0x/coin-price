import { TOKEN_DECIMALS } from "@/constants";
import { ethers } from "ethers";

const MarketCapDisplay = ({
  price,
  supply,
}: {
  price: number;
  supply: string;
}) => {
  const supplyNumber = parseFloat(ethers.formatUnits(supply, TOKEN_DECIMALS));

  const marketCap = price * supplyNumber;

  const formattedMarketCap = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(marketCap);

  return (
    <div>
      <p className="text-center text-lg">
        <strong>Market Cap:</strong> {formattedMarketCap}
      </p>
    </div>
  );
};

export default MarketCapDisplay;
