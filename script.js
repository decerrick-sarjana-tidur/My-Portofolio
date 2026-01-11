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
const links=document.querySelectorAll("nav a");
const sections=[...document.querySelectorAll("section")];
window.addEventListener("scroll",()=>{
  let current="";
  sections.forEach(s=>{if(scrollY>=s.offsetTop-150)current=s.id});
  links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")==="#"+current));
});

/* REVEAL */
const reveals=document.querySelectorAll(".reveal");
const io=new IntersectionObserver(e=>{
  e.forEach(x=>x.isIntersecting&&x.target.classList.add("show"))
},{threshold:.15});
reveals.forEach(r=>io.observe(r));

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
