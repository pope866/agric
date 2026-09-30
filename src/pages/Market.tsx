import { useMemo, useState } from "react";
import {
  Search,
  ShoppingCart,
  MapPin,
  Plus,
  Minus,
  X,
  Package,
  Wheat,
  Sprout,
  Milk,
  Tractor,
} from "lucide-react";

type Category =
  | "All"
  | "Produce"
  | "Seeds"
  | "Fertilizer"
  | "Livestock"
  | "Equipment";

type Product = {
  id: number;
  name: string;
  category: Exclude<Category, "All">;
  price: number;
  unit: string;
  seller: string;
  location: string;
  quantity: number;
  description: string;
  icon: "maize" | "beans" | "seed" | "fertilizer" | "milk" | "tractor";
};

type CartItem = {
  product: Product;
  quantity: number;
};

const products: Product[] = [
  {
    id: 1,
    name: "Dry Maize",
    category: "Produce",
    price: 4800,
    unit: "bag",
    seller: "Otieno Farm",
    location: "Bondo, Siaya",
    quantity: 25,
    description: "Quality dry maize suitable for food and animal feed.",
    icon: "maize",
  },
  {
    id: 2,
    name: "Rosecoco Beans",
    category: "Produce",
    price: 9200,
    unit: "bag",
    seller: "Achieng Farmers",
    location: "Siaya",
    quantity: 14,
    description: "Clean and well-dried Rosecoco beans.",
    icon: "beans",
  },
  {
    id: 3,
    name: "Hybrid Maize Seeds",
    category: "Seeds",
    price: 850,
    unit: "2kg",
    seller: "Green Agro Supplies",
    location: "Bondo",
    quantity: 80,
    description: "Certified hybrid maize seed for improved production.",
    icon: "seed",
  },
  {
    id: 4,
    name: "DAP Fertilizer",
    category: "Fertilizer",
    price: 5200,
    unit: "50kg",
    seller: "Lake Agrovet",
    location: "Bondo, Siaya",
    quantity: 40,
    description: "Fertilizer suitable for crop establishment.",
    icon: "fertilizer",
  },
  {
    id: 5,
    name: "Fresh Milk",
    category: "Livestock",
    price: 70,
    unit: "litre",
    seller: "Ochieng Dairy Farm",
    location: "Usigu",
    quantity: 100,
    description: "Fresh farm milk available for local collection.",
    icon: "milk",
  },
  {
    id: 6,
    name: "Knapsack Sprayer",
    category: "Equipment",
    price: 3800,
    unit: "piece",
    seller: "Farm Tools Kenya",
    location: "Siaya",
    quantity: 12,
    description: "Manual knapsack sprayer for farm application.",
    icon: "tractor",
  },
  {
    id: 7,
    name: "Fresh Tomatoes",
    category: "Produce",
    price: 65,
    unit: "kg",
    seller: "Lake Farm",
    location: "Usigu, Siaya",
    quantity: 250,
    description: "Fresh tomatoes harvested from a local farm.",
    icon: "beans",
  },
  {
    id: 8,
    name: "NPK Fertilizer",
    category: "Fertilizer",
    price: 5800,
    unit: "50kg",
    seller: "Bondo Agrovet",
    location: "Bondo",
    quantity: 30,
    description: "Balanced fertilizer for crop nutrition.",
    icon: "fertilizer",
  },
];

const categories: Category[] = [
  "All",
  "Produce",
  "Seeds",
  "Fertilizer",
  "Livestock",
  "Equipment",
];

