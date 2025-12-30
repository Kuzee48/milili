"use client";
import Link from "next/link";

export default function MovieCard({ book }) {
  if (!book) return null;

  return (
    <Link href={`/detail/${book.book_id}`} className="group relative bg-slate-900/50 rounded-xl overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all duration-300">
      <div className="aspect-[3/4] relative overflow-hidden">
        <img 
          src={book.thumb_url} 
          alt={book.book_name}
          referrerPolicy="no-referrer" // PENTING: Agar gambar tidak pecah/hilang
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
        <div className="absolute bottom-2 left-2 right-2">
          <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-tighter line-clamp-1">
            {book.stat_infos?.[0] || "Drama Populer"}
          </p>
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-bold text-slate-100 line-clamp-1 group-hover:text-cyan-400 transition-colors">
          {book.book_name}
        </h3>
      </div>
    </Link>
  );
}
