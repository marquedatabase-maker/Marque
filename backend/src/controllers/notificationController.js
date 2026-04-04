import Notification from '../models/Notification.js';

// =============================
// LIST PAGE (Admin)
// =============================
export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .sort({ isPinned: -1, createdAt: -1 });

    res.status(200).json({ success: true, data: notifications });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// =============================
// HOME PAGE TOASTER
// =============================
export const getLatestPublishedNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      status: "Published"
    })
      .sort({ isPinned: -1, displayDate: -1 })
      .limit(5);

    res.status(200).json({ success: true, data: notifications });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// =============================
// CREATE
// =============================
export const createNotification = async (req, res) => {
  try {
    const notification = await Notification.create(req.body);
    res.status(201).json({ success: true, data: notification });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

// =============================
// DELETE
// =============================
export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    if (!notification) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};