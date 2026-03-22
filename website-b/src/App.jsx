import { useEffect, useRef, useState, createContext, useContext } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight, Shield, Users, FileWarning, Eye,
  MapPin, CheckCircle, Lock, Calendar, Phone,
  Building2, GraduationCap, HeartPulse, Home,
  Briefcase, Star, Clock, Globe, ChevronRight,
  User, Factory, Award, Key
} from 'lucide-react';

/* ─── Magic UI Components ─── */
import { ShimmerButton } from './components/magicui/ShimmerButton';
import { AnimatedShinyText } from './components/magicui/AnimatedShinyText';
import { NumberTicker } from './components/magicui/NumberTicker';
import { BorderBeam } from './components/magicui/BorderBeam';
import { ShineBorder } from './components/magicui/ShineBorder';
import { BlurFade } from './components/magicui/BlurFade';
import { DotPattern } from './components/magicui/DotPattern';

gsap.registerPlugin(ScrollTrigger);

/* ═══════════════════════════════════════════════════════════════ */
/* ═══════════════════ TRANSLATIONS ═══════════════════════════════ */
/* ═══════════════════════════════════════════════════════════════ */
const T = {
  en: {
    // Nav
    navPrograms: 'Programs', navLeon: 'León 360°', navHub: 'Expat Hub',
    navCta: 'Expat Hub — Log In',
    // Hero
    heroTag: 'Premium Corporate Relocation Services',
    heroH1a: 'Your success in Bajío',
    heroH1b: 'starts before you land.',
    heroSub: 'End-to-end corporate and executive relocation management into León and the Bajío region. We guarantee safety, certainty, and quality of life from day one.',
    heroProfiles: [
      { label: "I'm an HR Director", sub: 'Corporate solutions for large-scale transfers and talent retention.' },
      { label: "I'm an Expat Executive", sub: 'VIP concierge, premium housing search, and international schools.' },
      { label: "I'm an Industrial Park", sub: 'Strategic alliances for anchor companies arriving in Guanajuato.' },
    ],
    heroCta: 'Request free assessment',
    heroCtaAlt: 'View programs',
    // Trust
    trustDesc: 'Trusted by senior executives at companies across Puerto Interior, León, and Silao',
    trustLabels: ['Japanese companies in GTO', 'Foreign residents', 'Immigration fines', 'First-year retention'],
    // Programs
    progTitle: 'Specialized',
    progAccent: 'Programs.',
    progSub: "Meticulously designed to ensure a smooth, safe, and stress-free transition for your company's most valuable asset: your people.",
    progCards: [
      { title: 'Soft Landing', desc: "A seamless operational setup in León. We manage RFC registration, bank account opening, driver's license processing, and essential urban orientation for the first 30 days.", cta: 'See the process' },
      { title: 'Family First', desc: 'A successful relocation depends on a happy family. We coordinate tours of premium residential zones, manage international school admissions, and provide full spousal support.', cta: 'Protect my family' },
      { title: 'VIP Business Concierge', desc: 'White-Glove service for C-Level executives. We provide private security advisory, golf club membership networking, premium vehicle management, and 24/7 personal assistance.', cta: 'Exclusive service' },
      { title: 'Immigrant Status', desc: "Absolute legal certainty. We process work visas, temporary and permanent residencies, ensuring strict regulatory compliance with Mexico's INM for all your assignees.", cta: 'View legal services' },
    ],
    // León 360
    leonTitle: 'León', leonAccent: '360°',
    leonSub: 'Your definitive guide to premium living in the city. Discover why León is the corporate and industrial epicenter of the Bajío.',
    leonTabs: [
      { label: 'Premium Zones', title: 'Security-vetted neighborhoods with guaranteed appreciation.', detail: 'We map exclusively the zones with the highest security ratings, fast-road access (Blvd. Aeropuerto, Libramiento), and guaranteed property appreciation. We filter properties that rigorously meet international corporate safety standards.', points: ['Strict 24/7 private security filters.', 'Strategic proximity to educational and commercial clusters.', 'Less than 25 minutes from the main industrial parks.'] },
      { label: 'Schools', title: 'International curriculum. Bilingual & trilingual programs.', detail: "Your children's future doesn't pause. We manage appointments, prepare families for admissions exams, and facilitate integration at the most prestigious institutions.", points: ['Alliances with the German School (Alexander von Humboldt) and international lyceums.', 'International Baccalaureate (IB) programs.', 'Psycho-pedagogical counseling to ease the cultural transition.'] },
      { label: 'Healthcare', title: 'World-class medical care. Bilingual specialists.', detail: 'Total peace of mind for any eventuality. We connect you immediately with the most advanced specialty hospitals in the region, ensuring world-class medical care.', points: ['VIP access to Hospital Ángeles León and Hospital MAC.', 'Curated directory of bilingual specialist physicians.', 'Advisory on validating international major medical insurance plans.'] },
    ],
    // Expat Hub
    hubTag: 'Exclusive Technology', hubH2: 'The Expat Hub.', hubAccent: 'Full control in real time.',
    hubDesc: 'Replace endless email chains and uncertainty. Our exclusive client portal allows HR directors and executives to monitor every detail, appointment, and document of their relocation — from any device.',
    hubF1: 'Digital Vault', hubF1d: 'Visas, lease contracts, and tax IDs stored with bank-grade encryption.',
    hubF2: 'Smart Agenda', hubF2d: 'Live synchronization of house tours, school interviews, and government appointments.',
    hubCta: 'Request a portal demo',
    // Cases
    casesH2a: 'Results that speak', casesH2b: 'for themselves.',
    casesSub: 'Every relocation is a unique project. These are some of the processes we have managed.',
    cases: [
      { sector: 'Automotive Manufacturing', origin: 'Japan', programs: 'Soft Landing + Family First + Immigrant Status', scope: 'Relocation of 8 engineers and their families to Puerto Interior within 45 days.', result: 'All 8 executives operational on-site. Four families enrolled in Japanese Saturday school. 100% retention at one year.', testimonial: 'A process that would normally take us 4 months was resolved in 6 weeks. The difference was their knowledge of the local ecosystem.', author: 'HR Director, automotive sector company' },
      { sector: 'Shared Services / Technology', origin: 'Germany & Spain', programs: 'VIP Business Concierge + Immigrant Status', scope: 'Relocation of 2 C-Level directors with ultra-luxury housing and private security requirements.', result: 'Both signed leases at El Molino within 10 days. One joined Club Campestre León in week two. Both renewed at year one.', testimonial: 'We arrived knowing nothing about León and within two weeks we felt at home. The level of service was impressive.', author: 'European Operations Director' },
      { sector: 'Logistics & Foreign Trade', origin: 'USA & Canada', programs: 'Family First + Soft Landing', scope: 'Staggered relocation of 5 families to North León over 3 months.', result: 'All 5 children enrolled in bilingual schools. All 5 spouses joined the León expat group. Zero resignations in year one.', testimonial: '', author: '' },
    ],
    casesCta: 'Ready to be our next success story?',
    // About
    aboutH2a: 'Local experts.', aboutH2b: 'Global standards.',
    aboutP1: "Bajío Relocate was born from the conviction that international executive talent deserves an arrival experience that matches their level. We are the boutique firm that combines deep knowledge of the Bajío business ecosystem with the service standards of the world's leading Global Mobility firms.",
    aboutP2: "Founded in León, Guanajuato — at the heart of Mexico's most dynamic industrial corridor — Bajío Relocate emerged from a real need: the industrial parks of Puerto Interior and Silao were receiving waves of international executive talent without the support infrastructure needed to ensure their integration and retention.",
    values: [
      { title: 'Anticipation', desc: 'We solve the problem before the client notices it.' },
      { title: 'Discretion', desc: 'Every file is handled with the confidentiality of a bank vault.' },
      { title: 'Precision', desc: 'Zero errors in legal procedures and critical deadlines.' },
      { title: 'Warmth', desc: 'We remember that behind every file is a family adapting to a new life.' },
    ],
    // Form
    formH2a: "Let's talk about your", formH2b: 'next transition.',
    formSub: "Leave the complex logistics to us. Request a confidential advisory to assess your talent's needs.",
    formName: 'Full name', formEmail: 'Corporate email (e.g. name@company.com)',
    formProfile: 'Profile...', formTimeline: 'Timeline...',
    formProfileOpts: ['HR Director / Manager', 'Executive / C-Level', 'Industrial Park Representative'],
    formTimelineOpts: ['Urgent — under 30 days', 'Short-term — 1 to 3 months', 'Planning — 3 to 6 months+'],
    formDetails: 'Any details we should know? (Optional)',
    formCta: 'Request a Free Assessment',
    formTrust: 'Your information is protected under strict corporate confidentiality agreements. Zero spam.',
    formAlert: 'Thank you — the consultant assigned to your profile will contact you within 24 business hours.',
    // Footer
    footerDesc: "Corporate relocation concierge for international executives arriving to Mexico's Bajío industrial corridor.",
    footerProg: 'Programs', footerCompany: 'Company',
    footerLinks: ['About Us', 'Terms', 'Privacy', 'Legal Notice'],
    footerCopy: 'All rights reserved.',
    footerStatus: 'System Operational',
    // WhatsApp
    waTooltip: 'Need urgent help? Chat now',
    waMsg: "Hello, Bajío Relocate team. I'm looking for support with corporate/executive relocation services and would like to speak with an advisor today.",
  },
  es: {
    navPrograms: 'Programas', navLeon: 'León 360°', navHub: 'Expat Hub',
    navCta: 'Expat Hub — Iniciar Sesión',
    heroTag: 'Relocalización Corporativa de Alta Gama',
    heroH1a: 'Tu éxito en el Bajío',
    heroH1b: 'comienza antes de aterrizar.',
    heroSub: 'Gestión integral de relocalización corporativa y ejecutiva hacia León y el Bajío. Garantizamos seguridad, certidumbre y calidad de vida desde el día uno.',
    heroProfiles: [
      { label: 'Soy Director de RR.HH.', sub: 'Soluciones corporativas para traslados masivos y retención de talento.' },
      { label: 'Soy Ejecutivo Expatriado', sub: 'Concierge VIP, búsqueda de vivienda premium y colegios internacionales.' },
      { label: 'Soy Parque Industrial', sub: 'Alianzas estratégicas para empresas ancla llegando a Guanajuato.' },
    ],
    heroCta: 'Solicitar evaluación gratuita',
    heroCtaAlt: 'Ver programas',
    trustDesc: 'Confían en nosotros directivos de empresas establecidas en el Puerto Interior, Colinas de León y Silao',
    trustLabels: ['Empresas japonesas en GTO', 'Residentes extranjeros', 'Multas migratorias', 'Retención primer año'],
    progTitle: 'Programas',
    progAccent: 'Especializados.',
    progSub: 'Diseñados meticulosamente para garantizar una transición suave, segura y libre de estrés para el activo más valioso de su empresa: su gente.',
    progCards: [
      { title: 'Soft Landing', desc: 'Configuración inicial e impecable en León. Gestionamos trámites de RFC, apertura de cuentas bancarias, licencias de conducir y brindamos una orientación urbana esencial para los primeros 30 días.', cta: 'Conocer el proceso' },
      { title: 'Family First', desc: 'Una relocalización exitosa depende de una familia feliz. Coordinamos recorridos por zonas residenciales premium, gestionamos admisiones en colegios internacionales y ofrecemos soporte integral al cónyuge.', cta: 'Proteger a mi familia' },
      { title: 'VIP Business Concierge', desc: 'Servicio White-Glove para Alta Dirección. Proveemos consultoría en seguridad privada, networking para membresías en Clubes de Golf, gestión de vehículos premium y asistencia personal 24/7.', cta: 'Atención exclusiva' },
      { title: 'Immigrant Status', desc: 'Certidumbre legal absoluta. Tramitamos visas de trabajo, residencias temporales y permanentes, asegurando un cumplimiento normativo estricto ante el INM para todos sus expatriados.', cta: 'Ver servicios legales' },
    ],
    leonTitle: 'León', leonAccent: '360°',
    leonSub: 'Su guía definitiva para la vida premium en la ciudad. Descubra por qué León es el epicentro corporativo e industrial del Bajío.',
    leonTabs: [
      { label: 'Zonas Premium', title: 'Vecindarios verificados con plusvalía garantizada.', detail: 'Mapeamos exclusivamente las zonas con los más altos índices de seguridad, accesibilidad a vías rápidas (Blvd. Aeropuerto, Libramiento) y plusvalía garantizada. Filtramos propiedades que cumplen rigurosamente con estándares corporativos internacionales.', points: ['Filtros estrictos de seguridad privada 24/7.', 'Cercanía estratégica a clústeres educativos y comerciales.', 'Conectividad a menos de 25 min de los principales parques industriales.'] },
      { label: 'Colegios', title: 'Currícula internacional. Programas bilingües y trilingües.', detail: 'El futuro de sus hijos no se detiene. Gestionamos citas, preparamos para exámenes de admisión y facilitamos la integración en las instituciones más prestigiosas con currícula internacional (IB) y sistemas bilingües/trilingües.', points: ['Alianzas con el Colegio Alemán (Alexander von Humboldt) y liceos internacionales.', 'Sistemas de Bachillerato Internacional (IB).', 'Asesoría psicopedagógica para suavizar la transición cultural.'] },
      { label: 'Salud', title: 'Atención médica de primer mundo. Especialistas bilingües.', detail: 'Tranquilidad total ante cualquier eventualidad. Le conectamos de inmediato con los hospitales de especialidad más avanzados de la región, asegurando atención médica de primer mundo.', points: ['Acceso VIP a Hospital Ángeles León y Hospital MAC.', 'Directorio curado de médicos especialistas bilingües.', 'Asesoría en validación de seguros de gastos médicos mayores internacionales.'] },
    ],
    hubTag: 'Tecnología Exclusiva', hubH2: 'El Expat Hub.', hubAccent: 'Control total en tiempo real.',
    hubDesc: 'Reemplace las interminables cadenas de correos y la incertidumbre. Nuestro portal de cliente exclusivo permite a directivos de HR y ejecutivos monitorear cada detalle, cita y documento de su relocalización desde cualquier dispositivo.',
    hubF1: 'Bóveda Digital', hubF1d: 'Visas, contratos de arrendamiento y RFCs almacenados con encriptación de nivel bancario.',
    hubF2: 'Agenda Inteligente', hubF2d: 'Sincronización en vivo de recorridos de casas, entrevistas escolares y citas gubernamentales.',
    hubCta: 'Solicitar un Demo del Portal',
    casesH2a: 'Resultados que hablan', casesH2b: 'por sí mismos.',
    casesSub: 'Cada relocalización es un proyecto único. Estos son algunos de los procesos que hemos gestionado.',
    cases: [
      { sector: 'Manufactura Automotriz', origin: 'Japón', programs: 'Soft Landing + Family First + Immigrant Status', scope: 'Relocalización de 8 ingenieros y sus familias hacia Puerto Interior en un plazo de 45 días.', result: 'Los 8 ejecutivos estaban operativos en planta dentro del plazo acordado. Cuatro familias se inscribieron en el programa de escuela sabatina japonesa. Tasa de retención al año: 100%.', testimonial: 'El proceso que normalmente nos tomaría 4 meses lo resolvieron en 6 semanas. La diferencia fue su conocimiento del tejido local.', author: 'Director de HR, empresa del sector automotriz' },
      { sector: 'Servicios Compartidos / Tecnología', origin: 'Alemania y España', programs: 'VIP Business Concierge + Immigrant Status', scope: 'Relocalización de 2 directores de área (C-Level) con requerimientos de vivienda de ultra-lujo y seguridad privada.', result: 'Ambos directivos firmaron contratos de arrendamiento en El Molino Residencial dentro de los primeros 10 días. Uno de ellos adquirió membresía en el Club Campestre León en la segunda semana. Ambos renovaron contrato con la empresa al cumplir el primer año.', testimonial: 'Llegamos sin saber nada de León y en dos semanas nos sentíamos en casa. El nivel de atención fue impresionante.', author: 'Director de Operaciones Europeo' },
      { sector: 'Logística y Comercio Exterior', origin: 'Estados Unidos y Canadá', programs: 'Family First + Soft Landing', scope: 'Relocalización de 5 familias hacia la zona norte de León en un proceso escalonado de 3 meses.', result: 'Los 5 menores fueron inscritos en colegios bilingües con programa de nivelación. Las 5 cónyuges se integraron al grupo de expatriadas de León antes del segundo mes. Cero renuncias en el primer año.', testimonial: '', author: '' },
    ],
    casesCta: '¿Listo para ser nuestro próximo caso de éxito?',
    aboutH2a: 'Expertos locales.', aboutH2b: 'Estándares globales.',
    aboutP1: 'Bajío Relocate nació de la convicción de que el talento directivo internacional merece una experiencia de llegada que esté a la altura de su nivel. Somos la firma boutique que combina el conocimiento profundo del tejido empresarial del Bajío con los estándares de servicio de las mejores firmas de Global Mobility del mundo.',
    aboutP2: 'Fundada en León, Guanajuato, en el corazón del corredor industrial más dinámico de México, Bajío Relocate surgió de una necesidad real: los parques industriales de Puerto Interior y Silao recibían oleadas de talento directivo internacional sin la infraestructura de apoyo necesaria para garantizar su integración y retención.',
    values: [
      { title: 'Anticipación', desc: 'Resolvemos el problema antes de que el cliente lo detecte.' },
      { title: 'Discreción', desc: 'Cada expediente es tratado con la confidencialidad de una bóveda bancaria.' },
      { title: 'Precisión', desc: 'Cero errores en trámites legales y fechas críticas.' },
      { title: 'Calidez', desc: 'Recordamos que detrás de cada expediente hay una familia adaptándose a una nueva vida.' },
    ],
    formH2a: 'Hablemos de su', formH2b: 'próxima transición.',
    formSub: 'Déjenos la logística compleja a nosotros. Solicite una asesoría confidencial para evaluar las necesidades de su talento.',
    formName: 'Nombre completo', formEmail: 'Correo corporativo (ej. nombre@empresa.com)',
    formProfile: 'Perfil...', formTimeline: 'Tiempo estimado...',
    formProfileOpts: ['Director / Gerente de RR.HH.', 'Ejecutivo / Directivo', 'Representante de Parque Industrial'],
    formTimelineOpts: ['Urgente — menos de 30 días', 'Corto Plazo — 1 a 3 meses', 'Planeación — 3 a 6 meses+'],
    formDetails: '¿Algún detalle que debamos saber? (Opcional)',
    formCta: 'Solicitar Evaluación Gratuita',
    formTrust: 'Sus datos están protegidos bajo estrictos acuerdos de confidencialidad corporativa. Cero spam.',
    formAlert: 'Gracias — el consultor asignado a su perfil revisará sus datos y le contactará en un plazo máximo de 24 horas hábiles.',
    footerDesc: 'Concierge de relocalización corporativa para ejecutivos internacionales que llegan al corredor industrial del Bajío de México.',
    footerProg: 'Programas', footerCompany: 'Empresa',
    footerLinks: ['Quiénes Somos', 'Términos', 'Privacidad', 'Aviso Legal'],
    footerCopy: 'Todos los derechos reservados.',
    footerStatus: 'Sistema Operativo',
    waTooltip: '¿Atención urgente? Chatea ahora',
    waMsg: 'Hola, equipo de Bajío Relocate. Estoy buscando apoyo para servicios de relocalización corporativa/ejecutiva y me gustaría hablar con un asesor hoy mismo.',
  },
};

