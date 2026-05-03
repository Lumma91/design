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

const briefs = [
  {
    id: "branding",
    title: "Branding",
    icon: "🎨",
    color: C.green,
    description: "Brief para proyectos de identidad de marca — Spark y Blaze",
    intro: "Este formulario nos ayuda a conocer tu proyecto a fondo antes de empezar a diseñar. No hay respuestas correctas o incorrectas — entre más honesto y detallado seas, mejor será el resultado. Tómate tu tiempo.",
    sections: [
      {
        title: "Sobre ti y tu proyecto",
        description: "Queremos entender quién eres y qué estás construyendo.",
        fields: [
          {
            label: "¿Cómo se llama tu proyecto o empresa?",
            type: "Respuesta corta",
            required: true,
          },
          {
            label: "¿A qué se dedica? Descríbelo como se lo explicarías a un amigo.",
            type: "Párrafo",
            required: true,
            hint: "No uses lenguaje corporativo. Queremos entender qué haces en palabras simples.",
          },
          {
            label: "¿Cuánto tiempo llevas con este proyecto?",
            type: "Selección múltiple",
            required: true,
            options: ["Estoy empezando (menos de 6 meses)", "Tengo algo de camino (6 meses - 2 años)", "Ya estoy establecido (más de 2 años)"],
          },
          {
            label: "¿Qué producto o servicio ofreces?",
            type: "Párrafo",
            required: true,
            hint: "Si ofreces varios, lista los principales.",
          },
          {
            label: "¿Qué te hace diferente de otros que hacen algo parecido?",
            type: "Párrafo",
            required: true,
            hint: "Piensa en qué dirían tus clientes actuales sobre por qué te eligen a ti.",
          },
        ],
      },
      {
        title: "Tu cliente ideal",
        description: "Para diseñar una marca que conecte, necesitamos saber con quién quieres conectar.",
        fields: [
          {
            label: "¿Quién es tu cliente ideal? Descríbelo como persona, no como dato demográfico.",
            type: "Párrafo",
            required: true,
            hint: "Ejemplo: 'Mujeres emprendedoras de 28-40 años que viven en Miami, tienen un negocio propio y buscan verse más profesionales en redes.'",
          },
          {
            label: "¿Qué problema le resuelves a tu cliente?",
            type: "Párrafo",
            required: true,
          },
          {
            label: "¿Dónde encuentra tu cliente ideal a negocios como el tuyo?",
            type: "Casillas de verificación",
            required: false,
            options: ["Instagram", "Facebook", "TikTok", "Google", "Referidos / boca a boca", "Eventos presenciales", "Otro"],
          },
        ],
      },
      {
        title: "Personalidad de marca",
        description: "Tu marca tiene que sentirse como tú. Estas preguntas nos ayudan a encontrar ese tono.",
        fields: [
          {
            label: "Si tu marca fuera una persona, ¿cómo la describirías en 3-5 palabras?",
            type: "Respuesta corta",
            required: true,
            hint: "Ejemplo: 'Moderna, cercana, confiable, con estilo.' o 'Audaz, directa, premium.'",
          },
          {
            label: "¿Cómo quieres que la gente se sienta cuando ve tu marca?",
            type: "Párrafo",
            required: true,
            hint: "Piensa en la primera impresión. ¿Confianza? ¿Curiosidad? ¿Lujo? ¿Cercanía?",
          },
          {
            label: "¿Hay algo que tu marca NO debería transmitir?",
            type: "Párrafo",
            required: false,
            hint: "Ejemplo: 'No quiero que se vea barato' o 'No quiero parecer una empresa gigante, somos cercanos.'",
          },
          {
            label: "¿Ya tienes una marca existente que quieres reemplazar o es desde cero?",
            type: "Selección múltiple",
            required: true,
            options: ["Desde cero — no tengo nada", "Tengo algo básico pero quiero rehacerlo todo", "Tengo marca pero necesita una actualización"],
          },
        ],
      },
      {
        title: "Gustos y referencias",
        description: "Esto nos da una idea de tu estética y lo que te atrae visualmente.",
        fields: [
          {
            label: "Comparte 3-5 marcas o cuentas de Instagram cuyo estilo visual te guste (no tienen que ser de tu industria).",
            type: "Párrafo",
            required: true,
            hint: "Incluye los @ o links. Dinos brevemente qué te gusta de cada una.",
          },
          {
            label: "¿Hay colores que te gustaría que tu marca use?",
            type: "Respuesta corta",
            required: false,
            hint: "Si no tienes preferencia, déjalo en blanco. Nosotros proponemos.",
          },
          {
            label: "¿Hay colores que definitivamente NO quieres?",
            type: "Respuesta corta",
            required: false,
          },
          {
            label: "¿Tienes alguna preferencia de estilo tipográfico?",
            type: "Selección múltiple",
            required: false,
            options: ["Moderna y limpia (sans-serif)", "Elegante y clásica (serif)", "Creativa y expresiva", "No tengo preferencia — confío en ustedes"],
          },
        ],
      },
      {
        title: "Aplicaciones y uso",
        description: "Para saber dónde va a vivir tu marca y qué necesitas desde el día uno.",
        fields: [
          {
            label: "¿Dónde vas a usar tu marca principalmente?",
            type: "Casillas de verificación",
            required: true,
            options: ["Redes sociales (Instagram, Facebook, TikTok)", "Sitio web", "Tarjetas de presentación", "Empaques o etiquetas", "Local o espacio físico", "Material impreso (flyers, brochures)", "Presentaciones y propuestas", "Otro"],
          },
          {
            label: "¿Hay algún material que necesites con urgencia una vez que la marca esté lista?",
            type: "Párrafo",
            required: false,
            hint: "Ejemplo: 'Necesito el logo listo para un evento el 15 de mayo' o 'Quiero empezar redes de inmediato.'",
          },
        ],
      },
      {
        title: "Visión a futuro",
        description: "Una buena marca se diseña para crecer contigo.",
        fields: [
          {
            label: "¿Dónde quieres que esté tu proyecto en 1 año?",
            type: "Párrafo",
            required: false,
          },
          {
            label: "¿Hay algo más que quieras que sepamos antes de empezar?",
            type: "Párrafo",
            required: false,
            hint: "Cualquier detalle, historia, contexto o preferencia que no hayamos cubierto.",
          },
        ],
      },
    ],
  },
  {
    id: "social",
    title: "Social Media",
    icon: "📱",
    color: C.pinkSoft,
    description: "Brief para gestión mensual de redes sociales — Spark y Blaze",
    intro: "Este formulario nos da todo lo que necesitamos para empezar a crear contenido que represente tu marca y conecte con tu audiencia. Responde con la mayor claridad posible.",
    sections: [
      {
        title: "Tu marca en redes",
        description: "Entender dónde estás hoy para saber hacia dónde vamos.",
        fields: [
          {
            label: "¿Cuál es el Instagram de tu proyecto?",
            type: "Respuesta corta",
            required: true,
            hint: "Incluye el @. Si también tienes Facebook, TikTok u otra red, inclúyelos.",
          },
          {
            label: "¿Quién maneja tus redes actualmente?",
            type: "Selección múltiple",
            required: true,
            options: ["Yo mismo/a", "Alguien de mi equipo", "Otra agencia o freelancer", "Nadie — están inactivas"],
          },
          {
            label: "¿Qué es lo que más te frustra de tus redes hoy?",
            type: "Párrafo",
            required: true,
            hint: "Ejemplo: 'No tengo tiempo', 'No sé qué publicar', 'Publico pero no veo resultados', 'Se ven poco profesionales.'",
          },
          {
            label: "¿Qué te gustaría lograr con tus redes en los próximos 3 meses?",
            type: "Párrafo",
            required: true,
            hint: "Sé específico. ¿Más seguidores? ¿Más consultas? ¿Posicionar tu marca? ¿Vender un producto?",
          },
        ],
      },
      {
        title: "Contenido y estilo",
        description: "Para crear contenido que se sienta tuyo, necesitamos entender tu voz.",
        fields: [
          {
            label: "¿Cómo le hablas a tus clientes? ¿De tú o de usted?",
            type: "Selección múltiple",
            required: true,
            options: ["De tú — cercano y casual", "De usted — profesional y formal", "Depende del contexto"],
          },
          {
            label: "¿Hay temas que siempre quieres cubrir en tu contenido?",
            type: "Párrafo",
            required: true,
            hint: "Ejemplo: 'Tips de mi industria, testimonios de clientes, detrás de cámaras, mis productos.'",
          },
          {
            label: "¿Hay temas que NUNCA quieres tocar en redes?",
            type: "Párrafo",
            required: false,
            hint: "Ejemplo: 'Política', 'Precios públicos', 'Mi vida personal.'",
          },
          {
            label: "Comparte 3-5 cuentas cuyo contenido te guste (no tienen que ser de tu industria).",
            type: "Párrafo",
            required: true,
            hint: "Dinos qué te gusta de cada una: ¿el estilo visual? ¿El tono? ¿El tipo de contenido?",
          },
          {
            label: "¿Prefieres un estilo visual más limpio y minimalista, o más colorido y expresivo?",
            type: "Selección múltiple",
            required: true,
            options: ["Limpio y minimalista", "Colorido y expresivo", "Algo intermedio", "No tengo preferencia — confío en ustedes"],
          },
        ],
      },
      {
        title: "Productos, servicios y fechas clave",
        description: "Lo que necesitamos saber para planificar tu contenido mensual.",
        fields: [
          {
            label: "¿Cuáles son tus productos o servicios principales que debemos comunicar?",
            type: "Párrafo",
            required: true,
            hint: "Lista los más importantes. Si tienes muchos, prioriza los top 3-5.",
          },
          {
            label: "¿Tienes promociones, lanzamientos o eventos próximos?",
            type: "Párrafo",
            required: false,
            hint: "Incluye fechas si las tienes. Esto nos ayuda a planificar el calendario.",
          },
          {
            label: "¿Hay fechas especiales importantes para tu negocio? (festividades, aniversarios, temporadas altas)",
            type: "Párrafo",
            required: false,
          },
        ],
      },
      {
        title: "Accesos y materiales",
        description: "Lo que necesitamos para empezar a trabajar técnicamente.",
        fields: [
          {
            label: "¿Tienes acceso a Meta Business Suite?",
            type: "Selección múltiple",
            required: true,
            options: ["Sí, lo tengo configurado", "No estoy seguro/a", "No, necesito ayuda con eso"],
          },
          {
            label: "¿Tienes fotos o videos profesionales de tu negocio, productos o equipo?",
            type: "Selección múltiple",
            required: true,
            options: ["Sí, tengo material profesional", "Tengo fotos/videos pero no profesionales", "No tengo nada — empezamos desde cero"],
          },
          {
            label: "¿Tienes logo y elementos de marca definidos? (colores, tipografía)",
            type: "Selección múltiple",
            required: true,
            options: ["Sí, tengo brand guidelines o al menos logo y colores", "Tengo un logo pero nada más", "No tengo nada definido"],
          },
          {
            label: "¿Estás abierto/a a aparecer en cámara para contenido (Reels, Stories)?",
            type: "Selección múltiple",
            required: true,
            options: ["Sí, sin problema", "Me da algo de nervios pero estoy dispuesto/a", "Prefiero no aparecer", "Depende del formato"],
          },
        ],
      },
      {
        title: "Content day y logística",
        description: "Los días de contenido son clave para producir material de calidad.",
        fields: [
          {
            label: "¿Tienes un espacio (local, oficina, tienda) donde podamos grabar?",
            type: "Selección múltiple",
            required: true,
            options: ["Sí, tengo un espacio propio", "No, trabajo desde casa o no tengo local", "Tengo espacio pero no sé si funciona para grabar"],
          },
          {
            label: "¿Qué días y horarios te funcionan mejor para un content day?",
            type: "Párrafo",
            required: true,
            hint: "Spark incluye medio día (4 horas). Blaze incluye día completo (8 horas).",
          },
          {
            label: "¿Hay alguien más de tu equipo que deba participar en el content day?",
            type: "Párrafo",
            required: false,
          },
        ],
      },
      {
        title: "Aprobaciones y comunicación",
        description: "Para que el flujo mensual funcione sin fricciones.",
        fields: [
          {
            label: "¿Quién aprueba el contenido antes de publicarlo?",
            type: "Selección múltiple",
            required: true,
            options: ["Solo yo", "Yo y alguien más de mi equipo", "Otra persona de mi empresa"],
          },
          {
            label: "¿Cuánto tiempo necesitas para revisar y aprobar el contenido del mes?",
            type: "Selección múltiple",
            required: true,
            options: ["24 horas me sobran", "2-3 días", "Necesito más tiempo — suelo estar ocupado/a"],
          },
          {
            label: "¿Por qué canal prefieres que te enviemos el contenido para aprobación?",
            type: "Selección múltiple",
            required: true,
            options: ["WhatsApp", "Email", "Me da igual"],
          },
          {
            label: "¿Hay algo más que debamos saber antes de empezar?",
            type: "Párrafo",
            required: false,
          },
        ],
      },
    ],
  },
  {
    id: "films",
    title: "Lumma Films",
    icon: "🎬",
    color: C.amber,
    description: "Brief para proyectos audiovisuales — Brand Film, Content Day, Testimonials, Events",
    intro: "Cada proyecto audiovisual empieza con claridad. Este formulario nos ayuda a entender qué quieres lograr con tu video, para quién es y cómo lo vamos a producir. Tómate tu tiempo para responder.",
    sections: [
      {
        title: "El proyecto",
        description: "Lo esencial: qué es, para qué y para quién.",
        fields: [
          {
            label: "¿Qué tipo de video necesitas?",
            type: "Selección múltiple",
            required: true,
            options: ["Brand Film (video de marca/institucional)", "Content Day (producción de contenido para redes)", "Showcase de producto o servicio", "Testimonial cinematográfico", "Cobertura de evento", "No estoy seguro/a — necesito orientación"],
          },
          {
            label: "¿Cuál es el objetivo principal de este video?",
            type: "Párrafo",
            required: true,
            hint: "Ejemplo: 'Presentar mi marca a nuevos clientes', 'Mostrar cómo funciona mi servicio', 'Capturar un evento importante', 'Generar contenido para 2 meses de redes.'",
          },
          {
            label: "¿Dónde se va a publicar o usar este video?",
            type: "Casillas de verificación",
            required: true,
            options: ["Instagram (Reels / Feed)", "Facebook", "TikTok", "YouTube", "Sitio web", "Presentaciones o pitch", "Pantallas en evento o local", "Otro"],
          },
          {
            label: "¿Quién es la audiencia de este video?",
            type: "Párrafo",
            required: true,
            hint: "¿Clientes actuales? ¿Clientes potenciales? ¿Inversionistas? ¿El público general?",
          },
          {
            label: "¿Cuál es el mensaje central que quieres comunicar?",
            type: "Párrafo",
            required: true,
            hint: "Si alguien ve tu video y solo recuerda una cosa, ¿qué quieres que sea?",
          },
        ],
      },
      {
        title: "Tono y estilo",
        description: "Cómo quieres que se sienta y se vea tu video.",
        fields: [
          {
            label: "¿Qué tono quieres para el video?",
            type: "Casillas de verificación",
            required: true,
            options: ["Profesional y corporativo", "Cercano y humano", "Inspiracional / emotivo", "Dinámico y energético", "Premium / de lujo", "Informativo y directo"],
          },
          {
            label: "Comparte 2-3 videos de referencia que te gusten (links de YouTube, Instagram o Vimeo).",
            type: "Párrafo",
            required: true,
            hint: "Dinos qué te gusta de cada uno: ¿la música? ¿El ritmo? ¿Los colores? ¿La narrativa?",
          },
          {
            label: "¿Hay un estilo visual que te atraiga?",
            type: "Selección múltiple",
            required: false,
            options: ["Cinematográfico y con profundidad de campo", "Limpio y moderno", "Raw / orgánico / documental", "Colorido y vibrante", "No tengo preferencia — confío en ustedes"],
          },
          {
            label: "¿Tienes preferencia de música o sonido?",
            type: "Párrafo",
            required: false,
            hint: "Ejemplo: 'Algo tipo lo-fi relajado', 'Música latina con energía', 'Instrumental elegante', 'Solo voces y sonido ambiente.'",
          },
        ],
      },
      {
        title: "Talento y locación",
        description: "Quién aparece y dónde filmamos.",
        fields: [
          {
            label: "¿Quién va a aparecer en el video?",
            type: "Casillas de verificación",
            required: true,
            options: ["Yo (dueño/a del negocio)", "Empleados o equipo", "Clientes (para testimoniales)", "Modelos o talento externo", "Nadie — solo producto/espacio", "No estoy seguro/a"],
          },
          {
            label: "¿Las personas que aparecen se sienten cómodas frente a cámara?",
            type: "Selección múltiple",
            required: true,
            options: ["Sí, tienen experiencia o se sienten cómodos", "Algo de nervios pero están dispuestos", "Nunca han estado frente a cámara"],
          },
          {
            label: "¿Dónde quieres filmar?",
            type: "Casillas de verificación",
            required: true,
            options: ["Mi local / oficina / tienda", "En exteriores (locación específica)", "En un estudio", "Varias locaciones", "No tengo locación — necesito ayuda con eso"],
          },
          {
            label: "Si tienes una locación, descríbela brevemente.",
            type: "Párrafo",
            required: false,
            hint: "Tamaño, iluminación natural, acceso, estacionamiento, ruido ambiental — todo nos ayuda para la planeación.",
          },
        ],
      },
      {
        title: "Logística y timeline",
        description: "Los detalles prácticos para planificar la producción.",
        fields: [
          {
            label: "¿Tienes una fecha límite para tener el video listo?",
            type: "Respuesta corta",
            required: true,
            hint: "Si es para un evento o lanzamiento, dinos la fecha exacta.",
          },
          {
            label: "¿Cuántos videos o piezas necesitas como entregable final?",
            type: "Párrafo",
            required: true,
            hint: "Ejemplo: '1 video largo (2-3 min) + 3 cortes para redes', '20 piezas de contenido para redes', '1 video de 60 segundos.'",
          },
          {
            label: "¿Qué días y horarios te funcionan para la filmación?",
            type: "Párrafo",
            required: true,
          },
          {
            label: "¿Tienes material existente que podamos usar? (fotos, videos anteriores, assets de marca)",
            type: "Selección múltiple",
            required: true,
            options: ["Sí, tengo material que puedo compartir", "Tengo algo pero no sé si sirve", "No, todo se produce desde cero"],
          },
          {
            label: "¿Necesitas que el video tenga texto en pantalla, subtítulos o gráficos?",
            type: "Selección múltiple",
            required: true,
            options: ["Sí, subtítulos (el contenido tiene diálogo)", "Sí, texto/gráficos animados", "No, solo video y música", "No estoy seguro/a"],
          },
        ],
      },
      {
        title: "Contexto adicional",
        description: "Todo lo que nos ayude a hacer un mejor trabajo.",
        fields: [
          {
            label: "¿Has trabajado con un equipo audiovisual antes?",
            type: "Selección múltiple",
            required: false,
            options: ["Sí, tengo experiencia", "Es mi primera vez", "He hecho cosas pequeñas por mi cuenta"],
          },
          {
            label: "¿Hay algo que te preocupe o que quieras evitar en este proyecto?",
            type: "Párrafo",
            required: false,
          },
          {
            label: "¿Hay algo más que debamos saber?",
            type: "Párrafo",
            required: false,
            hint: "Cualquier detalle, historia o contexto que no hayamos cubierto.",
          },
        ],
      },
    ],
  },
];

