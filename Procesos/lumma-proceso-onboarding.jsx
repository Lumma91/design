import { useState } from "react";

const C = {
  bg: "#080808",
  surface: "#111111",
  card: "#161616",
  green: "#CCFF00",
  pink: "#E6007E",
  pinkSoft: "#FF7EB3",
  white: "#FFFFFF",
  textLight: "#D4D0CA",
  gray: "#777777",
  dim: "#444444",
  dimmer: "#2a2a2a",
  warm: "#1C1A18",
  amber: "#F5A623",
};

const phases = [
  {
    id: "propuesta",
    number: "01",
    title: "Propuesta formal",
    timeline: "Día 1-2 post-llamada",
    color: C.green,
    steps: [
      {
        id: "prep_prop",
        type: "action",
        label: "Preparar propuesta",
        detail: "Resumen de necesidad, servicio recomendado (Spark/Blaze), qué incluye y qué no, precio, términos de pago, timeline estimado",
      },
      {
        id: "send_prop",
        type: "action",
        label: "Enviar propuesta por email",
        detail: "PDF de 3-5 páginas con identidad Lumma. Mensaje breve acompañando",
      },
      {
        id: "wait_prop",
        type: "wait",
        label: "Esperar respuesta",
        detail: "5 días hábiles máximo. Si no responde en 3 días → follow-up por WhatsApp",
      },
      {
        id: "dec_prop",
        type: "decision",
        label: "¿Acepta?",
        branches: [
          { label: "No", result: "Cerrar como perdido en HubSpot. Dejar puerta abierta", color: C.pinkSoft },
          { label: "Piénsalo", result: "Seguimiento en 1 semana. Máx. 2 follow-ups", color: C.amber },
          { label: "Sí", result: "Avanza a contrato →", color: C.green },
        ],
      },
    ],
  },
  {
    id: "contrato",
    number: "02",
    title: "Contrato y pago",
    timeline: "Día 3-5",
    color: C.pink,
    steps: [
      {
        id: "send_contract",
        type: "action",
        label: "Enviar contrato de servicios",
        detail: "Alcance, entregables, timeline, términos de pago, política de revisiones, cancelación, derechos de uso, confidencialidad",
      },
      {
        id: "sign",
        type: "milestone",
        label: "Contrato firmado",
        detail: "Ambas partes firman. DocuSign Free o PDF firmado. Requisito obligatorio para avanzar",
      },
      {
        id: "invoice",
        type: "action",
        label: "Enviar factura del anticipo",
        detail: "Proyectos: 50% anticipo. Social Media: primer mes completo por adelantado",
      },
      {
        id: "payment",
        type: "milestone",
        label: "Pago recibido",
        detail: "Zelle, transferencia o Stripe. Confirmar recepción al cliente. Sin pago confirmado no se arranca",
      },
    ],
  },
  {
    id: "bienvenida",
    number: "03",
    title: "Bienvenida y brief",
    timeline: "Día 4-6",
    color: C.green,
    steps: [
      {
        id: "welcome",
        type: "action",
        label: "Enviar mensaje de bienvenida",
        detail: "Email o WhatsApp. Tono cálido, confirma que ya son parte de Lumma. Explica qué sigue",
      },
      {
        id: "brief",
        type: "action",
        label: "Enviar brief creativo",
        detail: "Google Forms o Notion. Personalizado según servicio: Branding (historia, valores, referencias), Social Media (accesos, calendario, referencias), Films (objetivo, locación, talento)",
      },
      {
        id: "brief_wait",
        type: "wait",
        label: "Cliente completa el brief",
        detail: "3 días hábiles. Si no lo completa en 2 días → recordatorio por WhatsApp",
      },
      {
        id: "accesos",
        type: "action",
        label: "Recopilar accesos y assets",
        detail: "Instagram, Facebook, Meta Business Suite, logo vectorial, fotos/videos existentes, cualquier material de marca",
      },
    ],
  },
  {
    id: "setup",
    number: "04",
    title: "Setup de infraestructura",
    timeline: "Día 5-7",
    color: C.pinkSoft,
    steps: [
      {
        id: "gdrive",
        type: "tool",
        label: "Google Drive",
        detail: "Crear carpeta: [Cliente] / Brief, Assets, Producción, Entregables, Administrativo",
        icon: "📁",
      },
      {
        id: "claude_proj",
        type: "tool",
        label: "Claude — Proyecto",
        detail: "Crear proyecto del cliente. Cargar: brief, identidad de marca, alcance del servicio, tono de voz, referencias",
        icon: "🧠",
      },
      {
        id: "asana_proj",
        type: "tool",
        label: "Asana — Proyecto",
        detail: "Duplicar template del servicio (Branding / Social Media / Films). Asignar fechas y responsables",
        icon: "📋",
      },
      {
        id: "slack_ch",
        type: "tool",
        label: "Slack — Canal",
        detail: "Crear #cliente-[nombre]. Conectar notificaciones de Asana. Espacio interno de comunicación",
        icon: "💬",
      },
      {
        id: "canva_proj",
        type: "tool",
        label: "Canva — Carpeta",
        detail: "Crear carpeta del cliente. Configurar Brand Kit con paleta, tipografía y logo. Crear templates base",
        icon: "🎨",
      },
      {
        id: "capcut_proj",
        type: "tool",
        label: "CapCut — Proyecto",
        detail: "Crear proyecto del cliente. Cargar logo y assets de marca como elementos reutilizables",
        icon: "🎬",
      },
    ],
  },
  {
    id: "kickoff",
    number: "05",
    title: "Kickoff",
    timeline: "Día 7",
    color: C.green,
    steps: [
      {
        id: "internal_review",
        type: "action",
        label: "Revisión interna del brief",
        detail: "Revisar brief completo, definir plan de trabajo, preparar lo necesario para arrancar producción",
      },
      {
        id: "kickoff_msg",
        type: "action",
        label: "Mensaje de kickoff al cliente",
        detail: "Confirmar: todo listo, esto es lo que sigue, fechas clave, canales de comunicación. Cierra onboarding, abre producción",
      },
      {
        id: "hubspot_update",
        type: "auto",
        label: "Actualizar HubSpot",
        detail: "Estado: En producción. Deal cerrado como ganado",
      },
      {
        id: "production",
        type: "end",
        label: "→ Proceso de producción",
        detail: "Cliente activo. Arranca el trabajo según el servicio contratado",
      },
    ],
  },
];

