import { useState } from "react";
import { Link } from "react-router-dom";

export default function RequestsDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Dropdown Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md focus:outline-none"
      >
        Requests ▼
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute mt-2 w-40 bg-white shadow-md rounded-md">
          <Link
            to="/requests/sent"
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            📤 Sent Requests
          </Link>
          <Link
            to="/requests/received"
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            📥 Received Requests
          </Link>
        </div>
      )}
    </div>
  );
}
