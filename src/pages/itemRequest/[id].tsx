import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemRequestDetails from "../../components/ItemRequest";

const ItemRequestPage: React.FC = () => {
  return (
    <div>
      <ItemRequestDetails />
    </div>
  );
};

export default ItemRequestPage;
