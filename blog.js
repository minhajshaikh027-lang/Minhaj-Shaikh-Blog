const posts=[
 {id:1,category:"College",date:"September 21, 2026",title:"A Day on Campus: More Than Just Lectures",excerpt:"College is not only about attendance and assignments. Sometimes the best memories happen between the timetable.",image:"images/day-on-campus.jpg",body:["There is something special about walking into college knowing that every ordinary day can turn into a memory. Between lectures, friends, events and those random conversations, campus life keeps moving.","As a CSE AI/ML student, most days involve a mix of theory, practical work and problem solving. But the moments outside the classroom are just as important.","I started this blog because I wanted a place to keep those moments — not just as photographs, but as stories I can return to later."]},
 {id:2,category:"Vlogging",date:"September 18, 2026",title:"Why I Started Documenting My College Life",excerpt:"From daily college clips to full vlog episodes — here is what made me pick up the camera.",image:"https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?auto=format&fit=crop&w=1000&q=85",body:["I did not start vlogging because every day was extraordinary. I started because ordinary days are worth remembering too.","A camera changed the way I look at small moments — a college event, a train passing by, a funny conversation with a friend or even a simple cup of tea.","The goal is not perfection. The goal is to tell the story honestly and keep improving with every video."]},
 {id:3,category:"Technology",date:"September 12, 2026",title:"Learning Web Development as an AI/ML Student",excerpt:"Why HTML, CSS and JavaScript are still some of the most useful tools in my college journey.",image:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1000&q=85",body:["Studying AI/ML does not mean ignoring the fundamentals of web development. In fact, building interfaces helps turn technical ideas into something people can actually use.","HTML gives structure, CSS creates the visual experience and JavaScript brings interaction to life. Together they are a great foundation for bigger projects.","This blogging website itself is part of that learning process — a practical project where concepts become something real."]},
 {id:4,category:"Gaming",date:"September 05, 2026",title:"Starting My Gaming Series on Xbox",excerpt:"A new series begins with Assassin’s Creed Brotherhood and a lot of nostalgia.",image:"https://images.unsplash.com/photo-1605901309584-818e25960a8f?auto=format&fit=crop&w=1000&q=85",body:["Gaming has always been a fun way to switch off after a long day of classes and assignments. Recently I decided to turn that hobby into another content series.","The first game in the series is Assassin’s Creed Brotherhood on Xbox — a game that combines exploration, story and classic action.","The plan is simple: play, have fun, capture the best moments and share the journey."]},
 {id:5,category:"Life",date:"August 30, 2026",title:"Day 29: When a Viewer Became Part of the Vlog",excerpt:"Day 29 turned into a memorable vlog when one of my viewers became part of the day — a simple moment that made the journey feel more real.",image:"images/day-29-vlog.jpg",body:["Day 29 was one of those vlogs that reminded me why I enjoy documenting everyday life. What started as a normal day became more memorable when one of my viewers became part of the vlog.","It was not a challenge or something planned for the camera. It was simply a genuine moment from the day, and that is exactly what made it worth keeping in the vlog.","Moments like this make the creator journey feel more personal. Every vlog is not about doing something huge — sometimes the best part is meeting people who actually watch and support what you create."]},
 {id:6,category:"College",date:"August 25, 2026",title:"Ignite 2K26: College Energy After Sunset",excerpt:"Events, friends, music and the kind of campus atmosphere you remember long after the event ends.",image:"images/ignite-dj-party.jpg",gallery:["images/ignite-event.jpg","images/ignite-dj-party.jpg"],body:["Ignite 2K26 was one of those college events that felt completely different once the evening arrived.","After spending the day exploring the event, the DJ party brought a completely different energy. Music, lights, friends and a campus full of excitement made it memorable.","These are exactly the moments I want this blog to preserve."]},
];

function card(post){
 return `<article class="post-card">
   <a class="post-card-img" href="post.html?id=${post.id}"><img src="${post.image}" alt="${post.title}"></a>
   <div class="post-card-body"><div class="meta"><span class="tag">${post.category}</span><span>•</span><span>${post.date}</span></div>
   <h3><a href="post.html?id=${post.id}">${post.title}</a></h3><p>${post.excerpt}</p>
   <a class="read-more" href="post.html?id=${post.id}">Read story →</a></div>
 </article>`;
}
function renderPosts(list,target){const el=document.getElementById(target);if(el)el.innerHTML=list.map(card).join("")}
function initBlog(){
 const featured=document.getElementById("featured-posts"); if(featured)renderPosts(posts.slice(0,3),"featured-posts");
 const all=document.getElementById("all-posts");
 if(all){
   let active=new URLSearchParams(location.search).get("category")||"All";
   const search=document.getElementById("search-input");
   const filters=document.querySelectorAll(".filter");
   filters.forEach(f=>{f.classList.toggle("active",f.dataset.category===active);f.addEventListener("click",()=>{active=f.dataset.category;filters.forEach(x=>x.classList.toggle("active",x===f));update()})});
   search.addEventListener("input",update);
   function update(){
     const q=search.value.toLowerCase();
     const list=posts.filter(p=>(active==="All"||p.category===active)&&(p.title+" "+p.excerpt+" "+p.category).toLowerCase().includes(q));
     renderPosts(list,"all-posts");document.getElementById("no-results").classList.toggle("hidden",list.length>0);
   }
   update();
 }
 const detail=document.getElementById("post-detail");
 if(detail){
   const id=Number(new URLSearchParams(location.search).get("id")||1);const post=posts.find(p=>p.id===id)||posts[0];
   detail.innerHTML=`<div class="meta"><span class="tag">${post.category}</span><span>•</span><span>${post.date}</span></div>
   <h1 class="page-title" style="padding-bottom:10px">${post.title}</h1>
   <p class="lead">${post.excerpt}</p>
   <img class="post-hero-img" src="${post.image}" alt="${post.title}">
   <div class="post-actions"><button id="like-btn" class="like-btn">♡ Like <span id="like-count">0</span></button><button id="save-btn" class="save-btn">🔖 Save</button></div>
   <div class="article-body">${post.body.map((p,i)=>i===1?`<h2>A thought from the journey</h2><p>${p}</p>`:`<p>${p}</p>`).join("")}</div>\n   ${post.gallery ? `<div class="event-gallery"><h2>IGNITE 2K26 Gallery</h2><div>${post.gallery.map((img,i)=>`<img src="${img}" alt="IGNITE 2K26 event photo ${i+1}">`).join("")}</div></div>` : ""}`;
   setupInteractions(post);
 }
}
function setupInteractions(post){
 let likes=JSON.parse(localStorage.getItem("minhaj_likes")||"[]");
 let saves=JSON.parse(localStorage.getItem("minhaj_saves")||"[]");
 const like=document.getElementById("like-btn"),save=document.getElementById("save-btn");
 document.getElementById("like-count").textContent=likes.includes(post.id)?"1":"0";
 if(likes.includes(post.id))like.classList.add("liked");
 like.onclick=()=>{
   if(!requireLogin())return;
   likes=JSON.parse(localStorage.getItem("minhaj_likes")||"[]");
   if(likes.includes(post.id))likes=likes.filter(x=>x!==post.id);else likes.push(post.id);
   localStorage.setItem("minhaj_likes",JSON.stringify(likes));like.classList.toggle("liked",likes.includes(post.id));document.getElementById("like-count").textContent=likes.includes(post.id)?"1":"0";
 };
 save.onclick=()=>{
   if(!requireLogin())return;
   saves=JSON.parse(localStorage.getItem("minhaj_saves")||"[]");
   if(saves.includes(post.id))saves=saves.filter(x=>x!==post.id);else saves.push(post.id);
   localStorage.setItem("minhaj_saves",JSON.stringify(saves));save.textContent=saves.includes(post.id)?"✓ Saved":"🔖 Save";
 };
 const form=document.getElementById("comment-form"),list=document.getElementById("comment-list");
 function renderComments(){
   const comments=JSON.parse(localStorage.getItem("minhaj_comments")||"[]").filter(c=>c.postId===post.id);
   list.innerHTML=comments.length?comments.map(c=>`<div class="comment"><strong>${escapeHTML(c.name)}</strong><small>${escapeHTML(c.date)}</small><p>${escapeHTML(c.text)}</p></div>`).join(""):`<div class="empty-state"><p>No comments yet. Be the first to share your thoughts.</p></div>`;
 }
 renderComments();
 form?.addEventListener("submit",e=>{
   e.preventDefault();if(!requireLogin())return;
   const user=getUser();const text=document.getElementById("comment-text").value.trim();if(!text)return;
   const comments=JSON.parse(localStorage.getItem("minhaj_comments")||"[]");
   comments.push({postId:post.id,name:user.name,email:user.email,text,date:new Date().toLocaleDateString("en-IN")});
   localStorage.setItem("minhaj_comments",JSON.stringify(comments));document.getElementById("comment-text").value="";renderComments();
 });
}
document.addEventListener("DOMContentLoaded",initBlog);