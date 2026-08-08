import fs from "fs";
import path from "path";
import Link from "next/link";
import { prisma } from "@/lib/db";
import Navbar from "@/components/Navbar";
import ItineraryTimeline from "@/components/ItineraryTimeline";
import VideoGallery from "@/components/VideoGallery";
import BookingForm from "@/components/BookingForm";
import HeroMedia from "@/components/HeroMedia";
import PrologoGallery from "@/components/PrologoGallery";
import AtmosphereGallery from "@/components/AtmosphereGallery";

export const dynamic = "force-dynamic";
import {
  Calendar, MapPin, Shield, Compass, FileText, CheckCircle2,
  HelpCircle, Mail, Phone, Clock, Award, Users, Music
} from "lucide-react";

// Server-side helper to check if mp4 videos exist in /public/videos
function checkVideosExist() {
  const publicVideosDir = path.join(process.cwd(), "public", "videos");
  return {
    "itinerario-1": fs.existsSync(path.join(publicVideosDir, "itinerario-1.mp4")),
    "itinerario-2": fs.existsSync(path.join(publicVideosDir, "itinerario-2.mp4")),
    "itinerario-3": fs.existsSync(path.join(publicVideosDir, "itinerario-3.mp4")),
    "itinerario-4": fs.existsSync(path.join(publicVideosDir, "itinerario-4.mp4")),
    "itinerario-5": fs.existsSync(path.join(publicVideosDir, "itinerario-5.mp4")),
    "itinerario-6": fs.existsSync(path.join(publicVideosDir, "itinerario-6.mp4")),
    resumen: fs.existsSync(path.join(publicVideosDir, "resumen.mp4")),
  };
}

