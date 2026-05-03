import { useState, useRef, useEffect } from "react";

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
};

const nodes = [
  {
    id: "start",
    type: "start",
    label: "Lead llena formulario",
    sublabel: "lummacreative.com",
    col: 1,
    row: 0,
  },
  {
    id: "hubspot",
    type: "auto",
    label: "HubSpot crea contacto",
    sublabel: "Automático · Estado: Nuevo",
    col: 1,
    row: 1,
  },
  {
    id: "notif",
    type: "auto",
    label: "Notificación a Sonia",
    sublabel: "Email / App HubSpot",
    col: 1,
    row: 2,
  },
  {
    id: "review",
    type: "action",
    label: "Revisión del lead",
    sublabel: "Máx. 24 horas",
    detail: "Revisar: Instagram, presupuesto vs. precios Spark/Blaze, tipo de negocio, fit con audiencia Lumma",
    col: 1,
    row: 3,
  },
  {
    id: "decision1",
    type: "decision",
    label: "¿Califica?",
    col: 1,
    row: 4,
  },
  // Branch: No califica
  {
    id: "no_califica",
    type: "end_negative",
    label: "No califica",
    sublabel: "Mensaje cortés · Archivar",
    detail: "Presupuesto muy bajo, negocio no encaja, o señales de alerta",
    col: 0,
    row: 5,
  },
  // Branch: Tibio
  {
    id: "tibio",
    type: "pause",
    label: "Tibio",
    sublabel: "Seguimiento en 2-4 semanas",
    detail: "Potencial pero falta info o presupuesto bajo para lo que pide",
    col: 2,
    row: 5,
  },
  // Branch: Califica
  {
    id: "contacto",
    type: "action",
    label: "Enviar template de contacto",
    sublabel: "Email o WhatsApp · Máx. 48h",
    detail: "Mensaje personalizado + link de Calendly",
    col: 1,
    row: 5,
  },
  {
    id: "agenda",
    type: "auto",
    label: "Lead agenda llamada",
    sublabel: "Calendly · Automático",
    col: 1,
    row: 6,
  },
  {
    id: "hubspot_update",
    type: "auto",
    label: "HubSpot se actualiza",
    sublabel: "Estado: Llamada agendada",
    col: 1,
    row: 7,
  },
  {
    id: "prep",
    type: "action",
    label: "Preparar llamada",
    sublabel: "2-3 min antes",
    detail: "Revisar formulario, Instagram, anotar observación genuina",
    col: 1,
    row: 8,
  },
  {
    id: "llamada",
    type: "milestone",
    label: "Llamada de descubrimiento",
    sublabel: "20 minutos",
    detail: "Apertura → Conocer proyecto → Entender necesidad → Validar viabilidad → Cierre",
    col: 1,
    row: 9,
  },
  {
    id: "decision2",
    type: "decision",
    label: "¿Es buen fit?",
    col: 1,
    row: 10,
  },
  // Post-call branches
  {
    id: "no_avanza",
    type: "end_negative",
    label: "No avanza",
    sublabel: "Cerrar con respeto",
    detail: "Presupuesto, expectativas o tipo de proyecto no alineados",
    col: 0,
    row: 11,
  },
  {
    id: "seguimiento",
    type: "pause",
    label: "Seguimiento",
    sublabel: "Follow-up en 2-4 semanas",
    detail: "Le interesa pero no está listo. Agendar reconexión",
    col: 2,
    row: 11,
  },
  {
    id: "propuesta",
    type: "end_positive",
    label: "Preparar propuesta",
    sublabel: "→ Proceso de Onboarding",
    detail: "Actualizar HubSpot · Enviar mensaje de seguimiento mismo día",
    col: 1,
    row: 11,
  },
];

const connections = [
  { from: "start", to: "hubspot" },
  { from: "hubspot", to: "notif" },
  { from: "notif", to: "review" },
  { from: "review", to: "decision1" },
  { from: "decision1", to: "no_califica", label: "No" },
  { from: "decision1", to: "tibio", label: "Tibio" },
  { from: "decision1", to: "contacto", label: "Sí" },
  { from: "contacto", to: "agenda" },
  { from: "agenda", to: "hubspot_update" },
  { from: "hubspot_update", to: "prep" },
  { from: "prep", to: "llamada" },
  { from: "llamada", to: "decision2" },
  { from: "decision2", to: "no_avanza", label: "No" },
  { from: "decision2", to: "seguimiento", label: "Aún no" },
  { from: "decision2", to: "propuesta", label: "Sí" },
];

