// src/components/Home.jsx
import React, { useState, useContext, useEffect, useRef } from "react";
import { AnimationContext } from "../App";
import { Questions } from './queries.jsx';

// Komponen TypingEffect untuk menampilkan teks dengan efek mengetik
const TypingEffect = () => {
  // Array teks yang akan ditampilkan
  const texts = ["Selamat Datang di Website Pribadi Saya", "Saya Rizal", "Saya Seorang Mahasiswa IT"];
  
  // State untuk teks yang sedang ditampilkan
  const [displayedText, setDisplayedText] = useState(""); 
  
  // Indeks teks yang sedang ditampilkan
  const [currentIndex, setCurrentIndex] = useState(0); 
  
  // Referensi untuk indeks karakter saat ini
  const charIndex = useRef(0); 
  
  // Referensi untuk timeout mengetik
  const typingTimeoutRef = useRef(null); 
  
  // Referensi untuk timeout jeda antar teks
  const delayTimeoutRef = useRef(null); 

  // Hook useEffect untuk menjalankan efek mengetik
  useEffect(() => {
    const typeText = () => {
      const currentText = texts[currentIndex]; // Mendapatkan teks saat ini
      if (charIndex.current <= currentText.length) {
        // Menambahkan karakter berikutnya
        setDisplayedText(currentText.slice(0, charIndex.current));
        charIndex.current += 1;
        typingTimeoutRef.current = setTimeout(typeText, 100); // Lanjutkan mengetik setelah 100ms
      } else {
        // Jika teks selesai, tampilkan teks berikutnya setelah jeda
        delayTimeoutRef.current = setTimeout(() => {
          setDisplayedText(""); // Hapus teks yang ditampilkan
          charIndex.current = 0; // Reset indeks karakter
          setCurrentIndex((prev) => (prev + 1) % texts.length); // Pindah ke teks berikutnya
        }, 2000); // Jeda 2 detik
      }
    };

    typeText(); // Mulai mengetik

    return () => {
      // Bersihkan timeout jika komponen di-unmount
      clearTimeout(typingTimeoutRef.current);
      clearTimeout(delayTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]); // Efek dijalankan ulang setiap kali currentIndex berubah

  return (
    <div id="app" className="flex items-center">
      <div className="md:text-5xl sm:text-4xl text-2xl font-bold font-mono leading-none">
        <span>Haloo, {displayedText}</span>
        <span className="inline-block w-[1px] bg-black animate-blink">|</span>
      </div>
    </div>
  );
};

// Komponen Home untuk menampilkan halaman utama
const Home = ({ scrollToSection, skillRef, aboutMeRef, queriesRef }) => {
  const [hovered, setHovered] = useState(null); // State untuk menyimpan item yang sedang di-hover

  // Fungsi untuk menentukan lebar section berdasarkan hover
  const getFlexBasis = (section) => {
    if (hovered === 'left' && section === 'left') return '60%';
    if (hovered === 'right' && section === 'right') return '60%';
    if (hovered && section === 'center') return '30%';
    if (hovered === 'left' && section === 'right') return '10%';
    if (hovered === 'right' && section === 'left') return '10%';
    return section === 'center' ? '40%' : '30%';
  };

  //-------------------------------------------------------------------------------------------------------------------
  // Menggunakan context untuk animasi memunculkan bagian web
  const { visibleSections, observeSections } = useContext(AnimationContext);

  const homeScrollViewRef = useRef(null); // Referensi untuk elemen scroll view

  // Hook useEffect untuk mengamati perubahan visibility
  useEffect(() => {
    observeSections([homeScrollViewRef], [0.2]); // Mengubah threshold untuk memulai animasi
  }, [observeSections]);

  return (
    <div 
      id="homeScroll"
      ref={homeScrollViewRef}
      className={`grid h-screen w-[94%] mx-auto mt-10 transition-all duration-300 z-40 will-change-[transform,opacity] ${
        visibleSections["homeScroll"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      }`}
    >
      {/* Bagian DisplayText - Menampilkan efek ketik */}
      <div className="w-full font-bold lg:mb-8 lg:p-5">
        <TypingEffect />
      </div>

      {/* Bagian Kiri, Tengah, Kanan */}
      <div className="flex flex-col md:flex-row h-screen w-full mt-10 transition-all duration-500 will-change-[flex-basis,transform,opacity]">
        
        {/* Div Kiri - Tersembunyi di layar kecil */}
        <div
          className="hidden md:flex flex-col justify-center items-start p-4 transition-all duration-500 will-change-[flex-basis,transform,opacity]"
          style={{ flexBasis: getFlexBasis('left'), maxWidth: '60%' }}
          onMouseEnter={() => setHovered('left')}
          onMouseLeave={() => setHovered(null)}
        >
          {hovered === 'left' ? (
            <div>
              <p className="text-xl font-semibold mb-1">Tentang Saya:</p>
              <p className="text-lg mb-7">
                Saya adalah seorang Mahasiswa yang saat ini menempuh pendidikan D4 Teknik Informatika.
              </p>
              <button className="px-4 py-1 text-white font-semibold rounded-3xl border-2 border-white mb-12 hover:shadow-[0_4px_10px_rgba(255,255,255,0.6)] bg-white/0 active:bg-white/30 transition-all duration-300" onClick={() => scrollToSection(aboutMeRef)}>
                Lebih banyak
              </button>

              <p className="text-xl font-semibold mt-6 mb-1">Keahlian Saya:</p>
              <p className="text-lg mb-7">
                Saya menguasai Fullstack Web Development, serta mampu bekerja dalam tim.
              </p>
              <button className="px-4 py-1 text-white font-semibold rounded-3xl border-2 border-white hover:shadow-[0_4px_10px_rgba(255,255,255,0.6)] bg-white/0 active:bg-white/30 transition-all duration-300" onClick={() => scrollToSection(skillRef)}>
                Lebih banyak
              </button>
            </div>
          ) : hovered === 'right' ? (
            <div className='grid gap-14'>
              <p className="text-2xl font-semibold">Saya?</p>
              <p className="text-2xl font-semibold">Keahlian?</p>
            </div>
          ) : (
            <div className='grid gap-14'>
              <p className="text-2xl font-semibold">Tentang Saya?</p>
              <p className="text-2xl font-semibold">Apa keahlian Saya?</p>
            </div>
          )}
        </div>

        {/* Div Tengah - Tetap aktif di semua layar */}
        <div
          className={`flex justify-center items-center transition-all duration-500 ${
            hovered ? 'scale-90' : 'scale-100'
          }`}
          style={{ flexBasis: getFlexBasis('center'), maxWidth: '100%' }}
          onMouseEnter={() => setHovered(null)} // Reset saat kursor di div tengah
        >
          <img src="foto-diri.jpg" alt="Descriptive Alt Text" className="w-3/5 md:w-full h-auto rounded-full" />
        </div>

        {/* Div Kanan - Tersembunyi di layar kecil */}
        <div
          className="hidden md:flex relative flex-col justify-center items-center p-4 transition-all duration-500"
          style={{ flexBasis: getFlexBasis('right'), maxWidth: '60%' }}
          onMouseEnter={() => setHovered('right')}
          onMouseLeave={() => setHovered(null)}
        >
          {hovered === 'right' ? (
            <div className="w-full">
              <Questions />
              <button className="px-4 py-1 text-white font-semibold rounded-3xl border-2 border-white hover:shadow-[0_4px_10px_rgba(255,255,255,0.6)] bg-white/0 active:bg-white/30 transition-all duration-300 ml-12 mt-10" onClick={() => scrollToSection(queriesRef)}>
                Lebih banyak
              </button>
            </div>
          ) : hovered === 'left' ? (
            <p className="text-2xl font-semibold">Ada pertanyaan?</p>
          ) : (
            <p className="text-2xl font-semibold">Ingin menanyakan sesuatu?</p>
          )}
        </div>
      
      </div>     
    </div>
  );
};

export default Home;
