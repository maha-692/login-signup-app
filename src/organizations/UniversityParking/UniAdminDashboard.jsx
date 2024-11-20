import React, { useState, useEffect } from 'react';
import './UniAdminDashboard.css';
import axios from 'axios';

const UniAdminDashboard = () => {
    const [slots, setSlots] = useState({
        Student: [],
        Faculty: [],
        EventVIP: [],
        EventVisitor: []
    });
    const [slotId, setSlotId] = useState('');
    const [zoneName, setZoneName] = useState('Zone 1');
    const [slotType, setSlotType] = useState('Student');
    const [isEditing, setIsEditing] = useState(false);
    const [editSlotId, setEditSlotId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const fetchSlots = async () => {
        setIsLoading(true);
        try {
            // Check if the slotType is available
            if (slotType) {
                // Fetch the slots for the given slotType
                const response = await axios.get(`http://localhost:5000/api/dashboard/${slotType}`);
                setSlots((prev) => ({
                    ...prev,
                    [slotType]: response.data
                }));
            } else {
                console.error('No slot type selected');
            }
        } catch (error) {
            console.error(`Error fetching ${slotType} slots:`, error.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    // Fetch data when `slotType` changes
    useEffect(() => {
        if (slotType) { // Ensure `slotType` is defined before making the request
            fetchSlots();
        }
    }, [slotType]);
    
    

    const handleAddSlot = async () => {
        if (!slotId.trim()) {
            alert('Slot ID cannot be empty!');
            return;
        }
        const newSlot = { slotId, zone: zoneName, type: slotType, isBooked: false };
    
        try {
            const response = await axios.post('http://localhost:5000/api/dashboard', newSlot);
            setSlots((prev) => ({
                ...prev,
                [slotType]: [...prev[slotType], response.data.slot]
            }));
            clearFormFields();
            alert('Slot added successfully!');
        } catch (error) {
            console.error('Error adding slot:', error);
            alert(`Error adding slot: ${error.response?.data?.message || error.message}`);
        }
    };
    
    const handleEditSlot = async () => {
        if (!slotId.trim()) {
            alert('Slot ID cannot be empty!');
            return;
        }
        const updatedSlot = { slotId, zone: zoneName, type: slotType };

        try {
            const response = await axios.put(`http://localhost:5000/api/dashboard/${editSlotId}`, updatedSlot);
            setSlots((prev) => ({
                ...prev,
                [slotType]: prev[slotType].map((slot) =>
                    slot.slotId === editSlotId ? { ...slot, ...updatedSlot } : slot
                )
            }));
            setIsEditing(false);
            clearFormFields();
            alert('Slot updated successfully!');
        } catch (error) {
            alert(`Error editing slot: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleDeleteSlot = async (slotId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/dashboard/${slotId}`);
            setSlots((prev) => ({
                ...prev,
                [slotType]: prev[slotType].filter((slot) => slot.slotId !== slotId)
            }));
            alert(response.data.message || 'Slot deleted successfully!');
        } catch (error) {
            alert(`Error deleting slot: ${error.response?.data?.message || error.message}`);
        }
    };

    const clearFormFields = () => {
        setSlotId('');
        setZoneName('Zone 1');
        setSlotType('Student');
        setIsEditing(false);
        setEditSlotId(null);
    };

    const generateReport = () => {
        const report = Object.keys(slots).map((type) => {
            const totalSlots = slots[type].length;
            const bookedSlots = slots[type].filter((slot) => slot.isBooked).length;
            const availableSlots = totalSlots - bookedSlots;
            return { type, totalSlots, bookedSlots, availableSlots };
        });
        console.table(report);
        alert('Report generated! Check the console.');
    };

    return (
        <div className="university-admin-dashboard">
            <h2>University Admin Dashboard</h2>
            <button onClick={generateReport} className="generate-report">Generate Report</button>

            <div className="slot-management">
                <input
                    type="text"
                    placeholder="Enter Slot ID"
                    value={slotId}
                    onChange={(e) => setSlotId(e.target.value)}
                />
                <select value={zoneName} onChange={(e) => setZoneName(e.target.value)}>
                    <option>Zone 1</option>
                    <option>Zone 2</option>
                    <option>Zone 3</option>
                    <option>Zone 4</option>
                    <option>Zone 5</option>
                </select>
                <select value={slotType} onChange={(e) => setSlotType(e.target.value)}>
                    <option value="Student">Student</option>
                    <option value="Faculty">Faculty</option>
                    <option value="EventVIP">Event - VIP</option>
                    <option value="EventVisitor">Event - Visitor</option>
                </select>
                <button
                    onClick={isEditing ? handleEditSlot : handleAddSlot}
                    className={isEditing ? 'edit-slot' : 'add-slot'}
                >
                    {isEditing ? 'Update Slot' : 'Add Slot'}
                </button>
            </div>

            <div className="tabs">
                <button onClick={() => setSlotType('Student')}>Student Slots</button>
                <button onClick={() => setSlotType('Faculty')}>Faculty Slots</button>
                <button onClick={() => setSlotType('EventVIP')}>Event - VIP Slots</button>
                <button onClick={() => setSlotType('EventVisitor')}>Event - Visitor Slots</button>
            </div>

            {isLoading ? (
                <p>Loading slots...</p>
            ) : (
                <div className="slot-details">
                    {Object.keys(slots).map((type) => (
                        <div key={type} className="slot-category">
                            <h3>{type} Parking</h3>
                            {slots[type].length === 0 ? (
                                <p>No slots available</p>
                            ) : (
                                slots[type].map((slot) => (
                                    <div key={slot.slotId} className="slot-card">
                                        <p>Slot ID: {slot.slotId}</p>
                                        <p>Zone: {slot.zone}</p>
                                        <p>Status: {slot.isBooked ? 'Booked' : 'Available'}</p>
                                        <button
                                            onClick={() => {
                                                setSlotId(slot.slotId);
                                                setZoneName(slot.zone);
                                                setSlotType(type);
                                                setIsEditing(true);
                                                setEditSlotId(slot.slotId);
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button onClick={() => handleDeleteSlot(slot.slotId)}>Delete</button>
                                    </div>
                                ))
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default UniAdminDashboard;
