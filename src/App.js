import React, { useRef, createContext, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import './index.css';
import Navbar from './components/navbar.jsx';
import TampilanHalaman from './components/tampilanhalaman.jsx';
// Importing additional pages/components
import MySkill from './components/moreSkill.jsx';
import AboutMe from './components/moreAbout.jsx';
import AllAboutMe from './components/moreAll.jsx';

// Context for animation logic, shared across components
export const AnimationContext = createContext();

function App() {
  // Refs for various sections of the page
  const homeRef = useRef(null);
  const aboutMeRef = useRef(null);
  const cardStackRef = useRef(null);
  const skillRef = useRef(null);
  const queriesRef = useRef(null);
  const contactRef = useRef(null);

  // Function to scroll to a specific section on the page
  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // State for tracking visible sections (for animations)
  const [visibleSections, setVisibleSections] = useState({});

  // Function to observe visibility of sections with a custom threshold
  const observeSections = (refs, thresholds = []) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => ({
              ...prev,
              [entry.target.id]: true,  // Mark section as visible
            }));
          }
        });
      },
      { threshold: thresholds }
    );

    // Start observing the provided refs
    refs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });
  };

  return (
    <AnimationContext.Provider value={{ visibleSections, observeSections }}>
      <Router>
        {/* Main Wrapper Div */}
        <div className="overflow-x-hidden w-screen h-full bg-gray-100">
          
          {/* Navbar: Contains navigation links to sections */}
          <Navbar
            scrollToSection={scrollToSection}
            homeRef={homeRef}
            aboutMeRef={aboutMeRef}
            cardStackRef={cardStackRef}
            skillRef={skillRef}
            queriesRef={queriesRef}
            contactRef={contactRef}
          />
          
          <div className="bg-transparent z-40">
            {/* Define Routes for each page/component */}
            <Routes>
              {/* Home Route: Default page */}
              <Route
                path="/"
                element={
                  <TampilanHalaman
                    scrollToSection={scrollToSection}
                    homeRef={homeRef}
                    aboutMeRef={aboutMeRef}
                    cardStackRef={cardStackRef}
                    skillRef={skillRef}
                    queriesRef={queriesRef}
                    contactRef={contactRef}
                  />
                }
              />
              {/* Additional Routes for "My Skill", "About Me", and "All About Me" */}
              <Route path="/my-skill" element={<MySkill />} />
              <Route path="/about-me" element={<AboutMe />} />
              <Route path="/all-about-me" element={<AllAboutMe />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AnimationContext.Provider>
  );
}

export default App;
