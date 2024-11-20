import React, { useState } from 'react';
import { jsPDF } from "jspdf";
import './PatientParking.css';

const PatientParking = () => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [ticketDetails, setTicketDetails] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    vehicleId: '',
    patientCondition: '', // New field for patient condition
    parkingDuration: '',  // Field for parking duration
    adminDateTime: '',    // Field for Admin Date and Time
    dischargeDateTime: '', // Field for Estimated Discharge Date and Time
  });
  const [error, setError] = useState('');

  // Define Patient parking zones and slots
  const zones = {
    'Zone 1': ['Slot 1', 'Slot 2', 'Slot 3'],
    'Zone 2': ['Slot 1', 'Slot 2', 'Slot 3'],
    'Zone 3': ['Slot 1', 'Slot 2', 'Slot 3'],
  };

  const handleSlotClick = (zone, slot) => {
    setSelectedSlot({ zone, slot });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.vehicleId || !formData.patientCondition) {
      setError('Please fill in all fields.');
      return;
    }

    // Validation for Fixed Duration
    if (formData.patientCondition === 'Fixed Duration') {
      const admitDateTime = new Date(formData.adminDateTime);
      const dischargeDateTime = new Date(formData.dischargeDateTime);

      if (admitDateTime >= dischargeDateTime) {
        setError('Discharge date and time must be after admit date and time.');
        return;
      }
    }

    setError(''); // Clear error if all validations pass

    const newTicket = { ...formData, slot: selectedSlot };
    setTicketDetails([...ticketDetails, newTicket]);
    setSelectedSlot(null);
    setFormData({
      name: '',
      vehicleId: '',
      patientCondition: '',
      parkingDuration: '',
      adminDateTime: '',
      dischargeDateTime: '',
    });
  };

  const handleDownloadTicket = (ticket) => {
    const doc = new jsPDF();
    doc.text(`Patient Parking Ticket`, 10, 10);
    doc.text(`Slot: ${ticket.slot.slot}`, 10, 20);
    doc.text(`Zone: ${ticket.slot.zone}`, 10, 30);
    doc.text(`Name: ${ticket.name}`, 10, 40);
    doc.text(`Vehicle ID: ${ticket.vehicleId}`, 10, 50);
    doc.text(`Patient Condition: ${ticket.patientCondition}`, 10, 60);
    doc.save(`patient-ticket-${ticket.slot.zone}-${ticket.slot.slot}.pdf`);
  };

  return (
    <div className="patient-section">
      <h1>Patient Parking Slot Availability</h1>

      {Object.keys(zones).map((zone) => (
        <div key={zone} className="zone">
          <h2>{zone}</h2>
          <div className="slots">
            {zones[zone].map((slot, index) => {
              const isBooked = ticketDetails.some(
                (ticket) => ticket.slot.zone === zone && ticket.slot.slot === slot
              );
              return (
                <div
                  key={index}
                  className={`slot ${isBooked ? 'booked' : 'available'}`}
                  onClick={() => !isBooked && handleSlotClick(zone, slot)}
                >
                  {slot} {isBooked && '(Booked)'}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {selectedSlot && (
        <div className="booking-form">
          <h3>Book {selectedSlot.slot} in {selectedSlot.zone}</h3>
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
              name="vehicleId"
              placeholder="Enter Vehicle ID"
              value={formData.vehicleId}
              onChange={handleChange}
              required
            />

            {/* Patient Condition Dropdown */}
            <select
              name="patientCondition"
              value={formData.patientCondition}
              onChange={handleChange}
              required
            >
              <option value="">Select Patient Condition</option>
              <option value="Routine Check-up">Routine Check-up</option>
              <option value="Fixed Duration">Fixed Duration</option>
            </select>

            {/* Conditionally Rendered Inputs based on Patient Condition */}
            {formData.patientCondition === 'Routine Check-up' && (
              <input
                type="text"
                name="parkingDuration"
                placeholder="Enter Parking Duration"
                value={formData.parkingDuration}
                onChange={handleChange}
                required
              />
            )}

            {formData.patientCondition === 'Fixed Duration' && (
              <>
                <input
                  type="datetime-local"
                  name="adminDateTime"
                  value={formData.adminDateTime}
                  onChange={handleChange}
                  required
                />
                <input
                  type="datetime-local"
                  name="dischargeDateTime"
                  value={formData.dischargeDateTime}
                  onChange={handleChange}
                  required
                />
              </>
            )}

            {error && <p className="error">{error}</p>}
            <button type="submit">Confirm Booking</button>
          </form>
        </div>
      )}

      {ticketDetails.length > 0 && (
        <div className="ticket-display">
          <h3>Generated Tickets</h3>
          {ticketDetails.map((ticket, index) => (
            <div key={index} className="ticket">
              <p><strong>Slot:</strong> {ticket.slot.slot} in {ticket.slot.zone}</p>
              <p><strong>Name:</strong> {ticket.name}</p>
              <p><strong>Vehicle ID:</strong> {ticket.vehicleId}</p>
              <p><strong>Patient Condition:</strong> {ticket.patientCondition}</p>
              {ticket.patientCondition === 'Routine Check-up' && (
                <p><strong>Parking Duration:</strong> {ticket.parkingDuration}</p>
              )}
              {ticket.patientCondition === 'Fixed Duration' && (
                <>
                  <p><strong>Admit Date and Time:</strong> {ticket.adminDateTime}</p>
                  <p><strong>Estimated Discharge Date and Time:</strong> {ticket.dischargeDateTime}</p>
                </>
              )}
              <button onClick={() => handleDownloadTicket(ticket)}>Download Ticket</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientParking;
