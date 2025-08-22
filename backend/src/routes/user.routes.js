import express from 'express';
import { 
  getAllUsers, 
  getUserById, 
  updateUserRole, 
  deactivateUser, 
  getUserStats 
} from '../controllers/user.controller.js';

const router = express.Router();

// GET all users
router.get('/', getAllUsers);

// GET user statistics
router.get('/stats', getUserStats);

// GET user by ID
router.get('/:userId', getUserById);

// PUT update user role
router.put('/:userId/role', updateUserRole);

// DELETE deactivate user
router.delete('/:userId', deactivateUser);

export default router;
