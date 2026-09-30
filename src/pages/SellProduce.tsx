import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  MapPin,
  Package,
  ShoppingBasket,
  X,
  CheckCircle2,
} from "lucide-react";

type ListingStatus = "Active" | "Paused";

type ProduceListing = {
  id: number;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  price: number;
  farm: string;
  location: string;
  description: string;
  status: ListingStatus;
  createdAt: string;
};

const initialListings: ProduceListing[] = [
  {
    id: 1,
    name: "Dry Maize",
    category: "Grains",
    quantity: 80,
    unit: "bags",
    price: 4200,
    farm: "Main Farm",
    location: "Bondo",
    description:
      "Quality dry maize harvested from my farm. Suitable for household and commercial use.",
    status: "Active",
    createdAt: "2026-09-24",
  },
  {
    id: 2,
    name: "Rosecoco Beans",
    category: "Legumes",
    quantity: 35,
    unit: "bags",
    price: 7800,
    farm: "Lake Farm",
    location: "Siaya",
    description:
      "Clean and well-dried Rosecoco beans available for wholesale and retail buyers.",
    status: "Active",
    createdAt: "2026-09-22",
  },
  {
    id: 3,
    name: "Fresh Tomatoes",
    category: "Vegetables",
    quantity: 150,
    unit: "kg",
    price: 120,
    farm: "Main Farm",
    location: "Bondo",
    description:
      "Freshly harvested tomatoes. Available for restaurants, shops and individual buyers.",
    status: "Paused",
    createdAt: "2026-09-19",
  },
];

const categories = [
  "Grains",
  "Legumes",
  "Vegetables",
  "Fruits",
  "Dairy",
  "Poultry",
  "Livestock",
  "Other",
];

const units = [
  "kg",
  "bags",
  "crates",
  "litres",
  "pieces",
  "animals",
];

const emptyForm = {
  name: "",
  category: "Grains",
  quantity: "",
  unit: "kg",
  price: "",
  farm: "",
  location: "",
  description: "",
};

