const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const fileController = require("../controllers/fileController");
const multer = require("multer");

// File upload endpoint with error handling
router.post("/upload", (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      if (err instanceof multer.MulterError) {
        // A Multer error occurred when uploading
        if (err.code === "LIMIT_FILE_SIZE") {
          return res.status(413).json({
            success: false,
            message: "File too large. Maximum file size is 100MB.",
            error: err.message,
          });
        }
        return res.status(400).json({
          success: false,
          message: "File upload error",
          error: err.message,
        });
      } else {
        // An unknown error occurred
        return res.status(500).json({
          success: false,
          message: "Unknown error",
          error: err.message,
        });
      }
    }

    // If successful, proceed to the controller
    fileController.uploadFile(req, res);
  });
});

// Get all files
router.get("/files", fileController.getAllFiles);

// Get file by ID
router.get("/files/:id", fileController.getFileById);

module.exports = router;
