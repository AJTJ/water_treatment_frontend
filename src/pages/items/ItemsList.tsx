import React from "react";
import { useManyItems } from "../../hooks/useItem";
import Pagination from "../../components/Pagination";

const ItemList: React.FC = () => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 50;
  const skip = (currentPage - 1) * itemsPerPage; // Calculate skip value based on page
  const {
    itemList: itemResponse,
    isLoading,
    isError,
  } = useManyItems(skip, itemsPerPage);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{isError.message}</div>;
  if (!itemResponse) {
    return <div>Item not found</div>;
  }

  const totalPages = Math.ceil(itemResponse.total / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h1>All Item</h1>
      <ul>
        {itemResponse.items.map((item) => (
          <li key={item.id}>
            <a href={`/item/${item.id}`}>{item.name}</a>
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

export default ItemList;
