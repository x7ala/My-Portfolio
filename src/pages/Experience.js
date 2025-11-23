import React, { useEffect, useState } from "react";
import "./Experience.css";
import { client, urlFor } from "../sanityClient";
import { PortableText } from "@portabletext/react";
import { FaBriefcase } from "react-icons/fa";



export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch experience data from Sanity
  useEffect(() => {
    const query = `*[_type == "experience"] | order(startDate desc)`;
    client.fetch(query).then((data) => {
      setExperiences(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="experience-wrapper">
  <div className="experience-page fade-in">
    <h2 className="experience-title">
      <FaBriefcase className="heading-icon" />
  Experience
    </h2>

    <div className="timeline">
      {loading ? (
        // Show 3 skeleton items while loading
        <>
          <div className="timeline-skeleton"></div>
          <div className="timeline-skeleton"></div>
          <div className="timeline-skeleton"></div>
        </>
      ) : (
        experiences.map((exp, i) => (
          <div key={i} className="timeline-item">
            {/* Dot */}
            <div className="timeline-dot"></div>

            {/* Line (except last item) */}
            {i !== experiences.length - 1 && <div className="timeline-line"></div>}

            {/* Content */}
            <div className="timeline-content">
              {/* Company logo */}
              <div className="company-header">
                {exp.logo && (
                  <img
                    src={urlFor(exp.logo).url()}
                    alt={exp.company}
                    className="company-logo"
                  />
                )}
                <h3 className="company-name">{exp.company}</h3>
              </div>

              <h4>{exp.role}</h4>
              {exp.location && (
                <p className="location-text">{exp.location}</p>
              )}

              {exp.description && <PortableText value={exp.description} />}

              <span className="timeline-dates">
                {exp.startDate} – {exp.endDate}
              </span>
            </div>
          </div>
        ))
      )}
    </div>
  </div>
  </div>
);

}
