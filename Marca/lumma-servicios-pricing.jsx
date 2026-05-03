import { useState } from "react";

const C = {
  bg: "#080808",
  surface: "#111111",
  surfaceAlt: "#1a1a1a",
  green: "#CCFF00",
  pink: "#E6007E",
  white: "#FFFFFF",
  gray: "#777777",
  dim: "#444444",
  dimmer: "#2a2a2a",
};

function LogoSymbol({ size = 40 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="22" cy="30" r="14" fill={C.green} />
      <circle cx="38" cy="30" r="14" fill={C.pink} />
      <circle cx="30" cy="30" r="6" fill={C.bg} />
    </svg>
  );
}

function PriceTag({ price, period }) {
  return (
    <div className="flex items-baseline gap-1">
      <span className="text-3xl font-extrabold" style={{ color: C.white, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        ${price.toLocaleString()}
      </span>
      {period && (
        <span className="text-sm" style={{ color: C.gray }}>/{period}</span>
      )}
    </div>
  );
}

function FeatureItem({ text, highlight }) {
  return (
    <div className="flex gap-3 items-start py-1.5">
      <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: highlight ? C.green : C.dim }} />
      <p className="text-xs leading-relaxed" style={{ color: highlight ? C.white : C.gray }}>
        {text}
      </p>
    </div>
  );
}

