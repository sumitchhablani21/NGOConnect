import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../api/axios";
import { toast, Toaster } from "react-hot-toast";

const allowedStatuses = ["Upcoming", "Ongoing", "Completed", "Cancelled"];

const UpdateEvent = ({ currentUser }) => {
  const { eventId } = useParams(); // Must match route parameter
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("upcoming");
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await apiClient.get(`/events/${eventId}`);
        const event = response.data.data;

        // Authorization check
        if (!currentUser || currentUser._id !== event.owner._id) {
          toast.error("You are not authorized to update this event.");
          navigate(`/events/${eventId}`);
          return;
        }

        // Pre-fill form
        setTitle(event.title);
        setDescription(event.description);
        setDate(event.date ? event.date.split("T")[0] : "");
        setLocation(event.location);
        setStatus(event.status || "upcoming");
        setExistingImages(event.images || []);
        setError("");
      } catch (err) {
        setError(
          err.response?.data?.message || err.message || "Failed to fetch event."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId, currentUser, navigate]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      setError("You can upload a maximum of 5 images.");
      return;
    }
    setImages(files);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim() || !date || !location.trim()) {
      setError("All fields are required!");
      return;
    }

    setUpdating(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("date", date);
      formData.append("location", location);
      formData.append("status", status);

      // Add new images if any
      images.forEach((file) => formData.append("images", file));

      await apiClient.patch(`/events/update/${eventId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Event updated successfully!");
      setTimeout(() => navigate(`/events/${eventId}`), 1000);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Could not update event."
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error && !title) {
    return (
      <div className="container mx-auto py-8">
        <button
          onClick={() => navigate("/events")}
          className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          ← Back to Events
        </button>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-10">
      <Toaster />
      <div className="w-full max-w-2xl bg-slate-800/50 border border-slate-700 rounded-xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Update Event
        </h1>

        {error && (
          <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500 text-red-400 rounded-lg">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          className="space-y-5"
        >
          <div>
            <label className="block text-gray-300 font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              required
              placeholder="Enter event title"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
              required
              placeholder="Write a detailed event description..."
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-300 font-medium mb-1">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                required
              />
            </div>
            <div>
              <label className="block text-gray-300 font-medium mb-1">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
                required
                placeholder="Enter location"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition"
            >
              {allowedStatuses.map((opt) => (
                <option
                  key={opt}
                  value={opt}
                  className="bg-slate-800 text-gray-100"
                >
                  {opt.charAt(0).toUpperCase() + opt.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {existingImages.length > 0 && (
            <div>
              <label className="block text-gray-300 font-medium mb-2">
                Current Images
              </label>
              <div className="grid grid-cols-3 gap-3">
                {existingImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`Event ${idx + 1}`}
                    className="w-full h-24 object-cover rounded-lg border border-slate-700"
                  />
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block text-gray-300 font-medium mb-1">
              Upload New Images (max 5, will replace existing images)
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="block w-full text-gray-200 bg-slate-800 border border-slate-700 rounded-lg p-2 cursor-pointer focus:ring-2 focus:ring-blue-600 transition"
            />
            {images.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {images.map((img, idx) => (
                  <span
                    key={idx}
                    className="text-xs bg-slate-700 text-gray-200 rounded-md px-2 py-1"
                  >
                    {img.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={() => navigate(`/events/${eventId}`)}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-gray-100 font-semibold py-3 px-4 rounded-lg transition duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={updating}
              className={`flex-1 py-3 rounded-lg font-semibold text-white transition duration-300 ${
                updating
                  ? "bg-blue-800 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl"
              }`}
            >
              {updating ? "Updating..." : "Update Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateEvent;
