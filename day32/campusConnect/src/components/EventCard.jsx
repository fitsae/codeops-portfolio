import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <article className="event-card">
      <div className="event-date">{event.date}</div>

      <div className="card-content">
        <span className="category">{event.category}</span>

        <h2>{event.name}</h2>

        <p>{event.description}</p>

        <p>
          <strong>Location:</strong> {event.location}
        </p>

        <p>
          <strong>Time:</strong> {event.time}
        </p>

        <Link to={`/events/${event.id}`}>View Event</Link>
      </div>
    </article>
  );
}

export default EventCard;
