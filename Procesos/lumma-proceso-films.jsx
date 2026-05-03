import { useState } from "react";

const C = {
  bg: "#080808", surface: "#111111", card: "#161616", green: "#CCFF00", pink: "#E6007E",
  pinkSoft: "#FF7EB3", white: "#FFFFFF", textLight: "#D4D0CA", gray: "#777777",
  dim: "#444444", dimmer: "#2a2a2a", warm: "#1C1A18", amber: "#F5A623",
};

const categories = [
  { id: "brand", label: "Brand Film", timeline: "3-4 semanas", icon: "🎬", color: C.green },
  { id: "content", label: "Content Day", timeline: "1-2 semanas", icon: "📱", color: C.pinkSoft },
  { id: "showcase", label: "Showcase", timeline: "2-3 semanas", icon: "🎯", color: C.amber },
  { id: "testimonial", label: "Testimonial", timeline: "2-3 semanas", icon: "🗣", color: C.pink },
  { id: "event", label: "Evento", timeline: "1-2 sem post-evento", icon: "📍", color: C.green },
];

const phases = [
  {
    id: "preproduccion",
    number: "01",
    title: "Pre-producción",
    timelines: { brand: "Semana 1-2", content: "Días 1-5", showcase: "Semana 1", testimonial: "Semana 1", event: "Días 1-3 pre-evento" },
    color: C.green,
    steps: [
      { id: "brief_review", type: "action", label: "Revisión del brief + sesión de alineación",
        detail: "Revisar brief de Films del onboarding. Si hay vacíos, llamada de 15-20 min. Al final: objetivo, audiencia, mensaje, tono, plataformas y entregables claros" },
      { id: "concepto", type: "action", label: "Desarrollo del concepto creativo",
        byCategory: {
          brand: "Tratamiento creativo (1-2 páginas): narrativa, estilo visual, tono, estructura. Mood board + referencias",
          content: "Mood board + shot list. Dirección visual y tipos de contenido a producir",
          showcase: "Escaleta de producto: features a mostrar, ángulos, contexto de uso. Mood board",
          testimonial: "Guía de preguntas para entrevistados + dirección visual del B-roll. Mood board",
          event: "Timeline del evento con momentos clave a capturar + shot list de B-roll y ambiente",
        }},
      { id: "aprobacion_concepto", type: "milestone", label: "Aprobación del concepto por el cliente",
        detail: "3 días hábiles para revisar. Concepto aprobado = documento de referencia. Cambios posteriores del cliente fuera de lo aprobado = costo adicional" },
      { id: "logistica", type: "action", label: "Planificación logística",
        detail: "Scouting de locación (iluminación, espacio, ruido, permisos). Coordinación de talento (quién, horarios, wardrobe). Equipo técnico (freelancers: camarógrafo, sonidista). Gear (cámara, lentes, luces, audio — alquiler si necesario)" },
      { id: "shotlist", type: "action", label: "Shot list y guion/escaleta",
        byCategory: {
          brand: "Guion completo o escaleta detallada con cada escena, diálogos/voiceover, y shot list técnico",
          content: "Shot list por setup: cuántos setups, qué se filma en cada uno, orden de producción",
          showcase: "Escaleta de producto con shots específicos de features, uso, detalles, contexto",
          testimonial: "Guía de preguntas (abiertas, que generen narrativa) + shot list de B-roll complementario",
          event: "Timeline del evento con momentos imperdibles + checklist de tomas obligatorias",
        }},
      { id: "callsheet", type: "deliverable", label: "Call sheet (día antes de filmación)",
        detail: "Enviar a todos los involucrados: horario de llegada, dirección, contactos, agenda del día, qué traer. Es la hoja de ruta del día de producción" },
    ],
  },
  {
    id: "produccion",
    number: "02",
    title: "Producción",
    timelines: { brand: "1 día", content: "1 día", showcase: "1 día", testimonial: "1 día", event: "Durante el evento" },
    color: C.pink,
    steps: [
      { id: "setup", type: "action", label: "Setup y preparación",
        detail: "Llegar antes que el cliente. Verificar locación, iluminación, audio. Montar equipo. Revisar shot list con el equipo. Si hay talento, repasar expectativas — darles contexto y confianza" },
      { id: "filmacion", type: "milestone", label: "Filmación",
        byCategory: {
          brand: "Seguir guion/escaleta con flexibilidad. Capturar cada escena + B-roll generoso. Tú diriges, freelancer filma",
          content: "Trabajar por setups. Terminar un setup completo antes de pasar al siguiente. Capturar variedad de formatos",
          showcase: "Filmar producto en contexto de uso, detalles macro, features destacados. Multiple ángulos por setup",
          testimonial: "Crear ambiente cómodo. Preguntas abiertas. No cortar al entrevistado. Capturar B-roll del negocio/contexto",
          event: "Capturar momentos clave del timeline + ambiente general + detalles + reacciones. Ser invisible pero presente",
        }},
      { id: "broll", type: "action", label: "B-roll adicional",
        detail: "Siempre filmar más de lo necesario. Detalles, ambiente, movimiento, texturas. Esto salva la edición y da opciones al editor" },
      { id: "respaldo", type: "milestone", label: "Respaldo y organización del material",
        detail: "Respaldar en al menos 2 lugares (disco duro + nube). Organizar por escena/setup/tipo. Subir a Drive del cliente: Producción → [Proyecto] → Material bruto" },
    ],
  },
  {
    id: "postproduccion",
    number: "03",
    title: "Post-producción",
    timelines: { brand: "Semana 2-4", content: "Días 3-10", showcase: "Semana 2-3", testimonial: "Semana 2-3", event: "Semana 1-2 post-evento" },
    color: C.amber,
    steps: [
      { id: "brief_editor", type: "action", label: "Brief de edición para el freelancer",
        detail: "Concepto aprobado, notas de qué tomas funcionaron, estructura del video, estilo de edición (ritmo, transiciones, color), música/sonido, textos/gráficos, formatos de entrega" },
      { id: "rough_cut", type: "action", label: "Primer corte (rough cut)",
        detail: "Editor entrega estructura completa sin pulir: color básico, música temporal, gráficos placeholder. Tú revisas internamente antes de mostrar al cliente" },
      { id: "qa_interno", type: "milestone", label: "QA interno (tú revisas)",
        detail: "Verificar: narrativa funciona, ritmo correcto, continuidad, marca consistente. Si necesita ajustes → feedback al editor por Slack antes de mostrar al cliente" },
      { id: "presentar_corte1", type: "action", label: "Presentar primer corte al cliente",
        detail: "Con contexto: 'Estructura y narrativa están, falta color final, música definitiva y gráficos. El feedback ahora debe ser sobre historia y estructura, no acabado.' Cliente: 3 días hábiles" },
      { id: "ronda1", type: "action", label: "Ronda 1 — Ajustes principales",
        detail: "Incorporar feedback. Editor entrega segundo corte más pulido: color grading avanzado, música seleccionada, gráficos más definidos" },
      { id: "presentar_corte2", type: "action", label: "Presentar segundo corte al cliente",
        detail: "Feedback de refinamiento solamente. Cambio de dirección o rehacer secciones después de aprobar concepto + primer corte = trabajo adicional con costo" },
      { id: "ronda2", type: "action", label: "Ronda 2 — Refinamiento final",
        detail: "Ajustes finos: timing, volumen, color de texto, orden de secuencia. Editor entrega versión final" },
      { id: "dec_revision", type: "decision", label: "¿Aprobado?", branches: [
        { label: "Sí", result: "Avanza a entrega final →", color: C.green },
        { label: "Más cambios", result: "Ronda adicional con costo extra. Se cotiza aparte", color: C.pinkSoft },
      ]},
      { id: "regla_rev", type: "rule", label: "2 rondas incluidas en todos los proyectos",
        detail: "Rondas adicionales se cotizan por separado. Esto está en el contrato desde el inicio. Cada ronda: 3 días hábiles de respuesta del cliente" },
    ],
  },
  {
    id: "entrega",
    number: "04",
    title: "Entrega final",
    timelines: { brand: "Semana 4", content: "Día 10-14", showcase: "Semana 3", testimonial: "Semana 3", event: "Semana 2 post-evento" },
    color: C.green,
    steps: [
      { id: "renders", type: "action", label: "Renders y exportación",
        detail: "Versión completa (horizontal para web/YouTube). Versiones cortas para redes (9:16 para Reels/TikTok, 1:1 si aplica). Con y sin subtítulos si se acordó" },
      { id: "organizar_entrega", type: "action", label: "Organizar entregables en Drive",
        detail: "Carpeta Entregables → [Proyecto]. Estructura por formato, plataforma y duración. Guía breve de qué archivo usar para qué" },
      { id: "enviar_final", type: "milestone", label: "Enviar al cliente",
        detail: "Mensaje de entrega formal + link a Drive. Incluir guía de uso de archivos por plataforma" },
      { id: "pago_final", type: "milestone", label: "Solicitar pago del 50% restante",
        detail: "Factura final junto con la entrega. Pago esperado en máximo 5 días hábiles" },
    ],
  },
  {
    id: "cierre",
    number: "05",
    title: "Cierre y transición",
    timelines: { brand: "Post-entrega", content: "Post-entrega", showcase: "Post-entrega", testimonial: "Post-entrega", event: "Post-entrega" },
    color: C.pinkSoft,
    steps: [
      { id: "admin", type: "auto", label: "Cierre administrativo",
        detail: "Pago final recibido. Factura emitida. Asana completado. HubSpot → Cerrado ganado. Pagar freelancers de filmación y edición" },
      { id: "archivos", type: "action", label: "Archivos de proyecto",
        detail: "Si el cliente solicita, entregar editables (proyecto CapCut/Premiere). Si no, archivar internamente por 6 meses" },
      { id: "transicion", type: "action", label: "Oportunidad de transición",
        detail: "'El video quedó increíble. Ahora imagina tener este nivel de contenido cada mes en tus redes.' Momento natural para proponer Social Media o siguiente proyecto Films" },
      { id: "fin", type: "end", label: "Proyecto completado",
        detail: "Cliente puede transicionar a Social Media, otro proyecto Films, o Branding si no lo tiene" },
    ],
  },
];

