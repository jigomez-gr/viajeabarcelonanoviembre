"use client";

import { useState } from "react";
import { ChevronRight, Play } from "lucide-react";

interface PrologueItem {
    src: string;
    title: string;
    category: string;
    isVideo?: boolean;
    poster?: string;
}

const PROLOGUE_ITEMS: PrologueItem[] = [
    {
        isVideo: true,
        src: "/videos/prologo.mp4",
        poster: "/imagenes/prologo.jpg",
        title: "Resumen Virtual",
        category: "VÍDEO RESUMEN OFICIAL"
    },
    {
        src: "/imagenes/prologo.jpg",
        title: "Prólogo: Viaje a Barcelona",
        category: "EL MODERNISMO Y LA MÚSICA"
    },
    {
        src: "/imagenes/prologo/Casa Batllo0.jpg",
        title: "Casa Batlló",
        category: "DETALLES DE LA FACHADA GAUDINIANA"
    },
    {
        src: "/imagenes/prologo/casabalto1.jpg",
        title: "Interiores de Casa Batlló",
        category: "SINFONÍA DE LUZ Y FORMA"
    },
    {
        src: "/imagenes/prologo/casabatto3.jpg",
        title: "Detalle Modernista",
        category: "CASA BATLLÓ EN EL EIXAMPLE"
    },
    {
        src: "/imagenes/prologo/arcodetriunfo0.jpg",
        title: "Arco de Triunfo",
        category: "EXPOSICIÓN UNIVERSAL DE BARCELONA 1888"
    },
    {
        src: "/imagenes/prologo/arcodetriunfo4.jpg",
        title: "Friso del Arco de Triunfo",
        category: "RELIEVES ESCULTÓRICOS DE ÉPOCA"
    },
    {
        src: "/imagenes/prologo/monumentoacolon0_cieloazul.jpg",
        title: "Monumento a Colón",
        category: "SÍMBOLO HISTÓRICO DE BARCELONA"
    },
    {
        src: "/imagenes/prologo/monumentoacolon4.jpg",
        title: "Columna de Colón",
        category: "DETALLE DE LA ESTATUA MIRANDO AL MAR"
    },
    {
        src: "/imagenes/prologo/portico1.jpg",
        title: "Pórtico del Recinto",
        category: "MARAVILLA DEL HOSPITAL DE SANT PAU"
    },
    {
        src: "/imagenes/prologo/portico2.jpg",
        title: "Columnata y Detalle de Ladrillos",
        category: "DOMÈNECH I MONTANER ORIGINAL"
    },
    {
        src: "/imagenes/prologo/HkDTMEQ-rx-JzjVbQBzCe_cnZL8gmxMUJuQta3dwEnrVr2rRiFuDaOA02Juw7-tP40walg7gdYjXXBAuipvSJ-IaanWsRNMqDNhpdSVISz_mHSfbom8QGNjQ1wZ9byMfurhXXHybsax0aadndXDBn6zk9tqTu8icyjj-skEDlqaFd.jpg",
        title: "Recinto Modernista Hospital de Sant Pau",
        category: "ARQUITECTURA HISTÓRICA PATIONAL"
    },
    {
        src: "/imagenes/prologo/ets9dTsKoDuYCK-EIkxkIEyZfrQcUpPbcCvxyRfpYkH3C53CpvccPwK6edTYlrSKM7VL8tKhJMLSAwOybqw_x9uYhH-qBd8mF_9X1-0pRGnc-6U42840UXTBhftmv2Hweej4mI2TL72MmV2CH4InlYUzTkJ88dGs1K3QbjbJvtSSn.jpg",
        title: "Detalle de los Pabellones",
        category: "HOSPITAL DE LA SANTA CREU I SANT PAU"
    }
];

export default function PrologoGallery() {
    const [selectedItem, setSelectedItem] = useState<PrologueItem>(PROLOGUE_ITEMS[0]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full items-stretch">
            {/* Main Container */}
            <div className="md:col-span-8 relative rounded-2xl overflow-hidden shadow-2xl border border-[#C5A059]/30 min-h-[400px] bg-black flex items-center justify-center">
                {selectedItem.isVideo ? (
                    <video
                        key={selectedItem.src}
                        src={selectedItem.src}
                        poster={selectedItem.poster}
                        controls
                        playsInline
                        className="w-full h-full object-cover min-h-[400px]"
                    />
                ) : (
                    <>
                        <img
                            src={selectedItem.src}
                            alt={selectedItem.title}
                            className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                        />
                        {/* Dark red gradient cover at the bottom */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#800020]/95 via-black/20 to-transparent pointer-events-none" />

                        {/* Rounded crown overlay style */}
                        <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4 text-white">
                            <div className="flex-shrink-0 w-11 h-11 rounded-full border border-[#E9C168] bg-[#800020]/60 flex items-center justify-center text-[#E9C168] shadow-md">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2l2.5 5.5L20 8.5l-4.5 4 1.5 6-5-3-5 3 1.5-6-4.5-4 5.5-1z" />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-serif text-xl sm:text-2xl font-bold tracking-wide">{selectedItem.title}</h4>
                                <p className="text-[9px] sm:text-[10px] tracking-[0.15em] text-[#E9C168] uppercase font-semibold font-sans mt-0.5">
                                    {selectedItem.category}
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Sidebar List of Items (al lado) */}
            <div className="md:col-span-4 flex flex-col h-[400px]">
                <h4 className="font-serif text-xs uppercase tracking-widest text-[#800020] font-bold mb-3 select-none">
                    Contenidos del Prólogo
                </h4>
                <div className="flex-1 overflow-y-auto space-y-2 pr-1 custom-scrollbar" style={{ maxHeight: "365px" }}>
                    {PROLOGUE_ITEMS.map((item, idx) => {
                        const isSelected = selectedItem.src === item.src;
                        return (
                            <button
                                key={idx}
                                onClick={() => setSelectedItem(item)}
                                className={`flex items-center gap-3 w-full p-2 rounded-lg border text-left transition duration-200 ${isSelected
                                    ? "bg-[#800020]/5 border-[#800020] shadow-sm shadow-[#800020]/5"
                                    : "bg-white border-stone-150 hover:bg-stone-50 hover:border-[#C5A059]/30"
                                    }`}
                            >
                                <div className="relative w-16 h-12 rounded overflow-hidden flex-shrink-0 bg-stone-100 border border-stone-200">
                                    {item.isVideo && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-10 text-white">
                                            <Play className="w-5 h-5 fill-current" />
                                        </div>
                                    )}
                                    <img
                                        src={item.isVideo ? item.poster : item.src}
                                        alt={item.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0 pr-1">
                                    <h5 className="font-serif text-xs font-bold text-stone-900 truncate">
                                        {item.title}
                                    </h5>
                                    <span className="block text-[8px] tracking-wider text-[#C5A059] font-bold uppercase truncate mt-0.5">
                                        {item.category}
                                    </span>
                                </div>
                                <ChevronRight className={`w-3.5 h-3.5 ${isSelected ? "text-[#800020]" : "text-stone-400"
                                    }`} />
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
