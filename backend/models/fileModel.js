const { pool } = require("../config/database");

// Example model function (currently not used but can be expanded later)
const createFile = async (fileData) => {
  const { filename, originalname, mimetype, filepath, size } = fileData;
  const client = await pool.connect();
  try {
    const result = await client.query(
      "INSERT INTO files (filename, originalname, mimetype, filepath, size) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [filename, originalname, mimetype, filepath, size]
    );
    return result.rows[0];
  } finally {
    client.release();
  }
};

module.exports = {
  createFile,
  // Add more model functions as needed
};