function CategorySelector({ active, onChange }) {
  return (
    <div className="flex gap-1.5 overflow-x-auto pb-2 mb-6 -mx-1 px-1" style={{ scrollbarWidth: "none" }}>
      {categories.map((cat) => (
        <button key={cat.id} onClick={() => onChange(cat.id)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all flex-shrink-0"
          style={{
            backgroundColor: active === cat.id ? cat.color + "15" : C.surface,
            color: active === cat.id ? cat.color : C.dim,
            border: `1px solid ${active === cat.id ? cat.color + "30" : "transparent"}`,
          }}>
          <span>{cat.icon}</span>
          <span>{cat.label}</span>
        </button>
      ))}
    </div>
  );
}

function StepCard({ step, isSelected, onToggle, phaseColor, activeCategory }) {
  const styles = {
    action: { bg: C.card, border: phaseColor + "30", text: C.white, icon: "◆", iconColor: phaseColor },
    milestone: { bg: C.warm, border: phaseColor + "50", text: phaseColor, icon: "★", iconColor: phaseColor },
    decision: { bg: C.warm, border: C.pink + "40", text: C.white, icon: "◇", iconColor: C.pink },
    deliverable: { bg: C.card, border: C.green + "35", text: C.green, icon: "📄", iconColor: C.green },
    rule: { bg: C.surface, border: C.amber + "30", text: C.amber, icon: "⚠", iconColor: C.amber },
    auto: { bg: C.surface, border: C.dimmer, text: C.textLight, icon: "⚡", iconColor: C.dim, dashed: true },
    end: { bg: C.green, border: C.green, text: C.bg, icon: "✓", iconColor: C.bg },
  };
  const s = styles[step.type] || styles.action;
  const hasCategoryDetail = step.byCategory && step.byCategory[activeCategory];
  const hasDetail = step.detail || hasCategoryDetail || step.branches;

  return (
    <div className="mb-2">
      <div onClick={() => hasDetail && onToggle(step.id)}
        className="rounded-xl px-3.5 py-3 transition-all duration-200"
        style={{ backgroundColor: s.bg, border: `1px ${s.dashed ? "dashed" : "solid"} ${s.border}`, cursor: hasDetail ? "pointer" : "default", transform: isSelected ? "scale(1.02)" : "scale(1)", boxShadow: isSelected ? `0 0 20px ${phaseColor}15` : "none" }}>
        <div className="flex items-start gap-2.5">
          <span style={{ fontSize: 11, color: s.iconColor, marginTop: 1, flexShrink: 0 }}>{s.icon}</span>
          <div className="flex-1 min-w-0">
            <p className="font-semibold leading-tight" style={{ fontSize: 12, color: s.text, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{step.label}</p>
            {isSelected && step.detail && !step.branches && (
              <p className="mt-1.5 leading-relaxed animate-fadeIn" style={{ fontSize: 10, color: C.textLight }}>{step.detail}</p>
            )}
            {isSelected && hasCategoryDetail && (
              <div className="mt-2 px-2.5 py-2 rounded-lg animate-fadeIn" style={{ backgroundColor: C.warm, border: `1px solid ${C.dimmer}` }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <span style={{ fontSize: 10 }}>{categories.find(c => c.id === activeCategory)?.icon}</span>
                  <span className="font-bold uppercase" style={{ fontSize: 8, color: categories.find(c => c.id === activeCategory)?.color, letterSpacing: 1 }}>
                    {categories.find(c => c.id === activeCategory)?.label}
                  </span>
                </div>
                <p style={{ fontSize: 9, color: C.textLight, lineHeight: 1.5 }}>{step.byCategory[activeCategory]}</p>
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

function PhaseSection({ phase, selectedStep, onToggleStep, isLast, activeCategory }) {
  const timeline = phase.timelines[activeCategory];
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center justify-center rounded-lg" style={{ width: 32, height: 32, backgroundColor: phase.color + "12", border: `1px solid ${phase.color}25` }}>
          <span className="font-mono font-bold" style={{ fontSize: 11, color: phase.color }}>{phase.number}</span>
        </div>
        <div className="flex-1">
          <h3 className="font-bold" style={{ fontSize: 14, color: C.white, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{phase.title}</h3>
          <p style={{ fontSize: 9, color: C.dim }}>{timeline}</p>
        </div>
      </div>
      <div className="ml-4 pl-4" style={{ borderLeft: `2px solid ${phase.color}20` }}>
        {phase.steps.map((step) => (
          <StepCard key={step.id} step={step} isSelected={selectedStep === step.id} onToggle={onToggleStep} phaseColor={phase.color} activeCategory={activeCategory} />
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

export default function LummaFilmsFlow() {
  const [selectedStep, setSelectedStep] = useState(null);
  const [activeCategory, setActiveCategory] = useState("brand");
  const toggleStep = (id) => setSelectedStep(selectedStep === id ? null : id);
  const activeCat = categories.find(c => c.id === activeCategory);

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
              <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: C.amber }}>Lumma Films</span>
            </h1>
            <p className="mt-2" style={{ fontSize: 11, color: C.gray }}>
              {activeCat.icon} {activeCat.label} · {activeCat.timeline} · Cotización por proyecto · 2 rondas de revisión
            </p>
          </div>

          {/* Category selector */}
          <CategorySelector active={activeCategory} onChange={setActiveCategory} />

          {/* Legend */}
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-6 px-3 py-2.5 rounded-lg" style={{ backgroundColor: C.surface }}>
            {[
              { icon: "◆", label: "Acción", color: C.green },
              { icon: "★", label: "Hito", color: C.amber },
              { icon: "◇", label: "Decisión", color: C.pink },
              { icon: "📄", label: "Entregable", color: C.green },
              { icon: "⚠", label: "Regla", color: C.amber },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <span style={{ fontSize: 9, color: l.color }}>{l.icon}</span>
                <span style={{ fontSize: 8, color: C.dim }}>{l.label}</span>
              </div>
            ))}
          </div>

          {/* Phases */}
          {phases.map((phase, i) => (
            <PhaseSection key={phase.id} phase={phase} selectedStep={selectedStep} onToggleStep={toggleStep} isLast={i === phases.length - 1} activeCategory={activeCategory} />
          ))}

          {/* Timeline comparison */}
          <div className="mt-8 rounded-xl px-4 py-4" style={{ backgroundColor: C.surface, border: `1px solid ${C.dimmer}` }}>
            <p className="text-xs font-bold mb-3" style={{ color: C.green, letterSpacing: 1 }}>TIMELINES POR CATEGORÍA</p>
            <div className="space-y-2">
              {categories.map((cat) => (
                <div key={cat.id} className="flex items-center gap-2 px-2.5 py-2 rounded-lg"
                  style={{ backgroundColor: activeCategory === cat.id ? cat.color + "08" : "transparent", border: `1px solid ${activeCategory === cat.id ? cat.color + "20" : "transparent"}` }}>
                  <span style={{ fontSize: 12 }}>{cat.icon}</span>
                  <span className="flex-1" style={{ fontSize: 10, color: activeCategory === cat.id ? C.white : C.gray, fontWeight: activeCategory === cat.id ? 600 : 400 }}>{cat.label}</span>
                  <span className="px-2 py-0.5 rounded" style={{ fontSize: 9, color: cat.color, backgroundColor: cat.color + "10", fontWeight: 600 }}>{cat.timeline}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment + revision policy */}
          <div className="mt-4 rounded-xl px-4 py-4" style={{ backgroundColor: C.warm, border: `1px solid ${C.amber}20` }}>
            <p className="text-xs font-bold mb-2" style={{ color: C.amber, letterSpacing: 1 }}>PAGOS Y REVISIONES</p>
            <div className="space-y-1.5">
              {[
                "50% anticipo al firmar contrato — antes de iniciar cualquier trabajo",
                "50% restante al entregar la versión final aprobada",
                "2 rondas de revisión incluidas en todos los proyectos",
                "Ronda 1: feedback sobre estructura y narrativa (rough cut)",
                "Ronda 2: refinamiento final (no cambio de dirección)",
                "Rondas adicionales se cotizan por separado",
                "3 días hábiles de respuesta por ronda — si no responde, proyecto se pausa",
              ].map((r, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span style={{ fontSize: 8, color: C.amber, marginTop: 2 }}>•</span>
                  <p style={{ fontSize: 10, color: C.textLight, lineHeight: 1.4 }}>{r}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Team roles */}
          <div className="mt-4 rounded-xl px-4 py-4" style={{ backgroundColor: C.surface, border: `1px solid ${C.dimmer}` }}>
            <p className="text-xs font-bold mb-3" style={{ color: C.pinkSoft, letterSpacing: 1 }}>EQUIPO DE PRODUCCIÓN</p>
            <div className="space-y-2">
              {[
                { role: "Tú (Directora creativa)", tasks: "Concepto, dirección en set, QA de edición, relación con cliente, aprobaciones", color: C.green },
                { role: "Camarógrafo / Filmmaker", tasks: "Filmación bajo tu dirección. Recibe: call sheet, shot list, concepto aprobado", color: C.amber },
                { role: "Editor", tasks: "Post-producción en CapCut. Recibe: material en Drive, brief de edición, acceso al proyecto", color: C.pinkSoft },
                { role: "Cliente", tasks: "Aprobar concepto, participar en filmación (si aplica), aprobar cortes, pagar", color: C.gray },
              ].map((r) => (
                <div key={r.role} className="px-3 py-2.5 rounded-lg" style={{ backgroundColor: C.card }}>
                  <p className="font-bold mb-0.5" style={{ fontSize: 10, color: r.color }}>{r.role}</p>
                  <p style={{ fontSize: 9, color: C.gray }}>{r.tasks}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 mb-4 text-center">
            <p style={{ fontSize: 9, color: C.dim, letterSpacing: 2 }}>LUMMA · OPERACIONES · FILMS · V1.0</p>
          </div>
        </div>
      </div>
    </>
  );
}
