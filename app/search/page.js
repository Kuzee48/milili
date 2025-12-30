import { searchDramas } from "@/lib/api";
import Link from "next/link";

export default async function SearchPage({ searchParams }) {
  const query = searchParams.q || "";
  const response = await searchDramas(query);
  const results = response.data.search_data || [];

  return (
    <div className="px-6 md:px-12">
      <div className="mb-10">
        <h1 className="text-2xl font-bold">
          Hasil pencarian untuk: <span className="text-cyan-400">"{query}"</span>
        </h1>
        <p className="text-slate-500 text-sm mt-1">Ditemukan {results.length} drama ajaib</p>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {results.map((item) => {
            const book = item.books[0];
            return (
              <Link href={`/detail/${book.book_id}`} key={book.book_id} className="group">
                <div className="aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 bg-slate-900 transition-all group-hover:border-cyan-500 shadow-lg">
                  <img 
                    src={book.thumb_url} 
                    alt={book.book_name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                </div>
                <h3 className="mt-3 text-sm font-semibold truncate group-hover:text-cyan-400 transition-colors">
                  {book.book_name}
                </h3>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
          <p className="text-slate-400 italic">Maaf, JOKERBOX tidak menemukan drama tersebut di bawah salju...</p>
        </div>
      )}
    </div>
  );
        }
