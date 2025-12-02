import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import "./Projects.css";
import { client, urlFor } from "../sanityClient";
import { PortableText } from "@portabletext/react";
import { FaProjectDiagram, FaGithub } from "react-icons/fa";
 
export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImages, setSelectedImages] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [filter, setFilter] = useState("all");

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.category === filter);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "project"] | order(orderRank){
          title,
          description,
          category,
          github,
          liveDemo,
          technologies,
          images[] {
            asset->{_id,url}
          }
        }`
      )
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const openLightbox = (images) => {
    setSelectedImages(images);
    setCarouselIndex(0);
  };

  const closeLightbox = () => setSelectedImages(null);

  const nextImage = (e) => {
    e.stopPropagation();
    setCarouselIndex((prev) => (prev + 1) % selectedImages.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCarouselIndex(
      (prev) => (prev - 1 + selectedImages.length) % selectedImages.length
    );
  };

  const breakpointColumnsObj = { default: 3, 1100: 2, 700: 1 };

  return (
    <>
      <div className="projects-page">
        <div className="projects-header">
          <div className="projects-title-container">
            <h1 className="heading-icon">
              <FaProjectDiagram className="card-icon" />
              My Projects
            </h1>
            <p className="projects-subtitle">
              Showcasing my work from personal to academically assigned
              projects. Let me know your thoughts and if you'd like to
              collaborate.
            </p>
          </div>

          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="websites">Websites</option>
            <option value="games">Games</option>
            <option value="apps">Apps</option>
            <option value="other">Other</option>
          </select>
        </div>

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="project-skeleton"></div>
              ))
            : filteredProjects.map((project, i) => (
                <div
                  key={i}
                  className="project-card"
                  onClick={() =>
                    project.images?.length
                      ? openLightbox(
                          project.images.map((img) => img.asset.url)
                        )
                      : null
                  }
                >
                  {project.images?.[0] && (
                    <img
                      src={project.images[0].asset.url}
                      alt={project.title}
                    />
                  )}

                  <h2>{project.title}</h2>

                  <div className="tech-tags">
                    {project.technologies?.map((tech, idx) => (
                      <span key={idx} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="description">
                    {project.description && (
                      <PortableText value={project.description} />
                    )}
                  </div>

                  <div className="project-links">
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noreferrer" className="link-icon">
                        <FaGithub className="icon" />
                          GitHub
                      </a>
                    )}

                    {project.liveDemo && (
                      <a href={project.liveDemo} target="_blank" rel="noreferrer">
                        Live Demo ↗
                      </a>
                    )}
                  </div>
                </div>
              ))}
        </Masonry>
      </div>

      {selectedImages && (
        <div className="lightbox" onClick={closeLightbox}>
          <button className="prev" onClick={prevImage}>
            ‹
          </button>
          <img
            src={selectedImages[carouselIndex]}
            alt="Project Preview"
          />
          <button className="next" onClick={nextImage}>
            ›
          </button>
          <button className="close" onClick={closeLightbox}>
            ✕
          </button>
        </div>
      )}
    </>
  );
}
