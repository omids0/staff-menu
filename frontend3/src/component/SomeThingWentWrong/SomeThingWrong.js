import React from "react";

function SomeThingWrong() {
  return (
    <div className="flex justify-center text-gray-700">
      <div className="flex flex-col">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-24 h-24 mx-auto mb-6 text-yellow-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
          />
        </svg>

        <p>خطایی رخ داده است!</p>
      </div>
    </div>
  );
}

export default SomeThingWrong;
