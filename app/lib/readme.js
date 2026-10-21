let n = 0;
const uid = () => `s${++n}`;
const JM = 'https://cdn.jsdelivr.net/gh/JMcrafter26/badges@main/src/assets';
const L = (s = '') => s.split('\n').map((x) => x.trim()).filter(Boolean);
const P = (s) => s.split('|').map((x) => x.trim());
const esc = (t) => encodeURIComponent(String(t).trim().replace(/-/g, '--').replace(/_/g, '__'));
const chunk = (a, k) => Array.from({ length: Math.ceil(a.length / k) }, (_, i) => a.slice(i * k, i * k + k));
export const slug = (t) => t.toLowerCase().replace(/[^\p{L}\p{N}\s_-]/gu, '').replace(/\s/g, '-');

export const STYLES = ['for-the-badge', 'flat', 'flat-square', 'social'];

const DYN = {
  release: [(r) => `v/release/${r}`, '/releases'],
  stars: [(r) => `stars/${r}`, ''],
  downloads: [(r) => `downloads/${r}/total`, '/releases'],
  license: [(r) => `license/${r}`, '/blob/HEAD/LICENSE'],
  forks: [(r) => `forks/${r}`, '/forks'],
  issues: [(r) => `issues/${r}`, '/issues'],
  commit: [(r) => `last-commit/${r}`, '/commits'],
};
export const DYN_KEYS = Object.keys(DYN);

// header badge lines: label | message | color | logo | link
export const HEADER_PRESETS = [
  ['Android', 'Platform | Android 8.0+ | 3DDC84 | android'],
  ['GPLv3', 'License | GPLv3 | 6366f1 | gnu'],
  ['Kotlin', 'Built with | Kotlin | 7F52FF | kotlin'],
  ['Flutter', 'Built with | Flutter | 02569B | flutter'],
  ['Telegram', 'Telegram | Community | 2CA5E0 | telegram | https://t.me/yourchannel'],
  ['Discord', 'Discord | Join | 5865F2 | discord | https://discord.gg/yourinvite'],
];

// badge row lines: image | link | alt   ({repo} is replaced)
const BADGE_PRESETS = [
  ['Android', `${JM}/supported/android/cozy.svg | https://github.com/{repo}/releases | Download for Android`],
  ['Windows', `${JM}/supported/windows/cozy.svg | https://github.com/{repo}/releases | Download for Windows`],
  ['Releases', 'https://img.shields.io/badge/GitHub_Releases-Download_APK-7C4DFF?style=for-the-badge&logo=github | https://github.com/{repo}/releases/latest | GitHub Releases'],
  ['Obtainium', 'https://img.shields.io/badge/Obtainium-Auto_Updates-purple?style=for-the-badge&logo=android | https://apps.obtainium.imranr.dev/redirect?r=obtainium://add/https://github.com/{repo} | Obtainium'],
  ['Telegram', 'https://img.shields.io/badge/Telegram-Channel-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white | https://t.me/yourchannel | Telegram'],
  ['Ko-fi', `${JM}/donate/kofi-singular-alt/cozy.svg | https://ko-fi.com/yourname | Support me on Ko-fi`],
  ['PayPal', `${JM}/donate/paypal-plural/cozy.svg | https://paypal.me/yourname | Support on PayPal`],
  ['FMHY', `${JM}/available/fmhy/cozy.svg | https://fmhy.net | Featured on FMHY`],
];

export const TYPES = {
  text: { n: 'Text' },
  alert: { n: 'Alert box', opts: ['NOTE', 'TIP', 'IMPORTANT', 'WARNING', 'CAUTION'], untitled: true },
  features: { n: 'Features', opts: ['Table', 'Cards', 'List'], hint: 'One per line: Title: description. A line starting with # starts a group. Emoji in the title works as an icon.' },
  screens: { n: 'Screenshots', opts: ['3', '2', '4'], hint: 'One per line: image path or URL | caption' },
  badges: { n: 'Badge row', hint: 'One per line: image URL | link | alt text', presets: BADGE_PRESETS },
  faq: { n: 'FAQ', hint: 'One per line: Question | Answer' },
  steps: { n: 'Steps', hint: 'One step per line' },
  links: { n: 'Link list', opts: ['List', 'Inline row'], hint: 'One per line: Name | URL | note (optional)' },
  code: { n: 'Code block', opts: ['bash', 'js', 'json', 'kotlin', 'yaml'], hint: 'Paste the code' },
  widget: { n: 'Contributors / Stars', opts: ['Contributors', 'Star history'] },
};

export const H = {
  repo: '', logo: '', logoDark: '', logoW: '200', title: '', tagline: '', desc: '',
  style: 'for-the-badge', color: '', labelColor: '', dyn: [], custom: '',
  trendshift: '', lang: '', nav: true, dividers: true,
};

