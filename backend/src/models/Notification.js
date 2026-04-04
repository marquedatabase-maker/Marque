import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  targetUrl: { 
    type: String, 
    required: true 
  },
  shortSnippet: { 
    type: String, 
    maxLength: 150 
  },
  category: { 
    type: String, 
    enum: ["Exam Alerts", "College Alerts", "Admission Alerts"],
    default: "Exam Alerts" 
  },
  displayDate: { 
    type: Date, 
    default: Date.now 
  },
  status: { 
    type: String, 
    enum: ["Published", "Draft", "Archived"], 
    default: "Published" 
  },
  isPinned: { 
    type: Boolean, 
    default: false 
  }
}, { timestamps: true });

// ES6 Default Export
const Notification = mongoose.model('Notification', notificationSchema);
export default Notification;