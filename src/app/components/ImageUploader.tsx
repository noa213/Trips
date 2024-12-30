"use client";

import React, { useState } from "react";

const ImageUploader = () => {
  const [images, setImages] = useState<File[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files);
      setImages((prev) => [...prev, ...newImages]);
    }
  };

  const handleDownload = (image: File) => {
    const url = URL.createObjectURL(image);
    const a = document.createElement("a");
    a.href = url;
    a.download = image.name;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Upload and Download Images</h1>
      <label style={styles.uploadButton}>
        Upload Images
        <input
          type="file"
          accept="image/*"
          multiple
          style={styles.fileInput}
          onChange={handleFileUpload}
        />
      </label>
      <div style={styles.grid}>
        {images.map((image, index) => (
          <div key={index} style={styles.card}>
            <img
              src={URL.createObjectURL(image)}
              alt={image.name}
              style={styles.image}
            />
            <button
              style={styles.downloadButton}
              onClick={() => handleDownload(image)}
            >
              ⬇ Download
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center" as const,
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: "24px",
    color: "#333",
    marginBottom: "20px",
  },
  uploadButton: {
    display: "inline-block",
    padding: "10px 20px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#007BFF",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  fileInput: {
    display: "none",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "20px",
  },
  card: {
    position: "relative" as const,
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover" as const,
  },
  downloadButton: {
    position: "absolute" as const,
    bottom: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    backgroundColor: "#28a745",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px",
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default ImageUploader;
