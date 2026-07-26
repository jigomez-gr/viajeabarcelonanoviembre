"use client";

import { useState } from "react";
import { Play, Calendar, Film, ArrowRight, ShieldCheck, Compass, Sparkles, MapPin } from "lucide-react";

interface VideoGalleryProps {
    videosExist: {
        "itinerario-1": boolean;
        "itinerario-2": boolean;
        "itinerario-3": boolean;
        "itinerario-4": boolean;
        "itinerario-5": boolean;
        resumen: boolean;
    };
}

interface VideoDetail {
    title: string;
    description: string;
    filePath: string;
    duration?: string;
    subtitle?: string;
    youtubeUrl?: string;
}

interface DayItem {
    id: number;
    title: string;
    category: string;
    description: string;
    date: string;
    image: string;
    videos: VideoDetail[];
}

const DAYS_DATA: DayItem[] = [
    {
        id: 1,
        title: "Llegada a Barcelona y Ópera",
        category: "ALTA VELOCIDAD Y LICEU",
        description: "Viaje premium en Iryo Infinita y noche lírica con bellini en el Gran Teatre del Liceu.",
        date: "02 Nov 2026",
        image: "https://images.unsplash.com/photo-1583422409516-2895a77efedd?q=80&w=800&auto=format&fit=crop",
        videos: [
            {
                title: "Petit Palace Boqueria Hotel",
                description: "Vídeo reseña en alta definición de nuestro hotel boutique Petit Palace Boquería Garden.",
                filePath: "/videos_itinerario/dia0/boqueria.mp4",
                youtubeUrl: "https://www.youtube.com/watch?v=2DRwht0fJlE"
            },
            {
                title: "I Capuleti e i Montecchi - Bellini",
                description: "Tráiler oficial de la ópera de Bellini en el Gran Teatre del Liceu para la temporada 2026/27.",
                filePath: "/videos_itinerario/dia0/liceu.mp4",
                youtubeUrl: "https://www.youtube.com/watch?v=_1Y_PqlKFvI"
            }
        ]
    },
    {
        id: 2,
        title: "Modernismo y Quartet Gerhard",
        category: "SANT PAU Y PALAU DE LA MÚSICA",
        description: "El esplendor modernista del Hospital de Sant Pau, el Palau de la Música Catalana y un recital exclusivo de Shostakovich.",
        date: "03 Nov 2026",
        image: "https://images.unsplash.com/photo-1620843245451-b0db36605e55?q=80&w=800&auto=format&fit=crop",
        videos: [
            {
                title: "Recinto Modernista de Sant Pau",
                description: "Explora la magnífica obra arquitectónica modernista de Lluís Domènech i Montaner.",
                filePath: "/videos_itinerario/dia1/sant_pau.mp4",
                youtubeUrl: "https://www.youtube.com/watch?v=bh4FY93-kwQ"
            },
            {
                title: "Palau de la Música Catalana",
                description: "Un recorrido visual por el auditorio de música, patrimonio de la humanidad, con su emblemática cúpula de cristal.",
                filePath: "/videos_itinerario/dia1/palau_musica.mp4",
                youtubeUrl: "https://www.youtube.com/watch?v=A54hDZgGmu8"
            },
            {
                title: "Restaurante El Cercle",
                description: "Presentación gastronómica del singular restaurante El Cercle en el centro cultural Real Círculo Artístico.",
                filePath: "/videos_itinerario/dia1/el_cercle.mp4",
                youtubeUrl: "https://www.youtube.com/watch?v=4IuennVEXpM"
            },
            {
                title: "Assaig del Cor de Cambra",
                description: "Ensayo a puerta cerrada del coro de cámara en el Petit Palau del Palau de la Música.",
                filePath: "/videos_itinerario/dia1/cor_cambra.mp4",
                youtubeUrl: "https://www.youtube.com/watch?v=x4TghuDMzso"
            },
            {
                title: "Quartet Gerhard",
                description: "Interpretación del vibrante Allegro con brio del Cuarteto de Cuerda Nº 5 de Dmitri Shostakovich.",
                filePath: "/videos_itinerario/dia1/quartet_gerhard.mp4",
                youtubeUrl: "https://www.youtube.com/watch?v=AWznQ3Qqreg"
            }
        ]
    },
    {
        id: 3,
        title: "Casas Singulares y Réquiem",
        category: "AMATLLER, VICENS Y VERDI",
        description: "Las obras maestras residenciales del Paseo de Gràcia y Gràcia, seguidas del monumental Réquiem de Verdi en el Liceu.",
        date: "04 Nov 2026",
        image: "https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=800&auto=format&fit=crop",
        videos: [
            {
                title: "Casa Museo Amatller",
                description: "Visita virtual por las dependencias de la familia Amatller y el diseño neogótico de Josep Puig i Cadafalch.",
                filePath: "/videos_itinerario/dia2/casa_amatller.mp4",
                youtubeUrl: "https://www.youtube.com/watch?v=sMsZoDJFMyQ"
            },
            {
                title: "Casa Vicens de Antoni Gaudí",
                description: "El primer proyecto residencial de Gaudí en Barcelona, con su asombrosa inspiración oriental y azulejos verdes.",
                filePath: "/videos_itinerario/dia2/casa_vicens.mp4",
                youtubeUrl: "https://www.youtube.com/watch?v=uDbaD1wMnBU"
            },
            {
                title: "Lincoln 32 Gastronomía",
                description: "Preparación de bacalao con ratatouille y otros platos gourmet en la cocina de Lincoln 32.",
                filePath: "/videos_itinerario/dia2/lincoln32.mp4",
                youtubeUrl: "https://www.youtube.com/watch?v=CF7oHF99GJQ"
            },
            {
                title: "Réquiem de Giuseppe Verdi",
                description: "Interpretación sinfónico-coral monumental del Réquiem de Verdi, una ofrenda musical de valor universal.",
                filePath: "/videos_itinerario/dia2/requiem_verdi.mp4",
                youtubeUrl: "https://www.youtube.com/watch?v=T81AYBkoovE"
            }
        ]
    },
    {
        id: 4,
        title: "Gaudí Onírico y Manuel de Falla",
        category: "SAGRADA FAMILIA, PARK GÜELL Y ENLACE",
        description: "El diálogo eterno del Park Güell y la Basílica de la Sagrada Familia, almuerzo en el Palace e instrumental de Falla en el Palau.",
        date: "05 Nov 2026",
        image: "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?q=80&w=800&auto=format&fit=crop",
        videos: [
            {
                title: "Turismo en Park Güell",
                description: "Guía de visita por el parque público más famoso de Antoni Gaudí, con sus salamandras de mosaicos y Columnas Dóricas.",
                filePath: "/videos_itinerario/dia3/park_guell.mp4",
                youtubeUrl: "https://www.youtube.com/watch?v=21RL4WmtmbI"
            },
            {
                title: "Interior de la Sagrada Familia",
                description: "Paseo entre las columnas del bosque de piedra de la basílica y el fascinante juego de luces de sus vidrieras.",
                filePath: "/videos_itinerario/dia3/sagrada_familia.mp4",
                youtubeUrl: "https://www.youtube.com/watch?v=LriWSHbSHog"
            },
            {
                title: "Hotel El Palace Barcelona",
                description: "Recorrido por el lujo clásico y los salones históricos de este emblemático hotel modernista.",
                filePath: "/videos_itinerario/dia3/el_palace.mp4",
                youtubeUrl: "https://www.youtube.com/watch?v=4QfIht6Lxcg"
            },
            {
                title: "Música de Cámara en el Palau",
                description: "Interpretación festiva al Palau de la Música Catalana en conmemoración de la gran música española.",
                filePath: "/videos_itinerario/dia3/palau_concierto.mp4",
                youtubeUrl: "https://www.youtube.com/watch?v=oNeLRaEbBuE"
            }
        ]
    },
    {
        id: 5,
        title: "Museo de la Música y Atlántida",
        category: "L'AUDITORI Y CASA BATLLÓ",
        description: "Un recorrido instrumental matutino e inmersión en Casa Batlló, culminando con la cantata Atlántida de Falla en L'Auditori.",
        date: "06 Nov 2026",
        image: "https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=800&auto=format&fit=crop",
        videos: [
            {
                title: "Museo de la Música de Barcelona",
                description: "Recorrido por las notables colecciones de instrumentos históricos y archivos del Museo de la Música.",
                filePath: "/videos_itinerario/dia4/museo_musica.mp4",
                youtubeUrl: "https://www.youtube.com/watch?v=lRGoiNF9QoI"
            }
        ]
    },
    {
        id: 6,
        title: "La Barcelona Joven de Picasso",
        category: "MUSEO PICASSO Y CLAUSURA",
        description: "Paseo por el barrio gótico y Born, visita al Museo Picasso y almuerzo de clausura en Cadaqués antes del retorno.",
        date: "07 Nov 2026",
        image: "https://images.unsplash.com/photo-1587334206574-35113a8d75e9?q=80&w=800&auto=format&fit=crop",
        videos: []
    }
];

