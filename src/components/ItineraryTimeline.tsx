"use client";

import { useState, useEffect } from "react";
import { Music, MapPin, Calendar, Clock, Utensils, CheckCircle } from "lucide-react";

interface TimelineDay {
    id: number;
    date: string;
    dayName: string;
    title: string;
    desc: string;
    events: {
        time?: string;
        title: string;
        description: string;
        type: "visit" | "concert" | "meal" | "transport";
        venue?: string;
    }[];
}

const ITIN_DATA: TimelineDay[] = [
    {
        id: 1,
        date: "2 Nov",
        dayName: "Lunes, 2 de noviembre de 2026",
        title: "Llegada a Barcelona, traslado al hotel Petit Palace Boquería Garden y ópera en el Gran Teatre del Liceu",
        desc: "",
        events: [
            {
                time: "11:45 h",
                title: "Encuentro en Madrid Atocha",
                description: "Punto de encuentro en la Estación Puerta de Atocha de Madrid para tomar el tren IRYO (Clase Infinita Bistró).",
                type: "transport",
                venue: "Estación de Puerta de Atocha, Madrid",
            },
            {
                time: "12:22 h",
                title: "Salida del Tren IRYO",
                description: "Viaje en alta velocidad a Barcelona (pequeño menú incluido a bordo)",
                type: "transport",
            },
            {
                time: "15:39 h",
                title: "Llegada a Barcelona-Sants y Traslado",
                description: "Traslado al hotel Petit Palace Boquería Garden 4*.",
                type: "visit",
                venue: "Estación Barcelona-Sants / Hotel",
            },
            {
                time: "19:00 h",
                title: "Gran Teatre del Liceu",
                description: "Traslado a pie al emblemático teatro de ópera de Barcelona en Las Ramblas.",
                type: "transport",
                venue: "Gran Teatre del Liceu",
            },
            {
                time: "19:30 h",
                title: "Ópera: 'I Capuleti e i Montecchi'",
                description: "Asistencia al drama lírico de V. Bellini, en una producción de Allex Aguilera, con Lisette Oropesa y Rafaella Lupinacci. Orquesta Sinfónica del Gran Teatre del Liceu dirigida por Riccardo Frizza.",
                type: "concert",
                venue: "Gran Teatre del Liceu",
            },
        ],
    },
    {
        id: 2,
        date: "3 Nov",
        dayName: "Martes, 3 de noviembre de 2026",
        title: "Día dedicado al arquitecto Lluís Domènech i Montaner. Monográfico de D. Shostakovich a cargo del Quartet Gerhard.",
        desc: "",
        events: [
            {
                time: "10:00 h",
                title: "Visita al Recinto Modernista de Sant Pau",
                description: "Recorrido guiado por el mayor conjunto modernista del mundo, diseñado por Lluís Domènech i Montaner.",
                type: "visit",
                venue: "Recinto Modernista de Sant Pau",
            },
            {
                time: "12:30 h",
                title: "Palau de la Música Catalana",
                description: "Visita guiada a la emblemática sala de conciertos, sede del Orfeó Catalá.",
                type: "visit",
                venue: "Palau de la Música Catalana",
            },
            {
                time: "13:30 h",
                title: "Almuerzo en Restaurante El Cercle",
                description: "Almuerzo en un magnífico espacio rodeado de arte y cultura en el centro de Barcelona.",
                type: "meal",
                venue: "Restaurant El Cercle",
            },
            {
                time: "19:00 h",
                title: "Regreso al Palau de la Música",
                description: "Acceso a la sala de cámara (Petit Palau)",
                type: "transport",
            },
            {
                time: "19:30 h",
                title: "Recital: Quartet Gerhard",
                description: "Monográfico de D. Shostakovich a cargo del destacado cuarteto catalán, quienes interpretarán los cuartetos núm. 5, 7 y 8 del compositor ruso.",
                type: "concert",
                venue: "Petit Palau",
            },
        ],
    },
    {
        id: 3,
        date: "4 Nov",
        dayName: "Miércoles, 4 de noviembre de 2026",
        title: "Casa Amatller, Casa Vicens y Réquiem de Verdi",
        desc: "",
        events: [
            {
                time: "10:00 h",
                title: "Visita a la Casa Museo Amatller",
                description: "Visita privada a la Casa Amatller. Situada en pleno Paseo de Gràçia, y perteneciente a la familia de chocolateros Amatller, fue remodelada por el arquitecto Josep Puig i Cadafalch.",
                type: "visit",
                venue: "Casa Museo Amatller",
            },
            {
                time: "12:30 h",
                title: "Visita a Casa Vicens",
                description: "Primera obra maestra residencial de Antoni Gaudí, declarada Patrimonio de la Humanidad por la UNESCO (2005)",
                type: "visit",
                venue: "Casa Vicens",
            },
            {
                time: "14:30 h",
                title: "Almuerzo en Lincoln 32 Restaurant",
                description: "Cocina creativa y tradicional en el cálido espacio gastronómico del Lincoln 32.",
                type: "meal",
                venue: "Lincoln 32 Restaurant",
            },
            {
                time: "19:00 h",
                title: "Traslado al Gran Teatre del Liceu",
                description: "De nuevo traslado a pie al Gran Teatre del Liceu.",
                type: "transport",
            },
            {
                time: "19:30 h",
                title: "Messa da Réquiem de Giuseppe Verdi",
                description: "Interpretación del Réquiem de Verdi a cargo de la Orquesta y Coro del Gran Teatre del Liceu, dirigidos por Nicola Luisotti.\n\nLise Davidsen, soprano\nAigul Akhmetshina, mezzosoprano\nFreddie de Tomasso, tenor\nChristian Van Horn, bajo",
                type: "concert",
                venue: "Gran Teatre del Liceu",
            },
        ],
    },
    {
        id: 4,
        date: "5 Nov",
        dayName: "Jueves, 5 de noviembre de 2026",
        title: "El esplendor de Antoni Gaudí. 100 años del Concerto para clave y cinco instrumentos (M. de Falla)",
        desc: "",
        events: [
            {
                time: "10:00 h",
                title: "Visita al Park Güell",
                description: "Paseo matinal guiado entre naturaleza y la arquitectura de A. Gaudí.",
                type: "visit",
                venue: "Park Güell",
            },
            {
                time: "12:00 h",
                title: "Basílica de la Sagrada Familia",
                description: "Visita guiada al interior y detalles de la gran obra inacabada e inspiradora del maestro catalán.",
                type: "visit",
                venue: "Sagrada Familia",
            },
            {
                time: "14:30 h",
                title: "Almuerzo en el Palace Barcelona",
                description: "Almuerzo gourmet en el majestuoso Hall de este hotel histórico, residencia durante un tiempo de Salvador Dalí.",
                type: "meal",
                venue: "Hotel El Palace Barcelona",
            },
            {
                time: "19:15 h",
                title: "Acceso al Palau de la Música Catalana",
                description: "Entrada para el concierto en la sala principal modernista.",
                type: "transport",
            },
            {
                time: "20:00 h",
                title: "Recital.",
                description: "100 años del estreno en esta misma sala del 'Concerto para clave y cinco instrumentos' de M. de Falla, junto a obras de J. S. Bach, J. M. Sánchez-Verdú o D. Scarlatti, entre otros.\n\nBenjamin Alard (clave/dirección)",
                type: "concert",
                venue: "Palau de la Música Catalana",
            },
        ],
    },
    {
        id: 5,
        date: "6 Nov",
        dayName: "Viernes, 6 de noviembre de 2026",
        title: "Museo de la Música, Casa Batlló y La Atlántida de M. de Falla.",
        desc: "",
        events: [
            {
                time: "10:00 h",
                title: "Museo de la Música de Barcelona",
                description: "Visita guiada a la fantástica colección de instrumentos y patrimonio musical de Barcelona.",
                type: "visit",
                venue: "Museo de la Música (L'Auditori)",
            },
            {
                time: "12:00 h",
                title: "Visita a Casa Batlló",
                description: "Descubrimiento interactivo y único de la poética fachada y los salones ondulados de Gaudí.",
                type: "visit",
                venue: "Casa Batlló",
            },
            {
                time: "13:30 h",
                title: "Almuerzo en Restaurante Gaudim",
                description: "Restaurante especializado en cocina catalana, en el corazón del Eixample.",
                type: "meal",
                venue: "Restaurante Gaudim",
            },
            {
                time: "18:15 h",
                title: "Regreso a L'Auditori",
                description: "Traslado a la gran gala sinfónica Pau Casals de L'Auditori.",
                type: "transport",
                venue: "L'Auditori",
            },
            {
                time: "19:00 h",
                title: "Gran Concierto: 'Atlántida' de Falla",
                description: "Asistencia al concierto de la Orquesta y Coro Nacionales de España, bajo la dirección de Kent Nagano, con obras de C. Debussy y la cantata escénica póstuma 'Atlántida' de M. de Falla/E. Halffter,",
                type: "concert",
                venue: "L'Auditori (Sala 1 Pau Casals)",
            },
        ],
    },
    {
        id: 6,
        date: "7 Nov",
        dayName: "Sábado, 7 de noviembre de 2026",
        title: "La Barcelona de Pablo Picasso. Un recorrido que sigue los pasos del artista más influyente del siglo XX. Viaje de vuelta a Madrid.",
        desc: "",
        events: [
            {
                time: "10:45 h",
                title: "La Barcelona de Pablo Picasso",
                description: "Visita temática por los rincones que inspiraron la obra del pintor malagueño y acceso al Museo Picasso de Barcelona.",
                type: "visit",
                venue: "Museo Picasso Barcelona",
            },
            {
                time: "14:30 h",
                title: "Almuerzo en Cadaqués Restaurante",
                description: "Comida de despedida y sabor mediterráneo frente a los fogones arroceros tradicionales.",
                type: "meal",
                venue: "Cadaqués Restaurante",
            },
            {
                time: "17:45 h",
                title: "Traslado a la Estación Sants para coger el tren de vuelta a Madrid",
                description: "",
                type: "transport",
            },
            {
                time: "18:53 h",
                title: "Tren de retorno IRYO a Madrid",
                description: "Regreso en tren Iryo, clase Infinita. Llegada a la Estación Puerta de Atocha-Almudena Grandes de Madrid a las 22:10 h. Fin de nuestros servicios.",
                type: "transport",
                venue: "Tren IRYO / Estación Puerta de Atocha - Almudena Grandes.",
            },
        ],
    },
];

