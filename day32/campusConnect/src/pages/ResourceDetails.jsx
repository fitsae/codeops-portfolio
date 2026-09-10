import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function ResourceDetails() {
  const { id } = useParams();

  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchResource = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/data/resources.json", {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load resources.");
        }

        const resources = await response.json();

        const selectedResource = resources.find(
          (resource) => String(resource.id) === String(id),
        );

        if (!selectedResource) {
          throw new Error("Resource not found.");
        }

        setResource(selectedResource);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchResource();

    return () => {
      controller.abort();
    };
  }, [id]);

  if (loading) {
    return <p>Loading resource...</p>;
  }

  if (error) {
    return (
      <section>
        <h1>Error</h1>
        <p>{error}</p>

        <Link to="/resources">Back to Resources</Link>
      </section>
    );
  }

  if (!resource) {
    return <p>Resource not found.</p>;
  }

  return (
    <section className="details-page">
      <span className="category">{resource.category}</span>

      <h1>{resource.name}</h1>

      <p className="details-description">{resource.description}</p>

      <div className="details-info">
        <h2>About This Resource</h2>

        <p>
          This resource is available to help students access important campus
          services and support.
        </p>

        <p>
          <strong>Category:</strong> {resource.category}
        </p>
      </div>

      <div className="details-actions">
        <Link to="/resources">Back to Resources</Link>
      </div>
    </section>
  );
}

export default ResourceDetails;
