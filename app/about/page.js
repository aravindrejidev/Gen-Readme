import { Github, Linkedin, Twitter, Instagram, Mail } from 'lucide-react';

// Replace these with your own links
const REPO = 'https://github.com/your-username/github-readme-generator';
const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/your-username', Icon: Github },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/your-username', Icon: Linkedin },
  { label: 'Twitter', href: 'https://twitter.com/your-username', Icon: Twitter },
  { label: 'Instagram', href: 'https://instagram.com/your-username', Icon: Instagram },
  { label: 'Email', href: 'mailto:you@example.com', Icon: Mail },
];
const STACK = ['Next.js (App Router)', 'Tailwind CSS', 'Lucide Icons', 'Shields.io', 'Vercel'];

const card = 'rounded-2xl border border-white/10 bg-[#141414] p-5';
const linkBtn =
  'flex items-center gap-2 rounded-xl border border-[#D4FF3F]/40 px-4 py-3 text-sm font-semibold text-[#D4FF3F] transition hover:bg-[#D4FF3F] hover:text-[#0B0B0B]';

export const metadata = { title: 'About - README Forge' };

export default function About() {
  return (
    <div className="mx-auto max-w-2xl space-y-4 px-4 py-6">
      <h1 className="text-3xl font-bold">
        About <span className="text-[#FF2DA8]">README Forge</span>
      </h1>

      <section className={card}>
        <h2 className="mb-2 text-lg font-semibold">What it does</h2>
        <p className="text-white/70">
          Fill in only what you want, pick your tech stack, add GitHub stats cards, then copy the
          finished Markdown straight into your profile repository.
        </p>
      </section>

      <section className={card}>
        <h2 className="mb-3 text-lg font-semibold">Tech stack</h2>
        <div className="flex flex-wrap gap-2">
          {STACK.map((s) => (
            <span key={s} className="rounded-full border border-[#D4FF3F] px-3 py-1 text-sm text-[#D4FF3F]">
              {s}
            </span>
          ))}
        </div>
      </section>

      <section className={card}>
        <h2 className="mb-3 text-lg font-semibold">Source code</h2>
        <a href={REPO} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 rounded-xl bg-[#FF2DA8] px-4 py-3 font-bold text-[#0B0B0B]">
          <Github size={18} /> View repository
        </a>
      </section>

      <section className={card}>
        <h2 className="mb-3 text-lg font-semibold">Find the developer</h2>
        <div className="grid grid-cols-2 gap-2">
          {SOCIALS.map(({ label, href, Icon }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" className={linkBtn}>
              <Icon size={16} /> {label}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
