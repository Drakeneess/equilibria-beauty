"use client";

import { useEffect, useRef, useState, type FormEvent, type PointerEvent as ReactPointerEvent } from "react";
import { BrandMark } from "./BrandMark";
import { treatments, type TreatmentCategory } from "@/data/treatments";

const filters: { id: "all" | TreatmentCategory; label: string }[] = [
  { id: "all", label: "Todos" },
  { id: "facial", label: "Faciales" },
  { id: "corporal", label: "Corporales" },
];

const beautyValues = [
  {
    title: "Precisión",
    number: "01",
    intro: "Cada decisión comienza por comprender el objetivo.",
    detail: "En Equilibria Beauty, la valoración y la información clara orientan el cuidado facial y corporal. Los tratamientos concretos se comunicarán cuando el catálogo oficial esté confirmado.",
  },
  {
    title: "Personalización",
    number: "02",
    intro: "El mismo tratamiento no tiene por qué ser para todos.",
    detail: "Buscamos una experiencia estética que atienda tus necesidades, expectativas y preferencias, sin prometer resultados universales ni sustituir una evaluación profesional.",
  },
  {
    title: "Confianza",
    number: "03",
    intro: "La experiencia debe sentirse clara de principio a fin.",
    detail: "Apostamos por comunicación sencilla, una atención cuidada y expectativas realistas. Esta página es una presentación conceptual hasta confirmar servicios y datos comerciales.",
  },
];