export default function VideoGallery({ videosExist }: VideoGalleryProps) {
    const [selectedDayId, setSelectedDayId] = useState<number | null>(null);
    const [playingVideoPath, setPlayingVideoPath] = useState<string | null>(null);
    const [galleryMediaTypes, setGalleryMediaTypes] = useState<{ [key: string]: "completo" | "resumen" }>({});

    const activeDay = DAYS_DATA.find(d => d.id === selectedDayId);

    const handlePlayVideo = (filePath: string) => {
        setPlayingVideoPath(filePath);
    };

    return (
        <div className="space-y-12">
            {/* GRID OF DAY SELECTOR CARDS - Style mimicking ccmfalla.com interpreter list */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {DAYS_DATA.map((day) => {
                    const isSelected = selectedDayId === day.id;
                    return (
                        <div
                            key={day.id}
                            onClick={() => {
                                setSelectedDayId(isSelected ? null : day.id);
                                setPlayingVideoPath(null);
                            }}
                            className={`relative aspect-[4/3] md:aspect-video rounded-xl overflow-hidden cursor-pointer group shadow-md border focus:outline-none transition-all duration-300 ${isSelected
                                ? "border-[#800020] ring-4 ring-[#800020]/15"
                                : "border-[#C5A059]/25 hover:border-[#800020]/50"
                                }`}
                        >
                            {/* Card Background Image */}
                            <img
                                src={day.image}
                                alt={day.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            {/* ccmfalla.com Interpreter Mask Overlay */}
                            <div className="absolute inset-0 bg-black/45 group-hover:bg-[#800020]/65 transition-all duration-300 flex flex-col items-center justify-center p-6 text-center text-white">
                                {/* Title */}
                                <h5 className="text-[17px] sm:text-[19px] font-bold text-white tracking-wide leading-snug drop-shadow-sm">
                                    {day.title}
                                </h5>

                                {/* Subtitle / Category Label: Montserrat gold uppercase style */}
                                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-[#E9C168] mt-1.5 uppercase select-none">
                                    {day.category}
                                </span>

                                {/* Italic serif description/details count */}
                                <p className="text-[12px] sm:text-[13px] italic text-[#FAF9F6]/95 mt-2 font-serif font-light max-w-[280px]">
                                    {day.videos.length} {day.videos.length === 1 ? "vídeo disponible" : "vídeos disponibles"}
                                </p>

                                {/* Date */}
                                <span className="text-[10px] text-stone-300 font-sans tracking-wide mt-2.5 opacity-85 select-none">
                                    {day.date}
                                </span>

                                {/* Rounded Circle Play Action Indicator */}
                                <div className="mt-4 flex items-center justify-center">
                                    <div className="w-9 h-9 rounded-full border border-white/50 flex flex-col items-center justify-center bg-black/10 group-hover:bg-[#800020]/90 group-hover:scale-110 shadow-md transition-all duration-300">
                                        <svg className={`w-3.5 h-3.5 fill-current text-white transition duration-300 ${isSelected ? 'rotate-90' : 'translate-x-[0.5px]'}`} viewBox="0 0 24 24">
                                            {isSelected ? (
                                                <path d="M19 13H5v-2h14v2z" />
                                            ) : (
                                                <path d="M8 5v14l11-7z" />
                                            )}
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* EXPANDED DAY VIDEOS CONTAINER (Collapsible Accordion layout under the selector row) */}
            {activeDay && (
                <div className="bg-[#FAF9F6] border border-[#C5A059]/30 rounded-2xl p-6 sm:p-8 shadow-xl shadow-[#800020]/5 animate-fadeIn space-y-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#C5A059]/20 pb-4">
                        <div>
                            <span className="text-xs uppercase font-bold tracking-widest text-[#C5A059]">
                                Auditorio Digital • Día {activeDay.id} ({activeDay.date})
                            </span>
                            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#800020] mt-1">
                                {activeDay.title}
                            </h3>
                        </div>
                        <button
                            onClick={() => {
                                setSelectedDayId(null);
                                setPlayingVideoPath(null);
                            }}
                            className="text-xs font-semibold text-[#800020] hover:text-[#C5A059] transition uppercase tracking-wider mt-3 sm:mt-0"
                        >
                            Cerrar galería del día
                        </button>
                    </div>

                    {/* Videos Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        {activeDay.videos.map((vid, idx) => {
                            const isPlaying = playingVideoPath === vid.filePath;
                            const videoKey = `${activeDay.id}-${idx}`;
                            const mediaType = galleryMediaTypes[videoKey] || "completo";
                            const videoSrc = mediaType === "resumen" ? vid.filePath.replace(".mp4", "_resumen.mp4") : vid.filePath;

                            if (vid.youtubeUrl) {
                                return (
                                    <div
                                        key={idx}
                                        className="flex flex-col bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition duration-300"
                                    >
                                        {/* Video Link Card Display */}
                                        <a
                                            href={vid.youtubeUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="relative aspect-video bg-[#1C1C1C] flex items-center justify-center border-b border-stone-100 cursor-pointer group block"
                                        >
                                            {/* Mini Overlay Cover with Day Photo */}
                                            <div className="absolute inset-0 bg-black/40 group-hover:bg-[#800020]/25 transition duration-300 z-10" />
                                            <img
                                                src={activeDay.image}
                                                alt={vid.title}
                                                className="w-full h-full object-cover filter brightness-[0.7] group-hover:brightness-[0.9] transition"
                                            />

                                            {/* Centered Play YouTube Button */}
                                            <div
                                                className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#E62117] text-white flex items-center justify-center shadow-lg group-hover:scale-110 active:scale-95 transition-all border border-[#FAF9F6] z-20"
                                                aria-label={`Ver ${vid.title} en YouTube`}
                                            >
                                                <Play className="w-6 h-6 fill-current translate-x-0.5" />
                                            </div>

                                            {/* YouTube Call to Action Label */}
                                            <div className="absolute bottom-3 left-3 bg-stone-950/80 px-2 py-0.5 rounded text-[10px] text-white border border-white/10 uppercase tracking-widest font-bold z-20 flex items-center gap-1">
                                                <span>Ver en YouTube</span>
                                                <svg className="w-3.5 h-3.5 fill-current text-white" viewBox="0 0 24 24">
                                                    <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-8z" />
                                                </svg>
                                            </div>
                                        </a>

                                        {/* Video metadata */}
                                        <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                                            <div>
                                                <div className="flex items-center justify-between gap-2 mb-2">
                                                    <h4 className="font-serif text-base sm:text-lg font-bold text-[#800020]">
                                                        {vid.title}
                                                    </h4>
                                                    <span className="text-[10px] bg-red-100 text-[#E62117] border border-red-200 px-2 py-0.5 rounded font-bold uppercase tracking-wider font-sans">
                                                        YouTube
                                                    </span>
                                                </div>
                                                <p className="text-xs sm:text-sm text-[#1C1C1C]/75 leading-relaxed mb-4">
                                                    {vid.description}
                                                </p>
                                                <a
                                                    href={vid.youtubeUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center text-xs font-bold text-[#E62117] hover:text-[#800020] uppercase tracking-wider transition gap-1.5 focus:outline-none"
                                                >
                                                    Enlace al vídeo en YouTube &rarr;
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }

                            return (
                                <div
                                    key={idx}
                                    className="flex flex-col bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition duration-300"
                                >
                                    {/* Dual Player Toggle Switch */}
                                    <div className="flex border-b border-stone-100 bg-[#FAF9F6] text-xs">
                                        <button
                                            onClick={() => setGalleryMediaTypes(prev => ({ ...prev, [videoKey]: "completo" }))}
                                            className={`flex-1 py-2 text-center font-bold tracking-wider uppercase transition ${mediaType === "completo" ? "bg-[#800020] text-white" : "text-stone-600 hover:bg-[#800020]/10"
                                                }`}
                                        >
                                            ▶ Vídeo Completo
                                        </button>
                                        <button
                                            onClick={() => setGalleryMediaTypes(prev => ({ ...prev, [videoKey]: "resumen" }))}
                                            className={`flex-1 py-2 text-center font-bold tracking-wider uppercase transition ${mediaType === "resumen" ? "bg-[#800020] text-white" : "text-stone-600 hover:bg-[#800020]/10"
                                                }`}
                                        >
                                            ⏱ Resumen Corto
                                        </button>
                                    </div>

                                    {/* Video Player Display */}
                                    <div className="relative aspect-video bg-[#1C1C1C] flex items-center justify-center border-b border-stone-100">
                                        {isPlaying ? (
                                            <video
                                                key={videoSrc}
                                                src={videoSrc}
                                                controls
                                                autoPlay
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div
                                                onClick={() => handlePlayVideo(vid.filePath)}
                                                className="relative w-full h-full cursor-pointer group"
                                            >
                                                {/* Mini Overlay Cover with Day Photo */}
                                                <div className="absolute inset-0 bg-black/40 group-hover:bg-[#800020]/25 transition duration-300" />
                                                <img
                                                    src={activeDay.image}
                                                    alt={vid.title}
                                                    className="w-full h-full object-cover filter brightness-[0.7] group-hover:brightness-[0.9] transition"
                                                />

                                                {/* Centered Play Button */}
                                                <button
                                                    className="absolute inset-0 m-auto w-14 h-14 rounded-full bg-[#800020]/95 text-white flex items-center justify-center shadow-lg group-hover:scale-110 active:scale-95 transition-all border border-[#E9C168]"
                                                    aria-label={`Reproducir ${vid.title}`}
                                                >
                                                    <Play className="w-6 h-6 fill-current translate-x-0.5" />
                                                </button>

                                                {/* Play Call to Action Label */}
                                                <div className="absolute bottom-3 left-3 bg-stone-950/80 px-2 py-0.5 rounded text-[10px] text-white border border-white/10 uppercase tracking-widest font-bold">
                                                    Reproducir {mediaType === "resumen" ? "Resumen" : "Fragmento"}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Video metadata */}
                                    <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                                        <div>
                                            <h4 className="font-serif text-base sm:text-lg font-bold text-[#800020] mb-2">
                                                {vid.title}
                                            </h4>
                                            <p className="text-xs sm:text-sm text-[#1C1C1C]/75 leading-relaxed">
                                                {vid.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
