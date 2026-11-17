import { useCallback, useEffect, useRef, useState } from "react";

// Minh hoạ cửa sổ Live view của Tool ARGB HSL (tab Timecode → 📺 Live view): LED giả lập,
// bấm chip mạch, đổi bố cục, bật khung phân đoạn, bấm tên mạch để phóng to.

type Board = {
  id: string;
  name: string;
  ip: string;
  kind: "matrix" | "strip";
  w?: number;
  h?: number;
  ports?: number[];
  sample?: number;
  on: boolean;
  offline?: boolean;
  src?: boolean;
  eye?: boolean;
  fx: "plasma" | "fire" | "none";
  fps: number;
  segs: [string, number, number, number?, number?][];
};

const BOARDS: Board[] = [
  {
    id: "a", name: "ARGB 16X", ip: "192.168.0.130", kind: "matrix", w: 16, h: 16, on: true, src: true, eye: true,
    segs: [["Giáp đầu", 0, 8, 0, 8], ["Giáp ngực", 8, 16, 0, 8], ["Giáp lưng", 0, 8, 8, 16], ["Giáp hông", 8, 16, 8, 16]],
    fx: "plasma", fps: 31,
  },
  {
    id: "b", name: "4X Sân khấu", ip: "192.168.0.142", kind: "strip", ports: [30, 30, 30, 30], on: true, fx: "fire", fps: 42,
    segs: [["Cột trái", 0, 30], ["Cột phải", 30, 60], ["Viền dưới", 60, 120]],
  },
  { id: "c", name: "16X Màn LED", ip: "192.168.0.150", kind: "matrix", w: 128, h: 64, sample: 4, on: false, fx: "none", fps: 24, segs: [] },
  { id: "d", name: "2X Pro POI", ip: "192.168.0.21", kind: "strip", ports: [72], on: false, offline: true, fx: "none", fps: 0, segs: [] },
];

type Cols = "auto" | "1" | "2" | "3";

const hsv = (h: number, s: number, v: number): [number, number, number] => {
  const f = (n: number) => {
    const k = (n + h * 6) % 6;
    return v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  };
  return [f(5), f(3), f(1)];
};

function colour(b: Board, x: number, y: number, t: number, i: number): [number, number, number] {
  if (!b.on || b.offline) return [0.04, 0.04, 0.05];
  if (b.fx === "plasma") {
    const v = Math.sin(x * 0.45 + t) + Math.sin(y * 0.38 - t * 1.3) + Math.sin((x + y) * 0.25 + t * 0.7);
    return hsv((v / 6 + t * 0.05 + 1) % 1, 1, 0.95);
  }
  if (b.fx === "fire") {
    const heat = Math.max(0, Math.sin(i * 0.9 + t * 7 + y) * 0.35 + 0.65 - (x % 30) / 45 + Math.random() * 0.15);
    return [Math.min(1, heat * 1.3), Math.min(1, heat * heat * 0.75), heat > 0.9 ? 0.3 : 0];
  }
  return [0.04, 0.04, 0.05];
}

type Geo = { cw: number; ch: number; pitch: number; dpr: number };

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  if (typeof ctx.roundRect === "function") ctx.roundRect(x, y, w, h, r);
  else ctx.rect(x, y, w, h);
  ctx.fill();
}

