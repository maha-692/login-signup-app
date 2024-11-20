import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import './FacultyParkingAvailability.css';

function FacultyAvailability() {
  const location = useLocation();
  const facultyType = location.state?.facultyType || 'Permanent'; // Get faculty type passed from registration form
  
  const [zones, setZones] = useState([]); // State to hold zones and slots data
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [ticketDetails, setTicketDetails] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    facultyId: '',
    arrivalTime: '',
    departureTime: '',
    bookingDuration: '',
  });

  // Define the priority order for zones (this can be adjusted based on your needs)
  const priorityOrder = ["Zone 1", "Zone 2", "Zone 3", "Zone 4", "Zone 5"];

  // Fetch slots based on faculty type
  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/dashboard/Faculty`);
        console.log("Fetched Zones and Slots:", response.data);

        // Assuming response.data is an array of slot objects
        if (response.data && Array.isArray(response.data)) {
          // Filter and sort slots based on faculty type and priority
          const filteredSlots = response.data.filter(slot => slot.type === "Faculty");
          const sortedZones = sortZones(filteredSlots);
          setZones(sortedZones); // Set the sorted zones in state
        } else {
          console.error("Invalid data format:", response.data);
        }
      } catch (error) {
        console.error("Error fetching slots:", error);
      }
    };

    fetchSlots();

    // Setup a polling mechanism to update zones when slots are added by the admin
    const interval = setInterval(() => {
      fetchSlots();
    }, 5000); // Fetch slots every 5 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  // Function to sort zones based on priority order
  const sortZones = (slots) => {
    const sortedZones = {};
    
    // Add zones in the defined priority order
    priorityOrder.forEach((zone) => {
      const zoneSlots = slots.filter(slot => slot.zone === zone);
      if (zoneSlots.length > 0) {
        sortedZones[zone] = zoneSlots;
      }
    });

    // Include any remaining zones not in the priority order
    slots.forEach((slot) => {
      if (!sortedZones[slot.zone]) {
        sortedZones[slot.zone] = [slot];
      }
    });

    return sortedZones;
  };

  const handleSlotClick = (slot) => {
    setSelectedSlot(slot);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTicket = { ...formData, slot: selectedSlot, facultyType };
    setTicketDetails([...ticketDetails, newTicket]);
    setSelectedSlot(null);
    setFormData({
      name: '',
      facultyId: '',
      arrivalTime: '',
      departureTime: '',
      bookingDuration: '',
    });
  };

  const handleDownloadTicket = (ticket) => {
    const doc = new jsPDF();
    doc.text(`Parking Ticket`, 10, 10);
    doc.text(`Slot: ${ticket.slot}`, 10, 20);
    doc.text(`Name: ${ticket.name}`, 10, 30);
    doc.text(`Faculty ID: ${ticket.facultyId}`, 10, 40);
    doc.text(`Arrival Time: ${ticket.arrivalTime}`, 10, 50);
    doc.text(`Departure Time: ${ticket.departureTime}`, 10, 60);
    doc.text(`Booking Duration: ${ticket.bookingDuration}`, 10, 70);
    doc.text(`Faculty Type: ${ticket.facultyType}`, 10, 80); // Include faculty type in the ticket
    doc.save(`ticket-${ticket.slot}.pdf`);
  };

  return (
    <div className="faculty-parking-availability">
    <div className="parking-availability">
      <h1>Faculty Parking Availability</h1>

      {Object.keys(zones).length === 0 ? (
        <p>Loading parking slots...</p>
      ) : (
        Object.entries(zones).map(([zone, slots]) => (
          <div key={zone} className="zone">
            <h2>{zone}</h2>
            <div className="slots">
              {slots.map((slot) => (
                <div
                  key={slot.slotId}
                  className={`slot ${ticketDetails.find(ticket => ticket.slot === slot.slotId) ? 'booked' : 'available'}`}
                  onClick={() => !ticketDetails.find(ticket => ticket.slot === slot.slotId) && handleSlotClick(slot.slotId)}
                >
                  Slot {slot.slotId} {ticketDetails.find(ticket => ticket.slot === slot.slotId) && '(Booked)'}
                </div>
              ))}
            </div>
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
              placeholder="Enter your Faculty ID"
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
        <div className="ticket-display">
          <h2>Generated Tickets</h2>
          {ticketDetails.map((ticket, index) => (
            <div key={index} className="ticket">
              <p><strong>Slot:</strong> {ticket.slot}</p>
              <p><strong>Name:</strong> {ticket.name}</p>
              <p><strong>Faculty ID:</strong> {ticket.facultyId}</p>
              <p><strong>Arrival Time:</strong> {ticket.arrivalTime}</p>
              <p><strong>Departure Time:</strong> {ticket.departureTime}</p>
              <p><strong>Booking Duration:</strong> {ticket.bookingDuration}</p>
              <p><strong>Faculty Type:</strong> {ticket.facultyType}</p>
              <button onClick={() => handleDownloadTicket(ticket)}>Download Ticket</button>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}

export default FacultyAvailability;
