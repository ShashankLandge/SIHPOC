import React, { useState } from "react";
import ResponseDisplayVerify from "../components/imageResponse(verify)";
import ImageUploader from "../components/imageUploader";

const Verify = () => {
  const [imageResponse, setImageResponse] = useState("");

  return (
    <div className="App">
      {imageResponse ? (
        <ResponseDisplayVerify responseText={imageResponse} />
      ) : (
        <ImageUploader setImageResponse={setImageResponse} />
      )}
    </div>
  );
};

export default Verify;
