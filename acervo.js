
(function(){
"use strict";
const escapeHTML=value=>String(value??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
function safeURL(value){
 if(typeof value!=="string"||!value)return "";
 try{const url=new URL(value,document.baseURI);if(url.protocol==="https:"||((url.protocol==="http:"||url.protocol==="file:")&&url.origin===location.origin))return url.href;}catch(e){}
 return "";
}
function youtube(value){
 try{
  const url=new URL(value);
  const id=url.hostname==="youtu.be"?url.pathname.slice(1):["youtube.com","www.youtube.com","m.youtube.com","www.youtube-nocookie.com"].includes(url.hostname)?url.searchParams.get("v")||url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1]:"";
  return /^[A-Za-z0-9_-]{11}$/.test(id||"")?id:"";
 }catch(e){return "";}
}
function nativeMedia(item,kind){return item.contentType?.startsWith(kind+"/")||(kind==="audio"?/\.(mp3|m4a|ogg|wav|aac|flac)(?:[?#]|$)/i:/\.(mp4|webm|mov|m4v|ogv)(?:[?#]|$)/i).test(item.mediaUrl);}
function meta(item){
 return '<div class="pm-meta">'+(item.year!==null?'<time datetime="'+item.year+'">'+item.year+'</time>':'')+(item.isFeatured?'<span class="pm-badge">Em destaque</span>':'')+'</div>';
}
function link(url,label,cls){
 const safe=safeURL(url);return safe?'<a class="'+cls+'" href="'+escapeHTML(safe)+'" target="_blank" rel="noopener noreferrer">'+label+'</a>':"";
}
function renderPhoto(item){
 const src=safeURL(item.mediaUrl),title=escapeHTML(item.title);
 return '<figure class="archive-photo">'+link(src,'<img src="'+escapeHTML(src)+'" alt="'+title+'" loading="lazy" decoding="async" width="400" height="300"/>',"photo-original")+'<figcaption>'+meta(item)+'<h3>'+title+'</h3>'+(item.caption&&item.caption!==item.title?'<p class="pm-caption">'+escapeHTML(item.caption)+'</p>':'')+'</figcaption></figure>';
}
function renderComposition(item,index){
 const media=safeURL(item.mediaUrl),source=safeURL(item.externalUrl)||media;
 const driveMatch=media.match(/^https:\/\/drive\.google\.com\/file\/d\/([A-Za-z0-9_-]+)\//);
 const driveId=driveMatch?driveMatch[1]:"";
 const player=media&&nativeMedia(item,"audio")?'<audio class="pm-audio" controls preload="none" aria-label="Ouvir '+escapeHTML(item.title)+'"><source src="'+escapeHTML(media)+'"'+(item.contentType?' type="'+escapeHTML(item.contentType)+'"':'')+'></audio>':driveId?'<button class="pm-playDrive" type="button" data-drive-id="'+escapeHTML(driveId)+'" data-title="'+escapeHTML(item.title)+'" aria-label="Reproduzir '+escapeHTML(item.title)+'"><span aria-hidden="true">▶</span> Reproduzir música</button><div class="pm-driveMount"></div>':'';
 return '<article class="pm-compositionCard'+(item.isFeatured?' pm-featured':'')+'"><div class="pm-trackTop"><span class="pm-trackNumber" aria-hidden="true">'+String(index+1).padStart(2,"0")+'</span>'+meta(item)+'</div><h3 class="serif">'+escapeHTML(item.title)+'</h3><p class="pm-caption">'+escapeHTML(item.caption)+'</p>'+player+link(source,'<span aria-hidden="true">♫</span> Ouvir o registro no Google Drive <span aria-hidden="true">↗</span>',"pm-listenLink")+'</article>';
}
document.addEventListener("click",async function(event){
 const button=event.target.closest(".pm-playDrive");if(!button)return;
 const card=button.closest(".pm-compositionCard"),mount=card&&card.querySelector(".pm-driveMount");
 if(!mount)return;
 const existing=mount.querySelector("audio,iframe");
 if(existing){if(existing.tagName==="AUDIO"&&!existing.paused){existing.pause();button.textContent="▶ Reproduzir música";return;}if(existing.tagName==="AUDIO"){try{await existing.play();button.textContent="❚❚ Pausar música";return;}catch(e){}}mount.replaceChildren();button.textContent="▶ Reproduzir música";return;}
 document.querySelectorAll(".pm-driveMount").forEach(m=>{m.querySelector("audio")?.pause();m.replaceChildren();});
 document.querySelectorAll(".pm-playDrive").forEach(b=>b.textContent="▶ Reproduzir música");
 const id=encodeURIComponent(button.dataset.driveId);
 const audio=document.createElement("audio");audio.controls=true;audio.preload="auto";audio.className="pm-audio";audio.src="https://drive.google.com/uc?export=download&id="+id;
 mount.appendChild(audio);button.textContent="Carregando música…";
 let fallbackShown=false;
 const fallback=()=>{if(fallbackShown)return;fallbackShown=true;audio.pause();audio.remove();const iframe=document.createElement("iframe");iframe.src="https://drive.google.com/file/d/"+id+"/preview?autoplay=1";iframe.title="Player de "+button.dataset.title;iframe.loading="eager";iframe.allow="autoplay";iframe.setAttribute("referrerpolicy","strict-origin-when-cross-origin");mount.appendChild(iframe);button.textContent="Fechar player (Google Drive)";};
 audio.addEventListener("error",fallback,{once:true});
 audio.addEventListener("playing",()=>{button.textContent="❚❚ Pausar música";});
 audio.addEventListener("pause",()=>{if(!fallbackShown)button.textContent="▶ Reproduzir música";});
 try{await audio.play();}catch(e){fallback();}
});

function renderVideo(item){
 const media=safeURL(item.mediaUrl),source=safeURL(item.externalUrl)||media,id=youtube(item.mediaUrl),poster=safeURL(item.posterUrl)||(id?'https://i.ytimg.com/vi/'+id+'/hqdefault.jpg':'');
 const player=id?'<button class="video-load" type="button" data-video="'+id+'" data-title="'+escapeHTML(item.title)+'" aria-label="Reproduzir '+escapeHTML(item.title)+'"><img src="'+escapeHTML(poster)+'" alt="" loading="lazy"/><span class="play-icon" aria-hidden="true">▶</span><span class="play-label">ASSISTIR</span></button>':media&&nativeMedia(item,"video")?'<video class="pm-nativeVideo" controls playsinline preload="metadata" aria-label="'+escapeHTML(item.title)+'"'+(poster?' poster="'+escapeHTML(poster)+'"':'')+'><source src="'+escapeHTML(media)+'"'+(item.contentType?' type="'+escapeHTML(item.contentType)+'"':'')+'></video>':'<div class="pm-externalVideo">'+(poster?'<img src="'+escapeHTML(poster)+'" alt="" loading="lazy"/>':'')+link(source,"Assistir ao registro ↗","pm-externalLink")+'</div>';
 return '<article class="video-card"><div class="video-player">'+player+'</div>'+meta(item)+'<h3>'+escapeHTML(item.title)+'</h3><p class="pm-caption">'+escapeHTML(item.caption)+'</p>'+link(source,"Abrir registro original ↗","video-original")+'</article>';
}
async function loadMedia(){
 const status=document.getElementById("media-status"),retry=document.getElementById("media-retry");
 status.hidden=false;status.textContent="Carregando o acervo…";retry.hidden=true;
 try{
  const response=await fetch(new URL("acervo.json",document.baseURI),{cache:"no-cache"});if(!response.ok)throw Error("Catalog failed");
  const catalog=await response.json();if(!Array.isArray(catalog.items))throw Error("Invalid catalog");
  const items=catalog.items;
  if(items.some(x=>!x.id||!["photo","video","composition"].includes(x.kind)||typeof x.title!=="string"||typeof x.caption!=="string"||typeof x.mediaUrl!=="string"||(x.year!==null&&(!Number.isInteger(x.year)||x.year<1900||x.year>2100))))throw Error("Invalid record");
  items.sort((a,b)=>(a.year??Infinity)-(b.year??Infinity)||(a.sortOrder??0)-(b.sortOrder??0)||String(a.id).localeCompare(String(b.id)));
  for(const [kind,id,render] of [["photo","photo-grid",renderPhoto],["composition","composition-grid",renderComposition],["video","video-grid",renderVideo]]){
   const subset=items.filter(x=>x.kind===kind);document.getElementById(id).innerHTML=subset.length?subset.map(render).join(""):"<p>Novos registros em breve.</p>";
  }
  status.hidden=true;
 }catch(e){status.textContent="Não foi possível carregar o acervo. Tente novamente.";retry.hidden=false;}
}
document.getElementById("media-retry").addEventListener("click",loadMedia);
document.addEventListener("click",function(event){
 const button=event.target.closest?.("[data-video]");if(!button)return;
 const id=button.dataset.video;if(!/^[A-Za-z0-9_-]{11}$/.test(id))return;
 const frame=document.createElement("iframe");frame.src="https://www.youtube-nocookie.com/embed/"+id+"?autoplay=1&rel=0";frame.title=button.dataset.title||"Vídeo cultural";
 frame.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";frame.allowFullscreen=true;frame.referrerPolicy="strict-origin-when-cross-origin";button.parentElement.replaceChildren(frame);frame.focus();
});
loadMedia();
})();
