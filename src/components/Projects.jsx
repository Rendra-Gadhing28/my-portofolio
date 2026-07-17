import { motion } from "framer-motion";

const PROJECTS = [
  {
    name: "Sijar",
    desc: "Inovasi Sistem Peminjaman Barang Berbasis Web untuk Meningkatkan Efisiensi dan Akurasi dalam Pengelolaan Inventaris.",
    tags: ["Laravel", "MySQL", "React"],
    year: "2026",
    url: "https://sijarr.vercel.app/"
  },
    {
    name: "Yalia Beauty Salon",
    desc: "Sebuah Landing Page untuk Yalia Beauty Salon yang menampilkan informasi tentang layanan, galeri, dan kontak salon.",
    tags: ["React", "Leaflet", "JavaScript"],
    year: "2026",
    url: "https://yalia-beauty-salon.vercel.app/"
  },
  {
    name: "Garden Palace",
    desc: "Game Platformer 2D yang menantang pemain untuk menjelajahi dunia yang indah dan memecahkan pertanyaan sambil mengumpulkan item dan menghindari rintangan.",
    tags: ["Unity", "C#", "Itch.io"],
    year: "2025",
    url: "https://github.com/rendra-gadhing28/PJBL_Kelompok-1"
  },
];

export default function Projects() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-28 sm:px-10 sm:py-36">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.4 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="mb-14 sm:mb-16"
      >
        <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-fg-muted">
          <span className="text-fg-dim">// </span>selected_work
        </p>
        <h2 className="mt-4 font-display text-3xl font-medium tracking-tight text-fg sm:text-4xl">
          Recent builds
        </h2>
      </motion.div>

      <div className="border-t border-line">
        {PROJECTS.map((p, i) => (
          <motion.a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ type: "spring", stiffness: 100, damping: 16, delay: i * 0.08 }}
            className="group grid grid-cols-1 items-center gap-4 border-b border-line py-8 transition-colors duration-300 hover:bg-bg-900/30 sm:grid-cols-[auto_1fr_auto_auto] sm:gap-8 sm:px-4"
          >
            <span className="font-mono text-xs text-fg-dim">{p.year}</span>

            <div>
              <h3 className="font-display text-xl font-medium text-fg transition-colors duration-300 group-hover:text-accent-soft sm:text-2xl">
                {p.name}
              </h3>
              <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-fg-muted">
                {p.desc}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 sm:justify-end">
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-line px-3 py-1 font-mono text-[10.5px] tracking-wide text-fg-soft"
                >
                  {tag}
                </span>
              ))}
            </div>

            <motion.span
              className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line-strong text-fg-muted transition-colors duration-300 group-hover:border-accent-soft/60 group-hover:text-accent-soft sm:flex"
              whileHover={{ rotate: 45 }}
              transition={{ type: "spring", stiffness: 200, damping: 14 }}
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 11L11 3M11 3H4.5M11 3V9.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                
              </svg>
            </motion.span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
