function setStatus(id,msg,error=false){
  const el=document.getElementById(id); if(el){el.textContent=msg;el.style.color=error?"#ff8f8f":"var(--accent)"}
}
document.addEventListener("DOMContentLoaded",()=>{
  document.querySelectorAll(".show-pass").forEach(btn=>{
    btn.addEventListener("click",()=>{
      const input=document.getElementById(btn.dataset.target);
      input.type=input.type==="password"?"text":"password";btn.textContent=input.type==="password"?"Show":"Hide";
    });
  });

  const signup=document.getElementById("signup-form");
  signup?.addEventListener("submit",e=>{
    e.preventDefault();
    const name=document.getElementById("signup-name").value.trim();
    const email=document.getElementById("signup-email").value.trim().toLowerCase();
    const pass=document.getElementById("signup-password").value;
    const confirm=document.getElementById("signup-confirm").value;
    if(pass.length<6)return setStatus("signup-status","Password must contain at least 6 characters.",true);
    if(pass!==confirm)return setStatus("signup-status","Passwords do not match.",true);
    const users=JSON.parse(localStorage.getItem("minhaj_users")||"[]");
    if(users.some(u=>u.email===email))return setStatus("signup-status","An account with this email already exists.",true);
    const user={name,email,password:pass};
    users.push(user);localStorage.setItem("minhaj_users",JSON.stringify(users));
    localStorage.setItem("minhaj_current_user",JSON.stringify({name,email}));
    setStatus("signup-status","Account created! Redirecting...");
    setTimeout(()=>location.href="profile.html",700);
  });

  const login=document.getElementById("login-form");
  login?.addEventListener("submit",e=>{
    e.preventDefault();
    const email=document.getElementById("login-email").value.trim().toLowerCase();
    const pass=document.getElementById("login-password").value;
    const users=JSON.parse(localStorage.getItem("minhaj_users")||"[]");
    const user=users.find(u=>u.email===email&&u.password===pass);
    if(!user)return setStatus("login-status","Incorrect email or password.",true);
    localStorage.setItem("minhaj_current_user",JSON.stringify({name:user.name,email:user.email}));
    setStatus("login-status","Login successful! Redirecting...");
    setTimeout(()=>location.href="profile.html",600);
  });

  const profileName=document.getElementById("profile-name");
  if(profileName){
    const user=getUser();
    if(!user){location.href="login.html";return}
    document.getElementById("profile-name").textContent=`Welcome, ${user.name.split(" ")[0]} 👋`;
    document.getElementById("profile-email").textContent=user.email;
    document.getElementById("profile-avatar").textContent=user.name.charAt(0).toUpperCase();
    const likes=JSON.parse(localStorage.getItem("minhaj_likes")||"[]");
    const comments=JSON.parse(localStorage.getItem("minhaj_comments")||"[]");
    const saves=JSON.parse(localStorage.getItem("minhaj_saves")||"[]");
    document.getElementById("liked-count").textContent=likes.length;
    document.getElementById("comment-count").textContent=comments.filter(c=>c.email===user.email).length;
    document.getElementById("saved-count").textContent=saves.length;
    document.getElementById("dashboard-logout").addEventListener("click",logout);
  }
});