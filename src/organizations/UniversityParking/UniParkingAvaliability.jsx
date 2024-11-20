import React, { useState, useEffect } from "react";
import axios from "axios";
import './Slots.css';

const UniParkingAvailability = () => {
  const [zones, setZones] = useState([]); // State to hold all zones and slots
  const [selectedSlot, setSelectedSlot] = useState(null); // State to track selected slot for booking
  const [formData, setFormData] = useState({
    name: "",
    facultyId: "",
    arrivalTime: "",
    departureTime: "",
    bookingDuration: "",
  });
  const [ticketDetails, setTicketDetails] = useState([]); // State to hold generated tickets

  // Priority order for zones
  const priorityOrder = ["Zone 1", "Zone 2", "Zone 3", "Zone 4", "Zone 5"];

  // Fetch zone and slot details from the backend
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        // Update API endpoint as per your backend route
        const response = await axios.get("http://localhost:5000/api/dashboard/Student");

        if (response.status === 200) {
          console.log("Fetched Zones and Slots:", response.data);

          if (Array.isArray(response.data)) {
            const sortedZones = sortZones(response.data);
            setZones(sortedZones);
          } else {
            console.error("Invalid data format:", response.data);
          }
        } else {
          console.error("Failed to fetch slots:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching slots:", error);
      }
    };

    fetchSlots();
  }, []);

  // Function to sort zones based on priority order
  const sortZones = (slots) => {
    const sortedZones = [];
    priorityOrder.forEach((zone) => {
      const zoneSlots = slots.filter((slot) => slot.zone === zone);
      if (zoneSlots.length > 0) {
        sortedZones.push({ zone, slots: zoneSlots });
      }
    });
    return sortedZones;
  };

  // Handle slot selection for booking
  const handleSlotSelection = (slotId) => {
    setSelectedSlot(slotId);
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle booking form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const newTicket = {
      slot: selectedSlot,
      ...formData,
    };
    setTicketDetails([...ticketDetails, newTicket]);
    setSelectedSlot(null);
    setFormData({
      name: "",
      facultyId: "",
      arrivalTime: "",
      departureTime: "",
      bookingDuration: "",
    });
    alert("Booking confirmed!");
  };

  // Handle ticket download as a PDF
  const handleDownloadTicket = (ticket) => {
    const ticketContent = `
      Slot: ${ticket.slot}
      Name: ${ticket.name}
      Student ID: ${ticket.facultyId}
      Arrival Time: ${ticket.arrivalTime}
      Departure Time: ${ticket.departureTime}
      Booking Duration: ${ticket.bookingDuration}
    `;
    const blob = new Blob([ticketContent], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Ticket_${ticket.slot}.pdf`;
    link.click();
  };

  return (
    <div className="parking-availability-container">
      <h1>Parking Availability</h1>
      {zones.length === 0 ? (
        <p>Loading parking slots...</p>
      ) : (
        zones.map(({ zone, slots }) => (
          <div key={zone} className="zone">
            <h2>{zone}</h2>
            <p>{slots.length} slots available</p>
            <ul className="slot-list">
              {slots.map((slot) => (
                <li key={slot.slotId} className="slot-card">
                  <button
                    className={slot.isBooked ? "booked" : "available"}
                    onClick={() => handleSlotSelection(slot.slotId)}
                    disabled={slot.isBooked}
                  >
                    Slot {slot.slotId} - {slot.isBooked ? "Booked" : "Available"}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}

      {selectedSlot && (
        <div className="booking-form">
          <h3>Book Slot {selectedSlot}</h3>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="facultyId"
              placeholder="Enter your Student ID"
              value={formData.facultyId}
              onChange={handleChange}
              required
            />
            <input
              type="datetime-local"
              name="arrivalTime"
              value={formData.arrivalTime}
              onChange={handleChange}
              required
            />
            <input
              type="datetime-local"
              name="departureTime"
              value={formData.departureTime}
              onChange={handleChange}
              required
            />
            <select
              name="bookingDuration"
              value={formData.bookingDuration}
              onChange={handleChange}
              required
            >
              <option value="">Select Booking Duration</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
              <option value="Semester-wise">Semester-wise</option>
            </select>
            <button type="submit">Confirm Booking</button>
          </form>
        </div>
      )}

      {ticketDetails.length > 0 && (
        <div className="ticket-list">
          <h3>Your Tickets</h3>
          {ticketDetails.map((ticket, index) => (
            <div key={index} className="ticket-card">
              <p>Slot: {ticket.slot}</p>
              <p>Name: {ticket.name}</p>
              <p>Faculty ID: {ticket.facultyId}</p>
              <button onClick={() => handleDownloadTicket(ticket)}>
                Download Ticket
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UniParkingAvailability;
