import { useState } from "react";

const C = {
  bg: "#080808", surface: "#111111", card: "#161616", green: "#CCFF00", pink: "#E6007E",
  pinkSoft: "#FF7EB3", white: "#FFFFFF", textLight: "#D4D0CA", gray: "#777777",
  dim: "#444444", dimmer: "#2a2a2a", warm: "#1C1A18", amber: "#F5A623",
  cyan: "#00D4FF",
};

const roles = [
  { id: "editor", label: "Editor de video", icon: "🎬", color: C.amber },
  { id: "designer", label: "Diseñador", icon: "🎨", color: C.pinkSoft },
  { id: "filmmaker", label: "Filmmaker", icon: "📹", color: C.green },
  { id: "cm", label: "Community Mgr", icon: "💬", color: C.cyan },
];

const phases = [
  {
    id: "seleccion",
    number: "01",
    title: "Selección y acuerdo",
    timeline: "Pre-onboarding · 1-5 días",
    color: C.gray,
    steps: [
      { id: "definir_perfil", type: "action", label: "Definir el perfil necesario",
        detail: "Rol, cliente/proyecto, habilidades técnicas, volumen de trabajo, si es por proyecto o recurrente" },
      { id: "evaluar", type: "action", label: "Evaluar candidato",
        detail: "Revisar portafolio, llamada corta (15 min), y si es posible prueba pagada pequeña antes de comprometerlo con un proyecto real" },
      { id: "dec_candidato", type: "decision", label: "¿Es buen fit?", branches: [
        { label: "Sí", result: "Preparar acuerdo de colaboración →", color: C.green },
        { label: "No", result: "Agradecer y seguir buscando", color: C.pinkSoft },
        { label: "Prueba", result: "Asignar prueba pagada pequeña antes de decidir", color: C.amber },
      ]},
      { id: "acuerdo", type: "milestone", label: "Firmar acuerdo de colaboración",
        detail: "Alcance, tarifa (por pieza/hora/proyecto), forma y plazo de pago, disponibilidad, tiempos de entrega, NDA. Documento de 1-2 páginas firmado por ambos" },
    ],
  },
  {
    id: "bienvenida",
    number: "02",
    title: "Bienvenida y conocimiento de marca",
    timeline: "Día 1",
    color: C.green,
    steps: [
      { id: "msg_bienvenida", type: "action", label: "Mensaje de bienvenida personal",
        detail: "Tuyo, no automatizado. Bienvenida al equipo, cómo trabaja Lumma, qué esperas, y que va a recibir todo lo necesario para arrancar" },
      { id: "kit_marca", type: "deliverable", label: "Compartir Kit de marca Lumma",
        detail: "Versión para colaboradores: misión y propósito, valores, tono de voz, identidad visual (paleta, tipografía, logo), posicionamiento, qué hacemos y para quién" },
      { id: "estandares", type: "deliverable", label: "Compartir estándares de calidad del rol",
        byRole: {
          editor: "Estilo de edición, ritmo, color grading, uso de música, formato de entrega. Ejemplos de 'esto sí / esto no'",
          designer: "Uso de tipografía, paleta, composición, espacio negativo, consistencia con templates. Ejemplos visuales",
          filmmaker: "Estilo de filmación, tipos de tomas, iluminación, audio, B-roll. Referencias de nivel esperado",
          cm: "Tono de respuesta, tiempos de respuesta, qué escalar y qué resolver solo. Ejemplos de interacciones",
        }},
    ],
  },
  {
    id: "herramientas",
    number: "03",
    title: "Herramientas y accesos",
    timeline: "Día 1-2",
    color: C.pinkSoft,
    steps: [
      { id: "slack_access", type: "auto", label: "Slack — Agregar a canales",
        detail: "Canal general de Lumma + canal(es) del cliente asignado. Comunicación del día a día, preguntas, feedback" },
      { id: "drive_access", type: "auto", label: "Google Drive — Acceso a carpetas",
        detail: "Solo subcarpetas relevantes del cliente (no Administrativo). Acceso mínimo necesario. Se revoca al terminar la colaboración" },
      { id: "asana_access", type: "auto", label: "Asana — Agregar como colaborador",
        detail: "Agregarlo al proyecto del cliente. Asignar tareas con deadlines. Explicar: dónde ve tareas, cómo marca completado, cómo avisa bloqueos" },
      { id: "tool_rol", type: "auto", label: "Herramienta específica del rol",
        byRole: {
          editor: "CapCut — Acceso al proyecto del cliente. Material bruto en Drive. Brief de edición como referencia",
          designer: "Canva — Acceso a carpeta del cliente. Brand Kit configurado. Templates base listos para usar",
          filmmaker: "Shot list, call sheet, concepto aprobado. Acceso a Drive para subir material post-filmación",
          cm: "Meta Business Suite — Permisos de nivel adecuado (NO admin). Guía de tono de voz y respuestas frecuentes",
        }},
      { id: "regla_accesos", type: "rule", label: "Regla: acceso mínimo necesario",
        detail: "Solo lo que necesita para su rol y clientes asignados. Al terminar el proyecto o colaboración, revocar todos los accesos inmediatamente" },
    ],
  },
  {
    id: "contexto",
    number: "04",
    title: "Contexto del cliente",
    timeline: "Día 2",
    color: C.amber,
    steps: [
      { id: "brief_cliente", type: "deliverable", label: "Brief del cliente asignado",
        detail: "Resumen de una página: quién es, qué hace, a quién le habla, qué tono tiene su marca, qué servicio tenemos contratado" },
      { id: "identidad_cliente", type: "deliverable", label: "Identidad de marca del cliente",
        detail: "Brand guidelines si existen, o referencias clave: colores, tipografía, logo, estilo visual. Todo lo que necesita para mantener consistencia" },
      { id: "contexto_proyecto", type: "action", label: "Contexto del proyecto actual",
        detail: "Qué estamos haciendo, en qué fase estamos, cuál es su rol específico, entregables esperados, y deadline" },
      { id: "ejemplos", type: "deliverable", label: "Ejemplos de referencia",
        detail: "2-3 piezas ya aprobadas por el cliente o referencias visuales del nivel y estilo esperado. Vale más que mil palabras de explicación" },
    ],
  },
  {
    id: "flujo",
    number: "05",
    title: "Flujo de trabajo y comunicación",
    timeline: "Día 2",
    color: C.green,
    steps: [
      { id: "como_recibe", type: "action", label: "Cómo recibe trabajo",
        detail: "Tareas llegan por Asana con deadline, descripción y archivos/links. Urgencias por Slack. Nunca WhatsApp para trabajo" },
      { id: "como_entrega", type: "action", label: "Cómo entrega trabajo",
        detail: "1) Subir archivos a Drive (Producción → [Mes/Proyecto]). 2) Marcar tarea como completada en Asana. 3) Notificar por Slack que está listo para QA" },
      { id: "como_comunica", type: "action", label: "Cómo se comunica",
        detail: "Slack para todo. No WhatsApp. Si necesita hablar, agenda un momento — no interrumpe sin contexto. Revisa Slack mín. 2 veces al día en días laborables" },
      { id: "como_feedback", type: "action", label: "Cómo recibe feedback",
        detail: "Tú haces QA antes del cliente. Feedback por Slack: siempre específico (qué cambiar, por qué, referencia visual). Nunca vago como 'no me convence'" },
      { id: "dudas_bloqueos", type: "rule", label: "Dudas y bloqueos",
        detail: "Preguntar en Slack antes de asumir. Mejor preguntar y hacer bien a la primera. Si está bloqueado, avisar de inmediato — no esperar al deadline" },
    ],
  },
  {
    id: "primera_tarea",
    number: "06",
    title: "Primera tarea supervisada",
    timeline: "Día 3-5",
    color: C.pink,
    steps: [
      { id: "asignar_tarea", type: "action", label: "Asignar primera tarea real (bajo riesgo)",
        detail: "No la pieza más importante del mes. Algo que si sale mal, no afecta al cliente ni al deadline general" },
      { id: "revisar_detalle", type: "milestone", label: "Revisar con más detalle de lo usual",
        detail: "Feedback detallado, corregir lo que haga falta, explicar el porqué. Esta entrega calibra su nivel y alinea expectativas" },
      { id: "dec_primera", type: "decision", label: "¿Resultado de primera tarea?", branches: [
        { label: "Bien", result: "Ampliar carga y reducir supervisión gradualmente", color: C.green },
        { label: "Ajustes", result: "Feedback detallado + segunda tarea de prueba", color: C.amber },
        { label: "No funciona", result: "Si segunda tarea también falla → evaluar si es el colaborador correcto", color: C.pinkSoft },
      ]},
    ],
  },
  {
    id: "seguimiento",
    number: "07",
    title: "Seguimiento y evaluación",
    timeline: "Día 7 → Día 30 → Continuo",
    color: C.green,
    steps: [
      { id: "checkin_semana", type: "action", label: "Check-in semana 1 (Día 7)",
        detail: "10 min por Slack o llamada: ¿cómo te has sentido? ¿Tienes todo? ¿Hay algo que no esté claro? Prevenir problemas antes de que crezcan" },
      { id: "checkin_mes", type: "action", label: "Check-in mes 1 (Día 30)",
        detail: "Revisión más profunda: calidad del trabajo, cumplimiento de deadlines, comunicación, fit con Lumma. Confirmar continuidad o comunicar áreas de mejora" },
      { id: "eval_proyecto", type: "action", label: "Evaluación por proyecto (freelancers)",
        detail: "Al terminar cada proyecto: ¿calidad esperada? ¿Cumplió tiempos? ¿Comunicación fluida? ¿Lo volverías a llamar? Registrar para futura referencia" },
      { id: "autonomo", type: "end", label: "Colaborador autónomo (~7 días)",
        detail: "Entiende la marca, conoce los procesos, tiene sus herramientas, produce con el estándar Lumma. Supervisión se reduce a QA normal" },
    ],
  },
];

