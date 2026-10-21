'use client';
import { useMemo, useState } from 'react';
import { marked } from 'marked';
import { Pencil, Eye, Copy, Check, ChevronUp, ChevronDown, Trash2, Plus } from 'lucide-react';
import { STYLES, DYN_KEYS, HEADER_PRESETS, TYPES, TEMPLATES, newSection, generate, slug } from './lib/readme';

marked.use({ renderer: { heading: (text, level, raw) => `<h${level} id="${slug(raw)}">${text}</h${level}>\n` } });

const CSS = `body{margin:0;padding:16px;background:#0d1117;color:#e6edf3;font:15px/1.6 -apple-system,Segoe UI,Helvetica,Arial,sans-serif;word-wrap:break-word}a{color:#4493f8;text-decoration:none}img{max-width:100%}h1,h2{border-bottom:1px solid #30363d;padding-bottom:.3em}h1,h2,h3,h4{margin:1.2em 0 .6em}table{border-collapse:collapse;max-width:100%}td,th{padding:6px 12px;vertical-align:top}blockquote{margin:0;padding:0 1em;color:#9198a1;border-left:.25em solid #3d444d}code{background:#656c7633;padding:.2em .4em;border-radius:6px;font-size:85%}pre{background:#151b23;padding:12px;border-radius:6px;overflow:auto}pre code{background:none;padding:0}hr{border:0;border-top:1px solid #30363d;margin:20px 0}details{margin:8px 0}summary{cursor:pointer}`;

const box = 'w-full rounded-xl border border-white/10 bg-[#141414] px-3 py-3 text-base placeholder:text-white/30 focus:border-[#FF2DA8] focus:outline-none';

const Chip = ({ on, pink, children, ...p }) => (
  <button type="button" {...p}
    className={`rounded-full border px-3.5 py-2 text-sm font-medium transition ${
      on ? (pink ? 'border-[#FF2DA8] bg-[#FF2DA8] text-[#0B0B0B]' : 'border-[#D4FF3F] bg-[#D4FF3F] text-[#0B0B0B]') : 'border-white/15 text-white/70'
    }`}>
    {children}
  </button>
);
const Fld = ({ label, area, ...p }) => (
  <label className="block">
    <span className="mb-1 block text-sm text-white/60">{label}</span>
    {area ? <textarea rows={area} className={box} {...p} /> : <input className={box} {...p} />}
  </label>
);
const Card = ({ title, children }) => (
  <section className="space-y-3 rounded-2xl border border-white/10 bg-[#0F0F0F] p-4">
    <h2 className="text-lg font-semibold text-[#D4FF3F]">{title}</h2>
    {children}
  </section>
);
const Ib = (p) => <button type="button" {...p} className="rounded-lg p-2 text-white/60 active:text-[#FF2DA8]" />;
const Row = ({ children }) => <div className="flex flex-wrap gap-2">{children}</div>;