export default function Market() {
  const [selectedCategory, setSelectedCategory] =
    useState<Category>("All");

  const [search, setSearch] = useState("");

  const [cart, setCart] = useState<CartItem[]>([]);

  const [showCart, setShowCart] = useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      const searchText = search.toLowerCase().trim();

      const matchesSearch =
        !searchText ||
        product.name.toLowerCase().includes(searchText) ||
        product.seller.toLowerCase().includes(searchText) ||
        product.location.toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, search]);

  const cartCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );

  const addToCart = (product: Product) => {
    setCart((current) => {
      const existing = current.find(
        (item) => item.product.id === product.id
      );

      if (existing) {
        return current.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: Math.min(
                  item.quantity + 1,
                  product.quantity
                ),
              }
            : item
        );
      }

      return [
        ...current,
        {
          product,
          quantity: 1,
        },
      ];
    });
  };

  const updateCartQuantity = (
    productId: number,
    change: number
  ) => {
    setCart((current) =>
      current
        .map((item) => {
          if (item.product.id !== productId) {
            return item;
          }

          const newQuantity = item.quantity + change;

          if (newQuantity <= 0) {
            return null;
          }

          if (newQuantity > item.product.quantity) {
            return {
              ...item,
              quantity: item.product.quantity,
            };
          }

          return {
            ...item,
            quantity: newQuantity,
          };
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const removeFromCart = (productId: number) => {
    setCart((current) =>
      current.filter(
        (item) => item.product.id !== productId
      )
    );
  };

  const formatPrice = (price: number) => {
    return `KSh ${price.toLocaleString("en-KE")}`;
  };

  return (
    <div className="page-content">
      {/* Header */}
      <div className="page-header marketplace-header">
        <div>
          <span className="eyebrow">AGRICONNECT MARKET</span>

          <h1>Marketplace</h1>

          <p>
            Buy farm inputs and find agricultural products
            from local sellers.
          </p>
        </div>

        <button
          className="cart-button"
          onClick={() => setShowCart(true)}
        >
          <ShoppingCart size={19} />

          <span>Cart</span>

          {cartCount > 0 && (
            <b>{cartCount}</b>
          )}
        </button>
      </div>

      {/* Search */}
      <div className="market-search">
        <Search size={19} />

        <input
          type="text"
          placeholder="Search produce, seeds, fertilizer, equipment..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Categories */}
      <div className="category-row">
        {categories.map((category) => (
          <button
            key={category}
            className={
              selectedCategory === category
                ? "category-button active"
                : "category-button"
            }
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Results heading */}
      <div className="market-results-header">
        <div>
          <h2>
            {selectedCategory === "All"
              ? "Marketplace Products"
              : selectedCategory}
          </h2>

          <p>
            {filteredProducts.length} products available
          </p>
        </div>
      </div>

      {/* Products */}
      {filteredProducts.length === 0 ? (
        <div className="empty-state">
          <Package size={45} />

          <h3>No products found</h3>

          <p>
            Try another search or select a different
            category.
          </p>
        </div>
      ) : (
        <div className="market-product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAdd={() => addToCart(product)}
              onView={() => setSelectedProduct(product)}
              formatPrice={formatPrice}
            />
          ))}
        </div>
      )}

      {/* Cart drawer */}
      {showCart && (
        <div className="modal-overlay">
          <div className="cart-drawer">
            <div className="modal-header">
              <div>
                <h2>Your Cart</h2>

                <p>
                  {cartCount} item
                  {cartCount !== 1 ? "s" : ""}
                </p>
              </div>

              <button
                className="icon-button"
                onClick={() => setShowCart(false)}
              >
                <X size={20} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="cart-empty">
                <ShoppingCart size={45} />

                <h3>Your cart is empty</h3>

                <p>
                  Add products from the marketplace to
                  continue.
                </p>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div
                      className="cart-item"
                      key={item.product.id}
                    >
                      <div className="cart-product-icon">
                        {getProductIcon(item.product.icon)}
                      </div>

                      <div className="cart-item-info">
                        <strong>
                          {item.product.name}
                        </strong>

                        <span>
                          {formatPrice(item.product.price)} /
                          {item.product.unit}
                        </span>

                        <div className="quantity-controls">
                          <button
                            onClick={() =>
                              updateCartQuantity(
                                item.product.id,
                                -1
                              )
                            }
                          >
                            <Minus size={14} />
                          </button>

                          <strong>{item.quantity}</strong>

                          <button
                            onClick={() =>
                              updateCartQuantity(
                                item.product.id,
                                1
                              )
                            }
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      <div className="cart-item-right">
                        <strong>
                          {formatPrice(
                            item.product.price *
                              item.quantity
                          )}
                        </strong>

                        <button
                          className="remove-cart"
                          onClick={() =>
                            removeFromCart(
                              item.product.id
                            )
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div>
                    <span>Subtotal</span>
                    <strong>
                      {formatPrice(cartTotal)}
                    </strong>
                  </div>

                  <div>
                    <span>Delivery</span>
                    <strong>Calculated later</strong>
                  </div>

                  <div className="cart-total">
                    <span>Total</span>
                    <strong>
                      {formatPrice(cartTotal)}
                    </strong>
                  </div>

                  <button
                    className="primary-button full-width"
                    onClick={() =>
                      alert(
                        "Checkout will be connected to M-Pesa in the next phase."
                      )
                    }
                  >
                    Proceed to Checkout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Product details */}
      {selectedProduct && (
        <div className="modal-overlay">
          <div className="modal-card product-details-modal">
            <div className="modal-header">
              <div>
                <h2>{selectedProduct.name}</h2>

                <p>{selectedProduct.category}</p>
              </div>

              <button
                className="icon-button"
                onClick={() =>
                  setSelectedProduct(null)
                }
              >
                <X size={20} />
              </button>
            </div>

            <div className="product-detail-icon">
              {getProductIcon(selectedProduct.icon)}
            </div>

            <div className="product-detail-price">
              {formatPrice(selectedProduct.price)}

              <span>
                / {selectedProduct.unit}
              </span>
            </div>

            <p className="product-description">
              {selectedProduct.description}
            </p>

            <div className="product-detail-info">
              <div>
                <MapPin size={17} />
                <span>
                  {selectedProduct.location}
                </span>
              </div>

              <div>
                <Package size={17} />
                <span>
                  {selectedProduct.quantity}{" "}
                  {selectedProduct.unit}
                  {selectedProduct.quantity !== 1
                    ? "s"
                    : ""}{" "}
                  available
                </span>
              </div>

              <div>
                <Sprout size={17} />
                <span>
                  Seller: {selectedProduct.seller}
                </span>
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="secondary-button"
                onClick={() =>
                  setSelectedProduct(null)
                }
              >
                Close
              </button>

              <button
                className="primary-button"
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ProductCard({
  product,
  onAdd,
  onView,
  formatPrice,
}: {
  product: Product;
  onAdd: () => void;
  onView: () => void;
  formatPrice: (price: number) => string;
}) {
  return (
    <div className="market-product-card">
      <div className="product-image">
        <div className="product-icon">
          {getProductIcon(product.icon)}
        </div>

        <span className="product-category">
          {product.category}
        </span>
      </div>

      <div className="product-card-body">
        <div className="product-title-row">
          <div>
            <h3>{product.name}</h3>

            <p>{product.seller}</p>
          </div>
        </div>

        <div className="product-location">
          <MapPin size={14} />
          {product.location}
        </div>

        <p className="product-description">
          {product.description}
        </p>

        <div className="product-price-row">
          <div>
            <strong>
              {formatPrice(product.price)}
            </strong>

            <span>
              / {product.unit}
            </span>
          </div>
        </div>

        <div className="product-stock">
          {product.quantity} {product.unit}
          {product.quantity !== 1 ? "s" : ""} available
        </div>

        <div className="product-actions">
          <button
            className="secondary-button"
            onClick={onView}
          >
            View
          </button>

          <button
            className="primary-button"
            onClick={onAdd}
          >
            <ShoppingCart size={16} />
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

function getProductIcon(
  icon: Product["icon"]
) {
  switch (icon) {
    case "maize":
      return <Wheat size={30} />;

    case "beans":
      return <Sprout size={30} />;

    case "seed":
      return <Sprout size={30} />;

    case "fertilizer":
      return <Package size={30} />;

    case "milk":
      return <Milk size={30} />;

    case "tractor":
      return <Tractor size={30} />;

    default:
      return <Package size={30} />;
  }
}