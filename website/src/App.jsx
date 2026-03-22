import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight, Shield, Users, FileWarning, Eye,
  MapPin, CheckCircle, Lock, Calendar, Phone, Building2
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
    navWhat: 'What we do', navProg: 'Programs', navRoi: 'ROI', navHub: 'Expat Hub',
    navCta: 'Request Assessment',
    heroTag: 'Corporate Relocation · León, Guanajuato',
    heroH1a: 'You invested too much',
    heroH1b: 'to lose them for lack of local support.',
    heroSub: "We are the boutique firm your Japanese, German, and North American executives need from the day they land in León. Proven process. Proprietary technology. Local consultant who knows every procedure.",
    heroCta: 'Talk to a consultant today',
    heroCtaAlt: 'View programs',
    trustLabels: ['Japanese companies in GTO', 'Foreign residents', 'Immigration fines', 'First-year retention'],
    probTitle: 'The hidden cost of a',
    probAccent: 'failed relocation.',
    probSub: 'Bringing an international executive to Bajío costs between $200,000 and $500,000 USD. When the relocation fails — and it fails for reasons that have nothing to do with the job — that entire budget disappears.',
    painCards: [
      { title: 'No tax ID or bank account for weeks', desc: "The executive can't function. The company loses weeks of productivity while they fight bureaucracy instead of running the plant." },
      { title: 'Family not integrated', desc: "The spouse is isolated. Kids don't get into the right school. By month four, the executive starts looking for a way to go back." },
      { title: 'Poorly managed immigration', desc: 'One expired date or wrong document can result in a fine, travel restriction, or a severe legal incident for your entire operation.' },
      { title: 'No visibility for HR', desc: "You're managing from Tokyo or Frankfurt with no idea what's happening in León. Problems arrive when it's already too late to fix them." },
    ],
    solH2a: 'A local consultant with a system.',
    solAccent: 'For every stage.',
    solP1: 'We are not a moving company or a law firm. We are the León expert your executives need to function, settle in, and stay — and the system you need to sleep soundly.',
    solP2: "We know the admissions director at the Colegio Alemán. We know which bank manager processes accounts for expats with no local credit history. We have direct access at the INM offices. And we document every step in a portal you can check from any device, in any time zone.",
    solQuote: '"We relocated eight engineers and their families to Puerto Interior in 45 days. None of them resigned in the first year. A process that normally takes us four months was resolved in six weeks."',
    solAuthor: '— HR Director, Japanese automotive sector company, Guanajuato',
    progH2a: 'Four programs.',
    progAccent: 'One goal: make them stay.',
    programs: [
      { name: 'Soft Landing', tag: '15 Days to Autonomy', price: '$2,500', unit: 'USD / assignee', features: "Tax ID · Bank account · Driver's license · Urban orientation. Executive operational in León within 15 days.", problem: "It's been three weeks and they can't do anything alone." },
      { name: 'Family First', tag: 'Integration Shield', price: '$4,000', unit: 'USD / family', features: 'Home search · International schools · Spousal support network · Community integration. Settled family. Executive who stays.', problem: 'His wife wants to go back home.' },
      { name: 'VIP Business Concierge', tag: 'C-Level Exclusive', price: '$8,000', unit: 'USD / 3 months', features: "Private security · Executive vehicle · Agenda management · Networking · 24/7 availability. The level of service their position demands.", problem: "They're a VP. They can't be dealing with this alone." },
      { name: 'Immigrant Status', tag: 'Zero Legal Risk', price: '$600', unit: 'USD / person', features: 'Work visa · Temporary/permanent residency · INM compliance · Document tracking. Zero fines. Zero surprises at the border.', problem: 'One immigration error and we have a legal incident.' },
    ],
    roiH2a: 'The calculation your finance team',
    roiAccent: 'needs to see.',
    roiSub: 'The question is not whether you can afford the service. It\'s whether you can afford not having it.',
    roiLabel: 'Executive relocation investment',
    roiRisk: 'Risk if they leave', roiCost: 'Bajío Relocate cost', roiPremium: 'Insurance premium',
    roiReplacement: 'Full replacement cost', roiJust: 'Just', roiAsset: 'of the asset',
    hubH2a: "You're managing from the other side of the world.",
    hubH2b: 'We give you eyes in León.',
    hubDesc: 'The Expat Hub is the private portal where every process is documented, every critical date is tracked, and every document is secured.',
    hubFeatures: ['Real-time immigration status tracking', 'Appointment agenda with assigned consultant', 'Document vault with bank-grade encryption', 'Automatic alerts before anything expires'],
    hubCta: 'See portal demo',
    casesH2a: 'Real results.',
    casesAccent: 'In Bajío.',
    cases: [
      { stat: '8 engineers · 45 days · 100% retention', desc: 'Japanese automotive manufacturing → Puerto Interior, Silao' },
      { stat: '2 C-Level directors · 10 days to lease', desc: 'Shared services / technology → León, North Zone' },
      { stat: '5 families · Zero resignations in year one', desc: 'Logistics and foreign trade → León, north corridor' },
    ],
    formH2: 'Do you have a relocation in the next 90 days?',
    formSub: 'No commitment. No sales presentation. We simply assess whether we can help.',
    formName: 'Full Name', formEmail: 'Corporate Email',
    formRole: 'I am a...', formRoleOpts: ['HR Director', 'Expat Executive', 'Industrial Park'],
    formPhone: 'WhatsApp / Phone',
    formCta: 'Request free assessment',
    formTrust: 'Confidential · No spam · Response within 2 business hours',
    formAlert: 'Thank you — we will respond within 2 business hours.',
    footerDesc: "Corporate relocation concierge for international executives arriving to Mexico's Bajío industrial corridor.",
    footerHR: 'For HR Directors',
    footerHRLinks: ['Request a quote', 'Case studies', 'ROI Calculator', 'Expat Hub Login'],
    footerCompany: 'Company',
    footerCompanyLinks: ['About Us', 'Contact', 'Privacy Policy'],
    footerCopy: 'All rights reserved.',
    footerStatus: 'System Operational',
    waMsg: "Hello, Bajío Relocate team. I'm the HR Director at [company] and we have an upcoming relocation to León/Bajío. I'd like to speak with a consultant today.",
  },
  es: {
    navWhat: 'Qué hacemos', navProg: 'Programas', navRoi: 'ROI', navHub: 'Expat Hub',
    navCta: 'Solicitar Asesoría',
    heroTag: 'Relocalización Corporativa · León, Guanajuato',
    heroH1a: 'Invertiste demasiado',
    heroH1b: 'para perderlos por falta de apoyo local.',
    heroSub: 'Somos la firma boutique que tus ejecutivos japoneses, alemanes y norteamericanos necesitan desde el día que aterrizan en León. Proceso probado. Tecnología propia. Consultor local que conoce cada trámite.',
    heroCta: 'Habla con un consultor hoy',
    heroCtaAlt: 'Ver programas',
    trustLabels: ['Empresas japonesas en GTO', 'Residentes extranjeros', 'Multas migratorias', 'Retención primer año'],
    probTitle: 'El costo oculto de una',
    probAccent: 'relocalización fallida.',
    probSub: 'Traer un ejecutivo internacional al Bajío cuesta entre $200,000 y $500,000 USD. Cuando la relocalización falla — y falla por razones que nada tienen que ver con el trabajo — todo ese presupuesto desaparece.',
    painCards: [
      { title: 'Sin RFC ni cuenta bancaria por semanas', desc: 'El ejecutivo no puede funcionar. La empresa pierde semanas de productividad mientras pelea con la burocracia en vez de operar la planta.' },
      { title: 'Familia sin integrar', desc: 'La esposa está aislada. Los hijos no entran al colegio correcto. Para el cuarto mes, el ejecutivo ya busca cómo regresar.' },
      { title: 'Migración mal gestionada', desc: 'Una fecha vencida o un documento incorrecto puede resultar en multa, restricción de viaje, o un incidente legal grave para toda tu operación.' },
      { title: 'Sin visibilidad para RR.HH.', desc: 'Estás gestionando desde Tokio o Fráncfort sin saber qué pasa en León. Los problemas llegan cuando ya es demasiado tarde para arreglarlos.' },
    ],
    solH2a: 'Un consultor local con sistema.',
    solAccent: 'Para cada etapa.',
    solP1: 'No somos una empresa de mudanzas ni un despacho legal. Somos el experto en León que tus ejecutivos necesitan para funcionar, adaptarse y quedarse — y el sistema que tú necesitas para dormir tranquilo.',
    solP2: 'Conocemos al director de admisiones del Colegio Alemán. Sabemos qué gerente bancario procesa cuentas de expatriados sin historial crediticio local. Tenemos acceso directo en las oficinas del INM. Y documentamos cada paso en un portal que puedes consultar desde cualquier dispositivo, en cualquier zona horaria.',
    solQuote: '"Reubicamos a ocho ingenieros y sus familias en Puerto Interior en 45 días. Ninguno renunció en el primer año. Un proceso que normalmente nos lleva cuatro meses se resolvió en seis semanas."',
    solAuthor: '— Director de RR.HH., empresa del sector automotriz japonés, Guanajuato',
    progH2a: 'Cuatro programas.',
    progAccent: 'Un objetivo: que se queden.',
    programs: [
      { name: 'Soft Landing', tag: '15 Días a la Autonomía', price: '$2,500', unit: 'USD / asignado', features: 'RFC · Cuenta bancaria · Licencia de conducir · Orientación urbana. Ejecutivo operativo en León en 15 días.', problem: 'Llevan tres semanas y no pueden hacer nada solos.' },
      { name: 'Family First', tag: 'Escudo de Integración', price: '$4,000', unit: 'USD / familia', features: 'Búsqueda de vivienda · Colegios internacionales · Red de apoyo al cónyuge · Integración comunitaria. Familia adaptada. Ejecutivo que se queda.', problem: 'Su esposa quiere regresar.' },
      { name: 'VIP Business Concierge', tag: 'Exclusivo C-Level', price: '$8,000', unit: 'USD / 3 meses', features: 'Seguridad privada · Vehículo ejecutivo · Gestión de agenda · Networking · Disponibilidad 24/7. El nivel de servicio que su posición exige.', problem: 'Es VP. No puede estar lidiando con esto solo.' },
      { name: 'Immigrant Status', tag: 'Cero Riesgo Legal', price: '$600', unit: 'USD / persona', features: 'Visa de trabajo · Residencia temporal/permanente · Cumplimiento INM · Seguimiento documental. Cero multas. Cero sorpresas en la frontera.', problem: 'Un error migratorio y tenemos un incidente legal.' },
    ],
    roiH2a: 'El cálculo que tu equipo de finanzas',
    roiAccent: 'necesita ver.',
    roiSub: 'La pregunta no es si puedes pagar el servicio. Es si puedes permitirte no tenerlo.',
    roiLabel: 'Inversión en relocalización del ejecutivo',
    roiRisk: 'Riesgo si se va', roiCost: 'Costo Bajío Relocate', roiPremium: 'Prima de seguro',
    roiReplacement: 'Costo total de reemplazo', roiJust: 'Solo', roiAsset: 'del activo',
    hubH2a: 'Estás gestionando desde el otro lado del mundo.',
    hubH2b: 'Te damos ojos en León.',
    hubDesc: 'El Expat Hub es el portal privado donde cada proceso está documentado, cada fecha crítica está monitoreada, y cada documento está resguardado.',
    hubFeatures: ['Seguimiento migratorio en tiempo real', 'Agenda de citas con consultor asignado', 'Bóveda documental con encriptación bancaria', 'Alertas automáticas antes de cualquier vencimiento'],
    hubCta: 'Ver demo del portal',
    casesH2a: 'Resultados reales.',
    casesAccent: 'En el Bajío.',
    cases: [
      { stat: '8 ingenieros · 45 días · 100% retención', desc: 'Manufactura automotriz japonesa → Puerto Interior, Silao' },
      { stat: '2 directores C-Level · 10 días a contrato', desc: 'Servicios compartidos / tecnología → León, Zona Norte' },
      { stat: '5 familias · Cero renuncias en año uno', desc: 'Logística y comercio exterior → León, corredor norte' },
    ],
    formH2: '¿Tienes una relocalización en los próximos 90 días?',
    formSub: 'Sin compromiso. Sin presentación de ventas. Simplemente evaluamos si podemos ayudar.',
    formName: 'Nombre Completo', formEmail: 'Correo Corporativo',
    formRole: 'Soy...', formRoleOpts: ['Director de RR.HH.', 'Ejecutivo Expatriado', 'Parque Industrial'],
    formPhone: 'WhatsApp / Teléfono',
    formCta: 'Solicitar evaluación gratuita',
    formTrust: 'Confidencial · Sin spam · Respuesta en máximo 2 horas hábiles',
    formAlert: 'Gracias — responderemos en un máximo de 2 horas hábiles.',
    footerDesc: 'Concierge de relocalización corporativa para ejecutivos internacionales que llegan al corredor industrial del Bajío.',
    footerHR: 'Para Directores de RR.HH.',
    footerHRLinks: ['Solicitar cotización', 'Casos de éxito', 'Calculadora ROI', 'Expat Hub Login'],
    footerCompany: 'Empresa',
    footerCompanyLinks: ['Quiénes Somos', 'Contacto', 'Política de Privacidad'],
    footerCopy: 'Todos los derechos reservados.',
    footerStatus: 'Sistema Operativo',
    waMsg: 'Hola, equipo de Bajío Relocate. Soy Director de RR.HH. en [empresa] y tenemos una relocalización próxima a León/Bajío. Me gustaría hablar con un consultor hoy.',
  },
};

