import React from "react";
import { useManyEquipment } from "../../hooks/useEquipment";
import Pagination from "../../components/Pagination";

const EquipmentList: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 50;
  const skip = (currentPage - 1) * itemsPerPage; // Calculate skip value based on page
  const {
    equipmentList: equipmentResponse,
    isLoading,
    isError,
  } = useManyEquipment(skip, itemsPerPage);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{isError.message}</div>;
  if (!equipmentResponse) {
    return <div>Equipment not found</div>;
  }

  const totalPages = Math.ceil(equipmentResponse.total / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1>All Equipment</h1>
      <ul>
        {equipmentResponse.equipment.map((equipment) => (
          <li key={equipment.id}>
            <a href={`/equipment/${equipment.id}`}>{equipment.name}</a>
          </li>
        ))}
      </ul>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default EquipmentList;