export const newSection = (type, title = '', o = {}) => ({
  id: uid(), type, title, center: false, intro: '', lines: '', opt: TYPES[type].opts?.[0] || '', ...o,
});
const S = newSection;

export const TEMPLATES = {
  BitChord: () => ({
    h: { ...H, labelColor: '0d1117', dyn: ['release', 'license', 'downloads'] },
    secs: [
      S('alert', '', { opt: 'IMPORTANT' }),
      S('features', 'Features', { center: true }),
      S('badges', 'Download', { center: true }),
      S('widget', 'Contributing', { center: true }),
      S('badges', 'Support', { center: true }),
      S('text', 'Disclaimer & Legal Notice', { center: true }),
      S('text', 'License', { center: true }),
    ],
  }),
  Mornye: () => ({
    h: { ...H, dyn: ['release', 'stars'] },
    secs: [
      S('screens', 'Screenshots', { opt: '2' }),
      S('features', 'Features', { opt: 'Cards' }),
      S('text', 'Development'),
      S('faq', 'FAQ'),
      S('widget', 'Contributors'),
      S('links', 'API Credits', { opt: 'Inline row' }),
      S('text', 'Disclaimer'),
      S('alert', '', { opt: 'TIP' }),
    ],
  }),
  Yuma: () => ({
    h: { ...H, color: '6366f1', labelColor: '1e1e2e', dyn: ['release', 'stars', 'downloads', 'license'] },
    secs: [
      S('text', '🌟 About the Project'),
      S('screens', '📸 Showcase'),
      S('features', '✨ Key Features', { opt: 'List' }),
      S('badges', '📥 Download & Installation', { center: true }),
      S('code', '🛠️ Building from Source'),
      S('text', '🏛️ Architecture & Tech Stack'),
      S('steps', '⚙️ Account Setup'),
      S('badges', '☕ Support the Project'),
      S('widget', '📈 Star History', { opt: 'Star history', center: true }),
      S('widget', '💡 Contributing'),
      S('links', '🤝 Acknowledgments', { opt: 'List' }),
      S('text', '⚖️ License & Legal Disclaimer'),
    ],
  }),
};

