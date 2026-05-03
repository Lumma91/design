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
  cream: "#F5F0E8",
};

const phases = [
  {
    id: "investigacion",
    number: "01",
    title: "Investigación y descubrimiento",
    sparkTime: "Días 1-3",
    blazeTime: "Días 1-3",
    color: C.green,
    steps: [
      {
        id: "brief_review",
        type: "action",
        label: "Revisar brief del onboarding",
        detail: "Absorber toda la información del cliente: historia, valores, público, referencias visuales",
      },
      {
        id: "competencia",
        type: "action",
        label: "Análisis de competencia",
        spark: "3-5 competidores directos. Análisis visual y de posicionamiento básico",
        blaze: "5-8 competidores. Análisis profundo de posicionamiento, tono, identidad visual y oportunidades de diferenciación",
      },
      {
        id: "sesion_extra",
        type: "blaze_only",
        label: "Sesión de profundización con cliente",
        detail: "15-20 min por videollamada. Explorar valores personales, visión a largo plazo, cómo quiere que se sienta su marca",
      },
      {
        id: "doc_descubrimiento",
        type: "deliverable",
        label: "Documento de descubrimiento",
        detail: "Hallazgos clave, oportunidades, territorio visual. Vive en Google Drive + Proyecto Claude del cliente",
      },
    ],
  },
  {
    id: "estrategia",
    number: "02",
    title: "Estrategia de marca",
    sparkTime: "Días 3-5",
    blazeTime: "Días 3-7",
    color: C.pinkSoft,
    steps: [
      {
        id: "propuesta_valor",
        type: "action",
        label: "Definir propuesta de valor",
        detail: "Qué ofrece, para quién, y por qué es diferente. La base de todo lo que sigue",
      },
      {
        id: "personalidad",
        type: "action",
        label: "Personalidad de marca",
        spark: "3-4 atributos de personalidad con descripción breve",
        blaze: "Personalidad completa: atributos, arquetipos, 'si fuera una persona sería...'",
      },
      {
        id: "tono",
        type: "action",
        label: "Tono de voz",
        spark: "Paleta de tono básica: 3 pilares con una línea cada uno",
        blaze: "Tono completo con pilares, ejemplos de 'sí decimos / no decimos', y guía de aplicación por canal",
      },
      {
        id: "narrativa",
        type: "blaze_only",
        label: "Narrativa y territorio de marca",
        detail: "Propósito, territorio, audiencia detallada. Marco estratégico completo que guía toda la comunicación",
      },
      {
        id: "brief_estrategico",
        type: "deliverable",
        label: "Brief estratégico",
        detail: "Documento interno que guía todo el desarrollo visual. Es el puente entre estrategia y diseño",
      },
    ],
  },
  {
    id: "diseno",
    number: "03",
    title: "Desarrollo visual",
    sparkTime: "Días 5-10",
    blazeTime: "Días 7-15",
    color: C.green,
    steps: [
      {
        id: "logo",
        type: "action",
        label: "Desarrollo de logo",
        spark: "2-3 conceptos de logo con variantes",
        blaze: "3-4 conceptos de logo con variantes, versiones responsive y sistema de isotipo",
      },
      {
        id: "paleta",
        type: "action",
        label: "Paleta de colores",
        spark: "Paleta principal: 3-4 colores con códigos hex",
        blaze: "Paleta principal + extendida + colores de soporte. Reglas de uso y proporciones",
      },
      {
        id: "tipografia",
        type: "action",
        label: "Sistema tipográfico",
        spark: "Selección de 1-2 familias tipográficas con pesos recomendados",
        blaze: "Sistema tipográfico completo: display, body, accent. Escala, pesos, reglas de combinación",
      },
      {
        id: "aplicaciones",
        type: "action",
        label: "Aplicaciones",
        spark: "Avatar de redes sociales y tarjeta de presentación digital",
        blaze: "Templates de redes (post, stories, covers), firma de email, presentación básica, mockups de marca",
      },
      {
        id: "propuestas_listas",
        type: "deliverable",
        label: "Propuestas visuales listas",
        detail: "Todo preparado para presentar al cliente. Mockups y contexto visual incluidos",
      },
    ],
  },
  {
    id: "presentacion",
    number: "04",
    title: "Presentación al cliente",
    sparkTime: "Día 10-11",
    blazeTime: "Día 15-16",
    color: C.pink,
    steps: [
      {
        id: "prep_pres",
        type: "action",
        label: "Preparar presentación",
        detail: "Opciones de logo con racionalidad, paleta y tipografía propuesta, mockups de aplicación, recomendación de Lumma",
      },
      {
        id: "presentar",
        type: "milestone",
        label: "Presentar al cliente",
        detail: "Videollamada o video Loom. Nunca enviar opciones por email sin contexto — el cliente necesita entender el porqué",
      },
      {
        id: "wait_feedback",
        type: "wait",
        label: "Esperar feedback del cliente",
        detail: "2-3 días hábiles para responder. Si no responde en 3 días → recordatorio",
      },
    ],
  },
  {
    id: "revisiones",
    number: "05",
    title: "Revisiones",
    sparkTime: "Días 11-14",
    blazeTime: "Días 16-21",
    color: C.amber,
    steps: [
      {
        id: "ronda1",
        type: "action",
        label: "Ronda 1 — Ajustes principales",
        detail: "Cliente elige dirección y da feedback específico. Ajustes en 2-3 días hábiles. Cliente revisa y aprueba o pide ronda 2",
      },
      {
        id: "dec_r1",
        type: "decision",
        label: "¿Aprobado?",
        branches: [
          { label: "Sí", result: "Salta directo a entrega final →", color: C.green },
          { label: "Ronda 2", result: "Solo refinamiento, no cambio de dirección →", color: C.amber },
        ],
      },
      {
        id: "ronda2",
        type: "action",
        label: "Ronda 2 — Refinamiento final",
        detail: "Ajustes finos, no cambios de dirección. 1-2 días hábiles. Si el cliente quiere cambiar dirección → ronda adicional con costo extra",
      },
      {
        id: "dec_r2",
        type: "decision",
        label: "¿Aprobado?",
        branches: [
          { label: "Sí", result: "Avanza a entrega final →", color: C.green },
          { label: "Más cambios", result: "Ronda adicional con costo extra. Se cotiza aparte", color: C.pinkSoft },
        ],
      },
      {
        id: "regla_revisiones",
        type: "rule",
        label: "Regla: 3 días hábiles por respuesta",
        detail: "Cada ronda tiene deadline de 3 días. Si el cliente no responde, el proyecto se pausa y el timeline se extiende",
      },
    ],
  },
  {
    id: "entrega",
    number: "06",
    title: "Entrega final",
    sparkTime: "Días 14-15",
    blazeTime: "Días 21-25",
    color: C.green,
    steps: [
      {
        id: "prep_entrega",
        type: "action",
        label: "Preparar paquete de entrega",
        spark: "Logo (PNG, SVG, PDF), paleta con hex, tipografías con links, aplicaciones básicas exportadas",
        blaze: "Todo lo de Spark + brand guidelines (PDF o interactivo), templates de redes editables en Canva, aplicaciones corporativas, mockups, walkthrough de uso",
      },
      {
        id: "organizar",
        type: "action",
        label: "Organizar en Drive",
        detail: "Todo en la carpeta Entregables del cliente. Estructura clara con subcarpetas por tipo de archivo",
      },
      {
        id: "enviar",
        type: "milestone",
        label: "Enviar al cliente",
        detail: "Mensaje de entrega formal. Link a la carpeta de Drive con todo organizado",
      },
      {
        id: "pago_final",
        type: "milestone",
        label: "Solicitar pago del 50% restante",
        detail: "Factura final enviada junto con la entrega. Pago esperado en máximo 5 días hábiles",
      },
    ],
  },
  {
    id: "cierre",
    number: "07",
    title: "Cierre y transición",
    sparkTime: "Post-entrega",
    blazeTime: "Post-entrega",
    color: C.pinkSoft,
    steps: [
      {
        id: "admin_cierre",
        type: "auto",
        label: "Cierre administrativo",
        detail: "Pago final recibido, factura emitida, Asana completado, HubSpot → Cerrado ganado",
      },
      {
        id: "transicion",
        type: "action",
        label: "Plantar semilla de transición",
        detail: "'Ahora que tu marca está lista, el siguiente paso natural es darle vida en redes. Si te interesa explorar eso, hablamos'",
      },
      {
        id: "fin",
        type: "end",
        label: "Proyecto completado",
        detail: "Cliente puede transicionar a Social Media o Lumma Films",
      },
    ],
  },
];

