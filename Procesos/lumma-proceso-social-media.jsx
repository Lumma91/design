import { useState } from "react";

const C = {
  bg: "#080808", surface: "#111111", card: "#161616", green: "#CCFF00", pink: "#E6007E",
  pinkSoft: "#FF7EB3", white: "#FFFFFF", textLight: "#D4D0CA", gray: "#777777",
  dim: "#444444", dimmer: "#2a2a2a", warm: "#1C1A18", amber: "#F5A623",
};

const phases = [
  {
    id: "planificacion",
    number: "01",
    title: "Planificación",
    timeline: "Días 1-5",
    color: C.green,
    steps: [
      { id: "revisar", type: "action", label: "Revisar resultados del mes anterior", detail: "Qué funcionó, qué no, mejores piezas, engagement. Si es el primer mes, basarse en el brief y análisis del onboarding" },
      { id: "pilares", type: "action", label: "Definir pilares de contenido del mes", detail: "Temas prioritarios según productos, fechas clave, promociones. Dirección estratégica antes del calendario" },
      { id: "calendario", type: "action", label: "Crear calendario de contenido", spark: "18 piezas distribuidas en el mes. Cada una con formato (Reel, carrusel, post, story), idea central y objetivo", blaze: "26 piezas distribuidas. Meta + 1 plataforma adicional. Más variedad de formatos y frecuencia" },
      { id: "enviar_cal", type: "action", label: "Enviar calendario al cliente", detail: "Google Sheets o Notion. Visual y fácil de entender. El cliente tiene 3 días hábiles para aprobar" },
      { id: "dec_cal", type: "decision", label: "¿Calendario aprobado?", branches: [
        { label: "Ajustes", result: "1 sola ronda de ajustes. Incorporar y reenviar", color: C.amber },
        { label: "Aprobado", result: "Avanza a content day →", color: C.green },
      ]},
    ],
  },
  {
    id: "contentday",
    number: "02",
    title: "Content Day",
    timeline: "Días 5-10",
    color: C.pink,
    steps: [
      { id: "shotlist", type: "action", label: "Pre-producción: shot list", detail: "Basado en calendario aprobado. Qué filmar, en qué orden, props, outfits, setups. Compartir con cliente y freelancer 1-2 días antes" },
      { id: "produccion", type: "milestone", label: "Día de producción", spark: "Medio día (4 horas). Capturar material para las 18 piezas del mes", blaze: "Día completo (8 horas). Material para 26 piezas + B-roll adicional + contenido para plataforma extra" },
      { id: "organizar", type: "action", label: "Organizar material y enviar al editor", detail: "Respaldar en Drive (Producción → [Mes]). Enviar al freelancer con instrucciones claras por pieza: referencia, formato, duración, texto, música" },
      { id: "asana_tareas", type: "auto", label: "Crear tareas de edición en Asana", detail: "Una tarea por pieza asignada al freelancer con deadline. Comunicación por Slack en canal del cliente" },
    ],
  },
  {
    id: "produccion_ed",
    number: "03",
    title: "Producción y edición",
    timeline: "Días 8-18",
    color: C.green,
    steps: [
      { id: "edicion", type: "action", label: "Freelancer edita piezas", detail: "Videos en CapCut, gráficas en Canva. Cada pieza terminada se sube a Drive y se marca en Asana" },
      { id: "qa", type: "milestone", label: "QA interno (tú revisas)", detail: "Verificar: consistencia de marca, copy correcto, formatos y dimensiones. Si necesita ajuste → feedback al freelancer por Slack" },
      { id: "copy", type: "action", label: "Redacción de copy y captions", detail: "Escribir captions, hashtags, CTAs para cada pieza. Apoyo de Claude con tono de voz del cliente. Se agregan al calendario junto a la pieza visual" },
      { id: "paquete", type: "deliverable", label: "Contenido completo del mes listo", detail: "Piezas visuales/video + copies + calendario con fechas. Organizado para enviar al cliente" },
    ],
  },
  {
    id: "aprobacion",
    number: "04",
    title: "Aprobación del cliente",
    timeline: "Días 18-22",
    color: C.amber,
    steps: [
      { id: "enviar_contenido", type: "action", label: "Enviar contenido al cliente", detail: "Por WhatsApp o email según preferencia del brief. Carpeta de Drive organizada por semana o por pieza" },
      { id: "esperar", type: "wait", label: "Cliente revisa (3 días hábiles)", detail: "Ajustes menores incluidos. Ajustes mayores (rehacer pieza o cambio de dirección post-aprobación de calendario) se evalúan con costo adicional" },
      { id: "dec_aprobacion", type: "decision", label: "¿Aprobado?", branches: [
        { label: "Ajustes", result: "Ajustes menores → corregir y reenviar. 1 ronda", color: C.amber },
        { label: "Aprobado", result: "Avanza a programación →", color: C.green },
      ]},
      { id: "regla_silencio", type: "rule", label: "Si no responde en 3 días", detail: "Se notifica que se programará según lo acordado para no retrasar el calendario" },
    ],
  },
  {
    id: "publicacion",
    number: "05",
    title: "Programación y publicación",
    timeline: "Días 22-30",
    color: C.pinkSoft,
    steps: [
      { id: "programar", type: "action", label: "Programar en Meta Business Suite", spark: "Instagram + Facebook. Todo el contenido del mes programado", blaze: "Meta + plataforma adicional (TikTok, LinkedIn). Programar por separado según herramienta de cada plataforma" },
      { id: "stories", type: "action", label: "Publicación de Stories", detail: "Stories se publican en tiempo real o el mismo día. Definir cuáles son programables y cuáles manuales" },
      { id: "community", type: "blaze_only", label: "Community management", detail: "Responder comentarios y DMs 2 veces al día (mañana y tarde). Respuestas que requieran decisión del cliente se escalan por WhatsApp" },
    ],
  },
  {
    id: "reporte",
    number: "06",
    title: "Reporte y cierre del mes",
    timeline: "Últimos 2-3 días",
    color: C.green,
    steps: [
      { id: "metricas", type: "action", label: "Recopilar métricas", detail: "De Meta Business Suite: alcance, impresiones, engagement rate, crecimiento de seguidores, mejores piezas, clicks" },
      { id: "reporte_doc", type: "action", label: "Preparar reporte mensual", detail: "One-pager visual: resumen ejecutivo, métricas vs. mes anterior, top 3 piezas y por qué funcionaron, aprendizajes, recomendación para el próximo mes" },
      { id: "enviar_reporte", type: "action", label: "Enviar reporte al cliente", detail: "Cerrar el mes y abrir planificación del siguiente. 'Así nos fue. Esto aprendimos. Esto recomiendo. ¿Hablamos?'" },
      { id: "cobro", type: "milestone", label: "Cobro del mes siguiente", detail: "Pago dentro de los primeros 5 días del mes. Si no entra, se pausa producción hasta recibir pago. Esto está en el contrato" },
      { id: "loop", type: "end", label: "→ Volver a Fase 01 del nuevo mes", detail: "El ciclo se repite. La planificación del mes siguiente arranca con los aprendizajes del reporte" },
    ],
  },
];

