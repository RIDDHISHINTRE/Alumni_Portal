import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axiosInstance from "../../../../utils/axiosInstance";
import { PlusCircle } from "lucide-react";

// Safely handle undefined or invalid URLs
const getDriveImageUrl = (url) => {
  if (!url || typeof url !== "string") return null;
  const match = url.match(/\/d\/(.*?)\//);
  return match ? `https://drive.google.com/uc?export=view&id=${match[1]}` : null;
};

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get("/events/all");
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="h-screen w-screen bg-gray-100 text-gray-900 flex flex-col overflow-auto">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-md p-4 flex justify-between items-center border-b border-gray-300">
        <h1 className="text-2xl font-semibold">All Events</h1>
        <Link to="/createevent" className="hover:text-blue-600 flex items-center gap-1">
          <PlusCircle className="w-5 h-5" /> Create Event
        </Link>
      </nav>

      {/* Events List */}
      <div className="w-full max-w-screen-xl mx-auto bg-white p-6 rounded-lg shadow-md border border-gray-300 mt-6">
        {events.length === 0 ? (
          <p className="text-gray-600 text-lg">No events available.</p>
        ) : (
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => {
              const imageUrl = getDriveImageUrl(event.eventImage);
              return (
                <li
                  key={event.id}
                  className="flex flex-col justify-between p-4 h-64 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:bg-gray-100 transition duration-300"
                  onClick={() => navigate(`/event/${event.id}`)}
                >
                  {event.EventImage && (
                    <img
                      src={event.EventImage}
                      alt={event.title}
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                  )}
                  <h3 className="text-xl font-semibold">{event.title}</h3>

                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AllEvents;

