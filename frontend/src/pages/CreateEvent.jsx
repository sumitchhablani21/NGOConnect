import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/axios";

const allowedStatuses = ["Upcoming", "Ongoing", "Completed", "Cancelled"];

const CreateEvent = ({ currentUser }) => {
  const navigate = useNavigate();

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <span className="px-6 py-3 bg-red-100 text-red-800 rounded-lg shadow-md font-medium">
          Access denied: admin only
        </span>
      </div>
    );
  }

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

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
    if (images.length > 5) {
      setError("Maximum of 5 images allowed.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("date", date);
      formData.append("location", location);
      images.forEach((file) => formData.append("images", file));

      const response = await apiClient.post("/events/create", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccess("Event created successfully!");
      setTimeout(() => navigate("/events"), 1200);
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Could not create event."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-slate-800/50 border border-slate-700 rounded-xl shadow-2xl p-8">
        <h1 className="text-3xl font-bold text-white mb-8 text-center">
          Create New Event
        </h1>

        {error && (
          <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500 text-red-400 rounded-lg">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-4 px-4 py-3 bg-green-500/10 border border-green-500 text-green-400 rounded-lg">
            {success}
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
                placeholder="Enter location"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-300 font-medium mb-1">
              Images (max 5)
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

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-4 rounded-lg font-semibold text-white transition duration-300 ${
              loading
                ? "bg-blue-800 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl"
            }`}
          >
            {loading ? "Creating Event..." : "Create Event"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
