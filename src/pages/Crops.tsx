import { useState } from "react";
import {
  Plus,
  Sprout,
  MoreVertical,
  Pencil,
  Trash2,
  X,
  CalendarDays,
  MapPin,
  TrendingUp,
} from "lucide-react";

type CropStatus = "Growing" | "Ready Soon" | "Harvested";

type Crop = {
  id: number;
  name: string;
  variety: string;
  farm: string;
  acreage: number;
  plantedDate: string;
  harvestDate: string;
  progress: number;
  expectedYield: string;
  status: CropStatus;
};

const initialCrops: Crop[] = [
  {
    id: 1,
    name: "Maize",
    variety: "Hybrid 614",
    farm: "Main Farm",
    acreage: 3,
    plantedDate: "2026-07-10",
    harvestDate: "2026-11-10",
    progress: 70,
    expectedYield: "24 bags",
    status: "Growing",
  },
  {
    id: 2,
    name: "Beans",
    variety: "Rosecoco",
    farm: "Main Farm",
    acreage: 1.5,
    plantedDate: "2026-08-05",
    harvestDate: "2026-10-25",
    progress: 45,
    expectedYield: "8 bags",
    status: "Growing",
  },
  {
    id: 3,
    name: "Tomatoes",
    variety: "Rio Grande",
    farm: "Lake Farm",
    acreage: 1,
    plantedDate: "2026-07-20",
    harvestDate: "2026-10-05",
    progress: 82,
    expectedYield: "1.5 tonnes",
    status: "Ready Soon",
  },
];

const emptyForm = {
  name: "",
  variety: "",
  farm: "",
  acreage: "",
  plantedDate: "",
  harvestDate: "",
  progress: "0",
  expectedYield: "",
  status: "Growing" as CropStatus,
};

