import { useState } from "react";

const C = {
  bg: "#080808", surface: "#111111", card: "#161616", green: "#CCFF00", pink: "#E6007E",
  pinkSoft: "#FF7EB3", white: "#FFFFFF", textLight: "#D4D0CA", gray: "#777777",
  dim: "#444444", dimmer: "#2a2a2a", warm: "#1C1A18", amber: "#F5A623",
};

const phases = [
  {
    id: "prep_entrega",
    number: "01",
    title: "Preparación de entrega",
    timeline: "1-2 días",
    color: C.green,
    steps: [
      { id: "qa_final", type: "milestone", label: "QA final de entregables",
        byService: {
          branding: "Logo en todos los formatos (PNG, SVG, PDF), paleta, tipografía, aplicaciones, brand guidelines (Blaze). Verificar nombres de archivo, formatos, nada corrupto",
          social: "Confirmar que todas las piezas del mes se publicaron, nada pendiente. Preparar datos para reporte",
          films: "Renders finales en todos los formatos acordados: versión completa, cortes para redes (9:16, 1:1), con/sin subtítulos",
        }},
      { id: "organizar_drive", type: "action", label: "Organizar entregables en Drive",
        detail: "Carpeta Entregables → [Proyecto/Mes]. Estructura por tipo de archivo. Nomenclatura clara: 'Lumma_[Cliente]_[Pieza]_[Formato].ext' — nunca 'final_v3_ok.png'" },
      { id: "factura", type: "action", label: "Preparar factura final",
        byService: {
          branding: "Factura del 50% restante, lista para enviar junto con la entrega",
          social: "Confirmar pago del mes actual recibido. Preparar factura del mes siguiente",
          films: "Factura del 50% restante, lista para enviar junto con la entrega",
        }},
    ],
  },
  {
    id: "entrega",
    number: "02",
    title: "Entrega al cliente",
    timeline: "Día 1 post-aprobación",
    color: C.pinkSoft,
    steps: [
      { id: "mensaje_entrega", type: "milestone", label: "Mensaje de entrega formal",
        detail: "No es solo un link. Incluye: resumen de lo entregado, link a Drive, instrucciones de uso si aplica (cómo usar el logo, qué archivo para qué plataforma), y factura final adjunta. Tono Lumma: cálido, profesional, cierre con cuidado" },
      { id: "social_cierre", type: "action", label: "Social Media: cierre mensual o trimestral",
        detail: "Mensual: el reporte es la entrega. Cada 3 meses: revisión más profunda con el cliente — resultados acumulados, ajustes estratégicos, confirmación de continuidad",
        onlyService: "social" },
    ],
  },
  {
    id: "cobro",
    number: "03",
    title: "Cobro y cierre financiero",
    timeline: "5 días hábiles",
    color: C.amber,
    steps: [
      { id: "esperar_pago", type: "wait", label: "Esperar pago (5 días hábiles)",
        detail: "Zelle o Stripe. Al recibir: marcar como pagado en hoja de cálculo, confirmar recepción al cliente" },
      { id: "dec_pago", type: "decision", label: "¿Pago recibido?", branches: [
        { label: "Sí", result: "Confirmar recepción → avanzar a cierre en herramientas", color: C.green },
        { label: "No (día 6)", result: "Recordatorio amigable por WhatsApp o email", color: C.amber },
        { label: "No (día 10)", result: "Segundo recordatorio directo + pausa de trabajo si es Social Media", color: C.pinkSoft },
        { label: "No (día 15)", result: "Recordatorio formal por email. 48h para procesar o se cancela servicio", color: C.pink },
      ]},
      { id: "pago_freelancers", type: "action", label: "Pagar a freelancers",
        detail: "Dentro de 3 días hábiles post-cobro. Zelle o transferencia. Registrar en hoja de cálculo asociado al proyecto" },
      { id: "registro", type: "action", label: "Registro contable",
        detail: "Actualizar hoja de cálculo: monto cobrado, fecha de cobro, pago a freelancers, margen neto del proyecto" },
    ],
  },
  {
    id: "herramientas",
    number: "04",
    title: "Cierre en herramientas",
    timeline: "Mismo día del cobro",
    color: C.green,
    steps: [
      { id: "hubspot_cierre", type: "auto", label: "HubSpot → Cerrado ganado",
        detail: "Mover deal a cerrado. Agregar notas: qué se hizo, cómo fue la experiencia, potencial de siguiente servicio. Social Media: mantener como cliente activo o cerrar si no renueva" },
      { id: "asana_cierre", type: "auto", label: "Asana → Archivar proyecto",
        detail: "Marcar todas las tareas completadas. Archivar (no eliminar). Social Media: duplicar tareas para el ciclo siguiente" },
      { id: "slack_cierre", type: "auto", label: "Slack → Archivar o mantener canal",
        detail: "Si no continúa con otro servicio → archivar canal. Si transiciona a otro servicio → mantener activo" },
      { id: "claude_cierre", type: "auto", label: "Claude → Mantener proyecto",
        detail: "No eliminar el proyecto del cliente. Si vuelve en 6 meses, todo el contexto sigue disponible" },
      { id: "canva_capcut", type: "auto", label: "Canva + CapCut → Mantener como referencia",
        detail: "Archivos de proyecto se quedan como referencia de portafolio (si el contrato lo permite). Si continúa, se mantienen activos" },
      { id: "drive_cierre", type: "auto", label: "Drive → Mantener organizado",
        detail: "No eliminar nada. El Drive es tu archivo histórico. La carpeta del cliente queda como referencia permanente" },
    ],
  },
  {
    id: "feedback",
    number: "05",
    title: "Feedback y satisfacción",
    timeline: "3-5 días post-entrega",
    color: C.pinkSoft,
    steps: [
      { id: "pedir_feedback", type: "action", label: "Solicitar feedback al cliente",
        detail: "'¿Cómo te sentiste con el proceso? ¿Hay algo que podríamos mejorar?' — mensaje corto, genuino. Te da info para mejorar y muestra que te importa la experiencia" },
      { id: "dec_feedback", type: "decision", label: "¿Feedback positivo?", branches: [
        { label: "Sí", result: "Solicitar testimonial + referidos →", color: C.green },
        { label: "Mixto", result: "Agradecer, tomar nota de mejoras. Evaluar si pedir testimonial", color: C.amber },
        { label: "Negativo", result: "Escuchar, agradecer honestidad, documentar para mejorar. No pedir testimonial", color: C.pinkSoft },
      ]},
      { id: "testimonial", type: "action", label: "Solicitar testimonial",
        detail: "Texto escrito, video corto, o reseña en Google. Cada cliente satisfecho es prueba social para el siguiente. Pedir permiso para usar en redes y sitio web" },
      { id: "referidos", type: "action", label: "Solicitar referidos",
        detail: "'¿Conoces a alguien que pueda necesitar algo parecido?' — como conversación, no como pitch. Los referidos de clientes satisfechos tienen la mayor tasa de cierre" },
    ],
  },
  {
    id: "transicion",
    number: "06",
    title: "Transición y oportunidad",
    timeline: "Post-cierre + 30/90 días",
    color: C.green,
    steps: [
      { id: "evaluar_oportunidad", type: "action", label: "Evaluar oportunidad de siguiente servicio",
        byService: {
          branding: "Proponer Social Media o Films. 'Ahora que tu marca está lista, el contenido es el siguiente paso lógico'",
          social: "Si cancela: entender por qué, dejar puerta abierta. Si continúa: renovar y ajustar estrategia",
          films: "Proponer Social Media o siguiente proyecto audiovisual. 'Con el video que hicimos, imagina este nivel de contenido cada mes'",
        }},
      { id: "dec_transicion", type: "decision", label: "¿Cliente interesado?", branches: [
        { label: "Sí", result: "Tratar como lead calificado → ir directo a propuesta (ya no necesita discovery call)", color: C.green },
        { label: "No ahora", result: "Agendar follow-up en 30 y 90 días → mantener relación viva", color: C.amber },
        { label: "No", result: "Agradecer, cerrar con elegancia, mantener en base de datos para futuro", color: C.gray },
      ]},
      { id: "followup_30", type: "wait", label: "Follow-up a 30 días",
        detail: "Mensaje preguntando cómo le va con los entregables. Genuino, no comercial. Mantener la relación" },
      { id: "followup_90", type: "wait", label: "Follow-up a 90 días",
        detail: "Compartir un caso de éxito, algo de valor, o simplemente reconectar. Si hay interés, abrir conversación de nuevo servicio" },
      { id: "fin", type: "end", label: "Ciclo completado",
        detail: "Cliente cerrado con profesionalismo. Relación mantenida. Puerta abierta para futuro" },
    ],
  },
];

