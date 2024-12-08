import Papa from "papaparse";
import { saveAs } from "file-saver";

import { QRCodeBase } from "./qrCodeService";

export const exportToCSV = (qrCodes: QRCodeBase[]) => {
  // Define the CSV data structure
  const csvData = qrCodes.map((qr) => ({
    URL: qr.full_url,
    "Batch Number": qr.batch_number,
  }));

  // Convert the data to CSV format
  const csv = Papa.unparse(csvData);

  // Create a Blob from the CSV string
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

  // Trigger the download of the CSV file
  saveAs(blob, "qr_codes.csv");
};
