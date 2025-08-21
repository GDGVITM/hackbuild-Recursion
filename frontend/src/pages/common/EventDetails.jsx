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

  useEffect(() => {
    if (!user) {
      navigate("/auth/login");
      return;
    }

    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id, user, navigate]);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!event) return <p className="text-center mt-10">Event not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
      <img
        src={event.image || "https://via.placeholder.com/800x400.png?text=Event"}
        alt={event.title}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <p className="text-gray-700 mb-4">{event.description}</p>

      <div className="text-gray-600 space-y-1 mb-4">
        <p>📍 Location: {event.location || "TBA"}</p>
        <p>👥 Max Attendees: {event.maxAttendees || "Unlimited"}</p>
        <p>🗓 Start: {new Date(event.startTime).toLocaleString()}</p>
        <p>🗓 End: {new Date(event.endTime).toLocaleString()}</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {(event.categories || []).map((cat) => (
          <span
            key={cat}
            className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs"
          >
            {cat}
          </span>
        ))}
      </div>

      {event.tracks && event.tracks.length > 0 && (
        <div className="mb-4">
          <h2 className="font-semibold mb-2">Tracks</h2>
          <ul className="list-disc list-inside text-gray-700">
            {event.tracks.map((track, idx) => (
              <li key={idx}>
                {track.name} | {new Date(track.startTime).toLocaleTimeString()} -{" "}
                {new Date(track.endTime).toLocaleTimeString()} | {track.location || "TBA"}
              </li>
            ))}
          </ul>
        </div>
      )}

      {event.integrations && Object.keys(event.integrations).length > 0 && (
        <div>
          <h2 className="font-semibold mb-2">Integrations</h2>
          <pre className="bg-gray-100 p-2 rounded text-sm">{JSON.stringify(event.integrations, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default EventDetails;
