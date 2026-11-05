"use client";

import { useEffect, useRef, useState, type FormEvent, type PointerEvent as ReactPointerEvent } from "react";
import { BrandMark } from "./BrandMark";
import { treatments, type TreatmentCategory } from "@/data/treatments";
import { beautyContact, institutionalSocials } from "@/data/contact";
import { ExperienceMedia } from "./ExperienceMedia";

const filters: { id: "all" | TreatmentCategory; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "facial", label: "Faciales" },
  { id: "corporal", label: "Corporales" },
];

const faq = [
  {
    question: "¿Cómo puedo elegir un tratamiento?",
    answer: "Cuéntanos qué te gustaría mejorar o cuidar. Nuestro equipo te orientará sobre las opciones disponibles para elegir la más adecuada para ti.",
  },
  {
    question: "¿Cómo solicito una cita?",
    answer: "Completa el formulario y continúa por WhatsApp. Envíanos el mensaje para coordinar tu cita; nuestro equipo confirmará la disponibilidad.",
  },
  {
    question: "¿Dónde se encuentra Equilibria Beauty?",
    answer: "Estamos en La Paz, frente a la plaza Isabel la Católica, en el edificio Torres Mall, Torre B, piso 4, oficina 405.",
  },
  {
    question: "¿Cuáles son los horarios de atención?",
    answer: "Atendemos de lunes a viernes de 09:00 a 19:00. Los sábados, solo con cita previa.",
  },
];

