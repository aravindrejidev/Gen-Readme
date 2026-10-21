'use client';
import { useMemo, useState } from 'react';
import { Pencil, Eye, Copy, Check, User, Code2, BarChart3 } from 'lucide-react';

// [label, hex color, simple-icons logo, logoColor]
const SKILLS = {
  Languages: [
    ['JavaScript', 'F7DF1E', 'javascript', 'black'], ['TypeScript', '3178C6', 'typescript'],
    ['Python', '3776AB', 'python'], ['Java', 'ED8B00', 'openjdk'], ['Kotlin', '7F52FF', 'kotlin'],
    ['C++', '00599C', 'cplusplus'], ['HTML5', 'E34F26', 'html5'], ['CSS3', '1572B6', 'css3'],
  ],
  Frameworks: [
    ['React', '20232A', 'react', '61DAFB'], ['Next.js', '000000', 'nextdotjs'],
    ['Tailwind CSS', '06B6D4', 'tailwindcss'], ['Vue.js', '4FC08D', 'vuedotjs'],
    ['Node.js', '339933', 'nodedotjs'], ['Jetpack Compose', '4285F4', 'jetpackcompose'],
  ],
  'Tools & Data': [
    ['Git', 'F05032', 'git'], ['GitHub', '181717', 'github'], ['Vercel', '000000', 'vercel'],
    ['Figma', 'F24E1E', 'figma'], ['Supabase', '3FCF8E', 'supabase'], ['Firebase', 'FFCA28', 'firebase', 'black'],
    ['MongoDB', '47A248', 'mongodb'], ['PostgreSQL', '4169E1', 'postgresql'],
  ],
};
const THEMES = ['radical', 'tokyonight', 'dracula', 'gruvbox', 'onedark', 'nord'];

const badge = ([l, c, logo, lc = 'white']) =>
  `https://img.shields.io/badge/${encodeURIComponent(l)}-${c}?style=for-the-badge${logo ? `&logo=${logo}&logoColor=${lc}` : ''}`;

const INIT = {
  name: '', tagline: '', bio: '', work: '', location: '', website: '',
  twitter: '', linkedin: '', username: '',
  stats: true, streak: true, trophies: false, langs: false, theme: 'radical',
};

function build(f, skills) {
  const b = [];
  const u = f.username.trim();
  const img = (src, alt, href) => ({ src, alt, href });
  if (f.name) b.push({ t: 'h1', text: `Hi 👋, I'm ${f.name}` });
  if (f.tagline) b.push({ t: 'h3', text: f.tagline });
  if (f.bio) b.push({ t: 'p', text: f.bio });
  const about = [
    f.work && `🔭 Working on ${f.work}`,
    f.location && `📍 Based in ${f.location}`,
    f.website && `🌐 ${f.website}`,
  ].filter(Boolean);
  if (about.length) b.push({ t: 'ul', items: about });

  const soc = [];
  if (u) soc.push(img(badge(['GitHub', '181717', 'github']), 'GitHub', `https://github.com/${u}`));
  if (f.twitter) soc.push(img(badge(['Twitter', '1DA1F2']), 'Twitter', `https://twitter.com/${f.twitter}`));
  if (f.linkedin) soc.push(img(badge(['LinkedIn', '0A66C2']), 'LinkedIn', `https://linkedin.com/in/${f.linkedin}`));
  if (soc.length) b.push({ t: 'h2', text: '🌐 Connect with me' }, { t: 'imgs', imgs: soc });

  if (skills.length) {
    const all = Object.values(SKILLS).flat();
    b.push(
      { t: 'h2', text: '🛠️ Tech stack' },
      { t: 'imgs', imgs: skills.map((s) => img(badge(all.find((x) => x[0] === s)), s)) }
    );
  }

  if (u) {
    const th = f.theme;
    const cards = [];
    if (f.stats) cards.push(img(`https://github-readme-stats.vercel.app/api?username=${u}&show_icons=true&theme=${th}`, 'GitHub stats'));
    if (f.langs) cards.push(img(`https://github-readme-stats.vercel.app/api/top-langs/?username=${u}&layout=compact&theme=${th}`, 'Top languages'));
    if (f.streak) cards.push(img(`https://streak-stats.demolab.com?user=${u}&theme=${th}`, 'GitHub streak'));
    if (f.trophies) cards.push(img(`https://github-profile-trophy.vercel.app/?username=${u}&theme=${th}`, 'GitHub trophies'));
    if (cards.length) b.push({ t: 'h2', text: '📊 GitHub stats' }, { t: 'imgs', imgs: cards });
  }
  return b;
}