export default function Crops() {
  const [crops, setCrops] = useState<Crop[]>(initialCrops);
  const [showForm, setShowForm] = useState(false);
  const [editingCrop, setEditingCrop] = useState<Crop | null>(null);
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const [form, setForm] = useState(emptyForm);

  const totalAcreage = crops.reduce(
    (total, crop) => total + crop.acreage,
    0
  );

  const growingCrops = crops.filter(
    (crop) => crop.status === "Growing"
  ).length;

  const readyCrops = crops.filter(
    (crop) => crop.status === "Ready Soon"
  ).length;

  const openAddForm = () => {
    setEditingCrop(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const openEditForm = (crop: Crop) => {
    setEditingCrop(crop);

    setForm({
      name: crop.name,
      variety: crop.variety,
      farm: crop.farm,
      acreage: String(crop.acreage),
      plantedDate: crop.plantedDate,
      harvestDate: crop.harvestDate,
      progress: String(crop.progress),
      expectedYield: crop.expectedYield,
      status: crop.status,
    });

    setShowForm(true);
    setOpenMenu(null);
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingCrop(null);
    setForm(emptyForm);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.variety ||
      !form.farm ||
      !form.acreage ||
      !form.plantedDate ||
      !form.harvestDate ||
      !form.expectedYield
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    const progress = Math.min(
      100,
      Math.max(0, Number(form.progress) || 0)
    );

    if (editingCrop) {
      setCrops((current) =>
        current.map((crop) =>
          crop.id === editingCrop.id
            ? {
                ...crop,
                name: form.name,
                variety: form.variety,
                farm: form.farm,
                acreage: Number(form.acreage),
                plantedDate: form.plantedDate,
                harvestDate: form.harvestDate,
                progress,
                expectedYield: form.expectedYield,
                status: form.status,
              }
            : crop
        )
      );
    } else {
      const newCrop: Crop = {
        id: Date.now(),
        name: form.name,
        variety: form.variety,
        farm: form.farm,
        acreage: Number(form.acreage),
        plantedDate: form.plantedDate,
        harvestDate: form.harvestDate,
        progress,
        expectedYield: form.expectedYield,
        status: form.status,
      };

      setCrops((current) => [...current, newCrop]);
    }

    closeForm();
  };

  const deleteCrop = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this crop?"
    );

    if (!confirmed) return;

    setCrops((current) =>
      current.filter((crop) => crop.id !== id)
    );

    setOpenMenu(null);
  };

  const markAsHarvested = (id: number) => {
    setCrops((current) =>
      current.map((crop) =>
        crop.id === id
          ? {
              ...crop,
              progress: 100,
              status: "Harvested",
            }
          : crop
      )
    );

    setOpenMenu(null);
  };

  const formatDate = (date: string) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="page-content">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1>Crop Management</h1>
          <p>
            Monitor your crops from planting to harvest.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={openAddForm}
        >
          <Plus size={18} />
          Add Crop
        </button>
      </div>

      {/* Summary */}
      <div className="summary-grid">
        <div className="summary-card">
          <div className="summary-icon green">
            <Sprout size={22} />
          </div>

          <div>
            <span>Total Crops</span>
            <strong>{crops.length}</strong>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon blue">
            <TrendingUp size={22} />
          </div>

          <div>
            <span>Total Acreage</span>
            <strong>{totalAcreage} Acres</strong>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon orange">
            <Sprout size={22} />
          </div>

          <div>
            <span>Growing</span>
            <strong>{growingCrops}</strong>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon purple">
            <CalendarDays size={22} />
          </div>

          <div>
            <span>Ready Soon</span>
            <strong>{readyCrops}</strong>
          </div>
        </div>
      </div>

      {/* Crop list */}
      <div className="section-heading">
        <div>
          <h2>Your Crops</h2>
          <p>
            Keep track of crop growth and expected harvests.
          </p>
        </div>
      </div>

      {crops.length === 0 ? (
        <div className="empty-state">
          <Sprout size={45} />

          <h3>No crops registered</h3>

          <p>
            Add your first crop to start tracking its growth.
          </p>

          <button
            className="primary-button"
            onClick={openAddForm}
          >
            <Plus size={18} />
            Add Crop
          </button>
        </div>
      ) : (
        <div className="crop-management-grid">
          {crops.map((crop) => (
            <div className="crop-management-card" key={crop.id}>
              {/* Card top */}
              <div className="crop-card-header">
                <div className="crop-large-icon">
                  <Sprout size={26} />
                </div>

                <div className="crop-card-menu">
                  <button
                    className="icon-button"
                    onClick={() =>
                      setOpenMenu(
                        openMenu === crop.id ? null : crop.id
                      )
                    }
                  >
                    <MoreVertical size={20} />
                  </button>

                  {openMenu === crop.id && (
                    <div className="farm-menu">
                      <button
                        onClick={() => openEditForm(crop)}
                      >
                        <Pencil size={16} />
                        Edit
                      </button>

                      {crop.status !== "Harvested" && (
                        <button
                          onClick={() =>
                            markAsHarvested(crop.id)
                          }
                        >
                          <TrendingUp size={16} />
                          Mark Harvested
                        </button>
                      )}

                      <button
                        className="danger"
                        onClick={() =>
                          deleteCrop(crop.id)
                        }
                      >
                        <Trash2 size={16} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Crop title */}
              <div className="crop-card-title">
                <div>
                  <h3>{crop.name}</h3>
                  <span>{crop.variety}</span>
                </div>

                <span
                  className={`status-badge ${getStatusClass(
                    crop.status
                  )}`}
                >
                  {crop.status}
                </span>
              </div>

              {/* Farm */}
              <div className="farm-location">
                <MapPin size={16} />
                {crop.farm}
              </div>

              {/* Progress */}
              <div className="crop-progress-section">
                <div className="progress-header">
                  <strong>Growth Progress</strong>
                  <span>{crop.progress}%</span>
                </div>

                <div className="progress-bar">
                  <div
                    style={{
                      width: `${crop.progress}%`,
                    }}
                  />
                </div>
              </div>

              {/* Information */}
              <div className="crop-info-grid">
                <div>
                  <span>Area</span>
                  <strong>{crop.acreage} Acres</strong>
                </div>

                <div>
                  <span>Expected Yield</span>
                  <strong>{crop.expectedYield}</strong>
                </div>

                <div>
                  <span>Planted</span>
                  <strong>
                    {formatDate(crop.plantedDate)}
                  </strong>
                </div>

                <div>
                  <span>Harvest</span>
                  <strong>
                    {formatDate(crop.harvestDate)}
                  </strong>
                </div>
              </div>

              {/* Footer */}
              <div className="crop-card-footer">
                <span>
                  {crop.status === "Harvested"
                    ? "Harvest completed"
                    : `Harvest: ${formatDate(
                        crop.harvestDate
                      )}`}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Modal */}
      {showForm && (
        <div className="modal-overlay">
          <div className="modal-card crop-form-modal">
            <div className="modal-header">
              <div>
                <h2>
                  {editingCrop
                    ? "Edit Crop"
                    : "Add New Crop"}
                </h2>

                <p>
                  {editingCrop
                    ? "Update crop information."
                    : "Enter information about your crop."}
                </p>
              </div>

              <button
                className="icon-button"
                onClick={closeForm}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>
                    Crop Name <span>*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. Maize"
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
                  <label>
                    Variety <span>*</span>
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. Hybrid 614"
                    value={form.variety}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        variety: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    Farm <span>*</span>
                  </label>

                  <select
                    value={form.farm}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        farm: e.target.value,
                      })
                    }
                  >
                    <option value="">
                      Select farm
                    </option>

                    <option value="Main Farm">
                      Main Farm
                    </option>

                    <option value="Lake Farm">
                      Lake Farm
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <label>
                    Acreage <span>*</span>
                  </label>

                  <input
                    type="number"
                    min="0.1"
                    step="0.1"
                    placeholder="e.g. 2.5"
                    value={form.acreage}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        acreage: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>
                    Planting Date <span>*</span>
                  </label>

                  <input
                    type="date"
                    value={form.plantedDate}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        plantedDate: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>
                    Expected Harvest <span>*</span>
                  </label>

                  <input
                    type="date"
                    value={form.harvestDate}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        harvestDate: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Growth Progress (%)</label>

                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={form.progress}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        progress: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>Status</label>

                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        status:
                          e.target.value as CropStatus,
                      })
                    }
                  >
                    <option value="Growing">
                      Growing
                    </option>

                    <option value="Ready Soon">
                      Ready Soon
                    </option>

                    <option value="Harvested">
                      Harvested
                    </option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>
                  Expected Yield <span>*</span>
                </label>

                <input
                  type="text"
                  placeholder="e.g. 20 bags"
                  value={form.expectedYield}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      expectedYield: e.target.value,
                    })
                  }
                />
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="secondary-button"
                  onClick={closeForm}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="primary-button"
                >
                  {editingCrop
                    ? "Save Changes"
                    : "Add Crop"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function getStatusClass(status: CropStatus) {
  switch (status) {
    case "Growing":
      return "active";

    case "Ready Soon":
      return "warning";

    case "Harvested":
      return "completed";

    default:
      return "";
  }
}