import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/axios";
import { FaUser } from "react-icons/fa";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch events from backend API
    const fetchEvents = async () => {
      try {
        const response = await apiClient.get("/events");
        const data = response.data;
        if (Array.isArray(data.data)) {
          setEvents(data.data);
        } else {
          console.log("API did not return any events. Received: ", data.data);
          setEvents([]);
        }
      } catch (err) {
        const errMessage =
          err.response?.data?.message ||
          err.message ||
          "Failed to fetch events!";
        setError(errMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 px-4 sm:px-10 py-10">
      {events.length === 0 ? (
        <p className="text-center text-gray-300 text-lg font-medium">
          No events available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {events.map((event) => (
            <div
              key={event._id}
              onClick={() => navigate(`/events/${event._id}`)}
              className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-[1.03] overflow-hidden border border-gray-100 flex flex-col h-full"
            >
              {/* Event Image - Fixed Height */}
              <div className="w-full h-60 bg-gray-100 flex items-center justify-center flex-shrink-0">
                {event.images && event.images.length > 0 ? (
                  <img
                    src={event.images[0]}
                    alt={event.title || "Event image"}
                    className="max-h-60 w-auto object-contain"
                  />
                ) : (
                  <div className="text-gray-500 text-sm">
                    No Image Available
                  </div>
                )}
              </div>

              {/* Card Content - Flex container with space-between */}
              <div className="px-3 py-2 flex flex-col justify-between flex-grow">
                {/* Top Content Section */}
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-gray-800 line-clamp-1">
                    {event.title}
                  </h2>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {event.description}
                  </p>

                  {/* Event Meta */}
                  <div className="flex justify-between items-center text-sm text-gray-500 pt-2">
                    <span>{new Date(event.date).toLocaleDateString()}</span>
                    <span className="text-right">
                      {event.location}
                    </span>
                  </div>
                </div>

                {/* Owner Info - Always at Bottom */}
                <div className="flex items-center gap-3 pt-4 mt-4 border-t border-gray-100">
                  {event.owner?.avatar ? (
                    <img
                      src={event.owner.avatar}
                      className="w-9 h-9 rounded-full object-cover border border-gray-200 flex-shrink-0"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center border border-gray-200 flex-shrink-0">
                      <FaUser className="text-gray-500 text-lg" />
                    </div>
                  )}
                  <span
                    className="text-gray-700 font-medium text-sm cursor-pointer hover:underline truncate"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/events/owner/${event.owner._id}`);
                    }}
                  >
                    {event.owner.fullName}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
