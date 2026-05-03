import { useState } from "react";

const C = {
  bg: "#080808",
  surface: "#111111",
  green: "#CCFF00",
  pink: "#E6007E",
  white: "#FFFFFF",
  gray: "#777777",
  dim: "#444444",
  dimmer: "#2a2a2a",
};

function LogoSymbol({ size = 32 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="22" cy="30" r="14" fill={C.green} />
      <circle cx="38" cy="30" r="14" fill={C.pink} />
      <circle cx="30" cy="30" r="6" fill={C.bg} />
    </svg>
  );
}

function PhaseCard({ phase, title, timeframe, color, children, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      className="rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
      style={{
        backgroundColor: C.surface,
        border: `1px solid ${isActive ? color + "40" : C.dimmer}`,
        opacity: isActive ? 1 : 0.6,
      }}
    >
      <div className="p-5 pb-3" style={{ background: isActive ? `linear-gradient(135deg, ${color}06 0%, transparent 60%)` : "none" }}>
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold tracking-widest px-2.5 py-1 rounded-full" style={{ backgroundColor: color, color: C.bg }}>
              {phase}
            </span>
            <span className="text-xs" style={{ color: C.dim }}>{timeframe}</span>
          </div>
          <span className="text-lg" style={{ color: isActive ? color : C.dim }}>
            {isActive ? "▾" : "▸"}
          </span>
        </div>
        <h3 className="text-lg font-bold mt-2" style={{ color: C.white, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {title}
        </h3>
      </div>
      {isActive && (
        <div className="px-5 pb-5">
          <div className="h-px mb-4" style={{ backgroundColor: C.dimmer }} />
          {children}
        </div>
      )}
    </div>
  );
}

function TaskItem({ task, detail, priority, done }) {
  const prioColors = { alta: C.pink, media: C.green, baja: C.dim };
  return (
    <div className="flex gap-3 items-start py-2">
      <div className="w-4 h-4 rounded flex-shrink-0 mt-0.5 flex items-center justify-center text-xs" style={{
        border: `1.5px solid ${done ? C.green : C.dim}`,
        color: done ? C.green : "transparent",
        backgroundColor: done ? `${C.green}10` : "transparent",
      }}>
        {done ? "✓" : ""}
      </div>
      <div className="flex-1">
        <p className="text-xs font-medium" style={{ color: C.white }}>{task}</p>
        {detail && <p className="text-xs mt-0.5" style={{ color: C.gray }}>{detail}</p>}
      </div>
      {priority && (
        <span className="text-xs px-1.5 py-0.5 rounded flex-shrink-0" style={{
          color: prioColors[priority],
          border: `1px solid ${prioColors[priority]}30`,
          fontSize: 9,
        }}>
          {priority}
        </span>
      )}
    </div>
  );
}

function BudgetItem({ item, cost, note }) {
  return (
    <div className="flex items-center justify-between py-2" style={{ borderBottom: `1px solid ${C.dimmer}` }}>
      <div>
        <p className="text-xs font-medium" style={{ color: C.white }}>{item}</p>
        {note && <p className="text-xs" style={{ color: C.dim }}>{note}</p>}
      </div>
      <span className="text-xs font-bold" style={{ color: C.green }}>{cost}</span>
    </div>
  );
}

function TipBox({ text, color = C.green }) {
  return (
    <div className="p-3 rounded-lg mt-3" style={{ backgroundColor: C.bg, borderLeft: `2px solid ${color}` }}>
      <p className="text-xs leading-relaxed" style={{ color: C.gray }}>{text}</p>
    </div>
  );
}

export default function LummaLaunchStrategy() {
  const [activePhase, setActivePhase] = useState(0);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />

      <div className="min-h-screen" style={{ backgroundColor: C.bg, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {/* Header */}
        <div className="px-5 pt-10 pb-6">
          <div className="flex items-center gap-3 mb-4">
            <LogoSymbol size={28} />
            <span className="text-xs font-bold tracking-widest" style={{ color: C.green }}>LUMMA</span>
          </div>
          <h1 className="text-3xl font-bold mb-1" style={{ color: C.white }}>
            Estrategia de{" "}
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: C.green }}>
              lanzamiento
            </span>
          </h1>
          <p className="text-sm leading-relaxed mt-2" style={{ color: C.gray }}>
            Plan de 30 días para salir al mercado, conseguir los primeros clientes y construir presencia. Prioridad: vender primero, pulir después.
          </p>
          <div className="flex gap-3 mt-4">
            {[
              { label: "Timeline", value: "30 días" },
              { label: "Budget", value: "$500–$1K" },
              { label: "Mercado", value: "Miami-Dade" },
            ].map(({ label, value }) => (
              <div key={label} className="px-3 py-2 rounded-lg" style={{ backgroundColor: C.surface }}>
                <p style={{ fontSize: 8, color: C.dim, letterSpacing: 2 }}>{label.toUpperCase()}</p>
                <p className="text-xs font-bold" style={{ color: C.white }}>{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline visual */}
        <div className="px-5 mb-6">
          <div className="flex gap-1">
            {[
              { label: "S1", color: C.pink, w: "20%" },
              { label: "S2", color: C.green, w: "25%" },
              { label: "S3–4", color: C.green, w: "55%" },
            ].map((s, i) => (
              <div
                key={s.label}
                className="h-1.5 rounded-full cursor-pointer transition-all"
                style={{
                  width: s.w,
                  backgroundColor: activePhase === i ? s.color : `${s.color}30`,
                }}
                onClick={() => setActivePhase(i)}
              />
            ))}
          </div>
          <div className="flex justify-between mt-1">
            <span style={{ fontSize: 8, color: C.dim }}>Día 1</span>
            <span style={{ fontSize: 8, color: C.dim }}>Día 30</span>
          </div>
        </div>

        {/* Phases */}
        <div className="px-5 pb-6 space-y-4">
          {/* PHASE 1 */}
          <PhaseCard
            phase="FASE 1"
            title="Montar la base y activar contactos"
            timeframe="Días 1–7"
            color={C.pink}
            isActive={activePhase === 0}
            onClick={() => setActivePhase(activePhase === 0 ? -1 : 0)}
          >
            <p className="text-xs mb-3" style={{ color: C.gray }}>
              Objetivo: tener presencia mínima viable y enviar el primer mensaje a tus contactos calientes. No necesitas que todo esté perfecto — necesitas estar en el mercado.
            </p>

            <p className="text-xs tracking-widest mb-2 mt-4" style={{ color: C.pink }}>PRESENCIA MÍNIMA VIABLE</p>
            <TaskItem task="Crear cuenta de Instagram @lumma.studio" detail="Bio clara: qué haces + para quién + CTA (link o DM)" priority="alta" />
            <TaskItem task="Publicar 6–9 posts de lanzamiento" detail="3 de identidad (quiénes somos, qué hacemos, cómo trabajamos) + 3 de valor (tips, insights del rubro) + 3 de portafolio o mockups" priority="alta" />
            <TaskItem task="Configurar link en bio" detail="Linktree o similar con: servicios, WhatsApp/contacto, portafolio" priority="alta" />
            <TaskItem task="Crear cuenta de Google Business" detail="Para búsquedas locales en Miami-Dade. Gratuito y esencial." priority="media" />
            <TaskItem task="Comprar dominio lumma.studio o similar" detail="No necesitas web completa todavía — redirige a tu link en bio o a una landing simple" priority="media" />

            <p className="text-xs tracking-widest mb-2 mt-5" style={{ color: C.pink }}>ACTIVACIÓN DE CONTACTOS</p>
            <TaskItem task="Lista de 20–30 contactos calientes" detail="Personas que conoces en Miami que tienen negocio o trabajan en marketing. No importa si no son amigos cercanos." priority="alta" />
            <TaskItem task="Mensaje personalizado a cada uno" detail="No vendas directamente. Anuncia que lanzaste Lumma, explica brevemente qué haces, pregunta si conocen a alguien que necesite contenido." priority="alta" />
            <TaskItem task="Oferta de lanzamiento" detail="Para los primeros 3 clientes: 20% off en el primer mes de Social Media o Branding Spark a $499. Esto genera urgencia y primeros casos de estudio." priority="alta" />
            <TaskItem task="Preparar propuesta rápida en PDF" detail="1 página con servicios, precios y CTA. Algo limpio que puedas enviar por WhatsApp o email en el momento." priority="alta" />

            <TipBox text="La oferta de lanzamiento no es regalar tu trabajo — es invertir en portafolio. Los primeros 2–3 proyectos son tu evidencia. Trátalo como una inversión con fecha de expiración." color={C.pink} />
          </PhaseCard>

          {/* PHASE 2 */}
          <PhaseCard
            phase="FASE 2"
            title="Primeros clientes y contenido propio"
            timeframe="Días 8–14"
            color={C.green}
            isActive={activePhase === 1}
            onClick={() => setActivePhase(activePhase === 1 ? -1 : 1)}
          >
            <p className="text-xs mb-3" style={{ color: C.gray }}>
              Objetivo: cerrar al menos 1–2 clientes y empezar a generar contenido de Lumma que demuestre que practicas lo que predicas.
            </p>

            <p className="text-xs tracking-widest mb-2 mt-4" style={{ color: C.green }}>VENTA DIRECTA</p>
            <TaskItem task="Follow up a contactos que no respondieron" detail="Segundo mensaje breve, sin presión. '¿Viste lo que te envié? Si conoces a alguien que le sirva, pásale mi perfil.'" priority="alta" />
            <TaskItem task="Hacer llamada/reunión con interesados" detail="No envíes cotización sin hablar primero. Entiende su necesidad, presenta la solución y cierra en la misma llamada." priority="alta" />
            <TaskItem task="Cerrar primer proyecto" detail="Ideal: un Branding Spark ($499 con descuento de lanzamiento) o Social Media Spark. Lo que cierre primero." priority="alta" />
            <TaskItem task="Networking presencial" detail="1–2 eventos de negocios o meetups en Miami. Cámaras de comercio hispanas, coworking events, industry meetups." priority="media" />

            <p className="text-xs tracking-widest mb-2 mt-5" style={{ color: C.green }}>CONTENIDO PROPIO DE LUMMA</p>
            <TaskItem task="Publicar 3–4 posts por semana" detail="Alterna entre: valor educativo (tips de contenido/branding), behind the scenes de tu proceso, y casos/resultados." priority="alta" />
            <TaskItem task="Stories diarias" detail="Muestra tu día a día: creando contenido, trabajando en proyectos, viviendo Miami. Humaniza la marca." priority="media" />
            <TaskItem task="1 Reel de alto valor" detail="Un tip práctico de contenido o branding en 30–60 segundos. Usa el recurso tipográfico de Lumma en la portada." priority="media" />

            <TipBox text="Tu propio Instagram es tu mejor portafolio. Cada post que publiques para Lumma debe ser tan bueno como lo que le entregarías a un cliente. Si tu feed no convence, tu propuesta tampoco." />
          </PhaseCard>

          {/* PHASE 3 */}
          <PhaseCard
            phase="FASE 3"
            title="Escalar, sistematizar y posicionar"
            timeframe="Días 15–30"
            color={C.green}
            isActive={activePhase === 2}
            onClick={() => setActivePhase(activePhase === 2 ? -1 : 2)}
          >
            <p className="text-xs mb-3" style={{ color: C.gray }}>
              Objetivo: consolidar los primeros clientes, documentar resultados, crear sistema de captación que funcione sin que tengas que perseguir contactos uno a uno.
            </p>

            <p className="text-xs tracking-widest mb-2 mt-4" style={{ color: C.green }}>CONSOLIDACIÓN</p>
            <TaskItem task="Entregar primer proyecto con excelencia" detail="El primer proyecto define tu reputación. Sobreentrega en calidad (no en alcance). Pide testimonial y permiso para usarlo como caso de estudio." priority="alta" />
            <TaskItem task="Publicar caso de estudio" detail="Post o carrusel mostrando antes/después o el proceso + resultado del primer cliente. Esto es oro para tu feed." priority="alta" />
            <TaskItem task="Pedir referidos" detail="A cada cliente satisfecho: '¿Conoces a alguien que necesite esto?' Ofrece un descuento por referido exitoso (10% o un mes de community management gratis)." priority="alta" />

            <p className="text-xs tracking-widest mb-2 mt-5" style={{ color: C.green }}>SISTEMA DE CAPTACIÓN</p>
            <TaskItem task="Landing page o sitio web simple" detail="No necesita ser complejo: quién eres, qué haces, servicios con precios, testimonial, formulario de contacto. Puede ser Carrd, Framer o una sola página." priority="alta" />
            <TaskItem task="Iniciar pauta en Meta Ads" detail="$200–$300 para empezar. Campaña de awareness o tráfico al perfil/landing. Segmenta: dueños de negocios, Miami-Dade, 28–55 años." priority="media" />
            <TaskItem task="Estrategia de outbound en LinkedIn" detail="Conecta con dueños de negocio y gerentes de marketing en Miami. No vendas en el primer mensaje — aporta valor, comenta sus posts, construye relación." priority="media" />
            <TaskItem task="Alianzas estratégicas" detail="Identifica 2–3 profesionales complementarios (diseñadores web, consultores de negocio, fotógrafos) para referidos cruzados." priority="media" />

            <p className="text-xs tracking-widest mb-2 mt-5" style={{ color: C.green }}>OPERACIONES</p>
            <TaskItem task="Definir herramientas de trabajo" detail="Canva Pro, CapCut Pro, Google Workspace, herramienta de scheduling (Later o Planoly), herramienta de gestión (Notion o Trello)." priority="media" />
            <TaskItem task="Crear templates de propuesta y contrato" detail="Propuesta comercial con branding de Lumma + contrato de servicios básico. Reutilizables para cada cliente." priority="media" />
            <TaskItem task="Definir proceso de onboarding" detail="Formulario de intake, kick-off call, acceso a cuentas, calendario de entrega. Que se sienta profesional desde el día 1." priority="baja" />

            <TipBox text="Meta del día 30: al menos 2 clientes activos, presencia digital funcionando, y un sistema básico de captación que no dependa solo de contactos personales. Todo lo demás se construye sobre esta base." />
          </PhaseCard>
        </div>

        {/* Budget breakdown */}
        <div className="px-5 pb-6">
          <div className="rounded-2xl p-5" style={{ backgroundColor: C.surface, border: `1px solid ${C.dimmer}` }}>
            <p className="text-xs tracking-widest mb-4" style={{ color: C.green }}>PRESUPUESTO DE LANZAMIENTO</p>
            <BudgetItem item="Dominio (.studio o .co)" cost="$15–$30" note="Anual" />
            <BudgetItem item="Google Workspace" cost="$7/mes" note="Email profesional hola@lumma.studio" />
            <BudgetItem item="Canva Pro" cost="$13/mes" note="Diseño de contenido y propuestas" />
            <BudgetItem item="CapCut Pro" cost="$8/mes" note="Edición de video para Reels/TikTok" />
            <BudgetItem item="Later o Planoly" cost="$25/mes" note="Scheduling de contenido" />
            <BudgetItem item="Linktree Pro" cost="$5/mes" note="Link en bio profesional" />
            <BudgetItem item="Landing page (Carrd)" cost="$19/año" note="Sitio web mínimo viable" />
            <BudgetItem item="Meta Ads (primer mes)" cost="$200–$300" note="Campaña de awareness local" />
            <div className="flex items-center justify-between pt-3 mt-2" style={{ borderTop: `1px solid ${C.green}30` }}>
              <p className="text-sm font-bold" style={{ color: C.white }}>Total estimado mes 1</p>
              <p className="text-sm font-bold" style={{ color: C.green }}>$290–$420</p>
            </div>
            <TipBox text="Esto te deja margen del presupuesto para imprevistos o para invertir más en pauta si ves tracción. No gastes todo de golpe — mide y ajusta." />
          </div>
        </div>

        {/* KPIs */}
        <div className="px-5 pb-6">
          <div className="rounded-2xl p-5" style={{ backgroundColor: C.surface, border: `1px solid ${C.dimmer}` }}>
            <p className="text-xs tracking-widest mb-4" style={{ color: C.pink }}>MÉTRICAS DE ÉXITO — DÍA 30</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { metric: "2+", label: "Clientes activos" },
                { metric: "30+", label: "Posts publicados" },
                { metric: "500+", label: "Seguidores orgánicos" },
                { metric: "1", label: "Caso de estudio publicado" },
                { metric: "1", label: "Landing page live" },
                { metric: "$3K+", label: "Revenue mes 1" },
              ].map(({ metric, label }) => (
                <div key={label} className="p-3 rounded-lg text-center" style={{ backgroundColor: C.bg }}>
                  <p className="text-xl font-extrabold" style={{ color: C.green }}>{metric}</p>
                  <p className="text-xs mt-1" style={{ color: C.gray }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mindset */}
        <div className="px-5 pb-8">
          <div className="p-5 rounded-2xl" style={{ backgroundColor: C.bg, border: `1px solid ${C.dimmer}` }}>
            <p className="text-xs tracking-widest mb-3" style={{ color: C.dim }}>PRINCIPIO GUÍA</p>
            <p className="text-lg font-bold leading-snug" style={{ color: C.white, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              Vende primero,{" "}
              <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: C.green }}>
                perfecciona
              </span>
              {" "}después.
            </p>
            <p className="text-xs leading-relaxed mt-3" style={{ color: C.gray }}>
              No esperes a tener el sitio web perfecto, el portafolio completo o 1,000 seguidores. Tu primer cliente no te va a contratar por tu feed — te va a contratar porque confía en ti, entiende lo que ofreces y necesita lo que haces. Todo lo demás se construye con el momentum de los primeros proyectos.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-6 text-center" style={{ borderTop: `1px solid ${C.dimmer}` }}>
          <LogoSymbol size={24} />
          <p className="text-xs mt-2" style={{ color: C.dim }}>Lumma © 2026 — Estrategia de lanzamiento</p>
        </div>
      </div>
    </>
  );
}
