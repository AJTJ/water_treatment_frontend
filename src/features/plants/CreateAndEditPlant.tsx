import { PlantCreateRequest } from "common/services/plantService";
import React, { useState, useEffect } from "react";
import { useCreatePlant } from "./useCreatePlant";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useGetPlant } from "features/plants/usePlantQuery";

const Container = styled.div`
  padding: 1rem;
`;

const Input = styled.input<{ disabled: boolean }>`
  border: ${(props) => (props.disabled ? "none" : "1px solid #ccc")};
  background-color: ${(props) => (props.disabled ? "#f9f9f9" : "#fff")};
  padding: 0.5rem;
  width: 100%;
  margin-bottom: 1rem;

  &:disabled {
    cursor: not-allowed;
  }
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #0056b3;
  }
`;

const CreateAndEditPlant: React.FC = () => {
  const { plantId } = useParams();
  const [isEdit, setIsEdit] = useState(!!plantId);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const { createPlant } = useCreatePlant();
  const { getPlant } = useGetPlant();

  useEffect(() => {
    if (isEdit && plantId) {
      getPlant(plantId);
    }
  }, [isEdit, plantId]);

  const handleCreatePlant = async () => {
    let newPlant: PlantCreateRequest = { name, location };
    await createPlant(newPlant);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      console.log("Updating plant...");
      // Call update function (not implemented here)
    } else {
      handleCreatePlant();
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={!isEdit}
          />
        </div>
        <div>
          <label htmlFor="location">Location:</label>
          <Input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            disabled={!isEdit}
          />
        </div>
        <div>
          {isEdit ? (
            <Button type="submit">Save Changes</Button>
          ) : (
            <Button type="button" onClick={() => setIsEdit(true)}>
              Edit Plant
            </Button>
          )}
        </div>
      </form>
    </Container>
  );
};

export default CreateAndEditPlant;
