import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import CreateEvent from "./pages/CreateEvent";
import { useAuth } from "./context/AuthContext";
import OwnerEvents from "./pages/OwnerEvents";
import UpdateEvent from "./pages/UpdateEvent";

function App() {
  const { currentUser } = useAuth();

  useEffect(() => {
    const preloader = document.querySelector(".preloader");
    if (preloader) {
      preloader.classList.add("hidden");
    }

    const wakeUpServer = async () => {
      try {
        await apiClient.get("/health");
      } catch (e) {
        // This request is only to wake the server, errors can be ignored.
      }
    };
    wakeUpServer();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/events" element={<Events />} />
            <Route
              path="/events/:id"
              element={<EventDetail currentUser={currentUser} />}
            />
            <Route
              path="/events/create"
              element={<CreateEvent currentUser={currentUser} />}
            />
            <Route path="/events/owner/:ownerId" element={<OwnerEvents />} />
            <Route
              path="/events/update/:eventId"
              element={<UpdateEvent currentUser={currentUser} />}
            />
          </Route>
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
