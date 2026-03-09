import { Routes, Route } from "react-router-dom";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { Auth } from "./pages/Auth";
import { Photographers } from "./pages/Photographers";
import { Profile } from "./pages/Profile";
import { Booking } from "./pages/Booking";
import { Success } from "./pages/Success";
import { HowItWorks } from "./pages/HowItWorks";
import { PhotographerRegistration } from "./pages/PhotographerRegistration";
import { Onboarding } from "./pages/Onboarding";
import { MyBookings } from "./pages/MyBookings";
import { AdminDashboard } from "./pages/AdminDashboard";
import { PhotographerDashboard } from "./pages/PhotographerDashboard";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

import { AuthProvider } from "./context/AuthContext";
import { PhotographerProvider } from "./context/PhotographerContext";

import { useState } from "react";
import { CinematicIntro } from "./components/ui/CinematicIntro";
import { VisionaryCosmos } from "./components/ui/VisionaryCosmos";

import { JoinNetwork } from "./pages/JoinNetwork";

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <AuthProvider>
      <PhotographerProvider>
        {/* Global Intro - Plays on refresh */}
        {showIntro && <CinematicIntro onComplete={() => setShowIntro(false)} />}

        {/* Main App - Blocked until Intro finishes */}
        <div className={`transition-opacity duration-1000 ${showIntro ? 'opacity-0 pointer-events-none h-screen overflow-hidden' : 'opacity-100'}`}>
          <Routes>

            {/* Public Routes */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/join" element={<Layout><JoinNetwork /></Layout>} />
            <Route path="/login" element={<Auth />} />
            <Route path="/signup" element={<Auth />} />

            <Route path="/how-it-works" element={<Layout><HowItWorks /></Layout>} />
            <Route path="/photographers" element={<Layout><Photographers /></Layout>} />
            <Route path="/photographers/:id" element={<Layout><Profile /></Layout>} />

            {/* Client Routes */}
            <Route element={<Layout><ProtectedRoute allowedRoles={['client', 'admin']} /></Layout>}>
              <Route path="/my-bookings" element={<MyBookings />} />
              <Route path="/booking/:id" element={<Booking />} />
              <Route path="/success" element={<Success />} />
            </Route>

            {/* Photographer Routes */}
            <Route element={<Layout><ProtectedRoute allowedRoles={['photographer', 'admin']} /></Layout>}>
              <Route path="/photographer-registration" element={<PhotographerRegistration />} />
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/photographer-dashboard" element={<PhotographerDashboard />} />
            </Route>

            {/* Admin Routes */}
            <Route element={<Layout><ProtectedRoute allowedRoles={['admin']} /></Layout>}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>

            {/* Visionary Route (Generated Task) */}
            <Route path="/vision" element={<VisionaryCosmos />} />



          </Routes>
        </div>
      </PhotographerProvider>
    </AuthProvider>
  );
}

export default App;
