import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/leave-requests"
      );

      setRequests(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h1>Admin Dashboard</h1>

      {requests.length === 0 ? (
        <p>No Leave Requests</p>
      ) : (
        requests.map((item, index) => (
          <div
            key={index}
            style={{
              border: "1px solid black",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "10px",
            }}
          >
            <p>
              <strong>From:</strong>{" "}
              {item.fromDate}
            </p>

            <p>
              <strong>To:</strong>{" "}
              {item.toDate}
            </p>

            <p>
              <strong>Leave Type:</strong>{" "}
              {item.leaveType}
            </p>

            <p>
              <strong>Reason:</strong>{" "}
              {item.reason}
            </p>

            <button
              style={{
                padding: "8px 15px",
                marginRight: "10px",
              }}
            >
              Accept
            </button>

            <button
              style={{
                padding: "8px 15px",
              }}
            >
              Reject
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminDashboard;