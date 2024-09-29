import React, { useState } from "react";

const ImageUploader = ({ setImageResponse }) => {
  const [image, setImage] = useState(null);
  const [file, setFile] = useState(null);
  const [fileUri, setFileUri] = useState("");

  // Handle image file selection
  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    if (
      selectedFile &&
      (selectedFile.type === "image/jpeg" || selectedFile.type === "image/png")
    ) {
      setImage(URL.createObjectURL(selectedFile));
      setFile(selectedFile);
    } else {
      alert("Please upload a PNG or JPEG image");
    }
  };

  // Function to send the image to the Express server
  const uploadToGeminiAPI = async () => {
    if (!file) {
      alert("Please select an image to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/upload-image", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setFileUri(result.fileUri);
        setImageResponse(result.responseText);
        console.log(result.responseText);
      } else {
        console.error(result.error);
        setImageResponse("Failed to generate response from the image.");
      }
    } catch (error) {
      console.error("Error uploading the image:", error);
      setImageResponse("Failed to generate response from the image.");
    }
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-screen bg-white p-8 rounded-lg shadow-md w-full max-w-sm mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6">Upload Document</h1>
        {image ? (
          <img
            src={image}
            alt="Uploaded Preview"
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
            <span>No Image Uploaded</span>
          </div>
        )}
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="file-upload"
        >
          Select PNG/JPEG/PDF:
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".png, .jpeg"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none"
        />
        <button
          onClick={uploadToGeminiAPI}
          className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Upload and Analyze Document
        </button>
        <button
          onClick={() => setImage(null)}
          className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
        >
          Clear Document
        </button>
        {fileUri && (
          <div className="mt-6 p-4 bg-gray-200 rounded-lg">
            <p className="text-gray-700">File URI: {fileUri}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