const services = [
  { id: "branding", label: "Branding", icon: "🎨", color: C.green },
  { id: "social", label: "Social Media", icon: "📱", color: C.pinkSoft },
  { id: "films", label: "Films", icon: "🎬", color: C.amber },
];

function StepCard({ step, isSelected, onToggle, phaseColor, activeService }) {
  if (step.onlyService && step.onlyService !== activeService) return null;
  const styles = {
    action: { bg: C.card, border: phaseColor + "30", text: C.white, icon: "◆", iconColor: phaseColor },
    milestone: { bg: C.warm, border: phaseColor + "50", text: phaseColor, icon: "★", iconColor: phaseColor },
    decision: { bg: C.warm, border: C.pink + "40", text: C.white, icon: "◇", iconColor: C.pink },
    wait: { bg: C.surface, border: C.amber + "25", text: C.textLight, icon: "◷", iconColor: C.amber, dashed: true },
    auto: { bg: C.surface, border: C.dimmer, text: C.textLight, icon: "⚡", iconColor: C.dim, dashed: true },
    deliverable: { bg: C.card, border: C.green + "35", text: C.green, icon: "📄", iconColor: C.green },
    rule: { bg: C.surface, border: C.amber + "30", text: C.amber, icon: "⚠", iconColor: C.amber },
    end: { bg: C.green, border: C.green, text: C.bg, icon: "✓", iconColor: C.bg },
  };
  const s = styles[step.type] || styles.action;
  const hasByService = step.byService && step.byService[activeService];
  const hasDetail = step.detail || hasByService || step.branches;

  return (
    <div className="mb-2">
      <div onClick={() => hasDetail && onToggle(step.id)}
        className="rounded-xl px-3.5 py-3 transition-all duration-200"
        style={{ backgroundColor: s.bg, border: `1px ${s.dashed ? "dashed" : "solid"} ${s.border}`, cursor: hasDetail ? "pointer" : "default", transform: isSelected ? "scale(1.02)" : "scale(1)", boxShadow: isSelected ? `0 0 20px ${phaseColor}15` : "none" }}>
        <div className="flex items-start gap-2.5">
          <span style={{ fontSize: 11, color: s.iconColor, marginTop: 1, flexShrink: 0 }}>{s.icon}</span>
          <div className="flex-1 min-w-0">
            <p className="font-semibold leading-tight" style={{ fontSize: 12, color: s.text, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{step.label}</p>
            {isSelected && step.detail && !step.branches && !hasByService && (
              <p className="mt-1.5 leading-relaxed animate-fadeIn" style={{ fontSize: 10, color: C.textLight }}>{step.detail}</p>
            )}
            {isSelected && hasByService && (
              <div className="mt-2 px-2.5 py-2 rounded-lg animate-fadeIn" style={{ backgroundColor: C.warm, border: `1px solid ${C.dimmer}` }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <span style={{ fontSize: 10 }}>{services.find(sv => sv.id === activeService)?.icon}</span>
                  <span className="font-bold uppercase" style={{ fontSize: 8, color: services.find(sv => sv.id === activeService)?.color, letterSpacing: 1 }}>
                    {services.find(sv => sv.id === activeService)?.label}
                  </span>
                </div>
                <p style={{ fontSize: 9, color: C.textLight, lineHeight: 1.5 }}>{step.byService[activeService]}</p>
              </div>
            )}
            {isSelected && step.branches && (
              <div className="mt-2 space-y-1.5 animate-fadeIn">
                {step.branches.map((b) => (
                  <div key={b.label} className="flex items-start gap-2 px-2.5 py-2 rounded-lg" style={{ backgroundColor: b.color + "10", border: `1px solid ${b.color}20` }}>
                    <span className="px-1.5 py-0.5 rounded font-bold flex-shrink-0" style={{ fontSize: 8, color: b.color, backgroundColor: b.color + "15" }}>{b.label}</span>
                    <p style={{ fontSize: 9, color: C.textLight, lineHeight: 1.4 }}>{b.result}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          {hasDetail && <span style={{ fontSize: 8, color: C.dim, marginTop: 2, flexShrink: 0 }}>{isSelected ? "▲" : "▼"}</span>}
        </div>
      </div>
      {step.type !== "end" && <div className="flex justify-center" style={{ height: 8 }}><div style={{ width: 1, height: 8, backgroundColor: C.dimmer }} /></div>}
    </div>
  );
}

function PhaseSection({ phase, selectedStep, onToggleStep, isLast, activeService }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center justify-center rounded-lg" style={{ width: 32, height: 32, backgroundColor: phase.color + "12", border: `1px solid ${phase.color}25` }}>
          <span className="font-mono font-bold" style={{ fontSize: 11, color: phase.color }}>{phase.number}</span>
        </div>
        <div className="flex-1">
          <h3 className="font-bold" style={{ fontSize: 14, color: C.white, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{phase.title}</h3>
          <p style={{ fontSize: 9, color: C.dim }}>{phase.timeline}</p>
        </div>
      </div>
      <div className="ml-4 pl-4" style={{ borderLeft: `2px solid ${phase.color}20` }}>
        {phase.steps.map((step) => (
          <StepCard key={step.id} step={step} isSelected={selectedStep === step.id} onToggle={onToggleStep} phaseColor={phase.color} activeService={activeService} />
        ))}
      </div>
      {!isLast && (
        <div className="flex justify-center my-2">
          <div className="px-3 py-1 rounded-full" style={{ backgroundColor: C.surface, border: `1px dashed ${C.dimmer}` }}>
            <span style={{ fontSize: 9, color: C.dim }}>▼</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LummaCierreFlow() {
  const [selectedStep, setSelectedStep] = useState(null);
  const [activeService, setActiveService] = useState("branding");
  const [showChecklist, setShowChecklist] = useState(false);
  const toggleStep = (id) => setSelectedStep(selectedStep === id ? null : id);

  const checklist = [
    { label: "QA final de todos los entregables", phase: "01" },
    { label: "Archivos organizados en Drive con nomenclatura clara", phase: "01" },
    { label: "Mensaje de entrega formal enviado", phase: "02" },
    { label: "Factura final enviada", phase: "02" },
    { label: "Pago final recibido", phase: "03" },
    { label: "Freelancers pagados", phase: "03" },
    { label: "Ingreso registrado en hoja contable", phase: "03" },
    { label: "HubSpot → Cerrado ganado + notas", phase: "04" },
    { label: "Asana → Archivado o ciclo renovado", phase: "04" },
    { label: "Slack → Archivado o mantenido", phase: "04" },
    { label: "Canva + CapCut → Mantenido como referencia", phase: "04" },
    { label: "Drive → Organizado y mantenido", phase: "04" },
    { label: "Feedback solicitado al cliente", phase: "05" },
    { label: "Testimonial solicitado (si feedback positivo)", phase: "05" },
    { label: "Referidos solicitados", phase: "05" },
    { label: "Oportunidad de siguiente servicio evaluada", phase: "06" },
    { label: "Follow-up 30 días agendado", phase: "06" },
    { label: "Follow-up 90 días agendado", phase: "06" },
  ];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@1&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
      `}</style>
      <div className="min-h-screen py-8 px-4" style={{ backgroundColor: C.bg, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: C.green }} />
                <div className="w-4 h-4 rounded-full -ml-2" style={{ backgroundColor: C.pink }} />
              </div>
              <p className="text-xs font-bold tracking-widest" style={{ color: C.green }}>LUMMA</p>
            </div>
            <h1 className="text-2xl font-extrabold leading-tight" style={{ color: C.white }}>
              Entrega,{" "}
              <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: C.green }}>cierre</span>
              {" "}y transición
            </h1>
            <p className="mt-2" style={{ fontSize: 11, color: C.gray }}>
              Del entregable final al siguiente servicio · Aplica a todos los servicios
            </p>
          </div>

          {/* Controls */}
          <div className="flex gap-2 mb-4">
            {/* Service selector */}
            <div className="flex gap-1 p-1 rounded-lg flex-1" style={{ backgroundColor: C.surface }}>
              {services.map((sv) => (
                <button key={sv.id} onClick={() => setActiveService(sv.id)}
                  className="flex-1 py-2 rounded-md text-xs font-medium transition-all flex items-center justify-center gap-1"
                  style={{
                    backgroundColor: activeService === sv.id ? sv.color + "15" : "transparent",
                    color: activeService === sv.id ? sv.color : C.dim,
                    border: activeService === sv.id ? `1px solid ${sv.color}30` : "1px solid transparent",
                  }}>
                  <span style={{ fontSize: 10 }}>{sv.icon}</span>
                  <span>{sv.label}</span>
                </button>
              ))}
            </div>
            {/* View toggle */}
            <div className="flex gap-1 p-1 rounded-lg" style={{ backgroundColor: C.surface }}>
              <button onClick={() => setShowChecklist(false)} className="px-2.5 py-2 rounded-md text-xs font-medium transition-all"
                style={{ backgroundColor: !showChecklist ? C.green : "transparent", color: !showChecklist ? C.bg : C.gray }}>
                Flujo
              </button>
              <button onClick={() => setShowChecklist(true)} className="px-2.5 py-2 rounded-md text-xs font-medium transition-all"
                style={{ backgroundColor: showChecklist ? C.green : "transparent", color: showChecklist ? C.bg : C.gray }}>
                Check
              </button>
            </div>
          </div>

          {!showChecklist ? (
            <>
              {/* Legend */}
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-6 px-3 py-2.5 rounded-lg" style={{ backgroundColor: C.surface }}>
                {[
                  { icon: "◆", label: "Acción", color: C.green },
                  { icon: "★", label: "Hito", color: C.amber },
                  { icon: "◇", label: "Decisión", color: C.pink },
                  { icon: "◷", label: "Espera", color: C.amber },
                  { icon: "⚡", label: "Automático", color: C.dim },
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <span style={{ fontSize: 9, color: l.color }}>{l.icon}</span>
                    <span style={{ fontSize: 8, color: C.dim }}>{l.label}</span>
                  </div>
                ))}
              </div>

              {/* Phases */}
              {phases.map((phase, i) => (
                <PhaseSection key={phase.id} phase={phase} selectedStep={selectedStep} onToggleStep={toggleStep} isLast={i === phases.length - 1} activeService={activeService} />
              ))}
            </>
          ) : (
            /* Checklist */
            <div className="space-y-2">
              <p className="text-xs mb-3" style={{ color: C.gray }}>
                Checklist para cada proyecto completado. Todos los items deben resolverse.
              </p>
              {checklist.map((item, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-lg" style={{ backgroundColor: C.surface }}>
                  <div className="w-4 h-4 rounded border flex-shrink-0" style={{ borderColor: C.dimmer }} />
                  <p className="flex-1" style={{ fontSize: 11, color: C.textLight }}>{item.label}</p>
                  <span className="px-1.5 py-0.5 rounded font-mono" style={{ fontSize: 8, color: C.dim, backgroundColor: C.bg }}>{item.phase}</span>
                </div>
              ))}
            </div>
          )}

          {/* Timing */}
          <div className="mt-8 rounded-xl px-4 py-4" style={{ backgroundColor: C.surface, border: `1px solid ${C.dimmer}` }}>
            <p className="text-xs font-bold mb-3" style={{ color: C.green, letterSpacing: 1 }}>TIEMPOS CLAVE</p>
            <div className="space-y-2">
              {[
                ["Preparación de entrega", "1-2 días"],
                ["Entrega al cliente", "Día 1 post-aprobación"],
                ["Pago esperado", "Máx. 5 días hábiles"],
                ["Pago a freelancers", "Máx. 3 días post-cobro"],
                ["Cierre en herramientas", "Mismo día del cobro"],
                ["Solicitud de feedback", "3-5 días post-entrega"],
                ["Follow-up post-proyecto", "30 y 90 días"],
              ].map(([step, time]) => (
                <div key={step} className="flex justify-between items-center">
                  <span style={{ fontSize: 10, color: C.textLight }}>{step}</span>
                  <span className="px-2 py-0.5 rounded" style={{ fontSize: 9, color: C.green, backgroundColor: C.green + "10", fontWeight: 600 }}>{time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Cobranza escalation */}
          <div className="mt-4 rounded-xl px-4 py-4" style={{ backgroundColor: C.warm, border: `1px solid ${C.amber}20` }}>
            <p className="text-xs font-bold mb-2" style={{ color: C.amber, letterSpacing: 1 }}>ESCALAMIENTO DE COBRANZA</p>
            <div className="space-y-2">
              {[
                { day: "Día 5", action: "Vence factura. Verificar si entró el pago", color: C.green },
                { day: "Día 6", action: "Recordatorio amigable (WhatsApp/email)", color: C.amber },
                { day: "Día 10", action: "Segundo recordatorio directo + pausa de trabajo (Social Media)", color: C.pinkSoft },
                { day: "Día 15", action: "Recordatorio formal por email. Ultimátum 48h", color: C.pink },
                { day: "Día 17+", action: "Decisión: retener entregables o cancelar servicio", color: C.pink },
              ].map((item) => (
                <div key={item.day} className="flex items-start gap-2.5">
                  <span className="px-1.5 py-0.5 rounded font-mono font-bold flex-shrink-0" style={{ fontSize: 8, color: item.color, backgroundColor: item.color + "12" }}>{item.day}</span>
                  <p style={{ fontSize: 9, color: C.textLight, lineHeight: 1.4 }}>{item.action}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 mb-4 text-center">
            <p style={{ fontSize: 9, color: C.dim, letterSpacing: 2 }}>LUMMA · OPERACIONES · ENTREGA Y CIERRE · V1.0</p>
          </div>
        </div>
      </div>
    </>
  );
}
