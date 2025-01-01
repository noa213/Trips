


import Image from "next/image";
import React, { useState, useEffect } from "react";

const PreviousTrips = () => {
  const [images, setImages] = useState<string[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => URL.createObjectURL(file));
      console.log("Uploaded Images URLs:", newImages); // בדיקה בקונסול
      setImages((prevImages) => [...prevImages, ...newImages]);
    }
  };

  // ניקוי כתובות URL מהזיכרון
  useEffect(() => {
    return () => {
      images.forEach((imageUrl) => URL.revokeObjectURL(imageUrl));
    };
  }, [images]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
     
      <label
        htmlFor="file-upload"
        className="cursor-pointer bg-pink-500 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-pink-600 transition duration-300 ease-in-out"
      >
        העלה תמונות
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
      </label>

      {/* גריד להצגת התמונות */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        {images.map((imageUrl, index) => (
          <div key={index} className="rounded-lg shadow-lg overflow-hidden">
            <Image
              src={imageUrl}
              alt={`Uploaded ${index}`}
              width={100}
              height={100}
              className="w-full h-64 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PreviousTrips;
