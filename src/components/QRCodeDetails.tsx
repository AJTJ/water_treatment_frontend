import React from "react";
import { useParams } from "react-router-dom";
import { useQRCodeById } from "../hooks/useQRCode";

const QRCodeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { qrCode, isLoading, isError } = useQRCodeById(id ?? "");

  if (!id) {
    return <div>Error: No qr_code ID provided</div>;
  }
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading qr_code details.</div>;
  if (!qrCode) {
    return <div>QR Code not found</div>;
  }

  return (
    <div>
      <h2>QR Code</h2>
      <p>ID: {id}</p>
      <p>Batch Number: {qrCode.batch_number}</p>
      <p>Full URL: {qrCode.full_url}</p>
      <p>Status: {qrCode.status}</p>
      <p>Item ID: {qrCode.item_id || "no item associated"}</p>
    </div>
  );
};

export default QRCodeDetails;
