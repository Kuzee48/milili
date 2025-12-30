// WAJIB: Memaksa halaman untuk selalu dirender secara dinamis di server
export const dynamic = 'force-dynamic';

import { getTrending, getLatests } from "@/lib/api";
import MovieCard from "@/components/MovieCard";

/**
 * Halaman Utama JOKERBOX
 * Menggunakan data dari API Trending dan Latest dengan proteksi data penuh.
 */
export default async function Home() {
  let trendingData = [];
  let latestsData = [];

  try {
    // Memanggil API secara paralel untuk kecepatan maksimal
    const [trendingRes, latestsRes] = await Promise.all([
      getTrending(),
      getLatests()
    ]);

    // Proteksi data: pastikan mengambil array 'books' atau default ke array kosong
    trendingData = trendingRes?.books || trendingRes?.data?.books || [];
    latestsData = latestsRes?.books || latestsRes?.data?.books || [];
  } catch (error) {
    console.error("Gagal memuat data di Halaman Utama JOKERBOX:", error);
  }

  return (
    <main className="min-h-screen">
      {/* Section Drama Populer */}
      <section className="mb-14 px-6 md:px-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-8 w-1.5 bg-cyan-400 rounded-full shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
          <h2 className="text-2xl font-bold tracking-tight text-white">Drama Populer</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
          {trendingData.length > 0 ? (
            trendingData.map((book) => (
              <MovieCard key={book.book_id} book={book} />
            ))
          ) : (
            <div className="col-span-full py-10 text-center bg-white/5 rounded-2xl border border-dashed border-white/10">
              <p className="text-slate-500 italic text-sm">Tidak ada drama populer yang ditemukan saat ini.</p>
            </div>
          )}
        </div>
      </section>

      {/* Section Rilis Baru */}
      <section className="mb-14 px-6 md:px-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-8 w-1.5 bg-cyan-400 rounded-full shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
          <h2 className="text-2xl font-bold tracking-tight text-white">Rilis Baru</h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
          {latestsData.length > 0 ? (
            latestsData.map((book) => (
              <MovieCard key={book.book_id} book={book} />
            ))
          ) : (
            <div className="col-span-full py-10 text-center bg-white/5 rounded-2xl border border-dashed border-white/10">
              <p className="text-slate-500 italic text-sm">Belum ada rilis baru untuk saat ini.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
  }
