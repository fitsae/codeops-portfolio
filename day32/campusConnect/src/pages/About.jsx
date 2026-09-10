function About() {
  return (
    <div className="about-page">
      {/* Introduction */}
      <section className="about-hero">
        <span className="hero-label">ABOUT CAMPUSCONNECT</span>

        <h1>Connecting Students With Their Campus Community</h1>

        <p>
          CampusConnect is a student community portal designed to make it easier
          for students to discover campus clubs, events, and useful resources in
          one convenient place.
        </p>
      </section>

      {/* Mission */}
      <section className="about-section">
        <div className="about-content">
          <div>
            <span className="section-label">OUR MISSION</span>

            <h2>Making campus life more connected</h2>
          </div>

          <p>
            Campus life is more than attending classes. Students can develop new
            skills, build friendships, discover opportunities, and participate
            in activities outside the classroom.
          </p>

          <p>
            CampusConnect brings these opportunities together so students can
            easily find communities that match their interests and stay informed
            about what is happening around campus.
          </p>
        </div>
      </section>

      {/* What CampusConnect Provides */}
      <section className="about-section">
        <div className="section-heading">
          <div>
            <h2>What CampusConnect Provides</h2>

            <p>Everything students need to get more involved in campus life.</p>
          </div>
        </div>

        <div className="about-features">
          <article className="about-feature">
            <span className="feature-number">01</span>

            <h3>Discover Clubs</h3>

            <p>
              Explore student clubs by category, search for communities that
              match your interests, and view detailed club information.
            </p>
          </article>

          <article className="about-feature">
            <span className="feature-number">02</span>

            <h3>Find Events</h3>

            <p>
              Stay informed about upcoming campus events, including dates,
              times, locations, organizers, and event descriptions.
            </p>
          </article>

          <article className="about-feature">
            <span className="feature-number">03</span>

            <h3>Access Resources</h3>

            <p>
              Quickly find useful student resources such as library services,
              academic support, career services, and student services.
            </p>
          </article>

          <article className="about-feature">
            <span className="feature-number">04</span>

            <h3>Save Favorites</h3>

            <p>
              Save clubs that interest you and access them easily from your
              personal favorites section.
            </p>
          </article>
        </div>
      </section>

      {/* How It Helps */}
      <section className="about-section about-highlight">
        <div>
          <span className="section-label">WHY CAMPUSCONNECT</span>

          <h2>One place for a better student experience</h2>
        </div>

        <p>
          Instead of searching through different notices, social media posts,
          and campus information sources, students can use CampusConnect as a
          central place to discover opportunities and stay connected with their
          university community.
        </p>
      </section>

      {/* Community */}
      <section className="about-section">
        <div className="section-heading">
          <div>
            <h2>Built For The Campus Community</h2>

            <p>
              CampusConnect brings students and campus opportunities closer
              together.
            </p>
          </div>
        </div>

        <div className="about-community">
          <div>
            <h3>Students</h3>

            <p>
              Discover communities, activities, events, and resources that
              support academic and personal growth.
            </p>
          </div>

          <div>
            <h3>Clubs</h3>

            <p>
              Help students discover your club and learn about its activities,
              interests, and meeting information.
            </p>
          </div>

          <div>
            <h3>Campus Community</h3>

            <p>
              Create a more connected campus by making important activities and
              opportunities easier to discover.
            </p>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="about-cta">
        <h2>Discover. Connect. Participate.</h2>

        <p>Your campus community is waiting for you.</p>
      </section>
    </div>
  );
}

export default About;
