import { getDetail } from "@/lib/api";
import Link from "next/link";
import { List } from "lucide-react";

export default async function DetailPage({ params }) {
  const { id } = params;
  const response = await getDetail(id);
  const data = response.data.video_data;

  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="flex flex-col md:flex-row gap-10 items-start">
        {/* Poster Drama */}
        <div className="w-full md:w-72 shrink-0 shadow-2xl shadow-cyan-500/10 rounded-3xl overflow-hidden border border-white/10">
          <img src={data.series_cover} alt={data.series_title} className="w-full" />
        </div>
        
        <div className="flex-1">
          <h1 className="text-4xl font-black mb-4 text-white drop-shadow-md">{data.series_title}</h1>
          
          {/* Tag Kategori */}
          <div className="flex flex-wrap gap-2 mb-6">
            {JSON.parse(data.category_schema).map(cat => (
              <span key={cat.category_id} className="text-xs font-bold px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300">
                {cat.name}
              </span>
            ))}
          </div>

          <p className="text-slate-400 leading-relaxed text-lg mb-8 italic">"{data.series_intro}"</p>
          
          {/* Grid Episode */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
            <h2 className="flex items-center gap-2 text-xl font-bold mb-6 text-cyan-400">
              <List className="w-5 h-5" /> Daftar Episode
            </h2>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
              {data.video_list.map((ep) => (
                <Link 
                  href={`/play/${ep.vid}`} 
                  key={ep.vid}
                  className="aspect-square flex items-center justify-center rounded-xl bg-slate-800 hover:bg-cyan-600 hover:scale-110 transition-all font-bold text-sm border border-white/5 shadow-lg"
                >
                  {ep.vid_index}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
