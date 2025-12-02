import './Home.css';
import profilePic from '../assets/images/profilePic.JPG';
import { ReactComponent as AzureIcon } from '../assets/images/azure.svg';
import { ReactComponent as UnityIcon } from '../assets/images/Unity.svg';
import { ReactComponent as UnrealIcon } from '../assets/images/unreal-engine.svg';
import { useEffect, useState } from "react";
import { FaReact, FaLaravel, FaHtml5, FaCss3Alt, FaDownload, FaProjectDiagram, FaBriefcase, FaEnvelope, FaLinkedin, FaGithub } from 'react-icons/fa';
import { SiJavascript, SiMysql, SiPython, SiTypescript } from 'react-icons/si';
import { Typewriter } from 'react-simple-typewriter';
import { PortableText } from "@portabletext/react";
import { client, urlFor } from "../sanityClient";

function Home() {
  const [homeData, setHomeData] = useState(null);
  const [showResume, setShowResume] = useState(false);

  useEffect(() => {
    client
      .fetch(
        `*[_type == "homepage"][0]{
          intro,
          profileImage,
          resumeFile{
            asset->{
              url
            }
          }
        }`
      )
      .then((data) => setHomeData(data))
      .catch(console.error);
  }, []);

  const downloadResume = async () => {
    if (!homeData?.resumeFile?.asset?.url) return;

    try {
      const response = await fetch(homeData.resumeFile.asset.url);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "Hala_Mohamed_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  return (
    <div className='home'>
      {/* LEFT SIDE */}
      <div className='left-container'>
        <div className="hero-title">
          <h1 className="typewriter-title">
            <Typewriter
              words={["Hala Mohamed | B.Sc Software Engineering"]}
              loop={1}
              typeSpeed={100}
              delaySpeed={2000}
            />
          </h1>
        </div>

        <div className="introduction">
          {homeData?.intro && <PortableText value={homeData.intro} />}
        </div>

        <div className="cards-container">
          <div className="nav-card" onClick={() => window.location.href = "/projects"}>
            <FaProjectDiagram className="card-icon" />
            <h3 className="card-title">Projects</h3>
          </div>

          <div className="nav-card" onClick={() => window.location.href = "/experience"}>
            <FaBriefcase className="card-icon" />
            <h3 className="card-title">Experience</h3>
          </div>

          <div className="nav-card" onClick={() => window.location.href = "/contact"}>
            <FaEnvelope className="card-icon" />
            <h3 className="card-title">Contact Me</h3>
          </div>
        </div>



                  {/* CORE STRENGTHS SECTION */}
    <div className="core-strengths">
      <h2 className="strengths-title">Core Strengths</h2>

      <div className="strengths-tags">
        <span className="strength-tag">Problem Solving</span>
        <span className="strength-tag">Fast Learning</span>
        <span className="strength-tag">Team Collaboration</span>
        <span className="strength-tag">Clear Communication</span>
        <span className="strength-tag">Adaptability</span>
        <span className="strength-tag">Attention to Detail</span>
        <span className="strength-tag">Creative Thinking</span>
        <span className="strength-tag">Time Management</span>
      </div>
    </div>



      </div>



      {/* RIGHT SIDE */}
      <div className="right-section">
        <div className="social-links-home">
          <a href="https://www.linkedin.com/in/7hala-mohamed/" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaLinkedin size={32} />
          </a>

          <a href="https://github.com/x7ala" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaGithub size={32} />
          </a>
        </div>

        <div className='image-wrapper'>
          <div className='profile-img'>
            <img
              src={homeData?.profileImage ? urlFor(homeData.profileImage).url() : profilePic}
              alt="Hala"
              className="profile-img"
            />
          </div>
        </div>

        <div className="tech-icons">
          <FaReact size={40} color="#61DBFB" title="React" />
          <FaLaravel size={40} color="#f55247" title="Laravel" />
          <SiJavascript size={40} color="#f0db4f" title="JavaScript" />
          <SiTypescript size={40} color="#007ACC" title="TypeScript" />
          <SiPython size={40} color="#306998" title="Python" />
          <SiMysql size={40} color="#00758F" title="MySQL" />
          <FaHtml5 size={40} color="#e34c26" title="HTML5" />
          <FaCss3Alt size={40} color="#264de4" title="CSS3" />
        </div>

        <div className="tech-icons">
          <AzureIcon width={40} height={40} title="Azure" />
          <UnityIcon width={40} height={40} title="Unity" />
          <UnrealIcon width={40} height={40} title="Unreal Engine" />
        </div>

        <button className="resume-btn" onClick={() => setShowResume(true)}>
          <FaDownload className="resume-icon" />
          Resume
        </button>

              <div className="languages-section">
        <h2 className="lang-title">Languages</h2>

        {/* ENGLISH */}
        <div className="lang-item">
          <div className="lang-left">
            <small className="lang-level">Native / Bilingual Proficiency</small>
            <div className="lang-bars">
              <div className="filled"></div>
              <div className="filled"></div>
              <div className="filled"></div>
              <div className="filled"></div>
              <div className="filled"></div>
            </div>
          </div>
          <span className="lang-name">English</span>
        </div>

        {/* ARABIC */}
        <div className="lang-item">
          <div className="lang-left">
            <small className="lang-level">Native / Bilingual Proficiency</small>
            <div className="lang-bars">
              <div className="filled"></div>
              <div className="filled"></div>
              <div className="filled"></div>
              <div className="filled"></div>
              <div className="filled"></div>
            </div>
          </div>
          <span className="lang-name">Arabic</span>
        </div>

        {/* FRENCH */}
        <div className="lang-item">
          <div className="lang-left">
            <small className="lang-level">Limited Working Proficiency</small>
            <div className="lang-bars">
              <div className="filled"></div>
              <div className="filled"></div>
              <div className="filled"></div>
              <div className="empty"></div>
              <div className="empty"></div>
            </div>
          </div>
          <span className="lang-name">French</span>
        </div>

        {/* SPANISH */}
        <div className="lang-item">
          <div className="lang-left">
            <small className="lang-level">Elementary Proficiency</small>
            <div className="lang-bars">
              <div className="filled"></div>
              <div className="filled"></div>
              <div className="empty"></div>
              <div className="empty"></div>
              <div className="empty"></div>
            </div>
          </div>
          <span className="lang-name">Spanish</span>
        </div>
      </div>


        {/* RESUME MODAL */}
        {showResume && (
          <div className="resume-modal">
            <div className="resume-content">
              <button className="close-btn" onClick={() => setShowResume(false)}>×</button>

              <iframe
                src={homeData?.resumeFile?.asset?.url}
                title="Resume Preview"
                className="resume-iframe"
              ></iframe>

              <button className="download-btn" onClick={downloadResume}>
                Download Resume
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
