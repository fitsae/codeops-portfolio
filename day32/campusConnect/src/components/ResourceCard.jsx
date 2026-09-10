import { Link } from "react-router-dom";

function ResourceCard({ resource }) {
  return (
    <article className="resource-card">
      <span className="category">{resource.category}</span>

      <h2>{resource.name}</h2>

      <p>{resource.description}</p>

      <Link to={`/resources/${resource.id}`}>Access Resource</Link>
    </article>
  );
}

export default ResourceCard;
