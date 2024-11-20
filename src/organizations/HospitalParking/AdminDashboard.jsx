import React, { useState } from "react";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [slotId, setSlotId] = useState("");
  const [zone, setZone] = useState("Zone 1");
  const [slotType, setSlotType] = useState("Staff");
  const [slots, setSlots] = useState({
    staff: [],
    ambulance: [],
    visitor: [],
    vip: [],
    patient: [],
    emergency: [],
  });

  // Function to add a slot
  const handleAddSlot = () => {
    if (!slotId || !zone || !slotType) {
      alert("Please fill in all fields before adding a slot.");
      return;
    }

    const sectionSlots = slots[slotType.toLowerCase()];
    const slotExists = sectionSlots.some(
      (slot) => slot.slotId === slotId && slot.zone === zone
    );

    if (slotExists) {
      alert(`${slotType} Slot ID ${slotId} in ${zone} already exists.`);
      return;
    }

    const newSlot = { slotId, zone, slotType, status: "available" };
    setSlots({
      ...slots,
      [slotType.toLowerCase()]: [...sectionSlots, newSlot],
    });
    resetFields();
  };

  // Function to delete a slot
  const handleDeleteSlot = (slotToDelete) => {
    setSlots((prevSlots) => {
      const updatedSlots = { ...prevSlots };
      updatedSlots[slotToDelete.slotType.toLowerCase()] = updatedSlots[slotToDelete.slotType.toLowerCase()].filter(
        (slot) => slot.slotId !== slotToDelete.slotId || slot.zone !== slotToDelete.zone
      );
      return updatedSlots;
    });
  };

  // Reset input fields
  const resetFields = () => {
    setSlotId("");
    setZone("Zone 1");
    setSlotType("Staff");
  };

  return (
    <div className="hospital-admin-parking">
      <h1 className="heading">Hospital Admin Dashboard</h1>

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
          <option>Staff</option>
          <option>Ambulance</option>
          <option>Visitor</option>
          <option>VIP</option>
          <option>Patient</option>
          <option>Emergency</option>
        </select>
        <button onClick={handleAddSlot} className="action-btn">
          Add Slot
        </button>
      </div>

      {/* Slot display section */}
      <div className="slots-display">
        {Object.entries(slots).map(([type, typeSlots]) => (
          <div key={type} className="slot-section">
            <h3>{type.charAt(0).toUpperCase() + type.slice(1)} Slots</h3>
            <ul>
              {typeSlots.map((slot) => (
                <li key={`${slot.slotId}-${slot.zone}`} className="slot-item">
                  <span>
                    ID: {slot.slotId}, Zone: {slot.zone}
                  </span>
                  <div className="button-group">
                    <button
                      onClick={() => handleDeleteSlot(slot)}
                      className="action-btn"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