function toMd(blocks) {
  const md = blocks.map((x) => {
    if (x.t === 'h1' || x.t === 'h3') return `<${x.t} align="center">${x.text}</${x.t}>`;
    if (x.t === 'h2') return `## ${x.text}`;
    if (x.t === 'ul') return x.items.map((i) => `- ${i}`).join('\n');
    if (x.t === 'imgs') {
      const rows = x.imgs.map((i) => {
        const tag = `<img src="${i.src}" alt="${i.alt}" />`;
        return i.href ? `  <a href="${i.href}">${tag}</a>` : `  ${tag}`;
      });
      return `<p align="center">\n${rows.join('\n')}\n</p>`;
    }
    return x.text;
  });
  return md.length ? md.join('\n\n') + '\n' : '';
}

function Preview({ blocks }) {
  if (!blocks.length)
    return <p className="py-10 text-center text-white/50">Nothing to show yet. Fill in the form to build your README.</p>;
  return (
    <div className="space-y-4">
      {blocks.map((x, i) => {
        if (x.t === 'h1') return <h1 key={i} className="text-center text-2xl font-bold">{x.text}</h1>;
        if (x.t === 'h3') return <h3 key={i} className="text-center text-lg text-[#D4FF3F]">{x.text}</h3>;
        if (x.t === 'h2') return <h2 key={i} className="border-b border-white/10 pb-1 text-xl font-semibold">{x.text}</h2>;
        if (x.t === 'ul') return <ul key={i} className="list-disc space-y-1 pl-5 text-white/80">{x.items.map((s) => <li key={s}>{s}</li>)}</ul>;
        if (x.t === 'imgs')
          return (
            <div key={i} className="flex flex-wrap justify-center gap-2">
              {x.imgs.map((m) => <img key={m.src} src={m.src} alt={m.alt} className="max-w-full" />)}
            </div>
          );
        return <p key={i} className="whitespace-pre-wrap text-white/80">{x.text}</p>;
      })}
    </div>
  );
}

const inputCls = 'w-full rounded-xl border border-white/10 bg-[#141414] px-3 py-3 text-base placeholder:text-white/30 focus:border-[#FF2DA8] focus:outline-none';

