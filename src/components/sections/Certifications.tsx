import { useState } from "react";
import { certifications } from "../../data/content";

export function Certifications() {
  const [selected, setSelected] = useState<(typeof certifications)[number] | null>(null);

  return (
    <section id="certifications" className="relative py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12">
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-cyan-400">
            CHAPTER 06
          </p>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.35em] text-cyan-400">
            // Credentials & continuous learning
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            Certifications<span className="text-cyan-400">.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">
            A collection of courses, assessments, and workshops supporting my work across
            software engineering, data science, and artificial intelligence.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {certifications.map((certificate) => (
            <article
              key={certificate.id}
              className="group overflow-hidden rounded-2xl border border-cyan-400/15 bg-slate-950/70 shadow-lg shadow-cyan-950/10 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/50"
            >
              <button
                type="button"
                onClick={() => setSelected(certificate)}
                className="block w-full text-left"
                aria-label={`Preview ${certificate.name}`}
              >
                <div className="relative flex h-44 items-center justify-center overflow-hidden bg-slate-900 p-3">
                  <img
                    src={certificate.preview}
                    alt={`${certificate.name} certificate preview`}
                    className="max-h-full w-full rounded-lg object-contain transition duration-500 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <span className="absolute bottom-3 right-3 rounded-full border border-cyan-300/30 bg-slate-950/90 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-cyan-300">
                    Preview
                  </span>
                </div>
                <div className="p-5">
                  <span className="inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-cyan-300">
                    {certificate.type}
                  </span>
                  <h3 className="mt-4 min-h-[3.5rem] text-base font-semibold leading-6 text-white">
                    {certificate.name}
                  </h3>
                  <p className="mt-2 text-sm text-slate-400">{certificate.issuer}</p>
                  <p className="mt-3 font-mono text-xs text-slate-500">{certificate.issued}</p>
                </div>
              </button>
              <div className="flex gap-3 border-t border-white/5 px-5 py-4">
                <button
                  type="button"
                  onClick={() => setSelected(certificate)}
                  className="text-xs font-semibold text-cyan-300 transition hover:text-white"
                >
                  View certificate ↗
                </button>
                <a
                  href={certificate.file}
                  download
                  className="text-xs font-semibold text-slate-400 transition hover:text-white"
                >
                  Download ↓
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.name} certificate`}
          onClick={() => setSelected(null)}
        >
          <div
            className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-cyan-300/20 bg-slate-950 shadow-2xl shadow-cyan-950/30"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/10 p-5">
              <div>
                <h3 className="text-lg font-semibold text-white">{selected.name}</h3>
                <p className="mt-1 text-sm text-slate-400">{selected.issuer} · {selected.issued}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-slate-300 hover:border-cyan-300/40 hover:text-white"
                aria-label="Close certificate preview"
              >
                Close ✕
              </button>
            </div>
            <div className="min-h-0 flex-1 overflow-auto bg-slate-900 p-3 sm:p-6">
              {selected.fileType === "pdf" ? (
                <iframe
                  src={`${selected.file}#toolbar=1&navpanes=0`}
                  title={`${selected.name} PDF`}
                  className="h-[65vh] w-full rounded-lg bg-white"
                />
              ) : (
                <img
                  src={selected.file}
                  alt={`${selected.name} full certificate`}
                  className="mx-auto max-h-[65vh] w-auto max-w-full object-contain"
                />
              )}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 p-5">
              <p className="text-xs text-slate-400">{selected.description}</p>
              <a
                href={selected.file}
                download
                className="shrink-0 rounded-lg bg-cyan-400 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Download certificate
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
