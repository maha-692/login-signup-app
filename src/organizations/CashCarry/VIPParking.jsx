import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import './VIPParking.css'; // Add VIP-specific styles

function VIPParking() {
  const location = useLocation();
  
  // Assuming VIP customer type is passed in location.state
  const customerType = location.state?.customerType || 'VIP'; // Default to 'VIP'

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [ticketDetails, setTicketDetails] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    vehicleType: '',
    plateNumber: '',
    arrivalTime: '',
    departureTime: '',
    bookingDuration: '',
  });

  // Zones with VIP parking slots
  const zones = {
    'VIP Zone 1': ['Slot 1', 'Slot 2', 'Slot 3'],
    'VIP Zone 2': ['Slot 1', 'Slot 2', 'Slot 3'],
    'VIP Zone 3': ['Slot 1', 'Slot 2', 'Slot 3'],
  };

  // Handle slot click
  const handleSlotClick = (slot, zone) => {
    setSelectedSlot(`${zone} - ${slot}`); // Combine zone and slot name to make it unique
  };

  // Handle form data change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const arrival = new Date(formData.arrivalTime);
    const departure = new Date(formData.departureTime);

    // Ensure departure time is after arrival time
    if (departure <= arrival) {
      alert("Departure time must be after arrival time. Please correct the times.");
      return; // Prevent form submission
    }

    const newTicket = { ...formData, slot: selectedSlot, customerType };
    setTicketDetails([...ticketDetails, newTicket]);
    setSelectedSlot(null);
    setFormData({
      name: '',
      vehicleType: '',
      plateNumber: '',
      arrivalTime: '',
      departureTime: '',
      bookingDuration: '',
    });
  };

  // Generate PDF ticket
  const handleDownloadTicket = (ticket) => {
    const doc = new jsPDF();
    doc.text(`VIP Parking Ticket`, 10, 10);
    doc.text(`Slot: ${ticket.slot}`, 10, 20);
    doc.text(`Name: ${ticket.name}`, 10, 30);
    doc.text(`Vehicle Type: ${ticket.vehicleType}`, 10, 40);
    doc.text(`Plate Number: ${ticket.plateNumber}`, 10, 50);
    doc.text(`Arrival Time: ${ticket.arrivalTime}`, 10, 60);
    doc.text(`Departure Time: ${ticket.departureTime}`, 10, 70);
    doc.text(`Booking Duration: ${ticket.bookingDuration}`, 10, 80);
    doc.text(`Customer Type: ${ticket.customerType}`, 10, 90); // Include customer type in the ticket
    doc.save(`ticket-${ticket.slot}.pdf`);
  };

  return (
    <div className="vip-parking">
      <h1>VIP Parking Availability</h1>

      {Object.keys(zones).map((zone) => (
        <div key={zone} className="zone">
          <h2>{zone}</h2>
          <div className="slots">
            {zones[zone].map((slot, index) => (
              <div
                key={index}
                className={`slot ${ticketDetails.find(ticket => ticket.slot === `${zone} - ${slot}`) ? 'booked' : 'available'}`}
                onClick={() => !ticketDetails.find(ticket => ticket.slot === `${zone} - ${slot}`) && handleSlotClick(slot, zone)}
              >
                {slot} {ticketDetails.find(ticket => ticket.slot === `${zone} - ${slot}`) && '(Booked)'}
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
              name="vehicleType"
              placeholder="Enter vehicle type"
              value={formData.vehicleType}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="plateNumber"
              placeholder="Enter plate number"
              value={formData.plateNumber}
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
              <p><strong>Vehicle Type:</strong> {ticket.vehicleType}</p>
              <p><strong>Plate Number:</strong> {ticket.plateNumber}</p>
              <p><strong>Arrival Time:</strong> {ticket.arrivalTime}</p>
              <p><strong>Departure Time:</strong> {ticket.departureTime}</p>
              <p><strong>Booking Duration:</strong> {ticket.bookingDuration}</p>
              <button onClick={() => handleDownloadTicket(ticket)}>Download Ticket</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default VIPParking;
