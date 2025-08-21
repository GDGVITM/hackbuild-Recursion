import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const EventDetails = () => {
  const { user } = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
      return;
    }

    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, user, navigate]);

  const handleRegister = async () => {
    if (!user) {
      navigate("/auth/login");
      return;
    }
    
    setRegistering(true);
    try {
      // Replace this with actual registration API call
      await axios.post(`http://localhost:5000/api/events/${id}/register`, {
        userId: user.id
      });
      alert("You are now registered for the event!");
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Registration failed. Please try again.");
    } finally {
      setRegistering(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
    </div>
  );
  
  if (!event) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Event Not Found</h1>
        <button 
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
        >
          Back to Events
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with back button */}
        <div className="mb-6">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center text-purple-600 hover:text-purple-800 transition"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Events
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Hero image */}
          <div className="relative h-64 md:h-80 overflow-hidden">
            <img
              src={event.image || "https://via.placeholder.com/1200x600.png?text=Event+Image"}
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <div className="p-6 text-white">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{event.title}</h1>
                <p className="text-lg opacity-90">{event.tagline || "Join us for an amazing experience"}</p>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Main content */}
              <div className="md:w-2/3">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">About the Event</h2>
                <p className="text-gray-700 leading-relaxed mb-6">{event.description}</p>

                {event.tracks && event.tracks.length > 0 && (
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">Event Schedule</h2>
                    <div className="space-y-4">
                      {event.tracks.map((track, idx) => (
                        <div key={idx} className="bg-gray-50 p-4 rounded-lg border-l-4 border-purple-500">
                          <div className="flex justify-between items-start">
                            <h3 className="font-medium text-gray-800">{track.name}</h3>
                            <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2.5 py-0.5 rounded">
                              {new Date(track.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {new Date(track.endTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mt-1">{track.location || "Location TBA"}</p>
                          {track.description && (
                            <p className="text-gray-700 mt-2 text-sm">{track.description}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="md:w-1/3">
                <div className="bg-gray-50 rounded-lg p-5 sticky top-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Event Details</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 text-purple-600 mt-0.5">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-600">Location</p>
                        <p className="text-gray-800">{event.location || "To be announced"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 text-purple-600 mt-0.5">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-600">Date & Time</p>
                        <p className="text-gray-800">
                          {new Date(event.startTime).toLocaleDateString()} • {new Date(event.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - {new Date(event.endTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0 text-purple-600 mt-0.5">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-600">Attendees</p>
                        <p className="text-gray-800">{event.registeredAttendees || 0} registered {event.maxAttendees ? `of ${event.maxAttendees} max` : ''}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <button
                      onClick={handleRegister}
                      disabled={registering || (event.maxAttendees && event.registeredAttendees >= event.maxAttendees)}
                      className={`w-full py-3 px-4 rounded-md font-medium text-white transition
                        ${(event.maxAttendees && event.registeredAttendees >= event.maxAttendees) 
                          ? "bg-gray-400 cursor-not-allowed" 
                          : "bg-purple-600 hover:bg-purple-700 focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                        }`}
                    >
                      {registering ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Processing...
                        </span>
                      ) : (event.maxAttendees && event.registeredAttendees >= event.maxAttendees) ? (
                        "Fully Booked"
                      ) : (
                        "Register Now"
                      )}
                    </button>
                  </div>
                  
                  <div className="mt-4 flex flex-wrap gap-2">
                    {(event.categories || []).map((cat) => (
                      <span
                        key={cat}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;