export function BeautyLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("inicio");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const [filter, setFilter] = useState<"all" | TreatmentCategory>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState("");
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const heroPointerFrame = useRef<number | null>(null);

  function moveHeroLight(event: ReactPointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (heroPointerFrame.current !== null) return;
    const currentTarget = event.currentTarget;
    const { clientX, clientY } = event;
    heroPointerFrame.current = window.requestAnimationFrame(() => {
      const rect = currentTarget.getBoundingClientRect();
      const x = Math.min(82, Math.max(18, ((clientX - rect.left) / rect.width) * 100));
      const y = Math.min(82, Math.max(18, ((clientY - rect.top) / rect.height) * 100));
      currentTarget.style.setProperty("--glow-x", `${x.toFixed(1)}%`);
      currentTarget.style.setProperty("--glow-y", `${y.toFixed(1)}%`);
      heroPointerFrame.current = null;
    });
  }

  function resetHeroLight(event: ReactPointerEvent<HTMLElement>) {
    event.currentTarget.style.removeProperty("--glow-x");
    event.currentTarget.style.removeProperty("--glow-y");
  }

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || !("IntersectionObserver" in window)) return;

    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove("reveal-pending");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -35px 0px" });

    elements.forEach((element) => {
      // Already visible content must never flash or be hidden during hydration.
      if (element.getBoundingClientRect().top < window.innerHeight * 0.92) return;
      element.classList.add("reveal-pending");
      observer.observe(element);
    });
    return () => {
      observer.disconnect();
      elements.forEach((element) => element.classList.remove("reveal-pending"));
      if (heroPointerFrame.current !== null) window.cancelAnimationFrame(heroPointerFrame.current);
    };
  }, []);

  useEffect(() => {
    const sectionIds = ["inicio", "tratamientos", "nosotros", "experiencia", "contacto"];
    let frame = 0;

    function updateScrollState() {
      frame = 0;
      const root = document.documentElement;
      const scrollable = Math.max(root.scrollHeight - window.innerHeight, 1);
      setScrollProgress(Math.min(1, window.scrollY / scrollable));
      setIsScrolled(window.scrollY > 12);
      let current = "inicio";
      for (const id of sectionIds) {
        const section = document.getElementById(id);
        if (section && section.getBoundingClientRect().top <= 175) current = id;
      }
      setActiveSection(current);
    }

    function onScroll() {
      if (!frame) frame = window.requestAnimationFrame(updateScrollState);
    }

    updateScrollState();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    function onPointerDown(event: PointerEvent) {
      const target = event.target;
      if (target instanceof Node && !menuRef.current?.contains(target) && !menuButtonRef.current?.contains(target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen]);

  function openAppointment(service = "") {
    triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setSelectedTreatment(service);
    setModalOpen(true);
  }

  function closeAppointment() {
    setModalOpen(false);
  }

  useEffect(() => {
    if (!modalOpen) return;
    document.body.classList.add("modal-locked");
    closeButtonRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setModalOpen(false);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusables = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ));
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.classList.remove("modal-locked");
      triggerRef.current?.focus();
    };
  }, [modalOpen]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const inquiry = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();
    if (!name || !selectedTreatment) return;
    const message = [
      "Hola, quisiera consultar con Equilibria Beauty.",
      `Mi nombre es: ${name}.`,
      `Me interesa: ${selectedTreatment}.`,
      inquiry ? `Consulta: ${inquiry}` : "",
      "¿Podrían indicarme disponibilidad y cómo coordinar una cita?",
    ].filter(Boolean).join("\n");
    const url = `${beautyContact.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
    // WhatsApp opens with a draft: the visitor must choose to send it.
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.click();
  }

  return (
    <>
      <div className="notice notice--family"><span>Estética facial y corporal · Equilibria Beauty</span><a href="https://www.equilibria.cloud/" target="_blank" rel="noopener noreferrer" aria-label="Conocer la web institucional de Equilibria (se abre en otra pestaña)">Conoce Equilibria <span aria-hidden="true">↗</span></a></div>
      <header className={`header${isScrolled ? " header--scrolled" : ""}`}>
        <div className="scroll-progress" aria-hidden="true" style={{ transform: `scaleX(${scrollProgress})` }} />
        <div className="wrap nav-shell">
          <BrandMark placement="navbar" onActivate={() => setMenuOpen(false)} />
          <nav className={`nav-links${menuOpen ? " open" : ""}`} id="navigation" aria-label="Navegación principal" ref={menuRef}>
            {[
              ["#inicio", "Inicio"], ["#tratamientos", "Tratamientos"],
              ["#nosotros", "Nosotros"], ["#experiencia", "Experiencia"], ["#contacto", "Contacto"],
            ].map(([url, label]) => <a key={url} href={url} aria-current={activeSection === url.slice(1) ? "location" : undefined} onClick={() => setMenuOpen(false)}>{label}</a>)}
          </nav>
          <div className="nav-actions">
            <button className="btn btn-gold" type="button" onClick={() => openAppointment()}>◷ &nbsp; Consultar</button>
            <button className="menu-button" type="button" aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen} aria-controls="navigation" ref={menuButtonRef} onClick={() => setMenuOpen(v => !v)}>
              {menuOpen ? "×" : "☰"}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero" id="inicio" aria-labelledby="hero-title" onPointerMove={moveHeroLight} onPointerLeave={resetHeroLight}>
          <div className="hero-copy">
            <span className="hero-glow" aria-hidden="true" />
            <div className="eyebrow light"><span className="tiny-rule" />Estética facial &amp; corporal</div>
            <h1 id="hero-title">Belleza en <em>equilibrio.</em></h1>
            <div className="rule" />
            <p className="hero-p">Tratamientos estéticos enfocados en el cuidado de la piel, la imagen personal y una atención hecha a tu medida.</p>
            <div className="hero-buttons">
              <button className="btn btn-gold" type="button" onClick={() => openAppointment()}>◷ &nbsp; Solicitar cita</button>
              <a className="btn btn-outline" href="#tratamientos">Ver tratamientos <span className="arrow">↗</span></a>
            </div>
            <div className="hero-details"><span>Estética facial</span><span className="dot" /><span>Estética corporal</span><span className="dot" /><span>Cuidado de la piel</span></div>
          </div>
          <div className="hero-photo">
            {/* Imagen propia de la maqueta, sin recursos externos */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/hero-beauty.jpg" alt="Retrato editorial de estética facial y cuidado de la piel" fetchPriority="high" />
            <div className="hero-photo-credit">Equilibria Beauty<br />Tu belleza, tu esencia</div>
          </div>
        </section>

        <div className="ribbon"><div className="wrap"><span>Estética facial</span><i className="mark" /><span>Estética corporal</span><i className="mark" /><span>Cuidado personalizado</span><i className="mark" /><span>Belleza natural</span></div></div>

        <section className="services" id="tratamientos" aria-labelledby="services-title">
          <div className="wrap">
            <div className="section-head" data-reveal>
              <div className="eyebrow">Tratamientos destacados</div>
              <h2 className="section-title" id="services-title">El arte de <em>cuidarte.</em></h2>
              <p className="section-desc">Explora propuestas de estética facial y corporal. Los procedimientos presentados son ejemplos sujetos a la definición del catálogo oficial.</p>
            </div>
            <div className="filter-row" role="group" aria-label="Filtrar tratamientos" data-reveal>
              {filters.map(item => <button type="button" key={item.id} className="filter" aria-pressed={filter === item.id} onClick={() => setFilter(item.id)}>{item.label}</button>)}
            </div>
            <p className="filter-feedback" aria-live="polite" aria-atomic="true">
              {filter === "all" ? "Todos los tratamientos" : filter === "facial" ? "Tratamientos faciales" : "Tratamientos corporales"} · {treatments.filter(t => filter === "all" || t.category === filter).length} opciones
            </p>
            <div className="service-grid">
              {treatments.map(t => (
                <article className="service-card" key={t.id} hidden={filter !== "all" && t.category !== filter}>
                  <div className="service-image">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={t.image} alt={t.imageAlt} loading="lazy" />
                    <span className="card-tag">{t.tag}</span>
                  </div>
                  <div className="service-info">
                    <div className="service-num">{t.number}</div>
                    <h3>{t.title}</h3>
                    <p>{t.description}</p>
                    <button className="service-link" type="button" onClick={() => openAppointment(t.title)}>
                      Consultar tratamiento <span className="arrow">↗</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="brand-section" id="nosotros" aria-labelledby="brand-title">
          <div className="brand-layout">
            <div className="brand-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/beauty-studio.webp" alt="Concepto de identidad de Equilibria Beauty en letras doradas sobre madera" loading="lazy" />
            </div>
            <div className="brand-story" data-reveal>
              <div className="eyebrow">Nuestra esencia</div>
              <h2 className="section-title" id="brand-title">Más que estética.<br /><em>Una experiencia.</em></h2>
              <p className="section-desc">Equilibria Beauty se enfoca en el cuidado estético facial y corporal, con una experiencia personalizada que comienza por conocer tus necesidades y objetivos.</p>
              <div className="principles">
                <div className="principle"><span>01</span><div><b>Conocer tus objetivos</b><small>Comprender las necesidades de tu piel y tus expectativas estéticas.</small></div></div>
                <div className="principle"><span>02</span><div><b>Seleccionar con criterio</b><small>Proponer alternativas acordes a cada caso, sin soluciones universales.</small></div></div>
                <div className="principle"><span>03</span><div><b>Cuidar cada detalle</b><small>Una atención clara, ordenada y enfocada en tu experiencia.</small></div></div>
              </div>
            </div>
          </div>
        </section>

        <section className="experience experience--media-only" id="experiencia" aria-label="La experiencia Equilibria Beauty">
          <ExperienceMedia />
        </section>

        <section className="manifesto" aria-label="Filosofía de marca">
          <div className="wrap" data-reveal><div className="eyebrow">El espíritu de Equilibria Beauty</div>
            <p className="quote">“La belleza no consiste en transformarte en otra persona, sino en <em>destacar lo mejor de ti.</em>”</p>
            <p>Estética · Precisión · Belleza</p>
          </div>
        </section>

        <section className="family-section" aria-labelledby="family-title">
          <div className="wrap">
            <div className="institutional-hero">
              <div className="institutional-hero__copy" data-reveal>
                <span className="institutional-hero__kicker"><span className="institutional-hero__kicker-rule" /> Una marca, distintas formas de cuidarte</span>
                <h2 id="family-title">Conoce <em>Equilibria.</em></h2>
                <p className="institutional-hero__lead">Beauty es parte de una visión más amplia del cuidado y el bienestar.</p>
                <p className="institutional-hero__description">
                  En la página institucional de Equilibria descubrirás sus servicios de fisioterapia,
                  kinesiología y bienestar, además de su equipo profesional y tecnología.
                </p>
                <a
                  className="institutional-hero__cta"
                  href="https://www.equilibria.cloud/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visitar la página institucional de Equilibria en una nueva pestaña"
                >
                  Visitar la página de Equilibria <span aria-hidden="true">↗</span>
                </a>
                <span className="institutional-hero__domain">www.equilibria.cloud</span>
              </div>

              <a
                className="institutional-hero__visual"
                href="https://www.equilibria.cloud/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Explorar la página institucional Equilibria: fisioterapia, kinesiología y bienestar"
              >
                <span className="institutional-hero__ambient" aria-hidden="true" />
                <span className="institutional-hero__visual-top">CENTRO EQUILIBRIA <span aria-hidden="true">↗</span></span>
                <span className="institutional-hero__visual-center">
                  <span className="institutional-hero__orbit" aria-hidden="true"><span /></span>
                  <strong>Equilibria</strong>
                  <span className="institutional-hero__tagline">Bienestar a tu alcance</span>
                </span>
                <span className="institutional-hero__visual-bottom">
                  <span>FISIOTERAPIA <span aria-hidden="true">·</span> KINESIOLOGÍA <span aria-hidden="true">·</span> BIENESTAR</span>
                  <span className="institutional-hero__visual-action">Conocer el centro <span aria-hidden="true">↗</span></span>
                </span>
              </a>
            </div>
          </div>
        </section>

        <section className="faq" aria-labelledby="faq-title"><div className="wrap faq-layout">
          <div data-reveal><div className="eyebrow">Antes de conocernos</div><h2 className="section-title" id="faq-title">Preguntas <em>frecuentes.</em></h2><p className="section-desc">Un primer espacio para resolver dudas antes de solicitar información.</p></div>
          <div className="accordion" data-reveal>{faq.map(item => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p></details>)}</div>
        </div></section>

        <section className="contact-banner" id="contacto" aria-labelledby="contact-title">
          <div className="contact-visual">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/beauty-identity.webp" alt="Concepto de Equilibria Beauty, logotipo dorado sobre una pared de tonos marfil" loading="lazy" />
          </div>
          <div className="contact-text contact-text--live" data-reveal>
            <div className="eyebrow light">Estamos para atenderte</div>
            <h2 className="section-title" id="contact-title">Tu <em>Glow up</em> está con nosotros.</h2>
            <p>Consulta sobre estética facial y corporal por el WhatsApp de Equilibria. El equipo te ayudará a coordinar una cita.</p>
            <div className="contact-facts">
              <div className="contact-fact">
                <span className="contact-fact__label">Encuéntranos en La Paz</span>
                <address>{beautyContact.location}<span>{beautyContact.address}</span></address>
                <a href={beautyContact.directionsUrl} target="_blank" rel="noopener noreferrer">Cómo llegar <span aria-hidden="true">↗</span></a>
              </div>
              <div className="contact-fact">
                <span className="contact-fact__label">Contacto</span>
                <a className="contact-fact__phone" href={beautyContact.telUrl}>{beautyContact.phoneDisplay}</a>
                <span className="contact-fact__label contact-fact__label--hours">Horarios de atención</span>
                <span>{beautyContact.weekdays}</span>
                <span>{beautyContact.saturday}</span>
              </div>
            </div>
            <div className="contact-actions">
              <button className="btn btn-gold" type="button" onClick={() => openAppointment()}>Preparar consulta por WhatsApp <span className="arrow">↗</span></button>
              <a className="contact-direct" href={beautyContact.whatsappBaseUrl} target="_blank" rel="noopener noreferrer">Abrir WhatsApp directamente</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer footer--beauty" aria-label="Información de Equilibria Beauty">
        <div className="wrap">
          <div className="footer-grid footer-grid--structured">
            <div className="footer-intro footer-intro--beauty">
              <BrandMark placement="footer" />
              <p>Estética facial y corporal con una experiencia personalizada, cuidada en cada detalle.</p>
              <span className="footer-specialty">BELLEZA · PRECISIÓN · CUIDADO</span>
              <nav className="footer-socials" aria-label="Redes sociales de Equilibria">
                <h2 className="footer-socials__title">Síguenos en Equilibria</h2>
                <div className="footer-socials__links">
                  {institutionalSocials.map((social) => (
                    <a key={social.id} href={social.href} target="_blank" rel="noopener noreferrer">
                      {social.label}<span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              </nav>
            </div>

            <nav className="footer-col footer-nav" aria-label="Explorar Equilibria Beauty">
              <h2 className="footer-heading">Explorar</h2>
              <a href="#tratamientos">Tratamientos <span aria-hidden="true">→</span></a>
              <a href="#nosotros">Nuestra esencia <span aria-hidden="true">→</span></a>
              <a href="#experiencia">La experiencia <span aria-hidden="true">→</span></a>
              <a href="#faq-title">Preguntas frecuentes <span aria-hidden="true">→</span></a>
              <a href="https://www.equilibria.cloud/" target="_blank" rel="noopener noreferrer">Equilibria institucional <span aria-hidden="true">↗</span></a>
            </nav>

            <section className="footer-col footer-location" aria-labelledby="footer-location-title">
              <h2 className="footer-heading" id="footer-location-title">Dónde estamos</h2>
              <address className="footer-address">
                <span className="footer-address__place">Torres Mall · La Paz</span>
                <span>{beautyContact.location}</span>
                <span>{beautyContact.address}</span>
              </address>
              <a className="footer-map-action" href={beautyContact.directionsUrl} target="_blank" rel="noopener noreferrer">
                Ver ubicación <span aria-hidden="true">↗</span>
              </a>
            </section>

            <section className="footer-col footer-hours" aria-labelledby="footer-hours-title">
              <h2 className="footer-heading" id="footer-hours-title">Horarios</h2>
              <div className="footer-hours__details">
                <p>{beautyContact.weekdays}</p>
                <p>{beautyContact.saturday}</p>
              </div>
            </section>
          </div>

          <div className="footer-contact-strip">
            <div className="footer-contact-strip__copy">
              <span>ATENCIÓN PERSONALIZADA</span>
              <p>¿Tienes una consulta? Estamos para ayudarte a coordinar tu cita.</p>
            </div>
            <div className="footer-contact-strip__actions">
              <a className="footer-action footer-action--primary" href={beautyContact.whatsappBaseUrl} target="_blank" rel="noopener noreferrer">
                Consultar por WhatsApp <span aria-hidden="true">↗</span>
              </a>
              <a className="footer-action footer-action--secondary" href={beautyContact.telUrl}>
                Llamar <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 Equilibria Beauty · Parte de Equilibria.</span>
            <span>Servicios e imágenes ilustrativos. Las citas se confirman por WhatsApp.</span>
          </div>
        </div>
      </footer>

      <div className={`modal${modalOpen ? " open" : ""}`} aria-hidden={!modalOpen} onMouseDown={event => { if (event.target === event.currentTarget) closeAppointment(); }}>
        {modalOpen && (
          <div className="dialog" role="dialog" aria-modal="true" aria-labelledby="modal-heading" ref={dialogRef}>
            <button className="close" type="button" aria-label="Cerrar ventana" onClick={closeAppointment} ref={closeButtonRef}>×</button>
            <div className="eyebrow">Equilibria Beauty</div>
            <h2 id="modal-heading">Coordina tu cita.</h2>
            <p>Cuéntanos qué necesitas y continúa en WhatsApp para coordinar tu cita con el equipo de Equilibria.</p>
            <form onSubmit={handleSubmit}>
              <div className="field"><label htmlFor="full-name">Nombre</label><input id="full-name" name="name" type="text" required maxLength={80} autoComplete="name" placeholder="Tu nombre" /></div>
              <div className="field"><label htmlFor="interest">Tratamiento o motivo de consulta (orientativo)</label><select id="interest" required value={selectedTreatment} onChange={event => setSelectedTreatment(event.target.value)}>
                <option value="">Selecciona una opción</option>
                {treatments.map(t => <option key={t.id} value={t.title}>{t.title}</option>)}
                <option value="Consulta general de estética">Consulta general de estética</option>
              </select></div>
              <div className="field"><label htmlFor="message">¿Qué te gustaría consultar? (opcional)</label><textarea id="message" name="message" rows={3} placeholder="Cuéntanos brevemente qué buscas" /></div>
              <button className="btn btn-dark" type="submit">Continuar en WhatsApp <span className="arrow">↗</span></button>
              <div className="preview-alert">WhatsApp abrirá un mensaje preparado para {beautyContact.phoneDisplay}. Al enviarlo, nuestro equipo podrá confirmar tu cita.</div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