function Section({ title, Icon, children }) {
  return (
    <section className="rounded-2xl border border-white/10 bg-[#0F0F0F] p-4">
      <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
        <Icon size={18} className="text-[#FF2DA8]" /> {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm text-white/60">{label}</span>
      {children}
    </label>
  );
}

export default function Home() {
  const [view, setView] = useState('form');
  const [mode, setMode] = useState('preview');
  const [f, setF] = useState(INIT);
  const [skills, setSkills] = useState([]);
  const [copied, setCopied] = useState(false);

  const set = (k) => (e) => setF((p) => ({ ...p, [k]: e.target.value }));
  const flip = (k) => setF((p) => ({ ...p, [k]: !p[k] }));
  const toggleSkill = (s) => setSkills((p) => (p.includes(s) ? p.filter((x) => x !== s) : [...p, s]));

  const blocks = useMemo(() => build(f, skills), [f, skills]);
  const md = useMemo(() => toMd(blocks), [blocks]);

  async function copy() {
    try {
      await navigator.clipboard.writeText(md);
    } catch {
      const t = document.createElement('textarea');
      t.value = md;
      document.body.appendChild(t);
      t.select();
      document.execCommand('copy');
      t.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const toggleCls = (on) =>
    `rounded-full border px-3.5 py-2 text-sm font-medium transition ${
      on ? 'border-[#D4FF3F] bg-[#D4FF3F] text-[#0B0B0B]' : 'border-white/15 text-white/70'
    }`;

  return (
    <div className="mx-auto max-w-2xl px-4 pb-28 pt-4">
      {view === 'form' ? (
        <div className="space-y-4">
          <Section title="Personal info" Icon={User}>
            <Field label="Name"><input className={inputCls} value={f.name} onChange={set('name')} placeholder="Jane Doe" /></Field>
            <Field label="Tagline"><input className={inputCls} value={f.tagline} onChange={set('tagline')} placeholder="Frontend developer & designer" /></Field>
            <Field label="Bio"><textarea rows={3} className={inputCls} value={f.bio} onChange={set('bio')} placeholder="A few lines about you" /></Field>
            <Field label="Currently working on"><input className={inputCls} value={f.work} onChange={set('work')} placeholder="a music player app" /></Field>
            <Field label="Location"><input className={inputCls} value={f.location} onChange={set('location')} placeholder="Kerala, India" /></Field>
            <Field label="Website"><input className={inputCls} value={f.website} onChange={set('website')} placeholder="https://example.com" inputMode="url" /></Field>
            <Field label="Twitter username"><input className={inputCls} value={f.twitter} onChange={set('twitter')} placeholder="janedoe" autoCapitalize="none" /></Field>
            <Field label="LinkedIn username"><input className={inputCls} value={f.linkedin} onChange={set('linkedin')} placeholder="janedoe" autoCapitalize="none" /></Field>
          </Section>

          <Section title="Tech stack" Icon={Code2}>
            {Object.entries(SKILLS).map(([group, items]) => (
              <div key={group}>
                <p className="mb-2 text-sm text-white/60">{group}</p>
                <div className="flex flex-wrap gap-2">
                  {items.map(([name]) => {
                    const on = skills.includes(name);
                    return (
                      <button key={name} type="button" onClick={() => toggleSkill(name)}
                        className={`rounded-full border px-3.5 py-2 text-sm font-medium transition ${
                          on ? 'border-[#FF2DA8] bg-[#FF2DA8] text-[#0B0B0B]' : 'border-[#D4FF3F]/40 text-white/80'
                        }`}>
                        {name}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </Section>

          <Section title="GitHub stats" Icon={BarChart3}>
            <Field label="GitHub username">
              <input className={inputCls} value={f.username} onChange={set('username')} placeholder="janedoe" autoCapitalize="none" autoCorrect="off" />
            </Field>
            <div className="flex flex-wrap gap-2">
              {[['stats', 'Stats card'], ['streak', 'Streak'], ['langs', 'Top languages'], ['trophies', 'Trophies']].map(([k, l]) => (
                <button key={k} type="button" onClick={() => flip(k)} className={toggleCls(f[k])}>{l}</button>
              ))}
            </div>
            <div>
              <p className="mb-2 text-sm text-white/60">Card theme</p>
              <div className="flex flex-wrap gap-2">
                {THEMES.map((t) => (
                  <button key={t} type="button" onClick={() => setF((p) => ({ ...p, theme: t }))}
                    className={`rounded-full border px-3.5 py-2 text-sm font-medium transition ${
                      f.theme === t ? 'border-[#FF2DA8] bg-[#FF2DA8] text-[#0B0B0B]' : 'border-white/15 text-white/70'
                    }`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </Section>
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
                className={`rounded-lg py-2 text-sm font-semibold ${mode === k ? 'bg-[#D4FF3F] text-[#0B0B0B]' : 'text-[#D4FF3F]'}`}>
                {l}
              </button>
            ))}
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#0F0F0F] p-4">
            {mode === 'preview' ? (
              <Preview blocks={blocks} />
            ) : (
              <pre className="overflow-x-auto whitespace-pre-wrap break-all text-xs text-[#D4FF3F]">{md || 'Nothing to show yet.'}</pre>
            )}
          </div>
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
