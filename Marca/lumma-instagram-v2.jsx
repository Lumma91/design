import { useState } from "react";

const C = {
  bg: "#080808",
  surface: "#111111",
  green: "#CCFF00",
  pink: "#E6007E",
  white: "#FFFFFF",
  gray: "#777777",
  dim: "#444444",
  dimmer: "#2a2a2a",
};

const posts = [
  {
    id: 1,
    type: "Identidad",
    typeColor: C.green,
    category: "Presentación",
    render: () => (
      <div className="w-full aspect-square flex flex-col items-center justify-center relative overflow-hidden" style={{ backgroundColor: C.bg }}>
        <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 30% 40%, ${C.green}10 0%, transparent 50%), radial-gradient(circle at 70% 60%, ${C.pink}08 0%, transparent 50%)` }} />
        <div className="relative z-10 text-center px-8">
          <svg width={80} height={50} viewBox="0 0 60 60" className="mx-auto mb-6">
            <circle cx="22" cy="30" r="14" fill={C.green} />
            <circle cx="38" cy="30" r="14" fill={C.pink} />
            <circle cx="30" cy="30" r="6" fill={C.bg} />
          </svg>
          <p className="text-3xl font-extrabold tracking-wider mb-3" style={{ color: C.white, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            LUMMA
          </p>
          <p className="text-xs tracking-widest" style={{ color: C.gray, letterSpacing: 4 }}>
            LIGHT YOUR BRAND
          </p>
        </div>
      </div>
    ),
    caption: "Esto es Lumma. ✦\n\nUn estudio creativo en Miami que ilumina marcas a través de contenido con intención, estrategia y estética.\n\nCada video, cada imagen, cada pieza está diseñada para hacer brillar lo que hace única a tu marca.\n\nBienvenidos. Esto apenas empieza. 🔥\n\n#LummaStudio #LightYourBrand #MiamiCreative",
  },
  {
    id: 2,
    type: "Valor",
    typeColor: C.pink,
    category: "Storytelling",
    render: () => (
      <div className="w-full aspect-square flex flex-col justify-center relative overflow-hidden" style={{ backgroundColor: C.bg }}>
        <div className="absolute top-6 right-6 w-20 h-20 rounded-full" style={{ border: `1px solid ${C.green}12` }} />
        <div className="relative z-10 px-8">
          <p className="text-xs tracking-widest mb-6" style={{ color: C.dim }}>@lummastudio_</p>
          <p className="text-sm mb-3" style={{ color: C.gray }}>
            Imagina que cada pieza de contenido
          </p>
          <p className="text-2xl font-extrabold leading-tight" style={{ color: C.white, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            cuenta una{" "}
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: C.green }}>
              historia
            </span>
          </p>
          <p className="text-2xl font-extrabold leading-tight" style={{ color: C.white, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            que la gente{" "}
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: C.pink }}>
              quiere
            </span>
          </p>
          <p className="text-2xl font-extrabold leading-tight" style={{ color: C.white, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            escuchar.
          </p>
          <p className="text-xs mt-6" style={{ color: C.dim }}>
            Eso es lo que hacemos →
          </p>
        </div>
      </div>
    ),
    caption: "Las marcas que más crecen tienen algo en común:\n\nNo venden productos. Cuentan historias.\n\nHistorias que inspiran. Que generan confianza. Que hacen que alguien diga: \"quiero ser parte de esto.\"\n\nEso es contenido con intención. Y eso es lo que creamos en Lumma.\n\n💡 Guarda este post si crees en el poder de una buena historia.\n\n#Storytelling #ContentMarketing #MarcasQueBrillan",
  },
  {
    id: 3,
    type: "Identidad",
    typeColor: C.green,
    category: "Servicios",
    render: () => (
      <div className="w-full aspect-square flex flex-col justify-between relative overflow-hidden p-8" style={{ backgroundColor: C.bg }}>
        <div>
          <p className="text-xs tracking-widest mb-4" style={{ color: C.green }}>LO QUE CREAMOS PARA TI</p>
          <div className="space-y-4">
            {[
              { icon: "🎬", name: "Producción Audiovisual", desc: "Videos y fotos con alma cinematográfica" },
              { icon: "📱", name: "Social Media", desc: "Contenido que conecta, estrategia que crece" },
              { icon: "✦", name: "Branding", desc: "La identidad que tu marca merece" },
            ].map((s) => (
              <div key={s.name} className="flex gap-3 items-start">
                <span className="text-lg">{s.icon}</span>
                <div>
                  <p className="text-sm font-bold" style={{ color: C.white }}>{s.name}</p>
                  <p className="text-xs" style={{ color: C.gray }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <svg width={20} height={20} viewBox="0 0 60 60">
            <circle cx="22" cy="30" r="14" fill={C.green} />
            <circle cx="38" cy="30" r="14" fill={C.pink} />
            <circle cx="30" cy="30" r="6" fill={C.bg} />
          </svg>
          <span className="text-xs" style={{ color: C.dim }}>lummastudio_</span>
        </div>
      </div>
    ),
    caption: "Tres formas de hacer brillar tu marca con Lumma:\n\n🎬 Producción Audiovisual — contenido visual que se siente, no solo se ve\n📱 Social Media — de la estrategia a la publicación, todo resuelto\n✦ Branding — la base de todo: tu identidad visual y verbal\n\n¿Por cuál empezamos? DM abierto 💬\n\n#AgenciaCreativa #MiamiContent #LummaStudio",
  },
  {
    id: 4,
    type: "Valor",
    typeColor: C.pink,
    category: "Inspiración",
    render: () => (
      <div className="w-full aspect-square flex flex-col justify-center relative overflow-hidden p-8" style={{ backgroundColor: C.bg }}>
        <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full" style={{ background: `radial-gradient(circle, ${C.green}10 0%, transparent 70%)` }} />
        <div className="relative z-10">
          <p className="text-xs tracking-widest mb-6" style={{ color: C.green }}>VERDAD CREATIVA</p>
          <p className="text-xl font-extrabold leading-tight mb-1" style={{ color: C.white, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Una sola pieza
          </p>
          <p className="text-xl font-extrabold leading-tight mb-1" style={{ color: C.white, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            bien{" "}
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: C.green }}>
              pensada
            </span>
          </p>
          <p className="text-xl font-extrabold leading-tight" style={{ color: C.white, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            vale más que{" "}
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: C.pink }}>
              cien
            </span>
          </p>
          <p className="text-xl font-extrabold leading-tight" style={{ color: C.white, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            publicaciones.
          </p>
        </div>
      </div>
    ),
    caption: "No se trata de publicar más.\n\nSe trata de publicar con intención.\n\nUna pieza que conecta, que emociona, que hace que alguien se detenga a mirar — eso mueve más que un mes entero de contenido sin alma.\n\nCalidad. Siempre. ✦\n\n#ContentWithPurpose #CalidadSobreCantidad #CreativeStrategy",
  },
  {
    id: 5,
    type: "Identidad",
    typeColor: C.green,
    category: "Proceso",
    render: () => (
      <div className="w-full aspect-square flex flex-col justify-center relative overflow-hidden p-8" style={{ backgroundColor: C.bg }}>
        <p className="text-xs tracking-widest mb-6" style={{ color: C.green }}>NUESTRO PROCESO</p>
        <div className="space-y-5">
          {[
            { num: "01", title: "Escuchamos", desc: "Entendemos tu visión, tu negocio y tu audiencia." },
            { num: "02", title: "Diseñamos", desc: "Creamos la estrategia que va a hacer brillar tu marca." },
            { num: "03", title: "Producimos", desc: "Cada pieza con intención, estética y calidad." },
            { num: "04", title: "Crecemos", desc: "Medimos, aprendemos y escalamos juntos." },
          ].map((step) => (
            <div key={step.num} className="flex gap-3 items-start">
              <span className="text-xs font-mono font-bold" style={{ color: C.green, minWidth: 20 }}>{step.num}</span>
              <div>
                <p className="text-sm font-bold" style={{ color: C.white }}>{step.title}</p>
                <p className="text-xs" style={{ color: C.gray }}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    caption: "Detrás de cada pieza de contenido hay un proceso con intención.\n\n01 → Escuchamos tu marca\n02 → Diseñamos la estrategia\n03 → Producimos con calidad\n04 → Crecemos juntos\n\nAsí es como transformamos ideas en contenido que conecta. ✨\n\n#ProcesoCreativo #LummaStudio #ContentCreation",
  },
  {
    id: 6,
    type: "Valor",
    typeColor: C.pink,
    category: "Educativo",
    render: () => (
      <div className="w-full aspect-square flex flex-col justify-center relative overflow-hidden p-8" style={{ backgroundColor: C.bg }}>
        <div className="relative z-10">
          <p className="text-xs tracking-widest mb-5" style={{ color: C.green }}>GUÍA RÁPIDA</p>
          <p className="text-lg font-extrabold leading-tight mb-5" style={{ color: C.white, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            5 cosas que las marcas que{" "}
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: C.green }}>brillan</span>
            {" "}hacen diferente
          </p>
          {[
            "Tienen una identidad visual que se reconoce al instante",
            "Publican con estrategia, no por obligación",
            "Cuentan historias, no solo venden productos",
            "Cuidan cada detalle como si fuera el primero",
            "Tratan su contenido como una inversión, no un gasto",
          ].map((item, i) => (
            <div key={i} className="flex gap-2 items-center mb-2.5">
              <div className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: `${C.green}15` }}>
                <span style={{ fontSize: 8, color: C.green, fontWeight: 800 }}>{i + 1}</span>
              </div>
              <p className="text-xs" style={{ color: C.gray }}>{item}</p>
            </div>
          ))}
        </div>
      </div>
    ),
    caption: "Las marcas que más admiras tienen algo en común.\n\nNo es suerte. Es intención.\n\n1. Identidad visual reconocible\n2. Estrategia detrás de cada post\n3. Storytelling genuino\n4. Atención al detalle\n5. Contenido como inversión\n\n¿Cuál de estas ya aplicas en tu marca? Cuéntame en los comentarios 👇\n\n#BrandingTips #MarcasQueBrillan #ContentStrategy",
  },
  {
    id: 7,
    type: "Storytelling",
    typeColor: C.green,
    category: "Conexión",
    render: () => (
      <div className="w-full aspect-square flex flex-col justify-center relative overflow-hidden p-8" style={{ backgroundColor: C.bg }}>
        <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${C.green}05 0%, transparent 40%, ${C.pink}05 100%)` }} />
        <div className="relative z-10">
          <p className="text-xs tracking-widest mb-5" style={{ color: C.dim }}>LA HISTORIA DETRÁS</p>
          <p className="text-lg font-extrabold leading-tight" style={{ color: C.white, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Creamos Lumma porque
          </p>
          <p className="text-lg font-extrabold leading-tight" style={{ color: C.white, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            creemos que toda marca
          </p>
          <p className="text-lg font-extrabold leading-tight" style={{ color: C.white, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            tiene una{" "}
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: C.green }}>
              luz propia.
            </span>
          </p>
          <p className="text-xs mt-5 leading-relaxed" style={{ color: C.gray }}>
            Solo necesita a alguien que la sepa encender.
          </p>
          <div className="flex items-center gap-2 mt-5">
            <svg width={16} height={16} viewBox="0 0 60 60">
              <circle cx="22" cy="30" r="14" fill={C.green} />
              <circle cx="38" cy="30" r="14" fill={C.pink} />
              <circle cx="30" cy="30" r="6" fill={C.bg} />
            </svg>
            <span className="text-xs" style={{ color: C.dim }}>lummastudio_</span>
          </div>
        </div>
      </div>
    ),
    caption: "Antes de ser Lumma, fuimos muchas cosas.\n\nMarketing. Producción. Estrategia. Coordinación. Proyectos de todos los tamaños.\n\nPero siempre con una constante: la convicción de que cada marca — sin importar su tamaño — merece contenido que la represente con orgullo.\n\nLumma nació de esa convicción. De creer que la luz ya está ahí. Solo hay que saber encenderla.\n\nEsto es para ti. Esto es para tu marca. ✦\n\n#LummaStudio #LightYourBrand #NuestraHistoria",
  },
  {
    id: 8,
    type: "Valor",
    typeColor: C.pink,
    category: "Motivacional",
    render: () => (
      <div className="w-full aspect-square flex flex-col justify-center relative overflow-hidden p-8" style={{ backgroundColor: C.bg }}>
        <div className="relative z-10">
          <p className="text-sm mb-2" style={{ color: C.gray }}>
            La marca que estás construyendo
          </p>
          <p className="text-3xl font-extrabold leading-none" style={{ color: C.white, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            merece
          </p>
          <p className="text-3xl font-extrabold leading-none" style={{ color: C.white, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            ser{" "}
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: C.green }}>
              vista.
            </span>
          </p>
          <div className="mt-6 inline-block px-4 py-2 rounded-full" style={{ backgroundColor: `${C.green}12`, border: `1px solid ${C.green}25` }}>
            <p className="text-xs font-medium" style={{ color: C.green }}>Y nosotros sabemos cómo hacerlo. ✦</p>
          </div>
        </div>
      </div>
    ),
    caption: "Detrás de tu marca hay horas de trabajo, decisiones difíciles, noches largas y una visión que te mueve.\n\nEso merece ser contado. Merece ser visto. Merece brillar.\n\nEn Lumma creamos el contenido que le hace justicia a todo lo que estás construyendo.\n\n¿Lista para dar el siguiente paso? 📩 DM\n\n#Emprendedores #MarcasConPropósito #ContentCreation",
  },
  {
    id: 9,
    type: "CTA",
    typeColor: C.green,
    category: "Conversión",
    render: () => (
      <div className="w-full aspect-square flex flex-col items-center justify-center relative overflow-hidden p-8" style={{ backgroundColor: C.bg }}>
        <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 50%, ${C.green}08 0%, transparent 60%)` }} />
        <div className="relative z-10 text-center">
          <svg width={50} height={36} viewBox="0 0 60 60" className="mx-auto mb-5">
            <circle cx="22" cy="30" r="14" fill={C.green} />
            <circle cx="38" cy="30" r="14" fill={C.pink} />
            <circle cx="30" cy="30" r="6" fill={C.bg} />
          </svg>
          <p className="text-xl font-extrabold leading-tight mb-1" style={{ color: C.white, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Tu marca tiene
          </p>
          <p className="text-xl font-extrabold leading-tight mb-1" style={{ color: C.white, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            una{" "}
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: C.green }}>historia</span>
            {" "}increíble.
          </p>
          <p className="text-xl font-extrabold leading-tight" style={{ color: C.white, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            Vamos a{" "}
            <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: C.pink }}>contarla.</span>
          </p>
          <p className="text-xs mt-5 leading-relaxed" style={{ color: C.gray }}>
            Branding desde $699 · Social Media desde $1,800/mes
          </p>
          <div className="mt-5 inline-block px-5 py-2.5 rounded-full" style={{ backgroundColor: C.green }}>
            <p className="text-xs font-bold" style={{ color: C.bg }}>Escríbenos por DM →</p>
          </div>
        </div>
      </div>
    ),
    caption: "Tu marca ya tiene todo lo que necesita para brillar.\n\nLa visión. El producto. La pasión.\n\nSolo falta el contenido que lo cuente como se merece.\n\nEn Lumma creamos:\n✦ Branding — desde $699\n✦ Social Media — desde $1,800/mes\n✦ Producción audiovisual — a la medida de tu historia\n\n📩 Escríbenos por DM o toca el link en bio.\n\nLos primeros 3 clientes tienen un precio especial de lanzamiento. 🔥\n\n#LummaStudio #LightYourBrand #MiamiCreativeAgency",
  },
];

function PostCard({ post }) {
  return (
    <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${post.typeColor}30` }}>
      {post.render()}
    </div>
  );
}

function GridView({ posts, setSelectedPost }) {
  return (
    <div className="grid grid-cols-3 gap-1">
      {posts.map((p, i) => (
        <div
          key={p.id}
          className="aspect-square cursor-pointer overflow-hidden relative rounded"
          onClick={() => setSelectedPost(i)}
          style={{ border: `1px solid ${C.dimmer}` }}
        >
          <div className="w-full h-full overflow-hidden">
            {p.render()}
          </div>
          <div className="absolute bottom-1 left-1">
            <span style={{ fontSize: 7, color: C.dim, backgroundColor: C.bg + "cc", padding: "1px 4px", borderRadius: 3 }}>{p.id}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function LummaInstagramV2() {
  const [view, setView] = useState("detail");
  const [selectedPost, setSelectedPost] = useState(0);
  const [showCaption, setShowCaption] = useState(false);
  const post = posts[selectedPost];

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />

      <div className="min-h-screen" style={{ backgroundColor: C.bg, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {/* Header */}
        <div className="px-5 pt-8 pb-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="font-mono text-xs tracking-widest" style={{ color: C.dim }}>CONTENIDO DE LANZAMIENTO</p>
              <h1 className="text-2xl font-bold mt-1" style={{ color: C.white }}>
                Feed{" "}
                <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: C.green }}>
                  inicial
                </span>
              </h1>
            </div>
            <div className="flex gap-1">
              {["detail", "grid"].map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: view === v ? C.surface : "transparent" }}
                >
                  {v === "detail" ? (
                    <svg width="16" height="16" viewBox="0 0 16 16"><rect width="16" height="16" rx="2" fill={view === v ? C.green : C.dim} /></svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 16 16">
                      {[0, 5.75, 11.5].map(y => [0, 5.75, 11.5].map(x => (
                        <rect key={`${x}${y}`} x={x} y={y} width="4.5" height="4.5" rx="1" fill={view === v ? C.green : C.dim} />
                      )))}
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: C.gray }}>
            9 posts con tono positivo, inspiracional y storytelling. Listos para @lummastudio_
          </p>
        </div>

        {/* Strategy legend */}
        <div className="px-5 mb-4">
          <div className="flex gap-2 flex-wrap">
            {[
              { label: "Identidad", color: C.green, count: 3 },
              { label: "Valor / Educativo", color: C.pink, count: 3 },
              { label: "Storytelling", color: C.green, count: 1 },
              { label: "Motivacional", color: C.pink, count: 1 },
              { label: "CTA", color: C.green, count: 1 },
            ].map((t) => (
              <span key={t.label} className="text-xs px-2 py-1 rounded-full" style={{ border: `1px solid ${t.color}30`, color: t.color, fontSize: 10 }}>
                {t.label} ({t.count})
              </span>
            ))}
          </div>
        </div>

        <div className="px-5 pb-16">
          {/* GRID */}
          {view === "grid" && (
            <div>
              <GridView posts={posts} setSelectedPost={(i) => { setSelectedPost(i); setView("detail"); }} />
              <p className="text-xs text-center mt-4" style={{ color: C.dim }}>Toca cualquier post para ver detalle y caption</p>
            </div>
          )}

          {/* DETAIL */}
          {view === "detail" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2 py-1 rounded" style={{ backgroundColor: C.surface, color: C.dim }}>
                    {post.id}/9
                  </span>
                  <span className="text-xs px-2 py-1 rounded-full" style={{ border: `1px solid ${post.typeColor}30`, color: post.typeColor }}>
                    {post.type}
                  </span>
                  <span className="text-xs" style={{ color: C.dim }}>{post.category}</span>
                </div>
              </div>

              <PostCard post={post} />

              <button
                onClick={() => setShowCaption(!showCaption)}
                className="w-full py-2.5 rounded-lg text-xs font-medium transition-all"
                style={{ backgroundColor: C.surface, color: C.green, border: `1px solid ${C.dimmer}` }}
              >
                {showCaption ? "Ocultar caption ↑" : "Ver caption sugerido ↓"}
              </button>

              {showCaption && (
                <div className="p-4 rounded-xl" style={{ backgroundColor: C.surface }}>
                  <div className="flex items-center gap-2 mb-3">
                    <svg width={16} height={16} viewBox="0 0 60 60">
                      <circle cx="22" cy="30" r="14" fill={C.green} />
                      <circle cx="38" cy="30" r="14" fill={C.pink} />
                      <circle cx="30" cy="30" r="6" fill={C.bg} />
                    </svg>
                    <span className="text-xs font-bold" style={{ color: C.white }}>lummastudio_</span>
                  </div>
                  <p className="text-xs leading-relaxed whitespace-pre-line" style={{ color: C.gray }}>
                    {post.caption}
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => { setSelectedPost(Math.max(0, selectedPost - 1)); setShowCaption(false); }}
                  className="flex-1 py-2.5 rounded-lg text-xs"
                  style={{ backgroundColor: C.surface, color: selectedPost === 0 ? C.dim : C.gray }}
                  disabled={selectedPost === 0}
                >
                  ← Anterior
                </button>
                <button
                  onClick={() => { setSelectedPost(Math.min(8, selectedPost + 1)); setShowCaption(false); }}
                  className="flex-1 py-2.5 rounded-lg text-xs font-medium"
                  style={{ backgroundColor: selectedPost === 8 ? C.surface : C.green, color: selectedPost === 8 ? C.dim : C.bg }}
                  disabled={selectedPost === 8}
                >
                  Siguiente →
                </button>
              </div>

              <div className="flex gap-1 mt-2">
                {posts.map((p, i) => (
                  <div
                    key={p.id}
                    onClick={() => { setSelectedPost(i); setShowCaption(false); }}
                    className="flex-1 h-1.5 rounded-full cursor-pointer transition-all"
                    style={{ backgroundColor: i === selectedPost ? p.typeColor : C.dimmer }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Posting guide */}
        <div className="px-5 pb-6">
          <div className="p-4 rounded-xl" style={{ backgroundColor: C.surface, border: `1px solid ${C.dimmer}` }}>
            <p className="text-xs tracking-widest mb-2" style={{ color: C.green }}>ORDEN DE PUBLICACIÓN</p>
            <p className="text-xs leading-relaxed" style={{ color: C.gray }}>
              Publica los 9 posts en 3 días (3 por día). Orden sugerido: primero identidad (1, 3, 5), luego valor y storytelling (2, 4, 6, 7), y al final motivación + CTA (8, 9). Así cuando alguien visite tu perfil, encuentra un feed coherente que inspira confianza.
            </p>
          </div>
        </div>

        <div className="px-5 py-6 text-center" style={{ borderTop: `1px solid ${C.dimmer}` }}>
          <p className="text-xs" style={{ color: C.dim }}>Lumma © 2026 — Feed de lanzamiento V2</p>
        </div>
      </div>
    </>
  );
}
