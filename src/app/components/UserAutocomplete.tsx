import React, { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ICreateUserProps } from "../types/CreateUserProps";
import { IUser } from "../types/user";

const UserAutocomplete: React.FC<ICreateUserProps> = ({ onCreate }) => {
  // const { data: session, status } = useSession();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<IUser[]>([]); // נתמך מכל מבנה המגיע מהשרת
  const [selectedUsers, setSelectedUsers] = useState<IUser[]>([]);

  const handleSearch = async (searchTerm: string) => {
    setQuery(searchTerm); // עדכון השאילתה לפי מה שהמשתמש מקליד
    if (searchTerm.trim() === "") {
      setResults([]); // אם אין חיפוש, איפוס התוצאות
      return;
    }

    try {
      // שליחת בקשת חיפוש על פי המילה שהמשתמש מקליד
      const response = await axios.get(`/api/users/search?query=${searchTerm}`);
      console.log("response", response.data);
      setResults(response.data); // עדכון התוצאות
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSelect = (user: IUser) => {
    if (!selectedUsers.find((u) => u.email === user.email)) {
      setSelectedUsers([...selectedUsers, user]);
    }
    setQuery("");
    setResults([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // if (!task.title || !task.assignedTo) {
    //   alert("Please fill in all required fields.");
    //   return;
    // }
    onCreate(selectedUsers);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded-lg shadow-md bg-white">
      <input
        type="text"
        value={query}
        onChange={(e) => handleSearch(e.target.value)} // עדכון חיפוש בזמן אמת
        placeholder="Search for a user by email..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <ul className="mt-2 max-h-40 overflow-y-auto border border-gray-300 rounded-lg bg-white shadow-md">
        {results.map((user) => (
          <li
            key={user.email}
            onClick={() => handleSelect(user)} // בחירת משתמש
            className="px-4 py-2 cursor-pointer hover:bg-blue-100"
          >
            {user.email} ({user.name})
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <h4 className="text-lg font-semibold mb-2">Selected Users:</h4>
        <ul className="list-disc pl-5 space-y-1">
          {selectedUsers.map((user) => (
            <li key={user.email} className="text-gray-700">
              {user.email} ({user.name})
            </li>
          ))}
        </ul>
      </div>
      {/* 
      {session && session.user && (
        <div className="mt-4">
          <h4 className="text-lg font-semibold">Current User:</h4>
          <p className="text-gray-700">{session.user.name}</p>
        </div>
      )} */}

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        onClick={handleSubmit}
      >
        SAVE USERS
      </button>
    </div>
  );
};

export default UserAutocomplete;
