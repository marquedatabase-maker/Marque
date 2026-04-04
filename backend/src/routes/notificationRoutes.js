import express from 'express';
const router = express.Router();

import { 
  getNotifications, 
  createNotification, 
  deleteNotification,
  getLatestPublishedNotifications
} from '../controllers/notificationController.js';


// Home toaster
router.get('/latest', getLatestPublishedNotifications);

// Admin list
router.get('/', getNotifications);

router.post('/', createNotification);

router.route('/:id')
  .delete(deleteNotification);

export default router;