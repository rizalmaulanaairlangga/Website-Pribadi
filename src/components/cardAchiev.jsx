// Import React dan hooks yang dibutuhkan
import React, { useContext, useEffect, useRef } from "react";
import { AnimationContext } from "../App";
import AcademicAchiev from './achievAcademicSec.jsx'; // Komponen untuk prestasi akademik
import AcademicNonAchiev from './achievNonAcademicSec.jsx'; // Komponen untuk prestasi non-akademik

// Komponen utama untuk menampilkan prestasi akademik atau non-akademik
function CardProject({ section }) {
    // Menggunakan context AnimationContext untuk mengatur animasi bagian yang terlihat
    const { visibleSections, observeSections } = useContext(AnimationContext);

    // Referensi untuk elemen yang akan diamati
    const achievRef = useRef(null);
    const nonAchievRef = useRef(null);
  
    // Mengatur pengamatan elemen pada saat komponen di-mount
    useEffect(() => {
      observeSections([achievRef, nonAchievRef], [0.2]); // Mengatur threshold pengamatan
    }, [observeSections]);
  
    return (
        <div className="min-h-screen flex flex-col items-center text-center">
          {/* Bagian untuk prestasi akademik */}
          {section === "academic" && (
            <div
              id="achiev" // ID untuk identifikasi bagian akademik
              ref={achievRef} // Referensi untuk animasi
              className={`transition-transform duration-300 ease-in-out ${
                visibleSections["achiev"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`} // Animasi munculnya bagian akademik
            >
              <h2 className="text-4xl font-bold pt-20">Prestasi Akademik</h2>
              <AcademicAchiev /> {/* Memanggil komponen untuk daftar prestasi akademik */}
            </div>
          )}

          {/* Bagian untuk prestasi non-akademik */}
          {section === "non academic" && (
            <div
              id="nonachiev" // ID untuk identifikasi bagian non-akademik
              ref={nonAchievRef} // Referensi untuk animasi
              className={`transition-transform duration-300 ease-in-out mt-12 ${
                visibleSections["nonachiev"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`} // Animasi munculnya bagian non-akademik
            >
              <h2 className="text-4xl font-bold pt-20">Prestasi Non-Akademik</h2>
              <AcademicNonAchiev /> {/* Memanggil komponen untuk daftar prestasi non-akademik */}
            </div>
          )}
        </div>
    );
}

export default CardProject;
