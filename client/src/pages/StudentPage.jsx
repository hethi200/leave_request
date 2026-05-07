import { useState } from "react";

function StudentPage() {
  const [formData, setFormData] = useState({
    fromDate: "",
    toDate: "",
    leaveType: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/leave-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      alert(data.message);

      setFormData({
        fromDate: "",
        toDate: "",
        leaveType: "",
        reason: "",
      });

    } catch (error) {
      console.error(error);
      alert("Error submitting leave");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Student Leave Request</h2>

      <form onSubmit={handleSubmit}>
        <input type="date" name="fromDate" value={formData.fromDate} onChange={handleChange} required />
        <br /><br />

        <input type="date" name="toDate" value={formData.toDate} onChange={handleChange} required />
        <br /><br />

        <input type="text" name="leaveType" placeholder="Leave Type" value={formData.leaveType} onChange={handleChange} required />
        <br /><br />

        <textarea name="reason" placeholder="Reason" value={formData.reason} onChange={handleChange} required />
        <br /><br />

        <button type="submit">Apply Leave</button>
      </form>
    </div>
  );
}

export default StudentPage;

