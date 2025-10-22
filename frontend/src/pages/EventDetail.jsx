import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../api/axios";
import { toast, Toaster } from "react-hot-toast";

const EventDetail = ({ currentUser }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await apiClient.get(`/events/${id}`);
        setEvent(response.data.data);
        setError("");
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Failed to fetch event!"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleRegister = async () => {
    try {
      setRegistering(true);
      setError("");
      setSuccess("");

      await apiClient.post(`/events/${id}/register`);
      setSuccess("Registration successful!");

      const response = await apiClient.get(`/events/${id}`);
      setEvent(response.data.data);
    } catch (err) {
      const message =
        err.response?.data?.message || err.message || "Could not register!";

      if (
        message === "You are already registered as a volunteer for this event."
      ) {
        toast.error("You are already registered in this event.", {
          position: "bottom-right",
        });
      } else {
        toast.error("You are already registered in this event", {
          position: "bottom-right",
        });
      }
    } finally {
      setRegistering(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      setDeleting(true);
      await apiClient.delete(`/events/delete/${id}`);
      toast.success("Event deleted!", { position: "bottom-right" });
      setTimeout(() => navigate("/events"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete event.", {
        position: "bottom-right",
      });
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="container mx-auto py-8">
        <button
          onClick={() => navigate("/events")}
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          ← Back to Events
        </button>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
          {error || "Event not found"}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 px-4 sm:px-10 py-10">
      <Toaster />
      <button
        onClick={() => navigate("/events")}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        ← Back to Events
      </button>

      <div className="bg-white rounded-xl shadow-lg max-w-2xl mx-auto overflow-hidden">
        {/* Event Image Gallery */}
        {event.images && event.images.length > 0 && (
          <div
            className={`grid gap-3 p-3 bg-slate-800/40 ${
              event.images.length === 1
                ? "grid-cols-1"
                : event.images.length === 2
                ? "grid-cols-2"
                : "grid-cols-2 sm:grid-cols-3"
            }`}
          >
            {event.images.map((img, idx) => (
              <div
                key={img}
                className="aspect-[4/3] rounded-lg overflow-hidden border border-slate-700 bg-slate-900 flex items-center justify-center"
              >
                <img
                  src={img}
                  alt={`Event Image ${idx + 1}`}
                  className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>
            ))}
          </div>
        )}

        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {event.title}
          </h2>
          <p className="text-gray-700 mb-4">{event.description}</p>
          <div className="space-y-2 text-sm text-gray-600">
            <div>
              <strong>Date:</strong>{" "}
              {event.date ? new Date(event.date).toLocaleDateString() : "N/A"}
            </div>
            <div>
              <strong>Location:</strong> {event.location}
            </div>
            <div>
              <strong>Owner:</strong> {event.owner.fullName || "Unknown"}
            </div>
            <div>
              <strong>No. of Volunteers:</strong> {event.volunteers.length}
            </div>
            <div>
              <strong>Status:</strong> {event.status}
            </div>
          </div>

          {success && (
            <div className="mt-5 px-3 py-2 bg-green-100 border border-green-400 text-green-700 rounded">
              {success}
            </div>
          )}

          <div className="flex gap-3 mt-6">
            <button
              onClick={handleRegister}
              disabled={registering}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded font-semibold transition"
            >
              {registering ? "Registering..." : "Register as Volunteer"}
            </button>

            {/* Show update and delete buttons only if currentUser owns the event */}
            {currentUser &&
              event.owner &&
              currentUser._id === event.owner._id && (
                <>
                  <button
                    onClick={() => navigate(`/events/update/${id}`)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition"
                  >
                    Update Event
                  </button>

                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold transition"
                  >
                    {deleting ? "Deleting..." : "Delete Event"}
                  </button>
                </>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetail;
