import { useState } from "react";

const C = {
  bg: "#080808",
  surface: "#111111",
  card: "#161616",
  green: "#CCFF00",
  pink: "#E6007E",
  pinkPastel: "#FF7EB3",
  white: "#FFFFFF",
  gray: "#777777",
  dim: "#444444",
  dimmer: "#2a2a2a",
  textLight: "#d4d0ca",
};

function CopyHTML({ html, label }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="rounded-lg overflow-hidden" style={{ backgroundColor: C.bg }}>
      <div className="flex items-center justify-between px-3 py-2" style={{ borderBottom: `1px solid ${C.dimmer}` }}>
        <p className="text-xs font-bold" style={{ color: C.dim }}>{label}</p>
        <button
          onClick={() => { navigator.clipboard?.writeText(html); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
          className="text-xs px-3 py-1 rounded-lg transition-all font-bold"
          style={{ backgroundColor: copied ? `${C.green}20` : C.card, color: copied ? C.green : C.gray }}
        >
          {copied ? "✓ Copiado" : "Copiar HTML"}
        </button>
      </div>
      <div className="p-3 overflow-x-auto">
        <pre className="text-xs whitespace-pre-wrap" style={{ color: C.dim, fontSize: 9, lineHeight: 1.4 }}>
          {html.substring(0, 300)}...
        </pre>
      </div>
    </div>
  );
}

// Signature data
const soniaData = {
  name: "Sonia Cot",
  title: "Founder",
  email: "sonia@lummacreative.com",
  phone: "+1 (786) 962-6910",
  web: "www.lummacreative.com",
  ig: "@lummastudio_",
};

function SignaturePreview({ data, variant }) {
  const isDark = variant === "dark";
  const bgColor = isDark ? "#080808" : "#ffffff";
  const textColor = isDark ? "#ffffff" : "#1a1a1a";
  const subColor = isDark ? "#999999" : "#666666";
  const lineColor = isDark ? "#2a2a2a" : "#e5e5e5";

  return (
    <div className="rounded-xl p-6" style={{ backgroundColor: bgColor, border: `1px solid ${isDark ? C.dimmer : "#e0e0e0"}` }}>
      <table cellPadding="0" cellSpacing="0" style={{ fontFamily: "'Plus Jakarta Sans', Arial, sans-serif" }}>
        <tbody>
          <tr>
            <td style={{ paddingRight: 16, verticalAlign: "top" }}>
              {/* Isotipo */}
              <div style={{ width: 48, height: 48, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="44" height="30" viewBox="0 0 60 60">
                  <circle cx="22" cy="30" r="14" fill="#CCFF00" />
                  <circle cx="38" cy="30" r="14" fill="#E6007E" />
                  <circle cx="30" cy="30" r="6" fill={bgColor} />
                </svg>
              </div>
            </td>
            <td style={{ borderLeft: `2px solid #CCFF00`, paddingLeft: 16, verticalAlign: "top" }}>
              <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: textColor, letterSpacing: 0.5 }}>
                {data.name}
              </p>
              <p style={{ margin: "2px 0 0", fontSize: 11, fontWeight: 500, color: "#E6007E", letterSpacing: 1, fontStyle: "italic" }}>
                {data.title}
              </p>
              <div style={{ height: 1, backgroundColor: lineColor, margin: "10px 0", width: 180 }} />
              <p style={{ margin: 0, fontSize: 11, color: subColor }}>
                {data.email}
              </p>
              <p style={{ margin: "2px 0 0", fontSize: 11, color: subColor }}>
                {data.phone}
              </p>
              <p style={{ margin: "2px 0 0", fontSize: 11, color: subColor }}>
                {data.web}
              </p>
              <p style={{ margin: "6px 0 0", fontSize: 10, color: "#E6007E", fontWeight: 600 }}>
                {data.ig}
              </p>
            </td>
          </tr>
          <tr>
            <td colSpan="2" style={{ paddingTop: 12 }}>
              <p style={{ margin: 0, fontSize: 9, color: "#CCFF00", fontStyle: "italic" }}>
                Light your brand. ✦
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

function SignaturePreviewMinimal({ data }) {
  return (
    <div className="rounded-xl p-6" style={{ backgroundColor: "#ffffff", border: "1px solid #e0e0e0" }}>
      <table cellPadding="0" cellSpacing="0" style={{ fontFamily: "'Plus Jakarta Sans', Arial, sans-serif" }}>
        <tbody>
          <tr>
            <td>
              <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: "#1a1a1a" }}>
                {data.name}
              </p>
              <p style={{ margin: "1px 0 0", fontSize: 11, color: "#E6007E", fontWeight: 500 }}>
                {data.title} · Lumma Studio
              </p>
              <div style={{ height: 2, width: 40, margin: "8px 0", background: "linear-gradient(90deg, #CCFF00, #E6007E)" }} />
              <p style={{ margin: 0, fontSize: 11, color: "#666" }}>
                {data.email} · {data.phone}
              </p>
              <p style={{ margin: "2px 0 0", fontSize: 11, color: "#666" }}>
                {data.web} · <span style={{ color: "#E6007E" }}>{data.ig}</span>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

const generateHTML = (data, variant) => {
  const isDark = variant === "dark";
  const bg = isDark ? "#080808" : "#ffffff";
  const text = isDark ? "#ffffff" : "#1a1a1a";
  const sub = isDark ? "#999999" : "#666666";
  const line = isDark ? "#2a2a2a" : "#e5e5e5";
  const tagline = isDark ? "#444444" : "#bbbbbb";

  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:'Plus Jakarta Sans',Arial,Helvetica,sans-serif;font-size:14px;line-height:1.4;">
  <tr>
    <td style="padding-right:16px;vertical-align:top;">
      <img src="https://i.imgur.com/YOUR_ISOTIPO.png" width="44" height="30" alt="Lumma" style="display:block;" />
    </td>
    <td style="border-left:2px solid #CCFF00;padding-left:16px;vertical-align:top;">
      <p style="margin:0;font-size:16px;font-weight:700;color:${text};letter-spacing:0.5px;">${data.name}</p>
      <p style="margin:2px 0 0;font-size:11px;font-weight:500;color:#CCFF00;letter-spacing:1px;">${data.title.toUpperCase()}</p>
      <div style="height:1px;background-color:${line};margin:10px 0;width:180px;"></div>
      <p style="margin:0;font-size:11px;color:${sub};">${data.email}</p>
      <p style="margin:2px 0 0;font-size:11px;color:${sub};">${data.phone}</p>
      <p style="margin:2px 0 0;font-size:11px;color:${sub};">${data.web}</p>
      <p style="margin:6px 0 0;font-size:10px;color:#E6007E;font-weight:600;">${data.ig}</p>
    </td>
  </tr>
  <tr>
    <td colspan="2" style="padding-top:12px;">
      <p style="margin:0;font-size:9px;color:${tagline};font-style:italic;">Light your brand. ✦</p>
    </td>
  </tr>
</table>`;
};

const generateMinimalHTML = (data) => {
  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:'Plus Jakarta Sans',Arial,Helvetica,sans-serif;font-size:14px;line-height:1.4;">
  <tr>
    <td>
      <p style="margin:0;font-size:14px;font-weight:700;color:#1a1a1a;">${data.name}</p>
      <p style="margin:1px 0 0;font-size:11px;color:#E6007E;font-weight:500;">${data.title} · Lumma Studio</p>
      <div style="height:2px;width:40px;margin:8px 0;background:#CCFF00;"></div>
      <p style="margin:0;font-size:11px;color:#666;">${data.email} · ${data.phone}</p>
      <p style="margin:2px 0 0;font-size:11px;color:#666;">${data.web} · <span style="color:#E6007E;">${data.ig}</span></p>
    </td>
  </tr>
</table>`;
};

const templateHTML = `<!-- PLANTILLA DE FIRMA LUMMA — Reemplaza los campos entre [corchetes] -->

<table cellpadding="0" cellspacing="0" border="0" style="font-family:'Plus Jakarta Sans',Arial,Helvetica,sans-serif;font-size:14px;line-height:1.4;">
  <tr>
    <td style="padding-right:16px;vertical-align:top;">
      <img src="[URL_DEL_ISOTIPO]" width="44" height="30" alt="Lumma" style="display:block;" />
    </td>
    <td style="border-left:2px solid #CCFF00;padding-left:16px;vertical-align:top;">
      <p style="margin:0;font-size:16px;font-weight:700;color:#1a1a1a;letter-spacing:0.5px;">[NOMBRE COMPLETO]</p>
      <p style="margin:2px 0 0;font-size:11px;font-weight:500;color:#CCFF00;letter-spacing:1px;">[CARGO EN MAYÚSCULAS]</p>
      <div style="height:1px;background-color:#e5e5e5;margin:10px 0;width:180px;"></div>
      <p style="margin:0;font-size:11px;color:#666;">[email@lummacreative.com]</p>
      <p style="margin:2px 0 0;font-size:11px;color:#666;">[+1 (305) 000-0000]</p>
      <p style="margin:2px 0 0;font-size:11px;color:#666;">www.lummacreative.com</p>
      <p style="margin:6px 0 0;font-size:10px;color:#E6007E;font-weight:600;">@lummastudio_</p>
    </td>
  </tr>
  <tr>
    <td colspan="2" style="padding-top:12px;">
      <p style="margin:0;font-size:9px;color:#bbbbbb;font-style:italic;">Light your brand. ✦</p>
    </td>
  </tr>
</table>`;

export default function LummaSignatures() {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = ["Sonia", "Plantilla"];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />

      <div className="min-h-screen" style={{ backgroundColor: C.bg, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <div className="px-5 pt-10 pb-6">
          <p className="font-mono text-xs tracking-widest mb-1" style={{ color: C.dim }}>IDENTIDAD</p>
          <h1 className="text-2xl font-bold" style={{ color: C.white }}>
            Firmas de{" "}
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: C.green }}>email</span>
          </h1>
          <p className="text-sm mt-2" style={{ color: C.gray }}>
            3 estilos de firma + plantilla adaptable. Copia el HTML y pégalo en tu cliente de email.
          </p>
        </div>

        {/* Tabs */}
        <div className="px-5 pb-4">
          <div className="flex gap-1 p-1 rounded-lg" style={{ backgroundColor: C.surface }}>
            {tabs.map((t, i) => (
              <button key={t} onClick={() => setActiveTab(i)} className="flex-1 py-2 rounded-md text-xs transition-all" style={{
                backgroundColor: activeTab === i ? C.card : "transparent",
                color: activeTab === i ? C.green : C.dim,
              }}>{t}</button>
            ))}
          </div>
        </div>

        <div className="px-5 pb-16 space-y-6">
          {activeTab === 0 && (
            <>
              {/* Sonia's signatures */}
              <div className="space-y-6">
                {/* Style 1 - With isotipo, light bg */}
                <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: C.surface, border: `1px solid ${C.dimmer}` }}>
                  <div className="p-4" style={{ borderBottom: `1px solid ${C.dimmer}` }}>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: C.green, color: C.bg }}>A</span>
                      <p className="text-sm font-bold" style={{ color: C.white }}>Con isotipo — Fondo claro</p>
                    </div>
                    <p className="text-xs mt-1" style={{ color: C.dim }}>Ideal para emails corporativos y propuestas</p>
                  </div>
                  <div className="p-4">
                    <SignaturePreview data={soniaData} variant="light" />
                    <div className="mt-3">
                      <CopyHTML html={generateHTML(soniaData, "light")} label="HTML — FONDO CLARO" />
                    </div>
                  </div>
                </div>

                {/* Style 2 - With isotipo, dark bg */}
                <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: C.surface, border: `1px solid ${C.dimmer}` }}>
                  <div className="p-4" style={{ borderBottom: `1px solid ${C.dimmer}` }}>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: C.pinkPastel, color: C.bg }}>B</span>
                      <p className="text-sm font-bold" style={{ color: C.white }}>Con isotipo — Fondo oscuro</p>
                    </div>
                    <p className="text-xs mt-1" style={{ color: C.dim }}>Para clientes que usan dark mode en email</p>
                  </div>
                  <div className="p-4">
                    <SignaturePreview data={soniaData} variant="dark" />
                    <div className="mt-3">
                      <CopyHTML html={generateHTML(soniaData, "dark")} label="HTML — FONDO OSCURO" />
                    </div>
                  </div>
                </div>

                {/* Style 3 - Minimal */}
                <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: C.surface, border: `1px solid ${C.dimmer}` }}>
                  <div className="p-4" style={{ borderBottom: `1px solid ${C.dimmer}` }}>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: C.dim, color: C.white }}>C</span>
                      <p className="text-sm font-bold" style={{ color: C.white }}>Minimal — Sin isotipo</p>
                    </div>
                    <p className="text-xs mt-1" style={{ color: C.dim }}>Más compacta, funciona en cualquier contexto</p>
                  </div>
                  <div className="p-4">
                    <SignaturePreviewMinimal data={soniaData} />
                    <div className="mt-3">
                      <CopyHTML html={generateMinimalHTML(soniaData)} label="HTML — MINIMAL" />
                    </div>
                  </div>
                </div>

                {/* Phone number note */}
                <div className="p-4 rounded-xl" style={{ backgroundColor: C.card, borderLeft: `2px solid ${C.green}` }}>
                  <p className="text-xs" style={{ color: C.gray }}>
                    El teléfono aparece como placeholder (+1 305 000-0000). Reemplázalo con tu número real en el HTML antes de pegarlo.
                  </p>
                </div>

                {/* How to install */}
                <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: C.surface, border: `1px solid ${C.dimmer}` }}>
                  <div className="p-4" style={{ borderBottom: `1px solid ${C.dimmer}` }}>
                    <p className="text-sm font-bold" style={{ color: C.white }}>Cómo instalar la firma</p>
                  </div>
                  <div className="p-4 space-y-3">
                    <div>
                      <p className="text-xs font-bold mb-1" style={{ color: C.green }}>Gmail</p>
                      <p className="text-xs" style={{ color: C.gray }}>Settings → See all settings → General → Signature → Pega el HTML (usa Ctrl+V, no "insertar HTML"). Si no funciona, pega primero en un doc de Google y luego copia desde ahí a Gmail.</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold mb-1" style={{ color: C.green }}>Outlook</p>
                      <p className="text-xs" style={{ color: C.gray }}>Settings → View all Outlook settings → Mail → Compose and reply → Email signature → Pega el HTML.</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold mb-1" style={{ color: C.green }}>Apple Mail</p>
                      <p className="text-xs" style={{ color: C.gray }}>Mail → Preferences → Signatures → Crea una nueva → Pega el HTML. Si no renderiza, busca el archivo .webarchive en ~/Library/Mail y reemplaza el contenido.</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold mb-1" style={{ color: C.pinkPastel }}>Tip para el isotipo</p>
                      <p className="text-xs" style={{ color: C.gray }}>Sube el isotipo PNG a Imgur, Google Drive (con link público), o tu hosting. Reemplaza [URL_DEL_ISOTIPO] en el HTML por el link directo de la imagen.</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 1 && (
            <>
              {/* Template */}
              <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: C.surface, border: `1px solid ${C.green}20` }}>
                <div className="p-5" style={{ borderBottom: `1px solid ${C.dimmer}` }}>
                  <p className="text-base font-bold" style={{ color: C.white }}>Plantilla adaptable</p>
                  <p className="text-xs mt-1" style={{ color: C.gray }}>
                    Copia este HTML y reemplaza los campos entre [corchetes] con los datos de cada persona del equipo.
                  </p>
                </div>
                <div className="p-5">
                  <div className="p-4 rounded-xl mb-4" style={{ backgroundColor: C.card }}>
                    <p className="text-xs font-bold mb-2" style={{ color: C.green }}>CAMPOS A REEMPLAZAR</p>
                    <div className="space-y-1.5">
                      {[
                        ["[NOMBRE COMPLETO]", "Ej: María González"],
                        ["[CARGO EN MAYÚSCULAS]", "Ej: SOCIAL MEDIA MANAGER"],
                        ["[email@lummacreative.com]", "Ej: maria@lummacreative.com"],
                        ["[+1 (305) 000-0000]", "Número de teléfono"],
                        ["[URL_DEL_ISOTIPO]", "Link directo al PNG del isotipo"],
                      ].map(([field, example]) => (
                        <div key={field} className="flex gap-3 py-1" style={{ borderBottom: `1px solid ${C.dimmer}` }}>
                          <code className="text-xs flex-shrink-0" style={{ color: C.pinkPastel }}>{field}</code>
                          <span className="text-xs" style={{ color: C.dim }}>{example}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <CopyHTML html={templateHTML} label="PLANTILLA HTML COMPLETA" />

                  <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: C.bg }}>
                    <p className="text-xs font-bold mb-1" style={{ color: C.dim }}>PREVIEW DE LA PLANTILLA</p>
                    <SignaturePreview
                      data={{ name: "[Nombre Completo]", title: "[Cargo]", email: "[email]@lummacreative.com", phone: "+1 (305) 000-0000", web: "www.lummacreative.com", ig: "@lummastudio_" }}
                      variant="light"
                    />
                  </div>
                </div>
              </div>

              {/* Example roles */}
              <div className="p-4 rounded-xl" style={{ backgroundColor: C.card }}>
                <p className="text-xs font-bold mb-2" style={{ color: C.dim }}>EJEMPLOS DE CARGOS</p>
                <div className="flex flex-wrap gap-2">
                  {["FOUNDER", "CREATIVE DIRECTOR", "SOCIAL MEDIA MANAGER", "CONTENT STRATEGIST", "PRODUCER", "BRAND DESIGNER", "ACCOUNT MANAGER"].map(r => (
                    <span key={r} className="text-xs px-2 py-1 rounded" style={{ backgroundColor: C.bg, color: C.gray }}>{r}</span>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="px-5 py-6 text-center" style={{ borderTop: `1px solid ${C.dimmer}` }}>
          <p className="text-xs" style={{ color: C.dim }}>Lumma © 2026</p>
        </div>
      </div>
    </>
  );
}