function StepCard({ step, isSelected, onToggle, phaseColor, activeRole }) {
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
  const hasByRole = step.byRole && step.byRole[activeRole];
  const hasDetail = step.detail || hasByRole || step.branches;

  return (
    <div className="mb-2">
      <div onClick={() => hasDetail && onToggle(step.id)}
        className="rounded-xl px-3.5 py-3 transition-all duration-200"
        style={{ backgroundColor: s.bg, border: `1px ${s.dashed ? "dashed" : "solid"} ${s.border}`, cursor: hasDetail ? "pointer" : "default", transform: isSelected ? "scale(1.02)" : "scale(1)", boxShadow: isSelected ? `0 0 20px ${phaseColor}15` : "none" }}>
        <div className="flex items-start gap-2.5">
          <span style={{ fontSize: 11, color: s.iconColor, marginTop: 1, flexShrink: 0 }}>{s.icon}</span>
          <div className="flex-1 min-w-0">
            <p className="font-semibold leading-tight" style={{ fontSize: 12, color: s.text, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{step.label}</p>
            {isSelected && step.detail && !step.branches && !hasByRole && (
              <p className="mt-1.5 leading-relaxed animate-fadeIn" style={{ fontSize: 10, color: C.textLight }}>{step.detail}</p>
            )}
            {isSelected && hasByRole && (
              <div className="mt-2 px-2.5 py-2 rounded-lg animate-fadeIn" style={{ backgroundColor: C.warm, border: `1px solid ${C.dimmer}` }}>
                <div className="flex items-center gap-1.5 mb-1">
                  <span style={{ fontSize: 10 }}>{roles.find(r => r.id === activeRole)?.icon}</span>
                  <span className="font-bold uppercase" style={{ fontSize: 8, color: roles.find(r => r.id === activeRole)?.color, letterSpacing: 1 }}>
                    {roles.find(r => r.id === activeRole)?.label}
                  </span>
                </div>
                <p style={{ fontSize: 9, color: C.textLight, lineHeight: 1.5 }}>{step.byRole[activeRole]}</p>
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

function PhaseSection({ phase, selectedStep, onToggleStep, isLast, activeRole }) {
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
          <StepCard key={step.id} step={step} isSelected={selectedStep === step.id} onToggle={onToggleStep} phaseColor={phase.color} activeRole={activeRole} />
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

export default function LummaOnboardingInterno() {
  const [selectedStep, setSelectedStep] = useState(null);
  const [activeRole, setActiveRole] = useState("editor");
  const [showChecklist, setShowChecklist] = useState(false);
  const toggleStep = (id) => setSelectedStep(selectedStep === id ? null : id);

  const checklist = [
    { label: "Acuerdo de colaboración firmado", phase: "01" },
    { label: "Mensaje de bienvenida enviado", phase: "02" },
    { label: "Kit de marca Lumma compartido", phase: "02" },
    { label: "Estándares de calidad del rol compartidos", phase: "02" },
    { label: "Slack — Agregado a canales correspondientes", phase: "03" },
    { label: "Google Drive — Acceso a carpetas del cliente", phase: "03" },
    { label: "Asana — Agregado como colaborador al proyecto", phase: "03" },
    { label: "Herramienta del rol configurada (Canva/CapCut/Meta)", phase: "03" },
    { label: "Brief del cliente asignado compartido", phase: "04" },
    { label: "Identidad de marca del cliente compartida", phase: "04" },
    { label: "Contexto del proyecto explicado", phase: "04" },
    { label: "Ejemplos de referencia compartidos", phase: "04" },
    { label: "Flujo de trabajo y comunicación explicado", phase: "05" },
    { label: "Primera tarea asignada y supervisada", phase: "06" },
    { label: "Check-in semana 1 realizado", phase: "07" },
    { label: "Check-in mes 1 realizado", phase: "07" },
  ];

  const docs = [
    { name: "Kit de marca Lumma (colaboradores)", desc: "Resumen operativo de 3-4 páginas: misión, valores, tono, identidad visual, posicionamiento", status: "Por crear" },
    { name: "Guía de herramientas y flujos", desc: "Cómo usamos Asana, Slack, Drive, Canva, CapCut. Nomenclatura, entregas, comunicación", status: "Por crear" },
    { name: "Estándares de calidad por rol", desc: "'Esto sí / esto no' visual por tipo de trabajo con ejemplos reales", status: "Por crear" },
    { name: "Template acuerdo de colaboración", desc: "Alcance, tarifa, pago, confidencialidad. 1-2 páginas", status: "Por crear" },
    { name: "Template brief por cliente", desc: "Resumen de 1 página por cliente para compartir con colaboradores", status: "Por crear" },
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
              Onboarding{" "}
              <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: C.green }}>interno</span>
              {" "}de colaboradores
            </h1>
            <p className="mt-2" style={{ fontSize: 11, color: C.gray }}>
              De la selección a la autonomía · ~7 días · Freelancers y equipo
            </p>
          </div>

          {/* Role selector */}
          <div className="flex gap-1.5 overflow-x-auto pb-2 mb-4 -mx-1 px-1" style={{ scrollbarWidth: "none" }}>
            {roles.map((role) => (
              <button key={role.id} onClick={() => setActiveRole(role.id)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium transition-all flex-shrink-0"
                style={{
                  backgroundColor: activeRole === role.id ? role.color + "15" : C.surface,
                  color: activeRole === role.id ? role.color : C.dim,
                  border: `1px solid ${activeRole === role.id ? role.color + "30" : "transparent"}`,
                }}>
                <span>{role.icon}</span>
                <span>{role.label}</span>
              </button>
            ))}
          </div>

          {/* View toggle */}
          <div className="flex gap-1.5 p-1.5 rounded-xl mb-6" style={{ backgroundColor: C.surface }}>
            {[
              { id: "flow", label: "Flujo" },
              { id: "check", label: "Checklist" },
              { id: "docs", label: "Documentos" },
            ].map((v) => (
              <button key={v.id}
                onClick={() => setShowChecklist(v.id)}
                className="flex-1 py-2 rounded-lg text-xs font-medium transition-all"
                style={{
                  backgroundColor: (showChecklist || "flow") === v.id ? C.green : "transparent",
                  color: (showChecklist || "flow") === v.id ? C.bg : C.gray,
                }}>
                {v.label}
              </button>
            ))}
          </div>

          {(!showChecklist || showChecklist === "flow") ? (
            <>
              {/* Legend */}
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 mb-6 px-3 py-2.5 rounded-lg" style={{ backgroundColor: C.surface }}>
                {[
                  { icon: "◆", label: "Acción", color: C.green },
                  { icon: "★", label: "Hito", color: C.amber },
                  { icon: "◇", label: "Decisión", color: C.pink },
                  { icon: "📄", label: "Documento", color: C.green },
                  { icon: "⚡", label: "Setup", color: C.dim },
                  { icon: "⚠", label: "Regla", color: C.amber },
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <span style={{ fontSize: 9, color: l.color }}>{l.icon}</span>
                    <span style={{ fontSize: 8, color: C.dim }}>{l.label}</span>
                  </div>
                ))}
              </div>

              {phases.map((phase, i) => (
                <PhaseSection key={phase.id} phase={phase} selectedStep={selectedStep} onToggleStep={toggleStep} isLast={i === phases.length - 1} activeRole={activeRole} />
              ))}
            </>
          ) : showChecklist === "check" ? (
            <div className="space-y-2">
              <p className="text-xs mb-3" style={{ color: C.gray }}>
                Completar para cada colaborador nuevo. El onboarding no está completo hasta que todos los items estén resueltos.
              </p>
              {checklist.map((item, i) => (
                <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-lg" style={{ backgroundColor: C.surface }}>
                  <div className="w-4 h-4 rounded border flex-shrink-0" style={{ borderColor: C.dimmer }} />
                  <p className="flex-1" style={{ fontSize: 11, color: C.textLight }}>{item.label}</p>
                  <span className="px-1.5 py-0.5 rounded font-mono" style={{ fontSize: 8, color: C.dim, backgroundColor: C.bg }}>{item.phase}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs mb-3" style={{ color: C.gray }}>
                Documentos necesarios para el kit de onboarding interno. Estos se crean una vez y se usan con cada nuevo colaborador.
              </p>
              {docs.map((doc, i) => (
                <div key={i} className="px-3.5 py-3 rounded-xl" style={{ backgroundColor: C.card, border: `1px solid ${C.dimmer}` }}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-bold" style={{ fontSize: 11, color: C.white }}>{doc.name}</p>
                    <span className="px-1.5 py-0.5 rounded" style={{ fontSize: 8, color: C.amber, backgroundColor: C.amber + "12", border: `1px solid ${C.amber}20`, fontWeight: 600 }}>
                      {doc.status}
                    </span>
                  </div>
                  <p style={{ fontSize: 9, color: C.gray, lineHeight: 1.4 }}>{doc.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* Timing */}
          <div className="mt-8 rounded-xl px-4 py-4" style={{ backgroundColor: C.surface, border: `1px solid ${C.dimmer}` }}>
            <p className="text-xs font-bold mb-3" style={{ color: C.green, letterSpacing: 1 }}>TIMELINE DE ONBOARDING</p>
            <div className="space-y-2">
              {[
                { phase: "01", label: "Selección y acuerdo", time: "1-5 días (pre)", color: C.gray },
                { phase: "02", label: "Bienvenida + kit de marca", time: "Día 1", color: C.green },
                { phase: "03", label: "Herramientas y accesos", time: "Día 1-2", color: C.pinkSoft },
                { phase: "04", label: "Contexto del cliente", time: "Día 2", color: C.amber },
                { phase: "05", label: "Flujo de trabajo", time: "Día 2", color: C.green },
                { phase: "06", label: "Primera tarea supervisada", time: "Día 3-5", color: C.pink },
                { phase: "07", label: "Check-in semana 1", time: "Día 7", color: C.green },
                { phase: "07", label: "Check-in mes 1", time: "Día 30", color: C.green },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="font-mono flex-shrink-0" style={{ fontSize: 9, color: item.color, width: 18 }}>{item.phase}</span>
                  <span className="flex-1" style={{ fontSize: 10, color: C.textLight }}>{item.label}</span>
                  <span className="px-2 py-0.5 rounded" style={{ fontSize: 8, color: item.color, backgroundColor: item.color + "10", fontWeight: 600 }}>{item.time}</span>
                </div>
              ))}
              <div className="pt-2 mt-2 flex justify-between" style={{ borderTop: `1px solid ${C.dimmer}` }}>
                <span style={{ fontSize: 10, color: C.white, fontWeight: 700 }}>Colaborador autónomo</span>
                <span className="px-2 py-0.5 rounded font-bold" style={{ fontSize: 9, color: C.bg, backgroundColor: C.green }}>~7 días</span>
              </div>
            </div>
          </div>

          {/* Access by role */}
          <div className="mt-4 rounded-xl px-4 py-4" style={{ backgroundColor: C.surface, border: `1px solid ${C.dimmer}` }}>
            <p className="text-xs font-bold mb-3" style={{ color: C.pinkSoft, letterSpacing: 1 }}>ACCESOS POR ROL</p>
            <div className="overflow-x-auto" style={{ scrollbarWidth: "none" }}>
              <div style={{ minWidth: 340 }}>
                {/* Header */}
                <div className="grid gap-1 mb-1" style={{ gridTemplateColumns: "90px repeat(4, 1fr)" }}>
                  <div />
                  {roles.map(r => (
                    <div key={r.id} className="text-center px-1 py-1.5 rounded" style={{ backgroundColor: r.color + "10" }}>
                      <span style={{ fontSize: 10 }}>{r.icon}</span>
                    </div>
                  ))}
                </div>
                {/* Rows */}
                {[
                  { tool: "Slack", access: [true, true, true, true] },
                  { tool: "Drive", access: [true, true, true, true] },
                  { tool: "Asana", access: [true, true, true, true] },
                  { tool: "Canva", access: [false, true, false, false] },
                  { tool: "CapCut", access: [true, false, false, false] },
                  { tool: "Meta Suite", access: [false, false, false, true] },
                ].map((row) => (
                  <div key={row.tool} className="grid gap-1 mb-1" style={{ gridTemplateColumns: "90px repeat(4, 1fr)" }}>
                    <div className="flex items-center">
                      <span style={{ fontSize: 9, color: C.textLight }}>{row.tool}</span>
                    </div>
                    {row.access.map((has, i) => (
                      <div key={i} className="flex items-center justify-center py-1.5 rounded" style={{ backgroundColor: has ? C.green + "08" : "transparent" }}>
                        <span style={{ fontSize: 10, color: has ? C.green : C.dimmer }}>{has ? "✓" : "—"}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 mb-4 text-center">
            <p style={{ fontSize: 9, color: C.dim, letterSpacing: 2 }}>LUMMA · OPERACIONES · ONBOARDING INTERNO · V1.0</p>
          </div>
        </div>
      </div>
    </>
  );
}
