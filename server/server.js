const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();

app.use(cors());
app.use(express.json());

const FILE_PATH = "leaveRequests.json";

// READ DATA
function readRequests() {
  if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify([]));
  }

  const data = fs.readFileSync(FILE_PATH);
  return JSON.parse(data);
}

// WRITE DATA
function writeRequests(data) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
}

// LOGIN API
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "123") {
    return res.json({
      success: true,
      role: "admin",
    });
  }

  if (username === "user" && password === "456") {
    return res.json({
      success: true,
      role: "user",
    });
  }

  res.json({
    success: false,
  });
});

// GET LEAVE REQUESTS
app.get("/leave-requests", (req, res) => {
  const requests = readRequests();
  res.json(requests);
});

// ADD LEAVE REQUEST
app.post("/leave-requests", (req, res) => {
  const requests = readRequests();

  requests.push(req.body);

  writeRequests(requests);

  res.json({
    message: "Leave request added",
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});