function drawBoard(canvas: HTMLCanvasElement, b: Board, g: Geo, t: number, segsOn: boolean) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  const ports = b.ports ?? [];
  const pitch = g.pitch * g.dpr;
  const rowH = b.kind === "strip" ? pitch * 1.6 : pitch;
  ctx.fillStyle = "#07090c";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  const r = Math.max(1, pitch * 0.18);
  const size = pitch * 0.82;
  for (let y = 0; y < g.ch; y++) {
    const rowLen = b.kind === "strip" ? ports[y] : g.cw;
    for (let x = 0; x < rowLen; x++) {
      const i = b.kind === "strip" ? ports.slice(0, y).reduce((a, v) => a + v, 0) + x : y * g.cw + x;
      const [cr, cg, cb] = colour(b, x, y, t, i);
      ctx.fillStyle = `rgb(${(cr * 255) | 0},${(cg * 255) | 0},${(cb * 255) | 0})`;
      roundRect(ctx, x * pitch + (pitch - size) / 2, y * rowH + (rowH - size) / 2, size, size, r);
    }
  }
  if (!segsOn || !b.segs.length) return;
  ctx.lineWidth = Math.max(1, g.dpr * 1.5);
  ctx.font = `${Math.round(10 * g.dpr)}px Segoe UI, sans-serif`;
  ctx.textBaseline = "top";
  b.segs.forEach((sg, k) => {
    let x0: number, x1: number, y0: number, y1: number;
    if (b.kind === "matrix") {
      x0 = sg[1] * pitch; x1 = sg[2] * pitch; y0 = (sg[3] ?? 0) * rowH; y1 = (sg[4] ?? 1) * rowH;
    } else {
      const s0 = sg[1], s1 = sg[2];
      let acc = 0, ry = 0;
      while (ry < ports.length && s0 >= acc + ports[ry]) { acc += ports[ry]; ry++; }
      x0 = (s0 - acc) * pitch; y0 = ry * rowH;
      let ey = ry, eacc = acc;
      while (ey < ports.length - 1 && s1 > eacc + ports[ey]) { eacc += ports[ey]; ey++; }
      x1 = ey === ry ? (s1 - acc) * pitch : Math.max(...ports) * pitch;
      y1 = (ey + 1) * rowH;
    }
    const eye = !!b.eye && k === 1;
    ctx.strokeStyle = eye ? "rgba(79,209,232,.95)" : "rgba(255,255,255,.55)";
    ctx.setLineDash(eye ? [] : [5 * g.dpr, 4 * g.dpr]);
    ctx.strokeRect(x0 + 1, y0 + 1, x1 - x0 - 2, y1 - y0 - 2);
    const label = (eye ? "👁 " : "") + sg[0];
    const tw = ctx.measureText(label).width + 8 * g.dpr;
    ctx.setLineDash([]);
    ctx.fillStyle = "rgba(8,10,14,.78)";
    ctx.fillRect(x0 + 3 * g.dpr, y0 + 3 * g.dpr, tw, 14 * g.dpr);
    ctx.fillStyle = eye ? "#c9f6ff" : "#eef3fb";
    ctx.fillText(label, x0 + 7 * g.dpr, y0 + 4.5 * g.dpr);
  });
}

const btn = "text-[12px] text-slate-200 bg-[#1b212b] border border-[#333b4a] rounded-lg px-2.5 py-1 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-300";
const btnOn = "!bg-[#22344a] !border-[#4f8de3] text-white";

function Dot({ b }: { b: Board }) {
  const c = b.offline ? "bg-[#e64545]" : b.on ? "bg-[#3ec76e]" : "bg-[#6b7280]";
  return <span className={`inline-block w-2 h-2 rounded-full ${c}`} />;
}

