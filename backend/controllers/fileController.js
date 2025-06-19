const { pool } = require("../config/database");

// Upload a file
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No file uploaded" });
    }

    const { filename, originalname, mimetype, path: filepath, size } = req.file;
    // Get the view filename (original name) from request
    const viewFilename = req.fileData?.viewFilename || originalname;

    const client = await pool.connect();
    const result = await client.query(
      "INSERT INTO files (filename, originalname, mimetype, filepath, size) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [filename, originalname, mimetype, filepath, size]
    );
    client.release();

    res.status(201).json({
      success: true,
      message: "File uploaded successfully",
      file: {
        ...result.rows[0],
        viewFilename: viewFilename, // Add the original filename for viewing
      },
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({
      success: false,
      message: "Error uploading file",
      error: error.message,
    });
  }
};

// Get all files
const getAllFiles = async (req, res) => {
  try {
    const client = await pool.connect();
    const result = await client.query(
      "SELECT *, originalname as viewFilename FROM files ORDER BY upload_date DESC"
    );
    client.release();

    res.json({
      success: true,
      files: result.rows,
    });
  } catch (error) {
    console.error("Error retrieving files:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving files",
      error: error.message,
    });
  }
};

// Get file by ID
const getFileById = async (req, res) => {
  try {
    const fileId = req.params.id;
    const client = await pool.connect();
    const result = await client.query(
      "SELECT *, originalname as viewFilename FROM files WHERE id = $1",
      [fileId]
    );
    client.release();

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "File not found" });
    }

    res.json({
      success: true,
      file: result.rows[0],
    });
  } catch (error) {
    console.error("Error retrieving file:", error);
    res.status(500).json({
      success: false,
      message: "Error retrieving file",
      error: error.message,
    });
  }
};

module.exports = {
  uploadFile,
  getAllFiles,
  getFileById,
};
