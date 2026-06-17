import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Seo from "./Seo";
import { COLLECTION_META, type CollectionItem as Item } from "../content/collections";

export default function CollectionItem({ item }: { item: Item }) {
  const meta = COLLECTION_META[item.collection as keyof typeof COLLECTION_META];

  return (
    <main className="relative min-h-screen pt-24 pb-20">
      <div className="absolute top-20 left-10 w-96 h-96 bg-neon-pink-bright/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-96 h-96 bg-neon-blue-bright/5 rounded-full blur-[120px] pointer-events-none" />

      <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Seo
          title={`${item.title} | Happy Smart Light`}
          description={item.excerpt}
          path={item.url}
          image={item.image || item.bigimg}
        />

        <nav className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-6">
          <Link to="/" className="hover:text-neon-pink-bright transition-colors">Trang chủ</Link>
          <span>/</span>
          <Link to={`${meta.path}/`} className="hover:text-neon-pink-bright transition-colors">
            {meta.heading}
          </Link>
        </nav>

        {item.bigimg && (
          <div className="rounded-2xl overflow-hidden border border-white/10 mb-8">
            <img src={item.bigimg} alt={item.title} className="w-full object-cover" />
          </div>
        )}

        <h1 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight leading-tight mb-6">
          {item.title}
        </h1>

        <div
          className="hsl-prose"
          dangerouslySetInnerHTML={{ __html: item.html }}
        />

        {item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-10 pt-6 border-t border-white/5">
            {item.tags.map((t) => (
              <span
                key={t}
                className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-900 border border-white/10 text-slate-400"
              >
                #{t}
              </span>
            ))}
          </div>
        )}

        <Link
          to={`${meta.path}/`}
          className="group inline-flex items-center space-x-2 text-slate-400 hover:text-neon-pink-bright transition-colors text-sm font-medium font-mono mt-10"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>XEM TẤT CẢ {meta.eyebrow}</span>
        </Link>
      </article>
    </main>
  );
}