export function generate(h, secs) {
  const repo = h.repo.trim();
  const R = (t = '') => t.replaceAll('{repo}', repo);
  const q0 = `style=${h.style}${h.labelColor ? `&labelColor=${h.labelColor}` : ''}`;
  const ok = (s) => (s.type === 'widget' ? !!repo : !!(s.intro.trim() || (TYPES[s.type].hint && s.lines.trim())));
  const live = secs.filter(ok);

  const top = [];
  if (h.logo) {
    const img = `<img src="${h.logo}" alt="${h.title || 'Logo'}" width="${h.logoW || 200}" />`;
    top.push(h.logoDark
      ? `<picture>\n  <source media="(prefers-color-scheme: dark)" srcset="${h.logoDark}">\n  ${img}\n</picture>`
      : img);
  }
  if (h.title) top.push(`# ${h.title}`);
  if (h.tagline) top.push(`### ${h.tagline}`);
  if (h.desc) top.push(h.desc);

  const bd = [];
  if (repo) h.dyn.forEach((k) => {
    const [path, to] = DYN[k];
    bd.push(`[![${k}](https://img.shields.io/github/${path(repo)}?${q0}${h.color ? `&color=${h.color}` : ''})](https://github.com/${repo}${to})`);
  });
  L(h.custom).forEach((ln) => {
    const [l, m, c, logo, link] = P(ln);
    const img = `![${l}](https://img.shields.io/badge/${esc(l)}-${m ? `${esc(m)}-` : ''}${c || '6366f1'}?${q0}${logo ? `&logo=${logo}&logoColor=white` : ''})`;
    bd.push(link ? `[${img}](${link})` : img);
  });
  if (bd.length) top.push(bd.join('\n'));

  const titles = live.filter((s) => s.title && s.type !== 'alert').map((s) => s.title);
  if (h.nav && titles.length) top.push(titles.map((t) => `[**${t}**](#${slug(t)})`).join(' · '));
  if (h.trendshift)
    top.push(`<a href="https://trendshift.io/repositories/${h.trendshift}"><img src="https://trendshift.io/api/badge/trendshift/repositories/${h.trendshift}/daily${h.lang ? `?language=${h.lang}` : ''}" alt="Trendshift" width="250" height="55" /></a>`);

  const it = (x) => { const k = x.indexOf(': '); return k > 0 ? [x.slice(0, k), x.slice(k + 2)] : ['', x]; };
  const li = (x) => { const [a, b] = it(x); return a ? `- **${a}** — ${b}` : `- ${b}`; };
  const col = (gs, lv) => gs.map((x) => (x.t ? `${lv} ${x.t}\n` : '') + x.i.map(li).join('\n')).join('\n\n');

  const B = {
    features: (r, o) => {
      const g = [];
      r.forEach((x) => {
        if (x[0] === '#') g.push({ t: x.replace(/^#+\s*/, ''), i: [] });
        else { if (!g.length) g.push({ t: '', i: [] }); g.at(-1).i.push(x); }
      });
      if (o === 'List') return col(g, '###');
      if (o === 'Cards') {
        const cards = r.filter((x) => x[0] !== '#').map((x) => { const [a, b] = it(x); return `    <td width="50%" valign="top">\n      <p><b>${a}</b></p>\n      <p>${b}</p>\n    </td>`; });
        return `<table>\n${chunk(cards, 2).map((c) => `  <tr>\n${c.join('\n')}\n  </tr>`).join('\n')}\n</table>`;
      }
      let a = g.filter((_, i) => i % 2 === 0);
      let b = g.filter((_, i) => i % 2);
      if (g.length === 1) { const m = Math.ceil(g[0].i.length / 2); a = [{ ...g[0], i: g[0].i.slice(0, m) }]; b = [{ t: '', i: g[0].i.slice(m) }]; }
      const td = (c) => `    <td width="50%" valign="top">\n\n${c}\n\n    </td>`;
      return `<table>\n  <tr>\n${td(col(a, '####'))}\n${td(col(b, '####'))}\n  </tr>\n</table>`;
    },
    screens: (r, o) => {
      const k = +o || 3;
      const cells = r.map((x) => {
        const [src, cap = ''] = P(x);
        return `      <td width="${Math.floor(100 / k)}%" align="center">\n        <img src="${src}" alt="${cap || 'Screenshot'}" width="100%" />${cap ? `<br />\n        <sub><b>${cap}</b></sub>` : ''}\n      </td>`;
      });
      return `<div align="center">\n  <table>\n${chunk(cells, k).map((c) => `    <tr>\n${c.join('\n')}\n    </tr>`).join('\n')}\n  </table>\n</div>`;
    },
    badges: (r) => r.map((x) => {
      const [i, l, a = ''] = P(x);
      const t = `<img src="${i}" alt="${a}"${i.includes('jsdelivr') ? ' height="55"' : ''} />`;
      return l ? `<a href="${l}" target="_blank" rel="noopener noreferrer">${t}</a>` : t;
    }).join('\n'),
    faq: (r) => r.map((x) => { const [q, ...a] = P(x); return `<details>\n<summary><b>${q}</b></summary>\n<br>\n\n${a.join(' | ')}\n\n</details>`; }).join('\n\n'),
    steps: (r) => r.map((x, i) => `${i + 1}. ${x}`).join('\n'),
    links: (r, o) => {
      const l = r.map(P);
      return o === 'Inline row'
        ? `<p align="center">\n  ${l.map(([a, u]) => `<a href="${u}"><b>${a}</b></a>`).join(' &nbsp;·&nbsp;\n  ')}\n</p>`
        : l.map(([a, u, d]) => `- [${a}](${u})${d ? ` — ${d}` : ''}`).join('\n');
    },
    code: (r, o, s) => '```' + o + '\n' + R(s.lines).trim() + '\n```',
    widget: (_, o) => (o === 'Star history'
      ? `<a href="https://star-history.com/#${repo}&Date"><img src="https://api.star-history.com/svg?repos=${repo}&type=Date&theme=dark" alt="Star history" width="100%" /></a>`
      : `<a href="https://github.com/${repo}/graphs/contributors"><img src="https://contrib.rocks/image?repo=${repo}" alt="Contributors" /></a>`),
  };

  const blocks = live.map((s) => {
    const T = TYPES[s.type];
    const rows = L(R(s.lines));
    const parts = [];
    if (s.title && !T.untitled) parts.push(`## ${s.title}`);
    if (s.type === 'alert') parts.push(`> [!${s.opt}]\n` + s.intro.trim().split('\n').map((x) => `> ${x}`).join('\n'));
    else {
      if (s.intro.trim()) parts.push(R(s.intro.trim()));
      if (!T.hint || rows.length) parts.push(B[s.type]?.(rows, s.opt, s));
    }
    const txt = parts.filter(Boolean).join('\n\n');
    return s.center && !T.untitled ? `<div align="center">\n\n${txt}\n\n</div>` : txt;
  });

  const head = top.length ? `<div align="center">\n\n${top.join('\n\n')}\n\n</div>` : '';
  const all = [head, ...blocks].filter(Boolean);
  return all.length ? all.join(h.dividers ? '\n\n---\n\n' : '\n\n') + '\n' : '';
}
