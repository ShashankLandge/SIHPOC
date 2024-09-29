const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const { GoogleAIFileManager } = require("@google/generative-ai/server");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

const app = express();
const port = 5000;

// Enable CORS
const cors = require("cors");
app.use(cors());

// Set up multer for handling file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Endpoint for handling the file upload
app.post("/upload-image", upload.single("file"), async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const tempFilePath = path.join(__dirname, file.originalname);

  // Save the file to a temporary location
  fs.writeFileSync(tempFilePath, file.buffer);

  try {
    // Create GoogleAIFileManager instance
    const fileManager = new GoogleAIFileManager(process.env.API_KEY);

    // Upload the file using the file path
    const uploadResult = await fileManager.uploadFile(tempFilePath, {
      mimeType: file.mimetype,
      displayName: file.originalname,
    });

    // Log the uploaded file details
    console.log(
      `Uploaded file ${uploadResult.file.displayName} as: ${uploadResult.file.uri}`
    );

    // Generate content using the GoogleGenerativeAI
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are an advanced document analysis model. Your task is to extract specific information from a given document image. Please ensure that your output is consistent and deterministic for the same input image. 
The extracted information should be provided in the following JSON format:
{
  "issuer": "<Issuer's Name>",
  "recipient": "<Recipient's Name>",
  "document_type": "<Type of Document>",
  "document_content": "<Full extracted text from the document>",
  "date": "<Date if available>",
  "additional_info": "<Any additional relevant information>"
}
When processing the document image, please focus on accurately identifying and extracting the following key elements and please ignore the unnecessary data and noise:
Issuer: The entity that issued the document.
Recipient: The person or organization the document is addressed to.
Document Type: The classification of the document (e.g., invoice, contract, certificate).
Document Content: The full text present in the document image.
Please ensure that the output strictly adheres to the specified format, and avoid any unnecessary information or variations in the structure. Just give the object itself and nothing else.`;

    const result = await model.generateContent([
      prompt,
      {
        fileData: {
          fileUri: uploadResult.file.uri,
          mimeType: file.mimetype,
        },
      },
    ]);

    // Get the generated response text
    const responseText = result.response.text();

    // Clean up the temporary file
    fs.unlinkSync(tempFilePath);

    // Respond with the uploaded file URI and generated text
    res.json({
      fileUri: uploadResult.file.uri,
      responseText: responseText,
    });
  } catch (error) {
    console.error("Error uploading the image:", error);
    res
      .status(500)
      .json({ error: "Failed to upload image and generate response" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
