"use client";

import { useState } from "react";
import { experienceVideos, experienceComments } from "@/data/experience";

type MediaView = "videos" | "comentarios";

export function ExperienceMedia() {
  const [activeView, setActiveView] = useState<MediaView>("videos");
  const publishedComments = experienceComments.filter(
    (item) => item.approved && item.consentToPublish
  );

  return (
    <div className="experience-media">
      <div className="wrap">
        <div className="experience-media__heading">
          <div>
            <div className="eyebrow">Historias y experiencias</div>
            <h3 id="experience-media-title">Momentos que <em>inspiran.</em></h3>
          </div>
          <p>Conoce nuestra experiencia a través de videos y comentarios compartidos con autorización.</p>
        </div>

        <div className="experience-media__switch" role="group" aria-label="Contenido de la experiencia">
          <button type="button" aria-pressed={activeView === "videos"} onClick={() => setActiveView("videos")}>
            Videos {experienceVideos.length > 0 && <span>{experienceVideos.length}</span>}
          </button>
          <button type="button" aria-pressed={activeView === "comentarios"} onClick={() => setActiveView("comentarios")}>
            Comentarios {publishedComments.length > 0 && <span>{publishedComments.length}</span>}
          </button>
        </div>

        <div className="experience-media__content" aria-live="polite">
          {activeView === "videos" ? (
            experienceVideos.length ? (
              <div className="experience-media__grid">
                {experienceVideos.map((video) => (
                  <article className="experience-video" key={video.id}>
                    <div className="experience-video__frame">
                      {video.source === "youtube" ? (
                        <iframe
                          src={"https://www.youtube-nocookie.com/embed/" + video.youtubeId}
                          title={video.title}
                          loading="lazy"
                          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <video controls playsInline preload="metadata" poster={video.poster}>
                          <source src={video.src} type={video.mimeType ?? "video/mp4"} />
                          {video.captions && <track kind="captions" src={video.captions} srcLang="es" label="Español" default />}
                          Tu navegador no puede reproducir este video.
                        </video>
                      )}
                    </div>
                    <div className="experience-video__copy">
                      <h4>{video.title}</h4>
                      <p>{video.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="experience-media__empty">
                <div className="experience-media__empty-icon" aria-hidden="true">▷</div>
                <div>
                  <h4>Videos próximamente</h4>
                  <p>Estamos preparando material de la experiencia Equilibria Beauty para compartirlo aquí.</p>
                </div>
              </div>
            )
          ) : (
            publishedComments.length ? (
              <div className="experience-media__grid experience-media__grid--comments">
                {publishedComments.map((comment) => (
                  <figure className="experience-comment" key={comment.id}>
                    <blockquote><p>“{comment.text}”</p></blockquote>
                    <figcaption>
                      <strong>{comment.author}</strong>
                      {comment.context && <span>{comment.context}</span>}
                    </figcaption>
                  </figure>
                ))}
              </div>
            ) : (
              <div className="experience-media__empty">
                <div className="experience-media__empty-icon" aria-hidden="true">❝</div>
                <div>
                  <h4>Comentarios próximamente</h4>
                  <p>Publicaremos experiencias reales cuando tengamos autorización para compartirlas.</p>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
