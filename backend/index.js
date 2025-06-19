const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

// Import routes
const fileRoutes = require("./routes/fileRoutes");

// Import database initialization
const { initializeDB } = require("./config/database");

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Routes
app.use("/api", fileRoutes);

// Start server
app.listen(PORT, async () => {
  await initializeDB();
  console.log(`Server running on port ${PORT}`);
});
