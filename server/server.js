const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let leaveRequests = [];

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
  res.json(leaveRequests);
});

// ADD LEAVE REQUEST
app.post("/leave-requests", (req, res) => {
  const newRequest = {
    ...req.body,
    status: "Pending",
  };

  leaveRequests.push(newRequest);

  res.json({
    message: "Leave Request Submitted",
  });
});

// UPDATE LEAVE STATUS
app.put("/leave-requests/:index", (req, res) => {
  const index = req.params.index;

  const { status } = req.body;

  leaveRequests[index].status = status;

  res.json({
    message: `Leave ${status}`,
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});