export default function LiveViewDemo() {
  const [shown, setShown] = useState<string[]>(["a", "b"]);
  const [cols, setCols] = useState<Cols>("auto");
  const [segsOn, setSegsOn] = useState(true);
  const [size, setSize] = useState(100);
  const [pin, setPin] = useState(true);
  const [focus, setFocus] = useState<string | null>(null);
  const [narrow, setNarrow] = useState(false);       // màn hẹp (điện thoại): luôn 1 cột
  const stageRef = useRef<HTMLDivElement>(null);
  const canvases = useRef<Record<string, HTMLCanvasElement | null>>({});
  const geo = useRef<Record<string, Geo>>({});
  const segsRef = useRef(segsOn);
  segsRef.current = segsOn;

  const visible = BOARDS.filter((b) => shown.includes(b.id) && (!focus || focus === b.id));
  const nCols = focus || narrow ? 1 : cols === "auto" ? (visible.length <= 1 ? 1 : visible.length <= 4 ? 2 : 3) : Number(cols);

  const sizeCanvases = useCallback(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const c = nCols;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    for (const b of BOARDS) {
      const cv = canvases.current[b.id];
      if (!cv) continue;
      const maxW = Math.min(1100, (stage.clientWidth - 24 - (c - 1) * 12) / c - 22);
      let cw: number, ch: number, pitch: number;
      if (b.kind === "matrix") {
        cw = b.sample ? (b.w ?? 1) / b.sample : b.w ?? 1;
        ch = b.sample ? (b.h ?? 1) / b.sample : b.h ?? 1;
        pitch = Math.max(3, Math.min(26, Math.floor(maxW / cw))) * (size / 100);
      } else {
        const ports = b.ports ?? [1];
        cw = Math.max(...ports);
        ch = ports.length;
        pitch = Math.max(3, Math.min(22, Math.floor(maxW / cw))) * (size / 100);
      }
      geo.current[b.id] = { cw, ch, pitch, dpr };
      cv.width = Math.round(cw * pitch * dpr);
      cv.height = Math.round(ch * pitch * (b.kind === "strip" ? 1.6 : 1) * dpr);
      cv.style.width = `${Math.round(cw * pitch)}px`;
    }
  }, [nCols, size]);

  useEffect(() => {
    sizeCanvases();
    const stage = stageRef.current;
    if (!stage || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => {
      setNarrow(stage.clientWidth < 560);
      sizeCanvases();
    });
    ro.observe(stage);
    return () => ro.disconnect();
  }, [sizeCanvases, shown, focus]);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = 0;
    let onScreen = true;
    const drawAll = (t: number) => {
      for (const b of BOARDS) {
        const cv = canvases.current[b.id];
        const g = geo.current[b.id];
        if (cv && g && cv.offsetParent !== null) drawBoard(cv, b, g, t, segsRef.current);
      }
    };
    const frame = (ts: number) => {
      if (onScreen && ts - last > 33) { drawAll(ts / 1000); last = ts; }
      raf = requestAnimationFrame(frame);
    };
    drawAll(1.2);
    let io: IntersectionObserver | undefined;
    if (!reduce) {
      if (typeof IntersectionObserver !== "undefined") {
        io = new IntersectionObserver((entries) => { onScreen = entries.some((e) => e.isIntersecting); });
        io.observe(stage);
      }
      raf = requestAnimationFrame(frame);
    }
    return () => { cancelAnimationFrame(raf); io?.disconnect(); };
  }, []);

  useEffect(() => {
    // vẽ lại ngay khi đổi bố cục / cỡ điểm / khung phân đoạn (kể cả khi giảm chuyển động)
    for (const b of BOARDS) {
      const cv = canvases.current[b.id];
      const g = geo.current[b.id];
      if (cv && g) drawBoard(cv, b, g, 1.2, segsOn);
    }
  }, [segsOn, size, nCols, shown, focus]);

  const toggleBoard = (id: string) => {
    setShown((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
    if (focus === id) setFocus(null);
  };

  return (
    <div className="not-prose rounded-[10px] overflow-hidden border border-[#2f3747] bg-[#10141b] shadow-[0_20px_50px_rgba(0,0,0,.45)]" style={{ fontFamily: '"Segoe UI", "Be Vietnam Pro", system-ui, sans-serif' }}>
      <div className="flex items-center gap-2.5 px-3 py-2 bg-[#171c25] border-b border-[#262d3a] text-[12.5px] text-slate-200">
        <span className="font-semibold flex-1">📺 Live view — Tool ARGB HSL</span>
        <button type="button" className={`${btn} ${pin ? "!bg-[#123a44] !border-[#4fd1e8] !text-[#c9f6ff]" : ""}`} aria-pressed={pin} onClick={() => setPin((p) => !p)}>
          📌 Luôn trên cùng
        </button>
        <span className={`${btn} !cursor-default`} aria-hidden>✕</span>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-2 items-center px-3 py-2.5 border-b border-[#222a36] text-[12px] text-slate-200">
        <div className="flex flex-wrap gap-1.5 items-center" role="group" aria-label="Mạch hiển thị">
          <span className="text-slate-400 mr-0.5">Mạch:</span>
          {BOARDS.map((b) => (
            <button key={b.id} type="button" aria-pressed={shown.includes(b.id)} onClick={() => toggleBoard(b.id)}
              className={`${btn} inline-flex items-center gap-1.5 ${shown.includes(b.id) ? btnOn : ""}`}>
              <Dot b={b} />{b.name}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-slate-400">Bố cục:</span>
          <div className="inline-flex border border-[#333b4a] rounded-lg overflow-hidden" role="group" aria-label="Bố cục">
            {(["auto", "1", "2", "3"] as Cols[]).map((c, k) => (
              <button key={c} type="button" aria-pressed={cols === c} onClick={() => { setCols(c); setFocus(null); }}
                className={`text-[12px] px-2.5 py-1 cursor-pointer ${k ? "border-l border-[#333b4a]" : ""} ${cols === c ? "bg-[#22344a] text-white" : "bg-[#1b212b] text-slate-200"}`}>
                {c === "auto" ? "Tự động" : `${c} cột`}
              </button>
            ))}
          </div>
        </div>
        <label className="inline-flex items-center gap-1.5 cursor-pointer">
          <input type="checkbox" checked={segsOn} onChange={(e) => setSegsOn(e.target.checked)} className="accent-[#4fd1e8]" /> Khung phân đoạn
        </label>
        <label className="inline-flex items-center gap-1.5 text-slate-400">
          Cỡ điểm LED
          <input type="range" min={60} max={140} value={size} onChange={(e) => setSize(Number(e.target.value))} className="w-[90px] accent-[#4fd1e8]" />
        </label>
      </div>
      <div ref={stageRef} className="p-3 grid gap-3 min-h-[300px]" style={{ gridTemplateColumns: `repeat(${nCols}, minmax(0, 1fr))` }}>
        {BOARDS.map((b) => {
          const vis = shown.includes(b.id) && (!focus || focus === b.id);
          const leds = b.kind === "matrix" ? (b.w ?? 0) * (b.h ?? 0) : (b.ports ?? []).reduce((a, x) => a + x, 0);
          return (
            <div key={b.id} className={`${vis ? "grid" : "hidden"} bg-[#0b0e13] border border-[#262d3a] rounded-[10px] overflow-hidden min-h-[230px] ${focus === b.id ? "col-span-full" : ""}`} style={{ gridTemplateRows: "auto 1fr auto" }}>
              <button type="button" onClick={() => setFocus((f) => (f === b.id ? null : b.id))} title="Bấm để phóng to / thu nhỏ"
                className="flex gap-2 items-center px-2.5 py-1.5 border-b border-[#1f2632] text-[12px] bg-[#121720] text-left cursor-pointer w-full">
                <Dot b={b} />
                <span className="font-bold text-slate-100">{b.name}</span>
                <span className="text-slate-400">{b.ip}</span>
                <span className="flex-1" />
                {b.eye && <span className="text-[10.5px] font-bold px-1.5 rounded border bg-[#123a44] border-[#4fd1e8] text-[#c9f6ff]">👁</span>}
                {b.src && <span className="text-[10.5px] font-bold px-1.5 rounded border bg-[#f2c94c] border-[#ffe08a] text-[#2a1c00]">★ NGUỒN</span>}
                {b.on && !b.offline && <span className="text-[10.5px] font-bold px-1.5 rounded border bg-[#14301f] border-[#3ec76e] text-[#b9f5cf]">▶ đang phát</span>}
              </button>
              <div className="relative grid place-items-center p-2.5 min-h-0">
                <canvas ref={(el) => { canvases.current[b.id] = el; }} className="block max-w-full h-auto" aria-label={`LED của ${b.name}`} />
                {(b.offline || !b.on) && (
                  <div className="absolute inset-0 grid place-items-center text-center p-4 bg-[rgba(8,10,14,.72)] text-[13px] text-slate-100">
                    <div>
                      {b.offline ? "Mất kết nối với mạch" : "Mạch đang tắt đèn"}
                      <small className="block text-slate-400 mt-1 text-[12px]">
                        {b.offline ? "Đang thử nối lại mỗi 3 giây…" : "Bật đèn hoặc bấm Phát để xem LED."}
                      </small>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex flex-wrap gap-x-3.5 gap-y-1 px-2.5 py-1.5 border-t border-[#1f2632] text-[11.5px] text-slate-400 tabular-nums">
                <span>{b.kind === "matrix" ? `Ma trận ${b.w}×${b.h}` : `${(b.ports ?? []).length} cổng · ${leds} LED`}</span>
                <span>{b.fps ? `${b.fps} khung/s` : "—"}</span>
                {b.sample ? <span>hiện 1/{b.sample} số LED</span> : null}
                {b.segs.length ? <span>{b.segs.length} phân đoạn</span> : null}
              </div>
            </div>
          );
        })}
        {!visible.length && (
          <p className="col-span-full text-center text-slate-400 text-[13px] py-10">Bấm chip tên mạch ở trên để xem LED của mạch đó.</p>
        )}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 px-3 py-2 border-t border-[#222a36] text-[11.5px] text-slate-400 tabular-nums">
        <span>▶ Timeline <b className="text-slate-200 font-semibold">00:12.4</b> / 00:46.6</span>
        <span>Đang xem <b className="text-slate-200 font-semibold">{shown.length}</b> mạch</span>
        <span>Màu hiển thị là màu hiệu ứng, chưa nhân độ sáng của mạch</span>
      </div>
    </div>
  );
}
