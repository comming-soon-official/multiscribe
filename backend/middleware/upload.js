const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/"));
  },
  filename: function (req, file, cb) {
    // Get file extension
    const fileExtension = path.extname(file.originalname);
    // Generate UUID filename with original extension
    const newFilename = `${uuidv4()}${fileExtension}`;
    // Store the original name in the request for later use
    if (!req.fileData) req.fileData = {};
    req.fileData.viewFilename = file.originalname;
    req.fileData.storedFilename = newFilename;
    cb(null, newFilename);
  },
});

// Increase the file size limit to 100MB (from 10MB)
const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 1024 }, // 100MB limit
});

module.exports = upload;
