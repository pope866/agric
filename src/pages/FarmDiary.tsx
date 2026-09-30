import { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  CalendarDays,
  Sprout,
  Droplets,
  FlaskConical,
  Wheat,
  PawPrint,
  ClipboardList,
  X,
} from "lucide-react";

type ActivityType =
  | "Planting"
  | "Fertilizing"
  | "Spraying"
  | "Watering"
  | "Harvesting"
  | "Livestock"
  | "Other";

type DiaryEntry = {
  id: number;
  date: string;
  activity: ActivityType;
  title: string;
  farm: string;
  crop: string;
  description: string;
  cost: number;
};

const initialEntries: DiaryEntry[] = [
  {
    id: 1,
    date: "2026-09-27",
    activity: "Fertilizing",
    title: "Applied DAP fertilizer",
    farm: "Main Farm",
    crop: "Maize Hybrid 614",
    description: "Applied DAP fertilizer to the maize field after rainfall.",
    cost: 3500,
  },
  {
    id: 2,
    date: "2026-09-25",
    activity: "Spraying",
    title: "Tomato pest control",
    farm: "Main Farm",
    crop: "Tomatoes Rio Grande",
    description: "Sprayed tomatoes to control aphids and other common pests.",
    cost: 1800,
  },
  {
    id: 3,
    date: "2026-09-22",
    activity: "Watering",
    title: "Watered vegetable garden",
    farm: "Lake Farm",
    crop: "Tomatoes Rio Grande",
    description: "Watered the vegetable section in the morning.",
    cost: 500,
  },
  {
    id: 4,
    date: "2026-09-20",
    activity: "Planting",
    title: "Planted beans",
    farm: "Lake Farm",
    crop: "Beans Rosecoco",
    description: "Completed planting of the remaining bean section.",
    cost: 2200,
  },
];

const activityOptions: ActivityType[] = [
  "Planting",
  "Fertilizing",
  "Spraying",
  "Watering",
  "Harvesting",
  "Livestock",
  "Other",
];

const emptyForm = {
  date: new Date().toISOString().split("T")[0],
  activity: "Planting" as ActivityType,
  title: "",
  farm: "Main Farm",
  crop: "",
  description: "",
  cost: "",
};

function getActivityIcon(activity: ActivityType) {
  switch (activity) {
    case "Planting":
      return <Sprout size={20} />;
    case "Fertilizing":
      return <FlaskConical size={20} />;
    case "Spraying":
      return <FlaskConical size={20} />;
    case "Watering":
      return <Droplets size={20} />;
    case "Harvesting":
      return <Wheat size={20} />;
    case "Livestock":
      return <PawPrint size={20} />;
    default:
      return <ClipboardList size={20} />;
  }
}

function formatCurrency(value: number) {
  return `KES ${value.toLocaleString()}`;
}

