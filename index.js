const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from /public/outputs
app.use("/outputs", express.static(path.join(__dirname, "public/outputs")));

// Routes
app.use("/api/social", require("./routes/social.routes"));
app.use("/api/yt", require("./routes/yt.routes")); // YouTube module (Option 2)
app.use("/api/voice-transform", require("./routes/voice.routes"));
app.use("/api/detect-song", require("./routes/songdetect.routes"));

// Health check
app.get("/", (req, res) => {
  res.send("Ultra Pro Max God Backend is Live and Legendary!");
});

// Fallback 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: "API endpoint not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
