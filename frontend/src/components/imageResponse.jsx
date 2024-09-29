import React, { useEffect, useState } from "react";
import { sha256 } from "js-sha256";
import nacl from "tweetnacl";
import { encode as encodeBase64 } from "base64-arraybuffer"; // Optional: for Base64 encoding
import { QRCodeCanvas } from "qrcode.react"; // Ensure you import QRCodeCanvas if you want to use it

const ResponseDisplay = ({ responseText }) => {
  const [signature, setSignature] = useState("");
  const [publicKey, setPublicKey] = useState("");

  useEffect(() => {
    const generateSignature = () => {
      // Generate a random key pair
      const keyPair = nacl.sign.keyPair();

      // Set the public key in Base64 format for display
      setPublicKey(encodeBase64(keyPair.publicKey));

      // Convert the response text to Uint8Array
      const message = new TextEncoder().encode(responseText);

      // Sign the message
      const signedMessage = nacl.sign(message, keyPair.secretKey);

      // Extract the signature from the signed message
      const signature = signedMessage.slice(0, nacl.sign.signatureLength);

      // Convert signature to Base64 for easier display
      setSignature(encodeBase64(signature));
    };

    if (responseText) {
      generateSignature();
    }
  }, [responseText]);

  return (
    <div className="w-screen min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="mx-7 bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Extracted text</h1>
        <div className="mt-6 p-4 bg-gray-200 rounded-lg overflow-hidden">
          <p className="text-gray-700 break-words">{responseText}</p>
        </div>
      </div>

      <div className="mx-7 bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-4">
        <h1 className="text-2xl font-bold text-center mb-6">
          SHA256 Hash pushed on the blockchain
        </h1>
        <div className="mt-6 p-4 bg-gray-200 rounded-lg overflow-hidden">
          <p className="text-gray-700 break-words">{sha256(responseText)}</p>
        </div>
      </div>

      <div className="mx-7 bg-white p-8 rounded-lg shadow-md w-full max-w-md mt-4">
        <h1 className="text-2xl font-bold text-center mb-6">
          Ed25519 Signature
        </h1>
        <div className="mt-6 p-4 bg-gray-200 rounded-lg overflow-hidden">
          <p className="text-gray-700 break-words">
            {signature.length > 0 ? signature : "Generating signature..."}
          </p>
        </div>
        <div className="mt-4 p-4 bg-gray-200 rounded-lg overflow-hidden">
          <p className="text-gray-700 break-words">Public Key: {publicKey}</p>
        </div>
        {signature && (
          <div className="mt-6 flex justify-center">
            <div>
              <h2 className="text-xl font-bold text-center mb-4">QR Code</h2>
              <QRCodeCanvas
                value={signature}
                size={256}
                level="L"
                includeMargin={true}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResponseDisplay;
