import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EventParking.css';

function EventParking() {
  const [parkingType, setParkingType] = useState(null); // VIP or Visitor
  const [selectedZone, setSelectedZone] = useState(null); // Zone selection
  const [selectedSlot, setSelectedSlot] = useState(null); // Slot selection
  const [zones, setZones] = useState([]); // Zones and slots data
  const [parkingInfo, setParkingInfo] = useState([]); // Booked parking info

  const handleParkingTypeSelect = (type) => {
    setParkingType(type);
    setSelectedZone(null);
    setSelectedSlot(null);
  };

  const handleZoneSelect = (zone) => {
    setSelectedZone(zone);
    setSelectedSlot(null);
  };

  const handleSlotBooking = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const vehicleId = event.target.vehicleId.value;
    const slotId = `Slot ${selectedSlot}`;

    const newEntry = {
      parkingType,
      selectedZone,
      slotId,
      name,
      vehicleId,
    };

    setParkingInfo([...parkingInfo, newEntry]);
    event.target.reset();
  };

  // Fetch event parking slots based on parking type (VIP or Visitor)
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        if (parkingType) {
          // Dynamically change the endpoint based on parkingType
          const response = await axios.get(`http://localhost:5000/api/dashboard/Event${parkingType}`);
          console.log("Fetched Slots:", response.data);

          if (response.data && Array.isArray(response.data)) {
            // Group slots by zones
            const groupedZones = response.data.reduce((acc, slot) => {
              if (!acc[slot.zone]) {
                acc[slot.zone] = [];
              }
              acc[slot.zone].push(slot);
              return acc;
            }, {});
            
            setZones(groupedZones); // Set grouped zones
          }
        }
      } catch (error) {
        console.error("Error fetching slots:", error);
      }
    };

    if (parkingType) {
      fetchSlots();
    }
  }, [parkingType]); // Fetch slots when parking type changes

  return (
    <div className="event-parking-container">
      <h1>Event Parking Management</h1>

      {/* Parking Type Selection */}
      {!parkingType ? (
        <div className="parking-type-selection">
          <h2>Select Parking Type</h2>
          <button onClick={() => handleParkingTypeSelect('VIP')}>VIP Parking</button>
          <button onClick={() => handleParkingTypeSelect('Visitor')}>Visitor Parking</button>
        </div>
      ) : (
        <div>
          <button onClick={() => setParkingType(null)}>Back to Parking Type Selection</button>
          <h2>{parkingType} Parking - Select a Zone</h2>

          {/* Zone Selection */}
          {!selectedZone ? (
            <div className="zone-selection">
              {Object.keys(zones).map((zone) => (
                <button key={zone} onClick={() => handleZoneSelect(zone)}>{zone}</button>
              ))}
            </div>
          ) : (
            <div>
              <button onClick={() => setSelectedZone(null)}>Back to Zones</button>
              <h3>{selectedZone} - Select a Slot</h3>

              {/* Slot Selection */}
              <div className="slot-selection">
                {zones[selectedZone].map((slot) => (
                  <button
                    key={slot.slotId}
                    onClick={() => setSelectedSlot(slot.slotId)}
                  >
                    Slot {slot.slotId}
                  </button>
                ))}
              </div>

              {/* Booking Form */}
              {selectedSlot && (
                <form onSubmit={handleSlotBooking} className="parking-form">
                  <h4>Enter Details for Slot Booking</h4>
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" placeholder="Enter name" required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="vehicleId">Vehicle ID:</label>
                    <input type="text" id="vehicleId" name="vehicleId" placeholder="Enter vehicle ID" required />
                  </div>
                  <input type="hidden" name="slotId" value={`Slot ${selectedSlot}`} />
                  <button type="submit" className="submit-button">Book Slot</button>
                </form>
              )}
            </div>
          )}
        </div>
      )}

      {/* Display Booked Parking Info */}
      <div className="parking-info-display">
        {parkingInfo.length > 0 && <h2>Booked Parking Details</h2>}
        {parkingInfo.map((entry, index) => (
          <div className="parking-card" key={index}>
            <p><strong>Type:</strong> {entry.parkingType}</p>
            <p><strong>Zone:</strong> {entry.selectedZone}</p>
            <p><strong>Slot:</strong> {entry.slotId}</p>
            <p><strong>Name:</strong> {entry.name}</p>
            <p><strong>Vehicle ID:</strong> {entry.vehicleId}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventParking;
