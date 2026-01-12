/* TYPING */
const nameText="De' Cerrick Rizqulloh Mumtaz";
let i=0;
const typing=document.getElementById("typing");
(function type(){
  if(i<nameText.length){
    typing.textContent+=nameText[i++];
    setTimeout(type,120);
  }
})();

/* GALAXY */
const canvas=document.getElementById("galaxy");
const ctx=canvas.getContext("2d");
let w,h,particles=[];
function resize(){w=canvas.width=innerWidth;h=canvas.height=innerHeight}
window.onresize=resize;resize();
for(let i=0;i<120;i++){
  particles.push({x:Math.random()*w,y:Math.random()*h,z:Math.random()*2+.5,r:Math.random()*2+.5});
}
let scrollY=0;
window.addEventListener("scroll",()=>scrollY=window.scrollY);
(function animate(){
  ctx.clearRect(0,0,w,h);
  particles.forEach(p=>{
    p.y+=p.z;if(p.y>h)p.y=0;
    ctx.fillStyle="rgba(120,150,255,.6)";
    ctx.beginPath();
    ctx.arc(p.x,p.y-scrollY*.1*p.z,p.r*p.z,0,Math.PI*2);
    ctx.fill();
  });
  requestAnimationFrame(animate);
})();

/* SCROLL SPY */
const links = document.querySelectorAll(".nav-links a");
const sections = [...document.querySelectorAll("section")];

window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
  let current = "";
  
  sections.forEach(s => {
    const sectionTop = s.offsetTop;
    const sectionHeight = s.clientHeight;
    
    if (scrollY >= sectionTop - 150) {
      current = s.id;
    }
  });
  
  links.forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
});

/* REVEAL */
const reveals=document.querySelectorAll(".reveal");
const io=new IntersectionObserver(e=>{
  e.forEach(x=>x.isIntersecting&&x.target.classList.add("show"))
},{threshold:.15});
reveals.forEach(r=>io.observe(r));

/* MOBILE NAVIGATION */
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
const navOverlay = document.createElement("div");
navOverlay.className = "nav-overlay";
document.body.appendChild(navOverlay);


// Toggle mobile menu
navToggle.addEventListener("click", function(e) {
  e.stopPropagation();
  navLinks.classList.toggle("active");
  navToggle.classList.toggle("active");
  navOverlay.classList.toggle("active");
});

// Close menu when clicking overlay
navOverlay.addEventListener("click", function() {
  navLinks.classList.remove("active");
  navToggle.classList.remove("active");
  navOverlay.classList.remove("active");
});

// Close menu when clicking a link (mobile only)
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", function() {
    if (window.innerWidth <= 768) {
      navLinks.classList.remove("active");
      navToggle.classList.remove("active");
      navOverlay.classList.remove("active");
    }
  });
});

// Close menu when clicking outside (desktop behavior)
document.addEventListener("click", function(e) {
  if (window.innerWidth <= 768 && 
      !navLinks.contains(e.target) && 
      !navToggle.contains(e.target) &&
      navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
    navToggle.classList.remove("active");
    navOverlay.classList.remove("active");
  }
});

// Handle window resize
window.addEventListener("resize", function() {
  if (window.innerWidth > 768) {
    // Reset menu state on desktop
    navLinks.classList.remove("active");
    navToggle.classList.remove("active");
    navOverlay.classList.remove("active");
  }
});

// Update theme toggle position
const themeToggle = document.getElementById("themeToggle");
themeToggle.classList.add("theme-toggle");

// Perbarui fungsi scroll spy untuk navigasi mobile
// Fungsi yang sudah ada untuk scroll spy tetap berjalan
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(s => {
    if (scrollY >= s.offsetTop - 150) current = s.id;
  });
  
  links.forEach(a => {
    a.classList.toggle("active", a.getAttribute("href") === "#" + current);
  });
});

/* THEME */
const toggle=document.getElementById("themeToggle");
toggle.onclick=()=>document.body.classList.toggle("light");

/* MODAL + CAROUSEL */
const modal=document.getElementById("modal");
const carouselImg=document.getElementById("carouselImg");
const imgs=[
  "https://picsum.photos/800/500?1",
  "https://picsum.photos/800/500?2",
  "https://picsum.photos/800/500?3"
];
let idx=0;
function openModal(){modal.classList.add("show")}
function closeModal(){modal.classList.remove("show")}
function nextImg(){idx=(idx+1)%imgs.length;carouselImg.src=imgs[idx]}
function prevImg(){idx=(idx-1+imgs.length)%imgs.length;carouselImg.src=imgs[idx]}

/* CERTIFICATE MODAL */
const certModal = document.getElementById("certModal");
const certImg = document.getElementById("certImg");
const certDesc = document.getElementById("certDesc");

