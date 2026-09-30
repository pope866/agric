import {
  MapPin,
  Ruler,
  Wheat,
  MoreVertical,
} from "lucide-react";

interface FarmCardProps {
  name: string;
  location: string;
  size: string;
  crops: number;
}

function FarmCard({
  name,
  location,
  size,
  crops,
}: FarmCardProps) {
  return (
    <div className="farm-card">

      <div className="farm-image">
        <div className="farm-image-overlay">
          <span>ACTIVE FARM</span>
        </div>

        <div className="farm-placeholder">
          🌾
        </div>
      </div>

      <div className="farm-card-body">

        <div className="farm-title-row">
          <div>
            <h3>{name}</h3>

            <p className="location-text">
              <MapPin size={14} />
              {location}
            </p>
          </div>

          <button className="small-icon-button">
            <MoreVertical size={18} />
          </button>
        </div>

        <div className="farm-info-grid">

          <div>
            <Ruler size={17} />
            <span>Farm Size</span>
            <strong>{size}</strong>
          </div>

          <div>
            <Wheat size={17} />
            <span>Active Crops</span>
            <strong>{crops}</strong>
          </div>

        </div>

        <button className="farm-view-button">
          View Farm
        </button>

      </div>

    </div>
  );
}

export default FarmCard;