function TierBadge({ tier }) {
  const isBlaze = tier === "blaze";
  return (
    <span
      className="px-1.5 py-0.5 rounded font-bold uppercase"
      style={{
        fontSize: 7,
        letterSpacing: 1,
        color: isBlaze ? C.pinkSoft : C.green,
        backgroundColor: (isBlaze ? C.pinkSoft : C.green) + "12",
        border: `1px solid ${(isBlaze ? C.pinkSoft : C.green)}25`,
      }}
    >
      {tier}
    </span>
  );
}

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
      case "deliverable":
        return { bg: C.card, border: C.green + "35", text: C.green, icon: "📄", iconColor: C.green };
      case "blaze_only":
        return { bg: C.card, border: C.pinkSoft + "25", text: C.pinkSoft, icon: "🔥", iconColor: C.pinkSoft };
      case "rule":
        return { bg: C.surface, border: C.amber + "30", text: C.amber, icon: "⚠", iconColor: C.amber };
      case "end":
        return { bg: C.green, border: C.green, text: C.bg, icon: "✓", iconColor: C.bg };
      default:
        return { bg: C.surface, border: C.dimmer, text: C.white, icon: "•", iconColor: C.dim };
    }
  };

  const s = getStyle();
  const hasTierDiff = step.spark && step.blaze;
  const hasDetail = step.detail || hasTierDiff || step.branches;

  return (
    <div className="mb-2">
      <div
        onClick={() => hasDetail && onToggle(step.id)}
        className="rounded-xl px-3.5 py-3 transition-all duration-200"
        style={{
          backgroundColor: s.bg,
          border: `1px ${s.dashed ? "dashed" : "solid"} ${s.border}`,
          cursor: hasDetail ? "pointer" : "default",
          transform: isSelected ? "scale(1.02)" : "scale(1)",
          boxShadow: isSelected ? `0 0 20px ${phaseColor}15` : "none",
        }}
      >
        <div className="flex items-start gap-2.5">
          <span style={{ fontSize: 11, color: s.iconColor, marginTop: 1, flexShrink: 0 }}>
            {s.icon}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p
                className="font-semibold leading-tight flex-1"
                style={{ fontSize: 12, color: s.text, fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {step.label}
              </p>
              {step.type === "blaze_only" && <TierBadge tier="blaze" />}
            </div>

            {isSelected && step.detail && !step.branches && (
              <p className="mt-1.5 leading-relaxed animate-fadeIn" style={{ fontSize: 10, color: C.textLight }}>
                {step.detail}
              </p>
            )}

            {isSelected && hasTierDiff && (
              <div className="mt-2 space-y-1.5 animate-fadeIn">
                <div className="px-2.5 py-2 rounded-lg" style={{ backgroundColor: C.green + "08", border: `1px solid ${C.green}15` }}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <TierBadge tier="spark" />
                  </div>
                  <p style={{ fontSize: 9, color: C.textLight, lineHeight: 1.4 }}>{step.spark}</p>
                </div>
                <div className="px-2.5 py-2 rounded-lg" style={{ backgroundColor: C.pinkSoft + "08", border: `1px solid ${C.pinkSoft}15` }}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <TierBadge tier="blaze" />
                  </div>
                  <p style={{ fontSize: 9, color: C.textLight, lineHeight: 1.4 }}>{step.blaze}</p>
                </div>
              </div>
            )}

            {isSelected && step.branches && (
              <div className="mt-2 space-y-1.5 animate-fadeIn">
                {step.branches.map((b) => (
                  <div
                    key={b.label}
                    className="flex items-start gap-2 px-2.5 py-2 rounded-lg"
                    style={{ backgroundColor: b.color + "10", border: `1px solid ${b.color}20` }}
                  >
                    <span className="px-1.5 py-0.5 rounded font-bold flex-shrink-0"
                      style={{ fontSize: 8, color: b.color, backgroundColor: b.color + "15", letterSpacing: 0.5 }}>
                      {b.label}
                    </span>
                    <p style={{ fontSize: 9, color: C.textLight, lineHeight: 1.4 }}>{b.result}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          {hasDetail && (
            <span style={{ fontSize: 8, color: C.dim, marginTop: 2, flexShrink: 0 }}>
              {isSelected ? "▲" : "▼"}
            </span>
          )}
        </div>
      </div>
      {step.type !== "end" && (
        <div className="flex justify-center" style={{ height: 8 }}>
          <div style={{ width: 1, height: 8, backgroundColor: C.dimmer }} />
        </div>
      )}
    </div>
  );
}

function PhaseSection({ phase, selectedStep, onToggleStep, isLast, activeTier }) {
  const timeLabel = activeTier === "blaze" ? phase.blazeTime : phase.sparkTime;

  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-3">
        <div
          className="flex items-center justify-center rounded-lg"
          style={{ width: 32, height: 32, backgroundColor: phase.color + "12", border: `1px solid ${phase.color}25` }}
        >
          <span className="font-mono font-bold" style={{ fontSize: 11, color: phase.color }}>{phase.number}</span>
        </div>
        <div className="flex-1">
          <h3 className="font-bold" style={{ fontSize: 14, color: C.white, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {phase.title}
          </h3>
          <p style={{ fontSize: 9, color: C.dim }}>{timeLabel}</p>
        </div>
      </div>
      <div className="ml-4 pl-4" style={{ borderLeft: `2px solid ${phase.color}20` }}>
        {phase.steps
          .filter((step) => {
            if (step.type === "blaze_only" && activeTier === "spark") return false;
            return true;
          })
          .map((step) => (
            <StepCard
              key={step.id}
              step={step}
              isSelected={selectedStep === step.id}
              onToggle={onToggleStep}
              phaseColor={phase.color}
            />
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

export default function LummaBrandingFlow() {
  const [selectedStep, setSelectedStep] = useState(null);
  const [activeTier, setActiveTier] = useState("blaze");
  const [activeView, setActiveView] = useState("flow");

  const toggleStep = (id) => setSelectedStep(selectedStep === id ? null : id);

  const sparkDeliverables = [
    "Logo en formatos PNG, SVG, PDF",
    "Paleta de colores con códigos hex",
    "Tipografías con links de descarga",
    "Avatar de redes sociales",
    "Tarjeta de presentación digital",
  ];

  const blazeDeliverables = [
    ...sparkDeliverables,
    "Brand guidelines (PDF o interactivo)",
    "Paleta extendida + colores de soporte",
    "Sistema tipográfico completo",
    "Templates de redes sociales (Canva)",
    "Firma de email",
    "Presentación básica",
    "Mockups de marca",
    "Walkthrough de uso",
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
              Producción:{" "}
              <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: C.green }}>
                Branding
              </span>
            </h1>
            <p className="mt-2" style={{ fontSize: 11, color: C.gray }}>
              {activeTier === "spark" ? "Spark · $699 · 2-3 semanas" : "Blaze · $1,500 · 3-4 semanas"} · 2 rondas de revisión incluidas
            </p>
          </div>

          {/* Controls */}
          <div className="flex gap-2 mb-6">
            {/* Tier toggle */}
            <div className="flex gap-1 p-1 rounded-lg flex-1" style={{ backgroundColor: C.surface }}>
              <button
                onClick={() => setActiveTier("spark")}
                className="flex-1 py-2 rounded-md text-xs font-medium transition-all"
                style={{
                  backgroundColor: activeTier === "spark" ? C.green + "15" : "transparent",
                  color: activeTier === "spark" ? C.green : C.dim,
                  border: activeTier === "spark" ? `1px solid ${C.green}30` : "1px solid transparent",
                }}
              >
                ⚡ Spark
              </button>
              <button
                onClick={() => setActiveTier("blaze")}
                className="flex-1 py-2 rounded-md text-xs font-medium transition-all"
                style={{
                  backgroundColor: activeTier === "blaze" ? C.pinkSoft + "15" : "transparent",
                  color: activeTier === "blaze" ? C.pinkSoft : C.dim,
                  border: activeTier === "blaze" ? `1px solid ${C.pinkSoft}30` : "1px solid transparent",
                }}
              >
                🔥 Blaze
              </button>
            </div>
            {/* View toggle */}
            <div className="flex gap-1 p-1 rounded-lg" style={{ backgroundColor: C.surface }}>
              <button
                onClick={() => setActiveView("flow")}
                className="px-3 py-2 rounded-md text-xs font-medium transition-all"
                style={{
                  backgroundColor: activeView === "flow" ? C.green : "transparent",
                  color: activeView === "flow" ? C.bg : C.gray,
                }}
              >
                Flujo
              </button>
              <button
                onClick={() => setActiveView("deliverables")}
                className="px-3 py-2 rounded-md text-xs font-medium transition-all"
                style={{
                  backgroundColor: activeView === "deliverables" ? C.green : "transparent",
                  color: activeView === "deliverables" ? C.bg : C.gray,
                }}
              >
                Entregables
              </button>
            </div>
          </div>

          {activeView === "flow" ? (
            <>
              {/* Legend */}
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-6 px-3 py-2.5 rounded-lg" style={{ backgroundColor: C.surface }}>
                {[
                  { icon: "◆", label: "Acción", color: C.green },
                  { icon: "★", label: "Hito", color: C.amber },
                  { icon: "◇", label: "Decisión", color: C.pink },
                  { icon: "◷", label: "Espera", color: C.amber },
                  { icon: "📄", label: "Entregable interno", color: C.green },
                  { icon: "🔥", label: "Solo Blaze", color: C.pinkSoft },
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
                  activeTier={activeTier}
                />
              ))}
            </>
          ) : (
            /* Deliverables view */
            <div className="space-y-3">
              <p className="text-xs mb-1" style={{ color: C.gray }}>
                Entregables incluidos en {activeTier === "spark" ? "Spark" : "Blaze"}
              </p>
              {(activeTier === "spark" ? sparkDeliverables : blazeDeliverables).map((item, i) => {
                const isBlazePlus = activeTier === "blaze" && i >= sparkDeliverables.length;
                return (
                  <div
                    key={i}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg"
                    style={{ backgroundColor: C.surface }}
                  >
                    <span style={{ fontSize: 10, color: isBlazePlus ? C.pinkSoft : C.green }}>
                      {isBlazePlus ? "🔥" : "✓"}
                    </span>
                    <p className="flex-1" style={{ fontSize: 11, color: C.textLight }}>{item}</p>
                    {isBlazePlus && <TierBadge tier="blaze" />}
                  </div>
                );
              })}
            </div>
          )}

          {/* Timeline comparison */}
          <div className="mt-8 rounded-xl px-4 py-4" style={{ backgroundColor: C.surface, border: `1px solid ${C.dimmer}` }}>
            <p className="text-xs font-bold mb-3" style={{ color: C.green, letterSpacing: 1 }}>
              COMPARACIÓN DE TIMELINES
            </p>
            <div className="space-y-2">
              {phases.map((p) => (
                <div key={p.id} className="flex items-center gap-2">
                  <span className="font-mono flex-shrink-0" style={{ fontSize: 9, color: p.color, width: 18 }}>{p.number}</span>
                  <span className="flex-1" style={{ fontSize: 10, color: C.textLight }}>{p.title}</span>
                  <div className="flex gap-1.5">
                    <span className="px-1.5 py-0.5 rounded" style={{ fontSize: 8, color: C.green, backgroundColor: C.green + "10" }}>
                      {p.sparkTime}
                    </span>
                    <span className="px-1.5 py-0.5 rounded" style={{ fontSize: 8, color: C.pinkSoft, backgroundColor: C.pinkSoft + "10" }}>
                      {p.blazeTime}
                    </span>
                  </div>
                </div>
              ))}
              <div className="pt-2 mt-2 flex justify-between" style={{ borderTop: `1px solid ${C.dimmer}` }}>
                <span style={{ fontSize: 10, color: C.white, fontWeight: 700 }}>Total</span>
                <div className="flex gap-1.5">
                  <span className="px-2 py-0.5 rounded font-bold" style={{ fontSize: 9, color: C.bg, backgroundColor: C.green }}>
                    2-3 semanas
                  </span>
                  <span className="px-2 py-0.5 rounded font-bold" style={{ fontSize: 9, color: C.white, backgroundColor: C.pink }}>
                    3-4 semanas
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Revision policy */}
          <div className="mt-4 rounded-xl px-4 py-4" style={{ backgroundColor: C.warm, border: `1px solid ${C.amber}20` }}>
            <p className="text-xs font-bold mb-2" style={{ color: C.amber, letterSpacing: 1 }}>
              POLÍTICA DE REVISIONES
            </p>
            <div className="space-y-1.5">
              {[
                "2 rondas de revisión incluidas en ambos tiers",
                "Cada ronda: 3 días hábiles máximo de respuesta del cliente",
                "Ronda 2 es refinamiento — no cambio de dirección",
                "Rondas adicionales se cotizan por separado",
                "Si el cliente no responde en plazo, el proyecto se pausa",
              ].map((r, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span style={{ fontSize: 8, color: C.amber, marginTop: 2 }}>•</span>
                  <p style={{ fontSize: 10, color: C.textLight, lineHeight: 1.4 }}>{r}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 mb-4 text-center">
            <p style={{ fontSize: 9, color: C.dim, letterSpacing: 2 }}>LUMMA · OPERACIONES · BRANDING · V1.0</p>
          </div>
        </div>
      </div>
    </>
  );
}
