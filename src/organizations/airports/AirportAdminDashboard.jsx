import React, { useState } from "react";
import * as XLSX from "xlsx";
import "./AirportAdminDashboard.css";

function AirportAdminDashboard() {
  const [slotId, setSlotId] = useState("");
  const [zone, setZone] = useState("Zone 1");
  const [slotType, setSlotType] = useState("Passenger");
  const [slots, setSlots] = useState({ passenger: [], staff: [], vip: [] });
  const [isEditing, setIsEditing] = useState(false);
  const [editSlotId, setEditSlotId] = useState("");
  const [generatedReport, setGeneratedReport] = useState(null);
  const [showDownloadButton, setShowDownloadButton] = useState(false);

  const handleAddSlot = () => {
    const sectionSlots = slots[slotType.toLowerCase()];
    const slotExists = sectionSlots.some(slot => slot.slotId === slotId && slot.zone === zone);

    if (slotExists) {
      alert(`${slotType} Slot ID ${slotId} in ${zone} already exists.`);
      return;
    }

    const newSlot = { slotId, zone, slotType, status: "available" };
    setSlots({
      ...slots,
      [slotType.toLowerCase()]: [...sectionSlots, newSlot],
    });
    setSlotId("");
  };

  const handleEditSlot = (slot) => {
    setIsEditing(true);
    setEditSlotId(slot.slotId);
    setSlotId(slot.slotId);
    setZone(slot.zone);
    setSlotType(slot.slotType);
  };

  const handleSaveEdit = () => {
    setSlots({
      ...slots,
      [slotType.toLowerCase()]: slots[slotType.toLowerCase()].map(slot =>
        slot.slotId === editSlotId ? { ...slot, slotId, zone, slotType } : slot
      ),
    });
    setIsEditing(false);
    setSlotId("");
    setZone("Zone 1");
    setSlotType("Passenger");
  };

  const handleBookSlot = (id) => {
    setSlots({
      ...slots,
      [slotType.toLowerCase()]: slots[slotType.toLowerCase()].map(slot =>
        slot.slotId === id ? { ...slot, status: "booked" } : slot
      ),
    });
  };

  
  const handleDeleteSlot = (id) => {
    setSlots({
      ...slots,
      [slotType.toLowerCase()]: slots[slotType.toLowerCase()].filter(slot => slot.slotId !== id),
    });
  };

  const generateReport = () => {
    const reportData = [];
    const addSlotsToReport = (section) => {
      slots[section].forEach(slot => {
        reportData.push({
          SlotID: slot.slotId,
          Zone: slot.zone,
          Type: slot.slotType,
          Status: slot.status,
        });
      });
    };

    addSlotsToReport("passenger");
    addSlotsToReport("staff");
    addSlotsToReport("vip");

    setGeneratedReport(reportData);
    setShowDownloadButton(true);
  };

  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(generatedReport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Parking Report");
    XLSX.writeFile(wb, "parking_report.xlsx");
  };

  return (
    <div className="admin-dashboard">
      <h1 className="heading">Airport Admin Dashboard</h1>

      <button onClick={generateReport} className="generate-report-btn">Generate Report</button>

      {generatedReport && (
        <div className="report-content">
          <table border="1" cellPadding="5" style={{ width: "100%", marginTop: "20px" }}>
            <thead>
              <tr>
                <th>Slot ID</th>
                <th>Zone</th>
                <th>Type</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {generatedReport.map((slot, index) => (
                <tr key={index}>
                  <td>{slot.SlotID}</td>
                  <td>{slot.Zone}</td>
                  <td>{slot.Type}</td>
                  <td>{slot.Status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showDownloadButton && (
        <button onClick={downloadExcel} className="download-excel-btn">
          Download Report
        </button>
      )}

      <div className="slot-entry">
        <input
          type="text"
          value={slotId}
          onChange={(e) => setSlotId(e.target.value)}
          placeholder="Enter Slot ID"
        />
        <select value={zone} onChange={(e) => setZone(e.target.value)}>
          <option>Zone 1</option>
          <option>Zone 2</option>
          <option>Zone 3</option>
        </select>
        <select value={slotType} onChange={(e) => setSlotType(e.target.value)}>
          <option>Passenger</option>
          <option>Staff</option>
          <option>VIP</option>
        </select>
        <button onClick={isEditing ? handleSaveEdit : handleAddSlot} className="add-btn">
          {isEditing ? "Save Changes" : "Add Slot"}
        </button>
      </div>

      <div className="slots-container">
        {/* Passenger Slots Section */}
        <div className="available-slots">
          <h2>Passenger Slots</h2>
          {slots.passenger.filter(slot => slot.status === "available").map((slot) => (
            <div className="slot-item passenger" key={slot.slotId}>
              <p><strong>Slot ID:</strong> {slot.slotId} <br /> <strong>Zone:</strong> {slot.zone}</p>
              <div className="buttons">
                <button onClick={() => handleBookSlot(slot.slotId)} className="book-btn">Book</button>
                <button onClick={() => handleEditSlot(slot)} className="edit-btn">Edit</button>
                <button onClick={() => handleDeleteSlot(slot.slotId)} className="delete-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>

        {/* Staff Slots Section */}
        <div className="available-slots">
          <h2>Staff Slots</h2>
          {slots.staff.filter(slot => slot.status === "available").map((slot) => (
            <div className="slot-item staff" key={slot.slotId}>
              <p><strong>Slot ID:</strong> {slot.slotId} <br /> <strong>Zone:</strong> {slot.zone}</p>
              <div className="buttons">
                <button onClick={() => handleBookSlot(slot.slotId)} className="book-btn">Book</button>
                <button onClick={() => handleEditSlot(slot)} className="edit-btn">Edit</button>
                <button onClick={() => handleDeleteSlot(slot.slotId)} className="delete-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>

        {/* VIP Slots Section */}
        <div className="available-slots">
          <h2>VIP Slots</h2>
          {slots.vip.filter(slot => slot.status === "available").map((slot) => (
            <div className="slot-item vip" key={slot.slotId}>
              <p><strong>Slot ID:</strong> {slot.slotId} <br /> <strong>Zone:</strong> {slot.zone}</p>
              <div className="buttons">
                <button onClick={() => handleBookSlot(slot.slotId)} className="book-btn">Book</button>
                <button onClick={() => handleEditSlot(slot)} className="edit-btn">Edit</button>
                <button onClick={() => handleDeleteSlot(slot.slotId)} className="delete-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AirportAdminDashboard;
