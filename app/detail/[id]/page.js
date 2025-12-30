export const dynamic = 'force-dynamic';
import { getDetail } from "@/lib/api";
import Link from "next/link";
import { List, Play } from "lucide-react";

export default async function DetailPage({ params }) {
  const response = await getDetail(params.id);
  const data = response?.data?.video_data;

  if (!data) return <div className="p-10 text-center text-slate-500">Drama menghilang di badai salju...</div>;

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative w-full h-[40vh] md:h-[50vh]">
        <img src={data.series_cover} referrerPolicy="no-referrer" className="w-full h-full object-cover blur-sm opacity-30" alt="" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#020617]" />
        <div className="absolute inset-0 flex flex-col items-center justify-end px-6 pb-6">
          <img src={data.series_cover} referrerPolicy="no-referrer" className="w-32 md:w-44 rounded-xl shadow-2xl border-2 border-white/20 mb-4" alt={data.series_title} />
          <h1 className="text-2xl md:text-4xl font-black text-center text-white">{data.series_title}</h1>
        </div>
      </div>

      {/* Konten */}
      <div className="px-6 max-w-4xl mx-auto mt-6">
        <p className="text-slate-400 text-sm text-center italic mb-8">"{data.series_intro}"</p>
        
        <div className="bg-slate-900/50 backdrop-blur-md rounded-3xl p-6 border border-white/5">
          <h2 className="flex items-center gap-2 text-lg font-bold mb-6 text-cyan-400">
            <List className="w-5 h-5" /> Daftar Episode ({data.episode_cnt})
          </h2>
          <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
            {(data.video_list || []).map((ep) => (
              <Link 
                href={`/play/${ep.vid}`} 
                key={ep.vid}
                className="aspect-square flex items-center justify-center rounded-lg bg-white/5 hover:bg-cyan-600 transition-all font-bold text-white text-xs border border-white/10"
              >
                {ep.vid_index}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
