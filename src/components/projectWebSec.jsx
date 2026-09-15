// Modifikasi dari ProjectWebSection: Menampilkan webProject, webCollabProject, dan semua proyek lainnya dengan penanda proyek unggulan
import React, { useState, useEffect, useRef, useContext } from "react";
import { AnimationContext } from "../App";

function ProjectWebSection() {
  const { visibleSections, observeSections } = useContext(AnimationContext);
  const [projects, setProjects] = useState([]);
  const [collabProjects, setCollabProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refs, setRefs] = useState({});

  const moreRef = useRef(null);
  const testRef = useRef(null);

  useEffect(() => {
    async function fetchAllProjects() {
      try {
        // Sequential fetching (satu per satu)
        const resWeb = await fetch("https://personal-website-backend-vercel.vercel.app/api/db_web_project");
        const jsonWeb = await resWeb.json();
        
        const resCollab = await fetch("https://personal-website-backend-vercel.vercel.app/api/db_collab_web_project");
        const jsonCollab = await resCollab.json();

        // Proses data seperti sebelumnya
        const sortByDate = (arr) =>
          arr
            .filter(p => p.properties && p.properties.Foto?.files?.length > 0)
            .sort((a, b) => {
              try {
                const dateA = new Date(a.properties.Date?.date?.start);
                const dateB = new Date(b.properties.Date?.date?.start);
                return dateB - dateA;
              } catch {
                return 0;
              }
            });

        setProjects(sortByDate(jsonWeb));
        setCollabProjects(sortByDate(jsonCollab));
      } catch (e) {
        console.error("Fetch error:", e);
      } finally {
        setLoading(false);
      }
    }
    
    fetchAllProjects();
  }, []);

  useEffect(() => {
    const createRefMap = {};
    [...projects, ...collabProjects].forEach((project) => {
      createRefMap[project.id] = React.createRef();
    });
    setRefs(createRefMap);
  }, [projects, collabProjects]);

  useEffect(() => {
    const refList = [...Object.values(refs), moreRef, testRef];
    if (refList.length > 0) {
      observeSections(refList, Array(refList.length).fill(0.2));
    }
  }, [refs, observeSections]);
  
  // Pisahkan daftar terbaik dan semua untuk proyek mandiri
  const bestPersonalWebsite = projects.filter(project => 
    project.properties.Terbaik && project.properties.Terbaik.checkbox
  );
  const restPersonalWebsite = projects;

  // Pisahkan daftar terbaik dan semua untuk proyek kolaborasi
  const bestCollabWebsite = collabProjects.filter(project => 
    project.properties.Terbaik && project.properties.Terbaik.checkbox
  );
  const restCollabWebsite = collabProjects;

  const getImageUrl = (project) => {
    const file = project.properties?.Foto?.files?.[0];
    const url = file?.file?.url || file?.external?.url;
    return url || 'https://via.placeholder.com/800x600?text=No+Image';
  };

  // Fungsi untuk mendapatkan judul
  const getTitle = (project) =>
    project.properties?.Name?.title?.[0]?.plain_text || 'Judul Tidak Tersedia';

  const getDescription = (project) =>
    project.properties?.Description?.rich_text?.[0]?.plain_text || 'Judul Tidak Tersedia';

  // Fungsi untuk mendapatkan link
  const getLinkWeb = (project) => {
    if (!project.properties.LinkWeb || !project.properties.LinkWeb.url) {
      return '#';
    }
    return project.properties.LinkWeb.url;
  };

  // Fungsi untuk mendapatkan link
  const getLinkRepo = (project) => {
    if (!project.properties.RepoLink || !project.properties.RepoLink.url) {
      return '#';
    }
    return project.properties.RepoLink.url;
  };

  const isFeatured = (project) =>
    project.properties?.Terbaik?.checkbox === true;

  if (loading) return <p className="text-xl text-center">Loading proyek...</p>;

  return (
    <section className="w-[98%] mx-auto p-6 text-center">
      <div className="w-full px-14">
        {/* Web mandiri */}
        <div className="w-full">
          {/* Web mandiri terbaik */}
          {bestPersonalWebsite.length > 0 && (
            <div className="w-full">
              <h2 className="text-2xl font-bold mb-4">Web Mandiri Terbaik</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-14 mt-4 px-14 w-full">
                {bestPersonalWebsite.map((project) => {
              const visibleBestPersonalWeb = visibleSections[`web-${project.id}`];
              const classBestPersonalWeb = `group shadow-md hover:shadow-black overflow-hidden block cursor-pointer transition-all duration-300 rounded-3xl
                ${visibleBestPersonalWeb ? "translate-y-0 opacity-100 ease-in-out" : "translate-y-10 opacity-0 ease-in"}`;
              return (
                  <a
                    key={project.id}
                    href={getLinkWeb(project)}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`web-${project.id}`}
                    ref={refs[project.id] || null}
                    className={classBestPersonalWeb}
                  >
                    {/* gambar dan efek hover */}
                    <div className="relative overflow-hidden rounded-3xl h-64">
                      <img
                        src={getImageUrl(project)}
                        alt={getTitle(project)}
                        className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute bottom-0 left-0 w-full p-4 bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {/* Deskripsi proyek yang muncul saat hover */}
                        <p className="text-sm text-left text-gray-700 mt-1">{getDescription(project)}. Klik untuk melihat detail</p>
                      </div>
                    </div>
                    <h2 className="text-xl font-semibold mt-5 pb-4">{getTitle(project)}</h2>
                  </a>
                )})}
              </div>
            </div>
          )}

          {/* Daftar Semua Proyek mandiri */}
          {restPersonalWebsite.length > 0 && (
            <div className="w-full">
              <h2 className="text-2xl font-bold mt-8 mb-4">Semua Proyek Mandiri</h2>
              <div className="flex flex-wrap justify-center gap-6">
                {restPersonalWebsite.map((project) => {
              const visibleRestPersonalWeb = visibleSections[`web-${project.id}`];
              const classRestPersonalWeb = `group shadow-md hover:shadow-black overflow-hidden block cursor-pointer transition-all duration-300 rounded-3xl w-[45%] md:w-[30%] lg:w-[22%]
                ${visibleRestPersonalWeb ? "translate-y-0 opacity-100 ease-in-out" : "translate-y-10 opacity-0 ease-in"}`;
              return (
                  <a
                    key={project.id}
                    href={getLinkRepo(project)}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`web-${project.id}`}
                    ref={refs[project.id] || null}
                    className={classRestPersonalWeb}
                  >
                    <div className="relative overflow-hidden rounded-3xl h-32 md:h-28 lg:h-20 xl:h-28">
                      <img
                        src={getImageUrl(project)}
                        alt={getTitle(project)}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/800x600?text=Image+Error';
                        }}
                      />
                      {isFeatured(project) && (
                        <div className="absolute top-2 left-2 bg-yellow-300 text-black text-sm font-semibold px-2 py-1 rounded-full shadow">
                          Terbaik
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                      <div className="absolute bottom-0 left-0 w-full p-4 bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <p className="text-sm text-gray-600">Klik untuk melihat kode</p>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mt-5 pb-4">
                      {getTitle(project)}
                    </h3>
                  </a>
                )})}
              </div>
            </div>
          )}
        </div>

        {/* Web kolaborasi */}
        <div className="w-full mt-24">
          {/* Web kolaborasi terbaik */}
          {bestCollabWebsite.length > 0 && (
            <div className="w-full">
              <h2 className="text-2xl font-bold mb-4">Web Kolaborasi Terbaik</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-14 mt-4 px-14 w-full">
                {bestCollabWebsite.map((project) => {
              const visibleBestCollabWeb = visibleSections[`collab-${project.id}`];
              const classBestCollabWeb = `group shadow-md hover:shadow-black overflow-hidden block cursor-pointer transition-all duration-300 rounded-3xl
                ${visibleBestCollabWeb ? "translate-y-0 opacity-100 ease-in-out" : "translate-y-10 opacity-0 ease-in"}`;
              return (
                  <a
                    key={project.id}
                    href={getLinkWeb(project)}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`collab-${project.id}`}
                    ref={refs[project.id] || null}
                    className={classBestCollabWeb}
                  >
                    {/* gambar dan efek hover */}
                    <div className="relative overflow-hidden rounded-3xl h-64">
                      <img
                        src={getImageUrl(project)}
                        alt={getTitle(project)}
                        className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute bottom-0 left-0 w-full p-4 bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        {/* Deskripsi proyek yang muncul saat hover */}
                        <p className="text-sm text-left text-gray-700 mt-1">{getDescription(project)}. Klik untuk melihat detail</p>
                      </div>
                    </div>
                    <h2 className="text-3xl font-semibold mt-5 pb-4">{getTitle(project)}</h2>
                  </a>
                )})}
              </div>
            </div>
          )}

          {/* Daftar Semua Proyek kolaborasi */}
          {restCollabWebsite.length > 0 && (
            <div className="w-full">
              <h2 className="text-2xl font-bold mt-8 mb-4">Semua Proyek Kolaborasi</h2>
              <div className="flex flex-wrap justify-center gap-6">
                {restCollabWebsite.map((project) => {
              const visibleRestCollabWeb = visibleSections[`collab-${project.id}`];
              const classRestCollabWeb = `group shadow-md hover:shadow-black overflow-hidden block cursor-pointer transition-all duration-300 rounded-3xl w-[45%] md:w-[30%] lg:w-[22%]
                ${visibleRestCollabWeb ? "translate-y-0 opacity-100 ease-in-out" : "translate-y-10 opacity-0 ease-in"}`;
              return (
                  <a
                    key={project.id}
                    href={getLinkRepo(project)}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`collab-${project.id}`}
                    ref={refs[project.id] || null}
                    className={classRestCollabWeb}
                  >
                    <div className="relative overflow-hidden rounded-3xl h-32 md:h-28 lg:h-20 xl:h-28">
                      <img
                        src={getImageUrl(project)}
                        alt={getTitle(project)}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/800x600?text=Image+Error';
                        }}
                      />
                      {isFeatured(project) && (
                        <div className="absolute top-2 left-2 bg-yellow-300 text-black text-sm font-semibold px-2 py-1 rounded-full shadow">
                          Terbaik
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"/>
                      <div className="absolute bottom-0 left-0 w-full p-4 bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <p className="text-sm text-gray-600">Klik untuk melihat kode</p>
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mt-5 pb-4">
                      {getTitle(project)}
                    </h3>
                  </a>
                )})}
              </div>
            </div>
          )}
        </div>

      </div>

      <a
        href="https://github.com/orgs/Sem-1-Workshop-Desain-web/repositories"
        ref={moreRef}
        target="_blank"
        rel="noreferrer"
        className={`px-6 py-2 mt-16 border-2 justify-center border-white rounded-3xl bg-black text-white text-center inline-block
          transition-all duration-300 hover:bg-white hover:text-black
          ${visibleSections["more"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
      >
        Lihat Lebih Banyak
      </a>

      <p className="mt-1 text-sm text-white text-center">
        <a
          href="https://drive.google.com/file/d/1SYDLonyZ-w3sEXUVpBrOC1BO9BI8nMEK/view?usp=sharing"
          ref={testRef}
          target="_blank"
          rel="noreferrer"
          className={`relative inline-block text-white hover:after:scale-x-100 after:block after:w-full after:h-[2px] after:bg-white after:scale-x-0 after:origin-left after:transition-transform after:duration-300
            ${visibleSections["test"] ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
        >
          Cara Menguji Program?
        </a>
      </p>
    </section>
  );
}

export default ProjectWebSection;
