import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../api/axios";
import { FaUser } from "react-icons/fa";

const OwnerEvents = () => {
  const { ownerId } = useParams();
  const [events, setEvents] = useState([]);
  const [ownerName, setOwnerName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await apiClient.get(`/events/owner/${ownerId}`);
        const fetchedEvents = response.data?.data || [];
        setEvents(fetchedEvents);

        if (fetchedEvents.length > 0 && fetchedEvents[0].owner?.fullName) {
          setOwnerName(fetchedEvents[0].owner.fullName);
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to fetch events!"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [ownerId]);

  if (loading)
    return (
      <div className="text-center text-white text-lg py-10">Loading...</div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 text-lg py-10">{error}</div>
    );

  return (
    <div className="min-h-screen bg-slate-900 px-4 sm:px-10 py-10">
      <h1 className="text-3xl text-white font-semibold mb-8">
        Events by <span> {ownerName} </span>
      </h1>

      {events.length === 0 ? (
        <p className="text-center text-gray-300 text-lg font-medium">
          No events found for this owner.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {events.map((event) => (
            <div
              key={event._id}
              onClick={() => navigate(`/events/${event._id}`)}
              className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 transform hover:scale-[1.03] overflow-hidden border border-gray-100"
            >
              {/* Event Image */}
              <div className="w-full h-60 bg-gray-100 flex items-center justify-center">
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

              {/* Card Content */}
              <div className="px-3 py-2 space-y-2">
                <h2 className="text-xl font-bold text-gray-800 line-clamp-1">
                  {event.title}
                </h2>
                <p className="text-gray-600 text-sm line-clamp-2">
                  {event.description}
                </p>

                {/* Event Meta */}
                <div className="flex justify-between items-center text-sm text-gray-500 pt-4 space-x-2">
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                  <span className="text-right">{event.location}</span>
                </div>

                {/* Owner Info */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  {event.owner?.avatar ? (
                    <img
                      src={event.owner.avatar}
                      alt={`${event.owner.fullName}'s avatar`}
                      className="w-9 h-9 rounded-full object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center border border-gray-200">
                      <FaUser className="text-gray-500 text-lg" />
                    </div>
                  )}
                  <div
                    className="text-gray-700 font-medium text-sm cursor-pointer hover:underline"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/events/owner/${event.owner._id}`);
                    }}
                  >
                    {event.owner.fullName}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OwnerEvents;