function FieldTypeTag({ type }) {
  const colors = {
    "Respuesta corta": C.green,
    "Párrafo": C.green,
    "Selección múltiple": C.pinkSoft,
    "Casillas de verificación": C.amber,
  };
  const col = colors[type] || C.dim;
  return (
    <span
      className="px-1.5 py-0.5 rounded"
      style={{ fontSize: 8, color: col, backgroundColor: col + "12", border: `1px solid ${col}20`, fontWeight: 600 }}
    >
      {type}
    </span>
  );
}

function FieldCard({ field, index }) {
  const [expanded, setExpanded] = useState(false);
  const hasOptions = field.options && field.options.length > 0;
  const hasExtra = field.hint || hasOptions;

  return (
    <div className="mb-2">
      <div
        onClick={() => hasExtra && setExpanded(!expanded)}
        className="rounded-xl px-3.5 py-3 transition-all duration-200"
        style={{
          backgroundColor: C.card,
          border: `1px solid ${C.dimmer}`,
          cursor: hasExtra ? "pointer" : "default",
          boxShadow: expanded ? `0 0 15px ${C.green}08` : "none",
        }}
      >
        <div className="flex items-start gap-2.5">
          <span className="font-mono flex-shrink-0 mt-0.5" style={{ fontSize: 9, color: C.dim }}>
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <p style={{ fontSize: 11, color: C.white, fontWeight: 600, lineHeight: 1.4, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {field.label}
                {field.required && <span style={{ color: C.pink, marginLeft: 3 }}>*</span>}
              </p>
              {hasExtra && (
                <span style={{ fontSize: 8, color: C.dim, flexShrink: 0, marginTop: 2 }}>
                  {expanded ? "▲" : "▼"}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <FieldTypeTag type={field.type} />
              {field.required && (
                <span style={{ fontSize: 8, color: C.pink, fontWeight: 500 }}>Obligatorio</span>
              )}
            </div>

            {expanded && (
              <div className="mt-2.5 animate-fadeIn">
                {field.hint && (
                  <p className="mb-2 px-2.5 py-2 rounded-lg" style={{ fontSize: 9, color: C.textLight, backgroundColor: C.warm, lineHeight: 1.5, fontStyle: "italic" }}>
                    💡 {field.hint}
                  </p>
                )}
                {hasOptions && (
                  <div className="space-y-1">
                    {field.options.map((opt, i) => (
                      <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded-lg" style={{ backgroundColor: C.surface }}>
                        <div
                          className="flex-shrink-0"
                          style={{
                            width: 12,
                            height: 12,
                            borderRadius: field.type === "Casillas de verificación" ? 2 : "50%",
                            border: `1.5px solid ${C.dim}`,
                          }}
                        />
                        <span style={{ fontSize: 9, color: C.textLight }}>{opt}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function BriefSection({ section, sectionIndex }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2.5 mb-2">
        <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ backgroundColor: C.green + "10", border: `1px solid ${C.green}20` }}>
          <span className="font-mono font-bold" style={{ fontSize: 9, color: C.green }}>{String(sectionIndex + 1).padStart(2, "0")}</span>
        </div>
        <div>
          <h3 className="font-bold" style={{ fontSize: 13, color: C.white, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {section.title}
          </h3>
          <p style={{ fontSize: 9, color: C.dim }}>{section.description}</p>
        </div>
      </div>
      <div className="ml-3 pl-3" style={{ borderLeft: `1px solid ${C.dimmer}` }}>
        {section.fields.map((field, i) => (
          <FieldCard key={i} field={field} index={i} />
        ))}
      </div>
    </div>
  );
}

function BriefStats({ brief }) {
  const totalFields = brief.sections.reduce((acc, s) => acc + s.fields.length, 0);
  const requiredFields = brief.sections.reduce((acc, s) => acc + s.fields.filter(f => f.required).length, 0);
  const types = {};
  brief.sections.forEach(s => s.fields.forEach(f => { types[f.type] = (types[f.type] || 0) + 1; }));

  return (
    <div className="grid grid-cols-3 gap-2 mb-6">
      <div className="px-3 py-2.5 rounded-lg text-center" style={{ backgroundColor: C.surface }}>
        <p className="font-bold" style={{ fontSize: 18, color: C.green }}>{totalFields}</p>
        <p style={{ fontSize: 8, color: C.dim }}>Preguntas total</p>
      </div>
      <div className="px-3 py-2.5 rounded-lg text-center" style={{ backgroundColor: C.surface }}>
        <p className="font-bold" style={{ fontSize: 18, color: C.pink }}>{requiredFields}</p>
        <p style={{ fontSize: 8, color: C.dim }}>Obligatorias</p>
      </div>
      <div className="px-3 py-2.5 rounded-lg text-center" style={{ backgroundColor: C.surface }}>
        <p className="font-bold" style={{ fontSize: 18, color: C.white }}>{brief.sections.length}</p>
        <p style={{ fontSize: 8, color: C.dim }}>Secciones</p>
      </div>
    </div>
  );
}

export default function LummaBriefs() {
  const [activeBrief, setActiveBrief] = useState(0);
  const brief = briefs[activeBrief];

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
              Briefs{" "}
              <span style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontWeight: 400, color: C.green }}>
                creativos
              </span>
            </h1>
            <p className="mt-2" style={{ fontSize: 11, color: C.gray }}>
              Referencia completa para Google Forms · Onboarding de clientes
            </p>
          </div>

          {/* Brief selector */}
          <div className="flex gap-1.5 p-1.5 rounded-xl mb-6" style={{ backgroundColor: C.surface }}>
            {briefs.map((b, i) => (
              <button
                key={b.id}
                onClick={() => setActiveBrief(i)}
                className="flex-1 py-2.5 rounded-lg text-xs font-medium transition-all flex items-center justify-center gap-1.5"
                style={{
                  backgroundColor: activeBrief === i ? b.color + "15" : "transparent",
                  color: activeBrief === i ? b.color : C.dim,
                  border: activeBrief === i ? `1px solid ${b.color}30` : "1px solid transparent",
                }}
              >
                <span>{b.icon}</span>
                <span>{b.title}</span>
              </button>
            ))}
          </div>

          {/* Brief header */}
          <div className="rounded-xl px-4 py-4 mb-4" style={{ backgroundColor: C.surface, borderLeft: `3px solid ${brief.color}` }}>
            <p className="font-bold mb-1" style={{ fontSize: 14, color: C.white }}>
              Brief de {brief.title}
            </p>
            <p style={{ fontSize: 10, color: C.gray }}>{brief.description}</p>
          </div>

          {/* Stats */}
          <BriefStats brief={brief} />

          {/* Intro message */}
          <div className="rounded-xl px-4 py-3 mb-6" style={{ backgroundColor: C.warm, border: `1px solid ${C.dimmer}` }}>
            <p className="text-xs font-bold mb-1" style={{ color: C.green }}>MENSAJE INTRODUCTORIO DEL FORM</p>
            <p style={{ fontSize: 10, color: C.textLight, lineHeight: 1.5, fontStyle: "italic" }}>
              "{brief.intro}"
            </p>
          </div>

          {/* Sections */}
          {brief.sections.map((section, i) => (
            <BriefSection key={`${brief.id}-${i}`} section={section} sectionIndex={i} />
          ))}

          {/* Google Forms tips */}
          <div className="mt-6 rounded-xl px-4 py-4" style={{ backgroundColor: C.surface, border: `1px solid ${C.dimmer}` }}>
            <p className="text-xs font-bold mb-3" style={{ color: C.green, letterSpacing: 1 }}>
              TIPS PARA GOOGLE FORMS
            </p>
            <div className="space-y-2">
              {[
                "Usa secciones (páginas) para que no se sienta largo — una sección del brief por página del form",
                "Activa 'Recopilar direcciones de email' para tener registro automático",
                "Configura notificaciones por email para recibir alerta cuando alguien complete el form",
                "Vincula las respuestas a Google Sheets para tener todo centralizado",
                "Personaliza el header del form con los colores de Lumma (#080808 fondo, #CCFF00 acento)",
                "Agrega la descripción introductoria en la primera página del form",
                "Marca las preguntas obligatorias (*) para que el cliente no se salte lo esencial",
              ].map((tip, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span style={{ fontSize: 8, color: C.green, marginTop: 2 }}>•</span>
                  <p style={{ fontSize: 10, color: C.textLight, lineHeight: 1.4 }}>{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Field type legend */}
          <div className="mt-4 rounded-xl px-4 py-4" style={{ backgroundColor: C.surface, border: `1px solid ${C.dimmer}` }}>
            <p className="text-xs font-bold mb-3" style={{ color: C.pinkSoft, letterSpacing: 1 }}>
              TIPOS DE CAMPO EN GOOGLE FORMS
            </p>
            <div className="space-y-2">
              {[
                { type: "Respuesta corta", desc: "Una línea de texto. Para nombres, handles, datos puntuales" },
                { type: "Párrafo", desc: "Texto largo. Para descripciones, contexto, referencias" },
                { type: "Selección múltiple", desc: "El cliente elige UNA opción. Para preguntas con respuesta única" },
                { type: "Casillas de verificación", desc: "El cliente puede elegir VARIAS opciones. Para preguntas donde aplican múltiples respuestas" },
              ].map((item) => (
                <div key={item.type} className="flex items-start gap-2.5">
                  <FieldTypeTag type={item.type} />
                  <p style={{ fontSize: 9, color: C.gray, lineHeight: 1.4 }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 mb-4 text-center">
            <p style={{ fontSize: 9, color: C.dim, letterSpacing: 2 }}>LUMMA · OPERACIONES · BRIEFS · V1.0</p>
          </div>
        </div>
      </div>
    </>
  );
}