// Server-side helper to read all images inside public/imagenes/diaX subdirectories
function getSubImages(dayNum: number): string[] {
  const publicDir = path.join(process.cwd(), "public", "imagenes", `dia${dayNum}`);
  if (!fs.existsSync(publicDir)) return [];
  try {
    return fs.readdirSync(publicDir)
      .filter((file) => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .map((file) => `/imagenes/dia${dayNum}/${file}`);
  } catch (e) {
    return [];
  }
}

export default async function Home() {
  const videosExist = checkVideosExist();

  const atmosphereDays = [
    {
      dayNum: 1,
      title: "Llegada y Ópera en el Liceu",
      subtitle: "Ver itinerario del trayecto",
      href: "#dia-1",
      mainImage: "/imagenes/dia1.jpg",
      subImages: getSubImages(1)
    },
    {
      dayNum: 2,
      title: "Domènech i Montaner y Quartet Gerhard",
      subtitle: "Ver recital y modernismo",
      href: "#dia-2",
      mainImage: "/imagenes/dia2.jpg",
      subImages: getSubImages(2)
    },
    {
      dayNum: 3,
      title: "Gaudí, Amatller y Réquiem de Verdi",
      subtitle: "Ver Casas Modernistas y Réquiem",
      href: "#dia-3",
      mainImage: "/imagenes/dia3.jpg",
      subImages: getSubImages(3)
    },
    {
      dayNum: 4,
      title: "Park Güell, Sagrada Familia y Falla",
      subtitle: "Ver templos acústicos",
      href: "#dia-4",
      mainImage: "/imagenes/dia4.jpg",
      subImages: getSubImages(4)
    },
    {
      dayNum: 5,
      title: "Museo de la Música y Atlántida",
      subtitle: "Ver exposición de música",
      href: "#dia-5",
      mainImage: "/imagenes/dia5.jpg",
      subImages: getSubImages(5)
    },
    {
      dayNum: 6,
      title: "Pablo Picasso Joven y Despedida",
      subtitle: "Ver almuerzo y Born",
      href: "#dia-6",
      mainImage: "/imagenes/dia6.jpg",
      subImages: getSubImages(6)
    }
  ];

  // Database queries for occupancy limits
  let remainingPlazas = 14;
  let totalPaidPlazas = 0;
  try {
    const paidReservations = await prisma.reserva.findMany({
      where: {
        estado: "pagada",
      },
    });
    totalPaidPlazas = paidReservations.reduce((acc: number, curr: { numeroPlazas: number }) => acc + curr.numeroPlazas, 0);
    remainingPlazas = Math.max(0, 14 - totalPaidPlazas);
  } catch (err) {
    console.error("Database query failed inside Home:", err);
  }

  return (
    <div className="bg-[#FAF9F6] text-[#1C1C1C] min-h-screen selection:bg-[#800020] selection:text-white">
      {/* 1. Header Fijo */}
      <Navbar />

      {/* 2. Hero Section Editorial con Vídeo de Fondo Enmarcado */}
      <section className="relative bg-[#FAF9F6] pt-24 sm:pt-28 pb-8 sm:pb-10 border-b border-[#C5A059]/15 flex flex-col items-center justify-center overflow-hidden">
        {/* Subtle decorative background elements */}
        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(#800020_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        {/* Hero Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center z-10 w-full">
          <div className="inline-flex items-center space-x-2 text-[10px] sm:text-xs tracking-[0.2em] text-[#C5A059] uppercase font-bold mb-2">
            <span>Ciclo de conciertos Manuel de Falla</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-[#800020] uppercase leading-tight mb-2.5 select-none">
            LA BARCELONA MODERNISTA
          </h1>

          <p className="font-serif text-lg sm:text-xl text-stone-400 max-w-4xl mb-4 sm:mb-5 italic tracking-wide mt-1">
            (2 de Noviembre — 7 de Noviembre de 2026)
          </p>

          {/* Framed Media Block mimicking ccmfalla.com Paintings */}
          <div className="max-w-6xl w-full bg-white p-2 sm:p-3 rounded-lg border border-[#C5A059]/25 shadow-xl shadow-[#800020]/5 mb-4 hover:shadow-2xl transition duration-500">
            <HeroMedia />
            {/* Caption in the ccmfalla.com Painting Style */}
            <div className="mt-4 text-center space-y-1 select-none border-t border-[#C5A059]/10 pt-4">
              <p className="font-serif italic font-bold text-[#800020] text-sm sm:text-base">
                "La Barcelona Modernista"
              </p>
              <p className="tracking-widest uppercase text-[9px] sm:text-[10px] text-stone-500 font-semibold">
                Vídeo Promocional
              </p>
              <p className="text-[9px] text-stone-400">
                Copyright © Ciclo de Conciertos Manuel de Falla. Todos los derechos reservados.
              </p>
            </div>
          </div>

          {/* Call to Actions in Editorial Style */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto items-center justify-center mt-6">
            <a
              href="#reserva"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-xs font-bold uppercase tracking-widest rounded-md text-white bg-[#800020] hover:bg-[#800020]/95 shadow-md shadow-[#800020]/15 hover:scale-102 transition duration-200"
            >
              Reservar plaza
            </a>
            <a
              href="/docs/programa-barcelona-modernista.pdf"
              download="programa-barcelona-modernista.pdf"
              className="inline-flex items-center justify-center px-8 py-3.5 border border-[#C5A059] text-xs font-bold uppercase tracking-widest rounded-md text-[#800020] hover:text-white bg-white hover:bg-[#800020] shadow-sm hover:scale-102 transition duration-250"
            >
              <FileText className="w-4 h-4 mr-2" />
              Descargar programa PDF
            </a>
          </div>
        </div>

        {/* Scroll indicator - refined */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-stone-400 text-[10px] tracking-widest uppercase flex flex-col items-center gap-1.5 animate-bounce select-none">
          <svg className="w-3.5 h-3.5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* 3. Bloque de Confianza / Resumen Rápido */}
      <section id="viaje" className="py-16 bg-white border-y border-[#C5A059]/25 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

            {/* Card 1 */}
            <div className="bg-[#FAF9F6] p-5 rounded-lg border border-[#C5A059]/20 text-center hover:shadow-md transition">
              <span className="block text-2xl font-serif font-black text-[#800020] mb-1">6 Días</span>
              <span className="block text-xs uppercase tracking-widest text-[#1C1C1C]/60 font-semibold">5 Noches</span>
            </div>

            {/* Card 2 */}
            <div className="bg-[#FAF9F6] p-5 rounded-lg border border-[#C5A059]/20 text-center hover:shadow-md transition">
              <span className="block text-xl font-serif font-bold text-[#800020] mb-2 leading-none">Petit Palace</span>
              <span className="block text-xs uppercase tracking-widest text-[#1C1C1C]/60 font-semibold">Boquerie Garden</span>
            </div>

            {/* Card 3 */}
            <div className="bg-[#FAF9F6] p-5 rounded-lg border border-[#C5A059]/20 text-center hover:shadow-md transition">
              <span className="block text-2xl font-serif font-black text-[#800020] mb-1">IRYO</span>
              <span className="block text-xs uppercase tracking-widest text-[#1C1C1C]/60 font-semibold">Clase Infinita</span>
            </div>

            {/* Card 4 */}
            <div className="bg-[#FAF9F6] p-5 rounded-lg border border-[#C5A059]/20 text-center hover:shadow-md transition">
              <span className="block text-2xl font-serif font-black text-[#800020] mb-1">Exclusivo</span>
              <span className="block text-xs uppercase tracking-widest text-[#1C1C1C]/60 font-semibold">Recitales y Guía</span>
            </div>

            {/* Card 5 */}
            <div className="bg-[#FAF9F6] p-5 rounded-lg border border-[#C5A059]/20 text-center hover:shadow-md transition">
              <span className="block text-2xl font-serif font-black text-[#800020] mb-1">14 Plazas</span>
              <span className="block text-xs uppercase tracking-widest text-[#1C1C1C]/60 font-semibold">Máximo de Grupo</span>
            </div>

            {/* Card 6 */}
            <div className="bg-[#FAF9F6] p-5 rounded-lg border border-[#c5a059]/25 text-center hover:shadow-md transition">
              <span className="block text-2xl font-serif font-black text-[#2E5A44] mb-1">2.770 €</span>
              <span className="block text-xs uppercase tracking-widest text-[#1C1C1C]/60 font-semibold">Todo incluido *</span>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Introducción Emocional */}
      <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center scroll-mt-24">
        <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold block mb-3">
          La Barcelona Modernista
        </span>
        <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#800020] mb-8">
          La Barcelona Modernista
        </h2>

        <div className="space-y-6 text-base sm:text-lg text-[#1C1C1C]/80 leading-relaxed text-justify sm:text-center">
          <p>
            Si hay una ciudad vinculada al Modernismo y a la renovación musical de principios del siglo XX, ésa es Barcelona. Su Recinto Modernista de Sant Pau, el Palau de la Música Catalana y la singular Casa Vicens son testimonios excepcionales de una época de esplendor sin precedentes en Cataluña.
          </p>
          <p>
            Y fue en Barcelona donde Manuel de Falla estrechó importantes lazos artísticos, colaborando estrechamente en el estreno de obras clave y compartiendo el auge cultural catalán. El festival destaca este extraordinario vínculo cultural en el marco inigualable de salas diseñadas por Domènech i Montaner y Antoni Gaudí.
          </p>
        </div>

        <blockquote className="mt-12 p-8 border border-[#E9C168] bg-[#E9C168]/5 rounded-xl text-left relative overflow-hidden">
          <span className="absolute -top-10 -left-6 font-serif text-[180px] text-[#E9C168]/15 leading-none select-none">“</span>
          <p className="font-serif italic text-lg sm:text-xl text-[#800020] relative z-10">
            El Palau de la Música de Barcelona es uno de los pocos templos en el mundo donde la arquitectura y el sonido son una misma obra de arte.
          </p>
          <cite className="block text-xs uppercase tracking-wider text-[#C5A059] font-bold mt-4 font-sans not-italic">
            — Antoni Gaudí, Arquitecto
          </cite>
        </blockquote>
      </section>

      {/* 5. El Eje Histórico del Viaje */}
      <section className="py-24 bg-white border-y border-[#C5A059]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header & Text */}
          <div className="max-w-4xl mx-auto text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold block mb-4">
              El Modernismo Catalán y el Universo de Manuel de Falla
            </span>
            <div className="space-y-4 text-sm sm:text-base text-[#1C1C1C]/75 leading-relaxed text-justify sm:text-center">
              <p>
                A finales del s. XIX y con una duración aproximada de 30 años, aparece en Cataluña un movimiento con afán de regeneración cultural centrado principalmente en la arquitectura, aunque no sólo en ella. La Exposición Universal de Barcelona que tuvo lugar en 1888, impulsó este movimiento al servir como laboratorio de pruebas para todo lo que vendría después. Dicha exposición, a la cual pertenecen el Monumento a Colón o el Arco del Triunfo, dio lugar a una expresión propia de la actividad artística. Es el Modernismo Catalán.
              </p>
              <p>
                Antoni Gaudí, Josep Puig i Cadafalch o Lluís Domènech i Montaner, arquitectos; Josep Llimona, Miquel Blay o Enric Clarasó, escultores; o Ramon Casas, Santiago Rusiñol, e incluso el mismo Pablo Picasso, pintores, forman parte de esta corriente que tuvo como uno de sus puntos de encuentro más emblemáticos el café Els Quatre Gats. Un grupo social privilegiado construyó su nuevo edificio en el Eixample como un signo de distinción.
              </p>
              <p>
                Más entrado ya el s. XX, a nivel musical, Manuel de Falla tuvo una estrecha relación con Barcelona. Una vez finalizada su etapa andaluza, muchas de sus últimas obras se estrenaron aquí: Psyché (Palau de la Música Catalana, 1925), Concerto para clave y cinco instrumentos (Asociación de Música de Cámara -Palau de la Música Catalana-, 1926) o su obra póstuma Atlántida (Gran Teatre del Liceu, 1961, versión de concierto).
              </p>
            </div>
          </div>

          {/* Grid Layout: Video on the left, Photos on the right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch mt-12">

            {/* Video Container (Left Column) */}
            <div className="flex flex-col justify-center">
              <div className="bg-white p-2.5 sm:p-3 rounded-xl border border-[#C5A059]/25 shadow-xl shadow-[#800020]/5 hover:shadow-2xl transition duration-500 font-sans w-full">
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black/5 border border-stone-200">
                  <video
                    src="/videos/prologo.mp4"
                    poster="/imagenes/prologo/monumentoacolon0_cieloazul.jpg"
                    controls
                    playsInline
                    className="w-full h-full object-cover select-none"
                  />
                </div>
                <div className="mt-4 text-center space-y-1 select-none border-t border-[#C5A059]/10 pt-4">
                  <p className="font-serif italic font-bold text-[#800020] text-sm sm:text-base">
                    "Prolegómenos La Barcelona Modernista"
                  </p>
                  <p className="tracking-widest uppercase text-[9px] sm:text-[10px] text-stone-500 font-semibold">
                    Prolegómenos La Barcelona Modernista
                  </p>
                </div>
              </div>
            </div>

            {/* Gallery (Right Column) */}
            <div>
              <PrologoGallery />
            </div>

          </div>
        </div>
      </section>

      {/* 6. Itinerario Día por Día */}
      <section id="itinerario" className="py-24 bg-[#FAF9F6] scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold block mb-2">
              Programa Oficial
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#800020]">
              El Itinerario Musical Detallado
            </h2>
            <p className="text-sm text-[#1C1C1C]/60 mt-3 max-w-xl mx-auto">
              Descubra la planificación meticulosa del viaje, con horarios reales y accesos exclusivos.
            </p>
          </div>

          <ItineraryTimeline videosExist={videosExist} />
        </div>
      </section>

      {/* 7. Experiencias Destacadas */}
      <section className="py-24 bg-white border-y border-[#C5A059]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold block mb-2">
              Privilegios del Viaje
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#800020]">
              Experiencias Culturales Exclusivas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Block 1 */}
            <div className="text-center p-6 border border-stone-100 rounded-lg hover:border-[#C5A059]/30 hover:shadow-md transition">
              <div className="w-12 h-12 bg-[#800020]/10 flex items-center justify-center rounded-full text-[#800020] mx-auto mb-4">
                <Compass className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-bold text-[#800020] mb-2">La Barcelona Modernista</h4>
              <p className="text-xs sm:text-sm text-[#1C1C1C]/70 leading-relaxed">
                Descubra la arquitectura onírica del Park Güell, la Sagrada Familia o el Palau de la Música Catalana de Domènech i Montaner.
              </p>
            </div>

            {/* Block 2 */}
            <div className="text-center p-6 border border-stone-100 rounded-lg hover:border-[#C5A059]/30 hover:shadow-md transition">
              <div className="w-12 h-12 bg-[#800020]/10 flex items-center justify-center rounded-full text-[#800020] mx-auto mb-4">
                <Music className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-bold text-[#800020] mb-2">Espacios Singulares</h4>
              <p className="text-xs sm:text-sm text-[#1C1C1C]/70 leading-relaxed">
                Conciertos en el icónico Palau de la Música Catalana, el acogedor Petit Palau y la gran sala sinfónica de L'Auditori de Barcelona.
              </p>
            </div>

            {/* Block 3 */}
            <div className="text-center p-6 border border-stone-100 rounded-lg hover:border-[#C5A059]/30 hover:shadow-md transition">
              <div className="w-12 h-12 bg-[#800020]/10 flex items-center justify-center rounded-full text-[#800020] mx-auto mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-bold text-[#800020] mb-2">Gourmet Seleccionado</h4>
              <p className="text-xs sm:text-sm text-[#1C1C1C]/70 leading-relaxed">
                Almuerzos en espacios artísticos y gastronómicos como El Cercle, Lincoln 32, el Palace Barcelona y una comida marinera en Cadaqués.
              </p>
            </div>

            {/* Block 4 */}
            <div className="text-center p-6 border border-stone-100 rounded-lg hover:border-[#C5A059]/30 hover:shadow-md transition">
              <div className="w-12 h-12 bg-[#800020]/10 flex items-center justify-center rounded-full text-[#800020] mx-auto mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-lg font-bold text-[#800020] mb-2">Grupo Selecto de 14</h4>
              <p className="text-xs sm:text-sm text-[#1C1C1C]/70 leading-relaxed">
                Una experiencia sumamente íntima y cuidada con acompañamiento experto desde Madrid para asegurar máxima atención al detalle.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Galería / Atmósfera Visual */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold block mb-2">
              Atmósfera del Viaje
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#800020]">
              Galería de Diapositivas del Itinerario Viaje a Barcelona
            </h2>
          </div>

          <AtmosphereGallery days={atmosphereDays} />
        </div>
      </section>

      {/* 9. Sección de Vídeos del itinerario */}
      <section id="videos" className="py-24 bg-white border-y border-[#C5A059]/20 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold block mb-2">
              Auditorio Virtual
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#800020]">
              Vídeos del Itinerario
            </h2>
            <p className="text-sm text-[#1C1C1C]/60 mt-3 max-w-xl mx-auto">
              Previsualice artísticamente los diferentes hitos y conciertos que articulan el programa de nuestro viaje.
            </p>
          </div>

          <VideoGallery videosExist={videosExist} />
        </div>
      </section>

      {/* 9.5 Sección de Vídeos de Viajes Realizados */}
      <section id="viajes-realizados" className="py-24 bg-[#FAF9F6] border-b border-[#C5A059]/20 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold block mb-2">
              Recuerdos del Ciclo
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#800020]">
              Viajes ya Realizados
            </h2>
            <p className="text-sm text-[#1C1C1C]/60 mt-3 max-w-2xl mx-auto whitespace-pre-line">
              Reviva la atmósfera de nuestras expediciones pasadas a través de los vídeos de recuerdo de cada viaje.
              Cada vez que hacemos un viaje se monta un vídeo como recuerdo. Éstos son un viaje que se hizo a Barcelona en enero de 2026 y el otro es Sevilla del año 2025.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Barcelona Enero 2026 */}
            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition duration-300 flex flex-col">
              <div className="relative aspect-video bg-[#1C1C1C] flex items-center justify-center border-b border-stone-100">
                <video
                  src="/videos/previoabarcelona.mp4"
                  controls
                  className="w-full h-full object-cover"
                  poster="https://images.unsplash.com/photo-1583422409516-2895a77efedd?q=80&w=800&auto=format&fit=crop"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h4 className="font-serif text-lg font-bold text-[#800020]">
                      Barcelona (Enero 2026)
                    </h4>
                    <span className="text-[10px] bg-[#800020]/10 text-[#800020] border border-[#800020]/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider font-sans">
                      Recuerdo
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#1C1C1C]/75 leading-relaxed">
                    Un recorrido completo por los monumentos históricos y recitales exclusivos que disfrutamos durante nuestro viaje de conciertos a Barcelona en enero de 2026.
                  </p>
                </div>
              </div>
            </div>

            {/* Sevilla 2025 */}
            <div className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition duration-300 flex flex-col">
              <div className="relative aspect-video bg-[#1C1C1C] flex items-center justify-center border-b border-stone-100">
                <video
                  src="/videos/viajeprevioasevilla.mp4"
                  controls
                  className="w-full h-full object-cover"
                  poster="https://images.unsplash.com/photo-1549887534-1541e9326642?q=80&w=800&auto=format&fit=crop"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <h4 className="font-serif text-lg font-bold text-[#800020]">
                      Sevilla (Año 2025)
                    </h4>
                    <span className="text-[10px] bg-[#800020]/10 text-[#800020] border border-[#800020]/20 px-2 py-0.5 rounded font-bold uppercase tracking-wider font-sans">
                      Recuerdo
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#1C1C1C]/75 leading-relaxed">
                    Las memorias líricas e históricas de nuestro viaje musical a Sevilla durante el año 2025, recorriendo el patrimonio hispalense.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Precio y Plazas */}
      <section id="precios" className="py-24 scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-white border border-[#C5A059]/30 rounded-xl p-8 sm:p-12 shadow-xl">
          <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold block mb-2">
            Inscripción y Coste
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#800020] mb-6">
            Tarifas y Disponibilidad
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-8 border-y border-stone-100 mb-8 font-sans">
            <div>
              <span className="block text-xs uppercase tracking-wider text-stone-500 mb-1">Precio por Persona</span>
              <span className="font-serif text-4xl sm:text-5xl font-black text-[#800020]">2.770 €</span>
              <span className="block text-xs text-stone-400 mt-1">IVA incluido (en habitación doble estándar)</span>
              <span className="block text-[11px] text-stone-400 font-mono">(Base de 2.290 € + 21% IVA)</span>
            </div>

            <div className="border-t sm:border-t-0 sm:border-l border-stone-150 pt-6 sm:pt-0 sm:pl-8">
              <span className="block text-xs uppercase tracking-wider text-stone-500 mb-1">Suplemento Habitación Individual</span>
              <span className="font-serif text-4xl sm:text-5xl font-black text-[#C5A059]">+515 €</span>
              <span className="block text-xs text-stone-400 mt-1">Sujeto a disponibilidad del Hotel Petit Palace Boquería Garden 4*</span>
            </div>
          </div>

          <div className="space-y-4 max-w-xl mx-auto text-sm text-[#1C1C1C]/85">
            <div className="flex justify-between items-center sm:px-12">
              <span className="font-semibold text-left">Participantes mínimos requeridos:</span>
              <span className="font-bold text-[#800020]">12 personas</span>
            </div>
            <div className="flex justify-between items-center sm:px-12">
              <span className="font-semibold text-left">Capacidad límite máxima permitida:</span>
              <span className="font-bold text-[#800020]">14 personas</span>
            </div>
            <div className="flex justify-between items-center sm:px-12">
              <span className="font-semibold text-left">Fecha límite de inscripción:</span>
              <span className="font-bold text-[#800020] uppercase">Miércoles, 2 de septiembre de 2026</span>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-stone-100 text-xs text-stone-500">
            <p className="italic">
              * Nota: Reserva sujeta a disponibilidad de plazas físicas. El trayecto se confirmará en firme una vez alcanzado el cupo mínimo de 12 personas.
            </p>
          </div>
        </div>
      </section>

      {/* 11. Qué Incluye / Qué No Incluye */}
      <section id="incluye" className="py-24 bg-white border-y border-[#C5A059]/20 scroll-mt-24 font-sans">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold block mb-2">
              Transparencia y Condiciones
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#800020]">
              Detalle de Coberturas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

            {/* Column 1 - Qué incluye */}
            <div className="bg-[#FAF9F6] p-8 rounded-xl border border-[#2E5A44]/15">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#2E5A44] border-b border-stone-200 pb-3 mb-6 flex items-center">
                ✓ El precio incluye
              </h3>

              <ul className="space-y-4 text-xs sm:text-sm text-[#1C1C1C]/80">
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#2E5A44] shrink-0 mr-3 mt-0.5" />
                  <span>Tren IRYO Madrid-Barcelona-Madrid, plazas clase Infinita Bistró (pequeño menú incluido). Traslados al hotel y a la estación de Barcelona-Sants.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#2E5A44] shrink-0 mr-3 mt-0.5" />
                  <span>Hotel Petit Palace Boquería Garden (4*), durante cinco noches en régimen de alojamiento y desayuno buffet.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#2E5A44] shrink-0 mr-3 mt-0.5" />
                  <span>Entradas y visitas guiadas a todos los monumentos referidos en el Itinerario.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#2E5A44] shrink-0 mr-3 mt-0.5" />
                  <span>Entradas para la ópera I Capuleti e i Montecchi, así como para los cuatro conciertos (ver itinerario).</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#2E5A44] shrink-0 mr-3 mt-0.5" />
                  <span>Cinco almuerzos en cinco singulares restaurantes de Barcelona (ver itinerario).</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#2E5A44] shrink-0 mr-3 mt-0.5" />
                  <span>Guía acompañante desde Madrid Puerta de Atocha hasta el regreso a la misma estación.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#2E5A44] shrink-0 mr-3 mt-0.5" />
                  <span>Guía local durante las visitas a prácticamente todos los monumentos (ver itinerario).</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#2E5A44] shrink-0 mr-3 mt-0.5" />
                  <span>Servicio de taxis, metro y/o autobuses de línea para los distintos traslados dentro de la ciudad que lo requieran.</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#2E5A44] shrink-0 mr-3 mt-0.5" />
                  <span>Seguro de asistencia y cancelación.</span>
                </li>
              </ul>
            </div>

            {/* Column 2 - Qué no incluye */}
            <div className="bg-[#FAF9F6] p-8 rounded-xl border border-[#800020]/15">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#800020] border-b border-stone-200 pb-3 mb-6 flex items-center">
                ✗ El precio no incluye
              </h3>

              <ul className="space-y-4 text-xs sm:text-sm text-[#1C1C1C]/80">
                <li className="flex items-start">
                  <span className="w-5 h-5 bg-[#800020]/10 rounded-full text-[#800020] font-bold text-center flex items-center justify-center shrink-0 mr-3 mt-0.5 text-xs">-</span>
                  <span>Cenas.</span>
                </li>
                <li className="flex items-start">
                  <span className="w-5 h-5 bg-[#800020]/10 rounded-full text-[#800020] font-bold text-center flex items-center justify-center shrink-0 mr-3 mt-0.5 text-xs">-</span>
                  <span>Gastos extras generados en el hotel y en el tren IRYO.</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* 12. Formulario de Reserva */}
      <section id="reserva" className="py-24 bg-[#FAF9F6] scroll-mt-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[#C5A059] font-bold block mb-2">
              Solicitud de Admisión
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#800020]">
              Inscribirse en el Itinerario
            </h2>
            <p className="text-xs sm:text-sm text-[#1C1C1C]/65 mt-3">
              Actualmente disponemos de <strong className="text-[#800020]">{remainingPlazas} plaza(s) libres</strong> de un cupo de 14.
            </p>
          </div>

          <BookingForm initialAvailablePlazas={remainingPlazas} />
        </div>
      </section>

      {/* 13. Datos Directos de Contacto */}
      <section className="py-24 bg-white border-t border-[#C5A059]/25 text-center font-sans">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-bold block mb-2">
            Atención Especializada
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#800020] mb-4">
            ¿Tiene alguna consulta antes de reservar?
          </h2>
          <p className="text-xs sm:text-sm text-[#1C1C1C]/70 max-w-xl mx-auto mb-10">
            Póngase en contacto directamente con la secretaría organizadora del Ciclo de Conciertos Manuel de Falla. Estaremos encantados de resolver sus preguntas sobre el viaje cultural.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-8 text-sm sm:text-base font-semibold">

            <a
              href="mailto:jose_manuel_hdezblanco@hotmail.com"
              className="inline-flex items-center justify-center px-6 py-3.5 border border-[#800020]/20 rounded-md text-[#800020] bg-[#800020]/5 hover:bg-[#800020]/10 transition shadow-sm"
            >
              <Mail className="w-5 h-5 mr-2 text-[#800020]" />
              jose_manuel_hdezblanco@hotmail.com
            </a>

            <a
              href="tel:660957863"
              className="inline-flex items-center justify-center px-6 py-3.5 border border-[#2E5A44]/20 rounded-md text-[#2E5A44] bg-[#2E5A44]/5 hover:bg-[#2E5A44]/10 transition shadow-sm"
            >
              <Phone className="w-5 h-5 mr-2 text-[#2E5A44]" />
              +34 660 957 863
            </a>

          </div>
        </div>
      </section>

      {/* 14. Footer Elegante */}
      <footer className="bg-[#1C1C1C] text-white py-12 font-sans border-t-2 border-[#C5A059]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-10 border-b border-white/10">

            {/* Left brand column */}
            <div className="text-center md:text-left">
              <h3 className="font-serif text-lg font-bold text-[#E9C168]">
                La Barcelona Modernista
              </h3>
              <p className="text-xs text-white/50 mt-1 max-w-sm">
                Organizado en exclusividad por el Ciclo de conciertos Manuel de Falla. Acordes de principios del siglo XX bajo la maravillosa luz del modernismo catalán.
              </p>
            </div>

            {/* Right actions links */}
            <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold uppercase tracking-wider">
              <a
                href="/docs/programa-barcelona-modernista.pdf"
                download="programa-barcelona-modernista.pdf"
                className="px-4 py-2 border border-white/20 hover:border-[#E9C168] rounded text-white/80 hover:text-[#E9C168] transition"
              >
                Descargar programa PDF
              </a>
              <a
                href="#reserva"
                className="px-4 py-2 bg-[#800020] hover:bg-[#800020]/90 border border-transparent rounded text-white transition"
              >
                Inscribirse al viaje
              </a>
            </div>

          </div>

          {/* Bottom rights info */}
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/40">
            <p>
              © {new Date().getFullYear()} Ciclo de conciertos Manuel de Falla. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <span className="hover:text-white transition cursor-pointer">Inscripción</span>
              <span className="hover:text-white transition cursor-pointer">Privacidad y Cookies</span>
              <span className="hover:text-white transition cursor-pointer">Términos Generales</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
