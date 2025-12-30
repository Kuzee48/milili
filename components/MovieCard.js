"use client";
import Link from "next/link";

/**
 * Komponen MovieCard JOKERBOX
 * Digunakan untuk menampilkan thumbnail drama dengan efek hover Winter.
 */
export default function MovieCard({ book }) {
  // Verifikasi data untuk menghindari error rendering
  if (!book) return null;

  return (
    <Link href={`/detail/${book.book_id}`} className="group block">
      {/* Container Gambar dengan Efek Frosty */}
      <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl transition-all duration-500 group-hover:scale-105 group-hover:border-cyan-500/50 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]">
        
        {/* Gambar Thumbnail */}
        <img 
          src={book.thumb_url} 
          alt={book.book_name} 
          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
          loading="lazy"
        />

        {/* Overlay saat Hover (Gradient Salju) */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_8px_#22d3ee]"></span>
            <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-widest">
              Tonton Sekarang
            </span>
          </div>
        </div>

        {/* Badge Status (Opsional, jika ada data status) */}
        {book.show_creation_status && (
          <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10">
            <span className="text-[10px] font-bold text-slate-200">
              {book.show_creation_status}
            </span>
          </div>
        )}
      </div>

      {/* Judul Drama */}
      <h3 className="mt-3 text-sm font-semibold text-slate-200 line-clamp-2 group-hover:text-cyan-400 transition-colors duration-300 leading-snug">
        {book.book_name}
      </h3>
      
      {/* Informasi Tambahan (Source/Genre) */}
      <p className="mt-1 text-[11px] text-slate-500 font-medium uppercase tracking-tighter">
        {book.source || "JOKERBOX Original"}
      </p>
    </Link>
  );
}
