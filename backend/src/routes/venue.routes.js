import express from 'express';
import { 
  getAllVenues,
  getVenueById,
  createVenue,
  updateVenue,
  deleteVenue,
  getVenuesByStatus
} from '../controllers/venue.controller.js';

const router = express.Router();

// GET all venues with optional status filter
router.get('/', getAllVenues);

// GET venues by status
router.get('/status/:status', getVenuesByStatus);

// GET venue by ID
router.get('/:id', getVenueById);

// POST create new venue
router.post('/', createVenue);

// PUT update venue
router.put('/:id', updateVenue);

// DELETE venue
router.delete('/:id', deleteVenue);

export default router;