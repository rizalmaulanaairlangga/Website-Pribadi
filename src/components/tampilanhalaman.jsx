// src/components/tampilanhalaman.jsx
import { HashLink } from 'react-router-hash-link';
import React, { useContext, useEffect, useRef } from "react";
import { AnimationContext } from "../App";

// Importing other components used in the page
import Home from './home.jsx';
import Skill from './skill.jsx';
import AboutMe from './aboutMe.jsx';
import Queries from './queries.jsx';
import Contact from './contact.jsx';
import StackSection from './stackSection';

// Main Component: TampilanHalaman
const TampilanHalaman = ({ scrollToSection, homeRef, aboutMeRef, cardStackRef, skillRef, queriesRef, contactRef }) => {
  // Using context to manage animation visibility of sections
  const { visibleSections, observeSections } = useContext(AnimationContext);

  // Refs for specific elements that will be observed for visibility
  const motivationRef = useRef(null);
  const buttonMoreAllRefs = useRef(null);
  const v2BannerRef = useRef(null);

  // useEffect to observe visibility of sections and trigger animations
  useEffect(() => {
    observeSections([motivationRef], [0.1]); // Threshold set to 0.1 for motivation section
  }, [observeSections]);

  useEffect(() => {
    observeSections([buttonMoreAllRefs], [0.1]); // Threshold set to 0.1 for the "More All" button
  }, [observeSections]);

  useEffect(() => {
    observeSections([v2BannerRef], [0.15]);
  }, [observeSections]);

  return (
    <div className="w-full h-full">
      <div 
        className="w-full h-full text-white pt-20 z-30"
        style={{ backgroundImage: "url('/tekstur abu.jpeg')" }}
      >
        {/* Home Section */}
        <div className="xl:w-[96%] lg:w-[97%] md:w-[98%] w-full mx-auto bg-gradient-to-t from-black/0 via-black/100 to-black lg:pb-96 sm:pb-80 pb-28 pt-10 mt-12 rounded-t-3xl relative" ref={homeRef}>
          <Home 
            scrollToSection={scrollToSection}  // Passing props for navigation
            homeRef={homeRef} 
            skillRef={skillRef} 
            aboutMeRef={aboutMeRef}
            queriesRef={queriesRef}
          />
        </div>

        {/* New Website Announcement — di bawah Hero Section */}
        <div
          id="v2-announcement"
          ref={v2BannerRef}
          className={`xl:w-[78%] lg:w-[90%] w-[93%] mx-auto -mt-6 lg:-mt-20 mb-16 lg:mb-24 transition-all duration-700 ease-out ${
            visibleSections["v2-announcement"] ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
        >
          <div className="relative overflow-hidden rounded-[20px] md:rounded-[28px] border border-white/15 bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-transparent backdrop-blur-xl p-[1px]">
            <div className="rounded-[19px] md:rounded-[27px] bg-gradient-to-br from-zinc-900/80 via-zinc-900/70 to-black/80 backdrop-blur-xl">
              {/* subtle glow */}
              <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-white/10 blur-[50px]" />
              <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/[0.06] blur-[40px]" />

              <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 md:gap-8 px-5 py-6 sm:px-7 sm:py-7 md:px-8 md:py-8">
                {/* Left: text */}
                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium tracking-wide text-white/90 backdrop-blur">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                    </span>
                    Sedang dalam pengembangan
                    <span className="hidden sm:inline-flex items-center gap-1.5 ml-1 pl-2.5 border-l border-white/15">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="opacity-80">
                        <path d="M12 2l2.4 7.2H22l-6.2 4.5 2.4 7.2L12 16.4 5.8 20.9l2.4-7.2L2 9.2h7.6z" />
                      </svg>
                      V2 • Coming Soon
                    </span>
                  </div>

                  <h3 className="mt-4 text-[22px] sm:text-2xl md:text-[28px] font-bold leading-tight text-white tracking-tight">
                    Website Pribadi Baru
                    <span className="font-normal text-white/60"> — lebih cepat & modern</span>
                  </h3>
                  <p className="mt-2.5 text-[14px] sm:text-[15px] leading-relaxed text-white/70 max-w-[60ch]">
                    Terima kasih sudah mampir! Saya sedang membangun versi terbaru dari website ini dengan desain dan pengalaman yang lebih baik. Intip progresnya selagi masih dalam tahap pengembangan.
                  </p>
                  <p className="mt-2 hidden sm:block text-xs text-white/45">
                    Kamu akan diarahkan ke <span className="text-white/70 font-mono">personal-website-v2-eight-gamma.vercel.app</span>
                  </p>
                </div>

                {/* Right: CTA */}
                <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-3 lg:min-w-[220px] shrink-0">
                  <a
                    href="https://personal-website-v2-eight-gamma.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-white px-6 py-3.5 md:px-7 text-[15px] font-semibold text-black shadow-[0_8px_24px_rgba(255,255,255,0.15)] hover:bg-zinc-100 hover:shadow-[0_12px_32px_rgba(255,255,255,0.22)] active:scale-[0.98] transition-all duration-300"
                  >
                    Kunjungi Website Baru
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-black text-white group-hover:translate-x-0.5 transition-transform duration-300">
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </a>
                  <span className="text-center sm:text-left lg:text-center xl:text-left text-xs text-white/40 px-1">
                    Buka di tab baru ↗
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Motivation Section */}
        <div 
          id="motivation"
          ref={motivationRef}
          className={`xl:w-[78%] lg:w-[90%] w-[93%] mx-auto lg:mb-24 mb-16 md:mt-1 transition-transform duration-300 ${
            visibleSections["motivation"] ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          <h2 className="text-2xl font-bold text-center">
            "Tak akan ada mimpi yang bisa dicapai, bila tidak diperjuangkan", tanpa aksi yang nyata mimpi kita hanyalah halusinasi, dan ingatlah bahwa dalam setiap usaha kita selalu berhadapan dengan masalah, sehingga "apapun yang terjadi, tetaplah bernapas dengan tenang", tetap kendalikan emosi kita, kendalikan hati kita, pikiran yang tenang adalah jalan terbaik di setiap masalah. Laut hanya menjadi ganas, ketika ada badai bergejolak di atasnya."
          </h2>
        </div>

        {/* Main Section Wrapper */}
        <div className="xl:w-[96%] lg:w-[97%] md:w-[98%] w-full md:mx-auto md:bg-gradient-to-b md:from-black/0 md:via-black/30 md:to-black md:rounded-3xl py-16 md:mb-20 scroll-smooth">
    
          {/* About Me Section */}
          <div className="xl:w-[89%] lg:w-[96%] w-full mx-auto py-16" ref={aboutMeRef}>
            <AboutMe />
          </div>

          {/* Stack Section */}
          <div className="xl:w-[90%] lg:w-[96%] w-full min-h-screen mx-auto py-16 my-9 flex items-center justify-center" ref={cardStackRef}>
            <StackSection />
          </div>

          {/* Skill Section */}
          <div className="xl:w-[89%] lg:w-[96%] w-full mx-auto md:py-16 pt-16 pb-8" ref={skillRef}>
            <Skill />
          </div>

          {/* Button to navigate to more content */}
          <div className="flex justify-center my-2">
            <HashLink 
              to="/all-about-me#allAboutMe"
              id="buttonMoreAll"
              ref={buttonMoreAllRefs}
              className={`
                px-6 py-2 border-2 border-white text-black rounded-3xl text-lg font-medium bg-white
                hover:bg-black hover:text-white active:shadow-[0_10px_15px_rgba(255,255,255,0.6)]
                transition-all duration-300
                ${visibleSections["buttonMoreAll"]
                  ? "translate-y-0 opacity-100"
                  : "translate-y-10 opacity-0"
                }
              `}
            >
              Selengkapnya
            </HashLink>
          </div>
        </div>
        <div className="w-full h-1"></div>

        {/* Email Me Section */}
        <div className="xl:w-[96%] lg:w-[97%] md:w-[98%] w-full md:mx-auto md:bg-gradient-to-t md:from-black/0 md:via-black/90 md:to-black md:pb-64 pt-5 md:mt-20 mt-10 md:mb-20 mb-8 rounded-t-3xl" ref={queriesRef}>
          <Queries />
        </div>

        {/* Contact Section */}
        <div className="w-full">
          <Contact contactRef={contactRef} />
        </div>

      </div>
    </div>
  );
};

export default TampilanHalaman;
