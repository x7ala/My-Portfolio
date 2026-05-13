import React, { useState, useEffect } from "react";
import Masonry from "react-masonry-css";
import "./Projects.css";
import { client, urlFor } from "../sanityClient";
import { PortableText } from "@portabletext/react";
import { FaProjectDiagram, FaGithub, FaPlayCircle } from "react-icons/fa";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedia, setSelectedMedia] = useState(null);
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
          },
          videoFile {
            asset->{url}
          }
        }`
      )
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const openLightbox = (media) => {
    setSelectedMedia(media);
    setCarouselIndex(0);
  };

  const closeLightbox = () => setSelectedMedia(null);

  const nextImage = (e) => {
    e.stopPropagation();
    setCarouselIndex((prev) => (prev + 1) % selectedMedia.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCarouselIndex(
      (prev) => (prev - 1 + selectedMedia.length) % selectedMedia.length
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
                onClick={() => {
                  const media = [];
                  if (project.videoFile) {
                    media.push({ type: "video", url: project.videoFile.asset.url });
                  }
                  if (project.images?.length) {
                    project.images.forEach(img => {
                      media.push({ type: "image", url: img.asset.url });
                    });
                  }
                  if (media.length > 0) {
                    openLightbox(media);
                  }
                }}
              >
                <div className="project-media-container">
                  {project.videoFile ? (
                    <>
                      <video
                        src={project.videoFile.asset.url}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="project-media"
                      />
                      <FaPlayCircle className="video-play-icon" />
                    </>
                  ) : project.images?.[0] ? (
                    <img
                      src={project.images[0].asset.url}
                      alt={project.title}
                      className="project-media"
                    />
                  ) : null}
                </div>

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

      {selectedMedia && (
        <div className="lightbox" onClick={closeLightbox}>
          {selectedMedia.length > 1 && (
            <button className="prev" onClick={prevImage}>
              ‹
            </button>
          )}
          
          {selectedMedia[carouselIndex].type === "video" ? (
            <video
              src={selectedMedia[carouselIndex].url}
              controls
              autoPlay
              className="lightbox-media"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <img
              src={selectedMedia[carouselIndex].url}
              alt="Project Preview"
              className="lightbox-media"
              onClick={(e) => e.stopPropagation()}
            />
          )}

          {selectedMedia.length > 1 && (
            <button className="next" onClick={nextImage}>
              ›
            </button>
          )}
          <button className="close" onClick={closeLightbox}>
            ✕
          </button>
        </div>
      )}
    </>
  );
}
