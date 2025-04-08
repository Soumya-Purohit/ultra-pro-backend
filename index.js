const express = require("express");
const cors = require("cors");
const app = express();
const path = require("path");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for outputs
app.use("/outputs", express.static(path.join(__dirname, "public/outputs")));

// Routes
app.use("/api/social", require("./routes/social.routes"));

// Health check
app.get("/", (req, res) => {
  res.send("Ultra Pro Backend is Live!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
