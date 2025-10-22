import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Event } from "../models/event.model.js";
import { uploadOnCloudinary, cloudinary } from "../utils/cloudinary.js";
import fs from "fs";
import { User } from "../models/user.model.js";

const createEvent = asyncHandler(async (req, res) => {
  // get event details
  const { title, description, date, location } = req.body;

  // validate - not empty
  if (!title.trim() || !description.trim() || !date || !location.trim()) {
    throw new ApiError(400, "All fields are required!");
  }

  // check if user is "admin" or not
  if (req.user.role !== "admin") {
    throw new ApiError(403, "Not authorized to create an event!");
  }

  // get owner details
  const ownerId = req.user._id;

  // check for images (if uploaded)
  const imageLocalPaths = req.files?.images?.map((file) => file.path) || [];

  // upload images on cloudinary
  const uploadedImageUrls = [];
  const uploadedImagePublicIds = [];
  for (const path of imageLocalPaths) {
    const uploadedImage = await uploadOnCloudinary(path);

    // check if image is uploaded or not
    if (!uploadedImage) {
      imageLocalPaths.forEach((image) => fs.unlinkSync(image)); // clean up all files
      throw new ApiError(500, "Image upload failed. Please try again.");
    }

    uploadedImageUrls.push(uploadedImage.url);
    uploadedImagePublicIds.push(uploadedImage.public_id);
  }

  // create event object - entry in db
  const event = await Event.create({
    title,
    description,
    date: new Date(date),
    location,
    images: uploadedImageUrls,
    imagePublicIds: uploadedImagePublicIds,
    owner: ownerId,
  });

  // check for event creation
  if (!event) {
    imageLocalPaths.forEach((image) => fs.unlinkSync(image));
    throw new ApiError(500, "Something went wrong while creating the event.");
  }

  // return response
  return res
    .status(201)
    .json(new ApiResponse(201, event, "Event created successfully!"));
});

const deleteEvent = asyncHandler(async (req, res) => {
  // get eventId
  const { eventId } = req.params;

  // validate if eventId is provided
  if (!eventId) {
    throw new ApiError(400, "EventID is required.");
  }

  // check if event exists
  const event = await Event.findById(eventId);
  if (!event) {
    throw new ApiError(404, "Event not found!");
  }

  // verify ownership
  if (event.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to delete this event.");
  }

  // delete image from cloudinary (if exists)
  if (event.imagePublicIds.length > 0) {
    for (const publicId of event.imagePublicIds) {
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.error("Image deletion from cloudinary failed: ", error);
      }
    }
  }

  // delete DB entry
  const deletedEvent = await Event.findByIdAndDelete(eventId);

  // check if event is deleted
  if (!deletedEvent) {
    throw new ApiError(500, "Failed to delete the event!");
  }

  // return response
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Event deleted successfully!"));
});

const updateEvent = asyncHandler(async (req, res) => {
  const { eventId } = req.params;

  // Validate eventId
  if (!eventId) {
    throw new ApiError(400, "Event ID is required.");
  }

  // Find existing event
  const event = await Event.findById(eventId);
  if (!event) {
    throw new ApiError(404, "Event not found.");
  }

  // Only the owner can update the event
  if (event.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to update this event.");
  }

  // Extract fields from body
  const { title, description, date, location, status } = req.body;

  // Update only provided fields
  if (title) event.title = title;
  if (description) event.description = description;
  if (date) event.date = date;
  if (location) event.location = location;
  if (status) event.status = status;

  // Handle image updates (if new files uploaded)
  const files = req.files?.images || req.files || [];
  if (files.length > 0) {
    // Delete old images from cloudinary
    for (const publicId of event.imagePublicIds) {
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.log(error);
      }
    }

    // Upload new images on cloudinary
    const imageUrls = [];
    const imagePublicIds = [];

    for (const file of files) {
      const uploadResponse = await uploadOnCloudinary(file.path);
      imageUrls.push(uploadResponse.secure_url);
      imagePublicIds.push(uploadResponse.public_id);
    }

    event.images = imageUrls;
    event.imagePublicIds = imagePublicIds;
  }

  await event.save();

  return res
    .status(200)
    .json(new ApiResponse(200, event, "Event updated successfully!"));
});

const getAllEvents = asyncHandler(async (req, res) => {
  // get all the events
  const events = await Event.find({})
    .populate("owner", "fullName email avatar")
    .sort({ createdAt: -1 });

  // check if events are fetched
  if (events.length === 0) {
    throw new ApiError(404, "No events found!");
  }

  //return response
  return res
    .status(200)
    .json(new ApiResponse(200, events, "Events fetched successfully!"));
});

const getEventsByOwner = asyncHandler(async (req, res) => {
  // get owner details
  const { ownerId } = req.params;

  // validate if ownerId is provided
  if (!ownerId) {
    throw new ApiError(400, "OwnerID is required.");
  }

  // check if owner exists in DB
  const ownerExists = await User.findById(ownerId).select("_id");
  if (!ownerExists) {
    throw new ApiError(404, "Owner not found!");
  }

  // get events by owner
  const ownerEvents = await Event.find({ owner: ownerId })
    .populate("owner", "fullName email avatar")
    .sort({ createdAt: -1 });

  // check if events are fetched
  if (ownerEvents.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "No events found for this owner."));
  }

  // return response
  return res
    .status(200)
    .json(new ApiResponse(200, ownerEvents, "Events fetched successfully!"));
});

const getEventById = asyncHandler(async (req, res) => {
  const { eventId } = req.params;

  // Validate eventId
  if (!eventId) {
    throw new ApiError(400, "Invalid Event ID.");
  }

  // Fetch event and populate owner
  const event = await Event.findById(eventId).populate(
    "owner",
    "fullName email"
  );

  // Handle if event not found
  if (!event) {
    throw new ApiError(404, "Event not found.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, event, "Event fetched successfully!"));
});

const eventRegister = asyncHandler(async (req, res) => {
  // get eventId and userId from params
  const { eventId } = req.params;
  const userId = req.user._id;

  // validate event and user
  if (!eventId) {
    throw new ApiError(400, "Invalid Event ID.");
  }

  if (!userId) {
    throw new ApiError(400, "User must be logged in.");
  }

  // find event
  const event = await Event.findById(eventId);
  if (!event) {
    throw new ApiError(404, "Event not found.");
  }

  // Prevent duplicate registration
  if (event.volunteers.includes(userId)) {
    throw new ApiError(
      400,
      "You are already registered as a volunteer for this event."
    );
  }

  // Add user to volunteers list
  event.volunteers.push(userId);
  await event.save();

  return res
    .status(200)
    .json(
      new ApiResponse(200, event, "Successfully registered as a volunteer")
    );
});

export {
  createEvent,
  getAllEvents,
  getEventsByOwner,
  deleteEvent,
  updateEvent,
  getEventById,
  eventRegister,
};
