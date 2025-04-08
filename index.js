const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/outputs", express.static(path.join(__dirname, "public/outputs")));

// Routes
app.get("/", (req, res) => {
  res.send("Ultra Pro Max Backend is Running!");
});

app.use("/api/extract", require("./routes/extract.routes"));
app.use("/api/voice-transform", require("./routes/voice.routes"));
app.use("/api/detect-song", require("./routes/songdetect.routes"));
app.use("/api/social", require("./routes/social.routes"));
app.use("/api/movies", require("./routes/movies.routes"));
app.use("/api/adult", require("./routes/adult.routes"));

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ success: false, message: "API endpoint not found" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
