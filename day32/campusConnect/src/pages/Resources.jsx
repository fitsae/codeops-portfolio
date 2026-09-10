import { useEffect, useState } from "react";
import ResourceCard from "../components/ResourceCard";

function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/data/resources.json");

        if (!response.ok) {
          throw new Error("Failed to load resources.");
        }

        const data = await response.json();

        setResources(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  if (loading) {
    return <p>Loading resources...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <section>
      <h1>Student Resources</h1>

      <p>Useful resources to help students succeed.</p>

      <div className="card-grid">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </section>
  );
}

export default Resources;
