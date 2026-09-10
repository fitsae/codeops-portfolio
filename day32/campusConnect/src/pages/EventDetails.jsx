import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function EventDetails() {
  const { id } = useParams();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchEvent = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/data/events.json", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load events.");
        }

        const events = await response.json();

        const selectedEvent = events.find(
          (event) => String(event.id) === String(id),
        );

        if (!selectedEvent) {
          throw new Error("Event not found.");
        }

        setEvent(selectedEvent);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();

    return () => {
      controller.abort();
    };
  }, [id]);

  if (loading) {
    return <p>Loading event details...</p>;
  }

  if (error) {
    return (
      <section>
        <h1>Error</h1>
        <p>{error}</p>

        <Link to="/events">Back to Events</Link>
      </section>
    );
  }

  if (!event) {
    return <p>Event not found.</p>;
  }

  return (
    <section className="details-page">
      <span className="category">{event.category}</span>

      <h1>{event.name}</h1>

      <p className="details-description">{event.description}</p>

      <div className="details-info">
        <h2>Event Information</h2>

        <p>
          <strong>Date:</strong> {event.date}
        </p>

        <p>
          <strong>Time:</strong> {event.time}
        </p>

        <p>
          <strong>Location:</strong> {event.location}
        </p>

        <p>
          <strong>Organizer:</strong> {event.organizer}
        </p>
      </div>

      <div className="details-actions">
        <Link to="/events">Back to Events</Link>
      </div>
    </section>
  );
}

export default EventDetails;
