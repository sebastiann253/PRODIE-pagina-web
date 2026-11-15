import { useEffect, useRef, useState } from "react";

const MAIL = "prodie.informacion@gmail.com";
const TEL = "+54 297 581-1863";
const WA = "542975811863";
const IG = "https://www.instagram.com/_prodie_/";

const pilares = [
  { i: "💡", t: "Herramientas prácticas", d: "Recursos para tu día a día y tu futuro profesional.", x: "Contenido aplicable desde el primer encuentro: pensado para que lo uses en tu rutina y en tus primeras experiencias laborales." },
  { i: "📈", t: "Desarrollo de habilidades", d: "Fortalecé tus capacidades y descubrí tu potencial.", x: "Trabajamos habilidades personales y profesionales para que avances con claridad y propósito." },
  { i: "⭐", t: "Confianza y crecimiento", d: "Ganá seguridad y prepárate para nuevos desafíos.", x: "Te acompañamos para que te desenvuelvas con seguridad en entrevistas, equipos y nuevos entornos." },
  { i: "💼", t: "Preparación laboral", d: "Más oportunidades, mejor preparado.", x: "Te preparamos para dar el paso al mundo laboral con herramientas concretas y acompañamiento." },
];
const servicios = [
  { t: "Marketing de contenidos", d: "Estrategias de contenido para comunicar con coherencia, atraer a tu audiencia y sostener tu presencia digital.", c: "navy" },
  { t: "Posicionamiento", d: "Definimos cómo querés ser percibido y construimos una propuesta clara que te diferencie.", c: "pink" },
  { t: "Narrativa visual", d: "Una identidad y una historia visual que transmitan tu esencia de forma profesional.", c: "blue" },
];

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("in")), { threshold: 0.15 });
    document.querySelectorAll(".rv").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Counter({ to, suffix = "" }) {
  const [n, setN] = useState(0);
  const ref = useRef();
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      let s = 0; const id = setInterval(() => { s += Math.ceil(to / 30); if (s >= to) { s = to; clearInterval(id); } setN(s); }, 30);
      io.disconnect();
    });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{n}{suffix}</span>;
}