interface ItineraryTimelineProps {
    videosExist: {
        "itinerario-1": boolean;
        "itinerario-2": boolean;
        "itinerario-3": boolean;
        "itinerario-4": boolean;
        "itinerario-5": boolean;
        "itinerario-6": boolean;
        resumen: boolean;
    };
}

const DAY_THUMBNAILS: { [key: number]: { src: string; caption: string } } = {
    1: {
        src: "https://images.unsplash.com/photo-1583422409516-2895a77efedd?q=80&w=800&auto=format&fit=crop",
        caption: "Gran Teatre del Liceu en La Rambla, Barcelona - Llegada y Ópera"
    },
    2: {
        src: "https://images.unsplash.com/photo-1620843245451-b0db36605e55?q=80&w=800&auto=format&fit=crop",
        caption: "Recinto Modernista de Sant Pau y Palau de la Música Catalana"
    },
    3: {
        src: "https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=800&auto=format&fit=crop",
        caption: "Detalles modernistas de la Casa Vicens y Fachada de la Casa Amatller"
    },
    4: {
        src: "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?q=80&w=800&auto=format&fit=crop",
        caption: "Basílica de la Sagrada Familia y Mosaicos Ondulados del Park Güell"
    },
    5: {
        src: "https://images.unsplash.com/photo-1612222869069-a1716b5a267d?q=80&w=800&auto=format&fit=crop",
        caption: "Museu de la Música de Barcelona, Spain"
    },
    6: {
        src: "https://images.unsplash.com/photo-1587334206574-35113a8d75e9?q=80&w=800&auto=format&fit=crop",
        caption: "Calles del Born e historia de Pablo Picasso en Barcelona"
    }
};

