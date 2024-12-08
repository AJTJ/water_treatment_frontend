import { usePlantQuery } from "features/plants/usePlantQuery";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCreatePlant } from "./useCreatePlant";
import Fallback from "common/components/Fallback";
import GlobalLoading from "common/components/GlobalLoading";

const Plant: React.FC = () => {
  const { plantId } = useParams();
  const { data: plant, isLoading, error } = usePlantQuery(plantId || "");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image_url: "",
    location: "",
  });

  const createPlantMutation = useCreatePlant();

  if (isLoading) return <GlobalLoading />;

  if (error)
    return <Fallback message={`Error loading plant data: ${error.message}`} />;

  if (!plantId || !plant) return <Fallback message="Plant not found." />;

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setFormData({
        name: plant.name,
        image_url: plant.image_url || "",
        location: plant.location || "",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Check if creating a new plant
    if (!plantId) {
      createPlantMutation.mutate(formData, {
        onSuccess: (data) => {
          console.log("New plant created successfully:", data);
          setIsEditing(false);
        },
        onError: (error) => {
          console.error("Error creating plant:", error.message);
        },
      });
    } else {
      // Update plant logic (not yet implemented in this code)
      console.log("Updated plant data:", formData);
      setIsEditing(false);
    }
  };

  const { name, image_url, location, requests_sheet_url } = plant;

  return (
    <div>
      {isEditing ? (
        <div>
          <h1>Edit Plant</h1>
          <form>
            <div>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                Image URL:
                <input
                  type="text"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div>
              <label>
                Location:
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                />
              </label>
            </div>
            <button type="button" onClick={handleSave}>
              Save
            </button>
            <button type="button" onClick={handleEditToggle}>
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <div>
          <h1>{name}</h1>
          {image_url && <img src={image_url} alt={name} />}
          {location && <p>Location: {location}</p>}
          {requests_sheet_url && (
            <Link to={requests_sheet_url}>Equipment Requests</Link>
          )}
          <Link to={`/plants/${plantId}/qr-codes`}>QR Codes</Link>
          <Link to={`/plants/${plantId}/equipment`}>Equipment</Link>
          <Link to={`/users`}>Users</Link>
          <button onClick={handleEditToggle}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default Plant;
