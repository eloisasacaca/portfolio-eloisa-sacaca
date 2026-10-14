import React, { useState } from "react";
import { Button } from "./Button";
import { usePortfolioMedia } from "../helpers/usePortfolioMedia";
import { safeMediaUrl, youtubeId, isNativeMedia } from "../helpers/mediaPresentation";
import type { MediaRecord } from "../endpoints/portfolio-media_GET.schema";
import styles from "./PortfolioMedia.module.css";

function Featured({ item }: { item: MediaRecord }) {
  return item.isFeatured ? <span className={styles.badge}>Em destaque</span> : null;
}

function VideoCard({ item }: { item: MediaRecord }) {
  const [playing, setPlaying] = useState(false);
  const media = safeMediaUrl(item.mediaUrl);
  const source = safeMediaUrl(item.externalUrl) || media;
  const id = youtubeId(item.mediaUrl);
  const poster = safeMediaUrl(item.posterUrl) || (id ? "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg" : undefined);
  return <article className="video-card">
    <div className="video-player">
      {id ? playing ? <iframe
        src={"https://www.youtube-nocookie.com/embed/" + id + "?autoplay=1&rel=0"}
        title={item.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
        : <Button variant="ghost" className={styles.playButton} onClick={() => setPlaying(true)} aria-label={"Reproduzir " + item.title}>
          <img src={poster} alt="" loading="lazy" />
          <span className="play-icon" aria-hidden="true">▶</span><span className="play-label">ASSISTIR</span>
        </Button>
        : media && isNativeMedia(item.mediaUrl, item.contentType, "video") ? <video className={styles.nativeVideo}
          controls playsInline preload="metadata" poster={poster} aria-label={item.title}><source src={media} type={item.contentType || undefined}/></video>
        : <div className={styles.externalVideo}>{poster && <img src={poster} alt="" loading="lazy"/>}
          {source && <a className={styles.externalLink} href={source} target="_blank" rel="noopener noreferrer">Assistir ao registro ↗</a>}
        </div>}
    </div>
    <div className={styles.meta}>{item.year !== null && <time dateTime={String(item.year)}>{item.year}</time>}<Featured item={item}/></div>
    <h3>{item.title}</h3>
    {item.caption && <p className={styles.caption}>{item.caption}</p>}
    {source && <a className="video-original" href={source} target="_blank" rel="noopener noreferrer">Abrir registro original ↗</a>}
  </article>;
}

export function PortfolioMedia({ className, children }: { className?: string; children?: React.ReactNode }) {
  const { data, isPending, isError, refetch } = usePortfolioMedia();
  if (isPending || isError) return <section className={"wrap archive " + (className || "")} id="acervo" aria-labelledby="archive-title">
    <h2 className="serif" id="archive-title">Memória que se faz presente.</h2>
    <p role={isError ? "alert" : "status"}>{isError ? "O acervo não carregou desta vez. Você pode tentar novamente." : "Carregando fotos, vídeos e composições…"}</p>
    {isError && <Button variant="outline" onClick={() => void refetch()}>Tentar novamente</Button>}
  </section>;
  const photos = data.items.filter(item => item.kind === "photo");
  const videos = data.items.filter(item => item.kind === "video");
  const compositions = data.items.filter(item => item.kind === "composition");
  return <div className={className}>
    <section className="wrap archive" id="acervo" aria-labelledby="archive-title">
      <div className="section-head"><div className="section-title"><p className="eyebrow">04 / Minha trajetória em imagens</p>
        <h2 className="serif" id="archive-title">Memória que se faz presente.</h2></div>
        <a className="link-arrow" href="#composicoes">Minhas composições <span className="arrow" aria-hidden="true">↓</span></a></div>
      <p className="archive-intro">Da infância no Marabaixo aos palcos e encontros: registros organizados do ano mais antigo ao mais recente.</p>
      <div className="photo-grid">{photos.map(item => {
        const media = safeMediaUrl(item.mediaUrl);
        return <figure className="archive-photo" key={item.id}>
          {media && <a href={media} target="_blank" rel="noopener noreferrer" aria-label={"Ver foto: " + item.title + " (abre em nova aba)"}>
            <img src={media} alt={item.title} loading="lazy" decoding="async" width="400" height="300"/></a>}
          <figcaption><div className={styles.meta}>{item.year !== null && <time dateTime={String(item.year)}>{item.year}</time>}<Featured item={item}/></div>
            <h3>{item.title}</h3>{item.caption && item.caption !== item.title && <p className={styles.caption}>{item.caption}</p>}
          </figcaption>
        </figure>;
      })}</div>
      {!photos.length && <p>Novos registros fotográficos em breve.</p>}
    </section>
    <section className={styles.compositionSection} id="composicoes" aria-labelledby="compositions-title"><div className="wrap">
      <div className="section-head"><div className="section-title"><p className="eyebrow">05 / Minhas composições</p>
        <h2 className="serif" id="compositions-title">Palavras que viram canto.</h2></div>
        <p className="section-sub">Canções, memória e tradição no meu acervo cultural.</p></div>
      <div className={styles.compositionGrid}>{compositions.map((item, index) => {
        const media = safeMediaUrl(item.mediaUrl);
        const source = safeMediaUrl(item.externalUrl) || media;
        return <article key={item.id} className={styles.compositionCard + (item.isFeatured ? " " + styles.featured : "")}>
          <div className={styles.trackTop}><span className={styles.trackNumber} aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <div className={styles.meta}>{item.year !== null && <time dateTime={String(item.year)}>{item.year}</time>}<Featured item={item}/></div></div>
          <h3 className="serif">{item.title}</h3><p className={styles.caption}>{item.caption}</p>
          {media && isNativeMedia(item.mediaUrl, item.contentType, "audio") && <audio className={styles.audio} controls preload="none" aria-label={"Ouvir " + item.title}><source src={media} type={item.contentType || undefined}/></audio>}
          {source && <a className={styles.listenLink} href={source} target="_blank" rel="noopener noreferrer"><span aria-hidden="true">♫</span> Ouvir o registro <span aria-hidden="true">↗</span></a>}
        </article>;
      })}</div>
      {!compositions.length && <p>Novas composições em breve.</p>}
    </div></section>
    <section className="videos-section" id="videos" aria-labelledby="videos-title"><div className="wrap">
      <div className="section-head"><div className="section-title"><p className="eyebrow">06 / Para ver e ouvir</p>
        <h2 className="serif" id="videos-title">O ritmo também conta histórias.</h2></div>
        <p className="section-sub">Apresentações e encontros, do primeiro registro aos mais recentes.</p></div>
      <div className="video-grid">{videos.map(item => <VideoCard item={item} key={item.id}/>)}</div>
      {!videos.length && <p>Novos vídeos em breve.</p>}{children}
    </div></section>
  </div>;
}