function PackageCard({ name, price, period, features, color = C.green, isPrimary, extraFeatures }) {
  return (
    <div className="rounded-2xl overflow-hidden" style={{
      backgroundColor: C.surface,
      border: `1px solid ${isPrimary ? color + "30" : C.dimmer}`,
    }}>
      {/* Header */}
      <div className="p-5 pb-4" style={{
        background: isPrimary ? `linear-gradient(135deg, ${color}08 0%, transparent 60%)` : "none",
      }}>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold tracking-widest px-3 py-1 rounded-full" style={{
            color: C.bg,
            backgroundColor: color,
          }}>
            {name}
          </span>
          {isPrimary && (
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ color: C.green, border: `1px solid ${C.green}30` }}>
              Popular
            </span>
          )}
        </div>
        <PriceTag price={price} period={period} />
      </div>

      {/* Features */}
      <div className="px-5 pb-5">
        <div className="h-px mb-4" style={{ backgroundColor: C.dimmer }} />
        {features.map((f, i) => (
          <FeatureItem key={i} text={f} highlight={i < 3} />
        ))}
        {extraFeatures && (
          <>
            <div className="h-px my-3" style={{ backgroundColor: C.dimmer }} />
            <p className="text-xs tracking-widest mb-2" style={{ color: C.dim }}>TAMBIÉN INCLUYE</p>
            {extraFeatures.map((f, i) => (
              <FeatureItem key={i} text={f} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

function FilmServiceCard({ icon, name, description }) {
  return (
    <div className="p-4 rounded-xl flex gap-4 items-start" style={{ backgroundColor: C.surface, border: `1px solid ${C.dimmer}` }}>
      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 text-lg" style={{ backgroundColor: `${C.green}10` }}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-bold mb-1" style={{ color: C.white, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          {name}
        </p>
        <p className="text-xs leading-relaxed" style={{ color: C.gray }}>{description}</p>
      </div>
    </div>
  );
}

export default function LummaServicios() {
  const [activeService, setActiveService] = useState(0);
  const services = ["Branding", "Social Media", "Lumma Films"];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />

      <div className="min-h-screen" style={{ backgroundColor: C.bg, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {/* Header */}
        <div className="px-5 pt-10 pb-2">
          <div className="flex items-center gap-3 mb-4">
            <LogoSymbol size={32} />
            <span className="text-xs font-bold tracking-widest" style={{ color: C.green }}>LUMMA</span>
          </div>
          <h1 className="text-3xl font-bold mb-1" style={{ color: C.white }}>
            Servicios{" "}
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: C.green }}>
              & Pricing
            </span>
          </h1>
          <p className="text-sm leading-relaxed mt-2" style={{ color: C.gray }}>
            Paquetes fijos pensados para que inviertas en tu marca con claridad, sin sorpresas.
          </p>
        </div>

        {/* Service tabs */}
        <div className="px-5 py-5">
          <div className="flex gap-1 p-1 rounded-xl" style={{ backgroundColor: C.surface }}>
            {services.map((s, i) => (
              <button
                key={s}
                onClick={() => setActiveService(i)}
                className="flex-1 py-2.5 rounded-lg text-xs font-medium transition-all"
                style={{
                  backgroundColor: activeService === i ? C.bg : "transparent",
                  color: activeService === i ? C.green : C.gray,
                  border: activeService === i ? `1px solid ${C.green}20` : "1px solid transparent",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-5 pb-16">
          {/* ===== BRANDING ===== */}
          {activeService === 0 && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl" style={{ backgroundColor: C.surface, borderLeft: `3px solid ${C.green}` }}>
                <p className="text-sm leading-relaxed" style={{ color: C.gray }}>
                  Definimos la identidad de tu marca con estrategia y diseño. Desde los elementos esenciales hasta un sistema visual completo.
                </p>
              </div>

              <PackageCard
                name="SPARK"
                price={699}
                period="proyecto"
                features={[
                  "Logo (2 propuestas, 1 seleccionada con refinamiento)",
                  "Paleta de colores",
                  "Selección de tipografías",
                  "Guía de uso básica (logo, colores, tipografías)",
                  "Archivos en todos los formatos necesarios (PNG, SVG, PDF)",
                ]}
                extraFeatures={[
                  "2 rondas de revisiones incluidas",
                  "Entrega en 1–2 semanas",
                ]}
              />

              <PackageCard
                name="BLAZE"
                price={1500}
                period="proyecto"
                isPrimary
                color={C.pink}
                features={[
                  "Todo lo incluido en Spark",
                  "Estrategia de marca (propósito, tono de voz, personalidad, audiencia)",
                  "Sistema visual extendido (variantes de logo, iconografía básica)",
                  "Templates para redes sociales (feed + stories)",
                  "Firma de email + tarjeta de presentación",
                  "Brand guidelines completo (documento profesional)",
                ]}
                extraFeatures={[
                  "3 rondas de revisiones incluidas",
                  "Entrega en 3–4 semanas",
                ]}
              />

              {/* Note */}
              <div className="p-3 rounded-lg" style={{ backgroundColor: C.bg, border: `1px solid ${C.dimmer}` }}>
                <p className="text-xs" style={{ color: C.dim }}>
                  ¿Necesitas naming, diseño web o aplicaciones adicionales? Se cotizan como add-ons sobre cualquier paquete.
                </p>
              </div>
            </div>
          )}

          {/* ===== SOCIAL MEDIA ===== */}
          {activeService === 1 && (
            <div className="space-y-5">
              <div className="p-4 rounded-xl" style={{ backgroundColor: C.surface, borderLeft: `3px solid ${C.green}` }}>
                <p className="text-sm leading-relaxed" style={{ color: C.gray }}>
                  Creamos y gestionamos tu contenido para redes sociales. Estrategia, producción, publicación y análisis — todo resuelto.
                </p>
              </div>

              <PackageCard
                name="SPARK"
                price={1800}
                period="mes"
                features={[
                  "18 contenidos mensuales:",
                  "→ 4 Reels originales (grabados en content day)",
                  "→ 4 carruseles (diseño gráfico + copy)",
                  "→ 4 posts estáticos (foto + diseño + copy)",
                  "→ 6 stories (diseño + copy)",
                  "1 content day al mes (medio día, ~4 hrs de grabación)",
                  "Plataformas: Meta (Instagram + Facebook)",
                ]}
                extraFeatures={[
                  "Calendario de contenido mensual",
                  "Copy para cada pieza",
                  "Reporte mensual básico (métricas clave)",
                ]}
              />

              <PackageCard
                name="BLAZE"
                price={2500}
                period="mes"
                isPrimary
                color={C.pink}
                features={[
                  "26 contenidos mensuales:",
                  "→ 6 Reels / TikToks originales (grabados en content day)",
                  "→ 6 carruseles (diseño gráfico + copy)",
                  "→ 4 posts estáticos (foto + diseño + copy)",
                  "→ 10 stories (incluyendo interactivas: encuestas, Q&A, stickers)",
                  "1 content day completo (~6–8 hrs de grabación)",
                  "Plataformas: Meta (IG + FB) + 1 adicional (TikTok o LinkedIn)",
                ]}
                extraFeatures={[
                  "Estrategia de contenido mensual + calendario",
                  "Copy + hashtag strategy",
                  "Community management básico (respuestas a comentarios y DMs)",
                  "Reporte mensual con análisis y recomendaciones",
                ]}
              />

              {/* Clarifications */}
              <div className="space-y-2">
                <p className="text-xs tracking-widest" style={{ color: C.dim }}>NOTAS IMPORTANTES</p>
                {[
                  "Meta (Instagram + Facebook) cuenta como 1 plataforma — se publica desde el mismo Meta Business Suite.",
                  "El content day incluye grabación de video y fotografía para generar material reutilizable durante el mes.",
                  "Pauta publicitaria (Meta Ads) se cotiza por separado con fee de gestión adicional.",
                  "Compromiso mínimo: 3 meses para ver resultados consistentes.",
                ].map((note, i) => (
                  <div key={i} className="flex gap-2 items-start p-2 rounded-lg" style={{ backgroundColor: C.surface }}>
                    <span className="text-xs flex-shrink-0" style={{ color: C.dim }}>{i + 1}.</span>
                    <p className="text-xs" style={{ color: C.gray }}>{note}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ===== LUMMA FILMS ===== */}
          {activeService === 2 && (
            <div className="space-y-5">
              <div className="p-5 rounded-xl" style={{
                backgroundColor: C.surface,
                borderLeft: `3px solid ${C.pink}`,
                background: `linear-gradient(135deg, ${C.pink}06 0%, transparent 50%), linear-gradient(225deg, ${C.green}04 0%, transparent 50%)`,
                border: `1px solid ${C.dimmer}`,
                borderLeftWidth: 3,
                borderLeftColor: C.pink,
              }}>
                <p className="text-lg font-bold mb-2" style={{ color: C.white }}>
                  Lumma{" "}
                  <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: C.pink }}>
                    Films
                  </span>
                </p>
                <p className="text-sm leading-relaxed" style={{ color: C.gray }}>
                  Producimos piezas audiovisuales que revelan la esencia de tu marca. No hacemos videos corporativos: contamos historias que conectan.
                </p>
              </div>

              <p className="text-xs tracking-widest" style={{ color: C.green }}>CATEGORÍAS DE SERVICIO</p>

              <FilmServiceCard
                icon="🎬"
                name="Brand Film"
                description="La historia de tu marca en video. Quiénes son, qué hacen, por qué importa. Una pieza cinematográfica que captura la esencia de tu negocio y conecta emocionalmente con tu audiencia."
              />

              <FilmServiceCard
                icon="📸"
                name="Content Day"
                description="Jornada completa de producción (video + fotografía) para generar un banco de contenido de alta calidad. Material reutilizable para redes, sitio web y materiales de marketing."
              />

              <FilmServiceCard
                icon="✨"
                name="Product / Service Showcase"
                description="Piezas enfocadas en mostrar lo que ofreces con calidad visual premium. Desde productos físicos hasta servicios y experiencias — cada toma pensada para comunicar valor."
              />

              <FilmServiceCard
                icon="🗣️"
                name="Testimoniales Cinematográficos"
                description="Historias reales de clientes contadas con producción cuidada. No el típico testimonial genérico: una narrativa visual que construye confianza y credibilidad."
              />

              <FilmServiceCard
                icon="🎥"
                name="Event Coverage"
                description="Cobertura de eventos con enfoque narrativo, no solo registro. Capturamos la energía, los momentos clave y la historia detrás del evento para crear contenido con vida útil extendida."
              />

              {/* Pricing note */}
              <div className="p-4 rounded-xl" style={{ backgroundColor: C.bg, border: `1px solid ${C.dimmer}` }}>
                <p className="text-xs tracking-widest mb-2" style={{ color: C.dim }}>SOBRE LA COTIZACIÓN</p>
                <p className="text-xs leading-relaxed" style={{ color: C.gray }}>
                  Cada proyecto de producción audiovisual es único. Las variables incluyen duración, locaciones, talento, complejidad de post-producción y derechos de uso. Por eso cotizamos por proyecto después de una llamada de descubrimiento gratuita donde entendemos tu visión y definimos el alcance juntos.
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: C.green }} />
                  <p className="text-xs font-medium" style={{ color: C.green }}>
                    Agenda tu llamada de descubrimiento →
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Comparison strip */}
        <div className="px-5 pb-8">
          <div className="p-4 rounded-xl" style={{ backgroundColor: C.surface }}>
            <p className="text-xs tracking-widest mb-3" style={{ color: C.green }}>¿CUÁL ES TU PUNTO DE PARTIDA?</p>
            <div className="space-y-2">
              {[
                { need: "Estoy empezando y necesito identidad", rec: "Branding Spark → Social Media Spark", color: C.green },
                { need: "Tengo marca pero necesito contenido profesional", rec: "Social Media Spark o Blaze", color: C.green },
                { need: "Quiero renovar todo y escalar", rec: "Branding Blaze + Social Media Blaze + Brand Film", color: C.pink },
              ].map((r, i) => (
                <div key={i} className="flex gap-3 items-start p-2 rounded-lg" style={{ backgroundColor: C.bg }}>
                  <div className="w-1 rounded-full flex-shrink-0 mt-0.5" style={{ backgroundColor: r.color, height: 32 }} />
                  <div>
                    <p className="text-xs" style={{ color: C.gray }}>{r.need}</p>
                    <p className="text-xs font-bold mt-0.5" style={{ color: C.white }}>{r.rec}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-6 text-center" style={{ borderTop: `1px solid ${C.dimmer}` }}>
          <LogoSymbol size={24} />
          <p className="text-xs mt-2" style={{ color: C.dim, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Lumma © 2026 — Precios válidos para Miami-Dade
          </p>
        </div>
      </div>
    </>
  );
}
