import {
  useState,
  useEffect,
} from "react";

function StudentPage() {
  const [formData, setFormData] =
    useState({
      fromDate: "",
      toDate: "",
      leaveType: "",
      reason: "",
    });

  const [requests, setRequests] =
    useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const fetchRequests = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/leave-requests"
      );

      const data =
        await response.json();

      setRequests(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/leave-requests",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            formData
          ),
        }
      );

      const data =
        await response.json();

      alert(data.message);

      setFormData({
        fromDate: "",
        toDate: "",
        leaveType: "",
        reason: "",
      });

      fetchRequests();
    } catch (error) {
      console.error(error);

      alert(
        "Error submitting leave"
      );
    }
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "50px",
      }}
    >
      <h2>
        Student Leave Request
      </h2>

      <form
        onSubmit={handleSubmit}
      >
        <input
          type="date"
          name="fromDate"
          value={formData.fromDate}
          onChange={
            handleChange
          }
          required
        />

        <br />
        <br />

        <input
          type="date"
          name="toDate"
          value={formData.toDate}
          onChange={
            handleChange
          }
          required
        />

        <br />
        <br />

        <input
          type="text"
          name="leaveType"
          placeholder="Leave Type"
          value={
            formData.leaveType
          }
          onChange={
            handleChange
          }
          required
        />

        <br />
        <br />

        <textarea
          name="reason"
          placeholder="Reason"
          value={formData.reason}
          onChange={
            handleChange
          }
          required
        />

        <br />
        <br />

        <button type="submit">
          Apply Leave
        </button>
      </form>

      <h3
        style={{
          marginTop: "40px",
        }}
      >
        Your Leave Requests
      </h3>

      {requests.length === 0 ? (
        <p>
          No Leave Requests
        </p>
      ) : (
        requests.map(
          (item, index) => (
            <div
              key={index}
              style={{
                border:
                  "1px solid black",
                margin: "10px",
                padding: "10px",
                borderRadius:
                  "10px",
              }}
            >
              <p>
                <strong>
                  From:
                </strong>{" "}
                {
                  item.fromDate
                }
              </p>

              <p>
                <strong>
                  To:
                </strong>{" "}
                {item.toDate}
              </p>

              <p>
                <strong>
                  Leave Type:
                </strong>{" "}
                {
                  item.leaveType
                }
              </p>

              <p>
                <strong>
                  Reason:
                </strong>{" "}
                {item.reason}
              </p>

              <p>
                <strong>
                  Status:
                </strong>{" "}
                {item.status}
              </p>
            </div>
          )
        )
      )}
    </div>
  );
}

export default StudentPage;