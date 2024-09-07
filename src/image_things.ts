import React, { useState } from "react";
import axios from "axios";
import Resizer from "react-image-file-resizer";

interface EquipmentImage {
  url: string;
  message: string;
}

const EquipmentImageUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const MAX_FILE_SIZE_MB = 1; // 1 MB
  const MAX_WIDTH = 800; // Maximum width in pixels
  const MAX_HEIGHT = 800; // Maximum height in pixels

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];

      // Check initial file size before resizing
      if (selectedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
        setMessage(`File size exceeds the limit of ${MAX_FILE_SIZE_MB} MB`);
        return;
      }

      // Resize the image
      Resizer.imageFileResizer(
        selectedFile,
        MAX_WIDTH, // max width
        MAX_HEIGHT, // max height
        "JPEG", // output format
        70, // quality percentage
        0, // rotation
        (uri) => {
          const resizedFile = new File([uri as Blob], selectedFile.name, {
            type: selectedFile.type,
          });

          // Check the resized file size
          if (resizedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
            setMessage(
              `Resized file size exceeds the limit of ${MAX_FILE_SIZE_MB} MB`
            );
            return;
          }

          setFile(resizedFile);
          setMessage("");
        },
        "blob" // output type
      );
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post<EquipmentImage>(
        "/api/v1/s3/upload/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
      setImageUrl(response.data.url);
    } catch (error) {
      setMessage("Error uploading file");
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <h2>Equipment Image Upload</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>
      {message && <p>{message}</p>}
      {imageUrl && (
        <div>
          <h3>Uploaded Image:</h3>
          <img
            src={imageUrl}
            alt="Uploaded Equipment"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </div>
      )}
    </div>
  );
};

export default EquipmentImageUpload;