const DAY_OVERLAY_DETAILS: { [key: number]: { title: string; category: string; description: string; date: string } } = {
    1: {
        title: "I Capuleti e i Montecchi de Bellini",
        category: "ÓPERA DESTACADA EN EL LICEU",
        description: "Regreso lírico y alojamiento en el Petit Palace Boquería",
        date: "02 Nov 2026"
    },
    2: {
        title: "Recinto Sant Pau & Petit Palau",
        category: "CÁMARA Y MODERNISMO PATRIMONIO",
        description: "Visitas guiadas exclusivas y concierto de Quartet Gerhard",
        date: "03 Nov 2026"
    },
    3: {
        title: "Gaudí, Amatller y Réquiem de Verdi",
        category: "ARQUITECTURA Y MÚSICA MONUMENTAL",
        description: "Casa Vicens, Casa Amatller y gran concierto sinfónico",
        date: "04 Nov 2026"
    },
    4: {
        title: "La Sagrada Familia & Falla de Cámara",
        category: "SUEÑOS ACÚSTICOS DE GAUDÍ Y FALLA",
        description: "Park Güell, Sagrada Familia y concierto de Benjamin Alard",
        date: "05 Nov 2026"
    },
    5: {
        title: "Museo de la Música & Atlántida de Falla",
        category: "GALA SINFÓNICA EN L'AUDITORI",
        description: "Colecciones históricas de música y póstuma cantata de Falla",
        date: "06 Nov 2026"
    },
    6: {
        title: "La Huella de Picasso",
        category: "HISTORIA Y ENLACE DE PICASSO",
        description: "Paseo por el Born, visita al Museo Picasso y retorno a Madrid",
        date: "07 Nov 2026"
    }
};