document.querySelectorAll(".cert").forEach(card=>{
  card.onclick=()=>{
    certModal.style.display="flex";
    certImg.src=card.dataset.img;
    certDesc.textContent=card.dataset.desc;
  };
});

document.querySelector(".close").onclick=()=>{
  certModal.style.display="none";
};

/* ==================== CERTIFICATES SYSTEM (DINAMIS) ==================== */

class CertificatesSystem {
  constructor() {
    this.certificatesGrid = document.getElementById('certificatesGrid');
    this.certificates = window.certificatesData || [];
    
    this.certModal = document.getElementById('certModal');
    this.certModalImg = document.getElementById('certModalImg');
    this.certModalTitle = document.getElementById('certModalTitle');
    this.certModalIssuer = document.getElementById('certModalIssuer');
    this.certModalYear = document.getElementById('certModalYear');
    this.certModalDesc = document.getElementById('certModalDesc');
    this.certModalTags = document.getElementById('certModalTags');
    this.certClose = document.getElementById('certClose');
    this.downloadBtn = document.querySelector('.cert-download-btn');
    
    this.currentCertificate = null;
    
    this.init();
  }
  
  init() {
    this.renderCertificates();
    this.initModal();
  }
  
  renderCertificates() {
    // Clear loading spinner
    const loading = this.certificatesGrid.querySelector('.loading-certificates');
    if (loading) loading.remove();
    
    if (this.certificates.length === 0) {
      this.showEmptyState();
      return;
    }
    
    // Render each certificate
    this.certificates.forEach(certificate => {
      const certElement = this.createCertificateElement(certificate);
      this.certificatesGrid.appendChild(certElement);
    });
    
    // Initialize reveal animations
    this.initRevealAnimations();
  }
  
  createCertificateElement(cert) {
    const certEl = document.createElement('div');
    certEl.className = 'card cert-card reveal';
    certEl.dataset.certId = cert.id;
    
    certEl.innerHTML = `
      <h3 class="cert-title">${cert.title}</h3>
      <p class="cert-issuer">${cert.issuer}</p>
      <div class="cert-year">${cert.year}</div>
      
      ${cert.tags && cert.tags.length > 0 ? `
        <div class="cert-tags">
          ${cert.tags.slice(0, 3).map(tag => `<span class="cert-tag">${tag}</span>`).join('')}
          ${cert.tags.length > 3 ? `<span class="cert-tag">+${cert.tags.length - 3}</span>` : ''}
        </div>
      ` : ''}
    `;
    
    // Click to open modal
    certEl.addEventListener('click', () => {
      this.openCertificate(cert);
    });
    
    return certEl;
  }
  
  showEmptyState() {
    this.certificatesGrid.innerHTML = `
      <div class="empty-state">
        <h3>No Certificates Yet</h3>
        <p>Certificates will be displayed here soon.</p>
      </div>
    `;
  }
  
  initRevealAnimations() {
    const reveals = this.certificatesGrid.querySelectorAll('.cert-card.reveal');
    reveals.forEach(reveal => {
      if (typeof io !== 'undefined') {
        io.observe(reveal);
      }
    });
  }
  