export default function App() {
  useReveal();
  const [open, setOpen] = useState(false);
  const [sel, setSel] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [f, setF] = useState({ nombre: "", contacto: "", mensaje: "" });
  useEffect(() => { const h = () => setScrolled(window.scrollY > 20); h(); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  const go = () => setOpen(false);
  const enviar = (e) => {
    e.preventDefault();
    const body = `Nombre: ${f.nombre}\nContacto: ${f.contacto}\n\n${f.mensaje}`;
    window.location.href = `mailto:${MAIL}?subject=${encodeURIComponent("Consulta desde la web de PRODIE")}&body=${encodeURIComponent(body)}`;
  };

  return (
    <>
      <header className={"nav" + (scrolled ? " sc" : "")}>
        <a href="#inicio" className="brand"><img src="/img/logo.png" alt="PRODIE" /></a>
        <button className="burger" onClick={() => setOpen(!open)} aria-label="Menú">☰</button>
        <nav className={open ? "open" : ""}>
          <a href="#nosotros" onClick={go}>Nosotros</a>
          <a href="#pilares" onClick={go}>Qué ofrecemos</a>
          <a href="#consultoria" onClick={go}>Consultoría</a>
          <a href="#contacto" onClick={go} className="btn sm">Contacto</a>
        </nav>
      </header>

      <section id="inicio" className="hero">
        <div className="blob b1" /><div className="blob b2" />
        <div className="wrap hero-in">
          <div className="rv">
            <span className="tag">Desarrollo Integral · Formación · Empleabilidad</span>
            <h1>Herramientas para tu <em>desarrollo</em>.<br />Acompañamos tu <strong>camino</strong>.<br />Potenciamos tu <em>futuro</em>.</h1>
            <p>Brindamos herramientas y formación para que desarrolles tus habilidades, ganes confianza y te prepares para nuevas oportunidades, incluso en tus primeras experiencias laborales.</p>
            <div className="cta"><a href="#contacto" className="btn">Quiero más información</a><a href="#pilares" className="btn ghost">Conocer el programa</a></div>
          </div>
          <div className="logo-card rv"><img src="/img/logo.png" alt="Logo PRODIE" /></div>
        </div>
      </section>

      <section className="stats"><div className="wrap">
        <div><b><Counter to={4} /></b><span>pilares de trabajo</span></div>
        <div><b><Counter to={3} /></b><span>servicios de consultoría</span></div>
        <div><b>2026/27</b><span>servicios disponibles</span></div>
      </div></section>

      <section id="nosotros" className="sec"><div className="wrap two">
        <div className="rv"><span className="tag">Quiénes somos</span>
          <h2>Programa de Desarrollo Integral y Empleabilidad</h2>
          <p>PRODIE acompaña a personas que quieren crecer y desenvolverse en el mundo laboral. Combinamos formación, herramientas prácticas y acompañamiento cercano para que cada paso sea más seguro.</p>
          <ul className="ticks"><li>Acompañamiento cercano</li><li>Enfoque práctico y aplicable</li><li>Pensado también para primeras experiencias laborales</li></ul>
        </div>
        <div className="shot rv"><img src="/img/herramientas.png" alt="PRODIE: herramientas para tu desarrollo" /></div>
      </div></section>

      <section id="pilares" className="sec alt"><div className="wrap">
        <div className="head rv"><span className="tag">Qué ofrecemos</span><h2>Cuatro pilares para impulsar tu camino</h2><p>Tocá cada pilar para conocer más.</p></div>
        <div className="tabs rv">
          {pilares.map((p, k) => <button key={k} className={k === sel ? "on" : ""} onClick={() => setSel(k)}><span>{p.i}</span>{p.t}</button>)}
        </div>
        <div className="panel rv" key={sel}><div className="ico">{pilares[sel].i}</div><div><h3>{pilares[sel].t}</h3><strong>{pilares[sel].d}</strong><p>{pilares[sel].x}</p></div></div>
      </div></section>

      <section id="consultoria" className="sec"><div className="wrap two rev">
        <div className="shot rv"><img src="/img/consultoria.png" alt="Consultoría PRODIE" /></div>
        <div className="rv"><span className="tag pink">Consultoría</span><h2>Servicios para dar forma a tu marca y tu mensaje</h2>
          <div className="svc">{servicios.map((s) => <div key={s.t} className={"card " + s.c}><h3>{s.t}</h3><p>{s.d}</p></div>)}</div>
        </div>
      </div></section>

      <section id="contacto" className="sec alt"><div className="wrap two">
        <div className="rv"><span className="tag">Contacto</span><h2>Demos el próximo paso juntos</h2>
          <p>Escribinos y te contamos cómo podemos acompañarte.</p>
          <div className="links">
            <a href={`mailto:${MAIL}`}>✉️ {MAIL}</a>
            <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer">💬 {TEL}</a>
            <a href={IG} target="_blank" rel="noreferrer">📸 @_prodie_</a>
          </div>
        </div>
        <form className="form rv" onSubmit={enviar}>
          <input required placeholder="Tu nombre" value={f.nombre} onChange={(e) => setF({ ...f, nombre: e.target.value })} />
          <input required placeholder="Correo o teléfono" value={f.contacto} onChange={(e) => setF({ ...f, contacto: e.target.value })} />
          <textarea required rows="4" placeholder="¿En qué podemos ayudarte?" value={f.mensaje} onChange={(e) => setF({ ...f, mensaje: e.target.value })} />
          <button className="btn">Enviar mensaje</button>
        </form>
      </div></section>

      <footer><img src="/img/logo.png" alt="PRODIE" /><p>© {new Date().getFullYear()} PRODIE · Programa de Desarrollo Integral y Empleabilidad</p></footer>
      <a className="wa" href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer" aria-label="WhatsApp">💬</a>
    </>
  );
}
