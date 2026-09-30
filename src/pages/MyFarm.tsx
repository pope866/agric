import { useState } from "react";
import {
  Plus,
  MapPin,
  Sprout,
  MoreVertical,
  Pencil,
  Trash2,
  X,
  Ruler,
} from "lucide-react";

type Farm = {
  id: number;
  name: string;
  location: string;
  size: number;
  crops: string[];
  status: "Active" | "Inactive";
  created: string;
};

const initialFarms: Farm[] = [
  {
    id: 1,
    name: "Main Farm",
    location: "Bondo, Siaya",
    size: 5,
    crops: ["Maize", "Beans", "Tomatoes"],
    status: "Active",
    created: "12 Jan 2026",
  },
  {
    id: 2,
    name: "Lake Farm",
    location: "Usigu, Siaya",
    size: 3,
    crops: ["Maize", "Vegetables"],
    status: "Active",
    created: "20 Feb 2026",
  },
];

export default function MyFarm() {
  const [farms, setFarms] = useState<Farm[]>(initialFarms);
  const [showForm, setShowForm] = useState(false);
  const [editingFarm, setEditingFarm] = useState<Farm | null>(null);
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const [form, setForm] = useState({
    name: "",
    location: "",
    size: "",
    crops: "",
  });

  const openAddForm = () => {
    setEditingFarm(null);
    setForm({
      name: "",
      location: "",
      size: "",
      crops: "",
    });
    setShowForm(true);
  };

  const openEditForm = (farm: Farm) => {
    setEditingFarm(farm);

    setForm({
      name: farm.name,
      location: farm.location,
      size: String(farm.size),
      crops: farm.crops.join(", "),
    });

    setShowForm(true);
    setOpenMenu(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name || !form.location || !form.size || !form.crops) {
      alert("Please fill in all fields.");
      return;
    }

    const cropList = form.crops
      .split(",")
      .map((crop) => crop.trim())
      .filter(Boolean);

    if (editingFarm) {
      setFarms((current) =>
        current.map((farm) =>
          farm.id === editingFarm.id
            ? {
                ...farm,
                name: form.name,
                location: form.location,
                size: Number(form.size),
                crops: cropList,
              }
            : farm
        )
      );
    } else {
      const newFarm: Farm = {
        id: Date.now(),
        name: form.name,
        location: form.location,
        size: Number(form.size),
        crops: cropList,
        status: "Active",
        created: new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
      };

      setFarms((current) => [...current, newFarm]);
    }

    setShowForm(false);
    setEditingFarm(null);
  };

  const deleteFarm = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this farm?"
    );

    if (!confirmed) return;

    setFarms((current) => current.filter((farm) => farm.id !== id));
    setOpenMenu(null);
  };

  const totalAcres = farms.reduce((total, farm) => total + farm.size, 0);

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <h1>My Farm</h1>
          <p>Manage your farms, land and crops.</p>
        </div>

        <button className="primary-button" onClick={openAddForm}>
          <Plus size={18} />
          Add Farm
        </button>
      </div>

      {/* Farm Summary */}
      <div className="summary-grid">
        <div className="summary-card">
          <div className="summary-icon green">
            <Sprout size={22} />
          </div>

          <div>
            <span>Total Farms</span>
            <strong>{farms.length}</strong>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon blue">
            <Ruler size={22} />
          </div>

          <div>
            <span>Total Land</span>
            <strong>{totalAcres} Acres</strong>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon orange">
            <Sprout size={22} />
          </div>

          <div>
            <span>Active Farms</span>
            <strong>
              {farms.filter((farm) => farm.status === "Active").length}
            </strong>
          </div>
        </div>
      </div>

      {/* Farm Cards */}
      <div className="section-heading">
        <div>
          <h2>Your Farms</h2>
          <p>View and manage all your registered farms.</p>
        </div>
      </div>

      {farms.length === 0 ? (
        <div className="empty-state">
          <Sprout size={42} />
          <h3>No farms registered</h3>
          <p>Add your first farm to start managing your agricultural activities.</p>

          <button className="primary-button" onClick={openAddForm}>
            <Plus size={18} />
            Add Your First Farm
          </button>
        </div>
      ) : (
        <div className="farm-grid">
          {farms.map((farm) => (
            <div className="farm-card" key={farm.id}>
              <div className="farm-card-top">
                <div className="farm-icon">
                  <Sprout size={24} />
                </div>

                <div className="farm-menu-wrapper">
                  <button
                    className="icon-button"
                    onClick={() =>
                      setOpenMenu(openMenu === farm.id ? null : farm.id)
                    }
                  >
                    <MoreVertical size={20} />
                  </button>

                  {openMenu === farm.id && (
                    <div className="farm-menu">
                      <button onClick={() => openEditForm(farm)}>
                        <Pencil size={16} />
                        Edit
                      </button>

                      <button
                        className="danger"
                        onClick={() => deleteFarm(farm.id)}
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="farm-card-content">
                <div className="farm-title-row">
                  <h3>{farm.name}</h3>

                  <span
                    className={`status-badge ${
                      farm.status === "Active" ? "active" : "inactive"
                    }`}
                  >
                    {farm.status}
                  </span>
                </div>

                <div className="farm-location">
                  <MapPin size={16} />
                  {farm.location}
                </div>

                <div className="farm-info">
                  <div>
                    <span>Farm Size</span>
                    <strong>{farm.size} Acres</strong>
                  </div>

                  <div>
                    <span>Registered</span>
                    <strong>{farm.created}</strong>
                  </div>
                </div>

                <div className="farm-crops">
                  <span className="farm-label">Crops</span>

                  <div className="crop-tags">
                    {farm.crops.map((crop) => (
                      <span className="crop-tag" key={crop}>
                        {crop}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="farm-card-footer">
                <button className="view-farm-button">
                  View Farm
                  <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Farm Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <div>
                <h2>{editingFarm ? "Edit Farm" : "Add New Farm"}</h2>
                <p>
                  {editingFarm
                    ? "Update your farm information."
                    : "Enter your farm details below."}
                </p>
              </div>

              <button
                className="icon-button"
                onClick={() => setShowForm(false)}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Farm Name</label>
                <input
                  type="text"
                  placeholder="e.g. Main Farm"
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Location</label>
                <input
                  type="text"
                  placeholder="e.g. Bondo, Siaya"
                  value={form.location}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      location: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Farm Size (Acres)</label>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  placeholder="e.g. 5"
                  value={form.size}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      size: e.target.value,
                    })
                  }
                />
              </div>

              <div className="form-group">
                <label>Crops</label>
                <input
                  type="text"
                  placeholder="e.g. Maize, Beans, Tomatoes"
                  value={form.crops}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      crops: e.target.value,
                    })
                  }
                />

                <small>
                  Separate multiple crops using commas.
                </small>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>

                <button type="submit" className="primary-button">
                  {editingFarm ? "Save Changes" : "Add Farm"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}