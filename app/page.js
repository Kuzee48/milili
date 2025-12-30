import { getTrending, getLatests } from "@/lib/api";
import MovieCard from "@/components/MovieCard";

/**
 * Halaman Utama JOKERBOX
 * Menampilkan bagian Trending dan Rilis Baru dengan proteksi data (Optional Chaining).
 */
export default async function Home() {
  let trendingData = [];
  let latestsData = [];

  try {
    // Memanggil API melalui server-side rendering
    const [trendingRes, latestsRes] = await Promise.all([
      getTrending(),
      getLatests()
    ]);

    // Menggunakan optional chaining untuk mengamankan pengambilan array buku
    trendingData = trendingRes?.data?.books || [];
    latestsData = latestsRes?.data?.books || [];
  } catch (error) {
    console.error("Gagal memuat data di Halaman Utama:", error);
  }

  const Section = ({ title, items }) => (
    <section className="mb-14 px-6 md:px-12">
      <div className="flex items-center gap-3 mb-8">
        {/* Dekorasi Branding Winter JOKERBOX */}
        <div className="h-8 w-1.5 bg-cyan-400 rounded-full shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      </div>

      {/* Grid Container dengan proteksi jika data kosong */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8">
        {items && items.length > 0 ? (
          items.map((book) => (
            <MovieCard key={book.book_id} book={book} />
          ))
        ) : (
          <div className="col-span-full py-10 text-center bg-white/5 rounded-2xl border border-dashed border-white/10">
            <p className="text-slate-500 italic text-sm">
              Sepertinya salju menutupi daftar ini. Silakan coba segarkan halaman.
            </p>
          </div>
        )}
      </div>
    </section>
  );

  return (
    <>
      {/* Bagian Hero atau Banner (Opsional) bisa ditambahkan di sini */}
      <main className="min-h-screen">
        <Section title="Drama Populer" items={trendingData} />
        <Section title="Rilis Baru" items={latestsData} />
      </main>
    </>
  );
}