function StepCard({ step, isSelected, onToggle, phaseColor }) {
  const getStyle = () => {
    switch (step.type) {
      case "action":
        return { bg: C.card, border: phaseColor + "30", text: C.white, icon: "◆", iconColor: phaseColor };
      case "milestone":
        return { bg: C.warm, border: phaseColor + "50", text: phaseColor, icon: "★", iconColor: phaseColor };
      case "decision":
        return { bg: C.warm, border: C.pink + "40", text: C.white, icon: "◇", iconColor: C.pink };
      case "wait":
        return { bg: C.surface, border: C.amber + "25", text: C.textLight, icon: "◷", iconColor: C.amber, dashed: true };
      case "auto":
        return { bg: C.surface, border: C.dimmer, text: C.textLight, icon: "⚡", iconColor: C.dim, dashed: true };
      case "tool":
        return { bg: C.card, border: phaseColor + "20", text: C.white, icon: step.icon, iconColor: phaseColor };
      case "end":
        return { bg: C.green, border: C.green, text: C.bg, icon: "→", iconColor: C.bg };
      default:
        return { bg: C.surface, border: C.dimmer, text: C.white, icon: "•", iconColor: C.dim };
    }
  };

  const s = getStyle();

  return (
    <div className="mb-2">
      <div
        onClick={() => step.detail && onToggle(step.id)}
        className="rounded-xl px-3.5 py-3 transition-all duration-200"
        style={{
          backgroundColor: s.bg,
          border: `1px ${s.dashed ? "dashed" : "solid"} ${s.border}`,
          cursor: step.detail ? "pointer" : "default",
          transform: isSelected ? "scale(1.02)" : "scale(1)",
          boxShadow: isSelected ? `0 0 20px ${phaseColor}15` : "none",
        }}
      >
        <div className="flex items-start gap-2.5">
          <span style={{ fontSize: 11, color: s.iconColor, marginTop: 1, flexShrink: 0 }}>
            {s.icon}
          </span>
          <div className="flex-1 min-w-0">
            <p
              className="font-semibold leading-tight"
              style={{
                fontSize: 12,
                color: s.text,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              {step.label}
            </p>
            {isSelected && step.detail && step.type !== "decision" && (
              <p
                className="mt-1.5 leading-relaxed animate-fadeIn"
                style={{
                  fontSize: 10,
                  color: C.textLight,
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                }}
              >
                {step.detail}
              </p>
            )}
            {isSelected && step.type === "decision" && step.branches && (
              <div className="mt-2 space-y-1.5 animate-fadeIn">
                {step.branches.map((b) => (
                  <div
                    key={b.label}
                    className="flex items-start gap-2 px-2.5 py-2 rounded-lg"
                    style={{ backgroundColor: b.color + "10", border: `1px solid ${b.color}20` }}
                  >
                    <span
                      className="px-1.5 py-0.5 rounded font-bold flex-shrink-0"
                      style={{ fontSize: 8, color: b.color, backgroundColor: b.color + "15", letterSpacing: 0.5 }}
                    >
                      {b.label}
                    </span>
                    <p style={{ fontSize: 9, color: C.textLight, lineHeight: 1.4 }}>{b.result}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          {step.detail && (
            <span style={{ fontSize: 8, color: C.dim, marginTop: 2, flexShrink: 0 }}>
              {isSelected ? "▲" : "▼"}
            </span>
          )}
        </div>
      </div>
      {/* Connector line between steps */}
      {step.type !== "end" && (
        <div className="flex justify-center" style={{ height: 8 }}>
          <div style={{ width: 1, height: 8, backgroundColor: C.dimmer }} />
        </div>
      )}
    </div>
  );
}

function PhaseSection({ phase, selectedStep, onToggleStep, isLast }) {
  return (
    <div className="mb-6">
      {/* Phase header */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="flex items-center justify-center rounded-lg"
          style={{
            width: 32,
            height: 32,
            backgroundColor: phase.color + "12",
            border: `1px solid ${phase.color}25`,
          }}
        >
          <span
            className="font-mono font-bold"
            style={{ fontSize: 11, color: phase.color }}
          >
            {phase.number}
          </span>
        </div>
        <div className="flex-1">
          <h3
            className="font-bold"
            style={{ fontSize: 14, color: C.white, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {phase.title}
          </h3>
          <p style={{ fontSize: 9, color: C.dim }}>{phase.timeline}</p>
        </div>
      </div>

      {/* Steps */}
      <div className="ml-4 pl-4" style={{ borderLeft: `2px solid ${phase.color}20` }}>
        {phase.steps.map((step) => (
          <StepCard
            key={step.id}
            step={step}
            isSelected={selectedStep === step.id}
            onToggle={onToggleStep}
            phaseColor={phase.color}
          />
        ))}
      </div>

      {/* Phase connector */}
      {!isLast && (
        <div className="flex justify-center my-2">
          <div
            className="px-3 py-1 rounded-full"
            style={{
              backgroundColor: C.surface,
              border: `1px dashed ${C.dimmer}`,
            }}
          >
            <span style={{ fontSize: 9, color: C.dim }}>▼</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default function LummaOnboardingFlow() {
  const [selectedStep, setSelectedStep] = useState(null);
  const [showChecklist, setShowChecklist] = useState(false);

  const toggleStep = (id) => {
    setSelectedStep(selectedStep === id ? null : id);
  };

  const checklistItems = [
    { label: "Propuesta enviada y aceptada", phase: "01" },
    { label: "Contrato firmado por ambas partes", phase: "02" },
    { label: "Anticipo recibido (50% o primer mes)", phase: "02" },
    { label: "Mensaje de bienvenida enviado", phase: "03" },
    { label: "Brief creativo enviado y completado", phase: "03" },
    { label: "Accesos y assets recibidos", phase: "03" },
    { label: "Google Drive — carpeta creada", phase: "04" },
    { label: "Claude — proyecto creado con contexto", phase: "04" },
    { label: "Asana — proyecto creado con template", phase: "04" },
    { label: "Slack — canal del cliente creado", phase: "04" },
    { label: "Canva — carpeta y Brand Kit configurado", phase: "04" },
    { label: "CapCut — proyecto creado", phase: "04" },
    { label: "Mensaje de kickoff enviado", phase: "05" },
    { label: "HubSpot actualizado: En producción", phase: "05" },
  ];

  const hubspotStates = [
    { label: "Propuesta enviada", color: C.gray },
    { label: "Propuesta aceptada", color: C.textLight },
    { label: "Contrato firmado", color: C.amber },
    { label: "Pago recibido", color: C.amber },
    { label: "Brief en proceso", color: C.pinkSoft },
    { label: "Onboarding completo", color: C.green },
    { label: "En producción", color: C.green },
  ];

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@1&display=swap"
        rel="stylesheet"
      />
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
      `}</style>
      <div
        className="min-h-screen py-8 px-4"
        style={{ backgroundColor: C.bg, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
      >
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 rounded-full" style={{ backgroundColor: C.green }} />
                <div className="w-4 h-4 rounded-full -ml-2" style={{ backgroundColor: C.pink }} />
              </div>
              <p className="text-xs font-bold tracking-widest" style={{ color: C.green }}>LUMMA</p>
            </div>
            <h1
              className="text-2xl font-extrabold leading-tight"
              style={{ color: C.white }}
            >
              Proceso de{" "}
              <span
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: C.green,
                }}
              >
                onboarding
              </span>{" "}
              de cliente
            </h1>
            <p className="mt-2" style={{ fontSize: 11, color: C.gray }}>
              De la propuesta al kickoff · Máximo 7 días hábiles
            </p>

            {/* Tabs */}
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setShowChecklist(false)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{
                  backgroundColor: !showChecklist ? C.green : C.surface,
                  color: !showChecklist ? C.bg : C.gray,
                }}
              >
                Flujo
              </button>
              <button
                onClick={() => setShowChecklist(true)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                style={{
                  backgroundColor: showChecklist ? C.green : C.surface,
                  color: showChecklist ? C.bg : C.gray,
                }}
              >
                Checklist
              </button>
            </div>
          </div>

          {!showChecklist ? (
            <>
              {/* Legend */}
              <div
                className="flex flex-wrap gap-x-4 gap-y-1.5 mb-6 px-3 py-2.5 rounded-lg"
                style={{ backgroundColor: C.surface }}
              >
                {[
                  { icon: "◆", label: "Acción manual", color: C.green },
                  { icon: "★", label: "Hito obligatorio", color: C.amber },
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
                <PhaseSection
                  key={phase.id}
                  phase={phase}
                  selectedStep={selectedStep}
                  onToggleStep={toggleStep}
                  isLast={i === phases.length - 1}
                />
              ))}
            </>
          ) : (
            /* Checklist view */
            <div className="space-y-2">
              <p className="text-xs mb-3" style={{ color: C.gray }}>
                Checklist para cada cliente nuevo. Todos los items deben completarse antes de arrancar producción.
              </p>
              {checklistItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg"
                  style={{ backgroundColor: C.surface }}
                >
                  <div
                    className="w-4 h-4 rounded border flex-shrink-0"
                    style={{ borderColor: C.dimmer }}
                  />
                  <p className="flex-1" style={{ fontSize: 11, color: C.textLight }}>
                    {item.label}
                  </p>
                  <span
                    className="px-1.5 py-0.5 rounded font-mono"
                    style={{ fontSize: 8, color: C.dim, backgroundColor: C.bg }}
                  >
                    {item.phase}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* HubSpot States */}
          <div
            className="mt-8 rounded-xl px-4 py-4"
            style={{ backgroundColor: C.surface, border: `1px solid ${C.dimmer}` }}
          >
            <p className="text-xs font-bold mb-3" style={{ color: C.green, letterSpacing: 1 }}>
              ESTADOS EN HUBSPOT
            </p>
            <div className="flex flex-wrap gap-2">
              {hubspotStates.map((s) => (
                <span
                  key={s.label}
                  className="px-2.5 py-1 rounded-full"
                  style={{
                    fontSize: 9,
                    fontWeight: 600,
                    color: s.color,
                    backgroundColor: s.color + "12",
                    border: `1px solid ${s.color}25`,
                  }}
                >
                  {s.label}
                </span>
              ))}
            </div>
          </div>

          {/* Tools summary */}
          <div
            className="mt-4 rounded-xl px-4 py-4"
            style={{ backgroundColor: C.surface, border: `1px solid ${C.dimmer}` }}
          >
            <p className="text-xs font-bold mb-3" style={{ color: C.pinkSoft, letterSpacing: 1 }}>
              STACK DE HERRAMIENTAS
            </p>
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: "📁", name: "Drive", role: "Archivos" },
                { icon: "🧠", name: "Claude", role: "Estrategia" },
                { icon: "📋", name: "Asana", role: "Tareas" },
                { icon: "💬", name: "Slack", role: "Comunicación" },
                { icon: "🎨", name: "Canva", role: "Diseño" },
                { icon: "🎬", name: "CapCut", role: "Video" },
              ].map((t) => (
                <div
                  key={t.name}
                  className="flex items-center gap-2 px-2 py-2 rounded-lg"
                  style={{ backgroundColor: C.bg }}
                >
                  <span style={{ fontSize: 14 }}>{t.icon}</span>
                  <div>
                    <p style={{ fontSize: 10, color: C.white, fontWeight: 600 }}>{t.name}</p>
                    <p style={{ fontSize: 8, color: C.dim }}>{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timing summary */}
          <div
            className="mt-4 rounded-xl px-4 py-4"
            style={{ backgroundColor: C.surface, border: `1px solid ${C.dimmer}` }}
          >
            <p className="text-xs font-bold mb-3" style={{ color: C.green, letterSpacing: 1 }}>
              TIEMPOS POR FASE
            </p>
            <div className="space-y-2">
              {phases.map((p) => (
                <div key={p.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-mono" style={{ fontSize: 9, color: p.color }}>{p.number}</span>
                    <span style={{ fontSize: 10, color: C.textLight }}>{p.title}</span>
                  </div>
                  <span
                    className="px-2 py-0.5 rounded"
                    style={{ fontSize: 9, color: p.color, backgroundColor: p.color + "10", fontWeight: 600 }}
                  >
                    {p.timeline}
                  </span>
                </div>
              ))}
              <div className="pt-2 mt-2 flex justify-between items-center" style={{ borderTop: `1px solid ${C.dimmer}` }}>
                <span style={{ fontSize: 10, color: C.white, fontWeight: 700 }}>Proceso completo</span>
                <span
                  className="px-2 py-0.5 rounded"
                  style={{ fontSize: 9, color: C.bg, backgroundColor: C.green, fontWeight: 700 }}
                >
                  Máx. 7 días hábiles
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 mb-4 text-center">
            <p style={{ fontSize: 9, color: C.dim, letterSpacing: 2 }}>
              LUMMA · OPERACIONES · V1.0
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