function NodeCard({ node, isSelected, onClick }) {
  const getStyle = () => {
    switch (node.type) {
      case "start":
        return {
          bg: C.green,
          border: C.green,
          text: C.bg,
          sub: "#333",
          glow: `0 0 30px ${C.green}30`,
        };
      case "auto":
        return {
          bg: C.surface,
          border: C.dimmer,
          text: C.textLight,
          sub: C.dim,
          glow: "none",
          dashed: true,
        };
      case "action":
        return {
          bg: C.card,
          border: C.green + "40",
          text: C.white,
          sub: C.gray,
          glow: isSelected ? `0 0 20px ${C.green}20` : "none",
        };
      case "decision":
        return {
          bg: C.warm,
          border: C.pink + "60",
          text: C.white,
          sub: C.gray,
          glow: `0 0 15px ${C.pink}15`,
          diamond: true,
        };
      case "milestone":
        return {
          bg: `linear-gradient(135deg, ${C.card}, ${C.warm})`,
          border: C.green + "50",
          text: C.green,
          sub: C.textLight,
          glow: `0 0 25px ${C.green}15`,
        };
      case "end_positive":
        return {
          bg: C.green,
          border: C.green,
          text: C.bg,
          sub: "#333",
          glow: `0 0 30px ${C.green}25`,
        };
      case "end_negative":
        return {
          bg: C.surface,
          border: C.pink + "40",
          text: C.pinkSoft,
          sub: C.dim,
          glow: "none",
        };
      case "pause":
        return {
          bg: C.surface,
          border: "#F5A62330",
          text: "#F5A623",
          sub: C.dim,
          glow: "none",
        };
      default:
        return {
          bg: C.surface,
          border: C.dimmer,
          text: C.white,
          sub: C.gray,
          glow: "none",
        };
    }
  };

  const style = getStyle();
  const isLinearBg = style.bg?.includes("gradient");

  return (
    <div
      onClick={() => node.detail && onClick(node.id)}
      className="relative transition-all duration-300"
      style={{
        cursor: node.detail ? "pointer" : "default",
      }}
    >
      <div
        className="rounded-xl px-4 py-3 transition-all duration-300"
        style={{
          background: isLinearBg ? style.bg : undefined,
          backgroundColor: !isLinearBg ? style.bg : undefined,
          border: `1px solid ${style.border}`,
          boxShadow: isSelected ? `0 0 25px ${C.green}30` : style.glow,
          borderStyle: style.dashed ? "dashed" : "solid",
          transform: isSelected ? "scale(1.03)" : "scale(1)",
          minWidth: 200,
          maxWidth: 240,
        }}
      >
        {node.type === "decision" && (
          <div
            className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45"
            style={{ backgroundColor: C.pink, opacity: 0.6 }}
          />
        )}
        <p
          className="text-xs font-bold leading-tight"
          style={{
            color: style.text,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: node.type === "decision" ? 11 : 12,
            textAlign: "center",
          }}
        >
          {node.label}
        </p>
        {node.sublabel && (
          <p
            className="mt-1 leading-tight text-center"
            style={{
              color: style.sub,
              fontSize: 9,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            {node.sublabel}
          </p>
        )}
        {node.detail && (
          <div
            className="flex justify-center mt-1.5"
          >
            <span
              style={{
                fontSize: 8,
                color: style.text,
                opacity: 0.5,
                fontFamily: "'Plus Jakarta Sans', sans-serif",
              }}
            >
              {isSelected ? "▲ cerrar" : "▼ detalle"}
            </span>
          </div>
        )}
      </div>
      {isSelected && node.detail && (
        <div
          className="mt-2 rounded-lg px-3 py-2.5 animate-fadeIn"
          style={{
            backgroundColor: C.warm,
            border: `1px solid ${C.dimmer}`,
            maxWidth: 240,
          }}
        >
          <p
            style={{
              fontSize: 10,
              color: C.textLight,
              lineHeight: 1.5,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            {node.detail}
          </p>
        </div>
      )}
    </div>
  );
}

function ConnectionLabel({ label, type }) {
  const colors = {
    Sí: C.green,
    No: C.pinkSoft,
    Tibio: "#F5A623",
    "Aún no": "#F5A623",
  };
  return (
    <span
      className="px-2 py-0.5 rounded-full"
      style={{
        fontSize: 8,
        fontWeight: 700,
        color: colors[label] || C.gray,
        backgroundColor: (colors[label] || C.gray) + "15",
        border: `1px solid ${(colors[label] || C.gray)}30`,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        letterSpacing: 0.5,
      }}
    >
      {label}
    </span>
  );
}

function Arrow({ direction = "down" }) {
  if (direction === "down") {
    return (
      <div className="flex justify-center" style={{ height: 20 }}>
        <div
          style={{
            width: 1,
            height: 14,
            backgroundColor: C.dim,
          }}
        />
      </div>
    );
  }
  return null;
}

export default function LummaLeadFlowchart() {
  const [selected, setSelected] = useState(null);

  const toggle = (id) => {
    setSelected(selected === id ? null : id);
  };

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
        style={{
          backgroundColor: C.bg,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        {/* Header */}
        <div className="max-w-lg mx-auto mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-1">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: C.green }} />
              <div className="w-4 h-4 rounded-full -ml-2" style={{ backgroundColor: C.pink }} />
            </div>
            <p
              className="text-xs font-bold tracking-widest"
              style={{ color: C.green }}
            >
              LUMMA
            </p>
          </div>
          <h1
            className="text-2xl font-extrabold leading-tight"
            style={{ color: C.white }}
          >
            Proceso de captación y{" "}
            <span
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: C.green,
              }}
            >
              calificación
            </span>{" "}
            de leads
          </h1>
          <p className="mt-2" style={{ fontSize: 11, color: C.gray }}>
            Del formulario a la decisión · Máximo 10 días
          </p>

          {/* Legend */}
          <div
            className="flex flex-wrap gap-3 mt-4 px-3 py-2.5 rounded-lg"
            style={{ backgroundColor: C.surface }}
          >
            {[
              { color: C.green, label: "Inicio / Fin positivo", dashed: false },
              { color: C.dim, label: "Automático", dashed: true },
              { color: C.green + "60", label: "Acción manual", dashed: false },
              { color: C.pink + "60", label: "Decisión", dashed: false },
            ].map((l) => (
              <div key={l.label} className="flex items-center gap-1.5">
                <div
                  className="w-3 h-2 rounded-sm"
                  style={{
                    backgroundColor: l.color,
                    border: l.dashed ? `1px dashed ${C.dim}` : "none",
                  }}
                />
                <span style={{ fontSize: 8, color: C.dim }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Flowchart */}
        <div className="max-w-lg mx-auto flex flex-col items-center">
          {/* START */}
          <NodeCard node={nodes[0]} isSelected={selected === "start"} onClick={toggle} />
          <Arrow />
          
          {/* HUBSPOT AUTO */}
          <NodeCard node={nodes[1]} isSelected={selected === "hubspot"} onClick={toggle} />
          <Arrow />
          
          {/* NOTIFICATION */}
          <NodeCard node={nodes[2]} isSelected={selected === "notif"} onClick={toggle} />
          <Arrow />
          
          {/* REVIEW */}
          <NodeCard node={nodes[3]} isSelected={selected === "review"} onClick={toggle} />
          <Arrow />
          
          {/* DECISION 1 */}
          <NodeCard node={nodes[4]} isSelected={selected === "decision1"} onClick={toggle} />
          
          {/* Three branches */}
          <div className="flex items-start gap-3 mt-3 w-full justify-center">
            {/* No califica */}
            <div className="flex flex-col items-center" style={{ flex: "0 0 30%" }}>
              <ConnectionLabel label="No" />
              <div style={{ width: 1, height: 10, backgroundColor: C.dim }} />
              <NodeCard node={nodes[5]} isSelected={selected === "no_califica"} onClick={toggle} />
            </div>
            
            {/* Califica */}
            <div className="flex flex-col items-center" style={{ flex: "0 0 34%" }}>
              <ConnectionLabel label="Sí" />
              <div style={{ width: 1, height: 10, backgroundColor: C.dim }} />
              <NodeCard node={nodes[7]} isSelected={selected === "contacto"} onClick={toggle} />
            </div>
            
            {/* Tibio */}
            <div className="flex flex-col items-center" style={{ flex: "0 0 30%" }}>
              <ConnectionLabel label="Tibio" />
              <div style={{ width: 1, height: 10, backgroundColor: C.dim }} />
              <NodeCard node={nodes[6]} isSelected={selected === "tibio"} onClick={toggle} />
            </div>
          </div>

          {/* Continue main flow */}
          <div className="flex flex-col items-center mt-3">
            <Arrow />
            <NodeCard node={nodes[8]} isSelected={selected === "agenda"} onClick={toggle} />
            <Arrow />
            <NodeCard node={nodes[9]} isSelected={selected === "hubspot_update"} onClick={toggle} />
            <Arrow />
            <NodeCard node={nodes[10]} isSelected={selected === "prep"} onClick={toggle} />
            <Arrow />
            <NodeCard node={nodes[11]} isSelected={selected === "llamada"} onClick={toggle} />
            <Arrow />
            
            {/* DECISION 2 */}
            <NodeCard node={nodes[12]} isSelected={selected === "decision2"} onClick={toggle} />
            
            {/* Three branches */}
            <div className="flex items-start gap-3 mt-3 w-full justify-center">
              {/* No avanza */}
              <div className="flex flex-col items-center" style={{ flex: "0 0 30%" }}>
                <ConnectionLabel label="No" />
                <div style={{ width: 1, height: 10, backgroundColor: C.dim }} />
                <NodeCard node={nodes[13]} isSelected={selected === "no_avanza"} onClick={toggle} />
              </div>
              
              {/* Propuesta */}
              <div className="flex flex-col items-center" style={{ flex: "0 0 34%" }}>
                <ConnectionLabel label="Sí" />
                <div style={{ width: 1, height: 10, backgroundColor: C.dim }} />
                <NodeCard node={nodes[15]} isSelected={selected === "propuesta"} onClick={toggle} />
              </div>
              
              {/* Seguimiento */}
              <div className="flex flex-col items-center" style={{ flex: "0 0 30%" }}>
                <ConnectionLabel label="Aún no" />
                <div style={{ width: 1, height: 10, backgroundColor: C.dim }} />
                <NodeCard node={nodes[14]} isSelected={selected === "seguimiento"} onClick={toggle} />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div
            className="mt-10 w-full rounded-xl px-4 py-4"
            style={{ backgroundColor: C.surface, border: `1px solid ${C.dimmer}` }}
          >
            <p
              className="text-xs font-bold mb-3"
              style={{ color: C.green, letterSpacing: 1 }}
            >
              TIEMPOS CLAVE
            </p>
            <div className="space-y-2">
              {[
                ["Revisión del lead", "Máx. 24 horas"],
                ["Primer contacto", "Máx. 48 horas"],
                ["Llamada agendada", "Dentro de la primera semana"],
                ["Decisión post-llamada", "Máx. 48 horas"],
                ["Proceso completo", "Máx. 10 días"],
              ].map(([step, time]) => (
                <div key={step} className="flex justify-between items-center">
                  <span style={{ fontSize: 10, color: C.textLight }}>{step}</span>
                  <span
                    className="px-2 py-0.5 rounded"
                    style={{
                      fontSize: 9,
                      color: C.green,
                      backgroundColor: C.green + "10",
                      fontWeight: 600,
                    }}
                  >
                    {time}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* States reference */}
          <div
            className="mt-4 w-full rounded-xl px-4 py-4"
            style={{ backgroundColor: C.surface, border: `1px solid ${C.dimmer}` }}
          >
            <p
              className="text-xs font-bold mb-3"
              style={{ color: C.green, letterSpacing: 1 }}
            >
              ESTADOS EN HUBSPOT
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Nuevo", color: C.gray },
                { label: "Contactado", color: C.textLight },
                { label: "Llamada agendada", color: C.green },
                { label: "Propuesta", color: C.green },
                { label: "Cerrado ganado", color: C.green },
                { label: "Cerrado perdido", color: C.pinkSoft },
                { label: "Seguimiento", color: "#F5A623" },
              ].map((s) => (
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

          {/* Brand footer */}
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
