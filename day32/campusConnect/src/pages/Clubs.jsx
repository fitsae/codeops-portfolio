import { useEffect, useState } from "react";
import ClubCard from "../components/ClubCard";

function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchClubs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/data/clubs.json", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load clubs.");
        }

        const data = await response.json();

        setClubs(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchClubs();

    return () => {
      controller.abort();
    };
  }, []);

  const filteredClubs = clubs.filter((club) =>
    club.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) {
    return <p>Loading clubs...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section>
      <h1>Campus Clubs</h1>

      <p>Discover clubs and communities that match your interests.</p>

      <input
        type="text"
        placeholder="Search clubs..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <div className="card-grid">
        {filteredClubs.map((club) => (
          <ClubCard key={club.id} club={club} />
        ))}
      </div>

      {filteredClubs.length === 0 && <p>No clubs found.</p>}
    </section>
  );
}

export default Clubs;
