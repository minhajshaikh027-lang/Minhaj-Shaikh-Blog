const header = document.getElementById("site-header");
const footer = document.getElementById("site-footer");

function getUser(){
  try{return JSON.parse(localStorage.getItem("minhaj_current_user")) || null}catch(e){return null}
}

function renderLayout(){
  const user=getUser();
  if(header){
    header.innerHTML=`
      <header class="site-header">
        <nav class="nav">
          <a class="logo" href="index.html">MINHAJ SHAIKH<span>.</span></a>
          <div class="nav-links">
            <a href="index.html">Home</a>
            <a href="blog.html">Blog</a>
            <a href="about.html">About</a>
            <a href="contact.html">Contact</a>
          </div>
          <div class="nav-actions">
            <button class="icon-btn" id="theme-toggle" aria-label="Toggle theme">☼</button>
            ${user ? `<a class="user-pill" href="profile.html">Hi, ${escapeHTML(user.name.split(" ")[0])} 👋</a><button class="icon-btn" id="logout-btn" title="Logout">↪</button>` : `<a class="btn btn-primary" href="login.html">Login</a>`}
            <button class="menu-btn" id="menu-btn">☰</button>
          </div>
        </nav>
      </header>`;
    const current=location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".nav-links a").forEach(a=>{if(a.getAttribute("href")===current)a.classList.add("active")});
    document.getElementById("theme-toggle")?.addEventListener("click",toggleTheme);
    document.getElementById("logout-btn")?.addEventListener("click",logout);
    document.getElementById("menu-btn")?.addEventListener("click",()=>{
      const links=document.querySelector(".nav-links");
      links.style.display=links.style.display==="flex"?"none":"flex";
      links.style.position="absolute";links.style.top="68px";links.style.left="0";links.style.right="0";
      links.style.background="var(--bg)";links.style.padding="18px 22px";links.style.flexDirection="column";links.style.alignItems="flex-start";
    });
  }
  if(footer){
    footer.innerHTML=`<footer class="footer"><div class="footer-inner">
      <div><a class="logo" href="index.html">MINHAJ SHAIKH<span>.</span></a><p style="margin-top:8px">Stories • College • Vlogs • LifeStyle</p></div>
      <div class="footer-links"><a href="blog.html">Blog</a><a href="about.html">About</a><a href="contact.html">Contact</a><a href="https://www.instagram.com/itz_minhajshaikh.18/" target="_blank" rel="noopener">Instagram @itz_minhajshaikh.18</a><a href="login.html">Login</a></div>
      <p>© ${new Date().getFullYear()} Minhaj Shaikh</p>
    </div></footer>`;
  }
}
function escapeHTML(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function toggleTheme(){
  const light=document.body.classList.toggle("light");
  localStorage.setItem("minhaj_theme",light?"light":"dark");
  if(light){
    document.documentElement.style.setProperty("--bg","#f6f6f2");
    document.documentElement.style.setProperty("--surface","#ffffff");
    document.documentElement.style.setProperty("--surface2","#f0f0eb");
    document.documentElement.style.setProperty("--text","#161616");
    document.documentElement.style.setProperty("--muted","#666");
    document.documentElement.style.setProperty("--line","#deded7");
  }else{
    document.documentElement.style.setProperty("--bg","#0a0a0b");
    document.documentElement.style.setProperty("--surface","#111113");
    document.documentElement.style.setProperty("--surface2","#171719");
    document.documentElement.style.setProperty("--text","#f4f4f2");
    document.documentElement.style.setProperty("--muted","#a6a6a3");
    document.documentElement.style.setProperty("--line","#29292c");
  }
}
function logout(){localStorage.removeItem("minhaj_current_user");location.href="index.html"}
function requireLogin(){if(!getUser()){location.href="login.html";return false}return true}

document.addEventListener("DOMContentLoaded",()=>{
  renderLayout();
  if(localStorage.getItem("minhaj_theme")==="light")toggleTheme();
  document.getElementById("newsletter-form")?.addEventListener("submit",e=>{
    e.preventDefault();alert("Thanks for subscribing!");e.target.reset();
  });
  document.getElementById("contact-form")?.addEventListener("submit",e=>{
    e.preventDefault();document.getElementById("contact-status").textContent="Message saved for this demo. Thank you!";
    e.target.reset();
  });
});