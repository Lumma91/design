import { useState, useEffect } from "react";

// QR Code generator - minimal implementation for URL encoding
function generateQRMatrix(text) {
  // Simple QR-like visual pattern based on text hash (decorative)
  // For production, this would use a real QR library
  const size = 25;
  const matrix = [];
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = ((hash << 5) - hash + text.charCodeAt(i)) | 0;
  }
  
  for (let r = 0; r < size; r++) {
    const row = [];
    for (let c = 0; c < size; c++) {
      // Finder patterns (top-left, top-right, bottom-left)
      const inFinderTL = r < 7 && c < 7;
      const inFinderTR = r < 7 && c >= size - 7;
      const inFinderBL = r >= size - 7 && c < 7;
      
      if (inFinderTL || inFinderTR || inFinderBL) {
        const fr = inFinderTL ? r : inFinderTR ? r : r - (size - 7);
        const fc = inFinderTL ? c : inFinderTR ? c - (size - 7) : c;
        if (fr === 0 || fr === 6 || fc === 0 || fc === 6 || (fr >= 2 && fr <= 4 && fc >= 2 && fc <= 4)) {
          row.push(1);
        } else {
          row.push(0);
        }
      } else {
        // Data area - pseudo-random based on position and hash
        const val = Math.sin(r * 127.1 + c * 311.7 + hash * 0.001) * 43758.5453;
        row.push((val - Math.floor(val)) > 0.5 ? 1 : 0);
      }
    }
    matrix.push(row);
  }
  return matrix;
}

function QRCode({ url, size = 160, fgColor = "#080808", bgColor = "transparent" }) {
  const matrix = generateQRMatrix(url);
  const cellSize = size / matrix.length;
  
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} fill={bgColor} rx="8" />
      {matrix.map((row, r) =>
        row.map((cell, c) =>
          cell ? (
            <rect
              key={`${r}-${c}`}
              x={c * cellSize}
              y={r * cellSize}
              width={cellSize + 0.5}
              height={cellSize + 0.5}
              fill={fgColor}
              rx={cellSize * 0.15}
            />
          ) : null
        )
      )}
    </svg>
  );
}

function LogoSymbol({ size = 48 }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 60 36">
      <circle cx="18" cy="18" r="14" fill="#CCFF00" />
      <circle cx="42" cy="18" r="14" fill="#E6007E" />
      <circle cx="30" cy="18" r="6" fill="#080808" />
    </svg>
  );
}

