// certificates-data.js
// SIMPAN file ini di folder yang sama dengan index.html

const certificatesData = [
  {
    id: 1,
    title: "UI/UX Design",
    issuer: "Trilogy Kode SIdinus Vol. 2",
    year: "2025",
    image: "assets/Sertifikat UI dan UX Udinus.jpg",
    description: "UI/UX Design Fundamentals - Trilogy Kode SIdinus Vol. 2, 2025. Mempelajari prinsip desain, user research, prototyping, dan usability testing dengan studi kasus nyata.",
    tags: ["UI Design", "UX Research", "Figma", "Prototyping"]
  },
  {
    id: 2,
    title: "Cloud Server Management",
    issuer: "RedHat Academy",
    year: "2025",
    image: "assets/Sertifikat RedHat Linux.jpg",
    description: "Cloud Server Management - RedHat Academy, 2025. Mempelajari prinsip desain, user research, prototyping, dan usability testing dengan studi kasus nyata.",
    tags: ["Linux", "Server Management", "Cloud Server", "RedHat"]
  }
  // TAMBAHKAN SERTIFIKAT BARU DI SINI!
  // Copy template di bawah dan edit:
  /*
  {
    id: 5,
    title: "Nama Sertifikat",
    issuer: "Penerbit",
    year: "2024",
    image: "https://example.com/gambar.jpg",
    description: "Deskripsi lengkap sertifikat Anda.",
    icon: "🎓",
    tags: ["Tag1", "Tag2", "Tag3"]
  },
  */
];

// Untuk browser
window.certificatesData = certificatesData;