export default function ConfigDemoPage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "Site URL not configured";

  return (
    <main className="wrap">
      <h1>Application Configuration</h1>
      <p>Configured public site URL: {siteUrl}</p>
      <p className="muted">
        A public URL is not a secret. Database credentials and session secrets
        are.
      </p>
    </main>
  );
}
