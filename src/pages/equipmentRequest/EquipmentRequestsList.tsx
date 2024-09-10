import React from "react";
import { useManyEquipmentRequest } from "../../hooks/useEquipmentRequest";

const EquipmentRequestsList: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 50;
  const skip = (currentPage - 1) * itemsPerPage; // Calculate skip value based on page
  const { equipmentRequestsResponse, isLoading, isError } =
    useManyEquipmentRequest(skip, itemsPerPage);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{isError.message}</div>;
  if (!equipmentRequestsResponse) {
    return <div>Equipment requests not found</div>;
  }

  const totalPages = Math.ceil(equipmentRequestsResponse.total / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1>Equipment Requests</h1>
      <ul>
        {equipmentRequestsResponse.equipmentRequests.map((equipmentRequest) => (
          <li key={equipmentRequest.id}>
            <a href={`/equipmentRequests/${equipmentRequest.id}`}>
              <div>{equipmentRequest.created_at.toString()}</div>
              <div>{equipmentRequest.description}</div>
            </a>
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

export default EquipmentRequestsList;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div>
      <button onClick={handlePreviousPage} disabled={currentPage === 1}>
        Previous
      </button>
      <span>{currentPage}</span>
      <button onClick={handleNextPage} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
};
