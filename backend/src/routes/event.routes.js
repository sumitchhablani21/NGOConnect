import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { authorizeRoles } from "../middlewares/role.middleware.js";
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  getEventsByOwner,
  updateEvent,
  eventRegister,
} from "../controllers/event.controller.js";

const router = Router();

// public routes for users
router.route("/").get(verifyJWT, getAllEvents);
router.route("/:eventId").get(verifyJWT, getEventById);
router.route("/owner/:ownerId").get(verifyJWT, getEventsByOwner);
router.route("/:eventId/register").post(verifyJWT, eventRegister);

// secured routes
router.route("/create").post(
  verifyJWT,
  authorizeRoles("admin"),
  upload.fields([
    {
      name: "images",
      maxCount: 5,
    },
  ]),
  createEvent
);

router.route("/update/:eventId").patch(
  verifyJWT,
  authorizeRoles("admin"),
  upload.fields([
    {
      name: "images",
      maxCount: 5,
    },
  ]),
  updateEvent
);

router
  .route("/delete/:eventId")
  .delete(verifyJWT, authorizeRoles("admin"), deleteEvent);

export default router;