export default function SellProduce() {
  const [listings, setListings] =
    useState<ProduceListing[]>(initialListings);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | ListingStatus>(
    "All"
  );

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState(emptyForm);

  const filteredListings = useMemo(() => {
    return listings.filter((listing) => {
      const matchesSearch =
        listing.name.toLowerCase().includes(search.toLowerCase()) ||
        listing.category.toLowerCase().includes(search.toLowerCase()) ||
        listing.location.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || listing.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [listings, search, statusFilter]);

  const totalListings = listings.length;

  const activeListings = listings.filter(
    (listing) => listing.status === "Active"
  ).length;

  const totalStock = listings.reduce(
    (total, listing) => total + listing.quantity,
    0
  );

  const estimatedValue = listings.reduce(
    (total, listing) => total + listing.quantity * listing.price,
    0
  );

  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setShowModal(true);
  };

  const openEditModal = (listing: ProduceListing) => {
    setEditingId(listing.id);

    setForm({
      name: listing.name,
      category: listing.category,
      quantity: String(listing.quantity),
      unit: listing.unit,
      price: String(listing.price),
      farm: listing.farm,
      location: listing.location,
      description: listing.description,
    });

    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleChange = (
    field: keyof typeof emptyForm,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const quantity = Number(form.quantity);
    const price = Number(form.price);

    if (!form.name.trim()) {
      alert("Please enter the produce name.");
      return;
    }

    if (!quantity || quantity <= 0) {
      alert("Please enter a valid quantity.");
      return;
    }

    if (!price || price <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    if (!form.farm.trim()) {
      alert("Please enter the farm name.");
      return;
    }

    if (!form.location.trim()) {
      alert("Please enter the location.");
      return;
    }

    if (editingId !== null) {
      setListings((current) =>
        current.map((listing) =>
          listing.id === editingId
            ? {
                ...listing,
                name: form.name.trim(),
                category: form.category,
                quantity,
                unit: form.unit,
                price,
                farm: form.farm.trim(),
                location: form.location.trim(),
                description: form.description.trim(),
              }
            : listing
        )
      );

      closeModal();
      return;
    }

    const newListing: ProduceListing = {
      id: Date.now(),
      name: form.name.trim(),
      category: form.category,
      quantity,
      unit: form.unit,
      price,
      farm: form.farm.trim(),
      location: form.location.trim(),
      description: form.description.trim(),
      status: "Active",
      createdAt: new Date().toISOString().split("T")[0],
    };

    setListings((current) => [newListing, ...current]);

    closeModal();
  };

  const deleteListing = (id: number) => {
    const listing = listings.find((item) => item.id === id);

    if (!listing) {
      return;
    }

    const confirmed = window.confirm(
      `Delete "${listing.name}" from your listings?`
    );

    if (!confirmed) {
      return;
    }

    setListings((current) =>
      current.filter((listing) => listing.id !== id)
    );
  };

  const toggleStatus = (id: number) => {
    setListings((current) =>
      current.map((listing) =>
        listing.id === id
          ? {
              ...listing,
              status:
                listing.status === "Active"
                  ? "Paused"
                  : "Active",
            }
          : listing
      )
    );
  };

  const formatMoney = (amount: number) => {
    return `KES ${amount.toLocaleString()}`;
  };

  return (
    <div className="page-content">
      {/* PAGE HEADER */}
      <div className="page-header">
        <div>
          <h1>Sell Produce</h1>
          <p>
            List your farm produce and connect with buyers in the
            marketplace.
          </p>
        </div>

        <div className="page-actions">
          <button
            className="primary-button"
            onClick={openAddModal}
          >
            <Plus size={17} />
            Add Produce
          </button>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="summary-grid">
        <div className="summary-card">
          <div className="summary-card-top">
            <div>
              <div className="stat-label">Total Listings</div>
              <div className="stat-value">{totalListings}</div>
            </div>

            <div className="summary-icon">
              <ShoppingBasket size={20} />
            </div>
          </div>

          <div className="stat-change">
            All your produce listings
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-card-top">
            <div>
              <div className="stat-label">Active Listings</div>
              <div className="stat-value">{activeListings}</div>
            </div>

            <div className="summary-icon">
              <CheckCircle2 size={20} />
            </div>
          </div>

          <div className="stat-change">
            Currently visible to buyers
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-card-top">
            <div>
              <div className="stat-label">Total Stock</div>
              <div className="stat-value">{totalStock}</div>
            </div>

            <div className="summary-icon">
              <Package size={20} />
            </div>
          </div>

          <div className="stat-change">
            Across all produce listings
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-card-top">
            <div>
              <div className="stat-label">Estimated Value</div>
              <div className="stat-value">
                KES {estimatedValue.toLocaleString()}
              </div>
            </div>

            <div className="summary-icon">
              <ShoppingBasket size={20} />
            </div>
          </div>

          <div className="stat-change">
            Based on current asking prices
          </div>
        </div>
      </div>

      {/* SEARCH + FILTER */}
      <div className="market-toolbar">
        <div className="market-search">
          <Search size={17} />

          <input
            type="text"
            placeholder="Search your produce..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="category-tabs">
          <button
            className={`category-tab ${
              statusFilter === "All" ? "active" : ""
            }`}
            onClick={() => setStatusFilter("All")}
          >
            All
          </button>

          <button
            className={`category-tab ${
              statusFilter === "Active" ? "active" : ""
            }`}
            onClick={() => setStatusFilter("Active")}
          >
            Active
          </button>

          <button
            className={`category-tab ${
              statusFilter === "Paused" ? "active" : ""
            }`}
            onClick={() => setStatusFilter("Paused")}
          >
            Paused
          </button>
        </div>
      </div>

      {/* LISTINGS */}
      {filteredListings.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">
            <ShoppingBasket size={24} />
          </div>

          <h3>No produce listings found</h3>

          <p>
            Add your first produce listing to start selling
            through AgriConnect.
          </p>

          <button
            className="primary-button"
            onClick={openAddModal}
          >
            <Plus size={16} />
            Add Produce
          </button>
        </div>
      ) : (
        <div className="product-grid">
          {filteredListings.map((listing) => (
            <div className="product-card" key={listing.id}>
              {/* IMAGE AREA */}
              <div className="product-image">
                <ShoppingBasket size={55} />
              </div>

              {/* CONTENT */}
              <div className="product-content">
                <div className="product-category">
                  {listing.category}
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "8px",
                    marginTop: "4px",
                  }}
                >
                  <h3 className="product-name">
                    {listing.name}
                  </h3>

                  <span
                    className={`status-badge ${
                      listing.status === "Active"
                        ? "status-active"
                        : "status-inactive"
                    }`}
                  >
                    {listing.status}
                  </span>
                </div>

                <p className="product-description">
                  {listing.description ||
                    "No description provided."}
                </p>

                <div className="product-meta">
                  <div className="product-meta-row">
                    <Package size={13} />

                    <span>
                      {listing.quantity.toLocaleString()}{" "}
                      {listing.unit}
                    </span>
                  </div>

                  <div className="product-meta-row">
                    <MapPin size={13} />

                    <span>
                      {listing.farm}, {listing.location}
                    </span>
                  </div>
                </div>

                <div className="product-footer">
                  <div>
                    <div className="product-price">
                      {formatMoney(listing.price)}
                    </div>

                    <div className="product-unit">
                      per {listing.unit}
                    </div>
                  </div>
                </div>

                {/* ACTIONS */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "7px",
                    marginTop: "13px",
                  }}
                >
                  <button
                    className="secondary-button"
                    onClick={() => openEditModal(listing)}
                  >
                    <Pencil size={14} />
                    Edit
                  </button>

                  <button
                    className="secondary-button"
                    onClick={() =>
                      toggleStatus(listing.id)
                    }
                  >
                    {listing.status === "Active" ? (
                      <>
                        <EyeOff size={14} />
                        Pause
                      </>
                    ) : (
                      <>
                        <Eye size={14} />
                        Publish
                      </>
                    )}
                  </button>

                  <button
                    className="danger-button"
                    style={{ gridColumn: "1 / -1" }}
                    onClick={() =>
                      deleteListing(listing.id)
                    }
                  >
                    <Trash2 size={14} />
                    Delete Listing
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD / EDIT MODAL */}
      {showModal && (
        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeModal();
            }
          }}
        >
          <div className="modal-card">
            <div className="modal-header">
              <div>
                <h2>
                  {editingId !== null
                    ? "Edit Produce"
                    : "Add Produce"}
                </h2>

                <p
                  style={{
                    marginTop: "3px",
                    fontSize: "11px",
                    color: "#64748b",
                  }}
                >
                  Enter the details buyers will see.
                </p>
              </div>

              <button
                className="modal-close"
                onClick={closeModal}
                type="button"
              >
                <X size={17} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-grid">
                  {/* NAME */}
                  <div className="form-group">
                    <label htmlFor="produce-name">
                      Produce Name
                    </label>

                    <input
                      id="produce-name"
                      type="text"
                      placeholder="e.g. Dry Maize"
                      value={form.name}
                      onChange={(event) =>
                        handleChange(
                          "name",
                          event.target.value
                        )
                      }
                    />
                  </div>

                  {/* CATEGORY */}
                  <div className="form-group">
                    <label htmlFor="produce-category">
                      Category
                    </label>

                    <select
                      id="produce-category"
                      value={form.category}
                      onChange={(event) =>
                        handleChange(
                          "category",
                          event.target.value
                        )
                      }
                    >
                      {categories.map((category) => (
                        <option
                          value={category}
                          key={category}
                        >
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* QUANTITY */}
                  <div className="form-group">
                    <label htmlFor="produce-quantity">
                      Quantity
                    </label>

                    <input
                      id="produce-quantity"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="e.g. 50"
                      value={form.quantity}
                      onChange={(event) =>
                        handleChange(
                          "quantity",
                          event.target.value
                        )
                      }
                    />
                  </div>

                  {/* UNIT */}
                  <div className="form-group">
                    <label htmlFor="produce-unit">
                      Unit
                    </label>

                    <select
                      id="produce-unit"
                      value={form.unit}
                      onChange={(event) =>
                        handleChange(
                          "unit",
                          event.target.value
                        )
                      }
                    >
                      {units.map((unit) => (
                        <option value={unit} key={unit}>
                          {unit}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* PRICE */}
                  <div className="form-group">
                    <label htmlFor="produce-price">
                      Price per Unit (KES)
                    </label>

                    <input
                      id="produce-price"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="e.g. 4200"
                      value={form.price}
                      onChange={(event) =>
                        handleChange(
                          "price",
                          event.target.value
                        )
                      }
                    />
                  </div>

                  {/* FARM */}
                  <div className="form-group">
                    <label htmlFor="produce-farm">
                      Farm
                    </label>

                    <input
                      id="produce-farm"
                      type="text"
                      placeholder="e.g. Main Farm"
                      value={form.farm}
                      onChange={(event) =>
                        handleChange(
                          "farm",
                          event.target.value
                        )
                      }
                    />
                  </div>

                  {/* LOCATION */}
                  <div className="form-group full">
                    <label htmlFor="produce-location">
                      Location
                    </label>

                    <input
                      id="produce-location"
                      type="text"
                      placeholder="e.g. Bondo, Siaya"
                      value={form.location}
                      onChange={(event) =>
                        handleChange(
                          "location",
                          event.target.value
                        )
                      }
                    />
                  </div>

                  {/* DESCRIPTION */}
                  <div className="form-group full">
                    <label htmlFor="produce-description">
                      Description
                    </label>

                    <textarea
                      id="produce-description"
                      placeholder="Describe the quality, availability and other important information..."
                      value={form.description}
                      onChange={(event) =>
                        handleChange(
                          "description",
                          event.target.value
                        )
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                >
                  <CheckCircle2 size={15} />

                  {editingId !== null
                    ? "Save Changes"
                    : "Publish Produce"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}