  initModal() {
    // Close modal events
    this.certClose.addEventListener('click', () => this.closeModal());
    this.certModal.addEventListener('click', (e) => {
      if (e.target === this.certModal) {
        this.closeModal();
      }
    });
    
    // Download button event
    this.downloadBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      this.downloadCertificate();
    });
    
    // Close with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.certModal.classList.contains('active')) {
        this.closeModal();
      }
    });
  }
  
  openCertificate(cert) {
    this.currentCertificate = cert;
    
    // Show loading state
    this.certModalImg.classList.add('loading');
    
    // Set modal content
    this.certModalImg.src = cert.image;
    this.certModalImg.alt = `${cert.title} Certificate`;
    this.certModalTitle.textContent = cert.title;
    this.certModalIssuer.textContent = cert.issuer;
    this.certModalYear.textContent = cert.year;
    this.certModalDesc.textContent = cert.description;
    
    // Set tags
    if (cert.tags && cert.tags.length > 0) {
      this.certModalTags.innerHTML = cert.tags.map(tag => 
        `<span class="cert-modal-tag">${tag}</span>`
      ).join('');
    } else {
      this.certModalTags.innerHTML = '';
    }
    
    // Show modal
    this.certModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Remove loading when image loads
    this.certModalImg.onload = () => {
      this.certModalImg.classList.remove('loading');
    };
    
    // Handle image error
    this.certModalImg.onerror = () => {
      this.certModalImg.classList.remove('loading');
      this.certModalImg.src = 'https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    };
  }
  
  closeModal() {
    this.certModal.classList.remove('active');
    document.body.style.overflow = '';
    
    // Reset after animation
    setTimeout(() => {
      this.certModalImg.src = '';
      this.currentCertificate = null;
    }, 300);
  }
  
  downloadCertificate() {
    if (!this.currentCertificate) return;
    
    const link = document.createElement('a');
    link.href = this.currentCertificate.image;
    link.download = `${this.currentCertificate.title}_${this.currentCertificate.year}_${this.currentCertificate.issuer}.jpg`
      .replace(/\s+/g, '_')
      .replace(/[^\w\-.]/g, '');
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    this.showDownloadToast();
  }
  
  showDownloadToast() {
    const toast = document.createElement('div');
    toast.className = 'toast success';
    toast.innerHTML = `
      <span class="toast-icon">✅</span>
      <span class="toast-message">Certificate download started!</span>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => toast.classList.add('show'), 10);
    
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 3000);
  }
}

// Initialize certificates system
document.addEventListener('DOMContentLoaded', () => {
  // Check if certificates data is loaded
  if (typeof window.certificatesData !== 'undefined') {
    new CertificatesSystem();
  } else {
    setTimeout(() => {
      new CertificatesSystem();
    }, 500);
  }
});

/* ==================== PROJECTS SYSTEM (JSON BASED) ==================== */

class ProjectsSystem {
  constructor() {
    this.projectsGrid = document.getElementById('projectsGrid');
    this.projects = window.projectsData || [];
    
    this.init();
  }
  
  init() {
    this.renderProjects();
  }
  
  renderProjects() {
    // Clear loading spinner
    const loading = this.projectsGrid.querySelector('.loading-projects');
    if (loading) loading.remove();
    
    if (this.projects.length === 0) {
      this.showEmptyState();
      return;
    }
    
    // Render each project
    this.projects.forEach((project) => {
      const projectElement = this.createProjectElement(project);
      this.projectsGrid.appendChild(projectElement);
    });
    
    // Initialize reveal animations
    this.initRevealAnimations();
  }
  
  createProjectElement(project) {
    const projectEl = document.createElement('div');
    projectEl.className = 'card project reveal';
    
    const hasLink = project.link && project.link.trim() !== '';
    const imageUrl = project.image || 'https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    
    projectEl.innerHTML = `
      <img src="${imageUrl}" loading="lazy" alt="${project.title}" 
           onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'">
      
      <div class="project-info">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        
        ${project.tags && project.tags.length > 0 ? `
          <div class="project-tags">
            ${project.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
          </div>
        ` : ''}
        
        ${hasLink ? `
          <a href="${project.link}" 
             target="_blank" 
             class="project-link" 
             onclick="event.stopPropagation()">
            View Project →
          </a>
        ` : ''}
      </div>
    `;
    
    // Click to open project details
    projectEl.addEventListener('click', () => {
      this.openProjectDetails(project);
    });
    
    return projectEl;
  }
  
  openProjectDetails(project) {
    // Update existing modal with project details
    const modal = document.getElementById('modal');
    const modalContent = modal.querySelector('.modal-content');
    
    // Update content
    const modalTitle = modalContent.querySelector('h2');
    const modalDesc = modalContent.querySelector('p');
    
    if (modalTitle) modalTitle.textContent = project.title;
    if (modalDesc) modalDesc.textContent = project.description;
    
    // Update image if exists
    const carouselImg = document.getElementById('carouselImg');
    if (carouselImg && project.image) {
      carouselImg.src = project.image;
    }
    
    // Update tech tags if exists
    const techContainer = modalContent.querySelector('.tech');
    if (techContainer && project.tags) {
      techContainer.innerHTML = project.tags.map(tag => 
        `<span>${tag}</span>`
      ).join('');
    }
    
    // Show modal
    modal.classList.add('show');
  }
  
  showEmptyState() {
    this.projectsGrid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📁</div>
        <h3>No Projects Yet</h3>
        <p>Projects will be displayed here soon.</p>
      </div>
    `;
  }
  
  initRevealAnimations() {
    const reveals = this.projectsGrid.querySelectorAll('.project.reveal');
    reveals.forEach(reveal => {
      // Observe with existing Intersection Observer
      if (typeof io !== 'undefined') {
        io.observe(reveal);
      }
    });
  }
}

// Initialize projects system
document.addEventListener('DOMContentLoaded', () => {
  // Check if projects data is loaded
  if (typeof window.projectsData !== 'undefined') {
    new ProjectsSystem();
  } else {
    // Fallback: wait a bit then initialize
    setTimeout(() => {
      new ProjectsSystem();
    }, 500);
  }
});