import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import ClubCard from "../components/ClubCard";
import EventCard from "../components/EventCard";
import ResourceCard from "../components/ResourceCard";

function Home() {
  const [clubs, setClubs] = useState([]);
  const [events, setEvents] = useState([]);
  const [resources, setResources] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchHomeData = async () => {
      try {
        setLoading(true);
        setError("");

        const [clubsResponse, eventsResponse, resourcesResponse] =
          await Promise.all([
            fetch("/data/clubs.json", {
              signal: controller.signal,
            }),
            fetch("/data/events.json", {
              signal: controller.signal,
            }),
            fetch("/data/resources.json", {
              signal: controller.signal,
            }),
          ]);

        if (!clubsResponse.ok || !eventsResponse.ok || !resourcesResponse.ok) {
          throw new Error("Failed to load CampusConnect data.");
        }

        const [clubsData, eventsData, resourcesData] = await Promise.all([
          clubsResponse.json(),
          eventsResponse.json(),
          resourcesResponse.json(),
        ]);

        setClubs(clubsData);
        setEvents(eventsData);
        setResources(resourcesData);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();

    return () => {
      controller.abort();
    };
  }, []);

  if (loading) {
    return <p>Loading CampusConnect...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div>
          <span className="hero-label">STUDENT COMMUNITY PORTAL</span>

          <h1>Connect, Discover, and Get Involved.</h1>

          <p>
            Discover campus clubs, upcoming events, and useful student resources
            all in one place.
          </p>

          <div className="hero-actions">
            <Link to="/clubs">Explore Clubs</Link>

            <Link to="/events">View Events</Link>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section>
        <div className="section-heading">
          <div>
            <h2>Featured Events</h2>
            <p>Don't miss what's happening on campus.</p>
          </div>

          <Link to="/events">View All Events</Link>
        </div>

        <div className="card-grid">
          {events.slice(0, 3).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* Popular Clubs */}
      <section>
        <div className="section-heading">
          <div>
            <h2>Popular Clubs</h2>
            <p>Find a community that matches your interests.</p>
          </div>

          <Link to="/clubs">View All Clubs</Link>
        </div>

        <div className="card-grid">
          {clubs
            .sort((a, b) => b.members - a.members)
            .slice(0, 3)
            .map((club) => (
              <ClubCard key={club.id} club={club} />
            ))}
        </div>
      </section>

      {/* Resources */}
      <section>
        <div className="section-heading">
          <div>
            <h2>Quick Resources</h2>
            <p>Helpful services for your student journey.</p>
          </div>

          <Link to="/resources">View All Resources</Link>
        </div>

        <div className="card-grid">
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