/* ─── LANG CONTEXT ─── */
const LangContext = createContext({ lang: 'en', setLang: () => {}, t: T.en });
function useLang() { return useContext(LangContext); }

/* ─── STAT with NumberTicker ─── */
function Stat({ value, suffix = '+', label, prefix = '' }) {
  if (value === 0) {
    return (
      <div className="text-center md:text-left">
        <span className="block font-display text-5xl md:text-6xl font-bold text-accent leading-none">{prefix}0</span>
        <span className="block mt-2 text-sm font-data text-text-muted uppercase tracking-widest">{label}</span>
      </div>
    );
  }
  return (
    <div className="text-center md:text-left">
      <span className="block font-display text-5xl md:text-6xl font-bold text-accent leading-none">
        {prefix}<NumberTicker value={value} delay={0.3} />{suffix}
      </span>
      <span className="block mt-2 text-sm font-data text-text-muted uppercase tracking-widest">{label}</span>
    </div>
  );
}

/* ─── SERVICE CARD with ShineBorder on featured ─── */
function ServiceCard({ icon: Icon, title, desc, cta, delay = 0, featured = false }) {
  return (
    <BlurFade inView delay={delay}>
      <div className={`relative overflow-hidden group flex flex-col justify-between rounded-4xl border p-8 md:p-10 transition-all duration-500 h-full ${featured ? 'border-accent/20 bg-gradient-to-br from-accent/5 to-transparent' : 'bg-surface border-white/5 hover:border-accent/20'}`}>
        {featured && <BorderBeam size={250} duration={12} colorFrom="#D97706" colorTo="#F59E0B" />}
        <div className="relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
            <Icon className="w-7 h-7 text-accent" />
          </div>
          <h3 className="font-display text-xl font-bold text-white mb-3 leading-tight">{title}</h3>
          <p className="text-text-muted leading-relaxed mb-6">{desc}</p>
        </div>
        <a href="#form" className="relative z-10 inline-flex items-center gap-2 text-accent font-display font-medium text-sm group-hover:gap-3 transition-all">
          {cta} <ChevronRight className="w-4 h-4" />
        </a>
      </div>
    </BlurFade>
  );
}

