import React, { useState, useEffect, useContext } from 'react';
import { AnimationContext } from '../App';

const AchievNonAcademic = () => {
  const { visibleSections, observeSections } = useContext(AnimationContext);

  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refs, setRefs] = useState([]);

  // Fetch data dari backend
  useEffect(() => {
    async function fetchAchievements() {
      try {
        const res = await fetch('https://personal-website-backend-vercel.vercel.app/api/db_nonaca_achiev');
        const json = await res.json();

        // Pastikan data yang diterima valid
        if (!Array.isArray(json)) {
          console.error('Data yang diterima bukan array:', json);
          return;
        }

        // Sort berdasarkan tanggal (descending) dengan penanganan error
        const sorted = json
          .filter(ach => ach.properties && ach.properties.Date && ach.properties.Date.date)
          .sort((a, b) => {
            try {
              const dateA = new Date(a.properties.Date.date.start);
              const dateB = new Date(b.properties.Date.date.start);
              return dateB - dateA;
            } catch (e) {
              console.error('Error parsing date:', e);
              return 0;
            }
          });

        setAchievements(sorted);
      } catch (e) {
        console.error('Fetch error:', e);
      } finally {
        setLoading(false);
      }
    }
    fetchAchievements();
  }, []);

  // Setup dynamic refs
  useEffect(() => {
    setRefs(achievements.map(() => React.createRef()));
  }, [achievements]);

  // Observe after refs siap
  useEffect(() => {
    if (refs.length === achievements.length && refs.length > 0) {
      observeSections(refs, Array(refs.length).fill(0.2));
    }
  }, [refs, observeSections, achievements.length]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl">Loading prestasi non-akademik...</p>
      </div>
    );
  }

  if (achievements.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl">Tidak ada data prestasi non-akademik yang ditemukan</p>
      </div>
    );
  }

  // Pisahkan daftar terbaik dan semua
  const best = achievements.filter(ach => 
    ach.properties.Terbaik && ach.properties.Terbaik.checkbox
  );
  const rest = achievements;

  // Fungsi untuk mendapatkan URL gambar yang aman
  const getImageUrl = (ach) => {
    if (!ach.properties.Foto || !ach.properties.Foto.files || ach.properties.Foto.files.length === 0) {
      return 'https://via.placeholder.com/300x200?text=No+Image';
    }
    return ach.properties.Foto.files[0].file.url;
  };

  // Fungsi untuk mendapatkan judul
  const getTitle = (ach) => {
    if (!ach.properties.Name || !ach.properties.Name.title || ach.properties.Name.title.length === 0) {
      return 'Judul Tidak Tersedia';
    }
    return ach.properties.Name.title[0].plain_text;
  };

  // Fungsi untuk mendapatkan link (jika menggunakan File sebagai link)
  const getLink = (ach) => {
    if (!ach.properties.Files || !ach.properties.Files.files || ach.properties.Files.files.length === 0) {
      return '#';
    }
    return ach.properties.Files.files[0].file.url;
  };

  return (
    <section className="w-[98%] mx-auto p-6 text-center">
      {/* Daftar Prestasi Terbaik */}
      {best.length > 0 && (
        <div className="w-full">
          <h2 className="text-2xl font-bold mb-4">Prestasi Non-Akademik Terbaik</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-14 px-14 w-full">
            {best.map((ach) => {
              const idx = achievements.findIndex(x => x.id === ach.id);
              return (
                <a
                  key={ach.id}
                  href={getLink(ach)}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`nonAcad-${ach.id}`}
                  ref={refs[idx]}
                  className={`group shadow-md hover:shadow-black overflow-hidden block cursor-pointer transition-all duration-300 rounded-3xl
                    ${visibleSections[`nonAcad-${ach.id}`]
                      ? "translate-y-0 opacity-100 ease-in-out"
                      : "translate-y-10 opacity-0 ease-in"
                    }`}
                >
                  <div className="relative overflow-hidden rounded-3xl h-64">
                    <img
                      src={getImageUrl(ach)}
                      alt={getTitle(ach)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=Image+Error';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                    <div className="absolute bottom-0 left-0 w-full p-4 bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <p className="text-sm text-gray-600">Klik untuk melihat detail</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mt-5">
                    {getTitle(ach)}
                  </h3>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Daftar Semua Prestasi */}
      <div>
        <h2 className="text-2xl font-bold mt-8 mb-4">Semua Prestasi Non-Akademik</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {rest.map((ach, i) => (
            <a
              key={ach.id}
              href={getLink(ach)}
              target="_blank"
              rel="noopener noreferrer"
              id={`nonAcad-${ach.id}`}
              ref={refs[i]}
              className={`shadow-md overflow-hidden relative group w-[45%] md:w-[30%] lg:w-[22%] rounded-3xl
                transition-transform duration-300
                ${visibleSections[`nonAcad-${ach.id}`]
                  ? "translate-y-0 opacity-100 ease-in-out"
                  : "translate-y-10 opacity-0 ease-in"
                }`}
            >
              <div className="relative overflow-hidden rounded-3xl h-[12rem] md:h-[9rem] lg:h-[7rem]">
                <img
                  src={getImageUrl(ach)}
                  alt={getTitle(ach)}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x200?text=Image+Error';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                <div className="absolute bottom-0 left-0 w-full p-4 bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <p className="text-sm text-gray-600">Klik untuk lihat detail</p>
                </div>
              </div>
              <h3 className="text-xl font-semibold mt-5">
                {getTitle(ach)}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AchievNonAcademic;