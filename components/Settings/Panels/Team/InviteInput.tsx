import React, { useState } from "react";

export const InviteInput = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="w-full max-w-sm">
      <div className="relative">
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email"
          className="w-full rounded-lg border border-gray-500 bg-primary-bg px-4 pr-20 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={() => alert(`Invited: ${email}`)}
          className="absolute right-1 top-1 bottom-1 rounded-md bg-blue-600 px-3 text-sm text-white hover:bg-blue-700"
        >
          Invite
        </button>
      </div>
    </div>
  );
};
