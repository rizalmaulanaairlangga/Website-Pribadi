import React, { useState, useEffect, useContext } from 'react';
import { AnimationContext } from '../App';

const AcademicAchievements = () => {
  const { visibleSections, observeSections } = useContext(AnimationContext);

  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refs, setRefs] = useState([]);

  // Fetch data
  useEffect(() => {
    async function fetchAchievements() {
      try {
        const res = await fetch('https://personal-website-backend-vercel.vercel.app/api/db_aca_achiev');
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

      } catch {
        console.error('Fetch error');
      } finally {
        setLoading(false);
      }
    }
    fetchAchievements();
  }, []);

  // Set up refs untuk setiap achievement
  useEffect(() => {
    setRefs(achievements.map(() => React.createRef()));
  }, [achievements]);

  // Observe refs dengan threshold = 0 (langsung trigger saat muncul)
  useEffect(() => {
    if (refs.length > 0) {
      observeSections(refs, Array(refs.length).fill(0));
    }
  }, [refs, observeSections]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl">Loading prestasi...</p>
      </div>
    );
  }
  if (achievements.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl">Tidak ada data prestasi yang ditemukan</p>
      </div>
    );
  }

  const bestAchievement = achievements.filter(ach => ach.properties.Terbaik?.checkbox);
  const rest = achievements; // atau .filter(...) sesuai kebutuhan

  const getImageUrl = (ach) =>
    ach.properties.Foto?.files?.[0]?.file?.url ||
    'https://via.placeholder.com/300x200?text=No+Image';

  const getTitle = (ach) =>
    ach.properties.Name?.title?.[0]?.plain_text || 'Judul Tidak Tersedia';

  const getLink = (ach) =>
    ach.properties.File?.files?.[0]?.file?.url || '#';

  return (
    <section className="w-[98%] mx-auto p-6 text-ce nter">
      {/* Prestasi Terbaik */}
      {bestAchievement.length > 0 && (
        <div className="w-full">
          <h2 className="text-2xl font-bold mb-4">Prestasi Terbaik</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-14 px-14 w-full">
            {bestAchievement.map((ach) => {
              const idx = achievements.findIndex(x => x.id === ach.id);
              // Buat className lebih rapi
              const baseClasses = [
                "group shadow-md hover:shadow-black overflow-hidden block cursor-pointer",
                "transition-all duration-300 rounded-3xl"
              ];
              const animationClasses = visibleSections[`acad-${ach.id}`]
                ? "translate-y-0 opacity-100 ease-in-out"
                : "translate-y-10 opacity-0 ease-in";
              const className = [...baseClasses, animationClasses].join(" ");

              return (
                <a
                  key={ach.id}
                  href={getLink(ach)}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`acad-${ach.id}`}
                  ref={refs[idx] ?? null}
                  className={className}
                >
                  <div className="relative overflow-hidden rounded-3xl h-64">
                    <img
                      src={getImageUrl(ach)}
                      alt={getTitle(ach)}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        if (!e.target.src.includes('placeholder.com')) {
                          e.target.src = 'https://via.placeholder.com/300x200?text=Image+Error';
                        }
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

      {/* Semua Prestasi */}
      <div>
        <h2 className="text-2xl font-bold mt-8 mb-4">Semua Prestasi</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {rest.map((ach, i) => {
            const baseClasses = [
              "shadow-md overflow-hidden relative group",
              "w-[45%] md:w-[30%] lg:w-[22%] rounded-3xl",
              "transition-transform duration-300"
            ];
            const animationClasses = visibleSections[`acad-${ach.id}`]
              ? "translate-y-0 opacity-100 ease-in-out"
              : "translate-y-10 opacity-0 ease-in";
            const className = [...baseClasses, animationClasses].join(" ");

            return (
              <a
                key={ach.id}
                href={getLink(ach)}
                target="_blank"
                rel="noopener noreferrer"
                id={`acad-${ach.id}`}
                ref={refs[i] ?? null}
                className={className}
              >
                <div className="relative overflow-hidden rounded-3xl h-[12rem] md:h-[9rem] lg:h-[7rem]">
                  <img
                    src={getImageUrl(ach)}
                    alt={getTitle(ach)}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      if (!e.target.src.includes('placeholder.com')) {
                        e.target.src = 'https://via.placeholder.com/300x200?text=Image+Error';
                      }
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
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AcademicAchievements;
