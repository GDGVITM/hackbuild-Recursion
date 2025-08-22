import Venue from '../models/Venue.js';

// Get all venues with optional filtering and sorting
export const getAllVenues = async (req, res) => {
  try {
    const { type, capacity, facilities } = req.query;
    
    // Build query based on filters
    const query = { isActive: true };
    if (type) query.type = type;
    if (capacity) query.capacity = { $gte: parseInt(capacity) };
    if (facilities) query.facilities = { $all: facilities.split(',') };
    
    const venues = await Venue.find(query)
      .sort({ status: 1, type: 1, capacity: 1 })
      .populate({
        path: 'currentBooking.eventId',
        select: 'name startDate endDate'
      })
      .populate({
        path: 'currentBooking.bookedBy',
        select: 'name email'
      });
    
    // Group venues by status
    const groupedVenues = venues.reduce((acc, venue) => {
      const status = venue.status;
      if (!acc[status]) acc[status] = [];
      acc[status].push(venue);
      return acc;
    }, {});
    
    res.json({
      success: true,
      venues: groupedVenues
    });
  } catch (error) {
    console.error('Error fetching venues:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch venues',
      details: error.message
    });
  }
};

// Get venues by status
export const getVenuesByStatus = async (req, res) => {
  try {
    const { status } = req.params;
    
    const venues = await Venue.find({ status, isActive: true })
      .sort({ type: 1, capacity: 1 })
      .populate({
        path: 'currentBooking.eventId',
        select: 'name startDate endDate'
      });
    
    res.json({
      success: true,
      venues: venues
    });
  } catch (error) {
    console.error('Error fetching venues by status:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch venues',
      details: error.message
    });
  }
};

// Get venue by ID
export const getVenueById = async (req, res) => {
  try {
    const venue = await Venue.findById(req.params.id)
      .populate({
        path: 'currentBooking.eventId',
        select: 'name startDate endDate'
      })
      .populate({
        path: 'currentBooking.bookedBy',
        select: 'name email'
      });
    
    if (!venue) {
      return res.status(404).json({ 
        success: false,
        error: 'Venue not found'
      });
    }
    
    res.json({
      success: true,
      venue: venue
    });
  } catch (error) {
    console.error('Error fetching venue:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch venue',
      details: error.message
    });
  }
};

// Create new venue
export const createVenue = async (req, res) => {
  try {
    const venueData = req.body;
    
    // Create new venue
    const venue = new Venue(venueData);
    await venue.save();
    
    res.status(201).json({
      success: true,
      message: 'Venue created successfully',
      venue: venue
    });
  } catch (error) {
    console.error('Error creating venue:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to create venue',
      details: error.message
    });
  }
};

// Update venue
export const updateVenue = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    const venue = await Venue.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).populate({
      path: 'currentBooking.eventId',
      select: 'name startDate endDate'
    });
    
    if (!venue) {
      return res.status(404).json({ 
        success: false,
        error: 'Venue not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Venue updated successfully',
      venue: venue
    });
  } catch (error) {
    console.error('Error updating venue:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to update venue',
      details: error.message
    });
  }
};

// Delete venue (soft delete)
export const deleteVenue = async (req, res) => {
  try {
    const { id } = req.params;
    
    const venue = await Venue.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
    
    if (!venue) {
      return res.status(404).json({ 
        success: false,
        error: 'Venue not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Venue deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting venue:', error);
    res.status(500).json({ 
      success: false,
      error: 'Failed to delete venue',
      details: error.message
    });
  }
};