export default function FarmDiaryPage() {
  const [entries, setEntries] = useState<DiaryEntry[]>(initialEntries);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"All" | ActivityType>("All");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState(emptyForm);

  const filteredEntries = useMemo(() => {
    const query = search.toLowerCase().trim();

    return entries.filter((entry) => {
      const matchesFilter =
        filter === "All" || entry.activity === filter;

      const matchesSearch =
        !query ||
        entry.title.toLowerCase().includes(query) ||
        entry.farm.toLowerCase().includes(query) ||
        entry.crop.toLowerCase().includes(query) ||
        entry.description.toLowerCase().includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [entries, search, filter]);

  const totalActivities = entries.length;

  const totalCost = entries.reduce(
    (sum, entry) => sum + entry.cost,
    0
  );

  const plantingActivities = entries.filter(
    (entry) => entry.activity === "Planting"
  ).length;

  const harvestActivities = entries.filter(
    (entry) => entry.activity === "Harvesting"
  ).length;

  const openAddModal = () => {
    setEditingId(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEditModal = (entry: DiaryEntry) => {
    setEditingId(entry.id);

    setForm({
      date: entry.date,
      activity: entry.activity,
      title: entry.title,
      farm: entry.farm,
      crop: entry.crop,
      description: entry.description,
      cost: String(entry.cost),
    });

    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!form.title.trim()) {
      alert("Please enter an activity title.");
      return;
    }

    if (!form.date) {
      alert("Please select a date.");
      return;
    }

    const newEntry: DiaryEntry = {
      id: editingId ?? Date.now(),
      date: form.date,
      activity: form.activity,
      title: form.title.trim(),
      farm: form.farm,
      crop: form.crop.trim() || "General Farm Activity",
      description:
        form.description.trim() || "No additional description provided.",
      cost: Number(form.cost) || 0,
    };

    if (editingId !== null) {
      setEntries((current) =>
        current.map((entry) =>
          entry.id === editingId ? newEntry : entry
        )
      );
    } else {
      setEntries((current) => [newEntry, ...current]);
    }

    closeModal();
  };

  const deleteEntry = (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this diary entry?"
    );

    if (!confirmed) return;

    setEntries((current) =>
      current.filter((entry) => entry.id !== id)
    );
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <div>
          <span className="eyebrow">FARM MANAGEMENT</span>

          <h1>Farm Diary</h1>

          <p>
            Record and track your daily farming activities,
            expenses and field operations.
          </p>
        </div>

        <div className="page-actions">
          <button className="primary-button" onClick={openAddModal}>
            <Plus size={18} />
            Add Activity
          </button>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="summary-grid">
        <div className="summary-card">
          <div className="summary-icon green">
            <ClipboardList size={22} />
          </div>

          <div>
            <span className="stat-label">Total Activities</span>
            <strong className="stat-value">{totalActivities}</strong>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon blue">
            <Sprout size={22} />
          </div>

          <div>
            <span className="stat-label">Planting Activities</span>
            <strong className="stat-value">
              {plantingActivities}
            </strong>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon orange">
            <Wheat size={22} />
          </div>

          <div>
            <span className="stat-label">Harvest Activities</span>
            <strong className="stat-value">
              {harvestActivities}
            </strong>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon purple">
            <span>KES</span>
          </div>

          <div>
            <span className="stat-label">Recorded Costs</span>
            <strong className="stat-value">
              {formatCurrency(totalCost)}
            </strong>
          </div>
        </div>
      </div>

      {/* FILTERS */}
      <div className="market-toolbar">
        <div className="market-search">
          <Search size={18} />

          <input
            type="text"
            placeholder="Search farm activities..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="category-tabs">
          <button
            className={`category-tab ${
              filter === "All" ? "active" : ""
            }`}
            onClick={() => setFilter("All")}
          >
            All
          </button>

          {activityOptions.map((activity) => (
            <button
              key={activity}
              className={`category-tab ${
                filter === activity ? "active" : ""
              }`}
              onClick={() => setFilter(activity)}
            >
              {activity}
            </button>
          ))}
        </div>
      </div>

      {/* DIARY LIST */}
      <div className="section-heading">
        <div>
          <h2>Activity Records</h2>
          <p>
            {filteredEntries.length} record
            {filteredEntries.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </div>

      {filteredEntries.length === 0 ? (
        <div className="empty-state">
          <ClipboardList size={42} />

          <h3>No activities found</h3>

          <p>
            Try changing your search or add a new farm activity.
          </p>

          <button
            className="primary-button"
            onClick={openAddModal}
          >
            <Plus size={18} />
            Add Activity
          </button>
        </div>
      ) : (
        <div className="diary-list">
          {filteredEntries.map((entry) => (
            <div className="diary-card" key={entry.id}>
              <div className="diary-icon">
                {getActivityIcon(entry.activity)}
              </div>

              <div className="diary-main">
                <div className="diary-top">
                  <div>
                    <span
                      className={`status-badge status-${entry.activity
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      {entry.activity}
                    </span>

                    <h3>{entry.title}</h3>
                  </div>

                  <div className="diary-date">
                    <CalendarDays size={16} />
                    {new Date(entry.date).toLocaleDateString(
                      "en-KE",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </div>
                </div>

                <div className="diary-meta">
                  <span>
                    <Sprout size={15} />
                    {entry.crop}
                  </span>

                  <span>{entry.farm}</span>

                  <span>
                    Cost: <strong>{formatCurrency(entry.cost)}</strong>
                  </span>
                </div>

                <p className="diary-description">
                  {entry.description}
                </p>

                <div className="diary-actions">
                  <button
                    className="secondary-button"
                    onClick={() => openEditModal(entry)}
                  >
                    <Pencil size={16} />
                    Edit
                  </button>

                  <button
                    className="danger-button"
                    onClick={() => deleteEntry(entry.id)}
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL */}
      {modalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className="modal-card"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="modal-header">
              <div>
                <h2>
                  {editingId !== null
                    ? "Edit Activity"
                    : "Add Farm Activity"}
                </h2>

                <p>
                  Record what happened on your farm.
                </p>
              </div>

              <button
                className="modal-close"
                onClick={closeModal}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Date</label>

                    <input
                      type="date"
                      value={form.date}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          date: event.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Activity Type</label>

                    <select
                      value={form.activity}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          activity:
                            event.target.value as ActivityType,
                        })
                      }
                    >
                      {activityOptions.map((activity) => (
                        <option key={activity} value={activity}>
                          {activity}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group full">
                    <label>Activity Title</label>

                    <input
                      type="text"
                      placeholder="e.g. Applied fertilizer to maize"
                      value={form.title}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          title: event.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Farm</label>

                    <select
                      value={form.farm}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          farm: event.target.value,
                        })
                      }
                    >
                      <option>Main Farm</option>
                      <option>Lake Farm</option>
                      <option>Other Farm</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Crop / Livestock</label>

                    <input
                      type="text"
                      placeholder="e.g. Maize Hybrid 614"
                      value={form.crop}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          crop: event.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="form-group">
                    <label>Cost (KES)</label>

                    <input
                      type="number"
                      min="0"
                      placeholder="0"
                      value={form.cost}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          cost: event.target.value,
                        })
                      }
                    />
                  </div>

                  <div className="form-group full">
                    <label>Description</label>

                    <textarea
                      rows={4}
                      placeholder="Describe what you did..."
                      value={form.description}
                      onChange={(event) =>
                        setForm({
                          ...form,
                          description: event.target.value,
                        })
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
                  {editingId !== null
                    ? "Save Changes"
                    : "Save Activity"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}