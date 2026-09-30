import {
  MapPin,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

interface MarketProductProps {
  emoji: string;
  crop: string;
  price: string;
  change: string;
  market: string;
  seller?: string;
  quantity?: string;
  positive?: boolean;
}

function MarketProduct({
  emoji,
  crop,
  price,
  change,
  market,
  seller,
  quantity,
  positive,
}: MarketProductProps) {
  return (
    <div className="market-product">

      <div className="market-product-icon">
        {emoji}
      </div>

      <div className="market-product-main">

        <h3>{crop}</h3>

        <p>
          <MapPin size={13} />
          {market}
        </p>

        {seller && (
          <span className="seller-name">
            Seller: {seller}
          </span>
        )}

        {quantity && (
          <span className="seller-name">
            Available: {quantity}
          </span>
        )}

      </div>

      <div className="market-product-price">

        <strong>{price}</strong>

        <span className={positive ? "positive" : "negative"}>
          {positive ? (
            <ArrowUpRight size={14} />
          ) : (
            <ArrowDownRight size={14} />
          )}

          {change}
        </span>

      </div>

      <button className="market-view-button">
        View
      </button>

    </div>
  );
}

export default MarketProduct;