export default function Home() {
  const [view, setView] = useState('form');
  const [mode, setMode] = useState('preview');
  const [h, setH] = useState(() => TEMPLATES.BitChord().h);
  const [secs, setSecs] = useState(() => TEMPLATES.BitChord().secs);
  const [open, setOpen] = useState(null);
  const [copied, setCopied] = useState(false);
  const [height, setHeight] = useState(400);

  const sh = (k) => (e) => setH((p) => ({ ...p, [k]: e.target.value }));
  const hv = (k, v) => setH((p) => ({ ...p, [k]: v }));
  const toggleDyn = (k) => hv('dyn', h.dyn.includes(k) ? h.dyn.filter((x) => x !== k) : [...h.dyn, k]);
  const up = (id, patch) => setSecs((p) => p.map((s) => (s.id === id ? { ...s, ...patch } : s)));
  const move = (i, d) => setSecs((p) => {
    const a = [...p], j = i + d;
    if (j < 0 || j >= a.length) return p;
    [a[i], a[j]] = [a[j], a[i]];
    return a;
  });
  const del = (id) => setSecs((p) => p.filter((s) => s.id !== id));
  const add = (t) => {
    const s = newSection(t, TYPES[t].untitled ? '' : TYPES[t].n);
    setSecs((p) => [...p, s]);
    setOpen(s.id);
  };
  const load = (name) => {
    if (!confirm(`Replace everything with the ${name} style?`)) return;
    const t = TEMPLATES[name]();
    setH(t.h); setSecs(t.secs); setOpen(null);
  };

  const md = useMemo(() => generate(h, secs), [h, secs]);
  const doc = useMemo(() => {
    let html = marked.parse(md.replace(/^> \[!(\w+)\]/gm, '> **$1**'));
    const r = h.repo.trim();
    if (r) html = html.replace(/(src|srcset)="(?!https?:|data:|\/\/|#)([^"]+)"/g,
      (_, a, p) => `${a}="https://raw.githubusercontent.com/${r}/HEAD/${p.replace(/^\.?\//, '')}"`);
    return `<!doctype html><meta charset="utf-8"><meta name="color-scheme" content="dark"><style>${CSS}</style>${html}`;
  }, [md, h.repo]);

  async function copy() {
    try { await navigator.clipboard.writeText(md); }
    catch {
      const t = document.createElement('textarea');
      t.value = md; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="mx-auto max-w-2xl px-4 pb-28 pt-4">
      {view === 'form' ? (
        <div className="space-y-4">
          <Card title="Start from a style">
            <Row>{Object.keys(TEMPLATES).map((k) => <Chip key={k} pink onClick={() => load(k)}>{k}</Chip>)}</Row>
          </Card>

          <Card title="Project & logo">
            <Fld label="GitHub repo (owner/name)" value={h.repo} onChange={sh('repo')} placeholder="octocat/my-app" autoCapitalize="none" />
            <Fld label="Logo (URL or repo path)" value={h.logo} onChange={sh('logo')} placeholder="assets/logo.png" autoCapitalize="none" />
            <Fld label="Dark-mode logo (optional)" value={h.logoDark} onChange={sh('logoDark')} placeholder="assets/logo-dark.png" autoCapitalize="none" />
            <Fld label="Logo width (px)" value={h.logoW} onChange={sh('logoW')} inputMode="numeric" />
            <Fld label="Title" value={h.title} onChange={sh('title')} placeholder="My App" />
            <Fld label="Tagline" value={h.tagline} onChange={sh('tagline')} placeholder="A short one-line pitch" />
            <Fld label="Description (HTML allowed)" area={3} value={h.desc} onChange={sh('desc')} />
          </Card>

          <Card title="Header badges">
            <Row>{STYLES.map((s) => <Chip key={s} pink on={h.style === s} onClick={() => hv('style', s)}>{s}</Chip>)}</Row>
            <Fld label="Badge color (hex, no #)" value={h.color} onChange={sh('color')} placeholder="6366f1" autoCapitalize="none" />
            <Fld label="Label color (hex, no #)" value={h.labelColor} onChange={sh('labelColor')} placeholder="1e1e2e" autoCapitalize="none" />
            <p className="text-sm text-white/60">Live GitHub badges (need the repo)</p>
            <Row>{DYN_KEYS.map((k) => <Chip key={k} on={h.dyn.includes(k)} onClick={() => toggleDyn(k)}>{k}</Chip>)}</Row>
            <Fld label="Custom badges: label | message | color | logo | link" area={4} value={h.custom} onChange={sh('custom')} autoCapitalize="none" />
            <Row>
              {HEADER_PRESETS.map(([l, line]) => (
                <Chip key={l} onClick={() => hv('custom', (h.custom ? h.custom + '\n' : '') + line)}>+ {l}</Chip>
              ))}
            </Row>
            <Fld label="Trendshift repo ID (optional)" value={h.trendshift} onChange={sh('trendshift')} inputMode="numeric" />
            <Fld label="Trendshift language (optional)" value={h.lang} onChange={sh('lang')} placeholder="Kotlin" />
            <Row>
              <Chip on={h.nav} onClick={() => hv('nav', !h.nav)}>Nav links</Chip>
              <Chip on={h.dividers} onClick={() => hv('dividers', !h.dividers)}>Dividers</Chip>
            </Row>
          </Card>

          <Card title="Sections">
            {secs.map((s, i) => {
              const T = TYPES[s.type];
              const isOpen = open === s.id;
              return (
                <div key={s.id} className="rounded-xl border border-white/10 bg-[#141414]">
                  <div className="flex items-center">
                    <button type="button" onClick={() => setOpen(isOpen ? null : s.id)} className="flex-1 truncate px-3 py-3 text-left font-semibold">
                      {s.title || T.n} <span className="text-xs font-normal text-[#D4FF3F]">{T.n}</span>
                    </button>
                    <Ib onClick={() => move(i, -1)}><ChevronUp size={18} /></Ib>
                    <Ib onClick={() => move(i, 1)}><ChevronDown size={18} /></Ib>
                    <Ib onClick={() => del(s.id)}><Trash2 size={18} /></Ib>
                  </div>
                  {isOpen && (
                    <div className="space-y-3 border-t border-white/10 p-3">
                      {!T.untitled && <Fld label="Heading" value={s.title} onChange={(e) => up(s.id, { title: e.target.value })} />}
                      {T.opts && (
                        <Row>{T.opts.map((o) => <Chip key={o} pink on={s.opt === o} onClick={() => up(s.id, { opt: o })}>{o}</Chip>)}</Row>
                      )}
                      {s.type !== 'widget' && (
                        <Fld label={s.type === 'alert' ? 'Message' : s.type === 'text' ? 'Content (Markdown)' : 'Intro text (optional)'}
                          area={3} value={s.intro} onChange={(e) => up(s.id, { intro: e.target.value })} />
                      )}
                      {T.hint && (
                        <Fld label={T.hint} area={5} value={s.lines} onChange={(e) => up(s.id, { lines: e.target.value })} autoCapitalize="none" />
                      )}
                      {T.presets && (
                        <Row>{T.presets.map(([l, line]) => (
                          <Chip key={l} onClick={() => up(s.id, { lines: (s.lines ? s.lines + '\n' : '') + line })}>+ {l}</Chip>
                        ))}</Row>
                      )}
                      {!T.untitled && <Chip on={s.center} onClick={() => up(s.id, { center: !s.center })}>Centered</Chip>}
                    </div>
                  )}
                </div>
              );
            })}
            <p className="pt-1 text-sm text-white/60">Add a section</p>
            <Row>
              {Object.entries(TYPES).map(([k, T]) => (
                <Chip key={k} onClick={() => add(k)}><Plus size={14} className="-mt-0.5 mr-1 inline" />{T.n}</Chip>
              ))}
            </Row>
          </Card>
        </div>
      ) : (
        <div className="space-y-4">
          <button onClick={copy} disabled={!md}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF2DA8] py-3.5 text-base font-bold text-[#0B0B0B] transition active:scale-[0.98] disabled:opacity-40">
            {copied ? <><Check size={18} /> Copied</> : <><Copy size={18} /> Copy Markdown</>}
          </button>
          <div className="grid grid-cols-2 rounded-xl border border-[#D4FF3F]/40 p-1">
            {[['preview', 'Preview'], ['md', 'Markdown']].map(([k, l]) => (
              <button key={k} onClick={() => setMode(k)}
                className={`rounded-lg py-2 text-sm font-semibold ${mode === k ? 'bg-[#D4FF3F] text-[#0B0B0B]' : 'text-[#D4FF3F]'}`}>{l}</button>
            ))}
          </div>
          {mode === 'preview' ? (
            md ? (
              <iframe title="README preview" sandbox="allow-same-origin" srcDoc={doc} scrolling="no" style={{ height }}
                className="w-full rounded-xl border border-white/10"
                onLoad={(e) => { try { setHeight(e.target.contentDocument.documentElement.scrollHeight); } catch {} }} />
            ) : <p className="py-10 text-center text-white/50">Nothing to show yet. Fill in the form first.</p>
          ) : (
            <pre className="overflow-x-auto whitespace-pre-wrap break-all rounded-2xl border border-white/10 bg-[#0F0F0F] p-4 text-xs text-[#D4FF3F]">{md || 'Nothing to show yet.'}</pre>
          )}
        </div>
      )}

      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[#D4FF3F]/30 bg-[#0B0B0B]/95 pb-[env(safe-area-inset-bottom)] backdrop-blur">
        <div className="mx-auto grid max-w-2xl grid-cols-2">
          {[['form', 'Form', Pencil], ['preview', 'Preview & Copy', Eye]].map(([k, l, Icon]) => (
            <button key={k} onClick={() => setView(k)}
              className={`relative flex flex-col items-center gap-1 py-3 text-sm font-semibold ${view === k ? 'text-[#FF2DA8]' : 'text-white/50'}`}>
              {view === k && <span className="absolute inset-x-8 top-0 h-0.5 rounded-full bg-[#FF2DA8]" />}
              <Icon size={20} /> {l}
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