function TierBadge({ tier }) {
  const isBlaze = tier === "blaze";
  return (
    <span className="px-1.5 py-0.5 rounded font-bold uppercase"
      style={{ fontSize: 7, letterSpacing: 1, color: isBlaze ? C.pinkSoft : C.green, backgroundColor: (isBlaze ? C.pinkSoft : C.green) + "12", border: `1px solid ${(isBlaze ? C.pinkSoft : C.green)}25` }}>
      {tier}
    </span>
  );
}

function StepCard({ step, isSelected, onToggle, phaseColor, activeTier }) {
  if (step.type === "blaze_only" && activeTier === "spark") return null;
  const styles = {
    action: { bg: C.card, border: phaseColor + "30", text: C.white, icon: "◆", iconColor: phaseColor },
    milestone: { bg: C.warm, border: phaseColor + "50", text: phaseColor, icon: "★", iconColor: phaseColor },
    decision: { bg: C.warm, border: C.pink + "40", text: C.white, icon: "◇", iconColor: C.pink },
    wait: { bg: C.surface, border: C.amber + "25", text: C.textLight, icon: "◷", iconColor: C.amber, dashed: true },
    auto: { bg: C.surface, border: C.dimmer, text: C.textLight, icon: "⚡", iconColor: C.dim, dashed: true },
    deliverable: { bg: C.card, border: C.green + "35", text: C.green, icon: "📄", iconColor: C.green },
    blaze_only: { bg: C.card, border: C.pinkSoft + "25", text: C.pinkSoft, icon: "🔥", iconColor: C.pinkSoft },
    rule: { bg: C.surface, border: C.amber + "30", text: C.amber, icon: "⚠", iconColor: C.amber },
    end: { bg: C.green, border: C.green, text: C.bg, icon: "↻", iconColor: C.bg },
  };
  const s = styles[step.type] || styles.action;
  const hasTierDiff = step.spark && step.blaze;
  const hasDetail = step.detail || hasTierDiff || step.branches;

  return (
    <div className="mb-2">
      <div onClick={() => hasDetail && onToggle(step.id)}
        className="rounded-xl px-3.5 py-3 transition-all duration-200"
        style={{ backgroundColor: s.bg, border: `1px ${s.dashed ? "dashed" : "solid"} ${s.border}`, cursor: hasDetail ? "pointer" : "default", transform: isSelected ? "scale(1.02)" : "scale(1)", boxShadow: isSelected ? `0 0 20px ${phaseColor}15` : "none" }}>
        <div className="flex items-start gap-2.5">
          <span style={{ fontSize: 11, color: s.iconColor, marginTop: 1, flexShrink: 0 }}>{s.icon}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-semibold leading-tight flex-1" style={{ fontSize: 12, color: s.text, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{step.label}</p>
              {step.type === "blaze_only" && <TierBadge tier="blaze" />}
            </div>
            {isSelected && step.detail && !step.branches && (
              <p className="mt-1.5 leading-relaxed animate-fadeIn" style={{ fontSize: 10, color: C.textLight }}>{step.detail}</p>
            )}
            {isSelected && hasTierDiff && (
              <div className="mt-2 space-y-1.5 animate-fadeIn">
                <div className="px-2.5 py-2 rounded-lg" style={{ backgroundColor: C.green + "08", border: `1px solid ${C.green}15` }}>
                  <div className="flex items-center gap-1.5 mb-1"><TierBadge tier="spark" /></div>
                  <p style={{ fontSize: 9, color: C.textLight, lineHeight: 1.4 }}>{step.spark}</p>
                </div>
                <div className="px-2.5 py-2 rounded-lg" style={{ backgroundColor: C.pinkSoft + "08", border: `1px solid ${C.pinkSoft}15` }}>
                  <div className="flex items-center gap-1.5 mb-1"><TierBadge tier="blaze" /></div>
                  <p style={{ fontSize: 9, color: C.textLight, lineHeight: 1.4 }}>{step.blaze}</p>
                </div>
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

function PhaseSection({ phase, selectedStep, onToggleStep, isLast, activeTier }) {
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
          <StepCard key={step.id} step={step} isSelected={selectedStep === step.id} onToggle={onToggleStep} phaseColor={phase.color} activeTier={activeTier} />
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

export default function LummaSocialMediaFlow() {
  const [selectedStep, setSelectedStep] = useState(null);
  const [activeTier, setActiveTier] = useState("blaze");
  const toggleStep = (id) => setSelectedStep(selectedStep === id ? null : id);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@1&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
      `}</style>
      <div className="min-h-screen py-8 px-4" style={{ backgroundColor: C.bg, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <div className="max-w-lg mx-auto">
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
              <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: C.pinkSoft }}>Social Media</span>
            </h1>
            <p className="mt-2" style={{ fontSize: 11, color: C.gray }}>
              Ciclo mensual recurrente · {activeTier === "spark" ? "Spark · $1,800/mes · 18 piezas" : "Blaze · $2,500/mes · 26 piezas"}
            </p>
          </div>

          {/* Tier toggle */}
          <div className="flex gap-1.5 p-1.5 rounded-xl mb-6" style={{ backgroundColor: C.surface }}>
            <button onClick={() => setActiveTier("spark")} className="flex-1 py-2 rounded-lg text-xs font-medium transition-all"
              style={{ backgroundColor: activeTier === "spark" ? C.green + "15" : "transparent", color: activeTier === "spark" ? C.green : C.dim, border: activeTier === "spark" ? `1px solid ${C.green}30` : "1px solid transparent" }}>
              ⚡ Spark · 18 piezas
            </button>
            <button onClick={() => setActiveTier("blaze")} className="flex-1 py-2 rounded-lg text-xs font-medium transition-all"
              style={{ backgroundColor: activeTier === "blaze" ? C.pinkSoft + "15" : "transparent", color: activeTier === "blaze" ? C.pinkSoft : C.dim, border: activeTier === "blaze" ? `1px solid ${C.pinkSoft}30` : "1px solid transparent" }}>
              🔥 Blaze · 26 piezas
            </button>
          </div>

          {/* Cycle indicator */}
          <div className="flex items-center gap-2 mb-6 px-3 py-2.5 rounded-lg" style={{ backgroundColor: C.warm, border: `1px solid ${C.dimmer}` }}>
            <span style={{ fontSize: 14 }}>↻</span>
            <p style={{ fontSize: 10, color: C.textLight }}>
              Este es un <span style={{ color: C.green, fontWeight: 700 }}>ciclo mensual recurrente</span>. La Fase 06 conecta de vuelta con la Fase 01 del mes siguiente.
            </p>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-6 px-3 py-2.5 rounded-lg" style={{ backgroundColor: C.surface }}>
            {[
              { icon: "◆", label: "Acción", color: C.green },
              { icon: "★", label: "Hito", color: C.amber },
              { icon: "◇", label: "Decisión", color: C.pink },
              { icon: "◷", label: "Espera", color: C.amber },
              { icon: "📄", label: "Entregable", color: C.green },
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
            <PhaseSection key={phase.id} phase={phase} selectedStep={selectedStep} onToggleStep={toggleStep} isLast={i === phases.length - 1} activeTier={activeTier} />
          ))}

          {/* Timeline visual */}
          <div className="mt-8 rounded-xl px-4 py-4" style={{ backgroundColor: C.surface, border: `1px solid ${C.dimmer}` }}>
            <p className="text-xs font-bold mb-3" style={{ color: C.green, letterSpacing: 1 }}>TIMELINE MENSUAL</p>
            <div className="space-y-2">
              {phases.map((p) => (
                <div key={p.id} className="flex items-center gap-2">
                  <span className="font-mono flex-shrink-0" style={{ fontSize: 9, color: p.color, width: 18 }}>{p.number}</span>
                  <span className="flex-1" style={{ fontSize: 10, color: C.textLight }}>{p.title}</span>
                  <span className="px-2 py-0.5 rounded" style={{ fontSize: 8, color: p.color, backgroundColor: p.color + "10", fontWeight: 600 }}>{p.timeline}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Roles */}
          <div className="mt-4 rounded-xl px-4 py-4" style={{ backgroundColor: C.surface, border: `1px solid ${C.dimmer}` }}>
            <p className="text-xs font-bold mb-3" style={{ color: C.pinkSoft, letterSpacing: 1 }}>ROLES EN EL FLUJO</p>
            <div className="space-y-2">
              {[
                { role: "Tú (Directora creativa)", tasks: "Estrategia, calendario, dirección de content day, copy, QA, relación con cliente, reporte", color: C.green },
                { role: "Freelancer (Editor)", tasks: "Edición de video en CapCut, diseño en Canva, entrega de piezas en Drive", color: C.pinkSoft },
                { role: "Cliente", tasks: "Aprobar calendario, participar en content day, aprobar contenido, pagar", color: C.amber },
              ].map((r) => (
                <div key={r.role} className="px-3 py-2.5 rounded-lg" style={{ backgroundColor: C.card }}>
                  <p className="font-bold mb-0.5" style={{ fontSize: 10, color: r.color }}>{r.role}</p>
                  <p style={{ fontSize: 9, color: C.gray }}>{r.tasks}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 mb-4 text-center">
            <p style={{ fontSize: 9, color: C.dim, letterSpacing: 2 }}>LUMMA · OPERACIONES · SOCIAL MEDIA · V1.0</p>
          </div>
        </div>
      </div>
    </>
  );
}
