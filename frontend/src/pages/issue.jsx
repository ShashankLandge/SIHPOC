import React, { useState } from "react";
import ResponseDisplay from "../components/imageResponse";
import ImageUploader from "../components/imageUploader";

const Issue = () => {
  const [imageResponse, setImageResponse] = useState("");

  return (
    <div className="App">
      {imageResponse ? (
        <ResponseDisplay responseText={imageResponse} />
      ) : (
        <ImageUploader setImageResponse={setImageResponse} />
      )}
    </div>
  );
};

export default Issue;
