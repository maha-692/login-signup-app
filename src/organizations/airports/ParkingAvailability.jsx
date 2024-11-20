import React, { useState } from 'react';
import jsPDF from 'jspdf';
import './SlotsAirport.css';

function ParkingAvailability() {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [ticketDetails, setTicketDetails] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    staffId: '',
    arrivalTime: '',
    departureTime: '',
    bookingDuration: '',
  });

  // Zones with parking slots
  const zones = {
    'Zone 1': ['Slot 1', 'Slot 2', 'Slot 3'],
    'Zone 2': ['Slot 1', 'Slot 2', 'Slot 3'],
    'Zone 3': ['Slot 1', 'Slot 2', 'Slot 3'],
  };

  // Handle slot click
  const handleSlotClick = (zone, slot) => {
    setSelectedSlot(`${zone} ${slot}`);
  };

  // Handle form data change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate arrival and departure times
    const arrival = new Date(formData.arrivalTime);
    const departure = new Date(formData.departureTime);
    if (departure <= arrival) {
      alert('Departure time must be after arrival time.');
      return;
    }

    const newTicket = { ...formData, slot: selectedSlot, checkedIn: false };
    setTicketDetails([...ticketDetails, newTicket]);
    setSelectedSlot(null);
    setFormData({
      name: '',
      staffId: '',
      arrivalTime: '',
      departureTime: '',
      bookingDuration: '',
    });
  };

  // Generate PDF ticket
  const handleDownloadTicket = (ticket) => {
    const doc = new jsPDF();
    doc.text('Parking Ticket', 10, 10);
    doc.text(`Slot: ${ticket.slot}`, 10, 20);
    doc.text(`Name: ${ticket.name}`, 10, 30);
    doc.text(`Staff ID: ${ticket.staffId}`, 10, 40);
    doc.text(`Arrival Time: ${ticket.arrivalTime}`, 10, 50);
    doc.text(`Departure Time: ${ticket.departureTime}`, 10, 60);
    doc.text(`Booking Duration: ${ticket.bookingDuration}`, 10, 70);
    doc.save(`ticket-${ticket.slot}.pdf`);
  };

  // Handle Check-In
  const handleCheckIn = (index) => {
    const updatedTickets = [...ticketDetails];
    updatedTickets[index].checkedIn = true;
    setTicketDetails(updatedTickets);
    alert(`Checked in successfully for ${updatedTickets[index].slot}`);
  };

  return (
    <div className="parking-availability">
      <h1>Parking Availability</h1>

      {Object.keys(zones).map((zone) => (
        <div key={zone} className="zone">
          <h2>{zone}</h2>
          <div className="slots">
            {zones[zone].map((slot, index) => (
              <div
                key={index}
                className={`slot ${
                  ticketDetails.find((ticket) => ticket.slot === `${zone} ${slot}`) ? 'booked' : 'available'
                }`}
                onClick={() =>
                  !ticketDetails.find((ticket) => ticket.slot === `${zone} ${slot}`) &&
                  handleSlotClick(zone, slot)
                }
              >
                {slot} {ticketDetails.find((ticket) => ticket.slot === `${zone} ${slot}`) && '(Booked)'}
              </div>
            ))}
          </div>
        </div>
      ))}

      {selectedSlot && (
        <div className="booking-form">
          <h3>Book {selectedSlot}</h3>
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
              name="staffId"
              placeholder="Enter your Staff ID"
              value={formData.staffId}
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
              <p><strong>Staff ID:</strong> {ticket.staffId}</p>
              <p><strong>Arrival Time:</strong> {ticket.arrivalTime}</p>
              <p><strong>Departure Time:</strong> {ticket.departureTime}</p>
              <p><strong>Booking Duration:</strong> {ticket.bookingDuration}</p>
              <p><strong>Status:</strong> {ticket.checkedIn ? 'Checked In' : 'Not Checked In'}</p>
              <button onClick={() => handleDownloadTicket(ticket)}>Download Ticket</button>
              {!ticket.checkedIn && (
                <button onClick={() => handleCheckIn(index)}>Check-In</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ParkingAvailability;
