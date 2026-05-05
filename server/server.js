const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let leaveRequests = [
  {
    fromDate: "2026-04-20",
    toDate: "2026-04-22",
    leaveType: "Sick Leave",
    reason: "Fever",
  },
];

// LOGIN API
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username === "admin" &&
    password === "123"
  ) {
    return res.json({
      success: true,
      role: "admin",
    });
  }

  if (
    username === "user" &&
    password === "456"
  ) {
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
  res.json(leaveRequests);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});