import { getTrending, getLatests } from "@/lib/api";
import Link from "next/link";

export default async function Home() {
  const trending = await getTrending();
  const latests = await getLatests();

  const Section = ({ title, items }) => (
    <section className="mb-14 px-6 md:px-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-8 w-1.5 bg-cyan-400 rounded-full shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
        {items?.map((book) => (
          <Link href={`/detail/${book.book_id}`} key={book.book_id} className="group">
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/5 bg-slate-900 shadow-2xl transition-all duration-300 group-hover:scale-105 group-hover:border-cyan-500/50">
              <img 
                src={book.thumb_url} 
                className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" 
                alt={book.book_name} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <span className="text-xs text-cyan-300 font-bold uppercase tracking-wider">Tonton Sekarang</span>
              </div>
            </div>
            <h3 className="mt-4 text-sm font-semibold text-slate-200 line-clamp-2 group-hover:text-cyan-400 transition-colors">
              {book.book_name}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );

  return (
    <>
      <Section title="Drama Populer" items={trending.data.books} />
      <Section title="Rilis Baru" items={latests.data.books} />
    </>
  );
}