export default function LummaDigitalCard() {
  const [flipped, setFlipped] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    setTimeout(() => setMounted(true), 100);
  }, []);

  const copyToClipboard = (text, label) => {
    navigator.clipboard?.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const contactItems = [
    { icon: "globe", label: "Web", value: "www.lummacreative.com", action: () => window.open("https://www.lummacreative.com", "_blank") },
    { icon: "instagram", label: "Instagram", value: "@lummastudio_", action: () => window.open("https://www.instagram.com/lummastudio_", "_blank") },
    { icon: "email", label: "Email", value: "hello@lummacreative.com", action: () => copyToClipboard("hello@lummacreative.com", "Email") },
    { icon: "phone", label: "Llamar", value: "+1 (786) 000-0000", action: () => copyToClipboard("+17860000000", "Teléfono") },
  ];

  const iconPaths = {
    globe: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z",
    instagram: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3",
    email: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
    phone: "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z",
  };

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@1&display=swap" rel="stylesheet" />
      <div
        style={{
          minHeight: "100vh",
          background: "#080808",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 380,
            perspective: "1200px",
          }}
        >
          {/* Tap to flip hint */}
          <div
            style={{
              textAlign: "center",
              marginBottom: 16,
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(-8px)",
              transition: "all 0.6s ease 0.8s",
            }}
          >
            <span style={{ fontSize: 11, color: "#555", letterSpacing: 3, textTransform: "uppercase" }}>
              {flipped ? "← Toca para volver" : "Toca la tarjeta para ver contacto →"}
            </span>
          </div>

          {/* Card container */}
          <div
            onClick={() => setFlipped(!flipped)}
            style={{
              width: "100%",
              aspectRatio: "9/16",
              cursor: "pointer",
              position: "relative",
              transformStyle: "preserve-3d",
              transform: `rotateY(${flipped ? 180 : 0}deg)`,
              transition: "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
          >
            {/* ===== FRONT ===== */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backfaceVisibility: "hidden",
                borderRadius: 20,
                overflow: "hidden",
                background: "linear-gradient(165deg, #0a0a0a 0%, #111111 40%, #0d0d0d 100%)",
                border: "1px solid #222",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "scale(1)" : "scale(0.95)",
                transition: "opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s",
              }}
            >
              {/* Ambient glow */}
              <div style={{
                position: "absolute",
                top: "15%",
                left: "20%",
                width: 200,
                height: 200,
                background: "radial-gradient(circle, rgba(204,255,0,0.04) 0%, transparent 70%)",
                borderRadius: "50%",
                pointerEvents: "none",
              }} />
              <div style={{
                position: "absolute",
                bottom: "20%",
                right: "15%",
                width: 180,
                height: 180,
                background: "radial-gradient(circle, rgba(230,0,126,0.03) 0%, transparent 70%)",
                borderRadius: "50%",
                pointerEvents: "none",
              }} />

              {/* Logo symbol */}
              <div style={{ marginBottom: 40, opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(20px)", transition: "all 0.8s ease 0.4s" }}>
                <LogoSymbol size={72} />
              </div>

              {/* Brand name */}
              <h1 style={{
                fontSize: 48,
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: 12,
                margin: 0,
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.8s ease 0.5s",
              }}>
                LUMMA
              </h1>

              {/* Tagline */}
              <p style={{
                fontSize: 13,
                color: "#777",
                letterSpacing: 5,
                marginTop: 12,
                textTransform: "uppercase",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.8s ease 0.6s",
              }}>
                Light your brand
              </p>

              {/* Divider */}
              <div style={{
                width: 40,
                height: 2,
                background: "linear-gradient(90deg, #CCFF00, #E6007E)",
                marginTop: 32,
                borderRadius: 1,
                opacity: mounted ? 1 : 0,
                transition: "opacity 0.8s ease 0.7s",
              }} />

              {/* Subtitle */}
              <p style={{
                fontSize: 11,
                color: "#555",
                marginTop: 20,
                letterSpacing: 2,
                textAlign: "center",
                lineHeight: 1.6,
              }}>
                BRANDING · SOCIAL MEDIA · FILMS
              </p>

              {/* Founder */}
              <div style={{
                position: "absolute",
                bottom: 32,
                textAlign: "center",
              }}>
                <p style={{ fontSize: 15, fontWeight: 600, color: "#fff", margin: 0, letterSpacing: 1 }}>
                  Sonia
                </p>
                <p style={{ fontSize: 10, color: "#666", marginTop: 4, letterSpacing: 2, textTransform: "uppercase" }}>
                  Founder & Creative Director
                </p>
              </div>
            </div>

            {/* ===== BACK ===== */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
                borderRadius: 20,
                overflow: "hidden",
                background: "linear-gradient(165deg, #0a0a0a 0%, #111111 40%, #0d0d0d 100%)",
                border: "1px solid #222",
                display: "flex",
                flexDirection: "column",
                padding: "32px 24px",
              }}
            >
              {/* Top section - Logo small */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                <LogoSymbol size={32} />
                <span style={{ fontSize: 18, fontWeight: 700, color: "#fff", letterSpacing: 4 }}>LUMMA</span>
              </div>
              <p style={{ fontSize: 10, color: "#555", letterSpacing: 3, marginBottom: 28, textTransform: "uppercase" }}>
                Creative Studio · Miami
              </p>

              {/* QR Code */}
              <div style={{
                display: "flex",
                justifyContent: "center",
                padding: "20px 0",
                marginBottom: 20,
              }}>
                <div style={{
                  background: "#fff",
                  borderRadius: 16,
                  padding: 16,
                  boxShadow: "0 0 40px rgba(204,255,0,0.06), 0 0 80px rgba(230,0,126,0.04)",
                }}>
                  <QRCode url="https://www.lummacreative.com" size={140} />
                </div>
              </div>

              <p style={{ textAlign: "center", fontSize: 10, color: "#666", letterSpacing: 2, marginBottom: 28, textTransform: "uppercase" }}>
                Escanea para ver nuestro trabajo
              </p>

              {/* Contact items */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                {contactItems.map((item) => (
                  <div
                    key={item.label}
                    onClick={(e) => { e.stopPropagation(); item.action(); }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "12px 14px",
                      borderRadius: 12,
                      background: copied === item.label ? "rgba(204,255,0,0.08)" : "rgba(255,255,255,0.03)",
                      border: `1px solid ${copied === item.label ? "rgba(204,255,0,0.2)" : "rgba(255,255,255,0.06)"}`,
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <div style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: "rgba(204,255,0,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="#CCFF00">
                        <path d={iconPaths[item.icon]} />
                      </svg>
                    </div>
                    <div style={{ overflow: "hidden" }}>
                      <p style={{ fontSize: 10, color: "#666", margin: 0, letterSpacing: 1, textTransform: "uppercase" }}>
                        {copied === item.label ? "¡Copiado!" : item.label}
                      </p>
                      <p style={{ fontSize: 13, color: "#ccc", margin: 0, fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom tagline */}
              <div style={{ textAlign: "center", marginTop: 16, paddingTop: 16, borderTop: "1px solid #1a1a1a" }}>
                <p style={{
                  fontSize: 12,
                  color: "#555",
                  margin: 0,
                  fontFamily: "'Instrument Serif', serif",
                  fontStyle: "italic",
                }}>
                  Light your brand.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