/* ─── STAT with NumberTicker ─── */
function Stat({ value, suffix = '+', label }) {
  if (value === 0) {
    return (
      <div className="text-center md:text-left">
        <span className="block font-display text-5xl md:text-6xl font-bold text-accent leading-none">$0</span>
        <span className="block mt-2 text-sm font-data text-text-muted uppercase tracking-widest">{label}</span>
      </div>
    );
  }
  return (
    <div className="text-center md:text-left">
      <span className="block font-display text-5xl md:text-6xl font-bold text-accent leading-none">
        <NumberTicker value={value} delay={0.3} />
        {suffix}
      </span>
      <span className="block mt-2 text-sm font-data text-text-muted uppercase tracking-widest">{label}</span>
    </div>
  );
}

/* ─── PAIN CARD with ShineBorder ─── */
function PainCard({ icon: Icon, title, desc, delay = 0 }) {
  return (
    <BlurFade inView delay={delay}>
      <ShineBorder
        borderRadius={24}
        borderWidth={1}
        duration={16}
        color={['#D97706', '#F1F5F9', '#D97706']}
        className="h-full"
      >
        <div className="p-8 h-full">
          <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
            <Icon className="w-7 h-7 text-accent" />
          </div>
          <h3 className="font-display text-xl font-bold text-white mb-3 leading-tight">{title}</h3>
          <p className="text-text-muted leading-relaxed">{desc}</p>
        </div>
      </ShineBorder>
    </BlurFade>
  );
}

