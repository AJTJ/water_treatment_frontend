import React from "react";
import { useManyItemsRequest } from "../../hooks/useItemRequest";

const ItemRequestsList: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 50;
  const skip = (currentPage - 1) * itemsPerPage; // Calculate skip value based on page
  const { itemRequestsResponse, isLoading, isError } = useManyItemsRequest(
    skip,
    itemsPerPage
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{isError.message}</div>;
  if (!itemRequestsResponse) {
    return <div>Item requests not found</div>;
  }

  const totalPages = Math.ceil(itemRequestsResponse.total / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1>Item Requests</h1>
      <ul>
        {itemRequestsResponse.itemRequests.map((itemRequest) => (
          <li key={itemRequest.id}>
            <a href={`/itemRequests/${itemRequest.id}`}>
              <div>{itemRequest.created_at.toString()}</div>
              <div>{itemRequest.description}</div>
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

export default ItemRequestsList;

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
