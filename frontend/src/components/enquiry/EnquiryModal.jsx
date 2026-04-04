import EnquiryForm from "./EnquiryForm";
import { X } from "lucide-react";

export default function EnquiryModal({ onClose, defaultCourse }) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg relative">

        {/* <button
          onClick={onClose}
          className="absolute -top-4 -right-4 bg-white rounded-full p-2 shadow hover:bg-red-100"
        >
          <X className="w-4 h-4" />
        </button> */}

        <EnquiryForm
          defaultCourse={defaultCourse}
          onClose={onClose}
        />
      </div>
    </div>
  );
}
