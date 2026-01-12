// projects-data.js
// SIMPAN file ini di folder yang sama dengan index.html

const projectsData = [
  {
    id: 1,
    title: "Website E-BookVerse",
    description: "Platform digital untuk membeli buku secara online.",
    image: "assets/bookverse.png",
    link: "https://decerrick-sarjana-tidur.github.io/e-book-verse/",
    tags: ["HTML", "CSS", "JavaScript"]
  },
  {
    id: 2,
    title: "Website Resep Makanan",
    description: "Memudahkan orang mencari resep makanan nikmat.",
    image: "assets/resep.png",
    link: "https://decerrick-sarjana-tidur.github.io/De-TechLab/",
    tags: ["HTML", "CSS", "Bootstrap"]
  },
  {
    id: 3,
    title: "Website Portofolio",
    description: "Untuk personal branding agar bisa mudah dilihat client.",
    image: "assets/portofolio.png",
    link: "https://decerrick-sarjana-tidur.github.io/My-Portofolio/",
    tags: ["HTML", "CSS", "JavaScript"]
  }
];

// Untuk browser
window.projectsData = projectsData;