const ITINERARY_VIDEOS: { [key: number]: { title: string; filePath: string; youtubeUrl?: string }[] } = {
    1: [
        { title: "Petit Palace Boqueria", filePath: "/videos_itinerario/dia0/boqueria.mp4", youtubeUrl: "https://www.youtube.com/watch?v=2DRwht0fJlE" },
        { title: "Gran Teatre del Liceu", filePath: "/videos_itinerario/dia0/liceu.mp4", youtubeUrl: "https://www.youtube.com/watch?v=_1Y_PqlKFvI" }
    ],
    2: [
        { title: "Sant Pau Recinto Modernista", filePath: "/videos_itinerario/dia1/sant_pau.mp4", youtubeUrl: "https://www.youtube.com/watch?v=bh4FY93-kwQ" },
        { title: "Palau de la Música", filePath: "/videos_itinerario/dia1/palau_musica.mp4", youtubeUrl: "https://www.youtube.com/watch?v=A54hDZgGmu8" },
        { title: "Restaurant El Cercle", filePath: "/videos_itinerario/dia1/el_cercle.mp4", youtubeUrl: "https://www.youtube.com/watch?v=4IuennVEXpM" },
        { title: "Assaig Cor de Cambra", filePath: "/videos_itinerario/dia1/cor_cambra.mp4", youtubeUrl: "https://www.youtube.com/watch?v=x4TghuDMzso" },
        { title: "Quartet Gerhard", filePath: "/videos_itinerario/dia1/quartet_gerhard.mp4", youtubeUrl: "https://www.youtube.com/watch?v=AWznQ3Qqreg" }
    ],
    3: [
        { title: "Casa Museo Amatller", filePath: "/videos_itinerario/dia2/casa_amatller.mp4", youtubeUrl: "https://www.youtube.com/watch?v=sMsZoDJFMyQ" },
        { title: "Casa Vicens", filePath: "/videos_itinerario/dia2/casa_vicens.mp4", youtubeUrl: "https://www.youtube.com/watch?v=uDbaD1wMnBU" },
        { title: "Lincoln 32", filePath: "/videos_itinerario/dia2/lincoln32.mp4", youtubeUrl: "https://www.youtube.com/watch?v=CF7oHF99GJQ" },
        { title: "Réquiem de Verdi", filePath: "/videos_itinerario/dia2/requiem_verdi.mp4", youtubeUrl: "https://www.youtube.com/watch?v=T81AYBkoovE" }
    ],
    4: [
        { title: "Park Güell", filePath: "/videos_itinerario/dia3/park_guell.mp4", youtubeUrl: "https://www.youtube.com/watch?v=21RL4WmtmbI" },
        { title: "Sagrada Familia", filePath: "/videos_itinerario/dia3/sagrada_familia.mp4", youtubeUrl: "https://www.youtube.com/watch?v=LriWSHbSHog" },
        { title: "El Palace Barcelona", filePath: "/videos_itinerario/dia3/el_palace.mp4", youtubeUrl: "https://www.youtube.com/watch?v=4QfIht6Lxcg" },
        { title: "Palau de la Música", filePath: "/videos_itinerario/dia3/palau_concierto.mp4", youtubeUrl: "https://www.youtube.com/watch?v=oNeLRaEbBuE" }
    ],
    5: [
        { title: "Museo de la Música", filePath: "/videos_itinerario/dia4/museo_musica.mp4", youtubeUrl: "https://www.youtube.com/watch?v=lRGoiNF9QoI" }
    ],
    6: [
        { title: "Pablo Picasso y Barcelona | Análisis de Las Señoritas de Avignon", filePath: "", youtubeUrl: "https://www.youtube.com/watch?v=u0sU55yyDiE" },
        { title: "Manuel de Falla: El Sombrero de Tres Picos 1919", filePath: "", youtubeUrl: "https://www.youtube.com/watch?v=LMtFHKb2j58" }
    ]
};


