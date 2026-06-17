import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Seo from "./Seo";
import { COLLECTIONS, COLLECTION_META, type CollectionKey } from "../content/collections";

export default function CollectionList({ collection }: { collection: CollectionKey }) {
  const meta = COLLECTION_META[collection];
  const items = COLLECTIONS[collection] ?? [];

  return (
    <main className="relative min-h-screen pt-24 pb-20">
      <div className="absolute top-20 left-10 w-96 h-96 bg-neon-pink-bright/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-neon-blue-bright/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <Seo title={meta.title} description={meta.description} path={`${meta.path}/`} />

        <Link
          to="/"
          className="group inline-flex items-center space-x-2 text-slate-400 hover:text-neon-pink-bright transition-colors text-sm font-medium font-mono mb-8"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>QUAY LẠI TRANG CHỦ</span>
        </Link>

        <header className="mb-12 max-w-3xl">
          <span className="font-mono text-xs text-neon-blue-bright uppercase tracking-widest font-bold">
            {meta.eyebrow}
          </span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-white mt-2 tracking-tight">
            {meta.heading}
          </h1>
          <p className="text-slate-400 mt-4 leading-relaxed">{meta.description}</p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Link
              key={item.slug}
              to={item.url}
              className="group bg-glass rounded-2xl border border-white/10 overflow-hidden hover:border-neon-pink/40 transition-all hover:-translate-y-1"
            >
              {item.image && (
                <div className="aspect-video overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}
              <div className="p-5">
                <h2 className="font-display font-bold text-white text-base leading-snug line-clamp-2">
                  {item.title}
                </h2>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed line-clamp-3">
                  {item.excerpt}
                </p>
                <span className="inline-flex items-center gap-1.5 text-neon-blue-bright text-xs font-mono font-bold mt-4 group-hover:gap-2.5 transition-all">
                  XEM CHI TIẾT <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