/* ─── PROGRAM CARD with BorderBeam on featured ─── */
function ProgramCard({ name, tag, price, unit, problem, features, featured = false }) {
  return (
    <div className={`relative overflow-hidden rounded-4xl border p-8 md:p-10 transition-all duration-500 ${featured ? 'bg-gradient-to-br from-accent/10 to-accent/5 border-accent/30 shadow-lg shadow-accent/5' : 'bg-surface border-white/5 hover:border-accent/20'}`}>
      {featured && <BorderBeam size={250} duration={12} colorFrom="#D97706" colorTo="#F59E0B" delay={0} />}
      {featured && <div className="absolute top-0 right-0 w-40 h-40 bg-accent/10 blur-[80px] pointer-events-none" />}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="font-display text-2xl font-bold text-white mb-2">{name}</h3>
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-data font-bold uppercase tracking-wider ${featured ? 'bg-accent text-black' : 'bg-surface-light text-accent'}`}>{tag}</span>
          </div>
          <div className="text-right">
            <div className="text-3xl font-display font-bold text-white">{price}</div>
            <div className="text-xs font-data text-text-dim">{unit}</div>
          </div>
        </div>
        <p className="text-text-muted mb-6 leading-relaxed">{features}</p>
        <div className="border-t border-white/5 pt-5">
          <p className="text-sm italic text-text-dim">"{problem}"</p>
        </div>
      </div>
    </div>
  );
}

/* ─── MAIN APP ─── */
export default function App() {
  const appRef = useRef(null);
  const [roi, setRoi] = useState(300000);
  const serviceCost = 12000;
  const pct = ((serviceCost / roi) * 100).toFixed(1);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState('en');
  const t = T[lang];

  const painIcons = [Shield, Users, FileWarning, Eye];
  const hubIcons = [CheckCircle, Calendar, Lock, Shield];

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
    <div ref={appRef} className="min-h-screen bg-background text-text-main font-body relative overflow-x-hidden">
      <div className="noise-overlay" />

      {/* ═══════════ NAVBAR ═══════════ */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-background/90 backdrop-blur-xl border-b border-white/5 py-4' : 'bg-transparent py-6'}`}>
        <div className="section-container flex items-center justify-between">
          <a href="#" className="font-display font-bold text-xl tracking-tight">
            BAJÍO<span className="text-accent ml-1">RELOCATE</span>
          </a>
          <div className="hidden md:flex items-center gap-10 text-sm font-medium text-text-muted">
            <a href="#problem" className="hover:text-white transition-colors">{t.navWhat}</a>
            <a href="#programs" className="hover:text-white transition-colors">{t.navProg}</a>
            <a href="#roi" className="hover:text-white transition-colors">{t.navRoi}</a>
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
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80" alt="" className="hero-bg-img w-full h-full object-cover" />
          <div className="hero-gradient absolute inset-0" />
        </div>
        <div className="section-container relative z-10 max-w-5xl">
          <p className="hero-animate flex items-center gap-3 uppercase tracking-[0.2em] text-accent text-xs font-bold mb-8">
            <span className="w-10 h-[2px] bg-accent" />
            <AnimatedShinyText shimmerWidth={120} className="text-accent">{t.heroTag}</AnimatedShinyText>
          </p>
          <h1 className="hero-animate font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-4">{t.heroH1a}</h1>
          <h1 className="hero-animate font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl italic font-normal text-text-muted leading-[1] mb-10">{t.heroH1b}</h1>
          <p className="hero-animate text-lg md:text-xl text-text-muted max-w-2xl leading-relaxed mb-12">{t.heroSub}</p>
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
        <div className="section-container py-16 grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
          <Stat value={145} label={t.trustLabels[0]} />
          <Stat value={42000} label={t.trustLabels[1]} />
          <Stat value={0} suffix="" label={t.trustLabels[2]} prefix="$" />
          <Stat value={100} suffix="%" label={t.trustLabels[3]} />
        </div>
      </section>

      {/* ═══════════ THE PROBLEM ═══════════ */}
      <section id="problem" className="py-32 md:py-40">
        <div className="section-container">
          <BlurFade inView delay={0}>
            <div className="max-w-3xl mb-20">
              <div className="hr-amber mb-6" />
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] mb-6">
                {t.probTitle}{' '}<span className="font-serif italic font-normal text-accent">{t.probAccent}</span>
              </h2>
              <p className="text-xl text-text-muted leading-relaxed">{t.probSub}</p>
            </div>
          </BlurFade>
          <div className="grid md:grid-cols-2 gap-6">
            {t.painCards.map((c, i) => (
              <PainCard key={i} icon={painIcons[i]} title={c.title} desc={c.desc} delay={i * 0.08} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ THE SOLUTION ═══════════ */}
      <section className="relative py-32 md:py-40 overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=80" alt="" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />
        </div>
        {/* DotPattern behind testimonial */}
        <DotPattern className="opacity-20 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]" />
        <div className="section-container relative z-10 max-w-4xl">
          <BlurFade inView>
            <div className="hr-amber mb-6" />
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] mb-8">
              {t.solH2a}{' '}<span className="font-serif italic font-normal text-accent">{t.solAccent}</span>
            </h2>
            <div className="space-y-6 text-lg text-text-muted leading-relaxed">
              <p>{t.solP1}</p>
              <p className="text-white">{t.solP2}</p>
            </div>
          </BlurFade>
          <BlurFade inView delay={0.2}>
            <blockquote className="mt-16 pl-8 border-l-2 border-accent">
              <p className="font-serif text-2xl md:text-3xl italic text-white leading-snug mb-6">{t.solQuote}</p>
              <cite className="block font-data text-sm text-text-dim not-italic">{t.solAuthor}</cite>
            </blockquote>
          </BlurFade>
        </div>
      </section>

      {/* ═══════════ PROGRAMS ═══════════ */}
      <section id="programs" className="py-32 md:py-40">
        <div className="section-container">
          <BlurFade inView>
            <div className="max-w-3xl mb-20">
              <div className="hr-amber mb-6" />
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05]">
                {t.progH2a}{' '}<span className="font-serif italic font-normal text-accent">{t.progAccent}</span>
              </h2>
            </div>
          </BlurFade>
          <div className="grid md:grid-cols-2 gap-6">
            {t.programs.map((p, i) => (
              <BlurFade key={i} inView delay={i * 0.1}>
                <ProgramCard {...p} featured={i === 2} />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ ROI ═══════════ */}
      <section id="roi" className="py-32 md:py-40 bg-surface/30 border-y border-white/5">
        <div className="section-container max-w-4xl">
          <BlurFade inView>
            <div className="text-center mb-16">
              <div className="hr-amber mx-auto mb-6" />
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.05] mb-6">
                {t.roiH2a}{' '}<span className="font-serif italic font-normal text-accent">{t.roiAccent}</span>
              </h2>
              <p className="text-lg text-text-muted">{t.roiSub}</p>
            </div>
          </BlurFade>
          <div className="relative bg-surface border border-white/5 rounded-5xl p-10 md:p-14 shadow-2xl overflow-hidden">
            <BorderBeam size={300} duration={18} colorFrom="#D97706" colorTo="#F59E0B" />
            <div className="relative z-10">
              <div className="mb-12">
                <label className="block text-xs font-data text-text-dim uppercase tracking-widest mb-6">{t.roiLabel}</label>
                <input type="range" min="100000" max="1000000" step="50000" value={roi} onChange={e => setRoi(Number(e.target.value))} className="w-full" />
                <div className="flex justify-between mt-3">
                  <span className="text-xs font-data text-text-dim">$100k</span>
                  <span className="text-2xl font-display font-bold text-white">${roi.toLocaleString()}</span>
                  <span className="text-xs font-data text-text-dim">$1M</span>
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-8 border-t border-white/5 pt-10">
                <div>
                  <div className="text-xs font-data text-text-dim uppercase tracking-widest mb-2">{t.roiRisk}</div>
                  <div className="text-4xl font-display font-bold text-red-400">${roi.toLocaleString()}</div>
                  <p className="text-sm text-text-dim mt-2">{t.roiReplacement}</p>
                </div>
                <div>
                  <div className="text-xs font-data text-text-dim uppercase tracking-widest mb-2">{t.roiCost}</div>
                  <div className="text-4xl font-display font-bold text-accent">${serviceCost.toLocaleString()}</div>
                  <p className="text-sm text-green-500 mt-2">{t.roiJust} {pct}% {t.roiAsset}</p>
                </div>
                <div className="flex items-center">
                  <div className="bg-accent/10 border border-accent/20 rounded-3xl p-6 text-center w-full">
                    <div className="text-xs font-data text-accent uppercase tracking-widest mb-2">{t.roiPremium}</div>
                    <div className="text-5xl font-display font-bold text-accent">{pct}%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ EXPAT HUB ═══════════ */}
      <section id="hub" className="py-32 md:py-40">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <BlurFade inView>
              <div className="hr-amber mb-6" />
              <h2 className="font-display text-4xl md:text-5xl font-bold leading-[1.05] mb-4">{t.hubH2a}</h2>
              <h2 className="font-serif text-3xl md:text-4xl italic font-normal text-accent mb-8">{t.hubH2b}</h2>
              <p className="text-lg text-text-muted leading-relaxed mb-10">{t.hubDesc}</p>
              <ul className="space-y-5 mb-10">
                {t.hubFeatures.map((text, i) => {
                  const HIcon = hubIcons[i];
                  return (
                    <li key={i} className="flex items-start gap-4 text-white">
                      <HIcon className="w-5 h-5 text-accent mt-0.5 shrink-0" /><span>{text}</span>
                    </li>
                  );
                })}
              </ul>
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
            <div className="text-center mb-16">
              <div className="hr-amber mx-auto mb-6" />
              <h2 className="font-display text-4xl md:text-5xl font-bold">
                {t.casesH2a} <span className="font-serif italic font-normal text-accent">{t.casesAccent}</span>
              </h2>
            </div>
          </BlurFade>
          <div className="grid md:grid-cols-3 gap-6">
            {['🇯🇵', '🇩🇪', '🇺🇸'].map((flag, i) => (
              <BlurFade key={i} inView delay={i * 0.1}>
                <ShineBorder
                  borderRadius={24}
                  borderWidth={1}
                  duration={14}
                  color={['#D97706', '#F1F5F9', '#D97706']}
                  className="h-full"
                >
                  <div className="p-8 text-center">
                    <div className="text-5xl mb-4">{flag}</div>
                    <h3 className="font-display text-lg font-bold text-white mb-3 leading-tight">{t.cases[i].stat}</h3>
                    <p className="text-sm text-text-muted">{t.cases[i].desc}</p>
                  </div>
                </ShineBorder>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FORM ═══════════ */}
      <section id="form" className="py-32 md:py-40">
        <div className="section-container max-w-3xl">
          <BlurFade inView>
            <div className="text-center mb-12">
              <div className="hr-amber mx-auto mb-6" />
              <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">{t.formH2}</h2>
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
                    <option value="">{t.formRole}</option>
                    {t.formRoleOpts.map(o => <option key={o}>{o}</option>)}
                  </select>
                  <input type="tel" placeholder={t.formPhone} required className="w-full bg-background border border-white/5 rounded-2xl px-5 py-4 text-white placeholder:text-text-dim focus:outline-none focus:border-accent/50 transition-colors" />
                </div>
                <ShimmerButton
                  shimmerColor="#F59E0B"
                  shimmerSize="2px"
                  shimmerDuration="3s"
                  background="rgba(217, 119, 6, 1)"
                  borderRadius="16px"
                  className="w-full !py-4 text-lg font-bold gap-2 mt-2"
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
            <p className="text-text-dim text-sm max-w-xs mb-6">{t.footerDesc}</p>
            <div className="flex items-center gap-2 font-data text-xs text-green-400"><div className="w-2 h-2 rounded-full bg-green-400 animate-pulse-slow" /> {t.footerStatus}</div>
          </div>
          <div>
            <h4 className="text-xs font-display font-bold uppercase tracking-widest text-text-muted mb-4">{t.footerHR}</h4>
            <ul className="space-y-2.5 text-sm text-text-dim">
              {t.footerHRLinks.map(l => <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>)}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-display font-bold uppercase tracking-widest text-text-muted mb-4">{t.footerCompany}</h4>
            <ul className="space-y-2.5 text-sm text-text-dim">
              {t.footerCompanyLinks.map(l => <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>)}
              <li className="flex items-center gap-2 pt-2"><Phone className="w-4 h-4" /> +52 477 xxx xxxx</li>
            </ul>
          </div>
        </div>
        <div className="section-container pb-8">
          <div className="border-t border-white/5 pt-8 text-center text-xs text-text-dim font-data">© {new Date().getFullYear()} Bajío Relocate. {t.footerCopy}</div>
        </div>
      </footer>

      {/* ═══════════ WHATSAPP ═══════════ */}
      <a href={`https://wa.me/5211234567890?text=${encodeURIComponent(t.waMsg)}`} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-xl shadow-green-900/30 z-50 transition-transform hover:scale-110 text-white">
        <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.662-2.062-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
      </a>
    </div>
  );
}