export default function ItineraryTimeline({ videosExist }: ItineraryTimelineProps) {
    const [activeVideoIndexes, setActiveVideoIndexes] = useState<{ [key: number]: number }>({
        1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0
    });
    const [timelineMediaTypes, setTimelineMediaTypes] = useState<{ [key: number]: "completo" | "resumen" }>({
        1: "completo", 2: "completo", 3: "completo", 4: "completo", 5: "completo", 6: "completo"
    });

    const [activeDay, setActiveDay] = useState(1);

    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash;
            if (hash.startsWith("#dia-")) {
                const dayNum = parseInt(hash.replace("#dia-", ""), 10);
                if (dayNum >= 1 && dayNum <= 6) {
                    setActiveDay(dayNum);
                    setTimeout(() => {
                        const el = document.getElementById("itinerario");
                        if (el) {
                            el.scrollIntoView({ behavior: "smooth", block: "start" });
                        }
                    }, 80);
                }
            }
        };

        handleHashChange();

        window.addEventListener("hashchange", handleHashChange);
        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);
    const [selectedModes, setSelectedModes] = useState<{ [key: number]: "summary" | "video" }>({
        1: "summary",
        2: "summary",
        3: "summary",
        4: "summary",
        5: "summary",
        6: "summary"
    });

    const currentMode = selectedModes[activeDay] || "summary";

    const setMode = (dayId: number, mode: "summary" | "video") => {
        setSelectedModes(prev => ({ ...prev, [dayId]: mode }));
    };

    const getVideoKey = (dayId: number): keyof ItineraryTimelineProps["videosExist"] => {
        return `itinerario-${dayId}` as any;
    };

    const getVideoPath = (dayId: number): string => {
        return `/videos/itinerario-${dayId}.mp4`;
    };

    return (
        <div className="max-w-7xl mx-auto">
            {/* Mobile Day Selector (Horizontal Scroll) */}
            <div className="flex sm:hidden overflow-x-auto pb-4 gap-2 scrollbar-none px-4 mb-4">
                {ITIN_DATA.map((day) => (
                    <button
                        key={day.id}
                        onClick={() => {
                            setActiveDay(day.id);
                        }}
                        className={`shrink-0 px-4 py-2 text-sm font-semibold rounded-full border transition-all ${activeDay === day.id
                            ? "bg-[#800020] text-white border-[#800020]"
                            : "bg-white text-[#1C1C1C]/75 border-stone-200"
                            }`}
                    >
                        Día {day.id} ({day.date})
                    </button>
                ))}
            </div>

            {/* Desktop Day Selector (Tabs) */}
            <div className="hidden sm:flex justify-between border-b border-[#C5A059]/30 mb-8 px-4 sm:px-0">
                {ITIN_DATA.map((day) => (
                    <button
                        key={day.id}
                        onClick={() => {
                            setActiveDay(day.id);
                        }}
                        className={`pb-4 px-2 text-center border-b-2 text-sm transition-all focus:outline-none ${activeDay === day.id
                            ? "border-[#800020] text-[#800020] font-bold"
                            : "border-transparent text-[#1C1C1C]/60 hover:text-[#800020]"
                            }`}
                    >
                        <span className="block font-serif text-lg">Día {day.id}</span>
                        <span className="block text-xs uppercase tracking-widest mt-1 font-semibold">{day.date}</span>
                    </button>
                ))}
            </div>

            {/* Selected Day Content with Split Layout */}
            {ITIN_DATA.map((day) => {
                if (day.id !== activeDay) return null;

                const videoKey = getVideoKey(day.id);
                const hasVideo = videosExist?.[videoKey];
                const thumb = DAY_THUMBNAILS[day.id];

                return (
                    <div key={day.id} className="animate-fadeIn grid grid-cols-1 lg:grid-cols-12 gap-8 px-4 sm:px-0 items-start">

                        {/* LEFT COLUMN: Vertical event timeline (col-span-7) */}
                        <div className="lg:col-span-7 space-y-6">
                            {/* Day Header */}
                            <div className="border-l-4 border-[#800020] pl-4 sm:pl-6 py-1 bg-gradient-to-r from-[#FAF9F6] to-transparent rounded-r-md">
                                <span className="text-[#C5A059] font-serif italic text-sm uppercase tracking-wider block">
                                    {day.dayName}
                                </span>
                                <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mt-1">
                                    {day.title}
                                </h3>
                                {day.desc && (
                                    <p className="text-stone-600 mt-2 text-sm italic leading-relaxed">
                                        "{day.desc}"
                                    </p>
                                )}
                            </div>

                            {/* Events Vertical Timeline */}
                            <div className="relative border-l border-stone-200 ml-4 pl-6 sm:pl-8 py-3 space-y-6">
                                {day.events.map((evt, index) => (
                                    <div key={index} className="relative">
                                        {/* Timeline Dot Indicator */}
                                        <span className={`absolute -left-[37px] sm:-left-[41px] top-1.5 flex items-center justify-center w-7 h-7 rounded-full border-2 bg-white transition-all ${evt.type === "concert"
                                            ? "border-[#800020] text-[#800020] shadow-md ring-4 ring-[#800020]/10"
                                            : evt.type === "meal"
                                                ? "border-[#2E5A44] text-[#2E5A44]"
                                                : evt.type === "transport"
                                                    ? "border-[#C5A059] text-[#C5A059]"
                                                    : "border-stone-400 text-stone-600"
                                            }`}>
                                            {evt.type === "concert" ? (
                                                <Music className="w-3.5 h-3.5 animate-pulse" />
                                            ) : evt.type === "meal" ? (
                                                <Utensils className="w-3.5 h-3.5" />
                                            ) : (
                                                <CheckCircle className="w-3.5 h-3.5" />
                                            )}
                                        </span>

                                        {/* Event Details Card */}
                                        <div className={`p-4 rounded-lg border transition duration-200 ${evt.type === "concert"
                                            ? "bg-[#800020]/5 border-[#800020]/20 shadow-md shadow-[#800020]/5"
                                            : evt.type === "meal"
                                                ? "bg-[#2E5A44]/5 border-[#2E5A44]/15"
                                                : "bg-white border-stone-150 hover:border-[#C5A059]/30"
                                            }`}>
                                            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                                                <div className="flex items-center space-x-2">
                                                    {evt.time && (
                                                        <span className="flex items-center text-[10px] font-bold uppercase tracking-wider text-[#C5A059] bg-[#C5A059]/10 px-2 py-0.5 rounded">
                                                            <Clock className="w-3 h-3 mr-1" />
                                                            {evt.time}
                                                        </span>
                                                    )}
                                                    <span className={`text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full ${evt.type === "concert"
                                                        ? "bg-[#800020]/15 text-[#800020]"
                                                        : evt.type === "meal"
                                                            ? "bg-[#2E5A44]/10 text-[#2E5A44]"
                                                            : evt.type === "transport"
                                                                ? "bg-[#C5A059]/15 text-[#C5A059]"
                                                                : "bg-stone-100 text-stone-600"
                                                        }`}>
                                                        {evt.type === "concert" ? "Música / Recital" : evt.type === "meal" ? "Gastronomía" : evt.type === "transport" ? "Trayecto" : "Visita Cultural"}
                                                    </span>
                                                </div>

                                                {evt.venue && (
                                                    <span className="inline-flex items-center text-xs text-[#1C1C1C]/65 font-medium">
                                                        <MapPin className="w-3 h-3 mr-1 text-[#C5A059]" />
                                                        {evt.venue}
                                                    </span>
                                                )}
                                            </div>

                                            <h4 className="font-serif text-base font-bold text-stone-900 mb-1">
                                                {evt.title}
                                            </h4>

                                            <p className="text-xs text-[#1C1C1C]/80 leading-relaxed whitespace-pre-wrap">
                                                {evt.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* RIGHT COLUMN: Multimedia display with toggle cards (col-span-5) */}
                        <div className="lg:col-span-5 lg:sticky lg:top-36 space-y-4 w-full">
                            <div className="bg-white p-4 sm:p-5 rounded-xl border border-[#C5A059]/25 shadow-lg shadow-[#800020]/5 w-full">
                                {/* Title of the Multimedia Block */}
                                <div className="text-center pb-3 border-b border-[#C5A059]/10 mb-4 select-none">
                                    <h4 className="font-serif text-[#800020] uppercase font-bold text-sm tracking-widest">
                                        Diario Visual del Día
                                    </h4>
                                    <span className="text-[9px] uppercase tracking-wider text-[#C5A059] font-semibold">
                                        Resumen multimedia • Día {day.id}
                                    </span>
                                </div>

                                {/* Mode Selector Toggle Tabs */}
                                <div className="flex border border-[#C5A059]/25 rounded-lg overflow-hidden text-[10px] uppercase font-bold tracking-wider mb-4">
                                    <button
                                        onClick={() => setMode(day.id, "summary")}
                                        className={`flex-1 py-2 text-center transition focus:outline-none ${currentMode === "summary"
                                            ? "bg-[#800020] text-white"
                                            : "bg-[#FAF9F6] text-stone-600 hover:text-[#800020]"
                                            }`}
                                    >
                                        Resumen Visual
                                    </button>
                                    <button
                                        onClick={() => setMode(day.id, "video")}
                                        className={`flex-1 py-2 text-center transition focus:outline-none ${currentMode === "video"
                                            ? "bg-[#800020] text-white"
                                            : "bg-[#FAF9F6] text-stone-600 hover:text-[#800020]"
                                            }`}
                                    >
                                        Vídeos Relacionados
                                    </button>
                                </div>

                                {/* Video or Summary Image Box */}
                                <div className="relative aspect-video rounded-md overflow-hidden bg-stone-100 border border-stone-200 shadow-sm">
                                    {currentMode === "summary" ? (
                                        hasVideo ? (
                                            <div className="w-full h-full bg-[#1C1C1C] relative aspect-video">
                                                <video
                                                    src={getVideoPath(day.id)}
                                                    controls
                                                    className="w-full h-full object-cover"
                                                    poster={thumb.src}
                                                />
                                            </div>
                                        ) : (
                                            /* SUMMARY IMAGE WITH INTERPRETER-STYLE OVERLAY */
                                            <div
                                                onClick={() => setMode(day.id, "video")}
                                                className="relative w-full h-full cursor-pointer group"
                                                title="Haz clic para ver los vídeos relacionados"
                                            >
                                                <img
                                                    src={thumb.src}
                                                    alt={thumb.caption}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                                />
                                                {/* ccmfalla.com interpreter card theme overlay: dark filter with centered elegant elements */}
                                                <div className="absolute inset-0 bg-black/45 group-hover:bg-[#800020]/65 transition-all duration-300 flex flex-col items-center justify-center p-6 text-center text-white">
                                                    {/* Title */}
                                                    <h5 className="text-[17px] sm:text-[19px] font-bold text-white tracking-wide leading-snug drop-shadow-sm">
                                                        {DAY_OVERLAY_DETAILS[day.id].title}
                                                    </h5>

                                                    {/* Subtitle / Category: all caps gold accent */}
                                                    <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#E9C168] mt-1.5 uppercase">
                                                        {DAY_OVERLAY_DETAILS[day.id].category}
                                                    </span>

                                                    {/* Small details description in italic (Alegreya/Cormorant feel) */}
                                                    <p className="text-[12px] sm:text-[13px] italic text-[#FAF9F6]/90 mt-2 font-serif font-light max-w-[280px]">
                                                        {DAY_OVERLAY_DETAILS[day.id].description}
                                                    </p>

                                                    {/* Date */}
                                                    <span className="text-[10px] text-stone-300 font-sans tracking-wider mt-2.5 opacity-85">
                                                        {DAY_OVERLAY_DETAILS[day.id].date}
                                                    </span>

                                                    {/* Play Button Icon: Hollow white circle with custom play triangle arrow */}
                                                    <div className="mt-4 flex items-center justify-center">
                                                        <div className="w-9 h-9 rounded-full border border-white/50 flex flex-col items-center justify-center bg-black/10 group-hover:bg-[#800020]/80 group-hover:scale-110 shadow-md transition-all duration-300">
                                                            <svg className="w-3.5 h-3.5 fill-current text-white translate-x-[0.5px]" viewBox="0 0 24 24">
                                                                <path d="M8 5v14l11-7z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    ) : (
                                        /* VIDEO PLAYLIST PLAYER & DUAL PLAYER CONTROLS */
                                        (() => {
                                            const dayVideos = ITINERARY_VIDEOS[day.id] || [];
                                            const activeIdx = activeVideoIndexes[day.id] || 0;
                                            const currentVideo = dayVideos[activeIdx];
                                            const mediaType = timelineMediaTypes[day.id] || "completo";
                                            const videoSrc = mediaType === "resumen" && currentVideo ? currentVideo.filePath.replace(".mp4", "_resumen.mp4") : currentVideo?.filePath;

                                            if (currentVideo) {
                                                if (currentVideo.youtubeUrl) {
                                                    return (
                                                        <div className="w-full h-full flex flex-col justify-between bg-[#1C1C1C] relative">
                                                            {/* Cover Image and Clickable Link */}
                                                            <a
                                                                href={currentVideo.youtubeUrl}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="relative w-full h-full cursor-pointer group flex items-center justify-center aspect-video"
                                                            >
                                                                {/* Mini Overlay Cover with Day Photo */}
                                                                <div className="absolute inset-0 bg-black/40 group-hover:bg-[#800020]/25 transition duration-300 z-10" />
                                                                <img
                                                                    src={thumb.src}
                                                                    alt={currentVideo.title}
                                                                    className="w-full h-full object-cover filter brightness-[0.7] group-hover:brightness-[0.9] transition"
                                                                />

                                                                {/* Centered YouTube Play Button */}
                                                                <div
                                                                    className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-[#E62117] text-white flex items-center justify-center shadow-lg group-hover:scale-110 active:scale-95 transition-all border border-[#FAF9F6] z-20"
                                                                    aria-label={`Ver ${currentVideo.title} en YouTube`}
                                                                >
                                                                    <svg className="w-5 h-5 fill-current translate-x-0.5" viewBox="0 0 24 24">
                                                                        <path d="M8 5v14l11-7z" />
                                                                    </svg>
                                                                </div>

                                                                {/* YouTube Label */}
                                                                <div className="absolute bottom-3 left-3 bg-stone-950/80 px-2 py-0.5 rounded text-[10px] text-white border border-white/10 uppercase tracking-widest font-bold z-20 flex items-center gap-1">
                                                                    <span>Ver en YouTube</span>
                                                                    <svg className="w-3 h-3 fill-current text-white" viewBox="0 0 24 24">
                                                                        <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-8z" />
                                                                    </svg>
                                                                </div>
                                                            </a>
                                                        </div>
                                                    );
                                                }

                                                return (
                                                    <div className="w-full h-full flex flex-col justify-between bg-[#1C1C1C]">
                                                        {/* Dual Player Toggle Switch (Timeline version) */}
                                                        <div className="flex border-b border-stone-850 bg-stone-900 text-[10px] z-10">
                                                            <button
                                                                onClick={() => setTimelineMediaTypes(prev => ({ ...prev, [day.id]: "completo" }))}
                                                                className={`flex-1 py-1.5 text-center font-bold uppercase transition ${mediaType === "completo" ? "bg-[#800020] text-white" : "text-stone-300 hover:bg-[#800020]/20"
                                                                    }`}
                                                            >
                                                                ▶ Completo
                                                            </button>
                                                            <button
                                                                onClick={() => setTimelineMediaTypes(prev => ({ ...prev, [day.id]: "resumen" }))}
                                                                className={`flex-1 py-1.5 text-center font-bold uppercase transition ${mediaType === "resumen" ? "bg-[#800020] text-white" : "text-stone-300 hover:bg-[#800020]/20"
                                                                    }`}
                                                            >
                                                                ⏱ Resumen
                                                            </button>
                                                        </div>
                                                        <div className="flex-1 min-h-0 relative aspect-video">
                                                            <video
                                                                key={`${day.id}-${activeIdx}-${mediaType}`}
                                                                src={videoSrc}
                                                                controls
                                                                autoPlay
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            }

                                            return (
                                                /* Fallback if video does not exist yet */
                                                <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#FAF9F6] border border-dashed border-[#C5A059]/30">
                                                    <div className="w-10 h-10 rounded-full bg-[#800020]/5 flex items-center justify-center text-[#800020] mb-2 animate-bounce">
                                                        <Music className="w-5 h-5" />
                                                    </div>
                                                    <h5 className="font-serif text-sm font-bold text-[#800020]">Vídeo en Sincronización</h5>
                                                    <p className="text-[10px] text-stone-500 mt-1 max-w-[200px]">
                                                        El fragmento cinematográfico está siendo mezclado con el audio del concierto.
                                                    </p>
                                                </div>
                                            );
                                        })()
                                    )}
                                </div>

                                {/* Playlist selection buttons for day videos */}
                                {currentMode === "video" && (ITINERARY_VIDEOS[day.id]?.length || 0) > 1 && (
                                    <div className="mt-3 border-t border-stone-100 pt-3 select-none">
                                        <span className="block text-[8px] uppercase tracking-wider text-stone-400 font-bold mb-1.5">
                                            Lista de Reproducción del Día
                                        </span>
                                        <div className="flex flex-wrap gap-1.5">
                                            {ITINERARY_VIDEOS[day.id].map((vid, idx) => {
                                                const activeIdx = activeVideoIndexes[day.id] || 0;
                                                const isCurrent = activeIdx === idx;
                                                return (
                                                    <button
                                                        key={idx}
                                                        onClick={() => setActiveVideoIndexes(prev => ({ ...prev, [day.id]: idx }))}
                                                        className={`text-[9px] uppercase tracking-wider font-bold py-1 px-2 rounded-md transition ${isCurrent
                                                            ? "bg-[#800020] text-white"
                                                            : "bg-[#FAF9F6] text-stone-600 hover:bg-[#800020]/10 hover:text-[#800020] border border-stone-200"
                                                            }`}
                                                    >
                                                        {vid.title}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}

                                {/* Caption at bottom of framed element */}
                                <div className="mt-3 text-center select-none text-[10px] border-t border-[#C5A059]/10 pt-3">
                                    <p className="font-serif italic font-bold text-[#800020] text-[11px]">
                                        "{thumb.caption}"
                                    </p>
                                    <p className="text-[9px] text-stone-400 mt-0.5">
                                        Archivo Documental Manuel de Falla. Todos los derechos reservados.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>
                );
            })}
        </div>
    );
}