/* ─── LEÓN 360° TABS ─── */
function Leon360() {
  const { t } = useLang();
  const [tab, setTab] = useState(0);
  const tabIcons = [MapPin, GraduationCap, HeartPulse];
  const active = t.leonTabs[tab];
  return (
    <BlurFade inView>
      <div className="flex flex-wrap gap-3 mb-10">
        {t.leonTabs.map((tb, i) => {
          const TabIcon = tabIcons[i];
          return (
            <button key={i} onClick={() => setTab(i)} className={`flex items-center gap-2 px-5 py-3 rounded-full font-display font-medium text-sm transition-all duration-300 cursor-pointer ${i === tab ? 'bg-accent text-black' : 'bg-surface border border-white/5 text-text-muted hover:border-accent/30 hover:text-white'}`}>
              <TabIcon className="w-4 h-4" /> {tb.label}
            </button>
          );
        })}
      </div>
      <div className="relative bg-surface border border-white/5 rounded-4xl p-8 md:p-12 overflow-hidden">
        <BorderBeam size={200} duration={18} colorFrom="#D97706" colorTo="#F1F5F9" />
        <div className="relative z-10">
          <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">{active.title}</h3>
          <p className="text-text-muted leading-relaxed mb-8">{active.detail}</p>
          <ul className="space-y-4">
            {active.points.map((p, i) => (
              <li key={i} className="flex items-start gap-3 text-white">
                <CheckCircle className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </BlurFade>
  );
}

/* ─── CASE STUDY CARD with ShineBorder ─── */
function CaseCard({ flag, sector, origin, programs, scope, result, testimonial, author }) {
  return (
    <ShineBorder
      borderRadius={24}
      borderWidth={1}
      duration={16}
      color={['#D97706', '#F1F5F9', '#D97706']}
      className="h-full"
    >
      <div className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-4xl">{flag}</span>
          <div>
            <div className="font-display text-sm font-bold text-white uppercase tracking-wider">{sector}</div>
            <div className="text-xs font-data text-text-dim">Origin: {origin}</div>
          </div>
        </div>
        <div className="space-y-3 mb-6">
          <div className="text-xs font-data text-accent uppercase tracking-widest">{programs}</div>
          <p className="text-text-muted text-sm leading-relaxed">{scope}</p>
          <p className="text-white text-sm font-medium">{result}</p>
        </div>
        {testimonial && (
          <blockquote className="border-l-2 border-accent pl-4 mt-6">
            <p className="text-sm italic text-text-muted leading-relaxed">{testimonial}</p>
            <cite className="block mt-2 text-xs font-data text-text-dim not-italic">— {author}</cite>
          </blockquote>
        )}
      </div>
    </ShineBorder>
  );
}

/* ═══════════════════════════════════════════════════════════════ */
/* ═══════════════════ MAIN APP ═══════════════════════════════════ */
/* ═══════════════════════════════════════════════════════════════ */
export default function App() {
  const appRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState('en');
  const t = T[lang];

  const profileIcons = [Briefcase, User, Factory];
  const cardIcons = [Key, Users, Star, Shield];
  const valueIcons = [Eye, Lock, Award, Users];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-animate', { y: 50, opacity: 0, duration: 1.2, stagger: 0.12, ease: 'power3.out', delay: 0.3 });
      gsap.to('.hero-bg-img', { yPercent: 20, ease: 'none', scrollTrigger: { trigger: '.hero-section', start: 'top top', end: 'bottom top', scrub: true } });
    }, appRef);
    return () => ctx.revert();
  }, []);

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      <div ref={appRef} className="min-h-screen bg-background text-text-main font-body relative overflow-x-hidden">
        <div className="noise-overlay" />

        {/* ═══════════ NAVBAR ═══════════ */}
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-background/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
          <div className="section-container flex items-center justify-between">
            <a href="#" className="font-display font-bold text-xl tracking-tight">
              BAJÍO<span className="text-accent ml-1">RELOCATE</span>
            </a>
            <div className="hidden md:flex items-center gap-10 text-sm font-medium text-text-muted">
              <a href="#programs" className="hover:text-white transition-colors">{t.navPrograms}</a>
              <a href="#leon360" className="hover:text-white transition-colors">{t.navLeon}</a>
              <a href="#hub" className="hover:text-white transition-colors">{t.navHub}</a>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-1 text-xs font-data">
                {['ES', 'EN'].map(l => (
                  <button key={l} onClick={() => setLang(l.toLowerCase())}
                    className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${lang === l.toLowerCase() ? 'bg-accent text-black font-bold' : 'text-text-dim hover:text-white'}`}>
                    {l}
                  </button>
                ))}
              </div>
              <ShimmerButton
                shimmerColor="#F59E0B"
                shimmerSize="2px"
                shimmerDuration="2.5s"
                background="rgba(217, 119, 6, 1)"
                borderRadius="100px"
                className="!py-2.5 !px-5 !text-sm font-bold gap-2"
                onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t.navCta} <ArrowRight className="w-4 h-4" />
              </ShimmerButton>
            </div>
          </div>
        </nav>

        {/* ═══════════ HERO ═══════════ */}
        <section className="hero-section relative min-h-screen flex items-end pb-24 md:pb-32 overflow-hidden">
          <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80" alt="Corporate tower" className="hero-bg-img w-full h-full object-cover" />
            <div className="hero-gradient absolute inset-0" />
          </div>
          <div className="section-container relative z-10 max-w-5xl">
            <p className="hero-animate flex items-center gap-3 uppercase tracking-[0.2em] text-accent text-xs font-bold mb-8">
              <span className="w-10 h-[2px] bg-accent" />
              <AnimatedShinyText shimmerWidth={120} className="text-accent">{t.heroTag}</AnimatedShinyText>
            </p>
            <h1 className="hero-animate font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-4">{t.heroH1a}</h1>
            <h1 className="hero-animate font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl italic font-normal text-text-muted leading-[1] mb-8">{t.heroH1b}</h1>
            <p className="hero-animate text-lg md:text-xl text-text-muted max-w-2xl leading-relaxed mb-10">{t.heroSub}</p>

            <div className="hero-animate grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10 max-w-3xl">
              {t.heroProfiles.map((p, i) => {
                const PIcon = profileIcons[i];
                return (
                  <a href="#form" key={i} className="group bg-surface/60 backdrop-blur-sm border border-white/5 rounded-3xl p-5 hover:border-accent/30 hover:bg-surface/80 transition-all duration-300">
                    <PIcon className="w-5 h-5 text-accent mb-3" />
                    <div className="font-display text-sm font-bold text-white mb-1">{p.label}</div>
                    <div className="text-xs text-text-dim leading-relaxed">{p.sub}</div>
                  </a>
                );
              })}
            </div>

            <div className="hero-animate flex flex-wrap gap-4">
              <ShimmerButton
                shimmerColor="#F59E0B"
                shimmerSize="2px"
                shimmerDuration="3s"
                background="rgba(217, 119, 6, 1)"
                borderRadius="100px"
                className="!px-8 !py-4 text-base font-bold gap-2"
                onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                {t.heroCta} <ArrowRight className="w-5 h-5" />
              </ShimmerButton>
              <a href="#programs" className="btn-outline text-base">{t.heroCtaAlt}</a>
            </div>
          </div>
        </section>

        {/* ═══════════ TRUST BAND ═══════════ */}
        <section className="relative z-10 -mt-1 border-y border-white/5 bg-surface/50 backdrop-blur-sm">
          <div className="section-container py-10">
            <p className="text-center text-sm text-text-dim mb-8 font-data uppercase tracking-widest">{t.trustDesc}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
              <Stat value={145} label={t.trustLabels[0]} />
              <Stat value={42000} label={t.trustLabels[1]} />
              <Stat value={0} suffix="" label={t.trustLabels[2]} prefix="$" />
              <Stat value={100} suffix="%" label={t.trustLabels[3]} />
            </div>
          </div>
        </section>

        {/* ═══════════ PROGRAMS ═══════════ */}
        <section id="programs" className="py-32 md:py-40">
          <div className="section-container">
            <BlurFade inView>
              <div className="max-w-3xl mb-20">
                <div className="hr-amber mb-6" />
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] mb-6">
                  {t.progTitle}{' '}<span className="font-serif italic font-normal text-accent">{t.progAccent}</span>
                </h2>
                <p className="text-xl text-text-muted leading-relaxed">{t.progSub}</p>
              </div>
            </BlurFade>
            <div className="grid md:grid-cols-2 gap-6">
              {t.progCards.map((c, i) => (
                <ServiceCard key={i} icon={cardIcons[i]} title={c.title} desc={c.desc} cta={c.cta} delay={i * 0.1} featured={i === 2} />
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════ LEÓN 360° ═══════════ */}
        <section id="leon360" className="relative py-32 md:py-40 bg-surface/30 border-y border-white/5 overflow-hidden">
          <DotPattern className="opacity-15 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]" />
          <div className="section-container relative z-10">
            <BlurFade inView>
              <div className="max-w-3xl mb-16">
                <div className="hr-amber mb-6" />
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] mb-6">
                  {t.leonTitle}{' '}<span className="font-serif italic font-normal text-accent">{t.leonAccent}</span>
                </h2>
                <p className="text-xl text-text-muted leading-relaxed">{t.leonSub}</p>
              </div>
            </BlurFade>
            <Leon360 />
          </div>
        </section>

        {/* ═══════════ EXPAT HUB ═══════════ */}
        <section id="hub" className="py-32 md:py-40">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <BlurFade inView>
                <span className="inline-block px-3 py-1 rounded-full text-[10px] font-data font-bold uppercase tracking-widest bg-accent/10 text-accent mb-6">{t.hubTag}</span>
                <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.05] mb-4">{t.hubH2}</h2>
                <h2 className="font-serif text-3xl md:text-4xl italic font-normal text-accent mb-8">{t.hubAccent}</h2>
                <p className="text-lg text-text-muted leading-relaxed mb-10">{t.hubDesc}</p>
                <div className="space-y-6 mb-10">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0"><Lock className="w-5 h-5 text-accent" /></div>
                    <div><h4 className="font-display text-sm font-bold text-white mb-1">{t.hubF1}</h4><p className="text-sm text-text-muted">{t.hubF1d}</p></div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0"><Calendar className="w-5 h-5 text-accent" /></div>
                    <div><h4 className="font-display text-sm font-bold text-white mb-1">{t.hubF2}</h4><p className="text-sm text-text-muted">{t.hubF2d}</p></div>
                  </div>
                </div>
                <ShimmerButton
                  shimmerColor="#F59E0B"
                  shimmerSize="2px"
                  shimmerDuration="3s"
                  background="rgba(217, 119, 6, 1)"
                  borderRadius="100px"
                  className="!px-8 !py-4 text-base font-bold gap-2"
                  onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {t.hubCta} <ArrowRight className="w-5 h-5" />
                </ShimmerButton>
              </BlurFade>
              <BlurFade inView delay={0.15}>
                <div className="relative bg-surface rounded-4xl border border-white/5 p-6 shadow-2xl transform hover:scale-[1.01] transition-transform duration-700 overflow-hidden">
                  <BorderBeam size={200} duration={15} colorFrom="#D97706" colorTo="#F1F5F9" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/5">
                      <div className="flex gap-1.5"><div className="w-3 h-3 rounded-full bg-red-500/70" /><div className="w-3 h-3 rounded-full bg-yellow-500/70" /><div className="w-3 h-3 rounded-full bg-green-500/70" /></div>
                      <div className="ml-4 font-data text-xs text-text-dim bg-background rounded-lg px-3 py-1">app.bajiorelocate.com/dashboard</div>
                    </div>
                    <div className="space-y-3">
                      {[
                        { name: 'K. Tanaka — Temporary Residency', status: 'IN PROGRESS', statusColor: 'text-accent bg-accent/10', border: 'border-l-accent', sub: 'Awaiting INM Response · Day 12' },
                        { name: 'School Enrollment — Colegio Alemán', status: 'COMPLETED', statusColor: 'text-green-400 bg-green-500/10', border: 'border-l-green-500', sub: 'Confirmed · Aug 25th enrollment' },
                        { name: 'Bank Account — Scotiabank León', status: 'SCHEDULED', statusColor: 'text-blue-400 bg-blue-500/10', border: 'border-l-blue-500', sub: 'Tomorrow 10:00 AM · Branch Zona Centro' },
                        { name: 'Housing — Gran Jardín Visit', status: 'PENDING', statusColor: 'text-text-dim bg-surface-light', border: 'border-l-surface-light', sub: '3 properties shortlisted' },
                      ].map((row, i) => (
                        <div key={i} className={`flex items-center justify-between p-4 bg-background rounded-2xl border-l-[3px] ${row.border}`}>
                          <div><div className="text-sm font-bold text-white">{row.name}</div><div className="text-xs font-data text-text-dim mt-1">{row.sub}</div></div>
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-data font-bold uppercase tracking-wider shrink-0 ${row.statusColor}`}>{row.status}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </BlurFade>
            </div>
          </div>
        </section>

        {/* ═══════════ CASE STUDIES ═══════════ */}
        <section className="py-32 md:py-40 bg-surface/30 border-y border-white/5">
          <div className="section-container">
            <BlurFade inView>
              <div className="max-w-3xl mb-16">
                <div className="hr-amber mb-6" />
                <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.05] mb-4">
                  {t.casesH2a}{' '}<span className="font-serif italic font-normal text-accent">{t.casesH2b}</span>
                </h2>
                <p className="text-lg text-text-muted">{t.casesSub}</p>
              </div>
            </BlurFade>
            <div className="grid lg:grid-cols-3 gap-6">
              {['🇯🇵', '🇩🇪', '🇺🇸'].map((flag, i) => (
                <BlurFade key={i} inView delay={i * 0.1}>
                  <CaseCard flag={flag} {...t.cases[i]} />
                </BlurFade>
              ))}
            </div>
            <BlurFade inView delay={0.3}>
              <div className="text-center mt-16">
                <ShimmerButton
                  shimmerColor="#F59E0B"
                  shimmerSize="2px"
                  shimmerDuration="3s"
                  background="rgba(217, 119, 6, 1)"
                  borderRadius="100px"
                  className="!px-8 !py-4 text-base font-bold gap-2"
                  onClick={() => document.getElementById('form')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  {t.casesCta} <ArrowRight className="w-5 h-5" />
                </ShimmerButton>
              </div>
            </BlurFade>
          </div>
        </section>

        {/* ═══════════ ABOUT / VALUES ═══════════ */}
        <section className="py-32 md:py-40">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
              <BlurFade inView>
                <div className="hr-amber mb-6" />
                <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.05] mb-4">{t.aboutH2a}</h2>
                <h2 className="font-serif text-3xl md:text-4xl italic font-normal text-accent mb-8">{t.aboutH2b}</h2>
                <p className="text-lg text-text-muted leading-relaxed mb-8">{t.aboutP1}</p>
                <p className="text-text-muted leading-relaxed">{t.aboutP2}</p>
              </BlurFade>
              <div className="space-y-6">
                {t.values.map((v, i) => {
                  const VIcon = valueIcons[i];
                  return (
                    <BlurFade key={i} inView delay={i * 0.08}>
                      <ShineBorder
                        borderRadius={24}
                        borderWidth={1}
                        duration={18}
                        color={['#D97706', '#F1F5F9', '#D97706']}
                      >
                        <div className="flex items-start gap-5 p-6">
                          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0"><VIcon className="w-6 h-6 text-accent" /></div>
                          <div><h4 className="font-display text-lg font-bold text-white mb-1">{v.title}</h4><p className="text-text-muted text-sm leading-relaxed">{v.desc}</p></div>
                        </div>
                      </ShineBorder>
                    </BlurFade>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ FORM ═══════════ */}
        <section id="form" className="py-32 md:py-40 bg-surface/30 border-y border-white/5">
          <div className="section-container max-w-3xl">
            <BlurFade inView>
              <div className="text-center mb-12">
                <div className="hr-amber mx-auto mb-6" />
                <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">{t.formH2a}{' '}<span className="font-serif italic font-normal text-accent">{t.formH2b}</span></h2>
                <p className="text-lg text-text-muted">{t.formSub}</p>
              </div>
            </BlurFade>
            <BlurFade inView delay={0.1}>
              <form className="relative bg-surface rounded-5xl border border-white/5 p-8 md:p-12 shadow-2xl overflow-hidden" onSubmit={e => { e.preventDefault(); alert(t.formAlert); }}>
                <BorderBeam size={250} duration={20} colorFrom="#D97706" colorTo="#F59E0B" />
                <div className="relative z-10">
                  <div className="grid md:grid-cols-2 gap-5 mb-5">
                    <input type="text" placeholder={t.formName} required className="w-full bg-background border border-white/5 rounded-2xl px-5 py-4 text-white placeholder:text-text-dim focus:outline-none focus:border-accent/50 transition-colors" />
                    <input type="email" placeholder={t.formEmail} required className="w-full bg-background border border-white/5 rounded-2xl px-5 py-4 text-white placeholder:text-text-dim focus:outline-none focus:border-accent/50 transition-colors" />
                  </div>
                  <div className="grid md:grid-cols-2 gap-5 mb-5">
                    <select className="w-full bg-background border border-white/5 rounded-2xl px-5 py-4 text-text-dim focus:outline-none focus:border-accent/50 transition-colors appearance-none">
                      <option value="">{t.formProfile}</option>
                      {t.formProfileOpts.map(o => <option key={o}>{o}</option>)}
                    </select>
                    <select className="w-full bg-background border border-white/5 rounded-2xl px-5 py-4 text-text-dim focus:outline-none focus:border-accent/50 transition-colors appearance-none">
                      <option value="">{t.formTimeline}</option>
                      {t.formTimelineOpts.map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                  <textarea placeholder={t.formDetails} rows={3} className="w-full bg-background border border-white/5 rounded-2xl px-5 py-4 text-white placeholder:text-text-dim focus:outline-none focus:border-accent/50 transition-colors mb-5 resize-none" />
                  <ShimmerButton
                    shimmerColor="#F59E0B"
                    shimmerSize="2px"
                    shimmerDuration="3s"
                    background="rgba(217, 119, 6, 1)"
                    borderRadius="16px"
                    className="w-full !py-4 text-lg font-bold gap-2"
                    type="submit"
                  >
                    {t.formCta} <ArrowRight className="w-5 h-5" />
                  </ShimmerButton>
                  <p className="flex items-center justify-center gap-2 text-sm text-text-dim mt-6"><Lock className="w-4 h-4 text-accent" /> {t.formTrust}</p>
                </div>
              </form>
            </BlurFade>
          </div>
        </section>

        {/* ═══════════ FOOTER ═══════════ */}
        <footer className="border-t border-white/5 bg-background">
          <div className="section-container py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="font-display font-bold text-2xl tracking-tight mb-4">BAJÍO<span className="text-accent ml-1">RELOCATE</span></div>
              <p className="text-text-dim text-sm max-w-xs mb-4">{t.footerDesc}</p>
              <p className="text-xs font-data text-text-dim mb-6">Torre Corporativa Puerta Bajío, León, Gto.</p>
              <div className="flex items-center gap-2 font-data text-xs text-green-400"><div className="w-2 h-2 rounded-full bg-green-400 animate-pulse-slow" /> {t.footerStatus}</div>
            </div>
            <div>
              <h4 className="text-xs font-display font-bold uppercase tracking-widest text-text-muted mb-4">{t.footerProg}</h4>
              <ul className="space-y-2.5 text-sm text-text-dim">
                {['Soft Landing', 'Family First', 'VIP Concierge', 'Immigrant Status'].map(l => <li key={l}><a href="#programs" className="hover:text-white transition-colors">{l}</a></li>)}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-display font-bold uppercase tracking-widest text-text-muted mb-4">{t.footerCompany}</h4>
              <ul className="space-y-2.5 text-sm text-text-dim">
                {t.footerLinks.map(l => <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>)}
                <li className="flex items-center gap-2 pt-2"><Phone className="w-4 h-4" /> +52 477 xxx xxxx</li>
              </ul>
            </div>
          </div>
          <div className="section-container pb-8">
            <div className="border-t border-white/5 pt-8 text-center text-xs text-text-dim font-data">© {new Date().getFullYear()} Bajío Relocate. {t.footerCopy}</div>
          </div>
        </footer>

        {/* ═══════════ WHATSAPP ═══════════ */}
        <div className="fixed bottom-6 right-6 z-50 group">
          <div className="absolute bottom-full right-0 mb-2 px-4 py-2 bg-surface rounded-xl border border-white/5 text-xs text-white font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">{t.waTooltip}</div>
          <a href={`https://wa.me/5211234567890?text=${encodeURIComponent(t.waMsg)}`} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-xl shadow-green-900/30 transition-transform hover:scale-110 text-white">
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.662-2.062-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
          </a>
        </div>
      </div>
    </LangContext.Provider>
  );
}