const faq = [
  {
    question: "¿Cómo puedo elegir un tratamiento?",
    answer: "La valoración inicial permite conversar sobre tus objetivos y conocer tu piel. El catálogo de procedimientos específicos se incorporará una vez confirmado.",
  },
  {
    question: "¿Cómo realizo una reserva?",
    answer: "En esta maqueta, el formulario de reserva es demostrativo. No envía información. La agenda real se podrá conectar a WhatsApp, un calendario o un sistema de reservas.",
  },
  {
    question: "¿Dónde se encuentra Equilibria Beauty?",
    answer: "La ubicación y los horarios oficiales se incorporarán cuando estén disponibles. No se han colocado datos ficticios.",
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
  const [expandedValue, setExpandedValue] = useState<number | null>(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState("");
  const [submittedName, setSubmittedName] = useState("");
  const [submittedTreatment, setSubmittedTreatment] = useState("");
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
    setSubmittedName("");
    setSubmittedTreatment("");
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
    if (!name || !selectedTreatment) return;
    setSubmittedName(name);
    setSubmittedTreatment(selectedTreatment);
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
            <button className="btn btn-gold" type="button" onClick={() => openAppointment()}>◷ &nbsp; Reservar</button>
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
              <button className="btn btn-gold" type="button" onClick={() => openAppointment()}>◷ &nbsp; Reserva tu valoración</button>
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

        <section className="experience" id="experiencia" aria-labelledby="exp-title">
          <div className="wrap experience-layout">
            <div className="experience-visual">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/face-application.webp" alt="Aplicación de producto cosmético en un tratamiento estético facial" loading="lazy" />
            </div>
            <div className="experience-details" data-reveal>
              <div className="eyebrow">La experiencia Equilibria Beauty</div>
              <h2 className="section-title" id="exp-title">Estética con <em>propósito.</em></h2>
              <p>El cuidado comienza con una valoración: conocer tu piel, identificar tus objetivos y elegir el enfoque estético más adecuado.</p>
              <div className="feature-grid">
                <div className="feature"><span className="icon">✧</span><strong>Valoración individual</strong><small>Cada piel tiene necesidades propias.</small></div>
                <div className="feature"><span className="icon">❋</span><strong>Criterio estético</strong><small>Decisiones informadas sobre tu cuidado.</small></div>
                <div className="feature"><span className="icon">◇</span><strong>Seguimiento</strong><small>Claridad en cada etapa del proceso.</small></div>
              </div>
            </div>
          </div>
        </section>

        <section className="manifesto" aria-label="Filosofía de marca">
          <div className="wrap" data-reveal><div className="eyebrow">El espíritu de Equilibria Beauty</div>
            <p className="quote">“La belleza no consiste en transformarte en otra persona, sino en <em>destacar lo mejor de ti.</em>”</p>
            <p>Estética · Precisión · Belleza</p>
          </div>
        </section>

        <section className="family-section" aria-labelledby="family-title">
          <div className="wrap">
            <div className="family-heading" data-reveal>
              <div className="family-heading__copy">
                <div className="eyebrow">Una identidad compartida</div>
                <h2 className="section-title" id="family-title">La esencia Equilibria.<br /><em>Una mirada a la belleza.</em></h2>
              </div>
              <div className="family-heading__aside">
                <p>La marca Equilibria reúne distintas áreas de cuidado. Beauty mantiene una propuesta propia, especializada en estética facial y corporal.</p>
                <a className="family-external" href="https://www.equilibria.cloud/" target="_blank" rel="noopener noreferrer">
                  Explorar Equilibria <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
            <div className="family-values" role="group" aria-label="Nuestro enfoque estético">
              {beautyValues.map((item, index) => {
                const expanded = expandedValue === index;
                return (
                  <article key={item.number} className={`family-value${expanded ? " family-value--expanded" : ""}`}>
                    <button className="family-value__button" type="button"
                      aria-expanded={expanded} aria-controls={`family-value-detail-${index}`}
                      onClick={() => setExpandedValue(expanded ? null : index)}>
                      <span className="family-value__number">{item.number} / 03</span>
                      <span className="family-value__title">{item.title}</span>
                      <span className="family-value__intro">{item.intro}</span>
                      <span className="family-value__toggle" aria-hidden="true">{expanded ? "−" : "+"}</span>
                    </button>
                    <div id={`family-value-detail-${index}`} className="family-value__detail" hidden={!expanded}>
                      <p>{item.detail}</p>
                    </div>
                  </article>
                );
              })}
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
          <div className="contact-text" data-reveal><div className="eyebrow light">Tu momento comienza aquí</div><h2 className="section-title" id="contact-title">Reserva tu <em>valoración.</em></h2><p>Tu cuidado empieza con una valoración personalizada. Cuéntanos qué deseas mejorar o mantener.</p><button className="btn btn-gold" type="button" onClick={() => openAppointment()}>Solicitar una valoración <span className="arrow">↗</span></button></div>
        </section>
      </main>

      <footer className="footer"><div className="wrap">
        <div className="footer-grid">
          <div className="footer-intro"><BrandMark placement="footer" /><p>Un espacio orientado al cuidado facial y corporal, la estética personalizada y la belleza natural.</p></div>
          <div className="footer-col"><strong>Explorar</strong><a href="#tratamientos">Tratamientos</a><a href="#nosotros">Nuestra esencia</a><a href="#experiencia">La experiencia</a></div>
          <div className="footer-col"><strong>Información</strong><a href="#contacto">Consultas y reservas</a><a href="#faq-title">Preguntas frecuentes</a><a href="https://www.equilibria.cloud/" target="_blank" rel="noopener noreferrer">Equilibria institucional ↗</a><span>Datos comerciales de Beauty: por confirmar</span></div>
        </div>
        <div className="footer-bottom"><span>© 2026 Equilibria Beauty · Maqueta conceptual, no sitio publicado.</span><span>Las imágenes y servicios son ilustrativos. El formulario no envía datos.</span></div>
      </div></footer>

      <div className={`modal${modalOpen ? " open" : ""}`} aria-hidden={!modalOpen} onMouseDown={event => { if (event.target === event.currentTarget) closeAppointment(); }}>
        {modalOpen && (
          <div className="dialog" role="dialog" aria-modal="true" aria-labelledby="modal-heading" ref={dialogRef}>
            <button className="close" type="button" aria-label="Cerrar ventana" onClick={closeAppointment} ref={closeButtonRef}>×</button>
            <div className="eyebrow">Equilibria Beauty</div>
            <h2 id="modal-heading">Tu momento comienza aquí.</h2>
            <p>Déjanos una idea de lo que buscas. Este formulario es solo una demostración interactiva: no enviará ni guardará tus datos.</p>
            <form onSubmit={handleSubmit}>
              <div className="field"><label htmlFor="full-name">Nombre</label><input id="full-name" name="name" type="text" required maxLength={80} autoComplete="name" placeholder="Tu nombre" /></div>
              <div className="field"><label htmlFor="interest">Tratamiento de interés</label><select id="interest" required value={selectedTreatment} onChange={event => setSelectedTreatment(event.target.value)}>
                <option value="">Selecciona una opción</option>
                {treatments.map(t => <option key={t.id} value={t.title}>{t.title}</option>)}
                <option value="Consulta general de estética">Consulta general de estética</option>
              </select></div>
              <div className="field"><label htmlFor="message">¿Qué te gustaría consultar? (opcional)</label><textarea id="message" name="message" rows={3} placeholder="Cuéntanos brevemente qué buscas" /></div>
              <button className="btn btn-dark" type="submit">Continuar <span className="arrow">↗</span></button>
              <div className="preview-alert">Vista previa: al publicar la web, este módulo deberá conectarse al canal oficial de reservas.</div>
              <div className={`result${submittedName ? " visible" : ""}`} role="status" aria-live="polite">{submittedName && `Demostración completada, ${submittedName}. Tu interés en «${submittedTreatment}» se mostraría al equipo de Equilibria Beauty tras integrar el sistema real. Por ahora no se ha enviado ni almacenado información.`}</div>
            </form>
          </div>
        )}
      </div>
    </>
  );
}
