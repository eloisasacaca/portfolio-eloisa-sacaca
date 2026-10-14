/* Player do portfólio — exibe somente quando as duas faixas estiverem publicadas. */
(function(){
 const tracks=[{title:'Roda Gira',src:'assets/audio/roda-gira.mp3'},{title:'Marabaixo das Crianças',src:'assets/audio/marabaixo-das-criancas.mp3'}];
 const mount=document.getElementById('music-player');if(!mount)return;
 Promise.all(tracks.map(async t=>{try{const r=await fetch(t.src,{method:'HEAD',cache:'no-store'});return r.ok&&(/audio|octet-stream/i.test(r.headers.get('content-type')||''));}catch(e){return false;}})).then(available=>{
 if(!available.some(Boolean))return;
 const usable=tracks.filter((t,i)=>available[i]);let current=0;
 mount.innerHTML='<div class="music-player-inner"><span class="music-label">TRILHA DO PORTFÓLIO</span><button class="music-play" type="button" aria-label="Reproduzir música">▶</button><div class="music-info"><strong class="music-title"></strong><span class="music-status" aria-live="polite">Clique em Play para ouvir</span></div><select class="music-select" aria-label="Escolher música"></select><label class="music-volume-label">Volume <input class="music-volume" type="range" min="0" max="100" value="65" aria-label="Volume da música"></label></div>';
 const audio=new Audio();audio.preload='none';audio.volume=.65;
 const play=mount.querySelector('.music-play'),title=mount.querySelector('.music-title'),status=mount.querySelector('.music-status'),select=mount.querySelector('.music-select'),volume=mount.querySelector('.music-volume');
 usable.forEach((t,i)=>{const option=document.createElement('option');option.value=String(i);option.textContent=t.title;select.appendChild(option);});
 function setTrack(i){current=i;audio.src=usable[i].src;title.textContent=usable[i].title;select.value=String(i);play.textContent='▶';play.setAttribute('aria-label','Reproduzir música');status.textContent='Clique em Play para ouvir';}
 function update(){const playing=!audio.paused;play.textContent=playing?'❚❚':'▶';play.setAttribute('aria-label',playing?'Pausar música':'Reproduzir música');status.textContent=playing?'Tocando agora':'Pausado';}
 play.addEventListener('click',async()=>{if(!audio.paused){audio.pause();return;}try{await audio.play();}catch(e){status.textContent='Não foi possível reproduzir esta faixa.';}});
 select.addEventListener('change',async()=>{const wasPlaying=!audio.paused;setTrack(Number(select.value));if(wasPlaying){try{await audio.play();}catch(e){status.textContent='Não foi possível reproduzir esta faixa.';}}});
 volume.addEventListener('input',()=>{audio.volume=Number(volume.value)/100;});audio.addEventListener('play',update);audio.addEventListener('pause',update);audio.addEventListener('ended',()=>{setTrack((current+1)%usable.length);});audio.addEventListener('error',()=>{status.textContent='Arquivo de áudio indisponível.';});setTrack(0);mount.hidden=false;
 });
})();
